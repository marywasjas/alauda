import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    'show-overflow-tooltip': true
  },
  {
    id: 'status',
    label: '状态'
  },
  {
    id: 'resource',
    label: '资源限额'
  },
  {
    id: 'times',
    label: '重启次数'
  },
  {
    id: 'containerIp',
    label: '容器组 IP'
  },
  {
    id: 'node',
    label: '节点'
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
      name: '@word(7, 40)',
      'status|1': ['pending', 'stop', 'running'],
      'statusText|1': ['运行中(3/4)', '已暂停(1/1)', 'Pending(1/1)'],
      resource: '@cword(3, 7)',
      cpu: 1,
      cpuCompony: '核',
      memory: '512',
      memoryCompony: 'Mi',
      times: '@integer(1,10)',
      containerIp: '@integer(1, 1000)',
      node: '@word(3,7)',
      date: '@date'
    }
  ]
})
