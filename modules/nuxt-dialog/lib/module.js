const path = require('path')
function dialogModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'dialog.js'
  })
}

module.exports = dialogModule
module.exports.meta = require('../package.json')
