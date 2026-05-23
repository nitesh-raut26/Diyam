---
name: project-diyam-website
description: DIYAM luxury lighting ecommerce frontend — React+Vite+Tailwind project at /Users/niteshraut/Documents/AiApp/Diyam
metadata:
  type: project
---

DIYAM is a world-class luxury lighting ecommerce frontend (frontend-only, no backend).

**Why:** Owner needed a premium website for diyam.in selling decorative diyas, chandeliers, LED lights, and festival lighting. Brand inspiration from Indian premium decor + modern luxury.

**How to apply:** When continuing this project, note it uses gradient-based product cards (no external images), WhatsApp ordering (number placeholder 919999999999), and Cinzel/Playfair Display fonts.

Tech: React 19 + Vite 8 + TailwindCSS 3 + Framer Motion 12 + Swiper 12 + React Router DOM 7

Pages: Home, Products, Categories, Gallery, About, Contact

Key design choices:
- Product cards use category-specific CSS gradients (not real images, by design)
- Gallery tiles are also gradient art tiles
- WhatsApp number: 919999999999 (placeholder — needs real number)
- Color palette: #0B0B0B bg, #F59E0B gold, #FFD700 highlight
- Fonts: Cinzel (headings), Playfair Display (sub), Inter (body)
- Vercel deployment: vercel.json with SPA rewrite rule already configured

Deploy: `npm run build` → push to GitHub → connect Vercel. No env vars needed.
