"""
Envizon EV rebrand step.

  tools/base/index.base.html  (frozen template build: layout, classes, motion hooks)
        +  content/homepage.json   (all copy, with approval status)
        +  content/icons.json      (Envizon line-icon set)
        +  assets/brand/*.svg      (traced logo set)
  ->  index.html

The template's DOM structure and classes are preserved; only content, links, logos and
icons change. Each phase is a function so changes stay reviewable.

run:  .venv/Scripts/python tools/brand_envizon.py
"""
import copy
import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'tools/base/index.base.html'
OUT = ROOT / 'index.html'
C = json.loads((ROOT / 'content/homepage.json').read_text(encoding='utf-8'))
ICONS = json.loads((ROOT / 'content/icons.json').read_text(encoding='utf-8'))
PATHS = json.loads((ROOT / 'assets/brand/paths.json').read_text(encoding='utf-8'))

soup = BeautifulSoup(BASE.read_text(encoding='utf-8'), 'html5lib')
body = soup.body


# ------------------------------------------------------------------ helpers
def frag(html):
    """Parse an HTML fragment into nodes owned by `soup`."""
    f = BeautifulSoup(f'<div id="__f">{html}</div>', 'html5lib').find(id='__f')
    return list(f.contents)


def set_html(el, html):
    el.clear()
    for n in frag(html):
        el.append(n)


def set_text(el, text, status=None):
    el.clear()
    el.append(text)
    if status:
        el['data-status'] = status.lower()


def cls_replace(el, mapping):
    el['class'] = [mapping.get(c, c) for c in el.get('class', []) if mapping.get(c, c)]


def logo_img(variant, height, alt=''):
    ratios = {'compact': 2224 / 327, 'full': 2224 / 416, 'mark': 628 / 327}
    key = variant.replace('-white', '').replace('-mint', '')
    w = round(height * ratios[key])
    return (f'<img class="brand-logo" src="assets/brand/logo-{variant}.svg" alt="{alt}" '
            f'width="{w}" height="{height}" style="height:{height}px" decoding="async">')


def icon_svg(kind, name, cls='', stroke=None):
    vb = '0 0 96 96' if kind == 'solution' else '0 0 24 24'
    sw = stroke or ('1.25' if kind == 'solution' else '1.5')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" fill="none" stroke="currentColor" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" class="{cls}" '
            f'data-icon="{name}" aria-hidden="true">{ICONS[kind][name]}</svg>')


def contact_link(a, enquiry_type):
    a['href'] = '#contact'
    a['data-enquiry'] = enquiry_type
    for k in ('target', 'rel'):
        if a.has_attr(k):
            del a[k]


def anchor_link(a, href):
    a['href'] = href
    for k in ('target', 'rel'):
        if a.has_attr(k):
            del a[k]


# ------------------------------------------------------------------ P1 · brand foundation
def p1_head():
    head = soup.head
    m = C['meta']
    head.find('title').string = m['title']
    head.find('meta', attrs={'name': 'description'})['content'] = m['description']
    head.find('meta', attrs={'property': 'og:title'})['content'] = m['title']
    head.find('meta', attrs={'property': 'og:image'})['content'] = 'assets/brand/og.jpg'
    icon = head.find('link', rel='icon')
    icon['href'] = 'assets/brand/favicon-32.png'
    for n in frag('<link rel="apple-touch-icon" href="assets/brand/favicon-180.png">'
                  '<meta name="theme-color" content="#063d25">'
                  f'<meta property="og:site_name" content="{m["siteName"]}">'
                  f'<meta property="og:description" content="{m["description"]}">'
                  '<link rel="stylesheet" href="css/brand.css">'):
        head.append(n)
    body['id'] = 'top'


# ------------------------------------------------------------------ P2 · shell
def p2_header():
    header = body.find('header')
    logo_a = header.find('a')
    # smoked-glass logo pill (client feedback 2026-10-23): mint wordmark + gradient "ev" mark on a translucent tint
    logo_a['class'] = [c for c in logo_a['class'] if c not in ('bg-green-7', 'border-green-5', 'hover:after:border-green-3', 'border')] + ['ev-glass']
    logo_a['href'] = '#top'
    logo_a['aria-label'] = 'Envizon EV Solutions, back to top'
    set_html(logo_a, '<span class="ev-logo-full">' + logo_img('compact-mint', 18) + '</span>'
             '<span class="ev-logo-mark">' + logo_img('mark', 20) + '</span>'
             '<span class="sr-only">Envizon EV Solutions</span>')

    ul = header.select_one('nav > ul')
    lis = ul.find_all('li', recursive=False)
    plain_t, drop_t = copy.copy(lis[0]), copy.copy(lis[1])
    ul.clear()
    for item in C['nav']['items']:
        if item.get('children'):
            li = copy.copy(drop_t)
            a = li.find('a')
            anchor_link(a, item['href'])
            a.string = item['label']
            sub_ul = li.select_one('ul[role=menu]')
            sub_ul['aria-label'] = f"{item['label']} submenu"
            sub_t = copy.copy(sub_ul.find('li'))
            sub_ul.clear()
            for ch in item['children']:
                sli = copy.copy(sub_t)
                sa = sli.find('a')
                anchor_link(sa, ch['href'])
                sa.string = ch['label']
                sub_ul.append(sli)
        else:
            li = copy.copy(plain_t)
            a = li.find('a')
            anchor_link(a, item['href'])
            a.string = item['label']
        li['data-status'] = C['nav']['status'].lower()
        ul.append(li)

    cta = header.find('a', string=re.compile('Get Started'))
    cta.string = C['nav']['cta']['label']
    contact_link(cta, C['nav']['cta']['type'])


