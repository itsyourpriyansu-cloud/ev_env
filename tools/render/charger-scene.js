// Environment renders of the Envizon DC charger range (60 / 120 / 240 kW), art-directed after
// assets/demo/ev_charger_demo.png: a private garage at dusk, warm LED cove lighting washing the walls,
// a slatted oak accent wall, polished concrete with soft reflections, and an open door onto a cool
// blue street. Brand adaptation: our floor-standing DC cabinet, green (not blue) light accents, no car
// and no third-party branding. Driven by tools/render-chargers.mjs via window.renderCharger(opts).
// The previous studio version is kept at reference/renders/charger-scene.studio.js.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

RectAreaLightUniformsLib.init();

const SPECS = {
  60: { w: 0.62, h: 1.72, d: 0.5, guns: 1, label: '60 kW' },
  120: { w: 0.78, h: 1.86, d: 0.6, guns: 2, label: '120 kW' },
  240: { w: 1.04, h: 1.98, d: 0.72, guns: 2, label: '240 kW' },
};
const WARM = 0xffd2a1; // ~3000 K LED cove
const DUSK = 0x6f8fd6; // blue-hour spill through the door

// room layout (metres): back wall z = BACK, left wall x = LEFT, door opening in the back wall
const BACK = -0.8, LEFT = -3.4, CEIL = 2.9;
const DOOR = { x0: 1.85, x1: 5.4, top: 2.4 };

// deterministic noise so re-renders are stable
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// ---------------------------------------------------------------- assets
const loadImage = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
const fontReady = (async () => {
  const f = new FontFace('Inter', 'url(/assets/fonts/inter-var.woff2)', { weight: '100 900' });
  document.fonts.add(await f.load());
})();
const logoWhite = loadImage('/assets/brand/logo-compact-white.svg');
const markImg = loadImage('/assets/brand/logo-mark.svg');

function canvasTex(w, h, draw, { srgb = true, repeat } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}

function speckle(g, w, h, amt) {
  const img = g.getImageData(0, 0, w, h), px = img.data;
  for (let i = 0; i < px.length; i += 4) { const n = (rnd() - 0.5) * amt; px[i] += n; px[i + 1] += n; px[i + 2] += n; }
  g.putImageData(img, 0, 0);
}

