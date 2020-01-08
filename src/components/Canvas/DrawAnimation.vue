<template>
  <div class="draw-animation-component">
    <h3>绘制动画</h3>
    <canvas id="draw-animation1" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
    <canvas id="draw-animation2" width="300" height="300">您的浏览器不支持canvas元素，请您尽快升级浏览器！</canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
    this.handleDrawClock();
  },
  methods: {
    init() {
      let canvas = document.getElementById("draw-animation1");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");
      draw();
      function draw() {
        ctx.save();
        ctx.clearRect(0, 0, 300, 300); // 清空所有的内容
        ctx.fillStyle = "yellow";
        // 绘制太阳
        ctx.beginPath();
        ctx.arc(150, 150, 25, 0, Math.PI / 180 * 360);
        ctx.closePath();
        ctx.fill();

        ctx.translate(150, 150);
        // 绘制earth轨道
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
        ctx.arc(0, 0, 100, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        let time = new Date();
        ctx.fillStyle = "blue";
        // console.log('弧度', 2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds())
        // 绘制地球
        ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds());
        ctx.translate(100, 0);
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI)
        // ctx.closePath();
        ctx.fill();

        // 绘制月球轨道
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.arc(0, 0, 40, 0, 2 * Math.PI);
        ctx.stroke();

        // 绘制月球
        ctx.rotate(2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6000 * time.getMilliseconds());
        ctx.translate(40, 0);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.arc(0, 0, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(draw);
      }
      
    },
    handleDrawClock() {
      let canvas = document.getElementById('draw-animation2');
      if (!canvas.getContext) return;
      let ctx = canvas.getContext('2d');
      draw(ctx);

      function draw(ctx) {
        requestAnimationFrame(function step() {
          drawDial(ctx)
          drawAllHands(ctx);
          requestAnimationFrame(step);
        });
      }

      // 绘制时分秒针
      function drawAllHands() {
        let time = new Date();
        let s = time.getSeconds();
        let m = time.getMinutes();
        let h = time.getHours();

        let pi = Math.PI;
        let secondAngle = pi / 180 * 6 * s;  //计算出来s针的弧度
        let minuteAngle = pi / 180 * 6 * m + secondAngle / 60;  //计算出来分针的弧度
        let hourAngle = pi / 180 * 30 * h + minuteAngle / 12;  //计算出来时针的弧度
    
        drawHand(hourAngle, 60, 6, "red", ctx);  //绘制时针
        drawHand(minuteAngle, 106, 4, "green", ctx);  //绘制分针
        drawHand(secondAngle, 129, 2, "blue", ctx);  //绘制秒针
      }

      /*绘制时针、或分针、或秒针
      * 参数1：要绘制的针的角度
      * 参数2：要绘制的针的长度
      * 参数3：要绘制的针的宽度
      * 参数4：要绘制的针的颜色
      * 参数4：ctx
      * */
      function drawHand(angle, len, width, color, ctx){
        ctx.save();
        ctx.translate(150, 150); //把坐标轴的远点平移到原来的中心
        ctx.rotate(-Math.PI / 2 + angle);  //旋转坐标轴。 x轴就是针的角度
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(len, 0);  // 沿着x轴绘制针
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }

      // 绘制表盘
      function drawDial(ctx) {
        console.log('ctx', ctx)
        let pi = Math.PI;
        ctx.clearRect(0, 0, 300, 300);
        ctx.save();

        // 设置坐标原点
        ctx.translate(150, 150);
        ctx.beginPath();
        // 绘制圆周
        ctx.arc(0, 0, 148, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        // 绘制刻度
        for (let i = 0; i < 60; i++) {
          ctx.save();
          // 旋转坐标轴。坐标轴x的正方形从 向上开始算起
          ctx.rotate(-pi / 2 + i * pi / 30);
          ctx.beginPath();
          ctx.moveTo(110, 0);
          ctx.lineTo(140, 0);
          ctx.lineWidth = i % 5 ? 2 : 4;
          ctx.strokeStyle = i % 5 ? "blue" : "red";
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }

        ctx.restore();
      }
    }
  }
};
</script>

<style lang="scss">
.draw-animation-component {
  canvas {
    background: black;
  }
  #draw-animation2 {
    // background: #f7f7f7;
  }
}
</style>
