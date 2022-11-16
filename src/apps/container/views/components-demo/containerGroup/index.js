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
    id: 'tasks',
    label: '所属定时任务'
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
      'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
      tasks: '@cword(3, 7)',
      date: '@date'
    }
  ]
})
