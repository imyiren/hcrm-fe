import request from '@/utils/request'

export function listPropByKey(key) {
  return request({
    url: '/api/open/support/prop',
    method: 'get',
    params: { key }
  })
}
