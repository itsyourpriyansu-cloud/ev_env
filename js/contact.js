// "Get a Quote" dialog (#contact) — Radix-style dialog driven by the URL hash.
// Opens from any a[href="#contact"]; data-enquiry / data-product on the link pre-fill the form.
// Closes (and clears the hash) via the close button, overlay or Esc. Focus is trapped while open.
//
// Lead submission is MOCKED until a durable lead endpoint is configured (blueprint §0 rule 12, §9.4):
// the payload is validated and logged, nothing leaves the browser.
import { $, $$ } from './core.js';
import site from './data/site.json';

const DRAFT_KEY = 'envizon_quote_draft';
const REQUIRED = ['EnquiryType', 'FullName', 'Phone', 'City'];
const INFO_ICON = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="text-error h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
const CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M20 6 9 17l-5-5"></path></svg>';

/** Indian mobile: optional +91 / 0 prefix, 10 digits starting 6–9 (spaces/dashes ignored) */
const normalisePhone = (v) => v.replace(/[\s\-()]/g, '').replace(/^(\+91|0091|0)/, '');
const isIndianMobile = (v) => /^[6-9]\d{9}$/.test(normalisePhone(v));

export function initContact({ lenis }) {
  const root = document.getElementById('contact-root');
  if (!root) return;
  const overlay = $('[data-slot="dialog-overlay"]', root);
  const dialog = $('[role="dialog"]', root);
  const closeBtn = $('[data-slot="dialog-content"] button[type="button"]:not([role="combobox"])', root);
  const form = initForm(root);
  let isOpen = false;
  let lastFocus = null;
  let hideTimer;

  const open = (prefill) => {
    if (prefill) form?.prefill(prefill);
    if (isOpen) return;
    isOpen = true;
    clearTimeout(hideTimer);
    lastFocus = document.activeElement;
    root.hidden = false;
    overlay.dataset.state = dialog.dataset.state = 'open';
    lenis.stop();
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => dialog.focus({ preventScroll: true }));
  };
  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    history.replaceState(null, '', location.pathname + location.search);
    overlay.dataset.state = dialog.dataset.state = 'closed';
    hideTimer = setTimeout(() => (root.hidden = true), 200);
    lenis.start();
    document.body.style.overflow = '';
    lastFocus?.focus?.({ preventScroll: true });
  };
  const sync = () => (location.hash === '#contact' ? open() : close());

  window.addEventListener('hashchange', sync);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#contact"]');
    if (!a) return;
    e.preventDefault();
    if (location.hash !== '#contact') history.pushState(null, '', '#contact');
    open({ type: a.dataset.enquiry, product: a.dataset.product });
  });
  overlay.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape' && !$('[data-slot="select-content"]', root)) { e.preventDefault(); close(); }
    if (e.key === 'Tab') trapFocus(e, dialog);
  });
  dialog.setAttribute('data-lenis-prevent', ''); // the dialog scrolls natively
  sync();
}

