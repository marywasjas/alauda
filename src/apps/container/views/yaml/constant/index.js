import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'taskID',
    label: '任务ID',
    prop: 'taskID'
  },
  {
    id: 'taskStatus',
    label: '任务状态',
    prop: 'taskStatus'
  },
  {
    id: 'colony',
    label: '集群',
    prop: 'colony'
  },
  {
    id: 'namespace',
    label: '命名空间',
    prop: 'namespace'
  },
  {
    id: 'targetCluster',
    label: '目标集群',
    prop: 'targetCluster'
  },
  {
    id: 'targetNamespace',
    label: '目标命名空间',
    prop: 'targetNamespace'
  },
  {
    id: 'creatDate',
    label: '创建时间',
    prop: 'creatDate'
  }
]
export const tableData = Mock.mock({
  'data|10': [
    // {
    //   taskID: '@word(3, 7)',
    //   colony: '@word(3, 7)',
    //   'taskStatus|1': ['running', 'stop'],
    //   'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
    //   namespace: '@cword(3, 7)',
    //   targetCluster: '@cword(3, 7)',
    //   targetNamespace: '@cword(3, 7)',
    //   creatDate: '@date'
    // }
  ]
})
