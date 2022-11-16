import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称',
  sortable: true
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'type',
  label: '类型'
}, {
  id: 'date',
  label: '创建时间',
  sortable: true
},
{
  id: 'operation',
  label: '',
  width: '60px'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    desc: '@cword(3, 7)',
    'status|1': ['running', 'stop'],
    'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
    type: '@cword(3, 7)',
    date: '@date'
  }]
})
export const descriptionsTableData = Mock.mock({
  'data|2': [{
    name: '@word(3, 7)',
    mirror: '@word(3, 7)',
    cpu: '1',
    memory: '512Mi'
  }]
})
