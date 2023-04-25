import Mock from 'mockjs'

export const tableColumnList = [
  {
    id: 'name',
    label: '名称/显示名称',
  },
  {
    id: 'targetAddress',
    label: '目标地址',
    width: '250px'
  },
  {
    id: 'detectionMethod',
    label: "探测方式",
  },
  {
    id: 'detectionInterval',
    label: "探测间隔",
  },
  {
    id: 'connectivity',
    label: "连通性",
  },
  {
    id: 'creator',
    label: "创建人",
  },
  {
    id: 'createTime',
    label: '创建时间',
  },
  {
    id: 'operation',
    label: '',
    width: '60px'
  }
]

export const tableData = Mock.mock({
  'data': [
    {
      name: "blackbox",
      targetAddress: "10.20.30.40",
      detectionMethod: "ICMP(icmp)",
      detectionInterval: "120s",
      connectivity: "否",
      creator: "k01027",
      createTime: "@date"
    },
    {
      name: "blackbox",
      targetAddress: "10.20.30.40",
      detectionMethod: "ICMP(icmp)",
      detectionInterval: "120s",
      connectivity: "是",
      creator: "k01027",
      createTime: "@date"
    },
  ]
})

