var banner = new function()
{
	var completed = false,
			timeline,
			runCount = 0
			learnMoreX = 0;

  this.init = function()
  {
    var blocker = document.querySelectorAll(".cta-blocker")[0];
    blocker.addEventListener('mouseover' , function()
  	{
  		if(!completed) return false;
  	});
    blocker.addEventListener('mouseout' , function()
  	{
  		if(!completed) return false;
  	});
    blocker.addEventListener('click' , function()
  	{
  		EB.clickthrough();
  	});

    timeline = new TimelineLite({onComplete:onTimelineComplete})
    timeline.addLabel("start", "0")
      .to( '.img01 img' , 9 , {y:-101, rotationZ: '0.01deg'} , "start+=0.1" )
      .from( '.img01' , 1 , {clip:"rect(45px 300px 45px 0px)" , ease:Expo.easeOut}, "start+=0.1 ")
      .from( '.frame01 .copyset01' , 0.5 , {autoAlpha:0, y:"+=10" , ease:Expo.easeOut} , "start+=0.1" )
      .addLabel("frame02" , "start+=3")
      .to( '.frame01 .copyset01' , 0.5 , {autoAlpha:0, y:"-=10" , ease:Expo.easeOut} , "frame02" )
      .from( '.frame02 .copyset02' , 0.8, {autoAlpha:0, ease:Expo.easeOut} , "frame02+=0.4" )
      .addLabel("frame03" , "frame02+=3")
     // .to( '.frame02 .blackbox' , 0.3 , {autoAlpha:0} , "frame03" )
      .to( '.img01' , 1 , {clip:"rect(45px 300px 45px 0px)" , ease:Expo.easeOut}, "frame03+=0.1 ")
      .to( '.frame02 .copyset02' , 0.3 , {autoAlpha:0} , "frame03" )
      .from( '.frame03 .lgarrow' , 1, {x:"-=300" , ease:Expo.easeOut} , "frame03+=0.3")
      .from( '.frame03 .copyset03' , 0.5, {x:"-=20", autoAlpha:0, ease:Expo.easeOut} , "frame03+=0.5")
      .from( '.frame03 .copyDate' , 0.5, {autoAlpha:0, ease:Expo.easeOut} , "frame03+=0.6")
      .addLabel("cta" , "frame03+=0.1" )
      .from( '.frame03 .learnmoreCTA' , 0.5, {x:"-=20", autoAlpha:0} , "cta")
      .from( '.frame03 .circleCTA' , 0.5, {x:"-=20", autoAlpha:0} , "cta")
      .from( '.frame03 .arrow' , 0.5, {x:"-=20", autoAlpha:0} , "cta" )
      .call(onAnimationComplete)
      .addLabel("repeat" , "cta+=4")
      .to( '.frame03 .learnmoreCTA' , 0.3, {autoAlpha:0} , "repeat")
      .to( '.frame03 .circleCTA' , 0.3, {autoAlpha:0} , "repeat")
      .to( '.frame03 .arrow' , 0.3, {autoAlpha:0} , "repeat" )
      .to( '.frame03 .copyset03' , 0.3, {autoAlpha:0, ease:Expo.easeOut} , "repeat")
      .to( '.frame03 .copyDate' , 0.5, {autoAlpha:0, ease:Expo.easeOut} , "repeat")
      .to( '.frame03 .lgarrow' , 1, {x:350 , ease:Expo.easeOut} , "repeat+=0.2");

  }

  function onAnimationComplete()
  {
  	if( ++runCount == 2 )
  	{
  		learnMoreX = document.querySelectorAll(".frame03 .learnmoreCTA")[0]._gsTransform.x

  		timeline.pause();
  		completed = true;
  	}
  }

  function onTimelineComplete()
  {
		timeline.restart();
  }
    
}