def p2_mobile_menu():
    menu = body.find(id='mobile-menu')
    acc = menu.select_one('ul[data-slot=accordion]')
    items = acc.find_all('li', recursive=False)
    plain_t = copy.copy(items[0])
    acc_t = copy.copy(next(li for li in items if li.get('data-slot') == 'accordion-item'))
    acc.clear()
    for n, item in enumerate(C['nav']['items']):
        if item.get('children'):
            li = copy.copy(acc_t)
            btn = li.find('button')
            region = li.find(attrs={'data-slot': 'accordion-content'})
            btn['id'] = f'mm-trigger-{n}'
            btn['aria-controls'] = f'mm-region-{n}'
            region['id'] = f'mm-region-{n}'
            region['aria-labelledby'] = f'mm-trigger-{n}'
            a = btn.find('a')
            anchor_link(a, item['href'])
            a.string = item['label']
            sub = region.find('ul')
            sub_t = copy.copy(sub.find('li'))
            sub.clear()
            for ch in item['children']:
                sli = copy.copy(sub_t)
                sa = sli.find('a')
                anchor_link(sa, ch['href'])
                sa.string = ch['label']
                sub.append(sli)
        else:
            li = copy.copy(plain_t)
            a = li.find('a')
            anchor_link(a, item['href'])
            a.string = item['label']
        acc.append(li)


def p2_footer():
    footer = body.find('footer')
    f = C['footer']
    blocks = [d for d in footer.find_all('div', recursive=False) if 'pointer-events-none' not in d.get('class', [])]
    menus, solutions, banner, cta_block, footnote = blocks

    # menus (larger, brighter links in a tighter box: client feedback 2026-10-23)
    menus['class'] = menus['class'] + ['ev-footer-menus']
    cols = menus.find_all('div', recursive=False)
    for col, title, items in ((cols[0], f['menuTitle'], f['menu']), (cols[1], f['connectTitle'], f['connect'])):
        col.find('span').string = title
        ul = col.find('ul')
        ul['class'] = [c for c in ul['class'] if c != 't-h-4'] + ['ev-footer-links']
        li_t = copy.copy(ul.find('li'))
        if li_t.get('class') and 'is-active' in li_t['class']:
            li_t['class'] = [c for c in li_t['class'] if c != 'is-active']
        ul.clear()
        for it in items:
            li = copy.copy(li_t)
            a = li.find('a')
            for k in list(a.attrs):
                if k not in ('class',):
                    del a[k]
            if 'type' in it:
                contact_link(a, it['type'])
            else:
                anchor_link(a, it['href'])
            a.string = it['label']
            li['data-status'] = f['status'].lower()
            ul.append(li)

    # "Our Solutions" rotator — 4 solutions
    sol = C['solutions']['items']
    solutions.find('h3').string = f['solutionsLabel']
    grid = solutions.find('div', class_='grid')
    icon_link = grid.find('a', recursive=False)
    anchor_link(icon_link, '#solutions')
    icon_link['aria-label'] = 'Show solution: ' + sol[0]['title']
    icon_box = icon_link.find('div')
    icon_box['style'] = f"background-color: {sol[0]['color']};"
    set_html(icon_box, f'<div class="flex size-full items-center justify-center">'
                       f'{icon_svg("solution", sol[0]["icon"], "h-full w-full", "2.5")}</div>')
    titles = grid.find('div', class_='flex-col')
    t_t = copy.copy(titles.find('a'))
    titles.clear()
    for i, s in enumerate(sol):
        t = copy.copy(t_t)
        anchor_link(t, '#solutions')
        t['aria-label'] = 'Show solution: ' + s['title']
        t['style'] = 'color:rgb(from var(--color-foreground-muted) r g b / %s)' % ('1' if i == 0 else '0.3')
        t.string = s['title']
        titles.append(t)
    dots = grid.find('div', class_='md:gap-2')
    d_t = copy.copy(dots.find_all('button')[1])
    dots.clear()
    for s in sol:
        d = copy.copy(d_t)
        d['aria-label'] = 'Show solution: ' + s['title']
        dots.append(d)
    subs = grid.find('div', class_='max-w-xs')
    g_t = copy.copy(subs.find('p', class_='invisible'))
    active = copy.copy(subs.find_all('p')[-1])
    subs.clear()
    for s in sol:
        g = copy.copy(g_t)
        g.string = s['subtitle']
        subs.append(g)
    active.string = sol[0]['subtitle']
    subs.append(active)

    # brand banner: a smaller square on desktop so the link column above isn't padded out to its height
    banner['class'] = [c for c in banner['class'] if c != 'lg:max-w-90'] + ['ev-footer-banner']

    # brand banner video (placeholder stock loop, see docs/content-register.md), shown unfiltered
    banner.find(attrs={'data-footer-lottie': True}).decompose()
    banner.insert(0, frag(
        '<div class="ev-footer-banner__media" aria-hidden="true">'
        '<video data-footer-video muted loop playsinline preload="none" poster="assets/img/footer-ev-poster.webp">'
        '<source src="assets/video/footer-ev.mp4" type="video/mp4"></video></div>')[0])

    # brand banner taglines
    rot = banner.find('div', class_='select-none')
    rot['class'] = rot['class'] + ['ev-footer-tagline']  # small glass pill keeps the tagline legible over the video
    ghost_t = copy.copy(rot.find('p', class_='invisible'))
    cur = copy.copy(rot.find_all('p')[-1])
    rot.clear()
    for t in f['bannerTexts']:
        g = copy.copy(ghost_t)
        g.string = t
        rot.append(g)
    cur.string = f['bannerTexts'][0]
    rot.append(cur)

    # CTA block
    cta_block.find('span').string = f['ctaLabel']
    cta_block.find('h2').string = f['ctaTitle']
    btn = cta_block.find('a', string=re.compile('Get Started'))
    btn.string = f['ctaButton']['label']
    contact_link(btn, f['ctaButton']['type'])
    legal = cta_block.find('ul')
    l_t = copy.copy(legal.find('li'))
    legal.clear()
    for it in f['legal']:
        li = copy.copy(l_t)
        a = li.find('a')
        for k in list(a.attrs):
            del a[k]
        a['href'] = it['href']
        a['data-status'] = it['status'].lower()
        a.string = it['label']
        legal.append(li)

    # footnote: copyright on the left (one line, no mark), wordmark on the right
    footnote['class'] = [c for c in footnote['class'] if c not in ('flex', 'flex-col-reverse', 'lg:grid', 'lg:grid-cols-subgrid', 'lg:items-end')] + ['ev-footnote']
    set_html(footnote,
             f'<p class="ev-footnote__copy" style="{FADE_MOVE}">{f["copyright"]}</p>'
             f'<div class="ev-footnote__mark" style="{FADE_MOVE}"><a class="inline-block" href="#top">'
             '<span class="block h-auto w-[220px]">' + logo_img('full-white', 41) + '</span>'
             '<span class="sr-only">Envizon EV Solutions, back to top</span></a></div>')


