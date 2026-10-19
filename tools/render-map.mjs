// Renders a self-hosted, Statiq/Mapbox-light-styled map of central Hyderabad from OpenStreetMap
// data (reference/osm/hyd.json, fetched once via Overpass) into:
//   assets/map/hyderabad-hi.webp, assets/map/hyderabad-lo.webp, assets/map/hyderabad.json (projection)
// Map data © OpenStreetMap contributors (ODbL) — attribution is shown on the map.
// usage: node tools/render-map.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright-core';

const BBOX = { south: 17.37, west: 78.25, north: 17.53, east: 78.54 };
const W = 6000;
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const Y0 = merc(BBOX.north), Y1 = merc(BBOX.south);
const XR = ((BBOX.east - BBOX.west) * Math.PI) / 180;
const H = Math.round((W * (Y0 - Y1)) / XR);
const px = (lon, lat) => [((lon - BBOX.west) / (BBOX.east - BBOX.west)) * W, ((Y0 - merc(lat)) / (Y0 - Y1)) * H];

const COLORS = { land: '#ece7e4', water: '#9fd5f0', waterLine: '#9fd5f0', park: '#d9e8cf', casing: '#dcd6d2', road: '#ffffff', label: '#8b8790', halo: '#ece7e4' };
const ROAD = {
  motorway: [15, 1.6], trunk: [15, 1.6], primary: [12, 1.4], secondary: [10, 1.2], tertiary: [8, 1],
  motorway_link: [7, 1], trunk_link: [7, 1], primary_link: [7, 1], secondary_link: [6, 0.8],
  unclassified: [5, 0], residential: [4.2, 0],
};

const data = JSON.parse(fs.readFileSync('reference/osm/hyd.json', 'utf8'));
const r1 = (n) => Math.round(n * 2) / 2;
const line = (geom) => geom.map((p, i) => { const [x, y] = px(p.lon, p.lat); return `${i ? 'L' : 'M'}${r1(x)} ${r1(y)}`; }).join('');
const ring = (geom) => line(geom) + 'Z';

// join open member ways of a multipolygon into rings
function rings(members) {
  const segs = members.filter((m) => m.geometry && m.role !== 'inner').map((m) => m.geometry.slice());
  const out = [];
  const key = (p) => `${p.lat.toFixed(7)},${p.lon.toFixed(7)}`;
  while (segs.length) {
    let cur = segs.shift();
    let guard = 0;
    while (key(cur[0]) !== key(cur[cur.length - 1]) && guard++ < 500) {
      const end = key(cur[cur.length - 1]);
      const i = segs.findIndex((s) => key(s[0]) === end || key(s[s.length - 1]) === end);
      if (i < 0) break;
      let s = segs.splice(i, 1)[0];
      if (key(s[0]) !== end) s = s.reverse();
      cur = cur.concat(s.slice(1));
    }
    out.push(cur);
  }
  return out;
}

const layers = { water: [], park: [], waterway: [], roads: {}, labels: [] };
for (const el of data.elements) {
  const t = el.tags || {};
  // skip mis-tagged businesses / generic words used as place names
  const okName = (n) => n && n.length <= 24 && !/[-–:|@]|designer|school|shop|office|pvt|ltd|hospital|hotel/i.test(n) && /^[A-Z0-9]/.test(n);
  if (el.type === 'node' && t.place && okName(t['name:en'] || t.name)) {
    layers.labels.push({ name: t['name:en'] || t.name, lon: el.lon, lat: el.lat, kind: t.place });
  } else if (el.type === 'way' && el.geometry) {
    if (t.highway && ROAD[t.highway]) (layers.roads[t.highway] ||= []).push(line(el.geometry));
    else if (t.natural === 'water') layers.water.push(ring(el.geometry));
    else if (t.waterway) layers.waterway.push(line(el.geometry));
    else if (t.leisure === 'park' || t.landuse) layers.park.push(ring(el.geometry));
  } else if (el.type === 'relation' && t.natural === 'water' && el.members) {
    for (const g of rings(el.members)) layers.water.push(ring(g));
  }
}

