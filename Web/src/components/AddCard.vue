<template>
<div class="clear">
    <div class="fl app-box clear">
        <div class="app-icon">
            <img v-bind:src=addcard.icon2>
        </div>
        <div class="app-der-box">
            <p class="app-name">{{title}}</p>
            <p class="app-der">{{desc}}</p>
            <p id="detail" @click="show" v-show=!isShow>查看详情<span></span></p>
        </div>
    </div>
    <div class="fr open" @click="action" v-bind:class="{'add': Active}">{{smallTitle}}</div>
        <p class="clear" id="details" v-show=isShow>
            <span class="fl  spansrg" @click="pullup">{{moreDesc}}</span>
            <span class=" spans" @click="pullup"></span>
        </p>
</div>
</template>

<script>
    export default {
        data() {
            return {
                title: this.addcard.title,
                desc: this.addcard.desc,
                Active: true,
                isShow: false,
                moreDesc: this.addcard.desc,
                titleAdd: ''
            }
        },
        props: ['addcard'],
        ready: function() {
            this.titleAdd = this.addcard.userPortlet;
        },
        computed: {
            smallTitle: function() {
                if (!this.titleAdd) {
                    if (this.addcard.price == 0) {
                        this.Active = true;
                        return '添加';
                    } else {
                        return this.addcard.price;
                    }
                } else {
                    this.Active = false;
                    return '打开';
                }
            }
        },
        methods: {
            show() {
                this.isShow = !this.isShow;
            },
            action() {
                if (this.Active) {
                    this.Active = !this.Active;
                    this.$emit('addmore', '');
                    this.titleAdd = !this.titleAdd;
                } else {
                    this.$emit('opencard', '');
                }
            },
            pullup() {
                this.isShow = !this.isShow;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .clear {
        text-align: left;
    }

    .add-template-contant .app-icon,
    .app-der-box {
        img {
            width: 0.7rem;
            height: 0.7rem;
            vertical-align: top;
        }
    }

    .add-template-contant .app-icon {
        float: left;
        padding-top: 0.32rem;
        padding-right: 0.28rem;
    }

    .add-template-contant .app-box {
        width: 80%;
        padding-bottom: 0.2rem;
    }

    .add-template-contant .app-der-box {
        box-sizing: border-box;
        width: 70%;
        float: left;
    }

    .add-template-contant .app-name {
        font-size: 0.28rem;
        color: #545454;
        padding-bottom: 0.12rem;
        margin-top: 0.15rem;
    }

    .add-template-contant .app-der {
        font-size: 0.24rem;
        color: #C1C1C1;
        margin-bottom: 0.12rem;
    }

    .app-der p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .open {
        width: 0.84rem;
        height: 0.54rem;
        line-height: 0.54rem;
        border-radius: 0.08rem;
        text-align: center;
        margin-top: 0.44rem;
        border: 1px solid #E5E5E5;
        color: #888;
        font-size: 0.24rem;
    }

    .add-template-contant .add {
        color: #31e2cb;
        border: 1px solid #31e2cb;
    }

    .add-template-contant .detail {
        font-size: 0.3rem;
        color: #888
    }

    #detail {
        font-size: 0.24rem;
        color: #C1C1C1;
        span {
            display: inline-block;
            width: 0.16rem;
            height: 0.16rem;
            background: url('../assets/images/add-detail.png') no-repeat;
            background-size: contain;
            margin-left: 0.1rem;
        }
    }

    #details {
        font-size: 0.24rem;
            .spans {
                display: inline-block;
                width: 0.18rem;
                height: 0.18rem;
                background: url('../assets/images/pull-up.png');
                background-size: contain;
                margin-right: 0.1rem;
                float: right;
                background-repeat: no-repeat;
            }

            .spansrg {
                width: 90%;
                display: inline-block;
                white-space: normal;
                word-break: break-all;
                margin-bottom: 0.1rem;
            }
    }

</style>
