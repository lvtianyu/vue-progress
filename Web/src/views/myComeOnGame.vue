<template>
  <div  id="myComeOnGame"  v-touch:swipeleft="onSwipeLeft" v-touch:swiperight="onSwipeRight" >
       <div class="switch">
		<div class="date">
			<div class="day">{{date}}</div>
			<div class="mandy">
				<p>{{week}}</p>
				<p>{{year}}</p>
			</div>
		</div>

	</div>
    <div  class="parents" >
      <ul v-if="show" >
          <li v-for="item in items" @click="goToHomePage(item.gameInfoUrl)" >
              <h4>挑战{{item.finalCalorie}}卡路里</h4>
             <div>
               <img  v-for="img in item.pictureUrlList" v-bind:src='img'>
             </div>
              <span>{{item.challengeContent}}</span>
              <b class="time">{{item.participationTime}}</b>
          </li>
      </ul>
      <div v-else class="noting">
          今天没有参与活动!
      </div>
    </div>

  </div>

</template>

<script>
    import {viewWidth, locationSelf, nodeurl,locationSelfSearch,userName} from "../wx"
    // import VueTouch from 'vue-touch'
    // Vue.use(VueTouch)
    export default {
    data () {
        return {
        items:[],
        week:"",
        year:"",
        date:"",
        rendData:{},
        show:true,
        nowTime:new Date().getTime(),
        }
    },
    ready(){
        Toast("可以左右滑动切内容")
        var date = new Date().getTime();//+(86400000*3);
        this.rendData = {userName:userName,date:date};
        this.getDate(date);
        this.rendgetMyPartGameInfo();
        // this.watch("a", "cb")
        this.$watch("b",function(val,oldVal){
            console.log(val,oldVal,"new")
        })
        // console.log(this.a)
    },
    // transition:{
    //     transitionName:"a",
    //     enterClass: 'slideOutLeft',
    //     leaveClass: 'slideInRight'
    // },
        methods: {
        rendgetMyPartGameInfo(){
            var url = nodeurl+"livercloud/v1/userInfo/getMyPartGameInfo.do";
            this.$http.post(url,this.rendData,{emulateJSON: true}).then((json)=>{this.getMyPartGameInfo(json)});

        },
        someMethod(){console.log(this.a)},

        testWatch(){
            // this.a++;
            this.b++;
        },
        getDate(date){
            var d = new Date(date)
            this.year=d.getFullYear() + '年' + (d.getMonth()+1) + '月';
            var weekDay = d.getDay();
            this.week= '星期' + upNum(d.getDay());
            this.date=d.getDate();
        },
        goToHomePage: function (msg) {
            location.href=msg
        alert(msg)
        },
        onSwipeRight(){
            this.nowTime=this.nowTime-86400000
            this.rendData.date=this.nowTime;
            console.log(this.nowTime,this.rendData.date)
            this.publicRendAjax(this.nowTime)
        },
        onSwipeLeft(){
            this.nowTime=this.nowTime+86400000
            this.rendData.date=this.nowTime;
                    console.log(this.nowTime,this.rendData.date)

        this.publicRendAjax(this.nowTime)
        },
        publicRendAjax(date){
            console.log(date)
            this.getDate(date);
            this.rendgetMyPartGameInfo();
        },
        getMyPartGameInfo(json){
            var data = json.data.values;
            var len = data.length;
            var newdate='';
            if(len>0){
                this.show=true;
                for(var i=0;i<len;i++){
                    newdate=new Date(data[i].participationTime);
                    data[i].participationTime=newdate.getHours()+':'+newdate.getMinutes();
                    if(data[i].pictureUrlList.lenght>0){
                        if(data[i].pictureUrlList.lenght>5){
                            data[i].pictureUrlList.splice(5);
                        }
                    }
                }
                this.items=data;
            }else{
                this.show=false;
            }
        }
        }

    }
    function upNum(num) {
            var up = ['日','一', '二', '三', '四', '五', '六'];
            return up[num];
        }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
      #myComeOnGame{
            min-height:9rem;
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
      }
      .parents>ul{
          width: 100%;

           overflow-y:auto
      }
      .parents>ul>li{
          width: 50%;
          height: 2.7rem;
          padding-left: .25rem;
          padding-top: .25rem;
          border-bottom: 1px solid #F2F2F2;
          float: left;
          position:relative;
      }

      .parents>ul>li:nth-child(odd){
          border-right: 1px solid #F2F2F2;
      }

      .parents>ul>li>h4,.parents>ul>li>span,.parents>ul>li>div,.parents>ul>li>p{
          width: 100%;
          text-align: left;
      }
      .parents>ul>li>h4{
          font-weight: 100;
      }
      .parents>ul>li>p{
          text-align: right;
      }
      .parents>ul>li>span{
          display: block;
          color: #545454;
      }
      .parents>ul>li>div{
          margin-top: .2rem;
          margin-bottom: .2rem;
          overflow: hidden;
          height: .45rem;
      }
      .parents>ul>li>div>img{
          width: .45rem;
          height: .45rem;
          border-radius: 50%;
      }
      .time{
          position:absolute;
          display:block;
          bottom:0;
          left:0;
          text-align:right;
          color:#8c8c8c;
          width:100%;
          padding-right:5px;
      }
      	.switch {
		position: relative;
        text-align:left;
        z-index: 2;
		.date {
            background-color:#fff;
			border-bottom: 1px solid #e8e8e8;
			padding-top: 0.2rem;
            padding-left:0.1rem;
			position: fixed;
			top: 0;
			height: 1rem;
			width: 100%;
			.day {
				float: left;
				font-size: 0.48rem;
				color:#333;

			}
			.mandy {
				float: left;
                padding-left:5px;
				p {
					font-size: 0.2rem;
					color:#333;
                    margin-bottom:2px;
				}
			}
		}

	}
    .parents{
        width:100%;
         margin-top:1rem;
    }
           .noting{
                      font-size:.32rem;
                      height:2rem;
                      line-height:2rem;
                      text-shadow:2px 3px 2px #31e2cb;
                      margin-top:1rem;
                   }


@keyframes slideOutLeft {
      from {
        transform:translateX(0%);
    }
    to {
        transform: translateX(-100%);
    }
}

@keyframes slideInRight {
    from {
        transform:translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
@keyframes slideInDown {
    from {
        transform:translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}
@keyframes slideInUp {
    from {
        transform:translateY(0);
    }
    to {
        transform: translateY(100%);
    }
}

/*.page-enter {
   animation: slideInRight 0.5s both ease-in;
}

.page-leave {
    animation:slideOutLeft 0.5s both ease-in;
}*/
</style>
