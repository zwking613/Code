<template>
  <div id="crumbs">
    <el-tag @close="close" @click="handleClick" class="tag" v-for="tag in crumbsList" :key="tag.name" closable :type="tag.type">
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<script lang="ts" setup>
import {storeToRefs} from "pinia";
import useMenuStore from "@modules/menu";
const menuStore = useMenuStore()
const {defaultActive,crumbsList}  = storeToRefs(menuStore);
console.log(defaultActive)

const handleClick = () =>{
  console.log(123)
}
const close = () =>{
  console.log(123)
}
</script>
<style lang="less" scoped>
#crumbs{
  height: 50px;
  max-height: 50px;
  line-height: 50px;
  background-color: #ffffff;
  border-top: 1px solid #ebebeb;
  padding: 0 15px;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  .tag{
    cursor:pointer;
    padding: 0 10px;
    margin-right: 5px;
    background-color: #ffffff;
    color: #000000;
  }
}
</style>