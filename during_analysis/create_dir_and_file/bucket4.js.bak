/* Copyright (C) 2012 Microsoft Corporation */History={};
(function(){
    var e=_innerWindow=window,d=e.top,a=History,o=$Utility,c=true,H=e["$Config"],m=H&&H.AjaxHistory;
    function B(b){
        a.disableBookmarking=b&&b.db;
        a.configState=b&&b.state||{};
        a.configHash=h("",a.configState);
        a.sessionId=a.disableBookmarking&&Math.floor(Math.random()*1e3+1)||""
    }
    a.initInstance=B;
    jQuery(e).bind("unload",u);
    function u(){
        d.$Do.iff("$History.detachAll");
        if(e==d)G();
        else d.$Do.remove("$History",0,y);
        jQuery(e).unbind("unload",u)
    }
    a.dispose=u;
    function y(){
        _innerWindow.History=d.History;
        d.History.initInstance(m);
        _innerWindow.$Do.register("$History",0,c);
        _innerWindow.$Do.register("$History.attach",d.History.attach,c);
        _innerWindow.$Do.register("$History.attachPF",d.History.attachPF,c);
        _innerWindow.$Do.register("$History.navigateTo",d.History.navigateTo,c)
    }
    if(_innerWindow!=d){
        d.$Do.when("$History",0,y);
        return
    }
    else B(m);
    var x="ajhs",k="NavigateEvent",s="PFEvent",Q=document.documentMode,P=m&&m.id,i=a.configState,K=i,q=$B.BB_M5?"#":"",b=p(),C=b,t,f,l,r=$B.IE&&($B.V<8||Q<8),L="onhashchange" in window&&!r;
    a.attach=I;
    a.attachPF=F;
    a.detachPF=G;
    a.detach=U;
    a.detachAll=E;
    a.addNavigationStep=R;
    a.addPFState=T;
    a.navigateTo=D;
    j();
    if(L)e.onhashchange=j;
    else setInterval(j,100);
    function I(b){
        jQuery(a).bind(k,b)
    }
    function F(b){
        jQuery(a).bind(s,b)
    }
    function G(b){
        jQuery(a).unbind(s,b)
    }
    function U(b){
        jQuery(a).unbind(k,b)
    }
    function E(){
        jQuery(a).unbind(k)
    }
    function j(){
        if(!l){
            l=1;
            try{
                var a=p();
                if(a!=b)w(a)
            }
            finally{
                l=0
            }
            
        }
        
    }
    function w(c){
        if(r&&l&&b!=c)z(c);
        var d=n(b),a=n(c);
        if(d.pf!=a.pf)O(a.pf,a.app);
        else if(!J(d.app,a.app))M(a.app);
        b=p()
    }
    function M(b){
        b=b?b:a.configHash;
        i=g(b).app;
        if(a.disableBookmarking&&i[x]!=a.sessionId)i=a.configState;
        f=1;
        jQuery(a).trigger(k,i);
        f=0
    }
    function O(d,c){
        f=1;
        var b=jQuery.Event(s);
        b.pfState=c?[d,"#",c].join(""):d;
        jQuery(a).trigger(b);
        if(b.result)S(h(b.result,{}));
        f=0
    }
    function D(a){
        if(typeof a==="string")a=g(a).app;
        var c=g(b).pf;
        v(q+h(c,a));
        j()
    }
    function A(a){
        var d=b;
        b=a;
        if(d!=b){
            v(q+b,c);
            if(r)z(b)
        }
        
    }
    function R(c,i){
        if(!f){
            if(typeof c==="string")c=g(c).app;
            if(a.disableBookmarking)c[x]=a.sessionId;
            var d=g(b);
            if(i)d.app={};
            for(var e in c)d.app[e]=c[e];
            var j=h(d.pf,d.app);
            A(j)
        }
        
    }
    function T(c){
        if(!f){
            var d=g(b).pf,a=h(c,{});
            A(a)
        }
        
    }
    function V(b,a){
        if(!t){
            v(q+(a?C:b));
            w(a?h(n(C).pf,K):b)
        }
        
    }
    function z(c){
        var b=_ge(P).contentWindow.document;
        t=1;
        setTimeout(function(){
            a.Inform=V
        }
        ,0);
        b.open();
        b.write(["<s","cript>","function _a(){",$Config.dl?"document.domain='"+$Config.d+"';":"","window['stateStr']='",escape(c),"';var ph=parent.History;if(ph&&ph.Inform){ph.Inform(unescape(window['stateStr']))}","}","</s","cript>","<body onload='_a()'></body>"].join(""));
        b.close();
        t=0
    }
    function p(){
        var b=e.top.document.location.href,a=b.indexOf("#"),c=a==-1?"":b.substr(a+1);
        return c
    }
    function v(c,a){
        document.location.hash=c;
        if(a)b=p()
    }
    function S(b){
        var a=e.top.document.location;
        a.replace([a.protocol,"//",a.host,a.pathname,a.search,"#",b].join(""))
    }
    function h(c,d){
        var a=o.serialize(d),b=a;
        if(c)b=["!",c,a!=""?"!":"",a].join("");
        return b
    }
    function g(c){
        var a=n(c),b=a.app!=""?o.deserialize(a.app):{};
        return {
            pf:a.pf,app:b
        }
        
    }
    function n(a){
        var d,b;
        if(a.indexOf("!")==0){
            a=a.substr(1);
            var c=a.indexOf("!");
            if(c>-1){
                d=a.substr(0,c);
                b=a.substr(c+1)
            }
            else{
                d=a;
                b=""
            }
            
        }
        else b=a;
        return {
            pf:d,app:b
        }
        
    }
    function J(a,b){
        var c=o.deserialize(a),d=o.deserialize(b);
        return N(c,d)
    }
    function N(a,b){
        for(var d in a)if((a[d]||0)!==(b[d]||0))return false;
        for(var e in b)if((b[e]||0)!==(a[e]||0))return false;
        return c
    }
    $Do.register("$History",0,c);
    $Do.register("$History.attach",I,c);
    $Do.register("$History.attachPF",F,c);
    $Do.register("$History.detachAll",E,c);
    $Do.register("$History.navigateTo",D,c)
})();
var FilesIS32={
    previousEnabled:{
        x:1,y:1,w:40,h:80
    }
    ,nextEnabled:{
        x:43,y:1,w:40,h:80
    }
    ,nextDisabled:{
        x:1,y:83,w:40,h:80
    }
    ,previousDisabled:{
        x:43,y:83,w:40,h:80
    }
    ,mobileUpsell:{
        x:85,y:1,w:77,h:42
    }
    ,processingVideo_48:{
        x:85,y:45,w:48,h:48
    }
    ,video_48:{
        x:85,y:95,w:48,h:48
    }
    ,skydrive:{
        x:164,y:1,w:45,h:40
    }
    ,friendsIcon:{
        x:135,y:45,w:32,h:32
    }
    ,mailIcon:{
        x:169,y:43,w:32,h:32
    }
    ,embedIcon:{
        x:135,y:79,w:32,h:32
    }
    ,linkIcon:{
        x:169,y:77,w:32,h:32
    }
    ,processingVideo_32:{
        x:135,y:113,w:32,h:32
    }
    ,publicIcon:{
        x:169,y:111,w:32,h:32
    }
    ,video_32:{
        x:1,y:165,w:32,h:32
    }
    ,goBackNormal:{
        x:35,y:165,w:18,h:18
    }
    ,goBackHover:{
        x:55,y:165,w:18,h:18
    }
    ,skydrive_16:{
        x:85,y:145,w:18,h:14
    }
    ,zoomInRest:{
        x:75,y:165,w:16,h:16
    }
    ,zoomOutHover:{
        x:105,y:145,w:16,h:16
    }
    ,zoomOutRest:{
        x:93,y:163,w:16,h:16
    }
    ,centerHover:{
        x:111,y:163,w:16,h:16
    }
    ,zoomInHover:{
        x:93,y:181,w:16,h:16
    }
    ,centerRest:{
        x:129,y:147,w:16,h:16
    }
    ,info_gray_16:{
        x:111,y:181,w:16,h:16
    }
    ,info_16:{
        x:147,y:147,w:16,h:16
    }
    ,warning:{
        x:35,y:185,w:12,h:12
    }
    ,privateIcon:{
        x:49,y:185,w:8,h:10
    }
    ,restoreRest:{
        x:59,y:185,w:10,h:10
    }
    ,restoreHover:{
        x:71,y:185,w:10,h:10
    }
    
}
,FilesIS8={
    ft_48_Zip:{
        x:1,y:1,w:48,h:48
    }
    ,ft_48_Blank:{
        x:51,y:1,w:48,h:48
    }
    ,ft_48_EmptyDocumentFolder:{
        x:1,y:51,w:48,h:48
    }
    ,ft_48_NonEmptyFavoriteFolder:{
        x:51,y:51,w:48,h:48
    }
    ,ft_48_Xlsx:{
        x:101,y:1,w:48,h:48
    }
    ,ft_48_NonEmptyAlbum:{
        x:101,y:51,w:48,h:48
    }
    ,ft_48_Docx:{
        x:1,y:101,w:48,h:48
    }
    ,ft_48_Video:{
        x:51,y:101,w:48,h:48
    }
    ,ft_48_Txt:{
        x:101,y:101,w:48,h:48
    }
    ,ft_48_Pptx:{
        x:151,y:1,w:48,h:48
    }
    ,ft_48_Photo:{
        x:151,y:51,w:48,h:48
    }
    ,ft_48_Notebook:{
        x:151,y:101,w:48,h:48
    }
    ,ft_48_EmptyAlbum:{
        x:1,y:151,w:48,h:48
    }
    ,ft_48_NonEmptyDocumentFolder:{
        x:51,y:151,w:48,h:48
    }
    ,ft_48_Audio:{
        x:101,y:151,w:48,h:48
    }
    ,ft_32_Audio:{
        x:151,y:151,w:32,h:32
    }
    ,ft_32_Zip:{
        x:201,y:1,w:32,h:32
    }
    ,ft_32_Blank:{
        x:201,y:35,w:32,h:32
    }
    ,ft_32_EmptyAlbum:{
        x:201,y:69,w:32,h:32
    }
    ,ft_32_NonEmptyAlbum:{
        x:201,y:103,w:32,h:32
    }
    ,ft_32_NonEmptyDocumentFolder:{
        x:185,y:151,w:32,h:32
    }
    ,ft_32_EmptyDocumentFolder:{
        x:1,y:201,w:32,h:32
    }
    ,ft_32_NonEmptyFavoriteFolder:{
        x:35,y:201,w:32,h:32
    }
    ,ft_32_Xlsx:{
        x:69,y:201,w:32,h:32
    }
    ,ft_32_Pptx:{
        x:103,y:201,w:32,h:32
    }
    ,ft_32_Docx:{
        x:151,y:185,w:32,h:32
    }
    ,ft_32_Video:{
        x:185,y:185,w:32,h:32
    }
    ,ft_32_Txt:{
        x:235,y:1,w:32,h:32
    }
    ,ft_32_Photo:{
        x:235,y:35,w:32,h:32
    }
    ,ft_32_Notebook:{
        x:235,y:69,w:32,h:32
    }
    ,groups:{
        x:235,y:103,w:32,h:32
    }
    ,lightPanelOpen:{
        x:219,y:137,w:20,h:25
    }
    ,darkPanelOpen:{
        x:241,y:137,w:20,h:25
    }
    ,panelClose:{
        x:219,y:164,w:20,h:25
    }
    ,ft_16_Xlsx:{
        x:241,y:164,w:16,h:16
    }
    ,error:{
        x:219,y:191,w:16,h:16
    }
    ,ft_16_Zip:{
        x:241,y:182,w:16,h:16
    }
    ,ft_16_Blank:{
        x:219,y:209,w:16,h:16
    }
    ,ft_16_Audio:{
        x:237,y:200,w:16,h:16
    }
    ,ft_16_NonEmptyFavoriteFolder:{
        x:1,y:235,w:16,h:16
    }
    ,ft_16_NonEmptyDocumentFolder:{
        x:19,y:235,w:16,h:16
    }
    ,ft_16_NonEmptyAlbum:{
        x:37,y:235,w:16,h:16
    }
    ,ft_16_Photo:{
        x:55,y:235,w:16,h:16
    }
    ,ft_16_Txt:{
        x:73,y:235,w:16,h:16
    }
    ,ft_16_Docx:{
        x:91,y:235,w:16,h:16
    }
    ,ft_16_Video:{
        x:109,y:235,w:16,h:16
    }
    ,ft_16_Pptx:{
        x:127,y:235,w:16,h:16
    }
    ,ft_16_Notebook:{
        x:145,y:219,w:16,h:16
    }
    ,ft_16_EmptyAlbum:{
        x:163,y:219,w:16,h:16
    }
    ,ft_16_EmptyDocumentFolder:{
        x:181,y:219,w:16,h:16
    }
    ,redX:{
        x:199,y:219,w:16,h:16
    }
    ,detailsView:{
        x:217,y:227,w:15,h:15
    }
    ,thumbView:{
        x:237,y:218,w:15,h:15
    }
    ,ppSearch:{
        x:145,y:237,w:13,h:13
    }
    ,ppRedX:{
        x:160,y:237,w:13,h:13
    }
    ,ppGreyX:{
        x:175,y:237,w:13,h:13
    }
    ,close:{
        x:201,y:137,w:10,h:10
    }
    ,openUp:{
        x:137,y:201,w:7,h:9
    }
    ,openHover:{
        x:259,y:164,w:7,h:9
    }
    ,closedUp:{
        x:190,y:237,w:7,h:9
    }
    ,closedHover:{
        x:259,y:175,w:7,h:9
    }
    
};
if(!window.Silverlight)window.Silverlight={};
Silverlight.isInstalled=function(b){
    if(b==undefined)b=null;
    var a=false,l=null;
    try{
        var i=null,j=false;
        if(window.ActiveXObject)try{
            i=new ActiveXObject("AgControl.AgControl");
            if(b===null)a=true;
            else if(i.IsVersionSupported(b))a=true;
            i=null
        }
        catch(m){
            j=true
        }
        else j=true;
        if(j){
            var k=navigator.plugins["Silverlight Plug-In"];
            if(k)if(b===null)a=true;
            else{
                var h=k.description;
                if(h==="1.0.30226.2")h="2.0.30226.2";
                var g=h.split(".");
                while(g.length>4)g.pop();
                var d=b.split(".");
                while(d.length>4)d.pop();
                var c,f,e=0;
                do{
                    c=parseInt(d[e]);
                    f=parseInt(g[e]);
                    e++
                }
                while(e<d.length&&c===f);
                if(c<=f&&!isNaN(c))a=true
            }
            
        }
        
    }
    catch(m){
        a=false
    }
    return a
};
Silverlight.supportedUserAgent=function(g,f){
    try{
        var b=null;
        if(f)b=f;
        else b=window.navigator.userAgent;
        var a={
            OS:"Unsupported",Browser:"Unsupported"
        };
        if(b.indexOf("Windows NT")>=0||b.indexOf("Mozilla/4.0 (compatible; MSIE 6.0)")>=0)a.OS="Windows";
        else if(b.indexOf("PPC Mac OS X")>=0)a.OS="MacPPC";
        else if(b.indexOf("Intel Mac OS X")>=0)a.OS="MacIntel";
        else if(b.indexOf("Linux")>=0)a.OS="Linux";
        if(a.OS!="Unsupported")if(b.indexOf("MSIE")>=0){
            if(navigator.userAgent.indexOf("Win64")==-1)if(parseInt(b.split("MSIE")[1])>=6)a.Browser="MSIE"
        }
        else if(b.indexOf("Firefox")>=0){
            var e=b.split("Firefox/")[1].split("."),h=parseInt(e[0]);
            if(h>=2)a.Browser="Firefox";
            else{
                var i=parseInt(e[1]);
                if(h==1&&i>=5)a.Browser="Firefox"
            }
            
        }
        else if(b.indexOf("Chrome")>=0)a.Browser="Chrome";
        else if(b.indexOf("Safari")>=0)a.Browser="Safari";
        var d=parseInt(g),c=!(a.OS=="Unsupported"||a.Browser=="Unsupported"||a.OS=="Windows"&&a.Browser=="Safari"||a.OS.indexOf("Mac")>=0&&a.Browser=="MSIE"||a.OS.indexOf("Mac")>=0&&a.Browser=="Chrome");
        if(a.OS.indexOf("Windows")>=0&&a.Browser=="Chrome"&&d<4)return false;
        if(a.OS=="MacPPC"&&d>1)return c&&a.OS!="MacPPC";
        if(a.OS=="Linux"&&d>2)return c&&a.OS!="Linux";
        if(g=="1.0")return c&&b.indexOf("Windows NT 5.0")<0;
        else return c
    }
    catch(j){
        return false
    }
    
};
(function(){
    window.getSilverlightVersion=function(){
        var b=f;
        b=Silverlight.isInstalled("1.0")?"1.0":b;
        b=Silverlight.isInstalled("2.0")?"2.0":b;
        b=Silverlight.isInstalled("3.0")?"3.0":b;
        b=Silverlight.isInstalled(a)?a:b;
        return b
    };
    function e(){
        function j(e,d,b,a,c){
            document.cookie=e+"="+escape(d)+(b?";path="+b:"")+(a?";domain="+a:"")+(c?";secure":"")
        }
        function i(e){
            var d=e+"=",c=document.cookie.split(";");
            for(var b=0;
            b<c.length;
            b++){
                var a=c[b];
                while(a.charAt(0)==" ")a=a.substring(1,a.length);
                if(a.indexOf(d)==0)return a.substring(d.length,a.length)
            }
            return null
        }
        function g(a){
            return a===undefined||a===null||a.length===0
        }
        var f=i(b),l=i(c),e=getSilverlightVersion(),h=Silverlight.supportedUserAgent(),d=location.hostname.split("."),k=d[d.length-2]+"."+d[d.length-1];
        j(b,e,"/",k);
        j(c,h,"/",k);
        if(!window.skipSLReload&&(g(f)&&e!=a)||g(l)&&!h||!g(f)&&f!=e)location.reload(true)
    }
    var b="SLVersion",c="SLSupportedAgent",f="0.0",a="4.0.50401";
    e();
    var d="4.0";
    if(window["wLive"]){
        wLive.Core.SilverlightSupported=Silverlight.supportedUserAgent(d);
        wLive.Core.SilverlightInstalled=Silverlight.isInstalled(d)&&wLive.Core.SilverlightSupported
    }
    
})();
(function(){
    var a=window.jQuery,k=window.wLive,d=window.sutra;
    if(!a||!k.Core)return;
    var l=window,m=a(l),q=a(document),e=l.wLive.Controls,b=l.wLive.Core,D="fetch",T="write",ib="photos",v="documents",V="shared",U="SetView",E="SelfView",G="PdfView",vb="mru",z="live.shared.skydrive.",s=".UI_Popover",P="live.shared.marketinfo.",r="click",H="contextmenu",bb="scroll",A="resize",J="keydown",lb="selectstart",db="blur",K="mouseup",pb="mousedown",mb="mouseenter",qb="mousemove",nb="mouseleave",ub="mouseout",ob=$B.IE?"MSPointerDown":"touchstart",rb=$B.IE?"MSPointerMove":"touchmove",wb=$B.IE?"MSPointerUp":"touchend",X=46,kb=8,Z=13,I=27,zb=113,tb="input",Y="span",xb="div",O="a",w="visibility",M="hidden",L="visible",sb="disabled",N="title",yb="href",Bb="src",Ab="alt",t=true,j=false,g="",eb="#",h=".",gb=window["File"]&&(window["File"].prototype.slice||window["File"].prototype.mozSlice||window["File"].prototype.webkitSlice),ab=$B.IE&&$B.V==10,fb=b["SilverlightInstalled"]&&!$B.Firefox&&!ab;
    b.SoftBlockEnum={};
    var W=b.SoftBlockEnum={
        MoveAction:0,RenameAction:1,DeleteAction:2
    };
    function n(a,b){
        if(a==b)return true;
        if(a==null||b==null)return false;
        return a.toLowerCase()==b.toLowerCase()
    }
    function f(a){
        return GetString(z+"shared."+a)
    }
    function c(a){
        return GetString(z+"pc."+a)
    }
    function y(a){
        return GetString(P+a)
    }
    function Q(a){
        return a&&a.folder&&a.folder.covers
    }
    function p(a,b,d){
        if(a&&b){
            var c=!d||a.commands===b.commands&&a.name===b.name;
            return a.key===b.key&&a.modifiedDate===b.modifiedDate&&c
        }
        else return false
    }
    function B(a){
        return a.is("textarea")||a.is("input")&&(a.attr("type")=="text"||a.attr("type")=="password")
    }
    function R(){
        return a(s).length>0&&a(s).is(":visible")
    }
    var o="ClickedSelected.Command.SkyDrive";
    function u(a,c,b){
        return function(){
            $BSI.reportEvent(c,b);
            return a&&a.apply(this,arguments)
        }
        
    }
    function S(a){
        a.stopPropagation()
    }
    function x(a){
        return FilesConfig.isDependentOnNewStorageInterface||!a.group&&$Config.hcid&&a.ownerCid.toLowerCase()==$Config.hcid.toLowerCase()
    }
    var cb="",hb;
    function C(){
        var a=a||document.createElement("audio");
        return a.canPlayType
    }
    function F(){
        $Do.when("Bucket3.js",0,function(){
            $UI.MsgBoxEx(GetString("Live.Shared.Skydrive.Music.PopoverHeader"),GetString("Live.Shared.Skydrive.Music.PopoverBody"),c("CloseCommand"),false,function(){},null,document.body,400,false);
            var b=a("#popover_btn_ok");
            d(b.closest(s),"$Sutra.SkyDrive.MusicErrorPopover");
            d(b,"$Sutra.SkyDrive.MusicErrorCloseButton")
        })
    }
    (function(){
        window.FilesIS32=window.FilesIS32||{};
        window.FilesIS8=window.FilesIS8||{};
        var a=[FilesIS32,FilesIS8],c=[FilesConfig.imageStripUrl_32,FilesConfig.imageStripUrl_8],d=k.Core.ImageStrip={};
        d.getImage=function(h,g,f){
            g=g||"";
            f=f||"";
            var i,e=b(h);
            if(e>-1){
                var j=a[e],k=c[e],d=j[h];
                i=$IS.Create(d.x,d.y,d.w,d.h,FilesConfig.imgBaseUrl,k,g,f)
            }
            return i
        };
        function b(d){
            var c=-1;
            for(var b=0;
            b<a.length;
            b++)if(a[b].hasOwnProperty(d)){
                c=b;
                break
            }
            return c
        }
        
    })();
    (function(){
        var e=new RegExp("^http(?:s)?://(?:[A-Za-z0-9]*[.])*livefilestore(?:-int)?[.]com/","i"),c=b.CookieToss={
            complete:true,eventName:"cookieToss",requiresCookieToss:function(a){
                return e.test(a)
            }
            
        };
        if(_ge("cookieToss")&&!l.cookieToss.e){
            c.complete=false;
            l.cookieToss.c=d
        }
        function d(){
            c.complete=true;
            a(c).trigger(c.eventName)
        }
        
    })();
    (function(){
        var n=3,i=5,h=20,e=100,j=0,g="root",m=2,a=0,c=1,d=2,f=3,k=4;
        b.PriorityQueue=o;
        function o(H,G,M){
            var o=this,v=H||i,F=G||{},C=M||n,t=0,p=0,q=[];
            for(var E=0;
            E<=C;
            E++)q.push(0);
            var w=0,N=0,b={},r=[],s=[],P={},B={},z=false,y=false;
            o.enqueue=function(k,j,d,f,e){
                var h=false;
                if(!z){
                    e=e||g;
                    f=f||String(N++);
                    d=d!==undefined?d:m;
                    var i=b[e]=b[e]||{},a=i[f];
                    if(!a||a.state==c&&(a.next||a.pri!=d)){
                        if(a){
                            D(a);
                            a.pri=d
                        }
                        else{
                            h=true;
                            a=i[f]=J(k,j,d,f,e)
                        }
                        O(a);
                        u()
                    }
                    
                }
                return h
            };
            o.abortAll=function(){
                z=true;
                for(queueId in b)o.abort(queueId);
                z=false
            };
            o.abort=function(c){
                c=c||g;
                var e=b[c];
                if(e){
                    for(taskId in e){
                        var a=e[taskId];
                        if(a.state==d){
                            A(a);
                            a.abort&&a.abort()
                        }
                        else if(a.state==f){
                            a.timeoutId&&clearTimeout(a.timeoutId);
                            x(a)
                        }
                        else D(a)
                    }
                    b[c]={}
                }
                
            };
            o.getActiveTaskCount=function(){
                return p
            };
            o.getActiveTasks=function(){
                return B
            };
            function J(c,b,d,f,e){
                var g={
                    id:f,queueId:e,exec:c,abort:b,pri:d,timeoutId:0,next:null,prev:null,state:a
                };
                return g
            }
            function D(b){
                if(b&&b.state==c){
                    b.prev&&(b.prev.next=b.next);
                    b.next&&(b.next.prev=b.prev);
                    var d=b.pri;
                    r[d]==b&&(r[d]=b.next);
                    s[d]==b&&(s[d]=b.prev);
                    b.state=a;
                    b.prev=b.next=null;
                    t--
                }
                return b
            }
            function O(b){
                if(b&&b.state==a){
                    var e=b.pri,d=s[e];
                    if(d){
                        d.next=b;
                        b.prev=d
                    }
                    else r[e]=b;
                    s[e]=b;
                    b.state=c;
                    t++
                }
                
            }
            function u(){
                if(!y&&!w&&t&&p<v)w=l.setTimeout(K,j)
            }
            function I(d,b){
                var a=true;
                if(b>0){
                    var c=Math.max(h,e-e*(b/C));
                    a=(new Date).getTime()-d<c
                }
                return a
            }
            function K(){
                var c=(new Date).getTime(),b=0;
                w=0;
                y=true;
                while(t>0&&b<=C&&p<v){
                    var a=r[b];
                    if(a&&q[a.pri]<(F[a.pri]||v))a=L(D(a));
                    else a=null;
                    if(!a)b++;
                    else if(!I(c,b))break
                }
                y=false;
                u()
            }
            function L(a){
                if(a){
                    p++;
                    B[a.id]=a;
                    a.startTime=(new Date).getTime();
                    q[a.pri]++;
                    a.state=d;
                    var b=a.exec(function(b){
                        A(a,b)
                    });
                    if(!b)A(a)
                }
                return a
            }
            function A(a,b){
                if(a.state===d){
                    p--;
                    delete B[a.id];
                    q[a.pri]--;
                    if(!b||typeof b!=="number")x(a);
                    else{
                        a.state=f;
                        a.timeoutId=l.setTimeout(function(){
                            x(a)
                        }
                        ,b)
                    }
                    
                }
                
            }
            function x(a){
                var c=b[a.queueId];
                a.state=k;
                delete c[a.id];
                u()
            }
            
        }
        
    })();
    (function(){
        var e=8,d=5,c=b.RequestPriorityEnum={
            FetchData:0,FetchImages:1,DefaultGet:2,DefaultPost:3,MoveOperation:4,CopyOperation:5,DeleteOperation:6,UploadOperation:7
        }
        ,a={};
        a[c.CopyOperation]=1;
        a[c.DeleteOperation]=1;
        a[c.MoveOperation]=1;
        a[c.UploadOperation]=3;
        l.requests=new b.PriorityQueue(d,a,e);
        l.domUpdates=new b.PriorityQueue
    })();
    (function(){
        var a={},b={};
        k.throttle=function(c,g,d,e){
            if(e&&a[c]){
                b[c]=d;
                return
            }
            else if(a[c])clearTimeout(a[c]);
            function f(){
                a[c]=setTimeout(function(){
                    d();
                    delete a[c];
                    if(e&&b[c]){
                        d=b[c];
                        delete b[c];
                        f()
                    }
                    
                }
                ,g)
            }
            f()
        }
        
    })();
    (function(){
        var i=3e4,c=8002,h=1,d=b.RequestPriorityEnum.DefaultPost,g=b.RequestPriorityEnum.DefaultGet,e=0,m=0;
        b.DataRequest=j;
        function j(u,r,p,x,w,t,C){
            var j=this,q,n,y=h;
            t=t||i;
            var z,o=A(r);
            u=u||"key"+m++;
            j.priority=C||(p?d:g);
            j.queueId=p?T:D;
            j.originId=null;
            j.jsonpParameterName=undefined;
            j.successReentranceDelay=0;
            j.failureReentranceDelay=0;
            if(p)p=p.replace(/\?/g,"\\u003F");
            j.start=function(){
                return l.requests.enqueue(function(g){
                    n=g;
                    z=(new Date).getTime();
                    var f=null,d=r,c;
                    if(!o){
                        f={
                            canary:FilesConfig.canary,Accept:"application/json",AppId:FilesConfig.appId
                        };
                        if(j.originId)f["X-SkyApiOriginId"]=j.originId
                    }
                    else{
                        d+=r.indexOf("?")===-1?"?":"&";
                        d+="canary="+FilesConfig.canary.encodeUrl();
                        c="dataRequestCallback_"+e++;
                        b.DataRequest[c]=function(a){
                            s(a);
                            delete b.DataRequest[c]
                        }
                        
                    }
                    q=a.ajax({
                        url:d,dataType:o?"jsonp":"json",jsonp:j.jsonpParameterName,jsonpCallback:c?"wLive.Core.DataRequest."+c:undefined,data:p,processData:false,type:p?"POST":"GET",headers:f,timeout:t,success:o?undefined:function(a){
                            s(a)
                        }
                        ,error:o?undefined:function(c,b,a){
                            s(B(c,b,a))
                        }
                        
                    });
                    return true
                }
                ,function(){
                    if(!o)j.abort()
                }
                ,j.priority,u,j.queueId)
            };
            j.abort=function(){
                if(q&&!o){
                    q.abort();
                    q=null
                }
                if(n){
                    n();
                    n=null
                }
                
            };
            function A(b){
                var a=false;
                if(b.indexOf("/")!=0)a=v(b)!=v(window.location.host);
                return a
            }
            function v(a){
                var b=a.indexOf("://");
                b!==-1&&(a=a.substr(b+3));
                b=a.indexOf("?");
                b!==-1&&(a=a.substr(0,b));
                b=a.indexOf("/");
                b!==-1&&(a=a.substr(0,b));
                return a.toLowerCase()
            }
            function B(b,d){
                var a={};
                if(b.status==500)try{
                    a=Object.fromJSON(b.responseText)||{}
                }
                catch(j){}if(!a.error&&!a.items){
                    var g=true,e=8e3,h=f("LoadGenericError");
                    a.pageStats={
                        url:r,error:d,tasks:[],executionTimeMs:0,schedulerTimeMs:0
                    };
                    switch(d){
                        case "timeout":e=8001;
                        h=f("LoadTimeoutError");
                        break;
                        case "abort":e=c;
                        g=false;
                        a.pageStats.info=d;
                        a.pageStats.error=null
                    }
                    a.error={
                        isRetriable:g,code:e,message:h,debugMessage:"(xhr status "+b.status+") xhr.responseText: "+b.responseText
                    }
                    
                }
                return a
            }
            function s(a){
                a=a||{};
                k.PageStats.add(a.pageStats,z);
                if(a.error&&a.error.isRetriable&&y>0){
                    n&&n();
                    y--;
                    j.start()
                }
                else if(a.error){
                    n&&n(j.failureReentranceDelay);
                    a.error.code!=c&&w&&w(a)
                }
                else{
                    n&&n(j.successReentranceDelay);
                    o&&j.originId&&(a.originId=j.originId);
                    x&&x(a)
                }
                
            }
            
        }
        
    })();
    (function(){
        b.ItemSet=g;
        var d=".ItemSet",e=0;
        function g(){
            this._filters=[f];
            this.clear()
        }
        var c=b.ItemSet.prototype;
        c.clear=function(){
            var b=this;
            b._itemSetNamespace=d+String(e++);
            b._filteredCount=0;
            b._filteredIndexToActualIndex={};
            b._keyToFilteredIndex={};
            b._childCount=0;
            b._materializedCount=0;
            b._indexToItem={};
            b._keyToIndex={};
            b._$this=a(b);
            b._requiresFilter=false
        };
        c.get=function(a,b){
            var c=this;
            c._updateFilteredSet(b);
            !b&&(a=c._filteredIndexToActualIndex[a]);
            return this._indexToItem[a]
        };
        c.getByKey=function(c,b){
            var a=this;
            a._updateFilteredSet(b);
            var d=b?a._keyToIndex[c]:a._filteredIndexToActualIndex[a._keyToFilteredIndex[c]];
            return this._indexToItem[d]
        };
        c.set=function(e,c){
            var b=this,f=false,d=b._indexToItem[e];
            if(d!=c){
                if(d)a(d).unbind(b._itemSetNamespace);
                f=true;
                b._indexToItem[e]=c;
                if(c){
                    c.key&&(b._keyToIndex[c.key]=e);
                    b._childCount=Math.max(b._childCount,e+1);
                    a(c).bind("change"+b._itemSetNamespace,function(){
                        b.invalidate()
                    }).bind("removeItem"+b._itemSetNamespace,function(){
                        b.remove(this)
                    })
                }
                if(!d&&c)b._materializedCount++;
                else if(d&&!c)b._materializedCount--;
                b._requiresFilter=true
            }
            return f
        };
        c.insert=function(b,f,d){
            var a=this;
            a._updateFilteredSet(d);
            !d&&(b=b<a._filteredCount?a._filteredIndexToActualIndex[b]:a._childCount);
            b=Math.max(0,Math.min(b,a._childCount));
            var c=a._indexToItem[b];
            a._indexToItem[b]=null;
            a.set(b,f);
            while(c){
                var e=a._indexToItem[++b];
                a._indexToItem[b]=c;
                c=e;
                b==a._childCount&&a._childCount++
            }
            a._requiresFilter=true
        };
        c.add=function(b){
            var a=this;
            a.set(a._childCount,b)
        };
        c.indexOf=function(d,c){
            var b=this,a;
            b._updateFilteredSet(c);
            a=c?b._keyToIndex[d.key]:b._keyToFilteredIndex[d.key];
            if(a===undefined)a=-1;
            return a
        };
        c.removeAt=function(b,d){
            var a=this;
            a._updateFilteredSet(d);
            !d&&(b=a._filteredIndexToActualIndex[b]);
            var c=a._indexToItem[b];
            c&&delete a._keyToIndex[c.key];
            var e=a._childCount-1;
            while(b<e){
                c=a._indexToItem[b+1];
                if(c){
                    a._keyToIndex[c.key]=b;
                    a._indexToItem[b]=c
                }
                b++
            }
            delete a._indexToItem[a._childCount-1];
            a._childCount--;
            a._requiresFilter=true
        };
        c.remove=function(c){
            var b=this,a=b.indexOf(c,true);
            if(a!=-1)b.removeAt(a,true)
        };
        c.invalidate=function(){
            var a=this;
            a._requiresFilter=true;
            a._$this.trigger("change")
        };
        c.getCount=function(b){
            var a=this;
            a._updateFilteredSet(b);
            return b?a._childCount:a._filteredCount
        };
        c.setCount=function(b){
            var a=this;
            if(a._childCount!=b){
                a.clear();
                a._childCount=a._filteredCount=b;
                a._requiresFilter=true
            }
            
        };
        c.setFilters=function(b){
            var a=this;
            a._filters=b||[];
            a._requiresFilter=true
        };
        c._updateFilteredSet=function(g){
            var a=this;
            if(a._requiresFilter&&!g){
                a._filteredIndexToActualIndex={};
                a._keyToFilteredIndex={};
                var b=0,h=a._childCount,c=0,f=a._filters;
                for(a._filteredCount=0;
                b<h;
                b++){
                    var d=a._indexToItem[b],e=true;
                    for(c=0;
                    e&&c<f.length;
                    c++)e=f[c](d);
                    if(e){
                        a._filteredIndexToActualIndex[a._filteredCount]=b;
                        d&&d.key&&(a._keyToFilteredIndex[d.key]=a._filteredCount);
                        a._filteredCount++
                    }
                    
                }
                a._requiresFilter=false
            }
            
        };
        function f(a){
            return !a||a.isVisible===undefined||a.isVisible
        }
        
    })();
    (function(){
        b.SkyDriveItemSet=f;
        var d=[];
        function f(g,c,h){
            var a=this;
            b.ItemSet.apply(this);
            a.modifiedDate=-1;
            a._dataModel=g;
            a._parentItemKey=c;
            a._parentItemKeyParts=b.SkyDriveItem.getItemKeyParts(c);
            a._setKey=h;
            a._headerItemsSet=null;
            a._filters.push(f);
            a._filters.push(e);
            a._type="SkyDriveItemSet";
            function f(b){
                var c=a._headerItemsSet&&b&&a._headerItemsSet.indexOf(b)!==-1;
                if(c)d.push({
                    "set":a,headerSet:a._headerItemsSet,item:b
                });
                return !c
            }
            function e(b){
                var c=b&&b._hiddenParentId&&a._parentItemKeyParts.id.toLowerCase()==b._hiddenParentId.toLowerCase();
                return !c
            }
            
        }
        var c=f.prototype=new b.ItemSet,e=b.ItemSet.prototype;
        c.setHeaderItemsSet=function(b){
            var c=this;
            c._headerItemsSet=b;
            a(b).bind("change",function(){
                c.invalidate()
            })
        };
        c.isOutOfDate=function(){
            var b=this,c=b._dataModel,a=c?c.getItem(b._parentItemKey,true):null,d=a&&(a.hasExpired()||a.modifiedDate!=b.modifiedDate);
            return d
        };
        c.get=function(b,n,i){
            var a=this,c=null,g=false,f=false,m=a._dataModel,h=a._parentItemKey,j=a._setKey,d=a._headerItemsSet,l=a._childCount,o=a._filteredIndexToActualIndex,k=a.isOutOfDate();
            if(d&&d.getCount()>0)if(d.getCount()>b){
                c=d.get(b);
                g=true
            }
            else b-=d.getCount();
            if(!g){
                c=e.get.call(a,b,i);
                f=!c&&b>=0&&b<l
            }
            if(!n&&(f||k))m.fetchItem(h,j,null,b);
            c&&(c.parentKey=h);
            return c
        };
        c.getCount=function(d){
            var c=this,a=c._headerItemsSet,b=e.getCount.call(c,d);
            if(a)b+=a.getCount();
            return b
        };
        c.indexOf=function(f,d,g){
            var a=this,c=a._headerItemsSet,j=a._dataModel,k=a._parentItemKey,h=a._setKey,i=a.isOutOfDate(),b=e.indexOf.call(a,f,d);
            if(!g&&(b===-1||i))j.fetchItem(k,h,f.id,0);
            if(c)if(b!==-1)b+=c.getCount(d);
            else b=c.indexOf(f,d,g);
            return b
        };
        c.remove=function(c){
            var b=this,a=b.indexOf(c,true,true);
            if(a!=-1)b.removeAt(a,true)
        };
        c.clone=function(){
            var a=this,c=new b.SkyDriveItemSet(a._dataModel,a._parentItemKey,a._setKey);
            for(var d=0;
            d<a.getCount();
            d++){
                var e=a.get(d,t);
                if(e)c.set(d,e)
            }
            c.modifiedDate=a.modifiedDate;
            c.setHeaderItemsSet(a._headerItemsSet);
            return c
        };
        c.isComplete=function(){
            var a=this;
            return a._materializedCount===a._childCount
        };
        c.sort=function(){
            var d=this,c=b.SkyDriveItem.getSetKeyParts(d._setKey),f=[];
            for(var a=0;
            a<d.getCount();
            a++){
                var g=d.get(a,true);
                f.push(g)
            }
            var e=f.sort(function(d,e){
                var g=c.sr?a(d,c.sb):a(e,c.sb),f=c.sr?a(e,c.sb):a(d,c.sb);
                return d.folder&&!e.folder?-1:!d.folder&&e.folder?1:g-f;
                function a(c,d){
                    var a=b.JSONConstants.SortField;
                    switch(d){
                        case a.ModifiedDate:return c.modifiedDate||0;
                        case a.CreatedDate:return c.creationDate||0;
                        case a.Size:return c.size||0
                    }
                    
                }
                
            });
            for(a=0;
            a<e.length;
            a++)d.set(a,e[a])
        };
        b.SkyDriveItemSet.removeMarkedHeaderItems=function(){
            while(d.length>0){
                var a=d.pop(),e=a.set,b=a.headerSet,c=a.item;
                b.remove(c);
                e._requiresFilter=true
            }
            
        }
        
    })();
    (function(){
        var u="root",j="default",p="NonEmptyDocumentFolder",s=c("SkyDriveProductName"),v=0,t=0,o="rd,1",m=2*60*1e3,i={},h={},e=null;
        b.SkyDriveItem=k;
        function k(f,e,d){
            e==d&&(d=null);
            var c=this;
            c._$this=a(this);
            c.key=e;
            c.instance=v++;
            c.keyParts=b.SkyDriveItem.getItemKeyParts(e);
            c.parentKey=d;
            c.id=c.keyParts["id"];
            c.did=c.keyParts["did"];
            c.commands=null;
            c.modifiedDate=-1;
            c.name=null;
            c.extension=null;
            c.ownerName=null;
            c.ownerCid=null;
            c.iconType=null;
            c.isUnknownFileType=false;
            c.folder=null;
            c.sharingLevel=null;
            c.group=null;
            c._isLoadingItem=false;
            c._missingName=false;
            c._expirationDate=0;
            c._dataModel=f;
            c._isNewFolder=false;
            c._childSets=null;
            c._headerItemsSet=null;
            c._hiddenParentId=null;
            c._version=0
        }
        var d=b.SkyDriveItem.prototype;
        d.processItem=function(c){
            var a=this,e=false;
            this._isNewFolder=false;
            if(c.modifiedDate===undefined||c.modifiedDate>=a.modifiedDate){
                q(c);
                var f=this.folder?this.folder.totalCount:-1,h=c.folder?c.folder.totalCount:-1;
                if(c.modifiedDate!=a.modifiedDate||h!=f||c.sharingLevel!=a.sharingLevel){
                    a._version++;
                    e=true
                }
                var d=null;
                if(c.folder){
                    d=c.folder.children;
                    delete c.folder.children
                }
                l(a,c,1);
                d&&(c.folder.children=d);
                if(c.folder){
                    !a._childSets&&(a._childSets={});
                    !a._headerItemsSet&&(a._headerItemsSet=new b.ItemSet)
                }
                !c.name&&(a._missingName=true);
                var i=a.isViewerOwner();
                !a.ownerName&&(a.ownerName=i?FilesConfig.userDisplayName:g);
                !a.ownerCid&&(a.ownerCid=a.keyParts["cid"]);
                !a.iconType&&(a.iconType=c.folder?p:j);
                a.isUnknownFileType=n(a.iconType,j)
            }
            a._commands=null;
            if(!!a.did)a.commands=o+(a.commands?","+a.commands:"");
            a._expirationDate=(new Date).getTime()+m;
            return e
        };
        d.updateItemProperty=function(d,e,c,b){
            var a=this;
            if(this._isNewFolder&&d=="name"){
                a.name=(e||g).trim();
                a.invalidate();
                a._dataModel.createSubfolder(a.getParent(),a,c,b)
            }
            else this._dataModel.updateItemProperty(a,d,e,c,b)
        };
        d.hasExpired=function(){
            return this._expirationDate<(new Date).getTime()
        };
        d.getVersion=function(){
            return this._version
        };
        d.getDisplayName=function(c){
            var a=this,b=a.name;
            if(c&&!a.parentKey)if(a.did){
                var e=c.deviceItemSet.getByKey(a.did.toLowerCase());
                b=e?e.name:g
            }
            else b=a.ownerName?f("UsersSkyDrive").format(a.ownerName):s;
            else{
                var d=a.extension;
                if(a.isUnknownFileType&&d)b+=d
            }
            return b
        };
        d.isViewerOwner=function(){
            var a=this;
            return !a.ownerCid||a.ownerCid.toLowerCase()==FilesConfig.hcid.toLowerCase()
        };
        d.isLoading=function(){
            return this._isLoadingItem
        };
        d.isQt=function(a){
            return n(this.keyParts["qt"],a)
        };
        d.getParent=function(b){
            var a=this;
            return a._dataModel.getItem(a.parentKey,b)
        };
        d.getChildren=function(c){
            var g=this,d=this._childSets,a=null;
            if(d){
                c=c||e;
                a=d[c];
                if(!a){
                    for(var i in d)if(b.SkyDriveItem.getSetKeyParts(c).ft===b.SkyDriveItem.getSetKeyParts(i).ft){
                        var f=d[i];
                        if(b.ClientSortableFields[b.SkyDriveItem.getSetKeyParts(c).sb]||f._childCount===1)if(f.isComplete()){
                            a=d[c]=f.clone();
                            a._setKey=c;
                            if(f._childCount>1)a.sort();
                            break
                        }
                        
                    }
                    if(!a){
                        a=d[c]=new b.SkyDriveItemSet(g._dataModel,g.key,c);
                        var h=b.SkyDriveItem.getSetKeyParts(c);
                        if(!h||!h.ft||h.ft!==b.JSONConstants.FilterType.PhotosAndVideos)a.setHeaderItemsSet(g._headerItemsSet)
                    }
                    
                }
                if(a.modifiedDate===-1)a.setCount(r(g.folder,c))
            }
            return a
        };
        d.remove=function(){
            this._$this.trigger("removeItem")
        };
        d.hideFromParentId=function(b){
            var a=this;
            a._hiddenParentId=b;
            a._$this.trigger("change")
        };
        d.setVisibility=function(b){
            var a=this;
            a.isVisible=b;
            a._$this.trigger("change")
        };
        d.getVisibility=function(){
            var a=this;
            return a.isVisible===undefined||a.isVisible
        };
        d.invalidate=function(d){
            var b=this;
            if(!d)b._version++;
            var c=b;
            a(b).trigger("change");
            while(c){
                b._dataModel._fireDataChanged(c);
                c=c.getParent(true)
            }
            
        };
        d.expire=function(c){
            var a=this;
            a._expirationDate=-1;
            if(c){
                var b=a.getParent(true);
                b&&b.expire(true)
            }
            a._dataModel.abortPendingRequests(a.key)
        };
        d.getHasSubfolders=function(){
            var a=this.folder&&this.folder.hasSubfolders;
            return a||this._headerItemsSet&&this._headerItemsSet.getCount()>0
        };
        d.createPinnedSubfolder=function(){
            var a=this,c=null;
            if(a._headerItemsSet){
                var d="NewFolder"+t++;
                c=new k(this._dataModel,b.SkyDriveItem.getItemKey(d),this.key);
                c.processItem({
                    folder:{
                        totalCount:0,childCount:0
                    }
                    ,name:FilesConfig.defaultFolderString,commands:"rn,1",group:a.group,cid:a.ownerCid,ownerName:a.ownerName,sharingLevel:a.sharingLevel,_isNewFolder:true
                });
                a._headerItemsSet.insert(0,c);
                a._headerItemsSet.invalidate()
            }
            return c
        };
        d.removePinnedSubfolder=function(b){
            var c=this,a=c._headerItemsSet;
            if(a){
                a.remove(b);
                a.invalidate()
            }
            
        };
        d.updatePinnedSubfolderKey=function(a){
            var c=this;
            if(c._headerItemsSet){
                var d=c._headerItemsSet.indexOf(a);
                c._headerItemsSet.remove(a);
                a.key=b.SkyDriveItem.getItemKey(a.id,a.ownerCid,a.group,null,null);
                a.keyParts=b.SkyDriveItem.getItemKeyParts(a.key);
                a.clearItemSets();
                c._headerItemsSet.insert(d,a);
                c._headerItemsSet.invalidate()
            }
            
        };
        d.clearItemSets=function(){
            var a=this;
            a._childSets!==null&&(a._childSets={})
        };
        function l(d,e,f){
            for(var c in e){
                var b=e[c];
                if(b&&typeof b=="object"&&!a.isArray(b)&&f>0){
                    var g=d[c]=d[c]||{};
                    l(g,b,f-1)
                }
                else d[c]=b
            }
            
        }
        function q(b){
            var a=b.folder;
            if(a){
                a.covers=a.covers||null;
                a.hasSubfolders=a.hasSubfolders?true:false
            }
            b.isProcessingVideo=b.isProcessingVideo||false
        }
        function r(a,h){
            var e=b.JSONConstants.FilterType,c=a.totalCount,f=b.SkyDriveItem.getSetKeyParts(h),d=f?f["ft"]:g;
            if(d==e.AllFolders)c=a.folderCount!==undefined?a.folderCount:a.hasSubfolders?1:0;
            else if(d==e.PhotosAndVideos&&a.photoCount!==undefined)c=a.photoCount;
            return c!==undefined?c:1
        }
        b.SkyDriveItem.getItemKey=function(h,e,f,d,c){
            var a={
                id:h||u,cid:(e||""+FilesConfig.hcid).toLowerCase(),group:f?"1":"0",qt:(d||g).toLowerCase(),did:c||g
            };
            if(!c)a.id=a.id.toLowerCase();
            var b="id="+a.id.encodeUrl()+"&cid="+a.cid.encodeUrl()+"&group="+a.group.encodeUrl()+"&qt="+a.qt.encodeUrl();
            if(c)b+="&did="+a.did.encodeUrl();
            i[b]=a;
            return b
        };
        b.SkyDriveItem.getItemKeyParts=function(d){
            var c=i[d];
            if(!c){
                var a=$Utility.deserialize(d,"&",false,false);
                b.SkyDriveItem.getItemKey(a.id,a.cid,parseInt(a.group),a.qt,a.did);
                c=i[d]
            }
            return c
        };
        b.SkyDriveItem.getSetKey=function(k,c,j){
            var b=h[e]||{},i=k||b.sb||"0",a=c!=null?c:b.sr,l=a?"1":"0",f=j||g,d="ft="+f.encodeUrl()+"&sb="+i.encodeUrl()+"&sr="+l;
            h[d]={
                ft:f,sb:i,sr:a
            };
            return d
        };
        b.SkyDriveItem.getSetKeyParts=function(a){
            a=a||e;
            return h[a]
        };
        b.SkyDriveItem.setDefaultSetKey=function(a){
            e=a
        };
        b.SkyDriveItem.getDefaultSetKey=function(){
            return e
        };
        b.JSONConstants={
            SortField:{
                ViewedDate:"0",Name:"1",ModifiedDate:"2",CreatedDate:"3",Size:"4",Type:"5",Owner:"7"
            }
            ,FilterType:{
                Albums:"1",Folder:"2",Favorites:"4",AllFolders:"7",PhotosAndVideos:"8",Documents:"16"
            }
            
        };
        b.ClientSortableFields={
            2:true,3:true,4:true
        };
        e=b.SkyDriveItem.getSetKey()
    })();
    (function(){
        b.DeviceItemSet=e;
        var g="DeleteRemove.Device";
        function e(){
            var a=this;
            b.ItemSet.apply(this);
            $Do.when("getDevicesResponse",0,function(){
                a.parseResponse(window.getDevicesResponse)
            })
        }
        var f=e.prototype=new b.ItemSet,h=b.ItemSet.prototype;
        f.parseResponse=function(d){
            var h=this;
            if(d&&d.devices){
                var e=d.devices;
                this.setCount(e.length);
                for(var c=0;
                c<e.length;
                c++){
                    var f=e[c];
                    f.key=f.did.toLowerCase();
                    var g=new b.DeviceItem(f);
                    a(g).bind("change",function(){
                        h.invalidate()
                    });
                    h.set(c,g)
                }
                this.invalidate()
            }
            
        };
        f.remove=function(e){
            var l=this,i=FilesConfig.baseApiUrl+"RemoveDevice";
            $BSI.reportEvent(g,{});
            var f=b.PageController.getInstance().getViewContext();
            e.setVisibility(false);
            $BSI.navigateTo("#cid="+FilesConfig.hcid.encodeUrl());
            var j={
                did:e.did
            }
            ,k=new b.DataRequest(i,i,Object.toJSON(j),function(){
                h.remove.call(l,e);
                var b=a("<span>"+c("RemoveDevice.SuccessNotification").format(e.name).encodeHtml()+"</span>");
                d(b,"$Sutra.SkyDrive.RemoveDeviceSuccess");
                f.errorManager.add({
                    $element:b,priority:1,type:2
                })
            }
            ,function(){
                e.setVisibility(true);
                var b=a("<span>"+c("RemoveDevice.ErrorNotification").format(e.name).encodeHtml()+"</span>");
                d(b,"$Sutra.SkyDrive.RemoveDeviceError");
                f.errorManager.add({
                    $element:b,priority:0,type:0
                })
            });
            k.start()
        }
        
    })();
    (function(){
        b.DeviceItem=d;
        function d(a){
            this.processItem(a)
        }
        var c=b.DeviceItem.prototype;
        c.processItem=function(c){
            var b=this;
            b.isVisible=true;
            a.extend(b,c);
            b.id="root";
            b.folder={};
            b.commands="defc,1"
        };
        c.setVisibility=function(b){
            this.isVisible=b;
            a(this).trigger("change")
        }
        
    })();
    (function(){
        var p="root",k="id",j="cid",q="sb",o="sr",e="lct=1",h="rset",f=$B.Mobile?"web_mobile":"web",c=b.SkyDriveItem,m=3e4,i=2e3,l=3e4;
        b.DataModel=d;
        b.DataModel.dataChangedEvent="dataChanged";
        b.DataModel.groupInfoChangedEvent="groupInfoChanged";
        b.DataModel.errorEvent="error";
        function d(I,K,M,G,L,H){
            var l=this,s=a(l),p=I||null,F=G||g,N=K||g,J=L||g,z=H||100,O=M||g,t=[],E=1,y=[],o={},m=null;
            l.hasPendingRequests=function(a){
                return !!o[a]
            };
            l.abortPendingRequests=function(b){
                var a=o[b];
                if(a){
                    for(var c in a)if(c!=="count"){
                        var d=a[c];
                        d.abort()
                    }
                    delete o[b]
                }
                
            };
            l.getItem=function(b,d){
                var a=null;
                if(b){
                    a=t[b]||null;
                    if(!d&&(v(a)||!w(a)&&!a.id==="root"))l.fetchItem(b,c.getDefaultSetKey(),null,0)
                }
                return a
            };
            l.getChildCount=function(a){
                var b=0;
                if(a&&a.folder){
                    var c=a.getChildren();
                    b=c?c.getCount():1
                }
                return b
            };
            l.getChildByIndex=function(b,e,d){
                var a=b.getChildren(),c=(a?a.get(e,d):null)||null;
                return c
            };
            l.getIndexOfChild=function(e,f,b){
                var d=-1,a=l.getItem(e,b),c=a?a.getChildren():null;
                if(c)d=c.indexOf(f,false,b);
                return d
            };
            l.processResponse=function(a,i,d){
                var b=false;
                d=d||c.getDefaultSetKey();
                if(a&&a.items&&!a.error){
                    var h=a.items;
                    A(a);
                    for(var e=0;
                    e<h.length;
                    e++)b=r(h[e],i,d,null,b)||b;
                    var g=FilesConfig.lastVersion||a.lastVersion,f=g?g.split(","):[];
                    FilesConfig.lastVersion=f[0]||"0";
                    FilesConfig.freRenderIndex===undefined&&(FilesConfig.freRenderIndex=Number(f[1]||"0"))
                }
                return b
            };
            l._fireDataChanged=function(a){
                if(!m)s.trigger(d.dataChangedEvent,a);
                else m.push(a)
            };
            l.suspendChangeEvents=function(){
                if(!m)m=[]
            };
            l.resumeChangeEvents=function(){
                if(m){
                    var a=m;
                    m=null;
                    while(a.length)l._fireDataChanged(a.pop())
                }
                
            };
            l.createSubfolder=function(a,c,f,d){
                var h=p+"AddFolder?"+e,g={
                    parentId:a.id,cid:a.ownerCid,group:a.group,name:c.name
                };
                if(b.SkyDriveItemHelper.isRootItem(a)&&b.PageController.getInstance().getViewContext().viewParams.sc=="photos")g.category=1;
                var i=new b.DataRequest(h,h,Object.toJSON(g),function(b){
                    var d=b?b.item:null;
                    c.processItem(d);
                    a.updatePinnedSubfolderKey(c);
                    t[c.key]=c;
                    a.expire();
                    a.invalidate();
                    f&&f(b,c)
                }
                ,function(a){
                    d&&d(a,c)
                });
                i.start()
            };
            l.updateItem=function(f,i,j,d,a){
                var g=p+i+"?"+e,h=new b.DataRequest(g+Math.random(),g,j,function(b){
                    var a=b&&b.item;
                    if(a){
                        var e=c.getItemKey(a.id,a.ownerCid,a.group);
                        if(r(a,e))l.getItem(e).invalidate()
                    }
                    d&&d(b,f)
                }
                ,function(c){
                    if(a){
                        var b=l.getItem(f.key,true);
                        a(c,b)
                    }
                    
                });
                h.start()
            };
            l.updateItemProperty=function(a,b,e,k,j,n){
                var o={},i="";
                if(n)i=', "overrideLock":"true"';
                var m=a[b],d=a[b]=e,g=a.extension;
                if(b==="name"&&g)d+=g;
                a.invalidate();
                var c=a.parentId;
                l.updateItem(a,"UpdateItem",'{"id":"'+a.id+'","'+b+'":"'+d.encodeJson()+(c&&c!=="root"?'","lid":"'+c.encodeJson():"")+'","'+h+'":"'+f+'"'+i+"}",k,function(c,a){
                    j(c,a);
                    if(a[b]===e){
                        a[b]=m;
                        a.invalidate()
                    }
                    
                })
            };
            l.getLoadingItem=function(a){
                var c=new b.SkyDriveItem(l,a,null);
                c.processItem({
                    folder:{
                        totalCount:1,childCount:1
                    }
                    ,id:q(a,k),ownerName:"",ownerCid:q(a,j).toUpperCase(),_isLoadingItem:true
                });
                return c
            };
            l.getGroupInformation=function(e,f,d){
                var b="cid="+e.toLowerCase().encodeUrl(),a=d.viewParams;
                if(a.authkey)b+="&authkey="+(a.authkey||g).encodeUrl();
                if(a.ticket)b+="&ticket="+(a.ticket||g).encodeUrl();
                var c=y[b];
                if(!c)B(b,f,E);
                return c
            };
            l.fetchItem=function(a,f,j,c,k){
                var m=C(a,f,j,c-c%z),n=l.getItem(a,true),d=Math.random(),p=l.getItem(a,true);
                if(p&&p.hasExpired())k=true;
                var q=m+"&v="+(n&&!k?n.modifiedDate:d)+(FilesConfig.authKey?"&authkey="+FilesConfig.authKey.encodeUrl():g),e=new b.DataRequest(m,q,null,function r(b){
                    u(b,a,f,j,c,d)
                }
                ,function s(b){
                    u(b,a,f,j,c,d)
                });
                e.originId=d;
                e.failureReentranceDelay=i;
                if(e.start()){
                    var h=o[a]=o[a]||{};
                    h[f]=e;
                    h["count"]=(h["count"]||0)+1
                }
                
            };
            function u(b,a,f,n,m,g){
                var e=o[a];
                if(e){
                    delete e[f];
                    e["count"]--;
                    if(!e["count"])delete o[a]
                }
                if(b&&b.items&&!b.error){
                    var j=g&&g!=b.originId,i=j&&v(l.getItem(a,true)),k=l.processResponse(b,a,f),h=l.getItem(a,true);
                    if(h)if(k)h.invalidate(true);
                    if(i)l.fetchItem(a,f,n,m,true)
                }
                else{
                    var c=b?b.error:{
                        debugMessage:"Server returned no success or failure"
                    };
                    $WebWatson.submit("JSON error",a,0,c.debugMessage,c.code,c.stackTrace,0,true);
                    c.key=a;
                    s.trigger(d.errorEvent,c)
                }
                
            }
            function D(b,a){
                keyComponents=c.getItemKeyParts(b);
                return n(keyComponents.id,a)||!a&&!keyComponents.id
            }
            function q(d,b){
                var a=c.getItemKeyParts(d);
                return a[b]
            }
            function r(a,h,p,j,d){
                var g,o=c.getItemKeyParts(h);
                if(h&&D(h,a.id))g=h;
                else g=c.getItemKey(a.id,a.ownerCid,a.group,null,o["did"]);
                var e=l.getItem(g,true),f=a.folder;
                if(!j&&a.parentId)j=c.getItemKey(a.parentId,a.ownerCid,a.group,null,o["did"]);
                if(!e){
                    d=true;
                    e=t[g]=new b.SkyDriveItem(l,g,j)
                }
                else e.parentKey=j;
                d=e.processItem(a)||d;
                if(f){
                    var k=e.getChildren(p);
                    if(k.modifiedDate!=e.modifiedDate&&f.childCount!=undefined){
                        k.modifiedDate=e.modifiedDate;
                        k.setCount(f.childCount);
                        d=true
                    }
                    f.photoCount!==undefined&&(e.folder.photoCount=f.photoCount);
                    var u=q(h,"qt");
                    if(f.children)for(var m=0,s=f.startIndex||0;
                    m<f.children.length;
                    m++,s++){
                        var i=f.children[m],n=c.getItemKey(i.id,i.ownerCid,i.group,u,e.did);
                        d=r(i,n,p,g,d)||d;
                        d=k.set(s,l.getItem(n,true))||d
                    }
                    
                }
                return d
            }
            function A(e){
                var i=e.items,c=e.tokenNeedsRedeeming,d=e.tokenType;
                for(var f=0;
                f<i.length;
                f++){
                    var b=i[f];
                    if(b.id!="root"&&c&&d!=null){
                        b.tokenNeedsRedeeming=c;
                        b.tokenType=d;
                        var a=b.folder;
                        if(a&&a.children)for(var g=0,j=a.startIndex||0;
                        g<a.children.length;
                        g++){
                            var h=a.children[g];
                            h.tokenNeedsRedeeming=c;
                            h.tokenType=d
                        }
                        
                    }
                    
                }
                
            }
            function C(a,m,d,j){
                var i=l.getItem(a,true),c=x(i),b="&d=1&lid="+(c?c.id:g)+"&caller="+F+"&path="+(w(i)?"0":"1")+(d?"&sid="+d:"&si="+j)+"&ps="+z+"&pi=5"+"&m="+J+"&"+h+"="+f+"&"+e;
                if($B.Mobile)b+="&isMobile=1";
                var k=a.indexOf("&did=")===-1?p:FilesConfig.devicesBaseUrl;
                return k+"GetItems?"+a+"&"+m+b
            }
            function x(b){
                var a=b?b.getParent(true):null;
                while(a&&a.parentKey){
                    b=a;
                    a=a.getParent(true)
                }
                return a?b:null
            }
            function v(a){
                return !a||a.hasExpired()
            }
            function w(a){
                var b=x(a);
                return !!(a&&!a.parentKey||b&&l.getItem(b.parentKey,true))
            }
            function B(a){
                var c=p+"GetGroupInfo?"+a+"&retrieveMembership=true",e=new b.DataRequest(c,c,null,function(c){
                    var e=new b.GroupInfo(c.groupInfo,a);
                    y[a]=e;
                    s.trigger(d.groupInfoChangedEvent)
                });
                e.start()
            }
            
        }
        
    })();
    (function(){
        var a="",c=null;
        function f(){
            if(!c)c=b.PageController.getInstance().getViewContext();
            return c
        }
        function d(b){
            return b?b.encodeURIComponent():a
        }
        function e(a,d,e,b){
            var c=a?a.ownerCid:null;
            return b?b:c||d.callerCid
        }
        b.ItemActionHelper={
            itemStringFormat:function(i,c,h,g){
                var b=f();
                return i.itemFormat({
                    item:c,$Config:window.$Config,FilesConfig:window.FilesConfig,ViewContext:b
                }
                ,{
                    encodeUrl:function(b){
                        return b?b.encodeUrl():a
                    }
                    ,encodeURIComponent:d,cid:e,cidQueryString:function(b,g,c,i,h){
                        var f=h||b&&b.group;
                        return "cid="+d(e(b,g,c,i))+(f?"&group=1":a)
                    }
                    ,profileDomain:function(c,e,b,f,a){
                        var d=a===true||a===false?a:c&&c.group;
                        return d?b.groupsDomain:b.profileDomain
                    }
                    ,deviceIdQueryString:function(b){
                        return !!b.did?"&did="+b.did.encodeURIComponent():a
                    }
                    ,resIdQueryString:function(b){
                        return b.id=="root"?a:"&resid="+b.id.encodeURIComponent()
                    }
                    ,idQueryString:function(b){
                        return b.id=="root"?a:"&id="+b.id.encodeURIComponent()
                    }
                    ,parentId:function(b){
                        return (b.parentId||a).encodeURIComponent()
                    }
                    ,isFolder:function(a){
                        return a.folder?1:0
                    }
                    ,scenario:function(c,b){
                        return b.viewParams.sc?"&sc="+b.viewParams.sc:a
                    }
                    ,queryType:function(c,b){
                        return b.viewParams.qt?"&qt="+b.viewParams.qt:a
                    }
                    
                }
                ,[c,b,window.FilesConfig,h,g])
            }
            
        }
        
    })();
    (function(){
        var u="",l=":",v=1e3,n=6e4,i=3.6e6,t="live.shared.skydrive.pc.",r="live.shared.skydrive.mobile.",p="&videoplayer=skysl",A="root",C="Folder",e="Doc",j="One",a="Ppt",d="Xls",f="Lib",o="Drive",z="CDDrive",y="USBDrive",w="ExtDrive",x="NetDrive",B="BrDrive",q={
            WinDocuments:f,WinLibrary:f,WinMusic:f,WinPictures:f,WinPodcastLibrary:f,WinVideos:f,WinDrive:o,CDDrive:z,GenericDrive:o,UsbDrive:y,ExternalDrive:w,NetworkStorage:x,Doc:e,Docm:e,Docx:e,Dot:e,Dotm:e,Dotx:e,Exe:"Exe",Html:"Html",Mdb:"Mdb",Mpp:"Mpp",One:j,Onepkg:j,Onetoc2:j,Notebook:"OneNotebook",Pot:a,Potm:a,Potx:a,Ppa:a,Ppam:a,Pps:a,Ppsm:a,Ppsx:a,Ppt:a,Pptm:a,Pptx:a,Pub:"Pub",Rtf:"Rtf",Txt:"Txt",Vsd:"Vsd",Xaml:"Xaml",Xla:d,Xlam:d,Xls:d,Xlsb:d,Xlsm:d,Xlsx:d,Xlt:d,Xltm:d,Xltx:d,Xml:"Xml",Xps:"Xps",Xsn:"Xsn",Zip:"Zip"
        };
        b.SkyDriveItemHelper={
            duration:function(a){
                var b=u,c=false;
                if(a>=i){
                    var f=Math.floor(a/i);
                    a=a%i;
                    b+=f+l;
                    c=true
                }
                var d=Math.floor(a/n);
                a=a%n;
                if(d<10&&c)b+="0";
                b+=d+l;
                var e=Math.floor(a/v);
                if(e<10)b+="0";
                b+=e;
                return b
            }
            ,getLoadedThumbnailUrl:function(d){
                var f,a=d.thumbnails;
                if(a){
                    var g=a.length,c=0;
                    for(;
                    c<g;
                    c++){
                        var h=a[c],e=d.baseUrl+h.url;
                        if(b.Images.isComplete(e)){
                            f=e;
                            break
                        }
                        
                    }
                    
                }
                return f
            }
            ,getThumbnail:function(e,f){
                var a=e.thumbnails;
                if(a){
                    var d=a.length,b=0;
                    for(;
                    b<d;
                    b++){
                        var c=a[b];
                        if(c.name==f)return c
                    }
                    
                }
                
            }
            ,pickThumbnail:function(i,k,j){
                var a,c=i.thumbnails;
                if(c){
                    var h=c.length,g=0,b;
                    if(h>0){
                        b=c[0];
                        for(;
                        g<h;
                        g++){
                            var d=c[g],f=d.width,e=d.height;
                            if(f>=k&&e>=j)if(!a||a.width>f&&a.height>e)a=d;
                            if(b.width<f&&b.height<e)b=d
                        }
                        if(!a)a=b
                    }
                    
                }
                return a
            }
            ,getPCString:function(a){
                return GetString(t+a)
            }
            ,getMobileString:function(a){
                return GetString(r+a)
            }
            ,isRootItem:function(a){
                return a.id===A
            }
            ,isSkyDriveRoot:function(a){
                return b.SkyDriveItemHelper.isRootItem(a)&&!a.group&&!s(a)
            }
            ,isGroupRoot:function(a){
                return b.SkyDriveItemHelper.isRootItem(a)&&h(a,"group")==="1"&&a.ownerCid!=null
            }
            ,isGroupItem:function(a){
                return h(a,"group")==="1"
            }
            ,isTopLevelItem:function(c){
                if(b.SkyDriveItemHelper.isRootItem(c))return false;
                var a=c.getParent(true);
                return a&&b.SkyDriveItemHelper.isRootItem(a)
            }
            ,getTopLevelItem:function(a){
                while(a&&!b.SkyDriveItemHelper.isTopLevelItem(a))a=a.getParent(true);
                return a
            }
            ,isViewerOwner:function(a){
                return !a.ownerCid||a.ownerCid.toLowerCase()==FilesConfig.hcid.toLowerCase()
            }
            ,isFavoritesLib:function(b,a){
                return m(b,a,2)
            }
            ,isPhotoAlbum:function(b,a){
                return m(b,a,1)
            }
            ,isMruQuery:function(b){
                var a=h(b,"qt");
                return a&&a.toLowerCase()==="mru"
            }
            ,isSharedQuery:function(b){
                var a=h(b,"qt");
                return a&&a.toLowerCase()==="shared"
            }
            ,getIcon:function(a,c){
                var f="ft_"+c+"_"+a.iconType,d="icon"+c+f;
                if(!a[d]){
                    if(this.isRootItem(a)&&c===16)return b.ImageStrip.getImage("skydrive_16",a.ownerName);
                    if(this.isGroupRoot(a))return b.ImageStrip.getImage("groups",a.ownerName);
                    var g=a.name,e=b.ImageStrip.getImage(f,g);
                    if(!e){
                        var i=c===16?"tiny":c===32?"smaller":"small",h=(FilesConfig.foldersImgBaseUrl+"/icons/{0}/{1}.png").format(i,a.iconType);
                        e=$IS.Create(0,0,c,c,FilesConfig.imgBaseUrl,h,g,"")
                    }
                    a[d]=e
                }
                return a[d].cloneNode(true)
            }
            ,getSongForPlayer:function(a){
                var e,b=a.audio;
                if(b){
                    var d=null;
                    if(a.thumbnailSet)d=a.thumbnailSet.baseUrl+k.Core.SkyDriveItemHelper.getThumbnail(a.thumbnailSet,"height128").url;
                    e={
                        songUrl:a.urls.download+p,songTitle:b.title||a.name||cb,artistName:b.artist||c("InfoPane.Information.UnknownArtist"),albumArtUrl:d,mimeType:b.mimeType,error:0
                    }
                    
                }
                return e
            }
            ,getFriendlyFileType:function(a){
                var f=a.getVersion(),e="friendlyFileTypeVersion";
                if(a[e]!==f){
                    var h=a.extension,c=h&&h.substring(1).toUpperCase(),d=q[a.iconType],b=g("NoExtension");
                    if(!d&&a.folder)b=g("Folder");
                    else if(a.photo&&!a.video)b=g("Image").format(c||"").trim();
                    else if(d)b=g(d);
                    else if(c)b=g("Unknown").format(c);
                    a.friendlyFileType=b;
                    a[e]=f
                }
                return a.friendlyFileType
            }
            
        };
        function s(b){
            var a=h(b,"qt");
            return a&&a!==""
        }
        function h(a,b){
            if(!a.keyParts)a.keyParts=$Utility.deserialize(a.key,"&",false,false);
            return a.keyParts[b]
        }
        function g(a){
            return c("FileType."+a)
        }
        function m(a,c,d){
            var b=false;
            while(!b&&a&&a.parentKey!=null){
                b=a.folder&&a.folder.category===d;
                a=c.dataModel.getItem(a.parentKey,true)
            }
            return b
        }
        
    })();
    (function(){
        var e='<a href="{0}">{1}</a>',d="GroupInfo",g="",f="IPR",q=FilesConfig.groupMailUrl,h=FilesConfig.groupsDomain+"{0}/options",j=c(d+".ViewGroupOptions"),k=FilesConfig.groupMailSearchUrl,p=c(d+".ViewEmail"),n=c(d+".EmailTurnedOff"),m=c(d+".TurnOnEmailLinkText"),l=h+"/email",i=FilesConfig.groupsDomain+"{0}/membership/",s="TagListTemplate";
        b.GroupInfo=r;
        function r(t,A){
            var r=this,z=$Utility.deserialize(A,"&",false,false),x=t.groupAlias,C=t.displayName,s=t.email,b=t.membershipState,w=t.permissions,y=t.membership,B=z["cid"];
            r.emailHtml=function(){
                var c;
                if(s&&s!==g){
                    var i=q.format(s.encodeUrl());
                    c=e.format(i.encodeHtmlAttribute(),s.encodeHtmlAttribute());
                    var d=a(c);
                    d.click(u(null,o,{
                        SkyCmnd:"EG",ClickLoc:f
                    }));
                    c=d
                }
                else if(b&&b>5){
                    var h=l.format(v().encodeUrl());
                    c=n+'<br /><a href="'+h.encodeHtmlAttribute()+'">'+m+"</a>"
                }
                return c
            };
            r.emailTitle=function(){
                return s
            };
            r.emailHistoryHtml=function(){
                var b;
                if(s&&s!==g){
                    var d=k.format(s.encodeUrl());
                    b=e.format(d.encodeHtmlAttribute(),p);
                    var c=a(b);
                    c.click(u(null,o,{
                        SkyCmnd:"VGE",ClickLoc:f
                    }));
                    b=c
                }
                return b
            };
            r.membershipHtml=function(){
                var a;
                if(b&&b>3)a=c(d+".Membership"+b);
                return a
            };
            r.permissionsHtml=function(){
                var a;
                if(w!=null)a=c(d+".Permissions"+w);
                return a
            };
            r.groupOptionsLink=function(){
                var c;
                if(b&&b>4){
                    var g=h.format(v().encodeUrl());
                    c=e.format(g.encodeHtmlAttribute(),j);
                    var d=a(c);
                    d.click(u(null,o,{
                        SkyCmnd:"VGO",ClickLoc:f
                    }));
                    c=d
                }
                return c
            };
            r.canInvite=function(){
                return b&&b>5
            };
            r.groupMembership=function(){
                return y
            };
            r.membershipPageLink=function(a){
                var b=i.format(v().encodeUrl());
                return e.format(b.encodeHtmlAttribute(),a)
            };
            function v(){
                var a;
                if(x)a=x;
                else a="cid-"+B;
                return a
            }
            
        }
        
    })();
    (function(){
        b.ActionManager=d;
        function d(){
            this._actions={}
        }
        var c=d.prototype;
        c.registerAction=function(b,a){
            this._actions[b]=a
        };
        c.isActionRegistered=function(a){
            return this._actions[a]?true:false
        };
        c.getAction=function(b){
            var a=this._actions[b];
            if(!a)return null;
            return a.getAction.apply(a,arguments)
        };
        c.doAction=function(a){
            if(a){
                if(a.click)a.click();
                if(a.url)$BSI.navigateTo(a.url,a.target)
            }
            
        };
        d.setATagAction=c.setATagAction=function(b,c,d,e){
            c=c||a(_ce(O));
            var g=b.click||function(){
                $BSI.navigateTo(b.url);
                return j
            }
            ,f=b.skyCmd;
            if(d&&f)b.click=u(g,o,{
                SkyCmnd:f,ClickLoc:d
            });
            if(e)b.click=function(a){
                return e(a,g)
            };
            if(b.click)c.bind("click.action",b.click);
            c.attr("href",b.url||"#");
            if(b.target)c.attr("target",b.target);
            return c
        }
        
    })();
    (function(){
        b.OperationManager=a;
        var d=new a,c="Operation_";
        b.OperationManager.getInstance=function(){
            return d
        };
        function a(){
            var a=this;
            a.execute=function(b,a){
                $Do.when("Bucket4.js",0,function(){
                    $Do.when(c+b,0,a)
                })
            };
            a.register=function(a,b){
                $Do.register(c+a,function(c){
                    b(a,c)
                })
            }
            
        }
        b.OperationManager.Current=new a
    })();
    (function(){
        var f=b.CookieToss,o="imgPool",t="unload",n=29001,h=k.Core.Images={},m=10,d=[],e=[],c={},v={},i={},u=0,l=0,j=false;
        (function(){
            for(var b=0;
            b<m;
            b++)d.push(a(document.createElement("img")).bind({
                error:q,abort:p,load:s
            }));
            a(window).bind(t,r);
            if(!f.complete)a(f).bind(f.eventName,c);
            function c(){
                g()
            }
            
        })();
        h.getId=function(){
            return o+u++
        };
        h.isComplete=function(a){
            return i[a]
        };
        h.isIdle=function(){
            return e.length==0&&d.length==m
        };
        h.hasLoadedImage=function(a){
            return i[a]
        };
        h.loadImage=function(a,b){
            if(i[a])b&&(b.src=a);
            else if(c[a])c[a].push(b);
            else{
                e.push(a);
                c[a]=[b];
                g()
            }
            
        };
        function r(){
            j=true
        }
        function g(a){
            var b;
            if(!a&&d.length>0)a=d.pop();
            if(a)if(!j&&e.length>0&&(f.complete||!f.requiresCookieToss(e[0]))){
                b=e.splice(0,1)[0];
                if(e.length>0&&d.length>0)g();
                l++;
                if(l%10)c();
                else setTimeout(c,0)
            }
            else d.push(a);
            function c(){
                a[0].s=b;
                a[0].src=b
            }
            
        }
        function q(){
            var b=this,e=a(b),d=b.s;
            $WebWatson.submit("Image failed to download.",d,0,null,n,null,null,true);
            delete c[d];
            g(e)
        }
        function p(){
            var b=this,e=a(b),f=b.s;
            delete c[f];
            d.push(e)
        }
        function s(){
            var f=this,j=a(f),b=f.s,e=c[b],d=0,h=e.length;
            i[b]=true;
            for(;
            d<h;
            d++)e[d]&&(e[d].src=b);
            delete c[b];
            g(j)
        }
        
    })();
    (function(){
        var j=38,i=40,d=0,f=1,e=2,h=0,g=".selectionManager";
        c.SelectionChangedEvent="selectionChanged";
        c.ResolveFailed=-1;
        c.ResolveWaiting=1;
        c.ResolveSuccess=2;
        k.Core.SelectionManager=c;
        function c(L){
            var k=this,O=a(k),n,B,w,t={},z={},l={},q={},v=false,o=-1,m=-1;
            k.dispose=function(){
                s()
            };
            k.registerList=function(b,a){
                t[b]=a;
                z[a.key]=b
            };
            k.unregisterList=function(){
                z={};
                t={}
            };
            k.clickSelect=function(b,c,a){
                a=a||{};
                u(function(){
                    A(c,a);
                    v=a&&a.preselect
                }
                ,b)
            };
            k.keyboardSelect=function(b,c,a){
                a=a||{};
                if(y(b))return true;
                return u(function(){
                    var b=o,d=a.shift;
                    switch(c){
                        case j:if(b!==-1){
                            var e=d?b-1:C(b);
                            b=Math.max(0,e)
                        }
                        else{
                            x(t[0]);
                            b=w-1
                        }
                        break;
                        case i:if(b!==-1){
                            var f=d?b+1:E(b);
                            b=Math.min(w-1,f)
                        }
                        else{
                            x(t[0]);
                            b=0
                        }
                        break;
                        default:return true
                    }
                    if(b!==o){
                        a.ctrl=false;
                        A(b,a)
                    }
                    else return true;
                    return false
                }
                ,b)
            };
            k.resolveSelection=function(b){
                var a=c.ResolveSuccess,f={},m=k.getSelection();
                if(!x(b))if(b.getChildren().get(0))for(var j in l){
                    var d=q[j],g=d?b.getChildren().indexOf(d,false,true):-1;
                    if(g>-1)f[g]=d;
                    else a=c.ResolveFailed
                }
                else a=c.ResolveWaiting;
                else a=c.ResolveFailed;
                if(a===c.ResolveSuccess){
                    var e=q[o],h=e?b.getChildren().indexOf(e,false,true):-1;
                    s();
                    for(var i in f)r(i);
                    o=h
                }
                return a
            };
            k.selectAll=function(a){
                if(y(a))return true;
                u(function(){
                    s();
                    for(var a=0;
                    a<w;
                    a++)r(a)
                }
                ,a)
            };
            k.deselectAll=function(a){
                u(function(){
                    s()
                }
                ,a)
            };
            k.getSelection=function(){
                var a=0;
                for(var b in l)a++;
                return {
                    parent:n,inPreselectionMode:v,indexes:l,selectionCount:a,lastInteractedIndex:o
                }
                
            };
            k.getSelectedItems=function(i){
                var j=b.PageController.getInstance().getViewContext(),d=a(j.dataModel),f=k.getSelection(),m=f.parent,l=f.indexes,e=g+h++;
                c();
                function c(){
                    var a=true,f=[];
                    for(var h in l){
                        var g=m.getChildren().get(h);
                        if(!g)a=false;
                        f.push(g)
                    }
                    d.unbind(e);
                    if(a)i(f);
                    else d.bind(b.DataModel.dataChangedEvent+e,c)
                }
                
            };
            k.isSelected=function(b,a){
                return p(b,n)&&l[a]===a
            };
            k.hasPreselectedChild=function(a){
                return p(a,n)&&v
            };
            function A(a,b){
                var c=G(b);
                switch(c){
                    case f:K(a);
                    m=a;
                    break;
                    case e:J(a,b);
                    break;
                    case d:I(a);
                    m=a
                }
                var g=k.getSelection();
                o=g.selectionCount===0?-1:a
            }
            function K(a){
                H(a)
            }
            function J(b,h){
                if(!h.ctrl){
                    l={};
                    q={};
                    r(m)
                }
                var d=k.isSelected(n,m),c=Math.min(Math.min(m,o),b),e=Math.max(Math.max(m,o),b),f=Math.max(Math.min(m,b),0),g=Math.max(Math.max(m,b),0);
                for(var a=c;
                a<=e;
                a++)if(a>=f&&a<=g){
                    if(a!==m)d?N(a):M(a)
                }
                else{
                    delete l[a];
                    delete q[a]
                }
                
            }
            function I(b){
                var a=k.getSelection(),c=a&&a.selectionCount===1&&k.isSelected(n,b);
                s();
                if(!c)r(b)
            }
            function s(){
                l={};
                q={};
                v=false;
                o=-1;
                m=-1
            }
            function N(a){
                r(a)
            }
            function M(a){
                delete l[a];
                delete q[a]
            }
            function H(a){
                if(k.isSelected(n,a)){
                    delete l[a];
                    delete q[a]
                }
                else r(a)
            }
            function C(b){
                var a=b;
                while(l[a]!=null)a--;
                return a
            }
            function E(b){
                var a=b;
                while(l[a]!=null)a++;
                return a
            }
            function x(a){
                var c=false;
                if(!a)c=true;
                if(!p(a,n)&&a){
                    c=true;
                    n=a
                }
                var d=b.SkyDriveItem.getDefaultSetKey();
                if(B!==d)B=d;
                if(a)w=L.getChildCount(a);
                return c
            }
            function G(a){
                var c=a&&a.ctrl,b=a&&a.shift;
                return b?e:c?f:d
            }
            function y(b){
                var a=0;
                for(var c in t)a++;
                if(a>1&&!p(b,n))return true;
                return false
            }
            function F(a,b){
                var c=p(a.parent,b.parent)&&a.relationshipsKey===b.relationshipsKey&&a.inPreselectionMode===b.inPreselectionMode&&a.selectionCount===b.selectionCount;
                if(c){
                    var d=a.indexes,f=b.indexes;
                    for(var e in d)if(d[e]!==f[e]){
                        c=false;
                        break
                    }
                    
                }
                return c
            }
            function r(a){
                l[a]=parseInt(a);
                var b=n.getChildren().get(a,true);
                if(b)q[a]=b
            }
            function u(b,d){
                var a=k.getSelection();
                if(x(d))s();
                var c=b();
                if(!F(a,k.getSelection()))D();
                return c
            }
            function D(){
                O.trigger(c.SelectionChangedEvent,[k.getSelection()])
            }
            
        }
        
    })();
    (function(){
        b.ErrorManager=c;
        function c(){
            var b=this;
            b._errors=[];
            b.errorReceivedEventName="errorreceived";
            b.errorClearedEventName="errorcleared";
            function c(){
                var d=window.FilesConfig,a=d.notificationBarMessages;
                if(a)for(var e in a){
                    var c=a[e];
                    if(typeof c==="object")b.add(c)
                }
                
            }
            function d(a,b){
                if(a.priority!=b.priority)return a.priority-b.priority;
                else return a.type-b.type
            }
            b.add=function(c){
                c.priority|=0;
                c.type|=0;
                b._errors.push(c);
                b._errors.sort(d);
                a(b).trigger(b.errorReceivedEventName)
            };
            b.clear=function(){
                if(b._errors.length>0){
                    b._errors=[];
                    a(b).trigger(b.errorClearedEventName)
                }
                
            };
            b.dismiss=function(){
                var a=b._errors;
                if(a.length>0)a[0].dismissCallback&&a[0].dismissCallback();
                b.clear()
            };
            b.getErrors=function(){
                return b._errors
            };
            c()
        }
        
    })();
    (function(){
        b.PopoverManager={
            showPopover:function(a,c){
                $Do.when("Bucket3.js",0,function(){
                    var d=new e[a](b.PageController.getInstance().getViewContext());
                    d.show(c)
                });
                if(!e[a]);
            }
            
        }
        
    })();
    (function(){
        var e=["Play","AddToQueue","ViewItem","ViewBrowser","EditBrowser","Arrange","OpenInWord","OpenInExcel","OpenInPowerPoint","OpenInOneNote","ViewVersions","Download","DownloadPG","ViewOrginal","OrderPrints","Move","Copy","Rename","Delete","Embed","Feed","GroupProfile","GroupInvite","Abdicate"],f=["Share"],a=["Play","AddToQueue","Download","DownloadPG","ViewOrginal","Move","Delete","Deselect"];
        b.CommandManager={
            commandLists:{
                General:1,Sharing:2,Multiselect:3
            }
            ,filters:{
                DEL:["Delete"],RN:["Rename"],VB:["ViewBrowser"],VI:["ViewItem"],DS:["Deselect"]
            }
            ,hideViewItem:function(b,c){
                var a=b.actionManager.getAction("DefaultClick",c),d=a&&a.name==="ViewItem",e=b.currentItem===c;
                return !d||e
            }
            ,getCommands:function(h,g){
                var c,d=b.CommandManager.commandLists;
                if(h==d.General)c=e;
                else if(h==d.Sharing)c=f;
                else if(h==d.Multiselect)c=a;
                if(g){
                    c=c.clone();
                    for(var i in g)c.remove(g[i])
                }
                return c
            }
            ,produceCommandList:function(h,r,a,g,i){
                var p,o,s;
                if(i){
                    p=i.fs;
                    o=i.bici;
                    s=i.cf
                }
                var t=[],l=null,n=null;
                if(g&&g.selectionCount==1)for(var u in g.indexes){
                    a=h.dataModel.getChildByIndex(g.parent,u);
                    break
                }
                if(a){
                    l=h.actionManager.getAction("DefaultClick",a);
                    n=l&&l.name
                }
                for(var m=0;
                m<r.length;
                m++){
                    var e=r[m],j;
                    if(a)j=h.actionManager.getAction(e,a);
                    else j=h.multiselectActionManager.getAction(e,g);
                    if(j){
                        var q=e+"Command",f="";
                        if(p&&a.folder)f=c(e+"FolderCommand");
                        f=f||c(q);
                        var k=b.ActionManager.setATagAction(j,null,o,s);
                        k.html(f.encodeHtml()).attr(N,f);
                        if(e===n)k.addClass("ipc_default");
                        d(k,"$Sutra.SkyDrive."+q);
                        t.push(k)
                    }
                    
                }
                return t
            }
            
        }
        
    })();
    (function(){
        var f=b.CommandManager,g='<ul class="c_m t_hovl"></ul>',h='<div class="c_mp co_me" style="position:absolute;"></div>',i='<span class="c_ms"></span>';
        e.ContextMenu=k;
        function k(u,k){
            var q=this,e,b,o,p=j,n;
            q.render=function(v,x,u){
                n=u.ev;
                p=t;
                o=j;
                if(b){
                    b.dispose();
                    b=null
                }
                else k.itemScopedDisposables.push(q);
                if(e)e.remove();
                e=a(h).appendTo(document.body);
                var G=u.pos;
                e.css({
                    left:G.x,top:G.y
                });
                var i=a(g).bind("keydown",s).bind(H,function(){
                    return j
                });
                d(i,"$Sutra.SkyDrive.ContextMenu");
                var y={
                    bici:u.bici,cf:r
                };
                if(v||x&&x.selectionCount==1){
                    var B=f.produceCommandList(k,f.getCommands(f.commandLists.General,u.fil),v,x,y),z=f.produceCommandList(k,f.getCommands(f.commandLists.Sharing,u.fil),v,x,y);
                    m(i,B,B.length>0&&z.length>0);
                    m(i,z,z.length>0&&u.sp)
                }
                else{
                    var F=f.produceCommandList(k,f.getCommands(f.commandLists.Multiselect,u.fil),v,x,y);
                    m(i,F,F.length>0&&u.sp)
                }
                if(u.sp&&v){
                    var D=k.dataModel,A=a('<a href="#">'+c("PropertiesCommand")+"</a>").bind("click",function(){
                        b.hide();
                        if(n&&n.srcElement)a(n.srcElement).trigger("showProperties");
                        k.selectionManager.clickSelect(D.getItem(v.parentKey),D.getIndexOfChild(v.parentKey,v));
                        return j
                    });
                    d(A,"$Sutra.SkyDrive.PropertiesCommand");
                    m(i,[A],j)
                }
                if(!o)m(i,['<a style="display:none"></a><span class="c_ld">'+c("NoCommands")+"</span>"],j);
                e.append(i);
                var C=e.get(0);
                l.$menu.create(n,0,{
                    menuEl:i.get(0),sourceEl:C,parentEl:document.body
                });
                b=C.menu;
                var E=a('<a tabindex="1"></a>');
                i.css(w,L).prepend(a("<li></li>").append(E));
                E.focus().parent().hide()
            };
            q.dispose=function(){
                if(b){
                    b.dispose();
                    b=null
                }
                if(e)e.empty()
            };
            function m(d,c,e){
                var b;
                for(b=0;
                b<c.length;
                b++){
                    if(!$B.IE&&c[b]instanceof a)c[b].attr("tabindex",1);
                    var f=a("<li></li>").append(c[b]);
                    d.append(f);
                    o=t
                }
                if(c.length>0&&e)d.children().last().append(i)
            }
            function r(c,a){
                b.hide();
                return a()
            }
            function s(c){
                var a=c.which;
                if(p&&(a===I||a>36&&a<41)){
                    b.hide();
                    p=j;
                    return j
                }
                
            }
            
        }
        
    })();
    (function(){
        e.NotificationBar=i;
        var j=".NotificationBar",k=0,l='<div class="setNBContainer"><a class="setNBDismiss" href="#"></a><div class="setNBContent"></div></div>',g="setNBInfo",d="setNBWarning",f="setNBError",h=c("PPickerClosePicker");
        function i(n){
            var m=this,e=j+k++,c;
            n.html(l);
            var i=n.find(".setNBContainer").hide(),q=i.find(".setNBContent"),o=i.find(".setNBDismiss");
            o.bind("click"+e,p).html(b.ImageStrip.getImage("close",h));
            m.dispose=function(){
                c&&a(c).unbind(e);
                o.unbind(e)
            };
            m.bind=function(b){
                c&&a(c).unbind(e);
                c=b;
                c&&a(c).bind("change."+e,function(){
                    m.render(c)
                })
            };
            m.render=function(b){
                if(b.getCount()){
                    var a=b.get(0),c=a.type===0?f:a.type===1?d:g;
                    q.html(a.content);
                    i.removeClass(g+" "+d+" "+f).addClass(c).show()
                }
                else i.hide()
            };
            function p(){
                c.clear();
                c.invalidate();
                return false
            }
            
        }
        
    })();
    (function(){
        var a=window.wLive;
        a.Controls.EditableTextOptions=function(){};
        a.Controls.EditableTextOptions.prototype={
            n:"name",gdt:function(){},v:function(){
                return "defaultValue"
            }
            ,g:true,c:false,hc:false,ml:0,de:false,ca:"ClickAction",ac:"actionClass",ic:"inputClass",ec:"editClass",tt:function(){
                return ""
            }
            ,gem:function(){},"get":function(){},aa:"authAction",ea:"editAction"
        }
        
    })();
    (function(){
        k.Core.ActionManager.Action=a;
        function a(){}k.Core.ActionManager.Action.prototype={
            skyCmd:"",target:"",click:function(){},url:"",name:"",requiresRedemption:true
        }
        
    })();
    (function(){
        k.Core.ActionManager.ActionCreator=a;
        function a(){}k.Core.ActionManager.ActionCreator.prototype={
            getAction:function(){}
        }
        
    })();
    (function(){
        var h=b.ItemActionHelper,w=b.SkyDriveItemHelper,Yb="/newlivedocument?{cidQueryString}&ref=2{resIdQueryString}",fc="/newdocument.aspx?{cidQueryString}&ref=2{resIdQueryString}",dc="&xt=docx",ac="&xt=xlsx",Xb="&xt=pptx",Zb="&xt=one",U="/upload.aspx/?{cidQueryString}&ref=1{resIdQueryString}",db=".aspx?{cidQueryString}&resid={parentId}&move={item.id:encodeURIComponent}&parid={parentId}&ref=2&iscopy=",M="/movecopyhome"+db,Y="/movecopy"+db,t="&isfolder={isFolder}",tb="&isnonuifolder=1&isfolder=1",gc="/newfolder.aspx?{cidQueryString}&ref=1{resIdQueryString}",bc="/newlivefolder.aspx?{cidQueryString}&ref=5{resIdQueryString}",Vb="/redir.aspx?{cidQueryString}{resIdQueryString}",mb="/view.aspx?{cidQueryString}{resIdQueryString}",lb="/edit.aspx?{cidQueryString}{resIdQueryString}",Ib="/edit.aspx?{cidQueryString}{resIdQueryString}&nd=1",z="{item.urls.download}",H=".aspx?{cidQueryString}{resIdQueryString}&canary={FilesConfig.navCanary:encodeURIComponent}",xb="/downloadfolder"+H,Pb="/download"+H,wb="/viewpermissions.aspx?{cidQueryString}{resIdQueryString}&ref=2",Wb="/editpermissions?{cidQueryString}{resIdQueryString}&ref=1",ec="/getlink.aspx?{cidQueryString}{resIdQueryString}&ref=1",cc="/sendlink?{cidQueryString}{resIdQueryString}&ref=1",ic="/selectembed.aspx?{cidQueryString}{resIdQueryString}&ref=2",o="https://"+location.host,hc="http://"+location.host,D="/feed.aspx?{cidQueryString}{resIdQueryString}",sb="/changefolderexpiration.aspx?cid={item.ownerCid}{resIdQueryString}",hb="/choosefolder.aspx?{cidQueryString}&ref=5",qb="",Hb="hideSharePopover",Kb="showSharePopover",Sb="showMoveCopy",Fb="showDeletePopover",cb="hideDeletePopover",T=null;
        function g(){
            if(!T)T=b.PageController.getInstance().getViewContext();
            return T
        }
        var N,R,K=true,Ob=!!(navigator.mimeTypes&&navigator.mimeTypes["application/x-wlpg3-detect"]||window.$WlpgWave3Installed),Nb=!!(navigator.mimeTypes&&navigator.mimeTypes["application/x-wlpg-detect"]||window.$WlpgWave2Installed),Lb=w.getPCString("PhotoGalleryUpgradeTextPart1"),Mb=w.getPCString("PhotoGalleryUpgradeTextPart2"),eb=FilesConfig.wlpgDownloadGlinkUrl,nb="OneNote.Notebook",A="DO",B="DEL",v="OO",pb="C",S="M",i="DC",fb="NW",bb="NE",X="NP",ab="NO",u="NF",jb="AF",gb="AP",Cb="RD",Bb="Excel",J="OneNote",vb="PowerPoint",Eb="Word",Jb=".OneNote",P="w",O="x",I="p",L="n";
        function kb(){
            return a('<iframe src="'+FilesConfig.iFrameEmptyUrl.encodeHtmlAttribute()+'"></iframe>').hide().appendTo(l.document.body)
        }
        function yb(c,b,a){
            if(K)if(Ob){
                if(!N)N=kb();
                N.attr("src","wlpg: /c "+c+" /r "+b+" /t "+a)
            }
            else if(Nb){
                if(confirm(Lb+"\n\n"+Mb)==true)window.open(eb)
            }
            else window.open(eb);
            K=false;
            setTimeout(function(){
                K=true
            }
            ,3e3)
        }
        function n(c,b,e,d){
            Gb(b);
            var a=h.itemStringFormat(c,b,e,d);
            if($B.Mobile)$BSI.navigateTo(a,"_top");
            else{
                if(!R)R=kb();
                R.attr("src",a)
            }
            
        }
        function Qb(d){
            if(d.isSpecialFolder){
                var b=new $UI.Popover;
                g().itemScopedDisposables.push(b);
                b.header=c("Sharing.SpecialFolder.Header");
                b.body=c("Sharing.SpecialFolder.Msg1")+"<br /><br />"+c("Sharing.SpecialFolder.Msg2").format('<a class="sdi_s" href="#" onclick="return false">'+c("Sharing.SpecialFolder.Msg3")+"</a>");
                b.modal=true;
                b.bodyPadding=true;
                b.showFooter=true;
                b.addButton("cancel",c("Sharing.SpecialFolder.Button"),true,true);
                b.width=400;
                b.show(0,0,"cancel",0);
                a(".UI_Popover .sdi_s").bind(r,function(){
                    Z(d);
                    b.hide()
                })
            }
            else Z(d)
        }
        function Z(i){
            var d=a('<div class="sd_pop_wrapper"></div>'),c=new $UI.Popover;
            g().itemScopedDisposables.push(c);
            c.width=600;
            c.modal=true;
            c.bodyPadding=false;
            c.showHeader=false;
            c.body=d[0];
            var f=new b.PermissionsProvider(g().callerCid),h=new e.ShareDialog(d,f,i,function(){
                var b=g();
                a(b).trigger(Hb);
                c.hide()
            });
            h.render();
            c.show(0,0,0,1)
        }
        function Rb(b){
            $Do.when("Bucket3.js",0,function(){
                var f=g().deviceItemSet,e=f.getByKey(b.did.toLowerCase()),i=g();
                i.itemScopedDisposables.push($UI.MsgBoxEx(c("RemoveDevice.ConfirmTitle").format(e.name).encodeHtml(),c("RemoveDevice.ConfirmText1").format(e.name).encodeHtml()+"<br/><br/>"+c("RemoveDevice.ConfirmText2").format(e.name).encodeHtml(),c("RemoveDevice.DisconnectButtonText"),c("CancelCommand"),function(){
                    f.remove(e)
                }
                ,null,document.body,400,false));
                var h=a("#popover_btn_ok");
                d(h.closest(s),"$Sutra.SkyDrive.RemoveDeviceConfirmation");
                d(h,"$Sutra.SkyDrive.RemoveDeviceOKButton");
                d(a("#popover_btn_cancel"),"$Sutra.SkyDrive.RemoveDeviceCancelButton")
            })
        }
        function G(b){
            $Do.wE("Bucket3.js",0,function(){
                a(g()).trigger(Fb);
                var e=g();
                e.itemScopedDisposables.push($UI.MsgBoxEx(c("DeletePromptTitle"),c("DeletePromptSingleItem").format(b.name.encodeHtml()),c("YesCommand"),c("NoCommand"),function(){
                    a(g()).trigger(cb);
                    if(!x(b))Ab(b);
                    else Ub(b)
                }
                ,function(){
                    a(e).trigger(cb)
                }
                ,document.body,400,false));
                $messageBox=a(".UI_Popover");
                d($messageBox,"$Sutra.SkyDrive.DeleteMsgBoxContainer");
                d(a(".Body",$messageBox),"$Sutra.SkyDrive.DeleteMsgBoxBody");
                d(a("#popover_btn_ok",$messageBox),"$Sutra.SkyDrive.DeleteMsgBoxOkBtn");
                d(a("#popover_btn_cancel",$messageBox),"$Sutra.SkyDrive.DeleteMsgBoxCancelBtn")
            })
        }
        function W(e){
            var h=g(),a=h.dataModel,d=null,k=true,l=h.currentViewType==E,c=a.getIndexOfChild(e.parentKey,e,true);
            if(c>=0){
                var b=a.getItem(e.parentKey,true);
                if(b){
                    k=false;
                    d=b;
                    var i=a.getChildCount(b);
                    if(i>1&&l){
                        var f=c<i-1?c+1:c-1;
                        if(f>=0){
                            var j=a.getChildByIndex(b,f,true);
                            if(j)d=j
                        }
                        
                    }
                    
                }
                
            }
            return d
        }
        function Ub(c){
            var a=W(c);
            b.OperationManager.Current.execute("Delete",{
                items:[c],targetItem:c.getParent(true)
            });
            var e=g();
            if(a&&e.viewParams.id!=a.id){
                var d=h.itemStringFormat("#{cidQueryString}"+(a?"{idQueryString}":"")+"{scenario}",a);
                $BSI.navigateTo(d)
            }
            
        }
        function Ab(b){
            var a=W(b),c=h.itemStringFormat(o+"?{cidQueryString}"+(a?"{idQueryString}":"")+"{scenario}",a);
            $BSI.navigateTo(h.itemStringFormat("/delete"+H+"{scenario}{queryType}"+(a?"":"&rurl="+c.encodeURIComponent()),b))
        }
        function Tb(d){
            var b,a,f="windows_live_order_prints",e="width=510,height=230,top=120,channelmode=0,dependent=0,directories=0,fullscreen=0,location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0";
            function c(){
                if(b){
                    clearInterval(a);
                    a=null;
                    b.focus()
                }
                
            }
            b=window.open(d,f,e);
            a=setInterval(c,50);
            $menu.closeAll()
        }
        function q(a,g,i,c,b,f){
            var d=h.itemStringFormat("/ResourceToUrl/?{cidQueryString}{resIdQueryString}&oc={item.ownerCid}&ct="+(c||a.group?"Group":"None"),a,i,c),e={
                fileName:a.name,appType:b,extension:b==J?Jb:a.extension
            };
            if(!f)$Do.wE("Bucket3.js",0,function(){
                l.OfficeClient.executeOpenInClient(d,true,g,e,w.getPCString("OpenInClientGeneralFailureText"),w.getPCString("OpenInClientGeneralFailureButtonText"))
            });
            else $Network.fetchXML(d+"&r="+Math.random(),function(a){
                var b;
                if(a==null||a.responseText==null||(b=Object.fromJSON(a.responseText))==null)$WebWatson.submit("Failed fetching dav url on mobile client","Mobile Skydrive Files Page","0");
                else $BSI.navigateTo("onenote:"+decodeURIComponent(b.Url))
            }
            ,"GET",null)
        }
        function m(d,c,e){
            var f=g(),a="",h=e?" at the root level":" in a subfolder",i=c.group?" for a group":"";
            switch(d){
                case P:a="Word doc";
                break;
                case O:a="Excel spreadsheet";
                break;
                case I:a="PowerPoint presentation";
                break;
                case L:a="OneNote notebook"
            }
            $Do.wE("Bucket3.js",0,function(){
                var a=new b.NewDocumentCommand(g(),c);
                f.itemScopedDisposables.push(a);
                a.execute(d)
            })
        }
        function Q(d,e){
            if(!C()){
                F();
                return false
            }
            var a=b.SkyDriveItemHelper.getSongForPlayer(d);
            if(a){
                var c=[a];
                $Do.wE("MusicPlayer",0,function(){
                    var a=k.Controls.MusicPlayer;
                    a.display();
                    a.getPlaylist().append(c,e)
                })
            }
            return false
        }
        function V(b,a){
            return ib(b,a,false)
        }
        function rb(b,a){
            return ib(b,a,true)
        }
        function ib(e,d,c){
            $Do.wE("Bucket3.js",0,function(){
                a(g()).trigger(Sb);
                var e=g(),f=new b.MoveCopyCommand(e,c);
                e.itemScopedDisposables.push(f);
                f.execute(d)
            });
            return false
        }
        function y(f,c){
            var b=g();
            if(!b.pendingFolderToCreate){
                var d=b.pendingFolderToCreate=c.createPinnedSubfolder();
                c.invalidate();
                a(g()).trigger("Rename",d.key)
            }
            return false
        }
        function p(d,b,c,a){
            return function e(i,e,g,f){
                if(x(e)){
                    if(c)$BSI.navigateTo(h.itemStringFormat(c,e,g,f));
                    else if(a)a(i,e,g,f)
                }
                else if(d)$BSI.navigateTo(h.itemStringFormat(d,e,g,f));
                else if(b)b(i,e,g,f);
                return false
            }
            
        }
        var ob={
            ViewVersions:{
                name:"vv",1:{
                    skyCmd:"VRS",url:Vb+"&page=versions"
                }
                
            }
            ,ViewPerms:{
                name:"pm",1:{
                    skyCmd:"VP",url:wb
                }
                
            }
            ,Share:{
                name:"sh",1:{
                    skyCmd:"SH",click:function(c,b){
                        $Do.wE("Bucket3.js",0,function(){
                            $Do.wE("wLive.Controls.ShareDialog",0,function(){
                                $Do.wE("Bucket3.css",0,function(){
                                    var c=g();
                                    a(c).trigger(Kb);
                                    Qb(b)
                                })
                            })
                        });
                        return false
                    }
                    
                }
                
            }
            ,ChangeExpiration:{
                name:"ce",1:{
                    url:sb
                }
                
            }
            ,Feed:{
                name:"fe",1:{
                    url:o+D+qb
                }
                ,2:{
                    url:o+D
                }
                ,3:{
                    url:o+D+qb
                }
                ,4:{
                    url:o+D
                }
                
            }
            ,Embed:{
                name:"em",1:{
                    skyCmd:"EM",click:function(j,h){
                        var f="showEmbedPopover",d="hideEmbedPopover";
                        $Do.wE("Bucket3.js",0,function(){
                            $Do.wE("Bucket4.js",0,function(){
                                var i;
                                try{
                                    var j=new b.PermissionsProvider(g().callerCid);
                                    i=new e["Embed"](j)
                                }
                                catch(m){
                                    var l=c("Embed.PopoverError");
                                    g().errorManager.add({
                                        $element:a("<span>"+l.encodeHtml()+"</span>"),priority:1,type:0
                                    })
                                }
                                var k=function(){
                                    a(g()).trigger(d)
                                };
                                a(g()).trigger(f);
                                i["show"](h,true,k)
                            })
                        });
                        return false
                    }
                    
                }
                
            }
            ,Download:{
                name:"dl",1:{
                    skyCmd:A,click:function(c,a){
                        g().operationManager.execute("DownloadAsZip",{
                            items:[a]
                        });
                        return false
                    }
                    
                }
                ,2:{
                    skyCmd:A,click:function(d,b,c,a){
                        n(Pb,b,c,a);
                        return false
                    }
                    
                }
                ,3:{
                    skyCmd:A,click:function(d,b,c,a){
                        n(z,b,c,a);
                        return false
                    }
                    
                }
                ,4:{
                    skyCmd:A,click:function(f,d,e,c){
                        var a=o+"?{cidQueryString}{idQueryString}&action=Download";
                        a=h.itemStringFormat(a,d,e,c);
                        var b=FilesConfig.autoRedeemSignIn+"&ru="+a.encodeUrl()+"&wreply="+a.encodeUrl();
                        $BSI.navigateTo(b,"_top");
                        return false
                    }
                    
                }
                
            }
            ,Delete:{
                name:"de",1:{
                    skyCmd:B,click:function(b,a){
                        G(a);
                        return false
                    }
                    
                }
                ,2:{
                    skyCmd:B,click:function(b,a){
                        G(a);
                        return false
                    }
                    ,requiresRedemption:true
                }
                ,3:{
                    skyCmd:B,click:function(b,a){
                        G(a);
                        return false
                    }
                    
                }
                ,4:{
                    skyCmd:B,click:function(b,a){
                        G(a);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,Arrange:{
                name:"ar",1:{
                    skyCmd:"R",url:"/arrange.aspx?{cidQueryString}{resIdQueryString}"
                }
                
            }
            ,ViewOrginal:{
                name:"vo",1:{
                    skyCmd:"VO",url:"{item.urls.open}",target:"_blank"
                }
                
            }
            ,ViewBrowser:{
                name:"vb",1:{
                    skyCmd:"VB",url:mb
                }
                ,2:{
                    skyCmd:"VB",click:function(c,b,d,a){
                        $Do.wE("pdfClick",this,c,b,d,a,n,h.itemStringFormat);
                        return false
                    }
                    
                }
                
            }
            ,EditBrowser:{
                name:"eb",1:{
                    skyCmd:"EB",url:lb,requiresRedemption:true
                }
                
            }
            ,EditBrowserNew:{
                name:"eb",1:{
                    skyCmd:"EB",url:Ib
                }
                
            }
            ,OpenInExcel:{
                name:"oo",1:{
                    skyCmd:v,click:function(d,b,c,a){
                        q(b,null,c,a,Bb);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,OpenInOneNote:{
                name:"oo",2:{
                    skyCmd:v,click:function(d,b,c,a){
                        q(b,nb,c,a,J);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,OpenInPowerPoint:{
                name:"oo",3:{
                    skyCmd:v,click:function(d,b,c,a){
                        q(b,null,c,a,vb);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,OpenInWord:{
                name:"oo",4:{
                    skyCmd:v,click:function(d,b,c,a){
                        q(b,null,c,a,Eb);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,OrderPrints:{
                name:"op",1:{
                    skyCmd:"OP",click:function(b,a){
                        Tb(h.itemStringFormat(o+"/orderprints.aspx?{cidQueryString}{resIdQueryString}",a));
                        return false
                    }
                    
                }
                
            }
            ,AddTag:{
                name:"at",1:{
                    click:function(d,c){
                        var b=g();
                        a(b).trigger("enableTagging",[c.key]);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,Rename:{
                name:"rn",1:{
                    skyCmd:"RN",click:function(d,c){
                        var b=g();
                        a(b).trigger("Rename",c.key);
                        return j
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,ModifyCaption:{
                name:"mc",1:{
                    click:function(){}
                }
                
            }
            ,ChangeFolderType:{
                name:"rn",1:{
                    url:"/changefoldertype.aspx?{cidQueryString}{resIdQueryString}"
                }
                
            }
            ,Copy:{
                name:"cp",1:{
                    skyCmd:pb,click:p(M+"1"+t,null,null,rb)
                }
                ,2:{
                    skyCmd:pb,click:p(Y+"1"+t,null,null,rb)
                }
                
            }
            ,Move:{
                name:"mv",1:{
                    skyCmd:S,click:p(M+"0"+t,null,null,V)
                }
                ,2:{
                    skyCmd:S,click:p(Y+"0"+t,null,null,V)
                }
                ,3:{
                    skyCmd:S,click:p(M+"0"+tb,null,null,V)
                }
                
            }
            ,DownloadPG:{
                name:"dpg",1:{
                    skyCmd:"DPG",click:function(c,a){
                        var b=a.group?"groups":"skydrive";
                        yb(g().callerCid,a.id,b);
                        return false
                    }
                    
                }
                
            }
            ,DefaultClick:{
                name:"defc",1:{
                    skyCmd:i,url:"#{cidQueryString}{idQueryString}{deviceIdQueryString}{scenario}",name:"ViewItem"
                }
                ,2:{
                    skyCmd:i,url:lb,name:"EditBrowser",requiresRedemption:true
                }
                ,3:{
                    skyCmd:i,url:mb,name:"ViewBrowser"
                }
                ,4:{
                    skyCmd:i,click:function(h,b,e,d){
                        if(b.isProcessingVideo&&$B.Full){
                            var a=new $UI.Popover;
                            g().itemScopedDisposables.push(a);
                            a.header=f("Video.BeingProcessedHeader");
                            a.body=f("Video.BeingProcessedMessage");
                            a.modal=true;
                            a.bodyPadding=true;
                            a.showFooter=true;
                            a.addButton("download",c("DownloadCommand"),true,false);
                            a.addButton("cancel",c("Cancel"),false,true);
                            a.width=400;
                            a.show(function(c,a){
                                if(a=="download")n(z,b,e,d);
                                return true
                            }
                            ,0,"download",0)
                        }
                        else n(z,b,e,d);
                        return false
                    }
                    ,name:"Download"
                }
                ,5:{
                    skyCmd:i,click:function(c,a){
                        $BSI.navigateTo(a.urls.favorite,"_blank");
                        return false
                    }
                    
                }
                ,6:{
                    skyCmd:i,click:function(d,b,c,a){
                        q(b,nb,c,a,J,true);
                        return false
                    }
                    ,requiresRedemption:true
                }
                ,7:{
                    skyCmd:i,click:function(d,b,c,a){
                        n(xb,b,c,a);
                        return false
                    }
                    
                }
                ,8:{
                    skyCmd:i,click:function(c,a){
                        Q(a,true);
                        return false
                    }
                    ,name:"Play"
                }
                ,9:{
                    skyCmd:i,click:function(d,b,c,a){
                        if($B.Mobile)n(z,b,c,a);
                        else{
                            $Do.wE("pdfClick",this,d,b,c,a,n,h.itemStringFormat);
                            return false
                        }
                        
                    }
                    ,name:"ViewBrowser"
                }
                
            }
            ,CreateWord:{
                name:"cdoc",1:{
                    skyCmd:fb,click:function(b,a){
                        m(P,a,true);
                        return false
                    }
                    ,requiresRedemption:true
                }
                ,2:{
                    skyCmd:fb,click:function(b,a){
                        m(P,a,false);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,CreateExcel:{
                name:"cxls",1:{
                    skyCmd:bb,click:function(b,a){
                        m(O,a,true);
                        return false
                    }
                    ,requiresRedemption:true
                }
                ,2:{
                    skyCmd:bb,click:function(b,a){
                        m(O,a,false);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,CreatePowerPoint:{
                name:"cppt",1:{
                    skyCmd:X,click:function(b,a){
                        m(I,a,true);
                        return false
                    }
                    ,requiresRedemption:true
                }
                ,2:{
                    skyCmd:X,click:function(b,a){
                        m(I,a,false);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,CreateOneNote:{
                name:"con",1:{
                    skyCmd:ab,click:function(b,a){
                        m(L,a,true);
                        return false
                    }
                    ,requiresRedemption:true
                }
                ,2:{
                    skyCmd:ab,click:function(b,a){
                        m(L,a,false);
                        return false
                    }
                    ,requiresRedemption:true
                }
                
            }
            ,CreateFolder:{
                name:"cf",1:{
                    skyCmd:u,requiresRedemption:true,click:y
                }
                ,2:{
                    skyCmd:u,requiresRedemption:true,click:y
                }
                
            }
            ,CreateAlbum:{
                name:"cf",1:{
                    skyCmd:u,requiresRedemption:true,click:y
                }
                ,2:{
                    skyCmd:u,requiresRedemption:true,click:y
                }
                
            }
            ,AddFiles:{
                name:"up",1:{
                    skyCmd:jb,url:hb,requiresRedemption:true
                }
                ,2:{
                    skyCmd:jb,url:U,requiresRedemption:true
                }
                
            }
            ,AddPhotos:{
                name:"up",1:{
                    skyCmd:gb,url:hb+"&sc=photos",requiresRedemption:true
                }
                ,2:{
                    skyCmd:gb,url:U+"&IsPhotoUpload=1",requiresRedemption:true
                }
                
            }
            ,Upload:{
                name:"up",2:{
                    url:U,requiresRedemption:true
                }
                
            }
            ,RemoveDevice:{
                name:"rd",1:{
                    skyCmd:Cb,click:function(b,a){
                        Rb(a);
                        return false
                    }
                    
                }
                
            }
            ,AddComment:{
                name:"cm",2:{
                    url:"#"
                }
                
            }
            ,EmailPublishing:{
                name:"epb",1:{
                    url:"emailpublishing?cid={item.ownerCid}"
                }
                
            }
            ,Play:{
                name:"pl",1:{
                    click:function(c,a){
                        Q(a,true);
                        return false
                    }
                    
                }
                
            }
            ,AddToQueue:{
                name:"atq",1:{
                    click:function(c,a){
                        Q(a,false);
                        return false
                    }
                    ,check:function(){
                        var a=k.Controls.MusicPlayer;
                        if(a){
                            var b=a.getPlaylist();
                            if(b&&!b.isEmpty())return true
                        }
                        return false
                    }
                    
                }
                
            }
            
        };
        function Gb(a){
            var b="Document",c=a&&a.did?"Devices":"SkyDrive";
            if(a)if(a.video)b="Movie";
            else if(a.photo)b="Photo";
            $BSI.reportEvent("Download.Content.File."+b,{
                DocsContentSource:c
            })
        }
        function ub(d,a){
            if(!a._commands)if(a.commands){
                var c=a.commands.split(",");
                a._commands={};
                for(var b=0;
                b<c.length;
                b+=2)a._commands[c[b]]=c[b+1]
            }
            else a._commands={};
            return a._commands[d]
        }
        var Db={
            getAction:function(f,d,k,j){
                var c=null,m=ob[f],n=m.name,l=ub(n,d);
                if(l){
                    var i=m[l];
                    if(i&&(!i.check||i.check(f,d,k,j))){
                        c=a.extend({},i);
                        c.name=c.name||f;
                        if(c.url)c.url=h.itemStringFormat(c.url,d,k,j);
                        var e=c.click;
                        c.click=function(){
                            var a=true;
                            if(c.requiresRedemption&&d.tokenNeedsRedeeming&&!g().tokenHasBeenRedeemed){
                                b.PopoverManager.showPopover("TicketRedeemer",{
                                    authkey:FilesConfig.authKey,item:d,action:c,callback:function(){
                                        var a=e&&e(f,d,k,j)||!e;
                                        if(a&&c.url)$BSI.navigateTo(c.url)
                                    }
                                    
                                });
                                a=false
                            }
                            else if(e)a=e(f,d,k,j);
                            return a
                        }
                        
                    }
                    
                }
                return c
            }
            
        };
        b.SkyDriveItemHelper.registerJsonApiActions=zb;
        function zb(a){
            for(var b in ob)a.actionManager.registerAction(b,Db)
        }
        
    })();
    (function(){
        var f=k.Core.SkyDriveItemHelper,c=null;
        function d(){
            if(!c)c=b.PageController.getInstance().getViewContext();
            return c
        }
        var e={
            SkyDriveRoot:{
                url:"#{cidQueryString}"
            }
            ,Abdicate:{
                click:function(d,a){
                    b.PopoverManager.showPopover("AbdicatePopover",{
                        item:a
                    });
                    return false
                }
                ,check:function(c,a){
                    return FilesConfig.abdicateEnabled&&a.isQt("shared")&&!d().viewParams.group
                }
                
            }
            ,ViewItem:{
                url:"#{cidQueryString}{idQueryString}{scenario}{deviceIdQueryString}"
            }
            ,CreatorProfileUrl:{
                url:"{profileDomain}cid-{item.creatorCid:encodeURIComponent}"
            }
            ,OfficeLearnMore:{
                skyCmd:"LM",url:"http://g.live.com/8SESkydrive/DocsLearnMore"
            }
            ,ViewSyncedFolders:{
                skyCmd:"VS",url:"{FilesConfig.devicesDomain}/Devices/SkyDriveSyncedStorage"
            }
            ,ViewMyDocs:{
                url:"#sc=documents"
            }
            ,ViewMyPhotos:{
                url:"#sc=photos"
            }
            ,ViewRecentDocs:{
                url:"#qt=mru"
            }
            ,ViewSharedDocs:{
                url:"#qt=shared"
            }
            ,ViewGroup:{
                url:"#{cidQueryString}"
            }
            ,GroupProfile:{
                skyCmd:"GVP",url:"{profileDomain}cid-{cid:encodeURIComponent}",check:function(c,b,d,a){
                    return f.isGroupRoot(b)||a
                }
                
            }
            ,GroupInvite:{
                skyCmd:"GIP",url:"{profileDomain}cid-{cid:encodeURIComponent}/invite",check:function(g,b){
                    var c=d(),a;
                    if(f.isGroupRoot(b))a=c.dataModel.getGroupInformation(b.ownerCid,b.key,c);
                    return a&&a.canInvite()
                }
                
            }
            
        }
        ,h={
            getAction:function(g,f,h,d){
                var c=e[g];
                if(c&&(!c.check||c.check(g,f,h,d))){
                    var b=a.extend({},c);
                    if(b.url)b.url=k.Core.ItemActionHelper.itemStringFormat(b.url,f,h,d);
                    var i=b.click;
                    b.click=function(){
                        if(i)return i(g,f,h,d)
                    };
                    return b
                }
                else return null
            }
            
        };
        b.SkyDriveItemHelper.registerLinkActions=g;
        function g(a){
            for(var b in e)a.actionManager.registerAction(b,h)
        }
        
    })();
    (function(){
        var p=k.Core.SkyDriveItemHelper,o=true,g=null,m=b.ItemActionHelper;
        function e(){
            if(!g)g=b.PageController.getInstance().getViewContext();
            return g
        }
        function i(c,j){
            if(!C()){
                F();
                return false
            }
            var f,h=e(),g=false,d=[],a;
            for(var m in c.indexes){
                var n=c.indexes[m],i=h.dataModel.getChildByIndex(c.parent,n);
                if(i){
                    var l=b.SkyDriveItemHelper.getSongForPlayer(i);
                    if(l)d.push(l)
                }
                else{
                    f=m;
                    g=o;
                    break
                }
                
            }
            $Do.when("MusicPlayer",0,function(){
                var b=k.Controls.MusicPlayer;
                if(d.length>0){
                    b.display();
                    b.getPlaylist().append(d,j);
                    a=true
                }
                
            });
            if(g)h.selectionManager.getSelectedItems(function(d){
                var c=[];
                for(var g in d)if(g>=f){
                    var h=d[g],e=b.SkyDriveItemHelper.getSongForPlayer(h);
                    if(e)c.push(e)
                }
                $Do.when("MusicPlayer",0,function(){
                    var b=k.Controls.MusicPlayer;
                    if(!a)b.display();
                    b.getPlaylist().append(c,!a&&j)
                })
            });
            return false
        }
        var h={
            Deselect:{
                name:"ds",click:function(a){
                    e().selectionManager.deselectAll(a.parent);
                    return false
                }
                ,check:function(){
                    return true
                }
                
            }
            ,Download:{
                click:function(){
                    var a=e();
                    a.selectionManager.getSelectedItems(function(c){
                        var f=c[0].getParent(),e=0;
                        for(var d=0;
                        d<c.length;
                        d++)e+=parseInt(c[d].size);
                        if(FilesConfig.hcid=="UnAuth"&&e>FilesConfig.maxAnonDownloadSize){
                            var b="https://"+location.host+"?{cidQueryString}{idQueryString}";
                            b=m.itemStringFormat(b,f);
                            var g=FilesConfig.autoRedeemSignIn+"&ru="+b.encodeUrl()+"&wreply="+b.encodeUrl();
                            $BSI.navigateTo(g,"_top")
                        }
                        else a.operationManager.execute("DownloadAsZip",{
                            items:c
                        })
                    });
                    return false
                }
                ,check:function(a){
                    return f("Download",a,function(a){
                        return !a.did
                    })
                }
                
            }
            ,Play:{
                name:"pl",click:function(a){
                    i(a,true);
                    return false
                }
                
            }
            ,AddToQueue:{
                name:"atq",click:function(a){
                    i(a,false);
                    return false
                }
                
            }
            ,Move:{
                click:function(a){
                    $Do.when("Bucket3.js",0,function(){
                        var c=new b.MoveCopyCommand(e(),false);
                        c.execute(null,a)
                    });
                    return false
                }
                ,check:function(c){
                    var a=b.SkyDriveItemHelper;
                    return f("Move",c,function(b){
                        return !a.isMruQuery(b)&&!a.isSharedQuery(b)&&x(b)
                    })
                }
                
            }
            ,Delete:{
                click:function(i){
                    var b,h,f=e();
                    function g(){
                        if(h&&b)f.operationManager.execute("Delete",{
                            items:b,targetItem:b[0].getParent()
                        })
                    }
                    f.selectionManager.getSelectedItems(function(a){
                        b=a;
                        g()
                    });
                    $Do.when("Bucket3.js",0,function(){
                        f.itemScopedDisposables.push($UI.MsgBoxEx(c("DeletePromptTitle"),c("DeletePromptMultipleItems").format(i.selectionCount),c("YesCommand"),c("NoCommand"),function(){
                            h=true;
                            g()
                        }
                        ,null,document.body,400,false));
                        $messageBox=a(s);
                        d($messageBox,"$Sutra.SkyDrive.DeleteMsgBoxContainer");
                        d(a(".Body",$messageBox),"$Sutra.SkyDrive.DeleteMsgBoxBody");
                        d(a("#popover_btn_ok",$messageBox),"$Sutra.SkyDrive.DeleteMsgBoxOkBtn");
                        d(a("#popover_btn_cancel",$messageBox),"$Sutra.SkyDrive.DeleteMsgBoxCancelBtn")
                    });
                    return false
                }
                
            }
            
        }
        ,j={
            getAction:function(e,d){
                var c=h[e],b=null;
                if(c&&n(c,e,d)){
                    b=a.extend({},c);
                    if(b.click){
                        var f=b.click;
                        b.click=function(){
                            return f(d)
                        }
                        
                    }
                    
                }
                return b
            }
            
        };
        function f(h,d,b){
            var c=false,f=d.indexes;
            for(var i in f){
                var g=f[i],a=e().dataModel.getChildByIndex(d.parent,g,true);
                if(a)if(e().actionManager.getAction(h,a)&&(!b||b(a)))c=true
            }
            return c
        }
        function n(c,d,b){
            var a=false,e=b.indexes;
            if(c&&c.check)a=c.check(b);
            else a=f(d,b);
            return a
        }
        b.SkyDriveItemHelper.registerMultiselectActions=l;
        function l(a){
            for(var b in h)a.multiselectActionManager.registerAction(b,j)
        }
        
    })();
    (function(){
        var j=6.21355968e13,s=f("Dates.Yesterday"),w=f("Dates.DaysAgo"),x=f("Dates.HourAgo"),t=f("Dates.HoursAgo"),q=f("Dates.MinuteAgo"),p=f("Dates.MinutesAgo"),r=f("Dates.MomentAgo"),l=f("Dates.MomentAgoLowerCase"),k=y("DateFormat.DayMonthYearPattern"),o=y("DateFormat.DayAndSuffixPattern"),m=y("DateFormat.AppendAfterDay"),B="_t",e=60*1e3,c=[],n=10;
        b.DateFactory={
            getDate:function(b,d,f){
                var e=a(_ce("span"));
                if(b>0)c.push({
                    el:e.text(h(b,d,f)),ticks:b,localizedDate:d
                });
                return e
            }
            ,getFormattedDate:function(i){
                var b=d(i),a=new Date(b),g=(a.getMonth()+1).toString(),h=a.getDate(),c=f("Dates.AbbreviatedMonth_{0}".format(g)),j=o.format(h,m),e=k.format(c,j,a.getFullYear());
                return e
            }
            
        };
        function d(b){
            var a=b/1e4-j;
            return a
        }
        function h(h,g,j){
            var k=new Date,i=d(h),c=k.getTime()-i,a=A(c),f=z(c),e=u(c);
            if(a>0)if(a<7)return (a==1?s:w).format(a);
            else return g?g:b.DateFactory.getFormattedDate(h);
            else if(f>0)return (f==1?x:t).format(f);
            else if(e>0)return (e==1?q:p).format(e);
            else return j?l:r
        }
        function A(a){
            if(a==0)return 0;
            return Math.floor(a/1e3/60/60/24)
        }
        function z(a){
            if(a==0)return 0;
            return Math.floor(a/1e3/60/60)
        }
        function u(a){
            if(a==0)return 0;
            return Math.floor(a/1e3/60)
        }
        setTimeout(i,e);
        function i(){
            var a=[];
            g(c,a,0)
        }
        function g(a,b,j){
            var d=Math.min(j+n,a.length);
            for(var f=j;
            f<d;
            f++){
                var h=a[f];
                if(v(h))b.push(h)
            }
            if(d<a.length)setTimeout(function(){
                g(a,b,d)
            }
            ,10);
            else{
                c=b;
                setTimeout(i,e)
            }
            
        }
        function v(a){
            var c=false,b=a["el"],d=a["ticks"],e=a["localizedDate"];
            if(b&&b.closest("body").size()!==0&&d){
                b.text(h(d,e));
                c=true
            }
            return c
        }
        
    })();
    (function(){
        var c=b.Images,x=b.CommandManager,R=128,V=64,u=48,j=32,s=$B.Mobile?5:12,m=".",l="itemTos",eb="",J="alt",db="title",k="src",G="w",F="h",E="p",q="img",h="load",o="error",bb="abort",y="margin-top",z="opacity",ab="z-index",i="itemTl",I="linear",O=c_pulseFadeInSpeed=1e3,N=0,D=500,S=9500,fb=0,r=$B.Full?128:64,C="height"+r,cb=$B.rtl?"left":"right",B=$B.rtl?"right":"left",Z="margin-"+B,t='<span class="itemTp"><img alt="{0}" title="" /></span>',v=($B.Mobile?"":'<span class="itemTs"></span>')+t,Y='<span class="itemTo"><span class="itemTvo"></span></span><span class="itemTos">'+v+"</span>",W='<span class="itemTo itemTag"><span class="itemTa"><span class="itemTan"><span class="itemName"></span></span></span><span class="itemTac">{1}</span></span><span class="itemTos">'+t+'</span><span class="itemTos">'+t+"</span>",T=$B.Mobile?"/mobile_folder_gradient.png":"/folder_gradient.png",X=$B.Mobile?"/mobile_folder_overlay.png":"/folder_overlay.png",U='<span class="itemTo itemTf"><span class="itemTfhov"><span class="itemTfg"><span class="itemTfi"><img src="'+(FilesConfig.foldersImgBaseUrl+T).encodeHtmlAttribute()+'" class="itemTgrad" width="100%" height="100%" /></span><img class="itemTfo" src="'+(FilesConfig.foldersImgBaseUrl+X).encodeHtmlAttribute()+'" /></span></span><span class="itemTa"><span class="itemTan"><span class="itemName"></span></span></span><span class="itemTac">{0}</span></span>',P='<span class="itemTd"><span class="itemTdc"><span class="itemTdio"><span class="itemTdi"></span></span><span class="itemTdt"><span class="itemTdn"><span class="itemName"></span></span><span class="itemTdm"></span></span></span></span>',L='<span class="itemTo"><span class="itemTvo"></span></span><span class="itemTos"><img class="itemTnv" src="{0}" alt="{1}" title="" /></span>',K='<span class="itemTnp"></span>';
        e.ItemTile=A;
        function A(tb,pb,X){
            var sb=this;
            X=X||{};
            var T=a('<span class="itemT"></span>'),t,Eb,eb,kb,ub,ib,nb,xb,mb,lb,gb=0,fb=0,rb=false,zb,yb,vb,qb,wb,jb,ob,hb;
            d(T,"$Sutra.SkyDrive.ItemTile");
            tb.append(T);
            if($B.Full)T.bind(H,function(a){
                if(X.sm&&!a.shiftKey){
                    Ib(a);
                    return false
                }
                
            });
            sb.render=function(b,d,e){
                var a=p(t,b,true)&&Eb===b.getVersion();
                X=e||X;
                if(a)sb.resize();
                if(!a||zb!=d){
                    zb=d;
                    if(a){
                        if(kb&&!zb)if(!xb){
                            if(!ob){
                                ob=setTimeout(Lb,D);
                                if(hb){
                                    clearTimeout(hb);
                                    hb=null
                                }
                                
                            }
                            kb.bind(h,Cb);
                            c.loadImage(ib,kb[0])
                        }
                        
                    }
                    else{
                        xb=false;
                        t=b;
                        Eb=t.getVersion();
                        gb=0;
                        fb=0;
                        mb=0;
                        lb=0;
                        Hb();
                        wb=null;
                        jb=null;
                        T.empty();
                        T.removeClass(i);
                        Fb();
                        Pb();
                        vb=false;
                        if(ib)if(t.video)Xb();
                        else if(t.photo||t.audio)Wb();
                        else Vb();
                        else{
                            if(!X.df&&t.folder)Tb();
                            else if(t.photo||t.video||t.isProcessingVideo)Ob();
                            else Qb();
                            xb=true
                        }
                        Bb()
                    }
                    
                }
                
            };
            sb.isLoaded=function(){
                return xb
            };
            function Xb(){
                var b=X.dv?v:Y,c=b.format(t.name.encodeHtmlAttribute());
                T.html(c);
                eb=a(q,T);
                eb.bind(o,Db);
                Kb()
            }
            function Kb(){
                if(c.isComplete(ib)){
                    eb.attr(k,ib);
                    T.addClass(i);
                    xb=true
                }
                else{
                    if(c.isComplete(nb)){
                        eb.attr(k,nb);
                        T.addClass(i)
                    }
                    else{
                        eb.bind(h,Nb);
                        c.loadImage(nb,eb[0])
                    }
                    if(nb!=ib){
                        kb=a("<img />").attr(db,"").attr(J,eb.attr(J)).css(z,0).css(ab,1);
                        kb.insertBefore(eb);
                        if(!zb){
                            if(!ob){
                                ob=setTimeout(Lb,D);
                                if(hb){
                                    clearTimeout(hb);
                                    hb=null
                                }
                                
                            }
                            kb.bind(h,Cb);
                            c.loadImage(ib,kb[0])
                        }
                        
                    }
                    
                }
                
            }
            function Wb(){
                var b=v.format(t.name.encodeHtmlAttribute());
                T.html(b);
                eb=a(q,T);
                eb.bind(o,Db);
                Kb()
            }
            function Db(){
                eb.css(w,M)
            }
            function Vb(){
                var d=W.format("",t.getChildren().getCount());
                T.html(d);
                Ab();
                var b=a(m+l,T);
                a(b[0]).css(z,1);
                a(b[1]).css(z,0);
                eb=a(q,a(b[0]));
                eb.bind(o,Db);
                eb.bind(h,Nb);
                c.loadImage(ib,eb[0])
            }
            function Ob(){
                var a;
                if(t.photo)a=K;
                else{
                    var b=FilesConfig.foldersImgBaseUrl+"/videoNoThumbnail.png";
                    a=L.format(b.encodeHtmlAttribute(),t.name.encodeHtmlAttribute())
                }
                T.html(a)
            }
            function Qb(){
                T.html(P);
                if(t.did)a(".itemTdm",T).append(b.SkyDriveItemHelper.getFriendlyFileType(t).encodeHtml());
                else a(".itemTdm",T).append(b.DateFactory.getDate(t.modifiedDate,t.displayModifiedDate));
                Ab()
            }
            function Tb(){
                T.html(U.format(t.did?g:t.getChildren().getCount()));
                Ab()
            }
            function Ab(){
                var b=a(".itemName",T);
                if(X.de||!e.EditableText)b.text(t.name);
                else{
                    if(qb){
                        b.replaceWith(qb.getContainer());
                        qb.bindAll()
                    }
                    else qb=new e.EditableText(b,pb,a.extend({},e.EditableText.RenameOptions,{
                        de:true,ec:"itemNameEdit",hc:true
                    }));
                    if(!qb.isEditing())qb.render(t)
                }
                
            }
            function Fb(){
                var c=false,b,a;
                if(X.w>0)b=X.w;
                else b=tb.width();
                if(X.h>0)a=X.h;
                else a=tb.height();
                if(b!=mb||a!=lb){
                    mb=b;
                    lb=a;
                    c=true
                }
                return c
            }
            sb.resize=function(){
                if(Fb()){
                    Bb();
                    Gb()
                }
                
            };
            function Gb(){
                if(jb){
                    jb.width(mb);
                    jb.css("top",(lb-20)/2+"px");
                    wb.update()
                }
                
            }
            function Bb(){
                T.width(mb);
                T.height(lb);
                if(eb){
                    Jb(mb,lb);
                    Yb(mb,lb)
                }
                else if(t.video||t.isProcessingVideo)Jb(mb,lb);
                else if((X.df||!t.folder)&&!t.photo)Rb(mb,lb)
            }
            function Rb(k,d){
                var g=T.find(".itemTd"),i=T.find(".itemTdc"),h=T.find(".itemTdi"),e=T.find(".itemTdt"),c=u;
                if(d==V||d==j)c=j;
                if(d==c)g.removeClass("itemTdb");
                else g.addClass("itemTdb");
                var f=d==u||d==j;
                h.empty().height(c).width(c).css(B,f?0:s).css("margin-top",-c/2).append(a(b.SkyDriveItemHelper.getIcon(t,c)));
                e.css(B,s*2+c).css(cb,s);
                if(f)e.hide();
                else e.show()
            }
            function Jb(g,d){
                var c=a(".itemTo",T);
                if(c[0]){
                    var f=a(a(".itemTos",T)[vb?1:0]);
                    f.width(g);
                    f.height(d);
                    c.width(g);
                    c.height(d);
                    if(d<j||rb&&X.dt)c.hide();
                    else{
                        c.show();
                        if(!rb){
                            var i=c.find(".itemTvo"),e=u;
                            if(d<R)e=j;
                            var h=(!t.video&&t.isProcessingVideo?"processingVideo_":"video_")+e;
                            i.empty().width(e).append(a(b.ImageStrip.getImage(h))).css(y,(d-e)/2)
                        }
                        
                    }
                    
                }
                
            }
            function Yb(d,c){
                var b,a;
                if(gb==0||fb==0){
                    b=0;
                    a=0
                }
                else if(rb||X.as)if(d==0||c==0){
                    b=0;
                    a=0
                }
                else if(gb/fb<d/c){
                    b=d;
                    a=fb/gb*d
                }
                else{
                    a=c;
                    b=gb/fb*c
                }
                else if(X.iw&&X.ih){
                    a=fb;
                    b=gb
                }
                else if(X.iw)if(fb<c){
                    a=fb;
                    b=gb
                }
                else{
                    a=c;
                    b=gb/fb*c
                }
                else if(X.ih)if(fb<d){
                    a=fb;
                    b=gb
                }
                else{
                    b=d;
                    a=fb/gb*d
                }
                else if(d==0||c==0){
                    b=0;
                    a=0
                }
                else if(gb<d&&fb<c){
                    a=fb;
                    b=gb
                }
                else if(gb/fb>d/c){
                    b=d;
                    a=fb/gb*d
                }
                else{
                    a=c;
                    b=gb/fb*c
                }
                b=Math.ceil(b);
                a=Math.ceil(a);
                var e=eb.parent();
                e.width(b).height(a);
                if($B.IE&&$B.V<9)eb.width(b).height(a);
                e.css(Z,Math.floor((d-b)/2));
                if(rb)e.css(y,Math.floor((c-a)/4));
                else e.css(y,Math.floor((c-a)/2))
            }
            sb.dispose=function(){
                Hb();
                T.unbind();
                qb&&qb.dispose()
            };
            function Hb(){
                a(m+l,tb).stop(true,true);
                if(ub){
                    ub.unbind();
                    ub=null
                }
                if(kb){
                    kb.stop(true);
                    kb.unbind(h,Cb);
                    kb=null
                }
                if(eb){
                    eb.unbind();
                    eb=null
                }
                clearTimeout(ob);
                ob=null;
                clearTimeout(hb);
                hb=null
            }
            function Pb(){
                ib=nb=null;
                rb=false;
                var c,a,d,g=mb,e=lb;
                if(t){
                    if(t.thumbnailSet&&(!t.audio||X.ap)){
                        c=t.thumbnailSet;
                        if(e>r)a=b.SkyDriveItemHelper.pickThumbnail(c,g,e);
                        else a=b.SkyDriveItemHelper.getThumbnail(t.thumbnailSet,C);
                        d=t.photo||t.video||a;
                        if(e>r){
                            var f=b.SkyDriveItemHelper.getThumbnail(t.thumbnailSet,C);
                            if(f.width!=a.width||f.height!=a.height)nb=c.baseUrl+f.url
                        }
                        
                    }
                    else if(Q(t)){
                        var h=t.folder.covers,j=0,i=h.length;
                        if(i>0){
                            yb=0;
                            c=h[yb];
                            a=b.SkyDriveItemHelper.pickThumbnail(c,g,e);
                            d=a;
                            rb=true
                        }
                        
                    }
                    if(a){
                        gb=d.width;
                        fb=d.height;
                        ib=c.baseUrl+a.url;
                        if(!nb)nb=ib
                    }
                    
                }
                
            }
            sb.canPulse=function(){
                return rb&&t.folder.covers.length>1
            };
            sb.pulse=function(m){
                var e=false;
                if(rb&&c.isIdle()){
                    var g=t.folder.covers.length;
                    if(g>1){
                        yb=(yb+1)%g;
                        var j=mb,i=lb,f=t.folder.covers[yb],d=b.SkyDriveItemHelper.pickThumbnail(f,j,i);
                        e=true;
                        var l=f.baseUrl+d.url;
                        if(!ub)ub=a("<img/>").bind(h+" "+o+" "+bb,Sb);
                        ub.data(F,d.height).data(G,d.width).data(E,m);
                        ub.attr(k,l)
                    }
                    
                }
                return e
            };
            function Sb(f){
                var e=this,b=a(e);
                tb.trigger(A.pulseEventName,b.data(E));
                if(f.type==h){
                    var d=a(a(m+l,tb)[vb?1:0]);
                    d.animate({
                        opacity:N
                    }
                    ,O,I);
                    vb=!vb;
                    var c=a(a(m+l,tb)[vb?1:0]);
                    eb=a(q,c);
                    gb=b.data(G);
                    fb=b.data(F);
                    ib=b.attr(k);
                    nb=ib;
                    eb.attr(k,ib);
                    T.addClass(i);
                    Bb();
                    c.animate({
                        opacity:1
                    }
                    ,c_pulseFadeInSpeed,I)
                }
                
            }
            function Nb(){
                var a=this;
                T.addClass(i);
                if(nb==ib)Mb()
            }
            sb.showContextMenu=Ib;
            function Ib(b){
                var c=X.sp&&(X.sp==1||X.sp==2&&pb.infoPaneClosed),a=[];
                if(!qb)a=a.concat(x.filters.RN);
                if(x.hideViewItem(pb,t))a=a.concat(x.filters.VI);
                var d={
                    pos:{
                        x:b.pageX,y:b.pageY
                    }
                    ,sp:c,ev:b,bici:"CM",fil:a
                };
                pb.contextMenu.render(t,null,d)
            }
            function Mb(){
                xb=true;
                if($BSI.isLoading())a(pb).trigger("perfLoad");
                if(wb){
                    jb.remove();
                    jb=null;
                    wb=null;
                    if(!hb&&n(pb.viewParams.id,t.id)&&t.photo)pb.errorManager.clear()
                }
                clearTimeout(ob);
                ob=null;
                clearTimeout(hb);
                hb=null
            }
            function Cb(){
                var a=this;
                kb.animate({
                    opacity:1
                }
                ,c_pulseFadeInSpeed);
                Mb()
            }
            function Lb(){
                clearTimeout(ob);
                ob=null;
                if(!jb){
                    jb=a("<div></div>");
                    T.prepend(jb);
                    jb.css("position","absolute");
                    jb.css("z-index","10000");
                    wb=new e.LoadingCue(jb)
                }
                Gb();
                wb.setVisibility(true);
                hb=setTimeout(Ub,S)
            }
            function Ub(){
                clearTimeout(hb);
                hb=null;
                if(pb&&n(pb.viewParams.id,t.id)&&t.photo)pb.errorManager.add({
                    $element:a("<span>"+f("image.loaderror").encodeHtml()+"</span>"),priority:2,type:0
                })
            }
            
        }
        A.pulseEventName="pulse"
    })();
    (function(){
        var f="quickView_event";
        e.QuickView=d;
        var k='<div class="quickview_header t_hovlt"><a class="quickview_header_anchor" href="#"></a></div>',i='<div class="quickview_header quickview_header_indented"></div>',j='<span class="quickview_header_anchor_container"><span class="quickview_chevron"><span class="quickview_chevron_open"></span><span class="quickview_chevron_closed"></span></span></span>',l='<span class="quickview_header_text"></span>',h='<div class="quickview_element_indented"></div>',m='<div class="quickview_element"></div>',p=c("expandicontooltip"),o=c("collapseicontooltip"),g=d.EventNames={
            Collapse:"collapse",Expand:"expand",Show:"show",Hide:"hide"
        };
        function d(D,s){
            var r=this,c;
            r.render=function(B){
                var q;
                if(c)for(var G=0;
                G<c.entries.length;
                G++){
                    q=c.entries[G];
                    q._internal.disposing=true
                }
                var n,I=false;
                for(var F=0;
                F<B.entries.length;
                F++){
                    n=B.entries[F];
                    if(!c)q=null;
                    else{
                        q=y(c.entries,n.id);
                        if(q)q._internal.disposing=false
                    }
                    var g={};
                    g.disposing=false;
                    t(n,q);
                    if(n.collapsible)I=true;
                    g.$quickView=a('<div class="quickview"></div>');
                    var L;
                    if(n.action||n.collapsible){
                        g.$headerHitTarget=a(k);
                        g.$headerAnchor=g.$hover=a(".quickview_header_anchor",g.$headerHitTarget);
                        if(n.action){
                            g.$headerContainer=g.$headerAnchor.addClass("quickview_header_indented");
                            s.actionManager.setATagAction(n.action,g.$headerAnchor)
                        }
                        else{
                            g.$headerAnchor.append(j).addClass("quickview_header_anchor_withchevron");
                            g.$chevronClosed=a(".quickview_chevron_closed",g.$headerHitTarget).append(b.ImageStrip.getImage("closedUp",p));
                            g.$chevronOpen=a(".quickview_chevron_open",g.$headerHitTarget).append(b.ImageStrip.getImage("openUp",o));
                            g.$headerContainer=a(".quickview_header_anchor_container",g.$headerHitTarget);
                            (n.expanded?g.$chevronClosed:g.$chevronOpen).hide()
                        }
                        if(n.bici)g.$headerAnchor.click(function(){
                            var a=e(this).bici;
                            $BSI.reportEvent(a.name,a.dataPoints)
                        })
                    }
                    else{
                        g.$headerHitTarget=a(i);
                        g.$hover=g.$headerContainer=g.$headerHitTarget
                    }
                    g.$headerHitTarget.bind("click",C);
                    if(q&&q._internal.$header){
                        q._internal.$header.appendTo(g.$headerContainer);
                        g.$hover=g.$header=q._internal.$header;
                        q._internal.$header=null
                    }
                    else g.$hover=g.$header=a(l).appendTo(g.$headerContainer);
                    g.$headerHitTarget.bind("dragstart",function(a){
                        a.preventDefault()
                    }).bind("selectstart",function(a){
                        a.preventDefault()
                    }).appendTo(g.$quickView);
                    if((n.collapsible||n.action)&&n.hoverable)g.$hover.addClass("t_hovlt");
                    g.$elementContainer=a(h);
                    if(q){
                        g.$element=q._internal.$element;
                        g.$element.detach()
                    }
                    else g.$element=a(m).bind(d.EventNames.Expand,w).bind(d.EventNames.Collapse,u).bind(d.EventNames.Show,A).bind(d.EventNames.Hide,z).bind("select",x).bind("unselect",v);
                    g.$elementContainer.append(g.$element);
                    g.$quickView.append(g.$elementContainer);
                    g.$element.toggle(n.expanded);
                    g.$quickView.toggle(!n.hidden);
                    if(n.selected)g.$hover.addClass("t_sel");
                    else g.$hover.removeClass("t_sel");
                    var K={
                        item:B,index:F
                    };
                    g.$quickView.data(f,K);
                    var J=n.control;
                    if(q)g.$control=q._internal.$control;
                    else{
                        n._internal=g;
                        g.$control=new J(g.$element,s,{
                            $header:g.$header,$headerA:g.$headerAnchor,options:n.cstrOptions
                        })
                    }
                    D.append(g.$quickView);
                    q&&q._internal.$quickView.remove();
                    n._internal=g;
                    g.$control.render(n.data)
                }
                if(!I)for(var H=0;
                H<B.entries.length;
                H++){
                    n=B.entries[H];
                    var E=n._internal;
                    E.$headerAnchor&&E.$headerAnchor.removeClass("quickview_header_indented");
                    E.$headerHitTarget.removeClass("quickview_header_indented");
                    E.$elementContainer.removeClass("quickview_element_indented")
                }
                r.disposeCore(true);
                c=B
            };
            r.disposeCore=function(b){
                if(c){
                    var a=[];
                    (function(){
                        for(var e=0;
                        e<c.entries.length;
                        e++){
                            var d=c.entries[e];
                            if(!b||d._internal.disposing){
                                d._internal.$quickView.remove();
                                d._internal.$control.dispose()
                            }
                            else a[a.length]=d
                        }
                        
                    })();
                    c={
                        entries:a
                    }
                    
                }
                
            };
            r.dispose=function(){
                r.disposeCore(false)
            };
            function y(b,d){
                for(var a=0;
                a<b.length;
                a++){
                    var c=b[a];
                    if(n(c.id,d))return c
                }
                return null
            }
            function t(a,b){
                if(typeof a.url!="undefined"&&a.url!=null)a.collapsible=false;
                if(q(a.collapsible))if(b)a.collapsible=b.collapsible;
                else a.collapsible=true;
                else if(a.collapsible==false)a.expanded=true;
                if(q(a.expanded))if(b)a.expanded=b.expanded;
                else a.expanded=true;
                if(q(a.selected))if(b)a.selected=b.selected;
                else a.selected=false;
                if(q(a.hidden))if(b)a.hidden=b.hidden;
                else a.hidden=false;
                if(q(a.hoverable))if(b)a.hoverable=b.hoverable;
                else a.hoverable=true
            }
            function q(a){
                return typeof a=="undefined"||a==null
            }
            function e(c){
                var b=a(c).parents(".quickview").data(f);
                return b.item.entries[b.index]
            }
            function w(){
                var b=e(this),a=b._internal;
                b.expanded=true;
                a.$element.show();
                a.$chevronOpen.show();
                a.$chevronClosed.hide()
            }
            function u(){
                var b=e(this),a=b._internal;
                b.expanded=false;
                a.$element.hide();
                a.$chevronOpen.hide();
                a.$chevronClosed.show()
            }
            function A(){
                var a=e(this);
                a._internal.$quickView.show();
                a.hidden=false
            }
            function z(){
                var a=e(this);
                a._internal.$quickView.hide();
                a.hidden=true
            }
            function x(e){
                if(!B(a(e.target))){
                    var b=a(this).parents(".quickview").data(f),d=b.item.entries[b.index];
                    for(var c=0;
                    c<b.item.entries.length;
                    c++)b.item.entries[c]._internal.$hover.removeClass("t_sel");
                    d._internal.$hover.addClass("t_sel");
                    d.selected=true
                }
                
            }
            function v(){
                var a=e(this);
                a._internal.$hover.removeClass("t_sel");
                a.selected=false
            }
            function C(b){
                var a=e(this);
                if(a.collapsible||a.action){
                    if(!a.action)if(!a.expanded)a._internal.$element.trigger(g.Expand);
                    else a._internal.$element.trigger(g.Collapse);
                    if(a.action)a._internal.$element.trigger("select");
                    if(!a.action)b.preventDefault()
                }
                
            }
            
        }
        
    })();
    (function(){
        var B=9001,f="et_",Q=f+"main",R=f+"text",l=f+"textContainer",i=f+"empty",v=f+"inactive",u=f+"editable",P=f+"edit",w=f+"editing",G=f+"controls",M=f+"outline",H=f+"growable",F=f+"centered",D=f+"hinput",y=f+"input",L=f+"textarea",z=f+"save",x=f+"cancel",o=f+"processing",E=0,T=function(){
            return f+E++
        }
        ,C=a(["<div>",":","*","?","\\","/",";",'"',"<",">","|","&#xff0f;","&#xff1b;","&#xff0a;","</div>"].join("")).text();
        e.EditableText=k;
        k.RenameOptions={
            n:"name",gdt:function(a,b){
                return b.getDisplayName(a)
            }
            ,g:false,gem:function(g,a){
                var b;
                if(!a)b=c("NameRequiredError");
                else if(a.startsWith(".")||!g.extension&&a.endsWith("."))b=c("CantStartOrEndWithDotError");
                else{
                    var d;
                    for(var e=0;
                    e<a.length;
                    e++){
                        var f=a.charAt(e);
                        if(C.indexOf(f)!==-1){
                            d=f;
                            break
                        }
                        
                    }
                    if(d)b=c("InvalidTextFormatError").format(d)
                }
                return b
            }
            ,"get":function(a){
                return a._isNewFolder?c("NewFolderErrorTitle"):c("RenameErrorTitleFormat").format(a.name)
            }
            ,aa:"Rename",ea:"Rename"
        };
        k.CaptionOptions={
            n:"caption",aa:"ModifyCaption","get":function(a){
                return a.photo?c("CaptionErrorTitle"):c("DescriptionErrorTitle")
            }
            ,ml:255,v:function(a){
                return a.photo?c("AddCaption"):c("AddDescription")
            }
            
        };
        function k(cb,ab,C){
            var X=this,rb=ab.dataModel,Yb=ab.$rootElement,Zb=a(ab),f,Mb,Cb,wb,V,pb,Ib=C.n,Wb=C.gdt,Jb=C.ca,Pb=C.ac,Rb=C.ic,Tb=C.ec,sc=C.aa,zb=C.ea,ic=C.g,ob=C.c,hc=C.ml,yb=C.de,Ub=C.gem,Xb=C.get,dc=C.tt,ec=false,jc=T(),qb=h+jc,tb,U=j,Lb=j,Ob=" "+L+(Rb?" "+Rb:""),lc=hc?' maxlength="'+hc+'"':g,mc='<textarea class="'+D+Ob+'" disabled="disabled" + textareaAdditionalAttributes></textarea>',oc='<div class="'+G+'">'+'<a href="#" class="'+z+'">'+c("SaveCommand")+'</a> <a href="#" class="'+x+'">'+c("CancelCommand")+"</a>"+"</div>";
            cb.html('<span class="'+l+'"></span>');
            cb.addClass(Q).addClass(ic?H:g);
            var ib=a(h+l,cb),k,ub,fb,jb,lb,gb,E,hb=a('<div id="'+jc+'" class="'+P+(yb?" "+M:"")+(Tb?" "+Tb:g)+'">'+'<textarea class="'+y+Ob+'"'+lc+"></textarea>"+"</div>"),mb;
            d(cb,"$Sutra.SkyDrive.EditableText");
            a(rb).bind(b.DataModel.dataChangedEvent+qb,function(b,a){
                if(f&&f.key===a.key)X.render(a)
            });
            function ac(b,a){
                if(f&&f.key===a)Sb()
            }
            if(zb)Zb.bind(zb,ac);
            if(ob)vb(F);
            function Hb(){
                if(U&&!V){
                    wb=Cb;
                    lb.click()
                }
                
            }
            function nc(f){
                var d=f.target,b=d.className,e=b&&h+b.split(" ")[0],c=a(s)[0];
                if(!(b&&a(e,cb.add(hb)).length)&&!(c&&a.contains(c,d)))Hb()
            }
            function Kb(){
                var a;
                if(ob)a=k.height();
                else a=ib.height();
                gc(true);
                Fb("height",a);
                setTimeout(function(){
                    X.resize(function(){
                        E.focus().select()
                    })
                }
                ,0)
            }
            function Bb(a){
                var b=Wb&&Wb(ab,a);
                return b||Gb(a)
            }
            function Gb(a){
                return a[Ib]
            }
            function xb(c){
                var h=Jb||tb&&!yb;
                if(!k||h!==(k[0].nodeName==="A")){
                    k&&k.remove();
                    var j=h?O:Y;
                    k=a("<"+j+' class="'+R+(Pb?" "+Pb:"")+'"><span></span></'+j+">");
                    kb(k,r,Vb);
                    ub=a("span",k);
                    d(ub,"$Sutra.SkyDrive.EditableTextCurrentText");
                    ib.append(k)
                }
                c=c&&c.trim();
                if(c)k.removeClass(i);
                else if(tb){
                    k.addClass(i);
                    if(C.v)c=C.v(f)
                }
                c=c||g;
                ub.text(c).attr(N,dc?dc(f):c);
                var e;
                if(Jb)e=ab.actionManager.getAction(Jb,f);
                if(e){
                    b.ActionManager.setATagAction(e,k);
                    k.removeClass(v)
                }
                else{
                    if(k[0].nodeName==="A")k.attr("href",eb).bind(r,function(a){
                        a.preventDefault()
                    });
                    k.addClass(v)
                }
                
            }
            function Eb(){
                Cb=j
            }
            function Sb(){
                if(tb&&!U){
                    Kb();
                    E.val(Gb(f))
                }
                
            }
            function kc(b){
                Eb();
                if(wb){
                    var a=function(){
                        gb.click()
                    };
                    if($B.Firefox)setTimeout(a,0);
                    else a();
                    wb=j
                }
                else{
                    V=new $UI.Popover;
                    V.header=Xb?Xb(f):c("UpdateItemErrorTitle");
                    V.body=b;
                    V.modal=true;
                    V.bodyPadding=true;
                    V.showFooter=true;
                    V.addButton("ok",c("Close"),true,j);
                    V.width=400;
                    V.show(function(){
                        Kb();
                        V=null;
                        return true
                    });
                    Cb=true
                }
                
            }
            function Vb(){
                if(!yb){
                    Sb();
                    return j
                }
                
            }
            function pc(b){
                if(U){
                    var a,c=b.which;
                    if(c===I)a=gb;
                    else if(c===Z)a=lb;
                    if(a){
                        a.click();
                        b.preventDefault()
                    }
                    else if(ic)fb.text(E.val()+String.fromCharCode(c));
                    var e=fb[0].scrollHeight,d=fb[0].scrollHeight;
                    if(E.innerHeight()<d)Fb("height",d);
                    S(b)
                }
                
            }
            function Db(a){
                if(a){
                    mb&&mb.hide();
                    Ab(o)
                }
                
            }
            function rc(){
                var b=E.val();
                b=b.trim();
                var d=f._isNewFolder;
                if(d){
                    if(!mb){
                        mb=a('<img src="'+FilesConfig.progressLoadingGif+'" />');
                        ib.prepend(mb)
                    }
                    else mb.show();
                    vb(o)
                }
                var l=Ub&&Ub(f,b);
                if(l){
                    Db(d);
                    kc(l)
                }
                else{
                    var g=Gb(f);
                    if(b!==(k.hasClass(i)?"":g)||f._isNewFolder){
                        xb(b);
                        sb(false);
                        nb(t);
                        f.updateItemProperty(Ib,b,m,h)
                    }
                    else gb.click()
                }
                function m(){
                    if(d){
                        ab.pendingFolderToCreate=false;
                        f.invalidate();
                        Db(d);
                        if(ab.selectionManager.getSelection().selectionCount===0){
                            var a=f.getParent();
                            if(a){
                                var b=a.getChildren().indexOf(f,true);
                                if(b>-1)ab.selectionManager.clickSelect(a,b)
                            }
                            
                        }
                        
                    }
                    nb(j);
                    wb=j
                }
                function h(i,k){
                    if(n(f.id,k.id))if(i&&i.error&&i.error.code===B)$Do.when("Bucket3.js",0,function(){
                        if(n(f.id,k.id)){
                            var c=i.error.data,d=c&&a.parseJSON(c);
                            pb=new e.SoftBlock(W.RenameAction,ab.callerCid,f,d);
                            pb.show(function(){
                                nb(t);
                                rb.updateItemProperty(f,Ib,b,function(){
                                    nb(j)
                                }
                                ,h,true)
                            }
                            ,function(){
                                xb(g);
                                sb(true)
                            })
                        }
                        
                    });
                    else{
                        E.val(b);
                        xb(g);
                        Db(d);
                        Kb();
                        kc(i.error.message||c("UpdateItemError"))
                    }
                    nb(j)
                }
                return j
            }
            function qc(){
                sb(true);
                return j
            }
            function bc(){
                if(C.hc)kb(E,db,Hb);
                else kb(q,K,nc);
                kb(lb,r,rc);
                kb(gb,r,qc);
                kb(E,J,pc)
            }
            function cc(){
                E&&E.unbind();
                gb&&gb.unbind();
                lb&&lb.unbind();
                q.unbind(K,Hb)
            }
            X.bindAll=function(){
                kb(k,r,Vb);
                if(U)bc()
            };
            X.isEditing=function(){
                return U
            };
            X.getContainer=function(){
                return cb
            };
            X.focus=function(){
                if(U)E.focus();
                else k.focus()
            };
            X.render=function(a){
                if((!p(f,a)||Mb!==Bb(a))&&!(U&&f.key===a.key)){
                    sb(true);
                    f=a;
                    Mb=Bb(f);
                    tb=!!ab.actionManager.getAction(sc,f);
                    if(!yb&&tb)vb(u);
                    else Ab(u);
                    var b=Bb(f);
                    xb(b)
                }
                if(ob)X.resize()
            };
            X.resize=function(b){
                var a;
                if(ob)a=cb.width()-2;
                else a=ib.width()-2;
                if(ob&&!U){
                    if(ub){
                        ib.width("auto");
                        ib.width(Math.min(ub.width()+21,a))
                    }
                    
                }
                else Fb("width",a);
                setTimeout(function(){
                    Qb();
                    b&&b()
                }
                ,0)
            };
            X.dispose=function(){
                if(!ec){
                    ec=true;
                    sb(true);
                    Eb();
                    a(rb).unbind(qb);
                    if(zb)Zb.unbind(zb,ac);
                    m.unbind(qb);
                    k&&k.unbind();
                    cc()
                }
                if(V){
                    V.dispose();
                    V=null
                }
                if(pb){
                    pb.dispose();
                    pb=null
                }
                
            };
            function Qb(){
                if(U){
                    var d=ob?cb:ib,a=d.offset(),b=a.left;
                    if(a.top&&b){
                        var c=$B.rtl?3:0;
                        a.left=b-Yb.offset().left-c;
                        hb.css(a);
                        hb.show()
                    }
                    
                }
                
            }
            m.bind(A+qb,function(){
                X.resize()
            });
            m.bind(bb+qb,Qb);
            function sb(b){
                if(U&&b&&f&&f._isNewFolder){
                    fc();
                    ab.pendingFolderToCreate=false;
                    var a=f.getParent();
                    if(a){
                        a.removePinnedSubfolder(f);
                        a.invalidate()
                    }
                    
                }
                else fc()
            }
            function gc(b){
                if(U!=b){
                    U=b;
                    if(U){
                        fb=a(mc);
                        jb=a(oc);
                        lb=a(h+z,jb);
                        gb=a(h+x,jb);
                        E=a(h+y,hb);
                        cb.append(fb).append(jb);
                        vb(w);
                        d(E,"$Sutra.SkyDrive.EditableTextInput");
                        d(lb,"$Sutra.SkyDrive.EditableTextSave");
                        d(gb,"$Sutra.SkyDrive.EditableTextCancel");
                        hb.hide().appendTo(Yb);
                        if(C.hc)jb.hide();
                        bc()
                    }
                    else{
                        cc();
                        hb.remove();
                        unsutra(E);
                        Ab(w);
                        jb&&jb.remove();
                        fb&&fb.remove()
                    }
                    Nb()
                }
                
            }
            function nb(a){
                if(Lb!=a){
                    Lb=a;
                    Nb()
                }
                
            }
            function fc(){
                Eb();
                gc(j);
                nb(j)
            }
            function Nb(){
                if(Lb||U)rb.suspendChangeEvents();
                else rb.resumeChangeEvents()
            }
            function vb(a){
                cb.addClass(a);
                hb.addClass(a)
            }
            function Ab(a){
                cb.removeClass(a);
                hb.removeClass(a)
            }
            function Fb(b,a){
                if(a){
                    E&&E[b](a);
                    var c=$B.IE?a-1:a;
                    fb&&fb[b](c)
                }
                
            }
            function kb(b,a,c){
                b&&b.unbind(a,c).bind(a,c)
            }
            X.bindAll()
        }
        
    })();
    (function(){
        var l=b.SkyDriveItemHelper,n="position",E="relative",G="fixed",M="left",N="top",L="bottom",r="auto",F="scroll",K="padding-top",H=200,g=20,u="ip_pl",z="infopane",p="ip_col",w="ip_to",v="ip_tc",D="ip_toggle",B="ip_content",C="ip_header",A="ip_caption",y="ip_commands",s="ip_multiselect",x="ip_quickview",i=".infopane",J='<div class="'+u+'"></div>'+'<div class="'+z+'">'+'<a class="'+D+'" href="#">'+'<span class="'+w+'"></span>'+'<span class="'+v+'"></span>'+"</a>"+'<div class="'+B+'" tabindex="-1">'+'<div class="'+C+'"></div>'+'<div class="c_clr">'+'<div class="ip_scrollp">'+'<div class="'+A+'"></div>'+'<div class="'+y+'"></div>'+'<div class="'+s+'"></div>'+'<div class="'+x+'"></div>'+"</div>"+"</div>"+"</div>"+"</div>",I=a.extend({},e.EditableText.CaptionOptions,{
            ec:"infoPaneCaptionEdit",g:true
        });
        e.InfoPane=f;
        function f(O,P,Q){
            var X=this,W,ab,S,vb,ob,Cb,ub=P.selectionManager,Db=P.dataModel,gb,db,Ab,V=0,Mb,Y,sb,yb,wb,lb,T;
            function kb(){
                return W===S
            }
            Q=Q||{};
            var Kb=a.extend({
                tm:false,at:false
            }
            ,Q.to),Jb=a.extend({
                fs:kb,hr:kb,hvi:function(a){
                    return b.CommandManager.hideViewItem(P,a)
                }
                
            }
            ,Q.c);
            O.html(J);
            var fb=a(h+u,O);
            if(Q.fh)fb.hide();
            else fb.height(0);
            var R=a(h+z,O),qb=a(h+D,O).bind("click",Fb);
            X.toggle=Fb;
            function Fb(){
                var c=P.infoPaneClosed,b;
                if(c){
                    R.removeClass(p);
                    b="IPE"
                }
                else{
                    R.addClass(p);
                    a(P).trigger("disableTagging");
                    b="IPC"
                }
                $BSI.reportEvent(o,{
                    SkyCmnd:b,ClickLoc:P.infoPaneBiciLoc
                });
                mb();
                P.infoPaneClosed=!c;
                O.trigger(f.EventNames.resize);
                if(!P.infoPaneClosed&&!ob)bb(S,vb);
                return false
            }
            var cb=a(h+A,O),hb=a(h+y,O),Eb=a(h+B,O),jb=a(h+C,O),eb=a(h+s,O),U=true,Bb=c("ExpandIconTooltip");
            a(h+w,O).append(a(b.ImageStrip.getImage(Q.lp?"lightPanelOpen":"darkPanelOpen",Bb,Bb)));
            var xb=c("CollapseIconTooltip");
            a(h+v,O).append(a(b.ImageStrip.getImage("panelClose",xb,xb)));
            if(P.infoPaneClosed)R.addClass(p);
            d(qb,"$Sutra.SkyDrive.InfoPaneChevrons");
            d(jb,"$Sutra.SkyDrive.InfoPaneHeader");
            d(O,"$Sutra.SkyDrive.InfoPane");
            var nb=new e.QuickView(a(h+x,O),P);
            m.bind(F,pb);
            var ib=[new e.InfoPaneCommands(hb,P,Jb),new e.InfoPaneHeader(jb,P,Q.h)],Hb=new e.InfoPaneMultiselect(eb,P),Z;
            if(!Q.fh)Z=new e.EditableText(cb,P,I);
            a(Db).bind(b.DataModel.dataChangedEvent+i,Lb);
            a(ub).bind(b.SelectionManager.SelectionChangedEvent+i,Ib);
            X.render=function(a){
                if(!(W&&S&&W.key===a.key&&W.key!==S.key)&&!ab){
                    W=a;
                    bb(a,Q.bici)
                }
                
            };
            X.resize=function(){
                if(Q.fh)Eb.height(O.height());
                else{
                    gb=m.height();
                    db=O.offset().top;
                    var b=a("#m_wf");
                    Ab=b.height()+parseInt(b.css(K));
                    mb();
                    pb()
                }
                
            };
            X.dispose=function(){
                m.unbind(F,pb);
                clearTimeout(Y);
                Y=null;
                qb.unbind();
                for(var c=0;
                c<ib.length;
                c++)ib[c].dispose();
                if(Z)Z.dispose();
                nb.dispose();
                P.infoPaneBiciLoc="";
                a(Db).unbind(i);
                a(ub).unbind(b.SelectionManager.SelectionChangedEvent+i);
                Cb=t
            };
            function bb(b,h){
                S=b;
                vb=h;
                ob=j;
                if(P.infoPaneClosed)return;
                P.infoPaneBiciLoc=h||P.infoPaneBiciLoc;
                var g=l.isGroupRoot(b),c=false;
                jb.show();
                hb.show();
                eb.hide();
                if(l.isRootItem(b)&&!g||b.isPlaceholder||b._isLoadingItem){
                    if(U){
                        U=false;
                        O.hide();
                        c=true
                    }
                    
                }
                else{
                    if(!U){
                        U=true;
                        O.show();
                        c=true
                    }
                    if(g){
                        cb.hide();
                        P.infoPaneBiciLoc="IPR"
                    }
                    else{
                        if(Z)Z.render(b);
                        cb.show()
                    }
                    for(var d=0;
                    d<ib.length;
                    d++)ib[d].render(b);
                    unsutra(a("ul",eb));
                    $Do.when("Bucket3.js",0,function(){
                        if(b.key===S.key&&!Cb)nb.render({
                            entries:[{
                                id:"ip_location",control:e.InfoPaneLocation,data:b,hoverable:false
                            }
                            ,{
                                id:"ip_taglist",control:e.InfoPaneTagList,data:b,hoverable:false,cstrOptions:Kb
                            }
                            ,{
                                id:"ip_sharing",control:e.InfoPaneSharing,data:b,hoverable:false,cstrOptions:{
                                    fs:kb,col:Q.cs
                                }
                                
                            }
                            ,{
                                id:"ip_information",control:e.InfoPaneInformation,data:b,hoverable:false,cstrOptions:Q.i,expanded:l.isGroupRoot(b)
                            }
                            ,{
                                id:"ip_comments",control:e.InfoPaneComments,hoverable:false,data:b
                            }
                            ,{
                                id:"ip_groupMembership",control:e.InfoPaneGroupMembership,hoverable:false,data:b,expanded:l.isGroupRoot(b)
                            }
                            ]
                        })
                    })
                }
                if(Q.fh)cb.hide();
                X.resize();
                if(c)O.trigger(f.EventNames.resize);
                ob=true
            }
            function Gb(b){
                U=true;
                O.show();
                cb.hide();
                jb.hide();
                hb.hide();
                eb.show();
                Hb.render(b);
                nb.render({
                    entries:[]
                });
                X.resize();
                O.trigger(f.EventNames.resize);
                unsutra(a("ul",hb))
            }
            function mb(a){
                if(!Q.fh&&!($B.IE&&$B.V<7)){
                    if(a)V=q.scrollTop()+g;
                    fb.width(R.width());
                    zb()
                }
                
            }
            function pb(){
                if(!Q.fh&&!($B.IE&&$B.V<7)){
                    var a,c=false,e=false,h=q.height(),d=R.height()+g,b=q.scrollTop()+g,f=h-Ab-d-1;
                    if(gb>=d){
                        a=b;
                        c=true
                    }
                    else if(b<V){
                        a=b;
                        c=true
                    }
                    else if(b+gb-d>V){
                        a=b+gb-d;
                        e=true
                    }
                    else a=V;
                    if(a<db){
                        a=db;
                        c=e=false
                    }
                    else if(a>f){
                        a=f;
                        c=e=false
                    }
                    V=a;
                    zb(c,e)
                }
                
            }
            function zb(e,d){
                if(!U)return;
                var a={
                    left:r,top:r,bottom:r
                }
                ,c=m.scrollTop(),b=m.scrollLeft();
                if(yb!==c)lb=true;
                else if(wb!==b)lb=false;
                wb=b;
                yb=c;
                if(lb&&(e||d)){
                    a[n]=G;
                    if(e)a[N]=g;
                    else if(d)a[L]=0;
                    T=T!==undefined?T:O.offset().left-b;
                    a[M]=T;
                    rb()
                }
                else{
                    a[n]=E;
                    T=undefined
                }
                tb();
                R.css(a);
                if($B.IE&&$B.V<9)setTimeout(function(){
                    R[0].className=R[0].className
                }
                ,0)
            }
            function rb(){
                clearTimeout(Y);
                Y=null;
                if(U&&T!==undefined){
                    var a=Eb.height();
                    if(sb!==a){
                        sb=a;
                        R.css(n,E);
                        R.css(n,G);
                        tb()
                    }
                    Y=setTimeout(function(){
                        rb()
                    }
                    ,H)
                }
                
            }
            function tb(){
                var a=V-db;
                if(T!==undefined)a+=R.height()-10;
                fb.height(a)
            }
            function Lb(b,a){
                if(S&&S.key===a.key&&!ab)bb(a)
            }
            function Ib(b,a){
                k.throttle("infoPaneSelection",100,function(){
                    var c=a.selectionCount;
                    if(c==1){
                        var b;
                        for(var e in a.indexes){
                            var d=a.parent;
                            b=d.getChildren().get(e);
                            break
                        }
                        if(b){
                            bb(b,"IPS");
                            P.infoPaneClosed&&qb.click();
                            mb(true)
                        }
                        ab=null
                    }
                    else if(c>1){
                        Gb(a);
                        ab=a
                    }
                    else{
                        bb(W,Q.bici);
                        ab=null
                    }
                    
                })
            }
            
        }
        f.EventNames={
            resize:"ipResize"
        }
        
    })();
    (function(){
        var f=b.CommandManager,c=f.filters;
        e.InfoPaneCommands=g;
        function g(l,h,g){
            var j=this,e,k;
            a(h.dataModel).bind(b.DataModel.groupInfoChangedEvent,m);
            j.render=function(o,q){
                var m=h.infoPaneBiciLoc;
                if(!p(e,o,true)||k!==m||q){
                    e=o;
                    k=m;
                    var j=a("<ul></ul>");
                    d(j,"$Sutra.SkyDrive.InfoPaneCommands");
                    var b=[];
                    if(g){
                        if(g.hd&&g.hd(e))b=b.concat(c.DEL);
                        if(g.hr&&g.hr(e))b=b.concat(c.RN);
                        if(g.hvb&&g.hvb(e))b=b.concat(c.VB);
                        if(g.hvi&&g.hvi(e))b=b.concat(c.VI)
                    }
                    var n=f.produceCommandList(h,f.getCommands(f.commandLists.General,b),e,null,{
                        bici:h.infoPaneBiciLoc,fs:g.fs(e)
                    });
                    for(i=0;
                    i<n.length;
                    i++){
                        var r=a('<li class="ipc_container"></li>').append(n[i]);
                        j.append(r)
                    }
                    l.empty().append(j)
                }
                
            };
            j.dispose=function(){
                a("a",l).unbind()
            };
            function m(){
                e&&j.render(e,true)
            }
            
        }
        
    })();
    (function(){
        var m=b.SkyDriveItemHelper,f=b.CommandManager,h=c("SelectionCount"),j="shared",k="mru",l='<div class="ip_msHeader"></div><ul class="ip_msCommands"></ul>';
        e.InfoPaneMultiselect=g;
        function g(c,b){
            var g=this,o,n;
            c.html(l);
            var m=a(".ip_msHeader",c),e=a(".ip_msCommands",c);
            g.render=function(l){
                var c=b.viewParams,p=b.infoPaneBiciLoc;
                m.html(h.format(l.selectionCount));
                e.empty();
                d(e,"$Sutra.SkyDrive.InfoPaneCommands");
                var n=null;
                if(c.qt==j||c.qt==k||!FilesConfig.isDependentOnNewStorageInterface&&(c.group||$Config.hcid&&c.cid&&c.cid.toLowerCase()!=$Config.hcid.toLowerCase()))n=f.filters.DEL;
                var g=f.produceCommandList(b,f.getCommands(f.commandLists.Multiselect,n),null,l,{
                    bici:b.infoPaneBiciLoc
                });
                for(i=0;
                i<g.length;
                i++){
                    var o=a('<li class="ipc_container"></li>').append(g[i]);
                    e.append(o)
                }
                
            };
            g.dispose=function(){
                a("a",c).unbind()
            }
            
        }
        
    })();
    (function(){
        var f="leftNavBarItem_event",d="leftNavBar_",b=".leftNavBarItem",c="t_sel";
        e.LeftNavBarItem=h;
        function h(h,q,i){
            var j=this,e;
            h.bind("select"+b,function(){
                if(e)e.$quickViewContainer.trigger("unselectAll",e.$quickViewContainer)
            });
            j.render=function(m){
                var o;
                if(e&&e.entries)for(o=0;
                o<e.entries.length;
                o++){
                    var r=e.entries[o];
                    if(r.$el)r.$el.unbind(b)
                }
                i.$header.empty();
                i.$header.append(a("<span>"+m.header+"</span>"));
                var s=m.tooltip;
                if(s)i.$header.attr("title",s);
                h.empty();
                m.$quickViewContainer=h;
                m.$quickViewHeader=i.$header;
                var q=a('<div class="t_hovl"></div>'),t;
                for(o=0;
                o<m.entries.length;
                o++){
                    var l=m.entries[o],u=l.text||g;
                    l.$a=a('<a class="'+d+'anchor"><span>'+l.text.encodeHtml()+"</span></a>");
                    if(l.selected)l.$a.addClass(c);
                    if(l.tooltip)l.$a.attr("title",l.tooltip);
                    if(l.action)k.Core.ActionManager.setATagAction(l.action,l.$a);
                    else l.$a.attr("href","#");
                    l.$el=a('<div class="'+d+'item"></div>').append(l.$a).data(f,{
                        index:o,item:m
                    }).bind("click"+b,function(){
                        a(this).trigger("select")
                    }).bind("select"+b,p).bind("unselect"+b,n).appendTo(q)
                }
                h.append(q);
                a(e).unbind(b);
                a(m).bind("render"+b,function(){
                    j.render(e)
                });
                e=m
            };
            j.dispose=function(){
                for(var a=0;
                a<e.entries.length;
                a++){
                    var c=e.entries[a];
                    c.$el.unbind(b)
                }
                h.unbind(b).empty()
            };
            function p(){
                var d=m(this),a=l(this),b=d.item.$quickViewContainer;
                b.trigger("unselectAll");
                a.$a.addClass(c);
                a.selected=true;
                if(a.bici)$BSI.reportEvent(o,a.bici);
                return false
            }
            function n(){
                var a=l(this);
                a.$a.removeClass(c);
                a.selected=false;
                return false
            }
            function m(b){
                return a(b).data(f)
            }
            function l(b){
                var a=m(b);
                return a.item.entries[a.index]
            }
            
        }
        
    })();
    (function(){
        var b=window,c=b.parent;
        if(!c.MusicConfig){
            c.MusicConfig={
                imgBaseUrl:b.FilesConfig.foldersImgBaseUrl,aleJSUrl:b.FilesConfig.musicAleJSLocation,cssUrl:b.FilesConfig.musicCssLocation,liveContextBaseUrl:b.FilesConfig.liveContextBaseUrl
            };
            if(b.$Sutra)a.extend(c.$Sutra,b.$Sutra,{});
            if(b.FilesConfig.musicJSLocation&&b.FilesConfig.musicCssLocation&&b.FilesConfig.musicAleJSLocation){
                c.$Network.fetchCSS(b.FilesConfig.musicCssLocation,function(){});
                c.$Network.fetchScript(b.FilesConfig.musicJSLocation,function(){});
                c.$Network.fetchScript(b.FilesConfig.musicAleJSLocation,function(){})
            }
            
        }
        if(!c.wLive||!c.wLive.Controls||!c.wLive.Controls.MusicPlayer){
            c.MusicConfig.innerPageInit=d;
            a(b).bind("unload",e)
        }
        else d();
        function e(){
            c.MusicConfig.innerPageInit=null
        }
        function d(){
            window.wLive.Controls.MusicPlayer=c.wLive.Controls.MusicPlayer;
            $Do.register("MusicPlayer")
        }
        
    })();
    (function(){
        var R=3,S=3e4,O="/API/2/GetGroups",B="select",g="leftnavbar.",t=g+"myfiles.",J=t+"docs.",H=t+"photos.",C=g+"quickviews.",I=C+"mru.",E=C+"shareddocs.",N=g+"groups.",f="text",z=c(J+f),x=c(H+f),A=c(t+f),y=c(I+f),w=c(E+f),M=c(g+"devices."+f),L=c(g+"getapp."+f),G=c(g+"getmobileapp."+f),F=c(g+"managestorage."+f),K=c(g+"QuotaUsage.Format"),T=b.SkyDriveItemHelper,D=false,p={
            id:"docs",text:z,tooltip:z,selected:false,bici:{
                SkyCmnd:"D",ClickLoc:"LN"
            }
            ,$el:null,$a:null
        }
        ,l={
            id:"photos",text:x,tooltip:x,selected:false,bici:{
                SkyCmnd:"P",ClickLoc:"LN"
            }
            ,$el:null,$a:null
        }
        ,i={
            id:"myfiles",control:e.LeftNavBarItem,collapsible:false,selected:false,bici:{
                name:o,dataPoints:{
                    SkyCmnd:"MF",ClickLoc:"LN"
                }
                
            }
            ,data:{
                header:A,tooltip:A,entries:[p,l],$quickViewContainer:null,$quickViewHeader:null
            }
            
        }
        ,m={
            id:"mru",control:e.LeftNavBarItem,collapsible:false,selected:false,bici:{
                name:o,dataPoints:{
                    SkyCmnd:"RD",ClickLoc:"LN"
                }
                
            }
            ,data:{
                header:y,tooltip:y,entries:[],$quickViewContainer:null,$quickViewHeader:null
            }
            
        }
        ,j={
            id:"shared",control:e.LeftNavBarItem,collapsible:false,selected:false,bici:{
                name:o,dataPoints:{
                    SkyCmnd:"DS",ClickLoc:"LN"
                }
                
            }
            ,data:{
                header:w,tooltip:w,entries:[],$quickViewContainer:null,$quickViewHeader:null
            }
            
        }
        ,q={
            id:"groups",control:e.LeftNavBarItem,expanded:false,hidden:true,selected:false,data:{
                header:c(N+f),entries:[],$quickViewContainer:null,$quickViewHeader:null
            }
            
        }
        ,r={
            id:"devices",control:e.LeftNavBarItem,expanded:true,hidden:true,selected:false,data:{
                header:M,entries:[],$quickViewContainer:null,$quickViewHeader:null
            }
            
        }
        ,s={
            entries:[i,m,j,q,r]
        }
        ,v=a('<div class="leftNavBar_extraLinks"><span class="leftNavBar_quota"></span></div>'),Q=a(h+"leftNavBar_quota",v);
        u(F,FilesConfig.manageStorageUrl,"ManageStorageLink");
        u(G,FilesConfig.getSkyDriveMobileUrl,"GetMobileAppLink");
        u(L,FilesConfig.getSkyDriveAppUrl,"GetAppLink");
        function u(f,c,e){
            if(c){
                var b=a('<a href="'+c.encodeHtmlAttribute()+'">'+f.encodeHtml()+"</a>");
                v.append(b);
                d(b,"$Sutra.SkyDrive."+e)
            }
            
        }
        e.LeftNavBar=P;
        function P(h,f){
            var x=this,c=f.actionManager,o=f.callerCid;
            a(f.deviceItemSet).bind("change",function(){
                A()
            });
            i.action=c.getAction("SkyDriveRoot",null);
            p.action=c.getAction("ViewMyDocs",null);
            l.action=c.getAction("ViewMyPhotos",null);
            m.action=c.getAction("ViewRecentDocs",null);
            j.action=c.getAction("ViewSharedDocs",null);
            var w=true,y=new e.QuickView(h,f);
            h.bind("unselectAll",function(g,a){
                if(!a)a=[];
                for(var c=0;
                c<s.entries.length;
                c++){
                    var f=s.entries[c],b=f.data;
                    if(b.$quickViewContainer)b.$quickViewContainer.not(a).trigger("unselect");
                    for(var d=0;
                    d<b.entries.length;
                    d++){
                        var e=b.entries[d];
                        if(e.$el)e.$el.not(a).trigger("unselect")
                    }
                    
                }
                
            });
            x.dispose=function(){
                p.$el=p.$a=l.$el=l.$a=i.$quickViewContainer=i.$quickViewHeader=m.$el=m.$a=j.$el=j.$a=q.$quickViewContainer=q.$quickViewHeader=null;
                h.empty()
            };
            x.render=function(a){
                u();
                if(!D){
                    z();
                    D=true
                }
                var b=a.displayQuotaRemaining,c=a.displayQuotaTotal;
                if(b&&c&&!a.group)Q.text(K.format(b,c));
                if(w){
                    w=false;
                    y.render(s);
                    h.append(v);
                    d(p.$el,"$Sutra.SkyDrive.MyFilesDocs");
                    d(l.$el,"$Sutra.SkyDrive.MyFilesPhotos");
                    d(m.data.$quickViewHeader,"$Sutra.SkyDrive.QuickViewsMru");
                    d(j.data.$quickViewHeader,"$Sutra.SkyDrive.QuickViewsSharedDocs");
                    d(h,"$Sutra.SkyDrive.LeftNavBar");
                    d(i.data.$quickViewHeader,"$Sutra.SkyDrive.MyFiles");
                    d(q.data.$quickViewHeader,"$Sutra.SkyDrive.Groups");
                    d(q.data.$quickViewContainer,"$Sutra.SkyDrive.GroupItems");
                    d(r.data.$quickViewHeader,"$Sutra.SkyDrive.Devices");
                    d(r.data.$quickViewContainer,"$Sutra.SkyDrive.DeviceItems")
                }
                
            };
            function t(b){
                b.selected=true;
                var a=b.data;
                if(a.$quickViewContainer)a.$quickViewContainer.trigger(B)
            }
            function g(a){
                a.selected=true;
                var b=a.$el||(a._internal?a._internal.$element:null);
                if(b)b.trigger(B)
            }
            function u(){
                var b=false,a=f.viewParams,c;
                if(a.did){
                    var s=f.deviceItemSet.getByKey(a.did.toLowerCase());
                    if(s){
                        var h=r.data.entries;
                        for(c=0;
                        c<h.length;
                        c++){
                            var d=h[c];
                            if(n(d.id,a.did)){
                                d.selected=b=true;
                                g(d)
                            }
                            
                        }
                        
                    }
                    
                }
                else if(a.group&&a.group==1){
                    var k=q.data.entries;
                    for(c=0;
                    c<k.length;
                    c++){
                        var e=k[c];
                        if(n(e.id,a.cid)){
                            e.selected=b=true;
                            g(e);
                            break
                        }
                        
                    }
                    
                }
                else if(a.cid&&a.cid!=o)b=false;
                else if(a.sc=="documents"){
                    g(p);
                    b=true
                }
                else if(a.sc=="photos"){
                    g(l);
                    b=true
                }
                else if(a.qt=="mru"){
                    g(m);
                    b=true
                }
                else if(a.qt==V){
                    g(j);
                    b=true
                }
                else if(a.cid&&a.cid==o){
                    if(a.sc!="documents"&&a.sc!="photos"){
                        t(i);
                        b=true
                    }
                    
                }
                else t(i);
                return b
            }
            function z(){
                var c=O+"?cid="+o,a=new b.DataRequest(c,c+"&v="+Math.random(),null,C);
                a.queueId=null;
                a.start()
            }
            function C(n){
                var h=n.groups;
                if(h){
                    var e=q.data;
                    e.entries=[];
                    for(var b=0;
                    b<h.length;
                    b++){
                        var f=h[b];
                        e.entries[b]={
                            id:f.groupId,text:f.displayName,tooltip:f.displayName,bici:{
                                SkyCmnd:"G",ClickLoc:"LN"
                            }
                            ,action:c.getAction("ViewGroup",null,f.groupId,true)
                        }
                        
                    }
                    var g=e.entries;
                    if(g.length>0){
                        e.$quickViewContainer.trigger("show");
                        var o=i.selected||p.selected||l.selected||m.selected||j.selected;
                        if(!o&&u())e.$quickViewContainer.trigger(k.Controls.QuickView.EventNames.Expand);
                        a(e).trigger("render");
                        for(b=0;
                        b<g.length;
                        b++){
                            var r=g[b];
                            d(r.$el,"$Sutra.SkyDrive.GroupItem")
                        }
                        
                    }
                    
                }
                
            }
            function A(){
                var i=f.deviceItemSet,e=r.data,g=e.entries=[],j=i.getCount();
                if(j>0){
                    for(var b=0;
                    b<j;
                    b++){
                        var h=i.get(b);
                        g[b]={
                            id:h.did,text:h.name,tooltip:null,bici:{
                                SkyCmnd:"D",ClickLoc:"LN"
                            }
                            ,action:c.getAction("DefaultClick",h)
                        }
                        
                    }
                    e.$quickViewContainer.trigger("show")
                }
                else e.$quickViewContainer.trigger("hide");
                a(e).trigger("render");
                for(b=0;
                b<g.length;
                b++){
                    var k=g[b];
                    d(k.$el,"$Sutra.SkyDrive.DeviceItem")
                }
                
            }
            
        }
        
    })();
    (function(){
        e.InfoPaneHeader=v;
        var m="iph_bc",i="iph_bctxt",j="iph_fakebc",q="iph_title",k="iph_sit",l="iph_bit",n="iph_ss",f="iph_vf",p="iph_io",t={
            h:32,w:32,de:true,dt:true,df:true
        }
        ,u={
            h:128,w:165,de:true,iw:true,ap:true
        }
        ,g='<span class="c_clr"></span>',x='<div class="'+l+'"></div>'+'<div class="'+k+'"></div>'+'<div class="'+q+'"></div>',o='<div class="iph_tl"><a class="'+f+'"></a></div>',s='<a class="'+m+'">'+'<span class="'+i+'"></span>'+g+"</a>"+'<div class="'+j+'">'+g+"</div>"+'<div class="iph_tl"><a href="#" class="'+n+'"></a></div>'+o+'<div class="'+p+'"></div>';
        function v(y,A,K){
            var O=this,H=A.dataModel,S=K&&K.sp,T=K&&K.vf,v,C,z,F,N,D,B,I,J,G,E,R=a(A.dataModel);
            if(S){
                y.html(s);
                z=a(h+m,y);
                I=a(h+i,z);
                N=a(h+j,y);
                _$slideShow=a(h+n,y);
                _$viewFolder=a(h+f,y);
                J=a(h+p,y);
                d(z,"$Sutra.SkyDrive.InfoPaneBreadcrumb");
                d(_$viewFolder,"$Sutra.SkyDrive.InfoPaneViewFolder");
                d(_$slideShow,"$Sutra.SkyDrive.InfoPaneSlideshow");
                d(J,"$Sutra.SkyDrive.InfoPaneIndexOf");
                _$slideShow.text(c("slideshow")).bind(r,function(a){
                    _$slideShow.trigger("slideshow");
                    a.preventDefault()
                });
                R.bind(b.DataModel.dataChangedEvent,P)
            }
            else{
                var U=x;
                if(T)U+=g+o;
                y.html(U);
                F=a(h+l,y);
                D=a(h+k,y);
                B=a(h+q,y);
                _$viewFolder=a(h+f,y);
                G=new e.ItemTile(F,A,u);
                E=new e.ItemTile(D,A,t);
                d(B,"$Sutra.SkyDrive.ItemName");
                d(_$viewFolder,"$Sutra.SkyDrive.InfoPaneViewFolder")
            }
            O.render=function(e){
                v=e;
                var a=H.getItem(v.parentKey);
                if(S){
                    if(a.isPlaceholder){
                        z.hide();
                        N.prepend(I).show()
                    }
                    else{
                        N.hide();
                        z.html(I).show();
                        b.ActionManager.setATagAction(A.actionManager.getAction("ViewItem",a),z)
                    }
                    Q(I,a&&a.name||"");
                    C=e.parentKey;
                    var d=H.getItem(C);
                    if(d.folder.photoCount<2)_$slideShow.parent().hide();
                    else _$slideShow.parent().show();
                    if(d.folder.photoCount!==H.getChildCount(d))J.text(".").css(w,M);
                    else{
                        var f=H.getIndexOfChild(C,e);
                        J.text(c("InfoPaneHeader.IndexOf").format(f+1,d.folder.photoCount)).css(w,L)
                    }
                    
                }
                else{
                    V();
                    Q(B,v.name||"")
                }
                if(T){
                    _$viewFolder.text(c("viewfoldercommand"));
                    b.ActionManager.setATagAction(A.actionManager.getAction("ViewItem",a),_$viewFolder);
                    if(a.isPlaceholder)_$viewFolder.attr("href","#cid="+e.ownerCid)
                }
                
            };
            function V(){
                if(v&&!b.SkyDriveItemHelper.isGroupRoot(v)&&(v.photo||v.video||v.isProcessingVideo||v.folder||v.audio)){
                    F.show();
                    G.render(v);
                    D.hide();
                    B.hide()
                }
                else{
                    F.hide();
                    D.show();
                    E.render(v);
                    B.show()
                }
                
            }
            O.dispose=function(){
                if(E)E.dispose();
                if(G)G.dispose();
                R.unbind(b.DataModel.dataChangedEvent,P)
            };
            var Q=function(b,a){
                b.text(a).attr("title",a)
            };
            function P(b,a){
                if(C==a.key)O.render(v)
            }
            
        }
        
    })();
    (function(){
        e.InlineError=c;
        function c(f,c,e){
            var g=this;
            g.render=function(){
                var g=a('<div class="ine_error"></div>');
                f.append(g);
                d(g,"$Sutra.SkyDrive.InlineError");
                var h=a('<div class="ine_text"></div>');
                if(e)h.html(c);
                else h.text(c);
                var i=a('<div class="ine_icon"></div>').append(b.ImageStrip.getImage("error"));
                g.append(i);
                g.append(h);
                g.append(a('<div class="c_clr"></div>'))
            }
            
        }
        
    })();
    (function(){
        e.PlaceholderInput=a;
        function a(a,b){
            var e=this;
            e.render=function(){
                if("placeholder" in a[0]){
                    a.attr("placeholder",b);
                    return
                }
                a.focus(d);
                a.blur(c);
                c()
            };
            function d(){
                if(a.val()==b){
                    a.removeClass("pi_placeholder");
                    a.val("")
                }
                
            }
            function c(){
                if(a.val()==""){
                    a.addClass("pi_placeholder");
                    a.val(b)
                }
                
            }
            
        }
        
    })();
    (function(){
        var b=f("Loading");
        e.LoadingSpinner=c;
        function c(e,c){
            var f=this;
            f.render=function(){
                c=c==null?b:c;
                var g='<span class="lcSpinner"><img src="'+FilesConfig.progressLoadingGif.encodeHtmlAttribute()+'" />'+c.encodeHtml()+"</span>",f=a(g);
                e.append(f);
                d(f,"$Sutra.SkyDrive.LoadingSpinner")
            }
            
        }
        
    })();
    (function(){
        var c='<div class="lcCenter"><div class="lcWrapper"></div></div>',b=250,h=a.support.opacity,f=$B.ltr?"left":"right";
        e.LoadingCue=g;
        function g(i){
            i.html(c);
            var n=a(".lcCenter",i),g=a(".lcWrapper",i).hide(),m=new e.LoadingSpinner(g);
            m.render();
            g.css("margin-"+f,-(g.width()/2));
            d(g,"$Sutra.SkyDrive.LoadingCue");
            var k=this,j=false;
            k.setVisibility=function(c){
                if(!c)g.stop(true).hide();
                else{
                    if(!j)if(h)g.stop(true).delay(b).css("opacity",0).show().animate({
                        opacity:1
                    }
                    ,500);
                    else g.show();
                    if(n.offset().top>=a(l).scrollTop())g.css({
                        position:"absolute"
                    });
                    else g.css({
                        position:"fixed"
                    })
                }
                j=c
            };
            k.update=function(){
                k.setVisibility(j)
            }
            
        }
        
    })();
    (function(){
        var n=b.SkyDriveItemHelper,i=b.SkyDriveItem,o="1",kb="0",r="0",u="2",z="7",w="BestFitGrid",p="photos",rb="documents",y="mru",x="shared",qb="root",h=".PageController",t="/favicon.ico",tb=".pdf",gb="9",lb="22",db=101,cb=102,Y=103,ib=152,eb=200,P=201,bb=202,fb=3e3,Z=10001,ab=10002,S=10004,F=10005,K=10006,L=10009,H=10011,M=f("FilesPageTitle"),ob=f("AllFilesRootTitle"),pb=f("AllDocsRootTitle"),nb=f("AllPhotosRootTitle"),Q=f("AllFilesVisitorRootTitle"),W=f("AllDocsVisitorRootTitle"),N=f("AllPhotosVisitorRootTitle"),O=f("DocsSharedWithMe"),sb=f("GroupDocuments"),T=f("RecentDocuments"),V=f("SharedWithGroup"),C="<span>"+f("NotificationBar.SignInToDownload").format("<a href='#'>","</a>")+"</span>",mb=8*60*60*1e3,jb=new RegExp("wreply=[^&]*");
        b.PageController=hb;
        function hb(Ab,ic,kc,nc,ub,lc,hc,Bb){
            var tb=this,Cb=g,yb=true,Mb,Ob,xb,zb,Pb,Ib=false,Kb=false,Lb=false,Gb={
                w:m.width(),h:m.height()
            }
            ,rb,I,vb,sb,Eb,bc=(new Date).getTime()+mb;
            if(ub=="UnAuth")ub=g;
            var Db=false,hb=new b.DataModel(ic,kc,nc,ub,lc,hc),s={
                callerCid:ub,viewParams:null,dataModel:hb,deviceItemSet:new b.DeviceItemSet,actionManager:new b.ActionManager,multiselectActionManager:new b.ActionManager,operationManager:b.OperationManager.getInstance(),errorManager:new b.ErrorManager,selectionManager:new b.SelectionManager(hb),contextMenu:null,authenticateUser:wb,$rootElement:Ab,sortBy:mc,sortField:null,sortReverse:null,tokenHasBeenRedeemed:false,itemScopedDisposables:[]
            };
            s.contextMenu=new e.ContextMenu(null,s);
            var Sb=a(s),Tb=false;
            n.registerJsonApiActions(s);
            n.registerLinkActions(s);
            n.registerMultiselectActions(s);
            var Fb=a(hb),Hb=a(l);
            function oc(){
                if(!Tb){
                    Tb=true;
                    Fb.bind(b.DataModel.dataChangedEvent+h,ec);
                    Fb.bind(b.DataModel.errorEvent+h,jc);
                    s.viewParams=$Config.AjaxHistory&&$Config.AjaxHistory.state?$Config.AjaxHistory.state:{};
                    Nb();
                    if(Bb){
                        var a=s.viewParams;
                        I=i.getItemKey(a.id,a.cid,a.group,a.qt,a.did);
                        var c=i.getSetKey(Jb(I,hb.getItem(I,true)),zb,vb);
                        i.setDefaultSetKey(c);
                        hb.processResponse(Bb,I);
                        k.PageStats.add(Bb.pageStats)
                    }
                    $Do.when("$History.attach",0,fc);
                    Hb.bind(A+h,Rb);
                    Hb.bind("orientationchange"+h,Rb);
                    Ab.bind(A+h,function(){
                        return false
                    });
                    Sb.bind("perfLoad"+h,Qb);
                    ac();
                    q.bind(J+h,Zb)
                }
                
            }
            function Zb(b){
                var d=b.which,c=a(b.target);
                if(!R()&&!B(c))if(d==X&&!(b.shiftKey||b.ctrlKey))Vb("Delete")
            }
            function Vb(c){
                var d=s.selectionManager.getSelection();
                if(d.selectionCount==0){
                    var a=s.actionManager.getAction(c,sb);
                    if(a)s.actionManager.doAction(a)
                }
                else{
                    var b=s.multiselectActionManager.getAction(c,d);
                    if(b)s.actionManager.doAction(b)
                }
                
            }
            function ac(){
                var c=window,a=c.external;
                try{
                    if(a&&typeof a.msAddSiteMode!="undefined"&&a.msIsSiteMode()){
                        var b=s.actionManager;
                        a.msSiteModeCreateJumplist(f("IE9JumpList.View"));
                        a.msSiteModeAddJumpListItem(f("IE9JumpList.Photos"),"/"+b.getAction("ViewMyPhotos",null).url,t);
                        a.msSiteModeAddJumpListItem(f("IE9JumpList.Documents"),"/"+b.getAction("ViewMyDocs",null).url,t);
                        a.msSiteModeAddJumpListItem(f("IE9JumpList.MyFiles"),"/",t);
                        a.msSiteModeShowJumplist()
                    }
                    
                }
                catch(d){}
            }
            tb.dispose=function(){
                if(rb){
                    rb.dispose();
                    rb=null
                }
                if(s.contextMenu)s.contextMenu.dispose();
                Fb.unbind(h);
                Hb.unbind(h);
                q.unbind(h);
                Ab.unbind(h);
                Sb.unbind(h);
                window.requests.abortAll();
                document.body.removeAttribute("view")
            };
            tb.render=function(){
                oc();
                var a=s.viewParams,f=I,c=sb;
                I=i.getItemKey(a.id,a.cid,a.group,a.qt,a.did);
                if(!ub&&!a.id&&!a.cid)wb();
                else{
                    if(f!==I||a.sc!==Pb){
                        if(a.id==null){
                            xb=null;
                            zb=false
                        }
                        b.SkyDriveItemSet.removeMarkedHeaderItems();
                        for(var d=0;
                        d<s.itemScopedDisposables.length;
                        d++)s.itemScopedDisposables[d]["dispose"]();
                        s.itemScopedDisposables=[]
                    }
                    var e=i.getSetKey(Jb(I,hb.getItem(I,true)),zb,vb);
                    i.setDefaultSetKey(e);
                    sb=hb.getItem(I);
                    if(!sb)sb=hb.getLoadingItem(I);
                    else{
                        if(c&&c!=sb&&c.getParent(false)!=sb.getParent(false))window.requests.abort(D);
                        if(c&&c.id==="root"&&c.did&&sb.id!=="root"&&sb.did===c.did)$BSI.reportEvent("SelectClick.RemoteLocation.Load",{
                            DevicesLocation:sb.iconType
                        })
                    }
                    s.currentItem=sb;
                    cc(sb);
                    Pb=a.sc
                }
                
            };
            tb.getViewContext=function(){
                return s
            };
            function Jb(f,d){
                var a=r,e=$Cookie.getCookie("sd-v"),b=s.viewParams,c=$Utility.deserialize(f,"&",false,false);
                if(c.id&&c.id===qb)if(c.qt&&c.qt===y)a=kb;
                else if(c.qt&&c.qt===x)a=z;
                else if(b.sc&&b.sc===p)a=u;
                else if(b.sc&&b.sc===v)a=o;
                else if(c.group&&c.group==="1")a=o;
                else a=e===w?u:o;
                else if(b.sc&&b.sc===p)a=r;
                else if(b.sc&&b.sc===v)a=o;
                else if(d)if(n.isPhotoAlbum(d,s))a=r;
                else a=o;
                else a=e===w?r:o;
                if(xb===z&&!n.isSharedQuery(d))xb=null;
                return xb||a
            }
            function cc(b){
                var f=U,v=I;
                Eb=Eb||b;
                if(s.viewParams.sff=="1"&&b.folder&&hb.getChildCount(b)>0&&!b._isLoadingItem){
                    var u=hb.getChildCount(b),e;
                    for(var h=0;
                    h<u;
                    h++){
                        e=hb.getChildByIndex(b,h);
                        if(!e)return;
                        else if(e.photo||e.video)break
                    }
                    if(e){
                        s.viewParams.id=e.id;
                        b=e;
                        I=b.key
                    }
                    
                }
                s.viewParams.sff="0";
                if(b.photo||b.video)f=E;
                else if(b.isPdf&&!$B.Mobile)f=G;
                else if(!b.folder){
                    var c=b.getParent();
                    if(!c){
                        b=hb.getLoadingItem(b.key);
                        I=b.key
                    }
                    else if(c.key!=I){
                        var r=hb.getIndexOfChild(c.key,b);
                        if(r>-1){
                            s.selectionManager.clickSelect(c,r,{
                                preselect:true
                            });
                            s.viewParams.id=c.id;
                            b=c;
                            I=b.key;
                            sb=b;
                            Ib=false
                        }
                        else{
                            Ib=true;
                            b=hb.getLoadingItem(c.key);
                            I=c.key
                        }
                        
                    }
                    
                }
                if(f!=Cb){
                    if(rb){
                        rb.dispose();
                        rb=null
                    }
                    rb=gc(f)
                }
                if(rb){
                    Cb=f;
                    s.currentViewType=Cb;
                    Yb(b);
                    l.$f.updateTitle(M.format(b.name));
                    rb.render(b);
                    var t=b.folder&&hb.getChildCount(b)>0&&!hb.getChildByIndex(b,0,true),g=f;
                    if(n.isGroupRoot(b))g+="-Group";
                    else if(n.isMruQuery(b)&&n.isRootItem(b))g+="-MRU";
                    else if(n.isSharedQuery(b)&&n.isRootItem(b))g+="-Shared";
                    $CSIPerf.setPerformanceId(g+(yb?"-Init":""));
                    if(!b._isLoadingItem&&!t){
                        if(yb)yb=false;
                        else{
                            var o=i.getDefaultSetKey();
                            if(Mb!=b.key||Ob!=o){
                                Mb=b.key;
                                Ob=o;
                                $BSI.informPVHead()
                            }
                            
                        }
                        Qb()
                    }
                    d.load("view",f)
                }
                var k=s.viewParams||{};
                if(!Kb&&k.action){
                    var m=s.actionManager,q=m.getAction(k.action,Eb);
                    if(q)m.doAction(q);
                    else if($B.SignedOut&&k.action==="Download"){
                        var p=a(C);
                        p.find("a").bind("click",function(){
                            wb();
                            return j
                        });
                        s.errorManager.add({
                            $element:p,priority:0,type:1
                        })
                    }
                    Kb=true
                }
                
            }
            function Qb(){
                if($BSI.isLoading()){
                    var a=sb,b=a&&a.folder&&hb.getChildCount(a)>0&&!hb.getChildByIndex(a,0,true);
                    if(!a._isLoadingItem&&!b)if(!rb.isLoaded||rb.isLoaded()){
                        $CSIPerf._ttg=(new Date).getTime();
                        $BSI.informLoaded();
                        if($B.Full)$Do.when("Bucket3.js",0,function(){
                            $Do.when("Bucket4.js",0,function(){
                                $Do.when("mapcontrol.ashx",0,function(){});
                                $Do.when("Bucket2c.js",0,function(){})
                            });
                            if(!Lb){
                                Lb=true;
                                window.$Network.fetchCSS(FilesConfig.bucket3CssLocation,function(){
                                    if(!$B.IE)setTimeout(function(){
                                        $Do.register("Bucket3.css")
                                    }
                                    ,1e3);
                                    else $Do.register("Bucket3.css")
                                })
                            }
                            
                        });
                        else $Do.when("MobileBucket4.js",0,function(){})
                    }
                    
                }
                
            }
            function gc(a){
                var b=null;
                if(e[a])b=new e[a](Ab,s);
                else if(!Db){
                    Db=true;
                    if(a===G)$Do.when("Bucket2c.js",0,function(){});
                    $Do.when("wLive.Controls."+a,tb,function(){
                        Db=false;
                        tb.render()
                    })
                }
                return b
            }
            function dc(){
                return bc<(new Date).getTime()
            }
            function Ub(){
                $BSI.navigateTo($PF.getCurrentUrl(),"_top")
            }
            function wb(){
                var a=Wb(l.FilesConfig.si,$PF.getCurrentUrl());
                $BSI.navigateTo(a,"_top")
            }
            function Wb(b,a){
                return b.replace(jb,"wreply="+a.encodeUrl())
            }
            function ec(b,a){
                if(a.key==I)tb.render()
            }
            function Xb(a){
                switch(a.code){
                    case ab:case S:case F:case K:case H:var b=s.deviceItemSet.getByKey(s.viewParams.did.toLowerCase()),d=b?b.name:null;
                    a.message=c("DA.Error"+a.code).format(d)
                }
                
            }
            function jc(h,b){
                if(b&&b.key==I){
                    Xb(b);
                    switch(b.code){
                        case cb:case ib:case db:case Y:wb();
                        break;
                        case eb:$BSI.navigateTo(FilesConfig.suspendedUrl);
                        break;
                        case bb:$BSI.navigateTo(FilesConfig.marketBlockedUrl);
                        break;
                        case P:Ub();
                        break;
                        case Z:var d=a.extend(hb.getLoadingItem(I),sb);
                        d.error=b;
                        rb&&rb.render(d);
                        break;
                        default:if((b.code==fb||b.code==L)&&!ub)wb();
                        else{
                            var e=b.message||f("LoadGenericError"),c=a(document.createElement("div")),g="<span>"+e.encodeHtml()+"</span>";
                            c.html(g);
                            s.errorManager.add({
                                $element:c,priority:0,type:0
                            });
                            if(rb)rb.render(sb)
                        }
                        
                    }
                    
                }
                
            }
            function Rb(){
                if(rb&&rb.resize){
                    var a={
                        w:m.width(),h:m.height()
                    };
                    if(Gb.w!=a.w||Gb.h!=a.h){
                        rb.resize();
                        Gb=a
                    }
                    
                }
                
            }
            function fc(b,a){
                if(!yb)$BSI.informNav("#"+$Utility.serialize(a),null,null,false,false,null,true);
                if(dc())Ub();
                else{
                    s.viewParams=a;
                    Nb();
                    tb.render()
                }
                
            }
            function Nb(){
                var a=s.viewParams;
                a.did=a.did||g;
                a.group=parseInt(a.group||0);
                vb=null;
                if(!a.id&&a.sc){
                    var b=a.sc=a.sc.toLowerCase();
                    switch(b){
                        case p:vb=gb;
                        break;
                        case v:vb=lb
                    }
                    
                }
                
            }
            function Yb(a){
                a.name=a.name||g;
                var b=s.viewParams;
                if(!a.parentKey&&a._missingName){
                    var d=b.sc,c=b.qt,j=d&&d===v,i=d&&d===p,h=b.group&&b.group==="1",k=c&&c===x;
                    if(!!b.did){
                        var f=s.deviceItemSet.getByKey(b.did.toLowerCase());
                        a.name=f?f.name:g
                    }
                    else if(k)if(h)a.name=V;
                    else a.name=O;
                    else if(h)a.name=a.ownerName||g;
                    else if(c&&c===y)a.name=T;
                    else{
                        var e=a.ownerCid&&a.ownerCid.toLowerCase()==FilesConfig.hcid.toLowerCase();
                        if(j)a.name=e?pb:a.ownerName?W.format(a.ownerName):g;
                        else if(i)a.name=e?nb:a.ownerName?N.format(a.ownerName):g;
                        else if(!a.parentKey&&!a._isLoadingItem)a.name=e?ob:a.ownerName?Q.format(a.ownerName):g
                    }
                    
                }
                
            }
            function mc(b,a){
                xb=b;
                zb=a;
                i.setDefaultSetKey(i.getSetKey(b,a,i.getSetKeyParts().ft));
                tb.render()
            }
            
        }
        var s;
        b.PageController.getInstance=function(){
            return s
        };
        function I(){
            var d=a("#filesPageContent"),b=FilesConfig,c=new k.Core.PageController(d,b.baseApiUrl,b.canary,b.appId,b.hcid,$Config.mkt,b.dataPageSize,primedResponse);
            $Do.when("$PF.attach",c,c.dispose);
            m.bind("unload",function(){
                c.dispose()
            });
            return c
        }
        $Do.when("primedResponse",0,function(){
            s=I();
            s.render()
        })
    })()
})()