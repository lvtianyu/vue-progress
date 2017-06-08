<template>
  <div class="main-content" v-my-touch="args">
        <div class="todayTime" >{{msg}}</div>
        <div class="heard-calendar">
            <ul>
                <li>周日</li>
                <li>周一</li>
                <li>周二</li>
                <li>周三</li>
                <li>周四</li>
                <li>周五</li>
                <li>周六</li>

            </ul>
        </div>

            <ul class="content-calendar" >
              <li @click=say($index)  v-bind:class="{ 'backDay': item.isBlack,'today':item.isToday ,'isSelect':item.isSelect}"  v-for="item in items" >{{item.day}}</li>
            </ul>

      <div class="next-btn bottom-fixd" :class="[isBack ? 'next-btn-style':'next-btn-gray' ]" @click="comeBack">
                  今天
      </div>
  </div>
</template>
<script>
import {initParam,selectCalenda,comeBackFn,addMonth,reduceMonth} from "../calenda";
import mytouch from "../CustomDirectiveTouch"
import Vue from 'vue'

export default {
  data () {
   return initParam()
  },
      methods: {
        say(msg) {
            // alert(1)
      //v-my-touch="args"
                       selectCalenda(msg,this)
        },
        comeBack(){
          comeBackFn(this)
        },
        args(){
                      // alert(2)

                var fn = {
                  add:addMonth, //将要增加的或像右侧滑动的改变的方法穿进去
                  reduce:reduceMonth,//将要减的或像左侧滑动的改变的方法穿进去
                  that:this//这个this主要是针对vue作用域的,即你要操作的
                }
              return fn
        }

      }
}

Vue.directive('my-touch', mytouch);//本指令只对你要操作的方法进行一次运行而已,不对你的代码进行任何操作



</script>

<style lang='scss' scoped>
$font-size-26:.26rem;
$font-size-32:0.32rem;
$side:left;
$base:#31E2CB;
.main-content{
  padding-left: .22rem;
  padding-right: .22rem;
}
.main-content>div{
  width: 100%;
}
.heard-calendar{
  font-size: $font-size-26;
      overflow: hidden;
}
.heard-calendar>ul{
  width: inherit;
}
//日历页的基本浮动的标准
.class-li-float{
  float: $side;
  width: .97rem;
}
.heard-calendar>ul>li{
@extend .class-li-float;
  height: 1.45rem;
  line-height: 1.45rem;
}
.content-calendar{
  height: 7.5rem;
}
.content-calendar>li{
  @extend  .class-li-float;
  margin-top:.2rem;
  height: 0.97rem;
  line-height: .97rem;
  font-size: $font-size-32;
}
.today{
  border: 1px solid #B3B3B3;
}
.active,.isSelect{
  background-image: radial-gradient($base 55%, #fff 0%);
  background-image: -webkit-radial-gradient($base 55%, #fff 0%);
  color: #fff;
  border-radius: 50%;
}


.backDay{
  opacity: 0.5;
}

.todayTime{
 margin-top: .72rem;
 }
.game-over {
  width: 5rem;
  height: 2.2rem;
  background-color: #fff;
  margin-top: 50%;
  display: inline-block;
  border-radius: .1rem;
  border: 1px solid #e6e6e6;
  position: relative;
}
.game-over>div{
  line-height: 1rem;
}

.game-over > ul > li:last-child>span {
  color: #fff;
  background-color: #31e2cb
}

.game-over > ul > li > span {
  display: inline-block;
  width: 1.62rem;
  height: .6rem;
  line-height: .6rem;
  border: 1px solid #f6f6f6;
}
.game-over > ul {
  height: 1.2rem
}

.game-over > ul > li {
  color: #212121;
  font-size: .24rem;
  float: left;
  width: 50%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center
}

  .next-btn-gray{
       background-image: linear-gradient(to right, #fff, #dadada,#fff);
       color:#fff;
  }


</style>
