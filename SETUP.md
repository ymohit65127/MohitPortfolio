# Setup & Requirements — Mohit Yadav Portfolio

Everything needed to **clone, run, and continue** this project on a new machine —
including continuing the work with **Claude Code**.

This is a **static website** — plain HTML, CSS, and JavaScript.
There is **no build step, no framework, and no `npm install`.** That keeps the
requirements minimal.

---

## 1. What this project is

| | |
|---|---|
| Type | Static single-page portfolio website |
| Stack | HTML5 + CSS3 + vanilla JavaScript (no framework) |
| Dependencies | **None** (Google Fonts loaded via CDN at runtime) |
| Build tools | **None required** |
| Repo | https://github.com/ymohit65127/MohitPortfolio |

### Files in the repo
```
index.html               # all page content & structure
styles.css               # all styling (theme tokens at the top)
script.js                # interactions: theme, typing, reveals, form, counters
og-image.png             # 1200x630 social-share preview card
Mohit_Yadav_Resume.pdf   # served by the Download CV / Resume buttons
README.md                # features, form setup, deploy & custom-domain guide
PENDING_UPDATES.md       # roadmap / TODO list (what's left to do)
SETUP.md                 # this file
.gitattributes           # keeps PDF/PNG treated as binary
```

---

## 2. Required software on the new machine

### Minimum (just to view the site)
- **Any modern web browser** — Chrome, Edge, Firefox, etc.
  You can literally double-click `index.html` to open it. That's it.

### Recommended (to develop / preview properly)
- **Git** — to clone and push changes. https://git-scm.com/downloads
- **A code editor** — [VS Code](https://code.visualstudio.com/) recommended.
- **A local static web server** (pick ONE you already have — needed so the
  contact-form fetch, fonts, and PDF load exactly like in production):
  - **PHP** (any 7.x/8.x): `php -S localhost:8000`
  - **Python 3**: `python -m http.server 8000`
  - **Node.js**: `npx serve` or `npx http-server`
  - **VS Code**: the **Live Server** extension (right-click `index.html` → Open with Live Server)

> You only need ONE of the above servers. Opening `index.html` directly works too,
> but a local server matches production behaviour best.

### To continue the work with Claude Code
- **Claude Code** installed and logged in on the new machine.
  - Install / docs: https://docs.claude.com/claude-code
  - After install, run `claude` in the project folder and log in when prompted.
  - No project-specific API keys or `.env` files are required for this site.

---

## 3. Clone & run (step by step)

```bash
# 1. Clone
git clone https://github.com/ymohit65127/MohitPortfolio.git
cd MohitPortfolio

# 2. Run locally (choose one)
php -S localhost:8000
#   or
python -m http.server 8000
#   or
npx serve

# 3. Open in browser
#   http://localhost:8000
```

To just preview without a server: open `index.html` by double-clicking it.

---

## 4. Continue working with Claude on the new machine

1. Open the cloned `MohitPortfolio` folder in Claude Code (`claude` in that folder).
2. Ask Claude to read the context files:
   > "Read README.md, SETUP.md and PENDING_UPDATES.md, then summarise what's done
   > and what's pending."
3. Start with the **🔴 Required** items in `PENDING_UPDATES.md`
   (activate contact form, set absolute OG URLs, enable GitHub Pages).
4. Commit & push as usual:
   ```bash
   git add -A
   git commit -m "your message"
   git push
   ```

> **Git auth note:** the first `git push` on a new machine will ask you to
> authenticate to GitHub (browser login via Git Credential Manager, or a
> Personal Access Token). Use the GitHub account **ymohit65127**.

---

## 5. Deploy (summary — full steps in README.md)

| Host | How | Result URL |
|------|-----|-----------|
| **GitHub Pages** | Repo → Settings → Pages → branch `main` / root | `https://ymohit65127.github.io/MohitPortfolio/` |
| **Netlify** | Drag folder to app.netlify.com/drop, or connect repo | `*.netlify.app` |
| **Vercel** | `vercel` in folder, or import repo at vercel.com | `*.vercel.app` |

---

## 6. Editing cheat-sheet

| Want to change... | Edit... |
|---|---|
| Text, projects, experience | `index.html` |
| Colors / theme | top of `styles.css` (`--brand`, `--brand-2`, `--brand-3`) |
| Rotating role text in hero | `roles` array at top of `script.js` |
| Resume file | replace `Mohit_Yadav_Resume.pdf` (same filename) |
| Social preview image | replace `og-image.png` (keep 1200×630) |

---

## 7. Known config note

The original development machine had a helper file at
`C:\xampp\htdocs\realestate\.claude\launch.json` used only to preview this site
locally. It is **NOT part of this repo** and is **not needed** to run the project.
Ignore it on the new machine.
