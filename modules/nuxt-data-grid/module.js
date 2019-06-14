const path = require('path')
function dialogModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'dataGrid.js'
  })
}

module.exports = dialogModule
