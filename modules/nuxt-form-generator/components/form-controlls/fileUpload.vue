<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <vr-file-upload
      v-bind="$attrs"
      v-model="model"
      :errorMessage="errorMessages"
      :multiple="field.multiple"
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