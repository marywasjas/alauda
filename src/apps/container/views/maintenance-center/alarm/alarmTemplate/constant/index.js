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
  'data': []
})
