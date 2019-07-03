import Vue from 'vue'



export default (ctx, inject) => {
  let enums = <%= serialize(options.enums) %>
    Vue.filter('enum', (value, key) => {
      let result;
      if (!enums || !enums[key]) {
        result = value
      }

      const temp = enums[key];
      Object.keys(temp).forEach(item => {
        if (item === key) {
          result = temp[item][value]
        }
      })

      return result
    })
  inject('enum', enums)
}
