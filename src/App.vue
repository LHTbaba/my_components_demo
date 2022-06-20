<template>
  <div id="app">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  ::-webkit-scrollbar{
    width:6px;height:6px;
    background-color: #7c777740;
  }
  ::-webkit-scrollbar-thumb{
    background-color:rgb(168, 163, 163);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track{
    background-color:transparent;
  }
}
</style>
