import { NuxtToastInstance } from '.'

declare module 'vuex' {
  interface Store<S> {
    $toast: NuxtToastInstance
  }
}
