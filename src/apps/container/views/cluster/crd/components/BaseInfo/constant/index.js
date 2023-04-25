import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称'
  },
  {
    id: 'space',
    label: '命名空间'
  },
  {
    id: 'time',
    label: '创建时间'
  },
  {
    id: 'operation',
    label: '',
    width: '60px'
  }
]

export const tableData = Mock.mock({
  'data|2': [{
    name: 'container-platform',
    space: "@pick(['admincipshiorg2', 'admincipshiorg1'])",
    time: '@date'
  }]
})
