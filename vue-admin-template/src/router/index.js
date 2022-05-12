import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

import modules from './modules'

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect/index')
            }
        ]
    },
    {path: '/404',component: () => import('@/views/error/404'),hidden: true},
    {path: '*', component: () => import('@/views/error/404'), hidden: true},
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
          {
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: '首页', icon: 'dashboard', affix: true }
          }
        ]
    }
]

export const asyncRoutes = [...modules]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 退出登录时重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 解决重复点击菜单路由跳转报错的问题
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
