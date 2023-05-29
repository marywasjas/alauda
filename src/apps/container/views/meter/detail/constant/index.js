import Mock from 'mockjs'
export const tableColumnList = [
  { label: "容器组名称", id: "container", sortable: true, width: "135px" },
  { label: "所属命名空间名称", id: "namespace" },
  { label: "所属集群", id: "cluster", },
  { label: "所属项目", id: "project" },
  { label: "CPU 使用总量", id: "cpu", sortable: true, width: "135px" },
  { label: "内存使用总量", id: "memory", sortable: true, width: "130px" },
  { label: "开始时间", id: "startTime", },
  { label: "结束时间", id: "endTime", },
]

export const tableData = Mock.mock({
  'data|20': [

    {
      container: "peer01-admin",
      namespace: "adminipdasfda",
      cluster: "region",
      project: "baas",
      cpu: "0.35",
      memory: "1.74",
      startTime: "00:00:00",
      endTime: "10:00:00"
    },

  ]
})

