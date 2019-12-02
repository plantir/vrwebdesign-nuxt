const path = require('path')
function fileUpload(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'fileUpload.js'
  })
}

module.exports = fileUpload