async function textures(spec) {
  await fontReady;
  const logo = await logoWhite;
  const mark = await markImg;
  // brand band: Envizon gradient + white wordmark
  const band = canvasTex(1024, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, h, w, 0);
    gr.addColorStop(0, '#00a650'); gr.addColorStop(0.45, '#16b14c'); gr.addColorStop(1, '#71bf45');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    const lh = 92, lw = lh * (2224 / 327);
    g.drawImage(logo, (w - lw) / 2, (h - lh) / 2 + 4, lw, lh);
  });
  // charger display UI
  const screen = canvasTex(1024, 640, (g, w, h) => {
    g.fillStyle = '#0b1310'; g.fillRect(0, 0, w, h);
    const v = g.createLinearGradient(0, 0, 0, h); v.addColorStop(0, 'rgba(22,177,76,.10)'); v.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = v; g.fillRect(0, 0, w, h);
    g.drawImage(mark, 56, 48, 96, 96 * (327 / 628));
    g.fillStyle = 'rgba(214,241,219,.55)'; g.font = '500 30px Inter'; g.textAlign = 'right';
    g.fillText('19:42', w - 56, 82);
    g.textAlign = 'left'; g.fillStyle = '#ffffff'; g.font = '300 76px Inter';
    g.fillText('Ready to charge', 56, 270);
    g.fillStyle = 'rgba(214,241,219,.7)'; g.font = '400 34px Inter';
    g.fillText('Tap card or scan QR to start', 56, 330);
    const chip = (x, label) => {
      g.fillStyle = 'rgba(22,177,76,.16)'; g.strokeStyle = 'rgba(113,191,69,.6)'; g.lineWidth = 2;
      g.beginPath(); g.roundRect(x, 430, 300, 110, 18); g.fill(); g.stroke();
      g.fillStyle = '#71bf45'; g.beginPath(); g.arc(x + 40, 485, 9, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff'; g.font = '500 32px Inter'; g.fillText(label, x + 66, 476);
      g.fillStyle = 'rgba(214,241,219,.7)'; g.font = '400 26px Inter'; g.fillText('Available', x + 66, 512);
    };
    chip(56, 'CCS2 · A');
    if (spec.guns > 1) chip(386, 'CCS2 · B');
  });
  const label = canvasTex(1024, 128, (g, w) => {
    g.fillStyle = 'rgba(232,238,233,.85)'; g.font = '600 54px Inter'; g.textAlign = 'left';
    g.fillText('DC FAST CHARGER', 0, 84);
    g.textAlign = 'right'; g.fillStyle = '#71bf45'; g.fillText(spec.label.toUpperCase(), w, 84);
  });
  const rfid = canvasTex(256, 256, (g, w) => {
    g.strokeStyle = 'rgba(214,241,219,.75)'; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.roundRect(28, 28, w - 56, w - 56, 26); g.stroke();
    for (const r of [34, 58, 82]) { g.beginPath(); g.arc(96, 160, r, -Math.PI / 4, Math.PI / 4); g.stroke(); }
  });
  const contact = canvasTex(512, 512, (g, w) => {
    const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    r.addColorStop(0, 'rgba(12,10,8,.7)'); r.addColorStop(0.5, 'rgba(12,10,8,.25)'); r.addColorStop(1, 'rgba(12,10,8,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, w);
  });
  return { band, screen, label, rfid, contact };
}

// polished concrete: soft mottling, trowel marks, faint aggregate, saw-cut joints every 3 m
function concreteTextures() {
  const S = 2048;
  const paint = (g, base, tone) => {
    g.fillStyle = base; g.fillRect(0, 0, S, S);
    for (let i = 0; i < 260; i++) {
      const x = rnd() * S, y = rnd() * S, r = 60 + rnd() * 320, a = 0.05 + rnd() * 0.08;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      const c = rnd() > 0.5 ? tone[0] : tone[1];
      gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(1, `rgba(${c},0)`);
      g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // long trowel sweeps
    g.lineCap = 'round';
    for (let i = 0; i < 90; i++) {
      g.strokeStyle = `rgba(${tone[rnd() > 0.5 ? 0 : 1]},${0.02 + rnd() * 0.03})`;
      g.lineWidth = 20 + rnd() * 70;
      const x = rnd() * S, y = rnd() * S, a = rnd() * Math.PI;
      g.beginPath(); g.arc(x, y, 200 + rnd() * 600, a, a + 0.4 + rnd() * 0.6); g.stroke();
    }
  };
  const map = canvasTex(S, S, (g) => {
    paint(g, '#8f8a84', ['255,250,244', '70,62,55']);
    for (let i = 0; i < 9000; i++) { // aggregate flecks
      g.fillStyle = `rgba(${rnd() > 0.5 ? '60,55,50' : '235,230,224'},${0.08 + rnd() * 0.14})`;
      g.fillRect(rnd() * S, rnd() * S, 1 + rnd() * 2.5, 1 + rnd() * 2.5);
    }
    g.strokeStyle = 'rgba(40,36,32,.55)'; g.lineWidth = 3;
    for (const p of [0, S / 2]) { g.beginPath(); g.moveTo(p, 0); g.lineTo(p, S); g.moveTo(0, p); g.lineTo(S, p); g.stroke(); }
    speckle(g, S, S, 10);
  }, { repeat: [2, 2] });
  const rough = canvasTex(1024, 1024, (g, w) => {
    g.fillStyle = '#5a5a5a'; g.fillRect(0, 0, w, w);
    for (let i = 0; i < 160; i++) {
      const x = rnd() * w, y = rnd() * w, r = 40 + rnd() * 200;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      const c = rnd() > 0.55 ? '150,150,150' : '25,25,25';
      gr.addColorStop(0, `rgba(${c},.35)`); gr.addColorStop(1, `rgba(${c},0)`);
      g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }, { srgb: false, repeat: [2, 2] });
  return { map, rough };
}

// light-grey wall cladding: large-format panels with shadow-gap joints
function panelTextures(rows, cols) {
  const S = 1024;
  const draw = (g, w, h, joint, face) => {
    g.fillStyle = face; g.fillRect(0, 0, w, h);
    g.fillStyle = joint;
    for (let r = 0; r <= rows; r++) g.fillRect(0, (r / rows) * h - 3, w, 6);
    for (let c = 0; c <= cols; c++) g.fillRect((c / cols) * w - 3, 0, 6, h);
  };
  const map = canvasTex(S, S, (g, w, h) => {
    draw(g, w, h, '#77746f', '#d3d1cd');
    for (let i = 0; i < 40; i++) {
      const x = rnd() * w, y = rnd() * h, r = 80 + rnd() * 200;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, `rgba(${rnd() > 0.5 ? '255,255,255' : '120,115,110'},.05)`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    speckle(g, w, h, 5);
  });
  const bump = canvasTex(S, S, (g, w, h) => draw(g, w, h, '#000', '#fff'), { srgb: false });
  return { map, bump };
}

// oak slats: warm grain with darker flecks
function woodTexture() {
  return canvasTex(256, 2048, (g, w, h) => {
    g.fillStyle = '#9c7350'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {
      const x = rnd() * w;
      g.strokeStyle = `rgba(${rnd() > 0.5 ? '70,44,24' : '196,152,108'},${0.08 + rnd() * 0.18})`;
      g.lineWidth = 1 + rnd() * 5;
      g.beginPath(); g.moveTo(x, 0);
      for (let y = 0; y <= h; y += 64) g.lineTo(x + Math.sin(y * 0.004 + i) * 6 + (rnd() - 0.5) * 2, y);
      g.stroke();
    }
    speckle(g, w, h, 12);
  });
}

// what's seen through the open door: a blue-hour street, houses with warm windows, trees; slightly out of focus
function duskTexture() {
  return canvasTex(2048, 1024, (g, w, h) => {
    const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
    sky.addColorStop(0, '#2a3f6b'); sky.addColorStop(0.45, '#4f6aa0'); sky.addColorStop(0.8, '#93a7cf'); sky.addColorStop(1, '#e2bfa4');
    g.fillStyle = sky; g.fillRect(0, 0, w, h);
    g.filter = 'blur(4px)';
    // trees behind houses
    // trees behind the houses: irregular canopies built from many small overlapping blobs
    for (let i = 0; i < 22; i++) {
      const x = rnd() * w, base = h * 0.7, th = 60 + rnd() * 70, r = 18 + rnd() * 22;
      g.fillStyle = 'rgb(26,32,44)'; g.fillRect(x - 2, base - th * 0.5, 4, th * 0.5);
      g.fillStyle = `rgb(${26 + rnd() * 8},${38 + rnd() * 10},${52 + rnd() * 10})`;
      for (let k = 0; k < 14; k++) {
        g.beginPath();
        g.ellipse(x + (rnd() - 0.5) * r * 2, base - th + (rnd() - 0.3) * r * 1.6, r * (0.35 + rnd() * 0.4), r * (0.3 + rnd() * 0.35), rnd() * 3, 0, Math.PI * 2);
        g.fill();
      }
    }
    // houses: pitched and flat roofs, warm-lit windows
    let x = -40;
    while (x < w) {
      const hw = 130 + rnd() * 150, hh = 70 + rnd() * 60, base = h * 0.74, top = base - hh;
      const fa = g.createLinearGradient(0, top, 0, base);
      const r0 = 52 + rnd() * 16;
      fa.addColorStop(0, `rgb(${r0},${r0 + 10},${r0 + 30})`); fa.addColorStop(1, `rgb(${r0 - 22},${r0 - 14},${r0 + 2})`);
      g.fillStyle = fa;
      g.fillRect(x, top, hw, hh);
      // porch light pooling warm on the facade
      const pl = g.createRadialGradient(x + hw * 0.3, base - 18, 0, x + hw * 0.3, base - 18, 46);
      pl.addColorStop(0, 'rgba(255,205,150,.55)'); pl.addColorStop(1, 'rgba(255,205,150,0)');
      g.fillStyle = pl; g.fillRect(x, top, hw, hh);
      g.fillStyle = `rgb(${24 + rnd() * 8},${30 + rnd() * 8},${46 + rnd() * 10})`;
      g.beginPath();
      if (rnd() > 0.4) { g.moveTo(x - 14, top); g.lineTo(x + hw / 2, top - 50 - rnd() * 40); g.lineTo(x + hw + 14, top); }
      else g.rect(x - 8, top - 14, hw + 16, 16);
      g.fill();
      const cols = 2 + Math.floor(rnd() * 3);
      for (let c = 0; c < cols; c++) {
        if (rnd() < 0.35) continue;
        const wx = x + 24 + c * ((hw - 48) / cols), wy = top + 26 + rnd() * 20;
        g.fillStyle = `rgba(255,${190 + rnd() * 30},${120 + rnd() * 40},${0.55 + rnd() * 0.35})`;
        g.fillRect(wx, wy, 18 + rnd() * 14, 20 + rnd() * 12);
      }
      x += hw + 40 + rnd() * 70;
    }
    // lawn, kerb and road
    g.fillStyle = '#1b2a2c'; g.fillRect(0, h * 0.74, w, h * 0.05);
    g.fillStyle = '#3c4659'; g.fillRect(0, h * 0.79, w, h * 0.21);
    // street lamps (soft bokeh)
    for (const lx of [0.12, 0.47, 0.83]) {
      const gr = g.createRadialGradient(lx * w, h * 0.44, 0, lx * w, h * 0.44, 46);
      gr.addColorStop(0, 'rgba(255,222,170,.95)'); gr.addColorStop(0.3, 'rgba(255,200,140,.4)'); gr.addColorStop(1, 'rgba(255,200,140,0)');
      g.fillStyle = gr; g.fillRect(lx * w - 50, h * 0.44 - 50, 100, 100);
      g.fillStyle = 'rgba(20,26,40,.8)'; g.fillRect(lx * w - 3, h * 0.45, 6, h * 0.3);
    }
    g.filter = 'none';
    speckle(g, w, h, 6);
  });
}

// ---------------------------------------------------------------- materials
const M = {
  // glossy graphite cabinet (the reference's dark, glass-like charger finish)
  body: new THREE.MeshPhysicalMaterial({ color: 0x1f2524, roughness: 0.28, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.08 }),
  panel: new THREE.MeshPhysicalMaterial({ color: 0x0f1413, roughness: 0.3, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x121413, roughness: 0.55, metalness: 0 }),
  gunBody: new THREE.MeshPhysicalMaterial({ color: 0x23292a, roughness: 0.3, metalness: 0.05, clearcoat: 0.7 }),
  gunTrim: new THREE.MeshStandardMaterial({ color: 0x0c3d1f, emissive: 0x2fd86e, emissiveIntensity: 1.4, roughness: 0.4 }),
  holster: new THREE.MeshPhysicalMaterial({ color: 0x2a3130, roughness: 0.35, clearcoat: 0.6 }),
  plinth: new THREE.MeshStandardMaterial({ color: 0x3a3c3b, roughness: 0.6, metalness: 0.3 }),
  vent: new THREE.MeshStandardMaterial({ color: 0x0b0e0d, roughness: 0.7 }),
  led: new THREE.MeshStandardMaterial({ color: 0x0c3d1f, emissive: 0x3be07a, emissiveIntensity: 2.4, roughness: 0.3 }),
  ledEdge: new THREE.MeshStandardMaterial({ color: 0x0c3d1f, emissive: 0x3be07a, emissiveIntensity: 1.3, roughness: 0.3 }),
  estopBase: new THREE.MeshStandardMaterial({ color: 0xf2c200, roughness: 0.45 }),
  estop: new THREE.MeshPhysicalMaterial({ color: 0xc8191e, roughness: 0.28, clearcoat: 0.8 }),
  bandSide: new THREE.MeshPhysicalMaterial({ color: 0x0fa84c, roughness: 0.3, clearcoat: 0.6 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x0a0f0d, roughness: 0.04, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, transparent: true, opacity: 0.2 }),
  // room
  ceiling: new THREE.MeshStandardMaterial({ color: 0xe9e6e1, roughness: 0.9 }),
  trim: new THREE.MeshStandardMaterial({ color: 0x2c2f31, roughness: 0.45, metalness: 0.6 }),
  alu: new THREE.MeshStandardMaterial({ color: 0x9a9da0, roughness: 0.35, metalness: 0.85 }),
  cabinet: new THREE.MeshPhysicalMaterial({ color: 0xbfc2c3, roughness: 0.38, metalness: 0.35, clearcoat: 0.3 }),
  handle: new THREE.MeshStandardMaterial({ color: 0x8d9093, roughness: 0.3, metalness: 0.9 }),
  frosted: new THREE.MeshPhysicalMaterial({ color: 0xc9d2dc, roughness: 0.35, transmission: 0, transparent: true, opacity: 0.5 }),
  cove: new THREE.MeshBasicMaterial({ color: new THREE.Color(WARM).multiplyScalar(5) }),
  planter: new THREE.MeshStandardMaterial({ color: 0x3b3a38, roughness: 0.85 }),
  bark: new THREE.MeshStandardMaterial({ color: 0x4a3d31, roughness: 0.9 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0x6e7f58, roughness: 0.7, side: THREE.DoubleSide }),
  drive: new THREE.MeshStandardMaterial({ color: 0x55595e, roughness: 0.85 }),
};

// ---------------------------------------------------------------- charger model
function gun(side) {
  // CCS2 gun resting in a side holster: head points down into the holster, handle angles out
  const g = new THREE.Group();
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.047, 0.05, 0.11, 40), M.gunBody);
  head.position.y = -0.02;
  g.add(head);
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.043, 0.006, 40), M.rubber);
  face.position.y = -0.078;
  g.add(face);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.047, 0.05, 32), M.gunBody);
  neck.position.y = 0.055;
  g.add(neck);
  const handle = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.15, 8, 24), M.gunBody);
  handle.position.set(side * 0.045, 0.15, 0);
  handle.rotation.z = -side * 0.42;
  g.add(handle);
  const trim = new THREE.Mesh(new THREE.TorusGeometry(0.047, 0.005, 12, 48), M.gunTrim);
  trim.rotation.x = Math.PI / 2;
  trim.position.y = 0.03;
  g.add(trim);
  const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.08, 24), M.rubber);
  boot.position.set(side * 0.1, 0.25, 0);
  boot.rotation.z = -side * 0.42;
  g.add(boot);
  return g;
}

