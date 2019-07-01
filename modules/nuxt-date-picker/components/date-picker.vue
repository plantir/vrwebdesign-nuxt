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
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
      offset-x
      attach
      bottom
      right
      transition="slide-y-transition"
      origin="top right"
      nudge-left="240"
      nudge-bottom="10"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-bind="$attrs"
          v-model="persianDate"
          :placeholder="placeholder"
          v-on="on"
          return-masked-value
          mask="####/##/##"
          @change="changePersianDate"
          v-validate="{ validatePersianDate:true}"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="gregorianDate"
        :max="max"
        locale="fa"
        color="primary"
        first-day-of-week="6"
        :min="min"
        @input="menu = false"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment-jalaali'
import { type } from 'os'
export default Vue.extend({
  props: {
    value: {},
    placeholder: {},
    activePicker: { type: String, default: 'day' },
    min: { type: String, default: '1950-01-01' },
    max: { type: String, default: new Date().toISOString().substr(0, 10) }
  },
  data() {
    return {
      gregorianDate: this.value
        ? moment(this.value).format('YYYY-MM-DD hh:mm:ss')
        : '',
      menu: false,
      persianDate: ''
    }

 },
  created() {
    this.$validator.extend('validatePersianDate', {
      validate(value, field) {
        return moment(value, 'jYYYY/jMM/jDD').isValid()
      }
    })
  },
  watch: {
    menu: function(val) {
      if (val) {
        switch (this.activePicker) {
          case 'day':
            break
          case 'month':
            let picker = this.$refs.picker as Vue & { type: String }
            picker.type = 'month'
            break

          case 'year':
        setTimeout(() => {
          let picker = this.$refs.picker as Vue & { activePicker: String }
          picker.activePicker = 'YEAR'
        }, 100)
            break
        }
      }
    },
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
    changePersianDate() {
      if (moment(this.persianDate, 'jYYYY/jMM/jDD').isValid()) {
        this.gregorianDate = moment(this.persianDate, 'jYYYY/jMM/jDD').format(
          'YYYY-MM-DD hh:mm:ss'
        )
        this.save()
      } else {
         this.$emit('input', null)
        const field = this.$validator.fields.find({
          name: this.$attrs.name,
          scope: this.$options.scope
        })
        console.log('field', field)
        if (!field) return

        this.$validator.errors.add({
          id: field.id,
          field: this.$attrs.name,
          msg: 'فرمت تاریخ صحیح نیست',
          scope: this.$options.scope
        })

        field.setFlags({
          invalid: true,
          valid: false,
          validated: true
        })
      }
    }
  }

})
</script>