/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Server": () => (/* binding */ Server),
/* harmony export */   "worker": () => (/* binding */ worker)
/* harmony export */ });
// src/util/must.ts
function must(arg, msg = "Unexpected undefined value") {
  if (arg === void 0) {
    throw new Error(msg);
  }
  return arg;
}

// node_modules/zod/lib/index.mjs
var extendStatics = function(e, t) {
  return (extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e2, t2) {
    e2.__proto__ = t2;
  } || function(e2, t2) {
    for (var r in t2)
      Object.prototype.hasOwnProperty.call(t2, r) && (e2[r] = t2[r]);
  })(e, t);
};
function __extends(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function r() {
    this.constructor = e;
  }
  extendStatics(e, t), e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var util;
var __assign = function() {
  return (__assign = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++)
      for (var a in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e;
  }).apply(this, arguments);
};
function __awaiter(e, s, i, u) {
  return new (i = i || Promise)(function(r, t) {
    function n(e2) {
      try {
        o(u.next(e2));
      } catch (e3) {
        t(e3);
      }
    }
    function a(e2) {
      try {
        o(u.throw(e2));
      } catch (e3) {
        t(e3);
      }
    }
    function o(e2) {
      var t2;
      e2.done ? r(e2.value) : ((t2 = e2.value) instanceof i ? t2 : new i(function(e3) {
        e3(t2);
      })).then(n, a);
    }
    o((u = u.apply(e, s || [])).next());
  });
}
function __generator(r, n) {
  var a, o, s, i = { label: 0, sent: function() {
    if (1 & s[0])
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, e = { next: t(0), throw: t(1), return: t(2) };
  return typeof Symbol == "function" && (e[Symbol.iterator] = function() {
    return this;
  }), e;
  function t(t2) {
    return function(e2) {
      return function(t3) {
        if (a)
          throw new TypeError("Generator is already executing.");
        for (; i; )
          try {
            if (a = 1, o && (s = 2 & t3[0] ? o.return : t3[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t3[1])).done)
              return s;
            switch (o = 0, (t3 = s ? [2 & t3[0], s.value] : t3)[0]) {
              case 0:
              case 1:
                s = t3;
                break;
              case 4:
                return i.label++, { value: t3[1], done: false };
              case 5:
                i.label++, o = t3[1], t3 = [0];
                continue;
              case 7:
                t3 = i.ops.pop(), i.trys.pop();
                continue;
              default:
                if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (t3[0] === 6 || t3[0] === 2)) {
                  i = 0;
                  continue;
                }
                if (t3[0] === 3 && (!s || t3[1] > s[0] && t3[1] < s[3])) {
                  i.label = t3[1];
                  break;
                }
                if (t3[0] === 6 && i.label < s[1]) {
                  i.label = s[1], s = t3;
                  break;
                }
                if (s && i.label < s[2]) {
                  i.label = s[2], i.ops.push(t3);
                  break;
                }
                s[2] && i.ops.pop(), i.trys.pop();
                continue;
            }
            t3 = n.call(r, i);
          } catch (e3) {
            t3 = [6, e3], o = 0;
          } finally {
            a = s = 0;
          }
        if (5 & t3[0])
          throw t3[1];
        return { value: t3[0] ? t3[1] : void 0, done: true };
      }([t2, e2]);
    };
  }
}
function __values(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r)
    return r.call(e);
  if (e && typeof e.length == "number")
    return { next: function() {
      return { value: (e = e && n >= e.length ? void 0 : e) && e[n++], done: !e };
    } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n, a, o = r.call(e), s = [];
  try {
    for (; (t === void 0 || 0 < t--) && !(n = o.next()).done; )
      s.push(n.value);
  } catch (e2) {
    a = { error: e2 };
  } finally {
    try {
      n && !n.done && (r = o.return) && r.call(o);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return s;
}
function __spreadArray(e, t, r) {
  if (r || arguments.length === 2)
    for (var n, a = 0, o = t.length; a < o; a++)
      !n && a in t || ((n = n || Array.prototype.slice.call(t, 0, a))[a] = t[a]);
  return e.concat(n || Array.prototype.slice.call(t));
}
!function(u) {
  u.assertNever = function(e) {
    throw new Error();
  }, u.arrayToEnum = function(e) {
    var t, r, n = {};
    try {
      for (var a = __values(e), o = a.next(); !o.done; o = a.next()) {
        var s = o.value;
        n[s] = s;
      }
    } catch (e2) {
      t = { error: e2 };
    } finally {
      try {
        o && !o.done && (r = a.return) && r.call(a);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return n;
  }, u.getValidEnumValues = function(t) {
    var r, e, n = u.objectKeys(t).filter(function(e2) {
      return typeof t[t[e2]] != "number";
    }), a = {};
    try {
      for (var o = __values(n), s = o.next(); !s.done; s = o.next()) {
        var i = s.value;
        a[i] = t[i];
      }
    } catch (e2) {
      r = { error: e2 };
    } finally {
      try {
        s && !s.done && (e = o.return) && e.call(o);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return u.objectValues(a);
  }, u.objectValues = function(t) {
    return u.objectKeys(t).map(function(e) {
      return t[e];
    });
  }, u.objectKeys = typeof Object.keys == "function" ? function(e) {
    return Object.keys(e);
  } : function(e) {
    var t, r = [];
    for (t in e)
      Object.prototype.hasOwnProperty.call(e, t) && r.push(t);
    return r;
  }, u.find = function(e, t) {
    var r, n;
    try {
      for (var a = __values(e), o = a.next(); !o.done; o = a.next()) {
        var s = o.value;
        if (t(s))
          return s;
      }
    } catch (e2) {
      r = { error: e2 };
    } finally {
      try {
        o && !o.done && (n = a.return) && n.call(a);
      } finally {
        if (r)
          throw r.error;
      }
    }
  }, u.isInteger = typeof Number.isInteger == "function" ? function(e) {
    return Number.isInteger(e);
  } : function(e) {
    return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
  };
}(util = util || {});
var ZodIssueCode = util.arrayToEnum(["invalid_type", "custom", "invalid_union", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of"]);
var quotelessJson = function(e) {
  return JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
};
var ZodError = function(r) {
  function t(e) {
    var t2 = this.constructor, u = r.call(this) || this;
    u.issues = [], u.format = function() {
      var p = { _errors: [] }, c = function(e2) {
        var t3, r2;
        try {
          for (var n = __values(e2.issues), a = n.next(); !a.done; a = n.next()) {
            var o = a.value;
            if (o.code === "invalid_union")
              o.unionErrors.map(c);
            else if (o.code === "invalid_return_type")
              c(o.returnTypeError);
            else if (o.code === "invalid_arguments")
              c(o.argumentsError);
            else if (o.path.length === 0)
              p._errors.push(o.message);
            else
              for (var s = p, i = 0; i < o.path.length; ) {
                var u2, d = o.path[i];
                i === o.path.length - 1 ? (s[d] = s[d] || { _errors: [] }, s[d]._errors.push(o.message)) : typeof d == "string" ? s[d] = s[d] || { _errors: [] } : typeof d == "number" && ((u2 = [])._errors = [], s[d] = s[d] || u2), s = s[d], i++;
              }
          }
        } catch (e3) {
          t3 = { error: e3 };
        } finally {
          try {
            a && !a.done && (r2 = n.return) && r2.call(n);
          } finally {
            if (t3)
              throw t3.error;
          }
        }
      };
      return c(u), p;
    }, u.addIssue = function(e2) {
      u.issues = __spreadArray(__spreadArray([], __read(u.issues), false), [e2], false);
    }, u.addIssues = function(e2) {
      e2 === void 0 && (e2 = []), u.issues = __spreadArray(__spreadArray([], __read(u.issues), false), __read(e2), false);
    }, u.flatten = function(e2) {
      var t3, r2;
      e2 === void 0 && (e2 = function(e3) {
        return e3.message;
      });
      var n = {}, a = [];
      try {
        for (var o = __values(u.issues), s = o.next(); !s.done; s = o.next()) {
          var i = s.value;
          0 < i.path.length ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(e2(i))) : a.push(e2(i));
        }
      } catch (e3) {
        t3 = { error: e3 };
      } finally {
        try {
          s && !s.done && (r2 = o.return) && r2.call(o);
        } finally {
          if (t3)
            throw t3.error;
        }
      }
      return { formErrors: a, fieldErrors: n };
    };
    t2 = t2.prototype;
    return Object.setPrototypeOf ? Object.setPrototypeOf(u, t2) : u.__proto__ = t2, u.name = "ZodError", u.issues = e, u;
  }
  return __extends(t, r), Object.defineProperty(t.prototype, "errors", { get: function() {
    return this.issues;
  }, enumerable: false, configurable: true }), t.prototype.toString = function() {
    return this.message;
  }, Object.defineProperty(t.prototype, "message", { get: function() {
    return JSON.stringify(this.issues, null, 2);
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "isEmpty", { get: function() {
    return this.issues.length === 0;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "formErrors", { get: function() {
    return this.flatten();
  }, enumerable: false, configurable: true }), t.create = function(e) {
    return new t(e);
  }, t;
}(Error);
var defaultErrorMap = function(e, t) {
  var r;
  switch (e.code) {
    case ZodIssueCode.invalid_type:
      r = e.received === "undefined" ? "Required" : "Expected " + e.expected + ", received " + e.received;
      break;
    case ZodIssueCode.unrecognized_keys:
      r = "Unrecognized key(s) in object: " + e.keys.map(function(e2) {
        return "'" + e2 + "'";
      }).join(", ");
      break;
    case ZodIssueCode.invalid_union:
      r = "Invalid input";
      break;
    case ZodIssueCode.invalid_enum_value:
      r = "Invalid enum value. Expected " + e.options.map(function(e2) {
        return typeof e2 == "string" ? "'" + e2 + "'" : e2;
      }).join(" | ") + ", received " + (typeof t.data == "string" ? "'" + t.data + "'" : t.data);
      break;
    case ZodIssueCode.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case ZodIssueCode.invalid_return_type:
      r = "Invalid function return type";
      break;
    case ZodIssueCode.invalid_date:
      r = "Invalid date";
      break;
    case ZodIssueCode.invalid_string:
      r = e.validation !== "regex" ? "Invalid " + e.validation : "Invalid";
      break;
    case ZodIssueCode.too_small:
      r = e.type === "array" ? "Should have " + (e.inclusive ? "at least" : "more than") + " " + e.minimum + " items" : e.type === "string" ? "Should be " + (e.inclusive ? "at least" : "over") + " " + e.minimum + " characters" : e.type === "number" ? "Value should be greater than " + (e.inclusive ? "or equal to " : "") + e.minimum : "Invalid input";
      break;
    case ZodIssueCode.too_big:
      r = e.type === "array" ? "Should have " + (e.inclusive ? "at most" : "less than") + " " + e.maximum + " items" : e.type === "string" ? "Should be " + (e.inclusive ? "at most" : "under") + " " + e.maximum + " characters long" : e.type === "number" ? "Value should be less than " + (e.inclusive ? "or equal to " : "") + e.maximum : "Invalid input";
      break;
    case ZodIssueCode.custom:
      r = "Invalid input";
      break;
    case ZodIssueCode.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case ZodIssueCode.not_multiple_of:
      r = "Should be multiple of " + e.multipleOf;
      break;
    default:
      r = t.defaultError, util.assertNever(e);
  }
  return { message: r };
};
var overrideErrorMap = defaultErrorMap;
var setErrorMap = function(e) {
  overrideErrorMap = e;
};
var ZodParsedType = util.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
function cacheAndReturn(e, t, r) {
  return r && r.set(e, t), t;
}
var getParsedType = function(e, t) {
  if (t && t.has(e))
    return t.get(e);
  switch (typeof e) {
    case "undefined":
      return cacheAndReturn(e, ZodParsedType.undefined, t);
    case "string":
      return cacheAndReturn(e, ZodParsedType.string, t);
    case "number":
      return cacheAndReturn(e, isNaN(e) ? ZodParsedType.nan : ZodParsedType.number, t);
    case "boolean":
      return cacheAndReturn(e, ZodParsedType.boolean, t);
    case "function":
      return cacheAndReturn(e, ZodParsedType.function, t);
    case "bigint":
      return cacheAndReturn(e, ZodParsedType.bigint, t);
    case "object":
      return Array.isArray(e) ? cacheAndReturn(e, ZodParsedType.array, t) : e === null ? cacheAndReturn(e, ZodParsedType.null, t) : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? cacheAndReturn(e, ZodParsedType.promise, t) : e instanceof Map ? cacheAndReturn(e, ZodParsedType.map, t) : e instanceof Set ? cacheAndReturn(e, ZodParsedType.set, t) : e instanceof Date ? cacheAndReturn(e, ZodParsedType.date, t) : cacheAndReturn(e, ZodParsedType.object, t);
    default:
      return cacheAndReturn(e, ZodParsedType.unknown, t);
  }
};
var makeIssue = function(e) {
  var t, r, n = e.data, a = e.path, o = e.errorMaps, e = e.issueData, a = __spreadArray(__spreadArray([], __read(a), false), __read(e.path || []), false), s = __assign(__assign({}, e), { path: a }), i = "", o = o.filter(function(e2) {
    return !!e2;
  }).slice().reverse();
  try {
    for (var u = __values(o), d = u.next(); !d.done; d = u.next())
      i = (0, d.value)(s, { data: n, defaultError: i }).message;
  } catch (e2) {
    t = { error: e2 };
  } finally {
    try {
      d && !d.done && (r = u.return) && r.call(u);
    } finally {
      if (t)
        throw t.error;
    }
  }
  return __assign(__assign({}, e), { path: a, message: e.message || i });
};
var EMPTY_PATH = [];
function addIssueToContext(e, t) {
  t = makeIssue({ issueData: t, data: e.data, path: e.path, errorMaps: [e.contextualErrorMap, e.schemaErrorMap, overrideErrorMap, defaultErrorMap].filter(function(e2) {
    return !!e2;
  }) });
  e.issues.push(t);
}
var errorUtil;
var ParseStatus = function() {
  function l() {
    this.value = "valid";
  }
  return l.prototype.dirty = function() {
    this.value === "valid" && (this.value = "dirty");
  }, l.prototype.abort = function() {
    this.value !== "aborted" && (this.value = "aborted");
  }, l.mergeArray = function(e, t) {
    var r, n, a = [];
    try {
      for (var o = __values(t), s = o.next(); !s.done; s = o.next()) {
        var i = s.value;
        if (i.status === "aborted")
          return INVALID;
        i.status === "dirty" && e.dirty(), a.push(i.value);
      }
    } catch (e2) {
      r = { error: e2 };
    } finally {
      try {
        s && !s.done && (n = o.return) && n.call(o);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return { status: e.value, value: a };
  }, l.mergeObjectAsync = function(p, c) {
    return __awaiter(this, void 0, void 0, function() {
      var t, r, n, a, o, s, i, u, d;
      return __generator(this, function(e) {
        switch (e.label) {
          case 0:
            t = [], e.label = 1;
          case 1:
            e.trys.push([1, 7, 8, 9]), r = __values(c), n = r.next(), e.label = 2;
          case 2:
            return n.done ? [3, 6] : (a = n.value, s = (o = t).push, d = {}, [4, a.key]);
          case 3:
            return d.key = e.sent(), [4, a.value];
          case 4:
            s.apply(o, [(d.value = e.sent(), d)]), e.label = 5;
          case 5:
            return n = r.next(), [3, 2];
          case 6:
            return [3, 9];
          case 7:
            return i = e.sent(), i = { error: i }, [3, 9];
          case 8:
            try {
              n && !n.done && (u = r.return) && u.call(r);
            } finally {
              if (i)
                throw i.error;
            }
            return [7];
          case 9:
            return [2, l.mergeObjectSync(p, t)];
        }
      });
    });
  }, l.mergeObjectSync = function(e, t) {
    var r, n, a = {};
    try {
      for (var o = __values(t), s = o.next(); !s.done; s = o.next()) {
        var i = s.value, u = i.key, d = i.value;
        if (u.status === "aborted")
          return INVALID;
        if (d.status === "aborted")
          return INVALID;
        u.status === "dirty" && e.dirty(), d.status === "dirty" && e.dirty(), d.value === void 0 && !i.alwaysSet || (a[u.value] = d.value);
      }
    } catch (e2) {
      r = { error: e2 };
    } finally {
      try {
        s && !s.done && (n = o.return) && n.call(o);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return { status: e.value, value: a };
  }, l;
}();
var INVALID = Object.freeze({ status: "aborted" });
var DIRTY = function(e) {
  return { status: "dirty", value: e };
};
var OK = function(e) {
  return { status: "valid", value: e };
};
var isAborted = function(e) {
  return e.status === "aborted";
};
var isDirty = function(e) {
  return e.status === "dirty";
};
var isValid = function(e) {
  return e.status === "valid";
};
var isAsync = function(e) {
  return e instanceof Promise;
};
!function(e) {
  e.errToObj = function(e2) {
    return typeof e2 == "string" ? { message: e2 } : e2 || {};
  }, e.toString = function(e2) {
    return typeof e2 == "string" ? e2 : e2 == null ? void 0 : e2.message;
  };
}(errorUtil = errorUtil || {});
var handleResult = function(e, t) {
  if (isValid(t))
    return { success: true, data: t.value };
  if (!e.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return { success: false, error: new ZodError(e.issues) };
};
function processCreateParams(r) {
  if (!r)
    return {};
  if (r.errorMap && (r.invalid_type_error || r.required_error))
    throw new Error(`Can't use "invalid" or "required" in conjunction with custom error map.`);
  if (r.errorMap)
    return { errorMap: r.errorMap };
  return { errorMap: function(e, t) {
    return e.code !== "invalid_type" ? { message: t.defaultError } : t.data === void 0 && r.required_error ? { message: r.required_error } : r.invalid_type_error ? { message: r.invalid_type_error } : { message: t.defaultError };
  } };
}
var objectUtil;
var ZodType = function() {
  function e(e2) {
    this.spa = this.safeParseAsync, this.superRefine = this._refinement, this._def = e2, this.transform = this.transform.bind(this), this.default = this.default.bind(this);
  }
  return Object.defineProperty(e.prototype, "description", { get: function() {
    return this._def.description;
  }, enumerable: false, configurable: true }), e.prototype._processInputParams = function(e2) {
    return { status: new ParseStatus(), ctx: __assign(__assign({}, e2.parent), { data: e2.data, parsedType: getParsedType(e2.data, e2.parent.typeCache), schemaErrorMap: this._def.errorMap, path: e2.path, parent: e2.parent }) };
  }, e.prototype._parseSync = function(e2) {
    e2 = this._parse(e2);
    if (isAsync(e2))
      throw new Error("Synchronous parse encountered promise.");
    return e2;
  }, e.prototype._parseAsync = function(e2) {
    e2 = this._parse(e2);
    return Promise.resolve(e2);
  }, e.prototype.parse = function(e2, t) {
    t = this.safeParse(e2, t);
    if (t.success)
      return t.data;
    throw t.error;
  }, e.prototype.safeParse = function(e2, t) {
    t = { path: (t == null ? void 0 : t.path) || [], issues: [], contextualErrorMap: t == null ? void 0 : t.errorMap, schemaErrorMap: this._def.errorMap, async: (t = t == null ? void 0 : t.async) !== null && t !== void 0 && t, typeCache: /* @__PURE__ */ new Map(), parent: null, data: e2, parsedType: getParsedType(e2) }, e2 = this._parseSync({ data: e2, path: t.path, parent: t });
    return handleResult(t, e2);
  }, e.prototype.parseAsync = function(r, n) {
    return __awaiter(this, void 0, void 0, function() {
      var t;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, this.safeParseAsync(r, n)];
          case 1:
            if ((t = e2.sent()).success)
              return [2, t.data];
            throw t.error;
        }
      });
    });
  }, e.prototype.safeParseAsync = function(n, a) {
    return __awaiter(this, void 0, void 0, function() {
      var t, r;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return t = { path: (a == null ? void 0 : a.path) || [], issues: [], contextualErrorMap: a == null ? void 0 : a.errorMap, schemaErrorMap: this._def.errorMap, async: true, typeCache: /* @__PURE__ */ new Map(), parent: null, data: n, parsedType: getParsedType(n) }, r = this._parse({ data: n, path: [], parent: t }), [4, isAsync(r) ? r : Promise.resolve(r)];
          case 1:
            return r = e2.sent(), [2, handleResult(t, r)];
        }
      });
    });
  }, e.prototype.refine = function(a, o) {
    return this._refinement(function(t, r) {
      function n() {
        return r.addIssue(__assign({ code: ZodIssueCode.custom }, (e3 = t, typeof o == "string" || o === void 0 ? { message: o } : typeof o == "function" ? o(e3) : o)));
        var e3;
      }
      var e2 = a(t);
      return e2 instanceof Promise ? e2.then(function(e3) {
        return !!e3 || (n(), false);
      }) : !!e2 || (n(), false);
    });
  }, e.prototype.refinement = function(r, n) {
    return this._refinement(function(e2, t) {
      return !!r(e2) || (t.addIssue(typeof n == "function" ? n(e2, t) : n), false);
    });
  }, e.prototype._refinement = function(e2) {
    return new ZodEffects({ schema: this, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: { type: "refinement", refinement: e2 } });
  }, e.prototype.optional = function() {
    return ZodOptional.create(this);
  }, e.prototype.nullable = function() {
    return ZodNullable.create(this);
  }, e.prototype.nullish = function() {
    return this.optional().nullable();
  }, e.prototype.array = function() {
    return ZodArray.create(this);
  }, e.prototype.promise = function() {
    return ZodPromise.create(this);
  }, e.prototype.or = function(e2) {
    return ZodUnion.create([this, e2]);
  }, e.prototype.and = function(e2) {
    return ZodIntersection.create(this, e2);
  }, e.prototype.transform = function(e2) {
    return new ZodEffects({ schema: this, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: { type: "transform", transform: e2 } });
  }, e.prototype.default = function(e2) {
    return new ZodDefault({ innerType: this, defaultValue: typeof e2 == "function" ? e2 : function() {
      return e2;
    }, typeName: ZodFirstPartyTypeKind.ZodDefault });
  }, e.prototype.describe = function(e2) {
    return new this.constructor(__assign(__assign({}, this._def), { description: e2 }));
  }, e.prototype.isOptional = function() {
    return this.safeParse(void 0).success;
  }, e.prototype.isNullable = function() {
    return this.safeParse(null).success;
  }, e;
}();
var cuidRegex = /^c[^\s-]{8,}$/i;
var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var ZodString = function(e) {
  function t() {
    var n = e !== null && e.apply(this, arguments) || this;
    return n._regex = function(t2, e2, r) {
      return n.refinement(function(e3) {
        return t2.test(e3);
      }, __assign({ validation: e2, code: ZodIssueCode.invalid_string }, errorUtil.errToObj(r)));
    }, n.nonempty = function(e2) {
      return n.min(1, errorUtil.errToObj(e2));
    }, n;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    var t2, r, e2 = this._processInputParams(e2), n = e2.status, a = e2.ctx;
    if (a.parsedType !== ZodParsedType.string)
      return addIssueToContext(a, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.string, received: a.parsedType }), INVALID;
    try {
      for (var o = __values(this._def.checks), s = o.next(); !s.done; s = o.next()) {
        var i = s.value;
        if (i.kind === "min")
          a.data.length < i.value && (addIssueToContext(a, { code: ZodIssueCode.too_small, minimum: i.value, type: "string", inclusive: true, message: i.message }), n.dirty());
        else if (i.kind === "max")
          a.data.length > i.value && (addIssueToContext(a, { code: ZodIssueCode.too_big, maximum: i.value, type: "string", inclusive: true, message: i.message }), n.dirty());
        else if (i.kind === "email")
          emailRegex.test(a.data) || (addIssueToContext(a, { validation: "email", code: ZodIssueCode.invalid_string, message: i.message }), n.dirty());
        else if (i.kind === "uuid")
          uuidRegex.test(a.data) || (addIssueToContext(a, { validation: "uuid", code: ZodIssueCode.invalid_string, message: i.message }), n.dirty());
        else if (i.kind === "cuid")
          cuidRegex.test(a.data) || (addIssueToContext(a, { validation: "cuid", code: ZodIssueCode.invalid_string, message: i.message }), n.dirty());
        else if (i.kind === "url")
          try {
            new URL(a.data);
          } catch (e3) {
            addIssueToContext(a, { validation: "url", code: ZodIssueCode.invalid_string, message: i.message }), n.dirty();
          }
        else
          i.kind === "regex" && (i.regex.lastIndex = 0, i.regex.test(a.data) || (addIssueToContext(a, { validation: "regex", code: ZodIssueCode.invalid_string, message: i.message }), n.dirty()));
      }
    } catch (e3) {
      t2 = { error: e3 };
    } finally {
      try {
        s && !s.done && (r = o.return) && r.call(o);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return { status: n.value, value: a.data };
  }, t.prototype._addCheck = function(e2) {
    return new t(__assign(__assign({}, this._def), { checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [e2], false) }));
  }, t.prototype.email = function(e2) {
    return this._addCheck(__assign({ kind: "email" }, errorUtil.errToObj(e2)));
  }, t.prototype.url = function(e2) {
    return this._addCheck(__assign({ kind: "url" }, errorUtil.errToObj(e2)));
  }, t.prototype.uuid = function(e2) {
    return this._addCheck(__assign({ kind: "uuid" }, errorUtil.errToObj(e2)));
  }, t.prototype.cuid = function(e2) {
    return this._addCheck(__assign({ kind: "cuid" }, errorUtil.errToObj(e2)));
  }, t.prototype.regex = function(e2, t2) {
    return this._addCheck(__assign({ kind: "regex", regex: e2 }, errorUtil.errToObj(t2)));
  }, t.prototype.min = function(e2, t2) {
    return this._addCheck(__assign({ kind: "min", value: e2 }, errorUtil.errToObj(t2)));
  }, t.prototype.max = function(e2, t2) {
    return this._addCheck(__assign({ kind: "max", value: e2 }, errorUtil.errToObj(t2)));
  }, t.prototype.length = function(e2, t2) {
    return this.min(e2, t2).max(e2, t2);
  }, Object.defineProperty(t.prototype, "isEmail", { get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "email";
    });
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "isURL", { get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "url";
    });
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "isUUID", { get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "uuid";
    });
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "isCUID", { get: function() {
    return !!this._def.checks.find(function(e2) {
      return e2.kind === "cuid";
    });
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "minLength", { get: function() {
    var t2 = -1 / 0;
    return this._def.checks.map(function(e2) {
      e2.kind === "min" && (t2 === null || e2.value > t2) && (t2 = e2.value);
    }), t2;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "maxLength", { get: function() {
    var t2 = null;
    return this._def.checks.map(function(e2) {
      e2.kind === "max" && (t2 === null || e2.value < t2) && (t2 = e2.value);
    }), t2;
  }, enumerable: false, configurable: true }), t.create = function(e2) {
    return new t(__assign({ checks: [], typeName: ZodFirstPartyTypeKind.ZodString }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodNumber = function(t) {
  function a() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.min = e.gte, e.max = e.lte, e.step = e.multipleOf, e;
  }
  return __extends(a, t), a.prototype._parse = function(e) {
    var t2, r, e = this._processInputParams(e), n = e.status, a2 = e.ctx;
    if (a2.parsedType !== ZodParsedType.number)
      return addIssueToContext(a2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.number, received: a2.parsedType }), INVALID;
    try {
      for (var o = __values(this._def.checks), s = o.next(); !s.done; s = o.next()) {
        var i = s.value;
        i.kind === "int" ? util.isInteger(a2.data) || (addIssueToContext(a2, { code: ZodIssueCode.invalid_type, expected: "integer", received: "float", message: i.message }), n.dirty()) : i.kind === "min" ? (i.inclusive ? a2.data < i.value : a2.data <= i.value) && (addIssueToContext(a2, { code: ZodIssueCode.too_small, minimum: i.value, type: "number", inclusive: i.inclusive, message: i.message }), n.dirty()) : i.kind === "max" ? (i.inclusive ? a2.data > i.value : a2.data >= i.value) && (addIssueToContext(a2, { code: ZodIssueCode.too_big, maximum: i.value, type: "number", inclusive: i.inclusive, message: i.message }), n.dirty()) : i.kind === "multipleOf" ? a2.data % i.value != 0 && (addIssueToContext(a2, { code: ZodIssueCode.not_multiple_of, multipleOf: i.value, message: i.message }), n.dirty()) : util.assertNever(i);
      }
    } catch (e2) {
      t2 = { error: e2 };
    } finally {
      try {
        s && !s.done && (r = o.return) && r.call(o);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return { status: n.value, value: a2.data };
  }, a.prototype.gte = function(e, t2) {
    return this.setLimit("min", e, true, errorUtil.toString(t2));
  }, a.prototype.gt = function(e, t2) {
    return this.setLimit("min", e, false, errorUtil.toString(t2));
  }, a.prototype.lte = function(e, t2) {
    return this.setLimit("max", e, true, errorUtil.toString(t2));
  }, a.prototype.lt = function(e, t2) {
    return this.setLimit("max", e, false, errorUtil.toString(t2));
  }, a.prototype.setLimit = function(e, t2, r, n) {
    return new a(__assign(__assign({}, this._def), { checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [{ kind: e, value: t2, inclusive: r, message: errorUtil.toString(n) }], false) }));
  }, a.prototype._addCheck = function(e) {
    return new a(__assign(__assign({}, this._def), { checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [e], false) }));
  }, a.prototype.int = function(e) {
    return this._addCheck({ kind: "int", message: errorUtil.toString(e) });
  }, a.prototype.positive = function(e) {
    return this._addCheck({ kind: "min", value: 0, inclusive: false, message: errorUtil.toString(e) });
  }, a.prototype.negative = function(e) {
    return this._addCheck({ kind: "max", value: 0, inclusive: false, message: errorUtil.toString(e) });
  }, a.prototype.nonpositive = function(e) {
    return this._addCheck({ kind: "max", value: 0, inclusive: true, message: errorUtil.toString(e) });
  }, a.prototype.nonnegative = function(e) {
    return this._addCheck({ kind: "min", value: 0, inclusive: true, message: errorUtil.toString(e) });
  }, a.prototype.multipleOf = function(e, t2) {
    return this._addCheck({ kind: "multipleOf", value: e, message: errorUtil.toString(t2) });
  }, Object.defineProperty(a.prototype, "minValue", { get: function() {
    var t2, e, r = null;
    try {
      for (var n = __values(this._def.checks), a2 = n.next(); !a2.done; a2 = n.next()) {
        var o = a2.value;
        o.kind === "min" && (r === null || o.value > r) && (r = o.value);
      }
    } catch (e2) {
      t2 = { error: e2 };
    } finally {
      try {
        a2 && !a2.done && (e = n.return) && e.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true }), Object.defineProperty(a.prototype, "maxValue", { get: function() {
    var t2, e, r = null;
    try {
      for (var n = __values(this._def.checks), a2 = n.next(); !a2.done; a2 = n.next()) {
        var o = a2.value;
        o.kind === "max" && (r === null || o.value < r) && (r = o.value);
      }
    } catch (e2) {
      t2 = { error: e2 };
    } finally {
      try {
        a2 && !a2.done && (e = n.return) && e.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true }), Object.defineProperty(a.prototype, "isInt", { get: function() {
    return !!this._def.checks.find(function(e) {
      return e.kind === "int";
    });
  }, enumerable: false, configurable: true }), a.create = function(e) {
    return new a(__assign(__assign({ checks: [], typeName: ZodFirstPartyTypeKind.ZodNumber }, processCreateParams(e)), processCreateParams(e)));
  }, a;
}(ZodType);
var ZodBigInt = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType !== ZodParsedType.bigint ? (addIssueToContext(e2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.bigint, received: e2.parsedType }), INVALID) : OK(e2.data);
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodBigInt }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodBoolean = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType !== ZodParsedType.boolean ? (addIssueToContext(e2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.boolean, received: e2.parsedType }), INVALID) : OK(e2.data);
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodBoolean }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodDate = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    var t2 = this._processInputParams(e2), e2 = t2.status, t2 = t2.ctx;
    return t2.parsedType !== ZodParsedType.date ? (addIssueToContext(t2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.date, received: t2.parsedType }), INVALID) : isNaN(t2.data.getTime()) ? (addIssueToContext(t2, { code: ZodIssueCode.invalid_date }), INVALID) : { status: e2.value, value: new Date(t2.data.getTime()) };
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodDate }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodUndefined = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType !== ZodParsedType.undefined ? (addIssueToContext(e2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.undefined, received: e2.parsedType }), INVALID) : OK(e2.data);
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodUndefined }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodNull = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType !== ZodParsedType.null ? (addIssueToContext(e2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.null, received: e2.parsedType }), INVALID) : OK(e2.data);
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodNull }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodAny = function(t) {
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e._any = true, e;
  }
  return __extends(r, t), r.prototype._parse = function(e) {
    e = this._processInputParams(e).ctx;
    return OK(e.data);
  }, r.create = function(e) {
    return new r(__assign({ typeName: ZodFirstPartyTypeKind.ZodAny }, processCreateParams(e)));
  }, r;
}(ZodType);
var ZodUnknown = function(t) {
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e._unknown = true, e;
  }
  return __extends(r, t), r.prototype._parse = function(e) {
    e = this._processInputParams(e).ctx;
    return OK(e.data);
  }, r.create = function(e) {
    return new r(__assign({ typeName: ZodFirstPartyTypeKind.ZodUnknown }, processCreateParams(e)));
  }, r;
}(ZodType);
var ZodNever = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return addIssueToContext(e2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.never, received: e2.parsedType }), INVALID;
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodNever }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodVoid = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType !== ZodParsedType.undefined ? (addIssueToContext(e2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.void, received: e2.parsedType }), INVALID) : OK(e2.data);
  }, t.create = function(e2) {
    return new t(__assign({ typeName: ZodFirstPartyTypeKind.ZodVoid }, processCreateParams(e2)));
  }, t;
}(ZodType);
var ZodArray = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var e2 = this._processInputParams(e2), t = e2.status, r2 = e2.ctx, n = this._def;
    if (r2.parsedType !== ZodParsedType.array)
      return addIssueToContext(r2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.array, received: r2.parsedType }), INVALID;
    if (n.minLength !== null && r2.data.length < n.minLength.value && (addIssueToContext(r2, { code: ZodIssueCode.too_small, minimum: n.minLength.value, type: "array", inclusive: true, message: n.minLength.message }), t.dirty()), n.maxLength !== null && r2.data.length > n.maxLength.value && (addIssueToContext(r2, { code: ZodIssueCode.too_big, maximum: n.maxLength.value, type: "array", inclusive: true, message: n.maxLength.message }), t.dirty()), r2.async)
      return Promise.all(r2.data.map(function(e3, t2) {
        return n.type._parseAsync({ parent: r2, path: __spreadArray(__spreadArray([], __read(r2.path), false), [t2], false), data: e3 });
      })).then(function(e3) {
        return ParseStatus.mergeArray(t, e3);
      });
    e2 = r2.data.map(function(e3, t2) {
      return n.type._parseSync({ parent: r2, path: __spreadArray(__spreadArray([], __read(r2.path), false), [t2], false), data: e3 });
    });
    return ParseStatus.mergeArray(t, e2);
  }, Object.defineProperty(r.prototype, "element", { get: function() {
    return this._def.type;
  }, enumerable: false, configurable: true }), r.prototype.min = function(e2, t) {
    return new r(__assign(__assign({}, this._def), { minLength: { value: e2, message: errorUtil.toString(t) } }));
  }, r.prototype.max = function(e2, t) {
    return new r(__assign(__assign({}, this._def), { maxLength: { value: e2, message: errorUtil.toString(t) } }));
  }, r.prototype.length = function(e2, t) {
    return this.min(e2, t).max(e2, t);
  }, r.prototype.nonempty = function(e2) {
    return this.min(1, e2);
  }, r.create = function(e2, t) {
    return new r(__assign({ type: e2, minLength: null, maxLength: null, typeName: ZodFirstPartyTypeKind.ZodArray }, processCreateParams(t)));
  }, r;
}(ZodType);
(objectUtil || (objectUtil = {})).mergeShapes = function(e, t) {
  return __assign(__assign({}, e), t);
};
var AugmentFactory = function(t) {
  return function(e) {
    return new ZodObject(__assign(__assign({}, t), { shape: function() {
      return __assign(__assign({}, t.shape()), e);
    } }));
  };
};
function deepPartialify(e) {
  if (e instanceof ZodObject) {
    var t, r = {};
    for (t in e.shape) {
      var n = e.shape[t];
      r[t] = ZodOptional.create(deepPartialify(n));
    }
    return new ZodObject(__assign(__assign({}, e._def), { shape: function() {
      return r;
    } }));
  }
  return e instanceof ZodArray ? ZodArray.create(deepPartialify(e.element)) : e instanceof ZodOptional ? ZodOptional.create(deepPartialify(e.unwrap())) : e instanceof ZodNullable ? ZodNullable.create(deepPartialify(e.unwrap())) : e instanceof ZodTuple ? ZodTuple.create(e.items.map(function(e2) {
    return deepPartialify(e2);
  })) : e;
}
var ZodObject = function(t) {
  function s() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e._cached = null, e.nonstrict = e.passthrough, e.augment = AugmentFactory(e._def), e.extend = AugmentFactory(e._def), e;
  }
  return __extends(s, t), s.prototype._getCached = function() {
    if (this._cached !== null)
      return this._cached;
    var e = this._def.shape(), t2 = util.objectKeys(e);
    return this._cached = { shape: e, keys: t2 };
  }, s.prototype._parse = function(e) {
    var t2, r, n, a, o, s2 = this, i = this._processInputParams(e), u = i.status, d = i.ctx;
    if (d.parsedType !== ZodParsedType.object)
      return addIssueToContext(d, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.object, received: d.parsedType }), INVALID;
    var e = this._getCached(), p = e.shape, i = e.keys, e = util.objectKeys(d.data).filter(function(e2) {
      return !(e2 in p);
    }), c = [];
    try {
      for (var l = __values(i), y = l.next(); !y.done; y = l.next()) {
        var f = y.value, _ = p[f], h = d.data[f];
        c.push({ key: { status: "valid", value: f }, value: _._parse({ parent: d, data: h, path: __spreadArray(__spreadArray([], __read(d.path), false), [f], false) }), alwaysSet: f in d.data });
      }
    } catch (e2) {
      v = { error: e2 };
    } finally {
      try {
        y && !y.done && (t2 = l.return) && t2.call(l);
      } finally {
        if (v)
          throw v.error;
      }
    }
    if (this._def.catchall instanceof ZodNever) {
      var v = this._def.unknownKeys;
      if (v === "passthrough")
        try {
          for (var m = __values(e), Z = m.next(); !Z.done; Z = m.next()) {
            f = Z.value;
            c.push({ key: { status: "valid", value: f }, value: { status: "valid", value: d.data[f] } });
          }
        } catch (e2) {
          r = { error: e2 };
        } finally {
          try {
            Z && !Z.done && (n = m.return) && n.call(m);
          } finally {
            if (r)
              throw r.error;
          }
        }
      else if (v === "strict")
        0 < e.length && (addIssueToContext(d, { code: ZodIssueCode.unrecognized_keys, keys: e }), u.dirty());
      else if (v !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      var g = this._def.catchall;
      try {
        for (var T = __values(e), b = T.next(); !b.done; b = T.next()) {
          f = b.value, h = d.data[f];
          c.push({ key: { status: "valid", value: f }, value: g._parse({ parent: d, path: __spreadArray(__spreadArray([], __read(d.path), false), [f], false), data: h }), alwaysSet: f in d.data });
        }
      } catch (e2) {
        a = { error: e2 };
      } finally {
        try {
          b && !b.done && (o = T.return) && o.call(T);
        } finally {
          if (a)
            throw a.error;
        }
      }
    }
    return d.async ? Promise.resolve().then(function() {
      return __awaiter(s2, void 0, void 0, function() {
        var t3, r2, n2, a2, o2, s3, i2, u2, d2;
        return __generator(this, function(e2) {
          switch (e2.label) {
            case 0:
              t3 = [], e2.label = 1;
            case 1:
              e2.trys.push([1, 7, 8, 9]), r2 = __values(c), n2 = r2.next(), e2.label = 2;
            case 2:
              return n2.done ? [3, 6] : [4, (a2 = n2.value).key];
            case 3:
              return d2 = e2.sent(), s3 = (o2 = t3).push, d2 = { key: d2 }, [4, a2.value];
            case 4:
              s3.apply(o2, [(d2.value = e2.sent(), d2.alwaysSet = a2.alwaysSet, d2)]), e2.label = 5;
            case 5:
              return n2 = r2.next(), [3, 2];
            case 6:
              return [3, 9];
            case 7:
              return i2 = e2.sent(), i2 = { error: i2 }, [3, 9];
            case 8:
              try {
                n2 && !n2.done && (u2 = r2.return) && u2.call(r2);
              } finally {
                if (i2)
                  throw i2.error;
              }
              return [7];
            case 9:
              return [2, t3];
          }
        });
      });
    }).then(function(e2) {
      return ParseStatus.mergeObjectSync(u, e2);
    }) : ParseStatus.mergeObjectSync(u, c);
  }, Object.defineProperty(s.prototype, "shape", { get: function() {
    return this._def.shape();
  }, enumerable: false, configurable: true }), s.prototype.strict = function(a) {
    var o = this;
    return errorUtil.errToObj, new s(__assign(__assign(__assign({}, this._def), { unknownKeys: "strict" }), a !== void 0 ? { errorMap: function(e, t2) {
      var r, n, t2 = (n = (r = (n = o._def).errorMap) === null || r === void 0 ? void 0 : r.call(n, e, t2).message) !== null && n !== void 0 ? n : t2.defaultError;
      return e.code === "unrecognized_keys" ? { message: (e = errorUtil.errToObj(a).message) !== null && e !== void 0 ? e : t2 } : { message: t2 };
    } } : {}));
  }, s.prototype.strip = function() {
    return new s(__assign(__assign({}, this._def), { unknownKeys: "strip" }));
  }, s.prototype.passthrough = function() {
    return new s(__assign(__assign({}, this._def), { unknownKeys: "passthrough" }));
  }, s.prototype.setKey = function(e, t2) {
    var r;
    return this.augment(((r = {})[e] = t2, r));
  }, s.prototype.merge = function(e) {
    var t2 = objectUtil.mergeShapes(this._def.shape(), e._def.shape());
    return new s({ unknownKeys: e._def.unknownKeys, catchall: e._def.catchall, shape: function() {
      return t2;
    }, typeName: ZodFirstPartyTypeKind.ZodObject });
  }, s.prototype.catchall = function(e) {
    return new s(__assign(__assign({}, this._def), { catchall: e }));
  }, s.prototype.pick = function(e) {
    var t2 = this, r = {};
    return util.objectKeys(e).map(function(e2) {
      r[e2] = t2.shape[e2];
    }), new s(__assign(__assign({}, this._def), { shape: function() {
      return r;
    } }));
  }, s.prototype.omit = function(t2) {
    var r = this, n = {};
    return util.objectKeys(this.shape).map(function(e) {
      util.objectKeys(t2).indexOf(e) === -1 && (n[e] = r.shape[e]);
    }), new s(__assign(__assign({}, this._def), { shape: function() {
      return n;
    } }));
  }, s.prototype.deepPartial = function() {
    return deepPartialify(this);
  }, s.prototype.partial = function(t2) {
    var e, r = this, n = {};
    if (t2)
      return util.objectKeys(this.shape).map(function(e2) {
        util.objectKeys(t2).indexOf(e2) === -1 ? n[e2] = r.shape[e2] : n[e2] = r.shape[e2].optional();
      }), new s(__assign(__assign({}, this._def), { shape: function() {
        return n;
      } }));
    for (e in this.shape) {
      var a = this.shape[e];
      n[e] = a.optional();
    }
    return new s(__assign(__assign({}, this._def), { shape: function() {
      return n;
    } }));
  }, s.prototype.required = function() {
    var e, t2 = {};
    for (e in this.shape) {
      for (var r = this.shape[e]; r instanceof ZodOptional; )
        r = r._def.innerType;
      t2[e] = r;
    }
    return new s(__assign(__assign({}, this._def), { shape: function() {
      return t2;
    } }));
  }, s.create = function(e, t2) {
    return new s(__assign({ shape: function() {
      return e;
    }, unknownKeys: "strip", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject }, processCreateParams(t2)));
  }, s.strictCreate = function(e, t2) {
    return new s(__assign({ shape: function() {
      return e;
    }, unknownKeys: "strict", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject }, processCreateParams(t2)));
  }, s.lazycreate = function(e, t2) {
    return new s(__assign({ shape: e, unknownKeys: "strip", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject }, processCreateParams(t2)));
  }, s;
}(ZodType);
var ZodUnion = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var t = this, c = this._processInputParams(e2).ctx, e2 = this._def.options;
    function r2(e3) {
      var t2, r3, n, a, o;
      try {
        for (var s = __values(e3), i = s.next(); !i.done; i = s.next())
          if ((u = i.value).result.status === "valid")
            return u.result;
      } catch (e4) {
        t2 = { error: e4 };
      } finally {
        try {
          i && !i.done && (r3 = s.return) && r3.call(s);
        } finally {
          if (t2)
            throw t2.error;
        }
      }
      try {
        for (var u, d = __values(e3), p = d.next(); !p.done; p = d.next())
          if ((u = p.value).result.status === "dirty")
            return (o = c.issues).push.apply(o, __spreadArray([], __read(u.ctx.issues), false)), u.result;
      } catch (e4) {
        n = { error: e4 };
      } finally {
        try {
          p && !p.done && (a = d.return) && a.call(d);
        } finally {
          if (n)
            throw n.error;
        }
      }
      e3 = e3.map(function(e4) {
        return new ZodError(e4.ctx.issues);
      });
      return addIssueToContext(c, { code: ZodIssueCode.invalid_union, unionErrors: e3 }), INVALID;
    }
    return c.async ? Promise.all(e2.map(function(n) {
      return __awaiter(t, void 0, void 0, function() {
        var t2, r3;
        return __generator(this, function(e3) {
          switch (e3.label) {
            case 0:
              return t2 = __assign(__assign({}, c), { issues: [], parent: null }), r3 = {}, [4, n._parseAsync({ data: c.data, path: c.path, parent: t2 })];
            case 1:
              return [2, (r3.result = e3.sent(), r3.ctx = t2, r3)];
          }
        });
      });
    })).then(r2) : r2(e2.map(function(e3) {
      var t2 = __assign(__assign({}, c), { issues: [], parent: null });
      return { result: e3._parseSync({ data: c.data, path: c.path, parent: t2 }), ctx: t2 };
    }));
  }, Object.defineProperty(r.prototype, "options", { get: function() {
    return this._def.options;
  }, enumerable: false, configurable: true }), r.create = function(e2, t) {
    return new r(__assign({ options: e2, typeName: ZodFirstPartyTypeKind.ZodUnion }, processCreateParams(t)));
  }, r;
}(ZodType);
function mergeValues(e, t) {
  var r, n, a = getParsedType(e), o = getParsedType(t);
  if (e === t)
    return { valid: true, data: e };
  if (a === ZodParsedType.object && o === ZodParsedType.object) {
    var s = util.objectKeys(t), i = util.objectKeys(e).filter(function(e2) {
      return s.indexOf(e2) !== -1;
    }), u = __assign(__assign({}, e), t);
    try {
      for (var d = __values(i), p = d.next(); !p.done; p = d.next()) {
        var c = p.value;
        if (!(l = mergeValues(e[c], t[c])).valid)
          return { valid: false };
        u[c] = l.data;
      }
    } catch (e2) {
      r = { error: e2 };
    } finally {
      try {
        p && !p.done && (n = d.return) && n.call(d);
      } finally {
        if (r)
          throw r.error;
      }
    }
    return { valid: true, data: u };
  }
  if (a !== ZodParsedType.array || o !== ZodParsedType.array)
    return { valid: false };
  if (e.length !== t.length)
    return { valid: false };
  for (var l, y = [], f = 0; f < e.length; f++) {
    if (!(l = mergeValues(e[f], t[f])).valid)
      return { valid: false };
    y.push(l.data);
  }
  return { valid: true, data: y };
}
var ZodIntersection = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), n.prototype._parse = function(e2) {
    function r(e3, t) {
      if (isAborted(e3) || isAborted(t))
        return INVALID;
      var r2 = mergeValues(e3.value, t.value);
      return r2.valid ? ((isDirty(e3) || isDirty(t)) && n2.dirty(), { status: n2.value, value: r2.data }) : (addIssueToContext(a, { code: ZodIssueCode.invalid_intersection_types }), INVALID);
    }
    var e2 = this._processInputParams(e2), n2 = e2.status, a = e2.ctx;
    return a.async ? Promise.all([this._def.left._parseAsync({ data: a.data, path: a.path, parent: a }), this._def.right._parseAsync({ data: a.data, path: a.path, parent: a })]).then(function(e3) {
      var t = __read(e3, 2), e3 = t[0], t = t[1];
      return r(e3, t);
    }) : r(this._def.left._parseSync({ data: a.data, path: a.path, parent: a }), this._def.right._parseSync({ data: a.data, path: a.path, parent: a }));
  }, n.create = function(e2, t, r) {
    return new n(__assign({ left: e2, right: t, typeName: ZodFirstPartyTypeKind.ZodIntersection }, processCreateParams(r)));
  }, n;
}(ZodType);
var ZodTuple = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var n = this, e2 = this._processInputParams(e2), t = e2.status, a = e2.ctx;
    if (a.parsedType !== ZodParsedType.array)
      return addIssueToContext(a, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.array, received: a.parsedType }), INVALID;
    if (a.data.length < this._def.items.length)
      return addIssueToContext(a, { code: ZodIssueCode.too_small, minimum: this._def.items.length, inclusive: true, type: "array" }), INVALID;
    !this._def.rest && a.data.length > this._def.items.length && (addIssueToContext(a, { code: ZodIssueCode.too_big, maximum: this._def.items.length, inclusive: true, type: "array" }), t.dirty());
    e2 = a.data.map(function(e3, t2) {
      var r2 = n._def.items[t2] || n._def.rest;
      return r2 ? r2._parse({ data: e3, path: __spreadArray(__spreadArray([], __read(a.path), false), [t2], false), parent: a }) : null;
    }).filter(function(e3) {
      return !!e3;
    });
    return a.async ? Promise.all(e2).then(function(e3) {
      return ParseStatus.mergeArray(t, e3);
    }) : ParseStatus.mergeArray(t, e2);
  }, Object.defineProperty(r.prototype, "items", { get: function() {
    return this._def.items;
  }, enumerable: false, configurable: true }), r.prototype.rest = function(e2) {
    return new r(__assign(__assign({}, this._def), { rest: e2 }));
  }, r.create = function(e2, t) {
    return new r(__assign({ items: e2, typeName: ZodFirstPartyTypeKind.ZodTuple, rest: null }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodRecord = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), Object.defineProperty(n.prototype, "keySchema", { get: function() {
    return this._def.keyType;
  }, enumerable: false, configurable: true }), Object.defineProperty(n.prototype, "valueSchema", { get: function() {
    return this._def.valueType;
  }, enumerable: false, configurable: true }), n.prototype._parse = function(e2) {
    var t = this._processInputParams(e2), e2 = t.status, r = t.ctx;
    if (r.parsedType !== ZodParsedType.object)
      return addIssueToContext(r, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.object, received: r.parsedType }), INVALID;
    var n2, a = [], o = this._def.keyType, s = this._def.valueType;
    for (n2 in r.data)
      a.push({ key: o._parse({ data: n2, path: __spreadArray(__spreadArray([], __read(r.path), false), [n2], false), parent: r }), value: s._parse({ data: r.data[n2], path: __spreadArray(__spreadArray([], __read(r.path), false), [n2], false), parent: r }) });
    return r.async ? ParseStatus.mergeObjectAsync(e2, a) : ParseStatus.mergeObjectSync(e2, a);
  }, Object.defineProperty(n.prototype, "element", { get: function() {
    return this._def.valueType;
  }, enumerable: false, configurable: true }), n.create = function(e2, t, r) {
    return new n(t instanceof ZodType ? __assign({ keyType: e2, valueType: t, typeName: ZodFirstPartyTypeKind.ZodRecord }, processCreateParams(r)) : __assign({ keyType: ZodString.create(), valueType: e2, typeName: ZodFirstPartyTypeKind.ZodRecord }, processCreateParams(t)));
  }, n;
}(ZodType);
var ZodMap = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), n.prototype._parse = function(e2) {
    var t, r, n2 = this, e2 = this._processInputParams(e2), u = e2.status, a = e2.ctx;
    if (a.parsedType !== ZodParsedType.map)
      return addIssueToContext(a, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.map, received: a.parsedType }), INVALID;
    var o = this._def.keyType, s = this._def.valueType, d = __spreadArray([], __read(a.data.entries()), false).map(function(e3, t2) {
      var r2 = __read(e3, 2), e3 = r2[0], r2 = r2[1];
      return { key: o._parse({ data: e3, path: __spreadArray(__spreadArray([], __read(a.path), false), [t2, "key"], false), parent: a }), value: s._parse({ data: r2, path: __spreadArray(__spreadArray([], __read(a.path), false), [t2, "value"], false), parent: a }) };
    });
    if (a.async) {
      var p = /* @__PURE__ */ new Map();
      return Promise.resolve().then(function() {
        return __awaiter(n2, void 0, void 0, function() {
          var t2, r2, n3, a2, o2, s2, i2;
          return __generator(this, function(e3) {
            switch (e3.label) {
              case 0:
                e3.trys.push([0, 6, 7, 8]), t2 = __values(d), r2 = t2.next(), e3.label = 1;
              case 1:
                return r2.done ? [3, 5] : [4, (n3 = r2.value).key];
              case 2:
                return a2 = e3.sent(), [4, n3.value];
              case 3:
                if (o2 = e3.sent(), a2.status === "aborted" || o2.status === "aborted")
                  return [2, INVALID];
                a2.status !== "dirty" && o2.status !== "dirty" || u.dirty(), p.set(a2.value, o2.value), e3.label = 4;
              case 4:
                return r2 = t2.next(), [3, 1];
              case 5:
                return [3, 8];
              case 6:
                return s2 = e3.sent(), s2 = { error: s2 }, [3, 8];
              case 7:
                try {
                  r2 && !r2.done && (i2 = t2.return) && i2.call(t2);
                } finally {
                  if (s2)
                    throw s2.error;
                }
                return [7];
              case 8:
                return [2, { status: u.value, value: p }];
            }
          });
        });
      });
    }
    var i = /* @__PURE__ */ new Map();
    try {
      for (var c = __values(d), l = c.next(); !l.done; l = c.next()) {
        var y = l.value, f = y.key, _ = y.value;
        if (f.status === "aborted" || _.status === "aborted")
          return INVALID;
        f.status !== "dirty" && _.status !== "dirty" || u.dirty(), i.set(f.value, _.value);
      }
    } catch (e3) {
      t = { error: e3 };
    } finally {
      try {
        l && !l.done && (r = c.return) && r.call(c);
      } finally {
        if (t)
          throw t.error;
      }
    }
    return { status: u.value, value: i };
  }, n.create = function(e2, t, r) {
    return new n(__assign({ valueType: t, keyType: e2, typeName: ZodFirstPartyTypeKind.ZodMap }, processCreateParams(r)));
  }, n;
}(ZodType);
var ZodSet = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var e2 = this._processInputParams(e2), i = e2.status, r2 = e2.ctx;
    if (r2.parsedType !== ZodParsedType.set)
      return addIssueToContext(r2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.set, received: r2.parsedType }), INVALID;
    var n = this._def.valueType;
    function t(e3) {
      var t2, r3, n2 = /* @__PURE__ */ new Set();
      try {
        for (var a = __values(e3), o = a.next(); !o.done; o = a.next()) {
          var s = o.value;
          if (s.status === "aborted")
            return INVALID;
          s.status === "dirty" && i.dirty(), n2.add(s.value);
        }
      } catch (e4) {
        t2 = { error: e4 };
      } finally {
        try {
          o && !o.done && (r3 = a.return) && r3.call(a);
        } finally {
          if (t2)
            throw t2.error;
        }
      }
      return { status: i.value, value: n2 };
    }
    e2 = __spreadArray([], __read(r2.data.values()), false).map(function(e3, t2) {
      return n._parse({ data: e3, path: __spreadArray(__spreadArray([], __read(r2.path), false), [t2], false), parent: r2 });
    });
    return r2.async ? Promise.all(e2).then(t) : t(e2);
  }, r.create = function(e2, t) {
    return new r(__assign({ valueType: e2, typeName: ZodFirstPartyTypeKind.ZodSet }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodFunction = function(t) {
  function n() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.validate = e.implement, e;
  }
  return __extends(n, t), n.prototype._parse = function(e) {
    var o = this, r = this._processInputParams(e).ctx;
    if (r.parsedType !== ZodParsedType.function)
      return addIssueToContext(r, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.function, received: r.parsedType }), INVALID;
    function s(e2, t2) {
      return makeIssue({ data: e2, path: r.path, errorMaps: [r.contextualErrorMap, r.schemaErrorMap, overrideErrorMap, defaultErrorMap].filter(function(e3) {
        return !!e3;
      }), issueData: { code: ZodIssueCode.invalid_arguments, argumentsError: t2 } });
    }
    function i(e2, t2) {
      return makeIssue({ data: e2, path: r.path, errorMaps: [r.contextualErrorMap, r.schemaErrorMap, overrideErrorMap, defaultErrorMap].filter(function(e3) {
        return !!e3;
      }), issueData: { code: ZodIssueCode.invalid_return_type, returnTypeError: t2 } });
    }
    var u = { errorMap: r.contextualErrorMap }, d = r.data;
    return this._def.returns instanceof ZodPromise ? OK(function() {
      for (var a = [], e2 = 0; e2 < arguments.length; e2++)
        a[e2] = arguments[e2];
      return __awaiter(o, void 0, void 0, function() {
        var t2, r2, n2;
        return __generator(this, function(e3) {
          switch (e3.label) {
            case 0:
              return t2 = new ZodError([]), [4, this._def.args.parseAsync(a, u).catch(function(e4) {
                throw t2.addIssue(s(a, e4)), t2;
              })];
            case 1:
              return r2 = e3.sent(), [4, d.apply(void 0, __spreadArray([], __read(r2), false))];
            case 2:
              return n2 = e3.sent(), [4, this._def.returns._def.type.parseAsync(n2, u).catch(function(e4) {
                throw t2.addIssue(i(n2, e4)), t2;
              })];
            case 3:
              return [2, e3.sent()];
          }
        });
      });
    }) : OK(function() {
      for (var e2 = [], t2 = 0; t2 < arguments.length; t2++)
        e2[t2] = arguments[t2];
      var r2 = o._def.args.safeParse(e2, u);
      if (!r2.success)
        throw new ZodError([s(e2, r2.error)]);
      var n2 = d.apply(void 0, __spreadArray([], __read(r2.data), false)), r2 = o._def.returns.safeParse(n2, u);
      if (!r2.success)
        throw new ZodError([i(n2, r2.error)]);
      return r2.data;
    });
  }, n.prototype.parameters = function() {
    return this._def.args;
  }, n.prototype.returnType = function() {
    return this._def.returns;
  }, n.prototype.args = function() {
    for (var e = [], t2 = 0; t2 < arguments.length; t2++)
      e[t2] = arguments[t2];
    return new n(__assign(__assign({}, this._def), { args: ZodTuple.create(e).rest(ZodUnknown.create()) }));
  }, n.prototype.returns = function(e) {
    return new n(__assign(__assign({}, this._def), { returns: e }));
  }, n.prototype.implement = function(e) {
    return this.parse(e);
  }, n.prototype.strictImplement = function(e) {
    return this.parse(e);
  }, n.create = function(e, t2, r) {
    return new n(__assign({ args: (e || ZodTuple.create([])).rest(ZodUnknown.create()), returns: t2 || ZodUnknown.create(), typeName: ZodFirstPartyTypeKind.ZodFunction }, processCreateParams(r)));
  }, n;
}(ZodType);
var ZodLazy = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), Object.defineProperty(r.prototype, "schema", { get: function() {
    return this._def.getter();
  }, enumerable: false, configurable: true }), r.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return this._def.getter()._parse({ data: e2.data, path: e2.path, parent: e2 });
  }, r.create = function(e2, t) {
    return new r(__assign({ getter: e2, typeName: ZodFirstPartyTypeKind.ZodLazy }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodLiteral = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var t = this._processInputParams(e2), e2 = t.status, t = t.ctx;
    return t.data !== this._def.value ? (addIssueToContext(t, { code: ZodIssueCode.invalid_type, expected: this._def.value, received: t.data }), INVALID) : { status: e2.value, value: t.data };
  }, Object.defineProperty(r.prototype, "value", { get: function() {
    return this._def.value;
  }, enumerable: false, configurable: true }), r.create = function(e2, t) {
    return new r(__assign({ value: e2, typeName: ZodFirstPartyTypeKind.ZodLiteral }, processCreateParams(t)));
  }, r;
}(ZodType);
function createZodEnum(e) {
  return new ZodEnum({ values: e, typeName: ZodFirstPartyTypeKind.ZodEnum });
}
var ZodFirstPartyTypeKind;
var ZodEnum = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return this._def.values.indexOf(e2.data) === -1 ? (addIssueToContext(e2, { code: ZodIssueCode.invalid_enum_value, options: this._def.values }), INVALID) : OK(e2.data);
  }, Object.defineProperty(t.prototype, "options", { get: function() {
    return this._def.values;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "enum", { get: function() {
    var t2, e2, r = {};
    try {
      for (var n = __values(this._def.values), a = n.next(); !a.done; a = n.next()) {
        var o = a.value;
        r[o] = o;
      }
    } catch (e3) {
      t2 = { error: e3 };
    } finally {
      try {
        a && !a.done && (e2 = n.return) && e2.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "Values", { get: function() {
    var t2, e2, r = {};
    try {
      for (var n = __values(this._def.values), a = n.next(); !a.done; a = n.next()) {
        var o = a.value;
        r[o] = o;
      }
    } catch (e3) {
      t2 = { error: e3 };
    } finally {
      try {
        a && !a.done && (e2 = n.return) && e2.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "Enum", { get: function() {
    var t2, e2, r = {};
    try {
      for (var n = __values(this._def.values), a = n.next(); !a.done; a = n.next()) {
        var o = a.value;
        r[o] = o;
      }
    } catch (e3) {
      t2 = { error: e3 };
    } finally {
      try {
        a && !a.done && (e2 = n.return) && e2.call(n);
      } finally {
        if (t2)
          throw t2.error;
      }
    }
    return r;
  }, enumerable: false, configurable: true }), t.create = createZodEnum, t;
}(ZodType);
var ZodNativeEnum = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var t = this._processInputParams(e2).ctx, e2 = util.getValidEnumValues(this._def.values);
    return e2.indexOf(t.data) === -1 ? (addIssueToContext(t, { code: ZodIssueCode.invalid_enum_value, options: util.objectValues(e2) }), INVALID) : OK(t.data);
  }, r.create = function(e2, t) {
    return new r(__assign({ values: e2, typeName: ZodFirstPartyTypeKind.ZodNativeEnum }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodPromise = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    var t = this, r2 = this._processInputParams(e2).ctx;
    if (r2.parsedType !== ZodParsedType.promise && r2.async === false)
      return addIssueToContext(r2, { code: ZodIssueCode.invalid_type, expected: ZodParsedType.promise, received: r2.parsedType }), INVALID;
    e2 = r2.parsedType === ZodParsedType.promise ? r2.data : Promise.resolve(r2.data);
    return OK(e2.then(function(e3) {
      return t._def.type.parseAsync(e3, { path: r2.path, errorMap: r2.contextualErrorMap });
    }));
  }, r.create = function(e2, t) {
    return new r(__assign({ type: e2, typeName: ZodFirstPartyTypeKind.ZodPromise }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodEffects = function(e) {
  function n() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(n, e), n.prototype.innerType = function() {
    return this._def.schema;
  }, n.prototype._parse = function(e2) {
    var t = this, e2 = this._processInputParams(e2), r = e2.status, n2 = e2.ctx, a = this._def.effect || null;
    if (a.type === "preprocess") {
      e2 = a.transform(n2.data);
      return n2.async ? Promise.resolve(e2).then(function(e3) {
        return t._def.schema._parseAsync({ data: e3, path: n2.path, parent: n2 });
      }) : this._def.schema._parseSync({ data: e2, path: n2.path, parent: n2 });
    }
    if (a.type === "refinement") {
      let s = function(e3) {
        var t2 = a.refinement(e3, o);
        if (n2.async)
          return Promise.resolve(t2);
        if (t2 instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return e3;
      };
      var o = { addIssue: function(e3) {
        addIssueToContext(n2, e3), e3.fatal ? r.abort() : r.dirty();
      }, get path() {
        return n2.path;
      } };
      o.addIssue = o.addIssue.bind(o);
      if (n2.async !== false)
        return this._def.schema._parseAsync({ data: n2.data, path: n2.path, parent: n2 }).then(function(e3) {
          return e3.status === "aborted" ? INVALID : (e3.status === "dirty" && r.dirty(), s(e3.value).then(function() {
            return { status: r.value, value: e3.value };
          }));
        });
      var i = this._def.schema._parseSync({ data: n2.data, path: n2.path, parent: n2 });
      return i.status === "aborted" ? INVALID : (i.status === "dirty" && r.dirty(), s(i.value), { status: r.value, value: i.value });
    }
    if (a.type === "transform") {
      if (n2.async !== false)
        return this._def.schema._parseAsync({ data: n2.data, path: n2.path, parent: n2 }).then(function(e3) {
          return isValid(e3) ? Promise.resolve(a.transform(e3.value)).then(OK) : e3;
        });
      i = this._def.schema._parseSync({ data: n2.data, path: n2.path, parent: n2 });
      if (!isValid(i))
        return i;
      i = a.transform(i.value);
      if (i instanceof Promise)
        throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
      return OK(i);
    }
    util.assertNever(a);
  }, n.create = function(e2, t, r) {
    return new n(__assign({ schema: e2, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: t }, processCreateParams(r)));
  }, n.createWithPreprocess = function(e2, t, r) {
    return new n(__assign({ schema: t, effect: { type: "preprocess", transform: e2 }, typeName: ZodFirstPartyTypeKind.ZodEffects }, processCreateParams(r)));
  }, n;
}(ZodType);
var ZodOptional = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType === ZodParsedType.undefined ? OK(void 0) : this._def.innerType._parse({ data: e2.data, path: e2.path, parent: e2 });
  }, r.prototype.unwrap = function() {
    return this._def.innerType;
  }, r.create = function(e2, t) {
    return new r(__assign({ innerType: e2, typeName: ZodFirstPartyTypeKind.ZodOptional }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodNullable = function(e) {
  function r() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(r, e), r.prototype._parse = function(e2) {
    e2 = this._processInputParams(e2).ctx;
    return e2.parsedType === ZodParsedType.null ? OK(null) : this._def.innerType._parse({ data: e2.data, path: e2.path, parent: e2 });
  }, r.prototype.unwrap = function() {
    return this._def.innerType;
  }, r.create = function(e2, t) {
    return new r(__assign({ innerType: e2, typeName: ZodFirstPartyTypeKind.ZodNullable }, processCreateParams(t)));
  }, r;
}(ZodType);
var ZodDefault = function(e) {
  function t() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return __extends(t, e), t.prototype._parse = function(e2) {
    var t2 = this._processInputParams(e2).ctx, e2 = t2.data;
    return t2.parsedType === ZodParsedType.undefined && (e2 = this._def.defaultValue()), this._def.innerType._parse({ data: e2, path: t2.path, parent: t2 });
  }, t.prototype.removeDefault = function() {
    return this._def.innerType;
  }, t.create = function(e2, t2) {
    return new ZodOptional(__assign({ innerType: e2, typeName: ZodFirstPartyTypeKind.ZodOptional }, processCreateParams(t2)));
  }, t;
}(ZodType);
var custom = function(e, t) {
  return e ? ZodAny.create().refine(e, t) : ZodAny.create();
};
var late = { object: ZodObject.lazycreate };
!function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodPromise = "ZodPromise";
}(ZodFirstPartyTypeKind = ZodFirstPartyTypeKind || {});
var instanceOfType = function(t, e) {
  return e === void 0 && (e = { message: "Input not instance of " + t.name }), custom(function(e2) {
    return e2 instanceof t;
  }, e);
};
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var ostring = function() {
  return stringType().optional();
};
var onumber = function() {
  return numberType().optional();
};
var oboolean = function() {
  return booleanType().optional();
};
var external = Object.freeze({ __proto__: null, ZodParsedType, getParsedType, makeIssue, EMPTY_PATH, addIssueToContext, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, ZodType, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, get objectUtil() {
  return objectUtil;
}, ZodObject, ZodUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodTransformer: ZodEffects, ZodOptional, ZodNullable, ZodDefault, custom, Schema: ZodType, ZodSchema: ZodType, late, get ZodFirstPartyTypeKind() {
  return ZodFirstPartyTypeKind;
}, any: anyType, array: arrayType, bigint: bigIntType, boolean: booleanType, date: dateType, effect: effectsType, enum: enumType, function: functionType, instanceof: instanceOfType, intersection: intersectionType, lazy: lazyType, literal: literalType, map: mapType, nativeEnum: nativeEnumType, never: neverType, null: nullType, nullable: nullableType, number: numberType, object: objectType, oboolean, onumber, optional: optionalType, ostring, preprocess: preprocessType, promise: promiseType, record: recordType, set: setType, strictObject: strictObjectType, string: stringType, transformer: effectsType, tuple: tupleType, undefined: undefinedType, union: unionType, unknown: unknownType, void: voidType, ZodIssueCode, quotelessJson, ZodError, defaultErrorMap, get overrideErrorMap() {
  return overrideErrorMap;
}, setErrorMap });

// src/protocol/json.ts
var literalSchema = external.union([external.string(), external.number(), external.boolean(), external.null()]);
var jsonSchema = external.lazy(() => external.union([literalSchema, external.array(jsonSchema), external.record(jsonSchema)]));

// src/types/version.ts
var versionSchema = external.number();
var nullableVersionSchema = external.union([versionSchema, external.null()]);
var versionKey = "version";
async function putVersion(version, storage) {
  await storage.put(versionKey, version);
}
async function getVersion(storage) {
  return await storage.get(versionKey, versionSchema);
}

// src/types/user-value.ts
var userValueSchema = external.object({
  version: versionSchema,
  deleted: external.boolean(),
  value: jsonSchema
});
var userValuePrefix = "user/";
function userValueKey(key) {
  return `${userValuePrefix}${key}`;
}

// src/ff/get-patch.ts
async function getPatch(durable, fromCookie) {
  const result = await durable.list({
    prefix: userValuePrefix,
    allowConcurrency: true
  });
  const patch = [];
  for (const [key, value] of result) {
    const validValue = userValueSchema.parse(value);
    if (validValue.version <= fromCookie) {
      continue;
    }
    const unwrappedKey = key.substring(userValuePrefix.length);
    const unwrappedValue = validValue.value;
    if (validValue.deleted) {
      patch.push({
        op: "del",
        key: unwrappedKey
      });
    } else {
      patch.push({
        op: "put",
        key: unwrappedKey,
        value: unwrappedValue
      });
    }
  }
  return patch;
}

// src/ff/fast-forward.ts
async function fastForwardRoom(clients, getClientRecord2, currentVersion, durable, timestamp) {
  const getMapEntry = async (clientID) => [clientID, await getClientRecord2(clientID)];
  const records = new Map(await Promise.all(clients.map(getMapEntry)));
  const distinctBaseCookies = new Set([...records.values()].map((r) => r.baseCookie));
  distinctBaseCookies.delete(currentVersion);
  const getPatchEntry = async (baseCookie) => [baseCookie, await getPatch(durable, baseCookie ?? 0)];
  const distinctPatches = new Map(await Promise.all([...distinctBaseCookies].map(getPatchEntry)));
  const ret = [];
  for (const clientID of clients) {
    const record = must(records.get(clientID));
    if (record.baseCookie === currentVersion) {
      continue;
    }
    const patch = must(distinctPatches.get(record.baseCookie));
    const poke = {
      clientID,
      poke: {
        baseCookie: record.baseCookie,
        cookie: currentVersion,
        lastMutationID: record.lastMutationID,
        timestamp,
        patch
      }
    };
    ret.push(poke);
  }
  return ret;
}

// src/db/data.ts
var options = {
  allowConcurrency: true,
  allowUnconfirmed: true
};
async function getEntry(durable, key, schema) {
  const value = await durable.get(key, options);
  if (value === void 0) {
    return void 0;
  }
  return schema.parse(value);
}
async function putEntry(durable, key, value) {
  await durable.put(key, value, options);
}
async function delEntry(durable, key) {
  await durable.delete(key, options);
}

// src/storage/durable-storage.ts
var DurableStorage = class {
  _durable;
  constructor(durable) {
    this._durable = durable;
  }
  async put(key, value) {
    return putEntry(this._durable, key, value);
  }
  async del(key) {
    return delEntry(this._durable, key);
  }
  async get(key, schema) {
    return await getEntry(this._durable, key, schema);
  }
};

// src/storage/entry-cache.ts
var EntryCache = class {
  _storage;
  _cache = /* @__PURE__ */ new Map();
  constructor(storage) {
    this._storage = storage;
  }
  async put(key, value) {
    this._cache.set(key, { value, dirty: true });
  }
  async del(key) {
    this._cache.set(key, { value: void 0, dirty: true });
  }
  async get(key, schema) {
    const cached = this._cache.get(key);
    if (cached) {
      return cached.value;
    }
    const value = await this._storage.get(key, schema);
    this._cache.set(key, { value, dirty: false });
    return value;
  }
  pending() {
    const res = [];
    for (const [key, { value, dirty }] of this._cache.entries()) {
      if (dirty) {
        if (value === void 0) {
          res.push({ op: "del", key });
        } else {
          res.push({ op: "put", key, value });
        }
      }
    }
    return res;
  }
  async flush() {
    await Promise.all([...this._cache.entries()].filter(([, { dirty }]) => dirty).map(([k, { value }]) => {
      if (value === void 0) {
        return this._storage.del(k);
      } else {
        return this._storage.put(k, value);
      }
    }));
  }
};

// src/types/client-record.ts
var clientRecordSchema = external.object({
  lastMutationID: external.number(),
  baseCookie: nullableVersionSchema
});
var clientRecordPrefix = "client/";
function clientRecordKey(clientID) {
  return `${clientRecordPrefix}${clientID}`;
}
async function getClientRecord(clientID, storage) {
  return await storage.get(clientRecordKey(clientID), clientRecordSchema);
}
async function putClientRecord(clientID, record, storage) {
  return await storage.put(clientRecordKey(clientID), record);
}

// src/util/peek-iterator.ts
var PeekIterator = class {
  _peeked = void 0;
  _iter;
  constructor(iter) {
    this._iter = iter;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this._peeked !== void 0) {
      const p = this._peeked;
      this._peeked = void 0;
      return p;
    }
    return this._iter.next();
  }
  peek() {
    if (this._peeked !== void 0) {
      return this._peeked;
    }
    return this._peeked = this._iter.next();
  }
};

// src/process/generate-merged-mutations.ts
function* generateMergedMutations(clients) {
  const iterators = [];
  const insertIterator = (ins) => {
    const { value, done } = ins.peek();
    if (done) {
      return;
    }
    const pos = iterators.findIndex((it) => it.peek().value.timestamp > value.timestamp);
    iterators.splice(pos === -1 ? iterators.length : pos, 0, ins);
  };
  for (const [clientID, c] of clients) {
    const clientMutations = c.pending.map((m) => ({ clientID, ...m }));
    insertIterator(new PeekIterator(clientMutations[Symbol.iterator]()));
  }
  for (; ; ) {
    const next = iterators.shift();
    if (!next) {
      break;
    }
    const { value, done } = next.peek();
    if (done) {
      throw new Error("unexpected state");
    }
    yield value;
    next.next();
    insertIterator(next);
  }
}

// src/storage/replicache-transaction.ts
var ReplicacheTransaction = class {
  _clientID;
  _inner;
  _version;
  get clientID() {
    return this._clientID;
  }
  constructor(inner, clientID, version) {
    this._inner = inner;
    this._clientID = clientID;
    this._version = version;
  }
  async put(key, value) {
    const userValue = {
      deleted: false,
      version: this._version,
      value
    };
    await this._inner.put(userValueKey(key), userValue);
  }
  async del(key) {
    const prev = await this.get(key);
    if (prev === void 0) {
      return false;
    }
    const userValue = {
      deleted: true,
      version: this._version,
      value: prev
    };
    await this._inner.put(userValueKey(key), userValue);
    return prev !== void 0;
  }
  async get(key) {
    const entry = await this._inner.get(userValueKey(key), userValueSchema);
    if (entry === void 0) {
      return void 0;
    }
    return entry.deleted ? void 0 : entry.value;
  }
  async has(key) {
    const val = await this.get(key);
    return val !== void 0;
  }
  async isEmpty() {
    throw new Error("not implemented");
  }
  scan() {
    throw new Error("not implemented");
  }
  scanAll() {
    throw new Error("not implemented");
  }
};
function unwrapPatch(inner) {
  return inner.filter((p) => p.key.startsWith(userValuePrefix)).map((p) => {
    const { key, op } = p;
    const unwrappedKey = key.substring(userValuePrefix.length);
    if (op === "put") {
      const userValue = p.value;
      if (userValue.deleted) {
        return {
          op: "del",
          key: unwrappedKey
        };
      } else {
        return {
          op: "put",
          key: unwrappedKey,
          value: userValue.value
        };
      }
    } else {
      throw new Error(`unexpected op: ${op}`);
    }
  });
}

// src/process/process-mutation.ts
async function processMutation(lc, mutation, mutators, storage, version) {
  const t0 = Date.now();
  try {
    lc.debug?.("processing mutation", JSON.stringify(mutation), "version", version);
    const { clientID } = mutation;
    const cache = new EntryCache(storage);
    const record = await getClientRecord(clientID, cache);
    if (!record) {
      lc.info?.("client not found");
      throw new Error(`Client ${clientID} not found`);
    }
    const expectedMutationID = record.lastMutationID + 1;
    if (mutation.id < expectedMutationID) {
      lc.debug?.("skipping duplicate mutation", JSON.stringify(mutation));
      return;
    }
    if (mutation.id > expectedMutationID) {
      lc.info?.("skipping out of order mutation", JSON.stringify(mutation));
      return;
    }
    const tx = new ReplicacheTransaction(cache, clientID, version);
    try {
      const mutator = mutators.get(mutation.name);
      if (!mutator) {
        lc.info?.("skipping unknown mutator", JSON.stringify(mutation));
      } else {
        await mutator(tx, mutation.args);
      }
    } catch (e) {
      lc.info?.("skipping mutation because error", JSON.stringify(mutation), e);
    }
    record.lastMutationID = expectedMutationID;
    await putClientRecord(clientID, record, cache);
    await putVersion(version, cache);
    await cache.flush();
  } finally {
    lc.debug?.(`processMutation took ${Date.now() - t0} ms`);
  }
}

// src/process/process-frame.ts
async function processFrame(lc, mutations, mutators, clients, storage, timestamp) {
  lc.debug?.("processing frame - clients", clients);
  const cache = new EntryCache(storage);
  const prevVersion = must(await getVersion(cache));
  const nextVersion = (prevVersion ?? 0) + 1;
  lc.debug?.("prevVersion", prevVersion, "nextVersion", nextVersion);
  for (; !mutations.peek().done; mutations.next()) {
    const { value: mutation } = mutations.peek();
    await processMutation(lc, mutation, mutators, cache, nextVersion);
  }
  if (must(await getVersion(cache)) === prevVersion) {
    lc.debug?.("no change in frame, skipping poke");
    return [];
  }
  const patch = unwrapPatch(cache.pending());
  const ret = [];
  for (const clientID of clients) {
    const clientRecord = await getClientRecord(clientID, cache);
    clientRecord.baseCookie = nextVersion;
    await putClientRecord(clientID, clientRecord, cache);
    const poke = {
      clientID,
      poke: {
        baseCookie: prevVersion,
        cookie: nextVersion,
        lastMutationID: clientRecord.lastMutationID,
        patch,
        timestamp
      }
    };
    ret.push(poke);
  }
  await cache.flush();
  return ret;
}

// src/process/process-room.ts
var FRAME_LENGTH_MS = 1e3 / 60;
async function processRoom(lc, clients, mutators, durable, timestamp) {
  const storage = new DurableStorage(durable);
  const cache = new EntryCache(storage);
  const clientIDs = [...clients.keys()];
  lc.debug?.("processing room", "clientIDs", clientIDs);
  const gcr = async (clientID) => must(await getClientRecord(clientID, cache), `Client record not found: ${clientID}`);
  let currentVersion = await getVersion(cache);
  if (currentVersion === void 0) {
    currentVersion = 0;
    await putVersion(currentVersion, cache);
  }
  lc.debug?.("currentVersion", currentVersion);
  const pokes = await fastForwardRoom(clientIDs, gcr, currentVersion, durable, timestamp);
  lc.debug?.("pokes from fastforward", JSON.stringify(pokes));
  for (const poke of pokes) {
    const cr = must(await getClientRecord(poke.clientID, cache));
    cr.baseCookie = poke.poke.cookie;
    await putClientRecord(poke.clientID, cr, cache);
  }
  const mergedMutations = new PeekIterator(generateMergedMutations(clients));
  pokes.push(...await processFrame(lc, mergedMutations, mutators, clientIDs, cache, timestamp));
  await cache.flush();
  return pokes;
}

// src/process/process-pending.ts
async function processPending(lc, durable, clients, mutators, timestamp) {
  lc.debug?.("process pending");
  const t0 = Date.now();
  try {
    const pokes = await processRoom(lc, clients, mutators, durable, timestamp);
    sendPokes(lc, pokes, clients);
    clearPendingMutations(lc, pokes, clients);
  } finally {
    lc.debug?.(`processPending took ${Date.now() - t0} ms`);
  }
}
function sendPokes(lc, pokes, clients) {
  for (const pokeBody of pokes) {
    const client = must(clients.get(pokeBody.clientID));
    const poke = ["poke", pokeBody.poke];
    lc.debug?.("sending client", pokeBody.clientID, "poke", pokeBody.poke);
    client.socket.send(JSON.stringify(poke));
  }
}
function clearPendingMutations(lc, pokes, clients) {
  lc.debug?.("clearing pending mutations");
  for (const pokeBody of pokes) {
    const client = must(clients.get(pokeBody.clientID));
    const idx = client.pending.findIndex((mutation) => mutation.id > pokeBody.poke.lastMutationID);
    client.pending.splice(0, idx > -1 ? idx : client.pending.length);
  }
}

// src/util/resolver.ts
function resolver() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// src/util/lock.ts
var Lock = class {
  _lockP = null;
  async lock() {
    const previous = this._lockP;
    const { promise, resolve } = resolver();
    this._lockP = promise;
    await previous;
    return resolve;
  }
  withLock(f) {
    return run(this.lock(), f);
  }
};
async function run(p, f) {
  const release = await p;
  try {
    return await f();
  } finally {
    release();
  }
}

// src/util/logger.ts
var LogContext = class {
  _s;
  debug = void 0;
  info = void 0;
  error = void 0;
  constructor(level = "info", s = "") {
    this._s = s;
    const impl = (name) => (...args) => console[name](this._s, ...args);
    switch (level) {
      case "debug":
        this.debug = impl("debug");
      case "info":
        this.info = impl("info");
      case "error":
        this.error = impl("error");
    }
  }
  addContext(key, value) {
    const space = this._s ? " " : "";
    return new LogContext(this._logLevel, `${this._s}${space}${key}=${value}`);
  }
  get _logLevel() {
    return this.debug ? "debug" : this.info ? "info" : "error";
  }
};

// src/server/close.ts
function handleClose(clients, clientID) {
  clients.delete(clientID);
}

// src/server/connect.ts
async function handleConnection(lc, ws, durable, url, clients, onMessage, onClose) {
  const { result, error } = getConnectRequest(url);
  if (result === null) {
    lc.info?.("invalid connection request", error);
    ws.send(error);
    ws.close();
    return;
  }
  lc = lc.addContext("client", result.clientID);
  lc.debug?.("parsed request", result);
  const { clientID, baseCookie } = result;
  const storage = new DurableStorage(durable);
  const existingRecord = await storage.get(clientRecordKey(clientID), clientRecordSchema);
  lc.debug?.("Existing client record", existingRecord);
  const lastMutationID = existingRecord?.lastMutationID ?? 0;
  const record = {
    baseCookie,
    lastMutationID
  };
  await storage.put(clientRecordKey(clientID), record);
  lc.debug?.("Put client record", record);
  const existing = clients.get(clientID);
  if (existing) {
    lc.debug?.("Closing old socket");
    existing.socket.close();
  }
  ws.addEventListener("message", (event) => onMessage(clientID, event.data.toString(), ws));
  ws.addEventListener("close", () => onClose(clientID));
  const client = {
    socket: ws,
    clockBehindByMs: void 0,
    pending: []
  };
  clients.set(clientID, client);
  const connectedMessage = ["connected", {}];
  ws.send(JSON.stringify(connectedMessage));
}
function getConnectRequest(url) {
  const getParam = (name, required) => {
    const value = url.searchParams.get(name);
    if (value === "" || value === null) {
      if (required) {
        throw new Error(`invalid querystring - missing ${name}`);
      }
      return null;
    }
    return value;
  };
  const getIntegerParam = (name, required) => {
    const value = getParam(name, required);
    if (value === null) {
      return null;
    }
    const int = parseInt(value);
    if (isNaN(int)) {
      throw new Error(`invalid querystring parameter ${name}, url: ${url}, got: ${value}`);
    }
    return int;
  };
  try {
    const clientID = getParam("clientID", true);
    const baseCookie = getIntegerParam("baseCookie", false);
    const timestamp = getIntegerParam("ts", true);
    return {
      result: {
        clientID,
        baseCookie,
        timestamp
      },
      error: null
    };
  } catch (e) {
    return {
      result: null,
      error: String(e)
    };
  }
}

// src/protocol/ping.ts
var pingBodySchema = external.object({});
var pingMessageSchema = external.tuple([external.literal("ping"), pingBodySchema]);

// src/protocol/push.ts
var mutationSchema = external.object({
  id: external.number(),
  name: external.string(),
  args: jsonSchema,
  timestamp: external.number()
});
var pushBodySchema = external.object({
  mutations: external.array(mutationSchema),
  pushVersion: external.number(),
  schemaVersion: external.string(),
  timestamp: external.number()
});
var pushMessageSchema = external.tuple([external.literal("push"), pushBodySchema]);

// src/protocol/up.ts
var upstreamSchema = external.union([pushMessageSchema, pingMessageSchema]);

// src/util/socket.ts
function sendError(ws, body) {
  const message = ["error", body];
  ws.send(JSON.stringify(message));
}

// src/server/push.ts
function handlePush(lc, clients, clientID, body, ws, now, processUntilDone) {
  lc.debug?.("handling push", JSON.stringify(body));
  const client = clients.get(clientID);
  if (!client) {
    lc.info?.("client not found");
    sendError(ws, `no such client: ${clientID}`);
    return;
  }
  if (client.clockBehindByMs === void 0) {
    client.clockBehindByMs = now() - body.timestamp;
    lc.debug?.("initializing clock offset: clock behind by", client.clockBehindByMs);
  }
  for (const m of body.mutations) {
    let idx = client.pending.findIndex((pm) => pm.id >= m.id);
    if (idx === -1) {
      idx = client.pending.length;
    } else if (client.pending[idx].id === m.id) {
      lc.debug?.("mutation already been queued", m.id);
      continue;
    }
    m.timestamp += client.clockBehindByMs;
    client.pending.splice(idx, 0, m);
    lc.debug?.("inserted mutation, pending is now", JSON.stringify(client.pending));
  }
  processUntilDone();
}

// src/server/ping.ts
function handlePing(lc, ws) {
  lc.debug?.("handling ping");
  const pongMessage = ["pong", {}];
  ws.send(JSON.stringify(pongMessage));
}

// src/server/message.ts
function handleMessage(lc, clientMap, clientID, data, ws, processUntilDone) {
  const msg = getMessage(data);
  if (msg.error) {
    lc.info?.("invalid message", msg.error);
    sendError(ws, msg.error);
    return;
  }
  const message = msg.result;
  switch (message[0]) {
    case "ping":
      handlePing(lc, ws);
      break;
    case "push":
      handlePush(lc, clientMap, clientID, message[1], ws, () => Date.now(), processUntilDone);
      break;
    default:
      throw new Error(`Unknown message type: ${message[0]}`);
  }
}
function getMessage(data) {
  let json;
  try {
    json = JSON.parse(data);
    const message = upstreamSchema.parse(json);
    return { result: message };
  } catch (e) {
    return { error: String(e) };
  }
}

// src/server/server.ts
var Server = class {
  constructor(mutators, _state) {
    this._state = _state;
    this._mutators = new Map([...Object.entries(mutators)]);
    this._logLevel = "debug";
    this._clients = /* @__PURE__ */ new Map();
  }
  _clients = /* @__PURE__ */ new Map();
  _lock = new Lock();
  _mutators;
  _logLevel;
  _turnTimerID = null;
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/connect") {
      if (request.headers.get("Upgrade") !== "websocket") {
        return new Response("expected websocket", { status: 400 });
      }
      const pair = new WebSocketPair();
      void this.handleConnection(pair[1], url);
      return new Response(null, { status: 101, webSocket: pair[0] });
    }
    throw new Error("unexpected path");
  }
  async handleConnection(ws, url) {
    const lc = new LogContext(this._logLevel).addContext("req", Math.random().toString(36).substr(2));
    lc.debug?.("connection request", url.toString(), "waiting for lock");
    ws.accept();
    await this._lock.withLock(async () => {
      lc.debug?.("received lock");
      await handleConnection(lc, ws, this._state.storage, url, this._clients, this.handleMessage.bind(this), this.handleClose.bind(this));
    });
  }
  async handleMessage(clientID, data, ws) {
    const lc = new LogContext(this._logLevel).addContext("req", Math.random().toString(36).substr(2)).addContext("client", clientID);
    lc.debug?.("handling message", data, "waiting for lock");
    await this._lock.withLock(async () => {
      lc.debug?.("received lock");
      handleMessage(lc, this._clients, clientID, data, ws, () => this.processUntilDone());
    });
  }
  async processUntilDone() {
    const lc = new LogContext(this._logLevel).addContext("req", Math.random().toString(36).substr(2));
    lc.debug?.("handling processUntilDone");
    if (this._turnTimerID !== null) {
      lc.debug?.("already processing, nothing to do");
      return;
    }
    this._turnTimerID = setInterval(() => {
      this.processNext(lc);
    }, 1e3 / 60);
  }
  async processNext(lc) {
    lc.debug?.(`processNext - starting turn at ${Date.now()} - waiting for lock`);
    await this._lock.withLock(async () => {
      lc.debug?.(`received lock at ${Date.now()}`);
      if (!hasPendingMutations(this._clients)) {
        lc.debug?.("No pending mutations to process, exiting");
        clearInterval(this._turnTimerID);
        this._turnTimerID = null;
        return;
      }
      await processPending(lc, this._state.storage, this._clients, this._mutators, Date.now());
    });
  }
  async handleClose(clientID) {
    const lc = new LogContext(this._logLevel).addContext("req", Math.random().toString(36).substr(2)).addContext("client", clientID);
    lc.debug?.("handling close - waiting for lock");
    await this._lock.withLock(async () => {
      lc.debug?.("received lock");
      handleClose(this._clients, clientID);
    });
  }
};
function hasPendingMutations(clients) {
  for (const clientState of clients.values()) {
    if (clientState.pending.length > 0) {
      return true;
    }
  }
  return false;
}

// src/server/worker.ts
async function fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== "/connect") {
    return new Response("unknown route", {
      status: 400
    });
  }
  const roomID = url.searchParams.get("roomID");
  if (roomID === null || roomID === "") {
    return new Response("roomID parameter required", {
      status: 400
    });
  }
  const { server } = env;
  const id = server.idFromName(roomID);
  const stub = server.get(id);
  return stub.fetch(request);
}
var worker = { fetch };

//# sourceMappingURL=index.mjs.map


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mutators": () => (/* binding */ mutators)
/* harmony export */ });
/* harmony import */ var _client_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _arrow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);




const mutators = {
  createShape: _shape__WEBPACK_IMPORTED_MODULE_1__.putShape,
  deleteShape: _shape__WEBPACK_IMPORTED_MODULE_1__.deleteShape,
  moveShape: _shape__WEBPACK_IMPORTED_MODULE_1__.moveShape,
  resizeShape: _shape__WEBPACK_IMPORTED_MODULE_1__.resizeShape,
  rotateShape: _shape__WEBPACK_IMPORTED_MODULE_1__.rotateShape,
  initClientState: _client_state__WEBPACK_IMPORTED_MODULE_0__.initClientState,
  setCursor: _client_state__WEBPACK_IMPORTED_MODULE_0__.setCursor,
  overShape: _client_state__WEBPACK_IMPORTED_MODULE_0__.overShape,
  selectShape: _client_state__WEBPACK_IMPORTED_MODULE_0__.selectShape,
  initShapes: _shape__WEBPACK_IMPORTED_MODULE_1__.initShapes,
  createItem: _item__WEBPACK_IMPORTED_MODULE_2__.putItem,
  deleteItem: _item__WEBPACK_IMPORTED_MODULE_2__.deleteItem,
  updateItemTitle: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemTitle,
  updateItemContent: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemContent,
  updateItemArrows: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemArrows,
  updateItemSourceURL: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemSourceURL,
  createArrow: _arrow__WEBPACK_IMPORTED_MODULE_3__.putArrow,
  updateItemAddSingleArrow: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemAddSingleArrow,
  deleteArrow: _arrow__WEBPACK_IMPORTED_MODULE_3__.deleteArrow,
  updateItemArrowsDeleteArrow: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemArrowsDeleteArrow,
  setUsername: _client_state__WEBPACK_IMPORTED_MODULE_0__.setUsername,
  setAvatarURL: _client_state__WEBPACK_IMPORTED_MODULE_0__.setAvatarURL,
  setTrunkIDs: _client_state__WEBPACK_IMPORTED_MODULE_0__.setTrunkIDs,
  updateItemCreatedBy: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemCreatedBy,
  updateArrowCreatedBy: _arrow__WEBPACK_IMPORTED_MODULE_3__.updateArrowCreatedBy,
  updateItemWebSourceURL: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemWebSourceURL,
  updateItemPublicationDate: _item__WEBPACK_IMPORTED_MODULE_2__.updateItemPublicationDate,
  nop: async _ => {}
};

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userInfoSchema": () => (/* binding */ userInfoSchema),
/* harmony export */   "supabaseUserInfoSchema": () => (/* binding */ supabaseUserInfoSchema),
/* harmony export */   "clientStateSchema": () => (/* binding */ clientStateSchema),
/* harmony export */   "initClientState": () => (/* binding */ initClientState),
/* harmony export */   "getClientState": () => (/* binding */ getClientState),
/* harmony export */   "putClientState": () => (/* binding */ putClientState),
/* harmony export */   "setUsername": () => (/* binding */ setUsername),
/* harmony export */   "setTrunkIDs": () => (/* binding */ setTrunkIDs),
/* harmony export */   "setAvatarURL": () => (/* binding */ setAvatarURL),
/* harmony export */   "setCursor": () => (/* binding */ setCursor),
/* harmony export */   "overShape": () => (/* binding */ overShape),
/* harmony export */   "selectShape": () => (/* binding */ selectShape),
/* harmony export */   "selectItem": () => (/* binding */ selectItem),
/* harmony export */   "randUserInfo": () => (/* binding */ randUserInfo),
/* harmony export */   "clientStatePrefix": () => (/* binding */ clientStatePrefix)
/* harmony export */ });
/* harmony import */ var _util_rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);

const colors = ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1"];
const avatars = [["🐶", "Puppy"], ["🐱", "Kitty"], ["🐭", "Mouse"], ["🐹", "Hamster"], ["🐰", "Bunny"], ["🦊", "Fox"], ["🐻", "Bear"], ["🐼", "Panda"], ["🐨", "Koala"], ["🐯", "Tiger"], ["🦁", "Lion"], ["🐮", "Cow"], ["🐷", "Piggy"], ["🐵", "Monkey"], ["🐣", "Chick"]];

const userInfoSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
  avatar: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  name: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  color: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
});
const supabaseUserInfoSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
  email: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  username: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  avatarURL: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  trunkIDs: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
}); // TODO: It would be good to merge this with the first-class concept of `client`
// that Replicache itself manages if possible.

const clientStateSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
  cursor: zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
    x: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
    y: zod__WEBPACK_IMPORTED_MODULE_1__.z.number()
  }),
  overID: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  selectedID: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  userInfo: userInfoSchema,
  selectedItemID: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  supabaseUserInfo: supabaseUserInfoSchema
});
async function initClientState(tx, {
  id,
  defaultUserInfo,
  defaultSupabaseUserInfo
}) {
  if (await tx.has(key(id))) {
    return;
  }

  await putClientState(tx, {
    id,
    clientState: {
      cursor: {
        x: 0,
        y: 0
      },
      overID: "",
      selectedID: "",
      userInfo: defaultUserInfo,
      selectedItemID: "",
      supabaseUserInfo: defaultSupabaseUserInfo
    }
  });
}
async function getClientState(tx, id) {
  const jv = await tx.get(key(id));

  if (!jv) {
    throw new Error("Expected clientState to be initialized already: " + id);
  }

  return clientStateSchema.parse(jv);
}
function putClientState(tx, {
  id,
  clientState
}) {
  return tx.put(key(id), clientState);
}
async function setUsername(tx, {
  id,
  username
}) {
  const clientState = await getClientState(tx, id);
  clientState.supabaseUserInfo.username = username;
  await putClientState(tx, {
    id,
    clientState
  });
}
async function setTrunkIDs(tx, {
  id,
  trunkIDs
}) {
  const clientState = await getClientState(tx, id);
  clientState.supabaseUserInfo.trunkIDs = trunkIDs;
  await putClientState(tx, {
    id,
    clientState
  });
}
async function setAvatarURL(tx, {
  id,
  avatarURL
}) {
  const clientState = await getClientState(tx, id);
  clientState.supabaseUserInfo.avatarURL = avatarURL;
  await putClientState(tx, {
    id,
    clientState
  });
}
async function setCursor(tx, {
  id,
  x,
  y
}) {
  const clientState = await getClientState(tx, id);
  clientState.cursor.x = x;
  clientState.cursor.y = y;
  await putClientState(tx, {
    id,
    clientState
  });
}
async function overShape(tx, {
  clientID,
  shapeID
}) {
  const client = await getClientState(tx, clientID);
  client.overID = shapeID;
  await putClientState(tx, {
    id: clientID,
    clientState: client
  });
}
async function selectShape(tx, {
  clientID,
  shapeID
}) {
  const client = await getClientState(tx, clientID);
  client.selectedID = shapeID;
  await putClientState(tx, {
    id: clientID,
    clientState: client
  });
}
async function selectItem(tx, {
  clientID,
  itemID
}) {
  const client = await getClientState(tx, clientID);
  client.selectedItemID = itemID;
  await putClientState(tx, {
    id: clientID,
    clientState: client
  });
}
function randUserInfo() {
  const [avatar, name] = avatars[(0,_util_rand__WEBPACK_IMPORTED_MODULE_0__.randInt)(0, avatars.length - 1)];
  return {
    avatar,
    name,
    color: colors[(0,_util_rand__WEBPACK_IMPORTED_MODULE_0__.randInt)(0, colors.length - 1)]
  };
}

