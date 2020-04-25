const path = require('path')
const fs = require('fs')

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

function axiosModule(_moduleOptions) {
  let enums = {}
  var enum_path = path.join(this.options.rootDir, 'enums')
  if (fs.existsSync(enum_path)) {
    // Do something
    fs.readdirSync(enum_path).forEach(function (file) {
      if (file.includes('.ts') || file.includes('.js')) {
        var file_path = path.join(enum_path, file)
        delete require.cache[require.resolve(file_path)]
        //  to have this service in enums
        const file_name = file.replace(/\.(js|ts)/, '')
        enums[file_name] = _interopDefault(require(file_path))
        let convertToSelect = Object.keys(enums[file_name]).map((key) => {
          return {
            text: enums[file_name][key],
            value: isNaN(key) ? key : parseInt(key),
          }
        })
        enums[file_name]['toSelect'] = convertToSelect
      }
    })
  }
  this.options.enums = enums

  this.addPlugin({
    ssr: true,
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'enums.js',
    options: this.options,
  })
}

module.exports = axiosModule
module.exports.meta = require('../package.json')
