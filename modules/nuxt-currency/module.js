const path = require('path')
function Currency(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'currency.js'
  })
}

module.exports = Currency
