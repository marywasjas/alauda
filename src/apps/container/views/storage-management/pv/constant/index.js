import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '持久卷名称',
},
{
  id: 'status',
  label: '状态'
},
{
  id: 'tag',
  label: '关联持久卷声明',
},
{
  id: 'number',
  label: '大小'
},
{
  id: 'date',
  label: '创建时间'
},
{
  id: 'operation',
  label: '',
  width: '60px'
}]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    status: '已绑定',
    tag: '@cword(3, 7)',
    number: '5Gi',
    date: '@date',
  }]
})
