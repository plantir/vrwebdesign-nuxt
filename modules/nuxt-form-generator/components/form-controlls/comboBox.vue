<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-combobox
      :search-input.sync="search"
      :error-messages="errorMessages"
      v-bind="$attrs"
      v-model="model"
    >
      <template v-slot:item="data">
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
        </v-list-tile-content>
      </template>
      <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              نتیحه ای برای "
              <strong>{{ search }}</strong>" یافت نشد
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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