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
  },
  {
    id: 'operation',
    label: '',
    // fixed: 'right'
    width: '60px'
  }
]

export const portData = Mock.mock({
  'data|2': [{
    name: 'container-platform',
    space: "@pick(['TCP', 'UDP'])",
    time: '@date'
  }]
})
