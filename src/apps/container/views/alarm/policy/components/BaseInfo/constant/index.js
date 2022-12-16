import Mock from 'mockjs'
export const portColumnList = [{
  id: 'rule',
  label: '规则'
}, {
  id: 'warningType',
  label: '告警类型'
}, {
  id: 'level',
  label: '等级'
}, {
  id: 'status',
  label: '状态'
},
{
  id: 'isEnable',
  label: '启用/禁用'
}]
export const portData = Mock.mock({
  'data|5': [{
    'id|+1': 1,
    rule: '@word(3, 7)',
    'warningType|1': ['指标告警'],
    'level|1': ['严重'],
    'status|1': ['正常'],
    'isEnable|1': [false, true],
    filterTime: '近 1 小时',
    containerLineData: {
      fields: [
        {
          name: 'test',
          flied: 'yxz'
        }
      ],
      'data|10': [{
        name: '@date',
        yxz: '@integer(0 ,10)'
      }]
    }
  }]
})
export const containerColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'limit',
  label: '资源限额'
}, {
  id: 'restartNum',
  label: '重启次数'
}, {
  id: 'ip',
  label: '容器组IP'
}, {
  id: 'node',
  label: '节点'
}, {
  id: 'createtime',
  label: '创建时间'
}]
export const containerData = Mock.mock({
  'data|3': [{
    name: '@word(10, 20)',
    status: "@pick(['启用', '停用'])",
    limit: '@integer(0, 10)',
    restartNum: '@integer(0, 10)',
    ip: '@ip',
    node: '@word(5, 10)',
    createtime: '@date'
  }]
})
