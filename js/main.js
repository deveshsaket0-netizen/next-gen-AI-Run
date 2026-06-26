/* ═══════════════════════════════════════════════════
   main.js — Loader, Scroll Reveal, Nav, Form
   All motion uses native CSS transitions / WAAPI only.
   No runtime CSS-in-JS. No animation libraries.
   ═══════════════════════════════════════════════════ */

(function Main() {
  'use strict';

  /* ── 1. LOADER ─────────────────────────────────────
     CSS handles the exit animation at 450ms.
     We remove the element from DOM after it fades.
  ──────────────────────────────────────────────────── */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    // Remove from DOM after CSS animation completes (450ms delay + 300ms fade = 750ms)
    setTimeout(function() {
      loader.remove();
    }, 800);
  }

  /* ── 2. SCROLL REVEAL ──────────────────────────────
     IntersectionObserver triggers .visible on .reveal-up
     elements. CSS handles the transition (300–400ms).
  ──────────────────────────────────────────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up');
    if (!els.length) return;

    // Skip hero elements — they use CSS keyframe animations instead
    const heroEls = document.querySelectorAll('.section-hero .reveal-up');
    heroEls.forEach(function(el) {
      el.classList.add('visible'); // mark as done so observer skips them
    });

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(function(el) {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  }

  /* ── 3. STICKY HEADER STYLE ON SCROLL ── */
  function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.style.background = 'rgba(0,0,0,0.95)';
      } else {
        header.style.background = 'rgba(0,0,0,0.85)';
      }
    }, { passive: true });
  }

  /* ── 4. MOBILE NAV TOGGLE ── */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu   = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      // Animate hamburger to X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      }
    });

    // Close on nav link click
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      });
    });
  }

  /* ── 5. CTA EMAIL FORM ── */
  function initCTAForm() {
    const form = document.querySelector('.cta-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = form.querySelector('.cta-input');
      const btn   = form.querySelector('button[type="submit"]');
      if (!input || !input.value.trim()) return;

      // Success state — direct DOM update, no re-render
      const originalText = btn.textContent;
      btn.textContent = '✓ Subscribed';
      btn.style.background = '#1a7a8a';
      btn.style.borderColor = '#1a7a8a';
      input.value = '';
      input.disabled = true;

      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        input.disabled = false;
      }, 3000);
    });
  }

  /* ── 6. STAT COUNTER ANIMATION ──────────────────────
     Uses Web Animations API (WAAPI) — native, no library.
     Counts up numbers when stat cards scroll into view.
  ──────────────────────────────────────────────────── */
  function initStatCounters() {
    const statNums = document.querySelectorAll('.stat-num');
    if (!statNums.length) return;

    // Extract numeric value and suffix from display text set by HTML
    const statData = [
      { el: statNums[0], target: 12,   suffix: 'ms', prefix: '' },
      { el: statNums[1], target: 10,   suffix: 'x',  prefix: '' },
      { el: statNums[2], target: 98,   suffix: '%',  prefix: '' },
      { el: statNums[3], target: 2000, suffix: '+',  prefix: '' },
    ];

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          const data = statData.find(function(d) { return d.el === entry.target; });
          if (!data) return;

          observer.unobserve(entry.target);
          animateCount(data);
        });
      },
      { threshold: 0.5 }
    );

    statData.forEach(function(d) { if (d.el) observer.observe(d.el); });
  }

  function animateCount(data) {
    const duration = 1200;
    const start    = performance.now();
    const isK      = data.target >= 1000;

    function frame(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(data.target * eased);

      // Format display: 2000 → "2K"
      const display = current >= 1000 ? Math.round(current / 1000) + 'K' : String(current);
      // Only update the text node that holds the number (the span wrapping .stat-unit is a child)
      // We use firstChild trick to avoid touching the <span class="stat-unit"> child
      if (data.el.firstChild && data.el.firstChild.nodeType === Node.TEXT_NODE) {
        data.el.firstChild.textContent = display;
      } else {
        data.el.insertAdjacentText('afterbegin', display);
      }

      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  /* ── BOOT ── */
  document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initScrollReveal();
    initStickyHeader();
    initMobileNav();
    initCTAForm();
    initStatCounters();
    console.log('[Main] All modules initialised.');
  });

}());
