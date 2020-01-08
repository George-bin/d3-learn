<template>
  <div class="svg-base-graph-component"></div>
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
      this.handleDrawPath();
      this.handleDrawPolyline();
      this.handleDrawPolygon();
      this.handleDrawLine();
      this.handleDrawEllipse();
    },
    // 绘制路径
    handleDrawPath() {
      let w = 500;
      let h = 300;
      let d3 = this.$d3;
      let svg1 = d3.select('.svg-base-graph-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      svg1.append('text')
        .text('绘制路径')
        .attr('x', 10)
        .attr('y', 20);
      svg1.append('path')
        .attr('d', 'M50 150Q300 50 300 150T450 150')
        .style('fill', 'none')
        .style('stroke', 'purple')
        .style('stroke-width', '5');
    },
    // 绘制折线
    handleDrawPolyline() {
      let w = 500;
      let h = 300;
      let d3 = this.$d3;
      let svg2 = d3.select('.svg-base-graph-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      svg2.append('text')
        .text('绘制折线')
        .attr('x', 10)
        .attr('y', 20);
      svg2.append('polyline')
        .attr('points', '100,10 40,180 190,60 10,60 160,180 100,10')
        .style('fill', 'black')
        .style('stroke', 'green')
        .style('stroke-width', 2);
      svg2.append('polyline')
        .attr('points', '200,160 240,160 240,120 280,120 280,80 320,80 320,40 360,40 360,160 240,160')
        .style('fill', 'none')
        .style('stroke', 'green')
        .style('stroke-width', 2);
    },
    // 绘制多边形
    handleDrawPolygon() {
      let w = 500;
      let h = 300;
      let d3 = this.$d3;
      let svg3 = d3.select('.svg-base-graph-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      svg3.append('text')
        .text('绘制多边形')
        .attr('x', 10)
        .attr('y', 20);
      svg3.append('polygon')
        .attr('points', '50,10 20,50 80,50')
        .style('fill', 'none')
        .style('stroke', '#f0f')
        .style('stroke-width', 2);
      svg3.append('polygon')
        .attr('points', '70,10 130,10 100,50')
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', 2);
      svg3.append('polygon')
        .attr('points', '150,10 120,50 180,50')
        .style('fill', 'none')
        .style('stroke', '#f0f')
        .style('stroke-width', 2);
    },
    // 绘制直线
    handleDrawLine() {
      let w = 500;
      let h = 300;
      let d3 = this.$d3;
      let svg4 = d3.select('.svg-base-graph-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      svg4.append('text')
        .text('绘制直线')
        .attr('x', 10)
        .attr('y', 20);
      svg4.append('line')
        .attr('x1', 40)
        .attr('y1', 70)
        .attr('x2', 250)
        .attr('y2', 70)
        .style('stroke', 'black')
        .style('stroke-width', 4);
      svg4.append('line')
        .attr('x1', 40)
        .attr('y1', 140)
        .attr('x2', 250)
        .attr('y2', 140)
        .style('stroke', 'black')
        .style('stroke-width', 4);
      svg4.append('line')
        .attr('x1', 100)
        .attr('y1', 10)
        .attr('x2', 100)
        .attr('y2', 200)
        .style('stroke', 'black')
        .style('stroke-width', 4);
      svg4.append('line')
        .attr('x1', 180)
        .attr('y1', 10)
        .attr('x2', 180)
        .attr('y2', 200)
        .style('stroke', 'black')
        .style('stroke-width', 4);
      svg4.append('circle')
        .attr('cx', 140)
        .attr('cy', 105)
        .attr('r', 20)
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', 4);
      svg4.append('line')
        .attr('x1', 50)
        .attr('y1', 20)
        .attr('x2', 80)
        .attr('y2', 50)
        .style('stroke', 'black')
        .style('stroke-width', 4);
      svg4.append('line')
        .attr('x1', 80)
        .attr('y1', 20)
        .attr('x2', 50)
        .attr('y2', 50)
        .style('stroke', 'black')
        .style('stroke-width', 4);
      svg4.append('circle')
        .attr('cx', 220)
        .attr('cy', 180)
        .attr('r', 20)
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', 4);
    },
    // 绘制椭圆
    handleDrawEllipse() {
      let w = 500;
      let h = 300;
      let d3 = this.$d3;
      // 路径
      let svg5 = d3.select('.svg-base-graph-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      svg5.append('text')
        .text('绘制椭圆')
        .attr('x', 10)
        .attr('y', 20);
      svg5.append('ellipse')
        .attr('cx', 100)
        .attr('cy', 100)
        .attr('rx', 30)
        .attr('ry', 50)
        .style('fill', 'pink')
        .style('stroke', 'green')
        .style('stroke-width', 4);
      svg5.append('ellipse')
        .attr('cx', 200)
        .attr('cy', 100)
        .attr('rx', 30)
        .attr('ry', 50)
        .style('fill', 'pink')
        .style('stroke', 'green')
        .style('stroke-width', 4);
      svg5.append('ellipse')
        .attr('cx', 145)
        .attr('cy', 220)
        .attr('rx', 110)
        .attr('ry', 40)
        .style('fill', 'pink')
        .style('stroke', 'green')
        .style('stroke-width', 4)
        .style('opacity', 0.6);
    }
  }
}
</script>

<style lang="scss">
.svg-base-graph-component {
  svg {
    display: block;
    background: #f7f7f7;
  }
  svg + svg {
    margin-top: 10px;
  }
}
</style>
