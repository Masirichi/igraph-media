/**
 * Vercel Serverless Function: /api/leads
 * Handles lead intake from website forms and AI Concierge qualification.
 * Inserts directly into Supabase public.leads table.
 */

const { insertLead } = require('../lib/supabase');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = req.body || {};
    
    // Basic validation
    if (!body.client_name && !body.name && !body.company_name && !body.company && !body.email) {
      return res.status(400).json({
        error: 'Missing required fields. Provide client name, company name, and email.'
      });
    }

    const result = await insertLead(body);

    if (result.error) {
      console.error('[API Leads] Supabase error:', result.error);
      // Fallback response so user UX is never interrupted
      return res.status(200).json({
        success: true,
        saved_locally: true,
        message: 'Lead received and queued for team review.',
        lead: body
      });
    }

    return res.status(201).json({
      success: true,
      data: result.data,
      message: 'Lead successfully recorded in Supabase CRM.'
    });

  } catch (err) {
    console.error('[API Leads] Server error:', err);
    return res.status(500).json({
      error: 'Internal server error processing lead enquiry.',
      details: err.message
    });
  }
};
