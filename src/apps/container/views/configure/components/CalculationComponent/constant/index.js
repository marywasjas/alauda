import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'type',
  label: '类型'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(7, 20)',
    type: '部署'
  }]
})
