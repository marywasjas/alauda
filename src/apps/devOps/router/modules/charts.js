/** When your routing table is too long, you can split it into small modules**/

// import Layout from '@/layout'

// const chartsRouter = {
//   path: '/charts',
//   component: Layout,
//   redirect: 'noRedirect',
//   name: 'Charts',
//   meta: {
//     title: '存储管理',
//     icon: 'chart'
//   },
//   children: [
//     {
//       path: 'keyboard',
//       // component: () => import('@/apps/container/views/charts/keyboard'),
//       component: () => import('@/apps/container/views/configure/keyboard.vue'),
//       name: 'KeyboardChart',
//       meta: { title: 'Keyboard Chart', noCache: true }
//     },
//     {
//       path: 'line',
//       // component: () => import('@/apps/container/views/charts/line'),
//       component: () => import('@/apps/container/views/configure/line'),
//       name: 'LineChart',
//       meta: { title: 'Line Chart', noCache: true }
//     },
//     {
//       path: 'mix-chart',
//       component: () => import('@/apps/container/views/configure/mix-chart'),
//       name: 'MixChart',
//       meta: { title: 'Mix Chart', noCache: true }
//     }
//   ]
// }

// export default chartsRouter
