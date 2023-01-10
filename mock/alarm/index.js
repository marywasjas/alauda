import { tableData } from "../../src/apps/container/views/application/nativeApp/constant/index"

import Mock from 'mockjs'

const alarmlist = Mock.mock({
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

const applicationlist = Mock.mock({
  // 'array|3': [{
  //   "data": "1997-03-08",
  //   "desc": "uxxw",
  //   "name": "evqhoxs",
  //   "status": "running",
  //   "statusText": "运行中(3/4)",
  //   "type": "之离最知族连条"
  // }]
  'array|3': [{
    name: '@word(3, 7)',
    desc: '@word(3, 7)',
    'status|1': ['running', 'stop'],
    'statusText|1': ['运行中(3/4)', '已暂停(1/1)'],
    type: '@cword(3, 7)',
    date: '@date'
  }]
})


const list = Mock.mock({
  'array|3': [{
    'id|+1': 1,
    name: '@word(10,30)',
    tag: ['app.kubernetes.io/instance: test', 'app.kubernetes.io/managed-by: Helm'],
    namespace: 'toda-elasticsearch-system',
    createtime: '2022-04-25 16:52:56',
    spec: {
      detail: {
        cluster_name: 'global',
        event: {
          count: 6713,
          eventTime: null,
          firstTimestamp: '2022-10-14T05:33:11Z',
          involvedObject: {
            apiVersion: 'v1',
            fieldPath: 'spec.containers{ubuntu}',
            kind: 'Pod',
            name: 'ubuntu-bq84l',
            namespace: 'toda-elasticsearch-system',
            resourceVersion: '519516627',
            uid: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0'
          },
          lastTimestamp: '2022-11-07T01:33:22Z',
          message:
            'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
          metadata: {
            creationTimestamp: '2022-11-07T01:18:15Z',
            name: 'ubuntu-bq84l.171dd899b971f3ab',
            namespace: 'toda-elasticsearch-system',
            resourceVersion: '603142979',
            uid: 'c61582db-0ce2-469d-8606-9854962ffc82'
          },
          reason: 'Pulled',
          reportingComponent: '',
          reportingInstance: '',
          source: {
            component: 'kubelet',
            host: '172.16.129.51'
          },
          type: 'Normal'
        },
        operation: 'Pulled',
        operator: 'kubelet@172.16.129.51',
        source: 'kubernetes'
      },
      log_level: 0,
      resource_id: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0',
      resource_type: 'Pod',
      time: '1667783895000000'
    }
  }]
})

Mock.mock('/api/alarmlist', 'get', () => {
  const { array } = alarmlist
  return {
    total: array.length,
    code: 250,
    data: array
  }
})

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

Mock.mock('/api/createAlarmlist', "post", (id) => {

})

Mock.mock(
  '/api/application', "get", () => {
    return {
      total: tableData.data.length,
      code: 250,
      data: tableData.data
    }
  }
)

// Mock.mock({
//   'number1|1-100.1-10': 1,
//   'number2|123.1-10': 1,
//   'number3|123.3': 1,
//   'number4|123.10': 1.123
// })
// =>
// {
//   "number1": 12.92,
//   "number2": 123.51,
//   "number3": 123.777,
//   "number4": 123.1231091814
// }

Mock.mock(
  '/api/resource', "get", () => {
    return {
      total: list.array.length,
      code: 250,
      data: list.array
    }
  }
)