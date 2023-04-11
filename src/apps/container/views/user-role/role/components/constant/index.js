import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '用户名/显示名称',
    width: 600
  },
  {
    id: 'userGroup',
    label: '用户组',
    fixed: 'right'

  },

  {
    id: 'time',
    label: "导入时间",
    fixed: 'right'
  },
  {
    id: 'remove',
    label: '',
    fixed: 'right',
    width: '60px'
  }
]

export const tableData = Mock.mock({
  'data|20': [{
    "name|1": ["k01057", "k01337", "k01217", "k01457"],
    desc: '@word(3, 7)',
    userGroup: '未分组',
    time: '@date',
  }]
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
  'data|20': [{
    "name|1": ["k01057", "k01337", "k01217", "k01457"],
    desc: '@word(3, 7)',
    userGroup: '未分组',
    time: '@date',
  }]
})

export const tableColumnList3 = [
  {
    id: 'func',
    label: '功能',
  },
  {
    id: 'view',
    label: '查看',
  },
  {
    id: 'create',
    label: '创建',
  },
  {
    id: 'update',
    label: '更新',
  },
  {
    id: 'delete',
    label: '删除',
  },
]


