import request from '@/utils/request'

export function save(data) {
  return request({
    url: '/hcrm/customer',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: '/hcrm/customer',
    method: 'get',
    data
  })
}
