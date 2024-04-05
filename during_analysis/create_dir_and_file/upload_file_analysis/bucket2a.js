/* Copyright (C) 2012 Microsoft Corporation */registerNamespace("$SB");
new function(){
    if(typeof $SB.SearchBox!=="function")return;
    $SB.renderModes=new $Enum("HOME","HOTMAIL","OTHER","CONTACTLIST","DOCUMENTS","SIGNOUT");
    var d=false;
    $SB.logEvent=function(b,a){
        $BSI.reportEvent("search.general",{
            SearchType:b+(a?"_"+a:""),SearchMethod:d?"enter":"click"
        });
        d=false
    };
    var c=$SB.SearchBox.prototype,a=$SB.renderModes,l=/%20/g,h="c_search_i",e="c_ms";
    c.getContentHeader=function(){
        var b=this;
        if(typeof b.contentHeader==="undefined")b.contentHeader=b[($SBC.bingSearch?"bing":b.renderMode===a.HOME?"secondary":"primary")+"MenuItem"];
        return b.contentHeader
    };
    c.getEmailHeader=function(){
        var a=this;
        if(typeof a.emailHeader==="undefined")a.emailHeader=a.isEmailMode()?a.primaryMenuItem:null;
        return a.emailHeader
    };
    c.getHeaders=function(){
        var a=this;
        if(typeof a.headers==="undefined"){
            var d=["primary","secondary","bing"],c;
            a.headers=[];
            for(var b=0;
            b<d.length;
            b++)if(c=a[d[b]+"MenuItem"])a.headers.push(c)
        }
        return a.headers
    };
    c.isEmailMode=function(){
        return !$SBC.bingSearch&&(this.renderMode===a.HOME||this.renderMode===a.HOTMAIL)
    };
    function f(a){
        return a.encodeUrl().replace(l,"+")
    }
    function m(d,c){
        var b=d.renderMode;
        if(b==a.DOCUMENTS)return g(c);
        if(b==a.OTHER)return i(c);
        return null
    }
    function k(c,b){
        switch(c.renderMode){
            case a.HOME:case a.DOCUMENTS:return i(b);
            case a.OTHER:return g(b);
            case a.HOTMAIL:case a.CONTACTLIST:default:return null
        }
        
    }
    var o=$SB.getBingUrl=function(b){
        var a=$SB.formCode;
        return $SBC.bingUrl+"?q="+f(b)+(a?"&form="+a.encodeUrl():"")
    };
    function b(a){
        return a.getElementsByTagName("A")[0]
    }
    function i(a){
        return j(a,"people")
    }
    function g(a){
        return j(a,"documents")
    }
    function j(b,a){
        return $SBC.homeSerp+"?query="+f(b)+"&consumerid="+$SB.consumer.encodeUrl()+"&mkt="+$Config.mkt.encodeUrl()+(a?"&scope="+a.encodeUrl():"")
    }
    var n=function(n,db){
        var B=this,c=n,t=_ge(n.searchBoxId),g=W(),I=n.hasInitialQuery,G=false,p=null,j=db,D=false,A=null,r=null,i=null,ab=n.getEmailHeader(),L=n.getContentHeader(),eb=false,H=false,f=n.isEmailMode()?$SB.MailSearchHelper:null,v="H_search_contacts",E="H_search_documents",J="H_search_email",V="H_search_contact_list",l="H_search_bing",z={
            HOME:[J,v,l],HOTMAIL:[J,l],OTHER:[v,E,l],CONTACTLIST:[V,l],DOCUMENTS:[E,v,l],SIGNOUT:[l]
        };
        function bb(){
            var e=c.getHeaders(),d=c.renderMode;
            jQuery(b(e[0])).bind("click",function(b){
                $SB.logEvent(z[d][0]);
                if(typeof c.searchEmailFunc!="function"){
                    w(c.getValue());
                    if(d==a.OTHER||d==a.DOCUMENTS||d==a.SIGNOUT)return true;
                    if($B.IE_M6){
                        _ge(c.formId).submit();
                        b.preventDefault()
                    }
                    else c.submitForm()
                }
                else{
                    c.searchEmailFunc(c.getValue());
                    s();
                    b.preventDefault()
                }
                
            });
            if(e[1])jQuery(b(e[1])).bind("click",function(){
                w(c.getValue());
                $SB.logEvent(z[d][1]);
                s()
            });
            if(e[2])jQuery(b(e[2])).bind("click",function(){
                w(c.getValue());
                $SB.logEvent(z[d][2]);
                s()
            });
            if(!c.usesForm)jQuery(_ge(c.submitId)).bind("click",function(a){
                c.searchEmailFunc(c.getValue());
                s();
                a.preventDefault()
            });
            jQuery(t).bind("focus",cb);
            jQuery(t).bind("focus",u);
            jQuery(t).bind("keyup",u);
            jQuery(window).bind("unload",B.dispose)
        }
        B.dispose=function(){
            var e=c.getHeaders(),f=e.length;
            for(var d=0;
            d<f;
            d++)jQuery(b(e[d])).unbind();
            jQuery("#"+c.submitId).unbind();
            jQuery(t).unbind();
            var a=g.binding;
            if(a){
                jQuery(a).unbind();
                a.dispose()
            }
            if(j){
                j.dispose();
                j=null
            }
            jQuery(window).unbind("unload",B.dispose)
        };
        function s(){
            var a=g.binding;
            a&&a.isOpen()&&a.hide()
        }
        function cb(a){
            K(a);
            F();
            if(I){
                u(a);
                I=false
            }
            
        }
        function F(){
            if(!D)j.initialize(Q);
            D=true
        }
        function K(f){
            if(G)return;
            G=true;
            var b=6;
            $B.rtl&&(b=7);
            ($B.IE||$B.Chrome||$B.Safari)&&(b=5);
            var c={
                x:-3,y:b
            }
            ,e={
                offset:c,nofocus:1,eventType:"click"
            };
            $menu.create(f,0,e);
            var a=g.binding;
            a&&jQuery(a).bind("EnterEvent",function(b,a){
                d=true;
                if(a)$BSI.navigateTo(jQuery(a).attr("href"))
            });
            a&&j.onTab&&jQuery(a).bind("TabEvent",function(b){
                j.onTab(b,a)
            })
        }
        function W(){
            var f=_ge(c.formId),g=c.renderMode,b=$SBC.firstHead,d=$SBC.secondHead,e=$SBC.bingHead,a=_ce("ul");
            a.className="c_m t_hovl c_search_menu";
            a.setAttribute("id",c.idPrefix+"menu");
            a.setAttribute("sutra","searchboxdropdown");
            if(b){
                c.primaryMenuItem=x(a,"t_hov",b,1,0,"SearchEmail");
                d&&(c.secondaryMenuItem=x(a,0,d,1,0,0))
            }
            c.bingMenuItem=x(a,b?0:"t_hov",e,0,b,0);
            f.appendChild(a);
            return a
        }
        function x(f,b,e,c,d,g){
            var a=_ce("li");
            g&&a.setAttribute("aId","SearchEmail");
            a.setAttribute("sutra","searchboxitem");
            a.innerHTML='<a href="javascript:;" target="'+(d?"_blank":"_top")+'" '+'class="'+(b?b+" ":"")+'c_search_heading">'+e.encodeHtml()+"</a>"+(c?'<span class="c_ms"></span>':"");
            f.appendChild(a);
            return a
        }
        function u(a){
            K(a);
            F();
            Y()
        }
        function Y(){
            if(A===null){
                A=setTimeout(function(){
                    if(r!==null){
                        C(r);
                        r=null
                    }
                    A=null
                }
                ,$SBC.queryInterval);
                C(c.getValue())
            }
            else r=c.getValue()
        }
        function C(a){
            if(a===p)return;
            p=a;
            if(!Z(a)&&R(a)){
                if(!j.getMatches(q(a))){
                    M(a,true);
                    !H&&y(true);
                    H=true
                }
                
            }
            else Q([],q(a))
        }
        function w(e){
            var a=c.getHeaders(),h=b(a[a.length-1]),g=a.length>1&&b(a[0]),f=a.length>2&&b(a[1]),d;
            if(g){
                (d=m(c,e))&&g.setAttribute("href",d);
                f&&(d=k(c,e))&&f.setAttribute("href",d)
            }
            h.setAttribute("href",o(e))
        }
        function Q(b,g){
            if(q(p)!==g)return;
            var e=L;
            y(false);
            P();
            var f=M(p,false);
            c.renderMode===a.HOTMAIL&&(b.length=Math.min(b.length,$SBC.max-f));
            for(var d=0;
            d<b.length;
            d++)e=N(b[d],e);
            U(b.length,p);
            O()
        }
        function q(a){
            return f?f.removeKeywords(a):a
        }
        function Z(a){
            return q(a).trim().length===0
        }
        function M(g,d){
            if(f){
                var a=f.getMailItems(g,c),e=ab;
                d&&P();
                for(var b=0;
                b<a.length;
                b++)e=N(a[b],e);
                d&&O();
                return a.length
            }
            return 0
        }
        function U(d,e){
            if(f&&c.renderMode===a.HOTMAIL)b(c.getEmailHeader()).innerHTML=f.getHeaderText(d,e).encodeHtml()
        }
        function R(b){
            if(f&&c.renderMode===a.HOTMAIL)return f.queryStartsWithKeyword(b)!=="subject:";
            return true
        }
        function O(){
            X();
            g.binding.update()
        }
        function P(){
            var a=0,b=g.childNodes,e=null,f=c.getHeaders();
            while(b.length>a){
                var d=b[a];
                e=d.className;
                if(e===h){
                    jQuery(d.firstChild).unbind();
                    g.removeChild(d);
                    b=g.childNodes
                }
                else a++
            }
            for(var a=0;
            a<f.length-1;
            a++)T(f[a])
        }
        function T(c){
            var a=null,b=c.childNodes;
            for(a=0;
            a<b.length;
            a++)if(b[a].className===e){
                c.removeChild(b[a]);
                break
            }
            
        }
        function X(){
            var f=c.getHeaders(),a=null,b=null;
            for(var d=1;
            d<f.length;
            d++){
                a=f[d].previousSibling;
                while(a&&a.nodeType!==1)a=a.previousSibling;
                if(a){
                    b=_ce("SPAN");
                    b.className=e;
                    a.appendChild(b)
                }
                
            }
            
        }
        function N(c,b){
            var a=_ce("LI");
            a.setAttribute("sutra","searchboxitem");
            a.className=h;
            a.appendChild(c);
            g.insertBefore(a,b.nextSibling);
            return a
        }
        function y(a){
            S();
            i.style.display=a?"inline":"none";
            a&&setTimeout(function(){
                y(false)
            }
            ,$SBC.lt)
        }
        function S(){
            if(i===null){
                i=new Image;
                i.setAttribute("src",$SBC.ldImg);
                i.style.display="none";
                i.className="c_search_ld";
                b(L).appendChild(i)
            }
            
        }
        bb()
    };
    $SB.bindAllSearchBoxes=function(b){
        for(var c in $SB.sbs){
            var a=$SB.sbs[c];
            a.UI=new n(a,new b(a));
            $Config.isINT&&_ge(a.statusId).setAttribute("status","Ready")
        }
        
    };
    $SB.disposeAllSearchBoxes=function(){
        for(var a in $SB.sbs){
            var b=$SB.sbs[a];
            b.UI.dispose()
        }
        
    };
    $Do.register("$SB")
};
new function(){
    var L="<strong>",M="</strong>",o=new $Enum("documents","picw"),c="setAttribute",F={
        canary:$SBC.canary,bicild:""
    }
    ,p="javascript:;",a;
    function G(a){
        return function(e,f){
            var c=a(e),d=a(f),b=0;
            if(c>d)b=1;
            else if(c<d)b=-1;
            return b
        }
        
    }
    function y(f,e,g){
        var a={},c=[e,F];
        switch(f){
            case o.documents:a.scope="documentsearch"
        }
        a.callback="$SB."+g;
        for(var b=0;
        b<c.length;
        b++)for(var d in c[b])a[d]=c[b][d];
        return $SBC.ufs+"?"+$Utility.serialize(a)
    }
    function m(a){
        if(!a)return false;
        return $Network.extractHost(a).endsWith("live"+($Config.isINT?"-int":"")+".com")
    }
    var q=" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",I=new RegExp("["+q.escapeRegex()+"]","ig");
    function k(d){
        var b=[],a=null,c=null;
        if(d){
            b.push(a=d.lTrim());
            while((c=a.search(I))!=-1)b.push(a=a.substring(c+1).lTrim())
        }
        return b
    }
    function g(k,l,g,d,i,b,f,h,j,e){
        var a=_ce("A");
        if(b)a.className=b;
        a[c]("title",k);
        a[c]("target",f?"_blank":"_top");
        a[c]("href",l);
        jQuery(a).bind("click",function(c){
            var b=g(c);
            $menu.closeCurrent();
            $SB.logEvent(h,a.sbindex||"");
            return b
        });
        d&&a.appendChild(d);
        a.appendChild(i);
        a.sbbinding=j;
        e&&(a.sbindex=e);
        return a
    }
    function v(f,h,g,e,b){
        var a=new Image,d=C(f,a,e);
        jQuery(a).bind("load",D(a));
        a.className="c_search_imgpad c_search_img"+(b?" "+b:"");
        a[c]("alt",h);
        a[c]("src",$ssl.ensureSSLImageUrl(H(f,g,e)));
        if(d)jQuery(a).bind("error",d);
        return a
    }
    function H(c,b,a){
        if(c.defaultImage)return a;
        return b
    }
    function D(a){
        return function b(){
            a.style.visibility="inherit";
            jQuery(a).unbind("load",b)
        }
        
    }
    function C(a,b,e){
        if(a.defaultImage)return null;
        return function d(){
            a.defaultImage=true;
            b[c]("src",$ssl.ensureSSLImageUrl(e));
            jQuery(b).unbind("error",d)
        }
        
    }
    function l(b){
        var a=_ce("SPAN");
        a.className="c_search_txt";
        a.innerHTML=b;
        return a
    }
    var x={
        a:/[\xE0-\xE4]/ig,e:/[\xE8-\xEB]/ig,i:/[\xED-\xEF]/ig,o:/[\xF3-\xF5]/ig,u:/[\xF9-\xFC]/ig,n:/\xF1/ig,y:/\xFF/ig,c:/\xE7/ig
    };
    function i(a){
        a=a.toLowerCase();
        for(var b in x)a=a.replace(x[b],b);
        return a
    }
    var e="",f="";
    function j(a,b,d){
        var c=h.match(a)?h.highlight(a,b):t(a,b,d);
        return c.encodeHtml().replace(new RegExp(e.encodeHtml(),"g"),L).replace(new RegExp(f.encodeHtml(),"g"),M)
    }
    function t(c,p,o){
        var m=[p].concat(p.split(" ")),b=new Array(c.length+2),r="(^|\\s"+(o?"|@":"")+(!o?"|["+q.escapeRegex()+"]":"")+")";
        for(var a=0;
        a<b.length;
        a++)b[a]=0;
        for(var a=0;
        a<m.length;
        a++){
            var s=m[a],l=i(c).replace(new RegExp(r+"("+i(s).escapeRegex()+")","ig"),"$1"+e+"$2"+f),n=0,d=0,h=0;
            while((n=l.indexOf(e,d))!=-1){
                d=l.indexOf(f,d+1);
                h+=2;
                for(var k=n-h+2;
                k<d-h+1;
                k++)b[k+1]=1
            }
            
        }
        var g=[];
        for(var a=1;
        a<b.length;
        a++)if(b[a]!=b[a-1])g.push(a-1);
        var j=0;
        for(var a=0;
        a<g.length;
        a++){
            j=g[a]+a;
            c=c.substr(0,j)+(a%2?f:e)+c.substr(j)
        }
        return c
    }
    var s=$SB.MailSearchHelper=new function(){
        var c=this,b={
            FROM:$SBC.from,SUBJECT:$SBC.subject,TO:$SBC.to
        }
        ,h={
            NORMAL:$SBC.emailHead,FROM:$SBC.emailFrom,TO:$SBC.emailTo
        }
        ,e=[b.FROM,b.SUBJECT,b.TO],a=["from:","subject:","to:"],f=null;
        c.keywords=b;
        c.getMailItems=function(f,q){
            var r=d(f),n=[];
            if(!c.queryStartsWithKeyword(r)){
                var o=null,b=null,k;
                for(var h=0;
                h<e.length;
                h++){
                    b=e[h];
                    o=['<span class="c_search_k">',b,"</span> <strong>",f.encodeHtml(),"</strong>"].join("");
                    k=g(i(b,f),p,j(a[h],f,q),null,l(o),null,false,m(b),null,null);
                    k.sbmail={
                        k:b.trim(),q:f.trim()
                    };
                    n.push(k)
                }
                
            }
            return n
        };
        c.removeKeywords=function(a){
            return a.replace(k(),"")
        };
        c.getHeaderText=function(e,f){
            var b=null;
            if(e&&(b=c.queryStartsWithKeyword(d(f)))&&b!==a[1])switch(b){
                case a[0]:return h.FROM;
                case a[2]:return h.TO
            }
            return h.NORMAL
        };
        c.queryStartsWithKeyword=function(c){
            c=d(c);
            for(var b=0;
            b<a.length;
            b++)if(c.startsWith(d(a[b]))||c.startsWith(d(e[b])))return a[b];
            return null
        };
        function k(){
            if(!f){
                var b=a.clone();
                b.addRange(e);
                f=new RegExp("^\\s*("+b.join("|")+")","ig")
            }
            return f
        }
        function m(a){
            switch(a){
                case b.FROM:return "HM_from";
                case b.TO:return "HM_to";
                case b.SUBJECT:return "HM_subject";
                default:return ""
            }
            
        }
        function j(b,c,a){
            return function(d){
                a.searchEmailFunc(i(b,c));
                d.preventDefault()
            }
            
        }
        function i(a,b){
            return a+" "+b
        }
        function d(a){
            return a.toLowerCase()
        }
        
    }
    ,h=new function(){
        var b=this,g=new RegExp("([\\uAC00-\\uD7AF])","g"),n=44032,h=4352,i=4449,j=4519,p=e,a=f,d={
            "ㄱ":"ᄀ","ㄲ":"ᄁ","ㄴ":"ᄂ","ㄷ":"ᄃ","ㄸ":"ᄄ","ㄹ":"ᄅ","ㅁ":"ᄆ","ㅂ":"ᄇ","ㅃ":"ᄈ","ㅅ":"ᄉ","ㅆ":"ᄊ","ㅇ":"ᄋ","ㅈ":"ᄌ","ㅉ":"ᄍ","ㅊ":"ᄎ","ㅋ":"ᄏ","ㅌ":"ᄐ","ㅍ":"ᄑ","ㅎ":"ᄒ"
        }
        ,l=k(d),o=new RegExp("([\\u1100-\\u1112][\\u1161-\\u1175][\\u11A8-\\u11C2]{0,1})","g"),m=new RegExp("([\\u1100-\\u1112]"+a+"{0,1}[\\u1161-\\u1175]"+a+"{0,1}[\\u11A8-\\u11C2]{0,1})","g");
        b.expand=function(a){
            a=a.replace(l,function(a){
                return d[a]
            });
            return a.replace(g,function(f){
                var a=f.charCodeAt(0)-n,b=Math.floor(a/588),e=Math.floor((a-b*588)/28),d=a%28;
                return c(b+h)+c(e+i)+(d?c(d+j):"")
            })
        };
        b.highlight=function(e,f){
            var d=t(b.expand(e),b.expand(f),0);
            return d.replace(m,function(b){
                return b.replace(a,"")+(b.match(a)?a:"")
            }).replace(o,function(a){
                var b=a.charCodeAt(0)-h,d=a.charCodeAt(1)-i,e=a.length>2?a.charCodeAt(2)-j:0;
                return c(b*588+d*28+e+44032)
            })
        };
        b.match=function(a){
            return a.match(g)
        };
        function c(a){
            return String.fromCharCode(a)
        }
        function k(){
            var a=["(["];
            for(var b in d)a.push(b);
            a.push("])");
            return new RegExp(a.join(""),"g")
        }
        
    }
    ,b=function(d,b,c){
        var a=this;
        a.key=d;
        a.weight=b;
        a.order=c
    }
    ,d=new function(){
        var b=this,a=new $Enum("VIEWPHOTOS","SEARCHEMAIL","SENDEMAIL","SENDMESSAGE","DOCSEDIT","DOCSPROPERTY"),c=new function(){
            var b=this;
            b[a.VIEWPHOTOS]=$SBC.viewPhotos;
            b[a.SEARCHEMAIL]=$SBC.searchEmail;
            b[a.SENDEMAIL]=$SBC.sendEmail;
            b[a.SENDMESSAGE]=$SBC.sendMsg;
            b[a.DOCSEDIT]=$SBC.docsEdit;
            b[a.DOCSPROPERTY]=$SBC.docsProperty
        };
        b.actionTypes=a;
        b.isActionPosition=function(a){
            return a===0
        };
        b.getActionNode=function(b,h,a,i,d){
            var f=function(b){
                if(a)return a(b);
                return true
            }
            ,e=c[b];
            return g(e,h,f,null,document.createTextNode(e),"c_search_ai"+(d?" "+d:""),i,"QA_"+b,null,null)
        }
        
    }
    ,K=function(){
        var a=this,m=$SBC.docsBase+"/default.png",i={
            query:"*","ds.OwnedByMe":"1","ds.Acled":"1",maxitems:"4000","ds.o.WordWheelView":"1"
        }
        ,f=d.actionTypes,e=d.getActionNode,h="c_search_d";
        a.localStorageKey="documents";
        a.getResults=function(c){
            var b=c.SearchResponse.DocumentSearch||[];
            for(var a=0;
            a<b.length;
            a++)b[a].sbid=a;
            return b
        };
        a.getSource=function(a){
            return y(o.documents,i,a)
        };
        a.comparer=function(a,b){
            return a.sbid-b.sbid
        };
        a.matchField=function(a){
            return a.t
        };
        a.getHtml=function(c,e){
            var b=[];
            for(var a=0;
            a<c.length;
            a++){
                b.push(p(c[a],e,a+1));
                d.isActionPosition(a)&&r(b,c[a])
            }
            return b
        };
        a.getKeysAndWeights=function(f){
            var d=k(f.t.toLowerCase()),c=[],a=d.length;
            a&&c.push(new b(d[0],1.5,1));
            for(var e=1;
            e<a-1;
            e++)c.push(new b(d[e],1,e+1));
            a&&c.push(new b(d[a-1],.5,a));
            return c
        };
        a.autoComplete=function(a){
            return a.t
        };
        a.compareParents=null;
        a.isValid=function(){
            return true
        };
        function r(b,c){
            var d=e(f.DOCSEDIT,$SBC.docsAction.format("edit",c.id),null,false,h),a=e(f.DOCSPROPERTY,$SBC.docsAction.format("self",c.id),null,false,h);
            $css.add(a,"c_search_last");
            b.push(d);
            b.push(a)
        }
        function p(a,d,b){
            return g(c(a),u(a),function(){
                return true
            }
            ,t(a),n(a,d),null,false,"WW_documents",a,b)
        }
        function c(a){
            return a.t
        }
        function u(a){
            return $SBC.docsAction.format("view",a.id)
        }
        function t(a){
            var e=s(a),d=$SBC.imgsBase,b=_ce("span"),f=0;
            b.className="c_search_imgpad";
            b.appendChild(!$B.rtl&&e!=null?$IS.Create(e,8,16,16,d,d+"h/s6.png",c(a)):v(a,c(a),q(a),m,0));
            return b
        }
        function q(a){
            return $SBC.imgsBase+"ftype/"+a.ty+".png"
        }
        function s(b){
            var a=46;
            switch(b.ty){
                case "ppt":return a+16*2;
                case "doc":return a+16*3;
                case "xls":return a+16;
                case "one":return a
            }
            return null
        }
        function n(a,b){
            return l(j(a.t,b))
        }
        
    }
    ,n=function(z,Q){
        var e=this,x=$SBC.utfb,u=z.contactOverride,E={
            "cs.DisableNickNames":1,"cs.shellcontacts":1
        }
        ,t=d.actionTypes,a=Q,f=z,i=$SB.renderModes,r=d.getActionNode;
        if($SBC.https)E["cs.httpsusertileonly"]=1;
        e.getResults=function(c){
            var b=c.SearchResponse.People;
            for(var a=0;
            a<b.length;
            a++)b[a].id=a;
            return b
        };
        e.getSource=function(a){
            return y(o.picw,{},a)
        };
        e.comparer=G(N);
        e.matchField=function(a){
            return h(n(a))
        };
        e.getHtml=function(c,e){
            var b=[];
            for(var a=0;
            a<c.length;
            a++){
                b.push(L(n(c[a]),e,a+1));
                d.isActionPosition(a)&&O(b,n(c[a]))
            }
            return b
        };
        e.getKeysAndWeights=function(a){
            a=n(a);
            var l=h(a),e=k(l||c(a)),d=[];
            e[0]&&d.push(new b(e[0],1.5,1));
            for(var f=1;
            f<e.length;
            f++)d.push(new b(e[f],1,f+1));
            if(q(a)){
                var i=k(a.get_network().get_name());
                for(var g=0;
                g<i.length;
                g++)d.push(new b(i[g],.75,g+1))
            }
            else if(l&&c(a)){
                var j=c(a).toLowerCase();
                d.push(new b(j,.75,1));
                d.push(new b(j.split("@")[1],.5,1))
            }
            return d
        };
        e.autoComplete=function(b){
            var d=c(b),g=h(b),e=f.renderMode==i.HOME;
            return a||e&&d?d:g
        };
        e.isValid=a?function(){
            return true
        }
        :function(a,b){
            return a.pId!=b.pId
        };
        e.compareParents=a?null:function(a,b){
            var c=a.pId-b.pId;
            if(c)return c;
            return a.lcOrder-b.lcOrder
        };
        function L(b,d,c){
            return g(B(b),A(b),function(a){
                return H(b,a)
            }
            ,a||f.renderMode===i.CONTACTLIST?null:P(b),K(b,d),null,!m(A(b)),"WW_contacts",b,c)
        }
        function H(b,c){
            if(u)return u(b,c);
            if(a){
                var d=s.queryStartsWithKeyword(f.getValue())||"";
                f.searchEmailFunc(d+" "+w(b));
                c.preventDefault()
            }
            return true
        }
        function O(h,d){
            if(F()){
                var a=null,e=null,b=null;
                switch(f.renderMode){
                    case i.HOME:e=r(t.SEARCHEMAIL,p,function(a){
                        f.searchEmailFunc(w(d));
                        a.preventDefault()
                    }
                    ,false,0);
                    break;
                    case i.OTHER:if(a=D(d))e=r(t.VIEWPHOTOS,a,null,!m(a),0);
                    break;
                    default:return
                }
                if((q(d)||!c(d))&&(a=I(d)))b=r(t.SENDMESSAGE,a,null,!m(a),0);
                else if(!q(d)&&(a=J(d)))b=r(t.SENDEMAIL,a,null,false,0);
                var g=null;
                if(e&&!b)g=e;
                else if(b)g=b;
                g&&$css.add(g,"c_search_last");
                e&&h.push(e);
                b&&h.push(b)
            }
            
        }
        function F(){
            return !a&&(f.renderMode===i.HOME||f.renderMode===i.OTHER)
        }
        function w(a){
            return c(a)||h(a)||""
        }
        function D(a){
            if(a.get_photosUrl){
                var b=a.get_photosUrl()||"";
                return b.toString()
            }
            return 0
        }
        function J(b){
            var a=c(b);
            if(a)return $SBC.sendEmailLink.replace("{address}",a.encodeUrl().encodeUrl()).replace("{ru}",window.location.href.encodeUrl().encodeUrl());
            return null
        }
        function I(a){
            if(a.get_sendMessageUrl){
                var b=a.get_sendMessageUrl()||"";
                return b.toString()
            }
            return 0
        }
        function q(a){
            return a.get_network&&a.get_network().get_id()!="WL"
        }
        function B(b){
            var d=h(b),a=c(b);
            return (d||a||"")+(d&&a?C(a):"")
        }
        function C(a){
            return $B.rtl?" - "+a:" ("+a+")"
        }
        function A(b){
            var d=null;
            if(!(u||a)){
                var c=b.get_profileUrl()||"";
                return c.toString()||$SBC.profDet.format(b.get_id())
            }
            return p
        }
        function P(a){
            return v(a,B(a),M(a),x,"c_search_lg")
        }
        function K(a,d){
            var e=h(a)||"",g=c(a)||"",b="",f="";
            if(q(a))b=a.get_network().get_name();
            else if(e)b=g;
            f=(e?j(e,d):j(g,d,true))+(b&&!$B.rtl?' <span class="c_search_e">('+j(b,d,!q(a))+")</span>":"");
            return l(f)
        }
        function M(a){
            var b=a.get_displayPictureUrl()||"";
            return b.toString()||x
        }
        function h(b){
            return a?b.n:b.get_fullName()
        }
        function c(b){
            return a?b.e:b.get_emailAddress()
        }
        function N(b){
            return a?b.id:n(b).get_id()
        }
        function n(b){
            return a?b:b.c
        }
        
    };
    $SB.ContactsHelper=n;
    var u=1,r=function(w,jb,ib,E){
        var g=this,l=null,e=w,j=null,v=false,M=false,k=null,T=/\s+/g,L="searchCallback"+u++,I="wlxSB",b=null,Q="wlximlocalstoreready",Z="searchboxlocalstore",x=false,H=false,q=false,c=jb||function(){
            var a=$SB.renderModes;
            switch(e.renderMode){
                case a.HOTMAIL:return new n(w,true);
                case a.HOME:case a.OTHER:case a.CONTACTLIST:return new n(w,false);
                case a.DOCUMENTS:return new K;
                default:return null
            }
            
        }
        (),B="cid",C="xid",f="data",d=[],hb=c.comparer;
        function kb(){
            db()&&D();
            $SB[L]=S
        }
        g.dispose=function(){
            if(b)b.remove_initialized(m);
            if(q)jQuery(a).unbind("stateChange",p)
        };
        g.getMatches=function(k){
            X();
            if(!v){
                j=k;
                return false
            }
            Y(k);
            var h=U(k),w=c.matchField,f=[],g=null,b=null;
            if(h==""){
                l([],k);
                return true
            }
            g=J(h);
            for(var a=0;
            a<g.length;
            a++){
                b=g[a];
                f.push({
                    obj:b.obj,weight:w(b.obj).toLowerCase()==h?b.weight+1.5:b.weight,bucket:0
                })
            }
            var i=h.split(" ");
            if(i.length>1)for(var a=0;
            a<i.length;
            a++){
                g=J(i[a]);
                for(var p=0;
                p<g.length;
                p++){
                    b=g[p];
                    f.push({
                        obj:b.obj,weight:b.weight-.1*Math.abs(a+1-b.order),bucket:a+1
                    })
                }
                
            }
            var e=[];
            if(f.length){
                var s=c.compareParents?[bb]:[];
                s.addRange([A,ab]);
                f.sort(z(s));
                var d=null,m=null,o=null,n=null,u=i.length>1?i.length:0,r=function(a){
                    d=a;
                    m=d.bucket;
                    o=m==0?0:1
                }
                ,t=function(){
                    (!n||c.isValid(n.obj,d.obj))&&o==u&&e.push(n=d)
                };
                r(f[0]);
                for(var a=1;
                a<f.length;
                a++){
                    var b=f[a];
                    if(A(d,b)){
                        t();
                        r(b)
                    }
                    else{
                        d.weight=d.weight+b.weight;
                        if(m!=b.bucket){
                            m=b.bucket;
                            o++
                        }
                        
                    }
                    
                }
                t()
            }
            e.sort(z([cb,P]));
            e.length=Math.min(e.length,ib||$SBC.max);
            var q=new Array(e.length);
            for(var a=0;
            a<e.length;
            a++)q[a]=e[a].obj;
            var x=c.getHtml(q,h);
            l(x,k);
            return true
        };
        g.onTab=function(m,l){
            var j=l.getSelectedEl(),b=j.sbbinding,f=j.sbmail;
            if(b||f){
                if(b){
                    var a=e.getValue(),k=c.autoComplete(b),i=[],h=a.length-s.removeKeywords(a).length;
                    d.push(k);
                    for(var g=0;
                    g<d.length;
                    g++)i.push(t(d[g]));
                    e.setValue([a.substring(0,h),h?" ":"",i.join(" ")," "].join(""))
                }
                else{
                    d=[];
                    e.setValue(f.k+" "+f.q+" ")
                }
                m.preventDefault()
            }
            
        };
        function z(a){
            return function(d,e){
                var c=0,b=0;
                while(c<a.length&&!(b=a[c++](d,e)));
                return b
            }
            
        }
        function bb(a,b){
            return c.compareParents(a.obj,b.obj)
        }
        function ab(a,b){
            return a.bucket-b.bucket
        }
        function A(a,b){
            return hb(a.obj,b.obj)
        }
        function P(b,d){
            var a=c.matchField;
            return a(b.obj).length-a(d.obj).length
        }
        function cb(a,b){
            return b.weight-a.weight
        }
        function Y(c){
            var a=0,b;
            while(a<d.length){
                b=t(d[a]);
                if(c.indexOf(b)==-1)d.splice(a,1);
                else{
                    c=c.replace(b,"");
                    a++
                }
                
            }
            
        }
        function t(a){
            return a
        }
        g.initialize=function(a){
            !l&&(l=a);
            D()
        };
        function D(){
            if(!v&&!M){
                M=true;
                if(e.renderMode==$SB.renderModes.HOTMAIL)r();
                else $Do.when(Q,0,R)
            }
            
        }
        function R(){
            a=$WLXIM;
            if(e.renderMode==$SB.renderModes.DOCUMENTS){
                b=new a.ML.Core.LocalStorageProxy(Z);
                b.add_initialized(m)
            }
            else if(a.hasContacts())y();
            else{
                jQuery(a).bind("stateChange",p);
                q=true
            }
            
        }
        function p(){
            if(a.hasContacts()){
                jQuery(a).unbind("stateChange",p);
                q=false;
                setTimeout(y,1)
            }
            
        }
        function eb(d,b,c){
            var a=this;
            a.pId=d;
            a.lcOrder=b;
            a.c=c
        }
        function y(){
            var h=[],i=a.user,d=[i.get_contacts(),i.get_emailOnlyContacts()],f=0;
            for(var b=0;
            b<d.length;
            b++){
                var k=d[b].get_count();
                for(var e=0;
                e<k;
                e++){
                    var g=d[b].get_item(e).get_linkedContacts(),j=g.get_count();
                    for(var c=0;
                    c<j;
                    c++)h.push(new eb(f,c,g.get_item(c)));
                    f++
                }
                
            }
            o(h)
        }
        function m(e,d){
            if(x)return;
            x=true;
            if(d.get_status()!=a.ML.Core.LocalStorageStatus.initialized){
                b.remove_initialized(m);
                b=null;
                r()
            }
            else{
                $Logout.add(G);
                var c=N();
                if(!c)r();
                else o(c)
            }
            
        }
        function U(a){
            a=fb(a);
            return a.toLowerCase().trim().replace(T," ")
        }
        function fb(a){
            for(var b=0;
            b<d.length;
            b++)a=a.replace(t(d[b]),"");
            return a
        }
        function J(a){
            return k.matchPrefix(i(h.expand(a)))
        }
        function S(d){
            var a=c.getResults(d);
            if(b)if(c.localStorageKey&&a)O(a);
            o(a)
        }
        function o(a){
            gb(a);
            v=true;
            if(E)a=E(a);
            if(j){
                g.getMatches(j);
                j=null
            }
            
        }
        function gb(d){
            k=new $Trie;
            for(var a=0;
            a<d.length;
            a++){
                var f=c.getKeysAndWeights(d[a]);
                for(var e=0;
                e<f.length;
                e++){
                    var b=f[e];
                    k.insert(i(h.expand(b.key.toLowerCase().trim())),{
                        obj:d[a],weight:b.weight,order:b.order
                    })
                }
                
            }
            k.sort()
        }
        function r(){
            $Network.fetchScript(c.getSource(L),function(){},null)
        }
        function N(){
            return V(c.localStorageKey)
        }
        function O(a){
            W(c.localStorageKey,a)
        }
        function V(a){
            F();
            return b.get_item(f)[a]
        }
        function W(d,c){
            F();
            var a=b.get_item(f);
            a[d]=c;
            b.set_item(f,a)
        }
        function F(){
            var a=$Config.cid,c=$Config.BSI.xid;
            if(a!=b.get_item(B)||c!=b.get_item(C)||typeof(b.get_item(f)!=="object")){
                G();
                b.set_item(B,a);
                b.set_item(C,c);
                b.set_item(f,{})
            }
            
        }
        function G(){
            b.clear()
        }
        function db(){
            return $Cookie.getCookie(I,0)==="1"
        }
        function X(){
            if(!H){
                var a=new Date;
                a.setDate((new Date).getDate()+$SBC.dateOffset);
                $Cookie.setCookie(I,"1",$Config.sd,0,a,0);
                H=true
            }
            
        }
        kb()
    };
    $SB.WindowsLiveProvider=r;
    var w="<strong>",z="</strong>",A=/&#57344;/g,B=/&#57345;/g,E=/[\uE000\uE001]/g,J="c_search_bi",N=function(j){
        var a=this,d="bingCompleted"+u++,l=$SBC.bingAuto+"?JsonCallback=$SB."+d.encodeUrl()+"&Market="+$Config.mkt.encodeUrl()+"&Options=EnableHighlighting"+"&JsonType=callback"+($SB.formCode?"&form="+$SB.formCode.encodeUrl():"")+"&Query=",b=null,f=null,e=j,k=e.renderMode==$SB.renderModes.SIGNOUT;
        a.dispose=function(){};
        a.getMatches=function(a){
            if(!$SBC.https&&$SBC.bingSupport){
                b=a;
                $Network.fetchScript(l+a.encodeUrl(),function(){},null)
            }
            return true
        };
        a.initialize=function(a){
            f=a
        };
        a.onTab=null;
        function i(e){
            if(c(b)===c(e.SearchSuggestion.Query)){
                var g=e.SearchSuggestion.Section||[],h=Math.min($SBC.max,g.length),d=new Array(h);
                for(var a=0;
                a<h;
                a++)d[a]=m(g[a].Text);
                f(d,b)
            }
            
        }
        function m(c){
            var a=_ce("A"),b=g(c);
            a.className=J;
            a.setAttribute("target",k?"_top":"_blank");
            a.setAttribute("href",$SB.getBingUrl(b));
            a.setAttribute("title",b);
            jQuery(a).bind("click",function(){
                e.setValue(b);
                $menu.closeCurrent();
                $SB.logEvent("WW_bing");
                return true
            });
            a.innerHTML="<span>"+h(c.encodeHtml())+"</span>";
            return a
        }
        function h(a){
            return w+a.replace(A,z).replace(B,w)+z
        }
        function g(a){
            return a.replace(E,"")
        }
        function c(a){
            return a.toLowerCase().trim()
        }
        $SB[d]=i
    };
    try{
        $SB.bindAllSearchBoxes($SBC.bingSearch?N:r)
    }
    catch(O){}
};
(function(){
    var a=window.jQuery,g=window.wLive,e=window.sutra;
    if(!a||!g.Core||!g.Core.PageController)return;
    var k=window,h=a(k),x=a(document),b=k.wLive.Controls,c=k.wLive.Core,ab="fetch",cb="write",E="photos",Z="documents",gb="shared",fb="SetView",bb="SelfView",eb="PdfView",sb="mru",s="live.shared.skydrive.",v=".UI_Popover",D="live.shared.marketinfo.",p="click",H="contextmenu",z="scroll",Ab="resize",L="keydown",G="selectstart",Cb="blur",wb="mouseup",mb="mousedown",ib="mouseenter",nb="mousemove",jb="mouseleave",rb="mouseout",kb=$B.IE?"MSPointerDown":"touchstart",ob=$B.IE?"MSPointerMove":"touchmove",tb=$B.IE?"MSPointerUp":"touchend",ub=46,db=8,M=13,K=27,Q=113,J="input",y="span",t="div",u="a",lb="visibility",yb="hidden",xb="visible",qb="disabled",Bb="title",Eb="href",Gb="src",Fb="alt",P=true,O=false,F="",Db="#",zb=".",o=window["File"]&&(window["File"].prototype.slice||window["File"].prototype.mozSlice||window["File"].prototype.webkitSlice),N=$B.IE&&$B.V==10,q=c["SilverlightInstalled"]&&!$B.Firefox&&!N;
    c.SoftBlockEnum={};
    var hb=c.SoftBlockEnum={
        MoveAction:0,RenameAction:1,DeleteAction:2
    };
    function B(a,b){
        if(a==b)return true;
        if(a==null||b==null)return false;
        return a.toLowerCase()==b.toLowerCase()
    }
    function f(a){
        return GetString(s+"shared."+a)
    }
    function d(a){
        return GetString(s+"pc."+a)
    }
    function j(a,b,d){
        if(a&&b){
            var c=!d||a.commands===b.commands&&a.name===b.name;
            return a.key===b.key&&a.modifiedDate===b.modifiedDate&&c
        }
        else return false
    }
    function l(a){
        return a.is("textarea")||a.is("input")&&(a.attr("type")=="text"||a.attr("type")=="password")
    }
    function w(){
        return a(v).length>0&&a(v).is(":visible")
    }
    var r="ClickedSelected.Command.SkyDrive";
    function C(a,c,b){
        return function(){
            $BSI.reportEvent(c,b);
            return a&&a.apply(this,arguments)
        }
        
    }
    function A(a){
        return FilesConfig.isDependentOnNewStorageInterface||!a.group&&$Config.hcid&&a.ownerCid.toLowerCase()==$Config.hcid.toLowerCase()
    }
    var pb=f("AllFilesRootTitle"),vb=f("AllDocsRootTitle"),I=f("AllPhotosRootTitle"),R=f("DocsSharedWithMe"),W=f("GroupDocuments"),U=f("RecentDocuments"),V=f("SharedWithGroup"),n="itemId",m="up_folderdrop";
    (function(){
        var B='<div class="vl"><div class="pages"></div><div class="loadingContainer"></div></div>',F="<li><div>{0}</div></li>",m="li",t=".checkboxWrapper",P="div.vl",R="div.pages",n="index",J="shared",N="mru",y=".virtualList",C={},d=100,q=100,v=1,D=50,s=24,A=0,k,i,K,o=false,r=c.CommandManager,f=r.filters;
        b.VirtualizedList=E;
        function E(X,V,Jb){
            var lb=this,wb=V.dataModel,S=y+A++,rb=V.actionManager,T=V.selectionManager,qb=a(V.selectionManager);
            X.html(B);
            var yb=a(P,X),ab=a(R,X),pb=X.find(".loadingContainer"),Nb,Y,fb=false,E,Gb,U,Qb,kb,vb,jb=new b.LoadingCue(pb),zb,W={},db={},bb={};
            e(ab,"$Sutra.SkyDrive.DetailsListRows");
            h.bind(z+S,Sb);
            x.bind(L+S,Rb);
            X.bind(G+S,Ib);
            ab.delegate(m,p+S,Tb);
            ab.delegate(m,H+S,Lb);
            ab.delegate(t,p+S,Fb);
            qb.bind(c.SelectionManager.SelectionChangedEvent+S,hb);
            lb.render=function(a,d){
                Ob(d);
                var b=!E||a.key!==E.key||vb!==c.SkyDriveItem.getSetKeyParts(c.SkyDriveItem.getDefaultSetKey()).ft;
                if(Eb(a)||fb)Mb(b);
                if(!o)if(T.hasPreselectedChild(E)){
                    hb(null,T.getSelection());
                    o=true
                }
                ib();
                hb(null,T.getSelection())
            };
            lb.resize=function(){
                ib(true)
            };
            lb.dispose=function(){
                h.unbind(S);
                x.unbind(S);
                X.unbind(S);
                ab.undelegate(m,S);
                ab.undelegate(t,S);
                qb.unbind(S);
                tb();
                T.deselectAll();
                X.empty();
                Nb=true
            };
            function Mb(b){
                fb=false;
                yb.height(Z()*U);
                gb();
                bb={};
                if(b)T.deselectAll();
                else{
                    var a=T.resolveSelection(E);
                    if(a===c.SelectionManager.ResolveFailed)T.deselectAll();
                    else if(a===c.SelectionManager.ResolveWaiting)fb=true
                }
                tb()
            }
            function ib(a){
                if(a)gb();
                Cb();
                xb(true);
                domUpdates.enqueue(Ab,null,3,null,S)
            }
            function Cb(){
                var c=cb(v),b=true;
                for(var a=c.s;
                a<c.e;
                a++)if(!ub(a)&&b&&wb.hasPendingRequests(E.key)){
                    b=false;
                    pb.css({
                        top:Z()*a
                    });
                    jb.setVisibility(true)
                }
                b&&jb.setVisibility(false)
            }
            function Ab(){
                var b=cb(),a,d=Math.min(b.e+q,U);
                for(a=b.e+1;
                a<d;
                a++)ob(a,3);
                var c=Math.max(b.s-q,-1);
                for(a=b.s-1;
                a>c;
                a--)ob(a,3);
                xb(false)
            }
            function ob(b,a){
                domUpdates.enqueue(function(){
                    ub(b)
                }
                ,null,a,null,S)
            }
            function ub(e){
                var c=eb(e),g=false;
                if(!E._isLoadingItem&&!(U===1&&!wb.getChildByIndex(E,e))){
                    var f=W[c];
                    if(!f){
                        var j=a(_ce("ol")).css("top",c*d*Z()),h=d;
                        if(eb(U-1)==c)h=U%d||d;
                        f=W[c]=new b.VirtualizedListPage(j,V,E,h,Jb,i,zb)
                    }
                    g=f.populateItem(e)
                }
                return g
            }
            function xb(b){
                for(var a in W){
                    var c=W[a];
                    if(!db[a])b?sb(a):Db(a,3)
                }
                
            }
            function Db(b,a){
                domUpdates.enqueue(function(){
                    sb(b)
                }
                ,null,a,null,S)
            }
            function sb(a){
                db[a]=W[a];
                ab.append(db[a].getContainer())
            }
            function eb(a){
                return Math.floor(a/d)
            }
            function cb(a){
                if(!Y)Y=mb();
                var b={};
                b.s=a?Math.max(Y.s-a,0):Y.s;
                b.e=a?Math.max(Y.e+a,0):Y.e;
                return b
            }
            function gb(){
                Y=mb()
            }
            function mb(){
                var a=h.scrollTop()-X.offset().top,c=h.height()+a,b=Math.max(0,Math.min(Math.floor(a/Z()),U-1)),d=Math.max(b,Math.min(Math.floor(c/Z()),U-1));
                return {
                    s:b,e:d
                }
                
            }
            function Ob(c){
                zb=a.extend({},C,c);
                if(!i){
                    var b=Z();
                    K=b*d
                }
                
            }
            function Eb(b){
                var a=false;
                if(!E||b.key!==E.key)a=true;
                else if(c.SkyDriveItem.getDefaultSetKey()!==kb)a=true;
                else if(b.getChildren().getCount()!==U)a=true;
                Hb(b);
                return a
            }
            function Hb(a){
                E=a;
                Gb=a.getVersion();
                U=a.getChildren().getCount();
                kb=c.SkyDriveItem.getDefaultSetKey();
                Qb=Math.ceil(U/d);
                vb=c.SkyDriveItem.getSetKeyParts(kb).ft;
                domUpdates.abort(S)
            }
            function tb(){
                for(var b in W){
                    var a=W[b];
                    a.dispose()
                }
                W={};
                db={}
            }
            function Bb(c){
                var b,a=cb(-1);
                if(c<a.s&&c!==-1)b=a.s;
                else if(c>a.e&&a.e<U-2)b=a.e;
                if(b!=null){
                    var d=c-b;
                    h.scrollTop(h.scrollTop()+d*Z());
                    gb()
                }
                
            }
            function Z(){
                if(!k){
                    var b=a(F.format(I.encodeHtml())).css("visibility","hidden");
                    b.appendTo(yb);
                    var d=b.outerHeight(),c=b.height(),e=d-c;
                    k=Math.max(d,s);
                    i=Math.max(c,s-e);
                    b.remove()
                }
                return k
            }
            function Pb(a){
                var b=W[eb(a)];
                b&&b.selectItem(a)
            }
            function Kb(a){
                var b=W[eb(a)];
                b&&b.deselectItem(a)
            }
            function nb(){
                var b,a=T.getSelection();
                if(a.selectionCount===1)for(var c in a.indexes){
                    b=E.getChildren().get(c);
                    break
                }
                return b
            }
            function Sb(){
                g.throttle(z+S,D,function(){
                    ib(true)
                });
                jb.update();
                domUpdates.abort(S)
            }
            function Rb(b){
                var d=b.which,h=b.ctrlKey||b.metaKey,c=a(b.target);
                if(w()||l(c)||c.is("button"))return true;
                if(d===M&&!c.is(u)){
                    var f=nb();
                    if(f){
                        var g=rb.getAction("DefaultClick",f);
                        if(g){
                            rb.doAction(g);
                            return false
                        }
                        
                    }
                    
                }
                else if(d===Q){
                    var e=nb();
                    if(e)a(V).trigger("Rename",e.key)
                }
                if(E&&E.folder&&!c.is(u))return T.keyboardSelect(E,d,{
                    ctrl:h,shift:b.shiftKey
                })
            }
            function Ib(b){
                if(!l(a(b.target)))return O
            }
            function Tb(b){
                if(!l(a(b.target))){
                    var f=b.ctrlKey||b.metaKey,e=b.shiftKey,c=a(b.srcElement).closest("a.fileAction");
                    if(c.size()===0){
                        var d=a(this).data(n);
                        T.clickSelect(E,d,{
                            ctrl:f,shift:e
                        });
                        return false
                    }
                    
                }
                
            }
            function Fb(b){
                var d=b.shiftKey,c=a(this).closest("li").data(n);
                T.clickSelect(E,c,{
                    ctrl:true,shift:d
                });
                b.stopPropagation()
            }
            function Lb(e){
                if(!e.shiftKey){
                    var h=a(this).data(n);
                    if(!T.isSelected(E,h))T.clickSelect(E,h);
                    var d=T.getSelection(),b=[];
                    if(d.selectionCount==1){
                        var g;
                        for(var l in d.indexes){
                            var k=d.parent;
                            g=k.getChildren().get(l);
                            break
                        }
                        if(g&&r.hideViewItem(V,g))b=b.concat(f.VI)
                    }
                    var c=V.viewParams,i=d.selectionCount>1&&(c.qt==J||c.qt==N||!FilesConfig.isDependentOnNewStorageInterface&&(c.group||$Config.hcid&&c.cid&&c.cid.toLowerCase()!=$Config.hcid.toLowerCase()));
                    if(i)b=b.concat(f.DEL);
                    else b=b.concat(f.DS);
                    var j={
                        pos:{
                            x:e.pageX,y:e.pageY
                        }
                        ,sp:V.infoPaneClosed,ev:e,bici:"CM",fil:b
                    };
                    V.contextMenu.render(null,d,j);
                    return false
                }
                
            }
            function hb(g,c){
                var f=c.parent,e=c.indexes,d=j(E,f);
                for(var a in bb)if(!e[a]||!d){
                    Kb(a);
                    delete bb[a]
                }
                if(d){
                    for(var b in e)if(!bb[b]){
                        Pb(b);
                        bb[b]=true
                    }
                    if(E)Bb(c.lastInteractedIndex)
                }
                
            }
            
        }
        
    })();
    (function(){
        var g=100,i=0,j="index",f="selected t_sel",d="checked",c="t_hbg";
        b.VirtualizedListPage=h;
        function h(k,q,n,r,o,s,l){
            var b=this,t=i++,m={},h={};
            p();
            b.dispose=function(){
                for(var a in h)h[a].dispose();
                k.remove()
            };
            b.populateItem=function(a){
                var d=a%g,e=n.getChildren().get(a),c=h[d];
                if(!c)if(e){
                    var f=m[d];
                    f.closest("li").data(j,a).css("visibility","visible");
                    c=h[d]=new o(f,l)
                }
                if(c)c.render(e);
                if(q.selectionManager.isSelected(n,a))b.selectItem(a);
                return !!e
            };
            b.selectItem=function(h){
                var g=b.getRow(h);
                g.addClass(f).removeClass(c);
                a('input[type="checkbox"]',g).attr(d,d);
                e(g,"$Sutra.SkyDrive.SelectedItemRow")
            };
            b.deselectItem=function(h){
                var g=b.getRow(h);
                g.removeClass(f).addClass(c);
                a('input[type="checkbox"]',g).removeAttr(d);
                e(g,"$Sutra.SkyDrive.ItemRowContainer")
            };
            b.getContainer=function(){
                return k
            };
            b.getRow=function(b){
                var c=m[b%g]||a();
                return c.closest("li")
            };
            function p(){
                for(var h=0;
                h<r;
                h++){
                    var b=_ce("li");
                    b.className=c;
                    if(l&&l["multiselect"]){
                        var f=_ce("input");
                        f.setAttribute("type","checkbox");
                        var d=_ce("div");
                        d.className="checkboxWrapper";
                        d.appendChild(f);
                        b.appendChild(d);
                        e(a(f),"$Sutra.SkyDrive.ItemCheckbox")
                    }
                    var i=_ce("span");
                    b.appendChild(i);
                    var g=a(b).css({
                        height:s,visibility:"hidden"
                    }),j=m[h]=g.find("span");
                    k.append(g);
                    e(g,"$Sutra.SkyDrive.ItemRowContainer")
                }
                
            }
            
        }
        
    })();
    (function(){
        b.DetailsListItem=c;
        function c(c,l){
            var h=this,g=l["columns"],d,f,b=[];
            h.render=function(a){
                if(a&&(!j(a,d)||a.getVersion()!==f)){
                    e();
                    c.empty();
                    d=a;
                    f=a.getVersion();
                    if(a&&a.folder)c.closest("li").data(n,a.id).addClass(m);
                    i()
                }
                
            };
            h.dispose=function(){
                e();
                c.empty()
            };
            function e(){
                for(var a=0,d=b.length;
                a<d;
                a++){
                    var c=b[a];
                    c.dispose()
                }
                b=[]
            }
            function i(){
                for(var a=0;
                a<g.length;
                a++)c.append(k(g[a]))
            }
            function k(g){
                var e=_ce(t);
                e.className=g.name+" column";
                var f=a(e),c=g.getContent(d);
                if(c.controls)b.addRange(c.controls);
                f.html(c.html);
                return f
            }
            
        }
        
    })();
    (function(){
        var o='<div class="detailsList"><div class="columnHeaders"></div><h3 class="titleBanner"></h3><div class="listContent"></div></div>',k='<span class="chevronDown c_chev">&#9660;</span>',l='<span class="chevronUp c_chev">&#9650;</span>',m='<span class="headerText">{0}</span>',d='input[type="checkbox"]',f="sorted",i=0,h=".setViewDetailsList";
        b.SetViewDetailsList=n;
        function n(x,w,N){
            var B=this,n=new g.Controls.DetailsListColumns(w),A=w.dataModel,s=w.selectionManager,C=a(s),y=h+i++;
            x.html(o);
            var P=x.find(".detailsList"),r=x.find(".columnHeaders"),F=x.find(".listContent"),E=x.find(".titleBanner"),D=true,q,v,z=new b.VirtualizedList(F,w,b.DetailsListItem);
            e(P,"$Sutra.SkyDrive.DetailsList");
            e(r,"$Sutra.SkyDrive.DetailsListColumnHeaders");
            r.delegate(d,p+y,O);
            C.bind(c.SelectionManager.SelectionChangedEvent+y,M);
            B.render=function(a,c){
                q=a;
                I(c);
                if(a){
                    if(!H(a))K(r);
                    G(r);
                    var b={
                        dataModel:A,columns:v,multiselect:D
                    };
                    z.render(a,b);
                    s.registerList(N["index"],a)
                }
                
            };
            B.resize=function(){
                z.resize()
            };
            B.dispose=function(){
                r.undelegate(d,y);
                C.unbind(y);
                z.dispose();
                s.unregisterList()
            };
            function I(a){
                if(a&&a.isSecondary)r.hide();
                else r.show();
                if(a&&a.headerText)E.html(a.headerText.encodeHtml()).show();
                else{
                    E.hide();
                    F.css("min-height",200+"px")
                }
                
            }
            function H(d){
                var a,b=v;
                if(d.did)a=[n.name,n.modifiedDate,n.fileType,n.size];
                else if(c.SkyDriveItemHelper.isMruQuery(d))a=[n.name,n.openedDate,n.location,n.lastModifiedBy,n.size];
                else if(c.SkyDriveItemHelper.isSharedQuery(d)||c.SkyDriveItemHelper.isGroupRoot(d))a=[n.name,n.modifiedDate,n.lastModifiedBy,n.owner,n.size];
                else a=[n.name,n.modifiedDate,n.lastModifiedBy,n.sharedWith,n.size];
                var f=true;
                if(!b||a.length!==b.length)f=false;
                else for(var e=0;
                e<b.length;
                e++)if(b[e]!==a[e]){
                    f=false;
                    break
                }
                v=a;
                return f
            }
            function K(l){
                var b=a(_ce(t));
                if(D){
                    var j=_ce(J);
                    j.setAttribute("type","checkbox");
                    b.append(j);
                    e(a(d,b),"$Sutra.SkyDrive.SelectAllCheckboxes");
                    if(c.SkyDriveItemHelper.isGroupRoot(q))a(d,b).css("visibility","hidden");
                    else a(d,b).css("visibility","visible")
                }
                for(var i=0;
                i<v.length;
                i++){
                    var f=v[i],g=_ce(t);
                    g.className=f.name;
                    g.innerHTML=m.format(f.title.encodeHtml());
                    g.title=f.title;
                    var h;
                    if(f.sortField!=null&&(f!==n.owner||!c.SkyDriveItemHelper.isGroupRoot(q))){
                        var k=a(_ce(u)).bind(p,{
                            column:f
                        }
                        ,Q);
                        k.html(g).attr("href","#");
                        h=k
                    }
                    else h=a(g);
                    e(h,"$Sutra.SkyDrive."+f.sutraLabel);
                    b.append(h)
                }
                e(b.find(".headerText"),"$Sutra.SkyDrive.HeaderText");
                l.html(b)
            }
            function G(b){
                a("."+f,b).removeClass(f).find(".c_chev").remove();
                var d=c.SkyDriveItem.getSetKeyParts(),g=n.getColumnFromSortField(d.sb),h=g.defaultSortIsReverse,i=h?d.sr:!d.sr;
                a("."+g.name,b).append(i?l:k).addClass(f);
                e(b.find(".chevronDown"),"$Sutra.SkyDrive.SortedDown");
                e(b.find(".chevronUp"),"$Sutra.SkyDrive.SortedUp")
            }
            function L(d){
                var a=c.SkyDriveItem.getSetKeyParts(),b=a["sb"],e=a["sr"];
                return d.sortField===b
            }
            function Q(e){
                var a=e.data["column"],b=a.sortField,d=L(a)?!c.SkyDriveItem.getSetKeyParts()["sr"]:0;
                w.sortBy(b,d);
                return false
            }
            function M(c,b){
                if(j(b.parent,q)&&b.selectionCount===A.getChildCount(q))a(d,r).attr("checked","checked");
                else a(d,r).removeAttr("checked")
            }
            function O(){
                if(q){
                    var a=s.getSelection();
                    if(j(a.parent,q)&&a.selectionCount===A.getChildCount(q))s.deselectAll(q);
                    else s.selectAll(q)
                }
                
            }
            
        }
        
    })();
    (function(){
        var j=c.SkyDriveItemHelper,e="DetailsList.Columns.{0}.DisplayName",i=d("SkyDriveProductName"),n=f("UsersSkyDrive"),l=d("ItemToolTip.SharedWith"),k=d("ItemToolTip.DateModified"),p=d("ItemToolTip.Type"),o=d("ItemToolTip.Size"),g="\r\n",h="fileAction",q=["openedDate","name","modifiedDate","createdDate","size","type","dateTaken","owner"];
        b.DetailsListColumns=m;
        function m(m){
            var f=this,r=m.dataModel;
            f.getColumnFromSortField=function(a){
                return f[q[a]]
            };
            f.name={
                name:"name",title:d(e.format("name")),sortField:"1",sutraLabel:"NameColumnHeader",getContent:function(e){
                    var u=e.name,q=m.actionManager.getAction("DefaultClick",e),s=q?m.actionManager.setATagAction(q):a(_ce("a")),f=a(_ce(y)).append(s),d=c.SkyDriveItemHelper.getIcon(e,16);
                    d.className+=" icon";
                    d.removeAttribute("dir");
                    d.removeAttribute("title");
                    s.append(d).addClass(h).attr("tabIndex",-1);
                    var n=_ce(y);
                    n.className="filename";
                    f.append(n);
                    $filename=a(".filename",f);
                    var i=new b.EditableText($filename,m,a.extend({},b.EditableText.RenameOptions,{
                        hc:true,de:true,ca:"DefaultClick",ac:h,ic:"detailsListNameInput",ec:"detailsListNameEdit",tt:t
                    }));
                    i.render(e);
                    function t(a){
                        var b=a.name+(a.extension&&!a.isUnknownFileType?a.extension:"");
                        if($B.IE){
                            var c=r.getItem(a.parentKey);
                            if(c&&!j.isSharedQuery(c)&&a.sharingLevel){
                                b+=g;
                                b+=l+" "+a.sharingLevel
                            }
                            b+=g;
                            b+=k+" "+a.displayModifiedDate;
                            b+=g;
                            b+=p+" "+j.getFriendlyFileType(a);
                            if(a.displaySize){
                                b+=g;
                                b+=o+" "+a.displaySize
                            }
                            
                        }
                        return b
                    }
                    return {
                        html:f,controls:[i]
                    }
                    
                }
                
            };
            f.openedDate={
                name:"openedDate",title:d(e.format("viewedDate")),sortField:"0",defaultSortIsReverse:true,sutraLabel:"LastViewedColumnHeader",getContent:function(a){
                    return {
                        html:c.DateFactory.getDate(a.lastAccess,a.displayLastAccess)
                    }
                    
                }
                
            };
            f.modifiedDate={
                name:"modifiedDate",title:d(e.format("modifiedDate")),sortField:"2",defaultSortIsReverse:true,sutraLabel:"LastModifiedColumnHeader",getContent:function(a){
                    return {
                        html:c.DateFactory.getDate(a.modifiedDate,a.displayModifiedDate)
                    }
                    
                }
                
            };
            f.fileType={
                name:"fileType",title:d(e.format("fileType")),sutraLabel:"FiletypeColumnHeader",getContent:function(a){
                    return {
                        html:c.SkyDriveItemHelper.getFriendlyFileType(a).encodeHtml()
                    }
                    
                }
                
            };
            f.lastModifiedBy={
                name:"lastModifiedBy",title:d(e.format("lastModifiedName")),sutraLabel:"ModifiedByColumnHeader",getContent:function(b){
                    var a=b.lastModifierName;
                    return {
                        html:a&&a.encodeHtml()
                    }
                    
                }
                
            };
            f.location={
                name:"location",title:d(e.format("location")),sutraLabel:"LocationColumnHeader",getContent:function(b){
                    var a;
                    if(c.SkyDriveItemHelper.isViewerOwner(b)){
                        var d=m.dataModel.getItem(b.parentKey);
                        if(!d||c.SkyDriveItemHelper.isRootItem(d))a=i;
                        else a=d.name
                    }
                    else if(!b.ownerName)a=i;
                    else a=n.format(b.ownerName);
                    return {
                        html:a.encodeHtml()
                    }
                    
                }
                
            };
            f.owner={
                name:"owner",title:d(e.format("owner")),sortField:"7",sutraLabel:"OwnerColumnHeader",getContent:function(a){
                    return {
                        html:!!a.ownerName&&a.ownerName.encodeHtml()
                    }
                    
                }
                
            };
            f.sharedWith={
                name:"sharedWith",title:d(e.format("sharedWith")),sutraLabel:"SharedWithColumnHeader",getContent:function(b){
                    var a=b.sharingLevel;
                    return {
                        html:a&&a.encodeHtml()
                    }
                    
                }
                
            };
            f.size={
                name:"size",title:d(e.format("size")),sortField:"4",defaultSortIsReverse:true,sutraLabel:"SizeColumnHeader",getContent:function(b){
                    var a=b.displaySize;
                    return {
                        html:a&&a.encodeHtml()
                    }
                    
                }
                
            }
            
        }
        
    })();
    (function(){
        var f=1.78,r=1.78,A=.66,z=4.5,o=2,t=10,C=26,w=500,v=600,B=2e3,s=2,x=100,y=60,E=0,d=null,p=-1,u=".BestFitGrid",q=$B.ltr?"left":"right";
        b.BestFitGrid=D;
        function D(R,nb){
            var ab=this,I=u+E++,mb=o,D,rb,yb=null,qb=0,V=nb.dataModel,O=$B.Mobile?64:128,H=$B.Mobile?4:5,wb=0,Bb=0,G=[],eb=0,T,W=a(k),ub=nb.actionManager;
            R.html('<h3 class="titleBanner"></h3><div class="bestFitGrid"><div class="bestFitRows"><div class="loadingContainer"></div></div></div>');
            var Db=a(".titleBanner",R).hide();
            R.bind(b.ItemTile.pulseEventName,fb);
            var M=a(".bestFitRows",R),jb=a(".loadingContainer",M),zb=new b.LoadingCue(jb);
            e(R,"$Sutra.SkyDrive.BestFitGrid");
            var P={},N={},J={},X={},Q=-1,F,lb,cb,U,ob,db,xb=false,K,L,Eb,Y,Z=0,gb=false,S;
            vb();
            W.bind("scroll"+I,function(){
                g.throttle("scroll"+I,y,kb);
                domUpdates.abort(I);
                zb.update()
            });
            ab.dispose=function(){
                d=D?D.key:null;
                p=db;
                clearTimeout(T);
                T=null;
                domUpdates.abort(I);
                R.unbind(b.ItemTile.pulseEventName,fb);
                pb();
                W.unbind(I);
                a("a",R).unbind();
                xb=true
            };
            ab.render=function(a,d){
                if(!xb){
                    domUpdates.abort(I);
                    var b=c.SkyDriveItem.getDefaultSetKey();
                    if(!D||!j(D,a)||a.getVersion()!=rb||b!=yb)pb();
                    D=a;
                    yb=b;
                    rb=a?a.getVersion():-1;
                    Pb(d);
                    Jb();
                    if(D&&D.folder){
                        bb();
                        Rb();
                        Lb();
                        Ib();
                        Kb();
                        hb();
                        Hb()
                    }
                    else M.empty().append(jb)
                }
                
            };
            ab.resize=function(a){
                if(a)kb();
                else{
                    g.throttle("resize"+I,x,kb);
                    domUpdates.abort(I)
                }
                
            };
            ab.isLoaded=function(){
                var a=true;
                N[0]&&(a=N[0].isLoaded());
                return a
            };
            function kb(){
                ab.render(D,Eb)
            }
            function vb(){
                F=[];
                lb={};
                cb={};
                S=-1;
                Bb=Fb();
                Z=0;
                var a=M.width();
                if(Y!=a){
                    Y=a;
                    gb=true
                }
                
            }
            function Lb(){
                var c=O+H+2*wb,d=mb*c,b=F.length>0?F[F.length-1][0].position:0,a=Math.max(d,b?b["top"]+b["height"]+H:0);
                a-=H;
                if(qb!=a){
                    qb=a;
                    M.height(a)
                }
                
            }
            function bb(){
                var a=O+H,b=W.scrollTop()-M.offset().top,e=b+W.height(),c=K,d=L;
                K=Math.max(0,Math.floor(b/a));
                L=Math.max(K,Math.floor(e/a));
                return c!=K||d!=L
            }
            function Rb(){
                vb();
                var c=0,b=0,a=null;
                do{
                    currentRow=Tb(a,c++,b);
                    a=currentRow;
                    if(currentRow){
                        F.push(currentRow);
                        b+=currentRow.length
                    }
                    
                }
                while(currentRow)
            }
            function Tb(m,e,k){
                var b=null,i=V.getChildCount(D),n=e>=K&&e<=L,f=0,o=Y-2*wb;
                if(k<i){
                    var h=m?m[0]["position"]:null,p=h?h["top"]+h["height"]+H:0,a=k,l=true,g=true;
                    b=[];
                    for(;
                    a<i;
                    a++){
                        var c=V.getChildByIndex(D,a,!n);
                        if(c&&c.isHeader&&b.length>0){
                            a--;
                            break
                        }
                        if(!c&&S==-1){
                            S=b.length==0?e:e+1;
                            g=true
                        }
                        var j=tb(c),d={
                            index:a,ar:j,position:{
                                top:p,width:Math.floor(O*j),height:O
                            }
                            
                        };
                        cb[a]=e;
                        lb[a]=d;
                        d.position[q]=f;
                        b.push(d);
                        f+=d.position.width+H;
                        if(c&&c.isHeader){
                            l=false;
                            d.position.width=Y;
                            d.position.height=C;
                            break
                        }
                        if(f-H>=Y){
                            g=a==i;
                            break
                        }
                        
                    }
                    
                }
                if(b&&l)Z=Ub(b,f-H,o,g);
                return b
            }
            function Ub(b,d,c,j){
                var g=0;
                if(!j||Z){
                    var l=d-c,i=(b.length-1)*H,f=0,h=j&&Z&&d<c;
                    g=h?Z:(c-i)/(d-i);
                    for(var e=0;
                    e<b.length;
                    e++){
                        var a=b[e],k=a.position.width-Math.round(O*a.ar*g);
                        a.position.width-=k;
                        a.position[q]=f;
                        f+=a.position.width+H
                    }
                    if(!h)b[b.length-1].position.width-=f-H-c
                }
                return g
            }
            function hb(){
                G=[];
                if(F.length>0){
                    var c=F.length-1,g=Math.max(0,Math.min(K,c)),h=Math.min(c,Math.max(0,L));
                    for(var b=g;
                    b<=h;
                    b++){
                        var f=F[b]||[];
                        for(var a=0;
                        a<f.length;
                        a++){
                            var d=f[a].index,e=N[d];
                            e&&e.canPulse()&&G.push(d)
                        }
                        
                    }
                    
                }
                G=Ob(G);
                eb=G.length
            }
            function Ob(a){
                var b=[];
                while(a&&a.length)b.push(a.splice(Math.floor(Math.random()*a.length),1));
                return b
            }
            function Qb(){
                var d=0;
                if(c.Images.isIdle()){
                    var a=null;
                    for(i=0;
                    i<s&&i<eb;
                    i++){
                        if(!G||!G.length){
                            hb();
                            if(a!==null&&eb>1&&Number(G[G.length-1])==a)G.splice(0,0,G.pop())
                        }
                        var e=a=Number(G.pop()),b=N[e];
                        if(b){
                            Sb(b,d);
                            d+=Math.max(w,Math.floor(v*Math.random()))
                        }
                        
                    }
                    
                }
                else fb()
            }
            function Sb(a,b){
                setTimeout(function(){
                    a.pulse((new Date).getTime())
                }
                ,b)
            }
            function fb(){
                if(T){
                    clearTimeout(T);
                    T=0
                }
                if(!G||!G.length)hb();
                if(eb>0)T=setTimeout(Qb,B)
            }
            function Kb(){
                if(F.length>0){
                    var b=F.length-1,c=Math.max(0,Math.min(K,b)),d=Math.min(b,Math.max(0,L));
                    for(var a=c;
                    a<=d;
                    a++)Cb(a)
                }
                if(gb)domUpdates.enqueue(Gb,null,0,null,I);
                domUpdates.enqueue(fb,null,0,null,I);
                var e=S*(O+H);
                jb.css({
                    top:e
                });
                zb.setVisibility(S!=-1&&L>=S&&V.hasPendingRequests(D.key))
            }
            function Gb(){
                var b=F.length-1,d=Math.max(0,Math.min(K,b)),f=Math.min(b,Math.max(0,L));
                gb=false;
                for(var a in J){
                    var e=J[a];
                    if(a<d||a>f){
                        for(var c in e)ib(c);
                        delete J[a]
                    }
                    
                }
                
            }
            function Hb(){
                var d=F.length-1,b=Math.max(0,Math.min(K,d)),c=Math.min(d,Math.max(0,L)),e=1+(c-b),a;
                for(a=c+1;
                a<F.length&&a<=c+e;
                a++)sb(a);
                for(a=b-1;
                a>=0&&a>=b-e;
                a--)sb(a)
            }
            function sb(a){
                domUpdates.enqueue(function(){
                    Cb(a)
                }
                ,null,3,null,I)
            }
            function Cb(d){
                var k=F[d],g=J[d]||{},h={};
                for(var f=0;
                f<k.length;
                f++){
                    var j=k[f];
                    Ab(j);
                    var c=j.index,e=X[c];
                    if(e!==undefined&&e!=d){
                        var i=J[e];
                        if(i)delete i[c]
                    }
                    X[c]=d;
                    h[c]=1;
                    delete g[c]
                }
                for(var b in g){
                    var a=cb[b];
                    if(a!==undefined){
                        var l=lb[b];
                        Ab(l);
                        J[a]=J[a]||{};
                        J[a][b]=1;
                        X[b]=a
                    }
                    else ib(b)
                }
                J[d]=h
            }
            function Ab(k){
                var f=k.index,c=P[f],d=V.getChildByIndex(D,f,true),i=false;
                if(d){
                    if(!c){
                        i=true;
                        c=a(document.createElement("a"));
                        e(c,"$Sutra.SkyDrive.BestFitGridItem")
                    }
                    else c.unbind();
                    var h=k.position;
                    c.css(h).attr("title",d?d.name:"").data(n,d.id);
                    if(d&&d.folder)c.addClass(m);
                    else c.removeClass(m);
                    var j=ub.getAction("DefaultClick",d);
                    if(j)ub.setATagAction(j,c,null,function(c,b){
                        if(!l(a(c.target)))return b()
                    });
                    if(d.isHeader)c.text(d.name).addClass("bfgHeader");
                    else{
                        c.removeClass("bfgHeader");
                        var g=N[f];
                        if(!g)g=N[f]=new b.ItemTile(c,nb);
                        g.render(d,null,{
                            iw:true,w:h.width,h:h.height,df:!!(d.did&&d.parentId=="root"),sm:true,sp:1
                        })
                    }
                    if(i){
                        Mb(c,f);
                        P[f]=c
                    }
                    
                }
                
            }
            function Mb(b,a){
                if(a>Q){
                    M[0].appendChild(b[0]);
                    Q=a
                }
                else{
                    var c=Nb(a);
                    M[0].insertBefore(b[0],c[0])
                }
                
            }
            function Nb(b){
                var a=null;
                while(b<=Q&&!a)a=P[++b];
                return a
            }
            function pb(){
                for(i in P)ib(i)
            }
            function ib(a){
                var c=P[a];
                if(c){
                    c.remove();
                    delete P[a]
                }
                var e=N[a];
                if(e){
                    e.dispose();
                    delete N[a]
                }
                var b=X[a];
                if(b!==undefined){
                    var d=J[b];
                    delete d[a];
                    d.length==0&&delete J[b];
                    delete X[a]
                }
                if(a>=Q)do Q--;
                while(Q>=0&&!P[Q])
            }
            function tb(c){
                var b=Bb;
                if(c){
                    var a=c.photo||c.video;
                    if(a&&a.height){
                        var e=a.width,d=a.height;
                        if(d<O){
                            d=O;
                            e+=t*2
                        }
                        b=Math.min(z,Math.max(A,e/d))
                    }
                    else if(c.folder)b=r;
                    else b=f
                }
                return b
            }
            function Fb(){
                var a=0,c=0;
                if(D){
                    var e=V.getChildCount(D);
                    for(var b=0;
                    b<e;
                    b++){
                        var d=V.getChildByIndex(D,b,true);
                        if(d){
                            a++;
                            c+=tb(d)
                        }
                        
                    }
                    
                }
                return a>0?c/a:f
            }
            function Pb(a){
                if(a&&a.headerText){
                    mb=0;
                    Db.html(a.headerText.encodeHtml()).show()
                }
                else{
                    mb=o;
                    Db.empty().hide()
                }
                Eb=a
            }
            function Jb(){
                bb();
                U=Math.max(0,K);
                var b=F[U],a=b?b[0]:null;
                U=a?a.index:-1;
                if(U!=-1){
                    db=W.scrollTop();
                    ob=db-(M.offset().top+a.position.top)
                }
                
            }
            function Ib(){
                if(D&&D.key==d){
                    h.scrollTop(p);
                    bb()
                }
                else if(U!=-1){
                    var c=cb[U],a=F[c];
                    if(a&&a.length>0){
                        var b=M.offset().top+a[0].position.top+ob;
                        if(db!=b){
                            W.scrollTop(b);
                            bb()
                        }
                        
                    }
                    
                }
                d=null
            }
            
        }
        
    })();
    (function(){
        var i='<div class="groupContentControl"><div class="groupContentContainers"><div class="groupSkyDriveControl"></div><div class="sharedWithGroupControl"></div><div class="emptyContentControl"></div></div><div class="GCC_LoadingContainer"></div></div>';
        b.GroupContentControl=e;
        var h=f("UsersSkyDrive"),g=f("SharedWithUser"),d=".groupContentControl";
        function e(j,w){
            var x=this,m=w.dataModel;
            j.html(i);
            var u,l,k,s,p=a(".groupSkyDriveControl",j),o=a(".sharedWithGroupControl",j),r=a(".emptyContentControl",j),B=a(".groupContentContainers",j),C=a(".GCC_LoadingContainer",j).css("position","relative"),E=new b.LoadingCue(C),e,f,z=false,y=false,q=false,A,v,n;
            a(m).bind(c.DataModel.dataChangedEvent+d,L);
            a(m).bind(c.DataModel.errorEvent+d,M);
            x.render=function(a,b){
                n=b;
                if(a){
                    H(a);
                    e=a;
                    A=a.key;
                    F(a);
                    if(G()&&D(e)){
                        j.css("height","");
                        B.show();
                        E.setVisibility(false)
                    }
                    else{
                        E.setVisibility(m.hasPendingRequests(A)||m.hasPendingRequests(v));
                        C.css({
                            top:0
                        });
                        j.css("height","100px");
                        p.hide();
                        o.hide();
                        r.hide();
                        B.hide()
                    }
                    if(f||q){
                        z=z||t(e);
                        y=!q&&(y||t(f));
                        J();
                        I();
                        K()
                    }
                    
                }
                
            };
            x.resize=function(){
                if(l&&t(e))l.resize();
                if(k&&t(f))k.resize()
            };
            x.dispose=function(){
                l&&l.dispose();
                k&&k.dispose();
                s&&s.dispose();
                a(m).unbind(d);
                j.css("height","")
            };
            function J(){
                if(t(e)){
                    var a;
                    if(e.ownerName)a=h.format(e.ownerName);
                    p.show();
                    l.render(e,{
                        headerText:y&&f.folder&&a
                    });
                    r.hide()
                }
                else p.hide()
            }
            function I(){
                if(!q&&t(f)){
                    var b=m.getChildCount(e)!=0,a;
                    if(f.ownerName)a=g.format(e.ownerName);
                    o.show();
                    k.render(f,{
                        isSecondary:b,headerText:a
                    });
                    r.hide()
                }
                else if(f)o.hide()
            }
            function K(){
                if(f&&f.folder&&m.getChildCount(f)==0&&m.getChildCount(e)==0){
                    r.show();
                    s.render(e);
                    o.hide();
                    p.hide()
                }
                
            }
            function H(a){
                if(!e||A!=a.key||!u||n.contentControlType!==u){
                    u=n&&n.contentControlType||"SetViewDetailsList";
                    l&&l.dispose();
                    p.empty().show();
                    k&&k.dispose();
                    o.empty().show();
                    s&&s.dispose();
                    r.empty().show();
                    l=new b[u](p,w,{
                        index:0
                    });
                    k=new b[u](o,w,{
                        index:1
                    });
                    s=new b[n.emptyContentControlType](r,w);
                    z=false;
                    y=false;
                    q=false
                }
                
            }
            function F(b){
                var a=b.keyParts;
                v=c.SkyDriveItem.getItemKey(a["id"],a["cid"],P,"shared");
                f=w.dataModel.getItem(v)
            }
            function t(a){
                return a&&a.getChildren().getCount()>0&&a.getChildren().get(0,true)
            }
            function G(){
                return q||D(f)
            }
            function D(a){
                return a&&(a.getChildren().getCount()===0||a.getChildren().get(0))
            }
            function L(b,a){
                if(a.key===v)x.render(e,n)
            }
            function M(b,a){
                if(a.key===v){
                    q=true;
                    x.render(e,n)
                }
                
            }
            
        }
        
    })();
    (function(){
        var Db=a(k),g=c.SkyDriveItemHelper,Ab="FRE",Cb="<span>{0}</span>",j=FilesConfig.imgBaseUrl,i=FilesConfig.foldersImgBaseUrl,d="live.shared.skydrive.PC.EmptyFolder.",I='<div class="EF_Content"></div>',lb=i+"/storage_icon.png",s=i+"/OfficeDocs.png",t=j+"/imgs/wlpg_48x48.png",qb=j+"/imgs/wlgroups_48x48.png",nb=i+"/icons/Small/Notebook.png",m=GetString(d+"Title.Access"),kb=GetString(d+"Title.Sharing"),mb=GetString(d+"Title.Office"),r=GetString(d+"Title.Photos"),jb=GetString(d+"Title.OneNote"),M=GetString(d+"Title.DeviceOffline"),ab=GetString(d+"Description.Documents"),ub=GetString(d+"Description.Photos"),sb=GetString(d+"Description.Access"),rb=GetString(d+"Description.Sharing"),tb=GetString(d+"Description.Office"),V=GetString(d+"Description.GroupPhotos"),ob=GetString(d+"Description.OneNote"),Q=GetString(d+"Description.DeviceOffline"),v="<strong>",y="</strong>",G=GetString(d+"DragAndDropEnabled"),A=GetString(d+"SilverlightNoDragAndDrop").format(v,y),C=GetString(d+"NoSilverlightNoDragAndDrop").format(v,y),xb=GetString(d+"Description.EmptyMRU"),yb=GetString(d+"Description.EmptySWM"),O=GetString(d+"Description.EmptyFolder"),P=GetString(d+"Description.EmptyAlbum"),pb=f("EmptyFolderMessage.VisitorRoot"),S=f("EmptyFolderMessage.VisitorDocuments"),eb=f("EmptyFolderMessage.VisitorPhotos"),Bb=GetString(d+"Action.AddPhotos"),x=GetString(d+"Action.LearnMore"),n=GetString(d+"Action.CreateAlbum"),Z=GetString(d+"Action.CreateOneNote"),l="OfficeLearnMore",h="CreateAlbum",J="CreateOneNote",fb={
            iconUrl:s,title:m,description:ab,actionText:x,actionName:l
        }
        ,u={
            iconUrl:t,title:r,description:ub,actionText:n,actionName:h
        }
        ,X={
            iconUrl:lb,title:m,description:sb
        }
        ,U={
            iconUrl:qb,title:kb,description:rb
        }
        ,Y={
            iconUrl:s,title:mb,description:tb,actionText:x,actionName:l
        }
        ,w={
            iconUrl:nb,title:jb,description:ob,actionText:Z,actionName:J
        }
        ,p={
            iconUrl:t,title:r,description:V,actionText:n,actionName:h
        }
        ,N={
            description:O
        }
        ,R={
            description:P
        }
        ,bb={
            description:xb
        }
        ,cb={
            description:yb
        }
        ,F={
            description:G
        }
        ,z={
            description:A
        }
        ,B={
            description:C
        }
        ,zb=[fb,u],gb=[X,U,Y],wb=[u],vb=[w,p],db=[w],W=[p],K=[N],L=[R],hb=[bb],ib=[cb],H=[F],D=[z],E=[B];
        b.EmptyFolderContent=T;
        function T(j,c){
            var k=this;
            j.html(I);
            var d=a("div",j);
            e(d,"$Sutra.SkyDrive.EmptyFolderContainer");
            var f,n=c.dataModel,i=false;
            k.render=function(a){
                if(!i&&a){
                    var b=l(a);
                    if(!f||f!=b){
                        d.empty();
                        f=b;
                        m(b,a)
                    }
                    
                }
                
            };
            k.dispose=function(){
                i=true
            };
            function l(a){
                var b,d=false,i=[{
                    description:pb.format(a.ownerName)
                }
                ],e=[{
                    description:S.format(a.ownerName)
                }
                ],f=[{
                    description:eb.format(a.ownerName)
                }
                ];
                if(a.error&&a.error.code==10001&&a.did){
                    var j=c.deviceItemSet.getByKey(a.did.toLowerCase()),k=j?j.name:null;
                    b=[{
                        title:M.format(k),description:Q.format(k)
                    }
                    ]
                }
                else if(g.isSkyDriveRoot(a)){
                    if(g.isViewerOwner(a))d=true;
                    if(c.viewParams.sc=="photos")b=d?wb:f;
                    else if(c.viewParams.sc=="documents")b=d?gb:e;
                    else b=d?zb:i
                }
                else if(g.isGroupRoot(a)){
                    var l=c.actionManager.getAction(h,a);
                    if(l)d=true;
                    if(c.viewParams.sc=="photos")b=d?W:f;
                    else if(c.viewParams.sc=="documents")b=d?db:e;
                    else b=d?vb:i
                }
                else if(g.isMruQuery(a))b=hb;
                else if(g.isSharedQuery(a))b=ib;
                else if(g.isViewerOwner(a)&&!a.did)if(o)b=H;
                else if(q)b=D;
                else b=E;
                else if(g.isPhotoAlbum(a,c))b=L;
                else b=K;
                return b
            }
            function m(f,j){
                for(var e=0;
                e<f.length;
                e++){
                    var h=f[e],g=a("<div></div>"),i=new b.EmptyFolderMessage(g,c);
                    i.render(j,h,e===f.length-1);
                    d.append(g)
                }
                
            }
            
        }
        
    })();
    (function(){
        b.EmptyFolderMessage=f;
        var h='<div class="EF_Message"><img class="EF_Icon"/><span class="EF_Data"><p class="EF_Title"></p><p class="EF_Description"></p><p><a class="EF_Action"></a></p></span></div>',g=".EF_Message",k=".EF_Icon",j=".EF_Title",d=".EF_Description",i=".EF_Action",m="src",n="href",l="FRE";
        function f(b,q){
            var s=this;
            b.html(h);
            var r=a(g,b),n=a(k,b),o=a(j,b),p=a(d,b),f=a(i,b);
            e(r,"$Sutra.SkyDrive.EmptyFolderMessage");
            e(n,"$Sutra.SkyDrive.EmptyFolderMessageIcon");
            e(o,"$Sutra.SkyDrive.EmptyFolderMessageTitle");
            e(p,"$Sutra.SkyDrive.EmptyFolderMessageDescription");
            e(f,"$Sutra.SkyDrive.EmptyFolderMessageActionLink");
            s.render=function(j,d,i){
                if(i)r.css("margin-bottom","0");
                if(d.iconUrl)n.attr(m,d.iconUrl);
                else if(d.iconISName){
                    n.remove();
                    var g=a(c.ImageStrip.getImage(d.iconISName));
                    if(g)g.addClass("EF_Icon").insertBefore(a(".EF_Data",b));
                    e(g,"$Sutra.SkyDrive.EmptyFolderMessageIcon")
                }
                else n.remove();
                if(d.title)o.html(d.title);
                else o.remove();
                p.html(d.description);
                var h;
                if(d.actionName)h=q.actionManager.getAction(d.actionName,j);
                if(h&&d.actionText){
                    f.html(d.actionText);
                    q.actionManager.setATagAction(h,f,l)
                }
                else f.parent().remove()
            }
            
        }
        
    })();
    (function(){
        var i=d("SkyDriveProductName"),h=f("AllPhotosRootTitle"),a=f("AllDocsRootTitle");
        b.ItemBreadCrumbBar=g;
        function g(g,f){
            var o=this,m,k,n=f.dataModel,d=b.BreadcrumbBar.create();
            g.append(d.$obj);
            g.append('<div class="c_clr"></div>');
            e(g,"$Sutra.SkyDrive.ItemBreadCrumbBar");
            var i=d.$obj;
            o.dispose=function(){
                d.dispose()
            };
            function l(c){
                var a=f.actionManager.getAction("ViewItem",c);
                a.html=c.getDisplayName(f).encodeHtml();
                var d=b.NavLink.create(a);
                return d
            }
            function p(e){
                var i=n.getItem(c.SkyDriveItem.getItemKey(null,e.ownerCid,e.group,null,e.did),true);
                if(i){
                    var j=l(i);
                    d.add(j)
                }
                if(e.ownerCid!=f.callerCid&&c.SkyDriveItemHelper.isRootItem(e)){
                    var g={
                        url:"#"
                    };
                    if(f.viewParams.sc=="photos")g.html=h.encodeHtml();
                    else if(f.viewParams.sc=="documents")g.html=a.encodeHtml();
                    if(g.html){
                        var k=b.NavLink.create(g);
                        d.add(k)
                    }
                    
                }
                
            }
            o.render=function(a){
                if(a&&(!j(m,a,true)||k!=a.getVersion())){
                    if(!a.parentId&&f.viewParams.qt)i.hide();
                    else{
                        i.show();
                        d.clear();
                        p(a);
                        var c=[],b=a;
                        while(b){
                            if(!b.parentId)break;
                            c.push(l(b));
                            b=n.getItem(b.parentKey)
                        }
                        for(var e=c.length-1;
                        e>=0;
                        e--)d.add(c[e])
                    }
                    m=a;
                    k=a.getVersion()
                }
                
            }
            
        }
        
    })();
    (function(){
        var d='<div class="cb_uploadInput"><input type="file" multiple /></div>';
        b.CBHTML5FileUpload=c;
        function c(c,l,j){
            var g=this,m=false,b=a(d),e=a("input",b),f;
            e.bind("change",k);
            e.mouseover(h);
            e.mouseout(i);
            g.dispose=function(){
                b.unbind();
                b.remove();
                e.unbind();
                c.closest("a").bind(".CBHTML5FileUpload")
            };
            g.render=function(d){
                j(true);
                f=d;
                var a=c.closest("a");
                a.css("display","inline");
                a.after(b);
                a.parent().addClass("cb_uploadText");
                a.bind("click.CBHTML5FileUpload",function(){
                    return false
                });
                b.width(a.width());
                b.height(a.height()||a.parent().height())
            };
            g.updateContainer=function(a){
                c=a
            };
            function h(){
                c.closest("a").addClass("aHover")
            }
            function i(){
                c.closest("a").removeClass("aHover")
            }
            function k(){
                var a=e[0].files;
                if(f&&a&&a.length)$Do.when("Bucket4.js",0,function(){
                    $Do.when("FileUploadManager",0,{
                        files:a,item:f
                    })
                })
            }
            
        }
        
    })();
    (function(){
        b.CBSLFileUpload=u;
        var e,i,k,m,l,f,s=3e4,w=d("CommandBarSLSlowLoad"),j=!o&&!$B.SF_Mac,n=".SLFileUpload";
        window.onSLUploaderLoad=function(){
            i=e[0].Content.slUpload;
            if(k){
                clearTimeout(k);
                k=null
            }
            if(j)i.SwitchToPopoverMode();
            $Do.register("SilverlightFileUploader")
        };
        window.NewUploadFileAdded=function(a){
            if(l)r();
            $Do.when("Bucket4.js",0,function(){
                if(i){
                    var d=c.PageController.getInstance().getViewContext().dataModel,b=a.ParentResourceId.split(";"),e=c.SkyDriveItem.getItemKey(b[0],b[1],b[2]=="1"?1:0),f=d.getItem(e,true);
                    $Do.when("FileUploadManager",0,{
                        slFile:a,control:i,slDataItem:f
                    })
                }
                
            })
        };
        window.UploadFragmentComplete=function(c,a,b){
            $Do.when("FileUploadManagerPost",0,{
                fileId:c,responseText:a,statusCode:b
            })
        };
        window.ImageResizeComplete=function(b,a){
            $Do.when("FileUploadManagerPost",0,{
                fileId:b,newSize:a
            })
        };
        window.onSLError=function(a){
            $WebWatson.submitFromException(a,"Silverlight Upload")
        };
        window.onSLErrorFromControl=function(){
            window.onSLError(new Error("Silverlight threw an unkown error"))
        };
        function v(){
            if(!e){
                var b=[];
                b.push('<object class="slUploader'+(j?"OverPop":"")+'" type="application/x-silverlight-2" id="slUploader" width="10" height="10">');
                b.push('<param name="source" value="'+FilesConfig.slUploaderXapUrl.encodeHtmlAttribute()+'" />');
                b.push('<param name="windowless" value="'+(j?"false":"true")+'" />');
                b.push('<param name="enableHtmlAccess" value="true" />');
                b.push('<param name="onload" value="onSLUploaderLoad"/>');
                b.push('<param name="onerror" value="onSLErrorFromControl"/>');
                b.push('<param name="initParams" value="InstructionWithDropString='+FilesConfig.slUploaderPopoverString.replace(/,/g,"$$$$$$$$").encodeHtmlAttribute()+'" />');
                b.push(' " />');
                b.push("</object>");
                e=a(b.join(""));
                a(window.document.body).append(e);
                k=setTimeout(t,s);
                p()
            }
            
        }
        function r(){
            p();
            if(f)f=null;
            if(l){
                l.hide();
                l=null
            }
            
        }
        function p(){
            if(e)e.css("top","-1000px")
        }
        function q(){
            if(f){
                e.width(f.width());
                e.height(f.height());
                e.offset(f.offset())
            }
            
        }
        function t(){
            if(m)m();
            k=null
        }
        function u(k,y,b){
            var s=this,o=false,c;
            k.closest("li").addClass("cb_uploadText");
            if(j)h.bind("resize"+n,x);
            m=function(){
                if(!o)t(false)
            };
            s.dispose=function(){
                o=true;
                b=null;
                m=null;
                k.closest("a").unbind(n);
                h.unbind("resize"+n);
                p()
            };
            s.render=function(a){
                v();
                c=a;
                $Do.when("SilverlightFileUploader",0,function(){
                    if(!o){
                        t(true);
                        if(i)i.SetUploadToResourceId(c.id+";"+c.ownerCid+";"+(c.group?1:0))
                    }
                    
                })
            };
            s.updateContainer=function(a){
                k=a
            };
            function w(){
                $Do.when("Bucket3.js",0,function(){
                    f=a('<div class="slUploaderPop">&nbsp;</div>');
                    var b=new $UI.Popover;
                    l=b;
                    b.width=600;
                    b.modal=true;
                    b.showCloseX=true;
                    b.header=d("CommandBarAddFiles").encodeHtml();
                    b.bodyPadding=true;
                    b.showHeader=true;
                    b.body=f[0];
                    b.show(function(){
                        r();
                        return true
                    }
                    ,0,0,1);
                    q();
                    f.focus();
                    setTimeout(function(){
                        document.getElementById("slUploader").focus()
                    }
                    ,0)
                })
            }
            function x(){
                g.throttle("PopoverSilverlightWindowResize",50,q,true)
            }
            function u(){
                var a=k.closest("a");
                a.css("display","inline");
                if(a.length>0)a.bind("click"+n,function(){
                    if(j)w();
                    return false
                });
                if(!j){
                    e.width(a.width());
                    var b=a.height();
                    e.height(b||a.parent().height());
                    var c=a.offset();
                    if(b==0)c.top=a.parent().offset().top;
                    e.offset(c)
                }
                
            }
            function t(a){
                if(b){
                    b(a);
                    b=null
                }
                if(a)u()
            }
            
        }
        
    })();
    (function(){
        var p='<div class="cb_uploadInput"></div>';
        b.CBDownlevelFileUpload=m;
        var q=a(document.body),d=[],k,j,g,f,h=FilesConfig.storageUploadBaseUrl,e;
        window.getStorageDownlevelUploadData=function(b,j){
            var k=d[b];
            k.hide();
            l();
            i();
            $Do.when("Bucket4.js",0,function(){
                $Do.when("FileUploadManager",0,{
                    dlFile:b,item:e,fileName:j
                })
            });
            var g="https://"+document.location.host+"/downleveluploadlanding?file="+b,f=FilesConfig.maxThumbnailSize+"x"+FilesConfig.maxThumbnailSize;
            if(c.ProcessWindow&&!c.ProcessWindow.getInstance().resizeState())f="";
            var a;
            if(e.id=="root")a=h.format(e.ownerCid)+"/MyCIDStuff/0x"+e.ownerCid+"/LiveFolders/";
            else a=h.format(e.ownerCid)+"/items/"+e.id+"/";
            return {
                storageURl:a,photoSizeContraint:f,redirectTo:g
            }
            
        };
        window.updateDownlevelUploadStatus=function(c,b){
            var a=d[c];
            if(a&&b){
                a.show();
                $Do.when("Bucket4.js",0,function(){
                    $Do.when("FileUploadManager",0,{
                        dlFile:c,status:b
                    })
                })
            }
            
        };
        function l(){
            if(d.length<5){
                var b=a('<iframe class="dlUploader" src="/downleveluploadlanding?file='+d.length+'"></iframe>');
                b.mouseover(n);
                b.mouseout(o);
                q.append(b);
                d.push(b)
            }
            
        }
        function i(a){
            if(d.length==0){
                k=a.width();
                var e=a.height();
                j=e||a.parent().height();
                g=a.offset();
                if(e==0)g.top=a.parent().offset().top
            }
            if(d.length==0)l();
            for(var c=0;
            c<d.length;
            c++){
                var b=d[c];
                b.width(k);
                b.height(j);
                b.offset(g)
            }
            
        }
        function n(){
            if(f)f.addClass("aHover")
        }
        function o(){
            if(f)f.removeClass("aHover")
        }
        function m(c,h,d){
            var b=this,j=false,g=a(p),k;
            b.dispose=function(){
                f=null
            };
            b.render=function(b){
                d(true);
                var a=c.closest("a");
                f=a;
                a.css("display","inline");
                a.after(g);
                a.parent().addClass("cb_uploadText");
                a.bind("click.CBHTML5FileUpload",function(){
                    return false
                });
                setTimeout(function(){
                    i(a)
                }
                ,0);
                e=b
            };
            b.updateContainer=function(a){
                c=a
            }
            
        }
        
    })();
    (function(){
        var h=c.SkyDriveItemHelper,J=FilesConfig.foldersImgBaseUrl+"/tinyicons_sprites.png",K=FilesConfig.imgBaseUrl,I="16",l="",F=d("CommandBarCreateWord"),D=d("CommandBarCreateExcel"),p=d("CommandBarCreatePowerPoint"),v=d("CommandBarCreateOneNote"),E=d("CommandBarCreateText"),k=d("CommandBarAddFiles"),H=d("CommandBarAddFilesLoading"),i="<span>"+k.encodeHtml()+"</span>",u="<span>"+d("CommandBarAddFilesLoading").encodeHtml()+"</span>",n=d("CommandBarViewSyncedFolders"),y=d("CommandBarCreateFolder"),z=d("CommandBarRemoveDevice"),B="ft_16_Docx",w="ft_16_Xlsx",x="ft_16_Pptx",s="ft_16_Notebook",t="ft_16_EmptyDocumentFolder",f="CB",m=3e3;
        b.SetCommandBar=G;
        function G(X,d){
            var Y=this,S,R=null,V=d.actionManager,G=b.CommandBar.create({
                container:'<div class="c_c c_ccptc c_ncolapse"></div>'
            }),bb=G.$obj,O,J,N,I,K,P;
            e(X,"$Sutra.SkyDrive.SetCommandBar");
            X.append(bb);
            Y.dispose=function(){
                Q();
                U();
                G.dispose()
            };
            Y.render=function(a){
                if(a&&(!j(S,a)||d.viewParams.sc&&R!=d.viewParams.sc||!d.viewParams.sc&&R)){
                    S=a;
                    R=d.viewParams.sc?d.viewParams.sc:null;
                    W(a)
                }
                
            };
            function W(a){
                U();
                G.clear();
                var b=a.folder;
                if(b){
                    var e=b.category;
                    if(h.isFavoritesLib(a,d))M(a,false,false,true);
                    else if(h.isPhotoAlbum(a,d))M(a,false,true,false);
                    else if(d.viewParams.sc=="photos")M(a,false,true,false);
                    else if(d.viewParams.sc=="documents")M(a,false,false,false);
                    else{
                        var c=!a.parentId&&!d.viewParams.sc;
                        M(a,c,false,false)
                    }
                    
                }
                
            }
            function T(b,a){
                return g.Core.ImageStrip.getImage(b,a,a)
            }
            function H(p,k,j,m,o,f,g){
                var e=null,c=V.getAction(k,p);
                if(c){
                    var i={
                        SkyCmnd:c.skyCmd,ClickLoc:o
                    };
                    if(c.click)c.click=C(c.click,r,i);
                    else c.click=function(){
                        $BSI.reportEvent(r,i)
                    };
                    var h=j.encodeHtml(),d=a("<span></span>");
                    if(f){
                        var n=T(f,g?j:l);
                        d.append(n);
                        if(!g)d.append("&nbsp;"+h)
                    }
                    else d.append(h);
                    c.html=d;
                    e=b.NavLink.create(c);
                    m.add(e)
                }
                return e
            }
            function Z(e){
                var d=a("<span></span>"),f=T(t,l);
                d.append(f);
                var c=b.NavLink.create({
                    html:d
                });
                e.add(c);
                c.disable();
                c.$obj.css("visibility","hidden");
                return c
            }
            function U(){
                if(O)O.dispose();
                if(J)J.dispose();
                if(N)N.dispose()
            }
            function Q(){
                if(P)clearTimeout(P);
                P=null
            }
            function ab(){
                var b=a(u);
                K.html=b;
                I.setHtml(b);
                Q()
            }
            function L(f){
                var c;
                if(!f){
                    if(J){
                        J.dispose();
                        J=null;
                        q=false;
                        if(o)c=O=new b.CBHTML5FileUpload(K.html,d,L);
                        else c=N=new b.CBDownlevelFileUpload(K.html,d,L);
                        c.render(S)
                    }
                    
                }
                else{
                    c=J||O||N;
                    Q();
                    var e=a(i);
                    K.html=e;
                    I.enable();
                    I.setHtml(e);
                    c.updateContainer(e)
                }
                
            }
            function M(e,S,M){
                var R=b.NavLink.create({
                    html:E.encodeHtml()
                });
                R.disable();
                G.add(R);
                H(e,"CreateWord",F,G,f,B,true);
                H(e,"CreateExcel",D,G,f,w,true);
                H(e,"CreatePowerPoint",p,G,f,x,true);
                var t=H(e,"CreateOneNote",v,G,f,s,true);
                if(t)t.addSeparator();
                if(G.count()==1)G.remove(0,true);
                var C=M?"AddPhotos":"AddFiles",g=V.getAction(C,e);
                if(g&&g.requiresRedemption&&e.tokenNeedsRedeeming&&!d.tokenHasBeenRedeemed){
                    g.click=function(){
                        c.PopoverManager.showPopover("TicketRedeemer",{
                            authkey:FilesConfig.authKey,item:e,callback:function(){
                                W(e)
                            }
                            
                        });
                        return false
                    };
                    g.url="";
                    var T=a(i);
                    g.html=T;
                    K=g;
                    I=b.NavLink.create(g);
                    G.add(I)
                }
                else{
                    var r=A(e),u=c.SkyDriveItemHelper.isRootItem(e);
                    if(r&&g&&!h.isMruQuery(e)&&!h.isSharedQuery(e)&&(u&&FilesConfig.isCreateTrueTLDEnabled||!u)){
                        var l=a(i);
                        g.html=l;
                        K=g;
                        I=b.NavLink.create(g);
                        I.disable();
                        var j;
                        Q();
                        P=setTimeout(ab,m);
                        if(q)j=J=new b.CBSLFileUpload(l,d,L);
                        else if(o)j=O=new b.CBHTML5FileUpload(l,d,L);
                        else j=N=new b.CBDownlevelFileUpload(l,d,L);
                        G.add(I);
                        j.render(e)
                    }
                    else if(!r)H(e,C,k,G,f)
                }
                if(!h.isMruQuery(e)&&!h.isSharedQuery(e))H(e,M?"CreateAlbum":"CreateFolder",y,G,f);
                if(S&&!e.group&&!e._isLoadingItem&&d.callerCid==e.ownerCid)H(e,"ViewSyncedFolders",n,G,f);
                H(e,"RemoveDevice",z,G,f);
                Z(G)
            }
            
        }
        
    })();
    (function(){
        b.SetNotificationBar=h;
        var f=".setnotificationbar",i='<div class="setNBContainer"><a class="setNBDismiss" href="#"></a><div class="setNBContent"></div></div>',g=d("PPickerClosePicker");
        function h(r,q){
            var n=this,d=q.errorManager,m=a(d),b=a(i),l=b.find(".setNBContent"),h=b.find(".setNBDismiss");
            b.hide();
            r.append(b);
            e(b,"$Sutra.SkyDrive.SetNotificationBar");
            e(l,"$Sutra.SkyDrive.SetNotificationBarMessage");
            e(h,"$Sutra.SkyDrive.SetNotificationBarDismiss");
            m.bind(d.errorReceivedEventName+f,j).bind(d.errorClearedEventName+f,o);
            h.bind("click",k).html(c.ImageStrip.getImage("close",g));
            n.dispose=function(){
                m.unbind(f);
                h.unbind("click",k)
            };
            n.render=function(){};
            j();
            function j(){
                var a=d.getErrors();
                a.length>0&&p(a[0])
            }
            function p(a){
                l.empty().append(a.$element);
                b.removeClass("setNBError setNBWarning setNBInfo").addClass(a.type==0?"setNBError":a.type==1?"setNBWarning":"setNBInfo").show()
            }
            function o(){
                b.hide()
            }
            function k(a){
                d.dismiss();
                a.preventDefault()
            }
            
        }
        
    })();
    (function(){
        var d=".FileUpload";
        b.FileUpload=e;
        function e(g){
            var l=this,q=false,e,b=a(k.document),A=a(k.document.body),z=g.actionManager,v=g.dataModel,f;
            if(o){
                b.bind("dragstart"+d,w);
                b.bind("dragenter"+d,u);
                b.bind("dragover"+d,y);
                b.bind("drop"+d,x);
                b.bind("dragleave"+d,i);
                b.bind("dragexit"+d,i);
                b.bind("dragend"+d,i)
            }
            l.dispose=function(){
                b.unbind(d);
                q=true
            };
            l.render=function(a){
                if(!q&&!e||!j(e,a))e=a
            };
            l.resize=function(){};
            function r(){
                return e&&e.folder&&g.viewParams.qt!="mru"&&g.viewParams.qt!="shared"
            }
            function w(){
                return false
            }
            function p(b){
                var a=b.closest("."+m);
                if(a.data(n))return a;
                else return null
            }
            function s(b){
                var a=p(b);
                if(a){
                    var d=c.SkyDriveItem.getItemKey(a.data(n));
                    return v.getItem(d,true)
                }
                else return null
            }
            function h(){
                if(f){
                    f.removeClass("up_currentdrop");
                    f=null
                }
                
            }
            function t(a){
                h();
                a.addClass("up_currentdrop");
                f=a
            }
            function y(b){
                if(r())if(b.originalEvent&&b.originalEvent.dataTransfer){
                    var c=p(a(b.srcElement));
                    if(c)t(c)
                }
                return false
            }
            function i(){
                h();
                return false
            }
            function u(){
                return false
            }
            function x(b){
                if(r()){
                    if(b.originalEvent&&b.originalEvent.dataTransfer&&b.originalEvent.dataTransfer.files){
                        var d=e,c=s(a(b.srcElement));
                        if(c&&c.folder)d=c;
                        var f=b.originalEvent.dataTransfer.files;
                        $Do.when("Bucket4.js",0,function(){
                            $Do.when("FileUploadManager",0,{
                                files:f,wasDragAndDropped:true,item:d
                            })
                        })
                    }
                    h()
                }
                return false
            }
            
        }
        
    })();
    (function(){
        var i=g.Core.SkyDriveItemHelper,C=g.Core.ImageStrip,Z=g.Core.DateFactory,q=".setView",T=d("SkyDriveProductName"),x=d("DetailsViewTooltip"),z=d("ThumbsViewTooltip"),t="viewType",N="set",G="sd-v",W='<div class="setContent"><div class="setCommands"><div class="setProdTitle"><h1>'+T+"</h1></div>"+'<div class="setCommandBar"></div>'+"</div>"+'<div class="c_clr">'+'<div class="setLeftCol"><div class="setLeftNavBar"></div></div>'+'<div class="setRightCol"><div class="setInfoPane"></div></div>'+'<div class="setMidCol">'+'<div class="setNB"></div>'+'<div class="setContentBox '+m+'">'+'<div class="setTitleBox">'+'<div class="setViewButtons">'+'<a id="setDetailsLink" class="setViewButton" href="#" title="'+x.encodeHtmlAttribute()+'"></a>'+'<a id="setThumbsLink" class="setViewButton" href="#" title="'+z.encodeHtmlAttribute()+'"></a>'+'<div class="setSearchBox"></div>'+"</div>"+'<div class="setViewTitle">'+'<h3 class="setTitle"></h3>'+'<div class="setBreadCrumbBar"></div>'+"</div>"+"</div>"+'<div class="setContentArea">'+'<div class="setContentContainer"></div>'+"</div>"+"</div>"+"</div>"+"</div>"+"</div>",V='<span class="nbe"><span class="nbet"></span>&nbsp;<a class="nbed"></a><span class="nbes">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a class="nbec"></a></span>',v=3,M=false,A=false,I="http://g.live.com/8SESkydrive/NewVersion",X='<a href="'+I.encodeHtmlAttribute()+'">'+d("Fre.Title").encodeHtml()+"</a>",Q=d("Fre.Description").format('<a href="'+I.encodeHtmlAttribute()+'" target="_blank">',"</a>"),R={
            iconISName:"skydrive",title:X,description:Q,sutraLabel:"$Sutra.SkyDrive.WhatsNewMessage"
        }
        ,L=[R];
        if(FilesConfig.getSkyDriveMobileUrl){
            var H=FilesConfig.getSkyDriveMobileUrl,S='<a href="'+H.encodeHtmlAttribute()+'">'+d("DeviceUpsell.Title").encodeHtml()+"</a>",O=d("DeviceUpsell.Description").format('<a href="'+H.encodeHtmlAttribute()+'" target="_blank">',"</a>"),P={
                iconISName:"mobileUpsell",title:S,description:O,sutraLabel:"$Sutra.SkyDrive.MobileUpsellMessage"
            };
            L.push(P)
        }
        var u="t_hov",J="t_sel",o="SetViewDetailsList",s="BestFitGrid",D="EmptyFolderContent",y="GroupContentControl",p=null,k=null;
        b.SetView=Y;
        var U={
            bici:"IPF"
        };
        function Y(m,d){
            var S=this,rb=d.dataModel,lb=d.actionManager;
            m.html(W);
            var qb=a(".setTitle",m),gb=a("#m_wh, #m_wf"),Db=a("#m_wf"),bb=a(".setMidCol",m),jb=a(".setContentBox",m),R=a(".setContentContainer",m),ab=m.find(".setViewButtons"),Y=a(".setInfoPane",m),nb=a(".setSearchBox",m),hb=a("#SB_Content"),wb=a(".setNB",m),sb=a(window),tb=a("html"),Q,ob=false;
            a("#setThumbsLink",m).html(C.getImage("thumbView"));
            tb.addClass(N);
            var H,g;
            gb.show();
            T();
            var O=a("#setDetailsLink",m).hover(function(){
                O.addClass(u)
            }
            ,function(){
                O.removeClass(u)
            }).data(t,o).click(X);
            O.html(C.getImage("detailsView",x,x));
            var P=a("#setThumbsLink",m).hover(function(){
                P.addClass(u)
            }
            ,function(){
                P.removeClass(u)
            }).data(t,s).click(X);
            P.html(C.getImage("thumbView",z,z));
            e(qb,"$Sutra.SkyDrive.SetViewTitle");
            e(O,"$Sutra.SkyDrive.SetViewDetailsLink");
            e(P,"$Sutra.SkyDrive.SetViewBestFitLink");
            var I=[new b.SetCommandBar(a(".setCommandBar",m),d),new b.SetNotificationBar(wb,d),new b.ItemBreadCrumbBar(a(".setBreadCrumbBar",m),d),new b.InfoPane(Y,d,U),new b.FileUpload(d)],fb=a(".setLeftNavBar",m);
            if(d.callerCid)I.push(new b.LeftNavBar(fb,d));
            else fb.hide();
            var cb=false;
            Y.bind(b.InfoPane.EventNames.resize,function(){
                if(H&&H.resize&&!cb){
                    db();
                    H.resize(true)
                }
                $B.IE_M7&&R.toggleClass("ie8layoutfix")
            });
            var pb=a(document);
            pb.bind("keydown"+q,Cb);
            var kb=a(d.errorManager);
            if($B.IE_M7)kb.bind(d.errorManager.errorReceivedEventName+q,function(){
                jb.css("zoom","0").css("zoom","1")
            });
            R.bind("showProperties"+q,function(){
                if(p&&p==s)X(o);
                return false
            });
            S.dispose=function(){
                gb.hide();
                tb.removeClass(N);
                mb();
                Y.unbind();
                pb.unbind(q);
                R.unbind(q);
                a(".setViewButton",m).unbind().data(t,null);
                if(g)a(g).unbind("change",Z);
                for(var b=0;
                b<I.length;
                b++)I[b].dispose();
                I=[];
                m.empty();
                if($B.IE_M7)kb.unbind(q);
                ob=true
            };
            this.isLoaded=function(){
                return !H||!H.isLoaded||H.isLoaded()
            };
            var ib=null;
            S.render=function(b){
                if(!ob){
                    db();
                    if(b){
                        if(!g||!j(b,g)||d.viewParams.sc!=ib){
                            if(g){
                                a(g).unbind("change",Z);
                                H.render(null)
                            }
                            a(b).bind("change",Z);
                            sb.scrollTop(0);
                            d.errorManager.clear();
                            if(i.isRootItem(b))k=null;
                            $BSI.reportEvent("ReadWrite.Content.Folder",{
                                ResourceID:b.id,SSEntry:"None",ViewMethod:"Browse",DataSource:"SkyDrive"
                            })
                        }
                        jb.data(n,b.id);
                        ib=d.viewParams.sc;
                        qb.text(b.name);
                        ub(b);
                        cb=true;
                        var e=i.isGroupRoot(b)&&{
                            contentControlType:k||o,emptyContentControlType:D
                        };
                        for(var c=0;
                        c<I.length;
                        c++)I[c].render(b,e);
                        T();
                        cb=false;
                        g=b;
                        zb(b);
                        vb(b);
                        if(b.did){
                            i.isRootItem(b)?ab.hide():ab.show();
                            mb()
                        }
                        else{
                            ab.show();
                            Bb()
                        }
                        
                    }
                    
                }
                
            };
            function db(){
                if($B.IE&&$B.V<7){
                    var b=Math.min(205,a(".setRightCol").outerWidth()),c=8;
                    bb.width(h.width()-a(".setLeftCol").outerWidth()-b-c)
                }
                
            }
            S.resize=function(){
                T();
                db();
                for(var a=0;
                a<I.length;
                a++)if(I[a].resize)I[a].resize()
            };
            function T(){
                var a=sb.height()-bb.offset().top-Db.outerHeight()-4;
                bb.css("minHeight",a)
            }
            function xb(a){
                $BSI.reportEvent(r,{
                    SkyCmnd:a==o?"DV":"TV",ClickLoc:"CB"
                });
                if(!H||a!=p){
                    p=a;
                    if(H)I.pop().dispose();
                    H=new b[a](R,d,{
                        index:0
                    });
                    I.push(H)
                }
                
            }
            function X(e){
                k=a(this).data(t)||e;
                if(g&&i.isRootItem(g)&&!d.viewParams.sc&&!d.viewParams.qt){
                    $Cookie.setCookie(G,k,document.location.host,null,new Date(2020,1,1));
                    if(i.isRootItem(g)){
                        var b=c.SkyDriveItem.getSetKeyParts();
                        d.sortBy(b["sb"],b["sr"]||0)
                    }
                    
                }
                S.render(g);
                return false
            }
            function ub(b){
                var a=o;
                if((b.error||rb.getChildCount(b)==0)&&!i.isGroupRoot(b))a=D;
                else if(b.did&&i.isRootItem(b))a=s;
                else if(i.isGroupRoot(b))a=y;
                else if(d.selectionManager.hasPreselectedChild(b))k=o;
                else if(k)a=k;
                else if(c.SkyDriveItemHelper.isPhotoAlbum(b,d)||B(d.viewParams.sc,E))a=s;
                else if(i.isRootItem(b)&&!d.viewParams.sc&&!d.viewParams.qt)a=$Cookie.getCookie(G)||o;
                O.toggleClass(J,k==o||a==o||k==null&&a==y);
                P.toggleClass(J,k==s||a==s);
                xb(a)
            }
            function Bb(){
                var b=a("form",hb);
                if(b.length>0){
                    nb.append(b);
                    e(b,"$Sutra.SkyDrive.SetViewSearchBox")
                }
                
            }
            function mb(){
                var b=a("form",nb);
                hb.append(b);
                unsutra(b)
            }
            function zb(b){
                if(i.isViewerOwner(b)&&!M){
                    message=L[Math.floor(FilesConfig.freRenderIndex/v)];
                    if(message){
                        var a=Ab(message);
                        d.errorManager.add({
                            $element:a,priority:3,type:2,dismissCallback:yb
                        });
                        if(!A){
                            A=true;
                            FilesConfig.freRenderIndex++;
                            eb()
                        }
                        
                    }
                    
                }
                
            }
            function yb(){
                M=true;
                A&&FilesConfig.freRenderIndex--;
                FilesConfig.freRenderIndex=FilesConfig.freRenderIndex-FilesConfig.freRenderIndex%v+v;
                eb()
            }
            function eb(){
                var a=FilesConfig.baseApiUrl+"/UpdateUserSiteVersion?cid="+(d.callerCid||F).encodeUrl(),e='{ "version": "'+FilesConfig.siteVersion+","+FilesConfig.freRenderIndex+'"}',b=new c.DataRequest(a,a,e);
                b.start()
            }
            function Ab(c){
                if(!Q){
                    Q=a(_ce("div"));
                    var f=new b.EmptyFolderMessage(Q,d);
                    f.render({},c,true);
                    c["sutraLabel"]&&e(Q,c["sutraLabel"])
                }
                return Q
            }
            function Cb(b){
                var j=a(b.target),h=b.which,f=d.actionManager,c=d.selectionManager;
                if(!l(j)&&!w()){
                    if(h==K&&g){
                        var i=c.getSelection();
                        if(i.selectionCount>0)c.deselectAll(g);
                        else if(g.parentKey){
                            var e=rb.getItem(g.parentKey,true);
                            if(e&&!e.isPlaceholder){
                                f.doAction(f.getAction("ViewItem",e));
                                return false
                            }
                            
                        }
                        
                    }
                    if(h===65&&(b.ctrlKey||b.metaKey)){
                        if(p===o||p===y)c.selectAll(g);
                        return false
                    }
                    
                }
                
            }
            function vb(b){
                var j=d.actionManager.getAction("ChangeExpiration",b,m,l);
                if(b.expiryDate&&j){
                    var l=!!b.group,m=d.callerCid,g=d.actionManager.getAction("Download",b,m,l),n=f("notificationbar.expirationchangecleanupsettings"),h,e;
                    if(i.isPhotoAlbum(b,d)){
                        h=f("notificationbar.expirationdownloadalbum");
                        e=f("notificationbar.albumexpirationimminent")
                    }
                    else{
                        h=f("notificationbar.expirationdownloadfolder");
                        e=f("notificationbar.folderexpirationimminent")
                    }
                    e=e.format(b.displayExpiryDate);
                    var c=a(V),k=a(".nbed",c);
                    a(".nbet",c).text(e);
                    if(g)d.actionManager.setATagAction(g,k.text(h));
                    else k.remove();
                    var o=a(".nbec",c);
                    d.actionManager.setATagAction(j,o.text(n));
                    if(!g)a(".nbes",c).remove();
                    d.errorManager.add({
                        $element:c,priority:1,type:1
                    })
                }
                
            }
            function Z(){
                if(g&&!g.getVisibility()){
                    var a=g.getParent();
                    g=null;
                    lb.doAction(lb.getAction("ViewItem",a))
                }
                
            }
            
        }
        $Do.register("wLive.Controls.SetView")
    })()
})()