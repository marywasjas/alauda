import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '指标',
  },
  {
    id: 'storage',
    label: '默认值',
  },
  {
    id: 'memory',
    label: '最大值',
  },
]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    memory: '@cword(3, 7)',
    storage: '@cword(3, 7)',
  }]
})