const path = require('path')
function ckEditor(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'ckEditor.js'
  })
}

module.exports = ckEditor
