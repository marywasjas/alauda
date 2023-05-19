import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称'
  },
  {
    id: 'namespace',
    label: '命名空间'
  },
  {
    id: 'resource',
    label: '资源类型'
  },
  {
    id: 'time',
    label: '创建时间',
  },
  {
    id: 'operation',
    label: '',
    width: "60px"
  },
]
export const tableData = Mock.mock({
  'data': [
    {
      name: "default",
      namespace: "baas",
      resource: "Broker",
      time: "@date"
    }
  ]
})
