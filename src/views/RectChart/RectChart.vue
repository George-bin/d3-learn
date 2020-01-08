<template>
  <div class="rect-chart-component">
    <h2>柱状图</h2>
    <rect-component1></rect-component1>
    <rect-component2></rect-component2>
    <rect-component3></rect-component3>
    <rect-component4></rect-component4>
    <rect-component5></rect-component5>
    <rect-component6></rect-component6>
  </div>
</template>

<script>
export default {
  components: {
    RectComponent1: () => import('@/components/Rect/RectComponent1'),
    RectComponent2: () => import('@/components/Rect/RectComponent2'),
    RectComponent3: () => import('@/components/Rect/RectComponent3'),
    RectComponent4: () => import('@/components/Rect/RectComponent4'),
    RectComponent5: () => import('@/components/Rect/RectComponent5'),
    RectComponent6: () => import('@/components/Rect/RectComponent6'),
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.rect-chart-component {
  svg, canvas {
    display: block;
    background: #f7f7f7;
  }
}
</style>
