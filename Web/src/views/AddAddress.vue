<template>
<div id="address">
    <!-- <div class="title">收货地址完善</div> -->
    <div class="information-content">
      <ul>
        <li class="clear">
          <div class="fl">
              收货人:<input placeholder="请输入收货人姓名" class="inputName" v-model="name" @click="unselectAddress">
          </div>
        </li>
        <li class="clear">
          <div class="fl">
              手机号码:<input placeholder="请输入有效手机号" v-model="mobile" @click="unselectAddress">
          </div>
        </li>
    <li class="clear">
          <div class="fl">
              所在地区:<input placeholder="请选择所在区域" v-model="place" @click="selectAddress">
          </div>
        </li>
        <li class="clear">
          <div class="fl">
              详细地址:<input placeholder="请输入详细地址" v-model="detailplace" @click="unselectAddress">
          </div>
        </li>
                <li class="clear">
          <div class="fl">
              邮政编码:<input placeholder="请输入邮政编码" v-model="mailId" @click="unselectAddress">
          </div>
        </li>
      </ul>
      <div class="out-login-box">
      <div class="out-login" @click="commit">
          确定
      </div>
      </div>
    </div>
   <picker :slots="slots" @change="onValuesChange" class="addressPicker" v-show="isShow" :visible-item-count="5" :show-toolbar="false"></picker>
    </div>
</template>

<script>
import Toast from 'mint-ui/lib/Toast'
    var addressData = require('../assets/address.json');
    import {
        viewWidth,
        locationSelf,
        nodeurl,
        locationSelfSearch,
        html,
        userName
    } from "../wx"
    import Picker from 'mint-ui/lib/picker'
    import 'mint-ui/lib/picker/style.css'
    export default {
        data() {
            return {
                infoApi: nodeurl + 'livercloud/v1/userInfo/addAddress.do',
                infoData: '',
                name: '',
                place: '',
                mobile:'',
                detailplace: '',
                mailId: '',
                adressApi: nodeurl + 'livercloud/v1/platform/getProviceCityDistrict.do',
                ownaddressApi:nodeurl + 'livercloud/v1/userInfo/getAddress.do',
                province: [],
                p:'',
                c:'',
                a:'',
                city: [],
                cityData: [],
                area: [],
                areaData: [],
                showToolbar: true,
                isShow: false
            }
        },
        components:{
                Picker
        },
        computed: {
            slots: function() {
                return [{
                    flex: 1,
                    values: this.province,
                    className: 'slot1',
                    textAlign: 'center',
                    Number: 3
                }, {
                    flex: 1,
                    values: this.cityData,
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    flex: 1,
                    values: this.areaData,
                    className: 'slot3',
                    textAlign: 'center'
                }, ]
            }
        },
        ready: function() {
            var data = {
                userName: userName
            }
            this.getownData(data);
            this.getAddressData()
        },
        methods: {
            getownData(data){
                this.$http.post(this.ownaddressApi, data, {
                    emulateJSON: true
                }).then((response) => {
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        this.name = listData.values.consignee;
                        this.mobile = listData.values.mobile;
                        this.place =  listData.values.province +   listData.values.city +   listData.values.county;
                        this.detailplace = listData.values.particularAddress;
                        this.mailId = listData.values.postcode;
                    }else {
                        Toast(listData.errormsg);
                    }
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {
                    console.log('出现异常');
                });
            },
            selectAddress() {
                this.isShow = true;
            },
            unselectAddress(){
                this.isShow = false;
            },
            getInfoData: function(data) {
                this.$http.post(this.infoApi, data, {
                    emulateJSON: true
                }).then((response) => {
                    console.log(response.data);
                    var listData = eval("(" + response.data + ")");
                    if (listData.errorcode == '000000') {
                        Toast('添加收货地址成功');
                        this.isShow = false;
                    }else {
                        Toast(listData.errormsg);
                    }
                }, (response) => {
                    console.log(response);
                }).catch(function(response) {
                    console.log('出现异常');
                });
            },
            getAddressData: function() {
                for (var i = 0; i < addressData.length; i++) {
                    this.province.push(addressData[i].name);
                    var pCity = [];
                    var pArea = [];
                    for (var j = 0; j < addressData[i].city.length; j++) {
                        pCity.push(addressData[i].city[j].name);
                    }
                    this.city.push(pCity);
                    this.cityData = this.city[2];
                    this.areaData = addressData[2].city[2].area;
                }
            },
            onValuesChange(picker, values) {
                var p = '',
                    c = '',
                    a = '';
                var cityIndex = this.province.indexOf(picker.getSlotValue(0));
                var areaIndex;
                if (cityIndex >= 0) {
                    picker.setSlotValues(1, this.city[cityIndex]);
                    areaIndex = this.city[cityIndex].indexOf(picker.getSlotValue(1));
                    p = picker.getSlotValue(0);
                } else {
                    picker.setSlotValues(1, this.city[2]);
                    cityIndex = 2;
                    areaIndex = this.city[2].indexOf(picker.getSlotValue(1));
                    p = '河北省';
                }
                console.log(areaIndex);
                if (areaIndex >= 0) {
                    picker.setSlotValues(2, addressData[cityIndex].city[areaIndex].area);
                    c = picker.getSlotValue(1);
                } else {
                    c = '秦皇岛市';
                }
                this.p = p;
                this.c = c;
                this.a = picker.getSlotValue(2);
                this.place = p + c + picker.getSlotValue(2);
            },
            commit: function() {
                var data = {
                    userName: userName,
                    name: this.name,
                    mobile: this.mobile,
                    phone: '1',
                    detailAddress: this.detailplace,
                    province: this.p,
                    city: this.c,
                    county: this.a,
                    postcode: this.mailId,
                    type: '1',
                    awardId: '1'
                }
                this.getInfoData(data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    #address {
        position: relative;
        .addressPicker {}
    }

    img {
        vertical-align: top;
    }

    .title {
        height: 1rem;
        font-size: 0.34rem;
        color: #212121;
        padding-top: 0.3rem;
        text-align: center;
        border-bottom: 1px solid #EAEAEA;
    }

    .information-content {
        ul {
            padding: 0 5.33%;
            font-size: 0.28rem;
            color: #212121;
        }
    }

    .portrait-box {
        padding-top: 0.1rem;
    }

    .information-content ul li {
        line-height: 1rem;
        border-bottom: 1px solid #EAEAEA;
    }

    .information-content ul li div:nth-child(1) {
        padding-left: 1%;
    }


    .information-content li .phone-edit {
        height: 0.46rem;
        width: 0.26rem;
        background: url(../assets/images/user_arrow.png) no-repeat;
        background-size: contain;
        vertical-align: middle;
        float: right;
        margin-top: 0.27rem;
    }

    .out-login-box {
        text-align: center;
        margin-top: 1.14rem;
        margin-bottom: 1rem;
    }

    .information-content .out-login {
        display: inline-block;
        width: 84%;
        height: 0.8rem;
        text-align: center;
        background-color: #31E2CB;
        color: #fff;
        line-height: 0.8rem;
        font-size: 0.3rem;
        border-radius: 8px;
    }

    .inputName {
        padding-left: 0.58rem;
    }

    input {
        height: 1rem;
        padding-left: 0.3rem;
        font-size: 0.28rem;
        line-height: 1rem;
        background-color: transparent;
        border: none;
    }
</style>
