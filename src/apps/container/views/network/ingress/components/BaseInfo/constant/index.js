import Mock from 'mockjs'
export const ruleColumnList = [{
  id: 'matchType',
  label: '匹配方式'
}, {
  id: 'address',
  label: '地址'
}, {
  id: 'url',
  label: '内部路由'
}, {
  id: 'port',
  label: '主机端口'
}]
export const ruleData = Mock.mock({
  'data|3': [{
    matchType: "@pick(['前缀', '后缀'])",
    address: '@word(10, 20)',
    url: '@url',
    port: "@pick(['32407', '11211'])"
  }]
})
export const certiColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'resource',
  label: '来源'
}, {
  id: 'domain',
  label: '资源限额'
}]
export const certiData = Mock.mock({
  'data|3': [{
    name: '@word(10, 20)',
    resource: "@pick(['收费', '免费'])",
    domain: '@url'
  }]
})
