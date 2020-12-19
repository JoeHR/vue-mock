import Vue from 'vue'

const directivesFiles = require.context('./', true, /.js$/)

const directives = directivesFiles.keys().reduce((module, modulePath) => {
  const name = modulePath.replace(/^.\/(.*)\.js/, '$1')
  const value = directivesFiles(modulePath)
  if (name !== 'index') {
    module.push({ name, directive: value.default })
  }
  return module
}, [])

directives.forEach(v => {
  console.log('🚀👻👻👻 ~ file: index.js ~ line 13 ~ v', v)
  Vue.directive(v.name, v.directive)
})
