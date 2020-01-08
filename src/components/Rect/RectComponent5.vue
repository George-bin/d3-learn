<template>
  <div class="rect-component5"></div>
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
      dataset: [0, 1, 2, 3, 4],
      svg: null,
      xScale: null,
      yScale: null,
      lastCount: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let margin = this.margin;
      let self = this;
      this.ctxW = this.w - margin.left - margin.right;
      this.ctxH = this.h - margin.top - margin.bottom;
      this.lastCount = this.dataset.length - 1;

      // 创建svg元素
      this.svg = d3
        .select(".rect-component5")
        .append("svg")
        .attr("width", self.w)
        .attr("height", self.h)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // 绘制标题
      d3.select(".rect-component5 svg")
        .append("text")
        .attr("class", "title")
        .attr("x", 20)
        .attr("y", 20)
        .text("5、无限滚动")
        .attr("font-size", 14)

      this.handleSetScale();
      this.handleDrawRect();
    },
    // 设置比例尺
    handleSetScale() {
      let d3 = this.$d3;
      let svg = this.svg;
      let ctxH = this.ctxH;
      let dataset = this.dataset;
      this.yScale = d3
        .scaleBand()
        .domain(dataset)
        .range([0, ctxH])
        .paddingInner(0.1);
    },
    // 绘制矩形
    handleDrawRect() {
      let d3 = this.$d3;
      let svg = this.svg;
      let margin = this.margin;
      let ctxH = this.ctxH;
      let ctxW = this.ctxW;
      let yScale = this.yScale;
      let dataset = this.dataset;
      let self = this;

      // 初始化rect
      let bars = svg
        .append("g")
        .attr("class", "rect-section")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function(d, i) {
          return yScale(d);
        })
        .attr("height", yScale.bandwidth())
        .attr("fill", "#005187");

      // 初始化transition
      bars.transition()
        .duration(function(d, i) {
          return (Math.random() + 2) * 1000
        })
        .attr("width", ctxW)
        .on('end', function(d, i) {
          // transition完成，移除svg范围之内
          d3.select(this)
            .transition()
            .duration(1000)
            .attr("x", ctxW + margin.left + margin.right)
            .style("opacity", 0)
            .remove()
            .on('end', function(d, i) {
              // return
              console.log('d', d)
              // 删除已移除的数据，新增新的数据 start
              let index = dataset.findIndex(item => item === d);
              dataset.splice(index, 1);
              self.lastCount += 1;
              dataset.push(self.lastCount);
              // 删除已移除的数据，新增新的数据 end
              // console.log(i, '过渡结束')
              // console.log('dataset', dataset)
              // 重置比例尺
              self.handleSetScale();
              yScale = self.yScale;
              // 重绘
              draw(svg);
            })

        })
      
      function draw(svg) {
        svg.select(".rect-section")
          .selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x", 0)
          .attr("y", function(d, i) {
            // console.log('123', self.yScale(d))
            return yScale(d);
          })
          .attr("height", yScale.bandwidth())
          .attr("fill", "red");

        svg.select(".rect-section")
          .selectAll("rect")
          .transition()
          .duration(2000)
          .attr("width", ctxW)
          .attr("y", function(d, i) {
            // console.log('123', self.yScale(d))
            return yScale(d);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.rect-component5 {
  display: inline-block;
}
</style>
