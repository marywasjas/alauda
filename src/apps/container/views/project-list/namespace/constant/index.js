import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称',
  },
  {
    id: 'cluster',
    label: '集群',
  },
  {
    id: 'time',
    label: '创建时间',
  },
  {
    id: 'operation',
    label: '',
    // fixed: 'right'
    width: '60px'
  }
]
export const tableData = Mock.mock({
  'data|20': [{
    "name|1": ["adminceshiorg1", "adminceshiorg2", "admincipshiorg1", "admincipshiorg2"],
    "cluster|1": ["region(region)", "global(global)"],
    time: '@date',
  }]
})
