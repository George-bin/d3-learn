<template>
  <div class="path-base-use-component">
    <svg width="400" height="300">
      <text x="20" y="20" font-size="14">Path(基本使用)</text>
      <g transform="translate(60, 40)">
        <!-- 通过path绘制rect -->
        <path d="M0 0 H 50 v 50 H 0 L 0 0"></path>

        <!-- 通过闭合路径Z简化上面步骤 -->
        <path d="M60 0 H 100 v 50 H 60 Z"></path>

        <!-- 使用相对命令创建rect -->
        <path d="M150 0 h 50 v 50 h -80 Z"></path>

        <!-- 三次贝塞尔曲线 -->
        <!-- fill="transparent"透明背景 -->
        <path d="M20 70 C 0 100, 80 100, 60 70" stroke="black" fill="transparent" />

        <!-- 简写的贝塞尔曲线命令S -->
        <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent" />

        <!-- 二次贝塞尔曲线 -->
        <path d="M0 120 Q 40 100 80 120" stroke="black" fill="transparent"/>

        <path d="M0 150 Q 40 130, 80 150 T 150 160" stroke="black" fill="transparent"/>

        <!-- 弧形 -->
        <path d="M10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.path-base-use-component {}
</style>
