# Armory — AI Automation Platform

**FrontEnd Battle 3.0 - VibeCoding Competition (IIT Bhubaneswar) Submission**

A premium, high-converting landing page built under a strict 4-hour sprint constraint. This project focuses on advanced DOM manipulation, zero-dependency state isolation, and hardware-accelerated motion choreography.

## 🔗 Submission Links

* **Live Deployment:** [View Site](https://next-gen-ai-101.vercel.app/)
* **Demo Video:** [Watch on Google Drive](https://drive.google.com/file/d/1vnRlUo5DD-5KY937Q78EEehAAQJVK_KQ/view?usp=sharing)

---

## 🏗️ Architectural Strategy

To strictly adhere to the "Do Not Trigger Global Re-renders" constraint, I bypassed frameworks like React and Next.js entirely. This project is architected from the ground up using Vanilla JavaScript and Native CSS.

By avoiding the Virtual DOM diffing lifecycle, the architecture guarantees exactly 0 global layout reflows. State updates are strictly isolated to targeted text nodes, maximizing rendering performance and satisfying the 40-point Logic & Architecture constraint.

---

## ⚡ Core Features & Rule Compliance

### 1. Matrix-Driven Pricing & State Isolation (Feature 1)

* **The Matrix:** Pricing calculations are handled by a multidimensional JS object that processes base rates, a flat 20% annual discount multiplier, and regional tariff variables (USD, EUR, INR).
* **Strict State Isolation:** When a user toggles billing cycles or currencies, the JS engine strictly updates only the `textContent` of specific `.price-symbol` and `.price-amount` nodes.
* **The Proof:** As shown in the demo video, Chrome DevTools Paint Flashing confirms that only the text nodes repaint. Zero parent containers or sibling layout blocks are re-rendered during these interactions.

### 2. Bento-to-Accordion Wrapper with Context Lock (Feature 2)

* **Zero Dependencies:** Built entirely from scratch. No Radix, Shadcn, or Framer Motion overhead.
* **Responsive State Persistence:** A global `currView` tracker listens to a debounced `window.resize` event. When the viewport crosses the 640px boundary, the `activeIdx` from the currently hovered Bento card is programmatically transferred to the Accordion DOM state, forcing the corresponding panel to open smoothly.

### 3. Motion & Performance Caps

* **< 500ms TTI:** The initial boot sequence utilizes a CSS-driven entry loader (`#loader`) that executes and unmounts in exactly 450ms. This ensures semantic HTML indexing is never blocked.
* **Native Easing:** All micro-interactions utilize 150ms-200ms ease-out curves, while structural reflows use 300ms-400ms ease-in-out curves via native CSS transitions. No runtime CSS-in-JS engines were used.

### 4. SEO Hygiene & Semantic HTML

* **Semantic Structure:** Avoided "div soup" entirely by strictly utilizing `<header>`, `<main>`, `<section>`, `<article>`, and native `<details>`/`<summary>` semantics where applicable.
* **Metadata:** Full Open Graph (OG) tags, Twitter cards, and JSON-LD structured data are cleanly injected into the `<head>`.

---

## 🚀 How to Run Locally

Because this project utilizes a zero-build-step Vanilla architecture, there is absolutely no package installation required.

1. Clone the repository to your local machine.
2. Open `index.html` directly in any modern web browser.
3. Resize the window to test the Bento-to-Accordion context lock.
4. Open Chrome DevTools (Rendering > Paint Flashing) to verify the isolated pricing text updates.
