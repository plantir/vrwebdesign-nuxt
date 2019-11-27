const path = require('path')
function toastModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'toast.js'
  })
}

module.exports = toastModule
module.exports.meta = require('../package.json')