# ------------------------------------------------------------------ P3 · hero + applications
ARROW = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" '
         'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-4" aria-hidden="true">'
         '<path d="M3 8h10M9 4l4 4-4 4"/></svg>')


def p3_hero():
    h = C['hero']
    hero = body.find(attrs={'data-hero': True})
    hero['data-status'] = h['status'].lower()

    # media: keep the template's background video (darkened 40%) as-is, per client request

    # mark beside the H1
    old = hero.find(attrs={'data-hero-logo': True})
    mark = frag('<span data-hero-logo class="block h-auto w-20" style="transform:scale(0)">'
                + logo_img('mark', 42, 'Envizon EV') + '</span>')[0]
    old.replace_with(mark)

    parts = {p['data-hero-part']: [] for p in hero.select('[data-hero-part]')}
    for p in hero.select('[data-hero-part]'):
        parts[p['data-hero-part']].append(p)
    parts['titleLeft'][0].string = h['titleLeft']
    parts['titleRight'][0].string = h['titleRight']
    parts['descriptionLeft'][0].string = h['descriptionLeft']
    parts['descriptionCenter'][0].string = h['descriptionCenter']
    for el in parts['descriptionRight']:
        el.string = h['descriptionRight']

    # no divider between the title and description rows (client feedback 2026-10-23)
    line = hero.find(attrs={'data-hero-line': True})
    line.find_parent('div').decompose()
    desc_row = hero.find(attrs={'data-hero-part': 'descriptionLeft'}).find_parent('div', class_='p-x-max')
    desc_row['class'] = [c for c in desc_row['class'] if c != 'pt-2'] + ['pt-4', 'md:pt-6']

    cta = hero.find(attrs={'data-hero-cta': True})
    cta['class'] = ['w-fit', 'flex', 'flex-wrap', 'items-center', 'gap-6']
    primary = cta.find('a')
    anchor_link(primary, h['ctaPrimary']['href'])
    primary.string = h['ctaPrimary']['label']
    second = frag(f'<a href="#contact" data-enquiry="{h["ctaSecondary"]["type"]}" '
                  f'class="ev-link t-l-1 inline-flex items-center gap-2 font-medium! text-background">'
                  f'{h["ctaSecondary"]["label"]}{ARROW}</a>')[0]
    cta.append(second)


def p3_brands():
    """Section 3: the template's logo marquee, filled with EV-maker marks (assets/logos, see build-logos.mjs).
    Logos are sized optically: emblems sit taller, wide wordmarks shorter, so every mark carries similar weight."""
    a = C['brands']
    mq = body.find(attrs={'data-marquee': True})
    section = mq.find_parent('section')
    section['id'] = 'brands'
    section['data-status'] = a['status'].lower()
    section.find('h2').string = a['title']
    inner = mq.select_one('.rfm-marquee .rfm-initial-child-container')
    inner.clear()
    for it in a['items']:
        svg = (ROOT / 'assets' / 'logos' / f"{it['slug']}.svg").read_text(encoding='utf8').strip()
        _, _, w, h = map(float, re.search(r'viewBox="([^"]+)"', svg).group(1).split())
        height = round(min(46, max(18, 46 / (w / h) ** 0.5)))
        svg = svg.replace('<svg ', f'<svg class="ev-brand__logo" style="--h: {height}px;" ', 1)
        inner.append(frag(f'<div class="rfm-child" style="--transform: none;"><div class="ev-brand px-6 md:px-15">{svg}</div></div>')[0])
    mq.insert_after(frag(f'<p class="ev-brand__note mx-auto mt-6 px-4 text-center md:mt-8">{a["disclaimer"]}</p>')[0])


# ------------------------------------------------------------------ P4 · solutions
def set_heading(wrapper_or_h2, text):
    """Set a heading's text, dropping any pre-split scroll-text word spans."""
    h2 = wrapper_or_h2 if wrapper_or_h2.name in ('h2', 'h3') else wrapper_or_h2.find(['h2', 'h3'])
    h2.clear()
    h2.append(text)
    return h2


