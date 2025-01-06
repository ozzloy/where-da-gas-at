var qm = Object.defineProperty;
var eg = (e, t, n) =>
  t in e
    ? qm(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      })
    : (e[t] = n);
var La = (e, t, n) => (
  eg(e, typeof t != "symbol" ? t + "" : t, n), n
);
function Mf(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll(
    'link[rel="modulepreload"]',
  ))
    r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const l of i.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
var oo =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function wu(e) {
  return e &&
    e.__esModule &&
    Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Of = { exports: {} },
  Ll = {},
  Df = { exports: {} },
  ee = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var oi = Symbol.for("react.element"),
  tg = Symbol.for("react.portal"),
  ng = Symbol.for("react.fragment"),
  rg = Symbol.for("react.strict_mode"),
  og = Symbol.for("react.profiler"),
  ig = Symbol.for("react.provider"),
  lg = Symbol.for("react.context"),
  ag = Symbol.for("react.forward_ref"),
  sg = Symbol.for("react.suspense"),
  ug = Symbol.for("react.memo"),
  cg = Symbol.for("react.lazy"),
  Uc = Symbol.iterator;
function dg(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Uc && e[Uc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var zf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ff = Object.assign,
  If = {};
function Jr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = If),
    (this.updater = n || zf);
}
Jr.prototype.isReactComponent = {};
Jr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Jr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Af() {}
Af.prototype = Jr.prototype;
function Su(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = If),
    (this.updater = n || zf);
}
var xu = (Su.prototype = new Af());
xu.constructor = Su;
Ff(xu, Jr.prototype);
xu.isPureReactComponent = !0;
var bc = Array.isArray,
  $f = Object.prototype.hasOwnProperty,
  Cu = { current: null },
  Uf = { key: !0, ref: !0, __self: !0, __source: !0 };
function bf(e, t, n) {
  var r,
    o = {},
    i = null,
    l = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (l = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      $f.call(t, r) && !Uf.hasOwnProperty(r) && (o[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) o.children = n;
  else if (1 < a) {
    for (var s = Array(a), u = 0; u < a; u++) s[u] = arguments[u + 2];
    o.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a))
      o[r] === void 0 && (o[r] = a[r]);
  return {
    $$typeof: oi,
    type: e,
    key: i,
    ref: l,
    props: o,
    _owner: Cu.current,
  };
}
function fg(e, t) {
  return {
    $$typeof: oi,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Eu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === oi;
}
function pg(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Bc = /\/+/g;
function Ma(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? pg("" + e.key)
    : t.toString(36);
}
function Fi(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else
    switch (i) {
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case oi:
          case tg:
            l = !0;
        }
    }
  if (l)
    return (
      (l = e),
      (o = o(l)),
      (e = r === "" ? "." + Ma(l, 0) : r),
      bc(o)
        ? ((n = ""),
          e != null && (n = e.replace(Bc, "$&/") + "/"),
          Fi(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Eu(o) &&
            (o = fg(
              o,
              n +
                (!o.key || (l && l.key === o.key)
                  ? ""
                  : ("" + o.key).replace(Bc, "$&/") + "/") +
                e,
            )),
          t.push(o)),
      1
    );
  if (((l = 0), (r = r === "" ? "." : r + ":"), bc(e)))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var s = r + Ma(i, a);
      l += Fi(i, t, n, s, o);
    }
  else if (((s = dg(e)), typeof s == "function"))
    for (e = s.call(e), a = 0; !(i = e.next()).done; )
      (i = i.value), (s = r + Ma(i, a++)), (l += Fi(i, t, n, s, o));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return l;
}
function vi(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Fi(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function hg(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ze = { current: null },
  Ii = { transition: null },
  mg = {
    ReactCurrentDispatcher: Ze,
    ReactCurrentBatchConfig: Ii,
    ReactCurrentOwner: Cu,
  };
ee.Children = {
  map: vi,
  forEach: function (e, t, n) {
    vi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      vi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      vi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Eu(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
ee.Component = Jr;
ee.Fragment = ng;
ee.Profiler = og;
ee.PureComponent = Su;
ee.StrictMode = rg;
ee.Suspense = sg;
ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mg;
ee.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Ff({}, e.props),
    o = e.key,
    i = e.ref,
    l = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (l = Cu.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (s in t)
      $f.call(t, s) &&
        !Uf.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && a !== void 0 ? a[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    a = Array(s);
    for (var u = 0; u < s; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return {
    $$typeof: oi,
    type: e.type,
    key: o,
    ref: i,
    props: r,
    _owner: l,
  };
};
ee.createContext = function (e) {
  return (
    (e = {
      $$typeof: lg,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ig, _context: e }),
    (e.Consumer = e)
  );
};
ee.createElement = bf;
ee.createFactory = function (e) {
  var t = bf.bind(null, e);
  return (t.type = e), t;
};
ee.createRef = function () {
  return { current: null };
};
ee.forwardRef = function (e) {
  return { $$typeof: ag, render: e };
};
ee.isValidElement = Eu;
ee.lazy = function (e) {
  return {
    $$typeof: cg,
    _payload: { _status: -1, _result: e },
    _init: hg,
  };
};
ee.memo = function (e, t) {
  return { $$typeof: ug, type: e, compare: t === void 0 ? null : t };
};
ee.startTransition = function (e) {
  var t = Ii.transition;
  Ii.transition = {};
  try {
    e();
  } finally {
    Ii.transition = t;
  }
};
ee.unstable_act = function () {
  throw Error(
    "act(...) is not supported in production builds of React.",
  );
};
ee.useCallback = function (e, t) {
  return Ze.current.useCallback(e, t);
};
ee.useContext = function (e) {
  return Ze.current.useContext(e);
};
ee.useDebugValue = function () {};
ee.useDeferredValue = function (e) {
  return Ze.current.useDeferredValue(e);
};
ee.useEffect = function (e, t) {
  return Ze.current.useEffect(e, t);
};
ee.useId = function () {
  return Ze.current.useId();
};
ee.useImperativeHandle = function (e, t, n) {
  return Ze.current.useImperativeHandle(e, t, n);
};
ee.useInsertionEffect = function (e, t) {
  return Ze.current.useInsertionEffect(e, t);
};
ee.useLayoutEffect = function (e, t) {
  return Ze.current.useLayoutEffect(e, t);
};
ee.useMemo = function (e, t) {
  return Ze.current.useMemo(e, t);
};
ee.useReducer = function (e, t, n) {
  return Ze.current.useReducer(e, t, n);
};
ee.useRef = function (e) {
  return Ze.current.useRef(e);
};
ee.useState = function (e) {
  return Ze.current.useState(e);
};
ee.useSyncExternalStore = function (e, t, n) {
  return Ze.current.useSyncExternalStore(e, t, n);
};
ee.useTransition = function () {
  return Ze.current.useTransition();
};
ee.version = "18.2.0";
Df.exports = ee;
var y = Df.exports;
const oe = wu(y),
  gg = Mf({ __proto__: null, default: oe }, [y]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vg = y,
  yg = Symbol.for("react.element"),
  wg = Symbol.for("react.fragment"),
  Sg = Object.prototype.hasOwnProperty,
  xg =
    vg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      .ReactCurrentOwner,
  Cg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Bf(e, t, n) {
  var r,
    o = {},
    i = null,
    l = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (l = t.ref);
  for (r in t)
    Sg.call(t, r) && !Cg.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t))
      o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: yg,
    type: e,
    key: i,
    ref: l,
    props: o,
    _owner: xg.current,
  };
}
Ll.Fragment = wg;
Ll.jsx = Bf;
Ll.jsxs = Bf;
Of.exports = Ll;
var p = Of.exports,
  hs = {},
  Vf = { exports: {} },
  ht = {},
  Hf = { exports: {} },
  Wf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(A, V) {
    var H = A.length;
    A.push(V);
    e: for (; 0 < H; ) {
      var C = (H - 1) >>> 1,
        j = A[C];
      if (0 < o(j, V)) (A[C] = V), (A[H] = j), (H = C);
      else break e;
    }
  }
  function n(A) {
    return A.length === 0 ? null : A[0];
  }
  function r(A) {
    if (A.length === 0) return null;
    var V = A[0],
      H = A.pop();
    if (H !== V) {
      A[0] = H;
      e: for (var C = 0, j = A.length, _ = j >>> 1; C < _; ) {
        var D = 2 * (C + 1) - 1,
          b = A[D],
          K = D + 1,
          Q = A[K];
        if (0 > o(b, H))
          K < j && 0 > o(Q, b)
            ? ((A[C] = Q), (A[K] = H), (C = K))
            : ((A[C] = b), (A[D] = H), (C = D));
        else if (K < j && 0 > o(Q, H))
          (A[C] = Q), (A[K] = H), (C = K);
        else break e;
      }
    }
    return V;
  }
  function o(A, V) {
    var H = A.sortIndex - V.sortIndex;
    return H !== 0 ? H : A.id - V.id;
  }
  if (
    typeof performance == "object" &&
    typeof performance.now == "function"
  ) {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var l = Date,
      a = l.now();
    e.unstable_now = function () {
      return l.now() - a;
    };
  }
  var s = [],
    u = [],
    c = 1,
    f = null,
    h = 3,
    S = !1,
    m = !1,
    x = !1,
    k = typeof setTimeout == "function" ? setTimeout : null,
    g = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function w(A) {
    for (var V = n(u); V !== null; ) {
      if (V.callback === null) r(u);
      else if (V.startTime <= A)
        r(u), (V.sortIndex = V.expirationTime), t(s, V);
      else break;
      V = n(u);
    }
  }
  function v(A) {
    if (((x = !1), w(A), !m))
      if (n(s) !== null) (m = !0), jt(P);
      else {
        var V = n(u);
        V !== null && tt(v, V.startTime - A);
      }
  }
  function P(A, V) {
    (m = !1), x && ((x = !1), g(L), (L = -1)), (S = !0);
    var H = h;
    try {
      for (
        w(V), f = n(s);
        f !== null && (!(f.expirationTime > V) || (A && !Y()));

      ) {
        var C = f.callback;
        if (typeof C == "function") {
          (f.callback = null), (h = f.priorityLevel);
          var j = C(f.expirationTime <= V);
          (V = e.unstable_now()),
            typeof j == "function"
              ? (f.callback = j)
              : f === n(s) && r(s),
            w(V);
        } else r(s);
        f = n(s);
      }
      if (f !== null) var _ = !0;
      else {
        var D = n(u);
        D !== null && tt(v, D.startTime - V), (_ = !1);
      }
      return _;
    } finally {
      (f = null), (h = H), (S = !1);
    }
  }
  var R = !1,
    T = null,
    L = -1,
    z = 5,
    F = -1;
  function Y() {
    return !(e.unstable_now() - F < z);
  }
  function ue() {
    if (T !== null) {
      var A = e.unstable_now();
      F = A;
      var V = !0;
      try {
        V = T(!0, A);
      } finally {
        V ? je() : ((R = !1), (T = null));
      }
    } else R = !1;
  }
  var je;
  if (typeof d == "function")
    je = function () {
      d(ue);
    };
  else if (typeof MessageChannel < "u") {
    var vt = new MessageChannel(),
      re = vt.port2;
    (vt.port1.onmessage = ue),
      (je = function () {
        re.postMessage(null);
      });
  } else
    je = function () {
      k(ue, 0);
    };
  function jt(A) {
    (T = A), R || ((R = !0), je());
  }
  function tt(A, V) {
    L = k(function () {
      A(e.unstable_now());
    }, V);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (A) {
      A.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      m || S || ((m = !0), jt(P));
    }),
    (e.unstable_forceFrameRate = function (A) {
      0 > A || 125 < A
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (z = 0 < A ? Math.floor(1e3 / A) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (A) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = h;
      }
      var H = h;
      h = V;
      try {
        return A();
      } finally {
        h = H;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (A, V) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var H = h;
      h = A;
      try {
        return V();
      } finally {
        h = H;
      }
    }),
    (e.unstable_scheduleCallback = function (A, V, H) {
      var C = e.unstable_now();
      switch (
        (typeof H == "object" && H !== null
          ? ((H = H.delay),
            (H = typeof H == "number" && 0 < H ? C + H : C))
          : (H = C),
        A)
      ) {
        case 1:
          var j = -1;
          break;
        case 2:
          j = 250;
          break;
        case 5:
          j = 1073741823;
          break;
        case 4:
          j = 1e4;
          break;
        default:
          j = 5e3;
      }
      return (
        (j = H + j),
        (A = {
          id: c++,
          callback: V,
          priorityLevel: A,
          startTime: H,
          expirationTime: j,
          sortIndex: -1,
        }),
        H > C
          ? ((A.sortIndex = H),
            t(u, A),
            n(s) === null &&
              A === n(u) &&
              (x ? (g(L), (L = -1)) : (x = !0), tt(v, H - C)))
          : ((A.sortIndex = j), t(s, A), m || S || ((m = !0), jt(P))),
        A
      );
    }),
    (e.unstable_shouldYield = Y),
    (e.unstable_wrapCallback = function (A) {
      var V = h;
      return function () {
        var H = h;
        h = V;
        try {
          return A.apply(this, arguments);
        } finally {
          h = H;
        }
      };
    });
})(Wf);
Hf.exports = Wf;
var Eg = Hf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kf = y,
  dt = Eg;
function O(e) {
  for (
    var t =
        "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
      n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Gf = new Set(),
  Io = {};
function ar(e, t) {
  Ur(e, t), Ur(e + "Capture", t);
}
function Ur(e, t) {
  for (Io[e] = t, e = 0; e < t.length; e++) Gf.add(t[e]);
}
var on = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ms = Object.prototype.hasOwnProperty,
  kg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Vc = {},
  Hc = {};
function _g(e) {
  return ms.call(Hc, e)
    ? !0
    : ms.call(Vc, e)
      ? !1
      : kg.test(e)
        ? (Hc[e] = !0)
        : ((Vc[e] = !0), !1);
}
function Pg(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)),
            e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function jg(e, t, n, r) {
  if (t === null || typeof t > "u" || Pg(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function qe(e, t, n, r, o, i, l) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = l);
}
var Ve = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ve[e] = new qe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Ve[t] = new qe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(
  function (e) {
    Ve[e] = new qe(e, 2, !1, e.toLowerCase(), null, !1, !1);
  },
);
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Ve[e] = new qe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ve[e] = new qe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ve[e] = new qe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ve[e] = new qe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ve[e] = new qe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ve[e] = new qe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ku = /[\-:]([a-z])/g;
function _u(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ku, _u);
    Ve[t] = new qe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ku, _u);
    Ve[t] = new qe(
      t,
      1,
      !1,
      e,
      "http://www.w3.org/1999/xlink",
      !1,
      !1,
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ku, _u);
  Ve[t] = new qe(
    t,
    1,
    !1,
    e,
    "http://www.w3.org/XML/1998/namespace",
    !1,
    !1,
  );
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ve[e] = new qe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ve.xlinkHref = new qe(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ve[e] = new qe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Pu(e, t, n, r) {
  var o = Ve.hasOwnProperty(t) ? Ve[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (jg(t, n, o, r) && (n = null),
    r || o === null
      ? _g(t) &&
        (n === null
          ? e.removeAttribute(t)
          : e.setAttribute(t, "" + n))
      : o.mustUseProperty
        ? (e[o.propertyName] =
            n === null ? (o.type === 3 ? !1 : "") : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var cn = Kf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  yi = Symbol.for("react.element"),
  wr = Symbol.for("react.portal"),
  Sr = Symbol.for("react.fragment"),
  ju = Symbol.for("react.strict_mode"),
  gs = Symbol.for("react.profiler"),
  Qf = Symbol.for("react.provider"),
  Yf = Symbol.for("react.context"),
  Nu = Symbol.for("react.forward_ref"),
  vs = Symbol.for("react.suspense"),
  ys = Symbol.for("react.suspense_list"),
  Tu = Symbol.for("react.memo"),
  vn = Symbol.for("react.lazy"),
  Xf = Symbol.for("react.offscreen"),
  Wc = Symbol.iterator;
function io(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Wc && e[Wc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var xe = Object.assign,
  Oa;
function wo(e) {
  if (Oa === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Oa = (t && t[1]) || "";
    }
  return (
    `
` +
    Oa +
    e
  );
}
var Da = !1;
function za(e, t) {
  if (!e || Da) return "";
  Da = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          l = o.length - 1,
          a = i.length - 1;
        1 <= l && 0 <= a && o[l] !== i[a];

      )
        a--;
      for (; 1 <= l && 0 <= a; l--, a--)
        if (o[l] !== i[a]) {
          if (l !== 1 || a !== 1)
            do
              if ((l--, a--, 0 > a || o[l] !== i[a])) {
                var s =
                  `
` + o[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= l && 0 <= a);
          break;
        }
    }
  } finally {
    (Da = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? wo(e) : "";
}
function Ng(e) {
  switch (e.tag) {
    case 5:
      return wo(e.type);
    case 16:
      return wo("Lazy");
    case 13:
      return wo("Suspense");
    case 19:
      return wo("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = za(e.type, !1)), e;
    case 11:
      return (e = za(e.type.render, !1)), e;
    case 1:
      return (e = za(e.type, !0)), e;
    default:
      return "";
  }
}
function ws(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Sr:
      return "Fragment";
    case wr:
      return "Portal";
    case gs:
      return "Profiler";
    case ju:
      return "StrictMode";
    case vs:
      return "Suspense";
    case ys:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Yf:
        return (e.displayName || "Context") + ".Consumer";
      case Qf:
        return (e._context.displayName || "Context") + ".Provider";
      case Nu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Tu:
        return (
          (t = e.displayName || null),
          t !== null ? t : ws(e.type) || "Memo"
        );
      case vn:
        (t = e._payload), (e = e._init);
        try {
          return ws(e(t));
        } catch {}
    }
  return null;
}
function Tg(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName ||
          (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ws(t);
    case 8:
      return t === ju ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Ln(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Jf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Rg(e) {
  var t = Jf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (l) {
          (r = "" + l), i.call(this, l);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (l) {
          r = "" + l;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function wi(e) {
  e._valueTracker || (e._valueTracker = Rg(e));
}
function Zf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Jf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Zi(e) {
  if (
    ((e = e || (typeof document < "u" ? document : void 0)),
    typeof e > "u")
  )
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ss(e, t) {
  var n = t.checked;
  return xe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Kc(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Ln(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function qf(e, t) {
  (t = t.checked), t != null && Pu(e, "checked", t, !1);
}
function xs(e, t) {
  qf(e, t);
  var n = Ln(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) &&
        (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Cs(e, t.type, n)
    : t.hasOwnProperty("defaultValue") &&
      Cs(e, t.type, Ln(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Gc(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Cs(e, t, n) {
  (t !== "number" || Zi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var So = Array.isArray;
function Or(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Ln(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Es(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(O(91));
  return xe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Qc(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(O(92));
      if (So(n)) {
        if (1 < n.length) throw Error(O(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Ln(n) };
}
function ep(e, t) {
  var n = Ln(t.value),
    r = Ln(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null &&
      e.defaultValue !== n &&
      (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Yc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue &&
    t !== "" &&
    t !== null &&
    (e.value = t);
}
function tp(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ks(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? tp(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Si,
  np = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (
      e.namespaceURI !== "http://www.w3.org/2000/svg" ||
      "innerHTML" in e
    )
      e.innerHTML = t;
    else {
      for (
        Si = Si || document.createElement("div"),
          Si.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Si.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Ao(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ko = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Lg = ["Webkit", "ms", "Moz", "O"];
Object.keys(ko).forEach(function (e) {
  Lg.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)),
      (ko[t] = ko[e]);
  });
});
function rp(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n ||
        typeof t != "number" ||
        t === 0 ||
        (ko.hasOwnProperty(e) && ko[e])
      ? ("" + t).trim()
      : t + "px";
}
function op(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = rp(n, t[n], r);
      n === "float" && (n = "cssFloat"),
        r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var Mg = xe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function _s(e, t) {
  if (t) {
    if (
      Mg[e] &&
      (t.children != null || t.dangerouslySetInnerHTML != null)
    )
      throw Error(O(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(O(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(O(61));
    }
    if (t.style != null && typeof t.style != "object")
      throw Error(O(62));
  }
}
function Ps(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var js = null;
function Ru(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ns = null,
  Dr = null,
  zr = null;
function Xc(e) {
  if ((e = ai(e))) {
    if (typeof Ns != "function") throw Error(O(280));
    var t = e.stateNode;
    t && ((t = Fl(t)), Ns(e.stateNode, e.type, t));
  }
}
function ip(e) {
  Dr ? (zr ? zr.push(e) : (zr = [e])) : (Dr = e);
}
function lp() {
  if (Dr) {
    var e = Dr,
      t = zr;
    if (((zr = Dr = null), Xc(e), t))
      for (e = 0; e < t.length; e++) Xc(t[e]);
  }
}
function ap(e, t) {
  return e(t);
}
function sp() {}
var Fa = !1;
function up(e, t, n) {
  if (Fa) return e(t, n);
  Fa = !0;
  try {
    return ap(e, t, n);
  } finally {
    (Fa = !1), (Dr !== null || zr !== null) && (sp(), lp());
  }
}
function $o(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Fl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(O(231, t, typeof n));
  return n;
}
var Ts = !1;
if (on)
  try {
    var lo = {};
    Object.defineProperty(lo, "passive", {
      get: function () {
        Ts = !0;
      },
    }),
      window.addEventListener("test", lo, lo),
      window.removeEventListener("test", lo, lo);
  } catch {
    Ts = !1;
  }
function Og(e, t, n, r, o, i, l, a, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var _o = !1,
  qi = null,
  el = !1,
  Rs = null,
  Dg = {
    onError: function (e) {
      (_o = !0), (qi = e);
    },
  };
function zg(e, t, n, r, o, i, l, a, s) {
  (_o = !1), (qi = null), Og.apply(Dg, arguments);
}
function Fg(e, t, n, r, o, i, l, a, s) {
  if ((zg.apply(this, arguments), _o)) {
    if (_o) {
      var u = qi;
      (_o = !1), (qi = null);
    } else throw Error(O(198));
    el || ((el = !0), (Rs = u));
  }
}
function sr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function cp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null &&
        ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Jc(e) {
  if (sr(e) !== e) throw Error(O(188));
}
function Ig(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = sr(e)), t === null)) throw Error(O(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return Jc(o), e;
        if (i === r) return Jc(o), t;
        i = i.sibling;
      }
      throw Error(O(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var l = !1, a = o.child; a; ) {
        if (a === n) {
          (l = !0), (n = o), (r = i);
          break;
        }
        if (a === r) {
          (l = !0), (r = o), (n = i);
          break;
        }
        a = a.sibling;
      }
      if (!l) {
        for (a = i.child; a; ) {
          if (a === n) {
            (l = !0), (n = i), (r = o);
            break;
          }
          if (a === r) {
            (l = !0), (r = i), (n = o);
            break;
          }
          a = a.sibling;
        }
        if (!l) throw Error(O(189));
      }
    }
    if (n.alternate !== r) throw Error(O(190));
  }
  if (n.tag !== 3) throw Error(O(188));
  return n.stateNode.current === n ? e : t;
}
function dp(e) {
  return (e = Ig(e)), e !== null ? fp(e) : null;
}
function fp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = fp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var pp = dt.unstable_scheduleCallback,
  Zc = dt.unstable_cancelCallback,
  Ag = dt.unstable_shouldYield,
  $g = dt.unstable_requestPaint,
  Pe = dt.unstable_now,
  Ug = dt.unstable_getCurrentPriorityLevel,
  Lu = dt.unstable_ImmediatePriority,
  hp = dt.unstable_UserBlockingPriority,
  tl = dt.unstable_NormalPriority,
  bg = dt.unstable_LowPriority,
  mp = dt.unstable_IdlePriority,
  Ml = null,
  Wt = null;
function Bg(e) {
  if (Wt && typeof Wt.onCommitFiberRoot == "function")
    try {
      Wt.onCommitFiberRoot(
        Ml,
        e,
        void 0,
        (e.current.flags & 128) === 128,
      );
    } catch {}
}
var It = Math.clz32 ? Math.clz32 : Wg,
  Vg = Math.log,
  Hg = Math.LN2;
function Wg(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Vg(e) / Hg) | 0)) | 0;
}
var xi = 64,
  Ci = 4194304;
function xo(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function nl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    l = n & 268435455;
  if (l !== 0) {
    var a = l & ~o;
    a !== 0 ? (r = xo(a)) : ((i &= l), i !== 0 && (r = xo(i)));
  } else (l = n & ~o), l !== 0 ? (r = xo(l)) : i !== 0 && (r = xo(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r),
    (i = t & -t),
    o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - It(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function Kg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Gg(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var l = 31 - It(i),
      a = 1 << l,
      s = o[l];
    s === -1
      ? (!(a & n) || a & r) && (o[l] = Kg(a, t))
      : s <= t && (e.expiredLanes |= a),
      (i &= ~a);
  }
}
function Ls(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function gp() {
  var e = xi;
  return (xi <<= 1), !(xi & 4194240) && (xi = 64), e;
}
function Ia(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ii(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - It(t)),
    (e[t] = n);
}
function Qg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - It(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function Mu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - It(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var ie = 0;
function vp(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var yp,
  Ou,
  wp,
  Sp,
  xp,
  Ms = !1,
  Ei = [],
  En = null,
  kn = null,
  _n = null,
  Uo = new Map(),
  bo = new Map(),
  wn = [],
  Yg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function qc(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      En = null;
      break;
    case "dragenter":
    case "dragleave":
      kn = null;
      break;
    case "mouseover":
    case "mouseout":
      _n = null;
      break;
    case "pointerover":
    case "pointerout":
      Uo.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      bo.delete(t.pointerId);
  }
}
function ao(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = ai(t)), t !== null && Ou(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Xg(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (En = ao(En, e, t, n, r, o)), !0;
    case "dragenter":
      return (kn = ao(kn, e, t, n, r, o)), !0;
    case "mouseover":
      return (_n = ao(_n, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return Uo.set(i, ao(Uo.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId),
        bo.set(i, ao(bo.get(i) || null, e, t, n, r, o)),
        !0
      );
  }
  return !1;
}
function Cp(e) {
  var t = Hn(e.target);
  if (t !== null) {
    var n = sr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = cp(n)), t !== null)) {
          (e.blockedOn = t),
            xp(e.priority, function () {
              wp(n);
            });
          return;
        }
      } else if (
        t === 3 &&
        n.stateNode.current.memoizedState.isDehydrated
      ) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ai(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Os(
      e.domEventName,
      e.eventSystemFlags,
      t[0],
      e.nativeEvent,
    );
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (js = r), n.target.dispatchEvent(r), (js = null);
    } else
      return (t = ai(n)), t !== null && Ou(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function ed(e, t, n) {
  Ai(e) && n.delete(t);
}
function Jg() {
  (Ms = !1),
    En !== null && Ai(En) && (En = null),
    kn !== null && Ai(kn) && (kn = null),
    _n !== null && Ai(_n) && (_n = null),
    Uo.forEach(ed),
    bo.forEach(ed);
}
function so(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ms ||
      ((Ms = !0),
      dt.unstable_scheduleCallback(dt.unstable_NormalPriority, Jg)));
}
function Bo(e) {
  function t(o) {
    return so(o, e);
  }
  if (0 < Ei.length) {
    so(Ei[0], e);
    for (var n = 1; n < Ei.length; n++) {
      var r = Ei[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    En !== null && so(En, e),
      kn !== null && so(kn, e),
      _n !== null && so(_n, e),
      Uo.forEach(t),
      bo.forEach(t),
      n = 0;
    n < wn.length;
    n++
  )
    (r = wn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < wn.length && ((n = wn[0]), n.blockedOn === null); )
    Cp(n), n.blockedOn === null && wn.shift();
}
var Fr = cn.ReactCurrentBatchConfig,
  rl = !0;
function Zg(e, t, n, r) {
  var o = ie,
    i = Fr.transition;
  Fr.transition = null;
  try {
    (ie = 1), Du(e, t, n, r);
  } finally {
    (ie = o), (Fr.transition = i);
  }
}
function qg(e, t, n, r) {
  var o = ie,
    i = Fr.transition;
  Fr.transition = null;
  try {
    (ie = 4), Du(e, t, n, r);
  } finally {
    (ie = o), (Fr.transition = i);
  }
}
function Du(e, t, n, r) {
  if (rl) {
    var o = Os(e, t, n, r);
    if (o === null) Ga(e, t, r, ol, n), qc(e, r);
    else if (Xg(o, e, t, n, r)) r.stopPropagation();
    else if ((qc(e, r), t & 4 && -1 < Yg.indexOf(e))) {
      for (; o !== null; ) {
        var i = ai(o);
        if (
          (i !== null && yp(i),
          (i = Os(e, t, n, r)),
          i === null && Ga(e, t, r, ol, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else Ga(e, t, r, null, n);
  }
}
var ol = null;
function Os(e, t, n, r) {
  if (((ol = null), (e = Ru(r)), (e = Hn(e)), e !== null))
    if (((t = sr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = cp(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (ol = e), null;
}
function Ep(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ug()) {
        case Lu:
          return 1;
        case hp:
          return 4;
        case tl:
        case bg:
          return 16;
        case mp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var xn = null,
  zu = null,
  $i = null;
function kp() {
  if ($i) return $i;
  var e,
    t = zu,
    n = t.length,
    r,
    o = "value" in xn ? xn.value : xn.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === o[i - r]; r++);
  return ($i = o.slice(e, 1 < r ? 1 - r : void 0));
}
function Ui(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ki() {
  return !0;
}
function td() {
  return !1;
}
function mt(e) {
  function t(n, r, o, i, l) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = l),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) &&
        ((n = e[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null
          ? i.defaultPrevented
          : i.returnValue === !1
      )
        ? ki
        : td),
      (this.isPropagationStopped = td),
      this
    );
  }
  return (
    xe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" &&
              (n.returnValue = !1),
          (this.isDefaultPrevented = ki));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" &&
              (n.cancelBubble = !0),
          (this.isPropagationStopped = ki));
      },
      persist: function () {},
      isPersistent: ki,
    }),
    t
  );
}
var Zr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Fu = mt(Zr),
  li = xe({}, Zr, { view: 0, detail: 0 }),
  ev = mt(li),
  Aa,
  $a,
  uo,
  Ol = xe({}, li, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Iu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== uo &&
            (uo && e.type === "mousemove"
              ? ((Aa = e.screenX - uo.screenX),
                ($a = e.screenY - uo.screenY))
              : ($a = Aa = 0),
            (uo = e)),
          Aa);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : $a;
    },
  }),
  nd = mt(Ol),
  tv = xe({}, Ol, { dataTransfer: 0 }),
  nv = mt(tv),
  rv = xe({}, li, { relatedTarget: 0 }),
  Ua = mt(rv),
  ov = xe({}, Zr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0,
  }),
  iv = mt(ov),
  lv = xe({}, Zr, {
    clipboardData: function (e) {
      return "clipboardData" in e
        ? e.clipboardData
        : window.clipboardData;
    },
  }),
  av = mt(lv),
  sv = xe({}, Zr, { data: 0 }),
  rd = mt(sv),
  uv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  cv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  dv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function fv(e) {
  var t = this.nativeEvent;
  return t.getModifierState
    ? t.getModifierState(e)
    : (e = dv[e])
      ? !!t[e]
      : !1;
}
function Iu() {
  return fv;
}
var pv = xe({}, li, {
    key: function (e) {
      if (e.key) {
        var t = uv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ui(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? cv[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Iu,
    charCode: function (e) {
      return e.type === "keypress" ? Ui(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ui(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  hv = mt(pv),
  mv = xe({}, Ol, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  od = mt(mv),
  gv = xe({}, li, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Iu,
  }),
  vv = mt(gv),
  yv = xe({}, Zr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0,
  }),
  wv = mt(yv),
  Sv = xe({}, Ol, {
    deltaX: function (e) {
      return "deltaX" in e
        ? e.deltaX
        : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  xv = mt(Sv),
  Cv = [9, 13, 27, 32],
  Au = on && "CompositionEvent" in window,
  Po = null;
on && "documentMode" in document && (Po = document.documentMode);
var Ev = on && "TextEvent" in window && !Po,
  _p = on && (!Au || (Po && 8 < Po && 11 >= Po)),
  id = String.fromCharCode(32),
  ld = !1;
function Pp(e, t) {
  switch (e) {
    case "keyup":
      return Cv.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function jp(e) {
  return (
    (e = e.detail),
    typeof e == "object" && "data" in e ? e.data : null
  );
}
var xr = !1;
function kv(e, t) {
  switch (e) {
    case "compositionend":
      return jp(t);
    case "keypress":
      return t.which !== 32 ? null : ((ld = !0), id);
    case "textInput":
      return (e = t.data), e === id && ld ? null : e;
    default:
      return null;
  }
}
function _v(e, t) {
  if (xr)
    return e === "compositionend" || (!Au && Pp(e, t))
      ? ((e = kp()), ($i = zu = xn = null), (xr = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (
        !(t.ctrlKey || t.altKey || t.metaKey) ||
        (t.ctrlKey && t.altKey)
      ) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return _p && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Pv = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function ad(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Pv[e.type] : t === "textarea";
}
function Np(e, t, n, r) {
  ip(r),
    (t = il(t, "onChange")),
    0 < t.length &&
      ((n = new Fu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var jo = null,
  Vo = null;
function jv(e) {
  $p(e, 0);
}
function Dl(e) {
  var t = kr(e);
  if (Zf(t)) return e;
}
function Nv(e, t) {
  if (e === "change") return t;
}
var Tp = !1;
if (on) {
  var ba;
  if (on) {
    var Ba = "oninput" in document;
    if (!Ba) {
      var sd = document.createElement("div");
      sd.setAttribute("oninput", "return;"),
        (Ba = typeof sd.oninput == "function");
    }
    ba = Ba;
  } else ba = !1;
  Tp = ba && (!document.documentMode || 9 < document.documentMode);
}
function ud() {
  jo && (jo.detachEvent("onpropertychange", Rp), (Vo = jo = null));
}
function Rp(e) {
  if (e.propertyName === "value" && Dl(Vo)) {
    var t = [];
    Np(t, Vo, e, Ru(e)), up(jv, t);
  }
}
function Tv(e, t, n) {
  e === "focusin"
    ? (ud(),
      (jo = t),
      (Vo = n),
      jo.attachEvent("onpropertychange", Rp))
    : e === "focusout" && ud();
}
function Rv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Dl(Vo);
}
function Lv(e, t) {
  if (e === "click") return Dl(t);
}
function Mv(e, t) {
  if (e === "input" || e === "change") return Dl(t);
}
function Ov(e, t) {
  return (
    (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
  );
}
var $t = typeof Object.is == "function" ? Object.is : Ov;
function Ho(e, t) {
  if ($t(e, t)) return !0;
  if (
    typeof e != "object" ||
    e === null ||
    typeof t != "object" ||
    t === null
  )
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!ms.call(t, o) || !$t(e[o], t[o])) return !1;
  }
  return !0;
}
function cd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function dd(e, t) {
  var n = cd(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = cd(n);
  }
}
function Lp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Lp(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Mp() {
  for (var e = window, t = Zi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Zi(e.document);
  }
  return t;
}
function $u(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Dv(e) {
  var t = Mp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Lp(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && $u(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e =
          ((t = n.ownerDocument || document) && t.defaultView) ||
          window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = dd(n, i));
        var l = dd(n, r);
        o &&
          l &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== l.node ||
            e.focusOffset !== l.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(l.node, l.offset))
            : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (
      typeof n.focus == "function" && n.focus(), n = 0;
      n < t.length;
      n++
    )
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var zv =
    on && "documentMode" in document && 11 >= document.documentMode,
  Cr = null,
  Ds = null,
  No = null,
  zs = !1;
function fd(e, t, n) {
  var r =
    n.window === n
      ? n.document
      : n.nodeType === 9
        ? n
        : n.ownerDocument;
  zs ||
    Cr == null ||
    Cr !== Zi(r) ||
    ((r = Cr),
    "selectionStart" in r && $u(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (No && Ho(No, r)) ||
      ((No = r),
      (r = il(Ds, "onSelect")),
      0 < r.length &&
        ((t = new Fu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Cr))));
}
function _i(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Er = {
    animationend: _i("Animation", "AnimationEnd"),
    animationiteration: _i("Animation", "AnimationIteration"),
    animationstart: _i("Animation", "AnimationStart"),
    transitionend: _i("Transition", "TransitionEnd"),
  },
  Va = {},
  Op = {};
on &&
  ((Op = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Er.animationend.animation,
    delete Er.animationiteration.animation,
    delete Er.animationstart.animation),
  "TransitionEvent" in window || delete Er.transitionend.transition);
function zl(e) {
  if (Va[e]) return Va[e];
  if (!Er[e]) return e;
  var t = Er[e],
    n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in Op) return (Va[e] = t[n]);
  return e;
}
var Dp = zl("animationend"),
  zp = zl("animationiteration"),
  Fp = zl("animationstart"),
  Ip = zl("transitionend"),
  Ap = new Map(),
  pd =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function zn(e, t) {
  Ap.set(e, t), ar(t, [e]);
}
for (var Ha = 0; Ha < pd.length; Ha++) {
  var Wa = pd[Ha],
    Fv = Wa.toLowerCase(),
    Iv = Wa[0].toUpperCase() + Wa.slice(1);
  zn(Fv, "on" + Iv);
}
zn(Dp, "onAnimationEnd");
zn(zp, "onAnimationIteration");
zn(Fp, "onAnimationStart");
zn("dblclick", "onDoubleClick");
zn("focusin", "onFocus");
zn("focusout", "onBlur");
zn(Ip, "onTransitionEnd");
Ur("onMouseEnter", ["mouseout", "mouseover"]);
Ur("onMouseLeave", ["mouseout", "mouseover"]);
Ur("onPointerEnter", ["pointerout", "pointerover"]);
Ur("onPointerLeave", ["pointerout", "pointerover"]);
ar(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
ar(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
ar("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste",
]);
ar(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(
    " ",
  ),
);
ar(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(
    " ",
  ),
);
ar(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(
    " ",
  ),
);
var Co =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  Av = new Set(
    "cancel close invalid load scroll toggle".split(" ").concat(Co),
  );
function hd(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n),
    Fg(r, t, void 0, e),
    (e.currentTarget = null);
}
function $p(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var l = r.length - 1; 0 <= l; l--) {
          var a = r[l],
            s = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), s !== i && o.isPropagationStopped()))
            break e;
          hd(o, a, u), (i = s);
        }
      else
        for (l = 0; l < r.length; l++) {
          if (
            ((a = r[l]),
            (s = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            s !== i && o.isPropagationStopped())
          )
            break e;
          hd(o, a, u), (i = s);
        }
    }
  }
  if (el) throw ((e = Rs), (el = !1), (Rs = null), e);
}
function he(e, t) {
  var n = t[Us];
  n === void 0 && (n = t[Us] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Up(t, e, 2, !1), n.add(r));
}
function Ka(e, t, n) {
  var r = 0;
  t && (r |= 4), Up(n, e, r, t);
}
var Pi = "_reactListening" + Math.random().toString(36).slice(2);
function Wo(e) {
  if (!e[Pi]) {
    (e[Pi] = !0),
      Gf.forEach(function (n) {
        n !== "selectionchange" &&
          (Av.has(n) || Ka(n, !1, e), Ka(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null ||
      t[Pi] ||
      ((t[Pi] = !0), Ka("selectionchange", !1, t));
  }
}
function Up(e, t, n, r) {
  switch (Ep(t)) {
    case 1:
      var o = Zg;
      break;
    case 4:
      o = qg;
      break;
    default:
      o = Du;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !Ts ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1);
}
function Ga(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var l = r.tag;
      if (l === 3 || l === 4) {
        var a = r.stateNode.containerInfo;
        if (a === o || (a.nodeType === 8 && a.parentNode === o))
          break;
        if (l === 4)
          for (l = r.return; l !== null; ) {
            var s = l.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = l.stateNode.containerInfo),
              s === o || (s.nodeType === 8 && s.parentNode === o))
            )
              return;
            l = l.return;
          }
        for (; a !== null; ) {
          if (((l = Hn(a)), l === null)) return;
          if (((s = l.tag), s === 5 || s === 6)) {
            r = i = l;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  up(function () {
    var u = i,
      c = Ru(n),
      f = [];
    e: {
      var h = Ap.get(e);
      if (h !== void 0) {
        var S = Fu,
          m = e;
        switch (e) {
          case "keypress":
            if (Ui(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = hv;
            break;
          case "focusin":
            (m = "focus"), (S = Ua);
            break;
          case "focusout":
            (m = "blur"), (S = Ua);
            break;
          case "beforeblur":
          case "afterblur":
            S = Ua;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = nd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = nv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = vv;
            break;
          case Dp:
          case zp:
          case Fp:
            S = iv;
            break;
          case Ip:
            S = wv;
            break;
          case "scroll":
            S = ev;
            break;
          case "wheel":
            S = xv;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = av;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = od;
        }
        var x = (t & 4) !== 0,
          k = !x && e === "scroll",
          g = x ? (h !== null ? h + "Capture" : null) : h;
        x = [];
        for (var d = u, w; d !== null; ) {
          w = d;
          var v = w.stateNode;
          if (
            (w.tag === 5 &&
              v !== null &&
              ((w = v),
              g !== null &&
                ((v = $o(d, g)), v != null && x.push(Ko(d, v, w)))),
            k)
          )
            break;
          d = d.return;
        }
        0 < x.length &&
          ((h = new S(h, m, null, n, c)),
          f.push({ event: h, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (S = e === "mouseout" || e === "pointerout"),
          h &&
            n !== js &&
            (m = n.relatedTarget || n.fromElement) &&
            (Hn(m) || m[ln]))
        )
          break e;
        if (
          (S || h) &&
          ((h =
            c.window === c
              ? c
              : (h = c.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          S
            ? ((m = n.relatedTarget || n.toElement),
              (S = u),
              (m = m ? Hn(m) : null),
              m !== null &&
                ((k = sr(m)),
                m !== k || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((S = null), (m = u)),
          S !== m)
        ) {
          if (
            ((x = nd),
            (v = "onMouseLeave"),
            (g = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = od),
              (v = "onPointerLeave"),
              (g = "onPointerEnter"),
              (d = "pointer")),
            (k = S == null ? h : kr(S)),
            (w = m == null ? h : kr(m)),
            (h = new x(v, d + "leave", S, n, c)),
            (h.target = k),
            (h.relatedTarget = w),
            (v = null),
            Hn(c) === u &&
              ((x = new x(g, d + "enter", m, n, c)),
              (x.target = w),
              (x.relatedTarget = k),
              (v = x)),
            (k = v),
            S && m)
          )
            t: {
              for (x = S, g = m, d = 0, w = x; w; w = yr(w)) d++;
              for (w = 0, v = g; v; v = yr(v)) w++;
              for (; 0 < d - w; ) (x = yr(x)), d--;
              for (; 0 < w - d; ) (g = yr(g)), w--;
              for (; d--; ) {
                if (x === g || (g !== null && x === g.alternate))
                  break t;
                (x = yr(x)), (g = yr(g));
              }
              x = null;
            }
          else x = null;
          S !== null && md(f, h, S, x, !1),
            m !== null && k !== null && md(f, k, m, x, !0);
        }
      }
      e: {
        if (
          ((h = u ? kr(u) : window),
          (S = h.nodeName && h.nodeName.toLowerCase()),
          S === "select" || (S === "input" && h.type === "file"))
        )
          var P = Nv;
        else if (ad(h))
          if (Tp) P = Mv;
          else {
            P = Rv;
            var R = Tv;
          }
        else
          (S = h.nodeName) &&
            S.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (P = Lv);
        if (P && (P = P(e, u))) {
          Np(f, P, n, c);
          break e;
        }
        R && R(e, h, u),
          e === "focusout" &&
            (R = h._wrapperState) &&
            R.controlled &&
            h.type === "number" &&
            Cs(h, "number", h.value);
      }
      switch (((R = u ? kr(u) : window), e)) {
        case "focusin":
          (ad(R) || R.contentEditable === "true") &&
            ((Cr = R), (Ds = u), (No = null));
          break;
        case "focusout":
          No = Ds = Cr = null;
          break;
        case "mousedown":
          zs = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (zs = !1), fd(f, n, c);
          break;
        case "selectionchange":
          if (zv) break;
        case "keydown":
        case "keyup":
          fd(f, n, c);
      }
      var T;
      if (Au)
        e: {
          switch (e) {
            case "compositionstart":
              var L = "onCompositionStart";
              break e;
            case "compositionend":
              L = "onCompositionEnd";
              break e;
            case "compositionupdate":
              L = "onCompositionUpdate";
              break e;
          }
          L = void 0;
        }
      else
        xr
          ? Pp(e, n) && (L = "onCompositionEnd")
          : e === "keydown" &&
            n.keyCode === 229 &&
            (L = "onCompositionStart");
      L &&
        (_p &&
          n.locale !== "ko" &&
          (xr || L !== "onCompositionStart"
            ? L === "onCompositionEnd" && xr && (T = kp())
            : ((xn = c),
              (zu = "value" in xn ? xn.value : xn.textContent),
              (xr = !0))),
        (R = il(u, L)),
        0 < R.length &&
          ((L = new rd(L, e, null, n, c)),
          f.push({ event: L, listeners: R }),
          T
            ? (L.data = T)
            : ((T = jp(n)), T !== null && (L.data = T)))),
        (T = Ev ? kv(e, n) : _v(e, n)) &&
          ((u = il(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new rd("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: c, listeners: u }),
            (c.data = T)));
    }
    $p(f, t);
  });
}
function Ko(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function il(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = $o(e, n)),
      i != null && r.unshift(Ko(e, i, o)),
      (i = $o(e, t)),
      i != null && r.push(Ko(e, i, o))),
      (e = e.return);
  }
  return r;
}
function yr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function md(e, t, n, r, o) {
  for (var i = t._reactName, l = []; n !== null && n !== r; ) {
    var a = n,
      s = a.alternate,
      u = a.stateNode;
    if (s !== null && s === r) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      o
        ? ((s = $o(n, i)), s != null && l.unshift(Ko(n, s, a)))
        : o || ((s = $o(n, i)), s != null && l.push(Ko(n, s, a)))),
      (n = n.return);
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var $v = /\r\n?/g,
  Uv = /\u0000|\uFFFD/g;
function gd(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      $v,
      `
`,
    )
    .replace(Uv, "");
}
function ji(e, t, n) {
  if (((t = gd(t)), gd(e) !== t && n)) throw Error(O(425));
}
function ll() {}
var Fs = null,
  Is = null;
function As(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var $s = typeof setTimeout == "function" ? setTimeout : void 0,
  bv = typeof clearTimeout == "function" ? clearTimeout : void 0,
  vd = typeof Promise == "function" ? Promise : void 0,
  Bv =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof vd < "u"
        ? function (e) {
            return vd.resolve(null).then(e).catch(Vv);
          }
        : $s;
function Vv(e) {
  setTimeout(function () {
    throw e;
  });
}
function Qa(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), Bo(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  Bo(t);
}
function Pn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?"))
        break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function yd(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var qr = Math.random().toString(36).slice(2),
  Ht = "__reactFiber$" + qr,
  Go = "__reactProps$" + qr,
  ln = "__reactContainer$" + qr,
  Us = "__reactEvents$" + qr,
  Hv = "__reactListeners$" + qr,
  Wv = "__reactHandles$" + qr;
function Hn(e) {
  var t = e[Ht];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[ln] || n[Ht])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = yd(e); e !== null; ) {
          if ((n = e[Ht])) return n;
          e = yd(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ai(e) {
  return (
    (e = e[Ht] || e[ln]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
      ? null
      : e
  );
}
function kr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(O(33));
}
function Fl(e) {
  return e[Go] || null;
}
var bs = [],
  _r = -1;
function Fn(e) {
  return { current: e };
}
function me(e) {
  0 > _r || ((e.current = bs[_r]), (bs[_r] = null), _r--);
}
function pe(e, t) {
  _r++, (bs[_r] = e.current), (e.current = t);
}
var Mn = {},
  Qe = Fn(Mn),
  it = Fn(!1),
  Xn = Mn;
function br(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Mn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function lt(e) {
  return (e = e.childContextTypes), e != null;
}
function al() {
  me(it), me(Qe);
}
function wd(e, t, n) {
  if (Qe.current !== Mn) throw Error(O(168));
  pe(Qe, t), pe(it, n);
}
function bp(e, t, n) {
  var r = e.stateNode;
  if (
    ((t = t.childContextTypes),
    typeof r.getChildContext != "function")
  )
    return n;
  r = r.getChildContext();
  for (var o in r)
    if (!(o in t)) throw Error(O(108, Tg(e) || "Unknown", o));
  return xe({}, n, r);
}
function sl(e) {
  return (
    (e =
      ((e = e.stateNode) &&
        e.__reactInternalMemoizedMergedChildContext) ||
      Mn),
    (Xn = Qe.current),
    pe(Qe, e),
    pe(it, it.current),
    !0
  );
}
function Sd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(O(169));
  n
    ? ((e = bp(e, t, Xn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      me(it),
      me(Qe),
      pe(Qe, e))
    : me(it),
    pe(it, n);
}
var Jt = null,
  Il = !1,
  Ya = !1;
function Bp(e) {
  Jt === null ? (Jt = [e]) : Jt.push(e);
}
function Kv(e) {
  (Il = !0), Bp(e);
}
function In() {
  if (!Ya && Jt !== null) {
    Ya = !0;
    var e = 0,
      t = ie;
    try {
      var n = Jt;
      for (ie = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Jt = null), (Il = !1);
    } catch (o) {
      throw (Jt !== null && (Jt = Jt.slice(e + 1)), pp(Lu, In), o);
    } finally {
      (ie = t), (Ya = !1);
    }
  }
  return null;
}
var Pr = [],
  jr = 0,
  ul = null,
  cl = 0,
  St = [],
  xt = 0,
  Jn = null,
  qt = 1,
  en = "";
function bn(e, t) {
  (Pr[jr++] = cl), (Pr[jr++] = ul), (ul = e), (cl = t);
}
function Vp(e, t, n) {
  (St[xt++] = qt), (St[xt++] = en), (St[xt++] = Jn), (Jn = e);
  var r = qt;
  e = en;
  var o = 32 - It(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - It(t) + o;
  if (30 < i) {
    var l = o - (o % 5);
    (i = (r & ((1 << l) - 1)).toString(32)),
      (r >>= l),
      (o -= l),
      (qt = (1 << (32 - It(t) + o)) | (n << o) | r),
      (en = i + e);
  } else (qt = (1 << i) | (n << o) | r), (en = e);
}
function Uu(e) {
  e.return !== null && (bn(e, 1), Vp(e, 1, 0));
}
function bu(e) {
  for (; e === ul; )
    (ul = Pr[--jr]),
      (Pr[jr] = null),
      (cl = Pr[--jr]),
      (Pr[jr] = null);
  for (; e === Jn; )
    (Jn = St[--xt]),
      (St[xt] = null),
      (en = St[--xt]),
      (St[xt] = null),
      (qt = St[--xt]),
      (St[xt] = null);
}
var ct = null,
  ut = null,
  ge = !1,
  zt = null;
function Hp(e, t) {
  var n = Ct(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function xd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 ||
          n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ct = e), (ut = Pn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null
          ? ((e.stateNode = t), (ct = e), (ut = null), !0)
          : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Jn !== null ? { id: qt, overflow: en } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ct(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ct = e),
            (ut = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Bs(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Vs(e) {
  if (ge) {
    var t = ut;
    if (t) {
      var n = t;
      if (!xd(e, t)) {
        if (Bs(e)) throw Error(O(418));
        t = Pn(n.nextSibling);
        var r = ct;
        t && xd(e, t)
          ? Hp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ge = !1), (ct = e));
      }
    } else {
      if (Bs(e)) throw Error(O(418));
      (e.flags = (e.flags & -4097) | 2), (ge = !1), (ct = e);
    }
  }
}
function Cd(e) {
  for (
    e = e.return;
    e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

  )
    e = e.return;
  ct = e;
}
function Ni(e) {
  if (e !== ct) return !1;
  if (!ge) return Cd(e), (ge = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t =
        t !== "head" &&
        t !== "body" &&
        !As(e.type, e.memoizedProps))),
    t && (t = ut))
  ) {
    if (Bs(e)) throw (Wp(), Error(O(418)));
    for (; t; ) Hp(e, t), (t = Pn(t.nextSibling));
  }
  if ((Cd(e), e.tag === 13)) {
    if (
      ((e = e.memoizedState),
      (e = e !== null ? e.dehydrated : null),
      !e)
    )
      throw Error(O(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ut = Pn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ut = null;
    }
  } else ut = ct ? Pn(e.stateNode.nextSibling) : null;
  return !0;
}
function Wp() {
  for (var e = ut; e; ) e = Pn(e.nextSibling);
}
function Br() {
  (ut = ct = null), (ge = !1);
}
function Bu(e) {
  zt === null ? (zt = [e]) : zt.push(e);
}
var Gv = cn.ReactCurrentBatchConfig;
function Mt(e, t) {
  if (e && e.defaultProps) {
    (t = xe({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var dl = Fn(null),
  fl = null,
  Nr = null,
  Vu = null;
function Hu() {
  Vu = Nr = fl = null;
}
function Wu(e) {
  var t = dl.current;
  me(dl), (e._currentValue = t);
}
function Hs(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null &&
          (r.childLanes & t) !== t &&
          (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Ir(e, t) {
  (fl = e),
    (Vu = Nr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ot = !0), (e.firstContext = null));
}
function kt(e) {
  var t = e._currentValue;
  if (Vu !== e)
    if (
      ((e = { context: e, memoizedValue: t, next: null }),
      Nr === null)
    ) {
      if (fl === null) throw Error(O(308));
      (Nr = e), (fl.dependencies = { lanes: 0, firstContext: e });
    } else Nr = Nr.next = e;
  return t;
}
var Wn = null;
function Ku(e) {
  Wn === null ? (Wn = [e]) : Wn.push(e);
}
function Kp(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null
      ? ((n.next = n), Ku(t))
      : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    an(e, r)
  );
}
function an(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (
    n !== null && (n.lanes |= t), n = e, e = e.return;
    e !== null;

  )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var yn = !1;
function Gu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Gp(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function tn(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function jn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), ne & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      an(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null
      ? ((t.next = t), Ku(r))
      : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    an(e, n)
  );
}
function bi(e, t, n) {
  if (
    ((t = t.updateQueue),
    t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Mu(e, n);
  }
}
function Ed(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = l) : (i = i.next = l), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function pl(e, t, n, r) {
  var o = e.updateQueue;
  yn = !1;
  var i = o.firstBaseUpdate,
    l = o.lastBaseUpdate,
    a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var s = a,
      u = s.next;
    (s.next = null), l === null ? (i = u) : (l.next = u), (l = s);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== l &&
        (a === null ? (c.firstBaseUpdate = u) : (a.next = u),
        (c.lastBaseUpdate = s)));
  }
  if (i !== null) {
    var f = o.baseState;
    (l = 0), (c = u = s = null), (a = i);
    do {
      var h = a.lane,
        S = a.eventTime;
      if ((r & h) === h) {
        c !== null &&
          (c = c.next =
            {
              eventTime: S,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var m = e,
            x = a;
          switch (((h = t), (S = n), x.tag)) {
            case 1:
              if (((m = x.payload), typeof m == "function")) {
                f = m.call(S, f, h);
                break e;
              }
              f = m;
              break e;
            case 3:
              m.flags = (m.flags & -65537) | 128;
            case 0:
              if (
                ((m = x.payload),
                (h = typeof m == "function" ? m.call(S, f, h) : m),
                h == null)
              )
                break e;
              f = xe({}, f, h);
              break e;
            case 2:
              yn = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (h = o.effects),
          h === null ? (o.effects = [a]) : h.push(a));
      } else
        (S = {
          eventTime: S,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((u = c = S), (s = f)) : (c = c.next = S),
          (l |= h);
      if (((a = a.next), a === null)) {
        if (((a = o.shared.pending), a === null)) break;
        (h = a),
          (a = h.next),
          (h.next = null),
          (o.lastBaseUpdate = h),
          (o.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (s = f),
      (o.baseState = s),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = c),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (l |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (qn |= l), (e.lanes = l), (e.memoizedState = f);
  }
}
function kd(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(O(191, o));
        o.call(r);
      }
    }
}
var Qp = new Kf.Component().refs;
function Ws(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : xe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Al = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? sr(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Je(),
      o = Tn(e),
      i = tn(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = jn(e, i, o)),
      t !== null && (At(t, e, o, r), bi(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Je(),
      o = Tn(e),
      i = tn(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = jn(e, i, o)),
      t !== null && (At(t, e, o, r), bi(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Je(),
      r = Tn(e),
      o = tn(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = jn(e, o, r)),
      t !== null && (At(t, e, r, n), bi(t, e, r));
  },
};
function _d(e, t, n, r, o, i, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, l)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Ho(n, r) || !Ho(o, i)
        : !0
  );
}
function Yp(e, t, n) {
  var r = !1,
    o = Mn,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = kt(i))
      : ((o = lt(t) ? Xn : Qe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? br(e, o) : Mn)),
    (t = new t(n, i)),
    (e.memoizedState =
      t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Al),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Pd(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Al.enqueueReplaceState(t, t.state, null);
}
function Ks(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = Qp), Gu(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = kt(i))
    : ((i = lt(t) ? Xn : Qe.current), (o.context = br(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" &&
      (Ws(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" &&
        o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Al.enqueueReplaceState(o, o.state, null),
      pl(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function co(e, t, n) {
  if (
    ((e = n.ref),
    e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(O(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(O(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (l) {
            var a = o.refs;
            a === Qp && (a = o.refs = {}),
              l === null ? delete a[i] : (a[i] = l);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(O(284));
    if (!n._owner) throw Error(O(290, e));
  }
  return e;
}
function Ti(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      O(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function jd(e) {
  var t = e._init;
  return t(e._payload);
}
function Xp(e) {
  function t(g, d) {
    if (e) {
      var w = g.deletions;
      w === null ? ((g.deletions = [d]), (g.flags |= 16)) : w.push(d);
    }
  }
  function n(g, d) {
    if (!e) return null;
    for (; d !== null; ) t(g, d), (d = d.sibling);
    return null;
  }
  function r(g, d) {
    for (g = new Map(); d !== null; )
      d.key !== null ? g.set(d.key, d) : g.set(d.index, d),
        (d = d.sibling);
    return g;
  }
  function o(g, d) {
    return (g = Rn(g, d)), (g.index = 0), (g.sibling = null), g;
  }
  function i(g, d, w) {
    return (
      (g.index = w),
      e
        ? ((w = g.alternate),
          w !== null
            ? ((w = w.index), w < d ? ((g.flags |= 2), d) : w)
            : ((g.flags |= 2), d))
        : ((g.flags |= 1048576), d)
    );
  }
  function l(g) {
    return e && g.alternate === null && (g.flags |= 2), g;
  }
  function a(g, d, w, v) {
    return d === null || d.tag !== 6
      ? ((d = ns(w, g.mode, v)), (d.return = g), d)
      : ((d = o(d, w)), (d.return = g), d);
  }
  function s(g, d, w, v) {
    var P = w.type;
    return P === Sr
      ? c(g, d, w.props.children, v, w.key)
      : d !== null &&
          (d.elementType === P ||
            (typeof P == "object" &&
              P !== null &&
              P.$$typeof === vn &&
              jd(P) === d.type))
        ? ((v = o(d, w.props)),
          (v.ref = co(g, d, w)),
          (v.return = g),
          v)
        : ((v = Gi(w.type, w.key, w.props, null, g.mode, v)),
          (v.ref = co(g, d, w)),
          (v.return = g),
          v);
  }
  function u(g, d, w, v) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== w.containerInfo ||
      d.stateNode.implementation !== w.implementation
      ? ((d = rs(w, g.mode, v)), (d.return = g), d)
      : ((d = o(d, w.children || [])), (d.return = g), d);
  }
  function c(g, d, w, v, P) {
    return d === null || d.tag !== 7
      ? ((d = Yn(w, g.mode, v, P)), (d.return = g), d)
      : ((d = o(d, w)), (d.return = g), d);
  }
  function f(g, d, w) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return (d = ns("" + d, g.mode, w)), (d.return = g), d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case yi:
          return (
            (w = Gi(d.type, d.key, d.props, null, g.mode, w)),
            (w.ref = co(g, null, d)),
            (w.return = g),
            w
          );
        case wr:
          return (d = rs(d, g.mode, w)), (d.return = g), d;
        case vn:
          var v = d._init;
          return f(g, v(d._payload), w);
      }
      if (So(d) || io(d))
        return (d = Yn(d, g.mode, w, null)), (d.return = g), d;
      Ti(g, d);
    }
    return null;
  }
  function h(g, d, w, v) {
    var P = d !== null ? d.key : null;
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return P !== null ? null : a(g, d, "" + w, v);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case yi:
          return w.key === P ? s(g, d, w, v) : null;
        case wr:
          return w.key === P ? u(g, d, w, v) : null;
        case vn:
          return (P = w._init), h(g, d, P(w._payload), v);
      }
      if (So(w) || io(w))
        return P !== null ? null : c(g, d, w, v, null);
      Ti(g, w);
    }
    return null;
  }
  function S(g, d, w, v, P) {
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return (g = g.get(w) || null), a(d, g, "" + v, P);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case yi:
          return (
            (g = g.get(v.key === null ? w : v.key) || null),
            s(d, g, v, P)
          );
        case wr:
          return (
            (g = g.get(v.key === null ? w : v.key) || null),
            u(d, g, v, P)
          );
        case vn:
          var R = v._init;
          return S(g, d, w, R(v._payload), P);
      }
      if (So(v) || io(v))
        return (g = g.get(w) || null), c(d, g, v, P, null);
      Ti(d, v);
    }
    return null;
  }
  function m(g, d, w, v) {
    for (
      var P = null, R = null, T = d, L = (d = 0), z = null;
      T !== null && L < w.length;
      L++
    ) {
      T.index > L ? ((z = T), (T = null)) : (z = T.sibling);
      var F = h(g, T, w[L], v);
      if (F === null) {
        T === null && (T = z);
        break;
      }
      e && T && F.alternate === null && t(g, T),
        (d = i(F, d, L)),
        R === null ? (P = F) : (R.sibling = F),
        (R = F),
        (T = z);
    }
    if (L === w.length) return n(g, T), ge && bn(g, L), P;
    if (T === null) {
      for (; L < w.length; L++)
        (T = f(g, w[L], v)),
          T !== null &&
            ((d = i(T, d, L)),
            R === null ? (P = T) : (R.sibling = T),
            (R = T));
      return ge && bn(g, L), P;
    }
    for (T = r(g, T); L < w.length; L++)
      (z = S(T, g, L, w[L], v)),
        z !== null &&
          (e &&
            z.alternate !== null &&
            T.delete(z.key === null ? L : z.key),
          (d = i(z, d, L)),
          R === null ? (P = z) : (R.sibling = z),
          (R = z));
    return (
      e &&
        T.forEach(function (Y) {
          return t(g, Y);
        }),
      ge && bn(g, L),
      P
    );
  }
  function x(g, d, w, v) {
    var P = io(w);
    if (typeof P != "function") throw Error(O(150));
    if (((w = P.call(w)), w == null)) throw Error(O(151));
    for (
      var R = (P = null), T = d, L = (d = 0), z = null, F = w.next();
      T !== null && !F.done;
      L++, F = w.next()
    ) {
      T.index > L ? ((z = T), (T = null)) : (z = T.sibling);
      var Y = h(g, T, F.value, v);
      if (Y === null) {
        T === null && (T = z);
        break;
      }
      e && T && Y.alternate === null && t(g, T),
        (d = i(Y, d, L)),
        R === null ? (P = Y) : (R.sibling = Y),
        (R = Y),
        (T = z);
    }
    if (F.done) return n(g, T), ge && bn(g, L), P;
    if (T === null) {
      for (; !F.done; L++, F = w.next())
        (F = f(g, F.value, v)),
          F !== null &&
            ((d = i(F, d, L)),
            R === null ? (P = F) : (R.sibling = F),
            (R = F));
      return ge && bn(g, L), P;
    }
    for (T = r(g, T); !F.done; L++, F = w.next())
      (F = S(T, g, L, F.value, v)),
        F !== null &&
          (e &&
            F.alternate !== null &&
            T.delete(F.key === null ? L : F.key),
          (d = i(F, d, L)),
          R === null ? (P = F) : (R.sibling = F),
          (R = F));
    return (
      e &&
        T.forEach(function (ue) {
          return t(g, ue);
        }),
      ge && bn(g, L),
      P
    );
  }
  function k(g, d, w, v) {
    if (
      (typeof w == "object" &&
        w !== null &&
        w.type === Sr &&
        w.key === null &&
        (w = w.props.children),
      typeof w == "object" && w !== null)
    ) {
      switch (w.$$typeof) {
        case yi:
          e: {
            for (var P = w.key, R = d; R !== null; ) {
              if (R.key === P) {
                if (((P = w.type), P === Sr)) {
                  if (R.tag === 7) {
                    n(g, R.sibling),
                      (d = o(R, w.props.children)),
                      (d.return = g),
                      (g = d);
                    break e;
                  }
                } else if (
                  R.elementType === P ||
                  (typeof P == "object" &&
                    P !== null &&
                    P.$$typeof === vn &&
                    jd(P) === R.type)
                ) {
                  n(g, R.sibling),
                    (d = o(R, w.props)),
                    (d.ref = co(g, R, w)),
                    (d.return = g),
                    (g = d);
                  break e;
                }
                n(g, R);
                break;
              } else t(g, R);
              R = R.sibling;
            }
            w.type === Sr
              ? ((d = Yn(w.props.children, g.mode, v, w.key)),
                (d.return = g),
                (g = d))
              : ((v = Gi(w.type, w.key, w.props, null, g.mode, v)),
                (v.ref = co(g, d, w)),
                (v.return = g),
                (g = v));
          }
          return l(g);
        case wr:
          e: {
            for (R = w.key; d !== null; ) {
              if (d.key === R)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === w.containerInfo &&
                  d.stateNode.implementation === w.implementation
                ) {
                  n(g, d.sibling),
                    (d = o(d, w.children || [])),
                    (d.return = g),
                    (g = d);
                  break e;
                } else {
                  n(g, d);
                  break;
                }
              else t(g, d);
              d = d.sibling;
            }
            (d = rs(w, g.mode, v)), (d.return = g), (g = d);
          }
          return l(g);
        case vn:
          return (R = w._init), k(g, d, R(w._payload), v);
      }
      if (So(w)) return m(g, d, w, v);
      if (io(w)) return x(g, d, w, v);
      Ti(g, w);
    }
    return (typeof w == "string" && w !== "") || typeof w == "number"
      ? ((w = "" + w),
        d !== null && d.tag === 6
          ? (n(g, d.sibling), (d = o(d, w)), (d.return = g), (g = d))
          : (n(g, d),
            (d = ns(w, g.mode, v)),
            (d.return = g),
            (g = d)),
        l(g))
      : n(g, d);
  }
  return k;
}
var Vr = Xp(!0),
  Jp = Xp(!1),
  si = {},
  Kt = Fn(si),
  Qo = Fn(si),
  Yo = Fn(si);
function Kn(e) {
  if (e === si) throw Error(O(174));
  return e;
}
function Qu(e, t) {
  switch ((pe(Yo, t), pe(Qo, e), pe(Kt, si), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ks(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ks(t, e));
  }
  me(Kt), pe(Kt, t);
}
function Hr() {
  me(Kt), me(Qo), me(Yo);
}
function Zp(e) {
  Kn(Yo.current);
  var t = Kn(Kt.current),
    n = ks(t, e.type);
  t !== n && (pe(Qo, e), pe(Kt, n));
}
function Yu(e) {
  Qo.current === e && (me(Kt), me(Qo));
}
var we = Fn(0);
function hl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated),
        n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (
      t.tag === 19 &&
      t.memoizedProps.revealOrder !== void 0
    ) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Xa = [];
function Xu() {
  for (var e = 0; e < Xa.length; e++)
    Xa[e]._workInProgressVersionPrimary = null;
  Xa.length = 0;
}
var Bi = cn.ReactCurrentDispatcher,
  Ja = cn.ReactCurrentBatchConfig,
  Zn = 0,
  Se = null,
  Me = null,
  De = null,
  ml = !1,
  To = !1,
  Xo = 0,
  Qv = 0;
function We() {
  throw Error(O(321));
}
function Ju(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!$t(e[n], t[n])) return !1;
  return !0;
}
function Zu(e, t, n, r, o, i) {
  if (
    ((Zn = i),
    (Se = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Bi.current = e === null || e.memoizedState === null ? Zv : qv),
    (e = n(r, o)),
    To)
  ) {
    i = 0;
    do {
      if (((To = !1), (Xo = 0), 25 <= i)) throw Error(O(301));
      (i += 1),
        (De = Me = null),
        (t.updateQueue = null),
        (Bi.current = ey),
        (e = n(r, o));
    } while (To);
  }
  if (
    ((Bi.current = gl),
    (t = Me !== null && Me.next !== null),
    (Zn = 0),
    (De = Me = Se = null),
    (ml = !1),
    t)
  )
    throw Error(O(300));
  return e;
}
function qu() {
  var e = Xo !== 0;
  return (Xo = 0), e;
}
function Vt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (
    De === null ? (Se.memoizedState = De = e) : (De = De.next = e), De
  );
}
function _t() {
  if (Me === null) {
    var e = Se.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Me.next;
  var t = De === null ? Se.memoizedState : De.next;
  if (t !== null) (De = t), (Me = e);
  else {
    if (e === null) throw Error(O(310));
    (Me = e),
      (e = {
        memoizedState: Me.memoizedState,
        baseState: Me.baseState,
        baseQueue: Me.baseQueue,
        queue: Me.queue,
        next: null,
      }),
      De === null ? (Se.memoizedState = De = e) : (De = De.next = e);
  }
  return De;
}
function Jo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Za(e) {
  var t = _t(),
    n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var r = Me,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var l = o.next;
      (o.next = i.next), (i.next = l);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var a = (l = null),
      s = null,
      u = i;
    do {
      var c = u.lane;
      if ((Zn & c) === c)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        s === null ? ((a = s = f), (l = r)) : (s = s.next = f),
          (Se.lanes |= c),
          (qn |= c);
      }
      u = u.next;
    } while (u !== null && u !== i);
    s === null ? (l = r) : (s.next = a),
      $t(r, t.memoizedState) || (ot = !0),
      (t.memoizedState = r),
      (t.baseState = l),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (Se.lanes |= i), (qn |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function qa(e) {
  var t = _t(),
    n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var l = (o = o.next);
    do (i = e(i, l.action)), (l = l.next);
    while (l !== o);
    $t(i, t.memoizedState) || (ot = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function qp() {}
function eh(e, t) {
  var n = Se,
    r = _t(),
    o = t(),
    i = !$t(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (ot = !0)),
    (r = r.queue),
    ec(rh.bind(null, n, r, e), [e]),
    r.getSnapshot !== t ||
      i ||
      (De !== null && De.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Zo(9, nh.bind(null, n, r, o, t), void 0, null),
      ze === null)
    )
      throw Error(O(349));
    Zn & 30 || th(n, t, o);
  }
  return o;
}
function th(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Se.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function nh(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), oh(t) && ih(e);
}
function rh(e, t, n) {
  return n(function () {
    oh(t) && ih(e);
  });
}
function oh(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !$t(e, n);
  } catch {
    return !0;
  }
}
function ih(e) {
  var t = an(e, 1);
  t !== null && At(t, e, 1, -1);
}
function Nd(e) {
  var t = Vt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Jo,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Jv.bind(null, Se, e)),
    [t.memoizedState, e]
  );
}
function Zo(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Se.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next),
            (n.next = e),
            (e.next = r),
            (t.lastEffect = e))),
    e
  );
}
function lh() {
  return _t().memoizedState;
}
function Vi(e, t, n, r) {
  var o = Vt();
  (Se.flags |= e),
    (o.memoizedState = Zo(1 | t, n, void 0, r === void 0 ? null : r));
}
function $l(e, t, n, r) {
  var o = _t();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Me !== null) {
    var l = Me.memoizedState;
    if (((i = l.destroy), r !== null && Ju(r, l.deps))) {
      o.memoizedState = Zo(t, n, i, r);
      return;
    }
  }
  (Se.flags |= e), (o.memoizedState = Zo(1 | t, n, i, r));
}
function Td(e, t) {
  return Vi(8390656, 8, e, t);
}
function ec(e, t) {
  return $l(2048, 8, e, t);
}
function ah(e, t) {
  return $l(4, 2, e, t);
}
function sh(e, t) {
  return $l(4, 4, e, t);
}
function uh(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function ch(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    $l(4, 4, uh.bind(null, t, e), n)
  );
}
function tc() {}
function dh(e, t) {
  var n = _t();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ju(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function fh(e, t) {
  var n = _t();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ju(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function ph(e, t, n) {
  return Zn & 21
    ? ($t(n, t) ||
        ((n = gp()), (Se.lanes |= n), (qn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ot = !0)),
      (e.memoizedState = n));
}
function Yv(e, t) {
  var n = ie;
  (ie = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Ja.transition;
  Ja.transition = {};
  try {
    e(!1), t();
  } finally {
    (ie = n), (Ja.transition = r);
  }
}
function hh() {
  return _t().memoizedState;
}
function Xv(e, t, n) {
  var r = Tn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    mh(e))
  )
    gh(t, n);
  else if (((n = Kp(e, t, n, r)), n !== null)) {
    var o = Je();
    At(n, e, r, o), vh(n, t, r);
  }
}
function Jv(e, t, n) {
  var r = Tn(e),
    o = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
  if (mh(e)) gh(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var l = t.lastRenderedState,
          a = i(l, n);
        if (((o.hasEagerState = !0), (o.eagerState = a), $t(a, l))) {
          var s = t.interleaved;
          s === null
            ? ((o.next = o), Ku(t))
            : ((o.next = s.next), (s.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = Kp(e, t, o, r)),
      n !== null && ((o = Je()), At(n, e, r, o), vh(n, t, r));
  }
}
function mh(e) {
  var t = e.alternate;
  return e === Se || (t !== null && t === Se);
}
function gh(e, t) {
  To = ml = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function vh(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Mu(e, n);
  }
}
var gl = {
    readContext: kt,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useInsertionEffect: We,
    useLayoutEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useMutableSource: We,
    useSyncExternalStore: We,
    useId: We,
    unstable_isNewReconciler: !1,
  },
  Zv = {
    readContext: kt,
    useCallback: function (e, t) {
      return (Vt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: kt,
    useEffect: Td,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Vi(4194308, 4, uh.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Vi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Vi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Vt();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Vt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Xv.bind(null, Se, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Vt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Nd,
    useDebugValue: tc,
    useDeferredValue: function (e) {
      return (Vt().memoizedState = e);
    },
    useTransition: function () {
      var e = Nd(!1),
        t = e[0];
      return (
        (e = Yv.bind(null, e[1])), (Vt().memoizedState = e), [t, e]
      );
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Se,
        o = Vt();
      if (ge) {
        if (n === void 0) throw Error(O(407));
        n = n();
      } else {
        if (((n = t()), ze === null)) throw Error(O(349));
        Zn & 30 || th(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        Td(rh.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Zo(9, nh.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Vt(),
        t = ze.identifierPrefix;
      if (ge) {
        var n = en,
          r = qt;
        (n = (r & ~(1 << (32 - It(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Xo++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Qv++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  qv = {
    readContext: kt,
    useCallback: dh,
    useContext: kt,
    useEffect: ec,
    useImperativeHandle: ch,
    useInsertionEffect: ah,
    useLayoutEffect: sh,
    useMemo: fh,
    useReducer: Za,
    useRef: lh,
    useState: function () {
      return Za(Jo);
    },
    useDebugValue: tc,
    useDeferredValue: function (e) {
      var t = _t();
      return ph(t, Me.memoizedState, e);
    },
    useTransition: function () {
      var e = Za(Jo)[0],
        t = _t().memoizedState;
      return [e, t];
    },
    useMutableSource: qp,
    useSyncExternalStore: eh,
    useId: hh,
    unstable_isNewReconciler: !1,
  },
  ey = {
    readContext: kt,
    useCallback: dh,
    useContext: kt,
    useEffect: ec,
    useImperativeHandle: ch,
    useInsertionEffect: ah,
    useLayoutEffect: sh,
    useMemo: fh,
    useReducer: qa,
    useRef: lh,
    useState: function () {
      return qa(Jo);
    },
    useDebugValue: tc,
    useDeferredValue: function (e) {
      var t = _t();
      return Me === null
        ? (t.memoizedState = e)
        : ph(t, Me.memoizedState, e);
    },
    useTransition: function () {
      var e = qa(Jo)[0],
        t = _t().memoizedState;
      return [e, t];
    },
    useMutableSource: qp,
    useSyncExternalStore: eh,
    useId: hh,
    unstable_isNewReconciler: !1,
  };
function Wr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Ng(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function es(e, t, n) {
  return {
    value: e,
    source: null,
    stack: n ?? null,
    digest: t ?? null,
  };
}
function Gs(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var ty = typeof WeakMap == "function" ? WeakMap : Map;
function yh(e, t, n) {
  (n = tn(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      yl || ((yl = !0), (ru = r)), Gs(e, t);
    }),
    n
  );
}
function wh(e, t, n) {
  (n = tn(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        Gs(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        Gs(e, t),
          typeof r != "function" &&
            (Nn === null ? (Nn = new Set([this])) : Nn.add(this));
        var l = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: l !== null ? l : "",
        });
      }),
    n
  );
}
function Rd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new ty();
    var o = new Set();
    r.set(t, o);
  } else
    (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = my.bind(null, e, t, n)), t.then(e, e));
}
function Ld(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState),
        (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Md(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = tn(-1, 1)), (t.tag = 2), jn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var ny = cn.ReactCurrentOwner,
  ot = !1;
function Xe(e, t, n, r) {
  t.child = e === null ? Jp(t, null, n, r) : Vr(t, e.child, n, r);
}
function Od(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Ir(t, o),
    (r = Zu(e, t, n, r, i, o)),
    (n = qu()),
    e !== null && !ot
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        sn(e, t, o))
      : (ge && n && Uu(t), (t.flags |= 1), Xe(e, t, r, o), t.child)
  );
}
function Dd(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !uc(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Sh(e, t, i, r, o))
      : ((e = Gi(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var l = i.memoizedProps;
    if (
      ((n = n.compare),
      (n = n !== null ? n : Ho),
      n(l, r) && e.ref === t.ref)
    )
      return sn(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = Rn(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Sh(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Ho(i, r) && e.ref === t.ref)
      if (((ot = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (ot = !0);
      else return (t.lanes = e.lanes), sn(e, t, o);
  }
  return Qs(e, t, n, r, o);
}
function xh(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null,
      }),
        pe(Rr, st),
        (st |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          pe(Rr, st),
          (st |= e),
          null
        );
      (t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null,
      }),
        (r = i !== null ? i.baseLanes : n),
        pe(Rr, st),
        (st |= r);
    }
  else
    i !== null
      ? ((r = i.baseLanes | n), (t.memoizedState = null))
      : (r = n),
      pe(Rr, st),
      (st |= r);
  return Xe(e, t, o, n), t.child;
}
function Ch(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Qs(e, t, n, r, o) {
  var i = lt(n) ? Xn : Qe.current;
  return (
    (i = br(t, i)),
    Ir(t, o),
    (n = Zu(e, t, n, r, i, o)),
    (r = qu()),
    e !== null && !ot
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        sn(e, t, o))
      : (ge && r && Uu(t), (t.flags |= 1), Xe(e, t, n, o), t.child)
  );
}
function zd(e, t, n, r, o) {
  if (lt(n)) {
    var i = !0;
    sl(t);
  } else i = !1;
  if ((Ir(t, o), t.stateNode === null))
    Hi(e, t), Yp(t, n, r), Ks(t, n, r, o), (r = !0);
  else if (e === null) {
    var l = t.stateNode,
      a = t.memoizedProps;
    l.props = a;
    var s = l.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = kt(u))
      : ((u = lt(n) ? Xn : Qe.current), (u = br(t, u)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((a !== r || s !== u) && Pd(t, l, r, u)),
      (yn = !1);
    var h = t.memoizedState;
    (l.state = h),
      pl(t, r, l, o),
      (s = t.memoizedState),
      a !== r || h !== s || it.current || yn
        ? (typeof c == "function" &&
            (Ws(t, n, c, r), (s = t.memoizedState)),
          (a = yn || _d(t, n, a, r, h, s, u))
            ? (f ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" &&
                  l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" &&
                  l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" &&
                (t.flags |= 4194308))
            : (typeof l.componentDidMount == "function" &&
                (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (l.props = r),
          (l.state = s),
          (l.context = u),
          (r = a))
        : (typeof l.componentDidMount == "function" &&
            (t.flags |= 4194308),
          (r = !1));
  } else {
    (l = t.stateNode),
      Gp(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : Mt(t.type, a)),
      (l.props = u),
      (f = t.pendingProps),
      (h = l.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = kt(s))
        : ((s = lt(n) ? Xn : Qe.current), (s = br(t, s)));
    var S = n.getDerivedStateFromProps;
    (c =
      typeof S == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function") ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((a !== f || h !== s) && Pd(t, l, r, s)),
      (yn = !1),
      (h = t.memoizedState),
      (l.state = h),
      pl(t, r, l, o);
    var m = t.memoizedState;
    a !== f || h !== m || it.current || yn
      ? (typeof S == "function" &&
          (Ws(t, n, S, r), (m = t.memoizedState)),
        (u = yn || _d(t, n, u, r, h, m, s) || !1)
          ? (c ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" &&
                l.componentWillUpdate(r, m, s),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(r, m, s)),
            typeof l.componentDidUpdate == "function" &&
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" &&
              (t.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = m)),
        (l.props = r),
        (l.state = m),
        (l.context = s),
        (r = u))
      : (typeof l.componentDidUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ys(e, t, n, r, i, o);
}
function Ys(e, t, n, r, o, i) {
  Ch(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return o && Sd(t, n, !1), sn(e, t, i);
  (r = t.stateNode), (ny.current = t);
  var a =
    l && typeof n.getDerivedStateFromError != "function"
      ? null
      : r.render();
  return (
    (t.flags |= 1),
    e !== null && l
      ? ((t.child = Vr(t, e.child, null, i)),
        (t.child = Vr(t, null, a, i)))
      : Xe(e, t, a, i),
    (t.memoizedState = r.state),
    o && Sd(t, n, !0),
    t.child
  );
}
function Eh(e) {
  var t = e.stateNode;
  t.pendingContext
    ? wd(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && wd(e, t.context, !1),
    Qu(e, t.containerInfo);
}
function Fd(e, t, n, r, o) {
  return Br(), Bu(o), (t.flags |= 256), Xe(e, t, n, r), t.child;
}
var Xs = { dehydrated: null, treeContext: null, retryLane: 0 };
function Js(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function kh(e, t, n) {
  var r = t.pendingProps,
    o = we.current,
    i = !1,
    l = (t.flags & 128) !== 0,
    a;
  if (
    ((a = l) ||
      (a =
        e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    a
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    pe(we, o & 1),
    e === null)
  )
    return (
      Vs(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((l = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (l = { mode: "hidden", children: l }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = l))
                : (i = Bl(l, r, 0, null)),
              (e = Yn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Js(n)),
              (t.memoizedState = Xs),
              e)
            : nc(t, l))
    );
  if (
    ((o = e.memoizedState),
    o !== null && ((a = o.dehydrated), a !== null))
  )
    return ry(e, t, l, r, a, o, n);
  if (i) {
    (i = r.fallback), (l = t.mode), (o = e.child), (a = o.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(l & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = Rn(o, s)),
          (r.subtreeFlags = o.subtreeFlags & 14680064)),
      a !== null
        ? (i = Rn(a, i))
        : ((i = Yn(i, l, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (l = e.child.memoizedState),
      (l =
        l === null
          ? Js(n)
          : {
              baseLanes: l.baseLanes | n,
              cachePool: null,
              transitions: l.transitions,
            }),
      (i.memoizedState = l),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Xs),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Rn(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null
        ? ((t.deletions = [e]), (t.flags |= 16))
        : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function nc(e, t) {
  return (
    (t = Bl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ri(e, t, n, r) {
  return (
    r !== null && Bu(r),
    Vr(t, e.child, null, n),
    (e = nc(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function ry(e, t, n, r, o, i, l) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = es(Error(O(422)))), Ri(e, t, l, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (o = t.mode),
          (r = Bl(
            { mode: "visible", children: r.children },
            o,
            0,
            null,
          )),
          (i = Yn(i, o, l, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && Vr(t, e.child, null, l),
          (t.child.memoizedState = Js(l)),
          (t.memoizedState = Xs),
          i);
  if (!(t.mode & 1)) return Ri(e, t, l, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r))
      var a = r.dgst;
    return (
      (r = a),
      (i = Error(O(419))),
      (r = es(i, r, void 0)),
      Ri(e, t, l, r)
    );
  }
  if (((a = (l & e.childLanes) !== 0), ot || a)) {
    if (((r = ze), r !== null)) {
      switch (l & -l) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | l) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), an(e, o), At(r, e, o, -1));
    }
    return sc(), (r = es(Error(O(421)))), Ri(e, t, l, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = gy.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (ut = Pn(o.nextSibling)),
      (ct = t),
      (ge = !0),
      (zt = null),
      e !== null &&
        ((St[xt++] = qt),
        (St[xt++] = en),
        (St[xt++] = Jn),
        (qt = e.id),
        (en = e.overflow),
        (Jn = t)),
      (t = nc(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Id(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Hs(e.return, t, n);
}
function ts(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function _h(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((Xe(e, t, r.children, n), (r = we.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Id(e, n, t);
        else if (e.tag === 19) Id(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((pe(we, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && hl(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          ts(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && hl(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        ts(t, !0, n, null, i);
        break;
      case "together":
        ts(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Hi(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function sn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (qn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(O(153));
  if (t.child !== null) {
    for (
      e = t.child,
        n = Rn(e, e.pendingProps),
        t.child = n,
        n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling),
        (n = n.sibling = Rn(e, e.pendingProps)),
        (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function oy(e, t, n) {
  switch (t.tag) {
    case 3:
      Eh(t), Br();
      break;
    case 5:
      Zp(t);
      break;
    case 1:
      lt(t.type) && sl(t);
      break;
    case 4:
      Qu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      pe(dl, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (pe(we, we.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? kh(e, t, n)
            : (pe(we, we.current & 1),
              (e = sn(e, t, n)),
              e !== null ? e.sibling : null);
      pe(we, we.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return _h(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null),
          (o.tail = null),
          (o.lastEffect = null)),
        pe(we, we.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), xh(e, t, n);
  }
  return sn(e, t, n);
}
var Ph, Zs, jh, Nh;
Ph = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Zs = function () {};
jh = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), Kn(Kt.current);
    var i = null;
    switch (n) {
      case "input":
        (o = Ss(e, o)), (r = Ss(e, r)), (i = []);
        break;
      case "select":
        (o = xe({}, o, { value: void 0 })),
          (r = xe({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = Es(e, o)), (r = Es(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ll);
    }
    _s(n, r);
    var l;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var a = o[u];
          for (l in a)
            a.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Io.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var s = r[u];
      if (
        ((a = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && s !== a && (s != null || a != null))
      )
        if (u === "style")
          if (a) {
            for (l in a)
              !a.hasOwnProperty(l) ||
                (s && s.hasOwnProperty(l)) ||
                (n || (n = {}), (n[l] = ""));
            for (l in s)
              s.hasOwnProperty(l) &&
                a[l] !== s[l] &&
                (n || (n = {}), (n[l] = s[l]));
          } else n || (i || (i = []), i.push(u, n)), (n = s);
        else
          u === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (a = a ? a.__html : void 0),
              s != null && a !== s && (i = i || []).push(u, s))
            : u === "children"
              ? (typeof s != "string" && typeof s != "number") ||
                (i = i || []).push(u, "" + s)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (Io.hasOwnProperty(u)
                  ? (s != null && u === "onScroll" && he("scroll", e),
                    i || a === s || (i = []))
                  : (i = i || []).push(u, s));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Nh = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function fo(e, t) {
  if (!ge)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Ke(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function iy(e, t, n) {
  var r = t.pendingProps;
  switch ((bu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Ke(t), null;
    case 1:
      return lt(t.type) && al(), Ke(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Hr(),
        me(it),
        me(Qe),
        Xu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ni(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024),
              zt !== null && (lu(zt), (zt = null)))),
        Zs(e, t),
        Ke(t),
        null
      );
    case 5:
      Yu(t);
      var o = Kn(Yo.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        jh(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(O(166));
          return Ke(t), null;
        }
        if (((e = Kn(Kt.current)), Ni(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (
            ((r[Ht] = t), (r[Go] = i), (e = (t.mode & 1) !== 0), n)
          ) {
            case "dialog":
              he("cancel", r), he("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              he("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Co.length; o++) he(Co[o], r);
              break;
            case "source":
              he("error", r);
              break;
            case "img":
            case "image":
            case "link":
              he("error", r), he("load", r);
              break;
            case "details":
              he("toggle", r);
              break;
            case "input":
              Kc(r, i), he("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                he("invalid", r);
              break;
            case "textarea":
              Qc(r, i), he("invalid", r);
          }
          _s(n, i), (o = null);
          for (var l in i)
            if (i.hasOwnProperty(l)) {
              var a = i[l];
              l === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 &&
                      ji(r.textContent, a, e),
                    (o = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (i.suppressHydrationWarning !== !0 &&
                      ji(r.textContent, a, e),
                    (o = ["children", "" + a]))
                : Io.hasOwnProperty(l) &&
                  a != null &&
                  l === "onScroll" &&
                  he("scroll", r);
            }
          switch (n) {
            case "input":
              wi(r), Gc(r, i, !0);
              break;
            case "textarea":
              wi(r), Yc(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = ll);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (l = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = tp(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = l.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = l.createElement(n, { is: r.is }))
                  : ((e = l.createElement(n)),
                    n === "select" &&
                      ((l = e),
                      r.multiple
                        ? (l.multiple = !0)
                        : r.size && (l.size = r.size)))
              : (e = l.createElementNS(e, n)),
            (e[Ht] = t),
            (e[Go] = r),
            Ph(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((l = Ps(n, r)), n)) {
              case "dialog":
                he("cancel", e), he("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                he("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Co.length; o++) he(Co[o], e);
                o = r;
                break;
              case "source":
                he("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                he("error", e), he("load", e), (o = r);
                break;
              case "details":
                he("toggle", e), (o = r);
                break;
              case "input":
                Kc(e, r), (o = Ss(e, r)), he("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = xe({}, r, { value: void 0 })),
                  he("invalid", e);
                break;
              case "textarea":
                Qc(e, r), (o = Es(e, r)), he("invalid", e);
                break;
              default:
                o = r;
            }
            _s(n, o), (a = o);
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var s = a[i];
                i === "style"
                  ? op(e, s)
                  : i === "dangerouslySetInnerHTML"
                    ? ((s = s ? s.__html : void 0),
                      s != null && np(e, s))
                    : i === "children"
                      ? typeof s == "string"
                        ? (n !== "textarea" || s !== "") && Ao(e, s)
                        : typeof s == "number" && Ao(e, "" + s)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (Io.hasOwnProperty(i)
                          ? s != null &&
                            i === "onScroll" &&
                            he("scroll", e)
                          : s != null && Pu(e, i, s, l));
              }
            switch (n) {
              case "input":
                wi(e), Gc(e, r, !1);
                break;
              case "textarea":
                wi(e), Yc(e);
                break;
              case "option":
                r.value != null &&
                  e.setAttribute("value", "" + Ln(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Or(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Or(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = ll);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Ke(t), null;
    case 6:
      if (e && t.stateNode != null) Nh(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null)
          throw Error(O(166));
        if (((n = Kn(Yo.current)), Kn(Kt.current), Ni(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ht] = t),
            (i = r.nodeValue !== n) && ((e = ct), e !== null))
          )
            switch (e.tag) {
              case 3:
                ji(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ji(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (
            n.nodeType === 9 ? n : n.ownerDocument
          ).createTextNode(r)),
            (r[Ht] = t),
            (t.stateNode = r);
      }
      return Ke(t), null;
    case 13:
      if (
        (me(we),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null &&
            e.memoizedState.dehydrated !== null))
      ) {
        if (ge && ut !== null && t.mode & 1 && !(t.flags & 128))
          Wp(), Br(), (t.flags |= 98560), (i = !1);
        else if (((i = Ni(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(O(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(O(317));
            i[Ht] = t;
          } else
            Br(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4);
          Ke(t), (i = !1);
        } else zt !== null && (lu(zt), (zt = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || we.current & 1
                ? Oe === 0 && (Oe = 3)
                : sc())),
          t.updateQueue !== null && (t.flags |= 4),
          Ke(t),
          null);
    case 4:
      return (
        Hr(),
        Zs(e, t),
        e === null && Wo(t.stateNode.containerInfo),
        Ke(t),
        null
      );
    case 10:
      return Wu(t.type._context), Ke(t), null;
    case 17:
      return lt(t.type) && al(), Ke(t), null;
    case 19:
      if ((me(we), (i = t.memoizedState), i === null))
        return Ke(t), null;
      if (
        ((r = (t.flags & 128) !== 0), (l = i.rendering), l === null)
      )
        if (r) fo(i, !1);
        else {
          if (Oe !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((l = hl(e)), l !== null)) {
                for (
                  t.flags |= 128,
                    fo(i, !1),
                    r = l.updateQueue,
                    r !== null &&
                      ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (l = i.alternate),
                    l === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = l.childLanes),
                        (i.lanes = l.lanes),
                        (i.child = l.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = l.memoizedProps),
                        (i.memoizedState = l.memoizedState),
                        (i.updateQueue = l.updateQueue),
                        (i.type = l.type),
                        (e = l.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return pe(we, (we.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            Pe() > Kr &&
            ((t.flags |= 128),
            (r = !0),
            fo(i, !1),
            (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = hl(l)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              fo(i, !0),
              i.tail === null &&
                i.tailMode === "hidden" &&
                !l.alternate &&
                !ge)
            )
              return Ke(t), null;
          } else
            2 * Pe() - i.renderingStartTime > Kr &&
              n !== 1073741824 &&
              ((t.flags |= 128),
              (r = !0),
              fo(i, !1),
              (t.lanes = 4194304));
        i.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : ((n = i.last),
            n !== null ? (n.sibling = l) : (t.child = l),
            (i.last = l));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = Pe()),
          (t.sibling = null),
          (n = we.current),
          pe(we, r ? (n & 1) | 2 : n & 1),
          t)
        : (Ke(t), null);
    case 22:
    case 23:
      return (
        ac(),
        (r = t.memoizedState !== null),
        e !== null &&
          (e.memoizedState !== null) !== r &&
          (t.flags |= 8192),
        r && t.mode & 1
          ? st & 1073741824 &&
            (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Ke(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(O(156, t.tag));
}
function ly(e, t) {
  switch ((bu(t), t.tag)) {
    case 1:
      return (
        lt(t.type) && al(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Hr(),
        me(it),
        me(Qe),
        Xu(),
        (e = t.flags),
        e & 65536 && !(e & 128)
          ? ((t.flags = (e & -65537) | 128), t)
          : null
      );
    case 5:
      return Yu(t), null;
    case 13:
      if (
        (me(we),
        (e = t.memoizedState),
        e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(O(340));
        Br();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return me(we), null;
    case 4:
      return Hr(), null;
    case 10:
      return Wu(t.type._context), null;
    case 22:
    case 23:
      return ac(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Li = !1,
  Ge = !1,
  ay = typeof WeakSet == "function" ? WeakSet : Set,
  $ = null;
function Tr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Ce(e, t, r);
      }
    else n.current = null;
}
function qs(e, t, n) {
  try {
    n();
  } catch (r) {
    Ce(e, t, r);
  }
}
var Ad = !1;
function sy(e, t) {
  if (((Fs = rl), (e = Mp()), $u(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            a = -1,
            s = -1,
            u = 0,
            c = 0,
            f = e,
            h = null;
          t: for (;;) {
            for (
              var S;
              f !== n || (o !== 0 && f.nodeType !== 3) || (a = l + o),
                f !== i ||
                  (r !== 0 && f.nodeType !== 3) ||
                  (s = l + r),
                f.nodeType === 3 && (l += f.nodeValue.length),
                (S = f.firstChild) !== null;

            )
              (h = f), (f = S);
            for (;;) {
              if (f === e) break t;
              if (
                (h === n && ++u === o && (a = l),
                h === i && ++c === r && (s = l),
                (S = f.nextSibling) !== null)
              )
                break;
              (f = h), (h = f.parentNode);
            }
            f = S;
          }
          n = a === -1 || s === -1 ? null : { start: a, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (
    Is = { focusedElem: e, selectionRange: n }, rl = !1, $ = t;
    $ !== null;

  )
    if (
      ((t = $),
      (e = t.child),
      (t.subtreeFlags & 1028) !== 0 && e !== null)
    )
      (e.return = t), ($ = e);
    else
      for (; $ !== null; ) {
        t = $;
        try {
          var m = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var x = m.memoizedProps,
                    k = m.memoizedState,
                    g = t.stateNode,
                    d = g.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : Mt(t.type, x),
                      k,
                    );
                  g.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var w = t.stateNode.containerInfo;
                w.nodeType === 1
                  ? (w.textContent = "")
                  : w.nodeType === 9 &&
                    w.documentElement &&
                    w.removeChild(w.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(O(163));
            }
        } catch (v) {
          Ce(t, t.return, v);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), ($ = e);
          break;
        }
        $ = t.return;
      }
  return (m = Ad), (Ad = !1), m;
}
function Ro(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && qs(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function Ul(e, t) {
  if (
    ((t = t.updateQueue),
    (t = t !== null ? t.lastEffect : null),
    t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function eu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Th(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Th(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ht],
        delete t[Go],
        delete t[Us],
        delete t[Hv],
        delete t[Wv])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Rh(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function $d(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Rh(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function tu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ll));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (tu(e, t, n), e = e.sibling; e !== null; )
      tu(e, t, n), (e = e.sibling);
}
function nu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (nu(e, t, n), e = e.sibling; e !== null; )
      nu(e, t, n), (e = e.sibling);
}
var be = null,
  Ot = !1;
function mn(e, t, n) {
  for (n = n.child; n !== null; ) Lh(e, t, n), (n = n.sibling);
}
function Lh(e, t, n) {
  if (Wt && typeof Wt.onCommitFiberUnmount == "function")
    try {
      Wt.onCommitFiberUnmount(Ml, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ge || Tr(n, t);
    case 6:
      var r = be,
        o = Ot;
      (be = null),
        mn(e, t, n),
        (be = r),
        (Ot = o),
        be !== null &&
          (Ot
            ? ((e = be),
              (n = n.stateNode),
              e.nodeType === 8
                ? e.parentNode.removeChild(n)
                : e.removeChild(n))
            : be.removeChild(n.stateNode));
      break;
    case 18:
      be !== null &&
        (Ot
          ? ((e = be),
            (n = n.stateNode),
            e.nodeType === 8
              ? Qa(e.parentNode, n)
              : e.nodeType === 1 && Qa(e, n),
            Bo(e))
          : Qa(be, n.stateNode));
      break;
    case 4:
      (r = be),
        (o = Ot),
        (be = n.stateNode.containerInfo),
        (Ot = !0),
        mn(e, t, n),
        (be = r),
        (Ot = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ge &&
        ((r = n.updateQueue),
        r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            l = i.destroy;
          (i = i.tag),
            l !== void 0 && (i & 2 || i & 4) && qs(n, t, l),
            (o = o.next);
        } while (o !== r);
      }
      mn(e, t, n);
      break;
    case 1:
      if (
        !Ge &&
        (Tr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          Ce(n, t, a);
        }
      mn(e, t, n);
      break;
    case 21:
      mn(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ge = (r = Ge) || n.memoizedState !== null),
          mn(e, t, n),
          (Ge = r))
        : mn(e, t, n);
      break;
    default:
      mn(e, t, n);
  }
}
function Ud(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new ay()),
      t.forEach(function (r) {
        var o = vy.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function Lt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          l = t,
          a = l;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (be = a.stateNode), (Ot = !1);
              break e;
            case 3:
              (be = a.stateNode.containerInfo), (Ot = !0);
              break e;
            case 4:
              (be = a.stateNode.containerInfo), (Ot = !0);
              break e;
          }
          a = a.return;
        }
        if (be === null) throw Error(O(160));
        Lh(i, l, o), (be = null), (Ot = !1);
        var s = o.alternate;
        s !== null && (s.return = null), (o.return = null);
      } catch (u) {
        Ce(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Mh(t, e), (t = t.sibling);
}
function Mh(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Lt(t, e), Bt(e), r & 4)) {
        try {
          Ro(3, e, e.return), Ul(3, e);
        } catch (x) {
          Ce(e, e.return, x);
        }
        try {
          Ro(5, e, e.return);
        } catch (x) {
          Ce(e, e.return, x);
        }
      }
      break;
    case 1:
      Lt(t, e), Bt(e), r & 512 && n !== null && Tr(n, n.return);
      break;
    case 5:
      if (
        (Lt(t, e),
        Bt(e),
        r & 512 && n !== null && Tr(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          Ao(o, "");
        } catch (x) {
          Ce(e, e.return, x);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          l = n !== null ? n.memoizedProps : i,
          a = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            a === "input" &&
              i.type === "radio" &&
              i.name != null &&
              qf(o, i),
              Ps(a, l);
            var u = Ps(a, i);
            for (l = 0; l < s.length; l += 2) {
              var c = s[l],
                f = s[l + 1];
              c === "style"
                ? op(o, f)
                : c === "dangerouslySetInnerHTML"
                  ? np(o, f)
                  : c === "children"
                    ? Ao(o, f)
                    : Pu(o, c, f, u);
            }
            switch (a) {
              case "input":
                xs(o, i);
                break;
              case "textarea":
                ep(o, i);
                break;
              case "select":
                var h = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var S = i.value;
                S != null
                  ? Or(o, !!i.multiple, S, !1)
                  : h !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Or(o, !!i.multiple, i.defaultValue, !0)
                      : Or(
                          o,
                          !!i.multiple,
                          i.multiple ? [] : "",
                          !1,
                        ));
            }
            o[Go] = i;
          } catch (x) {
            Ce(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Lt(t, e), Bt(e), r & 4)) {
        if (e.stateNode === null) throw Error(O(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (x) {
          Ce(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (Lt(t, e),
        Bt(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Bo(t.containerInfo);
        } catch (x) {
          Ce(e, e.return, x);
        }
      break;
    case 4:
      Lt(t, e), Bt(e);
      break;
    case 13:
      Lt(t, e),
        Bt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null &&
              o.alternate.memoizedState !== null) ||
            (ic = Pe())),
        r & 4 && Ud(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1
          ? ((Ge = (u = Ge) || c), Lt(t, e), (Ge = u))
          : Lt(t, e),
        Bt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for ($ = e, c = e.child; c !== null; ) {
            for (f = $ = c; $ !== null; ) {
              switch (((h = $), (S = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ro(4, h, h.return);
                  break;
                case 1:
                  Tr(h, h.return);
                  var m = h.stateNode;
                  if (typeof m.componentWillUnmount == "function") {
                    (r = h), (n = h.return);
                    try {
                      (t = r),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount();
                    } catch (x) {
                      Ce(r, n, x);
                    }
                  }
                  break;
                case 5:
                  Tr(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    Bd(f);
                    continue;
                  }
              }
              S !== null ? ((S.return = h), ($ = S)) : Bd(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (o = f.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty(
                            "display",
                            "none",
                            "important",
                          )
                        : (i.display = "none"))
                    : ((a = f.stateNode),
                      (s = f.memoizedProps.style),
                      (l =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (a.style.display = rp("display", l)));
              } catch (x) {
                Ce(e, e.return, x);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (x) {
                Ce(e, e.return, x);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null),
            (f.sibling.return = f.return),
            (f = f.sibling);
        }
      }
      break;
    case 19:
      Lt(t, e), Bt(e), r & 4 && Ud(e);
      break;
    case 21:
      break;
    default:
      Lt(t, e), Bt(e);
  }
}
function Bt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Rh(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(O(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Ao(o, ""), (r.flags &= -33));
          var i = $d(e);
          nu(e, i, o);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo,
            a = $d(e);
          tu(e, a, l);
          break;
        default:
          throw Error(O(161));
      }
    } catch (s) {
      Ce(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function uy(e, t, n) {
  ($ = e), Oh(e);
}
function Oh(e, t, n) {
  for (var r = (e.mode & 1) !== 0; $ !== null; ) {
    var o = $,
      i = o.child;
    if (o.tag === 22 && r) {
      var l = o.memoizedState !== null || Li;
      if (!l) {
        var a = o.alternate,
          s = (a !== null && a.memoizedState !== null) || Ge;
        a = Li;
        var u = Ge;
        if (((Li = l), (Ge = s) && !u))
          for ($ = o; $ !== null; )
            (l = $),
              (s = l.child),
              l.tag === 22 && l.memoizedState !== null
                ? Vd(o)
                : s !== null
                  ? ((s.return = l), ($ = s))
                  : Vd(o);
        for (; i !== null; ) ($ = i), Oh(i), (i = i.sibling);
        ($ = o), (Li = a), (Ge = u);
      }
      bd(e);
    } else
      o.subtreeFlags & 8772 && i !== null
        ? ((i.return = o), ($ = i))
        : bd(e);
  }
}
function bd(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ge || Ul(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ge)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Mt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && kd(t, i, r);
              break;
            case 3:
              var l = t.updateQueue;
              if (l !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                kd(t, l, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && Bo(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(O(163));
          }
        Ge || (t.flags & 512 && eu(t));
      } catch (h) {
        Ce(t, t.return, h);
      }
    }
    if (t === e) {
      $ = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), ($ = n);
      break;
    }
    $ = t.return;
  }
}
function Bd(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t === e) {
      $ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), ($ = n);
      break;
    }
    $ = t.return;
  }
}
function Vd(e) {
  for (; $ !== null; ) {
    var t = $;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ul(4, t);
          } catch (s) {
            Ce(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Ce(t, o, s);
            }
          }
          var i = t.return;
          try {
            eu(t);
          } catch (s) {
            Ce(t, i, s);
          }
          break;
        case 5:
          var l = t.return;
          try {
            eu(t);
          } catch (s) {
            Ce(t, l, s);
          }
      }
    } catch (s) {
      Ce(t, t.return, s);
    }
    if (t === e) {
      $ = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), ($ = a);
      break;
    }
    $ = t.return;
  }
}
var cy = Math.ceil,
  vl = cn.ReactCurrentDispatcher,
  rc = cn.ReactCurrentOwner,
  Et = cn.ReactCurrentBatchConfig,
  ne = 0,
  ze = null,
  Te = null,
  Be = 0,
  st = 0,
  Rr = Fn(0),
  Oe = 0,
  qo = null,
  qn = 0,
  bl = 0,
  oc = 0,
  Lo = null,
  rt = null,
  ic = 0,
  Kr = 1 / 0,
  Xt = null,
  yl = !1,
  ru = null,
  Nn = null,
  Mi = !1,
  Cn = null,
  wl = 0,
  Mo = 0,
  ou = null,
  Wi = -1,
  Ki = 0;
function Je() {
  return ne & 6 ? Pe() : Wi !== -1 ? Wi : (Wi = Pe());
}
function Tn(e) {
  return e.mode & 1
    ? ne & 2 && Be !== 0
      ? Be & -Be
      : Gv.transition !== null
        ? (Ki === 0 && (Ki = gp()), Ki)
        : ((e = ie),
          e !== 0 ||
            ((e = window.event),
            (e = e === void 0 ? 16 : Ep(e.type))),
          e)
    : 1;
}
function At(e, t, n, r) {
  if (50 < Mo) throw ((Mo = 0), (ou = null), Error(O(185)));
  ii(e, n, r),
    (!(ne & 2) || e !== ze) &&
      (e === ze && (!(ne & 2) && (bl |= n), Oe === 4 && Sn(e, Be)),
      at(e, r),
      n === 1 &&
        ne === 0 &&
        !(t.mode & 1) &&
        ((Kr = Pe() + 500), Il && In()));
}
function at(e, t) {
  var n = e.callbackNode;
  Gg(e, t);
  var r = nl(e, e === ze ? Be : 0);
  if (r === 0)
    n !== null && Zc(n),
      (e.callbackNode = null),
      (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Zc(n), t === 1))
      e.tag === 0 ? Kv(Hd.bind(null, e)) : Bp(Hd.bind(null, e)),
        Bv(function () {
          !(ne & 6) && In();
        }),
        (n = null);
    else {
      switch (vp(r)) {
        case 1:
          n = Lu;
          break;
        case 4:
          n = hp;
          break;
        case 16:
          n = tl;
          break;
        case 536870912:
          n = mp;
          break;
        default:
          n = tl;
      }
      n = bh(n, Dh.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Dh(e, t) {
  if (((Wi = -1), (Ki = 0), ne & 6)) throw Error(O(327));
  var n = e.callbackNode;
  if (Ar() && e.callbackNode !== n) return null;
  var r = nl(e, e === ze ? Be : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Sl(e, r);
  else {
    t = r;
    var o = ne;
    ne |= 2;
    var i = Fh();
    (ze !== e || Be !== t) &&
      ((Xt = null), (Kr = Pe() + 500), Qn(e, t));
    do
      try {
        py();
        break;
      } catch (a) {
        zh(e, a);
      }
    while (1);
    Hu(),
      (vl.current = i),
      (ne = o),
      Te !== null ? (t = 0) : ((ze = null), (Be = 0), (t = Oe));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Ls(e)), o !== 0 && ((r = o), (t = iu(e, o)))),
      t === 1)
    )
      throw ((n = qo), Qn(e, 0), Sn(e, r), at(e, Pe()), n);
    if (t === 6) Sn(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !dy(o) &&
          ((t = Sl(e, r)),
          t === 2 &&
            ((i = Ls(e)), i !== 0 && ((r = i), (t = iu(e, i)))),
          t === 1))
      )
        throw ((n = qo), Qn(e, 0), Sn(e, r), at(e, Pe()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(O(345));
        case 2:
          Bn(e, rt, Xt);
          break;
        case 3:
          if (
            (Sn(e, r),
            (r & 130023424) === r && ((t = ic + 500 - Pe()), 10 < t))
          ) {
            if (nl(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              Je(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = $s(Bn.bind(null, e, rt, Xt), t);
            break;
          }
          Bn(e, rt, Xt);
          break;
        case 4:
          if ((Sn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var l = 31 - It(r);
            (i = 1 << l), (l = t[l]), l > o && (o = l), (r &= ~i);
          }
          if (
            ((r = o),
            (r = Pe() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * cy(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = $s(Bn.bind(null, e, rt, Xt), r);
            break;
          }
          Bn(e, rt, Xt);
          break;
        case 5:
          Bn(e, rt, Xt);
          break;
        default:
          throw Error(O(329));
      }
    }
  }
  return at(e, Pe()), e.callbackNode === n ? Dh.bind(null, e) : null;
}
function iu(e, t) {
  var n = Lo;
  return (
    e.current.memoizedState.isDehydrated && (Qn(e, t).flags |= 256),
    (e = Sl(e, t)),
    e !== 2 && ((t = rt), (rt = n), t !== null && lu(t)),
    e
  );
}
function lu(e) {
  rt === null ? (rt = e) : rt.push.apply(rt, e);
}
function dy(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!$t(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Sn(e, t) {
  for (
    t &= ~oc,
      t &= ~bl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - It(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Hd(e) {
  if (ne & 6) throw Error(O(327));
  Ar();
  var t = nl(e, 0);
  if (!(t & 1)) return at(e, Pe()), null;
  var n = Sl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ls(e);
    r !== 0 && ((t = r), (n = iu(e, r)));
  }
  if (n === 1) throw ((n = qo), Qn(e, 0), Sn(e, t), at(e, Pe()), n);
  if (n === 6) throw Error(O(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Bn(e, rt, Xt),
    at(e, Pe()),
    null
  );
}
function lc(e, t) {
  var n = ne;
  ne |= 1;
  try {
    return e(t);
  } finally {
    (ne = n), ne === 0 && ((Kr = Pe() + 500), Il && In());
  }
}
function er(e) {
  Cn !== null && Cn.tag === 0 && !(ne & 6) && Ar();
  var t = ne;
  ne |= 1;
  var n = Et.transition,
    r = ie;
  try {
    if (((Et.transition = null), (ie = 1), e)) return e();
  } finally {
    (ie = r), (Et.transition = n), (ne = t), !(ne & 6) && In();
  }
}
function ac() {
  (st = Rr.current), me(Rr);
}
function Qn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), bv(n)), Te !== null))
    for (n = Te.return; n !== null; ) {
      var r = n;
      switch ((bu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && al();
          break;
        case 3:
          Hr(), me(it), me(Qe), Xu();
          break;
        case 5:
          Yu(r);
          break;
        case 4:
          Hr();
          break;
        case 13:
          me(we);
          break;
        case 19:
          me(we);
          break;
        case 10:
          Wu(r.type._context);
          break;
        case 22:
        case 23:
          ac();
      }
      n = n.return;
    }
  if (
    ((ze = e),
    (Te = e = Rn(e.current, null)),
    (Be = st = t),
    (Oe = 0),
    (qo = null),
    (oc = bl = qn = 0),
    (rt = Lo = null),
    Wn !== null)
  ) {
    for (t = 0; t < Wn.length; t++)
      if (((n = Wn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var l = i.next;
          (i.next = o), (r.next = l);
        }
        n.pending = r;
      }
    Wn = null;
  }
  return e;
}
function zh(e, t) {
  do {
    var n = Te;
    try {
      if ((Hu(), (Bi.current = gl), ml)) {
        for (var r = Se.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        ml = !1;
      }
      if (
        ((Zn = 0),
        (De = Me = Se = null),
        (To = !1),
        (Xo = 0),
        (rc.current = null),
        n === null || n.return === null)
      ) {
        (Oe = 1), (qo = t), (Te = null);
        break;
      }
      e: {
        var i = e,
          l = n.return,
          a = n,
          s = t;
        if (
          ((t = Be),
          (a.flags |= 32768),
          s !== null &&
            typeof s == "object" &&
            typeof s.then == "function")
        ) {
          var u = s,
            c = a,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var h = c.alternate;
            h
              ? ((c.updateQueue = h.updateQueue),
                (c.memoizedState = h.memoizedState),
                (c.lanes = h.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var S = Ld(l);
          if (S !== null) {
            (S.flags &= -257),
              Md(S, l, a, i, t),
              S.mode & 1 && Rd(i, u, t),
              (t = S),
              (s = u);
            var m = t.updateQueue;
            if (m === null) {
              var x = new Set();
              x.add(s), (t.updateQueue = x);
            } else m.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Rd(i, u, t), sc();
              break e;
            }
            s = Error(O(426));
          }
        } else if (ge && a.mode & 1) {
          var k = Ld(l);
          if (k !== null) {
            !(k.flags & 65536) && (k.flags |= 256),
              Md(k, l, a, i, t),
              Bu(Wr(s, a));
            break e;
          }
        }
        (i = s = Wr(s, a)),
          Oe !== 4 && (Oe = 2),
          Lo === null ? (Lo = [i]) : Lo.push(i),
          (i = l);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var g = yh(i, s, t);
              Ed(i, g);
              break e;
            case 1:
              a = s;
              var d = i.type,
                w = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (w !== null &&
                    typeof w.componentDidCatch == "function" &&
                    (Nn === null || !Nn.has(w))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var v = wh(i, a, t);
                Ed(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Ah(n);
    } catch (P) {
      (t = P), Te === n && n !== null && (Te = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Fh() {
  var e = vl.current;
  return (vl.current = gl), e === null ? gl : e;
}
function sc() {
  (Oe === 0 || Oe === 3 || Oe === 2) && (Oe = 4),
    ze === null ||
      (!(qn & 268435455) && !(bl & 268435455)) ||
      Sn(ze, Be);
}
function Sl(e, t) {
  var n = ne;
  ne |= 2;
  var r = Fh();
  (ze !== e || Be !== t) && ((Xt = null), Qn(e, t));
  do
    try {
      fy();
      break;
    } catch (o) {
      zh(e, o);
    }
  while (1);
  if ((Hu(), (ne = n), (vl.current = r), Te !== null))
    throw Error(O(261));
  return (ze = null), (Be = 0), Oe;
}
function fy() {
  for (; Te !== null; ) Ih(Te);
}
function py() {
  for (; Te !== null && !Ag(); ) Ih(Te);
}
function Ih(e) {
  var t = Uh(e.alternate, e, st);
  (e.memoizedProps = e.pendingProps),
    t === null ? Ah(e) : (Te = t),
    (rc.current = null);
}
function Ah(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = ly(n, t)), n !== null)) {
        (n.flags &= 32767), (Te = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768),
          (e.subtreeFlags = 0),
          (e.deletions = null);
      else {
        (Oe = 6), (Te = null);
        return;
      }
    } else if (((n = iy(n, t, st)), n !== null)) {
      Te = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Te = t;
      return;
    }
    Te = t = e;
  } while (t !== null);
  Oe === 0 && (Oe = 5);
}
function Bn(e, t, n) {
  var r = ie,
    o = Et.transition;
  try {
    (Et.transition = null), (ie = 1), hy(e, t, n, r);
  } finally {
    (Et.transition = o), (ie = r);
  }
  return null;
}
function hy(e, t, n, r) {
  do Ar();
  while (Cn !== null);
  if (ne & 6) throw Error(O(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (
    ((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)
  )
    throw Error(O(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Qg(e, i),
    e === ze && ((Te = ze = null), (Be = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Mi ||
      ((Mi = !0),
      bh(tl, function () {
        return Ar(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Et.transition), (Et.transition = null);
    var l = ie;
    ie = 1;
    var a = ne;
    (ne |= 4),
      (rc.current = null),
      sy(e, n),
      Mh(n, e),
      Dv(Is),
      (rl = !!Fs),
      (Is = Fs = null),
      (e.current = n),
      uy(n),
      $g(),
      (ne = a),
      (ie = l),
      (Et.transition = i);
  } else e.current = n;
  if (
    (Mi && ((Mi = !1), (Cn = e), (wl = o)),
    (i = e.pendingLanes),
    i === 0 && (Nn = null),
    Bg(n.stateNode),
    at(e, Pe()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]),
        r(o.value, { componentStack: o.stack, digest: o.digest });
  if (yl) throw ((yl = !1), (e = ru), (ru = null), e);
  return (
    wl & 1 && e.tag !== 0 && Ar(),
    (i = e.pendingLanes),
    i & 1 ? (e === ou ? Mo++ : ((Mo = 0), (ou = e))) : (Mo = 0),
    In(),
    null
  );
}
function Ar() {
  if (Cn !== null) {
    var e = vp(wl),
      t = Et.transition,
      n = ie;
    try {
      if (
        ((Et.transition = null), (ie = 16 > e ? 16 : e), Cn === null)
      )
        var r = !1;
      else {
        if (((e = Cn), (Cn = null), (wl = 0), ne & 6))
          throw Error(O(331));
        var o = ne;
        for (ne |= 4, $ = e.current; $ !== null; ) {
          var i = $,
            l = i.child;
          if ($.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var s = 0; s < a.length; s++) {
                var u = a[s];
                for ($ = u; $ !== null; ) {
                  var c = $;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ro(8, c, i);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), ($ = f);
                  else
                    for (; $ !== null; ) {
                      c = $;
                      var h = c.sibling,
                        S = c.return;
                      if ((Th(c), c === u)) {
                        $ = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = S), ($ = h);
                        break;
                      }
                      $ = S;
                    }
                }
              }
              var m = i.alternate;
              if (m !== null) {
                var x = m.child;
                if (x !== null) {
                  m.child = null;
                  do {
                    var k = x.sibling;
                    (x.sibling = null), (x = k);
                  } while (x !== null);
                }
              }
              $ = i;
            }
          }
          if (i.subtreeFlags & 2064 && l !== null)
            (l.return = i), ($ = l);
          else
            e: for (; $ !== null; ) {
              if (((i = $), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ro(9, i, i.return);
                }
              var g = i.sibling;
              if (g !== null) {
                (g.return = i.return), ($ = g);
                break e;
              }
              $ = i.return;
            }
        }
        var d = e.current;
        for ($ = d; $ !== null; ) {
          l = $;
          var w = l.child;
          if (l.subtreeFlags & 2064 && w !== null)
            (w.return = l), ($ = w);
          else
            e: for (l = d; $ !== null; ) {
              if (((a = $), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ul(9, a);
                  }
                } catch (P) {
                  Ce(a, a.return, P);
                }
              if (a === l) {
                $ = null;
                break e;
              }
              var v = a.sibling;
              if (v !== null) {
                (v.return = a.return), ($ = v);
                break e;
              }
              $ = a.return;
            }
        }
        if (
          ((ne = o),
          In(),
          Wt && typeof Wt.onPostCommitFiberRoot == "function")
        )
          try {
            Wt.onPostCommitFiberRoot(Ml, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (ie = n), (Et.transition = t);
    }
  }
  return !1;
}
function Wd(e, t, n) {
  (t = Wr(n, t)),
    (t = yh(e, t, 1)),
    (e = jn(e, t, 1)),
    (t = Je()),
    e !== null && (ii(e, 1, t), at(e, t));
}
function Ce(e, t, n) {
  if (e.tag === 3) Wd(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Wd(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Nn === null || !Nn.has(r)))
        ) {
          (e = Wr(n, e)),
            (e = wh(t, e, 1)),
            (t = jn(t, e, 1)),
            (e = Je()),
            t !== null && (ii(t, 1, e), at(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function my(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Je()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ze === e &&
      (Be & n) === n &&
      (Oe === 4 ||
      (Oe === 3 && (Be & 130023424) === Be && 500 > Pe() - ic)
        ? Qn(e, 0)
        : (oc |= n)),
    at(e, t);
}
function $h(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ci), (Ci <<= 1), !(Ci & 130023424) && (Ci = 4194304))
      : (t = 1));
  var n = Je();
  (e = an(e, t)), e !== null && (ii(e, t, n), at(e, n));
}
function gy(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), $h(e, n);
}
function vy(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(O(314));
  }
  r !== null && r.delete(t), $h(e, n);
}
var Uh;
Uh = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || it.current) ot = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128))
        return (ot = !1), oy(e, t, n);
      ot = !!(e.flags & 131072);
    }
  else (ot = !1), ge && t.flags & 1048576 && Vp(t, cl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Hi(e, t), (e = t.pendingProps);
      var o = br(t, Qe.current);
      Ir(t, n), (o = Zu(null, t, r, e, o, n));
      var i = qu();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            lt(r) ? ((i = !0), sl(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0
                ? o.state
                : null),
            Gu(t),
            (o.updater = Al),
            (t.stateNode = o),
            (o._reactInternals = t),
            Ks(t, r, e, n),
            (t = Ys(null, t, r, !0, i, n)))
          : ((t.tag = 0),
            ge && i && Uu(t),
            Xe(null, t, o, n),
            (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Hi(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = wy(r)),
          (e = Mt(r, e)),
          o)
        ) {
          case 0:
            t = Qs(null, t, r, e, n);
            break e;
          case 1:
            t = zd(null, t, r, e, n);
            break e;
          case 11:
            t = Od(null, t, r, e, n);
            break e;
          case 14:
            t = Dd(null, t, r, Mt(r.type, e), n);
            break e;
        }
        throw Error(O(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Mt(r, o)),
        Qs(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Mt(r, o)),
        zd(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((Eh(t), e === null)) throw Error(O(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          Gp(e, t),
          pl(t, r, null, n);
        var l = t.memoizedState;
        if (((r = l.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: l.cache,
              pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
              transitions: l.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = Wr(Error(O(423)), t)), (t = Fd(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = Wr(Error(O(424)), t)), (t = Fd(e, t, r, n, o));
            break e;
          } else
            for (
              ut = Pn(t.stateNode.containerInfo.firstChild),
                ct = t,
                ge = !0,
                zt = null,
                n = Jp(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Br(), r === o)) {
            t = sn(e, t, n);
            break e;
          }
          Xe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Zp(t),
        e === null && Vs(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (l = o.children),
        As(r, o)
          ? (l = null)
          : i !== null && As(r, i) && (t.flags |= 32),
        Ch(e, t),
        Xe(e, t, l, n),
        t.child
      );
    case 6:
      return e === null && Vs(t), null;
    case 13:
      return kh(e, t, n);
    case 4:
      return (
        Qu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Vr(t, null, r, n)) : Xe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Mt(r, o)),
        Od(e, t, r, o, n)
      );
    case 7:
      return Xe(e, t, t.pendingProps, n), t.child;
    case 8:
      return Xe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Xe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (l = o.value),
          pe(dl, r._currentValue),
          (r._currentValue = l),
          i !== null)
        )
          if ($t(i.value, l)) {
            if (i.children === o.children && !it.current) {
              t = sn(e, t, n);
              break e;
            }
          } else
            for (
              i = t.child, i !== null && (i.return = t);
              i !== null;

            ) {
              var a = i.dependencies;
              if (a !== null) {
                l = i.child;
                for (var s = a.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (i.tag === 1) {
                      (s = tn(-1, n & -n)), (s.tag = 2);
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (s.next = s)
                          : ((s.next = c.next), (c.next = s)),
                          (u.pending = s);
                      }
                    }
                    (i.lanes |= n),
                      (s = i.alternate),
                      s !== null && (s.lanes |= n),
                      Hs(i.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (i.tag === 10)
                l = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((l = i.return), l === null)) throw Error(O(341));
                (l.lanes |= n),
                  (a = l.alternate),
                  a !== null && (a.lanes |= n),
                  Hs(l, n, t),
                  (l = i.sibling);
              } else l = i.child;
              if (l !== null) l.return = i;
              else
                for (l = i; l !== null; ) {
                  if (l === t) {
                    l = null;
                    break;
                  }
                  if (((i = l.sibling), i !== null)) {
                    (i.return = l.return), (l = i);
                    break;
                  }
                  l = l.return;
                }
              i = l;
            }
        Xe(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Ir(t, n),
        (o = kt(o)),
        (r = r(o)),
        (t.flags |= 1),
        Xe(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = Mt(r, t.pendingProps)),
        (o = Mt(r.type, o)),
        Dd(e, t, r, o, n)
      );
    case 15:
      return Sh(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Mt(r, o)),
        Hi(e, t),
        (t.tag = 1),
        lt(r) ? ((e = !0), sl(t)) : (e = !1),
        Ir(t, n),
        Yp(t, r, o),
        Ks(t, r, o, n),
        Ys(null, t, r, !0, e, n)
      );
    case 19:
      return _h(e, t, n);
    case 22:
      return xh(e, t, n);
  }
  throw Error(O(156, t.tag));
};
function bh(e, t) {
  return pp(e, t);
}
function yy(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ct(e, t, n, r) {
  return new yy(e, t, n, r);
}
function uc(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function wy(e) {
  if (typeof e == "function") return uc(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Nu)) return 11;
    if (e === Tu) return 14;
  }
  return 2;
}
function Rn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ct(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null
        ? null
        : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Gi(e, t, n, r, o, i) {
  var l = 2;
  if (((r = e), typeof e == "function")) uc(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else
    e: switch (e) {
      case Sr:
        return Yn(n.children, o, i, t);
      case ju:
        (l = 8), (o |= 8);
        break;
      case gs:
        return (
          (e = Ct(12, n, t, o | 2)),
          (e.elementType = gs),
          (e.lanes = i),
          e
        );
      case vs:
        return (
          (e = Ct(13, n, t, o)),
          (e.elementType = vs),
          (e.lanes = i),
          e
        );
      case ys:
        return (
          (e = Ct(19, n, t, o)),
          (e.elementType = ys),
          (e.lanes = i),
          e
        );
      case Xf:
        return Bl(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Qf:
              l = 10;
              break e;
            case Yf:
              l = 9;
              break e;
            case Nu:
              l = 11;
              break e;
            case Tu:
              l = 14;
              break e;
            case vn:
              (l = 16), (r = null);
              break e;
          }
        throw Error(O(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ct(l, n, t, o)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Yn(e, t, n, r) {
  return (e = Ct(7, e, r, t)), (e.lanes = n), e;
}
function Bl(e, t, n, r) {
  return (
    (e = Ct(22, e, r, t)),
    (e.elementType = Xf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ns(e, t, n) {
  return (e = Ct(6, e, null, t)), (e.lanes = n), e;
}
function rs(e, t, n) {
  return (
    (t = Ct(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Sy(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ia(0)),
    (this.expirationTimes = Ia(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ia(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function cc(e, t, n, r, o, i, l, a, s) {
  return (
    (e = new Sy(e, t, n, a, s)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Ct(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Gu(i),
    e
  );
}
function xy(e, t, n) {
  var r =
    3 < arguments.length && arguments[3] !== void 0
      ? arguments[3]
      : null;
  return {
    $$typeof: wr,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Bh(e) {
  if (!e) return Mn;
  e = e._reactInternals;
  e: {
    if (sr(e) !== e || e.tag !== 1) throw Error(O(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (lt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(O(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (lt(n)) return bp(e, n, t);
  }
  return t;
}
function Vh(e, t, n, r, o, i, l, a, s) {
  return (
    (e = cc(n, r, !0, e, o, i, l, a, s)),
    (e.context = Bh(null)),
    (n = e.current),
    (r = Je()),
    (o = Tn(n)),
    (i = tn(r, o)),
    (i.callback = t ?? null),
    jn(n, i, o),
    (e.current.lanes = o),
    ii(e, o, r),
    at(e, r),
    e
  );
}
function Vl(e, t, n, r) {
  var o = t.current,
    i = Je(),
    l = Tn(o);
  return (
    (n = Bh(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = tn(i, l)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = jn(o, t, l)),
    e !== null && (At(e, o, l, i), bi(e, o, l)),
    l
  );
}
function xl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Kd(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function dc(e, t) {
  Kd(e, t), (e = e.alternate) && Kd(e, t);
}
function Cy() {
  return null;
}
var Hh =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function fc(e) {
  this._internalRoot = e;
}
Hl.prototype.render = fc.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(O(409));
  Vl(e, t, null, null);
};
Hl.prototype.unmount = fc.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    er(function () {
      Vl(null, e, null, null);
    }),
      (t[ln] = null);
  }
};
function Hl(e) {
  this._internalRoot = e;
}
Hl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Sp();
    e = { blockedOn: null, target: e, priority: t };
    for (
      var n = 0;
      n < wn.length && t !== 0 && t < wn[n].priority;
      n++
    );
    wn.splice(n, 0, e), n === 0 && Cp(e);
  }
};
function pc(e) {
  return !(
    !e ||
    (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
  );
}
function Wl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 ||
        e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Gd() {}
function Ey(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = xl(l);
        i.call(u);
      };
    }
    var l = Vh(t, r, e, 0, null, !1, !1, "", Gd);
    return (
      (e._reactRootContainer = l),
      (e[ln] = l.current),
      Wo(e.nodeType === 8 ? e.parentNode : e),
      er(),
      l
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var u = xl(s);
      a.call(u);
    };
  }
  var s = cc(e, 0, !1, null, null, !1, !1, "", Gd);
  return (
    (e._reactRootContainer = s),
    (e[ln] = s.current),
    Wo(e.nodeType === 8 ? e.parentNode : e),
    er(function () {
      Vl(t, s, n, r);
    }),
    s
  );
}
function Kl(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var l = i;
    if (typeof o == "function") {
      var a = o;
      o = function () {
        var s = xl(l);
        a.call(s);
      };
    }
    Vl(t, l, e, o);
  } else l = Ey(n, t, e, o, r);
  return xl(l);
}
yp = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = xo(t.pendingLanes);
        n !== 0 &&
          (Mu(t, n | 1),
          at(t, Pe()),
          !(ne & 6) && ((Kr = Pe() + 500), In()));
      }
      break;
    case 13:
      er(function () {
        var r = an(e, 1);
        if (r !== null) {
          var o = Je();
          At(r, e, 1, o);
        }
      }),
        dc(e, 1);
  }
};
Ou = function (e) {
  if (e.tag === 13) {
    var t = an(e, 134217728);
    if (t !== null) {
      var n = Je();
      At(t, e, 134217728, n);
    }
    dc(e, 134217728);
  }
};
wp = function (e) {
  if (e.tag === 13) {
    var t = Tn(e),
      n = an(e, t);
    if (n !== null) {
      var r = Je();
      At(n, e, t, r);
    }
    dc(e, t);
  }
};
Sp = function () {
  return ie;
};
xp = function (e, t) {
  var n = ie;
  try {
    return (ie = e), t();
  } finally {
    ie = n;
  }
};
Ns = function (e, t, n) {
  switch (t) {
    case "input":
      if ((xs(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" +
              JSON.stringify("" + t) +
              '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Fl(r);
            if (!o) throw Error(O(90));
            Zf(r), xs(r, o);
          }
        }
      }
      break;
    case "textarea":
      ep(e, n);
      break;
    case "select":
      (t = n.value), t != null && Or(e, !!n.multiple, t, !1);
  }
};
ap = lc;
sp = er;
var ky = {
    usingClientEntryPoint: !1,
    Events: [ai, kr, Fl, ip, lp, lc],
  },
  po = {
    findFiberByHostInstance: Hn,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  _y = {
    bundleType: po.bundleType,
    version: po.version,
    rendererPackageName: po.rendererPackageName,
    rendererConfig: po.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: cn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = dp(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: po.findFiberByHostInstance || Cy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Oi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Oi.isDisabled && Oi.supportsFiber)
    try {
      (Ml = Oi.inject(_y)), (Wt = Oi);
    } catch {}
}
ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ky;
ht.createPortal = function (e, t) {
  var n =
    2 < arguments.length && arguments[2] !== void 0
      ? arguments[2]
      : null;
  if (!pc(t)) throw Error(O(200));
  return xy(e, t, null, n);
};
ht.createRoot = function (e, t) {
  if (!pc(e)) throw Error(O(299));
  var n = !1,
    r = "",
    o = Hh;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = cc(e, 1, !1, null, null, n, !1, r, o)),
    (e[ln] = t.current),
    Wo(e.nodeType === 8 ? e.parentNode : e),
    new fc(t)
  );
};
ht.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(O(188))
      : ((e = Object.keys(e).join(",")), Error(O(268, e)));
  return (e = dp(t)), (e = e === null ? null : e.stateNode), e;
};
ht.flushSync = function (e) {
  return er(e);
};
ht.hydrate = function (e, t, n) {
  if (!Wl(t)) throw Error(O(200));
  return Kl(null, e, t, !0, n);
};
ht.hydrateRoot = function (e, t, n) {
  if (!pc(e)) throw Error(O(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    l = Hh;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
    (t = Vh(t, null, e, 1, n ?? null, o, !1, i, l)),
    (e[ln] = t.current),
    Wo(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new Hl(t);
};
ht.render = function (e, t, n) {
  if (!Wl(t)) throw Error(O(200));
  return Kl(null, e, t, !1, n);
};
ht.unmountComponentAtNode = function (e) {
  if (!Wl(e)) throw Error(O(40));
  return e._reactRootContainer
    ? (er(function () {
        Kl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[ln] = null);
        });
      }),
      !0)
    : !1;
};
ht.unstable_batchedUpdates = lc;
ht.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Wl(n)) throw Error(O(200));
  if (e == null || e._reactInternals === void 0) throw Error(O(38));
  return Kl(e, t, n, !1, r);
};
ht.version = "18.2.0-next-9e3b772b8-20220608";
function Wh() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wh);
    } catch (e) {
      console.error(e);
    }
}
Wh(), (Vf.exports = ht);
var tr = Vf.exports;
const Kh = wu(tr),
  Py = Mf({ __proto__: null, default: Kh }, [tr]);
var Qd = tr;
(hs.createRoot = Qd.createRoot), (hs.hydrateRoot = Qd.hydrateRoot);
var Gh = { exports: {} },
  Qh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gr = y;
function jy(e, t) {
  return (
    (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
  );
}
var Ny = typeof Object.is == "function" ? Object.is : jy,
  Ty = Gr.useState,
  Ry = Gr.useEffect,
  Ly = Gr.useLayoutEffect,
  My = Gr.useDebugValue;
function Oy(e, t) {
  var n = t(),
    r = Ty({ inst: { value: n, getSnapshot: t } }),
    o = r[0].inst,
    i = r[1];
  return (
    Ly(
      function () {
        (o.value = n), (o.getSnapshot = t), os(o) && i({ inst: o });
      },
      [e, n, t],
    ),
    Ry(
      function () {
        return (
          os(o) && i({ inst: o }),
          e(function () {
            os(o) && i({ inst: o });
          })
        );
      },
      [e],
    ),
    My(n),
    n
  );
}
function os(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ny(e, n);
  } catch {
    return !0;
  }
}
function Dy(e, t) {
  return t();
}
var zy =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? Dy
    : Oy;
Qh.useSyncExternalStore =
  Gr.useSyncExternalStore !== void 0 ? Gr.useSyncExternalStore : zy;
Gh.exports = Qh;
var Fy = Gh.exports,
  Yh = { exports: {} },
  Xh = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gl = y,
  Iy = Fy;
function Ay(e, t) {
  return (
    (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
  );
}
var $y = typeof Object.is == "function" ? Object.is : Ay,
  Uy = Iy.useSyncExternalStore,
  by = Gl.useRef,
  By = Gl.useEffect,
  Vy = Gl.useMemo,
  Hy = Gl.useDebugValue;
Xh.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
  var i = by(null);
  if (i.current === null) {
    var l = { hasValue: !1, value: null };
    i.current = l;
  } else l = i.current;
  i = Vy(
    function () {
      function s(S) {
        if (!u) {
          if (
            ((u = !0),
            (c = S),
            (S = r(S)),
            o !== void 0 && l.hasValue)
          ) {
            var m = l.value;
            if (o(m, S)) return (f = m);
          }
          return (f = S);
        }
        if (((m = f), $y(c, S))) return m;
        var x = r(S);
        return o !== void 0 && o(m, x) ? m : ((c = S), (f = x));
      }
      var u = !1,
        c,
        f,
        h = n === void 0 ? null : n;
      return [
        function () {
          return s(t());
        },
        h === null
          ? void 0
          : function () {
              return s(h());
            },
      ];
    },
    [t, n, r, o],
  );
  var a = Uy(e, i[0], i[1]);
  return (
    By(
      function () {
        (l.hasValue = !0), (l.value = a);
      },
      [a],
    ),
    Hy(a),
    a
  );
};
Yh.exports = Xh;
var Wy = Yh.exports;
function Ky(e) {
  e();
}
let Jh = Ky;
const Gy = (e) => (Jh = e),
  Qy = () => Jh,
  Yd = Symbol.for("react-redux-context"),
  Xd = typeof globalThis < "u" ? globalThis : {};
function Yy() {
  var e;
  if (!y.createContext) return {};
  const t = (e = Xd[Yd]) != null ? e : (Xd[Yd] = new Map());
  let n = t.get(y.createContext);
  return (
    n || ((n = y.createContext(null)), t.set(y.createContext, n)), n
  );
}
const On = Yy();
function hc(e = On) {
  return function () {
    return y.useContext(e);
  };
}
const Zh = hc(),
  Xy = () => {
    throw new Error("uSES not initialized!");
  };
let qh = Xy;
const Jy = (e) => {
    qh = e;
  },
  Zy = (e, t) => e === t;
function qy(e = On) {
  const t = e === On ? Zh : hc(e);
  return function (r, o = {}) {
    const {
        equalityFn: i = Zy,
        stabilityCheck: l = void 0,
        noopCheck: a = void 0,
      } = typeof o == "function" ? { equalityFn: o } : o,
      {
        store: s,
        subscription: u,
        getServerState: c,
        stabilityCheck: f,
        noopCheck: h,
      } = t();
    y.useRef(!0);
    const S = y.useCallback(
        {
          [r.name](x) {
            return r(x);
          },
        }[r.name],
        [r, f, l],
      ),
      m = qh(u.addNestedSub, s.getState, c || s.getState, S, i);
    return y.useDebugValue(m), m;
  };
}
const eo = qy();
var em = { exports: {} },
  le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fe = typeof Symbol == "function" && Symbol.for,
  mc = Fe ? Symbol.for("react.element") : 60103,
  gc = Fe ? Symbol.for("react.portal") : 60106,
  Ql = Fe ? Symbol.for("react.fragment") : 60107,
  Yl = Fe ? Symbol.for("react.strict_mode") : 60108,
  Xl = Fe ? Symbol.for("react.profiler") : 60114,
  Jl = Fe ? Symbol.for("react.provider") : 60109,
  Zl = Fe ? Symbol.for("react.context") : 60110,
  vc = Fe ? Symbol.for("react.async_mode") : 60111,
  ql = Fe ? Symbol.for("react.concurrent_mode") : 60111,
  ea = Fe ? Symbol.for("react.forward_ref") : 60112,
  ta = Fe ? Symbol.for("react.suspense") : 60113,
  e0 = Fe ? Symbol.for("react.suspense_list") : 60120,
  na = Fe ? Symbol.for("react.memo") : 60115,
  ra = Fe ? Symbol.for("react.lazy") : 60116,
  t0 = Fe ? Symbol.for("react.block") : 60121,
  n0 = Fe ? Symbol.for("react.fundamental") : 60117,
  r0 = Fe ? Symbol.for("react.responder") : 60118,
  o0 = Fe ? Symbol.for("react.scope") : 60119;
function gt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case mc:
        switch (((e = e.type), e)) {
          case vc:
          case ql:
          case Ql:
          case Xl:
          case Yl:
          case ta:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case Zl:
              case ea:
              case ra:
              case na:
              case Jl:
                return e;
              default:
                return t;
            }
        }
      case gc:
        return t;
    }
  }
}
function tm(e) {
  return gt(e) === ql;
}
le.AsyncMode = vc;
le.ConcurrentMode = ql;
le.ContextConsumer = Zl;
le.ContextProvider = Jl;
le.Element = mc;
le.ForwardRef = ea;
le.Fragment = Ql;
le.Lazy = ra;
le.Memo = na;
le.Portal = gc;
le.Profiler = Xl;
le.StrictMode = Yl;
le.Suspense = ta;
le.isAsyncMode = function (e) {
  return tm(e) || gt(e) === vc;
};
le.isConcurrentMode = tm;
le.isContextConsumer = function (e) {
  return gt(e) === Zl;
};
le.isContextProvider = function (e) {
  return gt(e) === Jl;
};
le.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === mc;
};
le.isForwardRef = function (e) {
  return gt(e) === ea;
};
le.isFragment = function (e) {
  return gt(e) === Ql;
};
le.isLazy = function (e) {
  return gt(e) === ra;
};
le.isMemo = function (e) {
  return gt(e) === na;
};
le.isPortal = function (e) {
  return gt(e) === gc;
};
le.isProfiler = function (e) {
  return gt(e) === Xl;
};
le.isStrictMode = function (e) {
  return gt(e) === Yl;
};
le.isSuspense = function (e) {
  return gt(e) === ta;
};
le.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Ql ||
    e === ql ||
    e === Xl ||
    e === Yl ||
    e === ta ||
    e === e0 ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === ra ||
        e.$$typeof === na ||
        e.$$typeof === Jl ||
        e.$$typeof === Zl ||
        e.$$typeof === ea ||
        e.$$typeof === n0 ||
        e.$$typeof === r0 ||
        e.$$typeof === o0 ||
        e.$$typeof === t0))
  );
};
le.typeOf = gt;
em.exports = le;
var i0 = em.exports,
  nm = i0,
  l0 = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  a0 = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  rm = {};
rm[nm.ForwardRef] = l0;
rm[nm.Memo] = a0;
var se = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yc = Symbol.for("react.element"),
  wc = Symbol.for("react.portal"),
  oa = Symbol.for("react.fragment"),
  ia = Symbol.for("react.strict_mode"),
  la = Symbol.for("react.profiler"),
  aa = Symbol.for("react.provider"),
  sa = Symbol.for("react.context"),
  s0 = Symbol.for("react.server_context"),
  ua = Symbol.for("react.forward_ref"),
  ca = Symbol.for("react.suspense"),
  da = Symbol.for("react.suspense_list"),
  fa = Symbol.for("react.memo"),
  pa = Symbol.for("react.lazy"),
  u0 = Symbol.for("react.offscreen"),
  om;
om = Symbol.for("react.module.reference");
function Pt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case yc:
        switch (((e = e.type), e)) {
          case oa:
          case la:
          case ia:
          case ca:
          case da:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case s0:
              case sa:
              case ua:
              case pa:
              case fa:
              case aa:
                return e;
              default:
                return t;
            }
        }
      case wc:
        return t;
    }
  }
}
se.ContextConsumer = sa;
se.ContextProvider = aa;
se.Element = yc;
se.ForwardRef = ua;
se.Fragment = oa;
se.Lazy = pa;
se.Memo = fa;
se.Portal = wc;
se.Profiler = la;
se.StrictMode = ia;
se.Suspense = ca;
se.SuspenseList = da;
se.isAsyncMode = function () {
  return !1;
};
se.isConcurrentMode = function () {
  return !1;
};
se.isContextConsumer = function (e) {
  return Pt(e) === sa;
};
se.isContextProvider = function (e) {
  return Pt(e) === aa;
};
se.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === yc;
};
se.isForwardRef = function (e) {
  return Pt(e) === ua;
};
se.isFragment = function (e) {
  return Pt(e) === oa;
};
se.isLazy = function (e) {
  return Pt(e) === pa;
};
se.isMemo = function (e) {
  return Pt(e) === fa;
};
se.isPortal = function (e) {
  return Pt(e) === wc;
};
se.isProfiler = function (e) {
  return Pt(e) === la;
};
se.isStrictMode = function (e) {
  return Pt(e) === ia;
};
se.isSuspense = function (e) {
  return Pt(e) === ca;
};
se.isSuspenseList = function (e) {
  return Pt(e) === da;
};
se.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === oa ||
    e === la ||
    e === ia ||
    e === ca ||
    e === da ||
    e === u0 ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === pa ||
        e.$$typeof === fa ||
        e.$$typeof === aa ||
        e.$$typeof === sa ||
        e.$$typeof === ua ||
        e.$$typeof === om ||
        e.getModuleId !== void 0))
  );
};
se.typeOf = Pt;
function c0() {
  const e = Qy();
  let t = null,
    n = null;
  return {
    clear() {
      (t = null), (n = null);
    },
    notify() {
      e(() => {
        let r = t;
        for (; r; ) r.callback(), (r = r.next);
      });
    },
    get() {
      let r = [],
        o = t;
      for (; o; ) r.push(o), (o = o.next);
      return r;
    },
    subscribe(r) {
      let o = !0,
        i = (n = { callback: r, next: null, prev: n });
      return (
        i.prev ? (i.prev.next = i) : (t = i),
        function () {
          !o ||
            t === null ||
            ((o = !1),
            i.next ? (i.next.prev = i.prev) : (n = i.prev),
            i.prev ? (i.prev.next = i.next) : (t = i.next));
        }
      );
    },
  };
}
const Jd = { notify() {}, get: () => [] };
function d0(e, t) {
  let n,
    r = Jd,
    o = 0,
    i = !1;
  function l(x) {
    c();
    const k = r.subscribe(x);
    let g = !1;
    return () => {
      g || ((g = !0), k(), f());
    };
  }
  function a() {
    r.notify();
  }
  function s() {
    m.onStateChange && m.onStateChange();
  }
  function u() {
    return i;
  }
  function c() {
    o++,
      n || ((n = t ? t.addNestedSub(s) : e.subscribe(s)), (r = c0()));
  }
  function f() {
    o--, n && o === 0 && (n(), (n = void 0), r.clear(), (r = Jd));
  }
  function h() {
    i || ((i = !0), c());
  }
  function S() {
    i && ((i = !1), f());
  }
  const m = {
    addNestedSub: l,
    notifyNestedSubs: a,
    handleChangeWrapper: s,
    isSubscribed: u,
    trySubscribe: h,
    tryUnsubscribe: S,
    getListeners: () => r,
  };
  return m;
}
const f0 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  p0 = f0 ? y.useLayoutEffect : y.useEffect;
function h0({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: o = "once",
  noopCheck: i = "once",
}) {
  const l = y.useMemo(() => {
      const u = d0(e);
      return {
        store: e,
        subscription: u,
        getServerState: r ? () => r : void 0,
        stabilityCheck: o,
        noopCheck: i,
      };
    }, [e, r, o, i]),
    a = y.useMemo(() => e.getState(), [e]);
  p0(() => {
    const { subscription: u } = l;
    return (
      (u.onStateChange = u.notifyNestedSubs),
      u.trySubscribe(),
      a !== e.getState() && u.notifyNestedSubs(),
      () => {
        u.tryUnsubscribe(), (u.onStateChange = void 0);
      }
    );
  }, [l, a]);
  const s = t || On;
  return y.createElement(s.Provider, { value: l }, n);
}
function im(e = On) {
  const t = e === On ? Zh : hc(e);
  return function () {
    const { store: r } = t();
    return r;
  };
}
const m0 = im();
function g0(e = On) {
  const t = e === On ? m0 : im(e);
  return function () {
    return t().dispatch;
  };
}
const ha = g0();
Jy(Wy.useSyncExternalStoreWithSelector);
Gy(tr.unstable_batchedUpdates);
/**
 * @remix-run/router v1.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ee() {
  return (
    (Ee = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) &&
                (e[r] = n[r]);
          }
          return e;
        }),
    Ee.apply(this, arguments)
  );
}
var ke;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(ke || (ke = {}));
const Zd = "popstate";
function v0(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let { pathname: i, search: l, hash: a } = r.location;
    return ei(
      "",
      { pathname: i, search: l, hash: a },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
    );
  }
  function n(r, o) {
    return typeof o == "string" ? o : rr(o);
  }
  return w0(t, n, null, e);
}
function X(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function nr(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function y0() {
  return Math.random().toString(36).substr(2, 8);
}
function qd(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ei(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Ee(
      {
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: "",
      },
      typeof t == "string" ? dn(t) : t,
      { state: n, key: (t && t.key) || r || y0() },
    )
  );
}
function rr(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function dn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function w0(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: i = !1 } = r,
    l = o.history,
    a = ke.Pop,
    s = null,
    u = c();
  u == null &&
    ((u = 0), l.replaceState(Ee({}, l.state, { idx: u }), ""));
  function c() {
    return (l.state || { idx: null }).idx;
  }
  function f() {
    a = ke.Pop;
    let k = c(),
      g = k == null ? null : k - u;
    (u = k), s && s({ action: a, location: x.location, delta: g });
  }
  function h(k, g) {
    a = ke.Push;
    let d = ei(x.location, k, g);
    n && n(d, k), (u = c() + 1);
    let w = qd(d, u),
      v = x.createHref(d);
    try {
      l.pushState(w, "", v);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError")
        throw P;
      o.location.assign(v);
    }
    i && s && s({ action: a, location: x.location, delta: 1 });
  }
  function S(k, g) {
    a = ke.Replace;
    let d = ei(x.location, k, g);
    n && n(d, k), (u = c());
    let w = qd(d, u),
      v = x.createHref(d);
    l.replaceState(w, "", v),
      i && s && s({ action: a, location: x.location, delta: 0 });
  }
  function m(k) {
    let g =
        o.location.origin !== "null"
          ? o.location.origin
          : o.location.href,
      d = typeof k == "string" ? k : rr(k);
    return (
      X(
        g,
        "No window.location.(origin|href) available to create URL for href: " +
          d,
      ),
      new URL(d, g)
    );
  }
  let x = {
    get action() {
      return a;
    },
    get location() {
      return e(o, l);
    },
    listen(k) {
      if (s)
        throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(Zd, f),
        (s = k),
        () => {
          o.removeEventListener(Zd, f), (s = null);
        }
      );
    },
    createHref(k) {
      return t(o, k);
    },
    createURL: m,
    encodeLocation(k) {
      let g = m(k);
      return { pathname: g.pathname, search: g.search, hash: g.hash };
    },
    push: h,
    replace: S,
    go(k) {
      return l.go(k);
    },
  };
  return x;
}
var _e;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(_e || (_e = {}));
const S0 = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function x0(e) {
  return e.index === !0;
}
function au(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((o, i) => {
      let l = [...n, i],
        a = typeof o.id == "string" ? o.id : l.join("-");
      if (
        (X(
          o.index !== !0 || !o.children,
          "Cannot specify children on an index route",
        ),
        X(
          !r[a],
          'Found a route id collision on id "' +
            a +
            `".  Route id's must be globally unique within Data Router usages`,
        ),
        x0(o))
      ) {
        let s = Ee({}, o, t(o), { id: a });
        return (r[a] = s), s;
      } else {
        let s = Ee({}, o, t(o), { id: a, children: void 0 });
        return (
          (r[a] = s),
          o.children && (s.children = au(o.children, t, l, r)),
          s
        );
      }
    })
  );
}
function Lr(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? dn(t) : t,
    o = Dn(r.pathname || "/", n);
  if (o == null) return null;
  let i = lm(e);
  E0(i);
  let l = null;
  for (let a = 0; l == null && a < i.length; ++a) l = M0(i[a], D0(o));
  return l;
}
function C0(e, t) {
  let { route: n, pathname: r, params: o } = e;
  return {
    id: n.id,
    pathname: r,
    params: o,
    data: t[n.id],
    handle: n.handle,
  };
}
function lm(e, t, n, r) {
  t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = "");
  let o = (i, l, a) => {
    let s = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: l,
      route: i,
    };
    s.relativePath.startsWith("/") &&
      (X(
        s.relativePath.startsWith(r),
        'Absolute route path "' +
          s.relativePath +
          '" nested under path ' +
          ('"' +
            r +
            '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (s.relativePath = s.relativePath.slice(r.length)));
    let u = nn([r, s.relativePath]),
      c = n.concat(s);
    i.children &&
      i.children.length > 0 &&
      (X(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".'),
      ),
      lm(i.children, t, c, u)),
      !(i.path == null && !i.index) &&
        t.push({ path: u, score: R0(u, i.index), routesMeta: c });
  };
  return (
    e.forEach((i, l) => {
      var a;
      if (i.path === "" || !((a = i.path) != null && a.includes("?")))
        o(i, l);
      else for (let s of am(i.path)) o(i, l, s);
    }),
    t
  );
}
function am(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    o = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return o ? [i, ""] : [i];
  let l = am(r.join("/")),
    a = [];
  return (
    a.push(...l.map((s) => (s === "" ? i : [i, s].join("/")))),
    o && a.push(...l),
    a.map((s) => (e.startsWith("/") && s === "" ? "/" : s))
  );
}
function E0(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : L0(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const k0 = /^:\w+$/,
  _0 = 3,
  P0 = 2,
  j0 = 1,
  N0 = 10,
  T0 = -2,
  ef = (e) => e === "*";
function R0(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(ef) && (r += T0),
    t && (r += P0),
    n
      .filter((o) => !ef(o))
      .reduce((o, i) => o + (k0.test(i) ? _0 : i === "" ? j0 : N0), r)
  );
}
function L0(e, t) {
  return e.length === t.length &&
    e.slice(0, -1).every((r, o) => r === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function M0(e, t) {
  let { routesMeta: n } = e,
    r = {},
    o = "/",
    i = [];
  for (let l = 0; l < n.length; ++l) {
    let a = n[l],
      s = l === n.length - 1,
      u = o === "/" ? t : t.slice(o.length) || "/",
      c = su(
        {
          path: a.relativePath,
          caseSensitive: a.caseSensitive,
          end: s,
        },
        u,
      );
    if (!c) return null;
    Object.assign(r, c.params);
    let f = a.route;
    i.push({
      params: r,
      pathname: nn([o, c.pathname]),
      pathnameBase: A0(nn([o, c.pathnameBase])),
      route: f,
    }),
      c.pathnameBase !== "/" && (o = nn([o, c.pathnameBase]));
  }
  return i;
}
function su(e, t) {
  typeof e == "string" &&
    (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = O0(e.path, e.caseSensitive, e.end),
    o = t.match(n);
  if (!o) return null;
  let i = o[0],
    l = i.replace(/(.)\/+$/, "$1"),
    a = o.slice(1);
  return {
    params: r.reduce((u, c, f) => {
      let { paramName: h, isOptional: S } = c;
      if (h === "*") {
        let x = a[f] || "";
        l = i.slice(0, i.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const m = a[f];
      return S && !m ? (u[h] = void 0) : (u[h] = z0(m || "", h)), u;
    }, {}),
    pathname: i,
    pathnameBase: l,
    pattern: e,
  };
}
function O0(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    nr(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' +
          e.replace(/\*$/, "/*") +
          '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' +
          e.replace(/\*$/, "/*") +
          '".'),
    );
  let r = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:(\w+)(\?)?/g,
          (l, a, s) => (
            r.push({ paramName: a, isOptional: s != null }),
            s ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (o +=
          e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (o += "\\/*$")
        : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, t ? void 0 : "i"), r]
  );
}
function D0(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      nr(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function z0(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      nr(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ")."),
      ),
      e
    );
  }
}
function Dn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function F0(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: o = "",
  } = typeof e == "string" ? dn(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : I0(n, t)) : t,
    search: $0(r),
    hash: U0(o),
  };
}
function I0(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function is(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." +
      n +
      "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function sm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Sc(e) {
  return sm(e).map((t, n) =>
    n === e.length - 1 ? t.pathname : t.pathnameBase,
  );
}
function xc(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == "string"
    ? (o = dn(e))
    : ((o = Ee({}, e)),
      X(
        !o.pathname || !o.pathname.includes("?"),
        is("?", "pathname", "search", o),
      ),
      X(
        !o.pathname || !o.pathname.includes("#"),
        is("#", "pathname", "hash", o),
      ),
      X(
        !o.search || !o.search.includes("#"),
        is("#", "search", "hash", o),
      ));
  let i = e === "" || o.pathname === "",
    l = i ? "/" : o.pathname,
    a;
  if (l == null) a = n;
  else if (r) {
    let f = t[t.length - 1].replace(/^\//, "").split("/");
    if (l.startsWith("..")) {
      let h = l.split("/");
      for (; h[0] === ".."; ) h.shift(), f.pop();
      o.pathname = h.join("/");
    }
    a = "/" + f.join("/");
  } else {
    let f = t.length - 1;
    if (l.startsWith("..")) {
      let h = l.split("/");
      for (; h[0] === ".."; ) h.shift(), (f -= 1);
      o.pathname = h.join("/");
    }
    a = f >= 0 ? t[f] : "/";
  }
  let s = F0(o, a),
    u = l && l !== "/" && l.endsWith("/"),
    c = (i || l === ".") && n.endsWith("/");
  return (
    !s.pathname.endsWith("/") && (u || c) && (s.pathname += "/"), s
  );
}
const nn = (e) => e.join("/").replace(/\/\/+/g, "/"),
  A0 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  $0 = (e) =>
    !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e,
  U0 = (e) =>
    !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class Cc {
  constructor(t, n, r, o) {
    o === void 0 && (o = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = o),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function um(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const cm = ["post", "put", "patch", "delete"],
  b0 = new Set(cm),
  B0 = ["get", ...cm],
  V0 = new Set(B0),
  H0 = new Set([301, 302, 303, 307, 308]),
  W0 = new Set([307, 308]),
  ls = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  K0 = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  ho = {
    state: "unblocked",
    proceed: void 0,
    reset: void 0,
    location: void 0,
  },
  dm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  G0 = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  fm = "remix-router-transitions";
function Q0(e) {
  const t = e.window
      ? e.window
      : typeof window < "u"
        ? window
        : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  X(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter",
  );
  let o;
  if (e.mapRouteProperties) o = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let E = e.detectErrorBoundary;
    o = (N) => ({ hasErrorBoundary: E(N) });
  } else o = G0;
  let i = {},
    l = au(e.routes, o, void 0, i),
    a,
    s = e.basename || "/",
    u = Ee(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_prependBasename: !1,
      },
      e.future,
    ),
    c = null,
    f = new Set(),
    h = null,
    S = null,
    m = null,
    x = e.hydrationData != null,
    k = Lr(l, e.history.location, s),
    g = null;
  if (k == null) {
    let E = wt(404, { pathname: e.history.location.pathname }),
      { matches: N, route: M } = uf(l);
    (k = N), (g = { [M.id]: E });
  }
  let d =
      !k.some((E) => E.route.lazy) &&
      (!k.some((E) => E.route.loader) || e.hydrationData != null),
    w,
    v = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: k,
      initialized: d,
      navigation: ls,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData:
        (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData:
        (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || g,
      fetchers: new Map(),
      blockers: new Map(),
    },
    P = ke.Pop,
    R = !1,
    T,
    L = !1,
    z = new Map(),
    F = null,
    Y = !1,
    ue = !1,
    je = [],
    vt = [],
    re = new Map(),
    jt = 0,
    tt = -1,
    A = new Map(),
    V = new Set(),
    H = new Map(),
    C = new Map(),
    j = new Set(),
    _ = new Map(),
    D = new Map(),
    b = !1;
  function K() {
    if (
      ((c = e.history.listen((E) => {
        let { action: N, location: M, delta: I } = E;
        if (b) {
          b = !1;
          return;
        }
        nr(
          D.size === 0 || I != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let U = mi({
          currentLocation: v.location,
          nextLocation: M,
          historyAction: N,
        });
        if (U && I != null) {
          (b = !0),
            e.history.go(I * -1),
            mr(U, {
              state: "blocked",
              location: M,
              proceed() {
                mr(U, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: M,
                }),
                  e.history.go(I);
              },
              reset() {
                let J = new Map(v.blockers);
                J.set(U, ho), ce({ blockers: J });
              },
            });
          return;
        }
        return Re(N, M);
      })),
      n)
    ) {
      i1(t, z);
      let E = () => l1(t, z);
      t.addEventListener("pagehide", E),
        (F = () => t.removeEventListener("pagehide", E));
    }
    return v.initialized || Re(ke.Pop, v.location), w;
  }
  function Q() {
    c && c(),
      F && F(),
      f.clear(),
      T && T.abort(),
      v.fetchers.forEach((E, N) => dr(N)),
      v.blockers.forEach((E, N) => hi(N));
  }
  function q(E) {
    return f.add(E), () => f.delete(E);
  }
  function ce(E, N) {
    N === void 0 && (N = {}), (v = Ee({}, v, E));
    let M = [],
      I = [];
    u.v7_fetcherPersist &&
      v.fetchers.forEach((U, J) => {
        U.state === "idle" && (j.has(J) ? I.push(J) : M.push(J));
      }),
      [...f].forEach((U) =>
        U(v, {
          deletedFetchers: I,
          unstable_viewTransitionOpts: N.viewTransitionOpts,
          unstable_flushSync: N.flushSync === !0,
        }),
      ),
      u.v7_fetcherPersist &&
        (M.forEach((U) => v.fetchers.delete(U)),
        I.forEach((U) => dr(U)));
  }
  function Ie(E, N, M) {
    var I, U;
    let { flushSync: J } = M === void 0 ? {} : M,
      G =
        v.actionData != null &&
        v.navigation.formMethod != null &&
        Dt(v.navigation.formMethod) &&
        v.navigation.state === "loading" &&
        ((I = E.state) == null ? void 0 : I._isRedirect) !== !0,
      W;
    N.actionData
      ? Object.keys(N.actionData).length > 0
        ? (W = N.actionData)
        : (W = null)
      : G
        ? (W = v.actionData)
        : (W = null);
    let B = N.loaderData
        ? sf(v.loaderData, N.loaderData, N.matches || [], N.errors)
        : v.loaderData,
      te = v.blockers;
    te.size > 0 &&
      ((te = new Map(te)), te.forEach((de, ye) => te.set(ye, ho)));
    let $e =
      R === !0 ||
      (v.navigation.formMethod != null &&
        Dt(v.navigation.formMethod) &&
        ((U = E.state) == null ? void 0 : U._isRedirect) !== !0);
    a && ((l = a), (a = void 0)),
      Y ||
        P === ke.Pop ||
        (P === ke.Push
          ? e.history.push(E, E.state)
          : P === ke.Replace && e.history.replace(E, E.state));
    let Z;
    if (P === ke.Pop) {
      let de = z.get(v.location.pathname);
      de && de.has(E.pathname)
        ? (Z = { currentLocation: v.location, nextLocation: E })
        : z.has(E.pathname) &&
          (Z = { currentLocation: E, nextLocation: v.location });
    } else if (L) {
      let de = z.get(v.location.pathname);
      de
        ? de.add(E.pathname)
        : ((de = new Set([E.pathname])),
          z.set(v.location.pathname, de)),
        (Z = { currentLocation: v.location, nextLocation: E });
    }
    ce(
      Ee({}, N, {
        actionData: W,
        loaderData: B,
        historyAction: P,
        location: E,
        initialized: !0,
        navigation: ls,
        revalidation: "idle",
        restoreScrollPosition: Ac(E, N.matches || v.matches),
        preventScrollReset: $e,
        blockers: te,
      }),
      { viewTransitionOpts: Z, flushSync: J === !0 },
    ),
      (P = ke.Pop),
      (R = !1),
      (L = !1),
      (Y = !1),
      (ue = !1),
      (je = []),
      (vt = []);
  }
  async function He(E, N) {
    if (typeof E == "number") {
      e.history.go(E);
      return;
    }
    let M = uu(
        v.location,
        v.matches,
        s,
        u.v7_prependBasename,
        E,
        N == null ? void 0 : N.fromRouteId,
        N == null ? void 0 : N.relative,
      ),
      {
        path: I,
        submission: U,
        error: J,
      } = tf(u.v7_normalizeFormMethod, !1, M, N),
      G = v.location,
      W = ei(v.location, I, N && N.state);
    W = Ee({}, W, e.history.encodeLocation(W));
    let B = N && N.replace != null ? N.replace : void 0,
      te = ke.Push;
    B === !0
      ? (te = ke.Replace)
      : B === !1 ||
        (U != null &&
          Dt(U.formMethod) &&
          U.formAction === v.location.pathname + v.location.search &&
          (te = ke.Replace));
    let $e =
        N && "preventScrollReset" in N
          ? N.preventScrollReset === !0
          : void 0,
      Z = (N && N.unstable_flushSync) === !0,
      de = mi({
        currentLocation: G,
        nextLocation: W,
        historyAction: te,
      });
    if (de) {
      mr(de, {
        state: "blocked",
        location: W,
        proceed() {
          mr(de, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: W,
          }),
            He(E, N);
        },
        reset() {
          let ye = new Map(v.blockers);
          ye.set(de, ho), ce({ blockers: ye });
        },
      });
      return;
    }
    return await Re(te, W, {
      submission: U,
      pendingError: J,
      preventScrollReset: $e,
      replace: N && N.replace,
      enableViewTransition: N && N.unstable_viewTransition,
      flushSync: Z,
    });
  }
  function Ae() {
    if (
      (An(),
      ce({ revalidation: "loading" }),
      v.navigation.state !== "submitting")
    ) {
      if (v.navigation.state === "idle") {
        Re(v.historyAction, v.location, {
          startUninterruptedRevalidation: !0,
        });
        return;
      }
      Re(P || v.historyAction, v.navigation.location, {
        overrideNavigation: v.navigation,
      });
    }
  }
  async function Re(E, N, M) {
    T && T.abort(),
      (T = null),
      (P = E),
      (Y = (M && M.startUninterruptedRevalidation) === !0),
      Xm(v.location, v.matches),
      (R = (M && M.preventScrollReset) === !0),
      (L = (M && M.enableViewTransition) === !0);
    let I = a || l,
      U = M && M.overrideNavigation,
      J = Lr(I, N, s),
      G = (M && M.flushSync) === !0;
    if (!J) {
      let ye = wt(404, { pathname: N.pathname }),
        { matches: Ye, route: bt } = uf(I);
      no(),
        Ie(
          N,
          { matches: Ye, loaderData: {}, errors: { [bt.id]: ye } },
          { flushSync: G },
        );
      return;
    }
    if (
      v.initialized &&
      !ue &&
      q0(v.location, N) &&
      !(M && M.submission && Dt(M.submission.formMethod))
    ) {
      Ie(N, { matches: J }, { flushSync: G });
      return;
    }
    T = new AbortController();
    let W = go(e.history, N, T.signal, M && M.submission),
      B,
      te;
    if (M && M.pendingError)
      te = { [Oo(J).route.id]: M.pendingError };
    else if (M && M.submission && Dt(M.submission.formMethod)) {
      let ye = await ae(W, N, M.submission, J, {
        replace: M.replace,
        flushSync: G,
      });
      if (ye.shortCircuited) return;
      (B = ye.pendingActionData),
        (te = ye.pendingActionError),
        (U = as(N, M.submission)),
        (G = !1),
        (W = new Request(W.url, { signal: W.signal }));
    }
    let {
      shortCircuited: $e,
      loaderData: Z,
      errors: de,
    } = await Yt(
      W,
      N,
      J,
      U,
      M && M.submission,
      M && M.fetcherSubmission,
      M && M.replace,
      G,
      B,
      te,
    );
    $e ||
      ((T = null),
      Ie(
        N,
        Ee({ matches: J }, B ? { actionData: B } : {}, {
          loaderData: Z,
          errors: de,
        }),
      ));
  }
  async function ae(E, N, M, I, U) {
    U === void 0 && (U = {}), An();
    let J = r1(N, M);
    ce({ navigation: J }, { flushSync: U.flushSync === !0 });
    let G,
      W = du(I, N);
    if (!W.route.action && !W.route.lazy)
      G = {
        type: _e.error,
        error: wt(405, {
          method: E.method,
          pathname: N.pathname,
          routeId: W.route.id,
        }),
      };
    else if (
      ((G = await mo("action", E, W, I, i, o, s)), E.signal.aborted)
    )
      return { shortCircuited: !0 };
    if ($r(G)) {
      let B;
      return (
        U && U.replace != null
          ? (B = U.replace)
          : (B =
              G.location === v.location.pathname + v.location.search),
        await Tt(v, G, { submission: M, replace: B }),
        { shortCircuited: !0 }
      );
    }
    if (Do(G)) {
      let B = Oo(I, W.route.id);
      return (
        (U && U.replace) !== !0 && (P = ke.Push),
        {
          pendingActionData: {},
          pendingActionError: { [B.route.id]: G.error },
        }
      );
    }
    if (Gn(G)) throw wt(400, { type: "defer-action" });
    return { pendingActionData: { [W.route.id]: G.data } };
  }
  async function Yt(E, N, M, I, U, J, G, W, B, te) {
    let $e = I || as(N, U),
      Z = U || J || ff($e),
      de = a || l,
      [ye, Ye] = nf(
        e.history,
        v,
        M,
        Z,
        N,
        ue,
        je,
        vt,
        j,
        H,
        V,
        de,
        s,
        B,
        te,
      );
    if (
      (no(
        (fe) =>
          !(M && M.some((yt) => yt.route.id === fe)) ||
          (ye && ye.some((yt) => yt.route.id === fe)),
      ),
      (tt = ++jt),
      ye.length === 0 && Ye.length === 0)
    ) {
      let fe = pr();
      return (
        Ie(
          N,
          Ee(
            { matches: M, loaderData: {}, errors: te || null },
            B ? { actionData: B } : {},
            fe ? { fetchers: new Map(v.fetchers) } : {},
          ),
          { flushSync: W },
        ),
        { shortCircuited: !0 }
      );
    }
    if (!Y) {
      Ye.forEach((yt) => {
        let Ne = v.fetchers.get(yt.key),
          Un = vo(void 0, Ne ? Ne.data : void 0);
        v.fetchers.set(yt.key, Un);
      });
      let fe = B || v.actionData;
      ce(
        Ee(
          { navigation: $e },
          fe
            ? Object.keys(fe).length === 0
              ? { actionData: null }
              : { actionData: fe }
            : {},
          Ye.length > 0 ? { fetchers: new Map(v.fetchers) } : {},
        ),
        { flushSync: W },
      );
    }
    Ye.forEach((fe) => {
      re.has(fe.key) && nt(fe.key),
        fe.controller && re.set(fe.key, fe.controller);
    });
    let bt = () => Ye.forEach((fe) => nt(fe.key));
    T && T.signal.addEventListener("abort", bt);
    let {
      results: ro,
      loaderResults: ja,
      fetcherResults: gr,
    } = await Ut(v.matches, M, ye, Ye, E);
    if (E.signal.aborted) return { shortCircuited: !0 };
    T && T.signal.removeEventListener("abort", bt),
      Ye.forEach((fe) => re.delete(fe.key));
    let Rt = cf(ro);
    if (Rt) {
      if (Rt.idx >= ye.length) {
        let fe = Ye[Rt.idx - ye.length].key;
        V.add(fe);
      }
      return (
        await Tt(v, Rt.result, { replace: G }), { shortCircuited: !0 }
      );
    }
    let { loaderData: gi, errors: Na } = af(
      v,
      M,
      ye,
      ja,
      te,
      Ye,
      gr,
      _,
    );
    _.forEach((fe, yt) => {
      fe.subscribe((Ne) => {
        (Ne || fe.done) && _.delete(yt);
      });
    });
    let Ta = pr(),
      Ra = hr(tt),
      vr = Ta || Ra || Ye.length > 0;
    return Ee(
      { loaderData: gi, errors: Na },
      vr ? { fetchers: new Map(v.fetchers) } : {},
    );
  }
  function Nt(E, N, M, I) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.",
      );
    re.has(E) && nt(E);
    let U = (I && I.unstable_flushSync) === !0,
      J = a || l,
      G = uu(
        v.location,
        v.matches,
        s,
        u.v7_prependBasename,
        M,
        N,
        I == null ? void 0 : I.relative,
      ),
      W = Lr(J, G, s);
    if (!W) {
      hn(E, N, wt(404, { pathname: G }), { flushSync: U });
      return;
    }
    let {
      path: B,
      submission: te,
      error: $e,
    } = tf(u.v7_normalizeFormMethod, !0, G, I);
    if ($e) {
      hn(E, N, $e, { flushSync: U });
      return;
    }
    let Z = du(W, B);
    if (
      ((R = (I && I.preventScrollReset) === !0),
      te && Dt(te.formMethod))
    ) {
      ve(E, N, B, Z, W, U, te);
      return;
    }
    H.set(E, { routeId: N, path: B }), pn(E, N, B, Z, W, U, te);
  }
  async function ve(E, N, M, I, U, J, G) {
    if ((An(), H.delete(E), !I.route.action && !I.route.lazy)) {
      let Ne = wt(405, {
        method: G.formMethod,
        pathname: M,
        routeId: N,
      });
      hn(E, N, Ne, { flushSync: J });
      return;
    }
    let W = v.fetchers.get(E);
    Le(E, o1(G, W), { flushSync: J });
    let B = new AbortController(),
      te = go(e.history, M, B.signal, G);
    re.set(E, B);
    let $e = jt,
      Z = await mo("action", te, I, U, i, o, s);
    if (te.signal.aborted) {
      re.get(E) === B && re.delete(E);
      return;
    }
    if (j.has(E)) {
      Le(E, gn(void 0));
      return;
    }
    if ($r(Z))
      if ((re.delete(E), tt > $e)) {
        Le(E, gn(void 0));
        return;
      } else
        return (
          V.add(E), Le(E, vo(G)), Tt(v, Z, { fetcherSubmission: G })
        );
    if (Do(Z)) {
      hn(E, N, Z.error);
      return;
    }
    if (Gn(Z)) throw wt(400, { type: "defer-action" });
    let de = v.navigation.location || v.location,
      ye = go(e.history, de, B.signal),
      Ye = a || l,
      bt =
        v.navigation.state !== "idle"
          ? Lr(Ye, v.navigation.location, s)
          : v.matches;
    X(bt, "Didn't find any matches after fetcher action");
    let ro = ++jt;
    A.set(E, ro);
    let ja = vo(G, Z.data);
    v.fetchers.set(E, ja);
    let [gr, Rt] = nf(
      e.history,
      v,
      bt,
      G,
      de,
      ue,
      je,
      vt,
      j,
      H,
      V,
      Ye,
      s,
      { [I.route.id]: Z.data },
      void 0,
    );
    Rt.filter((Ne) => Ne.key !== E).forEach((Ne) => {
      let Un = Ne.key,
        $c = v.fetchers.get(Un),
        Zm = vo(void 0, $c ? $c.data : void 0);
      v.fetchers.set(Un, Zm),
        re.has(Un) && nt(Un),
        Ne.controller && re.set(Un, Ne.controller);
    }),
      ce({ fetchers: new Map(v.fetchers) });
    let gi = () => Rt.forEach((Ne) => nt(Ne.key));
    B.signal.addEventListener("abort", gi);
    let {
      results: Na,
      loaderResults: Ta,
      fetcherResults: Ra,
    } = await Ut(v.matches, bt, gr, Rt, ye);
    if (B.signal.aborted) return;
    B.signal.removeEventListener("abort", gi),
      A.delete(E),
      re.delete(E),
      Rt.forEach((Ne) => re.delete(Ne.key));
    let vr = cf(Na);
    if (vr) {
      if (vr.idx >= gr.length) {
        let Ne = Rt[vr.idx - gr.length].key;
        V.add(Ne);
      }
      return Tt(v, vr.result);
    }
    let { loaderData: fe, errors: yt } = af(
      v,
      v.matches,
      gr,
      Ta,
      void 0,
      Rt,
      Ra,
      _,
    );
    if (v.fetchers.has(E)) {
      let Ne = gn(Z.data);
      v.fetchers.set(E, Ne);
    }
    hr(ro),
      v.navigation.state === "loading" && ro > tt
        ? (X(P, "Expected pending action"),
          T && T.abort(),
          Ie(v.navigation.location, {
            matches: bt,
            loaderData: fe,
            errors: yt,
            fetchers: new Map(v.fetchers),
          }))
        : (ce({
            errors: yt,
            loaderData: sf(v.loaderData, fe, bt, yt),
            fetchers: new Map(v.fetchers),
          }),
          (ue = !1));
  }
  async function pn(E, N, M, I, U, J, G) {
    let W = v.fetchers.get(E);
    Le(E, vo(G, W ? W.data : void 0), { flushSync: J });
    let B = new AbortController(),
      te = go(e.history, M, B.signal);
    re.set(E, B);
    let $e = jt,
      Z = await mo("loader", te, I, U, i, o, s);
    if (
      (Gn(Z) && (Z = (await mm(Z, te.signal, !0)) || Z),
      re.get(E) === B && re.delete(E),
      !te.signal.aborted)
    ) {
      if (j.has(E)) {
        Le(E, gn(void 0));
        return;
      }
      if ($r(Z))
        if (tt > $e) {
          Le(E, gn(void 0));
          return;
        } else {
          V.add(E), await Tt(v, Z);
          return;
        }
      if (Do(Z)) {
        hn(E, N, Z.error);
        return;
      }
      X(!Gn(Z), "Unhandled fetcher deferred data"), Le(E, gn(Z.data));
    }
  }
  async function Tt(E, N, M) {
    let {
      submission: I,
      fetcherSubmission: U,
      replace: J,
    } = M === void 0 ? {} : M;
    N.revalidate && (ue = !0);
    let G = ei(E.location, N.location, { _isRedirect: !0 });
    if ((X(G, "Expected a location on the redirect navigation"), n)) {
      let de = !1;
      if (N.reloadDocument) de = !0;
      else if (dm.test(N.location)) {
        const ye = e.history.createURL(N.location);
        de =
          ye.origin !== t.location.origin ||
          Dn(ye.pathname, s) == null;
      }
      if (de) {
        J
          ? t.location.replace(N.location)
          : t.location.assign(N.location);
        return;
      }
    }
    T = null;
    let W = J === !0 ? ke.Replace : ke.Push,
      {
        formMethod: B,
        formAction: te,
        formEncType: $e,
      } = E.navigation;
    !I && !U && B && te && $e && (I = ff(E.navigation));
    let Z = I || U;
    if (W0.has(N.status) && Z && Dt(Z.formMethod))
      await Re(W, G, {
        submission: Ee({}, Z, { formAction: N.location }),
        preventScrollReset: R,
      });
    else {
      let de = as(G, I);
      await Re(W, G, {
        overrideNavigation: de,
        fetcherSubmission: U,
        preventScrollReset: R,
      });
    }
  }
  async function Ut(E, N, M, I, U) {
    let J = await Promise.all([
        ...M.map((B) => mo("loader", U, B, N, i, o, s)),
        ...I.map((B) =>
          B.matches && B.match && B.controller
            ? mo(
                "loader",
                go(e.history, B.path, B.controller.signal),
                B.match,
                B.matches,
                i,
                o,
                s,
              )
            : {
                type: _e.error,
                error: wt(404, { pathname: B.path }),
              },
        ),
      ]),
      G = J.slice(0, M.length),
      W = J.slice(M.length);
    return (
      await Promise.all([
        df(
          E,
          M,
          G,
          G.map(() => U.signal),
          !1,
          v.loaderData,
        ),
        df(
          E,
          I.map((B) => B.match),
          W,
          I.map((B) => (B.controller ? B.controller.signal : null)),
          !0,
        ),
      ]),
      { results: J, loaderResults: G, fetcherResults: W }
    );
  }
  function An() {
    (ue = !0),
      je.push(...no()),
      H.forEach((E, N) => {
        re.has(N) && (vt.push(N), nt(N));
      });
  }
  function Le(E, N, M) {
    M === void 0 && (M = {}),
      v.fetchers.set(E, N),
      ce(
        { fetchers: new Map(v.fetchers) },
        { flushSync: (M && M.flushSync) === !0 },
      );
  }
  function hn(E, N, M, I) {
    I === void 0 && (I = {});
    let U = Oo(v.matches, N);
    dr(E),
      ce(
        {
          errors: { [U.route.id]: M },
          fetchers: new Map(v.fetchers),
        },
        { flushSync: (I && I.flushSync) === !0 },
      );
  }
  function pi(E) {
    return (
      u.v7_fetcherPersist &&
        (C.set(E, (C.get(E) || 0) + 1), j.has(E) && j.delete(E)),
      v.fetchers.get(E) || K0
    );
  }
  function dr(E) {
    let N = v.fetchers.get(E);
    re.has(E) && !(N && N.state === "loading" && A.has(E)) && nt(E),
      H.delete(E),
      A.delete(E),
      V.delete(E),
      j.delete(E),
      v.fetchers.delete(E);
  }
  function $n(E) {
    if (u.v7_fetcherPersist) {
      let N = (C.get(E) || 0) - 1;
      N <= 0 ? (C.delete(E), j.add(E)) : C.set(E, N);
    } else dr(E);
    ce({ fetchers: new Map(v.fetchers) });
  }
  function nt(E) {
    let N = re.get(E);
    X(N, "Expected fetch controller: " + E), N.abort(), re.delete(E);
  }
  function fr(E) {
    for (let N of E) {
      let M = pi(N),
        I = gn(M.data);
      v.fetchers.set(N, I);
    }
  }
  function pr() {
    let E = [],
      N = !1;
    for (let M of V) {
      let I = v.fetchers.get(M);
      X(I, "Expected fetcher: " + M),
        I.state === "loading" && (V.delete(M), E.push(M), (N = !0));
    }
    return fr(E), N;
  }
  function hr(E) {
    let N = [];
    for (let [M, I] of A)
      if (I < E) {
        let U = v.fetchers.get(M);
        X(U, "Expected fetcher: " + M),
          U.state === "loading" && (nt(M), A.delete(M), N.push(M));
      }
    return fr(N), N.length > 0;
  }
  function to(E, N) {
    let M = v.blockers.get(E) || ho;
    return D.get(E) !== N && D.set(E, N), M;
  }
  function hi(E) {
    v.blockers.delete(E), D.delete(E);
  }
  function mr(E, N) {
    let M = v.blockers.get(E) || ho;
    X(
      (M.state === "unblocked" && N.state === "blocked") ||
        (M.state === "blocked" && N.state === "blocked") ||
        (M.state === "blocked" && N.state === "proceeding") ||
        (M.state === "blocked" && N.state === "unblocked") ||
        (M.state === "proceeding" && N.state === "unblocked"),
      "Invalid blocker state transition: " +
        M.state +
        " -> " +
        N.state,
    );
    let I = new Map(v.blockers);
    I.set(E, N), ce({ blockers: I });
  }
  function mi(E) {
    let { currentLocation: N, nextLocation: M, historyAction: I } = E;
    if (D.size === 0) return;
    D.size > 1 &&
      nr(!1, "A router only supports one blocker at a time");
    let U = Array.from(D.entries()),
      [J, G] = U[U.length - 1],
      W = v.blockers.get(J);
    if (
      !(W && W.state === "proceeding") &&
      G({ currentLocation: N, nextLocation: M, historyAction: I })
    )
      return J;
  }
  function no(E) {
    let N = [];
    return (
      _.forEach((M, I) => {
        (!E || E(I)) && (M.cancel(), N.push(I), _.delete(I));
      }),
      N
    );
  }
  function Pa(E, N, M) {
    if (
      ((h = E), (m = N), (S = M || null), !x && v.navigation === ls)
    ) {
      x = !0;
      let I = Ac(v.location, v.matches);
      I != null && ce({ restoreScrollPosition: I });
    }
    return () => {
      (h = null), (m = null), (S = null);
    };
  }
  function Ic(E, N) {
    return (
      (S &&
        S(
          E,
          N.map((I) => C0(I, v.loaderData)),
        )) ||
      E.key
    );
  }
  function Xm(E, N) {
    if (h && m) {
      let M = Ic(E, N);
      h[M] = m();
    }
  }
  function Ac(E, N) {
    if (h) {
      let M = Ic(E, N),
        I = h[M];
      if (typeof I == "number") return I;
    }
    return null;
  }
  function Jm(E) {
    (i = {}), (a = au(E, o, void 0, i));
  }
  return (
    (w = {
      get basename() {
        return s;
      },
      get state() {
        return v;
      },
      get routes() {
        return l;
      },
      get window() {
        return t;
      },
      initialize: K,
      subscribe: q,
      enableScrollRestoration: Pa,
      navigate: He,
      fetch: Nt,
      revalidate: Ae,
      createHref: (E) => e.history.createHref(E),
      encodeLocation: (E) => e.history.encodeLocation(E),
      getFetcher: pi,
      deleteFetcher: $n,
      dispose: Q,
      getBlocker: to,
      deleteBlocker: hi,
      _internalFetchControllers: re,
      _internalActiveDeferreds: _,
      _internalSetRoutes: Jm,
    }),
    w
  );
}
function Y0(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function uu(e, t, n, r, o, i, l) {
  let a, s;
  if (i) {
    a = [];
    for (let c of t)
      if ((a.push(c), c.route.id === i)) {
        s = c;
        break;
      }
  } else (a = t), (s = t[t.length - 1]);
  let u = xc(
    o || ".",
    Sc(a),
    Dn(e.pathname, n) || e.pathname,
    l === "path",
  );
  return (
    o == null && ((u.search = e.search), (u.hash = e.hash)),
    (o == null || o === "" || o === ".") &&
      s &&
      s.route.index &&
      !Ec(u.search) &&
      (u.search = u.search
        ? u.search.replace(/^\?/, "?index&")
        : "?index"),
    r &&
      n !== "/" &&
      (u.pathname = u.pathname === "/" ? n : nn([n, u.pathname])),
    rr(u)
  );
}
function tf(e, t, n, r) {
  if (!r || !Y0(r)) return { path: n };
  if (r.formMethod && !n1(r.formMethod))
    return { path: n, error: wt(405, { method: r.formMethod }) };
  let o = () => ({
      path: n,
      error: wt(400, { type: "invalid-body" }),
    }),
    i = r.formMethod || "get",
    l = e ? i.toUpperCase() : i.toLowerCase(),
    a = hm(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!Dt(l)) return o();
      let h =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData ||
              r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce((S, m) => {
                let [x, k] = m;
                return (
                  "" +
                  S +
                  x +
                  "=" +
                  k +
                  `
`
                );
              }, "")
            : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: l,
          formAction: a,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: h,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!Dt(l)) return o();
      try {
        let h =
          typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: l,
            formAction: a,
            formEncType: r.formEncType,
            formData: void 0,
            json: h,
            text: void 0,
          },
        };
      } catch {
        return o();
      }
    }
  }
  X(
    typeof FormData == "function",
    "FormData is not available in this environment",
  );
  let s, u;
  if (r.formData) (s = cu(r.formData)), (u = r.formData);
  else if (r.body instanceof FormData) (s = cu(r.body)), (u = r.body);
  else if (r.body instanceof URLSearchParams)
    (s = r.body), (u = lf(s));
  else if (r.body == null)
    (s = new URLSearchParams()), (u = new FormData());
  else
    try {
      (s = new URLSearchParams(r.body)), (u = lf(s));
    } catch {
      return o();
    }
  let c = {
    formMethod: l,
    formAction: a,
    formEncType:
      (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: u,
    json: void 0,
    text: void 0,
  };
  if (Dt(c.formMethod)) return { path: n, submission: c };
  let f = dn(n);
  return (
    t && f.search && Ec(f.search) && s.append("index", ""),
    (f.search = "?" + s),
    { path: rr(f), submission: c }
  );
}
function X0(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((o) => o.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function nf(e, t, n, r, o, i, l, a, s, u, c, f, h, S, m) {
  let x = m ? Object.values(m)[0] : S ? Object.values(S)[0] : void 0,
    k = e.createURL(t.location),
    g = e.createURL(o),
    d = m ? Object.keys(m)[0] : void 0,
    v = X0(n, d).filter((R, T) => {
      if (R.route.lazy) return !0;
      if (R.route.loader == null) return !1;
      if (
        J0(t.loaderData, t.matches[T], R) ||
        l.some((F) => F === R.route.id)
      )
        return !0;
      let L = t.matches[T],
        z = R;
      return rf(
        R,
        Ee(
          {
            currentUrl: k,
            currentParams: L.params,
            nextUrl: g,
            nextParams: z.params,
          },
          r,
          {
            actionResult: x,
            defaultShouldRevalidate:
              i ||
              k.pathname + k.search === g.pathname + g.search ||
              k.search !== g.search ||
              pm(L, z),
          },
        ),
      );
    }),
    P = [];
  return (
    u.forEach((R, T) => {
      if (!n.some((ue) => ue.route.id === R.routeId) || s.has(T))
        return;
      let L = Lr(f, R.path, h);
      if (!L) {
        P.push({
          key: T,
          routeId: R.routeId,
          path: R.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let z = t.fetchers.get(T),
        F = du(L, R.path),
        Y = !1;
      c.has(T)
        ? (Y = !1)
        : a.includes(T)
          ? (Y = !0)
          : z && z.state !== "idle" && z.data === void 0
            ? (Y = i)
            : (Y = rf(
                F,
                Ee(
                  {
                    currentUrl: k,
                    currentParams:
                      t.matches[t.matches.length - 1].params,
                    nextUrl: g,
                    nextParams: n[n.length - 1].params,
                  },
                  r,
                  { actionResult: x, defaultShouldRevalidate: i },
                ),
              )),
        Y &&
          P.push({
            key: T,
            routeId: R.routeId,
            path: R.path,
            matches: L,
            match: F,
            controller: new AbortController(),
          });
    }),
    [v, P]
  );
}
function J0(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    o = e[n.route.id] === void 0;
  return r || o;
}
function pm(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function rf(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
async function of(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let o = n[e.id];
  X(o, "No route found in manifest");
  let i = {};
  for (let l in r) {
    let s = o[l] !== void 0 && l !== "hasErrorBoundary";
    nr(
      !s,
      'Route "' +
        o.id +
        '" has a static property "' +
        l +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + l + '" will be ignored.'),
    ),
      !s && !S0.has(l) && (i[l] = r[l]);
  }
  Object.assign(o, i),
    Object.assign(o, Ee({}, t(o), { lazy: void 0 }));
}
async function mo(e, t, n, r, o, i, l, a) {
  a === void 0 && (a = {});
  let s,
    u,
    c,
    f = (m) => {
      let x,
        k = new Promise((g, d) => (x = d));
      return (
        (c = () => x()),
        t.signal.addEventListener("abort", c),
        Promise.race([
          m({
            request: t,
            params: n.params,
            context: a.requestContext,
          }),
          k,
        ])
      );
    };
  try {
    let m = n.route[e];
    if (n.route.lazy)
      if (m) {
        let x,
          k = await Promise.all([
            f(m).catch((g) => {
              x = g;
            }),
            of(n.route, i, o),
          ]);
        if (x) throw x;
        u = k[0];
      } else if ((await of(n.route, i, o), (m = n.route[e]), m))
        u = await f(m);
      else if (e === "action") {
        let x = new URL(t.url),
          k = x.pathname + x.search;
        throw wt(405, {
          method: t.method,
          pathname: k,
          routeId: n.route.id,
        });
      } else return { type: _e.data, data: void 0 };
    else if (m) u = await f(m);
    else {
      let x = new URL(t.url),
        k = x.pathname + x.search;
      throw wt(404, { pathname: k });
    }
    X(
      u !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`.",
    );
  } catch (m) {
    (s = _e.error), (u = m);
  } finally {
    c && t.signal.removeEventListener("abort", c);
  }
  if (t1(u)) {
    let m = u.status;
    if (H0.has(m)) {
      let g = u.headers.get("Location");
      if (
        (X(
          g,
          "Redirects returned/thrown from loaders/actions must have a Location header",
        ),
        !dm.test(g))
      )
        g = uu(
          new URL(t.url),
          r.slice(0, r.indexOf(n) + 1),
          l,
          !0,
          g,
        );
      else if (!a.isStaticRequest) {
        let d = new URL(t.url),
          w = g.startsWith("//")
            ? new URL(d.protocol + g)
            : new URL(g),
          v = Dn(w.pathname, l) != null;
        w.origin === d.origin &&
          v &&
          (g = w.pathname + w.search + w.hash);
      }
      if (a.isStaticRequest) throw (u.headers.set("Location", g), u);
      return {
        type: _e.redirect,
        status: m,
        location: g,
        revalidate: u.headers.get("X-Remix-Revalidate") !== null,
        reloadDocument:
          u.headers.get("X-Remix-Reload-Document") !== null,
      };
    }
    if (a.isRouteRequest)
      throw {
        type: s === _e.error ? _e.error : _e.data,
        response: u,
      };
    let x,
      k = u.headers.get("Content-Type");
    return (
      k && /\bapplication\/json\b/.test(k)
        ? (x = await u.json())
        : (x = await u.text()),
      s === _e.error
        ? {
            type: s,
            error: new Cc(m, u.statusText, x),
            headers: u.headers,
          }
        : {
            type: _e.data,
            data: x,
            statusCode: u.status,
            headers: u.headers,
          }
    );
  }
  if (s === _e.error) return { type: s, error: u };
  if (e1(u)) {
    var h, S;
    return {
      type: _e.deferred,
      deferredData: u,
      statusCode: (h = u.init) == null ? void 0 : h.status,
      headers:
        ((S = u.init) == null ? void 0 : S.headers) &&
        new Headers(u.init.headers),
    };
  }
  return { type: _e.data, data: u };
}
function go(e, t, n, r) {
  let o = e.createURL(hm(t)).toString(),
    i = { signal: n };
  if (r && Dt(r.formMethod)) {
    let { formMethod: l, formEncType: a } = r;
    (i.method = l.toUpperCase()),
      a === "application/json"
        ? ((i.headers = new Headers({ "Content-Type": a })),
          (i.body = JSON.stringify(r.json)))
        : a === "text/plain"
          ? (i.body = r.text)
          : a === "application/x-www-form-urlencoded" && r.formData
            ? (i.body = cu(r.formData))
            : (i.body = r.formData);
  }
  return new Request(o, i);
}
function cu(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function lf(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function Z0(e, t, n, r, o) {
  let i = {},
    l = null,
    a,
    s = !1,
    u = {};
  return (
    n.forEach((c, f) => {
      let h = t[f].route.id;
      if (
        (X(
          !$r(c),
          "Cannot handle redirect results in processLoaderData",
        ),
        Do(c))
      ) {
        let S = Oo(e, h),
          m = c.error;
        r && ((m = Object.values(r)[0]), (r = void 0)),
          (l = l || {}),
          l[S.route.id] == null && (l[S.route.id] = m),
          (i[h] = void 0),
          s || ((s = !0), (a = um(c.error) ? c.error.status : 500)),
          c.headers && (u[h] = c.headers);
      } else
        Gn(c)
          ? (o.set(h, c.deferredData), (i[h] = c.deferredData.data))
          : (i[h] = c.data),
          c.statusCode != null &&
            c.statusCode !== 200 &&
            !s &&
            (a = c.statusCode),
          c.headers && (u[h] = c.headers);
    }),
    r && ((l = r), (i[Object.keys(r)[0]] = void 0)),
    {
      loaderData: i,
      errors: l,
      statusCode: a || 200,
      loaderHeaders: u,
    }
  );
}
function af(e, t, n, r, o, i, l, a) {
  let { loaderData: s, errors: u } = Z0(t, n, r, o, a);
  for (let c = 0; c < i.length; c++) {
    let { key: f, match: h, controller: S } = i[c];
    X(
      l !== void 0 && l[c] !== void 0,
      "Did not find corresponding fetcher result",
    );
    let m = l[c];
    if (!(S && S.signal.aborted))
      if (Do(m)) {
        let x = Oo(e.matches, h == null ? void 0 : h.route.id);
        (u && u[x.route.id]) ||
          (u = Ee({}, u, { [x.route.id]: m.error })),
          e.fetchers.delete(f);
      } else if ($r(m))
        X(!1, "Unhandled fetcher revalidation redirect");
      else if (Gn(m)) X(!1, "Unhandled fetcher deferred data");
      else {
        let x = gn(m.data);
        e.fetchers.set(f, x);
      }
  }
  return { loaderData: s, errors: u };
}
function sf(e, t, n, r) {
  let o = Ee({}, t);
  for (let i of n) {
    let l = i.route.id;
    if (
      (t.hasOwnProperty(l)
        ? t[l] !== void 0 && (o[l] = t[l])
        : e[l] !== void 0 && i.route.loader && (o[l] = e[l]),
      r && r.hasOwnProperty(l))
    )
      break;
  }
  return o;
}
function Oo(e, t) {
  return (
    (t
      ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1)
      : [...e]
    )
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function uf(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [
      { params: {}, pathname: "", pathnameBase: "", route: t },
    ],
    route: t,
  };
}
function wt(e, t) {
  let {
      pathname: n,
      routeId: r,
      method: o,
      type: i,
    } = t === void 0 ? {} : t,
    l = "Unknown Server Error",
    a = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((l = "Bad Request"),
        o && n && r
          ? (a =
              "You made a " +
              o +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : i === "defer-action"
            ? (a = "defer() is not supported in actions")
            : i === "invalid-body" &&
              (a = "Unable to encode submission body"))
      : e === 403
        ? ((l = "Forbidden"),
          (a = 'Route "' + r + '" does not match URL "' + n + '"'))
        : e === 404
          ? ((l = "Not Found"),
            (a = 'No route matches URL "' + n + '"'))
          : e === 405 &&
            ((l = "Method Not Allowed"),
            o && n && r
              ? (a =
                  "You made a " +
                  o.toUpperCase() +
                  ' request to "' +
                  n +
                  '" but ' +
                  ('did not provide an `action` for route "' +
                    r +
                    '", ') +
                  "so there is no way to handle the request.")
              : o &&
                (a =
                  'Invalid request method "' +
                  o.toUpperCase() +
                  '"')),
    new Cc(e || 500, l, new Error(a), !0)
  );
}
function cf(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if ($r(n)) return { result: n, idx: t };
  }
}
function hm(e) {
  let t = typeof e == "string" ? dn(e) : e;
  return rr(Ee({}, t, { hash: "" }));
}
function q0(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
      ? t.hash !== ""
      : e.hash === t.hash
        ? !0
        : t.hash !== "";
}
function Gn(e) {
  return e.type === _e.deferred;
}
function Do(e) {
  return e.type === _e.error;
}
function $r(e) {
  return (e && e.type) === _e.redirect;
}
function e1(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function t1(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function n1(e) {
  return V0.has(e.toLowerCase());
}
function Dt(e) {
  return b0.has(e.toLowerCase());
}
async function df(e, t, n, r, o, i) {
  for (let l = 0; l < n.length; l++) {
    let a = n[l],
      s = t[l];
    if (!s) continue;
    let u = e.find((f) => f.route.id === s.route.id),
      c = u != null && !pm(u, s) && (i && i[s.route.id]) !== void 0;
    if (Gn(a) && (o || c)) {
      let f = r[l];
      X(
        f,
        "Expected an AbortSignal for revalidating fetcher deferred result",
      ),
        await mm(a, f, o).then((h) => {
          h && (n[l] = h || n[l]);
        });
    }
  }
}
async function mm(e, t, n) {
  if (
    (n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))
  ) {
    if (n)
      try {
        return { type: _e.data, data: e.deferredData.unwrappedData };
      } catch (o) {
        return { type: _e.error, error: o };
      }
    return { type: _e.data, data: e.deferredData.data };
  }
}
function Ec(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function du(e, t) {
  let n = typeof t == "string" ? dn(t).search : t.search;
  if (e[e.length - 1].route.index && Ec(n || ""))
    return e[e.length - 1];
  let r = sm(e);
  return r[r.length - 1];
}
function ff(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: o,
    formData: i,
    json: l,
  } = e;
  if (!(!t || !n || !r)) {
    if (o != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: o,
      };
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: i,
        json: void 0,
        text: void 0,
      };
    if (l !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: l,
        text: void 0,
      };
  }
}
function as(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function r1(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function vo(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function o1(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function gn(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function i1(e, t) {
  try {
    let n = e.sessionStorage.getItem(fm);
    if (n) {
      let r = JSON.parse(n);
      for (let [o, i] of Object.entries(r || {}))
        i && Array.isArray(i) && t.set(o, new Set(i || []));
    }
  } catch {}
}
function l1(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, o] of t) n[r] = [...o];
    try {
      e.sessionStorage.setItem(fm, JSON.stringify(n));
    } catch (r) {
      nr(
        !1,
        "Failed to save applied view transitions in sessionStorage (" +
          r +
          ").",
      );
    }
  }
}
/**
 * React Router v6.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Cl() {
  return (
    (Cl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) &&
                (e[r] = n[r]);
          }
          return e;
        }),
    Cl.apply(this, arguments)
  );
}
const ui = y.createContext(null),
  kc = y.createContext(null),
  ur = y.createContext(null),
  ma = y.createContext(null),
  fn = y.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1,
  }),
  gm = y.createContext(null);
function a1(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  ci() || X(!1);
  let { basename: r, navigator: o } = y.useContext(ur),
    { hash: i, pathname: l, search: a } = ga(e, { relative: n }),
    s = l;
  return (
    r !== "/" && (s = l === "/" ? r : nn([r, l])),
    o.createHref({ pathname: s, search: a, hash: i })
  );
}
function ci() {
  return y.useContext(ma) != null;
}
function di() {
  return ci() || X(!1), y.useContext(ma).location;
}
function vm(e) {
  y.useContext(ur).static || y.useLayoutEffect(e);
}
function s1() {
  let { isDataRoute: e } = y.useContext(fn);
  return e ? E1() : u1();
}
function u1() {
  ci() || X(!1);
  let e = y.useContext(ui),
    { basename: t, navigator: n } = y.useContext(ur),
    { matches: r } = y.useContext(fn),
    { pathname: o } = di(),
    i = JSON.stringify(Sc(r)),
    l = y.useRef(!1);
  return (
    vm(() => {
      l.current = !0;
    }),
    y.useCallback(
      function (s, u) {
        if ((u === void 0 && (u = {}), !l.current)) return;
        if (typeof s == "number") {
          n.go(s);
          return;
        }
        let c = xc(s, JSON.parse(i), o, u.relative === "path");
        e == null &&
          t !== "/" &&
          (c.pathname = c.pathname === "/" ? t : nn([t, c.pathname])),
          (u.replace ? n.replace : n.push)(c, u.state, u);
      },
      [t, n, i, o, e],
    )
  );
}
const c1 = y.createContext(null);
function d1(e) {
  let t = y.useContext(fn).outlet;
  return t && y.createElement(c1.Provider, { value: e }, t);
}
function f1() {
  let { matches: e } = y.useContext(fn),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function ga(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { matches: r } = y.useContext(fn),
    { pathname: o } = di(),
    i = JSON.stringify(Sc(r));
  return y.useMemo(
    () => xc(e, JSON.parse(i), o, n === "path"),
    [e, i, o, n],
  );
}
function p1(e, t, n) {
  ci() || X(!1);
  let { navigator: r } = y.useContext(ur),
    { matches: o } = y.useContext(fn),
    i = o[o.length - 1],
    l = i ? i.params : {};
  i && i.pathname;
  let a = i ? i.pathnameBase : "/";
  i && i.route;
  let s = di(),
    u;
  if (t) {
    var c;
    let x = typeof t == "string" ? dn(t) : t;
    a === "/" ||
      ((c = x.pathname) != null && c.startsWith(a)) ||
      X(!1),
      (u = x);
  } else u = s;
  let f = u.pathname || "/",
    h = a === "/" ? f : f.slice(a.length) || "/",
    S = Lr(e, { pathname: h }),
    m = y1(
      S &&
        S.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, l, x.params),
            pathname: nn([
              a,
              r.encodeLocation
                ? r.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? a
                : nn([
                    a,
                    r.encodeLocation
                      ? r.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          }),
        ),
      o,
      n,
    );
  return t && m
    ? y.createElement(
        ma.Provider,
        {
          value: {
            location: Cl(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              u,
            ),
            navigationType: ke.Pop,
          },
        },
        m,
      )
    : m;
}
function h1() {
  let e = C1(),
    t = um(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = {
      padding: "0.5rem",
      backgroundColor: "rgba(200,200,200, 0.5)",
    },
    i = null;
  return y.createElement(
    y.Fragment,
    null,
    y.createElement("h2", null, "Unexpected Application Error!"),
    y.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? y.createElement("pre", { style: o }, n) : null,
    i,
  );
}
const m1 = y.createElement(h1, null);
class g1 extends y.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? {
          error: t.error,
          location: t.location,
          revalidation: t.revalidation,
        }
      : {
          error: t.error || n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error
      ? y.createElement(
          fn.Provider,
          { value: this.props.routeContext },
          y.createElement(gm.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function v1(e) {
  let { routeContext: t, match: n, children: r } = e,
    o = y.useContext(ui);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = n.route.id),
    y.createElement(fn.Provider, { value: t }, r)
  );
}
function y1(e, t, n) {
  var r;
  if (
    (t === void 0 && (t = []), n === void 0 && (n = null), e == null)
  ) {
    var o;
    if ((o = n) != null && o.errors) e = n.matches;
    else return null;
  }
  let i = e,
    l = (r = n) == null ? void 0 : r.errors;
  if (l != null) {
    let a = i.findIndex(
      (s) => s.route.id && (l == null ? void 0 : l[s.route.id]),
    );
    a >= 0 || X(!1), (i = i.slice(0, Math.min(i.length, a + 1)));
  }
  return i.reduceRight((a, s, u) => {
    let c = s.route.id ? (l == null ? void 0 : l[s.route.id]) : null,
      f = null;
    n && (f = s.route.errorElement || m1);
    let h = t.concat(i.slice(0, u + 1)),
      S = () => {
        let m;
        return (
          c
            ? (m = f)
            : s.route.Component
              ? (m = y.createElement(s.route.Component, null))
              : s.route.element
                ? (m = s.route.element)
                : (m = a),
          y.createElement(v1, {
            match: s,
            routeContext: {
              outlet: a,
              matches: h,
              isDataRoute: n != null,
            },
            children: m,
          })
        );
      };
    return n &&
      (s.route.ErrorBoundary || s.route.errorElement || u === 0)
      ? y.createElement(g1, {
          location: n.location,
          revalidation: n.revalidation,
          component: f,
          error: c,
          children: S(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
        })
      : S();
  }, null);
}
var ym = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(ym || {}),
  El = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(El || {});
function w1(e) {
  let t = y.useContext(ui);
  return t || X(!1), t;
}
function S1(e) {
  let t = y.useContext(kc);
  return t || X(!1), t;
}
function x1(e) {
  let t = y.useContext(fn);
  return t || X(!1), t;
}
function wm(e) {
  let t = x1(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || X(!1), n.route.id;
}
function C1() {
  var e;
  let t = y.useContext(gm),
    n = S1(El.UseRouteError),
    r = wm(El.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function E1() {
  let { router: e } = w1(ym.UseNavigateStable),
    t = wm(El.UseNavigateStable),
    n = y.useRef(!1);
  return (
    vm(() => {
      n.current = !0;
    }),
    y.useCallback(
      function (o, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : e.navigate(o, Cl({ fromRouteId: t }, i)));
      },
      [e, t],
    )
  );
}
function k1(e) {
  return d1(e.context);
}
function _1(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: o = ke.Pop,
    navigator: i,
    static: l = !1,
  } = e;
  ci() && X(!1);
  let a = t.replace(/^\/*/, "/"),
    s = y.useMemo(
      () => ({ basename: a, navigator: i, static: l }),
      [a, i, l],
    );
  typeof r == "string" && (r = dn(r));
  let {
      pathname: u = "/",
      search: c = "",
      hash: f = "",
      state: h = null,
      key: S = "default",
    } = r,
    m = y.useMemo(() => {
      let x = Dn(u, a);
      return x == null
        ? null
        : {
            location: {
              pathname: x,
              search: c,
              hash: f,
              state: h,
              key: S,
            },
            navigationType: o,
          };
    }, [a, u, c, f, h, S, o]);
  return m == null
    ? null
    : y.createElement(
        ur.Provider,
        { value: s },
        y.createElement(ma.Provider, { children: n, value: m }),
      );
}
new Promise(() => {});
function P1(e) {
  let t = {
    hasErrorBoundary:
      e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: y.createElement(e.Component),
        Component: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: y.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
/**
 * React Router DOM v6.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Qr() {
  return (
    (Qr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) &&
                (e[r] = n[r]);
          }
          return e;
        }),
    Qr.apply(this, arguments)
  );
}
function Sm(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function j1(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function N1(e, t) {
  return e.button === 0 && (!t || t === "_self") && !j1(e);
}
const T1 = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  R1 = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ];
function L1(e, t) {
  return Q0({
    basename: t == null ? void 0 : t.basename,
    future: Qr({}, t == null ? void 0 : t.future, {
      v7_prependBasename: !0,
    }),
    history: v0({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || M1(),
    routes: e,
    mapRouteProperties: P1,
    window: t == null ? void 0 : t.window,
  }).initialize();
}
function M1() {
  var e;
  let t =
    (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return (
    t && t.errors && (t = Qr({}, t, { errors: O1(t.errors) })), t
  );
}
function O1(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, o] of t)
    if (o && o.__type === "RouteErrorResponse")
      n[r] = new Cc(
        o.status,
        o.statusText,
        o.data,
        o.internal === !0,
      );
    else if (o && o.__type === "Error") {
      if (o.__subType) {
        let i = window[o.__subType];
        if (typeof i == "function")
          try {
            let l = new i(o.message);
            (l.stack = ""), (n[r] = l);
          } catch {}
      }
      if (n[r] == null) {
        let i = new Error(o.message);
        (i.stack = ""), (n[r] = i);
      }
    } else n[r] = o;
  return n;
}
const xm = y.createContext({ isTransitioning: !1 }),
  D1 = y.createContext(new Map()),
  z1 = "startTransition",
  pf = gg[z1],
  F1 = "flushSync",
  hf = Py[F1];
function I1(e) {
  pf ? pf(e) : e();
}
function yo(e) {
  hf ? hf(e) : e();
}
class A1 {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" &&
            ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" &&
              ((this.status = "rejected"), n(r));
          });
      }));
  }
}
function $1(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [o, i] = y.useState(n.state),
    [l, a] = y.useState(),
    [s, u] = y.useState({ isTransitioning: !1 }),
    [c, f] = y.useState(),
    [h, S] = y.useState(),
    [m, x] = y.useState(),
    k = y.useRef(new Map()),
    { v7_startTransition: g } = r || {},
    d = y.useCallback(
      (T) => {
        g ? I1(T) : T();
      },
      [g],
    ),
    w = y.useCallback(
      (T, L) => {
        let {
          deletedFetchers: z,
          unstable_flushSync: F,
          unstable_viewTransitionOpts: Y,
        } = L;
        z.forEach((je) => k.current.delete(je)),
          T.fetchers.forEach((je, vt) => {
            je.data !== void 0 && k.current.set(vt, je.data);
          });
        let ue =
          n.window == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!Y || ue) {
          F ? yo(() => i(T)) : d(() => i(T));
          return;
        }
        if (F) {
          yo(() => {
            h && (c && c.resolve(), h.skipTransition()),
              u({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: Y.currentLocation,
                nextLocation: Y.nextLocation,
              });
          });
          let je = n.window.document.startViewTransition(() => {
            yo(() => i(T));
          });
          je.finished.finally(() => {
            yo(() => {
              f(void 0),
                S(void 0),
                a(void 0),
                u({ isTransitioning: !1 });
            });
          }),
            yo(() => S(je));
          return;
        }
        h
          ? (c && c.resolve(),
            h.skipTransition(),
            x({
              state: T,
              currentLocation: Y.currentLocation,
              nextLocation: Y.nextLocation,
            }))
          : (a(T),
            u({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: Y.currentLocation,
              nextLocation: Y.nextLocation,
            }));
      },
      [n.window, h, c, k, d],
    );
  y.useLayoutEffect(() => n.subscribe(w), [n, w]),
    y.useEffect(() => {
      s.isTransitioning && !s.flushSync && f(new A1());
    }, [s]),
    y.useEffect(() => {
      if (c && l && n.window) {
        let T = l,
          L = c.promise,
          z = n.window.document.startViewTransition(async () => {
            d(() => i(T)), await L;
          });
        z.finished.finally(() => {
          f(void 0), S(void 0), a(void 0), u({ isTransitioning: !1 });
        }),
          S(z);
      }
    }, [d, l, c, n.window]),
    y.useEffect(() => {
      c && l && o.location.key === l.location.key && c.resolve();
    }, [c, h, o.location, l]),
    y.useEffect(() => {
      !s.isTransitioning &&
        m &&
        (a(m.state),
        u({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: m.currentLocation,
          nextLocation: m.nextLocation,
        }),
        x(void 0));
    }, [s.isTransitioning, m]);
  let v = y.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (T) => n.navigate(T),
        push: (T, L, z) =>
          n.navigate(T, {
            state: L,
            preventScrollReset:
              z == null ? void 0 : z.preventScrollReset,
          }),
        replace: (T, L, z) =>
          n.navigate(T, {
            replace: !0,
            state: L,
            preventScrollReset:
              z == null ? void 0 : z.preventScrollReset,
          }),
      }),
      [n],
    ),
    P = n.basename || "/",
    R = y.useMemo(
      () => ({ router: n, navigator: v, static: !1, basename: P }),
      [n, v, P],
    );
  return y.createElement(
    y.Fragment,
    null,
    y.createElement(
      ui.Provider,
      { value: R },
      y.createElement(
        kc.Provider,
        { value: o },
        y.createElement(
          D1.Provider,
          { value: k.current },
          y.createElement(
            xm.Provider,
            { value: s },
            y.createElement(
              _1,
              {
                basename: P,
                location: o.location,
                navigationType: o.historyAction,
                navigator: v,
              },
              o.initialized
                ? y.createElement(U1, { routes: n.routes, state: o })
                : t,
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
function U1(e) {
  let { routes: t, state: n } = e;
  return p1(t, void 0, n);
}
const b1 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  B1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  V1 = y.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: o,
        reloadDocument: i,
        replace: l,
        state: a,
        target: s,
        to: u,
        preventScrollReset: c,
        unstable_viewTransition: f,
      } = t,
      h = Sm(t, T1),
      { basename: S } = y.useContext(ur),
      m,
      x = !1;
    if (typeof u == "string" && B1.test(u) && ((m = u), b1))
      try {
        let w = new URL(window.location.href),
          v = u.startsWith("//")
            ? new URL(w.protocol + u)
            : new URL(u),
          P = Dn(v.pathname, S);
        v.origin === w.origin && P != null
          ? (u = P + v.search + v.hash)
          : (x = !0);
      } catch {}
    let k = a1(u, { relative: o }),
      g = W1(u, {
        replace: l,
        state: a,
        target: s,
        preventScrollReset: c,
        relative: o,
        unstable_viewTransition: f,
      });
    function d(w) {
      r && r(w), w.defaultPrevented || g(w);
    }
    return y.createElement(
      "a",
      Qr({}, h, {
        href: m || k,
        onClick: x || i ? r : d,
        ref: n,
        target: s,
      }),
    );
  }),
  Cm = y.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: o = !1,
        className: i = "",
        end: l = !1,
        style: a,
        to: s,
        unstable_viewTransition: u,
        children: c,
      } = t,
      f = Sm(t, R1),
      h = ga(s, { relative: f.relative }),
      S = di(),
      m = y.useContext(kc),
      { navigator: x } = y.useContext(ur),
      k = m != null && K1(h) && u === !0,
      g = x.encodeLocation
        ? x.encodeLocation(h).pathname
        : h.pathname,
      d = S.pathname,
      w =
        m && m.navigation && m.navigation.location
          ? m.navigation.location.pathname
          : null;
    o ||
      ((d = d.toLowerCase()),
      (w = w ? w.toLowerCase() : null),
      (g = g.toLowerCase()));
    const v = g !== "/" && g.endsWith("/") ? g.length - 1 : g.length;
    let P = d === g || (!l && d.startsWith(g) && d.charAt(v) === "/"),
      R =
        w != null &&
        (w === g ||
          (!l && w.startsWith(g) && w.charAt(g.length) === "/")),
      T = { isActive: P, isPending: R, isTransitioning: k },
      L = P ? r : void 0,
      z;
    typeof i == "function"
      ? (z = i(T))
      : (z = [
          i,
          P ? "active" : null,
          R ? "pending" : null,
          k ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let F = typeof a == "function" ? a(T) : a;
    return y.createElement(
      V1,
      Qr({}, f, {
        "aria-current": L,
        className: z,
        ref: n,
        style: F,
        to: s,
        unstable_viewTransition: u,
      }),
      typeof c == "function" ? c(T) : c,
    );
  });
var fu;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(fu || (fu = {}));
var mf;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(mf || (mf = {}));
function H1(e) {
  let t = y.useContext(ui);
  return t || X(!1), t;
}
function W1(e, t) {
  let {
      target: n,
      replace: r,
      state: o,
      preventScrollReset: i,
      relative: l,
      unstable_viewTransition: a,
    } = t === void 0 ? {} : t,
    s = s1(),
    u = di(),
    c = ga(e, { relative: l });
  return y.useCallback(
    (f) => {
      if (N1(f, n)) {
        f.preventDefault();
        let h = r !== void 0 ? r : rr(u) === rr(c);
        s(e, {
          replace: h,
          state: o,
          preventScrollReset: i,
          relative: l,
          unstable_viewTransition: a,
        });
      }
    },
    [u, s, c, r, o, n, e, i, l, a],
  );
}
function K1(e, t) {
  t === void 0 && (t = {});
  let n = y.useContext(xm);
  n == null && X(!1);
  let { basename: r } = H1(fu.useViewTransitionState),
    o = ga(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let i =
      Dn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    l = Dn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return su(o.pathname, l) != null || su(o.pathname, i) != null;
}
function Ue(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var G1 = (() =>
    (typeof Symbol == "function" && Symbol.observable) ||
    "@@observable")(),
  gf = G1,
  ss = () =>
    Math.random().toString(36).substring(7).split("").join("."),
  Q1 = {
    INIT: `@@redux/INIT${ss()}`,
    REPLACE: `@@redux/REPLACE${ss()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${ss()}`,
  },
  kl = Q1;
function _c(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return (
    Object.getPrototypeOf(e) === t ||
    Object.getPrototypeOf(e) === null
  );
}
function Em(e, t, n) {
  if (typeof e != "function") throw new Error(Ue(2));
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(Ue(0));
  if (
    (typeof t == "function" &&
      typeof n > "u" &&
      ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(Ue(1));
    return n(Em)(e, t);
  }
  let r = e,
    o = t,
    i = new Map(),
    l = i,
    a = 0,
    s = !1;
  function u() {
    l === i &&
      ((l = new Map()),
      i.forEach((k, g) => {
        l.set(g, k);
      }));
  }
  function c() {
    if (s) throw new Error(Ue(3));
    return o;
  }
  function f(k) {
    if (typeof k != "function") throw new Error(Ue(4));
    if (s) throw new Error(Ue(5));
    let g = !0;
    u();
    const d = a++;
    return (
      l.set(d, k),
      function () {
        if (g) {
          if (s) throw new Error(Ue(6));
          (g = !1), u(), l.delete(d), (i = null);
        }
      }
    );
  }
  function h(k) {
    if (!_c(k)) throw new Error(Ue(7));
    if (typeof k.type > "u") throw new Error(Ue(8));
    if (typeof k.type != "string") throw new Error(Ue(17));
    if (s) throw new Error(Ue(9));
    try {
      (s = !0), (o = r(o, k));
    } finally {
      s = !1;
    }
    return (
      (i = l).forEach((d) => {
        d();
      }),
      k
    );
  }
  function S(k) {
    if (typeof k != "function") throw new Error(Ue(10));
    (r = k), h({ type: kl.REPLACE });
  }
  function m() {
    const k = f;
    return {
      subscribe(g) {
        if (typeof g != "object" || g === null)
          throw new Error(Ue(11));
        function d() {
          const v = g;
          v.next && v.next(c());
        }
        return d(), { unsubscribe: k(d) };
      },
      [gf]() {
        return this;
      },
    };
  }
  return (
    h({ type: kl.INIT }),
    {
      dispatch: h,
      subscribe: f,
      getState: c,
      replaceReducer: S,
      [gf]: m,
    }
  );
}
function Y1(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, { type: kl.INIT }) > "u")
      throw new Error(Ue(12));
    if (typeof n(void 0, { type: kl.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(Ue(13));
  });
}
function X1(e) {
  const t = Object.keys(e),
    n = {};
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    typeof e[l] == "function" && (n[l] = e[l]);
  }
  const r = Object.keys(n);
  let o;
  try {
    Y1(n);
  } catch (i) {
    o = i;
  }
  return function (l = {}, a) {
    if (o) throw o;
    let s = !1;
    const u = {};
    for (let c = 0; c < r.length; c++) {
      const f = r[c],
        h = n[f],
        S = l[f],
        m = h(S, a);
      if (typeof m > "u") throw (a && a.type, new Error(Ue(14)));
      (u[f] = m), (s = s || m !== S);
    }
    return (s = s || r.length !== Object.keys(l).length), s ? u : l;
  };
}
function _l(...e) {
  return e.length === 0
    ? (t) => t
    : e.length === 1
      ? e[0]
      : e.reduce(
          (t, n) =>
            (...r) =>
              t(n(...r)),
        );
}
function J1(...e) {
  return (t) => (n, r) => {
    const o = t(n, r);
    let i = () => {
      throw new Error(Ue(15));
    };
    const l = {
        getState: o.getState,
        dispatch: (s, ...u) => i(s, ...u),
      },
      a = e.map((s) => s(l));
    return (i = _l(...a)(o.dispatch)), { ...o, dispatch: i };
  };
}
function Z1(e) {
  return _c(e) && "type" in e && typeof e.type == "string";
}
var km = Symbol.for("immer-nothing"),
  vf = Symbol.for("immer-draftable"),
  ft = Symbol.for("immer-state");
function Ft(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Yr = Object.getPrototypeOf;
function or(e) {
  return !!e && !!e[ft];
}
function un(e) {
  var t;
  return e
    ? _m(e) ||
        Array.isArray(e) ||
        !!e[vf] ||
        !!((t = e.constructor) != null && t[vf]) ||
        ya(e) ||
        wa(e)
    : !1;
}
var q1 = Object.prototype.constructor.toString();
function _m(e) {
  if (!e || typeof e != "object") return !1;
  const t = Yr(e);
  if (t === null) return !0;
  const n =
    Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === q1;
}
function Pl(e, t) {
  va(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function va(e) {
  const t = e[ft];
  return t
    ? t.type_
    : Array.isArray(e)
      ? 1
      : ya(e)
        ? 2
        : wa(e)
          ? 3
          : 0;
}
function pu(e, t) {
  return va(e) === 2
    ? e.has(t)
    : Object.prototype.hasOwnProperty.call(e, t);
}
function Pm(e, t, n) {
  const r = va(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function ew(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ya(e) {
  return e instanceof Map;
}
function wa(e) {
  return e instanceof Set;
}
function Vn(e) {
  return e.copy_ || e.base_;
}
function hu(e, t) {
  if (ya(e)) return new Map(e);
  if (wa(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = _m(e);
  if (t === !0 || (t === "class_only" && !n)) {
    const r = Object.getOwnPropertyDescriptors(e);
    delete r[ft];
    let o = Reflect.ownKeys(r);
    for (let i = 0; i < o.length; i++) {
      const l = o[i],
        a = r[l];
      a.writable === !1 && ((a.writable = !0), (a.configurable = !0)),
        (a.get || a.set) &&
          (r[l] = {
            configurable: !0,
            writable: !0,
            enumerable: a.enumerable,
            value: e[l],
          });
    }
    return Object.create(Yr(e), r);
  } else {
    const r = Yr(e);
    if (r !== null && n) return { ...e };
    const o = Object.create(r);
    return Object.assign(o, e);
  }
}
function Pc(e, t = !1) {
  return (
    Sa(e) ||
      or(e) ||
      !un(e) ||
      (va(e) > 1 && (e.set = e.add = e.clear = e.delete = tw),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, r]) => Pc(r, !0))),
    e
  );
}
function tw() {
  Ft(2);
}
function Sa(e) {
  return Object.isFrozen(e);
}
var nw = {};
function ir(e) {
  const t = nw[e];
  return t || Ft(0, e), t;
}
var ti;
function jm() {
  return ti;
}
function rw(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function yf(e, t) {
  t &&
    (ir("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function mu(e) {
  gu(e), e.drafts_.forEach(ow), (e.drafts_ = null);
}
function gu(e) {
  e === ti && (ti = e.parent_);
}
function wf(e) {
  return (ti = rw(ti, e));
}
function ow(e) {
  const t = e[ft];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function Sf(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[ft].modified_ && (mu(t), Ft(4)),
        un(e) && ((e = jl(t, e)), t.parent_ || Nl(t, e)),
        t.patches_ &&
          ir("Patches").generateReplacementPatches_(
            n[ft].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = jl(t, n, [])),
    mu(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== km ? e : void 0
  );
}
function jl(e, t, n) {
  if (Sa(t)) return t;
  const r = t[ft];
  if (!r) return Pl(t, (o, i) => xf(e, r, t, o, i, n)), t;
  if (r.scope_ !== e) return t;
  if (!r.modified_) return Nl(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    (r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
    const o = r.copy_;
    let i = o,
      l = !1;
    r.type_ === 3 && ((i = new Set(o)), o.clear(), (l = !0)),
      Pl(i, (a, s) => xf(e, r, o, a, s, n, l)),
      Nl(e, o, !1),
      n &&
        e.patches_ &&
        ir("Patches").generatePatches_(
          r,
          n,
          e.patches_,
          e.inversePatches_,
        );
  }
  return r.copy_;
}
function xf(e, t, n, r, o, i, l) {
  if (or(o)) {
    const a =
        i && t && t.type_ !== 3 && !pu(t.assigned_, r)
          ? i.concat(r)
          : void 0,
      s = jl(e, o, a);
    if ((Pm(n, r, s), or(s))) e.canAutoFreeze_ = !1;
    else return;
  } else l && n.add(o);
  if (un(o) && !Sa(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    jl(e, o),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(n, r) &&
        Nl(e, o);
  }
}
function Nl(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Pc(t, n);
}
function iw(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      scope_: t ? t.scope_ : jm(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let o = r,
    i = jc;
  n && ((o = [r]), (i = ni));
  const { revoke: l, proxy: a } = Proxy.revocable(o, i);
  return (r.draft_ = a), (r.revoke_ = l), a;
}
var jc = {
    get(e, t) {
      if (t === ft) return e;
      const n = Vn(e);
      if (!pu(n, t)) return lw(e, n, t);
      const r = n[t];
      return e.finalized_ || !un(r)
        ? r
        : r === us(e.base_, t)
          ? (cs(e), (e.copy_[t] = yu(r, e)))
          : r;
    },
    has(e, t) {
      return t in Vn(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Vn(e));
    },
    set(e, t, n) {
      const r = Nm(Vn(e), t);
      if (r != null && r.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const o = us(Vn(e), t),
          i = o == null ? void 0 : o[ft];
        if (i && i.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (ew(n, o) && (n !== void 0 || pu(e.base_, t))) return !0;
        cs(e), vu(e);
      }
      return (
        (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        us(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), cs(e), vu(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = Vn(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      Ft(11);
    },
    getPrototypeOf(e) {
      return Yr(e.base_);
    },
    setPrototypeOf() {
      Ft(12);
    },
  },
  ni = {};
Pl(jc, (e, t) => {
  ni[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
ni.deleteProperty = function (e, t) {
  return ni.set.call(this, e, t, void 0);
};
ni.set = function (e, t, n) {
  return jc.set.call(this, e[0], t, n, e[0]);
};
function us(e, t) {
  const n = e[ft];
  return (n ? Vn(n) : e)[t];
}
function lw(e, t, n) {
  var o;
  const r = Nm(t, n);
  return r
    ? "value" in r
      ? r.value
      : (o = r.get) == null
        ? void 0
        : o.call(e.draft_)
    : void 0;
}
function Nm(e, t) {
  if (!(t in e)) return;
  let n = Yr(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Yr(n);
  }
}
function vu(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && vu(e.parent_));
}
function cs(e) {
  e.copy_ ||
    (e.copy_ = hu(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var aw = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == "function" && typeof n != "function") {
          const i = n;
          n = t;
          const l = this;
          return function (s = i, ...u) {
            return l.produce(s, (c) => n.call(this, c, ...u));
          };
        }
        typeof n != "function" && Ft(6),
          r !== void 0 && typeof r != "function" && Ft(7);
        let o;
        if (un(t)) {
          const i = wf(this),
            l = yu(t, void 0);
          let a = !0;
          try {
            (o = n(l)), (a = !1);
          } finally {
            a ? mu(i) : gu(i);
          }
          return yf(i, r), Sf(o, i);
        } else if (!t || typeof t != "object") {
          if (
            ((o = n(t)),
            o === void 0 && (o = t),
            o === km && (o = void 0),
            this.autoFreeze_ && Pc(o, !0),
            r)
          ) {
            const i = [],
              l = [];
            ir("Patches").generateReplacementPatches_(t, o, i, l),
              r(i, l);
          }
          return o;
        } else Ft(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (l, ...a) =>
            this.produceWithPatches(l, (s) => t(s, ...a));
        let r, o;
        return [
          this.produce(t, n, (l, a) => {
            (r = l), (o = a);
          }),
          r,
          o,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == "boolean" &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) ==
        "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    un(e) || Ft(8), or(e) && (e = sw(e));
    const t = wf(this),
      n = yu(e, void 0);
    return (n[ft].isManual_ = !0), gu(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[ft];
    (!n || !n.isManual_) && Ft(9);
    const { scope_: r } = n;
    return yf(r, t), Sf(void 0, r);
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const o = t[n];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = ir("Patches").applyPatches_;
    return or(e) ? r(e, t) : this.produce(e, (o) => r(o, t));
  }
};
function yu(e, t) {
  const n = ya(e)
    ? ir("MapSet").proxyMap_(e, t)
    : wa(e)
      ? ir("MapSet").proxySet_(e, t)
      : iw(e, t);
  return (t ? t.scope_ : jm()).drafts_.push(n), n;
}
function sw(e) {
  return or(e) || Ft(10, e), Tm(e);
}
function Tm(e) {
  if (!un(e) || Sa(e)) return e;
  const t = e[ft];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0),
      (n = hu(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = hu(e, !0);
  return (
    Pl(n, (r, o) => {
      Pm(n, r, Tm(o));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var pt = new aw(),
  Rm = pt.produce;
pt.produceWithPatches.bind(pt);
pt.setAutoFreeze.bind(pt);
pt.setUseStrictShallowCopy.bind(pt);
pt.applyPatches.bind(pt);
pt.createDraft.bind(pt);
pt.finishDraft.bind(pt);
function Lm(e) {
  return ({ dispatch: n, getState: r }) =>
    (o) =>
    (i) =>
      typeof i == "function" ? i(n, r, e) : o(i);
}
var uw = Lm(),
  cw = Lm,
  dw =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? _l
              : _l.apply(null, arguments);
        },
  fw = (e) => e && typeof e.match == "function";
function zo(e, t) {
  function n(...r) {
    if (t) {
      let o = t(...r);
      if (!o) throw new Error(rn(0));
      return {
        type: e,
        payload: o.payload,
        ...("meta" in o && { meta: o.meta }),
        ...("error" in o && { error: o.error }),
      };
    }
    return { type: e, payload: r[0] };
  }
  return (
    (n.toString = () => `${e}`),
    (n.type = e),
    (n.match = (r) => Z1(r) && r.type === e),
    n
  );
}
var Mm = class Eo extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Eo.prototype);
  }
  static get [Symbol.species]() {
    return Eo;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0])
      ? new Eo(...t[0].concat(this))
      : new Eo(...t.concat(this));
  }
};
function Cf(e) {
  return un(e) ? Rm(e, () => {}) : e;
}
function Ef(e, t, n) {
  return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function pw(e) {
  return typeof e == "boolean";
}
var hw = () =>
    function (t) {
      const {
        thunk: n = !0,
        immutableCheck: r = !0,
        serializableCheck: o = !0,
        actionCreatorCheck: i = !0,
      } = t ?? {};
      let l = new Mm();
      return (
        n && (pw(n) ? l.push(uw) : l.push(cw(n.extraArgument))), l
      );
    },
  mw = "RTK_autoBatch",
  kf = (e) => (t) => {
    setTimeout(t, e);
  },
  gw =
    (e = { type: "raf" }) =>
    (t) =>
    (...n) => {
      const r = t(...n);
      let o = !0,
        i = !1,
        l = !1;
      const a = new Set(),
        s =
          e.type === "tick"
            ? queueMicrotask
            : e.type === "raf"
              ? typeof window < "u" && window.requestAnimationFrame
                ? window.requestAnimationFrame
                : kf(10)
              : e.type === "callback"
                ? e.queueNotification
                : kf(e.timeout),
        u = () => {
          (l = !1), i && ((i = !1), a.forEach((c) => c()));
        };
      return Object.assign({}, r, {
        subscribe(c) {
          const f = () => o && c(),
            h = r.subscribe(f);
          return (
            a.add(c),
            () => {
              h(), a.delete(c);
            }
          );
        },
        dispatch(c) {
          var f;
          try {
            return (
              (o = !(
                (f = c == null ? void 0 : c.meta) != null && f[mw]
              )),
              (i = !o),
              i && (l || ((l = !0), s(u))),
              r.dispatch(c)
            );
          } finally {
            o = !0;
          }
        },
      });
    },
  vw = (e) =>
    function (n) {
      const { autoBatch: r = !0 } = n ?? {};
      let o = new Mm(e);
      return r && o.push(gw(typeof r == "object" ? r : void 0)), o;
    };
function yw(e) {
  const t = hw(),
    {
      reducer: n = void 0,
      middleware: r,
      devTools: o = !0,
      preloadedState: i = void 0,
      enhancers: l = void 0,
    } = e || {};
  let a;
  if (typeof n == "function") a = n;
  else if (_c(n)) a = X1(n);
  else throw new Error(rn(1));
  let s;
  typeof r == "function" ? (s = r(t)) : (s = t());
  let u = _l;
  o && (u = dw({ trace: !1, ...(typeof o == "object" && o) }));
  const c = J1(...s),
    f = vw(c);
  let h = typeof l == "function" ? l(f) : f();
  const S = u(...h);
  return Em(a, i, S);
}
function Om(e) {
  const t = {},
    n = [];
  let r;
  const o = {
    addCase(i, l) {
      const a = typeof i == "string" ? i : i.type;
      if (!a) throw new Error(rn(28));
      if (a in t) throw new Error(rn(29));
      return (t[a] = l), o;
    },
    addMatcher(i, l) {
      return n.push({ matcher: i, reducer: l }), o;
    },
    addDefaultCase(i) {
      return (r = i), o;
    },
  };
  return e(o), [t, n, r];
}
function ww(e) {
  return typeof e == "function";
}
function Sw(e, t) {
  let [n, r, o] = Om(t),
    i;
  if (ww(e)) i = () => Cf(e());
  else {
    const a = Cf(e);
    i = () => a;
  }
  function l(a = i(), s) {
    let u = [
      n[s.type],
      ...r
        .filter(({ matcher: c }) => c(s))
        .map(({ reducer: c }) => c),
    ];
    return (
      u.filter((c) => !!c).length === 0 && (u = [o]),
      u.reduce((c, f) => {
        if (f)
          if (or(c)) {
            const S = f(c, s);
            return S === void 0 ? c : S;
          } else {
            if (un(c)) return Rm(c, (h) => f(h, s));
            {
              const h = f(c, s);
              if (h === void 0) {
                if (c === null) return c;
                throw Error(
                  "A case reducer on a non-draftable value must not return undefined",
                );
              }
              return h;
            }
          }
        return c;
      }, a)
    );
  }
  return (l.getInitialState = i), l;
}
var xw = (e, t) => (fw(e) ? e.match(t) : e(t));
function Cw(...e) {
  return (t) => e.some((n) => xw(n, t));
}
var Ew =
    "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  kw = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += Ew[(Math.random() * 64) | 0];
    return t;
  },
  _w = ["name", "message", "stack", "code"],
  ds = class {
    constructor(e, t) {
      La(this, "_type");
      (this.payload = e), (this.meta = t);
    }
  },
  _f = class {
    constructor(e, t) {
      La(this, "_type");
      (this.payload = e), (this.meta = t);
    }
  },
  Pw = (e) => {
    if (typeof e == "object" && e !== null) {
      const t = {};
      for (const n of _w) typeof e[n] == "string" && (t[n] = e[n]);
      return t;
    }
    return { message: String(e) };
  },
  xa = (() => {
    function e(t, n, r) {
      const o = zo(t + "/fulfilled", (s, u, c, f) => ({
          payload: s,
          meta: {
            ...(f || {}),
            arg: c,
            requestId: u,
            requestStatus: "fulfilled",
          },
        })),
        i = zo(t + "/pending", (s, u, c) => ({
          payload: void 0,
          meta: {
            ...(c || {}),
            arg: u,
            requestId: s,
            requestStatus: "pending",
          },
        })),
        l = zo(t + "/rejected", (s, u, c, f, h) => ({
          payload: f,
          error: ((r && r.serializeError) || Pw)(s || "Rejected"),
          meta: {
            ...(h || {}),
            arg: c,
            requestId: u,
            rejectedWithValue: !!f,
            requestStatus: "rejected",
            aborted: (s == null ? void 0 : s.name) === "AbortError",
            condition:
              (s == null ? void 0 : s.name) === "ConditionError",
          },
        }));
      function a(s) {
        return (u, c, f) => {
          const h =
              r != null && r.idGenerator ? r.idGenerator(s) : kw(),
            S = new AbortController();
          let m, x;
          function k(d) {
            (x = d), S.abort();
          }
          const g = (async function () {
            var v, P;
            let d;
            try {
              let R =
                (v = r == null ? void 0 : r.condition) == null
                  ? void 0
                  : v.call(r, s, { getState: c, extra: f });
              if (
                (Nw(R) && (R = await R), R === !1 || S.signal.aborted)
              )
                throw {
                  name: "ConditionError",
                  message:
                    "Aborted due to condition callback returning false.",
                };
              const T = new Promise((L, z) => {
                (m = () => {
                  z({ name: "AbortError", message: x || "Aborted" });
                }),
                  S.signal.addEventListener("abort", m);
              });
              u(
                i(
                  h,
                  s,
                  (P = r == null ? void 0 : r.getPendingMeta) == null
                    ? void 0
                    : P.call(
                        r,
                        { requestId: h, arg: s },
                        { getState: c, extra: f },
                      ),
                ),
              ),
                (d = await Promise.race([
                  T,
                  Promise.resolve(
                    n(s, {
                      dispatch: u,
                      getState: c,
                      extra: f,
                      requestId: h,
                      signal: S.signal,
                      abort: k,
                      rejectWithValue: (L, z) => new ds(L, z),
                      fulfillWithValue: (L, z) => new _f(L, z),
                    }),
                  ).then((L) => {
                    if (L instanceof ds) throw L;
                    return L instanceof _f
                      ? o(L.payload, h, s, L.meta)
                      : o(L, h, s);
                  }),
                ]));
            } catch (R) {
              d =
                R instanceof ds
                  ? l(null, h, s, R.payload, R.meta)
                  : l(R, h, s);
            } finally {
              m && S.signal.removeEventListener("abort", m);
            }
            return (
              (r &&
                !r.dispatchConditionRejection &&
                l.match(d) &&
                d.meta.condition) ||
                u(d),
              d
            );
          })();
          return Object.assign(g, {
            abort: k,
            requestId: h,
            arg: s,
            unwrap() {
              return g.then(jw);
            },
          });
        };
      }
      return Object.assign(a, {
        pending: i,
        rejected: l,
        fulfilled: o,
        settled: Cw(l, o),
        typePrefix: t,
      });
    }
    return (e.withTypes = () => e), e;
  })();
function jw(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function Nw(e) {
  return (
    e !== null && typeof e == "object" && typeof e.then == "function"
  );
}
var Tw = Symbol.for("rtk-slice-createasyncthunk");
function Rw(e, t) {
  return `${e}/${t}`;
}
function Lw({ creators: e } = {}) {
  var n;
  const t =
    (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Tw];
  return function (o) {
    const { name: i, reducerPath: l = i } = o;
    if (!i) throw new Error(rn(11));
    typeof process < "u";
    const a =
        (typeof o.reducers == "function"
          ? o.reducers(Dw())
          : o.reducers) || {},
      s = Object.keys(a),
      u = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      c = {
        addCase(w, v) {
          const P = typeof w == "string" ? w : w.type;
          if (!P) throw new Error(rn(12));
          if (P in u.sliceCaseReducersByType) throw new Error(rn(13));
          return (u.sliceCaseReducersByType[P] = v), c;
        },
        addMatcher(w, v) {
          return u.sliceMatchers.push({ matcher: w, reducer: v }), c;
        },
        exposeAction(w, v) {
          return (u.actionCreators[w] = v), c;
        },
        exposeCaseReducer(w, v) {
          return (u.sliceCaseReducersByName[w] = v), c;
        },
      };
    s.forEach((w) => {
      const v = a[w],
        P = {
          reducerName: w,
          type: Rw(i, w),
          createNotation: typeof o.reducers == "function",
        };
      Fw(v) ? Aw(P, v, c, t) : zw(P, v, c);
    });
    function f() {
      const [w = {}, v = [], P = void 0] =
          typeof o.extraReducers == "function"
            ? Om(o.extraReducers)
            : [o.extraReducers],
        R = { ...w, ...u.sliceCaseReducersByType };
      return Sw(o.initialState, (T) => {
        for (let L in R) T.addCase(L, R[L]);
        for (let L of u.sliceMatchers)
          T.addMatcher(L.matcher, L.reducer);
        for (let L of v) T.addMatcher(L.matcher, L.reducer);
        P && T.addDefaultCase(P);
      });
    }
    const h = (w) => w,
      S = new Map();
    let m;
    function x(w, v) {
      return m || (m = f()), m(w, v);
    }
    function k() {
      return m || (m = f()), m.getInitialState();
    }
    function g(w, v = !1) {
      function P(T) {
        let L = T[w];
        return typeof L > "u" && v && (L = k()), L;
      }
      function R(T = h) {
        const L = Ef(S, v, () => new WeakMap());
        return Ef(L, T, () => {
          const z = {};
          for (const [F, Y] of Object.entries(o.selectors ?? {}))
            z[F] = Mw(Y, T, k, v);
          return z;
        });
      }
      return {
        reducerPath: w,
        getSelectors: R,
        get selectors() {
          return R(P);
        },
        selectSlice: P,
      };
    }
    const d = {
      name: i,
      reducer: x,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: k,
      ...g(l),
      injectInto(w, { reducerPath: v, ...P } = {}) {
        const R = v ?? l;
        return (
          w.inject({ reducerPath: R, reducer: x }, P),
          { ...d, ...g(R, !0) }
        );
      },
    };
    return d;
  };
}
function Mw(e, t, n, r) {
  function o(i, ...l) {
    let a = t(i);
    return typeof a > "u" && r && (a = n()), e(a, ...l);
  }
  return (o.unwrapped = e), o;
}
var Ow = Lw();
function Dw() {
  function e(t, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...n,
    };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(t) {
        return Object.assign(
          {
            [t.name](...n) {
              return t(...n);
            },
          }[t.name],
          { _reducerDefinitionType: "reducer" },
        );
      },
      preparedReducer(t, n) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: t,
          reducer: n,
        };
      },
      asyncThunk: e,
    }
  );
}
function zw({ type: e, reducerName: t, createNotation: n }, r, o) {
  let i, l;
  if ("reducer" in r) {
    if (n && !Iw(r)) throw new Error(rn(17));
    (i = r.reducer), (l = r.prepare);
  } else i = r;
  o.addCase(e, i)
    .exposeCaseReducer(t, i)
    .exposeAction(t, l ? zo(e, l) : zo(e));
}
function Fw(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Iw(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Aw({ type: e, reducerName: t }, n, r, o) {
  if (!o) throw new Error(rn(18));
  const {
      payloadCreator: i,
      fulfilled: l,
      pending: a,
      rejected: s,
      settled: u,
      options: c,
    } = n,
    f = o(e, i, c);
  r.exposeAction(t, f),
    l && r.addCase(f.fulfilled, l),
    a && r.addCase(f.pending, a),
    s && r.addCase(f.rejected, s),
    u && r.addMatcher(f.settled, u),
    r.exposeCaseReducer(t, {
      fulfilled: l || Di,
      pending: a || Di,
      rejected: s || Di,
      settled: u || Di,
    });
}
function Di() {}
function rn(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Ca = {
    auth: "session/authenticate",
    login: "session/login",
    signup: "session/signup",
    logout: "session/logout",
  },
  $w = { user: null, loading: !1, errors: !1 },
  Fo = xa(Ca.auth, async (e, { rejectWithValue: t }) => {
    try {
      return await (await fetch("/api/auth/")).json();
    } catch (n) {
      return t(
        n.message || {
          server: "Something went wrong. Please try again",
        },
      );
    }
  }),
  Qi = xa(Ca.login, async (e, { rejectWithValue: t }) => {
    try {
      const n = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      if (!n.ok) {
        const o = await n.json();
        return t(o);
      }
      return await n.json();
    } catch (n) {
      return t(
        n.message || {
          server: "Something went wrong. Please try again",
        },
      );
    }
  }),
  Yi = xa(
    Ca.signup,
    async (
      { email: e, nick: t, password: n, name: r },
      { rejectWithValue: o },
    ) => {
      try {
        const i = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: e,
            nick: t,
            password: n,
            name: r,
          }),
        });
        if (!i.ok) {
          const a = await i.json();
          return o(a);
        }
        return await i.json();
      } catch (i) {
        return o(
          i.message || {
            server: "Something went wrong. Please try again",
          },
        );
      }
    },
  ),
  Xi = xa(Ca.logout, async (e, { rejectWithValue: t }) => {
    try {
      return await fetch("/api/auth/logout"), null;
    } catch (n) {
      return t(
        n.message || {
          server: "Something went wrong. Please try again",
        },
      );
    }
  }),
  Dm = Ow({
    name: "session",
    initialState: $w,
    reducers: {
      setUser: (e, t) => {
        e.user = t.payload;
      },
      removeUser: (e) => {
        e.user = null;
      },
    },
    extraReducers: (e) => {
      e.addCase(Fo.pending, (t) => {
        (t.loading = !0), (t.errors = !1);
      })
        .addCase(Fo.fulfilled, (t, n) => {
          (t.loading = !1), (t.user = n.payload);
        })
        .addCase(Fo.rejected, (t, n) => {
          (t.loading = !1), (t.errors = n.payload);
        })
        .addCase(Qi.pending, (t) => {
          (t.loading = !0), (t.errors = !1);
        })
        .addCase(Qi.rejected, (t, n) => {
          (t.loading = !1), (t.errors = n.payload);
        })
        .addCase(Qi.fulfilled, (t, n) => {
          (t.loading = !1), (t.user = n.payload);
        })
        .addCase(Yi.pending, (t) => {
          (t.loading = !0), (t.errors = !1);
        })
        .addCase(Yi.rejected, (t, n) => {
          (t.loading = !1), (t.errors = n.payload);
        })
        .addCase(Yi.fulfilled, (t, n) => {
          (t.loading = !1), (t.user = n.payload);
        })
        .addCase(Xi.pending, (t) => {
          (t.loading = !0), (t.errors = !1);
        })
        .addCase(Xi.rejected, (t, n) => {
          (t.loading = !1), (t.errors = n.payload);
        })
        .addCase(Xi.fulfilled, (t) => {
          (t.loading = !1), (t.user = null);
        });
    },
  });
Dm.actions;
const Uw = Dm.reducer;
var Pf = { exports: {} };
(function (e, t) {
  (function (n, r) {
    r(t);
  })(oo, function (n) {
    function r(C, j) {
      (C.super_ = j),
        (C.prototype = Object.create(j.prototype, {
          constructor: {
            value: C,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        }));
    }
    function o(C, j) {
      Object.defineProperty(this, "kind", {
        value: C,
        enumerable: !0,
      }),
        j &&
          j.length &&
          Object.defineProperty(this, "path", {
            value: j,
            enumerable: !0,
          });
    }
    function i(C, j, _) {
      i.super_.call(this, "E", C),
        Object.defineProperty(this, "lhs", {
          value: j,
          enumerable: !0,
        }),
        Object.defineProperty(this, "rhs", {
          value: _,
          enumerable: !0,
        });
    }
    function l(C, j) {
      l.super_.call(this, "N", C),
        Object.defineProperty(this, "rhs", {
          value: j,
          enumerable: !0,
        });
    }
    function a(C, j) {
      a.super_.call(this, "D", C),
        Object.defineProperty(this, "lhs", {
          value: j,
          enumerable: !0,
        });
    }
    function s(C, j, _) {
      s.super_.call(this, "A", C),
        Object.defineProperty(this, "index", {
          value: j,
          enumerable: !0,
        }),
        Object.defineProperty(this, "item", {
          value: _,
          enumerable: !0,
        });
    }
    function u(C, j, _) {
      var D = C.slice((_ || j) + 1 || C.length);
      return (
        (C.length = j < 0 ? C.length + j : j), C.push.apply(C, D), C
      );
    }
    function c(C) {
      var j = typeof C > "u" ? "undefined" : re(C);
      return j !== "object"
        ? j
        : C === Math
          ? "math"
          : C === null
            ? "null"
            : Array.isArray(C)
              ? "array"
              : Object.prototype.toString.call(C) === "[object Date]"
                ? "date"
                : typeof C.toString == "function" &&
                    /^\/.*\//.test(C.toString())
                  ? "regexp"
                  : "object";
    }
    function f(C, j, _, D, b, K, Q) {
      (b = b || []), (Q = Q || []);
      var q = b.slice(0);
      if (typeof K < "u") {
        if (D) {
          if (typeof D == "function" && D(q, K)) return;
          if ((typeof D > "u" ? "undefined" : re(D)) === "object") {
            if (D.prefilter && D.prefilter(q, K)) return;
            if (D.normalize) {
              var ce = D.normalize(q, K, C, j);
              ce && ((C = ce[0]), (j = ce[1]));
            }
          }
        }
        q.push(K);
      }
      c(C) === "regexp" &&
        c(j) === "regexp" &&
        ((C = C.toString()), (j = j.toString()));
      var Ie = typeof C > "u" ? "undefined" : re(C),
        He = typeof j > "u" ? "undefined" : re(j),
        Ae =
          Ie !== "undefined" ||
          (Q &&
            Q[Q.length - 1].lhs &&
            Q[Q.length - 1].lhs.hasOwnProperty(K)),
        Re =
          He !== "undefined" ||
          (Q &&
            Q[Q.length - 1].rhs &&
            Q[Q.length - 1].rhs.hasOwnProperty(K));
      if (!Ae && Re) _(new l(q, j));
      else if (!Re && Ae) _(new a(q, C));
      else if (c(C) !== c(j)) _(new i(q, C, j));
      else if (c(C) === "date" && C - j !== 0) _(new i(q, C, j));
      else if (Ie === "object" && C !== null && j !== null)
        if (
          Q.filter(function (ve) {
            return ve.lhs === C;
          }).length
        )
          C !== j && _(new i(q, C, j));
        else {
          if ((Q.push({ lhs: C, rhs: j }), Array.isArray(C))) {
            var ae;
            for (C.length, ae = 0; ae < C.length; ae++)
              ae >= j.length
                ? _(new s(q, ae, new a(void 0, C[ae])))
                : f(C[ae], j[ae], _, D, q, ae, Q);
            for (; ae < j.length; )
              _(new s(q, ae, new l(void 0, j[ae++])));
          } else {
            var Yt = Object.keys(C),
              Nt = Object.keys(j);
            Yt.forEach(function (ve, pn) {
              var Tt = Nt.indexOf(ve);
              Tt >= 0
                ? (f(C[ve], j[ve], _, D, q, ve, Q), (Nt = u(Nt, Tt)))
                : f(C[ve], void 0, _, D, q, ve, Q);
            }),
              Nt.forEach(function (ve) {
                f(void 0, j[ve], _, D, q, ve, Q);
              });
          }
          Q.length = Q.length - 1;
        }
      else
        C !== j &&
          ((Ie === "number" && isNaN(C) && isNaN(j)) ||
            _(new i(q, C, j)));
    }
    function h(C, j, _, D) {
      return (
        (D = D || []),
        f(
          C,
          j,
          function (b) {
            b && D.push(b);
          },
          _,
        ),
        D.length ? D : void 0
      );
    }
    function S(C, j, _) {
      if (_.path && _.path.length) {
        var D,
          b = C[j],
          K = _.path.length - 1;
        for (D = 0; D < K; D++) b = b[_.path[D]];
        switch (_.kind) {
          case "A":
            S(b[_.path[D]], _.index, _.item);
            break;
          case "D":
            delete b[_.path[D]];
            break;
          case "E":
          case "N":
            b[_.path[D]] = _.rhs;
        }
      } else
        switch (_.kind) {
          case "A":
            S(C[j], _.index, _.item);
            break;
          case "D":
            C = u(C, j);
            break;
          case "E":
          case "N":
            C[j] = _.rhs;
        }
      return C;
    }
    function m(C, j, _) {
      if (C && j && _ && _.kind) {
        for (
          var D = C, b = -1, K = _.path ? _.path.length - 1 : 0;
          ++b < K;

        )
          typeof D[_.path[b]] > "u" &&
            (D[_.path[b]] = typeof _.path[b] == "number" ? [] : {}),
            (D = D[_.path[b]]);
        switch (_.kind) {
          case "A":
            S(_.path ? D[_.path[b]] : D, _.index, _.item);
            break;
          case "D":
            delete D[_.path[b]];
            break;
          case "E":
          case "N":
            D[_.path[b]] = _.rhs;
        }
      }
    }
    function x(C, j, _) {
      if (_.path && _.path.length) {
        var D,
          b = C[j],
          K = _.path.length - 1;
        for (D = 0; D < K; D++) b = b[_.path[D]];
        switch (_.kind) {
          case "A":
            x(b[_.path[D]], _.index, _.item);
            break;
          case "D":
            b[_.path[D]] = _.lhs;
            break;
          case "E":
            b[_.path[D]] = _.lhs;
            break;
          case "N":
            delete b[_.path[D]];
        }
      } else
        switch (_.kind) {
          case "A":
            x(C[j], _.index, _.item);
            break;
          case "D":
            C[j] = _.lhs;
            break;
          case "E":
            C[j] = _.lhs;
            break;
          case "N":
            C = u(C, j);
        }
      return C;
    }
    function k(C, j, _) {
      if (C && j && _ && _.kind) {
        var D,
          b,
          K = C;
        for (b = _.path.length - 1, D = 0; D < b; D++)
          typeof K[_.path[D]] > "u" && (K[_.path[D]] = {}),
            (K = K[_.path[D]]);
        switch (_.kind) {
          case "A":
            x(K[_.path[D]], _.index, _.item);
            break;
          case "D":
            K[_.path[D]] = _.lhs;
            break;
          case "E":
            K[_.path[D]] = _.lhs;
            break;
          case "N":
            delete K[_.path[D]];
        }
      }
    }
    function g(C, j, _) {
      if (C && j) {
        var D = function (b) {
          (_ && !_(C, j, b)) || m(C, j, b);
        };
        f(C, j, D);
      }
    }
    function d(C) {
      return "color: " + A[C].color + "; font-weight: bold";
    }
    function w(C) {
      var j = C.kind,
        _ = C.path,
        D = C.lhs,
        b = C.rhs,
        K = C.index,
        Q = C.item;
      switch (j) {
        case "E":
          return [_.join("."), D, "→", b];
        case "N":
          return [_.join("."), b];
        case "D":
          return [_.join(".")];
        case "A":
          return [_.join(".") + "[" + K + "]", Q];
        default:
          return [];
      }
    }
    function v(C, j, _, D) {
      var b = h(C, j);
      try {
        D ? _.groupCollapsed("diff") : _.group("diff");
      } catch {
        _.log("diff");
      }
      b
        ? b.forEach(function (K) {
            var Q = K.kind,
              q = w(K);
            _.log.apply(_, ["%c " + A[Q].text, d(Q)].concat(jt(q)));
          })
        : _.log("—— no diff ——");
      try {
        _.groupEnd();
      } catch {
        _.log("—— diff end —— ");
      }
    }
    function P(C, j, _, D) {
      switch (typeof C > "u" ? "undefined" : re(C)) {
        case "object":
          return typeof C[D] == "function"
            ? C[D].apply(C, jt(_))
            : C[D];
        case "function":
          return C(j);
        default:
          return C;
      }
    }
    function R(C) {
      var j = C.timestamp,
        _ = C.duration;
      return function (D, b, K) {
        var Q = ["action"];
        return (
          Q.push("%c" + String(D.type)),
          j && Q.push("%c@ " + b),
          _ && Q.push("%c(in " + K.toFixed(2) + " ms)"),
          Q.join(" ")
        );
      };
    }
    function T(C, j) {
      var _ = j.logger,
        D = j.actionTransformer,
        b = j.titleFormatter,
        K = b === void 0 ? R(j) : b,
        Q = j.collapsed,
        q = j.colors,
        ce = j.level,
        Ie = j.diff,
        He = typeof j.titleFormatter > "u";
      C.forEach(function (Ae, Re) {
        var ae = Ae.started,
          Yt = Ae.startedTime,
          Nt = Ae.action,
          ve = Ae.prevState,
          pn = Ae.error,
          Tt = Ae.took,
          Ut = Ae.nextState,
          An = C[Re + 1];
        An && ((Ut = An.prevState), (Tt = An.started - ae));
        var Le = D(Nt),
          hn =
            typeof Q == "function"
              ? Q(
                  function () {
                    return Ut;
                  },
                  Nt,
                  Ae,
                )
              : Q,
          pi = je(Yt),
          dr = q.title ? "color: " + q.title(Le) + ";" : "",
          $n = ["color: gray; font-weight: lighter;"];
        $n.push(dr),
          j.timestamp &&
            $n.push("color: gray; font-weight: lighter;"),
          j.duration && $n.push("color: gray; font-weight: lighter;");
        var nt = K(Le, pi, Tt);
        try {
          hn
            ? q.title && He
              ? _.groupCollapsed.apply(_, ["%c " + nt].concat($n))
              : _.groupCollapsed(nt)
            : q.title && He
              ? _.group.apply(_, ["%c " + nt].concat($n))
              : _.group(nt);
        } catch {
          _.log(nt);
        }
        var fr = P(ce, Le, [ve], "prevState"),
          pr = P(ce, Le, [Le], "action"),
          hr = P(ce, Le, [pn, ve], "error"),
          to = P(ce, Le, [Ut], "nextState");
        if (fr)
          if (q.prevState) {
            var hi =
              "color: " + q.prevState(ve) + "; font-weight: bold";
            _[fr]("%c prev state", hi, ve);
          } else _[fr]("prev state", ve);
        if (pr)
          if (q.action) {
            var mr = "color: " + q.action(Le) + "; font-weight: bold";
            _[pr]("%c action    ", mr, Le);
          } else _[pr]("action    ", Le);
        if (pn && hr)
          if (q.error) {
            var mi =
              "color: " + q.error(pn, ve) + "; font-weight: bold;";
            _[hr]("%c error     ", mi, pn);
          } else _[hr]("error     ", pn);
        if (to)
          if (q.nextState) {
            var no =
              "color: " + q.nextState(Ut) + "; font-weight: bold";
            _[to]("%c next state", no, Ut);
          } else _[to]("next state", Ut);
        Ie && v(ve, Ut, _, hn);
        try {
          _.groupEnd();
        } catch {
          _.log("—— log end ——");
        }
      });
    }
    function L() {
      var C =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : {},
        j = Object.assign({}, V, C),
        _ = j.logger,
        D = j.stateTransformer,
        b = j.errorTransformer,
        K = j.predicate,
        Q = j.logErrors,
        q = j.diffPredicate;
      if (typeof _ > "u")
        return function () {
          return function (Ie) {
            return function (He) {
              return Ie(He);
            };
          };
        };
      if (C.getState && C.dispatch)
        return (
          console.error(`[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:
// Logger with default options
import { logger } from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
// Or you can create your own logger with custom options http://bit.ly/redux-logger-options
import createLogger from 'redux-logger'
const logger = createLogger({
  // ...options
});
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
`),
          function () {
            return function (Ie) {
              return function (He) {
                return Ie(He);
              };
            };
          }
        );
      var ce = [];
      return function (Ie) {
        var He = Ie.getState;
        return function (Ae) {
          return function (Re) {
            if (typeof K == "function" && !K(He, Re)) return Ae(Re);
            var ae = {};
            ce.push(ae),
              (ae.started = vt.now()),
              (ae.startedTime = new Date()),
              (ae.prevState = D(He())),
              (ae.action = Re);
            var Yt = void 0;
            if (Q)
              try {
                Yt = Ae(Re);
              } catch (ve) {
                ae.error = b(ve);
              }
            else Yt = Ae(Re);
            (ae.took = vt.now() - ae.started),
              (ae.nextState = D(He()));
            var Nt =
              j.diff && typeof q == "function" ? q(He, Re) : j.diff;
            if (
              (T(ce, Object.assign({}, j, { diff: Nt })),
              (ce.length = 0),
              ae.error)
            )
              throw ae.error;
            return Yt;
          };
        };
      };
    }
    var z,
      F,
      Y = function (C, j) {
        return new Array(j + 1).join(C);
      },
      ue = function (C, j) {
        return Y("0", j - C.toString().length) + C;
      },
      je = function (C) {
        return (
          ue(C.getHours(), 2) +
          ":" +
          ue(C.getMinutes(), 2) +
          ":" +
          ue(C.getSeconds(), 2) +
          "." +
          ue(C.getMilliseconds(), 3)
        );
      },
      vt =
        typeof performance < "u" &&
        performance !== null &&
        typeof performance.now == "function"
          ? performance
          : Date,
      re =
        typeof Symbol == "function" &&
        typeof Symbol.iterator == "symbol"
          ? function (C) {
              return typeof C;
            }
          : function (C) {
              return C &&
                typeof Symbol == "function" &&
                C.constructor === Symbol &&
                C !== Symbol.prototype
                ? "symbol"
                : typeof C;
            },
      jt = function (C) {
        if (Array.isArray(C)) {
          for (var j = 0, _ = Array(C.length); j < C.length; j++)
            _[j] = C[j];
          return _;
        }
        return Array.from(C);
      },
      tt = [];
    (z =
      (typeof oo > "u" ? "undefined" : re(oo)) === "object" && oo
        ? oo
        : typeof window < "u"
          ? window
          : {}),
      (F = z.DeepDiff),
      F &&
        tt.push(function () {
          typeof F < "u" &&
            z.DeepDiff === h &&
            ((z.DeepDiff = F), (F = void 0));
        }),
      r(i, o),
      r(l, o),
      r(a, o),
      r(s, o),
      Object.defineProperties(h, {
        diff: { value: h, enumerable: !0 },
        observableDiff: { value: f, enumerable: !0 },
        applyDiff: { value: g, enumerable: !0 },
        applyChange: { value: m, enumerable: !0 },
        revertChange: { value: k, enumerable: !0 },
        isConflict: {
          value: function () {
            return typeof F < "u";
          },
          enumerable: !0,
        },
        noConflict: {
          value: function () {
            return (
              tt &&
                (tt.forEach(function (C) {
                  C();
                }),
                (tt = null)),
              h
            );
          },
          enumerable: !0,
        },
      });
    var A = {
        E: { color: "#2196F3", text: "CHANGED:" },
        N: { color: "#4CAF50", text: "ADDED:" },
        D: { color: "#F44336", text: "DELETED:" },
        A: { color: "#2196F3", text: "ARRAY:" },
      },
      V = {
        level: "log",
        logger: console,
        logErrors: !0,
        collapsed: void 0,
        predicate: void 0,
        duration: !1,
        timestamp: !0,
        stateTransformer: function (C) {
          return C;
        },
        actionTransformer: function (C) {
          return C;
        },
        errorTransformer: function (C) {
          return C;
        },
        colors: {
          title: function () {
            return "inherit";
          },
          prevState: function () {
            return "#9E9E9E";
          },
          action: function () {
            return "#03A9F4";
          },
          nextState: function () {
            return "#4CAF50";
          },
          error: function () {
            return "#F20404";
          },
        },
        diff: !1,
        diffPredicate: void 0,
        transformer: void 0,
      },
      H = function () {
        var C =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : {},
          j = C.dispatch,
          _ = C.getState;
        return typeof j == "function" || typeof _ == "function"
          ? L()({ dispatch: j, getState: _ })
          : void console.error(`
[redux-logger v3] BREAKING CHANGE
[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.
[redux-logger v3] Change
[redux-logger v3] import createLogger from 'redux-logger'
[redux-logger v3] to
[redux-logger v3] import { createLogger } from 'redux-logger'
`);
      };
    (n.defaults = V),
      (n.createLogger = L),
      (n.logger = H),
      (n.default = H),
      Object.defineProperty(n, "__esModule", { value: !0 });
  });
})(Pf, Pf.exports);
const zm = yw({
  reducer: { session: Uw },
  middleware: (e) => e(),
  devTools: !1,
});
const Nc = y.createContext();
function bw({ children: e }) {
  const t = y.useRef(),
    [n, r] = y.useState(null),
    [o, i] = y.useState(null),
    a = {
      modalRef: t,
      modalContent: n,
      setModalContent: r,
      setOnModalClose: i,
      closeModal: () => {
        r(null), typeof o == "function" && (i(null), o());
      },
    };
  return p.jsxs(p.Fragment, {
    children: [
      p.jsx(Nc.Provider, { value: a, children: e }),
      p.jsx("div", { ref: t }),
    ],
  });
}
function Bw() {
  const {
    modalRef: e,
    modalContent: t,
    closeModal: n,
  } = y.useContext(Nc);
  return !e || !e.current || !t
    ? null
    : Kh.createPortal(
        p.jsxs("div", {
          id: "modal",
          children: [
            p.jsx("div", { id: "modal-background", onClick: n }),
            p.jsx("div", { id: "modal-content", children: t }),
          ],
        }),
        e.current,
      );
}
const cr = () => y.useContext(Nc);
var Vw = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var r, o, i;
    if (Array.isArray(t)) {
      if (((r = t.length), r != n.length)) return !1;
      for (o = r; o-- !== 0; ) if (!e(t[o], n[o])) return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === n.toString();
    if (
      ((i = Object.keys(t)),
      (r = i.length),
      r !== Object.keys(n).length)
    )
      return !1;
    for (o = r; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, i[o])) return !1;
    for (o = r; o-- !== 0; ) {
      var l = i[o];
      if (!e(t[l], n[l])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
};
const Hw = wu(Vw);
function Gt() {
  return (
    (Gt = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Gt.apply(null, arguments)
  );
}
function lr(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.includes(r)) continue;
      n[r] = e[r];
    }
  return n;
}
function Ww(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError(
      "@@toPrimitive must return a primitive value.",
    );
  }
  return (t === "string" ? String : Number)(e);
}
function Kw(e) {
  var t = Ww(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
const Zt = {
    NOT_LOADED: "NOT_LOADED",
    LOADING: "LOADING",
    LOADED: "LOADED",
    FAILED: "FAILED",
    AUTH_FAILURE: "AUTH_FAILURE",
  },
  Gw = "https://maps.googleapis.com/maps/api/js";
class ri {
  static async load(t, n) {
    var r;
    const o = t.libraries ? t.libraries.split(",") : [],
      i = this.serializeParams(t);
    this.listeners.push(n),
      (r = window.google) != null &&
      (r = r.maps) != null &&
      r.importLibrary
        ? (this.serializedApiParams ||
            (this.loadingStatus = Zt.LOADED),
          this.notifyLoadingStatusListeners())
        : ((this.serializedApiParams = i), this.initImportLibrary(t)),
      this.serializedApiParams &&
        this.serializedApiParams !== i &&
        console.warn(
          "[google-maps-api-loader] The maps API has already been loaded with different parameters and will not be loaded again. Refresh the page for new values to have effect.",
        );
    const l = ["maps", ...o];
    await Promise.all(l.map((a) => google.maps.importLibrary(a)));
  }
  static serializeParams(t) {
    return [
      t.v,
      t.key,
      t.language,
      t.region,
      t.authReferrerPolicy,
      t.solutionChannel,
    ].join("/");
  }
  static initImportLibrary(t) {
    if (
      (window.google || (window.google = {}),
      window.google.maps || (window.google.maps = {}),
      window.google.maps.importLibrary)
    ) {
      console.error(
        "[google-maps-api-loader-internal]: initImportLibrary must only be called once",
      );
      return;
    }
    let n = null;
    const r = () =>
      n ||
      ((n = new Promise((o, i) => {
        var l;
        const a = document.createElement("script"),
          s = new URLSearchParams();
        for (const [u, c] of Object.entries(t)) {
          const f = u.replace(
            /[A-Z]/g,
            (h) => "_" + h[0].toLowerCase(),
          );
          s.set(f, String(c));
        }
        s.set("loading", "async"),
          s.set("callback", "__googleMapsCallback__"),
          (a.async = !0),
          (a.src = Gw + "?" + s.toString()),
          (a.nonce =
            ((l = document.querySelector("script[nonce]")) == null
              ? void 0
              : l.nonce) || ""),
          (a.onerror = () => {
            (this.loadingStatus = Zt.FAILED),
              this.notifyLoadingStatusListeners(),
              i(
                new Error(
                  "The Google Maps JavaScript API could not load.",
                ),
              );
          }),
          (window.__googleMapsCallback__ = () => {
            (this.loadingStatus = Zt.LOADED),
              this.notifyLoadingStatusListeners(),
              o();
          }),
          (window.gm_authFailure = () => {
            (this.loadingStatus = Zt.AUTH_FAILURE),
              this.notifyLoadingStatusListeners();
          }),
          (this.loadingStatus = Zt.LOADING),
          this.notifyLoadingStatusListeners(),
          document.head.append(a);
      })),
      n);
    google.maps.importLibrary = (o) =>
      r().then(() => google.maps.importLibrary(o));
  }
  static notifyLoadingStatusListeners() {
    for (const t of this.listeners) t(this.loadingStatus);
  }
}
ri.loadingStatus = Zt.NOT_LOADED;
ri.serializedApiParams = void 0;
ri.listeners = [];
const Qw = ["onLoad", "onError", "apiKey", "version", "libraries"],
  Yw = ["children"],
  Xw = "GMP_visgl_rgmlibrary_v1_default",
  fi = oe.createContext(null);
function Jw() {
  const [e, t] = y.useState({});
  return {
    mapInstances: e,
    addMapInstance: (i, l = "default") => {
      t((a) => Gt({}, a, { [l]: i }));
    },
    removeMapInstance: (i = "default") => {
      t((l) => lr(l, [i].map(Kw)));
    },
    clearMapInstances: () => {
      t({});
    },
  };
}
function Zw(e) {
  const {
      onLoad: t,
      onError: n,
      apiKey: r,
      version: o,
      libraries: i = [],
    } = e,
    l = lr(e, Qw),
    [a, s] = y.useState(ri.loadingStatus),
    [u, c] = y.useReducer(
      (m, x) => (m[x.name] ? m : Gt({}, m, { [x.name]: x.value })),
      {},
    ),
    f = y.useMemo(() => (i == null ? void 0 : i.join(",")), [i]),
    h = y.useMemo(
      () => JSON.stringify(Gt({ apiKey: r, version: o }, l)),
      [r, o, l],
    ),
    S = y.useCallback(
      async (m) => {
        var x;
        if (u[m]) return u[m];
        if (
          !(
            (x = google) != null &&
            (x = x.maps) != null &&
            x.importLibrary
          )
        )
          throw new Error(
            "[api-provider-internal] importLibrary was called before google.maps.importLibrary was defined.",
          );
        const k = await window.google.maps.importLibrary(m);
        return c({ name: m, value: k }), k;
      },
      [u],
    );
  return (
    y.useEffect(() => {
      (async () => {
        try {
          const m = Gt({ key: r }, l);
          o && (m.v = o),
            (f == null ? void 0 : f.length) > 0 && (m.libraries = f),
            (m.channel === void 0 ||
              m.channel < 0 ||
              m.channel > 999) &&
              delete m.channel,
            m.solutionChannel === void 0
              ? (m.solutionChannel = Xw)
              : m.solutionChannel === "" && delete m.solutionChannel,
            await ri.load(m, (x) => s(x));
          for (const x of ["core", "maps", ...i]) await S(x);
          t && t();
        } catch (m) {
          n
            ? n(m)
            : console.error(
                "<ApiProvider> failed to load the Google Maps JavaScript API",
                m,
              );
        }
      })();
    }, [r, f, h]),
    { status: a, loadedLibraries: u, importLibrary: S }
  );
}
const qw = (e) => {
  const { children: t } = e,
    n = lr(e, Yw),
    {
      mapInstances: r,
      addMapInstance: o,
      removeMapInstance: i,
      clearMapInstances: l,
    } = Jw(),
    { status: a, loadedLibraries: s, importLibrary: u } = Zw(n),
    c = y.useMemo(
      () => ({
        mapInstances: r,
        addMapInstance: o,
        removeMapInstance: i,
        clearMapInstances: l,
        status: a,
        loadedLibraries: s,
        importLibrary: u,
      }),
      [r, o, i, l, a, s, u],
    );
  return oe.createElement(fi.Provider, { value: c }, t);
};
function eS(e, t) {
  for (const n of oS) {
    const r = t[n],
      o = Fm[n];
    y.useEffect(() => {
      if (!e || !r) return;
      const i = google.maps.event.addListener(e, o, (l) => {
        r(tS(o, e, l));
      });
      return () => i.remove();
    }, [e, o, r]);
  }
}
function tS(e, t, n) {
  const r = {
    type: e,
    map: t,
    detail: {},
    stoppable: !1,
    stop: () => {},
  };
  if (nS.includes(e)) {
    const i = r,
      l = t.getCenter(),
      a = t.getZoom(),
      s = t.getHeading() || 0,
      u = t.getTilt() || 0,
      c = t.getBounds();
    return (
      (!l || !c || !Number.isFinite(a)) &&
        console.warn(
          "[createEvent] at least one of the values from the map returned undefined. This is not expected to happen. Please report an issue at https://github.com/visgl/react-google-maps/issues/new",
        ),
      (i.detail = {
        center: (l == null ? void 0 : l.toJSON()) || {
          lat: 0,
          lng: 0,
        },
        zoom: a || 0,
        heading: s,
        tilt: u,
        bounds: (c == null ? void 0 : c.toJSON()) || {
          north: 90,
          east: 180,
          south: -90,
          west: -180,
        },
      }),
      i
    );
  } else if (rS.includes(e)) {
    var o;
    if (!n)
      throw new Error(
        "[createEvent] mouse events must provide a srcEvent",
      );
    const i = r;
    return (
      (i.domEvent = n.domEvent),
      (i.stoppable = !0),
      (i.stop = () => n.stop()),
      (i.detail = {
        latLng:
          ((o = n.latLng) == null ? void 0 : o.toJSON()) || null,
        placeId: n.placeId,
      }),
      i
    );
  }
  return r;
}
const Fm = {
    onBoundsChanged: "bounds_changed",
    onCenterChanged: "center_changed",
    onClick: "click",
    onContextmenu: "contextmenu",
    onDblclick: "dblclick",
    onDrag: "drag",
    onDragend: "dragend",
    onDragstart: "dragstart",
    onHeadingChanged: "heading_changed",
    onIdle: "idle",
    onIsFractionalZoomEnabledChanged:
      "isfractionalzoomenabled_changed",
    onMapCapabilitiesChanged: "mapcapabilities_changed",
    onMapTypeIdChanged: "maptypeid_changed",
    onMousemove: "mousemove",
    onMouseout: "mouseout",
    onMouseover: "mouseover",
    onProjectionChanged: "projection_changed",
    onRenderingTypeChanged: "renderingtype_changed",
    onTilesLoaded: "tilesloaded",
    onTiltChanged: "tilt_changed",
    onZoomChanged: "zoom_changed",
    onCameraChanged: "bounds_changed",
  },
  nS = [
    "bounds_changed",
    "center_changed",
    "heading_changed",
    "tilt_changed",
    "zoom_changed",
  ],
  rS = [
    "click",
    "contextmenu",
    "dblclick",
    "mousemove",
    "mouseout",
    "mouseover",
  ],
  oS = Object.keys(Fm);
function Im(e, t) {
  const n = y.useRef(void 0);
  (!n.current || !Hw(t, n.current)) && (n.current = t),
    y.useEffect(e, n.current);
}
const iS = new Set([
  "backgroundColor",
  "clickableIcons",
  "controlSize",
  "disableDefaultUI",
  "disableDoubleClickZoom",
  "draggable",
  "draggableCursor",
  "draggingCursor",
  "fullscreenControl",
  "fullscreenControlOptions",
  "gestureHandling",
  "headingInteractionEnabled",
  "isFractionalZoomEnabled",
  "keyboardShortcuts",
  "mapTypeControl",
  "mapTypeControlOptions",
  "mapTypeId",
  "maxZoom",
  "minZoom",
  "noClear",
  "panControl",
  "panControlOptions",
  "restriction",
  "rotateControl",
  "rotateControlOptions",
  "scaleControl",
  "scaleControlOptions",
  "scrollwheel",
  "streetView",
  "streetViewControl",
  "streetViewControlOptions",
  "styles",
  "tiltInteractionEnabled",
  "zoomControl",
  "zoomControlOptions",
]);
function lS(e, t) {
  const n = {},
    r = Object.keys(t);
  for (const o of r) iS.has(o) && (n[o] = t[o]);
  Im(() => {
    e && e.setOptions(n);
  }, [n]);
}
function Am() {
  var e;
  return (
    ((e = y.useContext(fi)) == null ? void 0 : e.status) ||
    Zt.NOT_LOADED
  );
}
function aS(e, t) {
  const { viewport: n, viewState: r } = t,
    o = !!n;
  return (
    y.useLayoutEffect(() => {
      if (!e || !r) return;
      const {
        latitude: i,
        longitude: l,
        bearing: a,
        pitch: s,
        zoom: u,
      } = r;
      e.moveCamera({
        center: { lat: i, lng: l },
        heading: a,
        tilt: s,
        zoom: u + 1,
      });
    }, [e, r]),
    o
  );
}
function sS(e) {
  return !e || typeof e != "object" || !("lat" in e && "lng" in e)
    ? !1
    : Number.isFinite(e.lat) && Number.isFinite(e.lng);
}
function $m(e) {
  return sS(e) ? e : e.toJSON();
}
function uS(e, t, n) {
  const r = n.center ? $m(n.center) : null;
  let o = null,
    i = null;
  r &&
    Number.isFinite(r.lat) &&
    Number.isFinite(r.lng) &&
    ((o = r.lat), (i = r.lng));
  const l = Number.isFinite(n.zoom) ? n.zoom : null,
    a = Number.isFinite(n.heading) ? n.heading : null,
    s = Number.isFinite(n.tilt) ? n.tilt : null;
  y.useLayoutEffect(() => {
    if (!e) return;
    const u = {};
    let c = !1;
    o !== null &&
      i !== null &&
      (t.current.center.lat !== o || t.current.center.lng !== i) &&
      ((u.center = { lat: o, lng: i }), (c = !0)),
      l !== null && t.current.zoom !== l && ((u.zoom = l), (c = !0)),
      a !== null &&
        t.current.heading !== a &&
        ((u.heading = a), (c = !0)),
      s !== null && t.current.tilt !== s && ((u.tilt = s), (c = !0)),
      c && e.moveCamera(u);
  });
}
const cS = () => {
  const e = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    display: "flex",
    flexFlow: "column nowrap",
    textAlign: "center",
    justifyContent: "center",
    fontSize: ".8rem",
    color: "rgba(0,0,0,0.6)",
    background: "#dddddd",
    padding: "1rem 1.5rem",
  };
  return oe.createElement(
    "div",
    { style: e },
    oe.createElement("h2", null, "Error: AuthFailure"),
    oe.createElement(
      "p",
      null,
      "A problem with your API key prevents the map from rendering correctly. Please make sure the value of the ",
      oe.createElement("code", null, "APIProvider.apiKey"),
      " prop is correct. Check the error-message in the console for further details.",
    ),
  );
};
function dS() {
  const [e, t] = y.useState(null),
    n = y.useCallback((r) => t(r), [t]);
  return [e, n];
}
function Um() {
  return Am() === Zt.LOADED;
}
function fS() {
  const [, e] = y.useReducer((t) => t + 1, 0);
  return e;
}
function pS(e, t) {
  const n = e.getCenter(),
    r = e.getZoom(),
    o = e.getHeading() || 0,
    i = e.getTilt() || 0,
    l = e.getBounds();
  (!n || !l || !Number.isFinite(r)) &&
    console.warn(
      "[useTrackedCameraState] at least one of the values from the map returned undefined. This is not expected to happen. Please report an issue at https://github.com/visgl/react-google-maps/issues/new",
    ),
    Object.assign(t.current, {
      center: (n == null ? void 0 : n.toJSON()) || { lat: 0, lng: 0 },
      zoom: r || 0,
      heading: o,
      tilt: i,
    });
}
function hS(e) {
  const t = fS(),
    n = y.useRef({
      center: { lat: 0, lng: 0 },
      heading: 0,
      tilt: 0,
      zoom: 0,
    });
  return (
    y.useEffect(() => {
      if (!e) return;
      const r = google.maps.event.addListener(
        e,
        "bounds_changed",
        () => {
          pS(e, n), t();
        },
      );
      return () => r.remove();
    }, [e, t]),
    n
  );
}
const mS = [
    "id",
    "defaultBounds",
    "defaultCenter",
    "defaultZoom",
    "defaultHeading",
    "defaultTilt",
    "reuseMaps",
    "renderingType",
    "colorScheme",
  ],
  gS = ["padding"];
class Ji {
  static has(t) {
    return this.entries[t] && this.entries[t].length > 0;
  }
  static pop(t) {
    return (this.entries[t] && this.entries[t].pop()) || null;
  }
  static push(t, n) {
    this.entries[t] || (this.entries[t] = []),
      this.entries[t].push(n);
  }
}
Ji.entries = {};
function vS(e, t) {
  const n = Um(),
    [r, o] = y.useState(null),
    [i, l] = dS(),
    a = hS(r),
    {
      id: s,
      defaultBounds: u,
      defaultCenter: c,
      defaultZoom: f,
      defaultHeading: h,
      defaultTilt: S,
      reuseMaps: m,
      renderingType: x,
      colorScheme: k,
    } = e,
    g = lr(e, mS),
    d = e.zoom !== void 0 || e.defaultZoom !== void 0,
    w = e.center !== void 0 || e.defaultCenter !== void 0;
  !u &&
    (!d || !w) &&
    console.warn(
      "<Map> component is missing configuration. You have to provide zoom and center (via the `zoom`/`defaultZoom` and `center`/`defaultCenter` props) or specify the region to show using `defaultBounds`. See https://visgl.github.io/react-google-maps/docs/api-reference/components/map#required",
    ),
    !g.center && c && (g.center = c),
    !g.zoom && Number.isFinite(f) && (g.zoom = f),
    !g.heading && Number.isFinite(h) && (g.heading = h),
    !g.tilt && Number.isFinite(S) && (g.tilt = S);
  for (const P of Object.keys(g)) g[P] === void 0 && delete g[P];
  const v = y.useRef();
  return (
    y.useEffect(() => {
      if (!i || !n) return;
      const { addMapInstance: P, removeMapInstance: R } = t,
        { mapId: T } = e,
        L = `${T || "default"}:${x || "default"}:${k || "LIGHT"}`;
      let z, F;
      if (
        (m && Ji.has(L)
          ? ((F = Ji.pop(L)),
            (z = F.getDiv()),
            i.appendChild(z),
            F.setOptions(g),
            setTimeout(() => F.setCenter(F.getCenter()), 0))
          : ((z = document.createElement("div")),
            (z.style.height = "100%"),
            i.appendChild(z),
            (F = new google.maps.Map(
              z,
              Gt(
                {},
                g,
                x ? { renderingType: x } : {},
                k ? { colorScheme: k } : {},
              ),
            ))),
        o(F),
        P(F, s),
        u)
      ) {
        const { padding: Y } = u,
          ue = lr(u, gS);
        F.fitBounds(ue, Y);
      } else
        (!d || !w) &&
          F.fitBounds({
            east: 180,
            west: -180,
            south: -90,
            north: 90,
          });
      if (v.current) {
        const { mapId: Y, cameraState: ue } = v.current;
        Y !== T && F.setOptions(ue);
      }
      return () => {
        (v.current = { mapId: T, cameraState: a.current }),
          z.remove(),
          m
            ? Ji.push(L, F)
            : google.maps.event.clearInstanceListeners(F),
          o(null),
          R(s);
      };
    }, [i, n, s, e.mapId, e.renderingType, e.colorScheme]),
    [r, l, a]
  );
}
const bm = oe.createContext(null),
  Tc = (e) => {
    const { children: t, id: n, className: r, style: o } = e,
      i = y.useContext(fi),
      l = Am();
    if (!i)
      throw new Error(
        "<Map> can only be used inside an <ApiProvider> component.",
      );
    const [a, s, u] = vS(e, i);
    uS(a, u, e), eS(a, e), lS(a, e);
    const c = aS(a, e),
      f = !!e.controlled;
    y.useEffect(() => {
      if (a)
        return (
          c && a.setOptions({ disableDefaultUI: !0 }),
          (c || f) &&
            a.setOptions({
              gestureHandling: "none",
              keyboardShortcuts: !1,
            }),
          () => {
            a.setOptions({
              gestureHandling: e.gestureHandling,
              keyboardShortcuts: e.keyboardShortcuts,
            });
          }
        );
    }, [a, c, f, e.gestureHandling, e.keyboardShortcuts]);
    const h = e.center ? $m(e.center) : null;
    let S = null,
      m = null;
    h &&
      Number.isFinite(h.lat) &&
      Number.isFinite(h.lng) &&
      ((S = h.lat), (m = h.lng));
    const x = y.useMemo(() => {
      var d, w, v, P, R;
      return {
        center: {
          lat: (d = S) != null ? d : 0,
          lng: (w = m) != null ? w : 0,
        },
        zoom: (v = e.zoom) != null ? v : 0,
        heading: (P = e.heading) != null ? P : 0,
        tilt: (R = e.tilt) != null ? R : 0,
      };
    }, [S, m, e.zoom, e.heading, e.tilt]);
    y.useLayoutEffect(() => {
      if (!a || !f) return;
      a.moveCamera(x);
      const d = a.addListener("bounds_changed", () => {
        a.moveCamera(x);
      });
      return () => d.remove();
    }, [a, f, x]);
    const k = y.useMemo(
        () =>
          Gt(
            {
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: c ? -1 : 0,
            },
            o,
          ),
        [o, c],
      ),
      g = y.useMemo(() => ({ map: a }), [a]);
    return l === Zt.AUTH_FAILURE
      ? oe.createElement(
          "div",
          {
            style: Gt({ position: "relative" }, r ? {} : k),
            className: r,
          },
          oe.createElement(cS, null),
        )
      : oe.createElement(
          "div",
          Gt(
            {
              ref: s,
              "data-testid": "map",
              style: r ? void 0 : k,
              className: r,
            },
            n ? { id: n } : {},
          ),
          a ? oe.createElement(bm.Provider, { value: g }, t) : null,
        );
  };
Tc.deckGLViewProps = !0;
const jf = new Set();
function yS(...e) {
  const t = JSON.stringify(e);
  jf.has(t) || (jf.add(t), console.error(...e));
}
const Ea = (e = null) => {
  const t = y.useContext(fi),
    { map: n } = y.useContext(bm) || {};
  if (t === null)
    return (
      yS(
        "useMap(): failed to retrieve APIProviderContext. Make sure that the <APIProvider> component exists and that the component you are calling `useMap()` from is a sibling of the <APIProvider>.",
      ),
      null
    );
  const { mapInstances: r } = t;
  return e !== null ? r[e] || null : n || r.default || null;
};
function Rc(e) {
  const t = Um(),
    n = y.useContext(fi);
  return (
    y.useEffect(() => {
      !t || !n || n.importLibrary(e);
    }, [t, n, e]),
    (n == null ? void 0 : n.loadedLibraries[e]) || null
  );
}
function Mr(e, t, n) {
  y.useEffect(() => {
    if (!e || !t || !n) return;
    const r = google.maps.event.addListener(e, t, n);
    return () => r.remove();
  }, [e, t, n]);
}
function zi(e, t, n) {
  y.useEffect(() => {
    e && (e[t] = n);
  }, [e, t, n]);
}
function Nf(e, t, n) {
  y.useEffect(() => {
    if (!(!e || !t || !n))
      return (
        e.addEventListener(t, n), () => e.removeEventListener(t, n)
      );
  }, [e, t, n]);
}
function wS(e) {
  return e.content !== void 0;
}
function SS(e) {
  return e.nodeType === Node.ELEMENT_NODE;
}
const xS = oe.createContext(null),
  CS = {
    TOP_LEFT: ["0%", "0%"],
    TOP_CENTER: ["50%", "0%"],
    TOP: ["50%", "0%"],
    TOP_RIGHT: ["100%", "0%"],
    LEFT_CENTER: ["0%", "50%"],
    LEFT_TOP: ["0%", "0%"],
    LEFT: ["0%", "50%"],
    LEFT_BOTTOM: ["0%", "100%"],
    RIGHT_TOP: ["100%", "0%"],
    RIGHT: ["100%", "50%"],
    RIGHT_CENTER: ["100%", "50%"],
    RIGHT_BOTTOM: ["100%", "100%"],
    BOTTOM_LEFT: ["0%", "100%"],
    BOTTOM_CENTER: ["50%", "100%"],
    BOTTOM: ["50%", "100%"],
    BOTTOM_RIGHT: ["100%", "100%"],
    CENTER: ["50%", "50%"],
  },
  ES = ({ children: e, styles: t, className: n, anchorPoint: r }) => {
    const [o, i] = r ?? CS.BOTTOM,
      l = `translate(50%, 100%) translate(-${o}, -${i})`;
    return oe.createElement(
      "div",
      { style: { transform: l } },
      oe.createElement("div", { className: n, style: t }, e),
    );
  };
function kS(e) {
  const [t, n] = y.useState(null),
    [r, o] = y.useState(null),
    i = Ea(),
    l = Rc("marker"),
    {
      children: a,
      onClick: s,
      className: u,
      onMouseEnter: c,
      onMouseLeave: f,
      onDrag: h,
      onDragStart: S,
      onDragEnd: m,
      collisionBehavior: x,
      clickable: k,
      draggable: g,
      position: d,
      title: w,
      zIndex: v,
    } = e,
    P = y.Children.count(a);
  return (
    y.useEffect(() => {
      if (!i || !l) return;
      const R = new l.AdvancedMarkerElement();
      (R.map = i), n(R);
      let T = null;
      return (
        P > 0 &&
          ((T = document.createElement("div")),
          (T.isCustomMarker = !0),
          (R.content = T),
          o(T)),
        () => {
          var L;
          (R.map = null),
            (L = T) == null || L.remove(),
            n(null),
            o(null);
        }
      );
    }, [i, l, P]),
    y.useEffect(() => {
      !t || !t.content || P > 0 || (t.content.className = u || "");
    }, [t, u, P]),
    zi(t, "position", d),
    zi(t, "title", w ?? ""),
    zi(t, "zIndex", v),
    zi(t, "collisionBehavior", x),
    y.useEffect(() => {
      t &&
        (g !== void 0
          ? (t.gmpDraggable = g)
          : h || S || m
            ? (t.gmpDraggable = !0)
            : (t.gmpDraggable = !1));
    }, [t, g, h, m, S]),
    y.useEffect(() => {
      if (!t) return;
      const R = k !== void 0 || !!s || !!c || !!f;
      (t.gmpClickable = R),
        R &&
          t != null &&
          t.content &&
          SS(t.content) &&
          ((t.content.style.pointerEvents = "none"),
          t.content.firstElementChild &&
            (t.content.firstElementChild.style.pointerEvents =
              "all"));
    }, [t, k, s, c, f]),
    Mr(t, "click", s),
    Mr(t, "drag", h),
    Mr(t, "dragstart", S),
    Mr(t, "dragend", m),
    Nf(t == null ? void 0 : t.element, "mouseenter", c),
    Nf(t == null ? void 0 : t.element, "mouseleave", f),
    [t, r]
  );
}
const Lc = y.forwardRef((e, t) => {
  const { children: n, style: r, className: o, anchorPoint: i } = e,
    [l, a] = kS(e),
    s = y.useMemo(() => (l ? { marker: l } : null), [l]);
  return (
    y.useImperativeHandle(t, () => l, [l]),
    a
      ? oe.createElement(
          xS.Provider,
          { value: s },
          tr.createPortal(
            oe.createElement(
              ES,
              { anchorPoint: i, styles: r, className: o },
              n,
            ),
            a,
          ),
        )
      : null
  );
});
function _S(e, t, n) {
  if (t != null && typeof t != "object")
    throw new Error(
      "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.",
    );
  const r = e.style;
  if (n == null) {
    if (t == null) return;
    for (const o in t) t.hasOwnProperty(o) && Tf(r, o, t[o]);
    return;
  }
  for (const o in n)
    n.hasOwnProperty(o) &&
      (t == null || !t.hasOwnProperty(o)) &&
      (o.indexOf("--") === 0
        ? r.setProperty(o, "")
        : o === "float"
          ? (r.cssFloat = "")
          : (r[o] = ""));
  if (t != null)
    for (const o in t) {
      const i = t[o];
      t.hasOwnProperty(o) && n[o] !== i && Tf(r, o, i);
    }
}
function Tf(e, t, n) {
  const r = t.indexOf("--") === 0;
  n == null || typeof n == "boolean" || n === ""
    ? r
      ? e.setProperty(t, "")
      : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
    : r
      ? e.setProperty(t, n)
      : typeof n == "number" && n !== 0 && !jS(t)
        ? (e[t] = n + "px")
        : t === "float"
          ? (e.cssFloat = n)
          : (e[t] = ("" + n).trim());
}
const PS = new Set([
  "animationIterationCount",
  "aspectRatio",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "columns",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "gridArea",
  "gridRow",
  "gridRowEnd",
  "gridRowSpan",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnSpan",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "scale",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
  "fillOpacity",
  "floodOpacity",
  "stopOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
]);
function jS(e) {
  return PS.has(e);
}
const NS = [
    "children",
    "headerContent",
    "style",
    "className",
    "pixelOffset",
    "anchor",
    "shouldFocus",
    "onClose",
    "onCloseClick",
  ],
  TS = (e) => {
    const {
        children: t,
        headerContent: n,
        style: r,
        className: o,
        pixelOffset: i,
        anchor: l,
        shouldFocus: a,
        onClose: s,
        onCloseClick: u,
      } = e,
      c = lr(e, NS),
      f = Rc("maps"),
      [h, S] = y.useState(null),
      m = y.useRef(null),
      x = y.useRef(null);
    y.useEffect(() => {
      if (!f) return;
      (m.current = document.createElement("div")),
        (x.current = document.createElement("div"));
      const d = c;
      i && (d.pixelOffset = new google.maps.Size(i[0], i[1])),
        n && (d.headerContent = typeof n == "string" ? n : x.current);
      const w = new google.maps.InfoWindow(c);
      return (
        w.setContent(m.current),
        S(w),
        () => {
          var v, P;
          w.setContent(null),
            (v = m.current) == null || v.remove(),
            (P = x.current) == null || P.remove(),
            (m.current = null),
            (x.current = null),
            S(null);
        }
      );
    }, [f]);
    const k = y.useRef(null);
    y.useEffect(() => {
      !h ||
        !m.current ||
        (_S(m.current, r || null, k.current),
        (k.current = r || null),
        o !== m.current.className && (m.current.className = o || ""));
    }, [h, o, r]),
      Im(() => {
        if (!h) return;
        const d = c;
        i
          ? (d.pixelOffset = new google.maps.Size(i[0], i[1]))
          : (d.pixelOffset = null),
          n
            ? (d.headerContent = typeof n == "string" ? n : x.current)
            : (d.headerContent = null),
          h.setOptions(c);
      }, [c, i, n]),
      Mr(h, "close", s),
      Mr(h, "closeclick", u);
    const g = Ea();
    return (
      y.useEffect(() => {
        if (!g || !h || l === null) return;
        const d = !!l,
          w = { map: g };
        if (
          l &&
          ((w.anchor = l), wS(l) && l.content instanceof Element)
        ) {
          const P = l.content,
            R = P == null ? void 0 : P.getBoundingClientRect();
          if (R && P != null && P.isCustomMarker) {
            var v;
            const T =
                (v = l.content.firstElementChild) == null
                  ? void 0
                  : v.firstElementChild,
              L = T == null ? void 0 : T.getBoundingClientRect(),
              z = L.x - R.x + (L.width - R.width) / 2,
              F = L.y - R.y,
              Y = c;
            (Y.pixelOffset = new google.maps.Size(
              i ? i[0] + z : z,
              i ? i[1] + F : F,
            )),
              h.setOptions(Y);
          }
        }
        return (
          a !== void 0 && (w.shouldFocus = a),
          h.open(w),
          () => {
            d && h.set("anchor", null), h.close();
          }
        );
      }, [h, l, g, a, c, i]),
      oe.createElement(
        oe.Fragment,
        null,
        m.current && tr.createPortal(t, m.current),
        x.current !== null && tr.createPortal(n, x.current),
      )
    );
  },
  RS = [
    "onClick",
    "onDrag",
    "onDragStart",
    "onDragEnd",
    "onMouseOver",
    "onMouseOut",
  ];
function LS(e) {
  const [t, n] = y.useState(null),
    r = Ea(),
    {
      onClick: o,
      onDrag: i,
      onDragStart: l,
      onDragEnd: a,
      onMouseOver: s,
      onMouseOut: u,
    } = e,
    c = lr(e, RS),
    { position: f, draggable: h } = c;
  return (
    y.useEffect(() => {
      if (!r) {
        r === void 0 &&
          console.error("<Marker> has to be inside a Map component.");
        return;
      }
      const S = new google.maps.Marker(c);
      return (
        S.setMap(r),
        n(S),
        () => {
          S.setMap(null), n(null);
        }
      );
    }, [r]),
    y.useEffect(() => {
      if (!t) return;
      const S = t,
        m = google.maps.event;
      return (
        o && m.addListener(S, "click", o),
        i && m.addListener(S, "drag", i),
        l && m.addListener(S, "dragstart", l),
        a && m.addListener(S, "dragend", a),
        s && m.addListener(S, "mouseover", s),
        u && m.addListener(S, "mouseout", u),
        t.setDraggable(!!h),
        () => {
          m.clearInstanceListeners(S);
        }
      );
    }, [t, h, o, i, l, a, s, u]),
    y.useEffect(() => {
      t && c && t.setOptions(c);
    }, [t, c]),
    y.useEffect(() => {
      h || !f || !t || t.setPosition(f);
    }, [h, f, t]),
    t
  );
}
y.forwardRef((e, t) => {
  const n = LS(e);
  return (
    y.useImperativeHandle(t, () => n, [n]),
    oe.createElement(oe.Fragment, null)
  );
});
const et = y.createContext();
function MS({ children: e }) {
  const [t, n] = y.useState(null),
    [r, o] = y.useState([]),
    [i, l] = y.useState(!1),
    [a, s] = y.useState(t),
    [u, c] = y.useState(null),
    [f, h] = y.useState(5e3),
    [S, m] = y.useState([
      "gas_station",
      "electric_vehicle_charging_station",
    ]),
    [x, k] = y.useState(17),
    g = Ea(),
    d = {
      center: t,
      setCenter: n,
      nearbyStations: r,
      setNearbyStations: o,
      openSideMenu: i,
      setOpenSideMenu: l,
      newCenter: a,
      setNewCenter: s,
      selectedStation: u,
      setSelectedStation: c,
      radius: f,
      setRadius: h,
      map: g,
      filter: S,
      setFilter: m,
      zoom: x,
      setZoom: k,
    };
  return p.jsx(et.Provider, { value: d, children: e });
}
var Bm = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Rf = oe.createContext && oe.createContext(Bm),
  OS = ["attr", "size", "title"];
function DS(e, t) {
  if (e == null) return {};
  var n = zS(e, t),
    r,
    o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (o = 0; o < i.length; o++)
      (r = i[o]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function zS(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Tl() {
  return (
    (Tl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) &&
                (e[r] = n[r]);
          }
          return e;
        }),
    Tl.apply(this, arguments)
  );
}
function Lf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Rl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Lf(Object(n), !0).forEach(function (r) {
          FS(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            e,
            Object.getOwnPropertyDescriptors(n),
          )
        : Lf(Object(n)).forEach(function (r) {
            Object.defineProperty(
              e,
              r,
              Object.getOwnPropertyDescriptor(n, r),
            );
          });
  }
  return e;
}
function FS(e, t, n) {
  return (
    (t = IS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function IS(e) {
  var t = AS(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function AS(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError(
      "@@toPrimitive must return a primitive value.",
    );
  }
  return (t === "string" ? String : Number)(e);
}
function Vm(e) {
  return (
    e &&
    e.map((t, n) =>
      oe.createElement(t.tag, Rl({ key: n }, t.attr), Vm(t.child)),
    )
  );
}
function Qt(e) {
  return (t) =>
    oe.createElement(
      $S,
      Tl({ attr: Rl({}, e.attr) }, t),
      Vm(e.child),
    );
}
function $S(e) {
  var t = (n) => {
    var { attr: r, size: o, title: i } = e,
      l = DS(e, OS),
      a = o || n.size || "1em",
      s;
    return (
      n.className && (s = n.className),
      e.className && (s = (s ? s + " " : "") + e.className),
      oe.createElement(
        "svg",
        Tl(
          {
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "0",
          },
          n.attr,
          r,
          l,
          {
            className: s,
            style: Rl(
              Rl({ color: e.color || n.color }, n.style),
              e.style,
            ),
            height: a,
            width: a,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        i && oe.createElement("title", null, i),
        e.children,
      )
    );
  };
  return Rf !== void 0
    ? oe.createElement(Rf.Consumer, null, (n) => t(n))
    : t(Bm);
}
function US(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z",
        },
        child: [],
      },
    ],
  })(e);
}
function Hm(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z",
        },
        child: [],
      },
    ],
  })(e);
}
function bS(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z",
        },
        child: [],
      },
    ],
  })(e);
}
function BS(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
        },
        child: [],
      },
    ],
  })(e);
}
function VS(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z",
        },
        child: [],
      },
    ],
  })(e);
}
function HS(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 352 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z",
        },
        child: [],
      },
    ],
  })(e);
}
function WS(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z",
        },
        child: [],
      },
    ],
  })(e);
}
function KS(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z",
        },
        child: [],
      },
    ],
  })(e);
}
function fs(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z",
        },
        child: [],
      },
    ],
  })(e);
}
function Xr({
  modalComponent: e,
  itemText: t,
  onItemClick: n,
  onModalClose: r,
}) {
  const { setModalContent: o, setOnModalClose: i } = cr(),
    l = () => {
      r && i(r), o(e), typeof n == "function" && n();
    };
  return p.jsx("li", { onClick: l, children: t });
}
function GS() {
  const e = ha(),
    [t, n] = y.useState(""),
    [r, o] = y.useState(""),
    [i, l] = y.useState({}),
    { closeModal: a } = cr(),
    s = t.length <= 0 || r.length <= 0,
    u = async (c) => {
      c.preventDefault();
      const f = await e(Qi({ email: t, password: r }));
      f.type === "session/login/rejected" && l(f.payload),
        f.type === "session/login/fulfilled" && a();
    };
  return p.jsx(p.Fragment, {
    children: p.jsxs("div", {
      className: "header",
      children: [
        p.jsx("h1", { children: "Log In" }),
        p.jsx("form", {
          onSubmit: u,
          children: p.jsxs("div", {
            className: "input-field",
            children: [
              p.jsxs("label", {
                children: [
                  "Email",
                  p.jsx("input", {
                    type: "text",
                    value: t,
                    onChange: (c) => n(c.target.value),
                    required: !0,
                  }),
                ],
              }),
              i.email && p.jsx("p", { children: i.email }),
              p.jsxs("label", {
                children: [
                  "Password",
                  p.jsx("input", {
                    type: "password",
                    value: r,
                    onChange: (c) => o(c.target.value),
                    required: !0,
                  }),
                ],
              }),
              i.password && p.jsx("p", { children: i.password }),
              p.jsx("button", {
                disabled: s,
                type: "submit",
                children: "Log In",
              }),
              p.jsx("button", {
                className: "demo_btn",
                onClick: () => {
                  n("demo@example.com"), o("password");
                },
                children: "Demo User",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function QS() {
  const e = ha(),
    [t, n] = y.useState(""),
    [r, o] = y.useState(""),
    [i, l] = y.useState(""),
    [a, s] = y.useState(""),
    [u, c] = y.useState(""),
    [f, h] = y.useState({}),
    { closeModal: S } = cr();
  y.useEffect(() => {
    r.length <= 0, i.length <= 0;
  }, [t, r, i]);
  const m = async (x) => {
    if ((x.preventDefault(), a !== u))
      return h({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    const k = await e(
      Yi({ email: t, nick: r, password: a, name: i }),
    );
    k.type === "session/signup/rejected" ? h(k.payload) : S();
  };
  return p.jsx(p.Fragment, {
    children: p.jsxs("div", {
      className: "signup-header",
      children: [
        p.jsx("h1", { children: "Sign Up" }),
        f.server && p.jsx("p", { children: f.server }),
        p.jsx("form", {
          onSubmit: m,
          children: p.jsxs("div", {
            className: "input-field",
            children: [
              p.jsxs("label", {
                children: [
                  "Email",
                  p.jsx("input", {
                    type: "text",
                    value: t,
                    onChange: (x) => n(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              f.email && p.jsx("p", { children: f.email }),
              p.jsxs("label", {
                children: [
                  "Nickname",
                  p.jsx("input", {
                    type: "text",
                    value: r,
                    onChange: (x) => o(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              f.nick && p.jsx("p", { children: f.nick }),
              p.jsxs("label", {
                children: [
                  "Name",
                  p.jsx("input", {
                    type: "text",
                    value: i,
                    onChange: (x) => l(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              f.name && p.jsx("p", { children: f.name }),
              p.jsxs("label", {
                children: [
                  "Password",
                  p.jsx("input", {
                    type: "password",
                    value: a,
                    onChange: (x) => s(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              f.password && p.jsx("p", { children: f.password }),
              p.jsxs("label", {
                children: [
                  "Confirm Password",
                  p.jsx("input", {
                    type: "password",
                    value: u,
                    onChange: (x) => c(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              f.confirmPassword &&
                p.jsx("p", { children: f.confirmPassword }),
              p.jsx("button", {
                type: "submit",
                children: "Sign Up",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function YS({
  showMenu: e,
  sessionUser: t,
  logout: n,
  closeMenu: r,
  ulRef: o,
  userMenuClassName: i,
}) {
  return p.jsx(p.Fragment, {
    children:
      e &&
      p.jsx("ul", {
        className: `${i} profile-dropdown`,
        ref: o,
        children:
          t && t.nick
            ? p.jsxs("div", {
                className: "modal-item-container",
                children: [
                  p.jsx("li", { children: t.nick }),
                  p.jsx("li", { children: t.email }),
                  p.jsx("li", {
                    children: p.jsx("button", {
                      className: "logout-button",
                      onClick: n,
                      children: "Log Out",
                    }),
                  }),
                ],
              })
            : p.jsxs("div", {
                className: "modal-item-container",
                children: [
                  p.jsx(Xr, {
                    itemText: "Log In",
                    onItemClick: r,
                    modalComponent: p.jsx(GS, {}),
                  }),
                  p.jsx(Xr, {
                    itemText: "Sign Up",
                    onItemClick: r,
                    modalComponent: p.jsx(QS, {}),
                  }),
                ],
              }),
      }),
  });
}
function Wm({ location: e }) {
  const t = ha(),
    [n, r] = y.useState(!1),
    o = eo((c) => c.session.user),
    i = y.useRef(),
    l = e === "side-header" ? "side-header" : "nav-menu",
    a = (c) => {
      c.stopPropagation(), r(!n);
    };
  y.useEffect(() => {
    if (!n) return;
    const c = (f) => {
      i.current && !i.current.contains(f.target) && r(!1);
    };
    return (
      document.addEventListener("click", c),
      () => document.removeEventListener("click", c)
    );
  }, [n]);
  const s = () => r(!1),
    u = (c) => {
      c.preventDefault(), t(Xi()), s();
    };
  return p.jsxs(p.Fragment, {
    children: [
      p.jsx("button", {
        onClick: a,
        className: "user-icon-button",
        children: p.jsx(KS, { className: "user-icon" }),
      }),
      p.jsx(YS, {
        userMenuClassName: l,
        showMenu: n,
        sessionUser: o,
        logout: u,
        closeMenu: s,
        ulRef: i,
      }),
    ],
  });
}
function XS({ theme: e, toggleTheme: t }) {
  return p.jsx("button", {
    className: "icon",
    onClick: t,
    children:
      e === "dark"
        ? p.jsx("span", {
            className: "light",
            role: "img",
            "aria-label": "Light Mode",
            children: "☀️",
          })
        : p.jsx("span", {
            className: "dark",
            role: "img",
            "aria-label": "Dark Mode",
            children: "🌙",
          }),
  });
}
const Mc = y.createContext("dark");
function JS({ children: e }) {
  const [t, n] = y.useState("dark"),
    r = () => {
      n(t === "dark" ? "light" : "dark");
    };
  return (
    y.useEffect(() => {
      document.body.className = t;
    }, [t]),
    p.jsx(Mc.Provider, {
      value: { theme: t, toggleTheme: r },
      children: e,
    })
  );
}
function ka() {
  return y.useContext(Mc);
}
function ZS() {
  const { openSideMenu: e } = y.useContext(et),
    { theme: t, toggleTheme: n } = y.useContext(Mc);
  return e
    ? p.jsx(p.Fragment, {})
    : p.jsxs("ul", {
        className: `nav-data-container-${t}`,
        children: [
          p.jsx("li", {
            children: p.jsxs(Cm, {
              to: "/",
              className: `logo-container-${t}`,
              children: [
                p.jsx("img", {
                  src: "/Logo.ico",
                  className: "logo",
                  alt: "logo",
                }),
                p.jsx("p", { children: "Where da gas at?" }),
              ],
            }),
          }),
          p.jsx("li", {
            children: p.jsx(XS, { theme: t, toggleTheme: n }),
          }),
          p.jsx("li", {
            children: p.jsx(Wm, { location: "navigation-header" }),
          }),
        ],
      });
}
const _a = y.createContext();
function qS({ children: e }) {
  const [t, n] = y.useState([]),
    [r, o] = y.useState(!0),
    [i, l] = y.useState(null),
    [a, s] = y.useState(!1),
    u = {
      reviews: t,
      setReviews: n,
      loading: r,
      setLoading: o,
      error: i,
      setError: l,
      update: a,
      setUpdate: s,
    };
  return (
    y.useEffect(() => {
      (async () => {
        try {
          const f = await fetch("/api/review"),
            h = await f.json();
          if (!f.ok) throw new Error("Failed to fetch reviews");
          n(Object.values(h.review));
        } catch (f) {
          l(f.message);
        } finally {
          o(!1);
        }
      })();
    }, [a]),
    p.jsx(_a.Provider, { value: u, children: e })
  );
}
const Oc = y.createContext();
function ex({ children: e }) {
  const [t, n] = y.useState([]),
    [r, o] = y.useState(!0),
    [i, l] = y.useState(null),
    [a, s] = y.useState(!1),
    u = {
      prices: t,
      setPrices: n,
      loading: r,
      setLoading: o,
      error: i,
      setError: l,
      update: a,
      setUpdate: s,
    };
  return (
    y.useEffect(() => {
      (async () => {
        try {
          const f = await fetch("/api/price/"),
            h = await f.json();
          if (!f.ok) throw new Error("Failed to fetch prices");
          n(Object.values(h.price));
        } catch (f) {
          l(f.message);
        } finally {
          o(!1);
        }
      })();
    }, [a]),
    p.jsx(Oc.Provider, { value: u, children: e })
  );
}
function tx() {
  const e = ha(),
    [t, n] = y.useState(!1),
    r = ka();
  return (
    y.useEffect(() => {
      try {
        e(Fo()), n(!0);
      } catch (o) {
        console.error(o);
      }
    }, [e]),
    p.jsx(p.Fragment, {
      children: p.jsx(JS, {
        children: p.jsx(qw, {
          apiKey: "AIzaSyDVVvTrVTmS8Tp-GDpSwNwgw7m55B4J3EE",
          children: p.jsx(MS, {
            children: p.jsx(qS, {
              children: p.jsx(ex, {
                children: p.jsxs(bw, {
                  children: [
                    p.jsx("div", {
                      className: "align-body",
                      children: p.jsxs("div", {
                        className: `main-body-container-${r}`,
                        children: [p.jsx(ZS, {}), t && p.jsx(k1, {})],
                      }),
                    }),
                    p.jsx(Bw, {}),
                  ],
                }),
              }),
            }),
          }),
        }),
      }),
    })
  );
}
const nx = "AIzaSyDVVvTrVTmS8Tp-GDpSwNwgw7m55B4J3EE",
  rx = () => {
    const { setCenter: e, center: t } = y.useContext(et);
    return (
      y.useEffect(() => {
        (async () => {
          const r = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          try {
            const i = await (
              await fetch(
                `https://www.googleapis.com/geolocation/v1/geolocate?key=${nx}`,
                r,
              )
            ).json();
            e(i.location);
          } catch (o) {
            console.error("Error fetching geolocation:", o);
          }
        })();
      }, [e]),
      t
    );
  };
function ox({ station: e, primaryType: t }) {
  const {
    setSelectedStation: n,
    setNewCenter: r,
    setOpenSideMenu: o,
  } = y.useContext(et);
  let i = "";
  t === "gas_station" && (i = "/gasIcon.svg"),
    t === "electric_vehicle_charging_station" && (i = "/evIcon.svg");
  function l(a) {
    n(a),
      r({ lat: a.location.latitude, lng: a.location.longitude }),
      o(!1);
  }
  return p.jsxs("div", {
    className: "station-card-container",
    onClick: () => l(e),
    children: [
      p.jsxs("div", {
        className: "station-card-header",
        children: [
          p.jsx("img", {
            src: i,
            alt: "icon",
            className: "station-card-icon",
          }),
          p.jsx("h3", {
            className: "station-display-name",
            children: e.displayName.text,
          }),
        ],
      }),
      p.jsx("ul", { className: "under-line" }),
    ],
  });
}
const ix = "AIzaSyDVVvTrVTmS8Tp-GDpSwNwgw7m55B4J3EE";
function lx({ center: e }) {
  const {
      nearbyStations: t,
      setNearbyStations: n,
      radius: r,
      map: o,
      filter: i,
    } = y.useContext(et),
    l = Rc("places");
  return (
    y.useEffect(() => {
      if (!l || !e) return;
      const a = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": ix,
          "X-Goog-FieldMask": "*",
        },
        body: JSON.stringify({
          locationRestriction: {
            circle: {
              center: { latitude: e.lat, longitude: e.lng },
              radius: r,
            },
          },
          includedPrimaryTypes: i,
        }),
      };
      async function s() {
        try {
          const c = await (
            await fetch(
              "https://places.googleapis.com/v1/places:searchNearby",
              a,
            )
          ).json();
          n(c.places);
        } catch (u) {
          console.error("Error fetching nearby places:", u);
        }
      }
      s();
    }, [l, e, n, r, o, i]),
    t
  );
}
function ax() {
  const {
      radius: e,
      setRadius: t,
      setFilter: n,
      filter: r,
    } = y.useContext(et),
    [o, i] = y.useState(e),
    [l, a] = y.useState(r);
  function s(f) {
    f.preventDefault(), t(o), n(l);
  }
  const u = [
      { label: "Gas Station", value: "gas_station" },
      {
        label: "Electric Vehicle Charging Station",
        value: "electric_vehicle_charging_station",
      },
    ],
    c = (f) => {
      const { value: h, checked: S } = f.target;
      a(S ? (m) => [...m, h] : (m) => m.filter((x) => x !== h));
    };
  return p.jsxs("form", {
    className: "filter-body-container",
    onSubmit: s,
    children: [
      p.jsxs("p", { children: ["Radius: ", o, " meters"] }),
      p.jsx("input", {
        type: "range",
        min: "5000",
        max: "30000",
        value: o,
        onChange: (f) => i(f.target.value),
      }),
      p.jsx("input", { type: "submit", value: "Submit" }),
      u.map((f) =>
        p.jsx(
          "div",
          {
            children: p.jsxs("label", {
              children: [
                p.jsx("input", {
                  type: "checkbox",
                  value: f.value,
                  checked: l.includes(f.value),
                  onChange: c,
                }),
                f.label,
              ],
            }),
          },
          f.value,
        ),
      ),
    ],
  });
}
function sx() {
  return p.jsxs("div", {
    className: "header-container",
    children: [
      p.jsx("div", {
        className: "user-icon-container",
        children: p.jsx(Wm, { location: "side-header" }),
      }),
      p.jsx("h2", {
        className: "side-menu-display-title",
        children: "Nearby Stations",
      }),
      p.jsx("div", {
        className: "filter-button",
        children: p.jsx(Xr, {
          itemText: "Filters",
          modalComponent: p.jsx(ax, {}),
        }),
      }),
    ],
  });
}
function ux({ openSideMenu: e }) {
  const { center: t } = y.useContext(et),
    n = lx({ center: t });
  return p.jsxs("section", {
    className: `side-menu-display-container ${e ? "open-side-menu" : "close-side-menu"}`,
    children: [
      p.jsx(sx, {}),
      p.jsx("div", {
        className: "station-list-container",
        children:
          n &&
          n.length > 0 &&
          n.map((r) => {
            const o = r.primaryType;
            return p.jsx(ox, { station: r, primaryType: o }, r.id);
          }),
      }),
    ],
  });
}
function cx({
  markerContext: e = "location",
  position: t,
  stationTypes: n,
  station: r,
}) {
  const {
      setSelectedStation: o,
      setZoom: i,
      setNewCenter: l,
    } = y.useContext(et),
    a = () => {
      o(r), i(16), l({ lat: t.latitude, lng: t.longitude });
    };
  return e === "location"
    ? p.jsx(Lc, {
        position: { lat: t.latitude, lng: t.longitude },
        onClick: a,
        children: n.includes("electric_vehicle_charging_station")
          ? p.jsx("div", {
              className: "icon-container",
              children: p.jsx("img", {
                src: "/evIcon.svg",
                className: "icon",
              }),
            })
          : p.jsx("div", {
              className: "icon-container",
              children: p.jsx("img", {
                src: "/gasIcon.svg",
                className: "icon",
              }),
            }),
      })
    : p.jsx("div", { children: "AdvanceMarkerComponent" });
}
function dx({ nearbyStations: e }) {
  return p.jsx(p.Fragment, {
    children:
      e &&
      e.length > 0 &&
      e.map((t) => {
        const n = t.types;
        return p.jsx(
          "div",
          {
            className: "station-map-marker",
            children: p.jsx(cx, {
              center: location,
              station: t,
              position: t.location,
              stationTypes: n,
            }),
          },
          t.id,
        );
      }),
  });
}
function Dc() {
  const { selectedStation: e } = y.useContext(et),
    [t, n] = y.useState([]);
  return (
    y.useEffect(() => {
      (async () => {
        if (e && e.photos && e.photos.length > 0) {
          const o = e.photos,
            i = await Promise.all(
              o.map(async (l) => {
                const a = l.name,
                  s = await fetch(
                    `https://places.googleapis.com/v1/${a}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDVVvTrVTmS8Tp-GDpSwNwgw7m55B4J3EE`,
                  );
                if (!s.ok)
                  throw new Error(`HTTP error! status: ${s.status}`);
                return s.url;
              }),
            );
          n(i);
        }
      })();
    }, [e]),
    t
  );
}
function zc(e) {
  return Qt({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: { fill: "none", d: "M0 0h24v24H0z" },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "m21.9 21.9-8.49-8.49-9.82-9.82L2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 18l3.5-4.5 2.5 3.01L12.17 15l3 3H5zm16 .17L5.83 3H19c1.1 0 2 .9 2 2v13.17z",
        },
        child: [],
      },
    ],
  })(e);
}
function fx() {
  const { closeModal: e } = cr(),
    { selectedStation: t } = y.useContext(et),
    n = Dc(),
    r = eo((a) => a.session.user),
    [o, i] = y.useState(null),
    l = async () => {
      if (!r || !r.saved_stations) {
        console.log("User must be signed in to save a station");
        return;
      }
      try {
        if (
          !(
            await fetch(`/api/king/current/station/${String(t.id)}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(t),
            })
          ).ok
        )
          throw new Error("Network response was not ok");
        const s = "Station saved successfully: " + t.displayName.text;
        i(s);
      } catch (a) {
        console.error("Failed to save station:", a);
      }
    };
  return (
    console.log(o),
    o
      ? p.jsxs("div", {
          className: "modal-body",
          children: [
            p.jsx("h3", { className: "modal-question", children: o }),
            p.jsx("button", {
              className: "button-design",
              onClick: e,
              children: "Close",
            }),
          ],
        })
      : p.jsxs("div", {
          className: "modal-body",
          children: [
            p.jsx("h3", {
              className: "modal-question",
              children: "Are you sure you want to save this station?",
            }),
            p.jsxs("div", {
              className: "station-data-display",
              children: [
                p.jsx("h3", { children: t.displayName.text }),
                p.jsx("p", { children: t.formattedAddress }),
                t &&
                t.photos &&
                (t == null ? void 0 : t.photos.length) > 0
                  ? p.jsx("img", {
                      className: "image",
                      src: n[0],
                      alt: `${t.displayName.text} image`,
                    })
                  : p.jsx("div", {
                      className: "image",
                      children: p.jsx(zc, {}),
                    }),
              ],
            }),
            p.jsxs("div", {
              className: "button-container",
              children: [
                p.jsx("button", {
                  className: "button-design",
                  onClick: l,
                  children: "Save",
                }),
                p.jsx("button", {
                  className: "button-design",
                  onClick: e,
                  children: "Nahh I'm good",
                }),
              ],
            }),
          ],
        })
  );
}
function px() {
  return p.jsx("div", {
    children: p.jsx(Xr, {
      itemText: p.jsx(Hm, { className: "bookmark-icon" }),
      modalComponent: p.jsx(fx, {}),
    }),
  });
}
function Km({ selectedStation: e, photoUrl: t }) {
  var r;
  const { closeModal: n } = cr();
  return p.jsxs("div", {
    className: "info-window-display",
    children: [
      p.jsx("h3", {
        children: (r = e.displayName) == null ? void 0 : r.text,
      }),
      p.jsx("p", { children: e.formattedAddress }),
      p.jsxs("div", {
        className: "button-container",
        children: [
          p.jsx(Cm, {
            to: `station/${e.id}`,
            className: "view-more-design",
            onClick: n,
            children: "View More",
          }),
          p.jsx("a", {
            className: "view-more-design",
            target: "_blank",
            rel: "noopener noreferrer",
            href: e.googleMapsUri,
            onClick: n,
            children: "Click for direction",
          }),
        ],
      }),
      p.jsx("div", {
        className: "image-container",
        children:
          e &&
          e.photos &&
          (e == null ? void 0 : e.photos.length) > 0 &&
          t
            ? p.jsx("img", {
                className: "image",
                src: t[0],
                alt: `${e.displayName.text} image`,
              })
            : p.jsx("div", {
                className: "no-image",
                children: p.jsx(zc, {}),
              }),
      }),
    ],
  });
}
function hx() {
  const { selectedStation: e, setSelectedStation: t } =
      y.useContext(et),
    n = Dc();
  return p.jsx(TS, {
    position: { lat: e.location.latitude, lng: e.location.longitude },
    headerContent: p.jsx(px, {}),
    onCloseClick: () => t(null),
    children: p.jsx(Km, { selectedStation: e, photoUrl: n }),
  });
}
function mx() {
  const {
      center: e,
      newCenter: t,
      setNewCenter: n,
      nearbyStations: r,
      selectedStation: o,
      map: i,
      zoom: l,
      setSelectedStation: a,
      setZoom: s,
    } = y.useContext(et),
    { theme: u } = ka(),
    [c, f] = y.useState("7c79731e59aaf1d"),
    [h, S] = y.useState([]),
    m = eo((k) => k.session.user);
  y.useEffect(() => {
    i && t && i.setCenter(t);
  }, [i, t, e]),
    y.useEffect(() => {
      f(u === "dark" ? "7c79731e59aaf1d" : "dbb3d5f1488d07b");
    }, [u]);
  const x = () => {
    if (i) {
      const k = i.getCenter();
      n({ lat: k.lat(), lng: k.lng() });
    }
  };
  return (
    y.useEffect(() => {
      if (m === null || m.errors) return;
      (async () => {
        try {
          const g = await fetch("/api/station/");
          if (!g.ok)
            throw new Error(`HTTP error! status: ${g.status}`);
          const d = await g.json();
          S(Object.values(d.station));
        } catch (g) {
          console.error("Failed to fetch stations:", g);
        }
      })();
    }, [m]),
    y.useEffect(() => {
      if (m != null && m.errors) return;
      const k = async (d) => {
        const w = {
          id: d.id,
          name: d.displayName.text,
          lat: d.location.latitude,
          lng: d.location.longitude,
          address: d.formattedAddress,
          uri: d.googleMapsUri,
        };
        try {
          const v = await fetch("/api/station/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(w),
          });
          if (!v.ok)
            throw new Error(`HTTP error! status: ${v.status}`);
          const P = await v.json();
          console.log("Station saved successfully:", P);
        } catch (v) {
          console.error("Failed to post station:", v);
        }
      };
      (async () => {
        const d = h.map((v) => v.id);
        console.log("Existing station IDs:", d);
        const w = r.filter((v) => !d.includes(v.id));
        console.log("Unsaved stations:", w);
        for (const v of w) await k(v);
      })();
    }, [r, m, h]),
    p.jsx(p.Fragment, {
      children: p.jsxs(Tc, {
        onDragend: x,
        style: { width: "100%", height: "100vh" },
        defaultCenter: e,
        mapId: c,
        defaultZoom: 15,
        zoom: l,
        onZoomChanged: () => s(i.getZoom()),
        onClick: () => o && a(null),
        disableDefaultUI: !0,
        gestureHandling: "greedy",
        children: [
          p.jsx(Lc, {
            position: e,
            children: p.jsx("div", {
              children: p.jsx("img", {
                className: "user-marker",
                src: "/user.svg",
                width: 32,
                height: 32,
              }),
            }),
          }),
          o && p.jsx(hx, {}),
          p.jsx(dx, { nearbyStations: r }),
        ],
      }),
    })
  );
}
const ps = "AIzaSyDVVvTrVTmS8Tp-GDpSwNwgw7m55B4J3EE";
function Gm() {
  const [e, t] = y.useState([]),
    [n, r] = y.useState({}),
    [o, i] = y.useState(!1),
    [l, a] = y.useState(null),
    s = async (f) => {
      const h = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": ps,
          "X-Goog-FieldMask": "*",
        },
      };
      try {
        const S = await fetch(
          `https://places.googleapis.com/v1/places/${f}?key=${ps}`,
          h,
        );
        if (!S.ok) throw new Error(`HTTP error! status: ${S.status}`);
        return await S.json();
      } catch (S) {
        throw new Error("Error fetching selected station:", S);
      }
    },
    u = async (f) => {
      if (f && f.photos && f.photos.length > 0) {
        const h = f.photos;
        return await Promise.all(
          h.map(async (m) => {
            const x = m.name,
              k = await fetch(
                "https://places.googleapis.com/v1/" +
                  x +
                  "/media?maxHeightPx=400&maxWidthPx=400&key=" +
                  ps,
              );
            if (!k.ok)
              throw new Error(`HTTP error! status: ${k.status}`);
            return k.url;
          }),
        );
      }
    },
    c = async (f) => {
      try {
        if (
          !(
            await fetch(`/api/king/current/station/${f}`, {
              method: "DELETE",
            })
          ).ok
        )
          throw new Error("Network response was not ok");
        const S = e.filter((m) => m.id !== f);
        t(S), i((m) => !m), a(null);
      } catch (h) {
        console.error("Failed to delete station:", h);
      }
    };
  return (
    y.useEffect(() => {
      (async () => {
        try {
          const h = await fetch("/api/king/current/stations");
          if (!h.ok)
            throw new Error(`HTTP error! status: ${h.status}`);
          const S = await h.json(),
            m = Object.values(S.stations),
            x = (
              await Promise.all(
                m.map(async (k) => {
                  try {
                    const g = await s(k.id),
                      d = await u(g);
                    return { ...g, photoUrls: d };
                  } catch {
                    return null;
                  }
                }),
              )
            ).filter(Boolean);
          t(x);
        } catch (h) {
          console.error("Failed to fetch user station data:", h);
        }
      })();
    }, [o]),
    y.useEffect(() => {
      const f = async () => {
        const h = {};
        for (const S of e) {
          const m = await u(S);
          h[S.id] = m;
        }
        r(h);
      };
      e.length > 0 && f();
    }, [e]),
    e
      ? l
        ? p.jsxs("div", {
            className: "saved-spots-container",
            children: [
              p.jsx("p", {
                children:
                  "Are you sure you want to delete this station?",
              }),
              p.jsxs("div", {
                className: "confirmation-buttons",
                children: [
                  p.jsx("button", {
                    className: "button",
                    onClick: () => c(l),
                    children: "Yes",
                  }),
                  p.jsx("button", {
                    className: "button",
                    onClick: () => a(null),
                    children: "No",
                  }),
                ],
              }),
            ],
          })
        : p.jsxs("div", {
            className: "saved-spots-container",
            children: [
              p.jsx("h3", { children: "Saved Stations: " }),
              e.map((f, h) => {
                if (f)
                  return p.jsxs(
                    "div",
                    {
                      className: "saved-spot-item",
                      children: [
                        p.jsx("div", {
                          className: "delete-icon-container",
                          onClick: () => a(f.id),
                          children: p.jsx(WS, {
                            className: "delete-icon",
                          }),
                        }),
                        p.jsx(Km, {
                          selectedStation: f,
                          photoUrl: n[f.id],
                        }),
                      ],
                    },
                    f + h,
                  );
              }),
            ],
          })
      : p.jsx("div", {
          className: "saved-spots-container",
          children: p.jsx("h3", { children: "Loading..." }),
        })
  );
}
const gx = "AIzaSyDVVvTrVTmS8Tp-GDpSwNwgw7m55B4J3EE";
function Fc(e) {
  const [t, n] = y.useState(null);
  return (
    y.useEffect(() => {
      e &&
        (async () => {
          const o = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": gx,
              "X-Goog-FieldMask": "*",
            },
          };
          try {
            const i = await fetch(
              `https://places.googleapis.com/v1/places/${e}`,
              o,
            );
            if (!i.ok)
              throw new Error(`HTTP error! status: ${i.status}`);
            const l = await i.json();
            n(l);
          } catch (i) {
            console.error("Error fetching selected station:", i);
          }
        })();
    }, [e]),
    t
  );
}
function Qm({
  onClose: e,
  stationId: t,
  onSubmitReview: n,
  review: r = null,
}) {
  const [o, i] = y.useState(""),
    [l, a] = y.useState(!1),
    s = Fc(t),
    { setUpdate: u } = y.useContext(_a);
  if (
    (y.useEffect(() => {
      r && i(r.text);
    }, [r]),
    !s)
  )
    return p.jsx("h1", { children: "Loading Station Info" });
  const c = async (f) => {
    f.preventDefault();
    const h = { station_id: s.id, text: o };
    a(!0);
    try {
      let S;
      if (
        (r
          ? (S = await fetch(`/api/review/${r.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(h),
            }))
          : (S = await fetch("/api/review/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(h),
            })),
        !S.ok)
      )
        throw new Error("Failed to submit review");
      const m = await S.json();
      n(m.review), e();
    } catch (S) {
      console.error("error ocuur on posting a review", S);
    } finally {
      u((S) => !S), a(!1);
    }
  };
  return p.jsxs(p.Fragment, {
    children: [
      p.jsxs("form", {
        onSubmit: c,
        children: [
          p.jsxs("div", {
            className: "review-modal",
            children: [
              p.jsxs("h1", {
                children: [
                  "How do you feel about",
                  " ",
                  s.displayName.text || "this station",
                  " ?",
                  " ",
                ],
              }),
              p.jsx("textarea", {
                value: o,
                placeholder: "Leave your review here...",
                style: { minWidth: "300px", minHeight: "200px" },
                onChange: (f) => i(f.target.value),
                required: !0,
              }),
            ],
          }),
          p.jsx("button", {
            className: "submit-btn",
            type: "submit",
            disabled: o.length <= 0 || l,
            children: r ? "Edit Your Review" : "Submit Your Review",
          }),
        ],
      }),
      p.jsx("button", {
        className: "submit-btn",
        onClick: e,
        disabled: l,
        children: "Close",
      }),
    ],
  });
}
function Ym({ onDelete: e, onClose: t, type: n }) {
  return p.jsx(p.Fragment, {
    children: p.jsxs("div", {
      className: "delete-msg",
      children: [
        p.jsx("h2", { children: "Confirm Delete" }),
        p.jsx("em", {
          children: "Are you sure you want to delete this review?",
        }),
        p.jsxs("button", {
          className: "delete-review",
          onClick: e,
          children: ["Yes(Delete ", n, ")"],
        }),
        p.jsxs("button", {
          onClick: t,
          children: ["No(Keep ", n, ")"],
        }),
      ],
    }),
  });
}
function vx({ onReviewAdded: e }) {
  const {
      reviews: t,
      setReviews: n,
      loading: r,
      error: o,
    } = y.useContext(_a),
    i = eo((m) => m.session.user),
    [l, a] = y.useState({}),
    { closeModal: s, setModalContent: u } = cr();
  y.useEffect(() => {
    async function m() {
      const x = await fetch("/api/station/"),
        k = await x.json();
      if (!x.ok) throw new Error("Failed to get stations");
      a(k.station);
    }
    m();
  }, []);
  const c = (m) => {
      e(m), s();
    },
    f = (m) => {
      u(
        p.jsx(Qm, {
          onClose: s,
          stationId: m.station_id,
          onSubmitReview: c,
          review: m,
        }),
      );
    },
    h = (m) => {
      u(
        p.jsx(Ym, {
          onDelete: () => S(m),
          onClose: s,
          type: "Review",
        }),
      );
    },
    S = async (m) => {
      try {
        if (
          !(await fetch(`/api/review/${m}`, { method: "DELETE" })).ok
        )
          throw new Error("Failed to delete review");
        n((k) => k.filter((g) => g.id !== m));
      } catch (x) {
        console.error("Error deleting reivew", x);
      }
      s();
    };
  return r
    ? p.jsx("p", { children: "Loading reviews..." })
    : o
      ? p.jsxs("p", { children: ["Error: ", o] })
      : t.length === 0
        ? p.jsx("p", { children: "No Review Yet" })
        : p.jsxs("div", {
            className: "user-review-container",
            children: [
              p.jsxs("h2", { children: ["Reviewer: ", i.name] }),
              p.jsx("ul", {
                children: t
                  .filter((m) => m.king_id === i.id)
                  .map((m) =>
                    p.jsxs(
                      "li",
                      {
                        children: [
                          p.jsxs("p", {
                            children: [
                              "Station:",
                              " ",
                              m.station_id in l
                                ? l[m.station_id].name
                                : m.station_id,
                            ],
                          }),
                          p.jsxs("p", {
                            children: ["Review: ", m.text],
                          }),
                          p.jsxs("div", {
                            children: [
                              p.jsx("button", {
                                onClick: () => f(m),
                                children: "Edit",
                              }),
                              p.jsx("button", {
                                onClick: () => h(m.id),
                                children: "Delete",
                              }),
                            ],
                          }),
                        ],
                      },
                      m.id,
                    ),
                  ),
              }),
            ],
          });
}
function yx() {
  const {
      setNewCenter: e,
      openSideMenu: t,
      setOpenSideMenu: n,
      center: r,
      setSelectedStation: o,
      setZoom: i,
    } = y.useContext(et),
    l = eo((s) => s.session.user),
    a = () => {
      o(null), e(r), i(15);
    };
  return p.jsxs("div", {
    className: "control-buttons-container",
    children: [
      p.jsx("button", {
        onClick: () => n((s) => !s),
        className: "icon-container",
        children: t
          ? p.jsx(HS, { className: "control-button" })
          : p.jsx(p.Fragment, {
              children: p.jsx("div", {
                className: "diplay-station-ico",
                children: p.jsx(US, { className: "control-button" }),
              }),
            }),
      }),
      p.jsx("div", {
        className: "crud-buttons-container",
        children:
          l &&
          l.id &&
          p.jsxs(p.Fragment, {
            children: [
              p.jsx(Xr, {
                itemText: p.jsx("button", {
                  className: "control-button user-interaction-button",
                  children: p.jsx(Hm, {
                    className:
                      "bookmark control-button user-interaction-button",
                  }),
                }),
                modalComponent: p.jsx(Gm, {}),
              }),
              p.jsx(Xr, {
                itemText: p.jsx("button", {
                  className: "control-button user-interaction-button",
                  children: p.jsx(bS, {
                    className:
                      "reviews control-button user-interaction-button",
                  }),
                }),
                modalComponent: p.jsx(vx, {}),
              }),
            ],
          }),
      }),
      p.jsx("div", {
        className: "icon-container",
        onClick: a,
        children: p.jsx(BS, { className: "control-button" }),
      }),
    ],
  });
}
function wx() {
  const e = rx(),
    { openSideMenu: t } = y.useContext(et);
  return p.jsxs("div", {
    children: [
      p.jsx(ux, { openSideMenu: t }),
      p.jsx(yx, {}),
      e ? p.jsx(mx, {}) : "Loading...",
    ],
  });
}
function Sx() {
  const e = Dc(),
    { theme: t } = ka(),
    n = (r) =>
      p.jsx(
        "div",
        {
          className: `gas-station-image-${t}`,
          children: p.jsx(zc, {}),
        },
        r,
      );
  for (; e.length < 3; ) e.push(n(e.length));
  return e && e.length > 0
    ? p.jsx("div", {
        className: "gas-station-image-container",
        children: e.slice(0, 3).map((r, o) =>
          typeof r == "string"
            ? p.jsx(
                "img",
                {
                  src: r,
                  className: "gas-station-image",
                  alt: `Gas station ${o}`,
                },
                o,
              )
            : n(o),
        ),
      })
    : null;
}
function xx(e, t) {
  const n = t / 1e9;
  return (parseFloat(e) + n).toFixed(2);
}
function Cx({ stationInfo: e }) {
  if (e.types.includes("gas_station")) {
    const t = e.fuelOptions.fuelPrices;
    return p.jsx("div", {
      className: "options-container",
      children: t.map((n, r) => {
        const o = xx(n.price.units, n.price.nanos);
        return p.jsxs(
          "div",
          {
            className: "price-option-container",
            children: [
              p.jsx("p", { children: n.type }),
              p.jsx("p", {
                children: isNaN(o) ? "Not Available" : `$${o}`,
              }),
            ],
          },
          r,
        );
      }),
    });
  }
}
const Ex = ({ filled: e }) =>
    p.jsx(VS, { color: e ? "gold" : "lightgray" }),
  kx = ({ rating: e }) =>
    p.jsx("div", {
      className: "star-rating",
      children: [...Array(5)].map((n, r) =>
        p.jsx(Ex, { filled: r < e }, r),
      ),
    });
function _x({ onDelete: e, onClose: t, type: n }) {
  return p.jsx(p.Fragment, {
    children: p.jsxs("div", {
      className: "delete-msg",
      children: [
        p.jsx("h2", { children: "Confirm Delete" }),
        p.jsx("em", {
          children: "Are you sure you want to delete this price?",
        }),
        p.jsxs("button", {
          className: "delete-price",
          onClick: e,
          children: ["Yes(Delete ", n, ")"],
        }),
        p.jsxs("button", {
          onClick: t,
          children: ["No(Keep ", n, ")"],
        }),
      ],
    }),
  });
}
function Px({
  onClose: e,
  stationId: t,
  onSubmitPrice: n,
  price: r = null,
}) {
  const [o, i] = y.useState(0),
    [l, a] = y.useState("unleaded"),
    [s, u] = y.useState(!1),
    c = Fc(t),
    { setUpdate: f } = y.useContext(Oc);
  if (
    (y.useEffect(() => {
      r && (i(r.price), a(r.fuel_type));
    }, [r]),
    !c)
  )
    return p.jsx("h1", { children: "Loading Station Info" });
  const h = async (S) => {
    S.preventDefault();
    const m = { station_id: t, price: o, fuel_type: l };
    u(!0);
    try {
      const x = r ? "PUT" : "POST",
        k = "/api/price/" + (r ? `${r.id}` : ""),
        g = await fetch(k, {
          method: x,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(m),
        });
      if (!g.ok) throw new Error("Failed to submit review");
      const d = await g.json();
      n(d.price), e();
    } catch (x) {
      console.error("error ocuur on posting a price", x);
    } finally {
      f((x) => !x), u(!1);
    }
  };
  return p.jsxs(p.Fragment, {
    children: [
      p.jsxs("form", {
        onSubmit: h,
        children: [
          p.jsxs("div", {
            className: "price-modal",
            children: [
              p.jsxs("h1", {
                children: [
                  "What is the price of",
                  " ",
                  p.jsxs("select", {
                    onChange: (S) => a(S.target.value),
                    children: [
                      p.jsx("option", { children: "unleaded" }),
                      p.jsx("option", { children: "leaded" }),
                      p.jsx("option", { children: "premium" }),
                      p.jsx("option", {
                        children: "Tesla Supercharger",
                      }),
                    ],
                  }),
                  " ",
                  "fuel at ",
                  c.displayName.text || "this station",
                  " ?",
                  " ",
                ],
              }),
              p.jsx("input", {
                type: "number",
                value: o,
                placeholder: "Leave your fuel price here...",
                onChange: (S) => i(S.target.value),
                required: !0,
              }),
            ],
          }),
          p.jsx("button", {
            className: "submit-btn",
            type: "submit",
            disabled: o <= 0 || s,
            children: r ? "Edit Your Price" : "Submit Your Price",
          }),
        ],
      }),
      p.jsx("button", {
        className: "submit-btn",
        onClick: e,
        disabled: s,
        children: "Close",
      }),
    ],
  });
}
function jx({ stationInfo: e, onReviewAdded: t, onPriceAdded: n }) {
  const { setModalContent: r, closeModal: o } = cr(),
    { reviews: i, setReviews: l } = y.useContext(_a),
    { prices: a, setPrices: s } = y.useContext(Oc),
    u = eo((d) => d.session.user),
    c = (d) => {
      t(d), o();
    },
    f = (d) => {
      n(d), o();
    },
    h = (d = null) => {
      r(
        p.jsx(Qm, {
          onClose: o,
          stationId: e.id,
          onSubmitReview: c,
          review: d,
        }),
      );
    },
    S = (d = null) => {
      r(
        p.jsx(Px, {
          onClose: o,
          stationId: e.id,
          onSubmitPrice: f,
          price: d,
        }),
      );
    },
    m = (d) => {
      r(
        p.jsx(Ym, {
          onDelete: () => k(d),
          onClose: o,
          type: "Review",
        }),
      );
    },
    x = (d) => {
      r(
        p.jsx(_x, {
          onDelete: () => g(d),
          onClose: o,
          type: "Price",
        }),
      );
    },
    k = async (d) => {
      try {
        if (
          !(await fetch(`/api/review/${d}`, { method: "DELETE" })).ok
        )
          throw new Error("Failed to delete review");
        l((v) => v.filter((P) => P.id !== d));
      } catch (w) {
        console.error("Error deleting reivew", w);
      }
      o();
    },
    g = async (d) => {
      try {
        if (
          !(await fetch(`/api/price/${d}`, { method: "DELETE" })).ok
        )
          throw new Error("Failed to delete price");
        s((v) => v.filter((P) => P.id !== d));
      } catch (w) {
        console.error("Error deleting price", w);
      }
      o();
    };
  return e && e.reviews
    ? p.jsx("div", {
        className: "reviews-container",
        children: p.jsxs("div", {
          className: "user-info-display",
          children: [
            (u == null ? void 0 : u.nick) &&
              p.jsxs(p.Fragment, {
                children: [
                  p.jsx("span", {
                    children: p.jsx("button", {
                      onClick: () => h(),
                      children: "Write Your Review",
                    }),
                  }),
                  p.jsx("span", {
                    children: p.jsx("button", {
                      onClick: () => S(),
                      children: "Set Your Price",
                    }),
                  }),
                ],
              }),
            a
              .filter((d) => d.station_id === e.id)
              .map((d) =>
                p.jsxs(
                  "li",
                  {
                    className: "user-info-display",
                    children: [
                      p.jsxs("div", {
                        className: "name-icon-container",
                        children: [
                          p.jsx(fs, {}),
                          p.jsx("p", { children: d.king_name }),
                        ],
                      }),
                      p.jsxs("p", {
                        children: [
                          "$",
                          d.price.toFixed(2),
                          ": ",
                          d.fuel_type,
                        ],
                      }),
                      (u == null ? void 0 : u.id) === d.king_id &&
                        p.jsxs(p.Fragment, {
                          children: [
                            p.jsx("span", {
                              children: p.jsx("button", {
                                onClick: () => S(d),
                                children: "Edit",
                              }),
                            }),
                            p.jsx("span", {
                              children: p.jsx("button", {
                                onClick: () => x(d.id),
                                children: "Delete",
                              }),
                            }),
                          ],
                        }),
                    ],
                  },
                  d.id,
                ),
              ),
            i
              .filter((d) => d.station_id === e.id)
              .map((d) =>
                p.jsxs(
                  "li",
                  {
                    className: "user-info-display",
                    children: [
                      p.jsxs("div", {
                        className: "name-icon-container",
                        children: [
                          p.jsx(fs, {}),
                          p.jsx("p", { children: d.king_name }),
                        ],
                      }),
                      p.jsx("p", { children: d.text }),
                      (u == null ? void 0 : u.id) === d.king_id &&
                        p.jsxs(p.Fragment, {
                          children: [
                            p.jsx("span", {
                              children: p.jsx("button", {
                                onClick: () => h(d),
                                children: "Edit",
                              }),
                            }),
                            p.jsx("span", {
                              children: p.jsx("button", {
                                onClick: () => m(d.id),
                                children: "Delete",
                              }),
                            }),
                          ],
                        }),
                    ],
                  },
                  d.id,
                ),
              ),
            e.reviews.map((d, w) =>
              p.jsxs(
                "div",
                {
                  className: "review-container",
                  children: [
                    p.jsxs("div", {
                      className: "user-info-display",
                      children: [
                        p.jsxs("div", {
                          className: "name-icon-container",
                          children: [
                            p.jsx(fs, {}),
                            p.jsx("p", {
                              children:
                                d.authorAttribution.displayName,
                            }),
                          ],
                        }),
                        p.jsx(kx, { rating: d.rating }),
                      ],
                    }),
                    p.jsx("p", { children: d.originalText.text }),
                  ],
                },
                w,
              ),
            ),
          ],
        }),
      })
    : null;
}
function Nx() {
  const { id: e } = f1(),
    t = Fc(e),
    { theme: n } = ka(),
    [r, o] = y.useState("7c79731e59aaf1d"),
    { setSelectedStation: i } = y.useContext(et);
  if (
    (y.useEffect(() => {
      t && i(t);
    }, [t, i]),
    y.useEffect(() => {
      o(n === "dark" ? "7c79731e59aaf1d" : "dbb3d5f1488d07b");
    }, [n]),
    !t)
  )
    return p.jsx("h1", { children: "Loading..." });
  const l = { lat: t.location.latitude, lng: t.location.longitude };
  return p.jsxs("section", {
    className: `station-display-main-container-${n}`,
    children: [
      p.jsx("div", {
        className: "image-scroll-track",
        children: t.photos && p.jsx(Sx, {}),
      }),
      p.jsxs("div", {
        className: "station-data-container",
        children: [
          p.jsx("h1", { children: t.displayName.text }),
          p.jsx("p", { children: t.formattedAddress }),
          p.jsx(Cx, { stationInfo: t }),
          p.jsxs("div", {
            className: "review-map-container",
            children: [
              p.jsx(jx, {
                stationInfo: t,
                onReviewAdded: console.log,
                onPriceAdded: console.log,
              }),
              p.jsx(Tc, {
                center: l,
                style: {
                  width: "100%",
                  height: "100%",
                  minHeight: "32rem",
                },
                mapId: r,
                zoom: 18,
                disableDefaultUI: !0,
                gestureHandling: "greedy",
                children: p.jsx(Lc, { position: l }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Tx = L1([
  {
    element: p.jsx(tx, {}),
    children: [
      { path: "/", element: p.jsx(wx, {}) },
      { path: "/station/:id", element: p.jsx(Nx, {}) },
      { path: "/review/:id", element: p.jsx(Gm, {}) },
    ],
  },
]);
zm.dispatch(Fo());
hs.createRoot(document.getElementById("root")).render(
  p.jsx(oe.StrictMode, {
    children: p.jsx(h0, {
      store: zm,
      children: p.jsx($1, { router: Tx }),
    }),
  }),
);
