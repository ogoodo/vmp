// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MyApp from './MyApp'

// 移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// new Vue({
//   el: '#myapp',
//   template: '<VXX/>',
//   components: { VXX }
// })
/* eslint-disable no-new */
new Vue({
  el: '#myapp',
  template: '<MyApp/>',
  components: { MyApp }
})
