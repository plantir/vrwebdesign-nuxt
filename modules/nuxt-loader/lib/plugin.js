import Vue from 'vue'
import Loader from '~/modules/nuxt-loader/plugin/index'

Vue.use(Loader)

export default function(ctx, inject) {
  inject('loader', Loader)
}
