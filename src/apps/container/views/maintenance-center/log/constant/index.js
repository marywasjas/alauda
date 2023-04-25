import Mock from 'mockjs'

export const tableColumnList = [
  {
    id: 'name',
    label: '项目名称',
  },
  {
    id: 'remainDay',
    label: "日志保留天数",
  },
  {
    id: 'status',
    label: "策略状态",
  },
  {
    id: 'stopTime',
    label: "最近停用时间",
  },
  {
    id: 'createTime',
    label: '创建时间',
  },
  {
    id: 'operation',
    label: '',
    width: '60px'
  }
]

export const tableData = Mock.mock({
  'data': [
    {
      name: "blackbox",
      remainDay: "7",
      status: "已启用",
      stopTime: "",
      createTime: "@date"
    },
  ]
})

