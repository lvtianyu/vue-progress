<template>
<div class="myCreateGame ">
  <div id="modal-public"  v-show.sync="isShow" @click="hideNotice">
      <div class="notice " >{{notice}}</div>
  </div>
    <div class="noting" v-if="nothing">
           暂无数据!
    </div>
    <div v-for="monthList in monthLists " v-else>
        <div class="month-list"  @click="getDayFormMonth($index)">
            {{monthList.month}}
        </div>
     
     <div class="day-list" v-show="monthList.dayList"  v-for="dayList in monthList.dayLists">
                <div @click="getGameFormDay($index)">
                    <div>
                        <p>{{dayList.day}} </p><span>{{dayList.dayOfWeek}}</span>
                    </div>
                    <div>
                    <span  v-bind:class = "dayList.mood"></span><span  v-bind:class = "dayList.weather"></span>

                    </div>
                </div>
               
                <ul class="list"  v-show="dayList.isShow">
                    <li v-for= "List in dayList.lists" @click="goToHomePage($index)">
                  <span><img v-bind:src="List.iconUrl" /></span>

                        <div class="list-label">{{List.title}}</div>
                    </li>
                </ul>

            </div>
     <div v-show="monthList.moreInfoShow" id="moreInfo" @click="getMoreMonthAjaxFn($index)">
                    查看更多
     </div>
    </div>
  
          <load :show="show"></load>
</div>
</template>
<script>
  import {getDayFormMonthFn,getGameFormDayFn,goToHomePageFn,initParam,getMoreMonthAjax} from "../myCreateGame";

  import {hideNotice} from "../noticePublic"

  import load from '../components/loadAnimationPublic'

    export default {
        data () {
            return initParam()
        },
           components: {
                  load
                          },
        methods: {
            getDayFormMonth: function (msg) {
                getDayFormMonthFn(msg)
            },
            getGameFormDay:function(msg){
                getGameFormDayFn(msg)
            },
            goToHomePage:function(msg){
                goToHomePageFn(msg)
            },

            hideNotice:function(){
                 var self = this
                 hideNotice(self)
            },
            getMoreMonthAjaxFn(index){
                    getMoreMonthAjax(index,true)
            }

        }
    }
</script>

<style>
  @import "../assets/sass/moodWeather.scss";
  @import "../assets/sass/noticePublic.scss";

                   body {
                       background-color: #f5f5f5;
                   }

                   .day-list, .list {
                       width: 100%;
                       background-color: #fff;
                   }

                   .myCreateGame > ul > li {
                       width: inherit;
                   }

                   .month-list {
                       width: 2.15rem;
                       border-left: .12rem solid #109F8C;
                       height: .57rem;
                       line-height: .57rem;
                       color: #fff;
                       background-color: #31E2CB;
                       font-size: .3rem;
                       margin-top: 5px;
                       margin-bottom: 5px;
                   }


                   .day-list {

                   }

                   .day-list > div {
                       height: 1.02rem;
                       padding-left: .45rem;
                       padding-right: .45rem;
                   }

                   .day-list > div > div {
                       width: 50%;
                       height: inherit;
                       font-size: .38rem;
                       line-height: 1.02rem;
                       float: left;
                       border-bottom: 1px solid #efefef;

                   }

                   .day-list > div > div:first-child {
                       text-align: left;
                   }

                   .day-list >div > div:first-child > p {
                       float: left;
                   }

                   .day-list >div > div:first-child > span {
                       font-size: .12rem;
                       text-align: center;
                       color: #555;
                       display: inline-block;
                       float: left;
                       line-height: .85rem;
                       padding-left: 5px;
                   }

                   .day-list >div> div:last-child {
                       text-align: right;
                   }

                   .day-list >div > div:last-child > span {
                             width: .31rem;
                             height: .31rem;
                             margin-left: .42rem;
                             background-repeat: no-repeat;
                             background-size: cover;
                             display: inline-block;
                   }

                   .list {
                       position: relative;

                   }

                   .list:before {
                       content: '';
                       display: block;
                       height: .15rem;
                       width: 100%;
                       position: absolute;
                       top: 0;
                       background-image: linear-gradient(to bottom, #dfdfdf, #fff);
                       z-index: 9;
                       opacity: .8;
                   }

                   .list:after{
                       content: '';
                       display: block;
                       height: .15rem;
                       width: 100%;
                       position: absolute;
                       bottom: 0;
                       background-image: linear-gradient(to top, #dfdfdf, #fff);
                       z-index: 9;
                       opacity: .8;
                   }

                   .list > li {
                       height: 1.02rem;
                   }

                   .list > li > div {
                       text-align: left;
                       width: 6.5rem;
                       color: #545454;
                       display: inline-block;
                       height: inherit;
                       line-height: 1.02rem;
                       border-bottom: 1px solid #efefef;
                       float: left;
                   }

                   .list > li > span {
                       width: 1rem;
                       height: inherit;
                       display: inline-block;
                       float:left;
                       line-height: 1.05rem;
                   }
                   .list > li > span>img{
                       width: .45rem;
                       height: .50rem;
                   }
                   .noting{
                      font-size:.32rem;
                      height:2rem;
                      line-height:2rem;
                      text-shadow:2px 3px 2px #31e2cb;
                   }
                   #moreInfo{
                       height:1rem;
                       line-height:1rem;
                       color:#545454;
                       border-bottom:1px solid #efefef;
                       margin-left: .45rem;
                       margin-right: .45rem;
                   }
</style>
