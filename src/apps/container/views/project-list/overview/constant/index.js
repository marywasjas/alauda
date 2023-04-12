import Mock from 'mockjs'

export const tableColumnList = [
  {
    id: 'name',
    label: '用户名/显示名称',
    sortable: true
  },
  {
    id: 'userRole',
    label: '用户角色',
  },

  {
    id: 'userGroup',
    label: "用户组",
  },
  {
    id: 'importTime',
    label: '导入时间',
    fixed: 'right',
    width: '80px'
  }
]

export const tableData = Mock.mock({
  'data|20': [
    //   {
    //   "name|1": ["k01057", "k01337", "k01217", "k01457"],
    //   desc: '@word(3, 7)',
    //   userGroup: '未分组',
    //   time: '@date',
    // }
  ]
})

export const tableColumnList2 = [
  {
    id: 'name',
    label: '用户名/显示名称',
  },
  {
    id: 'userGroup',
    label: '用户组',
  },
]

export const tableData2 = Mock.mock({
  'data|20': [{
    "name|1": ["k01057", "k01337", "k01217", "k01457"],
    desc: '@word(3, 7)',
    userGroup: '未分组',
    time: '@date',
  }]
})

export const tableColumnList3 = [
  {
    id: 'func',
    label: '功能',
  },
  {
    id: 'view',
    label: '查看',
  },
  {
    id: 'create',
    label: '创建',
  },
  {
    id: 'update',
    label: '更新',
  },
  {
    id: 'delete',
    label: '删除',
  },
]
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
    value: '@integer(0 ,100)',
    itemStyle: {
      color: '#29C78E'
    }
  },
  {
    label: '异常',
    value: '@integer(0 ,100)',
    itemStyle: {
      color: '#F56C6C'
    }
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
    name: '@word(3, 7)',
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
  'data|5': [{
    name: '@word(3, 7)',
    znc: '@integer(0 ,10000)',
    zync: '@integer(0 ,1000)',
    zb: '@integer(0 ,100)',
    sjcpu: '@integer(0 ,10000)',
    fpcpu: '@integer(0 ,10000)',
    pre: '@integer(0 ,100)'
  }]
})
