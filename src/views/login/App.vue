<template>
  <div id="app">login
  </div>
</template>

<script>
import { getStorage } from 'utils/common'
export default {
  name: 'app',
  created () {
    getStorage('aaa')
  }
}
</script>

<style>
body {
  color: #223e50;
}
</style>
