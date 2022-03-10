import request from '@/utils/request'

export function save(data) {
  return request({
    url: '/hcrm/customer',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: '/hcrm/customer/' + data,
    method: 'get',
    data
  })
}

export function list(data) {
  return request({
    url: '/hcrm/customer',
    method: 'get',
    params: data
  })
}
