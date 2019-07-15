<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-select
      outline
      single-line
      v-bind="$attrs"
      v-model="model"
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :items="field.items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
      :multiple="field.multiple"
      :chips="field.chips"
      :return-object="field.returnObject"
      :append-icon="field.appendIcon"
      :prepend-icon="field.prependIcon"
    ></v-select>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>