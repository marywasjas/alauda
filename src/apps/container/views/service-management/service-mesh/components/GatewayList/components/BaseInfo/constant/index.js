import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'protocol',
    label: '协议'
  },
  {
    id: 'server',
    label: '服务端口'
  },
  {
    id: 'container',
    label: '容器端口'
  },
]
export const tableData = Mock.mock({
  'data': [
    { protocol: "TCP", server: "10011", container: "10011" },
    { protocol: "TCP", server: "10012", container: "10012" },
    { protocol: "TCP", server: "10013", container: "10013" },
    { protocol: "TCP", server: "10014", container: "10014" },
    { protocol: "TCP", server: "10015", container: "10015" },
  ]
})
export const tableColumnList2 = [
  {
    id: 'exterServer',
    label: '外部服务'
  },
  {
    id: 'server',
    label: '服务协议'
  },
  {
    id: 'container',
    label: '服务地址及网关服务端口'
  },
]
export const tableData2 = Mock.mock({
  'data': [

  ]
})