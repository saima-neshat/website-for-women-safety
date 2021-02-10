﻿
(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.PortholeClass=function(){};PortholeClass.extend=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&this.init){this.init.apply(this,arguments)}}c.prototype=e;c.prototype.constructor=c;c.extend=arguments.callee;return c}})();(function(c){var b={debug:false,trace:function(d){if(this.debug&&c.console!==undefined){c.console.log("Porthole: "+ d)}},error:function(d){if(c.console!==undefined){c.console.error("Porthole: "+ d)}}};b.WindowProxy=function(){};b.WindowProxy.prototype={post:function(e,d){},addEventListener:function(d){},removeEventListener:function(d){}};b.WindowProxyBase=PortholeClass.extend({init:function(d){if(d===undefined){d=""}this.targetWindowName=d;this.origin=c.location.protocol+"//"+ c.location.host;this.eventListeners=[]},getTargetWindowName:function(){return this.targetWindowName},getOrigin:function(){return this.origin},getTargetWindow:function(){return b.WindowProxy.getTargetWindow(this.targetWindowName)},post:function(e,d){if(d===undefined){d="*"}this.dispatchMessage({data:e,sourceOrigin:this.getOrigin(),targetOrigin:d,sourceWindowName:c.name,targetWindowName:this.getTargetWindowName()})},addEventListener:function(d){this.eventListeners.push(d);return d},removeEventListener:function(g){var d;try{d=this.eventListeners.indexOf(g);this.eventListeners.splice(d,1)}catch(h){this.eventListeners=[]}},dispatchEvent:function(f){var d;for(d=0;d<this.eventListeners.length;d++){try{this.eventListeners[d](f)}catch(g){}}}});b.WindowProxyLegacy=b.WindowProxyBase.extend({init:function(d,e){this._super(e);if(d!==null){this.proxyIFrameName=this.targetWindowName+"ProxyIFrame";this.proxyIFrameLocation=d;this.proxyIFrameElement=this.createIFrameProxy()}else{this.proxyIFrameElement=null;b.trace("proxyIFrameUrl is null, window will be a receiver only");this.post=function(){throw new Error("Receiver only window")}}},createIFrameProxy:function(){var d=document.createElement("iframe");d.setAttribute("id",this.proxyIFrameName);d.setAttribute("name",this.proxyIFrameName);d.setAttribute("src",this.proxyIFrameLocation);d.setAttribute("frameBorder","1");d.setAttribute("scrolling","auto");d.setAttribute("width",30);d.setAttribute("height",30);d.setAttribute("style","position: absolute; left: -100px; top:0px;");if(d.style.setAttribute){d.style.setAttribute("cssText","position: absolute; left: -100px; top:0px;")}document.body.appendChild(d);return d},dispatchMessage:function(e){var d=c.encodeURIComponent;if(this.proxyIFrameElement){var f=this.proxyIFrameLocation+"#"+ d(b.WindowProxy.serialize(e));this.proxyIFrameElement.setAttribute("src",f);this.proxyIFrameElement.height=this.proxyIFrameElement.height>50?50:100}}});b.WindowProxyHTML5=b.WindowProxyBase.extend({init:function(d,e){this._super(e);this.eventListenerCallback=null},dispatchMessage:function(d){this.getTargetWindow().postMessage(b.WindowProxy.serialize(d),d.targetOrigin)},addEventListener:function(e){if(this.eventListeners.length===0){var d=this;if(c.addEventListener){this.eventListenerCallback=function(f){d.eventListener(d,f)};c.addEventListener("message",this.eventListenerCallback,false)}else{if(c.attachEvent){this.eventListenerCallback=function(f){d.eventListener(d,c.event)};c.attachEvent("onmessage",this.eventListenerCallback)}}}return this._super(e)},removeEventListener:function(d){this._super(d);if(this.eventListeners.length===0){if(c.removeEventListener){c.removeEventListener("message",this.eventListenerCallback)}else{if(c.detachEvent){if(typeof c.onmessage==="undefined"){c.onmessage=null}c.detachEvent("onmessage",this.eventListenerCallback)}}this.eventListenerCallback=null}},eventListener:function(e,d){var f=b.WindowProxy.unserialize(d.data);if(f&&(e.targetWindowName===""||f.sourceWindowName==e.targetWindowName)){e.dispatchEvent(new b.MessageEvent(f.data,d.origin,e))}}});if(!c.postMessage){b.trace("Using legacy browser support");b.WindowProxy=b.WindowProxyLegacy.extend({})}else{b.trace("Using built-in browser support");b.WindowProxy=b.WindowProxyHTML5.extend({})}b.WindowProxy.serialize=function(d){if(typeof JSON==="undefined"){throw new Error("Porthole serialization depends on JSON!")}return JSON.stringify(d)};b.WindowProxy.unserialize=function(g){if(typeof JSON==="undefined"){throw new Error("Porthole unserialization dependens on JSON!")}try{var d=JSON.parse(g)}catch(f){return false}return d};b.WindowProxy.getTargetWindow=function(d){if(d===""){return parent}else{if(d==="top"||d==="parent"){return c[d]}}return c.frames[d]};b.MessageEvent=function a(f,d,e){this.data=f;this.origin=d;this.source=e};b.WindowProxyDispatcher={forwardMessageEvent:function(i){var g,h=c.decodeURIComponent,f,d;if(document.location.hash.length>0){g=b.WindowProxy.unserialize(h(document.location.hash.substr(1)));f=b.WindowProxy.getTargetWindow(g.targetWindowName);d=b.WindowProxyDispatcher.findWindowProxyObjectInWindow(f,g.sourceWindowName);if(d){if(d.origin===g.targetOrigin||g.targetOrigin==="*"){d.dispatchEvent(new b.MessageEvent(g.data,g.sourceOrigin,d))}else{b.error("Target origin "+ d.origin+" does not match desired target of "+ g.targetOrigin)}}else{b.error("Could not find window proxy object on the target window")}}},findWindowProxyObjectInWindow:function(d,g){var f;if(d){for(f in d){if(Object.prototype.hasOwnProperty.call(d,f)){try{if(d[f]!==null&&typeof d[f]==="object"&&d[f]instanceof d.Porthole.WindowProxy&&d[f].getTargetWindowName()===g){return d[f]}}catch(h){}}}}return null},start:function(){if(c.addEventListener){c.addEventListener("resize",b.WindowProxyDispatcher.forwardMessageEvent,false)}else{if(c.attachEvent&&c.postMessage!=="undefined"){c.attachEvent("onresize",b.WindowProxyDispatcher.forwardMessageEvent)}else{if(document.body.attachEvent){c.attachEvent("onresize",b.WindowProxyDispatcher.forwardMessageEvent)}else{b.error("Cannot attach resize event")}}}}};if(typeof c.exports!=="undefined"){c.exports.Porthole=b}else{c.Porthole=b}})(this);var vuukle_platform_loaded=false,vuukle_div=((typeof OVERRIDE_VUUKLE_DIVID!=="undefined"&&OVERRIDE_VUUKLE_DIVID.length>0)?OVERRIDE_VUUKLE_DIVID:"vuukle_div"),vuukle_div_comment_now="vuukle_div_comment_now",baseURLVK=(location.protocol=="https:"?"https:":"http:")+"//vuukle.com",rating_urlVK=baseURLVK+"/rating.aspx?uri=",emote_urlVK=baseURLVK+"/emote.aspx?uri=",powerBar_urlVK=baseURLVK+"/powerbar.html?uri=",commentnow_url=baseURLVK+"/commentNow.aspx?uri=",windowProxyVK,windowEmoteVK,windowPowerBarVK,commentNowProxy,iframeVuukle,iframeCommentNow,vuukle_col_code,vuukle_event,vuukle_article_url=((typeof OVERRIDE_VUUKLE_URL!=="undefined"&&OVERRIDE_VUUKLE_URL.length>0)?OVERRIDE_VUUKLE_URL:document.URL.split('#')[0]),vuukle_show_notify=true;var a=document.createElement('a');a.href=document.referrer;var vuukleRefHost=a.hostname;var Vuukle_scrollbars_offset=25;var _watchVK=[];function vuukle_monitor(element,options){var item={element:element,options:options,invp:false};_watchVK.push(item);return item;}
function getScrollOfElementVuukle(element){var method='scrollTop';return(element===window||element===document)?(self[(method==='scrollTop')?'pageYOffset':'pageXOffset']||(document.documentElement[method])||document.body[method]):element[method];}
function offsetVK(element){var body=document.body,win=document.defaultView,docElem=document.documentElement,box=document.createElement('div');box.style.paddingLeft=box.style.width="1px";body.appendChild(box);var isBoxModel=box.offsetWidth===2;body.removeChild(box);box=element.getBoundingClientRect();var clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=win.pageYOffset||isBoxModel&&docElem.scrollTop||body.scrollTop,scrollLeft=win.pageXOffset||isBoxModel&&docElem.scrollLeft||body.scrollLeft;return{top:box.top+ scrollTop- clientTop,left:box.left+ scrollLeft- clientLeft};}
function testInViewVuukle($el){var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],y=w.innerHeight||e.clientHeight||g.clientHeight;var docViewTop=getScrollOfElementVuukle(window);var docViewBottom=docViewTop+ y;var elemTop=offsetVK($el).top;var elemBottom=elemTop+ $el.style.height;return((elemBottom<docViewBottom&&elemBottom>docViewTop)||(elemTop<docViewBottom));}
function testAboutToViewTalk($el){var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],y=w.innerHeight||e.clientHeight||g.clientHeight;var docViewTop=getScrollOfElementVuukle(window);var docViewBottom=docViewTop+ y;var elemTop=offsetVK($el).top+ 300;var elemBottom=elemTop+ $el.style.height;return((elemBottom<docViewBottom&&elemBottom>docViewTop)||(elemTop<docViewBottom));}
var currentlyInViewVK=false;var talkViewedVK=false;var showSnippetVK=(!(window.VUUKLE_DISABLE_NOTIFICATION&&window.VUUKLE_DISABLE_NOTIFICATION===true));var indexVK=0;function checkInViewVK(e){for(var i=0;i<_watchVK.length;++i){if(testInViewVuukle(_watchVK[i].element)){if(!currentlyInViewVK){indexVK++;currentlyInViewVK=true;document.getElementById("vuukle-reminder").style.opacity='0';}}
else{}
if(!talkViewedVK&&testAboutToViewTalk(_watchVK[i].element)){talkViewedVK=true;if(windowProxyVK&&windowProxyVK.post){windowProxyVK.post({viewed:true});}}}}
function vuukle_getURLParams(name){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+ name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);return results==null?"":results[1];}
function domReady(){var _buffer=null;window.onscroll=function(e){if(!_buffer){_buffer=setTimeout(function(){checkInViewVK(e);if(showSnippetVK){if(document.getElementById("vuukle-reminder").innerHTML.length>0){document.getElementById("vuukle-reminder").style.opacity='1';setTimeout(function(){document.getElementById("vuukle-reminder").style.opacity='0';},12000);showSnippetVK=false;}}
_buffer=null;},300);}};vuukle_monitor(document.getElementById(vuukle_div),{});}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);domReady();},false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);domReady();}});}
function cleanHTMLVK(input){if(!input){return"";}
return input.replace("&nbsp;"," ").replace("%A0","%20").replace("&#039;","'");}
function load_vuukle(vuukle_params){create_vuukle_platform(vuukle_params.apiKey,vuukle_params.articleID,vuukle_params.disable,vuukle_params.tags,vuukle_params.heading,vuukle_params.language,vuukle_params.language_default,vuukle_params.char_length);}
function loadDefaults(){vuukle_div=((typeof OVERRIDE_VUUKLE_DIVID!=="undefined"&&OVERRIDE_VUUKLE_DIVID.length>0)?OVERRIDE_VUUKLE_DIVID:"vuukle_div");vuukle_article_url=((typeof OVERRIDE_VUUKLE_URL!=="undefined"&&OVERRIDE_VUUKLE_URL.length>0)?OVERRIDE_VUUKLE_URL:document.URL.split('#')[0]);vuukle_show_notify=((typeof VUUKLE_COMMENT_NOTIFY!=="undefined")?VUUKLE_COMMENT_NOTIFY:true);vuukleInsertReminder();}
function create_vuukle_platform(id,bizUniqueId,d,t,h,l,l_d,cl,gaCode,colCode,author){loadDefaults();if(id==="1f5b2572-8e5c-11e4-9de7-002590f371ee"){return false;}
windowProxyVK=new Porthole.WindowProxy(rating_urlVK,"vuukle_proxy");windowEmoteVK=new Porthole.WindowProxy(emote_urlVK,"vuukle_proxy_emote");windowEmoteVK.addEventListener(onMessageVuukle);windowPowerBarVK=new Porthole.WindowProxy(powerBar_urlVK,"vuukle_proxy_powerbar");windowPowerBarVK.addEventListener(onMessageVuukle);commentNowProxy=new Porthole.WindowProxy(commentnow_url,"vuukle_proxy_comment_now");commentNowProxy.addEventListener(onMessageVuukle);windowProxyVK.addEventListener(onMessageVuukle);var vuuklepageInfo=new Object();vuuklepageInfo.author=author;var metas=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0,L=metas.length;i<L;i++){if(metas[i].getAttribute("property")==="og:title"){vuuklepageInfo.title=unescape(cleanHTMLVK(escape(metas[i].content)));}
if(metas[i].getAttribute("property")==="og:image"){vuuklepageInfo.img=metas[i].content;var rgx=/^h[^<>'"]+$/ig;if(!vuuklepageInfo.img.match(rgx)){vuuklepageInfo.img=vuuklepageInfo.img.match(/http.?:[^'"]+/ig);}}
if(metas[i].getAttribute("name")==="twitter:image:src"){vuuklepageInfo.img=metas[i].content;}}
if(window.VUUKLE_ARTICLE_IMG){vuuklepageInfo.img=window.VUUKLE_ARTICLE_IMG;}
if(typeof VUUKLE_STORIES_TIME!=="undefined"){vuuklepageInfo.stories_time=window.VUUKLE_STORIES_TIME;}
if(window.VUUKLE_FILTER_TAG){vuuklepageInfo.filter_tag=window.VUUKLE_FILTER_TAG;}
if(window.VUUKLE_COMMENT_COUNT){vuuklepageInfo.comment_count=window.VUUKLE_COMMENT_COUNT;}
if(window.VUUKLE_CUSTOM_TEXT){vuuklepageInfo.custom_text=window.VUUKLE_CUSTOM_TEXT;}
vuuklepageInfo.refHost=vuukleRefHost;vuuklepageInfo.parentHost=window.location.hostname;vuuklepageInfo.canon=0;var vuukleCanonE=document.querySelector("link[rel='canonical']");var vuukleCanonLink=vuukleCanonE?vuukleCanonE.href:"";if(vuukleCanonLink!==""){var vuukleCanonA=document.createElement('a');vuukleCanonA.href=vuukleCanonLink;vuuklepageInfo.canon=1;vuuklepageInfo.parentHost=vuukleCanonA.hostname;if(!(typeof OVERRIDE_VUUKLE_URL!=="undefined"&&OVERRIDE_VUUKLE_URL.length>0))
vuukle_article_url=vuukleCanonLink;if(h===""){h=vuuklepageInfo.title;}}
vuuklepageInfo.ga=gaCode;vuuklepageInfo.col=colCode;vuukle_col_code=colCode;vuuklepageInfo.tags=cleanHTMLVK(t);var sc=vuukle_getURLParams("commentID");if(document.getElementById("vuukle-reminder")){document.getElementById("vuukle-reminder").style.background="#"+ vuukle_col_code;}
vuukle_wrapper(id,bizUniqueId,d,t,h,l,l_d,cl,vuuklepageInfo,sc);emoteHost=vuuklepageInfo.parentHost;emoteArticleId=bizUniqueId;emoteArticleUrl=vuukle_article_url;emoteArticleImageUrl=vuuklepageInfo.img;h=h.replace("&nbsp;"," ");h=h.replace(/&[^;]+;/g,'');h=h.replace(/(<([^>]+)>)/ig,"");emoteArticleTitle=h;emoteApiKey=id;subsHost=vuuklepageInfo.parentHost;subsArticleId=bizUniqueId;subsArticleUrl=vuukle_article_url;subsApiKey=id;subsTags=vuuklepageInfo.tags;setupPowerBar();setupEmot();setupSubscribe();return false;}
function getInternetExplorerVersionVK(){var rv=-1;if(navigator.appName==='Microsoft Internet Explorer'){var ua=navigator.userAgent;var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");if(re.exec(ua)!=null){rv=parseFloat(RegExp.$1);}}
return rv;}
function stripVK(e){return e.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi,'');}
function getVuukleIframe(id,url){var ifr=document.createElement('iframe');ifr.src=url;ifr.style.width='100px';ifr.style.minWidth='100%';ifr.style.height='100%';var ieversion=getInternetExplorerVersionVK();if(ieversion<=8.0&&ieversion>0){ifr.style.height='600px';ifr.scrolling="yes";}else{ifr.style.height='0';ifr.scrolling="no";Vuukle_scrollbars_offset=0;}
ifr.style.overflow='hidden';ifr.name=id;ifr.id=id;ifr.frameBorder='0';return ifr;}
function vuukle_wrapper(apiId,apiBizUniqueId,apiD,apiT,apiH,apiL,apiLd,apiCL,apiPageInfo,showComment){if(vuukle_platform_loaded===true){return;}
if(apiH!=null){apiH=apiH.replace("&nbsp;"," ");apiH=apiH.replace(/&[^;]+;/g,'');apiH=apiH.replace(/(<([^>]+)>)/ig,"");}
var url=vuukle_article_url;url=stripVK(url);var vuukleiframesrc=escape(url)+'&id='+ apiId+'&bizUniqueId='+ apiBizUniqueId+'&d='+ apiD+'&t='+ escape(apiPageInfo.tags)+'&h='+ encodeURI(escape(apiH))+'&stories_time='+ apiPageInfo.stories_time+'&custom_text='+ escape(apiPageInfo.custom_text)+'&filter_tag='+ escape(apiPageInfo.filter_tag)+'&l='+ apiL+'&ga='+ apiPageInfo.ga+'&col='+ apiPageInfo.col+'&c='+ apiPageInfo.canon+'&l_d='+ apiLd+'&cl='+ apiCL+'&img='+ escape(apiPageInfo.img)+'&refHost='+ apiPageInfo.refHost+'&host='+ apiPageInfo.parentHost+((showComment&&showComment.length>0)?'&showComment='+ showComment:'')+'&auth='+ apiPageInfo.author+'&cc='+ apiPageInfo.comment_count+'&emote='+(document.getElementById('vuukle-emote')?'1':'0')+'&vv=169';var iframeVuukleDiv=getVuukleIframe("vuukle_proxy",rating_urlVK+ vuukleiframesrc);var vuukleDivE=document.getElementById(vuukle_div);vuukleDivE.innerHTML="";iframeVuukleDiv.onload=function(){if(typeof VUUKLE_LOAD_ON_DEMAND!=="undefined"&&VUUKLE_LOAD_ON_DEMAND===true){windowProxyVK.post({hideComments:true});}};if(url!==""){vuukleDivE.appendChild(iframeVuukleDiv);iframeVuukle=iframeVuukleDiv;vuukle_platform_loaded=true;}
var iframeVuukleDivCommentNow=getVuukleIframe("vuukle_proxy_comment_now",commentnow_url+ vuukleiframesrc);var vuukleCommentNowTemp=document.getElementById(vuukle_div_comment_now);var vuukleDivNowE=vuukleCommentNowTemp?vuukleCommentNowTemp:document.querySelector("."+ vuukle_div_comment_now);if(vuukleDivNowE){vuukleDivNowE.innerHTML="";if(url!==""){vuukleDivNowE.appendChild(iframeVuukleDivCommentNow);iframeCommentNow=iframeVuukleDivCommentNow;vuukle_platform_loaded=true;}}}
function notificationClicked(){windowProxyVK.post({notification_click:"n_click"});}
function onMessageVuukle(messageEvent){var c=messageEvent.data.count;var vuukleID=messageEvent.data.id;if(c){var vuukleArticleId=document.querySelectorAll('[data-vuukle]');for(var i=0;i<vuukleArticleId.length;++i){vuukleArticleId[i].innerHTML=vuukleArticleId[i].innerHTML+" ("+ c+")";}
if(vuukleID!=="432081eb-6e8e-4abc-a88f-ca5357aa7244"&&vuukleID!=="3ddd9ae1-5ee7-45cd-95a6-34484c2f9276"&&vuukleID!=="7a1a7f89-9bfe-484a-9faf-1cde8b49305a"&&vuukleID!=="bceecf0f-f9ea-4c2e-b604-72fcfff6338c"&&vuukleID!=="ef05a211-122a-11e4-88e0-003048ffb99c"&&vuukleID!=="ac00d9bb-f262-4d1d-a92d-39a7ee36cc3e"){if(parseInt(c)===0){document.getElementById("vuukle-reminder").innerHTML="<a href='#"+ vuukle_div+"' style='text-decoration: none; color: #fff;' onclick='notificationClicked();'>Write your comment...</a>";}else{document.getElementById("vuukle-reminder").innerHTML="<a href='#"+ vuukle_div+"' style='text-decoration: none; color: #fff;' onclick='notificationClicked();'>"+ c+" comments</a>";}}}else{var height=messageEvent.data.height;if(height)
iframeVuukle.style.height=(height+ Vuukle_scrollbars_offset)+'px';else{var embeddedheight=messageEvent.data.embedded_height;if(embeddedheight)
iframeCommentNow.style.height=(embeddedheight+ Vuukle_scrollbars_offset)+'px';}}
var shareVK=messageEvent.data.share;if(shareVK){if(vuukleSetShareCount)
vuukleSetShareCount(share.split(",")[0],share.split(",")[1]);}
var vuukle_event=messageEvent.data.vuukle_event;if(vuukle_event){if(typeof VUUKLE_EVENT_HANDLER!=="undefined")
VUUKLE_EVENT_HANDLER(vuukle_event);}
var rate=messageEvent.data.star_rating;if(rate){if(typeof VUUKLE_SETRATE!=="undefined"){VUUKLE_SETRATE(rate.rating,rate.count?rate.count:0);}}
if(messageEvent.data.expandEmote){document.getElementById("emoteFrame").style.height=messageEvent.data.expandEmote;}
if(messageEvent.data.emoteAcknowledge){window.clearInterval(emoteSignaller);emoteSignaller=null;}
if(messageEvent.data.powerBarAcknowledge){window.clearInterval(powerBarSignaller);powerBarSignaller=null;}
if(messageEvent.data.articleData){windowEmoteVK.post({emoteData:messageEvent.data.articleData.emotes});emoteSignaller=window.setInterval(function(){windowEmoteVK.post({emoteData:messageEvent.data.articleData.emotes});},1500);for(var a=0;a<powerBarProxies.length;++a){powerBarProxies[a].post({powerBarData:messageEvent.data.articleData});}}
if(messageEvent.data.scrollToComments){location.href="#vuukle_div";}
if(messageEvent.data.openWhatsapp){location.href=messageEvent.data.openWhatsapp;}}
var emoteSignaller=null;var powerBarSignaller=null;function vuukleInsertReminder(){if(!vuukle_show_notify)
return;if(!vuukle_col_code||vuukle_col_code.length==0){vuukle_col_code="44749A";}
var d=document.createElement("div");d.id="vuukle-reminder";d.style.position="fixed";d.style.right="40px";d.style.bottom="50px";d.style.width="100px";d.style.background="#"+ vuukle_col_code;d.style.opacity="0";d.style.transition="opacity 3s";d.style.textAlign="center";d.style.width="85px";d.style.padding="5px";d.style.fontFamily="Arial,sans-serif";d.style.fontWeight="600";d.style.fontSize="0.9em";d.style.borderRadius="";d.style.boxShadow="0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset";document.body.appendChild(d);}
document.addEventListener("DOMContentLoaded",function(event){if(document.getElementById("vuukle-reminder")==null)
vuukleInsertReminder();});(function(){var vuukleShares=document.querySelectorAll('[data-vuukle-share]');for(var i=0;i<vuukleShares.length;++i){vuukleShares[i].onclick=function(){windowProxyVK.post({share:this.dataset.vuukleShare});};}})();function onDemandCommnents(){windowProxyVK.post({showOnDemand:true});}
function syncRatingVuukle(){windowProxyVK.post({syncRating:true});}
var emoteHost='';var emoteArticleId='';var emoteArticleUrl='';var emoteArticleImageUrl='';var emoteArticleTitle='';var emoteApiKey='';var emoteTheme='true';var emoteIconSize='80px';var emoteFrameHeight='170px';if(window.screen.width<450){emoteFrameHeight='145px';}
function setupEmot(){if(document.getElementById('vuukle-emote')){if(window.VUUKLE_EMOTE_SIZE){emoteIconSize=window.VUUKLE_EMOTE_SIZE;}
if(window.VUUKLE_EMOTE_IFRAME){emoteFrameHeight=window.VUUKLE_EMOTE_IFRAME;}
var p=(typeof EMOTE_TEXT!="undefined")?"&f="+ encodeURIComponent(EMOTE_TEXT[0])+"&s="+ encodeURIComponent(EMOTE_TEXT[1])+"&t="+ encodeURIComponent(EMOTE_TEXT[2])+"&r="+ encodeURIComponent(EMOTE_TEXT[3])+"&i="+ encodeURIComponent(EMOTE_TEXT[4]):"";var url=baseURLVK+'/emote.aspx?id='+ emoteArticleId+'&host='+ emoteHost+'&url='+ emoteArticleUrl+'&api_key='+ emoteApiKey+'&theme='+ emoteTheme+'&isize='+ emoteIconSize+'&article_image='+ emoteArticleImageUrl+'&article_title='+ encodeURI(emoteArticleTitle)+
p;var emoteDiv=document.getElementById('vuukle-emote');var code='<iframe src="" id="emoteFrame" name="vuukle_proxy_emote" frameborder="0" scrolling="no" width="100%" height="'+ emoteFrameHeight+'" style="height:'+ emoteFrameHeight+';"></iframe>';emoteDiv.innerHTML=code;if(document.getElementById("emoteFrame")){document.getElementById("emoteFrame").setAttribute("src",url);}}}
var powerBarProxies=[];function setupPowerBar(){var els=document.querySelectorAll(".vuukle-powerbar");if(els&&els.length>0){for(var i=0;i<els.length;++i){var url=baseURLVK+'/powerbar.html?id='+ emoteArticleId+'&host='+ emoteHost+'&url='+ emoteArticleUrl+'&api_key='+ emoteApiKey+'&article_title='+ encodeURI(emoteArticleTitle);var pbDiv=els[i];var code='<iframe src="" id="powerBarFrame'+ i+'" name="vuukle_proxy_powerbar'+ i+'" frameborder="0" scrolling="no" height="40px" style="height:40px;" width="100%" ></iframe>';var pbProxy=new Porthole.WindowProxy(powerBar_urlVK,"vuukle_proxy_powerbar"+ i);pbProxy.addEventListener(onMessageVuukle);powerBarProxies.push(pbProxy);pbDiv.innerHTML=code;if(document.getElementById("powerBarFrame"+ i)){document.getElementById("powerBarFrame"+ i).setAttribute("src",url);}}}}
var subsHost='';var subsArticleId='';var subsArticleUrl='';var subsApiKey='';var subsTheme='true';var subsIconSize='50px';var subsFrameHeight='180px';var subsTags="";function setupSubscribe(){if(document.getElementById('vuukle-subscribe')){var url=baseURLVK+'/subscribe.html?id='+ subsArticleId+'&host='+ subsHost+'&url='+ subsArticleUrl+'&api_key='+ subsApiKey+'&tags='+ subsTags+'&isize='+ subsIconSize;var subsDiv=document.getElementById('vuukle-subscribe');var code='<iframe src="" id="subscribeFrame" frameborder="0" scrolling="no" width="100%" height="'+ subsFrameHeight+'" style="height:'+ subsFrameHeight+';"></iframe>';subsDiv.innerHTML=code;if(document.getElementById("subscribeFrame")){document.getElementById("subscribeFrame").setAttribute("src",url);}}}
function vuukleSetShareURLs(us){var twitter=us.twitter,facebook=us.facebook,google=us.google,linked=us.linked,stumble=us.stumble;for(var a=0;a<powerBarProxies.length;++a){powerBarProxies[a].post({shareURLS:{t:twitter&&twitter.length>0?twitter:null,f:facebook&&facebook.length>0?facebook:null,g:google&&google.length>0?google:null,l:linked&&linked.length>0?linked:null,s:stumble&&stumble.length>0?stumble:null}});}}