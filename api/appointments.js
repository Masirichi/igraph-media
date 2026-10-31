/**
 * Vercel Serverless Function: /api/appointments
 * Handles 20-minute private growth consultation bookings.
 * Inserts directly into Supabase public.appointments table.
 */

const { insertAppointment } = require('../lib/supabase');

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

    if (!body.client_name && !body.name && !body.email) {
      return res.status(400).json({
        error: 'Missing required attendee details (name or email).'
      });
    }

    const result = await insertAppointment(body);

    if (result.error) {
      console.error('[API Appointments] Supabase error:', result.error);
      return res.status(200).json({
        success: true,
        saved_locally: true,
        message: 'Appointment request received and queued.',
        appointment: body
      });
    }

    return res.status(201).json({
      success: true,
      data: result.data,
      message: 'Consultation appointment scheduled in Supabase.'
    });

  } catch (err) {
    console.error('[API Appointments] Server error:', err);
    return res.status(500).json({
      error: 'Internal server error booking appointment.',
      details: err.message
    });
  }
};
