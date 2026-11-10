import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SYSTEM_INSTRUCTION = `You are the Senior Igraph Concierge for IGRAPH MEDIA (https://igraphmedia.com), an elite Own Your Narrative · Digital Growth Agency.

YOUR CORE PURPOSE:
We believe that every ambitious startup and small business possesses a story powerful enough to challenge industry leaders. You do not just need promotion—you need to own your narrative. Our core purpose is to give growing brands the voice, authority, and presence required to be heard clearly in a noisy marketplace.

OUR 6 CORE SERVICES:
1. Web Design and Development: Bespoke, luxury digital flagships engineered for lightning speed, mobile responsiveness, and high conversion rates.
2. SEO & Generative Engine Optimization (GEO): Visibility on Google and next-generation AI engines (Perplexity, ChatGPT, Gemini Search).
3. Social Media Management & Omnichannel Content: Viral social narratives, aesthetic direction, and active community growth.
4. High-ROI Digital Advertising: Hyper-targeted campaigns across Meta (Instagram & Facebook), Google Ads, YouTube, TikTok, and LinkedIn with rigorous conversion tracking.
5. Public Relations (PR) & Tier-1 Authority Stature: High-impact media placements, feature articles, and executive positioning.
6. Comprehensive Growth Pods: Dedicated end-to-end transformation pods uniting creative, technical, and media buying talent.

VERIFIED CLIENT RESULTS:
- Cocu Atelier: 21k followers in 3 months, 5M+ organic impressions (Creative Director: Katrin K.).
- TFZ Cakes and Academy: Qualified training cohort leads (Founder: Tobarin .O).
- City Fidelity: Tripled Instagram engagement rate.
- Creator Linda: Custom content strategies for client commercial success.

AGENTIC CAPABILITIES:
1. Lead Qualification: Collects goals, revenue tier, and service focus to provide tailored recommendations.
2. Appointment Booking: Schedules 20-minute private growth consultations with a member of our teams.
3. Human Handover: Seamlessly connects visitors to a live human partner via phone, WhatsApp, or instant callback.
Tone: Welcoming, authoritative, sharp, concise, and easy to understand.`;

interface Message {
  role: "user" | "bot" | "system";
  content: string;
  card?: "qualification" | "booking" | "handover";
  cardData?: any;
}

