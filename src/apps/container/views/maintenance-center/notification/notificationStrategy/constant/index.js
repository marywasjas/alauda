import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'desc',
    label: '描述',
  },
  {
    id: 'creator',
    label: '创始人',
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
  'data': []
})
