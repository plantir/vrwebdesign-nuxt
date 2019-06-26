<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <vr-currency
      outline
      single-line
      browser-autocomplete="off"
      v-model="model"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :type="field.inputType || 'text'"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
    ></vr-currency>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>