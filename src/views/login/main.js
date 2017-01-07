// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import * as filters from 'filters'
import App from './App'
import 'assets/css/base.css'
import 'assets/css/login.css'

Vue.config.devtools = true

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
