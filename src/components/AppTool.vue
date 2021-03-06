<template>
  <div class="tool" ref="dropzone">
    <div class="loader">
      <div v-if="!loadedFileName" class="prompt">
        <div class="card">
          <h2>Load an ACT action file</h2>
          <p>
            Please export an ACT action from STARGAZER and 
            load it here
          </p>
          <form>
            <input id="file-upload" type="file" hidden v-on:change.prevent="selectFile"/>
            <label class="link" for="file-upload">Select a file</label>.
          </form>
        </div>
      </div>
    </div>
    <div v-if="action" class="content">
      <h2>{{ action.actionName }}</h2>
      <button v-on:click="unload">Unload</button>
      <form>
        <input id="file-upload" type="file" hidden v-on:change.prevent="selectFile"/>
        <label class="link" for="file-upload">Load another file</label>
      </form>
      <table>
        <tr>
          <th>Animation</th>
          <td>{{ action.aniName }}</td>
        </tr>
        <tr>
          <th>Default Next Action</th>
          <td v-if="action.defaultNextActionName">{{ action.defaultNextActionName }}</td>
          <td v-else>&lt;none&gt;</td>
        </tr>
        <tr>
          <th>Frame Count</th>
          <td>{{ action.lastFrameNumber + 1 }} primary, {{ action.blendFrameCount }} blend, {{ action.nextActionFrameCount }} next</td>
        </tr>
        <tr>
          <th>Block Count</th>
          <td>{{ action.blocks.length }}</td>
        </tr>
        <tr>
          <th>Raw Runtime</th>
          <td>{{ ((action.lastFrameNumber + 1)/60).toFixed(2) }}s</td>
        </tr>
      </table>
      <time-line :action="action" v-on:selectb="select"></time-line>
      <div v-if="activeBlock">
        <property-sheet :actblock="activeBlock"></property-sheet>
      </div>
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
        action: null,
        activeBlock: null
      }
  },
  components: {
    TimeLine,
    PropertySheet
  },
  mounted() {
    this.$refs.dropzone.addEventListener("drop", (e) => this.onDrop(e));
    this.$refs.dropzone.addEventListener("dragover", (e) => this.dragOver(e));
  },
  methods: {
    selectFile(evt) {
      let files = evt.target.files;
      let file = files[0];
      this.loadFile(file);
    },
    loadFile(file) {
      let reader = new FileReader();
      let thiss = this;
      reader.onload = function(e) {
        let data = reader.result;
        let action = JSON.parse(data);
        thiss.action = action;
        thiss.loadedFileName = file.name;
        console.log("Loaded " + action.actionName);
      };

      reader.readAsText(file);
    },
    select(block) {
      this.activeBlock = block;
    },
    unload() {
      this.loadedFileName = "";
      this.action = null;
      this.activeBlock = null;
    },
    dragOver(ev) {
      ev.preventDefault();
    },
    onDrop(ev) {
      ev.preventDefault();
      let file = null;
      if (ev.dataTransfer.items) {
        for (let i = 0; i < ev.dataTransfer.items.length; ++i) {
          if (ev.dataTransfer.items[i].kind === 'file') {
            file = ev.dataTransfer.items[i].getAsFile();
            break;
          }
        }
      } else {
        for (let i = 0; i < ev.dataTransfer.files.length; ++i) {
          file = ev.dataTransfer.files[i];
          break;
        }
      }

      if (file != null) {
        this.loadFile(file);
      }

      if (ev.dataTransfer.items) {
        ev.dataTransfer.items.clear();l
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../less/GLAZE.less";

.tool {
  position: relative;
  height: 100vh;
  
  .link {
    color: @dv-c-accent-1;
    cursor: pointer;
    font-weight: bold;
    transition: color ease-in 0.125s;

    &:hover {
      color: @dv-c-accent-2;
    }
  }

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
      }
    }
  }

  .content {
    padding-left: 20px;
    padding-right: 20px;

    h2 {
      color: #444;
      margin: 8px 0;
      padding: 0.2em 8px;
      border-left: 4px solid @dv-c-accent-1;
    }
  }
}

</style>
