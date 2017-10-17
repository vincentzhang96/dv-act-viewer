<template>
  <div class="tool">
    <div class="loader">
      <div v-if="loadedFileName" class="loaded">
        Using {{ loadedFileName }}
      </div>
      <div v-else class="prompt">
        Load an ACT action: 
      </div>
    </div>
    <time-line></time-line>
  </div>
</template>

<script>
import TimeLine from '@/components/TimeLine'
import PropertySheet from '@/components/PropertySheet'

export default {
  name: "app-tool",
  data() {
      return {
        loadedFileName: ""
      }
  },
  components: {
    TimeLine,
    PropertySheet
  }
}
</script>

<style lang="less" scoped>
.tool {
  position: relative;
  
}

</style>
