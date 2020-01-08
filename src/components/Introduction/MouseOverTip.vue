<template>
  <div class="chart-sort-component">
    <el-button type="primary" size="small" @click="handleClickUpdateBand">更新</el-button>
    <el-button type="primary" size="small" @click="handleClickAddBand">增加</el-button>
    <el-button type="primary" size="small" @click="handleClickDelBand">删除</el-button>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataset: [
        {
          key: 0,
          value: 5
        },
        {
          key: 1,
          value: 10
        },
        {
          key: 2,
          value: 13
        },
        {
          key: 3,
          value: 19
        },
        {
          key: 4,
          value: 21
        },
        {
          key: 5,
          value: 25
        },
        {
          key: 6,
          value: 22
        },
        {
          key: 7,
          value: 18
        },
        {
          key: 8,
          value: 15
        },
        {
          key: 9,
          value: 13
        },
        {
          key: 10,
          value: 11
        },
        {
          key: 11,
          value: 12
        },
        {
          key: 12,
          value: 15
        },
        {
          key: 13,
          value: 20
        },
        {
          key: 14,
          value: 18
        },
        {
          key: 15,
          value: 17
        },
        {
          key: 16,
          value: 16
        },
        {
          key: 17,
          value: 18
        },
        {
          key: 18,
          value: 23
        },
        {
          key: 19,
          value: 25
        }
      ],
      w: 600,
      h: 250,
      svg: null,
      xScale: null,
      yScale: null,
      sortOrders: false,
      showTip: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let w = this.w;
      let h = this.h;
      let d3 = this.$d3;
      let self = this;
      // 定义比例尺
      this.xScale = d3
        .scaleBand()
        .domain(d3.range(self.dataset.length))
        .range([0, w])
        .paddingInner(0.1);

      this.yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(self.dataset, function(d) {
            return d.value;
          })
        ])
        .range([0, h]);

      // 创建svg元素
      this.svg = d3
        .select(".chart-sort-component")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // 添加条形
      this.handleInitRect();
      // 添加文本标注
      this.handleInitText();
    },
    handleInitRect() {
      let self = this;
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      this.svg
        .append("g")
        .attr("id", "rect-section")
        .selectAll("rect")
        .data(self.dataset, self.key)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return self.xScale(i);
        })
        .attr("y", h)
        .attr("width", self.xScale.bandwidth())
        .on("mouseover", function(d) {
          let xPosition =
            parseFloat(d3.select(this).attr("x")) + self.xScale.bandwidth() / 2;
          let yPosition = parseFloat(d3.select(this).attr("y")) + 24;
          self.svg
            .append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-setif")
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .attr("fill", "white")
            .text(d.value);
        })
        .on('mouseout', function() {
          d3.select('#tooltip').remove();
        })
        .transition()
        .duration(1000)
        .attr("y", function(d) {
          return h - self.yScale(d.value);
        })
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("height", function(d) {
          return self.yScale(d.value);
        })
        .attr("fill", function(d) {
          return `rgba(0,0,${d.value * 10})`;
        });

      this.svg
        .select("#rect-section")
        .selectAll("rect")
        .on("click", function() {
          self.sortBars();
        });
    },
    handleInitText() {
      let self = this;
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      this.svg
        .append("g")
        .attr("id", "text-section")
        .selectAll("text")
        .data(self.dataset, self.key)
        .enter()
        .append("text")
        .text(function(d) {
          return d.value;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr("y", h)
        .transition()
        .duration(1000)
        .attr("y", function(d) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 1.5;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", self.xScale.bandwidth() / 2)
        .attr("fill", "red");
    },
    // 定义键函数
    key(d) {
      return d.key;
    },
    value(d) {
      return d.value;
    },
    // 条形排序函数
    sortBars() {
      let self = this;
      let d3 = this.$d3;
      this.sortOrders = !this.sortOrders;
      this.svg
        .select("#rect-section")
        .selectAll("rect")
        .sort(function(a, b) {
          if (self.sortOrders) {
            // 对数据集升序排序
            return d3.ascending(a.value, b.value);
          } else {
            return d3.descending(a.value, b.value);
          }
        })
        .transition()
        .duration(1000)
        .attr("x", function(d, i) {
          // 对排序后的横坐标重排
          return self.xScale(i);
        });

      this.svg
        .select("#text-section")
        .selectAll("text")
        .sort(function(a, b) {
          if (self.sortOrders) {
            // 对数据集升序排序
            return d3.ascending(a.value, b.value);
          } else {
            return d3.descending(a.value, b.value);
          }
        })
        .transition()
        .duration(1000)
        .attr("x", function(d, i) {
          // 对排序之后的横坐标重排
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        });

      console.log("排序之后", this.dataset);
    },
    handleClickAddBand() {
      let w = this.w;
      let h = this.h;
      let d3 = this.$d3;
      let self = this;
      let maxValue = 25;
      let newNumber = Math.floor(Math.random() * maxValue + 1);
      let lastKeyValue = this.dataset[this.dataset.length - 1].key;
      this.dataset.push({
        key: lastKeyValue + 1,
        value: newNumber
      });
      console.log("新增", JSON.parse(JSON.stringify(this.dataset)));

      // 更新比例尺
      this.xScale.domain(d3.range(this.dataset.length));

      let bars = this.svg
        .select("#rect-section")
        .selectAll("rect")
        .data(self.dataset, self.key);

      let texts = this.svg
        .select("#text-section")
        .selectAll("text")
        .data(self.dataset, self.key);

      bars
        .enter()
        .append("rect")
        .attr("x", w)
        .attr("rx", 5)
        .attr("ry", 5);
      texts
        .enter()
        .append("text")
        .attr("x", w);

      // 更新条形图
      this.handleUpdateBand();
      // 更新文本标注
      this.handleUpdateText();
    },
    handleClickDelBand() {
      let d3 = this.$d3;
      let h = this.h;
      let self = this;
      // console.log(1, JSON.parse(JSON.stringify(this.dataset)));
      this.dataset.shift();
      // console.log(2, JSON.parse(JSON.stringify(this.dataset)));
      this.xScale.domain(d3.range(self.dataset.length));

      let updateRect = this.svg
        .select("#rect-section")
        .selectAll("rect")
        .data(self.dataset, self.key);

      let updateText = this.svg
        .select("#text-section")
        .selectAll("text")
        .data(self.dataset, self.key);

      // 删除第一个条形和文本
      updateRect
        .exit()
        .transition()
        .duration(500)
        .attr("x", -self.xScale.bandwidth())
        .remove();

      updateText
        .exit()
        .transition()
        .duration(500)
        .attr("x", -self.xScale.bandwidth())
        .remove();

      // 更新剩余的条形和文本(位置)
      updateRect
        .transition()
        .duration(500)
        .attr("x", function(d, i) {
          return self.xScale(i); //每个X对应到它相应的档位上
        })
        .attr("width", self.xScale.bandwidth());

      updateText
        .transition()
        .duration(500)
        .attr("x", function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 1.5;
        })
        .attr("font-size", self.xScale.bandwidth() / 2);

      // 重置key（避免位置发生变化）
      this.dataset.forEach((item, i) => {
        item.key = i;
      });
      this.svg
        .select("#rect-section")
        .selectAll("rect")
        .data(self.dataset, self.key);

      this.svg
        .select("#text-section")
        .selectAll("text")
        .data(self.dataset, self.key);
    },
    handleUpdateBand() {
      let self = this;
      let h = this.h;
      this.svg
        .selectAll("#rect-section")
        .selectAll("rect")
        .transition()
        .duration(1000)
        .attr("x", function(d, i) {
          return self.xScale(i);
        })
        .attr("y", function(d) {
          return h - self.yScale(d.value);
        })
        .attr("width", self.xScale.bandwidth())
        .attr("height", function(d) {
          return self.yScale(d.value);
        })
        .attr("fill", function(d) {
          return `rgba(0,0,${d.value * 10})`;
        });
    },
    handleUpdateText() {
      let h = this.h;
      let self = this;
      this.svg
        .select("#text-section")
        .selectAll("text")
        .text(function(d) {
          return d.value;
        })
        .attr("font-size", self.xScale.bandwidth() / 2)
        .transition()
        .duration(1000)
        .attr("x", function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 1.5;
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", "red");
    },
    handleClickUpdateBand() {
      let w = this.w;
      let h = this.h;
      let d3 = this.$d3;
      let self = this;
      let numValues = this.dataset.length;
      let maxValue = 25;
      this.dataset.length = 0;
      let newNumber;
      console.log("更新1", JSON.parse(JSON.stringify(this.dataset)));
      for (let i = 0; i < numValues; i++) {
        newNumber = Math.floor(Math.random() * maxValue);
        if (newNumber === 0) newNumber = 1;
        // console.log('newNumber', newNumber)
        this.dataset.push({
          key: i,
          value: newNumber
        });
      }
      console.log("更新2", JSON.parse(JSON.stringify(this.dataset)));
      this.yScale.domain([0, d3.max(self.dataset, self.value)]);
      this.xScale.domain(d3.range(self.dataset.length));

      // 更新所有矩形和文本标注
      let updateRect = this.svg
        .select("#rect-section")
        .selectAll("rect")
        .data(self.dataset, self.key);

      // console.log('length', this.svg.select('#rect-section').selectAll('rect')._groups[0])
      let updateText = this.svg
        .select("#text-section")
        .selectAll("text")
        .data(self.dataset, self.key);

      updateRect
        .transition()
        .delay(function(d, i) {
          return (i / self.dataset.length) * 1000;
        })
        .duration(1000)
        .attr("x", function(d, i) {
          console.log(`x${i}`, self.xScale(i));
          return self.xScale(i);
        })
        .attr("y", function(d) {
          return h - self.yScale(d.value);
        })
        .attr("height", function(d, i) {
          // console.log(`height${i}`,  self.yScale(d.value));
          return self.yScale(d.value);
        })
        .attr("width", self.xScale.bandwidth())
        .attr("fill", function(d) {
          return `rgba(0,0,${d.value * 10})`;
        });

      updateText
        .text(function(d) {
          return d.value;
        })
        .transition()
        .duration(1000)
        .delay(function(d, i) {
          return (i / self.dataset.length) * 1000;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr("y", function(d, i) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 1.5;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", self.xScale.bandwidth() / 2)
        .attr("fill", "red");
    }
  }
};
</script>

<style lang="scss">
.chart-sort-component {
  svg {
    margin-top: 20px;
    background: #f7f7f7;
  }
  #tooltip {
    position: absolute;
    width: 200px;
    height: auto;
    padding: 10px;
    background-color: white;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  #tooltip p {
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
