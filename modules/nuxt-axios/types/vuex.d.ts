import { NuxtAxiosInstance, NuxtServiceInstance } from '.';

declare module 'vuex' {
  interface Store<S> {
    $axios: NuxtAxiosInstance;
    $service: NuxtServiceInstance;
  }
}
