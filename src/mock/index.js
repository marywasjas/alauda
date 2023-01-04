import Mock from 'mockjs'
// 设置随机生成模拟数据格式
const datas = Mock.mock({
  'array|3': [
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

Mock.mock('/api/alarmlist', 'get', () => {
  // console.log(data)
  const { array } = datas
  return {
    total: array.length,
    code: 250,
    data: array
  }
})

/** post请求删除表格数据 */
Mock.mock('/api/deleteAlarmlist', 'post', (params) => {
  let { array } = datas
  const deleteObj = JSON.parse(params.body)
  console.log(deleteObj, 'deleteObj')
  const deleteId = deleteObj.id
  console.log(deleteId, 'deleteId')
  array = array.filter(val => val.id !== deleteId)
  console.log('array', array)
  return {
    code: '0',
    message: 'success',
    data: []
  }
})
