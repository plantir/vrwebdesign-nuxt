const path = require('path')
function formGeneratorModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'formGenerator.js'
  })
}

module.exports = formGeneratorModule