function cable(points, r = 0.017) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal', 0.5);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 320, r, 18, false), M.rubber);
}

function buildCharger(spec, tex) {
  const { w, h, d } = spec;
  const root = new THREE.Group();
  const base = 0.1;

  const plinth = new THREE.Mesh(new RoundedBoxGeometry(w + 0.1, base, d + 0.1, 3, 0.012), M.plinth);
  plinth.position.y = base / 2;
  plinth.castShadow = plinth.receiveShadow = true;
  root.add(plinth);

  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 8, 0.05), M.body);
  body.position.y = base + h / 2;
  body.castShadow = body.receiveShadow = true;
  root.add(body);

  // brand band (top 11%)
  const bandH = Math.min(0.22, h * 0.11);
  const bandBox = new THREE.Mesh(new RoundedBoxGeometry(w + 0.006, bandH, d + 0.006, 6, 0.05), M.bandSide);
  bandBox.position.y = base + h - bandH / 2;
  bandBox.castShadow = true;
  root.add(bandBox);
  const bandFace = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, bandH - 0.03), new THREE.MeshStandardMaterial({ map: tex.band, roughness: 0.3 }));
  bandFace.position.set(0, base + h - bandH / 2, d / 2 + 0.0045);
  root.add(bandFace);

  // vertical light lines on the front edges (green take on the reference's light strip)
  for (const sx of [-1, 1]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.005, h - bandH - 0.34, 0.004), M.ledEdge);
    strip.position.set(sx * (w / 2 - 0.028), base + 0.2 + (h - bandH - 0.34) / 2, d / 2 + 0.002);
    root.add(strip);
  }

  // graphite front panel with display, label, LED strip, RFID, e-stop
  const fz = d / 2 + 0.002;
  const panelH = h * 0.47, panelW = w - 0.12;
  const panelY = base + h - bandH - 0.06 - panelH / 2;
  const panel = new THREE.Mesh(new RoundedBoxGeometry(panelW, panelH, 0.024, 4, 0.02), M.panel);
  panel.position.set(0, panelY, fz);
  root.add(panel);
  const pz = fz + 0.0125;
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(panelW - 0.08, (panelW - 0.08) / 8), new THREE.MeshBasicMaterial({ map: tex.label, transparent: true, toneMapped: false }));
  lab.position.set(0, panelY + panelH / 2 - 0.05, pz);
  root.add(lab);
  const sw = Math.min(panelW - 0.1, 0.46), sh = sw * 0.625;
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshStandardMaterial({ map: tex.screen, emissive: 0xffffff, emissiveMap: tex.screen, emissiveIntensity: 0.9, roughness: 0.2 }));
  scr.position.set(0, panelY + panelH / 2 - 0.1 - sh / 2, pz + 0.001);
  root.add(scr);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(sw + 0.03, sh + 0.03), M.glass);
  glass.position.set(0, scr.position.y, pz + 0.004);
  root.add(glass);
  const led = new THREE.Mesh(new THREE.BoxGeometry(panelW - 0.14, 0.011, 0.006), M.led);
  led.position.set(0, scr.position.y - sh / 2 - 0.06, pz + 0.002);
  root.add(led);
  const rf = new THREE.Mesh(new THREE.PlaneGeometry(0.085, 0.085), new THREE.MeshBasicMaterial({ map: tex.rfid, transparent: true, toneMapped: false }));
  rf.position.set(-panelW / 2 + 0.11, led.position.y - 0.1, pz + 0.001);
  root.add(rf);
  const eBase = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.012, 40), M.estopBase);
  eBase.rotation.x = Math.PI / 2;
  eBase.position.set(panelW / 2 - 0.1, led.position.y - 0.1, pz + 0.006);
  root.add(eBase);
  const eBtn = new THREE.Mesh(new THREE.SphereGeometry(0.032, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.estop);
  eBtn.rotation.x = Math.PI / 2;
  eBtn.position.set(eBase.position.x, eBase.position.y, pz + 0.012);
  eBtn.castShadow = true;
  root.add(eBtn);

  // lower front ventilation grille
  for (let i = 0; i < 7; i++) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(w - 0.18, 0.008, 0.004), M.vent);
    v.position.set(0, base + 0.16 + i * 0.026, d / 2 + 0.001);
    root.add(v);
  }
  for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.008, d - 0.2), M.vent);
    v.position.set(sx * (w / 2 + 0.001), base + h - bandH - 0.12 - i * 0.026, 0);
    root.add(v);
  }

  // holsters + guns + cables
  const slots = spec.guns === 1 ? [[1, 0]] : [[-1, 0], [1, 0]];
  slots.forEach(([side, dz], i) => {
    const hx = side * (w / 2 + 0.045);
    const hy = base + h * 0.62;
    const hz = d * 0.18 + dz;
    const holster = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.2, 0.12, 4, 0.02), M.holster);
    holster.position.set(hx, hy, hz);
    holster.castShadow = true;
    root.add(holster);
    const gn = gun(side);
    gn.position.set(hx + side * 0.004, hy + 0.08, hz);
    gn.traverse((m) => { if (m.isMesh) m.castShadow = true; });
    root.add(gn);
    const bx = hx + side * 0.13, by = hy + 0.36;
    const drop = 0.12 + (i % 2) * 0.08;
    // cable leaves the handle boot, hangs in a loose loop to the floor and returns low into the cabinet side
    const c = cable([
      [bx, by, hz],
      [bx + side * 0.05, by + 0.02, hz + 0.01],
      [bx + side * 0.1, by - 0.12, hz + 0.04],
      [bx + side * (0.13 + drop * 0.3), by - 0.6, hz + 0.1],
      [bx + side * (0.12 + drop * 0.4), 0.12, hz + 0.2],
      [bx + side * (0.04 + drop * 0.3), 0.03, hz + 0.34],
      [hx + side * 0.02, 0.035, hz + 0.3],
      [side * (w / 2 - 0.02), 0.26, hz - 0.06],
    ]);
    c.castShadow = true;
    root.add(c);
  });

  const cs = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.4, d + 1.0), new THREE.MeshBasicMaterial({ map: tex.contact, transparent: true, depthWrite: false }));
  cs.rotation.x = -Math.PI / 2;
  cs.position.y = 0.002;
  root.add(cs);
  return root;
}

