import Vue from 'vue'
import './vuex'

interface DialogParams {
  component?: any
  type?: 'warning' | 'info' | 'question' | 'success' | 'error'
  title?: string
  message?: string
  ok_txt?: string
  cancel_txt?: string
  scope?: any
  props?: any
  fullscreen?: boolean
  dialog_wrapper_custom_class?: string
  persistent?: boolean
}
interface NuxtDialogInstance {
  ok(ok_txt: string): NuxtDialogInstance
  cancel(cancel_txt: string): NuxtDialogInstance
  message(message: string): NuxtDialogInstance
  title(title: string): NuxtDialogInstance
  model(model: string): NuxtDialogInstance
  warning(): NuxtDialogInstance
  info(): NuxtDialogInstance
  question(): NuxtDialogInstance
  success(): NuxtDialogInstance
  error(): NuxtDialogInstance
  component(component: any): NuxtDialogInstance
  show(params?: DialogParams): Promise<any>
  alert(params?: DialogParams): Promise<any>
  confirm(params?: DialogParams): Promise<any>
  prompt(params?: DialogParams): Promise<any>
  destroy(): void
}

declare module '@nuxt/vue-app' {
  interface Context {
    $dialog: NuxtDialogInstance
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $dialog: NuxtDialogInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: NuxtDialogInstance
  }
}
