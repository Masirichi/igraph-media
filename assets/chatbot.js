/**
 * IGRAPH CONCIERGE - BRAND-NATIVE CLIENT ASSISTANT
 * Productionized vanilla JS client:
 * - Zero client-side API keys or localStorage usage
 * - Communicates strictly with serverless /api/chat and /api/lead
 * - XSS-safe text rendering with HTML escaping
 * - Guided lead capture flow ("Get a quote" / "Book a consultation")
 * - Accessible dialog (focus trap, ARIA, Escape key handling)
 * - Session persistence via sessionStorage (with "Clear chat" action)
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'igraph_concierge_session_history';
  const MAX_USER_CHARS = 1000;
  const WHATSAPP_URL = 'https://wa.me/2348153253639?text=Hi%20Igraph%20Media%2C%20I%27d%20like%20to%20talk%20about%20my%20business';

  // Lead qualification flow questions
  const LEAD_QUESTIONS = [
    {
      key: 'business_name',
      prompt: 'Wonderful! Let\u2019s get your details together for a custom quote. First, what is your **business or brand name**?'
    },
    {
      key: 'goal',
      prompt: 'Thanks! In a sentence or two, **what is your primary goal or revenue milestone** right now?'
    },
    {
      key: 'service_interest',
      prompt: 'Which service area interests you most?\n\n• Web Design & Development\n• SEO & GEO (AI-Engine Search)\n• Social Media Management\n• Digital Advertising\n• Public Relations\n\n*(Or let us know if you need a tailored blend)*'
    },
    {
      key: 'contact',
      prompt: 'Almost done! What is the best **email address or WhatsApp number** to send your quote and follow up?\n\n*We\u2019ll only use your details to respond to your enquiry.*'
    }
  ];

  // Helper: Escape HTML to prevent XSS
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Safe formatting: basic bold, bullets, links, and line breaks only
  function renderSafeContent(rawText) {
    if (!rawText) return '';
    let safe = escapeHTML(rawText);

    // Markdown bold **text**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Markdown italics *text*
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Safe link conversion [text](url) -> only allow http/https/mailto/tel/wa.me
    safe = safe.replace(/\[(.*?)\]\(((?:https?:\/\/|mailto:|tel:).*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // Bullet list items
    safe = safe.replace(/^• (.*?)$/gm, '<li style="margin-left: 14px;">$1</li>');
    // Line breaks
    safe = safe.replace(/\n/g, '<br>');

    return safe;
  }

  class IgraphConcierge {
    constructor() {
      this.isOpen = false;
      this.isSubmitting = false;
      this.messages = [];
      this.leadState = {
        active: false,
        step: 0,
        data: {}
      };
      this.lastFocusedElement = null;

      this.init();
    }

    init() {
      this.mountDOM();
      this.cacheDOMElements();
      this.bindEvents();
      this.loadSession();
    }

    mountDOM() {
      // Remove any legacy widgets if present
      const oldToggle = document.getElementById('aiChatToggle');
      const oldDrawer = document.getElementById('aiChatDrawer');
      if (oldToggle) oldToggle.remove();
      if (oldDrawer) oldDrawer.remove();

      // Check if launcher exists; if not, inject it
      if (!document.getElementById('igraphChatLauncher')) {
        const launcherHTML = `
          <button id="igraphChatLauncher" class="igraph-chat-launcher" aria-label="Ask Igraph Concierge" aria-haspopup="dialog" aria-expanded="false" aria-controls="igraphChatPanel">
            <div class="igraph-launcher-avatar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span class="igraph-launcher-pulse" aria-hidden="true"></span>
            </div>
            <span class="igraph-launcher-label">Ask Igraph Concierge</span>
          </button>
        `;
        document.body.insertAdjacentHTML('beforeend', launcherHTML);
      }

      // Check if panel exists; if not, inject it
      if (!document.getElementById('igraphChatPanel')) {
        const panelHTML = `
          <div id="igraphChatPanel" class="igraph-chat-panel" role="dialog" aria-label="Igraph Concierge chat" aria-modal="true" style="display: none;">
            <header class="igraph-chat-header">
              <div class="igraph-header-profile">
                <div class="igraph-header-avatar">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span class="pulse-dot" aria-hidden="true"></span>
                </div>
                <div class="igraph-header-text">
                  <div class="igraph-header-title">Igraph Concierge &middot; AI assistant</div>
                  <div class="igraph-header-sub">Typically replies instantly</div>
                </div>
              </div>
              <div class="igraph-header-controls">
                <button type="button" id="igraphBtnClear" class="igraph-icon-btn" title="Clear chat history" aria-label="Clear chat history">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
                <button type="button" id="igraphBtnClose" class="igraph-icon-btn" title="Close chat" aria-label="Close chat">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </header>

            <div id="igraphMessages" class="igraph-chat-messages" aria-live="polite">
              <!-- Welcome Card -->
              <div class="igraph-welcome-card" id="igraphWelcomeCard">
                <div class="igraph-welcome-badge">AI assistant</div>
                <div class="igraph-welcome-title">Igraph Concierge</div>
                <div class="igraph-welcome-text">
                  Hi, I'm Igraph Concierge, Igraph Media's AI assistant. I can answer questions about our services, point you to the right one, or book a free consultation.
                </div>
                <div class="igraph-chips-wrap">
                  <button type="button" class="igraph-chip" data-action="consultation">📅 Book a free consultation</button>
                  <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="igraph-chip">💬 Talk to a human</a>
                  <button type="button" class="igraph-chip" data-action="quote">💼 Get a quote</button>
                  <a href="services.html" class="igraph-chip">🎯 See our services</a>
                  <button type="button" class="igraph-chip" data-action="results">🏆 See our results</button>
                </div>
              </div>
            </div>

            <footer class="igraph-chat-footer">
              <form id="igraphChatForm" onsubmit="return false;">
                <div class="igraph-input-row">
                  <input type="text" id="igraphChatInput" class="igraph-chat-input" placeholder="Type a message..." maxlength="${MAX_USER_CHARS}" autocomplete="off" aria-label="Your message">
                  <span id="igraphCharCount" class="igraph-char-count">0/${MAX_USER_CHARS}</span>
                  <button type="submit" id="igraphSendBtn" class="igraph-send-btn" aria-label="Send message">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
              <div class="igraph-footer-note">
                AI assistant. For complex projects, our team will follow up.
              </div>
            </footer>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', panelHTML);
      }
    }

    cacheDOMElements() {
      this.launcher = document.getElementById('igraphChatLauncher');
      this.panel = document.getElementById('igraphChatPanel');
      this.messagesContainer = document.getElementById('igraphMessages');
      this.welcomeCard = document.getElementById('igraphWelcomeCard');
      this.form = document.getElementById('igraphChatForm');
      this.input = document.getElementById('igraphChatInput');
      this.charCount = document.getElementById('igraphCharCount');
      this.sendBtn = document.getElementById('igraphSendBtn');
      this.btnClose = document.getElementById('igraphBtnClose');
      this.btnClear = document.getElementById('igraphBtnClear');
    }

    bindEvents() {
      this.launcher.addEventListener('click', () => this.togglePanel());
      this.btnClose.addEventListener('click', () => this.closePanel());
      this.btnClear.addEventListener('click', () => this.clearSession());

      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });

      this.input.addEventListener('input', () => {
        const len = this.input.value.length;
        this.charCount.textContent = `${len}/${MAX_USER_CHARS}`;
        if (len >= MAX_USER_CHARS - 50) {
          this.charCount.classList.add('warning');
        } else {
          this.charCount.classList.remove('warning');
        }
      });

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleUserSubmit();
        }
      });

      // Quick chips delegation
      this.messagesContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.igraph-chip');
        if (!chip) return;

        const action = chip.getAttribute('data-action');
        if (action === 'quote') {
          this.startLeadFlow();
        } else if (action === 'consultation') {
          this.sendUserMessage('I would like to book a free 20-minute consultation.');
        } else if (action === 'results') {
          const target = document.getElementById('results') || document.querySelector('.case-studies-section') || document.querySelector('.results-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            this.closePanel();
          } else {
            window.location.href = 'index.html#results';
          }
        }
      });

      // Accessible Keyboard & Focus Trapping
      window.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          this.closePanel();
          return;
        }

        // Trap focus inside dialog
        if (e.key === 'Tab') {
          const focusable = this.panel.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    togglePanel() {
      if (this.isOpen) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    }

    openPanel() {
      this.lastFocusedElement = document.activeElement;
      this.isOpen = true;
      this.panel.style.display = 'flex';
      this.launcher.setAttribute('aria-expanded', 'true');

      requestAnimationFrame(() => {
        this.panel.classList.add('active');
        setTimeout(() => {
          this.input.focus();
          this.scrollToBottom();
        }, 150);
      });
    }

    closePanel() {
      this.isOpen = false;
      this.panel.classList.remove('active');
      this.launcher.setAttribute('aria-expanded', 'false');

      setTimeout(() => {
        if (!this.isOpen) {
          this.panel.style.display = 'none';
          if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
            this.lastFocusedElement.focus();
          }
        }
      }, 250);
    }

    loadSession() {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.messages = parsed;
            this.renderAllMessages();
          }
        }
      } catch (err) {
        console.warn('[Igraph Concierge] Could not load session messages:', err.message);
      }
    }

    saveSession() {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.messages));
      } catch (err) {
        console.warn('[Igraph Concierge] Could not save session:', err.message);
      }
    }

    clearSession() {
      this.messages = [];
      this.leadState = { active: false, step: 0, data: {} };
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}

      // Keep only welcome card
      this.messagesContainer.innerHTML = '';
      if (this.welcomeCard) {
        this.messagesContainer.appendChild(this.welcomeCard);
      }
      this.appendNotice('Conversation cleared.');
    }

    renderAllMessages() {
      this.messagesContainer.innerHTML = '';
      if (this.welcomeCard) {
        this.messagesContainer.appendChild(this.welcomeCard);
      }

      for (const msg of this.messages) {
        if (msg.role === 'user') {
          this.renderMessageElement('user', msg.content);
        } else if (msg.role === 'assistant') {
          this.renderMessageElement('bot', msg.content);
        }
      }
      this.scrollToBottom();
    }

    renderMessageElement(sender, contentText) {
      const row = document.createElement('div');
      row.className = `igraph-msg igraph-msg-${sender}`;
      row.innerHTML = `
        <div class="igraph-bubble">
          ${renderSafeContent(contentText)}
        </div>
      `;
      this.messagesContainer.appendChild(row);
      return row;
    }

    appendNotice(text) {
      const notice = document.createElement('div');
      notice.style.cssText = 'text-align: center; font-size: 11.5px; color: #777; margin: 4px 0;';
      notice.textContent = text;
      this.messagesContainer.appendChild(notice);
      this.scrollToBottom();
    }

    scrollToBottom() {
      // Don't hijack scroll if user scrolled up manually
      const threshold = 120;
      const distanceFromBottom = this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.clientHeight;
      if (distanceFromBottom <= threshold) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }
    }

    showTyping() {
      const typing = document.createElement('div');
      typing.id = 'igraphTypingIndicator';
      typing.className = 'igraph-msg igraph-msg-bot';
      typing.innerHTML = `
        <div class="igraph-typing-bubble" aria-label="Igraph Concierge is typing">
          <span class="igraph-typing-dot"></span>
          <span class="igraph-typing-dot"></span>
          <span class="igraph-typing-dot"></span>
        </div>
      `;
      this.messagesContainer.appendChild(typing);
      this.scrollToBottom();
    }

    removeTyping() {
      const typing = document.getElementById('igraphTypingIndicator');
      if (typing) typing.remove();
    }

    setSubmitting(state) {
      this.isSubmitting = state;
      this.sendBtn.disabled = state;
      this.input.disabled = state;
      if (!state) {
        this.input.focus();
      }
    }

    handleUserSubmit() {
      if (this.isSubmitting) return;
      const text = this.input.value.trim();
      if (!text) return;

      this.input.value = '';
      this.charCount.textContent = `0/${MAX_USER_CHARS}`;
      this.charCount.classList.remove('warning');

      // Check if lead capture flow is active
      if (this.leadState.active) {
        this.handleLeadStep(text);
        return;
      }

      this.sendUserMessage(text);
    }

    sendUserMessage(text) {
      // Render user turn
      this.renderMessageElement('user', text);
      this.messages.push({ role: 'user', content: text });
      this.saveSession();
      this.scrollToBottom();

      this.setSubmitting(true);
      this.showTyping();

      this.fetchChatReply(text);
    }

    async fetchChatReply(latestText) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: this.messages.slice(-20)
          })
        });

        this.removeTyping();
        this.setSubmitting(false);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          this.renderError(errData.message || 'We could not reach the concierge service right now.', latestText);
          return;
        }

        const data = await response.json();
        const reply = data.reply || 'How else can I assist your business today?';

        this.renderMessageElement('bot', reply);
        this.messages.push({ role: 'assistant', content: reply });
        this.saveSession();
        this.scrollToBottom();

      } catch (err) {
        this.removeTyping();
        this.setSubmitting(false);
        this.renderError('A network error occurred while connecting to the assistant.', latestText);
      }
    }

    renderError(msgText, retryText) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'igraph-msg igraph-msg-bot';
      errorDiv.innerHTML = `
        <div class="igraph-error-card">
          <div>${escapeHTML(msgText)}</div>
          <div class="igraph-error-actions">
            ${retryText ? `<button type="button" class="igraph-btn-retry">Try again</button>` : ''}
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="igraph-btn-whatsapp-fallback">
              WhatsApp Us &rarr;
            </a>
          </div>
        </div>
      `;

      if (retryText) {
        const retryBtn = errorDiv.querySelector('.igraph-btn-retry');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            errorDiv.remove();
            this.sendUserMessage(retryText);
          });
        }
      }

      this.messagesContainer.appendChild(errorDiv);
      this.scrollToBottom();
    }

    // Step 4: Guided Lead Qualification Flow
    startLeadFlow() {
      this.leadState = {
        active: true,
        step: 0,
        data: {}
      };

      const q = LEAD_QUESTIONS[0];
      this.renderMessageElement('bot', q.prompt);
      this.messages.push({ role: 'assistant', content: q.prompt });
      this.saveSession();
      this.scrollToBottom();
      this.input.focus();
    }

    async handleLeadStep(userText) {
      const stepIndex = this.leadState.step;
      const currentQuestion = LEAD_QUESTIONS[stepIndex];

      // Record user response in chat
      this.renderMessageElement('user', userText);
      this.messages.push({ role: 'user', content: userText });
      this.saveSession();
      this.scrollToBottom();

      // Store in lead data
      this.leadState.data[currentQuestion.key] = userText;

      // Validate contact step (step 3)
      if (currentQuestion.key === 'contact') {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userText);
        const isPhone = /^[\d\s+\-().]{7,20}$/.test(userText);

        if (!isEmail && !isPhone) {
          const retryPrompt = 'Please provide a valid email address (e.g. name@company.com) or phone number with country code so our team can follow up.';
          this.renderMessageElement('bot', retryPrompt);
          this.messages.push({ role: 'assistant', content: retryPrompt });
          this.saveSession();
          this.scrollToBottom();
          return;
        }

        // Complete the lead flow and submit to /api/lead
        this.setSubmitting(true);
        this.showTyping();

        try {
          const res = await fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              business_name: this.leadState.data.business_name,
              goal: this.leadState.data.goal,
              service_interest: this.leadState.data.service_interest,
              contact: userText,
              website: '', // honeypot must remain empty
              source: 'concierge_chat'
            })
          });

          this.removeTyping();
          this.setSubmitting(false);

          this.leadState = { active: false, step: 0, data: {} };

          // GA4 Conversion Tracking: Igraph Concierge Lead
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
              event_category: 'lead_generation',
              event_label: 'igraph_concierge',
              method: 'concierge_chat',
              value: 1
            });
          }

          const confirmation = 'Thank you! Your quote request has been received. A member of our team will review your enquiry and reach out within 24 hours.\n\nYou can also message us directly on WhatsApp anytime: [Chat on WhatsApp](' + WHATSAPP_URL + ')';
          this.renderMessageElement('bot', confirmation);
          this.messages.push({ role: 'assistant', content: confirmation });
          this.saveSession();
          this.scrollToBottom();

        } catch (err) {
          this.removeTyping();
          this.setSubmitting(false);
          this.leadState = { active: false, step: 0, data: {} };
          this.renderError('Could not submit details automatically, but our team is available on WhatsApp.', null);
        }
        return;
      }

      // Advance to next question
      this.leadState.step += 1;
      const nextQ = LEAD_QUESTIONS[this.leadState.step];
      if (nextQ) {
        setTimeout(() => {
          this.renderMessageElement('bot', nextQ.prompt);
          this.messages.push({ role: 'assistant', content: nextQ.prompt });
          this.saveSession();
          this.scrollToBottom();
          this.input.focus();
        }, 200);
      }
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new IgraphConcierge());
  } else {
    new IgraphConcierge();
  }
})();
