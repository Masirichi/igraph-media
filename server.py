#!/usr/bin/env python3
"""
IGRAPH MEDIA — AGENTIC DEVELOPMENT SERVER & GEMINI API PROXY
Serves static website files and provides agentic backend endpoints for:
- Lead Qualification
- Appointment Booking
- Live Human Handover Escalation
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DIRECTORY = Path(__file__).parent.resolve()
PORT = 8080

# Load .env file if present
env_file = DIRECTORY / ".env"
if env_file.exists():
    try:
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    k = k.strip()
                    v = v.strip().strip('"').strip("'")
                    if k and v and k not in os.environ:
                        os.environ[k] = v
    except Exception as e:
        print(f"[Server] Note: Could not parse .env: {e}")

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()

SYSTEM_INSTRUCTION = """You are the Senior Advisory Concierge for IGRAPH MEDIA (https://igraphmedia.com), an elite Independent Media & Brand Advisory.

YOUR CORE PURPOSE:
We believe that every ambitious startup and small business possesses a story powerful enough to challenge industry leaders. You do not just need promotion—you need to own your narrative. Our core purpose is to give growing brands the voice, authority, and presence required to be heard clearly in a noisy marketplace.

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
- Cocu Atelier: Grew social media presence to 21k within 3 months organically, amassing over 5 million organic traffic impressions (Creative Director: Katrin K.).
- TFZ Cakes and Academy: Generated high-intent qualified leads for their culinary academy training programs (Founder: Tobarin .O).
- City Fidelity: Revamped complete social media strategy and tripled engagements on Instagram across every campaign.
- Creator Linda: Designed tailored content strategies delivering commercial business success and audience loyalty.
- Additional Scaling Brands: Unifera, Hexaves, Gidavest, Perfection Beauty Home, DandyAyanfe, Arie & Arin, Techregard, Moderncrux, Cityfidelity.

OPERATIONAL ASSURANCES:
- Mutual Non-Disclosure Agreements (NDAs) signed before work begins.
- Dedicated Partner Collaboration & Transparent Performance Tracking.
- Consultation: Complimentary 20-minute private growth consultation with an executive partner.

DIRECT CONTACT CHANNELS:
- Phone: +234 (815) 325-3639
- Advisory Briefs: advisory@igraphmedia.com
- General Inquiries: hello@igraphmedia.com
- Location: Independent Media & Brand Advisory (GMT+1 / Global Operations)

AGENTIC CAPABILITIES & GUIDELINES:
1. LEAD QUALIFICATION: Proactively qualify prospective clients by understanding their business name, core growth bottlenecks, budget/revenue tier, and service requirement. Call the qualify_lead tool when details are gathered.
2. APPOINTMENT BOOKING: Offer and schedule private 20-minute consultations. Call the book_appointment tool when the user requests an appointment or consultation.
3. HUMAN HANDOVER: When a user asks to talk to a human, speak with a live person, representative, or requests direct executive partner intervention, call the handover_to_human tool immediately.
4. TONE: Welcoming, authoritative, sharp, concise, and easy to understand for everyday visitors without losing luxury polish."""

GEMINI_TOOLS = [
    {
        "type": "function",
        "name": "qualify_lead",
        "description": "Qualify a commercial prospect or business lead for Igraph Media advisory services.",
        "parameters": {
            "type": "object",
            "properties": {
                "client_name": {"type": "string", "description": "Client full name or title"},
                "company_name": {"type": "string", "description": "Company or brand name"},
                "service_interest": {"type": "string", "description": "Primary service needed (Press Release, Social Media, Personal Branding, Media Buying, SEO, Brand Promotion, Content Strategy, Digital Ads)"},
                "growth_goal": {"type": "string", "description": "Main revenue bottleneck or milestone"},
                "monthly_budget": {"type": "string", "description": "Estimated growth budget or monthly revenue stage"},
                "email": {"type": "string", "description": "Corporate or contact email"},
                "phone": {"type": "string", "description": "Direct telephone or WhatsApp number"}
            },
            "required": ["company_name", "service_interest"]
        }
    },
    {
        "type": "function",
        "name": "book_appointment",
        "description": "Book a private 20-minute growth consultation with an Igraph Media executive partner.",
        "parameters": {
            "type": "object",
            "properties": {
                "client_name": {"type": "string", "description": "Client full name"},
                "company_name": {"type": "string", "description": "Company or brand name"},
                "preferred_date": {"type": "string", "description": "Preferred date (e.g. Tomorrow, Monday, YYYY-MM-DD)"},
                "preferred_time": {"type": "string", "description": "Preferred time slot (e.g. 10:00 AM, 02:00 PM, 04:30 PM WAT)"},
                "email": {"type": "string", "description": "Email address for calendar invitation"},
                "topic": {"type": "string", "description": "Core topic or commercial focus of the call"}
            },
            "required": ["preferred_date"]
        }
    },
    {
        "type": "function",
        "name": "handover_to_human",
        "description": "Escalate and handover the conversation to an actual human advisor or senior partner at Igraph Media.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {"type": "string", "description": "Reason for human escalation"},
                "client_name": {"type": "string", "description": "Client name if known"},
                "summary": {"type": "string", "description": "Brief executive summary of visitor needs"},
                "urgency": {"type": "string", "enum": ["immediate", "high", "normal"], "description": "Urgency level"}
            },
            "required": ["reason"]
        }
    }
]


class IgraphProxyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def do_GET(self):
        if self.path == "/api/status":
            self.send_json_response(200, {
                "status": "online",
                "gemini_configured": bool(GEMINI_API_KEY),
                "model": "gemini-3.8-flash",
                "agentic_tools": ["qualify_lead", "book_appointment", "handover_to_human"],
                "version": "2.0.0"
            })
            return
        
        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/chat":
            self.handle_chat()
            return
        elif self.path == "/api/leads":
            self.handle_save_data("leads.json")
            return
        elif self.path == "/api/appointments":
            self.handle_save_data("appointments.json")
            return
        elif self.path == "/api/handover":
            self.handle_save_data("handovers.json")
            return
        
        self.send_error(404, "Endpoint not found")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def send_json_response(self, code, payload):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(payload, indent=2).encode("utf-8"))

    def handle_save_data(self, filename):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            item = json.loads(body)
        except Exception:
            item = {}
        item["created_at"] = datetime.utcnow().isoformat() + "Z"

        file_path = DIRECTORY / filename
        data = []
        if file_path.exists():
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                data = []
        data.append(item)
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"[Server] Error saving {filename}: {e}")

        self.send_json_response(200, {"success": True, "file": filename})

    def handle_chat(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length <= 0:
            self.send_error(400, "Empty payload")
            return

        body = self.rfile.read(content_length).decode("utf-8")
        try:
            req_data = json.loads(body)
        except Exception:
            self.send_error(400, "Invalid JSON")
            return

        user_message = req_data.get("message", "").strip()
        prev_id = req_data.get("previous_interaction_id")
        history = req_data.get("history", [])

        if not user_message:
            self.send_error(400, "Message required")
            return

        api_key = GEMINI_API_KEY or req_data.get("api_key", "").strip()
        if not api_key:
            self.send_json_response(200, {
                "error": "KEY_MISSING",
                "reply": None
            })
            return

        reply_text, tool_call, interaction_id = self.query_gemini(api_key, user_message, prev_id, history)

        self.send_json_response(200, {
            "reply": reply_text,
            "function_call": tool_call,
            "interaction_id": interaction_id
        })

    def query_gemini(self, api_key, user_message, prev_id=None, history=None):
        tool_call = None

        # 1. Try modern Interactions API with tools
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/interactions?key={api_key}"
            payload = {
                "model": "gemini-3.8-flash",
                "input": user_message,
                "system_instruction": SYSTEM_INSTRUCTION,
                "tools": GEMINI_TOOLS,
                "store": True
            }
            if prev_id:
                payload["previous_interaction_id"] = prev_id

            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                res_json = json.loads(resp.read().decode("utf-8"))
                interaction_id = res_json.get("id")
                steps = res_json.get("steps", [])
                reply = ""
                for step in steps:
                    if step.get("type") == "function_call":
                        tool_call = {
                            "name": step.get("name"),
                            "args": step.get("arguments", {})
                        }
                    if step.get("type") == "model_output" and "content" in step:
                        for c in step["content"]:
                            if c.get("type") == "text" and "text" in c:
                                reply = c["text"]
                if not reply and "output_text" in res_json:
                    reply = res_json["output_text"]
                if reply or tool_call:
                    return reply, tool_call, interaction_id
        except Exception as e:
            print(f"[Server] Interactions API notice: {e}, falling back to generateContent")

        # 2. Fallback to generateContent API
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
            contents = []
            if history:
                for h in history[-6:]:
                    role = "user" if h.get("role") == "user" else "model"
                    contents.append({"role": role, "parts": [{"text": h.get("content", "")}]})
            contents.append({"role": "user", "parts": [{"text": user_message}]})

            payload = {
                "system_instruction": {"parts": [{"text": SYSTEM_INSTRUCTION}]},
                "contents": contents,
                "tools": [{
                    "functionDeclarations": [
                        {
                            "name": t["name"],
                            "description": t["description"],
                            "parameters": t["parameters"]
                        }
                        for t in GEMINI_TOOLS
                    ]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 800
                }
            }
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                res_json = json.loads(resp.read().decode("utf-8"))
                candidates = res_json.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    reply = ""
                    for p in parts:
                        if "text" in p:
                            reply += p["text"]
                        if "functionCall" in p:
                            tool_call = {
                                "name": p["functionCall"].get("name"),
                                "args": p["functionCall"].get("args", {})
                            }
                    return reply, tool_call, None
        except Exception as e:
            print(f"[Server] generateContent error: {e}")

        return (
            "I apologize, but I could not connect to the Gemini API right now. "
            "Please ensure your API key is valid or reach out to our team at +234 (815) 325-3639.",
            None,
            None
        )


def run_server():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, IgraphProxyHandler)
    print(f"[Server] Igraph Media Agentic Server running at http://localhost:{PORT}")
    print(f"[Server] Agentic Capabilities: Lead Qualification | Appointment Booking | Human Handover")
    print(f"[Server] Gemini Key status: {'CONFIGURED' if GEMINI_API_KEY else 'NOT SET (client key input enabled)'}")
    httpd.serve_forever()


if __name__ == "__main__":
    run_server()
