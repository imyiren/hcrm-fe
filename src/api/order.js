import request from '@/utils/request'

export function saveOrder(data) {
  return request({
    url: '/hcrm/order',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: '/hcrm/order',
    method: 'post',
    data
  })
}

export function getOrder(data) {
  return request({
    url: '/hcrm/order/' + data,
    method: 'get'
  })
}

export function listOrder(data) {
  return request({
    url: '/hcrm/order',
    method: 'get',
    params: data
  })
}

