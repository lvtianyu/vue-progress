/**
 * Created by lvtianyu on 16/9/6.
 */
import VueResource from 'vue-resource'
import Vue from 'vue'
Vue.use(VueResource);

function xhr(url,data){
  return Vue.http.get(url,{
    params:data
  })
}

/*
{
  method:'get',
    url:url,
  data:data,
  headers: {"X-Requested-With": "XMLHttpRequest"},
  emulateJSON: true
}
*/


export default xhr
