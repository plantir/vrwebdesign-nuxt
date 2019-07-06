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
    <v-layout row justify-end full-height>
      <v-flex>
        <v-btn icon @click="show=true">
          <v-icon>event</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-text-field
          v-model="persianDate"
          class="form-control form-control-lg"
          outline
          single-line
          placeholder="YYYY/MM/DD"
          return-masked-value
          mask="####/##/##"
          id="my-custom-input"
        ></v-text-field>

        <date-picker
          v-model="persianDate"
          format="jYYYY/jMM/jDD"
          element="my-custom-input"
          :editable="true"
          :min="min"
          :max="max"
          :auto-submit="true"
          @change="save"
          @close="show=false"
          :show="show"
        ></date-picker>
      </v-flex>
    </v-layout>
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
    min: { type: String, default: '1300/01/01' },
    max: {
      type: String,
      default: moment(new Date().toISOString().substr(0, 10)).format(
        'jYYYY/jMM/jDD hh:mm:ss'
      )
    }
  },
  data() {
    return {
      persianDate: this.value
        ? moment(this.value).format('jYYYY/jMM/jDD hh:mm:ss')
        : '',
      show: false
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.persianDate = moment(val).format('jYYYY/jMM/jDD hh:mm:ss')
      }
    }
  },
  methods: {
    save() {
      const gregorianDate = moment(this.persianDate, 'jYYYY/jMM/jDD').format(
        'YYYY-MM-DD hh:mm:ss'
      )
      console.log('gregorianDate', gregorianDate)
      this.$emit('input', gregorianDate)
    }
  }
})
</script>