/**
 * Created by lvtianyu on 16/8/31.
 */

import {get} from "./xhr";
import {viewWidth, locationSelf, nodeurl,locationSelfSearch,html} from "./wx"

var list=[];

// 初始化数据
function initParam() {
  //var data = {
  //        s_id: "",
  //        date: ""
  //    },
  //
  //    url = "game/addAppointmentDate.do",
  //    get(data,url,analysisGetMoney);
  analysisGetComeOnGame()
}

function analysisGetComeOnGame(){
  list=[{title:'挑战200卡路里',img:'../assets/images/money-back.png',content:'djkdfjkdfjodjfodfj'},
    {title:'挑战200卡路里',img:'../assets/images/money-back.png',content:'djkdfjkdfjodjfodfj'}];
}

function goToHomePage(){
  console.log(i)
  locationSelf.href="/#!/calenda?=1";
}

initParam();

export {goToHomePage,list}
