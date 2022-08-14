import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginVue.vue'
import Register from '../components/RegisterVue'
import Home from '../components/HomeVue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: './login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/home', component: Home }
  ]
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
