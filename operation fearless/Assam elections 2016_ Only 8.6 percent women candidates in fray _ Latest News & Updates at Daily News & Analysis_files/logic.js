
var creative = {};

/**
 * Window onload handler.
 */
function preInit() {
  setupDom();
  show();

}

/**
 * Initializes the ad components
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.exit = document.getElementById('exit');
  creative.dom.feature = document.getElementById('feature');
  creative.dom.headline = document.getElementById('headline');
  creative.dom.logo = document.getElementById('logo');
}

/**
 *  Shows the ad.
 */
function show() {
  creative.dom.exit.style.display = "block";
  creative.dom.feature.style.visibility  = 'visible';
  TweenLite.to( creative.dom.feature, 1, { opacity: 1, ease: Quart.easeOut } );
  TweenLite.to( [creative.dom.headline, creative.dom.logo ], 2.5, { opacity: 1, ease: Quart.easeOut, delay: 1.4 } );
}


// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);

