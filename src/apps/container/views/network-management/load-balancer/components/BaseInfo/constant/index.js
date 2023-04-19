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
    },
    {
      name: '已用容量',
      flied: 'yxz'
    },
  ],
  // 'data|10': [
  //   {
  //     name: '@date',
  //     yxz: '@integer(0 ,10)'
  //   }
  // ]
  data: [
    {
      name: "15:30",
      yxz: '@integer(0 ,10)'
    },
    {
      name: "15:45",
      yxz: '@integer(0 ,10)'
    },
    {
      name: "16:00",
      yxz: '@integer(0 ,10)'
    },
    {
      name: "16:15",
      yxz: '@integer(0 ,10)'
    },
  ]
})

export const containerData = Mock.mock([
  // {
  //   label: '可用容量',
  //   value: '@integer(0 ,100)'
  // },
  // {
  //   label: '已用容量',
  //   value: '@integer(0 ,100)'
  // }
  {
    label: '总核',
    value: '192'
  },
  {
    label: '核',
    value: '126.12'
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