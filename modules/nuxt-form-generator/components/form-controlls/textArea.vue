<template>
  <div class="form-group">
    <label :class="caption_class" v-if="!minimal">{{field.label}}</label>
    <v-textarea
      :error-messages="errorMessages"
      auto-grow
      v-bind="Object.assign($attrs,field)"
      v-model="model"
    ></v-textarea>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>
