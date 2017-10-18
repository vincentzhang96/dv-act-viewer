<template>
  <div class="propsheet">
    <div class="wrapper" v-if="actblock">
      <div class="left">
        <h3>Block Info</h3>
        <table>
          <tr>
            <th>Type</th>
            <td>{{ "0x" + actblock.typeId.toString(16).toUpperCase() }} {{ humanName(actblock) }}</td>
          </tr>
          <tr>
            <th>Order</th>
            <td>{{ actblock.order }}</td>
          </tr>
          <tr>
            <th>Start Frame</th>
            <td> {{ actblock.startFrame }} ({{ (actblock.startFrame / 60).toFixed(2) }}s)</td>
          </tr>
          <tr>
            <th>End Frame</th>
            <td> {{ actblock.endFrame }} ({{ (actblock.endFrame / 60).toFixed(2) }}s)</td>
          </tr>
          <tr>
            <th>Tags</th>
            <td><span v-for="c in actblock.categories" :key="c" class="tag">{{ c }}</span></td>
          </tr>
        </table>
      </div>
      <div v-if="fields" class="right">
        <h3>{{ humanName(actblock) }} Parameters</h3>
        <table>
          <tr v-for="(v, k) in fields">
            <th>{{ k }}</th>
            <td>{{ v }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BlockUtils from "@/api/BlockUtils";

export default {
  name: "prop-sheet",
  props: ["actblock"],
  data() {
      return {
        fields: null
      }
  },
  watch: {
    actblock: function(newAction) {
      this.populate();
    }
  },
  created() {
    this.populate();
  },
  methods: {
    humanName(b) {
      return BlockUtils.getHumanName(b.typeName);
    },
    populate() {
      let f = {};
      Object.assign(f, this.actblock.fields);
      if (f.hasOwnProperty("damageCoefficient")) {
        f.damageCoefficient = f.damageCoefficient + "%";
      }

      let ret = {};
      for (let k in f) {
        let v = f[k];
        if (k.indexOf("reserved") != -1) {
          continue;
        }

        if (/unknown[0-9]+z/.test(k) && v === 0) {
          continue;
        }

        if (/unknown[0-9]+/.test(k) && v === "") {
          continue;
        }

        if (v.hasOwnProperty("x") && v.hasOwnProperty("y")) {
          let cvals = [];
          for (let coord in v) {
            cvals.push(v[coord]);
          }
          v = "{" + cvals.join(", ") + "}";
        }

        ret[k] = v;
      }

      this.fields = ret;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../less/GLAZE.less";

.propsheet {

  table {
    font-size: 12px;
  }

  th {
    min-width: 150px;
  }

  td {
    min-width: 300px;
  }

  .wrapper {
    display: flex;
    flex-direction: row;

    .left {
      flex: 0 0 auto;
    }

    .right {
      flex: 1 1 auto;
      margin-left: 20px;
    }
  }

  .tag {
    display: inline-block;
    margin: 0 0.2em;
    padding: 0.1em 0.4em;
    font-weight: bold;
    color: @dv-c-background;
    background-color: @dv-c-foreground;

    &:first-child {
      margin-left: 0;
    }
  }
}


</style>
