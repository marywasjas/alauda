import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'ipAddress',
    label: 'IP 地址',
  },
  {
    id: 'method',
    label: '资源分配方式',
  },
  {
    id: 'project',
    label: '项目',
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
  'data|2': [
    {
      name: 'global-alb2',
      ipAddress: "127.0.0.1",
      method: "实例",
      project: "cpaas-system",
      time: '@date',
    }
  ]
})
