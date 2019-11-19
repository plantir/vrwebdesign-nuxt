const path = require('path')
function globalModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'global.js'
  })
}

module.exports = globalModule
