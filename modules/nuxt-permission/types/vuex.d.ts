import { NuxtPermissionInstance } from './'

declare module 'vuex' {
  interface Store<S> {
    $permission: NuxtPermissionInstance
  }
}
