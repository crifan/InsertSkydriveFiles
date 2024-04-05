new function ()
 {
     var n = window["$Preload"] = {}, B = navigator.userAgent.indexOf("IE") >= 0, x = navigator.userAgent.indexOf("Firefox") >= 0, 
     y = navigator.userAgent.indexOf("WebKit") >= 0, b = document, k = b.body, q = "webim", g = window["$Config"] || {},
     a = g.Preload || {}, o = a.MaxConcurrentDownloads, s = a.CacheThresholdMs, v = a.DomainLower, t = a.BreatheTimeMs, 
     z = a.mkt, i = a.WebIMLoaderFileName, j = a.WebIMLoaderPath, d = (a.Resources || []).reverse(), p = d.length, 
     f = [], m = false, F = false, c = 0, h = false, w = [];
     C();
     n.pause = function E()
     {
         h = true;
     };
     n.resume = function D()
     {
         h = false;
         e()
     };
     function C()
     {
         if (v) {
             var a = g.sd.substr(1);
             if (b.domain != a) {
                 try {
                     b.domain = a 
                 }
                 catch (c) {}
             }
         }
         window.onunload = A;
         e()
     }
     function A()
     {
         l();
         window.onunload = null;
         m = true
     }
     function l()
     {
         var e = 0, d = f.length;
         for (var c = 0; c < d; c++) {
             var h = f[c];
             if (h < s) {
                 e++;
             }
         }
         var a = [];
         a.push("req=" + p);
         a.push("com=" + d);
         a.push("cache=" + e);
         b.cookie = "wl_preperf=" + a.join("&") + ";domain=" + g.sd + ";path=/;"
     }
     function e()
     {
         while (!h && c < o && d.length > 0) {
             c++;
             var a = new u(d.pop(), r);
             a.load()
         }
     }
     function r(b, a)
     {
         c--;
         f.push(a);
         if (d.length > 0) {
             setTimeout(e, t);
         }
         else if (c == 0) {
             l();
         }
     }
     function u(f, p)
     {
         var A = this, c = f, h = p, n = false, v = c.toLowerCase() == q, g = c.toLowerCase().indexOf(".js") >= 0, 
         o = !g && c.toLowerCase().indexOf(".css") >= 0, l, a;
         A.load = function C()
         {
             if (!c) {
                 h(0, 0);
             }
             l = (new Date).getTime();
             if (v) {
                 u();
             }
             else if ((g || o) && B) {
                 s();
             }
             else if ((g || o) && x) {
                 r();
             }
             else {
                 t();
             }
         };
         function t()
         {
             a = new Image;
             e(a, d);
             k.appendChild(a);
             a.src = c;
             if (y && a.complete) {
                 d();
             }
         }
         function r()
         {
             a = b.createElement("object");
             e(a, d);
             k.appendChild(a);
             a.data = f;
             a.type = "text/plain"
         }
         function s()
         {
             a = b.createElement("script");
             a.onreadystatechange = function ()
             {
                 if (a.readyState == "loaded") {
                     d();
                 }
             };
             w.push(a);
             a.src = f
         }
         function u()
         {
             function e()
             {
                 if ("complete" === a.readyState || "loaded" === a.readyState) {
                     c();
                 }
             }
             function c()
             {
                 a.onreadystatechange = a.onload = null;
                 var c = window["Microsoft"], f = c && c.Live, e = f && f.Core, b = e && e.Loader;
                 if (b) {
                     b.initialize({
                         market : z, "messenger.loaderPath" : j
                     });
                     b.load("messenger.extended", d)
                 }
             }
             if (i)
             {
                 var f = b.getElementsByTagName("head")[0], a = b.createElement("script");
                 a.type = "text/javascript";
                 a.onreadystatechange = e;
                 a.onload = c;
                 a.src = j + i;
                 f.appendChild(a)
             }
         }
         function d()
         {
             if (!n && !m)
             {
                 n = true;
                 var b = (new Date).getTime() - l;
                 if (a && a.tagName == "OBJECT") {
                     b -= 100;
                 }
                 e(a, null);
                 h(c, b)
             }
         }
         function e(a, b)
         {
             if (a) {
                 a.onload = a.onabort = a.onerror = b;
             }
         }
     }
 }
