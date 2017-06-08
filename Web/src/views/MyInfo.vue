<style lang="scss" scoped>
    .weather1 {
        background: url('../assets/images/sunny_hui.png')
    }

    .mood1 {
        background: url('../assets/images/weixiao_hui.png')
    }

    #myinfo {
        box-sizing: content-box;
        text-align: left;
    }

    .mycard {
        ul li {
            float: left;
            width: 50%;
            height: 1.78rem;
        }
    }

    .userinfo {
        padding: 0.5rem 0;
        border-bottom: 1px solid #CCC;
        .info {
            display: inline-block;
            img {
                vertical-align: middle;
            }
            span {
                font-size: 0.28rem;
                display: inline-block;
                margin-top: 0.28rem;
                margin-left: 0.34rem;
                color: #212121;
            }
        }
        .portrait {
            box-sizing: border-box;
            width: 0.9rem;
            height: 0.9rem;
            border: 1px solid #CACBC6;
            border-radius: 50%;
            text-align: center;
            float: left;
            overflow: hidden;
            background-color: #868686;
            margin-left: 0.26rem;
            img {
                width: 0.88rem;
                height: 0.88rem;
                border-radius: 50%;
                vertical-align: top;
            }
        }
        .calendar {
            width: 0.36rem;
            height: 0.36rem;
            float: right;
            margin-top: 0.18rem;
            margin-right: 0.38rem;
        }
    }

    .rule {
        margin-top: 0.2rem;
        background: url('../assets/images/ads_bg.png');
        width: 100%;
        height: 1.26rem;
        background-size: contain;
        p {
            text-align: center;
            padding-top: 0.4rem;
        }
    }

    p {
        font-size: 0.4rem;
    }

    .switch {
        position: relative;
        .date {
            border-top: 1px solid #CCC;
            padding-top: 0.2rem;
            position: fixed;
            bottom: 0;
            height: 1.3rem;
            width: 100%;
            .day {
                float: left;
                font-size: 0.48rem;
                color: #333;
                margin-right: 0.1rem;
            }
            .mandy {
                float: left;
                p {
                    font-size: 0.2rem;
                    color: #333;
                }
            }
        }
        .images {
            position: fixed;
            bottom: 0;
            height: 1.3rem;
            width: 100%;
            div {
                width: 0.8rem;
                height: 0.8rem;
                position: absolute;
                top: 0.14rem;
                left: 50%;
                margin-left: -0.4rem;
                .pull-up {
                    width: 0.42rem;
                    height: 0.1rem;
                    position: absolute;
                    background: url('../assets/images/shangla.png') no-repeat;
                    background-size: contain;
                    top: 0rem;
                    left: 50%;
                    margin-left: -0.21rem;
                }
            }
            .expression {
                height: 0.34rem;
                width: 0.34rem;
                background-size: contain;
                position: absolute;
                right: 0.28rem;
                bottom: 0.25rem;
            }
            .weather {
                height: 0.36rem;
                width: 0.36rem;
                background-size: contain;
                position: absolute;
                right: 0.96rem;
                bottom: 0.25rem;
            }
        }
    }
</style>

<template>

<div id="myinfo">
    <div class="myinfo">
        <div class="userinfo">
            <div class="info" v-link="{path:'Userinfo'}">
                <div class="portrait">
                    <img v-bind:src=headPortraitUrl alt="头像">
                </div>
                <span>{{name}}</span>
            </div>
            <img src="../assets/images/calendar.png" alt="日历" class="calendar" v-link="{path:'calenda'}">
        </div>
        <div class="mycard clear">
            <ul>
                <li class="clear" v-for="card in cards" v-link="{path:cardIndex}" @click="choose($index)">
                    <mycard :cardinfo="card"></mycard>
                </li>
            </ul>
        </div>
        <!--<div class="rule">
            <p>挑战活动拿小米手环</p>
        </div>-->
    </div>
    <div class="switch">
        <div class="date">
            <div class="day">{{new Date().getDate()}}</div>
            <div class="mandy">
                <p>{{week}}</p>
                <p>{{year}}</p>
            </div>
        </div>
        <div class="images" v-touch:swipeup="onSwipeTop">
            <div v-link="{path:'/'}"><span class="pull-up"></span></div>
            <span class="expression" v-bind:class="ismood"></span>
            <span class="weather" v-bind:class="isWeather"></span>
        </span>
    </div>
