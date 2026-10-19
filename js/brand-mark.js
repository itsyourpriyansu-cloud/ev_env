// Envizon "ev" pill mark as inline SVG (paths traced from the official logo by tools/trace-logo.mjs).
// Used for the animated preloader mark and the footer brand-panel outline.
import paths from '../assets/brand/paths.json';

let uid = 0;

/**
 * @param {object} o
 * @param {'outline'|'fill'|'both'} [o.mode]  outline = strokes only, fill = solid logo, both = stacked (for draw -> fill)
 * @param {boolean} [o.letters]  include the white "ev" letters
 * @param {string} [o.stroke]    stroke colour for outline mode
 * @param {number} [o.strokeWidth] in logo units (the pill is ~620 units wide)
 * @param {number} [o.pad]       extra viewBox padding in logo units
 * @param {string} [o.className] / [o.style]  applied to the <svg>
 */
export function markSVG({ mode = 'both', letters = true, stroke = 'currentColor', strokeWidth = 4, pad = 6, className = '', style = '' } = {}) {
  const { pill, pillShape, letters: lettersPath } = paths;
  const id = `evmark-${uid++}`;
  const vb = `${pill.x0 - pad} ${pill.y0 - pad} ${pill.x1 - pill.x0 + pad * 2} ${pill.y1 - pill.y0 + pad * 2}`;
  const grad = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${pill.x0}" y1="${pill.y1}" x2="${pill.x1}" y2="${pill.y0}"><stop offset="0" stop-color="#00A650"/><stop offset=".45" stop-color="#16B14C"/><stop offset="1" stop-color="#71BF45"/></linearGradient>`;
  const fill = `<g data-mark-fill><path fill="url(#${id})" fill-rule="evenodd" d="${pillShape}"/>${letters ? `<path fill="#fff" fill-rule="evenodd" d="${lettersPath}"/>` : ''}</g>`;
  const outline = `<g data-mark-outline fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path data-draw d="${pillShape}"/>${letters ? `<path data-draw d="${lettersPath}"/>` : ''}</g>`;
  const inner = mode === 'outline' ? outline : mode === 'fill' ? fill : fill + outline;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" class="${className}" style="${style}" aria-hidden="true"><defs>${grad}</defs>${inner}</svg>`;
}
