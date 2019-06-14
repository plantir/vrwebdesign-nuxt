<style lang="scss">
.dialog-container .animated {
  animation-duration: 0.4s;
}
</style>


<template>
  <div class="dialog-container">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      appear
      @after-leave="animationEnded('backdrop')"
    >
      <div v-if="show" @click="close('close')" class="backdrop"></div>
    </transition>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
      @after-leave="animationEnded('content')"
      appear
    >
      <div v-if="show" class="dialog-wrapper">
        <component
          :scope="dialog.scope"
          :dialog="dialog"
          :is="dialog.component"
          @close="close"
          @hide="hide"
        ></component>
      </div>
    </transition>
  </div>
</template>

<script>
const ANIMATION_TYPES = {
  FADE: 'dg-fade',
  ZOOM: 'dg-zoom',
  BOUNCE: 'dg-bounce'
}
export default {
  props: ['dialog'],
  data() {
    return {
      show: true,
      endedAnimations: [],
      returnData: null,
      emit_type: 'close'
    }
  },
  methods: {
    animationEnded(type) {
      this.endedAnimations.push(type)

      if (
        this.endedAnimations.indexOf('backdrop') !== -1 &&
        this.endedAnimations.indexOf('content') !== -1
      ) {
        this.$emit(this.emit_type, {
          dialog: this.dialog,
          data: this.returnData
        })
      }
    },
    close(reason) {
      this.show = false
      this.returnData = reason
      this.emit_type = 'close'
    },
    hide(data) {
      this.show = false
      this.returnData = data
      this.emit_type = 'hide'
    }
  },
  computed: {
    animation() {
      let a = this.dialog.animation && this.dialog.animation.toUpperCase()
      return ANIMATION_TYPES.hasOwnProperty(a)
        ? ANIMATION_TYPES[a]
        : ANIMATION_TYPES.ZOOM
    }
  }
}
</script>