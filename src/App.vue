<template>
  <div id="app">
    <div class="head">
      <!-- <img src="https://divinitor.com/resources/img/dv-logo.png" class="logo"/> -->
      <div class="title">Divinitor DN | ACT Action Viewer</div>
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
  width: 100%; 
  height: 40px;
  padding: 8px 16px;
  font-size: 40px;
  background-color: #F8F8FF;
  position: fixed;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

  .logo {
    height: 40px;
  }

  .title {  
    font-family: @dv-f-geomanist;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    display: inline-block;
    vertical-align: 50%;
    height: 100%;
    font-size: 20px;
    color: @dv-c-foreground;
  }
}

.headfix {
  height: 40px;
  padding: 8px;
}

</style>
