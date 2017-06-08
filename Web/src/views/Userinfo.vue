<template>
  <div>
    <!-- <div class="title">个人信息</div> -->
    <div class="information-content">
      <ul>
        <li class="clear">
          <div class="fl">
            头像
          </div>
          <div class=" portrait-box fr">
            <div class="portrait">
              <img v-bind:src=headPortraitUrl>
            </div>
          </div>
        </li>
        <li class="clear">
          <div class="fl">
            名字
          </div>
          <div class="fr">
            {{nickName}}
          </div>
        </li>
        <li class="clear">
          <div class="fl">
            手机号
          </div>
          <div class="fr">
            {{mobile}}
          </div>
        </li>
        <li class="clear">
          <div class="fl">
            收货地址：
          </div>
          <span class="phone-edit" v-link="{path:'./addAddress'}"></span>
          <div class="fr">
            {{useraddress}}
          </div>
        </li>
      </ul>
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
    } from "../wx"

    export default {
        data() {
                return {
                    nickName:localStorage.getItem('nickName'),
                    headPortraitUrl:localStorage.getItem('iconUrl'),
                    mobile:localStorage.getItem('mobile'),
                    useraddress:localStorage.getItem('userAddress')
                }
            },
            ready: function() {
            },
            methods: {
            }
    }
</script>
<style lang="scss" scoped>
  img {
    vertical-align: top;
  }
  
  .title {
    height: 0.64rem;
    font-size: 0.34rem;
    color: #212121;
    padding-top: 0.3rem;
    text-align: center;
    border-bottom: 1px solid #EAEAEA;
    padding-bottom: 0.8rem;
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
  
  .information-content .portrait {
    box-sizing: border-box;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
  }
  
  .information-content .portrait img {
    margin-top: 0.08rem;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
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
  }
  
  .information-content .out-login {
    display: inline-block;
    width: 84%;
    height: 0.8rem;
    text-align: center;
    background-color: #F12F5C;
    color: #fff;
    line-height: 0.8rem;
    font-size: 0.3rem;
    border-radius: 8px;
  }

</style>
