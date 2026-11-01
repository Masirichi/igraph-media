/**
 * IGRAPH CONCIERGE — SECURE SERVERLESS CHAT ENDPOINT
 * POST /api/chat
 * 
 * Production security features:
 * - Method restriction: POST only (405 on others)
 * - Origin / Referer validation against configurable allowlist
 * - In-memory IP rate limiter (15 req/min, with Upstash/Vercel KV note)
 * - Strict input sanitization (strip control chars, 1,000 char cap, max 20 turns)
 * - Immutable server-side system prompt (client cannot override)
 * - 20s request timeout with graceful fallback (zero raw stack traces leaked)
 * - Cache-Control: no-store
 */

const { buildSystemPrompt } = require('./_prompt');

// In-memory rate limiting map: ip -> { count, resetAt }
// NOTE FOR MULTI-REGION PRODUCTION:
// In a serverless environment with multiple concurrent edge instances,
// in-memory rate limiting operates per-instance. For strict global rate limiting,
// upgrade to Upstash Redis (@upstash/ratelimit) or Vercel KV.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

// Clean up stale IP records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 120 * 1000).unref();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, entry);
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000)
    };
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return { allowed: true };
}

function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  // Strip non-printable ASCII control characters except standard whitespace (\r, \n, \t)
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

function isOriginAllowed(req) {
  const defaultOrigins = [
    'https://igraph-media.vercel.app',
    'https://igraphmedia.com',
    'https://www.igraphmedia.com',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000'
  ];

  const envOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  const allowed = new Set([...defaultOrigins, ...envOrigins]);
  const origin = req.headers['origin'];
  const referer = req.headers['referer'];

  // If both origin and referer are missing (e.g. server-to-server or direct curl in development),
  // allow only in non-production environments
  if (!origin && !referer) {
    return process.env.NODE_ENV !== 'production';
  }

  if (origin && allowed.has(origin)) {
    return true;
  }

  if (referer) {
    try {
      const refUrl = new URL(referer);
      if (allowed.has(refUrl.origin)) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

module.exports = async function handler(req, res) {
  // 1. Enforce POST only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'The chat service only accepts POST requests.'
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  // 2. Origin / Referer verification
  if (!isOriginAllowed(req)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Request origin is not authorized.'
    });
  }

  // 3. Client IP extraction and rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'You have sent messages too quickly. Please wait a moment before sending another message.',
      retryAfter: rateCheck.retryAfterSeconds
    });
  }

  // 4. Validate Environment Variables
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  if (!apiKey) {
    console.error('[Igraph Concierge] Configuration error: GEMINI_API_KEY is not defined in environment variables.');
    return res.status(500).json({
      error: 'Configuration Error',
      message: 'The concierge assistant is temporarily unavailable. Please reach our team directly at advisory@igraphmedia.com or via WhatsApp.'
    });
  }

  // 5. Validate & Sanitize Input
  const body = req.body || {};
  let rawMessages = body.messages;

  // Backwards compatibility for single message payloads
  if (!rawMessages && typeof body.message === 'string') {
    rawMessages = [{ role: 'user', content: body.message }];
  }

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Payload must contain a non-empty "messages" array.'
    });
  }

  // Enforce max 20 messages (drop oldest if exceeded)
  const trimmedMessages = rawMessages.slice(-20);
  const validatedMessages = [];

  for (const msg of trimmedMessages) {
    if (!msg || typeof msg !== 'object') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Each message must be an object with "role" and "content".'
      });
    }

    const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
    let content = sanitizeText(msg.content);

    if (!content) continue;

    // Strict 1,000 character limit per user message
    if (role === 'user' && content.length > 1000) {
      content = content.slice(0, 1000);
    }

    validatedMessages.push({ role, content });
  }

  if (validatedMessages.length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'No valid message content provided.'
    });
  }

  // 6. Format Payload for Google Gemini REST API
  // Map conversation turns to Gemini's contents structure
  const contents = validatedMessages.map(m => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));

  const systemInstructionText = buildSystemPrompt();

  const geminiPayload = {
    system_instruction: {
      parts: [{ text: systemInstructionText }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.65,
      topP: 0.9,
      maxOutputTokens: 600
    }
  };

  // 7. Call Gemini API with 20-Second Timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${apiKey}`;

  try {
    const upstreamResponse = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiPayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text().catch(() => '');
      console.error(`[Igraph Concierge] Upstream Gemini error (${upstreamResponse.status}):`, errorText.slice(0, 500));
      return res.status(502).json({
        error: 'Upstream Error',
        message: 'The assistant had trouble generating a reply. Please try again or reach our team via WhatsApp at +234 815 325 3639.'
      });
    }

    const data = await upstreamResponse.json();
    const candidate = data.candidates?.[0];
    const replyText = candidate?.content?.parts?.[0]?.text;

    if (!replyText) {
      console.warn('[Igraph Concierge] Empty reply from Gemini candidate');
      return res.status(200).json({
        reply: "I am here to help you explore Igraph Media's services, request a quote, or schedule a free consultation. How can I assist your business today?"
      });
    }

    return res.status(200).json({
      reply: replyText.trim()
    });

  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      console.error('[Igraph Concierge] Upstream request timed out after 20s');
      return res.status(504).json({
        error: 'Gateway Timeout',
        message: 'The assistant took too long to reply. Please try again or message our team directly on WhatsApp.'
      });
    }

    console.error('[Igraph Concierge] Network/execution error:', err.message);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'We experienced an unexpected error. Please try again or contact us directly at advisory@igraphmedia.com.'
    });
  }
};
