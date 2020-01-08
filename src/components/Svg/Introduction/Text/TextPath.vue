<template>
  <div class="text-path-component">
    <svg width="400" height="300">
      <text x="20" y="20" font-size="14">TextPath</text>
      <g transform="translate(60, 40)">
        <defs>
          <path id="circle" d="M70 20a40 40 0 1 1 -1 0"></path>
        </defs>
        <text>
          <textPath xlink:href="#circle">
            Text following a circle.............
          </textPath>
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.text-path-component {
  display: inline-block;
}
</style>
