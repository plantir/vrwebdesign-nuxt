<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <vr-file-upload :errorMessage="errorMessages" :multiple="field.multiple" v-model="model"></vr-file-upload>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>