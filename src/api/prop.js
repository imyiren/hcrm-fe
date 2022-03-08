import request from '@/utils/request'

export function listPropByKey(key) {
  return request({
    url: '/hcrm/support/prop',
    method: 'get',
    params: { key }
  })
}
