import request from '@/utils/request'

export function saveCustomer(data) {
  return request({
    url: '/hcrm/customer',
    method: 'post',
    data
  })
}

export function getCustomer(data) {
  return request({
    url: '/hcrm/customer/' + data,
    method: 'get',
    data
  })
}

export function listCustomer(data) {
  return request({
    url: '/hcrm/customer',
    method: 'get',
    params: data
  })
}
