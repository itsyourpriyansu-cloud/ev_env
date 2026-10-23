// "How it works" process carousel — Embla carousel (loop, center, skipSnaps),
// 5s autoplay driven by the active dot's progress bar (pauses on pointer down),
// rolling 2-digit counter, and the animated step diagram panel (AnimatePresence "wait").
import EmblaCarousel from 'embla-carousel';
import { gsap, $, $$ } from './core.js';
import { spring, cubicBezier } from './lib/ease.js';
import { PROCESS_DIAGRAMS, MOBILE_VIEWBOX } from './data/process.js';
import site from './data/site.json';
import { applyInitial, playSequence } from './sequence.js';

const AUTOPLAY = 5; // seconds (feature.autoplayDuration)
const ORDER = site.processSteps;
const PANEL_BASE = 'p-center h-full w-full [&_svg]:size-full';
const PANEL_EXTRA = {};
const FADE = { duration: 0.3, ease: cubicBezier(0.25, 0.1, 0.35, 1) }; // Motion default opacity tween
const COMPACT = window.matchMedia('(max-width: 1023.98px)'); // below lg: zoom to the diagram's main panel

export function initFeature() {
  const section = $('[data-feature]');
  if (!section) return;
  const viewport = $('[data-embla]', section);
  const embla = EmblaCarousel(viewport, { loop: true, align: 'center', skipSnaps: true, inViewThreshold: 1 });

  initPanel(section, embla);
  initDots(section, embla);
  initCounter(section, embla);

  $('[data-prev]', section)?.addEventListener('click', () => embla.scrollPrev());
  $('[data-next]', section)?.addEventListener('click', () => embla.scrollNext());
  const region = viewport.closest('[data-slot="carousel"]') || viewport.parentElement;
  region.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); embla.scrollPrev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); embla.scrollNext(); }
  }, true);
}

// ---------------------------------------------------------------- infographic panel
function initPanel(section, embla) {
  const stage = $('[data-feature-stage]', section);
  const placeholder = $('[data-infographic]', stage);
  const anchor = $('[data-prev]', stage);
  placeholder.remove();
  let currentEl = null;
  let currentTl = null;
  let pending = null;

  const mount = (index) => {
    const key = ORDER[index];
    const el = document.createElement('div');
    el.className = `${PANEL_BASE} ${PANEL_EXTRA[key] || ''}`;
    el.dataset.infographic = key;
    el.style.opacity = '0';
    el.innerHTML = PROCESS_DIAGRAMS[key].svg;
    stage.insertBefore(el, anchor);
    const svg = el.querySelector('svg');
    if (COMPACT.matches && MOBILE_VIEWBOX[key]) svg.setAttribute('viewBox', MOBILE_VIEWBOX[key]);
    applyInitial(svg);
    gsap.to(el, { opacity: 1, ...FADE });
    currentTl = playSequence(svg, PROCESS_DIAGRAMS[key].sequence);
    currentEl = el;
  };

  const show = (index) => {
    pending = index;
    if (!currentEl) return mount(index);
    if (currentEl.dataset.leaving) return; // "wait" mode: the latest request mounts after exit
    const old = currentEl;
    old.dataset.leaving = '1';
    gsap.to(old, {
      opacity: 0, ...FADE,
      onComplete: () => {
        currentTl?.kill();
        old.remove();
        currentEl = null;
        mount(pending);
      },
    });
  };

  show(embla.selectedScrollSnap());
  embla.on('select', () => show(embla.selectedScrollSnap()));
}

// ---------------------------------------------------------------- indicators + autoplay
// One 5s progress state drives both indicator sets: the dots (phones) and the step list (md+).
function initDots(section, embla) {
  const dots = $$('[data-dot]', section);
  const steps = $$('[data-step]', section);
  let stepBar = null;
  const sp = spring(1.2, 0.2);
  const state = { p: 0 };
  let tween = null;
  let bar = null;
  let paused = false;

  const makeBar = (dot) => {
    const wrap = document.createElement('div');
    wrap.className = 'absolute inset-0 overflow-hidden rounded-[inherit]';
    const span = document.createElement('span');
    span.className = 'absolute inset-0 rounded-[inherit] will-change-transform bg-green-5';
    wrap.appendChild(span);
    dot.appendChild(wrap);
    return span;
  };
  const renderBar = () => {
    if (bar) bar.style.transform = `translateX(${(state.p - 1) * 100}%)`;
    if (stepBar) stepBar.style.transform = `scaleX(${state.p})`;
  };

  const run = () => {
    tween?.kill();
    if (paused) return;
    tween = gsap.to(state, {
      p: 1, duration: (1 - state.p) * AUTOPLAY, ease: 'none', onUpdate: renderBar,
      onComplete: () => { state.p = 0; renderBar(); embla.scrollNext(); },
    });
  };

  const select = () => {
    const idx = embla.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === idx;
      gsap.to(dot, { width: active ? 60 : 8, duration: sp.duration, ease: sp.ease, overwrite: true });
      if (!active) dot.replaceChildren();
    });
    dots[idx].replaceChildren();
    bar = makeBar(dots[idx]);
    steps.forEach((step, i) => {
      const active = i === idx;
      step.classList.toggle('is-active', active);
      if (active) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
      const fill = $('[data-step-progress]', step);
      if (!active && fill) fill.style.transform = 'scaleX(0)';
    });
    stepBar = steps[idx] ? $('[data-step-progress]', steps[idx]) : null;
    state.p = 0;
    renderBar();
    run();
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => embla.scrollTo(i)));
  steps.forEach((step, i) => step.addEventListener('click', () => embla.scrollTo(i)));
  embla.on('pointerDown', () => { paused = true; tween?.kill(); });
  embla.on('pointerUp', () => { paused = false; run(); });
  embla.on('select', select);
  select();
}

// ---------------------------------------------------------------- number-flow style counter
function initCounter(section, embla) {
  const el = $('[data-counter]', section);
  if (!el) return;
  el.textContent = '';
  el.style.display = 'inline-flex';
  const digits = [0, 1].map(() => {
    const mask = document.createElement('span');
    mask.style.cssText = 'display:inline-block;overflow:hidden;position:relative;height:1.15em;line-height:1.15em;vertical-align:top';
    const inner = document.createElement('span');
    inner.style.cssText = 'display:block';
    mask.appendChild(inner);
    el.appendChild(mask);
    return { mask, inner, value: null };
  });
  const sp = spring(0.9, 0);
  const set = (n, animate) => {
    const str = String(n).padStart(2, '0');
    digits.forEach((d, i) => {
      const ch = str[i];
      if (d.value === ch) return;
      const dir = d.value !== null && Number(ch) < Number(d.value) ? -1 : 1;
      d.value = ch;
      if (!animate) { d.inner.textContent = ch; return; }
      const next = document.createElement('span');
      next.style.cssText = 'display:block;position:absolute;left:0;top:0';
      next.textContent = ch;
      d.mask.appendChild(next);
      const old = d.inner;
      gsap.fromTo(next, { yPercent: 100 * dir }, { yPercent: 0, duration: sp.duration, ease: sp.ease });
      gsap.to(old, { yPercent: -100 * dir, duration: sp.duration, ease: sp.ease, onComplete: () => {
        old.remove(); next.style.position = ''; d.inner = next;
      } });
    });
  };
  set(embla.selectedScrollSnap() + 1, false);
  embla.on('select', () => set(embla.selectedScrollSnap() + 1, true));
}
