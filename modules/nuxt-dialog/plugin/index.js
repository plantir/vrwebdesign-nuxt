import DialogComponent from './components/dialog.vue'
import DefaultView from './components/views/default.vue'
import AlertView from './components/views/alert.vue'
import ConfirmView from './components/views/confirm.vue'
const DEFAULT_OPTION = {}
class Dialog {
  constructor(Vue, globalOptions = {}) {
    this.Vue = Vue
    this.mounted = false
    this.$root = {} // The root component
    this.registeredViews = {} // Custom components
    this.dialog = Object.assign({ ...DEFAULT_OPTION }, globalOptions)
  }
  mountIfNotMounted() {
    if (this.mounted === true) {
      return
    }

    this.$root = (() => {
      let DialogConstructor = this.Vue.extend(DialogComponent)
      let node = document.createElement('div')
      document.querySelector('body').appendChild(node)

      let Vm = new DialogConstructor()

      // Vm.registeredViews = this.registeredComponents()

      return Vm.$mount(node)
    })()

    this.mounted = true
  }
  ok(ok_txt) {
    this.dialog.ok_txt = ok_txt
    return this
  }
  cancel(cancel_txt) {
    this.dialog.cancel_txt = cancel_txt
    return this
  }
  message(message) {
    this.dialog.message = message
    return this
  }
  title(title) {
    this.dialog.title = title
    return this
  }
  component(component) {
    this.dialog.component = component
    return this
  }
  warning() {
    this.dialog.type = 'warning'
    return this
  }
  info() {
    this.dialog.type = 'info'
    return this
  }
  question() {
    this.dialog.type = 'question'
    return this
  }
  success() {
    this.dialog.type = 'success'
    return this
  }
  alert(dialog = {}) {
    dialog = Object.assign(this.dialog, dialog)
    dialog.component = AlertView
    dialog.ok_txt = dialog.ok_txt || 'باشه'
    return this.show(dialog)
  }
  confirm(dialog = {}) {
    dialog = Object.assign(this.dialog, dialog)
    dialog.component = ConfirmView
    dialog.title = dialog.title || 'آیا از انجام این کار مطمعن هستید؟'
    dialog.message = dialog.message || 'این کار برگشت ناپذیر می باشد!'
    dialog.type = dialog.type || 'warning'
    dialog.ok_txt = dialog.ok_txt || 'انجام بده'
    dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم'
    return this.show(dialog)
  }
  show(dialog = {}) {
    this.mountIfNotMounted()
    let dialog_options = Object.assign(this.dialog, dialog)
    this.dialog = { ...DEFAULT_OPTION }
    if (!dialog_options.component) {
      dialog_options.component = DefaultView
    }
    return new Promise((resolve, reject) => {
      dialog_options.id = 'dialog.' + Date.now()
      dialog_options.resolve = resolve
      dialog_options.reject = reject
      this.$root.commit(dialog_options)
    })
  }
  // hide(data) {
  //   if (this.mounted === true) {
  //     this.$root.hide(data)
  //     let elem = this.$root.$el
  //     this.$root.$destroy()
  //     this.$root.$off()
  //     elem.remove()
  //     this.mounted = false
  //   }
  // }
  // close(reason) {
  //   if (this.mounted === true) {
  //     this.$root.close(reason)
  //     let elem = this.$root.$el
  //     this.$root.$destroy()
  //     this.$root.$off()
  //     elem.remove()
  //     this.mounted = false
  //   }
  // }
  destroy() {
    if (this.mounted === true) {
      this.$root.forceCloseAll()
      let elem = this.$root.$el
      this.$root.$destroy()
      this.$root.$off()
      elem.remove()
      this.mounted = false
    }
  }
}

class DialogPlugin {
  static install(Vue, options) {
    Vue.dialog = new Dialog(Vue, options)
    Object.defineProperties(Vue.prototype, {
      $dialog: {
        get() {
          return Vue.dialog
        }
      }
    })
  }
}

export default DialogPlugin
