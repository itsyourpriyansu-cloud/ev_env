// Footer behaviours:
//  - "Our Solutions" rotator: 5s linear progress in the active dot, auto-advance while in view,
//    hover a title/dot to switch (pauses autoplay on non-touch), icon + subtitle cross-fade
//  - brand banner: tagline rotator (3s, fadeSlideReveal) over a background EV-charging loop (plays in view only)
//  - --l-dynamic-hr-width for the reversed hr
import { gsap, $, $$, inView, isTouch, autoplayInView } from './core.js';
import { EASE, spring } from './lib/ease.js';
import site from './data/site.json';
import icons from '../content/icons.json';

const SOLUTIONS = site.solutions.map((s) => ({ ...s, href: '#solutions' }));
const solutionIcon = (name) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full" aria-hidden="true">${icons.solution[name]}</svg>`;
const MUTED = 'rgb(from var(--color-foreground-muted) r g b / 0.3)';
const FULL = 'rgb(from var(--color-foreground-muted) r g b / 1)';

export function initFooter() {
  const footer = $('[data-footer]');
  if (!footer) return;
  initSolutionsRotator(footer);
  initBanner(footer);
  initDynamicHr(footer);
}

function initSolutionsRotator(footer) {
  const root = $('[data-footer-solutions]', footer);
  if (!root) return;
  const grid = root.children[1];
  const iconLink = $(':scope > a', grid);
  const iconBox = $(':scope > div', iconLink);
  const titles = $$(':scope > div.flex-col > a', grid);
  const dots = $$(':scope > div.flex > button', grid);
  const subBox = $(':scope > div.grid', grid);
  const sp = spring(1, 0.3); // dotButtonMorphAnim
  const sp0 = spring(1, 0);
  const iconsHtml = SOLUTIONS.map((s) => solutionIcon(s.icon));

  let index = 0;
  let hovered = null;
  let visible = false;
  const prog = { x: 0 };
  let tween = null;
  let bar = null;

  // normalise the captured state
  let subtitle = subBox.lastElementChild;
  gsap.set(subtitle, { opacity: 1, filter: 'blur(0px)' });
  iconBox.style.position = 'relative';
  let currentIcon = iconBox.firstElementChild;

  const renderBar = () => bar && (bar.style.transform = `translateX(${(prog.x - 1) * 100}%)`);

  const renderTitles = () => {
    titles.forEach((t, i) => {
      const active = hovered !== null ? i === hovered : i === index;
      gsap.to(t, { color: active ? FULL : MUTED, ...(i === index ? { duration: sp.duration, ease: sp.ease } : { duration: 0.2, ease: EASE.easeInOut }), overwrite: true });
    });
  };

  const render = (animate = true) => {
    const s = SOLUTIONS[index];
    renderTitles();
    dots.forEach((d, i) => {
      const active = i === index;
      gsap.to(d, { backgroundColor: active ? FULL : MUTED, width: active ? 32 : 8, duration: animate ? sp.duration : 0, ease: sp.ease, overwrite: true });
      d.replaceChildren();
    });
    const wrap = document.createElement('div');
    wrap.className = 'absolute inset-0 overflow-hidden rounded-[inherit]';
    bar = document.createElement('span');
    bar.className = 'absolute inset-0 rounded-[inherit] will-change-transform bg-green-3';
    wrap.appendChild(bar);
    dots[index].appendChild(wrap);
    renderBar();

    // icon: background colour morph + popLayout icon swap
    iconLink.href = s.href;
    iconLink.setAttribute('aria-label', 'Show solution: ' + s.title);
    gsap.to(iconBox, { backgroundColor: s.color, duration: animate ? sp0.duration : 0, ease: sp0.ease, overwrite: true });
    const oldIcon = currentIcon;
    const nextIcon = document.createElement('div');
    nextIcon.className = 'flex size-full items-center justify-center';
    nextIcon.innerHTML = iconsHtml[index] || '';
    const svg = nextIcon.firstElementChild;
    if (svg) svg.setAttribute('class', (svg.getAttribute('class') || '').replace(/\bsize-\S+/g, '') + ' h-full w-full');
    // icons still fading out from earlier (fast hovering) are dropped, so only one ever sits in the layout flow
    [...iconBox.children].forEach((c) => { if (c !== oldIcon) { gsap.killTweensOf(c); c.remove(); } });
    if (animate && oldIcon) {
      gsap.killTweensOf(oldIcon);
      Object.assign(oldIcon.style, { position: 'absolute', inset: '0', padding: 'inherit' });
      gsap.to(oldIcon, { opacity: 0, filter: 'blur(2px)', scale: 0.8, duration: sp0.duration, ease: sp0.ease, onComplete: () => oldIcon.remove() });
      iconBox.appendChild(nextIcon);
      gsap.fromTo(nextIcon, { opacity: 0, filter: 'blur(2px)', scale: 0.8 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: sp0.duration, ease: sp0.ease });
    } else {
      iconBox.replaceChildren(nextIcon);
    }
    currentIcon = nextIcon;

    // subtitle: fadeBlur popLayout
    if (animate) {
      const old = subtitle;
      // drop subtitles still fading from earlier switches (the invisible ones only reserve height)
      $$(':scope > p:not(.invisible)', subBox).forEach((p) => { if (p !== old) { gsap.killTweensOf(p); p.remove(); } });
      gsap.killTweensOf(old);
      const next = old.cloneNode(false);
      next.textContent = s.subtitle;
      subBox.appendChild(next);
      gsap.to(old, { opacity: 0, filter: 'blur(2px)', duration: sp0.duration, ease: sp0.ease, onComplete: () => old.remove() });
      gsap.fromTo(next, { opacity: 0, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0px)', duration: sp0.duration, ease: sp0.ease });
      subtitle = next;
    }
  };

  const run = () => {
    tween?.kill();
    const pausedByHover = !isTouch && hovered !== null;
    if (!visible || pausedByHover) return;
    tween = gsap.to(prog, {
      x: 1, duration: (1 - prog.x) * 5, ease: 'none', onUpdate: renderBar,
      onComplete: () => { prog.x = 0; go((index + 1) % SOLUTIONS.length); },
    });
  };

  const go = (i, force = false) => {
    if (i === index && !force) return run();
    tween?.kill();
    prog.x = 0;
    index = i;
    render(true);
    run();
  };

  const hoverStart = (i) => {
    if (i !== index) go(i);
    hovered = i;
    renderTitles();
    if (!isTouch) tween?.kill();
  };
  const hoverEnd = () => { hovered = null; renderTitles(); run(); };
  [...titles, ...dots].forEach((el, n) => {
    const i = n % SOLUTIONS.length;
    el.addEventListener('mouseenter', () => hoverStart(i));
    el.addEventListener('mouseleave', hoverEnd);
  });
  dots.forEach((d, i) => d.addEventListener('click', () => go(i, true)));

  render(false);
  inView(root, () => { visible = true; run(); });
}

function initBanner(footer) {
  const banner = $('[data-footer-banner]', footer);
  if (!banner) return;

  // tagline rotator: every 3s while in view (margin -50px), fadeSlideReveal enter/exit
  const box = $('.relative.grid.overflow-hidden', banner);
  const texts = $$('p.invisible', box).map((p) => p.textContent);
  let current = box.querySelector('p:not(.invisible)');
  let idx = 0;
  let timer = null;
  const swap = () => {
    idx = (idx + 1) % texts.length;
    const old = current;
    const next = old.cloneNode(false);
    next.textContent = texts[idx];
    box.appendChild(next);
    gsap.to(old, { yPercent: -100, duration: 1, ease: EASE.reveal });
    gsap.to(old, { opacity: 0, duration: 0.6, ease: EASE.easeInOut, onComplete: () => old.remove() });
    gsap.fromTo(next, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: EASE.reveal });
    gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4, ease: EASE.easeInOut });
    current = next;
  };
  inView(box, (v) => {
    clearInterval(timer);
    if (v) timer = setInterval(swap, 3000);
  }, { margin: '0px 0px -50px 0px', once: false });

  autoplayInView($('[data-footer-video]', banner), '100px 0px');
}

function initDynamicHr(footer) {
  const hr = $('[data-dynamic-hr]', footer);
  const banner = $('[data-footer-banner]', footer);
  const footnote = footer.lastElementChild;
  if (!hr || !banner || !footnote) return;
  const set = () => hr.style.setProperty('--l-dynamic-hr-width', `${footnote.offsetWidth - banner.offsetWidth}px`);
  set();
  const ro = new ResizeObserver(set);
  ro.observe(banner);
  ro.observe(footnote);
}
