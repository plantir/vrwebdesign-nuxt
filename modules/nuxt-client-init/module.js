const path = require('path');
function clientInitModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'clientInit.js'
  });
}

module.exports = clientInitModule;
module.exports.meta = require('../package.json');
