<template>
  <div class="clip-path-component">
    <h3>裁剪路径</h3>
    <canvas id="clip-path" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
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
      let canvas = document.getElementById("clip-path");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.arc(20,20, 100, 0, Math.PI * 2);
      ctx.clip();
  
      ctx.fillStyle = "pink";
      ctx.fillRect(20, 20, 100,100);
    }
  }
};
</script>

<style lang="scss">
.clip-path-component {
}
</style>
