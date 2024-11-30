<template>
  <div id="crumbs" class="bg-white border-t border border-solid border-gray-200 p-4 flex items-center overflow-x-auto">
    <el-tag @close="close(tag)" @click="handleClick(tag)" class="tag cursor-pointer px-2 mr-2" v-for="tag in crumbsList" :key="tag.path" closable type="primary">
      {{ tag.meta?.title }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import useMenuStore from "@modules/menu";
import {menuStateType} from '@stores/interface/menu.ts'
import { useRouter } from "vue-router";
const router = useRouter();
const menuStore = useMenuStore()
const {crumbsList}  = storeToRefs(menuStore);
const handleClick = (tag:any) =>{
  router.push(tag.path);
  menuStore.$patch((state:menuStateType) => {
    state.defaultActive=tag.path
    state.defaultOpeneds=tag.keyPath
  })
}
const close = (tag:any) =>{
  if(crumbsList.value.length  === 1){
    menuStore.$patch((state:menuStateType) => {
      state.defaultActive='/dashboard'
      state.defaultOpeneds=['/dashboard']
      state.crumbsList=[{
        keyPath:['/dashboard'],
        meta: {requiresAuth: true, icon: 'home', title: '首页'},
        name: "/dashboard",
        path: "/dashboard"
      }]
    })
    router.push('/dashboard');
    return
  }
  // const filter
  let index = crumbsList.value.findIndex((obj:any) => obj.path === tag.path)
  let data = crumbsList.value[index-1] || crumbsList.value[index+1]

  menuStore.$patch((state:menuStateType) => {
    state.defaultActive=data.path
    state.defaultOpeneds=data.keyPath
    state.crumbsList=crumbsList.value.filter((item:any) => item.path !== tag.path)
  })
  router.push(data.path);
}
</script>
<style lang="less" scoped>
</style>
