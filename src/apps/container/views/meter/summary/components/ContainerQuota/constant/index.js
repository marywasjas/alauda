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
    { projectName: "region-devops", usage: "56.22", total: "1.10" },
    { projectName: "federateai", usage: "44.46", total: "0.87" },
    { projectName: "ebaims", usage: "43.04", total: "0.84" },
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
      spaceName: "kube-system",
      cluster: "global",
      project: "cpass-system",
      usage: "2053.38",
      total: "31.17"
    },
    {
      spaceName: "cpass-system",
      cluster: "global",
      project: "cpass-system",
      usage: "1053.78",
      total: "18.56"
    },
    {
      spaceName: "cpass-system",
      cluster: "region",
      project: "cpass-system",
      usage: "874.62",
      total: "15.40"
    },
    {
      spaceName: "kube-system",
      cluster: "region",
      project: "",
      usage: "776.26",
      total: "13.67"
    },
    {
      spaceName: "operators",
      cluster: "region",
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
    { projectName: "cpass-system", usage: "44155.60", total: "83.56" },
    { projectName: "baas", usage: "3071.99", total: "5.81" },
    { projectName: "faq", usage: "1754.56", total: "3.32" },
    { projectName: "region-decops", usage: "1310.98", total: "2.48" },
    { projectName: "federateai", usage: "1286.50", total: "2.43" },
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
      cluster: "region",
      project: "cpass-system",
      usage: "23024.54",
      total: "39.89"
    },
    {
      spaceName: "cpass-system",
      cluster: "global",
      project: "cpass-system",
      usage: "12262.29",
      total: "21.24"
    },
    {
      spaceName: "cpass-system",
      cluster: "region",
      project: "cpass-system",
      usage: "8830.95",
      total: "15.30"
    },
    {
      spaceName: "kube-system",
      cluster: "region",
      project: "",
      usage: "4029.74",
      total: "6.98"
    },
    {
      spaceName: "operators",
      cluster: "region",
      project: "",
      usage: "2157.26",
      total: "3.74"
    },
  ]
})