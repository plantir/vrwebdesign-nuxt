<style lang="scss" scoped>
::v-deep {
  .v-snack__content {
    font-size: 0.975rem;
  }
}
</style>

<template>
  <section>
    <v-snackbar
      absolute
      v-model="toast.show"
      :timeout="toast.timeout"
      :color="toast.color"
      :bottom="toast.bottom"
      :left="toast.left"
      :right="toast.right"
      :top="toast.top"
      :vertical="toast.vertical"
      :multi-line="toast.multiLine"
      :class="toast.customClass||''"
      :shaped="toast.shaped"
      :outlined="toast.outlined"
      :text="toast.text"
      :rounded="toast.rounded"
    >
      <div v-html="toast.message"></div>
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="iconColor"
          icon
          text
          depressed
          :ripple="false"
          v-bind="attrs"
          @click="toast.show = false"
        >
          <v-icon>la-times</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      toast: {},
    }
  },
  watch: {
    toast: {
      handler: function (value) {
        if (!value.show) {
          this.toast.resolve()
        }
      },
      deep: true,
    },
  },
  methods: {
    commit(toast) {
      this.toast = toast
    },
    change() {},
    close() {
      this.toast.show = false
      this.toast.resolve()
    },
  },
  computed: {
    iconColor() {
      if (this.toast.customClass) return this.toast.customClass
      if (this.toast.outlined) return this.toast.color
      return '#fff'
    },
  },
}
</script>
