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
    label: '节点状态',
    sortable: true,
    width: '150px'
  },
  {
    id: 'nodeType',
    label: '节点类型',
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
    id: 'storage',
    label: '存储空间使用率',
    sortable: true,
    width: '150px'
  },
  {
    id: 'memory',
    label: '内存利用率',
    sortable: true,
    width: '150px',
  },
  {
    id: 'container',
    label: '容器组数',
    sortable: true,
    width: '120px'
  },
  {
    id: 'systemload',
    label: '系统负载',
    width: '120px'
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
    nodeStatus: '正常',
    nodeType: '控制节点',
    // cpu: '@cword(3, 7)',
    // memory: '@cword(3, 7)',
    // storage: '@cword(3, 7)',
    container: 16,
    systemload: 0.98
  }]
})
