const path = require('path')
function loaderModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'loader.js'
  })
}

module.exports = loaderModule
module.exports.meta = require('../package.json')