def p4_solutions():
    sol = C['solutions']
    sec = body.find(attrs={'data-solutions': True})
    sec['id'] = 'solutions'
    sec['data-status'] = sol['status'].lower()
    set_heading(sec.find(attrs={'data-scroll-text': True}), sol['title'])
    cards = sec.select('[data-solution-card]')
    wrap = cards[0].parent
    tmpl = copy.copy(cards[0])
    for c in cards:
        c.decompose()
    for i, it in enumerate(sol['items']):
        card = copy.copy(tmpl)
        card['data-solution-card'] = str(i)
        card['data-icon'] = it['icon']
        contact_link(card, it['type'])
        card['aria-label'] = f"Enquire about {it['title']}"
        tile = card.find('div').find('div')
        tile['style'] = f"background-color: {it['color']};"
        set_html(tile.find('div'), icon_svg('solution', it['icon'], 'h-full w-full', '1.4'))
        card.find('h3').string = it['title']
        card.find('p').string = it['subtitle']
        btn = card.find('button')
        for node in btn.contents:
            if isinstance(node, str) and node.strip():
                node.replace_with(sol['cardCta'])
                break
        wrap.append(card)
    # two-column layout (css/brand.css): cards left, sticky panel right where solutions.js draws the
    # hovered card's hairline icon (desktop ≥1024px; below that the icon draws behind the section)
    wrap['class'] = wrap.get('class', []) + ['ev-solutions-cards']
    wrap.wrap(soup.new_tag('div', attrs={'class': 'ev-solutions-grid'}))
    wrap.insert_after(frag('<div class="ev-solutions-icon" aria-hidden="true" data-solutions-icon>'
                           '<div class="ev-solutions-icon__inner"></div></div>')[0])


# ------------------------------------------------------------------ P5 · charger range
IDEAL_ICON = {
    'Commercial': ('solution', 'commercial', '#16B14C'), 'Fleet': ('solution', 'fleet', '#59A986'),
    'Highway': ('ui', 'highway', '#D6F1DB'), 'Fleet Depots': ('ui', 'depot', '#71BF45'),
}


def p5_chargers():
    ch = C['chargers']
    sec = body.find(attrs={'data-cases': True})
    sec['id'] = 'chargers'
    sec['data-status'] = ch['status'].lower()
    feature = body.find(attrs={'data-feature': True})
    feature.insert_before(sec.extract())          # range before the process section (plan §3)

    panels = sec.select('[data-case-panel]')
    # section title + scroll-drawn Envizon mark
    title_bar = panels[0].find('div', recursive=False)
    set_heading(title_bar.find(attrs={'data-scroll-text': True}), ch['title'])
    p = PATHS['pill']
    pad = 8
    vb = f"{p['x0'] - pad} {p['y0'] - pad} {p['x1'] - p['x0'] + pad * 2} {p['y1'] - p['y0'] + pad * 2}"
    d = PATHS['pillShape'] + ' ' + PATHS['letters']
    old = title_bar.find('svg', recursive=False) or title_bar.find_all('svg')[-1]
    old.replace_with(frag(
        f'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="{vb}" class="w-[10vw] max-w-20 min-w-15 h-auto" '
        f'data-logo-progress aria-hidden="true"><path stroke="var(--color-white-3)" stroke-width="8" d="{d}"/>'
        f'<path data-draw stroke="var(--color-green-5)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" d="{d}"/></svg>')[0])

    for i, (panel, it) in enumerate(zip(panels, ch['items'])):
        panel['id'] = it['id']
        card = panel.find('div', class_='bg-white-2', recursive=False)
        media = card.find('a', recursive=False)
        contact_link(media, ch['cta']['type'])
        media['data-product'] = it['power']
        media['aria-label'] = f"Request a quote for the {it['power']} {it['name']}"
        img = media.find('img')
        img['src'] = it['image']
        img['alt'] = it['imageAlt']
        img['width'], img['height'] = '1672', '941'
        img['data-media'] = 'charger-render'
        # fade in once decoded (js/lazy-fade.js adds .lazyloaded) instead of popping in
        img['class'] = [c for c in img.get('class', []) if c != 'lazyloaded']
        info = card.find('div', class_='px-contain', recursive=False)
        info.find('span', class_='t-l-2').string = f'{i + 1:02d}'
        info.find('h3').string = it['power']
        info.find('p', class_='t-h-3').string = it['name']
        chips = info.find('div', class_='mt-2')
        chips.find('span').string = 'IDEAL FOR:'
        row_t = copy.copy(chips.find('div', recursive=False))
        for r in chips.find_all('div', recursive=False):
            r.decompose()
        for label in it['idealFor']:
            kind, name, color = IDEAL_ICON[label]
            row = copy.copy(row_t)
            tile = row.find('div')
            tile['style'] = f'background-color: {color};'
            set_html(tile.find('div'), icon_svg(kind, name, 'h-full w-full', '2.4' if kind == 'solution' else '1.6'))
            row.find('span').string = label
            chips.append(row)
        bottom = info.find('div', class_='mt-10', recursive=False)
        desc = bottom.find('p')
        desc.string = it['description']
        spec = copy.copy(desc)
        spec.string = it['specLine'] + ' · Price on quotation'
        spec['class'] = [c for c in spec['class'] if c != 'mb-4'] + ['mb-4', 'text-green-2']
        desc['class'] = [c for c in desc['class'] if c != 'mb-4'] + ['mb-2']
        desc.insert_after(spec)
        btn = bottom.find('a')
        contact_link(btn, ch['cta']['type'])
        btn['data-product'] = it['power']
        label_span = btn.find('span')
        set_html(label_span, f"{ch['cta']['label']}<span class=\"sr-only\"> for the {it['power']} {it['name']}</span>")


# ------------------------------------------------------------------ P6 · process carousel
STEP_ICON = {'consult': 'chat', 'feasibility': 'site', 'selection': 'sliders', 'installation': 'tools', 'monitoring': 'pulse'}
FADE_MOVE = 'opacity:0;transform:translateY(25px)'


