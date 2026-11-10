/**
 * Supabase Client Utility for Igraph Media
 * Works seamlessly across Vercel Serverless Functions and Node.js runtimes.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Executes a Supabase REST request with zero external dependencies.
 * Falls back gracefully when Supabase credentials are not configured.
 */
async function supabaseFetch(table, { method = 'GET', body = null, select = '*' } = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn(`[Supabase] Missing credentials. Operating in development fallback mode.`);
    return { data: body ? [body] : [], error: null, fallback: true };
  }

  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}${select ? `?select=${encodeURIComponent(select)}` : ''}`;

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': method === 'POST' ? 'return=representation' : ''
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Supabase] Error on ${table} (${response.status}):`, errorText);
      return { data: null, error: errorText };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error(`[Supabase] Network exception on ${table}:`, err);
    return { data: null, error: err.message };
  }
}

/**
 * Inserts a new lead into public.leads
 */
async function insertLead(leadData) {
  const payload = {
    client_name: leadData.client_name || leadData.name || 'Anonymous Prospect',
    company_name: leadData.company_name || leadData.company || 'Not Specified',
    email: leadData.email || 'pending@contact.com',
    phone: leadData.phone || null,
    service_interest: leadData.service_interest || leadData.service || 'General Growth Enquiry',
    growth_goal: leadData.growth_goal || leadData.goal || null,
    monthly_budget: leadData.monthly_budget || leadData.budget || null,
    timeline: leadData.timeline || 'Within 30 days',
    message: leadData.message || leadData.notes || null,
    nda_requested: Boolean(leadData.nda_requested || leadData.nda),
    source: leadData.source || 'website_form',
    status: 'new'
  };

  return supabaseFetch('leads', { method: 'POST', body: payload });
}

/**
 * Inserts a new appointment into public.appointments
 */
async function insertAppointment(apptData) {
  const payload = {
    client_name: apptData.client_name || apptData.name || 'Prospect',
    company_name: apptData.company_name || apptData.company || 'Brand Client',
    email: apptData.email || 'pending@contact.com',
    phone: apptData.phone || null,
    preferred_date: apptData.preferred_date || apptData.date || new Date().toISOString().split('T')[0],
    preferred_time: apptData.preferred_time || apptData.time || '14:00 WAT',
    timezone: apptData.timezone || 'WAT',
    growth_focus: apptData.growth_focus || apptData.topic || 'General Growth Strategy',
    status: 'pending'
  };

  return supabaseFetch('appointments', { method: 'POST', body: payload });
}

/**
 * Inserts a human handover escalation record into public.handovers
 */
async function insertHandover(handoverData) {
  const payload = {
    client_name: handoverData.client_name || handoverData.name || 'Executive Visitor',
    company_name: handoverData.company_name || handoverData.company || null,
    email: handoverData.email || null,
    phone: handoverData.phone || null,
    reason: handoverData.reason || 'Visitor requested human partner handover',
    conversation_summary: handoverData.summary || handoverData.conversation_summary || null,
    urgency: handoverData.urgency || 'normal',
    status: 'requested'
  };

  return supabaseFetch('handovers', { method: 'POST', body: payload });
}

/**
 * Logs a conversation turn into public.chat_logs
 */
async function logChatTurn(logData) {
  const payload = {
    session_id: logData.session_id || 'anon-session',
    interaction_id: logData.interaction_id || null,
    user_message: logData.user_message || '',
    bot_reply: logData.bot_reply || '',
    function_called: logData.function_called || null,
    function_arguments: logData.function_arguments || null,
    model_version: logData.model_version || 'gemini-3.8-flash'
  };

  return supabaseFetch('chat_logs', { method: 'POST', body: payload });
}

module.exports = {
  supabaseFetch,
  insertLead,
  insertAppointment,
  insertHandover,
  logChatTurn
};
