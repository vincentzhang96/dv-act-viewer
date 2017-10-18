<template>
  <div class="timeline">
    <h2>Timeline</h2>
    <!-- <h4>Tracks</h4> -->
    <div class="container">
      <div class="tracks">
        <div class="wrapper">
          <div class="time-track" v-on:click="select(null)">
            <div class="tick" v-for="i in (action.lastFrameNumber + 5)" :key="i" v-if="i % 5 == 0">{{i}}</div>
          </div>
          <div v-for="track in tracks" :key="track.id" class="row">
            <div v-for="b in track.blocks" :key="blockId(b)">
              <div :class="`datablock ${bgColorClass(b)} ${selected == blockId(b) ? 'active' : ''}`" :style="`width: ${(b.endFrame - b.startFrame)*8}px;left: ${b.startFrame*8}px;`" v-on:click="select(b)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockUtils from "@/api/BlockUtils";

export default {
  name: "time-line",
  props: ["action"],
  data() {
      return {
        selected: "",
        tracks: [
        ]
      }
  },
  watch: {
    action: function(newAction) {
      this.draw();
    }
  },
  created() {
    this.draw();
  },
  methods: {
    draw() {
      let tracks = [
      ];
      let blocks = this.action.blocks.slice(0);
      blocks.sort((a, b) => {
        let length = -((a.endFrame - a.startFrame) - (b.endFrame - b.startFrame));
        if (length == 0) {
          let order = a.order - b.order;
          if (order == 0) {
            return a.typeId - b.typeId;
          }
          return order;
        }
        return length;
      });
      for (let block of blocks) {
        let added = false;
        for (let track of tracks) {
          let available = true;
          for (let existBlock of track.blocks) {
            available &= !BlockUtils.overlap(block, existBlock);
          }

          if (available) {
            track.blocks.push(block);
            added = true;
            break;
          }
        }
        if (!added) {
          //  Out of tracks, add a new one
          let newTrack = {
            id: tracks.length,
            name: `${tracks.length}`,
            blocks: [block]
          }

          tracks.push(newTrack);
        }
      }

      this.tracks = tracks;
    },
    bgColorClass(block) {
      let last = block.typeName.lastIndexOf(".");
      let stripped = block.typeName.slice(last + 10, -5).toLowerCase();
      return "block-" + stripped;
    },
    blockId(b) {
      return `${b.typeId}${b.startFrame}${b.endFrame}${b.order}`;
    },
    select(block) {
      if (block) {
        this.selected = this.blockId(block);
      } else {
        this.selected = "";
      }
      this.$emit("selectb", block);
    }
  }
}
</script>

<style lang="less" scoped>

@import "../less/GLAZE.less";

.timeline {
    background: saturate(lighten(@dv-c-background, -10%), -10%);
    min-height: 20px;
    padding: 4px;

    h2 {
      font-family: @dv-f-geomanist;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.2em;
      padding: 0 4px;
      margin: 0;
      font-weight: normal;
    }

    h4 {
      margin: 0;
    }

    .container {
      .time-track {
        height: 14px;
        line-height: 1em;
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;

        .tick {
          background: @dv-c-accent-1;
          width: 40px;
          font-size: 10px;
          padding: 2px 4px;
          margin: 0;
          text-align: right;
          color: @dv-c-background;
          display: inline-block;
          line-height: 1em;
          vertical-align: 35%;
          border-right: 1px solid @dv-c-accent-2;
          border-bottom: 2px solid @dv-c-accent-2;
          box-sizing: border-box;
          cursor: default;
          
        }
      }

      .tracks {
        border: 1px solid @dv-c-accent-1;
        margin: 0;
        padding: 0;
        position: relative;
        overflow-x: scroll;

        .wrapper {
          position: relative;
          padding-top: 16px;

          .row {
            @row-height: 10px;
            height: @row-height;

            .datablock {
              height: @row-height;
              border: 1px solid black;
              box-sizing: border-box;
              min-width: 5px;
              position: absolute;
              background: #AAA;
              cursor: crosshair;

              &.active {
                border-color: #FFF !important;
                // border-width: 3px;
                // animation: pulse 2s infinite;
                box-shadow: 0px 0px 10px 7px #8CF,
                  inset 0px 0px 4px 2px #FFF;
                z-index: 10;
              }

              @keyframes pulse {
                0% {
                  background-color: #FFF;
                }
                50% {
                  background-color: @dv-c-accent-3;
                }
                100% {
                  background-color: #FFF;
                }
              }

              &.block-00null {
                background: #AAA;
              }
              &.block-01input {
                background: #111;
                border-color: #444;
              }
              &.block-02enablemovement {
                background: #07A;
              }

              &.block-04skilldamage {
                background: #09F;
              }

              &.block-06jump {
                background: #A4F;
              }

              &.block-09state {
                background: #CCC;
              }
              &.block-0acanbehit {
                background: #A00;
              }
              &.block-0bsound {
                background: #F0F;
              }
              &.block-0cparticle {
                background: #0F0;
              }
              &.block-0eweaponaction {
                background: #508;
              }
              &.block-0fprojectile {
                background: #2DF;
              }
              &.block-1dpassiveinput {
                background: #333;
              }
              &.block-1fcamerashake {
                background: #860;
              }
              &.block-21effect {
                background: #8C8;
              }
              &.block-25actionobject {
                background: #FC0;
              }

              &.block-2cswordtrail {
                background: #686;
              }
              &.block-2dcameraradialblur {
                background: #890;
              }
              &.block-2esuperarmor {
                background: #FF0;
              }
              &.block-33decal {
                background: #484;
              }
              &.block-3acameralock {
                background: #880;
              }
              &.block-3bfacialexpression {
                background: #FA8
              }
              &.block-3dcanuseskill {
                background: #04C;
              }
              &.block-42applystateeffect {
                background: #0FF;
              }

              &.block-4eparry {
                background: #424;
              }
              &.block-4fparticleloopend {
                background: #0F0;
                border-color: #F00;
              }

              &.block-5cselfeffect {
                background: #AFA;
              }

              &.block-63cooldownparry {
                background: #313;
              }
            }
          }
        }

        padding-bottom: 10px;
      }
    }
}
</style>
