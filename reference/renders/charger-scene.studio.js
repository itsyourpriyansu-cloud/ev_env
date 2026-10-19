// Studio product renders of the Envizon DC charger range (60 / 120 / 240 kW).
// Procedural model + physically based materials, soft studio lighting on a warm-grey sweep
// (#ECE7E4, the map tone), filmic tone mapping, subtle bloom on the status LED and fine grain.
// Driven by tools/render-chargers.mjs via window.renderCharger({ kw, view, width, height }).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const STUDIO = 0xece7e4;
const SPECS = {
  60: { w: 0.62, h: 1.72, d: 0.5, guns: 1, label: '60 kW' },
  120: { w: 0.78, h: 1.86, d: 0.6, guns: 2, label: '120 kW' },
  240: { w: 1.04, h: 1.98, d: 0.72, guns: 2, label: '240 kW' },
};

// ---------------------------------------------------------------- assets
const loadImage = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
const fontReady = (async () => {
  const f = new FontFace('Inter', 'url(/assets/fonts/inter-var.woff2)', { weight: '100 900' });
  document.fonts.add(await f.load());
})();
const logoWhite = loadImage('/assets/brand/logo-compact-white.svg');
const markImg = loadImage('/assets/brand/logo-mark.svg');

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
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
    g.fillText('10:42', w - 56, 82);
    g.textAlign = 'left'; g.fillStyle = '#ffffff'; g.font = '300 76px Inter';
    g.fillText('Ready to charge', 56, 270);
    g.fillStyle = 'rgba(214,241,219,.7)'; g.font = '400 34px Inter';
    g.fillText('Tap card or scan QR to start', 56, 330);
    // connector status chips
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
  // small model label + rating plate text on the graphite panel
  const label = canvasTex(1024, 128, (g, w, h) => {
    g.fillStyle = 'rgba(0,0,0,0)'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(232,238,233,.85)'; g.font = '600 54px Inter'; g.textAlign = 'left';
    g.fillText('DC FAST CHARGER', 0, 84);
    g.textAlign = 'right'; g.fillStyle = '#71bf45'; g.fillText(spec.label.toUpperCase(), w, 84);
  });
  // RFID tap zone
  const rfid = canvasTex(256, 256, (g, w) => {
    g.strokeStyle = 'rgba(214,241,219,.75)'; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.roundRect(28, 28, w - 56, w - 56, 26); g.stroke();
    for (const r of [34, 58, 82]) { g.beginPath(); g.arc(96, 160, r, -Math.PI / 4, Math.PI / 4); g.stroke(); }
  });
  // soft contact shadow
  const contact = canvasTex(512, 512, (g, w) => {
    const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    r.addColorStop(0, 'rgba(40,34,30,.55)'); r.addColorStop(0.55, 'rgba(40,34,30,.18)'); r.addColorStop(1, 'rgba(40,34,30,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, w);
  });
  return { band, screen, label, rfid, contact };
}

