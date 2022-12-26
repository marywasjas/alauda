import Mock from 'mockjs'
export const portColumnList = [{
  id: 'ip',
  label: '服务访问'
}, {
  id: 'protocol',
  label: '协议'
}, {
  id: 'port',
  label: '端口'
}, {
  id: 'hostPort',
  label: '主机端口'
}]
export const portData = Mock.mock({
  'data|3': [{
    ip: '@ip',
    protocol: "@pick(['TCP', 'UDP'])",
    port: "@pick(['80', '443'])",
    hostPort: "@pick(['32407', '32408'])"
  }]
})
