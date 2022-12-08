import Mock from 'mockjs'

export const alarmColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'resource',
  label: '关联资源'
}, {
  id: 'policy',
  label: '通知策略'
}, {
  id: 'status',
  label: '告警状态'
}, {
  id: 'creater',
  label: '创建人'
}, {
  id: 'createTime',
  label: '创建时间'
}]
export const alarmList = {
  data: []
}

export const historyColumnList = [{
  id: 'resource',
  label: '关联资源',
  sortable: true
}, {
  id: 'colony',
  label: '集群',
  sortable: false
}, {
  id: 'namespace',
  label: '命名空间',
  sortable: false
}, {
  id: 'policy',
  label: '告警策略',
  sortable: true
}, {
  id: 'rule',
  label: '告警规则',
  sortable: false
}, {
  id: 'level',
  label: '等级',
  sortable: true
}, {
  id: 'startEndTime',
  label: '起止时间',
  sortable: true
}, {
  id: 'sendTimes',
  label: '发送次数',
  sortable: true
}]
export const historyList = {
  data: []
}

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
