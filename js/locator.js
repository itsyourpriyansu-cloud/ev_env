// Station locator (#stations) — Statiq-style map + list + detail, in the Envizon design system.
// Map: self-hosted OSM render of central Hyderabad (tools/render-map.mjs), pan by drag, zoom by buttons.
// Data: js/data/stations.js (MOCK). A simulated feed flips connector status while the section is
// visible to preview "recent availability" updates. No network requests are made.
import { gsap, $, $$, inView, reducedMotion } from './core.js';
import { EASE } from './lib/ease.js';
import { STATIONS } from './data/stations.js';
import MAP from '../assets/map/hyderabad.json';
import mapLo from '../assets/map/hyderabad-lo.webp';
import mapHi from '../assets/map/hyderabad-hi.webp';
import art60 from '../assets/img/charger-60-banner.webp';
import art120 from '../assets/img/charger-120-banner.webp';
import art240 from '../assets/img/charger-240-banner.webp';
import logoCompact from '../assets/brand/logo-compact-white.svg';

const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const Y0 = merc(MAP.bbox.north), Y1 = merc(MAP.bbox.south);
const project = (lat, lng) => [
  ((lng - MAP.bbox.west) / (MAP.bbox.east - MAP.bbox.west)) * MAP.width,
  ((Y0 - merc(lat)) / (Y0 - Y1)) * MAP.height,
];

const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>',
  arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  marker: '<svg viewBox="0 0 34 42"><path class="ev-pin__body" fill="#16b14c" d="M17 0C7.6 0 0 7.5 0 16.8 0 29.4 17 42 17 42s17-12.6 17-25.2C34 7.5 26.4 0 17 0z"/><circle cx="17" cy="16.5" r="11" fill="#fff" fill-opacity="0"/><path class="ev-pin__bolt" d="m18.2 8.5-6 9.2h4.4l-1.1 7.8 6.1-9.6h-4.5z"/></svg>',
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const connectors = (s) => s.chargers.flatMap((c) => c.connectors);
const availableCount = (s) => connectors(s).filter((c) => c.status === 'available').length;
const directions = (s) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
const STATE_LABEL = { available: 'Available', occupied: 'In use', offline: 'Offline' };

function ago(min) {
  if (min < 1) return 'Updated just now';
  if (min === 1) return 'Updated 1 min ago';
  return `Updated ${min} min ago`;
}

