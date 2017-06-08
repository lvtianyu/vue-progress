<template>
<div  id="refresh"  v-show="show">
    <div>
      <span></span>
        <div>数据加载中...</div>
    </div>
</div>
</template>
<script>


 export default {
        data() {
            return {
                //isShow:this.isShow,
            }
        },
         props: ["show"]

   }

</script>
<style>
 .modal-public{
      position: absolute;
      z-index: 999;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(153,153,153,0.3);
      text-align: center;
    }
    /*等待刷新层*/
   #refresh{
      position: absolute;
      z-index: 9999;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #000;
      opacity: 0.3;
      margin-top:0
    }
    #refresh>div{
      margin: 0 auto;
      margin-top: 50%;
      width: 2rem;
      text-align: center;

    }
    #refresh>div>div{
      font-size: 12px;
      margin-top: 15px;
      color: #fff;
    }
    #refresh>div>span{
      width: .8rem;
      height:.8rem;
          background:url('../assets/images/refresh-btn.min.png');
                              background-repeat: no-repeat;
                                        background-size: cover;
      display:inline-block;

      -webkit-animation:rotate 1s infinite linear;
      animation:rotate 1s infinite linear;
    }
    @-moz-keyframes rotate{
      0%{
        -ms-transform:rotate(0deg);
      }
      100%{
        -ms-transform:rotate(360deg);
      }
    }
    @-webkit-keyframes rotate{
      0%{
        -webkit-transform:rotate(0deg);
      }
      100%{
        -webkit-transform:rotate(360deg);
      }
    }
    @keyframes rotate{
      0%{
        transform:rotate(0deg);
      }
      100%{
        transform:rotate(360deg);
      }
    }


</style>
