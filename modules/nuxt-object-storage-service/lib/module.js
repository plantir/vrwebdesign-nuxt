const path = require('path')
function objectStorageServiceModule() {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'objectStorageService.js'
  })
}

module.exports = objectStorageServiceModule
module.exports.meta = require('../package.json')
