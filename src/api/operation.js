import request from '@/utils/request'

export function listOperation(data) {
  return request({
    url: '/hcrm/operation',
    method: 'get',
    params: data
  })
}

