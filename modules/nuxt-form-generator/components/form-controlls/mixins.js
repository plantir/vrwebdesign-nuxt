export default {
  inject: ['$validator'],
  $_veeValidate: {
    value() {
      return this.model
    },
    name() {
      return this.field.model
    }
  },
  props: {
    field: {
      required: true,
      default: {}
    },
    value: {
      required: true
    },
    errorMessages: {}
  },
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    value: function(val) {
      this.model = val
    },
    model: function(val) {
      this.$emit('input', val)
    }
  }
}
