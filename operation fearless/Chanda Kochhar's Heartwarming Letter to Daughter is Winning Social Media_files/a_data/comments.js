function openPopupWindow(c, e, d, a) {
    var g = parseInt((screen.availWidth / 2) - (d / 2));
    var f = parseInt((screen.availHeight / 2) - (a / 2));
    var b = "width=" + d + ",height=" + a + ",status,resizable,left=" + g + ",top=" + f + "screenX=" + g + ",screenY=" + f;
    window.open(c, e, b)
}

function logout() {
    vid = $.cookie("userloggedIn");
    vid = vid ? vid : "";
    vid_split = vid.split(";;;");
    siteid = vid_split[0];
    social_logout()
}

function social_logout() {
    url = BASE_URL + "/logout.php?redir=" + encodeURIComponent(window.location.href + "&" + Math.random());
    window.location.href = url
}

function loading(b, a) {
    a = a ? a : "Loading...";
    if (b == "show") {
        $("#so_loading").text(a);
        $("#so_loading").show()
    } else {
        $("#so_loading").text(a);
        $("#so_loading").hide()
    }
}

function unloadPage() {
    loading("show", "Loading...")
}

function user_name_stripbar(a) {
    if (document.getElementById("userdetails_container")) {
        if (a == "show") {
            urnm = $.cookie("userloggedIn");
            if (urnm) {
                urnm_split = urnm.split(";;;");
                name = decodeURIComponent(urnm_split[1].replace(/\+/g, "%20"));
                if (name) {
                    var b = '<a href="' + BASE_URL + '/groups.php" class="member" target="_blank">' + name + "</a>";
                    $("#userdetails_name").html(b);
                    $("#userdetails_container").show()
                }
            }
        } else {
            if (a == "hide") {
                $("#userdetails_container").hide()
            }
        }
    }
}

function doValidation(identifier) {
    $("#btn").attr("disabled", "disabled");
    var a = $("#btn").val();
    $("#btn").val("Saving...");
    ns_rediruri();
    var b = $.trim($("#comment").val());
    if (b != null && b.length) {
        $.cookie(cookie_name, b, {
            path: "/"
        });
        loading("show", "Processing...");
        $.ajax({
            type: "POST",
            url: window.location.href + "&" + (new Date).getTime(),
            data: $("#comment-form").serialize(),
            success: function(d) {
                $("#response").empty();
                $("#response").append("<ul></ul>");
                if (typeof d.messages["success"] != "undefined") {
                    $("#response").addClass("success");
                    $("#response").removeClass("error");
                    var e = d.messages["success"];
                    $.each(e, function(f, g) {
                        $("#response ul").append("<li>" + g.toString() + "</li>")
                    });
                    clearCommentReply(identifier);
                    if ($("#post_to_twitter:checked").val() !== undefined) {
                        uri = "http://twitter.com/home?status=" + b + " - " + cookie_name;
                        openPopupWindow(uri, "popup_tw", 600, 380)
                    }
                    if ($("#post_to_facebook:checked").val() !== undefined) {
                        javascript: FB.ui({
                            method: 'feed',
                            name: cookie_name,
                            link: cookie_name,
                            picture: '',
                            description: b
                        })
                    }
                    $("#response").show();
                    $("#comment").val("");
                    $.cookie(cookie_name, null, {
                        path: "/"
                    });
                    $.cookie("rediruri", null, {
                        path: "/"
                    });
                    $.cookie('anonymous-email', $('#email').val(), {
                        path: '/'
                    });
                    $.cookie('anonymous-name', $('#name').val(), {
                        path: '/'
                    })
                } else {
                    if (typeof d.messages["error"] != "undefined") {
                        var c = d.messages["error"];
                        $("#response").addClass("error");
                        $.each(c, function(f, h) {
                            $("#response ul").append("<li>" + h.toString() + "</li>");
                            if (h.toLowerCase().indexOf("login") != -1) {
                                $.cookie("userloggedIn", null, {
                                    path: "/"
                                });
                                if ($("#social_links").length) {
                                    $("#social_links").show();
                                    user_name_stripbar("hide");
                                    var g;
                                    $("#btn").val(g)
                                } else {
                                    ns_rediruri({
                                        cache: true
                                    });
                                    window.location = $.cookie("rediruri")
                                }
                            }
                        });
                        $("#response").show()
                    }
                }
                loading("hide", "Processing...")
            },
            dataType: "json"
        })
    } else {
        $("#response").addClass("error").html("<ul><li>" + cve + "</li></ul>").show()
    }
    setTimeout(function() {
        $("#btn").attr("disabled", "");
        $("#response").slideUp("slow")
    }, 7 * 1000);
    $("#btn").val(a);
    return false
}
$().ready(function() {
    setTimeout(function() {
        user_name_stripbar("show");
        loading("hide", "Loading...")
    }, 1 * 1000);
    var a = "Comment";
    var c = $.cookie(cookie_name);
    if (c != null) {
        $("textarea[name=comment]").val(c)
    }
    $.cookie(cookie_name, null, {
        path: "/"
    });
    if (!$.cookie("userloggedIn")) {
        $("#social_links").show();
        $("#btn").val(sbl)
    }
    $("#social_links").click(function() {
        $.cookie(cookie_name, $("textarea[name=comment]").val(), {
            path: "/"
        });
        ns_rediruri()
    });
    $("#btn:disabled").click(function() {
        return false
    });
    $("#btn").show();
    ns_rediruri()
});