// ---------------------------------------------------------------- garage
function box(w, h, d, mat, x, y, z, { cast = false, receive = true } = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = cast; m.receiveShadow = receive;
  return m;
}

// wall slab whose UVs are scaled to metres so panel joints keep a constant size
function wall(w, h, tex, rows, cols) {
  const mat = new THREE.MeshStandardMaterial({ map: tex.map.clone(), bumpMap: tex.bump.clone(), bumpScale: 1.5, roughness: 0.62 });
  for (const t of [mat.map, mat.bumpMap]) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(w / (cols * 1.2), h / (rows * 0.725)); t.needsUpdate = true; }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.receiveShadow = true;
  return m;
}

function oliveTree() {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.21, 0.52, 48), M.planter);
  pot.position.y = 0.26; pot.castShadow = pot.receiveShadow = true;
  g.add(pot);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.01, 32), new THREE.MeshStandardMaterial({ color: 0x2a221c, roughness: 1 }));
  soil.position.y = 0.5;
  g.add(soil);
  const trunkPts = [[0, 0.5, 0], [0.02, 0.8, 0.01], [-0.03, 1.1, 0], [0.01, 1.32, -0.02]];
  const trunk = cable(trunkPts, 0.025);
  trunk.material = M.bark; trunk.castShadow = true;
  g.add(trunk);
  const clumps = [[0, 1.55, 0, 0.3], [-0.2, 1.38, 0.05, 0.22], [0.2, 1.42, -0.04, 0.24], [0.05, 1.78, 0.02, 0.2], [-0.12, 1.66, -0.1, 0.18]];
  const leafGeo = new THREE.PlaneGeometry(0.06, 0.016);
  const leaves = new THREE.InstancedMesh(leafGeo, M.leaf, clumps.length * 260);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(1, 1, 1), p = new THREE.Vector3();
  const col = new THREE.Color();
  let n = 0;
  for (const [cx, cy, cz, r] of clumps) {
    for (let i = 0; i < 260; i++) {
      const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1), rr = r * Math.cbrt(rnd());
      p.set(cx + rr * Math.sin(v) * Math.cos(u), cy + rr * Math.cos(v) * 0.8, cz + rr * Math.sin(v) * Math.sin(u));
      e.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI); q.setFromEuler(e);
      m4.compose(p, q, s.setScalar(0.8 + rnd() * 0.5));
      leaves.setMatrixAt(n, m4);
      leaves.setColorAt(n, col.setHSL(0.22 + rnd() * 0.05, 0.18 + rnd() * 0.12, 0.3 + rnd() * 0.16));
      n++;
    }
  }
  leaves.castShadow = true;
  g.add(leaves);
  return g;
}

