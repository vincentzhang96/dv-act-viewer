<template>
  <div class="timeline">
    <h2>Timeline</h2>
  </div>
</template>

<script>
export default {
  name: "time-line",
  props: ["action"],
  data() {
      return {

      }
  }
}
</script>

<style lang="less" scoped>
@import "../less/GLAZE.less";

.timeline {
    background: lighten(@dv-c-background, -10%);
    min-width: 100%;
    min-height: 20px;

    h2 {
      font-family: @dv-f-geomanist;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.2em;
      padding: 0 4px;
      margin: 0;
      font-weight: normal;
    }
}
</style>
