import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'status',
    label: '状态'
  },
  {
    id: 'reason',
    label: '原因'
  },
  {
    id: 'message',
    label: '消息'
  },
  {
    id: 'time',
    label: '最近更新时间',
  },

]
export const tableData = Mock.mock({
  'data|10': [{
    "status|1": ['Pending', 'InstallReady', 'Installing', 'Succeeded'],
    time: '@date',
    message: '@word(30, 50)',
    reason: '@word(10, 20)',
  }]
})