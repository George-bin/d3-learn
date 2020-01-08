<template>
  <div class="draw-img-component">
    <h3>绘制图片</h3>
    <img src="../../assets/test.jpg" alt="" />
    <canvas id="draw-img" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let canvas = document.getElementById('draw-img');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      // 绘制img标签元素中的图片
      // let img = document.querySelector("img");
       // 从零开始绘制
      let img = new Image();
      img.src = require('../../assets/test.jpg');
      // 绘制远程图片
      // img.src = 'http://www.gengshaobin.top/file/uploads/images/blog/157700205152211751.png';
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 130, 200);
      }
    }
  }
}
</script>

<style lang="scss">
.draw-img-component {
  img {
    height: 300px;
  }
}
</style>