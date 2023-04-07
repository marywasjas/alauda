import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'userName',
    label: '用户名/显示名称',
    sortable: true,
    width: 220
  },
  {
    id: 'status',
    label: '状态',
  },
  {
    id: 'userGroup',
    label: '用户组',
  },
  {
    id: 'role',
    label: '角色',
  },
  {
    id: 'source',
    label: '来源',
  },
  {
    id: 'period',
    label: '有效期 (剩余)',

  },
  {
    id: 'time',
    label: '创建时间',
    sortable: true,

  },
  {
    id: 'operation',
    label: '',
    // fixed: 'right'
    width: '60px'
  }
]
export const tableData = Mock.mock({
  'data|20': [{
    "userName|1": ["k01057", "k01337", "k01217", "k01457"],
    desc: '@word(3, 7)',
    status: '正常',
    userGroup: '未分组',
    "role|1": ["platform-admin", "project-admin"],
    source: '本地',
    period: "永久",
    time: '@date',
  }]
})
