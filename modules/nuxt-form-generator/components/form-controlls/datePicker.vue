<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <vr-date-picker
      outline
      single-line
      v-bind="$attrs"
      v-model="model"
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      :append-icon="field.appendIcon"
      :prepend-icon="field.prependIcon"
      :items="field.items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
      :auto-submit="true"
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