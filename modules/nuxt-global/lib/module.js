const path = require('path')
function toastModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'global.js'
  })
}

module.exports = toastModule
