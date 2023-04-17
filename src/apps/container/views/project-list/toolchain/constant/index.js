import Mock from 'mockjs'

export const tableColumnList = [
  {
    id: 'name',
    label: '用户名/显示名称',
    sortable: true
  },
  {
    id: 'userRole',
    label: '用户角色',
  },

  {
    id: 'userGroup',
    label: "用户组",
  },
  {
    id: 'importTime',
    label: '导入时间',
    fixed: 'right',
    width: '80px'
  }
]

export const tableData = Mock.mock({
  'data|20': [
    {
      "name|1": ["k01057", "k01337", "k01217", "k01457"],
      desc: '@word(3, 7)',
      userGroup: '未分组',
      time: '@date',
    }
  ]
})

export const tableColumnList2 = [
  {
    id: 'name',
    label: '用户名/显示名称',
  },
  {
    id: 'userGroup',
    label: '用户组',
  },
]

export const tableData2 = Mock.mock({
  'data|20': [
    {
      "name|1": ["k01057", "k01337", "k01217", "k01457"],
      desc: '@word(3, 7)',
      userGroup: '未分组',
      time: '@date',
    }
  ]
})

export const tableData3 = Mock.mock({
  'data|20': [
    {
      "name|1": ["k01057", "k01337", "k01217", "k01457"],
      desc: '@word(3, 7)',
      userGroup: '未分组',
      userRole: 'project-admin-system',
      time: '@date',
    }
  ]
})

export const tableColumnList3 = [
  {
    id: 'name',
    label: '凭据名称',
    sortable: true
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
    id: "operation",
    label: "",
    width: "60px",
    fixed: "right"
  },
]