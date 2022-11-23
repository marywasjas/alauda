/* Layout */
import Layout from '@/layout'

export const devOpsAsyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '集群管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/apps/devOps/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '原生应用',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/apps/devOps/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '模板应用'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/devOps/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '网络管理', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/devOps/views/icons/index'),
        name: 'Icons',
        meta: { title: '流水线管理', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/apps/devOps/views/tab/index'),
        name: 'Tab',
        meta: { title: '产品管理', icon: 'tab' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: '租户管理',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/apps/devOps/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/apps/devOps/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/apps/devOps/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '平台证书管理',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/apps/devOps/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/apps/devOps/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/apps/devOps/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: '用户角色管理', icon: 'bug' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: '运营统计', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/apps/devOps/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Zip' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
