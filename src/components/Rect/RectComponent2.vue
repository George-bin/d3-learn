<template>
  <div class="rect-component2"></div>
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
      w: 0,
      h: 0,
      dataset: [
        { letter: 'A', frequency: 0.08167 },
        { letter: 'B', frequency: 0.01492 },
        { letter: 'C', frequency: 0.02782 },
        { letter: 'D', frequency: 0.04253 },
        { letter: 'E', frequency: 0.12702 },
        { letter: 'F', frequency: 0.02288 },
        { letter: 'G', frequency: 0.02015 },
        { letter: 'H', frequency: 0.06094 },
        { letter: 'I', frequency: 0.06966 },
        { letter: 'J', frequency: 0.00153 },
        { letter: 'K', frequency: 0.00772 },
        { letter: 'L', frequency: 0.04025 },
        { letter: 'M', frequency: 0.02406 },
        { letter: 'N', frequency: 0.06749 },
        { letter: 'O', frequency: 0.07507 },
        { letter: 'P', frequency: 0.01929 },
        { letter: 'Q', frequency: 0.00095 },
        { letter: 'R', frequency: 0.05987 },
        { letter: 'S', frequency: 0.06327 },
        { letter: 'T', frequency: 0.09056 },
        { letter: 'U', frequency: 0.02758 },
        { letter: 'V', frequency: 0.00978 },
        { letter: 'W', frequency: 0.02360 },
        { letter: 'X', frequency: 0.00150 },
        { letter: 'Y', frequency: 0.01974 },
        { letter: 'Z', frequency: 0.00074 }
      ],
      svg: null,
      xScale: null,
      yScale: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      this.w = 400 - margin.left - margin.right;
      this.h = 300 - margin.top - margin.bottom;
      let w = this.w;
      let h = this.h;
      let self = this;

      // 定义比例尺
      this.xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .paddingInner(0.3)
        .paddingOuter(0.5);
      
      this.yScale = d3.scaleLinear()
        .domain([
          0,
          d3.max(dataset, function(d) {
            return d.frequency;
          })
        ])
        .range([h, 0]);
      
      // 创建svg元素
      this.svg = d3.select('.rect-component2')
        .append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom);
      
      // 添加标题
      this.svg
        .append("text")
        .attr("class", "title")
        .attr("x", 20)
        .attr("y", 20)
        .text("2、常规柱形图(SVG)")
        .style('font-size', '14px');

      this.handleDrawAxis()
      this.handleDrawRect()
    },
    // 创建坐标轴
    handleDrawAxis() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;
      let xScale = this.xScale;
      let yScale = this.yScale;

      // 定义轴
      let xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(5) // 设置刻度条的长度
        .tickPadding(10) // 设置刻度条和标签之间的距离
        .tickFormat(function(d, i) {
          // 显示的设置刻度格式
          return dataset[i].letter;
        });
      
      let yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10, "%"); // 设置刻度的段数以及单位

      // 创建坐标轴
      this.svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${h + margin.top})`)
        .call(xAxis)
        .selectAll("text");
      
      this.svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
    },
    // 绘制柱形
    handleDrawRect() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;
      let xScale = this.xScale;
      let yScale = this.yScale;

      // 绘制柱状图
      let bars = this.svg
        .append("g")
        .attr("id", "rect-section")
        .selectAll("a")
        .data(dataset, function(d) {
          return d.frequency;
        })
        .enter()
        .append("a") // 设置svg元素鼠标变为手形
        .attr("xlink:href", "javascript:;")
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
          return xScale(i) + margin.left;
        })
        .attr("y", function(d, i) {
          return yScale(d.frequency) + margin.top;
        })
        .attr("height", function(d, i) {
          return h - yScale(d.frequency);
        })
        .attr("width", xScale.bandwidth())
        .attr("rx", xScale.bandwidth() / 2)
        .attr("ry", xScale.bandwidth() / 2)
        .attr("fill", "steelblue");
    }
  }
}
</script>

<style lang="scss">
.rect-component2 {
  display: inline-block;
}
</style>
