<template id="dateshow">
      <div class="lattice-week ">
        <ul class="clear">
          <!--datepass为自定义事件-->
          <li v-for="date of dates"  v-bind:class="{'week-active':date.isA}" v-on:click = "change($index)">
            <p>{{date.text}}</p>
            <p>{{date.num}}</p>
          </li>
        </ul>
    </div>
</template>

<script>
    import {
        viewWidth,
        locationSelf,
        nodeurl,
        locationSelfSearch,
        html,
        baseInfo
    } from "../wx"


    export default {
        data() {
            return {};
        },
        ready: function() {

        },
        methods: {
            change: function(index) {
                this.appointmenttime  = this.dates[index].timeStamp;
                this.$emit('child-method', this.dates[index]);
            }
        },
        props: ['appointmenttime'],
        computed: {
            dates() {
                if (!this.appointmenttime) {
                    this.appointmenttime = new Date();
                }
                var now = new Date(this.appointmenttime);
                var week = now.getDay();
                var day = now.getDate();
                var time = '';
                var dateData = [];
                for (var i = 0; i < 7; i++) {
                    var current = 0;
                    if (week == i + 1) {
                        current = day;
                        time = GetDateStr(this.appointmenttime, 0);
                    } else {
                        if (week == 0) {
                            current = GetDayStr(this.appointmenttime, i - 6);
                        } else {
                            current = GetDayStr(this.appointmenttime, i - week + 1);
                        }
                        if (week == 0) {
                            time = GetDateStr(this.appointmenttime, i - 6);
                        } else {
                            time = GetDateStr(this.appointmenttime, i - week + 1);
                        }
                    }
                    dateData.push({
                        text: '周' + upNum(i),
                        num: current,
                        isA: false,
                        timeStamp: time
                    })
                }
                //this.dates = dateData;
                for (var i = 0; i < 7; i++) {
                    dateData[i].isA = false;
                }
                if (week == 0) {
                    dateData[6].isA = true;
                } else {
                    dateData[week - 1].isA = true;
                }
                return dateData;
            }
        }
    };
    // 将小写数字1转化为大写数字一
    function upNum(num) {
        var up = ['一', '二', '三', '四', '五', '六', '日'];
        return up[num];
    }
    //将时间转化为天数
    function GetDayStr(time, AddDay) {
        var dd = new Date(time);
        dd.setDate(dd.getDate() + AddDay); //获取AddDayCount天后的日期
        var d = dd.getDate();
        return d;
    }
    //获取时间戳
    function  GetDateStr(time, AddDayCount)  {
        var  dd  =  new  Date(time);      //获取当前
        dd.setDate(dd.getDate() + AddDayCount);    //设置时间
        var c = dd.getTime() //获取毫秒数
        return c;
    }
</script>

<style lang="scss" scoped>
    .lattice-week {
        background-color: #fafafa;
        ul {
            background-color: #fff;
            display: flex;
            width: 100%;
            li {
                width: 20px;
                flex: 1;
                float: left;
                text-align: center;
                border: 0.04rem solid #F0F0F0;
                border-right: none;
                color: #C7C7C7;
                padding-top: 0.1rem;
                p:nth-child(1) {
                    font-size: 0.16rem;
                    margin: 0.1rem 0;
                }
                p:nth-child(2) {
                    font-size: 0.3rem;
                    margin-bottom: 0.32rem;
                }
            }
            li:nth-child(7) {
                border-right: 1px solid #E5E5E5;
            }
            .week-active {
                color: #3CDEC9;
            }
        }
    }
</style>