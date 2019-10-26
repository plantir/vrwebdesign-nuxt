<template>
  <div class="form-group">
    <label :class="{required}" v-if="!minimal">{{field.label}}</label>
    <v-autocomplete
      cache-items
      :items="items"
      v-model="model"
      v-bind="Object.assign($attrs,field)"
      :search-input.sync="search"
      :loading="loading"
      :error-messages="errorMessages"
    >
      <template v-slot:selection="data">
        <v-chip
          v-if="field.chips"
          close
          :selected="data.selected"
          class="chip--select-multi"
          @input="remove(data.item)"
        >{{ data.item.text }}</v-chip>
        <span v-else>{{ data.item.text }}</span>
      </template>
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
      items: this.field.async ? [] : this.field.items
    }
  },
  watch: {
    search(val, old) {
      this.isLoading = true
      if (this.field.async) {
        this.get_lists(val)
      }
    }
  },
  mounted() {
    if (this.field.async) {
      this.get_lists('')
    }
  },

  methods: {
    get_lists(val) {
      this.field.queryService(val).then(items => {
        this.items = items
        this.loading = false
      })
    },
    remove(item) {
      const index = this.model.findIndex(model => item.value == model.value)
      if (index >= 0) this.model.splice(index, 1)
    }
  }
})
</script>
