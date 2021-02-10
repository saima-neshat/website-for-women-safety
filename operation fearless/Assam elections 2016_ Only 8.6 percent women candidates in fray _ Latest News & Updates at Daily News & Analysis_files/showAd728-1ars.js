// JavaScript Document

function outerHTML(node){
    // if IE, Chrome take the internal method otherwise build one
  return node.outerHTML || (
      function(n){
          var div = document.createElement('div'), h;
          div.appendChild( n.cloneNode(true) );
          h = div.innerHTML;
          div = null;
          return h;
      })(node);
  }

//var scr=document.createElement("script");
//scr.async = true;
//scr.setAttribute('type', 'text/javascript');
//scr.setAttribute('src', 'http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
//document.write(outerHTML(scr));
//
//document.write('<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-9419280128326018" data-ad-slot="3450614840"></ins>');
//(adsbygoogle = window.adsbygoogle || []).push({});

if (document.createElement && (iframe =
document.createElement('iframe'))) {
var btn=document.createElement("iframe");
iframe.setAttribute('name', 'adFrame');
iframe.setAttribute('id', 'adFrame');
iframe.setAttribute('width', '728');
iframe.setAttribute('height', '90');
iframe.setAttribute('frameborder', '0');
iframe.setAttribute('scrolling', 'no');
iframe.setAttribute('marginwidth', '0');
iframe.setAttribute('marginheight', '0');
//iframe.setAttribute('style', 'display:none');
iframe.setAttribute('src', 'http://www.smtpgo.in/gr728-1.htm');
document.write(outerHTML(iframe));
}
/*
var iframeDoc;
if (iframe.contentDocument) {
iframeDoc = iframe.contentDocument;
}
else if (iframe.contentWindow) {
iframeDoc = iframe.contentWindow.document;
}
else if (window.frames[iframe.name]) {
iframeDoc = window.frames[iframe.name].document;
}
/*
if (iframeDoc) {
iframeDoc.open();

iframeDoc.write(
'<html><head><link type="text/css" rel="Stylesheet" href="style.css" /></head>'+
'<body><a href="#">Galaxy S3</a><a href="#">Hotel Booking</a><a href="#">Cheap Air Tickets</a><a href="#">Digital Camera</a><\/body><\/html>'
);

iframeDoc.close();
}
*/