import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'protocol',
    label: '协议',
  },
  {
    id: 'store',
    label: '镜像仓库',
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
