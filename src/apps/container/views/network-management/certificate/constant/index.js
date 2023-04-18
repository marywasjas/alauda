import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'project',
    label: '类型',
  },
  {
    id: 'award',
    label: '颁发给',
  },
  {
    id: 'validDuration',
    label: '有效期',
  },
  {
    id: 'domainName',
    label: '域名',
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