function setIframeHeight(divid, iframeid, iframeCurrentHeight) {
    var height = $('#' + divid).outerHeight(true);
    height = height + iframeCurrentHeight + 18;
    if(typeof(gadget360) == undefined || gadget360 == '0'){$('#' + iframeid, parent.document).height(height)}else{parent.postMessage(height,"*");}
}

function getSortUrl(commentUrl, sortedby) {
    window.location.href = commentUrl + '&sorted_by=' + sortedby
}

function reportAbuse(url, cid, uid, anonymous_uid) {
    $.ajax({
        type: "POST",
        url: url,
        data: {
            cid: cid
        },
        success: function() {
            $.cookie('report-abuse-' + cid, cid, {
                expires: 30,
                path: '/'
            });
            $('#ra-' + cid).css('display', 'block');
            $('#ra-' + cid).html("Thanks for flagging this comment. It's being investigated.");
            if (uid != anonymous_uid) {
                $('#report-abuse-link-' + cid).html(" | ")
            } else {
                $('#report-abuse-link-' + cid).css('display', 'none')
            }
            setTimeout(function() {
                $('#ra-' + cid).slideUp("slow")
            }, 3 * 1000)
        }
    })
}

function seLike(url, cid) {
    $.ajax({
        type: "POST",
        url: url,
        data: {
            cid: cid
        },
        success: function() {
            $('#likes-link-' + cid).html('<b>Liked</b>');
            $('#unlikes-link-' + cid).hide()
        }
    })
}

function setUnlike(url, cid) {
    $.ajax({
        type: "POST",
        url: url,
        data: {
            cid: cid
        },
        success: function() {
            $('#unlikes-link-' + cid).html('<b>Unliked</b>');
            $('#likes-link-' + cid).hide()
        }
    })
}

function getReportAbuseLink(cid, uid, anonymous_uid) {
    var racookie;
    racookie = parseInt($.cookie('report-abuse-' + cid));
    abuselike = BASE_URL + '/ajax/reportAbuse.php';
    reportAbuselink = '<a href="javascript:void(0);" onclick="javascript:reportAbuse(\'' + abuselike + '\', \'' + cid + '\', \'' + uid + '\', \'' + anonymous_uid + '\');return false;">Report Abuse</a> | ';
    if (uid != anonymous_uid) {
        reportAbuselink = ' | ' + reportAbuselink
    }
    if (isNaN(racookie)) {
        $("#report-abuse-link-" + cid).append(reportAbuselink)
    } else if (uid != anonymous_uid) {
        $("#report-abuse-link-" + cid).append(" | ")
    }
}

function addReply(commentid, userName, identifier) {
    setCommentReplyText(commentid, userName, identifier);
    $.cookie('parentcid-' + identifier, commentid, {
        expires: 0.025,
        path: '/',
        domain: 'ndtv.com'
    })
}