def p6_process():
    pr = C['process']
    sec = body.find(attrs={'data-feature': True})
    sec['id'] = 'process'
    sec['data-status'] = pr['status'].lower()
    for wrap in sec.find_all(attrs={'data-scroll-text': True}):
        set_heading(wrap, pr['title'])
    for a in sec.find_all('a', string=re.compile('Book a Demo')):
        a.string = pr['cta']['label']
        contact_link(a, pr['cta']['type'])
    for b, label in ((sec.find(attrs={'data-prev': True}), 'Previous step'), (sec.find(attrs={'data-next': True}), 'Next step')):
        b.find('span').string = label

    track = sec.select_one('[data-embla] > div')
    items = track.find_all('div', attrs={'data-slot': 'carousel-item'}, recursive=False)
    tmpl = copy.copy(items[0])
    for it in items:
        it.decompose()
    for i, step in enumerate(pr['steps']):
        slide = copy.copy(tmpl)
        slide['aria-label'] = f"Step {i + 1} of {len(pr['steps'])}: {step['title']}"
        if step.get('status'):
            slide['data-status'] = step['status'].lower()
        card = slide.find('div')
        old_icon = card.find('svg')
        old_icon.replace_with(frag(
            '<span class="mb-8 flex size-27 items-center justify-center rounded-lg bg-green-5 p-6 text-green-1" aria-hidden="true">'
            + icon_svg('ui', STEP_ICON[step['key']], 'size-full', '1.25') + '</span>')[0])
        ps = card.find_all('p')
        ps[0].string = step['title']
        ps[1].string = step['description']
        track.append(slide)

    # left column: more breathing room, eyebrow + intro, and a clickable step list (md+) in the old gap
    col = sec.find('div', class_='md:max-w-92')
    col['class'] = col['class'] + ['ev-process-col']
    for wrap in sec.find_all(attrs={'data-scroll-text': True}):
        wrap.insert_before(frag(f'<span class="t-l-1 text-green-2 block" style="{FADE_MOVE}">{pr["eyebrow"]}</span>')[0])
        wrap.insert_after(frag(f'<p class="ev-process-intro t-b-1 text-pretty" style="{FADE_MOVE}">{pr["intro"]}</p>')[0])
    carousel = sec.find(attrs={'data-slot': 'carousel'})
    carousel['id'] = 'process-carousel'
    steps = ''.join(
        f'<li><button type="button" class="ev-step" data-step="{i}" aria-controls="process-carousel" '
        f'aria-label="Show step {i + 1}: {st["title"]}"><span class="ev-step__num t-l-1">{i + 1:02d}</span>'
        f'<span class="ev-step__title">{st["title"]}</span>'
        f'<span class="ev-step__more"><span><span class="ev-step__desc t-l-1">{st["description"]}</span>'
        '<span class="ev-step__bar" aria-hidden="true"><span data-step-progress></span></span></span></span></button></li>'
        for i, st in enumerate(pr['steps']))
    carousel.find_parent('div', class_='relative').insert_before(
        frag(f'<ol class="ev-steps" data-steps aria-label="Project steps" style="{FADE_MOVE}">{steps}</ol>')[0])
    dots_row = sec.select_one('[data-dot]').find_parent('div', class_='justify-between')
    dots_row['class'] = dots_row['class'] + ['ev-dots-row']

    dots = sec.select('[data-dot]')
    dot_wrap, d_t = dots[0].parent, copy.copy(dots[0])
    for d in dots:
        d.decompose()
    for i, step in enumerate(pr['steps']):
        d = copy.copy(d_t)
        d['data-dot'] = str(i)
        d['aria-label'] = f"Go to step {i + 1}: {step['title']}"
        dot_wrap.append(d)
    sec.find(attrs={'data-slot': 'carousel'})['aria-label'] = 'How a project works'


# ------------------------------------------------------------------ P7 · why / partners / faq
WHY_ARROW = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" '
             'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
             '<path d="M3 8h10M9 4l4 4-4 4"/></svg>')


def why_art():
    """Concentric Envizon pill outlines (static; the top-left corners show in the card)."""
    rings = []
    for i in range(5):
        o = i * 64
        x, y, w, h, rx = 40 + o, 40 + o, 1400 - o * 2, 1400 - o * 2, 260 - i * 36
        fill = ' class="ev-why-art__fill"' if i >= 3 else ''
        rings.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}"{fill}/>')
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" fill="none" aria-hidden="true">'
            f'<g class="ev-why-art__rings" stroke="currentColor" stroke-width="1">{"".join(rings)}</g></svg>')


def why_button(cta, extra=''):
    attrs = f'href="#contact" data-enquiry="{cta["type"]}"' if 'type' in cta else f'href="{cta["href"]}"'
    return f'<a {attrs} class="ev-why-btn t-l-1{extra}"><span>{cta["label"]}</span>{WHY_ARROW}</a>'


