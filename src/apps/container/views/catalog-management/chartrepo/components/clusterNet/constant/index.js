import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '容器组名称',
    sortable: true,
    fixed: true,
    // width: '150px'
  },
  {
    id: 'nodeStatus',
    label: '容器组状态',
    sortable: true,
    // width: '150px'
  },
  {
    id: 'ip',
    label: '容器组 IP',
    sortable: true,
    // width: '150px'
  },
  {
    id: 'cpu',
    label: 'CPU (m)',
    sortable: true,
    // width: '150px'
  },
  {
    id: 'memory',
    label: '内存 (Gi)',
    sortable: true,
    // width: '150px',
  },
  {
    id: 'container',
    label: '重启次数',
    sortable: true,
    // width: '120px'
  },
  {
    id: 'req',
    label: '调度次数',
    width: "180px"
  },
]


export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(3, 7)',
    "nodeStatus|1": ['运行中(3/4)', '已暂停(1/1)', '已完成(1/1)'],
    nodeType: '控制节点',
    ip: "25.2.20.182",
    memory2: '12.28Gi',
    container: "0/0",
    req: 0
  }]
})


export const containerLineData = Mock.mock({
  fields: [
    {
      name: '已用容量',
      flied: 'yxz'
    },
    {
      name: '已用容量',
      flied: 'yxz'
    },
  ],
  // 'data|10': [
  //   {
  //     name: '@date',
  //     yxz: '@integer(0 ,10)'
  //   }
  // ]
  data: [
    {
      name: "15:30",
      yxz: '@integer(0 ,10)'
    },
    {
      name: "15:45",
      yxz: '@integer(0 ,10)'
    },
    {
      name: "16:00",
      yxz: '@integer(0 ,10)'
    },
    {
      name: "16:15",
      yxz: '@integer(0 ,10)'
    },
  ]
})
