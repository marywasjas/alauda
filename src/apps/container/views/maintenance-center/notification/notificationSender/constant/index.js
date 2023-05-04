import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'email',
    label: '邮箱',
  },
  {
    id: 'emailServer',
    label: '邮件服务器',
  },
  {
    id: 'time',
    label: '创建时间',
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
    // {
    //   name: "notificationSend@qq.com",
    //   time:"5 天前",
    //   emailServer:"邮箱"
    // }
  ]
})
