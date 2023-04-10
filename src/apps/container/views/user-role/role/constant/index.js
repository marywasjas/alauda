import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true,
    width: 220
  },
  {
    id: 'type',
    label: '类型',
  },
  {
    id: 'prop',
    label: '属性',
  },
  {
    id: 'desc',
    label: '描述',
  },
  {
    id: 'creator',
    label: '创建人',
  },
  {
    id: 'time',
    label: '创建时间',
  },
]
export const tableData = Mock.mock({
  'data|6': [{
    "name|1": ["k01057", "k01337", "k01217", "k01457"],
    desc: '@word(3, 7)',
    "type|1": ['平台角色', '项目角色', '空间命名角色'],
    prop: '系统',
    "role|1": ["platform-admin", "project-admin"],
    creator: "system",
    time: '@date',
    "detail|1": ["平台管理员", "平台审计人员", "项目管理员", "命名空间管理员", "开发人员"]
  }]
})
