<template>
  <div class="form-group">
    <v-checkbox
      v-bind="$attrs"
      v-on="$listeners"
      outline
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      :error-messages="errorMessages"
      :placeholder="placeholder"
      :suffix="field.suffix"
    ></v-checkbox>
    <label>{{field.label}}</label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>

<style lang="scss" scoped>
.form-section {
  .form-group {
    > label {
      flex: 0 0 95%;
    }
  }
}
</style>