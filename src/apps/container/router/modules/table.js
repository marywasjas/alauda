/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '网络',
    icon: 'table'
  },
  children: [
    {
      path: 'service',
      component: () => import('@/apps/container/views/network/service/index'),
      name: 'Service',
      meta: { title: '内部路由' }
    },
    {
      path: 'service/detail/:id',
      component: () => import('@/apps/container/views/network/service/detail'),
      name: 'ServiceDetail',
      meta: { title: '内部路由详情' },
      hidden: true
    },
    {
      path: 'dynamic-table',
      component: () => import('@/apps/container/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/apps/container/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/apps/container/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/apps/container/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    }
  ]
}
export default tableRouter
