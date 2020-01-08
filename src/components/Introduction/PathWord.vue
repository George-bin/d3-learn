<template>
  <div class="path-word-component"></div>
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
      let h = 500;
      let d3 = this.$d3;
      let svg = d3.select('.path-word-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      // 添加路径
      svg.append('path')
        .attr('d', 'M50 100Q350 50 350 250Q250 50 50 250')
        .attr('id', 'mypath')
        .style('fill', 'none')
        .style('stroke', 'green')
        .style('stroke-width', 10);

      // 在 svg 中插入一個 text
      svg.append('text')
        .attr('x', 10)
        .attr('y', 20)
        .style('fill', 'steelblue')
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .append('textPath')
        .attr('xlink:href', '#mypath') // 引用路径
        .text('.text加入文字测试！并用xlink:href: #mypath加入了路径')
    }
  }
}
</script>

<style lang="scss">
.path-word-component {
  svg {
    background: #f7f7f7;
  }
}
</style>
