import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'type',
    label: '资源类型',
  },
  {
    id: 'rules',
    label: '规则数',
  },
  {
    id: 'noticeStrategy',
    label: '通知策略',
  },
  {
    id: "time",
    label: "创建时间"
  },
  {
    id: 'operation',
    label: '',
    width: '60px',
    fixed: 'right'
  }
]
export const tableData = Mock.mock({
  'data': [
    {
      name: "alarmTemplate",
      type: "集群",
      rules: 1,
      noticeStrategy: "",
      time: "1 天前",

      ruleContent: [
        {
          rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
          type: "指标告警",
          level: "严重"
        }
      ]
    }
  ]
})
