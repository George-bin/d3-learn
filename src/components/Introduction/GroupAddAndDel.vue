<template>
  <div class="group-add-and-del-component">
    <button @click="handleClickUpdateBand">点击更新</button>
    <button @click="handleClickAddBand">增加一条</button>
    <button @click="handleClickDelBand">删除一条</button>
    <br/>
    <!-- (1)创建div提示层 -->
    <div id="tooltip" v-show="showTip">
      <p><strong>提示：</strong></p>
      <p><span id="value">100</span>%</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataset: [
        {
          key : 0,
          value : 5
        }, {
          key : 1,
          value : 10
        }, {
          key : 2,
          value : 13
        }, {
          key : 3,
          value : 19
        }, {
          key : 4,
          value : 21
        }, {
          key : 5,
          value : 25
        }, {
          key : 6,
          value : 22
        }, {
          key : 7,
          value : 18
        }, {
          key : 8,
          value : 15
        }, {
          key : 9,
          value : 13
        }, {
          key : 10,
          value : 11
        }, {
          key : 11,
          value : 12
        }, {
          key : 12,
          value : 15
        }, {
          key : 13,
          value : 20
        }, {
          key : 14,
          value : 18
        }, {
          key : 15,
          value : 17
        }, {
          key : 16,
          value : 16
        }, {
          key : 17,
          value : 18
        }, {
          key : 18,
          value : 23
        }, {
          key : 19,
          value : 25
        } 
      ],
      w: 600,
      h: 250,
      svg: null,
      xScale: null,
      yScale: null,
      sortOrders: false,
      showTip: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 定义SVG的宽高
      let w = this.w;
      let h = this.h;
      let d3 = this.$d3;
      let self = this;

      // 定义比例尺
      this.xScale = d3.scaleBand() // 序数比例尺
        .domain(d3.range(self.dataset.length)) // d3.range用于产生一系列的数值
        .range([0, w])
        .paddingInner(0.1)
        // .paddingOuter(0.2);

      this.yScale = d3.scaleLinear() // 线性比例尺
        .domain([0, d3.max(self.dataset, function(d) { return d.value; })])
        .range([0, h]);
      
      // 创建svg元素
      this.svg = d3.select('.group-add-and-del-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      // 为svg添加条形
      this.svg.append('g')
        .attr('id', 'rect-section')
        .selectAll('rect')
        .data(self.dataset, self.key)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
          // return i * (w / self.dataset.length); // 从0开始每次右移元素宽那么长(w / dataset.length)
          return self.xScale(i); // 这里使用序数比例尺，自己去找刚才划分好的档位
        })
        .attr('y', function(d) {
          return h - self.yScale(d.value)
        })
        .attr('width', self.xScale.bandwidth())
        // .attr('width', 20)
        .attr('height', function(d) {
          return self.yScale(d.value);
        })
        .attr('fill', function(d) {//设置RGB颜色与数值的关系
          return `rgb(0,0,${d.value*10})`;
        })
        .attr('rx', 5)
        .attr('ry', 5)
        // 点击排序
        .on('click', function(d) {
          self.barSorts();
        })
        // 显示提示框
        .on('mouseover', function(d) {
          //取得提示显示的位置
          let xPosition = parseFloat(d3.select(this).attr('x')) + self.xScale.bandwidth() / 2;
          let yPosition = parseFloat(d3.select(this).attr('y')) / 2 + h / 2;
          d3.select('#tooltip')
            .style('left', xPosition + 20 + 'px')
            .style('top', yPosition + 20 + 'px')                     
            .select('#value')
            .text(d.value);
          self.showTip = true;
        })
        // 隐藏提示框
        .on('mouseout', function() {
          self.showTip = false;
        })

      // 为条形增加数值
      this.svg.append('g')
        .attr('id', 'text-section')
        .selectAll('text')
        .data(self.dataset, self.key)
        .enter()
        .append('text')
        .text(function(d) {
          return d.value;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 3;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 3;
        })
        .attr('fill', 'white');
    },
    // 定义键函数(简洁)，以备数据绑定到元素的时候使用
    // 把所有.data(dataset)改成.data(dataset,key)
    key(d) {
      return d.key
    },
    // 值函数 
    value(d) {
      return d.value;
    },
    // 条形排序函数
    barSorts() {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      this.sortOrders = !this.sortOrders;//(3)每点击一次排序方向改变
      this.svg.selectAll("rect")
        .sort(function(a, b) {
          if (self.sortOrders) {
            //对数据集升序排序
            return d3.ascending(a.value, b.value);//这个地方注意是键值对所以要加上值的引用b.value
          } else {
            //对数据集降序排序
            return d3.descending(a.value, b.value);
          }
        })
        .transition()
        .duration(500)
        .attr('x', function(d, i) { // 对排序之后的横坐标重排
          return self.xScale(i);
        });
 
      this.svg.selectAll('text')
        .sort(function(a, b) {
          if (self.sortOrders) {
            // 对数据集升序排序
            return d3.ascending(a.value, b.value); // 这个地方注意是键值对所以要加上值的引用b.value
          } else {
            // 对数据集降序排序
            return d3.descending(a.value, b.value);
          }
        })
        .transition()
        .duration(1000)
        .attr('x', function(d, i) { // 对排序之后的横坐标重排
          return self.xScale(i)+ self.xScale.bandwidth() / 2;
        });
    },
    handleUpdateBand() {
      // let d3 = this.$d3;
      // let w = this.w;
      let h = this.h;
      let self = this;
      this.svg.select('#rect-section')
        .selectAll('rect')
        .transition()
        .duration(500)
        .attr('x', function(d, i) {
          return self.xScale(i); //每个X对应到它相应的档位上
        })
        .attr('y', function(d) {
          return h - self.yScale(d.value);
        })
        .attr('width', self.xScale.bandwidth())
        .attr('height', function(d) {
          return self.yScale(d.value);
        })
        .attr('fill',function(d) {//设置RGB颜色与数值的关系
          return `rgb(0,0,${d.value*10})`;
        })
        .attr('rx', 5)
        .attr('ry', 5);
    },
    handleUpdateText() {
      let self = this;
      let h = this.h;
      this.svg.select('#text-section')
        .selectAll('text')
        .transition()
        .duration(500)
        .text(function(d) {
          return d.value;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 3;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 3;
        })
        .attr('fill', 'white');
    },
    // 增加一条
    handleClickAddBand() {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      let maxValue = 25;
      let newNumber = Math.floor(Math.random()*maxValue); // 0-24的整数
      //根据最后一个key添加一个值
      let lastKeyValue = this.dataset[this.dataset.length - 1].key;
      this.dataset.push({
        key: lastKeyValue + 1,
        value: newNumber
      });

      // 更新x轴比例尺
      this.xScale.domain(d3.range(this.dataset.length));
      //选择所有条
      this.svg.select('#rect-section')
        .selectAll('rect')
        .data(self.dataset, self.key) // 绑定数据到元素集，返回更新的元素集
        .enter()
        .append('rect')
        .attr('x', w); // 在SVG最右边，不可见
 
      this.svg.select('#text-section')
        .selectAll('text')
        .data(self.dataset, self.key)
        .enter()
        .append('text');

      // 更新矩形到可见范围之内，并在这个时候根据数据集为每个条设置对应的属性
      this.handleUpdateBand()
      this.handleUpdateText()
    },
    // 删除一条
    handleClickDelBand() {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      console.log('dataset1', self.dataset)
      this.dataset.shift();
      // 更新X轴比例尺
      this.xScale.domain(d3.range(this.dataset.length));
      
      console.log('dataset2', self.dataset)
      let bars = this.svg.selectAll('rect')
        .data(self.dataset, self.key);
      
      let texts = this.svg.selectAll('text')
        .data(self.dataset, self.key);
      
      // 从左侧退出
      bars.exit()
        .transition()
        .duration(500)
        .attr('x', -self.xScale.bandwidth())
        .remove();

      texts.exit()
        .transition()
        .duration(500)
        .attr('x', -self.xScale.bandwidth())
        .remove();

      // 更新剩余的条形和文本
      bars.transition()
        .duration(500)
        .attr('x', function(d, i) {
          return self.xScale(i); //每个X对应到它相应的档位上
        })
        .attr('width', self.xScale.bandwidth());

      texts.transition()
        .duration(500)
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 3;
        })
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 3;
        });
    },
    // 点击更新
    handleClickUpdateBand() {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      let numValues = this.dataset.length;
      let maxValue = 25;
      let newNumber = 0;
      this.dataset = []
      for(let i = 0; i < numValues; i++){
        newNumber = Math.floor(Math.random()*maxValue+1); //0-24的整数
        this.dataset.push({
          key: i,
          value: newNumber
        });
      }
      // 更新X轴比例尺
      this.xScale.domain(d3.range(this.dataset.length));
      // 更新比例尺，避免纵坐标超出范围
      this.yScale.domain([0, d3.max(this.dataset, this.value)]);

      // 更新所有矩形
      this.svg.select('#rect-section')
        .selectAll('rect')
        .data(self.dataset, self.key)

      this.svg.select('#rect-section')
        .selectAll('rect')
        // .data(self.dataset, self.key)
        .transition() // 过渡动画
        .delay(function(d, i) {
          return i / self.dataset.length * 1000
          //指定过度什么时间开始，可以用函数控制每一条的动画时间，这样就可得到钢琴版的效果
        })
        .duration(500)
        // .ease('linear') // 缓动函数：有circle（加速）elastic（伸缩），linear（匀速），bounce（弹跳）
        .attr('x', function(d, i) {
          return self.xScale(i); //每个X对应到它相应的档位上
        })
        .attr('y', function(d) {
          return h - self.yScale(d.value);
        })
        .attr('height', function(d) {
          return self.yScale(d.value);
        })
        .attr('fill',function(d) {//设置RGB颜色与数值的关系
          return `rgb(0,0,${d.value*10})`;
        });

      // console.log(this.dataset)
      // 更新条形上的数值
      this.svg.select('#text-section')
        .selectAll('text')
        .data(self.dataset, self.key);
      
      this.svg.select('#text-section')
        .selectAll('text')
        .text(function(d) {
          return d.value
        })
        .transition() // 过渡动画
        .delay(function(d, i) {
          return i / self.dataset.length * 1000
          //指定过度什么时间开始，可以用函数控制每一条的动画时间，这样就可得到钢琴版的效果
        })
        .duration(500)
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d.value) + self.xScale.bandwidth() / 3;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 3;
        })
        .attr('fill', 'white');
    }
  }
}
</script>

<style lang="scss">
.group-add-and-del-component {
  svg {
    margin-top: 20px;
    background: #f7f7f7;
  }
  /* 鼠标悬停时变色*/
  rect:hover {
    fill: orange;
  }
  /* 过渡效果*/
  rect {
    // -moz-transiton: all 0.3s;
    // -o-transiton: all 0.3s;
    // -webkit-transition: all 0.3s;
    // transition: all 1s;
  }
  /*(2)给提示条加上样式*/
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