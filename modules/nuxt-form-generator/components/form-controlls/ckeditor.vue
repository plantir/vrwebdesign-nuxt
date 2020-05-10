<template>
  <div class="form-group">
    <label :class="{required}" v-if="!minimal">{{field.label}}</label>
    <vr-ckeditor v-bind="Object.assign($attrs,field)" v-model="model" :errorMessage="errorMessages"></vr-ckeditor>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>