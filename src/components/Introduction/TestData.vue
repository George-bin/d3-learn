<template>
  <div class="test-data-component"></div>
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
      let dataset = [];
      // 生成测试数据
      // js方式
      for (let i = 0; i < 25; i++) {
        let number = Math.round(Math.random() * 30);
        dataset.push(number);
      }

      // d3方式
      // let d3 = this.$d3;
      // dataset = this.$d3.range(25).map(function() {
      //   return d3.round(d3.random.normal(15, 8)(), 1)
      // });
      this.$d3.select('.test-data-component').selectAll('div')
        .data(dataset)
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style('height', function(d) {
          return d * 5 + 'px'
        });
    }
  }
}
</script>

<style lang="scss">
.test-data-component {
  .bar {
    display: inline-block;
    width: 20px;
    margin-right: 2px;
    background-color: teal;
  }
}
</style>
