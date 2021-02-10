(function (W,D,undefinedVal){try{
    var i='',p='',s='',
        bkf='',
        kvuuid='',
        kvreqseq='',
        ipSize='',
        aUrl='',
        bft='',
        c={},F=!1,T=!0,
        w2=window,
        ipDataIF={},
        frameLevel=6,
        check_for_iframe=T,
        backfillDoamin='backfill.ph.affinity.com',httpBackfillDoamin='http://'+backfillDoamin+'/',bkfUrl=httpBackfillDoamin+'IFR_IP_WEB.html',
        required_src=undefinedVal,ifrTp=['none'],
        dfpUUID='',iejsv='none',VV='4.9.8';
        /*@cc_on iejsv= @_jscript_version; @*/
    function SU(U){return '<scr'+'ipt type="text/javascript" src="'+U+'"></scr'+'ipt>'};
    function en(s){try{return encodeURIComponent(s);}catch(er){return er.message;}}
    function de(s){try{return decodeURIComponent(s);}catch(er){return er.message;}}
    function RN(r){var R=(new Date()).getTime();if(r||0){R +=''+Math.random()}return R}
    if(!Array.prototype.indexOf){Array.prototype.indexOf=function(c,a){if(a==null){a=0}else if(a<0){a=Math.max(0,this.length+a)}for(var b=a,d=this.length;b<d;b++){if(this[b]===c){return b}}return-1}}
    function gPar(obj){return (obj.parentNode||obj.parentElement)||F;}
    function debug(a){/*D.write(a.join());*/}
    function erLog(pos, msg){try{
            var appver='none',i=new Image();
            try{appver=window.navigator['appVersion']||'-'}catch(e){}
            msg=msg.message||msg;
            i.src=['http://ip.ph.affinity.com/jslog.php?jscode=',VV,'&iejsv=',iejsv,
                '&msg=',en(msg),
                '&ipSize=',ipSize,
                '&bkf_type=',bkf,
                '&position=',pos,
                '&ifrTp=',ifrTp.join(","),
                '&uuid=',kvuuid,
                '&dd=',en(document.domain||'-'),
                '&du=',en(document.documentURI||'-'),
                '&appver=',en(appver),
                '&dref=',en(document.referrer),
                '&href=',en(W.location.href),
                '&rand=',(new Date().getTime())
            ].join('');
            //debug(['<br><span style="color:red;">',pos,msg,'</span><br>']);
    }catch(e){}}
    var Rebkfl={
         loadBackfilHtml:function(fnPos){
            try{
                var tmpXrid = en(Math.random()) , wh = sizeId.split("x");
                var src = ['http://backfill.ph.affinity.com/IF_IP_', sizeId, '_backfill.html?x=x#&',
                    'GsizeId=', en(sizeId),
                    '&G_affinity_bkf_s_name_=', en(_affinity_bkf_s_name_),
                    '&xrid=', tmpXrid
                ].join('');
                document.write(['<ifr', 'ame name="fv2_',RN(1),'" src="',src,'" width="',wh[0],'px" height="',wh[1],'px" scrolling="no" frameborder="no" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true"  style="width:', wh[0], 'px;height:', wh[1], 'px;border:0px !important;margin:0 !important;padding:0 !important;background:transparent !important;"  framespacing="0" ></ifr','ame>'].join(''));
            }catch(er){erLog('loadBackfilHtml-err',er);}
        },
        isFrameBkfl:function(){
            // check if the current domain !=
            try {
                var curl='';
                try{curl=W.location.href;}catch(er){}
                if(""!==curl) {
                    curl=de(curl);
                    if(0===curl.indexOf('http://backfill.ph.affinity.com')){
                        return T;
                    }
                }
                try{curl = document.URL;}catch(er){}
                if(""!==curl) {
                    curl = de(curl);
                    if(0 === curl.indexOf('http://backfill.ph.affinity.com')) {
                        return T;
                    }
                }
            }catch(er){erLog('isFrameBkfl', er);}
            return F;
        },
        getReqParam:function(){
            try {
                var curl = 'none', prevBackFillParam = {}, prevBackFillParam_found = F;
                try{
                    curl = W.location.href;
                } catch (er) {}

                if(""!==curl) {
                    curl = de(curl);
                }

                if(0 !== curl.indexOf('http://backfill.ph.affinity.com')) {
                    try {
                        curl = document.URL;
                    } catch (er) {}
                    if(""!==curl) {
                        curl = de(curl);
                    }
                }

                if(0 === curl.indexOf('http://backfill.ph.affinity.com/')) {
                    curl.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                        prevBackFillParam_found = T;
                        prevBackFillParam[key] = value;
                    });
                }

                if(prevBackFillParam_found) {
                    try {
                        prevBackFillParam_found = F;
                        if(typeof prevBackFillParam['GsizeId'] !== 'undefined') {
                            if(typeof prevBackFillParam['G_affinity_bkf_s_name_'] !== 'undefined') {

                                    w2['GSizeUsed'] = ( w2['GSizeUsed'] || 0 ) + 1 ;

                                    if( 1 < w2['GSizeUsed']   ){
                                        erLog('INFO2-GSizeUsed:', ['GSizeUsed=' , w2['GSizeUsed'] , 'sizeId=',sizeId,  '_affinity_bkf_s_name_=', _affinity_bkf_s_name_ ].join(",") );
                                        return;
                                    }

                                    prevBackFillParam_found = T;
                                    location.hash='#aff_read';
                                    sizeId = prevBackFillParam['GsizeId'];
                                    _affinity_bkf_s_name_ = prevBackFillParam['G_affinity_bkf_s_name_'];

                            }
                        }
                    }catch(er){erLog('read-Html-GET',er);}
                }
            }catch(er){erLog('getReqParam-err', er);}
        }
    };

    function updateHash(c,ifr,sthref,sz,bkf,chk){try{
        var u=(sthref)?ifr.location.href:ifr.src,d='';
        if(chk){
            var xt=chkValidEmptyFrm(u,sz),chkSt=F;
            try{chkSt=(bkf==(xt[1].bftype.split(',')).pop())}catch(e){d=e.message}
            if(!chkSt){erLog('Info-chkSt',[(c.kvuniqimp||'-'),bkf,u,d].join('__'))}else{return}
        }
        if(c.bftype||''){c.bftype+=','+bkf}else{c.bftype=bkf}
        d=[''];for(var i in c){if(c.hasOwnProperty(i)){d.push(i+'='+c[i])}}d=d.join('&');
        if(sthref===T){ifr.location.hash=d}
        else{ifr.src=bkfUrl+'#'+d}
    }catch(e){erLog('updateHash',e)}}

    function validateEmpyFrame(src,sz){
        var Q=(src+"///#").split("/");
        if('backfill.ph.affinity.comIFR_IP_WEB.html'==Q[2]+Q[3].split("#")[0]){
           if(0<src.split("&").indexOf('s='+sz)){
                if(-1==src.split("&").indexOf('dfp=1')){
                    return T
                }
           }
        }
        return F
    }
    function chkSrcDefrSrc(ifr,fnm,url){
        try{if(null!==ifr){
            if((fnm===(ifr.id||F))||(fnm===ifr.name||F)){
                var src="";
                if(undefinedVal!=ifr.src){
                    src=ifr.src;
                    if( validateEmpyFrame( src, ipSize ) ) {
                    //if(-1 != src.indexOf(url)) {
                        return {"defersrc":F,'src':src};
                    }
                }
                try{src=ifr.getAttribute('defersrc')||F;}catch(e){}
                if(src!==F){
                    erLog('INFO2-defersrc','defersrc'+src);
                    return {"defersrc":T,'src':src};
                }
            }
        }}catch(e){erLog('chkSrcDefrSrc',e);}
        return F;
    }

    var sizeArry = {
        '468x60'  : '1',
        '160x600' : '154',
        '120x600' : '168',
        '300x250' : '170',
        '728x90'  : '225',
        '300x600' : '529',
        '250x250' : '165',
        '300x251' : '1103',
        '300x252' : '1104',
        '728x96'  : '3058',
        '728x100' : '4037',
        '300x50'  : '711',
        '320x50'  : '3055',
        '728x91'  : '6317',
        '728x92'  : '6318',
        '160x601' : '2759',
        '160x602' : '2758',
        '120x601' : '6321',
        '120x602' : '6322',
        '468x61'  : '6323',
        '468x62'  : '6324',
        '336x280' : '171',
        '970x90'  : '2473',
        '970x250' : '2466'
    };

    function checkInArray(bft,t){
        var tmpArr=t.split(','),i;
        for(i=0;i<tmpArr.length;i++){
            if(tmpArr[i]==bft){
                return T;
                break;
            }
        }
        return F;
    }

    if( (typeof (sizeId)==undefinedVal) || (sizeId=='') ) {
        erLog('Fail_2:', 'SizeId parameter not found');
        return F;
    }

    ipSize=sizeArry[sizeId]||undefinedVal;
    if(ipSize==undefinedVal){
        erLog('Fail_1:','sizeId : '+sizeId+'. Size parameter not found in our list');
        return F;
    }

    if((typeof (_affinity_bkf_s_name_)==undefinedVal)||(_affinity_bkf_s_name_=='')){
        erLog('Fail_11:', 'BackfillType parameter not found');
        return F
    }

    if('aff_eng_cache_clean'==_affinity_bkf_s_name_){
        erLog('Info-Cache1:', 'Just-Cleaning-cache');
        return F
    }
    Rebkfl.getReqParam();

    //-=
    function bkflv3(p){var w2=window,o,n={};if(w2._aff_pxlm||F){o=w2._aff_pxlm('s'+sizeId,_affinity_bkf_s_name_,kvuuid,p+',js'+VV,function(a,b){n=b;});if(o[0]){if(o[1]){document.write(o[1]);kvuuid=(n.ads||'')+"_"+(n.pid||'');bkf=(window._affinity_bkf_s_name_||'');ipSize=(window.sizeId||'');erLog('Info-V3', 'V234D');return T}}}return F}
    if(bkflv3('P1')){return}
    //-=
    var CurScript={
        getCurScriptTag:function(url){try{
            var xid=("afxid_"+Math.random()).replace(".",  ""),ox,mx=100;
            //D.write(['<scr','ipt id="',xid,'"></scr','ipt>'].join(''));
            D.write(['<img',' id="',xid,'" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="display:none;width:1px;height:1px;" width="1px" height="1px">'].join(''));
            do{
                mx--;
                ox=D.getElementById(xid);
                if(ox && ((ox.tagName||'').toUpperCase()==='IMG') ){
                    mx=0;
                }
            }while(0<mx);

            var sx=CurScript.lookUp(gPar(ox),ox,"SCRIPT",function(O){
                try{
                    if('http://s.affinitymatrix.com/js/ip-bkfl.js'== url){
                        return (0===O.src.indexOf(url));
                    }else{
                       var urlP=url.split('*');
                       return ( (0===O.src.indexOf(urlP[0])) && (0<O.src.indexOf(urlP[1])) )
                    }
                }catch(e){}
                return F;
            },T);
            try{gPar(ox).removeChild(ox);ox=null;}catch(e){}
            return sx;
        }catch(er){erLog('getCurScriptTag',er);}},
        lookUp:function(par,obj,tag,fnValid,stopAtFirst){try{
            var ch=par.childNodes,l=ch.length-1,objFound=F,ret=[],xf,i;
            for(i=l; i>=0; i--){
                xf=ch[i];
                if(!objFound){objFound=(xf===obj);}
                if(objFound){
                    if((xf.tagName||'').toUpperCase()===tag){if(fnValid(xf)){
                        ret.push(xf);
                        if(stopAtFirst){return ret;}
                    }}
                }
            }
            if((par.tagName||'').toUpperCase()==="HTML"){return ret;}
            ch=l=objFound=ret=xf=null;
            return CurScript.lookUp(gPar(par),par,tag,fnValid,stopAtFirst);
        }catch(er){erLog('lookUp'+tag,er);}
        return ret;
        }
    };
    //-=
    function SW(a,b){if(a===b){return T}try{return (a.document||1)===(b.document||2)}catch(e){}return F}
    //-=
    function chkValidEmptyFrm(u,s){
    var R=[0,{'p':'','s':'','size':'','kvuniqimp':'','misc':''},'invalid-domain'],
    Q=(u+"///#").split("/");
    if('backfill.ph.affinity.comIFR_IP_WEB.html'==Q[2]+Q[3].split("#")[0]){
    (u+'').replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,k,v){R[1][k]=v});
    if(s!=R[1].s){R[2]='Size-not-matched'}
    else if((''!=R[1].p)&&(''!=R[1].misc)&&(R[1].misc==R[1].kvuniqimp)){R[0]=1;R[3]=''}
    else{R[2]='p-kvuniqimp-not-found'}}
    return R
    }
    //-=
    function BackFillFrame(_backfillDomain,_curWin,productFrame){try{
        var backfillDomain=_backfillDomain,
            curWin=_curWin,
            maxLoopCount=60,
            bkflFrames=[],
            bkflSrc=[],
            fnm=productFrame;

        this.nearestBackfillFrame=F;
        this.iframeSrc='';
        this.setSrc=F;
        this.defersrc=F;
        var this2 = this;
        function _getAllbackFillFrame(winOrThis){try{
            ifrTp.push('a'+winOrThis);
            var xwin=F,winLoop=0,tmpSrc='',xframesPos=0;
            if('win'===winOrThis){xwin=window;}
            else{xwin=this;}
            do{
                var hashFrames=F;
                try{hashFrames=xwin.frames||F;}catch(er){}
                if(hashFrames){try{
                        for (var i=0;i<xwin.frames.length;i++){try{
                            var xf=xwin.frames[i]||F,matched=0,EFP;

                            if(xf){
                                try{if(xf.location&&xf.location.href){
                                    tmpSrc=xf.location.href||'';
                                    EFP=chkValidEmptyFrm(tmpSrc,ipSize);
                                    if(EFP[0]){matched='LH'}
                                }}catch(er1){}
                                try{if((0==matched)&&xf.document&&xf.document.URL){
                                    tmpSrc=xf.document.URL||'';
                                    EFP=chkValidEmptyFrm(tmpSrc,ipSize);
                                    if(EFP[0]){matched='DU'}
                                }}catch(er1){}
                                if(0!=matched){
                                    bkflFrames.push(xf);
                                    bkflSrc.push(''+tmpSrc);
                                    ifrTp.push('a'+winOrThis+matched);
                                    try{if(!(xf.strParam&&xf.strParam.p)){ifrTp.push('a'+winOrThis+'str-fail1')}}catch(e1){erLog('a'+winOrThis+'str-fail1-e',e1.message)}
                                    try{if(!(xf.window.strParam&&xf.window.strParam.p)){ifrTp.push('a'+winOrThis+'str-fail2')}}catch(e1){erLog('a'+winOrThis+'str-fail2-e',e1.message)}
                                }
                            }
                        }catch(er){}}
                }catch(er){}}

                if(xwin.parent||F){
                    if((xwin.parent===xwin)||(0<bkflFrames.length)){
                        winLoop=maxLoopCount;
                        break;
                    }
                    xwin=xwin.parent;
                }else if(xwin.opener||F){
                    if((xwin.opener===xwin)||(0<bkflFrames.length)){
                        winLoop=maxLoopCount;
                        break;
                    }
                    xwin=xwin.opener;
                }else{
                    erLog('bkfl-201',{'message':'no-parent-opener-found'});
                    return;
                }
                winLoop++;
            }while(winLoop<maxLoopCount);
        }catch(er){erLog('_getAllbackFillFrame('+winOrThis+')',er);}}

        function _getNearestBackFillFrame(){try{
            var l=bkflFrames['length']||0,fndWin=F,matched=F;
            if(l <= 0){ var do_nothing;}
            else if(l == 1){
                this2.iframeSrc=''+bkflSrc[0];
                this2.nearestBackfillFrame=bkflFrames[0];
                ifrTp.push('n0');
                return;
            }
            for(var i=0;i<l;i++){
                fndWin=F;
                try{if(bkflFrames[i].parent||F){
                    fndWin=_chkPath(bkflFrames[i], bkflFrames[i].parent, bkflFrames[i + 1] || "END");
                }}catch (er){}

                if(!fndWin){try{
                    if(bkflFrames[i].opener || F){
                        fndWin = _chkPath(bkflFrames[i], bkflFrames[i].opener, bkflFrames[i + 1] || "END");
                    }
                }catch (er){}}

                if(fndWin){
                    matched = F;
                    try{matched = window === fndWin;}catch (er){}
                    if(!matched){
                        try{matched = this === fndWin;}catch (er){}
                    }

                    if(!matched){try{
                        matched=self===fndWin;
                    }catch(er){}}

                    if(matched){
                        this2.iframeSrc = '' + bkflSrc[i];
                        this2.nearestBackfillFrame = bkflFrames[i];
                        ifrTp.push('n1');
                        try{
                            var p={},k,x;
                            for(x in bkflFrames){
                                if(bkflFrames.hasOwnProperty(x)){
                                    k=bkflFrames[x].window.strParam.placement;
                                    p[k]=p[k]||0;p[k]++;
                                }
                            }
                            p['cur-'+bkflFrames[i].window.strParam.placement]=1;
                            x=[];
                            for(k in p){
                                if(p.hasOwnProperty(k)){
                                    x.push(k+"="+p[k]);
                                }
                            }
                            erLog('INFO2-MULTIFRM-FRM',x.join("-"));
                        }catch(e){erLog('INFO2-MULTIFRM-FRM-strparam-fail_2', bkflSrc[i])}
                        return T
                    }
                }
            }

        }catch(er){erLog('_getNearestBackFillFrame', er);}
        return F;
        }

        function _chkPath(ostart,ow,oend){try{
            try{if(window===ow){return window;}}catch(er){}
            try{if(curWin===ow){return curWin;}}catch(er){}
            try{if(self===ow){return self;}}catch(er){}
            try{if(!(ow.frames||F)){return F;}}catch(er){return F;}

            var l=0,chkdeep=("chkdeep"===ostart),ret,i;
            try{l=ow.frames.length;}catch(er){}

            if(0<l)
            {
                for(i=0;i<l;i++)
                {
                    if(ostart===ow.frames[i]){
                        chkdeep=T;
                    }else if(oend===ow.frames[i]){
                        return F;
                    }

                    if(chkdeep)
                    {
                        var bl=ow.frames.length||0,bi=0;
                        for(bi=i+1;bi<bl;bi++){
                            if(oend === ow.frames[bi]){
                               //return F;//Fail for [page[e[g[gb]],e[g[gb]]]] & Required for p[e,gb][e,gb]. Not required for page > google > goolge-bkfl-js
                            }
                            try{if(window===ow.frames[bi]){
                                return window;
                            }}catch(er){}

                            try{if(curWin===ow.frames[bi]){
                               return curWin;
                            }}catch(er){}

                            try{if(self===ow.frames[bi]&&iejsv!= "5.7"){
                                return self;
                            }}catch(er){}
                        }
                        ret=_chkPath("chkdeep",ow.frames[i],oend);
                        if(ret){
                            return ret;
                        }
                    }
                }
            }
        }catch(er){erLog('_chkPath', er);}
        return F;
        }

        function _debugFetchPlcInfo(arFrm){
            var p,l=arFrm.length,ret={},plc,artmp=[];
            try{for(p=0;p<l;p++){
                try{
                    plc=arFrm[p].src.split("&")[1];
                    ret[plc]=ret[plc]||0;
                    ret[plc]++;
                }catch(e3){}
            }
            for(p in ret){
                if(ret.hasOwnProperty(p)){
                    artmp.push(p+"="+ret[p]);
                }
            }
            }catch(e){}
            return artmp.join(",");
        }

        function _getAllLocalbackFillFrame(){
            var fnPos=['A'],mx=10;
            try{
            do{
                mx--;
                if(D.getElementById(fnm)){mx=0;break;}
            }while(0<mx);

            if(!D.getElementById(fnm)){
                return;// No Single Frame Found, So Try _getAllbackFillFrame
            }

            var f=D.getElementsByTagName('iframe'),l=f.length,xf,cnt=0,xSrc,ySrc,p;
            bkflFrames=[];//
            fnPos.push("fl="+l);
            for(p=l-1;p>=0;p--){try{
                xf=f[p];
                xSrc=chkSrcDefrSrc(xf,fnm,httpBackfillDoamin);
                if(F!==xSrc){
                    ySrc=xSrc;
                    bkflFrames.push(xf);
                    cnt++;
                }
            }catch(e){}}
            if(1===cnt){
                this2.nearestBackfillFrame=bkflFrames[0];
                this2.iframeSrc=ySrc.src;
                this2.defersrc=ySrc.defersrc;
                this2.setSrc=T;
                ifrTp.push('l0');
                return;
            }

            fnPos.push("cnt="+cnt);
            // Multiple frame found, so locate nearest frame
            var sx=CurScript.getCurScriptTag('http://s.affinitymatrix.com/js/ip-bkfl.js');
            fnPos.push("sl="+sx.length);
            if(0==sx.length){sx=CurScript.getCurScriptTag('http://backfill.ph.affinity.com/ip/js/*/ip-bkfl.js');fnPos.push("sl2="+sx.length)}
            if(1===sx.length){
                sx=sx[0];
                    xf=CurScript.lookUp(gPar(sx),sx,"IFRAME",function(O){
                    var xSrc=chkSrcDefrSrc(O,fnm,httpBackfillDoamin);
                    if(F!==xSrc){
                      return T;
                    }
                },T);
                var dbgLog='tot='+_debugFetchPlcInfo(bkflFrames);
                fnPos.push("xfl="+xf.length);
                if(1===xf.length){
                    dbgLog+='--cur='+_debugFetchPlcInfo(xf);
                    xf=xf[0];
                    bkflFrames=[xf];
                    this2.nearestBackfillFrame=xf;
                    xSrc=chkSrcDefrSrc(xf,fnm,httpBackfillDoamin);
                    this2.iframeSrc=xSrc.src;
                    this2.defersrc=xSrc.defersrc;
                    this2.setSrc=T;
                    ifrTp.push('l1');
                    erLog('INFO2-MULTIFRM-DIRECT',dbgLog);
                    return;
                }
            }

            }catch(er){erLog('_getAllLocalbackFillFrame-er'+fnPos.join(), er);}
            bkflFrames=[];
            erLog('_getAllLocalbackFillFrame-lst',fnPos.join());
            return;
        }

        //read current document frames, filtered with frame url
        _getAllLocalbackFillFrame();
        if(0<bkflFrames.length){return}

        function nearestFrameBackfillDomain_v3(w3){
            var mx=10;ifrTp.push('nrBklfDmnA');
            do{try{
            var x=w3,xp=x.parent,F=xp.frames,L=F.length||0,EM=0;
            for(var i=0; i<L;i++){
                if(SW(x,F[i])){if(EM){
                    this2.nearestBackfillFrame=EM;
                    this2.iframeSrc=EM.location.href;
                    this2.setSrc=0;
                    ifrTp.push('nrBklfDmnB');
                    return 1
                }}else{
                    try{
                    //if(chkValidEmptyFrm(F[i].location.href||'',ipSize)[0]){EM=F[i]}
                    var RP=chkValidEmptyFrm(F[i].location.href||'',ipSize);
                    if(RP[0]){
                        if(''==dfpUUID){
                            if("1"==RP[1]['dfp']||''){dfpUUID=RP[1]['kvuniqimp']||'';ifrTp.push('nrBklfDmnA1')}
                            else{EM=F[i]}
                        }else if(dfpUUID == RP[1]['kvuniqimp']||''){EM=F[i];ifrTp.push('nrBklfDmnA2')}
                    }}catch(e){}
                }
            }}catch(e){}
            w3=w3.parent
            }while(0<mx--);
            return 0
        }

        function nearestFrameSameDomain_v3(w3){
            var mx=10;ifrTp.push('nrSamDmnA');
            do{try{
            var x=w3,xp=x.parent,F=xp.document.getElementsByTagName('iframe'),L=F.length||0,EM=0;
            for(var i=0;i<L;i++){
                if(x===(F[i].contentWindow||0)){if(EM){
                    this2.nearestBackfillFrame=EM;
                    this2.iframeSrc=EM.src;
                    this2.setSrc=1;
                    ifrTp.push('nrSamDmnB');
                    return 1
                }}else if(chkValidEmptyFrm(F[i].src||'',ipSize)[0]){EM=F[i]}
            }
            }catch(e){}
            w3=w3.parent
            }while(0<mx--);
            return 0
        }

        if("backfill.ph.affinity.com"==(location.href+"//").split("/")[2]){
            if(nearestFrameBackfillDomain_v3(window)){return}
        }else if(nearestFrameSameDomain_v3(window)){return}

        // Read parent frames
        _getAllbackFillFrame('win');
        if(0 == bkflFrames.length){
            // Read parent frames
            _getAllbackFillFrame('this');
        }
        // Find Nearest frame
        _getNearestBackFillFrame();
    }catch(er){erLog('BackFillFrame',er);}}
    //-=-=-=-=-=-=-=-=-=-=-=-=-

    bkf=_affinity_bkf_s_name_;
    var productFrame='IFR_IP_'+ipSize+'_WEB',ifr_src='',ifr=null,defersrc=F,
    oBackFillFrame=new BackFillFrame("backfill.ph.affinity.com/IFR_IP_WEB.html",W,productFrame);
    ifr=oBackFillFrame.nearestBackfillFrame;
    required_src=oBackFillFrame.iframeSrc;
    check_for_iframe=!oBackFillFrame.setSrc;
    defersrc=oBackFillFrame.defersrc
    var oldOrNew="NewCode";
    //-- START -FIND_FRAME_V001

    if((!ifr)||(required_src==='')){
        oldOrNew='OldCode'
        //Old Code started
        check_for_iframe=T;
        defersrc=F;
        try { //Chck if backfill on same frame ( i.e. no iframe )
            ifr = document.getElementById(productFrame);
            if(null !== ifr) {
                if(undefinedVal != ifr.src) {
                    ifr_src=ifr.src;
                    if(-1 != ifr_src.search(backfillDoamin)) {
                        required_src=ifr.src;
                        ifrTp.push('o1');
                        check_for_iframe=false;
                    }
                }

                if( check_for_iframe ){
                    try{defersrc=ifr.getAttribute('defersrc')||F;}catch(e){}
                    if(defersrc !== F){
                        erLog('defersrc','defersrc'+defersrc);
                        required_src=defersrc;
                        ifrTp.push('o2');
                        check_for_iframe=false;
                    }
                }
            }
        } catch (err) {
            check_for_iframe = true;
        }

        if(check_for_iframe) { // if code executed on iframe.  Check 6 level parents to detect same domain iframe
            for (i = 1; i < frameLevel; i++) {
                var w22 = window.parent;
                try {
                    ifr = w22.frames[productFrame];
                    if(ifr != undefinedVal) {
                        try {
                            if(undefinedVal != ifr.document.URL) {
                                ifr_src = ifr.document.URL;
                                if(-1 != ifr_src.search(backfillDoamin)) {
                                    required_src = ifr_src;
                                    ifrTp.push('o3');
                                    try {
                                        aUrl = ifr.window.strParam.parenturl;
                                        erLog('INFO2-pUrl_ok:', aUrl);
                                    } catch (e) {
                                        erLog('INFO2-pUrl_fail:', e.message + required_src);
                                    }
                                    i = frameLevel + 10;
                                    break;
                                }
                            }
                        }catch(e){}
                    }
                }catch(e){}
            }
        }else{
            erLog('INFO2-pUrl_direct:', ( defersrc ? "T":"F") );
        }
    }
    //-- END-FIND_FRAME_V001

    if((required_src!=undefinedVal)&&(''!==required_src)){
        var tempParts=required_src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function ( m,key, value) {
            ipDataIF[key] = value;
        });

        ipDataIF.placement = ipDataIF['p']||'';
        ipDataIF.size = ipDataIF['s']||'';
        ipDataIF.kvuniqimp = ipDataIF['kvuniqimp']||'';

        if(isNaN(parseInt(ipDataIF['kvreqseq']))) {
            ipDataIF.kvreqseq = 2;
        } else {
            ipDataIF.kvreqseq = (parseInt(ipDataIF['kvreqseq']) + 1);
        }

        bft = ipDataIF['bftype'] || '';

        c = ipDataIF;
    } else {
        if(Rebkfl.isFrameBkfl() === F) {
            Rebkfl.loadBackfilHtml('122');
            return F;
        } else {
            function chknloadV4(){
            var p=parent,i=6,f,wh = sizeId.split("x");
            while(0<i){
                i--;
                f=p.frames;
                for(j=0;j<f.length||0;j++){
                    try{
                        if(0==f[j].location.href.indexOf("http://backfill.ph.affinity.com/ip/ip_frame_v3/ip_ifr_v234.html") ){
                        erLog('INFO-V234:',en(f[j].location.href));
                        var u="http://c1.ph.affinity.com/2016-02-17/ipv4f.html?d=2016-02-17#&aff_ipfrm=affv4&aff_kw="+bkf+"&Q2=v2&aff_sz="+sizeId;
                        document.write(['<ifr', 'ame name="fv2_',RN(1),'" src="',u,'" width="',wh[0],'px" height="',wh[1],'px" scrolling="no" frameborder="no" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true"  style="width:', wh[0], 'px;height:', wh[1], 'px;border:0px !important;margin:0 !important;padding:0 !important;background:transparent !important;"  framespacing="0" ></ifr','ame>'].join(''));
                        return 1
                    }}catch(e){}
                }
                p=p.parent;
            }
            return 0
            }
            if(!chknloadV4()){
                erLog('Fail_3:', 'Backfill Iframe reference not found. productFrame = ' + productFrame + ', check_for_iframe:' + check_for_iframe);
            }
            return F;
        }
    }


    //Following part will use placement & size details to invoke adtech ad iframe
    var newIframeSrc = '';
    if(typeof (c.placement) !== undefinedVal && c.placement != '') {
        if(c.placement > 0) {
            p = c.placement;
        } else {
            p = '';
        }
    } else {
        erLog('Fail_4:', 'PlacementId not found in frame src. Frame Src : ' + en(required_src));
        return false;
    }
    if(typeof (c.size) !== undefinedVal && c.size !== '') {
        s = c.size;
    } else {
        erLog('Fail_5:', 'SizeId not found in frame src. Frame Src : ' + en(required_src));
        return false;
    }
    if(typeof (c.kvuniqimp) !== undefinedVal && c.kvuniqimp !== '') {
        if(c.kvuniqimp.length > 25) {
            kvuuid = c.kvuniqimp;
        } else {
            kvuuid = '';
        }
    } else {
        erLog('Fail_6:', 'kvuniqimp not found in frame src. Frame Src : ' + en(required_src));
        return false;
    }
    //-=
    if("3"==(c.bkfl||F)){
        if(("5.8"!=iejsv)&&("9"!=iejsv)&&("5.7"!=iejsv)){
            try{
                if(bkflv3('P2')){return}
                try{if(ifr.parent._aff_pxlm){window._aff_pxlm=function(s,b,i,p){p=p||'';return ifr.parent._aff_pxlm(s,b,i,p+',ifrB'+VV)}}}catch(e){}
                if(bkflv3('P3')){return}
                ifr=ifr.contentWindow||ifr.window;
                if((window.JSON||F)&&(ifr.postMessage||F)){
                    try{
                        if(ifr._aff_pxlm||F){
                            window._aff_pxlm=function(s,b,i,p){p=p||'';return ifr._aff_pxlm(s,b,i,p+',ifrA'+VV)};
                            if(bkflv3('P4')){
                                    updateHash(c,ifr,check_for_iframe,ipSize,bkf,1);
                                    return
                            }
                        }
                    }catch(e){}

                    if(Rebkfl.isFrameBkfl(location.href)){
                        var pmx=3,pp=window.parent;
                        while(0<pmx--){
                            try{if(Rebkfl.isFrameBkfl(pp.location.href)&&('function'==typeof (pp._aff_pxlm||F))){
                                window._aff_pxlm=function(s,b,i,p){p=p||'';return pp._aff_pxlm(s,b,i,p+',pp'+VV)};
                                if(bkflv3('P5')){return}
                            }}catch(e){}
                            pp=pp.parent
                        }
                    }
                    ifr.xfr=ifr.xfr||{};var r='xfr_'+Math.random();ifr.xfr[r]=window;
                    ifr.parent.postMessage(['_affinity_ip_bkfl_v3_',sizeId,_affinity_bkf_s_name_,c.kvuniqimp,r].join(","),"*")
                    return;
                }
            }catch(e1){erLog('Fail_v3A:',[(e1.message||e1)+'&ch=',check_for_iframe,'&src=',required_src].join(''))}
        }
        if(bft!=(c.bftype||'') ){erLog('Info-bft_not_matched', bft+":"+(c.bftype||''))}
        if(('openx_backfill'==bkf)&&('dfp_backfill,google_backfill'!=bft)){
            erLog('INFO-Debug-Patch1', [(check_for_iframe?'LHR':'SRC'),c.bi||'-',c.bftype||'-',c.kvreqseq||'-',c.kvuniqimp||'-',required_src].join('__') );
            c.kvreqseq=4;
            c.bi='10,11';
            bft=c.bftype='dfp_backfill,google_backfill';
        }else{
            bft=c.bftype;
        }

        try{
        c.kvreqseq=c.kvreqseq|0;
        c.bftype=((c.bftype||F)?(c.bftype+','):'')+bkf;
        if((check_for_iframe===T)&&(ifr.strParam||F)){if(ifr.strParam.bi||F){c.bi=ifr.strParam.bi}}
        var d=[''];for(var i in c){if(c.hasOwnProperty(i)){d.push(i+'='+c[i])}}d=d.join('&');
        try{if(check_for_iframe===T){ifr.location.hash=d}
        else{if(defersrc!==F){ifr.setAttribute('defersrc',bkfUrl+'#'+d)}ifr.src=bkfUrl+'#'+d}
        }catch(e){erLog('Fail_91:',e)}
        var rnm=('_aff_updFlag'+Math.random()).replace(".",'_');
        window[rnm]=function(n){if(n||F){try{for(var x in n){if(n.hasOwnProperty(x)){if(check_for_iframe){ifr.strParam[x]=n[x]}else{c[x]=n[x]}}}if(!check_for_iframe){var d=[''],iejsv="9";for(i in c){if(c.hasOwnProperty(i)){d.push(i+'='+c[i])}}d=d.join('&'),s=bkfUrl+'#'+d,D=document;if(("9"==iejsv)||("5.8"==iejsv)||("5.7"==iejsv)){var fid='IFR_IP_'+ipSize+'_WEB',of=D.getElementById(fid),p=0;if(of){p=gPar(of)}if('loading'==D.readyState){if(p){p.removeChild(of)}D.write('<iframe src="'+s+'" id="'+fid+'" width="0" height="0" border="0" style="display:none;padding:0px;margin:0px;border:0px none;width:0px;height:0px;"></iframe>')}else{var of2=D.createElement('iframe'),Z='0px',at={'id':fid,'name':fid,'width':Z,'height':Z,'border':Z,'frameborder':Z};for(var k in at){if(at.hasOwnProperty(k)){try{of2[k]=at[k]}catch(e){}of2.setAttribute(k,at[k])}}of2.style.display='none';if(p){p.insertBefore(of2,of);p.removeChild(of)}else{D.body.appendChild(of2)}of2.src=s}}else{ifr.src=s}}}catch(e){}}};
        document.write(SU(['http://ip.ph.affinity.com/xc.php?pid=',(c.pid||''),
            '&defcmp=',c.defcmp,'&bkf=',bkf,'&kvuniqimp=',c.kvuniqimp,
            '&kvreqseq=',(c.kvreqseq-1),'&bi=',(c.bi||''),'&bl=',(bft||''),
            '&rnm=',rnm,'&er=',(c.er|0),'&vv=',VV].join('')))
        }catch(e1){erLog('Fail_v3B:',[(e1.message||e1)+'&ch=',check_for_iframe,'&src=',required_src].join(''))}
        return
    }
    //-=
    if(bft!=''){
        if(checkInArray(bkf, bft) === true) {
            //erLog('Fail_12:', 'BAE-Incoming---'+bkf+'---Previous---'+bft+'|'+bkf+'---required_src='+ (required_src) );
            if( p != 3206746 ){
                erLog('INFO2-Fail_13:', 'Blocked-Incoming---' + bkf + '---Previous---' + bft + ':' + bkf + '::' + p + '---required_src=' + (required_src));
                return false;
            }
            else{
                erLog('INFO2-Fail_12:', 'BAE-Incoming---' + bkf + '---Previous---' + bft + '|' + bkf + '::' + p + '---required_src=' + (required_src));
            }
        }

        ipDataIF['bftype'] = bft + ',' + bkf;
    } else {
        ipDataIF['bftype'] = bkf;
    }

    if(typeof (c.kvreqseq) !== undefinedVal && c.kvreqseq !== '') {
        kvreqseq = parseInt(c.kvreqseq);
        for (i in ipDataIF) {
            if( ipDataIF.hasOwnProperty(i) ){
                newIframeSrc = newIframeSrc + '&' + i + '=' + ipDataIF[i];
            }
        }
    } else {
        erLog('Fail_7:', 'kvreqseq not found in frame src. Frame Src : ' + en(required_src));
        return F;
    }

    if((''!==p) && (''!==s) && (''!==bkf) && (''!==kvuuid) ){
        if( (p.length<5) || (kvuuid.length<25) ) {
            return F;
        }

        if(kvreqseq > 5){
            erLog('Fail_8:', 'kvreqseq count reached limit. Frame Src : ' + en(required_src));
            return F;
        }

        try{
            if(check_for_iframe === T){
                ifr.location.hash=newIframeSrc;
            }else{
                if(defersrc!==F){
                    ifr.setAttribute('defersrc','http://backfill.ph.affinity.com/IFR_IP_WEB.html#'+newIframeSrc);
                }
                ifr.src='http://backfill.ph.affinity.com/IFR_IP_WEB.html#'+newIframeSrc;
            }
        }catch(e){erLog('INFO2-Fail_9:',e);}

        if(kvreqseq <= 5){
			var afkv=[],sAfkv='',bkwds='';
			if((2==kvreqseq)&&("2"===(ipDataIF['afkvads']||F))){
				if(ipDataIF['afkv']||F){
					afkv.push(de(ipDataIF['afkv']).replace(/:/g,'=').replace(/\^/g,';'));
				}
				if(ipDataIF['kvaltcat']||F){
					afkv.push('kvaltcat=1');
				}
				if(0<afkv.length){
					sAfkv=';'+afkv.join(';');
				}
				if(ipDataIF['bkwds']||F){
					bkwds='+'+ipDataIF['bkwds'];
				}
			}
			ifrTp.push('adtp_'+ p);
            //debug(['<br><span>',p,s,kvreqseq,bkf,kvuuid,'</span>']);
            var str = '<scr' + 'ipt language="javascript1.1" src="http://adnet.affinity.com/addyn/3.0/5359.1/' + p + '/0/' + s + '/ADTECH;loc=100;cookie=yes;target=_blank;kvadvbackfill=' + bkf + ';kvuniqimp=' + kvuuid + ';key=' + bkf + bkwds + ';grp=[group];misc=' + new Date().getTime() + ';kvreqseq=' + kvreqseq + ';kvrit=' + new Date().getTime() + sAfkv + ';rdclick="></scri' + 'pt>';
            //document.write('<br>AD-IP'+bkf);str=SU('http://ip.ph.affinity.com/jslib/ad.php?defcmp='+ipDataIF.defcmp+'&kvreqseq='+kvreqseq);
			document.write(str);
            erLog('INFO-'+oldOrNew, oldOrNew);
        }
    }else{erLog('Fail_10:', 'PlacementId, SizeId, bkf, kvuuid not found. Frame Src : ' + en(required_src));}
}catch(e){erLog('Fail_last:', e);}
})(window,document);
(function(){return;try{if("backfill.ph.affinity.com"===(location.host||location.hostname)){var f=new Date(),k=[f.getDate(),f.getMonth(),f.getFullYear()].join('-'),l='phch-A',g=document,m='cookie',n='substring',h='length',i='setRequestHeader',o='http://backfill.ph.affinity.com/IFR_IP_WEB.html';function p(j){var d=j+"=",e=g[m].split(';'),b,c;for(b=0;b<e[h];b++){c=e[b];while(c.charAt(0)==' '){c=c[n](1)}if(c.indexOf(d)==0){return c[n](d[h],c[h])}}return""}function q(j,d,e){var b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));g[m]=j+"="+d+"; expires="+b.toUTCString()}if(''==p('PHRX')){return}if(k!=p(l)){q(l,k,1);var a=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");a.open("GET",o,true);if(a[i]||0){a[i]("If-Modified-Since","Tue, 07 Sep 1999 06:13:37 GMT");a[i]("Cache-Control","no-cache")}a.send()}}}catch(e){}})();