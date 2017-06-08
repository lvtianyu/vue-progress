<template>
<div class="cover" v-show="isshow">
    <div class="verification-box">
        <validator name="validation1">
            <form>
                <div class="verification-title">绑定手机号</div>
                <div class="verification-content">
                    <div class="verification-phone">
                        <input id="phonenumber" type="text" class='phone-number' v-model="phonenumber"  v-validate:phonenumber="{minLength: 16, maxLength: 128}" placeholder='请输入手机号码'>
                        <span @click="fetchLetter" v-bind:style="{background:fetch}">获取验证码</span>
                    </div>
                    <div class="verification-code">
                        <input type="number" placeholder="请输入验证码" v-model="yanzheng">
                    </div>
                </div>
                <div class="verification" @click="bindPhone">绑定</div>
            </form>
        </validator>

    </div>
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
    import Toast from 'mint-ui/lib/Toast'
    import 'mint-ui/lib/Toast/style.css'

    export default {
        data() {
            return {
                verifyApi: 'livercloud/v1/platform/sendSMSCaptchaCode.do',
                bindApi: 'livercloud/v1/loginRegister/bindMobile.do',
                phonenumber: '',
                sendMessageData: '',
                yanzheng: '',
                isshow: true
            }
        },
        components: {
            Toast
        },
        methods: {
            fetchLetter: function() {
                var params = '?phoneNumber=' + this.phonenumber + '&templateID=0'
                this.getVerifyData(params)
            },
            getVerifyData: function(parms) {
                this.$http.get(nodeurl + this.verifyApi + parms)
                    .then((response) => {
                        console.log(response.data);
                        this.sendMessageData = eval("(" + response.data + ")");
                        if (this.sendMessageData.errorcode == '000000') {
                            Toast('发送验证码成功');
                        } else {
                            Toast('发送验证码失败，请稍后再试');
                        }
                    }, (response) => {
                            Toast('网络请求失败，请稍后再试');
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
            },
            bindData: function(parms) {
                this.$http.get(nodeurl + this.bindApi + parms)
                    .then((response) => {
                        this.sendMessageData = eval("(" + response.data + ")");
                        console.log(this.sendMessageData.errorcode);
                        if (this.sendMessageData.errorcode == '000000') {
                            Toast('绑定成功');
                            localStorage.setItem('phoneNumber', this.phonenumber);
                            this.isshow = false;
                            console.log(sessionStorage.getItem("chanllenge"))
                            if (sessionStorage.getItem("chanllenge")){
                                history.go(-1);
                            }
                        } else if (this.sendMessageData.errorcode == '000014') {
                            Toast('短信验证码无效');
                        } else if (this.sendMessageData.errorcode == '000016') {
                            Toast('绑定手机号失败');
                        }
                    }, (response) => {

                    })
                    .catch(function(response) {
                        console.log(response)
                    })
            },
            bindPhone: function() {
                var bindParms = '?userName=' + userName + '&phoneNumber=' + this.phonenumber + '&code=' + this.yanzheng;
                this.bindData(bindParms);
            }
        },
        ready: function() {},
        computed: {
            fetch() {
                return this.$validation1.phonenumber.minLength ? '#ddd' : '#50BAF8';
            }
        }
    }
</script>

<style lang="scss">
    .cover {
        text-align: left;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #F0F0F0;
        z-index: 100;
    }
    
    .verification-box {
        width: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -40%;
        margin-top: -3.4rem;
        background-color: #fff;
        border-radius: 6px;
    }
    
    .verification-title,
    .verification {
        text-align: center;
        font-size: 0.38rem;
        line-height: 1rem;
    }
    
    .verification-content {
        font-size: 0.3rem;
        border-top: 1px solid #C9C9C9;
        border-bottom: 1px solid #C9C9C9;
        padding-left: 1%;
        line-height: 1rem;
    }
    
    .verification-content input {
        border: none;
        font-size: 0.3rem;
        height: 1rem;
        width: 3rem;
        padding-left: 0.1rem;
    }
    
    .verification-phone input {
        width: 3rem;
        height: 1rem;
        padding-left: 0.1rem;
    }
    
    .verification-content div {
        box-sizing: border-box;
        border-bottom: 1px solid #C9C9C9;
        min-height: 1rem;
    }
    
    .verification-content div:nth-child(2) {
        border: none;
    }
    
    .verification-content span {
        float: right;
        width: 2rem;
        line-height: 1.04rem;
        text-align: center;
        background-color: #ddd;
        border-radius: 6px;
        margin-right: 0.1rem;
        color: #FFF;
    }
    
    .verification-box .active {
        color: #fff;
        background-color: #2F91EC
    }
</style>