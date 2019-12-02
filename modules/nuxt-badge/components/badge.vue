<style lang="scss" scoped>
span.vr-badge {
  border-radius: 1rem;
  padding: 0.75rem;
  background: #fd397a;
  font-size: 0.825rem;
  color: #fff;
  height: 0;
  width: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  &.badge-dot {
    background: transparent !important;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #fd397a;
    span.dot {
      content: '';
      display: inline-block;
      line-height: 6px;
      min-height: 6px;
      min-width: 6px;
      height: 6px;
      width: 6px;
      font-size: 0;
      vertical-align: middle;
      text-align: center;
      background: #fd397a;
      border-radius: 50%;
      margin-left: 4px;
      margin-top: 3px;
    }
  }
}
</style>

<template >
  <span ref="badge" class="vr-badge" :class="classList">
    <span ref="dot" class="dot" :class="dotClassList" v-if="type == 'dot'"></span>
    <slot></slot>
  </span>
</template>
<script>
export default {
  props: {
    type: {},
    color: {
      type: String
    }
  },
  mounted() {
    this.setBackgroundColor()
  },
  computed: {
    classList() {
      let classList = ''
      if (this.color && !this.color.startsWith('#')) {
        classList += this.color
      }
      if (this.type == 'dot') {
        if (classList == '') {
          classList += ' badge-dot'
        } else {
          classList += '--text badge-dot'
        }
      }
      return classList
    },
    dotClassList() {
      let classList = ''
      if (this.color && !this.color.startsWith('#')) {
        classList += this.color
      }
      return classList
    }
  },
  methods: {
    setBackgroundColor() {
      if (this.color && this.color.startsWith('#')) {
        this.$refs.badge.style.backgroundColor = this.color
        if (this.type == 'dot') {
          this.$refs.badge.style.color = this.color
          this.$refs.dot.style.backgroundColor = this.color
        }
      }
    }
  },
  watch: {
    color: {
      handler(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) {
          return
        }
        this.color = value
        this.setBackgroundColor()
      },
      deep: true
    }
  }
}
</script>