def p7_why():
    """Why Envizon as sticky stacked cards (the template family's /solutions pattern), dark surface."""
    w = C['why']
    process = body.find(attrs={'data-feature': True})
    # static noise texture (no animation, so each layer paints once instead of every step)
    noise = copy.copy(body.find('footer').find('div', attrs={'aria-hidden': 'true'}))
    noise['class'] = [c for c in noise['class'] if not c.startswith('animate-')]
    noise['class'] = [c if c != 'bg-green-5' else 'bg-green-7' for c in noise['class']]
    sec = frag(f'<section id="why" class="ev-why relative" data-why data-status="{w["status"].lower()}">'
               '<div class="ev-why-intro p-x-max"><div class="space-y-4">'
               f'<span class="t-l-1 text-green-2 block" style="{FADE_MOVE}">{w["eyebrow"]}</span>'
               f'<div class="relative" data-scroll-text><h2 class="t-h-2 md:t-h-3 max-w-sm text-balance">{w["title"]}</h2></div>'
               f'</div><div class="ev-why-intro__cta" style="{FADE_MOVE}">{why_button(w["cta"])}</div></div>'
               '<div class="ev-why-stack" data-why-stack></div></section>')[0]
    sec.insert(0, copy.copy(noise))
    stack = sec.find(attrs={'data-why-stack': True})
    items = w['items']
    rule = '<span class="ev-why-rule" data-why-rule aria-hidden="true"></span>'
    for i, it in enumerate(items):
        status = f' data-status="{it["status"].lower()}"' if it.get('status') else ''
        tiles = ''.join(
            f'<a href="#{o["anchor"]}" class="ev-why-tile{" is-active" if j == i else ""}" '
            f'aria-label="Jump to {o["title"]}"{" aria-current=\"true\"" if j == i else ""}>'
            + icon_svg('ui', o['icon'], 'size-full', '1.25') + '</a>' for j, o in enumerate(items))
        bullets = ''.join(f'<li><span class="ev-why-sq" aria-hidden="true"></span><span>{b}</span></li>' for b in it['bullets'])
        card = frag(
            f'<span id="{it["anchor"]}" class="ev-why-anchor" aria-hidden="true"></span>'
            f'<article class="ev-why-card p-x-max" data-why-card="{i}" aria-labelledby="why-t-{i}"{status}>'
            f'<div class="ev-why-tiles" style="{FADE_MOVE}">{tiles}</div>'
            f'<div class="ev-why-art" aria-hidden="true">{why_art()}</div>'
            f'<div class="ev-why-cell ev-why-num">{rule}<span class="t-l-1" style="{FADE_MOVE}">{i + 1:02d}</span></div>'
            f'<div class="ev-why-cell ev-why-title">{rule}<h3 id="why-t-{i}" class="t-h-2 md:t-h-3 text-balance" style="{FADE_MOVE}">{it["title"]}</h3></div>'
            f'<div class="ev-why-cell ev-why-body">{rule}'
            f'<p class="ev-why-headline t-h-3 text-balance" style="{FADE_MOVE}">{it["headline"]}</p>'
            f'<p class="t-b-1 text-pretty" style="{FADE_MOVE}">{it["body"]}</p>'
            f'<div class="ev-why-body__cta" style="{FADE_MOVE}">{why_button(it["cta"])}</div></div>'
            f'<div class="ev-why-cell ev-why-list">{rule}<ul class="t-l-1" style="{FADE_MOVE}">{bullets}</ul></div>'
            '<div class="ev-why-dim" data-why-dim aria-hidden="true"></div>'
            '</article>')
        stack.extend(card)
        stack.find_all('article')[-1].insert(0, copy.copy(noise))
    process.insert_after(sec)


def p7_partners():
    pt = C['partners']
    block = body.find(attrs={'data-closing': True})
    block['id'] = 'partners'
    block['data-status'] = pt['status'].lower()
    heading = block.find(attrs={'data-scroll-text': True})
    set_heading(heading, pt['title'])
    heading.insert_after(frag('<p class="ev-partners__sub t-b-1 max-w-sm text-balance">'
                              f'{pt["subtitle"]}</p>')[0])
    # background loop: teams at work on EV sites (Pexels stock, see content register); a scrim keeps text legible
    v = pt['video']
    block['class'] = block.get('class', []) + ['ev-partners']
    block.insert(0, frag(
        '<div class="ev-partners__media" aria-hidden="true">'
        f'<video muted loop playsinline preload="none" poster="{v["poster"]}" data-partners-video>'
        f'<source media="(max-width: 767px)" src="{v["mobile"]}" type="video/mp4">'
        f'<source src="{v["desktop"]}" type="video/mp4"></video>'
        '<div class="ev-partners__scrim"></div></div>')[0])
    a = block.find('div', class_='gap-4', recursive=False).find('a')
    a.string = pt['ctaPrimary']['label']
    contact_link(a, pt['ctaPrimary']['type'])
    # backdrop: Envizon pill outlines replace the template's octagon line art (same layers + loop motion)
    p = PATHS['pill']
    vb = f"{p['x0'] - 4} {p['y0'] - 4} {p['x1'] - p['x0'] + 8} {p['y1'] - p['y0'] + 8}"
    for layer in block.find(attrs={'data-octagons': True}).find_all('div', recursive=False):
        old = layer.find('svg')
        cls = ' '.join(c for c in old.get('class', []) if c != 'svg-octagon-single')
        old.replace_with(frag(f'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="{vb}" class="{cls}" aria-hidden="true">'
                              f'<path stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke" d="{PATHS["pillShape"]}"/></svg>')[0])
    # brochure button intentionally not rendered (BLOCKED until rights-checked)


