"""Checks that utility classes toggled by our JS exist in the compiled CSS."""
import re
import sys
from pathlib import Path

css = Path(__file__).resolve().parent.parent.joinpath('css/Envizzon EV.css').read_text(encoding='utf-8')


def esc(c):
    out = ''
    for i, ch in enumerate(c):
        if ch.isalnum() or ch in '-_':
            out += ch
        else:
            out += '\\' + ch
    # leading digit escape (e.g. 2xl:) is \32 xl
    if out[0].isdigit():
        out = '\\3' + out[0] + ' ' + out[1:]
    return '.' + out


classes = sys.argv[1:] or [
    'translate-x-5', 'opacity-0', 'opacity-100', 'translate-x-0', 'transition-[translate,opacity]',
    'will-change-[opacity,translate]', 'duration-500', 'ease-in-out', 'inline-block',
    '-translate-y-[calc(var(--l-card-btn-h)+var(--l-card-btn-gap))]', 'delay-50', 'duration-200',
    'data-[state=open]:animate-in', 'data-[state=open]:zoom-in-95', 'data-[side=bottom]:slide-in-from-top-2',
    'data-[state=closed]:fade-out-0', 'data-[state=open]:animate-accordion-down', 'data-[state=closed]:animate-accordion-up',
    'text-foreground-muted', 'pointer-events-auto', 'group-data-[state=open]:rotate-45',
    'max-lg:left-[55%]', 'max-lg:h-[160%]', 'max-lg:w-[160%]', 'max-lg:h-[150%]', 'max-md:left-[52%]',
    'h-[150%]', 'h-[200%]', 'h-[140%]', 'text-green-4', 'w-auto', 'shrink-0',
    'origin-left!', 'origin-top-left!', 'origin-bottom-right!', 'origin-right!', 'hover:text-green-5',
    'is-active', 'z-overlay', 'z-dialog', 'lenis', 'text-3xl', 'font-medium', 'lg:text-lg', 'lg:h-[56px]',
]
missing = []
for c in classes:
    if esc(c) not in css:
        missing.append(c)
print('missing:', missing if missing else 'none')
