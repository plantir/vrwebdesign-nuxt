import Vue from 'vue'
import vueFilepond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
// Import the plugin code
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Import the plugin code
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'

import FilePondPluginImageResize from 'filepond-plugin-image-resize'

import FilePondPluginImageCrop from 'filepond-plugin-image-crop'

import FileUploader from '@/modules/nuxt-file-upload/components/file-upload.vue'
const FilePond = vueFilepond(
  // FilePondPluginImagePreview,
  FilePondPluginImageEdit,
  FilePondPluginImageResize,
  FilePondPluginImageCrop
)
Vue.component('FilePond', FilePond)

Vue.component('vr-file-upload', FileUploader)