</div>

</template>

<script>
    import {
        moodList,
        weatherList,
        base
    }
    from '../MoodWeather.js'
    import Mycard from '../components/Mycard'
    import {
        viewWidth,
        locationSelf,
        nodeurl,
        locationSelfSearch,
        html,
        userName
    }
    from "../wx"


    export default {
        data() {
            return {
                name: localStorage.getItem('nickName'),
                headPortraitUrl: localStorage.getItem('iconUrl'),
                cardIndex: '',
                indexApi: nodeurl + 'livercloud/v1/platform/getUserHomePageInfo.do',
                infoData: '',
                cards: [{
                    title: '我发起的',
                    num: 0,
                    redpoint: false
                }, {
                    title: '我参与的',
                    num: 0,
                    redpoint: false
                }, {
                    title: '我的红包',
                    num: 0,
                    redpoint: false
                }, {
                    title: '我的奖品',
                    num: 1,
                    redpoint: false
                }],
                indexData: '',
                urlMood: '',
                urlWeather: '',
            }
        },
        components: {
            Mycard
        },
        ready: function() {
            this.getIndexData();
        },
        computed: {
            year: function() {
                return new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月';
            },
            week: function() {
                var weekDay = new Date().getDay();
                return '星期' + upNum(weekDay);

            },
            ismood: function() {
                return this.urlMood ? this.urlMood : 'mood1';
            },
            isWeather: function() {
                return this.urlWeather ? this.urlWeather : 'weather1';
            }
        },
        methods: {
            choose: function(index) {
                switch (index) {
                    case 0:
                        this.cardIndex = '/myCreateGame';
                        break;
                    case 1:
                        this.cardIndex = '/myComeOnGame';
                        break;
                    case 2:
                        this.cardIndex = '/myMoney';
                        break;
                    case 3:
                        this.cardIndex = '/mygift';
                        break;
                }
            },
            onSwipeTop: function() {
                history.go(-1);
            },
            getIndexData: function() {
                this.$http.post(this.indexApi, {
                        userName: userName,
                        date: Date.parse(new Date())
                    }, {
                        emulateJSON: true
                    })
                    .then((response) => {
                        var indexRe = eval("(" + response.data + ")");
                        if (indexRe.errorcode == '000000') {
                            this.$set('indexData', indexRe.values);
                            if (this.indexData.hasOwnProperty('mood')) {
                                moodList[this.indexData.mood].moodStyle = 'moodStyle' + this.indexData.mood + this.indexData.mood;
                                this.urlMood = moodList[this.indexData.mood].moodStyle;
                                if (this.indexData.mood == 8) {
                                    moodList[this.indexData.mood].moodStyle = 'moodStyle' + this.indexData.mood;
                                    this.urlMood = moodList[8].moodStyle;
                                }
                            } else {
                                this.urlMood = '';
                            }
                            if (this.indexData.hasOwnProperty('weather')) {
                                weatherList[this.indexData.weather].weatherStyle = 'weatherStyle' + this.indexData.weather + this.indexData.weather;
                                this.urlWeather = weatherList[this.indexData.weather].weatherStyle;
                                if (this.indexData.weather == 8) {
                                    this.urlWeather = weatherList[8].weatherStyle;
                                    weatherList[this.indexData.weather].weatherStyle = 'weatherStyle88';
                                }
                            } else {
                                this.urlWeather = '';
                            }
                            this.$set('infoData', indexRe.values);
                            this.cards = [{
                                title: '我发起的',
                                num: this.infoData.myGame.gameSumNumber,
                                redpoint: this.infoData.myGame.changed
                            }, {
                                title: '我参与的',
                                num: this.infoData.myPartGame.partGameNum,
                                redpoint: this.infoData.myPartGame.changed
                            }, {
                                title: '我的红包',
                                num: this.infoData.myRedPacket.myRedPacketSum / 100,
                                redpoint: this.infoData.myRedPacket.changed
                            }, {
                                title: '我的奖品',
                                num: this.infoData.myAward.myAwardNum,
                                redpoint: this.infoData.myAward.changed
                            }];
                        } else {}
                    }, (response) => {

                    })
                    .catch(function(response) {
                        console.log('这里有异常信息');
                    })
            }
        }
    }


    function upNum(num) {
        var up = ['日', '一', '二', '三', '四', '五', '六'];
        return up[num];
    }
</script>
