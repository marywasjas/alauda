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
export const containerLineData = Mock.mock({
  fields: [
    {
      name: '已用容量',
      flied: 'yxz'
    }
  ],
  'data|10': [{
    name: '@date',
    yxz: '@integer(0 ,10)'
  }]
})
export const containerData = Mock.mock([
  {
    label: '可用容量',
    value: '@integer(0 ,100)'
  },
  {
    label: '已用容量',
    value: '@integer(0 ,100)'
  }
])
