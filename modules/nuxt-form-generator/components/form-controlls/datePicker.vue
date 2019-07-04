<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <vr-date-picker
      outline
      single-line
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      v-model="model"
      :append-icon="field.appendIcon"
      :prepend-icon="field.prependIcon"
      :items="field.items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
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