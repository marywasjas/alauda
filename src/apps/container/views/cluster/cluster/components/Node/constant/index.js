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
    id: 'status',
    label: '状态',
    width: '120px'

  },
  {
    id: 'type',
    label: '集群类型',
    width: '120px'

  },
  {
    id: 'node',
    label: '节点数',
    width: '120px'

  },
  {
    id: 'total',
    label: '资源总量',
    width: '120px',
    // cpu: "192.00核"
  },
  {
    id: 'arch',
    label: '硬件架构',
    width: '120px'

  },
  {
    id: 'kubernete',
    label: 'Kubernete...',
    width: '120px'
  },
  {
    id: 'time',
    label: '创建时间',
    sortable: true,
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
  'data|2': [{
    name: '@word(3, 7)',
    status: '正常',
    type: '@cword(3, 7)',
    node: '@cword(3, 7)',
    arch: '@cword(3, 7)',
    total: '@cword(3, 7)',
    kubernete: '@cword(3, 7)',
    time: '@date',
    cpu: 1,
    cpuCompony: '核',
    memory: '512',
    memoryCompony: 'Gi',
  }]
})
