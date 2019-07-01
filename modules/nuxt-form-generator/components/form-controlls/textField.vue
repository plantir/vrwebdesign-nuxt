<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-text-field
      outline
      single-line
      browser-autocomplete="new-password"
      v-model="model"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :type="field.inputType || 'text'"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
  //   props: {
  //     field: {
  //       required: true,
  //       default: {}
  //     },
  //     value: {
  //       required: true
  //     }
  //   },
  //   data() {
  //     return {
  //       model: this.value
  //     }
  //   },
  //   watch: {
  //     value: function(val) {
  //       this.model = val
  //     },
  //     model: function(val) {
  //       this.$emit('input', val)
  //     }
  //   }
})
</script>
