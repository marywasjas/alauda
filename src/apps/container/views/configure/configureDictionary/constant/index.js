import Mock from 'mockjs'
export const tableColumnList = [{
  id: 'name',
  label: '名称'
}, {
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
    'id|+1': 1,
    name: '@word(3, 7)',
    desc: '@cword(3, 7)',
    'status|1': ['running', 'stop'],
    'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
    type: '@cword(3, 7)',
    date: '@date'
  }]
})
