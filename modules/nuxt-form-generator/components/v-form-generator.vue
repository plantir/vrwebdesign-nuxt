<style lang="scss">
@import './base-style.scss';
</style>

<template>
  <section>
    <div class="form-section" v-for="(row, sectionIndex) in formData" :key="sectionIndex">
      <h3 v-if="row.title">{{row.title}}</h3>
      <template v-for="(field, fieldIndex) in row.rows">
        <component
          v-if="field.model.includes('.')"
          v-validate="field.validation"
          v-model="form_item[field.model.split('.')[0]][field.model.split('.')[1]]"
          :ref="field.ref"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :key="fieldIndex"
          :is="field.component || `form-controll-${field.type}`"
          :error-messages="errors.collect(field.model)"
          :name="field.model"
          :field="field"
          :minimal="minimal"
          :data-vv-as="field.label"
        ></component>
        <component
          v-else
          v-validate="field.validation"
          v-model="form_item[field.model]"
          :ref="field.ref"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :key="fieldIndex"
          :is="field.component || `form-controll-${field.type}`"
          :error-messages="errors.collect(field.model)"
          :name="field.model"
          :field="field"
          :minimal="minimal"
          :data-vv-as="field.label"
        ></component>
      </template>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import baseMixin from './base-mixin'

export default Vue.extend({
  mixins: [baseMixin],
  watch: {
    form_item: {
      handler: function() {
        this.$emit('input', this.form_item)
      },
      deep: true
    }
  }
})
</script>