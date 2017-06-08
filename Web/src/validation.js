import Vue from 'vue'
import Validator from 'vue-validator'
Vue.use(Validator)
// 手机号验证器
Vue.validator('tel', function (val) {
  return /^[0-9]{11}$/.test(val);
});
// 密码验证器
Vue.validator('passw', function (val) {
  return /^(\w){6,20}$/.test(val);
});