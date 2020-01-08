<template>
  <div class="wizard-figure-component"></div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    // this.init();
    this.test();
    this.test2();
  },
  methods: {
    init() {
      let d3 = this.$d3;
      let self = this;
      let config = {
        w: 300,
        h: 200,
        nodes: [
          //节点
          { id: "Adam" },
          { id: "Bob" },
          { id: "Carride" },
          { id: "Donovan" },
          { id: "Edward" },
          { id: "Felicity" },
          { id: "George" },
          { id: "Hannah" },
          { id: "Iris" },
          { id: "Jerry" }
        ],
        links: [
          //边
          { source: 0, target: 1, weight: 1, color: 1 },
          { source: 0, target: 2, weight: 3, color: 4 },
          { source: 0, target: 3, weight: 4, color: 6 },
          { source: 0, target: 4, weight: 6, color: 65 },
          { source: 1, target: 5, weight: 3, color: 76 },
          { source: 2, target: 5, weight: 8, color: 879 },
          { source: 2, target: 5, weight: 7, color: 989 },
          { source: 3, target: 4, weight: 9, color: 643 },
          { source: 5, target: 8, weight: 1, color: 54 },
          { source: 5, target: 9, weight: 3, color: 54 },
          { source: 6, target: 7, weight: 4, color: 45 },
          { source: 7, target: 8, weight: 1, color: 43 },
          { source: 2, target: 8, weight: 8, color: 243 },
          { source: 3, target: 8, weight: 1, color: 43 },
          { source: 5, target: 8, weight: 5, color: 13 },
          { source: 6, target: 8, weight: 3, color: 351 },
          { source: 8, target: 9, weight: 4, color: 1 }
        ],
        // 是否启动 鼠标 hover 到节点上高亮与节点有关的节点，其他无关节点透明的功能
        isHighLight: false,
        // 是否启用缩放平移zoom功能
        isScale: true,
        // 缩放比例尺
        scaleExtent: [0.5, 1.5],
        // 万有引力
        chargeStrength: -300,
        // 碰撞力的大小（节点之间的间距）
        collide: 60,
        // 每个node节点所占的宽度（正方形）
        nodeWidth: 120,
        // node节点距离父亲div的margin
        margin: 20,
        // 控制力学模拟衰减率
        alphaDecay: 0.0228,
        // 头像的半径 [30 - 45]
        r: 30,
        // 关系文字大小
        relFontSize: 12,
        // 划线时候的弧度
        linkSrc: 30,
        // 链接线默认的颜色
        linkColor: "#bad4ed",
        // 头像外围包裹的颜色
        strokeColor: "#7ecef4",
        // 头像外围包裹的宽度
        strokeWidth: 3
      };

      // 颜色函数
      let colors = d3.scaleOrdinal(d3.schemeCategory10); //创建序数比例尺和包括20中颜色的输出范围

      // 1、创建一个力学模拟器
      // simulation.force(name,[force])函数，添加某种力
      let simulation = d3
        .forceSimulation() // 加载节点数据
        .force(
          "link",
          d3.forceLink().id(function(d) {
            return d.id;
          })
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(config.w / 2, config.h / 2));

      let svg = d3
        .select(".wizard-figure-component")
        .append("svg")
        .attr("width", config.w)
        .attr("height", config.h);

      // 创建作为连线的svg直线
      let links = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(config.links)
        .enter()
        .append("line")
        .style("stroke", function(d) {
          //  设置线的颜色
          return colors(d.color);
        })
        .style("stroke-width", function(d, i) {
          //设置线的宽度
          return d.weight;
        });

      //(4) 创建作为连线的svg圆形
      let nodes = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(config.nodes)
        .enter()
        .append("circle")
        // .attr("r", function(d) {
        //   // console.log(d.weight);
        //   //设置圆点的半径，圆点的度越大weight属性值越大，可以对其做一点数学变换
        //   return Math.log(d.weight) * 10;
        // })
        .attr("r", 5)
        .style("fill", function(d, i) {
          // return colors(d.weight * d.weight * d.weight);
          return colors(i);
        })
        .call(d3.drag()) //可以拖动
        .on("start", function(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", function(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on("end", function(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });

      console.log("simulation", simulation);

      // return;

      //(5)打点更新，没有的话就显示不出来了
      function ticked() {
        return;
        //边
        links
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        //节点
        nodes
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });
      }

      // 调用模拟器
      simulation
        .nodes(config.nodes)
        .on("tick", ticked)
        .force("link");
      // .links(config.links);
    },
    test() {
      let d3 = this.$d3;
      let nodes = [
        { name: "BeiJing" },
        { name: "XiaMen" },
        { name: "XiAn" },
        { name: "HangZhou" },
        { name: "ShangHai" },
        { name: "QingDao" },
        { name: "NanJing" }
      ];

      let links = [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 1, target: 6 }
      ];

      let width = 800;
      let height = 600;

      // 绘制svg颜色
      let svg = d3
        .select(".wizard-figure-component")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


      // 创建一个力导向图
      let simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).distance(100))
        .force("charge", d3.forceManyBody()) //创建多体力
        .force("center", d3.forceCenter(width / 2, height / 2));

      // 生成节点数据
      simulation
        .nodes(nodes) //设置力模拟的节点
        .on("tick", ticked);

      // 生成线数据
      simulation
        .force("link") //添加或移除力
        .links(links) //设置连接数组
        .distance(100);
      
      // 在浏览器的控制台输出
      console.log(nodes);
      console.log(links);

      // 颜色比例尺
      let color = d3.scaleOrdinal(d3.schemeCategory10);

      // 绘制线
      let svg_links = svg
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1)
        .call(
          d3
            .zoom() //创建缩放行为
            .scaleExtent([-5, 2]) //设置缩放范围
        );

      // 绘制节点
      let svg_nodes = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        })
        .attr("r", "20")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .call(
          d3
            .drag()
            .on("start", dragstarted) //d3.drag() 创建一个拖曳行为
            .on("drag", dragged)
            .on("end", dragended)
        );
      console.log(nodes);

      //添加描述节点的文字
      var svg_texts = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill", "black")
        .attr("dx", 20)
        .attr("dy", 8)
        .text(function(d) {
          return d.name;
        });
      // 拖拽函数 start
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart(); //设置目标α
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      // 拖拽函数 end

      function ticked() {
        svg_links
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        svg_nodes
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });

        svg_texts
          .attr("dx", function(d) {
            return d.x;
          })
          .attr("dy", function(d) {
            return d.y;
          });
      }
    },
    test2() {
      let d3 = this.$d3;
      var width = 800;
      var height = 600;
      var marge = { top: 60, bottom: 60, left: 60, right: 60 };

      // 创建svg元素
      var svg = d3
        .select(".wizard-figure-component")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      
      var g = svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      //准备数据
      var nodes = [
        { name: "湖南邵阳" },
        { name: "山东莱州" },
        { name: "广东阳江" },
        { name: "山东枣庄" },
        { name: "泽" },
        { name: "恒" },
        { name: "鑫" },
        { name: "明山" },
        { name: "班长" }
      ];

      var edges = [
        { source: 0, target: 4, relation: "籍贯", value: 1.3 },
        { source: 4, target: 5, relation: "舍友", value: 1 },
        { source: 4, target: 6, relation: "舍友", value: 1 },
        { source: 4, target: 7, relation: "舍友", value: 1 },
        { source: 1, target: 6, relation: "籍贯", value: 2 },
        { source: 2, target: 5, relation: "籍贯", value: 0.9 },
        { source: 3, target: 7, relation: "籍贯", value: 1 },
        { source: 5, target: 6, relation: "同学", value: 1.6 },
        { source: 6, target: 7, relation: "朋友", value: 0.7 },
        { source: 6, target: 8, relation: "职责", value: 2 }
      ];
      // 设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
      var colorScale = d3
        .scaleOrdinal()
        .domain(d3.range(nodes.length))
        .range(d3.schemeCategory10);

      // 新建一个力导向图
      var forceSimulation = d3
        .forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());

      // 初始化力导向图，也就是传入数据
      // 生成节点数据
      forceSimulation.nodes(nodes).on("tick", ticked); // 这个函数很重要，后面给出具体实现和说明
      // 生成边数据
      forceSimulation
        .force("link")
        .links(edges)
        .distance(function(d) {
          // 每一边的长度
          return d.value * 100;
        });

      // 设置图形的中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 2);

      // 在浏览器的控制台输出
      console.log(nodes);
      console.log(edges);

      // 有了节点和边的数据后，我们开始绘制
      // 绘制边
      var links = g
        .append("g")
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", function(d, i) {
          return colorScale(i);
        })
        .attr("stroke-width", 1);
      var linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .text(function(d) {
          return d.relation;
        })
        .attr('font-size', '11px');

      // 绘制节点
      // 老规矩，先为节点和节点上的文字分组
      var gs = g
        .selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          var cirX = d.x;
          var cirY = d.y;
          return "translate(" + cirX + "," + cirY + ")";
        })
        .call(
          d3
            .drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        );

      // 绘制节点
      gs.append("circle")
        .attr("r", 10)
        .attr("fill", function(d, i) {
          return colorScale(i);
        });
      // 文字
      gs.append("text")
        .attr("x", -10)
        .attr("y", -20)
        .attr("dy", 10)
        .text(function(d) {
          return d.name;
        })
        .attr('font-size', '14px')

      function ticked() {
        links
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        linksText
          .attr("x", function(d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function(d) {
            return (d.source.y + d.target.y) / 2;
          });

        gs.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }
      function started(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0.8).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function ended(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
    }
  }
};
</script>

<style lang="scss">
.wizard-figure-component {
  svg {
    display: block;
    background: #f7f7f7;
  }
  svg + svg {
    margin-top: 20px;
  }
}
</style>
