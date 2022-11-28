import Mock from 'mockjs'
export const ruleColumnList = [{
  id: 'direction',
  label: '方向',
  sortable: true
}, {
  id: 'agreement',
  label: '协议',
  sortable: true
}, {
  id: 'port',
  label: '访问端口',
  sortable: false
}, {
  id: 'remoteType',
  label: '远端类型',
  sortable: false
}, {
  id: 'remote',
  label: '远端',
  sortable: true
}]
export const ruleData = Mock.mock({
  'data|3': [{
    direction: "@pick(['入站', '出站'])",
    agreement: "@pick(['TCP', 'UDP'])",
    port: '@integer(1000, 1024)',
    remoteType: '计算组件(当前NS)',
    remote: 'chaosblade-box'
  }]
})
