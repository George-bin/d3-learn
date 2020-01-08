<template>
  <div class="canvas-introduction-components">
    <h3>入门</h3>
    <canvas id="tutorial" width="300" height="200">
      您的浏览器不知canvas元素，请您尽快升级浏览器！
    </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let canvas = document.getElementById('tutorial');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgb(200,0,0)';
      // 绘制矩形
      ctx.fillRect(10, 10, 55, 50);
      ctx.fillStyle = 'rgba(0,0,200,0.5)';
      ctx.fillRect(30, 30, 55, 50);
    }
  }
}
</script>

<style lang="scss">
.canvas-introduction-components {}
</style>
