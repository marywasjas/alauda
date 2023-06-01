import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: "operator",
    label: "操作人",
  },
  {
    id: "operation",
    label: "操作",
  },
  {
    id: "resourceName",
    label: "资源名称/类型",
    width: "200px"
  },
  {
    id: "cluster",
    label: "集群",
  },
  {
    id: "namespace",
    label: "命名空间",
  },
  {
    id: "clientIP",
    label: "客户端 IP",
  },
  {
    id: "result",
    label: "操作结果"
  },
  {
    id: "time",
    label: "操作时间"
  },
  {
    id: "details",
    label: "",
    width: "50px"
  },
]
export const tableData = Mock.mock({
  'data|40': [{
    // name: '@word(3, 7)',
    // "status|1": ["正常", "异常"],
    // "cluster|1": ["global", "region"],
    // "nodeIP|1": ["25.2.20.182", "25.2.20.2", "25.2.20.72", "25.2.20.90",],
    // time: "@date"

    "operator|1": ["k00345", "k00312", "k00342", "k00324", "k00123"],
    "operation|1": ["修改", "更新", "创建"],
    "resourceName|1": ["python", "faq-ui", "python-config", "nginx-fas324-bdfb4", "nginx-fdgdt4-34645g"],
    "type|1": ["pods(容器组)", "statefulsets(有状态副本集)", "configmaps(配置字典)"],
    cluster: "region",
    "namespace|1": ["federateai-training", "faq-robot", "chaos-dev"],
    clientIP: "25.25.22.5",
    "result|1": ["成功", "失败"],
    time: "@date"
  }]
})
