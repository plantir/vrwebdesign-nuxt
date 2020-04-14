<template>
  <div class="form-group">
    <label :class="{required}" v-if="!minimal">{{field.label}}</label>
    <vr-date-picker
      :error-messages="errorMessages"
      v-bind="Object.assign($attrs,field)"
      v-model="model"
      :auto-submit="true"
      :type="field.datePickerType || 'date'"
      :format="format"
    ></vr-date-picker>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins],
  computed: {
    format() {
      switch (this.field.datePickerType) {
        case 'datetime':
          return 'jYYYY/jMM/jDD HH:mm'
          break
        case 'time':
          return 'HH:mm'
          break
        case 'year':
          return 'jYYYY'
          break
        case 'month':
          return 'jMM'
          break
        case 'year-month':
          return 'jYYYY/jMM'
          break
        default:
          return 'jYYYY/jMM/jDD'
          break
      }
    }
  }
})
</script>