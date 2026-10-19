(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 232286, 386252, e => {
 "use strict";
 var t = e.i(271645);

 function i(e, t) {
  return "function" == typeof e ? e(t) : e && (e.current = t), e
 }
 var r = "u" > typeof window ? t.useLayoutEffect : t.useEffect,
  n = new WeakMap;

 function o(e, o) {
  var s, a, l, c = (s = o || null, a = function(t) {
   return e.forEach(function(e) {
    return i(e, t)
   })
  }, (l = (0, t.useState)(function() {
   return {
    value: s,
    callback: a,
    facade: {
     get current() {
      return l.value
     },
     set current(value) {
      var e = l.value;
      e !== value && (l.value = value, l.callback(value, e))
     }
    }
   }
  })[0]).callback = a, l.facade);
  return r(function() {
   var t = n.get(c);
   if (t) {
    var r = new Set(t),
     o = new Set(e),
     s = c.current;
    r.forEach(function(e) {
     o.has(e) || i(e, null)
    }), o.forEach(function(e) {
     r.has(e) || i(e, s)
    })
   }
   n.set(c, e)
  }, [e]), c
 }
 e.s(["useMergeRefs", () => o], 232286);
 var s = e.i(290571);

 function a(e) {
  return e
 }

 function l(e, t) {
  void 0 === t && (t = a);
  var i = [],
   r = !1;
  return {
   read: function() {
    if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
    return i.length ? i[i.length - 1] : e
   },
   useMedium: function(e) {
    var n = t(e, r);
    return i.push(n),
     function() {
      i = i.filter(function(e) {
       return e !== n
      })
     }
   },
   assignSyncMedium: function(e) {
    for (r = !0; i.length;) {
     var t = i;
     i = [], t.forEach(e)
    }
    i = {
     push: function(t) {
      return e(t)
     },
     filter: function() {
      return i
     }
    }
   },
   assignMedium: function(e) {
    r = !0;
    var t = [];
    if (i.length) {
     var n = i;
     i = [], n.forEach(e), t = i
    }
    var o = function() {
      var i = t;
      t = [], i.forEach(e)
     },
     s = function() {
      return Promise.resolve().then(o)
     };
    s(), i = {
     push: function(e) {
      t.push(e), s()
     },
     filter: function(e) {
      return t = t.filter(e), i
     }
    }
   }
  }
 }

 function c(e, t) {
  return void 0 === t && (t = a), l(e, t)
 }

 function u(e) {
  void 0 === e && (e = {});
  var t = l(null);
  return t.options = (0, s.__assign)({
   async: !0,
   ssr: !1
  }, e), t
 }
 e.s(["createMedium", () => c, "createSidecarMedium", () => u], 386252)
}, 614595, (e, t, i) => {
 "use strict";
 var r = e.r(271645),
  n = "function" == typeof Object.is ? Object.is : function(e, t) {
   return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
  },
  o = r.useSyncExternalStore,
  s = r.useRef,
  a = r.useEffect,
  l = r.useMemo,
  c = r.useDebugValue;
 i.useSyncExternalStoreWithSelector = function(e, t, i, r, u) {
  var d = s(null);
  if (null === d.current) {
   var h = {
    hasValue: !1,
    value: null
   };
   d.current = h
  } else h = d.current;
  var f = o(e, (d = l(function() {
   function e(e) {
    if (!a) {
     if (a = !0, o = e, e = r(e), void 0 !== u && h.hasValue) {
      var t = h.value;
      if (u(t, e)) return s = t
     }
     return s = e
    }
    if (t = s, n(o, e)) return t;
    var i = r(e);
    return void 0 !== u && u(t, i) ? (o = e, t) : (o = e, s = i)
   }
   var o, s, a = !1,
    l = void 0 === i ? null : i;
   return [function() {
    return e(t())
   }, null === l ? void 0 : function() {
    return e(l())
   }]
  }, [t, i, r, u]))[0], d[1]);
  return a(function() {
   h.hasValue = !0, h.value = f
  }, [f]), c(f), f
 }
}, 313027, (e, t, i) => {
 "use strict";
 t.exports = e.r(614595)
}, 223070, 142098, e => {
 "use strict";
 class t {
  constructor(e) {
   this.isMounted = !1, this.node = e
  }
  update() {}
 }
 e.s(["Feature", () => t], 142098);
 var i = e.i(618812),
  r = e.i(372323);

 function n(e, t, i, r = 0, o = 1) {
  let s = Array.from(e).sort((e, t) => e.sortNodePosition(t)).indexOf(t),
   a = e.size,
   l = (a - 1) * r;
  return "function" == typeof i ? i(s, a) : 1 === o ? s * r : l - s * r
 }

 function o(e, t, s = {}) {
  let a = (0, i.resolveVariant)(e, t, "exit" === s.type ? e.presenceContext?.custom : void 0),
   {
    transition: l = e.getDefaultTransition() || {}
   } = a || {};
  s.transitionOverride && (l = s.transitionOverride);
  let c = a ? () => Promise.all((0, r.animateTarget)(e, a, s)) : () => Promise.resolve(),
   u = e.variantChildren && e.variantChildren.size ? (i = 0) => {
    let {
     delayChildren: r = 0,
     staggerChildren: a,
     staggerDirection: c
    } = l;
    return function(e, t, i = 0, r = 0, s = 0, a = 1, l) {
     let c = [];
     for (let u of e.variantChildren) u.notify("AnimationStart", t), c.push(o(u, t, {
      ...l,
      delay: i + ("function" == typeof r ? 0 : r) + n(e.variantChildren, u, r, s, a)
     }).then(() => u.notify("AnimationComplete", t)));
     return Promise.all(c)
    }(e, t, i, r, a, c, s)
   } : () => Promise.resolve(),
   {
    when: d
   } = l;
  if (!d) return Promise.all([c(), u(s.delay)]);
  {
   let [e, t] = "beforeChildren" === d ? [c, u] : [u, c];
   return e().then(() => t())
  }
 }
 var s = e.i(732525),
  a = e.i(706840);
 let l = a.variantProps.length;
 var c = e.i(885983),
  u = e.i(373615);

 function d(e, t) {
  if (!Array.isArray(t)) return !1;
  let i = t.length;
  if (i !== e.length) return !1;
  for (let r = 0; r < i; r++)
   if (t[r] !== e[r]) return !1;
  return !0
 }
 let h = [...a.variantPriorityOrder].reverse(),
  f = a.variantPriorityOrder.length;

 function p(e = !1) {
  return {
   isActive: e,
   protectedKeys: {},
   needsAnimating: {},
   prevResolvedValues: {}
  }
 }

 function m() {
  return {
   animate: p(!0),
   whileInView: p(),
   whileHover: p(),
   whileTap: p(),
   whileDrag: p(),
   whileFocus: p(),
   exit: p()
  }
 }
 let y = 0,
  v = {
   animation: {
    Feature: class extends t {
     constructor(e) {
      super(e), e.animationState || (e.animationState = function(e) {
       let t = t => Promise.all(t.map(({
         animation: t,
         options: n
        }) => (function(e, t, n = {}) {
         let s;
         if (e.notify("AnimationStart", t), Array.isArray(t)) s = Promise.all(t.map(t => o(e, t, n)));
         else if ("string" == typeof t) s = o(e, t, n);
         else {
          let o = "function" == typeof t ? (0, i.resolveVariant)(e, t, n.custom) : t;
          s = Promise.all((0, r.animateTarget)(e, o, n))
         }
         return s.then(() => {
          e.notify("AnimationComplete", t)
         })
        })(e, t, n))),
        p = m(),
        y = !0,
        v = t => (r, n) => {
         let o = (0, i.resolveVariant)(e, n, "exit" === t ? e.presenceContext?.custom : void 0);
         if (o) {
          let {
           transition: e,
           transitionEnd: t,
           ...i
          } = o;
          r = {
           ...r,
           ...i,
           ...t
          }
         }
         return r
        };

       function g(r) {
        let {
         props: o
        } = e, m = function e(t) {
         if (!t) return;
         if (!t.isControllingVariants) {
          let i = t.parent && e(t.parent) || {};
          return void 0 !== t.props.initial && (i.initial = t.props.initial), i
         }
         let i = {};
         for (let e = 0; e < l; e++) {
          let r = a.variantProps[e],
           n = t.props[r];
          ((0, s.isVariantLabel)(n) || !1 === n) && (i[r] = n)
         }
         return i
        }(e.parent) || {}, g = [], x = new Set, b = {}, k = 1 / 0;
        for (let t = 0; t < f; t++) {
         var w, S;
         let a = h[t],
          l = p[a],
          f = void 0 !== o[a] ? o[a] : m[a],
          E = (0, s.isVariantLabel)(f),
          A = a === r ? l.isActive : null;
         !1 === A && (k = t);
         let j = f === m[a] && f !== o[a] && E;
         if (j && y && e.manuallyAnimateOnMount && (j = !1), l.protectedKeys = {
           ...b
          }, !l.isActive && null === A || !f && !l.prevProp || (0, c.isAnimationControls)(f) || "boolean" == typeof f) continue;
         let C = (w = l.prevProp, "string" == typeof(S = f) ? S !== w : !!Array.isArray(S) && !d(S, w)),
          T = C || a === r && l.isActive && !j && E || t > k && E,
          O = !1,
          N = Array.isArray(f) ? f : [f],
          R = N.reduce(v(a), {});
         !1 === A && (R = {});
         let {
          prevResolvedValues: _ = {}
         } = l, P = {
          ..._,
          ...R
         }, I = t => {
          T = !0, x.has(t) && (O = !0, x.delete(t)), l.needsAnimating[t] = !0;
          let i = e.getValue(t);
          i && (i.liveStyle = !1)
         };
         for (let e in P) {
          let t = R[e],
           i = _[e];
          if (!b.hasOwnProperty(e))((0, u.isKeyframesTarget)(t) && (0, u.isKeyframesTarget)(i) ? d(t, i) : t === i) ? void 0 !== t && x.has(e) ? I(e) : l.protectedKeys[e] = !0 : null != t ? I(e) : x.add(e)
         }
         l.prevProp = f, l.prevResolvedValues = R, l.isActive && (b = {
          ...b,
          ...R
         }), y && e.blockInitialAnimation && (T = !1);
         let M = j && C,
          D = !M || O;
         T && D && g.push(...N.map(t => {
          let r = {
           type: a
          };
          if ("string" == typeof t && y && !M && e.manuallyAnimateOnMount && e.parent) {
           let {
            parent: o
           } = e, s = (0, i.resolveVariant)(o, t);
           if (o.enteringChildren && s) {
            let {
             delayChildren: t
            } = s.transition || {};
            r.delay = n(o.enteringChildren, e, t)
           }
          }
          return {
           animation: t,
           options: r
          }
         }))
        }
        if (x.size) {
         let t = {};
         if ("boolean" != typeof o.initial) {
          let r = (0, i.resolveVariant)(e, Array.isArray(o.initial) ? o.initial[0] : o.initial);
          r && r.transition && (t.transition = r.transition)
         }
         x.forEach(i => {
          let r = e.getBaseTarget(i),
           n = e.getValue(i);
          n && (n.liveStyle = !0), t[i] = r ?? null
         }), g.push({
          animation: t
         })
        }
        let E = !!g.length;
        return y && (!1 === o.initial || o.initial === o.animate) && !e.manuallyAnimateOnMount && (E = !1), y = !1, E ? t(g) : Promise.resolve()
       }
       return {
        animateChanges: g,
        setActive: function(t, i) {
         if (p[t].isActive === i) return Promise.resolve();
         e.variantChildren?.forEach(e => e.animationState?.setActive(t, i)), p[t].isActive = i;
         let r = g(t);
         for (let e in p) p[e].protectedKeys = {};
         return r
        },
        setAnimateFunction: function(i) {
         t = i(e)
        },
        getState: () => p,
        reset: () => {
         p = m()
        }
       }
      }(e))
     }
     updateAnimationControlsSubscription() {
      let {
       animate: e
      } = this.node.getProps();
      (0, c.isAnimationControls)(e) && (this.unmountControls = e.subscribe(this.node))
     }
     mount() {
      this.updateAnimationControlsSubscription()
     }
     update() {
      let {
       animate: e
      } = this.node.getProps(), {
       animate: t
      } = this.node.prevProps || {};
      e !== t && this.updateAnimationControlsSubscription()
     }
     unmount() {
      this.node.animationState.reset(), this.unmountControls?.()
     }
    }
   },
   exit: {
    Feature: class extends t {
     constructor() {
      super(...arguments), this.id = y++
     }
     update() {
      if (!this.node.presenceContext) return;
      let {
       isPresent: e,
       onExitComplete: t
      } = this.node.presenceContext, {
       isPresent: i
      } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || e === i) return;
      let r = this.node.animationState.setActive("exit", !e);
      t && !e && r.then(() => {
       t(this.id)
      })
     }
     mount() {
      let {
       register: e,
       onExitComplete: t
      } = this.node.presenceContext || {};
      t && t(this.id), e && (this.unmount = e(this.id))
     }
     unmount() {}
    }
   }
  };
 e.s(["animations", () => v], 223070)
}, 439676, e => {
 "use strict";
 let t = {
  x: !1,
  y: !1
 };

 function i() {
  return t.x || t.y
 }
 e.s(["isDragActive", () => i, "isDragging", () => t])
}, 608648, 973089, e => {
 "use strict";
 var t = e.i(439676),
  i = e.i(749652);

 function r(e, t) {
  let r = (0, i.resolveElements)(e),
   n = new AbortController;
  return [r, {
   passive: !0,
   ...t,
   signal: n.signal
  }, () => n.abort()]
 }

 function n(e, i, o = {}) {
  let [s, a, l] = r(e, o);
  return s.forEach(e => {
   let r, n = !1,
    o = !1,
    s = t => {
     r && (r(t), r = void 0), e.removeEventListener("pointerleave", c)
    },
    l = e => {
     n = !1, window.removeEventListener("pointerup", l), window.removeEventListener("pointercancel", l), o && (o = !1, s(e))
    },
    c = e => {
     if ("touch" !== e.pointerType) {
      if (n) {
       o = !0;
       return
      }
      s(e)
     }
    };
   e.addEventListener("pointerenter", n => {
    if ("touch" === n.pointerType || (0, t.isDragActive)()) return;
    o = !1;
    let s = i(e, n);
    "function" == typeof s && (r = s, e.addEventListener("pointerleave", c, a))
   }, a), e.addEventListener("pointerdown", () => {
    n = !0, window.addEventListener("pointerup", l, a), window.addEventListener("pointercancel", l, a)
   }, a)
  }), l
 }
 e.s(["setupGesture", () => r], 973089), e.s(["hover", () => n], 608648)
}, 665536, 341327, e => {
 "use strict";
 let t = e => "mouse" === e.pointerType ? "number" != typeof e.button || e.button <= 0 : !1 !== e.isPrimary;

 function i(e) {
  return {
   point: {
    x: e.pageX,
    y: e.pageY
   }
  }
 }
 e.s(["isPrimaryPointer", () => t], 341327);
 let r = e => r => t(r) && e(r, i(r));
 e.s(["addPointerInfo", () => r, "extractEventInfo", () => i], 665536)
}, 957512, e => {
 "use strict";
 var t = e.i(142098),
  i = e.i(608648),
  r = e.i(287022),
  n = e.i(665536);

 function o(e, t, i) {
  let {
   props: o
  } = e;
  e.animationState && o.whileHover && e.animationState.setActive("whileHover", "Start" === i);
  let s = o["onHover" + i];
  s && r.frame.postRender(() => s(t, (0, n.extractEventInfo)(t)))
 }
 class s extends t.Feature {
  mount() {
   let {
    current: e
   } = this.node;
   e && (this.unmount = (0, i.hover)(e, (e, t) => (o(this.node, t, "Start"), e => o(this.node, e, "End"))))
  }
  unmount() {}
 }
 e.s(["HoverGesture", () => s])
}, 282774, e => {
 "use strict";

 function t(e, i, r, n = {
  passive: !0
 }) {
  return e.addEventListener(i, r, n), () => e.removeEventListener(i, r)
 }
 e.s(["addDomEvent", () => t])
}, 99642, 260863, e => {
 "use strict";
 var t = e.i(142098),
  i = e.i(282774),
  r = e.i(738638);
 class n extends t.Feature {
  constructor() {
   super(...arguments), this.isActive = !1
  }
  onFocus() {
   let e = !1;
   try {
    e = this.node.current.matches(":focus-visible")
   } catch (t) {
    e = !0
   }
   e && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
  }
  onBlur() {
   this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
  }
  mount() {
   this.unmount = (0, r.pipe)((0, i.addDomEvent)(this.node.current, "focus", () => this.onFocus()), (0, i.addDomEvent)(this.node.current, "blur", () => this.onBlur()))
  }
  unmount() {}
 }
 e.s(["FocusGesture", () => n], 99642);
 let o = (e, t) => !!t && (e === t || o(e, t.parentElement));
 e.s(["isNodeOrChild", () => o], 260863)
}, 919880, e => {
 "use strict";
 let t = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);

 function i(e) {
  return t.has(e.tagName) || !0 === e.isContentEditable
 }
 let r = new Set(["INPUT", "SELECT", "TEXTAREA"]);

 function n(e) {
  return r.has(e.tagName) || !0 === e.isContentEditable
 }
 e.s(["isElementKeyboardAccessible", () => i, "isElementTextInput", () => n])
}, 708149, e => {
 "use strict";
 var t = e.i(957512),
  i = e.i(99642),
  r = e.i(142098),
  n = e.i(772846),
  o = e.i(439676),
  s = e.i(260863),
  a = e.i(341327),
  l = e.i(973089),
  c = e.i(919880);
 let u = new WeakSet;

 function d(e) {
  return t => {
   "Enter" === t.key && e(t)
  }
 }

 function h(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, {
   isPrimary: !0,
   bubbles: !0
  }))
 }

 function f(e) {
  return (0, a.isPrimaryPointer)(e) && !(0, o.isDragActive)()
 }
 let p = new WeakSet;
 var m = e.i(287022),
  y = e.i(665536);

 function v(e, t, i) {
  let {
   props: r
  } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState && r.whileTap && e.animationState.setActive("whileTap", "Start" === i);
  let n = r["onTap" + ("End" === i ? "" : i)];
  n && m.frame.postRender(() => n(t, (0, y.extractEventInfo)(t)))
 }
 class g extends r.Feature {
  mount() {
   let {
    current: e
   } = this.node;
   if (!e) return;
   let {
    globalTapTarget: t,
    propagate: i
   } = this.node.props;
   this.unmount = function(e, t, i = {}) {
    let [r, o, a] = (0, l.setupGesture)(e, i), m = e => {
     let r = e.currentTarget;
     if (!f(e) || p.has(e)) return;
     u.add(r), i.stopPropagation && p.add(e);
     let n = t(r, e),
      a = (e, t) => {
       window.removeEventListener("pointerup", l), window.removeEventListener("pointercancel", c), u.has(r) && u.delete(r), f(e) && "function" == typeof n && n(e, {
        success: t
       })
      },
      l = e => {
       a(e, r === window || r === document || i.useGlobalTarget || (0, s.isNodeOrChild)(r, e.target))
      },
      c = e => {
       a(e, !1)
      };
     window.addEventListener("pointerup", l, o), window.addEventListener("pointercancel", c, o)
    };
    return r.forEach(e => {
     (i.useGlobalTarget ? window : e).addEventListener("pointerdown", m, o), (0, n.isHTMLElement)(e) && (e.addEventListener("focus", e => ((e, t) => {
      let i = e.currentTarget;
      if (!i) return;
      let r = d(() => {
       if (u.has(i)) return;
       h(i, "down");
       let e = d(() => {
        h(i, "up")
       });
       i.addEventListener("keyup", e, t), i.addEventListener("blur", () => h(i, "cancel"), t)
      });
      i.addEventListener("keydown", r, t), i.addEventListener("blur", () => i.removeEventListener("keydown", r), t)
     })(e, o)), (0, c.isElementKeyboardAccessible)(e) || e.hasAttribute("tabindex") || (e.tabIndex = 0))
    }), a
   }(e, (e, t) => (v(this.node, t, "Start"), (e, {
    success: t
   }) => v(this.node, e, t ? "End" : "Cancel")), {
    useGlobalTarget: t,
    stopPropagation: i?.tap === !1
   })
  }
  unmount() {}
 }
 var x = r;
 let b = new WeakMap,
  k = new WeakMap,
  w = e => {
   let t = b.get(e.target);
   t && t(e)
  },
  S = e => {
   e.forEach(w)
  },
  E = {
   some: 0,
   all: 1
  };
 class A extends x.Feature {
  constructor() {
   super(...arguments), this.hasEnteredView = !1, this.isInView = !1
  }
  startObserver() {
   var e;
   let t;
   this.unmount();
   let {
    viewport: i = {}
   } = this.node.getProps(), {
    root: r,
    margin: n,
    amount: o = "some",
    once: s
   } = i, a = {
    root: r ? r.current : void 0,
    rootMargin: n,
    threshold: "number" == typeof o ? o : E[o]
   }, l = e => {
    let {
     isIntersecting: t
    } = e;
    if (this.isInView === t || (this.isInView = t, s && !t && this.hasEnteredView)) return;
    t && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", t);
    let {
     onViewportEnter: i,
     onViewportLeave: r
    } = this.node.getProps(), n = t ? i : r;
    n && n(e)
   };
   return e = this.node.current, t = function({
    root: e,
    ...t
   }) {
    let i = e || document;
    k.has(i) || k.set(i, {});
    let r = k.get(i),
     n = JSON.stringify(t);
    return r[n] || (r[n] = new IntersectionObserver(S, {
     root: e,
     ...t
    })), r[n]
   }(a), b.set(e, l), t.observe(e), () => {
    b.delete(e), t.unobserve(e)
   }
  }
  mount() {
   this.startObserver()
  }
  update() {
   if ("u" < typeof IntersectionObserver) return;
   let {
    props: e,
    prevProps: t
   } = this.node;
   ["amount", "margin", "root"].some(function({
    viewport: e = {}
   }, {
    viewport: t = {}
   } = {}) {
    return i => e[i] !== t[i]
   }(e, t)) && this.startObserver()
  }
  unmount() {}
 }
 let j = {
  inView: {
   Feature: A
  },
  tap: {
   Feature: g
  },
  focus: {
   Feature: i.FocusGesture
  },
  hover: {
   Feature: t.HoverGesture
  }
 };
 e.s(["gestureAnimations", () => j], 708149)
}, 154505, e => {
 "use strict";
 var t = e.i(275737),
  i = e.i(386783),
  r = e.i(271645),
  n = e.i(944966);
 let o = (e, o) => o.isSVG ?? (0, n.isSVGComponent)(e) ? new t.SVGVisualElement(o) : new i.HTMLVisualElement(o, {
  allowProjection: e !== r.Fragment
 });
 e.s(["createDomVisualElement", () => o])
}, 881933, (e, t, i) => {
 "use strict";
 let r, n, o;
 var s, a, l = Object.create,
  c = Object.defineProperty,
  u = Object.getOwnPropertyDescriptor,
  d = Object.getOwnPropertyNames,
  h = Object.getPrototypeOf,
  f = Object.prototype.hasOwnProperty,
  p = (e, t, i, r) => {
   if (t && "object" == typeof t || "function" == typeof t)
    for (let n of d(t)) f.call(e, n) || n === i || c(e, n, {
     get: () => t[n],
     enumerable: !(r = u(t, n)) || r.enumerable
    });
   return e
  },
  m = {},
  y = {
   $dispatcherGuard: () => O,
   $makeReadOnly: () => R,
   $reset: () => N,
   $structuralCheck: () => D,
   c: () => E,
   clearRenderCounterRegistry: () => P,
   renderCounterRegistry: () => _,
   useRenderCounter: () => I
  };
 for (var v in y) c(m, v, {
  get: y[v],
  enumerable: !0
 });
 t.exports = p(c({}, "__esModule", {
  value: !0
 }), m);
 var g = (o = null != (r = e.r(271645)) ? l(h(r)) : {}, p(!n && r && r.__esModule ? o : c(o, "default", {
   value: r,
   enumerable: !0
  }), r)),
  {
   useRef: x,
   useEffect: b,
   isValidElement: k
  } = g,
  w = null != (s = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) ? s : g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  S = Symbol.for("react.memo_cache_sentinel"),
  E = "function" == typeof(null == (a = g.__COMPILER_RUNTIME) ? void 0 : a.c) ? g.__COMPILER_RUNTIME.c : function(e) {
   return g.useMemo(() => {
    let t = Array(e);
    for (let i = 0; i < e; i++) t[i] = S;
    return t[S] = !0, t
   }, [])
  },
  A = {};
 ["readContext", "useCallback", "useContext", "useEffect", "useImperativeHandle", "useInsertionEffect", "useLayoutEffect", "useMemo", "useReducer", "useRef", "useState", "useDebugValue", "useDeferredValue", "useTransition", "useMutableSource", "useSyncExternalStore", "useId", "unstable_isNewReconciler", "getCacheSignal", "getCacheForType", "useCacheRefresh"].forEach(e => {
  A[e] = () => {
   throw Error(`[React] Unexpected React hook call (${e}) from a React compiled function. Check that all hooks are called directly and named according to convention ('use[A-Z]') `)
  }
 });
 var j = null;

 function C(e) {
  return w.ReactCurrentDispatcher.current = e, w.ReactCurrentDispatcher.current
 }
 A.useMemoCache = e => {
  if (null != j) return j.useMemoCache(e);
  throw Error("React Compiler internal invariant violation: unexpected null dispatcher")
 };
 var T = [];

 function O(e) {
  let t = w.ReactCurrentDispatcher.current;
  if (0 === e) {
   if (T.push(t), 1 === T.length && (j = t), t === A) throw Error("[React] Unexpected call to custom hook or component from a React compiled function. Check that (1) all hooks are called directly and named according to convention ('use[A-Z]') and (2) components are returned as JSX instead of being directly invoked.");
   C(A)
  } else if (1 === e) {
   let e = T.pop();
   if (null == e) throw Error("React Compiler internal error: unexpected null in guard stack");
   0 === T.length && (j = null), C(e)
  } else if (2 === e) T.push(t), C(j);
  else if (3 === e) {
   let e = T.pop();
   if (null == e) throw Error("React Compiler internal error: unexpected null in guard stack");
   C(e)
  } else throw Error("React Compiler internal error: unreachable block" + e)
 }

 function N(e) {
  for (let t = 0; t < e.length; t++) e[t] = S
 }

 function R() {
  throw Error("TODO: implement $makeReadOnly in react-compiler-runtime")
 }
 var _ = new Map;

 function P() {
  for (let e of _.values()) e.forEach(e => {
   e.count = 0
  })
 }

 function I(e) {
  let t = x(null);
  null != t.current && (t.current.count += 1), b(() => {
   if (null == t.current) {
    let i, r = {
     count: 0
    };
    null == (i = _.get(e)) && (i = new Set, _.set(e, i)), i.add(r), t.current = r
   }
   return () => {
    var i;
    let r;
    null !== t.current && (i = t.current, null != (r = _.get(e)) && r.delete(i))
   }
  })
 }
 var M = new Set;

 function D(e, t, i, r, n, o) {
  function s(e, t, s, a) {
   let l = `${r}:${o} [${n}] ${i}${s} changed from ${e} to ${t} at depth ${a}`;
   M.has(l) || (M.add(l), console.error(l))
  }! function e(t, i, r, n) {
   if (!(n > 2)) {
    if (t !== i)
     if (typeof t != typeof i) s(`type ${typeof t}`, `type ${typeof i}`, r, n);
     else if ("object" == typeof t) {
     let o = Array.isArray(t),
      a = Array.isArray(i);
     if (null === t && null !== i) s("null", `type ${typeof i}`, r, n);
     else if (null === i) s(`type ${typeof t}`, "null", r, n);
     else if (t instanceof Map)
      if (i instanceof Map)
       if (t.size !== i.size) s(`Map instance with size ${t.size}`, `Map instance with size ${i.size}`, r, n);
       else
        for (let [o, a] of t) i.has(o) ? e(a, i.get(o), `${r}.get(${o})`, n + 1) : s(`Map instance with key ${o}`, `Map instance without key ${o}`, r, n);
     else s("Map instance", "other value", r, n);
     else if (i instanceof Map) s("other value", "Map instance", r, n);
     else if (t instanceof Set)
      if (i instanceof Set)
       if (t.size !== i.size) s(`Set instance with size ${t.size}`, `Set instance with size ${i.size}`, r, n);
       else
        for (let e of i) t.has(e) || s(`Set instance without element ${e}`, `Set instance with element ${e}`, r, n);
     else s("Set instance", "other value", r, n);
     else if (i instanceof Set) s("other value", "Set instance", r, n);
     else if (o || a)
      if (o !== a) s(`type ${o?"array":"object"}`, `type ${a?"array":"object"}`, r, n);
      else if (t.length !== i.length) s(`array with length ${t.length}`, `array with length ${i.length}`, r, n);
     else
      for (let o = 0; o < t.length; o++) e(t[o], i[o], `${r}[${o}]`, n + 1);
     else if (k(t) || k(i)) k(t) !== k(i) ? s(`type ${k(t)?"React element":"object"}`, `type ${k(i)?"React element":"object"}`, r, n) : t.type !== i.type ? s(`React element of type ${t.type}`, `React element of type ${i.type}`, r, n) : e(t.props, i.props, `[props of ${r}]`, n + 1);
     else {
      for (let e in i) e in t || s(`object without key ${e}`, `object with key ${e}`, r, n);
      for (let o in t) o in i ? e(t[o], i[o], `${r}.${o}`, n + 1) : s(`object with key ${o}`, `object without key ${o}`, r, n)
     }
    } else {
     if ("function" == typeof t) return;
     isNaN(t) || isNaN(i) ? isNaN(t) !== isNaN(i) && s(`${isNaN(t)?"NaN":"non-NaN value"}`, `${isNaN(i)?"NaN":"non-NaN value"}`, r, n) : t !== i && s(t, i, r, n)
    }
   }
  }(e, t, "", 0)
 }
}, 638774, e => {
 "use strict";

 function t(e) {
  return "object" == typeof e && null !== e && !Array.isArray(e)
 }
 var i = {
   0: 8203,
   1: 8204,
   2: 8205,
   3: 8290,
   4: 8291,
   5: 8288,
   6: 65279,
   7: 8289,
   8: 119155,
   9: 119156,
   a: 119157,
   b: 119158,
   c: 119159,
   d: 119160,
   e: 119161,
   f: 119162
  },
  r = {
   0: 8203,
   1: 8204,
   2: 8205,
   3: 65279
  };
 [, , , , ].fill(String.fromCodePoint(r[0])).join(""), Object.fromEntries(Object.entries(r).map(e => e.reverse())), Object.fromEntries(Object.entries(i).map(e => e.reverse()));
 var n = `${Object.values(i).map(e=>`\\u{${e.toString(16)}}`).join("")}`,
  o = RegExp(`[${n}]{4,}`, "gu");

 function s(e) {
  var t, i;
  return e && JSON.parse({
   cleaned: (t = JSON.stringify(e)).replace(o, ""),
   encoded: (null == (i = t.match(o)) ? void 0 : i[0]) || ""
  }.cleaned)
 }
 e.s(["isRecord", () => t, "stegaClean", () => s])
}, 303756, e => {
 "use strict";
 let t = new Set,
  i = "checking";

 function r(e) {
  if (i.toString() !== e.toString())
   for (let r of (i = e, t)) r()
 }
 let n = new Set,
  o = "checking";

 function s(e) {
  for (let t of (o = e, n)) t()
 }
 let a = new Set,
  l = null,
  c = null,
  u = null;

 function d(e) {
  for (let t of (l = e, a)) t()
 }

 function h(e, t) {
  for (let i of (c = e, u = t, a)) i()
 }
 e.s(["a", () => o, "c", () => t, "d", () => s, "f", () => r, "i", () => c, "l", () => d, "n", () => u, "o", () => n, "r", () => a, "s", () => i, "t", () => l, "u", () => h])
}, 636536, e => {
 "use strict";
 var t = e.i(881283);
 let i = {
   "handshake/syn": t.MSG_HANDSHAKE_SYN,
   "handshake/syn-ack": t.MSG_HANDSHAKE_SYN_ACK,
   "handshake/ack": t.MSG_HANDSHAKE_ACK,
   "channel/response": t.MSG_RESPONSE,
   "channel/heartbeat": t.MSG_HEARTBEAT,
   "channel/disconnect": t.MSG_DISCONNECT,
   "overlay/focus": "visual-editing/focus",
   "overlay/navigate": "visual-editing/navigate",
   "overlay/toggle": "visual-editing/toggle",
   "presentation/toggleOverlay": "presentation/toggle-overlay"
  },
  r = {
   [t.MSG_HANDSHAKE_SYN]: "handshake/syn",
   [t.MSG_HANDSHAKE_SYN_ACK]: "handshake/syn-ack",
   [t.MSG_HANDSHAKE_ACK]: "handshake/ack",
   [t.MSG_RESPONSE]: "channel/response",
   [t.MSG_HEARTBEAT]: "channel/heartbeat",
   [t.MSG_DISCONNECT]: "channel/disconnect",
   "visual-editing/focus": "overlay/focus",
   "visual-editing/navigate": "overlay/navigate",
   "visual-editing/toggle": "overlay/toggle",
   "presentation/toggle-overlay": "presentation/toggleOverlay"
  },
  n = e => {
   let {
    data: r
   } = e;
   return r && "object" == typeof r && "domain" in r && "type" in r && "from" in r && "to" in r && ("sanity/channels" === r.domain && (r.domain = t.DOMAIN), "overlays" === r.to && (r.to = "visual-editing"), "overlays" === r.from && (r.from = "visual-editing"), r.channelId = r.connectionId, delete r.connectionId, r.type = i[r.type] ?? r.type), e
  },
  o = ({
   context: e
  }, i) => {
   let {
    sources: n,
    targetOrigin: o
   } = e, s = (e => {
    let {
     channelId: i,
     ...n
    } = e, o = {
     ...n,
     connectionId: i
    };
    return o.domain === t.DOMAIN && (o.domain = "sanity/channels"), "visual-editing" === o.to && (o.to = "overlays"), "visual-editing" === o.from && (o.from = "overlays"), o.type = r[o.type] ?? o.type, "channel/response" === o.type && o.responseTo && !o.data && (o.data = {
     responseTo: o.responseTo
    }), ("handshake/syn" === o.type || "handshake/syn-ack" === o.type || "handshake/ack" === o.type) && (o.data = {
     id: o.connectionId
    }), o
   })(i.message);
   n.forEach(e => {
    e.postMessage(s, {
     targetOrigin: o
    })
   })
  },
  s = () => ({
   listen: (0, t.createListenLogic)(n),
   requestMachine: (0, t.createRequestMachine)().provide({
    actions: {
     "send message": o
    }
   })
  });

 function a() {
  return window.self !== window.top
 }

 function l() {
  return !!window.opener
 }

 function c() {
  return a() || l()
 }
 e.s(["createCompatibilityActors", () => s, "isMaybePresentation", () => c, "isMaybePreviewIframe", () => a, "isMaybePreviewWindow", () => l])
}, 95187, (e, t, i) => {
 "use strict";
 Object.defineProperty(i, "__esModule", {
  value: !0
 });
 var r = {
  callServer: function() {
   return o.callServer
  },
  createServerReference: function() {
   return a.createServerReference
  },
  findSourceMapURL: function() {
   return s.findSourceMapURL
  }
 };
 for (var n in r) Object.defineProperty(i, n, {
  enumerable: !0,
  get: r[n]
 });
 let o = e.r(132120),
  s = e.r(92245),
  a = e.r(235326)
}, 419744, e => {
 "use strict";
 var t = e.i(918879);

 function i(e) {
  return e instanceof t.CorsOriginError
 }
 e.s(["t", () => i])
}, 667585, (e, t, i) => {
 "use strict";
 Object.defineProperty(i, "__esModule", {
  value: !0
 }), Object.defineProperty(i, "BailoutToCSR", {
  enumerable: !0,
  get: function() {
   return n
  }
 });
 let r = e.r(132061);

 function n({
  reason: e,
  children: t
 }) {
  if ("u" < typeof window) throw Object.defineProperty(new r.BailoutToCSRError(e), "__NEXT_ERROR_CODE", {
   value: "E394",
   enumerable: !1,
   configurable: !0
  });
  return t
 }
}, 309885, (e, t, i) => {
 "use strict";

 function r(e) {
  return e.split("/").map(e => encodeURIComponent(e)).join("/")
 }
 Object.defineProperty(i, "__esModule", {
  value: !0
 }), Object.defineProperty(i, "encodeURIPath", {
  enumerable: !0,
  get: function() {
   return r
  }
 })
}, 652157, (e, t, i) => {
 "use strict";
 Object.defineProperty(i, "__esModule", {
  value: !0
 }), Object.defineProperty(i, "PreloadChunks", {
  enumerable: !0,
  get: function() {
   return l
  }
 });
 let r = e.r(843476),
  n = e.r(174080),
  o = e.r(563599),
  s = e.r(309885),
  a = e.r(543369);

 function l({
  moduleIds: e
 }) {
  if ("u" > typeof window) return null;
  let t = o.workAsyncStorage.getStore();
  if (void 0 === t) return null;
  let i = [];
  if (t.reactLoadableManifest && e) {
   let r = t.reactLoadableManifest;
   for (let t of e) {
    if (!r[t]) continue;
    let e = r[t].files;
    i.push(...e)
   }
  }
  if (0 === i.length) return null;
  let l = (0, a.getDeploymentIdQueryOrEmptyString)();
  return (0, r.jsx)(r.Fragment, {
   children: i.map(e => {
    let i = `${t.assetPrefix}/_next/${(0,s.encodeURIPath)(e)}${l}`;
    return e.endsWith(".css") ? (0, r.jsx)("link", {
     precedence: "dynamic",
     href: i,
     rel: "stylesheet",
     as: "style",
     nonce: t.nonce
    }, e) : ((0, n.preload)(i, {
     as: "script",
     fetchPriority: "low",
     nonce: t.nonce
    }), null)
   })
  })
 }
}, 869093, (e, t, i) => {
 "use strict";
 Object.defineProperty(i, "__esModule", {
  value: !0
 }), Object.defineProperty(i, "default", {
  enumerable: !0,
  get: function() {
   return c
  }
 });
 let r = e.r(843476),
  n = e.r(271645),
  o = e.r(667585),
  s = e.r(652157);

 function a(e) {
  return {
   default: e && "default" in e ? e.default : e
  }
 }
 let l = {
   loader: () => Promise.resolve(a(() => null)),
   loading: null,
   ssr: !0
  },
  c = function(e) {
   let t = {
     ...l,
     ...e
    },
    i = (0, n.lazy)(() => t.loader().then(a)),
    c = t.loading;

   function u(e) {
    let a = c ? (0, r.jsx)(c, {
      isLoading: !0,
      pastDelay: !0,
      error: null
     }) : null,
     l = !t.ssr || !!t.loading,
     u = l ? n.Suspense : n.Fragment,
     d = t.ssr ? (0, r.jsxs)(r.Fragment, {
      children: ["u" < typeof window ? (0, r.jsx)(s.PreloadChunks, {
       moduleIds: t.modules
      }) : null, (0, r.jsx)(i, {
       ...e
      })]
     }) : (0, r.jsx)(o.BailoutToCSR, {
      reason: "next/dynamic",
      children: (0, r.jsx)(i, {
       ...e
      })
     });
    return (0, r.jsx)(u, {
     ...l ? {
      fallback: a
     } : {},
     children: d
    })
   }
   return u.displayName = "LoadableComponent", u
  }
}, 770703, (e, t, i) => {
 "use strict";
 Object.defineProperty(i, "__esModule", {
  value: !0
 }), Object.defineProperty(i, "default", {
  enumerable: !0,
  get: function() {
   return n
  }
 });
 let r = e.r(555682)._(e.r(869093));

 function n(e, t) {
  let i = {};
  "function" == typeof e && (i.loader = e);
  let n = {
   ...i,
   ...t
  };
  return (0, r.default)({
   ...n,
   modules: n.loadableGenerated?.modules
  })
 }("function" == typeof i.default || "object" == typeof i.default && null !== i.default) && void 0 === i.default.__esModule && (Object.defineProperty(i.default, "__esModule", {
  value: !0
 }), Object.assign(i.default, i), t.exports = i.default)
}, 709733, e => {
 "use strict";
 e.i(247167);
 var t = e.i(303756),
  i = e.i(419744),
  r = e.i(618566),
  n = e.i(271645),
  o = e.i(636536),
  s = e.i(462576),
  a = e.i(843476),
  l = e.i(918879),
  c = e.i(770703),
  u = e.i(95187);
 let d = (0, u.createServerReference)("40809b853802e659c6964c14b7fba568948d159503", u.callServer, void 0, u.findSourceMapURL, "revalidateSyncTags"),
  h = (0, c.default)(() => e.A(604448), {
   ssr: !1
  }),
  f = (0, c.default)(() => e.A(360650), {
   ssr: !1
  }),
  p = (0, c.default)(() => e.A(864564), {
   ssr: !1
  }),
  m = (0, c.default)(() => e.A(378671), {
   ssr: !1
  });

 function y(e) {
  (0, i.t)(e) ? console.warn(`Sanity Live is unable to connect to the Sanity API as the current origin - ${window.origin} - is not in the list of allowed CORS origins for this Sanity Project.`, e.addOriginUrl && "Add it here:", e.addOriginUrl?.toString()): console.error(e)
 }

 function v(e, t) {
  t ? console.warn("Sanity Live connection closed, switching to long polling set to a interval of", t / 1e3, "seconds and the server gave this reason:", e.reason) : console.error("Sanity Live connection closed, automatic revalidation is disabled, the server gave this reason:", e.reason)
 }

 function g(e) {
  let {
   projectId: i,
   dataset: c,
   apiHost: u,
   apiVersion: g,
   useProjectHostname: x,
   token: b,
   requestTagPrefix: k,
   draftModeEnabled: w,
   draftModePerspective: S,
   refreshOnMount: E = !1,
   refreshOnFocus: A = !w && ("u" < typeof window || window.self === window.top),
   refreshOnReconnect: j = !0,
   intervalOnGoAway: C = 3e4,
   requestTag: T = "next-loader.live",
   onError: O = y,
   onGoAway: N = v,
   revalidateSyncTags: R = d
  } = e, _ = (0, n.useMemo)(() => (0, l.createClient)({
   projectId: i,
   dataset: c,
   apiHost: u,
   apiVersion: g,
   useProjectHostname: x,
   ignoreBrowserTokenWarning: !0,
   token: b,
   useCdn: !1,
   requestTagPrefix: k
  }), [u, g, c, i, k, b, x]), [P, I] = (0, n.useState)(!1), M = (0, r.useRouter)(), D = (0, s.useEffectEvent)(e => {
   "message" === e.type ? R(e.tags).then(e => {
    "refresh" === e && M.refresh()
   }) : "restart" === e.type || "reconnect" === e.type ? M.refresh() : "goaway" === e.type && (N(e, C), I(C))
  });
  (0, n.useEffect)(() => {
   let e = _.live.events({
    includeDrafts: !!b,
    tag: T
   }).subscribe({
    next: D,
    error: e => {
     O(e)
    }
   });
   return () => e.unsubscribe()
  }, [_.live, O, T, b]), (0, n.useEffect)(() => {
   w && S ? (0, t.f)(S) : (0, t.f)("unknown")
  }, [w, S]);
  let [L, $] = (0, n.useState)(!1);
  (0, n.useEffect)(() => {
   if (!(0, o.isMaybePresentation)()) {
    if (w && b) return void(0, t.d)("live");
    if (w) return void(0, t.d)("static");
    (0, t.d)("unknown")
   }
  }, [w, b]), (0, n.useEffect)(() => {
   if (!(0, o.isMaybePresentation)()) return;
   let e = new AbortController,
    i = setTimeout(() => (0, t.d)("live"), 3e3);
   return window.addEventListener("message", ({
    data: r
   }) => {
    r && "object" == typeof r && "domain" in r && "sanity/channels" === r.domain && "from" in r && "presentation" === r.from && (clearTimeout(i), (0, t.d)((0, o.isMaybePreviewWindow)() ? "presentation-window" : "presentation-iframe"), $(!0), e.abort())
   }, {
    signal: e.signal
   }), () => {
    clearTimeout(i), e.abort()
   }
  }, []);
  let V = (0, n.useRef)(void 0);
  return (0, n.useEffect)(() => {
   if (w) return clearTimeout(V.current), () => {
    V.current = setTimeout(() => {
     console.warn("Sanity Live: Draft mode was enabled, but is now being disabled")
    })
   }
  }, [w]), (0, n.useEffect)(() => {
   if (!P) return;
   let e = setInterval(() => M.refresh(), P);
   return () => clearInterval(e)
  }, [P, M]), (0, a.jsxs)(a.Fragment, {
   children: [w && L && (0, a.jsx)(h, {
    projectId: i,
    dataset: c,
    draftModeEnabled: w,
    draftModePerspective: S
   }), !w && E && (0, a.jsx)(f, {}), !w && A && (0, a.jsx)(p, {}), !w && j && (0, a.jsx)(m, {})]
  })
 }
 e.s(["default", () => g], 709733)
}, 7707, e => {
 "use strict";
 var t = e.i(843476);
 let i = (0, e.i(770703).default)(() => e.A(364081), {
  ssr: !1
 });

 function r(e) {
  return (0, t.jsx)(i, {
   ...e
  })
 }
 e.s(["default", () => r])
}, 824511, e => {
 "use strict";
 let t = (0, e.i(907051).createMotionProxy)();
 e.s(["m", () => t])
}, 113182, e => {
 "use strict";
 var t = e.i(440254);
 let i = {
   duration: 1,
   ease: (0, t.cubicBezier)(.85, 0, .15, 1)
  },
  r = {
   hide: {
    y: 25,
    opacity: 0
   },
   show: {
    y: 0,
    opacity: 1,
    transition: {
     duration: 1,
     ease: (0, t.cubicBezier)(.1, .1, .1, 1)
    }
   }
  },
  n = {
   hide: {
    y: "100%",
    opacity: 0
   },
   show: {
    y: 0,
    opacity: 1,
    transition: {
     ...i,
     opacity: {
      duration: .6,
      delay: .4,
      ease: "easeInOut"
     }
    }
   },
   exit: {
    y: "-100%",
    opacity: 0,
    transition: {
     ...i,
     opacity: {
      duration: .6,
      ease: "easeInOut"
     }
    }
   }
  };
 e.s(["IN_VIEW_CONFIG", 0, {
  margin: "0px 0px -20% 0px",
  once: !0
 }, "STAGGER_CONTAINER_CONFIG", 0, {
  show: {
   transition: {
    delayChildren: .2,
    staggerChildren: .1
   }
  }
 }, "dotButtonMorphAnim", 0, {
  transition: {
   type: "spring",
   duration: 1,
   bounce: .3
  }
 }, "fadeAnim", 0, {
  show: {
   opacity: 1
  },
  hide: {
   opacity: 0
  },
  transition: {
   duration: .2,
   when: "beforeChildren"
  }
 }, "fadeBlurAnim", 0, {
  hide: {
   opacity: 0,
   filter: "blur(2px)"
  },
  show: {
   opacity: 1,
   filter: "blur(0px)"
  },
  transition: {
   type: "spring",
   duration: .3,
   bounce: 0
  }
 }, "fadeMoveAnim", 0, r, "fadeSlideRevealAnim", 0, n, "lineDrawAnim", 0, ({
  type: e = "horizontal",
  duration: t = 2.1,
  delay: i = 0
 }) => {
  let r = {
   duration: t,
   ease: "circInOut",
   delay: i
  };
  switch (e) {
   case "horizontal":
    return {
     hide: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
     }, show: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: r
     }
    };
   case "horizontal-reversed":
    return {
     hide: {
      clipPath: "polygon(100% 100%, 100% 100%, 100% 0, 100% 0)"
     }, show: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: r
     }
    };
   case "vertical":
    return {
     hide: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
     }, show: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: r
     }
    };
   default:
    return null
  }
 }, "pageTransitionFade", 0, {
  pageHide: {
   opacity: 0
  },
  pageShow: {
   opacity: 1,
   transition: {
    duration: .3,
    ease: "easeInOut"
   }
  },
  pageExit: {
   opacity: 0,
   transition: {
    duration: .3,
    ease: "easeInOut"
   }
  }
 }, "slideRevealAnim", 0, {
  hidden: {
   y: "-100%"
  },
  show: {
   y: "0%"
  },
  transition: {
   duration: 1.2,
   ease: "circOut"
  }
 }])
}, 60919, e => {
 "use strict";
 var t = e.i(113182);

 function i(e, r = t.IN_VIEW_CONFIG) {
  return {
   initial: "hide",
   whileInView: "show",
   viewport: r,
   variants: e
  }
 }
 e.s(["useInViewAnimation", () => i])
}, 887652, e => {
 "use strict";
 var t = e.i(486427),
  i = e.i(271645),
  r = e.i(737806),
  n = e.i(947414);

 function o(e) {
  let o = (0, n.useConstant)(() => (0, t.motionValue)(e)),
   {
    isStatic: s
   } = (0, i.useContext)(r.MotionConfigContext);
  if (s) {
   let [, t] = (0, i.useState)(e);
   (0, i.useEffect)(() => o.on("change", t), [])
  }
  return o
 }
 e.s(["useMotionValue", () => o])
}, 895420, 212381, e => {
 "use strict";
 var t = e.i(344230),
  i = e.i(947414),
  r = e.i(287022),
  n = e.i(674008),
  o = e.i(887652);

 function s(e, t) {
  let i = (0, o.useMotionValue)(t()),
   s = () => i.set(t());
  return s(), (0, n.useIsomorphicLayoutEffect)(() => {
   let t = () => r.frame.preRender(s, !1, !0),
    i = e.map(e => e.on("change", t));
   return () => {
    i.forEach(e => e()), (0, r.cancelFrame)(s)
   }
  }), i
 }
 e.s(["useCombineMotionValues", () => s], 212381);
 var a = e.i(486427);

 function l(e, t) {
  let r = (0, i.useConstant)(() => []);
  return s(e, () => {
   r.length = 0;
   let i = e.length;
   for (let t = 0; t < i; t++) r[t] = e[t].get();
   return t(r)
  })
 }
 e.s(["useTransform", () => function e(r, n, o, c) {
  if ("function" == typeof r) {
   let e;
   return a.collectMotionValues.current = [], r(), e = s(a.collectMotionValues.current, r), a.collectMotionValues.current = void 0, e
  }
  if (void 0 !== o && !Array.isArray(o) && "function" != typeof n) {
   var u = r,
    d = n,
    h = o,
    f = c;
   let t = (0, i.useConstant)(() => Object.keys(h)),
    s = (0, i.useConstant)(() => ({}));
   for (let i of t) s[i] = e(u, d, h[i], f);
   return s
  }
  let p = "function" == typeof n ? n : function(...e) {
   let i = !Array.isArray(e[0]),
    r = i ? 0 : -1,
    n = e[0 + r],
    o = e[1 + r],
    s = e[2 + r],
    a = e[3 + r],
    l = (0, t.interpolate)(o, s, a);
   return i ? l(n) : l
  }(n, o, c);
  return Array.isArray(r) ? l(r, p) : l([r], ([e]) => p(e))
 }], 895420)
}, 449492, e => {
 "use strict";
 class t {
  constructor(e) {
   this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean)
  }
  get finished() {
   return Promise.all(this.animations.map(e => e.finished))
  }
  getAll(e) {
   return this.animations[0][e]
  }
  setAll(e, t) {
   for (let i = 0; i < this.animations.length; i++) this.animations[i][e] = t
  }
  attachTimeline(e) {
   let t = this.animations.map(t => t.attachTimeline(e));
   return () => {
    t.forEach((e, t) => {
     e && e(), this.animations[t].stop()
    })
   }
  }
  get time() {
   return this.getAll("time")
  }
  set time(e) {
   this.setAll("time", e)
  }
  get speed() {
   return this.getAll("speed")
  }
  set speed(e) {
   this.setAll("speed", e)
  }
  get state() {
   return this.getAll("state")
  }
  get startTime() {
   return this.getAll("startTime")
  }
  get duration() {
   return i(this.animations, "duration")
  }
  get iterationDuration() {
   return i(this.animations, "iterationDuration")
  }
  runAll(e) {
   this.animations.forEach(t => t[e]())
  }
  play() {
   this.runAll("play")
  }
  pause() {
   this.runAll("pause")
  }
  cancel() {
   this.runAll("cancel")
  }
  complete() {
   this.runAll("complete")
  }
 }

 function i(e, t) {
  let i = 0;
  for (let r = 0; r < e.length; r++) {
   let n = e[r][t];
   null !== n && n > i && (i = n)
  }
  return i
 }
 class r extends t {
  then(e, t) {
   return this.finished.finally(e).then(() => {})
  }
 }
 var n = e.i(133887),
  o = e.i(486427),
  s = e.i(373431),
  a = e.i(83411),
  l = e.i(515923),
  c = e.i(997307),
  u = e.i(721748),
  d = e.i(215932),
  h = e.i(783920),
  f = e.i(763074),
  p = e.i(965566),
  m = e.i(893544);

 function y(e, t) {
  var i;
  let r;
  return (0, m.isEasingArray)(e) ? e[i = e.length, ((t - 0) % (r = i - 0) + r) % r + 0] : e
 }
 var v = e.i(749652);

 function g(e) {
  return "object" == typeof e && !Array.isArray(e)
 }

 function x(e, t, i, r) {
  return null == e ? [] : "string" == typeof e && g(t) ? (0, v.resolveElements)(e, i, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter(e => null != e) : [e]
 }

 function b(e, t, i, r) {
  return "number" == typeof t ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : "<" === t ? i : t.startsWith("<") ? Math.max(0, i + parseFloat(t.slice(1))) : r.get(t) ?? e
 }
 var k = e.i(100706);

 function w(e, t) {
  return e.at !== t.at ? e.at - t.at : null === e.value ? 1 : null === t.value ? -1 : 0
 }

 function S(e, t) {
  return t.has(e) || t.set(e, {}), t.get(e)
 }

 function E(e, t) {
  return t[e] || (t[e] = []), t[e]
 }
 let A = e => "number" == typeof e,
  j = e => e.every(A);
 var C = e.i(768705),
  T = e.i(472094),
  O = e.i(372323),
  N = e.i(889026),
  R = e.i(836331),
  _ = e.i(275737),
  P = e.i(386783),
  I = e.i(130162),
  M = e.i(617218);
 class D extends M.VisualElement {
  constructor() {
   super(...arguments), this.type = "object"
  }
  readValueFromInstance(e, t) {
   if (t in e) {
    let i = e[t];
    if ("string" == typeof i || "number" == typeof i) return i
   }
  }
  getBaseTargetFromProps() {}
  removeValueFromRenderState(e, t) {
   delete t.output[e]
  }
  measureInstanceViewportBox() {
   return (0, I.createBox)()
  }
  build(e, t) {
   Object.assign(e.output, t)
  }
  renderInstance(e, {
   output: t
  }) {
   Object.assign(e, t)
  }
  sortInstanceNodePosition() {
   return 0
  }
 }

 function L(e) {
  let t = {
    presenceContext: null,
    props: {},
    visualState: {
     renderState: {
      transform: {},
      transformOrigin: {},
      style: {},
      vars: {},
      attrs: {}
     },
     latestValues: {}
    }
   },
   i = (0, N.isSVGElement)(e) && !(0, R.isSVGSVGElement)(e) ? new _.SVGVisualElement(t) : new P.HTMLVisualElement(t);
  i.mount(e), T.visualElementStore.set(e, i)
 }

 function $(e) {
  let t = new D({
   presenceContext: null,
   props: {},
   visualState: {
    renderState: {
     output: {}
    },
    latestValues: {}
   }
  });
  t.mount(e), T.visualElementStore.set(e, t)
 }

 function V(e, t, i, r) {
  let n = [];
  if ((0, a.isMotionValue)(e) || "number" == typeof e || "string" == typeof e && !g(t)) n.push((0, C.animateSingleValue)(e, g(t) && t.default || t, i && i.default || i));
  else {
   if (null == e) return n;
   let o = x(e, t, r),
    s = o.length;
   (0, p.invariant)(!!s, "No valid elements provided.", "no-valid-elements");
   for (let e = 0; e < s; e++) {
    let r = o[e],
     a = r instanceof Element ? L : $;
    T.visualElementStore.has(r) || a(r);
    let l = T.visualElementStore.get(r),
     c = {
      ...i
     };
    "delay" in c && "function" == typeof c.delay && (c.delay = c.delay(e, s)), n.push(...(0, O.animateTarget)(l, {
     ...t,
     transition: c
    }, {}))
   }
  }
  return n
 }

 function F(e = {}) {
  let {
   scope: t,
   reduceMotion: i
  } = e;
  return function(e, m, v) {
   var g;
   let A, C = [];
   if (Array.isArray(e) && e.some(Array.isArray)) {
    let r;
    g = void 0 !== i ? {
     reduceMotion: i,
     ...m
    } : m, r = [], (function(e, {
     defaultTransition: t = {},
     ...i
    } = {}, r, o) {
     let s = t.duration || .3,
      m = new Map,
      v = new Map,
      g = {},
      A = new Map,
      C = 0,
      T = 0,
      O = 0;
     for (let i = 0; i < e.length; i++) {
      let h = e[i];
      if ("string" == typeof h) {
       A.set(h, T);
       continue
      }
      if (!Array.isArray(h)) {
       A.set(h.name, b(T, h.at, C, A));
       continue
      }
      let [m, w, _ = {}] = h;
      void 0 !== _.at && (T = b(T, _.at, C, A));
      let P = 0,
       I = (e, i, r, a = 0, h = 0) => {
        var m;
        let v = Array.isArray(m = e) ? m : [m],
         {
          delay: g = 0,
          times: x = (0, l.defaultOffset)(v),
          type: b = t.type || "keyframes",
          repeat: w,
          repeatType: S,
          repeatDelay: E = 0,
          ...A
         } = i,
         {
          ease: C = t.ease || "easeOut",
          duration: N
         } = i,
         R = "function" == typeof g ? g(a, h) : g,
         _ = v.length,
         I = (0, c.isGenerator)(b) ? b : o?.[b || "keyframes"];
        if (_ <= 2 && I) {
         let e = 100;
         2 === _ && j(v) && (e = Math.abs(v[1] - v[0]));
         let i = {
          ...t,
          ...A
         };
         void 0 !== N && (i.duration = (0, f.secondsToMilliseconds)(N));
         let r = (0, u.createGeneratorEasing)(i, e, I);
         C = r.ease, N = r.duration
        }
        N ?? (N = s);
        let M = T + R;
        1 === x.length && 0 === x[0] && (x[1] = 1);
        let D = x.length - v.length;
        if (D > 0 && (0, d.fillOffset)(x, D), 1 === v.length && v.unshift(null), w) {
         (0, p.invariant)(w < 20, "Repeat count too high, must be less than 20", "repeat-count-high");
         N *= w + 1;
         let e = [...v],
          t = [...x],
          i = [...C = Array.isArray(C) ? [...C] : [C]];
         for (let r = 0; r < w; r++) {
          v.push(...e);
          for (let n = 0; n < e.length; n++) x.push(t[n] + (r + 1)), C.push(0 === n ? "linear" : y(i, n - 1))
         }
         for (let e = 0; e < x.length; e++) x[e] = x[e] / (w + 1)
        }
        let L = M + N;
        ! function(e, t, i, r, o, s) {
         for (let t = 0; t < e.length; t++) {
          let i = e[t];
          i.at > o && i.at < s && ((0, n.removeItem)(e, i), t--)
         }
         for (let n = 0; n < t.length; n++) e.push({
          value: t[n],
          at: (0, k.mixNumber)(o, s, r[n]),
          easing: y(i, n)
         })
        }(r, v, C, x, M, L), P = Math.max(R + N, P), O = Math.max(L, O)
       };
      if ((0, a.isMotionValue)(m)) I(w, _, E("default", S(m, v)));
      else {
       let e = x(m, w, r, g),
        t = e.length;
       for (let i = 0; i < t; i++) {
        let r = S(e[i], v);
        for (let e in w) {
         var N, R;
         I(w[e], (N = _, R = e, N && N[R] ? {
          ...N,
          ...N[R]
         } : {
          ...N
         }), E(e, r), i, t)
        }
       }
      }
      C = T, T += P
     }
     return v.forEach((e, r) => {
      for (let n in e) {
       let o = e[n];
       o.sort(w);
       let s = [],
        a = [],
        l = [];
       for (let e = 0; e < o.length; e++) {
        let {
         at: t,
         value: i,
         easing: r
        } = o[e];
        s.push(i), a.push((0, h.progress)(0, O, t)), l.push(r || "easeOut")
       }
       0 !== a[0] && (a.unshift(0), s.unshift(s[0]), l.unshift("easeInOut")), 1 !== a[a.length - 1] && (a.push(1), s.push(null)), m.has(r) || m.set(r, {
        keyframes: {},
        transition: {}
       });
       let c = m.get(r);
       c.keyframes[n] = s;
       let {
        type: u,
        ...d
       } = t;
       c.transition[n] = {
        ...d,
        duration: O,
        ease: l,
        times: a,
        ...i
       }
      }
     }), m
    })(e.map(e => {
     if (Array.isArray(e) && "function" == typeof e[0]) {
      let t = e[0],
       i = (0, o.motionValue)(0);
      return (i.on("change", t), 1 === e.length) ? [i, [0, 1]] : 2 === e.length ? [i, [0, 1], e[1]] : [i, e[1], e[2]]
     }
     return e
    }), g, t, {
     spring: s.spring
    }).forEach(({
     keyframes: e,
     transition: t
    }, i) => {
     r.push(...V(i, e, t))
    }), C = r
   } else {
    let {
     onComplete: r,
     ...n
    } = v || {};
    "function" == typeof r && (A = r), C = V(e, m, void 0 !== i ? {
     reduceMotion: i,
     ...n
    } : n, t)
   }
   let T = new r(C);
   return A && T.finished.then(A), t && (t.animations.push(T), T.finished.then(() => {
    (0, n.removeItem)(t.animations, T)
   })), T
  }
 }
 let G = F();
 e.s(["animate", () => G, "createScopedAnimate", () => F], 449492)
}, 236726, 908035, e => {
 "use strict";
 var t = e.i(843476);

 function i(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
   var r = Object.getOwnPropertySymbols(e);
   t && (r = r.filter(function(t) {
    return Object.getOwnPropertyDescriptor(e, t).enumerable
   })), i.push.apply(i, r)
  }
  return i
 }

 function r(e) {
  for (var t = 1; t < arguments.length; t++) {
   var r = null != arguments[t] ? arguments[t] : {};
   t % 2 ? i(Object(r), !0).forEach(function(t) {
    var i, n, o;
    i = e, n = t, o = r[t], (n = function(e) {
     var t = function(e, t) {
      if ("object" != typeof e || !e) return e;
      var i = e[Symbol.toPrimitive];
      if (void 0 !== i) {
       var r = i.call(e, t || "default");
       if ("object" != typeof r) return r;
       throw TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === t ? String : Number)(e)
     }(e, "string");
     return "symbol" == typeof t ? t : t + ""
    }(n)) in i ? Object.defineProperty(i, n, {
     value: o,
     enumerable: !0,
     configurable: !0,
     writable: !0
    }) : i[n] = o
   }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i(Object(r)).forEach(function(t) {
    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
   })
  }
  return e
 }

 function n(e) {
  return "span" === e._type && "text" in e && "string" == typeof e.text && (typeof e.marks > "u" || Array.isArray(e.marks) && e.marks.every(e => "string" == typeof e))
 }

 function o(e) {
  return "string" == typeof e._type && "@" !== e._type[0] && (!("markDefs" in e) || !e.markDefs || Array.isArray(e.markDefs) && e.markDefs.every(e => "string" == typeof e._key)) && "children" in e && Array.isArray(e.children) && e.children.every(e => "object" == typeof e && "_type" in e)
 }

 function s(e) {
  return o(e) && "listItem" in e && "string" == typeof e.listItem && (typeof e.level > "u" || "number" == typeof e.level)
 }

 function a(e) {
  return "@list" === e._type
 }

 function l(e) {
  return "@span" === e._type
 }

 function c(e) {
  return "@text" === e._type
 }
 let u = ["strong", "em", "code", "underline", "strike-through"];

 function d(e, t, i) {
  if (!n(e) || !e.marks || !e.marks.length) return [];
  let r = e.marks.slice(),
   o = {};
  return r.forEach(e => {
   o[e] = 1;
   for (let r = t + 1; r < i.length; r++) {
    let t = i[r];
    if (t && n(t) && Array.isArray(t.marks) && -1 !== t.marks.indexOf(e)) o[e]++;
    else break
   }
  }), r.sort((e, t) => (function(e, t, i) {
   let r = e[t],
    n = e[i];
   if (r !== n) return n - r;
   let o = u.indexOf(t),
    s = u.indexOf(i);
   return o !== s ? o - s : t.localeCompare(i)
  })(o, e, t))
 }

 function h(e) {
  var t, i;
  let {
   children: r
  } = e, o = null != (t = e.markDefs) ? t : [];
  if (!r || !r.length) return [];
  let s = r.map(d),
   a = {
    _type: "@span",
    children: [],
    markType: "<unknown>"
   },
   l = [a];
  for (let e = 0; e < r.length; e++) {
   let t = r[e];
   if (!t) continue;
   let a = s[e] || [],
    c = 1;
   if (l.length > 1)
    for (; c < l.length; c++) {
     let e = (null == (i = l[c]) ? void 0 : i.markKey) || "",
      t = a.indexOf(e);
     if (-1 === t) break;
     a.splice(t, 1)
    }
   let u = (l = l.slice(0, c))[l.length - 1];
   if (u) {
    for (let e of a) {
     let i = null == o ? void 0 : o.find(t => t._key === e),
      r = i ? i._type : e,
      n = {
       _type: "@span",
       _key: t._key,
       children: [],
       markDef: i,
       markType: r,
       markKey: e
      };
     u.children.push(n), l.push(n), u = n
    }
    if (n(t)) {
     let e = t.text.split(`
`);
     for (let t = e.length; t-- > 1;) e.splice(t, 0, `
`);
     u.children = u.children.concat(e.map(e => ({
      _type: "@text",
      text: e
     })))
    } else u.children = u.children.concat(t)
   }
  }
  return a.children
 }

 function f(e, t) {
  let i, n = [];
  for (let l = 0; l < e.length; l++) {
   let c = e[l];
   if (c) {
    var o, a;
    if (!s(c)) {
     n.push(c), i = void 0;
     continue
    }
    if (!i) {
     i = p(c, l, t), n.push(i);
     continue
    }
    if (o = c, a = i, (o.level || 1) === a.level && o.listItem === a.listItem) {
     i.children.push(c);
     continue
    }
    if ((c.level || 1) > i.level) {
     let e = p(c, l, t);
     if ("html" === t) {
      let t = i.children[i.children.length - 1],
       n = r(r({}, t), {}, {
        children: [...t.children, e]
       });
      i.children[i.children.length - 1] = n
     } else i.children.push(e);
     i = e;
     continue
    }
    if ((c.level || 1) < i.level) {
     let e = n[n.length - 1],
      r = e && m(e, c);
     if (r) {
      (i = r).children.push(c);
      continue
     }
     i = p(c, l, t), n.push(i);
     continue
    }
    if (c.listItem !== i.listItem) {
     let e = n[n.length - 1],
      r = e && m(e, {
       level: c.level || 1
      });
     if (r && r.listItem === c.listItem) {
      (i = r).children.push(c);
      continue
     }
     i = p(c, l, t), n.push(i);
     continue
    }
    console.warn("Unknown state encountered for block", c), n.push(c)
   }
  }
  return n
 }

 function p(e, t, i) {
  return {
   _type: "@list",
   _key: `${e._key||`${t}`}-parent`,
   mode: i,
   level: e.level || 1,
   listItem: e.listItem,
   children: [e]
  }
 }

 function m(e, t) {
  let i = t.level || 1,
   r = t.listItem || "normal",
   o = "string" == typeof t.listItem;
  if (a(e) && (e.level || 1) === i && o && (e.listItem || "normal") === r) return e;
  if (!("children" in e)) return;
  let s = e.children[e.children.length - 1];
  return s && !n(s) ? m(s, t) : void 0
 }

 function y(e) {
  let t = "";
  return e.children.forEach(e => {
   c(e) ? t += e.text : l(e) && (t += y(e))
  }), t
 }
 let v = /^\s/,
  g = /\s$/;

 function x(e) {
  let t = Array.isArray(e) ? e : [e],
   i = "";
  return t.forEach((e, r) => {
   if (!o(e)) return;
   let s = !1;
   e.children.forEach(e => {
    n(e) ? (i += s && i && !g.test(i) && !v.test(e.text) ? " " : "", i += e.text, s = !1) : s = !0
   }), r !== t.length - 1 && (i += `

`)
  }), i
 }
 let b = "html";
 e.s(["LIST_NEST_MODE_HTML", () => b, "buildMarksTree", () => h, "isPortableTextBlock", () => o, "isPortableTextListItemBlock", () => s, "isPortableTextToolkitList", () => a, "isPortableTextToolkitSpan", () => l, "isPortableTextToolkitTextNode", () => c, "nestLists", () => f, "spanToPlainText", () => y, "toPlainText", () => x], 908035);
 var k = e.i(271645);
 let w = ["block", "list", "listItem", "marks", "types"],
  S = ["listItem"],
  E = ["_key"];

 function A(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
   var r = Object.getOwnPropertySymbols(e);
   t && (r = r.filter(function(t) {
    return Object.getOwnPropertyDescriptor(e, t).enumerable
   })), i.push.apply(i, r)
  }
  return i
 }

 function j(e) {
  for (var t = 1; t < arguments.length; t++) {
   var i = null != arguments[t] ? arguments[t] : {};
   t % 2 ? A(Object(i), !0).forEach(function(t) {
    var r, n, o;
    r = e, n = t, o = i[t], (n = function(e) {
     var t = function(e, t) {
      if ("object" != typeof e || !e) return e;
      var i = e[Symbol.toPrimitive];
      if (void 0 !== i) {
       var r = i.call(e, t || "default");
       if ("object" != typeof r) return r;
       throw TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === t ? String : Number)(e)
     }(e, "string");
     return "symbol" == typeof t ? t : t + ""
    }(n)) in r ? Object.defineProperty(r, n, {
     value: o,
     enumerable: !0,
     configurable: !0,
     writable: !0
    }) : r[n] = o
   }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : A(Object(i)).forEach(function(t) {
    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
   })
  }
  return e
 }

 function C(e, t) {
  if (null == e) return {};
  var i, r, n = function(e, t) {
   if (null == e) return {};
   var i = {};
   for (var r in e)
    if (({}).hasOwnProperty.call(e, r)) {
     if (-1 !== t.indexOf(r)) continue;
     i[r] = e[r]
    } return i
  }(e, t);
  if (Object.getOwnPropertySymbols) {
   var o = Object.getOwnPropertySymbols(e);
   for (r = 0; r < o.length; r++) i = o[r], -1 === t.indexOf(i) && ({}).propertyIsEnumerable.call(e, i) && (n[i] = e[i])
  }
  return n
 }
 let T = {
   textDecoration: "underline"
  },
  O = (e, t) => `[@portabletext/react] Unknown ${e}, specify a component for it in the \`components.${t}\` prop`,
  N = e => O(`block type "${e}"`, "types");

 function R(e) {
  console.warn(e)
 }
 let _ = {
   display: "none"
  },
  P = {
   types: {},
   block: {
    normal: ({
     children: e
    }) => (0, t.jsx)("p", {
     children: e
    }),
    blockquote: ({
     children: e
    }) => (0, t.jsx)("blockquote", {
     children: e
    }),
    h1: ({
     children: e
    }) => (0, t.jsx)("h1", {
     children: e
    }),
    h2: ({
     children: e
    }) => (0, t.jsx)("h2", {
     children: e
    }),
    h3: ({
     children: e
    }) => (0, t.jsx)("h3", {
     children: e
    }),
    h4: ({
     children: e
    }) => (0, t.jsx)("h4", {
     children: e
    }),
    h5: ({
     children: e
    }) => (0, t.jsx)("h5", {
     children: e
    }),
    h6: ({
     children: e
    }) => (0, t.jsx)("h6", {
     children: e
    })
   },
   marks: {
    em: ({
     children: e
    }) => (0, t.jsx)("em", {
     children: e
    }),
    strong: ({
     children: e
    }) => (0, t.jsx)("strong", {
     children: e
    }),
    code: ({
     children: e
    }) => (0, t.jsx)("code", {
     children: e
    }),
    underline: ({
     children: e
    }) => (0, t.jsx)("span", {
     style: T,
     children: e
    }),
    "strike-through": ({
     children: e
    }) => (0, t.jsx)("del", {
     children: e
    }),
    link: ({
     children: e,
     value: i
    }) => (0, t.jsx)("a", {
     href: null == i ? void 0 : i.href,
     children: e
    })
   },
   list: {
    number: ({
     children: e
    }) => (0, t.jsx)("ol", {
     children: e
    }),
    bullet: ({
     children: e
    }) => (0, t.jsx)("ul", {
     children: e
    })
   },
   listItem: ({
    children: e
   }) => (0, t.jsx)("li", {
    children: e
   }),
   hardBreak: () => (0, t.jsx)("br", {}),
   unknownType: ({
    value: e,
    isInline: i
   }) => {
    let r = N(e._type);
    return i ? (0, t.jsx)("span", {
     style: _,
     children: r
    }) : (0, t.jsx)("div", {
     style: _,
     children: r
    })
   },
   unknownMark: ({
    markType: e,
    children: i
   }) => (0, t.jsx)("span", {
    className: `unknown__pt__mark__${e}`,
    children: i
   }),
   unknownList: ({
    children: e
   }) => (0, t.jsx)("ul", {
    children: e
   }),
   unknownListItem: ({
    children: e
   }) => (0, t.jsx)("li", {
    children: e
   }),
   unknownBlockStyle: ({
    children: e
   }) => (0, t.jsx)("p", {
    children: e
   })
  };

 function I(e, t, i) {
  let r = t[i],
   n = e[i];
  return "function" == typeof r || r && "function" == typeof n ? r : r ? j(j({}, n), r) : n
 }

 function M({
  value: e,
  components: i,
  listNestingMode: r,
  onMissingComponent: n = R
 }) {
  let o = n || $,
   s = f(Array.isArray(e) ? e : [e], r || b),
   a = (0, k.useMemo)(() => i ? function(e, t) {
    let {
     block: i,
     list: r,
     listItem: n,
     marks: o,
     types: s
    } = t, a = C(t, w);
    return j(j({}, e), {}, {
     block: I(e, t, "block"),
     list: I(e, t, "list"),
     listItem: I(e, t, "listItem"),
     marks: I(e, t, "marks"),
     types: I(e, t, "types")
    }, a)
   }(P, i) : P, [i]),
   l = (0, k.useMemo)(() => D(a, o), [a, o]),
   c = s.map((e, t) => l({
    node: e,
    index: t,
    isInline: !1,
    renderNode: l
   }));
  return (0, t.jsx)(t.Fragment, {
   children: c
  })
 }
 let D = (e, i) => function r(n) {
  var u, d, h, f, p, m, v, g;
  let x, b, {
    node: k,
    index: w,
    isInline: A
   } = n,
   T = k._key || `node-${w}`;
  return a(k) ? function(n, o, s) {
   let a = n.children.map((e, t) => r({
     node: e._key ? e : j(j({}, e), {}, {
      _key: `li-${o}-${t}`
     }),
     index: t,
     isInline: !1
    })),
    l = e.list,
    c = ("function" == typeof l ? l : l[n.listItem]) || e.unknownList;
   if (c === e.unknownList) {
    let e = n.listItem || "bullet";
    i(O(`list style "${e}"`, "list"), {
     nodeType: "listStyle",
     type: e
    })
   }
   return (0, t.jsx)(c, {
    value: n,
    index: o,
    isInline: !1,
    renderNode: r,
    children: a
   }, s)
  }(k, w, T) : s(k) ? function(n, o, s) {
   let a = L({
     node: n,
     index: o,
     isInline: !1,
     renderNode: r
    }),
    l = e.listItem,
    c = ("function" == typeof l ? l : l[n.listItem]) || e.unknownListItem;
   if (c === e.unknownListItem) {
    let e = n.listItem || "bullet";
    i(O(`list item style "${e}"`, "listItem"), {
     type: e,
     nodeType: "listItemStyle"
    })
   }
   let u = a.children;
   if (n.style && "normal" !== n.style) {
    let {
     listItem: e
    } = n;
    u = r({
     node: C(n, S),
     index: o,
     isInline: !1
    })
   }
   return (0, t.jsx)(c, {
    value: n,
    index: o,
    isInline: !1,
    renderNode: r,
    children: u
   }, s)
  }(k, w, T) : l(k) ? function(n, o, s) {
   let {
    markDef: a,
    markType: l,
    markKey: c
   } = n, u = e.marks[l] || e.unknownMark, d = n.children.map((e, t) => r({
    node: e,
    index: t,
    isInline: !0
   }));
   return u === e.unknownMark && i(O(`mark type "${l}"`, "marks"), {
    nodeType: "mark",
    type: l
   }), (0, t.jsx)(u, {
    text: y(n),
    value: a,
    markType: l,
    markKey: c,
    renderNode: r,
    children: d
   }, s)
  }(k, 0, T) : k._type in e.types ? (u = k, d = w, h = T, f = A, (x = e.types[u._type]) ? (0, t.jsx)(x, j({}, {
   value: u,
   isInline: f,
   index: d,
   renderNode: r
  }), h) : null) : o(k) ? function(n, o, s, a) {
   let l = L({
     node: n,
     index: o,
     isInline: a,
     renderNode: r
    }),
    {
     _key: c
    } = l,
    u = C(l, E),
    d = u.node.style || "normal",
    h = ("function" == typeof e.block ? e.block : e.block[d]) || e.unknownBlockStyle;
   return h === e.unknownBlockStyle && i(O(`block style "${d}"`, "block"), {
    nodeType: "blockStyle",
    type: d
   }), (0, t.jsx)(h, j(j({}, u), {}, {
    value: u.node,
    renderNode: r
   }), s)
  }(k, w, T, A) : c(k) ? function(i, r) {
   if (i.text === `
`) {
    let i = e.hardBreak;
    return i ? (0, t.jsx)(i, {}, r) : `
`
   }
   return i.text
  }(k, T) : (p = k, m = w, v = T, g = A, i(N(p._type), {
   nodeType: "block",
   type: p._type
  }), b = e.unknownType, (0, t.jsx)(b, j({}, {
   value: p,
   isInline: g,
   index: m,
   renderNode: r
  }), v))
 };

 function L(e) {
  let {
   node: t,
   index: i,
   isInline: r,
   renderNode: n
  } = e, o = h(t).map((e, t) => n({
   node: e,
   isInline: !0,
   index: t,
   renderNode: n
  }));
  return {
   _key: t._key || `block-${i}`,
   children: o,
   index: i,
   isInline: r,
   node: t
  }
 }

 function $() {}
 e.s(["PortableText", () => M], 236726)
}, 683412, e => {
 "use strict";
 var t = e.i(843476);
 e.i(271645);
 var i = e.i(236726),
  r = e.i(448773),
  n = e.i(813098),
  o = e.i(143443);
 let s = (e, i) => {
  let r = i?.markDefs?.find(e => "blockquote" === e._type);
  if (!r) return e;
  let {
   author: n,
   title: o,
   isHidden: s
  } = r, a = n || o;
  return (0, t.jsxs)("figure", {
   children: [(0, t.jsx)("blockquote", {
    cite: n,
    children: e
   }), a && !s && (0, t.jsxs)("figcaption", {
    className: "t-l-1",
    children: [n && (0, t.jsx)("span", {
     children: n
    }), o && (0, t.jsx)("span", {
     children: o
    })]
   })]
  })
 };

 function a({
  blocks: e
 }) {
  return e ? (0, t.jsx)(i.PortableText, {
   value: e,
   components: {
    block: {
     normal: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("p", {
      children: e
     }), i),
     "normal-2": ({
      children: e,
      value: i
     }) => s((0, t.jsx)("p", {
      className: "t-b-2",
      children: e
     }), i),
     h1: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("h1", {
      children: e
     }), i),
     h2: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("h2", {
      children: e
     }), i),
     h3: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("h3", {
      children: e
     }), i),
     h4: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("h4", {
      children: e
     }), i),
     h5: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("h5", {
      children: e
     }), i),
     h6: ({
      children: e,
      value: i
     }) => s((0, t.jsx)("h6", {
      children: e
     }), i)
    },
    list: {
     bullet: ({
      children: e
     }) => (0, t.jsx)("ul", {
      children: e
     }),
     number: ({
      children: e
     }) => (0, t.jsx)("ol", {
      children: e
     })
    },
    types: {
     image: e => {
      let {
       value: i
      } = e;
      if (!i?.asset) return;
      let {
       link: o,
       caption: s
      } = i || {};
      return o?.href ? (0, t.jsxs)(r.default, {
       link: o,
       className: "space-y-2",
       children: [(0, t.jsx)(n.default, {
        image: i
       }), s && (0, t.jsx)("p", {
        className: "t-l-1 pl-2",
        children: s
       })]
      }) : (0, t.jsxs)("div", {
       className: "space-y-2",
       children: [(0, t.jsx)(n.default, {
        image: i
       }), s && (0, t.jsx)("p", {
        className: "t-l-1 pl-2",
        children: s
       })]
      })
     },
     iframe: ({
      value: e
     }) => {
      let {
       embedSnippet: i
      } = e;
      if (!i) return null;
      let r = i.match(/width="\s*(\d+)"/),
       n = i.match(/height="\s*(\d+)"/),
       o = r?.[1],
       s = n?.[1];
      return (0, t.jsx)("div", {
       className: "relative overflow-hidden [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0",
       style: {
        aspectRatio: o && s ? o / s : 1.77
       },
       dangerouslySetInnerHTML: {
        __html: i
       }
      })
     }
    },
    marks: {
     blockquote: ({
      children: e
     }) => (0, t.jsx)(t.Fragment, {
      children: e
     }),
     link: ({
      value: e,
      children: i
     }) => (0, t.jsx)(r.default, {
      link: e,
      children: i
     }),
     callToAction: ({
      value: e,
      children: i
     }) => (0, t.jsx)(o.Button, {
      asChild: !0,
      children: (0, t.jsx)(r.default, {
       link: e,
       className: "is-cta",
       children: i
      })
     })
    }
   }
  }) : null
 }
 e.s(["default", () => a])
}, 394307, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(824511);

 function r({
  className: e,
  ...r
 }) {
  return (0, t.jsx)(i.m.svg, {
   viewBox: "0 0 22 22",
   fill: "none",
   xmlns: "http://www.w3.org/2000/svg",
   className: e,
   ...r,
   children: (0, t.jsx)("path", {
    d: "M4.9942 13.486V8.51398L8.50844 4.99975H13.4805L17.0058 8.52507L21.7727 3.75812C21.9113 3.61955 21.9945 3.42555 21.9945 3.226V0.454522C21.9945 0.205089 21.7949 0.00554293 21.5455 0.00554293H18.774C18.5745 0.00554293 18.386 0.0831443 18.2419 0.227261L13.4916 4.97758V0.454522C13.4916 0.205089 13.292 0.00554293 13.0426 0.00554293H8.94633C8.6969 0.00554293 8.49736 0.205089 8.49736 0.454522V4.97203L3.75258 0.221718C3.61401 0.0831443 3.42001 0 3.22046 0H0.44898C0.199547 0 0 0.205089 0 0.454522V3.226C0 3.42555 0.0776014 3.61401 0.221718 3.75812L4.97203 8.50844H0.44898C0.199547 8.50844 0 8.70799 0 8.95742V13.0537C0 13.3031 0.199547 13.5026 0.44898 13.5026H4.96649L0.221718 18.2474C0.0831444 18.386 0 18.58 0 18.7795V21.551C0 21.8005 0.199547 22 0.44898 22H3.22046C3.42001 22 3.60847 21.9224 3.75258 21.7783L8.5029 17.028V21.5455C8.5029 21.7949 8.70244 21.9945 8.95188 21.9945H13.0481C13.2976 21.9945 13.4971 21.7949 13.4971 21.5455V17.028L18.2474 21.7783C18.386 21.9169 18.58 22 18.7795 22H21.551C21.8005 22 22 21.8005 22 21.551V18.7795C22 18.58 21.9224 18.3915 21.7783 18.2474L17.0113 13.4805L13.486 17.0058H8.51398L4.9942 13.486Z",
    fill: "currentColor"
   })
  })
 }

 function n({
  className: e,
  ...r
 }) {
  return (0, t.jsx)(i.m.svg, {
   viewBox: "0 0 316 316",
   fill: "none",
   xmlns: "http://www.w3.org/2000/svg",
   className: e,
   ...r,
   children: (0, t.jsx)("path", {
    d: "M243.992 122.563L312.246 54.3095C314.23 52.3254 315.421 49.5476 315.421 46.6905V7.00793C315.421 3.43651 312.564 0.579365 308.992 0.579365H269.31C266.452 0.579365 263.754 1.69048 261.69 3.75397L193.675 71.7698V7.00793C193.675 3.43651 190.817 0.579365 187.246 0.579365H128.595C125.024 0.579365 122.167 3.43651 122.167 7.00793V71.6905L54.2302 3.6746C52.246 1.69048 49.4682 0.5 46.6111 0.5H6.92857C3.35714 0.5 0.5 3.43651 0.5 7.00793V46.6905C0.5 49.5476 1.61111 52.246 3.6746 54.3095L71.6905 122.325H6.92857C3.35714 122.325 0.5 125.183 0.5 128.754V187.405C0.5 190.976 3.35714 193.833 6.92857 193.833H71.6111L3.6746 261.77C1.69048 263.754 0.5 266.532 0.5 269.389V309.071C0.5 312.643 3.35714 315.5 6.92857 315.5H46.6111C49.4682 315.5 52.1667 314.389 54.2302 312.325L122.246 244.309V308.992C122.246 312.563 125.103 315.421 128.675 315.421H187.325C190.897 315.421 193.754 312.563 193.754 308.992V244.309L261.77 312.325C263.754 314.309 266.532 315.5 269.389 315.5H309.071C312.643 315.5 315.5 312.643 315.5 309.071V269.389C315.5 266.532 314.389 263.833 312.325 261.77L244.071 193.516",
    stroke: "currentColor"
   })
  })
 }
 e.s(["BrandLogo", () => r, "BrandLogoStroke", () => n])
}, 649125, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(271645),
  r = e.i(380064);

 function n({
  children: e,
  className: n = "",
  revealThreshold: o,
  mode: s = "trigger",
  stagger: a = .04
 }) {
  let l = (0, i.useRef)(null);
  return ! function({
   rootRef: e,
   children: t,
   revealThreshold: n = .8,
   baseClassName: o = "",
   visibleClasses: s = [],
   hiddenClasses: a = [],
   shouldPlayOnce: l = !0,
   extraScrollDistance: c = 200,
   mode: u = "scroll",
   stagger: d = .04
  }) {
   let h = (0, i.useRef)([]);
   (0, i.useEffect)(() => {
    let t = e.current;
    if (!t || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let i = (e, t) => {
      t ? (s.length && e.classList.add(...s), a.length && e.classList.remove(...a)) : !l && (a.length && e.classList.add(...a), s.length && e.classList.remove(...s))
     },
     f = () => {
      let e = h.current;
      if (!e.length) return;
      let r = t.getBoundingClientRect(),
       o = window.innerHeight * n,
       s = r.height + c,
       a = Math.ceil(Math.max(0, Math.min(1, (o - r.top) / s)) * e.length);
      e.forEach((e, t) => {
       i(e, t < a)
      })
     },
     p = e => {
      let t = h.current;
      t.length && t.forEach((t, r) => {
       t.style.transitionDelay = `${e?r*d:0}s`, i(t, e)
      })
     },
     m = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, {
      acceptNode(e) {
       let t = e.nodeValue;
       if (!t || !t.trim()) return NodeFilter.FILTER_REJECT;
       let i = e.parentElement;
       if (!i) return NodeFilter.FILTER_REJECT;
       let r = i.tagName?.toLowerCase();
       return "script" === r || "style" === r || i.closest?.(".js-scroll-text-word-span") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      }
     }),
     y = [];
    for (; m.nextNode();) y.push(m.currentNode);
    y.forEach(e => {
     let t = (e.nodeValue || "").match(/\S+\s*/g);
     if (!t || 0 === t.length) return;
     let i = document.createDocumentFragment();
     t.forEach(e => {
      let t = e.match(/^(\S+)(\s*)$/);
      if (!t) return void i.appendChild(document.createTextNode(e));
      let [n, s, l] = t, c = document.createElement("span");
      c.className = (0, r.cn)("js-scroll-text-word-span", o, ...a), c.textContent = s, i.appendChild(c), l && i.appendChild(document.createTextNode(l))
     }), e.parentNode?.replaceChild(i, e)
    }), h.current = Array.from(t.querySelectorAll(".js-scroll-text-word-span"));
    let v = 0,
     g = 0;
    if ("scroll" === u) {
     g = setTimeout(f, 100);
     let e = () => {
      cancelAnimationFrame(v), v = requestAnimationFrame(f)
     };
     window.addEventListener("scroll", e, {
      passive: !0
     });
     let i = new ResizeObserver(() => {
      f()
     });
     return i.observe(t), () => {
      clearTimeout(g), cancelAnimationFrame(v), window.removeEventListener("scroll", e), i.disconnect()
     }
    }
    if ("trigger" === u) {
     let e = new IntersectionObserver(i => {
      i.forEach(i => {
       i.isIntersecting ? (p(!0), l && e.unobserve(t)) : l || p(!1)
      })
     }, {
      rootMargin: `0px 0px -${(1-n)*100}% 0px`
     });
     return e.observe(t), () => {
      e.disconnect()
     }
    }
   }, [t, n, l, c, u, d, o, s.join(" "), a.join(" ")])
  }({
   rootRef: l,
   children: e,
   revealThreshold: o,
   mode: s,
   stagger: a,
   baseClassName: (0, r.cn)("inline-block transition-[translate,opacity] duration-500 ease-in-out will-change-[opacity,translate]", "motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none"),
   visibleClasses: ["opacity-100", "translate-x-0"],
   hiddenClasses: ["opacity-0", "translate-x-5"]
  }), (0, t.jsx)("div", {
   className: (0, r.cn)("relative", n),
   ref: l,
   children: e
  })
 }
 e.s(["default", () => n], 649125)
}, 63209, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(271645),
  r = e.i(753034),
  n = e.i(737806),
  o = e.i(798125),
  s = e.i(947414);

 function a({
  children: e,
  isValidProp: a,
  ...l
 }) {
  a && (0, o.loadExternalIsValidProp)(a);
  let c = (0, i.useContext)(n.MotionConfigContext);
  (l = {
   ...c,
   ...l
  }).transition = (0, r.resolveTransition)(l.transition, c.transition), l.isStatic = (0, s.useConstant)(() => l.isStatic);
  let u = (0, i.useMemo)(() => l, [JSON.stringify(l.transition), l.transformPagePoint, l.reducedMotion, l.skipAnimations]);
  return (0, t.jsx)(n.MotionConfigContext.Provider, {
   value: u,
   children: e
  })
 }
 e.s(["MotionConfig", () => a])
}, 892159, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(380064),
  r = e.i(836236),
  n = e.i(88653),
  o = e.i(824511);
 let s = {
  hide: {
   opacity: 0,
   filter: "blur(2px)",
   scale: .8
  },
  animate: {
   opacity: 1,
   filter: "blur(0px)",
   scale: 1
  }
 };

 function a({
  icon: e,
  className: a,
  svgClassname: l,
  style: c,
  transition: u,
  animate: d,
  ...h
 }) {
  return (0, t.jsx)(o.m.div, {
   className: (0, i.cn)("text-foreground flex items-center justify-center rounded-md p-1.5", a),
   animate: d || {
    backgroundColor: c?.backgroundColor || "rgba(0,0,0,0)"
   },
   transition: u,
   ...h,
   children: (0, t.jsx)(n.AnimatePresence, {
    mode: "popLayout",
    initial: !1,
    children: (0, t.jsx)(o.m.div, {
     variants: s,
     initial: "hide",
     animate: "animate",
     exit: "hide",
     transition: u,
     className: "flex size-full items-center justify-center",
     children: (0, t.jsx)(r.default, {
      type: e,
      className: (0, i.cn)("h-full w-full", l)
     })
    }, e)
   })
  })
 }
 e.s(["default", () => a])
}, 908223, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(271645),
  r = e.i(380064),
  n = e.i(836236),
  o = e.i(824511),
  s = e.i(387652);

 function a({
  color: e = "text-white-3",
  height: a = "h-[Min(calc(var(--s-vp-height)*0.8),var(--h-vp-height-max))]",
  className: l,
  ...c
 }) {
  let u = (0, i.useRef)(null),
   d = (0, s.useInView)(u),
   h = [.87, 0, .13, 1];
  return (0, t.jsx)(o.m.div, {
   ref: u,
   className: (0, r.cn)("p-center -z-10 grid max-sm:transform-[translate3d(-20%,-50%,0)]", e, l),
   ...c,
   children: Array.from({
    length: 3
   }).map((e, i) => (0, t.jsx)(o.m.div, {
    className: "will-change-transform [grid-area:1/1/2/2]",
    animate: d ? {
     x: [
      ["0%", "0%", "60%", "0%"],
      ["0%", "30%", "60%", "0%"],
      ["0%", "60%", "60%", "0%"]
     ][i]
    } : {},
    transition: {
     duration: 4,
     repeat: 1 / 0,
     ease: [h, h, h]
    },
    children: (0, t.jsx)(n.default, {
     type: "octagon-single",
     className: (0, r.cn)("scale-130", a)
    })
   }, i))
  })
 }
 e.s(["default", () => a])
}, 634745, e => {
 e.v(JSON.parse('{"v":"5.12.1","fr":30,"ip":0,"op":150,"w":400,"h":400,"nm":"TRAITS 02","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"07 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[320.454,320.405,0],"ix":2,"l":2},"a":{"a":0,"k":[76.447,76.595,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-3.565,0],[0,0],[0,4.455],[0,0],[2.575,2.575],[0,0]],"o":[[0,0],[2.476,2.476],[0,0],[4.455,0],[0,0],[0,-3.565],[0,0],[0,0]],"v":[[-75.947,-12.724],[8.911,72.134],[18.418,76.095],[67.926,76.095],[75.947,68.075],[75.947,18.566],[71.986,9.06],[-13.169,-76.095]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[76.447,76.595],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[1.24]},"o":{"x":[0.426],"y":[0]},"t":21,"s":[15]},{"t":83,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":21,"s":[15]},{"t":83,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"06 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[200,352.041,0],"ix":2,"l":2},"a":{"a":0,"k":[45.107,44.86,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-4.456,0],[0,0],[0,4.455],[0,0]],"o":[[0,0],[0,4.455],[0,0],[4.456,0],[0,0],[0,0]],"v":[[-44.607,-44.36],[-44.607,36.34],[-36.587,44.36],[36.587,44.36],[44.607,36.34],[44.607,-44.36]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[45.107,44.86],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[-2.371]},"o":{"x":[0.426],"y":[0]},"t":10,"s":[0]},{"t":68,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":10,"s":[0]},{"t":68,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"05 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[78.897,320.603,0],"ix":2,"l":2},"a":{"a":0,"k":[76.446,76.397,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-3.565],[0,0],[-4.456,0],[0,0],[-2.574,2.575],[0,0]],"o":[[0,0],[-2.475,2.476],[0,0],[0,4.455],[0,0],[3.565,0],[0,0],[0,0]],"v":[[12.773,-75.897],[-71.986,8.862],[-75.947,18.368],[-75.947,67.877],[-67.925,75.897],[-18.417,75.897],[-8.911,71.936],[75.947,-12.922]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[76.446,76.397],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[1.04]},"o":{"x":[0.426],"y":[0]},"t":10,"s":[85]},{"t":68,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":10,"s":[85]},{"t":68,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"04 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[47.81,200.099,0],"ix":2,"l":2},"a":{"a":0,"k":[44.91,45.107,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,-4.456],[0,0],[-4.456,0],[0,0]],"o":[[0,0],[-4.456,0],[0,0],[0,4.456],[0,0],[0,0]],"v":[[44.41,-44.607],[-36.389,-44.607],[-44.41,-36.587],[-44.41,36.587],[-36.389,44.607],[44.311,44.607]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[44.909,45.107],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[1.18]},"o":{"x":[0.426],"y":[0]},"t":21,"s":[20]},{"t":83,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":21,"s":[20]},{"t":83,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"03 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[78.897,79.496,0],"ix":2,"l":2},"a":{"a":0,"k":[76.397,76.496,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[3.565,0],[0,0],[0,-4.456],[0,0],[-2.575,-2.574],[0,0]],"o":[[0,0],[-2.476,-2.475],[0,0],[-4.455,0],[0,0],[0,3.564],[0,0],[0,0]],"v":[[75.897,12.823],[-8.862,-72.035],[-18.368,-75.996],[-67.877,-75.996],[-75.897,-67.876],[-75.897,-18.367],[-71.936,-8.862],[12.922,75.996]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[76.397,76.496],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[1.045]},"o":{"x":[0.426],"y":[0]},"t":10,"s":[75]},{"t":68,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":10,"s":[75]},{"t":68,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"02 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[199.901,48.008,0],"ix":2,"l":2},"a":{"a":0,"k":[45.107,44.91,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[4.456,0],[0,0],[0,-4.456],[0,0]],"o":[[0,0],[0,-4.456],[0,0],[-4.456,0],[0,0],[0,0]],"v":[[44.607,44.41],[44.607,-36.389],[36.587,-44.41],[-36.587,-44.41],[-44.607,-36.389],[-44.607,44.311]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[45.107,44.91],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[1.045]},"o":{"x":[0.426],"y":[0]},"t":21,"s":[80]},{"t":83,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":21,"s":[80]},{"t":83,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"01 ligne Silhouettes","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[320.454,79.694,0],"ix":2,"l":2},"a":{"a":0,"k":[76.447,76.595,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,3.565],[0,0],[4.455,0],[0,0],[2.575,-2.575],[0,0]],"o":[[0,0],[2.476,-2.476],[0,0],[0,-4.455],[0,0],[-3.565,0],[0,0],[0,0]],"v":[[-13.169,76.095],[71.986,-9.06],[75.947,-18.566],[75.947,-68.075],[67.927,-76.095],[18.418,-76.095],[8.911,-72.134],[-75.947,12.724]],"c":false},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0.5,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[76.447,76.595],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.448],"y":[1.091]},"o":{"x":[0.426],"y":[0]},"t":10,"s":[37]},{"t":68,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.13],"y":[1]},"o":{"x":[0.639],"y":[0]},"t":10,"s":[37]},{"t":68,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Réduire les tracés 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":163,"st":10,"ct":1,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"carré 06 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":30,"s":[0]},{"t":57,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[308.979,245.059,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":30,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":36,"s":[110,110,100]},{"t":42,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":30,"op":184,"st":30,"ct":1,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"carré 07 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":25,"s":[0]},{"t":52,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[245.057,308.979,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":25,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":31,"s":[110,110,100]},{"t":37,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":25,"op":179,"st":25,"ct":1,"bm":0},{"ddd":0,"ind":10,"ty":4,"nm":"carré 02 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":47,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[155.167,308.979,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":20,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":26,"s":[110,110,100]},{"t":32,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":20,"op":174,"st":20,"ct":1,"bm":0},{"ddd":0,"ind":11,"ty":4,"nm":"carré 03 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":16,"s":[0]},{"t":43,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[91.245,245.059,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":16,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":22,"s":[110,110,100]},{"t":28,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":16,"op":170,"st":16,"ct":1,"bm":0},{"ddd":0,"ind":12,"ty":4,"nm":"carré 08 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":12,"s":[0]},{"t":39,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[91.245,155.167,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":12,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":18,"s":[110,110,100]},{"t":24,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":12,"op":166,"st":12,"ct":1,"bm":0},{"ddd":0,"ind":13,"ty":4,"nm":"carré 01 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":8,"s":[0]},{"t":35,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[155.167,91.245,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":8,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":14,"s":[110,110,100]},{"t":20,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":8,"op":162,"st":8,"ct":1,"bm":0},{"ddd":0,"ind":14,"ty":4,"nm":"carré 04 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":4,"s":[0]},{"t":31,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[245.057,91.245,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":4,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":10,"s":[110,110,100]},{"t":16,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":4,"op":158,"st":4,"ct":1,"bm":0},{"ddd":0,"ind":15,"ty":4,"nm":"carré 05 Silhouettes","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":27,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[308.979,155.167,0],"ix":2,"l":2},"a":{"a":0,"k":[4.245,4.245,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":0,"s":[0,0,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":6,"s":[110,110,100]},{"t":12,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-3.995,-3.995],[3.995,-3.995],[3.995,3.995],[-3.995,3.995]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.701960784314,0.780392216701,0.960784373564,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[4.245,4.245],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Groupe 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":154,"st":0,"ct":1,"bm":0}],"markers":[],"props":{}}'))
}, 63191, e => {
 e.v({
  id: "google-analytics",
  description: "Install a Google Analytics tag on your website",
  website: "https://analytics.google.com/analytics/web/",
  scripts: [{
   url: "https://www.googletagmanager.com/gtag/js",
   params: ["id"],
   strategy: "worker",
   location: "head",
   action: "append"
  }, {
   code: "window.dataLayer=window.dataLayer||[];window.gtag=function gtag(){window.dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${args.id}')",
   strategy: "worker",
   location: "head",
   action: "append"
  }]
 })
}, 249031, e => {
 e.v({
  id: "google-maps-embed",
  description: "Embed a Google Maps embed on your webpage",
  website: "https://developers.google.com/maps/documentation/embed/get-started",
  html: {
   element: "iframe",
   attributes: {
    loading: "lazy",
    src: {
     url: "https://www.google.com/maps/embed/v1/place",
     slugParam: "mode",
     params: ["key", "q", "center", "zoom", "maptype", "language", "region"]
    },
    referrerpolicy: "no-referrer-when-downgrade",
    frameborder: "0",
    style: "border:0",
    allowfullscreen: !0,
    width: null,
    height: null
   }
  }
 })
}, 17311, e => {
 e.v({
  id: "youtube-embed",
  description: "Embed a YouTube embed on your webpage.",
  website: "https://github.com/paulirish/lite-youtube-embed",
  html: {
   element: "lite-youtube",
   attributes: {
    videoid: null,
    playlabel: null
   }
  },
  stylesheets: ["https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.css"],
  scripts: [{
   url: "https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.js",
   strategy: "idle",
   location: "head",
   action: "append"
  }]
 })
}, 845955, e => {
 "use strict";

 function t(e) {
  try {
   return decodeURIComponent(e.replace(/\+/g, " "))
  } catch (t) {
   return e
  }
 }
 e.s(["gracefulDecodeURIComponent", () => t])
}, 502471, e => {
 "use strict";

 function t(e, t) {
  return new Promise(function(i, r) {
   var n = setTimeout(function() {
    r(Error("Promise timed out"))
   }, t);
   e.then(function(e) {
    return clearTimeout(n), i(e)
   }).catch(r)
  })
 }

 function i(e, i, r) {
  var n = function() {
   try {
    return Promise.resolve(i(e))
   } catch (e) {
    return Promise.reject(e)
   }
  };
  return new Promise(function(e) {
   return setTimeout(e, r)
  }).then(function() {
   return t(n(), 1e3)
  }).catch(function(t) {
   null == e || e.log("warn", "Callback Error", {
    error: t
   }), null == e || e.stats.increment("callback_error")
  }).then(function() {
   return e
  })
 }
 e.s(["invokeCallback", () => i, "pTimeout", () => t])
}, 811067, e => {
 "use strict";
 var t = e.i(638774);
 let i = /_key\s*==\s*['"](.*)['"]/;

 function r(e) {
  if (!Array.isArray(e)) throw Error("Path is not an array");
  return e.reduce((e, t, r) => {
   let n = typeof t;
   if ("number" === n) return `${e}[${t}]`;
   if ("string" === n) return `${e}${0===r?"":"."}${t}`;
   if (("string" == typeof t ? i.test(t.trim()) : "object" == typeof t && "_key" in t) && t._key) return `${e}[_key=="${t._key}"]`;
   if (Array.isArray(t)) {
    let [i, r] = t;
    return `${e}[${i}:${r}]`
   }
   throw Error(`Unsupported path segment \`${JSON.stringify(t)}\``)
  }, "")
 }
 let n = {
   "\f": "\\f",
   "\n": "\\n",
   "\r": "\\r",
   "	": "\\t",
   "'": "\\'",
   "\\": "\\\\"
  },
  o = {
   "\\f": "\f",
   "\\n": `
`,
   "\\r": "\r",
   "\\t": "	",
   "\\'": "'",
   "\\\\": "\\"
  };

 function s(e) {
  let t, i = [],
   r = /\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;
  for (; null !== (t = r.exec(e));) {
   if (void 0 !== t[1]) {
    let e = t[1].replace(/\\(\\|f|n|r|t|')/g, e => o[e]);
    i.push(e);
    continue
   }
   if (void 0 !== t[2]) {
    i.push(parseInt(t[2], 10));
    continue
   }
   if (void 0 !== t[3]) {
    let e = t[3].replace(/\\(\\')/g, e => o[e]);
    i.push({
     _key: e,
     _index: -1
    });
    continue
   }
  }
  return i
 }

 function a(e) {
  return e.map(e => {
   if ("string" == typeof e || "number" == typeof e) return e;
   if ("" !== e._key) return {
    _key: e._key
   };
   if (-1 !== e._index) return e._index;
   throw Error(`invalid segment:${JSON.stringify(e)}`)
  })
 }

 function l(e) {
  return e.map(e => {
   if ("string" == typeof e || "number" == typeof e) return e;
   if (-1 !== e._index) return e._index;
   throw Error(`invalid segment:${JSON.stringify(e)}`)
  })
 }

 function c(e, i, r) {
  return function e(i, r, n = []) {
   if (null !== i && Array.isArray(i)) return i.map((i, o) => {
    if ((0, t.isRecord)(i)) {
     let t = i._key;
     if ("string" == typeof t) return e(i, r, n.concat({
      _key: t,
      _index: o
     }))
    }
    return e(i, r, n.concat(o))
   });
   if ((0, t.isRecord)(i)) {
    if ("block" === i._type || "span" === i._type) {
     let t = {
      ...i
     };
     return "block" === i._type ? t.children = e(i.children, r, n.concat("children")) : "span" === i._type && (t.text = e(i.text, r, n.concat("text"))), t
    }
    return Object.fromEntries(Object.entries(i).map(([t, i]) => [t, e(i, r, n.concat(t))]))
   }
   return r(i, n)
  }(e, (e, t) => {
   if ("string" != typeof e) return e;
   let o = function(e, t) {
    var i;
    if (!t?.mappings) return;
    let r = (i = l(e), `$${i.map(e=>"string"==typeof e?`['${e.replace(/[\f\n\r\t'\\]/g,e=>n[e])}']`:"number"==typeof e?`[${e}]`:""!==e._key?`[?(@._key=='${e._key.replace(/['\\]/g,e=>n[e])}')]`:`[${e._index}]`).join("")}`);
    if (void 0 !== t.mappings[r]) return {
     mapping: t.mappings[r],
     matchedPath: r,
     pathSuffix: ""
    };
    let o = l(e).map(e => "string" == typeof e ? `['${e.replace(/[\f\n\r\t'\\]/g,e=>n[e])}']` : "number" == typeof e ? `[${e}]` : "" !== e._key ? `[?(@._key=='${e._key.replace(/['\\]/g,e=>n[e])}')]` : `[${e._index}]`);
    for (let e = o.length - 1; e >= 0; e--) {
     let i = `$${o.slice(0,e).join("")}`,
      n = t.mappings[i];
     if (n) {
      let e = r.substring(i.length);
      return {
       mapping: n,
       matchedPath: i,
       pathSuffix: e
      }
     }
    }
   }(t, i);
   if (!o) return e;
   let {
    mapping: a,
    matchedPath: c
   } = o;
   if ("value" !== a.type || "documentValue" !== a.source.type) return e;
   let u = i.documents[a.source.document],
    d = i.paths[a.source.path],
    h = s(c);
   return r({
    sourcePath: s(d).concat(t.slice(h.length)),
    sourceDocument: u,
    resultPath: t,
    value: e
   })
  })
 }
 let u = "drafts.";

 function d(e) {
  return e.startsWith(u)
 }

 function h(e) {
  return e.startsWith("versions.")
 }
 let f = ({
   sourcePath: e,
   resultPath: t,
   value: i
  }) => {
   var r;
   if (r = i, /^\d{4}-\d{2}-\d{2}/.test(r) && Date.parse(r) || function(e) {
     try {
      let {
       protocol: t
      } = new URL(e, e.startsWith("/") ? "https://acme.com" : void 0);
      return m.has(t) || t.startsWith("web+")
     } catch {
      return !1
     }
    }(i)) return !1;
   let n = e.at(-1);
   return !("slug" === e.at(-2) && "current" === n || "string" == typeof n && (n.startsWith("_") || n.endsWith("Id")) || e.some(e => "meta" === e || "metadata" === e || "openGraph" === e || "seo" === e) || y(e) || y(t) || "string" == typeof n && p.has(n))
  },
  p = new Set(["color", "colour", "currency", "email", "format", "gid", "hex", "href", "hsl", "hsla", "icon", "id", "index", "key", "language", "layout", "link", "linkAction", "locale", "lqip", "page", "path", "ref", "rgb", "rgba", "route", "secret", "slug", "status", "tag", "template", "theme", "type", "textTheme", "unit", "url", "username", "variant", "website"]),
  m = new Set(["app:", "data:", "discord:", "file:", "ftp:", "ftps:", "geo:", "http:", "https:", "imap:", "javascript:", "magnet:", "mailto:", "maps:", "ms-excel:", "ms-powerpoint:", "ms-word:", "slack:", "sms:", "spotify:", "steam:", "teams:", "tel:", "vscode:", "zoom:"]);

 function y(e) {
  return e.some(e => "string" == typeof e && null !== e.match(/type/i))
 }
 let v = [8203, 8204, 8205, 65279],
  g = v.map(e => String.fromCharCode(e)),
  x = [8203, 8204, 8205, 8290, 8291, 8288, 65279, 8289, 119155, 119156, 119157, 119158, 119159, 119160, 119161, 119162];
 Object.fromEntries(v.map((e, t) => [e, t])), Object.fromEntries(x.map((e, t) => [e, t.toString(16)]));
 let b = String.fromCodePoint(v[0]).repeat(4);

 function k(e, t, n) {
  let {
   filter: o,
   logger: s,
   enabled: l
  } = n;
  if (!l) {
   let i = "config.enabled must be true, don't call this function otherwise";
   throw s?.error?.(`[@sanity/client]: ${i}`, {
    result: e,
    resultSourceMap: t,
    config: n
   }), TypeError(i)
  }
  if (!t) return s?.error?.("[@sanity/client]: Missing Content Source Map from response body", {
   result: e,
   resultSourceMap: t,
   config: n
  }), e;
  if (!n.studioUrl) {
   let i = "config.studioUrl must be defined";
   throw s?.error?.(`[@sanity/client]: ${i}`, {
    result: e,
    resultSourceMap: t,
    config: n
   }), TypeError(i)
  }
  let p = [],
   m = [],
   y = c(e, t, ({
    sourcePath: e,
    sourceDocument: t,
    resultPath: i,
    value: l
   }) => {
    var c;
    let y;
    if (("function" == typeof o ? o({
      sourcePath: e,
      resultPath: i,
      filterDefault: f,
      sourceDocument: t,
      value: l
     }) : f({
      sourcePath: e,
      resultPath: i,
      value: l
     })) === !1) return s && m.push({
     path: r(a(e)),
     value: `${l.slice(0,20)}${l.length>20?"...":""}`,
     length: l.length
    }), l;
    s && p.push({
     path: r(a(e)),
     value: `${l.slice(0,20)}${l.length>20?"...":""}`,
     length: l.length
    });
    let {
     baseUrl: v,
     workspace: x,
     tool: k
    } = ("/" !== (y = "string" == typeof(c = "function" == typeof n.studioUrl ? n.studioUrl(t) : n.studioUrl) ? c : c.baseUrl) && (y = y.replace(/\/$/, "")), "string" == typeof c ? {
     baseUrl: y
    } : {
     ...c,
     baseUrl: y
    });
    if (!v) return l;
    let {
     _id: w,
     _type: S,
     _projectId: E,
     _dataset: A
    } = t;
    return function(e, t, i = "auto") {
     var r;
     return !0 !== i && ("auto" !== i || (r = e) && "string" == typeof r && Date.parse(r) || function(e) {
      try {
       return new URL(e, e.startsWith("/") ? "https://example.com" : void 0), !0
      } catch {
       return !1
      }
     }(e)) ? e : `${e}${function(e){if(void 0===e)return"";let t="string"==typeof e?e:JSON.stringify(e),i=new TextEncoder().encode(t),r="";for(let e=0;e<i.length;e++){let t=i[e];r+=g[t>>6&3]+g[t>>4&3]+g[t>>2&3]+g[3&t]}return b+r}(t)}`
    }(l, {
     origin: "sanity.io",
     href: function(e) {
      let {
       baseUrl: t,
       workspace: i = "default",
       tool: n = "default",
       id: o,
       type: s,
       path: l,
       projectId: c,
       dataset: f
      } = e;
      if (!t) throw Error("baseUrl is required");
      if (!l) throw Error("path is required");
      if (!o) throw Error("id is required");
      if ("/" !== t && t.endsWith("/")) throw Error("baseUrl must not end with a slash");
      let p = "default" === i ? void 0 : i,
       m = "default" === n ? void 0 : n,
       y = h(o) ? o.split(".").slice(2).join(".") : d(o) ? o.slice(u.length) : o,
       v = Array.isArray(l) ? r(a(l)) : l,
       g = new URLSearchParams({
        baseUrl: t,
        id: y,
        type: s,
        path: v
       });
      if (p && g.set("workspace", p), m && g.set("tool", m), c && g.set("projectId", c), f && g.set("dataset", f), d(o) || h(o)) {
       if (h(o)) {
        let e = function(e) {
         if (!h(e)) return;
         let [t, i, ...r] = e.split(".");
         return i
        }(o);
        g.set("perspective", e)
       }
      } else g.set("perspective", "published");
      let x = ["/" === t ? "" : t];
      p && x.push(p);
      let b = ["mode=presentation", `id=${y}`, `type=${s}`, `path=${encodeURIComponent(v)}`];
      return m && b.push(`tool=${m}`), x.push("intent", "edit", `${b.join(";")}?${g}`), x.join("/")
     }({
      baseUrl: v,
      workspace: x,
      tool: k,
      id: w,
      type: S,
      path: e,
      ...!n.omitCrossDatasetReferenceData && {
       dataset: A,
       projectId: E
      }
     })
    }, !0)
   });
  if (s) {
   let e = m.length,
    t = p.length;
   if ((e || t) && ((s?.groupCollapsed || s.log)?.("[@sanity/client]: Encoding source map into result"), s.log?.(`[@sanity/client]: Paths encoded: ${p.length}, skipped: ${m.length}`)), p.length > 0 && (s?.log?.("[@sanity/client]: Table of encoded paths"), (s?.table || s.log)?.(p)), m.length > 0) {
    let e = new Set;
    for (let {
      path: t
     }
     of m) e.add(t.replace(i, "0").replace(/\[\d+\]/g, "[]"));
    s?.log?.("[@sanity/client]: List of skipped paths", [...e.values()])
   }(e || t) && s?.groupEnd?.()
  }
  return y
 } [...v, ...x].map(e => `\\u{${e.toString(16)}}`).join("");
 var w = Object.freeze({
  __proto__: null,
  stegaEncodeSourceMap: k
 });
 e.s(["encodeIntoResult", () => c, "stegaEncodeSourceMap", () => k, "stegaEncodeSourceMap$1", () => w])
}, 75389, e => {
 "use strict";
 var t = Object.prototype.hasOwnProperty;
 e.s(["dequal", () => function e(i, r) {
  var n, o;
  if (i === r) return !0;
  if (i && r && (n = i.constructor) === r.constructor) {
   if (n === Date) return i.getTime() === r.getTime();
   if (n === RegExp) return i.toString() === r.toString();
   if (n === Array) {
    if ((o = i.length) === r.length)
     for (; o-- && e(i[o], r[o]););
    return -1 === o
   }
   if (!n || "object" == typeof i) {
    for (n in o = 0, i)
     if (t.call(i, n) && ++o && !t.call(r, n) || !(n in r) || !e(i[n], r[n])) return !1;
    return Object.keys(r).length === o
   }
  }
  return i != i && r != r
 }])
}, 607514, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(271645),
  r = e.i(30030),
  n = e.i(75830),
  o = e.i(820783),
  s = e.i(981140),
  a = e.i(369340),
  l = e.i(248425),
  c = e.i(934620),
  u = e.i(296626),
  d = e.i(610772),
  h = "Collapsible",
  [f, p] = (0, r.createContextScope)(h),
  [m, y] = f(h),
  v = i.forwardRef((e, r) => {
   let {
    __scopeCollapsible: n,
    open: o,
    defaultOpen: s,
    disabled: c,
    onOpenChange: u,
    ...f
   } = e, [p, y] = (0, a.useControllableState)({
    prop: o,
    defaultProp: s ?? !1,
    onChange: u,
    caller: h
   });
   return (0, t.jsx)(m, {
    scope: n,
    disabled: c,
    contentId: (0, d.useId)(),
    open: p,
    onOpenToggle: i.useCallback(() => y(e => !e), [y]),
    children: (0, t.jsx)(l.Primitive.div, {
     "data-state": S(p),
     "data-disabled": c ? "" : void 0,
     ...f,
     ref: r
    })
   })
  });
 v.displayName = h;
 var g = "CollapsibleTrigger",
  x = i.forwardRef((e, i) => {
   let {
    __scopeCollapsible: r,
    ...n
   } = e, o = y(g, r);
   return (0, t.jsx)(l.Primitive.button, {
    type: "button",
    "aria-controls": o.contentId,
    "aria-expanded": o.open || !1,
    "data-state": S(o.open),
    "data-disabled": o.disabled ? "" : void 0,
    disabled: o.disabled,
    ...n,
    ref: i,
    onClick: (0, s.composeEventHandlers)(e.onClick, o.onOpenToggle)
   })
  });
 x.displayName = g;
 var b = "CollapsibleContent",
  k = i.forwardRef((e, i) => {
   let {
    forceMount: r,
    ...n
   } = e, o = y(b, e.__scopeCollapsible);
   return (0, t.jsx)(u.Presence, {
    present: r || o.open,
    children: ({
     present: e
    }) => (0, t.jsx)(w, {
     ...n,
     ref: i,
     present: e
    })
   })
  });
 k.displayName = b;
 var w = i.forwardRef((e, r) => {
  let {
   __scopeCollapsible: n,
   present: s,
   children: a,
   ...u
  } = e, d = y(b, n), [h, f] = i.useState(s), p = i.useRef(null), m = (0, o.useComposedRefs)(r, p), v = i.useRef(0), g = v.current, x = i.useRef(0), k = x.current, w = d.open || h, E = i.useRef(w), A = i.useRef(void 0);
  return i.useEffect(() => {
   let e = requestAnimationFrame(() => E.current = !1);
   return () => cancelAnimationFrame(e)
  }, []), (0, c.useLayoutEffect)(() => {
   let e = p.current;
   if (e) {
    A.current = A.current || {
     transitionDuration: e.style.transitionDuration,
     animationName: e.style.animationName
    }, e.style.transitionDuration = "0s", e.style.animationName = "none";
    let t = e.getBoundingClientRect();
    v.current = t.height, x.current = t.width, E.current || (e.style.transitionDuration = A.current.transitionDuration, e.style.animationName = A.current.animationName), f(s)
   }
  }, [d.open, s]), (0, t.jsx)(l.Primitive.div, {
   "data-state": S(d.open),
   "data-disabled": d.disabled ? "" : void 0,
   id: d.contentId,
   hidden: !w,
   ...u,
   ref: m,
   style: {
    "--radix-collapsible-content-height": g ? `${g}px` : void 0,
    "--radix-collapsible-content-width": k ? `${k}px` : void 0,
    ...e.style
   },
   children: w && a
  })
 });

 function S(e) {
  return e ? "open" : "closed"
 }
 var E = e.i(586318),
  A = "Accordion",
  j = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  [C, T, O] = (0, n.createCollection)(A),
  [N, R] = (0, r.createContextScope)(A, [O, p]),
  _ = p(),
  P = i.default.forwardRef((e, i) => {
   let {
    type: r,
    ...n
   } = e;
   return (0, t.jsx)(C.Provider, {
    scope: e.__scopeAccordion,
    children: "multiple" === r ? (0, t.jsx)(V, {
     ...n,
     ref: i
    }) : (0, t.jsx)($, {
     ...n,
     ref: i
    })
   })
  });
 P.displayName = A;
 var [I, M] = N(A), [D, L] = N(A, {
  collapsible: !1
 }), $ = i.default.forwardRef((e, r) => {
  let {
   value: n,
   defaultValue: o,
   onValueChange: s = () => {},
   collapsible: l = !1,
   ...c
  } = e, [u, d] = (0, a.useControllableState)({
   prop: n,
   defaultProp: o ?? "",
   onChange: s,
   caller: A
  });
  return (0, t.jsx)(I, {
   scope: e.__scopeAccordion,
   value: i.default.useMemo(() => u ? [u] : [], [u]),
   onItemOpen: d,
   onItemClose: i.default.useCallback(() => l && d(""), [l, d]),
   children: (0, t.jsx)(D, {
    scope: e.__scopeAccordion,
    collapsible: l,
    children: (0, t.jsx)(z, {
     ...c,
     ref: r
    })
   })
  })
 }), V = i.default.forwardRef((e, r) => {
  let {
   value: n,
   defaultValue: o,
   onValueChange: s = () => {},
   ...l
  } = e, [c, u] = (0, a.useControllableState)({
   prop: n,
   defaultProp: o ?? [],
   onChange: s,
   caller: A
  }), d = i.default.useCallback(e => u((t = []) => [...t, e]), [u]), h = i.default.useCallback(e => u((t = []) => t.filter(t => t !== e)), [u]);
  return (0, t.jsx)(I, {
   scope: e.__scopeAccordion,
   value: c,
   onItemOpen: d,
   onItemClose: h,
   children: (0, t.jsx)(D, {
    scope: e.__scopeAccordion,
    collapsible: !0,
    children: (0, t.jsx)(z, {
     ...l,
     ref: r
    })
   })
  })
 }), [F, G] = N(A), z = i.default.forwardRef((e, r) => {
  let {
   __scopeAccordion: n,
   disabled: a,
   dir: c,
   orientation: u = "vertical",
   ...d
  } = e, h = i.default.useRef(null), f = (0, o.useComposedRefs)(h, r), p = T(n), m = "ltr" === (0, E.useDirection)(c), y = (0, s.composeEventHandlers)(e.onKeyDown, e => {
   if (!j.includes(e.key)) return;
   let t = e.target,
    i = p().filter(e => !e.ref.current?.disabled),
    r = i.findIndex(e => e.ref.current === t),
    n = i.length;
   if (-1 === r) return;
   e.preventDefault();
   let o = r,
    s = n - 1,
    a = () => {
     (o = r + 1) > s && (o = 0)
    },
    l = () => {
     (o = r - 1) < 0 && (o = s)
    };
   switch (e.key) {
    case "Home":
     o = 0;
     break;
    case "End":
     o = s;
     break;
    case "ArrowRight":
     "horizontal" === u && (m ? a() : l());
     break;
    case "ArrowDown":
     "vertical" === u && a();
     break;
    case "ArrowLeft":
     "horizontal" === u && (m ? l() : a());
     break;
    case "ArrowUp":
     "vertical" === u && l()
   }
   let c = o % n;
   i[c].ref.current?.focus()
  });
  return (0, t.jsx)(F, {
   scope: n,
   disabled: a,
   direction: c,
   orientation: u,
   children: (0, t.jsx)(C.Slot, {
    scope: n,
    children: (0, t.jsx)(l.Primitive.div, {
     ...d,
     "data-orientation": u,
     ref: f,
     onKeyDown: a ? void 0 : y
    })
   })
  })
 }), B = "AccordionItem", [H, W] = N(B), U = i.default.forwardRef((e, i) => {
  let {
   __scopeAccordion: r,
   value: n,
   ...o
  } = e, s = G(B, r), a = M(B, r), l = _(r), c = (0, d.useId)(), u = n && a.value.includes(n) || !1, h = s.disabled || e.disabled;
  return (0, t.jsx)(H, {
   scope: r,
   open: u,
   disabled: h,
   triggerId: c,
   children: (0, t.jsx)(v, {
    "data-orientation": s.orientation,
    "data-state": Q(u),
    ...l,
    ...o,
    ref: i,
    disabled: h,
    open: u,
    onOpenChange: e => {
     e ? a.onItemOpen(n) : a.onItemClose(n)
    }
   })
  })
 });
 U.displayName = B;
 var K = "AccordionHeader",
  q = i.default.forwardRef((e, i) => {
   let {
    __scopeAccordion: r,
    ...n
   } = e, o = G(A, r), s = W(K, r);
   return (0, t.jsx)(l.Primitive.h3, {
    "data-orientation": o.orientation,
    "data-state": Q(s.open),
    "data-disabled": s.disabled ? "" : void 0,
    ...n,
    ref: i
   })
  });
 q.displayName = K;
 var X = "AccordionTrigger",
  Y = i.default.forwardRef((e, i) => {
   let {
    __scopeAccordion: r,
    ...n
   } = e, o = G(A, r), s = W(X, r), a = L(X, r), l = _(r);
   return (0, t.jsx)(C.ItemSlot, {
    scope: r,
    children: (0, t.jsx)(x, {
     "aria-disabled": s.open && !a.collapsible || void 0,
     "data-orientation": o.orientation,
     id: s.triggerId,
     ...l,
     ...n,
     ref: i
    })
   })
  });
 Y.displayName = X;
 var J = "AccordionContent",
  Z = i.default.forwardRef((e, i) => {
   let {
    __scopeAccordion: r,
    ...n
   } = e, o = G(A, r), s = W(J, r), a = _(r);
   return (0, t.jsx)(k, {
    role: "region",
    "aria-labelledby": s.triggerId,
    "data-orientation": o.orientation,
    ...a,
    ...n,
    ref: i,
    style: {
     "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
     "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
     ...e.style
    }
   })
  });

 function Q(e) {
  return e ? "open" : "closed"
 }
 Z.displayName = J;
 var ee = e.i(380064);
 let et = ({
  type: e = "close",
  size: i = .75,
  thickness: r = "1px",
  color: n = "currentColor",
  className: o = ""
 }) => {
  let s = {
   "--icon-thickness": "string" == typeof r ? r : `${r}px`,
   "--icon-color": n,
   width: "number" == typeof i ? `${i}em` : i,
   height: "number" == typeof i ? `${i}em` : i
  };
  if (e.startsWith("triangle")) {
   let r = .75 * ("number" == typeof i ? i : parseFloat(i)),
    s = {
     display: "inline-block",
     width: 0,
     height: 0,
     borderStyle: "solid",
     color: n
    };
   switch (e) {
    case "triangle-left":
     return (0, t.jsx)("span", {
      className: `inline-block transition-transform duration-200 ${o}`,
      style: {
       ...s,
       borderWidth: `${r}em ${r}em ${r}em 0`,
       borderColor: `transparent ${n} transparent transparent`
      }
     });
    case "triangle-right":
     return (0, t.jsx)("span", {
      className: `inline-block transition-transform duration-200 ${o}`,
      style: {
       ...s,
       borderWidth: `${r}em 0 ${r}em ${r}em`,
       borderColor: `transparent transparent transparent ${n}`
      }
     });
    case "triangle-up":
     return (0, t.jsx)("span", {
      className: `inline-block transition-transform duration-200 ${o}`,
      style: {
       ...s,
       borderWidth: `0 ${r}em ${r}em ${r}em`,
       borderColor: `transparent transparent ${n} transparent`
      }
     });
    case "triangle-down":
     return (0, t.jsx)("span", {
      className: `inline-block transition-transform duration-200 ${o}`,
      style: {
       ...s,
       borderWidth: `${r}em ${r}em 0 ${r}em`,
       borderColor: `${n} transparent transparent transparent`
      }
     })
   }
  }
  return (0, t.jsx)("span", {
   className: `relative inline-block ${o}`,
   style: s,
   "data-icon-type": e
  })
 };
 var ei = e.i(836236);

 function er({
  ...e
 }) {
  return (0, t.jsx)(P, {
   "data-slot": "accordion",
   ...e
  })
 }

 function en({
  className: e,
  ...i
 }) {
  return (0, t.jsx)(U, {
   "data-slot": "accordion-item",
   className: e,
   ...i
  })
 }

 function eo({
  className: e,
  children: i,
  svgIcon: r,
  ...n
 }) {
  return (0, t.jsx)(q, {
   className: "flex",
   children: (0, t.jsxs)(Y, {
    "data-slot": "accordion-trigger",
    className: (0, ee.cn)("accordion-trigger font-inter flex flex-1 cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm leading-[1.2] transition-transform [&[data-state=open]_.accordion-item-svg]:rotate-180 [&[data-state=open]>div>.accordion-item-icon:before]:transform-[translate3d(-50%,-50%,0)rotate(180deg)]", e),
    ...n,
    children: [i, (0, t.jsx)("div", {
     className: "flex items-center justify-center",
     style: {
      width: "1.5em",
      height: "1.5em"
     },
     children: r ? (0, t.jsx)("span", {
      className: "accordion-item-svg inline-block transition-transform duration-300",
      style: {
       width: "0.6000000000000001em",
       height: "0.6000000000000001em"
      },
      children: (0, t.jsx)(ei.default, {
       type: r
      })
     }) : (0, t.jsx)(et, {
      type: "plus",
      size: .6000000000000001,
      thickness: "1px",
      className: "accordion-item-icon"
     })
    })]
   })
  })
 }

 function es({
  className: e,
  children: i,
  ...r
 }) {
  return (0, t.jsx)(Z, {
   "data-slot": "accordion-content",
   className: (0, ee.cn)("data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden", e),
   ...r,
   children: i
  })
 }
 e.s(["Accordion", () => er, "AccordionContent", () => es, "AccordionItem", () => en, "AccordionTrigger", () => eo], 607514)
}, 255667, e => {
 "use strict";

 function t(e, t, i) {
  return Math.max(e, Math.min(t, i))
 }
 var i = class {
   isRunning = !1;
   value = 0;
   from = 0;
   to = 0;
   currentTime = 0;
   lerp;
   duration;
   easing;
   onUpdate;
   advance(e) {
    if (!this.isRunning) return;
    let i = !1;
    if (this.duration && this.easing) {
     this.currentTime += e;
     let r = t(0, this.currentTime / this.duration, 1),
      n = (i = r >= 1) ? 1 : this.easing(r);
     this.value = this.from + (this.to - this.from) * n
    } else if (this.lerp) {
     var r, n, o, s;
     this.value = (r = this.value, n = this.to, o = 60 * this.lerp, (1 - (s = 1 - Math.exp(-o * e))) * r + s * n), Math.round(this.value) === this.to && (this.value = this.to, i = !0)
    } else this.value = this.to, i = !0;
    i && this.stop(), this.onUpdate?.(this.value, i)
   }
   stop() {
    this.isRunning = !1
   }
   fromTo(e, t, {
    lerp: i,
    duration: r,
    easing: n,
    onStart: o,
    onUpdate: s
   }) {
    this.from = this.value = e, this.to = t, this.lerp = i, this.duration = r, this.easing = n, this.currentTime = 0, this.isRunning = !0, o?.(), this.onUpdate = s
   }
  },
  r = class {
   constructor(e, t, {
    autoResize: i = !0,
    debounce: r = 250
   } = {}) {
    this.wrapper = e, this.content = t, i && (this.debouncedResize = function(e, t) {
     let i;
     return function(...r) {
      let n = this;
      clearTimeout(i), i = setTimeout(() => {
       i = void 0, e.apply(n, r)
      }, t)
     }
    }(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize()
   }
   width = 0;
   height = 0;
   scrollHeight = 0;
   scrollWidth = 0;
   debouncedResize;
   wrapperResizeObserver;
   contentResizeObserver;
   destroy() {
    this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, !1)
   }
   resize = () => {
    this.onWrapperResize(), this.onContentResize()
   };
   onWrapperResize = () => {
    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
   };
   onContentResize = () => {
    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
   };
   get limit() {
    return {
     x: this.scrollWidth - this.width,
     y: this.scrollHeight - this.height
    }
   }
  },
  n = class {
   events = {};
   emit(e, ...t) {
    let i = this.events[e] || [];
    for (let e = 0, r = i.length; e < r; e++) i[e]?.(...t)
   }
   on(e, t) {
    return this.events[e]?.push(t) || (this.events[e] = [t]), () => {
     this.events[e] = this.events[e]?.filter(e => t !== e)
    }
   }
   off(e, t) {
    this.events[e] = this.events[e]?.filter(e => t !== e)
   }
   destroy() {
    this.events = {}
   }
  },
  o = 100 / 6,
  s = {
   passive: !1
  },
  a = class {
   constructor(e, t = {
    wheelMultiplier: 1,
    touchMultiplier: 1
   }) {
    this.element = e, this.options = t, window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, s), this.element.addEventListener("touchstart", this.onTouchStart, s), this.element.addEventListener("touchmove", this.onTouchMove, s), this.element.addEventListener("touchend", this.onTouchEnd, s)
   }
   touchStart = {
    x: 0,
    y: 0
   };
   lastDelta = {
    x: 0,
    y: 0
   };
   window = {
    width: 0,
    height: 0
   };
   emitter = new n;
   on(e, t) {
    return this.emitter.on(e, t)
   }
   destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), this.element.removeEventListener("wheel", this.onWheel, s), this.element.removeEventListener("touchstart", this.onTouchStart, s), this.element.removeEventListener("touchmove", this.onTouchMove, s), this.element.removeEventListener("touchend", this.onTouchEnd, s)
   }
   onTouchStart = e => {
    let {
     clientX: t,
     clientY: i
    } = e.targetTouches ? e.targetTouches[0] : e;
    this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = {
     x: 0,
     y: 0
    }, this.emitter.emit("scroll", {
     deltaX: 0,
     deltaY: 0,
     event: e
    })
   };
   onTouchMove = e => {
    let {
     clientX: t,
     clientY: i
    } = e.targetTouches ? e.targetTouches[0] : e, r = -(t - this.touchStart.x) * this.options.touchMultiplier, n = -(i - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = {
     x: r,
     y: n
    }, this.emitter.emit("scroll", {
     deltaX: r,
     deltaY: n,
     event: e
    })
   };
   onTouchEnd = e => {
    this.emitter.emit("scroll", {
     deltaX: this.lastDelta.x,
     deltaY: this.lastDelta.y,
     event: e
    })
   };
   onWheel = e => {
    let {
     deltaX: t,
     deltaY: i,
     deltaMode: r
    } = e, n = 1 === r ? o : 2 === r ? this.window.width : 1, s = 1 === r ? o : 2 === r ? this.window.height : 1;
    t *= n, i *= s, t *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
     deltaX: t,
     deltaY: i,
     event: e
    })
   };
   onWindowResize = () => {
    this.window = {
     width: window.innerWidth,
     height: window.innerHeight
    }
   }
  },
  l = e => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
  c = class {
   _isScrolling = !1;
   _isStopped = !1;
   _isLocked = !1;
   _preventNextNativeScrollEvent = !1;
   _resetVelocityTimeout = null;
   _rafId = null;
   isTouching;
   time = 0;
   userData = {};
   lastVelocity = 0;
   velocity = 0;
   direction = 0;
   options;
   targetScroll;
   animatedScroll;
   animate = new i;
   emitter = new n;
   dimensions;
   virtualScroll;
   constructor({
    wrapper: e = window,
    content: t = document.documentElement,
    eventsTarget: i = e,
    smoothWheel: n = !0,
    syncTouch: o = !1,
    syncTouchLerp: s = .075,
    touchInertiaExponent: c = 1.7,
    duration: u,
    easing: d,
    lerp: h = .1,
    infinite: f = !1,
    orientation: p = "vertical",
    gestureOrientation: m = "horizontal" === p ? "both" : "vertical",
    touchMultiplier: y = 1,
    wheelMultiplier: v = 1,
    autoResize: g = !0,
    prevent: x,
    virtualScroll: b,
    overscroll: k = !0,
    autoRaf: w = !1,
    anchors: S = !1,
    autoToggle: E = !1,
    allowNestedScroll: A = !1,
    __experimental__naiveDimensions: j = !1,
    naiveDimensions: C = j,
    stopInertiaOnNavigate: T = !1
   } = {}) {
    window.lenisVersion = "1.3.17", e && e !== document.documentElement || (e = window), "number" == typeof u && "function" != typeof d ? d = l : "function" == typeof d && "number" != typeof u && (u = 1), this.options = {
     wrapper: e,
     content: t,
     eventsTarget: i,
     smoothWheel: n,
     syncTouch: o,
     syncTouchLerp: s,
     touchInertiaExponent: c,
     duration: u,
     easing: d,
     lerp: h,
     infinite: f,
     gestureOrientation: m,
     orientation: p,
     touchMultiplier: y,
     wheelMultiplier: v,
     autoResize: g,
     prevent: x,
     virtualScroll: b,
     overscroll: k,
     autoRaf: w,
     anchors: S,
     autoToggle: E,
     allowNestedScroll: A,
     naiveDimensions: C,
     stopInertiaOnNavigate: T
    }, this.dimensions = new r(e, t, {
     autoResize: g
    }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
     capture: !0
    }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick, !1), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, !1), this.virtualScroll = new a(i, {
     touchMultiplier: y,
     wheelMultiplier: v
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
     passive: !0
    })), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf))
   }
   destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
     capture: !0
    }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, !1), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick, !1), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId)
   }
   on(e, t) {
    return this.emitter.on(e, t)
   }
   off(e, t) {
    return this.emitter.off(e, t)
   }
   onScrollEnd = e => {
    e instanceof CustomEvent || "smooth" !== this.isScrolling && !1 !== this.isScrolling || e.stopPropagation()
   };
   dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
     bubbles: this.options.wrapper === window,
     detail: {
      lenisScrollEnd: !0
     }
    }))
   };
   get overflow() {
    let e = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[e]
   }
   checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart()
   }
   onTransitionEnd = e => {
    e.propertyName.includes("overflow") && this.checkOverflow()
   };
   setScroll(e) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
     left: e,
     behavior: "instant"
    }) : this.options.wrapper.scrollTo({
     top: e,
     behavior: "instant"
    })
   }
   onClick = e => {
    let t = e.composedPath().filter(e => e instanceof HTMLAnchorElement && e.getAttribute("href"));
    if (this.options.anchors) {
     let e = t.find(e => e.getAttribute("href")?.includes("#"));
     if (e) {
      let t = e.getAttribute("href");
      if (t) {
       let e = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0,
        i = `#${t.split("#")[1]}`;
       this.scrollTo(i, e)
      }
     }
    }
    this.options.stopInertiaOnNavigate && t.find(e => e.host === window.location.host) && this.reset()
   };
   onPointerDown = e => {
    1 === e.button && this.reset()
   };
   onVirtualScroll = e => {
    if ("function" == typeof this.options.virtualScroll && !1 === this.options.virtualScroll(e)) return;
    let {
     deltaX: t,
     deltaY: i,
     event: r
    } = e;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: t,
      deltaY: i,
      event: r
     }), r.ctrlKey || r.lenisStopPropagation) return;
    let n = r.type.includes("touch"),
     o = r.type.includes("wheel");
    this.isTouching = "touchstart" === r.type || "touchmove" === r.type;
    let s = 0 === t && 0 === i;
    if (this.options.syncTouch && n && "touchstart" === r.type && s && !this.isStopped && !this.isLocked) return void this.reset();
    let a = "vertical" === this.options.gestureOrientation && 0 === i || "horizontal" === this.options.gestureOrientation && 0 === t;
    if (s || a) return;
    let l = r.composedPath();
    l = l.slice(0, l.indexOf(this.rootElement));
    let c = this.options.prevent;
    if (l.find(e => e instanceof HTMLElement && ("function" == typeof c && c?.(e) || e.hasAttribute?.("data-lenis-prevent") || n && e.hasAttribute?.("data-lenis-prevent-touch") || o && e.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.checkNestedScroll(e, {
      deltaX: t,
      deltaY: i
     })))) return;
    if (this.isStopped || this.isLocked) {
     r.cancelable && r.preventDefault();
     return
    }
    if (!(this.options.syncTouch && n || this.options.smoothWheel && o)) {
     this.isScrolling = "native", this.animate.stop(), r.lenisStopPropagation = !0;
     return
    }
    let u = i;
    "both" === this.options.gestureOrientation ? u = Math.abs(i) > Math.abs(t) ? i : t : "horizontal" === this.options.gestureOrientation && (u = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i > 0 || this.animatedScroll === this.limit && i < 0)) && (r.lenisStopPropagation = !0), r.cancelable && r.preventDefault();
    let d = n && this.options.syncTouch,
     h = n && "touchend" === r.type;
    h && (u = Math.sign(this.velocity) * Math.pow(Math.abs(this.velocity), this.options.touchInertiaExponent)), this.scrollTo(this.targetScroll + u, {
     programmatic: !1,
     ...d ? {
      lerp: h ? this.options.syncTouchLerp : 1
     } : {
      lerp: this.options.lerp,
      duration: this.options.duration,
      easing: this.options.easing
     }
    })
   };
   resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit()
   }
   emit() {
    this.emitter.emit("scroll", this)
   }
   onNativeScroll = () => {
    if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
     this._preventNextNativeScrollEvent = !1;
     return
    }
    if (!1 === this.isScrolling || "native" === this.isScrolling) {
     let e = this.animatedScroll;
     this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - e, this.direction = Math.sign(this.animatedScroll - e), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
      this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit()
     }, 400))
    }
   };
   reset() {
    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
   }
   start() {
    if (this.isStopped) {
     if (this.options.autoToggle) return void this.rootElement.style.removeProperty("overflow");
     this.internalStart()
    }
   }
   internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit())
   }
   stop() {
    if (!this.isStopped) {
     if (this.options.autoToggle) return void this.rootElement.style.setProperty("overflow", "clip");
     this.internalStop()
    }
   }
   internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit())
   }
   raf = e => {
    let t = e - (this.time || e);
    this.time = e, this.animate.advance(.001 * t), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf))
   };
   scrollTo(e, {
    offset: i = 0,
    immediate: r = !1,
    lock: n = !1,
    programmatic: o = !0,
    lerp: s = o ? this.options.lerp : void 0,
    duration: a = o ? this.options.duration : void 0,
    easing: c = o ? this.options.easing : void 0,
    onStart: u,
    onComplete: d,
    force: h = !1,
    userData: f
   } = {}) {
    if (!this.isStopped && !this.isLocked || h) {
     if ("string" == typeof e && ["top", "left", "start", "#"].includes(e)) e = 0;
     else if ("string" == typeof e && ["bottom", "right", "end"].includes(e)) e = this.limit;
     else {
      let t;
      if ("string" == typeof e ? (t = document.querySelector(e)) || ("#top" === e ? e = 0 : console.warn("Lenis: Target not found", e)) : e instanceof HTMLElement && e?.nodeType && (t = e), t) {
       if (this.options.wrapper !== window) {
        let e = this.rootElement.getBoundingClientRect();
        i -= this.isHorizontal ? e.left : e.top
       }
       let r = t.getBoundingClientRect();
       e = (this.isHorizontal ? r.left : r.top) + this.animatedScroll
      }
     }
     if ("number" == typeof e) {
      if (e += i, e = Math.round(e), this.options.infinite) {
       if (o) {
        this.targetScroll = this.animatedScroll = this.scroll;
        let t = e - this.animatedScroll;
        t > this.limit / 2 ? e -= this.limit : t < -this.limit / 2 && (e += this.limit)
       }
      } else e = t(0, e, this.limit);
      if (e === this.targetScroll) {
       u?.(this), d?.(this);
       return
      }
      if (this.userData = f ?? {}, r) {
       this.animatedScroll = this.targetScroll = e, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), d?.(this), this.userData = {}, requestAnimationFrame(() => {
        this.dispatchScrollendEvent()
       });
       return
      }
      o || (this.targetScroll = e), "number" == typeof a && "function" != typeof c ? c = l : "function" == typeof c && "number" != typeof a && (a = 1), this.animate.fromTo(this.animatedScroll, e, {
       duration: a,
       easing: c,
       lerp: s,
       onStart: () => {
        n && (this.isLocked = !0), this.isScrolling = "smooth", u?.(this)
       },
       onUpdate: (e, t) => {
        this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = e - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = e, this.setScroll(this.scroll), o && (this.targetScroll = e), t || this.emit(), t && (this.reset(), this.emit(), d?.(this), this.userData = {}, requestAnimationFrame(() => {
         this.dispatchScrollendEvent()
        }), this.preventNextNativeScrollEvent())
       }
      })
     }
    }
   }
   preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
     this._preventNextNativeScrollEvent = !1
    })
   }
   checkNestedScroll(e, {
    deltaX: t,
    deltaY: i
   }) {
    let r, n, o, s, a, l, c, u, d, h, f, p, m, y, v = Date.now(),
     g = e._lenis ??= {},
     x = this.options.gestureOrientation;
    if (v - (g.time ?? 0) > 2e3) {
     g.time = Date.now();
     let t = window.getComputedStyle(e);
     g.computedStyle = t;
     let i = t.overflowX,
      d = t.overflowY;
     if (r = ["auto", "overlay", "scroll"].includes(i), n = ["auto", "overlay", "scroll"].includes(d), g.hasOverflowX = r, g.hasOverflowY = n, !r && !n || "vertical" === x && !n || "horizontal" === x && !r) return !1;
     a = e.scrollWidth, l = e.scrollHeight, c = e.clientWidth, u = e.clientHeight, o = a > c, s = l > u, g.isScrollableX = o, g.isScrollableY = s, g.scrollWidth = a, g.scrollHeight = l, g.clientWidth = c, g.clientHeight = u
    } else o = g.isScrollableX, s = g.isScrollableY, r = g.hasOverflowX, n = g.hasOverflowY, a = g.scrollWidth, l = g.scrollHeight, c = g.clientWidth, u = g.clientHeight;
    if (!r && !n || !o && !s || "vertical" === x && (!n || !s) || "horizontal" === x && (!r || !o) || ("horizontal" === x ? d = "x" : "vertical" === x ? d = "y" : (0 !== t && r && o && (d = "x"), 0 !== i && n && s && (d = "y")), !d)) return !1;
    if ("x" === d) h = e.scrollLeft, f = a - c, p = t, m = r, y = o;
    else {
     if ("y" !== d) return !1;
     h = e.scrollTop, f = l - u, p = i, m = n, y = s
    }
    return (p > 0 ? h < f : h > 0) && m && y
   }
   get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper
   }
   get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
   }
   get isHorizontal() {
    return "horizontal" === this.options.orientation
   }
   get actualScroll() {
    let e = this.options.wrapper;
    return this.isHorizontal ? e.scrollX ?? e.scrollLeft : e.scrollY ?? e.scrollTop
   }
   get scroll() {
    var e;
    return this.options.infinite ? (this.animatedScroll % (e = this.limit) + e) % e : this.animatedScroll
   }
   get progress() {
    return 0 === this.limit ? 1 : this.scroll / this.limit
   }
   get isScrolling() {
    return this._isScrolling
   }
   set isScrolling(e) {
    this._isScrolling !== e && (this._isScrolling = e, this.updateClassName())
   }
   get isStopped() {
    return this._isStopped
   }
   set isStopped(e) {
    this._isStopped !== e && (this._isStopped = e, this.updateClassName())
   }
   get isLocked() {
    return this._isLocked
   }
   set isLocked(e) {
    this._isLocked !== e && (this._isLocked = e, this.updateClassName())
   }
   get isSmooth() {
    return "smooth" === this.isScrolling
   }
   get className() {
    let e = "lenis";
    return this.options.autoToggle && (e += " lenis-autoToggle"), this.isStopped && (e += " lenis-stopped"), this.isLocked && (e += " lenis-locked"), this.isScrolling && (e += " lenis-scrolling"), "smooth" === this.isScrolling && (e += " lenis-smooth"), e
   }
   updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim()
   }
   cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim()
   }
  },
  u = e.i(271645),
  d = e.i(843476),
  h = (0, u.createContext)(null),
  f = new class {
   constructor(e) {
    this.state = e
   }
   listeners = [];
   set(e) {
    for (let t of (this.state = e, this.listeners)) t(this.state)
   }
   subscribe(e) {
    return this.listeners = [...this.listeners, e], () => {
     this.listeners = this.listeners.filter(t => t !== e)
    }
   }
   get() {
    return this.state
   }
  }(null),
  p = (0, u.forwardRef)(({
   children: e,
   root: t = !1,
   options: i = {},
   autoRaf: r = !0,
   ...n
  }, o) => {
   let s = (0, u.useRef)(null),
    a = (0, u.useRef)(null),
    [l, p] = (0, u.useState)(void 0);
   (0, u.useImperativeHandle)(o, () => ({
    wrapper: s.current,
    content: a.current,
    lenis: l
   }), [l]), (0, u.useEffect)(() => {
    let e = new c({
     ...i,
     ...s.current && a.current && {
      wrapper: s.current,
      content: a.current
     },
     autoRaf: i?.autoRaf ?? r
    });
    return p(e), () => {
     e.destroy(), p(void 0)
    }
   }, [t, JSON.stringify({
    ...i,
    wrapper: null,
    content: null
   })]);
   let m = (0, u.useRef)([]),
    y = (0, u.useCallback)((e, t) => {
     m.current.push({
      callback: e,
      priority: t
     }), m.current.sort((e, t) => e.priority - t.priority)
    }, []),
    v = (0, u.useCallback)(e => {
     m.current = m.current.filter(t => t.callback !== e)
    }, []);
   return ((0, u.useEffect)(() => {
    if (t && l) return f.set({
     lenis: l,
     addCallback: y,
     removeCallback: v
    }), () => f.set(null)
   }, [t, l, y, v]), (0, u.useEffect)(() => {
    if (!l) return;
    let e = e => {
     for (let t = 0; t < m.current.length; t++) m.current[t]?.callback(e)
    };
    return l.on("scroll", e), () => {
     l.off("scroll", e)
    }
   }, [l]), e) ? (0, d.jsx)(h.Provider, {
    value: {
     lenis: l,
     addCallback: y,
     removeCallback: v
    },
    children: t && "asChild" !== t ? e : (0, d.jsx)("div", {
     ref: s,
     ...n,
     children: (0, d.jsx)("div", {
      ref: a,
      children: e
     })
    })
   }) : null
  }),
  m = {};

 function y(e, t = [], i = 0) {
  let r = (0, u.useContext)(h),
   n = function(e) {
    let [t, i] = (0, u.useState)(e.get());
    return (0, u.useEffect)(() => e.subscribe(e => i(e)), [e]), t
   }(f),
   {
    lenis: o,
    addCallback: s,
    removeCallback: a
   } = r ?? n ?? m;
  return (0, u.useEffect)(() => {
   if (e && s && a && o) return s(e, i), e(o), () => {
    a(e)
   }
  }, [o, s, a, i, ...t]), o
 }
 e.s(["ReactLenis", () => p, "useLenis", () => y], 255667)
}, 393134, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(271645),
  r = e.i(380064),
  n = e.i(824511);

 function o({
  className: e,
  children: o,
  ...s
 }) {
  let a, l = (a = (0, i.useId)().replace(/:/g, ""), (0, i.useMemo)(() => {
   let e = btoa(`
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter-${a}">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="1"
            seed="8000"
          />
          <feComponentTransfer result="coloredNoise">
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feFlood
            flood-color="#0C1814"
            result="colorFlood"
          />
          <feComposite
            operator="in"
            in2="coloredNoise"
            in="colorFlood"
            result="color"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter-${a})" opacity="0.2"/>
      </svg>
    `);
   return {
    backgroundImage: `url("data:image/svg+xml;base64,${e}")`,
    backgroundSize: "512px 512px",
    backgroundRepeat: "repeat"
   }
  }, [a]));
  return null != o ? (0, t.jsxs)(n.m.div, {
   className: (0, r.cn)("absolute inset-0 isolate", "has-[img.lazyloaded]:[&>*:nth-child(2)]:opacity-100 has-[video.is-loaded]:[&>*:nth-child(2)]:opacity-100", e),
   ...s,
   children: [o, (0, t.jsx)("div", {
    "aria-hidden": "true",
    className: (0, r.cn)("pointer-events-none absolute inset-0 z-10 mix-blend-overlay", "opacity-0 transition-opacity delay-200 duration-300", "animate-[noise_3s_steps(5)_infinite] bg-position-[50%]"),
    style: l
   })]
  }) : (0, t.jsx)(n.m.div, {
   "aria-hidden": "true",
   className: (0, r.cn)("pointer-events-none absolute inset-0 -z-10 bg-blend-overlay", "bg-green-5", "animate-[noise_3s_steps(5)_infinite] bg-position-[50%]", e),
   style: l,
   ...s
  })
 }
 e.s(["default", () => o])
}, 387652, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(749652);
 let r = {
  some: 0,
  all: 1
 };

 function n(e, {
  root: o,
  margin: s,
  amount: a,
  once: l = !1,
  initial: c = !1
 } = {}) {
  let [u, d] = (0, t.useState)(c);
  return (0, t.useEffect)(() => {
   if (!e.current || l && u) return;
   let t = {
    root: o && o.current || void 0,
    margin: s,
    amount: a
   };
   return function(e, t, {
    root: n,
    margin: o,
    amount: s = "some"
   } = {}) {
    let a = (0, i.resolveElements)(e),
     l = new WeakMap,
     c = new IntersectionObserver(e => {
      e.forEach(e => {
       let i = l.get(e.target);
       if (!!i !== e.isIntersecting)
        if (e.isIntersecting) {
         let i = t(e.target, e);
         "function" == typeof i ? l.set(e.target, i) : c.unobserve(e.target)
        } else "function" == typeof i && (i(e), l.delete(e.target))
      })
     }, {
      root: n,
      rootMargin: o,
      threshold: "number" == typeof s ? s : r[s]
     });
    return a.forEach(e => c.observe(e)), () => c.disconnect()
   }(e.current, () => (d(!0), l ? void 0 : () => d(!1)), t)
  }, [o, e, s, l, a]), u
 }
 e.s(["useInView", () => n], 387652)
}, 681083, e => {
 "use strict";
 var t = e.i(271645);
 let i = e => ({
  isTouchDevice: window.matchMedia("(any-hover: none)").matches,
  isSm: e < 640,
  isMd: e >= 640 && e < 768,
  isLg: e >= 768 && e < 1024,
  isXl: e >= 1024 && e < 1280,
  isXxl: e >= 1280 && e < 1536,
  isAboveXxl: e >= 1536,
  isAboveMax: e >= 2e3,
  isDesktop: e >= 1024,
  isTablet: e < 1024,
  isMobile: e < 768
 });

 function r() {
  let [e, r] = (0, t.useState)({
   width: 0,
   height: 0
  }), [n, o] = (0, t.useState)({
   ...i(0),
   isTouchDevice: !1
  });
  return (0, t.useEffect)(() => {
   let e = () => {
    let e = (() => {
     let {
      innerWidth: e,
      innerHeight: t
     } = window;
     return {
      width: e,
      height: t
     }
    })();
    r(e), o(i(e.width))
   };
   return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e)
  }, []), {
   width: e.width,
   height: e.height,
   ...n
  }
 }
 e.s(["default", () => r])
}, 155487, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(313027),
  r = {
   notify() {},
   get: () => []
  },
  n = "u" > typeof window && void 0 !== window.document && void 0 !== window.document.createElement,
  o = "u" > typeof navigator && "ReactNative" === navigator.product,
  s = n || o ? t.useLayoutEffect : t.useEffect,
  a = Symbol.for("react-redux-context"),
  l = "u" > typeof globalThis ? globalThis : {},
  c = function() {
   if (!t.createContext) return {};
   let e = l[a] ??= new Map,
    i = e.get(t.createContext);
   return i || (i = t.createContext(null), e.set(t.createContext, i)), i
  }(),
  u = function(e) {
   let {
    children: i,
    context: n,
    serverState: o,
    store: a
   } = e, l = t.useMemo(() => {
    let e = function(e, t) {
     let i, n = r,
      o = 0,
      s = !1;

     function a() {
      u.onStateChange && u.onStateChange()
     }

     function l() {
      if (o++, !i) {
       let t, r;
       i = e.subscribe(a), t = null, r = null, n = {
        clear() {
         t = null, r = null
        },
        notify() {
         let e = t;
         for (; e;) e.callback(), e = e.next
        },
        get() {
         let e = [],
          i = t;
         for (; i;) e.push(i), i = i.next;
         return e
        },
        subscribe(e) {
         let i = !0,
          n = r = {
           callback: e,
           next: null,
           prev: r
          };
         return n.prev ? n.prev.next = n : t = n,
          function() {
           i && null !== t && (i = !1, n.next ? n.next.prev = n.prev : r = n.prev, n.prev ? n.prev.next = n.next : t = n.next)
          }
        }
       }
      }
     }

     function c() {
      o--, i && 0 === o && (i(), i = void 0, n.clear(), n = r)
     }
     let u = {
      addNestedSub: function(e) {
       l();
       let t = n.subscribe(e),
        i = !1;
       return () => {
        i || (i = !0, t(), c())
       }
      },
      notifyNestedSubs: function() {
       n.notify()
      },
      handleChangeWrapper: a,
      isSubscribed: function() {
       return s
      },
      trySubscribe: function() {
       s || (s = !0, l())
      },
      tryUnsubscribe: function() {
       s && (s = !1, c())
      },
      getListeners: () => n
     };
     return u
    }(a);
    return {
     store: a,
     subscription: e,
     getServerState: o ? () => o : void 0
    }
   }, [a, o]), u = t.useMemo(() => a.getState(), [a]);
   return s(() => {
    let {
     subscription: e
    } = l;
    return e.onStateChange = e.notifyNestedSubs, e.trySubscribe(), u !== a.getState() && e.notifyNestedSubs(), () => {
     e.tryUnsubscribe(), e.onStateChange = void 0
    }
   }, [l, u]), t.createElement((n || c).Provider, {
    value: l
   }, i)
  };

 function d(e = c) {
  return function() {
   return t.useContext(e)
  }
 }
 var h = d();

 function f(e = c) {
  let t = e === c ? h : d(e),
   i = () => {
    let {
     store: e
    } = t();
    return e
   };
  return Object.assign(i, {
   withTypes: () => i
  }), i
 }
 var p = f(),
  m = function(e = c) {
   let t = e === c ? p : f(e),
    i = () => t().dispatch;
   return Object.assign(i, {
    withTypes: () => i
   }), i
  }(),
  y = (e, t) => e === t,
  v = function(e = c) {
   let r = e === c ? h : d(e),
    n = (e, n = {}) => {
     let {
      equalityFn: o = y
     } = "function" == typeof n ? {
      equalityFn: n
     } : n, {
      store: s,
      subscription: a,
      getServerState: l
     } = r();
     t.useRef(!0);
     let c = t.useCallback({
       [e.name]: t => e(t)
      } [e.name], [e]),
      u = (0, i.useSyncExternalStoreWithSelector)(a.addNestedSub, s.getState, l || s.getState, c, o);
     return t.useDebugValue(u), u
    };
   return Object.assign(n, {
    withTypes: () => n
   }), n
  }();
 e.s(["Provider", () => u, "useDispatch", () => m, "useSelector", () => v, "useStore", () => p])
}, 756107, e => {
 "use strict";
 var t = e.i(155487);
 let i = t.useDispatch.withTypes(),
  r = t.useSelector.withTypes();
 t.useStore.withTypes(), e.s(["useAppDispatch", 0, i, "useAppSelector", 0, r])
}, 21206, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(756107);
 let r = e.i(113182).pageTransitionFade.pageShow.transition.duration;

 function n() {
  return (0, i.useAppSelector)(e => e.globalSettings.isIntroComplete)
 }

 function o(e = 2.5) {
  let i = n(),
   [s, a] = (0, t.useState)(null);
  return (0, t.useEffect)(() => {
   null !== i && null === s && a((i ? 0 : e) + r)
  }, [i, s, e]), s
 }
 e.s(["useIntroDelay", () => o, "useIntroStatus", () => n])
}, 697347, e => {
 "use strict";
 var t = e.i(843476),
  i = e.i(271645),
  r = e.i(113182),
  n = e.i(380064),
  o = e.i(88653),
  s = e.i(824511),
  a = e.i(387652);

 function l({
  texts: e = [],
  interval: l = 3e3,
  className: c,
  ...u
 }) {
  let [d, h] = (0, i.useState)(0), f = (0, i.useRef)(null), p = (0, a.useInView)(f, {
   margin: "0px 0px -50px 0px"
  });
  return ((0, i.useEffect)(() => {
   if (!p || !(0, n.hasArrayValue)(e) || e.length < 2) return;
   let t = setInterval(() => {
    h(t => (t + 1) % e.length)
   }, l || 3e3);
   return () => clearInterval(t)
  }, [p, e, l || 3e3]), (0, n.hasArrayValue)(e)) ? (0, t.jsxs)(s.m.div, {
   ref: f,
   className: (0, n.cn)("relative grid overflow-hidden select-none", c),
   ...u,
   children: [e.map((e, i) => (0, t.jsx)("p", {
    className: (0, n.cn)("pointer-events-none invisible col-start-1 row-start-1", c),
    "aria-hidden": "true",
    children: e
   }, `ghost-${i}`)), (0, t.jsx)(o.AnimatePresence, {
    initial: !1,
    children: e[d] && (0, t.jsx)(s.m.p, {
     className: (0, n.cn)("col-start-1 row-start-1 text-center"),
     variants: r.fadeSlideRevealAnim,
     initial: "hide",
     animate: "show",
     exit: "exit",
     transition: r.fadeSlideRevealAnim.transition,
     style: {
      willChange: "transform"
     },
     children: e[d]
    }, d)
   })]
  }) : null
 }
 e.s(["default", () => l])
}, 999682, 475254, e => {
 "use strict";
 var t = e.i(271645);

 function i(e) {
  let i = t.useRef({
   value: e,
   previous: e
  });
  return t.useMemo(() => (i.current.value !== e && (i.current.previous = i.current.value, i.current.value = e), i.current.previous), [e])
 }
 e.s(["usePrevious", () => i], 999682);
 let r = (...e) => e.filter((e, t, i) => !!e && "" !== e.trim() && i.indexOf(e) === t).join(" ").trim();
 var n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
 };
 let o = (0, t.forwardRef)(({
   color: e = "currentColor",
   size: i = 24,
   strokeWidth: o = 2,
   absoluteStrokeWidth: s,
   className: a = "",
   children: l,
   iconNode: c,
   ...u
  }, d) => (0, t.createElement)("svg", {
   ref: d,
   ...n,
   width: i,
   height: i,
   stroke: e,
   strokeWidth: s ? 24 * Number(o) / Number(i) : o,
   className: r("lucide", a),
   ...u
  }, [...c.map(([e, i]) => (0, t.createElement)(e, i)), ...Array.isArray(l) ? l : [l]])),
  s = (e, i) => {
   let n = (0, t.forwardRef)(({
    className: n,
    ...s
   }, a) => (0, t.createElement)(o, {
    ref: a,
    iconNode: i,
    className: r(`lucide-${e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`, n),
    ...s
   }));
   return n.displayName = `${e}`, n
  };
 e.s(["default", () => s], 475254)
}, 842727, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(981140),
  r = e.i(75830),
  n = e.i(820783),
  o = e.i(30030),
  s = e.i(610772),
  a = e.i(248425),
  l = e.i(30207),
  c = e.i(369340),
  u = e.i(586318),
  d = e.i(843476),
  h = "rovingFocusGroup.onEntryFocus",
  f = {
   bubbles: !1,
   cancelable: !0
  },
  p = "RovingFocusGroup",
  [m, y, v] = (0, r.createCollection)(p),
  [g, x] = (0, o.createContextScope)(p, [v]),
  [b, k] = g(p),
  w = t.forwardRef((e, t) => (0, d.jsx)(m.Provider, {
   scope: e.__scopeRovingFocusGroup,
   children: (0, d.jsx)(m.Slot, {
    scope: e.__scopeRovingFocusGroup,
    children: (0, d.jsx)(S, {
     ...e,
     ref: t
    })
   })
  }));
 w.displayName = p;
 var S = t.forwardRef((e, r) => {
   let {
    __scopeRovingFocusGroup: o,
    orientation: s,
    loop: m = !1,
    dir: v,
    currentTabStopId: g,
    defaultCurrentTabStopId: x,
    onCurrentTabStopIdChange: k,
    onEntryFocus: w,
    preventScrollOnEntryFocus: S = !1,
    ...E
   } = e, A = t.useRef(null), j = (0, n.useComposedRefs)(r, A), T = (0, u.useDirection)(v), [O, N] = (0, c.useControllableState)({
    prop: g,
    defaultProp: x ?? null,
    onChange: k,
    caller: p
   }), [R, _] = t.useState(!1), P = (0, l.useCallbackRef)(w), I = y(o), M = t.useRef(!1), [D, L] = t.useState(0);
   return t.useEffect(() => {
    let e = A.current;
    if (e) return e.addEventListener(h, P), () => e.removeEventListener(h, P)
   }, [P]), (0, d.jsx)(b, {
    scope: o,
    orientation: s,
    dir: T,
    loop: m,
    currentTabStopId: O,
    onItemFocus: t.useCallback(e => N(e), [N]),
    onItemShiftTab: t.useCallback(() => _(!0), []),
    onFocusableItemAdd: t.useCallback(() => L(e => e + 1), []),
    onFocusableItemRemove: t.useCallback(() => L(e => e - 1), []),
    children: (0, d.jsx)(a.Primitive.div, {
     tabIndex: R || 0 === D ? -1 : 0,
     "data-orientation": s,
     ...E,
     ref: j,
     style: {
      outline: "none",
      ...e.style
     },
     onMouseDown: (0, i.composeEventHandlers)(e.onMouseDown, () => {
      M.current = !0
     }),
     onFocus: (0, i.composeEventHandlers)(e.onFocus, e => {
      let t = !M.current;
      if (e.target === e.currentTarget && t && !R) {
       let t = new CustomEvent(h, f);
       if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
        let e = I().filter(e => e.focusable);
        C([e.find(e => e.active), e.find(e => e.id === O), ...e].filter(Boolean).map(e => e.ref.current), S)
       }
      }
      M.current = !1
     }),
     onBlur: (0, i.composeEventHandlers)(e.onBlur, () => _(!1))
    })
   })
  }),
  E = "RovingFocusGroupItem",
  A = t.forwardRef((e, r) => {
   let {
    __scopeRovingFocusGroup: n,
    focusable: o = !0,
    active: l = !1,
    tabStopId: c,
    children: u,
    ...h
   } = e, f = (0, s.useId)(), p = c || f, v = k(E, n), g = v.currentTabStopId === p, x = y(n), {
    onFocusableItemAdd: b,
    onFocusableItemRemove: w,
    currentTabStopId: S
   } = v;
   return t.useEffect(() => {
    if (o) return b(), () => w()
   }, [o, b, w]), (0, d.jsx)(m.ItemSlot, {
    scope: n,
    id: p,
    focusable: o,
    active: l,
    children: (0, d.jsx)(a.Primitive.span, {
     tabIndex: g ? 0 : -1,
     "data-orientation": v.orientation,
     ...h,
     ref: r,
     onMouseDown: (0, i.composeEventHandlers)(e.onMouseDown, e => {
      o ? v.onItemFocus(p) : e.preventDefault()
     }),
     onFocus: (0, i.composeEventHandlers)(e.onFocus, () => v.onItemFocus(p)),
     onKeyDown: (0, i.composeEventHandlers)(e.onKeyDown, e => {
      if ("Tab" === e.key && e.shiftKey) return void v.onItemShiftTab();
      if (e.target !== e.currentTarget) return;
      let t = function(e, t, i) {
       var r;
       let n = (r = e.key, "rtl" !== i ? r : "ArrowLeft" === r ? "ArrowRight" : "ArrowRight" === r ? "ArrowLeft" : r);
       if (!("vertical" === t && ["ArrowLeft", "ArrowRight"].includes(n)) && !("horizontal" === t && ["ArrowUp", "ArrowDown"].includes(n))) return j[n]
      }(e, v.orientation, v.dir);
      if (void 0 !== t) {
       if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
       e.preventDefault();
       let n = x().filter(e => e.focusable).map(e => e.ref.current);
       if ("last" === t) n.reverse();
       else if ("prev" === t || "next" === t) {
        var i, r;
        "prev" === t && n.reverse();
        let o = n.indexOf(e.currentTarget);
        n = v.loop ? (i = n, r = o + 1, i.map((e, t) => i[(r + t) % i.length])) : n.slice(o + 1)
       }
       setTimeout(() => C(n))
      }
     }),
     children: "function" == typeof u ? u({
      isCurrentTabStop: g,
      hasTabStop: null != S
     }) : u
    })
   })
  });
 A.displayName = E;
 var j = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
 };

 function C(e, t = !1) {
  let i = document.activeElement;
  for (let r of e)
   if (r === i || (r.focus({
     preventScroll: t
    }), document.activeElement !== i)) return
 }
 e.s(["Item", () => A, "Root", () => w, "createRovingFocusGroupScope", () => x])
}, 733498, e => {
 "use strict";
 let t = (0, e.i(475254).default)("Circle", [
  ["circle", {
   cx: "12",
   cy: "12",
   r: "10",
   key: "1mglay"
  }]
 ]);
 e.s(["CircleIcon", () => t], 733498)
}, 75830, 586318, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(30030),
  r = e.i(820783),
  n = e.i(843476);

 function o(e) {
  var i;
  let o, s = (i = e, (o = t.forwardRef((e, i) => {
    let {
     children: n,
     ...o
    } = e;
    if (t.isValidElement(n)) {
     var s;
     let e, a, l = (s = n, (a = (e = Object.getOwnPropertyDescriptor(s.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? s.ref : (a = (e = Object.getOwnPropertyDescriptor(s, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? s.props.ref : s.props.ref || s.ref),
      c = function(e, t) {
       let i = {
        ...t
       };
       for (let r in t) {
        let n = e[r],
         o = t[r];
        /^on[A-Z]/.test(r) ? n && o ? i[r] = (...e) => {
         let t = o(...e);
         return n(...e), t
        } : n && (i[r] = n) : "style" === r ? i[r] = {
         ...n,
         ...o
        } : "className" === r && (i[r] = [n, o].filter(Boolean).join(" "))
       }
       return {
        ...e,
        ...i
       }
      }(o, n.props);
     return n.type !== t.Fragment && (c.ref = i ? (0, r.composeRefs)(i, l) : l), t.cloneElement(n, c)
    }
    return t.Children.count(n) > 1 ? t.Children.only(null) : null
   })).displayName = `${i}.SlotClone`, o),
   l = t.forwardRef((e, i) => {
    let {
     children: r,
     ...o
    } = e, l = t.Children.toArray(r), c = l.find(a);
    if (c) {
     let e = c.props.children,
      r = l.map(i => i !== c ? i : t.Children.count(e) > 1 ? t.Children.only(null) : t.isValidElement(e) ? e.props.children : null);
     return (0, n.jsx)(s, {
      ...o,
      ref: i,
      children: t.isValidElement(e) ? t.cloneElement(e, void 0, r) : null
     })
    }
    return (0, n.jsx)(s, {
     ...o,
     ref: i,
     children: r
    })
   });
  return l.displayName = `${e}.Slot`, l
 }
 var s = Symbol("radix.slottable");

 function a(e) {
  return t.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === s
 }

 function l(e) {
  let s = e + "CollectionProvider",
   [a, l] = (0, i.createContextScope)(s),
   [c, u] = a(s, {
    collectionRef: {
     current: null
    },
    itemMap: new Map
   }),
   d = e => {
    let {
     scope: i,
     children: r
    } = e, o = t.default.useRef(null), s = t.default.useRef(new Map).current;
    return (0, n.jsx)(c, {
     scope: i,
     itemMap: s,
     collectionRef: o,
     children: r
    })
   };
  d.displayName = s;
  let h = e + "CollectionSlot",
   f = o(h),
   p = t.default.forwardRef((e, t) => {
    let {
     scope: i,
     children: o
    } = e, s = u(h, i), a = (0, r.useComposedRefs)(t, s.collectionRef);
    return (0, n.jsx)(f, {
     ref: a,
     children: o
    })
   });
  p.displayName = h;
  let m = e + "CollectionItemSlot",
   y = "data-radix-collection-item",
   v = o(m),
   g = t.default.forwardRef((e, i) => {
    let {
     scope: o,
     children: s,
     ...a
    } = e, l = t.default.useRef(null), c = (0, r.useComposedRefs)(i, l), d = u(m, o);
    return t.default.useEffect(() => (d.itemMap.set(l, {
     ref: l,
     ...a
    }), () => void d.itemMap.delete(l))), (0, n.jsx)(v, {
     ...{
      [y]: ""
     },
     ref: c,
     children: s
    })
   });
  return g.displayName = m, [{
   Provider: d,
   Slot: p,
   ItemSlot: g
  }, function(i) {
   let r = u(e + "CollectionConsumer", i);
   return t.default.useCallback(() => {
    let e = r.collectionRef.current;
    if (!e) return [];
    let t = Array.from(e.querySelectorAll(`[${y}]`));
    return Array.from(r.itemMap.values()).sort((e, i) => t.indexOf(e.ref.current) - t.indexOf(i.ref.current))
   }, [r.collectionRef, r.itemMap])
  }, l]
 }
 var c = new WeakMap;

 function u(e, t) {
  var i, r;
  let n, o, s;
  if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
  let a = (i = e, r = t, n = i.length, (s = (o = d(r)) >= 0 ? o : n + o) < 0 || s >= n ? -1 : s);
  return -1 === a ? void 0 : e[a]
 }

 function d(e) {
  return e != e || 0 === e ? 0 : Math.trunc(e)
 }(class e extends Map {
  #e;
  constructor(e) {
   super(e), this.#e = [...super.keys()], c.set(this, !0)
  }
  set(e, t) {
   return c.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this
  }
  insert(e, t, i) {
   let r, n = this.has(t),
    o = this.#e.length,
    s = d(e),
    a = s >= 0 ? s : o + s,
    l = a < 0 || a >= o ? -1 : a;
   if (l === this.size || n && l === this.size - 1 || -1 === l) return this.set(t, i), this;
   let c = this.size + +!n;
   s < 0 && a++;
   let u = [...this.#e],
    h = !1;
   for (let e = a; e < c; e++)
    if (a === e) {
     let o = u[e];
     u[e] === t && (o = u[e + 1]), n && this.delete(t), r = this.get(o), this.set(t, i)
    } else {
     h || u[e - 1] !== t || (h = !0);
     let i = u[h ? e : e - 1],
      n = r;
     r = this.get(i), this.delete(i), this.set(i, n)
    } return this
  }
  with(t, i, r) {
   let n = new e(this);
   return n.insert(t, i, r), n
  }
  before(e) {
   let t = this.#e.indexOf(e) - 1;
   if (!(t < 0)) return this.entryAt(t)
  }
  setBefore(e, t, i) {
   let r = this.#e.indexOf(e);
   return -1 === r ? this : this.insert(r, t, i)
  }
  after(e) {
   let t = this.#e.indexOf(e);
   if (-1 !== (t = -1 === t || t === this.size - 1 ? -1 : t + 1)) return this.entryAt(t)
  }
  setAfter(e, t, i) {
   let r = this.#e.indexOf(e);
   return -1 === r ? this : this.insert(r + 1, t, i)
  }
  first() {
   return this.entryAt(0)
  }
  last() {
   return this.entryAt(-1)
  }
  clear() {
   return this.#e = [], super.clear()
  }
  delete(e) {
   let t = super.delete(e);
   return t && this.#e.splice(this.#e.indexOf(e), 1), t
  }
  deleteAt(e) {
   let t = this.keyAt(e);
   return void 0 !== t && this.delete(t)
  }
  at(e) {
   let t = u(this.#e, e);
   if (void 0 !== t) return this.get(t)
  }
  entryAt(e) {
   let t = u(this.#e, e);
   if (void 0 !== t) return [t, this.get(t)]
  }
  indexOf(e) {
   return this.#e.indexOf(e)
  }
  keyAt(e) {
   return u(this.#e, e)
  }
  from(e, t) {
   let i = this.indexOf(e);
   if (-1 === i) return;
   let r = i + t;
   return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r)
  }
  keyFrom(e, t) {
   let i = this.indexOf(e);
   if (-1 === i) return;
   let r = i + t;
   return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r)
  }
  find(e, t) {
   let i = 0;
   for (let r of this) {
    if (Reflect.apply(e, t, [r, i, this])) return r;
    i++
   }
  }
  findIndex(e, t) {
   let i = 0;
   for (let r of this) {
    if (Reflect.apply(e, t, [r, i, this])) return i;
    i++
   }
   return -1
  }
  filter(t, i) {
   let r = [],
    n = 0;
   for (let e of this) Reflect.apply(t, i, [e, n, this]) && r.push(e), n++;
   return new e(r)
  }
  map(t, i) {
   let r = [],
    n = 0;
   for (let e of this) r.push([e[0], Reflect.apply(t, i, [e, n, this])]), n++;
   return new e(r)
  }
  reduce(...e) {
   let [t, i] = e, r = 0, n = i ?? this.at(0);
   for (let i of this) n = 0 === r && 1 === e.length ? i : Reflect.apply(t, this, [n, i, r, this]), r++;
   return n
  }
  reduceRight(...e) {
   let [t, i] = e, r = i ?? this.at(-1);
   for (let i = this.size - 1; i >= 0; i--) {
    let n = this.at(i);
    r = i === this.size - 1 && 1 === e.length ? n : Reflect.apply(t, this, [r, n, i, this])
   }
   return r
  }
  toSorted(t) {
   return new e([...this.entries()].sort(t))
  }
  toReversed() {
   let t = new e;
   for (let e = this.size - 1; e >= 0; e--) {
    let i = this.keyAt(e),
     r = this.get(i);
    t.set(i, r)
   }
   return t
  }
  toSpliced(...t) {
   let i = [...this.entries()];
   return i.splice(...t), new e(i)
  }
  slice(t, i) {
   let r = new e,
    n = this.size - 1;
   if (void 0 === t) return r;
   t < 0 && (t += this.size), void 0 !== i && i > 0 && (n = i - 1);
   for (let e = t; e <= n; e++) {
    let t = this.keyAt(e),
     i = this.get(t);
    r.set(t, i)
   }
   return r
  }
  every(e, t) {
   let i = 0;
   for (let r of this) {
    if (!Reflect.apply(e, t, [r, i, this])) return !1;
    i++
   }
   return !0
  }
  some(e, t) {
   let i = 0;
   for (let r of this) {
    if (Reflect.apply(e, t, [r, i, this])) return !0;
    i++
   }
   return !1
  }
 }), e.s(["createCollection", () => l], 75830);
 var h = t.createContext(void 0);

 function f(e) {
  let i = t.useContext(h);
  return e || i || "ltr"
 }
 e.s(["useDirection", () => f], 586318)
}, 940141, e => {
 "use strict";
 var t = e.i(271645),
  i = {
   color: void 0,
   size: void 0,
   className: void 0,
   style: void 0,
   attr: void 0
  },
  r = t.default.createContext && t.default.createContext(i),
  n = ["attr", "size", "title"];

 function o() {
  return (o = Object.assign.bind()).apply(this, arguments)
 }

 function s(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
   var r = Object.getOwnPropertySymbols(e);
   t && (r = r.filter(function(t) {
    return Object.getOwnPropertyDescriptor(e, t).enumerable
   })), i.push.apply(i, r)
  }
  return i
 }

 function a(e) {
  for (var t = 1; t < arguments.length; t++) {
   var i = null != arguments[t] ? arguments[t] : {};
   t % 2 ? s(Object(i), !0).forEach(function(t) {
    var r, n, o;
    r = e, n = t, o = i[t], (n = function(e) {
     var t = function(e, t) {
      if ("object" != typeof e || !e) return e;
      var i = e[Symbol.toPrimitive];
      if (void 0 !== i) {
       var r = i.call(e, t || "default");
       if ("object" != typeof r) return r;
       throw TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === t ? String : Number)(e)
     }(e, "string");
     return "symbol" == typeof t ? t : t + ""
    }(n)) in r ? Object.defineProperty(r, n, {
     value: o,
     enumerable: !0,
     configurable: !0,
     writable: !0
    }) : r[n] = o
   }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach(function(t) {
    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
   })
  }
  return e
 }

 function l(e) {
  return i => t.default.createElement(c, o({
   attr: a({}, e.attr)
  }, i), function e(i) {
   return i && i.map((i, r) => t.default.createElement(i.tag, a({
    key: r
   }, i.attr), e(i.child)))
  }(e.child))
 }

 function c(e) {
  var s = i => {
   var r, {
     attr: s,
     size: l,
     title: c
    } = e,
    u = function(e, t) {
     if (null == e) return {};
     var i, r, n = function(e, t) {
      if (null == e) return {};
      var i = {};
      for (var r in e)
       if (Object.prototype.hasOwnProperty.call(e, r)) {
        if (t.indexOf(r) >= 0) continue;
        i[r] = e[r]
       } return i
     }(e, t);
     if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (r = 0; r < o.length; r++) i = o[r], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i])
     }
     return n
    }(e, n),
    d = l || i.size || "1em";
   return i.className && (r = i.className), e.className && (r = (r ? r + " " : "") + e.className), t.default.createElement("svg", o({
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0"
   }, i.attr, s, u, {
    className: r,
    style: a(a({
     color: e.color || i.color
    }, i.style), e.style),
    height: d,
    width: d,
    xmlns: "http://www.w3.org/2000/svg"
   }), c && t.default.createElement("title", null, c), e.children)
  };
  return void 0 !== r ? t.default.createElement(r.Consumer, null, e => s(e)) : s(i)
 }
 e.s(["GenIcon", () => l], 940141)
}, 981140, e => {
 "use strict";

 function t(e, i, {
  checkForDefaultPrevented: r = !0
 } = {}) {
  return function(t) {
   if (e?.(t), !1 === r || !t.defaultPrevented) return i?.(t)
  }
 }
 "u" > typeof window && window.document && window.document.createElement, e.s(["composeEventHandlers", () => t])
}, 30030, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(843476);

 function r(e, r) {
  let n = t.createContext(r),
   o = e => {
    let {
     children: r,
     ...o
    } = e, s = t.useMemo(() => o, Object.values(o));
    return (0, i.jsx)(n.Provider, {
     value: s,
     children: r
    })
   };
  return o.displayName = e + "Provider", [o, function(i) {
   let o = t.useContext(n);
   if (o) return o;
   if (void 0 !== r) return r;
   throw Error(`\`${i}\` must be used within \`${e}\``)
  }]
 }

 function n(e, r = []) {
  let o = [],
   s = () => {
    let i = o.map(e => t.createContext(e));
    return function(r) {
     let n = r?.[e] || i;
     return t.useMemo(() => ({
      [`__scope${e}`]: {
       ...r,
       [e]: n
      }
     }), [r, n])
    }
   };
  return s.scopeName = e, [function(r, n) {
   let s = t.createContext(n),
    a = o.length;
   o = [...o, n];
   let l = r => {
    let {
     scope: n,
     children: o,
     ...l
    } = r, c = n?.[e]?.[a] || s, u = t.useMemo(() => l, Object.values(l));
    return (0, i.jsx)(c.Provider, {
     value: u,
     children: o
    })
   };
   return l.displayName = r + "Provider", [l, function(i, o) {
    let l = o?.[e]?.[a] || s,
     c = t.useContext(l);
    if (c) return c;
    if (void 0 !== n) return n;
    throw Error(`\`${i}\` must be used within \`${r}\``)
   }]
  }, function(...e) {
   let i = e[0];
   if (1 === e.length) return i;
   let r = () => {
    let r = e.map(e => ({
     useScope: e(),
     scopeName: e.scopeName
    }));
    return function(e) {
     let n = r.reduce((t, {
      useScope: i,
      scopeName: r
     }) => {
      let n = i(e)[`__scope${r}`];
      return {
       ...t,
       ...n
      }
     }, {});
     return t.useMemo(() => ({
      [`__scope${i.scopeName}`]: n
     }), [n])
    }
   };
   return r.scopeName = i.scopeName, r
  }(s, ...r)]
 }
 e.s(["createContext", () => r, "createContextScope", () => n])
}, 248425, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(174080),
  r = e.i(820783),
  n = e.i(843476),
  o = Symbol("radix.slottable");

 function s(e) {
  return t.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === o
 }
 var a = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, i) => {
  var o, a;
  let l, c, u, d = (a = o = `Primitive.${i}`, (l = t.forwardRef((e, i) => {
    let {
     children: n,
     ...o
    } = e;
    if (t.isValidElement(n)) {
     var s;
     let e, a, l = (s = n, (a = (e = Object.getOwnPropertyDescriptor(s.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? s.ref : (a = (e = Object.getOwnPropertyDescriptor(s, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? s.props.ref : s.props.ref || s.ref),
      c = function(e, t) {
       let i = {
        ...t
       };
       for (let r in t) {
        let n = e[r],
         o = t[r];
        /^on[A-Z]/.test(r) ? n && o ? i[r] = (...e) => {
         let t = o(...e);
         return n(...e), t
        } : n && (i[r] = n) : "style" === r ? i[r] = {
         ...n,
         ...o
        } : "className" === r && (i[r] = [n, o].filter(Boolean).join(" "))
       }
       return {
        ...e,
        ...i
       }
      }(o, n.props);
     return n.type !== t.Fragment && (c.ref = i ? (0, r.composeRefs)(i, l) : l), t.cloneElement(n, c)
    }
    return t.Children.count(n) > 1 ? t.Children.only(null) : null
   })).displayName = `${a}.SlotClone`, c = l, (u = t.forwardRef((e, i) => {
    let {
     children: r,
     ...o
    } = e, a = t.Children.toArray(r), l = a.find(s);
    if (l) {
     let e = l.props.children,
      r = a.map(i => i !== l ? i : t.Children.count(e) > 1 ? t.Children.only(null) : t.isValidElement(e) ? e.props.children : null);
     return (0, n.jsx)(c, {
      ...o,
      ref: i,
      children: t.isValidElement(e) ? t.cloneElement(e, void 0, r) : null
     })
    }
    return (0, n.jsx)(c, {
     ...o,
     ref: i,
     children: r
    })
   })).displayName = `${o}.Slot`, u),
   h = t.forwardRef((e, t) => {
    let {
     asChild: r,
     ...o
    } = e;
    return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, n.jsx)(r ? d : i, {
     ...o,
     ref: t
    })
   });
  return h.displayName = `Primitive.${i}`, {
   ...e,
   [i]: h
  }
 }, {});

 function l(e, t) {
  e && i.flushSync(() => e.dispatchEvent(t))
 }
 e.s(["Primitive", () => a, "dispatchDiscreteCustomEvent", () => l], 248425)
}, 934620, e => {
 "use strict";
 var t = e.i(271645),
  i = globalThis?.document ? t.useLayoutEffect : () => {};
 e.s(["useLayoutEffect", () => i])
}, 610772, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(934620),
  r = t[" useId ".trim().toString()] || (() => void 0),
  n = 0;

 function o(e) {
  let [o, s] = t.useState(r());
  return (0, i.useLayoutEffect)(() => {
   e || s(e => e ?? String(n++))
  }, [e]), e || (o ? `radix-${o}` : "")
 }
 e.s(["useId", () => o])
}, 296626, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(820783),
  r = e.i(934620),
  n = e => {
   var n;
   let s, a, {
     present: l,
     children: c
    } = e,
    u = function(e) {
     var i, n;
     let [s, a] = t.useState(), l = t.useRef(null), c = t.useRef(e), u = t.useRef("none"), [d, h] = (i = e ? "mounted" : "unmounted", n = {
      mounted: {
       UNMOUNT: "unmounted",
       ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
       MOUNT: "mounted",
       ANIMATION_END: "unmounted"
      },
      unmounted: {
       MOUNT: "mounted"
      }
     }, t.useReducer((e, t) => n[e][t] ?? e, i));
     return t.useEffect(() => {
      let e = o(l.current);
      u.current = "mounted" === d ? e : "none"
     }, [d]), (0, r.useLayoutEffect)(() => {
      let t = l.current,
       i = c.current;
      if (i !== e) {
       let r = u.current,
        n = o(t);
       e ? h("MOUNT") : "none" === n || t?.display === "none" ? h("UNMOUNT") : i && r !== n ? h("ANIMATION_OUT") : h("UNMOUNT"), c.current = e
      }
     }, [e, h]), (0, r.useLayoutEffect)(() => {
      if (s) {
       let e, t = s.ownerDocument.defaultView ?? window,
        i = i => {
         let r = o(l.current).includes(CSS.escape(i.animationName));
         if (i.target === s && r && (h("ANIMATION_END"), !c.current)) {
          let i = s.style.animationFillMode;
          s.style.animationFillMode = "forwards", e = t.setTimeout(() => {
           "forwards" === s.style.animationFillMode && (s.style.animationFillMode = i)
          })
         }
        },
        r = e => {
         e.target === s && (u.current = o(l.current))
        };
       return s.addEventListener("animationstart", r), s.addEventListener("animationcancel", i), s.addEventListener("animationend", i), () => {
        t.clearTimeout(e), s.removeEventListener("animationstart", r), s.removeEventListener("animationcancel", i), s.removeEventListener("animationend", i)
       }
      }
      h("ANIMATION_END")
     }, [s, h]), {
      isPresent: ["mounted", "unmountSuspended"].includes(d),
      ref: t.useCallback(e => {
       l.current = e ? getComputedStyle(e) : null, a(e)
      }, [])
     }
    }(l),
    d = "function" == typeof c ? c({
     present: u.isPresent
    }) : t.Children.only(c),
    h = (0, i.useComposedRefs)(u.ref, (n = d, (a = (s = Object.getOwnPropertyDescriptor(n.props, "ref")?.get) && "isReactWarning" in s && s.isReactWarning) ? n.ref : (a = (s = Object.getOwnPropertyDescriptor(n, "ref")?.get) && "isReactWarning" in s && s.isReactWarning) ? n.props.ref : n.props.ref || n.ref));
   return "function" == typeof c || u.isPresent ? t.cloneElement(d, {
    ref: h
   }) : null
  };

 function o(e) {
  return e?.animationName || "none"
 }
 n.displayName = "Presence", e.s(["Presence", () => n])
}, 369340, e => {
 "use strict";
 var t = e.i(271645),
  i = e.i(934620);
 t[" useEffectEvent ".trim().toString()], t[" useInsertionEffect ".trim().toString()];
 var r = t[" useInsertionEffect ".trim().toString()] || i.useLayoutEffect;

 function n({
  prop: e,
  defaultProp: i,
  onChange: n = () => {},
  caller: o
 }) {
  let [s, a, l] = function({
   defaultProp: e,
   onChange: i
  }) {
   let [n, o] = t.useState(e), s = t.useRef(n), a = t.useRef(i);
   return r(() => {
    a.current = i
   }, [i]), t.useEffect(() => {
    s.current !== n && (a.current?.(n), s.current = n)
   }, [n, s]), [n, o, a]
  }({
   defaultProp: i,
   onChange: n
  }), c = void 0 !== e, u = c ? e : s;
  {
   let i = t.useRef(void 0 !== e);
   t.useEffect(() => {
    let e = i.current;
    if (e !== c) {
     let t = c ? "controlled" : "uncontrolled";
     console.warn(`${o} is changing from ${e?"controlled":"uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`)
    }
    i.current = c
   }, [c, o])
  }
  return [u, t.useCallback(t => {
   if (c) {
    let i = "function" == typeof t ? t(e) : t;
    i !== e && l.current?.(i)
   } else a(t)
  }, [c, e, a, l])]
 }
 Symbol("RADIX:SYNC_STATE"), e.s(["useControllableState", () => n], 369340)
}, 896535, e => {
 e.v(t => Promise.all(["static/chunks/f27e2b947d9d5e9b.js", "static/chunks/9323b54a105a0a2f.js", "static/chunks/41dea4d677fc3513.js", "static/chunks/99ccb0218b18d149.js", "static/chunks/f3edaa5e1a53abbf.js"].map(t => e.l(t))).then(() => t(651675)))
}, 718917, e => {
 e.v(e => Promise.resolve().then(() => e(811067)))
}, 627649, e => {
 e.v(t => Promise.all(["static/chunks/3565c7c04ef0af5f.js"].map(t => e.l(t))).then(() => t(712220)))
}, 604448, e => {
 e.v(t => Promise.all(["static/chunks/1ebcf947d283bc50.js"].map(t => e.l(t))).then(() => t(686041)))
}, 360650, e => {
 e.v(t => Promise.all(["static/chunks/a2807d9291e14a54.js"].map(t => e.l(t))).then(() => t(53923)))
}, 864564, e => {
 e.v(t => Promise.all(["static/chunks/281d929c71cb067c.js"].map(t => e.l(t))).then(() => t(624683)))
}, 378671, e => {
 e.v(t => Promise.all(["static/chunks/89d303494fab7999.js"].map(t => e.l(t))).then(() => t(279858)))
}, 364081, e => {
 e.v(t => Promise.all(["static/chunks/163598c3c645998b.js"].map(t => e.l(t))).then(() => t(232080)))
}, 104098, e => {
 e.v(t => Promise.all(["static/chunks/2b917472c59be69a.js"].map(t => e.l(t))).then(() => t(303276)))
}, 971106, e => {
 e.v(e => Promise.resolve().then(() => e(824124)))
}, 216332, e => {
 e.v(t => Promise.all(["static/chunks/9ed4c43acf08c4a5.js"].map(t => e.l(t))).then(() => t(403904)))
}, 369583, e => {
 e.v(t => Promise.all(["static/chunks/c83ba122fddd0d43.js"].map(t => e.l(t))).then(() => t(375939)))
}, 149122, e => {
 e.v(t => Promise.all(["static/chunks/c1936b8ade3af70c.js"].map(t => e.l(t))).then(() => t(925820)))
}, 473470, e => {
 e.v(t => Promise.all(["static/chunks/ac720e6b846ac8cf.js"].map(t => e.l(t))).then(() => t(974568)))
}, 128089, e => {
 e.v(t => Promise.all(["static/chunks/e4e962dd9cae56d8.js"].map(t => e.l(t))).then(() => t(94047)))
}, 414800, e => {
 e.v(t => Promise.all(["static/chunks/9ab353fcebd0ad39.js"].map(t => e.l(t))).then(() => t(254986)))
}]);