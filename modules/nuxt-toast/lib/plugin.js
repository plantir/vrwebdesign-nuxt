import Vue from 'vue'
import Toast from 'vrwebdesign-nuxt/modules/nuxt-toast/plugin/index'

Vue.use(Toast)

export default function(ctx, inject) {
  inject('toast', Toast)
}
