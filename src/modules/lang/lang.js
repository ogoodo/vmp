// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './lang-set.js'
import MyApp from './MyLang'
import { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#myapp',
  template: '<MyApp/>',
  components: { MyApp }
})
