import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font_3600607_16c0rhhtqer/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import { Base64 } from 'js-base64'
import echarts from 'echarts'
axios.defaults.baseURL = 'http://localhost:1016'
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(Base64)
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default {

}
