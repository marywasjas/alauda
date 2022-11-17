import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '版本号'
}, {
  id: 'date',
  label: '创建时间'
}, {
  id: 'createUser',
  label: '创建人'
}, {
  id: 'remark',
  label: '注释'
}, {
  id: 'operation',
  label: '',
  width: '60px'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(7, 20)',
    createUser: '@word(3,7)',
    date: '@date',
    remark: '@word(3,10)'
  }]
})
