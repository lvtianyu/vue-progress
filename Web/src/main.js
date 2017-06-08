import Vue from 'vue'
import routerConfig from './router'
import VueRouter from 'vue-router'
import App from './App'
import Vueresource from 'vue-resource'
import validator from './validation'
import {
  viewWidth,
  locationSelf,
  nodeurl,
  locationSelfSearch,
  html
} from "./wx"
import Indicator from 'mint-ui/lib/Indicator';
import 'mint-ui/lib/Indicator/style.css';
import VueTouch from 'vue-touch'
html.style.fontSize = viewWidth;
Vue.use(VueRouter);
Vue.use(Vueresource);
Vue.use(VueTouch);

// 拦截器
Vue.http.interceptors.push((request, next) => {
  Indicator.open();
  next((response) => {
    Indicator.close();
    if (!response.data.errorcode) {
      var indexRe = eval("(" + response.data + ")");
      if (indexRe.errorcode == '000000') {

      }
    }
    return response
  })
})


const router = new VueRouter({
  history: false,
  initialTransition: 'show',
  transition: ['left', 'right'],
  saveScrollPostion: true,
  hashbang: true,
  suppressTransitionError: true
});


routerConfig(router);
router.start(App, 'app');
window.router = router;
