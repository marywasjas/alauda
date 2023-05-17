import Mock from 'mockjs'
export const tableColumnList = [
  {
    id: 'name',
    label: '名称'
  },
  {
    id: 'version',
    label: '版本'
  },
  {
    id: 'status',
    label: '部署状态',
    sortable: true,
    // width: "180px"
  },

  {
    id: 'time',
    label: '部署时间',
    // sortable: true,
    // width: "180px"
  },
  {
    id: 'operation',
    label: '',
    width: '60px',
    fixed: 'right'
  }

]
export const tableData = Mock.mock({
  'data|10': [{
    name: '@word(7, 20)',
    time: '@date',
    'status|1': ['部署失败', '未部署', "部署成功"],
    "version|1": ["v3.8.2", "v3.8.23", "3.8.123"]
  }]
})
