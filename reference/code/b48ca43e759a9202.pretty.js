(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 627230, t => {
 "use strict";
 var e = t.i(843476),
  n = t.i(271645);
 let i = (t, e, n) => {
   let i = document.createElement(t),
    [r, o] = Array.isArray(e) ? [void 0, e] : [e, n];
   return r && Object.assign(i, r), null == o || o.forEach(t => i.appendChild(t)), i
  },
  r = String.raw,
  o = (() => {
   try {
    document.createElement("div").animate({
     opacity: 0
    }, {
     easing: "linear(0, 1)"
    })
   } catch {
    return !1
   }
   return !0
  })(),
  s = "u" > typeof CSS && CSS.supports && CSS.supports("line-height", "mod(1,1)"),
  a = "u" > typeof matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null,
  l = "--_number-flow-d-opacity",
  u = "--_number-flow-d-width",
  c = "--_number-flow-dx",
  d = "--_number-flow-d",
  f = (() => {
   try {
    return CSS.registerProperty({
     name: l,
     syntax: "<number>",
     inherits: !1,
     initialValue: "0"
    }), CSS.registerProperty({
     name: c,
     syntax: "<length>",
     inherits: !0,
     initialValue: "0px"
    }), CSS.registerProperty({
     name: u,
     syntax: "<number>",
     inherits: !1,
     initialValue: "0"
    }), CSS.registerProperty({
     name: d,
     syntax: "<number>",
     inherits: !0,
     initialValue: "0"
    }), !0
   } catch {
    return !1
   }
  })(),
  p = "var(--number-flow-char-height, 1em)",
  h = "var(--number-flow-mask-height, 0.25em)",
  m = `calc(${h} / 2)`,
  g = "var(--number-flow-mask-width, 0.5em)",
  v = `calc(${g} / var(--scale-x))`,
  y = "#000 0, transparent 71%",
  b = r`:host{display:inline-block;direction:ltr;white-space:nowrap;isolation:isolate;line-height:${p} !important}.number,.number__inner{display:inline-block;transform-origin:left top}:host([data-will-change]) :is(.number,.number__inner,.section,.digit,.digit__num,.symbol){will-change:transform}.number{--scale-x:calc(1 + var(${u}) / var(--width));transform:translateX(var(${c})) scaleX(var(--scale-x));margin:0 calc(-1 * ${g});position:relative;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${v},#000 calc(100% - ${v}),transparent ),linear-gradient(to bottom,transparent 0,#000 ${h},#000 calc(100% - ${h}),transparent 100% ),radial-gradient(at bottom right,${y}),radial-gradient(at bottom left,${y}),radial-gradient(at top left,${y}),radial-gradient(at top right,${y});-webkit-mask-size:100% calc(100% - ${h} * 2),calc(100% - ${v} * 2) 100%,${v} ${h},${v} ${h},${v} ${h},${v} ${h};-webkit-mask-position:center,center,top left,top right,bottom right,bottom left;-webkit-mask-repeat:no-repeat}.number__inner{padding:${m} ${g};transform:scaleX(calc(1 / var(--scale-x))) translateX(calc(-1 * var(${c})))}:host > :not(.number){z-index:5}.section,.symbol{display:inline-block;position:relative;isolation:isolate}.section::after{content:'\200b';display:inline-block}.section--justify-left{transform-origin:center left}.section--justify-right{transform-origin:center right}.section > [inert],.symbol > [inert]{margin:0 !important;position:absolute !important;z-index:-1}.digit{display:inline-block;position:relative;--c:var(--current) + var(${d})}.digit__num,.number .section::after{padding:${m} 0}.digit__num{display:inline-block;--offset-raw:mod(var(--length) + var(--n) - mod(var(--c),var(--length)),var(--length));--offset:calc( var(--offset-raw) - var(--length) * round(down,var(--offset-raw) / (var(--length) / 2),1) );--y:clamp(-100%,var(--offset) * 100%,100%);transform:translateY(var(--y))}.digit__num[inert]{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(var(--y))}.digit:not(.is-spinning) .digit__num[inert]{display:none}.symbol__value{display:inline-block;mix-blend-mode:plus-lighter;white-space:pre}.section--justify-left .symbol > [inert]{left:0}.section--justify-right .symbol > [inert]{right:0}.animate-presence{opacity:calc(1 + var(${l}))}`,
  w = HTMLElement,
  x = (r`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:${p} !important}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${m} 0}.symbol{white-space:pre}`, s && o && f);
 class E extends w {
  constructor() {
   super(), this.created = !1, this.batched = !1;
   const {
    animated: t,
    ...e
   } = this.constructor.defaultProps;
   this._animated = this.computedAnimated = t, Object.assign(this, e)
  }
  get animated() {
   return this._animated
  }
  set animated(t) {
   var e;
   this.animated !== t && (this._animated = t, null == (e = this.shadowRoot) || e.getAnimations().forEach(t => t.finish()))
  }
  set data(t) {
   var e;
   if (null == t) return;
   let {
    pre: n,
    integer: i,
    fraction: r,
    post: o,
    value: s
   } = t;
   if (this.created) {
    let l = this._data;
    this._data = t, this.computedTrend = "function" == typeof this.trend ? this.trend(l.value, s) : this.trend, this.computedAnimated = x && this._animated && (!this.respectMotionPreference || !(null != a && a.matches)) && this.offsetWidth > 0 && this.offsetHeight > 0, null == (e = this.plugins) || e.forEach(e => {
     var n;
     return null == (n = e.onUpdate) ? void 0 : n.call(e, t, l, this)
    }), this.batched || this.willUpdate(), this._pre.update(n), this._num.update({
     integer: i,
     fraction: r
    }), this._post.update(o), this.batched || this.didUpdate()
   } else {
    this._data = t, this.attachShadow({
     mode: "open"
    });
    try {
     this._internals ?? (this._internals = this.attachInternals()), this._internals.role = "img"
    } catch {}
    let e = document.createElement("style");
    e.textContent = b, this.shadowRoot.appendChild(e), this._pre = new C(this, n, {
     justify: "right",
     part: "left"
    }), this.shadowRoot.appendChild(this._pre.el), this._num = new S(this, i, r), this.shadowRoot.appendChild(this._num.el), this._post = new C(this, o, {
     justify: "left",
     part: "right"
    }), this.shadowRoot.appendChild(this._post.el), this.created = !0
   }
   try {
    this._internals.ariaLabel = t.valueAsString
   } catch {}
  }
  willUpdate() {
   this._pre.willUpdate(), this._num.willUpdate(), this._post.willUpdate()
  }
  didUpdate() {
   if (!this.computedAnimated) return;
   this._abortAnimationsFinish ? this._abortAnimationsFinish.abort() : this.dispatchEvent(new Event("animationsstart")), this._pre.didUpdate(), this._num.didUpdate(), this._post.didUpdate();
   let t = new AbortController;
   Promise.all(this.shadowRoot.getAnimations().map(t => t.finished)).then(() => {
    t.signal.aborted || (this.dispatchEvent(new Event("animationsfinish")), this._abortAnimationsFinish = void 0)
   }), this._abortAnimationsFinish = t
  }
 }
 E.defaultProps = {
  transformTiming: {
   duration: 900,
   easing: "linear(0,.005,.019,.039,.066,.096,.129,.165,.202,.24,.278,.316,.354,.39,.426,.461,.494,.526,.557,.586,.614,.64,.665,.689,.711,.731,.751,.769,.786,.802,.817,.831,.844,.856,.867,.877,.887,.896,.904,.912,.919,.925,.931,.937,.942,.947,.951,.955,.959,.962,.965,.968,.971,.973,.976,.978,.98,.981,.983,.984,.986,.987,.988,.989,.99,.991,.992,.992,.993,.994,.994,.995,.995,.996,.996,.9963,.9967,.9969,.9972,.9975,.9977,.9979,.9981,.9982,.9984,.9985,.9987,.9988,.9989,1)"
  },
  spinTiming: void 0,
  opacityTiming: {
   duration: 450,
   easing: "ease-out"
  },
  animated: !0,
  trend: (t, e) => Math.sign(e - t),
  respectMotionPreference: !0,
  plugins: void 0,
  digits: void 0
 };
 class S {
  constructor(t, e, n, {
   className: r,
   ...o
  } = {}) {
   this.flow = t, this._integer = new M(t, e, {
    justify: "right",
    part: "integer"
   }), this._fraction = new M(t, n, {
    justify: "left",
    part: "fraction"
   }), this._inner = i("span", {
    className: "number__inner"
   }, [this._integer.el, this._fraction.el]), this.el = i("span", {
    ...o,
    part: "number",
    className: `number ${r??""}`
   }, [this._inner])
  }
  willUpdate() {
   this._prevWidth = this.el.offsetWidth, this._prevLeft = this.el.getBoundingClientRect().left, this._integer.willUpdate(), this._fraction.willUpdate()
  }
  update({
   integer: t,
   fraction: e
  }) {
   this._integer.update(t), this._fraction.update(e)
  }
  didUpdate() {
   let t = this.el.getBoundingClientRect();
   this._integer.didUpdate(), this._fraction.didUpdate();
   let e = this._prevLeft - t.left,
    n = this.el.offsetWidth,
    i = this._prevWidth - n;
   this.el.style.setProperty("--width", String(n)), this.el.animate({
    [c]: [`${e}px`, "0px"],
    [u]: [i, 0]
   }, {
    ...this.flow.transformTiming,
    composite: "accumulate"
   })
  }
 }
 class _ {
  constructor(t, e, {
   justify: n,
   className: r,
   ...o
  }, s) {
   this.flow = t, this.children = new Map, this.onCharRemove = t => () => {
    this.children.delete(t)
   }, this.justify = n;
   const a = e.map(t => this.addChar(t).el);
   this.el = i("span", {
    ...o,
    className: `section section--justify-${n} ${r??""}`
   }, s ? s(a) : a)
  }
  addChar(t, {
   startDigitsAtZero: e = !1,
   ...n
  } = {}) {
   let i = "integer" === t.type || "fraction" === t.type ? new j(this, t.type, e ? 0 : t.value, t.pos, {
    ...n,
    onRemove: this.onCharRemove(t.key)
   }) : new D(this, t.type, t.value, {
    ...n,
    onRemove: this.onCharRemove(t.key)
   });
   return this.children.set(t.key, i), i
  }
  unpop(t) {
   t.el.removeAttribute("inert"), t.el.style.top = "", t.el.style[this.justify] = ""
  }
  pop(t) {
   t.forEach(t => {
    var e, n;
    t.el.style.top = `${t.el.offsetTop}px`, t.el.style[this.justify] = `${e=t.el,"left"===this.justify?e.offsetLeft:((null==(n=e.offsetParent instanceof HTMLElement?e.offsetParent:null)?void 0:n.offsetWidth)??0)-e.offsetWidth-e.offsetLeft}px`
   }), t.forEach(t => {
    t.el.setAttribute("inert", ""), t.present = !1
   })
  }
  addNewAndUpdateExisting(t) {
   let e = new Map,
    n = new Map,
    i = "left" === this.justify,
    r = i ? "prepend" : "append";
   if (function(t, e, {
     reverse: n = !1
    } = {}) {
     let i = t.length;
     for (let r = n ? i - 1 : 0; n ? r >= 0 : r < i; n ? r-- : r++) e(t[r], r)
    }(t, t => {
     let i;
     this.children.has(t.key) ? (i = this.children.get(t.key), n.set(t, i), this.unpop(i), i.present = !0) : (i = this.addChar(t, {
      startDigitsAtZero: !0,
      animateIn: !0
     }), e.set(t, i)), this.el[r](i.el)
    }, {
     reverse: i
    }), this.flow.computedAnimated) {
    let t = this.el.getBoundingClientRect();
    e.forEach(e => {
     e.willUpdate(t)
    })
   }
   e.forEach((t, e) => {
    t.update(e.value)
   }), n.forEach((t, e) => {
    t.update(e.value)
   })
  }
  willUpdate() {
   let t = this.el.getBoundingClientRect();
   this._prevOffset = t[this.justify], this.children.forEach(e => e.willUpdate(t))
  }
  didUpdate() {
   let t = this.el.getBoundingClientRect();
   this.children.forEach(e => e.didUpdate(t));
   let e = t[this.justify],
    n = this._prevOffset - e;
   n && this.children.size && this.el.animate({
    transform: [`translateX(${n}px)`, "none"]
   }, {
    ...this.flow.transformTiming,
    composite: "accumulate"
   })
  }
 }
 class M extends _ {
  update(t) {
   let e = new Map;
   this.children.forEach((n, i) => {
    t.find(t => t.key === i) || e.set(i, n), this.unpop(n)
   }), this.addNewAndUpdateExisting(t), e.forEach(t => {
    t instanceof j && t.update(0)
   }), this.pop(e)
  }
 }
 class C extends _ {
  update(t) {
   let e = new Map;
   this.children.forEach((n, i) => {
    t.find(t => t.key === i) || e.set(i, n)
   }), this.pop(e), this.addNewAndUpdateExisting(t)
  }
 }
 class A {
  constructor(t, e, {
   onRemove: n,
   animateIn: i = !1
  } = {}) {
   this.flow = t, this.el = e, this._present = !0, this._remove = () => {
    var t;
    this.el.remove(), null == (t = this._onRemove) || t.call(this)
   }, this.el.classList.add("animate-presence"), this.flow.computedAnimated && i && this.el.animate({
    [l]: [-.9999, 0]
   }, {
    ...this.flow.opacityTiming,
    composite: "accumulate"
   }), this._onRemove = n
  }
  get present() {
   return this._present
  }
  set present(t) {
   if (this._present !== t) {
    if (this._present = t, t ? this.el.removeAttribute("inert") : this.el.setAttribute("inert", ""), !this.flow.computedAnimated) {
     t || this._remove();
     return
    }
    this.el.style.setProperty("--_number-flow-d-opacity", t ? "0" : "-.999"), this.el.animate({
     [l]: t ? [-.9999, 0] : [.999, 0]
    }, {
     ...this.flow.opacityTiming,
     composite: "accumulate"
    }), t ? this.flow.removeEventListener("animationsfinish", this._remove) : this.flow.addEventListener("animationsfinish", this._remove, {
     once: !0
    })
   }
  }
 }
 class k extends A {
  constructor(t, e, n, i) {
   super(t.flow, n, i), this.section = t, this.value = e, this.el = n
  }
 }
 class j extends k {
  constructor(t, e, n, r, o) {
   var s, a;
   const l = ((null == (a = null == (s = t.flow.digits) ? void 0 : s[r]) ? void 0 : a.max) ?? 9) + 1,
    u = Array.from({
     length: l
    }).map((t, e) => {
     let r = i("span", {
      className: "digit__num"
     }, [document.createTextNode(String(e))]);
     return e !== n && r.setAttribute("inert", ""), r.style.setProperty("--n", String(e)), r
    }),
    c = i("span", {
     part: `digit ${e}-digit`,
     className: "digit"
    }, u);
   c.style.setProperty("--current", String(n)), c.style.setProperty("--length", String(l)), super(t, n, c, o), this.pos = r, this._onAnimationsFinish = () => {
    this.el.classList.remove("is-spinning")
   }, this._numbers = u, this.length = l
  }
  willUpdate(t) {
   let e = this.el.getBoundingClientRect();
   this._prevValue = this.value;
   let n = e[this.section.justify] - t[this.section.justify],
    i = e.width / 2;
   this._prevCenter = "left" === this.section.justify ? n + i : n - i
  }
  update(t) {
   this.el.style.setProperty("--current", String(t)), this._numbers.forEach((e, n) => n === t ? e.removeAttribute("inert") : e.setAttribute("inert", "")), this.value = t
  }
  didUpdate(t) {
   let e = this.el.getBoundingClientRect(),
    n = e[this.section.justify] - t[this.section.justify],
    i = e.width / 2,
    r = "left" === this.section.justify ? n + i : n - i,
    o = this._prevCenter - r;
   o && this.el.animate({
    transform: [`translateX(${o}px)`, "none"]
   }, {
    ...this.flow.transformTiming,
    composite: "accumulate"
   });
   let s = this.getDelta();
   s && (this.el.classList.add("is-spinning"), this.el.animate({
    [d]: [-s, 0]
   }, {
    ...this.flow.spinTiming ?? this.flow.transformTiming,
    composite: "accumulate"
   }), this.flow.addEventListener("animationsfinish", this._onAnimationsFinish, {
    once: !0
   }))
  }
  getDelta() {
   var t;
   if (this.flow.plugins)
    for (let e of this.flow.plugins) {
     let n = null == (t = e.getDelta) ? void 0 : t.call(e, this.value, this._prevValue, this);
     if (null != n) return n
    }
   let e = this.value - this._prevValue,
    n = this.flow.computedTrend || Math.sign(e);
   return n < 0 && this.value > this._prevValue ? this.value - this.length - this._prevValue : n > 0 && this.value < this._prevValue ? this.length - this._prevValue + this.value : e
  }
 }
 class D extends k {
  constructor(t, e, n, r) {
   const o = i("span", {
    className: "symbol__value",
    textContent: n
   });
   super(t, n, i("span", {
    part: `symbol ${e}`,
    className: "symbol"
   }, [o]), r), this.type = e, this._children = new Map, this._onChildRemove = t => () => {
    this._children.delete(t)
   }, this._children.set(n, new A(this.flow, o, {
    onRemove: this._onChildRemove(n)
   }))
  }
  willUpdate(t) {
   if ("decimal" === this.type) return;
   let e = this.el.getBoundingClientRect();
   this._prevOffset = e[this.section.justify] - t[this.section.justify]
  }
  update(t) {
   if (this.value !== t) {
    let e = this._children.get(this.value);
    e && (e.present = !1);
    let n = this._children.get(t);
    if (n) n.present = !0;
    else {
     let e = i("span", {
      className: "symbol__value",
      textContent: t
     });
     this.el.appendChild(e), this._children.set(t, new A(this.flow, e, {
      animateIn: !0,
      onRemove: this._onChildRemove(t)
     }))
    }
   }
   this.value = t
  }
  didUpdate(t) {
   if ("decimal" === this.type) return;
   let e = this.el.getBoundingClientRect()[this.section.justify] - t[this.section.justify],
    n = this._prevOffset - e;
   n && this.el.animate({
    transform: [`translateX(${n}px)`, "none"]
   }, {
    ...this.flow.transformTiming,
    composite: "accumulate"
   })
  }
 }
 var T = n;
 let N = parseInt(T.version.match(/^(\d+)\./)?.[1]) >= 19;
 class O extends E {
  attributeChangedCallback(t, e, n) {
   this[t] = JSON.parse(n)
  }
 }
 O.observedAttributes = N ? [] : ["data", "digits"], customElements.get("number-flow-react") || customElements.define("number-flow-react", O);
 let P = {},
  $ = N ? t => t : JSON.stringify;

 function L(t) {
  let {
   transformTiming: e,
   spinTiming: n,
   opacityTiming: i,
   animated: r,
   respectMotionPreference: o,
   trend: s,
   plugins: a,
   ...l
  } = t;
  return [{
   transformTiming: e,
   spinTiming: n,
   opacityTiming: i,
   animated: r,
   respectMotionPreference: o,
   trend: s,
   plugins: a
  }, l]
 }
 class R extends T.Component {
  updateProperties(t) {
   if (!this.el) return;
   this.el.batched = !this.props.isolate;
   let [e] = L(this.props);
   Object.entries(e).forEach(([t, e]) => {
    this.el[t] = e ?? O.defaultProps[t]
   }), t?.onAnimationsStart && this.el.removeEventListener("animationsstart", t.onAnimationsStart), this.props.onAnimationsStart && this.el.addEventListener("animationsstart", this.props.onAnimationsStart), t?.onAnimationsFinish && this.el.removeEventListener("animationsfinish", t.onAnimationsFinish), this.props.onAnimationsFinish && this.el.addEventListener("animationsfinish", this.props.onAnimationsFinish)
  }
  componentDidMount() {
   this.updateProperties(), N && this.el && (this.el.digits = this.props.digits, this.el.data = this.props.data)
  }
  getSnapshotBeforeUpdate(t) {
   if (this.updateProperties(t), t.data !== this.props.data) {
    if (this.props.group) return this.props.group.willUpdate(), () => this.props.group?.didUpdate();
    if (!this.props.isolate) return this.el?.willUpdate(), () => this.el?.didUpdate()
   }
   return null
  }
  componentDidUpdate(t, e, n) {
   n?.()
  }
  handleRef(t) {
   this.props.innerRef && (this.props.innerRef.current = t), this.el = t
  }
  render() {
   let [t, {
    innerRef: e,
    className: n,
    data: i,
    willChange: r,
    isolate: o,
    group: s,
    digits: a,
    onAnimationsStart: l,
    onAnimationsFinish: u,
    ...c
   }] = L(this.props);
   return T.createElement("number-flow-react", {
    ref: this.handleRef,
    "data-will-change": r ? "" : void 0,
    class: n,
    ...c,
    dangerouslySetInnerHTML: {
     __html: ""
    },
    suppressHydrationWarning: !0,
    digits: $(a),
    data: $(i)
   })
  }
  constructor(t) {
   super(t), this.handleRef = this.handleRef.bind(this)
  }
 }
 let U = T.forwardRef(function({
   value: t,
   locales: e,
   format: n,
   prefix: i,
   suffix: r,
   ...o
  }, s) {
   T.useImperativeHandle(s, () => a.current, []);
   let a = T.useRef(),
    l = T.useContext(V);
   l?.useRegister(a);
   let u = T.useMemo(() => e ? JSON.stringify(e) : "", [e]),
    c = T.useMemo(() => n ? JSON.stringify(n) : "", [n]),
    d = T.useMemo(() => (function(t, e, n, i) {
     let r = e.formatToParts(t);
     n && r.unshift({
      type: "prefix",
      value: n
     }), i && r.push({
      type: "suffix",
      value: i
     });
     let o = [],
      s = [],
      a = [],
      l = [],
      u = {},
      c = t => `${t}:${u[t]=(u[t]??-1)+1}`,
      d = "",
      f = !1,
      p = !1;
     for (let t of r) {
      d += t.value;
      let e = "minusSign" === t.type || "plusSign" === t.type ? "sign" : t.type;
      "integer" === e ? (f = !0, s.push(...t.value.split("").map(t => ({
       type: e,
       value: parseInt(t)
      })))) : "group" === e ? s.push({
       type: e,
       value: t.value
      }) : "decimal" === e ? (p = !0, a.push({
       type: e,
       value: t.value,
       key: c(e)
      })) : "fraction" === e ? a.push(...t.value.split("").map(t => ({
       type: e,
       value: parseInt(t),
       key: c(e),
       pos: -1 - u[e]
      }))) : (f || p ? l : o).push({
       type: e,
       value: t.value,
       key: c(e)
      })
     }
     let h = [];
     for (let t = s.length - 1; t >= 0; t--) {
      let e = s[t];
      h.unshift("integer" === e.type ? {
       ...e,
       key: c(e.type),
       pos: u[e.type]
      } : {
       ...e,
       key: c(e.type)
      })
     }
     return {
      pre: o,
      integer: h,
      fraction: a,
      post: l,
      valueAsString: d,
      value: "string" == typeof t ? parseFloat(t) : t
     }
    })(t, P[`${u}:${c}`] ??= new Intl.NumberFormat(e, n), i, r), [t, u, c, i, r]);
   return T.createElement(R, {
    ...o,
    group: l,
    data: d,
    innerRef: a
   })
  }),
  V = T.createContext(void 0);
 var I = t.i(113182),
  z = t.i(380064),
  F = t.i(143443);
 let B = {
  active: !0,
  breakpoints: {},
  heightEvent: "select"
 };

 function H(t = {}) {
  let e, n, i = !1,
   r = !1,
   o = [],
   s = [],
   a = !0;

  function l() {
   return !i && !r && e.active
  }

  function u() {
   let t = function() {
    let {
     slidesBySnap: t
    } = n.internalEngine().scrollSnapList;
    return a ? t[n.selectedSnap()] : n.slidesInView()
   }();
   return t ? t.map(t => o[t]).reduce((t, e) => Math.max(t, e), 0) : null
  }

  function c() {
   null !== u() && (n.rootNode().style.height = `${u()}px`)
  }

  function d(t, e) {
   for (let t of e.detail) {
    if (!l()) return;
    let e = t.target;
    if (e === n.containerNode()) continue;
    let i = n.slideNodes().indexOf(e);
    if (i < 0) continue;
    let r = o[i];
    if (Math.abs(e.offsetHeight - r) >= .5) return n.reInit(), !1
   }
  }
  return {
   name: "autoHeight",
   options: t,
   init: function(u, f) {
    n = u;
    let {
     mergeOptions: p,
     optionsAtMedia: h
    } = f, m = p(B, H.globalOptions), g = p(m, t);
    r = !1, e = h(g), i = n.internalEngine().isSsr;
    let {
     options: {
      axis: v
     },
     slideRects: y
    } = n.internalEngine();
    l() && "y" !== v && (s = (a = "select" === e.heightEvent) ? ["select", "slidefocus"] : ["slidesinview"], o = y.map(t => t.height), n.on("resize", d), s.forEach(t => n.on(t, c)), c())
   },
   destroy: function() {
    l() && (n.off("resize", d), s.forEach(t => n.off(t, c)), n.rootNode().style.height = "", r = !0)
   }
  }
 }
 H.globalOptions = void 0;
 let X = {
  active: !0,
  breakpoints: {},
  delay: 4e3,
  instant: !1,
  defaultInteraction: !0,
  stopOnLastSnap: !1,
  rootNode: null
 };

 function W(t = {}) {
  let e, n, i, r = !1,
   o = !1,
   s = null,
   a = null,
   l = 0,
   u = !1,
   c = !1,
   d = !1,
   f = !1,
   p = !1,
   h = w;

  function m() {
   return !r && !o && e.active
  }

  function g() {
   if (m()) {
    if (b()) {
     c = !0;
     return
    }
    u || n.createEvent("autoplay:play", null).emit(),
     function() {
      let {
       ownerWindow: t
      } = n.internalEngine().nodeHandler;
      if (!t) return;
      let e = new Date().getTime(),
       i = n.createEvent("autoplay:timerset", {
        startTime: e
       });
      t.clearTimeout(l), l = t.setTimeout(E, S()), a = e, i.emit()
     }(), u = !0
   }
  }

  function v() {
   m() && (u && n.createEvent("autoplay:stop", null).emit(), function() {
    let {
     ownerWindow: t
    } = n.internalEngine().nodeHandler;
    if (!t) return;
    let e = new Date().getTime(),
     i = n.createEvent("autoplay:timerstopped", {
      stopTime: e
     });
    t.clearTimeout(l), l = 0, a = null, i.emit()
   }(), u = !1)
  }

  function y() {
   if (b()) return c = u, v();
   c && g()
  }

  function b() {
   let {
    ownerDocument: t
   } = n.internalEngine().nodeHandler;
   return !!t && "hidden" === t.visibilityState
  }

  function w(t, e, n) {
   let i = e.type,
    r = n || i;
   "slidefocus" === r && v(), "pointerdown" === r && v()
  }

  function x(t, e, i) {
   let r = e.type,
    o = i || r;
   "mouseenter" === o && (f = !0), "mouseleave" === o && (f = !1), "pointerdown" === o && (p = !0), "pointerup" === o && (p = !1), n.createEvent("autoplay:interaction", {
    interaction: o,
    originalEvent: e,
    isMouseOver: f,
    isPointerDown: p
   }).emit()
  }

  function E() {
   let {
    indexCurrent: t
   } = n.internalEngine(), i = t.clone().add(1).get(), r = n.snapList().length - 1, o = e.stopOnLastSnap && i === r, a = n.createEvent("autoplay:select", {
    targetSnap: n.canGoToNext() ? i : 0,
    sourceSnap: t.get()
   });
   if (n.canGoToNext() ? n.goToNext(d) : n.goTo(0, d), a.emit(), s = null, o) return v();
   g()
  }

  function S() {
   return s || i[n.selectedSnap()]
  }

  function _() {
   if (!m() || !a) return null;
   let t = new Date().getTime() - a;
   return S() - t
  }
  return {
   name: "autoplay",
   options: t,
   init: function(s, a) {
    var l, u, c, f;
    let p, g;
    n = s;
    let {
     mergeOptions: v,
     optionsAtMedia: b
    } = a, E = v(X, W.globalOptions), S = v(E, t);
    if (o = !1, e = b(S), r = n.internalEngine().isSsr, !m() || n.snapList().length <= 1) return;
    d = e.instant, l = n, u = e.delay, p = l.snapList(), i = "number" == typeof u ? p.map(() => u) : u(p, l), h = e.defaultInteraction ? w : x;
    let {
     eventStore: _,
     nodeHandler: M
    } = n.internalEngine(), {
     ownerDocument: C
    } = M, A = (c = n, f = e.rootNode, g = c.rootNode(), f && f(g) || g);
    C && _.add(C, "visibilitychange", y), n.on("pointerdown", h), n.on("pointerup", h), n.on("slidefocus", h), _.add(A, "mouseenter", t => h(n, t, t.type)), _.add(A, "mouseleave", t => h(n, t, t.type)), _.add(n.containerNode(), "focusout", t => h(n, t, "slidefocusout"))
   },
   destroy: function() {
    m() && (n.off("pointerdown", h).off("pointerup", h).off("slidefocus", h), v(), o = !0, u = !1)
   },
   play: function(t) {
    d = null != t ? t : d, g()
   },
   stop: function() {
    u && v()
   },
   reset: function() {
    u && g()
   },
   pause: function() {
    u && (s = _(), v())
   },
   isPlaying: function() {
    return u
   },
   timeUntilNext: _
  }
 }
 W.globalOptions = void 0;
 let Y = {
  active: !0,
  breakpoints: {},
  snapped: "is-snapped",
  inView: "is-in-view",
  draggable: "is-draggable",
  pointerDown: "is-pointer-down",
  loop: "is-loop"
 };

 function G(t) {
  return (Array.isArray(t) ? t : [t]).filter(Boolean)
 }

 function J(t, e) {
  t && e.length && t.classList.remove(...e)
 }

 function q(t, e) {
  t && e.length && t.classList.add(...e)
 }

 function K(t = {}) {
  let e, n, i, r, o = !1,
   s = !1,
   a = [],
   l = [],
   u = {
    snapped: [],
    inView: [],
    draggable: [],
    pointerDown: [],
    loop: []
   };

  function c() {
   return !o && !s && e.active
  }

  function d(t, e) {
   ("pointerdown" === e.type ? q : J)(i, u.pointerDown)
  }

  function f(t = [], e = [], n) {
   let i = e.map(t => r[t]),
    o = t.map(t => r[t]);
   return i.forEach(t => J(t, n)), o.forEach(t => q(t, n)), t
  }

  function p() {
   let {
    slidesBySnap: t
   } = n.internalEngine().scrollSnapList;
   a = f(t[n.selectedSnap()], a, u.snapped)
  }

  function h() {
   l = f(n.slidesInView(), l, u.inView)
  }
  return {
   name: "classNames",
   options: t,
   init: function(a, l) {
    n = a;
    let {
     mergeOptions: f,
     optionsAtMedia: m
    } = l, g = f(Y, K.globalOptions), v = f(g, t);
    if (s = !1, e = m(v), o = n.internalEngine().isSsr, !c()) return;
    i = n.rootNode(), r = n.slideNodes();
    let y = n.internalEngine().options;
    e.loop && y.loop && (u.loop = G(e.loop), q(i, u.loop)), e.draggable && y.draggable && (u.draggable = G(e.draggable), q(i, u.draggable)), e.pointerDown && (u.pointerDown = G(e.pointerDown), n.on("pointerdown", d).on("pointerup", d)), e.snapped && (u.snapped = G(e.snapped), n.on("select", p), p()), e.inView && (u.inView = G(e.inView), n.on("slidesinview", h), h())
   },
   destroy: function() {
    c() && (n.off("pointerdown", d).off("pointerup", d).off("select", p).off("slidesinview", h), J(i, u.loop), J(i, u.draggable), J(i, u.pointerDown), f([], a, u.snapped), f([], l, u.inView), Object.keys(u).forEach(t => {
     u[t] = []
    }), s = !0)
   }
  }
 }

 function Z(t) {
  return "[object Object]" === Object.prototype.toString.call(t) || Array.isArray(t)
 }

 function Q(t, e) {
  let n = Object.keys(t),
   i = Object.keys(e);
  return n.length === i.length && JSON.stringify(Object.keys(t.breakpoints || {})) === JSON.stringify(Object.keys(e.breakpoints || {})) && n.every(n => {
   let i = t[n],
    r = e[n];
   return "function" == typeof i ? `${i}` == `${r}` : Z(i) && Z(r) ? Q(i, r) : i === r
  })
 }

 function tt(t) {
  return t.concat().sort((t, e) => t.name > e.name ? 1 : -1).map(t => t.options)
 }

 function te(t) {
  return e => t(tn(e) ? e : e.get())
 }

 function tn(t) {
  return "number" == typeof t
 }

 function ti(t) {
  return "string" == typeof t
 }

 function tr(t) {
  return "[object Object]" === Object.prototype.toString.call(t)
 }

 function to(t) {
  return Math.abs(t)
 }

 function ts(t) {
  return Math.sign(t)
 }
 K.globalOptions = void 0;

 function ta(t) {
  return td(t).map(Number)
 }

 function tl(t) {
  return t[tu(t)]
 }

 function tu(t) {
  return Math.max(0, t.length - 1)
 }

 function tc(t, e = 0) {
  return Array.from(Array(t - e + 1), (t, n) => e + n)
 }

 function td(t) {
  return Object.keys(t)
 }

 function tf(t, e) {
  return void 0 !== e.MouseEvent && t instanceof e.MouseEvent
 }

 function tp() {
  let t = [],
   e = {
    add: function(n, i, r, o = {
     passive: !0
    }) {
     let s;
     return "addEventListener" in n ? (n.addEventListener(i, r, o), s = () => n.removeEventListener(i, r, o)) : (n.addListener(r), s = () => n.removeListener(r)), t.push(s), e
    },
    clear: function() {
     t = t.filter(t => t())
    }
   };
  return e
 }

 function th(t, e) {
  let n = "rtl" === e,
   i = "y" === t,
   r = !i && n ? -1 : 1;
  return {
   scroll: i ? "y" : "x",
   cross: i ? "x" : "y",
   startEdge: i ? "top" : n ? "right" : "left",
   endEdge: i ? "bottom" : n ? "left" : "right",
   nativeScroll: i ? "scrollTop" : "scrollLeft",
   getSize: function(t) {
    let {
     height: e,
     width: n
    } = t;
    return i ? e : n
   },
   direction: te(function(t) {
    return t * r
   })
  }
 }

 function tm(t = 0, e = 0) {
  let n = to(t - e);

  function i(e) {
   return e < t
  }

  function r(t) {
   return t > e
  }

  function o(t) {
   return i(t) || r(t)
  }
  return {
   length: n,
   max: e,
   min: t,
   clamp: te(function(n) {
    return o(n) ? i(n) ? t : e : n
   }),
   pastAnyBound: te(o),
   pastMaxBound: te(r),
   pastMinBound: te(i),
   removeOffset: te(function(t) {
    return n ? t - n * Math.ceil((t - e) / n) : t
   })
  }
 }

 function tg(t, e, n) {
  let {
   clamp: i
  } = tm(0, t), r = t + 1, o = s(e);

  function s(t) {
   return n ? to((r + t) % r) : i(t)
  }

  function a() {
   return tg(t, o, n)
  }
  let l = {
   get: function() {
    return o
   },
   set: function(t) {
    return o = s(t), l
   },
   add: function(t) {
    return a().set(o + t)
   },
   clone: a
  };
  return l
 }

 function tv(t) {
  let e = t || 0;

  function n(t) {
   e += t
  }

  function i(t) {
   return e + t
  }
  return {
   get: function() {
    return e
   },
   set: te(function(t) {
    e = t
   }),
   add: te(n),
   subtract: te(function(t) {
    n(-t)
   }),
   plus: te(i),
   minus: te(function(t) {
    return i(-t)
   })
  }
 }

 function ty(t, e, n = "px") {
  let i = "x" === t.scroll ? function(t) {
    return `translate3d(${t}${n},0px,0px)`
   } : function(t) {
    return `translate3d(0px,${t}${n},0px)`
   },
   r = null,
   o = !1,
   s = !1;

  function a(t) {
   r !== t && (r = t, e.style.transform = t)
  }

  function l(t) {
   s || o === t || (o = t, a(t ? i(0) : ""))
  }
  return {
   set: a,
   clear: function() {
    a(""), e.getAttribute("style") || e.removeAttribute("style")
   },
   to: te(function(e) {
    s || (o || l(!0), a(i(Math.round(100 * t.direction(e)) / 100)))
   }),
   get: te(i),
   toggleActive: function(t) {
    s = !t
   },
   setIsScrolling: l
  }
 }
 let tb = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  inViewMargin: "0px",
  breakpoints: {},
  dragFree: !1,
  dragThreshold: 10,
  loop: !1,
  skipSnaps: !1,
  duration: 25,
  startSnap: 0,
  active: !0,
  draggable: !0,
  resize: !0,
  focus: !0,
  slideChanges: !0,
  ssr: []
 };

 function tw(t, e, n) {
  let i, r, o, s, a, l, u, c = !t,
   d = function() {
    let t;

    function e(t, e) {
     return function t(e, n) {
      return [e, n].reduce((e, n) => (td(n).forEach(i => {
       let r = e[i],
        o = n[i],
        s = tr(r) && tr(o);
       e[i] = s ? t(r, o) : o
      }), e), {})
     }(t, e || {})
    }
    return {
     init: function(e) {
      e && (t = e)
     },
     mergeOptions: e,
     optionsAtMedia: function(n) {
      if (!t) return n;
      let i = n.breakpoints || {},
       r = td(i).filter(e => t.matchMedia(e).matches).map(t => i[t]).reduce((t, n) => e(t, n), {});
      return e(n, r)
     },
     optionsMediaQueries: function(e) {
      return t ? e.map(t => td(t.breakpoints || {})).reduce((t, e) => t.concat(e), []).map(t.matchMedia) : []
     }
    }
   }(),
   f = (u = [], {
    init: function(t, e) {
     return u = e, e.reduce((e, n) => (n.init(t, d), Object.assign(Object.assign({}, e), {
      [n.name]: n
     })), {})
    },
    destroy: function() {
     u = u.filter(t => t.destroy())
    }
   }),
   p = tp(),
   h = function() {
    let t, e = {};

    function n(t, n) {
     return e = Object.assign(Object.assign({}, e), {
      [t]: n(e[t] || [])
     }), i
    }
    let i = {
     init: function(e) {
      t = e
     },
     clear: function() {
      e = {}
     },
     createEvent: function(n, i) {
      return {
       api: t,
       emit: () => (function(n, i) {
        let r = {
         api: t,
         type: n,
         detail: i
        };
        return (e[n] || []).every(e => !1 !== e(t, r))
       })(n, i)
      }
     },
     on: function(t, e) {
      return n(t, t => t.includes(e) ? t : [...t, e]), i
     },
     off: function(t, e) {
      return n(t, t => t.filter(t => t !== e)), i
     }
    };
    return i
   }(),
   {
    mergeOptions: m,
    optionsAtMedia: g,
    optionsMediaQueries: v
   } = d,
   {
    on: y,
    off: b,
    createEvent: w
   } = h,
   x = !1,
   E = m(tb, tw.globalOptions),
   S = m(E),
   _ = [],
   M = {};

  function C(t, e, n, i) {
   let o = m(t, c ? {
     direction: "ltr"
    } : {}),
    a = r.getRects(e, n, i),
    l = function(t, e, n, i, r, o, s, a) {
     var l, u;
     let c, d, {
       align: f,
       axis: p,
       direction: h,
       startSnap: m,
       loop: g,
       duration: v,
       dragFree: y,
       dragThreshold: b,
       inViewThreshold: w,
       inViewMargin: x,
       slidesToScroll: E,
       skipSnaps: S,
       containScroll: _,
       draggable: M,
       resize: C,
       slideChanges: A,
       focus: k
      } = i,
      j = 2 * !a,
      D = th(p, h),
      {
       containerRect: T,
       slideRects: N
      } = s,
      O = D.getSize(T),
      P = {
       measure: function(t) {
        return t / 100 * O
       }
      },
      $ = (l = f, u = O, c = {
       start: function() {
        return 0
       },
       center: function(t) {
        return (u - t) / 2
       },
       end: function(t) {
        return u - t
       }
      }, {
       measure: function(t, e) {
        return ti(l) ? c[l](t) : l(u, t, e)
       }
      }),
      L = !g && !!_,
      {
       slideSizes: R,
       slideSizesWithGaps: U,
       startGap: V,
       endGap: I
      } = function(t, e, n, i, r, o) {
       let {
        ownerWindow: s
       } = o, {
        getSize: a,
        startEdge: l,
        endEdge: u
       } = t, c = n[0] && r && s, d = function() {
        if (!c) return 0;
        let t = n[0];
        return to(e[l] - t[l])
       }(), f = c ? parseFloat(s.getComputedStyle(tl(i)).getPropertyValue(`margin-${u}`)) : 0, p = n.map(a), h = n.map((t, e, n) => {
        let i = e === tu(n);
        return e ? i ? p[e] + f : n[e + 1][l] - t[l] : p[e] + d
       }).map(to);
       return {
        slideSizes: p,
        slideSizesWithGaps: h,
        startGap: d,
        endGap: f
       }
      }(D, T, N, n, g || !!_, r),
      z = function(t, e, n, i, r, o, s, a, l) {
       let {
        startEdge: u,
        endEdge: c,
        direction: d
       } = t, f = tn(n);
       return {
        groupSlides: function(t) {
         return f ? ta(t).filter(t => t % n == 0).map(e => t.slice(e, e + n)) : t.length ? ta(t).reduce((n, f, p) => {
          let h = tl(n) || 0,
           m = f === tu(t),
           g = r[u] - o[h][u],
           v = r[u] - o[f][c],
           y = i || 0 !== h ? 0 : d(s),
           b = to(v - (!i && m ? d(a) : 0) - (g + y));
          return p && b > e + l && n.push(f), m && n.push(t.length), n
         }, []).map((e, n, i) => {
          let r = Math.max(i[n - 1] || 0);
          return t.slice(r, e)
         }) : []
        }
       }
      }(D, O, E, g, T, N, V, I, j),
      {
       snaps: F,
       snapsAligned: B
      } = function(t, e, n, i, r) {
       let {
        startEdge: o,
        endEdge: s
       } = t, {
        groupSlides: a
       } = r, l = a(i).map(t => tl(t)[s] - t[0][o]).map(to).map(e.measure), u = i.map(t => n[o] - t[o]).map(t => -to(t)), c = a(u).map(t => t[0]).map((t, e) => t + l[e]);
       return {
        snaps: u,
        snapsAligned: c
       }
      }(D, $, T, N, z),
      H = -tl(F) + tl(U),
      {
       snapsContained: X,
       scrollContainLimit: W
      } = function(t, e, n, i, r) {
       let o, s, a = tm(-e + t, 0),
        l = n.map((t, e) => {
         let {
          min: i,
          max: r
         } = a, o = a.clamp(t), s = e === tu(n);
         return e ? s || c(i, o) ? i : c(r, o) ? r : o : r
        }).map(t => parseFloat(t.toFixed(3))),
        u = (o = l[0], s = tl(l), tm(l.lastIndexOf(o), l.indexOf(s) + 1));

       function c(t, e) {
        return !!r && 1 >= to(t - e)
       }
       return {
        snapsContained: function() {
         if (e <= t + r) return [a.max];
         if ("keepSnaps" === i) return l;
         let {
          min: n,
          max: o
         } = u;
         return l.slice(n, o)
        }(),
        scrollContainLimit: u
       }
      }(O, H, B, _, j),
      Y = L ? X : B,
      {
       limit: G
      } = (d = Y[0], {
       limit: tm(g ? d - H : tl(Y), d)
      }),
      J = tg(tu(Y), m, g),
      q = J.clone(),
      K = ta(n),
      Z = function(t) {
       let {
        dragHandler: e,
        scrollBody: n,
        scrollBounds: i,
        options: {
         loop: r
        }
       } = t;
       r || i.constrain(e.pointerDown()), n.seek()
      },
      Q = function(t, e) {
       let {
        scrollBody: n,
        translate: i,
        location: r,
        offsetLocation: o,
        previousLocation: s,
        scrollLooper: a,
        slideLooper: l,
        dragHandler: u,
        animation: c,
        eventHandler: d,
        scrollBounds: f,
        scrollOptimizer: p,
        options: {
         loop: h
        }
       } = t, m = n.settled(), g = !f.shouldConstrain(), v = u.pointerDown(), y = m && (h || g), b = !y, w = y && !v;
       w && (p.optimize(w), c.stop());
       let x = r.get() * e + s.get() * (1 - e);
       o.set(x), h && (a.loop(n.direction()), l.loop()), i.to(o), p.optimize(), w && d.createEvent("settle", null).emit(), b && d.createEvent("scroll", {
        isDragging: b && v
       }).emit()
      },
      tt = function(t, e) {
       let n, i = tp(),
        r = 1e3 / 60,
        o = null,
        s = 0,
        a = 0;

       function l(i) {
        if (!a) return;
        o || (o = i, t(), t());
        let u = i - o;
        for (o = i, s += u; s >= r;) t(), s -= r;
        e(s / r), a && (a = n.requestAnimationFrame(l))
       }

       function u() {
        a && (n.cancelAnimationFrame(a), o = null, s = 0, a = 0)
       }
       return {
        init: function(t) {
         let e = t.document;
         n = t, i.add(e, "visibilitychange", () => {
          e.hidden && (o = null, s = 0)
         })
        },
        destroy: function() {
         u(), i.clear()
        },
        start: function() {
         a || (a = n.requestAnimationFrame(l))
        },
        stop: u,
        update: t,
        render: e
       }
      }(() => Z(tP), t => Q(tP, t)),
      tr = Y[J.get()],
      td = tv(tr),
      tb = tv(tr),
      tw = tv(tr),
      tx = tv(tr),
      tE = ty(D, e),
      tS = n.map(t => ty(D, t)),
      t_ = function(t) {
       let {
        max: e,
        length: n
       } = t;
       return {
        get: te(function(t) {
         return n ? -((t - e) / n) : 0
        })
       }
      }(G),
      tM = function(t, e, n, i, r, o) {
       let s = 0,
        a = 0,
        l = r,
        u = .68,
        c = t.get(),
        d = 0;

       function f(t) {
        return l = t, h
       }

       function p(t) {
        return u = t, h
       }
       let h = {
        direction: function() {
         return a
        },
        duration: function() {
         return l
        },
        velocity: function() {
         return s
        },
        seek: function() {
         let e = i.minus(t),
          r = 0;
         return l ? (n.set(t), s += e / l, s *= u, c += s, t.add(s), r = c - d) : (s = 0, n.set(i), t.set(i), r = e), a = ts(r), d = c, h
        },
        settled: function() {
         return .001 > to(i.minus(e))
        },
        useBaseFriction: function() {
         return p(.68)
        },
        useBaseDuration: function() {
         return f(r)
        },
        useFriction: p,
        useDuration: f
       };
       return h
      }(td, tw, tb, tx, v, 0),
      tC = function(t, e, n, i, r, o, s) {
       let a, l, {
         groupSlides: u
        } = r,
        {
         min: c,
         max: d
        } = i,
        f = (a = u(o), 1 === n.length ? [o] : t && "keepSnaps" !== e ? a.slice(c, d).map((t, e, n) => {
         let i = e === tu(n);
         return e ? i ? tc(tu(o), t[0]) : t : tc(tl(t))
        }) : a),
        p = (l = {}, f.forEach((t, e) => {
         t.forEach(t => {
          l[t] = e
         })
        }), l),
        h = n.map(s.get);
       return {
        slidesBySnap: f,
        snapBySlide: p,
        progressBySnap: h,
        length: n.length
       }
      }(L, _, Y, W, z, K, t_),
      tA = function(t, e, n, i, r, o, s, a) {
       let l = ta(i),
        u = ta(i).reverse(),
        c = p(f(u, o[0]), e, !1).concat(p(f(l, t - o[0] - 1), -e, !0));

       function d(t, e) {
        return t.reduce((t, e) => t - i[e], e)
       }

       function f(t, e) {
        return t.reduce((t, n) => d(t, e) > 0 ? [...t, n] : t, [])
       }

       function p(i, o, l) {
        let u = r.map((e, i) => ({
         start: e - n[i] + .5 + o,
         end: e + t - .5 + o
        }));
        return i.map(t => {
         let n = l ? 0 : -e,
          i = l ? e : 0,
          r = u[t][l ? "end" : "start"];
         return {
          index: t,
          loopPoint: r,
          slideLocation: tv(-1),
          translate: a[t],
          target: () => s.get() > r ? n : i
         }
        })
       }
       return {
        canLoop: function() {
         return c.every(({
          index: e
         }) => .1 >= d(l.filter(t => t !== e), t))
        },
        loop: function() {
         c.forEach(t => {
          let {
           target: e,
           translate: n,
           slideLocation: i
          } = t, r = e();
          r !== i.get() && (n.to(r), i.set(r))
         })
        },
        loopPoints: c
       }
      }(O, H, R, U, F, Y, tw, tS),
      tk = function(t, e, n, i, r, o, s, a, l, u, c, d) {
       let f = r ? [0, e, -e] : [0],
        p = i.reduce((e, i, r) => Object.assign(Object.assign({}, e), {
         [r]: f.map(e => ({
          start: i - n[r] + -200 + e,
          end: i + t - -200 + e
         }))
        }), {}),
        h = tg(i.length - 1, 0, r),
        m = l.get(),
        g = w(),
        v = g,
        y = [];

       function b(t, e, n, o) {
        let s = t.length > 0,
         a = s ? t[0] : e,
         l = h.clone().set(a),
         u = () => l.add(n).get();
        for (l.set(u()); l.get() !== a;) {
         let e = l.get(),
          a = o(e);
         if (!a && s) break;
         a && t.push(e);
         let c = u();
         if (l.set(c), r) continue;
         let d = !c,
          f = c === tu(i);
         if (d && -1 === n || f && 1 === n) break
        }
       }

       function w() {
        let t = [],
         e = s.slidesBySnap[o.get()];
        if (!e || !i.length) return t;
        let n = a.get(),
         r = l.get(),
         u = e[Math.floor(e.length / 2)],
         c = Math.max(n, r),
         d = Math.min(n, r),
         f = t => p[t].some(({
          start: t,
          end: e
         }) => t < c && e > d);
        return f(u) && t.push(u), b(t, u, 1, f), b(t, u, -1, f), t
       }

       function x(t, e) {
        e.forEach(e => {
         let n = u[e],
          i = c.loopPoints[e];
         (r && i ? i.target() : 0) || n.setIsScrolling(t)
        })
       }
       return {
        optimize: function(t) {
         var e;
         let n, i = l.get();
         (t || i !== m) && (g = w(), e = v, n = new Set(g), y = e.filter(t => !n.has(t)), v = g, m = i, d.createEvent("scrolloptimize", {
          slidesInView: g,
          slidesLeftView: y
         }).emit() && (x(!0, g), x(!1, y)))
        }
       }
      }(O, H, U, F, g, J, tC, tw, tx, tS, tA, o),
      tj = function(t, e, n, i, r) {
       let {
        pastAnyBound: o,
        removeOffset: s,
        clamp: a
       } = i;

       function l(t) {
        return t.sort((t, e) => to(t) - to(e))[0]
       }

       function u(e, i) {
        if (!t) return e;
        let r = [e, e + n, e - n];
        if (!i) return l(r);
        let o = r.filter(t => ts(t) === i);
        return o.length ? l(o) : tl(r) - n
       }
       return {
        byDistance: function(n, i) {
         let l = r.plus(n),
          {
           index: c,
           distance: d
          } = function(n) {
           let i = t ? s(n) : a(n),
            {
             index: r
            } = e.reduce((t, e, n) => {
             let r = to(u(e - i, 0));
             return r >= t.smallestDisplacement ? t : {
              smallestDisplacement: r,
              index: n
             }
            }, {
             smallestDisplacement: 1 / 0,
             index: 0
            });
           return {
            index: r,
            distance: i
           }
          }(l),
          f = !t && o(l);
         if (!i || f) return {
          index: c,
          distance: n
         };
         let p = n + u(e[c] - d, 0);
         return {
          index: c,
          distance: p
         }
        },
        byIndex: function(t, n) {
         let i = u(e[t] - r.get(), n);
         return {
          index: t,
          distance: i
         }
        },
        shortcut: u
       }
      }(g, Y, H, G, tx),
      tD = function(t, e, n, i, r, o, s) {
       function a(r) {
        let {
         index: a,
         distance: l
        } = r, u = e.get(), c = a !== u;
        l && (o.add(l), i.duration() ? t.start() : (t.update(), t.render(1), t.update())), c && (n.set(u), e.set(a), s.createEvent("select", {
         targetSnap: a,
         sourceSnap: u
        }).emit())
       }
       return {
        distance: function(t, e) {
         a(r.byDistance(t, e))
        },
        index: function(t, n) {
         var i;
         let o = e.clone().set(t).get();
         a(r.byIndex(o, (i = n) ? tn(i) ? i : "forward" === i ? -1 : 1 : 0))
        }
       }
      }(tt, J, q, tM, tj, tx, o),
      tT = tp(),
      tN = function(t, e, n, i, r) {
       let o, s = new Set,
        a = !1;

       function l(t) {
        let i = [],
         r = [];
        for (let n of t) {
         if (a) return;
         let t = e.indexOf(n.target);
         n.isIntersecting ? (s.add(t), i.push(t)) : (s.delete(t), r.push(t))
        }
        n.createEvent("slidesinview", {
         slidesInView: u(),
         slidesLeftView: r,
         slidesEnterView: i
        }).emit()
       }

       function u() {
        return [...s]
       }
       return {
        init: function(n) {
         o = new n.IntersectionObserver(l, {
          root: t.parentElement,
          threshold: i,
          rootMargin: r
         }), e.forEach(t => o.observe(t))
        },
        destroy: function() {
         o && o.disconnect(), a = !0
        },
        get: u
       }
      }(e, n, o, w, x),
      tO = function(t, e, n, i, r, o, s, a, l) {
       let u = {
         passive: !0,
         capture: !0
        },
        c = 0;

       function d(t) {
        "Tab" === t.code && (c = new Date().getTime())
       }
       return {
        init: function(f) {
         e && (a.add(f.document, "keydown", d, !1), i.forEach((e, i) => {
          a.add(e, "focus", e => (function(e, i) {
           if (new Date().getTime() - c > 10 || !l.createEvent("slidefocus", e).emit()) return;
           n[t.nativeScroll] = 0;
           let a = r.snapBySlide[i];
           tn(a) && (s.useDuration(0), o.index(a, 0))
          })(e, i), u)
         }))
        }
       }
      }(D, k, t, n, tC, tD, tM, tT, o),
      tP = {
       eventHandler: o,
       containerRect: T,
       contentSize: H,
       slideRects: N,
       nodeHandler: r,
       animation: tt,
       slideSizes: R,
       isSsr: a,
       axis: D,
       dragHandler: function(t, e, n, i, r, o, s, a, l, u, c, d, f, p, h, m, g) {
        let v, y, {
          cross: b,
          direction: w
         } = e,
         x = ["INPUT", "SELECT", "TEXTAREA"],
         E = {
          passive: !1
         },
         S = tp(),
         _ = tp(),
         M = tm(50, 225).clamp(f.measure(20)),
         C = {
          mouse: 300,
          touch: 400
         },
         A = {
          mouse: 500,
          touch: 600
         },
         k = p ? 43 : 25,
         j = !1,
         D = 0,
         T = 0,
         N = !1,
         O = !1,
         P = !1,
         $ = !1,
         L = !1;

        function R(t) {
         return u.byDistance(t, !p).distance
        }

        function U(t) {
         let e;
         if (!d.createEvent("pointerdown", t).emit()) return;
         let s = tf(t, y),
          a = s && 0 !== t.button;
         if ((L = s, $ = p && s && !t.buttons && j, j = to(i.get() - o.get()) >= 2, !a) && (e = t.target.nodeName || "", !x.includes(e))) {
          let e;
          O = !0, r.pointerDown(t), l.useFriction(0).useDuration(0), i.set(o), D = r.readPoint(t), T = r.readPoint(t, b), e = L ? v : n, _.add(e, "mousemove", V, E).add(e, "mouseup", I), N = !0
         }
        }

        function V(t) {
         if (!d.createEvent("pointermove", t).emit() || !tf(t, y) && t.touches.length >= 2) return I(t);
         let e = r.readPoint(t),
          n = r.readPoint(t, b),
          o = to(e - D),
          a = to(n - T);
         if (!P && !L && (!t.cancelable || !(P = o > a))) return I(t);
         let u = r.pointerMove(t);
         o > h && ($ = !0), l.useFriction(.3).useDuration(.75), s.start(), i.add(w(u)), t.cancelable && t.preventDefault()
        }

        function I(t) {
         var e;
         let n, i = d.createEvent("pointerup", t),
          o = r.pointerUp(t) * (p ? A : C)[L ? "mouse" : "touch"],
          s = (e = w(o), n = c.add(-1 * ts(e)), p || to(e) < M ? R(e) : m && u.byDistance(0, !1).index !== c.get() ? .5 * R(e) : u.byIndex(n.get(), 0).distance),
          f = function(t, e) {
           var n, i;
           if (0 === t || 0 === e || to(t) <= to(e)) return 0;
           let r = (n = to(t), i = to(e), to(n - i));
           return to(r / t)
          }(o, s);
         P = !1, O = !1, N = !1, L = !1, _.clear(), l.useDuration(k - 10 * f).useFriction(.68 + f / 50), a.distance(s, !p), i.emit()
        }

        function z(t) {
         $ && (t.stopPropagation(), t.preventDefault(), $ = !1)
        }
        return {
         init: function(e) {
          t && (v = e.document, y = e, r.init(e), S.add(n, "dragstart", t => t.preventDefault(), E).add(n, "touchmove", t => N && V(t), E).add(n, "touchend", t => N && I(t)).add(n, "touchstart", U).add(n, "mousedown", U).add(n, "touchcancel", I).add(n, "contextmenu", I).add(n, "click", z, !0))
         },
         destroy: function() {
          S.clear(), _.clear(), N = !1
         },
         pointerDown: function() {
          return O
         }
        }
       }(M, D, t, tx, function(t) {
        let e, n, i;

        function r(t) {
         return t.timeStamp
        }

        function o(n, i) {
         let r = i || t.scroll,
          o = `client${"x"===r?"X":"Y"}`;
         return (tf(n, e) ? n : n.touches[0])[o]
        }
        return {
         init: function(t) {
          e = t
         },
         pointerDown: function(t) {
          return n = t, i = t, o(t)
         },
         pointerMove: function(t) {
          let e = o(t) - o(i),
           s = r(t) - r(n) > 170;
          return i = t, s && (n = t), e
         },
         pointerUp: function(t) {
          if (!n || !i) return 0;
          let e = o(i) - o(n),
           s = r(t) - r(n),
           a = r(t) - r(i) > 170,
           l = e / s;
          return s && !a && to(l) > .1 ? l : 0
         },
         readPoint: o
        }
       }(D), td, tt, tD, tM, tj, J, o, P, y, b, S, 0),
       eventStore: tT,
       percentOfView: P,
       indexCurrent: J,
       indexPrevious: q,
       limit: G,
       location: td,
       offsetLocation: tw,
       previousLocation: tb,
       options: i,
       resizeHandler: function(t, e, n, i, r, o) {
        let s, a, l = [e, ...i],
         u = [],
         c = !1;

        function d(t) {
         return r.getSize(o.getRect(t))
        }

        function f(t) {
         let r = n.createEvent("resize", t);
         if (r.emit())
          for (let n of t) {
           if (c) return;
           let t = n.target === e,
            o = i.indexOf(n.target),
            s = t ? a : u[o];
           if (to(d(t ? e : i[o]) - s) >= .5) {
            r.api.reInit();
            break
           }
          }
        }
        return {
         init: function(n) {
          t && (a = d(e), u = i.map(d), s = new n.ResizeObserver(f), n.requestAnimationFrame(() => {
           l.forEach(t => s.observe(t))
          }))
         },
         destroy: function() {
          c = !0, s && s.disconnect()
         }
        }
       }(C, e, o, n, D, r),
       scrollBody: tM,
       scrollBounds: function(t, e, n, i, r) {
        let {
         pastAnyBound: o,
         pastMinBound: s,
         clamp: a
        } = t, l = r.measure(10), u = r.measure(50), c = tm(.1, .99), d = !1;

        function f() {
         return !d && !!o(n) && !!o(e)
        }
        return {
         shouldConstrain: f,
         constrain: function(r) {
          if (!f()) return;
          let o = to(t[s(e) ? "min" : "max"] - e.get()),
           d = n.minus(e),
           p = c.clamp(o / u);
          n.subtract(d * p), !r && to(d) < l && (n.set(a(n)), i.useDuration(25).useBaseFriction())
         },
         toggleActive: function(t) {
          d = !t
         }
        }
       }(G, tw, tx, tM, P),
       scrollLooper: function(t, e, n, i) {
        let {
         pastMinBound: r,
         pastMaxBound: o
        } = tm(e.min + .1, e.max + .1);
        return {
         loop: function(e) {
          if (!(1 === e ? o(n) : -1 === e && r(n))) return;
          let s = -1 * e * t;
          i.forEach(t => t.add(s))
         }
        }
       }(H, G, tw, [td, tw, tb, tx]),
       scrollProgress: t_,
       scrollSnaps: Y,
       scrollTarget: tj,
       scrollTo: tD,
       slideLooper: tA,
       slideFocus: tO,
       slidesHandler: function(t, e, n) {
        let i, r = !1;

        function o(t) {
         let e = n.createEvent("slideschanged", t);
         if (e.emit())
          for (let n of t) {
           if (r) return;
           if ("childList" === n.type) {
            e.api.reInit();
            break
           }
          }
        }
        return {
         init: function(n) {
          t && (i = new n.MutationObserver(o)).observe(e, {
           childList: !0
          })
         },
         destroy: function() {
          i && i.disconnect(), r = !0
         }
        }
       }(A, e, o),
       slidesInView: tN,
       slideIndexes: K,
       slidesToScroll: z,
       slideTranslates: tS,
       scrollSnapList: tC,
       scrollOptimizer: tk,
       translate: tE,
       target: tx
      };
     return tP
    }(s, e, n, o, r, h, a, c);
   return t.loop && !l.slideLooper.canLoop() ? C(m(t, {
    loop: !1
   }), e, n, !0) : l
  }

  function A(e, n) {
   if (x) return;
   let {
    ownerWindow: u
   } = r = function(t) {
    let e, n = t ? t.ownerDocument : null,
     i = n ? n.defaultView : null;

    function r(t) {
     let {
      offsetTop: e,
      offsetLeft: n,
      offsetWidth: i,
      offsetHeight: r
     } = t;
     return {
      top: e,
      right: n + i,
      bottom: e + r,
      left: n,
      width: i,
      height: r
     }
    }

    function o(t, e, n, i) {
     return {
      offsetLeft: t,
      offsetTop: e,
      offsetWidth: n,
      offsetHeight: i
     }
    }
    return {
     ownerDocument: n,
     ownerWindow: i,
     getNodes: function(e) {
      let n, i;
      return t ? function(e) {
       let {
        container: n,
        slides: i
       } = e, r = (ti(n) ? t.querySelector(n) : n) || t.children[0], o = Array.from((ti(i) ? r.querySelectorAll(i) : i) || r.children);
       return {
        root: t,
        container: r,
        slides: o
       }
      }(e) : (n = o(0, 0, 100, 100), i = 0, {
       root: n,
       container: n,
       slides: e.ssr.map(t => {
        let e = o(i, i, t, t);
        return i += t, e
       })
      })
     },
     getRect: r,
     getRects: function(n, i, o) {
      if (o && e) return e;
      let s = t ? n.style : {
        transform: ""
       },
       a = s.transform;
      s.transform = "none";
      let l = r(n),
       u = i.map(r);
      return s.transform = a, e = {
       containerRect: l,
       slideRects: u
      }
     }
    }
   }(t);
   d.init(u), S = g(E = m(E, e)), _ = n || _;
   let h = r.getNodes(S);
   s = h.root, a = h.container, l = h.slides, i = C(S, a, l), o = function(t, e, n, i, r, o) {
    let s = ty(e, t, "%");

    function a(t, e, i) {
     let {
      direction: r
     } = th(t.axis, t.direction), {
      slides: a,
      container: l
     } = n.getNodes(t), {
      location: u,
      slideLooper: c,
      contentSize: d
     } = o(t, l, a), f = t.loop ? c.loopPoints : [], p = r(u), h = s.get(p);
     return `${e}{transform:${h};}` + f.reduce((n, o) => {
      let {
       index: a
      } = o, l = ts(o.target()), u = t.ssr[a];
      if (!l || !u) return n;
      let c = r(d / u * 100 * l),
       f = s.get(c);
      return n + `${e} ${i}:nth-child(${a+1}){transform:${f};}`
     }, "")
    }
    return {
     getStyles: function(t, e = "> *") {
      if (!i.ssr.length) return "";
      let n = i.breakpoints || {};
      return a(i, t, e) + Object.keys(n).reduce((o, s) => {
       let l = r(i, n[s]);
       return o + `@media ${s}{${a(l,t,e)}}`
      }, "")
     }
    }
   }(a, i.axis, r, E, m, C), v([E, ..._.map(({
    options: t
   }) => t)]).forEach(t => p.add(t, "change", k)), S.active && (!c && u && (i.translate.to(i.location), i.scrollOptimizer.optimize(!0), i.options.loop && i.slideLooper.loop(), i.animation.init(u), i.resizeHandler.init(u), i.slidesInView.init(u), i.slidesHandler.init(u), i.slideFocus.init(u), i.eventHandler.init(O), a.offsetParent && l.length && i.dragHandler.init(u)), M = f.init(O, _))
  }

  function k(t, e) {
   let n = h.createEvent("reinit", null),
    i = N();
   j(), A(m({
    startSnap: i
   }, t), e), n.emit()
  }

  function j() {
   i.dragHandler.destroy(), i.resizeHandler.destroy(), i.slidesHandler.destroy(), i.slidesInView.destroy(), i.animation.destroy(), f.destroy(), i.eventStore.clear(), p.clear(), i.translate.clear(), i.slideTranslates.forEach(t => t.clear())
  }

  function D(t, e, n) {
   x || c || S.active && (i.scrollBody.useBaseFriction().useDuration(!0 === e ? 0 : S.duration), i.scrollTo.index(t, n))
  }

  function T(t) {
   return i.indexCurrent.add(t).get()
  }

  function N() {
   return T(0)
  }
  let O = {
   canGoToNext: function() {
    return T(1) !== N()
   },
   canGoToPrev: function() {
    return T(-1) !== N()
   },
   cloneEngine: function(t) {
    return C(m(S, t), a, l, !0)
   },
   containerNode: function() {
    return a
   },
   createEvent: w,
   internalEngine: function() {
    return i
   },
   destroy: function() {
    if (x || c) return;
    let t = h.createEvent("destroy", null);
    x = !0, p.clear(), j(), t.emit(), h.clear()
   },
   on: y,
   off: b,
   plugins: function() {
    return M
   },
   previousSnap: function() {
    return i.indexPrevious.get()
   },
   reInit: k,
   rootNode: function() {
    return s
   },
   goToNext: function(t) {
    D(T(1), t, -1)
   },
   goToPrev: function(t) {
    D(T(-1), t, 1)
   },
   scrollProgress: function() {
    return i.scrollProgress.get(i.offsetLocation)
   },
   goTo: D,
   selectedSnap: N,
   slideNodes: function() {
    return l
   },
   slidesInView: function() {
    return i.slidesInView.get()
   },
   snapIndex: T,
   snapList: function() {
    return i.scrollSnapList.progressBySnap
   },
   ssrStyles: function(t, e) {
    return c ? o.getStyles(t, e) : ""
   }
  };
  return A(e || {}, n || []), O
 }

 function tx(t = {}, e = []) {
  tw.globalOptions = tx.globalOptions;
  let i = (0, n.useRef)(t),
   r = (0, n.useRef)(e),
   o = (0, n.useRef)(tw(null, t, e)),
   [s, a] = (0, n.useState)(),
   [l, u] = (0, n.useState)(),
   c = (0, n.useCallback)(() => {
    s && s.reInit(i.current, r.current)
   }, [s]);
  return (0, n.useEffect)(() => {
   Q(i.current, t) || (i.current = t, c())
  }, [t, c]), (0, n.useEffect)(() => {
   ! function(t, e) {
    if (t.length !== e.length) return !1;
    let n = tt(t),
     i = tt(e);
    return n.every((t, e) => Q(t, i[e]))
   }(r.current, e) && (r.current = e, c())
  }, [e, c]), (0, n.useEffect)(() => {
   if (l) {
    tw.globalOptions = tx.globalOptions;
    let t = tw(l, i.current, r.current);
    return a(t), () => t.destroy()
   }
   a(void 0)
  }, [l]), [u, s, o.current]
 }

 function tE() {
  return (tE = Object.assign || function(t) {
   for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e];
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
   }
   return t
  }).apply(this, arguments)
 }

 function tS(t, e) {
  if (t.length !== e.length) throw Error("vectors must be same length");
  return t.map(function(t, n) {
   return t + e[n]
  })
 }

 function t_(t) {
  return Math.max.apply(Math, t.map(Math.abs))
 }

 function tM(t) {
  return Object.freeze(t), Object.values(t).forEach(function(t) {
   null === t || "object" != typeof t || Object.isFrozen(t) || tM(t)
  }), t
 }
 tw.globalOptions = void 0, tx.globalOptions = void 0, t.i(247167);
 var tC = [1, 18, "u" > typeof window && window.innerHeight || 800],
  tA = [-1, -1, -1],
  tk = tM({
   preventWheelAction: !0,
   reverseSign: [!0, !0, !1]
  });

 function tj() {
  return {
   isStarted: !1,
   isStartPublished: !1,
   isMomentum: !1,
   startTime: 0,
   lastAbsDelta: 1 / 0,
   axisMovement: [0, 0, 0],
   axisVelocity: [0, 0, 0],
   accelerationFactors: [],
   scrollPoints: [],
   scrollPointsToMerge: [],
   willEndTimeout: 400
  }
 }
 let tD = function(t) {
  void 0 === t && (t = {});
  var e, n, i, r, o, s = function() {
    var t = {};

    function e(e, n) {
     t[e] = (t[e] || []).filter(function(t) {
      return t !== n
     })
    }
    return tM({
     on: function(n, i) {
      return t[n] = (t[n] || []).concat(i),
       function() {
        return e(n, i)
       }
     },
     off: e,
     dispatch: function(e, n) {
      e in t && t[e].forEach(function(t) {
       return t(n)
      })
     }
    })
   }(),
   a = s.on,
   l = s.off,
   u = s.dispatch,
   c = tk,
   d = tj(),
   f = !1,
   p = function(t) {
    Array.isArray(t) ? t.forEach(function(t) {
     return v(t)
    }) : v(t)
   },
   h = function(t) {
    return (void 0 === t && (t = {}), Object.values(t).some(function(t) {
     return null == t
    })) ? c : c = tM(tE({}, tk, c, t))
   },
   m = function(t) {
    var e = tE({
     event: r,
     isStart: !1,
     isEnding: !1,
     isMomentumCancel: !1,
     isMomentum: d.isMomentum,
     axisDelta: [0, 0, 0],
     axisVelocity: d.axisVelocity,
     axisMovement: d.axisMovement,
     get axisMovementProjection() {
      return tS(e.axisMovement, e.axisVelocity.map(function(t) {
       var e;
       return void 0 === e && (e = .996), t * e / (1 - e)
      }))
     }
    }, t);
    u("wheel", tE({}, e, {
     previous: o
    })), o = e
   },
   g = function(t, e) {
    var n = c.preventWheelAction,
     i = e[0],
     r = e[1],
     o = e[2];
    if ("boolean" == typeof n) return n;
    switch (n) {
     case "x":
      return Math.abs(i) >= t;
     case "y":
      return Math.abs(r) >= t;
     case "z":
      return Math.abs(o) >= t;
     default:
      return !1
    }
   },
   v = function(t) {
    var e, n, i, o, s = (o = function(t, e) {
      if (!e) return t;
      var n = !0 === e ? tA : e.map(function(t) {
       return t ? -1 : 1
      });
      return tE({}, t, {
       axisDelta: t.axisDelta.map(function(t, e) {
        return t * n[e]
       })
      })
     }((e = t.deltaX * tC[t.deltaMode], n = t.deltaY * tC[t.deltaMode], i = (t.deltaZ || 0) * tC[t.deltaMode], {
      timeStamp: t.timeStamp,
      axisDelta: [e, n, i]
     }), c.reverseSign), tE({}, o, {
      axisDelta: o.axisDelta.map(function(t) {
       return Math.min(Math.max(-700, t), 700)
      })
     })),
     a = s.axisDelta,
     l = s.timeStamp,
     u = t_(a);
    if (t.preventDefault && g(u, a) && t.preventDefault(), d.isStarted ? d.isMomentum && u > Math.max(2, 2 * d.lastAbsDelta) && (A(!0), M()) : M(), 0 === u && Object.is && Object.is(t.deltaX, -0)) {
     f = !0;
     return
    }
    r = t, d.axisMovement = tS(d.axisMovement, a), d.lastAbsDelta = u, d.scrollPointsToMerge.push({
     axisDelta: a,
     timeStamp: l
    }), y(), m({
     axisDelta: a,
     isStart: !d.isStartPublished
    }), d.isStartPublished = !0, C()
   },
   y = function() {
    if (2 === d.scrollPointsToMerge.length) {
     var t;
     d.scrollPoints.unshift({
      axisDeltaSum: d.scrollPointsToMerge.map(function(t) {
       return t.axisDelta
      }).reduce(tS),
      timeStamp: (t = d.scrollPointsToMerge.map(function(t) {
       return t.timeStamp
      })).reduce(function(t, e) {
       return t + e
      }) / t.length
     }), w(), d.scrollPointsToMerge.length = 0, d.scrollPoints.length = 1, d.isMomentum || S()
    } else d.isStartPublished || b()
   },
   b = function() {
    var t;
    d.axisVelocity = (t = d.scrollPointsToMerge)[t.length - 1].axisDelta.map(function(t) {
     return t / d.willEndTimeout
    })
   },
   w = function() {
    var t = d.scrollPoints,
     e = t[0],
     n = t[1];
    if (n && e) {
     var i = e.timeStamp - n.timeStamp;
     if (i <= 0) return;
     var r = e.axisDeltaSum.map(function(t) {
       return t / i
      }),
      o = r.map(function(t, e) {
       return t / (d.axisVelocity[e] || 1)
      });
     d.axisVelocity = r, d.accelerationFactors.push(o), x(i)
    }
   },
   x = function(t) {
    var e = 10 * Math.ceil(t / 10) * 1.2;
    d.isMomentum || (e = Math.max(100, 2 * e)), d.willEndTimeout = Math.min(1e3, Math.round(e))
   },
   E = function(t) {
    return 0 === t || t <= .96 && t >= .6
   },
   S = function() {
    if (d.accelerationFactors.length >= 5) {
     if (f && (f = !1, t_(d.axisVelocity) >= .2)) return void _();
     var t = d.accelerationFactors.slice(-5);
     t.every(function(t) {
      var e = !!t.reduce(function(t, e) {
        return t && t < 1 && t === e ? 1 : 0
       }),
       n = t.filter(E).length === t.length;
      return e || n
     }) && _(), d.accelerationFactors = t
    }
   },
   _ = function() {
    d.isMomentum = !0
   },
   M = function() {
    (d = tj()).isStarted = !0, d.startTime = Date.now(), o = void 0, f = !1
   },
   C = function() {
    clearTimeout(e), e = setTimeout(A, d.willEndTimeout)
   },
   A = function(t) {
    void 0 === t && (t = !1), d.isStarted && (d.isMomentum && t ? m({
     isEnding: !0,
     isMomentumCancel: !0
    }) : m({
     isEnding: !0
    }), d.isMomentum = !1, d.isStarted = !1)
   },
   k = (n = [], tM({
    observe: function(t) {
     return t.addEventListener("wheel", p, {
       passive: !1
      }), n.push(t),
      function() {
       return i(t)
      }
    },
    unobserve: i = function(t) {
     t.removeEventListener("wheel", p), n = n.filter(function(e) {
      return e !== t
     })
    },
    disconnect: function() {
     n.forEach(i)
    }
   })),
   j = k.observe,
   D = k.unobserve,
   T = k.disconnect;
  return h(t), tM({
   on: a,
   off: l,
   observe: j,
   unobserve: D,
   disconnect: T,
   feedWheel: p,
   updateOptions: h
  })
 };
 var tT = {
  active: !0,
  breakpoints: {},
  wheelDraggingClass: "is-wheel-dragging",
  forceWheelAxis: void 0,
  target: void 0
 };

 function tN(t) {
  void 0 === t && (t = {});
  var e, n = function() {};
  return {
   name: "wheelGestures",
   options: t,
   init: function(i, r) {
    var o, s, a, l = r.mergeOptions,
     u = r.optionsAtMedia,
     c = l(tT, tN.globalOptions);
    e = u(l(c, t));
    var d = i.internalEngine(),
     f = null != (o = e.target) ? o : i.containerNode().parentNode,
     p = null != (s = e.forceWheelAxis) ? s : d.options.axis,
     h = tD({
      preventWheelAction: p,
      reverseSign: [!0, !0, !1]
     });

    function m() {
     w = ("x" === p ? d.containerRect.width : d.containerRect.height) / 2
    }
    var g = h.observe(f),
     v = h.on("wheel", function(t) {
      var i = t.axisDelta,
       r = i[0],
       o = i[1],
       s = "x" === p ? r : o,
       l = "x" === p ? o : r,
       u = t.isMomentum && t.previous && !t.previous.isMomentum,
       c = t.isEnding && !t.isMomentum || u;
      !(Math.abs(s) > Math.abs(l)) || y || t.isMomentum || x || function(t) {
       try {
        a = new MouseEvent("mousedown", t.event), C(a)
       } catch (t) {
        return n()
       }
       y = !0, b = 0, document.documentElement.addEventListener("mousemove", _, !0), document.documentElement.addEventListener("mouseup", _, !0), document.documentElement.addEventListener("mousedown", _, !0), e.wheelDraggingClass && f.classList.add(e.wheelDraggingClass)
      }(t), x && t.isEnding && (x = !1), y && ! function(t) {
       var e = A(t),
        n = e.isAtBoundary,
        i = e.primaryAxisDelta;
       if (n && !t.isMomentum) {
        if ((b += Math.abs(i)) > w) return x = !0, E(t), !0
       } else b = 0;
       return !1
      }(t) && (c ? E(t) : C(M("mousemove", t)))
     }),
     y = !1,
     b = 0,
     w = 0,
     x = !1;

    function E(t) {
     y = !1, C(M("mouseup", t)), S(), e.wheelDraggingClass && f.classList.remove(e.wheelDraggingClass)
    }

    function S() {
     document.documentElement.removeEventListener("mousemove", _, !0), document.documentElement.removeEventListener("mouseup", _, !0), document.documentElement.removeEventListener("mousedown", _, !0)
    }

    function _(t) {
     y && t.isTrusted && t.stopImmediatePropagation()
    }

    function M(t, e) {
     if (p === d.options.axis) {
      var n, i, r = e.axisMovement;
      n = r[0], i = r[1]
     } else {
      var o = e.axisMovement;
      i = o[0], n = o[1]
     }
     if (A(e).isAtBoundary) {
      var s = Math.min(b / w, 1),
       l = b * (n > 0 ? -1 : 1) * (.25 + .5 * s);
      n += l, i += l
     }
     if (!d.options.skipSnaps && !d.options.dragFree) {
      var u = d.containerRect.width,
       c = d.containerRect.height;
      n = n < 0 ? Math.max(n, -u) : Math.min(n, u), i = i < 0 ? Math.max(i, -c) : Math.min(i, c)
     }
     return new MouseEvent(t, {
      clientX: a.clientX + n,
      clientY: a.clientY + i,
      screenX: a.screenX + n,
      screenY: a.screenY + i,
      movementX: n,
      movementY: i,
      button: 0,
      bubbles: !0,
      cancelable: !0,
      composed: !0
     })
    }

    function C(t) {
     i.containerNode().dispatchEvent(t)
    }

    function A(t) {
     var e = t.axisDelta,
      n = e[0],
      r = e[1],
      o = i.scrollProgress(),
      s = "x" === p ? n : r;
     return {
      isAtBoundary: s < 0 && !(o < 1) || s > 0 && !(o > 0),
      primaryAxisDelta: s
     }
    }
    m(), i.on("resize", m), n = function() {
     g(), v(), i.off("resize", m), S()
    }
   },
   destroy: function() {
    return n()
   }
  }
 }
 tN.globalOptions = void 0;
 var tO = t.i(449492),
  tP = t.i(824511),
  t$ = t.i(887652),
  tL = t.i(895420);
 let tR = (0, n.createContext)(null);

 function tU() {
  let t = (0, n.useContext)(tR);
  if (!t) throw Error("useCarousel must be used within a <Carousel />");
  return t
 }

 function tV({
  orientation: t = "horizontal",
  opts: i,
  setApi: r,
  className: o,
  children: s,
  isFade: a = !1,
  isAutoplay: l = !1,
  isAutoHeight: u = !0,
  autoplayDuration: c = 3e3,
  gap: d,
  ...f
 }) {
  let p = (0, n.useMemo)(() => ({
    ...i,
    align: a ? "center" : i?.align || "start",
    containScroll: !a && (i?.containScroll || "trimSnaps"),
    inViewThreshold: 1,
    skipSnaps: !0,
    axis: "horizontal" === t ? "x" : "y"
   }), [a, t, JSON.stringify(i)]),
   h = (0, n.useMemo)(() => l ? W({
    instant: a,
    delay: c,
    defaultInteraction: !1
   }) : null, [l, a, c]),
   [m, g] = tx(p, (0, n.useMemo)(() => [K(), ...a ? [Fade()] : [], ...h ? [h] : [], ...u ? [H()] : []], [a, h, u])),
   [v, y] = (0, n.useState)(!1),
   [b, w] = (0, n.useState)(!1),
   [x, E] = (0, n.useState)(!1),
   S = (0, n.useCallback)(t => {
    t && (y(t.canGoToPrev()), w(t.canGoToNext()), M(t.selectedSnap()))
   }, []),
   [_, M] = (0, n.useState)(0),
   [C, A] = (0, n.useState)([]),
   k = (0, n.useCallback)(t => {
    A(t.snapList())
   }, []),
   j = (0, n.useCallback)(t => {
    t && (E(!0), l && h && h.pause())
   }, [l, h]),
   D = (0, n.useCallback)(t => {
    t && (E(!1), l && h && h.play())
   }, [l, h]),
   T = (0, n.useCallback)(() => {
    g?.goToPrev()
   }, [g]),
   N = (0, n.useCallback)(() => {
    g?.goToNext()
   }, [g]),
   O = (0, n.useCallback)(t => {
    "ArrowLeft" === t.key ? (t.preventDefault(), T()) : "ArrowRight" === t.key && (t.preventDefault(), N())
   }, [T, N]);
  return (0, n.useEffect)(() => {
   g && r && r(g)
  }, [g, r]), (0, n.useEffect)(() => {
   if (g) return k(g), S(g), g.on("reinit", k), g.on("reinit", S), g.on("select", S), () => {
    g?.off("select", S)
   }
  }, [g, S]), (0, n.useEffect)(() => {
   if (g) return g.on("pointerdown", j), g.on("pointerup", D), () => {
    g?.off("pointerdown", j), g?.off("pointerup", D)
   }
  }, [g, j, D]), (0, e.jsx)(tR.Provider, {
   value: {
    carouselRef: m,
    api: g,
    opts: i,
    isAutoplay: l,
    autoplayDuration: c,
    orientation: t || (i?.axis === "y" ? "vertical" : "horizontal"),
    goToPrev: T,
    goToNext: N,
    canGoToPrev: v,
    canGoToNext: b,
    isPointerdown: x,
    selectedIndex: _,
    count: C.length
   },
   children: (0, e.jsx)("div", {
    onKeyDownCapture: O,
    className: (0, z.cn)("relative", o),
    role: "region",
    "aria-roledescription": "carousel",
    "data-slot": "carousel",
    style: {
     "--item-gap": d
    },
    ...f,
    children: s
   })
  })
 }

 function tI({
  className: t,
  classNameInner: n,
  ...i
 }) {
  let {
   carouselRef: r,
   orientation: o
  } = tU();
  return (0, e.jsx)("div", {
   ref: r,
   className: (0, z.cn)("overflow-hidden", t),
   "data-slot": "carousel-content",
   children: (0, e.jsx)("div", {
    className: (0, z.cn)("flex", "horizontal" === o ? "-ml-(--item-gap)" : "-mt-(--item-gap) flex-col", n),
    ...i
   })
  })
 }

 function tz({
  className: t,
  ...n
 }) {
  let {
   orientation: i
  } = tU();
  return (0, e.jsx)("div", {
   role: "group",
   "aria-roledescription": "slide",
   "data-slot": "carousel-item",
   className: (0, z.cn)("min-w-0 shrink-0 grow-0 basis-full", "horizontal" === i ? "pl-(--item-gap)" : "pt-(--item-gap)", t),
   ...n
  })
 }

 function tF({
  className: t,
  variant: n = "arrowIconLeft",
  size: i = "icon-sm",
  isDefaultStyle: r = !0,
  ...o
 }) {
  let {
   orientation: s,
   goToPrev: a,
   canGoToPrev: l
  } = tU();
  return (0, e.jsx)(F.Button, {
   "data-slot": "carousel-previous",
   variant: n,
   size: i,
   className: (0, z.cn)(r && "absolute touch-manipulation rounded-full", r && ("horizontal" === s ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90"), t),
   disabled: !l,
   onClick: a,
   ...o,
   children: (0, e.jsx)("span", {
    className: "sr-only",
    children: "Previous slide"
   })
  })
 }

 function tB({
  className: t,
  variant: n = "arrowIconRight",
  size: i = "icon-sm",
  isDefaultStyle: r = !0,
  ...o
 }) {
  let {
   orientation: s,
   goToNext: a,
   canGoToNext: l
  } = tU();
  return (0, e.jsx)(F.Button, {
   "data-slot": "carousel-next",
   variant: n,
   size: i,
   className: (0, z.cn)(r && "absolute touch-manipulation rounded-full", r && ("horizontal" === s ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"), t),
   disabled: !l,
   onClick: a,
   ...o,
   children: (0, e.jsx)("span", {
    className: "sr-only",
    children: "Next slide"
   })
  })
 }

 function tH({
  className: t,
  dotClassName: i,
  progressColor: r = "bg-green-5",
  activeNavDotColor: o = "bg-green-5",
  inactiveNavDotColor: s = "bg-foreground-muted",
  pauseOnHover: a = !0,
  activeNavDotWidth: l = "60px",
  ...u
 }) {
  let c = {
    inactive: {
     width: "8px"
    },
    active: {
     width: l
    }
   },
   {
    api: d,
    isAutoplay: f,
    autoplayDuration: p,
    isPointerdown: h
   } = tU(),
   [m, g] = (0, n.useState)(0),
   [v, y] = (0, n.useState)([]),
   b = (0, t$.useMotionValue)(0),
   w = (0, tL.useTransform)(b, t => (t - 1) * 100 + "%"),
   x = (0, n.useCallback)(t => {
    d && d.goTo(t)
   }, [d]),
   E = (0, n.useCallback)(t => {
    y(t.snapList())
   }, []),
   S = (0, n.useCallback)(t => {
    g(t.selectedSnap()), b.set(0)
   }, [b]);
  return (0, n.useEffect)(() => {
   if (!d || !f || h) return;
   let t = (1 - b.get()) * p,
    e = (0, tO.animate)(b, 1, {
     duration: t / 1e3,
     ease: "linear",
     onComplete: () => {
      b.set(0), d?.goToNext()
     }
    });
   return () => {
    e.stop()
   }
  }, [d, f, b, m, p, h]), (0, n.useEffect)(() => {
   d && (E(d), S(d), d.on("reinit", E).on("reinit", S).on("select", S))
  }, [d, E, S]), (0, e.jsx)("div", {
   className: (0, z.cn)("flex justify-center", t),
   ...u,
   children: (0, e.jsx)("div", {
    className: "flex flex-wrap items-center justify-start gap-2",
    children: v.map((t, n) => (0, e.jsx)(tP.m.button, {
     type: "button",
     className: (0, z.cn)("increase-target-size relative size-2 cursor-pointer rounded-full border-none shadow-none transition-[opacity,background-color] duration-300 hover:opacity-60", i, f || m !== n ? s : o),
     onClick: () => x(n),
     "aria-label": `Navigate to slide ${n}`,
     variants: c,
     initial: "inactive",
     animate: m === n ? "active" : "inactive",
     transition: {
      ...I.dotButtonMorphAnim.transition,
      bounce: .2,
      duration: 1.2
     },
     ...u,
     children: f && m === n && (0, e.jsx)("div", {
      className: "absolute inset-0 overflow-hidden rounded-[inherit]",
      children: (0, e.jsx)(tP.m.span, {
       className: (0, z.cn)("absolute inset-0 rounded-[inherit] will-change-transform", r),
       style: {
        translateX: w
       }
      })
     })
    }, n))
   })
  })
 }

 function tX({
  className: t,
  activeNavDotWidth: n,
  isDark: i = !1,
  ...r
 }) {
  let {
   selectedIndex: o,
   count: s
  } = tU();
  return (0, e.jsxs)(tP.m.div, {
   className: (0, z.cn)("px-contain my-4 flex justify-between", t),
   variants: I.fadeMoveAnim,
   ...r,
   children: [(0, e.jsx)(tH, {
    activeNavDotWidth: n,
    activeNavDotColor: i ? "bg-green-3" : void 0,
    inactiveNavDotColor: i ? "bg-green-1" : void 0
   }), s > 0 && (0, e.jsx)(U, {
    value: o + 1,
    format: {
     minimumIntegerDigits: 2
    },
    className: "font-antique-legacy text-xs tracking-tighter lining-nums tabular-nums"
   })]
  })
 }
 t.s(["Carousel", () => tV, "CarouselContent", () => tI, "CarouselItem", () => tz, "CarouselNext", () => tB, "CarouselPagination", () => tX, "CarouselPrevious", () => tF], 627230)
}]);