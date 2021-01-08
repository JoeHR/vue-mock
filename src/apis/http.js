import axios from 'axios'
import { getToken } from '@/utils'

const CancelToken = axios.CancelToken

const instance = axios.create({
  baseURL: process.env.BASE_URL || '',
  timeout: 6000,
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  }
})

const pending = {}
const publicPath = [/^\/mock/, /^\/login/]

/**
 * 消除 axios 实例 每一次请求的 abort 标识
 * @param {*} key abort 取消标识
 * @param {*} isRequest http 阶段 true-请求阶段 false-响应阶段
 */
function removePending (key, isRequest = false) {
  if (pending[key] && isRequest) {
    pending[key]('cancel request')
  }
  delete pending[key]
}

instance.interceptors.request.use(config => {
  let isPublic = false
  publicPath.map(path => {
    isPublic = isPublic || path.test(config.url ? config.url : '')
    return isPublic
  })
  const token = getToken()
  if (token && !isPublic) {
    config.headers.Authorization = 'Bearer ' + token
  }
  const key = config.url + '&' + config.method
  removePending(key, true)
  config.cancelToken = new CancelToken(c => {
    pending[key] = c
  })
  // if (/getImageCode/.test(config.url)) {
  //   // 过滤 验证码接口
  //   config.responseType = 'arraybuffer'
  // }
  return config
}, err => {
  console.warn('🚀👻👻👻 ~ file: http.js ~ line 13 ~ err', err)
  Promise.reject(err)
})

instance.interceptors.response.use(response => {
  const { config, data, status } = response
  const key = config.url + '&' + config.method
  removePending(key)
  // 判断 http status 为 200
  if (status === 200) {
    return Promise.resolve(data)
  } else {
    return Promise.reject(response)
  }
}, axiosError => {
  if (axiosError.message !== 'cancel request') {
    console.warn(axiosError.message)
  }
  return Promise.reject(axiosError)
})

export default instance
