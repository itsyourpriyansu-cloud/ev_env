// Lenis smooth scroll — same setup as the live site:
// <ReactLenis root options={{ autoRaf: false }} /> driven by gsap.ticker.
// Low-power devices keep native wheel scrolling (compositor-driven, so it stays smooth even when
// the main thread is busy); Lenis still runs for programmatic scrolls (anchors, dialogs).
import Lenis from 'lenis';
import { gsap, ScrollTrigger, lowPower } from './core.js';

export function initLenis() {
  const lenis = new Lenis({ autoRaf: false, smoothWheel: !lowPower });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
  return lenis;
}
