<template>
  <div class="form-group">      
    <v-checkbox
      v-bind="$attrs"
      v-on="$listeners"
      v-model="model"
      :label="field.label"
      outline
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      :error-messages="errorMessages"
      :placeholder="placeholder"
      :suffix="field.suffix"
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