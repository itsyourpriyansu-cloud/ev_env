// Renders the original Antique Legacy next to open-source candidates (reference/fontmatch)
// usage: node tools/fontsheet.mjs <weight> [Font_A,Font_B]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('reference/fontmatch');
const orig = path.resolve('reference/fonts-original');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.woff2'));
const weight = process.argv[2] || '100';
const pick = process.argv[3] ? process.argv[3].split(',') : null;
const text = 'From BOM to Build. Electronics Supply Chain Infrastructure. 01 Stoke Rag&Qy 80% 10x';
const url = (p) => 'file:///' + p.split(path.sep).join('/');

let css = `@font-face{font-family:AL;src:url(${url(path.join(orig, 'antique_legacy_thin-s.p.2c066295.woff2'))});font-weight:100}
@font-face{font-family:AL;src:url(${url(path.join(orig, 'antique_legacy_light-s.p.0816e964.woff2'))});font-weight:300}`;
let rows = `<div class=r><b>ORIGINAL</b><p style="font-family:AL;font-weight:${weight}">${text}</p></div>`;
for (const f of files) {
  const n = f.replace('.woff2', '');
  if (pick && !pick.includes(n)) continue;
  css += `@font-face{font-family:'${n}';src:url(${url(path.join(dir, f))});font-weight:100 900}`;
  rows += `<div class=r><b>${n}</b><p style="font-family:'${n}';font-weight:${weight}">${text}</p></div>`;
}
const html = `<style>${css} body{margin:10px;font:12px Arial} .r{border-bottom:1px solid #ddd} p{font-size:34px;margin:2px 0 6px;line-height:1.1;white-space:nowrap}</style>${rows}`;
fs.writeFileSync(path.join(dir, 'sheet.html'), html);

const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1500, height: 400 } });
await p.goto(url(path.join(dir, 'sheet.html')));
await p.waitForTimeout(800);
await p.screenshot({ path: path.join(dir, `sheet-${weight}${pick ? '-pick' : ''}.png`), fullPage: true });
await b.close();
