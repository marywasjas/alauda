import menu from './en/menu'
import workLoads from './en/workLoads'
export default {
  ...workLoads,
  ...menu,
  language: {
    text: '中文简体',
    appearance: 'Theme',
    my_profile: 'Profile',
    logout: 'Log Out',
    help_doc: 'Docs',
    about_platform: 'About Platform',
    platform_health_check: 'Platform Health Status',
    search_by_name_placeholder: 'Search by name'
  }
}
