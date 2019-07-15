<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-select :error-messages="errorMessages" v-bind="$attrs" v-model="model"></v-select>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins]
})
</script>