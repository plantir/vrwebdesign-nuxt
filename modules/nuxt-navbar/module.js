const path = require('path')
function navbar(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'navbar.js'
  })
}

module.exports = navbar
