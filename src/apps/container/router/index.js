/* Layout */
import Layout from '@/layout'

export const containerAsyncRoutes = [
  // {
  //   path: '/oam',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/apps/container/views/oam/index'),
  //       name: 'OAM',
  //       meta: { title: 'OAM应用', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/application',
    component: Layout,
    redirect: '/application/nativeAppList',
    alwaysShow: true, // will always show the root menu
    name: 'Application',
    meta: {
      title: 'nav_applications_manage',
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
          title: 'native_app',
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
      // {
      //   path: 'templateAppList',
      //   component: () => import('@/apps/container/views/application/templateApp/index'),
      //   redirect: '/application/templateAppList/list',
      //   name: 'templateMain',
      //   meta: {
      //     title: '模板应用',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   },
      //   children: [
      //     {
      //       path: 'list',
      //       component: () => import('@/apps/container/views/application/templateApp/templateAppList'),
      //       name: 'templateApp',
      //       meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/application/templateAppList' },
      //       hidden: true
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/deploy',
    alwaysShow: true,
    name: 'Component',
    meta: {
      title: 'workload',
      icon: 'component'
    },
    children: [
      {
        path: 'deploy',
        component: () => import('@/apps/container/views/components-demo/deploy/index.vue'),
        name: 'DeployMain',
        redirect: '/components/deploy/List',
        meta: { title: 'deployment' },
        children: [
          {
            path: 'List',
            component: () => import('@/apps/container/views/components-demo/deploy/deployList.vue'),
            name: 'DeployList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/deploy' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/components-demo/deploy/detail/index.vue'),
            name: 'DeployDetail',
            meta: { title: '部署详情', icon: 'icon', noCache: true, activeMenu: '/components/deploy' },
            hidden: true
          },
          {
            path: 'yamlCreat',
            component: () => import('@/apps/container/views/components-demo/deploy/yamlCreat.vue'),
            name: 'YamlCreat',
            meta: { title: 'YAML创建', icon: 'icon', noCache: true, activeMenu: '/components/deploy' },
            hidden: true
          },
          {
            path: 'deployUpdate',
            component: () => import('@/apps/container/views/components-demo/deploy/DeployUpdate.vue'),
            name: 'DeployUpdate',
            meta: { title: '更新', icon: 'icon', noCache: true, activeMenu: '/components/deploy' },
            hidden: true
          },
          {
            path: 'createDeploy',
            component: () => import('@/apps/container/views/components-demo/deploy/CreateDeploy.vue'),
            name: 'CreateDeploy',
            meta: { title: '创建', icon: 'icon', noCache: true, activeMenu: '/components/deploy' },
            hidden: true
          }
        ]
      },
      {
        path: 'daemons_set',
        component: () => import('@/apps/container/views/components-demo/daemon/index.vue'),
        name: 'DaemonMain',
        redirect: '/components/daemons_set/List',
        meta: { title: 'daemon_set' },
        children: [
          {
            path: 'List',
            component: () => import('@/apps/container/views/components-demo/daemon/deamonList.vue'),
            name: 'DeamonList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/daemons_set' },
            hidden: true
          },
          {
            path: 'Detail',
            component: () => import('@/apps/container/views/components-demo/daemon/deamonDetail.vue'),
            name: 'DeamonDetail',
            meta: { title: '守护进程集详情', icon: 'icon', noCache: true, activeMenu: '/components/daemons_set' },
            hidden: true
          },
          {
            path: 'yamlCreat',
            component: () => import('@/apps/container/views/components-demo/daemon/YamlCreate.vue'),
            name: 'DeamonYamlCreat',
            meta: { title: 'YAML创建', icon: 'icon', noCache: true, activeMenu: '/components/daemons_set' },
            hidden: true
          },
          {
            path: 'deamonUpdate',
            component: () => import('@/apps/container/views/components-demo/daemon/deamonUpdate.vue'),
            name: 'DeamonUpdate',
            meta: { title: '更新', icon: 'icon', noCache: true, activeMenu: '/components/daemons_set' },
            hidden: true
          },
          {
            path: 'createDeamon',
            component: () => import('@/apps/container/views/components-demo/daemon/createDeamon.vue'),
            name: 'CreateDeamon',
            meta: { title: '创建', icon: 'icon', noCache: true, activeMenu: '/components/daemons_set' },
            hidden: true
          }
        ]
      },
      {
        path: 'stateful_set',
        component: () => import('@/apps/container/views/components-demo/statefulSet/index.vue'),
        name: 'statefulSet',
        redirect: '/components/stateful_set/List',
        meta: { title: 'stateful_set' },
        children: [
          {
            path: 'List',
            component: () => import('@/apps/container/views/components-demo/statefulSet/statefulSetList.vue'),
            name: 'StatefulSetList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/stateful_set' },
            hidden: true
          },
          {
            path: 'Detail',
            component: () => import('@/apps/container/views/components-demo/statefulSet/statefulSetDetail.vue'),
            name: 'StatefulSetDetail',
            meta: { title: '有状态副本集详情', icon: 'icon', noCache: true, activeMenu: '/components/stateful_set' },
            hidden: true
          },
          {
            path: 'yamlCreat',
            component: () => import('@/apps/container/views/components-demo/statefulSet/YamlCreate.vue'),
            name: 'StatefulYamlCreat',
            meta: { title: 'YAML创建', icon: 'icon', noCache: true, activeMenu: '/components/stateful_set' },
            hidden: true
          },
          {
            path: 'statefulSetUpdate',
            component: () => import('@/apps/container/views/components-demo/statefulSet/statefulSetUpdate.vue'),
            name: 'StatefulSetUpdate',
            meta: { title: '更新', icon: 'icon', noCache: true, activeMenu: '/components/stateful_set' },
            hidden: true
          },
          {
            path: 'createStatefulSet',
            component: () => import('@/apps/container/views/components-demo/statefulSet/createStatefulSet.vue'),
            name: 'CreateStatefulSet',
            meta: { title: '创建', icon: 'icon', noCache: true, activeMenu: '/components/stateful_set' },
            hidden: true
          }
        ]
      },
      {
        path: 'cron_job',
        component: () => import('@/apps/container/views/components-demo/timedTask/index.vue'),
        name: 'CronJob',
        redirect: '/components/cron_job/List',
        meta: { title: 'cron_job' },
        children: [
          {
            path: 'List',
            component: () => import('@/apps/container/views/components-demo/timedTask/timedTaskList.vue'),
            name: 'TimedTaskList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/cron_job' },
            hidden: true
          },
          {
            path: 'Detail',
            component: () => import('@/apps/container/views/components-demo/timedTask/timedTaskDetail.vue'),
            name: 'TimedTasktDetail',
            meta: { title: '定时任务详情', icon: 'icon', noCache: true, activeMenu: '/components/cron_job' },
            hidden: true
          },
          {
            path: 'yamlCreat',
            component: () => import('@/apps/container/views/components-demo/timedTask/YamlCreate.vue'),
            name: 'TimedTaskYamlCreat',
            meta: { title: 'YAML创建', icon: 'icon', noCache: true, activeMenu: '/components/cron_job' },
            hidden: true
          },
          {
            path: 'timedUpdate',
            component: () => import('@/apps/container/views/components-demo/timedTask/timedUpdate.vue'),
            name: 'TimedUpdate',
            meta: { title: '更新', icon: 'icon', noCache: true, activeMenu: '/components/cron_job' },
            hidden: true
          },
          {
            path: 'createTimedJob',
            component: () => import('@/apps/container/views/components-demo/timedTask/createTimedJob.vue'),
            name: 'CreateTimedJob',
            meta: { title: '创建', icon: 'icon', noCache: true, activeMenu: '/components/cron_job' },
            hidden: true
          }
        ]
      },
      {
        path: 'task',
        component: () => import('@/apps/container/views/components-demo/task/index.vue'),
        name: 'TaskMain',
        redirect: '/components/task/taskList',
        meta: { title: 'job' },
        children: [
          {
            path: 'taskList',
            component: () => import('@/apps/container/views/components-demo/task/taskList.vue'),
            name: 'TaskList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/task' },
            hidden: true
          },
          {
            path: 'taskDetail',
            component: () => import('@/apps/container/views/components-demo/task/taskDetail.vue'),
            name: 'TaskDetail',
            meta: { title: '任务详情', icon: 'icon', noCache: true, activeMenu: '/components/task' },
            hidden: true
          }
        ]
      },
      {
        path: 'pod',
        component: () => import('@/apps/container/views/components-demo/containerGroup/index.vue'),
        name: 'Pod',
        redirect: '/components/pod/containerGroupList',
        meta: { title: 'pod' },
        children: [
          {
            path: 'containerGroupList',
            component: () => import('@/apps/container/views/components-demo/containerGroup/containerGroupList.vue'),
            name: 'ContainerGroupList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/pod' },
            hidden: true
          },
          {
            path: 'containerGroupDetail',
            component: () => import('@/apps/container/views/components-demo/containerGroup/containerDetail.vue'),
            name: 'ContainerGroupDetail',
            meta: { title: '容器组详情', icon: 'icon', noCache: true, activeMenu: '/components/pod' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/configure',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Configure',
    meta: {
      title: 'config',
      icon: 'chart'
    },
    children: [
      {
        path: 'configureDictionary',
        component: () => import('@/apps/container/views/configure/configureDictionary/index'),
        redirect: '/configure/configureDictionary/list',
        name: 'ConfigureDictionary',
        meta: { title: 'configmap', noCache: true },
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
            meta: { title: '配置字典详情', icon: 'icon', noCache: true, activeMenu: '/configure/configureDictionary' },
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
        meta: { title: 'secret', noCache: true },
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
            meta: {
              title: '保密字典详情',
              icon: 'icon',
              noCache: true,
              activeMenu: '/configure/confidentialDictionary'
            },
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
      title: 'network',
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
          title: 'service',
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
          title: 'ingress',
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
      }
      // {
      //   path: 'load_balancer',
      //   component: () => import('@/apps/container/views/network/load-balancer/index'),
      //   name: 'LoadBalancer',
      //   meta: { title: '负载均衡器' }
      // },
      // {
      //   path: 'policy',
      //   component: () => import('@/apps/container/views/network/policy/index'),
      //   redirect: '/network/policy/list',
      //   name: 'PolicyMain',
      //   meta: {
      //     title: '网络策略',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   },
      //   children: [
      //     {
      //       path: 'list',
      //       component: () => import('@/apps/container/views/network/policy/list'),
      //       name: 'PolicyList',
      //       meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
      //       hidden: true
      //     },
      //     {
      //       path: 'create',
      //       component: () => import('@/apps/container/views/network/policy/create'),
      //       name: 'PolicyCreate',
      //       meta: { title: '创建网络策略', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
      //       hidden: true
      //     },
      //     {
      //       path: 'update',
      //       component: () => import('@/apps/container/views/network/policy/create'),
      //       name: 'PolicyUpdate',
      //       meta: { title: '更新网络策略', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
      //       hidden: true
      //     },
      //     {
      //       path: 'detail',
      //       component: () => import('@/apps/container/views/network/policy/detail'),
      //       name: 'PolicyDetail',
      //       meta: { title: '网络策略详情', icon: 'icon', noCache: true, activeMenu: '/network/policy' },
      //       hidden: true
      //     }
      //   ]
      // }
      // {
      //   path: 'load_balancer_list',
      //   component: () => import('@/apps/container/views/network/load-balancer/list'),
      //   name: 'LoadBalancerList',
      //   meta: { title: '负载均衡' }
      // }
    ]
  },
  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/persistentVolume',
    name: 'Storage',
    alwaysShow: true,
    meta: {
      title: 'nav_storage',
      icon: 'nested'
    },
    children: [
      {
        path: 'persistentVolume',
        component: () => import('@/apps/container/views/storage/persistentVolume/index'),
        redirect: '/storage/persistentVolume/list',
        name: 'PersistentVolumeMain',
        meta: {
          title: 'nav_pvc',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/storage/persistentVolume/list'),
            name: 'nativeAppList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/storage/persistentVolume' },
            hidden: true
          },
          {
            path: 'createUpdate',
            component: () => import('@/apps/container/views/storage/persistentVolume/createUpdate'),
            name: 'PersistentVolumeCreateUpdate',
            meta: { title: '创建/更新', icon: 'icon', noCache: true, activeMenu: '/storage/persistentVolume' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/storage/persistentVolume/detail'),
            name: 'PersistentVolumeDetail',
            meta: { title: '持久卷声明详情', icon: 'icon', noCache: true, activeMenu: '/storage/persistentVolume' },
            hidden: true
          }
        ]
      }
    ]
  },
  // {
  //   path: '/dataService',
  //   component: Layout,
  //   redirect: '/dataService/mysql',
  //   name: 'DataService',
  //   alwaysShow: true,
  //   meta: {
  //     title: '数据服务',
  //     icon: 'el-icon-coin'
  //   },
  //   children: [
  //     {
  //       path: 'mysql',
  //       component: () => import('@/apps/container/views/dataService/mysql/index'),
  //       name: 'DataServiceMysql',
  //       meta: {
  //         title: 'MySQL-PXC',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'redis',
  //       component: () => import('@/apps/container/views/dataService/redis/index'),
  //       name: 'DataServiceRedis',
  //       meta: {
  //         title: 'Redis',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'kafka',
  //       component: () => import('@/apps/container/views/dataService/kafka/index'),
  //       name: 'DataServiceKafka',
  //       meta: {
  //         title: 'Kafka',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'rabbitMQ',
  //       component: () => import('@/apps/container/views/dataService/rabbitMQ/index'),
  //       name: 'DataServiceRabbitMQ',
  //       meta: {
  //         title: 'RabbitMQ',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     }
  //   ]
  // },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/icons/index'),
        name: 'Icons',
        meta: { title: 'dashboard', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/log/index'),
        name: 'Tab',
        meta: { title: 'log', icon: 'tab' }
      }
    ]
  },
  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/index',
    name: 'Alarm',
    meta: {
      title: 'warning',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'policy',
        component: () => import('@/apps/container/views/alarm/policy/index'),
        redirect: '/alarm/policy/list',
        name: 'AlarmMain',
        meta: {
          title: 'alarm_strategy',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/alarm/policy/list'),
            name: 'AlarmList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/alarm/policy' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/alarm/policy/create'),
            name: 'AlarmCreate',
            meta: { title: '创建/更新告警策略', icon: 'icon', noCache: true, activeMenu: '/alarm/policy' },
            hidden: true
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/alarm/policy/create'),
            name: 'AlarmUpdate',
            meta: { title: '更新告警策略', icon: 'icon', noCache: true, activeMenu: '/alarm/policy' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/alarm/policy/detail'),
            name: 'AlarmDetail',
            meta: { title: '告警策略详情', icon: 'icon', noCache: true, activeMenu: '/alarm/policy' },
            hidden: true
          }
        ]
      }
      // {
      //   path: 'history',
      //   component: () => import('@/apps/container/views/alarm/history/list'),
      //   name: 'AlarmHistory',
      //   meta: { title: '告警历史' }
      // }
    ]
  },
  {
    path: '/auxiliary-functions',
    component: Layout,
    redirect: '/auxiliary-functions/resource-management',
    name: 'AuxiliaryFunctions',
    alwaysShow: true,
    meta: {
      title: 'auxiliary_function',
      icon: '404'
    },
    children: [
      {
        path: 'resource-management',
        component: () => import('@/apps/container/views/auxiliaryFunctions/resource-manage'),
        name: 'ResourceManagement',
        meta: { title: 'resource_management' }
      }
    ]
  },
  {
    path: '/raising-rights',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/rights-management/index.vue'),
        name: 'ErrorLog',
        meta: { title: 'right_management', icon: 'bug' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    children: [
      {
        path: 'download',
        component: () => import('@/apps/container/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'back_up', icon: 'zip', affix: true }
      }
    ]
  },
  {
    path: '/yamlConversion',
    component: Layout,
    children: [
      {
        path: 'conversion',
        component: () => import('@/apps/container/views/yaml/index.vue'),
        name: 'ExportZip',
        meta: { title: 'conversion_yaml', icon: 'zip', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
