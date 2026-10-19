import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5173, open: false },
  build: {
    // keep the compiled Tailwind v4 CSS byte-for-byte (modern syntax like rgb(from …))
    cssMinify: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 800, // gsap + lenis + embla + lottie in one bundle is expected
  },
});
