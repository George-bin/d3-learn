<template>
  <div class="transformation-component">
    <h3>变形</h3>
    <canvas id="translate-canvas" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="rotate-canvas" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="scale-canvas" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="transform-canvas" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.handleTranslate();
      this.handleRotate();
      this.handleScale();
    },
    handleTranslate() {
      let canvas = document.getElementById("translate-canvas");
      if (canvas && !canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.font = "18px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("translate", 10, 10);

      ctx.save(); // 保存坐标原点平移之前的状态
      ctx.translate(50, 90);
      ctx.strokeRect(0, 0, 50, 50);

      ctx.restore();
      ctx.fillRect(0, 40, 50, 50);
    },
    handleRotate() {
      let canvas = document.getElementById("rotate-canvas");
      if (canvas && !canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.font = "18px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("rotate", 10, 10);

      ctx.fillStyle = "red";
      ctx.save(); // 保存默认状态

      ctx.translate(100, 100);
      ctx.rotate(Math.PI / 180 * 45);
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();

      // ctx.translate(0, 0);
      ctx.fillRect(0, 30, 50, 50);
    },
    handleScale() {
      let canvas = document.getElementById("scale-canvas");
      if (canvas && !canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.font = "18px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("scale", 10, 10);
      ctx.save();
      ctx.scale(2, 1);
      ctx.fillRect(20, 30, 50, 50);
    },
    handleScale() {
      let canvas = document.getElementById("transform-canvas");
      if (canvas && !canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.font = "18px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("transform", 10, 10);
      ctx.save();
      ctx.transform(1, 1, 0, 1, 0, 0);
      ctx.fillRect(0, 30, 100, 100);
    }
  }
};
</script>

<style lang="scss">
.transformation-component {
}
</style>