function buildGarage(scene) {
  const panels = panelTextures(4, 2);
  const conc = concreteTextures();

  // floor: a planar mirror under a semi-opaque polished-concrete skin = soft, fading reflections
  const W = 40;
  const mirror = new Reflector(new THREE.PlaneGeometry(W, W), { textureWidth: 1024, textureHeight: 1024, color: 0x9a9a9a, multisample: 0 });
  mirror.rotation.x = -Math.PI / 2;
  mirror.position.y = -0.001;
  scene.add(mirror);
  conc.map.repeat.set(W / 6, W / 6); conc.rough.repeat.set(W / 6, W / 6);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, W), new THREE.MeshStandardMaterial({ map: conc.map, roughnessMap: conc.rough, roughness: 0.62, envMapIntensity: 0.45, transparent: true, opacity: 0.86 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const draw = mirror.onBeforeRender;
  mirror.onBeforeRender = function (...a) { floor.visible = false; draw.apply(this, a); floor.visible = true; };

  // back wall (left of the door), header over the door, and the stub right of it
  const bw = wall(DOOR.x0 - LEFT, CEIL, panels, 4, 2);
  bw.position.set((LEFT + DOOR.x0) / 2, CEIL / 2, BACK);
  scene.add(bw);
  const hdr = wall(DOOR.x1 - DOOR.x0 + 0.3, CEIL - DOOR.top, panels, 1, 3);
  hdr.position.set((DOOR.x0 + DOOR.x1) / 2, (CEIL + DOOR.top) / 2, BACK);
  scene.add(hdr);
  const stub = wall(3, CEIL, panels, 4, 2);
  stub.position.set(DOOR.x1 + 1.5, CEIL / 2, BACK);
  scene.add(stub);
  // door reveal (wall thickness) + dark aluminium frame
  for (const x of [DOOR.x0, DOOR.x1]) {
    scene.add(box(0.24, DOOR.top, 0.24, M.ceiling, x + (x === DOOR.x0 ? -0.12 : 0.12), DOOR.top / 2, BACK - 0.12));
    scene.add(box(0.06, DOOR.top, 0.08, M.trim, x + (x === DOOR.x0 ? 0.03 : -0.03), DOOR.top / 2, BACK - 0.02, { cast: true }));
  }
  scene.add(box(DOOR.x1 - DOOR.x0 + 0.48, 0.24, 0.24, M.ceiling, (DOOR.x0 + DOOR.x1) / 2, DOOR.top + 0.12, BACK - 0.12));
  scene.add(box(DOOR.x1 - DOOR.x0, 0.06, 0.08, M.trim, (DOOR.x0 + DOOR.x1) / 2, DOOR.top - 0.03, BACK - 0.02));

  // left wall
  const lw = wall(12, CEIL, panels, 4, 2);
  lw.rotation.y = Math.PI / 2;
  lw.position.set(LEFT, CEIL / 2, BACK + 6);
  scene.add(lw);
  // ceiling
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(20, 14), M.ceiling);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(1, CEIL, BACK + 7);
  scene.add(ceil);
  // dark skirting
  scene.add(box(DOOR.x0 - LEFT, 0.07, 0.012, M.trim, (LEFT + DOOR.x0) / 2, 0.035, BACK + 0.006));
  const sk = box(0.012, 0.07, 12, M.trim, LEFT + 0.006, 0.035, BACK + 6);
  scene.add(sk);

  // LED cove: a recessed strip along the wall/ceiling junction that washes the walls
  const coveBack = box(DOOR.x0 - LEFT - 0.05, 0.02, 0.03, M.cove, (LEFT + DOOR.x0) / 2, CEIL - 0.05, BACK + 0.06, { receive: false });
  scene.add(coveBack);
  scene.add(box(DOOR.x0 - LEFT, 0.08, 0.14, M.ceiling, (LEFT + DOOR.x0) / 2, CEIL - 0.1, BACK + 0.19, { receive: false })); // soffit lip
  const coveLeft = box(0.03, 0.02, 12, M.cove, LEFT + 0.06, CEIL - 0.05, BACK + 6, { receive: false });
  scene.add(coveLeft);
  scene.add(box(0.14, 0.08, 12, M.ceiling, LEFT + 0.19, CEIL - 0.1, BACK + 6.07, { receive: false }));
  const wash = (x, z, w, h, tx, tz, i) => {
    const l = new THREE.RectAreaLight(WARM, i, w, h);
    l.position.set(x, CEIL - 0.06, z);
    l.lookAt(tx, 0, tz);
    scene.add(l);
  };
  wash((LEFT + DOOR.x0) / 2, BACK + 0.08, DOOR.x0 - LEFT, 0.05, (LEFT + DOOR.x0) / 2, BACK - 0.9, 42);
  wash(LEFT + 0.08, BACK + 6, 0.05, 12, LEFT - 0.9, BACK + 6, 26);

  // oak slat feature wall behind the charger
  const wood = woodTexture();
  const slatMat = new THREE.MeshStandardMaterial({ map: wood, roughness: 0.55 });
  const back = box(2.7, CEIL - 0.14, 0.02, new THREE.MeshStandardMaterial({ color: 0x1c1712, roughness: 0.9 }), 0, (CEIL - 0.14) / 2, BACK + 0.01);
  scene.add(back);
  for (let x = -1.32; x <= 1.33; x += 0.075) {
    const s = box(0.045, CEIL - 0.16, 0.035, slatMat, x, (CEIL - 0.16) / 2, BACK + 0.04, { cast: true });
    s.material = slatMat.clone(); s.material.map = wood.clone(); s.material.map.offset.set(rnd(), rnd()); s.material.map.needsUpdate = true;
    scene.add(s);
  }

  // tool wall: wall cabinet with under-light, pegboard, rolling tool chest
  const cx = -2.35, cz = BACK + 0.22;
  scene.add(box(1.3, 0.55, 0.36, M.cabinet, cx, 1.95, cz, { cast: true }));
  scene.add(box(0.004, 0.53, 0.004, M.trim, cx, 1.95, cz + 0.181));
  for (const sx of [-0.06, 0.06]) scene.add(box(0.012, 0.12, 0.02, M.handle, cx + sx, 1.78, cz + 0.19));
  scene.add(box(1.24, 0.012, 0.02, M.cove, cx, 1.668, cz + 0.12, { receive: false }));
  const under = new THREE.RectAreaLight(WARM, 10, 1.2, 0.04);
  under.position.set(cx, 1.66, cz + 0.1);
  under.lookAt(cx, 0, cz + 0.1);
  scene.add(under);
  const peg = canvasTex(512, 256, (g, w, h) => {
    g.fillStyle = '#cfcdc9'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#6d6a66';
    for (let y = 8; y < h; y += 16) for (let x = 8; x < w; x += 16) { g.beginPath(); g.arc(x, y, 2.4, 0, 7); g.fill(); }
  });
  const pb = box(1.3, 0.62, 0.015, new THREE.MeshStandardMaterial({ map: peg, roughness: 0.7 }), cx, 1.3, BACK + 0.01);
  scene.add(pb);
  for (let i = 0; i < 7; i++) { // hanging hand tools, simple silhouettes
    const t = box(0.018, 0.16 + rnd() * 0.1, 0.012, M.handle, cx - 0.5 + i * 0.12, 1.42, BACK + 0.04, { cast: true });
    scene.add(t);
  }
  const chest = new THREE.Group();
  chest.add(box(1.1, 0.82, 0.48, M.cabinet, 0, 0.53, 0, { cast: true }));
  for (let i = 0; i < 6; i++) {
    const y = 0.2 + i * 0.13;
    chest.add(box(1.06, 0.003, 0.004, M.trim, 0, y + 0.065, 0.241));
    chest.add(box(0.8, 0.014, 0.02, M.handle, 0, y + 0.04, 0.252));
  }
  chest.add(box(1.12, 0.03, 0.5, M.trim, 0, 0.955, 0));
  for (const [x, z] of [[-0.48, -0.18], [0.48, -0.18], [-0.48, 0.18], [0.48, 0.18]]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 24), M.rubber);
    wheel.rotation.z = Math.PI / 2; wheel.position.set(x, 0.05, z); chest.add(wheel);
  }
  chest.position.set(cx, 0, BACK + 0.3);
  scene.add(chest);

  // open sectional door, rolled up under the ceiling on its rails
  const doorG = new THREE.Group();
  const dw = DOOR.x1 - DOOR.x0 - 0.1, dl = 2.6;
  doorG.add(box(dw, 0.04, dl, M.frosted, 0, 0, 0, { receive: false }));
  for (let i = 0; i <= 4; i++) doorG.add(box(dw, 0.05, 0.05, M.trim, 0, -0.01, -dl / 2 + (i * dl) / 4));
  for (let i = 0; i <= 5; i++) doorG.add(box(0.04, 0.05, dl, M.trim, -dw / 2 + (i * dw) / 5, -0.01, 0));
  doorG.position.set((DOOR.x0 + DOOR.x1) / 2, DOOR.top + 0.18, BACK + dl / 2 + 0.05);
  scene.add(doorG);
  for (const x of [DOOR.x0 + 0.02, DOOR.x1 - 0.02]) scene.add(box(0.03, 0.08, dl + 0.4, M.alu, x, DOOR.top + 0.2, BACK + dl / 2 + 0.2));

  // outside: driveway, verge and the dusk street backdrop
  const drive = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), M.drive);
  drive.rotation.x = -Math.PI / 2;
  drive.position.set(3.6, 0.003, BACK - 7.1);
  drive.scale.y = 0.9;
  // a clipped hedge and a lamp post across the road give the view real depth
  const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x51665a, emissive: 0x24323a, roughness: 1 });
  scene.add(box(14, 0.6, 0.7, hedgeMat, 4, 0.3, BACK - 9));
  const post = box(0.07, 3.4, 0.07, M.trim, 6.2, 1.7, BACK - 8.4);
  scene.add(post);
  const lamp = box(0.3, 0.08, 0.16, new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd9a8).multiplyScalar(3) }), 6.05, 3.38, BACK - 8.4, { receive: false });
  scene.add(lamp);
  drive.receiveShadow = true;
  scene.add(drive);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(36, 18), new THREE.MeshBasicMaterial({ map: duskTexture(), color: 0xffffff }));
  sky.position.set(5, 4.32, BACK - 13);
  scene.add(sky);
  const dusk = new THREE.RectAreaLight(DUSK, 1.5, DOOR.x1 - DOOR.x0, DOOR.top);
  dusk.position.set((DOOR.x0 + DOOR.x1) / 2, DOOR.top / 2, BACK - 0.05);
  dusk.lookAt((DOOR.x0 + DOOR.x1) / 2 - 1.2, DOOR.top / 2 - 0.3, BACK + 4);
  scene.add(dusk);
  const outside = new THREE.DirectionalLight(DUSK, 0.6);
  outside.position.set(6, 6, -10);
  scene.add(outside);

  const tree = oliveTree();
  tree.position.set(DOOR.x0 - 0.45, 0, BACK + 0.45);
  scene.add(tree);
}

