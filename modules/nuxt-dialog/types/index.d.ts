import Vue from 'vue';
import './vuex';

interface NuxtDialogInstance {
  alert(): void;
}

declare module '@nuxt/vue-app' {
  interface Context {
    $dialog: NuxtDialogInstance;
  }
}

// since nuxt 2.7.1 there is "NuxtAppOptions" for app context - see https://github.com/nuxt/nuxt.js/pull/5701
declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $dialog: NuxtDialogInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: NuxtDialogInstance;
  }
}
