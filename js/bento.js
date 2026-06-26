(function bentoUI() {
  'use strict';

  const mobileBreak = 640;

  // feature list
  const gridItems = [
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

  let activeIdx = -1; 
  let currView = null;

  function setBentoActive(index) {
    activeIdx = index;
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
      const i = parseInt(card.getAttribute('data-index'), 10);
      card.classList.toggle('active', i === index);
    });
  }

  function clearBentoActive() {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => card.classList.remove('active'));
  }

  function setupBentoEvents() {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-index'), 10);

      card.addEventListener('mouseenter', () => setBentoActive(idx));
      card.addEventListener('mouseleave', () => clearBentoActive());
      card.addEventListener('focus', () => setBentoActive(idx));
      card.addEventListener('blur', () => clearBentoActive());
      card.addEventListener('click', () => setBentoActive(idx));
    });
  }

  // generate accordion html
  function renderAccordion() {
    const wrapper = document.getElementById('accordion-list');
    if (!wrapper) return;

    wrapper.innerHTML = gridItems.map(f => `
        <div class="accordion-item" data-index="${f.index}" role="listitem">
          <button class="accordion-trigger" aria-expanded="false" aria-controls="acc-body-${f.index}" data-index="${f.index}">
            <span class="accordion-trigger-icon">
              <img src="${f.icon}" alt="" aria-hidden="true" width="18" height="18"/>
            </span>
            <span class="accordion-trigger-text">${f.title}</span>
            <img src="assets/icons/navigation/chevron-down.svg" alt="" aria-hidden="true" class="accordion-chevron" width="16" height="16"/>
          </button>
          <div class="accordion-body" id="acc-body-${f.index}" role="region" aria-label="${f.title}">
            <div class="accordion-body-inner">
              <p>${f.desc}</p>
            </div>
          </div>
        </div>
      `).join('');

    wrapper.querySelectorAll('.accordion-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const item = btn.closest('.accordion-item');
        const isAlreadyOpen = item.classList.contains('active');

        closeAllPanels();

        if (!isAlreadyOpen) {
          openPanel(item, idx);
        } else {
          activeIdx = -1;
        }
      });
    });
  }

  function openPanel(item, idx) {
    item.classList.add('active');
    const trigger = item.querySelector('.accordion-trigger');
    const body = item.querySelector('.accordion-body');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
    activeIdx = idx;
  }

  function closeAllPanels() {
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      const trigger = item.querySelector('.accordion-trigger');
      const body = item.querySelector('.accordion-body');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (body) body.style.maxHeight = '0';
    });
  }

  
  function syncToAccordion() {
    if (activeIdx === -1) return;
    document.querySelectorAll('.accordion-item').forEach(item => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (idx === activeIdx) openPanel(item, activeIdx);
    });
  }

  function syncToBento() {
    if (activeIdx === -1) return;
    setBentoActive(activeIdx);
    setTimeout(clearBentoActive, 1500); 
  }

  function getViewType() {
    return window.innerWidth <= mobileBreak ? 'mobile' : 'desktop';
  }

  function toggleLayout(mode) {
    const bento = document.getElementById('bento-grid');
    const acc = document.getElementById('accordion-list');
    if (!bento || !acc) return;

    if (mode === 'mobile') {
      bento.style.display = 'none';
      acc.removeAttribute('hidden');
    } else {
      bento.style.display = '';
      acc.setAttribute('hidden', '');
    }
  }

  let resizeWait = null;

  function handleResize() {
    clearTimeout(resizeWait);
    resizeWait = setTimeout(() => {
      const newView = getViewType();
      if (newView === currView) return; 

      console.log('layout flip:', currView, '->', newView);

      const oldView = currView;
      currView = newView;
      toggleLayout(newView);

      if (newView === 'mobile' && oldView === 'desktop') {
        closeAllPanels();
        syncToAccordion();
      } else if (newView === 'desktop' && oldView === 'mobile') {
        clearBentoActive();
        syncToBento();
      }
    }, 50); 
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderAccordion();
    setupBentoEvents();

    currView = getViewType();
    toggleLayout(currView);

    window.addEventListener('resize', handleResize);
    console.log('bento initialized');
  });

}());