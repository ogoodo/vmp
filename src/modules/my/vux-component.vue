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
  </div>
</template>

<script>
import { Group, Cell, Tab, TabItem } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Tab,
    TabItem
  }
}
</script>
