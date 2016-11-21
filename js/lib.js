function Passage(e, t, n, r) {
    this.id = e, this.name = t, this.tags = n, this.source = _.unescape(r)
}

function Story(e) {
    this.el = e, this.name = e.attr("name"), this.startPassage = parseInt(e.attr("startnode")), this.creator = e.attr("creator"), this.creatorVersion = e.attr("creator-version"), this.history = [], this.state = {}, this.checkpointName = "", this.ignoreErrors = !1, this.errorMessage = "⚠ %s", this.atCheckpoint = !1, this.passages = [];
    var t = this.passages;
    e.children("tw-passagedata").each(function(e) {
        var n = $(this),
            r = parseInt(n.attr("pid")),
            i = n.attr("tags");
        t[r] = new Passage(r, n.attr("name"), "" !== i && void 0 !== i ? i.split(" ") : [], n.html())
    }), this.userScripts = _.map(e.children('*[type="text/twine-javascript"]'), function(e) {
        return $(e).html()
    }), this.userStyles = _.map(e.children('*[type="text/twine-css"]'), function(e) {
        return $(e).html()
    })
}! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = e.length,
            n = ie.type(e);
        return "function" === n || ie.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function r(e, t, n) {
        if (ie.isFunction(t)) return ie.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return ie.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (pe.test(t)) return ie.filter(t, e, n);
            t = ie.filter(t, e)
        }
        return ie.grep(e, function(e) {
            return ie.inArray(e, t) >= 0 !== n
        })
    }

    function i(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function o(e) {
        var t = xe[e] = {};
        return ie.each(e.match(be) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        he.addEventListener ? (he.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (he.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (he.addEventListener || "load" === event.type || "complete" === he.readyState) && (a(), ie.ready())
    }

    function u(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(Se, "-$1").toLowerCase();
            if (n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ce.test(n) ? ie.parseJSON(n) : n
                } catch (i) {}
                ie.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function l(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ie.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function c(e, t, n, r) {
        if (ie.acceptData(e)) {
            var i, o, a = ie.expando,
                s = e.nodeType,
                u = s ? ie.cache : e,
                l = s ? e[a] : e[a] && a;
            if (l && u[l] && (r || u[l].data) || void 0 !== n || "string" != typeof t) return l || (l = s ? e[a] = V.pop() || ie.guid++ : a), u[l] || (u[l] = s ? {} : {
                toJSON: ie.noop
            }), ("object" == typeof t || "function" == typeof t) && (r ? u[l] = ie.extend(u[l], t) : u[l].data = ie.extend(u[l].data, t)), o = u[l], r || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[ie.camelCase(t)] = n), "string" == typeof t ? (i = o[t], null == i && (i = o[ie.camelCase(t)])) : i = o, i
        }
    }

    function f(e, t, n) {
        if (ie.acceptData(e)) {
            var r, i, o = e.nodeType,
                a = o ? ie.cache : e,
                s = o ? e[ie.expando] : ie.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    ie.isArray(t) ? t = t.concat(ie.map(t, ie.camelCase)) : t in r ? t = [t] : (t = ie.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    for (; i--;) delete r[t[i]];
                    if (n ? !l(r) : !ie.isEmptyObject(r)) return
                }(n || (delete a[s].data, l(a[s]))) && (o ? ie.cleanData([e], !0) : ne.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }

    function p() {
        return !0
    }

    function d() {
        return !1
    }

    function h() {
        try {
            return he.activeElement
        } catch (e) {}
    }

    function g(e) {
        var t = Me.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function m(e, t) {
        var n, r, i = 0,
            o = typeof e.getElementsByTagName !== Te ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Te ? e.querySelectorAll(t || "*") : void 0;
        if (!o)
            for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || ie.nodeName(r, t) ? o.push(r) : ie.merge(o, m(r, t));
        return void 0 === t || t && ie.nodeName(e, t) ? ie.merge([e], o) : o
    }

    function y(e) {
        je.test(e.type) && (e.defaultChecked = e.checked)
    }

    function v(e, t) {
        return ie.nodeName(e, "table") && ie.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function b(e) {
        return e.type = (null !== ie.find.attr(e, "type")) + "/" + e.type, e
    }

    function x(e) {
        var t = Ue.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) ie._data(n, "globalEval", !t || ie._data(t[r], "globalEval"))
    }

    function k(e, t) {
        if (1 === t.nodeType && ie.hasData(e)) {
            var n, r, i, o = ie._data(e),
                a = ie._data(t, o),
                s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)
                    for (r = 0, i = s[n].length; i > r; r++) ie.event.add(t, n, s[n][r])
            }
            a.data && (a.data = ie.extend({}, a.data))
        }
    }

    function T(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[ie.expando]) {
                i = ie._data(t);
                for (r in i.events) ie.removeEvent(t, r, i.handle);
                t.removeAttribute(ie.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text, x(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !ie.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && je.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function C(t, n) {
        var r, i = ie(n.createElement(t)).appendTo(n.body),
            o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : ie.css(i[0], "display");
        return i.detach(), o
    }

    function S(e) {
        var t = he,
            n = Ke[e];
        return n || (n = C(e, t), "none" !== n && n || (Ge = (Ge || ie("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ge[0].contentWindow || Ge[0].contentDocument).document, t.write(), t.close(), n = C(e, t), Ge.detach()), Ke[e] = n), n
    }

    function N(e, t) {
        return {
            get: function() {
                var n = e();
                if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function E(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = pt.length; i--;)
            if (t = pt[i] + n, t in e) return t;
        return r
    }

    function _(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = ie._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && _e(r) && (o[a] = ie._data(r, "olddisplay", S(r.nodeName)))) : (i = _e(r), (n && "none" !== n || !i) && ie._data(r, "olddisplay", i ? n : ie.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function A(e, t, n) {
        var r = ut.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function j(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ie.css(e, n + Ee[o], !0, i)), r ? ("content" === n && (a -= ie.css(e, "padding" + Ee[o], !0, i)), "margin" !== n && (a -= ie.css(e, "border" + Ee[o] + "Width", !0, i))) : (a += ie.css(e, "padding" + Ee[o], !0, i), "padding" !== n && (a += ie.css(e, "border" + Ee[o] + "Width", !0, i)));
        return a
    }

    function L(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = et(e),
            a = ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = tt(e, t, o), (0 > i || null == i) && (i = e.style[t]), rt.test(i)) return i;
            r = a && (ne.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + j(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function D(e, t, n, r, i) {
        return new D.prototype.init(e, t, n, r, i)
    }

    function q() {
        return setTimeout(function() {
            dt = void 0
        }), dt = ie.now()
    }

    function O(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Ee[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function H(e, t, n) {
        for (var r, i = (bt[t] || []).concat(bt["*"]), o = 0, a = i.length; a > o; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function M(e, t, n) {
        var r, i, o, a, s, u, l, c, f = this,
            p = {},
            d = e.style,
            h = e.nodeType && _e(e),
            g = ie._data(e, "fxshow");
        n.queue || (s = ie._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
            s.unqueued || u()
        }), s.unqueued++, f.always(function() {
            f.always(function() {
                s.unqueued--, ie.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = ie.css(e, "display"), c = "none" === l ? ie._data(e, "olddisplay") || S(e.nodeName) : l, "inline" === c && "none" === ie.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ne.shrinkWrapBlocks() || f.always(function() {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], gt.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r]) continue;
                    h = !0
                }
                p[r] = g && g[r] || ie.style(e, r)
            } else l = void 0;
        if (ie.isEmptyObject(p)) "inline" === ("none" === l ? S(e.nodeName) : l) && (d.display = l);
        else {
            g ? "hidden" in g && (h = g.hidden) : g = ie._data(e, "fxshow", {}), o && (g.hidden = !h), h ? ie(e).show() : f.done(function() {
                ie(e).hide()
            }), f.done(function() {
                var t;
                ie._removeData(e, "fxshow");
                for (t in p) ie.style(e, t, p[t])
            });
            for (r in p) a = H(h ? g[r] : 0, r, f), r in g || (g[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function $(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = ie.camelCase(n), i = t[r], o = e[n], ie.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = ie.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }

    function F(e, t, n) {
        var r, i, o = 0,
            a = vt.length,
            s = ie.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = dt || q(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
            },
            l = s.promise({
                elem: e,
                props: ie.extend({}, t),
                opts: ie.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: dt || q(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = ie.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for ($(c, l.opts.specialEasing); a > o; o++)
            if (r = vt[o].call(l, e, c, l.opts)) return r;
        return ie.map(c, H, l), ie.isFunction(l.opts.start) && l.opts.start.call(e, l), ie.fx.timer(ie.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function P(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(be) || [];
            if (ie.isFunction(n))
                for (; r = o[i++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function R(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0, ie.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
            }), u
        }
        var o = {},
            a = e === It;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function B(e, t) {
        var n, r, i = ie.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && ie.extend(!0, e, n), e
    }

    function W(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes;
            "*" === u[0];) u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (a in s)
                if (s[a] && s[a].test(i)) {
                    u.unshift(a);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (a in n) {
                if (!u[0] || e.converters[a + " " + u[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }

    function I(e, t, n, r) {
        var i, o, a, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (a = l[u + " " + o] || l["* " + o], !a)
                for (i in l)
                    if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (f) {
                    return {
                        state: "parsererror",
                        error: a ? f : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function z(e, t, n, r) {
        var i;
        if (ie.isArray(t)) ie.each(t, function(t, i) {
            n || Ut.test(e) ? r(e, i) : z(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== ie.type(t)) r(e, t);
        else
            for (i in t) z(e + "[" + i + "]", t[i], n, r)
    }

    function X() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function Z() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function U(e) {
        return ie.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var V = [],
        J = V.slice,
        Q = V.concat,
        Y = V.push,
        G = V.indexOf,
        K = {},
        ee = K.toString,
        te = K.hasOwnProperty,
        ne = {},
        re = "1.11.2",
        ie = function(e, t) {
            return new ie.fn.init(e, t)
        },
        oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ae = /^-ms-/,
        se = /-([\da-z])/gi,
        ue = function(e, t) {
            return t.toUpperCase()
        };
    ie.fn = ie.prototype = {
        jquery: re,
        constructor: ie,
        selector: "",
        length: 0,
        toArray: function() {
            return J.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : J.call(this)
        },
        pushStack: function(e) {
            var t = ie.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return ie.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(ie.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(J.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Y,
        sort: V.sort,
        splice: V.splice
    }, ie.extend = ie.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || ie.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)
            if (null != (i = arguments[s]))
                for (r in i) e = a[r], n = i[r], a !== n && (l && n && (ie.isPlainObject(n) || (t = ie.isArray(n))) ? (t ? (t = !1, o = e && ie.isArray(e) ? e : []) : o = e && ie.isPlainObject(e) ? e : {}, a[r] = ie.extend(l, o, n)) : void 0 !== n && (a[r] = n));
        return a
    }, ie.extend({
        expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === ie.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === ie.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !ie.isArray(e) && e - parseFloat(e) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== ie.type(e) || e.nodeType || ie.isWindow(e)) return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (ne.ownLast)
                for (t in e) return te.call(e, t);
            for (t in e);
            return void 0 === t || te.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? K[ee.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && ie.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(ae, "ms-").replace(se, ue)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, o = 0,
                a = e.length,
                s = n(e);
            if (r) {
                if (s)
                    for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
                else
                    for (o in e)
                        if (i = t.apply(e[o], r), i === !1) break
            } else if (s)
                for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
            else
                for (o in e)
                    if (i = t.call(e[o], o, e[o]), i === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(oe, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? ie.merge(r, "string" == typeof e ? [e] : e) : Y.call(r, e)), r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (G) return G.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r;) e[i++] = t[r++];
            if (n !== n)
                for (; void 0 !== t[r];) e[i++] = t[r++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, r) {
            var i, o = 0,
                a = e.length,
                s = n(e),
                u = [];
            if (s)
                for (; a > o; o++) i = t(e[o], o, r), null != i && u.push(i);
            else
                for (o in e) i = t(e[o], o, r), null != i && u.push(i);
            return Q.apply([], u)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t], t = e, e = i), ie.isFunction(e) ? (n = J.call(arguments, 2), r = function() {
                return e.apply(t || this, n.concat(J.call(arguments)))
            }, r.guid = e.guid = e.guid || ie.guid++, r) : void 0
        },
        now: function() {
            return +new Date
        },
        support: ne
    }), ie.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        K["[object " + t + "]"] = t.toLowerCase()
    });
    var le = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, u, l, f, d, h, g;
            if ((t ? t.ownerDocument || t : R) !== D && L(t), t = t || D, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
            if (!r && O) {
                if (11 !== s && (i = ve.exec(e)))
                    if (a = i[1]) {
                        if (9 === s) {
                            if (o = t.getElementById(a), !o || !o.parentNode) return n;
                            if (o.id === a) return n.push(o), n
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && F(t, o) && o.id === a) return n.push(o), n
                    } else {
                        if (i[2]) return G.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = i[3]) && w.getElementsByClassName) return G.apply(n, t.getElementsByClassName(a)), n
                    }
                if (w.qsa && (!H || !H.test(e))) {
                    if (d = f = P, h = t, g = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (l = S(e), (f = t.getAttribute("id")) ? d = f.replace(xe, "\\<script src=min.js>") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + p(l[u]);
                        h = be.test(e) && c(t.parentNode) || t, g = l.join(",")
                    }
                    if (g) try {
                        return G.apply(n, h.querySelectorAll(g)), n
                    } catch (m) {} finally {
                        f || t.removeAttribute("id")
                    }
                }
            }
            return E(e.replace(ue, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
            var t = [];
            return e
        }

        function r(e) {
            return e[P] = !0, e
        }

        function i(e) {
            var t = D.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) k.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function l(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function f() {}

        function p(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function d(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                o = W++;
            return t.first ? function(t, n, o) {
                for (; t = t[r];)
                    if (1 === t.nodeType || i) return e(t, n, o)
            } : function(t, n, a) {
                var s, u, l = [B, o];
                if (a) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || i) {
                            if (u = t[P] || (t[P] = {}), (s = u[r]) && s[0] === B && s[1] === o) return l[2] = s[2];
                            if (u[r] = l, l[2] = e(t, n, a)) return !0
                        }
            }
        }

        function h(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function g(e, n, r) {
            for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r);
            return r
        }

        function m(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
            return a
        }

        function y(e, t, n, i, o, a) {
            return i && !i[P] && (i = y(i)), o && !o[P] && (o = y(o, a)), r(function(r, a, s, u) {
                var l, c, f, p = [],
                    d = [],
                    h = a.length,
                    y = r || g(t || "*", s.nodeType ? [s] : s, []),
                    v = !e || !r && t ? y : m(y, p, e, s, u),
                    b = n ? o || (r ? e : h || i) ? [] : a : v;
                if (n && n(v, b, s, u), i)
                    for (l = m(b, d), i(l, [], s, u), c = l.length; c--;)(f = l[c]) && (b[d[c]] = !(v[d[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [], c = b.length; c--;)(f = b[c]) && l.push(v[c] = f);
                            o(null, b = [], l, u)
                        }
                        for (c = b.length; c--;)(f = b[c]) && (l = o ? ee(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f))
                    }
                } else b = m(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, u) : G.apply(a, b)
            })
        }

        function v(e) {
            for (var t, n, r, i = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, u = d(function(e) {
                    return e === t
                }, a, !0), l = d(function(e) {
                    return ee(t, e) > -1
                }, a, !0), c = [function(e, n, r) {
                    var i = !o && (r || n !== _) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                    return t = null, i
                }]; i > s; s++)
                if (n = k.relative[e[s].type]) c = [d(h(c), n)];
                else {
                    if (n = k.filter[e[s].type].apply(null, e[s].matches), n[P]) {
                        for (r = ++s; i > r && !k.relative[e[r].type]; r++);
                        return y(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(ue, "$1"), n, r > s && v(e.slice(s, r)), i > r && v(e = e.slice(r)), i > r && p(e))
                    }
                    c.push(n)
                }
            return h(c)
        }

        function b(e, n) {
            var i = n.length > 0,
                o = e.length > 0,
                a = function(r, a, s, u, l) {
                    var c, f, p, d = 0,
                        h = "0",
                        g = r && [],
                        y = [],
                        v = _,
                        b = r || o && k.find.TAG("*", l),
                        x = B += null == v ? 1 : Math.random() || .1,
                        w = b.length;
                    for (l && (_ = a !== D && a); h !== w && null != (c = b[h]); h++) {
                        if (o && c) {
                            for (f = 0; p = e[f++];)
                                if (p(c, a, s)) {
                                    u.push(c);
                                    break
                                }
                            l && (B = x)
                        }
                        i && ((c = !p && c) && d--, r && g.push(c))
                    }
                    if (d += h, i && h !== d) {
                        for (f = 0; p = n[f++];) p(g, y, a, s);
                        if (r) {
                            if (d > 0)
                                for (; h--;) g[h] || y[h] || (y[h] = Q.call(u));
                            y = m(y)
                        }
                        G.apply(u, y), l && !r && y.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                    }
                    return l && (B = x, _ = v), g
                };
            return i ? r(a) : a
        }
        var x, w, k, T, C, S, N, E, _, A, j, L, D, q, O, H, M, $, F, P = "sizzle" + 1 * new Date,
            R = e.document,
            B = 0,
            W = 0,
            I = n(),
            z = n(),
            X = n(),
            Z = function(e, t) {
                return e === t && (j = !0), 0
            },
            U = 1 << 31,
            V = {}.hasOwnProperty,
            J = [],
            Q = J.pop,
            Y = J.push,
            G = J.push,
            K = J.slice,
            ee = function(e, t) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ie = re.replace("w", "w#"),
            oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"),
            ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            pe = new RegExp(ae),
            de = new RegExp("^" + ie + "$"),
            he = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + ae),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            ge = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ye = /^[^{]+\{\s*\[native \w/,
            ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            be = /[+~]/,
            xe = /'|\\/g,
            we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            ke = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            Te = function() {
                L()
            };
        try {
            G.apply(J = K.call(R.childNodes), R.childNodes), J[R.childNodes.length].nodeType
        } catch (Ce) {
            G = {
                apply: J.length ? function(e, t) {
                    Y.apply(e, K.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, C = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, L = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : R;
            return r !== D && 9 === r.nodeType && r.documentElement ? (D = r, q = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), O = !C(r), w.attributes = i(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = i(function(e) {
                return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = ye.test(r.getElementsByClassName), w.getById = i(function(e) {
                return q.appendChild(e).id = P, !r.getElementsByName || !r.getElementsByName(P).length
            }), w.getById ? (k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, k.filter.ID = function(e) {
                var t = e.replace(we, ke);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete k.find.ID, k.filter.ID = function(e) {
                var t = e.replace(we, ke);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), k.find.TAG = w.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, k.find.CLASS = w.getElementsByClassName && function(e, t) {
                return O ? t.getElementsByClassName(e) : void 0
            }, M = [], H = [], (w.qsa = ye.test(r.querySelectorAll)) && (i(function(e) {
                q.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + P + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + P + "+*").length || H.push(".#.+[+~]")
            }), i(function(e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
            })), (w.matchesSelector = ye.test($ = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && i(function(e) {
                w.disconnectedMatch = $.call(e, "div"), $.call(e, "[s!='']:x"), M.push("!=", ae)
            }), H = H.length && new RegExp(H.join("|")), M = M.length && new RegExp(M.join("|")), t = ye.test(q.compareDocumentPosition), F = t || ye.test(q.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, Z = t ? function(e, t) {
                if (e === t) return j = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === R && F(R, e) ? -1 : t === r || t.ownerDocument === R && F(R, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return j = !0, 0;
                var n, i = 0,
                    o = e.parentNode,
                    s = t.parentNode,
                    u = [e],
                    l = [t];
                if (!o || !s) return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                if (o === s) return a(e, t);
                for (n = e; n = n.parentNode;) u.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; u[i] === l[i];) i++;
                return i ? a(u[i], l[i]) : u[i] === R ? -1 : l[i] === R ? 1 : 0
            }, r) : D
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== D && L(e), n = n.replace(fe, "='$1']"), !(!w.matchesSelector || !O || M && M.test(n) || H && H.test(n))) try {
                var r = $.call(e, n);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return t(n, D, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== D && L(e), F(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== D && L(e);
            var n = k.attrHandle[t.toLowerCase()],
                r = n && V.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== r ? r : w.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (j = !w.detectDuplicates, A = !w.sortStable && e.slice(0), e.sort(Z), j) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return A = null, e
        }, T = t.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r++];) n += T(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: he,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(we, ke), e[3] = (e[3] || e[4] || e[5] || "").replace(we, ke), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, ke).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = I[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && I(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            y = s && t.nodeName.toLowerCase(),
                            v = !u && !s;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (f = t; f = f[g];)
                                        if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? m.firstChild : m.lastChild], a && v) {
                                for (c = m[P] || (m[P] = {}), l = c[e] || [], d = l[0] === B && l[1], p = l[0] === B && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();)
                                    if (1 === f.nodeType && ++p && f === t) {
                                        c[e] = [B, d, p];
                                        break
                                    }
                            } else if (v && (l = (t[P] || (t[P] = {}))[e]) && l[0] === B) p = l[1];
                            else
                                for (;
                                    (f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[P] || (f[P] = {}))[e] = [B, p]), f !== t)););
                            return p -= i, p === r || p % r === 0 && p / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[P] ? o(n) : o.length > 1 ? (i = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]), e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                        n = [],
                        i = N(e.replace(ue, "$1"));
                    return i[P] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(we, ke),
                        function(t) {
                            return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                        }
                }),
                lang: r(function(e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, ke).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === q
                },
                focus: function(e) {
                    return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !k.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return ge.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (x in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) k.pseudos[x] = s(x);
        for (x in {
                submit: !0,
                reset: !0
            }) k.pseudos[x] = u(x);
        return f.prototype = k.filters = k.pseudos, k.setFilters = new f, S = t.tokenize = function(e, n) {
            var r, i, o, a, s, u, l, c = z[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, u = [], l = k.preFilter; s;) {
                (!r || (i = le.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = ce.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ue, " ")
                }), s = s.slice(r.length));
                for (a in k.filter) !(i = he[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : z(e, u).slice(0)
        }, N = t.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = X[e + " "];
            if (!o) {
                for (t || (t = S(e)), n = t.length; n--;) o = v(t[n]), o[P] ? r.push(o) : i.push(o);
                o = X(e, b(i, r)), o.selector = e
            }
            return o
        }, E = t.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e,
                f = !r && S(e = l.selector || e);
            if (n = n || [], 1 === f.length) {
                if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && O && k.relative[o[1].type]) {
                    if (t = (k.find.ID(a.matches[0].replace(we, ke), t) || [])[0], !t) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = he.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !k.relative[s = a.type]);)
                    if ((u = k.find[s]) && (r = u(a.matches[0].replace(we, ke), be.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(i, 1), e = r.length && p(o), !e) return G.apply(n, r), n;
                        break
                    }
            }
            return (l || N(e, f))(r, t, !O, n, be.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = P.split("").sort(Z).join("") === P, w.detectDuplicates = !!j, L(), w.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(D.createElement("div"))
        }), i(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && i(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(te, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    ie.find = le, ie.expr = le.selectors, ie.expr[":"] = ie.expr.pseudos, ie.unique = le.uniqueSort, ie.text = le.getText, ie.isXMLDoc = le.isXML, ie.contains = le.contains;
    var ce = ie.expr.match.needsContext,
        fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        pe = /^.[^:#\[\.,]*$/;
    ie.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ie.find.matchesSelector(r, e) ? [r] : [] : ie.find.matches(e, ie.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, ie.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(ie(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (ie.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) ie.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? ie.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && ce.test(e) ? ie(e) : e || [], !1).length
        }
    });
    var de, he = e.document,
        ge = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        me = ie.fn.init = function(e, t) {
            var n, r;
            if (!e) return this;
            if ("string" == typeof e) {
                if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ge.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || de).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof ie ? t[0] : t, ie.merge(this, ie.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : he, !0)), fe.test(n[1]) && ie.isPlainObject(t))
                        for (n in t) ie.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                if (r = he.getElementById(n[2]), r && r.parentNode) {
                    if (r.id !== n[2]) return de.find(e);
                    this.length = 1, this[0] = r
                }
                return this.context = he, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ie.isFunction(e) ? "undefined" != typeof de.ready ? de.ready(e) : e(ie) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ie.makeArray(e, this))
        };
    me.prototype = ie.fn, de = ie(he);
    var ye = /^(?:parents|prev(?:Until|All))/,
        ve = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ie.extend({
        dir: function(e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !ie(i).is(n));) 1 === i.nodeType && r.push(i), i = i[t];
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), ie.fn.extend({
        has: function(e) {
            var t, n = ie(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++)
                    if (ie.contains(this, n[t])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], a = ce.test(e) || "string" != typeof e ? ie(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ie.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? ie.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ie.inArray(this[0], ie(e)) : ie.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ie.unique(ie.merge(this.get(), ie(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ie.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return ie.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return ie.dir(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return ie.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return ie.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return ie.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return ie.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return ie.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return ie.sibling(e.firstChild)
        },
        contents: function(e) {
            return ie.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ie.merge([], e.childNodes)
        }
    }, function(e, t) {
        ie.fn[e] = function(n, r) {
            var i = ie.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ie.filter(r, i)), this.length > 1 && (ve[e] || (i = ie.unique(i)), ye.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var be = /\S+/g,
        xe = {};
    ie.Callbacks = function(e) {
        e = "string" == typeof e ? xe[e] || o(e) : ie.extend({}, e);
        var t, n, r, i, a, s, u = [],
            l = !e.once && [],
            c = function(o) {
                for (n = e.memory && o, r = !0, a = s || 0, s = 0, i = u.length, t = !0; u && i > a; a++)
                    if (u[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                t = !1, u && (l ? l.length && c(l.shift()) : n ? u = [] : f.disable())
            },
            f = {
                add: function() {
                    if (u) {
                        var r = u.length;
                        ! function o(t) {
                            ie.each(t, function(t, n) {
                                var r = ie.type(n);
                                "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                            })
                        }(arguments), t ? i = u.length : n && (s = r, c(n))
                    }
                    return this
                },
                remove: function() {
                    return u && ie.each(arguments, function(e, n) {
                        for (var r;
                            (r = ie.inArray(n, u, r)) > -1;) u.splice(r, 1), t && (i >= r && i--, a >= r && a--)
                    }), this
                },
                has: function(e) {
                    return e ? ie.inArray(e, u) > -1 : !(!u || !u.length)
                },
                empty: function() {
                    return u = [], i = 0, this
                },
                disable: function() {
                    return u = l = n = void 0, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return l = void 0, n || f.disable(), this
                },
                locked: function() {
                    return !l
                },
                fireWith: function(e, n) {
                    return !u || r && !l || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? l.push(n) : c(n)), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return f
    }, ie.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", ie.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ie.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ie.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return ie.Deferred(function(n) {
                            ie.each(t, function(t, o) {
                                var a = ie.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && ie.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? ie.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, ie.each(t, function(e, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t, n, r, i = 0,
                o = J.call(arguments),
                a = o.length,
                s = 1 !== a || e && ie.isFunction(e.promise) ? a : 0,
                u = 1 === s ? e : ie.Deferred(),
                l = function(e, n, r) {
                    return function(i) {
                        n[e] = this, r[e] = arguments.length > 1 ? J.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                    }
                };
            if (a > 1)
                for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && ie.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
            return s || u.resolveWith(r, o), u.promise()
        }
    });
    var we;
    ie.fn.ready = function(e) {
        return ie.ready.promise().done(e), this
    }, ie.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ie.readyWait++ : ie.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--ie.readyWait : !ie.isReady) {
                if (!he.body) return setTimeout(ie.ready);
                ie.isReady = !0, e !== !0 && --ie.readyWait > 0 || (we.resolveWith(he, [ie]), ie.fn.triggerHandler && (ie(he).triggerHandler("ready"), ie(he).off("ready")))
            }
        }
    }), ie.ready.promise = function(t) {
        if (!we)
            if (we = ie.Deferred(), "complete" === he.readyState) setTimeout(ie.ready);
            else if (he.addEventListener) he.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1);
        else {
            he.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && he.documentElement
            } catch (r) {}
            n && n.doScroll && ! function i() {
                if (!ie.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    a(), ie.ready()
                }
            }()
        }
        return we.promise(t)
    };
    var ke, Te = "undefined";
    for (ke in ie(ne)) break;
    ne.ownLast = "0" !== ke, ne.inlineBlockNeedsLayout = !1, ie(function() {
            var e, t, n, r;
            n = he.getElementsByTagName("body")[0], n && n.style && (t = he.createElement("div"), r = he.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Te && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
        }),
        function() {
            var e = he.createElement("div");
            if (null == ne.deleteExpando) {
                ne.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    ne.deleteExpando = !1
                }
            }
            e = null
        }(), ie.acceptData = function(e) {
            var t = ie.noData[(e.nodeName + " ").toLowerCase()],
                n = +e.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
        };
    var Ce = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Se = /([A-Z])/g;
    ie.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? ie.cache[e[ie.expando]] : e[ie.expando], !!e && !l(e)
        },
        data: function(e, t, n) {
            return c(e, t, n)
        },
        removeData: function(e, t) {
            return f(e, t)
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return f(e, t, !0)
        }
    }), ie.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = ie.data(o), 1 === o.nodeType && !ie._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = ie.camelCase(r.slice(5)), u(o, r, i[r])));
                    ie._data(o, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                ie.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                ie.data(this, e, t)
            }) : o ? u(o, e, ie.data(o, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                ie.removeData(this, e)
            })
        }
    }), ie.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = ie._data(e, t), n && (!r || ie.isArray(n) ? r = ie._data(e, t, ie.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ie.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = ie._queueHooks(e, t),
                a = function() {
                    ie.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ie._data(e, n) || ie._data(e, n, {
                empty: ie.Callbacks("once memory").add(function() {
                    ie._removeData(e, t + "queue"), ie._removeData(e, n)
                })
            })
        }
    }), ie.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ie.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = ie.queue(this, e, t);
                ie._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ie.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ie.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = ie.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = ie._data(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var Ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ee = ["Top", "Right", "Bottom", "Left"],
        _e = function(e, t) {
            return e = t || e, "none" === ie.css(e, "display") || !ie.contains(e.ownerDocument, e)
        },
        Ae = ie.access = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === ie.type(n)) {
                i = !0;
                for (s in n) ie.access(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, ie.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(ie(e), n)
                })), t))
                for (; u > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        je = /^(?:checkbox|radio)$/i;
    ! function() {
        var e = he.createElement("input"),
            t = he.createElement("div"),
            n = he.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
                ne.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (r) {
                ne.deleteExpando = !1
            }
        }
    }(),
    function() {
        var t, n, r = he.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + t, (ne[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), ne[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var Le = /^(?:input|select|textarea)$/i,
        De = /^key/,
        qe = /^(?:mouse|pointer|contextmenu)|click/,
        Oe = /^(?:focusinfocus|focusoutblur)$/,
        He = /^([^.]*)(?:\.(.+)|)$/;
    ie.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, m = ie._data(e);
            if (m) {
                for (n.handler && (u = n, n = u.handler, i = u.selector), n.guid || (n.guid = ie.guid++), (a = m.events) || (a = m.events = {}), (c = m.handle) || (c = m.handle = function(e) {
                        return typeof ie === Te || e && ie.event.triggered === e.type ? void 0 : ie.event.dispatch.apply(c.elem, arguments)
                    }, c.elem = e), t = (t || "").match(be) || [""], s = t.length; s--;) o = He.exec(t[s]) || [], d = g = o[1], h = (o[2] || "").split(".").sort(), d && (l = ie.event.special[d] || {}, d = (i ? l.delegateType : l.bindType) || d, l = ie.event.special[d] || {}, f = ie.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && ie.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, u), (p = a[d]) || (p = a[d] = [], p.delegateCount = 0, l.setup && l.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(d, c, !1) : e.attachEvent && e.attachEvent("on" + d, c))), l.add && (l.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, f) : p.push(f), ie.event.global[d] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, m = ie.hasData(e) && ie._data(e);
            if (m && (c = m.events)) {
                for (t = (t || "").match(be) || [""], l = t.length; l--;)
                    if (s = He.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                        for (f = ie.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = c[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
                        u && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || ie.removeEvent(e, d, m.handle), delete c[d])
                    } else
                        for (d in c) ie.event.remove(e, d + t[l], n, r, !0);
                ie.isEmptyObject(c) && (delete m.handle, ie._removeData(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var o, a, s, u, l, c, f, p = [r || he],
                d = te.call(t, "type") ? t.type : t,
                h = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || he, 3 !== r.nodeType && 8 !== r.nodeType && !Oe.test(d + ie.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), a = d.indexOf(":") < 0 && "on" + d, t = t[ie.expando] ? t : new ie.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : ie.makeArray(n, [t]), l = ie.event.special[d] || {}, i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                if (!i && !l.noBubble && !ie.isWindow(r)) {
                    for (u = l.delegateType || d, Oe.test(u + d) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                    c === (r.ownerDocument || he) && p.push(c.defaultView || c.parentWindow || e)
                }
                for (f = 0;
                    (s = p[f++]) && !t.isPropagationStopped();) t.type = f > 1 ? u : l.bindType || d, o = (ie._data(s, "events") || {})[t.type] && ie._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && ie.acceptData(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = d, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), n) === !1) && ie.acceptData(r) && a && r[d] && !ie.isWindow(r)) {
                    c = r[a], c && (r[a] = null), ie.event.triggered = d;
                    try {
                        r[d]()
                    } catch (g) {}
                    ie.event.triggered = void 0, c && (r[a] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = ie.event.fix(e);
            var t, n, r, i, o, a = [],
                s = J.call(arguments),
                u = (ie._data(this, "events") || {})[e.type] || [],
                l = ie.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (a = ie.event.handlers.call(this, e, u), t = 0;
                    (i = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem, o = 0;
                        (r = i.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, n = ((ie.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a = [],
                s = t.delegateCount,
                u = e.target;
            if (s && u.nodeType && (!e.button || "click" !== e.type))
                for (; u != this; u = u.parentNode || this)
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                        for (i = [], o = 0; s > o; o++) r = t[o], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? ie(n, this).index(u) >= 0 : ie.find(n, this, null, [u]).length), i[n] && i.push(r);
                        i.length && a.push({
                            elem: u,
                            handlers: i
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }), a
        },
        fix: function(e) {
            if (e[ie.expando]) return e;
            var t, n, r, i = e.type,
                o = e,
                a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = qe.test(i) ? this.mouseHooks : De.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ie.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || he), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, o = t.button,
                    a = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || he, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== h() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ie.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return ie.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = ie.extend(new ie.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? ie.event.trigger(i, null, t) : ie.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, ie.removeEvent = he.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === Te && (e[r] = null), e.detachEvent(r, n))
    }, ie.Event = function(e, t) {
        return this instanceof ie.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : d) : this.type = e, t && ie.extend(this, t), this.timeStamp = e && e.timeStamp || ie.now(), void(this[ie.expando] = !0)) : new ie.Event(e, t)
    }, ie.Event.prototype = {
        isDefaultPrevented: d,
        isPropagationStopped: d,
        isImmediatePropagationStopped: d,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ie.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        ie.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !ie.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ne.submitBubbles || (ie.event.special.submit = {
        setup: function() {
            return ie.nodeName(this, "form") ? !1 : void ie.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target,
                    n = ie.nodeName(t, "input") || ie.nodeName(t, "button") ? t.form : void 0;
                n && !ie._data(n, "submitBubbles") && (ie.event.add(n, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), ie._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ie.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return ie.nodeName(this, "form") ? !1 : void ie.event.remove(this, "._submit")
        }
    }), ne.changeBubbles || (ie.event.special.change = {
        setup: function() {
            return Le.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ie.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), ie.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), ie.event.simulate("change", this, e, !0)
            })), !1) : void ie.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Le.test(t.nodeName) && !ie._data(t, "changeBubbles") && (ie.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ie.event.simulate("change", this.parentNode, e, !0)
                }), ie._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return ie.event.remove(this, "._change"), !Le.test(this.nodeName)
        }
    }), ne.focusinBubbles || ie.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            ie.event.simulate(t, e.target, ie.event.fix(e), !0)
        };
        ie.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = ie._data(r, t);
                i || r.addEventListener(e, n, !0), ie._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = ie._data(r, t) - 1;
                i ? ie._data(r, t, i) : (r.removeEventListener(e, n, !0), ie._removeData(r, t))
            }
        }
    }), ie.fn.extend({
        on: function(e, t, n, r, i) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = d;
            else if (!r) return this;
            return 1 === i && (a = r, r = function(e) {
                return ie().off(e), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = ie.guid++)), this.each(function() {
                ie.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ie(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = d), this.each(function() {
                ie.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                ie.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? ie.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Me = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        $e = / jQuery\d+="(?:null|\d+)"/g,
        Fe = new RegExp("<(?:" + Me + ")[\\s/>]", "i"),
        Pe = /^\s+/,
        Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Be = /<([\w:]+)/,
        We = /<tbody/i,
        Ie = /<|&#?\w+;/,
        ze = /<(?:script|style|link)/i,
        Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ze = /^$|\/(?:java|ecma)script/i,
        Ue = /^true\/(.*)/,
        Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Je = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Qe = g(he),
        Ye = Qe.appendChild(he.createElement("div"));
    Je.optgroup = Je.option, Je.tbody = Je.tfoot = Je.colgroup = Je.caption = Je.thead, Je.th = Je.td, ie.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s, u = ie.contains(e.ownerDocument, e);
            if (ne.html5Clone || ie.isXMLDoc(e) || !Fe.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Ye.innerHTML = e.outerHTML, Ye.removeChild(o = Ye.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ie.isXMLDoc(e)))
                for (r = m(o), s = m(e), a = 0; null != (i = s[a]); ++a) r[a] && T(i, r[a]);
            if (t)
                if (n)
                    for (s = s || m(e), r = r || m(o), a = 0; null != (i = s[a]); a++) k(i, r[a]);
                else k(e, o);
            return r = m(o, "script"), r.length > 0 && w(r, !u && m(e, "script")), r = s = i = null, o
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, a, s, u, l, c, f = e.length, p = g(t), d = [], h = 0; f > h; h++)
                if (o = e[h], o || 0 === o)
                    if ("object" === ie.type(o)) ie.merge(d, o.nodeType ? [o] : o);
                    else if (Ie.test(o)) {
                for (s = s || p.appendChild(t.createElement("div")), u = (Be.exec(o) || ["", ""])[1].toLowerCase(), c = Je[u] || Je._default, s.innerHTML = c[1] + o.replace(Re, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!ne.leadingWhitespace && Pe.test(o) && d.push(t.createTextNode(Pe.exec(o)[0])), !ne.tbody)
                    for (o = "table" !== u || We.test(o) ? "<table>" !== c[1] || We.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;) ie.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
                for (ie.merge(d, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = p.lastChild
            } else d.push(t.createTextNode(o));
            for (s && p.removeChild(s), ne.appendChecked || ie.grep(m(d, "input"), y), h = 0; o = d[h++];)
                if ((!r || -1 === ie.inArray(o, r)) && (a = ie.contains(o.ownerDocument, o), s = m(p.appendChild(o), "script"), a && w(s), n))
                    for (i = 0; o = s[i++];) Ze.test(o.type || "") && n.push(o);
            return s = null, p
        },
        cleanData: function(e, t) {
            for (var n, r, i, o, a = 0, s = ie.expando, u = ie.cache, l = ne.deleteExpando, c = ie.event.special; null != (n = e[a]); a++)
                if ((t || ie.acceptData(n)) && (i = n[s], o = i && u[i])) {
                    if (o.events)
                        for (r in o.events) c[r] ? ie.event.remove(n, r) : ie.removeEvent(n, r, o.handle);
                    u[i] && (delete u[i], l ? delete n[s] : typeof n.removeAttribute !== Te ? n.removeAttribute(s) : n[s] = null, V.push(i))
                }
        }
    }), ie.fn.extend({
        text: function(e) {
            return Ae(this, function(e) {
                return void 0 === e ? ie.text(this) : this.empty().append((this[0] && this[0].ownerDocument || he).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? ie.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || ie.cleanData(m(n)), n.parentNode && (t && ie.contains(n.ownerDocument, n) && w(m(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ie.cleanData(m(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && ie.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return ie.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ae(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace($e, "") : void 0;
                if (!("string" != typeof e || ze.test(e) || !ne.htmlSerialize && Fe.test(e) || !ne.leadingWhitespace && Pe.test(e) || Je[(Be.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Re, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (ie.cleanData(m(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, ie.cleanData(m(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = Q.apply([], e);
            var n, r, i, o, a, s, u = 0,
                l = this.length,
                c = this,
                f = l - 1,
                p = e[0],
                d = ie.isFunction(p);
            if (d || l > 1 && "string" == typeof p && !ne.checkClone && Xe.test(p)) return this.each(function(n) {
                var r = c.eq(n);
                d && (e[0] = p.call(this, n, r.html())), r.domManip(e, t)
            });
            if (l && (s = ie.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = ie.map(m(s, "script"), b), i = o.length; l > u; u++) r = s, u !== f && (r = ie.clone(r, !0, !0), i && ie.merge(o, m(r, "script"))), t.call(this[u], r, u);
                if (i)
                    for (a = o[o.length - 1].ownerDocument, ie.map(o, x), u = 0; i > u; u++) r = o[u], Ze.test(r.type || "") && !ie._data(r, "globalEval") && ie.contains(a, r) && (r.src ? ie._evalUrl && ie._evalUrl(r.src) : ie.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Ve, "")));
                s = n = null
            }
            return this
        }
    }), ie.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ie.fn[e] = function(e) {
            for (var n, r = 0, i = [], o = ie(e), a = o.length - 1; a >= r; r++) n = r === a ? this : this.clone(!0), ie(o[r])[t](n), Y.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Ge, Ke = {};
    ! function() {
        var e;
        ne.shrinkWrapBlocks = function() {
            if (null != e) return e;
            e = !1;
            var t, n, r;
            return n = he.getElementsByTagName("body")[0], n && n.style ? (t = he.createElement("div"), r = he.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                n.appendChild(r).appendChild(t), typeof t.style.zoom !== Te && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(he.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
        }
    }();
    var et, tt, nt = /^margin/,
        rt = new RegExp("^(" + Ne + ")(?!px)[a-z%]+$", "i"),
        it = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (et = function(t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
        }, tt = function(e, t, n) {
            var r, i, o, a, s = e.style;
            return n = n || et(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || ie.contains(e.ownerDocument, e) || (a = ie.style(e, t)), rt.test(a) && nt.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 === a ? a : a + ""
        }) : he.documentElement.currentStyle && (et = function(e) {
            return e.currentStyle
        }, tt = function(e, t, n) {
            var r, i, o, a, s = e.style;
            return n = n || et(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), rt.test(a) && !it.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
        }),
        function() {
            function t() {
                var t, n, r, i;
                n = he.getElementsByTagName("body")[0], n && n.style && (t = he.createElement("div"), r = he.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, u = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {
                    width: "4px"
                }).width, i = t.appendChild(he.createElement("div")), i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", u = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight), t.removeChild(i)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = t.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === i[0].offsetHeight, s && (i[0].style.display = "", i[1].style.display = "none", s = 0 === i[0].offsetHeight), n.removeChild(r))
            }
            var n, r, i, o, a, s, u;
            n = he.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = n.getElementsByTagName("a")[0], r = i && i.style, r && (r.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === r.opacity, ne.cssFloat = !!r.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing, ie.extend(ne, {
                reliableHiddenOffsets: function() {
                    return null == s && t(), s
                },
                boxSizingReliable: function() {
                    return null == a && t(), a
                },
                pixelPosition: function() {
                    return null == o && t(), o
                },
                reliableMarginRight: function() {
                    return null == u && t(), u
                }
            }))
        }(), ie.swap = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        };
    var ot = /alpha\([^)]*\)/i,
        at = /opacity\s*=\s*([^)]*)/,
        st = /^(none|table(?!-c[ea]).+)/,
        ut = new RegExp("^(" + Ne + ")(.*)$", "i"),
        lt = new RegExp("^([+-])=(" + Ne + ")", "i"),
        ct = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ft = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        pt = ["Webkit", "O", "Moz", "ms"];
    ie.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = tt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ne.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = ie.camelCase(t),
                    u = e.style;
                if (t = ie.cssProps[s] || (ie.cssProps[s] = E(u, s)), a = ie.cssHooks[t] || ie.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t];
                if (o = typeof n, "string" === o && (i = lt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(ie.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || ie.cssNumber[s] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r))))) try {
                    u[t] = n
                } catch (l) {}
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = ie.camelCase(t);
            return t = ie.cssProps[s] || (ie.cssProps[s] = E(e.style, s)), a = ie.cssHooks[t] || ie.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = tt(e, t, r)), "normal" === o && t in ft && (o = ft[t]), "" === n || n ? (i = parseFloat(o), n === !0 || ie.isNumeric(i) ? i || 0 : o) : o
        }
    }), ie.each(["height", "width"], function(e, t) {
        ie.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? st.test(ie.css(e, "display")) && 0 === e.offsetWidth ? ie.swap(e, ct, function() {
                    return L(e, t, r)
                }) : L(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && et(e);
                return A(e, n, r ? j(e, t, r, ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), ne.opacity || (ie.cssHooks.opacity = {
        get: function(e, t) {
            return at.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = ie.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === ie.trim(o.replace(ot, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = ot.test(o) ? o.replace(ot, i) : o + " " + i)
        }
    }), ie.cssHooks.marginRight = N(ne.reliableMarginRight, function(e, t) {
        return t ? ie.swap(e, {
            display: "inline-block"
        }, tt, [e, "marginRight"]) : void 0
    }), ie.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ie.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Ee[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, nt.test(e) || (ie.cssHooks[e + t].set = A)
    }), ie.fn.extend({
        css: function(e, t) {
            return Ae(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (ie.isArray(t)) {
                    for (r = et(e), i = t.length; i > a; a++) o[t[a]] = ie.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? ie.style(e, t, n) : ie.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return _(this, !0)
        },
        hide: function() {
            return _(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                _e(this) ? ie(this).show() : ie(this).hide()
            })
        }
    }), ie.Tween = D, D.prototype = {
        constructor: D,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ie.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = D.propHooks[this.prop];
            return e && e.get ? e.get(this) : D.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = D.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ie.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
        }
    }, D.prototype.init.prototype = D.prototype, D.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ie.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                ie.fx.step[e.prop] ? ie.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ie.cssProps[e.prop]] || ie.cssHooks[e.prop]) ? ie.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ie.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, ie.fx = D.prototype.init, ie.fx.step = {};
    var dt, ht, gt = /^(?:toggle|show|hide)$/,
        mt = new RegExp("^(?:([+-])=|)(" + Ne + ")([a-z%]*)$", "i"),
        yt = /queueHooks$/,
        vt = [M],
        bt = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = mt.exec(t),
                    o = i && i[3] || (ie.cssNumber[e] ? "" : "px"),
                    a = (ie.cssNumber[e] || "px" !== o && +r) && mt.exec(ie.css(n.elem, e)),
                    s = 1,
                    u = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do s = s || ".5", a /= s, ie.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --u)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    ie.Animation = ie.extend(F, {
            tweener: function(e, t) {
                ie.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, r = 0, i = e.length; i > r; r++) n = e[r], bt[n] = bt[n] || [], bt[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? vt.unshift(e) : vt.push(e)
            }
        }), ie.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? ie.extend({}, e) : {
                complete: n || !n && t || ie.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ie.isFunction(t) && t
            };
            return r.duration = ie.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ie.fx.speeds ? ie.fx.speeds[r.duration] : ie.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                ie.isFunction(r.old) && r.old.call(this), r.queue && ie.dequeue(this, r.queue)
            }, r
        }, ie.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(_e).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = ie.isEmptyObject(e),
                    o = ie.speed(t, n, r),
                    a = function() {
                        var t = F(this, ie.extend({}, e), o);
                        (i || ie._data(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        o = ie.timers,
                        a = ie._data(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && yt.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    (t || !n) && ie.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = ie._data(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        o = ie.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, ie.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), ie.each(["toggle", "show", "hide"], function(e, t) {
            var n = ie.fn[t];
            ie.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, r, i)
            }
        }), ie.each({
            slideDown: O("show"),
            slideUp: O("hide"),
            slideToggle: O("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            ie.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), ie.timers = [], ie.fx.tick = function() {
            var e, t = ie.timers,
                n = 0;
            for (dt = ie.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
            t.length || ie.fx.stop(), dt = void 0
        }, ie.fx.timer = function(e) {
            ie.timers.push(e), e() ? ie.fx.start() : ie.timers.pop()
        }, ie.fx.interval = 13, ie.fx.start = function() {
            ht || (ht = setInterval(ie.fx.tick, ie.fx.interval))
        }, ie.fx.stop = function() {
            clearInterval(ht), ht = null
        }, ie.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ie.fn.delay = function(e, t) {
            return e = ie.fx ? ie.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var e, t, n, r, i;
            t = he.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = he.createElement("select"), i = n.appendChild(he.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(r.getAttribute("style")), ne.hrefNormalized = "/a" === r.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = i.selected, ne.enctype = !!he.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !i.disabled, e = he.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
        }();
    var xt = /\r/g;
    ie.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = ie.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, ie(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : ie.isArray(i) && (i = ie.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = ie.valHooks[this.type] || ie.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return t = ie.valHooks[i.type] || ie.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n)
            }
        }
    }), ie.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ie.find.attr(e, "value");
                    return null != t ? t : ie.trim(ie.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)
                        if (n = r[u], !(!n.selected && u !== i || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ie.nodeName(n.parentNode, "optgroup"))) {
                            if (t = ie(n).val(), o) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = ie.makeArray(t), a = i.length; a--;)
                        if (r = i[a], ie.inArray(ie.valHooks.option.get(r), o) >= 0) try {
                            r.selected = n = !0
                        } catch (s) {
                            r.scrollHeight
                        } else r.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), ie.each(["radio", "checkbox"], function() {
        ie.valHooks[this] = {
            set: function(e, t) {
                return ie.isArray(t) ? e.checked = ie.inArray(ie(e).val(), t) >= 0 : void 0
            }
        }, ne.checkOn || (ie.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var wt, kt, Tt = ie.expr.attrHandle,
        Ct = /^(?:checked|selected)$/i,
        St = ne.getSetAttribute,
        Nt = ne.input;
    ie.fn.extend({
        attr: function(e, t) {
            return Ae(this, ie.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ie.removeAttr(this, e)
            })
        }
    }), ie.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === Te ? ie.prop(e, t, n) : (1 === o && ie.isXMLDoc(e) || (t = t.toLowerCase(), r = ie.attrHooks[t] || (ie.expr.match.bool.test(t) ? kt : wt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = ie.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void ie.removeAttr(e, t))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(be);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) r = ie.propFix[n] || n, ie.expr.match.bool.test(n) ? Nt && St || !Ct.test(n) ? e[r] = !1 : e[ie.camelCase("default-" + n)] = e[r] = !1 : ie.attr(e, n, ""), e.removeAttribute(St ? n : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ne.radioValue && "radio" === t && ie.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), kt = {
        set: function(e, t, n) {
            return t === !1 ? ie.removeAttr(e, n) : Nt && St || !Ct.test(n) ? e.setAttribute(!St && ie.propFix[n] || n, n) : e[ie.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, ie.each(ie.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Tt[t] || ie.find.attr;
        Tt[t] = Nt && St || !Ct.test(t) ? function(e, t, r) {
            var i, o;
            return r || (o = Tt[t], Tt[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Tt[t] = o), i
        } : function(e, t, n) {
            return n ? void 0 : e[ie.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), Nt && St || (ie.attrHooks.value = {
        set: function(e, t, n) {
            return ie.nodeName(e, "input") ? void(e.defaultValue = t) : wt && wt.set(e, t, n)
        }
    }), St || (wt = {
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Tt.id = Tt.name = Tt.coords = function(e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }, ie.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: wt.set
    }, ie.attrHooks.contenteditable = {
        set: function(e, t, n) {
            wt.set(e, "" === t ? !1 : t, n)
        }
    }, ie.each(["width", "height"], function(e, t) {
        ie.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), ne.style || (ie.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Et = /^(?:input|select|textarea|button|object)$/i,
        _t = /^(?:a|area)$/i;
    ie.fn.extend({
        prop: function(e, t) {
            return Ae(this, ie.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = ie.propFix[e] || e, this.each(function() {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {}
            })
        }
    }), ie.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !ie.isXMLDoc(e), o && (t = ie.propFix[t] || t, i = ie.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ie.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Et.test(e.nodeName) || _t.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), ne.hrefNormalized || ie.each(["href", "src"], function(e, t) {
        ie.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ne.optSelected || (ie.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ie.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ie.propFix[this.toLowerCase()] = this
    }), ne.enctype || (ie.propFix.enctype = "encoding");
    var At = /[\t\r\n\f]/g;
    ie.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s = 0,
                u = this.length,
                l = "string" == typeof e && e;
            if (ie.isFunction(e)) return this.each(function(t) {
                ie(this).addClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(be) || []; u > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : " ")) {
                        for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        a = ie.trim(r), n.className !== a && (n.className = a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s = 0,
                u = this.length,
                l = 0 === arguments.length || "string" == typeof e && e;
            if (ie.isFunction(e)) return this.each(function(t) {
                ie(this).removeClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(be) || []; u > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : "")) {
                        for (o = 0; i = t[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        a = e ? ie.trim(r) : "", n.className !== a && (n.className = a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ie.isFunction(e) ? function(n) {
                ie(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function() {
                if ("string" === n)
                    for (var t, r = 0, i = ie(this), o = e.match(be) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else(n === Te || "boolean" === n) && (this.className && ie._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ie._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(At, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    }), ie.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ie.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ie.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var jt = ie.now(),
        Lt = /\?/,
        Dt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ie.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, r = null,
            i = ie.trim(t + "");
        return i && !ie.trim(i.replace(Dt, function(e, t, i, o) {
            return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
        })) ? Function("return " + i)() : ie.error("Invalid JSON: " + t)
    }, ie.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ie.error("Invalid XML: " + t), n
    };
    var qt, Ot, Ht = /#.*$/,
        Mt = /([?&])_=[^&]*/,
        $t = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Pt = /^(?:GET|HEAD)$/,
        Rt = /^\/\//,
        Bt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Wt = {},
        It = {},
        zt = "*/".concat("*");
    try {
        Ot = location.href
    } catch (Xt) {
        Ot = he.createElement("a"), Ot.href = "", Ot = Ot.href
    }
    qt = Bt.exec(Ot.toLowerCase()) || [], ie.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ot,
            type: "GET",
            isLocal: Ft.test(qt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ie.parseJSON,
                "text xml": ie.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? B(B(e, ie.ajaxSettings), t) : B(ie.ajaxSettings, e)
        },
        ajaxPrefilter: P(Wt),
        ajaxTransport: P(It),
        ajax: function(e, t) {
            function n(e, t, n, r) {
                var i, c, y, v, x, k = t;
                2 !== b && (b = 2, s && clearTimeout(s), l = void 0, a = r || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && 300 > e || 304 === e, n && (v = W(f, w, n)), v = I(f, v, w, i), i ? (f.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (ie.lastModified[o] = x), x = w.getResponseHeader("etag"), x && (ie.etag[o] = x)), 204 === e || "HEAD" === f.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = v.state, c = v.data, y = v.error, i = !y)) : (y = k, (e || !k) && (k = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || k) + "", i ? h.resolveWith(p, [c, k, w]) : h.rejectWith(p, [w, k, y]), w.statusCode(m), m = void 0, u && d.trigger(i ? "ajaxSuccess" : "ajaxError", [w, f, i ? c : y]), g.fireWith(p, [w, k]), u && (d.trigger("ajaxComplete", [w, f]), --ie.active || ie.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, o, a, s, u, l, c, f = ie.ajaxSetup({}, t),
                p = f.context || f,
                d = f.context && (p.nodeType || p.jquery) ? ie(p) : ie.event,
                h = ie.Deferred(),
                g = ie.Callbacks("once memory"),
                m = f.statusCode || {},
                y = {},
                v = {},
                b = 0,
                x = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === b) {
                            if (!c)
                                for (c = {}; t = $t.exec(a);) c[t[1].toLowerCase()] = t[2];
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return b || (e = v[n] = v[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return b || (f.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > b)
                                for (t in e) m[t] = [m[t], e[t]];
                            else w.always(e[w.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || x;
                        return l && l.abort(t), n(0, t), this
                    }
                };
            if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || Ot) + "").replace(Ht, "").replace(Rt, qt[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = ie.trim(f.dataType || "*").toLowerCase().match(be) || [""], null == f.crossDomain && (r = Bt.exec(f.url.toLowerCase()), f.crossDomain = !(!r || r[1] === qt[1] && r[2] === qt[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (qt[3] || ("http:" === qt[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = ie.param(f.data, f.traditional)), R(Wt, f, t, w), 2 === b) return w;
            u = ie.event && f.global, u && 0 === ie.active++ && ie.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !Pt.test(f.type), o = f.url, f.hasContent || (f.data && (o = f.url += (Lt.test(o) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = Mt.test(o) ? o.replace(Mt, "$1_=" + jt++) : o + (Lt.test(o) ? "&" : "?") + "_=" + jt++)), f.ifModified && (ie.lastModified[o] && w.setRequestHeader("If-Modified-Since", ie.lastModified[o]), ie.etag[o] && w.setRequestHeader("If-None-Match", ie.etag[o])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : f.accepts["*"]);
            for (i in f.headers) w.setRequestHeader(i, f.headers[i]);
            if (f.beforeSend && (f.beforeSend.call(p, w, f) === !1 || 2 === b)) return w.abort();
            x = "abort";
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[i](f[i]);
            if (l = R(It, f, t, w)) {
                w.readyState = 1, u && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (s = setTimeout(function() {
                    w.abort("timeout")
                }, f.timeout));
                try {
                    b = 1, l.send(y, n)
                } catch (k) {
                    if (!(2 > b)) throw k;
                    n(-1, k)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function(e, t, n) {
            return ie.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ie.get(e, void 0, t, "script")
        }
    }), ie.each(["get", "post"], function(e, t) {
        ie[t] = function(e, n, r, i) {
            return ie.isFunction(n) && (i = i || r, r = n, n = void 0), ie.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), ie._evalUrl = function(e) {
        return ie.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, ie.fn.extend({
        wrapAll: function(e) {
            if (ie.isFunction(e)) return this.each(function(t) {
                ie(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ie(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(ie.isFunction(e) ? function(t) {
                ie(this).wrapInner(e.call(this, t))
            } : function() {
                var t = ie(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ie.isFunction(e);
            return this.each(function(n) {
                ie(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ie.nodeName(this, "body") || ie(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ie.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ie.css(e, "display"))
    }, ie.expr.filters.visible = function(e) {
        return !ie.expr.filters.hidden(e)
    };
    var Zt = /%20/g,
        Ut = /\[\]$/,
        Vt = /\r?\n/g,
        Jt = /^(?:submit|button|image|reset|file)$/i,
        Qt = /^(?:input|select|textarea|keygen)/i;
    ie.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = ie.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = ie.ajaxSettings && ie.ajaxSettings.traditional), ie.isArray(e) || e.jquery && !ie.isPlainObject(e)) ie.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) z(n, e[n], t, i);
        return r.join("&").replace(Zt, "+")
    }, ie.fn.extend({
        serialize: function() {
            return ie.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ie.prop(this, "elements");
                return e ? ie.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ie(this).is(":disabled") && Qt.test(this.nodeName) && !Jt.test(e) && (this.checked || !je.test(e))
            }).map(function(e, t) {
                var n = ie(this).val();
                return null == n ? null : ie.isArray(n) ? ie.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Vt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Vt, "\r\n")
                }
            }).get()
        }
    }), ie.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || Z()
    } : X;
    var Yt = 0,
        Gt = {},
        Kt = ie.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in Gt) Gt[e](void 0, !0)
    }), ne.cors = !!Kt && "withCredentials" in Kt, Kt = ne.ajax = !!Kt, Kt && ie.ajaxTransport(function(e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function(n, r) {
                    var i, o = e.xhr(),
                        a = ++Yt;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (i in e.xhrFields) o[i] = e.xhrFields[i];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                    o.send(e.hasContent && e.data || null), t = function(n, i) {
                        var s, u, l;
                        if (t && (i || 4 === o.readyState))
                            if (delete Gt[a], t = void 0, o.onreadystatechange = ie.noop, i) 4 !== o.readyState && o.abort();
                            else {
                                l = {}, s = o.status, "string" == typeof o.responseText && (l.text = o.responseText);
                                try {
                                    u = o.statusText
                                } catch (c) {
                                    u = ""
                                }
                                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = l.text ? 200 : 404
                            }
                        l && r(s, u, l, o.getAllResponseHeaders())
                    }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Gt[a] = t : t()
                },
                abort: function() {
                    t && t(void 0, !0)
                }
            }
        }
    }), ie.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return ie.globalEval(e), e
            }
        }
    }), ie.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ie.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = he.head || ie("head")[0] || he.documentElement;
            return {
                send: function(r, i) {
                    t = he.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var en = [],
        tn = /(=)\?(?=&|$)|\?\?/;
    ie.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = en.pop() || ie.expando + "_" + jt++;
            return this[e] = !0, e
        }
    }), ie.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (tn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = ie.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(tn, "$1" + i) : t.jsonp !== !1 && (t.url += (Lt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || ie.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        }, r.always(function() {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, en.push(i)), a && ie.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), ie.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || he;
        var r = fe.exec(e),
            i = !n && [];
        return r ? [t.createElement(r[1])] : (r = ie.buildFragment([e], t, i), i && i.length && ie(i).remove(), ie.merge([], r.childNodes))
    };
    var nn = ie.fn.load;
    ie.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return s >= 0 && (r = ie.trim(e.slice(s, e.length)), e = e.slice(0, s)), ie.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && ie.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments, a.html(r ? ie("<div>").append(ie.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            a.each(n, i || [e.responseText, t, e])
        }), this
    }, ie.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ie.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ie.expr.filters.animated = function(e) {
        return ie.grep(ie.timers, function(t) {
            return e === t.elem
        }).length
    };
    var rn = e.document.documentElement;
    ie.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l, c = ie.css(e, "position"),
                f = ie(e),
                p = {};
            "static" === c && (e.style.position = "relative"), s = f.offset(), o = ie.css(e, "top"), u = ie.css(e, "left"), l = ("absolute" === c || "fixed" === c) && ie.inArray("auto", [o, u]) > -1, l ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), ie.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, ie.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                ie.offset.setOffset(this, e, t)
            });
            var t, n, r = {
                    top: 0,
                    left: 0
                },
                i = this[0],
                o = i && i.ownerDocument;
            if (o) return t = o.documentElement, ie.contains(t, i) ? (typeof i.getBoundingClientRect !== Te && (r = i.getBoundingClientRect()), n = U(o), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === ie.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ie.nodeName(e[0], "html") || (n = e.offset()), n.top += ie.css(e[0], "borderTopWidth", !0), n.left += ie.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - ie.css(r, "marginTop", !0),
                    left: t.left - n.left - ie.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || rn; e && !ie.nodeName(e, "html") && "static" === ie.css(e, "position");) e = e.offsetParent;

                return e || rn
            })
        }
    }), ie.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        ie.fn[e] = function(r) {
            return Ae(this, function(e, r, i) {
                var o = U(e);
                return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void(o ? o.scrollTo(n ? ie(o).scrollLeft() : i, n ? i : ie(o).scrollTop()) : e[r] = i)
            }, e, r, arguments.length, null)
        }
    }), ie.each(["top", "left"], function(e, t) {
        ie.cssHooks[t] = N(ne.pixelPosition, function(e, n) {
            return n ? (n = tt(e, t), rt.test(n) ? ie(e).position()[t] + "px" : n) : void 0
        })
    }), ie.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        ie.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            ie.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    a = n || (r === !0 || i === !0 ? "margin" : "border");
                return Ae(this, function(t, n, r) {
                    var i;
                    return ie.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? ie.css(t, n, a) : ie.style(t, n, r, a)
                }, t, o ? r : void 0, o, null)
            }
        })
    }), ie.fn.size = function() {
        return this.length
    }, ie.fn.andSelf = ie.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ie
    });
    var on = e.jQuery,
        an = e.$;
    return ie.noConflict = function(t) {
        return e.$ === ie && (e.$ = an), t && e.jQuery === ie && (e.jQuery = on), ie
    }, typeof t === Te && (e.jQuery = e.$ = ie), ie
}),
function() {
    var e = this,
        t = e._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        o = Function.prototype,
        a = r.push,
        s = r.slice,
        u = r.concat,
        l = i.toString,
        c = i.hasOwnProperty,
        f = r.forEach,
        p = r.map,
        d = r.reduce,
        h = r.reduceRight,
        g = r.filter,
        m = r.every,
        y = r.some,
        v = r.indexOf,
        b = r.lastIndexOf,
        x = Array.isArray,
        w = Object.keys,
        k = o.bind,
        T = function(e) {
            return e instanceof T ? e : this instanceof T ? void(this._wrapped = e) : new T(e)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = T), exports._ = T) : e._ = T, T.VERSION = "1.6.0";
    var C = T.each = T.forEach = function(e, t, r) {
        if (null == e) return e;
        if (f && e.forEach === f) e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, o = e.length; o > i; i++)
                if (t.call(r, e[i], i, e) === n) return
        } else
            for (var a = T.keys(e), i = 0, o = a.length; o > i; i++)
                if (t.call(r, e[a[i]], a[i], e) === n) return; return e
    };
    T.map = T.collect = function(e, t, n) {
        var r = [];
        return null == e ? r : p && e.map === p ? e.map(t, n) : (C(e, function(e, i, o) {
            r.push(t.call(n, e, i, o))
        }), r)
    };
    var S = "Reduce of empty array with no initial value";
    T.reduce = T.foldl = T.inject = function(e, t, n, r) {
        var i = arguments.length > 2;
        if (null == e && (e = []), d && e.reduce === d) return r && (t = T.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        if (C(e, function(e, o, a) {
                i ? n = t.call(r, n, e, o, a) : (n = e, i = !0)
            }), !i) throw new TypeError(S);
        return n
    }, T.reduceRight = T.foldr = function(e, t, n, r) {
        var i = arguments.length > 2;
        if (null == e && (e = []), h && e.reduceRight === h) return r && (t = T.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
        var o = e.length;
        if (o !== +o) {
            var a = T.keys(e);
            o = a.length
        }
        if (C(e, function(s, u, l) {
                u = a ? a[--o] : --o, i ? n = t.call(r, n, e[u], u, l) : (n = e[u], i = !0)
            }), !i) throw new TypeError(S);
        return n
    }, T.find = T.detect = function(e, t, n) {
        var r;
        return N(e, function(e, i, o) {
            return t.call(n, e, i, o) ? (r = e, !0) : void 0
        }), r
    }, T.filter = T.select = function(e, t, n) {
        var r = [];
        return null == e ? r : g && e.filter === g ? e.filter(t, n) : (C(e, function(e, i, o) {
            t.call(n, e, i, o) && r.push(e)
        }), r)
    }, T.reject = function(e, t, n) {
        return T.filter(e, function(e, r, i) {
            return !t.call(n, e, r, i)
        }, n)
    }, T.every = T.all = function(e, t, r) {
        t || (t = T.identity);
        var i = !0;
        return null == e ? i : m && e.every === m ? e.every(t, r) : (C(e, function(e, o, a) {
            return (i = i && t.call(r, e, o, a)) ? void 0 : n
        }), !!i)
    };
    var N = T.some = T.any = function(e, t, r) {
        t || (t = T.identity);
        var i = !1;
        return null == e ? i : y && e.some === y ? e.some(t, r) : (C(e, function(e, o, a) {
            return i || (i = t.call(r, e, o, a)) ? n : void 0
        }), !!i)
    };
    T.contains = T.include = function(e, t) {
        return null == e ? !1 : v && e.indexOf === v ? -1 != e.indexOf(t) : N(e, function(e) {
            return e === t
        })
    }, T.invoke = function(e, t) {
        var n = s.call(arguments, 2),
            r = T.isFunction(t);
        return T.map(e, function(e) {
            return (r ? t : e[t]).apply(e, n)
        })
    }, T.pluck = function(e, t) {
        return T.map(e, T.property(t))
    }, T.where = function(e, t) {
        return T.filter(e, T.matches(t))
    }, T.findWhere = function(e, t) {
        return T.find(e, T.matches(t))
    }, T.max = function(e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
        var r = -(1 / 0),
            i = -(1 / 0);
        return C(e, function(e, o, a) {
            var s = t ? t.call(n, e, o, a) : e;
            s > i && (r = e, i = s)
        }), r
    }, T.min = function(e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
        var r = 1 / 0,
            i = 1 / 0;
        return C(e, function(e, o, a) {
            var s = t ? t.call(n, e, o, a) : e;
            i > s && (r = e, i = s)
        }), r
    }, T.shuffle = function(e) {
        var t, n = 0,
            r = [];
        return C(e, function(e) {
            t = T.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    }, T.sample = function(e, t, n) {
        return null == t || n ? (e.length !== +e.length && (e = T.values(e)), e[T.random(e.length - 1)]) : T.shuffle(e).slice(0, Math.max(0, t))
    };
    var E = function(e) {
        return null == e ? T.identity : T.isFunction(e) ? e : T.property(e)
    };
    T.sortBy = function(e, t, n) {
        return t = E(t), T.pluck(T.map(e, function(e, r, i) {
            return {
                value: e,
                index: r,
                criteria: t.call(n, e, r, i)
            }
        }).sort(function(e, t) {
            var n = e.criteria,
                r = t.criteria;
            if (n !== r) {
                if (n > r || void 0 === n) return 1;
                if (r > n || void 0 === r) return -1
            }
            return e.index - t.index
        }), "value")
    };
    var _ = function(e) {
        return function(t, n, r) {
            var i = {};
            return n = E(n), C(t, function(o, a) {
                var s = n.call(r, o, a, t);
                e(i, s, o)
            }), i
        }
    };
    T.groupBy = _(function(e, t, n) {
        T.has(e, t) ? e[t].push(n) : e[t] = [n]
    }), T.indexBy = _(function(e, t, n) {
        e[t] = n
    }), T.countBy = _(function(e, t) {
        T.has(e, t) ? e[t]++ : e[t] = 1
    }), T.sortedIndex = function(e, t, n, r) {
        n = E(n);
        for (var i = n.call(r, t), o = 0, a = e.length; a > o;) {
            var s = o + a >>> 1;
            n.call(r, e[s]) < i ? o = s + 1 : a = s
        }
        return o
    }, T.toArray = function(e) {
        return e ? T.isArray(e) ? s.call(e) : e.length === +e.length ? T.map(e, T.identity) : T.values(e) : []
    }, T.size = function(e) {
        return null == e ? 0 : e.length === +e.length ? e.length : T.keys(e).length
    }, T.first = T.head = T.take = function(e, t, n) {
        return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : s.call(e, 0, t)
    }, T.initial = function(e, t, n) {
        return s.call(e, 0, e.length - (null == t || n ? 1 : t))
    }, T.last = function(e, t, n) {
        return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0))
    }, T.rest = T.tail = T.drop = function(e, t, n) {
        return s.call(e, null == t || n ? 1 : t)
    }, T.compact = function(e) {
        return T.filter(e, T.identity)
    };
    var A = function(e, t, n) {
        return t && T.every(e, T.isArray) ? u.apply(n, e) : (C(e, function(e) {
            T.isArray(e) || T.isArguments(e) ? t ? a.apply(n, e) : A(e, t, n) : n.push(e)
        }), n)
    };
    T.flatten = function(e, t) {
        return A(e, t, [])
    }, T.without = function(e) {
        return T.difference(e, s.call(arguments, 1))
    }, T.partition = function(e, t, n) {
        t = E(t);
        var r = [],
            i = [];
        return C(e, function(e) {
            (t.call(n, e) ? r : i).push(e)
        }), [r, i]
    }, T.uniq = T.unique = function(e, t, n, r) {
        T.isFunction(t) && (r = n, n = t, t = !1);
        var i = n ? T.map(e, n, r) : e,
            o = [],
            a = [];
        return C(i, function(n, r) {
            (t ? r && a[a.length - 1] === n : T.contains(a, n)) || (a.push(n), o.push(e[r]))
        }), o
    }, T.union = function() {
        return T.uniq(T.flatten(arguments, !0))
    }, T.intersection = function(e) {
        var t = s.call(arguments, 1);
        return T.filter(T.uniq(e), function(e) {
            return T.every(t, function(t) {
                return T.contains(t, e)
            })
        })
    }, T.difference = function(e) {
        var t = u.apply(r, s.call(arguments, 1));
        return T.filter(e, function(e) {
            return !T.contains(t, e)
        })
    }, T.zip = function() {
        for (var e = T.max(T.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; e > n; n++) t[n] = T.pluck(arguments, "" + n);
        return t
    }, T.object = function(e, t) {
        if (null == e) return {};
        for (var n = {}, r = 0, i = e.length; i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, T.indexOf = function(e, t, n) {
        if (null == e) return -1;
        var r = 0,
            i = e.length;
        if (n) {
            if ("number" != typeof n) return r = T.sortedIndex(e, t), e[r] === t ? r : -1;
            r = 0 > n ? Math.max(0, i + n) : n
        }
        if (v && e.indexOf === v) return e.indexOf(t, n);
        for (; i > r; r++)
            if (e[r] === t) return r;
        return -1
    }, T.lastIndexOf = function(e, t, n) {
        if (null == e) return -1;
        var r = null != n;
        if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        for (var i = r ? n : e.length; i--;)
            if (e[i] === t) return i;
        return -1
    }, T.range = function(e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        for (var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, o = new Array(r); r > i;) o[i++] = e, e += n;
        return o
    };
    var j = function() {};
    T.bind = function(e, t) {
        var n, r;
        if (k && e.bind === k) return k.apply(e, s.call(arguments, 1));
        if (!T.isFunction(e)) throw new TypeError;
        return n = s.call(arguments, 2), r = function() {
            if (!(this instanceof r)) return e.apply(t, n.concat(s.call(arguments)));
            j.prototype = e.prototype;
            var i = new j;
            j.prototype = null;
            var o = e.apply(i, n.concat(s.call(arguments)));
            return Object(o) === o ? o : i
        }
    }, T.partial = function(e) {
        var t = s.call(arguments, 1);
        return function() {
            for (var n = 0, r = t.slice(), i = 0, o = r.length; o > i; i++) r[i] === T && (r[i] = arguments[n++]);
            for (; n < arguments.length;) r.push(arguments[n++]);
            return e.apply(this, r)
        }
    }, T.bindAll = function(e) {
        var t = s.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        return C(t, function(t) {
            e[t] = T.bind(e[t], e)
        }), e
    }, T.memoize = function(e, t) {
        var n = {};
        return t || (t = T.identity),
            function() {
                var r = t.apply(this, arguments);
                return T.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
            }
    }, T.delay = function(e, t) {
        var n = s.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n)
        }, t)
    }, T.defer = function(e) {
        return T.delay.apply(T, [e, 1].concat(s.call(arguments, 1)))
    }, T.throttle = function(e, t, n) {
        var r, i, o, a = null,
            s = 0;
        n || (n = {});
        var u = function() {
            s = n.leading === !1 ? 0 : T.now(), a = null, o = e.apply(r, i), r = i = null
        };
        return function() {
            var l = T.now();
            s || n.leading !== !1 || (s = l);
            var c = t - (l - s);
            return r = this, i = arguments, 0 >= c ? (clearTimeout(a), a = null, s = l, o = e.apply(r, i), r = i = null) : a || n.trailing === !1 || (a = setTimeout(u, c)), o
        }
    }, T.debounce = function(e, t, n) {
        var r, i, o, a, s, u = function() {
            var l = T.now() - a;
            t > l ? r = setTimeout(u, t - l) : (r = null, n || (s = e.apply(o, i), o = i = null))
        };
        return function() {
            o = this, i = arguments, a = T.now();
            var l = n && !r;
            return r || (r = setTimeout(u, t)), l && (s = e.apply(o, i), o = i = null), s
        }
    }, T.once = function(e) {
        var t, n = !1;
        return function() {
            return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
        }
    }, T.wrap = function(e, t) {
        return T.partial(t, e)
    }, T.compose = function() {
        var e = arguments;
        return function() {
            for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
            return t[0]
        }
    }, T.after = function(e, t) {
        return function() {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }, T.keys = function(e) {
        if (!T.isObject(e)) return [];
        if (w) return w(e);
        var t = [];
        for (var n in e) T.has(e, n) && t.push(n);
        return t
    }, T.values = function(e) {
        for (var t = T.keys(e), n = t.length, r = new Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
        return r
    }, T.pairs = function(e) {
        for (var t = T.keys(e), n = t.length, r = new Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
        return r
    }, T.invert = function(e) {
        for (var t = {}, n = T.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
        return t
    }, T.functions = T.methods = function(e) {
        var t = [];
        for (var n in e) T.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, T.extend = function(e) {
        return C(s.call(arguments, 1), function(t) {
            if (t)
                for (var n in t) e[n] = t[n]
        }), e
    }, T.pick = function(e) {
        var t = {},
            n = u.apply(r, s.call(arguments, 1));
        return C(n, function(n) {
            n in e && (t[n] = e[n])
        }), t
    }, T.omit = function(e) {
        var t = {},
            n = u.apply(r, s.call(arguments, 1));
        for (var i in e) T.contains(n, i) || (t[i] = e[i]);
        return t
    }, T.defaults = function(e) {
        return C(s.call(arguments, 1), function(t) {
            if (t)
                for (var n in t) void 0 === e[n] && (e[n] = t[n])
        }), e
    }, T.clone = function(e) {
        return T.isObject(e) ? T.isArray(e) ? e.slice() : T.extend({}, e) : e
    }, T.tap = function(e, t) {
        return t(e), e
    };
    var L = function(e, t, n, r) {
        if (e === t) return 0 !== e || 1 / e == 1 / t;
        if (null == e || null == t) return e === t;
        e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
        var i = l.call(e);
        if (i != l.call(t)) return !1;
        switch (i) {
            case "[object String]":
                return e == String(t);
            case "[object Number]":
                return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e == +t;
            case "[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof e || "object" != typeof t) return !1;
        for (var o = n.length; o--;)
            if (n[o] == e) return r[o] == t;
        var a = e.constructor,
            s = t.constructor;
        if (a !== s && !(T.isFunction(a) && a instanceof a && T.isFunction(s) && s instanceof s) && "constructor" in e && "constructor" in t) return !1;
        n.push(e), r.push(t);
        var u = 0,
            c = !0;
        if ("[object Array]" == i) {
            if (u = e.length, c = u == t.length)
                for (; u-- && (c = L(e[u], t[u], n, r)););
        } else {
            for (var f in e)
                if (T.has(e, f) && (u++, !(c = T.has(t, f) && L(e[f], t[f], n, r)))) break;
            if (c) {
                for (f in t)
                    if (T.has(t, f) && !u--) break;
                c = !u
            }
        }
        return n.pop(), r.pop(), c
    };
    T.isEqual = function(e, t) {
        return L(e, t, [], [])
    }, T.isEmpty = function(e) {
        if (null == e) return !0;
        if (T.isArray(e) || T.isString(e)) return 0 === e.length;
        for (var t in e)
            if (T.has(e, t)) return !1;
        return !0
    }, T.isElement = function(e) {
        return !(!e || 1 !== e.nodeType)
    }, T.isArray = x || function(e) {
        return "[object Array]" == l.call(e)
    }, T.isObject = function(e) {
        return e === Object(e)
    }, C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        T["is" + e] = function(t) {
            return l.call(t) == "[object " + e + "]"
        }
    }), T.isArguments(arguments) || (T.isArguments = function(e) {
        return !(!e || !T.has(e, "callee"))
    }), "function" != typeof /./ && (T.isFunction = function(e) {
        return "function" == typeof e
    }), T.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, T.isNaN = function(e) {
        return T.isNumber(e) && e != +e
    }, T.isBoolean = function(e) {
        return e === !0 || e === !1 || "[object Boolean]" == l.call(e)
    }, T.isNull = function(e) {
        return null === e
    }, T.isUndefined = function(e) {
        return void 0 === e
    }, T.has = function(e, t) {
        return c.call(e, t)
    }, T.noConflict = function() {
        return e._ = t, this
    }, T.identity = function(e) {
        return e
    }, T.constant = function(e) {
        return function() {
            return e
        }
    }, T.property = function(e) {
        return function(t) {
            return t[e]
        }
    }, T.matches = function(e) {
        return function(t) {
            if (t === e) return !0;
            for (var n in e)
                if (e[n] !== t[n]) return !1;
            return !0
        }
    }, T.times = function(e, t, n) {
        for (var r = Array(Math.max(0, e)), i = 0; e > i; i++) r[i] = t.call(n, i);
        return r
    }, T.random = function(e, t) {
        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    }, T.now = Date.now || function() {
        return (new Date).getTime()
    };
    var D = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    D.unescape = T.invert(D.escape);
    var q = {
        escape: new RegExp("[" + T.keys(D.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + T.keys(D.unescape).join("|") + ")", "g")
    };
    T.each(["escape", "unescape"], function(e) {
        T[e] = function(t) {
            return null == t ? "" : ("" + t).replace(q[e], function(t) {
                return D[e][t]
            })
        }
    }), T.result = function(e, t) {
        if (null == e) return void 0;
        var n = e[t];
        return T.isFunction(n) ? n.call(e) : n
    }, T.mixin = function(e) {
        C(T.functions(e), function(t) {
            var n = T[t] = e[t];
            T.prototype[t] = function() {
                var e = [this._wrapped];
                return a.apply(e, arguments), F.call(this, n.apply(T, e))
            }
        })
    };
    var O = 0;
    T.uniqueId = function(e) {
        var t = ++O + "";
        return e ? e + t : t
    }, T.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var H = /(.)^/,
        M = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        $ = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    T.template = function(e, t, n) {
        var r;
        n = T.defaults({}, n, T.templateSettings);
        var i = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"),
            o = 0,
            a = "__p+='";
        e.replace(i, function(t, n, r, i, s) {
            return a += e.slice(o, s).replace($, function(e) {
                return "\\" + M[e]
            }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (a += "';\n" + i + "\n__p+='"), o = s + t.length, t
        }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            r = new Function(n.variable || "obj", "_", a)
        } catch (s) {
            throw s.source = a, s
        }
        if (t) return r(t, T);
        var u = function(e) {
            return r.call(this, e, T)
        };
        return u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", u
    }, T.chain = function(e) {
        return T(e).chain()
    };
    var F = function(e) {
        return this._chain ? T(e).chain() : e
    };
    T.mixin(T), C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = r[e];
        T.prototype[e] = function() {
            var n = this._wrapped;
            return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], F.call(this, n)
        }
    }), C(["concat", "join", "slice"], function(e) {
        var t = r[e];
        T.prototype[e] = function() {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }), T.extend(T.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    }), "function" == typeof define && define.amd && define("underscore", [], function() {
        return T
    })
}.call(this),
    function() {
        function e(e) {
            this.tokens = [], this.tokens.links = {}, this.options = e || l.defaults, this.rules = c.normal, this.options.gfm && (this.rules = this.options.tables ? c.tables : c.gfm)
        }

        function t(e, t) {
            if (this.options = t || l.defaults, this.links = e, this.rules = f.normal, this.renderer = this.options.renderer || new n, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
            this.options.gfm ? this.rules = this.options.breaks ? f.breaks : f.gfm : this.options.pedantic && (this.rules = f.pedantic)
        }

        function n(e) {
            this.options = e || {}
        }

        function r(e) {
            this.tokens = [], this.token = null, this.options = e || l.defaults, this.options.renderer = this.options.renderer || new n, this.renderer = this.options.renderer, this.renderer.options = this.options
        }

        function i(e, t) {
            return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }

        function o(e) {
            return e.replace(/&([#\w]+);/g, function(e, t) {
                return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? String.fromCharCode("x" === t.charAt(1) ? parseInt(t.substring(2), 16) : +t.substring(1)) : ""
            })
        }

        function a(e, t) {
            return e = e.source, t = t || "",
                function n(r, i) {
                    return r ? (i = i.source || i, i = i.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, i), n) : new RegExp(e, t)
                }
        }

        function s() {}

        function u(e) {
            for (var t, n, r = 1; r < arguments.length; r++) {
                t = arguments[r];
                for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            return e
        }

        function l(t, n, o) {
            if (o || "function" == typeof n) {
                o || (o = n, n = null), n = u({}, l.defaults, n || {});
                var a, s, c = n.highlight,
                    f = 0;
                try {
                    a = e.lex(t, n)
                } catch (p) {
                    return o(p)
                }
                s = a.length;
                var d = function(e) {
                    if (e) return n.highlight = c, o(e);
                    var t;
                    try {
                        t = r.parse(a, n)
                    } catch (i) {
                        e = i
                    }
                    return n.highlight = c, e ? o(e) : o(null, t)
                };
                if (!c || c.length < 3) return d();
                if (delete n.highlight, !s) return d();
                for (; f < a.length; f++) ! function(e) {
                    return "code" !== e.type ? --s || d() : c(e.text, e.lang, function(t, n) {
                        return t ? d(t) : null == n || n === e.text ? --s || d() : (e.text = n, e.escaped = !0, void(--s || d()))
                    })
                }(a[f])
            } else try {
                return n && (n = u({}, l.defaults, n)), r.parse(e.lex(t, n), n)
            } catch (p) {
                if (p.message += "\nPlease report this to https://github.com/chjj/marked.", (n || l.defaults).silent) return "<p>An error occured:</p><pre>" + i(p.message + "", !0) + "</pre>";
                throw p
            }
        }
        var c = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            fences: s,
            hr: /^( *[-*_]){3,} *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
            nptable: s,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
            list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
            table: s,
            paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
            text: /^[^\n]+/
        };
        c.bullet = /(?:[*+-]|\d+\.)/, c.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, c.item = a(c.item, "gm")(/bull/g, c.bullet)(), c.list = a(c.list)(/bull/g, c.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + c.def.source + ")")(), c.blockquote = a(c.blockquote)("def", c.def)(), c._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", c.html = a(c.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, c._tag)(), c.paragraph = a(c.paragraph)("hr", c.hr)("heading", c.heading)("lheading", c.lheading)("blockquote", c.blockquote)("tag", "<" + c._tag)("def", c.def)(), c.normal = u({}, c), c.gfm = u({}, c.normal, {
            fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
            paragraph: /^/
        }), c.gfm.paragraph = a(c.paragraph)("(?!", "(?!" + c.gfm.fences.source.replace("\\1", "\\2") + "|" + c.list.source.replace("\\1", "\\3") + "|")(), c.tables = u({}, c.gfm, {
            nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
            table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
        }), e.rules = c, e.lex = function(t, n) {
            var r = new e(n);
            return r.lex(t)
        }, e.prototype.lex = function(e) {
            return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
        }, e.prototype.token = function(e, t, n) {
            for (var r, i, o, a, s, u, l, f, p, e = e.replace(/^ +$/gm, ""); e;)
                if ((o = this.rules.newline.exec(e)) && (e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({
                        type: "space"
                    })), o = this.rules.code.exec(e)) e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({
                    type: "code",
                    text: this.options.pedantic ? o : o.replace(/\n+$/, "")
                });
                else if (o = this.rules.fences.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: "code",
                lang: o[2],
                text: o[3]
            });
            else if (o = this.rules.heading.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: "heading",
                depth: o[1].length,
                text: o[2]
            });
            else if (t && (o = this.rules.nptable.exec(e))) {
                for (e = e.substring(o[0].length), u = {
                        type: "table",
                        header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                        align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                        cells: o[3].replace(/\n$/, "").split("\n")
                    }, f = 0; f < u.align.length; f++) u.align[f] = /^ *-+: *$/.test(u.align[f]) ? "right" : /^ *:-+: *$/.test(u.align[f]) ? "center" : /^ *:-+ *$/.test(u.align[f]) ? "left" : null;
                for (f = 0; f < u.cells.length; f++) u.cells[f] = u.cells[f].split(/ *\| */);
                this.tokens.push(u)
            } else if (o = this.rules.lheading.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: "heading",
                depth: "=" === o[2] ? 1 : 2,
                text: o[1]
            });
            else if (o = this.rules.hr.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: "hr"
            });
            else if (o = this.rules.blockquote.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: "blockquote_start"
            }), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, t, !0), this.tokens.push({
                type: "blockquote_end"
            });
            else if (o = this.rules.list.exec(e)) {
                for (e = e.substring(o[0].length), a = o[2], this.tokens.push({
                        type: "list_start",
                        ordered: a.length > 1
                    }), o = o[0].match(this.rules.item), r = !1, p = o.length, f = 0; p > f; f++) u = o[f], l = u.length, u = u.replace(/^ *([*+-]|\d+\.) +/, ""), ~u.indexOf("\n ") && (l -= u.length, u = this.options.pedantic ? u.replace(/^ {1,4}/gm, "") : u.replace(new RegExp("^ {1," + l + "}", "gm"), "")), this.options.smartLists && f !== p - 1 && (s = c.bullet.exec(o[f + 1])[0], a === s || a.length > 1 && s.length > 1 || (e = o.slice(f + 1).join("\n") + e, f = p - 1)), i = r || /\n\n(?!\s*$)/.test(u), f !== p - 1 && (r = "\n" === u.charAt(u.length - 1), i || (i = r)), this.tokens.push({
                    type: i ? "loose_item_start" : "list_item_start"
                }), this.token(u, !1, n), this.tokens.push({
                    type: "list_item_end"
                });
                this.tokens.push({
                    type: "list_end"
                })
            } else if (o = this.rules.html.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: this.options.sanitize ? "paragraph" : "html",
                pre: "pre" === o[1] || "script" === o[1] || "style" === o[1],
                text: o[0]
            });
            else if (!n && t && (o = this.rules.def.exec(e))) e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = {
                href: o[2],
                title: o[3]
            };
            else if (t && (o = this.rules.table.exec(e))) {
                for (e = e.substring(o[0].length), u = {
                        type: "table",
                        header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                        align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                        cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                    }, f = 0; f < u.align.length; f++) u.align[f] = /^ *-+: *$/.test(u.align[f]) ? "right" : /^ *:-+: *$/.test(u.align[f]) ? "center" : /^ *:-+ *$/.test(u.align[f]) ? "left" : null;
                for (f = 0; f < u.cells.length; f++) u.cells[f] = u.cells[f].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                this.tokens.push(u)
            } else if (t && (o = this.rules.paragraph.exec(e))) e = e.substring(o[0].length), this.tokens.push({
                type: "paragraph",
                text: "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1]
            });
            else if (o = this.rules.text.exec(e)) e = e.substring(o[0].length), this.tokens.push({
                type: "text",
                text: o[0]
            });
            else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
            return this.tokens
        };
        var f = {
            escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
            autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
            url: s,
            tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
            link: /^!?\[(inside)\]\(href\)/,
            reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
            nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
            strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
            em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
            code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
            br: /^ {2,}\n(?!\s*$)/,
            del: s,
            text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
        };
        f._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, f._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, f.link = a(f.link)("inside", f._inside)("href", f._href)(), f.reflink = a(f.reflink)("inside", f._inside)(), f.normal = u({}, f), f.pedantic = u({}, f.normal, {
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
        }), f.gfm = u({}, f.normal, {
            escape: a(f.escape)("])", "~|])")(),
            url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
            del: /^~~(?=\S)([\s\S]*?\S)~~/,
            text: a(f.text)("]|", "~]|")("|", "|https?://|")()
        }), f.breaks = u({}, f.gfm, {
            br: a(f.br)("{2,}", "*")(),
            text: a(f.gfm.text)("{2,}", "*")()
        }), t.rules = f, t.output = function(e, n, r) {
            var i = new t(n, r);
            return i.output(e)
        }, t.prototype.output = function(e) {
            for (var t, n, r, o, a = ""; e;)
                if (o = this.rules.escape.exec(e)) e = e.substring(o[0].length), a += o[1];
                else if (o = this.rules.autolink.exec(e)) e = e.substring(o[0].length), "@" === o[2] ? (n = this.mangle(":" === o[1].charAt(6) ? o[1].substring(7) : o[1]), r = this.mangle("mailto:") + n) : (n = i(o[1]), r = n), a += this.renderer.link(r, null, n);
            else if (this.inLink || !(o = this.rules.url.exec(e))) {
                if (o = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(o[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(o[0]) && (this.inLink = !1), e = e.substring(o[0].length), a += this.options.sanitize ? i(o[0]) : o[0];
                else if (o = this.rules.link.exec(e)) e = e.substring(o[0].length), this.inLink = !0, a += this.outputLink(o, {
                    href: o[2],
                    title: o[3]
                }), this.inLink = !1;
                else if ((o = this.rules.reflink.exec(e)) || (o = this.rules.nolink.exec(e))) {
                    if (e = e.substring(o[0].length), t = (o[2] || o[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
                        a += o[0].charAt(0), e = o[0].substring(1) + e;
                        continue
                    }
                    this.inLink = !0, a += this.outputLink(o, t), this.inLink = !1
                } else if (o = this.rules.strong.exec(e)) e = e.substring(o[0].length), a += this.renderer.strong(this.output(o[2] || o[1]));
                else if (o = this.rules.em.exec(e)) e = e.substring(o[0].length), a += this.renderer.em(this.output(o[2] || o[1]));
                else if (o = this.rules.code.exec(e)) e = e.substring(o[0].length), a += this.renderer.codespan(i(o[2], !0));
                else if (o = this.rules.br.exec(e)) e = e.substring(o[0].length), a += this.renderer.br();
                else if (o = this.rules.del.exec(e)) e = e.substring(o[0].length), a += this.renderer.del(this.output(o[1]));
                else if (o = this.rules.text.exec(e)) e = e.substring(o[0].length), a += i(this.smartypants(o[0]));
                else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
            } else e = e.substring(o[0].length), n = i(o[1]), r = n, a += this.renderer.link(r, null, n);
            return a
        }, t.prototype.outputLink = function(e, t) {
            var n = i(t.href),
                r = t.title ? i(t.title) : null;
            return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, i(e[1]))
        }, t.prototype.smartypants = function(e) {
            return this.options.smartypants ? e.replace(/--/g, "—").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
        }, t.prototype.mangle = function(e) {
            for (var t, n = "", r = e.length, i = 0; r > i; i++) t = e.charCodeAt(i), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
            return n
        }, n.prototype.code = function(e, t, n) {
            if (this.options.highlight) {
                var r = this.options.highlight(e, t);
                null != r && r !== e && (n = !0, e = r)
            }
            return t ? '<pre><code class="' + this.options.langPrefix + i(t, !0) + '">' + (n ? e : i(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : i(e, !0)) + "\n</code></pre>"
        }, n.prototype.blockquote = function(e) {
            return "<blockquote>\n" + e + "</blockquote>\n"
        }, n.prototype.html = function(e) {
            return e
        }, n.prototype.heading = function(e, t, n) {
            return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
        }, n.prototype.hr = function() {
            return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
        }, n.prototype.list = function(e, t) {
            var n = t ? "ol" : "ul";
            return "<" + n + ">\n" + e + "</" + n + ">\n"
        }, n.prototype.listitem = function(e) {
            return "<li>" + e + "</li>\n"
        }, n.prototype.paragraph = function(e) {
            return "<p>" + e + "</p>\n"
        }, n.prototype.table = function(e, t) {
            return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
        }, n.prototype.tablerow = function(e) {
            return "<tr>\n" + e + "</tr>\n"
        }, n.prototype.tablecell = function(e, t) {
            var n = t.header ? "th" : "td",
                r = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
            return r + e + "</" + n + ">\n"
        }, n.prototype.strong = function(e) {
            return "<strong>" + e + "</strong>"
        }, n.prototype.em = function(e) {
            return "<em>" + e + "</em>"
        }, n.prototype.codespan = function(e) {
            return "<code>" + e + "</code>"
        }, n.prototype.br = function() {
            return this.options.xhtml ? "<br/>" : "<br>"
        }, n.prototype.del = function(e) {
            return "<del>" + e + "</del>"
        }, n.prototype.link = function(e, t, n) {
            if (this.options.sanitize) {
                try {
                    var r = decodeURIComponent(o(e)).replace(/[^\w:]/g, "").toLowerCase()
                } catch (i) {
                    return ""
                }
                if (0 === r.indexOf("javascript:")) return ""
            }
            var a = '<a href="' + e + '"';
            return t && (a += ' title="' + t + '"'), a += ">" + n + "</a>"
        }, n.prototype.image = function(e, t, n) {
            var r = '<img src="' + e + '" alt="' + n + '"';
            return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">"
        }, r.parse = function(e, t, n) {
            var i = new r(t, n);
            return i.parse(e)
        }, r.prototype.parse = function(e) {
            this.inline = new t(e.links, this.options, this.renderer), this.tokens = e.reverse();
            for (var n = ""; this.next();) n += this.tok();
            return n
        }, r.prototype.next = function() {
            return this.token = this.tokens.pop()
        }, r.prototype.peek = function() {
            return this.tokens[this.tokens.length - 1] || 0
        }, r.prototype.parseText = function() {
            for (var e = this.token.text;
                "text" === this.peek().type;) e += "\n" + this.next().text;
            return this.inline.output(e)
        }, r.prototype.tok = function() {
            switch (this.token.type) {
                case "space":
                    return "";
                case "hr":
                    return this.renderer.hr();
                case "heading":
                    return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
                case "code":
                    return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                case "table":
                    var e, t, n, r, i, o = "",
                        a = "";
                    for (n = "", e = 0; e < this.token.header.length; e++) r = {
                        header: !0,
                        align: this.token.align[e]
                    }, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                        header: !0,
                        align: this.token.align[e]
                    });
                    for (o += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
                        for (t = this.token.cells[e], n = "", i = 0; i < t.length; i++) n += this.renderer.tablecell(this.inline.output(t[i]), {
                            header: !1,
                            align: this.token.align[i]
                        });
                        a += this.renderer.tablerow(n)
                    }
                    return this.renderer.table(o, a);
                case "blockquote_start":
                    for (var a = "";
                        "blockquote_end" !== this.next().type;) a += this.tok();
                    return this.renderer.blockquote(a);
                case "list_start":
                    for (var a = "", s = this.token.ordered;
                        "list_end" !== this.next().type;) a += this.tok();
                    return this.renderer.list(a, s);
                case "list_item_start":
                    for (var a = "";
                        "list_item_end" !== this.next().type;) a += "text" === this.token.type ? this.parseText() : this.tok();
                    return this.renderer.listitem(a);
                case "loose_item_start":
                    for (var a = "";
                        "list_item_end" !== this.next().type;) a += this.tok();
                    return this.renderer.listitem(a);
                case "html":
                    var u = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
                    return this.renderer.html(u);
                case "paragraph":
                    return this.renderer.paragraph(this.inline.output(this.token.text));
                case "text":
                    return this.renderer.paragraph(this.parseText())
            }
        }, s.exec = s, l.options = l.setOptions = function(e) {
            return u(l.defaults, e), l
        }, l.defaults = {
            gfm: !0,
            tables: !0,
            breaks: !1,
            pedantic: !1,
            sanitize: !1,
            smartLists: !1,
            silent: !1,
            highlight: null,
            langPrefix: "lang-",
            smartypants: !1,
            headerPrefix: "",
            renderer: new n,
            xhtml: !1
        }, l.Parser = r, l.parser = r.parse, l.Renderer = n, l.Lexer = e, l.lexer = e.lex, l.InlineLexer = t, l.inlineLexer = t.output, l.parse = l, "undefined" != typeof module && "object" == typeof exports ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
            return l
        }) : this.marked = l
    }.call(function() {
        return this || ("undefined" != typeof window ? window : global)
    }());
var LZString = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _f: String.fromCharCode,
    compressToBase64: function(e) {
        if (null == e) return "";
        var t, n, r, i, o, a, s, u = "",
            l = 0;
        for (e = LZString.compress(e); l < 2 * e.length;) l % 2 == 0 ? (t = e.charCodeAt(l / 2) >> 8, n = 255 & e.charCodeAt(l / 2), r = l / 2 + 1 < e.length ? e.charCodeAt(l / 2 + 1) >> 8 : 0 / 0) : (t = 255 & e.charCodeAt((l - 1) / 2), (l + 1) / 2 < e.length ? (n = e.charCodeAt((l + 1) / 2) >> 8, r = 255 & e.charCodeAt((l + 1) / 2)) : n = r = 0 / 0), l += 3, i = t >> 2, o = (3 & t) << 4 | n >> 4, a = (15 & n) << 2 | r >> 6, s = 63 & r, isNaN(n) ? a = s = 64 : isNaN(r) && (s = 64), u = u + LZString._keyStr.charAt(i) + LZString._keyStr.charAt(o) + LZString._keyStr.charAt(a) + LZString._keyStr.charAt(s);
        return u;

    },
    decompressFromBase64: function(e) {
        if (null == e) return "";
        var t, n, r, i, o, a, s, u, l = "",
            c = 0,
            f = 0,
            p = LZString._f;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); f < e.length;) o = LZString._keyStr.indexOf(e.charAt(f++)), a = LZString._keyStr.indexOf(e.charAt(f++)), s = LZString._keyStr.indexOf(e.charAt(f++)), u = LZString._keyStr.indexOf(e.charAt(f++)), n = o << 2 | a >> 4, r = (15 & a) << 4 | s >> 2, i = (3 & s) << 6 | u, c % 2 == 0 ? (t = n << 8, 64 != s && (l += p(t | r)), 64 != u && (t = i << 8)) : (l += p(t | n), 64 != s && (t = r << 8), 64 != u && (l += p(t | i))), c += 3;
        return LZString.decompress(l)
    },
    compressToUTF16: function(e) {
        if (null == e) return "";
        var t, n, r, i = "",
            o = 0,
            a = LZString._f;
        for (e = LZString.compress(e), t = 0; t < e.length; t++) switch (n = e.charCodeAt(t), o++) {
            case 0:
                i += a((n >> 1) + 32), r = (1 & n) << 14;
                break;
            case 1:
                i += a(r + (n >> 2) + 32), r = (3 & n) << 13;
                break;
            case 2:
                i += a(r + (n >> 3) + 32), r = (7 & n) << 12;
                break;
            case 3:
                i += a(r + (n >> 4) + 32), r = (15 & n) << 11;
                break;
            case 4:
                i += a(r + (n >> 5) + 32), r = (31 & n) << 10;
                break;
            case 5:
                i += a(r + (n >> 6) + 32), r = (63 & n) << 9;
                break;
            case 6:
                i += a(r + (n >> 7) + 32), r = (127 & n) << 8;
                break;
            case 7:
                i += a(r + (n >> 8) + 32), r = (255 & n) << 7;
                break;
            case 8:
                i += a(r + (n >> 9) + 32), r = (511 & n) << 6;
                break;
            case 9:
                i += a(r + (n >> 10) + 32), r = (1023 & n) << 5;
                break;
            case 10:
                i += a(r + (n >> 11) + 32), r = (2047 & n) << 4;
                break;
            case 11:
                i += a(r + (n >> 12) + 32), r = (4095 & n) << 3;
                break;
            case 12:
                i += a(r + (n >> 13) + 32), r = (8191 & n) << 2;
                break;
            case 13:
                i += a(r + (n >> 14) + 32), r = (16383 & n) << 1;
                break;
            case 14:
                i += a(r + (n >> 15) + 32, (32767 & n) + 32), o = 0
        }
        return i + a(r + 32)
    },
    decompressFromUTF16: function(e) {
        if (null == e) return "";
        for (var t, n, r = "", i = 0, o = 0, a = LZString._f; o < e.length;) {
            switch (n = e.charCodeAt(o) - 32, i++) {
                case 0:
                    t = n << 1;
                    break;
                case 1:
                    r += a(t | n >> 14), t = (16383 & n) << 2;
                    break;
                case 2:
                    r += a(t | n >> 13), t = (8191 & n) << 3;
                    break;
                case 3:
                    r += a(t | n >> 12), t = (4095 & n) << 4;
                    break;
                case 4:
                    r += a(t | n >> 11), t = (2047 & n) << 5;
                    break;
                case 5:
                    r += a(t | n >> 10), t = (1023 & n) << 6;
                    break;
                case 6:
                    r += a(t | n >> 9), t = (511 & n) << 7;
                    break;
                case 7:
                    r += a(t | n >> 8), t = (255 & n) << 8;
                    break;
                case 8:
                    r += a(t | n >> 7), t = (127 & n) << 9;
                    break;
                case 9:
                    r += a(t | n >> 6), t = (63 & n) << 10;
                    break;
                case 10:
                    r += a(t | n >> 5), t = (31 & n) << 11;
                    break;
                case 11:
                    r += a(t | n >> 4), t = (15 & n) << 12;
                    break;
                case 12:
                    r += a(t | n >> 3), t = (7 & n) << 13;
                    break;
                case 13:
                    r += a(t | n >> 2), t = (3 & n) << 14;
                    break;
                case 14:
                    r += a(t | n >> 1), t = (1 & n) << 15;
                    break;
                case 15:
                    r += a(t | n), i = 0
            }
            o++
        }
        return LZString.decompress(r)
    },
    compress: function(e) {
        if (null == e) return "";
        var t, n, r, i = {},
            o = {},
            a = "",
            s = "",
            u = "",
            l = 2,
            c = 3,
            f = 2,
            p = "",
            d = 0,
            h = 0,
            g = LZString._f;
        for (r = 0; r < e.length; r += 1)
            if (a = e.charAt(r), Object.prototype.hasOwnProperty.call(i, a) || (i[a] = c++, o[a] = !0), s = u + a, Object.prototype.hasOwnProperty.call(i, s)) u = s;
            else {
                if (Object.prototype.hasOwnProperty.call(o, u)) {
                    if (u.charCodeAt(0) < 256) {
                        for (t = 0; f > t; t++) d <<= 1, 15 == h ? (h = 0, p += g(d), d = 0) : h++;
                        for (n = u.charCodeAt(0), t = 0; 8 > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1
                    } else {
                        for (n = 1, t = 0; f > t; t++) d = d << 1 | n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n = 0;
                        for (n = u.charCodeAt(0), t = 0; 16 > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1
                    }
                    l--, 0 == l && (l = Math.pow(2, f), f++), delete o[u]
                } else
                    for (n = i[u], t = 0; f > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1;
                l--, 0 == l && (l = Math.pow(2, f), f++), i[s] = c++, u = String(a)
            }
        if ("" !== u) {
            if (Object.prototype.hasOwnProperty.call(o, u)) {
                if (u.charCodeAt(0) < 256) {
                    for (t = 0; f > t; t++) d <<= 1, 15 == h ? (h = 0, p += g(d), d = 0) : h++;
                    for (n = u.charCodeAt(0), t = 0; 8 > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1
                } else {
                    for (n = 1, t = 0; f > t; t++) d = d << 1 | n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n = 0;
                    for (n = u.charCodeAt(0), t = 0; 16 > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1
                }
                l--, 0 == l && (l = Math.pow(2, f), f++), delete o[u]
            } else
                for (n = i[u], t = 0; f > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1;
            l--, 0 == l && (l = Math.pow(2, f), f++)
        }
        for (n = 2, t = 0; f > t; t++) d = d << 1 | 1 & n, 15 == h ? (h = 0, p += g(d), d = 0) : h++, n >>= 1;
        for (;;) {
            if (d <<= 1, 15 == h) {
                p += g(d);
                break
            }
            h++
        }
        return p
    },
    decompress: function(e) {
        if (null == e) return "";
        if ("" == e) return null;
        var t, n, r, i, o, a, s, u, l = [],
            c = 4,
            f = 4,
            p = 3,
            d = "",
            h = "",
            g = LZString._f,
            m = {
                string: e,
                val: e.charCodeAt(0),
                position: 32768,
                index: 1
            };
        for (n = 0; 3 > n; n += 1) l[n] = n;
        for (i = 0, a = Math.pow(2, 2), s = 1; s != a;) o = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = 32768, m.val = m.string.charCodeAt(m.index++)), i |= (o > 0 ? 1 : 0) * s, s <<= 1;
        switch (t = i) {
            case 0:
                for (i = 0, a = Math.pow(2, 8), s = 1; s != a;) o = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = 32768, m.val = m.string.charCodeAt(m.index++)), i |= (o > 0 ? 1 : 0) * s, s <<= 1;
                u = g(i);
                break;
            case 1:
                for (i = 0, a = Math.pow(2, 16), s = 1; s != a;) o = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = 32768, m.val = m.string.charCodeAt(m.index++)), i |= (o > 0 ? 1 : 0) * s, s <<= 1;
                u = g(i);
                break;
            case 2:
                return ""
        }
        for (l[3] = u, r = h = u;;) {
            if (m.index > m.string.length) return "";
            for (i = 0, a = Math.pow(2, p), s = 1; s != a;) o = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = 32768, m.val = m.string.charCodeAt(m.index++)), i |= (o > 0 ? 1 : 0) * s, s <<= 1;
            switch (u = i) {
                case 0:
                    for (i = 0, a = Math.pow(2, 8), s = 1; s != a;) o = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = 32768, m.val = m.string.charCodeAt(m.index++)), i |= (o > 0 ? 1 : 0) * s, s <<= 1;
                    l[f++] = g(i), u = f - 1, c--;
                    break;
                case 1:
                    for (i = 0, a = Math.pow(2, 16), s = 1; s != a;) o = m.val & m.position, m.position >>= 1, 0 == m.position && (m.position = 32768, m.val = m.string.charCodeAt(m.index++)), i |= (o > 0 ? 1 : 0) * s, s <<= 1;
                    l[f++] = g(i), u = f - 1, c--;
                    break;
                case 2:
                    return h
            }
            if (0 == c && (c = Math.pow(2, p), p++), l[u]) d = l[u];
            else {
                if (u !== f) return null;
                d = r + r.charAt(0)
            }
            h += d, l[f++] = r + d.charAt(0), c--, r = d, 0 == c && (c = Math.pow(2, p), p++)
        }
    }
};
"undefined" != typeof module && null != module && (module.exports = LZString), _.extend(Passage.prototype, {
    render: function() {
        var e = _.template(_.unescape(this.source), {
            s: window.story.state,
            $: this._readyFunc
        });
        e = e.replace(/\/\*.*\*\//g, ""), e = e.replace(/^\/\/.*(\r\n?|\n)/g, "");
        for (var t = /\[[\r\n+]([^\]]*?)[\r\n+]\]\{(.*?)\}/g, n = _.bind(function(e, t, n) {
                return this._renderEl("div", t, n)
            }, this); t.test(e);) e = e.replace(t, n);
        for (var r = /\[(.*?)\]\{(.*?)\}/g, i = _.bind(function(e, t, n) {
                return this._renderEl("span", t, n)
            }, this); r.test(e);) e = e.replace(r, i);
        return e = e.replace(/\[\[(.*?)\]\]/g, function(e, t) {
            var n = t,
                r = t.indexOf("|");
            if (-1 != r) n = t.substr(0, r), t = t.substr(r + 1);
            else {
                var i = t.indexOf("->");
                if (-1 != i) n = t.substr(0, i), t = t.substr(i + 2);
                else {
                    var o = t.indexOf("<-"); - 1 != o && (n = t.substr(o + 2), t = t.substr(0, o))
                }
            }
            return /^\w+:\/\/\/?\w/i.test(t) ? '<a href="' + t + '">' + n + "</a>" : '<a href="javascript:void(0)" data-passage="' + _.escape(t) + '">' + n + "</a>"
        }), marked(e)
    },
    _readyFunc: function() {
        return 1 == arguments.length && "function" == typeof arguments[0] ? jQuery(window).one("showpassage:after", _.bind(arguments[0], jQuery("#passage"))) : jQuery.apply(window, arguments)
    },
    _renderEl: function(e, t, n) {
        var r = "<" + e;
        if (console.log("rendering", e, t, n), n) {
            "-" == n[0] && (r += ' style="display:none"');
            for (var i = [], o = null, a = /([#\.])([^#\.]+)/g, s = a.exec(n); null !== s;) {
                switch (s[1]) {
                    case "#":
                        o = s[2];
                        break;
                    case ".":
                        i.push(s[2]);
                        break;
                    default:
                        throw new Error("Don't know how to apply selector " + s[0])
                }
                s = a.exec(n)
            }
            null !== o && (r += ' id="' + o + '"'), i.length > 0 && (r += ' class="' + i.join(" ") + '"')
        }
        return r += ">", null !== t && (r += t), r + "</" + e + ">"
    }
}), _.extend(Story.prototype, {
    start: function() {
        $(window).on("popstate", function(e) {
            var t = e.originalEvent.state;
            t ? (this.state = t.state, this.history = t.history, this.checkpointName = t.checkpointName, this.show(this.history[this.history.length - 1], !0)) : this.history.length > 1 && (this.state = {}, this.history = [], this.checkpointName = "", this.show(this.startPassage, !0))
        }.bind(this)), $("body").on("click", "a[data-passage]", function(e) {
            this.show(_.unescape($(e.target).attr("data-passage")))
        }.bind(this)), $(window).on("hashchange", function() {
            this.restore(window.location.hash.replace("#", ""))
        }.bind(this)), window.onerror = function(e, t, n) {
            this.errorMessage && "string" == typeof this.errorMessage || (this.errorMessage = Story.prototype.errorMessage), this.ignoreErrors || (t && (e += " (" + t, n && (e += ": " + n), e += ")"), $("#passage").html(this.errorMessage.replace("%s", e)))
        }.bind(this), _.each(this.userStyles, function(e) {
            $("body").append("<style>" + e + "</style>")
        }), _.each(this.userScripts, function(script) {
            eval(script)
        }), $.event.trigger("startstory", {
            story: this
        }), "" !== window.location.hash && this.restore(window.location.hash.replace("#", "")) || (this.show(this.startPassage), this.atCheckpoint = !0)
    },
    passage: function(e) {
        return _.isNumber(e) ? this.passages[e] : _.isString(e) ? _.findWhere(this.passages, {
            name: e
        }) : void 0
    },
    show: function(e, t) {
        var n = this.passage(e);
        if (!n) throw new Error('There is no passage with the ID or name "' + e + '"');
        if ($.event.trigger("hidepassage", {
                passage: window.passage
            }), $.event.trigger("showpassage", {
                passage: window.passage
            }), !t) {
            this.history.push(n.id);
            try {
                this.atCheckpoint ? window.history.pushState({
                    state: this.state,
                    history: this.history,
                    checkpointName: this.checkpointName
                }, "", "") : window.history.replaceState({
                    state: this.state,
                    history: this.history,
                    checkpointName: this.checkpointName
                }, "", "")
            } catch (r) {
                $.event.trigger("checkpointfailed", {
                    error: r
                })
            }
        }
        window.passage = n, this.atCheckpoint = !1, $("#passage").html(n.render()), $.event.trigger("showpassage:after", {
            passage: n
        })
    },
    render: function(e) {
        var t = this.passage(e);
        if (!t) throw new Error("There is no passage with the ID or name " + e);
        return t.render()
    },
    checkpoint: function(e) {
        void 0 !== e ? (document.title = this.name + ": " + e, this.checkpointName = e) : this.checkpointName = "", this.atCheckpoint = !0, $.event.trigger("checkpoint", {
            name: e
        })
    },
    saveHash: function() {
        return LZString.compressToBase64(JSON.stringify({
            state: this.state,
            history: this.history,
            checkpointName: this.checkpointName
        }))
    },
    save: function() {
        $.event.trigger("save"), window.location.hash = this.saveHash()
    },
    restore: function(e) {
        $.event.trigger("restore");
        try {
            var t = JSON.parse(LZString.decompressFromBase64(e));
            this.state = t.state, this.history = t.history, this.checkpointName = t.checkpointName, this.show(this.history[this.history.length - 1], !0)
        } catch (n) {
            return $.event.trigger("restorefailed", {
                error: n
            }), !1
        }
        return $.event.trigger("restore:after"), !0
    }
}), $(document).ready(function() {
    window.story = new Story($("tw-storydata"))//, window.story.start()
});