import { NuxtEnumInstance } from './'

declare module 'vuex' {
  interface Store<S> {
    $enum: NuxtEnumInstance
  }
}
