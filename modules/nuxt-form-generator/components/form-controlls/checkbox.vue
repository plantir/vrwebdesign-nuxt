<style lang="scss">
.v-input__slot {
  .v-label {
    color: #646c9a;
    font-weight: 500;
  }
}
</style>
<template>
  <div class="form-group">
    <label></label>
    <v-checkbox
      v-bind="Object.assign($attrs,field)"
      v-model="model"
      outline
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      :error-messages="errorMessages"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="field.label"
      persistent-hint
    ></v-checkbox>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>
