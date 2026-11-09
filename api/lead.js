/**
 * IGRAPH MEDIA — SECURE LEAD CAPTURE ENDPOINT
 * POST /api/lead
 * 
 * Features:
 * - Method guard (POST only; 405 on other methods)
 * - Bot honeypot detection ('company_website' / 'website' / 'hp_company' must be empty)
 * - Origin / Referer validation against allowed domains
 * - In-memory IP rate limiting (5 submissions per 10 minutes; Vercel KV / Upstash recommended for production)
 * - Server-side validation & sanitization (string checks, max lengths, regex verification)
 * - Whitelisted service slugs
 * - Resend email dispatch with reply-to set to visitor (if RESEND_API_KEY configured)
 * - Persistent logging to Supabase CRM (if configured)
 * - Cache-Control: no-store
 */

const { insertLead } = require('../lib/supabase');

// Per-IP in-memory rate limiting (5 submissions per 10 minutes)
// For multi-region serverless clusters in production, upgrading to Vercel KV or Upstash Redis is recommended.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
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
    'https://igraphmedia.com.ng',
    'https://www.igraphmedia.com.ng',
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

function sanitize(val, maxLen = 1500) {
  if (typeof val !== 'string') return '';
  // Strip control characters
  return val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, maxLen);
}

const SERVICE_LABELS = {
  'web-design': 'Web Design & Development',
  'seo-geo': 'SEO & GEO (Search and AI Optimization)',
  'social-media': 'Social Media Management',
  'advertising': 'Digital Advertising',
  'pr': 'Public Relations',
  'not-sure': 'Not sure yet. Help me choose'
};

/**
 * Sends notification email via Resend if configured
 * Set RESEND_API_KEY and LEAD_TO_EMAIL in your Vercel Environment Variables.
 */
