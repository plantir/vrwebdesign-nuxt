import Vue from 'vue'

export default (ctx, inject) => {

    Vue.directive('permission', {
        inserted: function (el, binding, vnode) {
            let hasAccess = false;
            const permissionObject = binding.value;
            if (permissionObject) {
                hasAccess = check(permissionObject)
            }
            if (!hasAccess)
                vnode.elm.parentElement.removeChild(vnode.elm)
        }
    })

    function check(permissionObject) {
        return ctx.store.getters['auth/isAuthorized'](permissionObject);
    }

    inject('permissions', check)
}

