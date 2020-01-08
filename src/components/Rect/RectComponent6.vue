
<template>
  <div class="rect-component6">
    <div class="btn-group">
      <span class="btn-group-item" @click="handleClickAddRect">增</span>
      <span class="btn-group-item" @click="handleClickDelRect">减</span>
    </div>
  </div>
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
        .select(".rect-component6")
        .append("svg")
        .attr("width", self.w)
        .attr("height", self.h)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // 绘制标题
      d3.select(".rect-component6 svg")
        .append("text")
        .attr("class", "title")
        .attr("x", 20)
        .attr("y", 20)
        .text("6、动画增减元素")
        .attr("font-size", 14);

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
      bars
        .transition()
        .duration(function(d, i) {
          return (Math.random() + 2) * 1000;
        })
        .attr("width", ctxW)
        .on("end", function(d, i) {
          return;
          // transition完成，移除svg范围之内
          d3.select(this)
            .transition()
            .duration(1000)
            .attr("x", ctxW + margin.left + margin.right)
            .style("opacity", 0)
            .remove()
            .on("end", function(d, i) {
              // return
              console.log("d", d);
              // 删除已移除的数据，新增新的数据 start
              // let index = dataset.findIndex(item => item === d);
              // dataset.splice(index, 1);
              // self.lastCount += 1;
              // dataset.push(self.lastCount);
              // 删除已移除的数据，新增新的数据 end
              // console.log(i, '过渡结束')
              // console.log('dataset', dataset)
              // 重置比例尺
              // self.handleSetScale();
              // yScale = self.yScale;
            });
        });

      // 初始化text
      let texts = svg
        .append("g")
        .attr("class", "text-section")
        .selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", function(d, i) {
          return yScale(d) + yScale.bandwidth() / 2;
        })
        .attr('text-anchor', 'middle') // 水平居中
        .attr('dominant-baseline', 'middle') // 垂直居中
        .attr('font-family', 'sans-serif')
        .attr("fill", "white")
        .text(function(d) {
          return d
        });
    },
    // 添加矩形
    handleClickAddRect() {
      console.log("新增rect");
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let yScale = this.yScale;
      let self = this;
      let dataset = this.dataset;
      // dataset.pop();
      this.lastCount += 1;
      dataset.push(this.lastCount);

      // 更新y轴比例尺
      this.yScale.domain(dataset);
      //选择所有条
      this.svg
        .select(".rect-section")
        .selectAll("rect")
        .data(dataset) // 绑定数据到元素集，返回更新的元素集
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function(d) {
          return yScale(d);
        })
        .attr("height", yScale.bandwidth()); // 在SVG最右边，不可见

      // 更新矩形到可见范围之内，并在这个时候根据数据集为每个条设置对应的属性
      this.handleUpdateBand();
    },
    // 删除矩形
    handleClickDelRect() {
      let d3 = this.$d3;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let dataset = this.dataset;
      let yScale = this.yScale;
      console.log(dataset)
      this.dataset.shift();
      // 更新y轴比例尺
      yScale.domain(dataset);
      console.log(dataset)
      
      let bars = this.svg.select(".rect-section")
        .selectAll('rect')
        .data(dataset);
      
      bars.exit()
        .transition()
        .duration(1000)
        .attr("x", ctxW)
        .remove();
    },
    handleUpdateBand() {
      let d3 = this.$d3;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let yScale = this.yScale;
      let self = this;
      this.svg
        .select(".rect-section")
        .selectAll("rect")
        .transition()
        .duration(500)
        .attr("x", 0)
        .attr("y", function(d) {
          return yScale(d);
        })
        .attr("width", ctxW)
        .attr("height", yScale.bandwidth())
        .attr("fill", "#005187");
    }
  }
};
</script>

<style lang="scss">
.rect-component6 {
  position: relative;
  display: inline-block;
  .btn-group {
    position: absolute;
    right: 30px;
    top: 5px;
    display: flex;
    font-size: 12px;
    .btn-group-item {
      width: 40px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: white;
      background: gray;
      cursor: pointer;
      border-radius: 4px;
    }
    .btn-group-item + .btn-group-item {
      margin-left: 10px;
    }
  }
}
</style>
