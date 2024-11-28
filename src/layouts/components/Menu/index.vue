<template>
  <div id="menu">
    <div class="logo-box">
      <img :src="logo" alt="logo" class="logo-img"/>
      <h2 class="logo-text" v-if="!isCollapse">Hooks Admin</h2>
    </div>
    <!--          :default-active=""-->

      <el-menu
          :default-openeds="[]"
          @open-change="onOpenChange"
          active-text-color="#ffffffa6"
          background-color="@bg-color"
          text-color="#ffffff"
          @select="clickMenu"
          :collapse="isCollapse"
      >
        <template v-for="item in menuList" :key="item.path">
          <el-menu-item v-if="!item.children" :index="item.path">
            <component size="25" :is="item.meta.icon" />
            <span class="menu_title">{{ item.meta.title }}</span>
          </el-menu-item>
          <el-sub-menu v-else :index="item.path">
            <template #title>
              <component size="25" :is="item.meta.icon" />
              <span class="menu_title">{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
              <component size="25" :is="child.meta.icon" />
              <span class="menu_title">{{ child.meta.title }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import logo from "@/assets/images/logo.png";
import useMenuStore from '@stores/modules/menu'
const menuStore = useMenuStore()
const {isCollapse} =storeToRefs(menuStore)
const menuList = reactive([
  {
    // 首页
    path: '/home',
    name:'Layout',
    meta:{
      title: '首页',
      icon: 'Basketball',
      requiresAuth:true,
    },
    children: [{
      path: "/home/index",
      name:'Home',
      meta: {
        requiresAuth: true,
        icon: 'Basketball',
        title: "首页",
      }
    }]
  },
  {
    // 登录
    path: '/login123',
    name:'Login',
    meta:{
      title: '登录',
      icon: 'Basketball',
      requiresAuth:false
    },
  }
])
const clickMenu = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const onOpenChange = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style lang="less" scoped>
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
    border-bottom: 1px solid #010b14;

    .logo-img {
      width: 30px;
      margin: 0;
    }

    .logo-text {
      margin: 0 0 0 10px;
      font-size: 24px;
      font-weight: bold;
      color: #dadada;
      white-space: nowrap;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 220px;
      overflow-x: hidden;
      overflow-y: auto;
  }

  .el-menu {
    border: none;
    .el-menu-item.is-active {
      background-color: #409EFF !important;
    }
    .menu_title{
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
