<template>
  <div class="svg-text-component">
    <h3>Path(路径)</h3>
    <base-use-component></base-use-component>
  </div>
</template>

<script>
export default {
  components: {
    BaseUseComponent: () => import("@/components/Svg/Introduction/Path/BaseUse")
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.svg-text-component {}
</style>
