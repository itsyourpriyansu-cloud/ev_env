// Captures the hydrated DOM *during* the preloader, so every element still carries
// its initial (pre-animation) inline state. Output -> reference/dom/initial-<w>.html
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath: CHROME });

for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
  const page = await ctx.newPage();
  await page.goto('https://www.Envizzon EV.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  const t0 = Date.now();
  await page.waitForFunction(() => document.querySelector('.rfm-marquee-container') && document.querySelector('.rfm-marquee img, .rfm-marquee svg'), null, { timeout: 30000, polling: 50 });
  const html = await page.content();
  const state = await page.evaluate(() => ({
    mainStyle: document.querySelector('main')?.getAttribute('style'),
    h1: document.querySelector('h1')?.getAttribute('style'),
    preloader: !!document.querySelector('.z-9999'),
  }));
  console.log(w, 'captured at', Date.now() - t0, 'ms', state);
  await fs.writeFile(`reference/dom/initial-${w}.html`, html);
  await ctx.close();
}
await browser.close();
