/*
rollOver=Roll over for sound
clickFullscreen=Click to full screen
clickExit=Click to exit fullscreen
advt=Advertisement
replay=Replay Ad
close=Close
pressEsc=Press esc to exit fullscreen
*/
var loopTimer = 0;
var allLanguages = 'undefined';
var allLanguagesFlag = 'undefined';
var ButtonslinksObject = function() {
	if ((typeof inreadFn !== 'undefined') && (typeof inreadFn.domain_player !== 'undefined')) {
		clearTimeout(loopTimer);
		allLanguages = {
			english : {
				rollOver : [inreadFn.domain_player+"jsc/images/zplayer/inarticle-Sound-Text.png"],
				clickFullscreen : [inreadFn.domain_player+"jsc/images/zplayer/inarticle-Fullscreen-Text.png"],
				clickExit : [inreadFn.domain_player+"jsc/images/zplayer/inarticle-Exit-Btn.png"],
				advt : ["Advertisement"],
				replay : ["Replay Ad"],
				close : ["Close"]
			},
			japanese : {
				rollOver : [inreadFn.domain_player+"jsc/images/zplayer/rollover_for_sound-jp.png"],
				clickFullscreen : [inreadFn.domain_player+"jsc/images/zplayer/clickFullscreen-jp.png"],
				clickExit : [inreadFn.domain_player+"jsc/images/zplayer/exitfullscreen-jp.png"],
				advt : ["広告をもう"],
				replay : ["度見る"],
				close : ["閉じる"]
			}
		};
		allLanguagesFlag=1;
	} else loopTimer=setTimeout(function() {  ButtonslinksObject(); }, 500);
};
ButtonslinksObject();