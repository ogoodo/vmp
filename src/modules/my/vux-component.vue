<template>
  <div>
    <group>
      <cell title="title cxb" value="value cxb"></cell>
    </group>
    <tab :animate="false">
      <tab-item selected>已发货</tab-item>
      <tab-item>未发货</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <img src="./bd_logo1.png">
    <x-button type="primary" action-type="button" @click.native="btnClick">按 钮</x-button>
    <x-dialog v-model="show" class="dialog-demo">
      <p class="dialog-title">I'm a bg scroll Dialog.</p>
      <div class="img-box">
        <img style="max-width:100%">
      </div>
      <span class="vux-close" @click="show=false">关闭</span>
    </x-dialog>
  </div>
</template>

<script>
import { Group, Cell, Tab, TabItem, XButton, XDialog } from 'vux'

export default {
  data () {
    return {
      show: false,
      showNoScroll: false,
      showHideOnBlur: false
    }
  },
  methods: {
    btnClick: function () {
      this.show = !this.show
      // window.alert('hi')
    }
  },
  components: {
    Group,
    Cell,
    Tab,
    TabItem,
    XButton,
    XDialog
  }
}
</script>
