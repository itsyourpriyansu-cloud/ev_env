// Intro preloader — exact port of the live component:
//  logo scale 1->.4 & opacity 1->0  (delay 1.5s, 2s, ease [.87,0,.13,1])
//  progress r 0->1                   (delay 2s, 1.5s, ease [.5,0,.05,1])
//    -> green layer scale = r, curtain clip-path hole grows from r
//  onComplete at 3.2s
// The live site remembers completion (server action `completeIntro` sets a cookie);
// we mirror that per browser session. Add ?intro to the URL to force a replay.
import { gsap, completeIntro } from './core.js';
import { EASE } from './lib/ease.js';
import { markSVG } from './brand-mark.js';

const KEY = 'envizon:introComplete';

function curtain(r) {
  const n = r < 0.5 ? (r / 8) * 100 : (0.5 / 8) * 100 + (r - 0.5) * (200 - (0.5 / 8) * 100);
  const a = (100 - n) / 2;
  const b = 100 - a;
  return `polygon(0% 0%, 0% 100%, ${a}% 100%, ${a}% ${a}%, ${b}% ${a}%, ${b}% ${b}%, ${a}% ${b}%, ${a}% 100%, 100% 100%, 100% 0%)`;
}

export function shouldShowIntro() {
  const force = new URLSearchParams(location.search).has('intro');
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
  return force || !seen;
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
  gsap.to(logo, { scale: 0.4, opacity: 0, delay: 1.5, duration: 2, ease: EASE.preloaderLogo });
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
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    completeIntro();
  });
}
