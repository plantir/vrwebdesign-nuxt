const path = require('path')
const fs = require('fs')

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

function permissionModule(_moduleOptions) {
  let permissions = {}
  var permission_path = path.join(this.options.rootDir, 'permissions')
  if (fs.existsSync(permission_path)) {
    // Do something
    fs.readdirSync(permission_path).forEach(function (file) {
      if (file.includes('.ts') || file.includes('.js')) {
        var file_path = path.join(permission_path, file)
        delete require.cache[require.resolve(file_path)]

        const file_name = file.replace(/\.(js|ts)/, '')
        permissions[file_name] = _interopDefault(require(file_path))
      }
    })
  }
  this.options.permissions = permissions

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'permission.js',
    options: this.options
  })
}

module.exports = permissionModule
module.exports.meta = require('../package.json')
