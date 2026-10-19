// quick low-res preview renders: node preview.mjs <kw> <view> <w> <h> [exposure]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const [kw = 120, view = 'product', w = 1200, h = 675, exposure = 1] = process.argv.slice(2);
const out = `reference/renders/prev-${kw}-${view}.png`;
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1200, height: 800 } });
p.on('console', (m) => m.type() === 'error' && console.log('page:', m.text()));
p.on('pageerror', (e) => console.log('pageerror:', e.message));
for (let a = 0; a < 3; a++) {
  await p.goto('http://localhost:5173/tools/render/charger-scene.html', { waitUntil: 'networkidle' });
  try { await p.waitForFunction(() => window.sceneReady === true, null, { timeout: 20000 }); break; } catch { console.log('reload'); }
}
const t = Date.now();
const data = await p.evaluate((o) => window.renderCharger(o), { kw: +kw, view, width: +w, height: +h, exposure: +exposure });
fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
console.log('done', Date.now() - t, 'ms');
await b.close();
