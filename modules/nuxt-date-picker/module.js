const path = require('path')
function datePicker(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'datePicker.js'
  })
}

module.exports = datePicker
