import Mock from 'mockjs'
// 资源配额
export const resourceData = Mock.mock([
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
export const eventData = Mock.mock([
  {
    label: '警告',
    value: '@integer(0 ,100)'
  },
  {
    label: '正常',
    value: '@integer(0 ,100)'
  }
])
// 应用
export const applicationData = Mock.mock([
  {
    label: '运行中',
    value: '@integer(0 ,100)'
  },
  {
    label: '部分运行',
    value: '@integer(0 ,100)'
  },
  {
    label: '处理中',
    value: '@integer(0 ,100)'
  },
  {
    label: '失败/异常',
    value: '@integer(0 ,100)'
  },
  {
    label: '已停止',
    value: '@integer(0 ,100)'
  },
  {
    label: '无计算组件',
    value: '@integer(0 ,100)'
  }
])
// 计算组件
export const computeData = Mock.mock({
  fields: [
    {
      name: '运行中',
      flied: 'yxz'
    },
    {
      name: '处理中',
      flied: 'clz'
    },
    {
      name: '已停止',
      flied: 'ytz'
    }
  ],
  data: [
    {
      label: '部署',
      yxz: '@integer(0 ,10)',
      clz: '@integer(0 ,10)',
      ytz: '@integer(0 ,10)'
    },
    {
      label: '有状态副本集',
      yxz: '@integer(0 ,10)',
      clz: '@integer(0 ,10)',
      ytz: '@integer(0 ,10)'
    },
    {
      label: '守护进程集',
      yxz: '@integer(0 ,10)',
      clz: '@integer(0 ,10)',
      ytz: '@integer(0 ,10)'
    }
  ]
})
// 容器组
export const containerData = Mock.mock([
  {
    label: '运行中',
    value: '@integer(0 ,100)'
  },
  {
    label: '异常',
    value: '@integer(0 ,100)'
  }
])
export const containerColumnList = [{
  id: 'name',
  label: '名称'
}, {
  id: 'status',
  label: '状态'
}, {
  id: 'reason',
  label: '原因',
  'show-overflow-tooltip': true
}, {
  id: 'date',
  label: '触发时间'
}]
export const containerList = Mock.mock({
  'data|10': [{
    name: '@cword(3, 7)',
    status: 'CrashLoopBackOff(0/1)',
    reason: 'back-off 5m0s restarting failed container=ubuntu pod=ubuntu-rdkrb_toda-elasticsearch-system(4e048e5a-1903-43e3-bd18-853a39c92e23)',
    date: '@date',
    'symbolSize': '@integer(50, 100)',
    'draggable': true,
    itemStyle: {
      'color': '@color'
    }
  }]
})
export const containerLineData = Mock.mock({
  fields: [
    {
      name: '运行中',
      flied: 'yxz'
    },
    {
      name: '异常',
      flied: 'yc'
    }
  ],
  'data|10': [{
    name: '@date',
    yxz: '@integer(0 ,10)',
    yc: '@integer(0 ,10)'
  }]
})
// 资源使用率
export const resourceLineData = Mock.mock({
  fields: [
    {
      name: 'cpu',
      flied: 'cpu'
    },
    {
      name: '内存',
      flied: 'nc'
    }
  ],
  'data|10': [{
    name: '@date',
    cpu: '@integer(0 ,100)',
    nc: '@integer(0 ,100)'
  }]
})
// 资源使用量 Top5
export const topColumnListnc = [{
  id: 'name',
  label: '容器组名称'
}, {
  id: 'zb',
  label: '内存(Mi)'
}]
export const topColumnListcpu = [{
  id: 'name',
  label: '容器组名称'
}, {
  id: 'pre',
  label: 'CPU(m)'
}]
export const topList = Mock.mock({
  'data|12': [{
    name: '@cword(3, 7)',
    znc: '@integer(0 ,10000)',
    zync: '@integer(0 ,1000)',
    zb: '@integer(0 ,100)',
    sjcpu: '@integer(0 ,10000)',
    fpcpu: '@integer(0 ,10000)',
    pre: '@integer(0 ,100)'
  }]
})
