const path = require('path')
function chart(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'chart.js'
  })
}

module.exports = chart