export default function SupportAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [previousInteractionId, setPreviousInteractionId] = useState<string | null>(null);

  // Booking Card State
  const [selectedSlot, setSelectedSlot] = useState("Tomorrow at 02:00 PM (WAT)");
  const [bookingEmail, setBookingEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Handover Card State
  const [callbackPhone, setCallbackPhone] = useState("");
  const [isCallbackSent, setIsCallbackSent] = useState(false);
  const [showCallbackInput, setShowCallbackInput] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "**Welcome to Igraph Media.**\n\nI am your dedicated Growth Concierge powered by Google Gemini. I can qualify your brand for our growth pods, schedule a private 20-minute consultation directly into our calendar, or instantly connect you with an executive human advisor.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("igraph_gemini_api_key");
    if (saved) {
      setApiKey(saved);
      setTempApiKey(saved);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isThinking]);

  const handleSaveKey = () => {
    if (!tempApiKey.trim()) return;
    setApiKey(tempApiKey.trim());
    localStorage.setItem("igraph_gemini_api_key", tempApiKey.trim());
    setIsSettingsOpen(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: "Gemini API Key saved. Conversational mode is active with **gemini-3.8-flash**!",
      },
    ]);
  };

  const handleClearKey = () => {
    setApiKey("");
    setTempApiKey("");
    localStorage.removeItem("igraph_gemini_api_key");
    setIsSettingsOpen(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: "Gemini API Key removed. Concierge running in local knowledge mode.",
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isThinking) return;

    setInputVal("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsThinking(true);

    const lower = text.toLowerCase();

    // Instant Intent Detection: Human Handover
    if (
      lower.includes("human") ||
      lower.includes("talk to someone") ||
      lower.includes("speak with someone") ||
      lower.includes("handover") ||
      lower.includes("escalate") ||
      lower.includes("representative") ||
      (lower.includes("agent") && (lower.includes("live") || lower.includes("real") || lower.includes("actual")))
    ) {
      setTimeout(() => {
        setIsThinking(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "I am routing your inquiry directly to an a member of our team. Connect immediately below:",
            card: "handover",
            cardData: { reason: text },
          },
        ]);
      }, 400);
      return;
    }

    // Instant Intent Detection: Booking Consultation
    if (
      (lower.includes("book") || lower.includes("schedule") || lower.includes("appointment")) &&
      (lower.includes("call") || lower.includes("consultation") || lower.includes("session") || lower.includes("meeting") || lower.includes("20"))
    ) {
      setTimeout(() => {
        setIsThinking(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "Please select your preferred 20-minute consultation slot with our senior partners:",
            card: "booking",
            cardData: { topic: text },
          },
        ]);
      }, 400);
      return;
    }

    // Instant Intent Detection: Lead Qualification
    if (
      lower.includes("qualify") ||
      lower.includes("my business") ||
      (lower.includes("start") && lower.includes("project"))
    ) {
      setTimeout(() => {
        setIsThinking(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "Here is your qualified commercial growth profile based on your project goals:",
            card: "qualification",
            cardData: {
              company: "Growing Brand",
              service: "Comprehensive Growth Pod & Digital Flagship",
              budget: "$10k - $50k Monthly Scale",
            },
          },
        ]);
      }, 400);
      return;
    }

    try {
      let reply = "";

      // 1. Try backend API proxy if available
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            previous_interaction_id: previousInteractionId,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.reply) {
            reply = data.reply;
            if (data.interaction_id) setPreviousInteractionId(data.interaction_id);
          }
        }
      } catch {
        // Backend not available
      }

      // 2. Direct client-side Gemini Interactions API
      if (!reply && apiKey) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/interactions?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "gemini-3.8-flash",
                input: text,
                system_instruction: SYSTEM_INSTRUCTION,
                store: true,
                ...(previousInteractionId ? { previous_interaction_id: previousInteractionId } : {}),
              }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data?.id) setPreviousInteractionId(data.id);
            if (data?.steps) {
              for (let i = data.steps.length - 1; i >= 0; i--) {
                const s = data.steps[i];
                if (s.type === "model_output" && s.content) {
                  const part = s.content.find((c: any) => c.type === "text");
                  if (part?.text) {
                    reply = part.text;
                    break;
                  }
                }
              }
            }
          }
        } catch (e) {
          console.warn("Direct Gemini call error:", e);
        }
      }

      if (!reply) {
        reply = getLocalFallback(text, !apiKey);
      }

      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I encountered a temporary connection issue. You can reach our advisory team directly at **+234 (815) 325-3639** or **advisory@igraphmedia.com**.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const getLocalFallback = (query: string, needsKey: boolean) => {
    const q = query.toLowerCase();
    let base = "";
    if (q.includes("service") || q.includes("offer")) {
      base =
        "**Igraph Media 6 Core Services:**\n\n• Web Design & Development (Bespoke Luxury)\n• SEO & Generative Engine Optimization (GEO)\n• Social Media Management & Omnichannel Content\n• High-ROI Digital Advertising (Meta, Google, TikTok, LinkedIn)\n• Public Relations (PR) & Tier-1 Authority Stature\n• Comprehensive Growth Pods";
    } else if (q.includes("cocu")) {
      base =
        "**Cocu Atelier Case Study:**\n\nWe scaled luxury fashion house Cocu Atelier organically to **21,000+ followers** within 3 months, generating over **5 million organic impressions** alongside Creative Director Katrin K.";
    } else if (q.includes("tfz")) {
      base =
        "**TFZ Cakes & Academy:**\n\nWe generate consistent qualified leads for their culinary academy cohorts, founded by Tobarin .O.";
    } else if (q.includes("90")) {
      base =
        "**City Fidelity:**\n\nWe restructured their brand media strategy, resulting in a **3x increase in Instagram engagement**.";
    } else if (q.includes("phone") || q.includes("contact") || q.includes("call")) {
      base =
        "**Direct Contact Channels:**\n\n• Direct Phone: **+234 (815) 325-3639**\n• Advisory: **advisory@igraphmedia.com**\n• General: **hello@igraphmedia.com**";
    } else {
      base =
        "**Igraph Media Advisory:**\n\nWe turn authentic brand stories into predictable commercial leadership. Book a private 20-minute consultation or say *'Talk to a human'* for immediate partner escalation.";
    }

    if (needsKey) {
      base += "\n\n*(Add your Gemini API Key via the ⚙ button to enable open-ended reasoning powered by Gemini 3.8 Flash!)*";
    }
    return base;
  };

  const handleConfirmBooking = () => {
    if (!bookingEmail || !bookingEmail.includes("@")) {
      alert("Please provide a valid corporate email for the calendar invitation.");
      return;
    }
    const ref = "IG-CAL-" + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(ref);
    setIsBooked(true);

    try {
      const appointments = JSON.parse(localStorage.getItem("igraph_appointments") || "[]");
      appointments.push({
        ref_id: ref,
        email: bookingEmail,
        slot: selectedSlot,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("igraph_appointments", JSON.stringify(appointments));
    } catch {}
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-7 right-7 z-[999] inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:border-[#B70909] hover:shadow-[#B70909]/20 transition-all hover:-translate-y-0.5"
        aria-label="Open AI Customer Support Chat"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="font-sans text-xs font-semibold">Chat with Igraph</span>
        <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#B70909]/20 text-[#ff6666] border border-[#B70909]/30">
          Agentic
        </span>
      </button>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-7 z-[998] w-[390px] max-w-[calc(100vw-36px)] h-[600px] max-h-[calc(100vh-120px)] bg-[#090909] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#0e0e0e] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B70909] shadow-[0_0_6px_#B70909]" />
                </div>
                <div>
                  <div className="font-sans text-xs font-bold text-white">Igraph Concierge</div>
                  <div className="font-sans text-[10px] text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Agentic AI &bull; Gemini 3.8 Flash</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsSettingsOpen((prev) => !prev)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Configure Gemini API Key"
                >
                  ⚙
                </button>
                <button
                  onClick={() => {
                    setMessages([messages[0]]);
                    setIsBooked(false);
                    setIsCallbackSent(false);
                  }}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset conversation"
                >
                  ↻
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Collapsible Settings */}
            {isSettingsOpen && (
              <div className="p-3 bg-neutral-900 border-b border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-semibold text-neutral-400">
                  <span>Google Gemini API Key</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#ff6666] hover:underline"
                  >
                    Get Key ↗
                  </a>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 bg-black border border-white/20 rounded px-2.5 py-1.5 text-xs text-white font-mono outline-none focus:border-[#B70909]"
                  />
                  <button
                    onClick={handleSaveKey}
                    className="px-3 py-1.5 bg-[#B70909] hover:bg-[#cf1111] text-white text-xs font-semibold rounded transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleClearKey}
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-neutral-300 text-xs rounded transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  {m.role === "system" ? (
                    <div className="w-full text-center py-1 text-[11px] text-neutral-400 bg-white/5 rounded-full">
                      {m.content}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-neutral-800 text-white border border-white/10 rounded-tr-sm"
                          : "bg-neutral-950 text-neutral-200 border border-white/5 rounded-tl-sm whitespace-pre-line"
                      }`}
                    >
                      {m.role === "bot" && (
                        <div className="text-[9px] font-bold uppercase tracking-wider text-[#ff6666] mb-1">
                          Igraph Concierge
                        </div>
                      )}
                      <div>{m.content}</div>

                      {/* Generative UI: Lead Qualification Card */}
                      {m.card === "qualification" && (
                        <div className="mt-2.5 p-3 rounded-xl bg-black border border-white/10 space-y-2 text-neutral-200">
                          <div className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1.5">
                            <span>★</span> Verified Growth Lead
                          </div>
                          <div className="text-xs font-semibold text-white">Commercial Tier Qualification</div>
                          <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-neutral-900 p-2 rounded-lg border border-white/5">
                            <div>
                              <div className="text-[9px] uppercase text-neutral-500">Service</div>
                              <div className="font-semibold text-white">Growth Pod</div>
                            </div>
                            <div>
                              <div className="text-[9px] uppercase text-neutral-500">Scale Tier</div>
                              <div className="font-semibold text-white">$10k-$50k/mo</div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5 pt-1">
                            <button
                              onClick={() => handleSendMessage("Book a 20-minute private consultation")}
                              className="w-full py-1.5 bg-[#B70909] hover:bg-[#cf1111] text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              📅 Book Consultation Now
                            </button>
                            <button
                              onClick={() => handleSendMessage("I want to speak with a human partner")}
                              className="w-full py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs rounded-lg transition-colors"
                            >
                              👤 Connect to a member of our team
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Generative UI: Appointment Booking Card */}
                      {m.card === "booking" && (
                        <div className="mt-2.5 p-3 rounded-xl bg-black border border-white/10 space-y-2 text-neutral-200">
                          <div className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                            <span>📅</span> 20-Minute Advisory Consultation
                          </div>
                          {!isBooked ? (
                            <>
                              <div className="text-[11px] text-neutral-400">Select consultation slot (GMT+1 / WAT):</div>
                              <div className="flex flex-wrap gap-1.5">
                                {[
                                  "Tomorrow at 10:00 AM",
                                  "Tomorrow at 02:00 PM",
                                  "Thursday at 04:30 PM",
                                ].map((slot) => (
                                  <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`px-2 py-1 text-[10px] rounded border transition-colors ${
                                      selectedSlot === slot
                                        ? "bg-[#B70909]/20 border-[#B70909] text-white font-semibold"
                                        : "bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/30"
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] text-neutral-400">Corporate Email:</label>
                                <input
                                  type="email"
                                  value={bookingEmail}
                                  onChange={(e) => setBookingEmail(e.target.value)}
                                  placeholder="director@company.com"
                                  className="w-full bg-neutral-900 border border-white/15 rounded px-2.5 py-1 text-xs text-white outline-none focus:border-[#B70909]"
                                />
                              </div>
                              <button
                                onClick={handleConfirmBooking}
                                className="w-full py-2 bg-[#B70909] hover:bg-[#cf1111] text-white text-xs font-semibold rounded-lg transition-colors mt-1"
                              >
                                Confirm Appointment ✓
                              </button>
                            </>
                          ) : (
                            <div className="space-y-2 pt-1">
                              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                                ✓ Appointment Confirmed
                              </div>
                              <div className="text-[11px] text-neutral-300">
                                Slot reserved: <strong>{selectedSlot}</strong>. Invitation sent to <strong>{bookingEmail}</strong>.
                              </div>
                              <div className="p-2 bg-neutral-900 rounded border border-white/10 text-[10px] flex justify-between">
                                <span className="text-neutral-400">Reference:</span>
                                <span className="font-mono font-bold text-white">{bookingRef}</span>
                              </div>
                              <a
                                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                                  "Igraph Media Growth Consultation"
                                )}&details=${encodeURIComponent(
                                  `Reference: ${bookingRef}\nPrivate strategic consultation.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block text-center py-1.5 bg-[#B70909] hover:bg-[#cf1111] text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                📅 Add to Google Calendar
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Generative UI: Live Human Handover Card */}
                      {m.card === "handover" && (
                        <div className="mt-2.5 p-3 rounded-xl bg-black border border-white/10 space-y-2 text-neutral-200">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center font-bold text-white text-xs">
                              IM
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">Client Operations Team</div>
                              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Senior Partner Active (Live Handover Ready)</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5 pt-1">
                            <a
                              href="tel:+2348153253639"
                              className="w-full text-center py-1.5 bg-[#B70909] hover:bg-[#cf1111] text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              📞 Call Direct: +234 (815) 325-3639
                            </a>
                            <a
                              href={`https://wa.me/2348153253639?text=${encodeURIComponent(
                                "Hello Igraph Media Advisory. I would like to speak with an a member of our team regarding our brand growth."
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full text-center py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              💬 Open Direct WhatsApp Chat
                            </a>
                            <button
                              onClick={() => setShowCallbackInput((prev) => !prev)}
                              className="w-full py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs rounded-lg transition-colors"
                            >
                              🔔 Request Instant Callback
                            </button>

                            {showCallbackInput && !isCallbackSent && (
                              <div className="p-2 bg-neutral-900 rounded-lg border border-white/10 space-y-1.5 mt-1">
                                <label className="text-[10px] text-neutral-400">Direct Phone Number:</label>
                                <div className="flex gap-1.5">
                                  <input
                                    type="tel"
                                    value={callbackPhone}
                                    onChange={(e) => setCallbackPhone(e.target.value)}
                                    placeholder="+234 ..."
                                    className="flex-1 bg-black border border-white/20 rounded px-2 py-1 text-xs text-white outline-none focus:border-[#B70909]"
                                  />
                                  <button
                                    onClick={() => {
                                      if (callbackPhone.trim()) {
                                        setIsCallbackSent(true);
                                      }
                                    }}
                                    className="px-2.5 py-1 bg-[#B70909] text-white text-xs rounded font-semibold"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            )}

                            {isCallbackSent && (
                              <div className="p-2 bg-emerald-950/40 border border-emerald-500/30 rounded text-[11px] text-emerald-400 font-semibold">
                                ✓ Callback request logged. An a member of our team will phone you at {callbackPhone} within 15 minutes.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-neutral-950 border border-white/5 rounded-2xl rounded-tl-sm p-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6666] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6666] animate-pulse delay-75" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6666] animate-pulse delay-150" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 bg-neutral-950 border-t border-white/5 flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSendMessage("Book a 20-minute consultation")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#B70909] text-neutral-300 hover:text-white transition-colors"
              >
                📅 Book Call
              </button>
              <button
                onClick={() => handleSendMessage("I want to speak with a human partner")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#B70909] text-neutral-300 hover:text-white transition-colors"
              >
                👤 Human Agent
              </button>
              <button
                onClick={() => handleSendMessage("Qualify my brand for growth pods")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#B70909] text-neutral-300 hover:text-white transition-colors"
              >
                🎯 Qualify Brand
              </button>
              <button
                onClick={() => handleSendMessage("What services do you provide?")}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#B70909] text-neutral-300 hover:text-white transition-colors"
              >
                💼 Services
              </button>
            </div>

            {/* Footer Input */}
            <div className="p-3 bg-[#0c0c0c] border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-black border border-white/15 rounded-xl px-3 py-1.5 focus-within:border-[#B70909]"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask, qualify, or request human handover..."
                  className="flex-1 bg-transparent border-none text-xs text-white outline-none placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={isThinking}
                  className="w-7 h-7 rounded-lg bg-[#B70909] hover:bg-[#cf1111] text-white flex items-center justify-center text-xs transition-colors disabled:opacity-40"
                >
                  ↑
                </button>
              </form>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
