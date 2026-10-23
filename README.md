# Envizon EV Solutions — homepage

The Envizon EV homepage is built on a motion-rich template, using plain HTML, CSS and JS with GSAP (ScrollTrigger and DrawSVG), Lenis and Embla. Its content, brand and structure follow `ENVIZON_EV_CLAUDE_MASTER_BLUEPRINT.md`, and the UX plan is in `docs/homepage-ux-plan.md`.

## Run

```bash
npm install
python -m venv .venv && .venv/Scripts/pip install beautifulsoup4 html5lib   # once, for the content step
npm run dev            # http://localhost:5173   (?review outlines PROPOSED copy, ?intro replays the preloader)
npm run content        # after editing content/: regenerate index.html, then commit it
npm run build          # vite build -> dist/ (no Python needed; strips the ?review markers)
npm run preview        # serve dist/
```

## How it's organised

| Path | Role |
|---|---|
| `content/homepage.json` | **All homepage copy**, with approval status per block |
| `content/icons.json` | Envizon line-icon set (solutions, applications, steps) |
| `tools/brand_envizon.py` | Renders the content into `index.html` on top of the frozen template (`tools/base/index.base.html`), phase by phase |
| `index.html` | Generated. Edit `content/` and re-run `npm run content`; don't hand-edit |
| `css/template.css` | Compiled template CSS (layout, type scale, motion classes), unchanged |
| `css/brand.css` | Envizon brand layer: token overrides, brand surfaces, the new sections |
| `js/*.js` | Behaviour: preloader, hero, reveals, carousel, case stack, footer, quote dialog, FAQ, anchors |
| `js/data/process.js` | The 5 "How it works" step diagrams (sequence-engine format) |
| `assets/brand/` | Logo set traced from `Envizon_EV_Logo_Final.jpg`, favicons, OG image |
| `docs/content-register.md` | What's proposed, blocked and placeholder, and what the client must supply |

## Deploy (Vercel)

Import the repo into Vercel and keep the defaults. `vercel.json` sets the framework (Vite), the install command (`npm ci`), the build command (`npm run build`) and the output directory (`dist/`). The build runs Vite only, so `index.html` has to be regenerated with `npm run content` and committed whenever `content/` changes.

| Concern | How it's handled |
|---|---|
| Domain | The canonical URL, `og:url` and the absolute `og:image` come from `SITE_URL` (e.g. `https://example.com`, set under Project → Settings → Environment Variables). If it isn't set, Vercel's production domain is used. |
| Caching | The hashed files under `/assets/*` are cached for a year as immutable. `index.html` revalidates on every request. |
| Headers | Every response gets `nosniff`, `SAMEORIGIN` framing and a strict referrer policy. The permissions policy allows geolocation, for the station locator, and nothing else. |
| Upload | `.vercelignore` leaves `reference/`, `docs/` and other authoring-only files out of the deployment. |

## Brand tooling

| Command | What it does |
|---|---|
| `npm run brand:logo` | Re-traces the logo JPG into SVGs and re-renders the favicons and OG image (use the official vector when supplied) |
| `npm run brand:art` | Regenerates the charger placeholder illustrations |

## QA

| Command | What it does |
|---|---|
| `npm run qa` | Runs the key journeys: nav anchors, FAQ, solution hover, the charger quote opening a pre-filled dialog, validation and the mock success state |
| `npm run qa:shots` | Takes screenshots at 1440/1024/768/390/320 (with the dev server running), reporting console errors, external requests and horizontal overflow |

## Not live yet

- The quote form is **mocked**: it validates and logs the payload, but sends nothing. Connect `POST /api/v1/leads` before launch.
- The hero media and charger images are placeholders.
- Contact channels, prices, model specs and the brochure are blocked until verified.

All of these are listed in `docs/content-register.md`.
