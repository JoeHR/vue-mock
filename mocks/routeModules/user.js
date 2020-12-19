const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const imageUri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    imageUri,
    platforms: ['a-platform']
  }))
}

const userList = {
  url: 'vue-mock/user/list',
  type: 'get',
  response: _ => {
    return {
      code: 200,
      data: List,
      msg: 'succsess'
    }
  }
}

const userDetail = {
  url: 'vue-mock/user/detail',
  type: 'get',
  response: _ => {
    return {
      code: 200,
      data: Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        content_short: 'mock data',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        imageUri,
        platforms: ['a-platform']
      }),
      msg: 'succsess213131'
    }
  }
}

const userList2 = {
  url: 'vue-mock/user/2list',
  type: 'get',
  response: _ => {
    return {
      code: 200,
      data: Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        imageUri,
        platforms: ['ab-platform']
      }),
      msg: 'succsess'
    }
  }
}

module.exports = {
  userList,
  userDetail,
  userList2
}
