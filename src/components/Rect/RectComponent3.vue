<template>
  <div class="rect-component3"></div>
</template>

<script>
export default {
  data() {
    return {
      margin: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 50
      },
      w: 400,
      h: 300,
      ctxW: 0,
      ctxH: 0,
      dataset: [
        { letter: "A", frequency: 0.08167 },
        { letter: "B", frequency: 0.01492 },
        { letter: "C", frequency: 0.02782 },
        { letter: "D", frequency: 0.04253 },
        { letter: "E", frequency: 0.12702 },
        { letter: "F", frequency: 0.02288 },
        { letter: "G", frequency: 0.02015 },
        { letter: "H", frequency: 0.06094 },
        { letter: "I", frequency: 0.06966 },
        { letter: "J", frequency: 0.00153 },
        { letter: "K", frequency: 0.00772 },
        { letter: "L", frequency: 0.04025 },
        { letter: "M", frequency: 0.02406 },
        { letter: "N", frequency: 0.06749 },
        { letter: "O", frequency: 0.07507 },
        { letter: "P", frequency: 0.01929 },
        { letter: "Q", frequency: 0.00095 },
        { letter: "R", frequency: 0.05987 },
        { letter: "S", frequency: 0.06327 },
        { letter: "T", frequency: 0.09056 },
        { letter: "U", frequency: 0.02758 },
        { letter: "V", frequency: 0.00978 },
        { letter: "W", frequency: 0.0236 },
        { letter: "X", frequency: 0.0015 },
        { letter: "Y", frequency: 0.01974 },
        { letter: "Z", frequency: 0.00074 }
      ],
      ctx: null,
      xScale: null,
      yScale: null,
      padding: 2
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      this.ctxW = this.w - margin.left - margin.right;
      this.ctxH = this.h - margin.left - margin.right;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let self = this;
      let pixel =  window.devicePixelRatio;

      d3.select(".rect-component3")
        .append("canvas")
        .attr("id", "rect-canvas")
        .attr("width", self.w * pixel)
        .attr("height", self.h * pixel)
        .text("您的浏览器不知canvas元素，请您尽快升级浏览器！");

      let canvas = document.getElementById("rect-canvas");
      if (!canvas.getContext) return;
      this.ctx = canvas.getContext("2d");
      this.ctx.save();

      this.ctx.scale(2, 2);
      this.ctx.textAlign = "left";
      this.ctx.textBaseline = "top";
      this.ctx.font = "14px sans-serif";
      this.ctx.fillText("3、常见柱形图（canvas）", 20, 10);
      this.ctx.restore();

      this.handleSetScale();
      this.handleDrawAxis();
      this.handleDrawRect();
    },
    // 设置比例尺
    handleSetScale() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      console.log('ctxW', ctxW)
      console.log('ctxH', ctxH)
      this.xScale = d3
        .scaleBand()
        .domain(
          dataset.map(function(d) {
            return d.letter;
          })
        )
        .range([0, ctxW])
        .paddingInner(0.1);

      this.yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dataset, function(d) {
            return d.frequency;
          })
        ])
        .range([ctxH, 0]);
    },
    // 创建坐标轴
    handleDrawAxis() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let xScale = this.xScale;
      let yScale = this.yScale;
      let ctx = this.ctx;

      var yTickCount = 10,
        yTicks = yScale.ticks(yTickCount),
        yTickFormat = yScale.tickFormat(yTickCount, "%");

      ctx.scale(2, 2);
      // 绘制y轴
      ctx.beginPath();
      ctx.moveTo(margin.left, 6.5 + ctxH + margin.top);
      ctx.lineTo(margin.left, 0.5 + ctxH + margin.top);
      ctx.lineTo(ctxW + margin.left, 0.5 + ctxH + margin.top);
      ctx.lineTo(ctxW + margin.left, 6.5 + ctxH + margin.top);
      ctx.strokeStyle = "black";
      ctx.stroke();

      // 绘制x轴刻标
      ctx.beginPath();
      xScale.domain().forEach(function(d) {
        // console.log('起始点', xScale(d) + xScale.bandwidth() / 2, ctxH)
        // console.log('结束点', xScale(d) + xScale.bandwidth() / 2, ctxH + 6)
        ctx.moveTo(xScale(d) + xScale.bandwidth() / 2 + margin.left, 0.5 + ctxH + margin.top);
        ctx.lineTo(xScale(d) + xScale.bandwidth() / 2 + margin.left, 6.5 + ctxH + margin.top);
      });
      ctx.strokeStyle = "black";
      ctx.stroke();

      // 绘制x轴刻度
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "10px sans-serif";
      xScale.domain().forEach(function(d) {
        ctx.fillText(d, xScale(d) + xScale.bandwidth() / 2 + margin.left, ctxH + 10 + margin.top);
      });

      // 绘制y轴
      ctx.beginPath();
      ctx.moveTo(-6 + margin.left, 0.5 + margin.top);
      ctx.lineTo(0 + margin.left, 0.5 + margin.top);
      ctx.lineTo(0 + margin.left, ctxH + margin.top);
      ctx.lineTo(-6 + margin.left, ctxH + margin.top);
      ctx.strokeStyle = "black";
      ctx.stroke();

      // 绘制y轴刻标
      ctx.beginPath();
      yTicks.forEach(function(d) {
        ctx.moveTo(0 + margin.left, yScale(d) + margin.top);
        ctx.lineTo(-6 + margin.left, yScale(d) + margin.top);
      });
      ctx.strokeStyle = "black";
      ctx.stroke();

      // 绘制y轴刻度
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      yTicks.forEach(function(d) {
        console.log(yTickFormat(d))
        ctx.fillText(yTickFormat(d), -9 + margin.left, yScale(d) + margin.top);
      });
      ctx.restore();
    },
    // 绘制矩形
    handleDrawRect() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let xScale = this.xScale;
      let yScale = this.yScale;
      let ctx = this.ctx;
      let self = this;

      // 绘制文字
      ctx.save();
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = "9px sans-serif";
      ctx.fillText("Frequency", -margin.left - 35, margin.top + 12);
      ctx.restore();

      ctx.fillStyle = "steelblue";
      dataset.forEach(function(d) {
        self.roundRect(ctx, xScale(d.letter) + margin.left + 2, yScale(d.frequency) + margin.top, xScale.bandwidth() - 4, ctxH - yScale(d.frequency), 5)

        // ctx.fillRect(xScale(d.letter) + margin.left + 2, yScale(d.frequency) + margin.top, xScale.bandwidth() - 4, ctxH - yScale(d.frequency));
      });
    },
    //绘制圆角矩形
    roundRect(ctx, x, y, w, h, r) {
      ctx.save();
      if (w < 2 * r) {r = w / 2;}
      if (h < 2 * r){ r = h / 2;}
      ctx.beginPath();
      ctx.fillStyle = "red";
      // ctx.setStrokeStyle('white');
      // ctx.setFillStyle('white')
      // ctx.setLineWidth(4);
      ctx.moveTo(x+r, y);
      ctx.arcTo(x+w, y, x+w, y+h, r);
      ctx.arcTo(x+w, y+h, x, y+h, r);
      ctx.arcTo(x, y+h, x, y, r);
      ctx.arcTo(x, y, x+w, y, r);
      ctx.fill();
      ctx.closePath();
    }
  }
};
</script>

<style lang="scss">
.rect-component3 {
  display: inline-block;
  canvas {
    width: 400px;
    height: 300px;
  }
}
</style>
