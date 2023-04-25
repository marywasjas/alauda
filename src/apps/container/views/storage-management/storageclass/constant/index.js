import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
    sortable: true
  },
  {
    id: 'storageScheme',
    label: '存储方案',
    sortable: true
  },
  {
    id: 'type',
    label: '类型',
    sortable: true
  },
  {
    id: 'recycPolicy',
    label: '回收策略',
  },
  {
    id: 'project',
    label: '项目',
  },
  {
    id: 'time',
    label: '创建时间',
    sortable: true
  },
  {
    id: 'operation',
    label: '',
    // fixed: 'right'
    width: '60px'
  }
]
export const tableData = Mock.mock({
  "data|2": [
    {
      name: "region-nfs",
      storageScheme: "NFS",
      type: "文件存储",
      recycPolicy: "删除",
      project: "region-devops",
      time: "@date"
    }
  ]
})
