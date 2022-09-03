const managerRouters = [
  {
    path: '/ManagementHome',
    component: () => import('@/components/ManagementVue/ManagementHomeVue'),
    redirect: '/ManagementHome/welcome',
    children: [
      { path: '/ManagementHome/welcome', component: () => import('@/components/WelcomeVue') },
      { path: '/ManagementHome/UserList', component: () => import('@/components/ManagementVue/UserList') },
      { path: '/ManagementHome/OrderList', component: () => import('@/components/ManagementVue/OrderList') },
      { path: '/ManagementHome/SetGoods', component: () => import('@/components/ManagementVue/SetGoods') },
      { path: '/ManagementHome/UserData', component: () => import('@/components/ManagementVue/UserData') }
    ]
  }
]
export default managerRouters
