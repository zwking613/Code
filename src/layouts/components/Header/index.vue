<template>
  <div id="header">
    <el-header>
      <div class="left">
        <el-icon size="25" color="#606060" @click="setCollapse" v-if="!isCollapse"><Fold /></el-icon>
        <el-icon size="25" color="#606060" @click="setCollapse" v-else><Expand /></el-icon>
      </div>
      <div class="right">

        <el-dropdown>
          <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <template #dropdown>
            <el-dropdown-menu @click="dropdownClick">
              <el-dropdown-item>退出</el-dropdown-item>
<!--              <el-dropdown-item>Action 2</el-dropdown-item>-->
<!--              <el-dropdown-item>Action 3</el-dropdown-item>-->
<!--              <el-dropdown-item>Action 4</el-dropdown-item>-->
<!--              <el-dropdown-item>Action 5</el-dropdown-item>-->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import useMenuStore from '@stores/modules/menu'
import {useRouter} from 'vue-router'
import {menuStateType} from "@stores/interface/menu.ts";
const menuStore = useMenuStore()
const router = useRouter()
const {isCollapse} =storeToRefs(menuStore)


const setCollapse = () => {
  menuStore.$patch((state:menuStateType)=>{state.isCollapse = !isCollapse.value}) // 修改多个
}
const dropdownClick = () => {
  router.push('/login')
}

</script>
<style lang="less" scoped>

#header{
background: #ffffff;
  padding: 0 15px;
  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left{
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      background-color: #F4F4F4;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>