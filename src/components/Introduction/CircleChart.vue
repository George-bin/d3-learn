<template>
  <div class="circle-chart-component"></div>
</template>

<script>
export default {
  data() {
    return {
      dataset: [5, 10, 20, 40, 6, 25],
      h: 300,
      w: 300,
      svg: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let h = this.h;
      let w = this.w;
      let self = this;
      let pie = d3.pie();

      // 外半径
      let outerRadius = w / 2;
      // 内半径
      let innerRadius = w / 10;

      console.log('pie', pie(self.dataset))

      // 用svg的path绘制弧形的内置方法
      let arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius)
        .padAngle(0.02)
        .padRadius(100)
        .cornerRadius(6)
        // .startAngle(-0.5 * Math.PI)
        // .endAngle(0.5 * Math.PI);

      this.svg = d3
        .select(".circle-chart-component")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // 创建序数比例尺和包括10中颜色的输出范围
      // D3提供了一些颜色比例尺，10就是10种颜色，20就是20种：
      let color = this.$d3.scaleOrdinal(this.$d3.schemeCategory10);

      // 准备分组，把每个分组移到图表中心
      //(4)准备分组,把每个分组移到图表中心
      var arcs = this.svg
        .selectAll("g")
        .data(pie(self.dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        //移到图表中心
        .attr(
          "transform",
          "translate(" + outerRadius + "," + outerRadius + ")"
        ); //translate(a,b)a表示横坐标起点，b表示纵坐标起点

      //(5)为组中每个元素绘制弧形路路径
      arcs
        .append("path") //每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
        .attr("fill", function(d, i) {
          //填充颜色
          return color(i);
        })
        .attr("d", arc); //将角度转为弧度（d3使用弧度绘制）

      //(6)为组中每个元素添加文本
      arcs
        .append("text") //每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
        .attr("transform", function(d) {
          console.log("translate(" + arc.centroid(d) + ")")
          return "translate(" + arc.centroid(d) + ")"; //计算每个弧形的中心点（几何中心）
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.value; //这里已经转为对象了
        });
    }
  }
};
</script>

<style lang="scss">
.circle-chart-component {
  svg {
    background: #f7f7f7;
  }
}
</style>
