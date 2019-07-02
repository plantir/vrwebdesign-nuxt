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
    <v-text-field
      v-bind="$attrs"
      v-model="gregorianDate"
      class="form-control form-control-lg"
      placeholder="YYYY/MM/DD"
      v-on="on"
      return-masked-value
      mask="####/##/##"
      id="my-custom-input"
    ></v-text-field>

    <date-picker
      v-model="gregorianDate"
      format="jYYYY/jMM/jDD"
      element="my-custom-input"
      :auto-submit="true"
      :min="min"
      :max="max"
    ></date-picker>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'moment-jalaali'
import { type } from 'os'

export default Vue.extend({
  components: { datePicker: VuePersianDatetimePicker },
  props: {
    value: {},
    activePicker: { type: String, default: 'day' },
    min: { type: String, default: '1950-01-01' },
    max: { type: String, default: new Date().toISOString().substr(0, 10) }
  },
  data() {
    return {
      gregorianDate: this.value
        ? moment(this.value).format('YYYY-MM-DD hh:mm:ss')
        : '',
      persianDate: ''
    }
  },
  watch: {
    value: function(val) {
      if (val) this.gregorianDate = moment(val).format('YYYY-MM-DD hh:mm:ss')
    },
    gregorianDate: function(val) {
      if (val) {
        this.persianDate = moment(val).format('jYYYY/jMM/jDD')
      }
    }
  },
  methods: {
    save() {
      this.$emit('input', this.gregorianDate)
    },
  }
})
</script>