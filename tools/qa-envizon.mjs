// Envizon homepage QA: drives the key journeys and screenshots each state into reference/qa/.
//  - nav anchor scroll, solution card hover, charger "Request a Quote" -> dialog pre-filled
//  - empty submit (errors), valid submit (mock success), FAQ open, mobile menu
// usage: node tools/qa-envizon.mjs [url]
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const url = process.argv[2] || 'http://localhost:5173/';
fs.mkdirSync('reference/qa', { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const log = (...a) => console.log(...a);

{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(5500);

  // nav anchor -> FAQ
  await p.click('nav[aria-label="Main navigation"] >> text=FAQ');
  await p.waitForTimeout(1800);
  const faqTop = await p.evaluate(() => Math.round(document.getElementById('faq').getBoundingClientRect().top));
  log('nav FAQ -> section top at', faqTop, 'px');

  // FAQ open
  await p.click('#faq-q-1');
  await p.waitForTimeout(700);
  log('faq item 1 state:', await p.getAttribute('[data-faq-item]:nth-child(2)', 'data-state'));
  await p.screenshot({ path: 'reference/qa/faq-open.png' });

  // solution hover
  await p.click('nav[aria-label="Main navigation"] >> text=Solutions');
  await p.waitForTimeout(1800);
  await p.hover('[data-solution-card="2"]');
  await p.waitForTimeout(1600);
  await p.screenshot({ path: 'reference/qa/solution-hover.png' });

  // charger quote -> dialog prefilled
  await p.click('nav[aria-label="Main navigation"] >> text=Chargers');
  await p.waitForTimeout(1800);
  await p.locator('#charger-60 a[data-slot="button"]').click();
  await p.waitForTimeout(900);
  const pre = await p.evaluate(() => ({
    type: document.querySelector('select[name="EnquiryType"]').value,
    product: document.querySelector('select[name="ChargerInterest"]').value,
  }));
  log('dialog prefill:', pre);
  await p.screenshot({ path: 'reference/qa/dialog-prefilled.png' });

  // empty-ish submit -> errors
  await p.click('[role="dialog"] button[type="submit"]');
  await p.waitForTimeout(500);
  log('invalid fields:', await p.$$eval('[role="dialog"] [data-invalid="true"]', (els) => els.map((e) => (e.querySelector('label')?.textContent || e.textContent).trim().slice(0, 30))));
  await p.screenshot({ path: 'reference/qa/dialog-errors.png' });

  // valid submit
  await p.fill('input[name="FullName"]', 'Test Person');
  await p.fill('input[name="Phone"]', '+91 98765 43210');
  await p.fill('input[name="City"]', 'Hyderabad');
  await p.check('input[name="ConsentContact"]');
  await p.click('[role="dialog"] button[type="submit"]');
  await p.waitForTimeout(1300);
  log('success message:', await p.textContent('[role="dialog"] p.text-success').catch(() => null));
  await p.screenshot({ path: 'reference/qa/dialog-success.png' });
  await p.keyboard.press('Escape');
  await p.waitForTimeout(400);
  log('after Esc: hash =', JSON.stringify(await p.evaluate(() => location.hash)), 'dialog hidden =', await p.evaluate(() => document.getElementById('contact-root').hidden));
  await ctx.close();
}
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(5500);
  await p.tap('#menu-toggle');
  await p.waitForTimeout(700);
  await p.screenshot({ path: 'reference/qa/mobile-menu.png' });
  await ctx.close();
}
log('errors:', errors.length ? errors : 'none');
await b.close();
