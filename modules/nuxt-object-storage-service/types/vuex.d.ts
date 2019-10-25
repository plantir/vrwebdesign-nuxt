import { NuxtObjectStorageServiceInstance } from '../types'

declare module 'vuex' {
  interface Store<S> {
    $objectStorageService: NuxtObjectStorageServiceInstance
  }
}
