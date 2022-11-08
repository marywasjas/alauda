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
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@cword(3, 7)',
    status: 'CrashLoopBackOff(0/1)',
    type: '@cword(3, 7)',
    date: '@date'
  }]
})
