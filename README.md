# Hardik Mody - Portfolio

Static personal site. No frameworks, no build step, no dependencies. Five files.

| File | What it's for |
|---|---|
| `data.js` | **All content lives here.** The only file you normally edit. |
| `index.html` | Page shell / section containers |
| `styles.css` | Design system, animations, transitions, light+dark themes |
| `app.js` | Renders `data.js` into the page, handles interactions |
| `avatar.jpg` | Hero portrait, 640x640 square |

## Preview locally

```bash
cd ~/Desktop/HardikModyPortfolio
python3 -m http.server 8899
# open http://127.0.0.1:8899
```

(Opening `index.html` directly via `file://` also works.)

## Deploy to GitHub Pages

One-time setup:

```bash
cd ~/Desktop/HardikModyPortfolio
git init -b main
git add .
git commit -m "Portfolio site"
git remote add origin https://github.com/HardikMody22/HardikMody22.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `root` → Save.**

Live at **https://HardikMody22.github.io** in about a minute.

> Using a repo named `HardikMody22.github.io` gives you the clean root URL. Any other
> repo name works too, it just serves at `https://HardikMody22.github.io/<repo-name>/`.
> All asset paths are relative, so both work with no changes.

## Updating content

Every future update is the same three commands:

```bash
# edit data.js
git commit -am "Update profile"
git push
```

Pages redeploys automatically.

## About LinkedIn "auto-sync"

Worth being straight with you: **this can't be fully automated.** LinkedIn has no
public profile API and actively blocks automated reads (scrapers get HTTP 999).
Anything that claims to auto-mirror a LinkedIn profile is either using your
logged-in session or violating their Terms of Service, and it breaks constantly.

So `data.js` is the sync point. It's structured to mirror LinkedIn's own layout
(experience grouped by company with nested roles, skills grouped by category),
which makes mirroring a change mechanical, find the section, edit the text, push.

If you'd rather not hand-edit, a practical middle ground: export your profile PDF
from LinkedIn periodically and ask Kiro to update `data.js` from it. That keeps you
compliant and takes about a minute.

## What's in the UI

- Animated aurora background + cursor spotlight
- Scroll progress bar, sticky nav with active-section highlighting
- Scroll-reveal transitions on every section
- Count-up hero stats
- Experience timeline grouped by company
- Filterable skills (7 categories, 67 skills)
- Collapsible certifications list (25)
- Light / dark theme toggle, remembered in `localStorage`
- Responsive, and fully respects `prefers-reduced-motion`
