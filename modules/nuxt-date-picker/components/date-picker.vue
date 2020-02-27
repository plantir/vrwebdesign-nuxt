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

<template>
  <div id="vr-date-picker" ref="datePickerWrapper" @focus="activate">
    <v-text-field
      :id="id"
      v-model="persianDate"
      v-bind="$attrs"
      :mask="type == 'date' ? '####/##/##' : ''"
      ref="dateInputControl"
      class="form-control is-editable"
      :append-icon="type == 'time' ? 'access_time' : 'date_range'"
      @click:append="show = true"
    ></v-text-field>

    <date-picker
      v-model="georgianDate"
      :type="type"
      :format="valueFormat"
      :display-format="format"
      v-bind="$attrs"
      :element="id"
      tabindex="-1"
      :show="show"
      :editable="editable"
      @close="show = false"
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
    valueFormat: {
      default: 'YYYY-MM-DD HH:mm:ss'
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
      georgianDate: this.value,
      persianDate: this.value
        ? moment(this.value, [this.valueFormat]).format(this.format)
        : '',
      show: false
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        try {
          this.persianDate = moment(val, [this.valueFormat]).format(this.format)
          this.georgianDate = val
        } catch (error) {}
      } else {
        this.persianDate = null
        this.georgianDate = null
      }
    },
    georgianDate: function(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    persianDate: function(val) {
      if (!val) {
        this.$emit('input', val)
        this.$emit('change', val)
        return
      }
      if (val.length < 8) {
        return
      }
      let emitValue = null
      try {
        const gregorianDate = moment(val, this.format).format(this.valueFormat)
        if (moment(gregorianDate).isValid()) {
          this.georgianDate = gregorianDate
        }
      } catch (error) {}
    }
  },
  computed: {
    id() {
      return `datepicker_${new Date().getMilliseconds()}`
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    activate() {
      this.$refs.dateInputControl.focus()
      this.$refs.datePickerWrapper.tabIndex = -1
    }
  }
})
</script>
