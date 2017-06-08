<template>
    <div>
    <span class="title">{{title}}</span>
    <span class="tips" v-if=red></span>
    <span class="num">{{num}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: this.cardinfo.title,
                num: this.cardinfo.num,
                red: this.cardinfo.redpoint,
                urlMood: '',
                urlWeather: '',
            }
        },
        props: ['cardinfo'],
        ready: function() {
        }
    }
</script>

<style lang="scss" scoped>
    div {
        border-bottom: 1px solid #CCC;
        border-right: 1px solid #CCC;
        width: 100%;
        height: 100%;
        position: relative;
    }

    span {
        font-size: 0.3rem;
        padding: 0.75rem 0.36rem;
        color:#8c8c8c;
    }

    .title {
        float: left;
        color:#808080;
    }

    .tips {
        position: absolute;
        width: 0.12rem;
        height: 0.12rem;
        background: #ED1F46;
        top: 0.6rem;
        left: 1.75rem;
        border-radius: 0.06rem;
        padding: 0;
    }

    .num {
        float: right;
        padding: 0.75rem 0.48rem;
    }
</style>
