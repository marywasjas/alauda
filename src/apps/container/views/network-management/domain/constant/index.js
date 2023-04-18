import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '域名',
  },
  {
    id: 'type',
    label: '集群类型',
  },
  {
    id: 'cluster',
    label: '集群',
  },
  {
    id: 'project',
    label: '项目',
  },
  {
    id: 'cert',
    label: '证书',
  },
  {
    id: 'time',
    label: '创建时间',
  },
  {
    id: 'operation',
    label: '',
    width: '60px',
    fixed: 'right'
  }
]
export const tableData = Mock.mock({
  'data|2': [{
    name: '@word(3, 7)',
    'type|1': ['泛域名', '全域名'],
    cluster: "region(region)",
    project: '所有项目',
    cert: '-',
    time: '@date',
  }]
})
