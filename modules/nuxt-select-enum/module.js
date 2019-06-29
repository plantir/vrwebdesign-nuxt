const path = require('path')
function selectEnum(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'selectEnum.js'
  })
}

module.exports = selectEnum
