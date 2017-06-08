<template>
    <div id="card" v-touch:press.prevent="longpress(e)"
>
                   <h3>{{title}}</h3>
            <div>
                <img v-bind:src=imageUrl>
            </div>
            <p ><span v-bind:style="{ backgroundImage: 'url(' + url + ')' }" v-if="showdata" @click.stop="collection"></span></p>
            <span class="delete" v-bind:style="{display:deleted}" @click.stop="delete" v-if="showdata">×</span>
    </div>

</template>

<script>
  var url1 = require('../assets/images/star1.png');
  var url2 = require('../assets/images/star.png');
  import Toast from 'mint-ui/lib/Toast'
  import 'mint-ui/lib/Toast/style.css'

  export default {

    name: 'Card',

    data() {
      return {
        title: this.msgfather.portletPrototype.title,
        imageUrl: this.msgfather.portletPrototype.icon,
        url1: url1,
        url2: url2,
        list: this.msgfather.fixed,
        pin: this.msgfather.pin
      };
    },
    components: {
      Toast
    },
    props: ['msgfather', 'edit', 'showdata'],
    methods: {
      collection: function() {
        this.$emit('collection', 'this.iscollection');
      },
      delete: function() {
        this.$emit('delete-card', 'zhi');
      },
      longpress() {
        this.$emit('longpressdata', 'zhi');
        if (this.iscollection) {
          Toast('收藏状态下无法进行删除');
        } else {
          this.edit = !this.edit;
        }
      }
    },
    computed: {
      url: function() {
        if (this.list == '1') {
          return '0';
        } else {
          return this.iscollection ? this.url2 : this.url1;
        }
      },
      deleted: function() {
        if (this.iscollection) {
          return 'none';
        } else {
          return this.edit ? 'block' : 'none';

        }
      },
      iscollection: function() {
        if (this.pin == 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    ready: function() {}
  };
</script>

<style lang="scss" scoped>
  #card {
    position: relative;
    border-top: 1px solid #F9F9F9;
    border-right: 1px solid #F9F9F9;
    border-bottom: 1px solid #F9F9F9;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    h3 {
      text-align: left;
      font-size: 0.28rem;
      line-height: 0.8rem;
      height: 0.8rem;
      color: #545454;
      padding-left: 0.4rem;
    }
    .delete {
      position: absolute;
      font-size: 0.4rem;
      color: #B7B7B7;
      top: 0.25rem;
      right: 0.25rem;
    }
    img {
      pointer-events: none;
    }
  }

  #card div {
    vertical-align: middle;
    text-align: center;
  }

  .lattice-contant div img {
    vertical-align: middle;
    width: 0.84rem;
    height: 0.84rem;
  }

  .lattice-contant p {
    height: 0.75rem;
    text-align: right;
    padding-right: 0.46rem;
    span {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-repeat: no-repeat;
      background-size: contain;
      margin-top: 0.3rem;
    }
  }
</style>
