import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'projectName',
    label: '项目名称',
    width: "300px"
  },
  {
    id: 'usage',
    label: '使用量 (核 * 小时)'
  },
  {
    id: 'total',
    label: '总量占比',
    width: "240px"
  },
]
export const tableData = Mock.mock({
  'data': [
    { projectName: "cpass-system", usage: "4749.97", total: "92.73" },
    { projectName: "baas", usage: "207.33", total: "4.05" },
    { projectName: "federateai", usage: "56.22", total: "1.10" },
    { projectName: "faq", usage: "44.46", total: "0.87" },
    { projectName: "region-devops", usage: "43.04", total: "0.84" },
    { projectName: "其他项目", usage: "0.00", total: "0.00" },
  ]
})


export const tableColumnList2 = [
  {
    id: 'spaceName',
    label: '命名空间名称',
  },
  {
    id: 'cluster',
    label: '所属集群'
  },
  {
    id: 'project',
    label: '所属项目',
  },
  {
    id: 'usage',
    label: '使用量 (核 * 小时)'
  },
  {
    id: 'total',
    label: '总量占比',
  },
]
export const tableData2 = Mock.mock({
  'data': [
    {
      spaceName: "cpaas-system",
      cluster: "global",
      project: "cpaas-system",
      usage: "2053.38",
      total: "31.17"
    },
    {
      spaceName: "baas-dev",
      cluster: "region",
      project: "baas",
      usage: "1053.78",
      total: "18.56"
    },
    {
      spaceName: "cpaas-system",
      cluster: "region",
      project: "cpaas-system",
      usage: "874.62",
      total: "15.40"
    },
    {
      spaceName: "faq-robot",
      cluster: "region",
      project: "faq",
      usage: "776.26",
      total: "13.67"
    },
    {
      spaceName: "region-devops-devops",
      cluster: "region",
      project: "federateai",
      usage: "593.07",
      total: "10.45"
    },
    {
      spaceName: "其他命名空间",
      cluster: "",
      project: "",
      usage: "593.07",
      total: "10.45"
    },
  ]
})


export const tableColumnList3 = [
  {
    id: 'projectName',
    label: '项目名称',
    width: "300px"
  },
  {
    id: 'usage',
    label: '使用量 (GB * 小时)'
  },
  {
    id: 'total',
    label: '总量占比',
    width: "240px"
  },
]
export const tableData3 = Mock.mock({
  'data': [
    { projectName: "cpass-system", usage: "4749.97", total: "92.73" },
    { projectName: "baas", usage: "207.33", total: "4.05" },
    { projectName: "federateai", usage: "56.22", total: "1.10" },
    { projectName: "faq", usage: "44.46", total: "0.87" },
    { projectName: "region-devops", usage: "43.04", total: "0.84" },
    { projectName: "其他项目", usage: "0.00", total: "0.00" },
  ]
})

export const tableColumnList4 = [
  {
    id: 'spaceName',
    label: '命名空间名称',
  },
  {
    id: 'cluster',
    label: '所属集群'
  },
  {
    id: 'project',
    label: '所属项目',
  },
  {
    id: 'usage',
    label: '使用量 (GB * 小时)'
  },
  {
    id: 'total',
    label: '总量占比',
  },
]
export const tableData4 = Mock.mock({
  'data': [
    {
      spaceName: "cpaas-system",
      cluster: "global",
      project: "cpaas-system",
      usage: "2053.38",
      total: "31.17"
    },
    {
      spaceName: "baas-dev",
      cluster: "region",
      project: "baas",
      usage: "1053.78",
      total: "18.56"
    },
    {
      spaceName: "cpaas-system",
      cluster: "region",
      project: "cpaas-system",
      usage: "874.62",
      total: "15.40"
    },
    {
      spaceName: "faq-robot",
      cluster: "region",
      project: "faq",
      usage: "776.26",
      total: "13.67"
    },
    {
      spaceName: "region-devops-devops",
      cluster: "region",
      project: "federateai",
      usage: "593.07",
      total: "10.45"
    },
    {
      spaceName: "其他命名空间",
      cluster: "",
      project: "",
      usage: "593.07",
      total: "10.45"
    },
  ]
})