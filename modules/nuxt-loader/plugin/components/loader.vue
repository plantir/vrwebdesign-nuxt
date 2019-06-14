<style lang="scss" scoped>
#loading {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
}
</style>

<template>
  <section id="loading">
    <v-progress-circular :width="data.width" :color="data.color" :size="data.size" indeterminate></v-progress-circular>
  </section>
</template>

<script>
export default {
  props: ['data']
}
</script>
