function insertCustomSymbols(){var c={pattern:/\bRs(\.|\b)/,rep_string:"Rs."},f=function(a){var d=0;if(a.nodeType==3&&a.nodeValue.search(c.pattern)!=-1){a.nodeValue=a.nodeValue.replace(c.pattern,c.rep_string);var e=a.data.indexOf(c.rep_string);if(e>=0){var b=document.createElement("span");d=document.createElement("span");b.className="rupee";a=a.splitText(e);a.splitText(c.rep_string.length);e=a.cloneNode(true);b.appendChild(e);a.parentNode.replaceChild(b,a);a=e.splitText(1);d.appendChild(a.cloneNode(true));
a.parentNode.replaceChild(d,a);d=1}}else if(a.nodeType==1&&a.childNodes&&!/(script|style|iframe)/i.test(a.tagName)&&a.className.indexOf("rupee")==-1)for(b=0;b<a.childNodes.length;++b)b+=f(a.childNodes[b]);return d};f(document.body)};

