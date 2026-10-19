// Measures ink coverage + text width of the original Antique Legacy weights vs Inter Tight weights
import { chromium } from 'playwright-core';
import path from 'node:path';

const url = (p) => 'file:///' + path.resolve(p).split(path.sep).join('/');
const text = 'From BOM to Build. Electronics Supply Chain Infrastructure. 01 Stoke Rag&Qy 80% 10x';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1600, height: 200 } });
const fs = await import('node:fs');
fs.writeFileSync('reference/fontmatch/weight.html', `<style>
@font-face{font-family:AL;src:url(${url('reference/fonts-original/antique_legacy_thin-s.p.2c066295.woff2')});font-weight:100}
@font-face{font-family:AL;src:url(${url('reference/fonts-original/antique_legacy_light-s.p.0816e964.woff2')});font-weight:300}
@font-face{font-family:IT;src:url(${url('reference/fontmatch/Inter_Tight.woff2')});font-weight:100 900}
body{margin:0} span{font-size:40px;white-space:nowrap}</style><span id=s>${text}</span>`);
await p.goto(url('reference/fontmatch/weight.html'));
await p.waitForTimeout(600);

async function measure(family, weight) {
  return p.evaluate(async ([family, weight, text]) => {
    await document.fonts.ready;
    const c = document.createElement('canvas');
    c.width = 1600; c.height = 80;
    const x = c.getContext('2d');
    x.font = `${weight} 40px ${family}`;
    x.fillStyle = '#000';
    x.fillText(text, 0, 50);
    const w = x.measureText(text).width;
    const d = x.getImageData(0, 0, 1600, 80).data;
    let ink = 0;
    for (let i = 3; i < d.length; i += 4) ink += d[i] / 255;
    return { w: Math.round(w), ink: Math.round(ink) };
  }, [family, weight, text]);
}
// force-load fonts
await p.evaluate(() => Promise.all(['100 40px AL', '300 40px AL', '300 40px IT'].map((f) => document.fonts.load(f))));
console.log('AL 100', await measure('AL', 100));
console.log('AL 300', await measure('AL', 300));
for (const w of [200, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420])
  console.log('IT', w, await measure('IT', w));
await b.close();
