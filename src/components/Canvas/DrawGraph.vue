<template>
  <div class="draw-graph-component">
    <h3>绘制图形</h3>
    <canvas id="fill-graph" width="500" height="500"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let canvas = document.getElementById('fill-graph');
      if (!canvas.getContext) return;
      // 获取上下文
      this.ctx = canvas.getContext('2d');
      this.handleDrawRect();
      this.handleDrawLine();
      this.handleDrawTriangle();
      this.handleDrawArc();
      this.handleDrawQuadraticCurve();
      this.handleDrawThreeQuadraticCurve();
    },
    // 绘制矩形
    handleDrawRect() {
      let ctx = this.ctx;
      ctx.fillRect(10, 10, 100, 50); // 绘制矩形
      ctx.strokeRect(10, 70, 100, 50); // 绘制矩形边框
      ctx.clearRect(20, 20, 50, 30); // 清除指定的矩形区域
    },
    // 绘制线段
    handleDrawLine() {
      let ctx = this.ctx;
      // 新建一条path
      ctx.beginPath();
      // 把画笔移动到指定位置(设置起始位置)
      ctx.moveTo(120, 50);
      // 绘制一条从当前位置到指定坐标(200, 50)的直线.
      ctx.lineTo(200, 50);
      // 闭合路径(会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做)
      ctx.closePath();
      // 绘制路径
      ctx.stroke();
    },
    // 绘制三角形
    handleDrawTriangle() {
      let ctx = this.ctx;
      // 绘制边框三角形
      ctx.beginPath();
      ctx.moveTo(50, 140);
      ctx.lineTo(80, 170);
      ctx.lineTo(20, 170);
      ctx.closePath();
      ctx.stroke();
      // 绘制实心三角形
      ctx.beginPath();
      ctx.moveTo(120, 140);
      ctx.lineTo(150, 170);
      ctx.lineTo(90, 170);
      ctx.closePath();
      ctx.fill();
    },
    // 绘制圆弧
    handleDrawArc() {
      let ctx = this.ctx;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(50, 210, 30, 0, Math.PI/2, true);
      // ctx.closePath();
      ctx.strokeStyle = 'red';
      ctx.stroke();
      // ctx.fill();

      // 绘制底层
      ctx.beginPath();
      ctx.arc(50, 210, 30, 0, Math.PI/2, false);
      ctx.strokeStyle = 'gray';
      ctx.stroke();

      // 绘制闭合曲线
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(140, 210, 30, 0, Math.PI/2, true);
      ctx.closePath();
      ctx.strokeStyle = 'gray';
      ctx.stroke();

      // 绘制曲面
      ctx.beginPath();
      ctx.arc(220, 210, 30, -Math.PI/2, Math.PI/2, false);
      ctx.closePath();
      ctx.fillStyle = 'green';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(300, 210, 30, 0, Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = 'red';
      ctx.fill();

      // 使用arcTo绘制
      ctx.beginPath();
      ctx.moveTo(360, 210);
      ctx.arcTo(400, 210, 440, 240, 100);
      ctx.stroke();
    },
    // 绘制两次贝塞尔曲线
    handleDrawQuadraticCurve() {
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(20, 280); // 起始点
      var cp1x = 40, cp1y = 240;  //控制点
      var x = 100, y = 280; // 结束点
      //绘制二次贝塞尔曲线
      ctx.quadraticCurveTo(cp1x, cp1y, x, y);
      ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(20, 280); // 起始点
      // //绘制二次贝塞尔曲线
      // ctx.quadraticCurveTo(cp1x, cp1y, x, y);
      // ctx.fill();
    },
    // 绘制三次贝塞尔曲线
    handleDrawThreeQuadraticCurve() {
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(40, 360);
      var cp1x = 20, cp1y = 320;  //控制点1
      var cp2x = 100, cp2y = 300;  //控制点2
      var x = 90, y = 400; // 结束点
      //绘制二次贝塞尔曲线
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      ctx.stroke();
    }
  }
}
</script>

<style lang="scss">
.draw-graph-component {}
</style>
