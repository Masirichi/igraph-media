/**
 * Vercel Serverless Function: /api/status
 * Health check & configuration status for Igraph Media backend.
 */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabaseConfigured = Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY);

  return res.status(200).json({
    status: 'online',
    service: 'Igraph Media Backend Infrastructure',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'production',
    integrations: {
      supabase: supabaseConfigured ? 'connected' : 'pending_configuration',
      gemini_ai: geminiConfigured ? 'configured' : 'client_key_fallback'
    },
    version: '2.5.0'
  });
};
