import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'tag',
  label: '标签'
}, {
  id: 'number',
  label: '组件数量'
}, {
  id: 'date',
  label: '创建时间'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@cword(3, 7)',
    status: 'CrashLoopBackOff(0/1)',
    tag: '@cword(3, 7)',
    date: '@date',
    number: '@integer(0 ,100)'
  }]
})
