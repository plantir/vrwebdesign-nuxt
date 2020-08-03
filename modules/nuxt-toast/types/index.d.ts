import Vue from 'vue'
import './vuex'
interface ToastParams {
  component?: any
  type?: 'warning' | 'info' | 'success' | 'error'
  top?: boolean
  right?: boolean
  left?: boolean
  bottom?: boolean
  color?: string
  timeout?: number
  message?: string
  customClass?: string
  shaped?: boolean
  text?: boolean
  outlined?: boolean
}
interface NuxtToastInstance {
  success(): NuxtToastInstance
  warning(): NuxtToastInstance
  info(): NuxtToastInstance
  error(): NuxtToastInstance
  top(): NuxtToastInstance
  right(): NuxtToastInstance
  left(): NuxtToastInstance
  bottom(): NuxtToastInstance
  shaped(): NuxtToastInstance
  text(): NuxtToastInstance
  outlined(): NuxtToastInstance
  rounded(): NuxtToastInstance
  color(color: string): NuxtToastInstance
  message(message: string): NuxtToastInstance
  timeout(timeout: number): NuxtToastInstance
  show(params?: ToastParams): Promise<any>
  showSimple(message: string): Promise<any>
}

declare module '@nuxt/vue-app' {
  interface Context {
    $toast: NuxtToastInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $toast: NuxtToastInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: NuxtToastInstance
  }
}
