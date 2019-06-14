<style lang="scss" scoped>
</style>
<template>
  <v-text-field
    v-bind="$attrs"
    :type="type"
    v-model="displayValue"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
  ></v-text-field>
</template>
<script>
export default {
  props: ['value'],
  data: function() {
    return {
      isInputActive: false,
      type: 'number'
    }
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.value) {
          if (this.isInputActive) {
            this.type = 'number'
            return this.value.toString()
          } else {
            this.type = 'text'
            return this.value
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          }
        }
      },
      set: function(modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        if (isNaN(newValue)) {
          newValue = 0
        }
        this.$emit('input', newValue)
      }
    }
  }
}
</script>