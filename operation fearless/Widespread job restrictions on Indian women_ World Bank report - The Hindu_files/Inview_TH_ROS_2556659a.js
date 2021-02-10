!function (a, n, e, t, r) {
  tagsync = e;
  var c = window[a];
  if (tagsync) {
    var d = document.createElement("script");
    d.src = "http://2305.tm.zedo.com/v1/34f1220e-ee84-441a-bf60-985c56e76db2/atm.js",
    d.async = !0;
    var i = document.getElementById(n);
    if (null == i || "undefined" == i) 
      return;
    i.parentNode.appendChild(d, i),
    d.onload = d.onreadystatechange = function () {
      var a = new zTagManager(n);
      a.initTagManager(n, c, this.aync, t, r)
    }
  } else 
    document.write("<script src='http://2305.tm.zedo.com/v1/34f1220e-ee84-441a-bf60-985c56e76db2/tm.js?data=" + a + "'><" + "/script>")
}("datalayer", "zcee3c009-fe3b-4984-92ab-1c0d14a27f1a", false, 0, 0);