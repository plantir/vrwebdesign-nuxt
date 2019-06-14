<template>
  <div class="form-group">
    <label>{{field.label}}</label>
    <v-select
      outline
      single-line
      browser-autocomplete="off"
      v-model="model"
      :items="field.items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="field.placeholder"
      :suffix="field.suffix"
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