import { NuxtDialogInstance } from '.';

declare module 'vuex' {
  interface Store<S> {
    $dialog: NuxtDialogInstance;
  }
}
