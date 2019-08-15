<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <template v-if="field.select_text">
      <v-select
        :error-messages="errorMessages"
        v-bind="$attrs"
        v-model="model"
        :item-text="field.select_text"
        :item-value="field.select_value"
      ></v-select>
    </template>
    <template v-else>
      <v-select :error-messages="errorMessages" v-bind="$attrs" v-model="model"></v-select>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>