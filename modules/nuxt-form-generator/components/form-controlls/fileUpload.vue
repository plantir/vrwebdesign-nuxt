<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <vr-file-upload
      v-bind="Object.assign($attrs,field)"
      v-model="model"
      :errorMessage="errorMessages"
      :multiple="field.multiple"
      :is_object="field.is_object"
      :image_src="field.image_src"
      :is_default="field.is_default"
      :upload_url="field.upload_url"
    ></vr-file-upload>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>