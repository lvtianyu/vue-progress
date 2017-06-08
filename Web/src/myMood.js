import {viewWidth, locationSelf, nodeurl, locationSelfSearch, html, baseInfo, userName} from "./wx"
import {moodList, weatherList, base} from "./MoodWeather"
import {data,noticeSetTimeoutPublick} from "./noticePublic"

import xhrP from './xhrPublic'

var dataUp = {userName: userName},
  isOr={ isWeather:false,isMood:false},//用来标记上传按钮是否亮起的方法；
  isClick = false,
  slef,
  view={
    notice:data.notice,
    isShow:data.isShow,
    title: "",
    isBack:isClick,
    moods: "",
    weathers:"",
    moodText:"开心",
    weatherText:'晴天',
  };
// 初始化数据
function initParam() {
  //将公共区里面的基本天气和心情还有时间拿出来

  view.title=new Date(baseInfo.appointmentTime).Format('yyyy年M月d日');
  dataUp.date = baseInfo.appointmentTime;
  var primeWeather = base.primeWeather;
  var primeMood = base.primeMood;
  dataUp.weather = primeWeather;
  dataUp.mood = primeMood;
  if (primeWeather != 8) {
    view.weatherText=weatherList[primeWeather].text;  
  }
  if (primeMood != 8) {
    view.moodText=moodList[primeMood].text
  }
  view.moods=moodList;
  view.weathers=weatherList;
  view.isBack=false;
  return view
}

//修改天气
const weatherSaveFn = (msg, that) => publicMoodWeatherFn(msg,that,'weathers',"weatherStyle","primeWeather","weatherText",weatherList,"isWeather","weather");

//修改心情
const moodSaveFn = (msg,that) => publicMoodWeatherFn(msg,that,'moods',"moodStyle","primeMood","moodText",moodList,"isMood","mood");

//共用方法
function publicMoodWeatherFn(msg,that,arr,changeElement,prime,text,moodWeatherList,aOrb,ele){
      slef = that;
  var list = that[arr][msg],
      baseArr = list[changeElement],
      primeC=base[prime],
      content = changeElement+msg;
      if(primeC!=8){
        that[arr][primeC][changeElement]=changeElement+primeC;
      }
      view[text]=moodWeatherList[msg].text;
      if(baseArr==content){
        list[changeElement] = content+msg;
        isOr[aOrb]=true;
        base[prime]=msg;
      }else{
        list[changeElement]=content;
        isOr[aOrb]=false;
        base[prime]=8;
      }
      dataUp[ele]=base[prime];
      // console.log(base[prime],list[changeElement])
      return isClickFn()
}

const isClickFn=()=>slef.isBack = isClick = isOr.isMood || isOr.isWeather ? true : false;

//将修改和保存的数据进行上传
function dataUpFn(that) {
  if (isClick) {
    let url = nodeurl + 'livercloud/v1/weathermood/saveWeatherMood.do';
    xhrP(url, dataUp).then(analysis);
  }

}

function analysis(json) {
  var data = JSON.parse(json.data),
    values = data.values;
  if (values) {
    slef.isBack = false;
    b(values);//反馈信息提示
  } else {
    return noticeSetTimeoutPublick("系统故障", slef);
  }
}

function b(c) {
  noticeSetTimeoutPublick("添加成功", slef);
}

export {initParam, moodSaveFn, weatherSaveFn, dataUpFn}