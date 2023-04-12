import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true,
    width: 220
  },
  {
    id: 'status',
    label: '状态',
  },
  {
    id: 'cluster',
    label: '集群 (CPU/内存/存储)',
    width: 550

  },
  {
    id: 'time',
    label: '创建于',
    width: 150
  },

]
export const tableData = Mock.mock({
  'data|20': [{
    "name|1": ["baas", "chaos", "cpaas-dev", "cpass-system"],
    desc: '@word(3, 7)',
    status: '正常',
    "cluster|1": ["region", "global"],
    cpu: "不限制",
    memory: '不限制',
    storage: "不限制",
    time: '@date',
  }]
})
