import Mock from 'mockjs'
export const columnList = [
  {
    id: 'time',
    label: '起止时间'
  },
  {
    id: 'category',
    label: '类别'
  },
  {
    id: 'name',
    label: '资源名称'
  },
  {
    id: 'type',
    label: '资源类型'
  },
  {
    id: 'number',
    label: '次数'
  },
  {
    id: 'reason',
    label: '原因'
  },
  {
    id: 'message',
    label: '消息',
    'show-overflow-tooltip': true
  },
  {
    id: 'operation',
    label: ''
  }
]
export const tableData = Mock.mock({
  'data|12': [
    {
      startTime: '@date',
      endTime: '@date',
      category: 'Warning',
      name: '@cword(3, 7)',
      type: 'Pod',
      number: '@integer(0 ,10000)',
      reason: 'BackOff',
      message: '@word(0 ,100)',
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
    }
  ]
})
