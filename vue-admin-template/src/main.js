import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css
import App from './App.vue'
import store from './store';
import router from './router';
import moment from 'moment';
import apis from './apis';

import './icons'
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(moment)
Vue.prototype.$moment = moment
Vue.use(apis)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false


console.log(`当前为: ${process.env.NODE_ENV=="development"?'开发':'生产'}环境 , Api的请求主机地址为: ${process.env.VUE_APP_BASEURL}`)
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
