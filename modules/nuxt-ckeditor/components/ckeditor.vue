<style lang="scss" scoped></style>
<template>
  <v-layout row wrap class="my-4">
    <v-flex xs3>
      <label for>{{ dataVvAs }}</label>
    </v-flex>
    <v-flex xs9>
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
        @input="$emit('input', editorData)"
      ></ckeditor>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default Vue.extend({
  name: 'app',
  props: {
    value: {
      required: true
    },
    dataVvAs: {}
  },
  watch: {
    value: function(val) {
      this.editorData = val
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.value,
      editorConfig: {
        // The configuration of the editor.
        image: {
          toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight'
          ],
          styles: [
            // This option is equal to a situation where no style is applied.
            'full',

            // This represents an image aligned to the left.
            'alignLeft',

            // This represents an image aligned to the right.
            'alignRight'
          ]
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            }
          ]
        },
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: '/api/upload'
        }
      }
    }
  }
})
</script>
