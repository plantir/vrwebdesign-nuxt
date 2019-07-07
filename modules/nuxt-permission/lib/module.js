const path = require('path')

this.addPlugin({
  src: path.resolve(__dirname, 'plugin.js'),
  fileName: 'authorization.js',
})

module.exports = authorizationModule
module.exports.meta = require('../package.json')


