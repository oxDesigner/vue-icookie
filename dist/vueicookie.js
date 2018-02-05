! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.vueIcookie = t() : e.vueIcookie = t()
}("undefined" != typeof self ? self : this, function() {
    return function(e) {
        function t(r) {
            if (o[r]) return o[r].exports;
            var n = o[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports
        }
        var o = {};
        return t.m = e, t.c = o, t.d = function(e, o, r) {
            t.o(e, o) || Object.defineProperty(e, o, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function(e) {
            var o = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(o, "a", o), o
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "/dist/", t(t.s = 0)
    }([function(e, t, o) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = o(1),
            n = o.n(r),
            i = {
                install: function(e, t) {
                    e.iCookie = e.prototype.$iCookie = n.a
                }
            };
        "undefined" != typeof window && window.Vue && window.Vue.use(i), t.default = i
    }, function(e, t, o) {
        ! function(t) {
            e.exports = t()
        }(function() {
            function e() {}

            function t(e) {
                return p.call(e)
            }

            function o(e, t) {
                return "object" == typeof t && (t = JSON.stringify(t)), e + "=" + escape(t)
            }

            function r(e) {
                var t = [];
                for (var o in e) {
                    var r = e[o];
                    "expires" === o && (r = i(e[o])), t.push(o + "=" + r)
                }
                return t.join(";")
            }

            function n() {
                if (a !== document.cookie && (a = document.cookie, c = {}, a)) {
                    a.split("; ").forEach(function(e) {
                        var t = e.split("=");
                        c[t[0]] = unescape(t[1])
                    })
                }
                return c
            }

            function i(e) {
                var t = new Date;
                if (!/^\d+$|^(\d+)([a-z])$/.test(e)) throw new Error("过期时间必须为数字或字符串：1y：1年、2m：2月、3d&3：3天、4h：4小时， 看文档" + u);
                if ("number" == typeof e) t.setDate(t.getDate() + e);
                else {
                    var o = Number(RegExp.$1);
                    switch (RegExp.$2) {
                        case "y":
                            t.setFullYear(t.getFullYear() + o);
                            break;
                        case "m":
                            t.setMonth(t.getMonth() + o);
                            break;
                        case "d":
                            t.setDate(t.getDate() + o);
                            break;
                        case "h":
                            t.setHours(t.getHours() + o)
                    }
                }
                return t.toUTCString()
            }

            function f(t, o, r) {
                if (null == e.get(o)) throw new Error("iCookie.remove: 删除失败，看文档 " + u);
                r ? r.expires = -1 : r = -1, e.set(o, "", r)
            }
            var u = "https://github.com/oxDesigner/iCookie/blob/master/README.md",
                c = {},
                s = {
                    path: "/"
                },
                a = "",
                p = {}.toString;
            return e.extend = function() {
                var e, t, o, r = {},
                    n = 0,
                    i = arguments.length;
                for (1 === i && (r = this); n < i; n++)
                    if (null != (e = arguments[n]))
                        for (t in e) o = e[t], r !== o && void 0 !== o && (r[t] = o);
                return r
            }, e.extend({
                set: function() {
                    var n, i, f, c, a, p = arguments,
                        l = [],
                        h = e.configObj || {};
                    if (0 === p.length) throw new Error("iCookie.set: 你参数没写，看文档 " + u);
                    if (1 === p.length) {
                        if (n = p[0], "[object Object]" !== t(n)) throw new Error("iCookie.set: 一个参数必须为json， 看文档 " + u);
                        c = r(e.extend(s, h));
                        for (a in n) l.push(o(a, n[a]) + ";" + c)
                    }
                    if (2 === p.length)
                        if (n = p[0], i = p[1], "string" == typeof n) c = r(e.extend(s, h)), l.push(o(n, i) + ";" + c);
                        else {
                            if ("[object Object]" !== t(n) || "[object Object]" !== t(i)) throw new Error("iCookie.set: 你参数写错了， 看文档 " + u);
                            c = r(e.extend(s, h, i));
                            for (a in n) l.push(o(a, n[a]) + ";" + c)
                        }
                    if (3 === p.length) {
                        if (n = p[0], i = p[1], f = p[2], "string" != typeof n) throw new Error("iCookie.set: 你参数写错了， 看文档 " + u);
                        var g = t(f);
                        "[object Number]" === g ? (c = r(e.extend(s, h, {
                            expires: f
                        })), l.push(o(n, i) + ";" + c)) : "[object Object]" === g && (c = r(e.extend(s, h, f)), l.push(o(n, i) + ";" + c))
                    }
                    if (p.length > 3) throw new Error("iCookie.set: 你参数写错了， 看文档 " + u);
                    return l.forEach(function(e) {
                        document.cookie = e
                    }), l
                },
                get: function() {
                    var e, o = arguments;
                    if (0 === o.length) return n();
                    if (1 === o.length) {
                        e = o[0];
                        var r = n();
                        if ("string" == typeof e) return r[e];
                        if ("[object Array]" === t(e)) {
                            var i = {};
                            return e.forEach(function(e) {
                                i[e] = r[e]
                            }), i
                        }
                        throw new Error("iCookie.get: 你参数写错了， 看文档 " + u)
                    }
                    if (o.length > 1) throw new Error("iCookie.get: 你参数写错了， 看文档 " + u)
                },
                remove: function() {
                    var o, r, n = arguments;
                    if (0 === n.length) throw new Error("iCookie.remove: 你参数写错了， 看文档 " + u);
                    if (1 === n.length && (o = n[0], "string" == typeof arg && f(e, o)), 2 === n.length && (o = n[0], r = n[1], "string" == typeof o && "[object Object]" === t(r) && f(e, o, r)), n.length > 2) throw new Error("iCookie.remove: 你参数写错了， 看文档 " + u)
                },
                config: function(t) {
                    e.configObj = t
                }
            }), e
        })
    }])
});