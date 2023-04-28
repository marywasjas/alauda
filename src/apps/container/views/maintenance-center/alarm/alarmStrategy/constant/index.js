import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    // "show-overflow-tooltip": true
  },
  {
    id: 'connectResource',
    label: '关联资源',
  },
  {
    id: 'namespace',
    label: '命名空间',
  },
  {
    id: 'notifyPolicy',
    label: '通知策略',
  },
  {
    id: 'alarmStatus',
    label: '告警状态',
  },
  {
    id: 'creator',
    label: '创建人',
  },
  {
    id: 'createTime',
    label: '创建时间',
  },
  {
    id: 'operation',
    label: '',
    // fixed: 'right'
    width: '60px'
  }
]
export const tableData = Mock.mock({
  'data|10': [{
    "name|1": ["cpass-cert-manager-rules", "cpass-kube-proxy-rules", "cpass-coredns-rules", "cpass-prometheus-1-rules"],
    "connectResource|1": ["cert-manager", "kube-proxy", "coredns", "global", "全部节点"],
    "namespace|1": ["", "cert-manager", "kube-system", "cpaas-system",],
    notifyPolicy: "cpass-admin-notification",
    "alarmStatus|1": ["7 / 7", "14 / 14", "2 / 2", "3 / 3"],
    creator: "",
    desc: "平台组件Cert-manager",
    createTime: '@date',
  }]
})