export function initLocator() {
  const root = $('[data-locator]');
  if (!root) return;
  const mapEl = $('[data-map]', root);
  const layer = $('[data-map-layer]', root);
  const img = $('img', layer);
  const markersEl = $('[data-markers]', root);
  const list = $('[data-station-list]', root);
  const detail = $('[data-station-detail]', root);
  const search = $('[data-station-search]', root);
  const updatedEl = $('[data-updated]', root);
  const countEl = $('[data-available]', root);

  const stations = STATIONS.map((s) => ({ ...s, px: project(s.lat, s.lng), chargers: s.chargers.map((c) => ({ ...c, connectors: c.connectors.map((k) => ({ ...k })) })) }));
  const view = { s: 0.5, tx: 0, ty: 0 };
  let selected = null;
  let filter = '';
  let lastUpdate = Date.now() - 2 * 60000;
  let hiRes = false;
  let me = null;

  // ------------------------------------------------------------- map transform
  const isMobile = () => window.innerWidth < 1024;
  const bounds = () => ({ w: mapEl.clientWidth, h: mapEl.clientHeight });
  const minScale = () => { const b = bounds(); return Math.max(b.w / MAP.width, b.h / MAP.height); };
  const clamp = () => {
    const b = bounds();
    view.s = Math.min(1.25, Math.max(minScale(), view.s));
    view.tx = Math.min(0, Math.max(b.w - MAP.width * view.s, view.tx));
    view.ty = Math.min(0, Math.max(b.h - MAP.height * view.s, view.ty));
  };
  const render = () => {
    clamp();
    layer.style.transform = `translate3d(${view.tx}px, ${view.ty}px, 0) scale(${view.s})`;
    for (const s of stations) {
      if (!s.pin) continue;
      s.pin.style.translate = `${view.tx + s.px[0] * view.s}px ${view.ty + s.px[1] * view.s}px`; // `transform` stays free for hover/active scale
    }
    if (me) me.el.style.translate = `${view.tx + me.px[0] * view.s}px ${view.ty + me.px[1] * view.s}px`;
    if (!hiRes && view.s > 0.52) { hiRes = true; img.src = mapHi; }
  };
  // focus point: where a selected station should sit (the free map area beside the panels)
  const focusPoint = () => {
    const b = bounds();
    if (isMobile()) return [b.w / 2, detail.hidden ? b.h * 0.4 : b.h * 0.16]; // keep the pin above the bottom sheet
    // free map area = between the station list (left) and the detail card (right)
    const cs = getComputedStyle(root);
    const pad = parseFloat(cs.getPropertyValue('--loc-pad')) || 16;
    const sideW = parseFloat(cs.getPropertyValue('--side-w')) || 340;
    const detailW = parseFloat(cs.getPropertyValue('--detail-w')) || 380;
    const left = pad + sideW + 24;
    const right = b.w - (detail.hidden ? pad + 60 : pad + detailW + 24);
    return [(left + right) / 2, b.h / 2];
  };
  const centerOn = (pt, scale = view.s, animate = true) => {
    const [fx, fy] = focusPoint();
    const target = { s: scale, tx: fx - pt[0] * scale, ty: fy - pt[1] * scale };
    if (!animate || reducedMotion) { Object.assign(view, target); render(); return; }
    gsap.to(view, { ...target, duration: 1.1, ease: EASE.circInOut, overwrite: true, onUpdate: render });
  };
  const zoomBy = (factor) => {
    const b = bounds();
    const [cx, cy] = isMobile() ? [b.w / 2, b.h / 2] : focusPoint();
    const ns = Math.min(1.25, Math.max(minScale(), view.s * factor));
    const mx = (cx - view.tx) / view.s, my = (cy - view.ty) / view.s;
    gsap.to(view, { s: ns, tx: cx - mx * ns, ty: cy - my * ns, duration: reducedMotion ? 0 : 0.5, ease: EASE.easeOut, overwrite: true, onUpdate: render });
  };

  // drag to pan (vertical page scroll still works on touch: touch-action: pan-y)
  let drag = null;
  mapEl.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.ev-pin') || e.button > 0) return;
    gsap.killTweensOf(view);
    drag = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty, id: e.pointerId };
    mapEl.setPointerCapture(e.pointerId);
    mapEl.classList.add('is-dragging');
  });
  mapEl.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    view.tx = drag.tx + (e.clientX - drag.x);
    view.ty = drag.ty + (e.clientY - drag.y);
    render();
  });
  const endDrag = () => { drag = null; mapEl.classList.remove('is-dragging'); };
  mapEl.addEventListener('pointerup', endDrag);
  mapEl.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', render);

  // ------------------------------------------------------------- markers
  for (const s of stations) {
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = 'ev-pin' + (s.open ? '' : ' is-off');
    pin.setAttribute('aria-label', `${s.name}, ${s.area}`);
    pin.innerHTML = `<span class="ev-pin__pulse"></span>${ICON.marker}`;
    pin.addEventListener('click', () => select(s.id, true));
    markersEl.appendChild(pin);
    s.pin = pin;
  }

  // ------------------------------------------------------------- list
  const chipsHtml = (s) => {
    const types = [...new Set(s.chargers.map((c) => c.type))];
    return `<span class="ev-chip ev-chip--rating">${ICON.star}${s.rating.toFixed(1)}</span>` +
      types.map((t) => `<span class="ev-chip ev-chip--${t.toLowerCase()}">${t}</span>`).join('');
  };
  const statusHtml = (s) => {
    if (!s.open) return `<span class="ev-status is-off">${esc(s.note || 'Unavailable')}</span>`;
    const total = connectors(s).length;
    return `<span class="ev-status">Open now <span class="ev-status__count">· ${availableCount(s)}/${total} free</span></span>`;
  };
  const renderList = () => {
    const q = filter.trim().toLowerCase();
    const items = stations.filter((s) => !q || `${s.name} ${s.area} ${s.address} ${s.id}`.toLowerCase().includes(q));
    list.innerHTML = items.length ? items.map((s) => `
      <div class="ev-card ev-panel${selected === s.id ? ' is-active' : ''}" role="button" tabindex="0" data-id="${s.id}" aria-label="${esc(s.name)}, ${esc(s.area)}">
        <div class="ev-card__top">
          <div><div class="ev-card__name">${esc(s.name)}</div><div class="ev-card__addr">${esc(s.area)}, ${esc(s.address.split(',').slice(-1)[0].trim())}</div></div>
          <div class="ev-card__chips">${chipsHtml(s)}</div>
        </div>
        <div class="ev-card__bottom">${statusHtml(s)}
          <a class="ev-btn-dir" href="${directions(s)}" target="_blank" rel="noopener noreferrer" data-dir>Directions${ICON.arrow}</a>
        </div>
      </div>`).join('') : '<div class="ev-loc-empty ev-panel">No stations match your search. Try an area like “Gachibowli” or “Banjara Hills”.</div>';
    stations.forEach((s) => s.pin && (s.pin.style.opacity = !q || items.includes(s) ? '1' : '0.25'));
    if (countEl) countEl.textContent = `${stations.reduce((n, s) => n + availableCount(s), 0)} connectors available`;
  };
  list.addEventListener('click', (e) => {
    if (e.target.closest('[data-dir]')) return;
    const card = e.target.closest('.ev-card');
    if (card) select(card.dataset.id, true);
  });
  list.addEventListener('keydown', (e) => {
    const card = e.target.closest('.ev-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(card.dataset.id, true); }
  });
  search.addEventListener('input', () => { filter = search.value; renderList(); });

  // ------------------------------------------------------------- detail
  const renderDetail = (s, flash = -1) => {
    const kw = s.chargers[0].powerKw;
    const art = kw >= 200 ? art240 : kw >= 100 ? art120 : art60;
    let n = 0;
    $('[data-detail-body]', detail).innerHTML = `
      <div class="ev-detail__media"><img src="${art}" alt="" aria-hidden="true">
        <img class="ev-detail__logo" src="${logoCompact}" alt="Envizon EV"></div>
      <div class="ev-detail__band"></div>
      <div class="ev-detail__body">
        <h3 class="ev-detail__name">${esc(s.name)}</h3>
        <div class="ev-detail__id">${esc(s.area)} · ID ${s.id}</div>
        <div class="ev-detail__open"><span class="ev-pill${s.open ? '' : ' is-off'}">${s.open ? 'Open Now' : esc(s.note || 'Unavailable')}</span>${esc(s.hours)}
          <span class="ev-detail__rating">${ICON.star}${s.rating.toFixed(1)} <span class="ev-status__count">(${s.reviews})</span></span></div>
        ${availHtml(s)}
        <div class="ev-detail__section">Chargers</div>
        ${s.chargers.map((c) => `
          <div class="ev-charger">
            <div class="ev-charger__name">${esc(c.name)}</div>
            <div class="ev-charger__meta"><span class="ev-charger__type">${c.type}</span><i></i>${c.powerKw} kW
              <span class="ev-charger__price">₹ ${c.pricePerKwh.toFixed(1)} <small>/ kWh</small></span></div>
            ${c.connectors.map((k) => { const i = n++; return `
              <div class="ev-conn is-${k.status}${i === flash ? ' is-flash' : ''}">
                <span class="ev-conn__icon">${ICON.bolt}</span>
                <div><div class="ev-conn__title">Connector ${i + 1}</div>
                <div class="ev-conn__sub">${esc(k.standard)} · <span class="ev-conn__state">${STATE_LABEL[k.status]}</span></div></div>
              </div>`; }).join('')}
          </div>`).join('')}
        <div class="ev-detail__sep"></div>
        <div class="ev-detail__row">${ICON.pin}<span>${esc(s.address)}</span></div>
      </div>`;
    $('[data-detail-footer]', detail).innerHTML =
      `<small>${ICON.clock.replace('<svg', '<svg width="12" height="12" style="display:inline;vertical-align:-2px;margin-right:4px"')}${ago(s.updatedMin)}</small>
       <a class="ev-btn-dir" href="${directions(s)}" target="_blank" rel="noopener noreferrer">Get Directions${ICON.arrow}</a>`;
  };
  const availHtml = (s) => {
    const all = connectors(s);
    const free = availableCount(s);
    const used = all.filter((k) => k.status === 'occupied').length;
    const off = all.length - free - used;
    return `<div class="ev-avail" aria-label="${free} of ${all.length} connectors available">
      <div class="ev-avail__head"><span><b>${free}</b> of ${all.length} connectors available</span><span>${s.chargers.map((c) => c.powerKw + ' kW').join(' · ')}</span></div>
      <div class="ev-avail__bar">${all.map((k) => `<i class="is-${k.status}"></i>`).join('')}</div>
      <div class="ev-avail__legend"><span>Available ${free}</span>${used ? `<span class="is-occupied">In use ${used}</span>` : ''}${off ? `<span class="is-offline">Offline ${off}</span>` : ''}</div>
    </div>`;
  };
  function select(id, focusMap, openDetail = true) {
    const s = stations.find((x) => x.id === id);
    if (!s) return;
    const wasHidden = detail.hidden;
    selected = id;
    stations.forEach((x) => x.pin.classList.toggle('is-active', x.id === id));
    $$('.ev-card', list).forEach((c) => c.classList.toggle('is-active', c.dataset.id === id));
    if (!openDetail) return;
    renderDetail(s);
    detail.hidden = false;
    root.classList.add('is-detail-open');
    $('.ev-detail__scroll', detail).scrollTop = 0;
    if (wasHidden && !reducedMotion) gsap.fromTo(detail, { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE.fadeMove });
    if (focusMap) centerOn(s.px, Math.max(view.s, 0.6));
    if (!isMobile()) $(`.ev-card[data-id="${id}"]`, list)?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
  }
  $('[data-detail-close]', detail).addEventListener('click', () => {
    detail.hidden = true;
    root.classList.remove('is-detail-open');
    selected = null;
    stations.forEach((x) => x.pin.classList.remove('is-active'));
    $$('.ev-card', list).forEach((c) => c.classList.remove('is-active'));
  });

  // ------------------------------------------------------------- controls
  $('[data-zoom-in]', root).addEventListener('click', () => zoomBy(1.4));
  $('[data-zoom-out]', root).addEventListener('click', () => zoomBy(1 / 1.4));
  $('[data-locate]', root).addEventListener('click', () => {
    const fallback = () => centerOn(project(17.4399, 78.4125), 0.45);
    if (!navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const b = MAP.bbox;
      if (lat < b.south || lat > b.north || lng < b.west || lng > b.east) return fallback();
      if (!me) { me = { el: document.createElement('span') }; me.el.className = 'ev-me'; markersEl.appendChild(me.el); }
      me.px = project(lat, lng);
      centerOn(me.px, 0.7);
    }, fallback, { timeout: 8000, maximumAge: 60000 });
  });

  // ------------------------------------------------------------- simulated live feed
  const tick = () => {
    const mins = Math.round((Date.now() - lastUpdate) / 60000);
    if (updatedEl) updatedEl.textContent = ago(mins);
  };
  const simulate = () => {
    const open = stations.filter((s) => s.open);
    const s = open[Math.floor(Math.random() * open.length)];
    const all = connectors(s);
    const i = Math.floor(Math.random() * all.length);
    all[i].status = all[i].status === 'available' ? 'occupied' : 'available';
    s.updatedMin = 0;
    lastUpdate = Date.now();
    tick();
    renderList();
    if (selected === s.id) renderDetail(s, i);
    if (!reducedMotion) gsap.fromTo(s.pin, { scale: 1 }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1, ease: 'power1.out', clearProps: 'scale' });
  };
  let feed = null;
  let clock = null;
  inView(root, (visible) => {
    clearInterval(feed); clearInterval(clock);
    if (visible) { feed = setInterval(simulate, 15000); clock = setInterval(tick, 30000); }
  }, { margin: '0px', once: false });

  // ------------------------------------------------------------- init
  layer.style.width = `${MAP.width}px`;
  layer.style.height = `${MAP.height}px`;
  img.src = mapLo;
  renderList();
  tick();
  // desktop opens the first station like the reference; phones start on the map + station strip
  select(stations[0].id, false, !isMobile());
  centerOn(stations[0].px, 0.5, false);

  // entrance
  if (!reducedMotion) {
    const parts = [$('.ev-loc-search', root), $('.ev-loc-crumbs', root), ...$$('.ev-card', list).slice(0, 3), detail, $('.ev-loc-controls', root)];
    gsap.set(parts, { opacity: 0, y: 25 });
    inView(root, () => gsap.to(parts, { opacity: 1, y: 0, duration: 1, ease: EASE.fadeMove, stagger: 0.08, delay: 0.1 }), { margin: '0px 0px -20% 0px', once: true });
  }
}
