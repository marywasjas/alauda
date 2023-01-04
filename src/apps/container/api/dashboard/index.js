import request from '@/utils/request'

export function getResourceData(params) {
  return request({
    url: '/container/resourceData',
    method: 'get',
    params
  })
}
export function getEventData(params) {
  return request({
    url: '/container/eventData',
    method: 'get',
    params
  })
}
