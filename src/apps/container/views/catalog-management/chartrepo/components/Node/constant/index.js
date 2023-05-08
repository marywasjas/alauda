import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'ipAddress',
    label: 'IP 地址',
  },
  {
    id: 'node',
    label: '节点',
  },
  {
    id: 'container',
    label: '容器组',
  },
]
export const tableData = Mock.mock({
  'data|20': [{
    ipAddress: '10.1.0.135',
    node: '25.2.20.111',
    container: 'cpaas-system/alertmanager-kube-prometh',
  }]
})
