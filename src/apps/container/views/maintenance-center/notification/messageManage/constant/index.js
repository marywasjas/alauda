import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'title',
    label: '消息标题 / 内容',
  },
  {
    id: 'time',
    label: '发送时间',
  },
  {
    id: 'type',
    label: '消息类型',
  },
  {
    id: 'operation',
    label: '',
    width: '60px',
    fixed: 'right'
  }
]
export const tableData = Mock.mock({
  'data': [
    {
      title: "msg",
      time: "2023-05-04 14:06:04",
      type: "平台公告",
      content: "",
      resident: true,
      overdue: "2023-05-11 14:06:04",
    },
    {
      title: "msg2",
      time: "2023-05-04 15:06:04",
      type: "产品消息",
      content: "this is a msg2",
      resident: true,
      overdue: "2023-05-11 15:06:04",

    },
  ]
})
