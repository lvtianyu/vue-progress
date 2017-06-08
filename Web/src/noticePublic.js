/**
 * Created by lvtianyu on 16/9/6.
 */
var data ={
  notice:"",
  isShow:false
};
var slef ;
function noticeSetTimeoutPublick(notice,that) {
  slef=that;
  slef.notice=notice;
  slef.isShow=true;
  console.log(notice,data,);

  var f = setTimeout(function () {
    slef.isShow=false;
    clearTimeout(f)
  }, 4500)
}

function hideNotice(that) {
  slef.isShow=false;
  console.log(slef);
}

export {noticeSetTimeoutPublick,data,hideNotice}