async function sendResendNotification(lead) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || 'hello@igraphmedia.com.ng';

  if (!resendKey) {
    console.log('[Igraph Lead] RESEND_API_KEY not configured. Lead recorded; email skipped.');
    return;
  }

  const subject = `New enquiry: ${lead.service_label || lead.service_interest} from ${lead.company_name}`;
  const textContent = `
New Lead Enquiry Received:

- Name: ${lead.client_name}
- Brand / Business: ${lead.company_name}
- Email: ${lead.email}
- WhatsApp / Phone: ${lead.phone || 'Not provided'}
- Service: ${lead.service_label || lead.service_interest}
- Goal / Notes: ${lead.growth_goal || 'None provided'}
- Submitted: ${lead.metadata?.submittedAt || new Date().toISOString()}
`.trim();

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
      <h2 style="color: #B70909; margin-top: 0;">New Consultation Enquiry</h2>
      <p style="font-size: 16px; line-height: 1.5;">You received a new enquiry from <strong>${escapeHtml(lead.client_name)}</strong> at <strong>${escapeHtml(lead.company_name)}</strong>.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600; width: 160px;">Contact Name:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${escapeHtml(lead.client_name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">Business / Brand:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${escapeHtml(lead.company_name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">Email:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">WhatsApp / Phone:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${lead.phone ? `<a href="https://wa.me/${escapeHtml(lead.phone.replace(/[^0-9]/g, ''))}">${escapeHtml(lead.phone)}</a>` : 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">Service Needed:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee;"><strong>${escapeHtml(lead.service_label || lead.service_interest)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600; vertical-align: top;">Business Goal:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; line-height: 1.5;">${escapeHtml(lead.growth_goal || 'None provided')}</td>
        </tr>
      </table>

      <p style="font-size: 13px; color: #777; margin-top: 24px;">This enquiry was sent via the Igraph Media website contact form.</p>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Igraph Enquiries <leads@igraphmedia.com.ng>',
        to: [toEmail],
        reply_to: lead.email,
        subject: subject,
        text: textContent,
        html: htmlContent
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('[Igraph Lead] Resend dispatch error:', errText);
    }
  } catch (err) {
    console.warn('[Igraph Lead] Resend network error:', err.message);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async function handler(req, res) {
  // 1. Method Restriction
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({
      ok: false,
      error: 'Method Not Allowed',
      message: 'The lead endpoint only accepts POST requests.'
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  // 2. Origin Verification
  if (!isOriginAllowed(req)) {
    return res.status(403).json({
      ok: false,
      error: 'Forbidden',
      message: 'Request origin is not authorized.'
    });
  }

  // 3. Rate Limiting (5 per 10 minutes)
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: 'Too Many Requests',
      message: 'Please wait a few moments before submitting another request, or message us on WhatsApp.'
    });
  }

  // 4. Honeypot Bot Detection
  // 'company_website', 'website', and 'hp_company' are invisible honeypot fields.
  const body = req.body || {};
  if (body.company_website || body.website || body.hp_company) {
    console.warn('[Igraph Lead] Bot submission dropped via honeypot.');
    return res.status(200).json({ ok: true, success: true });
  }

  // 5. Extract & Sanitize Fields
  const name = sanitize(body.name || body.client_name, 120);
  const brand = sanitize(body.brand || body.company_name || body.business_name, 120);
  const email = sanitize(body.email, 254);
  const phone = sanitize(body.phone, 20);
  const serviceSlug = sanitize(body.service || body.service_interest, 50);
  const goal = sanitize(body.goal || body.growth_goal, 1500);

  // 6. Server-Side Field Validation
  if (!name || name.length < 2) {
    return res.status(400).json({
      ok: false,
      error: 'Bad Request',
      message: 'Please provide your name (at least 2 characters).'
    });
  }

  if (!brand || brand.length < 2) {
    return res.status(400).json({
      ok: false,
      error: 'Bad Request',
      message: 'Please provide your business or brand name (at least 2 characters).'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      ok: false,
      error: 'Bad Request',
      message: 'Please provide a valid email address.'
    });
  }

  // Phone is optional, but if provided must be 10-15 digits after stripping formatting
  if (phone) {
    const rawDigits = phone.replace(/^(\+)/, '').replace(/[\s\-\(\)\.]/g, '');
    if (!/^\d{10,15}$/.test(rawDigits)) {
      return res.status(400).json({
        ok: false,
        error: 'Bad Request',
        message: 'Please provide a valid phone or WhatsApp number (10 to 15 digits).'
      });
    }
  }

  // Service must be one of the supported slugs (or fallback for chatbot)
  const isChatbotSource = body.source === 'concierge_chat';
  if (!isChatbotSource && (!serviceSlug || !SERVICE_LABELS[serviceSlug])) {
    return res.status(400).json({
      ok: false,
      error: 'Bad Request',
      message: 'Please select a valid service from the options provided.'
    });
  }

  const serviceLabel = SERVICE_LABELS[serviceSlug] || serviceSlug || 'General Inquiry';

  // 7. Assemble Structured Lead Record
  const leadRecord = {
    company_name: brand,
    client_name: name,
    email: email,
    phone: phone || null,
    growth_goal: goal || 'Not specified',
    service_interest: serviceSlug,
    service_label: serviceLabel,
    timeline: 'Immediate consultation',
    source: isChatbotSource ? 'concierge_chat' : 'contact_form',
    status: 'new',
    metadata: {
      submittedAt: new Date().toISOString(),
      userAgent: sanitize(req.headers['user-agent'] || '', 200),
      ip: clientIp.slice(0, 45)
    }
  };

  try {
    // Save to Supabase (if configured)
    await insertLead(leadRecord);

    // Send instant email notification via Resend (if configured)
    await sendResendNotification(leadRecord);

    return res.status(200).json({ ok: true, success: true });
  } catch (err) {
    console.error('[Igraph Lead] Internal storage error:', err.message);
    // Graceful response to visitor so they are not blocked
    return res.status(200).json({ ok: true, success: true });
  }
};
