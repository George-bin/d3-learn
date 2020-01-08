<template>
  <div class="bind-data-component">
  </div>
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
      let dataset = [5,10,15,20,25];
      this.$d3.select('.bind-data-component') // 1、选择DOM中的bind-data-component
        .selectAll('p') // 2、选择DOM中的所有段落（由于没有存在，将返回一个空的选择；这个选择为空，代表段落很快就会存在）。
        .data(dataset) // 3、计数和分析数据值（因为有5个值，数据集执行了5次，每个值一次；data函数会绑定数据，并使用D3经典的E-N-E编程套路）；
        .enter() // 4、绑定数据和DOM元素（这个方法将数据传递到DOM中。如果数据值比DOM多，就用enter()创建一个新元素的占位符）；
        .append('p') // 5、追加元素（通过enter创建的占位符，在DOM中插入一个p元素）；
        .text('New paragraph!') // 6、为新创建的p元素添加一个文本值；
        .style('color', function(d) { // 7、使用数据
          if (d > 15) {
            return 'red';
          } else {
            return 'black';
          }
        })
    },
    // 使用层画条形图
    handleDrawBarChart() {
      let dataset = [5,10,15,20,25];
      this.$d3.select('.bind-data-component').selectAll('div')
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
.bind-data-component {
  .bar {
    display: inline-block;
    width: 20px;
    margin-right: 2px;
    background-color: teal;
  }
}
</style>
