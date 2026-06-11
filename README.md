# Mohit Yadav — Portfolio

A fast, dependency-free portfolio site (plain HTML/CSS/JS). Just open `index.html`.

```
portfolio/
├── index.html              # content & structure
├── styles.css              # styling
├── script.js               # interactions
├── Mohit_Yadav_Resume.pdf  # served by the "Download CV / Resume" buttons
└── README.md               # this file
```

---

## 1. Activate the contact form (5 minutes, free)

The form works out of the box in **fallback mode**: clicking *Send* opens the
visitor's email app with the message pre-filled to you. To receive submissions
directly in your inbox (no email app needed), connect **Formspree**:

1. Go to **https://formspree.io** and sign up (free tier = 50 submissions/month).
2. Create a new form, set the notification email to `YMOHIT65127@GMAIL.COM`.
3. Formspree gives you an endpoint like `https://formspree.io/f/abcd1234`.
4. Open `index.html`, find this line (in the contact section):

   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

   Replace `YOUR_FORM_ID` with your real ID, e.g. `action="https://formspree.io/f/abcd1234"`.
5. Done. Submissions now arrive in your inbox and show a success message on the page.

> Other drop-in options that use the same `action="..."` pattern: **Web3Forms**,
> **Getform**, or **Netlify Forms** (if you deploy on Netlify, add `netlify` to the
> `<form>` tag instead of a Formspree action).

---

## 2. Deploy (free hosting)

Pick any one — all serve the static files as-is:

### Option A — Netlify Drop (easiest, ~30 sec)
1. Go to **https://app.netlify.com/drop**
2. Drag the entire `portfolio` folder onto the page.
3. You get a live URL instantly (e.g. `mohit-yadav.netlify.app`).

### Option B — GitHub Pages
1. Create a repo, e.g. `ymohit65127/portfolio`.
2. Push these files to the `main` branch.
3. Repo **Settings → Pages → Source: main / root → Save**.
4. Live at `https://ymohit65127.github.io/portfolio/`.

### Option C — Vercel
`npm i -g vercel` then run `vercel` inside the folder, or import the GitHub repo at vercel.com.

---

## 3. Custom domain (e.g. mohityadav.dev)

1. **Buy a domain** from Namecheap, GoDaddy, Cloudflare, or Google Domains.
   Good options: `mohityadav.dev`, `mohityadav.in`, `mohit.codes`.

2. **Point it at your host:**

   **Netlify** → Site → *Domain management* → *Add custom domain* → enter your domain.
   Then at your registrar set the DNS records Netlify shows you:
   - Apex domain (`mohityadav.dev`): an `A` record → Netlify's load-balancer IP, **or** an `ALIAS`/`ANAME` to your Netlify subdomain.
   - `www`: a `CNAME` → `your-site.netlify.app`.

   **GitHub Pages** → repo *Settings → Pages → Custom domain* → enter your domain.
   At your registrar add:
   - Four `A` records for the apex → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` for `www` → `ymohit65127.github.io`
   - (A `CNAME` file is auto-committed to the repo.)

   **Vercel** → Project → *Settings → Domains* → add domain → follow the DNS instructions.

3. **Enable HTTPS** — all three providers issue a free SSL certificate automatically
   once DNS propagates (a few minutes to a couple of hours). Toggle *Enforce HTTPS*
   if available.

---

## Social preview image (Open Graph)

`og-image.png` (1200×630) is the card shown when your link is shared on LinkedIn,
WhatsApp, X/Twitter, Slack, etc. The meta tags are already in `index.html`.

**One required step after deploying:** social scrapers need an **absolute** URL.
Open `index.html` and replace the three `og-image.png` / `og:url` values with your
full address, e.g.:

```html
<meta property="og:url"   content="https://mohityadav.dev/" />
<meta property="og:image" content="https://mohityadav.dev/og-image.png" />
<meta name="twitter:image" content="https://mohityadav.dev/og-image.png" />
```

Then validate / refresh the cache with:
- LinkedIn → https://www.linkedin.com/post-inspector/
- X/Twitter → https://cards-dev.twitter.com/validator
- Facebook/WhatsApp → https://developers.facebook.com/tools/debug/

To regenerate the image, re-run the generator or just replace `og-image.png` with
any 1200×630 PNG.

---

## Customizing

- **Text / projects / experience** → edit `index.html`
- **Colors** → top of `styles.css` (`--brand`, `--brand-2`, `--brand-3`)
- **Rotating role text** → the `roles` array at the top of `script.js`
- **Resume file** → replace `Mohit_Yadav_Resume.pdf` (keep the same filename, or update the `href` in the two download buttons)
