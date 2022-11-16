/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/network',
  component: Layout,
  redirect: '/network/service',
  name: 'Network',
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
      path: 'service/create',
      component: () => import('@/apps/container/views/network/service/create'),
      name: 'ServiceCreate',
      meta: { title: '创建内部路由', icon: 'icon', noCache: true, activeMenu: '/table/service' },
      hidden: true
    },
    {
      path: 'service/detail',
      component: () => import('@/apps/container/views/network/service/detail'),
      name: 'ServiceDetail',
      meta: { title: '内部路由详情', icon: 'icon', noCache: true, activeMenu: '/table/service' },
      hidden: true
    },
    {
      path: 'ingress',
      component: () => import('@/apps/container/views/network/ingress/index'),
      name: 'Ingress',
      meta: { title: '入站规则' }
    },
    {
      path: 'ingress/detail',
      component: () => import('@/apps/container/views/network/ingress/detail'),
      name: 'IngressDetail',
      meta: { title: '入站规则详情', icon: 'icon', noCache: true, activeMenu: '/table/ingress' },
      hidden: true
    },
    {
      path: 'load_balancer',
      component: () => import('@/apps/container/views/network/load-balancer/index'),
      name: 'LoadBalancer',
      meta: { title: '负载均衡器' }
    },
    {
      path: 'policy',
      component: () => import('@/apps/container/views/network/policy/index'),
      name: 'Policy',
      meta: { title: '网络策略' }
    },
    {
      path: 'load_balancer_list',
      component: () => import('@/apps/container/views/network/load-balancer/list'),
      name: 'LoadBalancerList',
      meta: { title: '负载均衡' }
    }
    // {
    //   path: 'dynamic-table',
    //   component: () => import('@/apps/container/views/table/dynamic-table/index'),
    //   name: 'DynamicTable',
    //   meta: { title: 'Dynamic Table' }
    // },
    // {
    //   path: 'drag-table',
    //   component: () => import('@/apps/container/views/table/drag-table'),
    //   name: 'DragTable',
    //   meta: { title: 'Drag Table' }
    // },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/apps/container/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'Inline Edit' }
    // },
    // {
    //   path: 'complex-table',
    //   component: () => import('@/apps/container/views/table/complex-table'),
    //   name: 'ComplexTable',
    //   meta: { title: 'Complex Table' }
    // }
  ]
}
export default tableRouter
