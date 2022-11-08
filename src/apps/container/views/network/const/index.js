import Mock from 'mockjs'

export const ingressColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'rule',
  label: '规则'
}, {
  id: 'createtime',
  label: '创建时间'
}]
export const ingressList = Mock.mock({
  'data|5': [{
    name: '@cword(3, 7)',
    rule: [],
    createtime: '@date',
    'symbolSize': '@integer(50, 100)',
    'draggable': true,
    itemStyle: {
      'color': '@color'
    }
  }]
})

export const balancerColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'externalIp',
  label: '外部负载IP'
}, {
  id: 'ip',
  label: '内部负载IP'
}, {
  id: 'type',
  label: '类型'
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'createtime',
  label: '创建时间'
}]
export const balancerList = Mock.mock({
  'data|5': [{
    name: '@cword(3, 7)',
    externalIp: '@ip',
    ip: '@ip',
    type: "@pick(['轮询', '权重', 'HASH'])",
    status: "@pick(['启用', '停用'])",
    createtime: '@date',
    'symbolSize': '@integer(50, 100)',
    'draggable': true,
    itemStyle: {
      'color': '@color'
    }
  }]
})
