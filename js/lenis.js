// Lenis smooth scroll — same setup as the live site:
// <ReactLenis root options={{ autoRaf: false }} /> driven by gsap.ticker
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './core.js';

export function initLenis() {
  const lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
  return lenis;
}
