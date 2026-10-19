# Cofactr homepage clone (internal use only)

A static rebuild of https://www.cofactr.com (homepage). It uses plain HTML, CSS and JS, plus GSAP (with ScrollTrigger and DrawSVG), Lenis, Embla and lottie-web.
Do not deploy it publicly. The copy, media and branding belong to Cofactr.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve dist/ on http://localhost:4173
```

The preloader plays once per browser session, as on the live site. Add `?intro` to the URL to replay it: `http://localhost:5173/?intro`.

## How it was built

- **Markup.** `index.html` is generated from the live site's hydrated DOM. It was captured during the preloader, so every element still has its exact start state. The class names stay identical, so the site's own compiled Tailwind CSS (`css/cofactr.css`) lays everything out exactly as on the live site.
  - Regenerate with: `<python with bs4+html5lib> tools/build_html.py`
- **Fonts.** Inter is the same file the original uses. Antique Legacy (licensed) is replaced by static Inter Tight instances. They were matched by stroke weight and character width (`tools/fontweight.mjs`), and the vertical metrics were overridden to match. See `css/fonts.css`.
- **Motion.** Every animation was ported from the live JavaScript bundles with the same durations, easing curves, springs, delays and trigger offsets:

| File | What it does |
|---|---|
| `js/preloader.js` | Lottie mark, curtain clip-path and green fill (3.2s) |
| `js/hero.js` | The three intro sequences |
| `js/header.js` | Slide-in, dropdown nav, mobile menu with accordion |
| `js/reveal.js` | In-view reveals (fadeMove, fade and stagger groups, footer line draws) |
| `js/scroll-text.js` | Word-by-word heading reveal |
| `js/marquee.js` | Logo marquee (react-fast-marquee maths, 50px/s) |
| `js/solutions.js` | Card hover: lift, "Learn More", animated large icon |
| `js/feature.js` + `js/sequence.js` | Embla carousel, 5s autoplay progress dots, rolling counter, the 4 infographics |
| `js/cases.js` | Sticky case-study stack, scroll-linked dimming, scroll-drawn logo |
| `js/closing.js` | Looping octagons |
| `js/footer.js` | Solutions rotator, tagline rotator, banner Lottie, dynamic divider |
| `js/contact.js` | `#contact` dialog, validation, select, draft autosave |
| `js/lenis.js` | Lenis driven by `gsap.ticker`, like the original |

- **Generated data.** `js/data/infographics.js` and `js/data/animated-icons.js` are extracted from the live bundle by static parsing (`tools/extract-*.mjs`). Don't edit them by hand.
- **Assets.** All assets are local in `assets/`. The 52 MB hero video was re-encoded to 9.6 MB (1920 px) and 2.8 MB (960 px, served at ≤640px).

## Verification tools

All of these drive your installed Chrome through `playwright-core`.

| Command | What it does |
|---|---|
| `node tools/capture.mjs [dom\|mobile\|shots\|intro]` | Capture the live site into `reference/` |
| `node tools/shoot.mjs <url> 1440,1024,768,390` | Clone screenshots, plus console errors and external requests |
| `node tools/diff.mjs [width]` | Pixel diff, live vs clone (`reference/diff/`) |
| `node tools/shoot-feature.mjs`, `tools/interactions.mjs`, `tools/mobile-menu.mjs`, `tools/record-intro.mjs` | Side-by-side checks of specific interactions |

## Known differences

- The headline font is a close open-source substitute, not Antique Legacy itself.
- The contact form is **mocked**. It validates like the original (required fields, business email, phone format), logs the payload to the console and shows the success message. Nothing is sent. The original posts to Cofactr's Salesforce endpoint.
- Links to other pages (Products, Solutions and so on) open the live cofactr.com pages in a new tab. Only the homepage is cloned.
- The cookie banner, Google Analytics and Sanity live-preview are intentionally omitted.
# ev_env  
