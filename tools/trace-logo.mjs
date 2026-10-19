// Traces Envizon_EV_Logo_Final.jpg into vector SVG layers (potrace) and writes the logo set:
//   assets/brand/logo-full.svg        black wordmark + gradient pill (light backgrounds)
//   assets/brand/logo-full-white.svg  white wordmark + gradient pill (dark backgrounds)
//   assets/brand/logo-mark.svg        "ev" pill only
//   assets/brand/logo-mark-outline.svg pill + letters as strokes (for draw-on-scroll)
// The JPG must first be converted: ffmpeg -i Envizon_EV_Logo_Final.jpg reference/logo.png
// usage: node tools/trace-logo.mjs
import fs from 'node:fs';
import { PNG } from 'pngjs';
import potrace from 'potrace';

const src = PNG.sync.read(fs.readFileSync('reference/logo.png'));
const { width: W, height: H, data } = src;
const px = (x, y) => { const i = (y * W + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };

const isGreen = ([r, g, b]) => g > r + 35 && g > b + 20;
const isBlack = ([r, g, b]) => r < 120 && g < 120 && b < 120 && Math.abs(g - r) < 30;
const isWhite = ([r, g, b]) => r > 200 && g > 200 && b > 200;

// pill bbox = green pixels right of the wordmark
let pill = { x0: W, y0: H, x1: 0, y1: 0 };
for (let y = 0; y < H; y++) for (let x = Math.floor(W * 0.68); x < W; x++) {
  if (isGreen(px(x, y))) { pill.x0 = Math.min(pill.x0, x); pill.y0 = Math.min(pill.y0, y); pill.x1 = Math.max(pill.x1, x); pill.y1 = Math.max(pill.y1, y); }
}
const inPill = (x, y) => x >= pill.x0 && x <= pill.x1 && y >= pill.y0 && y <= pill.y1;

function mask(test) {
  const out = new PNG({ width: W, height: H });
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const on = test(x, y, px(x, y));
    out.data[i] = out.data[i + 1] = out.data[i + 2] = on ? 0 : 255;
    out.data[i + 3] = 255;
  }
  return PNG.sync.write(out);
}

const trace = (buf) => new Promise((res, rej) => {
  const t = new potrace.Potrace({ threshold: 128, turdSize: 20, optTolerance: 0.4, alphaMax: 1 });
  t.loadImage(buf, (err) => (err ? rej(err) : res(t.getPathTag().match(/ d="([^"]+)"/)[1])));
});

// bounding box of everything that's not white background
let box = { x0: W, y0: H, x1: 0, y1: 0 };
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const c = px(x, y);
  if (isGreen(c) || isBlack(c)) { box.x0 = Math.min(box.x0, x); box.y0 = Math.min(box.y0, y); box.x1 = Math.max(box.x1, x); box.y1 = Math.max(box.y1, y); }
}

const black = await trace(mask((x, y, c) => isBlack(c) && !inPill(x, y)));
const green = await trace(mask((x, y, c) => isGreen(c) || (inPill(x, y) && !isWhite(c) && !isBlack(c))));
// pill silhouette = outer contour (largest sub-path) of the green area inside the pill box
const pillTrace = await trace(mask((x, y, c) => inPill(x, y) && isGreen(c)));
const subpaths = pillTrace.split(/(?=M)/).map((d) => d.trim()).filter(Boolean);
const extent = (d) => {
  const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  return (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
};
const pillShape = subpaths.sort((a, b) => extent(b) - extent(a))[0];
// white letters = white pixels strictly between the first and last green pixel of each row (inside the pill)
const rowSpan = {};
for (let y = pill.y0; y <= pill.y1; y++) {
  let a = -1, b = -1;
  for (let x = pill.x0; x <= pill.x1; x++) if (isGreen(px(x, y))) { if (a < 0) a = x; b = x; }
  rowSpan[y] = [a, b];
}
const insidePill = (x, y) => inPill(x, y) && rowSpan[y][0] >= 0 && x > rowSpan[y][0] && x < rowSpan[y][1];
const letters = await trace(mask((x, y, c) => insidePill(x, y) && isWhite(c)));

const pad = 4;
const vb = (b) => `${b.x0 - pad} ${b.y0 - pad} ${b.x1 - b.x0 + pad * 2} ${b.y1 - b.y0 + pad * 2}`;
const grad = (id) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${pill.x0}" y1="${pill.y1}" x2="${pill.x1}" y2="${pill.y0}"><stop offset="0" stop-color="#00A650"/><stop offset=".45" stop-color="#16B14C"/><stop offset="1" stop-color="#71BF45"/></linearGradient>`;

// green layer = pill + the dot inside the "o"; split: pill uses the gradient, dot flat green
const full = (wordColor, id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(box)}" fill="none" role="img" aria-label="Envizon EV Solutions"><defs>${grad(id)}</defs>` +
  `<path fill-rule="evenodd" fill="${wordColor}" d="${black}"/>` +
  `<path fill-rule="evenodd" fill="#19AA4B" d="${green}" clip-path="url(#${id}-nopill)"/>` +
  `<clipPath id="${id}-nopill"><rect x="${box.x0 - pad}" y="${box.y0 - pad}" width="${pill.x0 - box.x0 - 2}" height="${box.y1 - box.y0 + pad * 2}"/></clipPath>` +
  `<path fill-rule="evenodd" fill="url(#${id})" d="${pillShape}"/>` +
  `<path fill-rule="evenodd" fill="#fff" d="${letters}"/></svg>`;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(pill)}" fill="none" role="img" aria-label="Envizon EV"><defs>${grad('evm')}</defs>` +
  `<path fill-rule="evenodd" fill="url(#evm)" d="${pillShape}"/><path fill-rule="evenodd" fill="#fff" d="${letters}"/></svg>`;

const outline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(pill)}" fill="none"><path data-base="1" stroke="currentColor" stroke-width="3" d="${pillShape}"/><path data-base="1" stroke="currentColor" stroke-width="3" d="${letters}"/></svg>`;

fs.mkdirSync('assets/brand', { recursive: true });
fs.writeFileSync('assets/brand/logo-full.svg', full('#000', 'evg'));
fs.writeFileSync('assets/brand/logo-full-white.svg', full('#fff', 'evgw'));
fs.writeFileSync('assets/brand/logo-mark.svg', mark);
fs.writeFileSync('assets/brand/logo-mark-outline.svg', outline);
// compact variants: crop the viewBox above the SOLUTIONS line (for small sizes, < ~40px tall)
const compactBox = { ...box, y1: pill.y1 };
const compact = (c, id) => full(c, id).replace(`viewBox="${vb(box)}"`, `viewBox="${vb(compactBox)}"`);
fs.writeFileSync('assets/brand/logo-compact.svg', compact('#000', 'evc'));
fs.writeFileSync('assets/brand/logo-compact-white.svg', compact('#fff', 'evcw'));
// mint wordmark for the dark header pill (matches the template's text-green-1 #d6f1db)
fs.writeFileSync('assets/brand/logo-compact-mint.svg', compact('#d6f1db', 'evcm'));
fs.writeFileSync('assets/brand/paths.json', JSON.stringify({ box, pill, black, pillShape, letters }));
console.log('box', box, 'pill', pill, 'sizes', [black, green, pillShape, letters].map((d) => d.length));
