import api from '../http'

// mock 请求
export function queryUser2List () {
  const url = '/vue-mock/user/2list'
  return api.get(url)
}

// 真实线上请求
export function realHttp () {
  const url = '/api/category/list'
  return api.get(url)
}
