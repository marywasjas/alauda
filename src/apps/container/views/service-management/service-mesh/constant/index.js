import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'type',
    label: 'Istio 版本',
  },
  {
    id: 'cluster',
    label: '集群',
  },
  {
    id: 'time',
    label: '更新时间',
  },
]
export const tableData = Mock.mock({
  'data': [
    {
      name: 'service-mesh',
      showName: "service-mesh",
      type: "1.12.4",
      cluster: "global",
      time: '2022-10-24',
    }
  ]
})
