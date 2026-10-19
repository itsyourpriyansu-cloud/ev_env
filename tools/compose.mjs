// Composes images into a grid (rows of [a, b]) at a given scale for quick visual review.
// usage: node tools/compose.mjs out.png scale a1.png b1.png a2.png b2.png ...
import fs from 'node:fs';
import { PNG } from 'pngjs';

const [out, scaleArg, ...files] = process.argv.slice(2);
const scale = Number(scaleArg) || 0.5;
const imgs = files.map((f) => PNG.sync.read(fs.readFileSync(f)));
const cols = 2;
const cw = Math.max(...imgs.map((i) => i.width)) * scale | 0;
const ch = Math.max(...imgs.map((i) => i.height)) * scale | 0;
const rows = Math.ceil(imgs.length / cols);
const canvas = new PNG({ width: cw * cols + 8, height: ch * rows + 4 * rows });
canvas.data.fill(255);
imgs.forEach((img, n) => {
  const ox = (n % cols) * (cw + 8), oy = Math.floor(n / cols) * (ch + 4);
  for (let y = 0; y < img.height * scale; y++) for (let x = 0; x < img.width * scale; x++) {
    const sx = (x / scale) | 0, sy = (y / scale) | 0;
    const si = (sy * img.width + sx) * 4, di = ((oy + y) * canvas.width + ox + x) * 4;
    if (ox + x >= canvas.width || oy + y >= canvas.height) continue;
    canvas.data[di] = img.data[si]; canvas.data[di + 1] = img.data[si + 1]; canvas.data[di + 2] = img.data[si + 2]; canvas.data[di + 3] = 255;
  }
});
fs.writeFileSync(out, PNG.sync.write(canvas));
console.log('wrote', out, canvas.width, canvas.height);
