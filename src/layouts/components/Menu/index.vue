<template>
  <div id="menu">
    <div class="logo-box">
      <img :src="logo" alt="logo" class="logo-img"/>
      <h2 class="logo-text" v-if="!isCollapse">Hooks Admin</h2>
    </div>
    <el-menu
        active-text-color="#FBFFFF"
        text-color="#586FC7"
        background-color="#ffffff"
        :collapse="isCollapse"
        :unique-opened="true"
        @select="clickMenu"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
    >
      <el-menu-item index="/dashboard">
        <el-icon>
          <document/>
        </el-icon>
        <template #title>dashboard</template>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="/user">user</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/home">
        <el-icon>
          <document/>
        </el-icon>
        <template #title>Home</template>
      </el-menu-item>
      <el-menu-item index="/test">
        <el-icon>
          <document/>
        </el-icon>
        <template #title>Test</template>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon>
          <setting/>
        </el-icon>
        <template #title>About</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router'
import useMenuStore from '@stores/modules/menu'
import logo from "@/assets/images/logo.png";

const menuStore = useMenuStore()
const {isCollapse,defaultActive,defaultOpeneds} = storeToRefs(menuStore)
const router = useRouter()
const clickMenu = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push(key)
  menuStore.defaultActive = key;
  menuStore.defaultOpeneds = keyPath;
}

onMounted(()=>{
  menuStore.defaultActive = router.options.history.location;
})
</script>

<style lang="less">
#menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;

    .logo-img {
      width: 30px;
      margin: 0;
    }

    .logo-text {
      margin: 0 0 0 10px;
      font-size: 24px;
      font-weight: bold;
      color: #1A54B0;
      white-space: nowrap;
    }
  }

  .el-menu {
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>