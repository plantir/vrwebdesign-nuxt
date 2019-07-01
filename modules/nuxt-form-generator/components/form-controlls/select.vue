<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-select
      outline
      single-line
      browser-autocomplete="new-password"
      v-model="model"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :items="field.items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
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