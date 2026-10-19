"""
Builds index.html from the hydrated live DOM captured during the preloader
(reference/dom/initial-1440.html). Every element keeps the exact markup/classes of
the original (so the compiled Tailwind CSS lays it out identically) and its initial
animation state; React/Next runtime, analytics and remote URLs are stripped.

run:  <venv python> tools/build_html.py
"""
import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'reference/dom/initial-1440.html'
MENU = ROOT / 'reference/dom/mobile-menu.html'
CONTACT = ROOT / 'reference/dom/contact.html'
OUT = ROOT / 'index.html'
LIVE = 'https://www.Envizzon EV.com'

html = SRC.read_text(encoding='utf-8')
soup = BeautifulSoup(html, 'html5lib')

# ---------------------------------------------------------------- runtime CSS
runtime_css = []
for st in soup.head.find_all('style'):
    txt = st.get_text()
    if 'rfm-marquee' in txt or 'sonner' in txt.lower():
        continue  # marquee -> css/marquee.css, sonner not used
    if txt.strip():
        runtime_css.append(txt)
(ROOT / 'css/runtime.css').write_text(
    '/* <style> tags injected at runtime on the live page */\n' + '\n'.join(runtime_css), encoding='utf-8')

body = soup.body

# ---------------------------------------------------------------- strip runtime
for t in body.find_all(['script', 'next-route-announcer', 'template', 'noscript', 'link', 'style']):
    t.decompose()
for c in body.find_all(string=lambda s: isinstance(s, Comment)):
    c.extract()
for d in body.find_all('div', attrs={'hidden': True}, recursive=False):
    d.decompose()
for s in body.find_all('section', recursive=False):
    if not s.contents:
        s.decompose()
for el in body.select('[data-slot="progress"]'):
    el.decompose()
for el in body.select('[id^="enzuzo"], [class*="enzuzo"]'):
    el.decompose()


def cls(el):
    return el.get('class') or []


def has(el, *names):
    c = cls(el)
    return all(n in c for n in names)


def set_style(el, style):
    if style:
        el['style'] = style
    elif el.has_attr('style'):
        del el['style']


# ---------------------------------------------------------------- links
def rewrite_href(a):
    href = a.get('href')
    if not href:
        return
    if href in ('/#contact', '#contact'):
        a['href'] = '#contact'
    elif href == '/':
        a['href'] = './'
    elif href.startswith('/') and not href.startswith('//'):
        a['href'] = LIVE + href
        a['target'] = '_blank'
        a['rel'] = 'noopener noreferrer'


for a in body.find_all('a'):
    rewrite_href(a)

# ---------------------------------------------------------------- preloader
pre = body.find('div', class_='z-9999')
pre['id'] = 'preloader'
clip = pre.find('div', recursive=False)
clip['id'] = 'preloader-clip'
clip['style'] = ('clip-path:polygon(0% 0%, 0% 100%, 50% 100%, 50% 50%, 50% 50%, 50% 50%, '
                 '50% 50%, 50% 100%, 100% 100%, 100% 0%)')
kids = clip.find_all('div', recursive=False)
kids[1]['id'] = 'preloader-fill'
kids[1]['style'] = 'transform:scale(0)'
kids[2]['id'] = 'preloader-logo'
kids[2]['style'] = 'opacity:1;transform:none'
kids[2].clear()
kids[2].append(soup.new_tag('div', attrs={'id': 'preloader-lottie'}))

# ---------------------------------------------------------------- header
header = body.find('header')
header['id'] = 'site-header'
header['style'] = 'transform:translateY(-100%)'
toggle = header.find('button', attrs={'data-slot': 'dropdown-menu-trigger'})
toggle['id'] = 'menu-toggle'
toggle['data-state'] = 'closed'
toggle['aria-expanded'] = 'false'
toggle['aria-controls'] = 'mobile-menu'
toggle['class'] = [c for c in cls(toggle)]

# ---------------------------------------------------------------- main
main = body.find('main')
main['style'] = 'opacity:0'
sections = main.find_all('section', recursive=False)
hero, trusted, solutions, feature, cases = sections[:5]

