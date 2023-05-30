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
    { projectName: "federateai", usage: "4749.97", total: "92.73" },
    { projectName: "ebaims", usage: "207.33", total: "4.05" },
    { projectName: "test-kubectl-cp", usage: "56.22", total: "1.10" },
    { projectName: "chaos", usage: "44.46", total: "0.87" },
    { projectName: "faq", usage: "43.04", total: "0.84" },
    { projectName: "其他项目", usage: "0.00", total: "0.00" },
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
    { projectName: "federateai", usage: "4749.97", total: "92.73" },
    { projectName: "ebaims", usage: "207.33", total: "4.05" },
    { projectName: "test-kubectl-cp", usage: "56.22", total: "1.10" },
    { projectName: "chaos", usage: "44.46", total: "0.87" },
    { projectName: "faq", usage: "43.04", total: "0.84" },
    { projectName: "其他项目", usage: "0.00", total: "0.00" },
  ]
})
