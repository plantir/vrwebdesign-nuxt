<style lang="sass" scoped>

</style>

<template>
  <section>
    <div class="form-section" v-for="(item, sectionIndex) in formData" :key="sectionIndex">
      <h3 v-if="item.title">{{item.title}}</h3>
      <template v-for="(field, fieldIndex) in item.rows">
        <component
          v-if="field.model.includes('.')"
          :key="fieldIndex"
          :is="field.component || `form-controll-${field.type}`"
          v-validate="field.validation"
          :error-messages="errors.collect(field.model)"
          :name="field.model"
          :field="field"
          v-model="item[field.model.split('.')[0]][field.model.split('.')[1]]"
        ></component>
        <component
          v-else
          :key="fieldIndex"
          :is="field.component || `form-controll-${field.type}`"
          v-validate="field.validation"
          :name="field.model"
          :error-messages="errors.collect(field.model)"
          :field="field"
          v-model="item[field.model]"
        ></component>
      </template>
    </div>
  </section>
</template>
<script>
import { watch } from 'chokidar'

import FormControlls from './form-controlls/index'
export default {
  components: FormControlls,
  props: {
    value: {
      require: true
    },
    formData: {
      required: true
    }
  },
  data() {
    return {
      item: this.value
    }
  },
  watch: {
    item: function() {
      this.$emit('input', this.item)
    }
  }
}
</script>