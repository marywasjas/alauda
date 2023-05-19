import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'type',
    label: '类型',
    width: "120px"
  },
  {
    id: 'name',
    label: '资源名称',
    width: "120px"
  },
  {
    id: 'time',
    label: '起止时间',
    width: "160px"
  },
  {
    id: 'times',
    label: '次数',
    width: "60px"
  },
  {
    id: 'reason',
    label: '原因',
    width: "135px"
  },
  {
    id: 'message',
    label: '消息',
    width: "300px"
  },
  {
    id: "operation",
    label: "操作",
  }
]
export const tableData = Mock.mock({
  'data|10': [{
    type: "ClusterServiceVersion",
    name: "postgres-operator.v.3.8.6",
    startTime: "2022-10-24 18:40:43",
    endTime: "2023-10-24 15:40:43",
    times: "8945",
    reason: "DisableCopiedCSVs",
    message: "CSV copying disabled for operators/knative-operator.v3.8.4 "
  }]
})
