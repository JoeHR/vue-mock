module.exports = {
  devServer: {
    before: require('./mocks')
  },
  configureWebpack (config) {
    return {
      module: {
        unknownContextCritical: false,
        exprContextCritical: false
      }
    }
  }
}
