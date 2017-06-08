<template>
        <div class="header-left fl clear">
            <div class="portrait">
                <img  v-bind:src=infoIcon>
            </div>
            <div class="username-date fl">
                <p class="name">{{infoname}}</p>
                <p class="date">{{infodate}}</p>
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
        baseInfo,
        userName
    } from "../wx"
    import Toast from 'mint-ui/lib/Toast'
    import 'mint-ui/lib/Toast/style.css'

    export default {
        name: 'Iconinfo',
        data() {
            return {
                infoname: '',
                infoIcon: '',
                infoApi: nodeurl + 'livercloud/v1/userInfo/getUserInfo.do',
            }
        },
        components: {
            Toast
        },
        props: ['current', 'finfodata'],
        computed: {
            infodate: function() {
                var date = setDateStr(this.current);
                return date;
            }
        },
        methods: {
            getInfoData: function(data) {
                this.$http.post(this.infoApi, data, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        this.infodata = listData.values;
                        this.infoname = listData.values.nickName;
                        this.infoIcon = listData.values.headPortraitUrl;
                        localStorage.setItem('nickName', listData.values.nickName);
                        localStorage.setItem('mobile', listData.values.mobile);
                        localStorage.setItem('iconUrl', listData.values.headPortraitUrl);
                        localStorage.setItem('userAddress', listData.values.addresss.province + listData.values.addresss.city + listData.values.addresss.county);
                    } else if (listData.errorcode == '000006') {
                        Toast('获取用户信息失败');
                    }
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {
                    console.log('出现异常');
                });
            },
        },
        ready: function() {
            var data = {
                userName: userName
            }
            this.getInfoData(data);
        }
    }

    function setDateStr(setDate) {
        var dd = new Date(setDate);
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "年" + m + "月" + d + "日";
    }
</script>

<style lang="scss" scoped>
    .header-left {
        padding-left: 0.36rem;
        height: 0.75rem;
    }
    
    .portrait {
        box-sizing: border-box;
        width: 0.75rem;
        height: 0.75rem;
        border: 1px solid #CACBC6;
        border-radius: 50%;
        text-align: center;
        float: left;
        overflow: hidden;
        background-color: #868686;
        img {
            width: 0.75rem;
            border-radius: 50%;
            vertical-align: top;
        }
    }
    
    .username-date {
        padding-left: 0.28rem;
        p {
            text-align: left;
        }
    }
    
    .name {
        font-size: 0.22rem;
        color: #545454;
        padding-bottom: 0.06rem;
        padding-top: 0.1rem;
    }
    
    .date {
        font-size: 0.18rem;
        color: #545454;
    }
</style>