function setCommentReplyText(commentid, userName, identifier) {
    clearCommentReply(identifier);
    if ($('#comment-text-' + commentid)) {
        var commentText = $('#comment-text-' + commentid).html();
        commentText = commentText.replace("getReportAbuseLink", "getReporyAbuset");
        commentText = '<div class="newcommentlist_wrap">' + '<div class="newcomment_list">' + '<ul>' + '<li>' + '<div class="headerwrap">' + commentText + '</div>' + '</li>' + '</ul>' + '</div>' + '</div>';
        $("#parentid").val(commentid);
        $("#comment").focus();
        if (typeof(userName) != 'undefined') {
            $("#comment").val('@' + userName + ': ')
        }
        if (typeof(commentText) != null && commentText != '') {
            commentText = commentText + '<div style="color: #474747;float: left;font-size: 12px;line-height: 1.5em;width: 100%;">';
            commentText = commentText + 'You are replying to the above comment';
            commentText = commentText + '<a style="float:right;padding-right:10px;" href="javascript:void(0);" onclick="javascript:clearCommentReply(\'' + identifier + '\');">Cancel</a>';
            commentText = commentText + '</div>';
            $('.new_commentwrap').css('padding-left', '5px');
            $("#comment-reply").html(commentText);
            window.scrollTo(30, 0);
            $("#comment").css('background-color', '#fafbc6')
        } else {
            clearCommentReply(identifier)
        }
    }
}

function clearCommentReply(identifier) {
    $('#comment-reply').html('');
    $.cookie('parentcid-' + identifier, null, {
        expires: -0.025,
        path: '/',
        domain: 'ndtv.com'
    });
    $('#parentid').val(0);
    $('#comment').val('');
    return false
}

function getLikeLink(cid) {
    likedlink = '<a href="javascript:void(0);" onclick="javascript:seLike("' + BASE_URL + '/ajax/mostLike.php", "' + cid + '");return false";>Like</a>';
    $("#likes-link-" + cid).prepend(likedlink)
}

function getUnlikeLink(cid) {
    unlikedlink = '<a href="javascript:void(0);" onclick="javascript:setUnlike("' + BASE_URL + '/ajax/mostUnlike.php", "' + cid + '");return false;">Unlike</a>';
    $("#unlikes-link-" + cid).prepend(unlikedlink)
}

function clearReply() {
    var replyHeight = $('#comment-reply').height();
    if (typeof($('#ndtvSocialCommentForm')) != undefined) {
        if(typeof(gadget360) == undefined || gadget360 == '0'){
            var formHight = $('#ndtvSocialCommentForm', parent.document).height();
            $('#ndtvSocialCommentForm', parent.document).height(formHight - replyHeight);
        }
        $('#comment-reply').html('')
    }
}

function unSubscribed(url, identifier) {
    $.ajax({
        type: "POST",
        url: url + 'comment-unsubscribe.php',
        data: {
            identifier: identifier
        },
        success: function(data) {
            if (data == 1) {
                $('#subscription').html('<a href="javascript:void(0);" id="subscribe_to_story" onclick="javascript:subscribed(\'' + url + '\',  \'' + identifier + '\');return false;" >' + followcov + '</a>')
            } else {
                $('#subscription').hide();
                user_name_stripbar("hide");
                $("#social_links").show()
            }
        }
    })
}

function subscribed(url, identifier) {
    $.ajax({
        type: "POST",
        url: url + 'comment-subscribe.php',
        data: {
            identifier: identifier
        },
        success: function(data) {
            if (data == 1) {
                $('#subscription').html('<a href="javascript:void(0);" id="subscribe_to_story" onclick="javascript:unSubscribed(\'' + url + '\',  \'' + identifier + '\');return false;" >' + unfollowcov + '</a>')
            } else {
                $('#subscription').hide();
                user_name_stripbar("hide");
                $("#social_links").show()
            }
        }
    })
}

