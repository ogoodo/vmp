<template>
  <div id="myapp">
    <div>测试多语言</div>
    <div>当前语言:{{ $i18n.locale() }}</div>
    <x-button type="primary" action-type="button" @click.native="changeLangCn">切换中文语言</x-button>
    <x-button type="primary" action-type="button" @click.native="changeLangEn">切换英文语言</x-button>
    <div>{{$t('button_text_test', {'type': '参数'})}}</div>
  </div>
</template>

<!--<i18n>
button_text_test:
  en: OK
  zh-CN: 确定
</i18n>-->

<script>
  // import Vue from 'vue'
  import { XButton } from 'vux'
  export default {
    name: 'myapp',
    data () {
      return {
        currentLang: 'en'
      }
    },
    methods: {
      changeLangCn: function () {
        const self = this
        this.$vux.confirm.show({
          // 组件除show外的属性
          title: 'title',
          content: 'Content',
          onCancel () {},
          onConfirm () {
            self.$i18n.set('zh-CN')
          }
        })
      },
      changeLangEn: function () {
        this.$i18n.set('en')
      }
    },
    components: {
      XButton
    }
  }
</script>

<style>
#myapp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="less">
@import '../../styles/theme.less';
</style>
