"use strict";var Ad=function(){this.tl=null};Ad.prototype.init=function(){window.adKit.drawBorder(),console.log("hello world"),window.TweenLite.ticker.fps(30),window.TweenLite.set("#adRoot",{autoAlpha:1}),window.TweenLite.set(["#chromeContainer","#chromeLogo","#color-rotation","#center-distance"],{transformOrigin:"50% 50%"}),window.TweenLite.set("#resizeLogo",{x:0,y:-58,scale:.255,transformOrigin:"0% 0%"});var chromeTL=new TimelineLite;this.chromeTL=chromeTL;var callback=function(){document.getElementById("resizeLogo").style.opacity=1,console.log("should show")},func=function(){chromeTL.addLabel("start"),chromeTL.from("#chromeContainer",1.1,{scale:0,onStart:callback,ease:CubicBezier.config(.45,.05,0,.94)},"start"),chromeTL.from("#chromeLogo",1.1,{scale:2,ease:CubicBezier.config(.45,.05,0,.94)},"start"),chromeTL.from("#color-rotation",1.76,{rotation:540,ease:CubicBezier.config(.45,0,.52,1)},"start"),chromeTL.from("#color-rotation",1.76,{scale:.55,ease:CubicBezier.config(.65,0,.58,1)},"start"),chromeTL.from("#center-distance",1.76,{rotation:450,ease:CubicBezier.config(.45,0,.25,1)},"start"),chromeTL.from("#center-distance",1.45,{x:140,ease:CubicBezier.config(.38,0,.55,1)},"start+=0.13"),chromeTL.from("#shading-fade",.46,{autoAlpha:0},"start+=1.3"),chromeTL.staggerFrom(".text",1.26,{autoAlpha:0,ease:Power1.easeOut},.02,"start+=0.4"),console.log(chromeTL.totalDuration())};window.setTimeout(func,150)};