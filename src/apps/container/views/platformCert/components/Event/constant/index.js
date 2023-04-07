import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '证书名称',
    sortable: true,
    fixed: true,
    width: 250
  },
  {
    id: 'status',
    label: '证书状态',
  },
  {
    id: 'cluster',
    label: '所属集群',
    sortable: true,
  },
  {
    id: 'space',
    label: '命名空间',
  },
  {
    id: 'time',
    label: '到期时间',
    sortable: true,
  },
]
export const tableData = Mock.mock({
  'data|40': [{
    name: '@word(3, 7)',
    "status|1": ["正常", "异常"],
    "cluster|1": ["global", "region"],
    "space|1": ["cpaas-system", "operators"],
    time: "@date"
  }]
})
