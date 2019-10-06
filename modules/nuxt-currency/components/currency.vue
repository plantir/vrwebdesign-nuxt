<style lang="scss" scoped>
</style>
<template>
  <v-text-field
    v-on="$listeners"
    v-bind="$attrs"
    v-model="displayValue"
    @change="emitValue"
    @keypress="onKeyPress"
    @input="onChange"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
  ></v-text-field>
</template>
<script>
export default {
  props: ['value'],
  data: function() {
    return {
      displayValue:
        this.value &&
        Number.parseInt(this.value)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  },
  watch: {
    value: function(val) {
      if (isNaN(val)) {
        return
      }
      this.displayValue =
        val &&
        Number.parseInt(val)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  },
  methods: {
    onKeyPress(event) {
      let numberArray = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        '۰',
        '۱',
        '۲',
        '۳',
        '۴',
        '۵',
        '۶',
        '۷',
        '۸',
        '۹'
      ]
      if (!numberArray.some(item => item == event.key)) {
        event.preventDefault()
      }
    },
    onChange(val) {
      this.displayValue = val
        .replace(/[۰-۹]/g, function(w) {
          return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'].indexOf(w)
        })
        .replace(/,/g, '')
        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    },
    emitValue() {
      let newValue = parseFloat(this.displayValue.replace(/[^\d\.]/g, ''))
      this.$emit('input', newValue)
    }
  }
}
</script>