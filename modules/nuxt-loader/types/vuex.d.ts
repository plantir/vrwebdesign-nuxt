import { NuxtLoaderInstance } from '.'

declare module 'vuex' {
  interface Store<S> {
    $loader: NuxtLoaderInstance
  }
}
