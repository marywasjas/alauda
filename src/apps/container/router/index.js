/* Layout */
import Layout from '@/layout'

export const containerAsyncRoutes = [
  {
    path: '/oam',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/oam/index'),
        name: 'OAM',
        meta: { title: 'OAM应用', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/application',
    component: Layout,
    redirect: '/application/nativeAppList',
    alwaysShow: true, // will always show the root menu
    name: 'Application',
    meta: {
      title: '应用管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'nativeAppList',
        component: () => import('@/apps/container/views/application/nativeApp/index'),
        redirect: '/application/nativeAppList/list',
        name: 'ApplicationMain',
        meta: {
          title: '原生应用',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/application/nativeApp/nativeAppList'),
            name: 'nativeAppList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/application/nativeAppList' },
            hidden: true
          },
          {
            path: 'yamlCreate',
            component: () => import('@/apps/container/views/application/nativeApp/yamlCreate'),
            name: 'YamlCreate',
            meta: { title: 'YAML创建', icon: 'icon', noCache: true, activeMenu: '/application/nativeAppList' },
            hidden: true
          },
          {
            path: 'nativeDetail',
            component: () => import('@/apps/container/views/application/nativeApp/nativeDetail'),
            name: 'NativeDetail',
            meta: { title: '应用详情', icon: 'icon', noCache: true, activeMenu: '/application/nativeAppList' },
            hidden: true
          },
          {
            path: 'nativeUpdate',
            component: () => import('@/apps/container/views/application/nativeApp/nativeUpdate/nativeUpdate'),
            name: 'NativeUpdate',
            meta: { title: '更新应用（预览）', icon: 'icon', noCache: true, activeMenu: '/application/nativeAppList' },
            hidden: true
          },
          {
            path: 'updateComponent',
            component: () => import('@/apps/container/views/application/nativeApp/nativeUpdate/updateComponent'),
            name: 'UpdateComponent',
            meta: { title: '更新计算组件', icon: 'icon', noCache: true, activeMenu: '/application/nativeAppList' },
            hidden: true
          },
          {
            path: 'createNativeApp',
            component: () => import('@/apps/container/views/application/nativeApp/createNativeApp'),
            name: 'CreateNativeApp',
            meta: { title: '创建应用', icon: 'icon', noCache: true, activeMenu: '/application/nativeAppList' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
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
        meta: { title: '部署' },
        children: [
          {
            path: 'detail',
            component: () => import('@/apps/container/views/components-demo/deploy/detail/index.vue'),
            name: 'Detail',
            meta: { title: '部署详情', icon: 'icon', noCache: true, activeMenu: '' },
            hidden: true
          },
          {
            path: 'yamlCreat',
            component: () => import('@/apps/container/views/components-demo/deploy/yamlCreat.vue'),
            name: 'YamlCreat',
            meta: { title: 'YAML创建', icon: 'icon', noCache: true, activeMenu: '' },
            hidden: true
          },
          {
            path: 'deployUpdate',
            component: () => import('@/apps/container/views/components-demo/deploy/DeployUpdate.vue'),
            name: 'DeployUpdate',
            meta: { title: '更新', icon: 'icon', noCache: true, activeMenu: '' },
            hidden: true
          }
        ]
      },

      {
        path: 'daemons_set',
        component: () => import('@/apps/container/views/components-demo/daemon/index.vue'),
        name: 'DaemonsSet',
        meta: { title: '守护进程集' }
      },
      {
        path: 'stateful_set',
        component: () => import('@/apps/container/views/components-demo/statefulSet/statefulSet.vue'),
        name: 'statefulSet',
        meta: { title: '有状态副本集' }
      },
      {
        path: 'cron_job',
        component: () => import('@/apps/container/views/components-demo/timedTask/index.vue'),
        name: 'CronJob',
        meta: { title: '定时任务' }
      },
      {
        path: 'task',
        component: () => import('@/apps/container/views/components-demo/task/index.vue'),
        name: 'TaskMain',
        redirect: '/components/task/taskList',
        meta: { title: '任务' },
        children: [
          {
            path: 'taskList',
            component: () => import('@/apps/container/views/components-demo/task/taskList.vue'),
            name: 'TaskList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '' },
            hidden: true
          },
          {
            path: 'taskDetail',
            component: () => import('@/apps/container/views/components-demo/task/taskDetail.vue'),
            name: 'TaskDetail',
            meta: { title: '任务详情', icon: 'icon', noCache: true, activeMenu: '' },
            hidden: true
          }
        ]
      },
      {
        path: 'pod',
        component: () => import('@/apps/container/views/components-demo/containerGroup/index.vue'),
        name: 'Pod',
        meta: { title: '容器组' }
      }
    ]
  },
  {
    path: '/configure',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Configure',
    meta: {
      title: '配置',
      icon: 'chart'
    },
    children: [
      {
        path: 'configureDictionary',
        component: () => import('@/apps/container/views/configure/configureDictionary/index'),
        redirect: '/configure/configureDictionary/list',
        name: 'ConfigureDictionary',
        meta: { title: '配置字典', noCache: true },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/configure/configureDictionary/list'),
            name: 'ConfigureDictionaryList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/configure/configureDictionary' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/configure/configureDictionary/detail'),
            name: 'ConfigureDictionaryDetail',
            meta: { title: '配置字典详情', icon: 'icon', noCache: true, activeMenu: '/configure/configureDictionaryt' },
            hidden: true
          },
          {
            path: 'createUpdate',
            component: () => import('@/apps/container/views/configure/configureDictionary/createUpdate'),
            name: 'ConfigureDictionaryCreateUpdate',
            meta: { title: '创建/更新', icon: 'icon', noCache: true, activeMenu: '/configure/configureDictionary' },
            hidden: true
          }
        ]
      },
      {
        path: 'confidentialDictionary',
        component: () => import('@/apps/container/views/configure/confidentialDictionary/index'),
        redirect: '/configure/confidentialDictionary/list',
        name: 'ConfidentialDictionary',
        meta: { title: '保密字典', noCache: true },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/configure/confidentialDictionary/list'),
            name: 'ConfidentialDictionaryList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/configure/confidentialDictionary' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/configure/confidentialDictionary/detail'),
            name: 'ConfidentialDictionaryDetail',
            meta: { title: '保密字典详情', icon: 'icon', noCache: true, activeMenu: '/configure/confidentialDictionary' },
            hidden: true
          },
          {
            path: 'createUpdate',
            component: () => import('@/apps/container/views/configure/confidentialDictionary/createUpdate'),
            name: 'ConfidentialDictionaryCreateUpdate',
            meta: { title: '创建/更新', icon: 'icon', noCache: true, activeMenu: '/configure/confidentialDictionary' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/network',
    component: Layout,
    redirect: '/network/service',
    name: 'Network',
    meta: {
      title: '网络',
      icon: 'table'
    },
    alwaysShow: true, // will always show the root menu
    children: [
      {
        path: 'service',
        component: () => import('@/apps/container/views/network/service/index'),
        redirect: '/network/service/list',
        name: 'ServiceMain',
        meta: {
          title: '内部路由',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network/service/list'),
            name: 'ServiceList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/network/service' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/network/service/detail'),
            name: 'ServiceDetail',
            meta: { title: '内部路由详情', icon: 'icon', noCache: true, activeMenu: '/network/service' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/network/service/create'),
            name: 'ServiceCreate',
            meta: { title: '创建内部路由', icon: 'icon', noCache: true, activeMenu: '/network/service' },
            hidden: true
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/network/service/create'),
            name: 'ServiceUpdate',
            meta: { title: '更新内部路由', icon: 'icon', noCache: true, activeMenu: '/network/service' },
            hidden: true
          }
        ]
      },
      {
        path: 'ingress',
        component: () => import('@/apps/container/views/network/ingress/index'),
        redirect: '/network/ingress/list',
        name: 'IngressMain',
        meta: {
          title: '入站规则',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network/ingress/list'),
            name: 'IngressList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/network/ingress' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/network/ingress/detail'),
            name: 'IngressDetail',
            meta: { title: '入站规则详情', icon: 'icon', noCache: true, activeMenu: '/network/ingress' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/network/ingress/create'),
            name: 'IngressCreate',
            meta: { title: '创建入站规则', icon: 'icon', noCache: true, activeMenu: '/network/ingress' },
            hidden: true
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/network/ingress/create'),
            name: 'IngressUpdate',
            meta: { title: '更新入站规则', icon: 'icon', noCache: true, activeMenu: '/network/ingress' },
            hidden: true
          }
        ]
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
        redirect: '/network/policy/list',
        name: 'PolicyMain',
        meta: {
          title: '网络策略',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network/policy/list'),
            name: 'PolicyList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/network/policy/create'),
            name: 'PolicyCreate',
            meta: { title: '创建网络策略', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
            hidden: true
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/network/policy/create'),
            name: 'PolicyUpdate',
            meta: { title: '更新网络策略', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/network/policy/detail'),
            name: 'PolicyDetail',
            meta: { title: '网络策略详情', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
            hidden: true
          }
        ]
      },
      {
        path: 'load_balancer_list',
        component: () => import('@/apps/container/views/network/load-balancer/list'),
        name: 'LoadBalancerList',
        meta: { title: '负载均衡' }
      }
    ]
  },
  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/persistentVolume',
    name: 'Storage',
    alwaysShow: true,
    meta: {
      title: '存储',
      icon: 'nested'
    },
    children: [
      {
        path: 'persistentVolume',
        name: 'PersistentVolume',
        component: () => import('@/apps/container/views/storage/persistentVolume/index'),
        meta: { title: '持久卷声明（PVC）' }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/icons/index'),
        name: 'Icons',
        meta: { title: '监控面板', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/tab/index'),
        name: 'Tab',
        meta: { title: '日志', icon: 'tab' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: '告警',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/apps/container/views/example/create'),
        name: 'CreateArticle',
        meta: { title: '告警策略', icon: 'edit' }
      },
      {
        path: 'list',
        component: () => import('@/apps/container/views/example/list'),
        name: 'ArticleList',
        meta: { title: '告警历史', icon: 'list' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/apps/container/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/auxiliary-functions',
    component: Layout,
    redirect: '/auxiliary-functions/resource-management',
    name: 'AuxiliaryFunctions',
    alwaysShow: true,
    meta: {
      title: '辅助功能',
      icon: '404'
    },
    children: [
      {
        path: 'resource-management',
        component: () => import('@/apps/container/views/auxiliaryFunctions/resource-manage'),
        name: 'ResourceManagement',
        meta: { title: '资源管理' }
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/apps/container/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: '提权管理', icon: 'bug' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: '备份恢复', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/apps/container/views/zip/index'),
        name: 'ExportZip',
        meta: { title: '备份' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
