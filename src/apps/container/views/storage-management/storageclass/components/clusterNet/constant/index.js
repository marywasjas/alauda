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
    id: 'size',
    label: '大小',
    sortable: true,
  },
  {
    id: 'createTime',
    label: '创建时间',
    sortable: true,
  },
  {
    id: 'operation',
    label: '',
    width: "60px",
  },
]


export const tableData = Mock.mock({
  data: [
    {
      name: 'alertmanager-pv-0',
      status: "已绑定",
      size: "5Gi",
      createTime: "2022-10-24"
    }
  ]
})


