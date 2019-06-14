import Vue from 'vue'
import './vuex'

interface LoaderParams {
  width?: number
  color?: string
  size?: number
}

interface NuxtLoaderElement {
  hide(): void
}
interface NuxtLoaderInstance {
  show(
    element: Vue | Element | Vue[] | Element[] | String,
    options?: LoaderParams
  ): NuxtLoaderElement
  destroy(): void
}

declare module '@nuxt/vue-app' {
  interface Context {
    $loader: NuxtLoaderInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $loader: NuxtLoaderInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $loader: NuxtLoaderInstance
  }
}
