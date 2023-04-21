import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true
  },
  {
    id: 'group',
    label: '组',
    sortable: true
  },
  {
    id: 'number',
    label: '版本'
  },
  {
    id: 'scope',
    label: '作用域'
  },
  {
    id: 'date',
    label: '创建时间'
  }
]
export const tableData = Mock.mock({
  'data|30': [{
    name: '@word(3, 7)',
    group: '@word(3, 7)',
    date: '@date',
    "number|1": ['v1', "v1beta1"],
    "scope|1": ['命名空间', "集群"]
  }]
})
