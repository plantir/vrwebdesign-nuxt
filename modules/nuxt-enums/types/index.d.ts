export interface NuxtEnumInstance {}
declare module '@nuxt/vue-app' {
  interface Context {
    $enum: NuxtEnumInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $enum: NuxtEnumInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $enum: NuxtEnumInstance
  }
}