// ---------------------------------------------------------------- render
async function renderCharger({ kw = 60, view = 'product', width = 2400, height = 1350, grain = 0.03, exposure = 1 }) {
  seed = 7;
  const spec = SPECS[kw];
  const tex = await textures(spec);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a2233);
  buildGarage(scene);
  scene.add(new THREE.HemisphereLight(0xfff0e0, 0x3a3532, 0.18));

  // reflections on the glossy cabinet come from the garage itself (cove strips, door, slats)
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(scene, 0.03, 0.1, 60, { position: new THREE.Vector3(0, 1.2, 1.2) }).texture;
  scene.environmentIntensity = 0.7;

  // warm downlight over the charger: the shadow-casting key
  const key = new THREE.SpotLight(0xffe0bf, 38, 0, 0.62, 0.9, 1.6);
  key.position.set(-0.7, CEIL - 0.02, 1.7);
  key.target.position.set(0.1, 0.7, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 10; key.shadow.blurSamples = 24; key.shadow.bias = -0.0004;
  scene.add(key, key.target);
  // soft frontal fill so the cabinet face isn't lost against the slats
  const fill = new THREE.RectAreaLight(0xffe6cc, 1.4, 2.4, 1.2);
  fill.position.set(-1.6, 1.4, 4.2);
  fill.lookAt(0, 1.1, 0);
  scene.add(fill);

  scene.add(buildCharger(spec, tex));

  const camera = new THREE.PerspectiveCamera(view === 'banner' ? 30 : 34, width / height, 0.05, 100);
  const az = THREE.MathUtils.degToRad(-22);
  if (view === 'banner') {
    // top half + display, framed for the 378×140 station-card strip (logo sits over the left)
    const dist = 3.5, target = new THREE.Vector3(0.35, 1.45, 0);
    camera.position.set(target.x + Math.sin(az) * dist, 1.62, Math.cos(az) * dist);
    camera.lookAt(target);
  } else {
    const dist = 6.3, target = new THREE.Vector3(0.45, 1.18, 0);
    camera.position.set(target.x + Math.sin(az) * dist, 1.42, Math.cos(az) * dist);
    camera.lookAt(target);
  }

  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { samples: 4, type: THREE.HalfFloatType }));
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.32, 0.45, 1.25));
  composer.addPass(new OutputPass());
  composer.render();

  // fine film grain (luminance noise), as specified in the art direction
  const out = document.createElement('canvas');
  out.width = width; out.height = height;
  const g = out.getContext('2d');
  g.drawImage(renderer.domElement, 0, 0);
  const img = g.getImageData(0, 0, width, height);
  const px = img.data;
  for (let i = 0; i < px.length; i += 4) {
    const n = (Math.random() - 0.5) * 255 * grain;
    px[i] += n; px[i + 1] += n; px[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  const url = out.toDataURL('image/png');
  pmrem.dispose();
  renderer.dispose();
  renderer.domElement.remove();
  return url;
}

window.renderCharger = renderCharger;
window.sceneReady = true;