function checkSubscription(url, identifier) {
    $.ajax({
        type: "POST",
        url: url + 'comment-check-subscription.php',
        data: {
            identifier: identifier
        },
        success: function(res) {
            data = JSON.parse(res);
            if (data.loggedIn == 0) {
                $.cookie("userloggedIn", null, {
                    path: "/"
                });
                user_name_stripbar("hide");
                $("#social_links").show();
                return false
            } else if (data.subscribed == 2) {
                $("#confirm-email").show()
            } else if (data.subscribed == 1) {
                $('#subscription').show();
                $('#subscription').html('<a href="javascript:void(0);" id="subscribe_to_story" onclick="javascript:unSubscribed(\'' + url + '\',  \'' + identifier + '\');return false;" >' + unfollowcov + '</a>')
            } else {
                $('#subscription').show();
                $('#subscription').html('<a href="javascript:void(0);" id="subscribe_to_story" onclick="javascript:subscribed(\'' + url + '\',  \'' + identifier + '\');return false;" >' + followcov + '</a>')
            }
        }
    })
}

function sendVerificationEmail(url, verified, page_url, identifier) {
    $('.loading-img').show();
    var email = $('#confirmEmail').val();
    $.ajax({
        type: "POST",
        url: url + 'comment-email-verify.php',
        data: {
            email: email,
            verified: verified,
            page_url: page_url,
            identifier: identifier
        },
        success: function(res) {
            if (res.length > 1) {
                res = JSON.parse(res)
            } else {
                res = ''
            }
            if (typeof res.error != 'undefined') {
                $('.loading-img').hide();
                $('#response').show();
                $('#response').addClass('error');
                $('#response').html('<ul><li>' + res.error + '</li></ul>');
                setTimeout('$("#response").hide("slow");', 5000)
            } else {
                $('#response').show();
                $('#response').removeClass('error');
                $('#response').html('<span class="success">Thank you. A verification email has been sent to your email address. Please follow the instructions in the email to complete the process.</span>');
                setTimeout('$("#response").hide("slow");', 8000);
                $("#confirm-email").hide();
                $('.loading-img').hide()
            }
        }
    })
}

function cancelVerification() {
    $("#subscription").show();
    $("#confirm-email").hide()
}

function render() {
    gapi.signin.render('customBtn', {
        'callback': 'onSignInCallback',
        'apppackagename': 'com.july.ndtv',
        'clientid': '72129834489-uk4o358ag2ievntn375ab6a4spltimn3.apps.googleusercontent.com',
        'cookiepolicy': 'http://social.ndtv.com',
        'requestvisibleactions': 'http://schemas.google.com/AddActivity',
        'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.login'
    })
}
var authResult = undefined;

function onSignInCallback(authResult) {
    var is_gadget = (typeof(gadget360) == undefined || gadget360 == '0')?'0':'1';
    if (authResult['code'] && authResult['g-oauth-window']) {
        $('#so_loading').toggle();
        var code = authResult['code'];
        $.ajax({
            type: 'POST',
            url: BASE_URL + '/ajax/login-google-plus.php?gadget360=' + is_gadget,
            data: {
                code: code
            },
            async: true,
            success: function(result) {
                if (result > 0) {
                    window.location.href = window.location
                }
            }
        })
    }
}

function disconnectUser() {
    var is_gadget = (typeof(gadget360) == undefined || gadget360 == '0')?'0':'1';
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/ajax/login-google-plus.php?gadget360=' + is_gadget,
        data: {
            action: 'logout'
        },
        success: function(Response) {}
    })
}

function getMoreComments(url, page, size, total_count) {
    $('#morecomments').html('Loading...');
    var nextPage = parseInt(page) + 1;
    $.ajax({
        type: "POST",
        url: url + '&page=' + nextPage,
        success: function(d) {
            $('#morecomments').html('');
            $('#morecomments').before(d).slideDown();
            var lastcount = ((size * nextPage) > total_count) ? total_count : size * nextPage;
            $('.comment-range').html('1-' + lastcount);
            var height = $('#comments_box').outerHeight(true);
            if(typeof(gadget360) == undefined || gadget360 == '0'){$('#ndtvSocialCommentForm', parent.document).height(height + 100);}else{parent.postMessage(height,"*");}
            if ((nextPage * size) > total_count) {
                $('#morecomment_bot').remove()
            } else {
                $('#morecomment_bot').html('<span><a href="javascript:void(0);" onclick="javascript:getMoreComments(\'' + url + '\', \'' + nextPage + '\', \'' + size + '\', \'' + total_count + '\');">More Comments</a></span>')
            }
        }
    })
}

function getReporyAbuset() {}