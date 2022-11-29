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
export const tableColumnList1 = [
  {
    id: 'type',
    label: '类型'
  },
  {
    id: 'status',
    label: '状态'
  },
  {
    id: 'cause',
    label: '原因'
  },
  {
    id: 'message',
    label: '消息'
  },
  {
    id: 'lastDate',
    label: '最后更新时间'
  }
]
export const tableData1 = Mock.mock({
  'data|10': [
    {
      type: '@word(3, 7)',
      status: 'True',
      message: '-',
      lastDate: '3天前'
    }
  ]
})
