import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import ElementUI from 'element-ui'
import BMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios;

Vue.use(BMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'fCKUDGSeUmPT2T1SRbODzIuiU8ZEqG4W'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
