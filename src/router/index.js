import Vue from 'vue'
import Router from 'vue-router'
import { containerAsyncRoutes } from '@/apps/container/router/index'
import { devOpsAsyncRoutes } from '@/apps/devOps/router/index'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import NoSliderLayout from '@/layout/noSlider/index'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/personal',
    component: NoSliderLayout,
    redirect: '/personal/information',
    hidden: true,
    children: [
      {
        path: 'information',
        component: () => import('@/views/personal-information/index'),
        name: 'PersonalInformation',
        meta: { title: '个人信息' }
      }
    ]
  },
  {
    path: '/platform',
    component: NoSliderLayout,
    redirect: '/platform/healthStatus',
    hidden: true,
    children: [
      {
        path: 'healthStatus',
        component: () => import('@/views/health-status/index'),
        name: 'PlatformHealthStatus',
        meta: { title: '平台健康状态' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/apps/container/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '概览', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [...containerAsyncRoutes]
console.log(devOpsAsyncRoutes)
const createRouter = () => new Router({
  mode: 'hash', // require service support  history hash
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
