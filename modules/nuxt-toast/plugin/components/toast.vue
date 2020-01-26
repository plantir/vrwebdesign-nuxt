<style lang="scss" scoped>
</style>

<template>
  <section>
    <v-snackbar
      v-model="toast.show"
      :color="toast.customClass?toast.color:''"
      :bottom="toast.bottom"
      :left="toast.left"
      :multi-line="toast.multiLine"
      :right="toast.right"
      :timeout="toast.timeout"
      :top="toast.top"
      :vertical="toast.vertical"
      @change="change"
      :class="toast.customClass||''"
    >
      <div v-html="toast.message"></div>
      <v-icon @click="close" :color="toast.customClass || '#fff'">la-close</v-icon>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      toast: {}
    }
  },
  watch: {
    toast: {
      handler: function(value) {
        if (!value.show) {
          this.toast.resolve()
        }
      },
      deep: true
    }
  },
  methods: {
    commit(toast) {
      this.toast = toast
    },
    change() {},
    close() {
      this.toast.show = false
      this.toast.resolve()
    }
  }
}
</script>
