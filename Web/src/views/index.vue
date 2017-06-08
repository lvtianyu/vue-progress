<template>
  <div id="index">
    <div class="lattice-header clear">
      <iconinfo :current="currentTime"></iconinfo>
      <div class="header-right fr clear">
        <div class="calendar fr" v-link="{path:'calenda'}"></div>
        <div class="expression fr" v-link="{path:'myMood'}" v-bind:class="ismood"></div>
        <div class="weather fr" @click="chooseWeather" v-link="{path:'myMood'}" v-bind:class="isWeather"></div>
      </div>
    </div>
    <dateshow v-on:child-method="datePass" class="dateshow" v-bind:appointmenttime="appointmenttime"></dateshow>
    <!--根据天数更新card-->
    <ul class="clear lattice-contant" v-touch:swipeleft="rightMore" v-touch:swiperight="leftMore">
      <li v-for="cardData in cardDatas">
        <card :msgfather="cardData" @click="chooseCard($index)" :edit=isEdit v-on:delete-card="deleteOne($index)" v-on:collection="collection($index)"
          :showdata="showDelete" v-on:longpressdata="longpress"></card>
      </li>
      <li v-link="{path:'addmore'}" v-if=isShow>
        <h3></h3>
        <div class="addmore">
          <img src="../assets/images/add_14.png">
        </div>
      </li>
    </ul>
    <div class="lattice-footer">
      <ul class="clear">
        <li v-link="{path:'MyInfo'}">
          <span></span>
        </li>
        <li><span @click="leftMore" v-bind:style="{ backgroundImage: 'url(' + lefturl + ')' }"></span></li>
        <li><span @click="rightMore" v-bind:style="{ backgroundImage: 'url(' + righturl + ')' }"></span></li>
        <li><span @click="editing"></span></li>
      </ul>
    </div>
  </div>
