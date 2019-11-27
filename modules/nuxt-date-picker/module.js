const path = require('path')
function datePicker(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'datePicker.js'
  })
}

module.exports = datePicker
