import Mock from 'mockjs'

const clusetrList = {
  array: [

    {
      name: "region",
      status: "正常",
      type: "自建",
      node: "12",
      arch: "x86",
      kubernete: "1.21.10",

    },
  ]
}

Mock.mock('/api/clusterList', 'get', () => {
  const { array } = clusetrList
  return {
    total: array.length,
    code: 250,
    data: array
  }
})
