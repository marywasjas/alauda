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
export const containerColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'limit',
  label: '资源限额'
}, {
  id: 'restartNum',
  label: '重启次数'
}, {
  id: 'ip',
  label: '容器组IP'
}, {
  id: 'node',
  label: '节点'
}, {
  id: 'createtime',
  label: '创建时间'
}]
export const containerData = Mock.mock({
  'data|3': [{
    name: '@word(10, 20)',
    status: "@pick(['启用', '停用'])",
    limit: '@integer(0, 10)',
    restartNum: '@integer(0, 10)',
    ip: '@ip',
    node: '@word(5, 10)',
    createtime: '@date'
  }]
})
