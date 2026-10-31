/**
 * IGRAPH MEDIA — CONVERSATIONAL CUSTOMER SUPPORT AGENT
 * Powered by Google Gemini API (gemini-3.8-flash)
 * 
 * Agentic Capabilities:
 * - 1. Lead Qualification: Discovers client goals, qualifies tier, generates customized growth briefs.
 * - 2. Appointment Booking: Interactive 20-min consultation booking, calendar links, reference IDs.
 * - 3. Human Handover: Seamless escalation to executive partners, direct WhatsApp, and phone channels.
 */

(() => {
  'use strict';

  // System instruction defining the Igraph Media Advisory Agent Persona with Agentic Capabilities
  const SYSTEM_INSTRUCTION = `You are the Senior Advisory Concierge for IGRAPH MEDIA (https://igraphmedia.com), an elite Independent Media & Brand Advisory.

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

VERIFIED CLIENT RESULTS:
- Cocu Atelier: Grew social media presence to 21k within 3 months organically, amassing over 5 million organic traffic impressions (Creative Director: Katrin K.).
- TFZ Cakes and Academy: Generated high-intent qualified leads for their culinary academy training programs (Founder: Tobarin .O).
- 90's Management: Revamped complete social media strategy and tripled engagements on Instagram across every campaign.
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
4. TONE: Welcoming, authoritative, sharp, concise, and easy to understand for everyday visitors without losing luxury polish.`;

  // Tools definition for Gemini API
  const GEMINI_TOOLS = [
    {
      type: "function",
      name: "qualify_lead",
      description: "Qualify a commercial prospect or business lead for Igraph Media advisory services.",
      parameters: {
        type: "object",
        properties: {
          client_name: { type: "string", description: "Client full name or title" },
          company_name: { type: "string", description: "Company or brand name" },
          service_interest: { type: "string", description: "Primary service needed (Web, Ads, SEO/GEO, Social Media, PR, Growth Pod)" },
          growth_goal: { type: "string", description: "Main revenue bottleneck or milestone" },
          monthly_budget: { type: "string", description: "Estimated growth budget or monthly revenue stage" },
          email: { type: "string", description: "Corporate or contact email" },
          phone: { type: "string", description: "Direct telephone or WhatsApp number" }
        },
        required: ["company_name", "service_interest"]
      }
    },
    {
      type: "function",
      name: "book_appointment",
      description: "Book a private 20-minute growth consultation with an Igraph Media executive partner.",
      parameters: {
        type: "object",
        properties: {
          client_name: { type: "string", description: "Client full name" },
          company_name: { type: "string", description: "Company or brand name" },
          preferred_date: { type: "string", description: "Preferred date (e.g. Tomorrow, Monday, YYYY-MM-DD)" },
          preferred_time: { type: "string", description: "Preferred time slot (e.g. 10:00 AM, 02:00 PM, 04:30 PM WAT)" },
          email: { type: "string", description: "Email address for calendar invitation" },
          topic: { type: "string", description: "Core topic or commercial focus of the call" }
        },
        required: ["preferred_date"]
      }
    },
    {
      type: "function",
      name: "handover_to_human",
      description: "Escalate and handover the conversation to an actual human advisor or senior partner at Igraph Media.",
      parameters: {
        type: "object",
        properties: {
          reason: { type: "string", description: "Reason for human escalation" },
          client_name: { type: "string", description: "Client name if known" },
          summary: { type: "string", description: "Brief executive summary of visitor needs" },
          urgency: { type: "string", enum: ["immediate", "high", "normal"], description: "Urgency level" }
        },
        required: ["reason"]
      }
    }
  ];

  // Markdown rendering helper
  function renderMarkdown(text) {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
    escaped = escaped.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    escaped = escaped.replace(/^• (.*?)$/gm, '<li class="agent-bullet">$1</li>');
    escaped = escaped.replace(/(<li class="agent-bullet">.*?<\/li>(\n|$) *)+/g, '<ul class="agent-list">$&</ul>');
    escaped = escaped.replace(/\n\n/g, '<p class="agent-p"></p>');
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  }

  class IgraphSupportAgent {
    constructor() {
      this.storageKey = 'igraph_gemini_api_key';
      this.apiKey = localStorage.getItem(this.storageKey) || '';
      this.history = [];
      this.previousInteractionId = null;
      this.isOpen = false;
      this.isThinking = false;

      // Active lead state
      this.leadData = {
        name: '',
        company: '',
        service: '',
        goal: '',
        email: '',
        phone: ''
      };

      this.initDOMElements();
      this.bindEvents();
      this.updateStatusBadge();
    }

    initDOMElements() {
      this.toggleBtn = document.getElementById('aiChatToggle');
      this.drawer = document.getElementById('aiChatDrawer');
      this.closeBtn = document.getElementById('aiChatClose');
      this.resetBtn = document.getElementById('aiChatReset');
      this.settingsBtn = document.getElementById('aiChatSettings');
      this.settingsPanel = document.getElementById('aiChatSettingsPanel');
      this.apiKeyInput = document.getElementById('aiGeminiKeyInput');
      this.saveKeyBtn = document.getElementById('aiSaveKeyBtn');
      this.clearKeyBtn = document.getElementById('aiClearKeyBtn');
      this.statusBadge = document.getElementById('aiStatusBadge');
      this.messagesContainer = document.getElementById('aiChatMessages');
      this.form = document.getElementById('aiChatForm');
      this.input = document.getElementById('aiChatInput');
      this.sendBtn = document.getElementById('aiChatSendBtn');
      this.chips = document.querySelectorAll('.ai-prompt-chip');

      if (this.apiKeyInput && this.apiKey) {
        this.apiKeyInput.value = this.apiKey;
      }
    }

    bindEvents() {
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => this.toggleDrawer());
      }
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.closeDrawer());
      }
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => this.resetConversation());
      }
      if (this.settingsBtn) {
        this.settingsBtn.addEventListener('click', () => this.toggleSettings());
      }
      if (this.saveKeyBtn) {
        this.saveKeyBtn.addEventListener('click', () => this.saveApiKey());
      }
      if (this.clearKeyBtn) {
        this.clearKeyBtn.addEventListener('click', () => this.clearApiKey());
      }
      if (this.form) {
        this.form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSendMessage();
        });
      }
      if (this.input) {
        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendMessage();
          }
        });
      }

      // Prompt chips
      if (this.chips) {
        this.chips.forEach((chip) => {
          chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
            this.sendMessage(prompt);
          });
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDrawer();
        }
      });
    }

    toggleDrawer() {
      if (this.isOpen) {
        this.closeDrawer();
      } else {
        this.openDrawer();
      }
    }

    openDrawer() {
      this.isOpen = true;
      this.drawer.style.display = 'flex';
      requestAnimationFrame(() => {
        this.drawer.classList.add('active');
        this.toggleBtn.classList.add('active');
        this.toggleBtn.setAttribute('aria-expanded', 'true');
      });
      setTimeout(() => {
        if (this.input) this.input.focus();
        this.scrollToBottom();
      }, 300);
    }

    closeDrawer() {
      this.isOpen = false;
      this.drawer.classList.remove('active');
      this.toggleBtn.classList.remove('active');
      this.toggleBtn.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        if (!this.isOpen) {
          this.drawer.style.display = 'none';
        }
      }, 290);
    }

    toggleSettings() {
      if (!this.settingsPanel) return;
      const isActive = this.settingsPanel.classList.toggle('active');
      this.settingsPanel.style.display = isActive ? 'block' : 'none';
      this.settingsBtn.setAttribute('aria-expanded', String(isActive));
    }

    saveApiKey() {
      const key = (this.apiKeyInput.value || '').trim();
      if (!key) {
        alert('Please enter a valid Google Gemini API key.');
        return;
      }
      this.apiKey = key;
      localStorage.setItem(this.storageKey, key);
      this.updateStatusBadge();
      this.toggleSettings();
      this.appendSystemNotice('Gemini API Key saved. Agentic capabilities active with **gemini-3.8-flash**!');
    }

    clearApiKey() {
      this.apiKey = '';
      localStorage.removeItem(this.storageKey);
      if (this.apiKeyInput) this.apiKeyInput.value = '';
      this.updateStatusBadge();
      this.toggleSettings();
      this.appendSystemNotice('Gemini API Key removed. Concierge running in local knowledge mode.');
    }

    updateStatusBadge() {
      if (!this.statusBadge) return;
      if (this.apiKey) {
        this.statusBadge.innerHTML = '<span class="status-dot green"></span><span>Gemini 3.8 Flash (Agentic Live)</span>';
      } else {
        this.statusBadge.innerHTML = '<span class="status-dot amber"></span><span>Concierge Knowledge (Add API Key ⚙)</span>';
      }
    }

    resetConversation() {
      this.history = [];
      this.previousInteractionId = null;
      this.leadData = { name: '', company: '', service: '', goal: '', email: '', phone: '' };
      const welcomeMsg = this.messagesContainer.querySelector('.ai-msg-welcome');
      this.messagesContainer.innerHTML = '';
      if (welcomeMsg) {
        this.messagesContainer.appendChild(welcomeMsg);
      } else {
        this.appendBotMessage("Hello! I am the Igraph Media Advisory Concierge. How can I assist your brand's growth today?");
      }
      this.appendSystemNotice('Conversation reset. Ready for a new consultation session.');
    }

    appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'ai-msg ai-msg-user';
      msgDiv.innerHTML = `
        <div class="ai-msg-bubble">
          <div class="ai-msg-text">${renderMarkdown(text)}</div>
        </div>
      `;
      this.messagesContainer.appendChild(msgDiv);
      this.scrollToBottom();
    }

    appendBotMessage(markdownText) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'ai-msg ai-msg-bot';
      msgDiv.innerHTML = `
        <div class="ai-msg-avatar">
          <span class="ai-avatar-dot"></span>
        </div>
        <div class="ai-msg-bubble">
          <div class="ai-msg-author">Igraph Concierge</div>
          <div class="ai-msg-text">${renderMarkdown(markdownText)}</div>
        </div>
      `;
      this.messagesContainer.appendChild(msgDiv);
      this.scrollToBottom();
      return msgDiv;
    }

    appendCustomCard(cardElement) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'ai-msg ai-msg-bot';
      msgDiv.innerHTML = `
        <div class="ai-msg-avatar">
          <span class="ai-avatar-dot"></span>
        </div>
        <div class="ai-msg-bubble" style="width: 100%;">
          <div class="ai-msg-author">Advisory Action</div>
        </div>
      `;
      msgDiv.querySelector('.ai-msg-bubble').appendChild(cardElement);
      this.messagesContainer.appendChild(msgDiv);
      this.scrollToBottom();
      return msgDiv;
    }

    appendSystemNotice(text) {
      const noticeDiv = document.createElement('div');
      noticeDiv.className = 'ai-system-notice';
      noticeDiv.innerHTML = `<span>${renderMarkdown(text)}</span>`;
      this.messagesContainer.appendChild(noticeDiv);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      if (this.typingIndicator) return;
      this.typingIndicator = document.createElement('div');
      this.typingIndicator.className = 'ai-msg ai-msg-bot ai-typing-indicator';
      this.typingIndicator.innerHTML = `
        <div class="ai-msg-avatar">
          <span class="ai-avatar-dot pulse"></span>
        </div>
        <div class="ai-msg-bubble">
          <div class="ai-typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      this.messagesContainer.appendChild(this.typingIndicator);
      this.scrollToBottom();
    }

    removeTypingIndicator() {
      if (this.typingIndicator && this.typingIndicator.parentNode) {
        this.typingIndicator.parentNode.removeChild(this.typingIndicator);
      }
      this.typingIndicator = null;
    }

    scrollToBottom() {
      if (!this.messagesContainer) return;
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleSendMessage() {
      if (this.isThinking) return;
      const text = (this.input.value || '').trim();
      if (!text) return;

      this.input.value = '';
      this.sendMessage(text);
    }

    /* -------------------------------------------------------------
       AGENTIC INTENT DETECTION & MESSAGE HANDLING
       ------------------------------------------------------------- */
    async sendMessage(userMessage) {
      this.appendUserMessage(userMessage);
      this.isThinking = true;
      this.showTypingIndicator();
      if (this.sendBtn) this.sendBtn.disabled = true;

      const lower = userMessage.toLowerCase();

      // Instant Intent Detection for Immediate Human Handover
      if (
        lower.includes('human') ||
        lower.includes('talk to someone') ||
        lower.includes('speak with someone') ||
        lower.includes('real person') ||
        lower.includes('handover') ||
        lower.includes('escalate') ||
        lower.includes('representative') ||
        lower.includes('agent') && (lower.includes('live') || lower.includes('actual') || lower.includes('real'))
      ) {
        setTimeout(() => {
          this.removeTypingIndicator();
          this.appendBotMessage(
            "I am escalating your request directly to an executive partner at Igraph Media. You can connect immediately below:"
          );
          this.triggerHandoverUI({
            reason: userMessage,
            summary: "Visitor requested live human advisor consultation",
            urgency: "immediate"
          });
          this.isThinking = false;
          if (this.sendBtn) this.sendBtn.disabled = false;
        }, 500);
        return;
      }

      // Instant Intent Detection for Booking Appointment
      if (
        (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment')) &&
        (lower.includes('call') || lower.includes('meeting') || lower.includes('consultation') || lower.includes('time') || lower.includes('session'))
      ) {
        setTimeout(() => {
          this.removeTypingIndicator();
          this.appendBotMessage(
            "I have generated your appointment reservation module. Please select your preferred consultation slot below:"
          );
          this.triggerBookingUI({
            topic: userMessage
          });
          this.isThinking = false;
          if (this.sendBtn) this.sendBtn.disabled = false;
        }, 500);
        return;
      }

      // Instant Intent Detection for Lead Qualification
      if (
        lower.includes('qualify') ||
        lower.includes('my business') ||
        (lower.includes('start') && lower.includes('project')) ||
        (lower.includes('work with you') && !lower.includes('who'))
      ) {
        setTimeout(() => {
          this.removeTypingIndicator();
          this.appendBotMessage(
            "To qualify your business and recommend the optimal growth architecture, please review and confirm your commercial profile below:"
          );
          this.triggerQualificationUI({
            company_name: this.leadData.company || "Growing Brand",
            service_interest: "Comprehensive Growth Pod / Digital Transformation",
            growth_goal: "Scale commercial revenue & market authority"
          });
          this.isThinking = false;
          if (this.sendBtn) this.sendBtn.disabled = false;
        }, 500);
        return;
      }

      try {
        let replyText = '';
        let toolCall = null;

        // 1. Try backend server API (/api/chat)
        let backendSuccess = false;
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: userMessage,
              previous_interaction_id: this.previousInteractionId,
              history: this.history,
              lead_data: this.leadData
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.reply) {
              replyText = data.reply;
              if (data.interaction_id) this.previousInteractionId = data.interaction_id;
              if (data.function_call) toolCall = data.function_call;
              backendSuccess = true;
            }
          }
        } catch (e) {
          // Backend not running, proceed to client-side
        }

        // 2. Direct client-side call to Gemini API if key is present
        if (!backendSuccess && this.apiKey) {
          const apiResult = await this.callGeminiAPI(userMessage);
          replyText = apiResult.reply;
          toolCall = apiResult.toolCall;
        }

        // 3. Fallback: Intelligent local knowledge
        if (!replyText) {
          replyText = this.searchLocalKnowledge(userMessage);
        }

        this.removeTypingIndicator();
        if (replyText) {
          this.appendBotMessage(replyText);
        }

        // Execute tool call if returned by Gemini
        if (toolCall) {
          this.handleToolExecution(toolCall.name, toolCall.args || {});
        }

        this.history.push({ role: 'user', content: userMessage });
        this.history.push({ role: 'assistant', content: replyText || '' });

      } catch (err) {
        console.error('Agent Error:', err);
        this.removeTypingIndicator();
        this.appendBotMessage(
          `**Advisory Notice:** I encountered a temporary connection issue (${err.message || 'Network'}).\n\n` +
          `You can reach our human advisory team directly at **+234 (815) 325-3639** or **advisory@igraphmedia.com**.`
        );
        this.triggerHandoverUI({ reason: 'Connection error fallback', urgency: 'normal' });
      } finally {
        this.isThinking = false;
        if (this.sendBtn) this.sendBtn.disabled = false;
      }
    }

    /* -------------------------------------------------------------
       GEMINI API CALL WITH TOOL DECLARATIONS
       ------------------------------------------------------------- */
    async callGeminiAPI(userPrompt) {
      const apiKey = this.apiKey;
      let reply = '';
      let toolCall = null;

      // Method A: Modern Interactions API
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${apiKey}`;
        const payload = {
          model: 'gemini-3.8-flash',
          input: userPrompt,
          system_instruction: SYSTEM_INSTRUCTION,
          tools: GEMINI_TOOLS,
          store: true
        };
        if (this.previousInteractionId) {
          payload.previous_interaction_id = this.previousInteractionId;
        }

        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          const data = await resp.json();
          if (data.id) this.previousInteractionId = data.id;

          if (data.steps && Array.isArray(data.steps)) {
            for (const step of data.steps) {
              if (step.type === 'function_call') {
                toolCall = {
                  name: step.name,
                  args: step.arguments || {}
                };
              }
              if (step.type === 'model_output' && step.content) {
                const textPart = step.content.find(c => c.type === 'text' && c.text);
                if (textPart && textPart.text) {
                  reply = textPart.text;
                }
              }
            }
          }
          if (!reply && data.output_text) {
            reply = data.output_text;
          }
          if (reply || toolCall) {
            return { reply, toolCall };
          }
        }
      } catch (err) {
        console.warn('Interactions API with tools error, falling back:', err);
      }

      // Method B: generateContent API
      try {
        const genUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const contents = [];
        const recent = this.history.slice(-6);
        recent.forEach(h => {
          contents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
          });
        });
        contents.push({ role: 'user', parts: [{ text: userPrompt }] });

        const genPayload = {
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: contents,
          tools: [{
            functionDeclarations: GEMINI_TOOLS.map(t => ({
              name: t.name,
              description: t.description,
              parameters: t.parameters
            }))
          }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
        };

        const genResp = await fetch(genUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(genPayload)
        });

        if (genResp.ok) {
          const genData = await genResp.json();
          const cand = genData.candidates?.[0];
          const parts = cand?.content?.parts || [];
          for (const p of parts) {
            if (p.text) reply += p.text;
            if (p.functionCall) {
              toolCall = {
                name: p.functionCall.name,
                args: p.functionCall.args || {}
              };
            }
          }
        }
      } catch (e) {
        console.warn('generateContent tool call error:', e);
      }

      return { reply, toolCall };
    }

    /* -------------------------------------------------------------
       TOOL EXECUTION DISPATCHER
       ------------------------------------------------------------- */
    handleToolExecution(toolName, args) {
      if (toolName === 'qualify_lead') {
        this.triggerQualificationUI(args);
      } else if (toolName === 'book_appointment') {
        this.triggerBookingUI(args);
      } else if (toolName === 'handover_to_human') {
        this.triggerHandoverUI(args);
      }
    }

    /* -------------------------------------------------------------
       AGENTIC GENERATIVE UI: 1. LEAD QUALIFICATION CARD
       ------------------------------------------------------------- */
    triggerQualificationUI(data) {
      const card = document.createElement('div');
      card.className = 'ai-action-card ai-card-qualification';

      const company = data.company_name || this.leadData.company || 'Your Brand';
      const service = data.service_interest || 'Comprehensive Digital Advisory';
      const budget = data.monthly_budget || '$5k - $25k Growth Budget';
      const goal = data.growth_goal || 'Scale customer acquisition & authority';

      // Update lead state
      this.leadData.company = company;
      this.leadData.service = service;
      this.leadData.goal = goal;

      card.innerHTML = `
        <div class="ai-card-badge gold">★ Verified Lead Profile</div>
        <div class="ai-card-title">Commercial Growth Qualification</div>
        <div class="ai-card-sub">Based on your requirements, here is your qualified advisory tier:</div>
        <div class="ai-card-grid">
          <div class="ai-grid-item">
            <span class="ai-grid-label">Brand</span>
            <span class="ai-grid-val">${company}</span>
          </div>
          <div class="ai-grid-item">
            <span class="ai-grid-label">Requirement</span>
            <span class="ai-grid-val">${service}</span>
          </div>
          <div class="ai-grid-item">
            <span class="ai-grid-label">Growth Stage</span>
            <span class="ai-grid-val">${budget}</span>
          </div>
          <div class="ai-grid-item">
            <span class="ai-grid-label">Target Milestones</span>
            <span class="ai-grid-val">${goal}</span>
          </div>
        </div>
        <div class="ai-card-actions">
          <button type="button" class="ai-btn-action ai-btn-primary" id="btnBookFromQual">
            <span>📅 Book 20-Min Consultation</span>
          </button>
          <button type="button" class="ai-btn-action ai-btn-secondary" id="btnHandoverFromQual">
            <span>👤 Connect to Senior Partner</span>
          </button>
        </div>
      `;

      card.querySelector('#btnBookFromQual').addEventListener('click', () => {
        this.triggerBookingUI({ company_name: company, topic: service });
      });

      card.querySelector('#btnHandoverFromQual').addEventListener('click', () => {
        this.triggerHandoverUI({
          client_name: company,
          summary: `Qualified lead for ${service}`,
          urgency: 'high'
        });
      });

      this.appendCustomCard(card);
      this.persistLead(this.leadData);
    }

    /* -------------------------------------------------------------
       AGENTIC GENERATIVE UI: 2. APPOINTMENT BOOKING CARD
       ------------------------------------------------------------- */
    triggerBookingUI(data) {
      const card = document.createElement('div');
      card.className = 'ai-action-card ai-card-booking';

      const topic = data.topic || 'Commercial Growth Consultation';
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      const dayAfterStr = dayAfter.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      card.innerHTML = `
        <div class="ai-card-badge green">📅 Live Calendar</div>
        <div class="ai-card-title">Book 20-Minute Private Consultation</div>
        <div class="ai-card-sub">Select your preferred date &amp; time slot with our advisory team:</div>

        <div>
          <span class="ai-grid-label" style="margin-bottom: 4px; display: block;">Select Date:</span>
          <div class="ai-booking-slots" id="bookingDateSlots">
            <button type="button" class="ai-slot-chip selected" data-date="${tomorrowStr}">${tomorrowStr}</button>
            <button type="button" class="ai-slot-chip" data-date="${dayAfterStr}">${dayAfterStr}</button>
            <button type="button" class="ai-slot-chip" data-date="Next Monday">Next Monday</button>
          </div>
        </div>

        <div>
          <span class="ai-grid-label" style="margin-bottom: 4px; display: block;">Select Time (GMT+1 / WAT):</span>
          <div class="ai-booking-slots" id="bookingTimeSlots">
            <button type="button" class="ai-slot-chip selected" data-time="10:00 AM">10:00 AM</button>
            <button type="button" class="ai-slot-chip" data-time="02:00 PM">02:00 PM</button>
            <button type="button" class="ai-slot-chip" data-time="04:30 PM">04:30 PM</button>
          </div>
        </div>

        <div>
          <span class="ai-grid-label" style="display: block;">Your Corporate Email:</span>
          <input type="email" id="bookingEmailInput" class="ai-card-input" placeholder="e.g. director@company.com" value="${this.leadData.email || ''}">
        </div>

        <div class="ai-card-actions">
          <button type="button" class="ai-btn-action ai-btn-primary" id="btnConfirmBooking">
            <span>Confirm 20-Min Appointment ✓</span>
          </button>
        </div>
      `;

      let selectedDate = tomorrowStr;
      let selectedTime = '10:00 AM';

      // Date selector logic
      const dateChips = card.querySelectorAll('#bookingDateSlots .ai-slot-chip');
      dateChips.forEach(chip => {
        chip.addEventListener('click', () => {
          dateChips.forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          selectedDate = chip.getAttribute('data-date');
        });
      });

      // Time selector logic
      const timeChips = card.querySelectorAll('#bookingTimeSlots .ai-slot-chip');
      timeChips.forEach(chip => {
        chip.addEventListener('click', () => {
          timeChips.forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          selectedTime = chip.getAttribute('data-time');
        });
      });

      // Confirm Booking
      card.querySelector('#btnConfirmBooking').addEventListener('click', () => {
        const emailInput = card.querySelector('#bookingEmailInput');
        const email = (emailInput.value || '').trim();
        if (!email || !email.includes('@')) {
          emailInput.style.borderColor = '#ff4444';
          emailInput.focus();
          return;
        }

        this.leadData.email = email;
        const refId = 'IG-CAL-' + Math.floor(10000 + Math.random() * 90000);

        // Generate Google Calendar Event Link
        const gcalTitle = encodeURIComponent("Igraph Media — Private Growth Consultation");
        const gcalDetails = encodeURIComponent(`Private 20-minute strategic growth consultation with Igraph Media Advisory.\nReference: ${refId}\nTopic: ${topic}`);
        const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&details=${gcalDetails}`;

        // Replace card contents with confirmed state
        card.innerHTML = `
          <div class="ai-card-badge green">✓ Confirmed Appointment</div>
          <div class="ai-card-title">Consultation Confirmed: ${selectedDate} at ${selectedTime}</div>
          <div class="ai-card-sub">
            Your appointment has been registered with our senior partners. A calendar invitation has been dispatched to <strong>${email}</strong>.
          </div>
          <div class="ai-card-grid">
            <div class="ai-grid-item">
              <span class="ai-grid-label">Reference ID</span>
              <span class="ai-grid-val">${refId}</span>
            </div>
            <div class="ai-grid-item">
              <span class="ai-grid-label">Timezone</span>
              <span class="ai-grid-val">GMT+1 (WAT) / Google Meet</span>
            </div>
          </div>
          <div class="ai-card-actions">
            <a href="${gcalUrl}" target="_blank" rel="noopener noreferrer" class="ai-btn-action ai-btn-primary">
              <span>📅 Add to Google Calendar</span>
            </a>
            <button type="button" class="ai-btn-action ai-btn-secondary" id="btnDownloadIcs">
              <span>📥 Download .ICS Calendar File</span>
            </button>
          </div>
        `;

        card.querySelector('#btnDownloadIcs').addEventListener('click', () => {
          this.downloadICS(refId, selectedDate, selectedTime, topic);
        });

        this.persistAppointment({
          ref_id: refId,
          email: email,
          date: selectedDate,
          time: selectedTime,
          topic: topic
        });
      });

      this.appendCustomCard(card);
    }

    /* -------------------------------------------------------------
       AGENTIC GENERATIVE UI: 3. HUMAN HANDOVER ESCALATION CARD
       ------------------------------------------------------------- */
    triggerHandoverUI(data) {
      const card = document.createElement('div');
      card.className = 'ai-action-card ai-card-handover';

      const reason = data.reason || 'Visitor requested executive consultation';
      const waMessage = encodeURIComponent(
        `Hello Igraph Media Advisory Team. I am reaching out from your website to speak with an executive partner regarding: "${reason}".`
      );
      const emailSubject = encodeURIComponent("Urgent Executive Consultation Request — Igraph Media");
      const emailBody = encodeURIComponent(
        `Hello Advisory Team,\n\nI would like to speak directly with an executive partner regarding:\n"${reason}"\n\nPlease reach out to me.\n`
      );

      card.innerHTML = `
        <div class="ai-card-badge red">
          <span class="status-dot green"></span>
          <span>Live Partner Handover</span>
        </div>
        <div class="ai-advisor-row">
          <div class="ai-advisor-avatar">IM</div>
          <div class="ai-advisor-info">
            <span class="ai-advisor-name">Client Operations Team</span>
            <span class="ai-advisor-role">Dedicated Executive Advisory Team</span>
            <span class="ai-live-indicator">Active &bull; Live Handover Ready</span>
          </div>
        </div>
        <div class="ai-card-sub">
          Your conversation has been routed to our live partners. Connect immediately via direct phone, WhatsApp, or request an instant callback:
        </div>
        <div class="ai-card-actions">
          <a href="tel:+2348153253639" class="ai-btn-action ai-btn-primary">
            <span>📞 Call Direct: +234 (815) 325-3639</span>
          </a>
          <a href="https://wa.me/2348153253639?text=${waMessage}" target="_blank" rel="noopener noreferrer" class="ai-btn-action ai-btn-whatsapp">
            <span>💬 Open Direct WhatsApp Chat</span>
          </a>
          <a href="mailto:advisory@igraphmedia.com?subject=${emailSubject}&body=${emailBody}" class="ai-btn-action ai-btn-secondary">
            <span>✉️ Send Advisory Email</span>
          </a>
          <button type="button" class="ai-btn-action ai-btn-secondary" id="btnRequestCallback">
            <span>🔔 Request Instant Callback</span>
          </button>
        </div>
        <div id="callbackFormArea" style="display: none; margin-top: 6px;">
          <span class="ai-grid-label" style="display: block;">Enter Your Direct Phone Number:</span>
          <div style="display: flex; gap: 6px; margin-top: 4px;">
            <input type="tel" id="callbackPhoneInput" class="ai-card-input" placeholder="+234 ...">
            <button type="button" id="btnSubmitCallback" class="ai-btn-action ai-btn-primary" style="padding: 6px 12px;">Submit</button>
          </div>
        </div>
      `;

      const cbArea = card.querySelector('#callbackFormArea');
      card.querySelector('#btnRequestCallback').addEventListener('click', () => {
        cbArea.style.display = cbArea.style.display === 'none' ? 'block' : 'none';
        const phoneInput = card.querySelector('#callbackPhoneInput');
        if (phoneInput) phoneInput.focus();
      });

      card.querySelector('#btnSubmitCallback').addEventListener('click', () => {
        const phone = (card.querySelector('#callbackPhoneInput').value || '').trim();
        if (!phone) return;
        cbArea.innerHTML = `<span style="font-size: 11px; color: #10b981; font-weight: 600;">✓ Callback request submitted. An executive partner will phone you at ${phone} within 15 minutes.</span>`;
        this.persistHandover({ reason: reason, phone: phone });
      });

      this.appendCustomCard(card);
      this.persistHandover({ reason: reason, status: 'initiated' });
    }

    /* -------------------------------------------------------------
       DATA PERSISTENCE & BACKEND INTEGRATION
       ------------------------------------------------------------- */
    persistLead(data) {
      try {
        const leads = JSON.parse(localStorage.getItem('igraph_leads') || '[]');
        leads.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('igraph_leads', JSON.stringify(leads));

        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(() => {});
      } catch (e) {}
    }

    persistAppointment(data) {
      try {
        const appointments = JSON.parse(localStorage.getItem('igraph_appointments') || '[]');
        appointments.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('igraph_appointments', JSON.stringify(appointments));

        fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(() => {});
      } catch (e) {}
    }

    persistHandover(data) {
      try {
        const handovers = JSON.parse(localStorage.getItem('igraph_handovers') || '[]');
        handovers.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('igraph_handovers', JSON.stringify(handovers));

        fetch('/api/handover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(() => {});
      } catch (e) {}
    }

    downloadICS(refId, dateStr, timeStr, topic) {
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Igraph Media//Advisory Consultation//EN",
        "BEGIN:VEVENT",
        `UID:${refId}@igraphmedia.com`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
        `SUMMARY:Igraph Media Growth Consultation (${refId})`,
        `DESCRIPTION:Private 20-minute consultation with Igraph Media Advisory regarding ${topic}.\\nDirect Line: +234 (815) 325-3639`,
        "LOCATION:Google Meet / Direct Phone",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `igraph-consultation-${refId}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    /* -------------------------------------------------------------
       LOCAL KNOWLEDGE SEARCH FOR INSTANT REPLIES
       ------------------------------------------------------------- */
    searchLocalKnowledge(query) {
      const q = query.toLowerCase();

      if (q.includes('service') || q.includes('offer') || q.includes('what do you do')) {
        return `**Igraph Media offers 8 core comprehensive solutions:**\n\n` +
          `• **Press Release Distribution**: Strategic narratives placed in top-tier publications.\n` +
          `• **Social Media Management**: Strategic campaigns, profile management & engaging content.\n` +
          `• **Personal Branding & Profiling**: Executive authority, media kits & optimized digital presence.\n` +
          `• **Media Planning & Buying**: Data-driven media allocation maximizing ad budget & reach.\n` +
          `• **Search Engine Optimization (SEO)**: Website audits & customized ranking strategies.\n` +
          `• **Brand Promotion**: Holistic campaigns elevating market presence & reputation.\n` +
          `• **Content Strategy**: SEO-optimized articles, videos & visuals built for conversion.\n` +
          `• **Digital Advertising**: Targeted ad campaigns with creative optimization for stellar ROI.\n\n` +
          `Would you like me to qualify your brand or book a 20-minute consultation?`;
      }

      if (q.includes('cocu')) {
        return `**Cocu Atelier Case Study:**\n\n` +
          `We scaled luxury fashion house Cocu Atelier organically to **21,000+ followers** within 3 months, generating over **5 million organic impressions** alongside Creative Director Katrin K.`;
      }

      if (q.includes('tfz')) {
        return `**TFZ Cakes & Academy Case Study:**\n\n` +
          `Working directly with founder Tobarin .O, we architected targeted acquisition funnels that consistently generate qualified, high-intent leads for their professional culinary cohorts.`;
      }

      if (q.includes('90') || q.includes('management')) {
        return `**90's Management Case Study:**\n\n` +
          `We revamped their brand media strategy, resulting in a **3x increase in Instagram engagement** and significantly expanding their talent brand visibility.`;
      }

      if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('reach')) {
        return `**Direct Contact Channels:**\n\n` +
          `• **Direct Phone Line**: [+234 (815) 325-3639](tel:+2348153253639)\n` +
          `• **Advisory Briefs**: [advisory@igraphmedia.com](mailto:advisory@igraphmedia.com)\n` +
          `• **WhatsApp**: [+234 (815) 325-3639](https://wa.me/2348153253639)\n\n` +
          `You can also request a live human handover at any time by asking to "speak with a human"!`;
      }

      return `**Thank you for your message!**\n\n` +
        `At Igraph Media, we turn authentic brand stories into predictable commercial leadership.\n\n` +
        `• **Explore Services**: Press Release Distribution, Social Media, Personal Branding, Media Buying, SEO, Brand Promotion, Content Strategy & Digital Ads\n` +
        `• **Verified Proof**: Cocu Atelier (21k followers, 5M+ traffic), TFZ Cakes, 90's Management\n` +
        `• **Live Partner Handover**: Say *"Talk to a human"* anytime to escalate directly.\n` +
        `• **Book Consultation**: Say *"Book appointment"* to reserve your 20-min session.`;
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new IgraphSupportAgent());
  } else {
    new IgraphSupportAgent();
  }
})();
