const path = require('path')
function navbar(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'navbar.js'
  })
}

module.exports = navbar
