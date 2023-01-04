import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/vue-element-admin/service/list',
    method: 'get',
    params: query
  })
}

export function detail(id) {
  return request({
    url: '/vue-element-admin/service/detail',
    method: 'get',
    params: { id }
  })
}

export function create(data) {
  return request({
    url: '/vue-element-admin/service/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/vue-element-admin/service/update',
    method: 'post',
    data
  })
}
