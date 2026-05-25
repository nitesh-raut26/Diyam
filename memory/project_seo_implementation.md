---
name: project-seo-implementation
description: SEO audit findings and implementation status for diyam.in / diyam.co.in (React SPA, Vite, Tailwind)
metadata:
  type: project
---

DIYAM website is a React SPA (no SSR) — critical SEO risk for Googlebot pre-JS rendering.

**Implemented 2026-05-25:**
- Added keyword-rich SEO slugs to all 38 products in src/data/products.js
- Updated routing in App.jsx: `/product/:idOrSlug` supports both numeric IDs and slugs
- Updated ProductCard.jsx: links use slug URLs, fixed nested `<a>` bug (WhatsApp button was inside Link)
- Updated ProductDetailPage.jsx: slug routing, FAQ accordion (auto-generated per product), BreadcrumbList schema, FAQPage schema, improved alt tags, wattage shown in H1
- Updated SEO.jsx: supports breadcrumbSchema + faqSchema props, improved all meta tags, robots meta, og:image dimensions
- Updated index.html: comprehensive static schemas (Organization, LocalBusiness, WebSite+SearchAction, ItemList), noscript fallback, reduced fonts from 4 to 3 families
- Updated sitemap.xml: all 38 products with slug URLs + image sitemaps
- Updated robots.txt: added GPTBot, ClaudeBot, PerplexityBot, Google-Extended, meta-externalagent, Applebot

**Why:** Google ranks slug URLs; AI search engines need FAQ + entity schemas; nested anchor tags caused React hydration warnings.

**How to apply:** When suggesting further SEO work, check the status above so we don't duplicate already-done items. Next priorities are SSR/prerendering and blog content.
