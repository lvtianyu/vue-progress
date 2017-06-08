
import xhrP from './xhrPublic'
import {viewWidth, locationSelf, nodeurl,locationSelfSearch,html,userName} from "./wx"

import {data} from "./noticePublic"
import Toast from 'mint-ui/lib/Toast'
import 'mint-ui/lib/Toast/style.css'

var view={moneySum:'0',moneyList:[],show:true,isShow:data.isShow,notice:data.notice,nothing:false};

// 初始化数据
function initParam(that) {

  var data = {
    userName:userName
  };
  let url =  nodeurl + 'livercloud/v1/redpacket/getMyRedPacketInfo.do';

  xhrP(url,data).then(analysisGetMoney);

return view
}

function analysisGetMoney(json){
  var data = JSON.parse(json.data),
    values=data.values.redList;
  view.show=false;

  if(values){

    view.moneySum=data.values.sum/100;
    view.moneyList=values;

  }else {
    view.isShow=true;
    view.nothing=true;

    if(data.errorcode != '000000'){
      Toast(data.errormsg);
    }
  }
  
}

//点击跳转到改里表页的
function goToNextPage(i) {
  locationSelf.href=view.moneyList[i].url;
}

export {goToNextPage,initParam};
