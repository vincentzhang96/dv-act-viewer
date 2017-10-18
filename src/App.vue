<template>
  <div id="app">
    <div class="head">
      <!-- <img src="https://divinitor.com/resources/img/dv-logo.png" class="logo"/> -->
      <div class="title">
        Divinitor DN
        <div class="subtitle">ACT Action Viewer</div>
      </div>
    </div>
    <div class="headfix"></div>
    <app-tool></app-tool>
  </div>
</template>

<script>
import AppTool from './components/AppTool'

export default {
  name: 'app',
  components: {
    AppTool
  }
}
</script>

<style lang="less">
@import "./less/GLAZE.less";

html {
    background-color: @dv-c-background;
    color: @dv-c-body;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    width: 100%;

    position: relative;
    margin: 0;
    padding: 0;
}

body {
    color: @dv-c-body;
    font-family: @dv-f-lato;
    padding: 0;
    margin: 0;
}

p {
    font-size: 14px;
    letter-spacing: -0.005em;
}

.head {
  // width: 100%; 
  height: 40px;
  padding: 8px 16px;
  font-size: 40px;
  background-color: @dv-c-background-card;
  position: absolute;
  left: 0;
  right: 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

  .logo {
    height: 40px;
  }

  .title {  
    font-family: @dv-f-geomanist;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    display: inline-block;
    vertical-align: 100%;
    height: 100%;
    font-size: 22px;
    color: @dv-c-foreground;
    padding-left: 96px;

    .subtitle {
      height: 100%;
      font-size: 12px;
      color: saturate(@dv-c-foreground, -20%);
      line-height: 0.5em;
      letter-spacing: 0.51em;
    }

    &::before {
      content: "AAV";
      letter-spacing: -0.3em;
      padding-right: 24px;
      font-size: 58px;
      position: absolute;
      bottom: -6px;
      left: 24px;
    }
  }


}

.headfix {
  height: 40px;
  padding: 8px;
}

</style>
