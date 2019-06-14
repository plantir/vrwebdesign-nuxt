import { NuxtScrollToObject } from '.'

declare module 'vuex' {
  interface Store<S> {
    $scrollTo: NuxtScrollToObject
  }
}
