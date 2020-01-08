<template>
  <div class="line-style-component">
    <h3>lineStyle</h3>
    <canvas id="line-style" width="300" height="300">
      您的浏览器不知canvas元素，请您尽快升级浏览器！
    </canvas>
    <canvas id="line-join" width="300" height="300">
      您的浏览器不知canvas元素，请您尽快升级浏览器！
    </canvas>
    <canvas id="dashed-line" width="300" height="300">
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
    this.handleDrawLineJoin();
    this.handleDrawDashedLine();
  },
  methods: {
    init() {
      let canvas = document.getElementById('line-style');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      let lineCaps = ['butt', 'round', 'square'];
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(20 + 30*i, 30);
        ctx.lineTo(20 + 30*i, 100);
        ctx.lineWidth = 20;
        ctx.lineCap = lineCaps[i];
        ctx.stroke();
      }
    },
    handleDrawLineJoin() {
      let canvas = document.getElementById('line-join');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      ctx.lineWidth = 20;
      let lineJoins = ['round', 'bevel', 'miter'];
      for (let i = 0; i < 3; i++) {
        ctx.lineJoin = lineJoins[i];
        ctx.beginPath();
        ctx.moveTo(50, 50 + i * 50);
        ctx.lineTo(100, 100 + i * 50);
        ctx.lineTo(150, 50 + i * 50);
        ctx.lineTo(200, 100 + i * 50);
        ctx.lineTo(250, 50 + i * 50);
        ctx.stroke();
      }
    },
    handleDrawDashedLine() {
      let canvas = document.getElementById('dashed-line');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');

      ctx.setLineDash([20, 5]); // [实线长度，间隙长度]
      ctx.lineDashOffset = 0; // 起始位置的偏移量
      ctx.strokeRect(50, 50, 200, 200);
    }
  }
}
</script>

<style lang="scss">
.line-style-component {}
</style>
