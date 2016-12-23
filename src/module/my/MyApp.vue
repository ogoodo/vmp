<template>
  <div id="myapp">
    <img src="../../assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from '../../components/MyHello'

export default {
  name: 'myapp',
  components: {
    Hello
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
