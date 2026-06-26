/* ═══════════════════════════════════════════════════
   bento.js — Feature 2
   Bento Grid (desktop) ↔ Accordion (mobile)
   with active-index context lock on resize.

   RULES COMPLIANCE:
   ✓ Zero external libraries (no Framer Motion, Radix, etc.)
   ✓ Pure CSS transitions for open/close (max-height)
   ✓ Accordion written entirely from scratch
   ✓ Context lock: active bento index transfers to
     accordion state when crossing the 640px breakpoint
   ═══════════════════════════════════════════════════ */

(function BentoAccordion() {
  'use strict';

  /* ── BREAKPOINT must match CSS ── */
  const MOBILE_BP = 640;

  /* ── FEATURE DATA — single source of truth ── */
  const FEATURES = [
    {
      index: 0,
      icon:  'assets/icons/interface/link-solid.svg',
      title: 'Secure Guard',
      desc:  'End-to-end encryption with zero-trust architecture. Every agent runs in an isolated execution environment.',
      tag:   'Security',
    },
    {
      index: 1,
      icon:  'assets/icons/interface/cog-8-tooth.svg',
      title: 'Agent Build',
      desc:  'Visual agent builder with drag-and-drop logic nodes. Build complex pipelines without writing infrastructure code.',
      tag:   'Builder',
    },
    {
      index: 2,
      icon:  'assets/icons/data-viz/cube-16-solid.svg',
      title: 'Cloud Scale',
      desc:  'Auto-scale from 1 to 10,000 concurrent agents without infrastructure changes.',
      tag:   'Infrastructure',
    },
    {
      index: 3,
      icon:  'assets/icons/data-viz/chart-pie.svg',
      title: 'Data Mining',
      desc:  'Extract structured insights from unstructured data streams at scale.',
      tag:   'Analytics',
    },
    {
      index: 4,
      icon:  'assets/icons/interface/search.svg',
      title: 'Infinite Visual Canvas',
      desc:  'Design multi-agent workflows on an infinite, pannable canvas. Connect data sources, logic gates, and output nodes.',
      tag:   'Design',
    },
    {
      index: 5,
      icon:  'assets/icons/data-viz/arrow-trending-up.svg',
      title: 'Autonomous Execution',
      desc:  'Agents self-schedule, self-heal, and adapt to changing data conditions without human intervention.',
      tag:   'Automation',
    },
    {
      index: 6,
      icon:  'assets/icons/interface/link.svg',
      title: 'End-to-End Encryption',
      desc:  'AES-256 encryption at rest and in transit across all agent communications.',
      tag:   'Security',
    },
    {
      index: 7,
      icon:  'assets/icons/interface/arrow-path.svg',
      title: 'Production-Ready Stack',
      desc:  'Ship to production the same day. 99.98% uptime SLA with automatic rollbacks.',
      tag:   'DevOps',
    },
  ];

  /* ── SHARED STATE ─────────────────────────────────
     activeIndex: the currently active/hovered feature.
     -1 = none active.
     This single variable is the "context lock" — it
     bridges bento hover state to accordion open state.
  ──────────────────────────────────────────────────── */
  let activeIndex = -1;

  /* ─────────────────────────────────────────────────
     BENTO: set active card
  ──────────────────────────────────────────────────── */
  function setBentoActive(index) {
    activeIndex = index;
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(function(card) {
      const i = parseInt(card.getAttribute('data-index'), 10);
      card.classList.toggle('active', i === index);
    });
  }

  function clearBentoActive() {
    // Only clear the visual — don't reset activeIndex to -1.
    // We need to remember the LAST hovered index for the context lock.
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(function(card) { card.classList.remove('active'); });
  }

  /* ─────────────────────────────────────────────────
     BENTO: wire hover + keyboard events
  ──────────────────────────────────────────────────── */
  function initBento() {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(function(card) {
      const idx = parseInt(card.getAttribute('data-index'), 10);

      card.addEventListener('mouseenter', function() {
        setBentoActive(idx);
      });

      card.addEventListener('mouseleave', function() {
        // Keep activeIndex set (context lock), just remove visual class
        clearBentoActive();
      });

      card.addEventListener('focus', function() {
        setBentoActive(idx);
      });

      card.addEventListener('blur', function() {
        clearBentoActive();
      });

      // Also update activeIndex on click (persists for resize)
      card.addEventListener('click', function() {
        setBentoActive(idx);
      });
    });
  }

  /* ─────────────────────────────────────────────────
     ACCORDION: build from FEATURES data
  ──────────────────────────────────────────────────── */
  function buildAccordion() {
    const container = document.getElementById('accordion-list');
    if (!container) return;

    container.innerHTML = FEATURES.map(function(f) {
      return `
        <div class="accordion-item" data-index="${f.index}" role="listitem">
          <button
            class="accordion-trigger"
            aria-expanded="false"
            aria-controls="acc-body-${f.index}"
            data-index="${f.index}">
            <span class="accordion-trigger-icon">
              <img src="${f.icon}" alt="" aria-hidden="true" width="18" height="18"/>
            </span>
            <span class="accordion-trigger-text">${f.title}</span>
            <img
              src="assets/icons/navigation/chevron-down.svg"
              alt=""
              aria-hidden="true"
              class="accordion-chevron"
              width="16"
              height="16"/>
          </button>
          <div class="accordion-body" id="acc-body-${f.index}" role="region" aria-label="${f.title}">
            <div class="accordion-body-inner">
              <p>${f.desc}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Wire click events
    container.querySelectorAll('.accordion-trigger').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const idx  = parseInt(btn.getAttribute('data-index'), 10);
        const item = btn.closest('.accordion-item');
        const isOpen = item.classList.contains('active');

        // Close all items first (single-open accordion)
        closeAllAccordion();

        if (!isOpen) {
          openAccordionItem(item, idx);
        } else {
          // Clicking open item closes it; reset activeIndex
          activeIndex = -1;
        }
      });
    });
  }

  function openAccordionItem(item, idx) {
    item.classList.add('active');
    const trigger = item.querySelector('.accordion-trigger');
    const body    = item.querySelector('.accordion-body');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (body)    body.style.maxHeight = body.scrollHeight + 'px';
    activeIndex = idx;
  }

  function closeAllAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(function(item) {
      item.classList.remove('active');
      const trigger = item.querySelector('.accordion-trigger');
      const body    = item.querySelector('.accordion-body');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (body)    body.style.maxHeight = '0';
    });
  }

  /* ─────────────────────────────────────────────────
     CONTEXT LOCK: transfer active index across layouts
     Called when window crosses the 640px breakpoint.
  ──────────────────────────────────────────────────── */
  function transferContextToAccordion() {
    if (activeIndex === -1) return; // nothing was active — no transfer needed

    const items = document.querySelectorAll('.accordion-item');
    items.forEach(function(item) {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (idx === activeIndex) {
        openAccordionItem(item, activeIndex);
      }
    });
  }

  function transferContextToBento() {
    // When switching back to desktop, highlight the last active card
    if (activeIndex === -1) return;
    setBentoActive(activeIndex);
    // Auto-clear visual after 1.5s (user is now on desktop, hover takes over)
    setTimeout(clearBentoActive, 1500);
  }

  /* ─────────────────────────────────────────────────
     LAYOUT MODE: show/hide bento vs accordion
  ──────────────────────────────────────────────────── */
  let currentMode = null; // 'desktop' | 'mobile'

  function getMode() {
    return window.innerWidth <= MOBILE_BP ? 'mobile' : 'desktop';
  }

  function applyMode(mode) {
    const bentoGrid    = document.getElementById('bento-grid');
    const accordionList = document.getElementById('accordion-list');
    if (!bentoGrid || !accordionList) return;

    if (mode === 'mobile') {
      bentoGrid.style.display = 'none';
      accordionList.removeAttribute('hidden');
    } else {
      bentoGrid.style.display = ''; // restore to CSS grid
      accordionList.setAttribute('hidden', '');
    }
  }

  /* ─────────────────────────────────────────────────
     RESIZE HANDLER with debounce
     — Detects breakpoint crossing
     — Transfers context on crossing (NOT on every resize)
  ──────────────────────────────────────────────────── */
  let resizeTimer = null;

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const newMode = getMode();
      if (newMode === currentMode) return; // didn't cross breakpoint

      const prevMode = currentMode;
      currentMode = newMode;
      applyMode(newMode);

      // Context lock: transfer active index to the new layout
      if (newMode === 'mobile' && prevMode === 'desktop') {
        // Crossing desktop → mobile: open the corresponding accordion panel
        closeAllAccordion();
        transferContextToAccordion();
      } else if (newMode === 'desktop' && prevMode === 'mobile') {
        // Crossing mobile → desktop: highlight the bento card briefly
        clearBentoActive();
        transferContextToBento();
      }
    }, 50); // 50ms debounce — fast enough to feel instant
  }

  /* ─────────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────────────── */
  function init() {
    buildAccordion();
    initBento();

    // Set initial layout mode without triggering context transfer
    currentMode = getMode();
    applyMode(currentMode);

    window.addEventListener('resize', onResize);

    console.log('[Bento/Accordion] Initialised. Context lock active.');
  }

  document.addEventListener('DOMContentLoaded', init);

}());
