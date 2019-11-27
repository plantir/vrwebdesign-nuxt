const path = require('path')
function badge(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'badge.js'
  })
}

module.exports = badge
