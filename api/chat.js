/**
 * Vercel Serverless Function: /api/chat
 * Secure AI Concierge endpoint powered by Google Gemini API.
 * Automatically saves qualified leads, booked appointments, and handovers to Supabase.
 */

const { insertLead, insertAppointment, insertHandover, logChatTurn } = require('../lib/supabase');

const SYSTEM_INSTRUCTION = `You are the Senior Advisory Concierge for IGRAPH MEDIA (https://igraphmedia.com), an elite Independent Media & Brand Advisory.

YOUR CORE PURPOSE:
We believe that every ambitious startup and growing business possesses a story powerful enough to challenge industry leaders. You do not just need promotion—you need to own your narrative. Our core purpose is to give growing brands the voice, authority, and presence required to be heard clearly in a noisy marketplace.

GROWTH ARCHITECTURE & STRATEGY:
By combining data-backed public relations strategies with precise, targeted digital advertising, we turn authentic brand stories into measurable commercial success. We focus on clear facts, persuasive positioning, and consistent execution to help you earn customer trust, outmaneuver competitors, and build lasting market leadership.

OUR 8 CORE SERVICES:
1. Press Release Distribution: Craft compelling narratives and ensure they reach the right audience with professional press release distribution in top-tier publications.
2. Social Media Management: Build a strong online presence and foster meaningful connections with strategic campaigns, profile management, and engaging content.
3. Personal Branding & Profiling: Establish yourself as an industry authority with cohesive personal branding, media kits, and optimized social profiles.
4. Media Planning & Buying: Develop strategic, data-driven media plans to maximize your advertising budget and reach the right customers at the right time.
5. Search Engine Optimization (SEO): Improve online visibility and attract the right customers with comprehensive audits, customized strategies, and best practices.
6. Brand Promotion: Elevate brand presence and reputation through integrated brand promotion, content strategy, and digital advertising.
7. Content Strategy: Captivate your audience with compelling, SEO-optimized articles, videos, and visuals tailored to resonate with your target market.
8. Digital Advertising: Advanced digital advertising solutions leveraging data-driven targeting, creative optimization, and performance tracking for stellar ROI.

VERIFIED CLIENT RESULTS & CASE STUDIES:
- Cocu Atelier: Grew luxury fashion presence to 21k within 3 months organically, amassing over 5 million organic traffic impressions (Creative Director: Katrin K.).
- TFZ Cakes and Academy: Generated high-intent qualified leads for their culinary academy training programs (Founder: Tobarin .O).
- 90's Management: Revamped complete social media strategy and tripled engagements on Instagram across every campaign.
- Creator Linda: Designed tailored content strategies delivering commercial business success and audience loyalty.
- Additional Scaling Brands: Unifera, Hexaves, Gidavest, Perfection Beauty Home, DandyAyanfe, Arie & Arin, Techregard, Moderncrux, Cityfidelity.

OPERATIONAL ASSURANCES:
- Mutual Non-Disclosure Agreements (NDAs) signed before work begins.
- Dedicated Partner Collaboration & Transparent Performance Tracking.
- Consultation: Complimentary 20-minute private growth consultation with an executive partner.

DIRECT CONTACT CHANNELS:
- Direct Line: +234 (815) 325-3639
- Advisory Briefs: advisory@igraphmedia.com
- General Inquiries: hello@igraphmedia.com
- Active Hours: Monday – Friday, 9:00 AM – 6:00 PM WAT

YOUR AGENTIC CAPABILITIES:
1. When a visitor shares their company name, email, or budget interest, proactively call "qualify_lead".
2. When a visitor expresses interest in scheduling a session or call, call "book_appointment".
3. When a visitor asks to speak with a human or has a critical inquiry, call "handover_to_human".
Maintain a polished, authoritative, concise, and helpful tone at all times.`;

