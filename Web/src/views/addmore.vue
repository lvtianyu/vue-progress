<template>
<div>
    <ul class="add-template-contant">
        <li v-for="moduleData in moduleDatas">
                <add-card :addcard="moduleData" v-on:addmore="addmore($index)" v-on:opencard="opencard($index)"  v-link="{path:openPath}"></add-card>
        </li>
    </ul>
</div>
</template>

<script>
    //引用的信息列表
    import {
        viewWidth,
        locationSelf,
        nodeurl,
        locationSelfSearch,
        html,
        userName,
        baseInfo
    } from "../wx"
    import AddCard from '../components/AddCard'
    export default {
        data() {
            return {
                moduleDatas: '',
                listApi: nodeurl + 'livercloud/v1/portlet/getPortletPrototypeList.do',
                addApi: nodeurl + 'livercloud/v1/portlet/addUserPortlet.do',
                openPath: ''
            }
        },
        components: {
            AddCard
        },
        ready: function() {
            if (baseInfo.appointmentTime) {
                this.getListData(Date.parse(new Date(baseInfo.appointmentTime)));
            } else {
                this.getListData(Date.parse(new Date()));
            }
        },
        computed: {
            actionTitle: function() {
                return this.moduleDatas[$index].price == 0 ? '打开' : moduleDatas[$index].price;
            }
        },
        methods: {
            opencard: function(index) {
                window.location.href = this.moduleDatas[index].portletActionMap['0'].action + 'userName=' + userName + '&challengeDate=' + baseInfo.appointmentTime;
                this.openPath = '';
            },
            addmore: function(index) {
                var addDate = null;
                if (baseInfo.appointmentTime) {
                    addDate = baseInfo.appointmentTime;
                } else {
                    addDate = Date.parse(new Date());
                }
                var templateData = this.moduleDatas[index];
                var data = {
                    userName: userName,
                    prototypeId: templateData.id,
                    timestamp: addDate,
                    pin: 0
                }
                this.addData(data);
            },
            getListData(date) {
                this.$http.post(this.listApi, {
                    userName: userName,
                    date: date,
                    type: 0
                }, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        this.moduleDatas = listData.values;
                    } else if (listData.errorcode == '000028') {
                        console.log('获取模版信息失败');
                    }
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {
                    console.log('出现异常');
                });
            },
            addData(data) {
                this.$http.post(this.addApi, data, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        console.log('这里应该是写添加成功之后向子代传递的东西');
                    }
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {
                    console.log('出现异常');
                });
            },
        }
    }
</script>

<style lang="scss">

    .add-template-contant {
        padding: 0 2.666%;
    }

    .add-template-contant li {
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
    }
</style>
