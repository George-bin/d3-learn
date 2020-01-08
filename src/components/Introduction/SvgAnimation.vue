<template>
  <div class="svg-animation-component">
    <button @click="handleClickUpdateBand">点击更新</button>
    <button @click="handleClickAddBand">增加一条</button>
    <button @click="handleClickDelBand">删除一条</button>
    <br/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w: 600,
      h: 250,
      svg: null,
      xScale: null,
      yScale: null,
      // dataset: [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]
      dataset: [ 5, 10, 13, 19, 21, 25 ]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
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
      
      console.log('init', this.xScale.bandwidth())

      this.yScale = d3.scaleLinear() // 线性比例尺
        .domain([0, d3.max(self.dataset)])
        .range([0, h]);
      
      // 创建svg元素
      this.svg = d3.select('.svg-animation-component')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      // 为svg添加条形
      this.svg.append('g')
        .selectAll('rect')
        .data(self.dataset)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
          // return i * (w / self.dataset.length); // 从0开始每次右移元素宽那么长(w / dataset.length)
          return self.xScale(i); // 这里使用序数比例尺，自己去找刚才划分好的档位
        })
        .attr('y', function(d) {
          return h - self.yScale(d)
        })
        .attr('width', self.xScale.bandwidth())
        // .attr('width', 20)
        .attr('height', function(d) {
          return self.yScale(d);
        })
        .attr("fill", function(d) {//设置RGB颜色与数值的关系
          return `rgb(0,0,${d*10})`;
        });

      // 为条形增加数值
      this.svg.append('g')
        .selectAll('text')
        .data(self.dataset)
        .enter()
        .append('text')
        .text(function(d) {
          return d;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d) + self.xScale.bandwidth() / 3;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 3;
        })
        .attr('fill', 'white');
    },
    handleInitBand(bars) {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      console.log('del', this.xScale.bandwidth())
      bars.selectAll('rect')
        .data(self.dataset)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
          // return i * (w / self.dataset.length); // 从0开始每次右移元素宽那么长(w / dataset.length)
          console.log('x位置', self.xScale(i))
          return self.xScale(i); // 这里使用序数比例尺，自己去找刚才划分好的档位
        })
        .attr('y', function(d) {
          return h - self.yScale(d)
        })
        .attr('width', self.xScale.bandwidth())
        .attr('height', function(d) {
          return self.yScale(d);
        })
        .attr("fill", function(d) {//设置RGB颜色与数值的关系
          return `rgb(0,0,${d*10})`;
        });
    },
    handleInitText(texts) {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      texts.selectAll('text')
        .data(self.dataset)
        .enter()
        .append('text')
        .text(function(d) {
          return d;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d) + self.xScale.bandwidth() / 3;
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
      this.dataset.push(newNumber);

      // 更新x轴比例尺
      this.xScale.domain(d3.range(this.dataset.length));
      //选择所有条
      let bars = this.svg.selectAll('rect')
        .data(self.dataset); //绑定数据到元素集，返回更新的元素集
 
      let texts = this.svg.selectAll('text')
        .data(self.dataset);
      
      // 更新条形元素到最左边
      bars.enter()
        .append('rect')
        .attr('x', w); // 在SVG最右边，不可见
      
      texts.enter()
        .append('text');

      // 更新矩形到可见范围之内，并在这个时候根据数据集为每个条设置对应的属性
      bars.transition()
        .duration(500)
        .attr('x', function(d, i) {
          return self.xScale(i); //每个X对应到它相应的档位上
        })
        .attr('y', function(d) {
          return h - self.yScale(d);
        })
        .attr('width', self.xScale.bandwidth())
        .attr('height', function(d) {
          return self.yScale(d);
        })
        .attr('fill',function(d) {//设置RGB颜色与数值的关系
          return `rgb(0,0,${d*10})`;
        });
      
      texts.transition()
        .duration(500)
        .text(function(d) {
          return d;
        })
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d) + self.xScale.bandwidth() / 2;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 2;
        })
        .attr('fill', 'white');
    },
    // 删除一条
    handleClickDelBand() {
      let d3 = this.$d3;
      let w = this.w;
      let h = this.h;
      let self = this;
      this.dataset.shift();
      // 更新X轴比例尺
      this.xScale.domain(d3.range(this.dataset.length));
      
      let bars = this.svg.selectAll('rect')
        .data(self.dataset);
      
      let texts = this.svg.selectAll('text')
        .data(self.dataset);
      
      bars.exit()
        .transition()
        .duration(500)
        .attr("x", w)
        .remove();
      
      texts.exit()
        .transition()
        .duration(500)
        .attr("x", w)
        .remove();

      // this.handleInitBand(bars);
      // this.handleInitText(texts);
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
      for(var i=0;i<numValues;i++){
        newNumber = Math.floor(Math.random()*maxValue+1); //0-24的整数
        this.dataset.push(newNumber);
      }
      // 更新比例尺，避免纵坐标超出范围
      this.yScale.domain([0, d3.max(this.dataset)]);
      // 更新所有矩形
      this.svg.selectAll('rect')
        .data(self.dataset)
        .transition() // 过渡动画
        .delay(function(d, i) {
          return i / self.dataset.length * 1000
          //指定过度什么时间开始，可以用函数控制每一条的动画时间，这样就可得到钢琴版的效果
        })
        .duration(1000)
        // .ease('linear') // 缓动函数：有circle（加速）elastic（伸缩），linear（匀速），bounce（弹跳）
        .attr('y', function(d) {
          return h - self.yScale(d);
        })
        .attr('height', function(d) {
          return self.yScale(d);
        });

      // 更新条形上的数值
      this.svg.selectAll('text')
        .data(self.dataset)
        .text(function(d) {
          return d
        })
        .transition() // 过渡动画
        .delay(function(d, i) {
          return i / self.dataset.length * 1000
          //指定过度什么时间开始，可以用函数控制每一条的动画时间，这样就可得到钢琴版的效果
        })
        .duration(1000)
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return self.xScale(i) + self.xScale.bandwidth() / 2;
        })
        .attr('y', function(d, i) {
          return h - self.yScale(d) + self.xScale.bandwidth() / 3;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function(d) {
          return self.xScale.bandwidth() / 3;
        })
        .attr('fill', 'red');
    }
  }
}
</script>

<style lang="scss">
.svg-animation-component {
  svg {
    margin-top: 20px;
    background: #f7f7f7;
  }
}
</style>
