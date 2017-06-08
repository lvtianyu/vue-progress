<template>
  <div class="my-money" >

      <ul>
          <li>
              <span></span>
          </li>
          <li>
              我的红包金额
          </li>
          <li>
              ￥:{{moneySum}}
          </li>
      </ul>
      <p></p>
      <div>
          <h1>历史红包</h1>
          <div class="noting" v-if="nothing">
                     暂无数据!
          </div>
          <ul v-else>
              <li v-for="item in moneyList" @click="goToMoneyList($index)">
                  <span>
                      ¥:{{item.account}}
                  </span>
              </li>
          </ul>

      </div>
      <!--<load :show="show"></load>-->
  </div>
</template>
<script>

import {goToNextPage,initParam} from "../myMoney"
import Toast from 'mint-ui/lib/Toast'
import 'mint-ui/lib/Toast/style.css'

export default {
  data () {
   return initParam()
  },
  ready(){
  },
    components: {
            Toast
        },
      methods: {
        goToMoneyList (msg) {
              goToNextPage(msg)
        },
      }
}

</script>

<style>
  @import "../assets/sass/noticePublic.scss";

            body{
                 background-color: #f5f5f5;
             }
             .my-money{
                      min-height:13rem;
               width: 100%;
              }
             .my-money>ul,.my-money>div,.my-money>p{
                 width: 100%;

             }
             .my-money>p{
                 height: 3px;
                 border-top: 0.01rem solid #d5d5d5;
                 background-image: linear-gradient(to right, #f5f5f5, #dadada,#f5f5f5);
                 /*background-color: rgba(9,9,9,0.5);*/
             }
             .my-money>ul{
                 height: 2.65rem;
                 padding-top: .35rem;
                 padding-bottom: .5rem;
             }
             .my-money>ul>li:first-child{
                 margin-bottom: .25rem;
             }
             .my-money>ul>li:first-child>span{
                 width: .7rem;
                 height: .7rem;

                 display: inline-block;
                 background:url('../assets/images/redMoney.png');
                        background-repeat: no-repeat;
                                  background-size: cover;
             }
             .my-money>ul>li:last-child{
                 margin-top: .3rem;
                 font-size: .4rem;
             }
             .my-money>div{
                 margin-top: .95rem;
                 overflow: hidden;
             }
             .my-money>div>h1{
                 text-align: left;
                 padding-left:.3rem ;
                 font-size: .3rem;
                 font-weight: 100;
             }
             .my-money>div>ul{
                 width: 100%;
                 padding: .1rem 0;
             }

             .my-money>div>ul>li{
                 width: 25%;
                 float: left;
                 margin-top: .2rem;
             }
             .my-money>div>ul>li>span{
                 display: inline-block;
                 width: .87rem;
                 height: 1.25rem;
                 background: url('../assets/images/money-back.png') no-repeat;
                 background-size: cover;
                 font-size: .12rem;
                padding-top: .35rem;

             }

              .noting{
                       font-size:.32rem;
                       height:2rem;
                       line-height:2rem;
                      text-shadow:2px 3px 2px #31e2cb;
               }
</style>
