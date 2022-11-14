import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称',
  sortable: true
}, {
  id: 'type',
  label: '类型'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    type: '@cword(3, 7)'
  }]
})
