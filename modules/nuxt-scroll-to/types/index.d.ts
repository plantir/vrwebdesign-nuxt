import Vue from 'vue'
interface NuxtScrollTo {
  (
    element: Vue | Element | Vue[] | Element[] | String,
    duration?: number,
    option?: {
      container?: Vue | Element | Vue[] | Element[] | String
      offset?: number
    }
  ): void
}

declare module '@nuxt/types' {
  interface Context {
    $scrollTo: NuxtScrollTo
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $scrollTo: NuxtScrollTo
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $scrollTo: NuxtScrollTo
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $scrollTo: NuxtScrollTo
  }
}
