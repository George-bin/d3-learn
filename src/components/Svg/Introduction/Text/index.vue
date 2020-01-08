<template>
  <div class="svg-text-component">
    <h3>Text(文本)</h3>
    <vertical-text></vertical-text>
    <text-path-component></text-path-component>
  </div>
</template>

<script>
export default {
  components: {
    VerticalText: () => import("@/components/Svg/Introduction/Text/VerticalText"),
    TextPathComponent: () => import("@/components/Svg/Introduction/Text/TextPath"),
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.svg-text-component {}
</style>
