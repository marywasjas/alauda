import Mock from 'mockjs'

export const tableColsCluster = [
  { label: "名称", id: "name" },
  { label: "集群类型", id: "cluster" },
  { label: "风险状态", id: "status" },
  { label: "", id: "desc", width: "60px" },
]

export const tableDataCluster = Mock.mock({
  'data': [{ name: "region", cluster: "自建", status: "预警", desc: "描述" },]
})

export const tableColsNode = [
  { label: "名称", id: "name" },
  { label: "节点类型", id: "node" },
  { label: "集群", id: "cluster" },
  { label: "风险状态", id: "status" },
  { label: "", id: "desc", width: "60px" },
]

export const tableDataNode = Mock.mock({
  'data|6': [
    {
      "name|1": ["25.2.20.156", "25.2.20.182", "25.2.20.71"],
      "node|1": ["控制节点", "计算节点"],
      "cluster|1": ["region", "global"],
      status: "预警",
      desc: "描述"
    },]
})

export const tableColsContainer = [
  { label: "名称", id: "name" },
  { label: "命名空间", id: "namespace" },
  { label: "集群", id: "cluster" },
  { label: "风险状态", id: "status" },
  { label: "", id: "desc", width: "60px" },
]

export const tableDataContainer = Mock.mock({
  'data|6': [
    {
      "name|1": ["timeout-124325-4dasf9", "timeout-124325-7dfsdf9", "timeout-9843455-f78sdf9"],
      "namespace|1": ["chaos-dev", "region-devops-devops"],
      "cluster|1": ["region", "global"],
      status: "故障",
      desc: "描述"
    },]
})

export const tableColsCerf = [
  { label: "名称", id: "name" },
  { label: "集群", id: "cluster" },
  { label: "证书状态", id: "status" },
  { label: "", id: "desc", width: "60px" },
]

export const tableDataCerf = Mock.mock({
  'data': []
})