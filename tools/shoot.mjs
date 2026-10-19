// Screenshots the local clone at the same widths/scroll positions as tools/capture.mjs
// and reports console errors + any request leaving localhost.
// usage: node tools/shoot.mjs [url] [widths=1440,1024,768,390]
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const TARGET = process.argv[2] || 'http://localhost:5173/';
const WIDTHS = (process.argv[3] || '1440,1024,768,390').split(',').map(Number);
const HEIGHTS = { 1440: 900, 1024: 768, 768: 1024, 390: 844, 320: 640 };
const OUT = path.resolve('reference/clone-shots');
await fs.mkdir(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const w of WIDTHS) {
  const h = HEIGHTS[w] || 900;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
  const page = await ctx.newPage();
  const errors = [];
  const external = new Set();
  page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(`${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['localhost', '127.0.0.1'].includes(u.hostname) && u.protocol.startsWith('http')) external.add(r.url()); });
  await page.goto(TARGET, { waitUntil: 'networkidle' });
  await wait(5000);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  // scroll through to trigger reveals, like the live capture
  for (let y = 0; y <= total; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await wait(120); }
  await wait(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(1500);
  let i = 0;
  for (let y = 0; y < total; y += h) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await wait(1800);
    await page.screenshot({ path: path.join(OUT, `${w}-${String(i++).padStart(2, '0')}.png`) });
  }
  console.log(`${w}: height ${total}, shots ${i}, horizontal overflow ${overflow}px`);
  console.log('  errors:', errors.length ? errors : 'none');
  console.log('  external requests:', external.size ? [...external] : 'none');
  await ctx.close();
}
await browser.close();
