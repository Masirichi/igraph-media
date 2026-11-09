/**
 * IGRAPH MEDIA — CONTACT SECTION BEHAVIOR
 * Client-side validation, accessible state handling, rate limiting & lead submission.
 */

const CONTACT_CONFIG = {
  whatsappNumber: "2348153253639",
  phoneDisplay: "+234 (815) 325-3639",
  phoneHref: "tel:+2348153253639",
  email: "hello@igraphmedia.com.ng",
  responseTime: "within 24 hours",
  hours: "",          // TODO(owner): e.g. "Mon–Fri, 9am–5pm WAT". If empty, hide the hours line entirely. NEVER invent hours.
  testimonial: null   // TODO(owner): { quote, name, role }. If null, hide the slot. NEVER invent quotes.
};

(function () {
  'use strict';

  // 1. Navigation Active State
  function initNavActiveState() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const isHome = path === '/' || path.endsWith('/index.html') || path === '';

    const navLinks = document.querySelectorAll('nav a, .nav-link, .mobile-nav-link');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      let isMatch = false;
      if (isHome && (href === 'index.html' || href === '/' || href === '#home')) {
        isMatch = true;
      } else if (!isHome && href !== 'index.html' && href !== '/' && href !== '#home') {
        if (path.endsWith(href) || href.endsWith(path)) {
          isMatch = true;
        }
      }

      if (isMatch) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      } else if (href.includes('.html')) {
        link.removeAttribute('aria-current');
        link.classList.remove('active');
      }
    });
  }

  // 2. Info Panel Dynamic Configuration
  function initInfoPanel() {
    // Response time
    const responseElem = document.getElementById('contactResponseTime');
    if (responseElem && CONTACT_CONFIG.responseTime) {
      responseElem.textContent = `Reply ${CONTACT_CONFIG.responseTime}`;
    }

    // Operating Hours (Render only if present, never invent)
    const checklist = document.getElementById('contactChecklist');
    if (checklist && CONTACT_CONFIG.hours && CONTACT_CONFIG.hours.trim() !== '') {
      const hoursLi = document.createElement('li');
      hoursLi.className = 'checklist-item';
      hoursLi.innerHTML = `
        <span class="checklist-icon" aria-hidden="true">&#x2713;</span>
        <span>${CONTACT_CONFIG.hours}</span>
      `;
      checklist.appendChild(hoursLi);
    }

    // Optional Testimonial Slot (Render only if present, never invent)
    const testimonialSlot = document.getElementById('contactTestimonialSlot');
    if (testimonialSlot && CONTACT_CONFIG.testimonial && CONTACT_CONFIG.testimonial.quote) {
      testimonialSlot.hidden = false;
      testimonialSlot.innerHTML = `
        <blockquote class="contact-testimonial-quote" style="border-left: 2px solid var(--c-focus); padding-left: 14px; margin: 0 0 8px; color: #D4D7DD; font-size: 14px; line-height: 1.5; font-style: italic;">
          &ldquo;${CONTACT_CONFIG.testimonial.quote}&rdquo;
        </blockquote>
        <div style="font-size: 13px; color: var(--c-muted); font-weight: 500;">
          ${CONTACT_CONFIG.testimonial.name || ''}${CONTACT_CONFIG.testimonial.role ? ` &bull; ${CONTACT_CONFIG.testimonial.role}` : ''}
        </div>
      `;
    }

    // Contact Action Links
    const callBtn = document.getElementById('contactCallBtn');
    if (callBtn) {
      callBtn.href = CONTACT_CONFIG.phoneHref;
      const label = callBtn.querySelector('span');
      if (label) label.textContent = `Call ${CONTACT_CONFIG.phoneDisplay}`;
    }

    const emailBtn = document.getElementById('contactEmailBtn');
    if (emailBtn) {
      emailBtn.href = `mailto:${CONTACT_CONFIG.email}`;
      const label = emailBtn.querySelector('span');
      if (label) label.textContent = CONTACT_CONFIG.email;
    }
  }

  // 3. Service Query Param Prefill
  function initServicePrefill() {
    try {
      const params = new URLSearchParams(window.location.search);
      const serviceSlug = params.get('service');
      if (serviceSlug) {
        const select = document.getElementById('service');
        if (select) {
          const option = select.querySelector(`option[value="${serviceSlug}"]`);
          if (option) {
            select.value = serviceSlug;
          }
        }
      }
    } catch (_) {}
  }

  // 4. Form Validation & Interaction
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name: {
        input: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: (val) => {
          if (!val || val.trim().length < 2) return 'Please enter your name';
          return null;
        }
      },
      brand: {
        input: document.getElementById('brand'),
        error: document.getElementById('brand-error'),
        validate: (val) => {
          if (!val || val.trim().length < 2) return 'Please enter your business or brand name';
          return null;
        }
      },
      email: {
        input: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: (val) => {
          if (!val || !val.trim()) return 'Please enter your email address';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val.trim())) return "That email doesn't look right. Could you check it?";
          return null;
        }
      },
      phone: {
        input: document.getElementById('phone'),
        error: document.getElementById('phone-error'),
        validate: (val) => {
          if (!val || !val.trim()) return null; // Optional
          // Strip spaces, dashes, parens, and optional leading +
          const digits = val.trim().replace(/^(\+)/, '').replace(/[\s\-\(\)\.]/g, '');
          if (!/^\d{10,15}$/.test(digits)) {
            return 'Please enter a valid phone or WhatsApp number (10 to 15 digits)';
          }
          return null;
        }
      },
      service: {
        input: document.getElementById('service'),
        error: document.getElementById('service-error'),
        validate: (val) => {
          if (!val || !val.trim()) return 'Please choose a service';
          const validSlugs = ['web-design', 'seo-geo', 'social-media', 'advertising', 'pr', 'not-sure'];
          if (!validSlugs.includes(val.trim())) return 'Please select a valid service from the list';
          return null;
        }
      }
    };

    function validateField(key) {
      const field = fields[key];
      if (!field || !field.input) return true;

      const errorMsg = field.validate(field.input.value);
      if (errorMsg) {
        field.input.setAttribute('aria-invalid', 'true');
        field.input.setAttribute('aria-describedby', `${key}-error`);
        if (field.error) {
          field.error.textContent = errorMsg;
          field.error.hidden = false;
        }
        return false;
      } else {
        field.input.removeAttribute('aria-invalid');
        field.input.removeAttribute('aria-describedby');
        if (field.error) {
          field.error.textContent = '';
          field.error.hidden = true;
        }
        return true;
      }
    }

    // Attach blur validation and clear on input
    Object.keys(fields).forEach((key) => {
      const f = fields[key];
      if (!f.input) return;

      f.input.addEventListener('blur', () => {
        validateField(key);
      });

      f.input.addEventListener('input', () => {
        if (f.input.getAttribute('aria-invalid') === 'true') {
          validateField(key);
        }
      });

      if (f.input.tagName === 'SELECT') {
        f.input.addEventListener('change', () => {
          validateField(key);
        });
      }
    });

    // 5. Chat Launcher Hide on Form Focus
    let blurTimeout = null;
    form.addEventListener('focusin', () => {
      if (blurTimeout) clearTimeout(blurTimeout);
      document.body.classList.add('form-active');
    });

    form.addEventListener('focusout', () => {
      blurTimeout = setTimeout(() => {
        const activeElement = document.activeElement;
        if (!form.contains(activeElement)) {
          document.body.classList.remove('form-active');
        }
      }, 150);
    });

    // 6. Form Submission
    const submitBtn = form.querySelector('.btn-primary');
    const btnLabel = submitBtn ? submitBtn.querySelector('.btn-label') : null;
    const formStatus = document.getElementById('form-status');
    const formContainer = form.parentElement;

    let isSubmitting = false;

    function renderSuccessState() {
      document.body.classList.remove('form-active');
      const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=Hi%20Igraph%20Media%2C%20I%20just%20submitted%20an%20enquiry%20for%20my%20business`;

      formContainer.innerHTML = `
        <div class="form-success-card" tabindex="-1" id="formSuccessBlock">
          <div class="form-success-icon" aria-hidden="true">&#x2713;</div>
          <h3 class="form-success-heading">Thank you for reaching out</h3>
          <p class="form-success-text">
            A member of our team will review your business goals and reach out ${CONTACT_CONFIG.responseTime}.
          </p>
          <div class="form-success-actions">
            <a href="${waUrl}" class="contact-link-btn contact-link-whatsapp" target="_blank" rel="noopener noreferrer" style="justify-content: center;">
              <span>Fast-track on WhatsApp</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <button type="button" class="form-reset-link" id="btnSendAnother">
              Send another enquiry
            </button>
          </div>
        </div>
      `;

      const successBlock = document.getElementById('formSuccessBlock');
      if (successBlock) successBlock.focus();

      const resetBtn = document.getElementById('btnSendAnother');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          window.location.reload();
        });
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (isSubmitting) return;

      // Validate all required fields
      let isValid = true;
      let firstInvalidInput = null;

      Object.keys(fields).forEach((key) => {
        const fieldValid = validateField(key);
        if (!fieldValid) {
          isValid = false;
          if (!firstInvalidInput && fields[key].input) {
            firstInvalidInput = fields[key].input;
          }
        }
      });

      if (!isValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Check honeypot
      const hpInput = form.querySelector('input[name="company_website"]');
      if (hpInput && hpInput.value.trim() !== '') {
        // Silently show success to bot without sending
        renderSuccessState();
        return;
      }

      // Prepare payload
      const payload = {
        name: fields.name.input.value.trim(),
        brand: fields.brand.input.value.trim(),
        email: fields.email.input.value.trim(),
        phone: fields.phone.input ? fields.phone.input.value.trim() : '',
        service: fields.service.input.value.trim(),
        goal: (document.getElementById('goal')?.value || '').trim(),
        company_website: '' // honeypot
      };

      // Set sending UI
      isSubmitting = true;
      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = 'Sending…';
      if (formStatus) {
        formStatus.innerHTML = '';
        formStatus.hidden = true;
      }

      // 15-second AbortController timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          renderSuccessState();
        } else {
          let errData = {};
          try {
            errData = await response.json();
          } catch (_) {}

          if (response.status === 429) {
            showErrorState(errData.message || 'Too many submissions. Please wait a few moments before trying again, or message us on WhatsApp.');
          } else {
            showErrorState();
          }
        }
      } catch (err) {
        clearTimeout(timeoutId);
        showErrorState();
      } finally {
        isSubmitting = false;
        if (submitBtn) submitBtn.disabled = false;
        if (btnLabel) btnLabel.textContent = 'Book my free consultation';
      }

      function showErrorState(customMsg) {
        if (!formStatus) return;
        const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=Hi%20Igraph%20Media%2C%20I%20had%20trouble%20submitting%20the%20website%20form`;
        const msg = customMsg || 'Something went wrong sending your message. Please try again, or chat with us on WhatsApp.';

        formStatus.hidden = false;
        formStatus.innerHTML = `
          <div class="form-error-banner" role="alert">
            <p style="margin: 0 0 8px;">${msg}</p>
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <button type="submit" style="background: transparent; border: 1px solid rgba(255, 107, 107, 0.5); color: #fff; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px;">
                Retry Submission
              </button>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp &rarr;</a>
            </div>
          </div>
        `;
      }
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initNavActiveState();
      initInfoPanel();
      initServicePrefill();
      initContactForm();
    });
  } else {
    initNavActiveState();
    initInfoPanel();
    initServicePrefill();
    initContactForm();
  }
})();
