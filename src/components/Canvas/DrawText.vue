<template>
  <div class="draw-text-component">
    <h3>绘制文本</h3>
    <canvas id="draw-text" width="300" height="300"></canvas>
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
      let canvas = document.getElementById('draw-text');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      ctx.font = '50px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText('耿少斌', 50, 50);
      ctx.strokeText('耿少斌', 50, 120);
      
      ctx.fillStyle = 'red';
      ctx.fillRect(50, 50, 5, 5);
    }
  }
}
</script>

<style lang="scss">
.draw-text-component {}
</style>
