# Pending Updates & Roadmap — Mohit Yadav Portfolio

This file tracks everything that is **not yet done** or could be improved.
When continuing on another machine, start here.

Last updated: 2026-06-20

---

## 🔴 Required before going fully live

These must be done for the site to work 100% in production.

- [ ] **Activate the contact form.**
  In `index.html`, the form `action` is still the placeholder
  `https://formspree.io/f/YOUR_FORM_ID`. Sign up at https://formspree.io,
  create a form pointing to `YMOHIT65127@GMAIL.COM`, and paste the real ID.
  Until then the form falls back to opening the visitor's email client.
  (See README → "Activate the contact form".)

- [ ] **Set absolute Open Graph URLs.**
  In `index.html`, the three social-preview tags (`og:url`, `og:image`,
  `twitter:image`) currently point to the relative path `og-image.png`.
  LinkedIn / WhatsApp / X need the FULL https URL. After deploying, change to e.g.
  `https://ymohit65127.github.io/MohitPortfolio/og-image.png`.
  Then refresh the cache via the LinkedIn Post Inspector (link in README).

- [ ] **Enable GitHub Pages** (or deploy to Netlify/Vercel).
  Repo → Settings → Pages → Source: `main` / root → Save.
  Live URL: `https://ymohit65127.github.io/MohitPortfolio/`.

---

## 🟡 Nice-to-have improvements (offered, not yet built)

- [ ] **Custom favicon with "MY" initials** — currently a 👨‍💻 emoji favicon.
      Replace with a branded SVG/PNG icon matching the gradient logo.
- [ ] **Custom domain** (e.g. `mohityadav.dev`) — DNS steps already documented in README.
- [ ] **Project case-study pages** — clickable project cards that open a detail
      page/modal with screenshots, problem→solution→impact, and tech breakdown.
- [ ] **"Now / currently building" section** — highlight current role at Mobilise.

---

## 🟢 Future / optional polish

- [ ] **SEO files** — add `sitemap.xml` and `robots.txt`.
- [ ] **Analytics** — privacy-friendly (Plausible / Cloudflare Web Analytics / GA4).
- [ ] **Testimonials / recommendations** section (LinkedIn quotes).
- [ ] **Blog / writing** section if Mohit wants to publish articles.
- [ ] **Accessibility audit** — verify color contrast (WCAG AA), keyboard nav,
      focus-visible states, and `aria` labels on all interactive elements.
- [ ] **Performance** — self-host Google Fonts to remove render-blocking request;
      add `loading="lazy"` to any future images; minify CSS/JS for production.
- [ ] **Form spam protection** — Formspree honeypot / reCAPTCHA.
- [ ] **PWA** — add a `manifest.json` + service worker for installable/offline.
- [ ] **CI/CD** — GitHub Action to auto-deploy on push (if not using Pages default).

---

## How to pick this up with Claude on another machine

1. Clone the repo (see `SETUP.md`).
2. Open the folder in Claude Code.
3. Say: *"Read PENDING_UPDATES.md and let's start with the 🔴 required items."*
4. Claude has full context from `README.md`, `SETUP.md`, and this file.
