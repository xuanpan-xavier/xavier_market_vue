import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = ''
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
