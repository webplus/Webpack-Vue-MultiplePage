<template>
  <div id="app">login
  </div>
</template>

<script>
import common from 'utils/common'
export default {
  name: 'app',
  created () {
    common.setStorage('aaa', 'dfdfdfd')
    console.log(common.getStorage('aaa'))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
