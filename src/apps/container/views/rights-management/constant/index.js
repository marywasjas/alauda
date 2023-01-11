import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'account',
    label: '申请者账号',
    prop: 'account'
  },
  {
    id: 'name',
    label: '项目名称',
    prop: 'name'
  },
  {
    id: 'time',
    label: '申请时长',
    prop: 'time'
  },
  {
    id: 'status',
    label: '审批状态',
    prop: 'status'
  },
  {
    id: 'effectStatus',
    label: '生效状态',
    prop: 'effectStatus'
  },
  {
    id: 'submitTime',
    label: '申请信息提交时间',
    prop: 'submitTime'
  }
]
export const tableData = Mock.mock({
  'data|10': [
    {
      account: '@word(3, 7)',
      name: '@word(3, 7)',
      time: 1,
      status: '已审批',
      effectStatus: '已失效',
      submitTime: '@date'
    }
  ]
})
