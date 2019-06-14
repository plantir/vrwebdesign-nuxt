<template>
  <div class="form-group">
    <label>{{field.label}}</label>
    <v-textarea
      outline
      single-line
      auto-grow
      browser-autocomplete="off"
      v-model="model"
      :type="field.inputType || 'text'"
      :error-messages="errors.collect(field.model)"
      :name="field.model"
      :placeholder="field.placeholder"
      :suffix="field.suffix"
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
