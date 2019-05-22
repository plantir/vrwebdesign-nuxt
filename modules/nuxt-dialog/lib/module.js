const path = require('path');
function dialogModule(_moduleOptions) {
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'dialog.js',
    options
  });
}

module.exports = dialogModule;
module.exports.meta = require('../package.json');