</template>
<script>
    var url1 = require('../assets/images/dayu.png'),
        url11 = require('../assets/images/left.png');
    var url2 = require('../assets/images/xiaoyu.png'),
        url22 = require('../assets/images/right.png');
    import Iconinfo from '../components/Iconinfo'
    import Dateshow from '../components/Dateshow'
    import Card from '../components/Card'
    import Verify from '../views/Verify.vue'
    import {
        moodList,
        moodList1,
        weatherList,
        weatherList1,
        base
    } from '../MoodWeather'
    import {
        viewWidth,
        locationSelf,
        nodeurl,
        locationSelfSearch,
        html,
        baseInfo,
        userName
    } from "../wx"
    import {MessageBox,Toast} from 'mint-ui'
    import 'mint-ui/lib/message-box/style.css';


    var fromIndex = 0,
        endIndex = fromIndex + 5;

    export default {
        data() {
            return {
                cardDatas: '',
                msg: '',
                isEdit: false,
                indexData: '',
                indexApi: nodeurl + 'livercloud/v1/platform/getUserHomePageInfo.do',
                cardApi: nodeurl + 'livercloud/v1/portlet/getUserPortletList.do',
                deleteCardApi: nodeurl + 'livercloud/v1/portlet/deleteUserPortlet.do',
                collectApi: nodeurl + 'livercloud/v1/portlet/addFavoritePortlet.do',
                fetchDate: '',
                chooseTime: '',
                currentTime: Date.parse(new Date()),
                isShow: true,
                urlMood: '',
                urlWeather: '',
                showDelete: true,
                isHide: true,
                pressflag: '',
                appointmenttime: ''
            }
        },
        components: {
            Dateshow,
            Card,
            Iconinfo
        },
        ready: function() {
            this.appointmenttime = baseInfo.appointmentTime;
            var phoneNumber = localStorage.getItem('phoneNumber');
            if (phoneNumber) {
                this.isHide = false;
            }
            this.datePass({
                timeStamp: Date.parse(new Date()),
            });
        },
        methods: {
            datePass: function(msg) {
                if (this.currentTime == msg.timeStamp) {
                    if (baseInfo.appointmentTime) {
                        this.currentTime = baseInfo.appointmentTime;
                    } else {
                        this.currentTime = new Date().getTime();
                    }
                } else {
                    baseInfo.appointmentTime = msg.timeStamp;
                    this.currentTime = baseInfo.appointmentTime;
                }
                this.getCardData(this.currentTime);
                this.fetchDate = msg;
                if (this.currentTime > Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))) {
                    this.showDelete = true;
                } else {
                    this.showDelete = false;
                }
                this.getIndexData();
            },
            chooseWeather: function() {},
            longpress() {
                this.pressflag = 1;
            },
            collection(index) {
                var pin1;
                if (this.cardDatas[index].pin == 0) {
                    pin1 = 1
                } else {
                    pin1 = 2
                }
                if (this.fetchDate) {
                    this.chooseTime = this.fetchDate.timeStamp;
                } else {
                    this.chooseTime = Date.parse(new Date());
                }
                var data = {
                    prototypeId: this.cardDatas[index].portletPrototype.id,
                    timestamp: this.chooseTime,
                    pin: pin1,
                    userName: userName
                }
                this.collectCardData(data, index);
            },
            chooseCard: function(index) {
                if (this.pressflag == 1) {
                    this.pressflag = 0;
                } else {
                    if(this.currentTime < Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))){
                        if(GetQueryString(this.cardDatas[index].portletPrototype.portletActionMap['0'].action,"exist")){
                                window.location.href = this.cardDatas[index].portletPrototype.portletActionMap['0'].action + 'userName=' + userName + '&challengeDate=' + this.currentTime;
                    }else{
                        Toast('无法创建新活动');
                    }
                }else{
                             window.location.href = this.cardDatas[index].portletPrototype.portletActionMap['0'].action + 'userName=' + userName + '&challengeDate=' + this.currentTime;
                }


                }
            },
            editing: function() {
                if(this.currentTime < Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))){
                   Toast('过期任务不可更改');
                }
                this.isEdit = !this.isEdit;
            },
            deleteOne: function(index) {
                MessageBox.confirm('是否删除此模版', '提示').then(action => {
                    this.deleteCardData(this.cardDatas[index].id, index);
                });
            },
            getIndexData: function() {
                this.$http.post(this.indexApi, {
                        userName: userName,
                        date: this.currentTime
                    }, {
                        emulateJSON: true
                    })
                    .then((response) => {
                        var indexRe = eval("(" + response.data + ")");
                        if (indexRe.errorcode == '000000') {
                            this.$set('indexData', indexRe.values);
                            for (var i = 0; i < 8; i++) {
                                weatherList[i].weatherStyle = 'weatherStyle' + i
                                moodList[i].moodStyle = 'moodStyle' + i
                            }
                            var systemDate = this.indexData.year + '-' + this.indexData.month + '-' + this.indexData.day;
                            if (!baseInfo.appointmentTime) {
                                baseInfo.appointmentTime = new Date(systemDate).getTime();
                            }

                            if (this.indexData.hasOwnProperty('weather')) {
                                if (this.indexData.weather == 8) {
                                    this.urlWeather = '';
                                    base.primeWeather = 8;
                                } else {
                                    weatherList[this.indexData.weather].weatherStyle = 'weatherStyle' + this.indexData.weather + this.indexData.weather;
                                    this.urlWeather = weatherList[this.indexData.weather].weatherStyle;
                                    base.primeWeather = this.indexData.weather;
                                }
                            } else {
                                this.urlWeather = '';
                                base.primeWeather = 8;
                            }

                            if (this.indexData.hasOwnProperty('mood')) {
                                if (this.indexData.mood == 8) {
                                    this.urlMood = '';
                                    base.primeMood = 8;
                                } else {
                                    moodList[this.indexData.mood].moodStyle = 'moodStyle' + this.indexData.mood + this.indexData.mood;
                                    this.urlMood = moodList[this.indexData.mood].moodStyle;
                                    base.primeMood = this.indexData.mood;
                                }
                            } else {
                                this.urlMood = '';
                                base.primeMood = 8;
                            }
                        }
                    }, (response) => {
                        cosnole.log(response.data);
                    })
                    .catch(function(response) {
                        console.log('这里有异常');
                    })
            },
            deleteCardData(id, index) {
                this.$http.post(this.deleteCardApi, {
                    id: id
                }, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    this.cardDatas.splice(index, 1);
                }, (response) => {}).catch(function(response) {
                    Toast('服务器异常，请稍后再试');
                });
            },
            collectCardData(data, index) {
                var that = this;
                this.$http.post(that.collectApi, data, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        var card = cloneObj(that.cardDatas[index]);
                        if (data.pin == 1) {
                            card.pin = 1;
                            that.cardDatas.$set(index, card);
                        } else {
                            card.pin = 0;
                            that.cardDatas.$set(index, card);
                        }
                    }
                }, (response) => {}).catch(function(response) {
                    Toast('出现异常,请稍后重试');
                });
            },
            getCardData(date) {
                this.$http.post(this.cardApi, {
                    userName: userName,
                    date: date,
                    type: '0'
                }, {
                    emulateJSON: true
                }).then((response) => {
                    var cardData = eval("(" + response.data + ")");
                    var data1 = cardData.values.list1;
                    var data2 = cardData.values.list2;
                    var data3 = cardData.values.list3;
                    var arr1 = addAttr(data1, '1').concat(addAttr(data2, '2')).concat(addAttr(data3, '3'));
                    this.cardDatas = null;
                    this.cardDatas = arr1;
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {});
            },
            leftMore() {
                this.getCardData(getNewTime(-1, this.currentTime));
                this.currentTime = getNewTime(-1, this.currentTime);
                this.getIndexData();
                this.appointmenttime = this.currentTime;
                this.isEdit = false;
                baseInfo.appointmentTime = this.appointmenttime;
                if (this.currentTime >= Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))) {
                    this.showDelete = true;
                } else {
                    this.showDelete = false;
                }
            },
            rightMore() {
                this.getCardData(getNewTime(1, this.currentTime));
                this.currentTime = getNewTime(1, this.currentTime);
                this.getIndexData();
                this.isEdit = false;
                this.appointmenttime = this.currentTime;
                baseInfo.appointmentTime = this.appointmenttime;
                if (this.currentTime >= Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))) {
                    this.showDelete = true;
                } else {
                    this.showDelete = false;
                }
            }
        },
        computed: {
            isShow() {
                return this.currentTime >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() ? true : false;
            },
            data: function() {
                return this.infodata;
            },
            ismood: function() {
                return this.urlMood ? this.urlMood : 'mood1';
            },
            isWeather: function() {
                return this.urlWeather ? this.urlWeather : 'weather1';
            },
            //appointmenttime: function() {
            //   return baseInfo.appointmentTime;
            // },
            lefturl() {
                return this.isLeft ? url1 : url22;
            },
            righturl() {
                return this.isRight ? url2 : url11;;
            }
        }
    }


