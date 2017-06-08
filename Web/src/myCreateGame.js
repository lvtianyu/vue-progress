import {viewWidth, locationSelf, nodeurl,locationSelfSearch,html,baseInfo,userName} from "./wx"
import xhrP from './xhrPublic'
import {data,noticeSetTimeoutPublick} from "./noticePublic"

var fristI, //保存所选择的月份的$index 即页面的第一层选中的标示
  secondI,  //保存所选择的日期的$index 即页面的第二层选择的表述
  view = {nothing:false,monthLists:[],show:false,isShow:data.isShow,notice:data.notice,moreInfoShow:false};//用于保存哪个月份被打开
// 初始化数据
function initParam() {
  var data = {
    userName:userName
  };

  let url =  nodeurl + 'livercloud/v1/platform/getTimeShaftMonth.do';
  xhrP(url,data).then(analysis);

  return view
}

//解析传过来的数据

function analysis(json){
  var data = json.data,
    values=data.values;
  if(values){
    dealWithMonthLists(values);

  }else {
    view.nothing=true;
    return noticeSetTimeoutPublick("系统故障",view);

  }
}
//第一层的数据处理
function dealWithMonthLists(values) {
  var i= 0,
    len=values.length;
//新建下一层的依赖数组
  do{
    values[i].dayList=false;
    values[i].moreInfoShow=false;
    values[i].page=1;
    values[i].dayLists=[];

  } while (++i < len);
  view.monthLists=values;
}
//<===第一阶段结束===>
//点击月份标签进行后台的第二次请求相应的天，同时记录当时的标记
function getDayFormMonthFn(i){
  var data=view.monthLists[i];
  if(fristI!=i){ //判断是否被点开过，进行toggle的切换；
    if(typeof fristI == 'number'){
      view.monthLists[fristI].dayList=false
      view.monthLists[fristI].moreInfoShow=false
    }
  }
  fristI=i;//重新标记
 if(data.dayLists.length==0 || data.page){ //没有请求过请进行请求操作，已经请求过将不操作，减少请求过程；
    // monthAjax(data.month);
    getMoreMonthAjax(i)
  }
  if(data.dayList){
    data.dayList=false;
    view.monthLists[fristI].moreInfoShow=false
  }else {
    data.dayList=true;
  }
}

// 针对当前的月份进行数据请求

function getMoreMonthAjax(i,that){
  var monthList = view.monthLists[i]
  var month=monthList.month;
   if(that){
     monthList.page++;
  }
  var data={
    userName:userName,
    date:month,
    page:monthList.page //用来标记请求页数的
  };

  if(monthList.page && (monthList.dayLists.length==0 || that) ){
    let url =  nodeurl + 'livercloud/v1/platform/getTimeShaftMonthDetail.do';
    xhrP(url,data).then(moreMonthAjax);
  }else{
    if(monthList.page){
      monthList.moreInfoShow=true;
    }
  }
}

function moreMonthAjax(json){
    var data = json.data,
    values=data.values;
  if(values){
    dealWithDayLists(values);
  }else{
    return noticeSetTimeoutPublick("系统故障",view);
  }
}


function dealWithDayLists(values){
   var i= 0,
    data = values.list,
    mood,
    weather,
    len=data.length;
  do{
    mood = data[i].mood;
    weather = data[i].weather;
    data[i].isShow=false;
    data[i].lists=[];
    data[i].mood="moodStyle"+mood+mood;
    data[i].weather="weatherStyle"+weather+weather
  } while (++i < len);

      var a=view.monthLists[fristI].dayLists.concat(data);
      view.monthLists[fristI].dayLists=a;
   publicJ(values)
}

function publicJ(values){
   if(values.page>0 && values.page<=values.pageSum){
   view.monthLists[fristI].moreInfoShow=true;

  }else{
      view.monthLists[fristI].moreInfoShow=false;
      view.monthLists[fristI].page=false;
      //  console.log(values.page<=values.pageSum)
  }
}
//<===第二阶段结束===>


//点击具体天
function getGameFormDayFn(i){
  var data=view.monthLists[fristI].dayLists[i];
  if(secondI!=i){
    if(typeof secondI == 'number'){
      view.monthLists[fristI].dayLists[secondI].isShow=false
    }
  }
  secondI=i;
  if(data.lists.length==0){
    var day = view.monthLists[fristI].month+"-"+data.day;
    dayAjax(day);
  }

  if(data.isShow){
    data.isShow=false;
  }else {
    data.isShow=true;
    // dayListsIsShowLists=data;
  }
}

// 针对当前的日期份进行数据请求    //todo 发起ajax请求

function dayAjax(day){
  var data={
    userName:userName,
    date:day
  };
  let url =  nodeurl + 'livercloud/v1/platform/getTimeShaftDay.do';
  xhrP(url,data).then(analysisDayAjax);

}

function analysisDayAjax(json){
  var data = json.data,
    values=data.values;
  if(values.length>0){
    view.monthLists[fristI].dayLists[secondI].lists=values;
  }
}

//点击挑战到响应的详情页面；
function goToHomePageFn(i) {
  location.href=view.monthLists[fristI].dayLists[secondI].lists[i].connectUrl
}

export {getDayFormMonthFn,getGameFormDayFn,goToHomePageFn,initParam,getMoreMonthAjax}
