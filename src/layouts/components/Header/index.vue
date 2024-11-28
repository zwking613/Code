<template>
  <div id="header">
    <el-header>
      <div class="left">
        <el-icon size="25" @click="setCollapse" v-if="!isCollapse"><Fold /></el-icon>
        <el-icon size="25" @click="setCollapse" v-else><Expand /></el-icon>
      </div>
      <div class="right">right</div>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import useMenuStore from '@stores/modules/menu'
import {menuStateType} from "@stores/interface/menu.ts";
const menuStore = useMenuStore()
const {isCollapse} =storeToRefs(menuStore)
console.log(isCollapse)
const setCollapse =()=>{
  menuStore.$patch((state:menuStateType)=>{state.isCollapse = !isCollapse.value}) // 修改多个
}

</script>
<style lang="less" scoped>

#header{
background: #ffffff;
  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      padding-left: 15px;
      cursor: pointer;
    }
  }
}
</style>