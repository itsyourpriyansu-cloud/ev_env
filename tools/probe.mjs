// Evaluate an expression in the running clone (debug helper)
// usage: node tools/probe.mjs "<js expression>" [width] [waitMs] [url]
import { chromium } from 'playwright-core';

const expr = process.argv[2];
const width = Number(process.argv[3] || 1440);
const waitMs = Number(process.argv[4] || 5000);
const url = process.argv[5] || 'http://localhost:5173/';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width, height: 900 } });
p.on('pageerror', (e) => console.log('pageerror', e.message));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(waitMs);
const res = await p.evaluate(expr);
console.log(typeof res === 'string' ? res : JSON.stringify(res, null, 1));
await b.close();
