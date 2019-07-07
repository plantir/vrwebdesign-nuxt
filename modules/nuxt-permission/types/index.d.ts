export interface NuxtAuthorizationInstance {
  check(permisionKey: string): boolean
}
declare module '@nuxt/vue-app' {
  interface Context {
    $authorization: NuxtAuthorizationInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $authorization: NuxtAuthorizationInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $authorization: NuxtAuthorizationInstance
  }
}
