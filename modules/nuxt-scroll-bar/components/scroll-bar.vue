<script>
import PerfectScrollbar from 'perfect-scrollbar'
export default {
  name: 'vr-scroll-bar',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    tag: {
      type: String,
      required: false,
      default: 'div'
    }
  },
  data() {
    return {
      ps: null
    }
  },
  mounted() {
    if (!this.ps) {
      this.ps = new PerfectScrollbar(this.$refs.containerScrollBar)
    }
  },
  updated() {
    this.update()
  },
  beforeDestroy() {
    this.destory()
  },
  methods: {
    update() {
      if (this.ps) {
        this.ps.update()
      }
    },
    destory() {
      if (this.ps) {
        //this.ps.destory()
        this.ps = null
      }
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        ref: 'containerScrollBar',
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
<style>
@import './perfect-scrollbar.css';
.ps {
  position: relative;
}

.containerScrollBar {
  position: relative;
  overflow: hidden;
}
</style>
