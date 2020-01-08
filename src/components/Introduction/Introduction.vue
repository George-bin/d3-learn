<template>
  <div class="introduction-component">
    <h1 id="introduction-demo-h1">First heading</h1>
    <svg class="bar-chart"></svg>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // this.init()
    // this.handleDrawBarChart()
    // this.handleDrawScales()
    // this.handleDrawAxes()
    // this.handleDrawEasyElement()
    this.handleDrawPieChart()
  },
  methods: {
    init() {
      // select选择器
      this.$d3.select('#introduction-demo-h1').style('color', 'red')
        .attr('class', 'heading')
        .text('Updated h1 tag');

      // 类似jquery的添加元素
      this.$d3.select('body').append('p').attr('class', 'introduction-demo-p').text('First Pargraph');
      this.$d3.select('body').append('p').attr('class', 'introduction-demo-p').text('Second Pargraph');
      this.$d3.select('body').append('p').attr('class', 'introduction-demo-p').text('Three Pargraph');
      this.$d3.selectAll('.introduction-demo-p').style('color', 'blue')

      // 数据加载和绑定
      let dataset = [1, 2, 3, 4, 5];
      this.$d3.select('body')
        .select('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(function(d) { return d })
        // .text('D3 is awsome!!')
    },
    // 绘制柱形图表
    handleDrawBarChart() {
      // 数据集
      let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
      // 定义svg图形的宽高，以及柱形间距
      let svgWidth = 500;
      let svgHeight = 300;
      let barPadding = 10;
      // 通过图形计算每个柱子的宽度
      let barWidth = svgWidth / dataset.length;

      // 绘制图形
      let svg = this.$d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      // 绘制柱形
      let barChart = svg.selectAll('rect')
        .data(dataset) // 绑定数组
        .enter() // 选择指定集的enter部分
        .append('rect') // 添加足够数量的矩形
        .attr('y', d => svgHeight - d) // d为数据集每一项的值, 取y坐标
        .attr('height', d => d) // 设定高度
        .attr('width', barWidth - barPadding) // 设定宽度
        .attr('fill', 'green')
        .attr('transform', (d, i) => {
          let translate = [barWidth * i, 0];
          return `translate(${translate})`;
        }); // 实际是计算每一项值的x坐标
      
      // 绘制文字
      let barText = svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', (d, i) => barWidth * i)
        .attr('y', (d, i) => svgHeight - d - 2)
        .attr('fill', 'orange');
    },
    // 绘制比例尺
    handleDrawScales() {
      let dataset = [1,2,3,4,5];

      let svgWidth = 500;
      let svgHeight = 300;
      let barPadding = 5;
      let barWidth = (svgWidth / dataset.length);

      // 绘制图形
      let svg = this.$d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('fill', 'red');

      let yScale = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(dataset)])
        .range([0, svgHeight]);

      let barChart = svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('y', d => svgHeight - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', barWidth - barPadding)
        .attr('transform', (d, i) => {
          let translate = [barWidth * i, 0]
          return `translate(${translate})`
        })
    },
    // 绘制轴
    handleDrawAxes() {
      let data = [80, 100, 56, 120, 180, 30, 40, 120, 160];
      let svgWidth = 500;
      let svgHeight = 300;

      let svg = this.$d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
      
      // 首先拿最大值构建x轴坐标
      let xScale = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(data)])
        .range([0, svgWidth]);
        
      // 接下来是反转值，用作y轴坐标
      let yScale = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(data)])
        .range([svgHeight, 0]);
      
      // 横轴的API的使用
      let x_axis = this.$d3.axisBottom()
        .scale(xScale);
      
      // 纵轴API的使用
      let y_axis = this.$d3.axisLeft()
        .scale(yScale);

      // 在svg中提供了如g元素将多个元素组织在一起的元素
      // 由g元素编组在一起的元素可以设置相同的颜色，可以进行坐标转换等，类似于vue中的template
      svg.append('g')
        .attr('transform', 'translate(50, 10)')
        .call(y_axis);
      
      let xAxisTranslate = svgHeight - 20;
         
      svg.append('g')
        .attr('transform', 'translate(50, ' + xAxisTranslate  +')')
        .call(x_axis);
    },
    // 绘制简易元素
    handleDrawEasyElement() {
      let svgWidth = 600;
      let svgHeight = 500;
      let svg = this.$d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      let line = svg.append('line')
        .attr('x1', 100)
        .attr('x2', 500)
        .attr('y1', 50)
        .attr('y2', 50)
        .attr('stroke', 'red');

      let rect = svg.append('rect')
        .attr('x', 100)
        .attr('y', 100)
        .attr('width', 200)
        .attr('height', 100)
        .attr('fill', 'blue');

      let circle = svg.append('circle')
        .attr('cx', 200)
        .attr('cy', 300)
        .attr('r', 80)
        .attr('fill', 'green');
    },
    // 绘制饼图
    handleDrawPieChart() {
      let svgWidth = 500;
      let svgHeight = 300;
      let radius = Math.min(svgWidth, svgHeight) / 2;
      let data = [
        {"platform": "Android", "percentage": 40.11}, 
        {"platform": "Windows", "percentage": 36.69},
        {"platform": "iOS", "percentage": 13.06}
      ];
      let svg = this.$d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      //Create group element to hold pie chart   
      let g = svg.append('g')
        .attr('transform', `translate(${radius}, ${radius })`);
      
      // d3.scaleOrdinal() 序数比例尺
      // schemeCategory10, 颜色比例尺
      // D3提供了一些颜色比例尺，10就是10种颜色，20就是20种：
      let color = this.$d3.scaleOrdinal(this.$d3.schemeCategory10);
      let pie = this.$d3.pie().value(d => d.percentage);
      
      let path = this.$d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

      let arc = g.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g');

      arc.append('path')
        .attr('d', path)
        .attr('fill', d => color(d.data.percentage));
      
      let label = this.$d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

      arc.append('text')
        .attr('transform', d => `translate(${label.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => `${d.data.platform}:${d.data.percentage}%`);
    }
  }
}
</script>

<style lang="scss">
.introduction-component {}
</style>