def p7_faq():
    """FAQ as a centred stack: intro, numbered accordion cards, then a dark CTA panel."""
    fq = C['faq']
    footer = body.find('footer')
    noise = copy.copy(footer.find('div', attrs={'aria-hidden': 'true'}))
    noise['class'] = [c for c in noise['class'] if not c.startswith('animate-')]  # static texture over the photo
    panel_cta = fq['ctaPanel']
    sec = frag(f'<section id="faq" class="ev-faq py-section relative bg-white-2 border-t border-white-3" data-faq '
               f'data-status="{fq["status"].lower()}"><div class="p-x-max"><div class="ev-faq-wrap">'
               '<div class="ev-faq-intro">'
               f'<span class="t-l-1 text-green-2 block" style="{FADE_MOVE}">{fq["eyebrow"]}</span>'
               f'<div class="relative" data-scroll-text><h2 class="t-h-2 md:t-h-3 text-balance">{fq["title"]}</h2></div>'
               f'<p class="t-b-1 text-balance" style="{FADE_MOVE}">{fq["intro"]}</p></div>'
               '<div class="ev-faq-list" data-faq-list></div>'
               f'<div class="ev-faq-panel" style="{FADE_MOVE}">'
               '<span class="ev-faq-panel__mark" aria-hidden="true">' + logo_img('mark', 28) + '</span>'
               f'<div class="ev-faq-panel__copy"><p class="ev-faq-panel__title">{panel_cta["title"]}</p>'
               f'<p class="t-b-1 text-balance">{panel_cta["body"]}</p></div>'
               '<div class="ev-faq-panel__actions">'
               f'<a href="#contact" data-enquiry="{panel_cta["primary"]["type"]}" class="ev-btn-primary t-l-1">{panel_cta["primary"]["label"]}</a>'
               + why_button(panel_cta['secondary']) +
               '</div></div></div></div></section>')[0]
    panel = sec.find(class_='ev-faq-panel')
    panel.insert(0, noise)
    panel.insert(0, frag('<div class="ev-faq-panel__media" aria-hidden="true">'
                         '<img class="lazyloaded" src="assets/img/faq-cta.webp" alt="" width="1600" height="750" loading="lazy" decoding="async">'
                         '<div class="ev-faq-panel__scrim"></div></div>')[0])
    lst = sec.find(attrs={'data-faq-list': True})
    for i, it in enumerate(fq['items']):
        status = f' data-status="{it["status"].lower()}"' if it.get('status') else ''
        item = frag(f'<div class="ev-faq-item" data-faq-item data-state="closed" style="{FADE_MOVE}"{status}>'
                    f'<h3><button type="button" id="faq-q-{i}" aria-expanded="false" aria-controls="faq-a-{i}" '
                    f'data-state="closed" class="ev-faq-q"><span class="ev-faq-idx t-l-1">{i + 1:02d}</span>'
                    f'<span class="ev-faq-text">{it["q"]}</span>'
                    '<span class="ev-faq-icon" aria-hidden="true"><i></i><i></i></span></button></h3>'
                    f'<div id="faq-a-{i}" role="region" aria-labelledby="faq-q-{i}" hidden data-state="closed" '
                    'class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">'
                    f'<div class="ev-faq-a"><p class="t-b-1 text-pretty">{it["a"]}</p></div></div></div>')[0]
        lst.append(item)
    footer.insert_before(sec)


# ------------------------------------------------------------------ P8 · quote dialog
HALF = 'basis-[calc(50%-var(--gap-x)/2)]'
FIELDS = [
    # name, label, kind, width, required, extra
    ('EnquiryType', 'enquiry type', 'select', 'full', True, {}),
    ('FullName', 'full name', 'text', 'full', True, {'placeholder': 'Enter your full name', 'autocomplete': 'name'}),
    ('Phone', 'mobile', 'text', 'half', True, {'placeholder': '+91 98765 43210', 'type': 'tel', 'inputmode': 'tel', 'autocomplete': 'tel'}),
    ('Email', 'email', 'text', 'half', False, {'placeholder': 'name@company.com', 'type': 'email', 'autocomplete': 'email'}),
    ('Company', 'company / society', 'text', 'half', False, {'placeholder': 'Organisation name', 'autocomplete': 'organization'}),
    ('City', 'city', 'text', 'half', True, {'placeholder': 'Enter your city', 'autocomplete': 'address-level2'}),
    ('ChargerInterest', 'charger interest', 'select', 'full', False, {}),
    ('Requirement', 'your requirement', 'text', 'full', False, {'placeholder': 'Site type, number of vehicles, timeline…'}),
]


def p8_contact():
    ct = C['contact']
    root = body.find(id='contact-root')
    root['data-status'] = ct['status'].lower()
    # left panel
    left = root.find('div', class_='lg:flex')
    p = PATHS['pill']
    vb = f"{p['x0'] - 6} {p['y0'] - 6} {p['x1'] - p['x0'] + 12} {p['y1'] - p['y0'] + 12}"
    left.find('svg').replace_with(frag(
        f'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="{vb}" class="text-green-5 relative mb-auto w-full" aria-hidden="true">'
        f'<path stroke="currentColor" stroke-width="3" d="{PATHS["pillShape"]}"/><path stroke="currentColor" stroke-width="3" d="{PATHS["letters"]}"/></svg>')[0])
    left.find('h2').string = ct['title']
    left.find('p', attrs={'data-slot': 'dialog-description'}).string = ct['description']
    left.find_all('p')[-1].string = ct['note']
    for n in frag('<div class="mt-2" style="height:22px">' + logo_img('compact', 22, 'Envizon EV Solutions') + '</div>'):
        left.append(n)
    hdr = root.find('div', class_='mb-5.5')
    hdr.find('h2').string = ct['title']

    form = root.find('form')
    fields = form.find_all(attrs={'data-slot': 'field'})
    text_t = copy.copy(fields[0])
    select_t = copy.copy(fields[-1])
    holder = fields[0].parent
    for f in fields:
        f.decompose()
    for name, label, kind, width, required, extra in FIELDS:
        f = copy.copy(select_t if kind == 'select' else text_t)
        f['class'] = [c for c in f['class'] if c not in ('basis-full', HALF)] + [HALF if width == 'half' else 'basis-full']
        fid = f'{name}-field'
        lab = f.find('label')
        lab['for'] = fid
        lab.string = label
        lab['class'] = [c for c in lab['class'] if c not in ('gap-0', "after:content-['*']")] + (['gap-0', "after:content-['*']"] if required else [])
        if kind == 'select':
            btn = f.find('button')
            btn['id'] = fid
            btn['aria-controls'] = f'{fid}-list'
            btn.find('span').string = 'Select one'
            sel = f.find('select')
            sel['name'] = name
            sel.clear()
            opts = [(t['value'], t['label']) for t in ct['types']] if name == 'EnquiryType' else [(o, o) for o in ct['chargerInterest']]
            for v, t in opts:
                o = soup.new_tag('option', value=v)
                o.string = t
                sel.append(o)
        else:
            inp = f.find('input')
            inp['id'] = fid
            inp['name'] = name
            for k in ('type', 'inputmode', 'autocomplete', 'placeholder'):
                if k in extra:
                    inp[k] = extra[k]
                elif k != 'placeholder' and inp.has_attr(k):
                    del inp[k]
        if required:
            f['data-required'] = ''
        holder.append(f)

    # consent checkboxes + privacy note (replaces the template's SMS consent copy)
    legal = form.find('div', class_='mt-auto')
    set_html(legal,
             '<div class="ev-consent" data-consent>'
             f'<label class="ev-check"><input type="checkbox" name="ConsentContact" required> <span>{ct["consent"]}<span aria-hidden="true"> *</span></span></label>'
             f'<label class="ev-check"><input type="checkbox" name="ConsentMarketing"> <span>{ct["marketing"]}</span></label>'
             '</div>')
    submit = form.find('button', attrs={'type': 'submit'})
    submit.string = 'Send enquiry'


