(function appMain() {
  'use strict';

  
  function killLoader() {
    const overlay = document.getElementById('loader');
    if (!overlay) return;
    setTimeout(() => {
      overlay.remove();
      console.log('loader stripped from DOM');
    }, 800);
  }

  
  function setupScrollReveal() {
    const hiddenEls = document.querySelectorAll('.reveal-up');
    if (!hiddenEls.length) return;

    // skip the hero section so it triggers immediately
    document.querySelectorAll('.section-hero .reveal-up').forEach(el => {
      el.classList.add('visible');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    hiddenEls.forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }

  //dark header
  function handleStickyNav() {
    const nav = document.getElementById('site-header');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 20 ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.85)';
    }, { passive: true });
  }

  
  function initMobileMenu() {
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isExpanded = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isExpanded));
      
      const bars = btn.querySelectorAll('span');
      if (isExpanded) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.transform = '';
      }
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelectorAll('span').forEach(s => s.style.transform = '');
      });
    });
  }

  function handleFormSubmit() {
    const emailForm = document.querySelector('.cta-form');
    if (!emailForm) return;

    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputEl = emailForm.querySelector('.cta-input');
      const submitBtn = emailForm.querySelector('button[type="submit"]');
      if (!inputEl || !inputEl.value.trim()) return;

      const oldText = submitBtn.textContent;
      submitBtn.textContent = '✓ Subscribed';
      submitBtn.style.background = '#1a7a8a';
      submitBtn.style.borderColor = '#1a7a8a';
      inputEl.value = '';
      inputEl.disabled = true;

    
      setTimeout(() => {
        submitBtn.textContent = oldText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        inputEl.disabled = false;
      }, 3000);
    });
  }

  // number counters
  function runStatCounters() {
    const nodes = document.querySelectorAll('.stat-num');
    if (!nodes.length) return;

    const targets = [
      { el: nodes[0], val: 12 },
      { el: nodes[1], val: 10 },
      { el: nodes[2], val: 98 },
      { el: nodes[3], val: 2000 },
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const match = targets.find(t => t.el === entry.target);
        if (!match) return;

        observer.unobserve(entry.target);
        doCountUp(match);
      });
    }, { threshold: 0.5 });

    targets.forEach(t => observer.observe(t.el));
  }

  function doCountUp(data) {
    const totalTime = 1200;
    const startTime = performance.now();

    function update(timeNow) {
      const diff = timeNow - startTime;
      const pct = Math.min(diff / totalTime, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // ease out
      const currentVal = Math.round(data.val * eased);

      const textToShow = currentVal >= 1000 ? Math.round(currentVal / 1000) + 'K' : String(currentVal);
      
      // keep the unit span intact, just update the number
      if (data.el.firstChild && data.el.firstChild.nodeType === Node.TEXT_NODE) {
        data.el.firstChild.textContent = textToShow;
      } else {
        data.el.insertAdjacentText('afterbegin', textToShow);
      }

      if (pct < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  document.addEventListener('DOMContentLoaded', () => {
    killLoader();
    setupScrollReveal();
    handleStickyNav();
    initMobileMenu();
    handleFormSubmit();
    runStatCounters();
    
    console.log('App ready. Let\'s go.');
  });

}());