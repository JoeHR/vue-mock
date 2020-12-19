const chalk = require('chalk')
const chokidar = require('chokidar')
const path = require('path')
const Mock = require('mockjs')

// 存放 mock 文件的 目录
const mockDir = path.join(process.cwd(), 'mocks')

// mock 模拟 请求 response
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API || ''}${url}`),
    type: type || 'get',
    response (req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

// 读取 mock 文件中的 mock 配置,并注册 mock route
const registerRoutes = app => {
  let mockLastIndex

  const mocks = require('./routes.js')

  const mockForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })

  for (const mock of mockForServer) {
    app[mock.type](mock.url, mock.response)
    // app.get('/api/mock',(req,res)=>{
    //   return res.json({name:'zs'})
    // })
    mockLastIndex = app._router.stack.length  // 记录 devserver 中的的 app router 总长度
  }

  const mockRoutesLen = Object.keys(mockForServer).length

  return {
    // 记录 devserver app router 总长度
    mockRoutesLen: mockRoutesLen,
    // 计算得出 mocks中配置 的route 在 devserver app router 堆栈中的起始位置，以便用来动态删除和插入新的或修改的mock route
    mockStartIndex: mockLastIndex - mockRoutesLen
  }
}

// 删除缓存中的 mock 文件
const unregisterRoutes = () => {
  Object.keys(require.cache).forEach(v => {
    if (v.includes(mockDir)) {
      delete require.cache[require.resolve(v)]
    }
  })
}

module.exports = (app) => {
  const mockRoutes = registerRoutes(app)
  let mockRoutesLen = mockRoutes.mockRoutesLen
  let mockStartIndex = mockRoutes.mockStartIndex

  // 监听 mocks 目录下的 mock 文件修改,一旦目录里面的文件修改，就进行 清除 mock 读取文件的缓存 ，再重新读取mock 文件
  chokidar.watch(mockDir, {
    ignored: /index/,  // 忽略 掉 mocks目录下的index 文件
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        app._router.stack.splice(mockStartIndex, mockRoutesLen)

        // unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLen = mockRoutes.mockRoutesLen
        mockStartIndex = mockRoutes.mockStartIndex
        console.log('🚀👻👻👻 ~ file: index.js ~ line 26 ~ path', chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
