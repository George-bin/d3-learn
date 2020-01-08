<template>
  <div class="rect-component4"></div>
</template>

<script>
export default {
  data() {
    return {
      margin: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 50
      },
      w: 400,
      h: 300,
      ctxW: 0,
      ctxH: 0,
      svg: null,
      xScale: null,
      yScale: null,
      dataset: [
        { name: "Family in feud with Zuckerbergs", value: 0.17 },
        { name: "Committed 671 birthdays to memory", value: 0.19 },
        { name: "Ex is doing too well", value: 0.1 },
        { name: "High school friends all dead now", value: 0.15 },
        { name: "Discovered how to “like” things mentally", value: 0.27 },
        { name: "Not enough politics", value: 0.12 }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let margin = this.margin;
      let w = this.w;
      let h = this.h;
      this.ctxW = this.w - margin.left - margin.right;
      this.ctxH = this.h - margin.top - margin.bottom;

      // 绘制svg元素
      this.svg = d3
        .select(".rect-component4")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      d3.select(".rect-component4 svg")
        .append("text")
        .attr("class", "title")
        .attr("x", 20)
        .attr("y", 20)
        .text("4、常规柱形图(自定义x轴刻标)")
        .style("font-size", "14px");

      this.handleSetScale();
      this.handleDrawAxis();
      this.handleDrawRect();
    },
    // 设置比例尺
    handleSetScale() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      this.xScale = d3
        .scaleBand()
        .domain(
          dataset.map(function(d) {
            return d.name;
          })
        )
        .range([0, ctxW])
        .paddingInner(0.1)
        .paddingOuter(0.2);

      this.yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dataset, function(d) {
            console.log("d.value", d.value);
            return d.value;
          })
        ])
        .range([ctxH, 0]);
    },
    // 绘制坐标轴
    handleDrawAxis() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let xScale = this.xScale;
      let yScale = this.yScale;
      console.log("ctxH", ctxH);

      // 定义比例尺
      let xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickSize(5)
        .tickPadding(10);

      let yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(8, "%");

      // 创建坐标轴
      this.svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${ctxH})`)
        .call(xAxis)
        .selectAll("text")
        .call(wrap, xScale.bandwidth());

      this.svg.select(".x-axis .domain").remove();

      this.svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(0, 0)`)
        .call(yAxis);

      function wrap(text, width) {
        text.each(function() {
          var text = d3.select(this),
            words = text
              .text()
              .split(/\s+/)
              .reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text
              .text(null)
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", dy + "em");
          while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                .text(word);
            }
          }
        });
      }
    },
    // 绘制矩形
    handleDrawRect() {
      let d3 = this.$d3;
      let dataset = this.dataset;
      let margin = this.margin;
      let ctxW = this.ctxW;
      let ctxH = this.ctxH;
      let xScale = this.xScale;
      let yScale = this.yScale;

      this.svg
        .append("g")
        .attr("class", "rect-section")
        .selectAll("rect")
        .data(dataset, function(d) {
          return d.value;
        })
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return xScale(d.name);
        })
        .attr("y", function(d) {
          return yScale(d.value);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return ctxH - yScale(d.value);
        })
        .attr("fill", "#c9bb88");

      // 绘制提示文字
      this.svg
        .append("g")
        .attr("class", "tip-text-section")
        .selectAll("text")
        .data(dataset, function(d) {
          return d.value;
        })
        .enter()
        .append("text")
        .attr('x', function(d) {
          return xScale(d.name) + xScale.bandwidth() / 2;
        })
        .attr('y', function(d) {
          return yScale(d.value) + xScale.bandwidth() / 3;
        })
        .text(function(d) {
          return d.value * 100;
        })
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', xScale.bandwidth() / 3)
        .attr('fill', 'white');
    }
  }
};
</script>

<style lang="scss">
.rect-component4 {
  display: inline-block;
}
</style>
