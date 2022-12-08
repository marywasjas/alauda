import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称',
  sortable: true
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'tag',
  label: '关联持久卷',
  sortable: true
}, {
  id: 'number',
  label: '容量'
}, {
  id: 'date',
  label: '创建时间'
}, {
  id: 'operation',
  label: '',
  width: '60px'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    status: 'CrashLoopBackOff(0/1)',
    tag: '@cword(3, 7)',
    date: '@date',
    number: '@integer(0 ,100)'
  }]
})