# ------------------------------------------------------------------ P10 · station locator (preview, mock data)
LOC_ICON = {
    'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    'locate': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
    'plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    'minus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    'close': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
}


def p10_locator():
    lc = C['locator']
    head = soup.head
    head.append(frag('<link rel="stylesheet" href="css/locator.css">')[0])
    crumbs = ''.join(f'<li>{c}</li>' for c in lc['breadcrumb'])
    sec = frag(
        f'<section id="stations" class="ev-locator" data-locator data-status="{lc["status"].lower()}" aria-label="{lc["title"]}">'
        '<div class="ev-map" data-map aria-hidden="true">'
        '<div class="ev-map__layer" data-map-layer>'
        '<img class="lazyloaded" alt="" decoding="async" loading="lazy" draggable="false"></div>'
        '<div class="ev-map__markers" data-markers></div></div>'
        f'<div class="ev-map__attr">{lc["attribution"]}</div>'
        '<div class="ev-locator__ui">'
        '<div class="ev-loc-side">'
        f'<label class="ev-loc-search ev-panel">{LOC_ICON["search"]}<span class="sr-only">Search stations</span>'
        f'<input type="search" data-station-search placeholder="{lc["searchPlaceholder"]}" autocomplete="off"></label>'
        f'<nav class="ev-loc-crumbs ev-panel" aria-label="Breadcrumb"><ol>{crumbs}</ol><h2>{lc["listTitle"]}</h2></nav>'
        '<div class="ev-loc-list" data-station-list data-lenis-prevent></div></div>'
        '<div class="ev-loc-controls">'
        f'<button type="button" class="ev-ctrl ev-ctrl--round ev-panel" data-locate aria-label="Show my location">{LOC_ICON["locate"]}</button>'
        '<div class="ev-zoom ev-panel">'
        f'<button type="button" class="ev-ctrl" data-zoom-in aria-label="Zoom in">{LOC_ICON["plus"]}</button>'
        f'<button type="button" class="ev-ctrl" data-zoom-out aria-label="Zoom out">{LOC_ICON["minus"]}</button></div></div>'
        '<aside class="ev-detail ev-panel" data-station-detail hidden aria-live="polite">'
        f'<button type="button" class="ev-detail__close" data-detail-close aria-label="Close station details">{LOC_ICON["close"]}</button>'
        '<div class="ev-detail__scroll" data-lenis-prevent><div data-detail-body></div></div>'
        '<div class="ev-detail__footer" data-detail-footer></div></aside>'
        '</div></section>')[0]
    hero = body.find(attrs={'data-hero': True})
    if lc.get('enabled', True):
        hero.insert_after(sec)                                        # directly below the hero
        return
    # hidden by request: keep the markup in the page as an HTML comment (no CSS, initLocator() no-ops)
    head.find('link', href='css/locator.css').decompose()
    markup = str(sec).replace('--', '- -')
    hero.insert_after(Comment(f' SECTION 2 · #stations: {lc["hiddenNote"]}\n{markup}\n'))


# ------------------------------------------------------------------ run
p1_head()
p2_header()
p2_mobile_menu()
p2_footer()
p3_hero()
p3_brands()
p4_solutions()
p5_chargers()
p6_process()
p7_why()
p7_partners()
p7_faq()
p8_contact()
p10_locator()

# runtime data for JS: only what the browser needs (no internal notes / blocked lists)
SITE = {
    'solutions': [{k: it[k] for k in ('title', 'subtitle', 'icon', 'color', 'type')} for it in C['solutions']['items']],
    'processSteps': [s['key'] for s in C['process']['steps']],
    'contactSuccess': C['contact']['success'],
}
(ROOT / 'js/data/site.json').write_text(json.dumps(SITE, ensure_ascii=False, indent=1), encoding='utf-8')

# production build: drop review-only status markers (?review outlines) from the markup
if '--production' in sys.argv:
    for el in soup.select('[data-status]'):
        del el['data-status']

html = str(soup)
assert 'viewBox' in html
OUT.write_text(html, encoding='utf-8')
left = sorted(set(re.findall(r'Envizzon EV\.com[^"\s<]*', html)))
print('wrote index.html', len(html), 'bytes; remaining Envizzon EV links:', len(left))
