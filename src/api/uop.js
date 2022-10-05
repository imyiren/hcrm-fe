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

export function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/uop/storage/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function getValidationPic() {
  return request({
    url: '/uop/open/validation/pic',
    method: 'post'
  })
}

export function listUser(data) {
  return request({
    url: '/uop/user',
    method: 'get',
    params: data
  })
}

