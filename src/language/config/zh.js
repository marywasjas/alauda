import menu from './zh/menu'
import workLoads from './zh/workLoads'
export default {
  ...workLoads,
  ...menu,
  language: {
    text: 'English',
    my_profile: '个人信息',
    appearance: '外观',
    logout: '退出登录',
    help_doc: '帮助文档',
    about_platform: '关于平台',
    platform_health_check: '平台健康状态',
    search_by_name_placeholder: '按名称搜索'
  }
}
