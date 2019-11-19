const path = require('path')
function dataGridModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'dataGrid.js'
  })
}

module.exports = dataGridModule
