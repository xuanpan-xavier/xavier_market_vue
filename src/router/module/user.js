const userRouters = [
  { path: '/', redirect: './login' },
  { path: '/login', component: () => import('@/components/LoginVue.vue') },
  { path: '/register', component: () => import('@/components/RegisterVue') },
  {
    path: '/UserHome',
    component: () => import('@/components/UserHome/UserHomeVue'),
    redirect: '/UserHome/welcome',
    children: [
      { path: '/UserHome/welcome', component: () => import('@/components/WelcomeVue') },
      { path: '/UserHome/SetUser', component: () => import('@/components/UserHome/SetUser') },
      { path: '/UserHome/SetVIP', component: () => import('@/components/UserHome/SetVIP') },
      { path: '/UserHome/OrderInfo', component: () => import('@/components/UserHome/OrderInfo') },
      { path: '/UserHome/Shopping', component: () => import('@/components/UserHome/ShoppingVue') },
      { path: '/UserHome/VIPData', component: () => import('@/components/UserHome/VIPData') }
    ]
  }
]
export default userRouters
