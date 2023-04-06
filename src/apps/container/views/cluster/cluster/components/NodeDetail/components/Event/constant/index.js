import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称'
  },
  {
    id: 'quota',
    label: '配额'
  },
  {
    id: 'time',
    label: '创建时间',
    width:"180px"
  },

]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(7, 20)',
    time: '@date',
    quota: '@integer(0,100)',
    // cpu: 1,
    // cpuCompony: '核',
    // memory: '512',
    // memoryCompony: 'Gi',
    cpu: "不限制",
    memory: '不限制',
    storage: "不限制"
  }]
})
