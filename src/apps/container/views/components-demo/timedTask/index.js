import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称'
  },
  {
    id: 'status',
    label: '状态'
  },

  {
    id: 'date',
    label: '创建时间'
  },
  {
    id: 'operation',
    label: '',
    width: '60px'
  }
]
export const tableData = Mock.mock({
  'data|10': [
    {
      name: '@word(3, 7)',
      desc: '@cword(3, 7)',
      'status|1': ['running', 'stop'],
      'statusText|1': ['执行成功', '执行失败'],
      tasks: '@cword(3, 7)',
      date: '@date'
    }
  ]
})
