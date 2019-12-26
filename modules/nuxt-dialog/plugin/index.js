import DialogComponent from './components/dialog.vue'
import DefaultView from './components/views/default.vue'
import AlertView from './components/views/alert.vue'
import ConfirmView from './components/views/confirm.vue'
import PromptView from './components/views/prompt.vue'
const DEFAULT_OPTION = {}
const mountIfNotMounted = (Vue, options, root) => {
  if (!root._dynamicContainer) {
    let node = document.createElement('div')
    if (options.wrapper) {
      options.wrapper.appendChild(node)
    } else {
      document.querySelector('#app').appendChild(node)
    }
    new Vue({
      parent: root,
      render: h => h(DialogComponent)
    }).$mount(node)
  }

  return root._dynamicContainer
}

const Plugin = {
  install(Vue, options = {}) {
    if (this.installed) {
      return
    }
    this.dialog = Object.assign({ ...DEFAULT_OPTION }, options)
    this.installed = true
    this.event = new Vue()
    this.rootInstance = null
    Vue.prototype.$dialog = {
      ok(ok_txt) {
        Plugin.dialog.ok_txt = ok_txt
        return this
      },
      cancel(cancel_txt) {
        Plugin.dialog.cancel_txt = cancel_txt
        return this
      },
      message(message) {
        Plugin.dialog.message = message
        return this
      },
      title(title) {
        Plugin.dialog.title = title
        return this
      },
      model(model) {
        Plugin.dialog.prompt = model
        return this
      },
      component(component) {
        Plugin.dialog.component = component
        return this
      },
      wrapper(wrapper) {
        Plugin.rootInstance._dynamicContainer = null
        options.wrapper = wrapper
        return this
      },
      warning() {
        Plugin.dialog.type = 'warning'
        return this
      },
      info() {
        Plugin.dialog.type = 'info'
        return this
      },
      question() {
        Plugin.dialog.type = 'question'
        return this
      },
      success() {
        Plugin.dialog.type = 'success'
        return this
      },
      alert(dialog = {}) {
        dialog = Object.assign(Plugin.dialog, dialog)
        dialog.component = AlertView
        dialog.ok_txt = dialog.ok_txt || 'باشه'
        return this.show(dialog)
      },
      prompt(dialog = {}) {
        dialog = Object.assign(Plugin.dialog, dialog)
        dialog.component = PromptView
        dialog.ok_txt = dialog.ok_txt || 'تمام'
        dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم'
        return this.show(dialog)
      },
      confirm(dialog = {}) {
        dialog = Object.assign(Plugin.dialog, dialog)
        dialog.component = ConfirmView
        dialog.title = dialog.title || 'آیا از انجام این کار مطمعن هستید؟'
        dialog.message = dialog.message || 'این کار برگشت ناپذیر می باشد!'
        dialog.type = dialog.type || 'warning'
        dialog.ok_txt = dialog.ok_txt || 'انجام بده'
        dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم'
        return this.show(dialog)
      },
      show(dialog = {}) {
        Plugin.root = mountIfNotMounted(Vue, options, Plugin.rootInstance)
        let dialog_options = Object.assign(Plugin.dialog, dialog)
        Plugin.dialog = { ...DEFAULT_OPTION }
        if (!dialog_options.component) {
          dialog_options.component = DefaultView
        }
        return new Promise((resolve, reject) => {
          dialog_options.id = 'dialog.' + Date.now()
          dialog_options.resolve = resolve
          dialog_options.reject = reject
          Plugin.root.commit(dialog_options)
        })
      },
      destroy() {
        if (Plugin.root) {
          Plugin.root.forceCloseAll()
          let elem = Plugin.root.$el
          Plugin.root.$destroy()
          Plugin.root.$off()
          elem.remove()
          Plugin.rootInstance._dynamicContainer = null
        }
      }
    }
    Vue.mixin({
      beforeMount() {
        if (Plugin.rootInstance === null) {
          Plugin.rootInstance = this.$root
        }
      }
    })
  }
}

export default Plugin
