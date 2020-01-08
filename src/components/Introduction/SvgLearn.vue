<template>
  <div class="svg-learn-component"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // this.init()
    this.handleDrawBarChart()
  },
  methods: {
    init() {
      let svgWidth = 500;
      let svgHeight = 300;
      let svg = this.$d3.select('.svg-learn-component')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
      
      let dataset = [5, 10, 15, 20, 25];
      let circles = svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle');
      
      circles.attr('cx', function(d, i) {
        return (i * 50) + 25
      })
      .attr('cy', svgHeight / 2)
      .attr('r', function(d) {
        return d;
      });
    },
    handleDrawBarChart() {
      let dataset = [ 5, 100, 13, 19, 21, 25, 22, 18, 15, 13,11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
      let svgWidth = 500;
      let svgHeight = 500;
      let barPadding = 5;
      let svg = this.$d3.select('.svg-learn-component')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      // 绘制柱形图
      svg.selectAll('rect') // 1、选择一组数据，这时还没有元素
        .data(dataset) // 2、加载数据集
        .enter() // 3、给新增数据添加占位符，表示将要添加一个元素；
        .append('rect') // 4、添加矩形元素
        .attr('x', function(d, i) {
          return i * (svgWidth / dataset.length);
        })
        .attr('y', function(d) {
          return svgHeight - (d * 4);
        })
        .attr('width', svgWidth / dataset.length - barPadding)
        .attr('height', function(d) {
          return d * 4;
        })
        .attr('fill', function(d) {
          return `rgb(0,0,${d*10})`;
        })

      // 绘制文本标记
      svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d, i) {
          return d;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          console.log('i', (svgWidth / dataset.length - barPadding) / 2)
          return i * (svgWidth / dataset.length) + (svgWidth / dataset.length - barPadding) / 2;
        })
        .attr('y', function(d, i) {
          return svgHeight - (d * 4) + 14;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'white');
    }
  }
}
</script>

<style lang="scss">
.svg-learn-component {}
</style>
