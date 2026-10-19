// Captures the live Envizzon EV.com homepage: rendered DOM states, network asset list,
// reference screenshots and intro frames. Output -> reference/
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const URL = 'https://www.Envizzon EV.com/';
const OUT = path.resolve('reference');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const only = process.argv[2]; // optional: run a single step

await fs.mkdir(path.join(OUT, 'dom'), { recursive: true });
await fs.mkdir(path.join(OUT, 'shots'), { recursive: true });
await fs.mkdir(path.join(OUT, 'intro'), { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

async function newPage(width, height = 900, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    ...opts,
  });
  // block cookie bar + analytics so they don't cover reference shots
  await ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
  const page = await ctx.newPage();
  return { ctx, page };
}

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 300) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await wait(120);
  }
  await wait(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(1500);
}

// 1. Desktop DOM + network asset list
if (!only || only === 'dom') {
  const { ctx, page } = await newPage(1440, 900);
  const requests = new Set();
  page.on('request', (r) => requests.add(r.resourceType() + ' ' + r.url()));
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
  await wait(5000); // intro
  await scrollThrough(page);
  await fs.writeFile(path.join(OUT, 'dom', 'desktop.html'), await page.content());
  await fs.writeFile(path.join(OUT, 'requests.txt'), [...requests].sort().join('\n'));

  // computed vars set by JS on <html>
  const rootStyle = await page.evaluate(() => document.documentElement.getAttribute('style'));
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  await fs.writeFile(path.join(OUT, 'dom', 'root.json'), JSON.stringify({ rootStyle, htmlClass }, null, 2));

  // Results infographics: capture each slide state
  const panel = page.locator('section.bg-white-2 .p-center').first();
  const next = page.locator('button[data-slot="carousel-next"]').first();
  await panel.scrollIntoViewIfNeeded();
  await wait(4000);
  for (let i = 0; i < 4; i++) {
    const svg = await page.evaluate(() => {
      const el = document.querySelector('section.bg-white-2 .p-center');
      return el ? el.outerHTML : '';
    });
    const title = await page.evaluate(() => {
      const dots = document.querySelectorAll('section.bg-white-2 [data-slot="carousel-pagination"] button, section.bg-white-2 button');
      return document.querySelector('section.bg-white-2 .p-center svg')?.getAttribute('viewBox');
    });
    await fs.writeFile(path.join(OUT, 'dom', `infographic-${i}.html`), `<!-- viewBox ${title} -->\n` + svg);
    await page.screenshot({ path: path.join(OUT, 'shots', `results-${i}.png`) });
    await next.click();
    await wait(3500);
  }

  // Contact dialog
  await page.evaluate(() => (window.location.hash = '#contact'));
  await wait(1500);
  const dialog = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    const o = document.querySelector('[data-slot="dialog-overlay"]');
    return (o ? o.outerHTML : '') + '\n' + (d ? d.outerHTML : '');
  });
  await fs.writeFile(path.join(OUT, 'dom', 'contact.html'), dialog);
  await page.screenshot({ path: path.join(OUT, 'shots', 'contact-1440.png') });
  await ctx.close();
}

// 2. Mobile DOM + menu
if (!only || only === 'mobile') {
  const { ctx, page } = await newPage(390, 844, { isMobile: true, hasTouch: true });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
  await wait(5000);
  await scrollThrough(page);
  await fs.writeFile(path.join(OUT, 'dom', 'mobile.html'), await page.content());
  await page.locator('button[data-slot="dropdown-menu-trigger"]').first().click();
  await wait(1200);
  const menu = await page.evaluate(() => {
    const m = document.querySelector('[data-slot="dropdown-menu-content"], [role="menu"][data-state="open"]');
    return m ? (m.closest('[data-radix-popper-content-wrapper]') || m).outerHTML : '';
  });
  await fs.writeFile(path.join(OUT, 'dom', 'mobile-menu.html'), menu);
  await page.screenshot({ path: path.join(OUT, 'shots', 'mobile-menu.png') });
  await page.keyboard.press('Escape');
  await page.evaluate(() => (window.location.hash = '#contact'));
  await wait(1500);
  await page.screenshot({ path: path.join(OUT, 'shots', 'contact-390.png') });
  await ctx.close();
}

// 3. Viewport screenshots at scroll positions for each width
if (!only || only === 'shots') {
  for (const [w, h] of [[1440, 900], [1024, 768], [768, 1024], [390, 844]]) {
    const { ctx, page } = await newPage(w, h, w < 500 ? { isMobile: true, hasTouch: true } : {});
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
    await wait(5000);
    await scrollThrough(page);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    let i = 0;
    for (let y = 0; y < total; y += h) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await wait(1800);
      await page.screenshot({ path: path.join(OUT, 'shots', `${w}-${String(i++).padStart(2, '0')}.png`) });
    }
    await ctx.close();
  }
}

// 4. Intro frames (0-4.5s)
if (!only || only === 'intro') {
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(URL, { waitUntil: 'commit', timeout: 90000 });
  const t0 = Date.now();
  let i = 0;
  while (Date.now() - t0 < 6000) {
    await page.screenshot({ path: path.join(OUT, 'intro', `${String(i++).padStart(3, '0')}-${Date.now() - t0}ms.png`) });
  }
  await ctx.close();
}

await browser.close();
console.log('capture done');
