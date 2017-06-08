<template>


            <ul class="content-calendar" v-my-touch="args">
              <li v-bind:class="{ 'backDay': item.isBlack,'today':item.isToday ,'isSelect':item.isSelect}" v-on:click=say($index) v-for="item in items" >{{item.day}}</li>
            </ul>

</template>
<script>
import {htmlTodayTime, date,selectCalenda,comeBackFn,addMonth,reduceMonth} from "../calenda";
import mytouch from "../CustomDirectiveTouch"
import Vue from 'vue'

export default {
  data () {
   return {
     msg: htmlTodayTime,
     items: date,

   }
  },
      methods: {
        say: function (msg) {

        var isBlack = date[msg].isBlack,
        isSelect=date[msg].isSelect;
                       selectCalenda(msg)
        },
        comeBack:function(){
          var that = this;
          comeBackFn(that)
        },
             args:function(){
                var fn = {
                  add:addMonth,
                  reduce:reduceMonth,
                  that:this
                }
              return fn
             }

      }

}

Vue.directive('my-touch', mytouch);



</script>

<style lang='scss' scoped>
$font-size-26:.26rem;
$font-size-32:0.32rem;
$side:left;
$base:#31E2CB;
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


</style>
