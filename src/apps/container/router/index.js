/* Layout */
import Layout from '@/layout'

// 没有侧边栏
import NoSliderLayout from '@/layout/noSlider/index'

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
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/components/' },
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


  // 平台管理--集群管理 
  {
    path: '/cluster-management',
    component: Layout,
    redirect: '/cluster-management/backup-manage/backuplist',
    name: 'Cluster',
    meta: { title: '集群管理', icon: 'table' },
    children: [
      // 集群
      {
        path: 'cluster',
        component: () => import('@/apps/container/views/cluster/cluster/index'),
        redirect: '/cluster-management/cluster/list',
        name: 'ClusterMain',
        meta: { title: '集群', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/cluster/cluster/list'),
            name: 'ClusterList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/cluster/cluster' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/cluster/cluster/create'),
            name: 'ClusterCreate',
            meta: { title: '创建集群', icon: 'icon', noCache: true, activeMenu: '/cluster/cluster' },
            hidden: true
          },
          {
            path: 'accessCluster',
            component: () => import('@/apps/container/views/cluster/cluster/accessCluster'),
            name: 'accessCluster',
            meta: { title: '接入集群', icon: 'icon', noCache: true, activeMenu: '/cluster/cluster' },
            hidden: true
          },

          {
            path: 'detail',
            component: () => import('@/apps/container/views/cluster/cluster/detail'),
            name: 'ClusterDetail',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/cluster/cluster' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },

          {
            path: 'nodeDetail',
            component: () => import('@/apps/container/views/cluster/cluster/components/NodeDetail/nodeDetail'),
            name: 'ClusterNodeDetail',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/cluster/cluster' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          }
        ]
      },
      // 自定义资源
      {
        path: 'crd',
        component: () => import('@/apps/container/views/cluster/crd/index'),
        redirect: '/cluster-management/crd/list',
        name: 'ClusterCrd',
        meta: {
          title: '自定义资源定义',
          roles: ['admin']
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/cluster/crd/list'),
            name: 'ClusterCrdList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/cluster/crd' },
            hidden: true
          },
          {
            path: 'detailCrd',
            component: () => import('@/apps/container/views/cluster/crd/detail'),
            name: 'ClusterCrdDetail',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/cluster/crd' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/cluster/crd/create'),
            name: 'CrdCreate',
            meta: { title: '创建实例 / 更新实例' },
            hidden: true
          },
          {
            path: 'detailInstance',
            component: () => import('@/apps/container/views/cluster/crd/detailInstance'),
            name: 'CrdUpdate',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
      // 资源管理
      {
        path: 'resource',
        component: () => import('@/apps/container/views/cluster/resource/index'),
        redirect: '/cluster-management/resource/list',
        name: 'ResourceMain',
        meta: {
          title: '资源管理',
          roles: ['admin']
        },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/cluster/resource/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/cluster/resource' },
            hidden: true
          },
        ]
      },
      // 备份恢复
      {
        path: 'backup-manage',
        component: () => import('@/apps/container/views/cluster/backup/index'),
        redirect: '/cluster-management/backup-manage/backuplist',
        name: 'BackupManage',
        meta: { title: '备份恢复' },
        alwaysShow: true, // will always show the root menu
        children: [
          {
            path: 'backuplist',
            component: () => import('@/apps/container/views/cluster/backup/backupList/backupList.vue'),
            name: 'Backup-manageList',
            meta: { title: '备份管理' },
          },
          {
            path: 'etcd',
            component: () => import('@/apps/container/views/cluster/backup/backupList/etcd.vue'),
            name: 'Backup-manageList',
            meta: { title: '创建/更新 ETCD 备份' },
            hidden: true,
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/cluster/backup/backupList/detail.vue'),
            name: 'Backup-manageList',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'restorelist',
            component: () => import('@/apps/container/views/cluster/backup/restoreList/restoreList.vue'),
            name: 'Restore-manageList',
            meta: { title: '恢复管理', },
          },
        ]
      },
    ]
  },

  // 平台管理--网络管理
  {
    path: '/network-management',
    component: Layout,
    redirect: '/network-management/domain/list',
    name: 'Network-Management',
    meta: { title: '网络管理', icon: 'international' },
    children: [
      // 域名
      {
        path: 'domain',
        component: () => import('@/apps/container/views/network-management/domain/index'),
        redirect: '/network-management/domain/list',
        name: 'DomainMain',
        meta: { title: '域名', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/domain/list.vue'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/network-management/domain/detail.vue'),
            name: 'UserCreate',
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
            hidden: true
          },
        ]
      },
      // 证书
      {
        path: 'certificate',
        component: () => import('@/apps/container/views/network-management/certificate/index'),
        redirect: '/network-management/certificate/list',
        name: 'CertificateMain',
        meta: { title: '证书', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/certificate/list'),
            name: 'RoleList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // 子网
      {
        path: 'subnet',
        component: () => import('@/apps/container/views/network-management/subnet/index'),
        redirect: '/network-management/subnet/list',
        name: 'SubnetMain',
        meta: { title: '子网', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/subnet/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/network-management/subnet/detail'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
      // 桥接网络
      {
        path: 'bridge-network',
        component: () => import('@/apps/container/views/network-management/bridge-network/index'),
        redirect: '/network-management/bridge-network/list',
        name: 'BridgeNetworkMain',
        meta: { title: '桥接网络', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/bridge-network/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // VLAN
      {
        path: 'vlan',
        component: () => import('@/apps/container/views/network-management/vlan/index'),
        redirect: '/network-management/vlan/list',
        name: 'VLANMain',
        meta: { title: 'VLAN', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/vlan/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // 负载均衡器
      {
        path: 'load-balancer',
        component: () => import('@/apps/container/views/network-management/load-balancer/index'),
        redirect: '/network-management/load-balancer/list',
        name: 'LoadBalancerMain',
        meta: { title: '负载均衡器', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/load-balancer/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/network-management/load-balancer/create'),
            name: 'ResourceList',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true,
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/network-management/load-balancer/detail'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
      // 集群网络策略
      {
        path: 'cnp',
        component: () => import('@/apps/container/views/network-management/cnp/index'),
        redirect: '/network-management/cnp/list',
        name: 'CNPMain',
        meta: { title: '集群网络策略', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/cnp/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/network-management/cnp/create'),
            name: 'ResourceList',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // 网络监测
      {
        path: 'trace',
        component: () => import('@/apps/container/views/network-management/trace/index'),
        redirect: '/network-management/trace/list',
        name: 'TraceMain',
        meta: { title: '网络检测', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/network-management/trace/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
    ]
  },

  // 平台管理--存储管理
  {
    path: '/storage-management',
    component: Layout,
    redirect: '/storage-management/storageclass/list',
    name: 'Storage-Management',
    meta: { title: '存储管理', icon: 'list' },
    children: [
      // 存储类
      {
        path: 'storageclass',
        component: () => import('@/apps/container/views/storage-management/storageclass/index'),
        redirect: '/storage-management/storageclass/list',
        name: 'StorageclassMain',
        meta: { title: '存储类', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/storage-management/storageclass/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'createYaml',
            component: () => import('@/apps/container/views/storage-management/storageclass/createYaml.vue'),
            name: 'UserCreate',
            meta: { title: 'YAML 创建', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'createStorageClass',
            component: () => import('@/apps/container/views/storage-management/storageclass/createStorageClass.vue'),
            name: 'UserCreate',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/storage-management/storageclass/update.vue'),
            name: 'UserCreate',
            meta: { title: '更新', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/storage-management/storageclass/detail.vue'),
            name: 'UserCreate',
            meta: { title: '' },
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
            hidden: true
          },
        ]
      },
      // 持久卷
      {
        path: 'pv',
        component: () => import('@/apps/container/views/storage-management/pv/index'),
        redirect: '/storage-management/pv/list',
        name: 'PVMain',
        meta: { title: '持久卷(PV)', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/storage-management/pv/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/storage-management/pv/detail'),
            name: 'UserCreate',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/storage-management/pv/update'),
            name: 'UserCreate',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/storage-management/pv/create'),
            name: 'UserCreate',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // 卷快照
      {
        path: 'volume-snapshot',
        component: () => import('@/apps/container/views/storage-management/volume-snapshot/index'),
        redirect: '/storage-management/volume-snapshot/list',
        name: 'VolumeSnapshotMain',
        meta: { title: '卷快照', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/storage-management/volume-snapshot/list'),
            name: 'VolumeSnapshotList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // 分布式存储
      {
        path: 'distributed-storage',
        component: () => import('@/apps/container/views/storage-management/distributed-storage/index'),
        redirect: '/storage-management/distributed-storage/list',
        name: 'DistributedStorageMain',
        meta: { title: '分布式存储', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/storage-management/distributed-storage/list'),
            name: 'VolumeSnapshotList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'storageCluster',
            component: () => import('@/apps/container/views/storage-management/distributed-storage/storageCluster'),
            name: 'VolumeSnapshotList',
            meta: { title: '创建存储集群', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'storageServer',
            component: () => import('@/apps/container/views/storage-management/distributed-storage/storageServer'),
            name: 'VolumeSnapshotList',
            meta: { title: '接入存储服务', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // 本地存储
      {
        path: 'local-storage',
        component: () => import('@/apps/container/views/storage-management/local-storage/index'),
        redirect: '/storage-management/local-storage/list',
        name: 'LocalStorageMain',
        meta: { title: '本地存储', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/storage-management/local-storage/list'),
            name: 'VolumeSnapshotList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'config',
            component: () => import('@/apps/container/views/storage-management/local-storage/config'),
            name: 'VolumeSnapshotList',
            meta: { title: '配置本地存储', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
    ]
  },

  // 平台管理--运维中心
  {
    path: '/maintenance-center',
    component: Layout,
    redirect: '/maintenanceCenter/monitor-platfrom/blackbox-monitoring',
    name: 'MaintenanceCenter',
    meta: { title: '运维中心', icon: 'example' },
    children: [
      // 监控
      {
        path: 'monitor-platfrom',
        component: () => import('@/apps/container/views/maintenance-center/monitor/index'),
        redirect: '/maintenanceCenter/monitor-platfrom/blackbox-monitoring',
        name: 'MonitorMain',
        meta: { title: '监控' },
        alwaysShow: true,
        children: [
          {
            path: 'blackbox-monitoring',
            component: () => import('@/apps/container/views/maintenance-center/monitor/blackbox/list'),
            name: 'BlackBox',
            meta: { title: '黑盒监控' },
          },
          {
            path: 'dashboard',
            component: () => import('@/apps/container/views/maintenance-center/monitor/dashboard/list'),
            name: 'BlackBox',
            meta: { title: '控制面板' },
          },
        ]
      },
      // 日志
      {
        path: 'log',
        component: () => import('@/apps/container/views/maintenance-center/log/index'),
        redirect: '/maintenanceCenter/monitor-platfrom/blackbox-monitoring',
        name: 'LogMain',
        meta: { title: '日志' },
        alwaysShow: true,
        children: [
          {
            path: 'log-query',
            component: () => import('@/apps/container/views/maintenance-center/log/logquery'),
            name: 'BlackBox',
            meta: { title: '日志查询分析' },
          },
          {
            path: 'log-strategy',
            component: () => import('@/apps/container/views/maintenance-center/log/logstrategy'),
            name: 'BlackBox',
            meta: { title: '策略管理' },
          },
          {
            path: 'log-export',
            component: () => import('@/apps/container/views/maintenance-center/log/logexport'),
            name: 'BlackBox',
            meta: { title: '导出记录' },
          },
        ]
      },
      // 事件
      {
        path: 'event',
        component: () => import('@/apps/container/views/maintenance-center/event/index'),
        redirect: '/maintenance-center/event/list',
        name: 'EventMain',
        meta: { title: '事件' },
        // alwaysShow: true,
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/maintenance-center/event/list'),
            name: 'BlackBox',
            meta: { title: '' },
            hidden: true
          },
        ]
      },
      // 告警
      {
        path: 'alarm',
        component: () => import('@/apps/container/views/maintenance-center/alarm/index'),
        redirect: '/maintenanceCenter/monitor-platfrom/alarm',
        name: 'MPAlarmMain',
        meta: { title: '告警' },
        alwaysShow: true,
        children: [
          {
            path: 'alarmRealtime',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmRealtime/list'),
            name: 'AlarmRealtime',
            meta: { title: '实时告警' },
          },
          {
            path: 'alarmStrategy',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmStrategy/list'),
            name: 'AlarmRealtime',
            meta: { title: '告警策略' },
          },
          {
            path: 'alarmStrategy-create',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmStrategy/create'),
            name: 'AlarmRealtime',
            meta: { title: '创建/更新 告警策略' },
            hidden: true
          },
          {
            path: 'alarmStrategy-detail',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmStrategy/detail'),
            name: 'AlarmRealtime',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'alarmTemplate',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmTemplate/list'),
            name: 'AlarmRealtime',
            meta: { title: '告警模板' },
          },
          {
            path: 'alarmTemplate-create',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmTemplate/create'),
            name: 'AlarmRealtime',
            meta: { title: '创建/更新 告警模板' },
            hidden: true
          },
          {
            path: 'alarmTemplate-detail',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmTemplate/detail'),
            name: 'AlarmRealtime',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'alarmHistory',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmHistory/list'),
            name: 'AlarmRealtime',
            meta: { title: '告警历史' },
          },
          {
            path: 'alarmSetting',
            component: () => import('@/apps/container/views/maintenance-center/alarm/alarmSetting/list'),
            name: 'AlarmRealtime',
            meta: { title: '告警设置' },
          },
        ]
      },
      // 通知
      {
        path: 'notification',
        component: () => import('@/apps/container/views/maintenance-center/notification/index'),
        redirect: '/maintenanceCenter/monitor-platfrom/alarm',
        name: 'NotificationMain',
        meta: { title: '通知' },
        alwaysShow: true,
        children: [
          {
            path: 'notification-Strategy',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationStrategy/list'),
            name: 'AlarmRealtime',
            meta: { title: '通知策略' },
          },
          {
            path: 'create-notification-Strategy',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationStrategy/create'),
            name: 'AlarmRealtime',
            meta: { title: '创建通知策略' },
            hidden: true
          },
          {
            path: 'notification-Template',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationTemplate/list'),
            name: 'AlarmRealtime',
            meta: { title: '通知模板' },
          },
          {
            path: 'create-notification-Template',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationTemplate/create'),
            name: 'AlarmRealtime',
            meta: { title: '创建通知模板' },
            hidden: true
          },
          {
            path: 'detail-notification-Template',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationTemplate/detail'),
            name: 'AlarmRealtime',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'notification-Receiver',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationReceiver/list'),
            name: 'AlarmRealtime',
            meta: { title: '通知对象' },
          },
          {
            path: 'notification-Sender',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationSender/list'),
            name: 'AlarmRealtime',
            meta: { title: '通知发送人' },
          },
          {
            path: 'notification-Server',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationServer/list'),
            name: 'AlarmRealtime',
            meta: { title: '通知服务器' },
          },
          {
            path: 'create-notification-Server',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationServer/create'),
            name: 'AlarmRealtime',
            meta: { title: '创建通知服务器' },
            hidden: true
          },
          {
            path: 'detail-notification-Server',
            component: () => import('@/apps/container/views/maintenance-center/notification/notificationServer/detail'),
            name: 'AlarmRealtime',
            meta: { title: '' },
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
            hidden: true
          },
          {
            path: 'message-manage',
            component: () => import('@/apps/container/views/maintenance-center/notification/messageManage/list'),
            name: 'AlarmRealtime',
            meta: { title: '消息管理' },
          },
        ]
      },
      // 巡检
      {
        path: 'inspection',
        component: () => import('@/apps/container/views/maintenance-center/inspection/index'),
        redirect: '/maintenanceCenter/inspection/list',
        name: 'InspectionMain',
        meta: { title: '巡检' },
        alwaysShow: true,
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/maintenance-center/inspection/list'),
            name: 'BlackBox',
            meta: { title: '基础巡检' },
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/maintenance-center/inspection/detail'),
            name: 'BlackBox',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
    ]
  },

  // 平台管理--应用商店管理
  {
    path: '/catalog-management',
    component: Layout,
    redirect: '/catalog-management/chartrepo/list',
    name: 'Catalog-Management',
    meta: { title: '应用商店管理', icon: 'list' },
    children: [
      // 模板仓库
      {
        path: 'chartrepo',
        component: () => import('@/apps/container/views/catalog-management/chartrepo/index'),
        redirect: '/catalog-management/chartrepo/list',
        name: 'ChartrepoMain',
        meta: { title: '模板仓库', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/catalog-management/chartrepo/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/catalog-management/chartrepo/detail'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'deploy',
            component: () => import('@/apps/container/views/catalog-management/chartrepo/deploy'),
            name: 'UserList',
            meta: { title: '部署', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
      // Operators
      {
        path: 'operator',
        component: () => import('@/apps/container/views/catalog-management/operator/index'),
        redirect: '/catalog-management/operator/list',
        name: 'OperatorMain',
        meta: { title: 'Operators', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/catalog-management/operator/list'),
            meta: { title: '', },
            hidden: true
          },
          {
            path: 'detail-operatorHub',
            component: () => import('@/apps/container/views/catalog-management/operator/components/OperatorHub/detail'),
            meta: { title: '', },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'detail-operatorDeploy',
            component: () => import('@/apps/container/views/catalog-management/operator/components/Operators/detail'),
            meta: { title: '', },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'createInstance',
            component: () => import('@/apps/container/views/catalog-management/operator/components/Operators/components/BaseInfo/createInstance'),
            meta: { title: '', },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'detailInstance',
            component: () => import('@/apps/container/views/catalog-management/operator/components/Operators/components/BaseInfo/detailInstance'),
            meta: { title: '', },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
    ]
  },

  // 平台管理--工具链管理


  // 平台管理--流水线管理


  // 平台管理--服务网格
  {
    path: '/service-management',
    component: Layout,
    redirect: '/service-management/service-mesh/list',
    name: 'Service-Management',
    meta: { title: '服务网格', icon: 'table' },
    children: [
      // 网格列表
      {
        path: 'service-mesh',
        component: () => import('@/apps/container/views/service-management/service-mesh/index'),
        redirect: '/service-management/service-mesh/list',
        name: 'ServiceMeshMain',
        meta: { title: '网格网络', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/service-management/service-mesh/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/service-management/service-mesh/create'),
            name: 'UserList',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/service-management/service-mesh/detail'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: 'createGateway',
            component: () => import('@/apps/container/views/service-management/service-mesh/components/GatewayList/create'),
            name: 'UserList',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true
          },
          {
            path: 'detailGateway',
            component: () => import('@/apps/container/views/service-management/service-mesh/components/GatewayList/detail'),
            name: 'UserList',
            meta: { title: '创建', icon: 'icon', noCache: true, },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
    ]
  },


  // 平台管理--运营统计
  {
    path: '/meter',
    component: Layout,
    redirect: '/meter/summary/list',
    name: 'Meter',
    meta: { title: '运营统计', icon: 'excel' },
    children: [
      // 运营统计
      {
        path: 'summary',
        component: () => import('@/apps/container/views/meter/summary/index'),
        redirect: '/meter/summary/list',
        name: 'SummaryMain',
        meta: { title: '运营概览', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/meter/summary/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },

      // 统计报表
      {
        path: 'report',
        component: () => import('@/apps/container/views/meter/report/index'),
        redirect: '/meter/report/list',
        name: 'ReportMain',
        meta: { title: '统计报表', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/meter/report/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },

      // 计量明细
      {
        path: 'detail',
        component: () => import('@/apps/container/views/meter/detail/index'),
        redirect: '/meter/detail/list',
        name: 'DetailMain',
        meta: { title: '计量明细', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/meter/detail/list'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },

      // 导出记录
      {
        path: 'export',
        component: () => import('@/apps/container/views/meter/export/index'),
        redirect: '/meter/export/list',
        name: 'ExportMain',
        meta: { title: '导出记录', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/meter/export/list'),
            name: 'VolumeSnapshotList',
            meta: { title: '', icon: 'icon', noCache: true, },
            hidden: true
          },
        ]
      },
    ]
  },

  // 平台管理--审计
  {
    path: '/audit',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/audit/index'),
        name: 'AuditMain',
        meta: { title: '审计', icon: 'form' }
      }
    ],
  },

  // 平台管理--平台证书管理
  {
    path: '/platformCert-management',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/platformCert/index'),
        name: 'PlatformCert',
        meta: { title: '平台证书管理', icon: 'tab' }
      }
    ],
  },

  // 平台管理--用户角色管理
  {
    path: '/user-role-management',
    component: Layout,
    redirect: '/user-role-management/user',
    name: 'User-Role',
    meta: { title: '用户角色管理', icon: 'peoples' },
    children: [
      // 用户管理
      {
        path: 'user',
        component: () => import('@/apps/container/views/user-role/user/index'),
        redirect: '/user-role-management/user/list',
        name: 'UserMain',
        meta: { title: '用户管理', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/user-role/user/list.vue'),
            name: 'UserList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/user-role/user' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/user-role/user/create.vue'),
            name: 'UserCreate',
            meta: { title: '创建用户', icon: 'icon', noCache: true, activeMenu: '/user-role/user' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/user-role/user/detail.vue'),
            name: 'UserDetail',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/user-role/user' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
      // 角色管理
      {
        path: 'role',
        component: () => import('@/apps/container/views/user-role/role/index'),
        redirect: '/user-role-management/role/list',
        name: 'RoleMain',
        meta: { title: '角色管理', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/user-role/role/list.vue'),
            name: 'RoleList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/user-role/role' },
            hidden: true
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/user-role/role/create.vue'),
            name: 'RoleCreate',
            meta: { title: '创建角色', icon: 'icon', noCache: true, activeMenu: '/user-role/role' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/user-role/role/detail.vue'),
            name: 'RoleDetail',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/user-role/role' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
          {
            path: "createCopy",
            component: () => import('@/apps/container/views/user-role/role/createCopy.vue'),
            name: 'RoleCreateCopy',
            meta: { title: '复制为新角色', icon: 'icon', noCache: true, activeMenu: '/user-role/role' },
            hidden: true
          }

        ]
      },
      // IDP 配置
      {
        path: 'idp',
        component: () => import('@/apps/container/views/user-role/idp/index'),
        redirect: '/user-role-management/idp/list',
        name: 'IDPMain',
        meta: { title: 'IDP 配置', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/user-role/idp/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/user-role/idp' },
            hidden: true
          },
          {
            path: 'ldap',
            component: () => import('@/apps/container/views/user-role/idp/ldap'),
            name: 'createLDAP',
            meta: { title: '添加 LDAP', icon: 'icon', noCache: true, activeMenu: '/user-role/idp' },
            hidden: true
          },
          {
            path: 'oidc',
            component: () => import('@/apps/container/views/user-role/idp/oidc'),
            name: 'createOIDC',
            meta: { title: '添加 OIDC', icon: 'icon', noCache: true, activeMenu: '/user-role/idp' },
            hidden: true
          },
        ]
      },
      // 用户安全策略
      {
        path: 'security-policy',
        component: () => import('@/apps/container/views/user-role/security-policy/index'),
        redirect: '/user-role-management/security-policy/list',
        name: 'SecurityPolicyMain',
        meta: { title: '用户安全策略', roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/user-role/security-policy/list'),
            name: 'ResourceList',
            meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/user-role/security-policy' },
            hidden: true
          },
          {
            path: 'update',
            component: () => import('@/apps/container/views/user-role/security-policy/update'),
            name: 'createLDAP',
            meta: { title: '更新', icon: 'icon', noCache: true, activeMenu: '/user-role/security-policy' },
            hidden: true
          },
        ]
      },
    ]
  },

  // 项目管理
  {
    path: '/project-management',
    component: NoSliderLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/container/views/project-management/project/index'),
        name: 'ProjectMain',
        meta: { title: '项目管理', icon: "tab" },
      },
      {
        path: 'create',
        component: () => import('@/apps/container/views//project-management/project/create.vue'),
        name: 'ProjectCreate',
        meta: { title: '', icon: 'icon', noCache: true, activeMenu: '/project/project' },
        hidden: true
      },
    ]
  },

  // 项目列表
  {
    path: '/project-list',
    component: Layout,
    redirect: '/project-list/overview',
    name: 'User-Role',
    meta: { title: '项目列表', icon: 'list' },
    children: [
      // 项目概览
      {
        path: 'overview',
        component: () => import('@/apps/container/views/project-list/overview/index'),
        // meta: { title: '项目概览', },
        redirect: "/project-list/overview/index",
        children: [
          {
            path: 'index',
            component: () => import('@/apps/container/views/project-list/overview/index'),
            name: 'UserList',
            meta: { title: '项目概览', },
          },
        ],
      },
      // 项目详情
      {
        path: 'detail',
        component: () => import('@/apps/container/views/project-list/detail/index'),
        redirect: "/project-list/detail/projectDetail",
        name: "ProjectDetail",
        children: [
          {
            path: '/project-list/detail/projectDetail',
            component: () => import('@/apps/container/views/project-list/detail/detail'),
            name: 'RoleList',
            meta: { title: '项目详情' },
          },
          {
            path: "/project-list/detail/updateQuota",
            component: () => import('@/apps/container/views/project-list/detail/updateQuota'),
            name: 'UpdateQuota',
            meta: { title: '更新配额' },
            hidden: true
          },
        ],


      },
      // 项目成员
      {
        path: 'member',
        component: () => import('@/apps/container/views/project-list/member/member'),
        redirect: "/project-list/overview/member/index",
        children: [
          {
            path: 'index',
            component: () => import('@/apps/container/views/project-list/member/member'),
            name: 'RoleList',
            meta: { title: '项目成员' },
          },
        ]
      },
      // 命名空间
      {
        path: 'namespace',
        component: () => import('@/apps/container/views/project-list/namespace/index'),
        redirect: "/project-list//namespace/list",
        name: 'Namespace',
        meta: { title: '命名空间', },
        alwaysShow: true, // will always show the root menu
        children: [
          {
            path: 'list',
            component: () => import('@/apps/container/views/project-list/namespace/list'),
            name: 'NamespaceList',
            meta: { title: '命名空间' },
          },
          {
            path: 'create',
            component: () => import('@/apps/container/views/project-list/namespace/create'),
            name: 'NamespaceList',
            meta: { title: '创建' },
            hidden: true
          },
          {
            path: 'import',
            component: () => import('@/apps/container/views/project-list/namespace/import'),
            name: 'NamespaceList',
            meta: { title: '导入' },
            hidden: true
          },
          {
            path: 'detail',
            component: () => import('@/apps/container/views/project-list/namespace/detail'),
            name: 'NamespaceList',
            meta: { title: '' },
            hidden: true,
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
          },
        ]
      },
      // 工具链管理
      {
        path: 'toolchain',
        component: () => import('@/apps/container/views/project-list/toolchain/index'),
        redirect: "/project-list/toolchain/integrationList",
        name: 'ToolChain',
        meta: { title: '工具链管理' },
        alwaysShow: true, // will always show the root menu
        children: [
          {
            path: 'integrationList',
            component: () => import('@/apps/container/views/project-list/toolchain/IntegrationList'),
            name: 'IntegrationList',
            meta: { title: '工具链集成' },
          },
          {
            path: 'integrate',
            component: () => import('@/apps/container/views/project-list/toolchain/integrate'),
            meta: { title: '集成工具选择' },
            hidden: true
          },
          {
            path: 'integrateDetail',
            component: () => import('@/apps/container/views/project-list/toolchain/integrateDetail'),
            meta: { title: '集成' },
            // beforeEnter: (to, from, next) => {
            //   if (to.query.name) to.meta.title = to.query.name;
            //   next();
            // },
            hidden: true
          },
          {
            path: 'integrationDetail',
            component: () => import('@/apps/container/views/project-list/toolchain/integrationDetail'),
            meta: { title: '' },
            beforeEnter: (to, from, next) => {
              if (to.query.name) to.meta.title = to.query.name;
              next();
            },
            hidden: true
          },
          {
            path: 'secretList',
            component: () => import('@/apps/container/views/project-list/toolchain/secretList'),
            name: 'SecretList',
            meta: { title: '凭据' },
          },
          {
            path: 'createSecret',
            component: () => import('@/apps/container/views/project-list/toolchain/secretCreate'),
            name: 'SecretList',
            meta: { title: '创建' },
            hidden: true
          },
        ]
      },
      // 流水线管理
      {
        path: 'pipeline',
        component: () => import('@/apps/container/views/project-list/pipeline/index'),
        redirect: "/project-list/pipeline/custom",
        name: 'PipeLine',
        meta: { title: '流水线管理' },
        alwaysShow: true,
        children: [
          {
            path: 'custom',
            component: () => import('@/apps/container/views/project-list/pipeline/custom'),
            name: 'IntegrationList',
            meta: { title: '项目自定义模板' },
          },
        ]
      },
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]
