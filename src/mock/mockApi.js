// 引入mockApi模块
import Mock from 'mockjs'
// 设置随机生成模拟数据格式
const alarmList = Mock.mock({
  'list|3': [// 生成一个 length是 3 的数组list
    {
      'name|+1': [
        'AMD',
        'CMD',
        'UMD'
      ],
      'resource|+1': [
        'AMD2',
        'CMD2',
        'UMD2'
      ],
      'policy|+1': [
        'AMD4',
        'CMD4',
        'UMD4'
      ],
      'status|+1': [
        'AMD5',
        'CMD5',
        'UMD5'
      ],
      'creater|+1': [
        'AMD6',
        'CMD6',
        'UMD6'
      ],
      'createTime|+1': [
        'AMD7',
        'CMD7',
        'UMD7'
      ],
      'id|+1': [
        '1',
        '2',
        '3'
      ]
    }
  ]
})
