(function pricingLogic() {
  'use strict';

  // base tiers mapped by currency (USD equivalent)
  const ratesMap = {
    starter: {
      USD: { base: 29,  symbol: '$' },
      INR: { base: 2399, symbol: '₹' }, 
      EUR: { base: 27,  symbol: '€' },  
    },
    pro: {
      USD: { base: 99,   symbol: '$' },
      INR: { base: 8199, symbol: '₹' },
      EUR: { base: 91,   symbol: '€' },
    },
    enterprise: {
      USD: { base: 299,   symbol: '$'  },
      INR: { base: 24799, symbol: '₹' },
      EUR: { base: 275,   symbol: '€' },
    },
  };

  const yearlyOff = 0.80; // 20% discount on annual

  let currPlan = 'monthly';
  let currCurrency = 'USD';

  function calcPrice(tier, coin, planType) {
    const conf = ratesMap[tier][coin];
    const rawNum = planType === 'annual' ? Math.round(conf.base * yearlyOff) : conf.base;
    
    return {
      symbol: conf.symbol,
      amount: rawNum.toLocaleString(), 
    };
  }

  function injectPrices(plan, coin) {
    const plans = ['starter', 'pro', 'enterprise'];

    plans.forEach(tier => {
      const result = calcPrice(tier, coin, plan);

      // strictly isolate DOM updates to just the text nodes
      const symNode = document.querySelector(`.price-symbol[data-tier="${tier}"]`);
      const amtNode = document.querySelector(`.price-amount[data-tier="${tier}"]`);

      if (symNode) symNode.textContent = result.symbol;
      if (amtNode) amtNode.textContent = result.amount;
    });
  }

  function toggleButtons(activeType) {
    const monthBtn = document.getElementById('btn-monthly');
    const yearBtn  = document.getElementById('btn-annual');
    if (!monthBtn || !yearBtn) return;

    if (activeType === 'monthly') {
      monthBtn.classList.add('active');
      monthBtn.setAttribute('aria-pressed', 'true');
      yearBtn.classList.remove('active');
      yearBtn.setAttribute('aria-pressed', 'false');
    } else {
      yearBtn.classList.add('active');
      yearBtn.setAttribute('aria-pressed', 'true');
      monthBtn.classList.remove('active');
      monthBtn.setAttribute('aria-pressed', 'false');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const monthBtn = document.getElementById('btn-monthly');
    const yearBtn  = document.getElementById('btn-annual');
    const currencyDrop = document.getElementById('currency-select');

    if (!monthBtn || !yearBtn || !currencyDrop) return;

    monthBtn.addEventListener('click', () => {
      if (currPlan === 'monthly') return; 
      currPlan = 'monthly';
      console.log('switched to monthly billing');
      toggleButtons('monthly');
      injectPrices(currPlan, currCurrency);
    });

    yearBtn.addEventListener('click', () => {
      if (currPlan === 'annual') return;
      currPlan = 'annual';
      console.log('switched to annual billing');
      toggleButtons('annual');
      injectPrices(currPlan, currCurrency);
    });

    currencyDrop.addEventListener('change', (e) => {
      currCurrency = e.target.value;
      console.log('currency updated ->', currCurrency);
      injectPrices(currPlan, currCurrency);
    });

    
    injectPrices(currPlan, currCurrency);
  });

}());