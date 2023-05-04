import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'type',
    label: '类型',
  },
  {
    id: 'desc',
    label: '描述',
  },
  {
    id: 'time',
    label: '创建时间',
  },
]
export const tableData = Mock.mock({
  'data': [
    {
      name: "msg-server",
      showName: "msg-server-001",
      type: "邮箱",
      desc: "",
      time: "9 分钟前"
    }
  ]
})
