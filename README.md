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

## 1. Contact form — Google Sheet log + email (free)

The form POSTs to a **Google Apps Script web app** bound to a Google Sheet.
Every submission is appended as a row in the sheet (your log) and emailed to
`ymohit65127@gmail.com`. No third-party form service, no monthly cap
(Gmail allows ~100 emails/day from a free account).

Until the script URL is set, the form falls back to opening the visitor's
email app with the message pre-filled.

### Setup (one time, ~10 minutes)

1. Create a new Google Sheet (https://sheets.new) while logged in as
   `ymohit65127@gmail.com`. Name it e.g. **Portfolio Contact Submissions**.
2. In the sheet: **Extensions → Apps Script**. Delete the default code and paste
   the contents of [`apps-script/Code.gs`](apps-script/Code.gs). Save.
3. **Deploy → New deployment → ⚙ Select type → Web app**
   - Description: `portfolio contact`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, then **Authorize access** and allow the permissions
     (Sheets + send email as you). If Google shows "unverified app", click
     *Advanced → Go to project (unsafe)* — it's your own script.
4. Copy the **Web app URL** (ends in `/exec`).
5. In `index.html`, replace `YOUR_SCRIPT_URL` in the form's `action` with that URL.
6. Commit & push. Test the live form; a row should appear in the sheet and an
   email should land in your inbox within a few seconds.

> **Updating the script later:** after editing `Code.gs`, use
> **Deploy → Manage deployments → ✎ Edit → Version: New version → Deploy**.
> The `/exec` URL stays the same.

### Spam protection
A hidden honeypot field (`_gotcha`) is dropped server-side if filled.

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
