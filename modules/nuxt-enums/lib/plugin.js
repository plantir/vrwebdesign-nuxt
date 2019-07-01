import Vue from 'vue'



export default (ctx, inject) => {
  let enums = <%= serialize(options.enums) %>
  Vue.filter('enum', (value, key) => {
    if(!enums || !enums[key]){
      return value
    }
    return enums[key][value]
  })
  inject('enum', enums)
}
