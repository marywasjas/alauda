import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true
  },
  {
    id: 'defaultNIC',
    label: '默认网卡',
  },
  {
    id: 'status',
    label: '状态',
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
  'data': []
})
