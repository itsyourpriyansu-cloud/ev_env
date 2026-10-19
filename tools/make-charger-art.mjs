// Generates on-brand line-art charger placeholders (assets/img/charger-60|120|240.svg) used
// until rights-cleared product photography is supplied. Cabinet size/guns scale with power class.
import fs from 'node:fs';

const W = 1600, H = 1000;
const grid = () => {
  let d = '';
  for (let x = 60; x < W; x += 120) for (let y = 60; y < H; y += 120) d += `<circle cx="${x}" cy="${y}" r="1.6"/>`;
  return `<g fill="#cfd9d2">${d}</g>`;
};

function cabinet({ w, h, guns, screenW }) {
  const x = 700 - w / 2, base = 800, y = base - h;
  const r = 26;
  let s = '';
  // plinth + floor line
  s += `<path d="M120 ${base + 1}H1480" stroke="#183028" stroke-opacity=".25"/>`;
  s += `<rect x="${x - 24}" y="${base - 14}" width="${w + 48}" height="28" rx="8" fill="#e8eee9" stroke="#183028" stroke-opacity=".5"/>`;
  // body
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h - 14}" rx="${r}" fill="#ffffff" stroke="#183028" stroke-width="2"/>`;
  // brand band (gradient)
  s += `<rect x="${x}" y="${y}" width="${w}" height="64" rx="${r}" fill="url(#brand)"/><rect x="${x}" y="${y + 34}" width="${w}" height="30" fill="url(#brand)"/>`;
  // ev pill on band
  s += `<rect x="${x + w / 2 - 44}" y="${y + 16}" width="88" height="34" rx="17" fill="#fff" fill-opacity=".92"/>`;
  s += `<text x="${x + w / 2}" y="${y + 41}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#00a650">ev</text>`;
  // screen
  const sx = x + (w - screenW) / 2, sy = y + 110;
  s += `<rect x="${sx}" y="${sy}" width="${screenW}" height="${screenW * 0.62}" rx="10" fill="#0e1c18"/>`;
  s += `<path d="M${sx + 24} ${sy + screenW * 0.42}h${screenW * 0.5}" stroke="#71bf45" stroke-width="6" stroke-linecap="round"/>`;
  s += `<path d="M${sx + 24} ${sy + 34}h${screenW * 0.3}M${sx + 24} ${sy + 58}h${screenW * 0.45}" stroke="#d6f1db" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>`;
  // status light strip
  s += `<rect x="${x + 30}" y="${sy + screenW * 0.62 + 40}" width="${w - 60}" height="8" rx="4" fill="#16b14c" fill-opacity=".85"/>`;
  // vents
  for (let i = 0; i < 4; i++) s += `<path d="M${x + 40} ${base - 120 + i * 18}h${w - 80}" stroke="#183028" stroke-opacity=".18" stroke-width="3" stroke-linecap="round"/>`;
  // guns: holster on side(s) + cable loop
  for (let g = 0; g < guns; g++) {
    const side = g % 2 === 0 ? 1 : -1;
    const hx = side > 0 ? x + w : x;
    const hy = y + 230 + Math.floor(g / 2) * 120;
    const out = side * 70;
    s += `<rect x="${side > 0 ? hx : hx - 26}" y="${hy}" width="26" height="70" rx="8" fill="#e8eee9" stroke="#183028" stroke-opacity=".6"/>`;
    s += `<path d="M${hx + side * 13} ${hy + 70}c0 ${180 + g * 40} ${out * 2.2} ${200 + g * 30} ${out * 2.6} ${80 + g * 20}" stroke="#183028" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    s += `<rect x="${hx + side * 13 - 16}" y="${hy - 6}" width="32" height="44" rx="10" fill="#183028"/>`;
  }
  return s;
}

const CONFIG = {
  60: { w: 250, h: 500, guns: 1, screenW: 150 },
  120: { w: 310, h: 540, guns: 2, screenW: 180 },
  240: { w: 420, h: 580, guns: 4, screenW: 210 },
};

fs.mkdirSync('assets/img', { recursive: true });
for (const [kw, cfg] of Object.entries(CONFIG)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f9f6"/><stop offset="1" stop-color="#e6f2e9"/></linearGradient>
<linearGradient id="brand" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#00a650"/><stop offset=".45" stop-color="#16b14c"/><stop offset="1" stop-color="#71bf45"/></linearGradient>
<radialGradient id="glow" cx=".35" cy=".55" r=".5"><stop offset="0" stop-color="#71bf45" stop-opacity=".22"/><stop offset="1" stop-color="#71bf45" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>${grid()}
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<text x="1440" y="900" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="300" font-weight="200" fill="#183028" fill-opacity=".05" letter-spacing="-12">${kw}</text>
${cabinet(cfg)}
</svg>`;
  fs.writeFileSync(`assets/img/charger-${kw}.svg`, svg);
}
console.log('charger placeholders written');
