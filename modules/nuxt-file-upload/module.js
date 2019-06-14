const path = require('path')
function fileUpload(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'fileUpload.js'
  })
}

module.exports = fileUpload
