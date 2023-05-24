import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'cluster',
    label: '集群',
  },
  {
    id: 'status',
    label: '状态',
  },
  {
    id: '',
    label: '所属地域',
  },
  {
    id: 'version',
    label: 'Kubernetes 版本',
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
      "cluster": 'global',
      "status": "运行中",
      "region": "",
      "version": "1.21.10",
    }
  ]
})
