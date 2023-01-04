const Mock = require('mockjs')
// 资源配额
const resourceData = Mock.mock([
  {
    name: 'CPU',
    percent: '@integer(0 ,100)',
    description: '0.5/5核',
    ysy: '0.5核',
    zpe: '5核'
  },
  {
    name: '内存',
    percent: '@integer(0 ,100)',
    description: '0.5/5Gi',
    ysy: '0.5Gi',
    zpe: '5Gi'
  },
  {
    name: '存储',
    percent: '@integer(0 ,100)',
    description: '0.5/5Gi',
    ysy: '0.5Gi',
    zpe: '5Gi'
  },
  {
    name: 'Pods数',
    percent: '@integer(0 ,100)',
    description: '1/不限制(512)个',
    ysy: '1个',
    zpe: '不限制(512)个'
  },
  {
    name: 'PVC数',
    percent: '@integer(0 ,100)',
    description: '0/不限制 个',
    ysy: '0',
    zpe: '不限制'
  }
])
// 事件
const eventData = Mock.mock([
  {
    label: '警告',
    value: '@integer(0 ,100)',
    itemStyle: {
      color: '#F56C6C'
    }
  },
  {
    label: '正常',
    value: '@integer(0 ,100)',
    itemStyle: {
      color: '#29C78E'
    }
  }
])
module.exports = [
  {
    url: '/container/resourceData',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: resourceData
      }
    }
  },
  {
    url: '/container/eventData',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: eventData
      }
    }
  }
]

