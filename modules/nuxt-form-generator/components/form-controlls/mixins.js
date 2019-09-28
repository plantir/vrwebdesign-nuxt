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
    errorMessages: {},
    minimal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: this.value
    }
  },
  computed: {
    minimalLabel() {
      return this.minimal ? this.field.label : ''
    },
    placeholder() {
      return this.minimal ? '' : this.field.placeholder
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
