import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称',
  sortable: true
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'resource',
  label: '资源限额'
}, {
  id: 'times',
  label: '重启次数'
}, {
  id: 'containerIp',
  label: '容器组 IP'
}, {
  id: 'node',
  label: '节点'
}, {
  id: 'date',
  label: '创建时间'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    status: '@word(3, 7)',
    resource: '@cword(3, 7)',
    times: '@integer(1,10)',
    containerIp: '@integer(1, 1000)',
    node: '@word(3,7)',
    date: '@date'
  }]
})
