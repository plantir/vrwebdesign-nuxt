<template>
  <!-- <div >
   
    <v-text-field
      outline
      single-line
      browser-autocomplete="new-password"
      v-model="model"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :type="field.inputType || 'text'"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
    ></v-text-field>
  </div>-->
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <section>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="model"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :error-messages="errorMessages"
            v-bind="Object.assign($attrs,field)"
            v-model="model"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          :allowed-minutes="allowedStep"
          format="24hr"
          v-if="menu"
          v-model="model"
          full-width
          @click:minute="$refs.menu.save(model)"
        ></v-time-picker>
      </v-menu>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins],
  data() {
    return {
      menu: false
    }
  },
  methods: {
    allowedStep: m => m % 5 === 0
  }
})
</script>

