import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'gateway',
    label: '网关',
  },
  {
    id: 'status',
    label: '状态',
  },
  {
    id: 'type',
    label: '网关类型',
  },
  {
    id: 'space',
    label: '命名空间',
  },
  {
    id: 'time',
    label: '更新时间',
  },
]
export const tableData = Mock.mock({
  'data': [
    {
      gateway: "istio-egressgateway",
      status: "运行中",
      type: "出口网关",
      space: "istio-system",
      time: ""
    },
    {
      gateway: "istio-egressgateway",
      status: "运行中",
      type: "入口网关",
      space: "istio-system",
      time: ""
    },
  ]
})
