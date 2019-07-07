import { NuxtAuthorizationInstance } from '.'

declare module 'vuex' {
  interface Store<S> {
    $authorization: NuxtAuthorizationInstance
  }
}
