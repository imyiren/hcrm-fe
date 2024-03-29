import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost:8000',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'Application/json; UTF-8'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['session-id'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // response 就是后端的json返回值
    const res = response.data
    const { noticeMsg } = res
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: noticeMsg || res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 401
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('登录失效，请重新登录！', '会话过期提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(noticeMsg || res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error.response.status)
    if (error.response.status === 404) {
      Message({
        message: '请求失败，请求的接口不存在！',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
    if (error.response.status === 502) {
      Message({
        message: '请求服务异常，请联系研发人员！',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