function trapFocus(e, container) {
  const f = $$('a[href], button:not([disabled]), input, select:not([aria-hidden="true"]), textarea, [tabindex]:not([tabindex="-1"])', container)
    .filter((el) => el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === container)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

// ---------------------------------------------------------------- form
function initForm(root) {
  const form = $('form', root);
  if (!form) return null;
  form.noValidate = true;
  const submit = $('button[type="submit"]', form);
  const selects = Object.fromEntries($$('button[role="combobox"]', form).map((t) => {
    const s = initSelect(root, t);
    return [s.name, s];
  }));
  const consent = $('input[name="ConsentContact"]', form);
  let submitted = false;

  // draft restore (24h) / save
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      const { data, timestamp } = JSON.parse(raw);
      if (Date.now() - timestamp < 864e5) {
        Object.entries(data).forEach(([k, v]) => {
          if (!v) return;
          if (selects[k]) selects[k].set(v, false);
          else if (form.elements[k] && form.elements[k].type !== 'checkbox') form.elements[k].value = v;
        });
      } else localStorage.removeItem(DRAFT_KEY);
    }
  } catch {}
  const values = () => Object.fromEntries(new FormData(form).entries());
  const saveDraft = () => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ data: values(), timestamp: Date.now() })); } catch {}
  };
  form.addEventListener('input', () => { saveDraft(); if (submitted) validate(); });
  form.addEventListener('change', () => { saveDraft(); if (submitted) validate(); });

  const rules = (name, value) => {
    const v = (value || '').trim();
    if (REQUIRED.includes(name) && !v) return name === 'EnquiryType' ? 'Please choose an enquiry type' : 'This field is required';
    if (!v) return null;
    if (name === 'FullName' && v.length < 2) return 'Please enter your full name';
    if (name === 'Phone' && !isIndianMobile(v)) return 'Enter a valid 10-digit mobile number';
    if (name === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address';
    return null;
  };

  const validate = () => {
    let ok = true;
    $$('[data-slot="field"]', form).forEach((field) => {
      const input = $('input', field) || $('select', field);
      if (!input) return;
      const msg = rules(input.name, input.value);
      setError(field, msg);
      if (msg) ok = false;
    });
    const consentLabel = consent?.closest('label');
    if (consentLabel) consentLabel.dataset.invalid = consent.checked ? 'false' : 'true';
    if (consent && !consent.checked) ok = false;
    return ok;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitted = true;
    $$('p.text-success, p.text-error', form).forEach((p) => p.remove());
    if (!validate()) {
      const firstInvalid = $('[data-invalid="true"] input, [data-invalid="true"] button[role="combobox"]', form);
      (firstInvalid || (consent && !consent.checked ? consent : null))?.focus();
      return;
    }
    const label = submit.innerHTML;
    submit.disabled = true;
    submit.innerHTML = '<div class="border-green-5 size-3.5 animate-spin rounded-full border border-t-transparent"></div>';
    const v = values();
    const payload = {
      type: v.EnquiryType, fullName: v.FullName.trim(), phone: '+91' + normalisePhone(v.Phone), email: v.Email || null,
      organization: v.Company || null, city: v.City, chargerInterest: v.ChargerInterest || null, requirementText: v.Requirement || null,
      consentToContact: true, marketingConsent: !!v.ConsentMarketing, sourcePage: location.pathname,
    };
    // MOCK — replace with POST /api/v1/leads once the lead endpoint exists (blueprint §9.4).
    // Never log the payload itself: it carries personal data (blueprint §0 rule 9).
    if (import.meta.env.DEV) console.info('[quote mock] lead captured', { type: payload.type, fields: Object.keys(payload).length });
    setTimeout(() => {
      submit.disabled = false;
      submit.innerHTML = label;
      const p = document.createElement('p');
      p.className = 'text-success t-b-1';
      p.setAttribute('role', 'status');
      p.textContent = site.contactSuccess;
      $('.mt-auto', form)?.before(p);
      form.reset();
      Object.values(selects).forEach((s) => s.set('', false));
      submitted = false;
      $$('[data-slot="field"]', form).forEach((f) => setError(f, null));
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
    }, 900);
  });

  return {
    prefill({ type, product } = {}) {
      if (type && selects.EnquiryType) selects.EnquiryType.set(type, false);
      if (product && selects.ChargerInterest) selects.ChargerInterest.set(product, false);
    },
  };
}

function setError(field, msg) {
  field.dataset.invalid = msg ? 'true' : 'false';
  const box = $('.relative.grid', field);
  const control = $('input', box) || $('button[role="combobox"]', box);
  control?.classList.toggle('pr-8', !!msg);
  let icon = $('[data-error-icon]', box);
  if (!msg) { icon?.remove(); return; }
  if (!icon) {
    icon = document.createElement('span');
    icon.dataset.errorIcon = '';
    icon.className = 'absolute top-1/2 right-2 -translate-y-1/2';
    icon.innerHTML = INFO_ICON;
    const tip = document.createElement('div');
    tip.setAttribute('role', 'tooltip');
    tip.style.cssText = 'position:absolute;right:0;bottom:calc(100% + 2px);white-space:nowrap;padding:6px 10px;border-radius:6px;font-size:12px;line-height:1.2;background:var(--color-foreground);color:var(--color-white-1);pointer-events:none;opacity:0;transition:opacity .15s;z-index:10';
    icon.appendChild(tip);
    const show = (v) => (tip.style.opacity = v ? '1' : '0');
    icon.addEventListener('mouseenter', () => show(true));
    icon.addEventListener('mouseleave', () => show(document.activeElement === control));
    control.addEventListener('focus', () => field.dataset.invalid === 'true' && show(true));
    control.addEventListener('blur', () => show(false));
    box.appendChild(icon);
  }
  $('[role="tooltip"]', icon).textContent = msg;
  if (document.activeElement === control) $('[role="tooltip"]', icon).style.opacity = '1';
}

