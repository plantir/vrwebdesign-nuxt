import Vue from 'vue'
import Toast from '~/modules/nuxt-toast/plugin/index'

Vue.use(Toast)

export default function(ctx, inject) {
  inject('toast', Toast)
}
