const path = require('path')

this.addPlugin({
  src: path.resolve(__dirname, 'plugin.js'),
  fileName: 'plugin.js',
})

module.exports = permissionModule
module.exports.meta = require('../package.json')


