<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-combobox
      :search-input.sync="search"
      :error-messages="errorMessages"
      v-bind="Object.assign($attrs,field)"
      v-model="model"
    >
      <template v-slot:item="data">
        <v-list-item-content>
          <v-list-item-title v-html="data.item.text"></v-list-item-title>
        </v-list-item-content>
      </template>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              نتیحه ای برای "
              <strong>{{ search }}</strong>" یافت نشد
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins],
  data() {
    return {
      search: null
    }
  }
})
</script>