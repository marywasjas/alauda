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
      name:"msg-template",
      showName:"msg-template001",
      desc:"",
      type:"邮箱",
      time:"5 分钟前"
    }
  ]
})
