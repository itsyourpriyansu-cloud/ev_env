// Header: slide-in after the intro, hide on scroll down / show on scroll up,
// desktop hover dropdown nav, mobile Radix-style menu.
import { gsap, $, $$, onIntroComplete, reducedMotion } from './core.js';
import { EASE } from './lib/ease.js';

const TOP_ZONE = 120; // always shown this close to the top of the page
const THRESHOLD = 8;  // px of travel in one direction before the header reacts

export function initHeader({ lenis }) {
  const header = document.getElementById('site-header');
  if (!header) return;

  // slideRevealAnim { y: -100% -> 0, 1.2s circOut }, delay = page fade (0.3s); scroll hiding waits for it
  let ready = false;
  onIntroComplete(() => {
    gsap.fromTo(header, { y: 0, yPercent: -100 }, {
      yPercent: 0, duration: reducedMotion ? 0 : 1.2, ease: EASE.circOut, delay: reducedMotion ? 0 : 0.3,
      onComplete: () => { ready = true; },
    });
  });

  initDesktopNav(header);
  initMobileMenu(header, lenis);
  if (lenis) initAutoHide(header, lenis, () => ready);
}

// One tween per state change (not per scroll event), with a direction threshold. Never hides while
// a menu/dialog has scrolling locked, while a dropdown is open, or while keyboard focus is in the header.
function initAutoHide(header, lenis, isReady) {
  let hidden = false;
  let anchor = 0; // scroll position of the last show/hide decision
  const set = (hide) => {
    if (hide === hidden) return;
    hidden = hide;
    gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.45, ease: 'power2.out', overwrite: true });
  };
  const pinned = () =>
    lenis.isStopped ||
    !!header.querySelector(':focus-visible') ||
    !!header.querySelector('[aria-expanded="true"]');

  lenis.on('scroll', ({ scroll }) => {
    if (!isReady()) return;
    if (scroll < TOP_ZONE || pinned()) { anchor = scroll; set(false); return; }
    if (Math.abs(scroll - anchor) < THRESHOLD) return;
    set(scroll > anchor);
    anchor = scroll;
  });
}

function initDesktopNav(header) {
  const nav = $('nav[aria-label="Main navigation"]', header);
  if (!nav) return;
  const items = $$(':scope > ul > li', nav);
  let open = null;

  const render = () => {
    items.forEach((li) => {
      const link = li.querySelector(':scope > a');
      const drop = li.querySelector(':scope > div');
      const isOpen = open === li;
      const others = open && !isOpen;
      link.classList.toggle('text-foreground-muted', !!others);
      if (!drop) link.classList.toggle('hover:text-green-5', !others);
      if (drop) {
        link.setAttribute('aria-expanded', String(isOpen));
        // swap (not stack) the utilities: .pointer-events-none comes later in the compiled CSS and
        // would otherwise win, letting the pointer fall through the open panel and close the menu
        drop.classList.toggle('pointer-events-none', !isOpen);
        drop.classList.toggle('pointer-events-auto', isOpen);
        drop.classList.toggle('opacity-100', isOpen);
        drop.classList.toggle('text-foreground-muted', !!others);
        $$('a', drop).forEach((a) => (a.tabIndex = open ? 0 : -1));
      }
    });
  };

  // short grace period before closing, so a quick diagonal move toward a sub-item doesn't drop the menu;
  // entering any top-level item cancels it and switches immediately
  let closeTimer;
  items.forEach((li) => {
    li.addEventListener('mouseenter', () => { clearTimeout(closeTimer); open = li; render(); });
    li.addEventListener('mouseleave', () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => { if (open === li) { open = null; render(); } subReset(li); }, 150);
    });
    const link = li.querySelector(':scope > a');
    const drop = li.querySelector(':scope > div');
    if (drop) {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open = open === li ? null : li; render(); }
        else if (e.key === 'Escape') { open = null; render(); }
      });
      // sub-items: hovering one mutes the others
      const subs = $$('li', drop);
      subs.forEach((sli) => {
        sli.addEventListener('mouseenter', () => subs.forEach((o) => o.querySelector('a')?.classList.toggle('text-foreground-muted', o !== sli)));
        sli.addEventListener('mouseleave', () => subReset(li));
      });
    }
  });
  function subReset(li) {
    $$('li a', li.querySelector(':scope > div') || li).forEach((a) => a.classList.remove('text-foreground-muted'));
  }
}

function initMobileMenu(header, lenis) {
  const toggle = document.getElementById('menu-toggle');
  const wrapper = document.getElementById('mobile-menu-wrapper');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !wrapper || !menu) return;
  let isOpen = false;
  let hideTimer;

  const position = () => {
    const r = toggle.getBoundingClientRect();
    const w = menu.offsetWidth;
    // Radix popper: side="bottom" align="end" sideOffset=16
    const left = Math.max(0, r.right - w);
    wrapper.style.transform = `translate(${left}px, ${r.bottom + 16}px)`;
    wrapper.style.setProperty('--radix-popper-available-height', `${window.innerHeight - r.bottom - 16}px`);
  };

  const setOpen = (v) => {
    isOpen = v;
    toggle.dataset.state = v ? 'open' : 'closed';
    toggle.setAttribute('aria-expanded', String(v));
    clearTimeout(hideTimer);
    if (v) {
      wrapper.hidden = false;
      menu.dataset.state = 'open';
      position();
      lenis.stop();
      menu.focus({ preventScroll: true });
    } else {
      menu.dataset.state = 'closed';
      lenis.start();
      hideTimer = setTimeout(() => (wrapper.hidden = true), 150);
    }
  };

  toggle.addEventListener('click', (e) => { e.stopPropagation(); setOpen(!isOpen); });
  document.addEventListener('pointerdown', (e) => {
    if (isOpen && !wrapper.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => { if (isOpen && e.key === 'Escape') { setOpen(false); toggle.focus(); } });
  window.addEventListener('resize', () => isOpen && (window.innerWidth >= 1024 ? setOpen(false) : position()));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));

  // accordion (type="single" collapsible)
  const items = $$('li[data-slot="accordion-item"]', menu);
  items.forEach((li) => {
    const btn = $('button[data-slot="accordion-trigger"]', li);
    btn.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // the label itself is a link
      const willOpen = li.dataset.state !== 'open';
      items.forEach((o) => setItem(o, o === li && willOpen));
    });
  });
  function setItem(li, open) {
    const btn = $('button[data-slot="accordion-trigger"]', li);
    const region = $('[data-slot="accordion-content"]', li);
    const h3 = $('h3', li);
    const state = open ? 'open' : 'closed';
    if ((li.dataset.state === 'open') === open) return;
    [li, btn, region, h3].forEach((el) => el && (el.dataset.state = state));
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      region.hidden = false;
      region.style.setProperty('--radix-collapsible-content-height', `${region.scrollHeight}px`);
    } else {
      region.style.setProperty('--radix-collapsible-content-height', `${region.scrollHeight}px`);
      region.addEventListener('animationend', () => { if (region.dataset.state === 'closed') region.hidden = true; }, { once: true });
    }
  }
}
