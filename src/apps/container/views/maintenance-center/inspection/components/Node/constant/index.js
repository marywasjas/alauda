import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '证书名称名称',
    sortable: true,
    fixed: true,
    width: 250
  },
  {
    id: 'status',
    label: '证书状态',
  },
  {
    id: 'cluster',
    label: '所属集群',
    sortable: true,
  },
  {
    id: 'nodeIP',
    label: '节点 IP',
  },
  {
    id: 'time',
    label: '到期时间',
    sortable: true,
  },
]
export const tableData = Mock.mock({
  'data|40': [{
    name: '@word(3, 7)',
    "status|1": ["正常", "异常"],
    "cluster|1": ["global", "region"],
    "nodeIP|1": ["25.2.20.182", "25.2.20.2", "25.2.20.72", "25.2.20.90",],
    time: "@date"
  }]
})

// 容器组
export const containerData_cluster = Mock.mock([
  {
    label: '故障',
    value: 0,
    itemStyle: { color: 'rgba(229,69,69,0.85)' }
  },
  {
    label: '预警',
    value: 1,
    itemStyle: { color: 'rgb(225,152,0)' }
  },
  {
    label: '正常',
    value: 1,
    itemStyle: { color: 'rgba(10,191,91,0.85)' }
  },
])

export const containerData_node = Mock.mock([
  {
    label: '故障',
    value: 0,
    itemStyle: { color: 'rgba(229,69,69,0.85)' }
  },
  {
    label: '预警',
    value: 5,
    itemStyle: { color: 'rgb(225,152,0)' }
  },
  {
    label: '正常',
    value: 18,
    itemStyle: { color: 'rgba(10,191,91,0.85)' }
  },
])

export const containerData_container = Mock.mock([
  {
    label: '故障',
    value: 27,
    itemStyle: { color: 'rgba(229,69,69,0.85)' }
  },
  {
    label: '预警',
    value: 12,
    itemStyle: { color: 'rgb(225,152,0)' }
  },
  {
    label: '正常',
    value: 464,
    itemStyle: { color: 'rgba(10,191,91,0.85)' }
  },
])


export const containerData_cerf = Mock.mock([
  {
    label: '故障',
    value: 0,
    itemStyle: { color: 'rgba(229,69,69,0.85)' }
  },
  {
    label: '预警',
    value: 0,
    itemStyle: { color: 'rgb(225,152,0)' }
  },
  {
    label: '正常',
    value: 140,
    itemStyle: { color: 'rgba(10,191,91,0.85)' }
  },
])