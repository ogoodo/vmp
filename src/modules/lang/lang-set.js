import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import lang from './lang.json'

// 从服务器更新语言: https://github.com/dkfbasel/vuex-i18n/blob/master/test/index.html

// console.log(lang)
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})
Vue.use(vuexI18n.plugin, store)

// const translationsEn = {
//   'button_text_test': 'en-close{type}'
// }
// // translations can be kept in separate files for each language
// // i.e. resources/i18n/de.json.
// const translationsCn = {
//   'My nice title': 'Ein schöner Titel',
//   'button_text_test': '中文-关闭{type}'
// }
// // add translations directly to the application
// Vue.i18n.add('en', translationsEn)
// Vue.i18n.add('cn', translationsCn)

Vue.i18n.add('en', lang['en'])
Vue.i18n.add('zh-CN', lang['zh-CN'])

console.log('$i18n.locale():', Vue.i18n.locale())
// set the start locale to use
window.__lang__ = 'en'
// Vue.i18n.set('zh-CN')
Vue.i18n.set(window.__lang__)
// Vue.i18n.fallback(window.__lang__);
console.log('$i18n.locale():', Vue.i18n.locale())