// ---------------------------------------------------------------- materials
const M = {
  body: new THREE.MeshPhysicalMaterial({ color: 0xf1f2f0, roughness: 0.36, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.35 }),
  panel: new THREE.MeshPhysicalMaterial({ color: 0x1c2421, roughness: 0.42, metalness: 0.15, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x151817, roughness: 0.62, metalness: 0 }),
  gunBody: new THREE.MeshPhysicalMaterial({ color: 0x23292a, roughness: 0.35, metalness: 0.05, clearcoat: 0.5 }),
  gunTrim: new THREE.MeshStandardMaterial({ color: 0x16b14c, roughness: 0.4 }),
  holster: new THREE.MeshPhysicalMaterial({ color: 0x2a3130, roughness: 0.45, clearcoat: 0.3 }),
  plinth: new THREE.MeshStandardMaterial({ color: 0xcfc8c1, roughness: 0.92 }),
  vent: new THREE.MeshStandardMaterial({ color: 0x2b3230, roughness: 0.7 }),
  led: new THREE.MeshStandardMaterial({ color: 0x0c3d1f, emissive: 0x3be07a, emissiveIntensity: 4.5, roughness: 0.3 }),
  estopBase: new THREE.MeshStandardMaterial({ color: 0xf2c200, roughness: 0.45 }),
  estop: new THREE.MeshPhysicalMaterial({ color: 0xc8191e, roughness: 0.28, clearcoat: 0.8 }),
  bandSide: new THREE.MeshPhysicalMaterial({ color: 0x0fa84c, roughness: 0.32, clearcoat: 0.4 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x0a0f0d, roughness: 0.06, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, transparent: true, opacity: 0.18 }),
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

function cable(points) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal', 0.5);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 320, 0.017, 18, false), M.rubber);
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
  const bandFace = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, bandH - 0.03), new THREE.MeshStandardMaterial({ map: tex.band, roughness: 0.35 }));
  bandFace.position.set(0, base + h - bandH / 2, d / 2 + 0.0045);
  root.add(bandFace);

  // graphite front panel with display, label, LED strip, RFID, e-stop
  const fz = d / 2 + 0.002;
  const panelH = h * 0.47, panelW = w - 0.1;
  const panelY = base + h - bandH - 0.06 - panelH / 2;
  const panel = new THREE.Mesh(new RoundedBoxGeometry(panelW, panelH, 0.024, 4, 0.02), M.panel);
  panel.position.set(0, panelY, fz);
  root.add(panel);
  const pz = fz + 0.0125;
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(panelW - 0.08, (panelW - 0.08) / 8), new THREE.MeshBasicMaterial({ map: tex.label, transparent: true, toneMapped: false }));
  lab.position.set(0, panelY + panelH / 2 - 0.05, pz);
  root.add(lab);
  const sw = Math.min(panelW - 0.1, 0.46), sh = sw * 0.625;
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshStandardMaterial({ map: tex.screen, emissive: 0xffffff, emissiveMap: tex.screen, emissiveIntensity: 0.85, roughness: 0.2 }));
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
  // side louvres
  for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.008, d - 0.2), M.vent);
    v.position.set(sx * (w / 2 + 0.001), base + h - bandH - 0.12 - i * 0.026, 0);
    root.add(v);
  }

  // holsters + guns + cables
  const slots = spec.guns === 1 ? [[1, 0]] : spec.guns === 2 ? [[-1, 0], [1, 0]] : [[-1, 0.13], [-1, -0.13], [1, 0.13], [1, -0.13]];
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
    // cable from the handle boot, sagging to the floor and returning to the cabinet's lower side
    const bx = hx + side * 0.13, by = hy + 0.36;
    const drop = 0.12 + (i % 2) * 0.08;
    const c = cable([
      [bx, by, hz],
      [bx + side * 0.12, by + 0.02, hz + 0.02],
      [bx + side * 0.24, by - 0.35, hz + 0.06],
      [bx + side * (0.3 + drop), 0.55, hz + 0.12],
      [bx + side * (0.32 + drop), 0.05, hz + 0.18],
      [hx + side * (0.22 + drop), 0.035, hz + 0.32],
      [hx + side * 0.04, 0.05, hz + 0.24],
      [side * (w / 2 - 0.02), 0.32, hz - 0.08],
    ]);
    c.castShadow = true;
    root.add(c);
  });

  // soft contact shadow
  const cs = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.6, d + 1.2), new THREE.MeshBasicMaterial({ map: tex.contact, transparent: true, depthWrite: false, toneMapped: false }));
  cs.rotation.x = -Math.PI / 2;
  cs.position.y = 0.001;
  root.add(cs);
  return root;
}

// ---------------------------------------------------------------- render
async function renderCharger({ kw = 60, view = 'product', width = 2400, height = 1350, grain = 0.035 }) {
  const spec = SPECS[kw];
  const tex = await textures(spec);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // warm-grey sweep with a soft light falloff behind the subject (no hard vignette)
  scene.background = canvasTex(1024, 576, (g, w, h) => {
    const r = g.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.45, w * 0.62);
    r.addColorStop(0, '#f3efec'); r.addColorStop(0.6, '#ece7e4'); r.addColorStop(1, '#e3ddd9');
    g.fillStyle = r; g.fillRect(0, 0, w, h);
  });
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;

  // seamless studio floor: catches shadows only, so it melts into the backdrop
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ color: 0x3a302a, opacity: 0.34 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0c8, 0.55));
  const key = new THREE.DirectionalLight(0xfff4e8, 2.1);
  key.position.set(-3.2, 5.2, 4.2);
  key.castShadow = true;
  key.shadow.mapSize.set(4096, 4096);
  key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 4; key.shadow.camera.bottom = -2;
  key.shadow.radius = 9; key.shadow.blurSamples = 24; key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe8f0ff, 1.4);
  rim.position.set(3.5, 3.2, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.55);
  fill.position.set(4, 1.5, 3);
  scene.add(fill);

  const charger = buildCharger(spec, tex);
  scene.add(charger);

  // camera: 15–25° off-front, mid-height, same distance for every power class (size reads naturally)
  const camera = new THREE.PerspectiveCamera(view === 'banner' ? 24 : 26, width / height, 0.1, 100);
  const az = THREE.MathUtils.degToRad(-20);
  if (view === 'banner') {
    // top half + display, framed for the 378×140 station-card strip (logo sits over the left)
    const dist = 4.1, target = new THREE.Vector3(0.12, 1.42, 0);
    camera.position.set(target.x + Math.sin(az) * dist, 1.55, Math.cos(az) * dist);
    camera.lookAt(target);
  } else {
    const dist = 6.4, target = new THREE.Vector3(0, 1.0, 0);
    camera.position.set(Math.sin(az) * dist, 1.05, Math.cos(az) * dist);
    camera.lookAt(target);
  }

  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { samples: 4, type: THREE.HalfFloatType }));
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.28, 0.12, 3.2));
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
  renderer.dispose();
  renderer.domElement.remove();
  return url;
}

window.renderCharger = renderCharger;
window.sceneReady = true;
