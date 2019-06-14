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
  <!-- <v-menu
    v-model="datePickerMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{on}">
      <v-text-field v-model="persianDate" :label="label" prepend-icon="event" readonly v-on="on"></v-text-field>
    </template>
    <v-date-picker
      v-model="gregorianDate"
      @input="datePickerMenu = false"
      @change="save"
      v-bind="$attrs"
      v-on="$listeners"
      locale="fa"
    ></v-date-picker>
  </v-menu>-->
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
          readonly
          v-model="persianDate"
          :placeholder="placeholder"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="gregorianDate"
        :max="new Date().toISOString().substr(0, 10)"
        locale="fa"
        color="primary"
        first-day-of-week="6"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment-jalaali'
export default Vue.extend({
  props: {
    value: {},
    placeholder: {}
  },
  data() {
    return {
      gregorianDate: this.value,
      menu: false
    }
  },
  watch: {
    menu: function(val) {
      if (val) {
        setTimeout(() => {
          let picker = this.$refs.picker as Vue & { activePicker: String }
          picker.activePicker = 'YEAR'
        }, 100)
      }
    },
    value: function(val) {
      this.gregorianDate = val
    },
    gregorianDate: function(val) {
      console.log(val)
    }
  },
  methods: {
    save() {
      this.$emit('input', this.gregorianDate)
    }
  },
  computed: {
    persianDate(): any {
      if (this.gregorianDate) {
        return moment(this.gregorianDate).format('jYYYY/jMM/jDD')
      }
    }
  }
})
</script>