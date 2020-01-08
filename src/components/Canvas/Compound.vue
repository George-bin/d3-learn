<template>
  <div class="compound-component">
    <h3>合成</h3>
    <canvas id="normal-compound" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="source-in" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="source-out" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="source-atop" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="destination-over" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="destination-in" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="destination-out" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="destination-atop" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="lighter" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="darken" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="xor" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="copy" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
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
      this.handleDrawNormalCompound();
      this.handleDrawSourceIn();
      this.handleDrawSourceOut();
      this.handleDrawSourceAtop();
      this.handleDrawDestinationOver();
      this.handleDrawDestinationIn();
      this.handleDrawDestinationOut();
      this.handleDrawDestinationAtop();
      this.handleDrawLighter();
      this.handleDrawDarken();
      this.handleDrawXor();
      this.handleDrawCopy();
    },
    handleDrawNormalCompound() {
      let canvas = document.getElementById("normal-compound");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");

      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("source-over", 10, 10);

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "source-over"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);
    },
    handleDrawSourceIn() {
      let canvas = document.getElementById("source-in");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "source-in"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("source-in", 10, 10);
    },
    handleDrawSourceOut() {
      let canvas = document.getElementById("source-out");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "source-out"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("source-out", 10, 10);
    },
    handleDrawSourceAtop() {
      let canvas = document.getElementById("source-atop");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "source-atop"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("source-atop", 10, 10);
    },
    handleDrawDestinationOver() {
      let canvas = document.getElementById("destination-over");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "destination-over"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("destination-over", 10, 10);
    },
    handleDrawDestinationIn() {
      let canvas = document.getElementById("destination-in");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "destination-in"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("destination-in", 10, 10);
    },
    handleDrawDestinationOut() {
      let canvas = document.getElementById("destination-out");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "destination-out"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("destination-out", 10, 10);
    },
    handleDrawDestinationAtop() {
      let canvas = document.getElementById("destination-atop");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "destination-atop"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("destination-atop", 10, 10);
    },
    handleDrawLighter() {
      let canvas = document.getElementById("lighter");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "lighter"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("lighter", 10, 10);
    },
    handleDrawDarken() {
      let canvas = document.getElementById("darken");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "darken"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("darken", 10, 10);
    },
    handleDrawXor() {
      let canvas = document.getElementById("xor");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "xor"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("xor", 10, 10);
    },
    handleDrawCopy() {
      let canvas = document.getElementById("copy");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      ctx.save();

      ctx.fillStyle = "blue";
      ctx.fillRect(0, 30, 100, 100);

      ctx.globalCompositeOperation = "copy"; // 全局合成操作
      ctx.fillStyle = "red";
      ctx.fillRect(50, 80, 100, 100);

      ctx.restore();
      ctx.font = "20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("copy", 10, 10);
    }
  }
};
</script>

<style lang="scss">
.compound-component {
}
</style>
