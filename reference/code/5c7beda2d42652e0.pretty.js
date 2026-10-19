(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 115910, e => {
 "use strict";
 var t = e.i(271645),
  n = e.i(843476);
 let r = (0, t.lazy)(() => e.A(896535));

 function a(e) {
  return (0, n.jsx)(t.Suspense, {
   fallback: null,
   children: (0, n.jsx)(r, {
    ...e
   })
  })
 }
 e.s(["default", () => a])
}, 302355, e => {
 "use strict";
 var t = e.i(247167),
  n = e.i(271645),
  r = e.i(618566);

 function a() {
  return "u" > typeof window
 }

 function i() {
  return "production"
 }

 function o() {
  return "development" === ((a() ? window.vam : i()) || "production")
 }

 function s(e) {
  return RegExp(`/${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(?=[/?#]|$)`)
 }

 function l(e) {
  return e.startsWith("http://") || e.startsWith("https://") || e.startsWith("/") ? e : `/${e}`
 }

 function u(e) {
  return (0, n.useEffect)(() => {
   var t;
   e.beforeSend && (null == (t = window.va) || t.call(window, "beforeSend", e.beforeSend))
  }, [e.beforeSend]), (0, n.useEffect)(() => {
   ! function(e = {
    debug: !0
   }, t) {
    var n;
    if (!a()) return;
    let {
     beforeSend: r,
     src: s,
     dataset: u
    } = function(e, t) {
     var n, r;
     let a = e;
     if (t) try {
      a = {
       ...null == (n = JSON.parse(t)) ? void 0 : n.analytics,
       ...e
      }
     } catch {}! function(e = "auto") {
      if ("auto" === e) {
       window.vam = i();
       return
      }
      window.vam = e
     }(a.mode);
     let s = {
      sdkn: "@vercel/analytics" + (a.framework ? `/${a.framework}` : ""),
      sdkv: "2.0.1"
     };
     return a.disableAutoTrack && (s.disableAutoTrack = "1"), a.viewEndpoint && (s.viewEndpoint = l(a.viewEndpoint)), a.eventEndpoint && (s.eventEndpoint = l(a.eventEndpoint)), a.sessionEndpoint && (s.sessionEndpoint = l(a.sessionEndpoint)), o() && !1 === a.debug && (s.debug = "false"), a.dsn && (s.dsn = a.dsn), a.endpoint ? s.endpoint = a.endpoint : a.basePath && (s.endpoint = l(`${a.basePath}/insights`)), {
      beforeSend: a.beforeSend,
      src: (r = a).scriptSrc ? l(r.scriptSrc) : o() ? "https://va.vercel-scripts.com/v1/script.debug.js" : r.basePath ? l(`${r.basePath}/insights/script.js`) : "/_vercel/insights/script.js",
      dataset: s
     }
    }(e, t);
    if (window.va || (window.va = function(...e) {
      window.vaq || (window.vaq = []), window.vaq.push(e)
     }), r && (null == (n = window.va) || n.call(window, "beforeSend", r)), document.head.querySelector(`script[src*="${s}"]`)) return;
    let c = document.createElement("script");
    for (let [e, t] of(c.src = s, Object.entries(u))) c.dataset[e] = t;
    c.defer = !0, c.onerror = () => {
     let e = o() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
     console.log(`[Vercel Web Analytics] Failed to load script from ${s}. ${e}`)
    }, document.head.appendChild(c)
   }({
    framework: e.framework || "react",
    basePath: e.basePath ?? function() {
     if (void 0 !== t.default && void 0 !== t.default.env) return t.default.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH
    }(),
    ...void 0 !== e.route && {
     disableAutoTrack: !0
    },
    ...e
   }, e.configString ?? function() {
    if (void 0 !== t.default && void 0 !== t.default.env) return t.default.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG
   }())
  }, []), (0, n.useEffect)(() => {
   e.route && e.path && function({
    route: e,
    path: t
   }) {
    var n;
    null == (n = window.va) || n.call(window, "pageview", {
     route: e,
     path: t
    })
   }({
    route: e.route,
    path: e.path
   })
  }, [e.route, e.path]), null
 }

 function c(e) {
  let a, i, o, {
   route: l,
   path: c
  } = (a = (0, r.useParams)(), i = (0, r.useSearchParams)(), o = (0, r.usePathname)(), a ? {
   route: function(e, t) {
    if (!e || !t) return e;
    let n = e;
    try {
     let e = Object.entries(t);
     for (let [t, r] of e)
      if (!Array.isArray(r)) {
       let e = s(r);
       e.test(n) && (n = n.replace(e, `/[${t}]`))
      } for (let [t, r] of e)
      if (Array.isArray(r)) {
       let e = s(r.join("/"));
       e.test(n) && (n = n.replace(e, `/[...${t}]`))
      } return n
    } catch {
     return e
    }
   }(o, Object.keys(a).length ? a : Object.fromEntries(i.entries())),
   path: o
  } : {
   route: null,
   path: o
  });
  return n.default.createElement(u, {
   path: c,
   route: l,
   ...e,
   basePath: function() {
    if (void 0 !== t.default && void 0 !== t.default.env) return t.default.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH
   }(),
   configString: function() {
    if (void 0 !== t.default && void 0 !== t.default.env) return '{"analytics":{"scriptSrc":"0467077565f390f1/script.js","viewEndpoint":"0467077565f390f1/view","eventEndpoint":"0467077565f390f1/event","sessionEndpoint":"0467077565f390f1/session"},"speedInsights":{"scriptSrc":"eb5c23683650113e/script.js","endpoint":"eb5c23683650113e/vitals"}}'
   }(),
   framework: "next"
  })
 }

 function d(e) {
  return n.default.createElement(n.Suspense, {
   fallback: null
  }, n.default.createElement(c, {
   ...e
  }))
 }
 e.s(["Analytics", () => d])
}, 928679, e => {
 "use strict";
 let t, n, r, a, i, o;
 var s = e.i(843476),
  l = e.i(271645),
  u = l.createContext(void 0),
  c = ({
   client: e,
   children: t
  }) => (l.useEffect(() => (e.mount(), () => {
   e.unmount()
  }), [e]), (0, s.jsx)(u.Provider, {
   value: e,
   children: t
  }));
 e.i(247167);
 var d = {
   setTimeout: (e, t) => setTimeout(e, t),
   clearTimeout: e => clearTimeout(e),
   setInterval: (e, t) => setInterval(e, t),
   clearInterval: e => clearInterval(e)
  },
  f = new class {
   #e = d;
   #t = !1;
   setTimeoutProvider(e) {
    this.#e = e
   }
   setTimeout(e, t) {
    return this.#e.setTimeout(e, t)
   }
   clearTimeout(e) {
    this.#e.clearTimeout(e)
   }
   setInterval(e, t) {
    return this.#e.setInterval(e, t)
   }
   clearInterval(e) {
    this.#e.clearInterval(e)
   }
  },
  p = "u" < typeof window || "Deno" in globalThis;

 function h() {}

 function m(e, t) {
  return "function" == typeof e ? e(t) : e
 }

 function g(e, t) {
  let {
   type: n = "all",
   exact: r,
   fetchStatus: a,
   predicate: i,
   queryKey: o,
   stale: s
  } = e;
  if (o) {
   if (r) {
    if (t.queryHash !== y(o, t.options)) return !1
   } else if (!w(t.queryKey, o)) return !1
  }
  if ("all" !== n) {
   let e = t.isActive();
   if ("active" === n && !e || "inactive" === n && e) return !1
  }
  return ("boolean" != typeof s || t.isStale() === s) && (!a || a === t.state.fetchStatus) && (!i || !!i(t))
 }

 function v(e, t) {
  let {
   exact: n,
   status: r,
   predicate: a,
   mutationKey: i
  } = e;
  if (i) {
   if (!t.options.mutationKey) return !1;
   if (n) {
    if (b(t.options.mutationKey) !== b(i)) return !1
   } else if (!w(t.options.mutationKey, i)) return !1
  }
  return (!r || t.state.status === r) && (!a || !!a(t))
 }

 function y(e, t) {
  return (t?.queryKeyHashFn || b)(e)
 }

 function b(e) {
  return JSON.stringify(e, (e, t) => j(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t)
 }

 function w(e, t) {
  return e === t || typeof e == typeof t && !!e && !!t && "object" == typeof e && "object" == typeof t && Object.keys(t).every(n => w(e[n], t[n]))
 }
 var x = Object.prototype.hasOwnProperty;

 function _(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length
 }

 function j(e) {
  if (!E(e)) return !1;
  let t = e.constructor;
  if (void 0 === t) return !0;
  let n = t.prototype;
  return !!E(n) && !!n.hasOwnProperty("isPrototypeOf") && Object.getPrototypeOf(e) === Object.prototype
 }

 function E(e) {
  return "[object Object]" === Object.prototype.toString.call(e)
 }

 function S(e, t, n = 0) {
  let r = [...e, t];
  return n && r.length > n ? r.slice(1) : r
 }

 function C(e, t, n = 0) {
  let r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r
 }
 var k = Symbol();

 function N(e, t) {
  return !e.queryFn && t?.initialPromise ? () => t.initialPromise : e.queryFn && e.queryFn !== k ? e.queryFn : () => Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`))
 }
 var P = (t = [], n = 0, r = e => {
   e()
  }, a = e => {
   e()
  }, i = function(e) {
   setTimeout(e, 0)
  }, {
   batch: e => {
    let o;
    n++;
    try {
     o = e()
    } finally {
     let e;
     --n || (e = t, t = [], e.length && i(() => {
      a(() => {
       e.forEach(e => {
        r(e)
       })
      })
     }))
    }
    return o
   },
   batchCalls: e => (...t) => {
    o(() => {
     e(...t)
    })
   },
   schedule: o = e => {
    n ? t.push(e) : i(() => {
     r(e)
    })
   },
   setNotifyFunction: e => {
    r = e
   },
   setBatchNotifyFunction: e => {
    a = e
   },
   setScheduler: e => {
    i = e
   }
  }),
  M = class {
   constructor() {
    this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
   }
   subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
     this.listeners.delete(e), this.onUnsubscribe()
    }
   }
   hasListeners() {
    return this.listeners.size > 0
   }
   onSubscribe() {}
   onUnsubscribe() {}
  },
  I = new class extends M {
   #n;
   #r;
   #a;
   constructor() {
    super(), this.#a = e => {
     if (!p && window.addEventListener) {
      let t = () => e();
      return window.addEventListener("visibilitychange", t, !1), () => {
       window.removeEventListener("visibilitychange", t)
      }
     }
    }
   }
   onSubscribe() {
    this.#r || this.setEventListener(this.#a)
   }
   onUnsubscribe() {
    this.hasListeners() || (this.#r?.(), this.#r = void 0)
   }
   setEventListener(e) {
    this.#a = e, this.#r?.(), this.#r = e(e => {
     "boolean" == typeof e ? this.setFocused(e) : this.onFocus()
    })
   }
   setFocused(e) {
    this.#n !== e && (this.#n = e, this.onFocus())
   }
   onFocus() {
    let e = this.isFocused();
    this.listeners.forEach(t => {
     t(e)
    })
   }
   isFocused() {
    return "boolean" == typeof this.#n ? this.#n : globalThis.document?.visibilityState !== "hidden"
   }
  },
  O = new class extends M {
   #i = !0;
   #r;
   #a;
   constructor() {
    super(), this.#a = e => {
     if (!p && window.addEventListener) {
      let t = () => e(!0),
       n = () => e(!1);
      return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
       window.removeEventListener("online", t), window.removeEventListener("offline", n)
      }
     }
    }
   }
   onSubscribe() {
    this.#r || this.setEventListener(this.#a)
   }
   onUnsubscribe() {
    this.hasListeners() || (this.#r?.(), this.#r = void 0)
   }
   setEventListener(e) {
    this.#a = e, this.#r?.(), this.#r = e(this.setOnline.bind(this))
   }
   setOnline(e) {
    this.#i !== e && (this.#i = e, this.listeners.forEach(t => {
     t(e)
    }))
   }
   isOnline() {
    return this.#i
   }
  };

 function R(e) {
  return Math.min(1e3 * 2 ** e, 3e4)
 }

 function A(e) {
  return (e ?? "online") !== "online" || O.isOnline()
 }
 var T = class extends Error {
  constructor(e) {
   super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent
  }
 };

 function D(e) {
  let t, n = !1,
   r = 0,
   a = function() {
    let e, t, n = new Promise((n, r) => {
     e = n, t = r
    });

    function r(e) {
     Object.assign(n, e), delete n.resolve, delete n.reject
    }
    return n.status = "pending", n.catch(() => {}), n.resolve = t => {
     r({
      status: "fulfilled",
      value: t
     }), e(t)
    }, n.reject = e => {
     r({
      status: "rejected",
      reason: e
     }), t(e)
    }, n
   }(),
   i = () => I.isFocused() && ("always" === e.networkMode || O.isOnline()) && e.canRun(),
   o = () => A(e.networkMode) && e.canRun(),
   s = e => {
    "pending" === a.status && (t?.(), a.resolve(e))
   },
   l = e => {
    "pending" === a.status && (t?.(), a.reject(e))
   },
   u = () => new Promise(n => {
    t = e => {
     ("pending" !== a.status || i()) && n(e)
    }, e.onPause?.()
   }).then(() => {
    t = void 0, "pending" === a.status && e.onContinue?.()
   }),
   c = () => {
    let t;
    if ("pending" !== a.status) return;
    let o = 0 === r ? e.initialPromise : void 0;
    try {
     t = o ?? e.fn()
    } catch (e) {
     t = Promise.reject(e)
    }
    Promise.resolve(t).then(s).catch(t => {
     if ("pending" !== a.status) return;
     let o = e.retry ?? 3 * !p,
      s = e.retryDelay ?? R,
      d = "function" == typeof s ? s(r, t) : s,
      h = !0 === o || "number" == typeof o && r < o || "function" == typeof o && o(r, t);
     n || !h ? l(t) : (r++, e.onFail?.(r, t), new Promise(e => {
      f.setTimeout(e, d)
     }).then(() => i() ? void 0 : u()).then(() => {
      n ? l(t) : c()
     }))
    })
   };
  return {
   promise: a,
   status: () => a.status,
   cancel: t => {
    if ("pending" === a.status) {
     let n = new T(t);
     l(n), e.onCancel?.(n)
    }
   },
   continue: () => (t?.(), a),
   cancelRetry: () => {
    n = !0
   },
   continueRetry: () => {
    n = !1
   },
   canStart: o,
   start: () => (o() ? c() : u().then(c), a)
  }
 }
 var L = class {
   #o;
   destroy() {
    this.clearGcTimeout()
   }
   scheduleGc() {
    var e;
    this.clearGcTimeout(), "number" == typeof(e = this.gcTime) && e >= 0 && e !== 1 / 0 && (this.#o = f.setTimeout(() => {
     this.optionalRemove()
    }, this.gcTime))
   }
   updateGcTime(e) {
    this.gcTime = Math.max(this.gcTime || 0, e ?? (p ? 1 / 0 : 3e5))
   }
   clearGcTimeout() {
    this.#o && (f.clearTimeout(this.#o), this.#o = void 0)
   }
  },
  F = class extends L {
   #s;
   #l;
   #u;
   #c;
   #d;
   #f;
   #p;
   constructor(e) {
    super(), this.#p = !1, this.#f = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#c = e.client, this.#u = this.#c.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#s = H(this.options), this.state = e.state ?? this.#s, this.scheduleGc()
   }
   get meta() {
    return this.options.meta
   }
   get promise() {
    return this.#d?.promise
   }
   setOptions(e) {
    if (this.options = {
      ...this.#f,
      ...e
     }, this.updateGcTime(this.options.gcTime), this.state && void 0 === this.state.data) {
     let e = H(this.options);
     void 0 !== e.data && (this.setState(q(e.data, e.dataUpdatedAt)), this.#s = e)
    }
   }
   optionalRemove() {
    this.observers.length || "idle" !== this.state.fetchStatus || this.#u.remove(this)
   }
   setData(e, t) {
    var n, r;
    let a = (n = this.state.data, "function" == typeof(r = this.options).structuralSharing ? r.structuralSharing(n, e) : !1 !== r.structuralSharing ? function e(t, n, r = 0) {
     if (t === n) return t;
     if (r > 500) return n;
     let a = _(t) && _(n);
     if (!a && !(j(t) && j(n))) return n;
     let i = (a ? t : Object.keys(t)).length,
      o = a ? n : Object.keys(n),
      s = o.length,
      l = a ? Array(s) : {},
      u = 0;
     for (let c = 0; c < s; c++) {
      let s = a ? c : o[c],
       d = t[s],
       f = n[s];
      if (d === f) {
       l[s] = d, (a ? c < i : x.call(t, s)) && u++;
       continue
      }
      if (null === d || null === f || "object" != typeof d || "object" != typeof f) {
       l[s] = f;
       continue
      }
      let p = e(d, f, r + 1);
      l[s] = p, p === d && u++
     }
     return i === s && u === i ? t : l
    }(n, e) : e);
    return this.#h({
     data: a,
     type: "success",
     dataUpdatedAt: t?.updatedAt,
     manual: t?.manual
    }), a
   }
   setState(e, t) {
    this.#h({
     type: "setState",
     state: e,
     setStateOptions: t
    })
   }
   cancel(e) {
    let t = this.#d?.promise;
    return this.#d?.cancel(e), t ? t.then(h).catch(h) : Promise.resolve()
   }
   destroy() {
    super.destroy(), this.cancel({
     silent: !0
    })
   }
   reset() {
    this.destroy(), this.setState(this.#s)
   }
   isActive() {
    return this.observers.some(e => {
     var t;
     return !1 !== (t = e.options.enabled, "function" == typeof t ? t(this) : t)
    })
   }
   isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === k || this.state.dataUpdateCount + this.state.errorUpdateCount === 0
   }
   isStatic() {
    return this.getObserversCount() > 0 && this.observers.some(e => "static" === m(e.options.staleTime, this))
   }
   isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(e => e.getCurrentResult().isStale) : void 0 === this.state.data || this.state.isInvalidated
   }
   isStaleByTime(e = 0) {
    return void 0 === this.state.data || "static" !== e && (!!this.state.isInvalidated || !Math.max(this.state.dataUpdatedAt + (e || 0) - Date.now(), 0))
   }
   onFocus() {
    let e = this.observers.find(e => e.shouldFetchOnWindowFocus());
    e?.refetch({
     cancelRefetch: !1
    }), this.#d?.continue()
   }
   onOnline() {
    let e = this.observers.find(e => e.shouldFetchOnReconnect());
    e?.refetch({
     cancelRefetch: !1
    }), this.#d?.continue()
   }
   addObserver(e) {
    this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#u.notify({
     type: "observerAdded",
     query: this,
     observer: e
    }))
   }
   removeObserver(e) {
    this.observers.includes(e) && (this.observers = this.observers.filter(t => t !== e), this.observers.length || (this.#d && (this.#p ? this.#d.cancel({
     revert: !0
    }) : this.#d.cancelRetry()), this.scheduleGc()), this.#u.notify({
     type: "observerRemoved",
     query: this,
     observer: e
    }))
   }
   getObserversCount() {
    return this.observers.length
   }
   invalidate() {
    this.state.isInvalidated || this.#h({
     type: "invalidate"
    })
   }
   async fetch(e, t) {
    let n;
    if ("idle" !== this.state.fetchStatus && this.#d?.status() !== "rejected") {
     if (void 0 !== this.state.data && t?.cancelRefetch) this.cancel({
      silent: !0
     });
     else if (this.#d) return this.#d.continueRetry(), this.#d.promise
    }
    if (e && this.setOptions(e), !this.options.queryFn) {
     let e = this.observers.find(e => e.options.queryFn);
     e && this.setOptions(e.options)
    }
    let r = new AbortController,
     a = e => {
      Object.defineProperty(e, "signal", {
       enumerable: !0,
       get: () => (this.#p = !0, r.signal)
      })
     },
     i = () => {
      let e, n = N(this.options, t),
       r = (a(e = {
        client: this.#c,
        queryKey: this.queryKey,
        meta: this.meta
       }), e);
      return (this.#p = !1, this.options.persister) ? this.options.persister(n, r, this) : n(r)
     },
     o = (a(n = {
      fetchOptions: t,
      options: this.options,
      queryKey: this.queryKey,
      client: this.#c,
      state: this.state,
      fetchFn: i
     }), n);
    this.options.behavior?.onFetch(o, this), this.#l = this.state, ("idle" === this.state.fetchStatus || this.state.fetchMeta !== o.fetchOptions?.meta) && this.#h({
     type: "fetch",
     meta: o.fetchOptions?.meta
    }), this.#d = D({
     initialPromise: t?.initialPromise,
     fn: o.fetchFn,
     onCancel: e => {
      e instanceof T && e.revert && this.setState({
       ...this.#l,
       fetchStatus: "idle"
      }), r.abort()
     },
     onFail: (e, t) => {
      this.#h({
       type: "failed",
       failureCount: e,
       error: t
      })
     },
     onPause: () => {
      this.#h({
       type: "pause"
      })
     },
     onContinue: () => {
      this.#h({
       type: "continue"
      })
     },
     retry: o.options.retry,
     retryDelay: o.options.retryDelay,
     networkMode: o.options.networkMode,
     canRun: () => !0
    });
    try {
     let e = await this.#d.start();
     if (void 0 === e) throw Error(`${this.queryHash} data is undefined`);
     return this.setData(e), this.#u.config.onSuccess?.(e, this), this.#u.config.onSettled?.(e, this.state.error, this), e
    } catch (e) {
     if (e instanceof T) {
      if (e.silent) return this.#d.promise;
      else if (e.revert) {
       if (void 0 === this.state.data) throw e;
       return this.state.data
      }
     }
     throw this.#h({
      type: "error",
      error: e
     }), this.#u.config.onError?.(e, this), this.#u.config.onSettled?.(this.state.data, e, this), e
    } finally {
     this.scheduleGc()
    }
   }
   #h(e) {
    let t = t => {
     switch (e.type) {
      case "failed":
       return {
        ...t, fetchFailureCount: e.failureCount, fetchFailureReason: e.error
       };
      case "pause":
       return {
        ...t, fetchStatus: "paused"
       };
      case "continue":
       return {
        ...t, fetchStatus: "fetching"
       };
      case "fetch":
       var n;
       return {
        ...t, ...(n = t.data, {
         fetchFailureCount: 0,
         fetchFailureReason: null,
         fetchStatus: A(this.options.networkMode) ? "fetching" : "paused",
         ...void 0 === n && {
          error: null,
          status: "pending"
         }
        }), fetchMeta: e.meta ?? null
       };
      case "success":
       let r = {
        ...t,
        ...q(e.data, e.dataUpdatedAt),
        dataUpdateCount: t.dataUpdateCount + 1,
        ...!e.manual && {
         fetchStatus: "idle",
         fetchFailureCount: 0,
         fetchFailureReason: null
        }
       };
       return this.#l = e.manual ? r : void 0, r;
      case "error":
       let a = e.error;
       return {
        ...t, error: a, errorUpdateCount: t.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: t.fetchFailureCount + 1, fetchFailureReason: a, fetchStatus: "idle", status: "error", isInvalidated: !0
       };
      case "invalidate":
       return {
        ...t, isInvalidated: !0
       };
      case "setState":
       return {
        ...t, ...e.state
       }
     }
    };
    this.state = t(this.state), P.batch(() => {
     this.observers.forEach(e => {
      e.onQueryUpdate()
     }), this.#u.notify({
      query: this,
      type: "updated",
      action: e
     })
    })
   }
  };

 function q(e, t) {
  return {
   data: e,
   dataUpdatedAt: t ?? Date.now(),
   error: null,
   isInvalidated: !1,
   status: "success"
  }
 }

 function H(e) {
  let t = "function" == typeof e.initialData ? e.initialData() : e.initialData,
   n = void 0 !== t,
   r = n ? "function" == typeof e.initialDataUpdatedAt ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
  return {
   data: t,
   dataUpdateCount: 0,
   dataUpdatedAt: n ? r ?? Date.now() : 0,
   error: null,
   errorUpdateCount: 0,
   errorUpdatedAt: 0,
   fetchFailureCount: 0,
   fetchFailureReason: null,
   fetchMeta: null,
   isInvalidated: !1,
   status: n ? "success" : "pending",
   fetchStatus: "idle"
  }
 }
 var z = class extends M {
   constructor(e = {}) {
    super(), this.config = e, this.#m = new Map
   }
   #m;
   build(e, t, n) {
    let r = t.queryKey,
     a = t.queryHash ?? y(r, t),
     i = this.get(a);
    return i || (i = new F({
     client: e,
     queryKey: r,
     queryHash: a,
     options: e.defaultQueryOptions(t),
     state: n,
     defaultOptions: e.getQueryDefaults(r)
    }), this.add(i)), i
   }
   add(e) {
    this.#m.has(e.queryHash) || (this.#m.set(e.queryHash, e), this.notify({
     type: "added",
     query: e
    }))
   }
   remove(e) {
    let t = this.#m.get(e.queryHash);
    t && (e.destroy(), t === e && this.#m.delete(e.queryHash), this.notify({
     type: "removed",
     query: e
    }))
   }
   clear() {
    P.batch(() => {
     this.getAll().forEach(e => {
      this.remove(e)
     })
    })
   }
   get(e) {
    return this.#m.get(e)
   }
   getAll() {
    return [...this.#m.values()]
   }
   find(e) {
    let t = {
     exact: !0,
     ...e
    };
    return this.getAll().find(e => g(t, e))
   }
   findAll(e = {}) {
    let t = this.getAll();
    return Object.keys(e).length > 0 ? t.filter(t => g(e, t)) : t
   }
   notify(e) {
    P.batch(() => {
     this.listeners.forEach(t => {
      t(e)
     })
    })
   }
   onFocus() {
    P.batch(() => {
     this.getAll().forEach(e => {
      e.onFocus()
     })
    })
   }
   onOnline() {
    P.batch(() => {
     this.getAll().forEach(e => {
      e.onOnline()
     })
    })
   }
  },
  B = class extends L {
   #c;
   #g;
   #v;
   #d;
   constructor(e) {
    super(), this.#c = e.client, this.mutationId = e.mutationId, this.#v = e.mutationCache, this.#g = [], this.state = e.state || {
     context: void 0,
     data: void 0,
     error: null,
     failureCount: 0,
     failureReason: null,
     isPaused: !1,
     status: "idle",
     variables: void 0,
     submittedAt: 0
    }, this.setOptions(e.options), this.scheduleGc()
   }
   setOptions(e) {
    this.options = e, this.updateGcTime(this.options.gcTime)
   }
   get meta() {
    return this.options.meta
   }
   addObserver(e) {
    this.#g.includes(e) || (this.#g.push(e), this.clearGcTimeout(), this.#v.notify({
     type: "observerAdded",
     mutation: this,
     observer: e
    }))
   }
   removeObserver(e) {
    this.#g = this.#g.filter(t => t !== e), this.scheduleGc(), this.#v.notify({
     type: "observerRemoved",
     mutation: this,
     observer: e
    })
   }
   optionalRemove() {
    this.#g.length || ("pending" === this.state.status ? this.scheduleGc() : this.#v.remove(this))
   }
   continue () {
    return this.#d?.continue() ?? this.execute(this.state.variables)
   }
   async execute(e) {
    let t = () => {
      this.#h({
       type: "continue"
      })
     },
     n = {
      client: this.#c,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
     };
    this.#d = D({
     fn: () => this.options.mutationFn ? this.options.mutationFn(e, n) : Promise.reject(Error("No mutationFn found")),
     onFail: (e, t) => {
      this.#h({
       type: "failed",
       failureCount: e,
       error: t
      })
     },
     onPause: () => {
      this.#h({
       type: "pause"
      })
     },
     onContinue: t,
     retry: this.options.retry ?? 0,
     retryDelay: this.options.retryDelay,
     networkMode: this.options.networkMode,
     canRun: () => this.#v.canRun(this)
    });
    let r = "pending" === this.state.status,
     a = !this.#d.canStart();
    try {
     if (r) t();
     else {
      this.#h({
       type: "pending",
       variables: e,
       isPaused: a
      }), await this.#v.config.onMutate?.(e, this, n);
      let t = await this.options.onMutate?.(e, n);
      t !== this.state.context && this.#h({
       type: "pending",
       context: t,
       variables: e,
       isPaused: a
      })
     }
     let i = await this.#d.start();
     return await this.#v.config.onSuccess?.(i, e, this.state.context, this, n), await this.options.onSuccess?.(i, e, this.state.context, n), await this.#v.config.onSettled?.(i, null, this.state.variables, this.state.context, this, n), await this.options.onSettled?.(i, null, e, this.state.context, n), this.#h({
      type: "success",
      data: i
     }), i
    } catch (t) {
     try {
      await this.#v.config.onError?.(t, e, this.state.context, this, n)
     } catch (e) {
      Promise.reject(e)
     }
     try {
      await this.options.onError?.(t, e, this.state.context, n)
     } catch (e) {
      Promise.reject(e)
     }
     try {
      await this.#v.config.onSettled?.(void 0, t, this.state.variables, this.state.context, this, n)
     } catch (e) {
      Promise.reject(e)
     }
     try {
      await this.options.onSettled?.(void 0, t, e, this.state.context, n)
     } catch (e) {
      Promise.reject(e)
     }
     throw this.#h({
      type: "error",
      error: t
     }), t
    } finally {
     this.#v.runNext(this)
    }
   }
   #h(e) {
    this.state = (t => {
     switch (e.type) {
      case "failed":
       return {
        ...t, failureCount: e.failureCount, failureReason: e.error
       };
      case "pause":
       return {
        ...t, isPaused: !0
       };
      case "continue":
       return {
        ...t, isPaused: !1
       };
      case "pending":
       return {
        ...t, context: e.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: e.isPaused, status: "pending", variables: e.variables, submittedAt: Date.now()
       };
      case "success":
       return {
        ...t, data: e.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1
       };
      case "error":
       return {
        ...t, data: void 0, error: e.error, failureCount: t.failureCount + 1, failureReason: e.error, isPaused: !1, status: "error"
       }
     }
    })(this.state), P.batch(() => {
     this.#g.forEach(t => {
      t.onMutationUpdate(e)
     }), this.#v.notify({
      mutation: this,
      type: "updated",
      action: e
     })
    })
   }
  },
  V = class extends M {
   constructor(e = {}) {
    super(), this.config = e, this.#y = new Set, this.#b = new Map, this.#w = 0
   }
   #y;
   #b;
   #w;
   build(e, t, n) {
    let r = new B({
     client: e,
     mutationCache: this,
     mutationId: ++this.#w,
     options: e.defaultMutationOptions(t),
     state: n
    });
    return this.add(r), r
   }
   add(e) {
    this.#y.add(e);
    let t = $(e);
    if ("string" == typeof t) {
     let n = this.#b.get(t);
     n ? n.push(e) : this.#b.set(t, [e])
    }
    this.notify({
     type: "added",
     mutation: e
    })
   }
   remove(e) {
    if (this.#y.delete(e)) {
     let t = $(e);
     if ("string" == typeof t) {
      let n = this.#b.get(t);
      if (n)
       if (n.length > 1) {
        let t = n.indexOf(e); - 1 !== t && n.splice(t, 1)
       } else n[0] === e && this.#b.delete(t)
     }
    }
    this.notify({
     type: "removed",
     mutation: e
    })
   }
   canRun(e) {
    let t = $(e);
    if ("string" != typeof t) return !0;
    {
     let n = this.#b.get(t),
      r = n?.find(e => "pending" === e.state.status);
     return !r || r === e
    }
   }
   runNext(e) {
    let t = $(e);
    if ("string" != typeof t) return Promise.resolve();
    {
     let n = this.#b.get(t)?.find(t => t !== e && t.state.isPaused);
     return n?.continue() ?? Promise.resolve()
    }
   }
   clear() {
    P.batch(() => {
     this.#y.forEach(e => {
      this.notify({
       type: "removed",
       mutation: e
      })
     }), this.#y.clear(), this.#b.clear()
    })
   }
   getAll() {
    return Array.from(this.#y)
   }
   find(e) {
    let t = {
     exact: !0,
     ...e
    };
    return this.getAll().find(e => v(t, e))
   }
   findAll(e = {}) {
    return this.getAll().filter(t => v(e, t))
   }
   notify(e) {
    P.batch(() => {
     this.listeners.forEach(t => {
      t(e)
     })
    })
   }
   resumePausedMutations() {
    let e = this.getAll().filter(e => e.state.isPaused);
    return P.batch(() => Promise.all(e.map(e => e.continue().catch(h))))
   }
  };

 function $(e) {
  return e.options.scope?.id
 }

 function K(e) {
  return {
   onFetch: (t, n) => {
    let r = t.options,
     a = t.fetchOptions?.meta?.fetchMore?.direction,
     i = t.state.data?.pages || [],
     o = t.state.data?.pageParams || [],
     s = {
      pages: [],
      pageParams: []
     },
     l = 0,
     u = async () => {
      let n = !1,
       u = N(t.options, t.fetchOptions),
       c = async (e, r, a) => {
        if (n) return Promise.reject();
        if (null == r && e.pages.length) return Promise.resolve(e);
        let i = (() => {
          var e, i;
          let o, s, l = {
           client: t.client,
           queryKey: t.queryKey,
           pageParam: r,
           direction: a ? "backward" : "forward",
           meta: t.options.meta
          };
          return e = () => t.signal, i = () => n = !0, s = !1, Object.defineProperty(l, "signal", {
           enumerable: !0,
           get: () => (o ??= e(), s || (s = !0, o.aborted ? i() : o.addEventListener("abort", i, {
            once: !0
           })), o)
          }), l
         })(),
         o = await u(i),
         {
          maxPages: s
         } = t.options,
         l = a ? C : S;
        return {
         pages: l(e.pages, o, s),
         pageParams: l(e.pageParams, r, s)
        }
       };
      if (a && i.length) {
       let e = "backward" === a,
        t = {
         pages: i,
         pageParams: o
        },
        n = (e ? function(e, {
         pages: t,
         pageParams: n
        }) {
         return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0
        } : U)(r, t);
       s = await c(t, n, e)
      } else {
       let t = e ?? i.length;
       do {
        let e = 0 === l ? o[0] ?? r.initialPageParam : U(r, s);
        if (l > 0 && null == e) break;
        s = await c(s, e), l++
       } while (l < t)
      }
      return s
     };
    t.options.persister ? t.fetchFn = () => t.options.persister?.(u, {
     client: t.client,
     queryKey: t.queryKey,
     meta: t.options.meta,
     signal: t.signal
    }, n) : t.fetchFn = u
   }
  }
 }

 function U(e, {
  pages: t,
  pageParams: n
 }) {
  let r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
 }
 var G = class {
  #x;
  #v;
  #f;
  #_;
  #j;
  #E;
  #S;
  #C;
  constructor(e = {}) {
   this.#x = e.queryCache || new z, this.#v = e.mutationCache || new V, this.#f = e.defaultOptions || {}, this.#_ = new Map, this.#j = new Map, this.#E = 0
  }
  mount() {
   this.#E++, 1 === this.#E && (this.#S = I.subscribe(async e => {
    e && (await this.resumePausedMutations(), this.#x.onFocus())
   }), this.#C = O.subscribe(async e => {
    e && (await this.resumePausedMutations(), this.#x.onOnline())
   }))
  }
  unmount() {
   this.#E--, 0 === this.#E && (this.#S?.(), this.#S = void 0, this.#C?.(), this.#C = void 0)
  }
  isFetching(e) {
   return this.#x.findAll({
    ...e,
    fetchStatus: "fetching"
   }).length
  }
  isMutating(e) {
   return this.#v.findAll({
    ...e,
    status: "pending"
   }).length
  }
  getQueryData(e) {
   let t = this.defaultQueryOptions({
    queryKey: e
   });
   return this.#x.get(t.queryHash)?.state.data
  }
  ensureQueryData(e) {
   let t = this.defaultQueryOptions(e),
    n = this.#x.build(this, t),
    r = n.state.data;
   return void 0 === r ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(m(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r))
  }
  getQueriesData(e) {
   return this.#x.findAll(e).map(({
    queryKey: e,
    state: t
   }) => [e, t.data])
  }
  setQueryData(e, t, n) {
   let r = this.defaultQueryOptions({
     queryKey: e
    }),
    a = this.#x.get(r.queryHash),
    i = a?.state.data,
    o = "function" == typeof t ? t(i) : t;
   if (void 0 !== o) return this.#x.build(this, r).setData(o, {
    ...n,
    manual: !0
   })
  }
  setQueriesData(e, t, n) {
   return P.batch(() => this.#x.findAll(e).map(({
    queryKey: e
   }) => [e, this.setQueryData(e, t, n)]))
  }
  getQueryState(e) {
   let t = this.defaultQueryOptions({
    queryKey: e
   });
   return this.#x.get(t.queryHash)?.state
  }
  removeQueries(e) {
   let t = this.#x;
   P.batch(() => {
    t.findAll(e).forEach(e => {
     t.remove(e)
    })
   })
  }
  resetQueries(e, t) {
   let n = this.#x;
   return P.batch(() => (n.findAll(e).forEach(e => {
    e.reset()
   }), this.refetchQueries({
    type: "active",
    ...e
   }, t)))
  }
  cancelQueries(e, t = {}) {
   let n = {
    revert: !0,
    ...t
   };
   return Promise.all(P.batch(() => this.#x.findAll(e).map(e => e.cancel(n)))).then(h).catch(h)
  }
  invalidateQueries(e, t = {}) {
   return P.batch(() => (this.#x.findAll(e).forEach(e => {
    e.invalidate()
   }), e?.refetchType === "none") ? Promise.resolve() : this.refetchQueries({
    ...e,
    type: e?.refetchType ?? e?.type ?? "active"
   }, t))
  }
  refetchQueries(e, t = {}) {
   let n = {
    ...t,
    cancelRefetch: t.cancelRefetch ?? !0
   };
   return Promise.all(P.batch(() => this.#x.findAll(e).filter(e => !e.isDisabled() && !e.isStatic()).map(e => {
    let t = e.fetch(void 0, n);
    return n.throwOnError || (t = t.catch(h)), "paused" === e.state.fetchStatus ? Promise.resolve() : t
   }))).then(h)
  }
  fetchQuery(e) {
   let t = this.defaultQueryOptions(e);
   void 0 === t.retry && (t.retry = !1);
   let n = this.#x.build(this, t);
   return n.isStaleByTime(m(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data)
  }
  prefetchQuery(e) {
   return this.fetchQuery(e).then(h).catch(h)
  }
  fetchInfiniteQuery(e) {
   return e.behavior = K(e.pages), this.fetchQuery(e)
  }
  prefetchInfiniteQuery(e) {
   return this.fetchInfiniteQuery(e).then(h).catch(h)
  }
  ensureInfiniteQueryData(e) {
   return e.behavior = K(e.pages), this.ensureQueryData(e)
  }
  resumePausedMutations() {
   return O.isOnline() ? this.#v.resumePausedMutations() : Promise.resolve()
  }
  getQueryCache() {
   return this.#x
  }
  getMutationCache() {
   return this.#v
  }
  getDefaultOptions() {
   return this.#f
  }
  setDefaultOptions(e) {
   this.#f = e
  }
  setQueryDefaults(e, t) {
   this.#_.set(b(e), {
    queryKey: e,
    defaultOptions: t
   })
  }
  getQueryDefaults(e) {
   let t = [...this.#_.values()],
    n = {};
   return t.forEach(t => {
    w(e, t.queryKey) && Object.assign(n, t.defaultOptions)
   }), n
  }
  setMutationDefaults(e, t) {
   this.#j.set(b(e), {
    mutationKey: e,
    defaultOptions: t
   })
  }
  getMutationDefaults(e) {
   let t = [...this.#j.values()],
    n = {};
   return t.forEach(t => {
    w(e, t.mutationKey) && Object.assign(n, t.defaultOptions)
   }), n
  }
  defaultQueryOptions(e) {
   if (e._defaulted) return e;
   let t = {
    ...this.#f.queries,
    ...this.getQueryDefaults(e.queryKey),
    ...e,
    _defaulted: !0
   };
   return t.queryHash || (t.queryHash = y(t.queryKey, t)), void 0 === t.refetchOnReconnect && (t.refetchOnReconnect = "always" !== t.networkMode), void 0 === t.throwOnError && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === k && (t.enabled = !1), t
  }
  defaultMutationOptions(e) {
   return e?._defaulted ? e : {
    ...this.#f.mutations,
    ...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
    ...e,
    _defaulted: !0
   }
  }
  clear() {
   this.#x.clear(), this.#v.clear()
  }
 };
 e.s(["default", 0, ({
  children: e
 }) => {
  let [t] = (0, l.useState)(() => new G);
  return (0, s.jsx)(c, {
   client: t,
   children: e
  })
 }], 928679)
}, 629690, e => {
 "use strict";
 let t = (0, e.i(164645).createSlice)({
   name: "globalProgressLoader",
   initialState: {
    progressStatus: ""
   },
   reducers: {
    setProgressStatus: (e, t) => {
     e.progressStatus = t.payload
    }
   }
  }),
  {
   setProgressStatus: n
  } = t.actions,
  r = t.reducer;
 e.s(["default", 0, r, "setProgressStatus", 0, n])
}, 308711, e => {
 "use strict";
 var t = e.i(843476),
  n = e.i(271645),
  r = e.i(155487),
  a = e.i(629690),
  i = e.i(371635),
  o = e.i(164645);

 function s({
  children: e
 }) {
  let s = (0, n.useRef)(null);
  return s.current || (s.current = (0, o.configureStore)({
   reducer: {
    globalProgressLoader: a.default,
    globalSettings: i.default
   }
  })), (0, t.jsx)(r.Provider, {
   store: s.current,
   children: e
  })
 }
 e.s(["default", () => s], 308711)
}, 846696, e => {
 "use strict";
 var t = e.i(271645),
  n = e.i(174080);
 let r = Array(12).fill(0),
  a = ({
   visible: e,
   className: n
  }) => t.default.createElement("div", {
   className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
   "data-visible": e
  }, t.default.createElement("div", {
   className: "sonner-spinner"
  }, r.map((e, n) => t.default.createElement("div", {
   className: "sonner-loading-bar",
   key: `spinner-bar-${n}`
  })))),
  i = t.default.createElement("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   viewBox: "0 0 20 20",
   fill: "currentColor",
   height: "20",
   width: "20"
  }, t.default.createElement("path", {
   fillRule: "evenodd",
   d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
   clipRule: "evenodd"
  })),
  o = t.default.createElement("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   viewBox: "0 0 24 24",
   fill: "currentColor",
   height: "20",
   width: "20"
  }, t.default.createElement("path", {
   fillRule: "evenodd",
   d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
   clipRule: "evenodd"
  })),
  s = t.default.createElement("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   viewBox: "0 0 20 20",
   fill: "currentColor",
   height: "20",
   width: "20"
  }, t.default.createElement("path", {
   fillRule: "evenodd",
   d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
   clipRule: "evenodd"
  })),
  l = t.default.createElement("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   viewBox: "0 0 20 20",
   fill: "currentColor",
   height: "20",
   width: "20"
  }, t.default.createElement("path", {
   fillRule: "evenodd",
   d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
   clipRule: "evenodd"
  })),
  u = t.default.createElement("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   width: "12",
   height: "12",
   viewBox: "0 0 24 24",
   fill: "none",
   stroke: "currentColor",
   strokeWidth: "1.5",
   strokeLinecap: "round",
   strokeLinejoin: "round"
  }, t.default.createElement("line", {
   x1: "18",
   y1: "6",
   x2: "6",
   y2: "18"
  }), t.default.createElement("line", {
   x1: "6",
   y1: "6",
   x2: "18",
   y2: "18"
  })),
  c = 1,
  d = new class {
   constructor() {
    this.subscribe = e => (this.subscribers.push(e), () => {
     let t = this.subscribers.indexOf(e);
     this.subscribers.splice(t, 1)
    }), this.publish = e => {
     this.subscribers.forEach(t => t(e))
    }, this.addToast = e => {
     this.publish(e), this.toasts = [...this.toasts, e]
    }, this.create = e => {
     var t;
     let {
      message: n,
      ...r
     } = e, a = "number" == typeof(null == e ? void 0 : e.id) || (null == (t = e.id) ? void 0 : t.length) > 0 ? e.id : c++, i = this.toasts.find(e => e.id === a), o = void 0 === e.dismissible || e.dismissible;
     return this.dismissedToasts.has(a) && this.dismissedToasts.delete(a), i ? this.toasts = this.toasts.map(t => t.id === a ? (this.publish({
      ...t,
      ...e,
      id: a,
      title: n
     }), {
      ...t,
      ...e,
      id: a,
      dismissible: o,
      title: n
     }) : t) : this.addToast({
      title: n,
      ...r,
      dismissible: o,
      id: a
     }), a
    }, this.dismiss = e => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach(t => t({
     id: e,
     dismiss: !0
    })))) : this.toasts.forEach(e => {
     this.subscribers.forEach(t => t({
      id: e.id,
      dismiss: !0
     }))
    }), e), this.message = (e, t) => this.create({
     ...t,
     message: e
    }), this.error = (e, t) => this.create({
     ...t,
     message: e,
     type: "error"
    }), this.success = (e, t) => this.create({
     ...t,
     type: "success",
     message: e
    }), this.info = (e, t) => this.create({
     ...t,
     type: "info",
     message: e
    }), this.warning = (e, t) => this.create({
     ...t,
     type: "warning",
     message: e
    }), this.loading = (e, t) => this.create({
     ...t,
     type: "loading",
     message: e
    }), this.promise = (e, n) => {
     let r, a;
     if (!n) return;
     void 0 !== n.loading && (a = this.create({
      ...n,
      promise: e,
      type: "loading",
      message: n.loading,
      description: "function" != typeof n.description ? n.description : void 0
     }));
     let i = Promise.resolve(e instanceof Function ? e() : e),
      o = void 0 !== a,
      s = i.then(async e => {
       if (r = ["resolve", e], t.default.isValidElement(e)) o = !1, this.create({
        id: a,
        type: "default",
        message: e
       });
       else if (f(e) && !e.ok) {
        o = !1;
        let r = "function" == typeof n.error ? await n.error(`HTTP error! status: ${e.status}`) : n.error,
         i = "function" == typeof n.description ? await n.description(`HTTP error! status: ${e.status}`) : n.description,
         s = "object" != typeof r || t.default.isValidElement(r) ? {
          message: r
         } : r;
        this.create({
         id: a,
         type: "error",
         description: i,
         ...s
        })
       } else if (e instanceof Error) {
        o = !1;
        let r = "function" == typeof n.error ? await n.error(e) : n.error,
         i = "function" == typeof n.description ? await n.description(e) : n.description,
         s = "object" != typeof r || t.default.isValidElement(r) ? {
          message: r
         } : r;
        this.create({
         id: a,
         type: "error",
         description: i,
         ...s
        })
       } else if (void 0 !== n.success) {
        o = !1;
        let r = "function" == typeof n.success ? await n.success(e) : n.success,
         i = "function" == typeof n.description ? await n.description(e) : n.description,
         s = "object" != typeof r || t.default.isValidElement(r) ? {
          message: r
         } : r;
        this.create({
         id: a,
         type: "success",
         description: i,
         ...s
        })
       }
      }).catch(async e => {
       if (r = ["reject", e], void 0 !== n.error) {
        o = !1;
        let r = "function" == typeof n.error ? await n.error(e) : n.error,
         i = "function" == typeof n.description ? await n.description(e) : n.description,
         s = "object" != typeof r || t.default.isValidElement(r) ? {
          message: r
         } : r;
        this.create({
         id: a,
         type: "error",
         description: i,
         ...s
        })
       }
      }).finally(() => {
       o && (this.dismiss(a), a = void 0), null == n.finally || n.finally.call(n)
      }),
      l = () => new Promise((e, t) => s.then(() => "reject" === r[0] ? t(r[1]) : e(r[1])).catch(t));
     return "string" != typeof a && "number" != typeof a ? {
      unwrap: l
     } : Object.assign(a, {
      unwrap: l
     })
    }, this.custom = (e, t) => {
     let n = (null == t ? void 0 : t.id) || c++;
     return this.create({
      jsx: e(n),
      id: n,
      ...t
     }), n
    }, this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = new Set
   }
  },
  f = e => e && "object" == typeof e && "ok" in e && "boolean" == typeof e.ok && "status" in e && "number" == typeof e.status,
  p = Object.assign((e, t) => {
   let n = (null == t ? void 0 : t.id) || c++;
   return d.addToast({
    title: e,
    ...t,
    id: n
   }), n
  }, {
   success: d.success,
   info: d.info,
   warning: d.warning,
   error: d.error,
   custom: d.custom,
   message: d.message,
   promise: d.promise,
   dismiss: d.dismiss,
   loading: d.loading
  }, {
   getHistory: () => d.toasts,
   getToasts: () => d.getActiveToasts()
  });

 function h(e) {
  return void 0 !== e.label
 }

 function m(...e) {
  return e.filter(Boolean).join(" ")
 }! function(e) {
  if (!e || "u" < typeof document) return;
  let t = document.head || document.getElementsByTagName("head")[0],
   n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e))
 }("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
 let g = e => {
  var n, r, c, d, f, p, g, v, y, b, w, x, _;
  let {
   invert: j,
   toast: E,
   unstyled: S,
   interacting: C,
   setHeights: k,
   visibleToasts: N,
   heights: P,
   index: M,
   toasts: I,
   expanded: O,
   removeToast: R,
   defaultRichColors: A,
   closeButton: T,
   style: D,
   cancelButtonStyle: L,
   actionButtonStyle: F,
   className: q = "",
   descriptionClassName: H = "",
   duration: z,
   position: B,
   gap: V,
   expandByDefault: $,
   classNames: K,
   icons: U,
   closeButtonAriaLabel: G = "Close toast"
  } = e, [W, Y] = t.default.useState(null), [Q, X] = t.default.useState(null), [J, Z] = t.default.useState(!1), [ee, et] = t.default.useState(!1), [en, er] = t.default.useState(!1), [ea, ei] = t.default.useState(!1), [eo, es] = t.default.useState(!1), [el, eu] = t.default.useState(0), [ec, ed] = t.default.useState(0), ef = t.default.useRef(E.duration || z || 4e3), ep = t.default.useRef(null), eh = t.default.useRef(null), em = 0 === M, eg = M + 1 <= N, ev = E.type, ey = !1 !== E.dismissible, eb = E.className || "", ew = E.descriptionClassName || "", ex = t.default.useMemo(() => P.findIndex(e => e.toastId === E.id) || 0, [P, E.id]), e_ = t.default.useMemo(() => {
   var e;
   return null != (e = E.closeButton) ? e : T
  }, [E.closeButton, T]), ej = t.default.useMemo(() => E.duration || z || 4e3, [E.duration, z]), eE = t.default.useRef(0), eS = t.default.useRef(0), eC = t.default.useRef(0), ek = t.default.useRef(null), [eN, eP] = B.split("-"), eM = t.default.useMemo(() => P.reduce((e, t, n) => n >= ex ? e : e + t.height, 0), [P, ex]), eI = (() => {
   let [e, n] = t.default.useState(document.hidden);
   return t.default.useEffect(() => {
    let e = () => {
     n(document.hidden)
    };
    return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e)
   }, []), e
  })(), eO = E.invert || j, eR = "loading" === ev;
  eS.current = t.default.useMemo(() => ex * V + eM, [ex, eM]), t.default.useEffect(() => {
   ef.current = ej
  }, [ej]), t.default.useEffect(() => {
   Z(!0)
  }, []), t.default.useEffect(() => {
   let e = eh.current;
   if (e) {
    let t = e.getBoundingClientRect().height;
    return ed(t), k(e => [{
     toastId: E.id,
     height: t,
     position: E.position
    }, ...e]), () => k(e => e.filter(e => e.toastId !== E.id))
   }
  }, [k, E.id]), t.default.useLayoutEffect(() => {
   if (!J) return;
   let e = eh.current,
    t = e.style.height;
   e.style.height = "auto";
   let n = e.getBoundingClientRect().height;
   e.style.height = t, ed(n), k(e => e.find(e => e.toastId === E.id) ? e.map(e => e.toastId === E.id ? {
    ...e,
    height: n
   } : e) : [{
    toastId: E.id,
    height: n,
    position: E.position
   }, ...e])
  }, [J, E.title, E.description, k, E.id, E.jsx, E.action, E.cancel]);
  let eA = t.default.useCallback(() => {
   et(!0), eu(eS.current), k(e => e.filter(e => e.toastId !== E.id)), setTimeout(() => {
    R(E)
   }, 200)
  }, [E, R, k, eS]);
  t.default.useEffect(() => {
   let e;
   if ((!E.promise || "loading" !== ev) && E.duration !== 1 / 0 && "loading" !== E.type) {
    if (O || C || eI) {
     if (eC.current < eE.current) {
      let e = new Date().getTime() - eE.current;
      ef.current = ef.current - e
     }
     eC.current = new Date().getTime()
    } else ef.current !== 1 / 0 && (eE.current = new Date().getTime(), e = setTimeout(() => {
     null == E.onAutoClose || E.onAutoClose.call(E, E), eA()
    }, ef.current));
    return () => clearTimeout(e)
   }
  }, [O, C, E, ev, eI, eA]), t.default.useEffect(() => {
   E.delete && (eA(), null == E.onDismiss || E.onDismiss.call(E, E))
  }, [eA, E.delete]);
  let eT = E.icon || (null == U ? void 0 : U[ev]) || (e => {
   switch (e) {
    case "success":
     return i;
    case "info":
     return s;
    case "warning":
     return o;
    case "error":
     return l;
    default:
     return null
   }
  })(ev);
  return t.default.createElement("li", {
   tabIndex: 0,
   ref: eh,
   className: m(q, eb, null == K ? void 0 : K.toast, null == E || null == (n = E.classNames) ? void 0 : n.toast, null == K ? void 0 : K.default, null == K ? void 0 : K[ev], null == E || null == (r = E.classNames) ? void 0 : r[ev]),
   "data-sonner-toast": "",
   "data-rich-colors": null != (b = E.richColors) ? b : A,
   "data-styled": !(E.jsx || E.unstyled || S),
   "data-mounted": J,
   "data-promise": !!E.promise,
   "data-swiped": eo,
   "data-removed": ee,
   "data-visible": eg,
   "data-y-position": eN,
   "data-x-position": eP,
   "data-index": M,
   "data-front": em,
   "data-swiping": en,
   "data-dismissible": ey,
   "data-type": ev,
   "data-invert": eO,
   "data-swipe-out": ea,
   "data-swipe-direction": Q,
   "data-expanded": !!(O || $ && J),
   "data-testid": E.testId,
   style: {
    "--index": M,
    "--toasts-before": M,
    "--z-index": I.length - M,
    "--offset": `${ee?el:eS.current}px`,
    "--initial-height": $ ? "auto" : `${ec}px`,
    ...D,
    ...E.style
   },
   onDragEnd: () => {
    er(!1), Y(null), ek.current = null
   },
   onPointerDown: e => {
    2 === e.button || eR || !ey || (ep.current = new Date, eu(eS.current), e.target.setPointerCapture(e.pointerId), "BUTTON" !== e.target.tagName && (er(!0), ek.current = {
     x: e.clientX,
     y: e.clientY
    }))
   },
   onPointerUp: () => {
    var e, t, n, r, a;
    if (ea || !ey) return;
    ek.current = null;
    let i = Number((null == (e = eh.current) ? void 0 : e.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0),
     o = Number((null == (t = eh.current) ? void 0 : t.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0),
     s = new Date().getTime() - (null == (n = ep.current) ? void 0 : n.getTime()),
     l = "x" === W ? i : o,
     u = Math.abs(l) / s;
    if (Math.abs(l) >= 45 || u > .11) {
     eu(eS.current), null == E.onDismiss || E.onDismiss.call(E, E), "x" === W ? X(i > 0 ? "right" : "left") : X(o > 0 ? "down" : "up"), eA(), ei(!0);
     return
    }
    null == (r = eh.current) || r.style.setProperty("--swipe-amount-x", "0px"), null == (a = eh.current) || a.style.setProperty("--swipe-amount-y", "0px"), es(!1), er(!1), Y(null)
   },
   onPointerMove: t => {
    var n, r, a, i;
    if (!ek.current || !ey || (null == (n = window.getSelection()) ? void 0 : n.toString().length) > 0) return;
    let o = t.clientY - ek.current.y,
     s = t.clientX - ek.current.x,
     l = null != (i = e.swipeDirections) ? i : function(e) {
      let [t, n] = e.split("-"), r = [];
      return t && r.push(t), n && r.push(n), r
     }(B);
    !W && (Math.abs(s) > 1 || Math.abs(o) > 1) && Y(Math.abs(s) > Math.abs(o) ? "x" : "y");
    let u = {
      x: 0,
      y: 0
     },
     c = e => 1 / (1.5 + Math.abs(e) / 20);
    if ("y" === W) {
     if (l.includes("top") || l.includes("bottom"))
      if (l.includes("top") && o < 0 || l.includes("bottom") && o > 0) u.y = o;
      else {
       let e = o * c(o);
       u.y = Math.abs(e) < Math.abs(o) ? e : o
      }
    } else if ("x" === W && (l.includes("left") || l.includes("right")))
     if (l.includes("left") && s < 0 || l.includes("right") && s > 0) u.x = s;
     else {
      let e = s * c(s);
      u.x = Math.abs(e) < Math.abs(s) ? e : s
     }(Math.abs(u.x) > 0 || Math.abs(u.y) > 0) && es(!0), null == (r = eh.current) || r.style.setProperty("--swipe-amount-x", `${u.x}px`), null == (a = eh.current) || a.style.setProperty("--swipe-amount-y", `${u.y}px`)
   }
  }, e_ && !E.jsx && "loading" !== ev ? t.default.createElement("button", {
   "aria-label": G,
   "data-disabled": eR,
   "data-close-button": !0,
   onClick: eR || !ey ? () => {} : () => {
    eA(), null == E.onDismiss || E.onDismiss.call(E, E)
   },
   className: m(null == K ? void 0 : K.closeButton, null == E || null == (c = E.classNames) ? void 0 : c.closeButton)
  }, null != (w = null == U ? void 0 : U.close) ? w : u) : null, (ev || E.icon || E.promise) && null !== E.icon && ((null == U ? void 0 : U[ev]) !== null || E.icon) ? t.default.createElement("div", {
   "data-icon": "",
   className: m(null == K ? void 0 : K.icon, null == E || null == (d = E.classNames) ? void 0 : d.icon)
  }, E.promise || "loading" === E.type && !E.icon ? E.icon || ((null == U ? void 0 : U.loading) ? t.default.createElement("div", {
   className: m(null == K ? void 0 : K.loader, null == E || null == (_ = E.classNames) ? void 0 : _.loader, "sonner-loader"),
   "data-visible": "loading" === ev
  }, U.loading) : t.default.createElement(a, {
   className: m(null == K ? void 0 : K.loader, null == E || null == (x = E.classNames) ? void 0 : x.loader),
   visible: "loading" === ev
  })) : null, "loading" !== E.type ? eT : null) : null, t.default.createElement("div", {
   "data-content": "",
   className: m(null == K ? void 0 : K.content, null == E || null == (f = E.classNames) ? void 0 : f.content)
  }, t.default.createElement("div", {
   "data-title": "",
   className: m(null == K ? void 0 : K.title, null == E || null == (p = E.classNames) ? void 0 : p.title)
  }, E.jsx ? E.jsx : "function" == typeof E.title ? E.title() : E.title), E.description ? t.default.createElement("div", {
   "data-description": "",
   className: m(H, ew, null == K ? void 0 : K.description, null == E || null == (g = E.classNames) ? void 0 : g.description)
  }, "function" == typeof E.description ? E.description() : E.description) : null), t.default.isValidElement(E.cancel) ? E.cancel : E.cancel && h(E.cancel) ? t.default.createElement("button", {
   "data-button": !0,
   "data-cancel": !0,
   style: E.cancelButtonStyle || L,
   onClick: e => {
    !h(E.cancel) || ey && (null == E.cancel.onClick || E.cancel.onClick.call(E.cancel, e), eA())
   },
   className: m(null == K ? void 0 : K.cancelButton, null == E || null == (v = E.classNames) ? void 0 : v.cancelButton)
  }, E.cancel.label) : null, t.default.isValidElement(E.action) ? E.action : E.action && h(E.action) ? t.default.createElement("button", {
   "data-button": !0,
   "data-action": !0,
   style: E.actionButtonStyle || F,
   onClick: e => {
    !h(E.action) || (null == E.action.onClick || E.action.onClick.call(E.action, e), e.defaultPrevented || eA())
   },
   className: m(null == K ? void 0 : K.actionButton, null == E || null == (y = E.classNames) ? void 0 : y.actionButton)
  }, E.action.label) : null)
 };

 function v() {
  if ("u" < typeof window || "u" < typeof document) return "ltr";
  let e = document.documentElement.getAttribute("dir");
  return "auto" !== e && e ? e : window.getComputedStyle(document.documentElement).direction
 }
 let y = t.default.forwardRef(function(e, r) {
  let {
   id: a,
   invert: i,
   position: o = "bottom-right",
   hotkey: s = ["altKey", "KeyT"],
   expand: l,
   closeButton: u,
   className: c,
   offset: f,
   mobileOffset: p,
   theme: h = "light",
   richColors: m,
   duration: y,
   style: b,
   visibleToasts: w = 3,
   toastOptions: x,
   dir: _ = v(),
   gap: j = 14,
   icons: E,
   containerAriaLabel: S = "Notifications"
  } = e, [C, k] = t.default.useState([]), N = t.default.useMemo(() => a ? C.filter(e => e.toasterId === a) : C.filter(e => !e.toasterId), [C, a]), P = t.default.useMemo(() => Array.from(new Set([o].concat(N.filter(e => e.position).map(e => e.position)))), [N, o]), [M, I] = t.default.useState([]), [O, R] = t.default.useState(!1), [A, T] = t.default.useState(!1), [D, L] = t.default.useState("system" !== h ? h : "u" > typeof window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = t.default.useRef(null), q = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""), H = t.default.useRef(null), z = t.default.useRef(!1), B = t.default.useCallback(e => {
   k(t => {
    var n;
    return (null == (n = t.find(t => t.id === e.id)) ? void 0 : n.delete) || d.dismiss(e.id), t.filter(({
     id: t
    }) => t !== e.id)
   })
  }, []);
  return t.default.useEffect(() => d.subscribe(e => {
   e.dismiss ? requestAnimationFrame(() => {
    k(t => t.map(t => t.id === e.id ? {
     ...t,
     delete: !0
    } : t))
   }) : setTimeout(() => {
    n.default.flushSync(() => {
     k(t => {
      let n = t.findIndex(t => t.id === e.id);
      return -1 !== n ? [...t.slice(0, n), {
       ...t[n],
       ...e
      }, ...t.slice(n + 1)] : [e, ...t]
     })
    })
   })
  }), [C]), t.default.useEffect(() => {
   if ("system" !== h) return void L(h);
   if ("system" === h && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), "u" < typeof window) return;
   let e = window.matchMedia("(prefers-color-scheme: dark)");
   try {
    e.addEventListener("change", ({
     matches: e
    }) => {
     e ? L("dark") : L("light")
    })
   } catch (t) {
    e.addListener(({
     matches: e
    }) => {
     try {
      e ? L("dark") : L("light")
     } catch (e) {
      console.error(e)
     }
    })
   }
  }, [h]), t.default.useEffect(() => {
   C.length <= 1 && R(!1)
  }, [C]), t.default.useEffect(() => {
   let e = e => {
    var t, n;
    s.every(t => e[t] || e.code === t) && (R(!0), null == (n = F.current) || n.focus()), "Escape" === e.code && (document.activeElement === F.current || (null == (t = F.current) ? void 0 : t.contains(document.activeElement))) && R(!1)
   };
   return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e)
  }, [s]), t.default.useEffect(() => {
   if (F.current) return () => {
    H.current && (H.current.focus({
     preventScroll: !0
    }), H.current = null, z.current = !1)
   }
  }, [F.current]), t.default.createElement("section", {
   ref: r,
   "aria-label": `${S} ${q}`,
   tabIndex: -1,
   "aria-live": "polite",
   "aria-relevant": "additions text",
   "aria-atomic": "false",
   suppressHydrationWarning: !0
  }, P.map((n, r) => {
   var a;
   let o, [s, d] = n.split("-");
   return N.length ? t.default.createElement("ol", {
    key: n,
    dir: "auto" === _ ? v() : _,
    tabIndex: -1,
    ref: F,
    className: c,
    "data-sonner-toaster": !0,
    "data-sonner-theme": D,
    "data-y-position": s,
    "data-x-position": d,
    style: {
     "--front-toast-height": `${(null==(a=M[0])?void 0:a.height)||0}px`,
     "--width": "356px",
     "--gap": `${j}px`,
     ...b,
     ...(o = {}, [f, p].forEach((e, t) => {
      let n = 1 === t,
       r = n ? "--mobile-offset" : "--offset",
       a = n ? "16px" : "24px";

      function i(e) {
       ["top", "right", "bottom", "left"].forEach(t => {
        o[`${r}-${t}`] = "number" == typeof e ? `${e}px` : e
       })
      }
      "number" == typeof e || "string" == typeof e ? i(e) : "object" == typeof e ? ["top", "right", "bottom", "left"].forEach(t => {
       void 0 === e[t] ? o[`${r}-${t}`] = a : o[`${r}-${t}`] = "number" == typeof e[t] ? `${e[t]}px` : e[t]
      }) : i(a)
     }), o)
    },
    onBlur: e => {
     z.current && !e.currentTarget.contains(e.relatedTarget) && (z.current = !1, H.current && (H.current.focus({
      preventScroll: !0
     }), H.current = null))
    },
    onFocus: e => {
     !(e.target instanceof HTMLElement && "false" === e.target.dataset.dismissible) && (z.current || (z.current = !0, H.current = e.relatedTarget))
    },
    onMouseEnter: () => R(!0),
    onMouseMove: () => R(!0),
    onMouseLeave: () => {
     A || R(!1)
    },
    onDragEnd: () => R(!1),
    onPointerDown: e => {
     e.target instanceof HTMLElement && "false" === e.target.dataset.dismissible || T(!0)
    },
    onPointerUp: () => T(!1)
   }, N.filter(e => !e.position && 0 === r || e.position === n).map((r, a) => {
    var o, s;
    return t.default.createElement(g, {
     key: r.id,
     icons: E,
     index: a,
     toast: r,
     defaultRichColors: m,
     duration: null != (o = null == x ? void 0 : x.duration) ? o : y,
     className: null == x ? void 0 : x.className,
     descriptionClassName: null == x ? void 0 : x.descriptionClassName,
     invert: i,
     visibleToasts: w,
     closeButton: null != (s = null == x ? void 0 : x.closeButton) ? s : u,
     interacting: A,
     position: n,
     style: null == x ? void 0 : x.style,
     unstyled: null == x ? void 0 : x.unstyled,
     classNames: null == x ? void 0 : x.classNames,
     cancelButtonStyle: null == x ? void 0 : x.cancelButtonStyle,
     actionButtonStyle: null == x ? void 0 : x.actionButtonStyle,
     closeButtonAriaLabel: null == x ? void 0 : x.closeButtonAriaLabel,
     removeToast: B,
     toasts: N.filter(e => e.position == r.position),
     heights: M.filter(e => e.position == r.position),
     setHeights: I,
     expandByDefault: l,
     gap: j,
     expanded: O,
     swipeDirections: e.swipeDirections
    })
   })) : null
  }))
 });
 e.s(["Toaster", () => y, "toast", () => p])
}, 17336, e => {
 "use strict";
 var t = e.i(271645),
  n = e.i(303756);

 function r() {
  return (0, t.useSyncExternalStore)((0, t.useCallback)(e => (n.o.add(e), () => n.o.delete(e)), []), () => n.a, () => "checking")
 }
 e.i(811067), e.i(75389), e.i(462576), e.i(523694);
 var a = e.i(618566),
  i = e.i(95187);
 let o = (0, i.createServerReference)("00354b23cef61c84e38c0ae24d43c4e5803a4782ce", i.callServer, void 0, i.findSourceMapURL, "disableDraftMode");
 var s = e.i(846696);

 function l() {
  let e, n = "checking" === (e = r()) ? null : "presentation-iframe" === e || "presentation-window" === e,
   i = r(),
   l = (0, a.useRouter)(),
   [u, c] = (0, t.useTransition)();
  return (0, t.useEffect)(() => {
   if (!1 === n) {
    let e = (0, s.toast)("Draft Mode Enabled", {
     description: "live" === i ? "Content is live, refreshing automatically" : "Refresh manually to see changes",
     duration: 1 / 0,
     action: {
      label: "Disable",
      onClick: async () => {
       await o(), c(() => {
        l.refresh()
       })
      }
     }
    });
    return () => {
     s.toast.dismiss(e)
    }
   }
  }, [i, l, n]), (0, t.useEffect)(() => {
   if (u) {
    let e = s.toast.loading("Disabling draft mode...");
    return () => {
     s.toast.dismiss(e)
    }
   }
  }, [u]), null
 }
 e.s(["default", () => l], 17336)
}, 887066, e => {
 "use strict";
 let t, n, r, a, i, o, s, l, u, c;
 var d, f, p = e.i(843476),
  h = e.i(271645),
  m = e.i(618566),
  g = e.i(95187);
 let v = (0, g.createServerReference)("00a5b234c54e2bd38ffdbcfff8bd7d926892667a40", g.callServer, void 0, g.findSourceMapURL, "completeIntro");
 var y = e.i(371635),
  b = e.i(756107),
  w = e.i(989970),
  x = e.i(255667),
  _ = e.i(522016),
  j = e.i(143443);

 function E() {
  return (0, p.jsx)(j.Button, {
   asChild: !0,
   className: "left-contain pointer-events-none fixed top-[calc(var(--h-announcement,0px)+var(--h-header)+8px)] z-50 opacity-0 focus:pointer-events-auto focus:opacity-100",
   children: (0, p.jsx)(_.default, {
    href: "#main",
    className: "text-green-6",
    children: "Skip to content"
   })
  })
 }
 var S = e.i(380064),
  C = e.i(683412);

 function k({
  data: e
 }) {
  let t = (0, m.usePathname)(),
   {
    display: n,
    messages: r
   } = e || {},
   a = (0, h.useRef)(null),
   i = "all" === n || "homepage" === n && "/" === t,
   [o, s] = (0, h.useState)(0),
   [l, u] = (0, h.useState)(e?.autoplay),
   c = (0, h.useCallback)(() => {
    let e = (a.current?.querySelector(".announcement-block.is-active")?.offsetHeight || 0) + (a.current?.querySelector(".announcement-dots")?.offsetHeight || 0);
    return {
     height: e,
     visibleHeight: i ? e : 0
    }
   }, [a, i]);
  return (0, h.useEffect)(() => {
   let e = a.current;
   if ((() => {
     let {
      visibleHeight: e
     } = c();
     document.documentElement.style.setProperty("--h-announcement", `${e}px`)
    })(), e) {
    let {
     height: t,
     visibleHeight: n
    } = c();
    e.style.marginTop = `${n-t}px`, setTimeout(() => {
     e.style.transition = "margin 0.4s, height 0.4s 0.2s"
    }, 400)
   }
  }, [i, c]), (0, h.useEffect)(() => {
   let {
    height: t,
    visibleHeight: n
   } = c();
   a.current.style.height = `${t}px`, setTimeout(() => {
    document.documentElement.style.setProperty("--h-announcement-dynamic", `${n}px`)
   }, 600);
   let r = e?.autoplayInterval || 8,
    u = l && i ? setInterval(() => {
     s(o < e?.messages.length - 1 ? o + 1 : 0)
    }, 1e3 * r) : null;
   return () => clearInterval(u)
  }, [o, l, i, e, c]), (0, p.jsxs)("div", {
   ref: a,
   className: (0, S.cn)("z-announcement relative bg-(--background) text-center text-(--color)", {
    hidden: !i
   }),
   style: {
    "--color": `${e?.textColor?.hex||"#FFFFFF"}`,
    "--background": `${e?.backgroundColor?.hex||"#000000"}`,
    "--emphasize": `${e?.emphasizeColor?.hex||"#D5FF00"}`
   },
   children: [r && (0, p.jsx)("div", {
    className: "announcement-blocks relative",
    children: r.map((e, t) => {
     if (e.content) return (0, p.jsx)("div", {
      className: (0, S.cn)("announcement-block t-l-3 pointer-events-none absolute top-0 left-0 block w-full py-2.5 opacity-0 delay-0 [transition:opacity_0.4s] [&_b]:text-(--emphasize) [&_strong]:text-(--emphasize)", {
       "is-active pointer-events-auto relative opacity-100 delay-400": o == t
      }),
      children: (0, p.jsx)(C.default, {
       blocks: e.content
      })
     }, `item-${t}`)
    })
   }), r && r.length > 1 && (0, p.jsx)("div", {
    className: "announcement-dots absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 px-2.5 pb-1.5",
    children: r.map((e, t) => (0, p.jsx)("button", {
     type: "button",
     "data-announcement-trigger": t,
     "aria-label": `Jump to the ${(0,S.formatNumberSuffix)(t+1)} message`,
     className: (0, S.cn)("relative size-2.5 cursor-pointer rounded-full border transition-all duration-200 after:absolute after:h-4.5 after:w-4.5 after:transform-[translate3d(-50%,-50%,0)]", {
      "bg-(--emphasize) text-(--emphasize)": o == t
     }),
     onClick: () => {
      s(t), u(!1)
     }
    }, `item-${t}`))
   })]
  })
 }
 var N = e.i(394307),
  P = e.i(629690),
  M = e.i(994814),
  I = e.i(653145),
  O = e.i(965638),
  R = e.i(114674),
  A = e.i(629447);

 function T({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
 }) {
  return (0, p.jsx)("div", {
   "data-orientation": "horizontal",
   role: n ? "none" : "separator",
   "data-slot": "separator",
   className: (0, S.cn)("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch", e),
   ...r
  })
 }
 var D = e.i(700146);

 function L({
  className: e,
  ...t
 }) {
  return (0, p.jsx)("div", {
   "data-slot": "field-group",
   className: (0, S.cn)("group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4", e),
   ...t
  })
 }
 let F = (0, e.i(225913).cva)("data-[invalid=true]:text-destructive gap-2 group/field flex w-full", {
  variants: {
   orientation: {
    vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
    horizontal: "flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    responsive: "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
   }
  },
  defaultVariants: {
   orientation: "vertical"
  }
 });

 function q({
  className: e,
  orientation: t = "vertical",
  ...n
 }) {
  return (0, p.jsx)("div", {
   role: "group",
   "data-slot": "field",
   "data-orientation": t,
   className: (0, S.cn)(F({
    orientation: t
   }), e),
   ...n
  })
 }

 function H({
  className: e,
  ...t
 }) {
  return (0, p.jsx)("div", {
   "data-slot": "field-content",
   className: (0, S.cn)("group/field-content flex flex-1 flex-col gap-2 leading-snug", e),
   ...t
  })
 }

 function z({
  className: e,
  ...t
 }) {
  return (0, p.jsx)(A.Label, {
   "data-slot": "field-label",
   className: (0, S.cn)("has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-2.5", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", e),
   ...t
  })
 }

 function B({
  className: e,
  ...t
 }) {
  return (0, p.jsx)("p", {
   "data-slot": "field-description",
   className: (0, S.cn)("text-muted-foreground text-left text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance [[data-variant=legend]+&]:-mt-1.5", "last:mt-0 nth-last-2:-mt-1", "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", e),
   ...t
  })
 }

 function V({
  fieldState: e = {},
  isFocused: t,
  isShowErrorOnFocus: n = !1
 }) {
  let r = e.invalid && !!e.error,
   [a, i] = (0, h.useState)(!1);
  return n ? (0, p.jsxs)(D.Tooltip, {
   open: !!r && t || a,
   children: [(0, p.jsx)(D.TooltipTrigger, {
    className: "absolute top-1/2 right-2 -translate-y-1/2",
    asChild: !0,
    children: r && (0, p.jsx)(R.HiOutlineInformationCircle, {
     className: "text-error h-5 w-5",
     onMouseEnter: () => i(!0),
     onMouseLeave: () => i(!1)
    })
   }), (0, p.jsx)(D.TooltipContent, {
    className: "pointer-events-none",
    align: "end",
    sideOffset: -2,
    children: (0, p.jsx)("p", {
     children: e.error?.message
    })
   })]
  }) : (0, p.jsxs)(D.Tooltip, {
   open: a,
   children: [(0, p.jsx)(D.TooltipTrigger, {
    className: "absolute top-1/2 right-2 -translate-y-1/2",
    asChild: !0,
    children: r && (0, p.jsx)(R.HiOutlineInformationCircle, {
     className: "text-error h-5 w-5",
     onMouseEnter: () => i(!0),
     onMouseLeave: () => i(!1),
     onClick: () => i(e => !e)
    })
   }), (0, p.jsx)(D.TooltipContent, {
    className: "pointer-events-none",
    align: "end",
    sideOffset: -2,
    children: (0, p.jsx)("p", {
     children: e.error?.message
    })
   })]
  })
 }
 var $ = e.i(706352),
  K = e.i(174080);

 function U(e, [t, n]) {
  return Math.min(n, Math.max(t, e))
 }
 var G = e.i(981140),
  W = e.i(75830),
  Y = e.i(820783),
  Q = e.i(30030),
  X = e.i(586318),
  J = e.i(726330),
  Z = 0;

 function ee() {
  h.useEffect(() => {
   let e = document.querySelectorAll("[data-radix-focus-guard]");
   return document.body.insertAdjacentElement("afterbegin", e[0] ?? et()), document.body.insertAdjacentElement("beforeend", e[1] ?? et()), Z++, () => {
    1 === Z && document.querySelectorAll("[data-radix-focus-guard]").forEach(e => e.remove()), Z--
   }
  }, [])
 }

 function et() {
  let e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
 }
 var en = e.i(248425),
  er = e.i(30207),
  ea = "focusScope.autoFocusOnMount",
  ei = "focusScope.autoFocusOnUnmount",
  eo = {
   bubbles: !1,
   cancelable: !0
  },
  es = h.forwardRef((e, t) => {
   let {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: a,
    onUnmountAutoFocus: i,
    ...o
   } = e, [s, l] = h.useState(null), u = (0, er.useCallbackRef)(a), c = (0, er.useCallbackRef)(i), d = h.useRef(null), f = (0, Y.useComposedRefs)(t, e => l(e)), m = h.useRef({
    paused: !1,
    pause() {
     this.paused = !0
    },
    resume() {
     this.paused = !1
    }
   }).current;
   h.useEffect(() => {
    if (r) {
     let e = function(e) {
       if (m.paused || !s) return;
       let t = e.target;
       s.contains(t) ? d.current = t : ec(d.current, {
        select: !0
       })
      },
      t = function(e) {
       if (m.paused || !s) return;
       let t = e.relatedTarget;
       null !== t && (s.contains(t) || ec(d.current, {
        select: !0
       }))
      };
     document.addEventListener("focusin", e), document.addEventListener("focusout", t);
     let n = new MutationObserver(function(e) {
      if (document.activeElement === document.body)
       for (let t of e) t.removedNodes.length > 0 && ec(s)
     });
     return s && n.observe(s, {
      childList: !0,
      subtree: !0
     }), () => {
      document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), n.disconnect()
     }
    }
   }, [r, s, m.paused]), h.useEffect(() => {
    if (s) {
     ed.add(m);
     let e = document.activeElement;
     if (!s.contains(e)) {
      let t = new CustomEvent(ea, eo);
      s.addEventListener(ea, u), s.dispatchEvent(t), t.defaultPrevented || (function(e, {
       select: t = !1
      } = {}) {
       let n = document.activeElement;
       for (let r of e)
        if (ec(r, {
          select: t
         }), document.activeElement !== n) return
      }(el(s).filter(e => "A" !== e.tagName), {
       select: !0
      }), document.activeElement === e && ec(s))
     }
     return () => {
      s.removeEventListener(ea, u), setTimeout(() => {
       let t = new CustomEvent(ei, eo);
       s.addEventListener(ei, c), s.dispatchEvent(t), t.defaultPrevented || ec(e ?? document.body, {
        select: !0
       }), s.removeEventListener(ei, c), ed.remove(m)
      }, 0)
     }
    }
   }, [s, u, c, m]);
   let g = h.useCallback(e => {
    if (!n && !r || m.paused) return;
    let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
     a = document.activeElement;
    if (t && a) {
     var i;
     let t, r = e.currentTarget,
      [o, s] = [eu(t = el(i = r), i), eu(t.reverse(), i)];
     o && s ? e.shiftKey || a !== s ? e.shiftKey && a === o && (e.preventDefault(), n && ec(s, {
      select: !0
     })) : (e.preventDefault(), n && ec(o, {
      select: !0
     })) : a === r && e.preventDefault()
    }
   }, [n, r, m.paused]);
   return (0, p.jsx)(en.Primitive.div, {
    tabIndex: -1,
    ...o,
    ref: f,
    onKeyDown: g
   })
  });

 function el(e) {
  let t = [],
   n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: e => {
     let t = "INPUT" === e.tagName && "hidden" === e.type;
     return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    }
   });
  for (; n.nextNode();) t.push(n.currentNode);
  return t
 }

 function eu(e, t) {
  for (let n of e)
   if (! function(e, {
     upTo: t
    }) {
     if ("hidden" === getComputedStyle(e).visibility) return !0;
     for (; e && (void 0 === t || e !== t);) {
      if ("none" === getComputedStyle(e).display) return !0;
      e = e.parentElement
     }
     return !1
    }(n, {
     upTo: t
    })) return n
 }

 function ec(e, {
  select: t = !1
 } = {}) {
  if (e && e.focus) {
   var n;
   let r = document.activeElement;
   e.focus({
    preventScroll: !0
   }), e !== r && (n = e) instanceof HTMLInputElement && "select" in n && t && e.select()
  }
 }
 es.displayName = "FocusScope";
 var ed = (s = [], {
  add(e) {
   let t = s[0];
   e !== t && t?.pause(), (s = ef(s, e)).unshift(e)
  },
  remove(e) {
   s = ef(s, e), s[0]?.resume()
  }
 });

 function ef(e, t) {
  let n = [...e],
   r = n.indexOf(t);
  return -1 !== r && n.splice(r, 1), n
 }
 var ep = e.i(610772),
  eh = e.i(853660),
  em = e.i(774606),
  eg = Symbol("radix.slottable");

 function ev(e) {
  return h.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === eg
 }
 var ey = e.i(369340),
  eb = e.i(934620),
  ew = e.i(999682),
  ex = e.i(959411),
  e_ = new WeakMap,
  ej = new WeakMap,
  eE = {},
  eS = 0,
  eC = function(e) {
   return e && (e.host || eC(e.parentNode))
  },
  ek = function(e, t, n, r) {
   var a = (Array.isArray(e) ? e : [e]).map(function(e) {
    if (t.contains(e)) return e;
    var n = eC(e);
    return n && t.contains(n) ? n : (console.error("aria-hidden", e, "in not contained inside", t, ". Doing nothing"), null)
   }).filter(function(e) {
    return !!e
   });
   eE[n] || (eE[n] = new WeakMap);
   var i = eE[n],
    o = [],
    s = new Set,
    l = new Set(a),
    u = function(e) {
     !e || s.has(e) || (s.add(e), u(e.parentNode))
    };
   a.forEach(u);
   var c = function(e) {
    !e || l.has(e) || Array.prototype.forEach.call(e.children, function(e) {
     if (s.has(e)) c(e);
     else try {
      var t = e.getAttribute(r),
       a = null !== t && "false" !== t,
       l = (e_.get(e) || 0) + 1,
       u = (i.get(e) || 0) + 1;
      e_.set(e, l), i.set(e, u), o.push(e), 1 === l && a && ej.set(e, !0), 1 === u && e.setAttribute(n, "true"), a || e.setAttribute(r, "true")
     } catch (t) {
      console.error("aria-hidden: cannot operate on ", e, t)
     }
    })
   };
   return c(t), s.clear(), eS++,
    function() {
     o.forEach(function(e) {
      var t = e_.get(e) - 1,
       a = i.get(e) - 1;
      e_.set(e, t), i.set(e, a), t || (ej.has(e) || e.removeAttribute(r), ej.delete(e)), a || e.removeAttribute(n)
     }), --eS || (e_ = new WeakMap, e_ = new WeakMap, ej = new WeakMap, eE = {})
    }
  },
  eN = function(e, t, n) {
   void 0 === n && (n = "data-aria-hidden");
   var r = Array.from(Array.isArray(e) ? e : [e]),
    a = t || ("u" < typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
   return a ? (r.push.apply(r, Array.from(a.querySelectorAll("[aria-live], script"))), ek(r, a, n, "aria-hidden")) : function() {
    return null
   }
  },
  eP = e.i(290571),
  eM = "right-scroll-bar-position",
  eI = "width-before-scroll-bar",
  eO = e.i(232286),
  eR = (0, e.i(386252).createSidecarMedium)(),
  eA = function() {},
  eT = h.forwardRef(function(e, t) {
   var n = h.useRef(null),
    r = h.useState({
     onScrollCapture: eA,
     onWheelCapture: eA,
     onTouchMoveCapture: eA
    }),
    a = r[0],
    i = r[1],
    o = e.forwardProps,
    s = e.children,
    l = e.className,
    u = e.removeScrollBar,
    c = e.enabled,
    d = e.shards,
    f = e.sideCar,
    p = e.noRelative,
    m = e.noIsolation,
    g = e.inert,
    v = e.allowPinchZoom,
    y = e.as,
    b = e.gapMode,
    w = (0, eP.__rest)(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
    x = (0, eO.useMergeRefs)([n, t]),
    _ = (0, eP.__assign)((0, eP.__assign)({}, w), a);
   return h.createElement(h.Fragment, null, c && h.createElement(f, {
    sideCar: eR,
    removeScrollBar: u,
    shards: d,
    noRelative: p,
    noIsolation: m,
    inert: g,
    setCallbacks: i,
    allowPinchZoom: !!v,
    lockRef: n,
    gapMode: b
   }), o ? h.cloneElement(h.Children.only(s), (0, eP.__assign)((0, eP.__assign)({}, _), {
    ref: x
   })) : h.createElement(void 0 === y ? "div" : y, (0, eP.__assign)({}, _, {
    className: l,
    ref: x
   }), s))
  });
 eT.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
 }, eT.classNames = {
  fullWidth: eI,
  zeroRight: eM
 };
 var eD = function(e) {
  var t = e.sideCar,
   n = (0, eP.__rest)(e, ["sideCar"]);
  if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw Error("Sidecar medium not found");
  return h.createElement(r, (0, eP.__assign)({}, n))
 };
 eD.isSideCarExport = !0;
 var eL = function() {
   var e = 0,
    t = null;
   return {
    add: function(n) {
     if (0 == e && (t = function() {
       if (!document) return null;
       var e = document.createElement("style");
       e.type = "text/css";
       var t = f || ("u" > typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
       return t && e.setAttribute("nonce", t), e
      }())) {
      var r, a;
      (r = t).styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n)), a = t, (document.head || document.getElementsByTagName("head")[0]).appendChild(a)
     }
     e++
    },
    remove: function() {
     --e || !t || (t.parentNode && t.parentNode.removeChild(t), t = null)
    }
   }
  },
  eF = function() {
   var e = eL();
   return function(t, n) {
    h.useEffect(function() {
     return e.add(t),
      function() {
       e.remove()
      }
    }, [t && n])
   }
  },
  eq = function() {
   var e = eF();
   return function(t) {
    return e(t.styles, t.dynamic), null
   }
  },
  eH = {
   left: 0,
   top: 0,
   right: 0,
   gap: 0
  },
  ez = function(e) {
   return parseInt(e || "", 10) || 0
  },
  eB = function(e) {
   var t = window.getComputedStyle(document.body),
    n = t["padding" === e ? "paddingLeft" : "marginLeft"],
    r = t["padding" === e ? "paddingTop" : "marginTop"],
    a = t["padding" === e ? "paddingRight" : "marginRight"];
   return [ez(n), ez(r), ez(a)]
  },
  eV = function(e) {
   if (void 0 === e && (e = "margin"), "u" < typeof window) return eH;
   var t = eB(e),
    n = document.documentElement.clientWidth,
    r = window.innerWidth;
   return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
   }
  },
  e$ = eq(),
  eK = "data-scroll-locked",
  eU = function(e, t, n, r) {
   var a = e.left,
    i = e.top,
    o = e.right,
    s = e.gap;
   return void 0 === n && (n = "margin"), "\n  .".concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(s, "px ").concat(r, ";\n  }\n  body[").concat(eK, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([t && "position: relative ".concat(r, ";"), "margin" === n && "\n    padding-left: ".concat(a, "px;\n    padding-top: ").concat(i, "px;\n    padding-right: ").concat(o, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(s, "px ").concat(r, ";\n    "), "padding" === n && "padding-right: ".concat(s, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(eM, " {\n    right: ").concat(s, "px ").concat(r, ";\n  }\n  \n  .").concat(eI, " {\n    margin-right: ").concat(s, "px ").concat(r, ";\n  }\n  \n  .").concat(eM, " .").concat(eM, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(eI, " .").concat(eI, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(eK, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(s, "px;\n  }\n")
  },
  eG = function() {
   var e = parseInt(document.body.getAttribute(eK) || "0", 10);
   return isFinite(e) ? e : 0
  },
  eW = function() {
   h.useEffect(function() {
    return document.body.setAttribute(eK, (eG() + 1).toString()),
     function() {
      var e = eG() - 1;
      e <= 0 ? document.body.removeAttribute(eK) : document.body.setAttribute(eK, e.toString())
     }
   }, [])
  },
  eY = function(e) {
   var t = e.noRelative,
    n = e.noImportant,
    r = e.gapMode,
    a = void 0 === r ? "margin" : r;
   eW();
   var i = h.useMemo(function() {
    return eV(a)
   }, [a]);
   return h.createElement(e$, {
    styles: eU(i, !t, a, n ? "" : "!important")
   })
  },
  eQ = !1;
 if ("u" > typeof window) try {
  var eX = Object.defineProperty({}, "passive", {
   get: function() {
    return eQ = !0, !0
   }
  });
  window.addEventListener("test", eX, eX), window.removeEventListener("test", eX, eX)
 } catch (e) {
  eQ = !1
 }
 var eJ = !!eQ && {
   passive: !1
  },
  eZ = function(e, t) {
   if (!(e instanceof Element)) return !1;
   var n = window.getComputedStyle(e);
   return "hidden" !== n[t] && (n.overflowY !== n.overflowX || "TEXTAREA" === e.tagName || "visible" !== n[t])
  },
  e0 = function(e, t) {
   var n = t.ownerDocument,
    r = t;
   do {
    if ("u" > typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), e1(e, r)) {
     var a = e2(e, r);
     if (a[1] > a[2]) return !0
    }
    r = r.parentNode
   } while (r && r !== n.body) return !1
  },
  e1 = function(e, t) {
   return "v" === e ? eZ(t, "overflowY") : eZ(t, "overflowX")
  },
  e2 = function(e, t) {
   return "v" === e ? [t.scrollTop, t.scrollHeight, t.clientHeight] : [t.scrollLeft, t.scrollWidth, t.clientWidth]
  },
  e4 = function(e, t, n, r, a) {
   var i, o = (i = window.getComputedStyle(t).direction, "h" === e && "rtl" === i ? -1 : 1),
    s = o * r,
    l = n.target,
    u = t.contains(l),
    c = !1,
    d = s > 0,
    f = 0,
    p = 0;
   do {
    if (!l) break;
    var h = e2(e, l),
     m = h[0],
     g = h[1] - h[2] - o * m;
    (m || g) && e1(e, l) && (f += g, p += m);
    var v = l.parentNode;
    l = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v
   } while (!u && l !== document.body || u && (t.contains(l) || t === l)) return d && (a && 1 > Math.abs(f) || !a && s > f) ? c = !0 : !d && (a && 1 > Math.abs(p) || !a && -s > p) && (c = !0), c
  },
  e3 = function(e) {
   return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
  },
  e5 = function(e) {
   return [e.deltaX, e.deltaY]
  },
  e6 = function(e) {
   return e && "current" in e ? e.current : e
  },
  e8 = 0,
  e9 = [];
 let e7 = (d = function(e) {
  var t = h.useRef([]),
   n = h.useRef([0, 0]),
   r = h.useRef(),
   a = h.useState(e8++)[0],
   i = h.useState(eq)[0],
   o = h.useRef(e);
  h.useEffect(function() {
   o.current = e
  }, [e]), h.useEffect(function() {
   if (e.inert) {
    document.body.classList.add("block-interactivity-".concat(a));
    var t = (0, eP.__spreadArray)([e.lockRef.current], (e.shards || []).map(e6), !0).filter(Boolean);
    return t.forEach(function(e) {
      return e.classList.add("allow-interactivity-".concat(a))
     }),
     function() {
      document.body.classList.remove("block-interactivity-".concat(a)), t.forEach(function(e) {
       return e.classList.remove("allow-interactivity-".concat(a))
      })
     }
   }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = h.useCallback(function(e, t) {
    if ("touches" in e && 2 === e.touches.length || "wheel" === e.type && e.ctrlKey) return !o.current.allowPinchZoom;
    var a, i = e3(e),
     s = n.current,
     l = "deltaX" in e ? e.deltaX : s[0] - i[0],
     u = "deltaY" in e ? e.deltaY : s[1] - i[1],
     c = e.target,
     d = Math.abs(l) > Math.abs(u) ? "h" : "v";
    if ("touches" in e && "h" === d && "range" === c.type) return !1;
    var f = window.getSelection(),
     p = f && f.anchorNode;
    if (p && (p === c || p.contains(c))) return !1;
    var h = e0(d, c);
    if (!h) return !0;
    if (h ? a = d : (a = "v" === d ? "h" : "v", h = e0(d, c)), !h) return !1;
    if (!r.current && "changedTouches" in e && (l || u) && (r.current = a), !a) return !0;
    var m = r.current || a;
    return e4(m, t, e, "h" === m ? l : u, !0)
   }, []),
   l = h.useCallback(function(e) {
    if (e9.length && e9[e9.length - 1] === i) {
     var n = "deltaY" in e ? e5(e) : e3(e),
      r = t.current.filter(function(t) {
       var r;
       return t.name === e.type && (t.target === e.target || e.target === t.shadowParent) && (r = t.delta, r[0] === n[0] && r[1] === n[1])
      })[0];
     if (r && r.should) {
      e.cancelable && e.preventDefault();
      return
     }
     if (!r) {
      var a = (o.current.shards || []).map(e6).filter(Boolean).filter(function(t) {
       return t.contains(e.target)
      });
      (a.length > 0 ? s(e, a[0]) : !o.current.noIsolation) && e.cancelable && e.preventDefault()
     }
    }
   }, []),
   u = h.useCallback(function(e, n, r, a) {
    var i = {
     name: e,
     delta: n,
     target: r,
     should: a,
     shadowParent: function(e) {
      for (var t = null; null !== e;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
      return t
     }(r)
    };
    t.current.push(i), setTimeout(function() {
     t.current = t.current.filter(function(e) {
      return e !== i
     })
    }, 1)
   }, []),
   c = h.useCallback(function(e) {
    n.current = e3(e), r.current = void 0
   }, []),
   d = h.useCallback(function(t) {
    u(t.type, e5(t), t.target, s(t, e.lockRef.current))
   }, []),
   f = h.useCallback(function(t) {
    u(t.type, e3(t), t.target, s(t, e.lockRef.current))
   }, []);
  h.useEffect(function() {
   return e9.push(i), e.setCallbacks({
     onScrollCapture: d,
     onWheelCapture: d,
     onTouchMoveCapture: f
    }), document.addEventListener("wheel", l, eJ), document.addEventListener("touchmove", l, eJ), document.addEventListener("touchstart", c, eJ),
    function() {
     e9 = e9.filter(function(e) {
      return e !== i
     }), document.removeEventListener("wheel", l, eJ), document.removeEventListener("touchmove", l, eJ), document.removeEventListener("touchstart", c, eJ)
    }
  }, []);
  var p = e.removeScrollBar,
   m = e.inert;
  return h.createElement(h.Fragment, null, m ? h.createElement(i, {
   styles: "\n  .block-interactivity-".concat(a, " {pointer-events: none;}\n  .allow-interactivity-").concat(a, " {pointer-events: all;}\n")
  }) : null, p ? h.createElement(eY, {
   noRelative: e.noRelative,
   gapMode: e.gapMode
  }) : null)
 }, eR.useMedium(d), eD);
 var te = h.forwardRef(function(e, t) {
  return h.createElement(eT, (0, eP.__assign)({}, e, {
   ref: t,
   sideCar: e7
  }))
 });
 te.classNames = eT.classNames;
 var tt = [" ", "Enter", "ArrowUp", "ArrowDown"],
  tn = [" ", "Enter"],
  tr = "Select",
  [ta, ti, to] = (0, W.createCollection)(tr),
  [ts, tl] = (0, Q.createContextScope)(tr, [to, eh.createPopperScope]),
  tu = (0, eh.createPopperScope)(),
  [tc, td] = ts(tr),
  [tf, tp] = ts(tr),
  th = e => {
   let {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: a,
    onOpenChange: i,
    value: o,
    defaultValue: s,
    onValueChange: l,
    dir: u,
    name: c,
    autoComplete: d,
    disabled: f,
    required: m,
    form: g
   } = e, v = tu(t), [y, b] = h.useState(null), [w, x] = h.useState(null), [_, j] = h.useState(!1), E = (0, X.useDirection)(u), [S, C] = (0, ey.useControllableState)({
    prop: r,
    defaultProp: a ?? !1,
    onChange: i,
    caller: tr
   }), [k, N] = (0, ey.useControllableState)({
    prop: o,
    defaultProp: s,
    onChange: l,
    caller: tr
   }), P = h.useRef(null), M = !y || g || !!y.closest("form"), [I, O] = h.useState(new Set), R = Array.from(I).map(e => e.props.value).join(";");
   return (0, p.jsx)(eh.Root, {
    ...v,
    children: (0, p.jsxs)(tc, {
     required: m,
     scope: t,
     trigger: y,
     onTriggerChange: b,
     valueNode: w,
     onValueNodeChange: x,
     valueNodeHasChildren: _,
     onValueNodeHasChildrenChange: j,
     contentId: (0, ep.useId)(),
     value: k,
     onValueChange: N,
     open: S,
     onOpenChange: C,
     dir: E,
     triggerPointerDownPosRef: P,
     disabled: f,
     children: [(0, p.jsx)(ta.Provider, {
      scope: t,
      children: (0, p.jsx)(tf, {
       scope: e.__scopeSelect,
       onNativeOptionAdd: h.useCallback(e => {
        O(t => new Set(t).add(e))
       }, []),
       onNativeOptionRemove: h.useCallback(e => {
        O(t => {
         let n = new Set(t);
         return n.delete(e), n
        })
       }, []),
       children: n
      })
     }), M ? (0, p.jsxs)(tX, {
      "aria-hidden": !0,
      required: m,
      tabIndex: -1,
      name: c,
      autoComplete: d,
      value: k,
      onChange: e => N(e.target.value),
      disabled: f,
      form: g,
      children: [void 0 === k ? (0, p.jsx)("option", {
       value: ""
      }) : null, Array.from(I)]
     }, R) : null]
    })
   })
  };
 th.displayName = tr;
 var tm = "SelectTrigger",
  tg = h.forwardRef((e, t) => {
   let {
    __scopeSelect: n,
    disabled: r = !1,
    ...a
   } = e, i = tu(n), o = td(tm, n), s = o.disabled || r, l = (0, Y.useComposedRefs)(t, o.onTriggerChange), u = ti(n), c = h.useRef("touch"), [d, f, m] = tZ(e => {
    let t = u().filter(e => !e.disabled),
     n = t.find(e => e.value === o.value),
     r = t0(t, e, n);
    void 0 !== r && o.onValueChange(r.value)
   }), g = e => {
    s || (o.onOpenChange(!0), m()), e && (o.triggerPointerDownPosRef.current = {
     x: Math.round(e.pageX),
     y: Math.round(e.pageY)
    })
   };
   return (0, p.jsx)(eh.Anchor, {
    asChild: !0,
    ...i,
    children: (0, p.jsx)(en.Primitive.button, {
     type: "button",
     role: "combobox",
     "aria-controls": o.contentId,
     "aria-expanded": o.open,
     "aria-required": o.required,
     "aria-autocomplete": "none",
     dir: o.dir,
     "data-state": o.open ? "open" : "closed",
     disabled: s,
     "data-disabled": s ? "" : void 0,
     "data-placeholder": tJ(o.value) ? "" : void 0,
     ...a,
     ref: l,
     onClick: (0, G.composeEventHandlers)(a.onClick, e => {
      e.currentTarget.focus(), "mouse" !== c.current && g(e)
     }),
     onPointerDown: (0, G.composeEventHandlers)(a.onPointerDown, e => {
      c.current = e.pointerType;
      let t = e.target;
      t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), 0 === e.button && !1 === e.ctrlKey && "mouse" === e.pointerType && (g(e), e.preventDefault())
     }),
     onKeyDown: (0, G.composeEventHandlers)(a.onKeyDown, e => {
      let t = "" !== d.current;
      e.ctrlKey || e.altKey || e.metaKey || 1 !== e.key.length || f(e.key), (!t || " " !== e.key) && tt.includes(e.key) && (g(), e.preventDefault())
     })
    })
   })
  });
 tg.displayName = tm;
 var tv = "SelectValue",
  ty = h.forwardRef((e, t) => {
   let {
    __scopeSelect: n,
    className: r,
    style: a,
    children: i,
    placeholder: o = "",
    ...s
   } = e, l = td(tv, n), {
    onValueNodeHasChildrenChange: u
   } = l, c = void 0 !== i, d = (0, Y.useComposedRefs)(t, l.onValueNodeChange);
   return (0, eb.useLayoutEffect)(() => {
    u(c)
   }, [u, c]), (0, p.jsx)(en.Primitive.span, {
    ...s,
    ref: d,
    style: {
     pointerEvents: "none"
    },
    children: tJ(l.value) ? (0, p.jsx)(p.Fragment, {
     children: o
    }) : i
   })
  });
 ty.displayName = tv;
 var tb = h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   children: r,
   ...a
  } = e;
  return (0, p.jsx)(en.Primitive.span, {
   "aria-hidden": !0,
   ...a,
   ref: t,
   children: r || "▼"
  })
 });
 tb.displayName = "SelectIcon";
 var tw = e => (0, p.jsx)(em.Portal, {
  asChild: !0,
  ...e
 });
 tw.displayName = "SelectPortal";
 var tx = "SelectContent",
  t_ = h.forwardRef((e, t) => {
   let n = td(tx, e.__scopeSelect),
    [r, a] = h.useState();
   return ((0, eb.useLayoutEffect)(() => {
    a(new DocumentFragment)
   }, []), n.open) ? (0, p.jsx)(tC, {
    ...e,
    ref: t
   }) : r ? K.createPortal((0, p.jsx)(tj, {
    scope: e.__scopeSelect,
    children: (0, p.jsx)(ta.Slot, {
     scope: e.__scopeSelect,
     children: (0, p.jsx)("div", {
      children: e.children
     })
    })
   }), r) : null
  });
 t_.displayName = tx;
 var [tj, tE] = ts(tx), tS = ((l = h.forwardRef((e, t) => {
  let {
   children: n,
   ...r
  } = e;
  if (h.isValidElement(n)) {
   var a;
   let e, i, o = (a = n, (i = (e = Object.getOwnPropertyDescriptor(a.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.ref : (i = (e = Object.getOwnPropertyDescriptor(a, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.props.ref : a.props.ref || a.ref),
    s = function(e, t) {
     let n = {
      ...t
     };
     for (let r in t) {
      let a = e[r],
       i = t[r];
      /^on[A-Z]/.test(r) ? a && i ? n[r] = (...e) => {
       let t = i(...e);
       return a(...e), t
      } : a && (n[r] = a) : "style" === r ? n[r] = {
       ...a,
       ...i
      } : "className" === r && (n[r] = [a, i].filter(Boolean).join(" "))
     }
     return {
      ...e,
      ...n
     }
    }(r, n.props);
   return n.type !== h.Fragment && (s.ref = t ? (0, Y.composeRefs)(t, o) : o), h.cloneElement(n, s)
  }
  return h.Children.count(n) > 1 ? h.Children.only(null) : null
 })).displayName = "SelectContent.RemoveScroll.SlotClone", t = l, (n = h.forwardRef((e, n) => {
  let {
   children: r,
   ...a
  } = e, i = h.Children.toArray(r), o = i.find(ev);
  if (o) {
   let e = o.props.children,
    r = i.map(t => t !== o ? t : h.Children.count(e) > 1 ? h.Children.only(null) : h.isValidElement(e) ? e.props.children : null);
   return (0, p.jsx)(t, {
    ...a,
    ref: n,
    children: h.isValidElement(e) ? h.cloneElement(e, void 0, r) : null
   })
  }
  return (0, p.jsx)(t, {
   ...a,
   ref: n,
   children: r
  })
 })).displayName = "SelectContent.RemoveScroll.Slot", n), tC = h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   position: r = "item-aligned",
   onCloseAutoFocus: a,
   onEscapeKeyDown: i,
   onPointerDownOutside: o,
   side: s,
   sideOffset: l,
   align: u,
   alignOffset: c,
   arrowPadding: d,
   collisionBoundary: f,
   collisionPadding: m,
   sticky: g,
   hideWhenDetached: v,
   avoidCollisions: y,
   ...b
  } = e, w = td(tx, n), [x, _] = h.useState(null), [j, E] = h.useState(null), S = (0, Y.useComposedRefs)(t, e => _(e)), [C, k] = h.useState(null), [N, P] = h.useState(null), M = ti(n), [I, O] = h.useState(!1), R = h.useRef(!1);
  h.useEffect(() => {
   if (x) return eN(x)
  }, [x]), ee();
  let A = h.useCallback(e => {
    let [t, ...n] = M().map(e => e.ref.current), [r] = n.slice(-1), a = document.activeElement;
    for (let n of e)
     if (n === a || (n?.scrollIntoView({
       block: "nearest"
      }), n === t && j && (j.scrollTop = 0), n === r && j && (j.scrollTop = j.scrollHeight), n?.focus(), document.activeElement !== a)) return
   }, [M, j]),
   T = h.useCallback(() => A([C, x]), [A, C, x]);
  h.useEffect(() => {
   I && T()
  }, [I, T]);
  let {
   onOpenChange: D,
   triggerPointerDownPosRef: L
  } = w;
  h.useEffect(() => {
   if (x) {
    let e = {
      x: 0,
      y: 0
     },
     t = t => {
      e = {
       x: Math.abs(Math.round(t.pageX) - (L.current?.x ?? 0)),
       y: Math.abs(Math.round(t.pageY) - (L.current?.y ?? 0))
      }
     },
     n = n => {
      e.x <= 10 && e.y <= 10 ? n.preventDefault() : x.contains(n.target) || D(!1), document.removeEventListener("pointermove", t), L.current = null
     };
    return null !== L.current && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
     capture: !0,
     once: !0
    })), () => {
     document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, {
      capture: !0
     })
    }
   }
  }, [x, D, L]), h.useEffect(() => {
   let e = () => D(!1);
   return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
    window.removeEventListener("blur", e), window.removeEventListener("resize", e)
   }
  }, [D]);
  let [F, q] = tZ(e => {
   let t = M().filter(e => !e.disabled),
    n = t.find(e => e.ref.current === document.activeElement),
    r = t0(t, e, n);
   r && setTimeout(() => r.ref.current.focus())
  }), H = h.useCallback((e, t, n) => {
   let r = !R.current && !n;
   (void 0 !== w.value && w.value === t || r) && (k(e), r && (R.current = !0))
  }, [w.value]), z = h.useCallback(() => x?.focus(), [x]), B = h.useCallback((e, t, n) => {
   let r = !R.current && !n;
   (void 0 !== w.value && w.value === t || r) && P(e)
  }, [w.value]), V = "popper" === r ? tN : tk, $ = V === tN ? {
   side: s,
   sideOffset: l,
   align: u,
   alignOffset: c,
   arrowPadding: d,
   collisionBoundary: f,
   collisionPadding: m,
   sticky: g,
   hideWhenDetached: v,
   avoidCollisions: y
  } : {};
  return (0, p.jsx)(tj, {
   scope: n,
   content: x,
   viewport: j,
   onViewportChange: E,
   itemRefCallback: H,
   selectedItem: C,
   onItemLeave: z,
   itemTextRefCallback: B,
   focusSelectedItem: T,
   selectedItemText: N,
   position: r,
   isPositioned: I,
   searchRef: F,
   children: (0, p.jsx)(te, {
    as: tS,
    allowPinchZoom: !0,
    children: (0, p.jsx)(es, {
     asChild: !0,
     trapped: w.open,
     onMountAutoFocus: e => {
      e.preventDefault()
     },
     onUnmountAutoFocus: (0, G.composeEventHandlers)(a, e => {
      w.trigger?.focus({
       preventScroll: !0
      }), e.preventDefault()
     }),
     children: (0, p.jsx)(J.DismissableLayer, {
      asChild: !0,
      disableOutsidePointerEvents: !0,
      onEscapeKeyDown: i,
      onPointerDownOutside: o,
      onFocusOutside: e => e.preventDefault(),
      onDismiss: () => w.onOpenChange(!1),
      children: (0, p.jsx)(V, {
       role: "listbox",
       id: w.contentId,
       "data-state": w.open ? "open" : "closed",
       dir: w.dir,
       onContextMenu: e => e.preventDefault(),
       ...b,
       ...$,
       onPlaced: () => O(!0),
       ref: S,
       style: {
        display: "flex",
        flexDirection: "column",
        outline: "none",
        ...b.style
       },
       onKeyDown: (0, G.composeEventHandlers)(b.onKeyDown, e => {
        let t = e.ctrlKey || e.altKey || e.metaKey;
        if ("Tab" === e.key && e.preventDefault(), t || 1 !== e.key.length || q(e.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
         let t = M().filter(e => !e.disabled).map(e => e.ref.current);
         if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
          let n = e.target,
           r = t.indexOf(n);
          t = t.slice(r + 1)
         }
         setTimeout(() => A(t)), e.preventDefault()
        }
       })
      })
     })
    })
   })
  })
 });
 tC.displayName = "SelectContentImpl";
 var tk = h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   onPlaced: r,
   ...a
  } = e, i = td(tx, n), o = tE(tx, n), [s, l] = h.useState(null), [u, c] = h.useState(null), d = (0, Y.useComposedRefs)(t, e => c(e)), f = ti(n), m = h.useRef(!1), g = h.useRef(!0), {
   viewport: v,
   selectedItem: y,
   selectedItemText: b,
   focusSelectedItem: w
  } = o, x = h.useCallback(() => {
   if (i.trigger && i.valueNode && s && u && v && y && b) {
    let e = i.trigger.getBoundingClientRect(),
     t = u.getBoundingClientRect(),
     n = i.valueNode.getBoundingClientRect(),
     a = b.getBoundingClientRect();
    if ("rtl" !== i.dir) {
     let r = a.left - t.left,
      i = n.left - r,
      o = e.left - i,
      l = e.width + o,
      u = Math.max(l, t.width),
      c = U(i, [10, Math.max(10, window.innerWidth - 10 - u)]);
     s.style.minWidth = l + "px", s.style.left = c + "px"
    } else {
     let r = t.right - a.right,
      i = window.innerWidth - n.right - r,
      o = window.innerWidth - e.right - i,
      l = e.width + o,
      u = Math.max(l, t.width),
      c = U(i, [10, Math.max(10, window.innerWidth - 10 - u)]);
     s.style.minWidth = l + "px", s.style.right = c + "px"
    }
    let o = f(),
     l = window.innerHeight - 20,
     c = v.scrollHeight,
     d = window.getComputedStyle(u),
     p = parseInt(d.borderTopWidth, 10),
     h = parseInt(d.paddingTop, 10),
     g = parseInt(d.borderBottomWidth, 10),
     w = p + h + c + parseInt(d.paddingBottom, 10) + g,
     x = Math.min(5 * y.offsetHeight, w),
     _ = window.getComputedStyle(v),
     j = parseInt(_.paddingTop, 10),
     E = parseInt(_.paddingBottom, 10),
     S = e.top + e.height / 2 - 10,
     C = y.offsetHeight / 2,
     k = p + h + (y.offsetTop + C);
    if (k <= S) {
     let e = o.length > 0 && y === o[o.length - 1].ref.current;
     s.style.bottom = "0px";
     let t = Math.max(l - S, C + (e ? E : 0) + (u.clientHeight - v.offsetTop - v.offsetHeight) + g);
     s.style.height = k + t + "px"
    } else {
     let e = o.length > 0 && y === o[0].ref.current;
     s.style.top = "0px";
     let t = Math.max(S, p + v.offsetTop + (e ? j : 0) + C);
     s.style.height = t + (w - k) + "px", v.scrollTop = k - S + v.offsetTop
    }
    s.style.margin = "10px 0", s.style.minHeight = x + "px", s.style.maxHeight = l + "px", r?.(), requestAnimationFrame(() => m.current = !0)
   }
  }, [f, i.trigger, i.valueNode, s, u, v, y, b, i.dir, r]);
  (0, eb.useLayoutEffect)(() => x(), [x]);
  let [_, j] = h.useState();
  (0, eb.useLayoutEffect)(() => {
   u && j(window.getComputedStyle(u).zIndex)
  }, [u]);
  let E = h.useCallback(e => {
   e && !0 === g.current && (x(), w?.(), g.current = !1)
  }, [x, w]);
  return (0, p.jsx)(tP, {
   scope: n,
   contentWrapper: s,
   shouldExpandOnScrollRef: m,
   onScrollButtonChange: E,
   children: (0, p.jsx)("div", {
    ref: l,
    style: {
     display: "flex",
     flexDirection: "column",
     position: "fixed",
     zIndex: _
    },
    children: (0, p.jsx)(en.Primitive.div, {
     ...a,
     ref: d,
     style: {
      boxSizing: "border-box",
      maxHeight: "100%",
      ...a.style
     }
    })
   })
  })
 });
 tk.displayName = "SelectItemAlignedPosition";
 var tN = h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   align: r = "start",
   collisionPadding: a = 10,
   ...i
  } = e, o = tu(n);
  return (0, p.jsx)(eh.Content, {
   ...o,
   ...i,
   ref: t,
   align: r,
   collisionPadding: a,
   style: {
    boxSizing: "border-box",
    ...i.style,
    "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
    "--radix-select-content-available-width": "var(--radix-popper-available-width)",
    "--radix-select-content-available-height": "var(--radix-popper-available-height)",
    "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
    "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
   }
  })
 });
 tN.displayName = "SelectPopperPosition";
 var [tP, tM] = ts(tx, {}), tI = "SelectViewport", tO = h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   nonce: r,
   ...a
  } = e, i = tE(tI, n), o = tM(tI, n), s = (0, Y.useComposedRefs)(t, i.onViewportChange), l = h.useRef(0);
  return (0, p.jsxs)(p.Fragment, {
   children: [(0, p.jsx)("style", {
    dangerouslySetInnerHTML: {
     __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
    },
    nonce: r
   }), (0, p.jsx)(ta.Slot, {
    scope: n,
    children: (0, p.jsx)(en.Primitive.div, {
     "data-radix-select-viewport": "",
     role: "presentation",
     ...a,
     ref: s,
     style: {
      position: "relative",
      flex: 1,
      overflow: "hidden auto",
      ...a.style
     },
     onScroll: (0, G.composeEventHandlers)(a.onScroll, e => {
      let t = e.currentTarget,
       {
        contentWrapper: n,
        shouldExpandOnScrollRef: r
       } = o;
      if (r?.current && n) {
       let e = Math.abs(l.current - t.scrollTop);
       if (e > 0) {
        let r = window.innerHeight - 20,
         a = Math.max(parseFloat(n.style.minHeight), parseFloat(n.style.height));
        if (a < r) {
         let i = a + e,
          o = Math.min(r, i),
          s = i - o;
         n.style.height = o + "px", "0px" === n.style.bottom && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end")
        }
       }
      }
      l.current = t.scrollTop
     })
    })
   })]
  })
 });
 tO.displayName = tI;
 var tR = "SelectGroup",
  [tA, tT] = ts(tR);
 h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   ...r
  } = e, a = (0, ep.useId)();
  return (0, p.jsx)(tA, {
   scope: n,
   id: a,
   children: (0, p.jsx)(en.Primitive.div, {
    role: "group",
    "aria-labelledby": a,
    ...r,
    ref: t
   })
  })
 }).displayName = tR;
 var tD = "SelectLabel";
 h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   ...r
  } = e, a = tT(tD, n);
  return (0, p.jsx)(en.Primitive.div, {
   id: a.id,
   ...r,
   ref: t
  })
 }).displayName = tD;
 var tL = "SelectItem",
  [tF, tq] = ts(tL),
  tH = h.forwardRef((e, t) => {
   let {
    __scopeSelect: n,
    value: r,
    disabled: a = !1,
    textValue: i,
    ...o
   } = e, s = td(tL, n), l = tE(tL, n), u = s.value === r, [c, d] = h.useState(i ?? ""), [f, m] = h.useState(!1), g = (0, Y.useComposedRefs)(t, e => l.itemRefCallback?.(e, r, a)), v = (0, ep.useId)(), y = h.useRef("touch"), b = () => {
    a || (s.onValueChange(r), s.onOpenChange(!1))
   };
   if ("" === r) throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
   return (0, p.jsx)(tF, {
    scope: n,
    value: r,
    disabled: a,
    textId: v,
    isSelected: u,
    onItemTextChange: h.useCallback(e => {
     d(t => t || (e?.textContent ?? "").trim())
    }, []),
    children: (0, p.jsx)(ta.ItemSlot, {
     scope: n,
     value: r,
     disabled: a,
     textValue: c,
     children: (0, p.jsx)(en.Primitive.div, {
      role: "option",
      "aria-labelledby": v,
      "data-highlighted": f ? "" : void 0,
      "aria-selected": u && f,
      "data-state": u ? "checked" : "unchecked",
      "aria-disabled": a || void 0,
      "data-disabled": a ? "" : void 0,
      tabIndex: a ? void 0 : -1,
      ...o,
      ref: g,
      onFocus: (0, G.composeEventHandlers)(o.onFocus, () => m(!0)),
      onBlur: (0, G.composeEventHandlers)(o.onBlur, () => m(!1)),
      onClick: (0, G.composeEventHandlers)(o.onClick, () => {
       "mouse" !== y.current && b()
      }),
      onPointerUp: (0, G.composeEventHandlers)(o.onPointerUp, () => {
       "mouse" === y.current && b()
      }),
      onPointerDown: (0, G.composeEventHandlers)(o.onPointerDown, e => {
       y.current = e.pointerType
      }),
      onPointerMove: (0, G.composeEventHandlers)(o.onPointerMove, e => {
       y.current = e.pointerType, a ? l.onItemLeave?.() : "mouse" === y.current && e.currentTarget.focus({
        preventScroll: !0
       })
      }),
      onPointerLeave: (0, G.composeEventHandlers)(o.onPointerLeave, e => {
       e.currentTarget === document.activeElement && l.onItemLeave?.()
      }),
      onKeyDown: (0, G.composeEventHandlers)(o.onKeyDown, e => {
       (l.searchRef?.current === "" || " " !== e.key) && (tn.includes(e.key) && b(), " " === e.key && e.preventDefault())
      })
     })
    })
   })
  });
 tH.displayName = tL;
 var tz = "SelectItemText",
  tB = h.forwardRef((e, t) => {
   let {
    __scopeSelect: n,
    className: r,
    style: a,
    ...i
   } = e, o = td(tz, n), s = tE(tz, n), l = tq(tz, n), u = tp(tz, n), [c, d] = h.useState(null), f = (0, Y.useComposedRefs)(t, e => d(e), l.onItemTextChange, e => s.itemTextRefCallback?.(e, l.value, l.disabled)), m = c?.textContent, g = h.useMemo(() => (0, p.jsx)("option", {
    value: l.value,
    disabled: l.disabled,
    children: m
   }, l.value), [l.disabled, l.value, m]), {
    onNativeOptionAdd: v,
    onNativeOptionRemove: y
   } = u;
   return (0, eb.useLayoutEffect)(() => (v(g), () => y(g)), [v, y, g]), (0, p.jsxs)(p.Fragment, {
    children: [(0, p.jsx)(en.Primitive.span, {
     id: l.textId,
     ...i,
     ref: f
    }), l.isSelected && o.valueNode && !o.valueNodeHasChildren ? K.createPortal(i.children, o.valueNode) : null]
   })
  });
 tB.displayName = tz;
 var tV = "SelectItemIndicator",
  t$ = h.forwardRef((e, t) => {
   let {
    __scopeSelect: n,
    ...r
   } = e;
   return tq(tV, n).isSelected ? (0, p.jsx)(en.Primitive.span, {
    "aria-hidden": !0,
    ...r,
    ref: t
   }) : null
  });
 t$.displayName = tV;
 var tK = "SelectScrollUpButton",
  tU = h.forwardRef((e, t) => {
   let n = tE(tK, e.__scopeSelect),
    r = tM(tK, e.__scopeSelect),
    [a, i] = h.useState(!1),
    o = (0, Y.useComposedRefs)(t, r.onScrollButtonChange);
   return (0, eb.useLayoutEffect)(() => {
    if (n.viewport && n.isPositioned) {
     let e = function() {
       i(t.scrollTop > 0)
      },
      t = n.viewport;
     return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e)
    }
   }, [n.viewport, n.isPositioned]), a ? (0, p.jsx)(tY, {
    ...e,
    ref: o,
    onAutoScroll: () => {
     let {
      viewport: e,
      selectedItem: t
     } = n;
     e && t && (e.scrollTop = e.scrollTop - t.offsetHeight)
    }
   }) : null
  });
 tU.displayName = tK;
 var tG = "SelectScrollDownButton",
  tW = h.forwardRef((e, t) => {
   let n = tE(tG, e.__scopeSelect),
    r = tM(tG, e.__scopeSelect),
    [a, i] = h.useState(!1),
    o = (0, Y.useComposedRefs)(t, r.onScrollButtonChange);
   return (0, eb.useLayoutEffect)(() => {
    if (n.viewport && n.isPositioned) {
     let e = function() {
       let e = t.scrollHeight - t.clientHeight;
       i(Math.ceil(t.scrollTop) < e)
      },
      t = n.viewport;
     return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e)
    }
   }, [n.viewport, n.isPositioned]), a ? (0, p.jsx)(tY, {
    ...e,
    ref: o,
    onAutoScroll: () => {
     let {
      viewport: e,
      selectedItem: t
     } = n;
     e && t && (e.scrollTop = e.scrollTop + t.offsetHeight)
    }
   }) : null
  });
 tW.displayName = tG;
 var tY = h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   onAutoScroll: r,
   ...a
  } = e, i = tE("SelectScrollButton", n), o = h.useRef(null), s = ti(n), l = h.useCallback(() => {
   null !== o.current && (window.clearInterval(o.current), o.current = null)
  }, []);
  return h.useEffect(() => () => l(), [l]), (0, eb.useLayoutEffect)(() => {
   let e = s().find(e => e.ref.current === document.activeElement);
   e?.ref.current?.scrollIntoView({
    block: "nearest"
   })
  }, [s]), (0, p.jsx)(en.Primitive.div, {
   "aria-hidden": !0,
   ...a,
   ref: t,
   style: {
    flexShrink: 0,
    ...a.style
   },
   onPointerDown: (0, G.composeEventHandlers)(a.onPointerDown, () => {
    null === o.current && (o.current = window.setInterval(r, 50))
   }),
   onPointerMove: (0, G.composeEventHandlers)(a.onPointerMove, () => {
    i.onItemLeave?.(), null === o.current && (o.current = window.setInterval(r, 50))
   }),
   onPointerLeave: (0, G.composeEventHandlers)(a.onPointerLeave, () => {
    l()
   })
  })
 });
 h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   ...r
  } = e;
  return (0, p.jsx)(en.Primitive.div, {
   "aria-hidden": !0,
   ...r,
   ref: t
  })
 }).displayName = "SelectSeparator";
 var tQ = "SelectArrow";
 h.forwardRef((e, t) => {
  let {
   __scopeSelect: n,
   ...r
  } = e, a = tu(n), i = td(tQ, n), o = tE(tQ, n);
  return i.open && "popper" === o.position ? (0, p.jsx)(eh.Arrow, {
   ...a,
   ...r,
   ref: t
  }) : null
 }).displayName = tQ;
 var tX = h.forwardRef(({
  __scopeSelect: e,
  value: t,
  ...n
 }, r) => {
  let a = h.useRef(null),
   i = (0, Y.useComposedRefs)(r, a),
   o = (0, ew.usePrevious)(t);
  return h.useEffect(() => {
   let e = a.current;
   if (!e) return;
   let n = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value").set;
   if (o !== t && n) {
    let r = new Event("change", {
     bubbles: !0
    });
    n.call(e, t), e.dispatchEvent(r)
   }
  }, [o, t]), (0, p.jsx)(en.Primitive.select, {
   ...n,
   style: {
    ...ex.VISUALLY_HIDDEN_STYLES,
    ...n.style
   },
   ref: i,
   defaultValue: t
  })
 });

 function tJ(e) {
  return "" === e || void 0 === e
 }

 function tZ(e) {
  let t = (0, er.useCallbackRef)(e),
   n = h.useRef(""),
   r = h.useRef(0),
   a = h.useCallback(e => {
    let a = n.current + e;
    t(a),
     function e(t) {
      n.current = t, window.clearTimeout(r.current), "" !== t && (r.current = window.setTimeout(() => e(""), 1e3))
     }(a)
   }, [t]),
   i = h.useCallback(() => {
    n.current = "", window.clearTimeout(r.current)
   }, []);
  return h.useEffect(() => () => window.clearTimeout(r.current), []), [n, a, i]
 }

 function t0(e, t, n) {
  var r, a;
  let i = t.length > 1 && Array.from(t).every(e => e === t[0]) ? t[0] : t,
   o = n ? e.indexOf(n) : -1,
   s = (r = e, a = Math.max(o, 0), r.map((e, t) => r[(a + t) % r.length]));
  1 === i.length && (s = s.filter(e => e !== n));
  let l = s.find(e => e.textValue.toLowerCase().startsWith(i.toLowerCase()));
  return l !== n ? l : void 0
 }
 tX.displayName = "SelectBubbleInput";
 var t1 = e.i(475254);
 let t2 = (0, t1.default)("ArrowDown", [
   ["path", {
    d: "M12 5v14",
    key: "s699le"
   }],
   ["path", {
    d: "m19 12-7 7-7-7",
    key: "1idqje"
   }]
  ]),
  t4 = (0, t1.default)("Check", [
   ["path", {
    d: "M20 6 9 17l-5-5",
    key: "1gmf2c"
   }]
  ]),
  t3 = (0, t1.default)("ChevronDown", [
   ["path", {
    d: "m6 9 6 6 6-6",
    key: "qrunsl"
   }]
  ]),
  t5 = (0, t1.default)("ChevronUp", [
   ["path", {
    d: "m18 15-6-6-6 6",
    key: "153udz"
   }]
  ]);

 function t6({
  ...e
 }) {
  return (0, p.jsx)(th, {
   "data-slot": "select",
   ...e
  })
 }

 function t8({
  ...e
 }) {
  return (0, p.jsx)(ty, {
   "data-slot": "select-value",
   ...e
  })
 }

 function t9({
  className: e,
  size: t = "default",
  children: n,
  ...r
 }) {
  return (0, p.jsxs)(tg, {
   "data-slot": "select-trigger",
   "data-size": t,
   className: (0, S.cn)("data-placeholder:text-placeholder [&_svg:not([class*='text-'])]:text-foreground border-border flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-xs whitespace-nowrap transition-[color,box-shadow] select-none disabled:pointer-events-none data-placeholder:text-xs data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "state-focus-visible-variant-ring", "aria-invalid:ring-error aria-invalid:border-error aria-invalid:ring", e),
   ...r,
   children: [n, (0, p.jsx)(tb, {
    asChild: !0,
    children: (0, p.jsx)(t2, {
     className: "text-muted-foreground pointer-events-none size-3"
    })
   })]
  })
 }

 function t7({
  className: e,
  children: t,
  hasScrollButtons: n = !0,
  position: r = "popper",
  ...a
 }) {
  return (0, p.jsx)(tw, {
   children: (0, p.jsxs)(t_, {
    "data-slot": "select-content",
    className: (0, S.cn)("z-popover bg-background relative max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=top]:slide-in-from-bottom-2", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "popper" === r && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
    position: r,
    ...a,
    children: [n && (0, p.jsx)(nt, {}), (0, p.jsx)(tO, {
     className: (0, S.cn)("p-1", "popper" === r && "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1"),
     children: t
    }), n && (0, p.jsx)(nn, {})]
   })
  })
 }

 function ne({
  className: e,
  children: t,
  ...n
 }) {
  return (0, p.jsxs)(tH, {
   "data-slot": "select-item",
   className: (0, S.cn)("focus:bg-subtle focus:text-foreground [&_svg:not([class*='text-'])]:text-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-xs outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
   ...n,
   children: [(0, p.jsx)("span", {
    className: "absolute right-2 flex size-3.5 items-center justify-center",
    children: (0, p.jsx)(t$, {
     children: (0, p.jsx)(t4, {
      className: "size-4"
     })
    })
   }), (0, p.jsx)(tB, {
    children: t
   })]
  })
 }

 function nt({
  className: e,
  ...t
 }) {
  return (0, p.jsx)(tU, {
   "data-slot": "select-scroll-up-button",
   className: (0, S.cn)("flex cursor-default items-center justify-center py-1", e),
   ...t,
   children: (0, p.jsx)(t5, {
    className: "size-4"
   })
  })
 }

 function nn({
  className: e,
  ...t
 }) {
  return (0, p.jsx)(tW, {
   "data-slot": "select-scroll-down-button",
   className: (0, S.cn)("flex cursor-default items-center justify-center py-1", e),
   ...t,
   children: (0, p.jsx)(t3, {
    className: "size-4"
   })
  })
 }
 var nr = e.i(83884);
 let na = "submitting",
  ni = "success",
  no = "error",
  ns = /^(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
  nl = "Invalid phone number",
  nu = ["@gmail", "@yahoo", "@aol", "@hotmail", "@outlook", "@icloud", "@msn", "@mail.ru", "@protonmail", "@ymail", "@gmx", "@mac.com", "@me.com"],
  nc = e => {
   let t = e.toLowerCase();
   return !nu.some(e => t.includes(e))
  },
  nd = ({
   id: e,
   field: t,
   fieldState: n,
   controllerField: r
  }) => {
   let {
    inputType: a,
    placeholder: i,
    selectOptions: o
   } = t || {};
   switch (a) {
    case "textarea":
     return (0, p.jsx)(nr.Textarea, {
      ...r,
      id: e,
      placeholder: i,
      className: (0, S.cn)({
       "pr-8": n.invalid
      })
     });
    case "select":
     return (0, p.jsxs)(t6, {
      name: t.fieldName,
      value: r.value,
      onValueChange: r.onChange,
      children: [(0, p.jsx)(t9, {
       id: e,
       className: (0, S.cn)("*:data-[slot=select-value]:text-white", {
        "pr-8": n.invalid
       }),
       children: (0, p.jsx)(t8, {
        placeholder: "Select one",
        className: "text-white"
       })
      }), (0, p.jsx)(t7, {
       side: "bottom",
       hasScrollButtons: !0,
       children: o.map(e => (0, p.jsx)(ne, {
        value: e.value,
        children: e.title
       }, e._key))
      })]
     });
    default:
     return (0, p.jsx)($.Input, {
      ...r,
      id: e,
      placeholder: i,
      className: (0, S.cn)({
       "pr-8": n.invalid
      })
     })
   }
  },
  nf = ({
   form: e,
   field: t
  }) => {
   let {
    fieldLabel: n,
    fieldName: r,
    fieldWidth: a,
    description: i
   } = t, [o, s] = (0, h.useState)(!1);
   return (0, p.jsx)(I.Controller, {
    name: r,
    control: e.control,
    render: ({
     field: e,
     fieldState: l
    }) => {
     let u = l.invalid,
      c = r + "-" + t._key;
     return (0, p.jsx)(q, {
      orientation: "horizontal",
      "data-invalid": u,
      className: (0, S.cn)("basis-full", {
       "basis-[calc(50%-var(--gap-x)/2)]": "half" === a
      }),
      children: (0, p.jsxs)(H, {
       children: [(0, p.jsx)(z, {
        htmlFor: c,
        className: (0, S.cn)({
         "gap-0 after:content-['*']": t.required
        }),
        children: n
       }), i && (0, p.jsx)(B, {
        children: i
       }), (0, p.jsxs)("div", {
        className: "relative grid",
        children: [(0, p.jsx)(nd, {
         id: c,
         field: t,
         controllerField: {
          ...e,
          onFocus: e => {
           s(!0)
          },
          onBlur: t => {
           e?.onBlur?.(t), s(!1)
          }
         },
         fieldState: l
        }), (0, p.jsx)(V, {
         fieldState: l,
         isFocused: o,
         isShowErrorOnFocus: !0
        })]
       })]
      })
     })
    }
   })
  };

 function np({
  id: e,
  data: t,
  className: n,
  onSubmitForm: r
 }) {
  let a, {
    formTitle: i,
    formFields: o,
    successMessage: s,
    errorMessage: l,
    formFailureNotificationEmail: u,
    legalConsent: c
   } = t || {},
   d = `${e}_draft_custom_form_data`,
   [f, m] = (0, h.useState)("idle"),
   g = (0, b.useAppDispatch)(),
   v = (0, h.useMemo)(() => {
    let e = localStorage.getItem(d);
    if (e) try {
     let {
      data: t,
      timestamp: n
     } = JSON.parse(e);
     if (!(Date.now() - n > 864e5)) return t;
     localStorage.removeItem(d)
    } catch (e) {
     console.error("Failed to parse draft data", e)
    }
    return o.reduce((e, {
     fieldName: t
    }) => (e[t] = "", e), {})
   }, [o]),
   y = (0, I.useForm)({
    resolver: (a = {}, o.forEach(e => {
     let {
      fieldName: t,
      required: n,
      inputType: r,
      minLength: i
     } = e, o = O.string();
     if (i && (o = o.min(i, {
       message: `Must be at least ${i} characters`
      })), "tel" === r) {
      let e = new RegExp(ns);
      o = o.regex(e, nl)
     }
     "email" === r && (o = o.email("Invalid email format")), n && (o = o.min(1, {
      message: "This field is required"
     })), "email" === r && (o = o.refine(nc, {
      message: "Please use a business email address"
     })), n || (o = o.optional().or(O.literal(""))), a[t] = o
    }), (0, M.zodResolver)(O.object(a))),
    defaultValues: v,
    mode: "onSubmit"
   }),
   w = async e => {
    g((0, P.setProgressStatus)("start")), m(na);
    try {
     let t = await r(e);
     if (t?.ok) {
      m(ni), y.reset(), localStorage.removeItem(d), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
       event: "contact_form_success"
      });
      return
     }
     let n = "function" == typeof t?.text ? await t.text() : "Error";
     m(no), nh({
      emailTo: u,
      formData: e,
      errorInfo: {
       error: n || "Network error"
      }
     })
    } catch (t) {
     console.error("Form submission error:", t), m(no), nh({
      emailTo: u,
      formData: e,
      errorInfo: {
       error: t.message || "Network error"
      }
     })
    } finally {
     setTimeout(() => {
      g((0, P.setProgressStatus)("complete"))
     }, 1e3)
    }
   }, x = y.watch();
  return ((0, h.useEffect)(() => {
   if (Object.values(x).some(e => " " !== e)) {
    let e = {
     data: x,
     timestamp: Date.now()
    };
    localStorage.setItem(d, JSON.stringify(e))
   }
  }, [x]), (0, S.hasArrayValue)(o)) ? (0, p.jsxs)("div", {
   className: (0, S.cn)(n),
   children: [i && (0, p.jsx)("h4", {
    children: i
   }), (0, p.jsxs)("form", {
    onSubmit: y.handleSubmit(w),
    className: (0, S.cn)("space-y-5", n),
    children: [(0, p.jsx)(L, {
     children: (0, p.jsx)("div", {
      className: "flex flex-wrap gap-x-(--gap-x) gap-y-4",
      style: {
       "--gap-x": "10px"
      },
      children: o.map(e => (0, p.jsx)(nf, {
       field: e,
       form: y
      }, e._key))
     })
    }), f === ni && (0, p.jsx)("p", {
     className: "text-success t-b-1",
     children: s || "Success. Your message has been sent."
    }), f === no && (0, p.jsx)("p", {
     className: "text-error",
     children: l || "Error. There was an issue submitting your message. Please try again later."
    }), c && (0, p.jsx)("div", {
     className: "mt-auto max-w-[340px] text-[10px]",
     children: (0, p.jsx)(C.default, {
      blocks: c
     })
    }), (0, p.jsx)(j.Button, {
     type: "submit",
     disabled: f === na,
     shape: "rounded",
     className: (0, S.cn)("h-10.5 w-fit min-w-34", {
      "mt-auto": !c
     }),
     children: f === na ? (0, p.jsx)("div", {
      className: "border-green-5 size-3.5 animate-spin rounded-full border border-t-transparent"
     }) : "Send message"
    })]
   })]
  }) : null
 }
 async function nh({
  emailTo: e,
  formData: t,
  errorInfo: n
 }) {
  let r = "[Contact form Error]",
   a = {
    email: e,
    emailSubject: r,
    emailHtmlContent: `
			<p>
				Your form failed to send. Please notify your website administrator. A backup is provided below.
			</p>
			<p>
				<strong>Error Details: </strong><br>
				Page URL: ${window.location.href}<br>
				Timestamp: ${new Date().toISOString()}<br>
				${(0,S.formatObjectToHtml)(n)}
			</p>
      <p>
				<strong>Form Data: </strong><br>
				Subject: ${r}<br>
				${(0,S.formatObjectToHtml)(t)}
			</p>`
   };
  async function i({
   apiUrl: e,
   emailData: t
  }) {
   let n = new AbortController,
    r = setTimeout(() => n.abort(), 5e3);
   try {
    let r = await fetch(e, {
     method: "POST",
     headers: {
      "Content-Type": "application/json"
     },
     body: JSON.stringify(t),
     signal: n.signal
    });
    if (!r.ok) {
     let e = await r.text();
     throw Error(`HTTP error! status: ${r.status}, body: ${e}`)
    }
    return !0
   } catch (t) {
    return console.error(`Email sending failed for ${e}:`, t), !1
   } finally {
    clearTimeout(r)
   }
  }
  let o = ["/api/send-notification-email", "/api/send-backup-email", "/api/send-backup-email?useTransporter2=true"],
   s = 0,
   l = null;
  for (let e of o) {
   s++;
   try {
    if (await i({
      apiUrl: e,
      emailData: a
     })) return {
     success: !0,
     attempts: s
    }
   } catch (e) {
    l = e, console.error(`Attempt ${s} failed:`, e)
   }
   s < o.length && await new Promise(e => setTimeout(e, 1e3))
  }
  return {
   success: !1,
   attempts: s,
   lastError: l
  }
 }
 var nm = e.i(836236),
  ng = e.i(296626),
  nv = Symbol("radix.slottable");

 function ny(e) {
  return h.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === nv
 }
 var nb = "Dialog",
  [nw, nx] = (0, Q.createContextScope)(nb),
  [n_, nj] = nw(nb),
  nE = e => {
   let {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: a,
    onOpenChange: i,
    modal: o = !0
   } = e, s = h.useRef(null), l = h.useRef(null), [u, c] = (0, ey.useControllableState)({
    prop: r,
    defaultProp: a ?? !1,
    onChange: i,
    caller: nb
   });
   return (0, p.jsx)(n_, {
    scope: t,
    triggerRef: s,
    contentRef: l,
    contentId: (0, ep.useId)(),
    titleId: (0, ep.useId)(),
    descriptionId: (0, ep.useId)(),
    open: u,
    onOpenChange: c,
    onOpenToggle: h.useCallback(() => c(e => !e), [c]),
    modal: o,
    children: n
   })
  };
 nE.displayName = nb;
 var nS = "DialogTrigger";
 h.forwardRef((e, t) => {
  let {
   __scopeDialog: n,
   ...r
  } = e, a = nj(nS, n), i = (0, Y.useComposedRefs)(t, a.triggerRef);
  return (0, p.jsx)(en.Primitive.button, {
   type: "button",
   "aria-haspopup": "dialog",
   "aria-expanded": a.open,
   "aria-controls": a.contentId,
   "data-state": nK(a.open),
   ...r,
   ref: i,
   onClick: (0, G.composeEventHandlers)(e.onClick, a.onOpenToggle)
  })
 }).displayName = nS;
 var nC = "DialogPortal",
  [nk, nN] = nw(nC, {
   forceMount: void 0
  }),
  nP = e => {
   let {
    __scopeDialog: t,
    forceMount: n,
    children: r,
    container: a
   } = e, i = nj(nC, t);
   return (0, p.jsx)(nk, {
    scope: t,
    forceMount: n,
    children: h.Children.map(r, e => (0, p.jsx)(ng.Presence, {
     present: n || i.open,
     children: (0, p.jsx)(em.Portal, {
      asChild: !0,
      container: a,
      children: e
     })
    }))
   })
  };
 nP.displayName = nC;
 var nM = "DialogOverlay",
  nI = h.forwardRef((e, t) => {
   let n = nN(nM, e.__scopeDialog),
    {
     forceMount: r = n.forceMount,
     ...a
    } = e,
    i = nj(nM, e.__scopeDialog);
   return i.modal ? (0, p.jsx)(ng.Presence, {
    present: r || i.open,
    children: (0, p.jsx)(nR, {
     ...a,
     ref: t
    })
   }) : null
  });
 nI.displayName = nM;
 var nO = ((u = h.forwardRef((e, t) => {
   let {
    children: n,
    ...r
   } = e;
   if (h.isValidElement(n)) {
    var a;
    let e, i, o = (a = n, (i = (e = Object.getOwnPropertyDescriptor(a.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.ref : (i = (e = Object.getOwnPropertyDescriptor(a, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.props.ref : a.props.ref || a.ref),
     s = function(e, t) {
      let n = {
       ...t
      };
      for (let r in t) {
       let a = e[r],
        i = t[r];
       /^on[A-Z]/.test(r) ? a && i ? n[r] = (...e) => {
        let t = i(...e);
        return a(...e), t
       } : a && (n[r] = a) : "style" === r ? n[r] = {
        ...a,
        ...i
       } : "className" === r && (n[r] = [a, i].filter(Boolean).join(" "))
      }
      return {
       ...e,
       ...n
      }
     }(r, n.props);
    return n.type !== h.Fragment && (s.ref = t ? (0, Y.composeRefs)(t, o) : o), h.cloneElement(n, s)
   }
   return h.Children.count(n) > 1 ? h.Children.only(null) : null
  })).displayName = "DialogOverlay.RemoveScroll.SlotClone", r = u, (a = h.forwardRef((e, t) => {
   let {
    children: n,
    ...a
   } = e, i = h.Children.toArray(n), o = i.find(ny);
   if (o) {
    let e = o.props.children,
     n = i.map(t => t !== o ? t : h.Children.count(e) > 1 ? h.Children.only(null) : h.isValidElement(e) ? e.props.children : null);
    return (0, p.jsx)(r, {
     ...a,
     ref: t,
     children: h.isValidElement(e) ? h.cloneElement(e, void 0, n) : null
    })
   }
   return (0, p.jsx)(r, {
    ...a,
    ref: t,
    children: n
   })
  })).displayName = "DialogOverlay.RemoveScroll.Slot", a),
  nR = h.forwardRef((e, t) => {
   let {
    __scopeDialog: n,
    ...r
   } = e, a = nj(nM, n);
   return (0, p.jsx)(te, {
    as: nO,
    allowPinchZoom: !0,
    shards: [a.contentRef],
    children: (0, p.jsx)(en.Primitive.div, {
     "data-state": nK(a.open),
     ...r,
     ref: t,
     style: {
      pointerEvents: "auto",
      ...r.style
     }
    })
   })
  }),
  nA = "DialogContent",
  nT = h.forwardRef((e, t) => {
   let n = nN(nA, e.__scopeDialog),
    {
     forceMount: r = n.forceMount,
     ...a
    } = e,
    i = nj(nA, e.__scopeDialog);
   return (0, p.jsx)(ng.Presence, {
    present: r || i.open,
    children: i.modal ? (0, p.jsx)(nD, {
     ...a,
     ref: t
    }) : (0, p.jsx)(nL, {
     ...a,
     ref: t
    })
   })
  });
 nT.displayName = nA;
 var nD = h.forwardRef((e, t) => {
   let n = nj(nA, e.__scopeDialog),
    r = h.useRef(null),
    a = (0, Y.useComposedRefs)(t, n.contentRef, r);
   return h.useEffect(() => {
    let e = r.current;
    if (e) return eN(e)
   }, []), (0, p.jsx)(nF, {
    ...e,
    ref: a,
    trapFocus: n.open,
    disableOutsidePointerEvents: !0,
    onCloseAutoFocus: (0, G.composeEventHandlers)(e.onCloseAutoFocus, e => {
     e.preventDefault(), n.triggerRef.current?.focus()
    }),
    onPointerDownOutside: (0, G.composeEventHandlers)(e.onPointerDownOutside, e => {
     let t = e.detail.originalEvent,
      n = 0 === t.button && !0 === t.ctrlKey;
     (2 === t.button || n) && e.preventDefault()
    }),
    onFocusOutside: (0, G.composeEventHandlers)(e.onFocusOutside, e => e.preventDefault())
   })
  }),
  nL = h.forwardRef((e, t) => {
   let n = nj(nA, e.__scopeDialog),
    r = h.useRef(!1),
    a = h.useRef(!1);
   return (0, p.jsx)(nF, {
    ...e,
    ref: t,
    trapFocus: !1,
    disableOutsidePointerEvents: !1,
    onCloseAutoFocus: t => {
     e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, a.current = !1
    },
    onInteractOutside: t => {
     e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, "pointerdown" === t.detail.originalEvent.type && (a.current = !0));
     let i = t.target;
     n.triggerRef.current?.contains(i) && t.preventDefault(), "focusin" === t.detail.originalEvent.type && a.current && t.preventDefault()
    }
   })
  }),
  nF = h.forwardRef((e, t) => {
   let {
    __scopeDialog: n,
    trapFocus: r,
    onOpenAutoFocus: a,
    onCloseAutoFocus: i,
    ...o
   } = e, s = nj(nA, n), l = h.useRef(null), u = (0, Y.useComposedRefs)(t, l);
   return ee(), (0, p.jsxs)(p.Fragment, {
    children: [(0, p.jsx)(es, {
     asChild: !0,
     loop: !0,
     trapped: r,
     onMountAutoFocus: a,
     onUnmountAutoFocus: i,
     children: (0, p.jsx)(J.DismissableLayer, {
      role: "dialog",
      id: s.contentId,
      "aria-describedby": s.descriptionId,
      "aria-labelledby": s.titleId,
      "data-state": nK(s.open),
      ...o,
      ref: u,
      onDismiss: () => s.onOpenChange(!1)
     })
    }), (0, p.jsxs)(p.Fragment, {
     children: [(0, p.jsx)(nY, {
      titleId: s.titleId
     }), (0, p.jsx)(nQ, {
      contentRef: l,
      descriptionId: s.descriptionId
     })]
    })]
   })
  }),
  nq = "DialogTitle",
  nH = h.forwardRef((e, t) => {
   let {
    __scopeDialog: n,
    ...r
   } = e, a = nj(nq, n);
   return (0, p.jsx)(en.Primitive.h2, {
    id: a.titleId,
    ...r,
    ref: t
   })
  });
 nH.displayName = nq;
 var nz = "DialogDescription",
  nB = h.forwardRef((e, t) => {
   let {
    __scopeDialog: n,
    ...r
   } = e, a = nj(nz, n);
   return (0, p.jsx)(en.Primitive.p, {
    id: a.descriptionId,
    ...r,
    ref: t
   })
  });
 nB.displayName = nz;
 var nV = "DialogClose",
  n$ = h.forwardRef((e, t) => {
   let {
    __scopeDialog: n,
    ...r
   } = e, a = nj(nV, n);
   return (0, p.jsx)(en.Primitive.button, {
    type: "button",
    ...r,
    ref: t,
    onClick: (0, G.composeEventHandlers)(e.onClick, () => a.onOpenChange(!1))
   })
  });

 function nK(e) {
  return e ? "open" : "closed"
 }
 n$.displayName = nV;
 var nU = "DialogTitleWarning",
  [nG, nW] = (0, Q.createContext)(nU, {
   contentName: nA,
   titleName: nq,
   docsSlug: "dialog"
  }),
  nY = ({
   titleId: e
  }) => {
   let t = nW(nU),
    n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
   return h.useEffect(() => {
    e && (document.getElementById(e) || console.error(n))
   }, [n, e]), null
  },
  nQ = ({
   contentRef: e,
   descriptionId: t
  }) => {
   let n = nW("DialogDescriptionWarning"),
    r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;
   return h.useEffect(() => {
    let n = e.current?.getAttribute("aria-describedby");
    t && n && (document.getElementById(t) || console.warn(r))
   }, [r, e, t]), null
  };
 let nX = (0, t1.default)("X", [
  ["path", {
   d: "M18 6 6 18",
   key: "1bl5f8"
  }],
  ["path", {
   d: "m6 6 12 12",
   key: "d8bk6v"
  }]
 ]);

 function nJ({
  ...e
 }) {
  return (0, p.jsx)(nE, {
   "data-slot": "dialog",
   ...e
  })
 }

 function nZ({
  ...e
 }) {
  return (0, p.jsx)(nP, {
   "data-slot": "dialog-portal",
   ...e
  })
 }

 function n0({
  className: e,
  ...t
 }) {
  return (0, p.jsx)(nI, {
   "data-slot": "dialog-overlay",
   className: (0, S.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-overlay fixed inset-0 isolate bg-black/70 duration-150", e),
   ...t
  })
 }

 function n1({
  className: e,
  children: t,
  showCloseButton: n = !0,
  ...r
 }) {
  return (0, p.jsxs)(nZ, {
   "data-slot": "dialog-portal",
   children: [(0, p.jsx)(n0, {}), (0, p.jsxs)(nT, {
    "data-slot": "dialog-content",
    className: (0, S.cn)("z-dialog bg-background fixed top-1/2 left-1/2 grid w-full max-w-[calc(100%-var(--s-contain)*2)] -translate-1/2 overflow-y-auto rounded-lg p-4 duration-200 outline-none sm:max-w-sm", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", e),
    ...r,
    children: [t, n && (0, p.jsxs)(n$, {
     "data-slot": "dialog-close",
     className: "ring-offset-accent absolute top-4 right-4 cursor-pointer rounded-xs opacity-70 transition-opacity duration-200 hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
     children: [(0, p.jsx)(nX, {}), (0, p.jsx)("span", {
      className: "sr-only",
      children: "Close"
     })]
    })]
   })]
  })
 }

 function n2({
  className: e,
  ...t
 }) {
  return (0, p.jsx)(nH, {
   "data-slot": "dialog-title",
   className: (0, S.cn)(e),
   ...t
  })
 }

 function n4({
  className: e,
  ...t
 }) {
  return (0, p.jsx)(nB, {
   "data-slot": "dialog-description",
   className: (0, S.cn)(e),
   ...t
  })
 }

 function n3({
  data: e
 }) {
  let {
   _id: t,
   title: n,
   description: r,
   note: a,
   contactForm: i,
   legalConsent: o
  } = e || {}, s = (0, m.usePathname)(), l = (0, m.useSearchParams)(), [u, c] = (0, h.useState)(!1);

  function d() {
   let e = `${s}${l.toString()?"?"+l.toString():""}`;
   window.history.replaceState(null, "", e), c(!1)
  }
  async function f(e) {
   let t = {
    ...e,
    LeadSource: "Website",
    UTM_Campaign__c: "sales-intake-form"
   };
   try {
    return await fetch("/api/salesforce/lead/create", {
     method: "POST",
     body: JSON.stringify(t)
    })
   } catch (e) {
    return e
   }
  }
  return (0, h.useEffect)(() => {
   "#contact" === window.location.hash && c(!0);
   let e = () => {
    c("#contact" === window.location.hash)
   };
   return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e)
  }, [l]), (0, p.jsx)(nJ, {
   defaultOpen: u,
   open: u,
   onOpenChange: d,
   children: (0, p.jsxs)(n1, {
    className: "lg:right-contain flex h-[calc(100dvh-32px)] gap-4 bg-transparent p-0 lg:top-4 lg:left-auto lg:h-[calc(100dvh-64px)] lg:max-w-[830px] lg:translate-x-0 lg:translate-y-0",
    showCloseButton: !1,
    children: [(0, p.jsxs)("div", {
     className: "bg-background text-green-5 hidden max-w-[350px] flex-1 flex-col space-y-4 rounded-lg p-4 pb-10 lg:flex",
     children: [(0, p.jsx)(N.BrandLogoStroke, {
      className: "text-green-5 relative mb-auto w-full"
     }), (0, p.jsx)(n2, {
      className: "t-h-2",
      children: n
     }), r && (0, p.jsx)(n4, {
      className: "t-h-4",
      children: r
     }), a && (0, p.jsxs)(p.Fragment, {
      children: [(0, p.jsx)(T, {
       className: "bg-white-3"
      }), (0, p.jsx)("p", {
       children: a
      })]
     })]
    }), i && (0, p.jsxs)("div", {
     className: "bg-green-6 flex w-full flex-1 flex-col overflow-x-auto rounded-lg px-6 py-4",
     children: [(0, p.jsxs)("div", {
      className: "mb-5.5 flex justify-between gap-1",
      children: [(0, p.jsx)(n2, {
       className: "text-green-1 t-h-1 lg:hidden",
       children: n
      }), (0, p.jsx)("p", {
       className: "text-green-1 hidden font-normal lg:inline-block",
       children: "* These fields are required to submit the form."
      }), (0, p.jsxs)(j.Button, {
       onClick: () => d(),
       className: "bg-green-5 text-green-2 self-start p-2.5 hover:bg-[color-mix(in_srgb,var(--color-green-5)_60%,var(--color-green-2))] lg:px-4.5 lg:py-4",
       children: [(0, p.jsx)(nm.default, {
        type: "x",
        className: "size-3"
       }), (0, p.jsx)("span", {
        className: "sr-only",
        children: "Close contact dialog"
       })]
      })]
     }), (0, p.jsx)(np, {
      data: {
       ...i,
       legalConsent: o
      },
      className: (0, S.cn)("text-green-1/50 flex flex-1 flex-col [&_label]:uppercase", "[&_input,&_textarea]:bg-green-5 [&_input,&_textarea]:placeholder:text-green-1/50 [&_input]:text-white", "**:data-[slot=select-trigger]:bg-green-5 **:data-[slot=select-trigger]:w-full", '[&_button[type="submit"]]:sticky [&_button[type="submit"]]:bottom-0 [&_button[type="submit"]]:w-full [&_button[type="submit"]]:sm:w-fit'),
      onSubmitForm: f,
      id: t
     })]
    })]
   })
  })
 }
 var n5 = e.i(839343),
  n6 = e.i(113182),
  n8 = e.i(60919),
  n9 = e.i(681083),
  n7 = e.i(393134),
  re = e.i(372626);

 function rt({
  className: e
 }) {
  return (0, p.jsx)("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   fill: "none",
   viewBox: "0 0 60 15",
   className: e,
   children: (0, p.jsx)("path", {
    fill: "currentColor",
    d: "M4.959 14.204C2.149 14.204 0 12.054 0 9.242c0-2.81 2.149-4.96 4.959-4.96 1.818 0 3.388.909 4.132 2.314l-1.818.993c-.414-.744-1.24-1.24-2.314-1.24-1.653 0-2.81 1.24-2.81 2.893 0 1.654 1.24 2.894 2.81 2.894 1.074 0 1.983-.496 2.479-1.405l1.9.91c-.743 1.57-2.396 2.563-4.38 2.563ZM36.19 4.45v9.695h-2.157V12.46c-.663 1.18-1.824 1.94-3.4 1.94-2.57 0-4.56-2.277-4.56-5.06 0-2.781 1.99-5.058 4.56-5.058 1.493 0 2.654.675 3.4 1.94V4.533h2.156V4.45Zm-2.24 4.805c0-1.686-1.244-2.95-2.902-2.95-1.659 0-2.903 1.349-2.903 2.95 0 1.687 1.327 2.951 2.903 2.951 1.658 0 2.902-1.264 2.902-2.95ZM41.923 14.204c-2.81 0-4.958-2.15-4.958-4.962 0-2.81 2.149-4.96 4.958-4.96 1.819 0 3.389.909 4.133 2.314l-1.819.993c-.413-.744-1.24-1.24-2.314-1.24-1.652 0-2.81 1.24-2.81 2.893 0 1.654 1.24 2.894 2.81 2.894 1.075 0 1.984-.496 2.48-1.405l1.9.91c-.743 1.57-2.396 2.563-4.38 2.563ZM19.456 9.242c0 2.812-2.15 4.962-4.962 4.962-2.811 0-4.96-2.15-4.96-4.962 0-2.81 2.149-4.96 4.96-4.96 2.729 0 4.962 2.15 4.962 4.96Zm-7.773 0c0 1.654 1.24 2.894 2.811 2.894s2.812-1.24 2.812-2.894c0-1.653-1.24-2.894-2.812-2.894-1.57.083-2.81 1.323-2.81 2.894ZM23.406 3.79c0-1.07.74-1.73 1.729-1.73h.74V.247C25.628.082 25.217 0 24.805 0c-2.057 0-3.54 1.318-3.54 3.626v.824h-1.81v2.142h1.81v7.416h2.141V6.592h2.47v-2.06h-2.47V3.79ZM52.918 12.38v-.165h-.74c-.988 0-1.729-.663-1.729-1.74V6.584h2.47v-2.07h-2.47V1.945h-2.14v2.568h-1.811v2.07h1.81v3.893c0 2.318 1.483 3.726 3.54 3.726.33 0 .741-.082 1.07-.165V12.38ZM59.533 6.36V4.364c-.247-.083-.577-.083-.907-.083-.908 0-1.981.665-2.394 1.58V4.448h-2.146v9.561h2.146V8.937c0-1.663 1.156-2.577 2.229-2.577h1.072Z"
   })
  })
 }
 var rn = e.i(448773),
  rr = e.i(824511);

 function ra({
  items: e = [],
  className: t,
  variants: n
 }) {
  let r = (0, m.usePathname)();
  return (0, S.hasArrayValue)(e) ? (0, p.jsx)("ul", {
   className: t || "",
   children: e.map(e => {
    let {
     _key: t
    } = e || {}, a = (0, S.checkIfLinkIsActive)({
     pathName: r,
     url: e?.href
    });
    if (e || (0, S.hasValidCta)(e)) return (0, p.jsx)(rr.m.li, {
     className: (0, S.cn)("relative", {
      "is-active": a
     }),
     variants: n,
     children: (0, p.jsx)(rn.default, {
      link: e,
      children: e.label
     })
    }, t)
   })
  }) : null
 }
 var ri = e.i(908223),
  ro = e.i(892159),
  rs = e.i(88653),
  rl = e.i(449492),
  ru = e.i(387652),
  rc = e.i(887652),
  rd = e.i(895420);
 let rf = {
   duration: .2,
   ease: "easeInOut"
  },
  rp = "rgb(from var(--color-foreground-muted) r g b / 0.3)",
  rh = "rgb(from var(--color-foreground-muted) r g b / 1)",
  rm = {
   inactive: {
    color: rp
   },
   active: {
    color: rh
   }
  },
  rg = {
   inactive: {
    backgroundColor: rp
   },
   active: e => ({
    backgroundColor: rh,
    width: e ? "32px" : "36px"
   })
  },
  rv = rr.m.create(rn.default);

 function ry({
  solutions: e = [],
  label: t,
  labelColor: n = "text-green-2",
  progressColor: r = "bg-green-3",
  autoplayDuration: a = 5,
  pauseOnHover: i = !0,
  type: o = "full",
  className: s,
  children: l,
  ...u
 }) {
  let c, d, f, m = e?.length === 1,
   {
    isTouchDevice: g
   } = (0, n9.default)(),
   [v, y] = (0, h.useState)(0),
   [b, w] = (0, h.useState)(null),
   x = (0, rc.useMotionValue)(0),
   _ = (0, rd.useTransform)(x, e => (e - 1) * 100 + "%"),
   [j, E] = (0, h.useState)(0),
   C = (0, h.useRef)(null),
   k = (0, ru.useInView)(C, n6.IN_VIEW_CONFIG);
  (0, h.useEffect)(() => {
   let t = !g && i && null !== b;
   if (!k || t || !(0, S.hasArrayValue)(e) || e.length <= 1) return void x.stop();
   let n = 1e3 * a,
    r = (1 - x.get()) * n,
    o = (0, rl.animate)(x, 1, {
     duration: r / 1e3,
     ease: "linear",
     onComplete: () => {
      x.set(0), y(t => (t + 1) % e.length)
     }
    });
   return () => o.stop()
  }, [k, b, v, e?.length, a, i, j, g, x]);
  let N = (e, t = !1) => {
    (e !== v || t) && (x.stop(), x.set(0), y(e), E(e => e + 1))
   },
   P = "full" === o;
  return (0, p.jsxs)(rr.m.div, {
   ref: C,
   className: (0, S.cn)("relative", s),
   ...u,
   children: [t && (0, p.jsx)(rr.m.h3, {
    className: (0, S.cn)("t-l-1", n, P ? "mb-4" : "mb-2"),
    variants: n6.fadeMoveAnim,
    children: t
   }), (0, S.hasArrayValue)(e) && (0, p.jsxs)(rr.m.div, {
    className: (0, S.cn)(P ? "grid grid-cols-[auto_1fr] max-md:gap-x-6 max-md:gap-y-4 max-md:px-2 md:flex md:flex-col md:gap-4" : "flex flex-col gap-2 md:gap-3"),
    variants: n6.fadeMoveAnim,
    children: [m || P ? (c = e[v], d = !!c.link?.href, f = (0, p.jsx)(ro.default, {
     icon: c.icon,
     className: "size-15",
     animate: {
      backgroundColor: c.iconColor?.hex
     },
     transition: {
      ...n6.dotButtonMorphAnim.transition,
      bounce: 0
     }
    }), d ? (0, p.jsx)(rn.default, {
     link: c.link,
     "aria-label": "Link to: " + c.title,
     className: "cursor-pointer",
     children: f
    }) : f) : (0, p.jsx)("div", {
     className: "flex gap-2",
     children: e.map((e, t) => {
      let n = t === v;
      return (0, p.jsx)(rr.m.button, {
       onTap: () => N(t, !0),
       "aria-label": "Show solution: " + e.title,
       className: "cursor-pointer",
       children: (0, p.jsx)(ro.default, {
        icon: e.icon,
        className: (0, S.cn)("size-15 border"),
        animate: {
         backgroundColor: n ? e.iconColor?.hex : "rgba(0,0,0,0)",
         color: n ? "var(--color-foreground)" : "var(--color-foreground-muted)",
         borderColor: n ? "rgba(0,0,0,0)" : "var(--color-foreground-muted)"
        },
        transition: n6.dotButtonMorphAnim.transition
       })
      }, e._key || t)
     })
    }), (0, p.jsx)("div", {
     className: (0, S.cn)("flex flex-col items-start", P ? "max-md:gap-1" : "md:gap-1"),
     children: m ? e[0]?.title && (0, p.jsx)("h3", {
      className: (0, S.cn)("text-left", P ? "t-h-3 xl:t-h-3 lg:text-[18px]" : "t-l-2"),
      children: e[0].title
     }) : e.map((e, t) => {
      if (!e.title) return;
      let n = !!e.link?.href,
       r = n ? rv : rr.m.button;
      return (0, p.jsx)(r, {
       className: (0, S.cn)("increase-target-size relative cursor-pointer text-left", P ? "t-h-3 xl:t-h-3 lg:text-[18px]" : "t-l-2"),
       "aria-label": (n ? "Link to: " : "Show solution: ") + e.title,
       ...n && {
        link: e.link
       },
       onHoverStart: () => {
        N(t), w(t)
       },
       onHoverEnd: () => w(null),
       variants: rm,
       initial: "inactive",
       animate: null !== b ? t === b ? "active" : "inactive" : v === t ? "active" : "inactive",
       transition: v === t ? n6.dotButtonMorphAnim.transition : rf,
       children: e.title
      }, e._key || t)
     })
    }), !m && (0, p.jsx)("div", {
     className: (0, S.cn)("flex", P ? "max-md:justify-between md:gap-2" : "gap-2"),
     children: e.map((e, t) => e.title && (0, p.jsx)(rr.m.button, {
      className: (0, S.cn)("increase-target-size relative h-2 w-2 cursor-pointer rounded-full"),
      "aria-label": "Show solution: " + e.title,
      onTap: () => N(t, !0),
      onHoverStart: () => {
       N(t), w(t)
      },
      onHoverEnd: () => w(null),
      variants: rg,
      custom: P,
      initial: "inactive",
      animate: v === t ? "active" : "inactive",
      transition: n6.dotButtonMorphAnim.transition,
      children: v === t && (0, p.jsx)("div", {
       className: "absolute inset-0 overflow-hidden rounded-[inherit]",
       children: (0, p.jsx)(rr.m.span, {
        className: (0, S.cn)("bg-green-3 absolute inset-0 rounded-[inherit] will-change-transform", r),
        style: {
         translateX: _
        }
       })
      })
     }, e._key || t))
    }), P && (0, p.jsxs)("div", {
     className: "relative grid max-w-xs overflow-hidden max-md:-mt-[calc(1.3em-1em)]",
     children: [e.map((e, t) => (0, p.jsx)("p", {
      className: "pointer-events-none invisible col-start-1 row-start-1 text-balance whitespace-pre-line",
      "aria-hidden": "true",
      children: e.subtitle
     }, `ghost-solution-card-${t}`)), (0, p.jsx)(rs.AnimatePresence, {
      mode: "popLayout",
      children: e[v].subtitle && (0, p.jsx)(rr.m.p, {
       className: "col-start-1 row-start-1 text-balance whitespace-pre-line",
       variants: n6.fadeBlurAnim,
       initial: "hide",
       animate: "show",
       exit: "hide",
       transition: {
        ...n6.dotButtonMorphAnim.transition,
        bounce: 0
       },
       children: e[v].subtitle
      }, v)
     })]
    })]
   }), l]
  })
 }
 var rb = e.i(697347),
  rw = e.i(649125);
 let rx = (0, S.cn)("[&_li]:hover:text-white-1 [&_li]:transition-colors [&_li]:duration-300 [&_li]:ease-out"),
  r_ = {
   container: (0, S.cn)("grid md:grid-cols-12 md:grid-rows-[auto_auto_1fr] lg:grid-rows-2"),
   menuSection: (0, S.cn)("md:col-span-7 lg:col-span-5"),
   ctaBlockSection: (0, S.cn)("md:col-span-7 md:row-start-3 lg:col-span-5 lg:row-start-2"),
   solutionSection: (0, S.cn)("md:col-span-7 lg:col-span-3 xl:col-span-4"),
   footnoteSection: (0, S.cn)("md:col-span-5 md:-col-end-1 md:row-start-3 lg:col-span-7 lg:row-start-2"),
   bannerSection: (0, S.cn)("row-start-1 md:col-span-5 md:-col-end-1 lg:col-span-4 lg:-col-end-1 xl:col-span-3 xl:-col-end-1")
  };

 function rj({
  data: e
 }) {
  let {
   title: t,
   callToActionLeft: n,
   callToActionRight: r
  } = e || {}, a = (0, n8.useInViewAnimation)(n6.fadeAnim), i = (0, n8.useInViewAnimation)(n6.fadeMoveAnim);
  if (e) return (0, p.jsxs)("div", {
   className: "p-x-md border-white-3 relative flex h-[Min(calc(var(--s-vp-height)*0.8),var(--h-vp-height-max))] flex-col items-center justify-center gap-6 overflow-hidden border-t py-10 text-center",
   children: [(0, p.jsx)(ri.default, {
    transition: {
     ...n6.fadeAnim.transition,
     delay: .5
    },
    ...a
   }), t && (0, p.jsx)(rw.default, {
    children: (0, p.jsx)("h2", {
     className: "t-h-3 max-w-sm text-[24px]! text-balance",
     children: t
    })
   }), ((0, S.hasValidCta)(n) || (0, S.hasValidCta)(r)) && (0, p.jsxs)(rr.m.div, {
    className: "flex gap-4",
    ...i,
    children: [(0, S.hasValidCta)(n) && (0, p.jsx)(j.Button, {
     asChild: !0,
     tone: "white",
     children: (0, p.jsx)(rn.default, {
      link: n,
      children: n.label
     })
    }), (0, S.hasValidCta)(r) && (0, p.jsx)(j.Button, {
     asChild: !0,
     shape: "rounded",
     children: (0, p.jsx)(rn.default, {
      link: r,
      children: r.label
     })
    })]
   })]
  })
 }
 let rE = ({
  type: e,
  delay: t,
  className: n,
  style: r,
  isFooterInView: a
 }) => (0, p.jsx)(rr.m.hr, {
  className: n,
  style: r,
  variants: (0, n6.lineDrawAnim)({
   type: e,
   duration: .6,
   delay: t
  }),
  initial: "hide",
  animate: a ? "show" : "hide"
 });

 function rS({
  data: e
 }) {
  let {
   footerEditorial: t,
   siteName: n,
   menus: r,
   menuLegal: a,
   solutionsLabel: i,
   solutionCards: o,
   pauseSolutionsCarouselOnHover: s,
   bannerTexts: l,
   ctaBlockLabel: u,
   ctaTitle: c,
   ctaButton: d,
   copyright: f,
   bannerAutoplayDuration: m,
   solutionAutoplayDuration: g,
   bannerIsLogoAnimationLoop: v
  } = e || {}, {
   pageType: y
  } = (0, b.useAppSelector)(e => e.globalSettings), w = (0, h.useRef)(null), x = (0, h.useRef)(null), [_, E] = (0, h.useState)(0), C = (0, h.useRef)(null), {
   isMobile: k
  } = (0, n9.default)(), P = .6 * !k, M = (0, ru.useInView)(C, n6.IN_VIEW_CONFIG), I = (e = .05) => ({
   show: {
    transition: {
     delayChildren: P,
     staggerChildren: e
    }
   }
  }), O = {
   margin: "0px 0px 0% 0px",
   once: !0
  }, R = (0, n8.useInViewAnimation)(I(.02)), A = (0, n8.useInViewAnimation)(I(), O), T = (0, n8.useInViewAnimation)(I()), D = (0, n8.useInViewAnimation)(n6.fadeAnim), L = (0, n8.useInViewAnimation)(I(), O);
  return (0, h.useEffect)(() => {
   let e = () => {
    C.current && document.documentElement.style.setProperty("--h-footer", `${C.current.offsetHeight}px`)
   };
   e();
   let t = new ResizeObserver(e);
   return C.current && t.observe(C.current), () => t.disconnect()
  }, []), (0, h.useEffect)(() => {
   let e = () => {
    x.current && w.current && E(x.current.offsetWidth - w.current.offsetWidth)
   };
   e();
   let t = new ResizeObserver(e);
   return x.current && t.observe(x.current), w.current && t.observe(w.current), () => t.disconnect()
  }, []), (0, p.jsxs)(p.Fragment, {
   children: [y !== n5.PAGE_TYPE_NOT_FOUND && (0, p.jsx)(rj, {
    data: t
   }), (0, p.jsxs)("footer", {
    ref: C,
    className: (0, S.cn)("[--l-footer-pad:16px]", "text-foreground-muted bg-green-5 isolate", "relative", "md:p-(--l-footer-pad)", r_.container),
    children: [(0, p.jsx)(n7.default, {}), (0, p.jsxs)(rr.m.div, {
     className: (0, S.cn)("relative grid gap-x-3", "max-md:grid-cols-2 max-md:gap-y-10 max-md:px-(--l-footer-pad) max-md:py-6", "md:flex md:flex-wrap md:gap-x-10 md:pt-2 md:pr-4 md:pb-4", "xl:gap-x-20", r_.menuSection),
     ...R,
     children: [(0, S.hasArrayValue)(r) && r.map((e, t) => (0, p.jsxs)("div", {
      children: [e.title && (0, p.jsx)(rr.m.span, {
       className: "t-l-1 text-green-2 mb-4 block",
       variants: n6.fadeMoveAnim,
       children: e.title
      }), (0, S.hasArrayValue)(e?.items) && (0, p.jsx)(ra, {
       items: e.items,
       className: (0, S.cn)("t-h-4 flex flex-col", rx),
       variants: n6.fadeMoveAnim
      })]
     }, e._key || t)), (0, p.jsx)(rE, {
      className: (0, S.cn)("border-border absolute bottom-0 left-(--l-footer-pad) h-px w-[calc(100%-var(--l-footer-pad)*2)]", "md:left-0 md:w-[calc(100%-var(--l-footer-pad))]"),
      type: "horizontal",
      isFooterInView: M
     }), (0, p.jsx)(rE, {
      className: (0, S.cn)("bg-border absolute top-0 right-0 h-[calc(var(--h-footer)-var(--l-footer-pad)*2)] w-px border-none", "max-md:hidden"),
      type: "vertical",
      delay: 0,
      isFooterInView: M
     })]
    }), (0, p.jsx)(ry, {
     solutions: o,
     label: i,
     autoplayDuration: g,
     pauseOnHover: s,
     type: "full",
     className: (0, S.cn)("max-lg:py-6 max-md:px-(--l-footer-pad)", "lg:pt-2 lg:pb-4 lg:pl-(--l-footer-pad)", r_.solutionSection),
     transition: {
      duration: 1,
      delay: P
     },
     ...T,
     children: (0, p.jsx)(rE, {
      className: "border-border absolute bottom-0 left-(--l-footer-pad) h-px w-[calc(100%-var(--l-footer-pad)*2)] md:left-0 md:w-[calc(100%-var(--l-footer-pad))] lg:left-(--l-footer-pad) lg:w-[calc(var(--l-dynamic-hr-width)-var(--l-footer-pad))]",
      style: {
       "--l-dynamic-hr-width": `${_}px`
      },
      type: "horizontal-reversed",
      isFooterInView: M
     })
    }), (0, p.jsx)(rr.m.div, {
     ref: w,
     className: (0, S.cn)("text-green-1 bg-blue relative flex items-center justify-center overflow-hidden", "before:block before:pt-[100%]", "md:-mt-(--l-footer-pad) md:-mr-(--l-footer-pad) md:w-full md:justify-self-end lg:max-w-90", r_.bannerSection),
     ...D,
     transition: {
      duration: .6,
      delay: P
     },
     children: (0, p.jsxs)("div", {
      className: "absolute inset-0 flex items-center justify-center",
      children: [(0, p.jsx)(rb.default, {
       texts: l,
       interval: 1e3 * m
      }), (0, p.jsx)(re.default, {
       className: "pointer-events-none absolute size-[115%]",
       loop: v,
       initialDelay: 1.2 * !k
      })]
     })
    }), (0, p.jsxs)(rr.m.div, {
     className: (0, S.cn)("relative flex flex-col justify-between py-6", "max-md:px-(--l-footer-pad)", "md:pr-(--l-footer-pad)", r_.ctaBlockSection),
     ...A,
     children: [(0, p.jsxs)("div", {
      children: [u && (0, p.jsx)(rr.m.span, {
       className: "t-l-1 text-green-2 mb-4 block",
       variants: n6.fadeMoveAnim,
       children: u
      }), c && (0, p.jsx)(rr.m.h2, {
       className: "t-h-2 mb-6 whitespace-pre-line",
       variants: n6.fadeMoveAnim,
       children: c
      }), (0, S.hasValidCta)(d) && (0, p.jsx)(rr.m.div, {
       variants: n6.fadeMoveAnim,
       children: (0, p.jsx)(j.Button, {
        asChild: !0,
        shape: "rounded",
        children: (0, p.jsx)(rn.default, {
         link: d,
         children: d.label
        })
       })
      })]
     }), (0, p.jsx)("hr", {
      className: "border-border my-6 h-px w-full md:invisible"
     }), (0, S.hasArrayValue)(a?.items) && (0, p.jsx)(ra, {
      items: a.items,
      className: (0, S.cn)("t-l-1 grid flex-wrap gap-(--l-footer-pad) max-md:grid-cols-2 md:flex md:gap-x-4 md:gap-y-2 xl:gap-6", rx),
      variants: n6.fadeMoveAnim
     })]
    }), (0, p.jsxs)(rr.m.div, {
     ref: x,
     className: (0, S.cn)("text-green-2 t-l-1 flex flex-col-reverse", "max-md:px-(--l-footer-pad) max-md:pt-(--l-footer-pad) max-md:pb-6", "max-xl:gap-(--l-footer-pad)", "md:py-6 md:pl-(--l-footer-pad)", "lg:grid lg:grid-cols-subgrid lg:items-end", r_.footnoteSection),
     ...L,
     children: [(0, p.jsx)(rr.m.div, {
      className: "w-fit",
      variants: n6.fadeMoveAnim,
      children: (0, p.jsxs)(rn.default, {
       link: {
        href: "/"
       },
       className: "inline-block",
       children: [(0, p.jsx)(rt, {
        className: "h-auto w-[220px]"
       }), (0, p.jsx)("span", {
        className: "sr-only",
        children: n
       })]
      })
     }), (0, p.jsxs)(rr.m.div, {
      className: (0, S.cn)("t-l-1 flex w-full max-w-90 items-center gap-4", "md:col-span-6 md:col-start-5 md:-mr-(--l-footer-pad) md:justify-self-end md:pr-(--l-footer-pad)", "lg:col-span-4 lg:-col-end-1 xl:col-span-3 xl:-col-end-1"),
      variants: n6.fadeMoveAnim,
      children: [(0, p.jsxs)(rn.default, {
       link: {
        href: "/"
       },
       children: [(0, p.jsx)(N.BrandLogo, {
        className: "h-9 w-9"
       }), (0, p.jsx)("span", {
        className: "sr-only",
        children: n
       })]
      }), `\xa9 ${new Date().getFullYear()} ${f} ${n??"Envizzon EV"}`]
     })]
    })]
   })]
  })
 }
 var rC = e.i(21206),
  rk = e.i(607514),
  rN = e.i(842727),
  rP = Symbol("radix.slottable");

 function rM(e) {
  return h.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === rP
 }
 var rI = ["Enter", " "],
  rO = ["ArrowUp", "PageDown", "End"],
  rR = ["ArrowDown", "PageUp", "Home", ...rO],
  rA = {
   ltr: [...rI, "ArrowRight"],
   rtl: [...rI, "ArrowLeft"]
  },
  rT = {
   ltr: ["ArrowLeft"],
   rtl: ["ArrowRight"]
  },
  rD = "Menu",
  [rL, rF, rq] = (0, W.createCollection)(rD),
  [rH, rz] = (0, Q.createContextScope)(rD, [rq, eh.createPopperScope, rN.createRovingFocusGroupScope]),
  rB = (0, eh.createPopperScope)(),
  rV = (0, rN.createRovingFocusGroupScope)(),
  [r$, rK] = rH(rD),
  [rU, rG] = rH(rD),
  rW = e => {
   let {
    __scopeMenu: t,
    open: n = !1,
    children: r,
    dir: a,
    onOpenChange: i,
    modal: o = !0
   } = e, s = rB(t), [l, u] = h.useState(null), c = h.useRef(!1), d = (0, er.useCallbackRef)(i), f = (0, X.useDirection)(a);
   return h.useEffect(() => {
    let e = () => {
      c.current = !0, document.addEventListener("pointerdown", t, {
       capture: !0,
       once: !0
      }), document.addEventListener("pointermove", t, {
       capture: !0,
       once: !0
      })
     },
     t = () => c.current = !1;
    return document.addEventListener("keydown", e, {
     capture: !0
    }), () => {
     document.removeEventListener("keydown", e, {
      capture: !0
     }), document.removeEventListener("pointerdown", t, {
      capture: !0
     }), document.removeEventListener("pointermove", t, {
      capture: !0
     })
    }
   }, []), (0, p.jsx)(eh.Root, {
    ...s,
    children: (0, p.jsx)(r$, {
     scope: t,
     open: n,
     onOpenChange: d,
     content: l,
     onContentChange: u,
     children: (0, p.jsx)(rU, {
      scope: t,
      onClose: h.useCallback(() => d(!1), [d]),
      isUsingKeyboardRef: c,
      dir: f,
      modal: o,
      children: r
     })
    })
   })
  };
 rW.displayName = rD;
 var rY = h.forwardRef((e, t) => {
  let {
   __scopeMenu: n,
   ...r
  } = e, a = rB(n);
  return (0, p.jsx)(eh.Anchor, {
   ...a,
   ...r,
   ref: t
  })
 });
 rY.displayName = "MenuAnchor";
 var rQ = "MenuPortal",
  [rX, rJ] = rH(rQ, {
   forceMount: void 0
  }),
  rZ = e => {
   let {
    __scopeMenu: t,
    forceMount: n,
    children: r,
    container: a
   } = e, i = rK(rQ, t);
   return (0, p.jsx)(rX, {
    scope: t,
    forceMount: n,
    children: (0, p.jsx)(ng.Presence, {
     present: n || i.open,
     children: (0, p.jsx)(em.Portal, {
      asChild: !0,
      container: a,
      children: r
     })
    })
   })
  };
 rZ.displayName = rQ;
 var r0 = "MenuContent",
  [r1, r2] = rH(r0),
  r4 = h.forwardRef((e, t) => {
   let n = rJ(r0, e.__scopeMenu),
    {
     forceMount: r = n.forceMount,
     ...a
    } = e,
    i = rK(r0, e.__scopeMenu),
    o = rG(r0, e.__scopeMenu);
   return (0, p.jsx)(rL.Provider, {
    scope: e.__scopeMenu,
    children: (0, p.jsx)(ng.Presence, {
     present: r || i.open,
     children: (0, p.jsx)(rL.Slot, {
      scope: e.__scopeMenu,
      children: o.modal ? (0, p.jsx)(r3, {
       ...a,
       ref: t
      }) : (0, p.jsx)(r5, {
       ...a,
       ref: t
      })
     })
    })
   })
  }),
  r3 = h.forwardRef((e, t) => {
   let n = rK(r0, e.__scopeMenu),
    r = h.useRef(null),
    a = (0, Y.useComposedRefs)(t, r);
   return h.useEffect(() => {
    let e = r.current;
    if (e) return eN(e)
   }, []), (0, p.jsx)(r8, {
    ...e,
    ref: a,
    trapFocus: n.open,
    disableOutsidePointerEvents: n.open,
    disableOutsideScroll: !0,
    onFocusOutside: (0, G.composeEventHandlers)(e.onFocusOutside, e => e.preventDefault(), {
     checkForDefaultPrevented: !1
    }),
    onDismiss: () => n.onOpenChange(!1)
   })
  }),
  r5 = h.forwardRef((e, t) => {
   let n = rK(r0, e.__scopeMenu);
   return (0, p.jsx)(r8, {
    ...e,
    ref: t,
    trapFocus: !1,
    disableOutsidePointerEvents: !1,
    disableOutsideScroll: !1,
    onDismiss: () => n.onOpenChange(!1)
   })
  }),
  r6 = ((c = h.forwardRef((e, t) => {
   let {
    children: n,
    ...r
   } = e;
   if (h.isValidElement(n)) {
    var a;
    let e, i, o = (a = n, (i = (e = Object.getOwnPropertyDescriptor(a.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.ref : (i = (e = Object.getOwnPropertyDescriptor(a, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.props.ref : a.props.ref || a.ref),
     s = function(e, t) {
      let n = {
       ...t
      };
      for (let r in t) {
       let a = e[r],
        i = t[r];
       /^on[A-Z]/.test(r) ? a && i ? n[r] = (...e) => {
        let t = i(...e);
        return a(...e), t
       } : a && (n[r] = a) : "style" === r ? n[r] = {
        ...a,
        ...i
       } : "className" === r && (n[r] = [a, i].filter(Boolean).join(" "))
      }
      return {
       ...e,
       ...n
      }
     }(r, n.props);
    return n.type !== h.Fragment && (s.ref = t ? (0, Y.composeRefs)(t, o) : o), h.cloneElement(n, s)
   }
   return h.Children.count(n) > 1 ? h.Children.only(null) : null
  })).displayName = "MenuContent.ScrollLock.SlotClone", i = c, (o = h.forwardRef((e, t) => {
   let {
    children: n,
    ...r
   } = e, a = h.Children.toArray(n), o = a.find(rM);
   if (o) {
    let e = o.props.children,
     n = a.map(t => t !== o ? t : h.Children.count(e) > 1 ? h.Children.only(null) : h.isValidElement(e) ? e.props.children : null);
    return (0, p.jsx)(i, {
     ...r,
     ref: t,
     children: h.isValidElement(e) ? h.cloneElement(e, void 0, n) : null
    })
   }
   return (0, p.jsx)(i, {
    ...r,
    ref: t,
    children: n
   })
  })).displayName = "MenuContent.ScrollLock.Slot", o),
  r8 = h.forwardRef((e, t) => {
   let {
    __scopeMenu: n,
    loop: r = !1,
    trapFocus: a,
    onOpenAutoFocus: i,
    onCloseAutoFocus: o,
    disableOutsidePointerEvents: s,
    onEntryFocus: l,
    onEscapeKeyDown: u,
    onPointerDownOutside: c,
    onFocusOutside: d,
    onInteractOutside: f,
    onDismiss: m,
    disableOutsideScroll: g,
    ...v
   } = e, y = rK(r0, n), b = rG(r0, n), w = rB(n), x = rV(n), _ = rF(n), [j, E] = h.useState(null), S = h.useRef(null), C = (0, Y.useComposedRefs)(t, S, y.onContentChange), k = h.useRef(0), N = h.useRef(""), P = h.useRef(0), M = h.useRef(null), I = h.useRef("right"), O = h.useRef(0), R = g ? te : h.Fragment;
   h.useEffect(() => () => window.clearTimeout(k.current), []), ee();
   let A = h.useCallback(e => {
    var t, n;
    return I.current === M.current?.side && (t = e, !!(n = M.current?.area) && function(e, t) {
     let {
      x: n,
      y: r
     } = e, a = !1;
     for (let e = 0, i = t.length - 1; e < t.length; i = e++) {
      let o = t[e],
       s = t[i],
       l = o.x,
       u = o.y,
       c = s.x,
       d = s.y;
      u > r != d > r && n < (c - l) * (r - u) / (d - u) + l && (a = !a)
     }
     return a
    }({
     x: t.clientX,
     y: t.clientY
    }, n))
   }, []);
   return (0, p.jsx)(r1, {
    scope: n,
    searchRef: N,
    onItemEnter: h.useCallback(e => {
     A(e) && e.preventDefault()
    }, [A]),
    onItemLeave: h.useCallback(e => {
     A(e) || (S.current?.focus(), E(null))
    }, [A]),
    onTriggerLeave: h.useCallback(e => {
     A(e) && e.preventDefault()
    }, [A]),
    pointerGraceTimerRef: P,
    onPointerGraceIntentChange: h.useCallback(e => {
     M.current = e
    }, []),
    children: (0, p.jsx)(R, {
     ...g ? {
      as: r6,
      allowPinchZoom: !0
     } : void 0,
     children: (0, p.jsx)(es, {
      asChild: !0,
      trapped: a,
      onMountAutoFocus: (0, G.composeEventHandlers)(i, e => {
       e.preventDefault(), S.current?.focus({
        preventScroll: !0
       })
      }),
      onUnmountAutoFocus: o,
      children: (0, p.jsx)(J.DismissableLayer, {
       asChild: !0,
       disableOutsidePointerEvents: s,
       onEscapeKeyDown: u,
       onPointerDownOutside: c,
       onFocusOutside: d,
       onInteractOutside: f,
       onDismiss: m,
       children: (0, p.jsx)(rN.Root, {
        asChild: !0,
        ...x,
        dir: b.dir,
        orientation: "vertical",
        loop: r,
        currentTabStopId: j,
        onCurrentTabStopIdChange: E,
        onEntryFocus: (0, G.composeEventHandlers)(l, e => {
         b.isUsingKeyboardRef.current || e.preventDefault()
        }),
        preventScrollOnEntryFocus: !0,
        children: (0, p.jsx)(eh.Content, {
         role: "menu",
         "aria-orientation": "vertical",
         "data-state": aj(y.open),
         "data-radix-menu-content": "",
         dir: b.dir,
         ...w,
         ...v,
         ref: C,
         style: {
          outline: "none",
          ...v.style
         },
         onKeyDown: (0, G.composeEventHandlers)(v.onKeyDown, e => {
          let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget,
           n = e.ctrlKey || e.altKey || e.metaKey,
           r = 1 === e.key.length;
          if (t) {
           var a;
           let t, i, o, s, l, u;
           "Tab" === e.key && e.preventDefault(), !n && r && (a = e.key, t = N.current + a, i = _().filter(e => !e.disabled), o = document.activeElement, s = i.find(e => e.ref.current === o)?.textValue, l = function(e, t, n) {
            var r;
            let a = t.length > 1 && Array.from(t).every(e => e === t[0]) ? t[0] : t,
             i = n ? e.indexOf(n) : -1,
             o = (r = Math.max(i, 0), e.map((t, n) => e[(r + n) % e.length]));
            1 === a.length && (o = o.filter(e => e !== n));
            let s = o.find(e => e.toLowerCase().startsWith(a.toLowerCase()));
            return s !== n ? s : void 0
           }(i.map(e => e.textValue), t, s), u = i.find(e => e.textValue === l)?.ref.current, function e(t) {
            N.current = t, window.clearTimeout(k.current), "" !== t && (k.current = window.setTimeout(() => e(""), 1e3))
           }(t), u && setTimeout(() => u.focus()))
          }
          let i = S.current;
          if (e.target !== i || !rR.includes(e.key)) return;
          e.preventDefault();
          let o = _().filter(e => !e.disabled).map(e => e.ref.current);
          rO.includes(e.key) && o.reverse(),
           function(e) {
            let t = document.activeElement;
            for (let n of e)
             if (n === t || (n.focus(), document.activeElement !== t)) return
           }(o)
         }),
         onBlur: (0, G.composeEventHandlers)(e.onBlur, e => {
          e.currentTarget.contains(e.target) || (window.clearTimeout(k.current), N.current = "")
         }),
         onPointerMove: (0, G.composeEventHandlers)(e.onPointerMove, aC(e => {
          let t = e.target,
           n = O.current !== e.clientX;
          e.currentTarget.contains(t) && n && (I.current = e.clientX > O.current ? "right" : "left", O.current = e.clientX)
         }))
        })
       })
      })
     })
    })
   })
  });
 r4.displayName = r0;
 var r9 = h.forwardRef((e, t) => {
  let {
   __scopeMenu: n,
   ...r
  } = e;
  return (0, p.jsx)(en.Primitive.div, {
   role: "group",
   ...r,
   ref: t
  })
 });
 r9.displayName = "MenuGroup";
 var r7 = h.forwardRef((e, t) => {
  let {
   __scopeMenu: n,
   ...r
  } = e;
  return (0, p.jsx)(en.Primitive.div, {
   ...r,
   ref: t
  })
 });
 r7.displayName = "MenuLabel";
 var ae = "MenuItem",
  at = "menu.itemSelect",
  an = h.forwardRef((e, t) => {
   let {
    disabled: n = !1,
    onSelect: r,
    ...a
   } = e, i = h.useRef(null), o = rG(ae, e.__scopeMenu), s = r2(ae, e.__scopeMenu), l = (0, Y.useComposedRefs)(t, i), u = h.useRef(!1);
   return (0, p.jsx)(ar, {
    ...a,
    ref: l,
    disabled: n,
    onClick: (0, G.composeEventHandlers)(e.onClick, () => {
     let e = i.current;
     if (!n && e) {
      let t = new CustomEvent(at, {
       bubbles: !0,
       cancelable: !0
      });
      e.addEventListener(at, e => r?.(e), {
       once: !0
      }), (0, en.dispatchDiscreteCustomEvent)(e, t), t.defaultPrevented ? u.current = !1 : o.onClose()
     }
    }),
    onPointerDown: t => {
     e.onPointerDown?.(t), u.current = !0
    },
    onPointerUp: (0, G.composeEventHandlers)(e.onPointerUp, e => {
     u.current || e.currentTarget?.click()
    }),
    onKeyDown: (0, G.composeEventHandlers)(e.onKeyDown, e => {
     let t = "" !== s.searchRef.current;
     n || t && " " === e.key || rI.includes(e.key) && (e.currentTarget.click(), e.preventDefault())
    })
   })
  });
 an.displayName = ae;
 var ar = h.forwardRef((e, t) => {
   let {
    __scopeMenu: n,
    disabled: r = !1,
    textValue: a,
    ...i
   } = e, o = r2(ae, n), s = rV(n), l = h.useRef(null), u = (0, Y.useComposedRefs)(t, l), [c, d] = h.useState(!1), [f, m] = h.useState("");
   return h.useEffect(() => {
    let e = l.current;
    e && m((e.textContent ?? "").trim())
   }, [i.children]), (0, p.jsx)(rL.ItemSlot, {
    scope: n,
    disabled: r,
    textValue: a ?? f,
    children: (0, p.jsx)(rN.Item, {
     asChild: !0,
     ...s,
     focusable: !r,
     children: (0, p.jsx)(en.Primitive.div, {
      role: "menuitem",
      "data-highlighted": c ? "" : void 0,
      "aria-disabled": r || void 0,
      "data-disabled": r ? "" : void 0,
      ...i,
      ref: u,
      onPointerMove: (0, G.composeEventHandlers)(e.onPointerMove, aC(e => {
       r ? o.onItemLeave(e) : (o.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({
        preventScroll: !0
       }))
      })),
      onPointerLeave: (0, G.composeEventHandlers)(e.onPointerLeave, aC(e => o.onItemLeave(e))),
      onFocus: (0, G.composeEventHandlers)(e.onFocus, () => d(!0)),
      onBlur: (0, G.composeEventHandlers)(e.onBlur, () => d(!1))
     })
    })
   })
  }),
  aa = h.forwardRef((e, t) => {
   let {
    checked: n = !1,
    onCheckedChange: r,
    ...a
   } = e;
   return (0, p.jsx)(af, {
    scope: e.__scopeMenu,
    checked: n,
    children: (0, p.jsx)(an, {
     role: "menuitemcheckbox",
     "aria-checked": aE(n) ? "mixed" : n,
     ...a,
     ref: t,
     "data-state": aS(n),
     onSelect: (0, G.composeEventHandlers)(a.onSelect, () => r?.(!!aE(n) || !n), {
      checkForDefaultPrevented: !1
     })
    })
   })
  });
 aa.displayName = "MenuCheckboxItem";
 var ai = "MenuRadioGroup",
  [ao, as] = rH(ai, {
   value: void 0,
   onValueChange: () => {}
  }),
  al = h.forwardRef((e, t) => {
   let {
    value: n,
    onValueChange: r,
    ...a
   } = e, i = (0, er.useCallbackRef)(r);
   return (0, p.jsx)(ao, {
    scope: e.__scopeMenu,
    value: n,
    onValueChange: i,
    children: (0, p.jsx)(r9, {
     ...a,
     ref: t
    })
   })
  });
 al.displayName = ai;
 var au = "MenuRadioItem",
  ac = h.forwardRef((e, t) => {
   let {
    value: n,
    ...r
   } = e, a = as(au, e.__scopeMenu), i = n === a.value;
   return (0, p.jsx)(af, {
    scope: e.__scopeMenu,
    checked: i,
    children: (0, p.jsx)(an, {
     role: "menuitemradio",
     "aria-checked": i,
     ...r,
     ref: t,
     "data-state": aS(i),
     onSelect: (0, G.composeEventHandlers)(r.onSelect, () => a.onValueChange?.(n), {
      checkForDefaultPrevented: !1
     })
    })
   })
  });
 ac.displayName = au;
 var ad = "MenuItemIndicator",
  [af, ap] = rH(ad, {
   checked: !1
  }),
  ah = h.forwardRef((e, t) => {
   let {
    __scopeMenu: n,
    forceMount: r,
    ...a
   } = e, i = ap(ad, n);
   return (0, p.jsx)(ng.Presence, {
    present: r || aE(i.checked) || !0 === i.checked,
    children: (0, p.jsx)(en.Primitive.span, {
     ...a,
     ref: t,
     "data-state": aS(i.checked)
    })
   })
  });
 ah.displayName = ad;
 var am = h.forwardRef((e, t) => {
  let {
   __scopeMenu: n,
   ...r
  } = e;
  return (0, p.jsx)(en.Primitive.div, {
   role: "separator",
   "aria-orientation": "horizontal",
   ...r,
   ref: t
  })
 });
 am.displayName = "MenuSeparator";
 var ag = h.forwardRef((e, t) => {
  let {
   __scopeMenu: n,
   ...r
  } = e, a = rB(n);
  return (0, p.jsx)(eh.Arrow, {
   ...a,
   ...r,
   ref: t
  })
 });
 ag.displayName = "MenuArrow";
 var [av, ay] = rH("MenuSub"), ab = "MenuSubTrigger", aw = h.forwardRef((e, t) => {
  let n = rK(ab, e.__scopeMenu),
   r = rG(ab, e.__scopeMenu),
   a = ay(ab, e.__scopeMenu),
   i = r2(ab, e.__scopeMenu),
   o = h.useRef(null),
   {
    pointerGraceTimerRef: s,
    onPointerGraceIntentChange: l
   } = i,
   u = {
    __scopeMenu: e.__scopeMenu
   },
   c = h.useCallback(() => {
    o.current && window.clearTimeout(o.current), o.current = null
   }, []);
  return h.useEffect(() => c, [c]), h.useEffect(() => {
   let e = s.current;
   return () => {
    window.clearTimeout(e), l(null)
   }
  }, [s, l]), (0, p.jsx)(rY, {
   asChild: !0,
   ...u,
   children: (0, p.jsx)(ar, {
    id: a.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": n.open,
    "aria-controls": a.contentId,
    "data-state": aj(n.open),
    ...e,
    ref: (0, Y.composeRefs)(t, a.onTriggerChange),
    onClick: t => {
     e.onClick?.(t), e.disabled || t.defaultPrevented || (t.currentTarget.focus(), n.open || n.onOpenChange(!0))
    },
    onPointerMove: (0, G.composeEventHandlers)(e.onPointerMove, aC(t => {
     i.onItemEnter(t), !t.defaultPrevented && (e.disabled || n.open || o.current || (i.onPointerGraceIntentChange(null), o.current = window.setTimeout(() => {
      n.onOpenChange(!0), c()
     }, 100)))
    })),
    onPointerLeave: (0, G.composeEventHandlers)(e.onPointerLeave, aC(e => {
     c();
     let t = n.content?.getBoundingClientRect();
     if (t) {
      let r = n.content?.dataset.side,
       a = "right" === r,
       o = t[a ? "left" : "right"],
       l = t[a ? "right" : "left"];
      i.onPointerGraceIntentChange({
       area: [{
        x: e.clientX + (a ? -5 : 5),
        y: e.clientY
       }, {
        x: o,
        y: t.top
       }, {
        x: l,
        y: t.top
       }, {
        x: l,
        y: t.bottom
       }, {
        x: o,
        y: t.bottom
       }],
       side: r
      }), window.clearTimeout(s.current), s.current = window.setTimeout(() => i.onPointerGraceIntentChange(null), 300)
     } else {
      if (i.onTriggerLeave(e), e.defaultPrevented) return;
      i.onPointerGraceIntentChange(null)
     }
    })),
    onKeyDown: (0, G.composeEventHandlers)(e.onKeyDown, t => {
     let a = "" !== i.searchRef.current;
     e.disabled || a && " " === t.key || rA[r.dir].includes(t.key) && (n.onOpenChange(!0), n.content?.focus(), t.preventDefault())
    })
   })
  })
 });
 aw.displayName = ab;
 var ax = "MenuSubContent",
  a_ = h.forwardRef((e, t) => {
   let n = rJ(r0, e.__scopeMenu),
    {
     forceMount: r = n.forceMount,
     ...a
    } = e,
    i = rK(r0, e.__scopeMenu),
    o = rG(r0, e.__scopeMenu),
    s = ay(ax, e.__scopeMenu),
    l = h.useRef(null),
    u = (0, Y.useComposedRefs)(t, l);
   return (0, p.jsx)(rL.Provider, {
    scope: e.__scopeMenu,
    children: (0, p.jsx)(ng.Presence, {
     present: r || i.open,
     children: (0, p.jsx)(rL.Slot, {
      scope: e.__scopeMenu,
      children: (0, p.jsx)(r8, {
       id: s.contentId,
       "aria-labelledby": s.triggerId,
       ...a,
       ref: u,
       align: "start",
       side: "rtl" === o.dir ? "left" : "right",
       disableOutsidePointerEvents: !1,
       disableOutsideScroll: !1,
       trapFocus: !1,
       onOpenAutoFocus: e => {
        o.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault()
       },
       onCloseAutoFocus: e => e.preventDefault(),
       onFocusOutside: (0, G.composeEventHandlers)(e.onFocusOutside, e => {
        e.target !== s.trigger && i.onOpenChange(!1)
       }),
       onEscapeKeyDown: (0, G.composeEventHandlers)(e.onEscapeKeyDown, e => {
        o.onClose(), e.preventDefault()
       }),
       onKeyDown: (0, G.composeEventHandlers)(e.onKeyDown, e => {
        let t = e.currentTarget.contains(e.target),
         n = rT[o.dir].includes(e.key);
        t && n && (i.onOpenChange(!1), s.trigger?.focus(), e.preventDefault())
       })
      })
     })
    })
   })
  });

 function aj(e) {
  return e ? "open" : "closed"
 }

 function aE(e) {
  return "indeterminate" === e
 }

 function aS(e) {
  return aE(e) ? "indeterminate" : e ? "checked" : "unchecked"
 }

 function aC(e) {
  return t => "mouse" === t.pointerType ? e(t) : void 0
 }
 a_.displayName = ax;
 var ak = "DropdownMenu",
  [aN, aP] = (0, Q.createContextScope)(ak, [rz]),
  aM = rz(),
  [aI, aO] = aN(ak),
  aR = e => {
   let {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: a,
    defaultOpen: i,
    onOpenChange: o,
    modal: s = !0
   } = e, l = aM(t), u = h.useRef(null), [c, d] = (0, ey.useControllableState)({
    prop: a,
    defaultProp: i ?? !1,
    onChange: o,
    caller: ak
   });
   return (0, p.jsx)(aI, {
    scope: t,
    triggerId: (0, ep.useId)(),
    triggerRef: u,
    contentId: (0, ep.useId)(),
    open: c,
    onOpenChange: d,
    onOpenToggle: h.useCallback(() => d(e => !e), [d]),
    modal: s,
    children: (0, p.jsx)(rW, {
     ...l,
     open: c,
     onOpenChange: d,
     dir: r,
     modal: s,
     children: n
    })
   })
  };
 aR.displayName = ak;
 var aA = "DropdownMenuTrigger",
  aT = h.forwardRef((e, t) => {
   let {
    __scopeDropdownMenu: n,
    disabled: r = !1,
    ...a
   } = e, i = aO(aA, n), o = aM(n);
   return (0, p.jsx)(rY, {
    asChild: !0,
    ...o,
    children: (0, p.jsx)(en.Primitive.button, {
     type: "button",
     id: i.triggerId,
     "aria-haspopup": "menu",
     "aria-expanded": i.open,
     "aria-controls": i.open ? i.contentId : void 0,
     "data-state": i.open ? "open" : "closed",
     "data-disabled": r ? "" : void 0,
     disabled: r,
     ...a,
     ref: (0, Y.composeRefs)(t, i.triggerRef),
     onPointerDown: (0, G.composeEventHandlers)(e.onPointerDown, e => {
      !r && 0 === e.button && !1 === e.ctrlKey && (i.onOpenToggle(), i.open || e.preventDefault())
     }),
     onKeyDown: (0, G.composeEventHandlers)(e.onKeyDown, e => {
      !r && (["Enter", " "].includes(e.key) && i.onOpenToggle(), "ArrowDown" === e.key && i.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(e.key) && e.preventDefault())
     })
    })
   })
  });
 aT.displayName = aA;
 var aD = e => {
  let {
   __scopeDropdownMenu: t,
   ...n
  } = e, r = aM(t);
  return (0, p.jsx)(rZ, {
   ...r,
   ...n
  })
 };
 aD.displayName = "DropdownMenuPortal";
 var aL = "DropdownMenuContent",
  aF = h.forwardRef((e, t) => {
   let {
    __scopeDropdownMenu: n,
    ...r
   } = e, a = aO(aL, n), i = aM(n), o = h.useRef(!1);
   return (0, p.jsx)(r4, {
    id: a.contentId,
    "aria-labelledby": a.triggerId,
    ...i,
    ...r,
    ref: t,
    onCloseAutoFocus: (0, G.composeEventHandlers)(e.onCloseAutoFocus, e => {
     o.current || a.triggerRef.current?.focus(), o.current = !1, e.preventDefault()
    }),
    onInteractOutside: (0, G.composeEventHandlers)(e.onInteractOutside, e => {
     let t = e.detail.originalEvent,
      n = 0 === t.button && !0 === t.ctrlKey,
      r = 2 === t.button || n;
     (!a.modal || r) && (o.current = !0)
    }),
    style: {
     ...e.style,
     "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
     "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
     "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
     "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
     "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
    }
   })
  });

 function aq({
  ...e
 }) {
  return (0, p.jsx)(aR, {
   "data-slot": "dropdown-menu",
   ...e
  })
 }

 function aH({
  ...e
 }) {
  return (0, p.jsx)(aT, {
   "data-slot": "dropdown-menu-trigger",
   ...e
  })
 }

 function az({
  className: e,
  sideOffset: t = 4,
  ...n
 }) {
  return (0, p.jsx)(aD, {
   children: (0, p.jsx)(aF, {
    "data-slot": "dropdown-menu-content",
    sideOffset: t,
    className: (0, S.cn)("bg-popover border-subtle text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-44 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", e),
    ...n
   })
  })
 }

 function aB({
  data: e
 }) {
  let t = (0, m.usePathname)(),
   [n, r] = (0, h.useState)(!1),
   a = () => {
    r(!1)
   };
  (0, h.useEffect)(() => {
   a()
  }, [t]);
  let i = "py-3",
   o = "px-4",
   s = "not-last:after:bg-white-3 not-last:after:absolute not-last:after:bottom-0 not-last:after:left-4 not-last:after:h-px not-last:after:w-[calc(100%-32px)]";
  if (!(0, S.hasArrayValue)(e)) return null;
  let l = e.some(e => {
    let n = e?.href || e?.mainLink?.href;
    return (0, S.checkIfLinkIsActive)({
     pathName: t,
     url: n
    })
   }),
   u = (0, p.jsxs)(p.Fragment, {
    children: [(0, p.jsx)("div", {
     className: "absolute top-5/8 left-1/2 h-0.25 w-3.5 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-200 group-data-[state=open]:top-1/2 group-data-[state=open]:rotate-45"
    }), (0, p.jsx)("div", {
     className: "absolute top-3/8 left-1/2 h-0.25 w-3.5 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-200 group-data-[state=open]:top-1/2 group-data-[state=open]:-rotate-45"
    }), (0, p.jsx)("div", {
     className: "absolute top-1/2 left-1/2 h-0.25 w-3.5 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-200 group-data-[state=open]:opacity-0"
    }), (0, p.jsx)("span", {
     className: "sr-only",
     children: "Toggle mobile menu"
    })]
   });
  return (0, p.jsxs)(aq, {
   open: n,
   onOpenChange: r,
   children: [(0, p.jsx)(aH, {
    className: (0, S.cn)("group text-foreground border-subtle bg-background pointer-events-auto relative ml-4 block h-(--nav-height) w-12 cursor-pointer rounded-md border transition-[background-color,border-color,opacity] duration-200 lg:hidden", "ease-cubic-in-out hover:border-transparent hover:bg-[color-mix(in_srgb,var(--color-white-3)_60%,var(--color-white-1))]"),
    children: u
   }), (0, p.jsx)(az, {
    align: "end",
    sideOffset: 16,
    className: "block lg:hidden",
    children: (0, p.jsx)(rk.Accordion, {
     type: "single",
     collapsible: !0,
     asChild: !0,
     children: (0, p.jsx)("ul", {
      children: e.map(e => {
       let {
        _key: n,
        mainLink: r,
        dropdownLinks: u
       } = e || {}, c = (0, S.checkIfLinkIsActive)({
        pathName: t,
        url: e?.href || r?.href
       });
       if ((0, S.hasArrayValue)(u) && (0, S.hasValidCta)(r)) return (0, p.jsx)(rk.AccordionItem, {
        value: n,
        asChild: !0,
        children: (0, p.jsxs)("li", {
         className: (0, S.cn)("relative", s),
         children: [(0, p.jsx)(rk.AccordionTrigger, {
          svgIcon: "arrow-down",
          className: (0, S.cn)("t-b-2", i, o),
          children: (0, p.jsx)(rn.default, {
           link: r,
           className: (0, S.cn)("font-medium!", {
            "is-active": c,
            "text-foreground-muted": l && !c
           }),
           onClick: a,
           children: r.label
          })
         }), (0, p.jsx)(rk.AccordionContent, {
          className: (0, S.cn)("", o),
          children: (0, p.jsx)("ul", {
           children: u.map(e => {
            let n = (0, S.checkIfLinkIsActive)({
             pathName: t,
             url: e?.href
            });
            return (0, p.jsx)("li", {
             className: (0, S.cn)("t-b-2 font-normal!", {
              "is-active": n,
              "text-foreground-muted": l && !n
             }),
             children: (0, p.jsx)(rn.default, {
              link: e,
              className: "block pb-2",
              onClick: a,
              children: e.label
             })
            }, e._key)
           })
          })
         })]
        })
       }, n);
       let d = (0, S.checkIfLinkIsActive)({
        pathName: t,
        url: e?.href
       });
       return (0, S.hasValidCta)(e) ? (0, p.jsx)("li", {
        className: (0, S.cn)("relative font-medium!", s, {
         "is-active": d,
         "text-foreground-muted": l && !d
        }),
        children: (0, p.jsx)(rn.default, {
         link: e,
         onClick: a,
         className: (0, S.cn)("block w-full", o, i),
         children: e.label
        })
       }, n) : null
      })
     })
    })
   })]
  })
 }

 function aV({
  data: e
 }) {
  let {
   menu: t,
   callToAction: n,
   siteName: r
  } = e || {}, a = (0, h.useRef)(), i = (0, rC.useIntroStatus)();
  return (0, h.useEffect)(() => {
   let e = () => {
    document.documentElement.style.setProperty("--h-header", `${a?.current?.offsetHeight||0}px`)
   };
   return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e)
  }, []), (0, p.jsxs)(rr.m.header, {
   ref: a,
   className: "p-x-max z-header pointer-events-none sticky top-0 -mb-[calc(var(--h-header)+1px)] flex w-full items-center pt-4 [--nav-height:42px]",
   variants: n6.slideRevealAnim,
   initial: "hidden",
   animate: i ? "show" : "hidden",
   transition: {
    ...n6.slideRevealAnim.transition,
    delay: n6.pageTransitionFade.pageShow.transition.duration
   },
   children: [(0, p.jsxs)("div", {
    className: "pointer-events-auto absolute top-4 flex gap-4",
    children: [(0, p.jsx)(j.Button, {
     asChild: !0,
     tone: "greenDark",
     className: "flex h-(--nav-height) items-center gap-2 px-3",
     children: (0, p.jsxs)(_.default, {
      href: "/",
      children: [(0, p.jsx)(N.BrandLogo, {
       className: "size-5.5"
      }), (0, p.jsx)(rt, {
       className: "w-15"
      }), (0, p.jsx)("span", {
       className: "sr-only",
       children: r
      })]
     })
    }), (0, p.jsx)(a$, {
     menu: t
    })]
   }), (0, S.hasValidCta)(n) && (0, p.jsx)(j.Button, {
    asChild: !0,
    className: "border-green-4/15 pointer-events-auto ml-auto border hover:border-transparent",
    shape: "rounded",
    children: (0, p.jsx)(rn.default, {
     link: n,
     children: n.label
    })
   }), t && (0, p.jsx)(aB, {
    data: t
   })]
  })
 }

 function a$({
  menu: e
 }) {
  let [t, n] = (0, h.useState)(null), [r, a] = (0, h.useState)(null), i = (0, h.useRef)(null), o = (0, m.usePathname)(), s = e => {
   n(e)
  }, l = () => {
   n(null), a(null)
  };
  if (!(0, S.hasArrayValue)(e)) return null;
  let u = e.some(e => {
   let t = e?.mainLink?.href || e?.href;
   return (0, S.checkIfLinkIsActive)({
    pathName: o,
    url: t
   })
  });
  return (0, p.jsx)("nav", {
   ref: i,
   className: "bg-background border-subtle hidden h-(--nav-height) rounded-md border select-none lg:block",
   "aria-label": "Main navigation",
   children: (0, p.jsx)("ul", {
    className: "item-center t-b-2 flex",
    role: "menubar",
    children: e.map(e => {
     let {
      _key: i,
      mainLink: c,
      dropdownLinks: d
     } = e || {}, f = (0, S.checkIfLinkIsActive)({
      pathName: o,
      url: c?.href
     }), h = (0, S.cn)("flex h-(--nav-height) items-center px-6 font-medium transition-[color] duration-300"), m = (0, S.hasArrayValue)(d) && (0, S.hasValidCta)(c), g = t === i, v = t && t !== i;
     if (m) return (0, p.jsxs)("li", {
      className: "relative",
      onMouseEnter: () => s(i),
      onMouseLeave: l,
      role: "none",
      children: [(0, p.jsx)(rn.default, {
       link: c,
       className: (0, S.cn)(h, {
        "text-foreground-muted": (u && !f || v) && !g
       }),
       role: "menuitem",
       "aria-haspopup": "true",
       "aria-expanded": g,
       onKeyDown: e => {
        "Enter" === e.key || " " === e.key ? (e.preventDefault(), n(t === i ? null : i)) : "Escape" === e.key && n(null)
       },
       tabIndex: 0,
       children: c.label
      }), (0, p.jsx)("div", {
       className: (0, S.cn)("pointer-events-none absolute left-0 pt-1 opacity-0 transition-opacity duration-300 ease-out", {
        "pointer-events-auto opacity-100": g,
        "text-foreground-muted": v
       }),
       children: (0, p.jsx)("ul", {
        "data-dropdown": !0,
        role: "menu",
        "aria-label": `${c.label} submenu`,
        className: (0, S.cn)("bg-background border-subtle rounded-md border"),
        children: d.map(e => {
         let n = (0, S.checkIfLinkIsActive)({
          pathName: o,
          url: e?.href
         });
         return (0, p.jsx)("li", {
          className: (0, S.cn)("t-b-2 font-normal! [&>a,&>button]:transition-[color] [&>a,&>button]:duration-300", "first:[&>a,&>button]:pt-3 last:[&>a,&>button]:pb-3", {
           "is-active": n
          }),
          role: "none",
          onMouseEnter: () => a(e._key),
          onMouseLeave: () => a(null),
          children: (0, p.jsx)(rn.default, {
           link: e,
           role: "menuitem",
           tabIndex: t ? 0 : -1,
           className: (0, S.cn)("inline-block w-full px-4 py-1 whitespace-nowrap", {
            "text-foreground-muted": r && r !== e._key
           }),
           children: e.label
          })
         }, e._key)
        })
       })
      })]
     }, i);
     let y = (0, S.checkIfLinkIsActive)({
      pathName: o,
      url: e?.href
     });
     return (0, S.hasValidCta)(e) ? (0, p.jsx)("li", {
      className: "relative font-medium!",
      role: "none",
      onMouseEnter: () => s(i),
      onMouseLeave: l,
      children: (0, p.jsx)(rn.default, {
       link: e,
       className: (0, S.cn)(h, {
        "text-foreground-muted": (u && !y || v) && !g,
        "hover:text-green-5": !v
       }),
       role: "menuitem",
       tabIndex: 0,
       children: e.label
      })
     }, i) : null
    })
   })
  })
 }
 aF.displayName = aL, h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(r9, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuGroup", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(r7, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuLabel", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(an, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuItem", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(aa, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuCheckboxItem", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(al, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuRadioGroup", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(ac, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuRadioItem", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(ah, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuItemIndicator", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(am, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuSeparator", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(ag, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuArrow", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(aw, {
   ...a,
   ...r,
   ref: t
  })
 }).displayName = "DropdownMenuSubTrigger", h.forwardRef((e, t) => {
  let {
   __scopeDropdownMenu: n,
   ...r
  } = e, a = aM(n);
  return (0, p.jsx)(a_, {
   ...a,
   ...r,
   ref: t,
   style: {
    ...e.style,
    "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
    "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
    "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
    "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
    "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
   }
  })
 }).displayName = "DropdownMenuSubContent", (0, t1.default)("ChevronRight", [
  ["path", {
   d: "m9 18 6-6-6-6",
   key: "mthhwq"
  }]
 ]), e.i(733498);
 var aK = e.i(769345),
  aU = e.i(634745);

 function aG({
  onComplete: e
 }) {
  let t = (0, h.useRef)(null),
   n = (0, x.useLenis)();
  (0, h.useEffect)(() => {
   if (n) return n.stop(), () => {
    n.start()
   }
  }, [n]);
  let r = (0, rc.useMotionValue)(0),
   a = (0, rc.useMotionValue)(0),
   i = (0, rc.useMotionValue)(1),
   o = (0, rc.useMotionValue)(1),
   s = [.5, 0, .05, 1],
   l = (0, rd.useTransform)([r, a], ([e, t]) => {
    let n;
    if (e < .5) n = e / 8 * 100;
    else n = .5 / 8 * 100 + (e - .5) * (200 - .5 / 8 * 100);
    let r = (100 - n) / 2,
     a = 100 - r,
     i = 100 - r;
    return `polygon(
        0% 0%, 0% 100%, ${r}% 100%,
        ${r}% ${r}%, ${a}% ${r}%, ${a}% ${i}%, ${r}% ${i}%,
        ${r}% 100%, 100% 100%, 100% 0%
      )`
   });
  return (0, h.useEffect)(() => {
   let t = (0, rl.animate)(i, .4, {
     delay: 1.5,
     duration: 2,
     ease: [.87, 0, .13, 1]
    }),
    n = (0, rl.animate)(o, 0, {
     delay: 1.5,
     duration: 2,
     ease: [.87, 0, .13, 1]
    }),
    l = (0, rl.animate)(r, 1, {
     delay: 2,
     duration: 1.5,
     ease: s
    }),
    u = (0, rl.animate)(a, 1, {
     delay: 2.2,
     duration: 1.5,
     ease: s
    }),
    c = setTimeout(() => {
     e?.()
    }, 3200);
   return () => {
    clearTimeout(c), t.stop(), n.stop(), l.stop(), u.stop()
   }
  }, [2, 1.5, a, o, i, e, r, s]), (0, p.jsx)("div", {
   className: "fixed inset-0 z-9999 overflow-hidden",
   children: (0, p.jsxs)(rr.m.div, {
    ref: t,
    className: "relative flex h-full w-full items-center justify-center",
    style: {
     clipPath: l
    },
    children: [(0, p.jsx)(n7.default, {
     className: "bg-blue"
    }), (0, p.jsx)(rr.m.div, {
     className: "bg-green-3 absolute inset-0 origin-center",
     style: {
      scale: r
     }
    }), (0, p.jsx)(rr.m.div, {
     className: "relative z-10 w-[25vw] min-w-[350px]",
     style: {
      scale: i,
      opacity: o
     },
     children: (0, p.jsx)(aK.default, {
      animationData: aU.default,
      loop: !1
     })
    })]
   })
  })
 }

 function aW({
  children: e
 }) {
  let t = (0, m.usePathname)();
  return (0, p.jsx)(rr.m.main, {
   id: "main",
   initial: "pageHide",
   animate: "pageShow",
   variants: n6.pageTransitionFade,
   className: "min-h-main",
   children: e
  }, t)
 }
 let aY = new WeakMap;

 function aQ(e, t, n, r) {
  if (!e && !aY.has(t)) return !1;
  let a = aY.get(t) ?? new WeakMap;
  aY.set(t, a);
  let i = a.get(n) ?? new Set;
  a.set(n, i);
  let o = i.has(r);
  return e ? i.add(r) : i.delete(r), o && e
 }
 let aX = function(e, t, n, r = {}) {
  let {
   signal: a,
   base: i = document
  } = r;
  if (a?.aborted) return;
  let {
   once: o,
   ...s
  } = r, l = i instanceof Document ? i.documentElement : i, u = !!("object" == typeof r ? r.capture : r), c = r => {
   let a = function(e, t) {
    let n = e.target;
    if (n instanceof Text && (n = n.parentElement), n instanceof Element && e.currentTarget instanceof Node) {
     let r = n.closest(t);
     if (r && e.currentTarget.contains(r)) return r
    }
   }(r, String(e));
   if (a) {
    let e = Object.assign(r, {
     delegateTarget: a
    });
    n.call(l, e), o && (l.removeEventListener(t, c, s), aQ(!1, l, n, d))
   }
  }, d = JSON.stringify({
   selector: e,
   type: t,
   capture: u
  });
  aQ(!0, l, n, d) || l.addEventListener(t, c, s), a?.addEventListener("abort", () => {
   aQ(!1, l, n, d)
  })
 };

 function aJ(e, t, n, r, a, i, o) {
  try {
   var s = e[i](o),
    l = s.value
  } catch (e) {
   n(e);
   return
  }
  s.done ? t(l) : Promise.resolve(l).then(r, a)
 }

 function aZ(e) {
  return function() {
   var t = this,
    n = arguments;
   return new Promise(function(r, a) {
    var i = e.apply(t, n);

    function o(e) {
     aJ(i, r, a, o, s, "next", e)
    }

    function s(e) {
     aJ(i, r, a, o, s, "throw", e)
    }
    o(void 0)
   })
  }
 }
 e.i(421342);
 let a0 = (0, h.createContext)({
  stage: "none",
  navigate: () => {},
  isReady: !1
 });

 function a1({
  children: e,
  leave: t = aZ(function*(e) {
   return e()
  }),
  enter: n = aZ(function*(e) {
   return e()
  }),
  auto: r = !1
 }) {
  let a = (0, m.useRouter)(),
   i = (0, m.usePathname)(),
   [o, s] = (0, h.useState)("none"),
   l = (0, h.useRef)(null),
   u = (0, h.useRef)(null),
   c = (0, h.useCallback)(aZ(function*(e, n, r = "push", i) {
    let u, c;
    if ("leaving" === o) return Promise.resolve();
    let d = () => a[r](e, i);
    if ("back" === r && (d = () => a.back()), "back" === r || !e || e.startsWith("#")) return void d();
    try {
     c = new URL(window.location.href), u = new URL(e, c)
    } catch (e) {
     d();
     return
    }
    let f = u.pathname === c.pathname && u.search === c.search && u.hash === c.hash,
     p = u.pathname === c.pathname && (u.search !== c.search || u.hash !== c.hash);
    u.origin !== c.origin || f || p ? d() : (s("leaving"), l.current = yield t(d, n, e))
   }), [t, a, o]),
   d = (0, h.useCallback)(e => {
    let t, n = e.delegateTarget,
     r = null == n ? void 0 : n.getAttribute("href");
    (null == n ? void 0 : n.getAttribute("data-transition-ignore")) || "_blank" === n.target || n.origin !== window.location.origin || "external" === n.rel || n.download || (t = ("delegateTarget" in e ? e.delegateTarget : e.currentTarget).getAttribute("target")) && "_self" !== t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || ("which" in e ? e.which : e.nativeEvent.which) === 2 || e.defaultPrevented || (e.preventDefault(), c(r, i))
   }, [c, i]);
  (0, h.useEffect)(() => {
   if (!r) return;
   let e = new AbortController;
   return aX("a[href]", "click", d, {
    signal: e.signal
   }), () => {
    e.abort()
   }
  }, [r, d]), (0, h.useEffect)(() => {
   "entering" === o && ("function" == typeof l.current && l.current(), l.current = null, aZ(function*() {
    u.current = yield Promise.resolve(n(() => s("none")))
   })())
  }, [o, n]), (0, h.useEffect)(() => () => {
   "leaving" === o && ("function" == typeof u.current && u.current(), u.current = null, s("entering"))
  }, [o, i]);
  let f = (0, h.useMemo)(() => ({
   stage: o,
   navigate: c,
   isReady: "entering" !== o
  }), [o, c]);
  return (0, p.jsx)(a0.Provider, {
   value: f,
   children: e
  })
 }

 function a2() {
  return (0, p.jsx)(a1, {
   auto: !0,
   leave: e => {
    let t = (0, rl.animate)("#main", {
     opacity: n6.pageTransitionFade.pageExit.opacity
    }, {
     ...n6.pageTransitionFade.pageExit.transition,
     onComplete: e
    });
    return () => t.stop()
   },
   enter: e => {
    let t = (0, rl.animate)("#main", {
     opacity: n6.pageTransitionFade.pageShow.opacity
    }, {
     ...n6.pageTransitionFade.pageShow.transition,
     onComplete: e
    });
    return () => t.stop()
   }
  })
 }
 var a4 = e.i(991918),
  a3 = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, t) => {
   let n = (0, a4.createSlot)(`Primitive.${t}`),
    r = h.forwardRef((e, r) => {
     let {
      asChild: a,
      ...i
     } = e;
     return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, p.jsx)(a ? n : t, {
      ...i,
      ref: r
     })
    });
   return r.displayName = `Primitive.${t}`, {
    ...e,
    [t]: r
   }
  }, {}),
  a5 = "Progress",
  [a6, a8] = function(e, t = []) {
   let n = [],
    r = () => {
     let t = n.map(e => h.createContext(e));
     return function(n) {
      let r = n?.[e] || t;
      return h.useMemo(() => ({
       [`__scope${e}`]: {
        ...n,
        [e]: r
       }
      }), [n, r])
     }
    };
   return r.scopeName = e, [function(t, r) {
    let a = h.createContext(r);
    a.displayName = t + "Context";
    let i = n.length;
    n = [...n, r];
    let o = t => {
     let {
      scope: n,
      children: r,
      ...o
     } = t, s = n?.[e]?.[i] || a, l = h.useMemo(() => o, Object.values(o));
     return (0, p.jsx)(s.Provider, {
      value: l,
      children: r
     })
    };
    return o.displayName = t + "Provider", [o, function(n, o) {
     let s = o?.[e]?.[i] || a,
      l = h.useContext(s);
     if (l) return l;
     if (void 0 !== r) return r;
     throw Error(`\`${n}\` must be used within \`${t}\``)
    }]
   }, function(...e) {
    let t = e[0];
    if (1 === e.length) return t;
    let n = () => {
     let n = e.map(e => ({
      useScope: e(),
      scopeName: e.scopeName
     }));
     return function(e) {
      let r = n.reduce((t, {
       useScope: n,
       scopeName: r
      }) => {
       let a = n(e)[`__scope${r}`];
       return {
        ...t,
        ...a
       }
      }, {});
      return h.useMemo(() => ({
       [`__scope${t.scopeName}`]: r
      }), [r])
     }
    };
    return n.scopeName = t.scopeName, n
   }(r, ...t)]
  }(a5),
  [a9, a7] = a6(a5),
  ie = h.forwardRef((e, t) => {
   var n, r;
   let {
    __scopeProgress: a,
    value: i = null,
    max: o,
    getValueLabel: s = ia,
    ...l
   } = e;
   (o || 0 === o) && !is(o) && console.error((n = `${o}`, `Invalid prop \`max\` of value \`${n}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`));
   let u = is(o) ? o : 100;
   null === i || il(i, u) || console.error((r = `${i}`, `Invalid prop \`value\` of value \`${r}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`));
   let c = il(i, u) ? i : null,
    d = io(c) ? s(c, u) : void 0;
   return (0, p.jsx)(a9, {
    scope: a,
    value: c,
    max: u,
    children: (0, p.jsx)(a3.div, {
     "aria-valuemax": u,
     "aria-valuemin": 0,
     "aria-valuenow": io(c) ? c : void 0,
     "aria-valuetext": d,
     role: "progressbar",
     "data-state": ii(c, u),
     "data-value": c ?? void 0,
     "data-max": u,
     ...l,
     ref: t
    })
   })
  });
 ie.displayName = a5;
 var it = "ProgressIndicator",
  ir = h.forwardRef((e, t) => {
   let {
    __scopeProgress: n,
    ...r
   } = e, a = a7(it, n);
   return (0, p.jsx)(a3.div, {
    "data-state": ii(a.value, a.max),
    "data-value": a.value ?? void 0,
    "data-max": a.max,
    ...r,
    ref: t
   })
  });

 function ia(e, t) {
  return `${Math.round(e/t*100)}%`
 }

 function ii(e, t) {
  return null == e ? "indeterminate" : e === t ? "complete" : "loading"
 }

 function io(e) {
  return "number" == typeof e
 }

 function is(e) {
  return io(e) && !isNaN(e) && e > 0
 }

 function il(e, t) {
  return io(e) && !isNaN(e) && e <= t && e >= 0
 }

 function iu({
  className: e,
  value: t,
  ...n
 }) {
  let r, a = 101 === t;
  return r = a ? "translateX(100%)" : `translateX(-${100-(t||0)}%)`, (0, p.jsx)(ie, {
   "data-slot": "progress",
   className: (0, S.cn)("relative h-0.5 w-full overflow-hidden", e),
   "data-progress": t,
   ...n,
   children: (0, p.jsx)(ir, {
    "data-slot": "progress-indicator",
    className: (0, S.cn)("bg-green-3 relative z-1 h-full w-full flex-1", a ? "ease-circ-in-out origin-right duration-800" : "ease-circ-in-out origin-left duration-400"),
    style: {
     transform: r
    }
   })
  })
 }

 function ic() {
  let [e, t] = (0, h.useState)(0), n = (0, h.useRef)(null), {
   progressStatus: r
  } = (0, b.useAppSelector)(e => e.globalProgressLoader), a = (0, h.useCallback)(e => {
   t(Math.min(100, Math.max(0, e)))
  }, []), i = (0, h.useCallback)(() => {
   n.current && (clearInterval(n.current), n.current = null), t(100);
   let e = setTimeout(() => t(101), 400);
   return () => clearTimeout(e)
  }, []), o = (0, h.useCallback)(() => {
   a((0, S.getRandomInt)(0, 30)), n.current && clearInterval(n.current), n.current = setInterval(() => {
    t(e => e >= 100 ? (i(), e) : e + (0, S.getRandomInt)(5, 10))
   }, 1e3)
  }, [i, a]);
  return (0, h.useEffect)(() => ("start" === r ? o() : "complete" === r && i(), () => {
   n.current && clearInterval(n.current)
  }), [o, i, r]), (0, p.jsx)(iu, {
   className: "fixed top-0 left-0 z-500 h-2 w-full data-[progress=101]:opacity-0 data-[progress=101]:[transition:opacity_0.3s_0.8s]",
   value: e,
   "aria-label": "Page processing progress"
  })
 }
 ir.displayName = it;
 var id = e.i(648070),
  ip = e.i(513565);

 function ih({
  children: e,
  features: t,
  strict: n = !1
 }) {
  let [, r] = (0, h.useState)(!im(t)), a = (0, h.useRef)(void 0);
  if (!im(t)) {
   let {
    renderer: e,
    ...n
   } = t;
   a.current = e, (0, ip.loadFeatures)(n)
  }
  return (0, h.useEffect)(() => {
   im(t) && t().then(({
    renderer: e,
    ...t
   }) => {
    (0, ip.loadFeatures)(t), a.current = e, r(!0)
   })
  }, []), (0, p.jsx)(id.LazyContext.Provider, {
   value: {
    renderer: a.current,
    strict: n
   },
   children: e
  })
 }

 function im(e) {
  return "function" == typeof e
 }
 var ig = e.i(223070),
  iv = e.i(708149);
 let iy = {
  renderer: e.i(154505).createDomVisualElement,
  ...ig.animations,
  ...iv.gestureAnimations
 };

 function ib({
  children: e,
  siteData: t,
  showIntroInitial: n,
  gContactData: r
 }) {
  let {
   announcement: a,
   header: i,
   footer: o
  } = t || {}, s = (0, m.usePathname)(), [l, u] = (0, h.useState)(n), c = (0, b.useAppDispatch)(), d = async () => {
   u(!1), c((0, y.setIsIntroComplete)(!0)), await v()
  }, f = (0, h.useRef)();
  return (0, h.useEffect)(() => {
   function e(e) {
    f.current?.lenis?.raf(1e3 * e)
   }
   return w.default.ticker.add(e), () => w.default.ticker.remove(e)
  }, []), (0, h.useEffect)(() => {
   c((0, y.setIsIntroComplete)(!n))
  }, [n, c]), (0, h.useEffect)(() => {
   var e;
   return t?.integrations?.gaID && (e = t?.integrations?.gaID, void 0 !== window?.gtag && window.gtag("config", e, {
    page_path: s
   })), () => {
    c((0, y.setPageType)(""))
   }
  }, [t, s, c]), (0, h.useEffect)(() => {
   console.log("%cSite by View Source \n%cview-source.com", "margin: 20px 0 0;;font-size: 12px;font-family: Helvetica, sans-serif;font-weight: 700", "margin: -5px 0 20px;;font-size: 12px;font-family: Helvetica, sans-serif;font-weight: 400"), document.documentElement.setAttribute("data-useragent", navigator.userAgent), setTimeout(() => {
    document.querySelectorAll(".avoid-style-flash").forEach(e => {
     e.style.visibility = "visible"
    })
   }, 400);
   let e = () => {
    document.documentElement.style.setProperty("--s-vp-height-js", `${window.innerHeight}px`)
   };
   return e(), window.addEventListener("resize", e), () => {
    window.removeEventListener("resize", e)
   }
  }, []), (0, p.jsx)(ih, {
   features: iy,
   children: (0, p.jsxs)(x.ReactLenis, {
    root: !0,
    options: {
     autoRaf: !1
    },
    ref: f,
    children: [l && (0, p.jsx)(aG, {
     onComplete: d
    }), (0, p.jsx)(ic, {}), (0, p.jsx)(a2, {}), (0, p.jsx)(E, {}), (0, p.jsx)(k, {
     data: a
    }), (0, p.jsx)(aV, {
     data: i
    }), (0, p.jsx)(aW, {
     children: e
    }), (0, p.jsx)(rS, {
     siteData: t,
     data: o
    }), (0, p.jsx)(n3, {
     data: r
    })]
   })
  })
 }
 e.s(["Layout", () => ib], 887066)
}, 808341, (e, t, n) => {
 "use strict";
 Object.defineProperty(n, "__esModule", {
  value: !0
 });
 var r = {
  cancelIdleCallback: function() {
   return o
  },
  requestIdleCallback: function() {
   return i
  }
 };
 for (var a in r) Object.defineProperty(n, a, {
  enumerable: !0,
  get: r[a]
 });
 let i = "u" > typeof self && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(e) {
   let t = Date.now();
   return self.setTimeout(function() {
    e({
     didTimeout: !1,
     timeRemaining: function() {
      return Math.max(0, 50 - (Date.now() - t))
     }
    })
   }, 1)
  },
  o = "u" > typeof self && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(e) {
   return clearTimeout(e)
  };
 ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", {
  value: !0
 }), Object.assign(n.default, n), t.exports = n.default)
}, 479520, (e, t, n) => {
 "use strict";
 Object.defineProperty(n, "__esModule", {
  value: !0
 });
 var r = {
  default: function() {
   return b
  },
  handleClientScriptLoad: function() {
   return g
  },
  initScriptLoader: function() {
   return v
  }
 };
 for (var a in r) Object.defineProperty(n, a, {
  enumerable: !0,
  get: r[a]
 });
 let i = e.r(555682),
  o = e.r(190809),
  s = e.r(843476),
  l = i._(e.r(174080)),
  u = o._(e.r(271645)),
  c = e.r(742732),
  d = e.r(922737),
  f = e.r(808341),
  p = new Map,
  h = new Set,
  m = e => {
   let {
    src: t,
    id: n,
    onLoad: r = () => {},
    onReady: a = null,
    dangerouslySetInnerHTML: i,
    children: o = "",
    strategy: s = "afterInteractive",
    onError: u,
    stylesheets: c
   } = e, f = n || t;
   if (f && h.has(f)) return;
   if (p.has(t)) {
    h.add(f), p.get(t).then(r, u);
    return
   }
   let m = () => {
     a && a(), h.add(f)
    },
    g = document.createElement("script"),
    v = new Promise((e, t) => {
     g.addEventListener("load", function(t) {
      e(), r && r.call(this, t), m()
     }), g.addEventListener("error", function(e) {
      t(e)
     })
    }).catch(function(e) {
     u && u(e)
    });
   i ? (g.innerHTML = i.__html || "", m()) : o ? (g.textContent = "string" == typeof o ? o : Array.isArray(o) ? o.join("") : "", m()) : t && (g.src = t, p.set(t, v)), (0, d.setAttributesFromProps)(g, e), "worker" === s && g.setAttribute("type", "text/partytown"), g.setAttribute("data-nscript", s), c && (e => {
    if (l.default.preinit) return e.forEach(e => {
     l.default.preinit(e, {
      as: "style"
     })
    });
    if ("u" > typeof window) {
     let t = document.head;
     e.forEach(e => {
      let n = document.createElement("link");
      n.type = "text/css", n.rel = "stylesheet", n.href = e, t.appendChild(n)
     })
    }
   })(c), document.body.appendChild(g)
  };

 function g(e) {
  let {
   strategy: t = "afterInteractive"
  } = e;
  "lazyOnload" === t ? window.addEventListener("load", () => {
   (0, f.requestIdleCallback)(() => m(e))
  }) : m(e)
 }

 function v(e) {
  e.forEach(g), [...document.querySelectorAll('[data-nscript="beforeInteractive"]'), ...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e => {
   let t = e.id || e.getAttribute("src");
   h.add(t)
  })
 }

 function y(e) {
  let {
   id: t,
   src: n = "",
   onLoad: r = () => {},
   onReady: a = null,
   strategy: i = "afterInteractive",
   onError: o,
   stylesheets: d,
   ...p
  } = e, {
   updateScripts: g,
   scripts: v,
   getIsSsr: y,
   appDir: b,
   nonce: w
  } = (0, u.useContext)(c.HeadManagerContext);
  w = p.nonce || w;
  let x = (0, u.useRef)(!1);
  (0, u.useEffect)(() => {
   let e = t || n;
   x.current || (a && e && h.has(e) && a(), x.current = !0)
  }, [a, t, n]);
  let _ = (0, u.useRef)(!1);
  if ((0, u.useEffect)(() => {
    if (!_.current) {
     if ("afterInteractive" === i) m(e);
     else "lazyOnload" === i && ("complete" === document.readyState ? (0, f.requestIdleCallback)(() => m(e)) : window.addEventListener("load", () => {
      (0, f.requestIdleCallback)(() => m(e))
     }));
     _.current = !0
    }
   }, [e, i]), ("beforeInteractive" === i || "worker" === i) && (g ? (v[i] = (v[i] || []).concat([{
    id: t,
    src: n,
    onLoad: r,
    onReady: a,
    onError: o,
    ...p,
    nonce: w
   }]), g(v)) : y && y() ? h.add(t || n) : y && !y() && m({
    ...e,
    nonce: w
   })), b) {
   if (d && d.forEach(e => {
     l.default.preinit(e, {
      as: "style"
     })
    }), "beforeInteractive" === i)
    if (!n) return p.dangerouslySetInnerHTML && (p.children = p.dangerouslySetInnerHTML.__html, delete p.dangerouslySetInnerHTML), (0, s.jsx)("script", {
     nonce: w,
     dangerouslySetInnerHTML: {
      __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([0,{...p,id:t}])})`
     }
    });
    else return l.default.preload(n, p.integrity ? {
     as: "script",
     integrity: p.integrity,
     nonce: w,
     crossOrigin: p.crossOrigin
    } : {
     as: "script",
     nonce: w,
     crossOrigin: p.crossOrigin
    }), (0, s.jsx)("script", {
     nonce: w,
     dangerouslySetInnerHTML: {
      __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([n,{...p,id:t}])})`
     }
    });
   "afterInteractive" === i && n && l.default.preload(n, p.integrity ? {
    as: "script",
    integrity: p.integrity,
    nonce: w,
    crossOrigin: p.crossOrigin
   } : {
    as: "script",
    nonce: w,
    crossOrigin: p.crossOrigin
   })
  }
  return null
 }
 Object.defineProperty(y, "__nextScript", {
  value: !0
 });
 let b = y;
 ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", {
  value: !0
 }), Object.assign(n.default, n), t.exports = n.default)
}, 3303, (e, t, n) => {
 t.exports = e.r(479520)
}, 892135, (e, t, n) => {
 "use strict";

 function r(e, t, n = !1) {
  return t ? Object.keys(e).filter(e => n ? !t.includes(e) : t.includes(e)).reduce((t, n) => (t[n] = e[n], t), {}) : {}
 }

 function a(e, t, n, r) {
  let a = r && Object.keys(r).length > 0 ? new URL(Object.values(r)[0], e) : new URL(e);
  return t && n && t.forEach(e => {
   n[e] && a.searchParams.set(e, n[e])
  }), a.toString()
 }

 function i(e, t, n, r, i) {
  var o;
  if (!t) return `<${e}></${e}>`;
  let s = (null == (o = t.src) ? void 0 : o.url) ? Object.assign(Object.assign({}, t), {
    src: a(t.src.url, t.src.params, r, i)
   }) : t,
   l = Object.keys(Object.assign(Object.assign({}, s), n)).reduce((e, t) => {
    let r = null == n ? void 0 : n[t],
     a = s[t],
     i = null != r ? r : a,
     o = !0 === i ? t : `${t}="${i}"`;
    return i ? e + ` ${o}` : e
   }, "");
  return `<${e}${l}></${e}>`
 }
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.formatData = n.createHtml = n.formatUrl = void 0, n.formatUrl = a, n.createHtml = i, n.formatData = function(e, t) {
  var n, o, s, l, u;
  let c = r(t, null == (n = e.scripts) ? void 0 : n.reduce((e, t) => [...e, ...Array.isArray(t.params) ? t.params : []], [])),
   d = r(t, null == (s = null == (o = e.html) ? void 0 : o.attributes.src) ? void 0 : s.params),
   f = r(t, [null == (u = null == (l = e.html) ? void 0 : l.attributes.src) ? void 0 : u.slugParam]),
   p = r(t, [...Object.keys(c), ...Object.keys(d), ...Object.keys(f)], !0);
  return Object.assign(Object.assign({}, e), {
   html: e.html ? i(e.html.element, e.html.attributes, p, d, f) : null,
   scripts: e.scripts ? e.scripts.map(e => Object.assign(Object.assign({}, e), {
    url: a(e.url, e.params, c)
   })) : null
  })
 }
}, 344602, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__rest || function(e, t) {
   var n = {};
   for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
   if (null != e && "function" == typeof Object.getOwnPropertySymbols)
    for (var a = 0, r = Object.getOwnPropertySymbols(e); a < r.length; a++) 0 > t.indexOf(r[a]) && Object.prototype.propertyIsEnumerable.call(e, r[a]) && (n[r[a]] = e[r[a]]);
   return n
  },
  a = e.e && e.e.__importDefault || function(e) {
   return e && e.__esModule ? e : {
    default: e
   }
  };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.GoogleAnalytics = void 0;
 let i = a(e.r(63191)),
  o = e.r(892135);
 n.GoogleAnalytics = e => {
  var t = r(e, []);
  return (0, o.formatData)(i.default, t)
 }
}, 277813, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__rest || function(e, t) {
   var n = {};
   for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
   if (null != e && "function" == typeof Object.getOwnPropertySymbols)
    for (var a = 0, r = Object.getOwnPropertySymbols(e); a < r.length; a++) 0 > t.indexOf(r[a]) && Object.prototype.propertyIsEnumerable.call(e, r[a]) && (n[r[a]] = e[r[a]]);
   return n
  },
  a = e.e && e.e.__importDefault || function(e) {
   return e && e.__esModule ? e : {
    default: e
   }
  };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.GoogleMapsEmbed = void 0;
 let i = a(e.r(249031)),
  o = e.r(892135);
 n.GoogleMapsEmbed = e => {
  var t = r(e, []);
  return (0, o.formatData)(i.default, t)
 }
}, 515465, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__rest || function(e, t) {
   var n = {};
   for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
   if (null != e && "function" == typeof Object.getOwnPropertySymbols)
    for (var a = 0, r = Object.getOwnPropertySymbols(e); a < r.length; a++) 0 > t.indexOf(r[a]) && Object.prototype.propertyIsEnumerable.call(e, r[a]) && (n[r[a]] = e[r[a]]);
   return n
  },
  a = e.e && e.e.__importDefault || function(e) {
   return e && e.__esModule ? e : {
    default: e
   }
  };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.YouTubeEmbed = void 0;
 let i = a(e.r(17311)),
  o = e.r(892135);
 n.YouTubeEmbed = e => {
  var t = r(e, []);
  return (0, o.formatData)(i.default, t)
 }
}, 981498, (e, t, n) => {
 "use strict";
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.YouTubeEmbed = n.GoogleMapsEmbed = n.GoogleAnalytics = void 0;
 var r = e.r(344602);
 Object.defineProperty(n, "GoogleAnalytics", {
  enumerable: !0,
  get: function() {
   return r.GoogleAnalytics
  }
 });
 var a = e.r(277813);
 Object.defineProperty(n, "GoogleMapsEmbed", {
  enumerable: !0,
  get: function() {
   return a.GoogleMapsEmbed
  }
 });
 var i = e.r(515465);
 Object.defineProperty(n, "YouTubeEmbed", {
  enumerable: !0,
  get: function() {
   return i.YouTubeEmbed
  }
 })
}, 461316, (e, t, n) => {
 "use strict";
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.default = function({
  html: e,
  height: t = null,
  width: n = null,
  children: i,
  dataNtpc: o = ""
 }) {
  return (0, a.useEffect)(() => {
   o && performance.mark("mark_feature_usage", {
    detail: {
     feature: `next-third-parties-${o}`
    }
   })
  }, [o]), (0, r.jsxs)(r.Fragment, {
   children: [i, e ? (0, r.jsx)("div", {
    style: {
     height: null != t ? `${t}px` : "auto",
     width: null != n ? `${n}px` : "auto"
    },
    "data-ntpc": o,
    dangerouslySetInnerHTML: {
     __html: e
    }
   }) : null]
  })
 };
 let r = e.r(843476),
  a = e.r(271645)
}, 667345, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__importDefault || function(e) {
  return e && e.__esModule ? e : {
   default: e
  }
 };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.default = function(e) {
  let {
   apiKey: t,
   ...n
  } = e, r = {
   ...n,
   key: t
  }, {
   html: s
  } = (0, i.GoogleMapsEmbed)(r);
  return (0, a.jsx)(o.default, {
   height: r.height || null,
   width: r.width || null,
   html: s,
   dataNtpc: "GoogleMapsEmbed"
  })
 };
 let a = e.r(843476),
  i = e.r(981498),
  o = r(e.r(461316))
}, 621783, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__importDefault || function(e) {
  return e && e.__esModule ? e : {
   default: e
  }
 };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.default = function(e) {
  let {
   html: t,
   scripts: n,
   stylesheets: r
  } = (0, o.YouTubeEmbed)(e);
  return (0, a.jsx)(s.default, {
   height: e.height || null,
   width: e.width || null,
   html: t,
   dataNtpc: "YouTubeEmbed",
   children: null == n ? void 0 : n.map(e => (0, a.jsx)(i.default, {
    src: e.url,
    strategy: l[e.strategy],
    stylesheets: r
   }, e.url))
  })
 };
 let a = e.r(843476),
  i = r(e.r(3303)),
  o = e.r(981498),
  s = r(e.r(461316)),
  l = {
   server: "beforeInteractive",
   client: "afterInteractive",
   idle: "lazyOnload",
   worker: "worker"
  }
}, 19598, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__importDefault || function(e) {
  return e && e.__esModule ? e : {
   default: e
  }
 };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.sendGTMEvent = void 0, n.GoogleTagManager = function(e) {
  let {
   gtmId: t,
   gtmScriptUrl: n,
   dataLayerName: r = "dataLayer",
   auth: l,
   preview: u,
   dataLayer: c,
   nonce: d
  } = e;
  s = r;
  let f = new URL(n || "https://www.googletagmanager.com/gtm.js");
  return t && f.searchParams.set("id", t), "dataLayer" !== r && f.searchParams.set("l", r), l && f.searchParams.set("gtm_auth", l), u && (f.searchParams.set("gtm_preview", u), f.searchParams.set("gtm_cookies_win", "x")), (0, i.useEffect)(() => {
   performance.mark("mark_feature_usage", {
    detail: {
     feature: "next-third-parties-gtm"
    }
   })
  }, []), (0, a.jsxs)(a.Fragment, {
   children: [(0, a.jsx)(o.default, {
    id: "_next-gtm-init",
    dangerouslySetInnerHTML: {
     __html: `
      (function(w,l){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        ${c?`w[l].push(${JSON.stringify(c)})`:""}
      })(window,'${r}');`
    },
    nonce: d
   }), (0, a.jsx)(o.default, {
    id: "_next-gtm",
    "data-ntpc": "GTM",
    src: f.href,
    nonce: d
   })]
  })
 };
 let a = e.r(843476),
  i = e.r(271645),
  o = r(e.r(3303)),
  s = "dataLayer";
 n.sendGTMEvent = (e, t) => {
  let n = t || s;
  window[n] = window[n] || [], window[n].push(e)
 }
}, 654576, (e, t, n) => {
 "use strict";
 let r;
 var a = e.e && e.e.__importDefault || function(e) {
  return e && e.__esModule ? e : {
   default: e
  }
 };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.GoogleAnalytics = function(e) {
  let {
   gaId: t,
   debugMode: n,
   dataLayerName: a = "dataLayer",
   nonce: l
  } = e;
  return void 0 === r && (r = a), (0, o.useEffect)(() => {
   performance.mark("mark_feature_usage", {
    detail: {
     feature: "next-third-parties-ga"
    }
   })
  }, []), (0, i.jsxs)(i.Fragment, {
   children: [(0, i.jsx)(s.default, {
    id: "_next-ga-init",
    dangerouslySetInnerHTML: {
     __html: `
          window['${a}'] = window['${a}'] || [];
          function gtag(){window['${a}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${t}' ${n?",{ 'debug_mode': true }":""});`
    },
    nonce: l
   }), (0, i.jsx)(s.default, {
    id: "_next-ga",
    src: `https://www.googletagmanager.com/gtag/js?id=${t}`,
    nonce: l
   })]
  })
 }, n.sendGAEvent = function() {
  void 0 === r ? console.warn("@next/third-parties: GA has not been initialized") : window[r] ? window[r].push(arguments) : console.warn(`@next/third-parties: GA dataLayer ${r} does not exist`)
 };
 let i = e.r(843476),
  o = e.r(271645),
  s = a(e.r(3303))
}, 387644, (e, t, n) => {
 "use strict";
 var r = e.e && e.e.__importDefault || function(e) {
  return e && e.__esModule ? e : {
   default: e
  }
 };
 Object.defineProperty(n, "__esModule", {
  value: !0
 }), n.sendGAEvent = n.GoogleAnalytics = n.sendGTMEvent = n.GoogleTagManager = n.YouTubeEmbed = n.GoogleMapsEmbed = void 0;
 var a = e.r(667345);
 Object.defineProperty(n, "GoogleMapsEmbed", {
  enumerable: !0,
  get: function() {
   return r(a).default
  }
 });
 var i = e.r(621783);
 Object.defineProperty(n, "YouTubeEmbed", {
  enumerable: !0,
  get: function() {
   return r(i).default
  }
 });
 var o = e.r(19598);
 Object.defineProperty(n, "GoogleTagManager", {
  enumerable: !0,
  get: function() {
   return o.GoogleTagManager
  }
 }), Object.defineProperty(n, "sendGTMEvent", {
  enumerable: !0,
  get: function() {
   return o.sendGTMEvent
  }
 });
 var s = e.r(654576);
 Object.defineProperty(n, "GoogleAnalytics", {
  enumerable: !0,
  get: function() {
   return s.GoogleAnalytics
  }
 }), Object.defineProperty(n, "sendGAEvent", {
  enumerable: !0,
  get: function() {
   return s.sendGAEvent
  }
 })
}, 454008, e => {
 "use strict";
 var t = e.i(843476),
  n = e.i(271645),
  r = e.i(3303),
  a = e.i(387644),
  i = e.i(380064);
 let o = [
  ["analytics_storage", "cookies-analytics"],
  ["ad_storage", "cookies-marketing"],
  ["ad_user_data", "cookies-marketing"],
  ["ad_personalization", "cookies-marketing"]
 ];

 function s({
  gaIDs: e,
  gtmIDs: s,
  ahrefsAnalyticsKey: l,
  activeCampaignKey: u
 }) {
  let [c, d] = (0, n.useState)(null), f = !!((0, i.hasArrayValue)(e) || (0, i.hasArrayValue)(s) || l || u);
  return ((0, n.useEffect)(() => {
   if (!f) return;
   let e = () => {
    d(e => {
     let t = {
      analytics: (0, i.hasConsentCookie)("cookies-analytics"),
      marketing: (0, i.hasConsentCookie)("cookies-marketing")
     };
     return e && e.analytics === t.analytics && e.marketing === t.marketing ? e : t
    })
   };
   e();
   let t = setInterval(e, 1e3);
   return () => clearInterval(t)
  }, [f]), (0, n.useLayoutEffect)(() => {
   c && (window.dataLayer = window.dataLayer || [], window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments)
   }, window.gtag("consent", "update", Object.fromEntries(o.map(([e, t]) => [e, (0, i.hasConsentCookie)(t) ? "granted" : "denied"]))), window.gtag("set", "ads_data_redaction", !0))
  }, [c]), f && c) ? (0, t.jsxs)(t.Fragment, {
   children: [c.analytics && (0, i.hasArrayValue)(e) && e.map(e => (0, t.jsx)(a.GoogleAnalytics, {
    gaId: e
   }, e)), c.analytics && (0, i.hasArrayValue)(s) && s.map(e => (0, t.jsx)(a.GoogleTagManager, {
    gtmId: e
   }, e)), l && c.analytics && (0, t.jsx)(r.default, {
    src: "https://analytics.ahrefs.com/analytics.js",
    "data-key": l,
    async: !0
   }), u && c.marketing && (0, t.jsx)(r.default, {
    id: "active-campaign-script",
    strategy: "afterInteractive",
    children: `
          (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
          vgo('setAccount', ${JSON.stringify(u)});
          vgo('setTrackByDefault', true);
          vgo('process');
        `
   })]
  }) : null
 }
 o.map(([e, t]) => `${e}:granted('${t}')?'granted':'denied'`).join(",\n"), e.s(["default", () => s], 454008)
}, 194091, e => {
 "use strict";
 var t, n, r = e.i(271645),
  a = e.i(618566),
  i = e.i(247167),
  o = e.i(290571);

 function s() {
  return void 0 !== i.default && i.default.env ? i.default.env : {}
 }
 var l = e.i(55605),
  u = e.i(45493);

 function c(e, t, n, r) {
  var a, i = [e, t, n, r],
   o = (0, u.isPlainObject)(e) ? e.event : e;
  if (!o || !(0, u.isString)(o)) throw Error("Event missing");
  var s = (0, u.isPlainObject)(e) ? null != (a = e.properties) ? a : {} : (0, u.isPlainObject)(t) ? t : {},
   l = {};
  return (0, u.isFunction)(n) || (l = null != n ? n : {}), (0, u.isPlainObject)(e) && !(0, u.isFunction)(t) && (l = null != t ? t : {}), [o, s, l, i.find(u.isFunction)]
 }

 function d(e, t, n, r, a) {
  var i, o, s = null,
   l = null,
   c = [e, t, n, r, a],
   d = c.filter(u.isString);
  1 === d.length ? (l = (0, u.isString)(c[1]) ? c[1] : d[0], s = null) : 2 === d.length && ("string" == typeof c[0] && (s = c[0]), "string" == typeof c[1] && (l = c[1]));
  var f = c.find(u.isFunction),
   p = c.filter(u.isPlainObject);
  return 1 === p.length ? (0, u.isPlainObject)(c[2]) ? (o = {}, i = c[2]) : (0, u.isPlainObject)(c[3]) ? (i = {}, o = c[3]) : (i = p[0], o = {}) : 2 === p.length && (i = p[0], o = p[1]), [s, l, null != i ? i : i = {}, null != o ? o : o = {}, f]
 }
 var f = function(e) {
  return function() {
   for (var t, n, r, a = [], i = 0; i < arguments.length; i++) a[i] = arguments[i];
   for (var o = {}, s = ["callback", "options", "traits", "id"], l = 0; l < a.length; l++) {
    var c = a[l],
     d = s.pop();
    if ("id" === d) {
     if ((0, u.isString)(c) || (0, u.isNumber)(c)) {
      o.id = c.toString();
      continue
     }
     if (null == c) continue;
     d = s.pop()
    }
    if (("traits" === d || "options" === d) && (null == c || (0, u.isPlainObject)(c)) && (o[d] = c), (0, u.isFunction)(c)) {
     o.callback = c;
     break
    }
   }
   return [null != (t = o.id) ? t : e.id(), null != (n = o.traits) ? n : {}, null != (r = o.options) ? r : {}, o.callback]
  }
 };

 function p(e, t, n, r) {
  (0, u.isNumber)(e) && (e = e.toString()), (0, u.isNumber)(t) && (t = t.toString());
  var a = [e, t, n, r],
   i = a.filter(u.isString),
   o = i[0],
   s = void 0 === o ? e : o,
   l = i[1],
   c = a.filter(u.isPlainObject)[0];
  return [s, void 0 === l ? null : l, void 0 === c ? {} : c, a.find(u.isFunction)]
 }
 var h = e.i(508991),
  m = e.i(683049),
  g = e.i(502471),
  v = e.i(416997),
  y = e.i(610991),
  b = function(e, t, n, r, a, i) {
   return {
    __t: "bpc",
    c: t,
    p: r,
    u: e,
    s: n,
    t: a,
    r: i
   }
  },
  w = Object.keys(b("", "", "", "", "", "")),
  x = function(e) {
   var t = e.indexOf("#");
   return -1 === t ? e : e.slice(0, t)
  },
  _ = function(e) {
   try {
    return new URL(e).pathname
   } catch (t) {
    return "/" === e[0] ? e : "/" + e
   }
  },
  j = function(e) {
   var t = e.c,
    n = e.p,
    r = e.s,
    a = e.u,
    i = e.r,
    o = e.t,
    s = t ? _(t) : n,
    l = t ? t.indexOf("?") > -1 ? t : t + r : x(a);
   return {
    path: s,
    referrer: i,
    search: r,
    title: o,
    url: l
   }
  },
  E = function() {
   var e = document.querySelector("link[rel='canonical']");
   return b(location.href, e && e.getAttribute("href") || void 0, location.search, location.pathname, document.title, document.referrer)
  },
  S = function(e, t) {
   void 0 === t && (t = j(E()));
   var n, r, a, i = e.context;
   "page" === e.type && (a = e.properties && (n = e.properties, r = Object.keys(t), Object.assign.apply(Object, (0, o.__spreadArray)([{}], r.map(function(e) {
    var t;
    if (n && Object.prototype.hasOwnProperty.call(n, e)) return (t = {})[e] = n[e], t
   }), !1))), e.properties = (0, o.__assign)((0, o.__assign)((0, o.__assign)({}, t), e.properties), e.name ? {
    name: e.name
   } : {})), i.page = (0, o.__assign)((0, o.__assign)((0, o.__assign)({}, t), a), i.page)
  },
  C = e.i(708721),
  k = function(e) {
   function t(t, n) {
    var r = e.call(this, "".concat(t, " ").concat(n)) || this;
    return r.field = t, r
   }
   return (0, o.__extends)(t, e), t
  }(Error),
  N = "is not a string",
  P = "is not an object",
  M = function(e) {
   var t, n;
   this.settings = e, this.createMessageId = e.createMessageId, this.onEventMethodCall = null != (t = e.onEventMethodCall) ? t : function() {}, this.onFinishedEvent = null != (n = e.onFinishedEvent) ? n : function() {}
  },
  I = function(e) {
   function t(t) {
    var n = e.call(this, {
     createMessageId: function() {
      return "ajs-next-".concat(Date.now(), "-").concat((0, y.v4)())
     },
     onEventMethodCall: function(e) {
      var t = e.options;
      n.maybeUpdateAnonId(t)
     },
     onFinishedEvent: function(e) {
      return n.addIdentity(e), e
     }
    }) || this;
    return n.user = t, n
   }
   return (0, o.__extends)(t, e), t.prototype.maybeUpdateAnonId = function(e) {
    (null == e ? void 0 : e.anonymousId) && this.user.anonymousId(e.anonymousId)
   }, t.prototype.addIdentity = function(e) {
    this.user.id() && (e.userId = this.user.id()), this.user.anonymousId() && (e.anonymousId = this.user.anonymousId())
   }, t.prototype.track = function(t, n, r, a, i) {
    var o = e.prototype.track.call(this, t, n, r, a);
    return S(o, i), o
   }, t.prototype.page = function(t, n, r, a, i, o) {
    var s = e.prototype.page.call(this, t, n, r, a, i);
    return S(s, o), s
   }, t.prototype.screen = function(t, n, r, a, i, o) {
    var s = e.prototype.screen.call(this, t, n, r, a, i);
    return S(s, o), s
   }, t.prototype.identify = function(t, n, r, a, i) {
    var o = e.prototype.identify.call(this, t, n, r, a);
    return S(o, i), o
   }, t.prototype.group = function(t, n, r, a, i) {
    var o = e.prototype.group.call(this, t, n, r, a);
    return S(o, i), o
   }, t.prototype.alias = function(t, n, r, a, i) {
    var o = e.prototype.alias.call(this, t, n, r, a);
    return S(o, i), o
   }, t
  }(function() {
   function e(e) {
    this.settings = new M(e)
   }
   return e.prototype.track = function(e, t, n, r) {
    return this.settings.onEventMethodCall({
     type: "track",
     options: n
    }), this.normalize((0, o.__assign)((0, o.__assign)({}, this.baseEvent()), {
     event: e,
     type: "track",
     properties: null != t ? t : {},
     options: (0, o.__assign)({}, n),
     integrations: (0, o.__assign)({}, r)
    }))
   }, e.prototype.page = function(e, t, n, r, a) {
    this.settings.onEventMethodCall({
     type: "page",
     options: r
    });
    var i, s = {
     type: "page",
     properties: (0, o.__assign)({}, n),
     options: (0, o.__assign)({}, r),
     integrations: (0, o.__assign)({}, a)
    };
    return null !== e && (s.category = e, s.properties = null != (i = s.properties) ? i : {}, s.properties.category = e), null !== t && (s.name = t), this.normalize((0, o.__assign)((0, o.__assign)({}, this.baseEvent()), s))
   }, e.prototype.screen = function(e, t, n, r, a) {
    this.settings.onEventMethodCall({
     type: "screen",
     options: r
    });
    var i = {
     type: "screen",
     properties: (0, o.__assign)({}, n),
     options: (0, o.__assign)({}, r),
     integrations: (0, o.__assign)({}, a)
    };
    return null !== e && (i.category = e), null !== t && (i.name = t), this.normalize((0, o.__assign)((0, o.__assign)({}, this.baseEvent()), i))
   }, e.prototype.identify = function(e, t, n, r) {
    return this.settings.onEventMethodCall({
     type: "identify",
     options: n
    }), this.normalize((0, o.__assign)((0, o.__assign)({}, this.baseEvent()), {
     type: "identify",
     userId: e,
     traits: null != t ? t : {},
     options: (0, o.__assign)({}, n),
     integrations: r
    }))
   }, e.prototype.group = function(e, t, n, r) {
    return this.settings.onEventMethodCall({
     type: "group",
     options: n
    }), this.normalize((0, o.__assign)((0, o.__assign)({}, this.baseEvent()), {
     type: "group",
     traits: null != t ? t : {},
     options: (0, o.__assign)({}, n),
     integrations: (0, o.__assign)({}, r),
     groupId: e
    }))
   }, e.prototype.alias = function(e, t, n, r) {
    this.settings.onEventMethodCall({
     type: "alias",
     options: n
    });
    var a = {
     userId: e,
     type: "alias",
     options: (0, o.__assign)({}, n),
     integrations: (0, o.__assign)({}, r)
    };
    return (null !== t && (a.previousId = t), void 0 === e) ? this.normalize((0, o.__assign)((0, o.__assign)({}, a), this.baseEvent())) : this.normalize((0, o.__assign)((0, o.__assign)({}, this.baseEvent()), a))
   }, e.prototype.baseEvent = function() {
    return {
     integrations: {},
     options: {}
    }
   }, e.prototype.context = function(e) {
    var t, n = ["userId", "anonymousId", "timestamp", "messageId"];
    delete e.integrations;
    var r = Object.keys(e),
     a = null != (t = e.context) ? t : {},
     i = {};
    return r.forEach(function(t) {
     "context" !== t && (n.includes(t) ? (0, C.dset)(i, t, e[t]) : (0, C.dset)(a, t, e[t]))
    }), [a, i]
   }, e.prototype.normalize = function(e) {
    var t, n, r, a = Object.keys(null != (n = e.integrations) ? n : {}).reduce(function(t, n) {
     var r, a;
     return (0, o.__assign)((0, o.__assign)({}, t), ((r = {})[n] = !!(null == (a = e.integrations) ? void 0 : a[n]), r))
    }, {});
    t = e.options || {}, e.options = Object.keys(t).filter(function(e) {
     return function(e, t) {
      return void 0 !== t
     }(e, t[e])
    }).reduce(function(e, n) {
     return e[n] = t[n], e
    }, {});
    var i = (0, o.__assign)((0, o.__assign)({}, a), null == (r = e.options) ? void 0 : r.integrations),
     s = e.options ? this.context(e.options) : [],
     l = s[0],
     c = s[1],
     d = e.options,
     f = (0, o.__rest)(e, ["options"]),
     p = (0, o.__assign)((0, o.__assign)((0, o.__assign)((0, o.__assign)({
      timestamp: new Date
     }, f), {
      context: l,
      integrations: i
     }), c), {
      messageId: d.messageId || this.settings.createMessageId()
     });
    return this.settings.onFinishedEvent(p), ! function(e) {
     if (!(0, u.exists)(e)) throw new k("Event", "is nil");
     if ("object" != typeof e) throw new k("Event", P);
     if (!(0, u.isString)(e.type)) throw new k(".type", N);
     if (!(0, u.isString)(e.messageId)) throw new k(".messageId", N);
     if ("track" === e.type) {
      if (!(0, u.isString)(e.event)) throw new k(".event", N);
      if (!(0, u.isPlainObject)(e.properties)) throw new k(".properties", P)
     } ["group", "identify"].includes(e.type) && function(e) {
      if (!(0, u.isPlainObject)(e.traits)) throw new k(".traits", P)
     }(e)
    }(p), p
   }, e
  }()),
  O = function(e) {
   return "addMiddleware" in e && "destination" === e.type
  },
  R = e.i(793783),
  A = e.i(459912),
  T = e.i(382420),
  D = function() {
   var e, t, n = 0;
   return {
    done: function() {
     return e
    },
    run: function(r) {
     var a = r();
     return "object" == typeof a && null !== a && "then" in a && "function" == typeof a.then && (1 == ++n && (e = new Promise(function(e) {
      return t = e
     })), a.finally(function() {
      return 0 == --n && t()
     })), a
    }
   }
  },
  L = e.i(587603),
  F = function(e) {
   function t(t) {
    return e.call(this, "string" == typeof t ? new R.PersistedPriorityQueue(4, t) : t) || this
   }
   return (0, o.__extends)(t, e), t.prototype.flush = function() {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     return (0, o.__generator)(this, function(t) {
      return (0, h.isOffline)() ? [2, []] : [2, e.prototype.flush.call(this)]
     })
    })
   }, t
  }(function(e) {
   function t(t) {
    var n = e.call(this) || this;
    return n.criticalTasks = D(), n.plugins = [], n.failedInitializations = [], n.flushing = !1, n.queue = t, n.queue.on(A.ON_REMOVE_FROM_FUTURE, function() {
     n.scheduleFlush(0)
    }), n
   }
   return (0, o.__extends)(t, e), t.prototype.register = function(e, t, n) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var r, a, i = this;
     return (0, o.__generator)(this, function(o) {
      switch (o.label) {
       case 0:
        if (this.plugins.push(t), r = function(n) {
          i.failedInitializations.push(t.name), i.emit("initialization_failure", t), console.warn(t.name, n), e.log("warn", "Failed to load destination", {
           plugin: t.name,
           error: n
          }), i.plugins = i.plugins.filter(function(e) {
           return e !== t
          })
         }, "destination" !== t.type || "Segment.io" === t.name) return [3, 1];
        return t.load(e, n).catch(r), [3, 4];
       case 1:
        return o.trys.push([1, 3, , 4]), [4, t.load(e, n)];
       case 2:
        return o.sent(), [3, 4];
       case 3:
        return a = o.sent(), r(a), [3, 4];
       case 4:
        return [2]
      }
     })
    })
   }, t.prototype.deregister = function(e, t, n) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var r;
     return (0, o.__generator)(this, function(a) {
      switch (a.label) {
       case 0:
        if (a.trys.push([0, 3, , 4]), !t.unload) return [3, 2];
        return [4, Promise.resolve(t.unload(e, n))];
       case 1:
        a.sent(), a.label = 2;
       case 2:
        return this.plugins = this.plugins.filter(function(e) {
         return e.name !== t.name
        }), [3, 4];
       case 3:
        return r = a.sent(), e.log("warn", "Failed to unload destination", {
         plugin: t.name,
         error: r
        }), [3, 4];
       case 4:
        return [2]
      }
     })
    })
   }, t.prototype.dispatch = function(e) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t;
     return (0, o.__generator)(this, function(n) {
      return e.log("debug", "Dispatching"), e.stats.increment("message_dispatched"), this.queue.push(e), t = this.subscribeToDelivery(e), this.scheduleFlush(0), [2, t]
     })
    })
   }, t.prototype.subscribeToDelivery = function(e) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t = this;
     return (0, o.__generator)(this, function(n) {
      return [2, new Promise(function(n) {
       var r = function(a, i) {
        a.isSame(e) && (t.off("flush", r), n(a))
       };
       t.on("flush", r)
      })]
     })
    })
   }, t.prototype.dispatchSingle = function(e) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t = this;
     return (0, o.__generator)(this, function(n) {
      return e.log("debug", "Dispatching"), e.stats.increment("message_dispatched"), this.queue.updateAttempts(e), e.attempts = 1, [2, this.deliver(e).catch(function(n) {
       return t.enqueuRetry(n, e) ? t.subscribeToDelivery(e) : (e.setFailedDelivery({
        reason: n
       }), e)
      })]
     })
    })
   }, t.prototype.isEmpty = function() {
    return 0 === this.queue.length
   }, t.prototype.scheduleFlush = function(e) {
    var t = this;
    void 0 === e && (e = 500), this.flushing || (this.flushing = !0, setTimeout(function() {
     t.flush().then(function() {
      setTimeout(function() {
       t.flushing = !1, t.queue.length && t.scheduleFlush(0)
      }, 0)
     })
    }, e))
   }, t.prototype.deliver = function(e) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n, r, a;
     return (0, o.__generator)(this, function(i) {
      switch (i.label) {
       case 0:
        return [4, this.criticalTasks.done()];
       case 1:
        i.sent(), t = Date.now(), i.label = 2;
       case 2:
        return i.trys.push([2, 4, , 5]), [4, this.flushOne(e)];
       case 3:
        return e = i.sent(), n = Date.now() - t, this.emit("delivery_success", e), e.stats.gauge("delivered", n), e.log("debug", "Delivered", e.event), [2, e];
       case 4:
        throw a = r = i.sent(), e.log("error", "Failed to deliver", a), this.emit("delivery_failure", e, a), e.stats.increment("delivery_failed"), r;
       case 5:
        return [2]
      }
     })
    })
   }, t.prototype.enqueuRetry = function(e, t) {
    return !!(!(e instanceof T.ContextCancelation) || e.retry) && this.queue.pushWithBackoff(t)
   }, t.prototype.flush = function() {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var e, t;
     return (0, o.__generator)(this, function(n) {
      switch (n.label) {
       case 0:
        if (0 === this.queue.length || !(e = this.queue.pop())) return [2, []];
        e.attempts = this.queue.getAttempts(e), n.label = 1;
       case 1:
        return n.trys.push([1, 3, , 4]), [4, this.deliver(e)];
       case 2:
        return e = n.sent(), this.emit("flush", e, !0), [3, 4];
       case 3:
        return t = n.sent(), this.enqueuRetry(t, e) || (e.setFailedDelivery({
         reason: t
        }), this.emit("flush", e, !1)), [2, []];
       case 4:
        return [2, [e]]
      }
     })
    })
   }, t.prototype.isReady = function() {
    return !0
   }, t.prototype.availableExtensions = function(e) {
    var t, n, r = (t = "type", n = {}, this.plugins.filter(function(t) {
      if ("destination" !== t.type && "Segment.io" !== t.name) return !0;
      var n, r, a, i = void 0;
      return null == (n = t.alternativeNames) || n.forEach(function(t) {
       void 0 !== e[t] && (i = e[t])
      }), null != (a = null != (r = e[t.name]) ? r : i) ? a : !1 !== ("Segment.io" === t.name || e.All)
     }).forEach(function(e) {
      var r, a = void 0;
      if ("string" == typeof t) {
       var i = e[t];
       a = "string" != typeof i ? JSON.stringify(i) : i
      } else t instanceof Function && (a = t(e));
      void 0 !== a && (n[a] = (0, o.__spreadArray)((0, o.__spreadArray)([], null != (r = n[a]) ? r : [], !0), [e], !1))
     }), n),
     a = r.before,
     i = r.enrichment,
     s = r.destination,
     l = r.after;
    return {
     before: void 0 === a ? [] : a,
     enrichment: void 0 === i ? [] : i,
     destinations: void 0 === s ? [] : s,
     after: void 0 === l ? [] : l
    }
   }, t.prototype.flushOne = function(e) {
    var t, n;
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var r, a, i, s, l, u, c, d, f, p, h, m, g;
     return (0, o.__generator)(this, function(o) {
      switch (o.label) {
       case 0:
        if (!this.isReady()) throw Error("Not ready");
        e.attempts > 1 && this.emit("delivery_retry", e), a = (r = this.availableExtensions(null != (t = e.event.integrations) ? t : {})).before, i = r.enrichment, s = 0, l = a, o.label = 1;
       case 1:
        if (!(s < l.length)) return [3, 4];
        return u = l[s], [4, (0, L.ensure)(e, u)];
       case 2:
        (c = o.sent()) instanceof T.CoreContext && (e = c), this.emit("message_enriched", e, u), o.label = 3;
       case 3:
        return s++, [3, 1];
       case 4:
        d = 0, f = i, o.label = 5;
       case 5:
        if (!(d < f.length)) return [3, 8];
        return p = f[d], [4, (0, L.attempt)(e, p)];
       case 6:
        (c = o.sent()) instanceof T.CoreContext && (e = c), this.emit("message_enriched", e, p), o.label = 7;
       case 7:
        return d++, [3, 5];
       case 8:
        return m = (h = this.availableExtensions(null != (n = e.event.integrations) ? n : {})).destinations, g = h.after, [4, new Promise(function(t, n) {
         setTimeout(function() {
          Promise.all(m.map(function(t) {
           return (0, L.attempt)(e, t)
          })).then(t).catch(n)
         }, 0)
        })];
       case 9:
        return o.sent(), e.stats.increment("message_delivered"), this.emit("message_delivered", e), [4, Promise.all(g.map(function(t) {
         return (0, L.attempt)(e, t)
        }))];
       case 10:
        return o.sent(), [2, e]
      }
     })
    })
   }, t
  }(v.Emitter));

 function q(e) {
  for (var t = e.constructor.prototype, n = 0, r = Object.getOwnPropertyNames(t); n < r.length; n++) {
   var a = r[n];
   if ("constructor" !== a) {
    var i = Object.getOwnPropertyDescriptor(e.constructor.prototype, a);
    i && "function" == typeof i.value && (e[a] = e[a].bind(e))
   }
  }
  return e
 }
 var H = function(e, t, n, r) {
   console.warn("".concat(e.constructor.name, ": Can't ").concat(t, ' key "').concat(n, '" | Err: ').concat(r))
  },
  z = function() {
   function e(e) {
    this.stores = e
   }
   return e.prototype.get = function(e) {
    for (var t = null, n = 0, r = this.stores; n < r.length; n++) {
     var a = r[n];
     try {
      if (null != (t = a.get(e))) return t
     } catch (t) {
      H(a, "get", e, t)
     }
    }
    return null
   }, e.prototype.set = function(e, t) {
    this.stores.forEach(function(n) {
     try {
      n.set(e, t)
     } catch (t) {
      H(n, "set", e, t)
     }
    })
   }, e.prototype.clear = function(e) {
    this.stores.forEach(function(t) {
     try {
      t.remove(e)
     } catch (n) {
      H(t, "remove", e, n)
     }
    })
   }, e.prototype.getAndSync = function(e) {
    var t = this.get(e),
     n = "number" == typeof t ? t.toString() : t;
    return this.set(e, n), n
   }, e
  }(),
  B = function() {
   function e() {
    this.cache = {}
   }
   return e.prototype.get = function(e) {
    var t;
    return null != (t = this.cache[e]) ? t : null
   }, e.prototype.set = function(e, t) {
    this.cache[e] = t
   }, e.prototype.remove = function(e) {
    delete this.cache[e]
   }, e
  }(),
  V = {
   Cookie: "cookie",
   LocalStorage: "localStorage",
   Memory: "memory"
  };

 function $(e) {
  for (var t = 1; t < arguments.length; t++) {
   var n = arguments[t];
   for (var r in n) e[r] = n[r]
  }
  return e
 }
 var K = function e(t, n) {
  function r(e, r, a) {
   if ("u" > typeof document) {
    "number" == typeof(a = $({}, n, a)).expires && (a.expires = new Date(Date.now() + 864e5 * a.expires)), a.expires && (a.expires = a.expires.toUTCString()), e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var i = "";
    for (var o in a) a[o] && (i += "; " + o, !0 !== a[o] && (i += "=" + a[o].split(";")[0]));
    return document.cookie = e + "=" + t.write(r, e) + i
   }
  }
  return Object.create({
   set: r,
   get: function(e) {
    if ("u" > typeof document && (!arguments.length || e)) {
     for (var n = document.cookie ? document.cookie.split("; ") : [], r = {}, a = 0; a < n.length; a++) {
      var i = n[a].split("="),
       o = i.slice(1).join("=");
      try {
       var s = decodeURIComponent(i[0]);
       if (r[s] = t.read(o, s), e === s) break
      } catch (e) {}
     }
     return e ? r[e] : r
    }
   },
   remove: function(e, t) {
    r(e, "", $({}, t, {
     expires: -1
    }))
   },
   withAttributes: function(t) {
    return e(this.converter, $({}, this.attributes, t))
   },
   withConverter: function(t) {
    return e($({}, this.converter, t), this.attributes)
   }
  }, {
   attributes: {
    value: Object.freeze(n)
   },
   converter: {
    value: Object.freeze(t)
   }
  })
 }({
  read: function(e) {
   return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function(e) {
   return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
  }
 }, {
  path: "/"
 });

 function U(e) {
  var t = function(e) {
   try {
    return new URL(e)
   } catch (e) {
    return
   }
  }(e);
  if (t)
   for (var n = function(e) {
     var t = e.hostname.split("."),
      n = t[t.length - 1],
      r = [];
     if (4 === t.length && parseInt(n, 10) > 0 || t.length <= 1) return r;
     for (var a = t.length - 2; a >= 0; --a) r.push(t.slice(a).join("."));
     return r
    }(t), r = 0; r < n.length; ++r) {
    var a = "__tld__",
     i = n[r],
     o = {
      domain: "." + i
     };
    try {
     if (K.set(a, "1", o), K.get(a)) return K.remove(a, o), i
    } catch (e) {
     return
    }
   }
 }
 var G = function() {
   function e(t) {
    void 0 === t && (t = e.defaults), this.options = (0, o.__assign)((0, o.__assign)({}, e.defaults), t)
   }
   return Object.defineProperty(e, "defaults", {
    get: function() {
     return {
      maxage: 365,
      domain: U(window.location.href),
      path: "/",
      sameSite: "Lax"
     }
    },
    enumerable: !1,
    configurable: !0
   }), e.prototype.opts = function() {
    return {
     sameSite: this.options.sameSite,
     expires: this.options.maxage,
     domain: this.options.domain,
     path: this.options.path,
     secure: this.options.secure
    }
   }, e.prototype.get = function(e) {
    var t;
    try {
     var n = K.get(e);
     if (null == n) return null;
     try {
      return null != (t = JSON.parse(n)) ? t : null
     } catch (e) {
      return null != n ? n : null
     }
    } catch (e) {
     return null
    }
   }, e.prototype.set = function(e, t) {
    "string" == typeof t ? K.set(e, t, this.opts()) : null === t ? K.remove(e, this.opts()) : K.set(e, JSON.stringify(t), this.opts())
   }, e.prototype.remove = function(e) {
    return K.remove(e, this.opts())
   }, e
  }(),
  W = function() {
   function e() {}
   return e.prototype.localStorageWarning = function(e, t) {
    console.warn("Unable to access ".concat(e, ", localStorage may be ").concat(t))
   }, e.prototype.get = function(e) {
    var t;
    try {
     var n = localStorage.getItem(e);
     if (null === n) return null;
     try {
      return null != (t = JSON.parse(n)) ? t : null
     } catch (e) {
      return null != n ? n : null
     }
    } catch (t) {
     return this.localStorageWarning(e, "unavailable"), null
    }
   }, e.prototype.set = function(e, t) {
    try {
     localStorage.setItem(e, JSON.stringify(t))
    } catch (t) {
     this.localStorageWarning(e, "full")
    }
   }, e.prototype.remove = function(e) {
    try {
     return localStorage.removeItem(e)
    } catch (t) {
     this.localStorageWarning(e, "unavailable")
    }
   }, e
  }();

 function Y(e) {
  return e && e.stores && Array.isArray(e.stores) && e.stores.every(function(e) {
   return Object.values(V).includes(e)
  })
 }

 function Q(e) {
  return e.map(function(e) {
   var t, n;
   switch ("object" == typeof e && void 0 !== e.name ? (t = e.name, n = e.settings) : t = e, t) {
    case V.Cookie:
     return new G(n);
    case V.LocalStorage:
     return new W;
    case V.Memory:
     return new B;
    default:
     throw Error("Unknown Store Type: ".concat(e))
   }
  })
 }

 function X(e, t) {
  return e.map(function(e) {
   return t && e === V.Cookie ? {
    name: e,
    settings: t
   } : e
  })
 }
 var J = {
   persist: !0,
   cookie: {
    key: "ajs_user_id",
    oldKey: "ajs_user"
   },
   localStorage: {
    key: "ajs_user_traits"
   }
  },
  Z = function() {
   function e(e, t) {
    void 0 === e && (e = J);
    var n, r, a, i, s = this;
    this.options = {}, this.id = function(e) {
     if (s.options.disable) return null;
     var t = s.identityStore.getAndSync(s.idKey);
     void 0 !== e && (s.identityStore.set(s.idKey, e), e !== t && null !== t && null !== e && s.anonymousId(null));
     var n = s.identityStore.getAndSync(s.idKey);
     if (n) return n;
     var r = s.legacyUserStore.get(J.cookie.oldKey);
     return r ? "object" == typeof r ? r.id : r : null
    }, this.anonymousId = function(e) {
     var t, n;
     if (s.options.disable) return null;
     if (void 0 === e) {
      var r = null != (t = s.identityStore.getAndSync(s.anonKey)) ? t : null == (n = s.legacySIO()) ? void 0 : n[0];
      if (r) return r
     }
     return null === e ? s.identityStore.set(s.anonKey, null) : s.identityStore.set(s.anonKey, null != e ? e : (0, y.v4)()), s.identityStore.getAndSync(s.anonKey)
    }, this.traits = function(e) {
     var t;
     if (!s.options.disable) return null === e && (e = {}), e && s.traitsStore.set(s.traitsKey, null != e ? e : {}), null != (t = s.traitsStore.get(s.traitsKey)) ? t : {}
    }, this.options = (0, o.__assign)((0, o.__assign)({}, J), e), this.cookieOptions = t, this.idKey = null != (r = null == (n = e.cookie) ? void 0 : n.key) ? r : J.cookie.key, this.traitsKey = null != (i = null == (a = e.localStorage) ? void 0 : a.key) ? i : J.localStorage.key, this.anonKey = "ajs_anonymous_id", this.identityStore = this.createStorage(this.options, t), this.legacyUserStore = this.createStorage(this.options, t, function(e) {
     return e === V.Cookie
    }), this.traitsStore = this.createStorage(this.options, t, function(e) {
     return e !== V.Cookie
    });
    var l = this.legacyUserStore.get(J.cookie.oldKey);
    l && "object" == typeof l && (l.id && this.id(l.id), l.traits && this.traits(l.traits)), q(this)
   }
   return e.prototype.legacySIO = function() {
    var e = this.legacyUserStore.get("_sio");
    if (!e) return null;
    var t = e.split("----");
    return [t[0], t[1]]
   }, e.prototype.identify = function(e, t) {
    if (!this.options.disable) {
     t = null != t ? t : {};
     var n = this.id();
     (null === n || n === e) && (t = (0, o.__assign)((0, o.__assign)({}, this.traits()), t)), e && this.id(e), this.traits(t)
    }
   }, e.prototype.logout = function() {
    this.anonymousId(null), this.id(null), this.traits({})
   }, e.prototype.reset = function() {
    this.logout(), this.identityStore.clear(this.idKey), this.identityStore.clear(this.anonKey), this.traitsStore.clear(this.traitsKey)
   }, e.prototype.load = function() {
    return new e(this.options, this.cookieOptions)
   }, e.prototype.save = function() {
    return !0
   }, e.prototype.createStorage = function(e, t, n) {
    var r = [V.LocalStorage, V.Cookie, V.Memory];
    return e.disable ? new z([]) : e.persist ? (void 0 !== e.storage && null !== e.storage && Y(e.storage) && (r = e.storage.stores), e.localStorageFallbackDisabled && (r = r.filter(function(e) {
     return e !== V.LocalStorage
    })), n && (r = r.filter(n)), new z(Q(X(r, t)))) : new z([new B])
   }, e.defaults = J, e
  }(),
  ee = {
   persist: !0,
   cookie: {
    key: "ajs_group_id"
   },
   localStorage: {
    key: "ajs_group_properties"
   }
  },
  et = function(e) {
   function t(t, n) {
    void 0 === t && (t = ee);
    var r = e.call(this, (0, o.__assign)((0, o.__assign)({}, ee), t), n) || this;
    return r.anonymousId = function(e) {}, q(r), r
   }
   return (0, o.__extends)(t, e), t
  }(Z),
  en = e.i(930694),
  er = e.i(920611),
  ea = e.i(813113),
  ei = e.i(134621),
  eo = function(e, t, n) {
   n.getAndRemove(e).forEach(function(e) {
    eh(t, e).catch(console.error)
   })
  },
  es = eo.bind(void 0, "on"),
  el = eo.bind(void 0, "setAnonymousId"),
  eu = function(e, t) {
   Object.keys(t.calls).forEach(function(n) {
    t.getAndRemove(n).forEach(function(t) {
     setTimeout(function() {
      eh(e, t).catch(console.error)
     }, 0)
    })
   })
  },
  ec = function(e) {
   if (ed(e)) return j(e.pop())
  },
  ed = function(e) {
   var t = e[e.length - 1];
   if ("object" !== Object.prototype.toString.call(t).slice(8, -1).toLowerCase() || "bpc" !== t.__t) return !1;
   for (var n in t)
    if (!w.includes(n)) return !1;
   return !0
  },
  ef = function(e, t, n, r) {
   void 0 === n && (n = function() {}), void 0 === r && (r = console.error), this.method = e, this.resolve = n, this.reject = r, this.called = !1, this.args = t
  },
  ep = function() {
   function e() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._callMap = {}, this.add.apply(this, e)
   }
   return Object.defineProperty(e.prototype, "calls", {
    get: function() {
     return this._pushSnippetWindowBuffer(), this._callMap
    },
    set: function(e) {
     this._callMap = e
    },
    enumerable: !1,
    configurable: !0
   }), e.prototype.get = function(e) {
    var t;
    return null != (t = this.calls[e]) ? t : []
   }, e.prototype.getAndRemove = function(e) {
    var t = this.get(e);
    return this.calls[e] = [], t
   }, e.prototype.add = function() {
    for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    t.forEach(function(t) {
     ["track", "screen", "alias", "group", "page", "identify"].includes(t.method) && !ed(t.args) && (t.args = (0, o.__spreadArray)((0, o.__spreadArray)([], t.args, !0), [E()], !1)), e.calls[t.method] ? e.calls[t.method].push(t) : e.calls[t.method] = [t]
    })
   }, e.prototype.clear = function() {
    this._pushSnippetWindowBuffer(), this.calls = {}
   }, e.prototype.toArray = function() {
    var e;
    return (e = []).concat.apply(e, Object.values(this.calls))
   }, e.prototype._pushSnippetWindowBuffer = function() {
    if ("npm" !== (0, ei.getVersionType)()) {
     var e = (0, ea.getGlobalAnalytics)();
     if (Array.isArray(e)) {
      var t = e.splice(0, e.length).map(function(e) {
       return new ef(e[0], e.slice(1))
      });
      this.add.apply(this, t)
     }
    }
   }, e
  }();

 function eh(e, t) {
  return (0, o.__awaiter)(this, void 0, void 0, function() {
   var n, r;
   return (0, o.__generator)(this, function(a) {
    switch (a.label) {
     case 0:
      var i;
      if (a.trys.push([0, 3, , 4]), t.called) return [2, void 0];
      if (t.called = !0, !("object" == typeof(i = n = e[t.method].apply(e, t.args)) && null !== i && "then" in i && "function" == typeof i.then)) return [3, 2];
      return [4, n];
     case 1:
      a.sent(), a.label = 2;
     case 2:
      return t.resolve(n), [3, 4];
     case 3:
      return r = a.sent(), t.reject(r), [3, 4];
     case 4:
      return [2]
    }
   })
  })
 }
 var em = function() {
   function e(e) {
    var t = this;
    this.trackSubmit = this._createMethod("trackSubmit"), this.trackClick = this._createMethod("trackClick"), this.trackLink = this._createMethod("trackLink"), this.pageView = this._createMethod("pageview"), this.identify = this._createMethod("identify"), this.reset = this._createMethod("reset"), this.group = this._createMethod("group"), this.track = this._createMethod("track"), this.ready = this._createMethod("ready"), this.alias = this._createMethod("alias"), this.debug = this._createChainableMethod("debug"), this.page = this._createMethod("page"), this.once = this._createChainableMethod("once"), this.off = this._createChainableMethod("off"), this.on = this._createChainableMethod("on"), this.addSourceMiddleware = this._createMethod("addSourceMiddleware"), this.setAnonymousId = this._createMethod("setAnonymousId"), this.addDestinationMiddleware = this._createMethod("addDestinationMiddleware"), this.screen = this._createMethod("screen"), this.register = this._createMethod("register"), this.deregister = this._createMethod("deregister"), this.user = this._createMethod("user"), this.VERSION = en.version, this._preInitBuffer = new ep, this._promise = e(this._preInitBuffer), this._promise.then(function(e) {
     var n = e[0],
      r = e[1];
     t.instance = n, t.ctx = r
    }).catch(function() {})
   }
   return e.prototype.then = function() {
    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (e = this._promise).then.apply(e, t)
   }, e.prototype.catch = function() {
    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (e = this._promise).catch.apply(e, t)
   }, e.prototype.finally = function() {
    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (e = this._promise).finally.apply(e, t)
   }, e.prototype._createMethod = function(e) {
    var t = this;
    return function() {
     for (var n, r = [], a = 0; a < arguments.length; a++) r[a] = arguments[a];
     return t.instance ? Promise.resolve((n = t.instance)[e].apply(n, r)) : new Promise(function(n, a) {
      t._preInitBuffer.add(new ef(e, r, n, a))
     })
    }
   }, e.prototype._createChainableMethod = function(e) {
    var t = this;
    return function() {
     for (var n, r = [], a = 0; a < arguments.length; a++) r[a] = arguments[a];
     return t.instance ? (n = t.instance)[e].apply(n, r) : t._preInitBuffer.add(new ef(e, r)), t
    }
   }, e
  }(),
  eg = e.i(319045),
  ev = e.i(570541),
  ey = function(e) {
   var t = !1;
   window.addEventListener("pagehide", function() {
    t || e(t = !0)
   }), document.addEventListener("visibilitychange", function() {
    if ("hidden" == document.visibilityState) {
     if (t) return;
     t = !0
    } else t = !1;
    e(t)
   })
  },
  eb = function(e) {
   function t(t, n) {
    var r = e.call(this, t) || this;
    return r.retryTimeout = n, r.name = "RateLimitError", r
   }
   return (0, o.__extends)(t, e), t
  }(Error),
  ew = function(e) {
   return (0, o.__assign)({
    "Content-Type": "text/plain"
   }, "function" == typeof e ? e() : e)
  };

 function ex(e) {
  return (encodeURI(JSON.stringify(e)).split(/%..|./).length - 1) / 1024
 }
 var e_ = e.i(785630);

 function ej(e, t, n, r) {
  var a = this;
  e || setTimeout(function() {
   return (0, o.__awaiter)(a, void 0, void 0, function() {
    var e, a;
    return (0, o.__generator)(this, function(i) {
     switch (i.label) {
      case 0:
       return e = !0, [4, function(e, t) {
        return (0, o.__awaiter)(this, void 0, void 0, function() {
         var n, r = this;
         return (0, o.__generator)(this, function(a) {
          switch (a.label) {
           case 0:
            if (n = [], (0, h.isOffline)()) return [2, t];
            return [4, (0, e_.pWhile)(function() {
             return t.length > 0 && !(0, h.isOffline)()
            }, function() {
             return (0, o.__awaiter)(r, void 0, void 0, function() {
              var r;
              return (0, o.__generator)(this, function(a) {
               switch (a.label) {
                case 0:
                 if (!(r = t.pop())) return [2];
                 return [4, (0, L.attempt)(r, e)];
                case 1:
                 return a.sent() instanceof m.Context || n.push(r), [2]
               }
              })
             })
            })];
           case 1:
            return a.sent(), n.map(function(e) {
             return t.pushWithBackoff(e)
            }), [2, t]
          }
         })
        })
       }(n, t)];
      case 1:
       return a = i.sent(), e = !1, t.todo > 0 && r(e, a, n, r), [2]
     }
    })
   })
  }, 5e3 * Math.random())
 }
 var eE = e.i(133041),
  eS = function(e) {
   return "Segment.io" === e.name
  },
  eC = "This is being deprecated and will be not be available in future releases of Analytics JS",
  ek = (0, er.getGlobal)(),
  eN = null == ek ? void 0 : ek.analytics,
  eP = function() {
   function e(e, t) {
    var n;
    this.timeout = 300, this._getSegmentPluginMetadata = function() {
     var e;
     return null == (e = t.plugins.find(eS)) ? void 0 : e.metadata
    }, this.writeKey = e.writeKey, this.cdnSettings = null != (n = e.cdnSettings) ? n : {
     integrations: {
      "Segment.io": {
       apiKey: ""
      }
     }
    }, this.cdnURL = e.cdnURL
   }
   return Object.defineProperty(e.prototype, "apiHost", {
    get: function() {
     var e, t;
     return null == (t = null == (e = this._getSegmentPluginMetadata) ? void 0 : e.call(this)) ? void 0 : t.apiHost
    },
    enumerable: !1,
    configurable: !0
   }), e
  }();

 function eM() {
  console.warn(eC)
 }
 var eI = function(t) {
   function n(e, n, r, a, i) {
    var s, l, u, c, d, f, p = this;
    (p = t.call(this) || this)._debug = !1, p.initialized = !1, p.user = function() {
     return p._user
    }, p.init = p.initialize.bind(p), p.log = eM, p.addIntegrationMiddleware = eM, p.listeners = eM, p.addEventListener = eM, p.removeAllListeners = eM, p.removeListener = eM, p.removeEventListener = eM, p.hasListeners = eM, p.add = eM, p.addIntegration = eM;
    var h = null == n ? void 0 : n.cookie,
     m = null != (d = null == n ? void 0 : n.disableClientPersistence) && d;
    p.queue = null != r ? r : (s = "".concat(e.writeKey, ":event-queue"), void 0 === (l = null == n ? void 0 : n.retryQueue) && (l = !1), void 0 === (u = m) && (u = !1), c = l ? 10 : 1, new F(u ? new A.PriorityQueue(c, []) : new R.PersistedPriorityQueue(c, s))), p.settings = new eP(e, p.queue);
    var g = null == n ? void 0 : n.storage;
    return p._universalStorage = p.createStore(m, g, h), p._user = null != a ? a : new Z((0, o.__assign)({
     persist: !m,
     storage: null == n ? void 0 : n.storage
    }, null == n ? void 0 : n.user), h).load(), p._group = null != i ? i : new et((0, o.__assign)({
     persist: !m,
     storage: null == n ? void 0 : n.storage
    }, null == n ? void 0 : n.group), h).load(), p.eventFactory = new I(p._user), p.integrations = null != (f = null == n ? void 0 : n.integrations) ? f : {}, p.options = null != n ? n : {}, q(p), p
   }
   return (0, o.__extends)(n, t), n.prototype.createStore = function(e, t, n) {
    return new z(e ? [new B] : t && Y(t) ? Q(X(t.stores, n)) : Q([V.LocalStorage, {
     name: V.Cookie,
     settings: n
    }, V.Memory]))
   }, Object.defineProperty(n.prototype, "storage", {
    get: function() {
     return this._universalStorage
    },
    enumerable: !1,
    configurable: !0
   }), n.prototype.track = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n, r, a, i, s, l, u = this;
     return (0, o.__generator)(this, function(o) {
      return t = ec(e), r = (n = c.apply(void 0, e))[0], a = n[1], i = n[2], s = n[3], l = this.eventFactory.track(r, a, i, this.integrations, t), [2, this._dispatch(l, s).then(function(e) {
       return u.emit("track", r, e.event.properties, e.event.options), e
      })]
     })
    })
   }, n.prototype.page = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n, r, a, i, s, l, u, c = this;
     return (0, o.__generator)(this, function(o) {
      return t = ec(e), r = (n = d.apply(void 0, e))[0], a = n[1], i = n[2], s = n[3], l = n[4], u = this.eventFactory.page(r, a, i, s, this.integrations, t), [2, this._dispatch(u, l).then(function(e) {
       return c.emit("page", r, a, e.event.properties, e.event.options), e
      })]
     })
    })
   }, n.prototype.identify = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n, r, a, i, s, l, u = this;
     return (0, o.__generator)(this, function(o) {
      return t = ec(e), r = (n = f(this._user).apply(void 0, e))[0], a = n[1], i = n[2], s = n[3], this._user.identify(r, a), l = this.eventFactory.identify(this._user.id(), this._user.traits(), i, this.integrations, t), [2, this._dispatch(l, s).then(function(e) {
       return u.emit("identify", e.event.userId, e.event.traits, e.event.options), e
      })]
     })
    })
   }, n.prototype.group = function() {
    for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    var r = ec(t);
    if (0 === t.length) return this._group;
    var a = f(this._group).apply(void 0, t),
     i = a[0],
     o = a[1],
     s = a[2],
     l = a[3];
    this._group.identify(i, o);
    var u = this._group.id(),
     c = this._group.traits(),
     d = this.eventFactory.group(u, c, s, this.integrations, r);
    return this._dispatch(d, l).then(function(t) {
     return e.emit("group", t.event.groupId, t.event.traits, t.event.options), t
    })
   }, n.prototype.alias = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n, r, a, i, s, l, u = this;
     return (0, o.__generator)(this, function(o) {
      return t = ec(e), r = (n = p.apply(void 0, e))[0], a = n[1], i = n[2], s = n[3], l = this.eventFactory.alias(r, a, i, this.integrations, t), [2, this._dispatch(l, s).then(function(e) {
       return u.emit("alias", r, a, e.event.options), e
      })]
     })
    })
   }, n.prototype.screen = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n, r, a, i, s, l, u, c = this;
     return (0, o.__generator)(this, function(o) {
      return t = ec(e), r = (n = d.apply(void 0, e))[0], a = n[1], i = n[2], s = n[3], l = n[4], u = this.eventFactory.screen(r, a, i, s, this.integrations, t), [2, this._dispatch(u, l).then(function(e) {
       return c.emit("screen", r, a, e.event.properties, e.event.options), e
      })]
     })
    })
   }, n.prototype.trackClick = function() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return [4, e.A(104098)];
       case 1:
        return [2, (n = r.sent().link).call.apply(n, (0, o.__spreadArray)([this], t, !1))]
      }
     })
    })
   }, n.prototype.trackLink = function() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return [4, e.A(104098)];
       case 1:
        return [2, (n = r.sent().link).call.apply(n, (0, o.__spreadArray)([this], t, !1))]
      }
     })
    })
   }, n.prototype.trackSubmit = function() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return [4, e.A(104098)];
       case 1:
        return [2, (n = r.sent().form).call.apply(n, (0, o.__spreadArray)([this], t, !1))]
      }
     })
    })
   }, n.prototype.trackForm = function() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return [4, e.A(104098)];
       case 1:
        return [2, (n = r.sent().form).call.apply(n, (0, o.__spreadArray)([this], t, !1))]
      }
     })
    })
   }, n.prototype.register = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n = this;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return t = m.Context.system(), [4, Promise.all(e.map(function(e) {
         return n.queue.register(t, e, n)
        }))];
       case 1:
        return r.sent(), [2, t]
      }
     })
    })
   }, n.prototype.deregister = function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t, n = this;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return t = m.Context.system(), [4, Promise.all(e.map(function(e) {
         var r = n.queue.plugins.find(function(t) {
          return t.name === e
         });
         if (r) return n.queue.deregister(t, r, n);
         t.log("warn", "plugin ".concat(e, " not found"))
        }))];
       case 1:
        return r.sent(), [2, t]
      }
     })
    })
   }, n.prototype.debug = function(e) {
    return !1 === e && localStorage.getItem("debug") && localStorage.removeItem("debug"), this._debug = e, this
   }, n.prototype.reset = function() {
    this._user.reset(), this._group.reset(), this.emit("reset")
   }, n.prototype.timeout = function(e) {
    this.settings.timeout = e
   }, n.prototype._dispatch = function(e, t) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n;
     return (0, o.__generator)(this, function(r) {
      return ((n = new m.Context(e)).stats.increment("analytics_js.invoke", 1, [e.type]), (0, h.isOffline)() && !this.options.retryQueue) ? [2, n] : [2, function(e, t, n, r) {
       return (0, o.__awaiter)(this, void 0, void 0, function() {
        var a, i;
        return (0, o.__generator)(this, function(o) {
         switch (o.label) {
          case 0:
           if (n.emit("dispatch_start", e), a = Date.now(), !t.isEmpty()) return [3, 2];
           return [4, t.dispatchSingle(e)];
          case 1:
           return i = o.sent(), [3, 4];
          case 2:
           return [4, t.dispatch(e)];
          case 3:
           i = o.sent(), o.label = 4;
          case 4:
           var s, l;
           if (!(null == r ? void 0 : r.callback)) return [3, 6];
           return [4, (0, g.invokeCallback)(i, r.callback, (s = a, Math.max((null != (l = r.timeout) ? l : 300) - (Date.now() - s), 0)))];
          case 5:
           i = o.sent(), o.label = 6;
          case 6:
           return (null == r ? void 0 : r.debug) && i.flush(), [2, i]
         }
        })
       })
      }(n, this.queue, this, {
       callback: t,
       debug: this._debug,
       timeout: this.settings.timeout
      })]
     })
    })
   }, n.prototype.addSourceMiddleware = function(t) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n = this;
     return (0, o.__generator)(this, function(r) {
      switch (r.label) {
       case 0:
        return [4, this.queue.criticalTasks.run(function() {
         return (0, o.__awaiter)(n, void 0, void 0, function() {
          var n, r, a;
          return (0, o.__generator)(this, function(i) {
           switch (i.label) {
            case 0:
             return [4, e.A(971106)];
            case 1:
             return n = i.sent().sourceMiddlewarePlugin, r = {}, this.queue.plugins.forEach(function(e) {
              if ("destination" === e.type) return r[e.name] = !0
             }), a = n(t, r), [4, this.register(a)];
            case 2:
             return i.sent(), [2]
           }
          })
         })
        })];
       case 1:
        return r.sent(), [2, this]
      }
     })
    })
   }, n.prototype.addDestinationMiddleware = function(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return this.queue.plugins.filter(O).forEach(function(n) {
     ("*" === e || n.name.toLowerCase() === e.toLowerCase()) && n.addMiddleware.apply(n, t)
    }), Promise.resolve(this)
   }, n.prototype.setAnonymousId = function(e) {
    return this._user.anonymousId(e)
   }, n.prototype.queryString = function(t) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     return (0, o.__generator)(this, function(n) {
      switch (n.label) {
       case 0:
        if (!1 === this.options.useQueryString) return [2, []];
        return [4, e.A(216332)];
       case 1:
        return [2, (0, n.sent().queryString)(this, t)]
      }
     })
    })
   }, n.prototype.use = function(e) {
    return e(this), this
   }, n.prototype.ready = function(e) {
    return void 0 === e && (e = function(e) {
     return e
    }), (0, o.__awaiter)(this, void 0, void 0, function() {
     return (0, o.__generator)(this, function(t) {
      return [2, Promise.all(this.queue.plugins.map(function(e) {
       return e.ready ? e.ready() : Promise.resolve()
      })).then(function(t) {
       return e(t), t
      })]
     })
    })
   }, n.prototype.noConflict = function() {
    return console.warn(eC), (0, ea.setGlobalAnalytics)(null != eN ? eN : this), this
   }, n.prototype.normalize = function(e) {
    return console.warn(eC), this.eventFactory.normalize(e)
   }, Object.defineProperty(n.prototype, "failedInitializations", {
    get: function() {
     return console.warn(eC), this.queue.failedInitializations
    },
    enumerable: !1,
    configurable: !0
   }), Object.defineProperty(n.prototype, "VERSION", {
    get: function() {
     return en.version
    },
    enumerable: !1,
    configurable: !0
   }), n.prototype.initialize = function(e, t) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     return (0, o.__generator)(this, function(e) {
      return console.warn(eC), [2, Promise.resolve(this)]
     })
    })
   }, n.prototype.pageview = function(e) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     return (0, o.__generator)(this, function(t) {
      switch (t.label) {
       case 0:
        return console.warn(eC), [4, this.page({
         path: e
        })];
       case 1:
        return t.sent(), [2, this]
      }
     })
    })
   }, Object.defineProperty(n.prototype, "plugins", {
    get: function() {
     var e;
     return console.warn(eC), null != (e = this._plugins) ? e : {}
    },
    enumerable: !1,
    configurable: !0
   }), Object.defineProperty(n.prototype, "Integrations", {
    get: function() {
     return console.warn(eC), this.queue.plugins.filter(function(e) {
      return "destination" === e.type
     }).reduce(function(e, t) {
      var n = "".concat(t.name.toLowerCase().replace(".", "").split(" ").join("-"), "Integration"),
       r = window[n];
      if (!r) return e;
      var a = r.Integration;
      return a ? e[t.name] = a : e[t.name] = r, e
     }, {})
    },
    enumerable: !1,
    configurable: !0
   }), n.prototype.push = function(e) {
    var t = e.shift();
    (!t || this[t]) && this[t].apply(this, e)
   }, n
  }(v.Emitter),
  eO = function(e) {
   function t() {
    var t = e.call(this, {
     writeKey: ""
    }, {
     disableClientPersistence: !0
    }) || this;
    return t.initialized = !0, t
   }
   return (0, o.__extends)(t, e), t
  }(eI),
  eR = e.i(652977),
  eA = e.i(681473),
  eT = e.i(845955),
  eD = function(e) {
   try {
    var t = new URLSearchParams;
    return Object.entries(e).forEach(function(e) {
     var n = e[0],
      r = e[1];
     Array.isArray(r) ? r.forEach(function(e) {
      return t.append(n, e)
     }) : t.append(n, r)
    }), t.toString()
   } catch (e) {
    return ""
   }
  },
  eL = new function() {
   var e = this;
   this.name = "Page Enrichment", this.type = "before", this.version = "0.1.0", this.isLoaded = function() {
    return !0
   }, this.load = function(t, n) {
    return (0, o.__awaiter)(e, void 0, void 0, function() {
     var e;
     return (0, o.__generator)(this, function(t) {
      switch (t.label) {
       case 0:
        this.instance = n, t.label = 1;
       case 1:
        return t.trys.push([1, 3, , 4]), e = this, [4, function(e) {
         return (0, o.__awaiter)(this, void 0, void 0, function() {
          var t;
          return (0, o.__generator)(this, function(n) {
           return (t = navigator.userAgentData) ? e ? [2, t.getHighEntropyValues(e).catch(function() {
            return t.toJSON()
           })] : [2, t.toJSON()] : [2, void 0]
          })
         })
        }(this.instance.options.highEntropyValuesClientHints)];
       case 2:
        return e.userAgentData = t.sent(), [3, 4];
       case 3:
        return t.sent(), [3, 4];
       case 4:
        return [2, Promise.resolve()]
      }
     })
    })
   }, this.enrich = function(n) {
    var r, a, i, s, l, u, c = n.event.context,
     d = c.page.search || "",
     f = "object" == typeof d ? eD(d) : d;
    c.userAgent = navigator.userAgent, c.userAgentData = e.userAgentData;
    var p = navigator.userLanguage || navigator.language;
    void 0 === c.locale && void 0 !== p && (c.locale = p), null != c.library || (c.library = {
     name: "analytics.js",
     version: "".concat("web" === (0, ei.getVersionType)() ? "next" : "npm:next", "-").concat(en.version)
    }), f && !c.campaign && ((r = f).startsWith("?") && (r = r.substring(1)), c.campaign = (r = r.replace(/\?/g, "&")).split("&").reduce(function(e, t) {
     var n = t.split("="),
      r = n[0],
      a = n[1];
     if (r.includes("utm_") && r.length > 4) {
      var i = r.slice(4);
      "campaign" === i && (i = "name"), e[i] = (0, eT.gracefulDecodeURIComponent)(void 0 === a ? "" : a)
     }
     return e
    }, {}));
    var h = function() {
     var e = K.get("_ga");
     if (e && e.startsWith("amp")) return e
    }();
    h && (c.amp = {
     id: h
    }), s = (i = new z(null != (u = e.instance.options.disableClientPersistence) && u ? [] : [new G(function() {
     if (t) return t;
     var e = U(window.location.href);
     return t = {
      expires: 31536e6,
      secure: !1,
      path: "/"
     }, e && (t.domain = e), t
    }())])).get("s:context.referrer"), (l = null != (a = function(e) {
     var t = {
      btid: "dataxu",
      urid: "millennial-media"
     };
     e.startsWith("?") && (e = e.substring(1));
     for (var n = (e = e.replace(/\?/g, "&")).split("&"), r = 0; r < n.length; r++) {
      var a = n[r].split("="),
       i = a[0],
       o = a[1];
      if (t[i]) return {
       id: o,
       type: t[i]
      }
     }
    }(f)) ? a : s) && (c && (c.referrer = (0, o.__assign)((0, o.__assign)({}, c.referrer), l)), i.set("s:context.referrer", l));
    try {
     c.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch (e) {}
    return n
   }, this.track = this.enrich, this.identify = this.enrich, this.page = this.enrich, this.group = this.enrich, this.alias = this.enrich, this.screen = this.enrich
  },
  eF = e.i(380924),
  eq = e.i(824124),
  eH = e.i(231320),
  ez = function() {
   function e(e, t) {
    this.version = "1.0.0", this.alternativeNames = [], this.loadPromise = (0, eA.createDeferred)(), this.middleware = [], this.alias = this._createMethod("alias"), this.group = this._createMethod("group"), this.identify = this._createMethod("identify"), this.page = this._createMethod("page"), this.screen = this._createMethod("screen"), this.track = this._createMethod("track"), this.action = t, this.name = e, this.type = t.type, this.alternativeNames.push(t.name)
   }
   return e.prototype.addMiddleware = function() {
    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    "destination" === this.type && (e = this.middleware).push.apply(e, t)
   }, e.prototype.transform = function(e) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var t;
     return (0, o.__generator)(this, function(n) {
      switch (n.label) {
       case 0:
        return [4, (0, eq.applyDestinationMiddleware)(this.name, e.event, this.middleware)];
       case 1:
        return null === (t = n.sent()) && e.cancel(new T.ContextCancelation({
         retry: !1,
         reason: "dropped by destination middleware"
        })), [2, new m.Context(t)]
      }
     })
    })
   }, e.prototype._createMethod = function(e) {
    var t = this;
    return function(n) {
     return (0, o.__awaiter)(t, void 0, void 0, function() {
      var t, r;
      return (0, o.__generator)(this, function(a) {
       switch (a.label) {
        case 0:
         if (!this.action[e]) return [2, n];
         if (t = n, "destination" !== this.type) return [3, 2];
         return [4, this.transform(n)];
        case 1:
         t = a.sent(), a.label = 2;
        case 2:
         return a.trys.push([2, 5, , 6]), [4, this.ready()];
        case 3:
         if (!a.sent()) throw Error("Something prevented the destination from getting ready");
         return (0, eH.recordIntegrationMetric)(n, {
          integrationName: this.action.name,
          methodName: e,
          type: "action"
         }), [4, this.action[e](t)];
        case 4:
         return a.sent(), [3, 6];
        case 5:
         throw r = a.sent(), (0, eH.recordIntegrationMetric)(n, {
          integrationName: this.action.name,
          methodName: e,
          type: "action",
          didError: !0
         }), r;
        case 6:
         return [2, n]
       }
      })
     })
    }
   }, e.prototype.isLoaded = function() {
    return this.action.isLoaded()
   }, e.prototype.ready = function() {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     return (0, o.__generator)(this, function(e) {
      switch (e.label) {
       case 0:
        return e.trys.push([0, 2, , 3]), [4, this.loadPromise.promise];
       case 1:
        return e.sent(), [2, !0];
       case 2:
        return e.sent(), [2, !1];
       case 3:
        return [2]
      }
     })
    })
   }, e.prototype.load = function(e, t) {
    return (0, o.__awaiter)(this, void 0, void 0, function() {
     var n, r, a, i;
     return (0, o.__generator)(this, function(o) {
      switch (o.label) {
       case 0:
        if (this.loadPromise.isSettled()) return [2, this.loadPromise.promise];
        o.label = 1;
       case 1:
        return o.trys.push([1, 3, , 4]), (0, eH.recordIntegrationMetric)(e, {
         integrationName: this.action.name,
         methodName: "load",
         type: "action"
        }), n = this.action.load(e, t), a = (r = this.loadPromise).resolve, [4, n];
       case 2:
        return a.apply(r, [o.sent()]), [2, n];
       case 3:
        throw i = o.sent(), (0, eH.recordIntegrationMetric)(e, {
         integrationName: this.action.name,
         methodName: "load",
         type: "action",
         didError: !0
        }), this.loadPromise.reject(i), i;
       case 4:
        return [2]
      }
     })
    })
   }, e.prototype.unload = function(e, t) {
    var n, r;
    return null == (r = (n = this.action).unload) ? void 0 : r.call(n, e, t)
   }, e
  }(),
  eB = (0, er.getGlobal)(),
  eV = null != (n = eB.__SEGMENT_INSPECTOR__) ? n : eB.__SEGMENT_INSPECTOR__ = {},
  e$ = function(e) {
   var t;
   return null == (t = eV.attach) ? void 0 : t.call(eV, e)
  },
  eK = e.i(778302),
  eU = function() {
   var e, t, n = null != (e = window.location.hash) ? e : "",
    r = null != (t = window.location.search) ? t : "";
   return r.length ? r : n.replace(/(?=#).*(?=\?)/, "")
  };
 let eG = (function(t) {
  function n() {
   var n = this,
    r = (0, eA.createDeferred)(),
    a = r.promise,
    i = r.resolve;
   return (n = t.call(this, function(t) {
    return a.then(function(n) {
     return function(t, n, r) {
      var a, i, u, c, d, f, p, g, v;
      return void 0 === n && (n = {}), (0, o.__awaiter)(this, void 0, void 0, function() {
       var y, b, w, x, _, j, E, S, C, k;
       return (0, o.__generator)(this, function(N) {
        switch (N.label) {
         case 0:
          if (!0 === n.disable) return [2, [new eO, m.Context.system()]];
          if (n.globalAnalyticsKey && (0, ea.setGlobalAnalyticsKey)(n.globalAnalyticsKey), t.cdnURL && (0, l.setGlobalCDNUrl)(t.cdnURL), n.initialPageview && r.add(new ef("page", [])), y = eU(), b = null != (a = t.cdnURL) ? a : (0, l.getCDN)(), null == (i = t.cdnSettings)) return [3, 1];
          return x = i, [3, 3];
         case 1:
          var P, M;
          return [4, (P = t.writeKey, M = b, (0, ev.fetch)("".concat(M, "/v1/projects/").concat(P, "/settings")).then(function(e) {
           return e.ok ? e.json() : e.text().then(function(e) {
            throw Error(e)
           })
          }).catch(function(e) {
           throw console.error(e.message), e
          }))];
         case 2:
          x = N.sent(), N.label = 3;
         case 3:
          if (w = x, n.updateCDNSettings && (w = n.updateCDNSettings(w)), "function" != typeof n.disable) return [3, 5];
          return [4, n.disable(w)];
         case 4:
          if (N.sent()) return [2, [new eO, m.Context.system()]];
          N.label = 5;
         case 5:
          return _ = null == (c = null == (u = w.integrations["Segment.io"]) ? void 0 : u.retryQueue) || c, n = (0, o.__assign)({
           retryQueue: _
          }, n), e$(j = new eI((0, o.__assign)((0, o.__assign)({}, t), {
           cdnSettings: w,
           cdnURL: b
          }), n)), E = null != (d = t.plugins) ? d : [], S = null != (f = t.classicIntegrations) ? f : [], C = null == (p = n.integrations) ? void 0 : p["Segment.io"], eK.Stats.initRemoteMetrics((0, o.__assign)((0, o.__assign)({}, w.metrics), {
           host: null != (g = null == C ? void 0 : C.apiHost) ? g : null == (v = w.metrics) ? void 0 : v.host,
           protocol: null == C ? void 0 : C.protocol
          })), [4, function(t, n, r, a, i, u, c) {
           var d, f, p;
           return void 0 === i && (i = []), (0, o.__awaiter)(this, void 0, void 0, function() {
            var g, v, y, b, w, x, _, j, E, S, C, k, N, P, M = this;
            return (0, o.__generator)(this, function(I) {
             var O, T, D;
             switch (I.label) {
              case 0:
               if (el(r, c), es(r, c), g = null == i ? void 0 : i.filter(function(e) {
                 return "object" == typeof e
                }), v = null == i ? void 0 : i.filter(function(e) {
                 return "function" == typeof e && "string" == typeof e.pluginName
                }), "test" === s().NODE_ENV || !((null != (D = null == (T = null == (O = n.middlewareSettings) ? void 0 : O.routingRules) ? void 0 : T.length) ? D : 0) > 0)) return [3, 2];
               return [4, e.A(369583).then(function(e) {
                return e.tsubMiddleware(n.middlewareSettings.routingRules)
               })];
              case 1:
               return b = I.sent(), [3, 3];
              case 2:
               b = void 0, I.label = 3;
              case 3:
               if (y = b, ("test" === s().NODE_ENV || !(Object.keys(n.integrations).length > 1)) && !(u.length > 0)) return [3, 5];
               return [4, e.A(149122).then(function(e) {
                return e.ajsDestinations(t, n, r.integrations, a, y, u)
               })];
              case 4:
               return x = I.sent(), [3, 6];
              case 5:
               x = [], I.label = 6;
              case 6:
               if (w = x, !n.legacyVideoPluginsEnabled) return [3, 8];
               return [4, e.A(473470).then(function(e) {
                return e.loadLegacyVideoPlugins(r)
               })];
              case 7:
               I.sent(), I.label = 8;
              case 8:
               if (!(null == (d = a.plan) ? void 0 : d.track)) return [3, 10];
               return [4, e.A(128089).then(function(e) {
                var t;
                return e.schemaFilter(null == (t = a.plan) ? void 0 : t.track, n)
               })];
              case 9:
               return j = I.sent(), [3, 11];
              case 10:
               j = void 0, I.label = 11;
              case 11:
               return _ = j, E = (0, eR.mergedOptions)(n, a), [4, (function(e, t, n, r, a, i) {
                var s, u, c;
                return (0, o.__awaiter)(this, void 0, void 0, function() {
                 var d, f, p = this;
                 return (0, o.__generator)(this, function(h) {
                  switch (h.label) {
                   case 0:
                    return d = [], f = null != (u = null == (s = e.middlewareSettings) ? void 0 : s.routingRules) ? u : [], [4, Promise.all((null != (c = e.remotePlugins) ? c : []).map(function(e) {
                     return (0, o.__awaiter)(p, void 0, void 0, function() {
                      var s, u, c, p, h, m;
                      return (0, o.__generator)(this, function(g) {
                       switch (g.label) {
                        case 0:
                         var v, y;
                         if (v = t[e.creationName], y = t[e.name], !1 === t.All && !v && !y || !1 === v || !1 === y || 0) return [2];
                         g.label = 1;
                        case 1:
                         if (g.trys.push([1, 6, , 7]), u = null == i ? void 0 : i.find(function(t) {
                           return t.pluginName === e.name
                          })) return [3, 3];
                         return [4, function(e, t) {
                          return (0, o.__awaiter)(this, void 0, void 0, function() {
                           var n, r, a, i, s, u;
                           return (0, o.__generator)(this, function(o) {
                            switch (o.label) {
                             case 0:
                              if (o.trys.push([0, 9, , 10]), n = RegExp("https://cdn.segment.(com|build)"), r = (0, l.getCDN)(), !t) return [3, 6];
                              i = (a = e.url.split("/"))[a.length - 2], s = e.url.replace(i, btoa(i).replace(/=/g, "")), o.label = 1;
                             case 1:
                              return o.trys.push([1, 3, , 5]), [4, (0, eF.loadScript)(s.replace(n, r))];
                             case 2:
                             case 4:
                              return o.sent(), [3, 5];
                             case 3:
                              return o.sent(), [4, (0, eF.loadScript)(e.url.replace(n, r))];
                             case 5:
                              return [3, 8];
                             case 6:
                              return [4, (0, eF.loadScript)(e.url.replace(n, r))];
                             case 7:
                              o.sent(), o.label = 8;
                             case 8:
                              if ("function" == typeof window[e.libraryName]) return [2, window[e.libraryName]];
                              return [3, 10];
                             case 9:
                              throw u = o.sent(), console.error("Failed to create PluginFactory", e), u;
                             case 10:
                              return [2]
                            }
                           })
                          })
                         }(e, null == r ? void 0 : r.obfuscate)];
                        case 2:
                         u = g.sent(), g.label = 3;
                        case 3:
                         if (!(s = u)) return [3, 5];
                         return c = n[e.name], [4, s((0, o.__assign)((0, o.__assign)({}, e.settings), c))];
                        case 4:
                         ! function(e) {
                          if (!Array.isArray(e)) throw Error("Not a valid list of plugins");
                          var t = ["load", "isLoaded", "name", "version", "type"];
                          e.forEach(function(e) {
                           t.forEach(function(t) {
                            var n;
                            if (void 0 === e[t]) throw Error("Plugin: ".concat(null != (n = e.name) ? n : "unknown", " missing required function ").concat(t))
                           })
                          })
                         }(h = Array.isArray(p = g.sent()) ? p : [p]), m = f.filter(function(t) {
                          return t.destinationName === e.creationName
                         }), h.forEach(function(t) {
                          var n = new ez(e.creationName, t);
                          m.length && a && n.addMiddleware(a), d.push(n)
                         }), g.label = 5;
                        case 5:
                         return [3, 7];
                        case 6:
                         return console.warn("Failed to load Remote Plugin", g.sent()), [3, 7];
                        case 7:
                         return [2]
                       }
                      })
                     })
                    }))];
                   case 1:
                    return h.sent(), [2, d.filter(Boolean)]
                  }
                 })
                })
               })(n, r.integrations, E, a, y, v).catch(function() {
                return []
               })];
              case 12:
               if (S = I.sent(), C = (0, o.__spreadArray)((0, o.__spreadArray)([eL], w, !0), S, !0), _ && C.push(_), (null == (f = a.integrations) ? void 0 : f.All) === !1 && !a.integrations["Segment.io"] || a.integrations && !1 === a.integrations["Segment.io"]) return [3, 14];
               return N = (k = C).push, [4, function(e, t, n) {
                window.addEventListener("pagehide", function() {
                 u.push.apply(u, Array.from(c)), c.clear()
                });
                var r, a, i, s, l = null != (a = null == t ? void 0 : t.apiKey) ? a : "",
                 u = e.options.disableClientPersistence ? new A.PriorityQueue(e.queue.queue.maxAttempts, []) : new R.PersistedPriorityQueue(e.queue.queue.maxAttempts, "".concat(l, ":dest-Segment.io")),
                 c = new Set,
                 d = null != (i = null == t ? void 0 : t.apiHost) ? i : eE.SEGMENT_API_HOST,
                 f = null != (s = null == t ? void 0 : t.protocol) ? s : "https",
                 p = "".concat(f, "://").concat(d),
                 g = null == t ? void 0 : t.deliveryStrategy,
                 v = g && "strategy" in g && "batching" === g.strategy ? function(e, t) {
                  var n, r, a, i = [],
                   s = !1,
                   l = null != (n = null == t ? void 0 : t.size) ? n : 10,
                   u = null != (r = null == t ? void 0 : t.timeout) ? r : 5e3,
                   c = 0;

                  function d(n) {
                   if (0 !== n.length) {
                    var r, a = null == (r = n[0]) ? void 0 : r.writeKey,
                     i = n.map(function(e) {
                      return e.sentAt, (0, o.__rest)(e, ["sentAt"])
                     });
                    return (0, ev.fetch)("https://".concat(e, "/b"), {
                     credentials: null == t ? void 0 : t.credentials,
                     keepalive: (null == t ? void 0 : t.keepalive) || s,
                     headers: ew(null == t ? void 0 : t.headers),
                     method: "post",
                     body: JSON.stringify({
                      writeKey: a,
                      batch: i,
                      sentAt: new Date().toISOString()
                     }),
                     priority: null == t ? void 0 : t.priority
                    }).then(function(e) {
                     var t;
                     if (e.status >= 500) throw Error("Bad response from server: ".concat(e.status));
                     if (429 === e.status) {
                      var n = null == (t = e.headers) ? void 0 : t.get("x-ratelimit-reset"),
                       r = "string" == typeof n ? 1e3 * parseInt(n) : u;
                      throw new eb("Rate limit exceeded: ".concat(e.status), r)
                     }
                    })
                   }
                  }

                  function f(e) {
                   var n;
                   return void 0 === e && (e = 1), (0, o.__awaiter)(this, void 0, void 0, function() {
                    var r;
                    return (0, o.__generator)(this, function(a) {
                     return i.length ? (r = i, i = [], [2, null == (n = d(r)) ? void 0 : n.catch(function(n) {
                      var a;
                      m.Context.system().log("error", "Error sending batch", n), e <= (null != (a = null == t ? void 0 : t.maxRetries) ? a : 10) && ("RateLimitError" === n.name && (c = n.retryTimeout), i.push.apply(i, r), i.map(function(t) {
                       "_metadata" in t && (t._metadata = (0, o.__assign)((0, o.__assign)({}, t._metadata), {
                        retryCount: e
                       }))
                      }), p(e + 1))
                     })]) : [2]
                    })
                   })
                  }

                  function p(e) {
                   void 0 === e && (e = 1), a || (a = setTimeout(function() {
                    a = void 0, f(e).catch(console.error)
                   }, c || u), c = 0)
                  }
                  return ey(function(e) {
                   if ((s = e) && i.length) {
                    var t, n;
                    Promise.all((t = [], n = 0, i.forEach(function(e) {
                     ex(t[n]) >= 64 && n++, t[n] ? t[n].push(e) : t[n] = [e]
                    }), t).map(d)).catch(console.error)
                   }
                  }), {
                   dispatch: function(e, n) {
                    return (0, o.__awaiter)(this, void 0, void 0, function() {
                     return (0, o.__generator)(this, function(e) {
                      return i.push(n), [2, i.length >= l || ex(i) >= 450 || (null == t ? void 0 : t.keepalive) && ex(i) >= 54 || s ? f() : p()]
                     })
                    })
                   }
                  }
                 }(d, g.config) : (r = null == g ? void 0 : g.config, {
                  dispatch: function(e, t) {
                   return (0, ev.fetch)(e, {
                    credentials: null == r ? void 0 : r.credentials,
                    keepalive: null == r ? void 0 : r.keepalive,
                    headers: ew(null == r ? void 0 : r.headers),
                    method: "post",
                    body: JSON.stringify(t),
                    priority: null == r ? void 0 : r.priority
                   }).then(function(e) {
                    var t;
                    if (e.status >= 500) throw Error("Bad response from server: ".concat(e.status));
                    if (429 === e.status) {
                     var n = null == (t = e.headers) ? void 0 : t.get("x-ratelimit-reset"),
                      r = n ? 1e3 * parseInt(n) : 5e3;
                     throw new eb("Rate limit exceeded: ".concat(e.status), r)
                    }
                   })
                  }
                 });

                function y(r) {
                 return (0, o.__awaiter)(this, void 0, void 0, function() {
                  var a, i;
                  return (0, o.__generator)(this, function(s) {
                   var l, d, f, m, g, y;
                   return (0, h.isOffline)() ? (u.push(r), ej(!1, u, b, ej), [2, r]) : (c.add(r), a = r.event.type.charAt(0), i = (0, eg.toFacade)(r.event).json(), "track" === r.event.type && delete i.traits, "alias" === r.event.type && (l = i, y = e.user(), l.previousId = null != (m = null != (f = null != (d = l.previousId) ? d : l.from) ? f : y.id()) ? m : y.anonymousId(), l.userId = null != (g = l.userId) ? g : l.to, delete l.from, delete l.to, i = l), u.getAttempts(r) >= u.maxAttempts) ? (c.delete(r), [2, r]) : [2, v.dispatch("".concat(p, "/").concat(a), function(e, t, n, r, a) {
                    var i, s = e.user();
                    delete t.options, t.writeKey = null == n ? void 0 : n.apiKey, t.userId = t.userId || s.id(), t.anonymousId = t.anonymousId || s.anonymousId(), t.sentAt = new Date;
                    var l = e.queue.failedInitializations || [];
                    l.length > 0 && (t._metadata = {
                     failedInitializations: l
                    }), null != a && (a.attempts > 1 && (t._metadata = (0, o.__assign)((0, o.__assign)({}, t._metadata), {
                     retryCount: a.attempts
                    })), a.attempts++);
                    var u = [],
                     c = [];
                    for (var d in r) {
                     var f = r[d];
                     "Segment.io" === d && u.push(d), "bundled" === f.bundlingStatus && u.push(d), "unbundled" === f.bundlingStatus && c.push(d)
                    }
                    for (var p = 0, h = (null == n ? void 0 : n.unbundledIntegrations) || []; p < h.length; p++) {
                     var m = h[p];
                     c.includes(m) || c.push(m)
                    }
                    var g = null != (i = null == n ? void 0 : n.maybeBundledConfigIds) ? i : {},
                     v = [];
                    return u.sort().forEach(function(e) {
                     var t;
                     (null != (t = g[e]) ? t : []).forEach(function(e) {
                      v.push(e)
                     })
                    }), (null == n ? void 0 : n.addBundledMetadata) !== !1 && (t._metadata = (0, o.__assign)((0, o.__assign)({}, t._metadata), {
                     bundled: u.sort(),
                     unbundled: c.sort(),
                     bundledIds: v
                    })), t
                   }(e, i, t, n, r)).then(function() {
                    return r
                   }).catch(function(e) {
                    if (r.log("error", "Error sending event", e), "RateLimitError" === e.name) {
                     var t = e.retryTimeout;
                     u.pushWithBackoff(r, t)
                    } else u.pushWithBackoff(r);
                    return ej(!1, u, b, ej), r
                   }).finally(function() {
                    c.delete(r)
                   })]
                  })
                 })
                }
                var b = {
                 metadata: {
                  writeKey: l,
                  apiHost: d,
                  protocol: f
                 },
                 name: "Segment.io",
                 type: "destination",
                 version: "0.1.0",
                 isLoaded: function() {
                  return !0
                 },
                 load: function() {
                  return Promise.resolve()
                 },
                 track: y,
                 identify: y,
                 page: y,
                 alias: y,
                 group: y,
                 screen: y
                };
                return u.todo && ej(!1, u, b, ej), b
               }(r, E["Segment.io"], n.integrations)];
              case 13:
               N.apply(k, [I.sent()]), I.label = 14;
              case 14:
               return [4, r.register.apply(r, (0, o.__spreadArray)((0, o.__spreadArray)([], C, !1), g, !1))];
              case 15:
               return P = I.sent(), [4, (0, o.__awaiter)(void 0, void 0, void 0, function() {
                var e, t;
                return (0, o.__generator)(this, function(n) {
                 switch (n.label) {
                  case 0:
                   e = 0, t = c.getAndRemove("register"), n.label = 1;
                  case 1:
                   if (!(e < t.length)) return [3, 4];
                   return [4, eh(r, t[e]).catch(console.error)];
                  case 2:
                   n.sent(), n.label = 3;
                  case 3:
                   return e++, [3, 1];
                  case 4:
                   return [2]
                 }
                })
               })];
              case 16:
               if (I.sent(), !Object.entries(null != (p = n.enabledMiddleware) ? p : {}).some(function(e) {
                 return e[1]
                })) return [3, 18];
               return [4, e.A(414800).then(function(e) {
                var t = e.remoteMiddlewares;
                return (0, o.__awaiter)(M, void 0, void 0, function() {
                 return (0, o.__generator)(this, function(e) {
                  switch (e.label) {
                   case 0:
                    return [4, t(P, n, a.obfuscate)];
                   case 1:
                    return [2, Promise.all(e.sent().map(function(e) {
                     return r.addSourceMiddleware(e)
                    }))]
                  }
                 })
                })
               })];
              case 17:
               I.sent(), I.label = 18;
              case 18:
               return [4, (0, o.__awaiter)(void 0, void 0, void 0, function() {
                var e, t;
                return (0, o.__generator)(this, function(n) {
                 switch (n.label) {
                  case 0:
                   e = 0, t = c.getAndRemove("addSourceMiddleware"), n.label = 1;
                  case 1:
                   if (!(e < t.length)) return [3, 4];
                   return [4, eh(r, t[e]).catch(console.error)];
                  case 2:
                   n.sent(), n.label = 3;
                  case 3:
                   return e++, [3, 1];
                  case 4:
                   return [2]
                 }
                })
               })];
              case 19:
               return I.sent(), [2, P]
             }
            })
           })
          }(t.writeKey, w, j, n, E, S, r)];
         case 6:
          return k = N.sent(), j.initialized = !0, j.emit("initialize", t, n), [4, function(e, t, n) {
           return (0, o.__awaiter)(this, void 0, void 0, function() {
            return (0, o.__generator)(this, function(r) {
             switch (r.label) {
              case 0:
               var a, i;
               return [4, (a = e, i = t, (0, o.__awaiter)(void 0, void 0, void 0, function() {
                return (0, o.__generator)(this, function(e) {
                 switch (e.label) {
                  case 0:
                   if (!i.includes("ajs_")) return [3, 2];
                   return [4, a.queryString(i).catch(console.error)];
                  case 1:
                   e.sent(), e.label = 2;
                  case 2:
                   return [2]
                 }
                })
               }))];
              case 1:
               return r.sent(), eu(e, n), [2]
             }
            })
           })
          }(j, y, r)];
         case 7:
          return N.sent(), [2, [j, k]]
        }
       })
      })
     }(n[0], n[1], t)
    })
   }) || this)._resolveLoadStart = function(e, t) {
    return i([e, t])
   }, n
  }
  return (0, o.__extends)(n, t), n.prototype.load = function(e, t) {
   return void 0 === t && (t = {}), this._resolveLoadStart(e, t), this
  }, n.load = function(e, t) {
   return void 0 === t && (t = {}), new n().load(e, t)
  }, n.standalone = function(e, t) {
   return n.load({
    writeKey: e
   }, t).then(function(e) {
    return e[0]
   })
  }, n
 })(em).load({
  writeKey: "gBBPRCTKyGLIyoGVtzzqcbiDUCVmIIWY"
 });

 function eW() {
  let e = (0, a.usePathname)(),
   t = (0, a.useSearchParams)();
  return (0, r.useEffect)(() => {
   eG.page()
  }, [e, t]), null
 }
 e.s(["default", () => eW], 194091)
}, 838233, e => {
 "use strict";
 var t = e.i(843476),
  n = e.i(846696);
 let r = ({
  ...e
 }) => (0, t.jsx)(n.Toaster, {
  theme: "light",
  className: "toaster group",
  style: {
   "--normal-bg": "var(--color-background)",
   "--normal-text": "var(--color-foreground)",
   "--normal-border": "var(--color-border)"
  },
  ...e
 });
 e.s(["Toaster", () => r])
}, 620989, e => {
 "use strict";
 var t = e.i(419744),
  t = t,
  n = e.i(846696);

 function r(e) {
  if ((0, t.t)(e)) {
   let {
    addOriginUrl: t
   } = e;
   n.toast.error("Sanity Live couldn't connect", {
    description: "Your origin is blocked by CORS policy",
    duration: 1 / 0,
    action: t ? {
     label: "Manage",
     onClick: () => window.open(t.toString(), "_blank")
    } : void 0
   })
  } else e instanceof Error ? (console.error(e), n.toast.error(e.name, {
   description: e.message,
   duration: 1 / 0
  })) : (console.error(e), n.toast.error("Unknown error", {
   description: "Check the console for more details",
   duration: 1 / 0
  }))
 }
 e.s(["handleError", () => r], 620989)
}]);