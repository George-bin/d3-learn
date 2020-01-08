<template>
  <div class="canvas-component">
    <h2>Canvas学习</h2>
    <introduction></introduction>
    <draw-graph></draw-graph>
    <fill-style></fill-style>
    <stroke-style></stroke-style>
    <line-style></line-style>
    <draw-text></draw-text>
    <draw-img></draw-img>
    <save-and-restore></save-and-restore>
    <transformation></transformation>
    <compound></compound>
    <clip-path-component></clip-path-component>
    <draw-animation></draw-animation>
  </div>
</template>

<script>
export default {
  components: {
    introduction: () => import('@/components/Canvas/Introduction'),
    DrawGraph: () => import('@/components/Canvas/DrawGraph'),
    FillStyle: () => import('@/components/Canvas/FillStyle'),
    StrokeStyle: () => import('@/components/Canvas/StrokeStyle'),
    LineStyle: () => import('@/components/Canvas/LineStyle'),
    DrawText: () => import('@/components/Canvas/DrawText'),
    DrawImg: () => import('@/components/Canvas/DrawImg'),
    SaveAndRestore: () => import('@/components/Canvas/SaveAndRestore'),
    Transformation: () => import('@/components/Canvas/Transformation'),
    Compound: () => import('@/components/Canvas/Compound'),
    ClipPathComponent: () => import('@/components/Canvas/ClipPath'),
    DrawAnimation: () => import('@/components/Canvas/DrawAnimation'),
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.canvas-component {
  canvas {
    background: #f7f7f7;
  }
}
</style>
