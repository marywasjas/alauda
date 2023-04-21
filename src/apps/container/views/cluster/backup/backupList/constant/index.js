import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'type',
    label: '类型',
  },
  {
    id: 'status',
    label: '状态',
  },
  {
    id: 'time',
    label: '下次备份时间',
  },
  {
    id: 'operation',
    label: '',
    // fixed: 'right'
    width: '60px'
  }
]
export const tableData = Mock.mock({
  'data|2': [{
    "name|1": ["k01057", "k01337"],
    type: 'ETCD 备份',
    status: '已就绪',
    time: '@date',
  }]
})
