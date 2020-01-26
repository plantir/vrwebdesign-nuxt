import Vue from 'vue'
interface NuxtScrollToObject {
  element: Vue | Element | Vue[] | Element[] | String
  duration: number
  option: {
    container: Vue | Element | Vue[] | Element[] | String
    offset: number
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    $scrollTo: (
      element: Vue | Element | Vue[] | Element[] | String,
      duration?: number,
      option?: {
        container?: Vue | Element | Vue[] | Element[] | String
        offset?: number
      }
    ) => void
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $scrollTo: (
      element: Vue | Element | Vue[] | Element[] | String,
      duration?: number,
      option?: {
        container?: Vue | Element | Vue[] | Element[] | String
        offset?: number
      }
    ) => void
  }
}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $scrollTo: (
//       element: Vue | Element | Vue[] | Element[] | String,
//       duration?: number,
//       option?: {
//         container?: Vue | Element | Vue[] | Element[] | String
//         offset?: number
//       }
//     ) => void
//   }
// }
