import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/components/Login.vue') },
  {
    path: '/home',
    component: () => import('@/components/Home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('@/components/Welcome') },
      { path: '/users', component: () => import('@/components/user/User') }
    ] }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next()放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
