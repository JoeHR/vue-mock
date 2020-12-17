const fs = require('fs')
const path = require('path')

if (typeof require.context === 'undefined') {
  require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.[jt]s$/) => {
    const files = {}

    function readDirectory (directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file)

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath)

          return
        }

        if (!regularExpression.test(fullPath)) return

        files[fullPath] = true
      })
    }

    readDirectory(path.resolve(__dirname, base))

    function Module (file) {
      // return require(path.resolve(__dirname, base, file))
      return require(file)
    }

    Module.keys = () => Object.keys(files)

    return Module
  }
}

const routesFiles = require.context('./routeModules', true, /.js$/)

const routes = routesFiles.keys().reduce((module, modulePath) => {
  const m = routesFiles(modulePath)
  const routesArr = Object.values({ ...m }).map(v => v)
  module.push(...routesArr)
  return module
}, [])

module.exports = routes
