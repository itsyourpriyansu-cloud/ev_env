// Hero ("heroOne") intro — port of the three Motion sequences on the live site.
// delay = useIntroDelay(): 2.5s + 0.3s page-fade if the preloader is running, else 0.3s.
// Plays on every page load, together with the preloader (reduced motion shows the final state).
import { gsap, $, $$, reducedMotion } from './core.js';
import { EASE } from './lib/ease.js';
import { markSVG } from './brand-mark.js';

const b = { duration: 1.5, ease: EASE.circOut }; // y
const w = { duration: 0.9, ease: EASE.easeOut }; // opacity

export function initHero({ introRunning }) {
  const hero = $('[data-hero]');
  if (!hero) return;
  const media = $('[data-hero-media]', hero);
  const logo = $('[data-hero-logo]', hero);
  const line = $('[data-hero-line]', hero);
  const cta = $('[data-hero-cta]', hero);
  const part = (name) => $$(`[data-hero-part="${name}"]`, hero);

  // background video
  const video = $('[data-hero-video]', hero);
  if (video) {
    const loaded = () => video.classList.add('is-loaded');
    video.addEventListener('playing', loaded, { once: true });
    video.muted = true;
    video.play?.().catch(() => {});
  }

  // branded media placeholder: large Envizon outline mark (drawn with the intro)
  const art = $('[data-hero-art]', hero);
  const artPaths = [];
  if (art) {
    art.innerHTML = markSVG({ mode: 'outline', letters: true, stroke: 'currentColor', strokeWidth: 1.5, style: 'width:100%;height:auto;display:block' });
    artPaths.push(...art.querySelectorAll('[data-draw]'));
  }

  if (reducedMotion) {
    gsap.set(media, { scale: 1 });
    gsap.set([logo, cta], { scale: 1 });
    gsap.set($$('[data-hero-part]', hero), { y: '0%', opacity: 1 });
    if (line) gsap.set(line, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });
    if (artPaths.length) gsap.set(artPaths, { drawSVG: '100%' });
    return;
  }

  const delay = (introRunning ? 2.5 : 0) + 0.3;

  // sequence 1
  const s1 = gsap.timeline({ delay });
  s1.fromTo(media, { scale: 1.1 }, { scale: 1, duration: 1.2, ease: EASE.circOut }, 0)
    .fromTo(logo, { scale: 0 }, { scale: 1, duration: 0.9, ease: EASE.backOut }, 0)
    .fromTo(part('titleLeft'), { y: '100%' }, { y: '0%', ...b }, 0.3)
    .fromTo(part('titleLeft'), { opacity: 0 }, { opacity: 1, ...w }, 0.3)
    .fromTo(part('titleRight'), { y: '100%' }, { y: '0%', ...b }, 0.6)
    .fromTo(part('titleRight'), { opacity: 0 }, { opacity: 1, ...w }, 0.6);

  // sequence 2 — horizontal line draw (the divider is optional; Envizon's hero has none)
  if (line) gsap.fromTo(line,
    { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 2.1, ease: EASE.circInOut, delay });

  if (artPaths.length) gsap.fromTo(artPaths, { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.6, ease: EASE.preloaderLogo, stagger: 0.35, delay });

  // sequence 3
  const s3 = gsap.timeline({ delay });
  s3.fromTo(part('descriptionLeft'), { y: '-100%' }, { y: '0%', ...b }, 0.3)
    .fromTo(part('descriptionLeft'), { opacity: 0 }, { opacity: 1, ...w }, 0.3)
    .fromTo(part('descriptionCenter'), { y: '-100%' }, { y: '0%', ...b }, 0.6)
    .fromTo(part('descriptionCenter'), { opacity: 0 }, { opacity: 1, ...w }, 0.6)
    .fromTo(part('descriptionRight'), { y: '-100%' }, { y: '0%', ...b }, 0.9)
    .fromTo(part('descriptionRight'), { opacity: 0 }, { opacity: 1, ...w }, 0.9)
    .fromTo(cta, { scale: 0 }, { scale: 1, duration: 1.2, ease: EASE.backOut }, 0.9);
}
