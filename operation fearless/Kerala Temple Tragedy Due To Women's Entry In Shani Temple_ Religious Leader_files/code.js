var taboola_url_part_1 = 'tba4-1466644252';var taboola_url_part_2 = 'US-east-1';var taboola_url_part_3 = 'elb.amazonaws.com';var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};if (canRunAds) { $(document).ready(function(){ checkIfNoAdsCustom(); umberCheckMe(); });}function checkIfNoAdsCustom() { /* Multiple Ajax Requests*/ $.when(display_taboola_data(1), display_taboola_data(2), display_taboola_data(3), display_taboola_data(4), display_taboola_data(5), display_taboola_data(6)).done(function (t1_data, t2_data, t3_data, t4_data, t5_data, t6_data) { var t1 = t1_data[0].data; var t2 = t2_data[0].data; var t3 = t3_data[0].data; var t4 = t4_data[0].data; var t5 = t5_data[0].data; var t6 = t6_data[0].data; if(t1) { $("#" + t1_data[0].div_id).html(t1); var _h = 'news-'+ Math.round(+new Date() / 1000); $("#" + t1_data[0].div_id).attr('id',_h); if($("#" + _h).height()<=0){ if($("#" + _h).next().text().length){$("#" + _h).next().html(t1);$("#" + _h).next().show();} } } if(t2) { setTimeout(function() { $("#" + t2_data[0].div_id + " .trc_rbox_div").children().first().prepend(t2_data[0].data); $("#" + t2_data[0].div_id).toggle(); $("#" + t2_data[0].div_id).toggle(); }, 2000); } if(t3) { $("#" + t3_data[0].div_id).html(t3); } if(t4) { setTimeout(function() { $("#" + t4_data[0].div_id).empty().html(t4); }, 2000); } if(t5) { $("#" + t5_data[0].div_id).html(t5); } if(t6) { $("#" + t6_data[0].div_id).html(t6); } setTimeout(showBlockedImages, 2000);setTimeout(showBlockedImages, 5000); }  );}function showBlockedImages(){ var img = $('img[src^="http://images.taboola.com/taboola/image/fetch/"]'); $.each( img, function() { if($(this).css('display') == 'none'){ $(this).css('display', ''); $(this).css('max-width','100%'); try{ $(this).attr('src','http://' + unescape($(this).attr('src')).split(':\/\/')[2]); }catch(e){ } } });}function display_taboola_data(widget_number) { var type = taboola_obj.taboola_widget_type; var widget = ''; var withoutHeader = 0;  switch (widget_number) { case 1: /*taboola lhs bottom t1 widget condition*/ var taboola_listing_rhs_widget_id = 'taboola-below-main-column-sc'; if ($('#' + taboola_listing_rhs_widget_id).length) { $('#' + taboola_listing_rhs_widget_id).show(); widget = taboola_listing_rhs_widget_id; } /*taboola lhs bottom t1 widget condition*/ var taboola_lhs_five_thums_first_widget_id = 'taboola-below-main-column-sc-movies-detail'; if ($('#' + taboola_lhs_five_thums_first_widget_id).length) { widget = taboola_lhs_five_thums_first_widget_id; } /*taboola lhs bottom t1 widget condition*/ var taboola_lhs_first_widget_id = 'taboola-below-main-column-sc-new-taboola1'; if ($('#' + taboola_lhs_first_widget_id).length) { widget = taboola_lhs_first_widget_id; } break; case 2: /*taboola lhs bottom t2 text widget condition*/ var taboola_lhs_second_widget_id = 'taboola-bottom-main-column-mix'; if ($('#' + taboola_lhs_second_widget_id).length) { widget = taboola_lhs_second_widget_id; } break; case 3: /*taboola rhs t3 widget condition*/ var taboola_rhs_third_widget_id = 'taboola-right-rail'; if ($('#' + taboola_rhs_third_widget_id).length) { widget = taboola_rhs_third_widget_id; } break;  case 4: /*don't miss widget condition*/ var do_not_miss_widget_id = 'taboola-right-rail-thumbnails-3rd'; if ($('#' + do_not_miss_widget_id).length) { widget = do_not_miss_widget_id;  var withoutHeaderTmp = taboola_obj.dontMissWithoutHeader; if (typeof withoutHeaderTmp != "undefined") { withoutHeader = withoutHeaderTmp; } } break; case 5: /*taboola H/P topstory widget condition*/ var taboola_HP_topstory_widget_id = 'taboola-native-main-column-text-links'; if ($('#' + taboola_HP_topstory_widget_id).length) { widget = taboola_HP_topstory_widget_id; } break; case 6: /*taboola H/P also like above video widget*/ var taboola_HP_alsoread_widget_id = 'taboola-main-column-thumbnails'; if ($('#' + taboola_HP_alsoread_widget_id).length) { widget = taboola_HP_alsoread_widget_id; } break; }  if (widget !== '') { var cookie_taboola_session_expiry_min = 0; var cookie_taboola_session_expiry_hour = 6; var cookie_taboola_session_expiry_days = 0; var cookie_taboola_session = 'ndtv-taboola-user-session'; var taboola_user_session_existing = getTaboolaCookie(cookie_taboola_session); var user_session = ''; if (taboola_user_session_existing !== 'undefined' && taboola_user_session_existing !== null && taboola_user_session_existing !== '') { user_session = taboola_user_session_existing; } var url = 'http://' + taboola_url_part_1 + '.' + taboola_url_part_2 + '.' + taboola_url_part_3 + '/index.php';  var data = { type: type, header: withoutHeader, page_url: window.location.href.split('?')[0], session: user_session, t: Base64.encode(widget) };  return $.ajax({ type: 'GET', url: url, data: data, dataType: 'jsonp', success: function (result) { if (typeof result.session !== 'undefined') { /*set cookie for taboola user session id*/ if (taboola_user_session_existing === 'undefined' || taboola_user_session_existing == null || taboola_user_session_existing == '') { setTaboolaCookie(cookie_taboola_session, result.session, cookie_taboola_session_expiry_min, cookie_taboola_session_expiry_hour, cookie_taboola_session_expiry_days, '/', '', false); } } }, error: function (e, r, m) { /*console.log("Taboola Error: " + m);*/ } }); } else { return '{}';/*$.ajax({});*/ }}/* common.js */function getTaboolaCookie(e) { var t = document.cookie.indexOf(e + "="), n = t + e.length + 1; if (!t && e != document.cookie.substring(0, e.length)) return null; if (t == -1) return null; e = document.cookie.indexOf(";", n); if (e == -1) e = document.cookie.length; return unescape(document.cookie.substring(n, e))}function setTaboolaCookie(e, t, n, r, i, s, o, u) { var a = new Date; a.setTime(a.getTime()); var f = 0; if (n) f += n * 1e3 * 60; if (r) f += r * 1e3 * 60 * 60; if (i) f += i * 1e3 * 60 * 60 * 24; n = new Date(a.getTime() + f); document.cookie = e + "=" + escape(t) + (f ? ";expires=" + n.toGMTString() : "") + (s ? ";path=" + s : "") + (o ? ";domain=" + o : "") + (u ? ";secure" : "")}function umberTrackImg(){var newScript = document.createElement('img');newScript.setAttribute("src", 'http://webapi.ndtv.com/img.php?u='+window.location);newScript.setAttribute("style", 'height:1px;width:1px;');document.getElementsByTagName("body")[0].appendChild(newScript);}function umberCheckMe(){var newScript = document.createElement('script');newScript.setAttribute("type", "text/javascript");newScript.setAttribute("src", 'http://www.google-analytics.com/ga.js');newScript.setAttribute("onerror", "umberTrackImg();");document.getElementsByTagName("head")[0].appendChild(newScript);}