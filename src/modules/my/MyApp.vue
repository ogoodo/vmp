<template>
  <div id="myapp">
    <VXX/>
    <img src="../../assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from '../../components/MyHello'
import VXX from './vux-component.vue'

// 移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

export default {
  name: 'myapp',
  components: {
    Hello,
    VXX
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
@import './reset.less';
</style>
