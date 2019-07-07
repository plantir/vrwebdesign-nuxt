
import Vue from 'vue'

export default (ctx, inject) => {

    let permissions = <%= serialize(options.permissions) %>

        Object.keys(permissions).forEach(item => {
            Vue.directive(`${item}`, {
                inserted: permissions[item](el, binding, vnode, ctx)
            })
        })
    inject('permissions', permissions)
}
