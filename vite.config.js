import { defineConfig } from 'vite';

// Public origin for absolute social/canonical URLs: SITE_URL if set, else the Vercel production domain.
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '');

// Production HTML: drop review-only status markers and make share metadata absolute.
// Runs on the emitted index.html so asset URLs are already hashed.
function productionHtml() {
  return {
    name: 'envizon:production-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const page = bundle['index.html'];
      if (!page || page.type !== 'asset') return;
      let html = String(page.source).replace(/\s+data-status="[^"]*"/g, '');
      if (SITE_URL) {
        html = html
          .replace(/<meta[^>]*property="og:image"[^>]*>/, (tag) => tag.replace(/content="\/?/, `content="${SITE_URL}/`))
          .replace(
            '</head>',
            `<link rel="canonical" href="${SITE_URL}/"><meta property="og:url" content="${SITE_URL}/">` +
              '<meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"></head>',
          );
      }
      page.source = html;
    },
  };
}

export default defineConfig({
  plugins: [productionHtml()],
  server: { port: 5173, open: false },
  build: {
    // keep the compiled Tailwind v4 CSS byte-for-byte (modern syntax like rgb(from …))
    cssMinify: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 800, // gsap + lenis + embla + lottie in one bundle is expected
  },
});
