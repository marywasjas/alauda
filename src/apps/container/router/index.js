/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components-demo'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
        component: () => import('@/apps/container/views/application/nativeApp/nativeAppList'),
        name: 'NativeAppList',
        meta: {
          title: '原生应用',
          roles: ['admin'] // or you can only set roles in sub nav
        }
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
      }
      // {
      //   path: 'directive',
      //   component: () => import('@/apps/container/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: '模板应用'
      //     // if do not set roles, means: this page does not require permission
      //   }
      // }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
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
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/apps/container/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/apps/container/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
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
        meta: { title: 'Zip' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // {
  //   path: '/401',
  //   component: () => import('@/apps/container/views/error-page/401'),
  //   name: 'Page401',
  //   meta: { title: '401', noCache: true }
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/apps/container/views/error-page/404'),
  //   name: 'Page404',
  //   meta: { title: '404', noCache: true }
  // },
  { path: '*', redirect: '/404', hidden: true }
]