# hero
hero['data-hero'] = ''
media = hero.find('div', recursive=False)
media['data-hero-media'] = ''
media['style'] = 'transform:scale(1.1)'
video_box = media.find('div', attrs={'data-can-autoplay': True})
video = video_box.find('video')
for el in list(video_box.find_all(recursive=False)):
    if el is not video:
        el.decompose()
video['poster'] = 'assets/img/hero-poster.webp'
video['class'] = ['size-full', 'object-cover']
video['autoplay'] = ''
video['data-hero-video'] = ''
video.clear()
video.append(soup.new_tag('source', attrs={'src': 'assets/video/hero-960.mp4', 'type': 'video/mp4', 'media': '(max-width:640px)'}))
video.append(soup.new_tag('source', attrs={'src': 'assets/video/hero-1920.mp4', 'type': 'video/mp4'}))
del video_box['data-can-autoplay']

logo = hero.find('svg', class_='w-20')
logo['data-hero-logo'] = ''
logo['style'] = 'transform:scale(0)'
hero.find('h1')['data-hero-part'] = 'titleLeft'
h2 = hero.find('h2')
h2['data-hero-part'] = 'titleRight'
hr = hero.find('hr')
hr['data-hero-line'] = ''
p_left = hero.find('p', class_='md:col-span-3')
spans = p_left.find_all('span', recursive=False)
spans[0]['data-hero-part'] = 'descriptionLeft'
spans[1]['data-hero-part'] = 'descriptionRight'
hero.find('p', class_='max-w-xs')['data-hero-part'] = 'descriptionCenter'
last_p = hero.find('p', class_='md:-col-end-1')
last_p.find('span')['data-hero-part'] = 'descriptionRight'
cta = hero.find('div', class_='w-fit')
cta['data-hero-cta'] = ''
cta['style'] = 'transform:scale(0)'
for el in hero.select('[data-hero-part]'):
    el['style'] = 'opacity:0;transform:translateY(-100%)' if el['data-hero-part'].startswith('desc') else 'opacity:0;transform:translateY(100%)'

# ---------------------------------------------------------------- img sources
IMG = {
    'Standard Bots': 'assets/img/logo-standard-bots.png',
    'AnySignal': 'assets/img/logo-anysignal.png',
    'AdvancedPCB': 'assets/img/logo-advancedpcb.png',
    'Farcast': 'assets/img/logo-farcast.png',
    'Nautilus Defense': 'assets/img/logo-nautilus.png',
    'Stoke': 'assets/img/logo-stoke.png',
    'Reliable Robotics': 'assets/img/logo-reliable-robotics.png',
    'Stoke Space': 'assets/img/case-stoke.webp',
    'Neros Drones': 'assets/img/case-neros.webp',
    'How Salient Motion Reduced their Production Cycles to 3 Weeks with Envizzon EV image': 'assets/img/case-salient.webp',
}
for img in body.find_all('img'):
    alt = img.get('alt', '')
    if alt not in IMG:
        print('WARN unknown img', alt, file=sys.stderr)
        continue
    img['src'] = IMG[alt]
    for a in ('srcset', 'sizes', 'data-nimg', 'role'):
        if img.has_attr(a):
            del img[a]
    img['class'] = [c for c in cls(img) if c not in ('lazyload', 'loading')] + ['lazyloaded']
    img['style'] = 'color:transparent'

# ---------------------------------------------------------------- marquee
mq = trusted.find('div', class_='rfm-marquee-container')
mq['data-marquee'] = '50'
marquees = mq.find_all('div', class_='rfm-marquee', recursive=False)
first = marquees[0]
inner = first.find('div', class_='rfm-initial-child-container')
children = inner.find_all('div', class_='rfm-child', recursive=False)
# keep one unique set of logos (autoFill multiplies them at runtime)
seen, unique = [], []
for ch in children:
    key = ch.get_text(strip=True) + (ch.find('img')['alt'] if ch.find('img') else '') + (str(ch.find('svg'))[:200] if ch.find('svg') else '')
    if key in seen:
        break
    seen.append(key)
    unique.append(ch)
for ch in children:
    if ch not in unique:
        ch.decompose()
for m in marquees[1:]:
    m.decompose()
for el in first.find_all(recursive=False):
    if el is not inner:
        el.decompose()
