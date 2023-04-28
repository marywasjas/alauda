import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'connectResource',
    label: '关联资源',
    sortable: true
  },
  {
    id: "cluster",
    label: "集群"
  },
  {
    id: 'namespace',
    label: '命名空间',
  },
  {
    id: 'alarmPolicy',
    label: '告警策略',
    sortable: true

  },
  {
    id: 'alarmRules',
    label: '告警规则',
  },
  {
    id: 'grade',
    label: '等级',
    sortable: true

  },
  {
    id: 'time',
    label: '起止时间',
    sortable: true

  },
  {
    id: 'sendTimes',
    label: '发送次数',
    sortable: true

  },
  // {
  //   id: 'operation',
  //   label: '',
  //   // fixed: 'right'
  //   width: '60px'
  // }
]
export const tableData = Mock.mock({
  'data|10': []
})
