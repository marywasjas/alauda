/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: '/components/deploy',
  alwaysShow: true,
  name: 'Component',
  meta: {
    title: '计算机组件',
    icon: 'component'
  },
  children: [
    {
      path: 'deploy',
      component: () => import('@/apps/container/views/components-demo/deploy/index.vue'),
      name: 'Deploy',
      meta: { title: '部署' }
    },
    {
      path: 'deploy/detail',
      component: () => import('@/apps/container/views/components-demo/detail/index.vue'),
      name: 'Detail',
      meta: { title: '部署详情', icon: 'icon', noCache: true, activeMenu: '/detail/index' },
      hidden: true
    },

    {
      path: '/daemons_set',
      component: () => import('@/apps/container/views/components-demo/daemon/index.vue'),
      name: 'DaemonsSet',
      meta: { title: '守护进程集' }
    },
    {
      path: '/stateful_set',
      component: () => import('@/apps/container/views/components-demo/statefulSet/statefulSet.vue'),
      name: 'statefulSet',
      meta: { title: '有状态副本集' }
    },
    {
      path: '/cron_job',
      component: () => import('@/apps/container/views/components-demo/timedTask/index.vue'),
      name: 'CronJob',
      meta: { title: '定时任务' }
    },
    {
      path: '/job',
      component: () => import('@/apps/container/views/components-demo/task/index.vue'),
      name: 'Job',
      meta: { title: '任务' }
    },
    {
      path: '/pod',
      component: () => import('@/apps/container/views/components-demo/containerGroup/index.vue'),
      name: 'Pod',
      meta: { title: '容器组' }
    }
  ]
}

export default componentsRouter
