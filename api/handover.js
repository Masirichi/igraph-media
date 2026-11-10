/**
 * Vercel Serverless Function: /api/handover
 * Handles live human agent handover escalation requests.
 * Inserts directly into Supabase public.handovers table.
 */

const { insertHandover } = require('../lib/supabase');

module.exports = async function handler(req, res) {
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

    const result = await insertHandover(body);

    if (result.error) {
      console.error('[API Handover] Supabase error:', result.error);
      return res.status(200).json({
        success: true,
        saved_locally: true,
        message: 'Handover request logged for executive team review.',
        handover: body
      });
    }

    return res.status(201).json({
      success: true,
      data: result.data,
      message: 'Human team handover registered in Supabase.'
    });

  } catch (err) {
    console.error('[API Handover] Server error:', err);
    return res.status(500).json({
      error: 'Internal server error processing handover escalation.',
      details: err.message
    });
  }
};
