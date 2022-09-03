import Vue from 'vue'
import VueRouter from 'vue-router'
import userRouters from '@/router/module/user'
import managerRouters from '@/router/module/manager'
import store from '@/store'
// import Login from '../components/LoginVue.vue'
// import Register from '../components/RegisterVue'
//
// import ManagementHome from '../components/ManagementVue/ManagementHomeVue'
// import Welcome from '../components/WelcomeVue'
// import UserList from '../components/ManagementVue/UserList'
// import OrderList from '@/components/ManagementVue/OrderList'
// import SetGoods from '@/components/ManagementVue/SetGoods'
// import UserData from '@/components/ManagementVue/UserData'

// import UserHome from '@/components/UserHome/UserHomeVue'
// import SetUser from '@/components/UserHome/SetUser'
// import SetVIP from '@/components/UserHome/SetVIP'
// import OrderInfo from '@/components/UserHome/OrderInfo'
// import Shopping from '@/components/UserHome/ShoppingVue'
// import VIPData from '@/components/UserHome/VIPData'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    ...userRouters,
    ...managerRouters
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  if (to.path === '/ManagementHomeVue/welcome') return next()
  // 获取token
  const tokenStr = store.state.userModule.token
  if (!tokenStr) return next('/login')
  next()
})
export default router
