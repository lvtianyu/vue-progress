<template>
<div id="mygift">
          <div class="gift-header">
        奖品
      </div>
      <div class="gift-content">
          <ul class="ul clear">
              <li id="opennew" v-show="isnew">
                 <div>
                    <img src="../assets/images/prize.png" alt="">
                    <p>新奖品，速领取</p>
                </div>
              </li>
              <li v-for="giftdata in giftdatas" id="gift">
                 <div>
                    <img  v-bind:src="giftdata.pictureUrl" alt="">
                    <p>{{giftdata.describe}}</p>
                    <span>{{getGiftDate(giftdata.getTime)}}</span>
                </div>
              </li>
          </ul>
      </div>
       <div class="tips">尚未从活动处获得礼物</div>
</div>
</template>

<script>
    import {
        viewWidth,
        locationSelf,
        nodeurl,
        locationSelfSearch,
        html,
        userName
    } from "../wx"

    export default {
        data() {
            return {
                giftApi: nodeurl + 'livercloud/v1/platform/getMyAwardInfo.do',
                giftdatas: '',
                isNew:false
            }
        },
        ready: function() {
            var data = {
                userName: userName
            }
            this.getGiftData(data);
        },
        methods: {
            getGiftData: function(data) {
                this.$http.post(this.giftApi, data, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        this.giftdatas = listData.values;
                    }
                    console.log(response.data);
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {
                    console.log('出现异常');
                });
            },
            getGiftDate: function(time) {
                var date = new Date(time);
                return date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate();
            }
        },
        computed: {
            getgiftdate() {
                return getGiftDate(this.giftdate.getTime);
            }
        }
    }
</script>

<style lang="scss">
    $baseColor: #B3B3B3;
    @import "../assets/sass/common.scss";
    .ul {
        width: 100%;
        li {
            float: left;
            width: 50%;
        }
    }
    
    #mygift {
        text-align: left;
        color: $baseColor;
        background-color: #fff;
        p {
            padding: 0.4rem;
        }
    }
    
    .gift-header {
        box-sizing: border-box;
        text-align: center;
        line-height: 0.94rem;
        font-size: 0.36rem;
        color: #212121;
        border-bottom: 1px solid #EEE;
    }
    
    #gift div {
        text-align: center;
        border-bottom: 1px solid #EEE;
        border-right: 1px solid #EEE;
        font-size: 0.3rem;
        color: #A2A2A2;
        p {
            padding-top: 0.4rem;
            padding-bottom: 0.1rem;
        }
        img {
            width: 1rem;
            height: 1rem;
            margin-top: 0.78rem;
        }
        span {
            font-size: 0.14rem;
            display: inline-block;
            margin-left: 2.5rem;
        }
    }
    
    .tips {
        padding-left: 0.1rem;
        height: 1rem;
        line-height: 1rem;
    }
    
    #opennew div {
        text-align: center;
        border-bottom: 1px solid #EEE;
        border-right: 1px solid #EEE;
        font-size: 0.3rem;
        color: #A2A2A2;
        img {
            width: 1rem;
            height: 1rem;
            margin-top: 0.78rem;
        }
    }
</style>