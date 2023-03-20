import Mock from 'mockjs'
export const portColumnList = [
  {
    id: 'name',
    label: '名称'
  },
  {
    id: 'space',
    label: '命名空间'
  },
  {
    id: 'time',
    label: '创建时间'
  }
]

export const portData = Mock.mock({
  'data|3': [{
    name: '@ip',
    space: "@pick(['TCP', 'UDP'])",
    time: '@date'
  }]
})
