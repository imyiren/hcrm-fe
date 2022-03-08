import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/uop/open/user/login',
    method: 'post',
    data
  })
}

export function getUserInfoBySession() {
  return request({
    url: '/uop/user/session',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/uop/user/logout',
    method: 'post'
  })
}