// ---------------------------------------------------------------- Radix-style select (one per trigger)
function initSelect(root, trigger) {
  const native = trigger.parentElement.querySelector('select');
  const valueEl = $('[data-slot="select-value"]', trigger);
  const options = Array.from(native.options).map((o) => ({ value: o.value, label: o.textContent }));
  native.insertAdjacentHTML('afterbegin', '<option value=""></option>'); // empty until chosen
  native.value = '';
  let content = null;
  let active = -1;

  const set = (v, notify = true) => {
    native.value = v;
    const opt = options.find((o) => o.value === v);
    valueEl.textContent = opt ? opt.label : 'Select one';
    if (opt) { trigger.removeAttribute('data-placeholder'); valueEl.classList.add('text-white'); }
    else { trigger.setAttribute('data-placeholder', ''); valueEl.classList.remove('text-white'); }
    if (notify) native.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const close = (refocus = true) => {
    if (!content) return;
    const el = content;
    el.dataset.state = 'closed';
    trigger.dataset.state = 'closed';
    trigger.setAttribute('aria-expanded', 'false');
    setTimeout(() => el.remove(), 150);
    content = null;
    if (refocus) trigger.focus();
  };

  const focusItem = (i) => {
    const items = $$('[role="option"]', content);
    active = (i + items.length) % items.length;
    items[active]?.focus({ preventScroll: true });
  };

  const open = () => {
    if (content) return;
    const r = trigger.getBoundingClientRect();
    content = document.createElement('div');
    content.id = trigger.getAttribute('aria-controls') || '';
    content.setAttribute('data-slot', 'select-content');
    content.setAttribute('role', 'listbox');
    content.dataset.state = 'open';
    content.dataset.side = 'bottom';
    content.className = 'z-popover bg-background relative min-w-32 overflow-x-hidden overflow-y-auto rounded-md border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:translate-y-1';
    content.style.cssText = `position:fixed;left:${r.left}px;top:${r.bottom}px;width:${r.width}px;z-index:1000;color:var(--color-green-5)`;
    const list = document.createElement('div');
    list.className = 'p-1';
    options.forEach((o, i) => {
      const item = document.createElement('div');
      item.setAttribute('role', 'option');
      item.setAttribute('data-slot', 'select-item');
      item.tabIndex = -1;
      item.className = 'focus:bg-subtle focus:text-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-xs outline-hidden select-none';
      const selected = native.value === o.value;
      item.setAttribute('aria-selected', String(selected));
      item.innerHTML = `<span class="absolute right-2 flex size-3.5 items-center justify-center">${selected ? CHECK : ''}</span><span>${o.label}</span>`;
      item.addEventListener('pointermove', () => item.focus({ preventScroll: true }));
      item.addEventListener('click', () => { set(o.value); close(); });
      list.appendChild(item);
      if (selected) active = i;
    });
    content.appendChild(list);
    root.appendChild(content);
    trigger.dataset.state = 'open';
    trigger.setAttribute('aria-expanded', 'true');
    focusItem(active >= 0 ? active : 0);
  };

  trigger.addEventListener('click', () => (content ? close() : open()));
  trigger.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); }
  });
  document.addEventListener('keydown', (e) => {
    if (!content) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(active - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const o = options[active]; if (o) { set(o.value); close(); } }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
    else if (e.key === 'Tab') close(false);
  }, true);
  document.addEventListener('pointerdown', (e) => {
    if (content && !content.contains(e.target) && !trigger.contains(e.target)) close(false);
  });

  return { name: native.name, set };
}
