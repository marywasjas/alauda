import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true,
    fixed: true,
    width: '150px'
  },
  {
    id: 'nodeStatus',
    label: '状态',
    sortable: true,
    width: '150px'
  },
  {
    id: 'cpu2',
    label: 'CPU使用值',
    sortable: true,
    width: '150px'
  },
  {
    id: 'cpu',
    label: 'CPU利用率',
    sortable: true,
    width: '150px'
  },
  {
    id: 'memory2',
    label: '内存使用值',
    sortable: true,
    width: '150px',
  },
  {
    id: 'memory',
    label: '内存利用率',
    sortable: true,
    width: '150px',
  },
  {
    id: 'container',
    label: '重启次数',
    sortable: true,
    width: '120px'
  },
  {
    id: 'time',
    label: '创建时间',
    width: "180px"
  },
  {
    id: 'operation',
    label: '',
    width: '60px',
    fixed: 'right'
  }
]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    "nodeStatus|1":['运行中(3/4)', '已暂停(1/1)', '已完成(1/1)'],
    nodeType: '控制节点',
    cpu2: "20.05m",
    memory2: '12.28Gi',
    container: 0,
    time: '@date',
  }]
})
