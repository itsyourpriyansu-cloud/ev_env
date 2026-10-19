// Shared GSAP setup, flags and small helpers used by every module.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export { gsap, ScrollTrigger };

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => window.innerWidth < 768;

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Motion's IN_VIEW_CONFIG = { margin: "0px 0px -20% 0px", once: true } */
export const IN_VIEW_START = 'top 80%';

/** IntersectionObserver helper mirroring Motion's useInView */
export function inView(el, cb, { margin = '0px 0px -20% 0px', once = true } = {}) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          cb(true);
          if (once) io.disconnect();
        } else if (!once) cb(false);
      }
    },
    { rootMargin: margin }
  );
  io.observe(el);
  return () => io.disconnect();
}

// ---- intro state (replaces the redux `isIntroComplete` flag) ---------------------
let introDone = false;
const introListeners = [];
export function onIntroComplete(fn) {
  introDone ? fn() : introListeners.push(fn);
}
export function completeIntro() {
  if (introDone) return;
  introDone = true;
  introListeners.splice(0).forEach((fn) => fn());
}
