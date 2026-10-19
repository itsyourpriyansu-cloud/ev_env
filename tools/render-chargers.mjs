// Renders the charger product images + station-card banners from tools/render/charger-scene.js.
// Requires the Vite dev server (npm run dev) so the scene's three.js imports resolve.
// Output: assets/img/charger-{60,120,240}.webp (2400×1350) and charger-{kw}-banner.webp (2400×900)
// usage: node tools/render-chargers.mjs [kw ...]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const KWS = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : [60, 120, 240];
const URL = 'http://localhost:5173/tools/render/charger-scene.html';
fs.mkdirSync('reference/renders', { recursive: true });

const b = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const p = await b.newPage({ viewport: { width: 1200, height: 800 } });
p.on('console', (m) => m.type() === 'error' && console.log('page:', m.text()));
p.on('pageerror', (e) => console.log('pageerror:', e.message));
p.on('response', (r) => r.status() === 404 && console.log('404:', r.url()));
// first visit may trigger Vite's dependency optimisation (504) — reload until the scene is ready
async function open() {
  for (let attempt = 0; attempt < 3; attempt++) {
    await p.goto(URL, { waitUntil: 'networkidle' });
    try { await p.waitForFunction(() => window.sceneReady === true, null, { timeout: 20000 }); return; }
    catch { console.log('scene not ready, reloading…'); }
  }
}
await open();

// a full render takes minutes; if Vite reloads the page meanwhile, reopen the scene and retry once
async function render(o) {
  try { return await p.evaluate((x) => window.renderCharger(x), o); }
  catch (e) {
    if (!/context was destroyed|navigation/i.test(e.message)) throw e;
    console.log('page reloaded during render, retrying…');
    await open();
    return p.evaluate((x) => window.renderCharger(x), o);
  }
}

for (const kw of KWS) {
  for (const [view, w, h, name] of [['product', 2400, 1350, `charger-${kw}`], ['banner', 2400, 900, `charger-${kw}-banner`]]) {
    const t0 = Date.now();
    const data = await render({ kw, view, width: w, height: h });
    const png = `reference/renders/${name}.png`;
    fs.writeFileSync(png, Buffer.from(data.split(',')[1], 'base64'));
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-c:v', 'libwebp', '-quality', '86', `assets/img/${name}.webp`]);
    console.log(name, `${w}x${h}`, `${Date.now() - t0}ms`, fs.statSync(`assets/img/${name}.webp`).size, 'bytes');
  }
}
await b.close();
