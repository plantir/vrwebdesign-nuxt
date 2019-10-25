const path = require('path')
function scrollBar(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'scroll-bar.js'
  })
}

module.exports = scrollBar
