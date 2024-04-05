/* Copyright (C) 2012 Microsoft Corporation */
 (function ()
 {
     var b = window, e = b.jQuery, f = b.Debug, g = b.wLive = {
         Core : {}, Controls : {}
     },
     a = b.$Config;
     a.handlerBaseUrl = a.handlerBaseUrl || "";
     if (!a.sd) {
         var d = document.domain, c = d.split(".");
         a.sd = c.length === 1 ? "" : "." + c[c.length - 2] + ".com"
     }
     a.mkt = a.mkt || "na";
     a.prop = a.prop || "X";
     if (typeof window.SymRealWinOpen !== "undefined") {
         window.open = window.SymRealWinOpen;
     }
 })();
 (function ()
 {
     var a = window, e = a.jQuery, g = a.wLive;
     a.$Version = "9.090515.0";
     a.CompatVersion = "9.100709.0";
     if (!a.$Debug) {
         a.$Debug = {
             enabled : false, trace : function () {}
         };
     }
     var b = a.document;
     a._d = b;
     a._ce = function (a)
     {
         return b.createElement(a);
     };
     a._ge = function (a)
     {
         return b.getElementById(a);
     };
     a._get = function (a)
     {
         return b.getElementsByTagName(a);
     };
     a._dh = b.head = b.head || a._get("head")[0];
     g.dh = e("#head")[0] || a._dh;
     var c;
     e(document).bind("propertychange", f);
     function f()
     {
         var a = document.title, b = document.location.hash;
         if (a != c) {
             if (b && a.indexOf(b) == a.length - b.length) {
                 document.title = c;
             }
             c = document.title;
         }
     }
     a.registerNamespace = d;
     function d()
     {
         for (var e = 0, i = arguments.length; e < i; e++)
         {
             var d = this, f = arguments[e].split(".");
             for (var c = 0, h = f.length; c < h; c++)
             {
                 var g = f[c], b = d[g];
                 if (!b) {
                     b = d[g] = {};
                 }
                 if (!b.__namespace)
                 {
                     if (c === 0 && arguments[e] !== "Sys") {
                         a.Sys.__rootNamespaces[Sys.__rootNamespaces.length] = b;
                     }
                     b.__namespace = true;
                     b.__typeName = f.slice(0, c + 1).join(".");
                     b.getName = function j()
                     {
                         return this.__typeName;
                     }
                 }
                 d = b;
             }
         }
         return d
     }
     d("Sys");
     if (!a.Sys.__rootNamespaces) {
         a.Sys.__rootNamespaces = [Sys];
     }
 })();
 (function ()
 {
     var c = window, x = c.jQuery, y = c.Debug, a = c.String.prototype;
     a.endsWith = function s(a)
     {
         return this.substr(this.length - a.length) == a;
     };
     a.startsWith = function p(a)
     {
         return this.substr(0, a.length) == a;
     };
     a.lTrim = function u()
     {
         return this.replace(/^\s*/, "");
     };
     a.rTrim = function v()
     {
         return this.replace(/\s*$/, "");
     };
     a.trim = function w()
     {
         return this.replace(/^\s+|\s+$/g, "");
     };
     var j = /\{\d+\}/g, h = /\{[a-z|A-Z|\.|\$|\:]+\}/g, d = /[\{\}]/g;
     a.format = function $String$format()
     {
         var b = arguments;
         function a(c)
         {
             var a = b[c.replace(d, "")];
             if (a == null) {
                 a = "";
             }
             return a
         }
         return this.replace(j, a);
     };
     function b(e, d)
     {
         var c = e.split("."), a = d;
         for (var b = 0; b < c.length; b++) {
             a = a[c[b]];
             if (typeof a === "undefined") {
                 return null;
             }
         }
         return a
     }
     a.itemFormat = function t(f, a, c)
     {
         a = a || {};
         c = c || [];
         function e(k)
         {
             var l = k.replace(d, ""), h, e = l.split(":"), g = "", j = b(e[0], f);
             if (j != null) {
                 g = j;
             }
             else {
                 var i = b(e[0], a);
                 if (i != null) {
                     g = i.apply(this, c);
                 }
             }
             if (e.length == 2) {
                 h = b(e[1], a);
             }
             return h ? h(g) : g
         }
         return this.replace(h, e);
     };
     var e = /[^\w.,-]/g;
     a.encodeXmlAttribute = a.encodeHtmlAttribute = function l()
     {
         return this.replace(e, function (a)
         {
             return ["&#", a.charCodeAt(0), ";"].join("");
         })
     };
     var f = /[^\w .,-]/g;
     a.encodeXml = a.encodeHtml = function n()
     {
         return this.replace(f, function (a)
         {
             return ["&#", a.charCodeAt(0), ";"].join("");
         })
     };
     var i = /[^\w.%-]/g;
     a.encodeURIComponent = a.encodeUrl = function r()
     {
         return encodeURIComponent(this).replace(i, function (b)
         {
             var a = b.charCodeAt(0).toString(16);
             return "%" + (a.length == 1 ? "0" + a : a).toUpperCase();
         })
     };
     var g = /[^\w .,-]/g;
     a.encodeJson = function o()
     {
         return this.replace(g, function (c)
         {
             var a = c.charCodeAt(0).toString(16), b = (new Array(4 - a.length + 1)).join("0");
             return "\\u" + b + a.toUpperCase();
         })
     };
     a.decodeURIComponent = a.decodeUrl = function q()
     {
         return decodeURIComponent(this);
     };
     var k = /([\\\.\{\}\(\)\[\]\/\+\*\?\|\^\$])/gi;
     a.escapeRegex = function m(a)
     {
         return (arguments.length == 0 ? this : a).replace(k, "\\$1");
     }
 })();
 (function ()
 {
     var w = window, jQuery = w.jQuery;
     w.wLive = w.wLive;
     var wl = w.wLive, Debug = window.Debug, _ConstDefaultDeliminator = "&", _ConstKeyValueDeliminator = "=";
     wl.truncateEllipsis = function UtilityTruncateEllipsis(b, a)
     {
         a = Math.max(parseInt(a, 10) || 1e5, 4);
         return b ? b.length > a ? b.substring(0, a - 3) + "..." : b : "";
     };
     var $Utility = w.$Utility = {};
     $Utility.eval = function (s)
     {
         eval(s)
     };
     $Utility.deserialize = function $Utility$deserialize(e, b, l, i)
     {
         var c = {};
         b = b || _ConstDefaultDeliminator;
         if (e)
         {
             var g = e.split(b), j = g.length, d = 0;
             for (; d < j; d++)
             {
                 var k = g[d], a = k.split(_ConstKeyValueDeliminator);
                 if (a.length > 0)
                 {
                     var h = a[0].trim();
                     a.splice(0, 1);
                     var f = a.join(_ConstKeyValueDeliminator).trim();
                     try {
                         c[h] = i ? f : f.decodeUrl()
                     }
                     catch (m) {
                         c[h] = "";
                     }
                 }
             }
         }
         return c;
     };
     $Utility.serialize = function $Utility$serialize(d, c, f)
     {
         c = c || _ConstDefaultDeliminator;
         var b = [];
         for (var e in d)
         {
             var a = d[e];
             a = a == null ? "" : a.toString();
             b.push(e, _ConstKeyValueDeliminator, f ? a : a.encodeUrl(), c)
         }
         if (b.length > 0) {
             b.pop();
         }
         return b.join("");
     };
     $Utility.updateObject = updateObject;
     function updateObject(d, e)
     {
         for (var c in e)
         {
             var a = d[c], b = e[c];
             if (b.constructor == Array) {
                 if (!a || a.constructor != Array) {
                     a = d[c] = [];
                 }
                 updateObject(a, b)
             }
             else if (typeof b == "object") {
                 if (typeof a != "object") {
                     a = d[c] = {};
                 }
                 updateObject(a, b)
             }
             else {
                 d[c] = b;
             }
         }
     }
     var ajaxInnerHtmlRegex = new RegExp('<script type="text/javascript"( src="([^"]*?)"){0,1}(( loadfirst="true")|( defer="defer")){0,1}( id="[^"]*?"){0,1}>([\\w\\W]*?)</scr' + "ipt>", 
     "gim"), debuggerAjaxInnerHtmlRegex = new RegExp("<script", "gim");
     function evalStringsAndAddScripts(c, b)
     {
         for (var a = 0; a < c.length; a++) {
             $Utility.eval(c[a]);
         }
         for (a = 0; a < b.length; a++) if (b[a] && b[a] != "") {
             var d = document.createElement("SCRIPT");
             d.src = b[a];
             document.body.appendChild(d)
         }
     }
     $Utility.ajaxInnerHtml = function $Utility$ajaxInnerHtml(i, d)
     {
         ajaxInnerHtmlRegex.lastIndex = 0;
         var b = [], h = [], g = [], f = [], e = [], c = 0, a;
         while (a = ajaxInnerHtmlRegex.exec(d))
         {
             b.push(d.substring(c, a.index));
             if (a[4] && a[4] != "") {
                 f.push(a[7]);
                 e.push(a[2])
             }
             else {
                 h.push(a[7]);
                 g.push(a[2])
             }
             c = ajaxInnerHtmlRegex.lastIndex
         }
         b.push(d.substring(c));
         evalStringsAndAddScripts(f, e);
         i.innerHTML = b.join("");
         evalStringsAndAddScripts(h, g)
     };
     $Utility.isHighContrast = function $Utility$isHighContrast()
     {
         if (typeof $Utility._isHighContrast === "undefined")
         {
             var a = jQuery("<span/>").css({
                 borderLeftColor : "red", borderRightColor : "blue", position : "absolute", top : "-999px"
             }).appendTo(document.body);
             $Utility._isHighContrast = a.css("borderLeftColor") === a.css("borderRightColor");
             a.remove()
         }
         return $Utility._isHighContrast;
     }
 })();
 (function ()
 {
     var a = window, k = a.jQuery, l = a.Debug, i = a.$Utility, m = a.wLive, f = a.$Beacon = {},
     b = [], h = 150;
     f.fire = function (f, e, d, c, a, b)
     {
         setTimeout(function ()
         {
             g(f, e, d, c, a, b)
         }, 0)
     };
     f.fireAndHold = function (c, a)
     {
         g(c, a);
         if (!$B.IE) {
             var b = (new Date).getTime() + h;
             while ((new Date).getTime() < b);
         }
     };
     function g(a, i, h, g, f)
     {
         var b = j();
         a = c(a, i);
         a = a.substr(0, Math.min(a.length, 2e3));
         if (!f) {
             a = c(a, {
                 r : Math.random() 
             });
         }
         d(b, e(h, b), e(g, b));
         b.src = a
     }
     function j()
     {
         var a, e = b.length;
         for (var c = 0; c < e; c++) {
             var d = b[c];
             if (!d.inUse) {
                 a = d;
                 break
             }
         }
         if (!a) {
             a = new Image;
             b.push(a)
         }
         a.inUse = true;
         return a
     }
     function e(a, b)
     {
         return function ()
         {
             d(b, null, null);
             b.inUse = false;
             if (a) {
                 a();
             }
         }
     }
     function d(a, c, b)
     {
         a.onload = c;
         a.onabort = a.onerror = b
     }
     function c(a, c)
     {
         a = a || "";
         if (c)
         {
             var e = i.serialize(c), b = "?";
             if (a.indexOf("?") >= 0) {
                 var d = a.charAt(a.length - 1);
                 b = d == "?" || d == "&" ? "" : "&"
             }
             a += b + e
         }
         return a;
     }
 })();
 (function ()
 {
     var b = window, g = b.Debug, a = Function, c = a.prototype;
     if (!a.createCallback) {
         a.createCallback = function d(b, a) 
         {
             return function () 
             {
                 return b.apply(this, a || []);
             }
         };
     }
     if (!a.createDelegate) {
         a.createDelegate = function e(b, a) 
         {
             return function () 
             {
                 return a.apply(b, arguments);
             }
         };
     }
     if (!c.invoke) {
         c.invoke = function f() 
         {
             this.apply(null, arguments) 
         };
     }
     b.$CD = Function.createDelegate;
     b.$CC = Function.createCallback;
 })();
 (function ()
 {
     var w = window, jQuery = w.jQuery, _object = w.Object;
     if (!_object.isString)
     {
         _object.isString = function $Object$isString(a) 
         {
             return typeof a === "string" || a && a.constructor === String;
         };
     }
     if (!_object.isArray) {
         _object.isArray = function $Object$isArray(a) 
         {
             return a instanceof Array;
         };
     }
     if (!_object.isFunction) {
         _object.isFunction = function $Object$isFunction(a) 
         {
             return typeof a === "function";
         };
     }
     if (!_object.isObject) {
         _object.isObject = function $Object$isObject(a) 
         {
             return a && typeof a === "object";
         };
     }
     if (!_object.isBoolean)
     {
         _object.isBoolean = function $Object$isBoolean(a) 
         {
             return typeof a === "boolean" || a && a.constructor === Boolean;
         };
     }
     if (!_object.isNumber)
     {
         _object.isNumber = function $Object$isNumber(a) 
         {
             return typeof a === "number" || a && a.constructor === Number;
         };
     }
     if (!_object.isNull) {
         _object.isNull = function $Object$isNull(a) 
         {
             return null == a || undefined == a;
         };
     }
     if (!_object.fromJSON)
     {
         _object.fromJSON = function $Object$fromJSON(text) 
         {
             try 
             {
                 if (typeof JSON !== "undefined" && JSON.parse) {
                     return JSON.parse(text);
                 }
                 else if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, {
                 "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return eval("(" + text + ")") ;
                 }
             }
             catch (a) {}
             return null;
         };
     }
     if (!_object.toJSON) _object.toJSON = function $Object$toJSON(a)
     {
         if (a === "") {
             return "";
         }
         if (typeof JSON !== "undefined" && JSON.stringify) {
             return JSON.stringify(a);
         }
         var d = _object.toJSON, b = "null";
         if (!_object.isNull(a))
         {
             if (_object.isArray(a)) {
                 b = [];
                 for (var c = 0; c < a.length; c++) {
                     b.push(d(a[c]));
                 }
                 b = "[" + b.join(",") + "]" 
             }
             else if (_object.isObject(a)) {
                 b = [];
                 for (var e in a) {
                     b.push('"' + e.encodeJson() + '":' + d(a[e]));
                 }
                 b = "{" + b.join(",") + "}" 
             }
             else if (_object.isString(a)) {
                 b = '"' + a.encodeJson() + '"';
             }
             else if (!_object.isFunction(a)) {
                 b = a.toString();
             }
             return b;
         }
     }
 })();
 (function ()
 {
     var b = window, k = b.Debug, j = b.jQuery, a = b.Array.prototype;
     if (!a.addRange) {
         a.addRange = function c(a) 
         {
             a && this.push.apply(this, a);
             return this;
         };
     }
     if (!a.exists) {
         a.exists = function f(a) 
         {
             return this.indexOf(a) >= 0;
         };
     }
     if (!a.contains) {
         a.contains = a.exists;
     }
     if (!a.clone) {
         a.clone = function i() 
         {
             return [].addRange(this);
         };
     }
     if (!a.indexOf)
     {
         a.indexOf = function e(c, a) 
         {
             var b = this.length;
             if ((a = a || 0) < 0) {
                 a = Math.max(0, b + a);
             }
             while (a < b) {
                 if (this [a++] === c) {
                     return a - 1;
                 }
                 return - 1;;
             }
         };
     }
     if (!a.forEach)
     {
         a.forEach = function d(c, b) 
         {
             var d = this.length;
             for (var a = 0; a < d; a++) {
                 c.call(b, this [a], a, this) ;
             }
         };
     }
     if (!a.insert) {
         a.insert = function g(a, b) 
         {
             this.splice(a, 0, b) 
         };
     }
     if (!a.remove) a.remove = function h(b)
     {
         var a = this.indexOf(b);
         if (a >= 0) {
             this.splice(a, 1);
         }
         return a >= 0;
     }
 })();
 (function ()
 {
     var a = window, c = a.jQuery;
     function b(a)
     {
         return function ()
         {
             for (var c = arguments.length, b = 0; b < c; b += a) {
                 this [arguments[b]] = arguments[b + a - 1];
             }
         }
     }
     a.$Flags = b(2);
     a.$Enum = b(1);
 })();
 (function ()
 {
     var d = window, e = d.jQuery, b = {};
     function c(a)
     {
         var c = b[a];
         if (!c) {
             b[a] = c = new RegExp("\\b" + a + "\\b", "ig");
         }
         return c
     }
     var a = d.$css = 
     {
         has : function (a, e)
         {
             var d = false;
             if (a && a.className) {
                 var b = c(e);
                 b.lastIndex = 0;
                 try {
                     d = b.test(a.className)
                 }
                 catch (f) {}
             }
             return d;
         },
         remove : function (c, b)
         {
             a.swap(c, b)
         },
         swap : function (d, e, b)
         {
             b = b || "";
             if (a.has(d, e))
             {
                 d.className = d.className.replace(c(e), b).replace(/^\s|\s\s|\s$/g, function (a) 
                 {
                     return a.substr(1);
                 });
             }
         },
         add : function (b, c)
         {
             if (b) {
                 if (b.className) {
                     if (!a.has(b, c)) {
                         b.className += " " + c ;
                     }
                 }
                 else {
                     b.className = c;
                 }
             }
         }
     }
 })();
 (function ()
 {
     var d = window, f = d.jQuery, b = window.setTimeout, a = [];
     window.smartSetTimeout = function e(d, g, f)
     {
         function h()
         {
             e(d, 0, f)
         }
         if (g) {
             b(h, g);
         }
         else {
             if (f) {
                 a.splice(0, 0, d);
             }
             else {
                 a.push(d);
             }
             if (a.length == 1) {
                 b(c, 0);
             }
         }
     };
     function c()
     {
         var f = a.length;
         if (f > 0)
         {
             try {
                 a.pop()()
             }
             catch (g) {
                 var e = d.$WebWatson;
                 if (e) {
                     e.submitFromException(g);
                 }
             }
             if (f > 1) {
                 b(c, 0);
             }
         }
     }
 })();
 (function ()
 {
     var b = window, u = b.jQuery, B = b.Debug, t = b.$Config, s = b.$Beacon, C = b.wLive, c = b.$WebWatson = {},
     w = b.$CC, x = b.$CD, v = b.$BSI, e = u(window);
     c.CB = {};
     var a = c.CB, o = 3, i = 10, n = 50, f = {
         First : "34", AfterUnload : "35", Multiple : "36", Download : "55"
     },
     d = 0, j = false;
     window.onerror = g;
     e.bind("beforeunload", l);
     e.bind("unload", m);
     a.IsHidden = function (b, a)
     {
         return a == "Error loading script";
     };
     c.foundException = function z()
     {
         return d > 0;
     };
     c.submitFromException = function y(a, b, f, e, h)
     {
         if (a && !a.traced)
         {
             a.traced = 1;
             var i = a.lineNumber || 0, d = a.message || a.description || (typeof a == "string" ? a : ""), 
             j = a.stack, c;
             try {
                 c = a.fileName || document.location.href
             }
             catch (k) {}
             if (b) {
                 d += "@" + b;
             }
             g(d, c, i, e, f, j, 1, h)
         }
     };
     c.submit = g;
     function g(c, e, k, g, b, B, A, F)
     {
         var u = t, D = u.BSI || {}, h = D.Watson || {};
         if (h && h.enabled && d < o)
         {
             d++;
             b = b || (d > 1 ? f.Multiple : f.First);
             var w = c && c.target;
             if (!e && w && w.tagName == "SCRIPT") {
                 e = w.src;
                 b = f.Download;
                 if (w.getAttribute("hideError") == "true") {
                     F = true;
                 }
             }
             var p = u.hn, n = r(!u.isSecure, A ? A + 2 : 2), i = B || (n ? n.join("\n") : ""), y = B || (n ? n[0] : "unknown"), 
             l = y ? y.toString() : y, z, m, E, q;
             try {
                 z = a.GetActions && a.GetActions()
             }
             catch (G) {}
             try {
                 E = a.IsIgnored && a.IsIgnored(b, c, e, k, p, l, i, g)
             }
             catch (G) {}
             try {
                 q = F || a.IsHidden && a.IsHidden(b, c, e, k, p, l, i, g)
             }
             catch (G) {}
             m = z ? z.join("\n") : "";
             if (!q && a.ErrorPresentation) {
                 try {
                     a.ErrorPresentation(b, c, e, k, p, l, i, m, g) 
                 }
                 catch (G) {}
             }
             if (!E)
             {
                 var x = 
                 {
                     sr : h.sr, biciNoLDParse : 1, ec : b, pn : D.pn, msg : c, url : e, ln : k, ih : q, 
                     an : j, ac : m, ad : g, cs : i.replace(/[ \t]+/ig, " ")
                 };
                 x = v.addHandlerDPs(x);
                 var C = u.handlerBaseUrl + "/handlers/Watson.mvc";
                 if (h.url) {
                     C = h.url;
                 }
                 s.fire(C, x, null, null, false, true);
                 if (a.ErrorOccurred) {
                     try {
                         a.ErrorOccurred(c, e, k, b, p, l, i, m, g, q) 
                     }
                     catch (G) {}
                 }
             }
         }
     }
     c.wrapCallback = function A(f, a, e)
     {
         a = a ? a : this;
         var d = w(f, e || Array.prototype.slice.call(arguments, 3)), b = x(a, d);
         if ($B.IE) {
             return b;
         }
         else return function ()
         {
             try {
                 return b()
             }
             catch (a) {
                 c.submitFromException(a)
             }
         }
     };
     function r(l, g)
     {
         var c;
         try {
             c = a.GetStack && a.GetStack()
         }
         catch (o) {}
         if (!c)
         {
             c = [];
             var b = arguments.callee;
             while (g > 0) {
                 b = b ? b.caller : b;
                 g--
             }
             var h = 0;
             while (b && h < i) {
                 c.push(b);
                 b = b.caller;
                 h++
             }
         }
         var n = c.length, j = [];
         for (var f = 0; f < n && f < i; f++)
         {
             var d = c[f], e = "InvalidMethod()";
             try {
                 e = d.toString()
             }
             catch (o) {}
             var m = l ? q(e, d.args || d.arguments) : "";
             e = e.replace(/\s\s*/ig, " ");
             j.push(k(d) + "(" + m + ")")
         }
         return j
     }
     function l()
     {
         j = true
     }
     function q(b, g)
     {
         var c = b.substring(b.indexOf("(") + 1, b.indexOf(")")), e = c ? c.split(",") : [], f = e.length, 
         d = [];
         for (var a = 0; a < f; a++) {
             d.push(e[a] + "=" + p(g[a]));
         }
         return d.join(",")
     }
     function p(b)
     {
         var c = typeof b, a;
         if (b == null) {
             a = "null";
         }
         else if (c == "string") {
             a = "'" + h(b, 13) + "'";
         }
         else if (c == "function")
         {
             a = k(b);
         }
         else if (c == "object")
         {
             if (b.toString && !$B.Safari) {
                 a = b.toString();
             }
             else {
                 a = c;
             }
             else if (c == "boolean" || c == "number") {
                 a = b.toString();
             }
             else {
                 a = "[" + c + "]";
             }
             return a;
         }
     }
     function h(a, b)
     {
         if (a && a.length > b) {
             a = a.substr(0, b - 3) + "...";
         }
         return a
     }
     function k(d)
     {
         var c = a.GetMethodName && a.GetMethodName(d);
         if (d && !c)
         {
             var b = d && d.toString ? d.toString() : "InvalidMethod()", e = b.indexOf(")") + 1, g = b.indexOf(" ") == 8 ? 9 : 0;
             c = b.substring(g, e);
             if (c.indexOf("function") == 0)
             {
                 var f = e + n;
                 b = b.replace(/\s\s*/ig, " ");
                 c = h(b, f) + (f < b.length ? "}" : "");
             }
         }
         return c
     }
     function m()
     {
         e.unbind("beforeunload", l);
         e.bind("unload", m)
     }
 })();
 (function ()
 {
     var b = window, h = b.jQuery, f = b.$WebWatson, e = b.$Static;
     if (!b.$Do) {
         b.$Do = {
             q : [], w : undefined 
         };
     }
     var a = window.$Do;
     a.r = [];
     a.removeItems = [];
     a.lock = 0;
     var c = h(document);
     c.bind("keydown", d);
     c.bind("mousedown", d);
     function d()
     {
         a.w = undefined
     }
     a.register = function j(b, h, g)
     {
         if (a.r[b]) {
             return;
         }
         a.r[b] = {
             method : h, skipTimeout : g
         };
         a.lock++;
         try
         {
             var e = 0;
             for (; e < a.q.length; e++) {
                 var c = a.q[e];
                 if (c.id == b && a.c(b, c.c, 0, c.a)) {
                     a.removeItems.push(c);
                 }
             }
             if (a.w) {
                 var d = a.w;
                 if (d.id == b) {
                     a.w = null;
                     a.c(b, d.c, 0, d.a)
                 }
             }
         }
         finally
         {
             a.lock--;
             if (a.lock == 0)
             {
                 for (var f = 0; f < a.removeItems.length; f++) {
                     a.q.remove(a.removeItems[f]);
                 }
                 a.removeItems = [];
             }
         }
     };
     a.unregister = function i(b)
     {
         if (a.r[b]) {
             delete a.r[b];
         }
     };
     a.c = function k(d, b, k, h, j)
     {
         var c = a.r && a.r[d];
         b = b ? b : this;
         function i()
         {
             var a = !!c.method, d = a ? c.method : h[2];
             f.wrapCallback(d, b, g(h, !a))()
         }
         if (c)
         {
             if (c.skipTimeout) {
                 i();
             }
             else {
                 setTimeout(i, 0);
             }
             else if (!!e) 
             {
                 var l = e.exec(d);
                 if (k && 2 == l) {
                     if (j) {
                         a.w = {
                             id : d, c : b, a : arguments 
                         };
                     }
                     else {
                         a.q.push({
                             id : d, c : b, a : h 
                         }) ;
                     }
                 }
             }
             return c;
         }
     };
     function g(b, a)
     {
         return Array.prototype.slice.call(b, a ? 3 : 2);
     }
 })();
 (function ()
 {
     var e = window, r = e.jQuery, b = e.$Utility, s = e.Debug, a = e.$Cookie = {},
     g = "wlxS", f = "wlxP", h, c, d;
     a.setPersistentCookie = function l(b, a)
     {
         j(b, a, 1)
     };
     a.getPersistentCookie = function k(a)
     {
         return i(a, 1);
     };
     a.setSessionCookie = function n(b, a)
     {
         j(b, a, 0)
     };
     a.getSessionCookie = function m(a)
     {
         return i(a, 0);
     };
     function j(j, e, i)
     {
         var h = i ? f : g, c = b.deserialize(a.getCookie(h, 1));
         if (e === null || e === undefined) {
             delete c[j];
         }
         else {
             c[j] = e;
         }
         var d = new Date;
         a.setCookie(h, b.serialize(c), $Config.sd, 0, i ? new Date(d.getFullYear() + 1, d.getMonth(), 
         d.getDay()) : 0, 1)
     }
     function i(h, d)
     {
         var c = d ? f : g, e = b.deserialize(a.getCookie(c, 1));
         return e[h]
     }
     a.getCookie = function p(f, a)
     {
         var g = document.cookie;
         if (g == h) {
             if (a && d) {
                 return d[f];
             }
             else if (!a && c) {
                 return c[f];
             }
         }
         else {
             c = 0;
             d = 0;
             h = g
         }
         var e = b.deserialize(document.cookie, ";", true, a);
         if (a) {
             d = e;
         }
         else {
             c = e;
         }
         return e[f];
     };
     a.deleteCookie = function o(c, b, d)
     {
         a.setCookie(c, "", b, d, new Date(2e3, 1, 1))
     };
     a.setCookie = function q(h, g, d, e, a, f)
     {
         var c = {};
         c[h] = g;
         document.cookie = "{0};path={1};{2}{3}".format(b.serialize(c, null, f), e ? e : "/", d ? "domain=" + d + ";" : "", 
         a ? "expires=" + a.toUTCString() + ";" : "");
     };
     $Do.register("$Cookie");
     $Do.register("$Cookie.setCookie")
 })();
 (function ()
 {
     var a = window, b = a.jQuery, g = a.$Beacon, h = a.$Cookie, j = a.Debug, e = a.smartSetTimeout, f = a.$Version, 
     d = a.wLive, c = a.$Network = new i;
     a.$LightNetwork = c;
     function i()
     {
         var j = this, q = $B.IE, t = [], k = {}, m = {}, i, n, r = true;
         j.requiresDomainLowering = function (a)
         {
             r = a;
         };
         j.getCookie = function (a)
         {
             return h.getCookie(a, 1);
         };
         j.fetchXML = function (j, a, h, o, g, i)
         {
             var e, c = l(j), n;
             h = h || "GET";
             function q(b)
             {
                 if (g) {
                     for (var a in g) {
                         b.setRequestHeader(a, g[a]);
                     }
                 }
             }
             function r(b)
             {
                 if (a) {
                     a(b, i);
                 }
             }
             if (c === p) {
                 e = b.ajax({
                     url : j, type : h, data : o, beforeSend : q, complete : r 
                 });
             }
             else
             {
                 var d = k[c] = k[c] || [], f = {
                     url : j, cb : a, v : h, postString : o, headers : g, c : i
                 };
                 if (n = m[c])
                 {
                     if (d.ready) {
                         n.contentWindow.fetchXML(f, null, null, a);
                         return e
                     }
                     else if (d.fail) {
                         if (a) {
                             a({
                                 status : 5e3 
                             }, i);
                         }
                         return e
                     }
                     d.push(f)
                 }
                 else {
                     d.push(f);
                     s(c, f)
                 }
             }
             return e;
         };
         j.fetchCSS = function (f, e, b)
         {
             var a = b || document.createElement("link"), h = setTimeout(c, 9e3);
             if (!b) {
                 a.rel = "stylesheet";
                 a.type = "text/css"
             }
             function c()
             {
                 clearTimeout(h);
                 if (!q) {
                     a.readyState = "complete";
                 }
                 a.onreadystatechange = function ()
                 {
                     if (a && a.onreadystatechange && ("loaded" === a.readyState || "complete" === a.readyState)) {
                         if (e) {
                             e(a);
                         }
                         a.onreadystatechange = null;
                     }
                 };
                 a.href = f;
                 if (!b) {
                     var c = d.dh;
                     c.appendChild(a)
                 }
                 if (!q) {
                     a.onreadystatechange();
                 }
             }
             g.fire(f, 0, c, c, 1);
             return a;
         };
         function w(d)
         {
             if (d.indexOf("window.") < 0) {
                 return false;
             }
             var c = d.split("."), a = window;
             for (var b = 1; b < c.length; b++) {
                 a = a[c[b]];
                 if (a === undefined) {
                     return false;
                 }
             }
             return true
         }
         j.fetchScript = function (i, f, c)
         {
             var h = d.dh, a = document.createElement("script");
             function g()
             {
                 if (!a.handled) if ("complete" === a.readyState || "loaded" === a.readyState)
                 {
                     a.handled = true;
                     b(a).unbind(".fetch");
                     if (c && !t[c] && !w(c)) {
                         h.removeChild(a);
                         j.fetchScript(i, f)
                     }
                     else if (f) {
                         f(a);
                     }
                 }
             }
             function k(a)
             {
                 g();
                 if (c) {
                     a.stopPropagation();
                 }
             }
             if (!q) {
                 a.readyState = "loaded";
             }
             a.async = true;
             a.type = "text/javascript";
             b(a).bind("readystatechange.fetch", g).bind("load.fetch", g).bind("error.fetch", k);
             e(function ()
             {
                 a.src = i;
                 h.appendChild(a)
             });
             return a;
         };
         j.registerScript = function (a)
         {
             t[a] = true;
         };
         function s(a, d)
         {
             o();
             var b = document.createElement("iframe");
             b.style.display = "none";
             function e()
             {
                 b.onload = null;
                 var c = k[a], e;
                 c.attempts = (c.attempts || 0) + 1;
                 if (c.attempts > 2 && !c.fail && !c.ready)
                 {
                     c.fail = true;
                     while (e = c.pop())
                     {
                         if (e.cb) {
                             e.cb({
                                 status : 5e3 
                             },
                             e.c);
                         }
                         $WebWatson.submitFromException(new Error("xmlProxy from " + a + " failed."));
                     }
                 }
                 else if (!c.ready) {
                     s(a, d);
                 }
             }
             function h()
             {
                 if (!k[a].ready && !k[a].fail) {
                     e();
                 }
             }
             if (a.endsWith(i) || a.indexOf(":") > 0 && a.substring(0, a.indexOf(":")).endsWith(i))
             {
                 document.body.insertBefore(b, document.body.firstChild);
                 b.onload = e;
                 var g = c.xmlProxyTimeout;
                 setTimeout(h, g ? g : 3e4);
                 m[a] = b;
                 b.src = location.protocol + "//" + a + "/xmlProxy.htm?vn=" + f + "&domain=" + i
             }
             else if (d.cb) {
                 d.cb({
                     status : 5e3 
                 },
                 d.c);
             }
         }
         j.Proxy = 
         {
             _registerProxy : function (f)
             {
                 var d, e = l(f.location.href, false), b = m[e], a = k[e], c = f["frameElement"];
                 if (!a.ready) {
                     if (b != c) {
                         b = m[e] = c;
                     }
                     a.fail = false;
                     a.ready = true
                 }
                 c.onload = null;
                 while (d = a.pop()) {
                     b.contentWindow.fetchXML(d, null, null, d.cb);
                 }
             }
         };
         function o()
         {
             if (!r) {
                 i = document.domain;
                 return
             }
             i = p;
             if (i.indexOf(":") > 0) {
                 i = i.substring(0, i.indexOf(":"));
             }
             if ($Config.domain && !$Config.domain.endsWith(".")) {
                 document.domain = $Config.domain;
             }
             else if (i.endsWith(".com"))
             {
                 var a = i.indexOf(".");
                 if (a > 0)
                 {
                     document.domain = i;
                     try
                     {
                         while (a >= 0) {
                             i = i.substring(a + 1);
                             if (i != "com") {
                                 document.domain = i;
                                 a = i.indexOf(".")
                             }
                             else {
                                 a =- 1;
                             }
                         }
                     }
                     catch (b) {}
                 }
             }
             else {
                 throw new Error("Invalid $Config.domain");
             }
             i = document.domain;
             o = function () {}
         }
         if ($Config.applyAppDomain) {
             o();
         }
         var x = /^(?:http|https|ftp):\/\/([-.a-z0-9]+(?::[0-9]+)?)(?:\/|$)/i, v = /^((?:http|https|ftp):\/\/[-.a-z0-9]+(?::[0-9]+)?)(?:\/|$)/i, 
         u = /\/[^\/]*\/\.\./;
         function l(a, b)
         {
             a = j.resolveUrl(a).toLowerCase();
             return String(a).search(b ? v : x) < 0 ? "" : RegExp.$1
         }
         j.extractHost = l;
         j.resolveUrl = function (b, c)
         {
             b = b ? b.toString() : "";
             if (!c)
             {
                 if (!n) 
                 {
                     var d = a._ge("base");
                     if (d && d.href != "") {
                         c = n = d.href;
                     }
                     else 
                     {
                         var e = location.protocol + "//" + location.host + location.pathname;
                         c = n = e.substring(0, e.lastIndexOf(location.protocol === "file:" ? "\\" : "/") + 1);
                     }
                 }
                 else {
                     c = n;
                 }
                 else {
                     c = c.substring(0, c.toString().lastIndexOf("/") + 1);
                 }
                 if (b.startsWith("/")) {
                     b = location.protocol + "//" + location.host + b;
                 }
                 if (b.indexOf("//") ===- 1) {
                     b = c + b;
                 }
                 function f(a) 
                 {
                     while (u.test(a)) {
                         a = a.replace(u, "");
                     }
                     return a 
                 }
                 return f(b);
             }
         };
         var p = l(document.location.href);
         j.currentDomain = p;
     }
 })();
 (function ()
 {
     var f = window, Bb = f.Debug, o = f.jQuery, E = f.$Beacon, u = f.$Cookie, db = f.$Utility, a = window.$BSI;
     if (!a.headTime) {
         a.headTime = (new Date).getTime();
     }
     var q = [], X = [], x = "LD", Ab = "#", d = "&", p = "?", s = "~", hb = ":", m = "", N = ".com", H = "-int.com", 
     z = {}, v = {}, g, e = 1, t, B, D, S, y, A, j, C, h = f.$Config, c = h.BSI, b = c.BICI, W = h.sd.endsWith(H) ? H : N, 
     k = [], Y = c.ignoreWindowOnload, l = 0;
     function jb()
     {
         var a = o(document), d = o(f);
         a.bind("click", P);
         a.bind("mousedown", I);
         a.bind("mouseup", M);
         a.bind("keydown", L);
         a.bind("keyup", Q);
         a.bind("touchstart", G);
         a.bind("touchend", J);
         l = 1;
         if (!c.ignoreWindowOnload) {
             d.bind("load", ab);
         }
         d.bind("unload", U);
         if (b && b.capture) {
             v = eb();
         }
     }
     a.informLoaded = function rb(g, e)
     {
         h = f.$Config;
         c = h.BSI;
         b = c.BICI;
         document.body.id = c.pn ? c.pn.encodeHtmlAttribute() : m;
         if (a.headTime == y) {
             return;
         }
         var i = n(), d = f.$Ads;
         if (y && !g && d && d.Refresh) {
             d.Refresh();
         }
         y = a.headTime;
         l = 0;
         k = [];
         if (e) {
             a.addLogParams({
                 x : "1" 
             });
         }
         V(q, e);
         r("L", O(v), i);
         v = {};
         if (b && b.beaconUrl) {
             E.fire(b.beaconUrl, z);
         }
         z = {}
     };
     a.informPVHead = function sb()
     {
         T();
         a.headTime = n();
         l = 1;
     };
     a.addBeaconParams = function mb(a)
     {
         K(z, a)
     };
     a.addLogParams = function qb(a)
     {
         K(v, a)
     };
     a.addLoadedCallback = function lb(a)
     {
         q.push(a)
     };
     a.removeLoadedCallback = function kb(a)
     {
         setTimeout(function ()
         {
             for (var b = 0, c = q.length; b < c; b++) if (q[b] == a) {
                 q.splice(b, 1);
                 return
             }
         }, 0)
     };
     a.isLoading = function yb()
     {
         return l;
     };
     a.addNavCallback = function nb(a)
     {
         X.push(a)
     };
     a.navigateTo = function wb(c, b)
     {
         if (a.informNav(c, 0, 0, 0, 0, 0, 0, b)) {
             return;
         }
         try {
             if (b) {
                 window.open(c, b);
             }
             else {
                 window.location.href = c;
             }
         }
         catch (d) {}
     };
     a.addLoadEvent = function pb(a)
     {
         if (l) {
             k.push(a);
         }
     };
     a.eventLoaded = function ub(b)
     {
         for (var a = 0, c = k.length; a < c; a++) if (k[a] == b) {
             k.splice(a, 1);
             bb();
             break
         }
     };
     a.addHandlerDPs = function ob(a)
     {
         a["biciPrevious"] = c.biciPrevious;
         a["mmn"] = h.mmn;
         return a;
     };
     a.addLDToHash = function tb(a)
     {
         a["bicild"] = u.getCookie(x, 1);
         u.deleteCookie(x, $Config.sd);
         return a;
     };
     a.informNav = function xb(k, t, f, x, D, K, I, J)
     {
         e = e && !D && (!f || f.getAttribute("target") != "_blank");
         var B = n(), l = f ? f.href : 0, G = f ? f.innerHTML : 0;
         i();
         F();
         t = t || ib(f);
         k = k || m;
         var w = $U.doesMatchHost(k, "live" + W), H = $U.isAbsoluteUrl(k) && $U.doesMatchHost(k, "g.live" + W);
         r("N", s + s + t.encodeUrl() + s + fb(), B);
         A = A || e;
         if (b && b.urlHash)
         {
             var z = b.urlHash + B;
             if (b.fid) {
                 z += d + b.fid + d + (e ? "1" : "0") + (!x ? "1" : "0");
             }
             u.setCookie("LN", z, $Config.sd)
         }
         var v = V(X, k, f, x, e, w, K, I, J);
         if (!v && $B.IE && $B.V < 9 && typeof ieImgAnchorFix === "function" && f)
         {
             ieImgAnchorFix(f);
         }
         var y = ["WLXID=", c.xid, "&RID=", c.rid, "&TID=", a.headTime, "&lid=", t].join(m);
         if (H)
         {
             if (f && b && b.enableGlinkExtra)
             {
                 var q;
                 if (l.indexOf(p) < 0) {
                     q = p + p;
                 }
                 else if (l.indexOf(p + p) < 0 && l.indexOf(d + d) < 0) {
                     q = d + d;
                 }
                 else {
                     q = d;
                 }
                 f.href = l + q + y;
             }
         }
         else if (!w)
         {
             if (b && b.enableGlinkCall) {
                 E.fireAndHold("//g.live" + N + "/_9uxp9" + h.mkt + "/mike?" + k.encodeUrl() + d + d + y);
             }
             if (f && l != f.href) 
             {
                 j = f;
                 C = l;
                 if (g == 3) {
                     if (!$B.Safari && !$B.Firefox) {
                         o(f).bind("mouseout", i) ;
                     }
                 }
                 else {
                     setTimeout(i, 100);
                 }
                 R(f, G) 
             }
             return v;
         }
     };
     function eb()
     {
         var a = {
             sw : screen.width, sh : screen.height, c : screen.colorDepth
         };
         if (document.documentElement.clientWidth)
         {
             a.bw = document.documentElement.clientWidth;
             a.bh = document.documentElement.clientHeight
         }
         return a
     }
     function i()
     {
         if (j && j.href != C) {
             var a = j.innerHTML;
             j.href = C;
             R(j, a);
             o(j).unbind("mouseout", i);
             j = 0;
         }
     }
     function R(a, b)
     {
         if (a && a.innerHTML != b) {
             a.innerHTML = b;
         }
     }
     a.reportEvent = function vb(d, c)
     {
         var b = s + d + O(c);
         if (!r("E", b)) {
             a.flush();
             r("E", b)
         }
     };
     a.flush = function zb()
     {
         E.fire(h.handlerBaseUrl + "/Handlers/NoOp.mvc", a.addLDToHash({}))
     };
     function I(a)
     {
         i();
         cb(a)
     }
     function P(a)
     {
         if (a.which == 2 || t) {
             return;
         }
         Z(a);
         e = !t && !B && !D;
         g = 1;
         w(a.target, null, a);
         e = 1
     }
     function M(a)
     {
         cb(a);
         if (g != 1 || t) {
             e = 0;
             w(a.target, g == 3, a);
             e = 1;
         }
     }
     function L(a)
     {
         if (a.keyCode == 93) {
             g = 3;
             w(a.target, 1, a)
         }
     }
     function Q(b)
     {
         var a = b.keyCode;
         if (a == 27 || a == 18 || a == 13) {
             i();
         }
     }
     function G()
     {
         i();
         S = n()
     }
     function J(a)
     {
         if (n() - S > 1e3) {
             e = 0;
             g = 3;
             w(a.target, null, a);
             e = 1;
         }
     }
     function cb(a)
     {
         g = a.which;
         Z(a)
     }
     function Z(a)
     {
         B = a.shiftKey;
         t = a.ctrlKey;
         D = a.altKey
     }
     function w(d, j, l)
     {
         i();
         while (d)
         {
             if (d.tagName == "A")
             {
                 var c;
                 try {
                     c = d.href
                 }
                 catch (m) {}
                 if (c)
                 {
                     if (h.AjaxHistory && h.AjaxHistory.fullAjax && c.indexOf("#") ==- 1)
                     {
                         var b = document.location.href, g = b.indexOf("#");
                         if (g > -1) {
                             b = b.substr(0, g);
                         }
                         var f = b.indexOf("?");
                         if (f > -1) {
                             b = b.substr(0, f);
                         }
                         b += "?";
                         if (c.toLowerCase().indexOf(b) == 0) {
                             c = d.href = "#" + c.substr(b.length);
                         }
                     }
                     var e = false;
                     if ($U.isLinkABookmark(c)) {
                         var k = $U.getUrlFragment(c);
                         if (k.indexOf("=") > -1) {
                             e = true;
                         }
                     }
                     else {
                         e = true;
                     }
                     if (e) {
                         a.informNav(c, 0, d, j, null, l);
                     }
                 }
                 break
             }
             d = d.parentNode;
         }
     }
     function ib(a)
     {
         var c = m;
         while (a && a.getAttribute) {
             var b = a.getAttribute("lid");
             if (b) {
                 c = b;
                 break
             }
             a = a.parentNode
         }
         return c
     }
     function O(b)
     {
         var c = m;
         if (b) {
             for (var d in b) {
                 var a = b[d];
                 a = a.encodeUrl ? a.encodeUrl() : a;
                 c += s + d + hb + a 
             }
             return c;
         }
     }
     function F()
     {
         if (l) {
             a.informLoaded(1, 1);
         }
     }
     function fb()
     {
         var a = "U";
         if (g == 3) {
             a = "R";
         }
         else if (g == 1) {
             a = "L";
         }
         else if (g == 2) {
             a = "M";
         }
         if (t) {
             a += "C";
         }
         if (D) {
             a += "A";
         }
         if (B) {
             a += "S";
         }
         return a
     }
     function K(c, a)
     {
         for (var b in a) {
             c[b] = a[b];
         }
     }
     function ab()
     {
         Y = 1;
         bb()
     }
     function bb()
     {
         if (Y && k.length == 0) {
             a.informLoaded();
         }
     }
     function U()
     {
         T();
         i();
         var a = o(document);
         a.unbind("click", P);
         a.unbind("mousedown", I);
         a.unbind("mouseup", M);
         a.unbind("keydown", L);
         a.unbind("keyup", Q);
         a.unbind("touchstart", G);
         a.unbind("touchend", J);
         var b = o(f);
         if (!c.ignoreWindowOnload) {
             b.unbind("load", ab);
         }
         b.unbind("unload", U)
     }
     function T()
     {
         F();
         if (!A) {
             r("U");
         }
     }
     function n()
     {
         return (new Date).getTime()
     }
     function gb(b)
     {
         return (b ? b : n()) - a.headTime
     }
     function r(l, k, n)
     {
         if (b && b.enableLD)
         {
             var j = l + gb(n) + (k ? k : m), f = u.getCookie(x, 1), g = db.deserialize(f, d, 0, 1), i = [c.xid, 
             c.rid, h.di, a.headTime].join("_"), e = g[i];
             if (e) {
                 e += "|" + j;
             }
             else {
                 e = j;
             }
             g[i] = e;
             f = db.serialize(g, d, 1);
             if (f.length > 512) {
                 return 0;
             }
             u.setCookie(x, f, $Config.sd, 0, new Date(2020, 1, 1), 1)
         }
         return 1
     }
     function V(e)
     {
         var a = 0, c = e.clone(), g = c.length, b = false, d = f.$WebWatson;
         if (d)
         {
             for (; a < g; a++) {
                 b = d.wrapCallback(c[a], 0, Array.prototype.slice.call(arguments, 1))() || b;
             }
         }
         return b
     }
     jb();
     $Do.register("$BSI.addNavCallback", a.addNavCallback);
     $Do.register("$BSI")
 })();
 (function ()
 {
     var l = window, Eb = l.jQuery, x = l.$Beacon, y = l.$Cookie, W = l.$Utility, Fb = l.Debug, I = "BP", 
     wb = "-", cb = 40, S = "wlidperf", nb = "wl_preperf", p = "FR", w = "ST", q = null, h = "", bb = 5e3, 
     a = $CSIPerf;
     a.GT1Param = null;
     a.payloadLength = 0;
     var Db = [], i = 0, Cb = q, z = {}, F, s, r = {}, c = l.$Config, d = c.BSI || {},
     j = d.SBSPLT || {}, b = d.CSIPerf || {}, Q = b.IDSS || {}, C = b.Trace || {},
     E = b.page || {}, O = b.WLXFD || {}, m = y.getCookie, V = y.setCookie, J = W.serialize, v = W.deserialize, 
     g = v(m(S, 1)), k = v(m(nb, 1)), A = d.ir, u = h;
     function db(s, i, w)
     {
         var d = i[p] || "NA*NA*", f = d.split("*");
         f[2] = u;
         d = f.join("*");
         u = h;
         var a = ob(i), y = tb(a.time), x = v(m("ANON", 1))["A"] || h, e = l.$WebWatson, j = e && e.foundException() ? 1 : 0, 
         t = n(g.latency), r = n(k.thr), q = d + ":" + o(c.prop, 20) + "*" + o(s), b = 
         {
             ANON : x, NL : t, TP : r, CL : c.mmn || h, MA : c.mkt, B : c.build, TR : q, PLT : a.time, 
             IR : A && !a.nostart && !w ? 1 : 0, EX : j
         };
         Z(b, a.lapseReport, y);
         eb(b);
         return b
     }
     function o(a, b)
     {
         b = b || cb;
         var c = a.length;
         a = c > b ? a.substr(c - b) : a;
         return a.encodeUrl()
     }
     function tb(a)
     {
         return i > 0 && !f(a) && a > 0 ? 
         {
             tprs : Math.round(i / 1024 * 8 / (a / 1e3)), size : Math.round(i / 1024 * 10) / 10
         }
          : q
     }
     function Z(a, b, c)
     {
         if (k.plt) {
             a.PLM = k.plt;
         }
         if (k.com) {
             a.PCT = k.com;
         }
         if (k.req) {
             a.PCD = k.req;
         }
         if (c) {
             a.SZ = c.size, a.TPRS = c.tprs;
         }
         if (b) for (var d = 0;
         d < b.length;
         d++) {
             var e = b[d];
             a[e.key] = e.val;
         }
     }
     function ob(e)
     {
         if (a._ttg) {
             a.lapse.push({
                 s : "ttg", t : a._ttg 
             });
         }
         var b = E.timeStamp;
         if (f(b) || 0 == b) {
             b = G();
         }
         var c = e.ST || 0, d = b - c, g = ib(c, b, a.lapse);
         return {
             nostart : c == 0, time : d > 0 ? d : 0, lapseReport : g
         }
     }
     function n(b)
     {
         var a = parseInt(b);
         return isNaN(a) ? 0 : a
     }
     function f(a)
     {
         return "undefined" == typeof a || !a || h == a
     }
     function L()
     {
         var a = {
             latency : g.latency, throughput : g.throughput
         };
         R(a);
         g = a
     }
     function U()
     {
         P();
         L();
         y.deleteCookie(I, c.sd)
     }
     function H()
     {
         try {
             var a = window.location;
             return a.hostname + a.pathname
         }
         catch (b) {
             return document.domain;
         }
     }
     function ib(e, h, a)
     {
         var c = [];
         if (a && a.length > 1 && h - e > 0)
         {
             a[0] = {
                 s : "Start", t : e
             };
             for (var b = 0; b < a.length - 1; b++) {
                 var i = a[b], d = a[b + 1];
                 if (!f(d)) {
                     var g = d.t - e;
                     if (g > 0) c[c.length] = {
                         key : "L." + d.s, val : g
                     }
                 }
             }
         }
         return c
     }
     function lb(c, d, b, j)
     {
         c = c || H();
         i = n(b.p);
         if (f(i) || i <= 0) {
             i = f(d) ? 0 : n(d);
         }
         var h = g[w], e = g[p];
         if (e && h) {
             b[p] = "0*" + e + "*";
             b[w] = h;
             A = 1;
             L()
         }
         a.GT1Param = db(c, b, j)
     }
     function gb(a)
     {
         a[p] = h;
         a[w] = h;
         B(a)
     }
     function P()
     {
         i = 0, E.timeStamp = 0, z = {}, a.csd = {}, a.lapse = [{}];
         a._ttg = 0;
         a.payloadLength = 0;
         j.rt = 0
     }
     function qb(c, d)
     {
         if (!b.enabled) {
             U();
             return
         }
         if (f(c)) {
             c = H();
         }
         var a = t();
         a[p] = c;
         a[w] = G();
         a.p = f(d) ? 0 : n(d);
         B(a)
     }
     function ab()
     {
         var d = window.performance;
         if (d)
         {
             var a = d.timing;
             if (a)
             {
                 var b = a.navigationStart;
                 e("jsPlt", b, a.loadEventEnd);
                 e("1Pnt", b, a.msFirstPaint);
                 e("domIn", b, a.domInteractive);
                 e("rdir", a.redirectStart, a.redirectEnd);
                 e("dns", a.domainLookupStart, a.domainLookupEnd);
                 e("tcp", a.connectStart, a.connectEnd);
                 e("req", a.requestStart, a.responseEnd);
                 e("resp", a.responseStart, a.responseEnd)
             }
             var c = d.navigation;
             if (c)
             {
                 $CSIPerf.addCsd("navType", c.type);
                 $CSIPerf.addCsd("redirectCount", c.redirectCount)
             }
         }
     }
     function e(c, a, b)
     {
         if (a && b && b > a) {
             $CSIPerf.addCsd(c, b - a);
         }
     }
     function sb(e)
     {
         if (!b.enabled) {
             U();
             return
         }
         var c = t();
         ab();
         lb(d.pn, a.payloadLength, c, e)
     }
     function jb()
     {
         if (b.enabled)
         {
             var c = a.GT1Param, d = K(c) || !c.IR ? "nostart" : J(c);
             if (Q.enabled) {
                 $BSI.addBeaconParams({
                     csiperf : d 
                 });
             }
         }
     }
     function hb()
     {
         if (b.enabled)
         {
             var d = a.GT1Param;
             if (O.enabled && j.enabled && d)
             {
                 delete d.ANON;
                 delete d.MA;
                 delete d.CL;
                 d.RT = j.rt;
                 d.bicild = "";
                 x.fire(c.handlerBaseUrl + "/Handlers/PerfMonitor.mvc", $BSI.addHandlerDPs(d), j.render ? rb : 0, 
                 0, 1)
             }
         }
         a.GT1Param = null
     }
     function N(a, b)
     {
         if (a) {
             var c = a.indexOf(" PLT: ");
             if (c > -1) {
                 a = a.substr(0, c);
             }
             a += b
         }
         else {
             a = b;
         }
         return a
     }
     function rb()
     {
         var a = m("SBSPLT");
         if (a)
         {
             var b = " PLT: " + parseInt(a) + "ms";
             try {
                 window.top.document.title = N(window.top.document.title, b)
             }
             catch (c) {
                 document.title = N(document.title, b);
             }
         }
     }
     function eb(b)
     {
         if (!K(a.csd)) {
             D(b, a.csd);
         }
         if (!K(z)) {
             D(b, z);
         }
     }
     function K(a)
     {
         if (a) {
             for (var b in a) {
                 return false;
             }
         }
         return true
     }
     function G()
     {
         return (new Date).getTime()
     }
     function mb(f)
     {
         c = $Config;
         d = c.BSI || {};
         j = d.SBSPLT || {};
         b = d.CSIPerf || {};
         Q = b.IDSS || {};
         C = b.Trace || {};
         E = b.page || {};
         O = b.WLXFD || {};
         _csiPerfConfigOmniture = b.Omniture || {};
         if (!b.skipStopTimer)
         {
             sb(f);
             jb();
             hb();
             if (b.enabled && !b.pltDetectionDisabled) {
                 var a = t(), e = c.prop;
                 if (a.l != e) {
                     a.l = e;
                     B(a);
                     setTimeout(Y, bb)
                 }
             }
         }
         gb(t());
         P();
         F = (new Date).getTime()
     }
     function t()
     {
         var a = m(I, 1);
         if (a == s) {
             return r;
         }
         s = a;
         r = v(a);
         return r
     }
     function B(a)
     {
         r = a;
         s = J(a);
         V(I, s, c.sd, q, q, 1)
     }
     function Y()
     {
         var b = (new Date).getTime(), d = {
             bicild : "", v : c.build
         };
         x.fire(c.handlerBaseUrl + "/Handlers/Plt.mvc", d, a, a, 1);
         function a()
         {
             var a = (new Date).getTime() - b;
             if (m("pltmode", 1) == "1") {
                 g.latency = a;
                 R(g);
                 y.deleteCookie("pltmode", c.sd, "/")
             }
         }
     }
     function R(b)
     {
         var a = new Date;
         V(S, J(b), c.sd, q, new Date(a.getUTCFullYear() + 1, a.getUTCMonth(), a.getUTCDay()), 1)
     }
     function kb(k, h, e, j, b)
     {
         if (!e && b)
         {
             var i = f(d.pn) ? H() : d.pn;
             a.setPerformanceId(u || fb(h));
             var g = o(c.prop, 20) + "*" + o(i);
             qb(g, a.payloadLength);
             A = 1;
         }
     }
     function fb(a)
     {
         var c = h;
         while (a && a.getAttribute) {
             var b = a.getAttribute("pid");
             if (b) {
                 c = b;
                 break
             }
             a = a.parentNode
         }
         return c
     }
     a.lapseTimer = function yb(d, b)
     {
         var c;
         if (b && b > 0) {
             c = b;
         }
         else {
             c = n(G());
         }
         a.lapse.push({
             s : d, t : c
         })
     };
     a.setUploadTP = function xb(e, c, a, b)
     {
         var f = {
             dir : "up", sz : e, ti : c, d : b, pn : d.pn, ext : a
         };
         M(f)
     };
     a.setDownloadTP = function vb(a)
     {
         var b = {
             dir : "down", pn : d.pn, rate : a
         };
         M(b)
     };
     function M(a)
     {
         if (b.enabled && C.enabled && j.enabled)
         {
             x.fire(c.handlerBaseUrl + "/Handlers/Bandwidth.mvc", $BSI.addLDToHash($BSI.addHandlerDPs(a)));
         }
     }
     a.startTrace = function zb(b, a)
     {
         return new pb(b, a);
     };
     a.endTrace = function Ab() {};
     function pb(h, g)
     {
         var a = this, e, d = (new Date).getTime(), f = {};
         a.lapse = [];
         a.addCsd = function l(a, b)
         {
             T(f, a, b)
         };
         a.addLapse = function i(b)
         {
             a.lapse.push({
                 s : b, t : (new Date).getTime()
             })
         };
         a.endTrace = function k()
         {
             if (!e)
             {
                 e = 1;
                 if (b.enabled && C.enabled && j.enabled)
                 {
                     var k = (new Date).getTime(), i = {
                         tc : h, tcs : g, ti : k - d, th : d - $BSI.headTime, to : F ? d - F :- 1
                     };
                     X(i, a.lapse, d, k);
                     D(i, f);
                     x.fire(c.handlerBaseUrl + "/Handlers/Trace.mvc", $BSI.addLDToHash($BSI.addHandlerDPs(i)))
                 }
             }
         }
     }
     a.setPerformanceId = function ub(a)
     {
         u = o(a, 20);
     };
     a.addCsd = function Bb(a, b)
     {
         T(z, a, b)
     };
     function T(a, b, c)
     {
         a[b] = c
     }
     function D(c, a)
     {
         for (var b in a) {
             c["C." + b] = a[b];
         }
     }
     function X(e, b, f)
     {
         var d = b.length, a = 0;
         for (; a < d; a++) {
             var c = b[a];
             e["L." + c.s] = c.t - f;
         }
     }
     $BSI.addLoadedCallback(mb);
     $BSI.addNavCallback(kb)
 })();
 (function ()
 {
     var a = window, h = a.jQuery, f = a.$BSI, e = a.$Utility, d = "|", c = ["h", "o", "u", "q1", "q2", 
     "q3", "q4", "q5"], b = c.length;
     f.addNavCallback(g);
     function g(p, i)
     {
         var k = i && i.getAttribute("wrap");
         if (k)
         {
             var g = a.$Config, n = g.WS || {}, m = n.SL || {}, l = m.url;
             if (l)
             {
                 var h = k.split(d), o = h.slice(b).join(d), j = {
                     l : o, p : g.di, mkt : g.mkt
                 },
                 f;
                 for (f = 0; f < b; f++) {
                     if (h[f]) {
                         j[c[f]] = h[f];
                     }
                     i.href = l + "?" + e.serialize(j);
                 }
             }
         }
     }
 })();
 (function ()
 {
     var a = window, d = a.jQuery, e = a.Debug, b = a.$css;
     b.getCN = function c(f, g, e)
     {
         var c = [];
         if (e && e.getElementsByTagName)
         {
             var d = e.getElementsByTagName(g);
             for (var a = 0; a < d.length; a++) {
                 if (b.has(d[a], f)) {
                     c[c.length] = d[a];
                 }
             }
         }
         return c;
     };
     var f = a.$edh = 
     {
         e : function (a, c)
         {
             var d = c || "inline";
             if (a.nodeName.toLowerCase() == "span" && a.className.indexOf("c_ld") !=- 1)
             {
                 var b = a.lastChild;
                 if (b) {
                     a.parentNode.insertBefore(b, a);
                     b.style.display = d;
                     a.parentNode.removeChild(a)
                 }
             }
         },
         d : function (a)
         {
             if (a.nodeName.toLowerCase() == "a" && !(a.parentNode.nodeName.toLowerCase() == "span" && a.parentNode.className.indexOf("c_ld") !=- 1))
             {
                 var b = document.createElement("span");
                 b.innerHTML = a.innerHTML;
                 b.className = a.className ? a.className + " c_ld" : "c_ld";
                 var c = a.getAttribute("title");
                 if (c) {
                     b.setAttribute("title", c);
                 }
                 a.style.display = "none";
                 a.parentNode.insertBefore(b, a);
                 b.appendChild(a)
             }
         }
     }
 })();
 (function ()
 {
     var a = window, b = a.jQuery;
     a.sutra = function (e, d)
     {
         if (a.$Sutra) {
             b(e).attr("sutra", c(d));
         }
     };
     a.sutra.load = function (d, c)
     {
         if (a.$Sutra) {
             b(document.body).attr(d, c);
             b(document.body).removeAttr("sutravisited")
         }
     };
     a.unsutra = function (c)
     {
         if (a.$Sutra) {
             b(c).removeAttr("sutra");
         }
     };
     function c(e)
     {
         var d = e.split("."), b = a;
         for (var c = 0, f = d.length; c < f; c++) {
             b = b[d[c]];
         }
         return b;
     }
 })();
 (function ()
 {
     var a = window;
     a.$f = 
     {
         cancelEvent : function (b)
         {
             b = b || a.event;
             if (b.stopPropagation) {
                 b.preventDefault();
                 b.stopPropagation()
             }
             else {
                 b.returnValue = false;
             }
             return false;
         },
         getSelectedText : function ()
         {
             if (document.selection) {
                 return document.selection.createRange();
             }
             else
             {
                 var b;
                 try {
                     b = a.getSelection().getRangeAt(0)
                 }
                 catch (c) {
                     b = a.document.createRange()
                 }
                 return b;
             }
         },
         px : function (a)
         {
             return a + "px";
         },
         updateTitle : function (a)
         {
             try {
                 top.document.title = top.document.title.replace(/.*?( PLT: [0-9]+ms)?$/i, a + "$1")
             }
             catch (b) {}
         },
         replaceQs : function (a, e, h)
         {
             var f = "([?|&])" + e + "=([^&]+)", g = new RegExp(f, "i"), c = a, d = "", b = a.indexOf("#");
             if (b > -1) {
                 c = a.substr(0, b);
                 d = a.substr(b)
             }
             return c.replace(g, "$1" + e + "=" + h) + d;
         },
         doc : document, docEl : document.documentElement
     }
 })();
 (function ()
 {
     var b = window, c = b.jQuery, a = b.$f;
     a.dockIt = function (j, y, b, d, k, B, w)
     {
         var i = 0;
         k = k || false;
         b = typeof b == "undefined" ? 0 : b;
         d = d || {
             x : 0, y : 0
         };
         if (typeof d != "object") {
             i = d;
             d = {
                 x : 0, y : 0
             }
         }
         var n = j.offsetParent, x = n == document.body || n == a.docEl, f = a.getLocation(j, k), c = a.getLocation(y, 
         k, x), q = d.x * ($B.rtl ?- 1 : 1), e = {
             x : f.bodyX + q, y : f.bodyY + d.y, width : f.width, height : f.height, targetLoc : c
         },
         g, h;
         if (!w)
         {
             var z = a.clientHeight(), A = a.clientWidth(), t = c.addScrollTop !=- 1 ? a.scrollTop() : 0, 
             r = a.scrollLeft(), p = f.width + q, o = f.height + d.y, m = z + t - c.bottom > o, l = c.top - t > o, 
             s = A + r - c.right > p, u = c.left - r > p;
             if (!m && l) {
                 if (b < 2) {
                     b += 2;
                     h = 1
                 }
                 else if (b == 4 || b == 6) {
                     b += 1;
                     h = 1;
                 }
             }
             else if (!l && m) if (b >= 2 && b < 4) {
                 b -= 2;
                 h = 1
             }
             else if (b == 5 || b == 7) {
                 b -= 1;
                 h = 1
             }
             if (!s && u)
             {
                 if ($B.rtl) {
                     if (b >= 4 && b < 6) {
                         b += 2;
                         g = 1
                     }
                     else if (b == 1 || b == 3) {
                         b -= 1;
                         g = 1;
                     }
                 }
                 else if (b > 5) {
                     b -= 2;
                     g = 1
                 }
                 else if (b == 0 || b == 2) {
                     b += 1;
                     g = 1;
                 }
             }
             else if (!u && s) if ($B.rtl) {
                 if (b > 5) {
                     b -= 2;
                     g = 1
                 }
                 else if (b == 0 || b == 2) {
                     b += 1;
                     g = 1;
                 }
             }
             else if (b >= 4 && b < 6) {
                 b += 2;
                 g = 1
             }
             else if (b == 1 || b == 3) {
                 b -= 1;
                 g = 1;
             }
         }
         var v = b % 2;
         if (B) {
             e.x = d.x;
             e.y = d.y + c.bottom
         }
         else if (b >= 0)
         {
             if (b < 4) 
             {
                 e.x += v ? $B.rtl ? c.left : c.right - f.width : $B.rtl ? c.right - f.width : c.left;
                 e.y += b < 2 ? c.bottom + i : c.top - f.height - i 
             }
             else 
             {
                 if ($B.rtl)
                 {
                     if (b < 6) {
                         b += 2;
                     }
                     else {
                         b -= 2;
                     }
                     e.x += b < 6 ? c.left - f.width - i : c.right + i;
                     e.y += v ? c.bottom - f.height : c.top ;
                 }
             }
             if ($B.Mobile && !l && !m) {
                 e.y = a.scrollTop();
             }
             if (g) {
                 e.x += d.x *- 2;
             }
             if (h) {
                 e.y += d.y *- 2;
             }
             j.style.left = e.x + "px";
             j.style.top = e.y + "px";
             return e;
         }
     };
     a.getLocation = function (c, h, n)
     {
         var l = false, f = a.getStyle, j = "offsetTop", i = "offsetLeft", m = "position", b = 
         {
             x : c[i], y : c[j], top : 0, right : 0, bottom : 0, left : 0, bodyX : 0, bodyY : 0, width : c.offsetWidth, 
             height : c.offsetHeight
         },
         d = c;
         while (d = d.offsetParent)
         {
             l = f(d, m) == "relative";
             if (h != 2) {
                 b.bodyX -= d[i];
                 b.bodyY -= d[j]
             }
             if (l)
             {
                 var o = a.toInt(f(d, "padding-left")), p = a.toInt(f(d, "padding-top"));
                 b.x = h == 1 ? b.x : o;
                 b.y = h == 1 ? b.y : p
             }
             b.x += d[i];
             b.y += d[j]
         }
         c = c.parentNode;
         var e = 0, k = 0;
         while (c && c != document.body)
         {
             var g = f(c, m);
             if (g == "relative") {
                 k = 1;
                 c = c.parentNode;
                 continue
             }
             if (g == "fixed") {
                 e = 1;
             }
             if (!k || n) {
                 b.y -= a.toInt(c.scrollTop);
             }
             else if (g == "fixed") {
                 e =- 1;
             }
             c = c.parentNode
         }
         if (e == 1) {
             b.y += a.toInt(a.scrollTop());
         }
         b.left = b.x;
         b.top = b.y;
         b.right = b.x + b.width;
         b.bottom = b.y + b.height;
         b.addScrollTop = e;
         return b;
     };
     a.toInt = function (a)
     {
         a = parseInt(a);
         return isNaN(a) ? 0 : a;
     };
     a.locCompare = function (a, b)
     {
         if (a.bodyX != b.bodyX || a.bodyY != b.bodyY || a.top != b.top || a.left != b.left || a.bottom != b.bottom || a.right != b.right) {
             return 1;
         }
         return 0;
     };
     a.getStyle = function (d, b)
     {
         var e = "";
         if (a.doc.defaultView && a.doc.defaultView.getComputedStyle) {
             var f = a.doc.defaultView.getComputedStyle(d, "");
             e = f ? f.getPropertyValue(b) : ""
         }
         else if (d.currentStyle)
         {
             if (b.indexOf("-") >= 0) {
                 var c = b.split("-");
                 c[1] = c[1].substr(0, 1).toUpperCase() + c[1].substr(1);
                 b = c.join("")
             }
             e = d.currentStyle[b]
         }
         return e;
     };
     a.isChildOf = function (b, a)
     {
         try {
             while (a && a !== b && a != document) {
                 a = a.parentNode;
             }
             return a === b
         }
         catch (c) {}
     };
     a.pn = function (a, c)
     {
         var d = $css.has(a, c), b = d ? a : null;
         while (!b && (a = a.parentNode) && typeof a != "undefined") {
             if ($css.has(a, c)) {
                 b = a;
             }
             return b;
         }
     };
     a.docHeight = function ()
     {
         var c = a.doc.documentElement.clientHeight, b = a.doc.body.clientHeight, d = b != undefined ? b : window.innerHeight + window.scrollMaxY;
         return Math.max(d, c);
     };
     a.docWidth = function ()
     {
         var b = a.doc.body.clientWidth;
         return b != undefined ? b : document.width;
     };
     a.scrollTop = function ()
     {
         var b = a.toInt(a.docEl.scrollTop), c = a.toInt(window.scrollY);
         return Math.max(b, c);
     };
     a.scrollLeft = function ()
     {
         var b = a.toInt(a.docEl.scrollLeft), c = a.toInt(window.scrollX);
         return Math.max(b, c);
     };
     a.clientHeight = function ()
     {
         return a.docEl.clientHeight - ($B.IE ? 16 : 0);
     };
     a.clientWidth = function ()
     {
         return a.docEl.clientWidth - ($B.IE ? 16 : 0);
     }
 })();
 (function ()
 {
     var a = window, i = a.jQuery, j = a.$Utility, k = a.Debug, f, c, b, d, h = "http://", g = "https://";
     function e()
     {
         f = a.$Config;
         c = f.Ssl || {};
         b = c.imu;
         d = c.d
     }
     e();
     a.$ssl = 
     {
         ensureSSLImageUrl : function (a)
         {
             if (!d)
             {
                 if (document.location.href.toLowerCase().startsWith(g)) {
                     if (a.toLowerCase().startsWith(h) && b) {
                         a = b + a.encodeUrl();
                     }
                     return a;;
                 }
             }
         },
         copyOutConfig : function (a)
         {
             a.$Config.Ssl = {};
             i.extend(a.$Config.Ssl, $Config.Ssl, true);
             a.$ssl.resetCachedValues()
         },
         resetCachedValues : e
     }
 })();
 (function ()
 {
     var g = window, i = g.jQuery, p = g.$WebWatson, e = "px", j = "mouseover", l = "unload", d = "style", 
     h = "width", k = "parentNode", n = "INPUT", m = $B.IE_M6, f = $f.doc;
     function b(r, q, eb, Yb, Fb, Xb, W, jc, Tb, Cb, ub, ec, ic, Db)
     {
         var L = null, Kb = "nextSibling", T = "className", z = "visibility", A = "display", lb = "hidden", 
         mb = "block", Nb = "visible", nb = "none", jb = "position", Ab = "height", V = "left", ab = "top", 
         db = "click", ib = "keydown", Ob = "keyup", J = "blur", kb = "focus", wb = "focusin", tb = "focusout", 
         hb = "mouseout", Ib = "mousedown", Jb = "resize", gb = "t_seli", qb = "t_hov", yb = "c_shad", 
         R = L, E, N, C, Y, D, v, u, G, I = 1, X, Q = 1, t, H = r[d], s = {
             display : 0, visibility : 0
         },
         B = s, Z = 0, w, P = 0, O, Rb, y, x, Bb, vb = 320, S = [], bc = 1e3, fb, lc = $f.docEl, xb = 0, 
         Vb = $f.docWidth(), zb = {}, K = $B.Mobile, cb = $B.BlackBerry, o = this;
         if (eb === undefined) {
             eb = L;
         }
         o.isHoverMenu = 0;
         o.tempHoverCloseDelay = 0;
         o.parentEl = L;
         o.keepHoverMenuOpen = 0;
         function kc()
         {
             r.binding = o;
             c(g, l, o.dispose);
             c(r, ib, ob);
             c(q, ib, ob);
             c(q, J, M);
             c(q, db, fc);
             c(f, Ib, U);
             c(f, db, U);
             c(f, Ob, Qb);
             O = q.tagName == n;
             o.isHoverMenu = (W == "mouseover" || W == "focus") && !O;
             if (!Cb) {
                 Cb = 250;
                 fb = 1e3
             }
             ub = ub || 200;
             if (o.isHoverMenu)
             {
                 c(q, hb, o.menuOnmouseout);
                 c(q, j, o.menuOnmouseover);
                 c(r, hb, o.menuOnmouseout);
                 c(r, j, o.menuOnmouseover);
                 c(q, kb, o.menuOnmouseover)
             }
             else if (W) {
                 g.setTimeout(function () 
                 {
                     c(q, W, o.toggleState) 
                 }, 0);
             }
             if (K && !($B.IE && $B.V < 7))
             {
                 u = f.createElement("div");
                 u[T] = "c_m_sbox";
                 Ub(u, 50);
                 if ((cb || $B.S60_Symbian) && g["$Config"] && $Config.ImagesBaseUrl) {
                     u[d].background = "url(" + $Config.ImagesBaseUrl + "/imgs/black_50.png)";
                 }
                 f.body.insertBefore(u, f.body.firstChild);
                 c(u, db, U)
             }
             H[z] = lb;
             H[A] = mb;
             Lb();
             Eb();
             c(g, Jb, Wb)
         }
         o.dispose = function ()
         {
             a(r, ib, ob);
             a(q, ib, ob);
             a(q, J, M);
             a(f, Ib, U);
             a(f, db, U);
             a(f, Ob, Qb);
             a(g, Jb, Wb);
             if (o.isHoverMenu)
             {
                 a(q, hb, o.menuOnmouseout);
                 a(q, j, o.menuOnmouseover);
                 a(r, hb, o.menuOnmouseout);
                 a(r, j, o.menuOnmouseover);
                 a(q, kb, o.menuOnmouseover)
             }
             else if (W) {
                 a(q, W, o.toggleState);
             }
             if (u) {
                 a(u, db, U);
             }
             if (G) {
                 a(G, kb, Pb);
             }
             if (!K) {
                 for (var b = 0; b < D.length; b++) {
                     a(D[b], wb, bb);
                     a(D[b], tb, bb) 
                 }
                 a(C, J, M);
             }
             a(Y, J, M);
             r.binding = q.menu = L;
             a(g, l, o.dispose)
         };
         function Lb()
         {
             var g = r.getElementsByTagName("*"), h;
             Bb = 0;
             D = [];
             for (var f = 0; f < g.length; f++)
             {
                 var b = g[f];
                 if (b.tagName == "A" || b.tagName == n)
                 {
                     var e = Gb(b);
                     if (e == r || e.binding && e.binding.isOpen())
                     {
                         D.push(b);
                         var j, i = b[k];
                         try {
                             j = i.tagName == "LI" || i.tagName == "DIV"
                         }
                         catch (l) {}
                         if (j)
                         {
                             if (!K)
                             {
                                 a(b, wb, bb);
                                 a(b, tb, bb);
                                 c(b, wb, bb);
                                 c(b, tb, bb);
                                 b[d].zoom = "0";
                                 if ($css.has(b, "uxfa_ml")) {
                                     Bb = 1;
                                 }
                             }
                             if (!X && $css.has(b, qb)) {
                                 y = b;
                             }
                             if (w && w.id == b.id) {
                                 h = 1;
                                 F(D.length)
                             }
                         }
                     }
                 }
             }
             P = D.length;
             if (P > 0) {
                 if (Q && t) {
                     sb();
                 }
                 Q = 0;
                 C = D[0];
                 Y = D[P - 1];
                 c(C, J, M);
                 c(Y, J, M)
             }
             else {
                 rb();
                 Q = 1
             }
             if (!h && y) {
                 F(-1);
             }
         }
         o.update = function (b)
         {
             X = true;
             a(C, J, M);
             a(Y, J, M);
             Lb();
             if (!b) {
                 Eb();
             }
             X = false;
             if (x) {
                 setTimeout(function () 
                 {
                     x.update(b) 
                 }, 0);
             }
         };
         function bb(a)
         {
             if (!O)
             {
                 a = a || event;
                 var b = a.target || a.srcElement;
                 if (b.nodeName == "A")
                 {
                     if (a.type == "focusin") {
                         setTimeout(function () 
                         {
                             $css.add(b, gb) 
                         }, 0);
                     }
                     else {
                         setTimeout(function () 
                         {
                             $css.remove(b, gb) 
                         }, 0);
                     }
                 }
             }
         }
         function Wb(b)
         {
             I = 1;
             if (!$css.has(r, "noresize")) {
                 var a = $f.docWidth();
                 if (Vb != a) {
                     Vb = a;
                     pb(b, 1)
                 }
             }
         }
         function Eb()
         {
             if (Q) {
                 return;
             }
             var j = Gb(q);
             if (j && j != q) {
                 x = j.binding;
             }
             else if (Tb != undefined) {
                 eb = Tb;
             }
             if (!m && !K && Bb) {
                 H[h] = r.offsetWidth - 2;
             }
             if (Db)
             {
                 if (X) {
                     r[d][h] = "auto";
                     $css.remove(r, "c_m_maxw")
                 }
                 if (r.offsetWidth > Db) {
                     r[d][h] = Db + e;
                     $css.add(r, "c_m_maxw")
                 }
             }
             var f = 3, c = f, i = $B.rtl, l = 1;
             if (!v) {
                 gc();
             }
             var n = q;
             if ($css.has(q, "c_m_usep")) {
                 n = q[k];
             }
             var a = {};
             if (!cb) {
                 a = $f.dockIt(r, n, eb, Yb, Fb, jc, ec);
                 zb = a.targetLoc
             }
             if (K)
             {
                 var b = $f.docWidth(), p = $f.docHeight(), w = vb, y = g.screen[h], A = 0;
                 if (u) {
                     u[d][Ab] = p ? p + e : "100%";
                     u[d][h] = b ? b + e : "100%"
                 }
                 if (!b || b > y && !$B.SF_iPhone) {
                     b = y;
                 }
                 i = 0;
                 if (b > vb && !cb) {
                     var C = $f.getLocation(q, Fb);
                     if (C.left > b / 2) {
                         A = b - vb;
                         i = 1
                     }
                     l = 0
                 }
                 else {
                     w = b;
                     c = 0
                 }
                 a.x = A;
                 r[d][V] = a.x + e;
                 H[h] = s[h] = w - 2 + e;
                 if (cb) {
                     r[d][ab] = xb + e;
                 }
                 ac()
             }
             var D = function ()
             {
                 a.height += K && l ? f * 2 : 0;
                 s[z] = lb;
                 if (!K) {
                     s[h] = a.width + e;
                 }
                 s[Ab] = a.height + e;
                 s[V] = a.x + (i ?- c : c) + e;
                 s[ab] = a.y + (K && l ?- f : f) + e;
                 s[z] = Nb;
                 if (m) {
                     B[z] = lb;
                     B[h] = a.width + c + e;
                     B[Ab] = a.height + f + e;
                     B[V] = (i ? a.x - c : a.x) + e;
                     B[ab] = a.y + e;
                 }
             };
             if (!cb && !$B.S60_Symbian) {
                 setTimeout(D, 0);
             }
             I = 0;
             if (!t) {
                 rb();
             }
             else if (X) {
                 o.show(0, 1);
             }
         }
         function gc()
         {
             v = r;
             while (v[T] != yb && v[Kb]) {
                 v = v[Kb];
             }
             if (!v || v[T] != yb)
             {
                 v = f.createElement("div");
                 s = v[d];
                 s[jb] = $f.getStyle(r, jb);
                 s[ab] = 0;
                 s[V] = 0;
                 v[T] = yb;
                 r[k].appendChild(v);
                 if (m)
                 {
                     G = f.createElement("IFRAME");
                     G.frameBorder = "no";
                     G.src = "javascript:''";
                     G.scrolling = "no";
                     B = G[d];
                     B[jb] = s[jb];
                     r[k].insertBefore(G, r);
                     c(G, kb, Pb)
                 }
             }
             s = v[d];
             s[A] = nb;
             s.backgroundColor = "#000";
             Ub(v, 20)
         }
         function ac()
         {
             var e = 0, b = [], f = r.getElementsByTagName("UL"), a;
             for (var c = 0; c < f.length; c++)
             {
                 a = f[c];
                 if ($css.has(a, "c_gll")) {
                     b.push(a);
                     dc(a);
                     if (a.offsetTop > a.previousSibling.offsetTop) {
                         e = 1;
                     }
                 }
             }
             if (e) {
                 for (var d = 0; d < b.length; d++) {
                     cc(b[d]);
                 }
             }
         }
         function rb()
         {
             B[z] = s[z] = H[z] = lb;
             s[A] = nb;
             if (I) {
                 H[ab] = s[ab] = 0;
                 H[V] = s[V] = 0
             }
             if (u) {
                 u[d][A] = nb;
             }
             F(-1)
         }
         function sb()
         {
             if (u) {
                 u[d][A] = mb;
             }
             B[A] = s[A] = H[A] = mb;
             B[z] = s[z] = H[z] = Nb;
             if (y == C) {
                 F(0);
             }
         }
         o.hide = pb;
         function pb(c, a)
         {
             if (a || Mb() && t)
             {
                 if (!Q) {
                     rb();
                 }
                 t = 0;
                 b.current = x;
                 if (x)
                 {
                     if (x.isHoverMenu) {
                         x.tempHoverCloseDelay = bc;
                     }
                     if ($B.IE && E) {
                         q.focus();
                     }
                     setTimeout(function ()
                     {
                         x.update(1)
                     }, 0)
                 }
                 Hb()
             }
         }
         o.show = function (e, d)
         {
             var a;
             if (i(r).children(":visible").length == 0) {
                 return;
             }
             if (!d)
             {
                 var c = $f.scrollTop();
                 if (xb != c || !zb || $f.locCompare(zb, $f.getLocation(q, Fb))) {
                     xb = c;
                     I = 1
                 }
                 if (!t && (I || ic)) {
                     Eb();
                     a = 1;
                 }
             }
             if (!x && b.current != o) {
                 b.closeAll();
             }
             if (!Q)
             {
                 if (a) {
                     setTimeout(sb, 0);
                 }
                 else {
                     sb();
                 }
                 t = 1;
                 if (x) {
                     x.update(1);
                 }
                 if (!X && !e && !o.isHoverMenu) {
                     try {
                         q.focus() 
                     }
                     catch (f) {}
                 }
                 Hb();
                 b.current = o;
             }
         };
         var Sb = 0;
         o.toggleState = function ()
         {
             if (Mb()) {
                 Sb = (new Date).getTime();
                 !t && !hc() ? o.show() : pb(0, 1)
             }
         };
         function Mb()
         {
             return (new Date).getTime() - Sb > 100
         }
         o.isOpen = function ()
         {
             return t;
         };
         function Hb()
         {
             for (var a = 0, b = S.length; a < b; a++) {
                 try {
                     S[a]() 
                 }
                 catch (c) {
                     p.submitFromException(c, L, 99) 
                 }
             }
         }
         o.addStateListener = function (a)
         {
             S.push(a)
         };
         o.removeStateListener = function (b)
         {
             for (var a = 0, c = S.length; a < c; a++) if (S[a] == b) {
                 S.splice(a, 1);
                 return
             }
         };
         o.setOffset = function (a)
         {
             Yb = a;
             I = 1;
         };
         o.invalidatePosition = function ()
         {
             I = 1;
         };
         o.setLoc = function (a)
         {
             eb = a;
             I = 1;
         };
         o.menuOnmouseover = function ()
         {
             if (q.unhover) {
                 clearTimeout(q.unhover);
                 q.unhover = L
             }
             if (!t && !q.hover)
             {
                 var a = Cb;
                 if (b.tempOpenDelayTimer && fb) {
                     a = 1;
                 }
                 q.hover = setTimeout(function ()
                 {
                     o.show()
                 }, a)
             }
         };
         o.menuOnmouseout = function ()
         {
             if (q.hover) {
                 clearTimeout(q.hover);
                 q.hover = L
             }
             if (t && !q.unhover && !o.keepHoverMenuOpen)
             {
                 o.tempHoverCloseDelay = o.tempHoverCloseDelay || ub;
                 q.unhover = setTimeout(function ()
                 {
                     pb()
                 },
                 o.tempHoverCloseDelay);
                 o.tempHoverCloseDelay = 0;
                 if (fb)
                 {
                     clearTimeout(b.tempOpenDelayTimer);
                     b.tempOpenDelayTimer = setTimeout(function ()
                     {
                         b.tempOpenDelayTimer = null;
                     }, fb)
                 }
             }
         };
         function cc(a)
         {
             a[d][A] = nb;
             a.previousSibling[T] = ""
         }
         function dc(a)
         {
             a[d][A] = mb;
             a.previousSibling[T] = "c_gl"
         }
         function fc()
         {
             if (!O && o.isHoverMenu)
             {
                 var a = q.getAttribute("href");
                 if ((!a || a.endsWith("#")) && t && !Xb) {
                     try {
                         C.focus() 
                     }
                     catch (c) {}
                 }
             }
         }
         function U(b)
         {
             b = b || event;
             var a = b.target || b.srcElement;
             if (t && a && !$f.isChildOf(r, a) && q != a && !$f.isChildOf(q, a)) {
                 o.hide();
             }
         }
         function Qb(a)
         {
             a = a || event;
             var d = 27, b = a.target || a.srcElement, c = a.keyCode || a.which;
             if (c == 9) {
                 N = 0;
             }
             if (t)
             {
                 if (c == d) {
                     Rb = b.value;
                     o.hide() 
                 }
                 else if (!E && R == q && C && !Xb) {
                     try {
                         C.focus() 
                     }
                     catch (e) {}
                 }
                 if (O && b == q) {
                     if (!t && b.value != Rb && b.value != "") {
                         o.show();
                     }
                     else if (t && b.value == "") {
                         o.hide();
                     };
                 }
             }
         }
         function hc()
         {
             return O && q.value == "" ? true : false
         }
         o.getSelectedEl = function ()
         {
             return w ? w : y;
         };
         function ob(a)
         {
             a = a || event;
             var d = a.target || a.srcElement, c = a.keyCode || a.which, e = 0;
             N = c == 9;
             E = a.shiftKey;
             R = d;
             if (O)
             {
                 if (d == q)
                 {
                     if (c == 40) {
                         Zb(1);
                     }
                     else if (c == 38) {
                         Zb(-1);
                     }
                     else if (c == 13)
                     {
                         if (d.value != "") if (w) {
                             w.focus();
                             if ($B.RE_WebKit) {
                                 i(w).click();
                             }
                             i(o).trigger("EnterEvent", w)
                         }
                         else if (y) {
                             try {
                                 y.focus()
                             }
                             catch (f) {}
                             i(y).click();
                             i(o).trigger("EnterEvent", y)
                         }
                     }
                     else if (N && !E) {
                         i(o).trigger("TabEvent", a);
                         F(-1);
                         b.closeCurrent()
                     }
                     else if (c == 27 && t) {
                         e = 1;
                     }
                 }
                 else if (N) {
                     if (!E) {
                         if (R != Y) {
                             F(Z + 1);
                         }
                         else {
                             F(-1);
                         }
                         else if (E) {
                             F(Z - 1);
                         }
                         if (e) {
                             return $f.cancelEvent(a);
                         };
                     }
                 }
             }
         }
         function Zb(b)
         {
             if (P) {
                 var a = Z + b;
                 if (a >= P) {
                     a = 0;
                 }
                 else if (a < 0) {
                     a = P - 1;
                 }
                 F(a)
             }
         }
         function F(a)
         {
             if (P)
             {
                 if (w) {
                     $css.remove(w, gb);
                 }
                 Z = a;
                 if (Z > -1) {
                     w = D[Z];
                     $css.add(w, gb);
                     $css.remove(y, qb)
                 }
                 else {
                     w = L;
                     $css.add(y, qb)
                 }
             }
         }
         function M()
         {
             if (N && E && R == q) {
                 o.hide();
                 o.menuOnmouseout()
             }
             else if (!Q && (!E && N && R == Y || E && N && R == C)) {
                 o.hide();
                 o.menuOnmouseout()
             }
             else if (!t && R == q) {
                 o.menuOnmouseout();
             }
         }
         function Pb()
         {
             var a = N && !E ? C : q;
             try {
                 a.focus()
             }
             catch (c) {}
         }
         function Ub(c, b)
         {
             var a = "opacity";
             if ($B.IE) {
                 a = "filter";
             }
             c[d][a] = a == "filter" ? "alpha(opacity=" + b + ")" : .01 * b
         }
         function Gb(a)
         {
             var b = a.binding && a.binding.toggleState ? a : null;
             while (!b && (a = a.parentNode) && typeof a != "undefined") {
                 if (a.binding && a.binding.toggleState) {
                     b = a;
                 }
                 return b;
             }
         }
         kc()
     }
     b.closeCurrent = function ()
     {
         if (b.current) {
             b.current.hide(0, 1);
         }
     };
     b.current = null;
     b.closeAll = function ()
     {
         while (b.current) {
             b.closeCurrent();
         }
     };
     b.emptyFunction = function () {};
     (function ()
     {
         if ($B.Chrome || $B.Safari) {
             c(g, l, o);
             c(f, j, b.emptyFunction)
         }
     })();
     function o()
     {
         if ($B.Chrome || $B.Safari) {
             a(f, j, b.emptyFunction);
             a(g, l, o)
         }
     }
     function c(a, b, c)
     {
         if (a) {
             i(a).bind(b, c);
         }
     }
     function a(a, b, c)
     {
         if (a) {
             i(a).unbind(b, c);
         }
     }
     b.bind = function (p, o, l, a, j, n, e, f, c, d, h, k, g, i)
     {
         var m = 
         {
             offset : l, alt : a == undefined ? 0 : a, nofocus : j, posabs : n, defaultLoc : e, hoverDelay : f, 
             hoverCloseDelay : c, forceDispose : d, parentEl : h, menuEl : k, eventType : g, sourceEl : i
         };
         return b.create(p, o, m);
     };
     b.create = function (j, D, a)
     {
         j = j || event;
         a = a || {};
         var E = j.target || j.srcElement, o = ["c_ml", "c_mcp", "c_m"], r = E, A = a.offset, C = a.alt == undefined ? 1 : a.alt, 
         z = a.nofocus, B = a.posabs, v = a.defaultLoc, w = a.hoverDelay, t = a.hoverCloseDelay, q = a.forceDispose, 
         g = a.parentEl, c = a.menuEl, i = a.eventType, f = a.sourceEl, s = a.skipEdgeDetection, u = a.noDockCache, 
         y = a.maxWidth;
         f = f || $f.pn(r, o[0]);
         if (f && typeof f.menu === "undefined" || q)
         {
             g = g || $f.pn(r, o[1]) || f[k];
             if (g)
             {
                 if (m && g.tagName == "LI" && $css.has(g[k], "c_m")) {
                     g[d][h] = g.offsetWidth + e;
                 }
                 var l = g.childNodes, p = l.length;
                 while (p--&& !c) {
                     c = $css.has(l[p], o[2]) ? l[p] : null;
                 }
                 if (q && c && c.binding) {
                     c.binding.dispose();
                 }
                 return x();
             }
         }
         function x()
         {
             var g = false, h = 0, d = 1, e = 2, a = h;
             if (c.binding) {
                 a = d;
             }
             else if (c && f)
             {
                 i = i || j.type;
                 c.binding = new b(c, f, D, A, C, z, i, B, v, w, t, s, u, y);
                 a = d;
                 if ((i == "mouseover" || i == "focus") && f.tagName != n) {
                     a = e;
                 }
                 f.menu = c.binding;
                 g = true
             }
             if (a == d) {
                 c.binding.toggleState();
             }
             else if (a == e) {
                 c.binding.menuOnmouseover();
             }
             return g
         }
         return false;
     };
     g.$menu = b;
 })();
 (function ()
 {
     var d = window, c = d.jQuery, f = d.$Config, k = d.$Do, M = d.$Cookie, m = [], T = "SC.HNav", fb = "c_winLogo", 
     eb = "c_ht_home", W = "c_ht_devices", bb = "c_ht_mobile", Y = "c_ht_install", U = "c_ht_services", 
     X = "c_ht_mail", n = "c_mm_clc0", V = "c_ht_skydrive", r = "c_profile", s = "c_signout", J = "c_hprivacy", 
     H = "c_hli", I = "c_hoptions", E = "c_wimn", D = "c_himlo", h = "c_memenu", a = {};
     a[fb] = "1";
     a[eb] = "1";
     a[W] = "1B";
     a[bb] = "1C";
     a[Y] = "1D";
     a[U] = "1E";
     a[X] = "2";
     a[n] = "3";
     a[V] = "4";
     a[r] = "6";
     a[s] = "7";
     a[J] = "8B";
     a[H] = "8C";
     a[I] = "8D";
     a[E] = "8F";
     a[D] = "8A";
     a[h] = "8E";
     var u = c("#c_signin"), N = function ()
     {
         for (var a = 0; a < m.length; a++) {
             m[a].unbind("click");
         }
         u.unbind();
         c(d).unbind("unload", N)
     },
     R = function (c)
     {
         if (d.$PF)
         {
             var a = encodeURIComponent($PF.getCurrentUrl()), b = $f.replaceQs(u.attr("href"), "wreply", 
             a);
             $BSI.navigateTo(b, "_top");
             return $f.cancelEvent(c);
         }
     };
     u.bind("click", R);
     c(d).bind("unload", N);
     if (!d.$HIC) {
         return;
     }
     var b = [], v, w, p, o, F, G, q, cb = function (b, c, a)
     {
         this.execute = function (d)
         {
             if (d.href.indexOf("?rru=home") > -1) {
                 d.href = d.href.replace(c, a);
             }
             else {
                 d.href = d.href.replace(b, a);
             }
         }
     },
     hb = function (b, a)
     {
         this.execute = function (c)
         {
             var e = "://" + a, d = "://" + b + a;
             c.href = c.href.replace(e, d);
         }
     },
     j = function (a, b, c)
     {
         this.execute = function (h)
         {
             var d = h.href;
             if (d.indexOf(b) > -1 && d.indexOf("#") < 0 && !d.match(/[\?|&|\/]cid/)) if (c)
             {
                 var g = "." + f.d, i = g + "/" + a;
                 if (b.toLowerCase() == "profile" && d.indexOf("/home") > 0) {
                     g += "/home";
                 }
                 h.href = d.replace(g, i)
             }
             else {
                 var j = "cid=" + a, e = "?";
                 if (d.indexOf(e) > -1) {
                     e = "&";
                 }
                 h.href = d + e + j;
             }
         }
     },
     Z = function (d, b, a, c)
     {
         this.execute = function (e)
         {
             if (d && e.href.indexOf("?rru=inbox") > -1) {
                 e.href = d;
             }
             else if (b && e.href.indexOf("?rru=compose") > -1) {
                 e.href = b;
             }
             else if (a && e.href.indexOf("?rru=contacts") > -1) {
                 e.href = a;
             }
             else if (c && e.href.indexOf("?rru=home") > -1) {
                 e.href = c;
             }
         }
     },
     e = function (b, c, d)
     {
         if (b && Boolean(a[c]))
         {
             b.bind("click", function ()
             {
                 var b = a[c];
                 if (Boolean(d)) {
                     b = b + d;
                 }
                 $BSI.reportEvent(T, {
                     HeaderNav : b
                 })
             });
             m.push(b)
         }
     },
     Q = function (b)
     {
         var d = b.getAttribute("hid");
         if (d == h)
         {
             c(b).find("a").each(function () 
             {
                 var b = c(this), a = b.attr("id");
                 if (a == J || a == H || a == I || a == E || a == D) {
                     e(b, a);
                 }
                 else {
                     e(b, h) ;
                 }
             });
         }
         else if (d == n) {
             c(b).find("a").each(function () 
             {
                 e(c(this), n, "A") 
             });
         }
         else if (Boolean(a[d])) {
             e(c(b), d, "A");
         }
     };
     k.register("$Header.MenuBind", Q);
     var S = function ()
     {
         e(c("#c_h_theme_m_ul"), h)
     };
     k.register("$Header.ThemesMenuBind", S);
     var P = function (a)
     {
         e(c(a), h)
     };
     k.register("$Header.LinkedIdMenuBind", P);
     if (f.Header)
     {
         v = f.Header.HomeLink;
         w = f.Header.MailLink;
         p = f.Header.ContactsLink;
         q = f.Header.ComposeLink;
         o = f.Header.HotmailDomain;
         G = f.Header.OldHomeDomain;
         F = f.Header.OldHotmailDomain
     }
     var db = o;
     if (w || q || p || v) {
         b[b.length] = new Z(w, q, p, v);
     }
     else if (db) {
         b[b.length] = new cb(F, G, o);
     }
     var g = $HIC.c;
     if (g && g.length > 0)
     {
         b[b.length] = new j("cid-" + g, "profile", true);
         b[b.length] = new j(g, "photos");
         b[b.length] = new j(g, "office");
         b[b.length] = new j(g, "skydrive")
     }
     var i = [], x = [], L = d._ge("c_header");
     if (L) {
         var gb = $css.getCN("c_hleft", "div", L)[0];
         x = gb.getElementsByTagName("a")
     }
     for (var A = x.length - 1; A >= 0; A--) {
         var y = x[A];
         i.push(y);
         var O = y.getAttribute("hid");
         e(c(y), O)
     }
     var ib = c("#c_hmc").find("a").each(function ()
     {
         i.insert(0, this)
     }), t = d._ge(r);
     if (t) {
         i.push(t);
         e(c(t), r);
         e(c("#" + s), s)
     }
     var l, z;
     for (var C = i.length - 1; C >= 0; C--)
     {
         l = i[C];
         if (l.href.indexOf("//g.live") > -1) {
             l.target = "_top";
         }
         for (var B = b.length - 1; B >= 0; B--) {
             z = b[B];
             if (z) {
                 z.execute(l);
             }
         }
     }
     var K = "HIC";
     function ab()
     {
         var d = window.location.host.split("."), f = "." + d[d.length - 2] + ".com", c = new Date, b = $HIC;
         c.setDate(c.getDate() + b.e);
         var e = M.getCookie(K, 1) || "|||", a = e.split("|");
         if (a[0] != b.c) {
             a[1] = a[2] = a[3] = "";
         }
         a[0] = b.c ? b.c : a[0] || "";
         a[1] = b.m || b.m === 0 ? b.m : a[1] || "";
         a[2] = b.l || b.l === 0 ? b.l : a[2] || "";
         M.setCookie(K, a.join("|"), f, 0, c, 1)
     }
     k.register("$Header.UpdateCookie", ab)
 })();
 (function ()
 {
     var a = window, q = a.jQuery, b = a.$Config, l = a.$Network, e, d =- 1, f = 0, o = a._ge("c_me"), 
     m = a._ge("c_melink"), c, g, h;
     if (b && b.Header && b.Header.baseUrl && o) {
         d = 0;
     }
     function j(d)
     {
         var c = [];
         c.push('<div id="c_h_theme_m" class="c_om noresize t_hovl"><ul class="c_oblock c_ot" id="c_h_theme_m_ul" serviceurl="' + b.Themes.ThemeService.encodeHtmlAttribute() + '">');
         var k = '<li class="c_omti">', j = '<div class="c_clr"></div></li>', i = true, l = d ? Math.min(8, 
         d.length) : 8;
         for (var h = 0; h < l; h++)
         {
             i = false;
             if (h % 4 == 0) {
                 c.push(k);
             }
             c.push('<a href="#" onclick="return false;" info="');
             c.push(d ? (d[h][0] + "|" + d[h][1] + "|" + d[h][2]).encodeHtmlAttribute() : "");
             c.push('" class="c_thmb" title="');
             c.push(d ? d[h][3].encodeHtmlAttribute() : "");
             c.push('">' + (d ? "" : '<div class="c_noimg"></div>') + "</a>");
             if (h % 4 == 3) {
                 i = true;
                 c.push(j)
             }
         }
         if (!i) {
             c.push(j);
         }
         c.push("</ul></div>");
         g.innerHTML = c.join("");
         e = a._ge("c_h_theme_m");
         if (d) {
             a.$theme.bind(e, $menu.themeAreaId);
         }
         e.style.display = "block";
         f = 1
     }
     function n()
     {
         if (d == 0)
         {
             if (!f) {
                 c = a._ge("c_theme_menu");
                 if (c) {
                     g = c.parentNode;
                     c = null;
                     j()
                 }
             }
             if (f) {
                 if ($BSI.isLoading()) {
                     $BSI.addLoadedCallback(i);
                 }
                 else {
                     i();
                 }
                 if (m.menu) {
                     m.menu.update();
                 }
             }
         }
     }
     function i()
     {
         if (d == 1) {
             return;
         }
         d = 1;
         $menu.themeAreaId = "c_h_theme_m_ul";
         $menu.disableThumbs = 0;
         if (!h)
         {
             h = 1;
             l.fetchScript(b.handlerBaseUrl + "/Handlers/ThemePickerJS.mvc" + b.Themes.ThemeJSParms, k);
             l.fetchScript(b.Header.baseUrl + "themes.js", k)
         }
         setTimeout(p, 5)
     }
     function p()
     {
         (function b()
         {
             if ("undefined" == typeof a.$theme) {
                 $menu.themeCallback = b;
             }
             else
             {
                 a.$theme.renderThemePicker = function (a)
                 {
                     var g = a.length;
                     window.themejs = null;
                     var b = 1, c, d, e = g - 1;
                     for (var f = b; f < a.length; f++)
                     {
                         c = Math.floor(Math.random() * e) + b;
                         d = Math.floor(Math.random() * e) + b;
                         var h = a[c];
                         a[c] = a[d];
                         a[d] = h
                     }
                     j(a);
                     $Do.when("$Header.ThemesMenuBind")
                 };
                 $Do.register("$theme.renderThemePicker", a.$theme.renderThemePicker)
             }
         })()
     }
     $Do.register("$ThemeMenuInit", n);
     function k() {}
 })();
 (function ()
 {
     var a = window, b = a.jQuery, q = a.$Network, o = a.$WebWatson, r = a.Debug, h = [], j = "mouseover", 
     l = "focus", k = "unload";
     b(a).bind(k, g);
     function f(c)
     {
         var b = a.$Logout;
         if (b && b.doLogout) {
             b.doLogout(c);
         }
     }
     var e = a._ge("c_signout");
     if (e) {
         b(e).bind("click", f);
     }
     function n(i)
     {
         try
         {
             var g = a._ge("c_me");
             if (!g) {
                 return;
             }
             g = a._ge("c_memenu");
             var k = document.createElement("span");
             k.className = "c_ms";
             g.lastChild.appendChild(k);
             var l = i.CIDLIST, e = i.CredNameList, d = Math.min(l.length, e.length), j = $Config.Header.MemberName;
             while (d--)
             {
                 var n = document.createElement("li"), c = document.createElement("a");
                 c.href = $Config.Header.SwitchLinkedIdUrl + "&cid=" + l[d];
                 c.target = "_top";
                 b(c).bind("click", f);
                 h.push(c);
                 if (e[d] === j) {
                     c.className = "sel";
                     c.title = $Config.Header.CurrentIdString.replace("{0}", j)
                 }
                 else {
                     c.title = $Config.Header.SwitchIdString.replace("{0}", e[d]);
                 }
                 c.innerHTML = e[d];
                 n.appendChild(c);
                 g.appendChild(n);
                 $Do.when("$Header.LinkedIdMenuBind", 0, c)
             }
             var m = a._ge("c_melink").menu;
             if (m) {
                 m.update();
             }
         }
         catch (p) {
             o.submitFromException(p)
         }
     }
     $Do.register("BuildLinkedIdMenu", n);
     var c = a._ge("c_me"), m, i;
     if (window.$Config && $Config.Header && $Config.Header.LinkedIdUrl) if (c) {
         b(c).bind(j, d);
         b(c).bind(l, d);
         i = 1
     }
     function g()
     {
         b(a).unbind(k, g);
         if (e) {
             b(e).unbind("click", f);
         }
         for (var m = 0; m < h.length; m++) {
             h[m].unbind("click", f);
         }
         if (i) {
             b(c).unbind(j, d);
             b(c).unbind(l, d)
         }
     }
     function d()
     {
         if (!m) {
             m = 1;
             g();
             q.fetchScript($Config.Header.LinkedIdUrl, p)
         }
     }
     function p() {}
 })();
 (function ()
 {
     var b = window, a = b.jQuery, f = b["$footer"] = {}, c = b._ge("uxp_ftr_control_mini"), i = b._ge("uxp_ftr_hidechevron"), 
     h = b._ge("uxp_ftr_control_cc"), d = b._ge("uxp_ftr_link_language");
     f.dispose = function n()
     {
         if (c) {
             a(document).unbind("click", g);
             a(c).unbind();
             a(i).unbind()
         }
         a(d).unbind();
         a(window).unbind("unload", f.dispose)
     };
     function k(e)
     {
         if (b.$PF)
         {
             var a = encodeURIComponent($PF.getCurrentUrl()), c = $f.replaceQs(d.href, "ru", a);
             $BSI.navigateTo(c);
             return $f.cancelEvent(e);
         }
     }
     function e(b, a, c)
     {
         h.style.display = a;
         if (c) {
             b.returnValue = false;
             return false;
         }
     }
     function l(a)
     {
         return e(a, "none", true)
     }
     function m(a)
     {
         return e(a, "", true)
     }
     function j(b, c)
     {
         return b && (b.id === c || j(a(b).parent(), c))
     }
     function g(a)
     {
         if (h.style.display === "" && !j(a.target, c.id)) {
             return e(a, "none", false);
         }
     }
     if (c) {
         a(document).bind("click", g);
         a(c).bind("click", m);
         a(i).bind("click", l)
     }
     a(d).bind("click", k);
     a(window).bind("unload", f.dispose)
 })();
 (function ()
 {
     var a = window, b = a.$newScript;
 })();
 (function ()
 {
     var a = window;
     a.CollapsingMenu = function b(k, o, b, g, i, d)
     {
         var l = " &#9660;", m = $B.ltr ? " &#9658;" : " &#9668;", a = b.lastChild.childNodes[1], n = b.firstChild, 
         c = false;
         if (!d) {
             d = a.parentNode;
             c = true
         }
         this.redraw = function ()
         {
             var l = $css.getCN("c_collRem", "a", a)[0];
             if (l) {
                 var i = l.parentNode;
                 i.parentNode.removeChild(i)
             }
             var e = b.childNodes.length - 1;
             while (e < k && a.childNodes.length != 0) {
                 j(a.firstChild, false);
                 b.insertBefore(a.firstChild, b.lastChild);
                 e++
             }
             while (e > k) {
                 f();
                 e--
             }
             a.parentNode.style.display = g;
             while (h()) {
                 f();
             }
             if (a.childNodes.length == 0) {
                 a.parentNode.style.display = "none";
             }
             else {
                 a.parentNode.style.display = g;
                 d = a.parentNode;
                 var m = c;
                 c = false;
                 if (h()) {
                     f();
                 }
                 c = m;
             }
         };
         function h()
         {
             var f, a = c ? d.previousSibling : d;
             if (a)
             {
                 if ($B.ltr) {
                     f = b.parentNode.offsetWidth + e(b.parentNode) < a.offsetWidth + e(a) + i + 20;
                 }
                 else {
                     f = e(b.parentNode) > e(a) - (i + 20);
                 }
                 return b.childNodes.length > o && f || n.offsetTop < a.offsetTop - a.offsetHeight
             }
             else {
                 return false;
             }
         }
         function e(a)
         {
             var b = a.offsetLeft;
             while (a.nodeName.toLowerCase() != "body" && a.nodeName.toLowerCase() != "html") {
                 a = a.offsetParent;
                 if (a) {
                     b += a.offsetLeft;
                 }
                 else {
                     break;
                 }
             }
             return b
         }
         function f()
         {
             var c = b.lastChild.previousSibling;
             j(c, true);
             a.insertBefore(c, a.firstChild)
         }
         function j(b, d)
         {
             if (b.childNodes.length > 1 && b.childNodes[1].nodeName.toLowerCase() == "ul")
             {
                 var c = b.getElementsByTagName("SPAN");
                 for (var a = 0; a < c.length; a++) if (c[a].className == "c_chev") {
                     c[a].innerHTML = d ? m : l;
                     break
                 }
             }
         }
     }
 })();
 (function ()
 {
     var c = window, f = c.jQuery, n = c.$CommandBar = {}, l = c.$edh, a = {}, b = f(c), k = "resize", 
     d = "wlResize", i, j, e = 0;
     a.Start = function ()
     {
         b.bind(k, h)
     };
     a.Stop = function ()
     {
         b.unbind(k, h)
     };
     function h()
     {
         if (!e) {
             e = 1;
             g()
         }
     }
     function g()
     {
         var b = $f.docWidth(), a = $f.docHeight();
         if (b != j || a != i) {
             j = b;
             i = a;
             setTimeout(g, 10)
         }
         else {
             e = 0;
             f(c).trigger(d)
         }
     }
     function m()
     {
         var h = $css.getCN("c_c", "div", document);
         for (var g = 0; g < h.length; g++)
         {
             var c = h[g];
             if (!f(c).hasClass("c_ncolapse"))
             {
                 c.collapse = new CollapsingMenu(c.m, c.i, c.firstChild, c.s, 14);
                 if (c.r) {
                     c.collapse.redraw();
                 }
                 c.DisableCommand = function (a)
                 {
                     var b = c.getElementsByTagName("a")[a];
                     l.d(b)
                 };
                 c.EnableCommand = function (a)
                 {
                     var b = c.getElementsByTagName("a")[a].parentNode;
                     l.e(b)
                 };
                 c.dispose = function () {};
                 var e = window.$Config;
                 if (e && e.CommandBar && e.CommandBar.resize)
                 {
                     b.bind(d, c.collapse.redraw);
                     a.Start();
                     c.dispose = function ()
                     {
                         b.unbind(d, c.collapse.redraw);
                         if (a._handlers.length == 0) {
                             a.Stop();
                         }
                     }
                 }
             }
         }
     }
     n.init = m;
     b.bind("load", m)
 })();
 (function ()
 {
     var e = window, c = e.jQuery, h = e.wLive.Controls, g = e.$edh;
     h.NavLink = b;
     function b(d, b)
     {
         var a = this;
         a.$obj = c(d).first();
         if (b)
         {
             a._$a = a.$obj.children("a").first();
             if (a._$a.length == 0) {
                 a._$a = null;
             }
             sutra(a._$a, "$Sutra.Shared.NavLink");
             a._$span = a.$obj.children("span").first();
             if (a._$span.length == 0) {
                 a._$span = null;
             }
             a._$sep = a.$obj.children("span.c_ms").first();
             if (a._$sep.length == 0) {
                 a._$sep = null;
             }
             a._$rchev = a.$obj.children("span.c_rchev").first();
             if (a._$rchev.length == 0) {
                 a._$rchev = null;
             }
         }
         else {
             f(a, false);
         }
     }
     var a = b.prototype;
     a.setHtml = function (b)
     {
         var a = this;
         d(a);
         a._$a.html(b);
         sutra(a._$a, "$Sutra.Shared.NavLink");
         if (a._$span) {
             a._$a.detach();
             a._$span.html(b);
             a._$span.append(a._$a)
         }
         return a;
     };
     a.setUrl = function (b)
     {
         var a = this;
         d(a);
         a._$a.attr("href", b);
         return a;
     };
     a.enable = function ()
     {
         var a = this;
         if (a._$span)
         {
             g.e(a._$span[0]);
             a._$a = a.$obj.find("a").first();
             sutra(a._$a, "$Sutra.Shared.NavLink");
             a._$span = null
         }
         return a;
     };
     a.disable = function ()
     {
         var a = this;
         if (a._$a) {
             g.d(a._$a[0]);
             a._$span = a.$obj.find("span").first()
         }
         return a;
     };
     function d(a)
     {
         if (!a._$a || a._$a.length == 0) {
             a._$a = c("<a></a>");
             sutra(a._$a, "$Sutra.Shared.NavLink");
             a.$obj.append(a._$a)
         }
     }
     a.removeClick = function ()
     {
         var a = this;
         if (a._aclickHandler) {
             a._$a.unbind("click", a._aclickHandler);
         }
         return a;
     };
     a.addClick = function (c, b)
     {
         var a = this;
         d(a);
         a.removeClick();
         if (!b) {
             a.setUrl("#");
         }
         a._aclickHandler = function (b)
         {
             var a;
             try {
                 a = c(b)
             }
             catch (d) {
                 $WebWatson.submitFromException(d);
                 return false
             }
             return a;
         };
         a._$a.click(a._aclickHandler);
         return a;
     };
     a.addSeparator = function ()
     {
         var a = this;
         if (!a._$sep) {
             a._$sep = c('<span class="c_ms"></span>');
             a.$obj.append(a._$sep)
         }
         a._$sep.show();
         return a;
     };
     a.removeSeparator = function ()
     {
         var a = this;
         if (a._$sep) {
             a._$sep.hide();
         }
         return a;
     };
     a.addRChev = function ()
     {
         var a = this;
         if (!a._$rchev)
         {
             a._$rchev = c('<span class="c_rchev"></span>');
             a.$obj.append(a._$rchev);
             if ($B.ltr) {
                 a._$rchev.html(" &#9658;");
             }
             else {
                 a._$rchev.html(" &#9668;");
             }
         }
         a._$rchev.show();
         return a;
     };
     a.removeRChev = function ()
     {
         var a = this;
         if (a._$rchev) {
             a._$rchev.hide();
         }
         return a;
     };
     function f(a, b)
     {
         if (b) {
             a.$obj = null;
         }
         a._$a = null;
         a._$span = null;
         a._$sep = null;
         a._$rchev = null
     }
     a.dispose = function ()
     {
         var a = this;
         a.removeClick();
         f(a, true)
     };
     b.defaultOptions = {
         html : "", separator : false, url : "#", click : null, container : "<li></li>"
     };
     b.create = function (e)
     {
         var a = c.extend({}, b.defaultOptions, e), d = new b(a.container);
         d.setHtml(a.html);
         d.setUrl(a.url);
         if (a.separator) {
             d.addSeparator();
         }
         if (a.click) {
             d.addClick(a.click, a.url);
         }
         return d;
     }
 })();
 (function ()
 {
     var o = window, b = o.jQuery, h = o.wLive.Controls, p = h.NavLink, m = "c_m";
     h.Menu = c;
     function c(d, c)
     {
         var a = this;
         a._items = [];
         a.$obj = b(d).first();
         if (!c)
         {
             a.$obj.html('<a href="#" class="uxfa_ml c_ml"><span class="c_mlu"></span><span class="c_chev"> &#9660;</span></a><ul class="uxfa_m ' + m + ' t_hovl"></ul>');
         }
         a._$a = a.$obj.children("a").first();
         a._$mspan = a._$a.children("span.c_mlu").first();
         a._$ul = a.$obj.children("ul");
         a._menu = a._$ul[0].binding;
         a._$chev = a._$a.children("span.c_chev").first();
         i(a);
         if (!c)
         {
             a._$a.bind("click.menu", function (b) 
             {
                 if (!a._menu && a._items.length > 0) {
                     if ($menu.create(b, 0)) {
                         a._menu = a._$ul[0].binding;
                     }
                     return false;;
                 }
             });
         }
     }
     var a = c.prototype;
     h.CommandBar = g;
     function g(d, c)
     {
         var a = this;
         a.$obj = b(d);
         sutra(a.$obj, "$Sutra.Shared.CommandBar");
         a._items = [];
         if (!c) {
             a.$obj.html('<ul class="c_cc"></ul>');
         }
         a._$ul = a.$obj.children("ul").first();
         i(a)
     }
     var e = g.prototype;
     h.BreadcrumbBar = f;
     function f(d, c)
     {
         var a = this;
         a.$obj = b(d);
         sutra(a.$obj, "$Sutra.Shared.BreadcrumbBar");
         a._items = [];
         if (!c) {
             a.$obj.html("<ul></ul>");
         }
         a._$ul = a.$obj.children("ul").first();
         i(a)
     }
     var d = f.prototype;
     function i(a)
     {
         var d = a._$ul.children("li");
         d.each(function ()
         {
             var d = b(this);
             if (d.children("ul." + m).length == 1) {
                 a._items.push(new c(d, true));
             }
             else {
                 a._items.push(new p(d));
             }
         })
     }
     d.get = e.get = a.get = function (a)
     {
         return this._items[a];
     };
     a.makeSubMenu = function ()
     {
         var a = this;
         if ($B.ltr) {
             a._$chev.html(" &#9658;");
         }
         else {
             a._$chev.html(" &#9668;");
         }
         return a;
     };
     a.setHtml = function (b)
     {
         var a = this;
         a._$mspan.html(b);
         return a;
     };
     function k(b, a)
     {
         b._$ul.append(a.$obj);
         b._items.push(a)
     }
     a.add = function (b)
     {
         var a = this;
         k(a, b);
         if (a._menu) {
             a._menu.update();
         }
         return a;
     };
     e.add = function (a)
     {
         var b = this;
         sutra(a.$obj, "$Sutra.Shared.CommandItem");
         k(b, a);
         return b;
     };
     d.add = function (b)
     {
         var a = this, c = a._items.length;
         if (c > 0) {
             var d = a._items[c - 1];
             d.addRChev().enable()
         }
         sutra(b.$obj, "$Sutra.Shared.Breadcrumb");
         k(a, b);
         l(a);
         return a;
     };
     function j(b, d, c)
     {
         var a = b._items.splice(d, 1);
         a[0].$obj.remove();
         b._$ul = b.$obj.children("ul");
         if (c) {
             a[0].dispose();
         }
         return a[0]
     }
     a.remove = function (d, b)
     {
         var a = this, c = j(a, d, b);
         if (a._menu) {
             a._menu.update();
         }
         return c;
     };
     e.remove = function (b, a)
     {
         return j(this, b, a);
     };
     d.remove = function (b, c)
     {
         var a = this, d = j(a, b, c);
         if (b == a._items.length) {
             l(a);
         }
         return d;
     };
     d.count = e.count = a.count = function ()
     {
         return this._items.length;
     };
     function n(a)
     {
         var b = a._items;
         if (b) {
             for (var c = 0; c < b.length; c++) {
                 b[c].dispose();
             }
         }
         a._items = [];
         a._$ul && a._$ul.html("");
         return a
     }
     a.clear = function ()
     {
         var a = this;
         n(a);
         if (a._menu) {
             a._menu.update();
         }
         return a;
     };
     d.clear = e.clear = function ()
     {
         var a = this;
         n(a);
         return a;
     };
     a.dispose = function ()
     {
         var a = this;
         a._$a.unbind(".menu");
         a.clear();
         if (a._menu) {
             a._menu.dispose();
         }
     };
     d.dispose = e.dispose = function ()
     {
         var a = this;
         a.clear()
     };
     c.defaultOptions = {
         html : "", subMenu : false, container : '<li class="c_mcp"></li>', menuParams : null
     };
     c.create = function (e)
     {
         var a = b.extend({}, c.defaultOptions, e), d = new c(a.container);
         d.setHtml(a.html);
         if (a.subMenu) {
             d.makeSubMenu();
         }
         return d;
     };
     g.defaultOptions = {
         container : '<div class="c_c c_cbb c_ccptc"></div>'
     };
     g.create = function (c)
     {
         var a = b.extend({}, g.defaultOptions, c), d = new g(a.container);
         return d;
     };
     function l(c)
     {
         var b = c._items, a = b.length;
         if (a > 0) {
             b[a - 1].disable().removeRChev()._$span.addClass("link");
         }
     }
     f.defaultOptions = {
         container : '<div class="c_bcb"></div>'
     };
     f.create = function (c)
     {
         var a = b.extend({}, f.defaultOptions, c), d = new f(a.container);
         return d;
     }
 })();
 (function ()
 {
     var a = window, c = a.$AdServeMsngr = new b;
     function b()
     {
         var b = this, e = 0, d = [], c = false;
         b.toFrame = function (b, c, d, a)
         {
             g(b, c, d, "htof", a)
         };
         b.toHost = function (b, c, a)
         {
             g(null, b, c, "ftoh", a)
         };
         function g(g, j, e, h, d)
         {
             if (h == "htof" && !g || !d || !j) {
                 return;
             }
             e = e ? b.serialize(e, "##", "$$") : "";
             var i = b.serialize({
                 frameName : g, message : e, fn : j
             },
             ":", ";");
             if (a["postMessage"]) {
                 var k = h == "htof" ? a.frames[g] : a.parent;
                 if (k) {
                     k.postMessage(i, "*");
                 }
             }
             else
             {
                 var c = d.split("/");
                 if (h == "ftoh" && !(c.length >= 3 && (c[0] == "http:" || c[0] == "https:") && (c[2].indexOf(".live.com") !=- 1 || c[2].indexOf(".live-int.com") !=- 1))) {
                     return;
                 }
                 f(d + (d.indexOf("?") !=- 1 ? "&" : "?") + "c={cachebrk}" + "#" + i)
             }
         }
         function f(i)
         {
             if (!c)
             {
                 c = true;
                 var j = "adNegFrm";
                 e = e == 0 ? 1 : 0;
                 i = i.replace("{cachebrk}", e);
                 if (!a.frames[j])
                 {
                     var g = document.createElement("iframe");
                     g.id = g.name = j;
                     b.attachDOMEvent(g, "load", h);
                     g.src = i;
                     var k = "adservtmp", f = document.getElementById(k);
                     if (!f)
                     {
                         f = document.createElement("div");
                         f.setAttribute("id", k);
                         f.style.display = "none";
                         document.body.appendChild(f)
                     }
                     f.appendChild(g)
                 }
                 else {
                     a.frames[j].location.replace(i);
                 }
             }
             else {
                 d.push(i);
             }
         }
         function h()
         {
             c = false;
             if (d.length > 0) {
                 f(d.shift());
             }
         }
         b.receiveMessage = function (l)
         {
             var g = l || event;
             if (!g || !g.data || !g.origin) {
                 return;
             }
             var e = g.origin, d = null;
             if (a["$AdConfig"] && (e.endsWith(".wlxrs.com") || e.endsWith(".wlxrs-int.com") || e.endsWith(".shared-dev.live-int.com"))) {
                 d = "ftoh";
             }
             else if (a["$WLXRmAd"] && (e.endsWith(".live.com") || e.endsWith(".live-int.com"))) {
                 d = "htof";
             }
             if (!d) {
                 return;
             }
             var c = b.deSerialize(g.data, ":", ";");
             if (!c || !c.fn) {
                 return;
             }
             if (d == "htof") {
                 if (!(c.fn == "$AdServe.refreshAd" || c.fn == "$AdServe.getRadIds")) {
                     return;
                 }
             }
             else if (d == "ftoh")
             {
                 if (!(c.fn == "$Acb.setRadIds" || c.fn == "$RmAdHandler.processMsg" || c.fn == "$RmAdHandler.processMsgFromHeader")) {
                     return;
                 }
             }
             else {
                 return;
             }
             var h = window;
             if (a["postMessage"]) {
                 h = a;
             }
             else
             {
                 var i = c.frameName;
                 if (d == "htof" && i && (i.endsWith("_frm") || i.endsWith("_hfrm"))) {
                     h = a.parent.frames[i];
                 }
                 else if (d == "ftoh") {
                     h = a.parent.parent;
                 }
             }
             var k = c.fn.split("."), f = null;
             for (var j = 0; j < k.length; ++j) {
                 f = f ? f[k[j]] : h[k[j]];
                 if (!f) {
                     return;
                 }
             }
             f(c.message ? b.deSerialize(c.message, "##", "$$") : null)
         };
         b.serialize = function (a, e, d)
         {
             if (!a) {
                 return "";
             }
             var c = [];
             if (typeof a == "object")
             {
                 for (var b in a)
                 {
                     if (a[b] && (typeof a[b] === "string" || typeof a[b] === "number" || typeof a[b] === "boolean")) {
                         c.push([encodeURIComponent(b), encodeURIComponent(a[b])].join(e || ":"));
                     };
                 }
             }
             return c.join(d || ";");
         };
         b.deSerialize = function (e, g, f)
         {
             var c = {};
             if (!e) {
                 return c;
             }
             var d = e.split(f || ";");
             for (var b = 0; b < d.length; ++b)
             {
                 var a = d[b].split(g || ":");
                 if (a[0]) {
                     c[decodeURIComponent(a[0])] = a[1] ? decodeURIComponent(a[1]) : "";
                 }
             }
             return c;
         };
         b.attachDOMEvent = function (a, b, c)
         {
             if (a.addEventListener) {
                 a.addEventListener(b, c, false);
             }
             else {
                 a.attachEvent("on" + b, c);
             }
         }
     }
 })();
 (function ()
 {
     var b = window, a = b.$Ads = new c;
     function c()
     {
         var c = this, e = $Cookie.getCookie, f = $Utility.deserialize;
         c.Tags = {
             SDN : "SDN", SCT : "SCT", KW : "KW", PV : "PV"
         };
         c.Init = function (a)
         {
             if (d() && (!a || $AdConfig.ear)) {
                 b.setTimeout(h, $AdConfig.rd);
             }
         };
         function h()
         {
             if (!a.IsInit)
             {
                 for (var d = 0; d < $AdConfig.Data.length; ++d)
                 {
                     var b = $AdConfig.Data[d], e = b[4].indexOf("Crm") >= 0 ? $AdConfig.crmrd : 0;
                     if (e > 0) {
                         g(b, e);
                     }
                     else {
                         c.InitAd(b);
                     }
                 }
                 $BSI.reportEvent("PartnerAdApiCall", null);
                 $BSI.reportEvent("ClickedSelected.Business.AdCall", null)
             }
         }
         function g(d, a)
         {
             b.setTimeout(function ()
             {
                 c.InitAd(d)
             }, a)
         }
         c.InitAd = function (b)
         {
             if (!b || !d() || !_ge(b[0])) {
                 return;
             }
             if ($AdConfig._dispose) {
                 return;
             }
             if (!b.isInit) {
                 $AdLoader.renderAd(b, true);
                 b.isInit = true
             }
             if (!a.IsInit) {
                 a.IsInit = true;
                 a._lr = new Date;
                 a._ac = 0
             }
             if ($Acb._initSkipped && !$Acb._initRetried) {
                 $Acb.init();
                 $Acb._initRetried = true;
             }
         };
         c.Refresh = function ()
         {
             if (!d()) {
                 return;
             }
             if ($AdConfig._dispose) {
                 return;
             }
             $BSI.reportEvent("PartnerAdApiCall", null);
             if (!a.IsInit) {
                 c.Init();
             }
             else if (++a._ac >= $AdConfig.ar)
             {
                 var b = new Date;
                 if ($AdConfig.mi < (b - a._lr) / 1e3) {
                     a._lr = b;
                     a._ac = 0;
                     if ($AdConfig.rCb) {
                         $AdConfig.rCb();
                     }
                     $AdLoader.refreshAds()
                 }
             }
         };
         c.Dispose = function ()
         {
             if (!d()) {
                 return;
             }
             $AdLoader.dispose()
         };
         c.SetTag = function (c, b)
         {
             if (!d()) {
                 return;
             }
             if (!b) {
                 b = "";
             }
             if (c)
             {
                 b = b.trim();
                 if (c == a.Tags.PV && !$AdConfig.dPVTag) {
                     if (b != "I" && b != "R") {
                         b = "";
                     }
                     var e = function (a)
                     {
                         a["pvTag"] = b;
                     };
                     $AdConfig.Data.forEach(e)
                 }
             }
         };
         c.SetSDTag = function (a)
         {
             if (!d()) {
                 return;
             }
             if (!(a && a.indexOf && (a.indexOf("SDN=") >= 0 || a.indexOf("SCT=") >= 0))) {
                 a = "";
             }
             var b = function (b)
             {
                 if (b[5]) {
                     b["sdTag"] = a;
                 }
             };
             $AdConfig.Data.forEach(b)
         };
         function d()
         {
             return typeof $AdConfig != "undefined"
         }
         c.getPGWithTags = function (a)
         {
             if (!a) {
                 return "";
             }
             var g = a["sdTag"] || "", d = a["pvTag"] || "", j = a[1], c = j + (g ? "&" + g : "") + (d ? "&WLV=" + d : "");
             if (a[7])
             {
                 var i = e("MH") || "", b = f(e("ANON") || ""), h = e("MUID") || "";
                 c += (i ? "&PN=" + i.encodeUrl() : "") + (b && b.A ? "&ID=" + b.A.encodeUrl() : "") + (h ? "&MUID=" + h.encodeUrl() : "")
             }
             return c;
         };
         c.getAdData = function (b)
         {
             if (b) {
                 var a = $AdConfig.itod[b];
                 if (isNaN(parseInt(a))) {
                     return;
                 }
                 return $AdConfig.Data[a];
             }
         }
     }
 })();
 (function ()
 {
     var a = window;
     a.$AdLoader = new b;
     function b()
     {
         var b = this, f = 0, c = false;
         b.renderAd = function (b, k)
         {
             if (!b || !_ge(b[0])) {
                 return;
             }
             if ($BSI.isLoading() && k) {
                 $CSIPerf.lapseTimer(b[4]);
             }
             if (b[7] && $AdConfig.ss.rurl && !$AdConfig.fl)
             {
                 var j = a["postMessage"];
                 if (!c)
                 {
                     if (j) {
                         var i = $AdServeMsngr;
                         i.attachDOMEvent(a, "message", i.receiveMessage)
                     }
                     $AdConfig.ss.hnegurl = $AdConfig.ss.hnegurl.replace("!domain!", encodeURIComponent(document.domain));
                     c = true
                 }
                 var h = b[0] + "_frm";
                 if (!_ge(h))
                 {
                     var f = document.createElement("IFRAME");
                     f.id = f.name = h;
                     f.width = b[2];
                     f.height = b[3];
                     f.scrolling = "no";
                     f.frameBorder = "0";
                     f.allowTransparency = true;
                     f.src = $AdConfig.ss.rurl.replace("{0}", "adloader.html") + g(b) + "#" + $AdServeMsngr.serialize(e(h, 
                     true));
                     _ge(b[0]).appendChild(f)
                 }
                 else if (!j && b[4].indexOf("Crm") >= 0) {
                     a.setTimeout(function () 
                     {
                         d(h) 
                     },
                     $AdConfig.crmrd || 2e3);
                 }
                 else {
                     d(h);
                 }
             }
             else if (typeof dapMgr == "undefined" || $AdConfig.fl)
             {
                 var l = _ge(b[0]);
                 l.innerHTML = ["<img src='", $AdConfig.burl, b[4], $AdConfig.ext, "' alt=''>"].join("")
             }
             else
             {
                 dapMgr.enableACB(b[0], false);
                 dapMgr.renderAd(b[0], $Ads.getPGWithTags(b), b[2], b[3])
             }
             if (k) {
                 $Acb.display(b[0]);
             }
         };
         b.refreshAds = function ()
         {
             var e = false;
             for (var d = 0; d < $AdConfig.Data.length; ++d)
             {
                 var a = $AdConfig.Data[d];
                 if (a.isInit && _ge(a[0]))
                 {
                     var f = jQuery("#" + a[0] + "_p").parent(), c = a[4].indexOf("Crm") ==- 1;
                     if (c && f.parent().is(":visible") || !c)
                     {
                         f.css({
                             display : "block"
                         });
                         $Acb.closePopover();
                         $Acb.clearRadIds(a[0]);
                         $RmAdHandler.dispose(a[0]);
                         b.renderAd(a, false);
                         if (!e && c) {
                             $BSI.reportEvent("ClickedSelected.Business.AdCall", null);
                             e = true;
                         }
                     }
                 }
             }
         };
         b.dispose = function ()
         {
             var d, c;
             $AdConfig._dispose = true;
             $AdConfig.fl = true;
             $AdConfig.ar = 1e4;
             for (var b = 0; b < $AdConfig.Data.length; ++b)
             {
                 try 
                 {
                     c = $AdConfig.Data[b];
                     var a = _ge(c[0]);
                     while (a && a.firstChild) {
                         a.removeChild(a.firstChild) ;
                     }
                 }
                 catch (e) {}
             }
         };
         function d(a)
         {
             $AdServeMsngr.toFrame(a, "$AdServe.refreshAd", e(a, false), $AdConfig.ss.rurl.replace("{0}", 
             "AdServeMsg.html"))
         }
         function g(a)
         {
             var b = $AdConfig.ss.srmad, c = "";
             if ($AdConfig.intad && (b == "1" || b == "2") && (a[0].indexOf("300x250") !=- 1 || a[0].indexOf("160x600") !=- 1 || a[0].indexOf("300x600") !=- 1 || a[0].indexOf("958x512") !=- 1)) {
                 c = "?srmad=" + b + "&ow=" + a[2] + "&oh=" + a[3] + "&el=600&er=200&et=300&eb=200";
             }
             return c
         }
         function e(b, d)
         {
             if (!b) {
                 return {};
             }
             var c = $AdConfig.itod[b.replace("_frm", "")], a = $AdConfig.Data[c];
             if (d)
             {
                 return {
                     pgqp : $Ads.getPGWithTags(a), divid : a[0], wt : a[2], ht : a[3], pg : a[6], hnegurl : $AdConfig.ss.hnegurl, 
                     hstkn : $AdConfig.ss.hs, adenv : $AdConfig.intad ? "int" : "", radBetaPrepUrl : $AdConfig.radBetaPrepUrl || "", 
                     adcntr : f++ 
                 };
             }
             else return {
                 pgqp : $Ads.getPGWithTags(a), adcntr : f++
             }
         }
     }
 })();
 (function ()
 {
     var b = window;
     b.$RmAdHandler = new a;
     function a()
     {
         var b = {}, a = null, f = this;
         f.processMsg = function (e)
         {
             if (e && (e.hstkn && e.hstkn == $AdConfig.ss.hs) && e.adDivId && e.act)
             {
                 var f = e.adDivId, g = $Ads.getAdData(f);
                 if (!(g && g[7])) {
                     return;
                 }
                 var h = c(e.adid);
                 if (e.act == "init")
                 {
                     if (!b[f])
                     {
                         var i = 
                         {
                             adDivId : f, width : parseInt(g[2]), height : parseInt(g[3]), left : c(e.ol), 
                             right : c(e.or), top : c(e.ot), bottom : c(e.ob)
                         };
                         b[f] = new $RmExpAd;
                         b[f].init(i, true);
                         d("Init", h)
                     }
                 }
                 else if (e.act == "exp") {
                     if (b[f] && parseInt(g[8] & 1) == 1) {
                         b[f].expand();
                         d("Expand", h)
                     }
                 }
                 else if (e.act == "col") {
                     if (b[f] && parseInt(g[8] & 1) == 1) {
                         b[f].collapse();
                         d("Collapse", h)
                     }
                 }
                 else if (e.act == "createH")
                 {
                     if (!a && parseInt(g[8] & 2) == 2) {
                         a = {};
                         a[f] = new $RmHeaderAd;
                         a[f].createAdContainer(f);
                         d("HeaderCreate", h)
                     }
                 }
                 else {
                     d("InvalidApi", h);
                 }
             }
         };
         f.processMsgFromHeader = function (b)
         {
             if (b && (b.hstkn && b.hstkn == $AdConfig.ss.hs) && b.adDivId && b.act)
             {
                 var f = b.adDivId, h = $Ads.getAdData(f);
                 if (!(h && h[7])) {
                     return;
                 }
                 var g = c(b.adid);
                 if (b.act == "initH")
                 {
                     if (e(f)) {
                         var i = {
                             adDivId : f, height : c(b.ht), bottom : c(b.ob)
                         };
                         a[f].init(i);
                         d("HeaderInit", g)
                     }
                 }
                 else if (b.act == "expH" || b.act == "colH")
                 {
                     if (e(f))
                     {
                         a[f].resize({
                             easingb : c(b.easingb)
                         },
                         b.act == "expH");
                         d(b.act == "expH" ? "HeaderExpand" : "HeaderCollapse", g)
                     }
                 }
                 else if (b.act == "closeH") {
                     if (e(f)) {
                         a[f].close();
                         a[f] = null;
                         a = null;
                         d("HeaderClose", g)
                     }
                 }
                 else {
                     d("InvalidApi", g);
                 }
             }
         };
         f.dispose = function (c)
         {
             if (c) {
                 if (b[c]) {
                     b[c].resetUI();
                     b[c] = null
                 }
                 if (a && a[c]) {
                     a[c].resetUI();
                     a[c] = null;
                     a = null;
                 }
             }
         };
         function e(b)
         {
             return b && a && a[b]
         }
         function c(b)
         {
             var a = !isNaN(parseInt(b)) ? parseInt(b) : 0;
             return a >= 0 ? a : 0
         }
         function d(a, b)
         {
             if (a) {
                 $BSI.reportEvent("ClickedSelected.Business.Ads", {
                     RmAPI : a, RmAPIAdID : b || 0 
                 });
             }
         }
     }
 })();
 (function ()
 {
     var e = window, a = e.jQuery, c = "richmediaad";
     window.$RmExpAd = function () {};
     var b = $RmExpAd.prototype;
     b.init = function (k, h)
     {
         if (!k) {
             return;
         }
         var l = this, d = "px", b = this.params = k, i = b.adDivId;
         if (h)
         {
             var g = _ge(i + "_p").style;
             g.position = "relative";
             g.width = b.width + d;
             g.height = b.height + d
         }
         var f = _ge(i).style;
         if (h) {
             f.position = "absolute";
         }
         f.width = b.width + d;
         f.height = b.height + d;
         f.top = 0 + d;
         f.left = 0 + d;
         var j = _ge(i + "_frm"), e = j.style;
         if (h) {
             e.position = "absolute";
         }
         e.width = b.width + b.left + d;
         e.height = b.height + b.top + d;
         e.left =- b.left + d;
         e.top =- b.top + d;
         a(j).removeClass(c)
     };
     b.expand = function ()
     {
         if (!this.params) {
             return;
         }
         var j = this, e = "px", b = j.params, i = b.adDivId;
         d("expand", b);
         var g = _ge(i).style;
         g.width = b.width + b.left + b.right + e;
         g.height = b.height + b.top + b.bottom + e;
         g.left =- b.left + e;
         g.top =- b.top + e;
         var h = _ge(i + "_frm"), f = h.style;
         f.width = b.width + b.left + b.right + e;
         f.height = b.height + b.top + b.bottom + e;
         f.left = 0 + e;
         f.top = 0 + e;
         a(h).addClass(c)
     };
     b.collapse = function ()
     {
         if (!this.params) {
             return;
         }
         d("collapse", this.params);
         this.init(this.params, false)
     };
     b.resetUI = function ()
     {
         if (!this.params) {
             return;
         }
         var k = this, i = "px", j = k.params, f = j.adDivId, g = _ge(f).style, b = _ge(f + "_p").style, 
         h = _ge(f + "_frm"), e = h.style;
         g.position = b.position = e.position = "static";
         g.top = b.top = e.top = 0 + i;
         g.left = b.left = e.left = 0 + i;
         a(h).removeClass(c);
         d("reset", this.params)
     };
     function d(d, h)
     {
         var f = [_ge("SkyscraperContent"), _ge("RadAd_Skyscraper"), _ge("skyScraperContainer"), _ge("RadAdSkyscraper")];
         for (var e = 0; e < f.length; ++e)
         {
             try 
             {
                 var b = f[e];
                 if (b) 
                 {
                     var c = b.currentStyle;
                     if (c && c.position && c.position == "absolute")
                     {
                         if (d == "expand") 
                         {
                             b.style.overflow = "visible";
                             if (!b.getAttribute("origZIndex")) {
                                 b.setAttribute("origZIndex", c.zIndex || "");
                             }
                             b.style.zIndex = "2" 
                         }
                         else {
                             b.style.zIndex = b.getAttribute("origZIndex") || "";
                         };
                     }
                 }
             }
             catch (i) {
                 if ($Config.isINT) {
                     throw i;
                 }
             }
         }
         if ($B.IE && $B.V <= 8 && _ge("HomeContent") && _ge("MainHomePage"))
         {
             var g = {
                 visibility : d == "expand" ? "hidden" : "visible"
             };
             if (h.top > 0) {
                 a("#c_search_SearchBoxControl_f").css(g);
             }
             if (h.left > 0) {
                 a(".cc2_main_bk").css(g);
             }
         }
         if (_ge("MainContent") && _ge("SkyscraperContent")) {
             a("#MainContent").toggleClass("rmadexpanded", d === "expand");
         }
     }
 })();
 (function ()
 {
     window.$RmHeaderAd = function () {};
     var a = $RmHeaderAd.prototype;
     a.createAdContainer = function (b)
     {
         if (!b) {
             return;
         }
         if (!_ge("c_headerAd"))
         {
             var e = document.createElement("div");
             e.setAttribute("id", "c_headerAd");
             if (_ge("c_header")) {
                 _ge("c_header").parentNode.insertBefore(e, _ge("c_header"));
             }
         }
         if (_ge("c_headerAd") && !_ge(b + "_hfrm"))
         {
             var a = document.createElement("IFRAME");
             a.id = a.name = b + "_hfrm";
             a.width = "0px";
             a.height = "0px";
             a.scrolling = "no";
             a.frameBorder = "0";
             a.allowTransparency = true;
             a.src = $AdConfig.ss.rurl.replace("{0}", "headeradloader.html") + d() + "#" + $AdServeMsngr.serialize(c(b));
             _ge("c_headerAd").appendChild(a)
         }
     };
     a.init = function (e)
     {
         if (!e || !_ge("c_headerAd")) {
             return;
         }
         var h = this, f = "px", a = this.params = e, g = a.adDivId, d = _ge(g + "_hfrm").style;
         d.height = a.height + f;
         d.width = "100%";
         var c = _ge("c_headerAd").style;
         c.height = a.height + f;
         c.width = "100%";
         b()
     };
     a.resize = function (c, f)
     {
         if (!c || !_ge("c_headerAd")) {
             return;
         }
         var i = this, j = "px", a = i.params, g = a.adDivId, e = f ? a.bottom : 0, h = c.easingb > 0 && c.easingb < a.bottom ? c.easingb : e, 
         d = a.height + h + j;
         _ge("c_headerAd").style.height = d;
         _ge(g + "_hfrm").style.height = d;
         b()
     };
     a.resetUI = a.close = function ()
     {
         var a = _ge("c_headerAd");
         if (!a) {
             return;
         }
         while (a.firstChild) {
             a.removeChild(a.firstChild);
         }
         a.parentNode.removeChild(a)
     };
     function d()
     {
         var a = "";
         if ($AdConfig.intad) {
             a = "?srmad=2&ow=1800&oh=175&eb=250&el=0&et=0&rmh=1";
         }
         return a
     }
     function c(a)
     {
         return {
             divId : a, hnegurl : $AdConfig.ss.hnegurl, hstkn : $AdConfig.ss.hs, adenv : $AdConfig.intad ? "int" : ""
         }
     }
     function b()
     {
         if ($B.IE_M6 && _ge("c_header")) {
             var a = _ge("c_header").style;
             a.display = "none";
             a.display = "block";
         }
     }
 })();
 (function ()
 {
     var a = window, b = a.$Acb = new c;
     function c()
     {
         var c = this, n = "acbc", h = null, k = false, j = false, d = null, u = null, t = false, g = [], 
         e = {
             Report : "c_ads_pr", ThankYou : "c_ads_pty", UpSell : "c_ads_pus"
         },
         p = "c_ads_default_desctxt", f = {};
         c.init = function ()
         {
             if (!a["$AdConfig"]) {
                 b._initSkipped = true;
                 return
             }
             if (a["$AdConfig"] && $AdConfig.dp)
             {
                 var c = function ()
                 {
                     if ($AdConfig.pcss) {
                         $Network.fetchCSS($AdConfig.pcss, function () 
                         {
                             j = true;
                             m() 
                         }, null);
                     }
                     else {
                         j = true;
                     }
                     if ($AdConfig.pjs) {
                         $Network.fetchScript($AdConfig.pjs, function () 
                         {
                             k = true;
                             m() 
                         }, null);
                     }
                     else {
                         k = true;
                     }
                     $Network.fetchXML($AdConfig.phtml, function (a)
                     {
                         var b = !a || a.status != 200 || !a.responseText;
                         if (!b) {
                             h = a.responseText;
                             m()
                         }
                     },
                     "GET", null, null)
                 };
                 a.setTimeout(c, $AdConfig.pd)
             }
         };
         c.report = function (a)
         {
             $BSI.reportEvent("ClickedSelected.Business.AdControlBar", {
                 AdControlBarAction : "Report"
             });
             c.closePopover();
             u = a;
             l(e.Report);
             o(a)
         };
         c.close = function (a, f)
         {
             $BSI.reportEvent("ClickedSelected.Business.AdControlBar", {
                 AdControlBarAction : "Close"
             });
             c.closePopover();
             _ge(a + "_p").parentNode.style.display = "none";
             if ($AdConfig.eups)
             {
                 var d = $Cookie.getPersistentCookie(n);
                 if (typeof d == "undefined") {
                     $Cookie.setPersistentCookie(n, "1");
                 }
                 else
                 {
                     var b = (parseInt(d) + 1) % $AdConfig.usi;
                     $Cookie.setPersistentCookie(n, b);
                     if (b % $AdConfig.usi == $AdConfig.uso)
                     {
                         l(e.UpSell);
                         $BSI.reportEvent("ClickedSelected.Business.AdControlBar", {
                             AdControlBarAction : "Upsell"
                         })
                     }
                 }
             }
             if (typeof f == "function")
             {
                 f(a);
             }
             o(a);
             setTimeout(function ()
             {
                 q(a, $AdConfig.cadrsn, null)
             }, 1500)
         };
         c.closePopover = function ()
         {
             if (d) {
                 d.minimize();
             }
         };
         c.sendReport = function ()
         {
             var b, f;
             for (var d = 1; (f = _ge("c_ads_opt" + d)) && !b; d++)
             {
                 if (f.checked) {
                     b = d;
                 }
                 l(e.ThankYou);
                 var a = _ge("c_ads_desc_txt");
                 if (a.value == a.getAttribute("defaultvalue")) {
                     a.value = "";
                 }
                 else {
                     c.ensureDescMaxLength(a, a.getAttribute("maxlength"));
                 }
                 q(u, b, a.value);
             }
         };
         function q(g, f, b)
         {
             var a = c.getAdIds(g);
             for (var d in a) {
                 a[d] = a[d].encodeUrl();
             }
             b = b ? b.encodeUrl() : "";
             var e = $AdConfig.furl.format(a.adid, a.pid, a.targetid, a.url, a.pg, f, $AdConfig.fcan.encodeUrl(), 
             b) + "&cb=" + (new Date).getTime();
             $Beacon.fire(e, $BSI.addLDToHash({}))
         }
         c.toggleSend = function (b)
         {
             _ge("c_ads_pr_sub").disabled = !b;
             if (!b) {
                 var c = 1, a;
                 while (a = _ge("c_ads_opt" + c++)) {
                     a.checked = false;
                 }
                 r(_ge("c_ads_desc_txt"))
             }
         };
         c.display = function (b)
         {
             var a = _ge(b + "_acb");
             if (a) {
                 if ($AdConfig.dp && s() || !$AdConfig.dp) {
                     v(a);
                 }
                 else {
                     g.push(a);
                 }
             }
         };
         c.ensureDescMaxLength = function (b, a)
         {
             if (isNaN(parseInt(a, 10))) {
                 a = 200;
             }
             if (b.value.length > a) {
                 b.value = b.value.substring(0, a);
                 return false;
             }
         };
         this.onDescFocus = function (a)
         {
             if (a.value == i(a)) {
                 $css.remove(a, p);
                 if ($B.Firefox || $B.IE) {
                     a.select();
                 }
                 else {
                     a.value = "";
                 }
             }
         };
         this.onDescBlur = function (a)
         {
             if (a.value == "" || a.value == i(a)) {
                 r(a);
             }
         };
         function r(a)
         {
             $css.add(a, p);
             a.value = i(a)
         }
         function i(a)
         {
             return a.getAttribute("defaultvalue")
         }
         function o(b)
         {
             var a = $AdConfig.Data[$AdConfig.itod[b]];
             if (a[7] && !f[b])
             {
                 $AdServeMsngr.toFrame(a[0] + "_frm", "$AdServe.getRadIds", null, $AdConfig.ss.rurl.replace("{0}", 
                 "AdServeMsg.html"));
             }
         }
         var m = function ()
         {
             if (g && s()) {
                 for (var a = 0; a < g.length; a++) {
                     v(g[a]);
                 }
                 g = null;
             }
         },
         v = function (a)
         {
             if (a) {
                 a.style.display = "inline";
             }
         },
         s = function ()
         {
             return j && k && h != null;
         },
         l = function (b)
         {
             if (!(a["$UI"] && $UI.Popover && h)) {
                 return;
             }
             if (!d)
             {
                 var f = a._ce("div");
                 d = new $UI.Popover;
                 f.innerHTML = h;
                 d.width = 500;
                 d.showFooter = false;
                 d.showHeader = false;
                 d.body = f;
                 d.modal = false;
                 d.bodyPadding = 5
             }
             if (!t) {
                 d.show(function ()
                 {
                     c.closePopover();
                     return false;
                 });
                 t = true;
                 w(b)
             }
             else {
                 w(b);
                 d.restore()
             }
             switch (b)
             {
                 case e.Report:
                     _ge("c_ads_opt1").focus();
                     break;
                 case e.ThankYou:
                     _ge("c_ads_pty_close").focus();
                     break;
                 case e.UpSell:
                     _ge("c_ads_pus_close").focus()
             }
         },
         w = function (b)
         {
             var d, a;
             for (d in e) {
                 a = e[d];
                 _ge(a).style.display = b == a ? "block" : "none"
             }
             if (b == e.Report) {
                 c.toggleSend(false);
             }
         };
         c.setRadIds = function (a)
         {
             if (a && (a.hstkn && a.hstkn == $AdConfig.ss.hs) && a.hostAdDivId)
             {
                 var b = {};
                 b.adid = a.adid || "";
                 b.pid = a.pid || "";
                 b.targetid = a.targetid || "";
                 b.pg = a.pg || "";
                 b.url = a.url || "";
                 f[a.hostAdDivId] = b;
             }
         };
         c.clearRadIds = function (a)
         {
             if (f[a]) {
                 f[a] = null;
             }
         };
         c.getAdIds = function (g)
         {
             if (f[g]) {
                 return f[g];
             }
             var b = {
                 adid : "", pid : "", targetid : "", url : "", pg : ""
             };
             try
             {
                 var e = _ge(g).childNodes, a, j, k = ["iframe", "embed"], c, h, l;
                 b["pg"] = $AdConfig.Data[$AdConfig.itod[g]][6];
                 for (var d = 0; d < e.length; d++) if ((h = e[d].id) && h.startsWith("dapIfM")) if (h.endsWith("Child")) j = e[d]; else a = e[d]; if (a)
                 {
                     if (a.contentWindow["getRADIds"]) {
                         c = a.contentWindow.getRADIds();
                     }
                     a = j || a;
                     for (var i = 0; i < k.length; i++) if (l = a.contentWindow.document.getElementsByTagName(k[i])[0]) {
                         b["url"] = l.getAttribute("src") || "";
                         break
                     }
                 }
                 if (c) {
                     b.adid = c.adid;
                     b.pid = c.pid;
                     b.targetid = c.targetid;
                 }
             }
             catch (m) {}
             return b;
         }
     }
 })();
 $Ads.Init(true);
 $Acb.init();
 (function ()
 {
     var i = window, E = i.Debug;
     if (!i.$IS) {
         i.$IS = {};
     }
     var d = i.$IS, h = $css.has, l = Math.abs, t = "top", s = "left", e = "height", f = "width", b = "px", 
     c = "backgroundPosition", p = "backgroundImage", a = "style", k = "parentNode", z = "auto", g = "IMG", 
     j = "is_c", n = "is_hc", B = i.$Utility.isHighContrast();
     d.setClass = function (l, p)
     {
         if (!l) {
             return;
         }
         var d = o(l);
         if (d)
         {
             var b = d.getElementsByTagName(g)[0], c = h(d, n);
             b.className = (c ? "is_hcimg " : "is_img ") + p;
             if (c)
             {
                 var s = b[k], t = jQuery(b), i = q(b);
                 if (!m()) {
                     b[a][f] = "";
                     b[a][e] = ""
                 }
                 var j = r(s);
                 x(b, i.x, i.y, j.h, j.w, c)
             }
         }
     };
     d.toggle = function D(v, u, l)
     {
         if (!v || u == 0) {
             return;
         }
         var f = o(v);
         if (f)
         {
             var b = f.getElementsByTagName(g)[0], e = h(f, j), p = b;
             if (!e) {
                 p = b[k];
             }
             if (l) {
                 b.alt = l;
                 if (b.title != null) {
                     b.title = l;
                 }
             }
             var n = jQuery(b), c = n.css(s) || b[a][s], d = n.css(t) || b[a][t];
             if (e) {
                 var m = q(b);
                 c = m.x;
                 d = m.y
             }
             c = parseInt(c);
             d = parseInt(d);
             var i = r(p), w = d - i.h * u;
             x(b, c, w, i.h, i.w, !e)
         }
     };
     function x(d, g, h, j, k, i)
     {
         if (i) {
             d[a][t] = h + b;
             d[a][s] = g + b;
             if (!m()) {
                 d[a][e] = l(h) + j + b;
                 d[a][f] = l(g) + k + b;
             }
         }
         else {
             d[a][c] = g + b + " " + h + b;
         }
     }
     d.Create = C;
     function C(m, n, r, o, l, q, i, h)
     {
         var k = v("span", 0, j), d = v(g, k, "is_img");
         d.src = l + "is/invis.gif";
         d[a][f] = r + b;
         d[a][e] = o + b;
         d[a][c] = "-" + m + b + " -" + n + b;
         d[a][p] = "url('" + q + "')";
         h = h || h == "" ? h : i;
         d.alt = i;
         d.title = h;
         u(d);
         return k
     }
     d.CreateFromConfig = A;
     function A(c, a, b)
     {
         c = y(c.split(","));
         a = y(a.split(","));
         b = b ? b.trim() : b;
         var e = $B.rtl && c[1] ? c[1] : c[0];
         return d.Create(a[0], a[1], a[2], a[3], b, b + e, a[4])
     }
     function y(a)
     {
         for (var b = 0; b < a.length; b++) {
             var c = a[b];
             if (c) {
                 a[b] = c.trim();
             }
         }
         return a
     }
     function o(c)
     {
         if (c)
         {
             var d = c.getElementsByTagName("span"), g = d.length, i, a =- 1;
             for (; a < g && !i; a++) {
                 var b = a ==- 1 ? c : d[a], f = h(b, j), e = h(b, n);
                 if (f || e) {
                     return b;
                 }
             }
         }
         return null
     }
     function v(d, b, c)
     {
         var a = document.createElement(d);
         a.className = c;
         if (b) {
             b.appendChild(a);
         }
         return a
     }
     d.Init = u;
     function u(b)
     {
         if (b.tagName != g) {
             b = o(b).getElementsByTagName(g)[0];
         }
         if (b && h(b, "is_img"))
         {
             var J = b[a], e = b[k];
             if (e)
             {
                 e.dir = $B.ltr ? "ltr" : "rtl";
                 var d = m();
                 if (B || !d)
                 {
                     var i = '"style="width:{2}px;height:{3}px;"', v = '<span class="', A = '<img src="{6}"', 
                     w = "</span>", H = [v, "is_o", i, ">", v, "is_i", i, ">", A, 'class="is_hcimg {11}"alt="{1}"{10}style="left:-{4}px;top:-{5}px;width:{7}px;height:{8}px;{9}"/>', 
                     w, w, A, 'class="is_p', i, "/>"].join(""), G = e[k];
                     if (G) {
                         var u = G.getElementsByTagName("span"), t = 0;
                         for (; t < u.length; t++) {
                             u[t][a].zoom = 1;
                         }
                     }
                     var c = J[p], x = c.indexOf("http");
                     c = c.substr(x, c.length - x - (c.endsWith('")') ? 2 : 1));
                     var f = r(b), D = q(b), E = l(D.x), F = l(D.y), C, y;
                     if (!d) {
                         C = E + f.w;
                         y = F + f.h
                     }
                     var s = b.title, I = H.format(b.src.encodeHtmlAttribute(), b.alt.encodeHtmlAttribute(), 
                     f.w, f.h, E, F, (d ? c : b.src).encodeHtmlAttribute(), d ? z : C, d ? z : y, d ? "" : "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c.encodeHtmlAttribute() + "',sizingMethod='crop');", 
                     s || s == "" ? 'title="' + s.encodeHtmlAttribute() + '"' : "", b.className.replace("is_img", 
                     ""));
                     $css.swap(e, j, n);
                     e.innerHTML = I;
                 }
             }
         }
     }
     d.disposeAll = w;
     function w(f)
     {
         var e = f.getElementsByTagName(g);
         for (var d = 0, h = e.length; d < h; d++)
         {
             var c = e[d], b = c.className;
             if (b == "is_img" || b == "is_hcimg" || b == "is_p") {
                 c.onload = null;
                 c[a][p] = "";
             }
         }
     }
     function m()
     {
         return !$B.IE_M6 || $B.IEM_M8
     }
     function q(f)
     {
         var d = jQuery(f), b = f[a], e = (b[c] || d.css(c) || "").split(" "), g = parseInt(b[c + "X"] || d.css(c + "X") || e[0]), 
         h = parseInt(b[c + "Y"] || d.css(c + "Y") || e[1]);
         return {
             x : g, y : h
         }
     }
     function r(b)
     {
         var g = jQuery(b), d = b[a], c = b.currentStyle || (window.getComputedStyle ? window.getComputedStyle(b, 
         0) : {}), i = parseInt(d[f] || c[f] || g.css(f)), h = parseInt(d[e] || c[e]) || g.css(e);
         return {
             w : i, h : h
         }
     }
     $Do.register("$IS.Init", u);
     $Do.register("$IS.disposeAll", w)
 })();
 (function ()
 {
     var b = window;
     b.$Trie = a;
     function a(f)
     {
         var b = this, a = [], d = f, c = false;
         b.insert = function (d, b)
         {
             a.push({
                 key : d, datum : b
             });
             c = false;
         };
         b.sort = function ()
         {
             if (!c)
             {
                 a.sort(function (c, d) 
                 {
                     var a = c.key, b = d.key;
                     if (a > b) {
                         return 1;
                     }
                     if (b > a) {
                         return - 1;
                     }
                     return 0;
                 });
             }
             c = true;
         };
         b.matchPrefix = function (n, p)
         {
             var h = null, f = null, g = null, q = null, c = null, l = null, k = null;
             b.sort();
             h = e(n);
             if (h == null) {
                 return [];
             }
             for (f = h; f > 0; f--)
             {
                 if (!a[f - 1].key.startsWith(n)) {
                     break;
                 }
                 for (g = h + 1; g < a.length; g++)
                 {
                     if (!a[g].key.startsWith(n)) {
                         break;
                     }
                     c = new Array(g - f);
                     for (var i = 0; i < c.length; i++) {
                         var o, m = a[f + i];
                         if (p) {
                             o = {
                                 key : m.key, datum : m.datum 
                             };
                         }
                         else {
                             o = m.datum;
                         }
                         c[i] = o 
                     }
                     if (d) 
                     {
                         c.sort(d);
                         l = [k = c[0]];
                         for (var j = 0; j < c.length; j++) {
                             if (d(k, c[j])) {
                                 l.push(k = c[j]);
                             }
                             return l ;
                         }
                     }
                     else {
                         return c;
                     };
                 }
             }
         };
         function e(d)
         {
             var f = 0, e = a.length - 1, b = null, g = null, c = null;
             while (f <= e)
             {
                 b = Math.floor((f + e) / 2);
                 c = a[b].key.substring(0, d.length);
                 if (d > c) {
                     f = b + 1;
                 }
                 else if (d < c) {
                     e = b - 1;
                 }
                 else {
                     return b;
                 }
             }
             return null;
         }
     }
 })();
 function ic_onTE(a)
 {
     try
     {
         var c = a.getAttribute("errsrc") || $icerrsrc;
         if (a.src != c)
         {
             a.className = "c_ic_tile";
             var b = a.style;
             b.top = b.left = b.height = b.width = "";
             setTimeout(function ()
             {
                 a.src = c;
                 a.style.visibility = "";
             }, 0)
         }
     }
     catch (d) {}
 }
 function ic_onTL(a)
 {
     try
     {
         var d = a.width, c = a.height;
         a.className = "c_ic_tile";
         var g = new Image;
         g.src = a.src;
         var m = g.width, l = g.height, f, e, n = 0, o = 0;
         if (d == 0 || c == 0) {
             d = g.width;
             c = g.height
         }
         var b;
         if (window.getComputedStyle) {
             b = window.getComputedStyle(a, "");
         }
         else {
             b = a.currentStyle;
         }
         if (d == 1 && c == 1 || b && b.width == "1px" && b.height == "1px") {
             ic_onTE(a);
             return
         }
         var i = Math.round;
         if (d && c && d != c && b)
         {
             var j = parseInt(b.height), k = parseInt(b.width);
             if (d > c) {
                 e = j;
                 f = i(m * (j / l));
                 n =- i((f - k) / 2)
             }
             else {
                 f = k;
                 e = i(l * (k / m));
                 o =- i((e - j) / 2)
             }
             var h = a.style;
             if (e && f) {
                 h.width = f + "px";
                 h.height = e + "px";
                 h.left = n + "px";
                 h.top = o + "px";
             }
         }
         a.style.visibility = ""
     }
     catch (p) {}
 }
 (function ()
 {
     var a = window, b = a.$WebWatson, d = a.$Logout = new c;
     function c()
     {
         var d = this, a = [], c;
         d.add = function i(b)
         {
             a.push(b)
         };
         d.remove = function h(b)
         {
             a.remove(b)
         };
         d.doLogout = function g(g)
         {
             var h, j = 0, m = a.length;
             c = 0;
             if (!g.shiftKey && !g.ctrlKey && !g.altKey)
             {
                 var d = g.target;
                 while (d)
                 {
                     if (d.tagName == "A")
                     {
                         var i = d.href;
                         if (i) {
                             var l = d.target;
                             $f.cancelEvent(g);
                             h = new f(i, l);
                             setTimeout(function ()
                             {
                                 e(i, l)
                             }, 1e3)
                         }
                         break
                     }
                     d = d.parentNode;
                 }
             }
             var k = "$logout";
             h.pause(k);
             for (; j < m; j++) {
                 try {
                     a[j](h) 
                 }
                 catch (n) {
                     b.submitFromException(n) 
                 }
             }
             h.resume(k)
         };
         function e(b, a)
         {
             if (!c) {
                 c = 1;
                 $BSI.navigateTo(b, a)
             }
         }
         function f(d, c)
         {
             var b = this, a = [];
             b.pause = function (b)
             {
                 a.push(b)
             };
             b.resume = function (b)
             {
                 a.remove(b);
                 if (a.length == 0) {
                     e(d, c);
                 }
             }
         }
     }
 })();
 (function ()
 {
     var a = window, c = a.$Cookie, d = a.$WebWatson, b = a.$Network, m = a.Debug, k = a.smartSetTimeout, 
     l = a.wLive, e = null;
     function j()
     {
         var g = this, f, S = "pres", O = "=", n = a.$Config, Ib = n.handlerBaseUrl, j, r, i, L = [], E = [], 
         h, C, u, z, cb, R = 3, F = 0, G = R, v, eb, M, K, T, m, ab, I, U, x, s, X, t, y, tb = g.vv = {};
         g.outerWindow = window;
         g.isOff = function Ob()
         {
             return !t && (!u || D() == 0);
         };
         g.isUnsupported = function Bb()
         {
             return ab;
         };
         g.isLoading = function Gb()
         {
             return !g.isOff() && !this.isError() && (!f || f.get_status() == i.UserStatus.signingIn || f.get_status() == i.UserStatus.signingOut);
         };
         g.isError = function Jb()
         {
             return !g.isOff() && (T || f && f.get_status() == i.UserStatus.signedOut);
         };
         g.isWaitingToReconnect = function wb()
         {
             return !g.isOff() && f && f.get_status() == i.UserStatus.autoReconnectWaiting;
         };
         g.hasContacts = function Db()
         {
             return s;
         };
         g.hasNotify = function Fb()
         {
             return A();
         };
         g.hasPresence = function Eb()
         {
             return A() && f.get_services() > i.SessionServices.notifications;
         };
         g.isFull = function Lb()
         {
             return A() && f.get_services() == i.SessionServices.full;
         };
         function A()
         {
             return f && f.get_status() == i.UserStatus.signedIn
         }
         g.addStateListener = function zb(a)
         {
             L.push(a)
         };
         g.removeStateListener = function xb(a)
         {
             var b = L.remove(a);
         };
         g.addInnerWindowListener = function vb(a)
         {
             E.push(a)
         };
         g.removeInnerWindowListener = function ub(a)
         {
             var b = E.remove(a);
         };
         g.signIn = function Nb()
         {
             if (f && f.get_status() == i.UserStatus.signedIn) {
                 q(1);
                 gb()
             }
             else {
                 t = 1;
                 y = 0;
                 o()
             }
         };
         g.signOut = function Kb()
         {
             if (f && f.get_status() == i.UserStatus.signedIn) {
                 J();
             }
             else {
                 t = 0;
                 y = 1;
                 o()
             }
         };
         g.reconnect = function Hb()
         {
             if (g.isWaitingToReconnect()) {
                 f.signIn();
             }
         };
         g.switchPresence = function Ab(a)
         {
             if (f) {
                 f.get_presence().set_status(a);
             }
         };
         g.isVVWindow = function Cb()
         {
             return j.vv;
         };
         tb.isCapableBrowser = function yb()
         {
             return j.vvb;
         };
         function J()
         {
             q(0);
             if (f)
             {
                 f.get_settings().set_signInPreference(Microsoft.Live.Messenger.SignInPreference.manualSignIn);
                 f.set_services(i.SessionServices.notifications)
             }
         }
         function gb()
         {
             if (f)
             {
                 f.get_settings().set_signInPreference(Microsoft.Live.Messenger.SignInPreference.autoSignIn);
                 f.set_services(i.SessionServices.full);
                 bb("Full")
             }
         }
         function H()
         {
             try {
                 h.$Logout.remove(ib);
                 h.jQuery(h).unbind("unload", H)
             }
             catch (a) {}
             g.innerWindow = h = null;
             V()
         }
         g.init = function Qb(a)
         {
             if (h)
             {
                 if (a == window) {
                     return;
                 }
                 else {
                     z = 0;
                 }
                 v = 0;
                 if (h) {
                     H();
                 }
                 g.innerWindow = h = a;
                 h.$Logout.add(ib);
                 a.$Do.register("$WIMP", sb);
                 if (h == window) {
                     m = $CSIPerf.startTrace("webIM");
                 }
                 V();
                 h.jQuery(h).bind("unload", H);
                 if (F >= G) {
                     fb();
                 }
                 else if (!u) {
                     if (z) {
                         cb = 1;
                     }
                     else {
                         Q();
                     };
                 }
             }
         };
         function ib(a)
         {
             if (!U && g.hasPresence()) {
                 U = 1;
                 if (a) {
                     x = a;
                     x.pause("wim")
                 }
                 try {
                     f.signOut()
                 }
                 catch (b) {}
             }
         }
         function Q()
         {
             u = 1;
             n = h.$Config;
             $Config.email = n.email;
             $Config.WebIM = j = n.WebIM;
             $Config.sd = n.sd;
             D();
             o();
             kb();
             ob();
             qb()
         }
         g.pause = function Pb()
         {
             if (!u) {
                 z = 1;
             }
         };
         g.resume = function Mb()
         {
             z = 0;
             if (cb) {
                 Q();
             }
         };
         function fb()
         {
             if (h != window && h)
             {
                 v = 0;
                 h.$Network.fetchCSS(j.c, B);
                 h.$Network.fetchScript(j.a, B, "window.live.shared.globalsettings.webim");
                 h.$Network.fetchScript(j.j, B, "webimui")
             }
         }
         function B()
         {
             v++;
             if (v >= R)
             {
                 h && h.$Do.register("wlximuiinner");
                 if (eb && h && h != window) {
                     h.$Do.register("wlximlocalstoreready");
                 }
             }
         }
         function kb()
         {
             if (h == window) {
                 return;
             }
             var f = h.document.getElementsByTagName("link"), g = h.document.getElementById("themecss"), 
             a = 0, m = f.length;
             for (; a < m; a++) {
                 var i = f[a], d = i.href;
                 if (d && i.type == "text/css") {
                     G++;
                     j(d)
                 }
             }
             function j(a)
             {
                 k(function ()
                 {
                     b.fetchCSS(a, w)
                 })
             }
             if (g)
             {
                 var c = g.innerHTML;
                 if (c)
                 {
                     var e = document.createElement("div"), n = l.dh;
                     e.innerHTML = '&nbsp;<style type="text/css">' + c + "</style>";
                     n.appendChild(e)
                 }
             }
         }
         function w()
         {
             F++;
             if (F == G)
             {
                 $Do.register("wlximuiouter", 0, true);
                 if (h == window) {
                     $Do.register("wlximuiinner", 0, true);
                 }
                 fb()
             }
         }
         function ob()
         {
             b.fetchCSS(j.c, w);
             b.fetchScript(j.a, w, "window.live.shared.globalsettings.webim");
             b.fetchScript(j.j, w, "webimui");
             if (j.pj) {
                 b.fetchScript(j.pj, e);
             }
         }
         function qb()
         {
             b.fetchScript(j.u + j.uf, mb, "window.Microsoft.Live.Core.Loader")
         }
         function mb()
         {
             if (m) {
                 m.lapse.push({
                     s : "loader", t : (new Date).getTime() 
                 });
             }
             if (!window.Microsoft || !Microsoft.Live || !Microsoft.Live.Core || !Microsoft.Live.Core.Loader) {
                 p(90, "Microsoft.Live.Core.Loader Not found");
             }
             else
             {
                 g.ML = r = Microsoft.Live;
                 r.Core.Loader.onError(rb);
                 var a = {
                     market : $Config.mkt, "messenger.loaderPath" : j.u
                 };
                 if (document.location.host.toLowerCase().endsWith(".mail" + $Config.sd)) {
                     a["compatibility.version"] = "current";
                 }
                 if ($B.Mobile && $B.IE && $B.V == 7) {
                     a["messenger.localStorageDisabled"] = true;
                 }
                 r.Core.Loader.initialize(a);
                 r.Core.Loader.load("messenger.core", nb);
                 r.Core.Loader.load("core.localstorage", lb)
             }
         }
         function rb(a)
         {
             p(93, "Messenger Library load error: " + a)
         }
         function lb()
         {
             eb = 1;
             $Do.register("wlximlocalstoreready");
             if (h && h != window) {
                 h.$Do.register("wlximlocalstoreready");
             }
         }
         function nb()
         {
             if (!K)
             {
                 if (m) {
                     m.lapse.push({
                         s : "coreLoaded", t : (new Date).getTime() 
                     });
                 }
                 g.MLM = i = r.Messenger;
                 if (!i || !i.WindowsLiveAuthIdentity) {
                     p(90, "Microsoft.Live.Messenger.WindowsLiveAuthIdentity not found");
                 }
                 else {
                     K = 1;
                     W()
                 }
             }
         }
         function sb()
         {
             if (!M)
             {
                 if (m)
                 {
                     m.addCsd("firstMessengerSignIn", c.getSessionCookie("WebIM") == "1" ? "false" : "true");
                     m.addCsd("endpoint", window.WIMP ? "new" : "existing")
                 }
                 M = 1;
                 W()
             }
         }
         function W()
         {
             if (K && M)
             {
                 var a = new i.WindowsLiveAuthIdentity(null, null, window.WIMP);
                 if (n.BSI && n.BSI.xid) {
                     a.set_experienceId(n.BSI.xid);
                 }
                 a.add_authenticationCompleted(pb)
             }
         }
         function pb(c, a)
         {
             if (m) {
                 m.lapse.push({
                     s : "auth", t : (new Date).getTime() 
                 });
             }
             var b = a.get_resultCode();
             if (b == i.AuthenticationResultCode.failure) if (a.get_isUnsupportedBrowser()) {
                 ab = 1;
                 p(-1, "Authentication Failed: unsuported browser")
             }
             else {
                 p(91, "Authentication Failed with status code: " + a.get_status());
             }
             else
             {
                 g.user = f = new i.User(c);
                 f.get_settings().set_autoReconnectEnabled(true);
                 f.get_settings().set_displayNameMode(Microsoft.Live.Messenger.DisplayNameMode.fullName);
                 f.get_localEndpoint().set_name(j.n);
                 if (f.get_services() != i.SessionServices.normal) {
                     q(f.get_status());
                     I = 1
                 }
                 else if (a.get_multipleEndpointsNotSupported() || f.get_settings().get_signInPreference() == Microsoft.Live.Messenger.SignInPreference.manualSignIn) {
                     q(0);
                     J()
                 }
                 else {
                     q(1);
                     f.set_services(i.SessionServices.full);
                     bb("Full")
                 }
                 jb();
                 f.signIn()
             }
         }
         function bb(a)
         {
             if (!I) {
                 I = 1;
                 $BSI.reportEvent("ClickedSelected.Messaging.IMStart", {
                     IMMode : a
                 })
             }
         }
         function q(a)
         {
             c.setCookie(S, n.hcid + O + a, n.sd, 0, 0, 1)
         }
         function D()
         {
             var a = c.getCookie(S, 1);
             if (a)
             {
                 var b = a.indexOf(O);
                 if (b !=- 1) if (a.substr(0, b) == n.hcid) {
                     a = parseInt(a.substr(b + 1));
                     if (!isNaN(a)) {
                         return a;
                     }
                 }
             }
             return 1
         }
         g._pres = D;
         g._inform = o;
         function jb()
         {
             f.add_signInCompleted(db);
             f.add_signedOut(hb);
             f.add_propertyChanged(Z);
             f.get_contact().get_presence().add_propertyChanged(Y);
             jQuery(a).bind("unload", P)
         }
         function P()
         {
             jQuery(a).unbind("unload", P);
             f.remove_signInCompleted(db);
             f.remove_signedOut(hb);
             f.remove_propertyChanged(Z);
             f.get_contact().get_presence().remove_propertyChanged(Y)
         }
         function db(b, a)
         {
             if (a.get_resultCode() == i.SignInResultCode.success) {
                 s = 1;
             }
             if (!C) {
                 c.setSessionCookie("WebIM", "1");
             }
             N();
             o()
         }
         function Z(c, b)
         {
             var a = b.get_propertyName();
             if (a == "Services" || a == "Status")
             {
                 if (!s && !X && m && A()) {
                     m.lapse.push({
                         s : "signedIn", t : (new Date).getTime()
                     });
                     X = 1
                 }
                 if (y && f && f.get_status() == i.UserStatus.signedIn) {
                     y = 0;
                     J()
                 }
                 if (!s && f && f.get_status() == i.UserStatus.signedIn) {
                     s = 1;
                 }
                 if (t && f && f.get_status() == i.UserStatus.signedIn) {
                     t = 0;
                     gb()
                 }
                 o()
             }
         }
         function Y(b)
         {
             var a = b.get_status();
             if (a != i.PresenceStatus.offline) {
                 q(a);
             }
         }
         function hb(b, a)
         {
             if (a.get_reason() == 0) {
                 p(-1, "signed out");
                 if (x) {
                     x.resume("wim");
                 }
             }
             else if (f.get_status() != i.UserStatus.autoReconnectWaiting) {
                 p(94, "signed out: " + a.get_reason());
             }
         }
         function N()
         {
             if (!C) {
                 C = 1;
                 if (m) {
                     m.endTrace();
                     m = null;
                 }
             }
         }
         function p(a, b)
         {
             T = 1;
             o();
             N();
             if (a !=- 1) {
                 d.submitFromException(new Error("Web IM sign in Error" + (b ? b : "")), e, a, e, 1);
             }
         }
         function o()
         {
             var a = 0, b = L.clone(), c = b.length;
             for (; a < c; a++) {
                 d.wrapCallback(b[a])();
             }
             jQuery(g).trigger("stateChange");
             if (h && h != window && h.jQuery) {
                 h.jQuery(g).trigger("stateChange");
             }
         }
         function V()
         {
             var a = 0, b = E.clone(), c = b.length;
             for (; a < c; a++) {
                 d.wrapCallback(b[a])();
             }
             jQuery(g).trigger("innerWindowChange");
             if (h && h != window && h.jQuery) {
                 h.jQuery(g).trigger("innerWindowChange");
             }
         }
     }
     function h()
     {
         window.parent.$Do.remove("wlxim", 0, g);
         jQuery(window).unbind("unload", h)
     }
     function g()
     {
         window.$WLXIM = window.parent.$WLXIM;
         f()
     }
     window.webIMPreInit = i;
     function i()
     {
         if (!$Config.WebIM) {
             return;
         }
         var a;
         try
         {
             a = window != window.parent && window.parent.location.hostname && window.parent.$Config.WebIM && window.parent.$Do
         }
         catch (c) {}
         if (a) {
             var b = window.parent;
             b.$Do.when("wlxim", 0, g);
             jQuery(window).bind("unload", h)
         }
         else {
             window.$WLXIM = new j;
             f()
         }
     }
     function f()
     {
         var b = $WLXIM;
         if (!$Config.WebIM.f)
         {
             if (!$Config.WebIM.u) {
                 return;
             }
             if (c.getSessionCookie("WebIM") == "1" || !$BSI.isLoading()) {
                 b.init(window);
             }
             else {
                 $BSI.addLoadedCallback(a);
             }
         }
         $Do.register("wlxim", 0, true);
         function a()
         {
             $BSI.removeLoadedCallback(a);
             setTimeout(function ()
             {
                 b.init(window)
             },
             $Config.WebIM.delay ? $Config.WebIM.delay : 0)
         }
     }
     i()
 })();
 (function ()
 {
     var c = window, f = c.jQuery, b = c.$Preload = {}, g, o = "preload_frame", p = c.$Config, k = p.Preload || {},
     a, l = 0, d = 0, i = 0;
     function q()
     {
         if ($Config.WebIM) {
             $Do.when("wlxim", 0, m);
         }
         else if ($BSI.isLoading()) {
             $BSI.addLoadedCallback(e);
             i = 1
         }
         else {
             e();
         }
         f(c).bind("beforeunload", b.dispose)
     }
     function m()
     {
         g = window["$WLXIM"];
         f(g).bind("stateChange", h);
         h();
         d = 1
     }
     function j()
     {
         f(g).unbind("stateChange", h);
         d = 0
     }
     b.dispose = function r()
     {
         b.pause();
         if (d) {
             j();
         }
         else if (i) {
             $BSI.removeLoadedCallback(e);
             i = 0
         }
         f(c).unbind("beforeunload", b.dispose);
         if (a)
         {
             try {
                 var g = a.contentWindow;
                 if (g.onunload) {
                     g.onunload();
                     g.onunload = null;
                 }
             }
             catch (h) {}
             a.parentNode.removeChild(a);
             a = 0;
         }
     };
     b.resume = function s()
     {
         if (a) {
             try {
                 a.contentWindow.$Preload.resume() 
             }
             catch (b) {}
         }
     };
     b.pause = function t()
     {
         if (a) {
             try {
                 a.contentWindow.$Preload.pause() 
             }
             catch (b) {}
         }
     };
     function h()
     {
         if (g.hasContacts()) {
             e();
         }
     }
     function e()
     {
         var a = k.DelayMs || 0;
         setTimeout(n, a);
         if (d) {
             j();
         }
     }
     function n()
     {
         if (!l)
         {
             var b = k.View;
             l = 1;
             if (b)
             {
                 a = document.createElement("iframe");
                 a.id = o;
                 a.width = a.height = 0;
                 a.style.display = "none";
                 a.src = "/handlers/resourcespreload.mvc?bicild=&view=" + b;
                 document.body.appendChild(a)
             }
         }
     }
     q()
 })();
 (function ()
 {
     window.$CSIPerf.lapse.push({
         s : "sjs", t : (new Date).getTime()
     })
 })();
 (function ()
 {
     var a = window, b = a["$baseMaster"] = {}, c;
     function d()
     {
         $Do.when("$PF.attach", 0, b.dispose)
     }
     b.dispose = function e()
     {
         if (!c)
         {
             var f = a["$Static"], d = a["$Preload"], h = a["$WLXIM"], e = a["$WLXIMCL"], g = a["$footer"], 
             b = a["$HeaderWebIM"];
             if (f) {
                 f.pause(1);
             }
             if (d) {
                 d.dispose();
             }
             if (h) {
                 h.pause();
             }
             if (e) {
                 e.dispose();
             }
             if (g) {
                 g.dispose();
             }
             if (b) {
                 b.dispose();
             }
             c = 1;
         }
     };
     d()
 })();
 (function ()
 {
     var i = window, b = i.jQuery, d = "Merge", f = "PreMerge", a = i.$PF, c, e = 0, g = 0, h;
     if (!a || !a.f) {
         return;
     }
     if (!a.i)
     {
         $Do.when("$History.attachPF", 0, j, true);
         if (a.m)
         {
             b("form").submit(function () 
             {
                 var c = b(this);
                 if (!c.attr("target")) {
                     c.attr("target", a.fid);
                     $Do.when("$PF.merge") 
                 }
                 return true;
             });
         }
     }
     function j(f)
     {
         try {
             var g = _ge(a.fid).contentWindow.document.domain
         }
         catch (h) {
             return
         }
         var b = "", c = f.pfState;
         if (!c) {
             b = a.afu;
         }
         else if (c.indexOf("#") == 0) {
             b = [a.afu, c].join("");
         }
         else {
             b = c;
         }
         var d = a.getNormalizedUrl(b, null);
         setTimeout(function ()
         {
             a.navigateTo(d)
         }, 1);
         var e;
         if (d != b) {
             e = a.getRelativeUrl(d);
         }
         return e
     }
     a.preMerge = function q(c)
     {
         if (a.merged) {
             return;
         }
         if (e > 0) {
             h = c;
             b(a).trigger(f)
         }
         else {
             a.mergeAndNavigate(c);
         }
     };
     a.allowMerge = function p()
     {
         g++;
         if (g >= e) {
             a.mergeAndNavigate(h);
         }
     };
     a.merge = function r()
     {
         if (a.merged) {
             return;
         }
         a.merged = true;
         b(a).trigger(d);
         b(a).unbind(d);
         b(a).unbind(f);
         b("body").css("cssText", a.hbs);
         b("html").css("cssText", a.hhs);
         b("#" + a.did).show().add("[persist]").parentsUntil("body").andSelf().attr("persist", 1).siblings().filter(":not([persist])").hide()
     };
     function k(c)
     {
         if (!a.i) {
             b(a).bind(f, c);
             e++
         }
     }
     function l(c)
     {
         if (!a.i) {
             b(a).bind(d, c);
         }
     }
     function m(c)
     {
         if (!a.i) {
             b(a).unbind(d, c);
         }
     }
     a.showLoading = function o()
     {
         if (a.lid)
         {
             if (!c)
             {
                 c = b("#" + a.lid);
                 c.html('<div style="top:45%;width:100%;position:absolute;text-align:center"><span><img style="height:16px;width:16px;vertical-align:middle;margin-bottom:.2em" src="' + a.limg + '"/> ' + a.ltxt + "</span></div>")
             }
             c.show();
             b("#" + a.did).hide()
         }
     };
     a.hideLoading = function n()
     {
         if (a.lid) {
             b("#" + a.did).show();
             if (c) {
                 c.hide();
             }
         }
     };
     $Do.register("$PF");
     $Do.register("$PF.merge", a.merge);
     $Do.register("$PF.attach", l);
     $Do.register("$PF.detach", m);
     $Do.register("$PF.attachPreMerge", k)
 })();
 (function ()
 {
     var w = window, jQuery = w.jQuery, $Network = w.$Network, $Config = w.$Config, $Logout = w.$Logout, 
     $Cookie = w.$Cookie, wLive = w.wLive, $WebWatson = w.$WebWatson;
     wLive.Contacts = wLive["Contacts"] || {};
     var c_schemaVersion = "W5.M2", spId = 0, spContacts = 1, spFirstName = 2, spLastName = 3, spEmails = 4, 
     spPhones = 5, spCid = 6, spHexCid = 7, spOnHideList = 8, spTrustLevel = 9, spCompanyName = 10, spUserTileMedium = 11, 
     spCategoryIds = 12, spIsFavorite = 13, spFavoriteOrder = 14, spPassportMemberName = 15, spBirthday = 16, 
     spNickName = 17, spMiddleName = 18, spTitle = 19, spSuffix = 20, spYomiFirstName = 21, spYomiLastName = 22, 
     spYomiCompanyName = 23, spAddresses = 24, spSignificantOther = 25, spAnniversary = 26, spWebsite = 27, 
     spJobTitle = 28, spNotes = 29, spCategoryIdsDeleted = 30, spFieldsCount = 31, scId = 0, scContactState = 1, 
     scPromotionBitmap = 2, scDomianId = 3, scSourceId = 4, scObjectId = 5, scDomainTag = 6, scFirstName = 7, 
     scLastName = 8, scEmails = 9, scPhones = 10, scCompanyName = 11, scUserTileMedium = 12, scEmailImEnabled = 13, 
     scEmailCapability = 14, scPhoneImEnabled = 15, scFavoriteOrder = 16, scBirthday = 17, scMiddleName = 18, 
     scNickName = 19, scTitle = 20, scSuffix = 21, scYomiFirstName = 22, scYomiLastName = 23, scYomiCompanyName = 24, 
     scAddresses = 25, scSignificantOther = 26, scAnniversary = 27, scWebsite = 28, scJobTitle = 29, scNotes = 30, 
     sePersonal = 0, seWork = 1, seOther = 2, spMobile = 0, spHome = 1, spHome2 = 2, spWork = 3, spWork2 = 4, 
     spPager = 5, spHomeFax = 6, spWorkFax = 7, saHome = 0, saWork = 1, saOther = 2, c_emptyArray = [];
     wLive.Contacts.ContactState = 
     {
         deleted :- 1, shell : 0, meContact : 1, pending : 2, follower : 3, twoWay : 4, rolodex : 5, nonFriend : 6, 
         declined : 7, implicitContact : 8
     };
     var sContactState = wLive.Contacts.ContactState;
     wLive.Contacts.WLXContactsSchema = 
     {
         schemaVersion : c_schemaVersion, peopleResponse : {
             abCore : 0, error : 1
         },
         abCore : 
         {
             syncKey : 0, lastModifiedDateTime : 1, schemaVersion : 2, persons : 3, categories : 4, groups : 5, 
             settings : 6, services : 7, isFullSync : 8
         },
         profilesResponse : {
             schemaVersion : 0, profiles : 1, hasErrors : 2
         },
         person : 
         {
             id : 0, contacts : 1, firstName : 2, lastName : 3, emails : 4, phones : 5, cid : 6, hexCid : 7, 
             onHideList : 8, trustLevel : 9, companyName : 10, userTileMedium : 11, categoryIds : 12, isFavorite : 13, 
             favoriteOrder : 14, passportMemberName : 15, birthday : 16, nickName : 17, middleName : 18, 
             title : 19, suffix : 20, yomiFirstName : 21, yomiLastName : 22, yomiCompanyName : 23, addresses : 24, 
             significantOther : 25, anniversary : 26, website : 27, jobTitle : 28, notes : 29
         },
         contact : 
         {
             id : 0, contactState : 1, promotionBitmap : 2, domianId : 3, sourceId : 4, objectId : 5, domainTag : 6, 
             firstName : 7, lastName : 8, emails : 9, phones : 10, companyName : 11, userTileMedium : 12, 
             emailImEnabled : 13, emailCapability : 14, phoneImEnabled : 15, favoriteOrder : 16, birthday : 17, 
             middleName : 18, nickName : 19, title : 20, suffix : 21, yomiFirstName : 22, yomiLastName : 23, 
             yomiCompanyName : 24, addresses : 25, significantOther : 26, anniversary : 27, website : 28, 
             jobTitle : 29, notes : 30
         },
         address : {
             home : 0, work : 1, other : 2
         },
         email : {
             personal : 0, work : 1, other : 2
         },
         phone : {
             mobile : 0, home : 1, home2 : 2, work : 3, work2 : 4, pager : 5, homeFax : 6, workFax : 7
         },
         group : {
             id : 0, name : 1, cid : 2, hexCid : 3, email : 4, isDeleted : 5
         },
         category : {
             id : 0, name : 1, isFavorite : 2, isDeleted : 3
         },
         settings : {
             messengerTrustLevel : 0, imHistory : 1
         },
         service : 
         {
             id : 0, name : 1, tokenState : 2, supportsIm : 3, supportsContactArgg : 4, iconUrlThumbnail : 5, 
             iconUrlMiniPhoto : 6, iconUrlLargePhoto : 7, profileUrl : 8, photosUrl : 9, sendMessageUrl : 10, 
             reportAbuseUrl : 11, rank : 12, onHideList : 13, isDeleted : 20
         }
     };
     var s = wLive.Contacts.WLXContactsSchema, sPeopleResponse = s.peopleResponse, sAbCore = s.abCore, 
     sError = sPeopleResponse.error, sData = sPeopleResponse.abCore, sCategory = s.category, sService = s.service, 
     sGroup = s.group;
     wLive.Contacts.DF = DF;
     function DF(g, c, b, f, d, e)
     {
         var a = this;
         a.mask = g;
         a.personFields = c;
         a.contactFields = b;
         a.isArray = f;
         a.arrayIndex = d;
         a.comparer = e
     }
     var c_idMask = 1, c_userTileMask = 1 << 2, c_nameMask = 1 << 3, c_companyNameMask = 1 << 4, c_personalEmailMask = 1 << 5, 
     c_workEmailMask = 1 << 6, c_otherEmailMask = 1 << 7, c_mobilePhoneMask = 1 << 8, c_homePhoneMask = 1 << 9, 
     c_home2PhoneMask = 1 << 10, c_workPhoneMask = 1 << 11, c_work2PhoneMask = 1 << 12, c_homeFaxMask = 1 << 13, 
     c_pagerMask = 1 << 14, c_workFaxMask = 1 << 15, c_homeAddressMask = 1 << 16, c_workAddressMask = 1 << 17, 
     c_otherAddressMask = 1 << 18, c_birthdayMask = 1 << 19, c_significantOtherMask = 1 << 20, c_websiteMask = 1 << 21, 
     c_notesMask = 1 << 22, c_dedupeMap = [new DF(c_idMask, [spId], [scId]), new DF(c_userTileMask, [spUserTileMedium], 
     [scUserTileMedium]), new DF(c_nameMask, [spFirstName, spLastName, spTitle, spSuffix, spNickName, spMiddleName, 
     spYomiFirstName, spYomiLastName, spYomiCompanyName], [scFirstName, scLastName, scTitle, scSuffix, 
     scNickName, scMiddleName, scYomiFirstName, scYomiLastName, scYomiCompanyName]), new DF(c_companyNameMask, 
     [spCompanyName, spYomiCompanyName, spJobTitle], [scCompanyName, scYomiCompanyName, scJobTitle]), new DF(c_personalEmailMask, 
     [spEmails], [scEmails], 1, sePersonal), new DF(c_workEmailMask, [spEmails], [scEmails], 1, seWork), 
     new DF(c_otherEmailMask, [spEmails], [scEmails], 1, seOther), new DF(c_mobilePhoneMask, [spPhones], 
     [scPhones], 1, spMobile), new DF(c_homePhoneMask, [spPhones], [scPhones], 1, spHome), new DF(c_home2PhoneMask, 
     [spPhones], [scPhones], 1, spHome2), new DF(c_workPhoneMask, [spPhones], [scPhones], 1, spWork), new DF(c_work2PhoneMask, 
     [spPhones], [scPhones], 1, spWork2), new DF(c_homeFaxMask, [spPhones], [scPhones], 1, spHomeFax), 
     new DF(c_pagerMask, [spPhones], [scPhones], 1, spPager), new DF(c_workFaxMask, [spPhones], [scPhones], 
     1, spWorkFax), new DF(c_homeAddressMask, [spAddresses], [scAddresses], 1, saHome, compareArrays), 
     new DF(c_workAddressMask, [spAddresses], [scAddresses], 1, saWork, compareArrays), new DF(c_otherAddressMask, 
     [spAddresses], [scAddresses], 1, saOther, compareArrays), new DF(c_significantOtherMask, [spSignificantOther, 
     spAnniversary], [scSignificantOther, scAnniversary]), new DF(c_websiteMask, [spWebsite], [scWebsite]), 
     new DF(c_notesMask, [spNotes], [scNotes]), new DF(c_birthdayMask, [spBirthday], [scBirthday], 0, 0, 
     compareArrays)], c_dedupableFieldsHash = [];
     (function ()
     {
         for (var c = 0, d = c_dedupeMap.length; c < d; c++)
         {
             var b = c_dedupeMap[c].personFields;
             for (var a = 0, e = b.length; a < e; a++) {
                 if (!c_dedupableFieldsHash[b[a]]) {
                     c_dedupableFieldsHash[b[a]] = 1;
                 }
             }
         }
     })();
     wLive.Contacts.PersonHelper = PersonHelper;
     function PersonHelper(c)
     {
         var b = this, a = c;
         b.setPerson = function (b)
         {
             a = b;
         };
         b.getId = function ()
         {
             return a[spId];
         };
         b.getFirstName = function ()
         {
             return a[spFirstName];
         };
         b.getMiddleName = function ()
         {
             return a[spMiddleName];
         };
         b.getLastName = function ()
         {
             return a[spLastName];
         };
         b.getTitle = function ()
         {
             return a[spTitle];
         };
         b.getSuffix = function ()
         {
             return a[spSuffix];
         };
         b.getCompanyName = function ()
         {
             return a[spCompanyName];
         };
         b.getPersonalEmail = function ()
         {
             return a[spEmails][sePersonal];
         };
         b.getWorkEmail = function ()
         {
             return a[spEmails][seWork];
         };
         b.getOtherEmail = function ()
         {
             return a[spEmails][seOther];
         };
         b.getMobilePhone = function ()
         {
             return a[spPhones][spMobile];
         };
         b.getHomePhone = function ()
         {
             return a[spPhones][spHome];
         };
         b.getHome2Phone = function ()
         {
             return a[spPhones][spHome2];
         };
         b.getWorkPhone = function ()
         {
             return a[spPhones][spWork];
         };
         b.getWork2Phone = function ()
         {
             return a[spPhones][spWork2];
         };
         b.getPager = function ()
         {
             return a[spPhones][spPager];
         };
         b.getHomeFax = function ()
         {
             return a[spPhones][spHomeFax];
         };
         b.getWorkFax = function ()
         {
             return a[spPhones][spWorkFax];
         };
         b.getCid = function ()
         {
             return a[spCid];
         };
         b.getHexCid = function ()
         {
             return a[spHexCid];
         };
         b.getOnHideList = function ()
         {
             return a[spOnHideList];
         };
         b.getTrustLevel = function ()
         {
             return a[spTrustLevel];
         };
         b.getUserTileMedium = function ()
         {
             return a[spUserTileMedium];
         };
         b.getIsFavorite = function ()
         {
             return a[spIsFavorite];
         };
         b.getFavoriteOrder = function ()
         {
             return a[spFavoriteOrder];
         };
         b.getCategoryIds = function ()
         {
             return a[spCategoryIds];
         };
         b.getYomiFirstName = function ()
         {
             return a[spYomiFirstName];
         };
         b.getYomiLastName = function ()
         {
             return a[spYomiLastName];
         };
         b.getYomiCompanyName = function ()
         {
             return a[spYomiCompanyName];
         }
     }
     wLive.Contacts.ContactHelper = ContactHelper;
     function ContactHelper(e, f)
     {
         var b = this, a, c, d;
         if (e && typeof f !== c_undefined) {
             c = e;
             a = e[spContacts][f];
             d = a[scPromotionBitmap]
         }
         b.setContact = function (b, e)
         {
             c = b;
             a = b[spContacts][e];
             d = a[scPromotionBitmap];
         };
         b.getId = function ()
         {
             return d & c_idMask ? c[spId] : a[scId];
         };
         b.getFirstName = function ()
         {
             return d & c_nameMask ? c[spFirstName] : a[scFirstName];
         };
         b.getMiddleName = function ()
         {
             return d & c_nameMask ? c[spMiddleName] : a[scMiddleName];
         };
         b.getLastName = function ()
         {
             return d & c_nameMask ? c[spLastName] : a[scLastName];
         };
         b.getTitle = function ()
         {
             return d & c_nameMask ? c[spTitle] : a[scTitle];
         };
         b.getSuffix = function ()
         {
             return d & c_nameMask ? c[spSuffix] : a[scSuffix];
         };
         b.getYomiFirstName = function ()
         {
             return d & c_nameMask ? c[spYomiFirstName] : a[scYomiFirstName];
         };
         b.getYomiLastName = function ()
         {
             return d & c_nameMask ? c[spYomiLastName] : a[scYomiLastName];
         };
         b.getCompanyName = function ()
         {
             return d & c_companyNameMask ? c[spCompanyName] : a[scCompanyName];
         };
         b.getYomiCompanyName = function ()
         {
             return d & c_companyNameMask ? c[spYomiCompanyName] : a[scYomiCompanyName];
         };
         b.getJobTitle = function ()
         {
             return d & c_companyNameMask ? c[spJobTitle] : a[scJobTitle];
         };
         b.getPersonalEmail = function ()
         {
             return d & c_personalEmailMask ? c[spEmails][sePersonal] : (a[scEmails] || c_emptyArray)[sePersonal];
         };
         b.getPersonalEmailImEnabled = function ()
         {
             return a[scEmailImEnabled][sePersonal];
         };
         b.getWorkEmail = function ()
         {
             return d & c_workEmailMask ? c[spEmails][seWork] : (a[scEmails] || c_emptyArray)[seWork];
         };
         b.getWorkEmailImEnabled = function ()
         {
             return (a[scEmailImEnabled] || c_emptyArray)[seWork];
         };
         b.getOtherEmail = function ()
         {
             return d & c_otherEmailMask ? c[spEmails][seOther] : (a[scEmails] || c_emptyArray)[seOther];
         };
         b.getOtherEmailImEnabled = function ()
         {
             return (a[scEmailImEnabled] || c_emptyArray)[seOther];
         };
         b.getPassportMemberName = function ()
         {
             return a[scSourceId] === "WL" ? c[spPassportMemberName] : null;
         };
         b.getMobilePhone = function ()
         {
             return d & c_mobilePhoneMask ? c[spPhones][spMobile] : (a[scPhones] || c_emptyArray)[spMobile];
         };
         b.getMobilePhoneImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spMobile];
         };
         b.getHomePhone = function ()
         {
             return d & c_homePhoneMask ? c[spPhones][spHome] : (a[scPhones] || c_emptyArray)[spHome];
         };
         b.getHomePhoneImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spHome];
         };
         b.getHome2Phone = function ()
         {
             return d & c_home2PhoneMask ? c[spPhones][spHome2] : (a[scPhones] || c_emptyArray)[spHome2];
         };
         b.getHome2PhoneImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spHome2];
         };
         b.getWorkPhone = function ()
         {
             return d & c_workPhoneMask ? c[spPhones][spWork] : (a[scPhones] || c_emptyArray)[spWork];
         };
         b.getWorkPhoneImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spWork];
         };
         b.getWork2Phone = function ()
         {
             return d & c_work2PhoneMask ? c[spPhones][spWork2] : (a[scPhones] || c_emptyArray)[spWork2];
         };
         b.getWork2PhoneImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spWork2];
         };
         b.getPager = function ()
         {
             return d & c_pagerMask ? c[spPhones][spPager] : (a[scPhones] || c_emptyArray)[spPager];
         };
         b.getPagerImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spPager];
         };
         b.getHomeFax = function ()
         {
             return d & c_homeFaxMask ? c[spPhones][spHomeFax] : (a[scPhones] || c_emptyArray)[spHomeFax];
         };
         b.getHomeFaxImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spWorkFax];
         };
         b.getWorkFax = function ()
         {
             return d & c_workFaxMask ? c[spPhones][spHomeFax] : (a[scPhones] || c_emptyArray)[spHomeFax];
         };
         b.getWorkFaxImEnabled = function ()
         {
             return (a[scPhoneImEnabled] || c_emptyArray)[spWorkFax];
         };
         b.getContactState = function ()
         {
             return a[scContactState];
         };
         b.getPromotionBitmap = function ()
         {
             return a[scPromotionBitmap];
         };
         b.getSourceId = function ()
         {
             return a[scSourceId];
         };
         b.getObjectId = function ()
         {
             return a[scObjectId];
         };
         b.getDomainId = function ()
         {
             return a[scDomianId];
         };
         b.getDomainTag = function ()
         {
             return a[scDomainTag];
         };
         b.getUserTileMedium = function ()
         {
             return d & c_userTileMask ? c[spUserTileMedium] : a[scUserTileMedium];
         };
         b.getFavoriteOrder = function ()
         {
             return a[scFavoriteOrder];
         };
         b.getBirthday = function ()
         {
             return d & c_birthdayMask ? c[spBirthday] : a[scBirthday];
         };
         b.getNickName = function ()
         {
             return d & c_nameMask ? c[spNickName] : a[scNickName];
         };
         b.getAddresses = function ()
         {
             return a[scAddresses];
         };
         b.getSignificantOther = function ()
         {
             return d & c_significantOtherMask ? c[spSignificantOther] : a[scSignificantOther];
         };
         b.getAnniversary = function ()
         {
             return d & c_significantOtherMask ? c[spAnniversary] : a[scAnniversary];
         };
         b.getWebsite = function ()
         {
             return d & c_websiteMask ? c[spWebsite] : a[scWebsite];
         };
         b.getNotes = function ()
         {
             return d & c_notesMask ? c[spNotes] : a[scNotes];
         };
         b.getHomeAddress = function ()
         {
             return d & c_homeAddressMask ? c[spAddresses][saHome] : (a[scAddresses] || c_emptyArray)[saHome];
         };
         b.getWorkAddress = function ()
         {
             return d & c_workAddressMask ? c[spAddresses][saWork] : (a[scAddresses] || c_emptyArray)[saWork];
         };
         b.getOtherAddress = function ()
         {
             return d & c_otherAddressMask ? c[spAddresses][saOther] : (a[scAddresses] || c_emptyArray)[saOther];
         }
     }
     var c_globalVariableName = "$WLXContacts", c_wlxcontacts = "wlxcontacts", c_readyEvent = "ready", 
     c_changedEvent = "changed", c_unload = "unload", c_undefined = "undefined", c_cookieName = "wpc", 
     c_deltaSyncCookieName = "wpd", c_cachedProfilesLimit = 30, c_wlContactPromotedProps = [spCid, spHexCid, 
     spTrustLevel, spOnHideList, spPassportMemberName], c_inProgress = "inProgress", c_successCallbacks = "successCallbacks", 
     c_failureCallbacks = "failureCallbacks", c_requestType = "requestType", c_trace = "trace", c_startIndexKeySuffix = "_s", 
     c_endIndexKeySuffix = "_e", c_fullSyncRequest = "full", c_deltaSyncRequest = "delta", c_expireProfilesDataAfter = 1.8e6, 
     c_maxRetry = 3;
     wLive.Contacts.WLXContactsCore = WLXContactsCore;
     function WLXContactsCore(i, ub)
     {
         var a = this;
         a.isReady = false;
         a.persons = [];
         a.groups = [];
         a.categories = [];
         a.services = [];
         a.profiles = [];
         a.settings = [];
         a.$persons = jQuery({});
         a.$groups = jQuery({});
         a.$categories = jQuery({});
         a.$services = jQuery({});
         a.$self = jQuery(a);
         a.syncKey = "";
         a.lastModified = null;
         a.lastFullSync = null;
         a.lastDeltaSync = null;
         i = i || "";
         var K = "fullSyncResponse" + i, H = "abCid" + i, Q = "profilesCid" + i, y = "profilesTimestamp" + i, 
         B = "lastFullSync" + i, A = "lastDeltaSync" + i, l = "deltaSyncRequired" + i, t = "profilesResponse" + i, 
         x = "deltaSyncResponse" + i, D, c = null, o = null, d = null, g, f, S = null, P = null, cb, m, 
         C = [], j = 0, R = 0, F = new LazyHash(a.persons, [spId, spCid, spHexCid, [spContacts, scId]]), 
         u = new LazyHash([], [spId, [spContacts, scId]]), G = new LazyHash(a.groups, [0]), p = new LazyHash(a.categories, 
         [0]), E = new LazyHash(a.services, [0]), q = new LazyHash(a.profiles, [spCid, spHexCid]), h = [], 
         e = [], v, eb, b, k, qb, gb = new ContactHelper, hb = new PersonHelper, M, N;
         a.init = function (b)
         {
             if (v) {
                 fb(b);
                 return
             }
             if (D && b == w) {
                 return;
             }
             D = b;
             v = 1;
             jQuery(w).bind(c_unload, a.dispose);
             T()
         };
         function fb(a)
         {
             if (ib())
             {
                 if (M) {
                     clearTimeout(M);
                 }
                 if (v === 2 && a.$Config)
                 {
                     var d = L(a.$Config, "enabled", 0);
                     if (d && d != b.enabled) {
                         b.enabled = 1;
                         c.registerReadyCallback(ab)
                     }
                 }
                 else if (v === 1 && b.fullyDisabled && L(a.$Config, "enabled", 0)) {
                     D = a;
                     T()
                 }
                 else {
                     if (L(a.$Config, "fullyDisabled", 0)) {
                         return;
                     }
                     M = setTimeout(function ()
                     {
                         fb(a)
                     }, 200)
                 }
             }
         }
         function L(a, c, b)
         {
             if (a && a.ContactCache) {
                 return a.ContactCache[c];
             }
             else {
                 return b;
             }
         }
         function T()
         {
             k = ub || D.$Config;
             if (k)
             {
                 b = k.ContactCache;
                 if (!b || b.fullyDisabled) {
                     return;
                 }
                 if ($Logout) {
                     $Logout.add(jb);
                 }
                 qb = $Cookie.getSessionCookie(c_cookieName) === "1";
                 if (w["localStorage"])
                 {
                     if (!b.inMemoryStorage && !g && !f)
                     {
                         N = new CrossDomainProxy(b.peopleApiBaseUrl);
                         g = g || new DOMLocalStorageWrapper(N, true);
                         f = f || new DOMLocalStorageWrapper(N, false)
                     }
                     d = new LocalStorageProxy(f, V);
                     o = c = new LocalStorageProxy(b.localStorage ? g : f)
                 }
                 else
                 {
                     if (!b.inMemoryStorage && !g && !f) {
                         g = g || new MWTLocalStorageWrapper;
                         f = f || g
                     }
                     d = new LocalStorageProxy(f, V);
                     c = new LocalStorageProxy(g);
                     o = new LocalStorageProxy;
                     eb = true
                 }
                 c.registerReadyCallback(ab);
                 d.registerReadyCallback(nb);
                 v = 2
             }
             else {
                 setTimeout(T, 200);
             }
         }
         function bb()
         {
             if (!a.isReady)
             {
                 if (b.fullSyncDelay) {
                     setTimeout(function () 
                     {
                         a.fullSync() 
                     },
                     b.fullSyncDelay);
                 }
                 else {
                     a.fullSync();
                 }
                 else {
                     r();
                 }
             }
         }
         function rb()
         {
             if (b.initOnPageLoad && b.enabled)
             {
                 var a;
                 if (!$BSI.isLoading()) {
                     bb();
                 }
                 else
                 {
                     var c = false;
                     a = function ()
                     {
                         if (c) {
                             return;
                         }
                         if (a) {
                             $BSI.removeLoadedCallback(a);
                             c = true
                         }
                         bb();
                     };
                     $BSI.addLoadedCallback(a)
                 }
             }
         }
         a.getPersonHelper = function (a)
         {
             hb.setPerson(a);
             return hb;
         };
         a.getContactHelper = function (a, b)
         {
             gb.setContact(a, b);
             return gb;
         };
         a.isMeContact = function (a)
         {
             return a[spContacts][0][scContactState] === 1;
         };
         a.isLastNameFirst = function ()
         {
             return b && b.isLastNameFirst ? true : false;
         };
         a.callWhenReady = function (b)
         {
             if (a.isReady) {
                 b();
             }
             else {
                 if (C.length === 0) {
                     a.$self.bind(c_readyEvent, Z);
                 }
                 C.push(b)
             }
         };
         function Z()
         {
             a.$self.unbind(c_readyEvent, Z);
             processCallbacks(C)
         }
         a.getProfile = function (c, d)
         {
             var b = q.get(c);
             if (!(d || false) && b === null) {
                 b = a.getPerson(c, true);
             }
             return b;
         };
         a.getPerson = function (b, c)
         {
             var a = F.get(b);
             if (!(c || false) && a === null) {
                 a = q.get(b);
             }
             return a;
         };
         a.getContactId = function (a, b)
         {
             return getContactId(a, b);
         };
         a.getGroup = function (a)
         {
             return G.get(a);
         };
         a.getCategory = function (a)
         {
             return p.get(a);
         };
         a.getService = function (a)
         {
             return E.get(a);
         };
         a.getPersonsByCategory = function (f)
         {
             var d = [];
             for (var b = 0, e = a.persons.length; b < e; b++) {
                 var c = a.persons[b][spCategoryIds];
                 if (c && c.contains(f)) {
                     d.push(a.persons[b]);
                 }
             }
             return d;
         };
         a.getPersonsByService = function (g)
         {
             var c = [];
             for (var b = 0, f = a.persons.length; b < f; b++) {
                 var d = a.persons[b], e = findItemInArray(d[spContacts], scSourceId, g);
                 if (e) {
                     c.push(d);
                 }
             }
             return c;
         };
         a.getProfileUrl = function (a)
         {
             return b.profileUrl.replace("{cid}", a[spHexCid]);
         };
         a.getPhotosUrl = function (a)
         {
             return b.photosUrl.replace("{cid}", a[spHexCid]);
         };
         a.queueProfileRequest = function (a)
         {
             h.push(a)
         };
         a.queueProfileRequests = function (a)
         {
             h.addRange(a)
         };
         a.clearQueue = function ()
         {
             h = [];
         };
         a.cloneArray = function (a)
         {
             return cloneArray(a);
         };
         function db(f, c, b)
         {
             var g = true;
             for (var d = 0, j = e.length; d < j; d++)
             {
                 var h = e[d][c_requestType], i = e[d][c_inProgress];
                 if (h === f)
                 {
                     if (!i)
                     {
                         g = false;
                         if (c && !a[c_successCallbacks].contains(c)) {
                             a[c_successCallbacks].push(c);
                         }
                         if (b && !a[c_failureCallbacks].contains(b)) {
                             a[c_failureCallbacks].push(b);
                         }
                     }
                     break
                 }
                 else if (f === c_deltaSyncRequest && h === c_fullSyncRequest && !i) {
                     g = false;
                     break
                 }
             }
             if (g)
             {
                 var a = {};
                 a[c_requestType] = f;
                 a[c_successCallbacks] = [c];
                 a[c_failureCallbacks] = [b];
                 a[c_inProgress] = false;
                 e.push(a)
             }
             O()
         }
         function O()
         {
             if (e.length === 0) {
                 return;
             }
             var c = e[0];
             if (!c[c_inProgress])
             {
                 var d = {};
                 if (b.rpsToken) {
                     d["RPSTAuth"] = b.rpsToken;
                 }
                 c[c_inProgress] = true;
                 var f = location.protocol + "//" + b.peopleApiBaseUrl + "/people/abcore?SerializeAs=compact" + "&market=" + k.mkt.encodeURIComponent() + "&appid=" + b.peopleApiAppId.encodeURIComponent() + "&version=" + c_schemaVersion.encodeURIComponent();
                 if (c[c_requestType] === c_fullSyncRequest)
                 {
                     c[c_trace] = $CSIPerf.startTrace("fullAbSync");
                     $Network.fetchXML(f, function (a)
                     {
                         tb(a)
                     },
                     "GET", null, d)
                 }
                 else if (c[c_requestType] === c_deltaSyncRequest)
                 {
                     $Network.fetchXML(f + "&syncKey=" + a.syncKey.encodeURIComponent(), function (a) 
                     {
                         sb(a) 
                     },
                     "GET", null, d);
                 }
                 else
                 {
                     $WebWatson.submitFromException(new Error("Unknown request type"), c_globalVariableName + ".processSyncQueue");
                 }
             }
         }
         a.fullSync = function (c, a)
         {
             if (b.enabled) {
                 db(c_fullSyncRequest, c, a);
             }
         };
         a.deltaSync = function (e, d)
         {
             if (b.enabled) {
                 c.set(l, "1");
                 if (a.isReady) {
                     db(c_deltaSyncRequest, e, d);
                 }
                 else {
                     m = true;
                 }
             }
         };
         a.loadQueuedProfiles = function (d, i)
         {
             if (h.length > 0)
             {
                 var c = [], f = [];
                 for (var e = 0, m = h.length; e < m; e++)
                 {
                     if (a.getProfile(h[e])) {
                         f.push(h[e]);
                     }
                     else {
                         c.push(h[e]);
                     }
                     h = [];
                     if (c.length > 0)
                     {
                         while (c.length > 0) 
                         {
                             var j = c.length > b.batchSize ? b.batchSize : c.length, g = c.splice(0, j), 
                             l = g.join(",");
                             $Network.fetchXML(k.handlerBaseUrl + "/Handlers/PeopleApi/GetProfiles.mvc", 
                             function (a) 
                             {
                                 mb(a, d, i, g) 
                             },
                             "POST", "canary=" + b.canary.encodeURIComponent() + "&cids=" + l.encodeURIComponent()) 
                         }
                         if (f.length > 0 && d) {
                             d(f, []);
                         }
                     }
                 }
             }
             else if (d) {
                 d([], []);
             }
         };
         a.getPersonDetails = function (a, c, e)
         {
             var d = u[a];
             if (d) {
                 setTimeout(function () 
                 {
                     c(d) 
                 }, 4);
             }
             else
             {
                 var f = location.protocol + "//" + b.peopleApiBaseUrl + "/people/PersonDetails?contactid=" + a.encodeURIComponent() + "&SerializeAs=compact" + "&market=" + k.mkt.encodeURIComponent() + "&appid=" + b.peopleApiAppId.encodeURIComponent() + "&version=" + c_schemaVersion.encodeURIComponent();
                 $Network.fetchXML(f, function (b)
                 {
                     pb(b, c, e, a)
                 },
                 "GET")
             }
         };
         a.processABChangedEvent = function ()
         {
             a.deltaSync()
         };
         function z(a, f, g, c)
         {
             var b, e = false;
             if (a && a.length)
             {
                 if (a[sError])
                 {
                     if (a[sError].length >= 2) 
                     {
                         if (!c || !c.contains(a[sError][0] || "")) 
                         {
                             var d = a[sError][0];
                             b = a[sError][1] || "Unspecified error returned";
                             if (d == "InvalidPassportUser" || d == "BadArgument" && (b.toLowerCase().indexOf("resolve the caller") !=- 1 || b.toLowerCase().indexOf("ticket") !=- 1)) {
                                 R = c_maxRetry;
                                 j = c_maxRetry;
                             }
                         }
                     }
                     else {
                         b = "Invalid error response";
                     }
                     else if (!a[sData]) {
                         b = "Invalid response";
                     }
                 }
             }
             else {
                 b = "Invalid response format";
             }
             if (b)
             {
                 if (f) {
                     $WebWatson.submitFromException(new Error(b), c_globalVariableName + "." + g);
                 }
                 e = true
             }
             return e
         }
         function pb(a, d, c, g)
         {
             var h = !a || a.status != 200 ? false : true, f = "personDetailsCallback";
             if (h)
             {
                 var e = parseJSON(stripJsonPrefix(a.responseText));
                 if (!z(e, true, f, ["ContactDoesNotExist"])) {
                     var b = e[0];
                     if (b) {
                         u.update([b]);
                         if (d) {
                             d(b);
                         }
                         return
                     }
                 }
             }
             else
             {
                 $WebWatson.submitFromException(new Error("PersonDetails call failed (status code: " + (a && a.status ? a.status : "empty") + ")"), 
                 c_globalVariableName + "." + f);
             }
             if (c) {
                 c(g);
             }
         }
         function tb(f)
         {
             function h(b)
             {
                 if (++j >= c_maxRetry)
                 {
                     e.shift();
                     j = 0;
                     a.lastFullSync = new Date;
                     c.set(B, a.lastFullSync.getTime());
                     r(false, true);
                     processCallbacks(d[c_failureCallbacks]);
                     if (b)
                     {
                         $WebWatson.submitFromException(new Error("FullSync call failed (status code: " + (b.status ? b.status : "empty") + ")"), 
                         c_globalVariableName);
                     }
                 }
                 else {
                     d[c_inProgress] = false;
                 }
             }
             var k = !f || f.status != 200 ? false : true, d = e[0], b = d[c_trace];
             b.lapse.push({
                 s : "completed", t : (new Date).getTime()
             });
             if (k)
             {
                 var g = stripJsonPrefix(f.responseText);
                 b.addCsd("responseLength", g.length);
                 var i = parseJSON(g);
                 if (!z(i, j == c_maxRetry - 1, "fullSync"))
                 {
                     if (I(i, true))
                     {
                         b.lapse.push({
                             s : "deserialized", t : (new Date).getTime()
                         });
                         e.shift();
                         a.lastFullSync = a.lastDeltaSync = new Date;
                         j = 0;
                         Y(g);
                         $Cookie.setSessionCookie(c_cookieName, "1");
                         r();
                         u.clear();
                         a.isReady = true;
                         a.$self.trigger(c_readyEvent);
                         processCallbacks(d[c_successCallbacks])
                     }
                 }
                 else {
                     h();
                 }
             }
             else {
                 h(f);
             }
             b.lapse.push({
                 s : "processed", t : (new Date).getTime()
             });
             b.endTrace();
             O()
         }
         function sb(g)
         {
             function s(b)
             {
                 if (++j >= c_maxRetry)
                 {
                     e.shift();
                     a.lastDeltaSync = new Date;
                     j = 0;
                     r(true, true);
                     processCallbacks(i[c_successCallbacks]);
                     if (b)
                     {
                         $WebWatson.submitFromException(new Error("DeltaSync call failed (status code: " + (b.status ? b.status : "empty") + ")"), 
                         c_globalVariableName);
                     }
                 }
                 else {
                     i[c_inProgress] = false;
                 }
             }
             var B = !g || g.status != 200 ? false : true, i = e[0];
             if (B)
             {
                 var k = stripJsonPrefix(g.responseText), n = parseJSON(k), b = [], m = false;
                 if (!z(n, j == c_maxRetry - 1, "deltaSync"))
                 {
                     var d = n[sData];
                     if (d[sAbCore.isFullSync])
                     {
                         if (I(n, true))
                         {
                             m = true;
                             a.lastDeltaSync = a.lastDeltaSync = new Date;
                             Y(k);
                             $Cookie.setSessionCookie(c_cookieName, "1")
                         }
                     }
                     else
                     {
                         var q = d[sAbCore.syncKey], D = d[sAbCore.lastModifiedDateTime], w = d[sAbCore.persons], 
                         v = d[sAbCore.groups], t = d[sAbCore.categories], y = d[sAbCore.settings], h = d[sAbCore.services];
                         if (a.syncKey !== q && (w.length > 0 || v.length > 0 || t.length > 0 || h.length > 0 || y != null))
                         {
                             try 
                             {
                                 if (h && h.length > 0) {
                                     b.push(deltaSyncServices(h, a.services, a.$services, E));
                                 }
                                 b.push(deltaSyncPersons(w, a.persons, a.$persons, F, u, a.services, p));
                                 b.push(deltaSyncArray(v, a.groups, a.$groups, G, sGroup.isDeleted, 1));
                                 b.push(deltaSyncArray(t, a.categories, a.$categories, p, sCategory.isDeleted, 
                                 1));
                                 a.settings = y || [];
                                 storeIncrementalResponse(o, x, {
                                     json : k, syncKey : a.syncKey 
                                 });
                                 a.syncKey = q;
                                 a.lastModified = D;
                                 if (eb) {
                                     c.set(l, "1") ;
                                 }
                             }
                             catch (H) {
                                 $WebWatson.submitFromException(H, c_globalVariableName + ".deltaSync") 
                             }
                         }
                         a.lastDeltaSync = new Date;
                         c.set(A, a.lastDeltaSync.getTime())
                     }
                     c.remove(l);
                     $Cookie.setSessionCookie(c_deltaSyncCookieName, null);
                     e.shift();
                     j = 0;
                     r(!m);
                     if (m) {
                         a.isReady = true;
                         a.$self.trigger(c_readyEvent)
                     }
                     else
                     {
                         for (var f = 0, C = b.length; f < C; f++) {
                             if (b[f] !== null) {
                                 b[f].source.trigger(c_changedEvent, b[f].args);
                             };
                         }
                     }
                     processCallbacks(i[c_successCallbacks])
                 }
                 else {
                     s();
                 }
             }
             else {
                 s(g);
             }
             O()
         }
         function mb(a, e, d, b)
         {
             var j = !a || a.status != 200 ? false : true;
             if (j)
             {
                 var i = X(a.responseText), g = [], f = [];
                 for (var c = 0, k = b.length; c < k; c++)
                 {
                     if (q.get(b[c])) {
                         g.push(b[c]);
                     }
                     else {
                         f.push(b[c]);
                     }
                     if (i) {
                         kb(a.responseText);
                     }
                     if (e) {
                         e(g, f);
                     }
                 }
             }
             else
             {
                 h.addRange(b);
                 if (d) {
                     d(b);
                 }
                 $WebWatson.submitFromException(new Error("GetProfiles call failed (status code: " + (a && a.status ? a.status : "empty") + ")"), 
                 c_globalVariableName)
             }
         }
         function X(e)
         {
             var b = parseJSON(e), d = s.profilesResponse;
             if (b && b.length > 0 && b[d.schemaVersion] == c_schemaVersion) {
                 var c = b[d.profiles];
                 a.profiles.addRange(c);
                 q.update(c);
                 return c.length
             }
             else {
                 return 0;
             }
         }
         function r(d, i)
         {
             if (i) {
                 if (++R >= 3) {
                     return;
                 }
             }
             else {
                 R = 0;
             }
             var e = new Date, c = b.fullSyncInterval, g = a.lastFullSync || e, h = a.lastDeltaSync || g;
             d = d || false;
             if (!d)
             {
                 if (S !== null) {
                     clearTimeout(S);
                 }
                 c = Math.max(c - (e.getTime() - g.getTime()), 0);
                 S = setTimeout(function ()
                 {
                     a.fullSync()
                 }, c)
             }
             if (P !== null) {
                 clearTimeout(P);
             }
             var f = Math.max(b.deltaSyncInterval - (e.getTime() - h.getTime()), 0);
             if (f < c) {
                 P = setTimeout(function () 
                 {
                     a.deltaSync() 
                 }, f);
             }
         }
         function jb()
         {
             a.profiles.splice(0, a.profiles.length);
             a.persons.splice(0, a.persons.length);
             a.groups.splice(0, a.groups.length);
             a.categories.splice(0, a.categories.length);
             a.services.splice(0, a.services.length);
             h = [];
             q.clear();
             F.clear();
             p.clear();
             G.clear();
             E.clear();
             J();
             U()
         }
         function ib()
         {
             return n() !== ""
         }
         function n()
         {
             var a = vb();
             return a && a.hcid ? a.hcid : ""
         }
         function vb()
         {
             return k || $Config
         }
         function V(a, b)
         {
             loadIncrementalResponse(a, t, ["json"], function (a)
             {
                 storeIncrementalResponse(b, t, {
                     json : a["json"]
                 });
                 return true;
             });
             a.clearTempStorage()
         }
         function nb()
         {
             var c = d.get(Q, ""), b = parseInt(d.get(y, "0"));
             if (b && (new Date).getTime() - b < c_expireProfilesDataAfter && c === n())
             {
                 a.profiles.splice(0, a.profiles.length);
                 q.clear();
                 loadIncrementalResponse(d, t, ["json"], function (a)
                 {
                     X(a["json"]);
                     return true;
                 })
             }
             else {
                 U();
             }
         }
         function ab()
         {
             ob();
             if (!a.isReady && b.enabled)
             {
                 lb();
                 if (ib()) if (!cb) rb();
                 else
                 {
                     if (m) {
                         a.lastDeltaSync = new Date((new Date).getTime() - b.deltaSyncInterval);
                         m = false
                     }
                     else {
                         a.lastDeltaSync = new Date(a.lastDeltaSync.getTime() + b.deltaSyncInterval);
                     }
                     a.isReady = true;
                     r();
                     a.$self.trigger(c_readyEvent)
                 }
             }
         }
         function ob()
         {
             var d = c.get(H, "");
             if (d !== n()) {
                 J();
             }
             if (f !== g) {
                 var a = b.localStorage ? f : g;
                 W(a, a)
             }
         }
         function U()
         {
             if (d) {
                 d.remove(Q);
                 d.remove(y);
                 clearIncrementalResponse(d, t, ["json"])
             }
         }
         function J()
         {
             W(c, o)
         }
         function W(a, b)
         {
             if (a) {
                 a.remove(H);
                 a.remove(K);
                 a.remove(B);
                 a.remove(A);
                 a.remove(l)
             }
             clearIncrementalResponse(b, x, ["json", "syncKey"])
         }
         function Y(b)
         {
             c.set(H, n());
             c.set(K, b);
             c.set(B, a.lastFullSync.getTime());
             c.set(A, a.lastDeltaSync.getTime());
             clearIncrementalResponse(o, x, ["json", "syncKey"]);
             c.remove(l)
         }
         function kb(b)
         {
             var a = d.get(y, (new Date).getTime());
             d.set(Q, n());
             d.set(y, a);
             storeIncrementalResponse(d, t, {
                 json : b
             },
             c_cachedProfilesLimit)
         }
         function lb()
         {
             var d = c.get(H, "");
             if (d !== "" && d === n())
             {
                 var b = c.get(K, null);
                 if (b !== null)
                 {
                     var f = parseJSON(b);
                     if (!z(f, true, "loadFromStorage") && I(f))
                     {
                         var e = (new Date).getTime();
                         m = c.get(l, "0") === "1" || $Cookie.getSessionCookie(c_deltaSyncCookieName) === "1";
                         a.lastFullSync = new Date(parseInt(c.get(B, e)));
                         a.lastDeltaSync = new Date(parseInt(c.get(A, e)));
                         cb = true;
                         loadIncrementalResponse(o, x, ["json", "syncKey"], function (d)
                         {
                             var f = parseJSON(d["json"]), e = d["syncKey"];
                             if (e === a.syncKey)
                             {
                                 var b = f[sData], c = b[sAbCore.services];
                                 if (c && c.length > 0) {
                                     deltaSyncServices(c, a.services, a.$services, E);
                                 }
                                 deltaSyncPersons(b[sAbCore.persons], a.persons, a.$persons, F, u, a.services, 
                                 p);
                                 deltaSyncArray(b[sAbCore.groups], a.groups, a.$groups, G, sGroup.isDeleted, 
                                 1);
                                 deltaSyncArray(b[sAbCore.categories], a.categories, a.$categories, p, 
                                 sCategory.isDeleted, 1);
                                 a.settings = b[sAbCore.settings] || [];
                                 a.lastModified = b[sAbCore.lastModifiedDateTime];
                                 a.syncKey = b[sAbCore.syncKey];
                                 m = false;
                                 return true
                             }
                             else {
                                 m = true;
                                 return false;
                             }
                         })
                     }
                     else {
                         J();
                     }
                 }
             }
         }
         function I(d, c)
         {
             var b = d[sData];
             if (b[sAbCore.schemaVersion] == c_schemaVersion)
             {
                 resetArray(a.persons, b[sAbCore.persons]);
                 resetArray(a.groups, b[sAbCore.groups]);
                 resetArray(a.categories, b[sAbCore.categories]);
                 resetArray(a.groups, b[sAbCore.groups]);
                 resetArray(a.services, b[sAbCore.services]);
                 resetArray(a.settings, b[sAbCore.settings]);
                 a.lastModified = b[sAbCore.lastModifiedDateTime];
                 a.syncKey = b[sAbCore.syncKey];
                 return true
             }
             else
             {
                 if (c)
                 {
                     $WebWatson.submitFromException(new Error("Schema mismatch error (expected: {0}, returned: {1})".format(c_schemaVersion, 
                     b[sAbCore.schemaVersion] || "")), c_globalVariableName);
                 }
                 return false;
             }
         }
         a.dispose = function ()
         {
             if ($Logout && b && !b.fullyDisabled) {
                 $Logout.remove(jb);
             }
             jQuery(w).unbind(c_unload, a.dispose);
             a.$self.unbind(c_readyEvent);
             a.$persons.unbind(c_changedEvent);
             a.$categories.unbind(c_changedEvent);
             a.$groups.unbind(c_changedEvent);
             a.$services.unbind(c_changedEvent);
             _deltaSyncFailureCallbacks = _deltaSyncSuccessCallbacks = _fullSyncFailureCallbacks = _fullSyncSuccessCallbacks = C = null;
             a.profiles = a.services = a.groups = a.categories = a.persons = a.settings = null;
             a.$self = a.$services = a.$groups = a.$categories = a.$persons = null;
         };
         a.populateContacts = function (c)
         {
             var b = a.cloneArray(c);
             populateContacts(b);
             return b;
         };
         a.dedupeContacts = function (c)
         {
             var b = a.cloneArray(c);
             dedupeContacts(b);
             return b;
         }
     }
     function preInit()
     {
         var a;
         try {
             a = w != w.parent && w.parent.location.hostname && w.parent.$Do
         }
         catch (c) {}
         if (a)
         {
             var b = w.parent;
             b.$Do.when(c_wlxcontacts, 0, outerWindowReady);
             jQuery(w).bind(c_unload, dispose)
         }
         else {
             w[c_globalVariableName] = new WLXContactsCore;
             callInitWhenReady()
         }
     }
     function dispose()
     {
         w.parent.$Do.remove(c_wlxcontacts, 0, outerWindowReady);
         jQuery(w).unbind(c_unload, dispose)
     }
     function outerWindowReady()
     {
         w[c_globalVariableName] = w.parent[c_globalVariableName];
         callInitWhenReady()
     }
     function callInitWhenReady()
     {
         w[c_globalVariableName].init(window);
         $Do.register(c_wlxcontacts, 0, true)
     }
     wLive.Contacts.DeltaSyncChangedItem = DeltaSyncChangedItem;
     function DeltaSyncChangedItem(a, b)
     {
         this.original = a;
         this.updated = b
     }
     wLive.Contacts.DeltaSyncEventArgs = DeltaSyncEventArgs;
     function DeltaSyncEventArgs(c, a, b)
     {
         this.added = c;
         this.changed = a;
         this.removed = b
     }
     function isNullOrUndefined(a)
     {
         return typeof a === c_undefined || a == null
     }
     function cloneArray(d)
     {
         var a = d.clone();
         for (var b = 0, e = a.length; b < e; b++) {
             var c = a[b];
             if (typeof c === "object") {
                 if (c instanceof Array) {
                     a[b] = cloneArray(c);
                 }
             }
         }
         return a
     }
     function clearWLContactProperties(b)
     {
         for (var a = 0, c = c_wlContactPromotedProps.length; a < c; a++) {
             delete b[c_wlContactPromotedProps[a]];
         }
     }
     function copyWLContactProperties(d, c)
     {
         var a, b = 0, e = c_wlContactPromotedProps.length;
         for (; b < e; b++) {
             a = c_wlContactPromotedProps[b];
             d[a] = c[a];
         }
     }
     function getContactRank(c, d)
     {
         var a;
         if (c === "ABCH") {
             a =- 3;
         }
         else if (c === "WL") {
             a =- 2;
         }
         else if (c === "WLP") {
             a =- 1;
         }
         else
         {
             a = 9999;
             for (var b = 0, e = d.length; b < e; b++) if (d[b][sService.id] === c) {
                 a = d[b][sService.rank] || b;
                 break
             }
         }
         return a
     }
     function updateIsFavoriteAndOrder(b, i)
     {
         var h = 0, a, c, d;
         if (b[spCategoryIds])
         {
             for (a = 0, c = b[spCategoryIds].length; a < c; a++) {
                 d = i.get(b[spCategoryIds][a]);
                 if (d && d[sCategory.isFavorite]) {
                     h = 1;
                     break
                 }
             }
             b[spIsFavorite] = h
         }
         var e = b[spContacts], f = e[0][scFavoriteOrder] || 0;
         for (a = 1, c = e.length; a < c; a++) {
             var g = e[a][scFavoriteOrder] || 0;
             if (f > g) {
                 f = g;
             }
         }
         b[spFavoriteOrder] = f
     }
     function clonePersonIfNeeded(a, b)
     {
         var c = a[spId];
         if (!b[c]) {
             populateContacts(a);
             b[c] = cloneArray(a);
         }
     }
     function getContactIndex(b, d)
     {
         var c =- 1, e = b[spContacts];
         for (var a = 0, f = e.length; a < f; a++) {
             if (getContactId(b, a) === d) {
                 c = a;
                 break 
             }
             return c;
         }
     }
     function deltaSyncPersonsFirstPass(j, l, k)
     {
         for (var c = 0, m = j.length; c < m; c++)
         {
             var g = j[c], e = g[spContacts];
             for (var d = 0, n = e.length; d < n; d++)
             {
                 var f = e[d], h = f[scId], a = l.get(h);
                 if (a && (f[scContactState] === sContactState.deleted || g[spId] !== a[spId]))
                 {
                     var i = a[spContacts], b = getContactIndex(a, h);
                     if (b !=- 1)
                     {
                         clonePersonIfNeeded(a, k);
                         if (i[b][scSourceId] === "WL") {
                             clearWLContactProperties(a);
                         }
                         i.splice(b, 1)
                     }
                 }
             }
         }
     }
     function deltaSyncPersonsSecondPass(k, o, m, q, l)
     {
         for (var g = 0, r = k.length; g < r; g++)
         {
             var a = k[g];
             if (!(a[spContacts][0][scContactState] === sContactState.deleted))
             {
                 var b = o.get(a[spId]);
                 if (b && b[spId] === a[spId])
                 {
                     var i = a[spContacts];
                     for (var h = 0, s = i.length; h < s; h++)
                     {
                         var c = i[h], j = getContactIndex(b, c[scId]), e = b[spContacts];
                         clonePersonIfNeeded(b, m);
                         if (j !=- 1) {
                             e[j] = c;
                         }
                         else
                         {
                             var n = getContactRank(c[scSourceId], l), d, f;
                             for (d = 0, f = e.length; d < f; d++) {
                                 var p = getContactRank(e[d][scSourceId], l);
                                 if (p > n) {
                                     e.splice(d, 0, c);
                                     break
                                 }
                             }
                             if (d === f) {
                                 e.push(c);
                             }
                         }
                         if (c[scSourceId] === "WL") {
                             copyWLContactProperties(b, a);
                         }
                     }
                     b[spCategoryIds] = a[spCategoryIds]
                 }
                 else {
                     q.push(a);
                 }
             }
         }
     }
     function deltaSyncPersons(j, n, p, b, o, q, m)
     {
         if (!j) {
             return null;
         }
         var e = {}, i = [], f = [], g = [], h = [];
         deltaSyncPersonsFirstPass(j, b, e);
         deltaSyncPersonsSecondPass(j, b, e, i, q);
         for (var k in e)
         {
             if (k) 
             {
                 var c = e[k];
                 if (c) 
                 {
                     var a = b.get(k);
                     b.remove([c]);
                     o.remove([c]);
                     if (a) 
                     {
                         var s = a[spContacts].length;
                         if (s === 0) {
                             g.push(new DeltaSyncChangedItem(c, null));
                             n.remove(a) 
                         }
                         else 
                         {
                             f.push(new DeltaSyncChangedItem(c, a));
                             dedupeContacts(a);
                             updateIsFavoriteAndOrder(a, m);
                             b.update([a]) 
                         }
                     }
                 }
             }
             for (var l = 0, r = i.length; l < r; l++) 
             {
                 var d = i[l];
                 dedupeContacts(d);
                 updateIsFavoriteAndOrder(d, m);
                 h.push(new DeltaSyncChangedItem(null, d));
                 n.push(d);
                 b.update([d]) 
             }
             if (h.length > 0 || f.length > 0 || g.length > 0) {
                 return {
                     source : p, args : new wLive.Contacts.DeltaSyncEventArgs(h, f, g) 
                 };
             }
             else {
                 return null;
             }
         }
     }
     function deltaSyncServices(b, c, g, f)
     {
         if (!b) {
             return null;
         }
         var e = new LazyHash(b, [0]);
         for (var d = 0, h = c.length; d < h; d++)
         {
             var a = e.get(c[d][0]);
             if (a == null) {
                 a = [];
                 a[s.service.id] = c[d][0];
                 a[s.service.isDeleted] = 1;
                 b.push(a)
             }
         }
         return deltaSyncArray(b, c, g, f, s.service.isDeleted, 1)
     }
     function deltaSyncArray(d, b, n, e, l, m)
     {
         if (!d) {
             return null;
         }
         if (typeof d !== c_undefined)
         {
             var h = [], i = [], j = [];
             for (var k = 0, o = d.length; k < o; k++)
             {
                 var a = d[k], c =- 1;
                 for (var g = 0, p = b.length; g < p; g++) if (b[g][spId] === a[spId]) {
                     c = g;
                     break
                 }
                 if (c !==- 1)
                 {
                     var f = b[c];
                     if (a[l] === m) {
                         i.push(new DeltaSyncChangedItem(f, null));
                         e.remove([f]);
                         b.splice(c, 1)
                     }
                     else {
                         h.push(new DeltaSyncChangedItem(f, a));
                         e.remove([f]);
                         e.update([a]);
                         b[c] = a;
                     }
                 }
                 else if (a[l] !== m) {
                     j.push(new DeltaSyncChangedItem(null, a));
                     e.update([a]);
                     b.push(a)
                 }
             }
             if (j.length > 0 || h.length > 0 || i.length > 0) {
                 return {
                     source : n, args : new wLive.Contacts.DeltaSyncEventArgs(j, h, i) 
                 };
             }
             return null;
         }
     }
     wLive.Contacts.MWTLocalStorageWrapper = MWTLocalStorageWrapper;
     function MWTLocalStorageWrapper()
     {
         var c = this, a = null, b, h = 0, g, f = [];
         c.registerReadyCallback = function (a)
         {
             if (g) {
                 a();
             }
             else {
                 f.push(a);
             }
         };
         function i()
         {
             b = new Microsoft.Live.Core.LocalStorageProxy("wlx_contacts");
             b.add_initialized(d)
         }
         function d(a)
         {
             b.remove_initialized(d);
             if (a.get_status() == Microsoft.Live.Core.LocalStorageStatus.initialized) {
                 e();
             }
         }
         function e()
         {
             if (b.status == 1) {
                 a = b;
                 g = 1;
                 processCallbacks(f)
             }
             else if (b.status == 0) {
                 if (h++< 10) {
                     setTimeout(e, 1e3);
                 }
             }
         }
         c.get = function (d, c)
         {
             var b = a ? a.get_item(d) : null;
             if (b == null) {
                 b = c;
             }
             return b;
         };
         c.set = function (b, c)
         {
             if (a) {
                 a.set_item(b, c);
             }
         };
         c.remove = function (b)
         {
             if (a) {
                 a.set_item(b, null);
             }
         };
         $Do.when("wlximlocalstoreready", 0, i)
     }
     wLive.Contacts.CrossDomainProxy = CrossDomainProxy;
     function CrossDomainProxy(h)
     {
         var a = this, e = null, d = null, f, c = [], b;
         function i()
         {
             b = location.protocol + "//" + h + "/xmlProxy.htm?vn=" + w.$Version.encodeURIComponent() + "&domain=" + ($Config.d || $Config.domain).encodeURIComponent();
             $Network.fetchXML(b, g, "GET", null, null)
         }
         function g(j)
         {
             var a;
             if (j.status == 200)
             {
                 var i = w.document.getElementsByTagName("iframe");
                 for (var h = 0, k = i.length; h < k; h++)
                 {
                     try 
                     {
                         var g = i[h];
                         if (g.contentDocument.location.href == b) {
                             a = g.contentWindow || g.contentDocument.parentWindow;
                             break 
                         }
                     }
                     catch (l) {}
                 }
             }
             if (!a) {
                 a = w;
             }
             e = a.localStorage;
             d = a.sessionStorage;
             f = 1;
             processCallbacks(c)
         }
         a.registerReadyCallback = function (a)
         {
             if (f) {
                 a();
             }
             else {
                 c.push(a);
             }
         };
         a.getLocalStorage = function ()
         {
             return e;
         };
         a.getSessionStorage = function ()
         {
             return d;
         };
         i()
     }
     wLive.Contacts.DOMLocalStorageWrapper = DOMLocalStorageWrapper;
     function DOMLocalStorageWrapper(c, g)
     {
         var b = this, a = null, e, d = [];
         function f()
         {
             a = g ? c.getLocalStorage() : c.getSessionStorage();
             e = 1;
             processCallbacks(d)
         }
         b.registerReadyCallback = function (a)
         {
             if (e) {
                 a();
             }
             else {
                 d.push(a);
             }
         };
         b.get = function (d, c)
         {
             var b = a ? a.getItem(d) : null;
             if (b == null) {
                 b = c;
             }
             return b;
         };
         b.set = function (b, c)
         {
             if (a) {
                 a.setItem(b, c);
             }
         };
         b.remove = function (b)
         {
             if (a) {
                 a.removeItem(b);
             }
         };
         c.registerReadyCallback(f)
     }
     wLive.Contacts.LocalStorageProxy = LocalStorageProxy;
     function LocalStorageProxy(d, f)
     {
         var c = this, b = [], a = null, e, g = [];
         function h()
         {
             if (f) {
                 f(c, d);
             }
             a = d;
             for (var h in b) {
                 var i = b[h];
                 if (typeof i === "string") {
                     a.set(h, b[h]);
                 }
             }
             e = 1;
             processCallbacks(g)
         }
         c.clearTempStorage = function ()
         {
             b = [];
         };
         c.registerReadyCallback = function (a)
         {
             if (e) {
                 a();
             }
             else {
                 g.push(a);
             }
         };
         c.remove = function (c)
         {
             if (a) {
                 a.remove(c);
             }
             else {
                 delete b[c];
             }
         };
         c.get = function (e, d)
         {
             var c;
             if (a) {
                 c = a.get(e, d);
             }
             else {
                 c = b[e];
                 if (typeof c === c_undefined || c == null) {
                     c = d;
                 }
             }
             return c;
         };
         c.set = function (c, d)
         {
             if (a) {
                 a.set(c, d);
             }
             else {
                 b[c] = d;
             }
         };
         if (d) {
             d.registerReadyCallback(h);
         }
         else {
             e = 1;
         }
     }
     function processCallbacks(a)
     {
         for (var b = 0, c = a.length; b < c; b++) {
             if (a[b]) {
                 a[b]();
             }
             a.splice(0, a.length);
         }
     }
     function getContactId(a, b)
     {
         return a[spContacts][b][scId] || a[spId]
     }
     function storeIncrementalResponse(b, c, h, i)
     {
         var f = parseInt(b.get(c + c_startIndexKeySuffix, "0")), e = parseInt(b.get(c + c_endIndexKeySuffix, 
         "-1")), d = [], a, g;
         for (var j in h)
         {
             if (typeof j === "string") {
                 d.push(j);
             }
             g = d.length;
             if (i && e - f + 1 >= i) {
                 for (a = 0; a < g; a++) {
                     b.set(c + d[a] + f, null);
                 }
                 b.set(c + c_startIndexKeySuffix, ++f) 
             }
             ++e;
             b.set(c + c_endIndexKeySuffix, e);
             for (a = 0; a < g; a++) {
                 b.set(c + d[a] + e, h[d[a]]);
             }
         }
     }
     function clearIncrementalResponse(a, b, f, c)
     {
         if (a)
         {
             var i = c || parseInt(a.get(b + c_startIndexKeySuffix, "0")), h = parseInt(a.get(b + c_endIndexKeySuffix, 
             "-1")), g = f.length;
             for (var d = i; d <= h; d++) {
                 for (var e = 0; e < g; e++) {
                     a.remove(b + f[e] + d);
                 }
             }
             if (c) {
                 a.set(b + c_endIndexKeySuffix, c - 1);
             }
             else {
                 a.remove(b + c_startIndexKeySuffix);
                 a.remove(b + c_endIndexKeySuffix)
             }
         }
     }
     function loadIncrementalResponse(a, b, c, g)
     {
         var h = parseInt(a.get(b + c_startIndexKeySuffix, "0")), i = parseInt(a.get(b + c_endIndexKeySuffix, 
         "-1")), j = c.length;
         for (var d = h; d <= i; d++)
         {
             var f = {};
             for (var e = 0; e < j; e++) {
                 f[c[e]] = a.get(b + c[e] + d, null);
             }
             if (!g(f)) {
                 clearIncrementalResponse(a, b, c, d);
                 break
             }
         }
     }
     function stripJsonPrefix(a)
     {
         return a.substring(6, a.length)
     }
     function parseJSON(str)
     {
         var result;
         try {
             result = eval(str)
         }
         catch (a) {
             result = [, [a.name, "Syntax error: " + a.message]]
         }
         return result
     }
     function resetArray(a, b)
     {
         a.splice(0, a.length);
         a.addRange(b || [])
     }
     function findItemInArray(a, d, e)
     {
         if (a)
         {
             for (var b = 0, f = a.length; b < f; b++) {
                 var c = a[b][d];
                 if (typeof c !== c_undefined && c === e) {
                     return a[b] ;
                 }
             }
             return null;
         }
     }
     function LazyHash(j, h, i)
     {
         var c = this, b = false, a = [], f = i || false;
         c.get = function (d)
         {
             if (!b) {
                 b = true;
                 c.update(j)
             }
             return a[d] || null;
         };
         c.clear = function ()
         {
             b = false;
             a = [];
         };
         c.update = function (a)
         {
             if (b) {
                 g(a, false);
             }
         };
         c.remove = function (a)
         {
             if (b) {
                 g(a, true);
             }
         };
         function g(f, i)
         {
             i = i || false;
             var a, b, c, l, j, q = f.length, n = h.length, o, p, m = [], g = [];
             for (c = 0; c < n; c++) {
                 a = h[c];
                 if (Object.isArray(a)) {
                     g.push(a);
                 }
                 else {
                     m.push(a);
                 }
             }
             n = m.length;
             o = g.length;
             for (b = 0; b < q; b++)
             {
                 for (c = 0; c < n; c++) {
                     a = f[b][m[c]];
                     if (i) {
                         e(a, f[b]);
                     }
                     else {
                         d(a, f[b]);
                     }
                 }
                 for (k = 0; k < o; k++)
                 {
                     j = f[b][g[k][0]];
                     if (j) for (l = 0, p = j.length;
                     l < p;
                     l++) {
                         a = j[l][g[k][1]];
                         if (i) {
                             e(a, f[b]);
                         }
                         else {
                             d(a, f[b]);
                         }
                     }
                 }
             }
         }
         function e(b, c)
         {
             if (b && a[b]) {
                 if (f) {
                     a[b].remove(c);
                 }
                 else {
                     delete a[b];
                 }
             }
         }
         function d(b, d)
         {
             var c;
             if (typeof b !== c_undefined) {
                 if (f) {
                     c = a[b];
                     if (typeof c === c_undefined) {
                         c = a[b] = [];
                     }
                     c.push(d) 
                 }
                 else {
                     a[b] = d;
                 }
             }
         }
     }
     function compareArrays(b, c)
     {
         var a = false;
         if (b && c && b.length === c.length) {
             a = true;
             b.forEach(function (d, b)
             {
                 if (c[b] != d) {
                     a = false;
                 }
             })
         }
         return a
     }
     function populateContacts(a)
     {
         var l = a[spContacts], v = a[spId];
         for (var j = 0, q = c_dedupeMap.length; j < q; j++)
         {
             var d = c_dedupeMap[j], o = d.mask, c = d.personFields, g = d.contactFields, i = d.arrayIndex, 
             n = d.isArray, m = false;
             for (var k = 0, r = l.length; k < r; k++)
             {
                 var b = l[k];
                 if (b[scPromotionBitmap] & o)
                 {
                     m = true;
                     if (n)
                     {
                         for (var e = 0, s = c.length; e < s; e++) {
                             var p = a[c[e]];
                             if (p) {
                                 if (!b[g[e]]) {
                                     b[g[e]] = [];
                                 }
                                 b[g[e]][i] = p[i];
                             }
                         }
                     }
                     else {
                         for (var h = 0, t = c.length; h < t; h++) {
                             b[g[h]] = a[c[h]];
                         }
                     }
                     b[scPromotionBitmap] = b[scPromotionBitmap] & ~o;
                 }
             }
             if (m) {
                 for (var f = 0, u = d.personFields.length; f < u; f++) if (n) {
                     if (a[c[f]]) {
                         a[c[f]][i] = null ;
                     }
                 }
             }
             else {
                 a[c[f]] = null;
             }
         }
         a[spId] = v
     }
     function copyValues(i, h, d, f, e)
     {
         var c = true;
         for (var b = 0, g = d.length; b < g; b++) {
             var a = i[d[b]];
             if (f && a) {
                 a = a[e];
             }
             if (a) {
                 h[b] = a;
                 c = false;
             }
         }
         return c
     }
     function clearValues(b, e, f, d)
     {
         for (var c = 0, g = e.length; c < g; c++) {
             var a = e[c];
             if (b[a]) {
                 if (f) {
                     if (d < b[a].length) {
                         b[a][d] = null ;
                     }
                 }
                 else {
                     b[a] = null;
                 }
             }
         }
     }
     function areEqual(k, j, c, h, g, f)
     {
         var d = true;
         for (var b = 0, i = c.length; b < i; b++)
         {
             var l = c[b], a = k[c[b]];
             if (h && a) {
                 a = a[g];
             }
             var e = j[b];
             if (f) {
                 if (f(a, e)) {
                     d = true;
                     break
                 }
             }
             else if (!(typeof a === c_undefined && typeof e === c_undefined || a === e)) {
                 d = false;
                 break
             }
         }
         return d
     }
     function dedupeContacts(a)
     {
         var u = a[spId];
         for (var j = 0, s = spFieldsCount; j < s; j++) if (c_dedupableFieldsHash[j]) delete a[j]; a[spId] = u; for (var l = 0, 
         p = c_dedupeMap.length;
         l < p;
         l++)
         {
             var b = c_dedupeMap[l], t = b.mask, n = a[spContacts], d = [], k = b.contactFields, c = b.personFields, 
             h = b.isArray, g = b.arrayIndex, o = b.comparer, i = copyValues(a, d, c, h, g);
             for (var m = 0, q = n.length; m < q; m++)
             {
                 var f = n[m];
                 if (i) {
                     i = copyValues(f, d, k, h, g);
                 }
                 if (!i && areEqual(f, d, k, h, g, o)) {
                     f[scPromotionBitmap] = (f[scPromotionBitmap] || 0) | t;
                     clearValues(f, k, h, g)
                 }
             }
             if (b.isArray && !a[c[0]]) {
                 a[c[0]] = [];
             }
             if (!i)
             {
                 for (var e = 0, r = Math.min(c.length, d.length); e < r; e++) {
                     if (b.isArray) {
                         a[c[e]][b.arrayIndex] = d[e];
                     };
                 }
             }
             else {
                 a[c[e]] = d[e];
             }
         }
     }
     preInit()
 })();
 window.$ic = 
 {
     eventutil : {}, dom : {}, data : {}, constants : 
     {
         ControlDataIndex : 
         {
             cid : "0", showmenu : "1", menudefault : "2", name : "3", contactid : "4", deccid : "5", address : "6", 
             membername : "7", membernamescope : "8", additionalchickletdata : "9", thirdpartyname : "10", 
             attachmenutobody : "11", placedintable : "12", menucustom : "13", tileitemid : "14", nameitemid : "15", 
             psmitemid : "16", badgeitemid : "17", actiontypeurloverride : "18", childicid : "19", extradata : "20"
         },
         MenuIndex : {
             text : "0", url : "1", itemid : "2", callback : "3", target : "4"
         },
         InlineMenuIndex : {
             rm : "0", psm : "1", ut : "2"
         },
         RendeModes : {
             utnmpsm : "0", utnmem : "1", nmem : "2", em : "3"
         }
     },
     ItemType : {
         Tile : "Tile", Name : "Name", Message : "Message", MenuCustom : "MenuCustom"
     },
     scoped_eval : function (p_args)
     {
         eval(p_args)
     }
 };
 (function ()
 {
     var d = window, e = d.$ic, Z = d.$WebWatson, jb = d.$Utility, lb = d.Debug, ib = d.$IS, cb = d.$Beacon, 
     o, C, J, P = "icTm", U = 4, G, n, w, c, i, q = e.constants, h, I, bb = "&nbsp;-&nbsp;", T = 21, L = $B.IE, 
     gb = $B.IE_M6, mb = $B.ltr, kb = $B.IE_M7, db = $Config, V = 625, m = q.MenuIndex, a = q.ControlDataIndex, 
     u, b, x, Q, s, r = "menu_ul", z = "usertile", O = z + "container", p = "frame_clip", R = "title", 
     S = "alt", B = "click", v = "none", K = "href", M = "id", y = "undefined", Y = "c_ic_menu", N = "c_ic_menu_separator", 
     k = "style", l = "setAttribute", A = "display", f = "replace", F = "innerHTML", t = "parentNode", 
     E = "appendChild", j = "length", D = function (a)
     {
         return d.document.createElement(a);
     },
     g = function (a)
     {
         return a.join("");
     };
     function hb()
     {
         n = e.eventutil = new W;
         h = n.addEvent;
         I = n.removeEvent;
         w = e.dom = new X;
         c = w.$;
         i = e.data = new eb;
         u = i.ControlData;
         b = u.getItem;
         x = u.getObject;
         Q = i.CommonData;
         s = Q.getItem;
         G = e.menu = new fb;
         o = e.ic = new ab;
         var a;
         if (!window.ic_dinit) {
             e.ic.init();
         }
         $Do.register("$ic.init", e.ic.init)
     }
     function W()
     {
         var b = this;
         b.stopEventAction = function (a)
         {
             L ? (event.returnValue = false) : a.preventDefault();
         };
         b.eventTarget = function (a)
         {
             return L && window.event ? window.event.srcElement : a.target;
         };
         var a = {};
         b.dispose = function ()
         {
             for (var c in a) {
                 b.removeAllICEvents(c, 1);
             }
             a = null;
             b = null;
         };
         var c = function (a)
         {
             return !a || a == "" ? "icglobalevent" : a;
         };
         b.addEvent = function (e, d, f, b)
         {
             b = c(b);
             if (!a[b]) {
                 a[b] = [];
             }
             jQuery(e).bind(d, f);
             a[b].push({
                 el : e, e : d, f : f
             })
         };
         b.removeEvent = function (h, g, i, d)
         {
             d = c(d);
             var f = a[d], e = f[j], b;
             while (e--)
             {
                 b = f[e];
                 if (b.el == h && b.e == g && b.f == i) {
                     jQuery(b.el).unbind(b.e, b.f);
                     a[d].splice(e, 1);
                     break
                 }
             }
         };
         b.removeAllICEvents = function (b, g)
         {
             b = c(b);
             var e = a[b], f = e[j], d;
             while (f--) {
                 d = e[f];
                 jQuery(d.el).unbind(d.e, d.f)
             }
             if (!g) {
                 delete a[b];
             }
             else {
                 a[b] = null;
             }
         }
     }
     function X()
     {
         var a = {}, b = this;
         b.dispose = function ()
         {
             a = null;
             b = null;
         };
         var c = function (a)
         {
             return a && a.indexOf("_") > 0 ? a.split("_")[0] : "";
         };
         b.getIcIdFromAnyParent = function (d)
         {
             var a = n.eventTarget(d), b = c(a.id);
             while (b == "" && a[t]) {
                 a = a[t];
                 b = c(a.id)
             }
             return b;
         };
         b.$ = function (f, e)
         {
             var b = g([f, "_", e]), c = a[b];
             if (!c) {
                 c = a[b] = d._ge(b);
             }
             return c;
         };
         b.clearByPrefix = function (c)
         {
             for (var b in a) {
                 if (b.indexOf(c) == 0) {
                     delete a[b];
                 }
             }
         }
     }
     var H = function (a, b)
     {
         if (a) {
             a.splice(a.indexOf(b), 1);
         }
     };
     function eb()
     {
         var a = this;
         a.dispose = function ()
         {
             a.Itemid_Element_Map.dispose();
             a.Cid_Icid_Map.dispose();
             a.ControlData.dispose();
             a = null;
         };
         a.Itemid_Element_Map = new b;
         function b()
         {
             var a = {}, b = this;
             b.add = function (d, c, f)
             {
                 if (!d || !c || !f) {
                     return;
                 }
                 var b = a[d];
                 if (!b) {
                     b = a[d] = {};
                 }
                 var e = b[c];
                 if (!e) {
                     e = b[c] = [];
                 }
                 e.push(f)
             };
             b.remove = function (d, b, c)
             {
                 if (!d || !b || !c) {
                     return;
                 }
                 var e = a[d];
                 if (e) {
                     H(e[b], c);
                 }
             };
             b.getItem = function (d, c)
             {
                 var b = a[d];
                 if (b && b[c]) {
                     return b[c];
                 }
                 else {
                     return [];
                 }
             };
             b.dispose = function ()
             {
                 a = null;
                 b = null;
             }
         }
         a.Cid_Icid_Map = new c;
         function c()
         {
             var a = {}, b = this;
             b.add = function (c, d)
             {
                 var b = a[c];
                 if (!b) {
                     b = a[c] = [];
                 }
                 b.push(d)
             };
             b.remove = function (c, b)
             {
                 var d = a[c];
                 H(d, b)
             };
             b.getItem = function (b)
             {
                 return a[b] || [];
             };
             b.dispose = function ()
             {
                 a = null;
                 b = null;
             }
         }
         a.CommonData = new f;
         function f()
         {
             this.getItem = function (b)
             {
                 var a = d.ic_common_data;
                 if (a && a[b]) {
                     return a[b];
                 }
                 return "";
             }
         }
         a.ControlData = new e;
         function e()
         {
             var b = {}, a = this;
             a.exists = function ()
             {
                 return d.ic_control_data;
             };
             a.getObject = function ()
             {
                 return b;
             };
             a.removeObject = function (c)
             {
                 if (b[c]) {
                     delete b[c];
                 }
                 if (a.exists() && d.ic_control_data && d.ic_control_data[c]) {
                     delete d.ic_control_data[c];
                 }
             };
             a.getNewObjects = function ()
             {
                 return a.exists() ? d.ic_control_data : {}
             };
             a.getItem = function (c, e)
             {
                 var a = b[c];
                 if (!a && d.ic_control_data) {
                     a = d.ic_control_data[c];
                     d.ic_control_data[c] = null;
                     if (a) {
                         b[c] = a;
                     }
                 }
                 return a && a[e] ? a[e] : "";
             };
             a.dispose = function ()
             {
                 b = null;
                 a = null;
             }
         }
     }
     function ab()
     {
         var m = this, R = 0, S = {}, D = {}, E = {}, I = {}, N = {}, M = {};
         m.init = function mb()
         {
             if (u.exists())
             {
                 if (m.load) {
                     return;
                 }
                 m.load = "started";
                 m.bind();
                 m.load = "finished";
                 $Do.when("wlxim", 0, Y);
                 $Do.register("$ic", jb)
             }
         };
         function jb(a)
         {
             try {
                 a()
             }
             catch (b) {
                 Z.submitFromException(b)
             }
         }
         function Y()
         {
             var a = $WLXIM.outerWindow;
             if (a != window && !a.ic_common_data)
             {
                 a.ic_common_data = {};
                 ic_common_data.savedTemplates = i.savedTemplates;
                 jQuery.extend(true, a.ic_common_data, ic_common_data);
                 a.ic_menu_data = {};
                 jQuery.extend(true, a.ic_menu_data, ic_menu_data);
                 a.ic_control_data = {};
                 var c = x();
                 for (var b in ic_template_data) {
                     a.ic_control_data[b] = [];
                     jQuery.extend(true, a.ic_control_data[b], c[b])
                 }
                 a.ic_template_data = {};
                 jQuery.extend(true, a.ic_template_data, ic_template_data);
                 window.$ssl.copyOutConfig(a);
                 a.$Do.when("$ic.init")
             }
         }
         m.reinit = function ()
         {
             if (u.exists()) {
                 m.bind();
             }
         };
         m.addMenuBindingRef = function (a, b)
         {
             if (a) {
                 N[a] = b;
             }
         };
         m.updateMenuBindingRef = function (b)
         {
             var a = N[b];
             if (a) {
                 a.update();
             }
         };
         m.getICNamespaceCount = function (a)
         {
             return I[a] || 0;
         };
         m.removeICsFromNamespace = function (a)
         {
             if (R || !a) {
                 return;
             }
             var b = E[a];
             if (b) {
                 for (var c = 0; c < b[j]; c++) {
                     m.removeIC(b[c], 1);
                 }
                 delete E[a]
             }
             w.clearByPrefix(a);
             I[a] = 0;
         };
         m.removeIC = function (d, o)
         {
             if (R || !d) {
                 return;
             }
             var k, l, h = e.ItemType, f = i.Itemid_Element_Map.remove;
             if (x()[d])
             {
                 m.removeIC(b(d, a.childicid));
                 if (b(d, a.showmenu) == "1")
                 {
                     n.removeAllICEvents(d, 0);
                     G.cleanUpMenu(d);
                     if (c(d, p))
                     {
                         l = b(d, a.menucustom);
                         for (k = 0; k < l[j]; ++k) {
                             f(l[k][q.MenuIndex.itemid], h.MenuCustom, g([d, "_", k]));
                         }
                     }
                 }
                 else
                 {
                     f(b(d, a.tileitemid), h.Tile, c(d, p));
                     if (typeof uxp_p != y) {
                         f(b(d, a.tileitemid), h.Tile, c(d, z));
                     }
                 }
                 i.Cid_Icid_Map.remove(b(d, a.cid), d);
                 m.unregister(b(d, a.membername), d);
                 f(b(d, a.nameitemid), h.Name, c(d, "name"));
                 f(b(d, a.psmitemid), h.Message, c(d, "psm"))
             }
             u.removeObject(d);
             if (N[d]) {
                 delete N[d];
             }
             if (!o) {
                 H(E[W(d)], d);
                 w.clearByPrefix(d + "_")
             }
         };
         var V = new RegExp("cid-([a-zA-z0-9]+)", "g"), gb = m.getHexCidFromContact = function (b)
         {
             var a = V.exec(b.get_profileUrl());
             V.lastIndex = 0;
             if (a && a[j] > 1) {
                 return a[1];
             }
             else {
                 return null;
             }
         };
         function db(a)
         {
             return L && (a == null || a == "") ? '""' : a
         }
         function X(f, e)
         {
             var b, a, d = f.get_addresses();
             for (var c = 0, g = d.get_count(); c < g; c++)
             {
                 b = d.get_item(c);
                 a = b.get_network().get_id();
                 if (e && a == "WL" || !e && a != "WL" && a != "OCS" && a != "YH" && a != "SMS") {
                     return b;
                 }
             }
             return 0
         }
         m.createICsFromCids = function (i, j, h, f)
         {
             _wlxcontacts = d["$WLXContacts"];
             var c = {
                 cidsToIds : {}, templateId : i, callBack : h
             },
             a = 0, b = [];
             b.addRange(j);
             var n = b.length;
             for (a = 0, len = b.length; a < len; a++) {
                 c.cidsToIds[b[a][0]] = b[a][1];
             }
             if (C && C.hasContacts())
             {
                 var k = C.user.get_contacts();
                 for (a = 0; a < b.length; a++)
                 {
                     var g = k.findByCid(b[a][0]);
                     if (g)
                     {
                         var l = m.createICFromTemplate(c.templateId, g, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                         0, 0, f ? 1 : 0, 1);
                         c.callBack(b[a][1], l);
                         b.remove(b[a]);
                         a--
                     }
                 }
             }
             var e = [];
             for (a = 0; a < b.length; a++) {
                 e.push(b[a][0]);
             }
             if (0 < e.length)
             {
                 $Do.when("wlxcontacts", 0, function () 
                 {
                     _wlxcontacts = d["$WLXContacts"];
                     _wlxcontacts.queueProfileRequests(e);
                     _wlxcontacts.loadQueuedProfiles(function (b, a) 
                     {
                         cb(b, a, c, f) 
                     }, ab) 
                 });
             }
         };
         function cb(d, f, c, g)
         {
             var a, e;
             for (a = 0, e = d.length; a < e; a++)
             {
                 var i = _wlxcontacts.getProfile(d[a]), j = c.cidsToIds[d[a]], b = eb(i), h = m.createICFromTemplate(c.templateId, 
                 0, 0, 0, 0, b["hexCid"], b["decCid"], b["name"], b["email"], b["memberName"], b["userTileUrl"], 
                 b["psm"], 0, 0, g ? 1 : 0, 0);
                 c.callBack(c.cidsToIds[d[a]], h)
             }
             for (a = 0, e = f.length; a < e; a++) {
                 c.callBack(c.cidsToIds[f[a]], null);
             }
         }
         function eb(a)
         {
             var c = {}, b = window.wLive.Contacts.WLXContactsSchema.person, g = window.wLive.Contacts.WLXContactsSchema.email;
             c["hexCid"] = s(a[b.hexCid]) ? null : a[b.hexCid];
             c["decCid"] = s(a[b.cid]) ? null : a[b.cid];
             var d = _wlxcontacts.isLastNameFirst() ? a[b.lastName] : a[b.firstName], e = _wlxcontacts.isLastNameFirst() ? a[b.firstName] : a[b.lastName];
             if (!s(d) || !s(e)) {
                 d = d || "";
                 if (d !== "" && !s(e)) {
                     d += " ";
                 }
                 c["name"] = d + (e || "")
             }
             else {
                 c["name"] = null;
             }
             var f = a[b.emails] || [];
             c["email"] = s(f[g.personal]) ? null : a[f[g.personal]];
             c["memberName"] = null == c["decCid"] ? null : "11:" + c["decCid"];
             c["userTileUrl"] = s(a[b.userTileMedium]) ? null : a[b.userTileMedium];
             return c
         }
         function s(a)
         {
             return a == "undefined" ? true : false
         }
         function ab() {}
         m.createICFromTemplate = function (m, c, n, p, y, D, B, h, r, u, t, e, K, Q, G, O)
         {
             var N = "get_currentAddress", w = "get_presence", H, I, v, q, z, g, s;
             if (c)
             {
                 z = X(c, 1);
                 g = X(c, 0);
                 D = D || gb(c);
                 B = B || c.get_cid();
                 if (g) {
                     q = g.get_linkedContact();
                 }
                 h = h || $WLXIM.getDisplayName(c);
                 v = c[N]();
                 if (c.get_emailAddress) {
                     H = c.get_emailAddress();
                 }
                 t = t || c[w]().get_displayPictureUrl();
                 if (!e) {
                     e = I = c[w]().get_personalMessage();
                 }
                 if (!u) if (n) u = n.get_id();
                 else if (v) u = v.get_id();
                 r = r || H;
                 if (!p && n) {
                     var L = n.get_network();
                     if (L) {
                         p = "n:" + L.get_id();
                     }
                 }
             }
             p = p || "a";
             y = y || m;
             m = P + m;
             var l = x()[m];
             if (l)
             {
                 var b = [];
                 d.ic_control_data = d.ic_control_data || {};
                 for (var k = 0, U = Math.max(l[j], T); k < U; k++)
                 {
                     switch (k + "") 
                     {
                         case a.menudefault:
                             var S = l[k];
                             if (z) 
                             {
                                 var o = [];
                                 if (!(c && !c.get_isContact())) 
                                 {
                                     if (n) {
                                         o.push(n.get_type() == C.MLM.IMAddressType.telephone ? "si" : "ss");
                                     }
                                     o = o.concat(S);
                                     if (g) {
                                         var M = o.indexOf("se");
                                         if (M > 0) {
                                             o.insert(M + 1, "sm3") ;
                                         }
                                     }
                                 }
                                 b.push(o) 
                             }
                             else if (g) 
                             {
                                 var E = ["si", "se", "sm3", "ph3", "pr3"];
                                 if (c && c.get_isContact()) {
                                     E.push("af");
                                 }
                                 b.push(E) 
                             }
                             else {
                                 b.push(["se", "vd"]);
                             }
                             break;
                         case a.contactid:
                             b.push(c ? c.get_id() + "" : l[k]);
                             break;
                         case a.cid:
                             b.push(D);
                             break;
                         case a.name:
                             b.push(h);
                             break;
                         case a.deccid:
                             b.push(B);
                             break;
                         case a.additionalchickletdata:
                             b.push([K ? K :- 1, e, t ? window.$ssl.ensureSSLImageUrl(t + "") : 0, Q]);
                             break;
                         case a.address:
                             b.push(r);
                             break;
                         case a.membername:
                             b.push(u);
                             break;
                         case a.thirdpartyname:
                             if (g) {
                                 b.push(q.get_network().get_name());
                             }
                             else {
                                 b.push(l[k]);
                             }
                             break;
                         case a.attachmenutobody:
                             b.push(G ? G : l[k]);
                             break;
                         case a.membernamescope:
                             b.push(p);
                             break;
                         case a.actiontypeurloverride:
                             if (g)
                             {
                                 b.push({
                                     pr3 : q.get_profileUrl() + "", ph3 : q.get_photosUrl() + "", sm3 : q.get_sendMessageUrl() + "" 
                                 });
                             }
                             else {
                                 b.push(l[k]);
                             }
                             break;
                         case a.extradata:
                             b.push({
                                 ltnu : O 
                             });
                             break;
                         default:
                             b.push(l[k]) 
                     }
                 }
                 var R = window.ic_template_data[m]++, A = y + m + R;
                 d.ic_control_data[A] = b;
                 if (e) if (!$B.Mobile && J && I == e) if (c) e = c[w]().createPersonalMessageElement()[F];
                 else e = J.Messenger.MessengerUtility.emoticonEncode(e)[F];
                 else e = e.encodeHtmlAttribute();
                 if (h) {
                     h = h.encodeHtmlAttribute();
                 }
                 if (r) {
                     s = r.encodeHtmlAttribute();
                 }
                 else if (g && !z) {
                     s = h + " ({0})".format((g.get_network().get_name() + "").encodeHtmlAttribute());
                 }
                 else {
                     s = h;
                 }
                 var V = i.savedTemplates[m][f](new RegExp(m, "g"), A).format(h, e ? bb + e : "", e ? e : "", 
                 db(s));
                 lb();
                 return {
                     html : V, id : A
                 }
             }
             return null;
         };
         var Q, lb = function ()
         {
             if (Q) {
                 clearTimeout(Q);
             }
             Q = setTimeout(m.reinit, 10);
         };
         m.getICTileSize = function (b)
         {
             var a = c(b, "usertilecontainer") && c(b, "usertilecontainer").className.split(" ");
             if (a && a[1]) {
                 return a[1].replace("c_ic_img_", "");
             }
             else {
                 return "";
             }
         };
         m.displayICAsFav = function (a)
         {
             var b = c(a, "menu_af"), d = c(a, "fstarp");
             if (b) {
                 b[k][A] = v;
                 G.HideSeparatorIfLastVis(b);
                 c(a, r).binding.update()
             }
             if (d)
             {
                 $css.remove(d, "c_ic_fstarp_hide");
                 var e = c(a, "name");
                 if (e) {
                     $css.add(e.parentNode, "c_ic_name_fstar_" + m.getICTileSize(a));
                 }
             }
         };
         m.dispose = function ()
         {
             jQuery(d).unbind("unload", m.dispose);
             G.dispose();
             n.dispose();
             i.dispose();
             if (e.presence) {
                 e.presence.dispose();
             }
             w.dispose();
             I = E = N = S = D = M = m = _focusShowMenuTimeout = _onhoverShowMenu_ic_id = null;
             R = 1;
         };
         jQuery(d).bind("unload", m.dispose);
         function kb()
         {
             if (!i.savedTemplates) if (ic_common_data.savedTemplates) i.savedTemplates = ic_common_data.savedTemplates;
             else
             {
                 var a = {};
                 for (var c in ic_template_data) {
                     var b = d._ge(c + "_template");
                     ib.Init(b);
                     a[c] = b[F]
                 }
                 i.savedTemplates = a;
             }
         }
         m.set_wlxim = function ()
         {
             C = $WLXIM
         };
         m.set_wlximML = function ()
         {
             J = C.ML;
         };
         m.get_membername_id_map = function ()
         {
             return S;
         };
         m.get_membername_iclist_map = function ()
         {
             return D;
         };
         function fb(a)
         {
             ic_onTL(n.eventTarget(a))
         }
         function hb(a)
         {
             ic_onTE(n.eventTarget(a))
         }
         m.getMemberFavoriteList = function ()
         {
             return M;
         };
         m.removeMemberFromFavoriteList = function (a)
         {
             if (M[a]) {
                 delete M[a];
             }
         };
         m.register = function nb(f, d)
         {
             if (!d) {
                 return;
             }
             if (f) {
                 if (!D[f]) {
                     D[f] = [];
                 }
                 D[f].push(d);
                 if (M[f]) {
                     m.displayICAsFav(d);
                 }
             }
             var g = c(d, z);
             if (g && !g.src)
             {
                 h(g, "load", fb, d);
                 h(g, "error", hb, d);
                 var i = b(d, a.additionalchickletdata), j = q.InlineMenuIndex;
                 if (i && i[j.ut]) {
                     g.src = i[j.ut];
                     if (i[j.rm] == q.RendeModes.nmem) {
                         c(d, O)[t][k][A] = v;
                     }
                 }
                 else {
                     g.src = g.getAttribute("errsrc") || $icerrsrc;
                 }
                 o.updateMenuBindingRef(d)
             }
             if (e.presence && f) {
                 e.presence.updateStatusFromRegister(f, d);
             }
         };
         m.unregister = function (a, b)
         {
             if (!a || !b) {
                 return;
             }
             H(D[a], b)
         };
         function W(a)
         {
             return a.substring(0, a.indexOf("ic"))
         }
         m.bind = function ()
         {
             var f, k, w, r, v, o = e.ItemType, n = i.Itemid_Element_Map.add;
             kb();
             for (f in u.getNewObjects())
             {
                 var s = W(f), t = E[s];
                 if (!t) {
                     t = E[s] = [];
                     I[s] = 0
                 }
                 t.push(f);
                 I[s]++;
                 if (f.substring(0, U) == P) {
                     b(f, a.showmenu);
                     continue
                 }
                 if (!d._ge(f)) {
                     continue;
                 }
                 if (b(f, a.showmenu) == "1")
                 {
                     k = c(f, p);
                     if (!k) {
                         continue;
                     }
                     h(k, "mouseover", m.initMenu, f);
                     h(k, "focus", m.initMenu, f);
                     h(k, "click", m.initMenu, f);
                     w = c(f, "name");
                     if (w) {
                         h(w, "click", function () 
                         {
                             $BSI.reportEvent("icm", {
                                 c : "n" 
                             }) 
                         });
                     }
                     k[l](K, "#");
                     k[B] = null;
                     v = b(f, a.menucustom);
                     for (r = 0; r < v[j]; ++r) {
                         n(v[r][q.MenuIndex.itemid], o.MenuCustom, g([f, "_", r]));
                     }
                 }
                 else
                 {
                     n(b(f, a.tileitemid), o.Tile, c(f, p));
                     if (typeof uxp_p != y) {
                         n(b(f, a.tileitemid), o.Tile, c(f, z));
                     }
                 }
                 i.Cid_Icid_Map.add(b(f, a.cid), f);
                 m.register(b(f, a.membername), f);
                 n(b(f, a.nameitemid), o.Name, c(f, "name"));
                 n(b(f, a.psmitemid), o.Message, c(f, "psm"))
             }
             d.ic_control_data = null;
         };
         m.initMenu = function (a)
         {
             var b = w.getIcIdFromAnyParent(a);
             G.initMenu(b, a);
             return false;
         }
     }
     function fb()
     {
         var C = this, u = {};
         C.dispose = function ()
         {
             m = null;
             for (var a in u) {
                 C.cleanUpMenu(a, 1);
             }
             u = null;
             C = null;
         };
         function ab(a)
         {
             return u[a] = function ()
             {
                 var b = c(a, r);
                 if (b && b.binding && !b.binding.isOpen()) {
                     T(a, 0);
                 }
                 else {
                     T(a, 2000055);
                 }
             }
         }
         function W(a)
         {
             return function ()
             {
                 L(a, z);
                 L(a, p, 1)
             }
         }
         function X(a)
         {
             return function ()
             {
                 P(a, z);
                 P(a, p, 1)
             }
         }
         C.cleanUpMenu = function (a, d)
         {
             var b = c(a, r);
             if (b && b.binding)
             {
                 if (u[a]) {
                     b.binding.removeStateListener(u[a]);
                     if (d) {
                         u[a] = null;
                     }
                     else {
                         delete u[a];
                     }
                 }
                 b.binding.dispose()
             }
         };
         function L(e, f, d)
         {
             var a = c(e, f);
             if (a) {
                 var b = d ? R : S;
                 a.alt_temp = a.getAttribute(b);
                 a[l](b, "")
             }
         }
         function P(d, e, b)
         {
             var a = c(d, e);
             if (a && a.alt_temp) {
                 a[l](b ? R : S, a.alt_temp);
             }
         }
         var T = function (d, b)
         {
             var a = c(d, O);
             if (a) {
                 a[t][k].zIndex = b;
                 a[t][t][k].zIndex = b;
                 a[k].zIndex = b;
             }
         },
         fb = function ()
         {
             var c = "c_ic_menus", a = d._ge(c);
             if (!a) {
                 a = D("div");
                 a.id = c;
                 var b = document.body;
                 b.insertBefore(a, b.firstChild)
             }
             return a;
         },
         hb = function (b)
         {
             var d = w.getIcIdFromAnyParent(b), a = c(d, r);
             if (a && a.binding) {
                 a.binding.show();
             }
             n.stopEventAction(b);
             return false;
         },
         Q = "ntICTemConvICTemplate", Z = Q[j];
         C.initMenu = function (d, n)
         {
             if (!c(d, r))
             {
                 var f = c(d, p);
                 f[k].outline = v;
                 var i = o.initMenu;
                 I(f, "focus", i, d);
                 I(f, "mouseover", i, d);
                 I(f, "click", i, d);
                 var j = W(d);
                 j();
                 h(f, "mouseout", X(d), d);
                 h(f, "mouseover", j, d);
                 h(f, B, hb, d);
                 f[l](K, "#");
                 var e, m;
                 e = D("ul");
                 e.className = Y + " c_m t_hovl";
                 e[l](M, g([d, "_", r]));
                 m = bb(d, e);
                 eb(d, e, m);
                 if (b(d, a.attachmenutobody) == "1") {
                     fb()[E](e);
                 }
                 else {
                     f[t][E](e);
                 }
                 if (e.id.substring(0, Z) == Q && !gb) {
                     e[k].position = "fixed";
                 }
                 _chicletData = b(d, a.additionalchickletdata);
                 $menu.bind(n, _chicletData[3], 0, 1, 0, 0, undefined, V, 0, 0, 0, e);
                 e.binding.addStateListener(ab(d));
                 o.addMenuBindingRef(x()[d][a.childicid], e.binding)
             }
         };
         var bb = function (d, I)
         {
             var O, C, D, L, t, z, A, M, F, r, K, R, l, n, u, S, P, v, w, E, W, N;
             if (typeof ic_menu_data != y)
             {
                 O = b(d, a.menudefault) || [];
                 C = b(d, a.cid);
                 r = b(d, a.address);
                 P = b(d, a.deccid);
                 K = b(d, a.contactid);
                 n = b(d, a.membername);
                 R = b(d, a.name);
                 E = q.InlineMenuIndex;
                 w = b(d, a.additionalchickletdata);
                 if (w && w[j] > 0 && w[E.rm] !=- 1)
                 {
                     l = "";
                     var J = w[E.rm];
                     if (J == q.RendeModes.em) {
                         l = r && r.encodeHtml();
                     }
                     else
                     {
                         var V = 0;
                         if (e.presence) {
                             V = e.presence.getContact(n);
                         }
                         var T = o.createICFromTemplate("InlineMenuTemplate", V, 0, b(d, a.membernamescope), 
                         0, C, P, R, r, n, w[E.ut], J == "0" ? w[E.psm] : r, J, 0, b(d, a.attachmenutobody));
                         l = T.html;
                         x()[d][a.childicid] = T.id
                     }
                     h(c(d, p), B, i("sendim", {
                         membername : n
                     }), d);
                     H(I, 0, 0, l, 0, 0, "mut", 0, 0, d, J);
                     G(I, null, g([d, "_menu_utSeparator"]))
                 }
                 for (var Q = 0; Q < O[j]; ++Q)
                 {
                     u = O[Q];
                     L = ic_menu_data[u];
                     if (!L) {
                         continue;
                     }
                     l = L[m.text];
                     S = s("ru");
                     t = z = D = "";
                     F = A = N = false;
                     v = s("dmtrgt");
                     var k = W = b(d, a.actiontypeurloverride);
                     k = !k || !k[u] ? L[m.url] : k[u];
                     try
                     {
                         switch (u)
                         {
                             case "ph3":
                             case "pr3":
                             case "sm3":
                                 t = k;
                                 l = l[f]("{0}", g(["(", b(d, a.thirdpartyname), ")"]));
                                 v = "_blank";
                                 break;
                             case "ve":
                                 z = i("viewemail", {
                                     url : k, address : r, icid : d
                                 });
                                 break;
                             case "cp":
                                 t = k;
                                 break;
                             case "ed":
                             case "dc":
                             case "pr":
                             case "gr":
                             case "ev":
                             case "ph":
                                 t = k[f]("$cid$", C);
                                 if (!C && !W && !k[u]) {
                                     A = true;
                                 }
                                 break;
                             case "vd":
                             case "ct":
                                 t = k[f]("{contactid}", K);
                                 break;
                             case "se":
                                 t = k[f]("{address}", r)[f]("{ru}", encodeURIComponent(S));
                                 A = !r;
                                 v = null;
                                 break;
                             case "sm":
                                 t = k[f]("{address}", P)[f]("{ru}", encodeURIComponent(S))[f]("$cid$", C);
                                 break;
                             case "ss":
                                 D = g([d, "_menu_ss"]);
                                 if (!e.presence || !e.presence.isAvailableForIC(d, 0, 1)) {
                                     A = true;
                                 }
                                 z = i("sendsms", {
                                     icid : d, membername : n
                                 });
                                 v = null;
                                 break;
                             case "si":
                                 D = g([d, "_menu_si"]);
                                 l += g(['&nbsp;<span id="', d, '_menu_si_pr_t">{0}</span>']);
                                 var U = "";
                                 if (e.presence && e.presence.isAvailableForIC(d, 1, 0)) {
                                     U = e.presence.webImGetPresText(d);
                                 }
                                 else {
                                     A = true;
                                 }
                                 l = l[f]("{0}", U);
                                 z = i("sendim", {
                                     icid : d, membername : n
                                 });
                                 v = null;
                                 break;
                             case "af":
                                 D = g([d, "_menu_af"]);
                                 F = true;
                                 z = i("addtofav", {
                                     addfavUrl : k, cid : C, cnid : K, icid : d, membername : n
                                 });
                                 N = A = e.presence && e.presence.isFavorite(n) || o.getMemberFavoriteList()[n];
                                 v = null;
                                 break;
                             case "c4":
                             case "c3":
                             case "c2":
                             case "c1":
                                 F = true;
                                 D = g([d, "_menu_c1"]);
                                 z = i("invite", {
                                     inviteUrl : k, cid : C, email : r, cnid : K, name : R, icid : d
                                 });
                                 v = null;
                         }
                     }
                     catch (X) {
                         t = "";
                         u = ""
                     }
                     if (F) {
                         M = G(I, null, g([d, "_menu_inviteSeparator"]), N);
                     }
                     H(I, F ? null : M, D, l, t, z, u, A, v, d)
                 }
             }
             return M;
         };
         function i(b, a)
         {
             switch (b)
             {
                 case "invite":
                     return function ()
                     {
                         var d = a.cid, e = "c", h = "cid";
                         if (a.cid == "0000000000000000")
                         {
                             if (a.cnid && a.cnid != "") {
                                 d = a.cnid;
                                 h = "cnid";
                                 e = "g" 
                             }
                             else {
                                 d = a.email;
                                 h = "email";
                                 e = "e" 
                             }
                             if (typeof window.sn_frInvite != y)
                             {
                                 window.sn_frInvite.showFor(e + d, a.name, null, function (d) 
                                 {
                                     if (d.hasSucceeded) {
                                         var b = c(a.icid, "menu_c1");
                                         b[k][A] = v;
                                         J(b);
                                         c(a.icid, r).binding.update() 
                                     }
                                 });
                             }
                             else 
                             {
                                 var b = a.inviteUrl;
                                 b = g([b, "&", h, "=", encodeURIComponent(d)]);
                                 b = b[f]("{name}", encodeURIComponent(a.name))[f]("$cid$", s("vcid"))[f]("{scxt}", 
                                 s("socialcontext"))[f]("{ru}", encodeURIComponent(s("ru")));
                                 $BSI.navigateTo(b, "_top") 
                             }
                             return false;
                         }
                     };
                 case "addtofav":
                     return function ()
                     {
                         U(a.icid);
                         var e = typeof window.sn_favHandler != y, b = db.handlerBaseUrl + "/Handlers/ICAddToFavorite.mvc?contactId={0}&cid={1}&canary={2}";
                         b = b.format(encodeURIComponent(a.cnid), encodeURIComponent(a.cid), encodeURIComponent(s("afcanary")));
                         var c = function ()
                         {
                             cb.fire(b, $BSI.addLDToHash({}));
                             o.getMemberFavoriteList()[a.membername] = 1;
                             var f = o.get_membername_iclist_map()[a.membername], c;
                             for (var e = 0; e < f[j]; ++e) {
                                 c = f[e];
                                 if (d._ge(c)) {
                                     o.displayICAsFav(c);
                                 }
                             }
                         };
                         if (!e || e && window.sn_favHandler(a.icid, a.cnid, a.cid, b, c)) {
                             c();
                         }
                         return false;
                     };
                 case "viewemail":
                     return function ()
                     {
                         if (typeof window.ic_viewemail != y) {
                             window.ic_viewemail(a.address, a.icid);
                         }
                         else
                         {
                             window.location = a.url[f]("{rru}", encodeURIComponent("search?keyword=" + encodeURIComponent("from:" + a.address)));
                         }
                         return false;
                     };
                 case "sendsms":
                 case "sendim":
                     return function ()
                     {
                         U(a.icid);
                         setTimeout(function ()
                         {
                             if (e.presence) {
                                 e.presence.startIM(a.membername, b == "sendsms");
                             }
                         }, 0);
                         return false;
                     };
                 case "customonclick":
                     return function ()
                     {
                         try {
                             e.scoped_eval(a)
                         }
                         catch (b) {
                             return false;
                         }
                     }
             }
         }
         function U(b)
         {
             var a = c(b, r);
             if (a) {
                 a.binding.hide();
             }
         }
         var J;
         C.HideSeparatorIfLastVis = J = function (a)
         {
             if (a.nextSibling == null) {
                 a.previousSibling[k][A] = v;
             }
         };
         var eb = function (h, g, f)
         {
             var e, c, d, k;
             e = b(h, a.menucustom);
             while (e[j] > 0)
             {
                 c = e.shift();
                 d = null;
                 if (c[m.text] && c[m.text] == N) {
                     G(g, f);
                 }
                 else
                 {
                     if (c[m.callback]) {
                         d = c[m.callback];
                         if (typeof d == "string") {
                             d = i("customonclick", d);
                         }
                     }
                     H(g, f, null, c[m.text], c[m.url], d, "mc", null, c[m.target], h)
                 }
             }
         },
         H = function (i, g, o, n, c, d, j, q, m, r, p)
         {
             var b, a, f, e;
             if (d && !c) {
                 c = "#";
                 f = "return false;"
             }
             if (n)
             {
                 b = D("li");
                 e = c || d ? "a" : "span";
                 a = D(e);
                 if (o) {
                     b[l](M, o);
                 }
                 if (e == "span") {
                     a.className = "link c_icinmenu" + p;
                 }
                 if (c) {
                     a[l](K, c);
                     if (f) {
                         a[l](B, f);
                     }
                     if (m) {
                         a[l]("target", m);
                     }
                 }
                 if (j) {
                     h(a, B, function () 
                     {
                         $BSI.reportEvent("icm", {
                             c : j 
                         }) 
                     });
                 }
                 if (d) {
                     h(a, B, d, r);
                 }
                 a[F] = n;
                 if (q) {
                     b[k][A] = v;
                 }
                 b[E](a);
                 if (g) {
                     i.insertBefore(b, g);
                 }
                 else {
                     i[E](b);
                 }
             }
             return b;
         },
         G = function (c, b, d, e)
         {
             var a = D("li");
             if (d) {
                 a[l](M, d);
             }
             a[F] = '<div class="c_ms">&nbsp;</div>';
             a.className = N;
             if (e) {
                 a[k][A] = v;
             }
             if (b) {
                 c.insertBefore(a, b);
             }
             else {
                 c[E](a);
             }
             return a;
         }
     }
     setTimeout(hb, 0)
 })();
 (function ()
 {
     var a = window;
     a.wLive.PageStats = 
     {
         d : [], o : $BSI.headTime,
         add : function (b, c)
         {
             var d = a.wLive.PageStats;
             c = c || d.o;
             b = b || {
                 url : "Missing page stats.", tasks : [], executionTimeMs : 0, schedulerTimeMs : 0
             };
             var e = new Date;
             b.clientStart = c;
             b.clientLength = e.getTime() - c;
             b.clientTime = e;
             d.d.push(b);
             jQuery(d).trigger("go")
         }
     }
 })()
