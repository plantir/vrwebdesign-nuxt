const path = require('path')
function authorizationModule() {
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'authorization.js'
  })
}

module.exports = authorizationModule
module.exports.meta = require('../package.json')
