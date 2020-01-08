<template>
  <div class="home-main-component">
    <h3 class="title">D3入门</h3>
    <ul class="route-list">
      <li class="route-list-item" @click="handleClickGoRoute('/d3/introduction')">入门</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/binddata')">数据绑定</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/testdata')">测试数据</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/svgLearn')">svg learn</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/splashesChart')">散点图</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/scaleLearn')">比例尺</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/axisLearn')">坐标轴</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/pathWord')">有路径的文字</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/svgBaseGraph')">SVG基本图形</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/svgAnimation')">更新、过渡、动画</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/keyAndData')">键联结数据</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/groupAddAndDel')">组合添加删除</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/chartMouseOver')">图表交互（渐变）</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/chartSort')">图表交互（排序）</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/mouseOverTip')">图表交互（提示面板）</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/circleChart')">饼状圆环图</li>
      <li class="route-list-item" @click="handleClickGoRoute('/d3/wizardFigure')">力向导图</li>
    </ul>

    <h3 class="title">模块练习</h3>
    <ul class="route-list">
      <li class="route-list-item" @click="handleClickGoRoute('/d3/rectChart')">柱状图</li>
    </ul>

    <h3 class="title">SVG学习</h3>
    <ul class="route-list">
      <li class="route-list-item" @click="handleClickGoRoute('/svg/introduction')">入门</li>
      <li class="route-list-item" @click="handleClickGoRoute('/svg/example')">案例</li>
    </ul>

    <h3 class="title">Canvas学习</h3>
    <ul class="route-list">
      <li class="route-list-item" @click="handleClickGoRoute('/canvas')">入门</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClickGoRoute(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss">
.home-main-component {
  .title {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 20px;
    background: #f7f7f7;
    &::before {
      display: inline-block;
      content: " ";
      width: 2px;
      height: 20px;
      margin-right: 10px;
      background: #333333;
    }
  }
  .route-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    .route-list-item {
      width: 50%;
      cursor: pointer;
    }
    .route-list-item + .route-list-item {
      // margin-left: 20px;
    }
  }
}
</style>