function key(id) {
  return `${clientStatePrefix}${id}`;
}

const clientStatePrefix = `client-state-`;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randInt": () => (/* binding */ randInt)
/* harmony export */ });
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DIRTY": () => (/* binding */ DIRTY),
/* harmony export */   "EMPTY_PATH": () => (/* binding */ EMPTY_PATH),
/* harmony export */   "INVALID": () => (/* binding */ INVALID),
/* harmony export */   "OK": () => (/* binding */ OK),
/* harmony export */   "ParseStatus": () => (/* binding */ ParseStatus),
/* harmony export */   "Schema": () => (/* binding */ ZodType),
/* harmony export */   "ZodAny": () => (/* binding */ ZodAny),
/* harmony export */   "ZodArray": () => (/* binding */ ZodArray),
/* harmony export */   "ZodBigInt": () => (/* binding */ ZodBigInt),
/* harmony export */   "ZodBoolean": () => (/* binding */ ZodBoolean),
/* harmony export */   "ZodDate": () => (/* binding */ ZodDate),
/* harmony export */   "ZodDefault": () => (/* binding */ ZodDefault),
/* harmony export */   "ZodDiscriminatedUnion": () => (/* binding */ ZodDiscriminatedUnion),
/* harmony export */   "ZodEffects": () => (/* binding */ ZodEffects),
/* harmony export */   "ZodEnum": () => (/* binding */ ZodEnum),
/* harmony export */   "ZodError": () => (/* binding */ ZodError),
/* harmony export */   "ZodFirstPartyTypeKind": () => (/* binding */ ZodFirstPartyTypeKind),
/* harmony export */   "ZodFunction": () => (/* binding */ ZodFunction),
/* harmony export */   "ZodIntersection": () => (/* binding */ ZodIntersection),
/* harmony export */   "ZodIssueCode": () => (/* binding */ ZodIssueCode),
/* harmony export */   "ZodLazy": () => (/* binding */ ZodLazy),
/* harmony export */   "ZodLiteral": () => (/* binding */ ZodLiteral),
/* harmony export */   "ZodMap": () => (/* binding */ ZodMap),
/* harmony export */   "ZodNaN": () => (/* binding */ ZodNaN),
/* harmony export */   "ZodNativeEnum": () => (/* binding */ ZodNativeEnum),
/* harmony export */   "ZodNever": () => (/* binding */ ZodNever),
/* harmony export */   "ZodNull": () => (/* binding */ ZodNull),
/* harmony export */   "ZodNullable": () => (/* binding */ ZodNullable),
/* harmony export */   "ZodNumber": () => (/* binding */ ZodNumber),
/* harmony export */   "ZodObject": () => (/* binding */ ZodObject),
/* harmony export */   "ZodOptional": () => (/* binding */ ZodOptional),
/* harmony export */   "ZodParsedType": () => (/* binding */ ZodParsedType),
/* harmony export */   "ZodPromise": () => (/* binding */ ZodPromise),
/* harmony export */   "ZodRecord": () => (/* binding */ ZodRecord),
/* harmony export */   "ZodSchema": () => (/* binding */ ZodType),
/* harmony export */   "ZodSet": () => (/* binding */ ZodSet),
/* harmony export */   "ZodString": () => (/* binding */ ZodString),
/* harmony export */   "ZodTransformer": () => (/* binding */ ZodEffects),
/* harmony export */   "ZodTuple": () => (/* binding */ ZodTuple),
/* harmony export */   "ZodType": () => (/* binding */ ZodType),
/* harmony export */   "ZodUndefined": () => (/* binding */ ZodUndefined),
/* harmony export */   "ZodUnion": () => (/* binding */ ZodUnion),
/* harmony export */   "ZodUnknown": () => (/* binding */ ZodUnknown),
/* harmony export */   "ZodVoid": () => (/* binding */ ZodVoid),
/* harmony export */   "addIssueToContext": () => (/* binding */ addIssueToContext),
/* harmony export */   "any": () => (/* binding */ anyType),
/* harmony export */   "array": () => (/* binding */ arrayType),
/* harmony export */   "bigint": () => (/* binding */ bigIntType),
/* harmony export */   "boolean": () => (/* binding */ booleanType),
/* harmony export */   "custom": () => (/* binding */ custom),
/* harmony export */   "date": () => (/* binding */ dateType),
/* harmony export */   "default": () => (/* binding */ mod),
/* harmony export */   "defaultErrorMap": () => (/* binding */ defaultErrorMap),
/* harmony export */   "discriminatedUnion": () => (/* binding */ discriminatedUnionType),
/* harmony export */   "effect": () => (/* binding */ effectsType),
/* harmony export */   "enum": () => (/* binding */ enumType),
/* harmony export */   "function": () => (/* binding */ functionType),
/* harmony export */   "getParsedType": () => (/* binding */ getParsedType),
/* harmony export */   "instanceof": () => (/* binding */ instanceOfType),
/* harmony export */   "intersection": () => (/* binding */ intersectionType),
/* harmony export */   "isAborted": () => (/* binding */ isAborted),
/* harmony export */   "isAsync": () => (/* binding */ isAsync),
/* harmony export */   "isDirty": () => (/* binding */ isDirty),
/* harmony export */   "isValid": () => (/* binding */ isValid),
/* harmony export */   "late": () => (/* binding */ late),
/* harmony export */   "lazy": () => (/* binding */ lazyType),
/* harmony export */   "literal": () => (/* binding */ literalType),
/* harmony export */   "makeIssue": () => (/* binding */ makeIssue),
/* harmony export */   "map": () => (/* binding */ mapType),
/* harmony export */   "nan": () => (/* binding */ nanType),
/* harmony export */   "nativeEnum": () => (/* binding */ nativeEnumType),
/* harmony export */   "never": () => (/* binding */ neverType),
/* harmony export */   "null": () => (/* binding */ nullType),
/* harmony export */   "nullable": () => (/* binding */ nullableType),
/* harmony export */   "number": () => (/* binding */ numberType),
/* harmony export */   "object": () => (/* binding */ objectType),
/* harmony export */   "objectUtil": () => (/* binding */ objectUtil),
/* harmony export */   "oboolean": () => (/* binding */ oboolean),
/* harmony export */   "onumber": () => (/* binding */ onumber),
/* harmony export */   "optional": () => (/* binding */ optionalType),
/* harmony export */   "ostring": () => (/* binding */ ostring),
/* harmony export */   "overrideErrorMap": () => (/* binding */ overrideErrorMap),
/* harmony export */   "preprocess": () => (/* binding */ preprocessType),
/* harmony export */   "promise": () => (/* binding */ promiseType),
/* harmony export */   "quotelessJson": () => (/* binding */ quotelessJson),
/* harmony export */   "record": () => (/* binding */ recordType),
/* harmony export */   "set": () => (/* binding */ setType),
/* harmony export */   "setErrorMap": () => (/* binding */ setErrorMap),
/* harmony export */   "strictObject": () => (/* binding */ strictObjectType),
/* harmony export */   "string": () => (/* binding */ stringType),
/* harmony export */   "transformer": () => (/* binding */ effectsType),
/* harmony export */   "tuple": () => (/* binding */ tupleType),
/* harmony export */   "undefined": () => (/* binding */ undefinedType),
/* harmony export */   "union": () => (/* binding */ unionType),
/* harmony export */   "unknown": () => (/* binding */ unknownType),
/* harmony export */   "void": () => (/* binding */ voidType),
/* harmony export */   "z": () => (/* binding */ mod)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var util;
(function (util) {
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = function (items) {
        var e_1, _a;
        var obj = {};
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                obj[item] = item;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return obj;
    };
    util.getValidEnumValues = function (obj) {
        var e_2, _a;
        var validKeys = util.objectKeys(obj).filter(function (k) { return typeof obj[obj[k]] !== "number"; });
        var filtered = {};
        try {
            for (var validKeys_1 = __values(validKeys), validKeys_1_1 = validKeys_1.next(); !validKeys_1_1.done; validKeys_1_1 = validKeys_1.next()) {
                var k = validKeys_1_1.value;
                filtered[k] = obj[k];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (validKeys_1_1 && !validKeys_1_1.done && (_a = validKeys_1.return)) _a.call(validKeys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return util.objectValues(filtered);
    };
    util.objectValues = function (obj) {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? function (obj) { return Object.keys(obj); } // eslint-disable-line ban/ban
        : function (object) {
            var keys = [];
            for (var key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = function (arr, checker) {
        var e_3, _a;
        try {
            for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                var item = arr_1_1.value;
                if (checker(item))
                    return item;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? function (val) { return Number.isInteger(val); } // eslint-disable-line ban/ban
        : function (val) {
            return typeof val === "number" && isFinite(val) && Math.floor(val) === val;
        };
})(util || (util = {}));

var ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
]);
var quotelessJson = function (obj) {
    var json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = /** @class */ (function (_super) {
    __extends(ZodError, _super);
    function ZodError(issues) {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        _this.issues = [];
        _this.format = function () {
            var fieldErrors = { _errors: [] };
            var processError = function (error) {
                var e_1, _a;
                try {
                    for (var _b = __values(error.issues), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var issue = _c.value;
                        if (issue.code === "invalid_union") {
                            issue.unionErrors.map(processError);
                        }
                        else if (issue.code === "invalid_return_type") {
                            processError(issue.returnTypeError);
                        }
                        else if (issue.code === "invalid_arguments") {
                            processError(issue.argumentsError);
                        }
                        else if (issue.path.length === 0) {
                            fieldErrors._errors.push(issue.message);
                        }
                        else {
                            var curr = fieldErrors;
                            var i = 0;
                            while (i < issue.path.length) {
                                var el = issue.path[i];
                                var terminal = i === issue.path.length - 1;
                                if (!terminal) {
                                    if (typeof el === "string") {
                                        curr[el] = curr[el] || { _errors: [] };
                                    }
                                    else if (typeof el === "number") {
                                        var errorArray = [];
                                        errorArray._errors = [];
                                        curr[el] = curr[el] || errorArray;
                                    }
                                }
                                else {
                                    curr[el] = curr[el] || { _errors: [] };
                                    curr[el]._errors.push(issue.message);
                                }
                                curr = curr[el];
                                i++;
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
            processError(_this);
            return fieldErrors;
        };
        _this.addIssue = function (sub) {
            _this.issues = __spreadArray(__spreadArray([], __read(_this.issues), false), [sub], false);
        };
        _this.addIssues = function (subs) {
            if (subs === void 0) { subs = []; }
            _this.issues = __spreadArray(__spreadArray([], __read(_this.issues), false), __read(subs), false);
        };
        var actualProto = _newTarget.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(_this, actualProto);
        }
        else {
            _this.__proto__ = actualProto;
        }
        _this.name = "ZodError";
        _this.issues = issues;
        return _this;
    }
    Object.defineProperty(ZodError.prototype, "errors", {
        get: function () {
            return this.issues;
        },
        enumerable: false,
        configurable: true
    });
    ZodError.prototype.toString = function () {
        return this.message;
    };
    Object.defineProperty(ZodError.prototype, "message", {
        get: function () {
            return JSON.stringify(this.issues, null, 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodError.prototype, "isEmpty", {
        get: function () {
            return this.issues.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    ZodError.prototype.flatten = function (mapper) {
        var e_2, _a;
        if (mapper === void 0) { mapper = function (issue) { return issue.message; }; }
        var fieldErrors = {};
        var formErrors = [];
        try {
            for (var _b = __values(this.issues), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sub = _c.value;
                if (sub.path.length > 0) {
                    fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                    fieldErrors[sub.path[0]].push(mapper(sub));
                }
                else {
                    formErrors.push(mapper(sub));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return { formErrors: formErrors, fieldErrors: fieldErrors };
    };
    Object.defineProperty(ZodError.prototype, "formErrors", {
        get: function () {
            return this.flatten();
        },
        enumerable: false,
        configurable: true
    });
    ZodError.create = function (issues) {
        var error = new ZodError(issues);
        return error;
    };
    return ZodError;
}(Error));
var defaultErrorMap = function (issue, _ctx) {
    var message;
    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.received === "undefined") {
                message = "Required";
            }
            else {
                message = "Expected ".concat(issue.expected, ", received ").concat(issue.received);
            }
            break;
        case ZodIssueCode.unrecognized_keys:
            message = "Unrecognized key(s) in object: ".concat(issue.keys
                .map(function (k) { return "'".concat(k, "'"); })
                .join(", "));
            break;
        case ZodIssueCode.invalid_union:
            message = "Invalid input";
            break;
        case ZodIssueCode.invalid_union_discriminator:
            message = "Invalid discriminator value. Expected ".concat(issue.options
                .map(function (val) { return (typeof val === "string" ? "'".concat(val, "'") : val); })
                .join(" | "));
            break;
        case ZodIssueCode.invalid_enum_value:
            message = "Invalid enum value. Expected ".concat(issue.options
                .map(function (val) { return (typeof val === "string" ? "'".concat(val, "'") : val); })
                .join(" | "));
            break;
        case ZodIssueCode.invalid_arguments:
            message = "Invalid function arguments";
            break;
        case ZodIssueCode.invalid_return_type:
            message = "Invalid function return type";
            break;
        case ZodIssueCode.invalid_date:
            message = "Invalid date";
            break;
        case ZodIssueCode.invalid_string:
            if (issue.validation !== "regex")
                message = "Invalid ".concat(issue.validation);
            else
                message = "Invalid";
            break;
        case ZodIssueCode.too_small:
            if (issue.type === "array")
                message = "Array must contain ".concat(issue.inclusive ? "at least" : "more than", " ").concat(issue.minimum, " element(s)");
            else if (issue.type === "string")
                message = "String must contain ".concat(issue.inclusive ? "at least" : "over", " ").concat(issue.minimum, " character(s)");
            else if (issue.type === "number")
                message = "Number must be greater than ".concat(issue.inclusive ? "or equal to " : "").concat(issue.minimum);
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.too_big:
            if (issue.type === "array")
                message = "Array must contain ".concat(issue.inclusive ? "at most" : "less than", " ").concat(issue.maximum, " element(s)");
            else if (issue.type === "string")
                message = "String must contain ".concat(issue.inclusive ? "at most" : "under", " ").concat(issue.maximum, " character(s)");
            else if (issue.type === "number")
                message = "Number must be less than ".concat(issue.inclusive ? "or equal to " : "").concat(issue.maximum);
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.custom:
            message = "Invalid input";
            break;
        case ZodIssueCode.invalid_intersection_types:
            message = "Intersection results could not be merged";
            break;
        case ZodIssueCode.not_multiple_of:
            message = "Number must be a multiple of ".concat(issue.multipleOf);
            break;
        default:
            message = _ctx.defaultError;
            util.assertNever(issue);
    }
    return { message: message };
};
var overrideErrorMap = defaultErrorMap;
var setErrorMap = function (map) {
    overrideErrorMap = map;
};

var ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
function cacheAndReturn(data, parsedType, cache) {
    if (cache)
        cache.set(data, parsedType);
    return parsedType;
}
var getParsedType = function (data, cache) {
    if (cache && cache.has(data))
        return cache.get(data);
    var t = typeof data;
    switch (t) {
        case "undefined":
            return cacheAndReturn(data, ZodParsedType.undefined, cache);
        case "string":
            return cacheAndReturn(data, ZodParsedType.string, cache);
        case "number":
            return cacheAndReturn(data, isNaN(data) ? ZodParsedType.nan : ZodParsedType.number, cache);
        case "boolean":
            return cacheAndReturn(data, ZodParsedType.boolean, cache);
        case "function":
            return cacheAndReturn(data, ZodParsedType.function, cache);
        case "bigint":
            return cacheAndReturn(data, ZodParsedType.bigint, cache);
        case "object":
            if (Array.isArray(data)) {
                return cacheAndReturn(data, ZodParsedType.array, cache);
            }
            if (data === null) {
                return cacheAndReturn(data, ZodParsedType.null, cache);
            }
            if (data.then &&
                typeof data.then === "function" &&
                data.catch &&
                typeof data.catch === "function") {
                return cacheAndReturn(data, ZodParsedType.promise, cache);
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return cacheAndReturn(data, ZodParsedType.map, cache);
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return cacheAndReturn(data, ZodParsedType.set, cache);
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return cacheAndReturn(data, ZodParsedType.date, cache);
            }
            return cacheAndReturn(data, ZodParsedType.object, cache);
        default:
            return cacheAndReturn(data, ZodParsedType.unknown, cache);
    }
};
var makeIssue = function (params) {
    var e_1, _a;
    var data = params.data, path = params.path, errorMaps = params.errorMaps, issueData = params.issueData;
    var fullPath = __spreadArray(__spreadArray([], __read(path), false), __read((issueData.path || [])), false);
    var fullIssue = __assign(__assign({}, issueData), { path: fullPath });
    var errorMessage = "";
    var maps = errorMaps
        .filter(function (m) { return !!m; })
        .slice()
        .reverse();
    try {
        for (var maps_1 = __values(maps), maps_1_1 = maps_1.next(); !maps_1_1.done; maps_1_1 = maps_1.next()) {
            var map = maps_1_1.value;
            errorMessage = map(fullIssue, { data: data, defaultError: errorMessage }).message;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (maps_1_1 && !maps_1_1.done && (_a = maps_1.return)) _a.call(maps_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return __assign(__assign({}, issueData), { path: fullPath, message: issueData.message || errorMessage });
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    var issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.contextualErrorMap,
            ctx.schemaErrorMap,
            overrideErrorMap,
            defaultErrorMap, // then global default map
        ].filter(function (x) { return !!x; }),
    });
    ctx.issues.push(issue);
}
var ParseStatus = /** @class */ (function () {
    function ParseStatus() {
        this.value = "valid";
    }
    ParseStatus.prototype.dirty = function () {
        if (this.value === "valid")
            this.value = "dirty";
    };
    ParseStatus.prototype.abort = function () {
        if (this.value !== "aborted")
            this.value = "aborted";
    };
    ParseStatus.mergeArray = function (status, results) {
        var e_2, _a;
        var arrayValue = [];
        try {
            for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                var s = results_1_1.value;
                if (s.status === "aborted")
                    return INVALID;
                if (s.status === "dirty")
                    status.dirty();
                arrayValue.push(s.value);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return { status: status.value, value: arrayValue };
    };
    ParseStatus.mergeObjectAsync = function (status, pairs) {
        return __awaiter(this, void 0, void 0, function () {
            var syncPairs, pairs_1, pairs_1_1, pair, _a, _b, e_3_1;
            var e_3, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        syncPairs = [];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 9]);
                        pairs_1 = __values(pairs), pairs_1_1 = pairs_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!pairs_1_1.done) return [3 /*break*/, 6];
                        pair = pairs_1_1.value;
                        _b = (_a = syncPairs).push;
                        _d = {};
                        return [4 /*yield*/, pair.key];
                    case 3:
                        _d.key = _e.sent();
                        return [4 /*yield*/, pair.value];
                    case 4:
                        _b.apply(_a, [(_d.value = _e.sent(),
                                _d)]);
                        _e.label = 5;
                    case 5:
                        pairs_1_1 = pairs_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (pairs_1_1 && !pairs_1_1.done && (_c = pairs_1.return)) _c.call(pairs_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, ParseStatus.mergeObjectSync(status, syncPairs)];
                }
            });
        });
    };
    ParseStatus.mergeObjectSync = function (status, pairs) {
        var e_4, _a;
        var finalObject = {};
        try {
            for (var pairs_2 = __values(pairs), pairs_2_1 = pairs_2.next(); !pairs_2_1.done; pairs_2_1 = pairs_2.next()) {
                var pair = pairs_2_1.value;
                var key = pair.key, value = pair.value;
                if (key.status === "aborted")
                    return INVALID;
                if (value.status === "aborted")
                    return INVALID;
                if (key.status === "dirty")
                    status.dirty();
                if (value.status === "dirty")
                    status.dirty();
                if (typeof value.value !== "undefined" || pair.alwaysSet) {
                    finalObject[key.value] = value.value;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (pairs_2_1 && !pairs_2_1.done && (_a = pairs_2.return)) _a.call(pairs_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return { status: status.value, value: finalObject };
    };
    return ParseStatus;
}());
var INVALID = Object.freeze({
    status: "aborted",
});
var DIRTY = function (value) { return ({ status: "dirty", value: value }); };
var OK = function (value) { return ({ status: "valid", value: value }); };
var isAborted = function (x) {
    return x.status === "aborted";
};
var isDirty = function (x) {
    return x.status === "dirty";
};
var isValid = function (x) {
    return x.status === "valid";
};
var isAsync = function (x) {
    return typeof Promise !== undefined && x instanceof Promise;
};

var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = function (message) {
        return typeof message === "string" ? { message: message } : message || {};
    };
    errorUtil.toString = function (message) {
        return typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    };
})(errorUtil || (errorUtil = {}));

var handleResult = function (ctx, result) {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        var error = new ZodError(ctx.issues);
        return { success: false, error: error };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    var errorMap = params.errorMap, invalid_type_error = params.invalid_type_error, required_error = params.required_error, description = params.description;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error("Can't use \"invalid\" or \"required\" in conjunction with custom error map.");
    }
    if (errorMap)
        return { errorMap: errorMap, description: description };
    var customMap = function (iss, ctx) {
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        if (typeof ctx.data === "undefined" && required_error)
            return { message: required_error };
        if (params.invalid_type_error)
            return { message: params.invalid_type_error };
        return { message: ctx.defaultError };
    };
    return { errorMap: customMap, description: description };
}
var ZodType = /** @class */ (function () {
    function ZodType(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this.superRefine = this._refinement;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.default = this.default.bind(this);
        this.describe = this.describe.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this.isNullable = this.isNullable.bind(this);
    }
    Object.defineProperty(ZodType.prototype, "description", {
        get: function () {
            return this._def.description;
        },
        enumerable: false,
        configurable: true
    });
    ZodType.prototype._processInputParams = function (input) {
        return {
            status: new ParseStatus(),
            ctx: __assign(__assign({}, input.parent), { data: input.data, parsedType: getParsedType(input.data, input.parent.typeCache), schemaErrorMap: this._def.errorMap, path: input.path, parent: input.parent }),
        };
    };
    ZodType.prototype._parseSync = function (input) {
        var result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    };
    ZodType.prototype._parseAsync = function (input) {
        var result = this._parse(input);
        return Promise.resolve(result);
    };
    ZodType.prototype.parse = function (data, params) {
        var result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    };
    ZodType.prototype.safeParse = function (data, params) {
        var _a;
        var ctx = {
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            schemaErrorMap: this._def.errorMap,
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            typeCache: typeof Map !== "undefined" ? new Map() : undefined,
            parent: null,
            data: data,
            parsedType: getParsedType(data),
        };
        var result = this._parseSync({ data: data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    };
    ZodType.prototype.parseAsync = function (data, params) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.safeParseAsync(data, params)];
                    case 1:
                        result = _a.sent();
                        if (result.success)
                            return [2 /*return*/, result.data];
                        throw result.error;
                }
            });
        });
    };
    ZodType.prototype.safeParseAsync = function (data, params) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, maybeAsyncResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = {
                            path: (params === null || params === void 0 ? void 0 : params.path) || [],
                            issues: [],
                            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                            schemaErrorMap: this._def.errorMap,
                            async: true,
                            typeCache: typeof Map !== "undefined" ? new Map() : undefined,
                            parent: null,
                            data: data,
                            parsedType: getParsedType(data),
                        };
                        maybeAsyncResult = this._parse({ data: data, path: [], parent: ctx });
                        return [4 /*yield*/, (isAsync(maybeAsyncResult)
                                ? maybeAsyncResult
                                : Promise.resolve(maybeAsyncResult))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, handleResult(ctx, result)];
                }
            });
        });
    };
    ZodType.prototype.refine = function (check, message) {
        var getIssueProperties = function (val) {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message: message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement(function (val, ctx) {
            var result = check(val);
            var setError = function () {
                return ctx.addIssue(__assign({ code: ZodIssueCode.custom }, getIssueProperties(val)));
            };
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then(function (data) {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    };
    ZodType.prototype.refinement = function (check, refinementData) {
        return this._refinement(function (val, ctx) {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function"
                    ? refinementData(val, ctx)
                    : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    };
    ZodType.prototype._refinement = function (refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement: refinement },
        });
    };
    ZodType.prototype.optional = function () {
        return ZodOptional.create(this);
    };
    ZodType.prototype.nullable = function () {
        return ZodNullable.create(this);
    };
    ZodType.prototype.nullish = function () {
        return this.optional().nullable();
    };
    ZodType.prototype.array = function () {
        return ZodArray.create(this);
    };
    ZodType.prototype.promise = function () {
        return ZodPromise.create(this);
    };
    ZodType.prototype.or = function (option) {
        return ZodUnion.create([this, option]);
    };
    ZodType.prototype.and = function (incoming) {
        return ZodIntersection.create(this, incoming);
    };
    ZodType.prototype.transform = function (transform) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform: transform },
        });
    };
    ZodType.prototype.default = function (def) {
        var defaultValueFunc = typeof def === "function" ? def : function () { return def; };
        return new ZodDefault({
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    };
    ZodType.prototype.describe = function (description) {
        var This = this.constructor;
        return new This(__assign(__assign({}, this._def), { description: description }));
    };
    ZodType.prototype.isOptional = function () {
        return this.safeParse(undefined).success;
    };
    ZodType.prototype.isNullable = function () {
        return this.safeParse(null).success;
    };
    return ZodType;
}());
var cuidRegex = /^c[^\s-]{8,}$/i;
var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
// eslint-disable-next-line
var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var ZodString = /** @class */ (function (_super) {
    __extends(ZodString, _super);
    function ZodString() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._regex = function (regex, validation, message) {
            return _this.refinement(function (data) { return regex.test(data); }, __assign({ validation: validation, code: ZodIssueCode.invalid_string }, errorUtil.errToObj(message)));
        };
        /**
         * Deprecated.
         * Use z.string().min(1) instead.
         */
        _this.nonempty = function (message) {
            return _this.min(1, errorUtil.errToObj(message));
        };
        return _this;
    }
    ZodString.prototype._parse = function (input) {
        var e_1, _a;
        var _b = this._processInputParams(input), status = _b.status, ctx = _b.ctx;
        if (ctx.parsedType !== ZodParsedType.string) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: ctx.parsedType,
            }
            //
            );
            return INVALID;
        }
        try {
            for (var _c = __values(this._def.checks), _d = _c.next(); !_d.done; _d = _c.next()) {
                var check = _d.value;
                if (check.kind === "min") {
                    if (ctx.data.length < check.value) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "max") {
                    if (ctx.data.length > check.value) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "email") {
                    if (!emailRegex.test(ctx.data)) {
                        addIssueToContext(ctx, {
                            validation: "email",
                            code: ZodIssueCode.invalid_string,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "uuid") {
                    if (!uuidRegex.test(ctx.data)) {
                        addIssueToContext(ctx, {
                            validation: "uuid",
                            code: ZodIssueCode.invalid_string,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "cuid") {
                    if (!cuidRegex.test(ctx.data)) {
                        addIssueToContext(ctx, {
                            validation: "cuid",
                            code: ZodIssueCode.invalid_string,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "url") {
                    try {
                        new URL(ctx.data);
                    }
                    catch (_e) {
                        addIssueToContext(ctx, {
                            validation: "url",
                            code: ZodIssueCode.invalid_string,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "regex") {
                    check.regex.lastIndex = 0;
                    var testResult = check.regex.test(ctx.data);
                    if (!testResult) {
                        addIssueToContext(ctx, {
                            validation: "regex",
                            code: ZodIssueCode.invalid_string,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { status: status.value, value: ctx.data };
    };
    ZodString.prototype._addCheck = function (check) {
        return new ZodString(__assign(__assign({}, this._def), { checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [check], false) }));
    };
    ZodString.prototype.email = function (message) {
        return this._addCheck(__assign({ kind: "email" }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.url = function (message) {
        return this._addCheck(__assign({ kind: "url" }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.uuid = function (message) {
        return this._addCheck(__assign({ kind: "uuid" }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.cuid = function (message) {
        return this._addCheck(__assign({ kind: "cuid" }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.regex = function (regex, message) {
        return this._addCheck(__assign({ kind: "regex", regex: regex }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.min = function (minLength, message) {
        return this._addCheck(__assign({ kind: "min", value: minLength }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.max = function (maxLength, message) {
        return this._addCheck(__assign({ kind: "max", value: maxLength }, errorUtil.errToObj(message)));
    };
    ZodString.prototype.length = function (len, message) {
        return this.min(len, message).max(len, message);
    };
    Object.defineProperty(ZodString.prototype, "isEmail", {
        get: function () {
            return !!this._def.checks.find(function (ch) { return ch.kind === "email"; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodString.prototype, "isURL", {
        get: function () {
            return !!this._def.checks.find(function (ch) { return ch.kind === "url"; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodString.prototype, "isUUID", {
        get: function () {
            return !!this._def.checks.find(function (ch) { return ch.kind === "uuid"; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodString.prototype, "isCUID", {
        get: function () {
            return !!this._def.checks.find(function (ch) { return ch.kind === "cuid"; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodString.prototype, "minLength", {
        get: function () {
            var min = -Infinity;
            this._def.checks.map(function (ch) {
                if (ch.kind === "min") {
                    if (min === null || ch.value > min) {
                        min = ch.value;
                    }
                }
            });
            return min;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodString.prototype, "maxLength", {
        get: function () {
            var max = null;
            this._def.checks.map(function (ch) {
                if (ch.kind === "max") {
                    if (max === null || ch.value < max) {
                        max = ch.value;
                    }
                }
            });
            return max;
        },
        enumerable: false,
        configurable: true
    });
    ZodString.create = function (params) {
        return new ZodString(__assign({ checks: [], typeName: ZodFirstPartyTypeKind.ZodString }, processCreateParams(params)));
    };
    return ZodString;
}(ZodType));
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    var valDecCount = (val.toString().split(".")[1] || "").length;
    var stepDecCount = (step.toString().split(".")[1] || "").length;
    var decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    var valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    var stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
}
var ZodNumber = /** @class */ (function (_super) {
    __extends(ZodNumber, _super);
    function ZodNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = _this.gte;
        _this.max = _this.lte;
        _this.step = _this.multipleOf;
        return _this;
    }
    ZodNumber.prototype._parse = function (input) {
        var e_2, _a;
        var _b = this._processInputParams(input), status = _b.status, ctx = _b.ctx;
        if (ctx.parsedType !== ZodParsedType.number) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.number,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        try {
            for (var _c = __values(this._def.checks), _d = _c.next(); !_d.done; _d = _c.next()) {
                var check = _d.value;
                if (check.kind === "int") {
                    if (!util.isInteger(ctx.data)) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.invalid_type,
                            expected: "integer",
                            received: "float",
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "min") {
                    var tooSmall = check.inclusive
                        ? ctx.data < check.value
                        : ctx.data <= check.value;
                    if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "number",
                            inclusive: check.inclusive,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "max") {
                    var tooBig = check.inclusive
                        ? ctx.data > check.value
                        : ctx.data >= check.value;
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "number",
                            inclusive: check.inclusive,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else if (check.kind === "multipleOf") {
                    if (floatSafeRemainder(ctx.data, check.value) !== 0) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.not_multiple_of,
                            multipleOf: check.value,
                            message: check.message,
                        });
                        status.dirty();
                    }
                }
                else {
                    util.assertNever(check);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return { status: status.value, value: ctx.data };
    };
    ZodNumber.prototype.gte = function (value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    };
    ZodNumber.prototype.gt = function (value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    };
    ZodNumber.prototype.lte = function (value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    };
    ZodNumber.prototype.lt = function (value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    };
    ZodNumber.prototype.setLimit = function (kind, value, inclusive, message) {
        return new ZodNumber(__assign(__assign({}, this._def), { checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [
                {
                    kind: kind,
                    value: value,
                    inclusive: inclusive,
                    message: errorUtil.toString(message),
                },
            ], false) }));
    };
    ZodNumber.prototype._addCheck = function (check) {
        return new ZodNumber(__assign(__assign({}, this._def), { checks: __spreadArray(__spreadArray([], __read(this._def.checks), false), [check], false) }));
    };
    ZodNumber.prototype.int = function (message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    };
    ZodNumber.prototype.positive = function (message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    };
    ZodNumber.prototype.negative = function (message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    };
    ZodNumber.prototype.nonpositive = function (message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    };
    ZodNumber.prototype.nonnegative = function (message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    };
    ZodNumber.prototype.multipleOf = function (value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    };
    Object.defineProperty(ZodNumber.prototype, "minValue", {
        get: function () {
            var e_3, _a;
            var min = null;
            try {
                for (var _b = __values(this._def.checks), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var ch = _c.value;
                    if (ch.kind === "min") {
                        if (min === null || ch.value > min)
                            min = ch.value;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return min;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodNumber.prototype, "maxValue", {
        get: function () {
            var e_4, _a;
            var max = null;
            try {
                for (var _b = __values(this._def.checks), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var ch = _c.value;
                    if (ch.kind === "max") {
                        if (max === null || ch.value < max)
                            max = ch.value;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return max;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodNumber.prototype, "isInt", {
        get: function () {
            return !!this._def.checks.find(function (ch) { return ch.kind === "int"; });
        },
        enumerable: false,
        configurable: true
    });
    ZodNumber.create = function (params) {
        return new ZodNumber(__assign({ checks: [], typeName: ZodFirstPartyTypeKind.ZodNumber }, processCreateParams(params)));
    };
    return ZodNumber;
}(ZodType));
var ZodBigInt = /** @class */ (function (_super) {
    __extends(ZodBigInt, _super);
    function ZodBigInt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodBigInt.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.bigint) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.bigint,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    ZodBigInt.create = function (params) {
        return new ZodBigInt(__assign({ typeName: ZodFirstPartyTypeKind.ZodBigInt }, processCreateParams(params)));
    };
    return ZodBigInt;
}(ZodType));
var ZodBoolean = /** @class */ (function (_super) {
    __extends(ZodBoolean, _super);
    function ZodBoolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodBoolean.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.boolean) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    ZodBoolean.create = function (params) {
        return new ZodBoolean(__assign({ typeName: ZodFirstPartyTypeKind.ZodBoolean }, processCreateParams(params)));
    };
    return ZodBoolean;
}(ZodType));
var ZodDate = /** @class */ (function (_super) {
    __extends(ZodDate, _super);
    function ZodDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodDate.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        if (ctx.parsedType !== ZodParsedType.date) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.date,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (isNaN(ctx.data.getTime())) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_date,
            });
            return INVALID;
        }
        return {
            status: status.value,
            value: new Date(ctx.data.getTime()),
        };
    };
    ZodDate.create = function (params) {
        return new ZodDate(__assign({ typeName: ZodFirstPartyTypeKind.ZodDate }, processCreateParams(params)));
    };
    return ZodDate;
}(ZodType));
var ZodUndefined = /** @class */ (function (_super) {
    __extends(ZodUndefined, _super);
    function ZodUndefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodUndefined.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.undefined) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    ZodUndefined.create = function (params) {
        return new ZodUndefined(__assign({ typeName: ZodFirstPartyTypeKind.ZodUndefined }, processCreateParams(params)));
    };
    return ZodUndefined;
}(ZodType));
var ZodNull = /** @class */ (function (_super) {
    __extends(ZodNull, _super);
    function ZodNull() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodNull.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.null) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.null,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    ZodNull.create = function (params) {
        return new ZodNull(__assign({ typeName: ZodFirstPartyTypeKind.ZodNull }, processCreateParams(params)));
    };
    return ZodNull;
}(ZodType));
var ZodAny = /** @class */ (function (_super) {
    __extends(ZodAny, _super);
    function ZodAny() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        _this._any = true;
        return _this;
    }
    ZodAny.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        return OK(ctx.data);
    };
    ZodAny.create = function (params) {
        return new ZodAny(__assign({ typeName: ZodFirstPartyTypeKind.ZodAny }, processCreateParams(params)));
    };
    return ZodAny;
}(ZodType));
var ZodUnknown = /** @class */ (function (_super) {
    __extends(ZodUnknown, _super);
    function ZodUnknown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // required
        _this._unknown = true;
        return _this;
    }
    ZodUnknown.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        return OK(ctx.data);
    };
    ZodUnknown.create = function (params) {
        return new ZodUnknown(__assign({ typeName: ZodFirstPartyTypeKind.ZodUnknown }, processCreateParams(params)));
    };
    return ZodUnknown;
}(ZodType));
var ZodNever = /** @class */ (function (_super) {
    __extends(ZodNever, _super);
    function ZodNever() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodNever.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.never,
            received: ctx.parsedType,
        });
        return INVALID;
    };
    ZodNever.create = function (params) {
        return new ZodNever(__assign({ typeName: ZodFirstPartyTypeKind.ZodNever }, processCreateParams(params)));
    };
    return ZodNever;
}(ZodType));
var ZodVoid = /** @class */ (function (_super) {
    __extends(ZodVoid, _super);
    function ZodVoid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodVoid.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.undefined) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.void,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    ZodVoid.create = function (params) {
        return new ZodVoid(__assign({ typeName: ZodFirstPartyTypeKind.ZodVoid }, processCreateParams(params)));
    };
    return ZodVoid;
}(ZodType));
var ZodArray = /** @class */ (function (_super) {
    __extends(ZodArray, _super);
    function ZodArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodArray.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        var def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.async) {
            return Promise.all(ctx.data.map(function (item, i) {
                return def.type._parseAsync({
                    parent: ctx,
                    path: __spreadArray(__spreadArray([], __read(ctx.path), false), [i], false),
                    data: item,
                });
            })).then(function (result) {
                return ParseStatus.mergeArray(status, result);
            });
        }
        var result = ctx.data.map(function (item, i) {
            return def.type._parseSync({
                parent: ctx,
                path: __spreadArray(__spreadArray([], __read(ctx.path), false), [i], false),
                data: item,
            });
        });
        return ParseStatus.mergeArray(status, result);
    };
    Object.defineProperty(ZodArray.prototype, "element", {
        get: function () {
            return this._def.type;
        },
        enumerable: false,
        configurable: true
    });
    ZodArray.prototype.min = function (minLength, message) {
        return new ZodArray(__assign(__assign({}, this._def), { minLength: { value: minLength, message: errorUtil.toString(message) } }));
    };
    ZodArray.prototype.max = function (maxLength, message) {
        return new ZodArray(__assign(__assign({}, this._def), { maxLength: { value: maxLength, message: errorUtil.toString(message) } }));
    };
    ZodArray.prototype.length = function (len, message) {
        return this.min(len, message).max(len, message);
    };
    ZodArray.prototype.nonempty = function (message) {
        return this.min(1, message);
    };
    ZodArray.create = function (schema, params) {
        return new ZodArray(__assign({ type: schema, minLength: null, maxLength: null, typeName: ZodFirstPartyTypeKind.ZodArray }, processCreateParams(params)));
    };
    return ZodArray;
}(ZodType));
/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodObject      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = function (first, second) {
        return __assign(__assign({}, first), second);
    };
})(objectUtil || (objectUtil = {}));
var AugmentFactory = function (def) {
    return function (augmentation) {
        return new ZodObject(__assign(__assign({}, def), { shape: function () { return (__assign(__assign({}, def.shape()), augmentation)); } }));
    };
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        var newShape_1 = {};
        for (var key in schema.shape) {
            var fieldSchema = schema.shape[key];
            newShape_1[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject(__assign(__assign({}, schema._def), { shape: function () { return newShape_1; } }));
    }
    else if (schema instanceof ZodArray) {
        return ZodArray.create(deepPartialify(schema.element));
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map(function (item) { return deepPartialify(item); }));
    }
    else {
        return schema;
    }
}
var ZodObject = /** @class */ (function (_super) {
    __extends(ZodObject, _super);
    function ZodObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        _this.nonstrict = _this.passthrough;
        _this.augment = AugmentFactory(_this._def);
        _this.extend = AugmentFactory(_this._def);
        return _this;
    }
    ZodObject.prototype._getCached = function () {
        if (this._cached !== null)
            return this._cached;
        var shape = this._def.shape();
        var keys = util.objectKeys(shape);
        return (this._cached = { shape: shape, keys: keys });
    };
    ZodObject.prototype._parse = function (input) {
        var e_5, _a, e_6, _b, e_7, _c;
        var _this = this;
        var _d = this._processInputParams(input), status = _d.status, ctx = _d.ctx;
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        var _e = this._getCached(), shape = _e.shape, shapeKeys = _e.keys;
        var dataKeys = util.objectKeys(ctx.data);
        var extraKeys = dataKeys.filter(function (k) { return !shapeKeys.includes(k); });
        var pairs = [];
        try {
            for (var shapeKeys_1 = __values(shapeKeys), shapeKeys_1_1 = shapeKeys_1.next(); !shapeKeys_1_1.done; shapeKeys_1_1 = shapeKeys_1.next()) {
                var key = shapeKeys_1_1.value;
                var keyValidator = shape[key];
                var value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: keyValidator._parse({
                        parent: ctx,
                        data: value,
                        path: __spreadArray(__spreadArray([], __read(ctx.path), false), [key], false),
                    }),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (shapeKeys_1_1 && !shapeKeys_1_1.done && (_a = shapeKeys_1.return)) _a.call(shapeKeys_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        if (this._def.catchall instanceof ZodNever) {
            var unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                try {
                    for (var extraKeys_1 = __values(extraKeys), extraKeys_1_1 = extraKeys_1.next(); !extraKeys_1_1.done; extraKeys_1_1 = extraKeys_1.next()) {
                        var key = extraKeys_1_1.value;
                        pairs.push({
                            key: { status: "valid", value: key },
                            value: { status: "valid", value: ctx.data[key] },
                        });
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (extraKeys_1_1 && !extraKeys_1_1.done && (_b = extraKeys_1.return)) _b.call(extraKeys_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") ;
            else {
                throw new Error("Internal ZodObject error: invalid unknownKeys value.");
            }
        }
        else {
            // run catchall validation
            var catchall = this._def.catchall;
            try {
                for (var extraKeys_2 = __values(extraKeys), extraKeys_2_1 = extraKeys_2.next(); !extraKeys_2_1.done; extraKeys_2_1 = extraKeys_2.next()) {
                    var key = extraKeys_2_1.value;
                    var value = ctx.data[key];
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: catchall._parse({ parent: ctx, path: __spreadArray(__spreadArray([], __read(ctx.path), false), [key], false), data: value } //, ctx.child(key), value, getParsedType(value)
                        ),
                        alwaysSet: key in ctx.data,
                    });
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (extraKeys_2_1 && !extraKeys_2_1.done && (_c = extraKeys_2.return)) _c.call(extraKeys_2);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        if (ctx.async) {
            return Promise.resolve()
                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                var syncPairs, pairs_1, pairs_1_1, pair, key, _a, _b, e_8_1;
                var e_8, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            syncPairs = [];
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 7, 8, 9]);
                            pairs_1 = __values(pairs), pairs_1_1 = pairs_1.next();
                            _e.label = 2;
                        case 2:
                            if (!!pairs_1_1.done) return [3 /*break*/, 6];
                            pair = pairs_1_1.value;
                            return [4 /*yield*/, pair.key];
                        case 3:
                            key = _e.sent();
                            _b = (_a = syncPairs).push;
                            _d = {
                                key: key
                            };
                            return [4 /*yield*/, pair.value];
                        case 4:
                            _b.apply(_a, [(_d.value = _e.sent(),
                                    _d.alwaysSet = pair.alwaysSet,
                                    _d)]);
                            _e.label = 5;
                        case 5:
                            pairs_1_1 = pairs_1.next();
                            return [3 /*break*/, 2];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_8_1 = _e.sent();
                            e_8 = { error: e_8_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (pairs_1_1 && !pairs_1_1.done && (_c = pairs_1.return)) _c.call(pairs_1);
                            }
                            finally { if (e_8) throw e_8.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/, syncPairs];
                    }
                });
            }); })
                .then(function (syncPairs) {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    };
    Object.defineProperty(ZodObject.prototype, "shape", {
        get: function () {
            return this._def.shape();
        },
        enumerable: false,
        configurable: true
    });
    ZodObject.prototype.strict = function (message) {
        var _this = this;
        errorUtil.errToObj;
        return new ZodObject(__assign(__assign(__assign({}, this._def), { unknownKeys: "strict" }), (message !== undefined
            ? {
                errorMap: function (issue, ctx) {
                    var _a, _b, _c, _d;
                    var defaultError = (_c = (_b = (_a = _this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                    if (issue.code === "unrecognized_keys")
                        return {
                            message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
                        };
                    return {
                        message: defaultError,
                    };
                },
            }
            : {})));
    };
    ZodObject.prototype.strip = function () {
        return new ZodObject(__assign(__assign({}, this._def), { unknownKeys: "strip" }));
    };
    ZodObject.prototype.passthrough = function () {
        return new ZodObject(__assign(__assign({}, this._def), { unknownKeys: "passthrough" }));
    };
    ZodObject.prototype.setKey = function (key, schema) {
        var _a;
        return this.augment((_a = {}, _a[key] = schema, _a));
    };
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    ZodObject.prototype.merge = function (merging) {
        var _this = this;
        // const mergedShape = objectUtil.mergeShapes(
        //   this._def.shape(),
        //   merging._def.shape()
        // );
        var merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: function () {
                return objectUtil.mergeShapes(_this._def.shape(), merging._def.shape());
            },
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    };
    ZodObject.prototype.catchall = function (index) {
        return new ZodObject(__assign(__assign({}, this._def), { catchall: index }));
    };
    ZodObject.prototype.pick = function (mask) {
        var _this = this;
        var shape = {};
        util.objectKeys(mask).map(function (key) {
            shape[key] = _this.shape[key];
        });
        return new ZodObject(__assign(__assign({}, this._def), { shape: function () { return shape; } }));
    };
    ZodObject.prototype.omit = function (mask) {
        var _this = this;
        var shape = {};
        util.objectKeys(this.shape).map(function (key) {
            if (util.objectKeys(mask).indexOf(key) === -1) {
                shape[key] = _this.shape[key];
            }
        });
        return new ZodObject(__assign(__assign({}, this._def), { shape: function () { return shape; } }));
    };
    ZodObject.prototype.deepPartial = function () {
        return deepPartialify(this);
    };
    ZodObject.prototype.partial = function (mask) {
        var _this = this;
        var newShape = {};
        if (mask) {
            util.objectKeys(this.shape).map(function (key) {
                if (util.objectKeys(mask).indexOf(key) === -1) {
                    newShape[key] = _this.shape[key];
                }
                else {
                    newShape[key] = _this.shape[key].optional();
                }
            });
            return new ZodObject(__assign(__assign({}, this._def), { shape: function () { return newShape; } }));
        }
        else {
            for (var key in this.shape) {
                var fieldSchema = this.shape[key];
                newShape[key] = fieldSchema.optional();
            }
        }
        return new ZodObject(__assign(__assign({}, this._def), { shape: function () { return newShape; } }));
    };
    ZodObject.prototype.required = function () {
        var newShape = {};
        for (var key in this.shape) {
            var fieldSchema = this.shape[key];
            var newField = fieldSchema;
            while (newField instanceof ZodOptional) {
                newField = newField._def.innerType;
            }
            newShape[key] = newField;
        }
        return new ZodObject(__assign(__assign({}, this._def), { shape: function () { return newShape; } }));
    };
    ZodObject.create = function (shape, params) {
        return new ZodObject(__assign({ shape: function () { return shape; }, unknownKeys: "strip", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject }, processCreateParams(params)));
    };
    ZodObject.strictCreate = function (shape, params) {
        return new ZodObject(__assign({ shape: function () { return shape; }, unknownKeys: "strict", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject }, processCreateParams(params)));
    };
    ZodObject.lazycreate = function (shape, params) {
        return new ZodObject(__assign({ shape: shape, unknownKeys: "strip", catchall: ZodNever.create(), typeName: ZodFirstPartyTypeKind.ZodObject }, processCreateParams(params)));
    };
    return ZodObject;
}(ZodType));
var ZodUnion = /** @class */ (function (_super) {
    __extends(ZodUnion, _super);
    function ZodUnion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodUnion.prototype._parse = function (input) {
        var _this = this;
        var ctx = this._processInputParams(input).ctx;
        var options = this._def.options;
        function handleResults(results) {
            var e_9, _a, e_10, _b, _c;
            try {
                // return first issue-free validation if it exists
                for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                    var result = results_1_1.value;
                    if (result.result.status === "valid") {
                        return result.result;
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
            try {
                for (var results_2 = __values(results), results_2_1 = results_2.next(); !results_2_1.done; results_2_1 = results_2.next()) {
                    var result = results_2_1.value;
                    if (result.result.status === "dirty") {
                        // add issues from dirty option
                        (_c = ctx.issues).push.apply(_c, __spreadArray([], __read(result.ctx.issues), false));
                        return result.result;
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (results_2_1 && !results_2_1.done && (_b = results_2.return)) _b.call(results_2);
                }
                finally { if (e_10) throw e_10.error; }
            }
            // return invalid
            var unionErrors = results.map(function (result) { return new ZodError(result.ctx.issues); });
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors: unionErrors,
            });
            return INVALID;
        }
        if (ctx.async) {
            return Promise.all(options.map(function (option) { return __awaiter(_this, void 0, void 0, function () {
                var childCtx;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            childCtx = __assign(__assign({}, ctx), { issues: [], parent: null });
                            _a = {};
                            return [4 /*yield*/, option._parseAsync({
                                    data: ctx.data,
                                    path: ctx.path,
                                    parent: childCtx,
                                })];
                        case 1: return [2 /*return*/, (_a.result = _b.sent(),
                                _a.ctx = childCtx,
                                _a)];
                    }
                });
            }); })).then(handleResults);
        }
        else {
            var optionResults = options.map(function (option) {
                var childCtx = __assign(__assign({}, ctx), { issues: [], parent: null });
                return {
                    result: option._parseSync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            });
            return handleResults(optionResults);
        }
    };
    Object.defineProperty(ZodUnion.prototype, "options", {
        get: function () {
            return this._def.options;
        },
        enumerable: false,
        configurable: true
    });
    ZodUnion.create = function (types, params) {
        return new ZodUnion(__assign({ options: types, typeName: ZodFirstPartyTypeKind.ZodUnion }, processCreateParams(params)));
    };
    return ZodUnion;
}(ZodType));
var ZodDiscriminatedUnion = /** @class */ (function (_super) {
    __extends(ZodDiscriminatedUnion, _super);
    function ZodDiscriminatedUnion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodDiscriminatedUnion.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        var discriminator = this.discriminator;
        var discriminatorValue = ctx.data[discriminator];
        var option = this.options.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union_discriminator,
                options: this.validDiscriminatorValues,
                path: [discriminator],
            });
            return INVALID;
        }
        if (ctx.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    };
    Object.defineProperty(ZodDiscriminatedUnion.prototype, "discriminator", {
        get: function () {
            return this._def.discriminator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodDiscriminatedUnion.prototype, "validDiscriminatorValues", {
        get: function () {
            return Array.from(this.options.keys());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodDiscriminatedUnion.prototype, "options", {
        get: function () {
            return this._def.options;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    ZodDiscriminatedUnion.create = function (discriminator, types, params) {
        // Get all the valid discriminator values
        var options = new Map();
        try {
            types.forEach(function (type) {
                var discriminatorValue = type.shape[discriminator].value;
                options.set(discriminatorValue, type);
            });
        }
        catch (e) {
            throw new Error("The discriminator value could not be extracted from all the provided schemas");
        }
        // Assert that all the discriminator values are unique
        if (options.size !== types.length) {
            throw new Error("Some of the discriminator values are not unique");
        }
        return new ZodDiscriminatedUnion(__assign({ typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion, discriminator: discriminator, options: options }, processCreateParams(params)));
    };
    return ZodDiscriminatedUnion;
}(ZodType));
function mergeValues(a, b) {
    var e_11, _a;
    var aType = getParsedType(a);
    var bType = getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
        var bKeys_1 = util.objectKeys(b);
        var sharedKeys = util
            .objectKeys(a)
            .filter(function (key) { return bKeys_1.indexOf(key) !== -1; });
        var newObj = __assign(__assign({}, a), b);
        try {
            for (var sharedKeys_1 = __values(sharedKeys), sharedKeys_1_1 = sharedKeys_1.next(); !sharedKeys_1_1.done; sharedKeys_1_1 = sharedKeys_1.next()) {
                var key = sharedKeys_1_1.value;
                var sharedValue = mergeValues(a[key], b[key]);
                if (!sharedValue.valid) {
                    return { valid: false };
                }
                newObj[key] = sharedValue.data;
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (sharedKeys_1_1 && !sharedKeys_1_1.done && (_a = sharedKeys_1.return)) _a.call(sharedKeys_1);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return { valid: true, data: newObj };
    }
    else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        var newArray = [];
        for (var index = 0; index < a.length; index++) {
            var itemA = a[index];
            var itemB = b[index];
            var sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === ZodParsedType.date &&
        bType === ZodParsedType.date &&
        +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
var ZodIntersection = /** @class */ (function (_super) {
    __extends(ZodIntersection, _super);
    function ZodIntersection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodIntersection.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        var handleParsed = function (parsedLeft, parsedRight) {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return INVALID;
            }
            var merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.invalid_intersection_types,
                });
                return INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(function (_a) {
                var _b = __read(_a, 2), left = _b[0], right = _b[1];
                return handleParsed(left, right);
            });
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    };
    ZodIntersection.create = function (left, right, params) {
        return new ZodIntersection(__assign({ left: left, right: right, typeName: ZodFirstPartyTypeKind.ZodIntersection }, processCreateParams(params)));
    };
    return ZodIntersection;
}(ZodType));
var ZodTuple = /** @class */ (function (_super) {
    __extends(ZodTuple, _super);
    function ZodTuple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodTuple.prototype._parse = function (input) {
        var _this = this;
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                type: "array",
            });
            return INVALID;
        }
        var rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                type: "array",
            });
            status.dirty();
        }
        var items = ctx.data
            .map(function (item, itemIndex) {
            var schema = _this._def.items[itemIndex] || _this._def.rest;
            if (!schema)
                return null;
            return schema._parse({
                data: item,
                path: __spreadArray(__spreadArray([], __read(ctx.path), false), [itemIndex], false),
                parent: ctx,
            });
        })
            .filter(function (x) { return !!x; }); // filter nulls
        if (ctx.async) {
            return Promise.all(items).then(function (results) {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    };
    Object.defineProperty(ZodTuple.prototype, "items", {
        get: function () {
            return this._def.items;
        },
        enumerable: false,
        configurable: true
    });
    ZodTuple.prototype.rest = function (rest) {
        return new ZodTuple(__assign(__assign({}, this._def), { rest: rest }));
    };
    ZodTuple.create = function (schemas, params) {
        return new ZodTuple(__assign({ items: schemas, typeName: ZodFirstPartyTypeKind.ZodTuple, rest: null }, processCreateParams(params)));
    };
    return ZodTuple;
}(ZodType));
var ZodRecord = /** @class */ (function (_super) {
    __extends(ZodRecord, _super);
    function ZodRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ZodRecord.prototype, "keySchema", {
        get: function () {
            return this._def.keyType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodRecord.prototype, "valueSchema", {
        get: function () {
            return this._def.valueType;
        },
        enumerable: false,
        configurable: true
    });
    ZodRecord.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        var pairs = [];
        var keyType = this._def.keyType;
        var valueType = this._def.valueType;
        for (var key in ctx.data) {
            pairs.push({
                key: keyType._parse({
                    data: key,
                    path: __spreadArray(__spreadArray([], __read(ctx.path), false), [key], false),
                    parent: ctx,
                }),
                value: valueType._parse({
                    data: ctx.data[key],
                    path: __spreadArray(__spreadArray([], __read(ctx.path), false), [key], false),
                    parent: ctx,
                }),
            });
        }
        if (ctx.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    };
    Object.defineProperty(ZodRecord.prototype, "element", {
        get: function () {
            return this._def.valueType;
        },
        enumerable: false,
        configurable: true
    });
    ZodRecord.create = function (first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord(__assign({ keyType: first, valueType: second, typeName: ZodFirstPartyTypeKind.ZodRecord }, processCreateParams(third)));
        }
        return new ZodRecord(__assign({ keyType: ZodString.create(), valueType: first, typeName: ZodFirstPartyTypeKind.ZodRecord }, processCreateParams(second)));
    };
    return ZodRecord;
}(ZodType));
var ZodMap = /** @class */ (function (_super) {
    __extends(ZodMap, _super);
    function ZodMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodMap.prototype._parse = function (input) {
        var e_12, _a;
        var _this = this;
        var _b = this._processInputParams(input), status = _b.status, ctx = _b.ctx;
        if (ctx.parsedType !== ZodParsedType.map) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.map,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        var keyType = this._def.keyType;
        var valueType = this._def.valueType;
        var pairs = __spreadArray([], __read(ctx.data.entries()), false).map(function (_a, index) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return {
                key: keyType._parse({
                    data: key,
                    path: __spreadArray(__spreadArray([], __read(ctx.path), false), [index, "key"], false),
                    parent: ctx,
                }),
                value: valueType._parse({
                    data: value,
                    path: __spreadArray(__spreadArray([], __read(ctx.path), false), [index, "value"], false),
                    parent: ctx,
                }),
            };
        });
        if (ctx.async) {
            var finalMap_1 = new Map();
            return Promise.resolve().then(function () { return __awaiter(_this, void 0, void 0, function () {
                var pairs_3, pairs_3_1, pair, key, value, e_13_1;
                var e_13, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, 7, 8]);
                            pairs_3 = __values(pairs), pairs_3_1 = pairs_3.next();
                            _b.label = 1;
                        case 1:
                            if (!!pairs_3_1.done) return [3 /*break*/, 5];
                            pair = pairs_3_1.value;
                            return [4 /*yield*/, pair.key];
                        case 2:
                            key = _b.sent();
                            return [4 /*yield*/, pair.value];
                        case 3:
                            value = _b.sent();
                            if (key.status === "aborted" || value.status === "aborted") {
                                return [2 /*return*/, INVALID];
                            }
                            if (key.status === "dirty" || value.status === "dirty") {
                                status.dirty();
                            }
                            finalMap_1.set(key.value, value.value);
                            _b.label = 4;
                        case 4:
                            pairs_3_1 = pairs_3.next();
                            return [3 /*break*/, 1];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_13_1 = _b.sent();
                            e_13 = { error: e_13_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (pairs_3_1 && !pairs_3_1.done && (_a = pairs_3.return)) _a.call(pairs_3);
                            }
                            finally { if (e_13) throw e_13.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/, { status: status.value, value: finalMap_1 }];
                    }
                });
            }); });
        }
        else {
            var finalMap = new Map();
            try {
                for (var pairs_2 = __values(pairs), pairs_2_1 = pairs_2.next(); !pairs_2_1.done; pairs_2_1 = pairs_2.next()) {
                    var pair = pairs_2_1.value;
                    var key = pair.key;
                    var value = pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (pairs_2_1 && !pairs_2_1.done && (_a = pairs_2.return)) _a.call(pairs_2);
                }
                finally { if (e_12) throw e_12.error; }
            }
            return { status: status.value, value: finalMap };
        }
    };
    ZodMap.create = function (keyType, valueType, params) {
        return new ZodMap(__assign({ valueType: valueType, keyType: keyType, typeName: ZodFirstPartyTypeKind.ZodMap }, processCreateParams(params)));
    };
    return ZodMap;
}(ZodType));
var ZodSet = /** @class */ (function (_super) {
    __extends(ZodSet, _super);
    function ZodSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodSet.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        if (ctx.parsedType !== ZodParsedType.set) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.set,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        var def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        var valueType = this._def.valueType;
        function finalizeSet(elements) {
            var e_14, _a;
            var parsedSet = new Set();
            try {
                for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                    var element = elements_1_1.value;
                    if (element.status === "aborted")
                        return INVALID;
                    if (element.status === "dirty")
                        status.dirty();
                    parsedSet.add(element.value);
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
                }
                finally { if (e_14) throw e_14.error; }
            }
            return { status: status.value, value: parsedSet };
        }
        var elements = __spreadArray([], __read(ctx.data.values()), false).map(function (item, i) {
            return valueType._parse({ data: item, path: __spreadArray(__spreadArray([], __read(ctx.path), false), [i], false), parent: ctx });
        });
        if (ctx.async) {
            return Promise.all(elements).then(function (elements) { return finalizeSet(elements); });
        }
        else {
            return finalizeSet(elements);
        }
    };
    ZodSet.prototype.min = function (minSize, message) {
        return new ZodSet(__assign(__assign({}, this._def), { minSize: { value: minSize, message: errorUtil.toString(message) } }));
    };
    ZodSet.prototype.max = function (maxSize, message) {
        return new ZodSet(__assign(__assign({}, this._def), { maxSize: { value: maxSize, message: errorUtil.toString(message) } }));
    };
    ZodSet.prototype.size = function (size, message) {
        return this.min(size, message).max(size, message);
    };
    ZodSet.prototype.nonempty = function (message) {
        return this.min(1, message);
    };
    ZodSet.create = function (valueType, params) {
        return new ZodSet(__assign({ valueType: valueType, minSize: null, maxSize: null, typeName: ZodFirstPartyTypeKind.ZodSet }, processCreateParams(params)));
    };
    return ZodSet;
}(ZodType));
var ZodFunction = /** @class */ (function (_super) {
    __extends(ZodFunction, _super);
    function ZodFunction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validate = _this.implement;
        return _this;
    }
    ZodFunction.prototype._parse = function (input) {
        var _this = this;
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.function) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.function,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.contextualErrorMap,
                    ctx.schemaErrorMap,
                    overrideErrorMap,
                    defaultErrorMap,
                ].filter(function (x) { return !!x; }),
                issueData: {
                    code: ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.contextualErrorMap,
                    ctx.schemaErrorMap,
                    overrideErrorMap,
                    defaultErrorMap,
                ].filter(function (x) { return !!x; }),
                issueData: {
                    code: ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        var params = { errorMap: ctx.contextualErrorMap };
        var fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            return OK(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var error, parsedArgs, result, parsedReturns;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                error = new ZodError([]);
                                return [4 /*yield*/, this._def.args
                                        .parseAsync(args, params)
                                        .catch(function (e) {
                                        error.addIssue(makeArgsIssue(args, e));
                                        throw error;
                                    })];
                            case 1:
                                parsedArgs = _a.sent();
                                return [4 /*yield*/, fn.apply(void 0, __spreadArray([], __read(parsedArgs), false))];
                            case 2:
                                result = _a.sent();
                                return [4 /*yield*/, this._def.returns._def.type
                                        .parseAsync(result, params)
                                        .catch(function (e) {
                                        error.addIssue(makeReturnsIssue(result, e));
                                        throw error;
                                    })];
                            case 3:
                                parsedReturns = _a.sent();
                                return [2 /*return*/, parsedReturns];
                        }
                    });
                });
            });
        }
        else {
            return OK(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var parsedArgs = _this._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                var result = fn.apply(void 0, __spreadArray([], __read(parsedArgs.data), false));
                var parsedReturns = _this._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    };
    ZodFunction.prototype.parameters = function () {
        return this._def.args;
    };
    ZodFunction.prototype.returnType = function () {
        return this._def.returns;
    };
    ZodFunction.prototype.args = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return new ZodFunction(__assign(__assign({}, this._def), { args: ZodTuple.create(items).rest(ZodUnknown.create()) }));
    };
    ZodFunction.prototype.returns = function (returnType) {
        return new ZodFunction(__assign(__assign({}, this._def), { returns: returnType }));
    };
    ZodFunction.prototype.implement = function (func) {
        var validatedFunc = this.parse(func);
        return validatedFunc;
    };
    ZodFunction.prototype.strictImplement = function (func) {
        var validatedFunc = this.parse(func);
        return validatedFunc;
    };
    ZodFunction.create = function (args, returns, params) {
        return new ZodFunction(__assign({ args: (args
                ? args.rest(ZodUnknown.create())
                : ZodTuple.create([]).rest(ZodUnknown.create())), returns: returns || ZodUnknown.create(), typeName: ZodFirstPartyTypeKind.ZodFunction }, processCreateParams(params)));
    };
    return ZodFunction;
}(ZodType));
var ZodLazy = /** @class */ (function (_super) {
    __extends(ZodLazy, _super);
    function ZodLazy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ZodLazy.prototype, "schema", {
        get: function () {
            return this._def.getter();
        },
        enumerable: false,
        configurable: true
    });
    ZodLazy.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        var lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    };
    ZodLazy.create = function (getter, params) {
        return new ZodLazy(__assign({ getter: getter, typeName: ZodFirstPartyTypeKind.ZodLazy }, processCreateParams(params)));
    };
    return ZodLazy;
}(ZodType));
var ZodLiteral = /** @class */ (function (_super) {
    __extends(ZodLiteral, _super);
    function ZodLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodLiteral.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        if (ctx.data !== this._def.value) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: getParsedType(this._def.value),
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: status.value, value: ctx.data };
    };
    Object.defineProperty(ZodLiteral.prototype, "value", {
        get: function () {
            return this._def.value;
        },
        enumerable: false,
        configurable: true
    });
    ZodLiteral.create = function (value, params) {
        return new ZodLiteral(__assign({ value: value, typeName: ZodFirstPartyTypeKind.ZodLiteral }, processCreateParams(params)));
    };
    return ZodLiteral;
}(ZodType));
function createZodEnum(values) {
    return new ZodEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
    });
}
var ZodEnum = /** @class */ (function (_super) {
    __extends(ZodEnum, _super);
    function ZodEnum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodEnum.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (this._def.values.indexOf(ctx.data) === -1) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_enum_value,
                options: this._def.values,
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    Object.defineProperty(ZodEnum.prototype, "options", {
        get: function () {
            return this._def.values;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodEnum.prototype, "enum", {
        get: function () {
            var e_15, _a;
            var enumValues = {};
            try {
                for (var _b = __values(this._def.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var val = _c.value;
                    enumValues[val] = val;
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return enumValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodEnum.prototype, "Values", {
        get: function () {
            var e_16, _a;
            var enumValues = {};
            try {
                for (var _b = __values(this._def.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var val = _c.value;
                    enumValues[val] = val;
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_16) throw e_16.error; }
            }
            return enumValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZodEnum.prototype, "Enum", {
        get: function () {
            var e_17, _a;
            var enumValues = {};
            try {
                for (var _b = __values(this._def.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var val = _c.value;
                    enumValues[val] = val;
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_17) throw e_17.error; }
            }
            return enumValues;
        },
        enumerable: false,
        configurable: true
    });
    ZodEnum.create = createZodEnum;
    return ZodEnum;
}(ZodType));
var ZodNativeEnum = /** @class */ (function (_super) {
    __extends(ZodNativeEnum, _super);
    function ZodNativeEnum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodNativeEnum.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        var nativeEnumValues = util.getValidEnumValues(this._def.values);
        if (nativeEnumValues.indexOf(ctx.data) === -1) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_enum_value,
                options: util.objectValues(nativeEnumValues),
            });
            return INVALID;
        }
        return OK(ctx.data);
    };
    Object.defineProperty(ZodNativeEnum.prototype, "enum", {
        get: function () {
            return this._def.values;
        },
        enumerable: false,
        configurable: true
    });
    ZodNativeEnum.create = function (values, params) {
        return new ZodNativeEnum(__assign({ values: values, typeName: ZodFirstPartyTypeKind.ZodNativeEnum }, processCreateParams(params)));
    };
    return ZodNativeEnum;
}(ZodType));
var ZodPromise = /** @class */ (function (_super) {
    __extends(ZodPromise, _super);
    function ZodPromise() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodPromise.prototype._parse = function (input) {
        var _this = this;
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType !== ZodParsedType.promise && ctx.async === false) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        var promisified = ctx.parsedType === ZodParsedType.promise
            ? ctx.data
            : Promise.resolve(ctx.data);
        return OK(promisified.then(function (data) {
            return _this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.contextualErrorMap,
            });
        }));
    };
    ZodPromise.create = function (schema, params) {
        return new ZodPromise(__assign({ type: schema, typeName: ZodFirstPartyTypeKind.ZodPromise }, processCreateParams(params)));
    };
    return ZodPromise;
}(ZodType));
var ZodEffects = /** @class */ (function (_super) {
    __extends(ZodEffects, _super);
    function ZodEffects() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodEffects.prototype.innerType = function () {
        return this._def.schema;
    };
    ZodEffects.prototype._parse = function (input) {
        var _this = this;
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        var effect = this._def.effect || null;
        if (effect.type === "preprocess") {
            var processed = effect.transform(ctx.data);
            if (ctx.async) {
                return Promise.resolve(processed).then(function (processed) {
                    return _this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                });
            }
            else {
                return this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
        if (effect.type === "refinement") {
            var checkCtx_1 = {
                addIssue: function (arg) {
                    addIssueToContext(ctx, arg);
                    if (arg.fatal) {
                        status.abort();
                    }
                    else {
                        status.dirty();
                    }
                },
                get path() {
                    return ctx.path;
                },
            };
            checkCtx_1.addIssue = checkCtx_1.addIssue.bind(checkCtx_1);
            var executeRefinement_1 = function (acc
            // effect: RefinementEffect<any>
            ) {
                var result = effect.refinement(acc, checkCtx_1);
                if (ctx.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.async === false) {
                var inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement_1(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then(function (inner) {
                    if (inner.status === "aborted")
                        return INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement_1(inner.value).then(function () {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.async === false) {
                var base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                // if (base.status === "aborted") return INVALID;
                // if (base.status === "dirty") {
                //   return { status: "dirty", value: base.value };
                // }
                if (!isValid(base))
                    return base;
                var result = effect.transform(base.value);
                if (result instanceof Promise) {
                    throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return OK(result);
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then(function (base) {
                    if (!isValid(base))
                        return base;
                    // if (base.status === "aborted") return INVALID;
                    // if (base.status === "dirty") {
                    //   return { status: "dirty", value: base.value };
                    // }
                    return Promise.resolve(effect.transform(base.value)).then(OK);
                });
            }
        }
        util.assertNever(effect);
    };
    ZodEffects.create = function (schema, effect, params) {
        return new ZodEffects(__assign({ schema: schema, typeName: ZodFirstPartyTypeKind.ZodEffects, effect: effect }, processCreateParams(params)));
    };
    ZodEffects.createWithPreprocess = function (preprocess, schema, params) {
        return new ZodEffects(__assign({ schema: schema, effect: { type: "preprocess", transform: preprocess }, typeName: ZodFirstPartyTypeKind.ZodEffects }, processCreateParams(params)));
    };
    return ZodEffects;
}(ZodType));
var ZodOptional = /** @class */ (function (_super) {
    __extends(ZodOptional, _super);
    function ZodOptional() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodOptional.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType === ZodParsedType.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse({
            data: ctx.data,
            path: ctx.path,
            parent: ctx,
        });
    };
    ZodOptional.prototype.unwrap = function () {
        return this._def.innerType;
    };
    ZodOptional.create = function (type, params) {
        return new ZodOptional(__assign({ innerType: type, typeName: ZodFirstPartyTypeKind.ZodOptional }, processCreateParams(params)));
    };
    return ZodOptional;
}(ZodType));
var ZodNullable = /** @class */ (function (_super) {
    __extends(ZodNullable, _super);
    function ZodNullable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodNullable.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        if (ctx.parsedType === ZodParsedType.null) {
            return OK(null);
        }
        return this._def.innerType._parse({
            data: ctx.data,
            path: ctx.path,
            parent: ctx,
        });
    };
    ZodNullable.prototype.unwrap = function () {
        return this._def.innerType;
    };
    ZodNullable.create = function (type, params) {
        return new ZodNullable(__assign({ innerType: type, typeName: ZodFirstPartyTypeKind.ZodNullable }, processCreateParams(params)));
    };
    return ZodNullable;
}(ZodType));
var ZodDefault = /** @class */ (function (_super) {
    __extends(ZodDefault, _super);
    function ZodDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodDefault.prototype._parse = function (input) {
        var ctx = this._processInputParams(input).ctx;
        var data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data: data,
            path: ctx.path,
            parent: ctx,
        });
    };
    ZodDefault.prototype.removeDefault = function () {
        return this._def.innerType;
    };
    ZodDefault.create = function (type, params) {
        return new ZodOptional(__assign({ innerType: type, typeName: ZodFirstPartyTypeKind.ZodOptional }, processCreateParams(params)));
    };
    return ZodDefault;
}(ZodType));
var ZodNaN = /** @class */ (function (_super) {
    __extends(ZodNaN, _super);
    function ZodNaN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodNaN.prototype._parse = function (input) {
        var _a = this._processInputParams(input), status = _a.status, ctx = _a.ctx;
        if (ctx.parsedType !== ZodParsedType.nan) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: status.value, value: ctx.data };
    };
    ZodNaN.create = function (params) {
        return new ZodNaN(__assign({ typeName: ZodFirstPartyTypeKind.ZodNaN }, processCreateParams(params)));
    };
    return ZodNaN;
}(ZodType));
var custom = function (check, params) {
    if (check)
        return ZodAny.create().refine(check, params);
    return ZodAny.create();
};
var late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = function (cls, params) {
    if (params === void 0) { params = {
        message: "Input not instance of ".concat(cls.name),
    }; }
    return custom(function (data) { return data instanceof cls; }, params);
};
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var ostring = function () { return stringType().optional(); };
var onumber = function () { return numberType().optional(); };
var oboolean = function () { return booleanType().optional(); };

var mod = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ZodParsedType: ZodParsedType,
    getParsedType: getParsedType,
    makeIssue: makeIssue,
    EMPTY_PATH: EMPTY_PATH,
    addIssueToContext: addIssueToContext,
    ParseStatus: ParseStatus,
    INVALID: INVALID,
    DIRTY: DIRTY,
    OK: OK,
    isAborted: isAborted,
    isDirty: isDirty,
    isValid: isValid,
    isAsync: isAsync,
    ZodType: ZodType,
    ZodString: ZodString,
    ZodNumber: ZodNumber,
    ZodBigInt: ZodBigInt,
    ZodBoolean: ZodBoolean,
    ZodDate: ZodDate,
    ZodUndefined: ZodUndefined,
    ZodNull: ZodNull,
    ZodAny: ZodAny,
    ZodUnknown: ZodUnknown,
    ZodNever: ZodNever,
    ZodVoid: ZodVoid,
    ZodArray: ZodArray,
    get objectUtil () { return objectUtil; },
    ZodObject: ZodObject,
    ZodUnion: ZodUnion,
    ZodDiscriminatedUnion: ZodDiscriminatedUnion,
    ZodIntersection: ZodIntersection,
    ZodTuple: ZodTuple,
    ZodRecord: ZodRecord,
    ZodMap: ZodMap,
    ZodSet: ZodSet,
    ZodFunction: ZodFunction,
    ZodLazy: ZodLazy,
    ZodLiteral: ZodLiteral,
    ZodEnum: ZodEnum,
    ZodNativeEnum: ZodNativeEnum,
    ZodPromise: ZodPromise,
    ZodEffects: ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional: ZodOptional,
    ZodNullable: ZodNullable,
    ZodDefault: ZodDefault,
    ZodNaN: ZodNaN,
    custom: custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late: late,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    'enum': enumType,
    'function': functionType,
    'instanceof': instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    'null': nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean: oboolean,
    onumber: onumber,
    optional: optionalType,
    ostring: ostring,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    transformer: effectsType,
    tuple: tupleType,
    'undefined': undefinedType,
    union: unionType,
    unknown: unknownType,
    'void': voidType,
    ZodIssueCode: ZodIssueCode,
    quotelessJson: quotelessJson,
    ZodError: ZodError,
    defaultErrorMap: defaultErrorMap,
    get overrideErrorMap () { return overrideErrorMap; },
    setErrorMap: setErrorMap
});




/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shapeSchema": () => (/* binding */ shapeSchema),
/* harmony export */   "getShape": () => (/* binding */ getShape),
/* harmony export */   "putShape": () => (/* binding */ putShape),
/* harmony export */   "deleteShape": () => (/* binding */ deleteShape),
/* harmony export */   "moveShape": () => (/* binding */ moveShape),
/* harmony export */   "resizeShape": () => (/* binding */ resizeShape),
/* harmony export */   "rotateShape": () => (/* binding */ rotateShape),
/* harmony export */   "initShapes": () => (/* binding */ initShapes),
/* harmony export */   "shapePrefix": () => (/* binding */ shapePrefix),
/* harmony export */   "randomShape": () => (/* binding */ randomShape)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _util_rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);



const shapeSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
  type: zod__WEBPACK_IMPORTED_MODULE_1__.z.literal("rect"),
  x: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  y: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  width: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  height: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  rotate: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  fill: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
});
async function getShape(tx, id) {
  const jv = await tx.get(key(id));

  if (!jv) {
    console.log(`Specified shape ${id} not found.`);
    return null;
  }

  return shapeSchema.parse(jv);
}
function putShape(tx, {
  id,
  shape
}) {
  return tx.put(key(id), shape);
}
async function deleteShape(tx, id) {
  await tx.del(key(id));
}
async function moveShape(tx, {
  id,
  dx,
  dy
}) {
  const shape = await getShape(tx, id);

  if (shape) {
    shape.x += dx;
    shape.y += dy;
    await putShape(tx, {
      id,
      shape
    });
  }
}
async function resizeShape(tx, {
  id,
  ds
}) {
  const shape = await getShape(tx, id);

  if (shape) {
    const minSize = 10;
    const dw = Math.max(minSize - shape.width, ds);
    const dh = Math.max(minSize - shape.height, ds);
    shape.width += dw;
    shape.height += dh;
    shape.x -= dw / 2;
    shape.y -= dh / 2;
    await putShape(tx, {
      id,
      shape
    });
  }
}
async function rotateShape(tx, {
  id,
  ddeg
}) {
  const shape = await getShape(tx, id);

  if (shape) {
    shape.rotate += ddeg;
    await putShape(tx, {
      id,
      shape
    });
  }
}
async function initShapes(tx, shapes) {
  if (await tx.has("initialized")) {
    return;
  }

  await Promise.all([tx.put("initialized", true), ...shapes.map(s => putShape(tx, s))]);
}

function key(id) {
  return `${shapePrefix}${id}`;
}

const shapePrefix = "shape-";
const colors = ["red", "blue", "white", "green", "yellow"];
let nextColor = 0;
function randomShape() {
  const s = (0,_util_rand__WEBPACK_IMPORTED_MODULE_0__.randInt)(100, 400);
  const fill = colors[nextColor++];

  if (nextColor == colors.length) {
    nextColor = 0;
  }

  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
    shape: {
      type: "rect",
      x: (0,_util_rand__WEBPACK_IMPORTED_MODULE_0__.randInt)(0, 400),
      y: (0,_util_rand__WEBPACK_IMPORTED_MODULE_0__.randInt)(0, 400),
      width: s,
      height: s,
      rotate: (0,_util_rand__WEBPACK_IMPORTED_MODULE_0__.randInt)(0, 359),
      fill
    }
  };
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


let random = bytes => crypto.getRandomValues(new Uint8Array(bytes));

let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = '';

    while (true) {
      let bytes = getRandom(step);
      let j = step;

      while (j--) {
        id += alphabet[bytes[j] & mask] || '';
        if (id.length === size) return id;
      }
    }
  };
};

let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);

let nanoid = (size = 21) => {
  let id = '';
  let bytes = crypto.getRandomValues(new Uint8Array(size));

  while (size--) {
    let byte = bytes[size] & 63;

    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }

  return id;
};



/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "itemSchema": () => (/* binding */ itemSchema),
/* harmony export */   "getItem": () => (/* binding */ getItem),
/* harmony export */   "putItem": () => (/* binding */ putItem),
/* harmony export */   "deleteItem": () => (/* binding */ deleteItem),
/* harmony export */   "updateItemCreatedBy": () => (/* binding */ updateItemCreatedBy),
/* harmony export */   "updateItemWebSourceURL": () => (/* binding */ updateItemWebSourceURL),
/* harmony export */   "updateItemPublicationDate": () => (/* binding */ updateItemPublicationDate),
/* harmony export */   "updateItemTitle": () => (/* binding */ updateItemTitle),
/* harmony export */   "updateItemContent": () => (/* binding */ updateItemContent),
/* harmony export */   "updateItemArrows": () => (/* binding */ updateItemArrows),
/* harmony export */   "updateItemAddSingleArrow": () => (/* binding */ updateItemAddSingleArrow),
/* harmony export */   "updateItemArrowsDeleteArrow": () => (/* binding */ updateItemArrowsDeleteArrow),
/* harmony export */   "updateItemSourceURL": () => (/* binding */ updateItemSourceURL),
/* harmony export */   "itemPrefix": () => (/* binding */ itemPrefix),
/* harmony export */   "randomItem": () => (/* binding */ randomItem)
/* harmony export */ });
/* harmony import */ var _Users_dluan_Code_jelly_trunk_mini_node_modules_next_dist_compiled_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_Users_dluan_Code_jelly_trunk_mini_node_modules_next_dist_compiled_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



const itemSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
  type: zod__WEBPACK_IMPORTED_MODULE_1__.z.literal(`item`),
  createdAt: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  createdBy: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  title: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  content: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  arrows: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  highlight: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  sourceURL: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  webSourceURL: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  publicationDate: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  updatedAt: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
});
async function getItem(tx, id) {
  const jv = await tx.get(key(id));

  if (!jv) {
    console.log(`Specified item ${id} not found.`);
    return null;
  }

  let changes = {
    webSourceURL: '',
    publicationDate: '',
    updatedAt: new Date().toISOString()
  };

  if (jv.hasOwnProperty('webSourceURL')) {
    const thing = jv;
    changes.webSourceURL = thing.webSourceURL;
  }

  if (jv.hasOwnProperty('publicationDate')) {
    const thing = jv;
    changes.publicationDate = thing.publicationDate;
  }

  if (jv.hasOwnProperty('updatedAt')) {
    const thing = jv;
    changes.updatedAt = thing.updatedAt;
  }

  const thing = jv;
  return itemSchema.parse(_objectSpread(_objectSpread({}, thing), changes));
}
function putItem(tx, {
  id,
  item
}) {
  return tx.put(key(id), item);
}
async function deleteItem(tx, id) {
  await tx.del(key(id));
}
async function updateItemCreatedBy(tx, {
  id,
  createdBy
}) {
  const item = await getItem(tx, id);
  const changes = {
    createdBy: createdBy,
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}
async function updateItemWebSourceURL(tx, {
  id,
  webSourceURL
}) {
  const item = await getItem(tx, id);
  const changes = {
    webSourceURL: webSourceURL,
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}
async function updateItemPublicationDate(tx, {
  id,
  publicationDate
}) {
  const item = await getItem(tx, id);
  const changes = {
    publicationDate: publicationDate,
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}
async function updateItemTitle(tx, {
  id,
  title
}) {
  const item = await getItem(tx, id);
  const changes = {
    title: title,
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}
async function updateItemContent(tx, {
  id,
  content
}) {
  const item = await getItem(tx, id);
  const changes = {
    content: content,
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}
async function updateItemArrows(tx, {
  id,
  arrows
}) {
  const item = await getItem(tx, id);
  const changes = {
    arrows: JSON.stringify(arrows),
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}
async function updateItemAddSingleArrow(tx, {
  id,
  arrow
}) {
  const item = await getItem(tx, id);
  let arrows = item ? JSON.parse(item.arrows) : [];
  arrows.push(arrow);
  const stringifiedArrows = JSON.stringify(arrows);
  const changes = {
    arrows: stringifiedArrows,
    updatedAt: new Date().toISOString()
  };

  const changedItem = _objectSpread(_objectSpread({}, item), changes);

  return tx.put(key(id), changedItem);
}
async function updateItemArrowsDeleteArrow(tx, {
  itemID,
  arrowID
}) {
  const item = await getItem(tx, itemID);
  let arrows = item ? JSON.parse(item.arrows) : [];
  arrows = arrows.filter(arrow => arrow.arrowID !== arrowID);
  const stringifiedArrows = JSON.stringify(arrows);
  const changes = {
    arrows: stringifiedArrows,
    updatedAt: new Date().toISOString()
  };

  const changedItem = _objectSpread(_objectSpread({}, item), changes);

  return tx.put(key(itemID), changedItem);
}
async function updateItemSourceURL(tx, {
  id,
  sourceURL
}) {
  const item = await getItem(tx, id);
  const changes = {
    sourceURL: sourceURL,
    updatedAt: new Date().toISOString()
  };
  return tx.put(key(id), _objectSpread(_objectSpread({}, item), changes));
}

function key(id) {
  return `${itemPrefix}${id}`;
}

const itemPrefix = "item-";
function randomItem() {
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
    item: {
      type: 'item',
      createdAt: new Date().toISOString(),
      createdBy: '',
      title: 'Untitled',
      content: '',
      arrows: '[]',
      // {arrowID, to, from, kind, backItemID}
      highlight: '',
      sourceURL: '',
      webSourceURL: '',
      publicationDate: '',
      updatedAt: new Date().toISOString()
    }
  };
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrowSchema": () => (/* binding */ arrowSchema),
/* harmony export */   "getArrow": () => (/* binding */ getArrow),
/* harmony export */   "putArrow": () => (/* binding */ putArrow),
/* harmony export */   "deleteArrow": () => (/* binding */ deleteArrow),
/* harmony export */   "updateArrowCreatedBy": () => (/* binding */ updateArrowCreatedBy),
/* harmony export */   "arrowPrefix": () => (/* binding */ arrowPrefix),
/* harmony export */   "randomArrow": () => (/* binding */ randomArrow)
/* harmony export */ });
/* harmony import */ var _Users_dluan_Code_jelly_trunk_mini_node_modules_next_dist_compiled_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_Users_dluan_Code_jelly_trunk_mini_node_modules_next_dist_compiled_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



const arrowSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
  type: zod__WEBPACK_IMPORTED_MODULE_1__.z.literal(`arrow`),
  createdAt: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  createdBy: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  frontItemID: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  backItemID: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  content: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  highlight: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  official: zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean(),
  to: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  from: zod__WEBPACK_IMPORTED_MODULE_1__.z.number(),
  parentItemID: zod__WEBPACK_IMPORTED_MODULE_1__.z.string(),
  kind: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
});
async function getArrow(tx, id) {
  const jv = await tx.get(key(id));

  if (!jv) {
    console.log(`Specified arrow ${id} not found.`);
    return null;
  }

  return arrowSchema.parse(jv);
}
function putArrow(tx, {
  id,
  arrow
}) {
  return tx.put(key(id), arrow);
}
async function deleteArrow(tx, id) {
  await tx.del(key(id));
}
async function updateArrowCreatedBy(tx, {
  id,
  createdBy
}) {
  const arrow = await getArrow(tx, id);
  return tx.put(key(id), _objectSpread(_objectSpread({}, arrow), {}, {
    createdBy: createdBy
  }));
}

function key(id) {
  return `${arrowPrefix}${id}`;
}

const arrowPrefix = "arrow-";
function randomArrow() {
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
    arrow: {
      type: "arrow",
      createdAt: new Date().toISOString(),
      createdBy: '',
      frontItemID: '',
      backItemID: '',
      content: '<p></p>',
      highlight: '<p></p>',
      official: false,
      to: 0,
      from: 0,
      parentItemID: '',
      kind: '' // comment, sub, author, reference, footnote

    }
  };
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ reps_do__WEBPACK_IMPORTED_MODULE_0__.worker),
/* harmony export */   "Server": () => (/* binding */ Server)
/* harmony export */ });
/* harmony import */ var reps_do__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_datamodel_mutators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



class Server extends reps_do__WEBPACK_IMPORTED_MODULE_0__.Server {
  constructor(state) {
    super(_src_datamodel_mutators__WEBPACK_IMPORTED_MODULE_1__.mutators, state);
  }

}
})();

/******/ })()
;