const order = ['residential', 'unclassified', 'tertiary', 'secondary_link', 'primary_link', 'trunk_link', 'motorway_link', 'secondary', 'primary', 'trunk', 'motorway'];
let roads = '';
// casings first (major roads), then fills, minor -> major
for (const k of order) if (layers.roads[k] && ROAD[k][1]) roads += `<path d="${layers.roads[k].join('')}" stroke="${COLORS.casing}" stroke-width="${ROAD[k][0] + ROAD[k][1] * 2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
for (const k of order) if (layers.roads[k]) roads += `<path d="${layers.roads[k].join('')}" stroke="${COLORS.road}" stroke-width="${ROAD[k][0]}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// labels: suburbs bigger than neighbourhoods; skip overlapping ones
const placed = [];
let labels = '';
for (const l of layers.labels.sort((a, b) => (a.kind === 'suburb' ? -1 : 1) - (b.kind === 'suburb' ? -1 : 1))) {
  const [x, y] = px(l.lon, l.lat);
  const size = l.kind === 'suburb' ? 30 : 24;
  const w = l.name.length * size * 0.55;
  if (x < 40 || y < 40 || x > W - 40 || y > H - 40) continue;
  if (placed.some((p) => Math.abs(p.x - x) < (p.w + w) / 2 + 40 && Math.abs(p.y - y) < size * 2.2)) continue;
  placed.push({ x, y, w });
  const esc = l.name.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  labels += `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" text-anchor="middle" font-weight="${l.kind === 'suburb' ? 500 : 400}" letter-spacing="${l.kind === 'suburb' ? 1.5 : 0.5}" fill="${COLORS.label}" stroke="${COLORS.halo}" stroke-width="6" paint-order="stroke">${l.kind === 'suburb' ? esc.toUpperCase() : esc}</text>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${COLORS.land}"/>
<path d="${layers.park.join('')}" fill="${COLORS.park}" fill-rule="evenodd"/>
<path d="${layers.waterway.join('')}" stroke="${COLORS.waterLine}" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="${layers.water.join('')}" fill="${COLORS.water}" fill-rule="evenodd"/>
${roads}
<g font-family="fontInter, Inter, Arial, sans-serif">${labels}</g>
</svg>`;

fs.mkdirSync('reference/osm', { recursive: true });
fs.writeFileSync('reference/osm/hyderabad.svg', svg);
const font = 'file:///' + path.resolve('assets/fonts/inter-var.woff2').split(path.sep).join('/');
fs.writeFileSync('reference/osm/render.html', `<style>@font-face{font-family:fontInter;src:url(${font})}body{margin:0}</style>${svg}`);

const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto('file:///' + path.resolve('reference/osm/render.html').split(path.sep).join('/'));
await p.waitForTimeout(1500);
await p.screenshot({ path: 'reference/osm/hyderabad.png' });
await b.close();

fs.mkdirSync('assets/map', { recursive: true });
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', 'reference/osm/hyderabad.png', '-c:v', 'libwebp', '-quality', '80', 'assets/map/hyderabad-hi.webp']);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', 'reference/osm/hyderabad.png', '-vf', 'scale=3000:-1', '-c:v', 'libwebp', '-quality', '82', 'assets/map/hyderabad-lo.webp']);
fs.writeFileSync('assets/map/hyderabad.json', JSON.stringify({ bbox: BBOX, width: W, height: H, attribution: '© OpenStreetMap contributors' }, null, 1));
console.log('map', W, 'x', H, 'roads', Object.fromEntries(Object.entries(layers.roads).map(([k, v]) => [k, v.length])), 'water', layers.water.length, 'parks', layers.park.length, 'labels placed', placed.length);
for (const f of ['hyderabad-hi.webp', 'hyderabad-lo.webp']) console.log(f, fs.statSync('assets/map/' + f).size);
