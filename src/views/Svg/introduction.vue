<template>
  <div class="svg-introduction-main-component">
    <svg-text-component></svg-text-component>
    <svg-path-component></svg-path-component>
  </div>
</template>

<script>
export default {
  components: {
    SvgTextComponent: () => import("@/components/Svg/Introduction/Text"),
    SvgPathComponent: () => import("@/components/Svg/Introduction/Path"),
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.svg-introduction-main-component {
  svg {
    background: #f7f7f7;
  }
}
</style>
