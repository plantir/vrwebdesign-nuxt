import Vue from 'vue'

export default (ctx, inject) => {
  Vue.directive('authorization', {
    inserted: function(el, binding, vnode) {
      let hasAccess = false
      const permissionKey = binding.value
      if (permissionKey) {
        hasAccess = check(permissionKey)
      }
      if (!hasAccess) vnode.elm.parentElement.removeChild(vnode.elm)
    }
  })

  function check(permissionKey) {
    if (ctx.store.getters['authorization/isAuthorized']) {
      return ctx.store.getters['authorization/isAuthorized'](permissionKey)
    } else {
      console.log("ctx.store.getters['authorization/isAuthorized'] does not exist")
      return false
    }
  }

  inject('authorization', { check })
}
