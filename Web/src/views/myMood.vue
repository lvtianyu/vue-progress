<template>
<div class="my-mood">
<div id="modal-public"  v-show.sync="isShow" @click="hideNotice">
    <div class="notice " >{{notice}}</div>
</div>
    <h1>{{title}}</h1>
<div>{{weatherText}}</div>
<ul>

    <li v-for="weather in weathers" @click="weatherSave($index)"><span v-bind:class="weather.weatherStyle"></span></li>

</ul>
<div>{{moodText}}</div>

<ul>

<li v-for="mood in moods" @click="moodSave($index)"><span v-bind:class="mood.moodStyle"></span></li>

</ul>

<div id="fixBottom" class=" next-btn" v-bind:class="[isBack ? 'next-btn-style':'next-btn-gray' ]"  @click="dataUp" >提交</div>

</div>
</template>
<script>

import {data,hideNotice} from "../noticePublic"

import {initParam, moodSaveFn, weatherSaveFn, dataUpFn} from "../myMood"

export default {
    data () {
        return initParam()
    },
    methods: {
        dataUp() {

            dataUpFn(this)
        },
        moodSave(msg){
            moodSaveFn(msg,this)

        },
        weatherSave(msg){
            weatherSaveFn(msg,this)
        },
        hideNotice(){
                        hideNotice(this)
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
                    .my-mood{
                                               

                    }
                   .my-mood>h1,.my-mood>ul,.my-mood>div{
                       width: 100%;
                   }

                   .my-mood>h1{
                       margin-top: .72rem;
                       margin-bottom: 1.2rem;
                       font-size: .28rem;
                       font-weight: 100;
                   }
                   .my-mood>div{
                       margin-bottom: .5rem;
                       margin-top: 1rem;
                       clear: both;
                   }
                   .my-mood>ul{
                       overflow: hidden;
                   }
                   .my-mood>ul>li{
                       width: 25%;
                       float: left;
                       height: 1.3rem;
                       line-height: 1.3rem;
                   }
                   .my-mood>ul>li>span{
                       width: .55rem;
                       height: .55rem;
                       display: inline-block;
                       background-repeat: no-repeat;
                       background-color: #f5f5f5;
                       background-size: cover;

                   }
                   #fixBottom{
                       position: fixed;
                       bottom: 0;
                       left: 0;
                       border-radius: 0;
                       margin: 0;
                   }

                   .next-btn-gray{
                 background-image: linear-gradient(to right, #fff, #dadada,#fff);
                 color:#fff;
                   }

</style>
