/**
 * IGRAPH CONCIERGE — SECURE LEAD CAPTURE ENDPOINT
 * POST /api/lead
 * 
 * Flow: "Get a quote" / "Book a consultation"
 * Features:
 * - Bot honeypot detection ('website' field must remain empty)
 * - Origin / Referer validation against allowed domains
 * - In-memory IP rate limiting
 * - Contact detail validation (email format or phone digits)
 * - Persistent logging to Supabase CRM (leads table)
 * - Optional Resend integration (RESEND_API_KEY) with clear TODO instructions
 * - Cache-Control: no-store
 */

const { insertLead } = require('../lib/supabase');

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_LEADS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, entry);
    return true;
  }

  if (entry.count >= MAX_LEADS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return true;
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

  if (!origin && !referer) {
    return process.env.NODE_ENV !== 'production';
  }

  if (origin && allowed.has(origin)) return true;

  if (referer) {
    try {
      const refUrl = new URL(referer);
      if (allowed.has(refUrl.origin)) return true;
    } catch {
      return false;
    }
  }

  return false;
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

/**
 * Sends notification email via Resend if configured
 * TODO: To enable instant email delivery:
 * 1. Sign up at https://resend.com
 * 2. Add RESEND_API_KEY to your Vercel Environment Variables
 * 3. Verify your domain (or use onboarding@resend.dev for testing)
 */
async function sendResendNotification(lead) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || 'advisory@igraphmedia.com';

  if (!resendKey) {
    console.log('[Igraph Lead] RESEND_API_KEY not configured. Lead recorded in Supabase; email skipped.');
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Igraph Concierge <leads@igraphmedia.com>',
        to: [toEmail],
        subject: `New Concierge Enquiry: ${lead.company_name}`,
        html: `
          <h2>New Lead Captured via Igraph Concierge</h2>
          <p><strong>Business Name:</strong> ${lead.company_name}</p>
          <p><strong>Goal:</strong> ${lead.growth_goal}</p>
          <p><strong>Service Interest:</strong> ${lead.service_interest}</p>
          <p><strong>Contact:</strong> ${lead.email || lead.phone}</p>
          <p><strong>Source:</strong> ${lead.source}</p>
          <hr />
          <p><em>Recorded automatically in Supabase CRM.</em></p>
        `
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('[Igraph Lead] Resend error:', errText);
    }
  } catch (err) {
    console.warn('[Igraph Lead] Failed to send Resend email:', err.message);
  }
}

module.exports = async function handler(req, res) {
  // 1. Method restriction
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'The lead endpoint only accepts POST requests.'
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  // 2. Origin check
  if (!isOriginAllowed(req)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Request origin is not authorized.'
    });
  }

  // 3. Rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Please wait a moment before submitting another request.'
    });
  }

  // 4. Honeypot Bot Detection
  // The 'website' field is an invisible honeypot. If filled, a bot triggered it.
  const body = req.body || {};
  if (body.website || body.hp_company) {
    console.warn('[Igraph Lead] Honeypot triggered by bot.');
    // Return friendly success to avoid bot retries, but drop the record
    return res.status(200).json({
      success: true,
      message: 'Thank you. A member of our team will reach out within 24 hours.'
    });
  }

  // 5. Extract & Validate Required Fields
  const businessName = sanitize(body.business_name || body.company_name);
  const goal = sanitize(body.goal || body.growth_goal);
  const serviceInterest = sanitize(body.service_interest || body.service);
  const contactValue = sanitize(body.contact || body.email || body.phone);

  if (!businessName) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide your business or brand name.'
    });
  }

  if (!contactValue) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide an email address or WhatsApp phone number.'
    });
  }

  // Determine if contact is email or phone
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue);
  const isPhone = /^[\d\s+\-().]{7,20}$/.test(contactValue);

  if (!isEmail && !isPhone) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide a valid email address or phone number.'
    });
  }

  const leadRecord = {
    company_name: businessName,
    client_name: sanitize(body.client_name) || businessName,
    growth_goal: goal || 'Not specified',
    service_interest: serviceInterest || 'General Inquiry',
    email: isEmail ? contactValue : null,
    phone: isPhone ? contactValue : null,
    timeline: 'Within 30 days',
    source: 'concierge_chat',
    status: 'new',
    metadata: {
      submittedAt: new Date().toISOString(),
      userAgent: sanitize(req.headers['user-agent'] || '').slice(0, 200)
    }
  };

  try {
    // Save to Supabase CRM database
    await insertLead(leadRecord);

    // Send email notification via Resend (if configured)
    await sendResendNotification(leadRecord);

    return res.status(200).json({
      success: true,
      message: 'Thank you. A member of our team will reach out within 24 hours.'
    });
  } catch (err) {
    console.error('[Igraph Lead] Storage error:', err.message);
    // Graceful response to visitor
    return res.status(200).json({
      success: true,
      message: 'Thank you. A member of our team will reach out within 24 hours.'
    });
  }
};
