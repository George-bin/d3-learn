<template>
  <div class="svg-example-component">
    <svg-component1></svg-component1>
  </div>
</template>

<script>
export default {
  components: {
    SvgComponent1: () => import("@/components/Svg/Example/SvgExample1")
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.svg-example-component {
  svg {
    background: #f7f7f7;
  }
}
</style>
