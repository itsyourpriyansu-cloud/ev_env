// Intro preloader — port of the live component, Envizon variant:
//  logo scale 1->.4 & opacity 1->0  (delay 1.3s, 1.1s, ease [.87,0,.13,1]) — fully gone before the
//    curtain hole is big enough to show, so the hole never cuts through a half-visible logo
//  progress r 0->1                   (delay 2s, 1.5s, ease [.5,0,.05,1])
//    -> green layer scale = r, curtain clip-path hole grows from r (both oval for Envizon)
//  onComplete at 3.2s
// Plays on every page load (client request 2026-10-23); reduced-motion users skip it.
import { gsap, completeIntro, reducedMotion } from './core.js';
import { EASE } from './lib/ease.js';
import { markSVG } from './brand-mark.js';

// Hole size n (% of the viewport) for progress r: the original two-speed curve
// (slow to 6.25% over the first half, then fast to ~103%).
function holeSize(r) {
  return r < 0.5 ? (r / 8) * 100 : (0.5 / 8) * 100 + (r - 0.5) * (200 - (0.5 / 8) * 100);
}

// Oval curtain: the viewport minus a centred ellipse (even-odd). Radii are scaled by sqrt(2)
// so that at n = 100% the ellipse passes exactly through the viewport corners.
function curtain(r) {
  const W = window.innerWidth, H = window.innerHeight;
  const k = (holeSize(r) / 100) * Math.SQRT1_2;
  const rx = W * k, ry = H * k, cx = W / 2, cy = H / 2;
  return `path(evenodd, "M0 0H${W}V${H}H0Z M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z")`;
}

// The green layer grows as a concentric oval (it covers the viewport at scale 1).
function shapeFill(fill) {
  const W = window.innerWidth, H = window.innerHeight;
  Object.assign(fill.style, {
    inset: 'auto', left: '50%', top: '50%',
    width: `${W * Math.SQRT2}px`, height: `${H * Math.SQRT2}px`,
    translate: '-50% -50%', borderRadius: '50%',
  });
}

export function shouldShowIntro() {
  return !reducedMotion;
}

export function runPreloader({ lenis, show }) {
  const el = document.getElementById('preloader');
  const html = document.documentElement;
  if (!show) {
    el?.remove();
    html.classList.remove('overflow-hidden');
    completeIntro();
    return;
  }
  lenis.stop();
  window.scrollTo(0, 0);

  const clip = document.getElementById('preloader-clip');
  const fill = document.getElementById('preloader-fill');
  const logo = document.getElementById('preloader-logo');
  const lottieBox = document.getElementById('preloader-lottie');
  shapeFill(fill);

  // Envizon mark: outline draws in (0 -> 0.9s), gradient fill + letters fade up (0.6 -> 1.2s),
  // then the original shrink/fade (delay 1.5s) and curtain take over.
  lottieBox.innerHTML = markSVG({ mode: 'both', stroke: '#d6f1db', strokeWidth: 3, className: 'block', style: 'width:62%;height:auto' });
  lottieBox.style.cssText = 'display:flex;align-items:center;justify-content:center;aspect-ratio:1/1';
  const draws = lottieBox.querySelectorAll('[data-draw]');
  const markFill = lottieBox.querySelector('[data-mark-fill]');
  gsap.set(markFill, { opacity: 0 });
  gsap.fromTo(draws, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: EASE.easeInOut, stagger: 0.12 });
  gsap.to(markFill, { opacity: 1, duration: 0.6, delay: 0.6, ease: EASE.easeOut });
  gsap.to(lottieBox.querySelector('[data-mark-outline]'), { opacity: 0, duration: 0.4, delay: 1.0, ease: EASE.easeOut });

  const state = { r: 0 };
  gsap.to(logo, { scale: 0.4, opacity: 0, delay: 1.3, duration: 1.1, ease: EASE.preloaderLogo });
  gsap.to(state, {
    r: 1,
    delay: 2,
    duration: 1.5,
    ease: EASE.preloaderCurtain,
    onUpdate: () => {
      clip.style.clipPath = curtain(state.r);
      fill.style.transform = `scale(${state.r})`;
    },
  });

  gsap.delayedCall(3.2, () => {
    el.remove();
    html.classList.remove('overflow-hidden');
    lenis.start();
    completeIntro();
  });
}
