import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'component',
    label: '组件'
  },
  {
    id: 'status',
    label: '状态'
  },
  {
    id: 'version',
    label: '版本',
    width:"250px"
  },

]
export const tableData = Mock.mock({
  'data|10': [{
    component: '@word(7, 20)',
    'status|1': ['pending', 'stop', 'running'],
    'statusText|1': ['运行中(3/4)', '已暂停(1/1)', 'Pending(1/1)'],
    version: '@cword(3, 7)',

  }]
})
