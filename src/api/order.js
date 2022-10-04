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

export function saveAuthor(data) {
  return request({
    url: '/hcrm/order/author',
    method: 'post',
    data
  })
}

export function saveMagazine(data) {
  return request({
    url: '/hcrm/order/magazine',
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

export function getOrderProcessDetail(data) {
  return request({
    url: '/hcrm/order/process/' + data,
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

