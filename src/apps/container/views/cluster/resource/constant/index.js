import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    width: 220
  },
  {
    id: 'tag',
    label: '标签',
  },
  {
    id: 'createTime',
    label: '创建时间',
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
