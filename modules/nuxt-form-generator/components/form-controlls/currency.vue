<template>
  <div class="form-group">
    <label :class="caption_class" v-if="!minimal">{{field.label}}</label>
    <vr-currency
      :error-messages="errorMessages"
      v-bind="Object.assign($attrs,field)"
      v-model="model"
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