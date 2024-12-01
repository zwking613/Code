<template>
  <div id="menu">
    <div class="logo-box">
      <img :src="logo" alt="logo" class="logo-img" @click="gotoHome"/>
      <h2 class="logo-text" v-if="!isCollapse">ROBOT</h2>
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
      <template v-for="route in menuList">
        <el-sub-menu v-if="route.children && route.children.length" :key="route.path"  :index="route.path">
          <template #title>
            <el-icon v-if="route.meta && route.meta.icon">
              <component :is="route.meta.icon" />
            </el-icon>
            <span>{{ route.meta?.title }}</span>
          </template>
          <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">
            <el-icon v-if="child.meta && child.meta.icon">
              <component :is="child.meta.icon" />
            </el-icon>
            <span>{{ child.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="route.path" :key="route.path +'index'">
          <el-icon v-if="route.meta && route.meta.icon">
            <component :is="route.meta.icon" />
          </el-icon>
          <span>{{ route.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router'
import useMenuStore from '@stores/modules/menu'
import logo from "@/assets/images/logo.png";
import { getKeyPath, handleRouter } from "@utils/utils.ts";
import {menuStateType} from '@stores/interface/menu.ts'
const menuStore = useMenuStore()
const {isCollapse,defaultActive,defaultOpeneds,menuList,crumbsList} = storeToRefs(menuStore)
const router = useRouter()
const clickMenu = (key: string, keyPath: string[]) => {
  if(crumbsList.value.findIndex((obj:any)=>obj.path === key)===-1){
    const data = handleRouter(menuList.value,key, keyPath)
    menuStore.$patch((state:menuStateType) => {
      state.defaultActive=key
      state.defaultOpeneds=keyPath
      state.crumbsList=crumbsList.value.concat([data])
    })
  }
  router.push(key)
}
const getRouter=(params?:string)=>{
  const key = params|| router.options.history.location;
  let keyPath = getKeyPath(menuList.value,key)
  const data = handleRouter(menuList.value,key, keyPath)
  menuStore.$patch((state:menuStateType) => {
    state.defaultActive=key
    state.defaultOpeneds=keyPath
    state.crumbsList=crumbsList.value.concat([data])
  })
}
const gotoHome=()=>{
  if(crumbsList.value.findIndex((obj:any)=>obj.path === '/dashboard')===-1){
    router.push('/dashboard')
    getRouter('/dashboard')
  }

}

onMounted(()=>{
  getRouter()
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
      cursor: pointer;
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