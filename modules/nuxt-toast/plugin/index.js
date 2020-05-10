import ToastComponent from './components/toast.vue'
const CONFIG = {
  timeout: 4000,
}
class Toast {
  constructor(Vue, globalOptions = {}) {
    this.Vue = Vue
    this.mounted = false
    this.$root = {} // The root component
    this.registeredViews = {} // Custom components
    this.toast = Object.assign(CONFIG, globalOptions)
  }
  mountIfNotMounted() {
    if (this.mounted === true) {
      return
    }

    this.$root = (() => {
      let ToastConstructor = this.Vue.extend(ToastComponent)
      let node = document.createElement('div')
      document.querySelector('#app').appendChild(node)
      let Vm = new ToastConstructor()
      return Vm.$mount(node)
    })()

    this.mounted = true
  }
  top() {
    this.toast.top = true
    return this
  }
  bottom() {
    this.toast.bottom = true
    return this
  }
  right() {
    this.toast.right = true
    return this
  }
  left() {
    this.toast.left = true
    return this
  }
  message(message) {
    this.toast.message = message
    return this
  }
  color(color) {
    this.toast.color = color
    return this
  }
  timeout(timeout) {
    this.toast.timeout = timeout
    return this
  }
  success() {
    this.toast.color = 'success'
    return this
  }
  warning() {
    this.toast.color = 'warning'

    return this
  }
  info() {
    this.toast.color = 'info'

    return this
  }
  error() {
    this.toast.color = 'error'

    return this
  }
  showSimple(message) {
    this.toast.message = message
    return this.show(this.toast)
  }

  show(toast = {}) {
    this.mountIfNotMounted()
    this.toast = Object.assign(this.toast, toast)
    this.toast.show = true
    if (this.toast.type) {
      this[this.toast.type]()
    }
    return new Promise((resolve, reject) => {
      this.toast.id = 'toast.' + Date.now()
      this.toast.resolve = resolve
      this.toast.reject = reject
      this.$root.commit(this.toast)
    }).then(() => {
      this.close()
    })
  }

  close() {
    if (this.mounted === true) {
      this.$root.close()
      let elem = this.$root.$el
      this.$root.$destroy()
      this.$root.$off()
      elem.remove()
      this.mounted = false
    }
  }
  destroy() {
    this.close()
  }
}

class ToastPlugin {
  static install(Vue, options) {
    Vue.toast = new Toast(Vue, options)
    Object.defineProperties(Vue.prototype, {
      $toast: {
        get() {
          return Vue.toast
        },
      },
    })
  }
}

export default ToastPlugin
