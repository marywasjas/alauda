import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '对象名称',
  },
  {
    id: 'type',
    label: '类型',
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
    {
      name: "notificationReceiver@qq.com",
      showName: "notiRece",
      time:"5 天前",
      type:"邮箱"
    }
  ]
})
