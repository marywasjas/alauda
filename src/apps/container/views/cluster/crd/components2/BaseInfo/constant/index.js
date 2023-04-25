import Mock from 'mockjs'

export const tableColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'status',
  label: '类型'
}]

export const tableData = Mock.mock({
  'data|5': [{
    name: '@cword(3, 7)',
    status: 'CrashLoopBackOff(0/1)'
  }]
})