first['style'] = '--play: running; --direction: normal; --duration: 60s; --delay: 0s; --iteration-count: infinite; --min-width: 100%;'
print('marquee logos:', len(unique))

# ---------------------------------------------------------------- scroll-text headings
for wrap in main.find_all('div', class_='relative'):
    if wrap.get('class') == ['relative'] and len(wrap.find_all(recursive=False)) == 1 and wrap.find('h2', recursive=False):
        wrap['data-scroll-text'] = ''

# ---------------------------------------------------------------- solution cards
solutions['data-solutions'] = ''
for i, a in enumerate(solutions.select('a.group')):
    a['data-solution-card'] = str(i)

# ---------------------------------------------------------------- results / feature
feature['data-feature'] = ''
panel = feature.find('div', class_='p-center')
panel['data-infographic'] = ''
panel['style'] = 'opacity:0'
panel.clear()
feature.find('div', class_='aspect-10/9')['data-feature-stage'] = ''
viewport = feature.find('div', attrs={'data-slot': 'carousel-content'})
viewport['data-embla'] = ''
viewport['class'] = ['overflow-hidden']
del viewport['style']
container = viewport.find('div', recursive=False)
del container['style']
for item in container.find_all('div', attrs={'data-slot': 'carousel-item'}, recursive=False):
    if item.has_attr('style'):
        del item['style']
    item['class'] = [c for c in cls(item) if c != 'is-snapped']
dots = feature.select('button[aria-label^="Navigate to slide"]')
for b in dots:
    b.clear()
    b['style'] = 'width: 8px;'
    b['data-dot'] = b['aria-label'].split()[-1]
nf = feature.find('number-flow-react')
counter = soup.new_tag('span', attrs={'class': nf.get('class'), 'data-counter': '', 'aria-hidden': 'true'})
counter.string = '01'
nf.replace_with(counter)
feature.find('button', attrs={'data-slot': 'carousel-previous'})['data-prev'] = ''
feature.find('button', attrs={'data-slot': 'carousel-next'})['data-next'] = ''

# ---------------------------------------------------------------- case studies
cases['data-cases'] = ''
stack = cases.find('div', recursive=False)
stack['data-cases-stack'] = ''
for i, panel in enumerate(stack.find_all('div', class_='sticky', recursive=False)):
    panel['data-case-panel'] = str(i)
    ov = panel.find('div', class_='bg-green-7')
    if ov:
        ov['data-case-overlay'] = ''
        ov['style'] = 'opacity:0'
progress_svg = cases.find('svg', attrs={'viewbox': '0 0 82 82'}) or cases.find('svg', attrs={'viewBox': '0 0 82 82'})
if progress_svg:
    progress_svg['data-logo-progress'] = ''
    paths = progress_svg.find_all('path')
    if len(paths) > 1:
        paths[1]['data-draw'] = ''
        if paths[1].has_attr('style'):
            del paths[1]['style']

# ---------------------------------------------------------------- closing CTA (sibling after main)
cta_block = main.find_next_sibling('div')
cta_block['data-closing'] = ''
octa = cta_block.find('div', class_='p-center')
octa['data-octagons'] = ''
for d in octa.find_all('div', recursive=False):
    d['style'] = ''
    del d['style']
for span in cta_block.find_all('span', class_='js-scroll-text-word-span'):
    span.unwrap()
h2c = cta_block.find('h2')
h2c.string = h2c.get_text()
h2c.parent['data-scroll-text'] = ''

# ---------------------------------------------------------------- footer
footer = body.find('footer')
footer['data-footer'] = ''
lot = footer.find('div', class_='size-[115%]')
lot['data-footer-lottie'] = ''
lot.clear()
sol = footer.find('h3', string=re.compile('Our Solutions')).parent
sol['data-footer-solutions'] = ''
banner = footer.find('div', class_='bg-blue')
banner['data-footer-banner'] = ''
for hr_el in footer.find_all('hr'):
    if hr_el.get('style') and '--l-dynamic-hr-width' in hr_el['style']:
        hr_el['style'] = '--l-dynamic-hr-width:0px;clip-path:polygon(100% 100%, 100% 100%, 100% 0, 100% 0)'
        hr_el['data-dynamic-hr'] = ''

