// Word-by-word heading reveal — port of the live `ScrollText` component (mode "trigger"):
// words become spans "inline-block transition-[translate,opacity] duration-500 ease-in-out",
// hidden "opacity-0 translate-x-5" -> visible "opacity-100 translate-x-0",
// transition-delay i * 0.04s, IntersectionObserver rootMargin bottom -20%, once.
import { $$, reducedMotion } from './core.js';

const BASE = ['js-scroll-text-word-span', 'inline-block', 'transition-[translate,opacity]', 'duration-500', 'ease-in-out',
  'will-change-[opacity,translate]', 'motion-reduce:translate-x-0', 'motion-reduce:opacity-100', 'motion-reduce:transition-none'];
const VISIBLE = ['opacity-100', 'translate-x-0'];
const HIDDEN = ['opacity-0', 'translate-x-5'];
const STAGGER = 0.04;
const THRESHOLD = 0.8;

function split(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() && !n.parentElement.closest('.js-scroll-text-word-span') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const parts = node.nodeValue.match(/\S+\s*/g);
    if (!parts) return;
    const frag = document.createDocumentFragment();
    parts.forEach((part) => {
      const m = part.match(/^(\S+)(\s*)$/);
      if (!m) return frag.appendChild(document.createTextNode(part));
      const span = document.createElement('span');
      span.className = [...BASE, ...HIDDEN].join(' ');
      span.textContent = m[1];
      frag.appendChild(span);
      if (m[2]) frag.appendChild(document.createTextNode(m[2]));
    });
    node.parentNode.replaceChild(frag, node);
  });
  return $$('.js-scroll-text-word-span', root);
}

export function initScrollText() {
  if (reducedMotion) return;
  $$('[data-scroll-text]').forEach((root) => {
    const words = split(root);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          words.forEach((w, i) => {
            w.style.transitionDelay = `${i * STAGGER}s`;
            w.classList.add(...VISIBLE);
            w.classList.remove(...HIDDEN);
          });
          io.disconnect();
        });
      },
      { rootMargin: `0px 0px -${(1 - THRESHOLD) * 100}% 0px` }
    );
    io.observe(root);
  });
}
