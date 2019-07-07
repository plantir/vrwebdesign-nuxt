export interface NuxtPermissionInstance {}
declare module '@nuxt/vue-app' {
  interface Context {
    $permission: NuxtPermissionInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $permission: NuxtPermissionInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $permission: NuxtPermissionInstance
  }
}
