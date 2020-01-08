<template>
  <div class="vertical-text-component">
    <svg width="400" height="300">
      <text x="20" y="20" font-size="14">垂直Text</text>
      <g transform="translate(60, 40)">
        <text x="50" y="20" style="writing-mode: tb;letter-spacing:5px" rotate="-90" >Hello</text>
        <text x="70" y="20" transform="rotate(90, 70, 20)" style="letter-spacing:5px" rotate="-90" >Hello</text>
        <text x="70" y="-10" transform="rotate(90, 70, 20)" style="letter-spacing:5px" rotate="-90" >耿少斌</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.vertical-text-component {
  display: inline-block;
}
</style>
