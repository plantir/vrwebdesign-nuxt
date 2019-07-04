<template>
  <div class="form-group">
    <label v-if="!minimal">{{field.label}}</label>
    <v-autocomplete
      outline
      single-line
      cache-items
      flat
      hide-no-data
      :browser-autocomplete="field.browserAutocomplete || 'off'"
      v-model="model"
      :disabled="field.disabled"
      :readonly="field.readonly"
      :items="items"
      :error-messages="errorMessages"
      :name="field.model"
      :placeholder="placeholder"
      :suffix="field.suffix"
      :label="minimalLabel"
      :append-icon="field.appendIcon"
      :prepend-icon="field.prependIcon"
      :loading="loading"
      :search-input.sync="search"
      :multiple="field.multiple"
      :chips="field.chips"
      :return-object="field.returnObject"
    >
      <template v-slot:item="data">
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
        </v-list-tile-content>
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
      this.get_lists(val)
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
    }
  }
})
</script>
