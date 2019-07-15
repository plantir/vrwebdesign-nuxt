<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-textarea
      outline
      single-line
      auto-grow
      v-bind="$attrs"
      v-model="model"
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :type="field.inputType || 'text'"
      :error-messages="errors.collect(field.model)"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
      :append-icon="field.appendIcon"
      :prepend-icon="field.prependIcon"
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
