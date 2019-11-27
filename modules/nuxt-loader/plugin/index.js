import LoaderComponent from './components/loader.vue'
class Loader {
  constructor(Vue, globalOptions = { width: 3, color: 'primary', size: 32 }) {
    this.Vue = Vue
    this.timeout = null
    this.mounted = false
    this.apendedLoader = {}
    this.loader = globalOptions
    this.loaderConstructor = this.Vue.extend(LoaderComponent)
  }

  show(element, loader = {}) {
    window.addEventListener('resize', this.onResize.bind(this))
    this.loader = Object.assign(this.loader, loader)
    let app = document.querySelector('body')
    if (typeof element == 'string') {
      let indexes = []
      let elementList = document.querySelectorAll(element)
      for (const el of elementList) {
        let vm = new this.loaderConstructor({
          propsData: { data: this.loader }
        })
        let mount = vm.$mount()
        mount.loaderElement = el
        let $el = mount.$el
        let rect = el.getBoundingClientRect()
        let topOffset = window.scrollY
        $el.style.cssText = `left:${rect.left}px;top:${rect.top +
          topOffset}px;height:${rect.height}px;width:${rect.width}px`
        app.appendChild($el)
        let index = new Date().getTime()
        this.apendedLoader[index] = mount
        indexes.push(index)
      }
      return {
        hide: () => {
          this.hide(indexes)
        }
      }
    } else {
      let vm = new this.loaderConstructor({ propsData: { data: this.loader } })
      let mount = vm.$mount()
      mount.loaderElement = element
      let $el = mount.$el
      let rect = element.getBoundingClientRect()
      let topOffset = window.scrollY
      $el.style.cssText = `left:${rect.left}px;top:${rect.top +
        topOffset}px;height:${rect.height}px;width:${rect.width}px`
      app.appendChild($el)
      let index = new Date().getTime()
      this.apendedLoader[index] = mount
      return {
        hide: () => {
          this.hide([index])
        }
      }
    }
  }
  hide(indexes) {
    for (const index of indexes) {
      let mount = this.apendedLoader[index]
      if (!mount) {
        continue
      }
      let elem = mount.$el
      this.apendedLoader[index].$destroy()
      this.apendedLoader[index].$off()
      elem.remove()
      delete this.apendedLoader[index]
    }
    if (this.apendedLoader.length == 0) {
      window.removeEventListener('resize', this.onResize.bind(this))
    }
  }
  onResize() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      Object.values(this.apendedLoader).map(mount => {
        let $el = mount.$el
        let rect = mount.loaderElement.getBoundingClientRect()
        let topOffset = window.scrollY
        $el.style.cssText = `left:${rect.left}px;top:${rect.top +
          topOffset}px;height:${rect.height}px;width:${rect.width}px`
      })
    }, 10)
  }
  destroy() {
    Object.values(this.apendedLoader).map(mount => {
      let elem = mount.$el
      mount.$destroy()
      mount.$off()
      elem.remove()
    })
    this.apendedLoader = {}
    window.removeEventListener('resize', this.onResize)
  }
}

class LoaderPlugin {
  static install(Vue, options) {
    Vue.loader = new Loader(Vue, options)
    Object.defineProperties(Vue.prototype, {
      $loader: {
        get() {
          return Vue.loader
        }
      }
    })
  }
}

export default LoaderPlugin
