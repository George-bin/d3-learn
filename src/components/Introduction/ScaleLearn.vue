<template>
  <div class="scale-learn-component"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // this.init()
    // this.handleDrawScaleLinear()
    // this.handleDrawScaleOrdinal()
    // this.handleDrawScaleBand()
    this.handleDrawScalePoint()
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let w = 500;
      let h = 100;
      let dataset = [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
      ];

      // 创建svg
      let svg = d3.select('.scale-learn-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      
      // let scale = d3.scaleLinear()
      //   .domain([100, 500])
      //   .range([10, 350]);

      // 坐标轴的缩放
      // 最大的X
      d3.max(dataset, function(d) {
        return d[0]; // 返回每个字数组中的第一个元素
      });
      // X轴的缩放
      let xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, w]);

      // Y轴的缩放
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
        .range([h-10, 10]);

      // 自定义半径比例尺
      let rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1] })])
        .range([2, 5]);
      
      // 绘制圆点
      svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          // return d[0];
          return xScale(d[0]); // 缩放后的坐标x值
        })
        .attr('cy', function(d) {
          // return d[1];
          return yScale(d[1]); // 缩放后的坐标y值
        })
        .attr('r', function(d) {
          // return Math.sqrt(h - d[1]);
          return rScale(d[1]);
        })
        .attr('fill', '#dfdfdf');
      
      // 绘制文本标记
      svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d) {
          return `${d[0]},${d[1]}`;
        })
        .attr('x', function(d) {
          // return d[0];
          if (d[0] > 470) {
            return xScale(d[0] - 30);
          } else {
            return xScale(d[0]);
          }
        })
        .attr('y', function(d) {
          // return d[1];
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '1.4vh')
        .attr('fill', 'red');
    },
    // 线性比例尺
    handleDrawScaleLinear() {
      let d3 = this.$d3;
      let dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
      let min = d3.min(dataset); // 获取最小值
      let max = d3.max(dataset); // 获取最大值
      let scaleLinear = d3.scaleLinear()
        .domain([min, max])
        .range([0, 300]);
      console.log(scaleLinear(0)) // -112.5
      console.log(scaleLinear(1)) // 12.499999999999996
      console.log(scaleLinear(2)) // 137.5
      console.log(scaleLinear(3.3)) // 300
    },
    // 序数比例尺(scaleOrdinal)
    handleDrawScaleOrdinal() {
      let d3 = this.$d3;
      let w = 500;
      let h = 300;
      let index = [1, 2, 3, 4, 5, 6, 7];
      let color = ['red', 'orange', 'yellow'];
      let scaleOrdinal = d3.scaleOrdinal()
        .domain(index)
        .range(d3.schemePaired); // d3.schemePaired：d3预定义好的color scheme；
      // scaleOrdinal.unknown('Not a month');
      console.log('测试', scaleOrdinal(8))
      
      let svg = d3.select('.scale-learn-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      svg.selectAll('text')
        .data(index)
        .enter()
        .append('text')
        .text(function(d) {
          // return scaleOrdinal(d);
          return '测试';
        })
        .attr('x', function(d, i) {
          return i * 60
        })
        .attr('y', 40)
        .attr('fill', function(d) {
          return scaleOrdinal(d);
        });
    },
    // 序数比例尺（scaleBand）
    handleDrawScaleBand() {
      let d3 = this.$d3;
      let w = 500;
      let h = 300;
      var myData = [
        {day : 'Mon', value: 10},
        {day : 'Tue', value: 40},
        {day : 'Wed', value: 30},
        {day : 'Thu', value: 60},
        {day : 'Fri', value: 30}
      ];
      let bandScale = d3.scaleBand()
        .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
        .range([0, h])
        .paddingInner(0.05)
        .paddingOuter(0.1);
      // console.log(bandScale('Mon')); // 0
      // console.log(bandScale('Tue')); // 40
      // console.log(bandScale('Wed')); // 80
      // console.log(bandScale('Yes')); // undefined

      let svg = d3.select('.scale-learn-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      svg.selectAll('rect')
        .data(myData)
        .enter()
        .append('rect')
        .attr('y', function(d) {
          return bandScale(d.day);
        })
        .attr('height', bandScale.bandwidth())
        .attr('width', function(d) {
          return d.value;
        });
    },
    // 序数比例尺（scalePoint）
    handleDrawScalePoint() {
      let w = 500;
      let h = 300;
      let d3 = this.$d3;
      let myData = [
        {day : 'Mon', value: 10},
        {day : 'Tue', value: 40},
        {day : 'Wed', value: 30},
        {day : 'Thu', value: 60},
        {day : 'Fri', value: 30}
      ];
      let pointScale = d3.scalePoint()
        .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
        .range([0, w]);
      
      pointScale.padding(1);
      
      console.log('点与点之间的距离', pointScale.step());
      // console.log('点与点之间的距离', pointScale.bandwidth());
      
      // console.log(pointScale('Mon'));
      // console.log(pointScale('Tue'));
      // console.log(pointScale('Wed'));

      let svg = d3.select('.scale-learn-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      svg.append('text')
        .text('scalePoint(序数比例尺)')
        .attr('x', 10)
        .attr('y', 20);

      svg.selectAll('circle')
        .data(myData)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return pointScale(d.day);
        })
        .attr('cy', 50)
        .attr('r', 4);
    }
  }
}
</script>

<style lang="scss">
.scale-learn-component {
  svg {
    background: #f7f7f7;
  }
}
</style>