function GetQueryString(url, name) {
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(url);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}

    // 对数组中的对象进行添加属性
    function addAttr(datas, type) {
        if (type == '1') {
            for (var data of datas) {
                data.fixed = '1';
            }
            return datas;
        } else if (type == '2') {
            for (var data of datas) {
                data.fixed = '2';
            }
            return datas;
        } else if (type == '3') {
            for (var data of datas) {
                data.fixed = '3';
            }
            return datas;
        }
    }

    //实现对当前时间的获取
    function getNewTime(flag, currtime) {
        var day = new Date(currtime).getDate() + flag,
            month = new Date(currtime).getMonth(),
            year = new Date(currtime).getFullYear();
        return new Date(year, month, day).getTime();
    }

    // 实现对象的深复制
    var cloneObj = function(obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    };
</script>
<style lang="scss" scoped>
  @import "../assets/sass/common.scss";
  .weather1 {
    background: url('../assets/images/sunny_hui.png')
  }

  .mood1 {
    background: url('../assets/images/weixiao_hui.png')
  }

  #phoneVerify {
    width: 100%;
  }

  #index {
    width: 100%;
    background-color: #fff;
  }

  .lattice-header {
    width: 100%;
    background-color: #fff;
    padding: 0.18rem 0;
  }

  .lattice-header .header-right {
    box-sizing: border-box;
  }

  .lattice-header .header-right div {
    width: 30px;
    height: 30px;
    background-color: #ccc;
    margin-right: 0.42rem;
  }

  .lattice-header .header-right .calendar {
    background: url(../assets/images/calendar.png) no-repeat;
    height: 0.36rem;
    width: 0.36rem;
    background-size: contain;
    margin-top: 0.18rem;
    margin-right: 0.3rem;
  }

  .lattice-header .header-right .expression {
    background-color: #FFF;
    height: 0.34rem;
    width: 0.34rem;
    background-size: contain;
    margin-top: 0.19rem;
  }

  .lattice-header .header-right .weather {
    background-color: #FFF;
    height: 0.36rem;
    width: 0.36rem;
    background-size: contain;
    margin-top: 0.19rem;
  }

  .dateshow {
    padding: 0.16rem;
    border: 1px solid #e2e2e2;
  }

  .lattice-contant {
    height: 9rem;
    background-color: #fff;
    .addmore {
      text-align: center;
      img {
        width: 0.68rem;
        height: 0.68rem;
        margin: 0.7rem;
      }
    }
  }

  .lattice-contant li {
    float: left;
    width: 50%;
    box-sizing: border-box;
    border-right: none;
  }

  .lattice-footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #ededed;
    background-color: #fff;
    height: 1.02rem;
  }

  .lattice-footer ul {
    height: 100%;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 1.02rem;
      span {
        display: inline-block;
        width: 0.34rem;
        height: 0.34rem;
        vertical-align: middle;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }

  .lattice-footer ul li:nth-child(1) span {
    background-image: url('../assets/images/home_14.png');
  }

  .lattice-footer ul li:nth-child(4) span {
    background-image: url('../assets/images/shezhi.png')
  }

  .lattice-footer ul li.xiaoyu img {
    transform: rotate(180deg);
  }

  .mood {
    position: absolute;
    right: 0;
    top: 0.8rem;
    width: 3rem;
  }

</style>
