
import {viewWidth, locationSelf, nodeurl,locationSelfSearch,html,baseInfo,userName} from "./wx"
import xhrP from './xhrPublic'

var systime,//当前系统时间
  monthNumberInit,//用来做本月的参照点的
  monitorChangeMonth,//变动的月份;
  date = [],//保存这个日期的
  prvMonthLen,//用来标记
  today ,//今天是几号
  monthNumber,
  htmlTodayTime,//抬头上的年月
  initHtmlTodayTime,//保存今天的年月
  isBack=false,
  nowMonth,
  view={
     msg: htmlTodayTime,
     items: date,
      isBack:isBack
   },
  newDate;//当前的系统时间的值new Date值

// 初始化数据
function initParam() {
  systime=baseInfo.systemTime||new Date().getTime();
  initHtmlTodayTime=new Date(systime).Format('yyyy年M月');
if(date.length==0){
   analysisInitTime(systime);
}
  return view;
}

function analysisInitTime(systime){
  newDate = new Date(systime);
  monthNumberInit = newDate.Format('yyyy-MM');
  nowMonth = new Date(monthNumberInit);
  monitorChangeMonth = new Date(monthNumberInit);//几月
  today = Number(newDate.Format('d')) - 1;
  monthNumber = newDate.getMonth() + 1;//当前是几月份
  todayFn(monitorChangeMonth);
}

function todayFn(month,y=date) {
  var
    nowNewDate = new Date(month),
    n = nowNewDate.getMonth() + 1,
    monthNow = nowNewDate.getTime(),
    nowMonthLen = new Date(nowNewDate.getFullYear(), (nowNewDate.getMonth() + 1), 0).getDate(),
    dayActive;

  prvMonthLen = nowNewDate.getDay();
  view.msg = nowNewDate.Format('yyyy年M月');

  dayFn(prvMonthLen, monthNow, nowMonthLen, n, nowNewDate,y)

}

function dayFn(prvMonthLen, monthNow, nowMonthLen, n, nowNewDate,date) {

  var todayMonthPrv;
  var len = nowMonthLen;
  var i = 0, j = 1, day, classStyle1, classStyle2,dataObj;

  if (prvMonthLen >= 1) {
    do {
      day = "";
      dataObj = {
        day: day,
        isBlack: true,
        isToday:false,
        isSelect:false
      };

      date.push(dataObj);

    } while (--prvMonthLen > 0);
  }

  do {
    todayMonthPrv = monthNow + i * 86400000;
    day = new Date(todayMonthPrv).Format('d');
    classStyle1 = today == i && n == monthNumber ? true : false;
    classStyle2 = (today > i && n == monthNumber) || n < monthNumber ? true : false;

    dataObj = {
      day: day,
      isBlack: classStyle2,
      isToday: classStyle1,
      isSelect:false
    };

    date.push(dataObj);

  } while (++i < len);

  addStyle(date);
}
//请求接口获取已选中日期
function addStyle(that) {
  var date = new Date(monitorChangeMonth).Format("yyyy-MM");
  let url = nodeurl+'livercloud/v1/platform/getGameTimeDuringMonth.do';
  var data = {
    userName:userName,
    date:date
  };

  xhrP(url,data).then((json)=>{
    analysisGetAppointmentInfoByDate(json,that)
  });

}

function analysisGetAppointmentInfoByDate(json,date) {
  var data = json.data.values;
  if(data){
    let len = data.length;
    let i=0;
    let j,
      dateJ;

    if(len>0){
      do {
        j=prvMonthLen-1+data[i];
        dateJ=date[j];

        dateJ.isSelect=true;
      } while (++i < len);
    }
  }else {
    return
  }

}

//d点击可选的日期进行跳转
function selectCalenda(msg,that) {
  var j=msg,
    content=new Date(monitorChangeMonth).Format("yyyy-MM")+"-"+that.items[j].day;
  baseInfo.appointmentTime=new Date(content).getTime();
  console.log(baseInfo.appointmentTime+"修改的时间",content,monitorChangeMonth)

  location.href = "http://camp.liver-cloud.com/platform/Web/dist/index.html#!/";
}
//^点击today时间;

function comeBackFn(that) {

  if(that.isBack){
    that.items=date;
    that.msg=initHtmlTodayTime;
    that.isBack=false;
    monitorChangeMonth=new Date(monthNumberInit)
  }

}
//增加月份

function addMonth(that) {
  monitorChangeMonth.setMonth(monitorChangeMonth.getMonth() + 1);
  publicAjax(that)
}
//减月份

function reduceMonth(that) {
  monitorChangeMonth.setMonth(monitorChangeMonth.getMonth() - 1);
  publicAjax(that)
}

function publicAjax(that) {
  that.items=[];
  todayFn(monitorChangeMonth,that.items);
  that.msg=view.msg;
  that.isBack= (nowMonth.getTime() == monitorChangeMonth.getTime()) ? false : true;
}

export {initParam,selectCalenda,comeBackFn,addMonth,reduceMonth};
