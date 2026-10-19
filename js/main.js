// Entry point — wires every module in the order the live React tree mounts them.
import { gsap, ScrollTrigger } from './core.js';
import { initVars } from './vars.js';
import { initLenis } from './lenis.js';
import { runPreloader, shouldShowIntro } from './preloader.js';
import { initHeader } from './header.js';
import { initHero } from './hero.js';
import { initMarquee } from './marquee.js';
import { initScrollText } from './scroll-text.js';
import { initReveal } from './reveal.js';
import { initSolutions } from './solutions.js';
import { initFeature } from './feature.js';
import { initCases } from './cases.js';
import { initClosing } from './closing.js';
import { initFooter } from './footer.js';
import { initContact } from './contact.js';
import { initAnchors } from './anchors.js';
import { initFaq } from './faq.js';
import { initLocator } from './locator.js';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

initVars();
const lenis = initLenis();
const showIntro = shouldShowIntro();

// <main> pageTransitionFade: opacity 0 -> 1, 0.3s easeInOut on mount
gsap.to('#main', { opacity: 1, duration: 0.3, ease: 'power1.inOut' });

initHeader({ lenis });
initHero({ introRunning: showIntro });
initMarquee();
initScrollText();
initSolutions();
initFeature();
initCases();
initClosing();
initFooter();
initContact({ lenis });
initAnchors({ lenis });
initFaq();
initLocator();
if (new URLSearchParams(location.search).has('review')) document.documentElement.dataset.review = '';
initReveal();
runPreloader({ lenis, show: showIntro });

// layout can shift once webfonts / images arrive
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
