<!--提示层-->
<template>

<div id="modal-public"  v-show="shownotice" @click="hideNotice">
    <div class="notice " >{{notice}}</div>
</div>

</template>

<script>
import {data,hideNotice} from "../noticePublic"

 export default {
        data() {
            return {
               // notice:this.notice,
                //show:this.shownotice
            }
        },
                 props: ["notice","shownotice"],

        methods:{
           hideNotice:function(){
              var self = this
                hideNotice(self)
           }
        }
   }

</script>
<style>
  @import "../assets/sass/noticePublic.scss";

</style>
