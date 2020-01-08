<template>
  <div class="rect-component1"></div>
</template>

<script>
export default {
  data() {
    return {
      svg: null,
      margin: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 60
      },
      dataset: [
        { label: "1月", value: 0.95 },
        { label: "2月", value: 0.2 },
        { label: "3月", value: 0.3 },
        { label: "4月", value: 1 },
        { label: "5月", value: 0.4 },
        { label: "6月", value: 0.7 },
        { label: "7月", value: 0.88 },
        { label: "8月", value: 0.12 },
        { label: "9月", value: 0.34 },
        { label: "10月", value: 0.98 },
        { label: "11月", value: 0.1 },
        { label: "12月", value: 0.44 }
      ],
      w: 0,
      h: 0,
      xScale: null,
      yScale: null
    };
  },
  mounted() {
    this.init();
    // this.handleDrawRectBackground();
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
      this.xScale = d3
        .scaleBand(dataset)
        .domain(d3.range(dataset.length))
        .range([0, w])
        .paddingInner(0.5)
        .paddingOuter(0.5);

      this.yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dataset, function(d) {
            return d.value;
          })
        ])
        .range([h, 0]);

      // 创建svg元素
      this.svg = d3
        .select(".rect-component1")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom);

      // 添加标题
      this.svg
        .append("text")
        .attr("class", "title")
        .attr("x", 20)
        .attr("y", 20)
        .text("1、Why Are We Leaving Facebook?")
        .attr('font-family', 'sans-serif')
        .attr('font-size', 14)

      this.handleDrawAxis();
      this.handleDrawLine();
      this.handleDrawGradientColor();
      this.handleDrawRectBackground();
      this.handeDrawRect();
    },
    // 绘制坐标轴
    handleDrawAxis() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;
      let xScale = this.xScale;
      let yScale = this.yScale;

      // 定义轴
      let xAxis = d3
        .axisBottom()
        .scale(xScale) // 设置比例尺
        // .tickArguments([20, "s"])
        // .tickValues([1,2,3,4,5,6,7,8]) // 显示的设置刻度值
        .tickSize(5) // 设置刻度条的长度
        .tickPadding(10) // 设置刻度条和标签之间的距离
        .tickFormat(function(d, i) {
          // 显示的设置刻度格式
          return dataset[i].label;
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
        .selectAll("text")
        .attr("transform", "rotate(40 0, 30)");

      this.svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
    },
    // 绘制直线
    handleDrawLine() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;
      let xScale = this.xScale;
      let yScale = this.yScale;
      let data = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      // console.log('h', h)

      this.svg
        .append("g")
        .attr("id", "line-section")
        .selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", margin.left + 1)
        .attr("y1", function(d, i) {
          // console.log(i, margin.top + h * ((data.length - i) / data.length))
          return margin.top + h * ((data.length - d) / data.length) + 0.5
        })
        .attr("x2", margin.left + w)
        .attr("y2", function(d, i) {
          return margin.top + h * ((data.length - d) / data.length) + 0.5
        })
        .attr("stroke", "#e8e8e8")
        .attr("stroke-width", "1px");
    },
    // 绘制柱形图背景
    handleDrawRectBackground() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;

      // 定义比例尺
      let xScale = d3
        .scaleBand(dataset)
        .domain(d3.range(dataset.length))
        .range([0, w])
        .paddingInner(0.5)
        .paddingOuter(0.5);

      let yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dataset, function(d) {
            return d.value;
          })
        ])
        .range([h, 0]);

      this.svg
        .append("g")
        .attr("id", "rect-section-background")
        .attr("z-index", "0")
        .selectAll("rect")
        .data(dataset, function(d) {
          return d.value;
        })
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
          return xScale(i) + margin.left;
        })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d) {
          return margin.top;
        })
        .attr("height", function(d) {
          return h;
        })
        .attr("fill", "#e8e8e8");
      // .attr('rx', 5)
      // .attr('ry', 5)
    },
    // 绘制渐变色
    handleDrawGradientColor() {
      // 线性渐变
      let gradient = this.svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(175,0,53)")
        .attr("stop-opacity", 1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(89,14,150)")
        .attr("stop-opacity", 1);

      // 线性渐变(hover)
      let gradientHover = this.svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient-hover")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

      gradientHover
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(89,14,150)")
        .attr("stop-opacity", 1);

      gradientHover
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(175,0,53)")
        .attr("stop-opacity", 1);
    },
    // 绘制柱形
    handeDrawRect() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;
      let xScale = this.xScale;
      let yScale = this.yScale;
      // console.log(d3.scaleOrdinal(d3.schemeAccent)(0))

      // 绘制柱状图
      let bars = this.svg
        .append("g")
        .attr("id", "rect-section")
        .selectAll("a")
        .data(dataset, function(d) {
          return d.value;
        })
        .enter()
        .append("a") // 设置svg元素鼠标变为手形
        .attr("xlink:href", "javascript:;")
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
          return xScale(i) + margin.left;
        })
        .attr("y", h + margin.top)
        .attr("width", xScale.bandwidth())
        .attr("rx", xScale.bandwidth() / 2)
        .attr("ry", xScale.bandwidth() / 2)
        .attr("fill", "url(#gradient)");
      // .attr("fill",  d3.interpolateBrBG(1))
      // .attr("fill", "#4682b4")

      // 柱状图动画出场
      bars
        .transition()
        .duration(1000)
        .attr("y", function(d) {
          return yScale(d.value) + margin.top;
        })
        .attr("height", function(d) {
          return h - yScale(d.value);
        });

      this.svg
        .select("#rect-section")
        .selectAll("rect")
        .on("mouseover", function(d) {
          d3.select(this).attr("fill", "url(#gradient-hover)");
        })
        .on("mouseout", function(d) {
          d3.select(this).attr("fill", "url(#gradient)");
        });
    }
  }
};
</script>

<style lang="scss">
.rect-component1 {
  display: inline-block;
  .x-axis,
  .y-axis {
    path, line {
      stroke: gray;
      stroke-width: 1;
    }
  }

  .axis {
    font: 10px sans-serif;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .x.axis path {
    display: none;
  }
}
</style>
