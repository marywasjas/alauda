import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true
  },
  {
    id: 'type',
    label: '类型',
  },
  {
    id: 'project',
    label: '项目',
  },
  {
    id: 'time',
    label: '创建时间',
    sortable: true
  },
  {
    id: 'operation',
    label: '',
    width: '60px',
    fixed: 'right'
  }
]
export const tableData = Mock.mock({
  'data': [
    {
      name: 'public-charts',
      type: "Local",
      project: "所有项目",
      time: '2022-10-24',
    }
  ]
})
