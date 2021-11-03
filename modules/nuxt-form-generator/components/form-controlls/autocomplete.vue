<template>
  <div class="form-group">
    <label :class="{ required }" v-if="!minimal">{{ field.label }}</label>
    <v-autocomplete
      :items="items"
      v-model="model"
      v-bind="Object.assign($attrs, field)"
      :search-input.sync="search"
      :loading="loading"
      :error-messages="errorMessages"
    >
      <template v-slot:selection="data">
        <v-chip
          v-if="field.chips"
          :close="!field.readonly"
          :selected="data.selected"
          class="chip--select-multi"
          @input="remove(data.item)"
          >{{ text(data.item) }}</v-chip
        >
        <span v-else>{{ text(data.item) }}</span>
      </template>
      <template v-slot:item="data">
        <v-list-tile-content>
          <v-list-tile-title v-html="text(data.item)"></v-list-tile-title>
        </v-list-tile-content>
      </template>
      <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              نتیحه ای برای "
              <strong>{{ search }}</strong
              >" یافت نشد
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-autocomplete>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mixins from './mixins'
export default Vue.extend({
  mixins: [mixins],
  data() {
    return {
      loading: false,
      search: null,
      items: this.field.async ? [] : this.field.items,
    }
  },
  watch: {
    search(val, old) {
      this.isLoading = true
      if (this.field.async) {
        this.get_lists(val)
      }
    },
  },
  mounted() {
    if (this.field.async) {
      this.get_lists('')
    }
  },

  methods: {
    get_lists(val) {
      this.field.queryService(val).then((items) => {
        this.items = items
        this.loading = false
      })
    },
    text(val) {
      let key = this.$attrs.itemText || 'text'
      return val[key]
    },
    remove(item) {
      debugger
      let valueKey = this.$attrs.itemValue || 'value'
      const index = this.model.findIndex((model) => {
        if (this.field.returnObject) {
          return item[valueKey] == model[valueKey]
        } else {
          return item[valueKey] == model
        }
      })
      if (index >= 0) this.model.splice(index, 1)
    },
  },
})
</script>
