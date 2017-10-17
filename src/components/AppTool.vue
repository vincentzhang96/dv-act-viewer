<template>
  <div class="tool">
    <div class="loader">
      <div v-if="loadedFileName" class="loaded">
        Using {{ loadedFileName }}
      </div>
      <div v-else class="prompt">
        <div class="card">          
          <h2>Load an ACT action file</h2>
          <p>
            Please export an ACT action from STARGAZER and 
            load it here
          </p>
          <form>
            <input id="file-upload" type="file" hidden v-on:change.prevent="selectFile"/>
            Drag-n-drop or <label class="link" for="file-upload">select a file</label>.
          </form>
        </div>
      </div>
    </div>
    <div v-if="action">
      <time-line></time-line>
    </div>
  </div>
</template>

<script>
import TimeLine from '@/components/TimeLine'
import PropertySheet from '@/components/PropertySheet'

export default {
  name: "app-tool",
  data() {
      return {
        loadedFileName: "",
        action: null
      }
  },
  components: {
    TimeLine,
    PropertySheet
  },
  methods: {
    selectFile(evt) {
      let files = evt.target.files;
      let file = files[0];
      this.loadFile(file);
    },
    loadFile(file) {
      let dataStr = FileReader.readAsText(file);
      let data = JSON.parse(dataStr);
      console.log(data);
    }
  }
}
</script>

<style lang="less" scoped>
@import "../less/GLAZE.less";

.tool {
  position: relative;
  
  .loader {
    .prompt {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;

      .card {
        border-left: 4px solid @dv-c-accent-1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: @dv-c-background-card;
        width: 400px;
        margin: auto;
        padding: 20px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
        h2 {
          margin: 0;
          padding: 0;
        }

        .link {
          color: @dv-c-accent-1;
          cursor: pointer;
          font-weight: bold;
          transition: color ease-in 0.125s;

          &:hover {
            color: @dv-c-accent-2;
          }
        }
      }
    }
  }
}

</style>
