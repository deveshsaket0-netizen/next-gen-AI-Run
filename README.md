Armory — AI Automation Platform

FrontEnd Battle 3.0 - VibeCoding Competition (IIT Bhubaneswar) Submission

A premium, high-converting landing page built under a strict 4-hour sprint constraint. This project demonstrates advanced DOM manipulation, zero-dependency state isolation, and hardware-accelerated motion choreography.

🔗 Submission Links

Live Deployment: [Insert your Vercel/Netlify link here]

Demo Video: Armory — AI Automation Platform

FrontEnd Battle 3.0 - VibeCoding Competition (IIT Bhubaneswar) Submission

A premium, high-converting landing page built under a strict 4-hour sprint constraint. This project demonstrates advanced DOM manipulation, zero-dependency state isolation, and hardware-accelerated motion choreography.

🔗 Submission Links

Live Deployment: [Insert your Vercel/Netlify link here]

Demo Video: Armory — AI Automation Platform

FrontEnd Battle 3.0 - VibeCoding Competition (IIT Bhubaneswar) Submission

A premium, high-converting landing page built under a strict 4-hour sprint constraint. This project demonstrates advanced DOM manipulation, zero-dependency state isolation, and hardware-accelerated motion choreography.

🔗 Submission Links

Live Deployment: [[Insert your Vercel/Netlify link here](https://next-gen-ai-101.vercel.app/)]

Demo Video: [[Insert your Google Drive link here](https://drive.google.com/file/d/1vnRlUo5DD-5KY937Q78EEehAAQJVK_KQ/view?usp=sharing)] 
🏗️ Architectural Strategy

To strictly adhere to the "Do Not Trigger Global Re-renders" constraint, this project was architected using Vanilla JavaScript and Native CSS instead of React or Next.js.

By avoiding the Virtual DOM diffing lifecycle, I was able to guarantee 0 global layout reflows and strictly isolate state updates to targeted text nodes, maximizing performance and satisfying the 40-point Logic & Architecture constraint.

Core Features & Rule Compliance

1. Matrix-Driven Pricing & State Isolation (Feature 1)

The Matrix: Pricing is calculated via a multidimensional JS object handling base rates, a flat 20% annual discount multiplier, and regional tariff variables (USD, EUR, INR).

Strict State Isolation: When toggling billing cycles or currencies, the JS engine strictly updates the textContent of the specific .price-symbol and .price-amount nodes.

Proof: As demonstrated in the demo video, Chrome DevTools Paint Flashing confirms that only the text nodes repaint. Zero parent containers or sibling layout blocks are re-rendered.

2. Bento-to-Accordion Wrapper with Context Lock (Feature 2)

Zero Dependencies: Built entirely from scratch without Radix, Shadcn, or Framer Motion.

Responsive State Persistence: A global currView tracker listens to a debounced window.resize event. When the viewport crosses the 640px boundary, the activeIdx from the hovered Bento card is programmatically transferred to the Accordion DOM state, forcing the corresponding panel to open smoothly.

3. Motion & Performance Caps

< 500ms TTI: The initial boot sequence utilizes a CSS-driven entry loader (#loader) that executes and unmounts in exactly 450ms, ensuring semantic HTML indexing is not blocked.

Native Easing: All micro-interactions use 150ms-200ms ease-out curves, while structural reflows use 300ms-400ms ease-in-out curves via native CSS transitions. No runtime CSS-in-JS engines were used.

4. SEO Hygiene & Semantic HTML

Semantic Structure: Avoided "div soup" by strictly utilizing <header>, <main>, <section>, <article>, and native <details>/<summary> semantics where applicable.

Metadata: Full Open Graph (OG) tags, Twitter cards, and JSON-LD structured data are injected into the <head>.

🚀 How to Run Locally

Because this project uses a zero-build-step Vanilla architecture, no package installation is required.

Clone the repository.

Open index.html directly in any modern web browser.

Resize the window to test the Bento/Accordion context lock, and use DevTools to verify the isolated pricing text updates.

🏗️ Architectural Strategy

To strictly adhere to the "Do Not Trigger Global Re-renders" constraint, this project was architected using Vanilla JavaScript and Native CSS instead of React or Next.js.

By avoiding the Virtual DOM diffing lifecycle, I was able to guarantee 0 global layout reflows and strictly isolate state updates to targeted text nodes, maximizing performance and satisfying the 40-point Logic & Architecture constraint.

Core Features & Rule Compliance

1. Matrix-Driven Pricing & State Isolation (Feature 1)

The Matrix: Pricing is calculated via a multidimensional JS object handling base rates, a flat 20% annual discount multiplier, and regional tariff variables (USD, EUR, INR).

Strict State Isolation: When toggling billing cycles or currencies, the JS engine strictly updates the textContent of the specific .price-symbol and .price-amount nodes.

Proof: As demonstrated in the demo video, Chrome DevTools Paint Flashing confirms that only the text nodes repaint. Zero parent containers or sibling layout blocks are re-rendered.

2. Bento-to-Accordion Wrapper with Context Lock (Feature 2)

Zero Dependencies: Built entirely from scratch without Radix, Shadcn, or Framer Motion.

Responsive State Persistence: A global currView tracker listens to a debounced window.resize event. When the viewport crosses the 640px boundary, the activeIdx from the hovered Bento card is programmatically transferred to the Accordion DOM state, forcing the corresponding panel to open smoothly.

3. Motion & Performance Caps

< 500ms TTI: The initial boot sequence utilizes a CSS-driven entry loader (#loader) that executes and unmounts in exactly 450ms, ensuring semantic HTML indexing is not blocked.

Native Easing: All micro-interactions use 150ms-200ms ease-out curves, while structural reflows use 300ms-400ms ease-in-out curves via native CSS transitions. No runtime CSS-in-JS engines were used.

4. SEO Hygiene & Semantic HTML

Semantic Structure: Avoided "div soup" by strictly utilizing <header>, <main>, <section>, <article>, and native <details>/<summary> semantics where applicable.

Metadata: Full Open Graph (OG) tags, Twitter cards, and JSON-LD structured data are injected into the <head>.

🚀 How to Run Locally

Because this project uses a zero-build-step Vanilla architecture, no package installation is required.

Clone the repository.

Open index.html directly in any modern web browser.

Resize the window to test the Bento/Accordion context lock, and use DevTools to verify the isolated pricing text updates.

🏗️ Architectural Strategy

To strictly adhere to the "Do Not Trigger Global Re-renders" constraint, this project was architected using Vanilla JavaScript and Native CSS instead of React or Next.js.

By avoiding the Virtual DOM diffing lifecycle, I was able to guarantee 0 global layout reflows and strictly isolate state updates to targeted text nodes, maximizing performance and satisfying the 40-point Logic & Architecture constraint.

Core Features & Rule Compliance

1. Matrix-Driven Pricing & State Isolation (Feature 1)

The Matrix: Pricing is calculated via a multidimensional JS object handling base rates, a flat 20% annual discount multiplier, and regional tariff variables (USD, EUR, INR).

Strict State Isolation: When toggling billing cycles or currencies, the JS engine strictly updates the textContent of the specific .price-symbol and .price-amount nodes.

Proof: As demonstrated in the demo video, Chrome DevTools Paint Flashing confirms that only the text nodes repaint. Zero parent containers or sibling layout blocks are re-rendered.

2. Bento-to-Accordion Wrapper with Context Lock (Feature 2)

Zero Dependencies: Built entirely from scratch without Radix, Shadcn, or Framer Motion.

Responsive State Persistence: A global currView tracker listens to a debounced window.resize event. When the viewport crosses the 640px boundary, the activeIdx from the hovered Bento card is programmatically transferred to the Accordion DOM state, forcing the corresponding panel to open smoothly.

3. Motion & Performance Caps

< 500ms TTI: The initial boot sequence utilizes a CSS-driven entry loader (#loader) that executes and unmounts in exactly 450ms, ensuring semantic HTML indexing is not blocked.

Native Easing: All micro-interactions use 150ms-200ms ease-out curves, while structural reflows use 300ms-400ms ease-in-out curves via native CSS transitions. No runtime CSS-in-JS engines were used.

4. SEO Hygiene & Semantic HTML

Semantic Structure: Avoided "div soup" by strictly utilizing <header>, <main>, <section>, <article>, and native <details>/<summary> semantics where applicable.

Metadata: Full Open Graph (OG) tags, Twitter cards, and JSON-LD structured data are injected into the <head>.

🚀 How to Run Locally

Because this project uses a zero-build-step Vanilla architecture, no package installation is required.

Clone the repository.

Open index.html directly in any modern web browser.

Resize the window to test the Bento/Accordion context lock, and use DevTools to verify the isolated pricing text updates.
