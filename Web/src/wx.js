//公共代码

var
  nodeurl = "",
  // nodeurl = "http://localhost1:8080/platform/",

  baseInfo = {
    systemTime:"",
    appointmentTime:''
  },
  userName=localStorage.getItem("userName"),

  locationSelf = location,

  locationSelfSearch = locationSelf.search,

  viewWidth = localStorage.getItem("viewWidth"),

  html = document.documentElement,

  u_id = sessionStorage.getItem("userId");

if (!viewWidth) {
  if (html) {
    var windowWidth = html.clientWidth / 7.5;
    viewWidth = windowWidth + 'px';
    localStorage.setItem("viewWidth", viewWidth);
  }
}
    function checkWxLogin(type) {
        // userName = localStorage.getItem("userName");
        if (!userName) {
            location.href = "http://camp.liver-cloud.com/platform/wechat/weixin.do?redirectUrl=" + nodeurl+type ;
        }
    }
    var e = locationSelfSearch.substring(1);
    var g = decodeURIComponent(e);
    var h = g.split("&");
    if (e && !userName) {
        for (var c = 0, b = h.length; c < b; c++) {
            var f = h[c];
            var a = f.split("=");
            localStorage.setItem(a[0], a[1])
        }
          userName = localStorage.getItem("userName");
    }
    if (!userName) {
        checkWxLogin("Web/dist/index.html")
    }
var ua = navigator.userAgent.toLowerCase();

if (ua.match(/MicroMessenger/i) == "micromessenger") {

} else {
  // documentSelf.write("请在微信中访问次页")
}


Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate()                   //日
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export {viewWidth, locationSelf, nodeurl, locationSelfSearch, html, userName,baseInfo};
