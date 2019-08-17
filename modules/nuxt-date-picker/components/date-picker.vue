<style lang="scss">
#vr-date-picker {
  position: relative;
  .v-date-picker-title__date {
    font-size: 20px;
  }
  .v-date-picker-table--date .v-btn {
    height: 36px;
    width: 36px;
  }

  .v-date-picker-table--date th {
    padding: 14px 0;
    font-weight: 600;
  }
  .v-date-picker-table .v-btn {
    font-size: 14px;
  }
}
</style>

<template >
  <section id="vr-date-picker">
    <v-text-field :id="id" v-model="persianDate" v-bind="$attrs"></v-text-field>
    <date-picker v-model="persianDate" :type="type" v-bind="$attrs" :element="id"></date-picker>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'

export default Vue.extend({
  components: { datePicker: VuePersianDatetimePicker },
  props: {
    value: {},
    type: {
      default: 'date'
    },
    format: {
      default: 'jYYYY/jMM/jDD'
    }
  },
  data() {
    return {
      persianDate: this.value ? moment(this.value).format(this.format) : '',
      show: false
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.persianDate = moment(val).format(this.format)
      } else {
        this.persianDate = null
      }
    },
    persianDate: function(val) {
      try {
        if (val) {
          const gregorianDate = moment(this.persianDate, this.format).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.$emit('input', gregorianDate)
        } else {
          this.$emit('input', null)
        }
      } catch (error) {
        this.$emit('input', val)
      }
    }
  },
  computed: {
    id() {
      return `datepicker_${new Date().getMilliseconds()}`
    }
  }
})
</script>