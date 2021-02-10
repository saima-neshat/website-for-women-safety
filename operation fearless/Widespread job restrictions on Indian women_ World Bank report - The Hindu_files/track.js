function tracklog(pr_data){
	try{
		var conf = {'ver':'1.8.5' , 'logurl': '//imtx.ph.affinity.com/v/01'},o={},T=!0,F=!1,W=window,D=document;

		conf.logurl = (window.location.protocol == "https:" ? "https:" : "http:") + conf.logurl;
		setTimeout(function(){main()} , 1);

		function main(){
			try{
				o.ch = !!W.chrome;
				if(o.ch){
					if( W['chrome'].loadTimes.toString().indexOf("function () {  native function") === 0 ){
						o.ch = T;
					}
				}				
			}catch(e){
				o.ch = F;
			}
		 //W['chrome'].loadTimes.toString() == "function () {  native function"

		 o.op = !!W.opera;
		 o.sf= Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		 o.ff =( ('watch' in D.getElementById)||F );
		 o.ie_cc= /*@cc_on!@*/F;
		 o.ie_ax=!!W.ActiveXObject;
		 o.ie_vt=( '\v' == 'v' );

		 o.ua =  W.navigator.userAgent;
		 //var w = Math.min(D.documentElement.clientWidth, W.innerWidth || 0);
		 //var h = Math.min(D.documentElement.clientHeight, W.innerHeight || 0);
		 var vp = getvp(W);
		 o.vp = vp.width +"x"+ vp.height;
		 o.ifrmsize = ifrmsize(vp.width,vp.height);

		 //o.screen = W.screen.width + "x" + W.screen.height;
		 //D.body.getBoundingClientRect()
		 //D.body.getClientRects()

		 //o.isFrame= W !== top;
		 o.isFrame = !( (W === W.top) || (this === W.top) || (W.self === W.top) );

		try{
		 	if( D.referrer != undefined && D.referrer != "" ){
		 		o.docRefr = D.referrer;
				o.docRefrType ="a";//o.docRefrType = "D.referrer";
			}
		}catch(er){
			o.docRefr ="";o.docRefrType ="";
		}

		try{
			if(o.docRefr == "" || o.docRefr == undefined){
				if(top.document.referrer != undefined  ||  top.document.referrer != "" ){
					o.docRefr = top.document.referrer;
					o.docRefrType ="b";//o.docRefrType = "top.document.referrer";
				}
			}
		}catch(er){
			o.docRefr ="";o.docRefrType ="";
		}

		try{
			if(o.docRefr == "" || o.docRefr == undefined){
				if(W.parent.location.href != undefined || W.parent.location.href !="" ){
					o.docRefr = W.parent.location.href;
				   o.docRefrType ="c";//o.docRefrType = "W.parent.location.href";
				}
			}
		}catch(er){
			o.docRefr ="";o.docRefrType ="";
		}

		try{
			if(o.docRefr == "" || o.docRefr == undefined){
				if(W.parent.parent.location.href != undefined || W.parent.parent.location.href !="" ){
					o.docRefr = W.parent.parent.location.href;
					o.docRefrType ="d";//o.docRefrType = "W.parent.parent.location.href";
				}
			}
		}catch(er){
			o.docRefr ="";o.docRefrType ="";
		}


		if( W.opener || F  ){
			try{
				o.docRefr = W.opener.location.href;
			   	o.docRefrType ="e";//o.docRefrType = "W.opener";
			}catch(er){
				o.docRefr ="";o.docRefrType ="";
			}   	
		}
			
			if(o.docRefr != undefined ){
				o.docRefrDom = o.docRefr.split('/')[2]||"";
				o.docRefr.substring(0, 500 );
			}

			o.durl = D.URL||location.href;
			o.durl = o.durl.substring(0, 500 );
			o.ddomain = o.durl.split('/')[2]||"";

			o.depth = depth();

			o.active = active();

			basicLog(pr_data, o);


			if( o.active === F ){
				activeDepthChk(0);
			}

			try{
				W.onscroll = function(){activeChk("onscroll")};
				W.onresize = function(){activeChk("onresize")};
				D.onclick = function(){activeChk("onclick")};
				D.onmousemove = function(){activeChk("onmousemove")};

				if(o.vp == "0x0"){
					var prevOnLoad = window.onload;
					window.onload = function(){
						if(prevOnLoad)prevOnLoad();
						logOnLoadVp(o.vp , 0);
					};
				}
			}catch(er){erLog('eventerr:'+er.message , pr_data);}
		}
	}catch (e) {erLog('err:'+e.message , pr_data);}

	function getvp(wind){
		var W = wind,D = wind.document;
		var w=0,h=0;
		try{
			var clW =  D.documentElement.clientWidth, clH  =  D.documentElement.clientHeight;
			var inW =  W.innerWidth , inH =  W.innerHeight ;

			if( isNaN(clW) ){ clW = -1 }
			if( isNaN(inW) ){ inW = -1 }
			if( isNaN(clH) ){ clH = -1 }
			if( isNaN(inH) ){ inH = -1 }

			if(inW > -1 && clW > -1 ){
				w = Math.min( clW, inW );
			}else{
				w = Math.max( clW, inW );
			}

			if(inH > -1 && clH > -1 ){
				h = Math.min( clH, inH );
			}else{
				h = Math.max( clH, inH );
			}

			try{
				if(w === 0 ){w = parseInt(this.frameElement.width);}
				if(h === 0 ){h = parseInt(this.frameElement.height);}
			}catch(er){}

		}catch(er){}
		return { 'width' : w , 'height': h};

			/*
			w = ( (W.innerWidth || 0 ) > 0  ? W.innerWidth : 0 );
			if( (w < 1) && !((isNaN(D.documentElement.clientWidth ) || D.documentElement.clientWidth < 0)) ){
				 w = Math.min(D.documentElement.clientWidth, W.innerWidth || 0);
			}

			h = ( (W.innerHeight || 0) > 0  ? W.innerHeight : 0 );
			if( ( h < 1 ) && !( (isNaN(D.documentElement.clientHeight ) || D.documentElement.clientHeight < 0) ) ){
				 h = Math.min(D.documentElement.clientHeight, W.innerHeight || 0);
			}

			w = ( (W.innerWidth || 0 ) > 0  ? W.innerWidth : 0 );
			if( (w > 1) && !((isNaN(D.documentElement.clientWidth ) || D.documentElement.clientWidth < 0)) ){
				w = Math.min(D.documentElement.clientWidth, W.innerWidth || 0);
			}


			var h = Math.min(D.documentElement.clientHeight, W.innerHeight || 0);

			if(isNaN(D.documentElement.clientWidth ) || D.documentElement.clientWidth < 0){
				w = ( (W.innerWidth || 0) > 0  ? W.innerWidth : 0 );
			}


			if(isNaN(D.documentElement.clientHeight ) || D.documentElement.clientHeight < 0){
				h = ( (W.innerHeight || 0) > 0  ? W.innerHeight : 0 );
			}
			*/
	}

	function logOnLoadVp(p_vp,count){
		var objvp = getvp(window);
		var vp = objvp.width +"x"+ objvp.height;

		setTimeout(function(){
			if(vp == "0x0" && count < 5){
				logOnLoadVp(p_vp , ++count);
			}else{
				var qStr = conf.logurl+"/"+conf.ver+"/log.png?tp=onloadvp&uuid="+pr_data.uuid+"&p_vp="+p_vp+"&vp="+vp;
				var img = new Image();
				img.src=qStr;
			}
		},100);
	}

	function isFrame(wind){
		return false;
		//return (top !== wind || top === wind.this || top === wind.this );

	}

	function activeDepthChk( depth ){
		if( depth <= 10){
			if(o.later_active != T){
				activeChk("depth");
				depth++;
				setTimeout(function(){ activeDepthChk(depth);} , 1000);
			}
		}
	}

	function activeChk(tpe){
		if(o.later_active != T && o.active != T ){
			o.later_active = active();
			if(o.later_active){
				var qStr = conf.logurl+"/"+conf.ver+"/log.png?tp=activechk&affuid="+getUid(pr_data.uuid)+"&tpe="+tpe;
				var img = new Image();
				img.src=qStr;
			}
		}
	};

	function active(){
		try{
			return D.hasFocus();
		}catch(e) {
			try {
				if(D.hidden == F){
					return T;
				}else{return F;}
			}catch(e){}
		}
	}

	function depth(){
		var i=0,o=W;
		while(o!==top){
			i++;o=o.parent;
		}
		return i;
	}

	function ifrmsize(pw , ph){
		var i=0,o=W;
		var str = "";
		try{
			while(o !==top || o.self !== top ){
				try{
					var vp = getvp(o);
					var w = vp.width;
					var h = vp.height;
					if(pw < w || ph < h ){
						str+="dp^"+i+"@loc^"+W.location.host+"@w^"+w+"@h^"+h;
					}
				}catch(er){}
				i++;o=o.parent;
			}
		}catch(er){

		}
		return str;
	}

	function Xurl()
	{
		var th="",w=window,d2=[],n=0,u={},F=!1,T=!0,f=F,U={},UN=100,udef="undefined",lr="";

		//if(window===top){return "";}
		if( ( (W === W.top) || (this === W.top) || (self === W.top) ) ){return "DE=1&";}
		try{th=top.location.href||"";}catch(e){}
		if(th!==""){return "DE=2&";}

	    function dmn(u){
			//return "" + u;
			try{
				u=decodeURIComponent(u);
				var a=u.split("/");
				u=a[2]||u;
			}catch(e){u=""+e;}
			return u;
	    }

	    function en(s){
			try{
				s=encodeURIComponent(s);
			}catch(e){s=""+e;}
			return s;
	    }

	    function uid(d){
			if( !(U[d]||F) ){
				U[d]=UN;
				UN++;
			}
			return U[d];
	    }

	    do{
			n++;
			//u={'h':'-', 'du':'-', 'dd':'-', 'r':'-','t':(w===top)?1:0};
			u={'h':'-', 'du':'-', 'dd':'-', 'r':'-','t':( ( (w===W.top) || (W.self === W.top) ) ) ? 1:0};

			f=F;
			try{u.h=dmn(w.location.href);f=f||(u.h!==udef);}catch(ignore){}
			try{u.du=dmn(w.document.URL);f=f||(u.h!==udef);}catch(ignore){}
			try{u.dd=dmn(w.document.domain);f=f||(u.h!==udef);}catch(ignore){}
			try{lr=w.document.referrer;u.r=dmn(lr);f=f||(u.h!==udef);}catch(ignore){}
			if(f){
				    d2.push([
				            "D[",n,"][h]=",uid(u.h),
				            "&D[",n,"][du]=",uid(u.du),
				            "&D[",n,"][dd]=",uid(u.dd),
				            "&D[",n,"][r]=",uid(u.r),
				            "&D[",n,"][t]=",u.t ].join('') );
			}

			//if(w===top){
			if( ( (w===W.top) || (w.self===W.top)) ){
				w=F;
				break;
			}
			w=w.parent;
			if(n > 50){break;}
	    }while(w);

	    d2.push('mx='+n);

	    var x,ar=[];
	    for(x in U){
			if( U.hasOwnProperty(x)){
				ar.push( [ "u[" , U[x] , "]=" , en(x)].join("") );
			}
	    }
	    return d2.join('&') + '&' + ar.join("&") + '&lr=' + en(lr) + '&' ;
	}
	function basicLog(pr_data , brow){
		var q= [],p;
		for(p in brow){
			if(!brow.hasOwnProperty(p)){continue;}
			if(p != "docRefr" &&  p != "durl" ){
				if(typeof brow[p] === "boolean"){
					brow[p] = brow[p] ? 1 :0;
				}
				q.push(p + "=" + encodeURIComponent(brow[p]));
			}
		}

		for(p in pr_data){
			if(!pr_data.hasOwnProperty(p)){continue;}
			if(typeof pr_data[p] === "boolean"){
				pr_data[p] = pr_data[p] ? 1 :0;
			}
			q.push(p + "=" + encodeURIComponent(pr_data[p]));
		}

		if(brow['durl'] != undefined){
			q.push("durl=" + encodeURIComponent(brow["durl"]));
		}

		if(brow['docRefr'] != undefined){
			q.push("docRefr=" + encodeURIComponent(brow["docRefr"]));
		}


		if(pr_data.uuid !== undefined){
			var qStr = conf.logurl+"/"+conf.ver+"/log.png?tp=trck&affuid="+getUid(pr_data.uuid) + "&" + Xurl()  +q.join("&");
			var img = new Image();
			img.src=qStr;

		}
	}

	function erLog(msg, pr_data){
		var q= [];
		q.push("msg="+msg);
		for(p in pr_data){
			q.push(p + "=" + encodeURIComponent(pr_data[p]));
		}

		if(pr_data.uuid !== undefined){
			var qStr = conf.logurl+"/"+conf.ver+"/log.png?tp=err&affuid="+getUid(pr_data.uuid)+"&"+q.join("&");
			var img = new Image()
			img.src=qStr;
		}
	}

	function getUid(uuid){
		try{
			if( typeof _afsuid  === "undefined" && o.isFrame  ){
				if(typeof top.window._afsuid !== "undefined"){
					_afsuid = top.window._afsuid
				}else if( ( typeof W.parent.window._afsuid  !== "undefined" ) )   {
					_afsuid = W.parent.window._afsuid
				}else if( ( typeof W.parent.parent.window._afsuid  !== "undefined" ) )  {
					_afsuid = W.parent.parent.window._afsuid
				}
			}
			if( typeof _afsuid  === "undefined"){
				_afsuid = "afsuid_"+uuid;
			}
		}catch(er){
			_afsuid = "afsuid_"+uuid;

		}
		return _afsuid;
	}

	Array.min = function( array ){
        return Math.min.apply( Math, array );
    };
    
	function in_array(array, id){
	  var ret = false;
	  for(var i=0;i<array.length;i++){
		if(array[i] == id){
		  ret = true;
		}
	  }
	  return ret;
	}
}

if(typeof _aftrckjson != "undefined") tracklog(_aftrckjson);