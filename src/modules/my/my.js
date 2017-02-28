// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MyApp from './MyApp'
// import VXX from './vux-component.vue'

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
