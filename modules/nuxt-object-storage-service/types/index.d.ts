export interface NuxtObjectStorageServiceInstance {
  makeBucket(bucketName: string, region: string): boolean
  fPutObject(bucketName: string, filePath: string, fileName: string, metaData: object): boolean
}
declare module '@nuxt/vue-app' {
  interface Context {
    $objectStorageService: NuxtObjectStorageServiceInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $objectStorageService: NuxtObjectStorageServiceInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $objectStorageService: NuxtObjectStorageServiceInstance
  }
}
