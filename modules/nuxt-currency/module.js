const path = require('path')
function Currency(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'currency.js'
  })
}

module.exports = Currency
