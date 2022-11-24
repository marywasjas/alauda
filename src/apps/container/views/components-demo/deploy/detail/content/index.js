import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true
  },
  {
    id: 'status',
    label: '状态'
  },
  {
    id: 'resourceLimit',
    label: '资源限额'
  },
  {
    id: 'restartsCount',
    label: '重启次数',
    sortable: true
  },
  {
    id: 'groupIP',
    label: '容器组IP',
    sortable: true
  },
  {
    id: 'node',
    label: '节点',
    sortable: true
  },
  {
    id: 'date',
    label: '创建时间',
    sortable: true
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
      resourceLimit: '111',
      status: 'running',
      restartsCount: '123',
      statusText: '运行中(0/1)',
      groupIP: 'sssss',
      node: 'dddaada',
      date: '@date'
    }
  ]
})
