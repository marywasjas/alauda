import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true
  },
  {
    id: 'transType',
    label: '传输方式',
    sortable: true
  },
  {
    id: 'netSegment',
    label: '网段',
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
  'data|2': [
    {
      name: '@word(3, 7)',
      transType: "Overlay",
      netSegment: "10.3.0.0/16",
      time: '@date',
    }
  ]
})
