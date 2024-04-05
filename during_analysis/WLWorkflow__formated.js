/* Copyright (C) 2012 Microsoft Corporation */
 function _du()
 {
     return document.URL.startsWith("https://", true)
 }
 function _cw(a, c)
 {
     var b = "&";
     if (a.indexOf("?") ==- 1) {
         b = "?";
     }
     return a + b + c
 }
 function _cv(b, a)
 {
     if (_l7(b))
     {
         var e = b.indexOf("?") ==- 1;
         if (_lp(a))
         {
             var d = b, f = e ? 1 : 0;
             if (e) {
                 d += "?" + a[0][0] + "=" + a[0][1];
             }
             for (var c = f; c < a.length; c++) {
                 d += "&" + a[c][0] + "=" + a[c][1];
             }
             return d;
         }
     }
     return b
 }
 function _sa(a, c, d)
 {
     var b = c.toLowerCase() + "=" + d.toLowerCase();
     if (a.toLowerCase().indexOf(b) ==- 1) {
         a = _cw(a, b);
     }
     return a
 }
 function setQSValue(a, f, h, d)
 {
     var b = a, e = "&" + f.toLowerCase() + "=", c = a.toLowerCase().indexOf(e);
     if (c ==- 1)
     {
         e = "?" + f.toLowerCase() + "=";
         c = a.toLowerCase().indexOf(e);
         if (c ==- 1) {
             b = _cw(a, f + "=" + h);
             if (exists(d) && b.length > d) {
                 b = a;
             }
             return b;
         }
     }
     var g = a.indexOf("&", c + 1);
     if (g ==- 1) {
         g = a.length;
     }
     b = a.substring(0, c) + e + h + a.substring(g);
     if (exists(d) && b.length > d) {
         b = a;
     }
     return b
 }
 function ExtractQSParam(b)
 {
     var a = document.location.search.toLowerCase();
     if (a) {
         a = a.substr(1);
     }
     return _se(a, b.toLowerCase(), "&", "=", "")
 }
 function _oe(a)
 {
     return _se(document.cookie, a, k_sCookieDelim)
 }
 function WriteCookie(e, d, c, b)
 {
     var a = _jo(b, false);
     _ry(e, d, c, a)
 }
 function _jo(c, d)
 {
     var a = "";
     if (c && IsSafari()) {
         a += ".";
     }
     if (d) {
         var b = document.domain.split(".");
         b.splice(0, Math.max(0, b.length - 2));
         a += b.join(".")
     }
     else {
         a += document.domain;
     }
     return a
 }
 function _ry(e, b, c, d)
 {
     var a = e + "=" + b + ";domain=" + d + ";path=/";
     if (c) {
         a += ";expires=Wed, 30-Dec-2037 16:00:00 GMT";
     }
     else if (b == " ") {
         a += ";expires=Thu, 30-Oct-1980 16:00:00 GMT";
     }
     document.cookie = a
 }
 function _kz(c, a)
 {
     var b = _oe(k_sWLOptCookieName);
     return _se(b, c, k_sWLOptCookieDelim, null, a)
 }
 function _pw(c, b)
 {
     var a = _oe(k_sWLOptCookieName);
     a = _sc(a, c, b, k_sWLOptCookieDelim);
     WriteCookie(k_sWLOptCookieName, a, true)
 }
 function _q1(b)
 {
     var a = _oe(k_sWLOptCookieName);
     if (null == a) {
         return;
     }
     var c = _kz(b);
     if (null == c) {
         return;
     }
     a = a.replace(k_sWLOptCookieDelim + b + "=" + c, "");
     a = a.replace(b + "=" + c + k_sWLOptCookieDelim, "");
     a = a.replace(b + "=" + c, "");
     if (0 == a.length) {
         a = " ";
     }
     WriteCookie(k_sWLOptCookieName, a, " " != a ? true : false)
 }
 function GetPresCookie()
 {
     var d = null, c = null, a = _oe(k_sPresCookieName);
     if (null != a) {
         var b = a.indexOf("=");
         if (-1 != b) {
             c = a.substring(0, b);
             d = a.substring(b + 1, a.length);
         }
     }
     return {
         CID : c, Status : d
     }
 }
 function getPropFromMSPPre(b)
 {
     var d = null, c = _oe(k_sMSPPreCookieName);
     if (null != c)
     {
         var a = c.match(/([^\|]+)\|([A-Fa-f0-9]{16})\|([^\|]*)\|([^\|]*)$/i);
         if (exists(a) && _lp(a) && _ls(a[b])) {
             d = a[b];
         }
     }
     return d
 }
 function setPropFromMSPPre(d, f)
 {
     var a = "", e = _oe(k_sMSPPreCookieName);
     if (null != e)
     {
         var b = e.match(/([^\|]+)\|([A-Fa-f0-9]{16})\|([^\|]*)\|([^\|]*)$/i);
         if (exists(b) && _lp(b)) for (var g = d + 1 > b.length ? d + 1 : b.length, c = 1;
         c < g;
         c++) {
             if (c != 1) {
                 a += "|";
             }
             if (d == c) {
                 a += f;
             }
             else {
                 a += b[c];
             }
         }
     }
     a != "" && WriteCookie(k_sMSPPreCookieName, a, true)
 }
 function _pq(a)
 {
     a != null && _bz("[" + a + "]")
 }
 function _bz(b)
 {
     var a = _kz(k_sWLOpt_ACT);
     if (!a) {
         a = "";
     }
     if (a.indexOf(b) ==- 1) {
         a = a + b;
     }
     _pw(k_sWLOpt_ACT, a)
 }
 function DoHelp(C, y, v, B, z, x, p)
 {
     var k = "_help", r = "netscape", m = ",left=", j = ",height=", d =- 1, f, g, c = "toolbar=1,location=1,status=1,menubar=1,resizable=1,scrollbars=1,width=", 
     i = screen.width, q = screen.height, a = navigator.userAgent.toLowerCase(), t = navigator.appName.toLowerCase(), 
     u = navigator.appVersion, n = a.indexOf("mac") > d, s = a.indexOf("msie") > d && parseInt(u.substring(0, 
     1)) >= 4, b = null == p ? "" : p, o = document.location, e = z == "" ? "http://" + o.hostname + "/hp.srf?lc=" + v + "&vv=" + x : z + "?lc=" + v + "&vv=" + x;
     if (p == "&linktype=3") {
         e = "http://explore.live.com/windows-live-sign-in-single-use-code-faq?";
     }
     else if (p == "&linktype=4") {
         e = "http://explore.live.com/windows-live-sign-up-characters-picture-verify-faq?";
     }
     else {
         e = "http://explore.live.com/windows-live-sign-in-help-center?";
     }
     var l = true, h = false, w = a.indexOf("msn "), A = false;
     if (w > d) {
         h = a.substring(w + 4);
         h = parseFloat(h.substring(0, h.indexOf(";")));
         h = h != NaN && h >= 6
     }
     A = a.indexOf("ppc mac os x") > d && a.indexOf("msn explorer") > d;
     b += y == "" ? "&SEARCHTERM=" + escape(C) : "&TOPIC=" + y;
     b += "&v2=" + escape(o.search) + "&tmt=" + escape(window.name);
     b += "&v4=" + escape(B);
     if (i <= 800) {
         b += "&sp=1";
         f = 180
     }
     else {
         f = 230;
     }
     if (n && s) {
         f = 224;
     }
     g = a.indexOf("windows") > 0 && a.indexOf("aol") > 0 ? screen.availHeight - window.screenTop - 22 : screen.availHeight;
     if (l) {
         f = i > 550 ? 550 : i;
         g = q > 575 ? 575 : q
     }
     c += f;
     if (l) {
         c += j + g + m + (i - f)  / 2 + ",top=" + (q - g)  / 2;
     }
     b = "";
     if (h) {
         window.external.showHelpPane("http://" + o.hostname + e + b, f);
     }
     else if (a.indexOf("webtv") > 0 || a.indexOf("msn companion") > 0 || a.indexOf("stb") > 0) {
         o = e + b;
     }
     else if (t.indexOf(r) > d && u.indexOf("4.") > d)
     {
         if (!l)
         {
             if (n) {
                 c += j + (g - 38) + m + (i - f - 16);
             }
             else {
                 c += j + (g - 30) + m + (i - f - 12);
             }
             h_win = window.open(e + b, k, c);
         }
     }
     else if (a.indexOf("opera") > d) {
         if (!l) {
             c += j + g + m + (i - f - (n ? 5 : 0));
         }
         h_win = window.open(e + b, k, c)
     }
     else if (a.indexOf("aol") > d) {
         if (!l) {
             c += j + (g - 115);
         }
         window.open(e + b, k, c)
     }
     else if (s || a.indexOf("netscape6") > d || a.indexOf("firefox") > d)
     {
         if (!l) {
             c += j + g + m + (i - f);
         }
         if (a.indexOf("msie 4") > 0) {
             window.open(e + b, k, c);
         }
         else {
             h_win = window.open(e + b, k, c);
         }
         if (h_win && !n && t.indexOf(r) < 0) {
             h_win.opener = self;
         }
     }
     else {
         window.open(e + b, k);
     }
 }
 function _fk()
 {
     var a = "ev";
     if (g_fEV) if (document.URL.startsWith("https://", true))
     {
         var b =- 1;
         if ((new RegExp("Windows NT ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent) != null) b = parseFloat(RegExp.$1);
         if (b < 6)
         {
             var c = _lc();
             if (c >= 7)
             {
                 try 
                 {
                     g_iAsyncDownloads++;
                     GEId(a).onerror = NotifyDownloadComplete;
                     GEId(a).onload = NotifyDownloadComplete;
                     GEId(a).onabort = NotifyDownloadComplete;
                     GEId(a).src = g_urlEV 
                 }
                 catch (d) {}
             }
         }
     }
 }
 HTTPCode = {
     OK : 200, NOT_MODIFIED : 304
 };
 function _rh(a)
 {
     return encodeURIComponent(a)
 }
 function _lc()
 {
     var a =- 1;
     if (navigator.appName == "Microsoft Internet Explorer")
     {
         if ((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent) != null) a = parseFloat(RegExp.$1);
         return a;
     }
 }
 function _kb()
 {
     var a =- 1;
     try
     {
         var c = "windows nt", d = navigator.userAgent.toLowerCase(), b = d.indexOf(c);
         if (b > 0) {
             a = parseFloat(d.substring(b + c.length));
         }
     }
     catch (e) {
         a =- 1
     }
     return a
 }
 function _lx()
 {
     var a = navigator.userAgent.toLowerCase();
     return - 1 < a.indexOf("msie")
 }
 function IsIEPNGFixNeeded()
 {
     var a = false;
     try {
         if (_lx() && _lc() < 7 && document.body.filters) {
             a = true;
         }
     }
     catch (b) {}
     return a
 }
 function IsSafari()
 {
     var a = navigator.userAgent.toLowerCase();
     return - 1 < a.indexOf("safari")
 }
 function _jn(f)
 {
     var d = f + "=", e = document.cookie.length, a = 0;
     while (a < e)
     {
         var c = a + d.length;
         if (document.cookie.substring(a, c) == d)
         {
             var b = document.cookie.indexOf(";", c);
             if (b ==- 1) {
                 b = e;
             }
             return unescape(document.cookie.substring(c, b))
         }
         a = document.cookie.indexOf(" ", a) + 1;
         if (a == 0) {
             break;
         }
     }
 }
 var NodeType = 
 {
     Element : 1, Attribute : 2, Text : 3, CDATA : 4, EntityRef : 5, Entity : 6, ProcInst : 7, Comment : 8, 
     Doc : 9, DocType : 10, DocFrag : 11, Notation : 12
 },
 InputType = 
 {
     Btn : "button", ChkBx : "checkbox", File : "file", Hf : "hidden", Img : "image", Pwd : "password", 
     RBtn : "radio", Reset : "reset", Submit : "submit", TxtBx : "text", Phone : "tel", Email : "email"
 },
 Visibility = 
 {
     Visible : ["block", "visible"], Hidden : ["", "hidden"], Removed : ["none", ""], Default : ["", ""]
 };
 function GEId(a)
 {
     return document.getElementById(a)
 }
 function GETag(a)
 {
     return document.getElementsByTagName(a)[0]
 }
 function _jw(e, a, f)
 {
     a = a != null ? a : document;
     var b = a.getElementsByTagName(f ? f : "*"), g = [];
     if (b && e)
     {
         for (var h = new RegExp("\\b" + e + "\\b"), c = 0; c < b.length; c++) {
             var d = b[c].className;
             d && h.test(d) && g.push(b[c]) 
         }
         return g;
     }
 }
 function CE(d, b, a)
 {
     if (!b && !a) {
         return document.createElement(d);
     }
     else if (d.equals("input", true) && !InputType.Pwd.equals(a, true))
     {
         var f = _al();
         f.innerHTML = '<input type="' + (a ? a : "") + '" name="' + (b ? b : "") + '" />';
         return f.childNodes[0]
     }
     else
     {
         try 
         {
             var c = "<" + d;
             if (exists(a)) {
                 c += ' type="' + a + '"';
             }
             if (exists(b)) {
                 c += ' name="' + b + '"';
             }
             c += ">";
             return document.createElement(c) 
         }
         catch (g) 
         {
             var e = document.createElement(d);
             if (exists(b)) {
                 e.name = b;
             }
             if (exists(a)) {
                 e.type = a;
             }
             return e ;
         }
     }
     finally {
         e = null;
     }
 }
 function _e3(a)
 {
     return document.createTextNode(a)
 }
 function _do(e)
 {
     var c = CE(e), b = {};
     for (var a in b) {
         var d = b[a];
         if (_lw(d)) {
             c[a] = b[a];
         }
     }
     try {
         return c
     }
     finally {
         c = null;
     }
 }
 function _lu(a)
 {
     return exists(a) && a.nodeType == NodeType.Text
 }
 function _lt(a, b)
 {
     return exists(a) && a.nodeType == NodeType.Element && (!_l7(b) || a.tagName.equals(b, true))
 }
 function isDOMFocusable(a)
 {
     if (_lt(a))
     {
         switch (a.tagName.toLowerCase()) 
         {
             case "a":
             case "body":
             case "input":
             case "frame":
             case "iframe":
             case "img":
             case "input":
             case "object":
             case "select":
             case "textarea":
                 return true ;
         }
     }
     return false
 }
 function _elText(a)
 {
     if (typeof a != "string") {
         a = "";
     }
     var b = document.createTextNode(a);
     try {
         return b
     }
     finally {
         b = null;
     }
 }
 function _ah(c, b, a)
 {
     return _ar(InputType.Btn, c, b, a)
 }
 function _ao(c, b, a)
 {
     return _ar(InputType.Hf, c, b, a)
 }
 function _ar(e, c, d, b)
 {
     var a = CE("input", d, e);
     if (c) {
         a.id = c;
     }
     if (b) {
         a.value = b;
     }
     return a
 }
 function _a7(a, b)
 {
     if (a) {
         a.style.visibility = b[1];
         a.style.display = b[0]
     }
     return a
 }
 function _as(d, b, c, e)
 {
     var a = CE("label");
     if (d) {
         a.id = d;
     }
     if (c) {
         a.htmlFor = c;
     }
     if (b) {
         if (e) {
             a.appendChild(_ax(_elText(b)));
         }
         else {
             a.appendChild(_elText(b));
         }
         return a;
     }
 }
 function _bj(a, b, d)
 {
     if (a && b > 0) {
         for (var c = 0; c < b; c++) {
             if (d) {
                 a.appendChild(_as(null, " "));
             };
         }
     }
     else {
         a.appendChild(document.createTextNode(" "));
     }
 }
 function _al(c, b)
 {
     var a = CE("div");
     if (c) {
         a.id = c;
     }
     if (b) {
         a.className = b;
     }
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _elForm(f, e, c, d, b)
 {
     var a = CE("form");
     if (f) {
         a.id = f;
     }
     if (e) {
         a.name = e;
     }
     if (c) {
         a.method = c;
     }
     if (d) {
         a.target = d;
     }
     if (b) {
         a.action = b;
     }
     return a
 }
 function _au(c, e, b, d)
 {
     var a = CE("a");
     a.href = _rk(e, "#");
     if (c) {
         a.id = c;
     }
     exists(b) && EVENT.add(a, EVENT.Name.OnClick, b);
     d && EVENT.add(a, EVENT.Name.OnClick, function (a)
     {
         EVENT.end(EVENT.get(a))
     });
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _ay(c, b)
 {
     var a = CE("p");
     c && a.appendChild(_elText(c));
     if (b) {
         a.className = b;
     }
     return a
 }
 function _aq(g, b, f, e, c)
 {
     var d = "img", h = _u51(b);
     if (h == "png" && IsIEPNGFixNeeded()) {
         d = "span";
     }
     var a = CE(d);
     if (g) {
         a.id = g;
     }
     b && WKB.preload(a, b);
     if (f) {
         a.alt = f;
     }
     if (e) {
         a.title = e;
     }
     if (c) {
         a.className = c;
     }
     return a
 }
 function _ag()
 {
     return CE("br")
 }
 function _ax(b)
 {
     var a = CE("nobr");
     b && a.appendChild(b);
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _a1(d, b, c)
 {
     var a = CE("span");
     if (exists(d)) {
         a.id = d;
     }
     (_lt(b) || _lu(b)) && a.appendChild(b);
     if (exists(c)) {
         a.className = c;
     }
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _a6(c, b)
 {
     var a = CE("ul");
     if (c) {
         a.id = c;
     }
     if (b) {
         a.className = b;
     }
     return a
 }
 function _at(e, b)
 {
     for (var d = _a6(), c = null, a = 0; a < e; a++) {
         c = d.appendChild(CE("li"));
         _c1(b, a) && c.appendChild(_elText(b[a]))
     }
     return d
 }
 function _aj(a)
 {
     while (exists(a) && a.hasChildNodes()) {
         a.removeChild(a.firstChild);
     }
 }
 function setElemFocus(a, d, f)
 {
     if (_lt(a, d))
     {
         var b = false;
         if (f && "input".equals(d, true) && a.value.length > 0) {
             b = true;
         }
         var c = function ()
         {
             try {
                 EVENT._u40(a)
             }
             catch (b) {}
         },
         e = function ()
         {
             try {
                 exists(a.value) && a.value.length > 0 && a.select()
             }
             catch (b) {}
         };
         c();
         b && e();
         setTimeout(c, 400)
     }
 }
 function _lq(b, a)
 {
     if (exists(b) && exists(a) && b.hasChildNodes() && exists(a.parentNode) && a != b)
     {
         for (var d = b.getElementsByTagName(a.tagName), c = 0; c < d.length; c++) {
             if (d[c] == a) {
                 return true;
             };
         }
     }
     return false
 }
 function createFromHTML(a, c)
 {
     if (_lu(a)) {
         a.data = c;
         return a
     }
     var b = _lt(a) ? a : _l7(a) ? CE(a) : null;
     if (exists(b))
     {
         var d = new _DOMParser("<xml>" + c.replace(/&/g, "&amp;") + "</xml>");
         exists(d) && copyDOMTree(b, d.documentElement)
     }
     return b
 }
 function copyDOMTree(elParent, elDOM, iTreeLevel)
 {
     if (!exists(iTreeLevel) || iTreeLevel < 1) {
         iTreeLevel = 1;
     }
     if (iTreeLevel > 1)
     {
         switch (elDOM.nodeType) 
         {
             case NodeType.Element:
                 for (var elNewEl = CE(elDOM.nodeName), arrEvents = {}, attCount = elDOM.attributes.length, 
                 iAttID = 0;
                 iAttID < attCount;
                 iAttID++) 
                 {
                     var sAttName = elDOM.attributes[iAttID].name, sAttValue = elDOM.attributes[iAttID].value, 
                     isEvent = sAttName.substr(0, 2) == "on";
                     if (isEvent) {
                         arrEvents[sAttName] = sAttValue;
                     }
                     else
                     {
                         switch (sAttName) 
                         {
                             case "class":
                                 elNewEl.className = sAttValue;
                                 break;
                             case "for":
                                 elNewEl.htmlFor = sAttValue;
                                 break;
                             default:
                                 elNewEl.setAttribute(sAttName, sAttValue) 
                         }
                     }
                 }
                 elParent = elParent.appendChild(elNewEl);
                 for (var eventName in arrEvents) {
                     elParent[eventName] = function () 
                     {
                         return eval(arrEvents[eventName]);
                     };
                 }
                 break;
             case NodeType.Text:
                 var sNodeValue = elDOM.nodeValue ? elDOM.nodeValue : "", sTrimValue = sNodeValue.trim();
                 (sNodeValue.length < 7 || sNodeValue.indexOf("<!--") != 0 && sTrimValue.indexOf("-->") != sNodeValue.length - 3) && elParent.appendChild(document.createTextNode(sNodeValue)) 
         }
     }
     if (elDOM && elDOM.childNodes)
     {
         for (var iCount = elDOM.childNodes.length, iNodeIndex = 0; iNodeIndex < iCount; iNodeIndex++) {
             copyDOMTree(elParent, elDOM.childNodes[iNodeIndex], iTreeLevel + 1);
         }
     }
 }
 function appendClass(c, b)
 {
     var a = c.className || "";
     if (_s2(a.split(" "), false, null, b, true).length == 0) {
         a += " " + b;
     }
     c.className = a.trim()
 }
 function htmlUnescape(b)
 {
     var a = _a1();
     a.innerHTML = b;
     return a.innerText
 }
 Coords = function (a, b)
 {
     this.x = a;
     this.y = b;
 };
 function _kc(a)
 {
     var b = 0, c = 0;
     if (a.offsetParent)
     {
         while (1) {
             b += a.offsetLeft;
             c += a.offsetTop;
             if (!a.offsetParent) {
                 break;
             }
             a = a.offsetParent ;
         }
     }
     else if (a.x) {
         b += a.x;
         c += a.y
     }
     return new Coords(b, c)
 }
 function _mb(a)
 {
     return _lt(a, "input") && (InputType.Hf.equals(a.type, true) || exists(a.value))
 }
 function _an(b, c)
 {
     var a = CE("h1");
     b && a.appendChild(_elText(b));
     if (c) {
         a.id = c;
     }
     return a
 }
 function _ap()
 {
     return CE("hr")
 }
 function _a2(c, b, a)
 {
     return _ar(InputType.Submit, c, b, a)
 }
 function _ai(e, d, c, b)
 {
     var a = _ar(InputType.ChkBx, e, d, c);
     if (b) {
         a.defaultChecked = true;
     }
     return a
 }
 function _az(d, c, b)
 {
     var a = _a5(d, c, b);
     a.type = InputType.Pwd;
     return a
 }
 function _a5(d, b, a)
 {
     var c = _ar(InputType.TxtBx, d, b, a);
     return c
 }
 function _ka(d)
 {
     var b = d.parentNode;
     if (b) {
         var a = false;
         for (var c in b.childNodes) {
             if (c == d) {
                 a = true;
             }
             else if (a) {
                 return c;
             }
         }
     }
     return null
 }
 function _ky()
 {
     var b = 0, a = 0;
     if (window.innerWidth) {
         b = window.innerWidth;
         a = window.innerHeight
     }
     else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
         b = document.documentElement.clientWidth;
         a = document.documentElement.clientHeight
     }
     else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
         b = document.body.clientWidth;
         a = document.body.clientHeight
     }
     return {
         w : b, h : a
     }
 }
 var EVENT = 
 {
     NamePrefix : "on", Name : 
     {
         OnAbort : "abort", OnBlur : "blur", OnChange : "change", OnClick : "click", OnError : "error", 
         OnFocus : "focus", OnKeyPress : "keypress", OnLoad : "load", OnMouseOut : "mouseout", OnMouseOver : "mouseover", 
         OnMouseMove : "mousemove", OnSubmit : "submit", OnResize : "resize", OnKeyDown : "keydown", OnReadyStateChange : "readystatechange", 
         OnKeyDown : "keydown", OnKeyUp : "keyup", OnMouseDown : "mousedown"
     },
     Key : 
     {
         Enter : 13, Escape : 27, Spacebar : 32, ArrowUp : 38, ArrowDown : 40, Delete : 46, ArrowUp_alt : 63232, 
         ArrowDown_alt : 63233
     },
     "get" : function (a)
     {
         return a || window.event;
     },
     _kq : function (b)
     {
         var a = EVENT.get(b);
         return a.srcElement || a.target;
     },
     _im : function (a, b, d)
     {
         if (exists(a) && _l7(b))
         {
             var c = EVENT.NamePrefix + b;
             if (exists(a[c]) && a[c]._customEvent == true) {
                 return a[c]._im(a, d);
             }
             else if (document.createEvent) {
                 return a.dispatchEvent(EVENT.create(d, b));
             }
             else if (document.createEventObject) {
                 return a.fireEvent(EVENT.NamePrefix + b, EVENT.create(d, b));
             }
         }
         return false;
     },
     _u39 : function (a)
     {
         if (_lt(a)) {
             return EVENT._u42(a, "click") || true;
         }
         return false;
     },
     _u40 : function (a)
     {
         if (isDOMFocusable(a) || exists(a.focus)) {
             return EVENT._u42(a, "focus") || true;
         }
         return false;
     },
     _u41 : function (a)
     {
         if (isDOMFocusable(a)) {
             return EVENT._u42(a, "blur") || true;
         }
         return false;
     },
     _u42 : function (a, b)
     {
         if (exists(a[b])) {
             return a[b]();
         }
         if (exists(document.createEvent))
         {
             var c = document.createEvent("HTMLEvents");
             c.initEvent(b, true, true);
             return a.dispatchEvent(c)
         }
         return false;
     },
     create : function (b, c)
     {
         if (exists(document.createEvent)) {
             var a = document.createEvent("HTMLEvents");
             a.initEvent(c, true, true);
             return a
         }
         else if (exists(document.createEventObject)) {
             return document.createEventObject(EVENT.get(b));
         }
         return null;
     },
     add : function (a, d, c)
     {
         var b = EVENT.NamePrefix + d;
         if (exists(a[b]) && a[b]._customEvent == true) {
             a[b].attach(c);
         }
         else if (a.addEventListener) {
             a.addEventListener(d, c, false);
         }
         else {
             a.attachEvent && a.attachEvent(b, c);
         }
     },
     remove : function (a, c, d)
     {
         var b = EVENT.NamePrefix + c;
         if (exists(a[b]) && a[b]._customEvent == true) {
             a[b].remove(d);
         }
         else if (a.removeEventListener) {
             a.removeEventListener(c, d, false);
         }
         else {
             a.detachEvent(b + c, d);
         }
     },
     disable : function (a)
     {
         a = EVENT.get(a);
         _lw(a.stopPropagation) && a.stopPropagation();
         a.cancelBubble = true;
     },
     end : function (a)
     {
         a = EVENT.get(a);
         _lw(a.preventDefault) && a.preventDefault();
         a.returnValue = false;
         return false;
     },
     _b2 : function (b, a)
     {
         if (exists(a) && _l7(b)) {
             var c = new EVENT.CustomEvent(b);
             a[c.type] = c;
         }
     },
     _cp : function (c, b, d)
     {
         var a = b + "uistate";
         c[a] = d;
         EVENT.add(c, b, function ()
         {
             this [a]._c3(this)
         })
     },
     _j3 : function (b)
     {
         var a = 0;
         try {
             if (document.layers) {
                 a = b.which;
             }
             else {
                 a = b.keyCode;
             }
         }
         catch (c) {}
         return a;
     },
     isShiftDown : function (a)
     {
         return a.shiftKey;
     },
     isNumberKey : function (a)
     {
         if (EVENT.isMetaKey(a)) {
             return false;
         }
         if (exists(a.char) && a.char != "" && a.char >= "0" && a.char <= "9") {
             return true;
         }
         var b = EVENT._j3(a);
         if (!EVENT.isShiftDown(a) && b > 47 && b < 58 || b > 95 && b < 106) {
             return true;
         }
         return false;
     },
     isMetaKey : function (a)
     {
         return a.altKey || a.ctrlKey || a.metaKey;
     },
     isCharKey : function (b)
     {
         if (EVENT.isMetaKey(b)) {
             return false;
         }
         var a = EVENT._j3(b);
         if (a > 47 && a < 91 || a > 95 && a < 112 || a > 185) {
             return true;
         }
         return false;
     }
 };
 EVENT.CustomEvent = function (d)
 {
     var c = true, a = this;
     a.type = EVENT.NamePrefix + d;
     a._customEvent = c;
     a.returnValue = c;
     a.cancleBubble = c;
     a.event = null;
     var b = [];
     a.attach = function (a)
     {
         if (!exists(b)) {
             b = [];
         }
         b.push(a)
     };
     a._im = function (d, f)
     {
         var a = this;
         a.event = f;
         a.srcElement = d;
         a.target = d;
         a.returnValue = c;
         a.cancelBubble = c;
         for (var e = 0; e < b.length; e++) {
             if (!a.returnValue || !a.cancelBubble) {
                 return false;
             }
             a.returnValue = b[e](d, f)
         }
         return a.returnValue;
     };
     a.stopPropagation = function ()
     {
         this.cancelBubble = c;
     };
     a.preventDefault = function ()
     {
         this.returnValue = false;
     };
     a.remove = function (d)
     {
         for (var c =- 1, a = 0; a < b.length; a++) {
             if (b[a] === d) {
                 c = a;
                 break 
             }
             c > 0 && b.splice(c, 1);
         }
     }
 };
 EVENT.ExternalClickHandler = function (b, a)
 {
     if (!_ls(EVENT._clickHandlerInstance))
     {
         EVENT._clickHandlerInstance = new EVENT.ClickHandler;
         EVENT._clickHandlerInstance._c6()
     }
     EVENT._clickHandlerInstance._b3(b, a);
     return EVENT._clickHandlerInstance;
 };
 EVENT.ClickHandler = function ()
 {
     this.stateHandler = new WK;
 };
 EVENT.ClickHandler.prototype = 
 {
     _c6 : function ()
     {
         EVENT.add(document, EVENT.Name.OnClick, this.addEventHandler(this._fl))
     },
     _b3 : function (a, c)
     {
         var b = this;
         if (_l7(a) && a != "" && _l7(c) && c != "")
         {
             if (!exists(b.m_arrElements)) {
                 b.m_arrElements = [];
                 b.m_arrCallbacks = []
             }
             else if (_c1(b.m_arrElements, a) && !_l7(b.m_arrElements[a])) {
                 return;
             }
             b.m_arrElements[a] = a;
             b.m_arrCallbacks[a] = c;
         }
     },
     _fl : function (a)
     {
         this._ig(EVENT.get(a))
     },
     _ig : function (c, a)
     {
         var e = this;
         if (exists(e.m_arrElements))
         {
             c = EVENT.get(c);
             if (!_l7(a) || a == "")
             {
                 var b = EVENT._kq(c);
                 while (exists(b) && exists(b.id) && b.id.length == 0) {
                     a = b.id;
                     b = b.parentNode
                 }
                 if (exists(b)) {
                     a = b.id;
                 }
             }
             for (var d in e.m_arrElements) if (_l7(e.m_arrElements[d]))
             {
                 var f = GEId(d), g = e.m_arrCallbacks[d];
                 if (_l7(a) && a.length > 0) {
                     if (d.equals(a, true) || _lq(f, GEId(a))) {
                         continue;
                     }
                     exists(f) && _lw(f[g]) && f[g](c);
                 }
             }
         }
     }
 };
 function OnBack() {}
 function exists(a)
 {
     return a ? true : a == 0 || a == false || a == ""
 }
 function _rk(a, b)
 {
     return exists(a) ? a : b
 }
 function _ls(a)
 {
     return !"undefined".equals(typeof a, true)
 }
 function _u51(a)
 {
     if (!_l7(a)) {
         return "";
     }
     if (a.lastIndexOf(".") < 0) {
         return "";
     }
     return a.toLowerCase().substr(a.lastIndexOf(".") + 1, a.length)
 }
 function _rl(a)
 {
     return a ? a : ""
 }
 function _rm(a)
 {
     if (a == null || a == "") {
         return false;
     }
     if (isNaN(a)) {
         return false;
     }
     return true
 }
 function _lp(a)
 {
     return a instanceof Array
 }
 function _lw(a)
 {
     return "function".equals(typeof a, true)
 }
 function _l7(a)
 {
     return typeof a == "string"
 }
 function _l0(a, b)
 {
     if (!exists(a)) {
         return false;
     }
     _l7(a) && b && a.trim();
     return !isNaN(a)
 }
 Function.prototype.derivesFrom = function (f)
 {
     var a = this, d = a.prototype;
     function e() {}
     e.prototype = f.prototype;
     a.prototype = new e;
     a.prototype.constructor = a;
     for (var c = new OBJ.Iterator(d, {}), b = 0; b < c.length; b++) a.prototype[c[b]] = d[c[b]]; }; Object.prototype.addEventHandler = function (a)
 {
     var b = this;
     return function (c)
     {
         a.call(b, EVENT.get(c))
     }
 };
 Object.prototype._tn = function (a)
 {
     var b = this;
     return function ()
     {
         var c = "prototype", b = this;
         if (_c1(b, c, a)) {
             return b.prototype[a].apply(b, arguments);
         }
         else if (_lt(b) && _c1(b, c, c, a)) {
             return b.prototype.prototype[a].apply(b, arguments);
         }
     }
 };
 Object.prototype.addAccessor = function (a, c)
 {
     var b = this;
     if (c) {
         return function () 
         {
             return b[a];
         };
     }
     return function (c)
     {
         b[a] = c;
     }
 };
 function _cg(a, j, e, d)
 {
     var f = [];
     e = _rk(e, "set_");
     d = _rk(d, "get_");
     for (var b in a)
     {
         try {
             _ls(a[b]) && !_lw(a[b]) && (j || b.indexOf(EVENT.NamePrefix) != 0) && f.push(b) 
         }
         catch (k) {
             continue 
         }
     }
     for (var g = 0; g < f.length; g++)
     {
         var c = f[g], i = e + c;
         if (!_ls(a[i])) {
             a[i] = a.addAccessor(c);
         }
         var h = d + c;
         if (!_ls(a[h])) {
             a[h] = a.addAccessor(c, true);
         }
     }
 }
 String.prototype.trim = function ()
 {
     return this.replace(/^\s+|\s+$/g, "");
 };
 String.prototype.filter = function (f, c, e)
 {
     var b = this;
     for (var d = "", a = 0; a < b.length; a++)
     {
         if (e && (_c1(f, b.charCodeAt(a)) || !exists(c) || !_c1(c, b.charCodeAt(a))) || !e && _c1(f, b.charAt(a) || !exists(c) || !_c1(c, 
         b.charAt(a)))) d += b.charAt(a);
         return d;
     }
 };
 String.prototype.startsWith = function (a, b)
 {
     if (!_l7(a)) {
         return false;
     }
     var d = b ? this.toUpperCase() : this, c = b ? a.toUpperCase() : a;
     return d.indexOf(c) == 0;
 };
 String.prototype.equals = function (a, b)
 {
     if (!_l7(a)) {
         return false;
     }
     if (b) {
         return this.toLowerCase() == a.toLowerCase();
     }
     else {
         return this == a;
     }
 };
 String.prototype._u54 = function ()
 {
     var a = this.trim();
     if (a.charAt(0) > "~" || a.indexOf(" ", 0) !=- 1) {
         return false;
     }
     var c = a.indexOf("@");
     if (c ==- 1 || a.indexOf(".", c) ==- 1) {
         return false;
     }
     var b = a.split("@");
     if (b.length > 2 || b[0].length < 1 || b[1].length < 2) {
         return false;
     }
     return true;
 };
 String.prototype._u52 = function (d, c)
 {
     if (!this._u54()) {
         return this;
     }
     var b = c ? "@" : "", a = this.trim().split("@")[1];
     if (d) {
         return b + a.slice(0, a.lastIndexOf(".") + 1);
     }
     return b + a;
 };
 String.prototype._u53 = function ()
 {
     var a = this.match(/^(\d{4})-(\d{2})-(\d{2})[T](\d{2}):(\d{2}):(\d{2})Z$/i);
     if (!exists(this) || !_lp(a)) {
         return null;
     }
     return new Date(Date.UTC(a[1], a[2] - 1, a[3], a[4], a[5], a[6] | 0));
 };
 function _se(b, d, c, e, h)
 {
     c = _rk(c, "&");
     e = _rk(e, "=");
     var f = _rk(h, null);
     if (!b) {
         return f;
     }
     var a = b.indexOf(d + e);
     if (0 == a) {
         a += d.length + 1;
     }
     else if (0 < a) {
         a = b.indexOf(c + d + e);
         if (0 < a) {
             a += c.length + d.length + 1;
         }
     }
     if (-1 != a) {
         var g = b.indexOf(c, a);
         if (-1 == g) {
             g = b.length;
         }
         f = b.substring(a, g)
     }
     return f
 }
 function _sc(a, c, e, d, b)
 {
     if (!d) {
         d = "&";
     }
     if (!b) {
         b = "=";
     }
     if (null == a) {
         a = c + b + e;
     }
     else
     {
         var f = _se(a, c, d, b);
         if (f == e) {
             return a;
         }
         if (null != f) {
             a = a.replace(c + b + f, c + b + e);
         }
         else {
             a += d + c + b + e;
         }
     }
     return a
 }
 function _c1(c, d)
 {
     if (!exists(c)) {
         return false;
     }
     for (var b = _lp(d) ? d : arguments, e = _lp(d) ? 0 : 1, a = e; a < b.length; a++) {
         if (!exists(b[a]) || !exists(c[b[a]])) {
             return false;
         }
         c = c[b[a]]
     }
     return true
 }
 function _c2(a, e, d)
 {
     if (!exists(a)) {
         return e;
     }
     for (var c = _lp(d) ? d : arguments, f = _lp(d) ? 0 : 2, b = f; b < c.length; b++) {
         if (!exists(c[b]) || !exists(a[c[b]])) {
             return e;
         }
         a = a[c[b]]
     }
     return a
 }
 function arrSet(a, g, d)
 {
     if (!exists(a)) {
         a = [];
     }
     var b = _lp(d) ? d : arguments, h = _lp(d) ? 0 : 2, e = b.length - 1;
     if (e > 0) {
         for (var f = h; f < e; f++) {
             var c = b[f];
             if (!exists(a[c])) {
                 a[c] = [];
             }
             a = a[c] 
         }
         a[b[e]] = g;
     }
 }
 function _s2(a, e, d, i, h)
 {
     var g = [];
     if (_lp(a))
     {
         for (var f = e ? OBJ.Iterator(a) : a, b = 0; b < f.length; b++) {
             var c = e ? f[b] : b, j = exists(d) ? a[c][d] : a[c];
             if (j == i) {
                 g.push(c);
                 if (h) {
                     break ;
                 }
             }
         }
         return g;
     }
 }
 var OBJ = {};
 _DOMParser = function (b)
 {
     if (exists(_DOMParser.variantIndex)) {
         return _DOMParser.variants[_DOMParser.variantIndex](b);
     }
     if (!exists(_DOMParser.variants))
     {
         _DOMParser.variants = [function (a) 
         {
             return (new DOMParser).parseFromString(a, "application/xml");
         },
         function (b) 
         {
             var a = new ActiveXObject("MSXML2.DOMDocument");
             a.loadXML(b);
             return a;
         },
         function (b) 
         {
             var a = new ActiveXObject("MSXML.DOMDocument");
             a.loadXML(b);
             return a;
         },
         function (b) 
         {
             var a = new ActiveXObject("Microsoft.XMLDOM");
             a.loadXML(b);
             return a 
         }];
     }
     for (var c = null, a = 0; a < _DOMParser.variants.length; a++) {
         try {
             c = _DOMParser.variants[a](b)
         }
         catch (d) {
             continue
         }
         _DOMParser.variantIndex = a;
         break
     }
     return c;
 };
 JSONProp = {
     State : "State", UserState : "UserState"
 };
 JSONInfo = function (b)
 {
     var a = this;
     a._isJSON = exists(b);
     a.props = a._isJSON ? b : {};
     if (!exists(a.props[JSONProp.State])) {
         a.props[JSONProp.State] =- 1;
     }
     if (!exists(a.props[JSONProp.UserState])) {
         a.props[JSONProp.UserState] = 0;
     }
 };
 JSONInfo.prototype = 
 {
     fromJSON : function ()
     {
         return this._isJSON;
     },
     hasValue : function (a)
     {
         return _c1(this.props, a) && !(this.props[a] === "");
     },
     "get" : function (a)
     {
         if (!exists(this.props[a])) {
             return "";
         }
         return this.props[a];
     },
     "set" : function (b, a)
     {
         this.props[b] = a === "" ? null : a;
     }
 };
 JSONObject = function (text)
 {
     var objJSON = null;
     if (text)
     {
         try 
         {
             if (/^[\],:{}\s]*$/.test(text.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, 
             "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) objJSON = eval("(" + text + ")") 
         }
         catch (a) {}
     }
     return objJSON;
 };
 OBJ.Iterator = function (b, c)
 {
     var a = [];
     if (exists(b) && (exists(c) || exists(b.constructor)))
     {
         a._next = 0;
         a._target = b;
         var e = exists(c) ? c : new b.constructor;
         for (var d in b) {
             !exists(e[d]) && a.push(d);
         }
     }
     a.next = function ()
     {
         var a = this, b = a[a._next];
         a._next++;
         return new OBJ.Pair(b, a._target[b]);
     };
     a.hasNext = function ()
     {
         return exists(this._next) && this._next < this.length;
     };
     return a;
 };
 OBJ.Pair = function (b, a)
 {
     this.key = b;
     this.value = a;
 };
 var WKB = {};
 WKB.preload = function (c, b)
 {
     if (!exists(WKB.images)) {
         WKB.images = [];
     }
     if (exists(c) && _l7(b)) if (_c1(WKB.images, b))
     {
         if (WKB.images[b]._loaded) {
             WKB.set_source(c, b);
         }
         else {
             WKB.images[b]._targets.push(c);
         }
         return
     }
     else
     {
         g_iAsyncDownloads++;
         var a = new Image;
         a._targets = [];
         a._targets.push(c);
         a._loaded = false;
         a.addEventHandler = Object.addEventHandler;
         EVENT.add(a, EVENT.Name.OnLoad, a.addEventHandler(WKB.evt_onload));
         EVENT.add(a, EVENT.Name.OnAbort, NotifyDownloadComplete);
         EVENT.add(a, EVENT.Name.OnError, NotifyDownloadComplete);
         a.src = b;
         WKB.images[b] = a;
     }
 };
 WKB.set_source = function (a, b)
 {
     var e = _u51(b), d = e == "png" && IsIEPNGFixNeeded();
     if (_lt(a, "img") || d && _lt(a, "span"))
     {
         if (d && _lt(a, "span")) 
         {
             _bj(a, 1);
             var c = "image";
             if (a.width && a.height) {
                 a.style.width = a.width + "px";
                 a.style.height = a.height + "px";
                 c = "scale" 
             }
             a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "', sizingMethod='" + c + "')" 
         }
         else {
             a.src = b;
             a.style.visibility = "" 
         }
         else {
             a.style.backgroundImage = "url(" + b + ")";
         }
     }
 };
 WKB.evt_onload = function ()
 {
     var a = this;
     NotifyDownloadComplete();
     a._loaded = true;
     if (_lp(a._targets)) {
         for (var b = 0; b < a._targets.length; b++) {
             WKB.set_source(a._targets[b], a.src);
         }
     }
 };
 var WKA = {};
 WKA.preload = function (d, b, c)
 {
     if (!exists(WKA.scripts)) {
         WKA.scripts = [];
     }
     if (_l7(b)) if (_c1(WKA.scripts, b))
     {
         if (exists(c)) {
             if (WKA.scripts[b]._loaded) {
                 c(d);
             }
             else {
                 WKA.scripts[b]._targets.push(c);
             }
             return;
         }
     }
     else
     {
         g_iAsyncDownloads++;
         var a = document.createElement("script");
         a._targets = [];
         exists(c) && a._targets.push(c);
         a._loaded = false;
         a.addEventHandler = Object.addEventHandler;
         EVENT.add(a, EVENT.Name.OnReadyStateChange, a.addEventHandler(WKA.evt_readystatechange));
         EVENT.add(a, EVENT.Name.OnLoad, a.addEventHandler(WKA.evt_onload));
         EVENT.add(a, EVENT.Name.OnAbort, NotifyDownloadComplete);
         EVENT.add(a, EVENT.Name.OnError, NotifyDownloadComplete);
         a.language = "javascript";
         a.type = "text/javascript";
         a.id = d;
         a.src = b;
         WKA.scripts[b] = a;
         GETag("head").appendChild(a)
     }
 };
 WKA.evt_readystatechange = function (b)
 {
     var a = this;
     (a.readyState == "complete" || a.readyState == "loaded") && !a._loaded && WKA.evt_onload.apply(a, 
     [b])
 };
 WKA.evt_onload = function (c)
 {
     var a = this;
     NotifyDownloadComplete();
     a._loaded = true;
     a._event = EVENT.get(c);
     if (_lp(a._targets)) {
         for (var b = 0; b < a._targets.length; b++) {
             a._targets[b](a);
         }
     }
 };
 _XMLHttpRequest = function ()
 {
     if (_ls(_XMLHttpRequest.variantIndex)) {
         return _XMLHttpRequest.variants[_XMLHttpRequest.variantIndex]();
     }
     if (!exists(_XMLHttpRequest.variants))
     {
         _XMLHttpRequest.variants = [function () 
         {
             return new XMLHttpRequest;
         },
         function () 
         {
             return new ActiveXObject("Msxml2.XMLHTTP");
         },
         function () 
         {
             return new ActiveXObject("Msxml3.XMLHTTP");
         },
         function () 
         {
             return new ActiveXObject("Microsoft.XMLHTTP") 
         }];
     }
     for (var b = null, a = 0; a < _XMLHttpRequest.variants.length; a++)
     {
         try {
             b = _XMLHttpRequest.variants[a]()
         }
         catch (c) {
             continue
         }
         _XMLHttpRequest.variantIndex = a;
         break
     }
     return b;
 };
 WindowManager = function (e, d, c, b)
 {
     var a = this;
     a.WinObj = null;
     a.m_sName = e;
     a.m_iWidth = d;
     a.m_iHeight = c;
     a.m_fResizeable = b;
 };
 WindowManager.prototype = 
 {
     _d0 : function ()
     {
         this.WinObj && !this.WinObj.closed && this.WinObj.close();
         return true;
     },
     _nk : function (c)
     {
         var a = this, b = "";
         if (a.m_iWidth) {
             b += ",width=" + a.m_iWidth;
         }
         if (a.m_iHeight) {
             b += ",height=" + a.m_iHeight;
         }
         if (a.m_fResizeable) {
             b += ",resizeable";
         }
         if (b.length > 0) {
             b = b.substr(1);
         }
         if (typeof CustomOpenWindow == "function")
         {
             CustomOpenWindow(c, a.m_sName, b);
         }
         else
         {
             var d = false;
             if (!a.WinObj || a.WinObj.closed) {
                 d = true;
             }
             else if (c == a.WinObj.location.href) {
                 a.WinObj.focus();
             }
             else {
                 a._d0();
                 d = true
             }
             if (d) {
                 a.WinObj = window.open(c, a.m_sName, b);
                 if (!a.WinObj.opener) {
                     a.WinObj.opener = window;
                 }
             }
         }
     },
     _mc : function ()
     {
         if (!this.WinObj || typeof this.WinObj.closed == "unknown" || this.WinObj.closed) {
             return true;
         }
         return false;
     },
     setTimeout : function (b, a)
     {
         window.setTimeout(b, a)
     }
 };
 function _a4(b, c)
 {
     var a = CE("table");
     a.cellPadding = b != null ? b : 0;
     a.cellSpacing = c != null ? c : 0;
     return a
 }
 function _am(e, c, b)
 {
     var d = _a4(), g = _av(_elNewRow(d), e);
     if (c || b) for (var f = d.rows[0], a = 0;
     a < e;
     a++) {
         if (c && c[a]) {
             f.cells[a].id = c[a];
         }
         if (b && b[a]) {
             f.cells[a].className = b[a];
         }
     }
     try {
         return d
     }
     finally {
         d = null;
     }
 }
 function _elNewRow(b, a)
 {
     if (!a) {
         a =- 1;
     }
     if (b != null) {
         return b.insertRow(a);
     }
     return null
 }
 function _elNewRows(d, b, e)
 {
     var c = [];
     if (d && b > 0) {
         for (var a = 0; a < b; a++) {
             c[a] = _elNewRow(d, e + a);
         }
     }
     return c
 }
 function _elNewCell(c, d, b)
 {
     var a = null;
     if (c != null) {
         a = c.insertCell(-1);
         if (d) {
             a.id = d;
         }
         if (b) {
             a.className = b;
         }
     }
     return a
 }
 function _av(d, b)
 {
     var c = [];
     if (d && b > 0) {
         for (var a = 0; a < b; a++) {
             c[a] = _elNewCell(d);
         }
     }
     return c
 }
 UILayout = function (c)
 {
     var b = null, a = this;
     a.table = c ? _a4() : b;
     a.header = c ? _elNewRow(a.table.createTHead()) : b;
     if (c)
     {
         var d = _elNewRow(a.table);
         a.left = _elNewCell(d);
         a.content = _elNewCell(d);
         a.right = _elNewCell(d)
     }
     else {
         a.left = a.content = a.right = b;
     }
     a.footer = c ? _elNewRow(a.table.createTFoot()) : b;
 };
 function _a3()
 {
     return CE("table")
 }
 function _ak(c, b, a)
 {
     if (c)
     {
         var e = c.rows.length;
         if (b >= 0 && b < e)
         {
             var f = e - b;
             if (a == null || a > f) {
                 a = f;
             }
             if (a > 0) {
                 for (var d = b + a - 1; d >= b; d--) {
                     c.rows[d] != null && c.deleteRow(d);
                 }
             }
         }
     }
 }
 var _er0 = {};
 _er0.UI = {};
 _er0.UI.Mode = {
     Standard : 0, Placeholder : 1
 };
 _er0.UI._eu0 = "wlid_errorholder";
 _er0.UI.errPlaceholderClass = "wlid_errorplaceholder";
 _er0.UI.errPlaceholderSuffix = "_placeholder";
 _er0.UI.helpClass = "wlid_helpholder";
 _er0.UI.newError = function (e, c, a)
 {
     a = _rk(a, {});
     var b = _rk(a.className, _er0.UI._eu0), d = _rk(a.pClassName, _er0.UI.errPlaceholderClass);
     switch (e)
     {
         default:
         case _er0.UI.Mode.Standard:
             return _er0.UI.newErrorTable(c, false, b);
         case _er0.UI.Mode.Placeholder:
             return _er0.UI.newErrorTable(c, true, b, d);
     }
 };
 _er0.UI.newErrorTable = function (d, f, g, e)
 {
     var b = _a4(), a = _elNewCell(_elNewRow(b), d, g);
     _a7(a, Visibility.Removed);
     if (f)
     {
         a = _elNewCell(_elNewRow(b), d + _er0.UI.errPlaceholderSuffix, e);
         var c = _a4();
         a.appendChild(c);
         _bj(_elNewCell(_elNewRow(c), null, "cssError"), 1, true)
     }
     return b;
 };
 _er0.UI._eu2 = function (a)
 {
     a = _rk(a, {});
     var c = _rk(a.className, _er0.UI._eu0), b = _rk(a.pClassName, _er0.UI.errPlaceholderClass);
     _er0.UI.hideElementsByClass(c, b)
 };
 _er0.UI.hideAllHelp = function (a)
 {
     a = _rk(a, {});
     var b = _rk(a.className, _er0.UI.helpClass);
     _er0.UI.hideElementsByClass(b)
 };
 _er0.UI.hideElementsByClass = function (e, d)
 {
     var c = _jw(e);
     if (c) {
         for (var a = 0; a < c.length; a++) {
             _a7(c[a], Visibility.Removed);
         }
     }
     if (d) {
         var b = _jw(d);
         if (b) {
             for (var a = 0; a < b.length; a++) {
                 _a7(b[a], Visibility.Default);
             }
         }
     }
 };
 _er0.UI.hideErr = function (d, c)
 {
     var a = GEId(c);
     if (a)
     {
         _a7(a, Visibility.Removed);
         if (d == _er0.UI.Mode.Placeholder) {
             var b = a.parentNode.parentNode.rows[1].cells[0];
             _a7(b, Visibility.Default)
         }
     }
 };
 _er0.UI.showErr = function (d, b, c, a)
 {
     a = _rk(a, {});
     a.isError = true;
     _er0.UI._p5(d, b, c, a)
 };
 _er0.UI.getElement = function (d, c, b)
 {
     b = _rk(b, {});
     var a = _rk(b.el, null);
     if (a)
     {
         switch (d) 
         {
             default:
             case _er0.UI.Mode.Standard:
             case _er0.UI.Mode.Placeholder:
                 a = a.rows[0].cells[0] ;
         }
     }
     else {
         a = GEId(c);
     }
     return a;
 };
 _er0.UI._p5 = function (e, g, c, a)
 {
     a = _rk(a, {});
     var h = _rk(a.isError, false), d = _rk(a.img, null), i = _rk(a.iconOnly, true), b = _er0.UI.getElement(e, 
     g, a);
     if (b)
     {
         _aj(b);
         if (h) {
             b.appendChild(_ba(null, c, d));
         }
         else {
             b.appendChild(_bc(null, c, d));
         }
         _a7(b, Visibility.Default);
         if (e == _er0.UI.Mode.Placeholder) {
             var f = errorEl.parentNode.parentNode.rows[1].cells[0];
             _a7(f, Visibility.Removed)
         }
     }
 };
 _er0.UI.showStatusMsg = function (c, b)
 {
     var a = GEId(b);
     a && _a7(a.childNodes[0].rows[0].cells[1], Visibility.Default)
 };
 _er0.UI.hideStatusMsg = function (c, b)
 {
     var a = GEId(b);
     a && _a7(a.childNodes[0].rows[0].cells[1], Visibility.Hidden)
 };
 function _a8(a, c)
 {
     var d = "cssBtnBorder " + (c ? "cssBtnRest" : "cssBtnDefault"), b = _am(1, null, [d]);
     if (a) {
         if (c) {
             a.style.backgroundImage = "none";
         }
         b.rows[0].cells[0].appendChild(_ax(a))
     }
     try {
         return b
     }
     finally {
         b = null;
     }
 }
 function _a9(d, f, c)
 {
     var a = _am(2), b = a.rows[0].cells[1];
     if (d) {
         var e = a.rows[0].cells[0];
         e.style.verticalAlign = "top";
         e.appendChild(d)
     }
     f && b.appendChild(f);
     if (c) {
         _bj(b, 1);
         b.appendChild(c)
     }
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _bf(b, a)
 {
     var e = "100%", c = _al();
     c.style.position = "relative";
     c.style.width = e;
     if (b)
     {
         var d = _a4();
         d.style.width = e;
         d.style.tableLayout = "fixed";
         c.appendChild(d);
         var i = _elNewCell(_elNewRow(d));
         i.appendChild(b);
         if (a)
         {
             var g = function ()
             {
                 a.style.display = "none";
             },
             h = function ()
             {
                 if (b.value == "") {
                     a.style.display = "";
                 }
             },
             f = function ()
             {
                 EVENT._u40(b)
             };
             EVENT.add(b, EVENT.Name.OnFocus, g);
             EVENT.add(b, EVENT.Name.OnBlur, h);
             EVENT.add(a, EVENT.Name.OnClick, f);
             div = _al();
             div.style.position = "absolute";
             div.style.top = "0px";
             div.style.left = "0px";
             div.style.zIndex = 5;
             div.style.width = e;
             c.appendChild(div);
             appendClass(a, "cssHelpDiv");
             a.style.display = "none";
             div.appendChild(a)
         }
     }
     return c
 }
 function _elWL_TitleDiv(c, b)
 {
     var a = _al(c);
     a.style.fontSize = "12pt";
     a.style.color = "#006E12";
     a.style.paddingBottom = "20px";
     _l7(b) && a.appendChild(_e3(b));
     return a
 }
 function _u81(d, f, e, a)
 {
     var b = "cssIconMapClip clip" + f + "x" + e, c = "iconmap_" + d.toLowerCase();
     a.className = "cssIconMapImg " + c;
     return _a1(null, a, b)
 }
 function _elWL_IconMapBkgnd(d, f, e, c)
 {
     var g = _u81(d, f, e, _aq(null, g_u["c14"])), b = _al();
     b.style.position = "absolute";
     b.style.zIndex =- 1;
     b.appendChild(g);
     var a = _al();
     a.style.position = "relative";
     a.appendChild(b);
     a.appendChild(c);
     return a
 }
 function _bi(c, b, f, d)
 {
     var e = _aq("i2036", g_u["c14"], b, b), a = _u81(c, f, d, e);
     a.className += " cssLogo";
     return a
 }
 function _elLogo(e, d, c, b)
 {
     var a = _aq("i2036", e, d, d, "cssLogo");
     if (c) {
         a.width = c;
     }
     if (b) {
         a.height = b;
     }
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _u96(c, d, b)
 {
     var a = _au(d, "", b, true);
     a.className = "cssHiddenLink";
     a.appendChild(c);
     return a
 }
 function _bc(b, a, c)
 {
     return _bb(b, c, "cssErrorImg", a, "cssWarning")
 }
 function _bg(c, b, d)
 {
     var a = _bb(c, d, "cssErrorImg", b, "cssWarning");
     a.cellSpacing = 2;
     return a
 }
 function _ba(c, b, d)
 {
     var a = _bb(c, d, "cssErrorImg", b, "cssError");
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _bb(d, b, e, c, f)
 {
     var a = _am(2, null, [e, f]);
     if (d) {
         a.id = d;
     }
     exists(b) && a.rows[0].cells[0].appendChild(b);
     exists(c) && a.rows[0].cells[1].appendChild(c);
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _bd(e, f, d, b, c)
 {
     var a = _au(e, f, d);
     a.className = "cssContainerTextSmallest cssBlackLink";
     if (b) {
         a.title = b;
     }
     c && a.appendChild(_elText(c));
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _be(c, d)
 {
     var b = _am(1, null, ["cssBtnBorder cssBtnDefault"]);
     b.rows[0].cells[0].appendChild(c);
     var a = _elNewCell(_elNewRow(c));
     a.style.padding = "0px 18px 2px";
     a.style.cursor = "default";
     a.appendChild(_ax(d));
     return b
 }
 function _elWL_DivLink(g, e, d, f, c)
 {
     var b = _al(g), a = _au(e, f, c);
     a.appendChild(_e3(d));
     b.appendChild(a);
     return b
 }
 var BHO = {}, BHOState = {
     Disabled : 0, Installed : 1, Upgrade : 2, UpgradeBlocked : 4, Supported : 8, BHO60 : 16
 };
 BHO.State = BHOState.Disabled;
 BHO.ClassID = "CLSID:D2517915-48CE-4286-970F-921E881B8C5C";
 BHO.createObj = function ()
 {
     try
     {
         var a = CE("OBJECT");
         a.id = "IDBHOCtrl";
         a.VIEWASTEXT = "";
         a.classid = BHO.ClassID;
         a.style.display = "none";
         return a
     }
     catch (b) {
         return null;
     }
 };
 BHO.getAuthBuffer = function (c, b)
 {
     var a = null;
     try {
         IDBHOCtrl.InitNotForBrowser();
         a = IDBHOCtrl.GetAuthBuffer(c, b)
     }
     catch (d) {
         if (document.location.search.indexOf("activex=0") !=- 1) {
             a = "dummy";
         }
         else {
             a = null;
         }
     }
     return a;
 };
 var WL = {};
 UIDefs = [];
 WA = [];
 WB = 
 {
     Event : "event", User : "user", Type : "type", State : "state", Format : "format", ParentNode : "parentnode", 
     ErrorMode : "errormode"
 };
 WC = {
     NewUser : 1, SavedUser : 2, Mixed : 3
 };
 WD = {
     MouseOff : 1, MouseOn : 2, Active : 3, InActive : 4
 };
 WE = {
     Normal : 1, Small : 2
 };
 WL_UIModType = {
     Get : 1, Create : 2, Apply : 4
 };
 WL.Element = function (d, h)
 {
     function e() {}
     e.prototype = d.prototype;
     for (var f = new e, g = f.get_tagName(), a = _do(g), c = OBJ.Iterator(f, {}), b = 0; b < c.length; b++) if (!exists(a[c[b]])) a[c[b]] = a._tn(c[b]); a.prototype = e; a.prototype.constructor = d; d.apply(a, 
     h);
     return a;
 };
 WL.WG = function (c)
 {
     var a = this;
     a.Content = _rk(c, new WI);
     a.Content._c7(a);
     var b = [];
     a.getWLProp = function (a)
     {
         if (exists(b[a])) {
             return b[a];
         }
         return null;
     };
     a.setWLProp = function (a, c)
     {
         b[a] = c;
     }
 };
 WL.WG.prototype = 
 {
     _n1 : function (a)
     {
         this.setWLProp(WB.Event, EVENT.get(a))
     },
     get_event : function ()
     {
         return this.getWLProp(WB.Event);
     },
     _ma : function ()
     {
         return false;
     },
     _p8 : function () {},
     _jm : function (a)
     {
         return this.Content.get(a, UI.ID, null);
     },
     _jl : function (a)
     {
         if (this.Content._d6(a, UI.ID)) {
             return GEId(this.Content.get(a, UI.ID));
         }
         return null;
     },
     _q5 : function () {}, setFocus : function () {},
     get_tagName : function ()
     {
         return _rk(this.tagName, "");
     }
 };
 var UI = 
 {
     ID : "ui_id", String : "ui_str", URL : "ui_url", Prop : "ui_prop", Image : "ui_img", Flag : "ui_flag", 
     Function : "ui_fn", Input : "ui_input", HTML : "ui_htm", State : "ui_state", Name : "ui_name", Event : "ui_evt", 
     EvState : "ui_eState"
 };
 WL.UIType = function (a, c, b)
 {
     this.name = _rk(a, UI.ID);
     this.tag = _rk(c, "span");
     this.alt = _rk(b, []);
 };
 WL.UIType.prototype = 
 {
     toString : function ()
     {
         return this.name;
     },
     "set" : function (a, c, b)
     {
         arrSet(a[this.name], b, c)
     },
     "get" : function (a, c, b)
     {
         return _c2(a[this.name], b, c);
     },
     _jd : function (b, a)
     {
         return a;
     },
     apply : function (b, c, a)
     {
         exists(a) && a.appendChild(_e3(b.get(c, this, "")));
         return a;
     },
     create : function (a, c)
     {
         var b = CE(this.tag);
         if (exists(a) && _c1(a[this.name], c)) {
             b = this.apply(a, c, b);
         }
         return b;
     }
 };
 WL.UIType._ls = function (a)
 {
     return _c1(WA, a);
 };
 WI = function ()
 {
     var a = this;
     a.modifiers = [];
     a.modifiers[WL_UIModType.Get] = [];
     a.modifiers[WL_UIModType.Apply] = [];
     a.modifiers[WL_UIModType.Create] = [];
 };
 WI.prototype = 
 {
     getModArr : function (b, a, c)
     {
         b = b || "";
         a = a || "";
         !_c1(this.modifiers, [c, a, b]) && arrSet(this.modifiers, [], [c, a, b]);
         return _c2(this.modifiers, [], [c, a, b]);
     },
     pushModifier : function (f, e, c, d)
     {
         for (var b = new OBJ.Iterator(WL_UIModType), a = 0; a < b.length; a++) {
             d & WL_UIModType[b[a]] && this.getModArr(f, e, WL_UIModType[b[a]]).push(c);
         }
     },
     popModifier : function (d, c, e)
     {
         for (var b = new OBJ.Iterator(WL_UIModType), a = 0; a < b.length; a++)
         {
             e & WL_UIModType[b[a]] && this.getModArr(d, c, WL_UIModType[b[a]]).length > 0 && this.getModArr(d, 
             c, WL_UIModType[b[a]]).pop();
         }
     },
     modify : function (f, e, d, g, k)
     {
         var c = null, b = this, a = [b.getModArr(f, e, d)];
         if (k)
         {
             (exists(f) || WL.UIType._ls(e)) && a.push(b.getModArr(c, c, d));
             if (exists(f) && WL.UIType._ls(e)) {
                 a.push(b.getModArr(f, c, d));
                 a.push(b.getModArr(c, e, d))
             }
         }
         for (var i = 0; i < a.length; i++) {
             for (var j = a[i], h = 0; h < j.length; h++) {
                 g = j[h](g, b.owner);
             }
         }
         return g;
     },
     _c7 : function (a)
     {
         this.owner = a;
     },
     _d6 : function (b, a, c)
     {
         if (!_c1(this, [a, b]))
         {
             if (!c) {
                 return false;
             }
             if (WL.UIType._ls(a)) {
                 return this._jd(b, a) != null;
             }
             return this._ik(b) != null
         }
         return true;
     },
     _ik : function (c, b)
     {
         var a = this._il(c, true);
         exists(a) && a.get(this, c, b);
         return b;
     },
     _il : function (f, c)
     {
         for (var d = [], e = new OBJ.Iterator(UI), b = 0; b < e.length; b++) {
             var a = e[b];
             if (_c1(this [UI[a]], f)) {
                 if (c) {
                     return UI[a];
                 }
                 d.push(UI[a])
             }
         }
         if (c) {
             return null;
         }
         return d;
     },
     "set" : function (c, a, d)
     {
         var b = this;
         if (!WL.UIType._ls(a) || _lw(b[a]) || !exists(c) || c.length == 0) {
             return;
         }
         if (!exists(b[a])) {
             b[a] = [];
         }
         WA[a].set(b, c, d)
     },
     remove : function (a, e, d)
     {
         if (d) {
             for (var c = this._il(a), b = 0; b < c.length; b++) {
                 this.set(a, c[b], null);
             }
         }
         else {
             this.set(a, e, null);
         }
     },
     "get" : function (c, b, d)
     {
         var a = this, e = d;
         if (a._d6(c, b))
         {
             if (WL.UIType._ls(b)) {
                 e = WA[b].get(a, c, d);
             }
             else {
                 e = a._ik(c, d);
             }
             else {
                 e = a._jd(c, b, d);
             }
             return a.modify(c, b, WL_UIModType.Get, e, true);
         }
     },
     _jd : function (f, e, d)
     {
         if (WL.UIType._ls(e))
         {
             for (var b = WA[e], c = 0; c < b.alt.length; c++) 
             {
                 var a = b.alt[c];
                 if (WL.UIType._ls(a) && this._d6(f, a)) {
                     return b._jd(a, WA[a].get(this, f, d)) ;
                 }
             }
             return d;
         }
     },
     apply : function (f, a, g)
     {
         var e = null, b = this;
         if (exists(a))
         {
             for (var d = b._il(f), c = 0; c < d.length; c++)
             {
                 if (!_l7(g) || !g.equals(d[c])) 
                 {
                     a = WA[d[c]].apply(b, f, a);
                     a = b.modify(f, d[c], WL_UIModType.Apply, a);
                     a = b.modify(e, d[c], WL_UIModType.Apply, a) 
                 }
                 a = b.modify(f, e, WL_UIModType.Apply, a);
                 a = b.modify(e, e, WL_UIModType.Apply, a);
             }
         }
         return a;
     },
     create : function (c, a, d)
     {
         if (WL.UIType._ls(a))
         {
             var b = this.modify(c, a, WL_UIModType.Create, WA[a].create(this, c), true);
             if (!d) {
                 b = this.apply(c, b, a);
             }
             return b
         }
         return null;
     },
     addFlags : function (a)
     {
         for (var b = 0; _lp(a) && b < a.length; b++) {
             this.set(a[b], UI.Flag, true);
         }
     }
 };
 WJ = function (e, d, c, f)
 {
     var b = this;
     b.m_arrTasks = [];
     if (exists(e))
     {
         for (var a = 0; a < e.length; a++) {
             b.m_arrTasks.push([function (a, b) 
             {
                 this [a] = b;
             },
             [e[a][0], e[a][1]]]);
         }
     }
     if (exists(d))
     {
         for (var a = 0; a < d.length; a++) {
             b.m_arrTasks.push([function (a, b) 
             {
                 this.style[a] = b;
             },
             [d[a][0], d[a][1]]]);
         }
     }
     if (exists(c))
     {
         for (var a = 0; a < c.length; a++) {
             b.m_arrTasks.push([function (b, a) 
             {
                 this [b].apply(this, a) 
             },
             [c[a][0], c[a][1]]]);
         }
     }
     if (exists(f)) {
         b.evtName = f;
         b.stateName = f + "uistate";
     }
 };
 WJ.prototype = 
 {
     _c3 : function (c)
     {
         var a = this;
         if (_lt(c) && _lp(a.m_arrTasks))
         {
             for (var b = 0; b < a.m_arrTasks.length; b++) {
                 a.m_arrTasks[b][0].apply(c, a.m_arrTasks[b][1]);
             }
         }
     },
     _jz : function ()
     {
         if (exists(this.evtName) && exists(this.stateName))
         {
             var a = this.stateName;
             return function (c)
             {
                 var b = EVENT._kq(c);
                 while (exists(b)) {
                     if (exists(b[a])) {
                         return b[a]._c3(b);
                     }
                     b = b.parentNode;
                 }
             }
         }
         return null;
     }
 };
 WJA = function (a, b)
 {
     return WJC("className", a, b);
 };
 WJB = function (a, b)
 {
     if (exists(a)) {
         return new WJ(null, [["display", a[0]], ["visibility", a[1]]], null, b);
     }
     return new WJ;
 };
 WJC = function (a, c, b)
 {
     if (_l7(a)) {
         return new WJ([[a, c]], null, null, b);
     }
     return new WJ;
 };
 WJD = function (a, c, b)
 {
     if (_l7(a)) {
         return new WJ(null, [[a, c]], null, b);
     }
     return new WJ;
 };
 WK = function ()
 {
     this.m_arrCache = [];
 };
 WK.prototype = 
 {
     _ck : function (a, b, e, d)
     {
         if (!_c1(this.m_arrCache, a)) {
             this.m_arrCache[a] = [];
         }
         var c = this.m_arrCache[a];
         if (!_c1(c, b)) {
             c[b] = [];
         }
         c[b][e] = d;
     },
     getState : function (a, c, d)
     {
         var b = this;
         if (_c1(b.m_arrCache, a) && _c1(b.m_arrCache[a], c) && exists(b.m_arrCache[a][c][d])) {
             return b.m_arrCache[a][c][d];
         }
         return new WJ;
     },
     _cy : function (a, c)
     {
         if (_c1(this.m_arrCache, a) && _c1(this.m_arrCache[a], c)) {
             var b = this.m_arrCache[a][c];
             for (sID in b) {
                 !_lw(b[sID]) && b[sID]._c3(GEId(sID));
             }
         }
     }
 };
 WL.UIType.Wc = function ()
 {
     var a = "";
     UIDefs[UI.ID] = function ()
     {
         WL.UIType.apply(this, [UI.ID])
     };
     UIDefs[UI.ID].derivesFrom(WL.UIType);
     UIDefs[UI.ID].prototype.apply = function (c, d, b)
     {
         if (_lt(b)) {
             b.id = c.get(d, UI.ID, a);
             b.PPTestID = b.id
         }
         return b;
     };
     UIDefs[UI.String] = function ()
     {
         WL.UIType.call(this, UI.String, null, [UI.HTML])
     };
     UIDefs[UI.String].derivesFrom(WL.UIType);
     UIDefs[UI.String].prototype.apply = function (c, d, b)
     {
         if (_lt(b))
         {
             if (_lt(b, "input")) {
                 b.value = c.get(d, UI.String, a);
             }
             else {
                 b.appendChild(_e3(c.get(d, UI.String, a)));
             }
             return b;
         }
     };
     UIDefs[UI.URL] = function ()
     {
         WL.UIType.apply(this, [UI.URL, "a"])
     };
     UIDefs[UI.URL].derivesFrom(WL.UIType);
     UIDefs[UI.URL].prototype.apply = function (c, d, b)
     {
         if (_lt(b)) {
             b.href = c.get(d, UI.URL, a);
         }
         return b;
     };
     UIDefs[UI.Prop] = function ()
     {
         WL.UIType.apply(this, [UI.Prop])
     };
     UIDefs[UI.Prop].derivesFrom(WL.UIType);
     UIDefs[UI.Prop].prototype.apply = function (c, b, a)
     {
         return a;
     };
     UIDefs[UI.Image] = function ()
     {
         WL.UIType.apply(this, [UI.Image, "img", [UI.URL]])
     };
     UIDefs[UI.Image].derivesFrom(WL.UIType);
     UIDefs[UI.Image].prototype.create = function (c, d)
     {
         var b = null;
         if (exists(c) && _c1(c[this.name], d))
         {
             var e = "img", f = _u51(_c2(c[this.name], a, d));
             if (f == "png" && IsIEPNGFixNeeded()) {
                 e = "span";
             }
             b = CE(e);
             b = this.apply(c, d, b)
         }
         else {
             b = CE("img");
         }
         return b;
     };
     UIDefs[UI.Image].prototype.apply = function (c, d, b)
     {
         _lt(b) && WKB.preload(b, c.get(d, UI.Image, a));
         return b;
     };
     UIDefs[UI.Flag] = function ()
     {
         WL.UIType.apply(this, [UI.Flag, null, [UI.Function]])
     };
     UIDefs[UI.Flag].derivesFrom(WL.UIType);
     UIDefs[UI.Flag].prototype._jd = function (b, a)
     {
         if (b == UI.Function) {
             return a();
         }
         return a;
     };
     UIDefs[UI.Function] = function ()
     {
         WL.UIType.apply(this, [UI.Function])
     };
     UIDefs[UI.Function].derivesFrom(WL.UIType);
     UIDefs[UI.Input] = function ()
     {
         WL.UIType.apply(this, [UI.Input, "input"])
     };
     UIDefs[UI.Input].prototype = 
     {
         apply : function (c, b, a)
         {
             return a;
         },
         create : function (b, c)
         {
             return CE(this.tag, b.get(c, UI.Name, a), b.get(c, UI.Input, a));
         }
     };
     UIDefs[UI.Input].derivesFrom(WL.UIType);
     UIDefs[UI.HTML] = function ()
     {
         WL.UIType.apply(this, [UI.HTML])
     };
     UIDefs[UI.HTML].prototype.apply = function (c, d, b)
     {
         if (_lt(b)) {
             return createFromHTML(b, c.get(d, UI.HTML, a));
         }
         return b;
     };
     UIDefs[UI.HTML].derivesFrom(WL.UIType);
     UIDefs[UI.State] = function ()
     {
         WL.UIType.apply(this, [UI.State])
     };
     UIDefs[UI.State].prototype.apply = function (b, c, a)
     {
         _lt(a) && b.get(c, UI.State, WJA())._c3(a);
         return a;
     };
     UIDefs[UI.State].derivesFrom(WL.UIType);
     UIDefs[UI.Name] = function ()
     {
         WL.UIType.apply(this, [UI.Name])
     };
     UIDefs[UI.Name].prototype.apply = function (c, d, b)
     {
         if (_lt(b)) {
             b.name = c.get(d, UI.Name, a);
         }
         return b;
     };
     UIDefs[UI.Name].derivesFrom(WL.UIType);
     UIDefs[UI.Event] = function ()
     {
         WL.UIType.apply(this, [UI.Event, "div"])
     };
     UIDefs[UI.Event].prototype = 
     {
         apply : function (h, i, e)
         {
             for (var f = h.get(i, UI.Event, []), g = new OBJ.Iterator(f), a = 0; a < g.length; a++) {
                 for (var d = g[a], c = f[d], b = 0; b < c.length; b++) {
                     EVENT.add(e, d, c[b]);
                 }
             }
             return e;
         },
         "set" : function (a, c, d)
         {
             var b = this.get(a, c, []);
             b.push(d);
             arrSet(a[this.name], b, c)
         }
     };
     UIDefs[UI.Event].derivesFrom(WL.UIType);
     UIDefs[UI.EvState] = function ()
     {
         WL.UIType.apply(this, [UI.EvState, "div"])
     };
     UIDefs[UI.EvState].prototype = 
     {
         apply : function (h, i, c)
         {
             for (var f = h.get(i, UI.EvState, []), g = new OBJ.Iterator(f), d = 0; d < g.length; d++)
             {
                 for (var e = g[d], b = f[e], a = 0; a < b.length; a++) {
                     c[b[a].stateName] = b[a];
                     EVENT.add(c, e, b[a]._jz()) 
                 }
                 return c;
             }
         },
         "set" : function (a, e, c)
         {
             var b = [UI.EvState, e, c.evtName], d = _c2(a, [], b);
             d.push(c);
             arrSet(a, d, b)
         }
     };
     UIDefs[UI.EvState].derivesFrom(WL.UIType);
     for (var d = new OBJ.Iterator(UI), c = 0; c < d.length; c++) {
         var b = UI[d[c]];
         if (_c1(UIDefs, b)) {
             WA[b] = new UIDefs[b]();
         }
     }
 };
 WL.UIType.Wc();
 WI.prototype.clearModifiers = function ()
 {
     for (var b = new OBJ.Iterator(WL_UIModType), a = 0; a < b.length; a++) {
         this.modifiers[WL_UIModType[b[a]]] = [];
     }
 };
 WK.prototype._dx = function (a, c, d)
 {
     var b = this;
     if (_c1(b.m_arrCache, a) && _c1(b.m_arrCache[a], c) && exists(b.m_arrCache[a][c][d])) {
         b.m_arrCache[a][c][d] = new WJ;
     }
 };
 DD = {};
 DDMenu = {};
 DDOption = {};
 DD.Flag = {
     SupportKeyboard : 1
 };
 DD.Event = {
     OnSelectionChanged : "ddselectionchanged"
 };
 DD.Object = function (b)
 {
     var a = this;
     WL.WG.apply(a, [b]);
     a.optionDefault = null;
     a.optionStatic = null;
     a.menu = null;
     a.flags = b.get("dd0", UI.Prop, 0);
     a.dd = true;
     _cg(a);
     if (!_lt(a, "select")) {
         a.ClickHandler = new EVENT.ExternalClickHandler(a.id, "evt_dd_externalclick");
     }
     else {
         EVENT.add(a, EVENT.Name.OnChange, a.addEventHandler(a.evt_select_onchange));
     }
     a.tabIndex = 0;
     EVENT._b2(DD.Event.OnSelectionChanged, a);
     EVENT.add(a, EVENT.Name.OnClick, a.addEventHandler(a.evt_dd_onclick));
     a._is() & DD.Flag.SupportKeyboard && EVENT.add(a, EVENT.Name.OnKeyDown, a.addEventHandler(a.evt_dd_onkeydown))
 };
 DD.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "div";
     },
     _ma : function ()
     {
         return this._lz();
     },
     _p8 : function ()
     {
         this.menu._n1(this.get_event());
         this.menu._p8()
     },
     _q5 : function ()
     {
         var a = this, b = a.get_uiOption();
         if (exists(b))
         {
             _aj(a);
             a._gq(b);
             a.menu._q5();
             a.menu.setWLProp(WB.ParentNode, a);
             a.appendChild(a.menu)
         }
     },
     _dz : function ()
     {
         this.menu.close()
     },
     _is : function ()
     {
         return this.flags;
     },
     _nj : function (c)
     {
         var a = this;
         a.menu._n1(a.get_event());
         a.menu.open();
         if (c)
         {
             var b = a.menu.get_optionAfter(-1, DDOption.Flag.Visible);
             if (exists(b)) {
                 b._n1(a.get_event());
                 b.doFocus()
             }
         }
     },
     optionChanged : function ()
     {
         this._dz();
         this._q5()
     },
     _gq : function () {},
     add : function (a, b)
     {
         this.menu.add(a, b)
     },
     addOptions : function (a)
     {
         this.menu.addOptions(a)
     },
     remove : function (a)
     {
         this.menu.remove(a)
     },
     get_uiOption : function ()
     {
         var a = this;
         if (exists(a.optionStatic)) {
             return a.optionStatic;
         }
         if (exists(a.optionDefault) && a._i1() < 0) {
             return a.optionDefault;
         }
         return a._i2();
     },
     _iu : function ()
     {
         return this.id;
     },
     _i1 : function ()
     {
         return this.menu._i1();
     },
     _ix : function (a)
     {
         return this.menu._ix(a);
     },
     _i0 : function (a)
     {
         return this.menu._i0(a);
     },
     _i2 : function ()
     {
         return this.menu._i0(this.menu._i1());
     },
     _pg : function (b)
     {
         var a = this;
         exists(a.get_event()) && a.menu._n1(a.get_event());
         a.menu._pg(b)
     },
     set_selectedValue : function (c)
     {
         var a = this;
         if (c == a._i2()._jb()) {
             return;
         }
         for (var d = a._ix(), b = 0; b < d; b++) if (a._i0(b)._jb() == c) {
             b != a._i1() && a._pg(b);
             return
         }
     },
     _pc : function (a)
     {
         this.id = a;
         this.ClickHandler = new EVENT.ExternalClickHandler(a, "evt_dd_externalclick");
     },
     _iy : function (b)
     {
         if (_l7(sPropName)) {
             var a = "get_" + b;
             if (_lw(this.menu[a])) {
                 return this.menu[a]();
             }
         }
         return undefined;
     },
     _pe : function (b, c)
     {
         if (_l7(b)) {
             var a = "set_" + sPropName;
             _lw(this.menu[a]) && this.menu[a](c)
         }
     },
     set_optionDefault : function (a)
     {
         if (this.optionDefault != a) {
             this.optionDefault = a;
         }
     },
     set_optionStatic : function (a)
     {
         if (this.optionStatic != a) {
             this.optionStatic = a;
         }
     },
     _lz : function ()
     {
         return this.menu._iz() == true;
     },
     _if : function ()
     {
         return this.menu._if() == true;
     },
     evt_dd_externalclick : function (a)
     {
         this._n1(a);
         this.menu._n1(a);
         this._p8()
     },
     evt_dd_onclick : function (c)
     {
         var b = this;
         b._n1(c);
         var a = EVENT._kq(b.get_event());
         while (_lt(a) && !a.dd) {
             a = a.parentNode;
         }
         if (_lt(a)) {
             a._n1(c);
             a.menu._n1(c);
             if (a._lz()) {
                 a._dz();
             }
             else {
                 a._nj();
             }
         }
         EVENT.disable(b.get_event());
         EVENT.end(b.get_event())
     },
     evt_select_onchange : function (b)
     {
         var a = this;
         a._n1(b);
         a.optionChanged();
         EVENT._im(a, DD.Event.OnSelectionChanged, a.get_event())
     },
     evt_dd_onkeydown : function (e)
     {
         var b = true, a = this;
         a._n1(e);
         var d = EVENT._j3(a.get_event()), c = false;
         if (a._lz())
         {
             switch (d) 
             {
                 case EVENT.Key.ArrowUp:
                 case EVENT.Key.ArrowUp_alt:
                 case EVENT.Key.Escape:
                 case EVENT.Key.Spacebar:
                 case EVENT.Key.Enter:
                     a._dz();
                     c = b;
                     break;
                 case EVENT.Key.ArrowDown:
                 case EVENT.Key.ArrowDown_alt:
                     a._dz(b);
                     c = b;
                     break;
                 case EVENT.Key.ArrowDown:
                 case EVENT.Key.ArrowDown_alt:
                     a._nj(b);
                     c = b ;
             }
         }
         else
         {
             switch (d) 
             {
                 case EVENT.Key.Spacebar:
                 case EVENT.Key.Enter:
                 case EVENT.Key.ArrowDown:
                 case EVENT.Key.ArrowDown_alt:
                     a._nj(b);
                     c = b ;
             }
         }
         if (c) {
             EVENT.end(a.get_event());
             EVENT.disable(a.get_event())
         }
     },
     cevt_menu_onchoose : function (a)
     {
         this._n1(a.event);
         this._dz()
     },
     cevt_menu_onselectionchange : function (b)
     {
         var a = this;
         a._n1(b.event);
         a.optionChanged();
         EVENT._im(a, DD.Event.OnSelectionChanged, a.get_event())
     },
     _bp : function (a)
     {
         this._n1(a.event);
         EVENT._u40(this)
     }
 };
 DD.Object.derivesFrom(WL.WG);
 DDMenu.Flag = {
     ShowSelected : 1, ShowShadow : 2, SupportKeyboard : 4
 };
 DDMenu.Event = 
 {
     OnClick : "menuclick", OnOptionChoose : "menuoptionchoose", OnSelectionChanged : "menuselectionchanged", 
     OnOpen : "menuopen", OnClose : "menuclose"
 };
 DDMenu.Object = function (b)
 {
     var a = this;
     WL.WG.apply(a, [b]);
     a.flags = b.get("dm0", UI.Prop, 0);
     _cg(a);
     EVENT._b2(DDMenu.Event.OnOptionChoose, a);
     EVENT._b2(DDMenu.Event.OnSelectionChanged, a);
     EVENT._b2(DDMenu.Event.OnOpen, a);
     EVENT._b2(DDMenu.Event.OnClose, a);
     _lt(a, "select") && EVENT.add(a, EVENT.Name.OnChange, a.addEventHandler(a.evt_select_onchange));
     a._uiSelectedIndex = null;
     a.selectedIndex =- 1;
     a._uiState = null;
     a.setWLProp(WB.State, WD.InActive);
     a._uiVisibleOptions = null;
     a.options = [];
     a._q5();
     _a7(a, Visibility.Removed)
 };
 DDMenu.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "div";
     },
     _ma : function ()
     {
         return this._uiState == WD.Active;
     },
     _p8 : function ()
     {
         this.set_menuState(WD.InActive)
     },
     _q5 : function ()
     {
         var a = this;
         _aj(a);
         var c = a._eh();
         a.appendChild(c);
         for (var e = false, d = 0; d < a._ix(); d++)
         {
             var b = a.options[d], f = b._is();
             b.set_flagValue(DDOption.Flag.SupportKeyboard, (a._is() & DDMenu.Flag.SupportKeyboard) > 0);
             if (f & DDOption.Flag.Visible)
             {
                 a.attachOptionEvents(b);
                 if (f & DDOption.Flag.Footer) {
                     if (!e) {
                         a._cj(c);
                         e = true
                     }
                     a._ce(b, c);
                     continue
                 }
                 if (!b.get_selected() || a._is() & DDMenu.Flag.ShowSelected) {
                     a._ce(b, c);
                     continue
                 }
             }
         }
         a.stateChanged()
     },
     stateChanged : function ()
     {
         var a = this;
         switch (a.getWLProp(WB.State))
         {
             case WD.Active:
                 if (a._uiState != WD.Active)
                 {
                     _a7(a, Visibility.Visible);
                     a._is() & DDMenu.Flag.ShowShadow && a.showShadow();
                     a._uiState = a.getWLProp(WB.State);
                     EVENT._im(a, DDMenu.Event.OnOpen, a.get_event())
                 }
                 break;
             case WD.InActive:
                 if (a._uiState != WD.InActive)
                 {
                     a._is() & DDMenu.Flag.ShowShadow && a.hideShadow();
                     _a7(a, Visibility.Removed);
                     a._uiState = a.getWLProp(WB.State);
                     EVENT._im(a, DDMenu.Event.OnClose, a.get_event())
                 }
         }
     },
     menuChanged : function ()
     {
         var a = this;
         if (a._uiVisibleOptions != a._ix(DDOption.Flag.Visible) || a._uiSelectedIndex != a.selectedIndex) {
             a.orderOptions();
             a._q5()
         }
         a._uiSelectedIndex = a.selectedIndex;
     },
     open : function (b)
     {
         this.set_menuState(WD.Active);
         if (b) {
             var a = this._i0(0);
             if (exists(a)) {
                 a._n1(this.get_event());
                 a.doFocus()
             }
         }
     },
     close : function ()
     {
         this.set_menuState(WD.InActive)
     },
     _eh : function ()
     {
         return _a4();
     },
     _ce : function () {}, _cj : function () {}, showShadow : function () {}, hideShadow : function () {},
     add : function (a, b)
     {
         this.insertOption(a, b)
     },
     addOptions : function (b)
     {
         for (var a = 0; a < b.length; a++) {
             this.options.push(b[a]);
         }
         this.menuChanged()
     },
     remove : function (a)
     {
         this.removeOption(a)
     },
     attachOptionEvents : function (b)
     {
         var a = this;
         EVENT.add(b, DDOption.Event.OnHover, a.addEventHandler(a.cevt_option_onhover));
         EVENT.add(b, DDOption.Event.OnLeave, a.addEventHandler(a.cevt_option_onleave));
         EVENT.add(b, DDOption.Event.OnChoose, a.addEventHandler(a.cevt_option_onchoose));
         EVENT.add(b, DDOption.Event.OnKeyPushed, a.addEventHandler(a.cevt_option_onkeypush))
     },
     insertOption : function (b, c)
     {
         var a = this, d = b.get_selected();
         if (a.options.length == 0 || !exists(c) || c >= a.options.length) {
             a.options.push(b);
         }
         else {
             a.options.splice(c, 0, b);
         }
         a.menuChanged()
     },
     removeOption : function (a)
     {
         if (_c1(this.options, a)) {
             this.options.splice(a, 1);
             this.menuChanged()
         }
     },
     orderOptions : function ()
     {
         for (var c = [], g = [this.options, [], []], d = [DDOption.Flag.Visible | ~DDOption.Flag.Footer, 
         DDOption.Flag.Visible | DDOption.Flag.Footer, ~DDOption.Flag.Visible], a = 0;
         a < d.length;
         a++) for (var h = d[a], f = g[a], e = 0;
         e < f.length;
         e++)
         {
             var b = f[e];
             if (b._is() & h || a == d.length - 1) {
                 b.set_index(c.length);
                 c.push(b)
             }
             else {
                 g[a + 1].push(b);
             }
         }
         this.options = c;
     },
     keyAction : function (d, e)
     {
         var a = this;
         if (a.get_menuState() == WD.Active)
         {
             var c = false;
             switch (e)
             {
                 case EVENT.Key.ArrowDown:
                 case EVENT.Key.ArrowDown_alt:
                     var b = a.get_optionAfter(d.get_index(), DDOption.Flag.Visible);
                     if (exists(b)) {
                         b._n1(a.get_event());
                         b.doFocus()
                     }
                     c = true;
                     break;
                 case EVENT.Key.ArrowUp:
                 case EVENT.Key.ArrowUp_alt:
                     var b = a.get_optionBefore(d.get_index(), DDOption.Flag.Visible);
                     if (exists(b)) {
                         b._n1(a.get_event());
                         b.doFocus()
                     }
                     else {
                         a.close();
                     }
                     c = true;
                     break;
                 case EVENT.Key.Escape:
                     a.close();
                     c = true
             }
             if (c) {
                 EVENT.end(a.get_event());
                 EVENT.disable(a.get_event())
             }
         }
     },
     _if : function ()
     {
         return this.childNodes.length > 0;
     },
     _is : function ()
     {
         return this.flags;
     },
     _i0 : function (a)
     {
         if (a > -1 && a < this._ix()) {
             return this.options[a];
         }
         return null;
     },
     _iz : function ()
     {
         return this._uiState == WD.Active;
     },
     get_menuState : function ()
     {
         return this._uiState;
     },
     _ix : function (a)
     {
         if (!exists(a) || a == 0) {
             return this.options.length;
         }
         for (var c = 0, b = 0; b < this.options.length && exists(a); b++) {
             if (this.options[b]._is() & a) {
                 c++;
             }
             return c;
         }
     },
     find_selectedIndex : function ()
     {
         for (var a = 0; a < this.options.length; a++) {
             if (this.options[a].get_selected()) {
                 return a;
             }
             return - 1;
         }
     },
     _i1 : function ()
     {
         var a = this;
         if (a.selectedIndex < 0) {
             a.selectedIndex = a.find_selectedIndex();
         }
         return a.selectedIndex;
     },
     set_menuState : function (a)
     {
         if (a != this._uiState) {
             this.setWLProp(WB.State, a);
             this.stateChanged()
         }
     },
     _pg : function (b)
     {
         var a = this;
         if (_l0(b)) if (a.selectedIndex != b && b > -1 && b < a.options.length)
         {
             a.selectedIndex = b;
             a.menuChanged();
             exists(a.get_event()) && EVENT._im(a, DDMenu.Event.OnSelectionChanged, a.get_event())
         }
     },
     get_optionAfter : function (d, c)
     {
         for (var b = d + 1; b < this.options.length; b++) {
             var a = this._i0(b);
             if (exists(a) && a._is() & c) {
                 return a;
             }
         }
         return null;
     },
     get_optionBefore : function (d, c)
     {
         for (var b = d - 1; b > -1; b--) {
             var a = this._i0(b);
             if (exists(a) && a._is() & c) {
                 return a;
             }
         }
         return null;
     },
     evt_select_onchange : function (a)
     {
         this._n1(a);
         this.menuChanged()
     },
     cevt_option_onchoose : function (b)
     {
         var a = this;
         a._n1(b.get_event());
         if (b.get_index() == a._i1()) {
             a.close();
             EVENT.end(a.get_event());
             EVENT.disable(a.get_event())
         }
         else {
             a._pg(b.get_index());
             EVENT._im(a, DDMenu.Event.OnOptionChoose, a.get_event())
         }
     },
     cevt_option_onhover : function (a)
     {
         this._n1(a.get_event());
         EVENT.disable(this.get_event());
         EVENT.end(this.get_event())
     },
     cevt_option_onleave : function (a)
     {
         this._n1(a.get_event());
         EVENT.disable(this.get_event());
         EVENT.end(this.get_event())
     },
     cevt_option_onkeypush : function (a)
     {
         this._n1(a.get_event());
         this.keyAction(a, EVENT._j3(this.get_event()))
     }
 };
 DDMenu.Object.derivesFrom(WL.WG);
 DDOption.Flag = {
     Choosable : 1, Visible : 2, Removable : 4, Footer : 8, SupportKeyboard : 16
 };
 DDOption.DefaultFlag = DDOption.Flag.Choosable | DDOption.Flag.Visible;
 DDOption.Event = 
 {
     OnHover : "optionhover", OnLeave : "optionleave", OnKeyPushed : "optionkeypush", OnRemove : "optionremove", 
     OnChoose : "optionchoose", OnIconChoose : "optioniconclick", OnTextChoose : "optiontextchoose"
 };
 DDOption.Object = function (e, c, g, f, d, h, b)
 {
     var a = this;
     a.value = _l7(c) ? c : c.toString();
     a.text = _l7(e) ? e : "";
     a.tag = g;
     a.selected = f ? true : false;
     a.flags = DDOption.DefaultFlag;
     if (exists(d)) {
         a.flags = a.flags | d;
     }
     a.icon = _rk(h, null);
     a.index =- 1;
     b = _rk(b, new WI);
     WL.WG.apply(a, [b]);
     EVENT._b2(DDOption.Event.OnHover, a);
     EVENT._b2(DDOption.Event.OnLeave, a);
     EVENT._b2(DDOption.Event.OnChoose, a);
     EVENT._b2(DDOption.Event.OnKeyPushed, a);
     a._uiState = null;
     a.setWLProp(WB.State, WD.MouseOff)
 };
 DDOption.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "option";
     },
     _q5 : function ()
     {
         var a = this, c = a.getWLProp(WB.ParentNode);
         if (exists(c))
         {
             var b = null, d = a.getWLProp(WB.State);
             switch (d)
             {
                 case WD.MouseOff:
                 case WD.MouseOn:
                     b = a.createMenuOption();
                     break;
                 case WD.Active:
                     b = a.createDDOption()
             }
             if (exists(b)) {
                 c.appendChild(a.createTabOption(b));
                 a.syncState()
             }
         }
     },
     createOption : function ()
     {
         var a = this.createOptionElement();
         this.getWLProp(WB.State) != WD.Active && this.attachMouseEvents(a);
         return a;
     },
     createTabOption : function (c)
     {
         var a = this;
         if (a.getWLProp(WB.State) != WD.Active)
         {
             var b = a.createTabOptionElement(c);
             a.attachFocusEvents(b);
             a.attachKeyboardEvents(b);
             return b
         }
         return c;
     },
     createOptionElement : function ()
     {
         return document.createElement(this.get_tagName());
     },
     get_optionElement : function ()
     {
         return null;
     },
     createTabOptionElement : function (a)
     {
         return _u96(a, null, this.addEventHandler(this.evt_element_onclick));
     },
     get_tabOptionElement : function ()
     {
         return null;
     },
     createMenuOption : function ()
     {
         return this.createOption();
     },
     createDDOption : function ()
     {
         return this.createOption();
     },
     drawHighlighted : function () {}, drawNormal : function () {},
     appendToElement : function (a)
     {
         if (exists(a) && this.getWLProp(WB.ParentNode) != a) {
             this.setWLProp(WB.ParentNode, a);
             this._q5()
         }
     },
     attachMouseEvents : function (b)
     {
         var a = this;
         if (_lt(b))
         {
             EVENT.add(b, EVENT.Name.OnMouseOver, a.addEventHandler(a.evt_element_onmouseover));
             EVENT.add(b, EVENT.Name.OnMouseOut, a.addEventHandler(a.evt_element_onmouseout));
             a.get_flagValue(DDOption.Flag.Choosable) && EVENT.add(b, EVENT.Name.OnClick, a.addEventHandler(a.evt_element_onclick))
         }
     },
     attachFocusEvents : function (b)
     {
         var a = this;
         if (isDOMFocusable(b))
         {
             EVENT.add(b, EVENT.Name.OnFocus, a.addEventHandler(a.evt_element_onfocus));
             EVENT.add(b, EVENT.Name.OnBlur, a.addEventHandler(a.evt_element_onblur))
         }
     },
     attachKeyboardEvents : function (a)
     {
         this.get_flagValue(DDOption.Flag.SupportKeyboard) && isDOMFocusable(a) && EVENT.add(a, EVENT.Name.OnKeyDown, 
         this.addEventHandler(this.evt_element_onkeydown))
     },
     set_optionState : function (a)
     {
         a != this.get_optionState() && this.setWLProp(WB.State, a)
     },
     get_optionState : function ()
     {
         return this._uiState;
     },
     syncState : function ()
     {
         this._uiState = this.getWLProp(WB.State);
     },
     activate : function ()
     {
         if (this.getWLProp(WB.State) != WD.Active) {
             this.set_optionState(WD.Active);
             this._q5()
         }
     },
     deactivate : function ()
     {
         if (this.getWLProp(WB.State) != WD.InActive) {
             this.set_optionState(WD.MouseOff);
             this._q5()
         }
     },
     doHover : function ()
     {
         var a = this;
         if (exists(a.get_event()) && a.getWLProp(WB.State) != WD.Active) {
             a.set_optionState(WD.MouseOn);
             a.drawHighlighted();
             a.syncState();
             return true
         }
         return false;
     },
     doLeave : function ()
     {
         var a = this;
         if (exists(a.get_event()) && a.getWLProp(WB.State) != WD.Active) {
             a.set_optionState(WD.MouseOff);
             a.drawNormal();
             a.syncState();
             return true
         }
         return false;
     },
     doChoose : function ()
     {
         var a = this.get_tabOptionElement();
         if (!_lt(a)) {
             a = this.get_optionElement();
         }
         if (_lt(a)) {
             return EVENT._u39(a);
         }
         return false;
     },
     doFocus : function ()
     {
         var a = this.get_tabOptionElement() || this.get_optionElement();
         if (a) {
             EVENT._u40(a);
         }
         else {
             return this.doHover();
         }
         return true;
     },
     doBlur : function ()
     {
         var a = this.get_tabOptionElement() || this.get_optionElement();
         if (a) {
             EVENT._u41(a);
         }
         else {
             return this.doLeave();
         }
         return true;
     },
     doKeyPush : function ()
     {
         var a = this, b = EVENT._j3(a.get_event());
         if (a.getWLProp(WB.State) != WD.Active && a.get_flagValue(DDOption.Flag.Choosable) && (b == EVENT.Key.Enter || b == EVENT.Key.Spacebar))
         {
             a.doChoose();
             if (exists(a.get_event())) {
                 EVENT.end(a.get_event());
                 EVENT.disable(a.get_event());
                 return false;
             }
         }
         return true;
     },
     get_flagValue : function (a)
     {
         a = _rk(a, 0);
         return this.flags | a;
     },
     set_flagValue : function (b, c)
     {
         var a = this;
         if (c) {
             a.flags = a.flags | b;
         }
         else {
             a.flags = a.flags | ~b;
         }
     },
     evt_element_onmouseover : function (b)
     {
         var a = this;
         a._n1(b);
         a.doHover() && EVENT._im(a, DDOption.Event.OnHover, a.get_event())
     },
     evt_element_onmouseout : function (b)
     {
         var a = this;
         a._n1(b);
         a.doLeave() && EVENT._im(a, DDOption.Event.OnLeave, a.get_event())
     },
     evt_element_onclick : function (b)
     {
         var a = this;
         a._n1(b);
         a.get_flagValue(DDOption.Flag.OnChoose) && EVENT._im(a, DDOption.Event.OnChoose, a.get_event())
     },
     evt_element_onkeydown : function (b)
     {
         var a = this;
         a._n1(b);
         a.get_flagValue(DDOption.Flag.SupportKeyboard) && a.doKeyPush() && EVENT._im(a, DDOption.Event.OnKeyPushed, 
         a.get_event())
     },
     evt_element_onfocus : function (b)
     {
         var a = this;
         a._n1(b);
         a.doHover() && EVENT._im(a, DDOption.Event.OnHover, a.get_event())
     },
     evt_element_onblur : function (b)
     {
         var a = this;
         a._n1(b);
         a.doLeave() && EVENT._im(a, DDOption.Event.OnLeave, a.get_event())
     },
     _i4 : function ()
     {
         return this.text;
     },
     _jb : function ()
     {
         return this.value;
     },
     _i3 : function ()
     {
         return this.tag;
     },
     get_selected : function ()
     {
         return this.selected;
     },
     _it : function ()
     {
         return this.icon;
     },
     _is : function ()
     {
         return this.flags;
     },
     get_index : function ()
     {
         return this.index;
     },
     _pp : function (a)
     {
         if (_l7(a) && !this.value.equals(a)) {
             this.value = a;
         }
     },
     _pj : function (a)
     {
         this.tag = a;
     },
     set_selected : function (a)
     {
         this.selected = a == true;
     },
     _pk : function (a)
     {
         if (_l7(a) && !this.text.equals(a)) {
             this.text = a;
         }
     },
     _pb : function (a)
     {
         if (this.icon != a) {
             this.icon = a;
         }
     },
     _pd : function (a)
     {
         if (this.image != a) {
             this.image = a;
         }
     },
     _pa : function (a)
     {
         if (this.flags != a) {
             this.flags = a;
         }
     },
     set_index : function (a)
     {
         if (this.index != a) {
             this.index = a;
         }
     }
 };
 DDOption.Object.derivesFrom(WL.WG);
 DD.R3 = {};
 DDMenu.R3 = {};
 DDOption.R3 = {};
 DD.R3.CredPicker = {};
 DD.R3.Object = function (b, c)
 {
     var a = this;
     DD.Object.apply(a, [b]);
     a.menu = WL.Element(DDMenu.R3.Object, [c]);
     b.apply("dd8", a.menu);
     EVENT.add(a.menu, DDMenu.Event.OnOptionChoose, a.addEventHandler(a.cevt_menu_onchoose));
     EVENT.add(a.menu, DDMenu.Event.OnSelectionChanged, a.addEventHandler(a.cevt_menu_onselectionchange));
     a.Content._d6("dd2", UI.Prop) && a.set_optionStatic(a.Content.get("dd2", UI.Prop, null))
 };
 DD.R3.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "div";
     },
     _gq : function (b)
     {
         var a = this;
         if (exists(b))
         {
             var e = a.Content.apply("dd3", _a4()), c = _av(_elNewRow(e), 2), d = _u96(e, null, a.addEventHandler(a.evt_dd_onclick));
             a.Content._d6("dd9", UI.ID) && a.Content.apply("dd9", d);
             a.appendChild(d);
             a.Content.apply("dd6", c[1]);
             if (a.Content._d6("dd7", UI.Image)) {
                 _bj(c[1], 1);
                 c[1].appendChild(a.Content.create("dd7", UI.Image))
             }
             b.setWLProp(WB.ParentNode, c[0]);
             b.set_optionState(WD.Active);
             b._q5()
         }
     }
 };
 DD.R3.Object.derivesFrom(DD.Object);
 DDMenu.R3.Object = function (a)
 {
     DDMenu.Object.apply(this, [a])
 };
 DDMenu.R3.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "div";
     },
     _ce : function (a, b)
     {
         var d = this.Content.apply("dm3", _elNewRow(b)), c = this.Content.apply("dm4", _elNewCell(d));
         a.setWLProp(WB.ParentNode, c);
         a.set_optionState(WD.MouseOff);
         a._q5()
     },
     _cj : function (c)
     {
         if (this.Content._d6("dm5", UI.ID))
         {
             var b = this.Content.apply("dm3", _elNewRow(c));
             EVENT.add(b, EVENT.Name.OnClick, function (a)
             {
                 EVENT.disable(a)
             });
             var a = _elNewCell(b);
             a.colSpan = 3;
             a.appendChild(this.Content.apply("dm5", _al()))
         }
     },
     _eh : function ()
     {
         var a = this.Content.apply("dm2", _a4());
         return a;
     },
     showShadow : function ()
     {
         var a = this;
         if (exists(a.parentNode))
         {
             if (exists(a.shadow)) {
                 _a7(a.shadow, Visibility.Default);
             }
             else {
                 a.shadow = a.Content.apply("dm1", _al());
             }
             a.parentNode.appendChild(a.shadow)
         }
     },
     hideShadow : function ()
     {
         exists(this.shadow) && _a7(this.shadow, Visibility.Removed)
     }
 };
 DDMenu.R3.Object.derivesFrom(DDMenu.Object);
 DDOption.R3.Object = function ()
 {
     DDOption.Object.apply(this, arguments)
 };
 DDOption.R3.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "table";
     },
     createDDOption : function ()
     {
         var a = this, c = a.Content.apply("do1", a.createOption()), d = a.Content.apply("do4", _elNewRow(c)), 
         b = _av(d, 2);
         a.Content.apply("do5", b[0]);
         a.Content.apply("do10", b[1]);
         if (a.Content._d6("do9", UI.Image)) {
             b[0].appendChild(a.Content.create("do9", UI.Image));
         }
         else {
             exists(a._it()) && b[0].appendChild(a.Content.apply("do9", _aq(null, a._it())));
         }
         exists(a._i4()) && b[1].appendChild(a.Content.apply("do12", _as(null, a._i4(), null, true)));
         return c;
     },
     createMenuOption : function ()
     {
         var a = this, c = a.Content.apply("op1", a.createOption()), d = a.Content.apply("op4", _elNewRow(c)), 
         b = _av(d, 2);
         a.Content.apply("op6", b[0]);
         a.Content.apply("op10", b[1]);
         if (a.Content._d6("op7", UI.Image)) {
             b[0].appendChild(a.Content.create("op7", UI.Image));
         }
         else {
             exists(a._it()) && b[0].appendChild(a.Content.apply("op7", _aq(null, a._it())));
         }
         _l7(a._i4()) && b[1].appendChild(a.Content.apply("op12", _as(null, a._i4(), null, true)));
         return c;
     },
     get_optionElement : function ()
     {
         return this._jl("op1");
     },
     get_tabOptionElement : function ()
     {
         return this._jl("op0");
     },
     createTabOptionElement : function (c)
     {
         var b = this, a = _au(null, "", b.addEventHandler(b.evt_element_onclick), true);
         b.Content._d6("op0", UI.ID) && b.Content.apply("op0", a);
         if (_lt(a)) {
             a.appendChild(c);
             return a
         }
         return c;
     },
     drawHighlighted : function ()
     {
         var a = this.get_optionElement();
         _lt(a, "table") && this.Content._d6("op2", UI.State) && this.Content.apply("op2", a)
     },
     drawNormal : function ()
     {
         var a = this.get_optionElement();
         _lt(a, "table") && this.Content._d6("op3", UI.State) && this.Content.apply("op3", a)
     }
 };
 DDOption.R3.Object.derivesFrom(DDOption.Object);
 DD.R3.CredPicker.Event = {
     OnCredNotFound : "cpcrednotfound"
 };
 DD.R3.CredPicker.Object = function ()
 {
     DD.R3.Object.apply(this, arguments)
 };
 DD.R3.CredPicker.Object.prototype = 
 {
     getIndexOfCred : function (b)
     {
         for (var a = 0; a < this._ix(); a++) {
             if (this._i0(a)._i3()._iu() == b) {
                 return a;
             }
             return - 1;
         }
     },
     createCredLink : function (b)
     {
         this._q5();
         var a = _do("a");
         a.href = "#";
         a.credType = b;
         a.credPicker = this;
         a.credIndex = this.getIndexOfCred(b);
         if (a.credIndex < 0) {
             a.credIndex = 0;
         }
         a.doCredSwitch = function (c)
         {
             var a = this;
             if (TILE.Body.Exists(b)) {
                 a.credPicker._n1(c);
                 a.credPicker._pg(a.credIndex)
             }
             else {
                 EVENT._im(a, DD.R3.CredPicker.Event.OnCredNotFound, EVENT.get(c));
             }
             EVENT.end(EVENT.get(c))
         };
         EVENT._b2(DD.R3.CredPicker.Event.OnCredNotFound, a);
         EVENT.add(a, EVENT.Name.OnClick, a.addEventHandler(a.doCredSwitch));
         return a;
     }
 };
 DD.R3.CredPicker.Object.derivesFrom(DD.R3.Object);
 var POSTED_USER_PROPS = [], USER_PROP_USERNAME = "login";
 POSTED_USER_PROPS[USER_PROP_USERNAME] = true;
 var USER_PROP_PASSWORD = "passwd";
 POSTED_USER_PROPS[USER_PROP_PASSWORD] = true;
 var USER_PROP_POST_TYPE = "type";
 POSTED_USER_PROPS[USER_PROP_POST_TYPE] = true;
 var USER_PROP_FED_STATE = "FedState";
 POSTED_USER_PROPS[USER_PROP_FED_STATE] = true;
 var USER_PROP_BHO_TOKEN = "token";
 POSTED_USER_PROPS[USER_PROP_BHO_TOKEN] = true;
 var USER_PROP_OTC_CODE = "OTC";
 POSTED_USER_PROPS[USER_PROP_OTC_CODE] = true;
 var USER_PROP_HIP_SOLUTION = "HIPSolution";
 POSTED_USER_PROPS[USER_PROP_HIP_SOLUTION] = true;
 var USER_PROP_CERT_TOKEN = "ctoken";
 POSTED_USER_PROPS[USER_PROP_CERT_TOKEN] = true;
 var USER_PROP_MESSENGER_STATUS = "mest";
 POSTED_USER_PROPS[USER_PROP_MESSENGER_STATUS] = true;
 var USER_PROP_SQ = "sq";
 POSTED_USER_PROPS[USER_PROP_SQ] = true;
 var USER_PROP_SA = "sa";
 POSTED_USER_PROPS[USER_PROP_SA] = true;
 var USER_PROP_ALTEMAIL = "atleml";
 POSTED_USER_PROPS[USER_PROP_ALTEMAIL] = true;
 var USER_PROP_PHONE = "phone";
 POSTED_USER_PROPS[USER_PROP_PHONE] = true;
 var USER_PROP_SMSCOUNTRY = "smscountry";
 POSTED_USER_PROPS[USER_PROP_SMSCOUNTRY] = true;
 var USER_PROP_SIGNED_IN = "SignedIn", USER_PROP_CERT_THUMB = "CertThumbPrint", USER_PROP_FED_INFO = "FedUserRealmInfo", 
 USER_PROP_FEDERATED = "Federated", USER_PROP_KEEP_ME_SIGNED_IN = "KMSI", USER_PROP_CRED_TYPE = "CredType", 
 USER_PROP_USER_IMAGE = "UserImage", USER_PROP_ERROR_MESSAGE = "ErrorMessage", USER_PROP_OTC_STATE = "OTCState", 
 USER_PROP_OTC_REQUEST_INFO = "OTCRequest", USER_PROP_CID = "cid", USER_PROP_USER_IMAGE_TIMESTAMP = "UserImageTS", 
 USER_PROP_VALIDATION_ERRORS = "ValidationErrors", USER_PROP_DISPLAYPHONE = "DisplayPhone", USER_PROP_HIP_TYPE = "HIPType";
 UserObj = function ()
 {
     var a = null, b = this;
     b.urlAction = a;
     var c = [];
     b.setPostParam = function (d, b)
     {
         if (exists(d)) {
             c[d] = b == "" ? a : b;
         }
     };
     b.submit = function (i, h)
     {
         var g = this, b = document.forms[0];
         b.method = _rk(h, "POST");
         b.target = _rk(h, "_top");
         b.action = g.urlAction;
         for (var f = new OBJ.Iterator(g), e = 0; e < f.length; e++)
         {
             var d = f[e];
             if (POSTED_USER_PROPS[d] == true) {
                 if (!exists(b[d])) {
                     b.appendChild(_ao(a, d, g[d] != "" ? g[d] : a));
                 }
                 else {
                     b[d].value = g[d];
                 }
             }
         }
         f = new OBJ.Iterator(c);
         for (var e = 0; e < f.length; e++) {
             b.appendChild(_ao(a, f[e], c[f[e]]));
         }
         b.submit();
         return true;
     };
     for (var e = 0; exists(arguments) && e < arguments.length; e++) {
         var d = arguments[e];
         if (_c1(d, 0)) {
             b[d[0]] = d[1];
         }
     }
 };
 UserObj.prototype.setAction = function (a)
 {
     this.urlAction = a;
 };
 UserObj.prototype.getAction = function ()
 {
     return this.urlAction;
 };
 UserObj.LoginUser = function (e, d, b, f, c, a)
 {
     return new UserObj([USER_PROP_USERNAME, _rk(e, "")], [USER_PROP_PASSWORD, _rk(d, "")], [USER_PROP_SIGNED_IN, 
     _rk(b, false)], [USER_PROP_KEEP_ME_SIGNED_IN, _rk(f, false)], [USER_PROP_CRED_TYPE, _rk(c, 1)], [USER_PROP_USER_IMAGE, 
     _rk(a, null)])
 };
 FedInfo = function (b)
 {
     JSONInfo.call(this, b);
     for (var d = exists(b) ? b : {}, c = new OBJ.Iterator(FedProp, {}), a = 0; a < c.length; a++) this.props[c[a]] = _rk(d[c[a]], 
     "");
 };
 FedInfo.prototype = 
 {
     doStringReplace : function (a)
     {
         var c = "g", b = this;
         if (a.indexOf(FedToken.Domain) > -1)
         {
             if (b.hasValue(FedProp.Domain)) {
                 a = a.replace(new RegExp(FedToken.Domain, c), b.get(FedProp.Domain).capFirst());
             }
             else if (b.hasValue(FedProp.Brand)) {
                 a = a.replace(new RegExp(FedToken.Domain, c), b.get(FedProp.Brand));
             }
             if (a.indexOf(FedToken.URL) > - 1 && b.hasValue(FedProp.URL)) {
                 a = a.replace(new RegExp(FedToken.URL, c), b.get(FedProp.URL));
             }
             if (b.hasValue(FedProp.Username) && b.get(FedProp.Username)._u54()) 
             {
                 var d = b.get(FedProp.Username)._u52(false, true);
                 if (a.indexOf(FedToken.UserDomain) > - 1) {
                     a = a.replace(new RegExp(FedToken.UserDomain, c), d);
                 }
                 if (a.indexOf(FedToken.FedDomain) > - 1) {
                     a = a.replace(new RegExp(FedToken.FedDomain, c), d) ;
                 }
             }
             if (b.hasValue(FedProp.Brand)) 
             {
                 var e = b.get(FedProp.Brand);
                 if (a.indexOf(FedToken.FedBrand) > - 1) {
                     a = a.replace(new RegExp(FedToken.FedBrand, c), e);
                 }
                 if (a.indexOf(FedToken.FedPartner) > - 1) {
                     a = a.replace(new RegExp(FedToken.FedPartner, c), e) ;
                 }
             }
             return a;
         }
     }
 };
 FedInfo.derivesFrom(JSONInfo);
 var TILE = {};
 TILE.Action = {
     SwitchType : 1, SwitchFormat : 2, SwitchState : 4, SwitchBody : 8
 };
 TILE.Event = 
 {
     OnPreTileBodyChange : "pretilebodychange", OnPostTileBodyChange : "posttilebodychange", OnActivate : "activate"
 };
 TILE.Object = function (h, g, d, f, i, e)
 {
     var c = null, a = this;
     WL.WG.apply(a, [i]);
     a.setWLProp(WB.User, h);
     a._uiType = c;
     a.setWLProp(WB.Type, exists(g) ? g : WC.NewUser);
     if (a.Content.get("j0", UI.Flag, false) && a.getWLProp(WB.Type) == WC.SavedUser) {
         d = WD.Active;
     }
     else if (!exists(d) || a.getWLProp(WB.Type) == WC.NewUser) {
         d = WD.MouseOff;
     }
     a._uiState = c;
     a.setWLProp(WB.State, d);
     a._uiFormat = c;
     a.setWLProp(WB.Format, exists(f) ? f : WE.Normal);
     a._uiCredIndex = c;
     a.m_usernameHasFocus = false;
     a._ew();
     a.ClickHandler = new EVENT.ExternalClickHandler(a._jm("p10"), "evt_Tile_ExternalClick");
     EVENT._b2(TILE.Event.OnPreTileBodyChange, a);
     EVENT._b2(TILE.Event.OnPostTileBodyChange, a);
     EVENT._b2(TILE.Event.OnActivate, a);
     a.m_arrCredOpts = [];
     for (var b = 0; b < e.length; b++) {
         a._s1(e[b]);
         if (e[b]._iu() == h[USER_PROP_CRED_TYPE]) {
             a._uiCredIndex = b;
         }
     }
     a.setWLProp(WB.ErrorMode, a.Content.get("k3", UI.Prop, _er0.UI.Mode.Standard));
     a.Content.apply("p10", a);
     a._q5()
 };
 TILE.Object.prototype = 
 {
     get_tagName : function ()
     {
         return "div";
     },
     _gg : function () {}, _gp : function () {}, _ew : function () {},
     _q5 : function ()
     {
         var b = null, a = this, d = a._jq();
         if (a._uiCredIndex != b && a._uiType != b && a._uiState != b && a._uiFormat != b)
         {
             var e = d._i0(a._uiCredIndex)._i3();
             if (!a._qv(a._uiType, e, false)) {
                 a._oy();
                 return
             }
             var c = d._i2()._i3();
             if (!a._qv(a.getWLProp(WB.Type), c, true)) {
                 a._oy();
                 return
             }
             c.prevIndex = a._uiCredIndex
         }
         _aj(a);
         switch (a.getWLProp(WB.Type)) {
             case WC.NewUser:
                 a._gg();
                 break;
             case WC.SavedUser:
                 a._gp()
         }
         a._q7();
         a._q8();
         a._rc();
         a._rd()
     },
     setFocus : function ()
     {
         var a = this;
         if (a._uiType == WC.NewUser || a._uiState == WD.Active) {
             var b = a._jq()._i2()._i3();
             b && b.setFocus(a.hasError())
         }
         else {
             setElemFocus(a._jl("p29"), "a");
         }
     },
     _qv : function (h, a, e)
     {
         var c = this;
         if (exists(a))
         {
             var g = a.getWLProp(WB.Type), f = a.getWLProp(WB.State);
             a.setWLProp(WB.Type, h);
             a.setWLProp(WB.State, c.getWLProp(WB.State));
             a.setWLProp(WB.User, c.getWLProp(WB.User));
             var b = e ? a._qx() : a._qy();
             g != null && a.setWLProp(WB.Type, g);
             f != null && a.setWLProp(WB.State, f);
             if (!b.AllowSwitch) {
                 return false;
             }
             c._k1(b);
             if (e && b.Action & TILE.Action.SwitchBody)
             {
                 if (b.CredType != a._iu()) {
                     var d = c._iw(b.CredType);
                     if (d < 0) {
                         d = 0;
                     }
                     c._jq()._pg(d);
                     return false 
                 }
                 return true;
             }
         }
         return false;
     },
     submit : function (c)
     {
         var a = this;
         try
         {
             var d = a.getWLProp(WB.User), b = a._jq()._i2()._i3();
             b.setWLProp(WB.Type, a.getWLProp(WB.Type));
             b.setWLProp(WB.User, d);
             b.submit(c)
         }
         catch (e) {
             exists(e.info) && e.info.length > 0 && a._p0(a._jm("p9"), e.info[0][0])
         }
     },
     _k1 : function (a)
     {
         if (exists(a) && exists(a.Action))
         {
             a.Action & TILE.Action.SwitchType && this.setWLProp(WB.Type, switchResult.TileType);
             a.Action & TILE.Action.SwitchFormat && this.setWLProp(WB.Format, switchResult.TileFormat);
             a.Action & TILE.Action.SwitchState && this.setWLProp(WB.State, switchResult.TileState)
         }
     },
     _rc : function ()
     {
         var a = this;
         if (a._uiState != a.getWLProp(WB.State)) {
             a._kn()._cy(a._kt(), a.getWLProp(WB.State));
             a._uiState = a.getWLProp(WB.State);
         }
     },
     _rd : function ()
     {
         var a = this;
         if (a._uiType != a.getWLProp(WB.Type)) {
             a._uiType = a.getWLProp(WB.Type);
         }
     },
     _q8 : function ()
     {
         var a = this;
         if (a._uiFormat != a.getWLProp(WB.Format)) {
             a._uiFormat = a.getWLProp(WB.Format);
         }
     },
     _q7 : function ()
     {
         this._uiCredIndex = this._jq()._i1();
     },
     _oy : function ()
     {
         this._jq()._pg(this._uiCredIndex)
     },
     _kt : function ()
     {
         if (this.getWLProp(WB.Type) == WC.NewUser) {
             return WC.NewUser;
         }
         return this.getWLProp(WB.Format);
     },
     _i9 : function ()
     {
         return this.getWLProp(WB.Type);
     },
     set_tileType : function (a, b)
     {
         if (this._uiType != a) {
             this.setWLProp(WB.Type, a);
             !b && this._q5()
         }
     },
     _i8 : function ()
     {
         return this._uiState;
     },
     _pn : function (b, c)
     {
         var a = this;
         if (a.getWLProp(WB.Type) == WC.NewUser && b != WD.MouseOff) {
             a.setWLProp(WB.State, WD.MouseOff);
             return
         }
         else if (a.Content.get("j5", UI.Flag, false) == true) {
             a.setWLProp(WB.State, a._uiState);
             return
         }
         if (a._uiState != b)
         {
             a.setWLProp(WB.State, b);
             if (!c)
             {
                 a._p8();
                 if (a._uiState == WD.MouseOff && a.getWLProp(WB.State) == WD.MouseOn || a._uiState == WD.MouseOn && a.getWLProp(WB.State) == WD.MouseOff) {
                     a._rc();
                 }
                 else {
                     a._q5();
                 }
             }
         }
     },
     _i7 : function ()
     {
         return this._uiFormat;
     },
     _pm : function (a, b)
     {
         if (this._uiFormat != a) {
             this.setWLProp(WB.Format, a);
             !b && this._q5()
         }
     },
     _i6 : function ()
     {
         return this._uiCredIndex;
     },
     _pl : function (a)
     {
         this._uiCredIndex != a && this._jq()._pg(a)
     },
     _ja : function ()
     {
         return this._jq()._i0(this._uiCredIndex)._i3()._iu();
     },
     _i5 : function ()
     {
         return this._jq()._i2()._i3()._iu();
     },
     _e1 : function ()
     {
         var a = this;
         if (a._jq()._i1() != a._uiCredIndex) if (EVENT._im(a, TILE.Event.OnPreTileBodyChange, a.getWLProp(WB.Event)) != false) {
             a._q5();
             EVENT._im(a, TILE.Event.OnPostTileBodyChange, a.getWLProp(WB.Event))
         }
     },
     _jq : function ()
     {
         var a = this;
         if (!exists(a.m_objCredPicker) || !a.m_objCredPicker._if())
         {
             a.m_objCredPicker = WL.Element(a.Content.get("t1", UI.Prop, DD.R3.Object), [a.Content.get("t2", 
             UI.Prop, null), a.Content.get("t3", UI.Prop, null)]);
             a.m_objCredPicker.addOptions(a.m_arrCredOpts);
             a.m_objCredPicker._pc(a._jm("p0"));
             a.m_objCredPicker._pg(a._uiCredIndex);
             EVENT.add(a.m_objCredPicker, DD.Event.OnSelectionChanged, a.addEventHandler(a._g9))
         }
         exists(a.get_event()) && a.m_objCredPicker._n1(a.get_event());
         return a.m_objCredPicker;
     },
     _iw : function (a)
     {
         return this._jq().getIndexOfCred(a);
     },
     _kn : function ()
     {
         !exists(this.m_objStateHandler) && this._ew();
         return this.m_objStateHandler;
     },
     _ea : function ()
     {
         var a = _elForm(null, this.Content.get("q0", UI.Name), "POST", "_top");
         EVENT.add(a, EVENT.Name.OnSubmit, this.addEventHandler(this._hb));
         return a;
     },
     clearError : function ()
     {
         _er0.UI._eu2();
         this.hasError() && this.Content.remove("o2", UI.String, true)
     },
     hasError : function ()
     {
         return this.Content._d6("o2", UI.String, true);
     },
     _p0 : function (c, a)
     {
         var b = this;
         if (!c) {
             c = b._jm("p9");
         }
         if (!a) {
             a = b.Content.get("o9", UI.String);
         }
         _er0.UI.showErr(b.getWLProp(WB.ErrorMode), c, _lt(a) ? a : _elText(a), {
             img : b.Content.create("p8", UI.Image)
         })
     },
     evt_Tile_ExternalClick : function (a)
     {
         this._n1(a);
         this._e6()
     },
     _by : function ()
     {
         var a = this;
         if (a._uiType == WC.SavedUser && a._uiState != WD.Active) {
             a._pn(WD.Active);
             EVENT._im(a, TILE.Event.OnActivate, a.getWLProp(WB.Event))
         }
     },
     _e6 : function ()
     {
         this._uiType == WC.SavedUser && this._uiState != WD.MouseOff && this._q0()
     },
     _k7 : function ()
     {
         this._pn(WD.MouseOn)
     },
     _q0 : function ()
     {
         this._pn(WD.MouseOff)
     },
     _ma : function ()
     {
         if (this._uiFormat == WE.Small) {
             return false;
         }
         if (this._jq()._lz()) {
             return true;
         }
         if (this._jq()._i2()._i3()._ma()) {
             return true;
         }
         return false;
     },
     _p8 : function ()
     {
         if (this._uiFormat != WE.Small) {
             this._jq()._dz();
             this._jq()._i2()._i3()._p8()
         }
     },
     _tt : function (b, c)
     {
         var a = this;
         a._n1(b);
         if (a._uiType != WC.NewUser && a._uiState != WD.Active)
         {
             if (a.Content.get("j6", UI.Flag, false)) {
                 a.submit();
             }
             else {
                 a._by();
                 a._uiState != WD.Active && c && a.submit()
             }
             a.ClickHandler._ig(b, a.id);
             EVENT.disable(b)
         }
     },
     evt_ProfileImgOnLoad : function (b)
     {
         var a = EVENT._kq(b);
         EVENT.remove(a, EVENT.Name.OnLoad, this.addEventHandler(this.evt_ProfileImgOnLoad));
         if (_lt(a)) {
             a.width = 46;
             a.height = 46;
             this.updateImageTS(a.src)
         }
     },
     _g4 : function ()
     {
         var b = this._jq(), a = b._i2()._i3();
         exists(a.prevIndex) && this._pl(a.prevIndex)
     },
     _hb : function (a)
     {
         this._n1(a);
         this.clearError();
         this.submit();
         EVENT.end(a);
         return false;
     },
     _h6 : function (a)
     {
         this._n1(a);
         this._k7()
     },
     _h5 : function (a)
     {
         this._n1(a);
         !this._ma() && this._q0()
     },
     _h7 : function (a)
     {
         this._tt(a, false)
     },
     _tu : function (a)
     {
         this._tt(a, true)
     },
     _tv : function (a)
     {
         this._tt(a, true)
     },
     _g9 : function (a)
     {
         this._n1(a.event);
         this._e1()
     },
     _hx : function (b)
     {
         var a = this;
         a._n1(b);
         a.Content._d6("r0", UI.Function) && a.Content.get("r0", UI.Function)(a.getWLProp(WB.User));
         _a7(a, Visibility.Removed)
     },
     updateImage : function (b)
     {
         var a = this;
         if (b)
         {
             var c = GEId(a.Content.get("p15", UI.ID));
             EVENT.add(c, EVENT.Name.OnLoad, a.addEventHandler(a.evt_ProfileImgOnLoad));
             WKB.preload(c, b)
         }
         else {
             a.updateImageTS(b);
         }
     },
     updateImageTS : function (d)
     {
         var c = new Date, a = c.getUTCMonth() + 1, b = c.getUTCFullYear() + "-" + (a < 10 ? "0" : "") + a + "-";
         a = c.getUTCDate();
         b = b + (a < 10 ? "0" : "") + a + "T";
         a = c.getUTCHours();
         b = b + (a < 10 ? "0" : "") + a + ":";
         a = c.getUTCMinutes();
         b = b + (a < 10 ? "0" : "") + a + ":";
         a = c.getUTCSeconds();
         b = b + (a < 10 ? "0" : "") + a + "Z";
         this.getWLProp(WB.User)[USER_PROP_USER_IMAGE] = d;
         this.getWLProp(WB.User)[USER_PROP_USER_IMAGE_TIMESTAMP] = b;
         USER.setProfileImgAndTS(this.getWLProp(WB.User)[USER_PROP_USERNAME], d, b)
     },
     _s1 : function (b)
     {
         var a = this, e = a.getWLProp(WB.User), d = b._iu() == e[USER_PROP_CRED_TYPE];
         b._iu() == CRED.Type.Fed && b.Content.set(["v19", EVENT.Name.OnClick], UI.Event, a.addEventHandler(a._g4));
         if (TILE.Body.Exists(CRED.Type.Fed))
         {
             b.Content.set(["u18", EVENT.Name.OnFocus], UI.Event, a.addEventHandler(a._s6));
             b.Content.set(["u18", EVENT.Name.OnBlur], UI.Event, a.addEventHandler(a._s8))
         }
         var c = buildCredPickerOption(b._ju(), b._iu(), b, d, !b._p3() ? ~DDOption.Flag.Visible : null);
         a.m_arrCredOpts.push(c);
         exists(a.m_objCredPicker) && a.m_objCredPicker.add(c)
     }
 };
 TILE.Object.derivesFrom(WL.WG);
 TILE.Object.prototype._ho = function (c)
 {
     var a = this;
     a._n1(c.get_event());
     var d = a.getWLProp(WB.User);
     d[USER_PROP_FED_INFO] = c.response;
     var b = a._iw(CRED.Type.Fed);
     if (b < 0) {
         b = 0;
     }
     var f = a._jq()._i0(b)._i3(), e = f._l9(d);
     if (e) {
         a._pl(b);
         a.clearError();
         return
     }
 };
 TILE.Object.prototype._s8 = function ()
 {
     this.m_usernameHasFocus = false;
 };
 TILE.Object.prototype._s6 = function ()
 {
     var a = this;
     a.m_usernameHasFocus = true;
     if (a.m_objRealmDisc)
     {
         var d = a._jq(), c = d._i2()._i3();
         if (c._iu() == CRED.Type.Fed) if (exists(c.prevIndex)) {
             a._pl(c.prevIndex);
             return
         }
         else for (var b = 0;
         b < d._ix();
         b++)
         {
             var e = d._i0(b);
             if (e.get_flagValue(DDOption.Flag.Choosable) && e.get_flagValue(DDOption.Flag.Visible)) {
                 a._pl(b);
                 return
             }
         }
     }
 };
 TILE.Object.prototype._c5 = function (g, f)
 {
     var a = this;
     if (!exists(a.m_objRealmDisc) && exists(g))
     {
         a.m_objRealmDisc = new RealmDiscHandler(g);
         EVENT.add(a.m_objRealmDisc, AJAX.Event.OnReceiveResponse, a.addEventHandler(a._ho));
         f && f != "" && a.m_objRealmDisc._u94(f);
         for (var e = a._jq(), b = 0; b < e._ix(); b++)
         {
             var d = e._i0(b)._i3();
             d.Content.set(["u18", EVENT.Name.OnBlur], UI.Event, a.m_objRealmDisc.addEventHandler(a.m_objRealmDisc._h4));
             if (e._i1() == b)
             {
                 var c = d._jl("u18");
                 d.Content.apply("u18", c);
                 _lt(c, "input") && !a.m_usernameHasFocus && a.m_objRealmDisc._o6(c.value)
             }
         }
     }
 };
 var CRED = {};
 CRED.Type = 
 {
     Invalid : 0, Pwd : 1, InfoCard : 2, Fed : 3, EID : 4, OTC : 5, OTCReq : 6, OTCConf : 7, MSO : 8, InlineLogin : 9, 
     InlineCollectProofs : 10, InlineIfExists : 15
 };
 TILE.Body = {};
 TILE.Body.R3 = {};
 TILE.Body.M3 = {};
 TILE.Body.W5MQ = {};
 TILE.Body.Error = 
 {
     _er3 : 1e3, _er1 : 1001, _er2 : 1002, SQEmpty : 1003, SAEmpty : 1004, AltEmailInvalid : 1005, PhoneInvalid : 1006, 
     SAContainsName : 1007, AltEmailEqualsName : 1008, PP_E_DB_MEMBERDOESNOTEXIST : "CFFFFC15", PP_E_BAD_PASSWORD : "80041012", 
     PP_E_MISSING_MEMBERNAME : "80041031", PP_E_MISSING_PASSWORD : "80041032", PP_E_FEDERATION_INLINELOGIN_DISALLOWED : "800478AC", 
     PP_E_PE_RULEFALSE : "8004490C", PP_E_MOBILECREDS_PHONENUMBER_BLANK : "80045801", PP_E_MOBILECREDS_PHONENUMBER_TOOSHORT : "80045806", 
     PP_E_MOBILECREDS_PHONENUMBER_TOOLONG : "80045807", PP_E_MOBILECREDS_PHONENUMBER_INVALID : "80045800", 
     PP_E_NAME_BLANK : "80041100", PP_E_EMAIL_INCOMPLETE : "8004110D", PP_E_EMAIL_INVALID : "8004110B", 
     PP_E_NAME_TOO_SHORT : "80041101", PP_E_NAME_TOO_LONG : "80041102", PP_E_NAME_INVALID : "80041103", 
     PP_E_DB_FORBIDDENWORD : "CFFFFF96", PP_E_SECRETQA_NOQUESTION : "8004111C", PP_E_SECRETQA_NOANSWER : "8004111D", 
     PP_E_SA_TOOSHORT : "80041120", PP_E_SA_TOOLONG : "80041121", PP_E_SECRETQ_CONTAINS_SECRETA : "80041165", 
     PP_E_SECRETA_CONTAINS_SECRETQ : "8004117D", PP_E_SA_CONTAINS_MEMBERNAME : "8004116A", PP_E_ALTEMAIL_SAMEASMEMNAME : "8004340A", 
     PP_E_NAME_INVALID : "80041103", PP_E_EMAIL_RIGHT_TOO_LONG : "8004110C", PP_E_NAME_TOO_LONG : "80041102", 
     PP_E_STRONGPROCESS_INVALIDPROOF : "80049C1A", PP_E_ALIAS_AUTH_NOTPERMITTED : "8004788B", PP_E_HIP_VALIDATION_WRONG : "80045505", 
     PP_E_HIP_AUDIO_VALIDATION_WRONG : "80045533"
 };
 TILE.Body.Base = function (a)
 {
     WL.WG.call(this, a);
     this.m_showInPicker = true;
     this.m_arrFields = [];
 };
 TILE.Body.Exists = function (a)
 {
     switch (a)
     {
         case CRED.Type.Pwd:
             return true;
         case CRED.Type.Fed:
             return exists(TILE.Body.R3._fedLoaded);
         case CRED.Type.OTC:
             return exists(TILE.Body.M3._otcLoaded);
         case CRED.Type.OTCReq:
             return exists(TILE.Body.M3._otcRequestLoaded);
         case CRED.Type.OTCConf:
             return exists(TILE.Body.M3._otcConfirmLoaded);
         case CRED.Type.MSO:
             return exists(TILE.Body.M3._MSOLoaded);
         case CRED.Type.InlineLogin:
             return exists(TILE.Body.W5MQ._inlineLoginLoaded);
         case CRED.Type.InlineCollectProofs:
             return exists(TILE.Body.W5MQ._inlineLoginLoaded);
         default:
             return false;
     }
 };
 TILE.Body.Base.prototype = 
 {
     _iu : function () {}, _ju : function () {}, _gf : function () {}, _gn : function () {},
     _go : function () {},
     _qx : function ()
     {
         return {
             AllowSwitch : true
         }
     },
     _qy : function ()
     {
         var a = this;
         if (a.getWLProp(WB.Type) == WC.NewUser) {
             a._d3();
         }
         else {
             a.getWLProp(WB.Type) == WC.SavedUser && a._d4();
         }
         return {
             AllowSwitch : true
         }
     },
     _jy : function ()
     {
         var a = [];
         a[0] = null;
         a[1] = null;
         return a;
     },
     _q5 : function (d, b, c)
     {
         var a = this, e = a.getWLProp(WB.Type);
         switch (e)
         {
             case WC.NewUser:
                 a._gf(d, b, c);
                 break;
             case WC.SavedUser:
                 if (a.getWLProp(WB.State) != WD.Active) {
                     a._go(d, b, c);
                 }
                 else {
                     a._gn(d, b, c);
                 }
         }
     },
     submit : function (b)
     {
         var c = this.getWLProp(WB.Type), a = false;
         switch (c) {
             case WC.NewUser:
                 a = this._qa(b);
                 break;
             case WC.SavedUser:
                 a = this._qc(b)
         }
         return a;
     },
     _qa : function (b)
     {
         var a = this;
         if (a.Content._d6("u37", UI.Function))
         {
             a.setWLProp(WB.User, a._ij(null));
             try {
                 a.Content.get("u37", UI.Function)(a, b)
             }
             catch (c) {
                 exists(c.info) && c.info.length > 0 && a._k0(c.info)
             }
         }
         return false;
     },
     _qc : function (e)
     {
         var a = this;
         if (a.Content._d6("u38", UI.Function))
         {
             a.setWLProp(WB.User, a._ij(null));
             try {
                 a.Content.get("u38", UI.Function)(a, e)
             }
             catch (f)
             {
                 if (exists(f.info) && f.info.length > 0)
                 {
                     var c = new Error;
                     c.info = [];
                     for (var b = 0; b < f.info.length; b++) {
                         var d = a._jy(f.info[b]);
                         exists(d) && c.info.push([d[1], f.info[b]])
                     }
                     throw c;
                 }
             }
         }
         return false;
     },
     _p0 : function (b, a, e)
     {
         var c = this;
         if (!b) {
             b = c.Content.get("u20", UI.ID, "");
         }
         if (!a) {
             a = c.Content.get("u20", UI.String, "");
         }
         var d = c.Content.create("u11", UI.Image);
         d.id += e || "";
         b && a && _er0.UI.showErr(c.getWLProp(WB.ErrorMode), b, _l7(a) ? _elText(a) : a, {
             img : d
         })
     },
     _k0 : function (a)
     {
         if (a && a.length > 0) {
             for (var b = 0; b < a.length; b++) {
                 this.handleError(a[b]);
             }
         }
     },
     handleError : function (c)
     {
         var a = this._jy(c);
         if (exists(a))
         {
             if (exists(a.fields)) {
                 for (var b = 0; b < a.fields.length; b++) {
                     a.fields[b]._u45(MSG.Type.Error, a);
                 }
             }
             else {
                 this._p0(a[0], a[1], c);
             }
             this.setFocus(true);
         }
     },
     _p3 : function ()
     {
         return this.m_showInPicker;
     },
     _j8 : function ()
     {
         var a = this;
         if (a.Content.get("u35", UI.Flag, false))
         {
             if (!exists(a.m_objMessengerControl) || !a.m_objMessengerControl._if())
             {
                 a.m_objMessengerControl = WL.Element(a.Content.get("t4", UI.Prop, DD.R3.Object), [a.Content.get("t5", 
                 UI.Prop, null), a.Content.get("t7", UI.Prop, null)]);
                 a.m_objMessengerControl.addOptions(a.Content.get("t6", UI.Prop, []));
                 var b = a.getWLProp(WB.User);
                 exists(b) && exists(b[USER_PROP_MESSENGER_STATUS]) && a.m_objMessengerControl.set_selectedValue(b[USER_PROP_MESSENGER_STATUS]);
                 a.m_objMessengerControl._pc(a.Content.get("u25", UI.ID, ""));
                 a.m_objMessengerControl._q5()
             }
             exists(a.get_event()) && a.m_objMessengerControl._n1(a.get_event());
             return a.m_objMessengerControl
         }
         return null;
     },
     _ma : function ()
     {
         if (this._j8()) {
             return this._j8()._ma();
         }
         return false;
     },
     _p8 : function ()
     {
         this._j8() && this._j8()._p8()
     },
     _ij : function (a)
     {
         var b = this;
         a = a || b.getWLProp(WB.User) || new UserObj;
         a[USER_PROP_CRED_TYPE] = b._iu();
         if (b.getWLProp(WB.Type) == WC.NewUser)
         {
             var f = GEId(b.Content.get("u18", UI.ID));
             if (_lt(f, "input"))
             {
                 var c = f.value.trim();
                 if (a[USER_PROP_USERNAME] != c && _c2(a, new FedInfo, USER_PROP_FED_INFO).get(FedProp.Username).trim() != c) {
                     a[USER_PROP_FED_INFO] = null;
                     a[USER_PROP_FEDERATED] = null
                 }
                 a[USER_PROP_USERNAME] = c;
             }
         }
         var e = GEId(b.Content.get("u17", UI.ID));
         if (_lt(e, "input")) {
             a[USER_PROP_PASSWORD] = e.value;
         }
         var d = GEId(b.Content.get("u25", UI.ID));
         if (_lt(d)) {
             a[USER_PROP_MESSENGER_STATUS] = d._i2().value;
         }
         return a;
     },
     _d3 : function ()
     {
         var b = this, a = b.getWLProp(WB.User) || new UserObj, e = GEId(b.Content.get("u18", UI.ID));
         if (_lt(e, "input"))
         {
             var c = e.value.trim();
             if (a[USER_PROP_USERNAME] != c && _c2(a, new FedInfo, USER_PROP_FED_INFO).get(FedProp.Username).trim() != c) {
                 a[USER_PROP_FED_INFO] = null;
                 a[USER_PROP_FEDERATED] = null
             }
             a[USER_PROP_USERNAME] = c
         }
         var d = GEId(b.Content.get("u25", UI.ID));
         if (_lt(d)) {
             a[USER_PROP_MESSENGER_STATUS] = d._i2().value;
         }
         b.setWLProp(WB.User, a)
     },
     _d4 : function ()
     {
         var b = this.getWLProp(WB.User) || new UserObj, a = GEId(this.Content.get("u25", UI.ID));
         if (_lt(a)) {
             b[USER_PROP_MESSENGER_STATUS] = a._i2().value;
         }
         this.setWLProp(WB.User, b)
     },
     setFocus : function (c)
     {
         var a = c || this.getWLProp(WB.Type) == WC.SavedUser, b = a ? this._jl("u17") : this._jl("u18");
         setElemFocus(b, "input", !a)
     },
     updateField : function (a)
     {
         if (exists(a) && a.isEnabled())
         {
             try {
                 a._u50();
                 a._u46(MSG.Type.Error) 
             }
             catch (c) {
                 var b = this._jy(c.hr);
                 a._u45(MSG.Type.Error, b) 
             }
         }
     },
     evt_Field_onvaluechange : function (a)
     {
         this.updateField(EVENT._kq(a))
     }
 };
 TILE.Body.Base.derivesFrom(WL.WG);
 TILE.Body.Base.prototype._iu.abstract = true;
 TILE.Body.Base.prototype._ju.abstract = true;
 TILE.Body.Shell = function (a, b)
 {
     TILE.Body.Base.call(this, a);
     this.m_iType = b;
 };
 TILE.Body.Shell.prototype = 
 {
     _ju : function ()
     {
         return this.Content.get("a17", UI.String, "");
     },
     _iu : function ()
     {
         return this.m_iType;
     }
 };
 TILE.Body.Shell.derivesFrom(TILE.Body.Base);
 TILE.Body.R3.Pwd = function (a)
 {
     TILE.Body.Base.call(this, a);
     this._fillUserObj = TILE.Body.Base.prototype._ij;
 };
 TILE.Body.R3.Pwd.prototype = 
 {
     _gf : function (c, e)
     {
         var d = null, a = this, r = a.getWLProp(WB.User), q = a.getWLProp(WB.ErrorMode), b = _av(_elNewRow(c), 
         1);
         b[0].appendChild(_er0.UI.newError(q, a._jm("u20")));
         b = _av(_elNewRow(c), 1);
         a.Content.apply("ff0", b[0]);
         var k = _as(d, d, a._jm("u18"));
         k = a.Content.apply("ff2", k);
         b[0].appendChild(k);
         k = d;
         b = _av(_elNewRow(c), 1);
         a.Content.apply("ff3", b[0]);
         var u = a.Content.create("u18", UI.Input), t = a.Content.apply("ff4", _al());
         b[0].appendChild(_bf(u, t));
         b = _av(_elNewRow(c), 1);
         b[0].appendChild(_er0.UI.newError(q, a._jm("u21")));
         b = _av(_elNewRow(c), 1);
         a.Content.apply("ff5", b[0]);
         b[0].appendChild(a.Content.apply("ff6", _as(d, d, a._jm("u17"))));
         b = _av(_elNewRow(c), 1);
         a.Content.apply("ff7", b[0]);
         b[0].appendChild(a.Content.create("u17", UI.Input));
         if (!a.Content.get("u32", UI.Flag, false))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("ff9", b[0]);
             var o = a.Content.apply("ff10", _al()), p = a.Content.create("u5", UI.URL);
             o.appendChild(p);
             b[0].appendChild(o);
             p = d;
             o = d
         }
         if (a._j8())
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("ff11", b[0]);
             var g = _am(3);
             b[0].appendChild(g);
             g.rows[0].cells[0].appendChild(a.Content.apply("ff12", _as(d, d, a._j8()._iu())));
             _bj(g.rows[0].cells[1], 1, true);
             g.rows[0].cells[2].appendChild(a._j8())
         }
         if (a.Content.get("gg0", UI.Flag, false))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("ff13", b[0]);
             var n = a.Content.create("ff15", UI.Input), s = a.Content.apply("ff14", _as(d, d, a._jm("ff15")));
             b[0].appendChild(_a9(n, s));
             n.defaultChecked = r[USER_PROP_KEEP_ME_SIGNED_IN] == true;
             n.checked = r[USER_PROP_KEEP_ME_SIGNED_IN] == true
         }
         b = _av(_elNewRow(c), 1);
         a.Content.apply("ff20", b[0]);
         var j = _am(2);
         b[0].appendChild(j);
         j.rows[0].cells[0].appendChild(a.Content.create("u16", UI.Input));
         if (a.Content.get("u31", UI.Flag, false))
         {
             a.Content.apply("ff21", j.rows[0].cells[1]);
             j.rows[0].cells[1].appendChild(a.Content.create("u9", UI.Input))
         }
         if (a.Content._d6("u7", UI.ID) || a.Content._d6("u8", UI.ID))
         {
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(a.Content.create(a.Content._d6("u7", UI.ID) ? "u7" : "u8", UI.URL))
         }
         var f = exists(e) ? e.getIndexOfCred(CRED.Type.OTC) :- 1;
         if (f > -1 && exists(e._i0(f)) && e._i0(f).get_flagValue(DDOption.Flag.Visible))
         {
             var m = _a4();
             m.width = "100%";
             var l = _elNewCell(_elNewRow(m));
             a.Content.apply("ff33", l);
             l.appendChild(a.Content.create("ff32", UI.String));
             l = _elNewCell(_elNewRow(m));
             l.appendChild(a.Content.apply("ff29", e.createCredLink(CRED.Type.OTC)));
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(m);
             a.Content.apply("u1", b[0])
         }
         f = exists(e) ? e.getIndexOfCred(CRED.Type.MSO) :- 1;
         if (f > -1 && exists(e._i0(f)) && e._i0(f).get_flagValue(DDOption.Flag.Visible))
         {
             var i = _a4();
             i.width = "100%";
             var h = _elNewCell(_elNewRow(i));
             a.Content.apply("ff36", h);
             h.appendChild(a.Content.create("ff37", UI.String));
             h = _elNewCell(_elNewRow(i));
             h.appendChild(a.Content.apply("ff38", e.createCredLink(CRED.Type.MSO)));
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(i);
             a.Content.apply("ff35", b[0])
         }
     },
     _gn : function (o)
     {
         var f = null, e = "100%", a = this, j = a.getWLProp(WB.User), c = _a4();
         c.style.height = e;
         c.style.width = e;
         o.appendChild(c);
         var b = _av(_elNewRow(c), 1);
         a.Content.apply("ff22", b[0]);
         var m = a.Content.create("u17", UI.Input), l = a.Content.apply("ff8", _al());
         b[0].appendChild(_bf(m, l));
         if (!a.Content.get("u32", UI.Flag, false))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("ff23", b[0]);
             var i = a.Content.apply("ff10", _al());
             i.appendChild(a.Content.create("u5", UI.URL));
             b[0].appendChild(i)
         }
         if (a.Content.get("gg0", UI.Flag, false))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("ff24", b[0]);
             var h = a.Content.create("ff25", UI.Input), n = a.Content.apply("ff14", _as(f, f, a._jm("ff25")));
             b[0].appendChild(_a9(h, n));
             h.defaultChecked = j[USER_PROP_KEEP_ME_SIGNED_IN] == true;
             h.checked = j[USER_PROP_KEEP_ME_SIGNED_IN] == true
         }
         if (a._j8())
         {
             b = _av(_elNewRow(c), 1);
             var d = _am(3), k = a.Content.apply("ff12", _as(f, f, a._j8()._iu()));
             d.rows[0].cells[0].appendChild(k);
             _bj(d.rows[0].cells[1], 1, true);
             d.rows[0].cells[2].appendChild(a._j8());
             a.Content.apply("u3", b[0]);
             d && b[0].appendChild(d)
         }
         b = _av(_elNewRow(c), 1);
         var g = _am(2);
         b[0].appendChild(g);
         var p = a.Content.create("u2", UI.Input);
         g.style.width = e;
         g.rows[0].cells[0].style.width = e;
         g.rows[0].cells[1].appendChild(p)
     },
     _go : function (k)
     {
         var d = null, g = "100%", a = this, i = a.getWLProp(WB.User), c = _a4();
         c.style.width = g;
         k.appendChild(c);
         var b = d;
         if (a._l3(i))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("ff30", b[0]);
             b[0].appendChild(a.Content.apply("ff28", _as()))
         }
         if (a._j8())
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("u3", b[0]);
             var f = _am(3);
             b[0].appendChild(f);
             var j = a.Content.apply("ff12", _as(d, d, a._j8()._iu()));
             f.rows[0].cells[0].appendChild(j);
             _bj(f.rows[0].cells[1], 1, true);
             f.rows[0].cells[2].appendChild(a._j8())
         }
         b = _av(_elNewRow(c), 1);
         var e = _am(2);
         b[0].appendChild(e);
         var h = d;
         if (a._ts(i)) {
             a.Content.apply("ff31", b[0]);
             h = a.Content.create("u39", UI.Input)
         }
         else {
             h = a.Content.create("u4", UI.Input);
         }
         e.style.width = g;
         e.rows[0].cells[0].style.width = g;
         e.rows[0].cells[1].appendChild(h);
         if (a._ts(i)) {
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(a.Content.apply("u40", _as()))
         }
     },
     _ts : function (a)
     {
         return a[USER_PROP_SIGNED_IN] == true;
     },
     _l3 : function (a)
     {
         return !this._ts(a) && a[USER_PROP_BHO_TOKEN];
     },
     _ij : function (a)
     {
         var b = this;
         a = b._fillUserObj(a);
         var c = null;
         if (b.getWLProp(WB.Type) == WC.NewUser) {
             c = b._jl("ff15");
         }
         else {
             c = b._jl("ff25");
         }
         if (_lt(c, "input")) {
             a[USER_PROP_KEEP_ME_SIGNED_IN] = c.checked;
         }
         return a;
     },
     _jy : function (c)
     {
         var b = this, a = [];
         switch (c)
         {
             case TILE.Body.Error._er3:
                 a[0] = b._jm("u20");
                 a[1] = b.Content.get("ii17", UI.String);
                 break;
             case TILE.Body.Error._er1:
                 a[0] = b._jm("u21");
                 a[1] = b.Content.get("ii18", UI.String);
                 break;
             default:
                 a[0] = null;
                 a[1] = null
         }
         return a;
     },
     _ju : function ()
     {
         return this.Content.get("ii19", UI.String, "");
     },
     _qy : function ()
     {
         var a = this;
         if (a.getWLProp(WB.Type) == WC.NewUser)
         {
             a._d3();
             if (a.m_fHasUsernameExample) {
                 a.getWLProp(WB.User)[USER_PROP_USERNAME] = "";
             }
             var b = a._jl("ff15");
             if (_lt(b, "input")) {
                 a.getWLProp(WB.User)[USER_PROP_KEEP_ME_SIGNED_IN] = b.checked;
             }
         }
         else {
             a.getWLProp(WB.Type) == WC.SavedUser && a._d4();
         }
         return {
             AllowSwitch : true
         }
     },
     _iu : function ()
     {
         return CRED.Type.Pwd;
     }
 };
 TILE.Body.R3.Pwd.derivesFrom(TILE.Body.Base);
 TILE.R3 = {};
 TILE.R3.Object = function ()
 {
     TILE.Object.apply(this, arguments)
 };
 TILE.R3.Object.prototype = 
 {
     _gg : function ()
     {
         var a = this, f = a.getWLProp(WB.ErrorMode), l = a._ea();
         a.appendChild(l);
         var j = _a4();
         j.style.width = "100%";
         var o = _elNewRows(j, 2), m = [_elNewCell(o[0]), _elNewCell(o[1])];
         l.appendChild(j);
         var d = [], c = [], b = 0, g = a.Content.apply("p1", _a4());
         m[0].appendChild(g);
         if (a.Content.get("j4", UI.Flag, false))
         {
             b = d.length;
             d.push(_elNewRow(g));
             c.push(_av(d[b], 1));
             c[b][0].colspan = 2;
             a.Content.apply("p27", c[b][0]);
             c[b][0].appendChild(_bc(a._jm("p5"), a.Content.create("n0", UI.String), a.Content.create("p4", 
             UI.Image)))
         }
         b = d.length;
         d.push(_elNewRow(g));
         c.push(_av(d[b], 1));
         c[b][0].colSpan = 2;
         var n = _er0.UI.newError(f, a._jm("p9"));
         c[b][0].appendChild(n);
         b = d.length;
         d.push(_elNewRow(g));
         c.push(_av(d[b], 1));
         c[b][0].colSpan = 2;
         c[b][0].appendChild(_er0.UI.newError(f, a._jm("p6")));
         a.hasError() && _er0.UI.showErr(f, null, a.Content.create("o2", UI.String), {
             img : a.Content.create("p8", UI.Image), el : n
         });
         var h = _a4();
         h.style.width = "100%";
         m[1].appendChild(h);
         var i = a._jq(), e = i._i2()._i3();
         if (e)
         {
             e.setWLProp(WB.Type, WC.NewUser);
             e.setWLProp(WB.User, a.getWLProp(WB.User));
             e.setWLProp(WB.ErrorMode, f);
             var k = null;
             if (!a.Content.get("j1", UI.Flag, false) && i._ix(DDOption.Flag.Visible) > 1) {
                 k = i;
             }
             e._gf(h, k)
         }
     },
     _gp : function ()
     {
         var a = this, e = a.getWLProp(WB.ErrorMode);
         if (a.getWLProp(WB.State) == WD.Active)
         {
             var f = _er0.UI.newError(e, a._jm("p9"));
             a.appendChild(f);
             a.hasError() && _er0.UI.showErr(e, null, a.Content.create("o2", UI.String), {
                 img : a.Content.create("p8", UI.Image), el : f
             })
         }
         var b = a.Content.apply("p11", _al());
         if (a.getWLProp(WB.Format) == WE.Small) {
             EVENT.add(b, EVENT.Name.OnClick, a.addEventHandler(a._tu));
         }
         else {
             EVENT.add(b, EVENT.Name.OnClick, a.addEventHandler(a._h7));
         }
         a.appendChild(b);
         var g = a._ea();
         b.appendChild(g);
         var d = _a4();
         d.style.width = "100%";
         g.appendChild(d);
         var c = _elNewCell(_elNewRow(d));
         a.Content.apply("p12", c);
         var h = a._kn().getState(a._kt(), a.getWLProp(WB.State), a._jm("p12"));
         h._c3(c);
         a.appendChild(_ag());
         if (a.getWLProp(WB.State) == WD.Active) {
             c.appendChild(a._d8());
         }
         else
         {
             EVENT.add(b, EVENT.Name.OnMouseOver, a.addEventHandler(a._h6));
             EVENT.add(b, EVENT.Name.OnMouseOut, a.addEventHandler(a._h5));
             c.appendChild(a._eo())
         }
     },
     _eo : function ()
     {
         var a = this, f = a.getWLProp(WB.Format) == WE.Small, e = _a4();
         e.style.width = "100%";
         var b = _av(_elNewRow(e), 3);
         b[2].appendChild(a._ez(f));
         if (!f)
         {
             b[0].rowSpan = 2;
             a.Content.apply("p14", b[0]);
             b[0].appendChild(a._ex());
             var g = _al();
             g.style.width = "16px";
             b[1].rowSpan = 2;
             b[1].appendChild(g);
             b[2].style.padding = "4px 0px 8px";
             b[2].style.verticalAlign = "top";
             b[2].style.width = "100%";
             var c = new UILayout;
             c.table = e;
             c.content = _elNewCell(_elNewRow(e), a._jm("p25"));
             c.content.style.verticalAlign = "bottom";
             c.footer = _elNewCell(_elNewRow(e));
             var h = a._kn().getState(a._kt(), a.getWLProp(WB.State), a._jm("p25"));
             h._c3(c.content);
             var d = a._jq()._i2()._i3();
             if (d)
             {
                 d.setWLProp(WB.Type, WC.SavedUser);
                 d.setWLProp(WB.State, a.getWLProp(WB.State));
                 d.setWLProp(WB.User, a.getWLProp(WB.User));
                 d.setWLProp(WB.ErrorMode, a.getWLProp(WB.ErrorMode));
                 d._q5(c.content, a._jq(), c)
             }
         }
         return e;
     },
     _d8 : function ()
     {
         var g = "100%", b = this, f = _a4();
         f.style.width = g;
         var e = _a4();
         e.style.width = g;
         _elNewCell(_elNewRow(f)).appendChild(e);
         var a = _av(_elNewRow(e), 3);
         a[0].rowSpan = 2;
         b.Content.apply("p14", a[0]);
         a[0].appendChild(b._ex());
         var j = _al();
         j.style.width = "16px";
         a[1].rowSpan = 2;
         a[1].appendChild(j);
         a[2].style.padding = "4px 0px 8px";
         a[2].style.verticalAlign = "top";
         a[2].style.width = g;
         a[2].appendChild(b._ez());
         var c = new UILayout;
         c.table = f;
         c.content = _elNewCell(_elNewRow(e));
         c.footer = _elNewCell(_elNewRow(f));
         var h = b._jq(), d = h._i2()._i3();
         if (d)
         {
             d.setWLProp(WB.Type, WC.SavedUser);
             d.setWLProp(WB.State, b.getWLProp(WB.State));
             d.setWLProp(WB.User, b.getWLProp(WB.User));
             var i = null;
             if (!b.Content.get("j1", UI.Flag, false) && h._ix(DDOption.Flag.Visible) > 1) {
                 i = h;
             }
             d._q5(c.content, i, c)
         }
         return c.table;
     },
     _em : function ()
     {
         var a = this, b = a.Content.apply("p21", _au(null, null, a.addEventHandler(a._hx), true)), c = a._kn().getState(a._kt(), 
         a.getWLProp(WB.State), a.Content.get("p21", UI.ID));
         c._c3(b);
         b.appendChild(a.Content.create("p23", UI.Image));
         return b;
     },
     _ex : function ()
     {
         var a = this.Content.create("p15", UI.Image);
         if (a.src != "") {
             a.style.visibility = "";
         }
         var c = this.Content.apply("p32", _elWL_IconMapBkgnd("UT", 46, 46, a)), b = _elWL_IconMapBkgnd("Tile-Image-Background", 
         61, 61, c);
         b.className = "cssImage";
         return b;
     },
     _ez : function (e)
     {
         var a = this, d = _a4();
         d.style.width = "100%";
         var b = _av(_elNewRow(d), 2);
         b[0] = a.Content.apply("p16", b[0]);
         b[0].width = "100%";
         var g = a.Content.apply("p29", _au(null, "", a.addEventHandler(a._tv), true)), c = a.Content.apply("p28", 
         _as()), f = a._kn().getState(a._kt(), a.getWLProp(WB.State), a.Content.get("p28", UI.ID));
         f._c3(c);
         c.appendChild(g);
         b[0].appendChild(c);
         if (!a.Content.get("j3", UI.Flag, false))
         {
             if (e) {
                 a.Content.apply("p30", b[1]);
             }
             else {
                 a.Content.apply("p26", b[1]);
             }
             b[1].appendChild(a._em())
         }
         return d;
     },
     _ew : function ()
     {
         var d = "p28", b = "p12", c = "p21", a = this;
         a.m_objStateHandler = new WK;
         var e = WJB(Visibility.Default), h = WJB(Visibility.Hidden), f = WJA("cssUserBtnHoverR3"), j = WJA("cssUserBtnR3"), 
         i = WJA(""), g = WJA("cssUsernameHover");
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOn, a._jm(c), e);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOn, a._jm("p25"), e);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOn, a._jm(b), f);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOn, a._jm(d), g);
         a.m_objStateHandler._ck(WE.Small, WD.MouseOn, a._jm(c), e);
         a.m_objStateHandler._ck(WE.Small, WD.MouseOn, a._jm(b), f);
         a.m_objStateHandler._ck(WE.Small, WD.MouseOn, a._jm(d), g);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOff, a._jm(c), h);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOff, a._jm("p25"), h);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOff, a._jm(b), j);
         a.m_objStateHandler._ck(WE.Normal, WD.MouseOff, a._jm(d), i);
         a.m_objStateHandler._ck(WE.Small, WD.MouseOff, a._jm(c), h);
         a.m_objStateHandler._ck(WE.Small, WD.MouseOff, a._jm(b), j);
         a.m_objStateHandler._ck(WE.Small, WD.MouseOff, a._jm(d), i);
         a.m_objStateHandler._ck(WE.Normal, WD.Active, a._jm(c), e);
         a.m_objStateHandler._ck(WE.Normal, WD.Active, a._jm(b), f);
         a.m_objStateHandler._ck(WE.Normal, WD.Active, a._jm(d), g);
         a.m_objStateHandler._ck(WE.Small, WD.Active, a._jm(b), f)
     }
 };
 TILE.R3.Object.derivesFrom(TILE.Object);
 var LoginMode = 
 {
     Invalid : 0, NewUser : 1, SavedUser : 2, ForceCredtype : 3, LWAConfirm : 4, GenericError : 5, ForceSignin : 6, 
     OTS : 7, HIPLogin : 8, LockOut : 9, InviteBlocked : 10, SwitchUser : 11, LoginLight : 12, ServiceBlocked : 13, 
     IDPFailed : 14, IDPInvalidDomain : 15, InlineNewUser : 16, InlineHIPLogin : 17, InlineCollectProofs : 18, 
     InlineFinish : 19, InlineActiveXDisabled : 20, InlineBase : 21, InlineIfExists : 24
 };
 WL0 = function (b)
 {
     var a = this;
     a.loginMode = b;
     a.users = [];
     a.users[b] = [];
     a.tiles = [];
     a.tiles[b] = [];
     a.ui = [];
     a.props = [];
 };
 WL0.prototype = 
 {
     add : function () {}, remove : function () {}, _f3 : function () {}, _gt : function () {},
     _f4 : function () {},
     getTiles : function ()
     {
         return this.tiles[this.loginMode];
     },
     setTiles : function (a)
     {
         this.tiles[this.loginMode] = a;
     },
     getUsers : function ()
     {
         return this.users[this.loginMode];
     },
     getAllUsers : function ()
     {
         return this.users;
     },
     setUsers : function (a)
     {
         this.users[this.loginMode] = a;
     },
     storeUsers : function (b, a)
     {
         this.users[_rk(b, this.loginMode)] = a;
     },
     hide : function ()
     {
         var b = this;
         if (_c1(b.tiles, b.loginMode))
         {
             for (var c = b.getTiles(), a = 0; a < c.length; a++) {
                 _a7(c[a], Visibility.Removed);
                 c[a].clearError() 
             }
             for (var d = new OBJ.Iterator(b.ui), a = 0; a < d.length; a++) {
                 _a7(b.ui[d[a]], Visibility.Removed);
             }
         }
     },
     _j9 : function ()
     {
         return this.loginMode;
     },
     copyTo : function (a)
     {
         var b = this;
         if (!_c1(b.users, a._j9())) {
             b.users[a._j9()] = [];
         }
         a.users = b.users;
         if (!_c1(b.tiles, a._j9())) {
             b.tiles[a._j9()] = [];
         }
         a.tiles = b.tiles;
         a.ui = b.ui;
         a.props = b.props;
     },
     _qw : function ()
     {
         return true;
     },
     draw : function ()
     {
         var a = this;
         a._f3.apply(a, arguments);
         a._gt.apply(a, arguments);
         a._f4.apply(a, arguments);
         var b = a.getTiles();
         b.length > 0 && b[0].setFocus()
     },
     createOrShow : function (b, c, d, e)
     {
         var a = this;
         if (!_c1(a.ui, b) && _lw(c)) {
             a.ui[b] = c.apply(a, d);
             e.appendChild(a.ui[b])
         }
         _c1(a.ui, b) && _a7(a.ui[b], Visibility.Default)
     }
 };
 LM_Invalid = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.Invalid))
 };
 LM_Invalid.derivesFrom(WL0);
 LM_GenericError = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.GenericError))
 };
 LM_GenericError.prototype = {
     _gt : function (a)
     {
         _bm(a)
     }
 };
 LM_GenericError.derivesFrom(WL0);
 LM_SavedUser = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.SavedUser));
     this.props["MaxNormalTiles"] = k_iMaxNormalTiles;
     this.props["MaxAllTiles"] = k_iMaxAllTiles;
 };
 LM_SavedUser.prototype = 
 {
     _f3 : function (c)
     {
         var b = "idLWAHeader9", a = "idSUHeader9";
         this.createOrShow(a, _ci, [a], GEId("titleTD"));
         g_fAuthLite && this.createOrShow(b, _mt, [b], c)
     },
     _gt : function (e, f)
     {
         var b = this, d = b.getUsers(), c = b.getTiles();
         if (c.length == 0 && d.length > 0) {
             for (var a = 0; a < d.length; a++) {
                 if (c.length >= b.props["MaxAllTiles"]) {
                     break;
                 };
             }
         }
         else if (c.length >= b.props["MaxNormalTiles"]) {
             b.add(_rk(f, e), d[a], a + 1, WE.Small);
         }
         else {
             b.add(e, d[a], a + 1, WE.Normal);
         }
         else {
             for (var a = 0; a < c.length; a++) {
                 _a7(c[a], Visibility.Default);
             }
         }
     },
     _f4 : function (e)
     {
         var d = "idSUOther9", c = "idMoreHeader9", a = this, b = a.getTiles().length > a.props["MaxNormalTiles"];
         b && a.createOrShow(c, _s5, [c], e);
         a.createOrShow(d, _qh, [d, false, b], e)
     },
     add : function (b, f, d, e)
     {
         var a = _dl(d, f, WC.SavedUser, null, e, _dc(d)), c = this.getTiles();
         if (exists(b))
         {
             if (a.getWLProp(WB.State) == WD.Active && c.length > 0) {
                 b.insertBefore(a, c[0]);
             }
             else {
                 b.appendChild(a);
             }
             c.push(a);
         }
     },
     remove : function (i, k)
     {
         var h = "MaxAllTiles", g = "MaxNormalTiles", a = this, j = a.getUsers(), d = a.getTiles(), c = exists(i) ? [i] : _s2(j, 
         false, USER_PROP_USERNAME, k, true);
         if (c.length > 0)
         {
             j.splice(c[0], 1);
             if (_c1(d, c[0]))
             {
                 var f = d.splice(c[0], 1)[0];
                 exists(f.parentNode) && f.parentNode.removeChild(f);
                 f = null;
                 if (d.length >= a.props[g] && c[0] < a.props[g])
                 {
                     var b = GEId("idSwitchToOTC");
                     if (!exists(b)) {
                         b = GEId("idMoreHeader9");
                     }
                     if (!exists(b)) {
                         b = GEId("idSUOther9");
                     }
                     if (exists(b.parentNode))
                     {
                         var e = d[a.props[g] - 1];
                         exists(e.parentNode) && e.parentNode.removeChild(e);
                         e._pm(WE.Normal, false);
                         b.parentNode.insertBefore(e, b)
                     }
                 }
                 c[0] < a.props[h] && d.length > a.props[h] - 1 && _a7(d[a.props[h] - 1], Visibility.Default)
             }
         }
     }
 };
 LM_SavedUser.derivesFrom(WL0);
 LM_LWAConfirm = function (a)
 {
     LM_SavedUser.call(this, _rk(a, LoginMode.LWAConfirm));
     this.getUsers()[0] = new UserObj.LoginUser(g_sDisplayMembername, "", true, true, CRED.Type.Pwd, _ks(null, 
     g_sDisplayMembername));
 };
 LM_LWAConfirm.prototype = 
 {
     setUsers : function (a)
     {
         if (_c1(a, 0)) {
             this.getUsers()[0] = a[0];
             this.getUsers()[0][USER_PROP_SIGNED_IN] = true;
         }
     },
     _f4 : function (b)
     {
         var a = "idSUOther9";
         this.createOrShow(a, _qh, [a, true], b)
     }
 };
 LM_LWAConfirm.derivesFrom(LM_SavedUser);
 LM_NewUser = function (d)
 {
     var b = false;
     WL0.call(this, _rk(d, LoginMode.NewUser));
     var a = new UserObj.LoginUser(g_sPrefillMembername, "", b, b, CRED.Type.Pwd, ""), c = g_fHasErrorCode ? g_sLoginOptions == LoginOption.RememberPWD : b;
     if (g_sRealmDiscoveryJSON != "")
     {
         a = new UserObj.LoginUser(g_sPrefillMembername, "", b, b, CRED.Type.Fed);
         a[USER_PROP_FED_INFO] = new FedInfo(new JSONObject(g_sRealmDiscoveryJSON));
         a[USER_PROP_FEDERATED] = true
     }
     else if (g_fHasErrorCode)
     {
         a = new UserObj.LoginUser(g_sPrefillMembername, "", b, c, _mk(g_iCredPostType, CRED.Type.Pwd), 
         "");
         a[USER_PROP_ERROR_MESSAGE] = g_sErrorText;
         a[USER_PROP_VALIDATION_ERRORS] = g_arrErrors
     }
     this.setUsers([a]);
 };
 LM_NewUser.prototype = 
 {
     _f3 : function ()
     {
         var a = "idSUHeader9";
         this.createOrShow(a, _ci, [a], GEId("titleTD"))
     },
     _gt : function (c)
     {
         var d = this, a = d.getTiles(), b = d.getUsers()[0], f = a.length > 0;
         if (f)
         {
             var h = a[0].getWLProp(WB.User);
             if (b[USER_PROP_USERNAME] == h[USER_PROP_USERNAME] && b[USER_PROP_CRED_TYPE] == h[USER_PROP_CRED_TYPE])
             {
                 _a7(a[0], Visibility.Default);
                 var g = a[0]._jq()._i2()._i3();
                 if (g._iu() == b[USER_PROP_CRED_TYPE] && g._jl("u18").value == b[USER_PROP_USERNAME]) {
                     return;
                 }
             }
         }
         var e = _dl(g_sNewUserID, b, WC.NewUser, null, null, _dc(g_sNewUserID));
         if (f && c == a[0].parentNode) {
             c.insertBefore(e, a[0]);
             c.removeChild(a[0])
         }
         else {
             c.appendChild(e);
         }
         d.setTiles([e]);
         d._c5()
     },
     add : function (b, a)
     {
         var c = this.getUsers();
         b = _rk(b, "");
         a = _rk(a, CRED.Type.Pwd);
         if (c.length > 0 && c[0][USER_PROP_USERNAME] == b && c[0][USER_PROP_CRED_TYPE] == a) {
             return;
         }
         c[0] = new UserObj.LoginUser(b, "", false, false, a, "");
     },
     remove : function ()
     {
         var b = this;
         b.users[b._j9()].pop();
         var a = b.tiles[b._j9()].pop();
         exists(a) && exists(a.parentNode) && a.parentNode.removeChild(a);
         a = null;
     },
     _c5 : function ()
     {
         for (var b = [], e = g_sNonFedDom.split(","), a = 0; a < e.length; a++) {
             b.push(RealmDiscCache.PartialDomainMatch(e[a]));
         }
         for (var d = g_NonFedDoms.split(","), a = 0; a < d.length; a++) {
             b.push(RealmDiscCache.TertiaryDomainMatch(d[a]));
         }
         for (var f = new OBJ.Iterator(g_DO), a = 0; a < f.length; a++) {
             b.push(RealmDiscCache.ExactDomainMatch(f[a]));
         }
         this.props["RDCache"] = new RealmDiscCache(g_sRDCache, b, 4, [4], 5, false, _oa);
         var c = this.getTiles()[0];
         if (exists(c)) {
             c._s1(_dd("0fed"));
             c._c5(this.props["RDCache"], g_sRealmDiscoveryJSON)
         }
     }
 };
 LM_NewUser.derivesFrom(WL0);
 LM_ForceCredType = function (a)
 {
     LM_NewUser.call(this, _rk(a, LoginMode.ForceCredtype));
     _pq(g_iForcedCredtype);
     g_Creds[g_iForcedCredtype] = true;
     this.add(g_sPrefillMembername, g_iForcedCredtype)
 };
 LM_ForceCredType.derivesFrom(LM_NewUser);
 var LoginModeObj = [LM_Invalid, LM_NewUser, LM_SavedUser, LM_ForceCredType, LM_LWAConfirm, LM_GenericError];
 function _oa(a)
 {
     _pw(k_sWLOpt_RDCache, a._jg())
 }
 LM_ForceSignIn = function (a)
 {
     LM_SavedUser.call(this, _rk(a, LoginMode.ForceSignin));
     this.getUsers().push(new UserObj.LoginUser(g_sDisplayMembername, "", false, false, CRED.Type.Pwd, 
     _ks(null, g_sDisplayMembername)))
 };
 LM_ForceSignIn.prototype = 
 {
     setUsers : function (b)
     {
         if (_c1(b, 0)) {
             this.getUsers()[0] = b[0];
         }
         var a = this.getUsers()[0];
         if (g_iForcedCredtype > CRED.Type.Invalid)
         {
             if (g_iForcedCredtype == CRED.Type.Pwd || g_iForcedCredtype == CRED.Type.Fed) {
                 a[USER_PROP_CRED_TYPE] = g_iForcedCredtype;
             }
             if (g_fHasErrorCode && !exists(a[USER_PROP_ERROR_MESSAGE])) {
                 a[USER_PROP_ERROR_MESSAGE] = g_sErrorText;
             }
         }
     },
     _f3 : function (c)
     {
         var b = "idSUForce9", a = "idSUHeader9";
         this.createOrShow(a, _ci, [a], GEId("titleTD"));
         this.createOrShow(b, _qf, [b, this.getUsers()[0][USER_PROP_CRED_TYPE]], c)
     },
     _f4 : function (b)
     {
         var a = "idSUOther9";
         this.createOrShow(a, _qh, [a, true], b)
     }
 };
 LM_ForceSignIn.derivesFrom(LM_SavedUser);
 LM_OTS = function (b)
 {
     LM_NewUser.call(this, _rk(b, LoginMode.OTS));
     this.add("", CRED.Type.Pwd);
     if (g_fHasErrorCode)
     {
         var a = new UserObj.LoginUser(g_sPrefillMembername, "", false, false, CRED.Type.Pwd, "");
         a[USER_PROP_ERROR_MESSAGE] = g_sErrorText;
         this.setUsers([a])
     }
 };
 LM_OTS.derivesFrom(LM_NewUser);
 LM_HIPLogin = function (b)
 {
     var a = this;
     LM_NewUser.call(a, _rk(b, LoginMode.HIPLogin));
     a.users[a._j9()][0][USER_PROP_ERROR_MESSAGE] = g_fSecondHIP ? g_s["a15"] : g_s["a16"];
     a.users[a._j9()][0][USER_PROP_CRED_TYPE] = CRED.Type.Pwd;
 };
 LM_HIPLogin.prototype = {
     _c5 : function () {}
 };
 LM_HIPLogin.derivesFrom(LM_NewUser);
 LM_LockOut = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.LockOut))
 };
 LM_LockOut.prototype = {
     _gt : function (a)
     {
         _sl(a)
     }
 };
 LM_LockOut.derivesFrom(WL0);
 LM_SwitchUser = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.SwitchUser))
 };
 LM_SwitchUser.prototype = 
 {
     _f3 : function ()
     {
         var a = "idSUHeader9";
         this.createOrShow(a, _ci, [a], GEId("titleTD"))
     },
     _gt : function (a)
     {
         _tp(a, g_sDisplayMembername)
     }
 };
 LM_SwitchUser.derivesFrom(WL0);
 LM_InviteBlocked = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.InviteBlocked))
 };
 LM_InviteBlocked.prototype = {
     _gt : function (a)
     {
         _tq(a, g_sDisplayMembername, g_s["b34"])
     }
 };
 LM_InviteBlocked.derivesFrom(LM_SwitchUser);
 LM_ServiceBlocked = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.ServiceBlocked))
 };
 LM_ServiceBlocked.prototype = {
     _gt : function (a)
     {
         _tq(a, g_sDisplayMembername, g_s["b46"])
     }
 };
 LM_ServiceBlocked.derivesFrom(LM_SwitchUser);
 LM_IDPFailed = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.IDPFailed))
 };
 LM_IDPFailed.prototype = {
     _gt : function (a)
     {
         _tr(a, g_sDisplayMembername, g_sFedPartner)
     }
 };
 LM_IDPFailed.derivesFrom(LM_SwitchUser);
 LM_IDPInvalidDomain = function (a)
 {
     WL0.call(this, _rk(a, LoginMode.IDPInvalidDomain))
 };
 LM_IDPInvalidDomain.prototype = {
     _gt : function (a)
     {
         _tq(a, g_sDisplayMembername, g_s["b47"], g_s["b48"])
     }
 };
 LM_IDPInvalidDomain.derivesFrom(LM_SwitchUser);
 LM_LightSU = function (b)
 {
     var a = this;
     LM_SavedUser.call(a, _rk(b, LoginMode.LoginLight));
     a._isSU = true;
     a.users[a._j9()].push(new UserObj.LoginUser(g_sDisplayMembername, "", false, false, CRED.Type.Pwd, 
     _ks(null, g_sDisplayMembername)))
 };
 LM_LightSU.prototype = {
     _f3 : function () {}, _f4 : function () {}, _c5 : function () {}
 };
 LM_LightSU.derivesFrom(LM_SavedUser);
 LM_LightNU = function (a)
 {
     LM_NewUser.call(this, _rk(a, LoginMode.LoginLight))
 };
 LM_LightNU.prototype = 
 {
     setUsers : function (a)
     {
         this.users[this._j9()] = _lp(a) ? a : [];
         this.add(g_sPrefillMembername, CRED.Type.Pwd)
     },
     _f3 : function () {}, _f4 : function () {}, _c5 : function () {}
 };
 LM_LightNU.derivesFrom(LM_NewUser);
 LM_LoginLight = function (a)
 {
     if (g_sDisplayMembername != "" && !g_fHasErrorCode) {
         return new LM_LightSU(_rk(a, LoginMode.LoginLight));
     }
     else {
         return new LM_LightNU(_rk(a, LoginMode.LoginLight));
     }
 };
 LoginModeObj[LoginMode.ForceSignin] = LM_ForceSignIn;
 LoginModeObj[LoginMode.OTS] = LM_OTS;
 LoginModeObj[LoginMode.LockOut] = LM_LockOut;
 LoginModeObj[LoginMode.HIPLogin] = LM_HIPLogin;
 LoginModeObj[LoginMode.InviteBlocked] = LM_InviteBlocked;
 LoginModeObj[LoginMode.SwitchUser] = LM_SwitchUser;
 LoginModeObj[LoginMode.IDPFailed] = LM_IDPFailed;
 LoginModeObj[LoginMode.IDPInvalidDomain] = LM_IDPInvalidDomain;
 LoginModeObj[LoginMode.LoginLight] = LM_LoginLight;
 function detectAdvancedLoginMode()
 {
     if (g_iLWAState == 1) {
         return new LM_LWAConfirm;
     }
     if (g_fHIPLogin)
     {
         if (g_fTooManyHIPAttempts) {
             return new LM_LockOut;
         }
         else {
             return new LM_HIPLogin;
         }
         if (g_fOverTheShoulder) {
             return new LM_OTS;
         }
         if (g_fSwitchUser) {
             return new LM_SwitchUser;
         }
         if (g_fServiceBlocked) {
             return new LM_ServiceBlocked;
         }
         if (g_fInviteBlocked) {
             return new LM_InviteBlocked;
         }
         if (g_fIDPFailed)
         {
             if (g_fIDPInvalidDomain) {
                 return new LM_IDPInvalidDomain;
             }
             else {
                 return new LM_IDPFailed;
             }
             if (g_fHasErrorCode && g_sNewUser == "1" || g_sRealmDiscoveryJSON != "") {
                 return new LM_NewUser;
             }
             if (g_fForcedSignin) {
                 return new LM_ForceSignIn;
             }
             if (g_iForcedCredtype > CRED.Type.Invalid) {
                 return new LM_ForceCredType;
             }
             return new LM_NewUser;;
         }
     }
 }
 Object.prototype.equals = function (b)
 {
     var c = this;
     if (!b) {
         return false;
     }
     for (var a in b)
     {
         if (!exists(c[a]) || c[a] != b[a]) {
             return false;
         }
         for (var a in c) {
             if (!exists(b[a]) || c[a] != b[a]) {
                 return false;
             }
             return true;;
         }
     }
 };
 String.prototype.ltrim = function ()
 {
     return this.replace(/^\s+/, "");
 };
 String.prototype.rtrim = function ()
 {
     return this.replace(/\s+$/, "");
 };
 String.prototype.capFirst = function ()
 {
     return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
 };
 String.prototype.doubleSplit = function (h, i, f)
 {
     var b = [];
     if (_l7(h))
     {
         var c = this.split(h);
         if (i)
         {
             for (var d = 0; d < c.length; d++) 
             {
                 var g = c[d], a = g.split(i);
                 if (a.length <= 1) {
                     b.push(g);
                 }
                 else if (a.length == 2)
                 {
                     if (f) {
                         b[a[0]] = a[1];
                     }
                     else {
                         b.push(a[0]);
                         b.push(a[1]) 
                     }
                     else if (f) {
                         b[a[0]] = a;
                     }
                     else {
                         for (var e = 0; e < a.length; e++) {
                             b.push(a[e]) ;
                         }
                     }
                 }
             }
         }
         else {
             b = c;
         }
     }
     return b;
 };
 function _l1(a)
 {
     return "object".equals(typeof a, true)
 }
 function _c0(a, b)
 {
     if (!_c1(a, b) || a[b] == false) {
         return false;
     }
     return true
 }
 var g_u = [], g_urlSSL = "undefined" != typeof srf_uSSL ? srf_uSSL : null, g_urlNoSSL = "undefined" != typeof srf_uNoSSL ? srf_uNoSSL : null, 
 g_urlLoginPageReload = "undefined" != typeof srf_uLogin ? srf_uLogin : "", g_urlResetPW = "undefined" != typeof srf_uPwRst ? srf_uPwRst : "", 
 ImgServer = "undefined" != typeof srf_uImgPath ? srf_uImgPath : "", AltImgServer = "undefined" != typeof srf_uAltImgPath ? srf_uAltImgPath : "", 
 g_urlContactCSS = "http://g.live.com/3WCEN-ALL/1?ErrorCode=1000&ErrorId=1000&Partner=0";
 g_u["c14"] = ImgServer + "iconmap.png";
 g_u["c0"] = ImgServer + "WindowsLive.png";
 g_u["c13"] = ImgServer + "WLIDLogo.gif";
 g_u["c5"] = "undefined" != typeof srf_uAbout ? srf_uAbout : "";
 g_u["c6"] = "undefined" != typeof srf_uPrivacy ? srf_uPrivacy : "";
 g_u["c9"] = "undefined" != typeof srf_uHelp ? srf_uHelp : "";
 g_u["c10"] = "undefined" != typeof srf_uFeedback ? srf_uFeedback : "";
 g_u["c11"] = "undefined" != typeof srf_uTerms ? srf_uTerms : "";
 g_u["c12"] = "undefined" != typeof srf_uLinkDisclaimer ? srf_uLinkDisclaimer : "";
 g_u["hh2"] = g_urlResetPW;
 g_u["hh6"] = g_urlSSL;
 g_u["hh7"] = g_urlNoSSL;
 var LoginOption = 
 {
     Empty : "0", RememberPWD : "1", RememberMe : "2", NothingChecked : "3", OtherSavedUsers : "4", ActiveUser : "5"
 },
 PostType = 
 {
     Invalid : "0", Password : "11", Infocard : "12", Federation : "13", EID : "14", SHA1 : "15", SHA1Hash : "16", 
     OTC : "17", LWAConsent : "30"
 },
 FedProp = 
 {
     Username : "Login", Domain : "DomainName", URL : "AuthURL", Brand : "FederationBrandName", GlobalVersion : "FederationGlobalVersion", 
     Tier : "FederationTier", Group : "SiteGroup"
 },
 FedToken = 
 {
     Domain : "#~#partnerdomain#~#", URL : "#~#partnerurl#~#", UserDomain : "#~#userdomain#~#", FedDomain : "#~#FederatedDomainName_LS#~#", 
     FedBrand : "#~#fedbrandname#~#", FedPartner : "#~#FederatedPartnerName_LS#~#"
 },
 HeaderCBMode = {
     Default : 0, CustomJS : 1, IFrame : 2
 },
 ProductCBMode = {
     Default : 0, CustomJS : 1, IFrame : 2, Select : 3, Upsell : 4
 },
 MessengerOption = {
     DontSignIn : 0, Online : 1, Offline : 2, Busy : 3, Away : 6
 },
 MSPreProp = {
     Username : 1, CID : 2, TimeStamp : 3, ImgURL : 4
 },
 InlineLoginStep = {
     CredGathering : 1, CollectProofs : 2, Finish : 3, IfExists : 4
 },
 InlineLoginAction = {
     Back : 1, Next : 2
 },
 InterruptType = {
     None : 0, CollectPhone : 1, CollectAlt : 2, CollectSQSA : 4
 },
 k_sCookieDelim = "; ", k_sWLOptCookieName = "WLOpt", k_sWLOptCookieDelim = "&", k_sWLOpt_NoRememberMe = "nrme", 
 k_sWLOpt_SkipUsername = "skip", k_sWLOpt_AlwaysSSL = "ssl", k_sWLOpt_CredType = "credtype", k_sWLOpt_ACT = "act", 
 k_sWLOpt_RDCache = "RDCache", k_sWLOpt_OTCJS = "otcjs", k_sWLOpt_FedJS = "fedjs", k_sWLPerfCookieName = "wlidperf", 
 k_sPresCookieName = "pres", k_sMSPPreCookieName = "MSPPre", k_iMaxNormalTiles = 4, k_iMaxAllTiles = 10, 
 k_iMaxUsers = 20, g_iHeaderCobrandMode = "undefined" != typeof srf_iHdrCBMode ? srf_iHdrCBMode : HeaderCBMode.Default, 
 g_iProductCobrandMode = "undefined" != typeof srf_iPrdCBMode ? srf_iPrdCBMode : ProductCBMode.Default, 
 g_urlHeaderIFrame = "undefined" != typeof srf_uHdrIFrame ? srf_uHdrIFrame : "", g_urlProductIFrame = "undefined" != typeof srf_uPrdIFrame ? srf_uPrdIFrame : "", 
 g_urlCustomJS = "undefined" != typeof srf_uCustomJS ? srf_uCustomJS : "", g_sBrandHeader = "undefined" != typeof srf_sBrHdr ? srf_sBrHdr : "", 
 g_sBrandTitle = "undefined" != typeof srf_sBrTtl ? srf_sBrTtl : "", g_sBrandSubtitle = "undefined" != typeof srf_sBrSTtl ? srf_sBrSTtl : "", 
 g_urlBrandImage = "undefined" != typeof srf_uBrImg ? srf_uBrImg : "", g_bIsHIPError = "undefined" != typeof srf_bIsHIPError ? srf_bIsHIPError : false, 
 g_urlHipSrc = "undefined" != typeof srf_uHIPSrc ? srf_uHIPSrc : "", g_urlHIPType = "undefined" != typeof srf_uHIPType ? srf_uHIPType : "", 
 g_fValProp = "undefined" != typeof srf_fValProp ? srf_fValProp : false, g_fSignup = "undefined" != typeof srf_fSignup ? srf_fSignup : false, 
 g_fRtoL = "undefined" != typeof srf_fRtoL ? srf_fRtoL : false, g_fPopupUI = "undefined" != typeof srf_fIsPopupUI ? srf_fIsPopupUI : false, 
 g_sHeaderCobrandLogo = "undefined" != typeof srf_uCobrandingLogo ? srf_uCobrandingLogo : "", g_urlUpsellLink = "undefined" != typeof srf_sUpLnk ? srf_sUpLnk : "", 
 g_sUpsellTxt1 = "undefined" != typeof srf_sUpTxt1 ? srf_sUpTxt1 : "", g_sUpsellTxt2 = "undefined" != typeof srf_sUpTxt2 ? srf_sUpTxt2 : "", 
 g_oTemplate = {};
 if (typeof srf_oTemplate != "undefined") {
     g_oTemplate = srf_oTemplate;
 }
 var g_oFooterURL = {};
 if (typeof srf_oFooter_URL != "undefined") {
     g_oFooterURL = srf_oFooter_URL;
 }
 var g_oFooterLeft = {};
 if (typeof srf_oFooter_LeftNewItem != "undefined") {
     g_oFooterLeft = srf_oFooter_LeftNewItem;
 }
 var g_oFooterRight = {};
 if (typeof srf_oFooter_RightNewItem != "undefined") {
     g_oFooterRight = srf_oFooter_RightNewItem;
 }
 var g_urlPost = "undefined" != typeof srf_uPost ? srf_uPost : "", g_urlReturn = "undefined" != typeof srf_uRet ? srf_uRet : "", 
 g_urlRegistration = "undefined" != typeof srf_uReg ? srf_uReg : "", g_urlSwitchUser = "undefined" != typeof srf_uSwUsr ? srf_uSwUsr : "", 
 g_urlPrefillUserTile = "undefined" != typeof srf_uUT ? srf_uUT : "", g_urlPrivacy = "undefined" != typeof srf_uPrivacy ? srf_uPrivacy : "", 
 g_urlBHOUpgrade = "undefined" != typeof srf_uBHOUpg ? srf_uBHOUpg : "", g_urlPreload = "undefined" != typeof srf_uPreload ? srf_uPreload : "", 
 g_sQueryString = "undefined" != typeof g_QS ? g_QS : "", g_fForcedSignin = "undefined" != typeof srf_fForce ? srf_fForce : false, 
 g_fHasErrorCode = "undefined" != typeof srf_fError ? srf_fError : false, g_sErrorText = "undefined" != typeof srf_sErr ? srf_sErr : "", 
 g_arrErrors = "undefined" != typeof srf_aErr ? srf_aErr : [], g_sErrorUrl = "undefined" != typeof srf_sErrUrl ? srf_sErrUrl : "", 
 g_fHasGenericError = "undefined" != typeof srf_fGnErr ? srf_fGnErr : false, g_fEnableInstr = "undefined" != typeof srf_fEnInstr ? srf_fEnInstr : false, 
 g_fShowMessenger = "undefined" != typeof srf_fShowMsgr ? srf_fShowMsgr : false, g_fIsInvite = "undefined" != typeof srf_fIsInvite ? srf_fIsInvite : false, 
 g_sNewUser = "undefined" != typeof srf_sNUsr ? srf_sNUsr : "", g_sLoginOptions = "undefined" != typeof srf_sLOpt ? srf_sLOpt : "", 
 g_sDisplayMembername = "undefined" != typeof srf_sDispMn ? srf_sDispMn : "", g_sPrefillMembername = "undefined" != typeof srf_sPreMn ? srf_sPreMn : "", 
 g_sPrefillCookie = "undefined" != typeof srf_sPreCk ? srf_sPreCk : null, g_iForcedCredtype = "undefined" != typeof srf_iForcedCT ? srf_iForcedCT : 0, 
 g_iCredPostType = "undefined" != typeof srf_iCredPostType ? srf_iCredPostType : 0, g_sDefaultLoginOptions = "undefined" != typeof srf_sDLOpt ? srf_sDLOpt : "3", 
 g_sLCID = "undefined" != typeof srf_sLCID ? srf_sLCID : "1033", g_fSecondHIP = "undefined" != typeof srf_fSecHIP ? srf_fSecHIP : false, 
 g_sFlowToken = _s7("undefined" != typeof srf_sFT ? srf_sFT : ""), g_iPwRstStr = "undefined" != typeof srf_iPwRstStr ? srf_iPwRstStr : 0, 
 g_fOTCEnabled = "undefined" != typeof srf_fOTCEnabled ? srf_fOTCEnabled : false, g_fOTCCredPickEnabled = "undefined" != typeof srf_fShowOTCCredPick ? srf_fShowOTCCredPick : false, 
 g_fHasFedUser = false, g_RDHashEnabled = "undefined" != typeof g_RDHash ? g_RDHash : false, g_sFedURL = "undefined" != typeof srf_sFedURL ? srf_sFedURL : "", 
 g_sFedPartner = "undefined" != typeof srf_sFedPartner ? srf_sFedPartner : "", g_aFedTierVersions = "undefined" != typeof srf_aFedTiers ? srf_aFedTiers : 0, 
 g_sFedQS = "undefined" != typeof srf_sFedQS ? srf_sFedQS : "", g_iFedState = "undefined" != typeof srf_iFedState ? srf_iFedState : 0, 
 g_sRealmDiscoveryJSON = "undefined" != typeof srf_sRealmDiscoveryJSON ? srf_sRealmDiscoveryJSON : "", 
 g_uLiveIDP = "undefined" != typeof srf_uLiveIDP ? srf_uLiveIDP : "", g_fInlineLogin = "undefined" != typeof srf_fInlineLogin ? srf_fInlineLogin : false, 
 g_iInlineLoginStep = "undefined" != typeof srf_iInlineLoginStep ? srf_iInlineLoginStep : InlineLoginStep.CredGathering, 
 g_iInterruptType = "undefined" != typeof srf_iIntType ? srf_iIntType : 0, g_sErrorCode = "undefined" != typeof srf_sErrorCode ? srf_sErrorCode : "", 
 g_sFirstName = "undefined" != typeof srf_sFirstName ? srf_sFirstName : "", g_sLastName = "undefined" != typeof srf_sLastName ? srf_sLastName : "", 
 g_sSQList = "undefined" != typeof srf_sSQList ? srf_sSQList : "", g_aProofs = "undefined" != typeof srf_aProofs ? srf_aProofs : [], 
 g_fEV = "undefined" != typeof srf_fEVUpgrade ? srf_fEVUpgrade : false, g_urlEV = "undefined" != typeof srf_uEVUpgrade ? srf_uEVUpgrade : "", 
 g_iAutoSSO = "undefined" != typeof srf_iAutoSSO ? srf_iAutoSSO : 0, g_fShowUserTileImg = "undefined" != typeof srf_fShowUserTileImg ? srf_fShowUserTileImg : false, 
 g_sCutOffTime = "undefined" != typeof srf_sCutOffTime ? srf_sCutOffTime : "", g_iMaxImgSize = "undefined" != typeof srf_iMaxImgSize ? srf_iMaxImgSize : 0, 
 g_urlProfileURL = "undefined" != typeof srf_uProfileURL ? srf_uProfileURL : "";
 if ("undefined" != typeof srf_fBHO ? srf_fBHO : false)
 {
     BHO.State = BHO.State | BHOState.Installed;
     if ("undefined" != typeof srf_fUpgBHO ? srf_fUpgBHO : false) {
         BHO.State = BHO.State | BHOState.Upgrade;
     }
     else if ("undefined" != typeof srf_fChkBHO ? srf_fChkBHO : false) {
         BHO.State = BHO.State | BHOState.UpgradeBlocked;
     }
     else if ("undefined" != typeof srf_fUseBHO ? srf_fUseBHO : true)
     {
         BHO.State = BHO.State | BHOState.Supported;
         if ("undefined" != typeof srf_fEIDSupported ? srf_fEIDSupported : false) {
             BHO.State = BHO.State | BHOState.BHO60;
         }
     }
 }
 var g_fLoginLite = false, g_fAuthLite = "undefined" != typeof srf_fAuthLite ? srf_fAuthLite : false, g_iLWAState = "undefined" != typeof srf_iLWAState ? srf_iLWAState : 0, 
 g_sRBlob = "undefined" != typeof srf_sRBlob ? srf_sRBlob : "", g_iMESTMarketDefault = "undefined" != typeof srf_iMESTMarketDefault ? srf_iMESTMarketDefault : 1, 
 g_sRDCache = _kz(k_sWLOpt_RDCache, ""), g_iAlwaysSSL = _kz(k_sWLOpt_AlwaysSSL, 0), g_sSkipUser = _kz(k_sWLOpt_SkipUsername, 
 ""), g_iDontRemember = _kz(k_sWLOpt_NoRememberMe, 0), g_iNumOrigSavedUsers = 0, g_dtRenderComplete = null, 
 g_dtResourcesComplete = null, g_iUsedCredPick = 0, g_dtOTCRequest = null, g_sOTCMethod = "", g_iSecondOTC = 0, 
 g_iSavedPwdTiles = 0, g_iActiveTiles = 0, g_iFederatedTiles = 0, g_iUsedMEST = 0, g_iUsedKMSI = 0, g_iAsyncDownloads = 0, 
 g_stateUserTxtBx = new WJ([["maxLength", "113"], ["imeMode", "disabled"], ["className", "cssTextInput"]]), 
 g_statePwdTxtBx = new WJ([["maxLength", "16"], ["autocomplete", "off"], ["imeMode", "disabled"], ["className", 
 "cssTextInput"]]), g_stateChkBx = new WJ([["value", "1"], ["className", "cssCheckbox"]]), g_sNewUserID = "0", 
 g_fLatencyCookieEnabled = "undefined" != typeof srf_fLateCk ? srf_fLateCk : 0, g_fWLRootedSite = "undefined" != typeof srf_fWLRooted ? srf_fWLRooted : 0, 
 g_NonFedDoms = "undefined" != typeof srf_NonFedDom ? srf_NonFedDom : "", g_sNonFedDom = "undefined" != typeof srf_sNonFedDom ? srf_sNonFedDom : "";
 g_sPrefillMembername = escape(g_sPrefillMembername.trim());
 g_sDisplayMembername = escape(g_sDisplayMembername.trim());
 g_sPrefillCookie = escape(g_sPrefillCookie ? g_sPrefillCookie.trim() : g_sPrefillCookie);
 var g_objLoginMode = new LM_Invalid, g_objFooterMode = null, g_objPageMode = null, g_Creds = [], g_aImages = [], 
 g_elTilesTD = null, g_elMoreTD = null, g_sTileUrl = "", g_fHIPLogin = "undefined" != typeof srf_fHIPLogin ? srf_fHIPLogin : false, 
 g_fTooManyHIPAttempts = "undefined" != typeof srf_fTooMnyHIP ? srf_fTooMnyHIP : false, g_fSwitchUser = "undefined" != typeof srf_fSwitchUser ? srf_fSwitchUser : false, 
 g_fServiceBlocked = "undefined" != typeof srf_fServiceBlocked ? srf_fServiceBlocked : false, g_fInviteBlocked = "undefined" != typeof srf_fInviteBlocked ? srf_fInviteBlocked : false, 
 g_fIDPFailed = "undefined" != typeof srf_fIDPFailed ? srf_fIDPFailed : false, g_fIDPInvalidDomain = "undefined" != typeof srf_fIDPInvalidDomain ? srf_fIDPInvalidDomain : false, 
 g_urlStayUser = "undefined" != typeof srf_uStUsr ? srf_uStUsr : "", g_fIsMobilePost = "undefined" != typeof srf_fIsMobilePost ? srf_fIsMobilePost : false, 
 g_fOverTheShoulder = "undefined" != typeof srf_fOTS ? srf_fOTS : false, g_lHIPImgW = "undefined" != typeof srf_lHIPImgW ? srf_lHIPImgW : "168", 
 g_lHIPImgH = "undefined" != typeof srf_lHIPImgH ? srf_lHIPImgH : "48";
 if (g_fOverTheShoulder) {
     g_urlPasswordReset = g_urlReturn;
     g_urlSwitchUser = g_urlReturn
 }
 function _s9()
 {
     g_iAsyncDownloads++;
     latImg = new Image;
     EVENT.add(latImg, EVENT.Name.OnLoad, function ()
     {
         _rz.apply(latImg)
     });
     EVENT.add(latImg, EVENT.Name.OnAbort, NotifyDownloadComplete);
     EVENT.add(latImg, EVENT.Name.OnError, NotifyDownloadComplete);
     latImg.dtStart = new Date;
     latImg.src = "images/LiveID16nc.gif?" + (new Date).getTime()
 }
 function _rz()
 {
     try
     {
         NotifyDownloadComplete();
         var c = 2968, a = new Date - this.dtStart, b = "throughput=" + Math.round(c / a) + "&latency=" + a, 
         d = _jo(true, true);
         _ry(k_sWLPerfCookieName, b, true, d)
     }
     catch (e) {}
 }
 function _sd()
 {
     try
     {
         var a = _oe(k_sWLPerfCookieName);
         a = _sc(a, "FR", "L");
         a = _sc(a, "ST", (new Date).getTime());
         var b = _jo(true, true);
         _ry(k_sWLPerfCookieName, a, true, b)
     }
     catch (c) {}
 }
 function _j6(f, e)
 {
     if (g_objLoginMode._j9() == LoginMode.ForceSignin) {
         return g_sDefaultLoginOptions;
     }
     var h = false, d = false, c = f[USER_PROP_KEEP_ME_SIGNED_IN], a = LoginOption.NothingChecked, b = _c2(g_objLoginMode.getAllUsers(), 
     [], LoginMode.SavedUser), g = b.length;
     if (e) {
         a = LoginOption.RememberMe;
     }
     if (c) {
         a = d ? LoginOption.OtherSavedUsers : LoginOption.RememberPWD;
     }
     return a
 }
 function _ny()
 {
     _fk();
     g_fLatencyCookieEnabled == 1 && g_fWLRootedSite == 1 && _s9();
     _me();
     if (g_fShowUserTileImg && g_urlProfileURL != "")
     {
         (g_objLoginMode._j9() == LoginMode.SavedUser || g_objLoginMode._j9() == LoginMode.LWAConfirm || g_objLoginMode._j9() == LoginMode.ForceSignin || g_objLoginMode._j9() == LoginMode.LoginLight) && loadUserTile();
     }
 }
 function NotifyDownloadComplete()
 {
     g_iAsyncDownloads--;
     if (g_iAsyncDownloads <= 0) {
         g_dtResourcesComplete = new Date;
     }
 }
 function _me()
 {
     if (g_urlPreload != "")
     {
         g_iAsyncDownloads++;
         var a = document.createElement("iframe");
         a.id = "idPartnerPL";
         a.height = 0;
         a.width = 0;
         a.style.display = "none";
         a.onerror = NotifyDownloadComplete;
         a.onload = NotifyDownloadComplete;
         a.onabort = NotifyDownloadComplete;
         a.src = g_urlPreload;
         GETag("body").appendChild(a)
     }
 }
 function profileURLConstruct(h)
 {
     var a = g_urlProfileURL;
     a = a + "&callback=processProfileResponse";
     if (h != "") {
         a = a + "&timestamp=" + h;
     }
     for (var c = "", e = g_objLoginMode.getTiles(), f = true, i = a.length - 5, d = 0; d < e.length; d++)
     {
         if (e[d]._i7() == WE.Normal) 
         {
             var g = e[d].getWLProp(WB.User);
             if (exists(g[USER_PROP_CID])) 
             {
                 var b = "";
                 if (!f) {
                     b = ",";
                 }
                 b = b + "0x" + g[USER_PROP_CID];
                 if (i + c.length + b.length > 260) {
                     break;
                 }
                 c = c + b;
                 f = false;
             }
         }
         a = a.replace("[cid]", c);
         return a;
     }
 }
 function getLastUpdateTimeTileIdx()
 {
     for (var e = g_objLoginMode.getTiles(), c = null, f =- 1, a = 0; a < e.length; a++)
     {
         var b = e[a].getWLProp(WB.User);
         if (!exists(b[USER_PROP_FEDERATED]) || b[USER_PROP_FEDERATED] != true)
         {
             if (!_l7(b[USER_PROP_USER_IMAGE_TIMESTAMP])) {
                 return a;
             }
             var d = b[USER_PROP_USER_IMAGE_TIMESTAMP]._u53();
             if (exists(d)) {
                 if (!exists(c) || c > d) {
                     c = d;
                     f = a;
                 }
             }
             else {
                 return a;
             }
         }
     }
     return f
 }
 function loadUserTile()
 {
     var d = g_sCutOffTime._u53();
     if (!exists(d)) {
         return;
     }
     var c = getLastUpdateTimeTileIdx();
     if (c <=- 1) {
         return;
     }
     var b = g_objLoginMode.getUsers()[c][USER_PROP_USER_IMAGE_TIMESTAMP], a = null;
     if (exists(b)) {
         a = b._u53();
     }
     if (!exists(a) || a < d) {
         var e = profileURLConstruct(b);
         WKA.preload("idUserTileScript", e)
     }
 }
 function processProfileResponse(d)
 {
     if (!exists(d) || !exists(d.Views) || !exists(d.Views.length)) {
         return;
     }
     for (var f = 0; f < d.Views.length; f++)
     {
         var a = d.Views[f];
         if (exists(a) && exists(a.Id) && exists(a.Attributes) && exists(a.Attributes.length) && exists(a.Id.Cid) && a.Id.Cid.length > 2) if (a.Id.Cid.substring(0, 
         2).equals("0x", true))
         {
             for (var c = "", e =- 1, b = 0; b < a.Attributes.length; b++)
             {
                 if (_l7(a.Attributes[b].Name) && a.Attributes[b].Name.equals("UserTileStaticUrl", true)) {
                     c = a.Attributes[b].Value;
                 }
                 if (_l7(a.Attributes[b].Name) && a.Attributes[b].Name.equals("UserTileStaticSize", true)) {
                     e = parseInt(a.Attributes[b].Value);
                 }
             }
             if (_l0(e) && e >= 0 && e < g_iMaxImgSize && _l7(c))
             {
                 if (c.indexOf("http://") == 0) {
                     c = document.location.protocol + "//" + c.substr(7);
                 }
                 var g = USER.getTileIdxByCid(a.Id.Cid.substring(2));
                 if (g > -1) {
                     var h = g_objLoginMode.getTiles()[g];
                     h.updateImage(c)
                 }
             }
         }
     }
 }
 function _mk(b, c)
 {
     var a = c;
     if (b == PostType.Password) {
         a = CRED.Type.Pwd;
     }
     else if (b == PostType.Federation) {
         a = CRED.Type.Fed;
     }
     else if (b == PostType.OTC) {
         a = CRED.Type.OTC;
     }
     return a
 }
 function buildLinkFNode(c, e, a, d, b)
 {
     if (!exists(a)) {
         return null;
     }
     if (a == "-1") {
         return new FNode_Disabled(b, c);
     }
     return new FNode_Link(c, e, a, d, b)
 }
 function updateSSLLinks(c)
 {
     if (exists(g_objPageMode))
     {
         var a = g_objPageMode._u80();
         if (exists(a))
         {
             var b = !_c1(a.get_property(FNode.Prop.Blacklist), FNode.Name.SSL);
             if (!b && c) {
                 a.enableNode(FNode.Name.SSL);
                 a.enableNode(FNode.Name.NoSSL);
                 g_objPageMode._fa()
             }
             else if (b && !c) {
                 a.disableNode(FNode.Name.SSL);
                 a.disableNode(FNode.Name.NoSSL);
                 g_objPageMode._fa()
             }
         }
     }
 }
 function _ci(b)
 {
     var a = _al(b);
     a.style.fontSize = "100%";
     a.appendChild(_e3(g_s["b24"]));
     return a
 }
 function _mt(c)
 {
     var b = _al(c), a = _bc(null, createFromHTML(_a1(), g_h["n0"]), _u81("ic020", 16, 16, _aq("i2003", 
     g_u["c14"], g_s["o1"])));
     a.style.width = "100%";
     b.appendChild(a);
     try {
         return b
     }
     finally {
         a = null;
         b = null;
     }
 }
 function _s5(b)
 {
     var a = _al(b);
     a.style.fontSize = "12pt";
     a.appendChild(_e3(g_s["b25"]));
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function _qf(f, e)
 {
     var b = _al(f), c = _elWL_TitleDiv(), d = "";
     if (e == CRED.Type.Fed) {
         d += g_s["a3"];
     }
     else {
         d += g_s["a2"];
     }
     createFromHTML(c, d);
     b.appendChild(c);
     var a = _al();
     a.style.paddingBottom = "20px";
     a.appendChild(_e3(g_s["b0"]));
     b.appendChild(a);
     try {
         return b
     }
     finally {
         b = null;
         c = null;
         a = null;
     }
 }
 function _qh(e, d, c)
 {
     var a = _al(e), b = d ? _au("i1668", g_urlSwitchUser, function ()
     {
         _pw(k_sWLOpt_SkipUsername, g_sPrefillMembername)
     }) : _au("i1668", null, function ()
     {
         _qm(CRED.Type.Pwd)
     }, true);
     g_s["a5"] && b.appendChild(_elText(g_s["a5"]));
     a.appendChild(b);
     if (c) {
         a.appendChild(_ag());
         a.appendChild(_ag())
     }
     try {
         return a
     }
     finally {
         a = null;
         b = null;
     }
 }
 function elCreateLiveIDPLink(f, e)
 {
     var b = _a4();
     b.width = "100%";
     var c = _au(e, "", LiveIDPRedirect, true);
     c.appendChild(_e3(g_s["b54"]));
     var d = _elNewCell(_elNewRow(b));
     d.appendChild(c);
     var a = _al(f);
     a.style.paddingBottom = "20px";
     a.appendChild(b);
     return a
 }
 function _bm(c)
 {
     var e = _elText(g_s["b2"]), d = _u81("icon_err", 16, 16, _aq("i2017", g_u["c14"], g_s["u11"])), a = _er0.UI.newErrorTable("idTD_GenericError");
     a.rows[0].cells[0].appendChild(_ba("i0518", e, d));
     var f = _elNewRow(a), b = _elNewCell(f);
     b.appendChild(_at(2, [g_s["b3"], g_s["b4"]]));
     b.appendChild(_ay(g_s["b5"], "cssContainerTextBold"));
     b.appendChild(_at(1, [g_s["b6"]]));
     c.appendChild(a)
 }
 function _sl(f)
 {
     var i = _elText(g_s["b26"]), h = _u81("icon_err", 16, 16, _aq("i2017", g_u["c14"], g_s["u11"])), b = _er0.UI.newErrorTable("idTD_LockoutError");
     b.rows[0].cells[0].appendChild(_ba("i0518", i, h));
     var g = g_s["b27"].replace(/#~#MemberName_LS#~#/g, g_sPrefillMembername), a = _elNewCell(_elNewRow(b));
     a.appendChild(createFromHTML(_ay(), g));
     a.appendChild(_at(2, [g_s["b28"], g_s["b29"]]));
     var d = _au("i1011", g_urlResetPW);
     d.appendChild(_elText(g_s["b30"]));
     a = _elNewCell(_elNewRow(b));
     a.appendChild(d);
     var c = _au("i1051", g_urlLoginPageReload, function ()
     {
         _pw(k_sWLOpt_SkipUsername, g_sPrefillMembername)
     });
     c.appendChild(_elText(g_s["b31"]));
     a = _elNewCell(_elNewRow(b));
     a.appendChild(c);
     a.style.paddingTop = "4px";
     var e = _au("i1021", g_urlContactCSS);
     e.appendChild(_elText(g_s["b49"]));
     a = _elNewCell(_elNewRow(b));
     a.appendChild(e);
     a.style.paddingTop = "4px";
     f.appendChild(b)
 }
 function _to(a, b, c)
 {
     a.appendChild(_ay(_rk(c, g_s["b38"])));
     a.appendChild(_ay(b));
     return a
 }
 function _tp(d, e)
 {
     var g = _elText(g_s["b35"]), f = _u81("icon_err", 16, 16, _aq("i2017", g_u["c14"], g_s["u11"])), b = _er0.UI.newErrorTable("idTD_SwitchUserError");
     b.rows[0].cells[0].appendChild(_ba("i0518", g, f));
     var a = _elNewCell(_elNewRow(b));
     _to(a, e);
     a.style.paddingBottom = "15px";
     a = _elNewCell(_elNewRow(b));
     var c = _elWL_DivLink(null, "i1052", g_s["b37"], g_urlStayUser);
     a.appendChild(c);
     a = _elNewCell(_elNewRow(b), null, "cssASpacer");
     c = _elWL_DivLink(null, "i1051", g_s["b36"], g_urlSwitchUser, function ()
     {
         _pw(k_sWLOpt_SkipUsername, g_sDisplayMembername)
     });
     a.appendChild(c);
     d.appendChild(b)
 }
 function _tq(i, c, e, h)
 {
     var g = null, d = g_s["b40"], f = new FedInfo;
     f.set(FedProp.Username, c);
     e = f.doStringReplace(e);
     d = f.doStringReplace(d);
     var l = _elText(e), k = _u81("icon_err", 16, 16, _aq("i2017", g_u["c14"], g_s["u11"])), b = _er0.UI.newErrorTable("idTD_BlockedError");
     b.rows[0].cells[0].appendChild(_ba("i0518", l, k));
     var a = _elNewCell(_elNewRow(b));
     if (c != "")
     {
         g = function ()
         {
             _pw(k_sWLOpt_SkipUsername, c)
         };
         _to(a, c, h);
         a.style.paddingBottom = "15px";
         a = _elNewCell(_elNewRow(b))
     }
     var j = _elWL_DivLink(null, "i1051", g_s["b39"], g_urlSwitchUser, g);
     a.appendChild(j);
     a = _elNewCell(_elNewRow(b));
     a.appendChild(_ay(d));
     i.appendChild(b)
 }
 function _tr(j, c, f)
 {
     var i = null, g, e, h;
     if (c != "" && f != "")
     {
         var d = new FedInfo;
         d.set(FedProp.Username, c);
         d.set(FedProp.Brand, f);
         g = d.doStringReplace(g_s["b41"]);
         e = d.doStringReplace(g_s["b42"]);
         h = d.doStringReplace(g_s["b43"])
     }
     else {
         g = g_s["b44"];
         e = g_s["b45"]
     }
     var m = _elText(g), l = _u81("icon_err", 16, 16, _aq("i2017", g_u["c14"], g_s["u11"])), b = _er0.UI.newErrorTable("idTD_IDPFailedError");
     b.rows[0].cells[0].appendChild(_ba("i0518", m, l));
     var a = _elNewCell(_elNewRow(b));
     if (c != "" && f != "")
     {
         i = function ()
         {
             _pw(k_sWLOpt_SkipUsername, c)
         };
         _to(a, c);
         a.style.paddingBottom = "15px";
         a = _elNewCell(_elNewRow(b));
         a.appendChild(_ay(e));
         a = _elNewCell(_elNewRow(b));
         a.appendChild(_ay(h));
         a.style.paddingTop = "8px"
     }
     else {
         a = _elNewCell(_elNewRow(b));
         a.appendChild(_ay(e))
     }
     var k = _elWL_DivLink(null, "i1051", g_s["b39"], g_urlSwitchUser, i);
     a = _elNewCell(_elNewRow(b), null, "cssASpacer");
     a.appendChild(k);
     j.appendChild(b)
 }
 function _kp()
 {
     var a = [];
     a[CRED.Type.Pwd] = true;
     a[CRED.Type.InfoCard] = false;
     a[CRED.Type.Fed] = true;
     a[CRED.Type.EID] = false;
     a[CRED.Type.OTC] = _ds(CRED.Type.OTC, g_fOTCEnabled, true, g_fOTCCredPickEnabled);
     return a
 }
 function _ds(f, d, e, c)
 {
     var a = false;
     if (d && e)
     {
         if (c) {
             a = true;
         }
         else {
             var b = _kz(k_sWLOpt_ACT);
             if (b != null && b.indexOf("[" + f + "]") !=- 1) {
                 a = true ;
             }
         }
         return a;
     }
 }
 var USER = {};
 USER._kx = function ()
 {
     if (g_sPrefillCookie != "null" && g_sPrefillCookie != null)
     {
         var a = getPropFromMSPPre(MSPreProp.ImgURL);
         if (a) {
             a = unescape(a);
         }
         else {
             a = g_urlPrefillUserTile;
         }
         return [[g_sPrefillCookie, LoginOption.Empty, a, ""]]
     }
     return [];
 };
 USER._j5 = function ()
 {
     var a = parseInt(_kz(k_sWLOpt_CredType));
     if (!_c1(g_Creds, a) || g_Creds[a] != true || a == CRED.Type.OTC) {
         a = CRED.Type.Pwd;
     }
     return a;
 };
 USER.getMessengerStatus = function ()
 {
     var b = null, a = GetPresCookie();
     return parseInt(a.Status);
 };
 USER.getCID = function ()
 {
     return getPropFromMSPPre(MSPreProp.CID);
 };
 USER.getProfileImg = function ()
 {
     var a = getPropFromMSPPre(MSPreProp.ImgURL);
     if (a) {
         a = unescape(a);
     }
     if (!exists(a) || !_l7(a)) {
         a = "";
     }
     return a;
 };
 USER.getProfileImgTS = function ()
 {
     var a = getPropFromMSPPre(MSPreProp.TimeStamp);
     if (!exists(a) || !_l7(a)) {
         a = "";
     }
     return a;
 };
 USER._j1 = function (b)
 {
     var a = null;
     a = new FedInfo;
     a.set(FedProp.URL, g_sFedURL);
     a.set(FedProp.Brand, g_sFedPartner);
     if (g_sFedURL != "" && g_sFedPartner != "") {
         b[USER_PROP_FEDERATED] = true;
     }
     return a;
 };
 USER.getTileIdxByCid = function (c)
 {
     if (!exists(c)) {
         return - 1;
     }
     var b =- 1, a = getPropFromMSPPre(MSPreProp.CID);
     if (exists(a) && a.equals(c, true)) {
         b = 0;
     }
     return b;
 };
 USER.setProfileImgAndTS = function (c, b, a)
 {
     if (!exists(c) || !exists(b) || !exists(a)) {
         return;
     }
     setPropFromMSPPre(MSPreProp.ImgURL, escape(b));
     setPropFromMSPPre(MSPreProp.TimeStamp, a)
 };
 USER._or = function (a, b)
 {
     if (!b && g_sPrefillCookie == a)
     {
         if (g_sPrefillMembername == g_sPrefillCookie) {
             g_sPrefillMembername = "";
         }
         g_sPrefillCookie = "";
         WriteCookie("MSPPre", " ", false, true)
     }
 };
 function IsValidMessengerOption(a)
 {
     switch (parseInt(a))
     {
         case MessengerOption.DontSignIn:
         case MessengerOption.Online:
         case MessengerOption.Offline:
         case MessengerOption.Busy:
         case MessengerOption.Away:
             return true;
             break;
         default:
             return false;
     }
 }
 function _en(m)
 {
     var c = true;
     for (var o = 0, d = [], i = 0, g = 0; g < m.length; g++)
     {
         var f = m[g], b = f[0], e = null;
         if (!b._u54()) {
             USER._or(b);
             continue
         }
         if (g_sSkipUser == b) {
             continue;
         }
         var h = exists(g_sPrefillMembername) && b == g_sPrefillMembername;
         if (g_fHasErrorCode && h)
         {
             if (g_sNewUser == "1") {
                 USER._or(unescape(g_sPrefillMembername), c);
                 continue
             }
             e = g_sErrorText
         }
         if (g_fForcedSignin || g_fSwitchUser || g_iLWAState == 1)
         {
             if (g_sDisplayMembername != b) {
                 continue;
             }
             var a = new UserObj.LoginUser(b, "", false, f[1] == LoginOption.RememberPWD, USER._j5(b), 
             _ks(f)), k = USER._j1(a);
             if (k.hasValue(FedProp.Brand)) {
                 a[USER_PROP_FED_INFO] = k;
             }
             if (exists(a[USER_PROP_FED_INFO]) || a[USER_PROP_CRED_TYPE] == CRED.Type.Fed)
             {
                 if (g_fIsInvite) {
                     continue;
                 }
                 else {
                     g_fHasFedUser = c;
                 }
                 var j = USER.getMessengerStatus(b);
                 if (_l0(j)) {
                     a[USER_PROP_MESSENGER_STATUS] = j;
                 }
                 var n = USER.getCID(b);
                 if (_l7(n)) {
                     a[USER_PROP_CID] = n;
                 }
                 var l = USER.getProfileImgTS(b);
                 if (_l7(l)) {
                     a[USER_PROP_USER_IMAGE_TIMESTAMP] = l;
                 }
                 if (exists(e)) {
                     a[USER_PROP_ERROR_MESSAGE] = e;
                 }
                 if (a[USER_PROP_KEEP_ME_SIGNED_IN] == c) {
                     g_iSavedPwdTiles++;
                 }
                 else if (a[USER_PROP_SIGNED_IN] == c) {
                     g_iActiveTiles++;
                 }
                 if (a[USER_PROP_FEDERATED] == c) {
                     g_iFederatedTiles++;
                 }
                 if (h) {
                     d.unshift(a);
                 }
                 else {
                     i < k_iMaxUsers && d.push(a);
                 }
                 i = d.length;;
             }
         }
     }
     return d
 }
 function _ks(d, b)
 {
     var c = "", a = "";
     if (d) {
         c = d[0];
         a = d[2]
     }
     else if (b) {
         c = b;
         a = USER.getProfileImg(b)
     }
     if (a == "")
     {
         if (c == g_sPrefillCookie && g_urlPrefillUserTile != "") {
             a = g_urlPrefillUserTile;
         }
         if (a != "")
         {
             if (a.indexOf("http://") == 0) {
                 a = document.location.protocol + "//" + a.substr(7);
             }
             return a;;
         }
     }
 }
 g_u["x4"] = g_urlSSL;
 g_u["x5"] = g_urlNoSSL;
 g_u["x6"] = "undefined" != typeof srf_uFedConv ? srf_uFedConv : "";
 g_u["x7"] = _cv(g_urlLoginPageReload, [["fsui", "1"], ["cred", "p"]]);
 g_u["ll0"] = g_urlSwitchUser;
 g_u["ll1"] = g_urlResetPW;
 g_u["u5"] = g_urlResetPW;
 function BuildCredPicker(d, c)
 {
     var a = new WI, b = new WI;
     a.pushModifier(null, UI.ID, createIDMod(d), WL_UIModType.Get);
     b.pushModifier(null, UI.ID, createIDMod(d), WL_UIModType.Get);
     addCredPickDDContent(a);
     addCredPickMenuContent(b);
     c.set("t1", UI.Prop, DD.R3.CredPicker.Object);
     c.set("t2", UI.Prop, a);
     c.set("t3", UI.Prop, b)
 }
 function buildCredPickerOption(f, c, g, d, e)
 {
     var b = "ddRowOff cssPointerCursor", a = new WI;
     a.pushModifier(null, UI.ID, createIDMod("_Opt" + c), WL_UIModType.Get);
     a.set("do1", UI.ID, "idTbl_CredPick_Status");
     a.set("do10", UI.ID, "idTd_CredPick_Status_Text");
     a.set("do12", UI.ID, "idSpan_CredPick_Status_Text");
     a.set("op0", UI.ID, "idA_CredPick_Option");
     a.set("op0", UI.State, WJA("cssHiddenLink"));
     a.set("op1", UI.ID, "idTbl_CredPick_Option");
     a.set("op1", UI.State, WJA(b));
     a.set("op3", UI.State, WJA(b));
     a.set("op2", UI.State, WJA("ddRowOn cssPointerCursor"));
     a.set("op4", UI.ID, "idTr_CredPick_Option");
     a.set("op10", UI.ID, "idTd_CredPick_OptionText");
     a.set("op12", UI.ID, "idSpan_CredPick_OptionText");
     return new DDOption.R3.Object(f, c, g, d, e, null, a)
 }
 function addCredPickDDContent(a)
 {
     a.set("dd2", UI.Prop, buildCredPickerOption(g_s["012"], 0, null, false));
     a.set("dd9", UI.ID, "idA_CredPick_Status");
     a.set("dd3", UI.ID, "idTbl_CredPick_Status");
     a.set("dd6", UI.ID, "idTd_CredPick_Image");
     a.set("dd7", UI.ID, "idImg_CredPick_Image");
     a.set("dd7", UI.Image, g_u["c14"]);
     a.pushModifier("dd7", UI.Image, createIconMapImgMod("downarrow", 7, 4), WL_UIModType.Create);
     a.set("dd8", UI.ID, "idDiv_CredPick_Menu");
     a.set("dd8", UI.State, WJA("ddMenu"));
     a.set(["dd8", DDMenu.Event.OnOpen], UI.Event, _ha)
 }
 function addCredPickMenuContent(a)
 {
     a.set("dm1", UI.State, WJA("comboMenuShadow"));
     a.set("dm2", UI.ID, "idTbl_CredPick_Menu");
     a.set("dm2", UI.State, WJA("ddMenu"));
     a.set("dm3", UI.ID, "idTr_CredPick_Menu");
     a.set("dm4", UI.ID, "idTd_CredPick_Menu")
 }
 function _dg(g, d, c)
 {
     var a = null, e = new WI, f = new WI;
     e.pushModifier(a, UI.ID, createIDMod(g), WL_UIModType.Get);
     f.pushModifier(a, UI.ID, createIDMod(g), WL_UIModType.Get);
     addMsngrDDContent(e);
     addMsngrMenuContent(f);
     var b = [];
     b.push(buildMsngrOption(g_s["ss0"], MessengerOption.Online, a, MessengerOption.Online == c, a, "msngr-online"));
     b.push(buildMsngrOption(g_s["ss1"], MessengerOption.Busy, a, MessengerOption.Busy == c, a, "msngr-busy"));
     b.push(buildMsngrOption(g_s["ss2"], MessengerOption.Away, a, MessengerOption.Away == c, a, "msngr-away"));
     b.push(buildMsngrOption(g_s["ss3"], MessengerOption.Offline, a, MessengerOption.Offline == c, a, "msngr-notonline"));
     b.push(buildMsngrOption(g_s["ss4"], MessengerOption.DontSignIn, a, MessengerOption.DontSignIn == c, 
     DDOption.Flag.Footer));
     d.set("t4", UI.Prop, DD.R3.Object);
     d.set("t5", UI.Prop, e);
     d.set("t7", UI.Prop, f);
     d.set("t6", UI.Prop, b)
 }
 function buildMsngrOption(h, e, i, f, g, b)
 {
     var d = "ddRowOff cssPointerCursor", c = "cssPointerCursor", a = new WI;
     a.pushModifier(null, UI.ID, createIDMod("_Opt" + e), WL_UIModType.Get);
     a.set("do1", UI.ID, "idTbl_MsngrStatus");
     a.set("do5", UI.ID, "idTd_MsngrStatus_Icon");
     if (exists(b))
     {
         a.set("do9", UI.ID, "idImg_MsngrStatus_Icon");
         a.set("do9", UI.Image, g_u["c14"]);
         a.pushModifier("do9", UI.Image, createIconMapImgMod(b, 16, 16), WL_UIModType.Create)
     }
     a.set("do10", UI.ID, "idTd_MsngrStatus_Text");
     a.set("do12", UI.ID, "idSpan_MsngrStatus_Text");
     a.set("do12", UI.State, WJA(c));
     a.set("op0", UI.ID, "idA_MsngrMenu_Option");
     a.set("op0", UI.State, WJA("cssMenuLink cssPointerCursor"));
     a.set("op1", UI.ID, "idTbl_MsngrOption");
     a.set("op1", UI.State, WJA(d));
     a.set("op3", UI.State, WJA(d));
     a.set("op2", UI.State, WJA("ddRowOn cssPointerCursor"));
     a.set("op4", UI.ID, "idTr_MsngrOption");
     a.set("op6", UI.ID, "idTd_MsngrOption_Icon");
     if (exists(b))
     {
         a.set("op7", UI.ID, "idImg_MsngrOption_Icon");
         a.set("op7", UI.Image, g_u["c14"]);
         a.pushModifier("op7", UI.Image, createIconMapImgMod(b, 16, 16), WL_UIModType.Create)
     }
     a.set("op10", UI.ID, "idTd_MsngrOption_Text");
     a.set("op10", UI.State, WJD("width", "100%"));
     a.set("op12", UI.ID, "idSpan_MsngrOption_Text");
     a.set("op12", UI.State, WJA(c));
     return new DDOption.R3.Object(h, e, i, f, g, null, a)
 }
 function addMsngrDDContent(a)
 {
     a.set("dd0", UI.Prop, DD.Flag.SupportKeyboard);
     a.set("dd9", UI.ID, "idA_MsngerStatus");
     a.set("dd9", UI.State, WJA("cssMenuLink"));
     a.set("dd6", UI.ID, "idTd_MsngrStatus_Image");
     a.set("dd6", UI.State, new WJ(null, [["paddingBottom", 4]]));
     a.set("dd7", UI.ID, "idImg_MsngrStatus_Image");
     a.set("dd7", UI.Image, g_u["c14"]);
     a.pushModifier("dd7", UI.Image, createIconMapImgMod("downarrow", 7, 4), WL_UIModType.Create);
     a.set("dd8", UI.ID, "idDiv_MsngrMenu");
     a.set("dd8", UI.State, WJA("ddMenu"));
     a.set(["dd8", DDMenu.Event.OnSelectionChanged], UI.Event, _u10)
 }
 function addMsngrMenuContent(a)
 {
     a.set("dm0", UI.Prop, DDMenu.Flag.SupportKeyboard | DDMenu.Flag.ShowSelected | DDMenu.Flag.ShowShadow);
     a.set("dm1", UI.State, WJA("comboMenuShadow"));
     a.set("dm2", UI.ID, "idTbl_MsngrMenu");
     a.set("dm2", UI.State, WJA("msngrMenu"));
     a.set("dm3", UI.ID, "idTr_MsngrMenu");
     a.set("dm4", UI.ID, "idTd_MsngrMenu");
     a.set("dm5", UI.ID, "idHR_MsngrSeparator");
     a.set("dm5", UI.State, new WJ(null, [["height", "1px"], ["borderBottom", "1px solid #ddd"], ["margin", 
     "4px 0px"], ["fontSize", "1px"], ["lineHeight", "1px"]]))
 }
 function _di(H, d)
 {
     var t = "u39", s = "u4", z = "ff28", y = "21px", r = "u2", q = "ff25", k = "ff29", p = "u0", f = "u9", 
     x = "ii11", j = "height", F = "idSubmit_PWD_SignIn", i = "u16", h = "ff15", E = "ff12", g = "u5", 
     D = "padding", o = "20px", n = "ff8", m = "u17", C = "color", l = "u18", B = "16px", G = "cssTextBoxTD", 
     v = "className", e = "4px", c = "paddingBottom", A = "title", u = "u11", b = null;
     d = _lp(d) ? d : [];
     var a = new WI;
     _dg(H, a, g_iMESTMarketDefault);
     a.pushModifier(b, UI.ID, createIDMod(H), WL_UIModType.Get);
     a.set("u25", UI.ID, "idDiv_PWD_MsngrControl");
     a.set(u, UI.ID, "idImg_PWD_Error_Icon");
     a.set(u, UI.Image, g_u["c14"]);
     a.set(u, UI.State, new WJ([[A, g_s["ii0"]], [["alt", g_s["ii0"]]]]));
     a.pushModifier(u, UI.Image, createIconMapImgMod("icon_err", 16, 16), WL_UIModType.Create);
     a.set("u20", UI.ID, "idTd_PWD_Error");
     a.set("u20", UI.String, g_s["ii1"]);
     a.set("ff0", UI.ID, "idTd_PWD_UsernameLbl");
     a.set("ff0", UI.State, new WJ(b, [[c, e]]));
     a.set("ff2", UI.ID, "idLbl_PWD_Username");
     a.set("ff2", UI.String, g_s["ii2"]);
     a.pushModifier("ff2", b, nobrContent, WL_UIModType.Apply);
     a.set("ff3", UI.ID, "idTd_PWD_UsernameTb");
     a.set("ff3", UI.State, new WJ([[v, G]], [[c, B]]));
     a.set(l, UI.ID, "idTxtBx_PWD_Username");
     a.set(l, UI.Input, InputType.TxtBx);
     a.set(l, UI.Name, "login");
     a.set(l, UI.State, g_stateUserTxtBx);
     a.pushModifier(l, UI.Input, createUserPropMod(USER_PROP_USERNAME), WL_UIModType.Apply | WL_UIModType.Create);
     a.set("ff4", UI.ID, "idDiv_PWD_UsernameExample");
     a.set("ff4", UI.State, new WJ(b, [[C, "#999"]]));
     a.set("ff4", UI.String, g_s["ii3"]);
     a.set("u21", UI.ID, "idTd_PWD_Error_Password");
     a.set("ff5", UI.ID, "idTd_PWD_PasswordLbl");
     a.set("ff5", UI.State, new WJ(b, [[c, e]]));
     a.set("ff6", UI.ID, "idLbl_PWD_Password");
     a.set("ff6", UI.String, g_s["ii4"]);
     a.set("ff7", UI.ID, "idTd_PWD_PasswordTb");
     a.set("ff7", UI.State, new WJ([[v, G]], [[c, e]]));
     a.set(m, UI.ID, "idTxtBx_PWD_Password");
     a.set(m, UI.Input, InputType.Pwd);
     a.set(m, UI.Name, "passwd");
     a.set(m, UI.State, g_statePwdTxtBx);
     a.set(n, UI.ID, "idDiv_PWD_PasswordExample");
     a.set(n, UI.State, new WJ(b, [[C, "#999"]]));
     a.set(n, UI.String, g_s["ii5"]);
     a.pushModifier(n, b, nobrContent, WL_UIModType.Apply);
     a.set("ff9", UI.ID, "idTd_PWD_PasswordHelp");
     a.set("ff9", UI.State, new WJ(b, [[c, o]]));
     a.set("ff10", UI.ID, "idDiv_PWD_ForgotPassword");
     a.set("ff10", UI.State, new WJ([[v, "cssHelpText"]], [[D, "0px"]]));
     a.set(g, UI.ID, "idA_PWD_ForgotPassword");
     a.set(g, UI.URL, g_u["hh2"]);
     a.set(g, UI.String, g_s["ii6"][g_iPwRstStr]);
     g_fPopupUI && a.set(g, UI.State, new WJ([["target", "_blank"]]));
     a.pushModifier(g, UI.URL, appendUserQS, WL_UIModType.Get);
     a.set("ff11", UI.ID, "idTd_PWD_MsngrControlTbl");
     a.set("ff11", UI.State, new WJ(b, [[c, o]]));
     a.set(E, UI.ID, "idLbl_PWD_MsngrControl");
     a.set(E, UI.String, g_s["ii20"]);
     a.pushModifier(E, b, nobrContent, WL_UIModType.Apply);
     a.set("ff13", UI.ID, "idTd_PWD_KMSI_Cb");
     a.set("ff13", UI.State, new WJ(b, [[c, o]]));
     a.set(h, UI.ID, "idChkBx_PWD_KMSI");
     a.set(h, UI.Input, InputType.ChkBx);
     a.set(h, UI.Name, "KMSI");
     a.set(h, UI.State, g_stateChkBx);
     a.set([h, EVENT.Name.OnClick], UI.Event, evt_KMSI_onclick);
     a.set("ff14", UI.ID, "idLbl_PWD_KMSI_Cb");
     a.set("ff14", UI.String, g_s["ii29"]);
     a.set("ff20", UI.ID, "idTd_PWD_SubmitCancelTbl");
     a.set("ff20", UI.State, new WJ(b, [[c, o]]));
     a.set(i, UI.ID, F);
     a.set(i, UI.Input, InputType.Submit);
     a.set(i, UI.Name, "SI");
     a.set(i, UI.State, new WJ(b, [[j, "25px"]]));
     a.set(i, UI.String, g_s[x]);
     a.set("ff21", UI.ID, "idTd_PWD_CancelBtn");
     a.set("ff21", UI.State, new WJ(b, [[D, "0px 10px"]]));
     a.set(f, UI.ID, "idBtn_PWD_Cancel");
     a.set(f, UI.Input, InputType.Btn);
     a.set(f, UI.Name, "Cncl");
     a.set(f, UI.State, new WJ(b, [[j, "25px"]]));
     a.set(f, UI.String, g_s["ii12"]);
     a.set([f, EVENT.Name.OnClick], UI.Event, _dm);
     a.set("u1", UI.ID, "idTd_PWD_CredPicker");
     a.set("u1", UI.State, new WJ(b, [[c, B]]));
     a.set(p, UI.ID, "idA_PWD_SwitchBack");
     a.set(p, UI.State, new WJ(b, [[C, "#666"]]));
     a.set(p, UI.String, g_s["ii22"]);
     a.set([p, EVENT.Name.OnClick], UI.Event, _s3);
     a.set("ff33", UI.ID, "idTd_PWD_SwitchToOTCText");
     a.set("ff33", UI.State, new WJ(b, [[c, e]]));
     a.set("ff32", UI.ID, "idSpan_PWD_SwitchToOTC");
     a.set("ff32", UI.String, g_s["ii23"]);
     a.set("ff34", UI.ID, "idTD_PWD_SwitchToOTCLink");
     a.set(k, UI.ID, "idA_PWD_SwitchToOTC");
     a.set(k, UI.String, g_s["ii28"]);
     a.set(k, UI.State, new WJC(A, g_s["ii28"]));
     a.set([k, DD.R3.CredPicker.Event.OnCredNotFound], UI.Event, _id);
     exists(g_urlSSL) && (!TILE.Body.Exists(CRED.Type.OTC) || !document.location.href.startsWith("https", 
     true)) && a.set([k, EVENT.Name.OnClick], UI.Event, _id);
     a.set("ff35", UI.ID, "idTd_PWD_LiveIDP");
     a.set("ff35", UI.State, new WJ(b, [[c, B]]));
     a.set("ff36", UI.ID, "idTd_PWD_LiveIDPText");
     a.set("ff36", UI.State, new WJ(b, [[c, e]]));
     a.set("ff37", UI.ID, "idSpan_PWD_LiveIDP");
     a.set("ff37", UI.String, g_s["ii32"]);
     a.set("ff38", UI.ID, "idA_PWD_LiveIDP");
     a.set("ff38", UI.String, g_s["ii33"]);
     a.set("ff22", UI.ID, "idTd_PWD_SUPasswordTb");
     a.set("ff22", UI.State, new WJ([[v, "cssTextInputTD"]], [[D, "0px 0px 4px"], ["verticalAlign", ""]]));
     a.set("ff23", UI.ID, "idTd_PWD_SUPasswordHelp");
     a.set("ff23", UI.State, new WJ(b, [[c, "8px"]]));
     a.set("ff24", UI.ID, "idTd_PWD_SU_KMSI_Cb");
     a.set("ff24", UI.State, new WJ(b, [[c, "8px"]]));
     a.set(q, UI.ID, "idChkBx_PWD_SU_KMSI");
     a.set(q, UI.Input, InputType.ChkBx);
     a.set(q, UI.Name, "KMSI");
     a.set(q, UI.State, g_stateChkBx);
     a.set(r, UI.ID, F);
     a.set(r, UI.Input, InputType.Submit);
     a.set(r, UI.State, new WJ(b, [[j, y]]));
     a.set(r, UI.String, g_s[x]);
     a.set("ff30", UI.ID, "idTd_PWD_SUSavedPasswordLbl");
     a.set("ff30", UI.State, new WJ(b, [[c, e]]));
     a.set(z, UI.ID, "idLbl_PWD_SUSavedPassword");
     a.set(z, UI.String, g_s["ii24"]);
     a.pushModifier(z, b, nobrContent, WL_UIModType.Apply);
     a.set("u3", UI.ID, "idTd_PWD_SUIMsngrTbl");
     a.set("u3", UI.State, new WJ(b, [[c, "8px"]]));
     a.set(s, UI.ID, "idBtn_PWD_SUISignIn");
     a.set(s, UI.Input, InputType.Btn);
     a.set(s, UI.State, new WJ(b, [[j, y]]));
     a.set(s, UI.String, g_s[x]);
     a.set("ff31", UI.ID, "idTd_PWD_SUContinueBtn");
     a.set("ff31", UI.State, new WJ(b, [[c, e]]));
     a.set(t, UI.ID, "idBtn_PWD_SUContinue");
     a.set(t, UI.Input, InputType.Btn);
     a.set(t, UI.State, new WJ([[A, g_s["ii26"]]], [[j, y]]));
     a.set(t, UI.String, g_s["ii25"]);
     a.set("u40", UI.ID, "idLbl_PWD_SUSignedIn");
     a.set("u40", UI.String, g_s["ii27"]);
     a.set("u40", UI.State, new WJA("cssSignedInLbl"));
     var w = g_objLoginMode._j9();
     if (w == LoginMode.LoginLight) {
         d.push("u32");
         d.push("u31")
     }
     else {
         w != LoginMode.ForceSignin && d.push("gg0");
     }
     g_fShowMessenger && w != LoginMode.OTS && d.push("u35");
     g_uLiveIDP && d.push("gg1");
     a.addFlags(d);
     a.set("u38", UI.Function, w == LoginMode.LWAConfirm ? _mi : _o1);
     a.set("u37", UI.Function, _ms);
     a.set("ii17", UI.String, g_s["ii17"]);
     a.set("ii18", UI.String, g_s["ii18"]);
     a.set("ii19", UI.String, g_s["ii19"]);
     return new TILE.Body.R3.Pwd(a)
 }
 function _dl(q, e, t, p, r, s, d)
 {
     var m = "closeglyph", g = "p23", o = "idTd_ForgetMe", n = "className", j = "p29", i = "p15", l = "verticalAlign", 
     h = "p4", k = "title", f = "p8", c = null;
     d = _rk(d, []);
     var a = new WI;
     BuildCredPicker(q, a);
     if (_c1(e, USER_PROP_ERROR_MESSAGE) && e[USER_PROP_ERROR_MESSAGE] != "")
     {
         a.set("o2", UI.HTML, e[USER_PROP_ERROR_MESSAGE]);
         p = WD.Active;
         e[USER_PROP_ERROR_MESSAGE] = c
     }
     a.pushModifier(c, UI.ID, createIDMod(q), WL_UIModType.Get);
     a.pushModifier("p16", c, _c8, WL_UIModType.Apply);
     a.set("r0", UI.Function, _oo);
     a.set("p10", UI.ID, "idDiv_Tile_Layout");
     a.set(["p10", TILE.Event.OnPostTileBodyChange], UI.Event, evt_UserTile_credchange);
     a.set(["p10", TILE.Event.OnActivate], UI.Event, _sf);
     a.set("p11", UI.ID, "idDiv_Tile_Highlight");
     a.set("p12", UI.ID, "idDiv_Tile_Click");
     a.set("p7", UI.ID, "idTbl_Tile_Error");
     a.set("p9", UI.ID, "idTd_Tile_Error");
     a.set(f, UI.ID, "idImg_Tile_Error");
     a.set(f, UI.Image, g_u["c14"]);
     a.set(f, UI.State, new WJ([[k, g_s[f]], [["alt", g_s[f]]]]));
     a.pushModifier(f, UI.Image, createIconMapImgMod("icon_err", 16, 16), WL_UIModType.Create);
     a.set("p5", UI.ID, "idTbl_Tile_LWADisclaimer");
     a.set("p27", UI.State, WJA("infoTD"));
     a.set("n0", UI.HTML, g_h["n0"]);
     a.set(h, UI.ID, "idImg_Tile_LWADisclaimer");
     a.set(h, UI.Image, g_u["c14"]);
     a.set(h, UI.State, new WJ([[k, g_s["o1"]], ["alt", g_s["o1"]]]));
     a.pushModifier(h, UI.Image, createIconMapImgMod("ic020", 16, 16), WL_UIModType.Create);
     a.set("p6", UI.ID, "idTd_Tile_RealmDiscoveryMsg");
     a.set("p1", UI.ID, "idTbl_Tile_ActiveLayout");
     a.set("p25", UI.ID, "idTileBodyInactive");
     a.set("p14", UI.ID, "idTd_Tile_UserImage");
     a.set("p14", UI.State, new WJ(c, [[l, "top"], ["width", "58px"]]));
     a.set("p32", UI.ID, "idDiv_Tile_UserImage");
     a.set("p32", UI.State, WJA("cssUserImgBkgr"));
     a.set(i, UI.ID, "idImg_Tile_UserImage");
     a.set(i, UI.State, new WJ([["height", 46], ["width", 46]], [["backgroundColor", "#FFFFFF"], ["visibility", 
     "hidden"]]));
     a.pushModifier(i, c, _c8, WL_UIModType.Apply);
     a.pushModifier(i, c, userImage, WL_UIModType.Create);
     a.set("p16", UI.ID, "idTd_Tile_Username");
     a.set("p28", UI.ID, "idLbl_Tile_Username");
     a.set("p28", UI.State, new WJ(c, [["fontSize", "9.6pt"]]));
     a.set(j, UI.ID, "idA_Tile_Username");
     a.set(j, UI.State, new WJ([["dir", "ltr"], [n, "cssHiddenLink"]]));
     a.pushModifier(j, c, createUserPropMod(USER_PROP_USERNAME), WL_UIModType.Apply);
     a.pushModifier(j, c, createTxtNodeLengthMod(33, "..."), WL_UIModType.Apply);
     a.set("p0", UI.ID, "idDiv_Tile_CredPicker");
     a.set("p26", UI.ID, o);
     a.set("p26", UI.State, WJD(l, "top"));
     a.set("p30", UI.ID, o);
     a.set("p30", UI.State, WJD(l, "middle"));
     a.set("p21", UI.ID, "idA_Tile_RemoveTile");
     a.set("p21", UI.State, new WJ([[k, g_s["o11"]], [n, "cssContainerTextSmallest cssIndent cssBlackLink"]]));
     a.set(g, UI.ID, "idImg_Tile_CloseGlyph");
     a.set(g, UI.Image, g_u["c14"]);
     a.set([g, EVENT.Name.OnMouseOut], UI.Event, createSetIconMapImgEvent(m));
     a.set([g, EVENT.Name.OnMouseOver], UI.Event, createSetIconMapImgEvent("closeglyph_hover"));
     a.pushModifier(g, UI.Image, createIconMapImgMod(m, 8, 8), WL_UIModType.Create);
     a.set("q0", UI.Name, "f1");
     var b = g_objLoginMode._j9();
     (b == LoginMode.ForceSignin || b == LoginMode.LoginLight) && d.push("j0");
     g_fAuthLite && d.push("j4");
     (b == LoginMode.HIPLogin || b == LoginMode.LockOut || b == LoginMode.OTS || b == LoginMode.ForceSignin || b == LoginMode.LWAConfirm) && d.push("j1");
     (b == LoginMode.LoginLight || b == LoginMode.SwitchUser || b == LoginMode.InviteBlocked || b == LoginMode.ForceSignin) && d.push("j5");
     (b == LoginMode.LWAConfirm || e[USER_PROP_SIGNED_IN] || e[USER_PROP_BHO_TOKEN]) && d.push("j6");
     (b == LoginMode.LWAConfirm || b == LoginMode.ForceSignin || b == LoginMode.LoginLight || e[USER_PROP_SIGNED_IN]) && d.push("j3");
     a.addFlags(d);
     return WL.Element(TILE.R3.Object, [e, _rk(t, WC.SavedUser), _rk(p, WD.MouseOff), _rk(r, WE.Normal), 
     a, s])
 }
 function createIDMod(a)
 {
     return function (b)
     {
         if (exists(b))
         {
             if (b == "idLbl_Tile_Username" && (a == 1 || a == "1")) {
                 return "SUName0";
             }
             if (a == "0Pwd")
             {
                 if (b == "idTxtBx_PWD_Username") {
                     return "i0116";
                 }
                 if (b == "idTxtBx_PWD_Password") {
                     return "i0118";
                 }
                 if (b == "idSubmit_PWD_SignIn") {
                     return "idSIButton9";
                 }
                 if (b == "idChkBx_PWD_RememberMe") {
                     return "i0201";
                 }
                 if (b == "idChkBx_PWD_SavePassword") {
                     return "i0202";
                 }
             }
             b += a
         }
         return b;
     }
 }
 function _c8(a, b)
 {
     if (_lt(a) && exists(b)) {
         a.username = b.getWLProp(WB.User)[USER_PROP_USERNAME];
     }
     return a
 }
 function createUserPropMod(a)
 {
     return function (b, d)
     {
         var c = exists(d) ? d.getWLProp(WB.User)[a] : "";
         c = c || "";
         if (_lt(b, "input")) {
             b.value = c;
         }
         else {
             b.title = c;
         }
         return b;
     }
 }
 function appendUserQS(a, b)
 {
     if (exists(b)) {
         a = _cv(a, [["username", b.getWLProp(WB.User)[USER_PROP_USERNAME]]]);
     }
     return a
 }
 function nobrContent(a)
 {
     if (exists(a)) {
         var b = _ax();
         while (a.hasChildNodes()) {
             b.appendChild(a.firstChild);
         }
         a.appendChild(b)
     }
     try {
         return a
     }
     finally {
         a = null;
     }
 }
 function userImage(a, b)
 {
     if (_lt(a) && exists(b))
     {
         WKB.preload(a, b.getWLProp(WB.User)[USER_PROP_USER_IMAGE]);
         a.title = b.getWLProp(WB.User)[USER_PROP_USERNAME];
         a.alt = a.title
     }
     return a
 }
 function createTxtNodeLengthMod(a, b)
 {
     return function (d)
     {
         if (_lt(d)) {
             var c = d.title;
             if (c.length > a) {
                 c = c.substr(0, a);
                 c += b
             }
             d.appendChild(_e3(c))
         }
         return d;
     }
 }
 function createIconMapImgMod(a, c, b)
 {
     return function (d)
     {
         if (_lt(d)) {
             return _u81(a, c, b, d);
         }
         else {
             return d;
         }
     }
 }
 function createSetIconMapImgEvent(a)
 {
     return function (d)
     {
         var b = "iconmap_" + a.toLowerCase(), c = EVENT._kq(d);
         c.className = "cssIconMapImg " + b;
     }
 }
 function OnBack() {}
 function _oh()
 {
     var a = true;
     try
     {
         if (g_iAlwaysSSL && g_urlSSL != null) {
             document.location.replace(g_urlSSL);
             return a
         }
         top != self && top.location.replace(self.location.href);
         if (g_iFedState == 2 && g_sFedURL != "") {
             _ii();
             return a
         }
         if (!_tk()) {
             document.location = g_urlNoCookies;
             return a
         }
         if (g_iForcedCredtype == CRED.Type.OTC && g_urlSSL != null) {
             document.location.replace(_sa(g_urlSSL, "cred", "otc"));
             return a;
         }
     }
     catch (b) {
         g_fHasGenericError = a;
     }
 }
 function _tk()
 {
     var b = new Date, a = "CkTst=G" + b.getTime();
     document.cookie = a;
     if (document.cookie.indexOf(a) ==- 1) {
         return false;
     }
     return true
 }
 function WLWorkflow()
 {
     if (_oh()) {
         return;
     }
     _q1(k_sWLOpt_SkipUsername);
     if (g_fIsMobilePost) {
         MIntWorkflow();
         return
     }
     g_objPageMode = detectPageMode();
     g_objPageMode._lg();
     g_Creds = _kp();
     var b = USER._kx(), a = _en(b);
     if (g_fHasFedUser && !TILE.Body.Exists(CRED.Type.Fed)) {
         _pw(k_sWLOpt_FedJS, "1");
         document.location.replace(g_urlLoginPageReload)
     }
     g_iNumOrigSavedUsers = a.length;
     g_objLoginMode = g_objPageMode._qk();
     g_objLoginMode.storeUsers(LoginMode.SavedUser, a);
     g_objLoginMode._j9() == LoginMode.ForceSignin && g_objLoginMode.setUsers(a);
     if (g_objLoginMode._qw())
     {
         g_objPageMode.draw();
         if (!exists(g_elTilesTD)) {
             g_elTilesTD = g_objPageMode.getLMHolderOne();
         }
         if (!exists(g_elMoreTD)) {
             g_elMoreTD = g_objPageMode.getLMHolderTwo();
         }
         g_objLoginMode.draw(g_elTilesTD, g_elMoreTD)
     }
     g_fHasErrorCode = false;
     _ny();
     g_dtRenderComplete = new Date
 }
 function detectPageMode()
 {
     if (g_fInlineLogin) {
         return new PM_InlineLogin;
     }
     else {
         return new PM_Default;
     }
 }
 function _ha()
 {
     g_iUsedCredPick = 1
 }
 function _u10()
 {
     g_iUsedMEST = 1;
     return true
 }
 function evt_UserTile_credchange(a)
 {
     if (exists(a)) {
         a.clearError();
         _sf(a);
         updateSSLLinks(a._ja() != CRED.Type.OTC)
     }
 }
 function _sf(a)
 {
     exists(a) && a.setFocus()
 }
 function _id()
 {
     if (!TILE.Body.Exists(CRED.Type.OTC) || g_urlSSL != null)
     {
         document.location.replace(_sa(g_urlSSL != null ? g_urlSSL : g_urlLoginPageReload, "cred", "otc"));
         rtVal = false
     }
     else {
         _qm(CRED.Type.OTC);
     }
 }
 function removeUser(a)
 {
     if (g_objLoginMode._j9() == LoginMode.SavedUser)
     {
         USER._or(a);
         g_objLoginMode.remove(null, a);
         g_objLoginMode.getTiles().length == 0 && _qm(CRED.Type.Pwd, null, true)
     }
 }
 function _qm(a, b, c)
 {
     _s4(LoginMode.NewUser, true);
     c && g_objLoginMode.remove();
     if (g_sPrefillMembername != g_sPrefillCookie) {
         g_objLoginMode.add(_rk(b, g_sPrefillMembername), a);
     }
     else {
         g_objLoginMode.add(_rk(b, ""), a);
     }
     g_objLoginMode.draw(g_elTilesTD, g_elMoreTD);
     updateSSLLinks(g_objLoginMode.getUsers()[0][USER_PROP_CRED_TYPE] != CRED.Type.OTC)
 }
 function _s3()
 {
     var a = _c2(g_objLoginMode.getAllUsers(), null, LoginMode.SavedUser);
     if (_c2(a, null, [0, USER_PROP_CRED_TYPE]) == CRED.Type.Fed) {
         document.location.replace(g_urlLoginPageReload);
     }
     else {
         _s4(LoginMode.SavedUser);
         updateSSLLinks(true)
     }
 }
 function _s4(a, c)
 {
     if (g_objLoginMode._j9() != a && _c1(LoginModeObj, a))
     {
         g_objLoginMode.hide();
         var b = new LoginModeObj[a]();
         g_objLoginMode.props = b.props;
         g_objLoginMode.copyTo(b);
         g_objLoginMode = b;
         !c && g_objLoginMode.draw(g_elTilesTD, g_elMoreTD)
     }
 }
 function _dc(b)
 {
     var c = "otc", a = [];
     if (g_objPageMode._j9() == PageMode.InlineLogin)
     {
         if (g_objLoginMode._j9() == LoginMode.InlineHIPLogin) {
             a.push(BuildInlineHIPLoginTileBody(b));
         }
         else if (g_objLoginMode._j9() == LoginMode.InlineIfExists) {
             a.push(BuildInlineIfExistsTileBody(b));
         }
         else {
             a.push(BuildInlineLoginTileBody(b));
         }
         a.push(BuildInlineCollectProofsTileBody(b));
         return a
     }
     if (g_objLoginMode._j9() == LoginMode.HIPLogin) {
         return [_df(b)];
     }
     g_Creds[CRED.Type.Pwd] == true && a.push(_di(b + "Pwd"));
     if (g_Creds[CRED.Type.OTC] == true)
     {
         var e = a.length;
         TILE.Body.Exists(CRED.Type.OTC) && a.push(_dh(CRED.Type.OTC, b + c));
         TILE.Body.Exists(CRED.Type.OTCReq) && a.push(_dh(CRED.Type.OTCReq, b + c));
         TILE.Body.Exists(CRED.Type.OTCConf) && a.push(_dh(CRED.Type.OTCConf, b + c));
         if (e == a.length)
         {
             var d = new WI;
             d.pushModifier(null, UI.ID, createIDMod(b + c), WL_UIModType.Get);
             d.set("a17", UI.String, g_s["dd35"]);
             a.push(new TILE.Body.Shell(d, CRED.Type.OTC))
         }
     }
     g_Creds[CRED.Type.Fed] == true && TILE.Body.Exists(CRED.Type.Fed) && a.push(_dd(b + "fed"));
     g_uLiveIDP && a.push(BuildMSOTileBody(b + "mso"));
     return a
 }
 function evt_KMSI_onclick(a)
 {
     var b = EVENT._kq(a);
     if (b.checked) {
         g_iUsedKMSI = 1;
     }
     else {
         g_iUsedKMSI = 0;
     }
 }
 function _oo(a)
 {
     removeUser(a[USER_PROP_USERNAME])
 }
 function _o3()
 {
     if (g_urlSSL != null) {
         _pw(k_sWLOpt_AlwaysSSL, 1);
     }
     else {
         g_urlNoSSL != null && _q1(k_sWLOpt_AlwaysSSL);
     }
 }
 function _j2(a, b)
 {
     if (b)
     {
         var d = b._u52(), c = g_DO[d.toLowerCase()];
         if (c) {
             a = c;
         }
         if (g_sQueryString != "" && a.indexOf(g_QS) ==- 1) {
             a = _cw(a, g_QS);
         }
     }
     if (g_objLoginMode._j9() == LoginMode.ForceSignin) {
         a = _sa(a, "fsui", "1");
     }
     return a
 }
 function _ii(b, j, h, g)
 {
     var a = _rk(h, g_sFedURL), e = g_sLoginOptions, f = _rk(g, false);
     if (b)
     {
         if (!f)
         {
             if (!b[USER_PROP_FEDERATED]) {
                 _e2(b, j);
                 return
             }
             var c = b[USER_PROP_FED_INFO];
             if (exists(c) && c.hasValue(FedProp.URL)) {
                 a = c.get(FedProp.URL);
             }
         }
         e = LoginOption.NothingChecked
     }
     _pw(k_sWLOpt_FedJS, "1");
     if (e == LoginOption.NothingChecked) {
         g_sFedQS = g_sFedQS.replace(/wctx=/i, "wctx=LoginOptions%3D3%26");
     }
     if (!_c1(b, USER_PROP_MESSENGER_STATUS)) {
         g_sFedQS = g_sFedQS.replace(/wctx=/i, "wctx=MEST%3D0%26");
     }
     else
     {
         g_sFedQS = g_sFedQS.replace(/wctx=/i, "wctx=MEST%3D" + b[USER_PROP_MESSENGER_STATUS] + "%26");
     }
     var i = decodeURIComponent(ExtractQSParam("cbcxt"));
     a = a.replace(/cbcxt=/i, "cbcxt=" + encodeURIComponent(i));
     var m = decodeURIComponent(ExtractQSParam("vv"));
     a = a.replace(/vv=/i, "vv=" + encodeURIComponent(m));
     var d = decodeURIComponent(ExtractQSParam("username"));
     if (b && b[USER_PROP_USERNAME]) {
         d = b[USER_PROP_USERNAME];
     }
     a = a.replace(/username=/i, "username=" + encodeURIComponent(d));
     var k = decodeURIComponent(ExtractQSParam("mkt"));
     a = a.replace(/mkt=/i, "mkt=" + encodeURIComponent(k));
     var l = decodeURIComponent(ExtractQSParam("lc"));
     a = a.replace(/lc=/i, "lc=" + encodeURIComponent(l));
     document.location.replace(_cw(a, g_sFedQS));
     return false
 }
 function _mi(b)
 {
     var a = b.getWLProp(WB.User);
     a[USER_PROP_POST_TYPE] = PostType.LWAConsent;
     a.setAction(_j2(g_urlPost, a[USER_PROP_USERNAME]));
     _d5(a)
 }
 function _ms(a)
 {
     _e2(a.getWLProp(WB.User), false)
 }
 function _o1(a)
 {
     var b = a.getWLProp(WB.User);
     _e2(b, true)
 }
 function _e2(a, d)
 {
     var e = a[USER_PROP_CRED_TYPE], f = a[USER_PROP_USERNAME], c = a[USER_PROP_PASSWORD], h = "", b = [];
     if (!a[USER_PROP_BHO_TOKEN])
     {
         !d && !f._u54() && b.push(TILE.Body.Error._er3);
         exists(a[USER_PROP_HIP_SOLUTION]) && a[USER_PROP_HIP_SOLUTION] == "" && b.push(TILE.Body.Error._er2);
         c == "" && e != CRED.Type.Fed && b.push(TILE.Body.Error._er1);
         if (b.length > 0) {
             var g = new Error;
             g.info = b;
             throw g;
         }
     }
     a.setAction(_j2(g_urlPost, f));
     a.setPostParam("LoginOptions", _j6(a, d));
     a[USER_PROP_USERNAME] = f.toLowerCase();
     switch (e)
     {
         case CRED.Type.Pwd:
             a[USER_PROP_POST_TYPE] = PostType.Password;
             break;
         case CRED.Type.Fed:
             a[USER_PROP_FED_STATE] = 2;
             a[USER_PROP_PASSWORD] = null;
             a[USER_PROP_POST_TYPE] = PostType.Federation;
             break;
         case CRED.Type.OTC:
             a[USER_PROP_OTC_CODE] = c;
             a[USER_PROP_PASSWORD] = null;
             a[USER_PROP_POST_TYPE] = PostType.OTC
     }
     if (!d)
     {
         a.setPostParam("NewUser", 1);
         if (typeof Crypto != "undefined" && g_RDHashEnabled && e == CRED.Type.Pwd) if (!exists(a[USER_PROP_FEDERATED]) || a[USER_PROP_FEDERATED] != false)
         {
             a.setPostParam("hpwd", Crypto.SHA1(c));
             a.setPostParam("lchpwd", Crypto.SHA1(c.toLowerCase()));
             a[USER_PROP_PASSWORD] = null;
             a[USER_PROP_POST_TYPE] = PostType.SHA1Hash;
         }
     }
     !exists(a[USER_PROP_MESSENGER_STATUS]) && a.setPostParam("MEST", 0);
     _d5(a)
 }
 function _d5(a)
 {
     a.setPostParam("PPSX", g_sRBlob);
     a.setPostParam("PPFT", g_sFlowToken);
     a.setPostParam("idsbho", 1);
     a.setPostParam("PwdPad", null);
     a.setPostParam("sso", g_iAutoSSO);
     BHO.State & BHOState.BHO60 && a.setPostParam("SysDIDToken", "ThisIsASysDIDDummyToken");
     g_fEnableInstr && _pt(a);
     g_fLatencyCookieEnabled == 1 && g_fWLRootedSite == 1 && _sd();
     a.submit()
 }
 function _pt(a)
 {
     var b = new Date;
     a.setPostParam("i1", g_iNumOrigSavedUsers);
     a.setPostParam("i2", g_objLoginMode._j9());
     var d = b - g_dtRenderComplete;
     a.setPostParam("i3", d);
     a.setPostParam("i4", g_iUsedCredPick);
     if (g_objLoginMode._j9() == LoginMode.SavedUser)
     {
         a.setPostParam("i8", g_iSavedPwdTiles);
         a.setPostParam("i9", g_iActiveTiles);
         a.setPostParam("i10", g_iFederatedTiles)
     }
     g_fShowMessenger && a.setPostParam("i11", g_iUsedMEST);
     if (g_dtOTCRequest != null)
     {
         var c = b - g_dtOTCRequest;
         a.setPostParam("i5", c);
         a.setPostParam("i6", g_sOTCMethod);
         a.setPostParam("i7", g_iSecondOTC)
     }
     a.setPostParam("i12", g_urlSSL != null ? 0 : 1);
     a.setPostParam("i13", g_iUsedKMSI);
     a.setPostParam("i14", g_dtRenderComplete - g_dtFirstByte);
     g_dtResourcesComplete != null && g_iAsyncDownloads <= 0 && a.setPostParam("i15", g_dtResourcesComplete - g_dtFirstByte);
     window.performance && a.setPostParam("i16", performance.timing.loadEventEnd - performance.timing.connectStart);
     a.setPostParam("i17", g_iSRSFailed)
 }
 function _dm()
 {
     window.close()
 }
 function _s7(b)
 {
     var a = /<input[^>]*type="hidden"[^>]*name="PPFT"[^>]*value="([^"]*)"[^>]*>/.exec(b);
     if (a && a.length > 1) {
         return a[1];
     }
     else {
         return "";
     }
 }
 var HeaderMode = {
     Empty : 0, Default : 1, CustomLogo : 2, CustomJS : 3, IFrame : 4, PopUp : 5
 };
 WH0 = function (a)
 {
     this.headerMode = a;
     this.props = [];
 };
 WH0.prototype = {
     draw : function () {}
 };
 HM_Empty = function (a)
 {
     WH0.call(this, _rk(a, HeaderMode.Empty))
 };
 HM_Empty.derivesFrom(WH0);
 HM_Default = function (b)
 {
     var a = this;
     WH0.call(a, _rk(b, HeaderMode.Default));
     a.props["ShowBackground"] = true;
     a.props["BrandLogo"] = "";
     a.props["BrandHeading"] = "";
     a.props["TableWidth"] = "890px";
     a.m_oLogoHolder = null;
 };
 HM_Default.prototype = 
 {
     setShowBackground : function (a)
     {
         this.props["ShowBackground"] = a;
     },
     setBrandLogoURL : function (a)
     {
         if (a) {
             this.props["BrandLogo"] = a;
         }
     },
     setBrandHeading : function (a)
     {
         if (a) {
             this.props["BrandHeading"] = a;
         }
     },
     setTableWidth : function (a)
     {
         if (a) {
             this.props["TableWidth"] = a;
         }
     },
     draw : function (c)
     {
         var a = this, d = GEId("shellTBL");
         d.style.width = a.props["TableWidth"];
         var b = a._u27();
         c.appendChild(b);
         a._u24(b);
         a._u25(c);
         a.drawBrand()
     },
     _u27 : function ()
     {
         var a = "cssWLGradientCommon ";
         if (!this.props["ShowBackground"]) {
             a += "cssWLGradientNoIMG";
         }
         else
         {
             a += document.URL.startsWith("https://", true) ? "cssWLGradientIMGSSL" : "cssWLGradientIMG";
         }
         return _al("GradientDiv", a);
     },
     _u24 : function (c)
     {
         var a = _a4();
         a.style.width = this.props["TableWidth"];
         c.appendChild(a);
         var b = _elNewCell(_elNewRow(a));
         b.style.height = "50px";
         b = _elNewCell(_elNewRow(a));
         this.m_oLogoHolder = b;
     },
     _u25 : function (b)
     {
         var a = _al();
         a.style.height = "20px";
         b.appendChild(a)
     },
     drawBrand : function ()
     {
         var b = "BrandLogo", a = this;
         a._u28();
         a.props[b] != "" && a.m_oLogoHolder.appendChild(_aq("i2044", a.props[b], null, null, "cssLogo"));
         var c = _a1("i0257", null, "cssHeaderText");
         c.innerHTML = a.props["BrandHeading"];
         a.m_oLogoHolder.appendChild(c)
     },
     _u28 : function ()
     {
         var a = _bi("windowslive", g_s["b7"], 175, 23);
         this.m_oLogoHolder.appendChild(a)
     }
 };
 HM_Default.derivesFrom(WH0);
 WH2 = function (a)
 {
     HM_Default.call(this, _rk(a, HeaderMode.CustomLogo));
     this.props["Logo"] = "";
     this.props["LogoAlt"] = "";
 };
 WH2.prototype = 
 {
     setLogo : function (b, a)
     {
         if (b) {
             this.props["Logo"] = b;
         }
         if (a) {
             this.props["LogoAlt"] = a;
         }
     },
     _u24 : function () {},
     _u25 : function (c)
     {
         var a = _a4();
         a.style.width = this.props["TableWidth"];
         c.appendChild(a);
         var b = _elNewCell(_elNewRow(a), "i0273");
         this.m_oLogoHolder = b;
         b = _elNewCell(_elNewRow(a));
         b.style.height = "20px";
     },
     _u28 : function ()
     {
         var a = _elLogo(this.props["Logo"], this.props["LogoAlt"]);
         this.m_oLogoHolder.appendChild(a)
     }
 };
 WH2.derivesFrom(HM_Default);
 HM_CustomJS = function (b)
 {
     var a = this;
     WH0.call(a, _rk(b, HeaderMode.CustomJS));
     a.props["JSSrc"] = "";
     a.m_oHolder = null;
     EVENT._b2(HM_CustomJS.Event.OnError, a)
 };
 HM_CustomJS.prototype = 
 {
     setJSSrc : function (a)
     {
         if (a) {
             this.props["JSSrc"] = a;
         }
     },
     draw : function (b)
     {
         var a = this;
         a.m_oHolder = b;
         WKA.preload("idCustomJS9", a.props["JSSrc"], a.addEventHandler(a.evt_CustomJS_onload))
     },
     evt_CustomJS_onload : function (a)
     {
         try {
             DrawHeaderBranding(this.m_oHolder)
         }
         catch (b) {
             EVENT._im(this, HM_CustomJS.Event.OnError, a._event)
         }
     }
 };
 HM_CustomJS.Event = {
     OnError : "error"
 };
 HM_CustomJS.derivesFrom(WH0);
 HM_IFrame = function (a)
 {
     WH0.call(this, _rk(a, HeaderMode.IFrame));
     this.props["IFrameSrc"] = "";
 };
 HM_IFrame.prototype = 
 {
     setIFrameSrc : function (a)
     {
         if (a) {
             this.props["IFrameSrc"] = a;
         }
     },
     draw : function (b)
     {
         g_iAsyncDownloads++;
         var a = document.createElement("iframe");
         a.id = "i0277";
         a.height = "123px";
         a.width = "100%";
         a.frameBorder = 0;
         a.marginHeight = "0px";
         a.marginWidth = "0px";
         a.scrolling = "no";
         a.onerror = NotifyDownloadComplete;
         a.onload = NotifyDownloadComplete;
         a.onabort = NotifyDownloadComplete;
         a.src = this.props["IFrameSrc"];
         b.appendChild(a)
     }
 };
 HM_IFrame.derivesFrom(WH0);
 var HeaderModeObj = [WH0, HM_Empty, HM_Default, WH2, HM_CustomJS, HM_IFrame], BrandMode = {
     Empty : 0, Default : 1, Select : 2, Upsell : 3, CustomJS : 4, IFrame : 5, PopUp : 6
 };
 BM_Base = function (a)
 {
     this.brandMode = a;
     this.props = [];
 };
 BM_Base.prototype = 
 {
     draw : function (c)
     {
         var b = _a4();
         b.style.width = "100%";
         c.appendChild(b);
         var a = _av(_elNewRow(b), 3);
         a[0].style.width = "16px";
         a[1].id = "productTD";
         a[1].style.width = "475px";
         a[2].style.width = "20px";
         c.style.width = "511px";
         this.drawProduct(a[1])
     },
     drawProduct : function () {}
 };
 BM_Empty = function (a)
 {
     BM_Base.call(this, _rk(a, BrandMode.Empty))
 };
 BM_Empty.prototype = {
     draw : function () {}
 };
 BM_Empty.derivesFrom(BM_Base);
 BM_PopUp = function (a)
 {
     BM_Empty.call(this, _rk(a, BrandMode.PopUp))
 };
 BM_PopUp.derivesFrom(BM_Empty);
 BM_Default = function (b)
 {
     var a = this;
     BM_Base.call(a, _rk(b, BrandMode.Default));
     a.props["BrandImg"] = "";
     a.props["Title"] = g_s["b9"];
     a.props["SubTitle"] = g_s["b10"];
     a.props["ShowSignup"] = true;
     a.props["SignupURL"] = "";
     a.props["ShowValueProp"] = true;
     a.props["UpsellLink"] = "";
 };
 BM_Default.prototype = 
 {
     setBrandImg : function (a)
     {
         if (a) {
             this.props["BrandImg"] = a;
         }
     },
     setTitle : function (a)
     {
         if (a) {
             this.props["Title"] = a;
         }
     },
     setSubTitle : function (a)
     {
         if (a) {
             this.props["SubTitle"] = a;
         }
     },
     setShowSignup : function (a)
     {
         this.props["ShowSignup"] = a;
     },
     setSignupURL : function (a)
     {
         if (a) {
             this.props["SignupURL"] = a;
         }
     },
     setShowValueProp : function (a)
     {
         this.props["ShowValueProp"] = a;
     },
     setUpsellLink : function (a)
     {
         if (a) {
             this.props["UpsellLink"] = a;
         }
     },
     drawProduct : function (f)
     {
         var e = "SignupURL", d = "BrandImg", b = this, c = _a4();
         c.style.width = "100%";
         f.appendChild(c);
         var a = [_elNewCell(_elNewRow(c), "cbTitleTD", "cssSubHeader")];
         a[0].colSpan = 2;
         b.drawTitle(a[0]);
         a = _av(_elNewRow(c), 2);
         a[0].id = "cbImgTD";
         if (b.props[d]) {
             a[0].className = "cssCBImgR3";
             a[0].appendChild(_aq(null, b.props[d], null, null))
         }
         a[1].id = "cbSubtitleTD";
         a[1].className = "cssCBSubtitle";
         b.drawSubTitle(a[1]);
         if (b.props["ShowSignup"] && b.props[e])
         {
             a = [_elNewCell(_elNewRow(c), "signupTD")];
             a[0].colSpan = 2;
             b.drawSignup(a[0], b.props[e])
         }
         if (b.props["ShowValueProp"]) {
             a = [_elNewCell(_elNewRow(c), "ValProp")];
             a[0].colSpan = 2;
             b.drawValueProp(a[0])
         }
     },
     drawTitle : function (b)
     {
         var a = _a1();
         a.innerHTML = this.props["Title"];
         a.style.fontSize = "100%";
         b.appendChild(a)
     },
     drawSubTitle : function (b)
     {
         var a = _ay();
         a.innerHTML = this.doTagRpl(this.props["SubTitle"]);
         b.appendChild(a)
     },
     drawSignup : function (e, f)
     {
         var c = _a4();
         c.className = "cssSignupTbl";
         e.appendChild(c);
         var a = _av(_elNewRow(c), 2), d = _al(null, "cssSignupText");
         d.appendChild(_elText(g_s["b14"]));
         a[0].style.verticalAlign = "bottom";
         a[0].appendChild(d);
         var b = _ah("i0010", "reg", g_s["b15"]);
         b.className = "cssSignupBtn";
         EVENT.add(b, EVENT.Name.OnClick, function ()
         {
             top.location = f;
         });
         a[1].title = g_s["b16"];
         a[1].appendChild(b)
     },
     drawValueProp : function (a)
     {
         createFromHTML(a, g_h["b1"])
     },
     doTagRpl : function (a)
     {
         var b = "UpsellLink";
         if (!exists(a)) {
             return "";
         }
         a = a.replace(/##b##/gi, "<b>");
         a = a.replace(/##\/b##/gi, "</b>");
         a = a.replace(/##i##/gi, "<i>");
         a = a.replace(/##\/i##/gi, "</i>");
         a = a.replace(/##u##/gi, "<u>");
         a = a.replace(/##\/u##/gi, "</u>");
         a = a.replace(/##br##/gi, "<br>");
         if (this.props[b])
         {
             var c = '<a href="' + this.props[b];
             c += this.props[b].match("javascript:DoHelp") ? '">' : '" target="_blank">';
             a = a.replace(/##a##/gi, c);
             a = a.replace(/##\/a##/gi, "</a>");
             a += "</a>"
         }
         return a;
     }
 };
 BM_Default.derivesFrom(BM_Base);
 BM_Select = function (a)
 {
     BM_Default.call(this, _rk(a, BrandMode.Select))
 };
 BM_Select.prototype = 
 {
     drawSubTitle : function (a)
     {
         this.doLIReplace(this.props["SubTitle"], a)
     },
     doLIReplace : function (b, i)
     {
         b = b.replace(/##li0##/gi, "<li>");
         var g = "<img", f = "/>", h = _u51(g_u["c14"]);
         if (h == "png" && IsIEPNGFixNeeded()) {
             g = "<span";
             f = "></span>"
         }
         for (var k = '<div style="position:relative"><div style="position:absolute;z-index:-1"><span class="cssIconMapClip clip16x16">' + g + ' id="imgBLT', 
         l = '" class="cssIconMapImg iconmap_blt', m = '"' + f + "</span></div>", d = true, n = new RegExp("##li(\\d+)##", 
         "gi"), c = b.match(n), a = 0;
         c && a < c.length;
         a++)
         {
             var j = c[a].substring(4, c[a].lastIndexOf("##")), e = k + a + l + j + m;
             if (!d) {
                 e = "</div>" + e;
             }
             b = b.replace(new RegExp(c[a]), e + '<li id="LiBLT' + a + '">');
             d = false
         }
         if (!d) {
             b += "</div>";
         }
         b = '<ul class="adv">' + b + "</ul>";
         i.innerHTML = this.doTagRpl(b);
         for (var a = 0; c && a < c.length; a++) {
             WKB.preload(GEId("imgBLT" + a), g_u["c14"]);
         }
     }
 };
 BM_Select.derivesFrom(BM_Default);
 BM_Upsell = function (a)
 {
     BM_Default.call(this, _rk(a, BrandMode.Upsell));
     this.props["UpsellText1"] = "";
     this.props["UpsellText2"] = "";
 };
 BM_Upsell.prototype = 
 {
     setUpsellText1 : function (a)
     {
         if (a) {
             this.props["UpsellText1"] = a;
         }
     },
     setUpsellText2 : function (a)
     {
         if (a) {
             this.props["UpsellText2"] = a;
         }
     },
     drawSubTitle : function (d)
     {
         var g = "UpsellLink", e = "cssPMargin", c = null, b = this, a = _ay(c, e);
         a.innerHTML = b.doTagRpl(b.props["SubTitle"]);
         d.appendChild(a);
         a = c;
         a = _ay(c, e);
         a.innerHTML = b.doTagRpl(b.props["UpsellText1"]);
         d.appendChild(a);
         a = c;
         a = _ay(c, e);
         a.innerHTML = b.doTagRpl(b.props["UpsellText2"]);
         d.appendChild(a);
         a = c;
         if (b.props[g])
         {
             var f = _au("i1675", b.props[g]);
             f.appendChild(_elText(g_s["b11"]));
             var h = _al(c, "cssASpacer");
             h.appendChild(f);
             d.appendChild(h)
         }
     }
 };
 BM_Upsell.derivesFrom(BM_Default);
 BM_CustomJS = function (b)
 {
     var a = this;
     BM_Base.call(a, _rk(b, BrandMode.CustomJS));
     a.props["JSSrc"] = "";
     a.m_oHolder = null;
     EVENT._b2(BM_CustomJS.Event.OnError, a)
 };
 BM_CustomJS.prototype = 
 {
     setJSSrc : function (a)
     {
         if (a) {
             this.props["JSSrc"] = a;
         }
     },
     drawProduct : function (b)
     {
         var a = this;
         a.m_oHolder = b;
         WKA.preload("idCustomJS9", a.props["JSSrc"], a.addEventHandler(a.evt_CustomJS_onload))
     },
     evt_CustomJS_onload : function (a)
     {
         try {
             DrawProductBranding(this.m_oHolder)
         }
         catch (b) {
             EVENT._im(this, BM_CustomJS.Event.OnError, a._event)
         }
     }
 };
 BM_CustomJS.Event = {
     OnError : "error"
 };
 BM_CustomJS.derivesFrom(BM_Base);
 BM_IFrame = function (a)
 {
     BM_Base.call(this, _rk(a, BrandMode.IFrame));
     this.props["IFrameSrc"] = "";
 };
 BM_IFrame.prototype = 
 {
     setIFrameSrc : function (a)
     {
         if (a) {
             this.props["IFrameSrc"] = a;
         }
     },
     drawProduct : function (b)
     {
         g_iAsyncDownloads++;
         var a = document.createElement("iframe");
         a.id = "i0278";
         a.height = "400px";
         a.width = "475px";
         a.frameBorder = 0;
         a.marginHeight = "0px";
         a.marginWidth = "0px";
         a.scrolling = "no";
         a.onerror = NotifyDownloadComplete;
         a.onload = NotifyDownloadComplete;
         a.onabort = NotifyDownloadComplete;
         a.src = this.props["IFrameSrc"];
         b.appendChild(a)
     }
 };
 BM_IFrame.derivesFrom(BM_Base);
 var BrandModeObj = [BM_Base, BM_Empty, BM_Default, BM_Select, BM_Upsell, BM_CustomJS, BM_IFrame], FNode = {};
 FNode.Type = {
     Base : 0, Disabled : 1, Spacer : 2, Text : 3, Link : 4
 };
 FNode.Section = {
     None : 0, First : 1, Middle : 2, Last : 3
 };
 FNode.Name = 
 {
     Copyright : "copyright", TOU : "terms", Privacy : "privacy", Disclaimer : "disclaimer", SSL : "ssl", 
     NoSSL : "nossl", Help : "helpcentral", Feedback : "feedback", SignUp : "signup"
 };
 FNode.Prop = 
 {
     Blacklist : "Blacklist", SpacerOneState : "TDSpacerOneState", SpacerTwoState : "TDSpacerTwoState"
 };
 FNode.IDs = [];
 FNode.IDs[FNode.Name.Copyright] = "ftrCopy";
 FNode.IDs[FNode.Name.TOU] = "ftrTerms";
 FNode.IDs[FNode.Name.Privacy] = "ftrPrivacy";
 FNode.IDs[FNode.Name.Disclaimer] = "ftrLinkDisclaimer";
 FNode.IDs[FNode.Name.SSL] = "i1670";
 FNode.IDs[FNode.Name.NoSSL] = "i1670";
 FNode.IDs[FNode.Name.Help] = "ftrHelp";
 FNode.IDs[FNode.Name.Feedback] = "ftrFdbk";
 FNode.IDs[FNode.Name.SignUp] = "ftrSignUp";
 FNode_Base = function (d, e, f, c, b)
 {
     var a = this;
     a.type = _rk(d, FNode.Type.Base);
     a.origType = a.type;
     a.section = _rk(b, FNode.Section.None);
     a.name = _rk(e, "");
     a.element = f;
     a.oState = _rk(c, new WJ);
 };
 FNode_Base.prototype = 
 {
     get_type : function ()
     {
         return this.type;
     },
     get_element : function ()
     {
         return this.element;
     },
     get_section : function ()
     {
         return this.section;
     },
     get_name : function ()
     {
         return this.name;
     },
     insert : function (c, b)
     {
         var a = this.get_element();
         if (exists(c) && exists(a))
         {
             this.oState._c3(a);
             var d = _elNewCell(c);
             if (_l7(b)) {
                 d.style.textAlign = b;
             }
             d.appendChild(a)
         }
     }
 };
 FNode_Spacer = function (a, b)
 {
     FNode_Base.call(this, FNode.Type.Spacer);
     this.oTdOneState = exists(a) ? a : new WJ;
     this.oTdTwoState = exists(b) ? b : new WJ;
 };
 FNode_Spacer.prototype = 
 {
     insert : function (b)
     {
         var a = _av(b, 2);
         _bj(a[0], 1);
         _bj(a[1], 1);
         this.oTdOneState._c3(a[0]);
         this.oTdTwoState._c3(a[1])
     }
 };
 FNode_Disabled = function (a)
 {
     FNode_Base.call(this, FNode.Type.Disabled, a)
 };
 FNode_Disabled.prototype = {
     insert : function () {}
 };
 FNode_Disabled.derivesFrom(FNode_Base);
 FNode_Text = function (e, c, d, b)
 {
     var a = _a1();
     a.innerHTML = c;
     FNode_Base.call(this, FNode.Type.Text, e, a, d, b)
 };
 FNode_Text.derivesFrom(FNode_Base);
 FNode_Link = function (d, e, f, c, b)
 {
     var a = _au(null, f);
     a.appendChild(_e3(e));
     FNode_Base.call(this, FNode.Type.Link, d, a, c, b)
 };
 FNode_Link.derivesFrom(FNode_Base);
 var FooterMode = {
     Empty : 0, Default : 1, PopUp : 2
 },
 FModeFlags = {
     None : 0, RightToLeft : 1
 };
 FM_Base = function (b, g, f, e, c, d)
 {
     var a = this;
     a.footerMode = _rk(b, FooterMode.Empty);
     a.flags = _rk(g, FModeFlags.None);
     a.pageNodes = _rk(f, []);
     a.customNodes = _rk(e, []);
     a.props = [];
     a.props[b] = [];
     a.props[b][FNode.Prop.SpacerOneState] = exists(c) ? c : new WJ;
     a.props[b][FNode.Prop.SpacerTwoState] = exists(d) ? d : new WJ;
     a.props[b][FNode.Prop.Blacklist] = [];
 };
 FM_Base.prototype = 
 {
     draw : function (d)
     {
         var b = this;
         _aj(d);
         var c = _am(3);
         c.width = "100%";
         d.appendChild(c);
         var e = b.flags & FModeFlags.RightToLeft ? "right" : "left", f = b.flags & FModeFlags.RightToLeft ? "left" : "right", 
         a = c.rows[0].cells, g = _a4();
         a[0].appendChild(g);
         a[0].align = e;
         var i = _a4();
         a[1].appendChild(i);
         var h = _a4();
         a[2].appendChild(h);
         a[2].align = f;
         b.drawFirst(_elNewRow(g), e);
         b.drawMiddle(_elNewRow(i), "center");
         b.drawLast(_elNewRow(h), f)
     },
     drawFirst : function () {}, drawMiddle : function () {}, drawLast : function () {},
     addSpacer : function (b)
     {
         var a = new FNode_Spacer(this.get_property(FNode.Prop.SpacerOneState), this.get_property(FNode.Prop.SpacerTwoState));
         a.insert(b, "center")
     },
     get_node : function (c, d, e)
     {
         var b = this, a = null;
         if (d && _c1(b.customNodes, c)) {
             a = b.customNodes[c];
         }
         else if (!e && _c1(b.pageNodes, c)) {
             a = b.pageNodes[c];
         }
         if (exists(a))
         {
             a.type = _c1(b.get_property(FNode.Prop.Blacklist), c) ? FNode.Type.Disabled : a.origType;
         }
         return a;
     },
     get_mode : function ()
     {
         return this.footerMode;
     },
     get_property : function (a)
     {
         return this.props[this.get_mode()][a];
     },
     get_customNodes : function ()
     {
         return this.customNodes;
     },
     get_pageNodes : function ()
     {
         return this.pageNodes;
     },
     disableNode : function (a)
     {
         this.get_property(FNode.Prop.Blacklist)[a] = a;
     },
     enableNode : function (a)
     {
         this.get_property(FNode.Prop.Blacklist)[a] = null;
     }
 };
 FM_Default = function (a, c, b)
 {
     FM_Base.call(this, FooterMode.Default, a, c, b, new WJC("width", "8px"), new WJ([["width", "8px"]], 
     [[a & FModeFlags.RightToLeft ? "borderRight" : "borderLeft", "1px solid #666"]]))
 };
 FM_Default.prototype = 
 {
     drawFirst : function (b, c)
     {
         var d = true, a = this, l = a.get_node(FNode.Name.Copyright);
         l.insert(b, c);
         var k = a.get_node("First");
         k.insert(b, c);
         var f = a.get_node(FNode.Name.TOU, d);
         if (exists(f) && f.get_type() != FNode.Type.Disabled) {
             a.addSpacer(b);
             f.insert(b, c)
         }
         var e = a.get_node(FNode.Name.Privacy, d);
         if (exists(e) && e.get_type() != FNode.Type.Disabled) {
             a.addSpacer(b);
             e.insert(b, c)
         }
         var h = a.get_node(FNode.Name.Disclaimer);
         if (exists(h)) {
             a.addSpacer(b);
             h.insert(b, c)
         }
         if (exists(a.get_customNodes())) for (var j = new OBJ.Iterator(a.get_customNodes(), a.get_pageNodes()), 
         g = 0;
         g < j.length;
         g++)
         {
             var i = a.get_node(j[g], d, d);
             if (i.get_section() == FNode.Section.First) {
                 a.addSpacer(b);
                 i.insert(b, c)
             }
         }
     },
     drawLast : function (b, e)
     {
         var d = true, a = this;
         if (exists(a.get_customNodes()))
         {
             for (var j = new OBJ.Iterator(a.get_customNodes(), a.get_pageNodes()), h = 0; h < j.length; h++) 
             {
                 var i = a.get_node(j[h], d, d);
                 if (i.get_section() == FNode.Section.Last) {
                     b.cells.length > 0 && a.addSpacer(b);
                     i.insert(b, e) 
                 }
             }
             var c = a.get_node(FNode.Name.SSL);
         }
         if (!exists(c)) {
             c = a.get_node(FNode.Name.NoSSL);
         }
         if (exists(c) && c.get_type() != FNode.Type.Disabled)
         {
             b.cells.length > 0 && a.addSpacer(b);
             c.insert(b, e);
             EVENT.add(c.get_element(), EVENT.Name.OnClick, _o3)
         }
         var g = a.get_node(FNode.Name.Help, d);
         if (exists(g) && g.get_type() != FNode.Type.Disabled) {
             b.cells.length > 0 && a.addSpacer(b);
             g.insert(b, e)
         }
         var f = a.get_node(FNode.Name.Feedback, d);
         if (exists(f) && f.get_type() != FNode.Type.Disabled) {
             b.cells.length > 0 && a.addSpacer(b);
             f.insert(b, e)
         }
     }
 };
 FM_Default.derivesFrom(FM_Base);
 FM_PopUp = function ()
 {
     FM_Default.apply(this, arguments)
 };
 FM_PopUp.prototype = 
 {
     drawFirst : function (a, c)
     {
         var d = this.get_node(FNode.Name.Copyright);
         d.insert(a, c);
         var b = this.get_node(FNode.Name.Privacy);
         if (exists(b)) {
             this.addSpacer(a);
             b.insert(a, c)
         }
     },
     drawLast : function (c, b)
     {
         if (g_fSignup) {
             var a = this.get_node(FNode.Name.SignUp);
             exists(a) && a.insert(c, b)
         }
     }
 };
 FM_PopUp.derivesFrom(FM_Default);
 function _u4(b)
 {
     var d = _u5(), c = g_fPopupUI ? [] : _u6(), a = null;
     if (g_fPopupUI) {
         a = _u7(b, d, c);
     }
     else {
         a = _u8(b, d, c);
     }
     if (g_objLoginMode._j9() == LoginMode.ForceCredtype && g_iForcedCredtype == CRED.Type.OTC) {
         a.disableNode(FNode.Name.SSL);
         a.disableNode(FNode.Name.NoSSL)
     }
     return a
 }
 function _u5()
 {
     var a = [];
     a[FNode.Name.Copyright] = new FNode_Text(FNode.Name.Copyright, g_h["b23"], new WJC("id", FNode.IDs[FNode.Name.Copyright]));
     a["First"] = new FNode_Text("First", "");
     nName = FNode.Name.Privacy;
     nText = g_s["b18"];
     if (g_fPopupUI)
     {
         nState = new WJ([["id", FNode.IDs[FNode.Name.Privacy]], ["target", "_blank"]], [["color", "#666"]]);
     }
     else {
         nState = new WJ([["id", FNode.IDs[FNode.Name.Privacy]]], [["color", "#666"]]);
     }
     a[nName] = new FNode_Link(nName, nText, g_u["c6"], nState);
     return a
 }
 function _u6()
 {
     var a = [];
     if (_c1(g_oFooterURL, nName)) {
         a[nName] = buildLinkFNode(nName, nText, g_oFooterURL[nName], nState);
     }
     return a
 }
 function _u7(b, a, c)
 {
     if (exists(g_urlRegistration))
     {
         a[FNode.Name.SignUp] = new FNode_Link(FNode.Name.SignUp, g_s["b15"], g_urlRegistration, new WJ([["id", 
         FNode.IDs[FNode.Name.SignUp]], ["target", "_blank"]]));
     }
     return new FM_PopUp(b, a, c)
 }
 function _u8(m, h, i)
 {
     var e = "#666", d = "color", c = "id", a = FNode.Name.TOU, g = g_s["b50"], f = new WJ([[c, FNode.IDs[a]]], 
     [[d, e]]);
     h[a] = new FNode_Link(a, g, g_u["c11"], f);
     if (_c1(g_oFooterURL, a)) {
         i[a] = buildLinkFNode(a, g, g_oFooterURL[a], f);
     }
     if (g_u["c12"] != "")
     {
         h[FNode.Name.Disclaimer] = new FNode_Link(FNode.Name.Disclaimer, g_s["b51"], g_u["c12"], new WJ([[c, 
         FNode.IDs[FNode.Name.Disclaimer]]], [[d, e]]));
     }
     if (exists(g_urlSSL))
     {
         h[FNode.Name.SSL] = new FNode_Link(FNode.Name.SSL, g_s["a6"], g_urlSSL, new WJ([[c, FNode.IDs[FNode.Name.SSL]], 
         ["title", g_s["a7"]]], [[d, e]]));
     }
     if (exists(g_urlNoSSL))
     {
         h[FNode.Name.NoSSL] = new FNode_Link(FNode.Name.NoSSL, g_s["a8"], g_urlNoSSL, new WJ([[c, FNode.IDs[FNode.Name.NoSSL]], 
         ["title", g_s["a9"]]], [[d, e]]));
     }
     a = FNode.Name.Help;
     g = g_s["b21"];
     f = new WJ([[c, FNode.IDs[a]]], [[d, e]]);
     h[a] = new FNode_Link(a, g, g_u["c9"], f);
     if (_c1(g_oFooterURL, a)) {
         i[a] = buildLinkFNode(a, g, g_oFooterURL[a], f);
     }
     a = FNode.Name.Feedback;
     g = g_s["b22"];
     f = new WJ([[c, FNode.IDs[a]]], [[d, e]]);
     h[a] = new FNode_Link(a, g, g_u["c10"], f);
     if (_c1(g_oFooterURL, a)) {
         i[a] = buildLinkFNode(a, g, g_oFooterURL[a], f);
     }
     for (var k = new OBJ.Iterator(g_oFooterLeft, {}), j = 0; j < k.length; j++)
     {
         var b = k[j], l = _c1(FNode.IDs, b) ? FNode.IDs[b] : b;
         if (_ls(g_oFooterLeft[b]) && g_oFooterLeft[b] != "")
         {
             i[b] = buildLinkFNode(b, g_oFooterLeft[b], g_oFooterURL[b], new WJ([[c, l]], [[d, e]]), FNode.Section.First);
         }
     }
     for (var k = new OBJ.Iterator(g_oFooterRight, {}), j = 0; j < k.length; j++)
     {
         var b = k[j], l = _c1(FNode.IDs, b) ? FNode.IDs[b] : b;
         if (_ls(g_oFooterRight[b]) && g_oFooterRight[b] != "")
         {
             i[b] = buildLinkFNode(b, g_oFooterRight[b], g_oFooterURL[b], new WJ([[c, l]], [[d, e]]), FNode.Section.Last);
         }
     }
     return new FM_Default(m, h, i)
 }
 function LiveIDPRedirect(a)
 {
     exists(a) && _ii(a.getWLProp(WB.User), false, g_uLiveIDP, true)
 }
 function BuildMSOTileBody()
 {
     var a = new WI;
     a.set("u37", UI.Function, LiveIDPRedirect);
     return new TILE.Body.M3.MSO(a)
 }
 TILE.Body.M3._MSOLoaded = true;
 TILE.Body.M3.MSO = function (a)
 {
     TILE.Body.Base.call(this, a);
     this.m_showInPicker = false;
 };
 TILE.Body.M3.MSO.prototype = 
 {
     _qx : function ()
     {
         this.submit();
         return {
             AllowSwitch : false
         }
     },
     _iu : function ()
     {
         return CRED.Type.MSO;
     }
 };
 TILE.Body.M3.MSO.derivesFrom(TILE.Body.Base);
 var PageMode = {
     Default : 0, InlineLogin : 1
 };
 WP0 = function (a)
 {
     this.pageMode = a;
 };
 WP0.prototype = 
 {
     _lg : function () {}, _qk : function () {}, draw : function () {},
     getLMHolderOne : function ()
     {
         return null;
     },
     getLMHolderTwo : function ()
     {
         return null;
     },
     _j9 : function ()
     {
         return this.pageMode;
     }
 };
 PM_Default = function (c)
 {
     var b = null, a = this;
     WP0.call(a, _rk(c, PageMode.Default));
     a.m_headerTD = b;
     a.m_mainTD = b;
     a.m_brandModeTD = b;
     a.m_signInTD = b;
     a.m_tilesTD = b;
     a.m_moreTD = b;
     a.m_footerTD = b;
     a.m_oFooterMode = b;
 };
 PM_Default.prototype = 
 {
     _lg : function ()
     {
         var b = null, c = _a4();
         document.body.appendChild(c);
         c.width = "100%";
         var a = _elNewCell(_elNewRow(c), "i0272");
         a.align = "center";
         this.m_headerTD = a;
         a = _elNewCell(_elNewRow(c), "shellTD");
         a.align = "center";
         var g = _a4();
         g.id = "shellTBL";
         a.appendChild(g);
         var i = 3, e = _elNewRows(g, i);
         a = _elNewCell(e[0]);
         var f = _a4(b, b);
         a.appendChild(f);
         f.id = "ctTBL";
         var j = _elNewRows(f, 1);
         tdI = _elNewCell(j[0], "mainTD");
         this.m_mainTD = tdI;
         a = _elNewCell(e[1]);
         if (BHO.State & BHOState.Installed) {
             var h = BHO.createObj();
             if (h) {
                 a.appendChild(h);
             }
             else {
                 BHO.State = BHOState.Disabled;
             }
         }
         var d = _aq("ev", b, "", b);
         a.appendChild(d);
         d.height = 0;
         d.height = 0;
         d.style.visibility = "hidden";
         a = _elNewCell(e[2], "footerTD", "cssFooterPadding");
         this.m_footerTD = a;
     },
     _qk : function ()
     {
         if (g_fHasGenericError) {
             return new LM_GenericError;
         }
         if (!"undefined".equals(typeof detectAdvancedLoginMode, true)) {
             return detectAdvancedLoginMode();
         }
         if (g_iLWAState == 1) {
             return new LM_LWAConfirm;
         }
         if (g_fHasErrorCode && g_sNewUser == "1" || g_sRealmDiscoveryJSON != "") {
             return new LM_NewUser;
         }
         if (g_iForcedCredtype > CRED.Type.Invalid) {
             return new LM_ForceCredType;
         }
         return new LM_NewUser;
     },
     draw : function ()
     {
         this.dHeader(true);
         this._fj();
         this._fa()
     },
     detectWLHeaderMode : function (b)
     {
         var a = null;
         if (b && !g_fPopupUI && g_iHeaderCobrandMode != HeaderCBMode.Default) {
             return this.detectAdvancedHeaderMode();
         }
         if (_c2(g_oTemplate, "", "Logo") != "")
         {
             var d = _c2(g_oTemplate, "", "Logo"), c = _c2(g_oTemplate, "", "LogoAltText");
             a = new WH2;
             a.setLogo(d, c)
         }
         else {
             a = new HM_Default;
         }
         g_fPopupUI && a.setTableWidth("350px");
         a.setShowBackground(_c2(g_oTemplate, true, "ShowWLHeader"));
         a.setBrandLogoURL(g_sHeaderCobrandLogo);
         a.setBrandHeading(g_sBrandHeader);
         return a;
     },
     detectAdvancedHeaderMode : function ()
     {
         var a = new HM_Default;
         switch (g_iHeaderCobrandMode)
         {
             case HeaderCBMode.CustomJS:
                 if (g_urlCustomJS)
                 {
                     a = new HM_CustomJS;
                     a.setJSSrc(g_urlCustomJS);
                     EVENT.add(a, HM_CustomJS.Event.OnError, this.addEventHandler(this.cevt_HMCustomJS_onerror))
                 }
                 break;
             case HeaderCBMode.IFrame:
                 a = new HM_IFrame;
                 a.setIFrameSrc(g_urlHeaderIFrame)
         }
         return a;
     },
     cevt_HMCustomJS_onerror : function ()
     {
         this.dHeader(false)
     },
     dHeader : function (a)
     {
         var b = this.detectWLHeaderMode(a);
         b.draw(this.m_headerTD)
     },
     _fj : function ()
     {
         var b = this, c = _a4();
         c.style.width = "100%";
         var a = _av(_elNewRow(c), 2);
         a[0].id = "brandModeTD";
         a[0].style.verticalAlign = "top";
         a[1].id = "signInTD";
         a[1].style.verticalAlign = "top";
         b.m_mainTD.appendChild(c);
         b.m_brandModeTD = a[0];
         b.m_signInTD = a[1];
         b._fs();
         b._gx()
     },
     _fs : function ()
     {
         var b = this, a = new BM_Default;
         if (g_fPopupUI) {
             a = new BM_PopUp;
         }
         else
         {
             switch (g_iProductCobrandMode) 
             {
                 case ProductCBMode.CustomJS:
                     if (g_urlCustomJS) 
                     {
                         a = new BM_CustomJS;
                         a.setJSSrc(g_urlCustomJS);
                         if (g_sBrandSubtitle.search(/##li\d{1,2}##/gi) > - 1) EVENT.add(a, BM_CustomJS.Event.OnError, 
                         b.addEventHandler(b.dBMSelect));
                         else EVENT.add(a, BM_CustomJS.Event.OnError, b.addEventHandler(b.dBMDefault)) 
                     }
                     break;
                 case ProductCBMode.IFrame:
                     var c = g_urlProductIFrame;
                     if (g_urlRegistration) {
                         c = setQSValue(c, "suu", encodeURIComponent(g_urlRegistration), 2083);
                     }
                     a = new BM_IFrame;
                     a.setIFrameSrc(c);
                     break;
                 case ProductCBMode.Select:
                     a = new BM_Select;
                     a.setBrandImg(g_urlBrandImage);
                     a.setTitle(g_sBrandTitle);
                     a.setSubTitle(g_sBrandSubtitle);
                     a.setShowSignup(g_objLoginMode._j9() != LoginMode.OTS && g_fSignup);
                     a.setSignupURL(g_urlRegistration);
                     a.setShowValueProp(g_fValProp);
                     a.setUpsellLink(g_urlUpsellLink);
                     break;
                 case ProductCBMode.Upsell:
                     a = new BM_Upsell;
                     a.setBrandImg(g_urlBrandImage);
                     a.setTitle(g_sBrandTitle);
                     a.setSubTitle(g_sBrandSubtitle);
                     a.setShowSignup(g_objLoginMode._j9() != LoginMode.OTS && g_fSignup);
                     a.setSignupURL(g_urlRegistration);
                     a.setShowValueProp(g_fValProp);
                     a.setUpsellLink(g_urlUpsellLink);
                     a.setUpsellText1(g_sUpsellTxt1);
                     a.setUpsellText2(g_sUpsellTxt2);
                     break;
                 case ProductCBMode.Default:
                     b.dBMDefault();
                     return ;
             }
         }
         a.draw(b.m_brandModeTD)
     },
     dBMDefault : function ()
     {
         var b = g_sBrandTitle, c = g_sBrandSubtitle;
         if (!b)
         {
             if (g_objLoginMode._j9() == LoginMode.OTS || !g_fSignup) {
                 b = g_s["b8"];
             }
             else {
                 b = g_s["b9"];
             }
             c = g_s["b10"]
         }
         var a = new BM_Default;
         a.setBrandImg(g_urlBrandImage);
         a.setTitle(b);
         a.setSubTitle(c);
         a.setShowSignup(g_objLoginMode._j9() != LoginMode.OTS && g_fSignup);
         a.setSignupURL(g_urlRegistration);
         a.setShowValueProp(g_fValProp);
         a.setUpsellLink(g_urlUpsellLink);
         a.draw(this.m_brandModeTD)
     },
     dBMSelect : function ()
     {
         var a = new BM_Select;
         a.setBrandImg(g_urlBrandImage);
         a.setTitle(g_sBrandTitle);
         a.setSubTitle(g_sBrandSubtitle);
         a.setShowSignup(g_objLoginMode._j9() != LoginMode.OTS && g_fSignup);
         a.setSignupURL(g_urlRegistration);
         a.setShowValueProp(g_fValProp);
         a.setUpsellLink(g_urlUpsellLink);
         a.draw(this.m_brandModeTD)
     },
     _gx : function ()
     {
         var b = _a4();
         b.style.width = "100%";
         var a = _av(_elNewRow(b), 2);
         a[1].id = "titleTD";
         a[1].className = "cssSubHeader";
         g_fPopupUI && _a7(a[1], Visibility.Removed);
         a = _av(_elNewRow(b), 2);
         var d = _a4();
         a[0].style.width = "21px";
         a[0].style.verticalAlign = "top";
         a[0].appendChild(d);
         if (!g_fPopupUI) {
             var e = _elNewCell(_elNewRow(d), "separatorTD");
             _bj(e, 1, true)
         }
         var c = _a4();
         c.style.width = "100%";
         a[1].style.verticalAlign = "top";
         a[1].appendChild(c);
         this.m_tilesTD = _elNewCell(_elNewRow(c), "rightTD");
         this.m_moreTD = _elNewCell(_elNewRow(c), "moreTD");
         _elNewCell(_elNewRow(b));
         this.m_signInTD.appendChild(b)
     },
     _fa : function ()
     {
         var a = this;
         if (!a.m_oFooterMode) {
             a.m_oFooterMode = _u4(g_fRtoL ? FModeFlags.RightToLeft : FModeFlags.None);
         }
         exists(a.m_footerTD) && exists(a.m_oFooterMode) && a.m_oFooterMode.draw(a.m_footerTD)
     },
     _u80 : function ()
     {
         return this.m_oFooterMode;
     },
     getLMHolderOne : function ()
     {
         return this.m_tilesTD;
     },
     getLMHolderTwo : function ()
     {
         return this.m_moreTD;
     }
 };
 PM_Default.derivesFrom(WP0);
 PM_InlineLogin = function (a)
 {
     WP0.call(this, _rk(a, PageMode.InlineLogin));
     this.m_lmHolder = null;
     this.m_bActiveXInitialized = false;
 };
 PM_InlineLogin.prototype = 
 {
     _lg : function ()
     {
         var a = BHO.createObj();
         if (a)
         {
             document.body.appendChild(a);
             if (BHO.getAuthBuffer("test", "test")) {
                 this.m_bActiveXInitialized = true;
             }
         }
         if (document.location.search.indexOf("activex=0") !=- 1) {
             this.m_bActiveXInitialized = true;
         }
     },
     _qk : function ()
     {
         if (!this.m_bActiveXInitialized)
         {
             g_sErrorCode = InlineErrorCodes.NoActiveX;
             g_sErrorText = g_s["vv23"];
             return new LM_InlineFinish
         }
         switch (g_iInlineLoginStep)
         {
             case InlineLoginStep.CredGathering:
                 if (g_fHIPLogin) {
                     return new LM_InlineHIPLogin;
                 }
                 else {
                     return new LM_InlineNewUser;
                 }
             case InlineLoginStep.CollectProofs:
                 return new LM_InlineCollectProofs;
             case InlineLoginStep.Finish:
                 return new LM_InlineFinish;
             case InlineLoginStep.IfExists:
                 return new LM_InlineIfExists
         }
         return new LM_InlineNewUser;
     },
     draw : function ()
     {
         this.m_lmHolder = _al("mainDiv");
         this.m_lmHolder.className = "cssMainDiv";
         document.body.appendChild(this.m_lmHolder)
     },
     getLMHolderOne : function ()
     {
         return this.m_lmHolder;
     }
 };
 PM_InlineLogin.derivesFrom(WP0);
 var PageModeObj = [WP0, PM_Default, PM_InlineLogin];
 function _mr(a)
 {
     var b = a.getWLProp(WB.User);
     _ii(b, false)
 }
 function _sb(a)
 {
     _ii(a.getWLProp(WB.User), true)
 }
 function _dd(x)
 {
     var p = "u39", d = "u16", o = "v24", n = "v22", m = "v21", v = "cssAlertTextBox", l = "v18", e = "u9", 
     k = "v10", j = "u17", u = "true", i = "disabled", h = "v6", t = "v4", g = "u18", f = "16px", w = "cssTextBoxTD", 
     s = "className", r = "4px", c = "paddingBottom", q = "u11", b = null, a = new WI;
     _dg(x, a, g_iMESTMarketDefault);
     a.pushModifier(b, UI.ID, createIDMod(x), WL_UIModType.Get);
     a.set("u25", UI.ID, "idDiv_FED_MsngrControl");
     a.set(q, UI.ID, "idImg_FED_Error_Icon");
     a.set(q, UI.Image, g_u["c14"]);
     a.set(q, UI.State, new WJ([["title", g_s["y0"]], [["alt", g_s["y0"]]]]));
     a.pushModifier(q, UI.Image, createIconMapImgMod("icon_err", 16, 16), WL_UIModType.Create);
     a.set("u20", UI.ID, "idTd_FED_Error");
     a.set("u20", UI.String, g_s["y1"]);
     a.set("v0", UI.ID, "idTd_FED_UsernameLbl");
     a.set("v0", UI.State, new WJ(b, [[c, r]]));
     a.set("v2", UI.ID, "idLbl_FED_Username");
     a.set("v2", UI.String, g_s["y2"]);
     a.pushModifier("v2", b, nobrContent, WL_UIModType.Apply);
     a.set("v3", UI.ID, "idTd_FED_UsernameTb");
     a.set("v3", UI.State, new WJ([[s, w]], [[c, f]]));
     a.set(g, UI.ID, "idTxtBx_FED_Username");
     a.set(g, UI.Input, InputType.TxtBx);
     a.set(g, UI.Name, "login");
     a.set(g, UI.State, g_stateUserTxtBx);
     a.pushModifier(g, UI.Input, createUserPropMod(USER_PROP_USERNAME), WL_UIModType.Apply | WL_UIModType.Create);
     a.set(t, UI.ID, "idDiv_FED_UsernameExample");
     a.set(t, UI.State, new WJ(b, [["color", "#999"]]));
     a.set(t, UI.String, g_s["y3"]);
     a.pushModifier(t, b, nobrContent, WL_UIModType.Apply);
     a.set("v5", UI.ID, "idTd_FED_PasswordLbl");
     a.set("v5", UI.State, new WJ(b, [[c, r]]));
     a.set(h, UI.ID, "idLbl_FED_Password");
     a.set(h, UI.State, new WJ([[i, u]]));
     a.set(h, UI.String, g_s["y4"]);
     a.pushModifier(h, b, nobrContent, WL_UIModType.Apply);
     a.set("v7", UI.ID, "idTd_FED_PasswordTb");
     a.set("v7", UI.State, new WJ([[s, w]], [[c, r]]));
     a.set(j, UI.ID, "idTxtBx_FED_Password");
     a.set(j, UI.Input, InputType.TxtBx);
     a.set(j, UI.Name, "passwd");
     a.set(j, UI.State, new WJ([["maxLength", "16"], ["autocomplete", "off"], ["imeMode", i], [s, "cssTextInput"]], 
     [["color", ""], ["backgroundColor", "#E1E1E1"]]));
     a.set("v8", UI.ID, "idTd_FED_PasswordHelp");
     a.set("v8", UI.State, new WJ(b, [[c, "20px"]]));
     a.set("v9", UI.ID, "idDiv_FED_ForgotPassword");
     a.set("v9", UI.State, new WJ([[s, "cssHelpText"], [i, u]], [["padding", "0px"]]));
     a.set(k, UI.ID, "idLbl_FED_ForgotPassword");
     a.set(k, UI.State, new WJ([[i, u]]));
     a.set(k, UI.String, g_s["y5"][g_iPwRstStr]);
     a.pushModifier(k, b, nobrContent, WL_UIModType.Apply);
     a.set("v11", UI.ID, "idTd_FED_MsngrControlTbl");
     a.set("v11", UI.State, new WJ(b, [[c, "20px"]]));
     a.set("v12", UI.ID, "idLbl_FED_MsngrControl");
     a.set("v12", UI.String, g_s["y6"]);
     a.pushModifier("v12", b, nobrContent, WL_UIModType.Apply);
     a.set("v16", UI.ID, "idTd_FED_CancelBtn");
     a.set("v16", UI.State, new WJ(b, [[c, f]]));
     a.set(e, UI.ID, "idBtn_FED_Cancel");
     a.set(e, UI.Input, InputType.Btn);
     a.set(e, UI.Name, "Cncl");
     a.set(e, UI.State, new WJ(b, [["height", "25px"]]));
     a.set(e, UI.String, g_s["y10"]);
     a.set([e, EVENT.Name.OnClick], UI.Event, _dm);
     a.set("v17", UI.ID, "idTd_FED_InviteBlocked");
     a.set("v17", UI.State, new WJ(b, [[c, f]]));
     a.set(l, UI.ID, "idDiv_FED_InviteBlocked");
     a.set(l, UI.State, new WJA(v));
     a.set(l, UI.HTML, g_h["y16"]);
     a.pushModifier(l, UI.HTML, _os, WL_UIModType.Get);
     a.set("v19", UI.ID, "idA_FED_ChangeUsername");
     a.set("v19", UI.String, g_s["y15"]);
     a.set("v20", UI.ID, "idTd_FED_ConflictMsg1");
     a.set("v20", UI.State, new WJ(b, [[c, f]]));
     a.set(m, UI.ID, "idDiv_FED_ConflictMsg1");
     a.set(m, UI.State, new WJA(v));
     a.set(m, UI.String, g_s["y17"]);
     a.pushModifier(m, UI.String, _os, WL_UIModType.Get);
     a.set(n, UI.ID, "idA_FED_ResolveConflict");
     a.set(n, UI.URL, g_u["x6"]);
     a.pushModifier(n, UI.URL, modConflicURL, WL_UIModType.Get);
     a.set(n, UI.String, g_s["y18"]);
     a.set("v23", UI.ID, "idTd_FED_FedLoginMsg");
     a.set("v23", UI.State, new WJ(b, [[c, f]]));
     a.set(o, UI.ID, "idDiv_FED_FedLoginMsg");
     a.set(o, UI.State, new WJA(v));
     a.set(o, UI.HTML, g_h["y19"]);
     a.pushModifier(o, UI.HTML, _os, WL_UIModType.Get);
     a.set("v25", UI.HTML, g_h["y20"]);
     a.pushModifier("v25", UI.HTML, replaceSquatterLink, WL_UIModType.Get);
     a.pushModifier("v25", UI.HTML, _os, WL_UIModType.Get);
     a.set(d, UI.ID, "idSubmit_FED_SignIn");
     a.set(d, UI.Name, "SI");
     a.set(d, UI.Prop, g_s["y21"]);
     a.pushModifier(d, UI.Prop, _os, WL_UIModType.Get);
     a.pushModifier(d, UI.Prop, function (a, b)
     {
         a.title = b.Content.get(d, UI.Prop, "");
         return a;
     },
     WL_UIModType.Apply);
     a.pushModifier(d, b, createTxtNodeLengthMod(40, "..."), WL_UIModType.Apply);
     a.pushModifier(d, b, nobrContent, WL_UIModType.Apply);
     a.set("u3", UI.ID, "idTd_FED_SUIMsngrTbl");
     a.set("u3", UI.State, new WJ(b, [[c, "8px"]]));
     a.set("v30", UI.ID, "idTd_FED_SUContinueBtn");
     a.set("v30", UI.State, new WJ(b, [[c, r]]));
     a.set(p, UI.ID, "idBtn_FED_SUContinue");
     a.set(p, UI.Input, InputType.Btn);
     a.set(p, UI.State, new WJ([["title", g_s["y25"]]], [["height", "21px"]]));
     a.set(p, UI.String, g_s["y24"]);
     a.set("u40", UI.ID, "idLbl_FED_SUSignedIn");
     a.set("u40", UI.String, g_s["y26"]);
     a.set("u40", UI.State, new WJA("cssSignedInLbl"));
     a.set("u35", UI.Flag, g_fShowMessenger);
     a.set("u32", UI.Flag, false);
     a.set("u31", UI.Flag, false);
     a.set("w0", UI.Flag, g_fIsInvite);
     a.set("u38", UI.Function, _sb);
     a.set("u37", UI.Function, _mr);
     a.set("y22", UI.String, g_s["y22"]);
     a.set("y23", UI.String, g_s["y23"]);
     return new TILE.Body.R3.Fed(a)
 }
 function replaceSquatterLink(a, b)
 {
     if (exists(b)) {
         var c = appendUserQS(g_u["x7"], b);
         a = a.replace(/#~#FederationRenameURL_LS#~#/g, c)
     }
     return a
 }
 function _os(a, b)
 {
     if (exists(b))
     {
         var d = b.getWLProp(WB.User), c = d[USER_PROP_FED_INFO] || new FedInfo;
         a = c.doStringReplace(a)
     }
     return a
 }
 function modConflicURL(b, c)
 {
     if (exists(c))
     {
         var a = c.getWLProp(WB.User), d = "";
         if (exists(a[USER_PROP_FED_INFO]) && a[USER_PROP_FED_INFO].hasValue(JSONProp.UserState)) {
             d = a[USER_PROP_FED_INFO].get(JSONProp.UserState);
         }
         b = _cv(b, [["ctx", _rh("username=" + a[USER_PROP_USERNAME] + "&uc=" + d)]])
     }
     return b
 }
 Crypto = function () {};
 Crypto.SHA1 = function (e)
 {
     for (var d = new Array(e.length), b = 0; b < e.length; b++) {
         d[b] = e.charCodeAt(b);
     }
     Crypto.padSHA1Input(d);
     var a = {};
     a["A"] = 1732584193;
     a["B"] = 4023233417;
     a["C"] = 2562383102;
     a["D"] = 271733878;
     a["E"] = 3285377520;
     for (b = 0; b < d.length; b += 64) {
         Crypto.sha1RoundFunction(a, d, b);
     }
     var c = [];
     c[0] = a.A;
     c[1] = a.B;
     c[2] = a.C;
     c[3] = a.D;
     c[4] = a.E;
     var f = Crypto.words2Hex(c);
     return f;
 };
 Crypto._rx = function (a, d, c)
 {
     for (var b = 3; b >= 0; b--) {
         d[c + b] = a & 255;
         a = a >>> 8;
     }
 };
 Crypto.padSHA1Input = function (c)
 {
     var b = c.length, f = b, e = b % 64, g = e < 55 ? 56 : 120, a, h = b - e;
     c[f++] = 128;
     for (a = e + 1; a < g; a++) {
         c[f++] = 0;
     }
     var d = b * 8;
     for (a = 1; a < 8; a++) {
         c[f + 8 - a] = d & 255;
         d = d >>> 8;
     }
 };
 Crypto.sha1RoundFunction = function (b, m, n)
 {
     var i = 4294967295, o = 1518500249, p = 1859775393, q = 2400959708, r = 3395469782, a, g, l, h = [], 
     f = b.A, c = b.B, d = b.C, e = b.D, j = b.E;
     for (g = 0, l = n; g < 16; g++, l += 4) {
         h[g] = m[l] << 24 | m[l + 1] << 16 | m[l + 2] << 8 | m[l + 3] << 0;
     }
     for (g = 16; g < 80; g++) {
         h[g] = Crypto._oz(h[g - 3]^h[g - 8]^h[g - 14]^h[g - 16], 1);
     }
     var k;
     for (a = 0; a < 20; a++) {
         k = Crypto._oz(f, 5) + (c & d | ~c & e) + j + h[a] + o & i;
         j = e;
         e = d;
         d = Crypto._oz(c, 30);
         c = f;
         f = k
     }
     for (a = 20; a < 40; a++) {
         k = Crypto._oz(f, 5) + (c^d^e) + j + h[a] + p & i;
         j = e;
         e = d;
         d = Crypto._oz(c, 30);
         c = f;
         f = k
     }
     for (a = 40; a < 60; a++) {
         k = Crypto._oz(f, 5) + (c & d | c & e | d & e) + j + h[a] + q & i;
         j = e;
         e = d;
         d = Crypto._oz(c, 30);
         c = f;
         f = k
     }
     for (a = 60; a < 80; a++) {
         k = Crypto._oz(f, 5) + (c^d^e) + j + h[a] + r & i;
         j = e;
         e = d;
         d = Crypto._oz(c, 30);
         c = f;
         f = k
     }
     b.A = b.A + f & i;
     b.B = b.B + c & i;
     b.C = b.C + d & i;
     b.D = b.D + e & i;
     b.E = b.E + j & i;
 };
 Crypto._oz = function (b, a)
 {
     var c = b >>> 32 - a, e = (1 << 32 - a) - 1, d = b & e;
     return d << a | c;
 };
 Crypto.words2Hex = function (b)
 {
     for (var d = "", c = "0123456789abcdef", a = 0; a < b.length * 4; a++) {
         d += c.charAt(b[a >> 2] >> (3 - a % 4) * 8 + 4 & 15) + c.charAt(b[a >> 2] >> (3 - a % 4) * 8 & 15);
     }
     return d;
 };
 RealmDiscCache = function (b, c, f, d, h, g, e)
 {
     var a = this;
     a.m_dicCache = [];
     a.m_dicAllow = [];
     a.m_dicStateWL = d || [];
     a.m_fReadOnly = g || false;
     a.m_iMaxSize = h || 0;
     a.m_arrAllowCallbacks = c || [];
     a.m_iAllowState = f;
     a.m_evtOnChange = e;
     if (b) {
         a.m_dicCache = b.doubleSplit("|", ":", true);
     }
 };
 RealmDiscCache.prototype = 
 {
     add : function (b, c)
     {
         var a = this;
         if (!a.m_fReadOnly && _l7(b) && exists(c))
         {
             for (var e = false, d = 0; d < a.m_dicStateWL.length; d++) if (a.m_dicStateWL[d] == c) {
                 e = true;
                 break
             }
             if (e && b._u54() && a.get(b) == null) {
                 a.m_dicCache[b._u52(false, true)] = c;
                 a.trim();
                 a._dp()
             }
         }
     },
     remove : function (a)
     {
         if (!this.m_fReadOnly && _l7(a) && a._u54()) {
             this.m_dicCache[a._u52(false, true)] = null;
             this._dp()
         }
     },
     "get" : function (b)
     {
         var a = this;
         if (_l7(b) && b._u54())
         {
             if (exists(a.m_iAllowState))
             {
                 for (var c = 0; c < a.m_arrAllowCallbacks.length; c++)
                 {
                     if (_lw(a.m_arrAllowCallbacks[c]) && a.m_arrAllowCallbacks[c](b)) {
                         return a.m_iAllowState;
                     };
                 }
             }
             var d = a.m_dicCache[b._u52(false, true)];
             if (exists(d) && !isNaN(d)) {
                 return d;
             }
         }
         return null;
     },
     clear : function ()
     {
         this.m_dicCache = [];
     },
     trim : function ()
     {
         var a = this;
         while (a.m_iMaxSize > 0 && a.m_dicCache.length > a.m_iMaxSize) {
             a.m_dicCache.shift();
         }
     },
     _dp : function ()
     {
         _lw(this.m_evtOnChange) && this.m_evtOnChange(this)
     },
     _jg : function ()
     {
         var b = "", c = true;
         for (var a in this.m_dicCache)
         {
             if (!_lw(this.m_dicCache[a])) {
                 if (!c) {
                     b += "|";
                 }
                 else {
                     c = false;
                 }
                 b += a + ":" + this.m_dicCache[a] 
             }
             return b;
         }
     }
 };
 RealmDiscCache.PartialDomainMatch = function (a)
 {
     return function (b)
     {
         return b._u52(true, true) == a;
     }
 };
 RealmDiscCache.ExactDomainMatch = function (a)
 {
     return function (b)
     {
         return b._u52(false, false) == a;
     }
 };
 RealmDiscCache.TertiaryDomainMatch = function (a)
 {
     return function (b)
     {
         return a && b._u52(false, false).indexOf(a) !=- 1;
     }
 };
 var ERROR_REALMDISCHANDLER_VALIDATION_LOGIN = 10, USER_REALMDISCOVERY_BADPMN =- 2, USER_REALMDISCOVERY_ERROR =- 1, 
 USER_REALMDISCOVERY_NOCACHE_PWDOK = 0, USER_REALMDISCOVERY_NOCACHE_FED = 1, USER_REALMDISCOVERY_EMAIL_PWDOK = 2, 
 USER_REALMDISCOVERY_EMAIL_FED = 3, USER_REALMDISCOVERY_DOMAIN_PWDOK = 4, k_fRealmNone = 0, k_fRealmAllowWLIDSignIn = 1 << 0, 
 k_fRealmAllowFedSignIn = 1 << 1, k_fRealmConflictInactive = 1 << 2, k_fRealmConflict = 1 << 3;
 RealmDiscHandler = function (b)
 {
     var a = this;
     a.m_strLogin = null;
     a.m_objCache = b;
     a.m_arrLastResults = [];
     a.response = new JSONInfo;
     EVENT._b2(AJAX.Event.OnReceiveResponse, a)
 };
 RealmDiscHandler.prototype = 
 {
     set_event : function (a)
     {
         this.objEvent = a;
     },
     get_event : function ()
     {
         return this.objEvent;
     },
     _qz : function ()
     {
         var a = this;
         a.m_arrLastResults = [];
         (!_l7(a.m_strLogin) || !a.m_strLogin._u54()) && a.m_arrLastResults.push(ERROR_REALMDISCHANDLER_VALIDATION_LOGIN);
         if (a.m_arrLastResults.length > 0) {
             a._ot();
             return false
         }
         return true;
     },
     _o6 : function (b, d)
     {
         var a = this;
         a.set_event(d);
         if (a.response.hasValue(FedProp.Username) && a.response.get(FedProp.Username) == b) {
             a._ot();
             return
         }
         a.m_strLogin = b.trim();
         a.response = new FedInfo(null);
         if (a.m_objCache)
         {
             var c = a.m_objCache.get(b);
             if (c != null) {
                 a.m_arrLastResults = [];
                 a.m_arrLastResults.push(c);
                 a._ot();
                 return
             }
         }
         if (a._qz())
         {
             a.m_strCurrRequest = a._dj();
             if (!exists(a.m_objAJAX))
             {
                 a.m_objAJAX = new AJAXHandler("GetUserRealm.srf", AJAX.Req.POST, true);
                 EVENT.add(a.m_objAJAX, AJAX.Event.OnSuccess, a.addEventHandler(a._hp));
                 EVENT.add(a.m_objAJAX, AJAX.Event.OnError, a.addEventHandler(a._hp))
             }
             a.m_objAJAX._o6(a.m_strCurrRequest, a.get_event())
         }
     },
     _dj : function ()
     {
         var a = "handler=1";
         a += "&login=" + _rh(this.m_strLogin);
         return a;
     },
     getState : function ()
     {
         var a = this;
         if (a.response.fromJSON()) {
             return a.response.get(JSONProp.State);
         }
         else if (a.m_arrLastResults.length > 0) {
             return a.m_arrLastResults[0];
         }
         return null;
     },
     _ot : function ()
     {
         var a = this;
         if (!a.response.fromJSON())
         {
             a.response = new FedInfo;
             a.response.set(JSONProp.State, _c2(a.m_arrLastResults, USER_REALMDISCOVERY_ERROR, 0));
             a.response.set(FedProp.Username, _rk(a.m_strLogin, ""))
         }
         EVENT._im(a, AJAX.Event.OnReceiveResponse, a.get_event())
     },
     _u94 : function (b)
     {
         var a = this;
         a.m_arrLastResults = [];
         a.m_strCurrRequest = null;
         a.response = new FedInfo(new JSONObject(b));
         if (a.response.hasValue(JSONProp.State)) {
             a.m_arrLastResults.push(a.response.get(JSONProp.State));
         }
         else {
             a.m_arrLastResults.push(USER_REALMDISCOVERY_ERROR);
         }
         a._cn(a.response)
     },
     _l4 : function ()
     {
         return this.m_objAJAX._l4();
     },
     _j4 : function ()
     {
         return this.m_arrLastResults;
     },
     _hp : function (a)
     {
         this.set_event(a.get_event());
         this._u94(a._ki());
         this._ot()
     },
     _h4 : function (b)
     {
         var a = EVENT._kq(b);
         a && _lt(a, "input") && this._o6(a.value, EVENT.get(b))
     },
     _cn : function (a)
     {
         if (!exists(this.m_objCache) || !a.fromJSON() || !a.hasValue(JSONProp.State) || !a.hasValue(FedProp.Username)) {
             return;
         }
         this.m_objCache.add(a.get(FedProp.Username), a.get(JSONProp.State))
     }
 };
 TILE.Body.R3._fedLoaded = true;
 TILE.Body.R3.Fed = function (a)
 {
     TILE.Body.Base.call(this, a);
     this.m_showInPicker = false;
 };
 TILE.Body.R3.Fed.prototype = 
 {
     _gf : function (c)
     {
         var f = true, d = null, a = this, e = a.getWLProp(WB.User), u = a, b = _av(_elNewRow(c), 1);
         b[0].appendChild(_er0.UI.newError(a.getWLProp(WB.ErrorMode), a._jm("u20")));
         b = _av(_elNewRow(c), 1);
         a.Content.apply("v0", b[0]);
         var j = _as(d, d, a._jm("u18"));
         j = a.Content.apply("v2", j);
         b[0].appendChild(j);
         b = _av(_elNewRow(c), 1);
         a.Content.apply("v3", b[0]);
         var s = a.Content.create("u18", UI.Input), r = a.Content.apply("v4", _al());
         b[0].appendChild(_bf(s, r));
         if (!a._l2(e))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v5", b[0]);
             var o = a.Content.apply("v6", _as(d, d, a._jm("u17")));
             b[0].appendChild(o);
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v7", b[0]);
             var m = a.Content.create("u17", UI.Input);
             m.disabled = f;
             b[0].appendChild(m);
             if (!a.Content.get("u32", UI.Flag, false))
             {
                 b = _av(_elNewRow(c), 1);
                 a.Content.apply("v8", b[0]);
                 var n = a.Content.apply("v9", _al()), p = a.Content.apply("v10", _as());
                 n.appendChild(p);
                 b[0].appendChild(n)
             }
         }
         if (a._j8())
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v11", b[0]);
             var g = _am(3);
             b[0].appendChild(g);
             var k = a.Content.apply("v12", _as(d, d, a._j8()._iu()));
             g.rows[0].cells[0].appendChild(k);
             _bj(g.rows[0].cells[1], 1, f);
             g.rows[0].cells[2].appendChild(a._j8());
             if (a._ly(e)) {
                 k.disabled = f;
                 a._j8().disabled = f;
             }
         }
         if (a.Content.get("u31", UI.Flag, false))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v16", b[0]);
             var q = a.Content.create("u9", UI.Input);
             b[0].appendChild(q)
         }
         if (a.Content._d6("u7", UI.ID) || a.Content._d6("u8", UI.ID))
         {
             b = _av(_elNewRow(c), 1);
             if (a.Content._d6("u7", UI.ID)) {
                 linkId = "u7";
             }
             else {
                 linkId = "u8";
             }
             var t = a.Content.create(linkId, UI.URL);
             b[0].appendChild(t)
         }
         var v = function (a)
         {
             return u._os(a, e);
         };
         if (a._ly(e))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v17", b[0]);
             b[0].appendChild(a.Content.apply("v18", _al()));
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(a.Content.apply("v19", _au(d, d, a.addEventHandler(a._g4), f)))
         }
         else if (a._l6(e))
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v20", b[0]);
             b[0].appendChild(a.Content.apply("v21", _al()));
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(a.Content.create("v22", UI.URL))
         }
         else
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("v23", b[0]);
             var h = a.Content.apply("v24", _al());
             b[0].appendChild(h);
             if (a._l5(e))
             {
                 h.appendChild(_ag());
                 h.appendChild(_ag());
                 h.appendChild(a.Content.apply("v25", _al()))
             }
             b = _av(_elNewRow(c), 1);
             var i = _a2();
             i.style.display = "none";
             b[0].appendChild(i);
             var l = a.Content.apply("u16", _au());
             EVENT.add(l, EVENT.Name.OnClick, function (a)
             {
                 i.click();
                 EVENT.end(a)
             });
             b[0].appendChild(l)
         }
     },
     _gn : function () {},
     _go : function (k)
     {
         var g = "100%", a = this, h = a.getWLProp(WB.User), c = _a4();
         c.style.width = g;
         k.appendChild(c);
         var b = null;
         if (a._j8())
         {
             b = _av(_elNewRow(c), 1);
             a.Content.apply("u3", b[0]);
             var f = _am(3);
             b[0].appendChild(f);
             var i = a.Content.apply("v12", _as());
             f.rows[0].cells[0].appendChild(i);
             _bj(f.rows[0].cells[1], 1, true);
             f.rows[0].cells[2].appendChild(a._j8())
         }
         b = _av(_elNewRow(c), 1);
         var e = _am(2);
         b[0].appendChild(e);
         var d = null;
         if (a._ts(h)) {
             a.Content.apply("v30", b[0]);
             d = a.Content.create("u39", UI.Input)
         }
         else
         {
             var j = function (a)
             {
                 this.submit();
                 EVENT.end(a)
             };
             d = a.Content.apply("u16", _au());
             EVENT.add(d, EVENT.Name.OnClick, a.addEventHandler(j))
         }
         e.style.width = g;
         e.rows[0].cells[0].style.width = g;
         e.rows[0].cells[1].appendChild(d);
         if (a._ts(h)) {
             b = _av(_elNewRow(c), 1);
             b[0].appendChild(a.Content.apply("u40", _as()))
         }
     },
     _ts : function (a)
     {
         return a[USER_PROP_SIGNED_IN] == true;
     },
     setFocus : function ()
     {
         var a = this, c = a.getWLProp(WB.User), b = null;
         if (a._ly(c)) {
             b = a._jl("v19");
         }
         else if (a._l6(c)) {
             b = a._jl("v22");
         }
         else {
             b = a._jl("u16");
         }
         setElemFocus(b, "a", false)
     },
     _ju : function ()
     {
         var a = this.getWLProp(WB.User);
         if (_c1(a, USER_PROP_FED_INFO)) {
             return a[USER_PROP_FED_INFO].get(FedProp.Domain);
         }
         this.Content.get("y23", UI.String, "")
     },
     _qx : function ()
     {
         if (this.getWLProp(WB.State) == WD.Active) {
             return {
                 AllowSwitch : false 
             };
         }
         return {
             AllowSwitch : true
         }
     },
     _iu : function ()
     {
         return CRED.Type.Fed;
     },
     _jy : function (b)
     {
         var a = [];
         switch (b)
         {
             case TILE.Body.Error._er3:
                 a[0] = this._jm("u20");
                 a[1] = this.Content.get("y22", UI.String);
                 break;
             default:
                 a[0] = null;
                 a[1] = null
         }
         return a;
     },
     _l9 : function (d)
     {
         var a = null, b = d[USER_PROP_FED_INFO];
         if (b)
         {
             if (b.hasValue(JSONProp.State))
             {
                 if (b.get(JSONProp.State) == 4) {
                     a = false;
                 }
                 var c = b.get(JSONProp.UserState);
                 if (exists(c) && c >= 0) {
                     if (c & k_fRealmAllowFedSignIn) {
                         a = true;
                     }
                     else {
                         a = false;
                     };
                 }
             }
         }
         if (a != null) {
             d[USER_PROP_FEDERATED] = a;
         }
         return a == true;
     },
     _l2 : function (a)
     {
         if (this._l6(a) || this._ly(a)) {
             return true;
         }
         return false;
     },
     _ly : function (c)
     {
         var a = c[USER_PROP_FED_INFO];
         if (a)
         {
             var b = a.get(FedProp.Group);
             if (this.Content.get("w0", UI.Flag, false) && exists(b) && b === "business") {
                 return true;
             }
         }
         return false;
     },
     _l6 : function (c)
     {
         var b = c[USER_PROP_FED_INFO];
         if (b)
         {
             var a = b.get(JSONProp.UserState);
             if (exists(a) && a >= 0 && a & k_fRealmConflict && !(a & k_fRealmConflictInactive)) {
                 return true;
             }
         }
         return false;
     },
     _l5 : function (c)
     {
         var b = c[USER_PROP_FED_INFO];
         if (b)
         {
             var a = b.get(JSONProp.UserState);
             if (exists(a) && a >= 0 && a & k_fRealmConflictInactive) {
                 return true;
             }
         }
         return false;
     },
     _g4 : function (b)
     {
         var a = this._jl("u18");
         if (_lt(a, "input")) {
             a.value = "";
         }
         this.Content._d6("v19", UI.Function) && this.Content.get("v19", UI.Function)(b);
         EVENT.end(b)
     }
 };
 TILE.Body.R3.Fed.derivesFrom(TILE.Body.Base);
 AJAX = {};
 AJAX.Req = {
     POST : "POST"
 };
 AJAX.State = {
     UNSENT : 0, OPEN : 1, SENT : 2, LOADING : 3, DONE : 4
 };
 AJAX.Event = {
     OnReceiveResponse : "receiveresponse", OnSuccess : "ajaxsuccess", OnError : "ajaxerror"
 };
 AJAXHandler = function (g, h, e, i, f, d, c)
 {
     var b = null, a = this;
     a.m_objXMLHttp = b;
     a.m_urlTarget = _rl(g);
     a.m_strReqType = _rl(h);
     a.m_fAsync = e != b ? e : true;
     a.m_strUser = _rl(i);
     a.m_strPwd = _rl(f);
     a.m_strHeaderName = d != b ? d : "Content-type";
     a.m_strHeaderValue = c != b ? c : "application/x-www-form-urlencoded";
     a._lg();
     a.m_strRequest = "";
     a.m_strRespose = "";
     a.m_arrHTTPSuccess = [];
     a.m_arrHTTPSuccess[HTTPCode.OK] = true;
     a.m_arrHTTPSuccess[HTTPCode.NOT_MODIFIED] = true;
     EVENT._b2(AJAX.Event.OnSuccess, a);
     EVENT._b2(AJAX.Event.OnError, a)
 };
 AJAXHandler.prototype = 
 {
     set_event : function (a)
     {
         this.objEvent = a;
     },
     get_event : function ()
     {
         return this.objEvent;
     },
     _lg : function (b)
     {
         var a = this;
         if (a.m_objXMLHttp == null) {
             a.m_objXMLHttp = new _XMLHttpRequest;
         }
         try
         {
             if (a.m_strUser.length > 0)
             {
                 a.m_objXMLHttp.open(a.m_strReqType, a.m_urlTarget, a.m_fAsync, a.m_strUser, a.m_strPwd);
             }
             else {
                 a.m_objXMLHttp.open(a.m_strReqType, a.m_urlTarget, a.m_fAsync);
             }
             a.m_strResponse = "";
             a.m_objXMLHttp.setRequestHeader(a.m_strHeaderName, a.m_strHeaderValue)
         }
         catch (c) {
             b && b(a)
         }
     },
     _o6 : function (b, c)
     {
         var a = this;
         a.set_event(c);
         if (a.m_objXMLHttp == null || a.getState() != AJAX.State.OPEN) {
             a._lg();
             a.m_strRequest = b
         }
         a.m_objXMLHttp.onreadystatechange = a.addEventHandler(a._v12);
         a.m_strRequest = b;
         if (a.getState() == 4) {
             return false;
         }
         a.m_objXMLHttp.send(a.m_strRequest)
     },
     _v12 : function (b)
     {
         var a = this;
         if (exists(a.m_objXMLHttp))
         {
             if (!a._lr()) {
                 return;
             }
             a.m_strResponse = a.m_objXMLHttp.responseText;
             a.set_event(EVENT.get(b));
             if (a._l8()) {
                 EVENT._im(a, AJAX.Event.OnSuccess, a.get_event());
             }
             else!a._l8() && EVENT._im(a, AJAX.Event.OnError, a.get_event())
         }
     },
     _h2 : function ()
     {
         var a = this;
         if (a.m_objXMLHttp)
         {
             var c = a.getState();
             if (a.m_arrStateHandlers[c])
             {
                 var b = a.m_arrStateHandlers[c], d = a._ko();
                 if (c <= AJAX.State.OPEN) {
                     b(a);
                 }
                 else if (a._l8() && b[1]) {
                     b[1](a);
                 }
                 else!a._l8() && b[0] && b[0](a)
             }
         }
     },
     _cm : function (a)
     {
         if (a) {
             this.m_arrHTTPSuccess[a] = true;
         }
     },
     _b6 : function (a)
     {
         if (a && this.m_arrHTTPSuccess[a]) {
             this.m_arrHTTPSuccess[a] = false;
         }
     },
     getState : function ()
     {
         if (this.m_objXMLHttp) {
             return this.m_objXMLHttp.readyState;
         }
         return AJAX.State.UNSENT;
     },
     _ko : function ()
     {
         if (this.m_objXMLHttp) {
             return this.m_objXMLHttp.status;
         }
         return 0;
     },
     _ki : function ()
     {
         return this.m_strResponse;
     },
     _kq : function ()
     {
         return this.m_urlTarget;
     },
     _kg : function ()
     {
         return this.m_strReqType;
     },
     _je : function ()
     {
         return this.m_fAsync;
     },
     _kh : function ()
     {
         return this.m_strRequest;
     },
     _l4 : function ()
     {
         if (this.m_objXMLHttp) {
             var a = this.getState();
             if (a > AJAX.State.OPEN && a < AJAX.State.DONE) {
                 return true;
             }
         }
         return false;
     },
     _lr : function ()
     {
         return this.m_objXMLHttp && this.getState() == AJAX.State.DONE;
     },
     _l8 : function ()
     {
         return this._lr() && this.m_arrHTTPSuccess[this._ko()];
     }
 };
 var __WLWorkflow = true