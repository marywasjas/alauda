import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true,
  },
  {
    id: 'status',
    label: '状态',
  },
  {
    id: 'namespace',
    label: '命名空间',
  },
  {
    id: 'version',
    label: '版本',
  },
  {
    id: 'time',
    label: '创建时间',
    sortable: true,
  },
  {
    id: 'operation',
    label: '',
    width: "60px"
  },
]
export const tableData = Mock.mock({
  // 'data|4': [{
  //   name: '@word(3, 7)',
  //   "status|1": ["部署成功", "部署失败"],
  //   "version|1": ["v3.8.22", "v3.8.4"],
  //   "namespace": "所有命名空间",
  //   time: "@date"
  // }]

  'data': [
    {
      name: 'devops-tool-operator',
      "status": "部署成功",
      "namespace": "所有命名空间",
      "version": "v3.8.22",
      time: "@date"
    },
    {
      name: 'knative-operator',
      "status": "部署成功",
      "namespace": "所有命名空间",
      "version": "v3.8.4",
      time: "@date"
    },
    {
      name: 'katanomi-operator',
      "status": "部署成功",
      "namespace": "所有命名空间",
      "version": "v3.8.48",
      time: "@date"
    },
  ]
})
