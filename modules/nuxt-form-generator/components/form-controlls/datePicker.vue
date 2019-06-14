<template>
  <div class="form-group">
    <label>{{field.label}}</label>
    <vr-date-picker
      outline
      single-line
      browser-autocomplete="off"
      v-model="model"
      :append-icon="field.appendIcon"
      :prepend-icon="field.prependIcon"
      :items="field.items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="field.placeholder"
      :suffix="field.suffix"
    ></vr-date-picker>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>