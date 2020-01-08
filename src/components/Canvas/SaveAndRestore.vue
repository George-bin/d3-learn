<template>
  <div class="save-and-restore-component">
    <h3>状态的保存和恢复</h3>
    <canvas id="save-and-restore" width="300" height="100">
      您的浏览器不支持canvas元素，请您尽快升级浏览器！
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
      let canvas = document.getElementById('save-and-restore');
      if (canvas && !canvas.getContext) return;
      let ctx = canvas.getContext('2d');

      ctx.fillRect(10, 10, 50, 50);
      ctx.save(); // 保存默认状态

      ctx.fillStyle = 'red';
      ctx.fillRect(70, 10, 50, 50);
      ctx.save();

      ctx.fillStyle = '#fff';
      ctx.fillRect(130, 10, 50, 50);

      ctx.restore(); // 重载之前的状态
      ctx.fillRect(190, 10, 50, 50);

      ctx.restore(); // 重载之前的状态
      ctx.fillRect(250, 10, 50, 50);
    }
  }
}
</script>

<style lang="scss">
.save-and-restore-component {}
</style>
