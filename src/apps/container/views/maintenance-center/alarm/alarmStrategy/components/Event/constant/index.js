import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'alarmRule',
    label: '告警规则',
  },
  {
    id: 'status',
    label: '等级',
    sortable: true,
  },
  {
    id: 'time',
    label: '到期时间',
    sortable: true,
  },
  {
    id: 'sendtimes',
    label: '发送时间',
    sortable: true,
    width: "120px"
  },
]
export const tableData = Mock.mock({
  data: [
    // {
    //   alarmRule: "",
    //   level: "",
    //   time: "",
    //   sendtimes: ""
    // }
  ]
})
