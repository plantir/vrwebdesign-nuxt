<template>
  <div class="form-group">
    <label>{{field.label}}</label>
    <v-radio-group
      :mandatory="false"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :error-messages="errorMessages"
      v-model="model"
      row
    >
      <v-radio
        :color="item.color || field.color || 'info'"
        v-for="item in field.items"
        :label="item.text || item"
        :value="item.value || item"
        :key="item.value"
      ></v-radio>
    </v-radio-group>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>