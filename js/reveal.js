// In-view reveal system — replaces Motion's whileInView variants.
// Elements keep the exact initial inline state captured from the live DOM;
// each group below mirrors a Motion stagger container from the original source.
import { gsap, ScrollTrigger, $, $$, IN_VIEW_START, isMobile, reducedMotion } from './core.js';
import { EASE } from './lib/ease.js';

const done = new WeakSet();

/** Pick the Motion variant from the element's initial inline style */
function tweenFor(el, delay = 0, override = {}) {
  if (done.has(el)) return;
  done.add(el);
  const s = el.getAttribute('style') || '';
  if (reducedMotion) {
    gsap.set(el, { opacity: 1, y: 0, filter: 'none', clearProps: 'transform' });
    return;
  }
  if (/translateY\(25px\)/.test(s)) {
    // fadeMoveAnim: y 25 -> 0, opacity 0 -> 1, 1s cubic-bezier(.1,.1,.1,1)
    gsap.fromTo(el, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: EASE.fadeMove, delay, ...override });
  } else if (/blur\(2px\)/.test(s)) {
    gsap.fromTo(el, { opacity: 0, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: EASE.easeOut, delay, ...override });
  } else if (/opacity:\s*0/.test(s)) {
    // fadeAnim: opacity, 0.2s
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: EASE.easeOut, delay, ...override });
  }
}

const hidden = (el) => /opacity:\s*0/.test(el.getAttribute('style') || '');

function group(container, kids, { delayChildren = 0.2, stagger = 0.1, start = IN_VIEW_START, override } = {}) {
  if (!container) return;
  kids = kids.filter(Boolean);
  kids.forEach((k) => done.has(k) || k.setAttribute('data-reveal-pending', ''));
  ScrollTrigger.create({
    trigger: container,
    start,
    once: true,
    onEnter: () => kids.forEach((k, i) => tweenFor(k, delayChildren + i * stagger, override)),
  });
}

function single(el, opts = {}) {
  if (!el) return;
  ScrollTrigger.create({ trigger: el, start: opts.start || IN_VIEW_START, once: true, onEnter: () => tweenFor(el, opts.delay || 0, opts.override) });
}

const descendantsHidden = (root) => $$('[style]', root).filter(hidden);

export function initReveal() {
  // trusted-by marquee wrapper
  single($('main > section:nth-of-type(2) .py-section-half'));

  // solution cards: STAGGER_CONTAINER (delayChildren .2, stagger .1)
  // (located via the cards themselves so layout/class changes to the wrapper can't break it)
  const cardsWrap = $('[data-solutions] [data-solution-card]')?.parentElement;
  if (cardsWrap) group(cardsWrap, $$(':scope > [data-solution-card]', cardsWrap));

  // results: CTA (individual) + carousel container (stagger)
  $$('[data-feature] .space-y-4 > div[style]').forEach((el) => single(el));
  const carousel = $('[data-feature] .relative.w-full');
  if (carousel) group(carousel, $$(':scope > div > div[style]', carousel));

  // case study cards: each card is a stagger container
  $$('[data-case-panel]').forEach((panel) => {
    const card = $(':scope > div.bg-white-2', panel);
    if (card) group(card, descendantsHidden(card).filter((el) => !el.hasAttribute('data-case-overlay')));
  });

  // Why Envizon: eyebrow + CTA individually, cards as a stagger group
  const why = $('[data-why]');
  if (why) {
    $$('.ev-why-head [style*="translateY(25px)"]', why).forEach((el) => single(el));
    const grid = $('[data-why-grid]', why);
    group(grid, $$(':scope > [style]', grid));
  }

  // FAQ: intro lines individually, questions as a stagger group
  const faq = $('[data-faq]');
  if (faq) {
    $$('.ev-faq-intro > [style*="translateY(25px)"]', faq).forEach((el) => single(el));
    const list = $('[data-faq-list]', faq);
    group(list, $$(':scope > [data-faq-item]', list), { stagger: 0.08 });
  }

  // closing CTA: octagons fade (delay .5) + buttons fadeMove
  single($('[data-octagons]'), { delay: 0.5 });
  single($('[data-closing] .flex.gap-4'));

  // footer
  const footer = $('[data-footer]');
  if (footer) {
    const P = isMobile() ? 0 : 0.6;
    const [menus, , , ctaBlock, footnote] = $$(':scope > div', footer).filter((d) => !d.classList.contains('pointer-events-none'));
    group(menus, descendantsHidden(menus), { delayChildren: P, stagger: 0.02 });
    const sol = $('[data-footer-solutions]', footer);
    group(sol, $$(':scope > [style]', sol), { delayChildren: P, stagger: 0.05 });
    const banner = $('[data-footer-banner]', footer);
    single(banner, { override: { duration: 0.6, delay: P } });
    group(ctaBlock, descendantsHidden(ctaBlock), { delayChildren: P, stagger: 0.05, start: 'top bottom' });
    group(footnote, descendantsHidden(footnote), { delayChildren: P, stagger: 0.05, start: 'top bottom' });

    // footer lines: lineDrawAnim(duration .6) when footer is in view
    const FULL = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    ScrollTrigger.create({
      trigger: footer, start: IN_VIEW_START, once: true,
      onEnter: () => $$('hr[style*="clip-path"]', footer).forEach((hr) =>
        gsap.to(hr, { clipPath: FULL, duration: reducedMotion ? 0 : 0.6, ease: EASE.circInOut })),
    });
  }

  // anything left with the fadeMove initial state gets its own trigger
  $$('main [style*="translateY(25px)"], [data-closing] [style*="translateY(25px)"]').forEach((el) => {
    if (!el.hasAttribute('data-reveal-pending') && !done.has(el)) single(el);
  });
}