const AGENT_TOOLS = [
  {
    name: "qualify_lead",
    description: "Qualify a commercial prospect or business lead for Igraph Media advisory services.",
    parameters: {
      type: "OBJECT",
      properties: {
        client_name: { type: "STRING", description: "Client full name or title" },
        company_name: { type: "STRING", description: "Company or brand name" },
        service_interest: { type: "STRING", description: "Primary service needed from the 8 core services" },
        growth_goal: { type: "STRING", description: "Main revenue bottleneck or commercial goal" },
        monthly_budget: { type: "STRING", description: "Estimated growth budget or monthly revenue stage" },
        email: { type: "STRING", description: "Corporate or contact email" },
        phone: { type: "STRING", description: "Direct telephone or WhatsApp number" }
      },
      required: ["company_name", "service_interest"]
    }
  },
  {
    name: "book_appointment",
    description: "Book a private 20-minute growth consultation with an Igraph Media executive partner.",
    parameters: {
      type: "OBJECT",
      properties: {
        client_name: { type: "STRING", description: "Full name of the attendee" },
        company_name: { type: "STRING", description: "Company or brand represented" },
        email: { type: "STRING", description: "Corporate email for calendar invite" },
        phone: { type: "STRING", description: "Direct phone or WhatsApp" },
        preferred_date: { type: "STRING", description: "Preferred date (YYYY-MM-DD)" },
        preferred_time: { type: "STRING", description: "Preferred time window in WAT" },
        growth_focus: { type: "STRING", description: "Primary growth bottleneck or advisory topic" }
      },
      required: ["client_name", "email"]
    }
  },
  {
    name: "handover_to_human",
    description: "Escalate and handover the conversation to an actual human advisor or senior partner at Igraph Media.",
    parameters: {
      type: "OBJECT",
      properties: {
        reason: { type: "STRING", description: "Reason for human escalation" },
        client_name: { type: "STRING", description: "Client name if known" },
        summary: { type: "STRING", description: "Brief executive summary of visitor needs" },
        urgency: { type: "STRING", enum: ["immediate", "high", "normal"], description: "Urgency level" }
      },
      required: ["reason"]
    }
  }
];

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

  const { message, history = [], session_id = 'session_' + Date.now(), api_key: clientKey } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || clientKey;
  if (!apiKey) {
    return res.status(200).json({
      error: 'KEY_MISSING',
      reply: null,
      message: 'Server GEMINI_API_KEY is not configured yet. Client key required.'
    });
  }

  try {
    // Format contents payload for Google Gemini generateContent endpoint
    const contents = [];

    // Prior conversation turns
    for (const item of history.slice(-8)) {
      if (item.sender === 'user' && item.text) {
        contents.push({ role: 'user', parts: [{ text: item.text }] });
      } else if (item.sender === 'bot' && item.text) {
        contents.push({ role: 'model', parts: [{ text: item.text }] });
      }
    }

    // Current turn
    contents.push({ role: 'user', parts: [{ text: message }] });

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents,
      tools: [{ functionDeclarations: AGENT_TOOLS }],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 600
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    });

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error('[API Chat] Gemini API error:', geminiRes.status, errBody);
      return res.status(500).json({ error: 'Upstream AI service error', details: errBody });
    }

    const geminiData = await geminiRes.json();
    const candidate = geminiData.candidates?.[0]?.content?.parts || [];

    let replyText = '';
    let functionCall = null;

    for (const part of candidate) {
      if (part.text) {
        replyText += part.text;
      }
      if (part.functionCall) {
        functionCall = {
          name: part.functionCall.name,
          args: part.functionCall.args || {}
        };
      }
    }

    // Agentic side-effects: Save directly to Supabase in the background!
    if (functionCall) {
      if (functionCall.name === 'qualify_lead') {
        await insertLead({ ...functionCall.args, source: 'ai_concierge' });
      } else if (functionCall.name === 'book_appointment') {
        await insertAppointment(functionCall.args);
      } else if (functionCall.name === 'handover_to_human') {
        await insertHandover(functionCall.args);
      }
    }

    // Log chat interaction turn
    await logChatTurn({
      session_id,
      user_message: message,
      bot_reply: replyText,
      function_called: functionCall ? functionCall.name : null,
      function_arguments: functionCall ? functionCall.args : null
    });

    return res.status(200).json({
      reply: replyText,
      function_call: functionCall,
      interaction_id: geminiData.usageMetadata ? `gemini_${Date.now()}` : null
    });

  } catch (err) {
    console.error('[API Chat] Execution error:', err);
    return res.status(500).json({ error: 'Server error processing chat message.', details: err.message });
  }
};
