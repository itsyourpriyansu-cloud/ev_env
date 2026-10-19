// STATIC extraction (no code execution) of the four "Results" infographics from the
// live bundle. Parses the minified module with acorn and evaluates only literal
// data (JSX call trees, object/array literals, stagger() calls) to produce:
//   - exact SVG markup (motion `initial` -> data-initial attribute)
//   - the Motion animation sequence each infographic plays on mount
// Output: js/data/infographics.js
import fs from 'node:fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

const src = fs.readFileSync('reference/js/50b053bcb0308ac4.js', 'utf8');
const start = src.lastIndexOf('"use strict"', src.indexOf('comparativeGrowthPlot'));
const end = src.indexOf('e.s(["default",()=>X],380076)', start);
const code = 'function __module(e){' + src.slice(start, end) + '}';
const ast = acorn.parse(code, { ecmaVersion: 'latest' });
const fnBody = ast.body[0].body.body;

// module-scope declarations
const decls = new Map();
for (const st of fnBody) {
  if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') decls.set(d.id.name, d.init);
  if (st.type === 'FunctionDeclaration') decls.set(st.id.name, st);
}

const UNKNOWN = Symbol('unknown');
const cache = new Map();

function evalNode(n) {
  if (!n) return undefined;
  switch (n.type) {
    case 'Literal': return n.value;
    case 'TemplateLiteral': return n.expressions.length ? UNKNOWN : n.quasis.map((q) => q.value.cooked).join('');
    case 'ArrayExpression': return n.elements.map(evalNode);
    case 'ObjectExpression': {
      const o = {};
      for (const p of n.properties) {
        if (p.type === 'SpreadElement') { Object.assign(o, evalNode(p.argument)); continue; }
        const key = p.key.type === 'Identifier' && !p.computed ? p.key.name : evalNode(p.key);
        o[key] = evalNode(p.value);
      }
      return o;
    }
    case 'UnaryExpression': {
      if (n.operator === 'void') return undefined;
      const v = evalNode(n.argument);
      return n.operator === '-' ? -v : n.operator === '!' ? !v : n.operator === '+' ? +v : UNKNOWN;
    }
    case 'BinaryExpression': {
      const a = evalNode(n.left), b = evalNode(n.right);
      switch (n.operator) { case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': return a / b; default: return UNKNOWN; }
    }
    case 'Identifier': {
      if (n.name === 'undefined') return undefined;
      if (cache.has(n.name)) return cache.get(n.name);
      const d = decls.get(n.name);
      if (!d) return UNKNOWN;
      if (d.type === 'FunctionDeclaration') return { __component: n.name };
      const v = evalNode(d);
      cache.set(n.name, v);
      return v;
    }
    case 'MemberExpression': {
      // h.motion.path -> motion component; t.Fragment
      if (n.object.type === 'MemberExpression' && n.object.property.name === 'motion') return { __motion: n.property.name };
      if (n.property.name === 'Fragment') return '__fragment';
      return UNKNOWN;
    }
    case 'CallExpression': {
      const c = n.callee;
      // (0, t.jsx)(type, props)
      if (c.type === 'SequenceExpression') {
        const fn = c.expressions[c.expressions.length - 1];
        const name = fn.property && fn.property.name;
        if (name === 'jsx' || name === 'jsxs') return { type: evalNode(n.arguments[0]), props: evalNode(n.arguments[1]) || {} };
        if (name === 'cn') return n.arguments.map(evalNode).filter((x) => typeof x === 'string' && x).join(' ');
        return UNKNOWN;
      }
      if (c.type === 'Identifier' && c.name === 'C') {
        const [each, opts] = n.arguments.map(evalNode);
        return { __stagger: each ?? 0.1, ...(opts || {}) };
      }
      return UNKNOWN;
    }
    case 'ConditionalExpression': {
      const t = evalNode(n.test);
      return t === UNKNOWN ? UNKNOWN : t ? evalNode(n.consequent) : evalNode(n.alternate);
    }
    case 'LogicalExpression': {
      const a = evalNode(n.left);
      if (n.operator === '&&') return a ? evalNode(n.right) : a;
      if (n.operator === '||') return a || evalNode(n.right);
      return a ?? evalNode(n.right);
    }
    default: return UNKNOWN;
  }
}

// find the JSX tree + animate([...]) sequence inside a component function
function analyseComponent(name) {
  const fn = decls.get(name);
  let tree = null, seq = null;
  walk.simple(fn, {
    CallExpression(n) {
      if (!seq && n.callee.type === 'Identifier' && n.callee.name === 'a' && n.arguments[0]?.type === 'ArrayExpression') seq = evalNode(n.arguments[0]);
    },
  });
  const ret = fn.body.body.find((s) => s.type === 'ReturnStatement');
  const arg = ret.argument;
  const last = arg.type === 'SequenceExpression' ? arg.expressions[arg.expressions.length - 1] : arg;
  tree = evalNode(last);
  return { tree, seq };
}

const KEEP = new Set(['viewBox', 'gradientUnits', 'gradientTransform', 'maskUnits', 'patternUnits', 'preserveAspectRatio', 'clipPathUnits', 'maskContentUnits']);
const kebab = (k) => (KEEP.has(k) ? k : k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const unknowns = [];

function render(n, ctxProps) {
  if (n == null || n === false || n === true) return '';
  if (n === UNKNOWN) { unknowns.push('node'); return ''; }
  if (Array.isArray(n)) return n.map((c) => render(c, ctxProps)).join('');
  if (typeof n !== 'object') return esc(n);
  const { type, props } = n;
  const { children, ...rest } = props;
  if (type === '__fragment') return render(children);
  let tag = type && type.__motion ? type.__motion : type;
  if (typeof tag !== 'string') { unknowns.push(JSON.stringify(type)); return ''; }
  let attrs = '';
  for (const [k, v] of Object.entries(rest)) {
    if (v == null || k === 'ref' || k === 'key') continue;
    if (v === UNKNOWN) { unknowns.push(`${tag}.${k}`); continue; }
    if (['initial', 'animate', 'transition', 'variants', 'exit'].includes(k)) { attrs += ` data-${k}="${esc(JSON.stringify(v))}"`; continue; }
    if (k === 'className') { attrs += ` class="${esc(v)}"`; continue; }
    if (k === 'style' && typeof v === 'object') { attrs += ` style="${esc(Object.entries(v).map(([a, b]) => `${kebab(a)}:${b}`).join(';'))}"`; continue; }
    attrs += ` ${kebab(k)}="${esc(v)}"`;
  }
  return `<${tag}${attrs}>${render(children)}</${tag}>`;
}

const names = { comparativeGrowthPlot: 'T', acceleratedProcessDiagram: 'k', relativeScaleDiagram: 'P', reducedDelayDiagram: 'I' };
const out = {};
for (const [name, fn] of Object.entries(names)) {
  const { tree, seq } = analyseComponent(fn);
  out[name] = { svg: render(tree), sequence: seq };
  console.log(name, 'svg', out[name].svg.length, 'steps', seq?.length);
}
if (unknowns.length) console.log('UNRESOLVED:', [...new Set(unknowns)].slice(0, 20));

fs.mkdirSync('js/data', { recursive: true });
fs.writeFileSync('js/data/infographics.js',
  '// Generated by tools/extract-infographics.mjs (static AST extraction from the live bundle) — do not edit.\n' +
  'export const INFOGRAPHICS = ' + JSON.stringify(out, null, 1) + ';\n');
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v.sequence));
