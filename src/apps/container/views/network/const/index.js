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
  id: 'address',
  label: '地址'
}, {
  id: 'createtime',
  label: '创建时间'
}]
export const balancerList = Mock.mock({
  'data|5': [{
    name: '@word(5, 10)',
    address: '@ip',
    createtime: '@date',
    'symbolSize': '@integer(50, 100)',
    'draggable': true,
    itemStyle: {
      'color': '@color'
    }
  }]
})
export const listBalancerColumnList = [{
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
export const listBalancerList = Mock.mock({
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
export const policyColumnList = [{
  id: 'name',
  label: '名称',
  sortable: false
}, {
  id: 'ruleNum',
  label: '规则数',
  sortable: true
}, {
  id: 'targetUnit',
  label: '目标计算组件',
  sortable: false
}, {
  id: 'creater',
  label: '创建人',
  sortable: false
}, {
  id: 'createtime',
  label: '创建时间',
  sortable: true
}]
export const policyList = Mock.mock({
  'data|5': [{
    name: '@word(5, 10)',
    ruleNum: '@integer(1,10)',
    targetUnit: '@word(10, 20)',
    creater: '@cname',
    createtime: '@date',
    'symbolSize': '@integer(50, 100)',
    'draggable': true,
    itemStyle: {
      'color': '@color'
    }
  }]
})
