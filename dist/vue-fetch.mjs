var $e = Object.defineProperty;
var ze = (e, t, r) => t in e ? $e(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ae = (e, t, r) => (ze(e, typeof t != "symbol" ? t + "" : t, r), r);
import { reactive as Je, computed as _ } from "vue";
function Re(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ve } = Object.prototype, { getPrototypeOf: ne } = Object, z = /* @__PURE__ */ ((e) => (t) => {
  const r = Ve.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), N = (e) => (e = e.toLowerCase(), (t) => z(t) === e), J = (e) => (t) => typeof t === e, { isArray: B } = Array, v = J("undefined");
function We(e) {
  return e !== null && !v(e) && e.constructor !== null && !v(e.constructor) && x(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Se = N("ArrayBuffer");
function Ke(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Se(e.buffer), t;
}
const Ge = J("string"), x = J("function"), Oe = J("number"), V = (e) => e !== null && typeof e == "object", Xe = (e) => e === !0 || e === !1, q = (e) => {
  if (z(e) !== "object")
    return !1;
  const t = ne(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Qe = N("Date"), Ze = N("File"), Ye = N("Blob"), et = N("FileList"), tt = (e) => V(e) && x(e.pipe), rt = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || x(e.append) && ((t = z(e)) === "formdata" || // detect form-data instance
  t === "object" && x(e.toString) && e.toString() === "[object FormData]"));
}, nt = N("URLSearchParams"), st = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function I(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, s;
  if (typeof e != "object" && (e = [e]), B(e))
    for (n = 0, s = e.length; n < s; n++)
      t.call(null, e[n], n, e);
  else {
    const o = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let c;
    for (n = 0; n < i; n++)
      c = o[n], t.call(null, e[c], c, e);
  }
}
function Ae(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, s;
  for (; n-- > 0; )
    if (s = r[n], t === s.toLowerCase())
      return s;
  return null;
}
const Te = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, xe = (e) => !v(e) && e !== Te;
function Z() {
  const { caseless: e } = xe(this) && this || {}, t = {}, r = (n, s) => {
    const o = e && Ae(t, s) || s;
    q(t[o]) && q(n) ? t[o] = Z(t[o], n) : q(n) ? t[o] = Z({}, n) : B(n) ? t[o] = n.slice() : t[o] = n;
  };
  for (let n = 0, s = arguments.length; n < s; n++)
    arguments[n] && I(arguments[n], r);
  return t;
}
const ot = (e, t, r, { allOwnKeys: n } = {}) => (I(t, (s, o) => {
  r && x(s) ? e[o] = Re(s, r) : e[o] = s;
}, { allOwnKeys: n }), e), it = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), at = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, ct = (e, t, r, n) => {
  let s, o, i;
  const c = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!n || n(i, e, t)) && !c[i] && (t[i] = e[i], c[i] = !0);
    e = r !== !1 && ne(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, ut = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, lt = (e) => {
  if (!e)
    return null;
  if (B(e))
    return e;
  let t = e.length;
  if (!Oe(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, ft = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ne(Uint8Array)), dt = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, pt = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, ht = N("HTMLFormElement"), mt = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, s) {
    return n.toUpperCase() + s;
  }
), ce = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), yt = N("RegExp"), Pe = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  I(r, (s, o) => {
    let i;
    (i = t(s, o, e)) !== !1 && (n[o] = i || s);
  }), Object.defineProperties(e, n);
}, Et = (e) => {
  Pe(e, (t, r) => {
    if (x(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (x(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, wt = (e, t) => {
  const r = {}, n = (s) => {
    s.forEach((o) => {
      r[o] = !0;
    });
  };
  return B(e) ? n(e) : n(String(e).split(t)), r;
}, bt = () => {
}, Rt = (e, t) => (e = +e, Number.isFinite(e) ? e : t), K = "abcdefghijklmnopqrstuvwxyz", ue = "0123456789", Ce = {
  DIGIT: ue,
  ALPHA: K,
  ALPHA_DIGIT: K + K.toUpperCase() + ue
}, St = (e = 16, t = Ce.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = t;
  for (; e--; )
    r += t[Math.random() * n | 0];
  return r;
};
function Ot(e) {
  return !!(e && x(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const At = (e) => {
  const t = new Array(10), r = (n, s) => {
    if (V(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[s] = n;
        const o = B(n) ? [] : {};
        return I(n, (i, c) => {
          const l = r(i, s + 1);
          !v(l) && (o[c] = l);
        }), t[s] = void 0, o;
      }
    }
    return n;
  };
  return r(e, 0);
}, Tt = N("AsyncFunction"), xt = (e) => e && (V(e) || x(e)) && x(e.then) && x(e.catch), a = {
  isArray: B,
  isArrayBuffer: Se,
  isBuffer: We,
  isFormData: rt,
  isArrayBufferView: Ke,
  isString: Ge,
  isNumber: Oe,
  isBoolean: Xe,
  isObject: V,
  isPlainObject: q,
  isUndefined: v,
  isDate: Qe,
  isFile: Ze,
  isBlob: Ye,
  isRegExp: yt,
  isFunction: x,
  isStream: tt,
  isURLSearchParams: nt,
  isTypedArray: ft,
  isFileList: et,
  forEach: I,
  merge: Z,
  extend: ot,
  trim: st,
  stripBOM: it,
  inherits: at,
  toFlatObject: ct,
  kindOf: z,
  kindOfTest: N,
  endsWith: ut,
  toArray: lt,
  forEachEntry: dt,
  matchAll: pt,
  isHTMLForm: ht,
  hasOwnProperty: ce,
  hasOwnProp: ce,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Pe,
  freezeMethods: Et,
  toObjectSet: wt,
  toCamelCase: mt,
  noop: bt,
  toFiniteNumber: Rt,
  findKey: Ae,
  global: Te,
  isContextDefined: xe,
  ALPHABET: Ce,
  generateString: St,
  isSpecCompliantForm: Ot,
  toJSONObject: At,
  isAsyncFn: Tt,
  isThenable: xt
};
function y(e, t, r, n, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), s && (this.response = s);
}
a.inherits(y, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: a.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const ge = y.prototype, Ne = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ne[e] = { value: e };
});
Object.defineProperties(y, Ne);
Object.defineProperty(ge, "isAxiosError", { value: !0 });
y.from = (e, t, r, n, s, o) => {
  const i = Object.create(ge);
  return a.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }, (c) => c !== "isAxiosError"), y.call(i, e.message, t, r, n, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
const Pt = null;
function Y(e) {
  return a.isPlainObject(e) || a.isArray(e);
}
function Fe(e) {
  return a.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function le(e, t, r) {
  return e ? e.concat(t).map(function(s, o) {
    return s = Fe(s), !r && o ? "[" + s + "]" : s;
  }).join(r ? "." : "") : t;
}
function Ct(e) {
  return a.isArray(e) && !e.some(Y);
}
const gt = a.toFlatObject(a, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function W(e, t, r) {
  if (!a.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = a.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(f, m) {
    return !a.isUndefined(m[f]);
  });
  const n = r.metaTokens, s = r.visitor || d, o = r.dots, i = r.indexes, l = (r.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(t);
  if (!a.isFunction(s))
    throw new TypeError("visitor must be a function");
  function p(h) {
    if (h === null)
      return "";
    if (a.isDate(h))
      return h.toISOString();
    if (!l && a.isBlob(h))
      throw new y("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(h) || a.isTypedArray(h) ? l && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function d(h, f, m) {
    let w = h;
    if (h && !m && typeof h == "object") {
      if (a.endsWith(f, "{}"))
        f = n ? f : f.slice(0, -2), h = JSON.stringify(h);
      else if (a.isArray(h) && Ct(h) || (a.isFileList(h) || a.endsWith(f, "[]")) && (w = a.toArray(h)))
        return f = Fe(f), w.forEach(function(A, C) {
          !(a.isUndefined(A) || A === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? le([f], C, o) : i === null ? f : f + "[]",
            p(A)
          );
        }), !1;
    }
    return Y(h) ? !0 : (t.append(le(m, f, o), p(h)), !1);
  }
  const u = [], E = Object.assign(gt, {
    defaultVisitor: d,
    convertValue: p,
    isVisitable: Y
  });
  function b(h, f) {
    if (!a.isUndefined(h)) {
      if (u.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + f.join("."));
      u.push(h), a.forEach(h, function(w, T) {
        (!(a.isUndefined(w) || w === null) && s.call(
          t,
          w,
          a.isString(T) ? T.trim() : T,
          f,
          E
        )) === !0 && b(w, f ? f.concat(T) : [T]);
      }), u.pop();
    }
  }
  if (!a.isObject(e))
    throw new TypeError("data must be an object");
  return b(e), t;
}
function fe(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function se(e, t) {
  this._pairs = [], e && W(e, this, t);
}
const _e = se.prototype;
_e.append = function(t, r) {
  this._pairs.push([t, r]);
};
_e.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, fe);
  } : fe;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Nt(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function De(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Nt, s = r && r.serialize;
  let o;
  if (s ? o = s(t, r) : o = a.isURLSearchParams(t) ? t.toString() : new se(t, r).toString(n), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class de {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    a.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Le = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ft = typeof URLSearchParams < "u" ? URLSearchParams : se, _t = typeof FormData < "u" ? FormData : null, Dt = typeof Blob < "u" ? Blob : null, Lt = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ft,
    FormData: _t,
    Blob: Dt
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Ue = typeof window < "u" && typeof document < "u", Ut = ((e) => Ue && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), Bt = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ue,
  hasStandardBrowserEnv: Ut,
  hasStandardBrowserWebWorkerEnv: Bt
}, Symbol.toStringTag, { value: "Module" })), g = {
  ...jt,
  ...Lt
};
function vt(e, t) {
  return W(e, new g.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, s, o) {
      return g.isNode && a.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function It(e) {
  return a.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function kt(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const s = r.length;
  let o;
  for (n = 0; n < s; n++)
    o = r[n], t[o] = e[o];
  return t;
}
function Be(e) {
  function t(r, n, s, o) {
    let i = r[o++];
    if (i === "__proto__")
      return !0;
    const c = Number.isFinite(+i), l = o >= r.length;
    return i = !i && a.isArray(s) ? s.length : i, l ? (a.hasOwnProp(s, i) ? s[i] = [s[i], n] : s[i] = n, !c) : ((!s[i] || !a.isObject(s[i])) && (s[i] = []), t(r, n, s[i], o) && a.isArray(s[i]) && (s[i] = kt(s[i])), !c);
  }
  if (a.isFormData(e) && a.isFunction(e.entries)) {
    const r = {};
    return a.forEachEntry(e, (n, s) => {
      t(It(n), s, r, 0);
    }), r;
  }
  return null;
}
function Ht(e, t, r) {
  if (a.isString(e))
    try {
      return (t || JSON.parse)(e), a.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const k = {
  transitional: Le,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, o = a.isObject(t);
    if (o && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t))
      return s ? JSON.stringify(Be(t)) : t;
    if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t))
      return t;
    if (a.isArrayBufferView(t))
      return t.buffer;
    if (a.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return vt(t, this.formSerializer).toString();
      if ((c = a.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return W(
          c ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || s ? (r.setContentType("application/json", !1), Ht(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || k.transitional, n = r && r.forcedJSONParsing, s = this.responseType === "json";
    if (t && a.isString(t) && (n && !this.responseType || s)) {
      const i = !(r && r.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (c) {
        if (i)
          throw c.name === "SyntaxError" ? y.from(c, y.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: g.classes.FormData,
    Blob: g.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
a.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  k.headers[e] = {};
});
const Mt = a.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), qt = (e) => {
  const t = {};
  let r, n, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || t[r] && Mt[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, pe = Symbol("internals");
function j(e) {
  return e && String(e).trim().toLowerCase();
}
function $(e) {
  return e === !1 || e == null ? e : a.isArray(e) ? e.map($) : String(e);
}
function $t(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const zt = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function G(e, t, r, n, s) {
  if (a.isFunction(n))
    return n.call(this, t, r);
  if (s && (t = r), !!a.isString(t)) {
    if (a.isString(n))
      return t.indexOf(n) !== -1;
    if (a.isRegExp(n))
      return n.test(t);
  }
}
function Jt(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Vt(e, t) {
  const r = a.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(s, o, i) {
        return this[n].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
class P {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const s = this;
    function o(c, l, p) {
      const d = j(l);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const u = a.findKey(s, d);
      (!u || s[u] === void 0 || p === !0 || p === void 0 && s[u] !== !1) && (s[u || l] = $(c));
    }
    const i = (c, l) => a.forEach(c, (p, d) => o(p, d, l));
    return a.isPlainObject(t) || t instanceof this.constructor ? i(t, r) : a.isString(t) && (t = t.trim()) && !zt(t) ? i(qt(t), r) : t != null && o(r, t, n), this;
  }
  get(t, r) {
    if (t = j(t), t) {
      const n = a.findKey(this, t);
      if (n) {
        const s = this[n];
        if (!r)
          return s;
        if (r === !0)
          return $t(s);
        if (a.isFunction(r))
          return r.call(this, s, n);
        if (a.isRegExp(r))
          return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = j(t), t) {
      const n = a.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || G(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let s = !1;
    function o(i) {
      if (i = j(i), i) {
        const c = a.findKey(n, i);
        c && (!r || G(n, n[c], c, r)) && (delete n[c], s = !0);
      }
    }
    return a.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, s = !1;
    for (; n--; ) {
      const o = r[n];
      (!t || G(this, this[o], o, t, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(t) {
    const r = this, n = {};
    return a.forEach(this, (s, o) => {
      const i = a.findKey(n, o);
      if (i) {
        r[i] = $(s), delete r[o];
        return;
      }
      const c = t ? Jt(o) : String(o).trim();
      c !== o && delete r[o], r[c] = $(s), n[c] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return a.forEach(this, (n, s) => {
      n != null && n !== !1 && (r[s] = t && a.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(t) {
    const n = (this[pe] = this[pe] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const c = j(i);
      n[c] || (Vt(s, i), n[c] = !0);
    }
    return a.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
P.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.reduceDescriptors(P.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
a.freezeMethods(P);
function X(e, t) {
  const r = this || k, n = t || r, s = P.from(n.headers);
  let o = n.data;
  return a.forEach(e, function(c) {
    o = c.call(r, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function je(e) {
  return !!(e && e.__CANCEL__);
}
function H(e, t, r) {
  y.call(this, e ?? "canceled", y.ERR_CANCELED, t, r), this.name = "CanceledError";
}
a.inherits(H, y, {
  __CANCEL__: !0
});
function Wt(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new y(
    "Request failed with status code " + r.status,
    [y.ERR_BAD_REQUEST, y.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Kt = g.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, s, o) {
      const i = [e + "=" + encodeURIComponent(t)];
      a.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), a.isString(n) && i.push("path=" + n), a.isString(s) && i.push("domain=" + s), o === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Gt(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Xt(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ve(e, t) {
  return e && !Gt(t) ? Xt(e, t) : t;
}
const Qt = g.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
    let n;
    function s(o) {
      let i = o;
      return t && (r.setAttribute("href", i), i = r.href), r.setAttribute("href", i), {
        href: r.href,
        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
        host: r.host,
        search: r.search ? r.search.replace(/^\?/, "") : "",
        hash: r.hash ? r.hash.replace(/^#/, "") : "",
        hostname: r.hostname,
        port: r.port,
        pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
      };
    }
    return n = s(window.location.href), function(i) {
      const c = a.isString(i) ? s(i) : i;
      return c.protocol === n.protocol && c.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
);
function Zt(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Yt(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const p = Date.now(), d = n[o];
    i || (i = p), r[s] = l, n[s] = p;
    let u = o, E = 0;
    for (; u !== s; )
      E += r[u++], u = u % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), p - i < t)
      return;
    const b = d && p - d;
    return b ? Math.round(E * 1e3 / b) : void 0;
  };
}
function he(e, t) {
  let r = 0;
  const n = Yt(50, 250);
  return (s) => {
    const o = s.loaded, i = s.lengthComputable ? s.total : void 0, c = o - r, l = n(c), p = o <= i;
    r = o;
    const d = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: c,
      rate: l || void 0,
      estimated: l && i && p ? (i - o) / l : void 0,
      event: s
    };
    d[t ? "download" : "upload"] = !0, e(d);
  };
}
const er = typeof XMLHttpRequest < "u", tr = er && function(e) {
  return new Promise(function(r, n) {
    let s = e.data;
    const o = P.from(e.headers).normalize();
    let { responseType: i, withXSRFToken: c } = e, l;
    function p() {
      e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l);
    }
    let d;
    if (a.isFormData(s)) {
      if (g.hasStandardBrowserEnv || g.hasStandardBrowserWebWorkerEnv)
        o.setContentType(!1);
      else if ((d = o.getContentType()) !== !1) {
        const [f, ...m] = d ? d.split(";").map((w) => w.trim()).filter(Boolean) : [];
        o.setContentType([f || "multipart/form-data", ...m].join("; "));
      }
    }
    let u = new XMLHttpRequest();
    if (e.auth) {
      const f = e.auth.username || "", m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(f + ":" + m));
    }
    const E = ve(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), De(E, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function b() {
      if (!u)
        return;
      const f = P.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), w = {
        data: !i || i === "text" || i === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: f,
        config: e,
        request: u
      };
      Wt(function(A) {
        r(A), p();
      }, function(A) {
        n(A), p();
      }, w), u = null;
    }
    if ("onloadend" in u ? u.onloadend = b : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, u.onabort = function() {
      u && (n(new y("Request aborted", y.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      n(new y("Network Error", y.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let m = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const w = e.transitional || Le;
      e.timeoutErrorMessage && (m = e.timeoutErrorMessage), n(new y(
        m,
        w.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
        e,
        u
      )), u = null;
    }, g.hasStandardBrowserEnv && (c && a.isFunction(c) && (c = c(e)), c || c !== !1 && Qt(E))) {
      const f = e.xsrfHeaderName && e.xsrfCookieName && Kt.read(e.xsrfCookieName);
      f && o.set(e.xsrfHeaderName, f);
    }
    s === void 0 && o.setContentType(null), "setRequestHeader" in u && a.forEach(o.toJSON(), function(m, w) {
      u.setRequestHeader(w, m);
    }), a.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), i && i !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", he(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", he(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = (f) => {
      u && (n(!f || f.type ? new H(null, e, u) : f), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
    const h = Zt(E);
    if (h && g.protocols.indexOf(h) === -1) {
      n(new y("Unsupported protocol " + h + ":", y.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(s || null);
  });
}, ee = {
  http: Pt,
  xhr: tr
};
a.forEach(ee, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const me = (e) => `- ${e}`, rr = (e) => a.isFunction(e) || e === null || e === !1, Ie = {
  getAdapter: (e) => {
    e = a.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const s = {};
    for (let o = 0; o < t; o++) {
      r = e[o];
      let i;
      if (n = r, !rr(r) && (n = ee[(i = String(r)).toLowerCase()], n === void 0))
        throw new y(`Unknown adapter '${i}'`);
      if (n)
        break;
      s[i || "#" + o] = n;
    }
    if (!n) {
      const o = Object.entries(s).map(
        ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? o.length > 1 ? `since :
` + o.map(me).join(`
`) : " " + me(o[0]) : "as no adapter specified";
      throw new y(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: ee
};
function Q(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new H(null, e);
}
function ye(e) {
  return Q(e), e.headers = P.from(e.headers), e.data = X.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ie.getAdapter(e.adapter || k.adapter)(e).then(function(n) {
    return Q(e), n.data = X.call(
      e,
      e.transformResponse,
      n
    ), n.headers = P.from(n.headers), n;
  }, function(n) {
    return je(n) || (Q(e), n && n.response && (n.response.data = X.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = P.from(n.response.headers))), Promise.reject(n);
  });
}
const Ee = (e) => e instanceof P ? { ...e } : e;
function U(e, t) {
  t = t || {};
  const r = {};
  function n(p, d, u) {
    return a.isPlainObject(p) && a.isPlainObject(d) ? a.merge.call({ caseless: u }, p, d) : a.isPlainObject(d) ? a.merge({}, d) : a.isArray(d) ? d.slice() : d;
  }
  function s(p, d, u) {
    if (a.isUndefined(d)) {
      if (!a.isUndefined(p))
        return n(void 0, p, u);
    } else
      return n(p, d, u);
  }
  function o(p, d) {
    if (!a.isUndefined(d))
      return n(void 0, d);
  }
  function i(p, d) {
    if (a.isUndefined(d)) {
      if (!a.isUndefined(p))
        return n(void 0, p);
    } else
      return n(void 0, d);
  }
  function c(p, d, u) {
    if (u in t)
      return n(p, d);
    if (u in e)
      return n(void 0, p);
  }
  const l = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: c,
    headers: (p, d) => s(Ee(p), Ee(d), !0)
  };
  return a.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const u = l[d] || s, E = u(e[d], t[d], d);
    a.isUndefined(E) && u !== c || (r[d] = E);
  }), r;
}
const ke = "1.6.8", oe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  oe[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const we = {};
oe.transitional = function(t, r, n) {
  function s(o, i) {
    return "[Axios v" + ke + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, c) => {
    if (t === !1)
      throw new y(
        s(i, " has been removed" + (r ? " in " + r : "")),
        y.ERR_DEPRECATED
      );
    return r && !we[i] && (we[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(o, i, c) : !0;
  };
};
function nr(e, t, r) {
  if (typeof e != "object")
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s], i = t[o];
    if (i) {
      const c = e[o], l = c === void 0 || i(c, o, e);
      if (l !== !0)
        throw new y("option " + o + " must be " + l, y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new y("Unknown option " + o, y.ERR_BAD_OPTION);
  }
}
const te = {
  assertOptions: nr,
  validators: oe
}, F = te.validators;
class D {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new de(),
      response: new de()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let s;
        Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = U(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: o } = r;
    n !== void 0 && te.assertOptions(n, {
      silentJSONParsing: F.transitional(F.boolean),
      forcedJSONParsing: F.transitional(F.boolean),
      clarifyTimeoutError: F.transitional(F.boolean)
    }, !1), s != null && (a.isFunction(s) ? r.paramsSerializer = {
      serialize: s
    } : te.assertOptions(s, {
      encode: F.function,
      serialize: F.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = o && a.merge(
      o.common,
      o[r.method]
    );
    o && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete o[h];
      }
    ), r.headers = P.concat(i, o);
    const c = [];
    let l = !0;
    this.interceptors.request.forEach(function(f) {
      typeof f.runWhen == "function" && f.runWhen(r) === !1 || (l = l && f.synchronous, c.unshift(f.fulfilled, f.rejected));
    });
    const p = [];
    this.interceptors.response.forEach(function(f) {
      p.push(f.fulfilled, f.rejected);
    });
    let d, u = 0, E;
    if (!l) {
      const h = [ye.bind(this), void 0];
      for (h.unshift.apply(h, c), h.push.apply(h, p), E = h.length, d = Promise.resolve(r); u < E; )
        d = d.then(h[u++], h[u++]);
      return d;
    }
    E = c.length;
    let b = r;
    for (u = 0; u < E; ) {
      const h = c[u++], f = c[u++];
      try {
        b = h(b);
      } catch (m) {
        f.call(this, m);
        break;
      }
    }
    try {
      d = ye.call(this, b);
    } catch (h) {
      return Promise.reject(h);
    }
    for (u = 0, E = p.length; u < E; )
      d = d.then(p[u++], p[u++]);
    return d;
  }
  getUri(t) {
    t = U(this.defaults, t);
    const r = ve(t.baseURL, t.url);
    return De(r, t.params, t.paramsSerializer);
  }
}
a.forEach(["delete", "get", "head", "options"], function(t) {
  D.prototype[t] = function(r, n) {
    return this.request(U(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(o, i, c) {
      return this.request(U(c || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  D.prototype[t] = r(), D.prototype[t + "Form"] = r(!0);
});
class ie {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(o) {
      r = o;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners)
        return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((c) => {
        n.subscribe(c), o = c;
      }).then(s);
      return i.cancel = function() {
        n.unsubscribe(o);
      }, i;
    }, t(function(o, i, c) {
      n.reason || (n.reason = new H(o, i, c), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ie(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
function sr(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function or(e) {
  return a.isObject(e) && e.isAxiosError === !0;
}
const re = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(re).forEach(([e, t]) => {
  re[t] = e;
});
function He(e) {
  const t = new D(e), r = Re(D.prototype.request, t);
  return a.extend(r, D.prototype, t, { allOwnKeys: !0 }), a.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(s) {
    return He(U(e, s));
  }, r;
}
const R = He(k);
R.Axios = D;
R.CanceledError = H;
R.CancelToken = ie;
R.isCancel = je;
R.VERSION = ke;
R.toFormData = W;
R.AxiosError = y;
R.Cancel = R.CanceledError;
R.all = function(t) {
  return Promise.all(t);
};
R.spread = sr;
R.isAxiosError = or;
R.mergeConfig = U;
R.AxiosHeaders = P;
R.formToJSON = (e) => Be(a.isHTMLForm(e) ? new FormData(e) : e);
R.getAdapter = Ie.getAdapter;
R.HttpStatusCode = re;
R.default = R;
function ir(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r];
    if (n === "*" || n === "+" || n === "?") {
      t.push({ type: "MODIFIER", index: r, value: e[r++] });
      continue;
    }
    if (n === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
      continue;
    }
    if (n === "{") {
      t.push({ type: "OPEN", index: r, value: e[r++] });
      continue;
    }
    if (n === "}") {
      t.push({ type: "CLOSE", index: r, value: e[r++] });
      continue;
    }
    if (n === ":") {
      for (var s = "", o = r + 1; o < e.length; ) {
        var i = e.charCodeAt(o);
        if (
          // `0-9`
          i >= 48 && i <= 57 || // `A-Z`
          i >= 65 && i <= 90 || // `a-z`
          i >= 97 && i <= 122 || // `_`
          i === 95
        ) {
          s += e[o++];
          continue;
        }
        break;
      }
      if (!s)
        throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: s }), r = o;
      continue;
    }
    if (n === "(") {
      var c = 1, l = "", o = r + 1;
      if (e[o] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(o));
      for (; o < e.length; ) {
        if (e[o] === "\\") {
          l += e[o++] + e[o++];
          continue;
        }
        if (e[o] === ")") {
          if (c--, c === 0) {
            o++;
            break;
          }
        } else if (e[o] === "(" && (c++, e[o + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(o));
        l += e[o++];
      }
      if (c)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: l }), r = o;
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function ar(e, t) {
  t === void 0 && (t = {});
  for (var r = ir(e), n = t.prefixes, s = n === void 0 ? "./" : n, o = "[^".concat(lr(t.delimiter || "/#?"), "]+?"), i = [], c = 0, l = 0, p = "", d = function(S) {
    if (l < r.length && r[l].type === S)
      return r[l++].value;
  }, u = function(S) {
    var O = d(S);
    if (O !== void 0)
      return O;
    var L = r[l], Me = L.type, qe = L.index;
    throw new TypeError("Unexpected ".concat(Me, " at ").concat(qe, ", expected ").concat(S));
  }, E = function() {
    for (var S = "", O; O = d("CHAR") || d("ESCAPED_CHAR"); )
      S += O;
    return S;
  }; l < r.length; ) {
    var b = d("CHAR"), h = d("NAME"), f = d("PATTERN");
    if (h || f) {
      var m = b || "";
      s.indexOf(m) === -1 && (p += m, m = ""), p && (i.push(p), p = ""), i.push({
        name: h || c++,
        prefix: m,
        suffix: "",
        pattern: f || o,
        modifier: d("MODIFIER") || ""
      });
      continue;
    }
    var w = b || d("ESCAPED_CHAR");
    if (w) {
      p += w;
      continue;
    }
    p && (i.push(p), p = "");
    var T = d("OPEN");
    if (T) {
      var m = E(), A = d("NAME") || "", C = d("PATTERN") || "", M = E();
      u("CLOSE"), i.push({
        name: A || (C ? c++ : ""),
        pattern: A && !C ? o : C,
        prefix: m,
        suffix: M,
        modifier: d("MODIFIER") || ""
      });
      continue;
    }
    u("END");
  }
  return i;
}
function cr(e, t) {
  return ur(ar(e, t), t);
}
function ur(e, t) {
  t === void 0 && (t = {});
  var r = fr(t), n = t.encode, s = n === void 0 ? function(l) {
    return l;
  } : n, o = t.validate, i = o === void 0 ? !0 : o, c = e.map(function(l) {
    if (typeof l == "object")
      return new RegExp("^(?:".concat(l.pattern, ")$"), r);
  });
  return function(l) {
    for (var p = "", d = 0; d < e.length; d++) {
      var u = e[d];
      if (typeof u == "string") {
        p += u;
        continue;
      }
      var E = l ? l[u.name] : void 0, b = u.modifier === "?" || u.modifier === "*", h = u.modifier === "*" || u.modifier === "+";
      if (Array.isArray(E)) {
        if (!h)
          throw new TypeError('Expected "'.concat(u.name, '" to not repeat, but got an array'));
        if (E.length === 0) {
          if (b)
            continue;
          throw new TypeError('Expected "'.concat(u.name, '" to not be empty'));
        }
        for (var f = 0; f < E.length; f++) {
          var m = s(E[f], u);
          if (i && !c[d].test(m))
            throw new TypeError('Expected all "'.concat(u.name, '" to match "').concat(u.pattern, '", but got "').concat(m, '"'));
          p += u.prefix + m + u.suffix;
        }
        continue;
      }
      if (typeof E == "string" || typeof E == "number") {
        var m = s(String(E), u);
        if (i && !c[d].test(m))
          throw new TypeError('Expected "'.concat(u.name, '" to match "').concat(u.pattern, '", but got "').concat(m, '"'));
        p += u.prefix + m + u.suffix;
        continue;
      }
      if (!b) {
        var w = h ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(u.name, '" to be ').concat(w));
      }
    }
    return p;
  };
}
function lr(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function fr(e) {
  return e && e.sensitive ? "" : "i";
}
class hr {
  constructor(t = "", r = R.create({
    withCredentials: !0,
    baseURL: t,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })) {
    ae(this, "axiosInstance");
    this.axiosInstance = r;
  }
  /**
  * Registers request interceptors for axios library
  * @function
  * @param {function} [onFulfilled] - A function to be called when the request is fulfilled.
  * It takes an AxiosRequestConfig object as its parameter, and returns an AxiosRequestConfig object or a promise that resolves to an AxiosRequestConfig object.
  * @param {function} [onError=Promise.reject(error)] - A function to be called when the request is rejected.
  * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
  */
  registerRequestInterceptor(t, r = (n) => Promise.reject(n)) {
    this.axiosInstance.interceptors.request.use(t, r);
  }
  /**
   * Registers response interceptors for axios library
   * @function
   * @param {function} [onFulfilled] - A function to be called when the response is fulfilled.
   * It takes an AxiosResponse object as its parameter, and returns an AxiosResponse object or a promise that resolves to an AxiosResponse object.
   * @param {function} [onError=Promise.reject(error)] - A function to be called when the response is rejected.
   * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
   */
  registerResponseInterceptor(t, r = (n) => Promise.reject(n)) {
    this.axiosInstance.interceptors.response.use(t, r);
  }
  fetch(t = "", r = { method: "GET", immediate: !0 }) {
    const n = [], s = [], o = [], i = [], { immediate: c = !1 } = r, l = Je({
      isLoading: !1,
      isFinished: !1,
      isAborted: !1,
      statusCode: 0,
      response: null,
      data: null,
      error: null
    }), p = this.axiosInstance;
    async function d(f) {
      var M;
      const m = cr(t), w = {}, T = (f == null ? void 0 : f.routeParams) || r.routeParams || {}, A = Object.keys(T);
      A.length > 0 && A.forEach((S) => {
        w[S] = T[S].toString();
      });
      const C = {
        url: m(w || (f == null ? void 0 : f.routeParams)),
        method: r.method || "GET",
        params: (f == null ? void 0 : f.params) || r.params || {},
        data: r.payload || {},
        headers: r.headers || {},
        onUploadProgress(S) {
          i.forEach((O) => {
            O(S);
          });
        }
      };
      f != null && f.payload && (((M = C.method) == null ? void 0 : M.toLowerCase()) === "get" ? C.params = f.payload : C.data = f.payload), f != null && f.headers && (C.headers = f.headers), l.isLoading = !0;
      try {
        const S = await p(C);
        l.response = S, l.data = S.data, l.statusCode = S.status, n.forEach((O) => {
          O(l.data, l.response, p);
        }), l.isFinished = !0;
      } catch (S) {
        const O = S;
        O.response ? (l.response = O.response, l.statusCode = O.response.status, l.data = O.response.data, s.forEach((L) => {
          L(l.data, l.response);
        })) : (l.error = O, o.forEach((L) => {
          L(l.error);
        }));
      } finally {
        l.isLoading = !1;
      }
      return l.response || l.error;
    }
    function u(f) {
      n.push(f);
    }
    function E(f) {
      s.push(f);
    }
    function b(f) {
      o.push(f);
    }
    function h(f) {
      i.push(f);
    }
    return c && d(r), {
      // ...toRefs(context),
      isLoading: _(() => l.isLoading),
      isFinished: _(() => l.isFinished),
      isAborted: _(() => l.isAborted),
      statusCode: _(() => l.statusCode),
      response: _(() => l.response),
      // data: T | unknown | null;
      error: _(() => l.error),
      data: _(() => l.data),
      execute: d,
      onSuccess: u,
      onFailure: E,
      onError: b,
      onUploadProgress: h
    };
  }
  createCrudApi(t, r) {
    const n = `${t}s`, s = be(t), o = be(n), i = this.fetch;
    return {
      [`useFetch${o}`](c = {
        immediate: !1,
        method: "GET",
        params: {},
        headers: {},
        routeParams: {},
        data: {}
      }) {
        return i(`${r || n}`, c);
      },
      [`useFetch${s}`](c, l = {
        immediate: !1,
        method: "GET",
        params: {},
        headers: {},
        routeParams: {},
        data: {}
      }) {
        return i(`${r || n}/${c}`, l);
      },
      [`useFetch${s}Dynamic`](c = {}) {
        return i(`${r || n}/:id`, c);
      },
      [`useCreate${s}`](c = {
        params: {},
        headers: {},
        routeParams: {},
        data: {}
      }) {
        return i(`${r || n}`, {
          immediate: !1,
          method: "POST",
          ...c
        });
      },
      [`useUpdate${s}`](c, l = {
        params: {},
        headers: {},
        routeParams: {},
        data: {}
      }) {
        return i(`${r || n}/${c}`, {
          immediate: !1,
          method: "PUT",
          ...l
        });
      },
      [`useDelete${s}`](c, l = {
        params: {},
        headers: {},
        routeParams: {},
        data: {}
      }) {
        return i(`${r || n}/${c}`, {
          immediate: !1,
          method: "DELETE",
          ...l
        });
      },
      [`useDelete${s}Dynamic`](c = {
        params: {},
        headers: {},
        routeParams: {},
        data: {}
      }) {
        return i(`${r || n}/:id`, {
          immediate: !1,
          method: "DELETE",
          ...c
        });
      }
    };
  }
}
function be(e) {
  return e.replace(
    /(\w)(\w*)/g,
    (t, r, n) => r.toUpperCase() + n.toLowerCase()
  );
}
export {
  hr as VFetcher
};
