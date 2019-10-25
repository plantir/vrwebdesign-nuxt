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
    font-size: 0.875rem;
  }
}
</style>

<template >
  <div id="vr-date-picker" ref="datePickerWrapper" @focus="activate">
    <v-text-field
      :id="id"
      v-model="persianDate"
      v-bind="$attrs"
      
      ref="dateInputControl"
      class="form-control is-editable"
      :append-icon="type=='date'?'date_range':'access_time'"
      @click:append="show=true"
    ></v-text-field>
<!-- :mask="type=='date'?'####/##/##':''" -->
    <date-picker
      v-model="persianDate"
      :type="type"
      v-bind="$attrs"
      :element="id"
      tabindex="-1"
      :show="show"
      :editable="editable"
      @close="show=false"
      :auto-submit="autoSubmit"
    ></date-picker>
  </div>
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
    },
    editable: {
      default: true
    },
    autoSubmit: {
      default: true
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
        try {
          this.persianDate = moment(val).format(this.format)
        } catch (error) {}
      } else {
        this.persianDate = null
      }
    },
    persianDate: function(val) {
      if (!val || val.length < 8) {               
        return
      }

      let emitValue = null
      try {
        const gregorianDate = moment(this.persianDate, this.format).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        if (moment(gregorianDate).isValid()) {
          emitValue = gregorianDate
        }
      } catch (error) {
        emitValue = val
      } finally {
        this.$emit('input', emitValue)
      }
    }
  },
  computed: {
    id() {
      return `datepicker_${new Date().getMilliseconds()}`
    }
  },
  methods: {
    activate() {
      (<any>this).$refs.dateInputControl.focus()
      (<any>this).$refs.datePickerWrapper.tabIndex = -1
    }
  }
})
</script>