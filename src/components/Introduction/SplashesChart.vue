<template>
  <div class="splashes-chart-component"></div>
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
      let h = 100;
      let dataset = [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
      ];
      let d3 = this.$d3;
      // 创建svg
      let svg = d3.select('.splashes-chart-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      
      // 绘制圆点
      svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return d[0];
        })
        .attr('cy', function(d) {
          return d[1];
        })
        .attr('r', function(d) {
          return Math.sqrt(h - d[1]);
        })
        .attr('fill', '#dfdfdf')

      // 绘制文本标记
      svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d) {
          return `${d[0]},${d[1]}`;
        })
        .attr('x', function(d) {
          return d[0];
        })
        .attr('y', function(d) {
          return d[1];
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '1.4vh')
        .attr('fill', 'red');
    }
  }
}
</script>

<style lang="scss">
.splashes-chart-component {
  svg {
    background: #f7f7f7;
  }
}
</style>
