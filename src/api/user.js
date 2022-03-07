import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/open/user/login',
    method: 'post',
    data
  })
}

export function getInfo(sessionId) {
  return request({
    url: '/api/user/session',
    method: 'get',
    params: { sessionId }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
