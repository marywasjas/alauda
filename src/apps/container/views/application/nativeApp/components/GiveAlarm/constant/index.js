import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称',
  disable: true
}, {
  id: 'type',
  label: '通知策略',
  disable: false
}, {
  id: 'status',
  label: '告警状态',
  disable: true
}, {
  id: 'createUser',
  label: '创建人',
  disable: false
}, {
  id: 'date',
  label: '创建时间',
  disable: false
}, {
  id: 'operation',
  label: '操作',
  width: '60px',
  disable: true
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    createUser: '@cword(3, 7)',
    'status|1': ['running', 'stop'],
    'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
    type: '@cword(3, 7)',
    date: '@date'
  }]
})
