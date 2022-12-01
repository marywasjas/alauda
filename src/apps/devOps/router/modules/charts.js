/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '存储管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      // component: () => import('@/apps/devOps/views/charts/keyboard'),
      component: () => import('@/apps/devOps/views/configure/configureDictionary/index.vue'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'line',
      // component: () => import('@/apps/devOps/views/charts/line'),
      component: () => import('@/apps/devOps/views/configure/line'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/apps/devOps/views/configure/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    }
  ]
}

export default chartsRouter
