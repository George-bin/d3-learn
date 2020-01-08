<template>
  <div class="axis-learn-component"></div>
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
      let w = 500;
      let h = 200;
      let padding = 40;
      let dataset = [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
      ];
      let d3 = this.$d3;
      let svg = d3.select('.axis-learn-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      // X轴的缩放
      let xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, w - padding*2]);
      
      // Y轴的缩放
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
        .range([h, padding*2]);

      // X轴的缩放(圆点和文本)
      let xScale2 = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([padding, w-padding]);
      
      // Y轴的缩放(圆点和文本)
     let yScale2 = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
        .range([h-padding, padding*2]);
      
      // 自定义半径比例尺
      let rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1] })])
        .range([2, 5]);
      
      // 定义X轴
      let xAxis = d3.axisBottom()
        .scale(xScale) // scale用来指定坐标轴的比例尺
        // .ticks(20) // 显示刻度数量（具体生成多少，D3会自动调整）
        // .tickValues([1, 2, 3, 5, 8, 13, 21]) // 指定刻度的数组
       
      // 创建X轴(调用的时候任意的选择器call调用轴，或者xAxis(选择器)均可)
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${padding},${h-padding})`)
        .call(xAxis);

      // 定义Y轴
      let yAxis = d3.axisLeft()
        .scale(yScale);
      
      // 创建Y轴
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${padding}, ${-padding})`)
        .call(yAxis);
      
      // 绘制圆点
      svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          // return d[0];
          return xScale2(d[0]); // 缩放后的坐标x值
        })
        .attr('cy', function(d) {
          // return d[1];
          return yScale2(d[1]); // 缩放后的坐标y值
        })
        .attr('r', function(d) {
          // return Math.sqrt(h - d[1]);
          return rScale(d[1]);
        })
        .attr('fill', 'gray');

      // 绘制文本标记
      svg.append('g')
        .selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d) {
          return `${d[0]},${d[1]}`;
        })
        .attr('x', function(d) {
          // return d[0];
          if (d[0] > 470) {
            return xScale2(d[0] - 30);
          } else {
            return xScale2(d[0]);
          }
        })
        .attr('y', function(d) {
          // return d[1];
          return yScale2(d[1]);
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '1vh')
        .attr('fill', 'red');
    }
  }
}
</script>

<style lang="scss">
.axis-learn-component {
  svg {
    background: #f7f7f7;
  }
  // 调整x轴的位置
  .axis path,
  .axis line {
    fill: none;
    stroke: gray;
    shape-rendering: crispEdges;//这个属性用来显示轴
  }
  
  .axis text {
    font-family: sans-serif;
    font-size: 1vh;
    color: gray;
  }
}
</style>
