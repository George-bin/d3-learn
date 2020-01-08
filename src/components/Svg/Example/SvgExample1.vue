<template>
  <div class="svg-example1-component"></div>
</template>

<script>
let self = null;
export default {
  data() {
    return {
      margin: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 30
      },
      w: 400,
      h: 300,
      ctxW: 0,
      ctxH: 0,
      xScale: null,
      yScale: null,
      svg: null,
      dataset: [
        {
          label: "HTML",
          value: 0.9
        },
        {
          label: "CSS",
          value: 0.75
        },
        {
          label: "JS",
          value: 0.55
        },
        {
          label: "Node",
          value: 0.4
        },
        {
          label: "小程序",
          value: 0.5
        },
        {
          label: "Sass",
          value: 0.5
        },
        {
          label: "Less",
          value: 1
        }
      ],
      colors: [
        "#ff8817",
        "#177fcb",
        "#f8ca4d",
        "#5864a2",
        "#cf7aa4",
        "#d04c8f",
        "rgba(0,80,80,.3)"
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let d3 = this.$d3;
      self = this;
      let margin = this.margin;
      let dataset = this.dataset;
      this.ctxW = this.w - margin.left - margin.right;
      this.ctxH = this.h - margin.top - margin.bottom;
      // 创建svg元素
      this.svg = d3
        .select(".svg-example1-component")
        .append("svg")
        .attr("width", self.w)
        .attr("height", self.h)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      this.handleInitScale();
      this.handleDrawRect();
    },
    // 定义比例尺
    handleInitScale() {
      let d3 = this.$d3;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let dataset = this.dataset;
      this.yScale = d3
        .scaleBand()
        .domain(
          dataset.map(d => {
            return d.label;
          })
        )
        .range([0, ctxH])
        .paddingInner(0.12);
    },
    // 绘制矩形
    handleDrawRect() {
      let d3 = this.$d3;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let dataset = this.dataset;
      let xScale = this.xScale;
      let yScale = this.yScale;
      // 定义背景
      this.svg
        .append("g")
        .attr("id", "rect-bg-section")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width", self.ctxW)
        .attr("height", yScale.bandwidth())
        .attr("fill", "#fff")
        .attr("x", 0)
        .attr("y", function(d) {
          return yScale(d.label);
        })
        .attr("rx", 5)
        .attr("ry", 5);
      // 定义条形柱
      let bars = this.svg
        .append("g")
        .attr("id", "rect-section")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("height", yScale.bandwidth())
        .attr("fill", function(d, i) {
          return self.colors[i];
        })
        .attr("x", 0)
        .attr("y", function(d) {
          return yScale(d.label);
        })
        .attr("rx", 5)
        .attr("ry", 5);
      
      bars.transition()
        .duration(function(d, i) {
          return (Math.random() + 2) * 1000;
        })
        .attr("width", function(d) {
          return ctxW * d.value;
        });

      // 定义标签
      this.svg
        .append("g")
        .attr("id", "label-bg-section")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width", 70)
        .attr("height", yScale.bandwidth())
        .attr("fill", "rgba(0,0,0,0.3)")
        .attr("x", 0)
        .attr("y", function(d) {
          return yScale(d.label);
        })
        .attr("rx", 5)
        .attr("ry", 5);
      this.svg
        .append("g")
        .attr("id", "label-text-section")
        .selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
          return d.label;
        })
        .attr("text-anchor", "middle") // 水平居中
        .attr("dominant-baseline", "middle") // 垂直居中
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("fill", "#fff")
        .attr("x", 35)
        .attr("y", function(d) {
          return yScale(d.label) + yScale.bandwidth() / 2;
        });

      this.svg
        .append("g")
        .attr("id", "value-text-section")
        .selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
          return (d.value * 100).toFixed(0) + "%";
        })
        .attr("text-anchor", "middle") // 水平居中
        .attr("dominant-baseline", "middle") // 垂直居中
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("x", ctxW - 20)
        .attr("y", function(d) {
          return yScale(d.label) + yScale.bandwidth() / 2;
        });
    }
  }
};
</script>

<style lang="scss">
.svg-example1-component {
}
</style>