# ---------------------------------------------------------------- mobile menu (Radix dropdown)
menu_soup = BeautifulSoup(MENU.read_text(encoding='utf-8'), 'html5lib')
wrapper = menu_soup.body.find('div')
wrapper['id'] = 'mobile-menu-wrapper'
wrapper['style'] = 'position: fixed; left: 0px; top: 0px; min-width: max-content; z-index: 50; --radix-popper-transform-origin: 100% 0px;'
wrapper['hidden'] = ''
content = wrapper.find('div', attrs={'data-slot': 'dropdown-menu-content'})
content['id'] = 'mobile-menu'
content['data-state'] = 'closed'
for k in ('aria-labelledby',):
    if content.has_attr(k):
        del content[k]
SUB = {
    'Solutions': [('Compliance and Traceability', LIVE + '/compliance-and-traceability')],
    'Platform': [('Product Tours', LIVE + '/product-tours')],
    'Resources': [('Case Studies', LIVE + '/resources?type=case-studies#content'), ('Articles', LIVE + '/resources?type=articles#content')],
}
for item in content.find_all('li', attrs={'data-slot': 'accordion-item'}):
    label = item.find('a').get_text(strip=True)
    region = item.find('div', attrs={'data-slot': 'accordion-content'})
    ul = menu_soup.new_tag('ul')
    for text, href in SUB.get(label, []):
        li = menu_soup.new_tag('li', attrs={'class': 't-b-2 font-normal!'})
        a = menu_soup.new_tag('a', attrs={'class': 'block pb-2', 'href': href, 'target': '_blank', 'rel': 'noopener noreferrer'})
        a.string = text
        li.append(a)
        ul.append(li)
    region.append(ul)
for a in content.find_all('a'):
    rewrite_href(a)
body.append(wrapper)

# ---------------------------------------------------------------- contact dialog
contact_soup = BeautifulSoup('<div id="contact-root" hidden>' + CONTACT.read_text(encoding='utf-8') + '</div>', 'html5lib')
root = contact_soup.body.find('div', id='contact-root')
for el in root.select('[data-state]'):
    el['data-state'] = 'closed'
for el in root.find_all(attrs={'style': True}):
    if 'pointer-events' in el['style']:
        del el['style']
for a in root.find_all('a'):
    rewrite_href(a)
form = root.find('form')
if form:
    form['data-contact-form'] = ''
    form['novalidate'] = ''
    if form.has_attr('action'):
        del form['action']
body.append(root)

# ---------------------------------------------------------------- normalise <html>/<head>
out = BeautifulSoup('<!doctype html><html lang="en"><head></head><body></body></html>', 'html5lib')
out.html['class'] = ['relative', 'font-vars', 'overflow-hidden']
out.html['data-scroll-behavior'] = 'smooth'
head = out.head
head.append(BeautifulSoup('''
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Envizzon EV | Full-Service Procurement Automation for Electronics</title>
<meta name="description" content="Upload your BOM. Envizzon EV's AI sources parts, negotiates pricing, and our warehouses store, kit, and ship them—no upfront costs, full procurement execution.">
<meta name="robots" content="noindex, nofollow">
<meta property="og:title" content="Envizzon EV | Full-Service Procurement Automation for Electronics">
<meta property="og:image" content="assets/img/og.jpg">
<link rel="icon" href="assets/img/favicon.png" type="image/png">
<link rel="stylesheet" href="css/fonts.css">
<link rel="stylesheet" href="css/Envizzon EV.css">
<link rel="stylesheet" href="css/runtime.css">
<link rel="stylesheet" href="css/marquee.css">
<link rel="stylesheet" href="css/overrides.css">
''', 'html.parser'))
for el in list(body.contents):
    out.body.append(el)
script = out.new_tag('script', attrs={'type': 'module', 'src': '/js/main.js'})
out.body.append(script)

text = str(out)
# html5lib lowercases nothing inside svg, but make sure viewBox survived
assert 'viewBox' in text, 'svg viewBox lost'
text = text.replace('<html', '<html', 1)
OUT.write_text(text, encoding='utf-8')
print('wrote', OUT, len(text), 'bytes')
