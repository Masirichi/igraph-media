/* ============================================================
   IGRAPH MEDIA - INTERACTION LAYER
   LineaDS Style Interactions & FAQ Accordion
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Sticky Header Enhancement on Scroll
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. FAQ Accordion (LineaDS Style)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Open first FAQ by default like LineaDS
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstBtn = faqItems[0].querySelector('.faq-question');
    if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
  }

  // 4. Active Nav Link on Scroll via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu-wrapper .nav-link, .nav-links .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // 5. Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('active'));
  }

  // 6. Form Submission Integration with /api/leads (Supabase / Vercel Serverless)
  window.showFormSuccess = async () => {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccessMsg') || document.getElementById('formSuccessMessage');
    const submitBtn = document.getElementById('submitBtn') || (form ? form.querySelector('button[type="submit"]') : null);

    if (!form) return;

    // Collect form fields
    const payload = {
      client_name: document.getElementById('cName')?.value || 'Website Prospect',
      company_name: document.getElementById('cCompany')?.value || 'Client Brand',
      email: document.getElementById('cEmail')?.value || '',
      phone: document.getElementById('cPhone')?.value || '',
      service_interest: document.getElementById('cService')?.value || 'General Growth Enquiry',
      monthly_budget: document.getElementById('cBudget')?.value || '',
      timeline: document.getElementById('cTimeline')?.value || 'Within 30 days',
      message: document.getElementById('cMessage')?.value || '',
      nda_requested: document.getElementById('cNDA')?.checked || false,
      source: 'website_form'
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Submitting Brief...</span>';
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log('[Igraph Media] Brief submitted to backend:', data);
    } catch (err) {
      console.warn('[Igraph Media] Network submission to /api/leads:', err);
    }

    if (submitBtn) {
      submitBtn.style.display = 'none';
    }
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  /* ============================================================
     BENTO GRID STATS COUNTER ANIMATION (500M+ impressions)
     ============================================================ */
  const impressionCounters = document.querySelectorAll('.animate-counter');
  if ('IntersectionObserver' in window && impressionCounters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '500', 10);
          const duration = 2000;
          const startTime = performance.now();
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(easeOut * target);
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          }
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    impressionCounters.forEach((el) => counterObserver.observe(el));
  }

});
