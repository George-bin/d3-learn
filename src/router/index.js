import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let d3Router = [
  {
    path: '/d3/introduction',
    name: 'introduction',
    component: () => import('@/components/Introduction/Introduction')
  },
  {
    path: '/d3/binddata',
    name: 'binddata',
    component: () => import('@/components/Introduction/BindData')
  },
  {
    path: '/d3/testdata',
    name: 'testdata',
    component: () => import('@/components/Introduction/TestData')
  },
  {
    path: '/d3/svgLearn',
    name: 'svgLearn',
    component: () => import('@/components/Introduction/SvgLearn')
  },
  {
    path: '/d3/splashesChart',
    name: 'splashesChart',
    component: () => import('@/components/Introduction/SplashesChart')
  },
  {
    path: '/d3/scaleLearn',
    name: 'scaleLearn',
    component: () => import('@/components/Introduction/ScaleLearn')
  },
  {
    path: '/d3/axisLearn',
    name: 'axisLearn',
    component: () => import('@/components/Introduction/AxisLearn')
  },
  {
    path: '/d3/pathWord',
    name: 'pathWord',
    component: () => import('@/components/Introduction/PathWord')
  },
  {
    path: '/d3/svgBaseGraph',
    name: 'svgBaseGraph',
    component: () => import('@/components/Introduction/SvgBaseGraph')
  },
  {
    path: '/d3/svgAnimation',
    name: 'svgAnimation',
    component: () => import('@/components/Introduction/SvgAnimation')
  },
  {
    path: '/d3/keyAndData',
    name: 'keyAndData',
    component: () => import('@/components/Introduction/KeyAndData')
  },
  {
    path: '/d3/groupAddAndDel',
    name: 'groupAddAndDel',
    component: () => import('@/components/Introduction/GroupAddAndDel')
  },
  {
    path: '/d3/chartMouseOver',
    name: 'chartMouseOver',
    component: () => import('@/components/Introduction/ChartMouseOver')
  },
  {
    path: '/d3/chartSort',
    name: 'chartSort',
    component: () => import('@/components/Introduction/ChartSort')
  },
  {
    path: '/d3/mouseOverTip',
    name: 'mouseOverTip',
    component: () => import('@/components/Introduction/MouseOverTip')
  },
  {
    path: '/d3/circleChart',
    name: 'circleChart',
    component: () => import('@/components/Introduction/CircleChart')
  },
  {
    path: '/d3/wizardFigure',
    name: 'wizardFigure',
    component: () => import('@/components/Introduction/WizardFigure')
  },
  {
    path: '/d3/rectChart',
    name: 'rectChart',
    component: () => import('@/views/RectChart/RectChart')
  }
]

let canvasRouter = [
  {
    path: '/canvas',
    name: 'canvas',
    component: () => import('@/views/Canvas/Canvas')
  }
]

let svgRouter = [
  {
    path: '/svg/introduction',
    name: 'svgIntroduction',
    component: () => import('@/views/Svg/Introduction')
  },
  {
    path: '/svg/example',
    name: 'svgExample',
    component: () => import('@/views/Svg/Example')
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/Home')
    },
    ...d3Router,
    ...canvasRouter,
    ...svgRouter
  ]
})
