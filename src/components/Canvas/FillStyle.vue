<template>
  <div class="fill-style-component">
    <h3>fillStyle</h3>
    <canvas id="fill-style" width="300" height="300">
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
      let canvas = document.getElementById('fill-style');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          ctx.fillStyle = `rgb(${Math.floor(255-42.5*i)},${Math.floor(255-42.5*j)},0)`;
          ctx.fillRect(j*50, i*50, 50, 50);
        }
      }
    }
  }
}
</script>

<style lang="scss">
.fill-style-component {}
</style>
