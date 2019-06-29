<template>
  <v-select
    outline
    single-line
    browser-autocomplete="off"
    v-model="model"
    :items="enumToArray(items, displayItems)"
    :error-messages="errorMessages"
    :name="model"
    :placeholder="placeholder"
    :label="minimalLabel"
    item-text="name"
    item-value="id"
  ></v-select>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inject: ['$validator'],
  $_veeValidate: {
    value() {
      return this.model
    },
    name() {
      return this.field.model
    }
  },
  props: {
    value: {
      required: true
    },
    errorMessages: {},
    minimal: {
      type: Boolean,
      default: false
    },
    items,
    displayItems:{    
      default:[]
    },   
  },
  data() {
    return {
      model: this.value
    }
  },
  methods: {
    enumToArray(input, displayNames: { id: number; name: string }[] = []) {
      let map: { id: number; name: string }[] = []
      for (var n in input) {
        if (typeof input[n] === 'number') {
          let displayName: string = n
          const displayObj = displayNames.find(x => x.id === input[n])
          if (displayObj) displayName = displayObj.name

          map.push({ id: input[n], name: displayName })
        }
      }
      console.log('map', map)
      return map
    }
  },
  watch: {
    value: function(val) {
      this.model = val
    },
    model: function(val) {
      this.$emit('input', val)
    }
  }
})
</script>