<!--
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-11-29 08:47:22
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-06 11:39:51
 * @FilePath: \vue_admin\src\layouts\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="header" class="pr-4 pl-4 bg-white h-[60px] flex justify-between items-center overflow-x-auto overflow-y-hidden">  
      <div class="flex flex-auto items-center h-9 rounded-lg cursor-pointer" >
        <el-icon size="20" color="#606060"  @click="setCollapse" >
          <Fold v-if="!isCollapse"/><Expand v-else/>
        </el-icon>
        <Breadcrumb class="ml-4"/>
      </div>
      <div class="flex width-[120px] items-center">
        <svg-icon class="mr-4 cursor-pointer" :icon-class="!fullScreen ? 'ALFullScreen':'ALNarrow'"  @click="handleFullScreen"/>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar
              :src="userInfo.avatar"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personal_center">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import useMenuStore from '@stores/modules/menu'
import screenfull from 'screenfull'
import useAppStore from "@modules/app";
import Breadcrumb from "./Breadcrumb.vue";
import {useRouter} from "vue-router";
const menuStore = useMenuStore()
const {isCollapse} = storeToRefs(menuStore)
const { setCollapse } = defineProps<{setCollapse: ()=>void}>() 
const router = useRouter()
const appStore = useAppStore()
const { logout,userInfo } =appStore


const fullScreen = ref<boolean>(screenfull.isFullscreen)

const handleFullScreen = () => {
  if (!screenfull.isEnabled) ElMessage.warning("当前您的浏览器不支持全屏 ❌");
  screenfull.toggle();
};

const handleCommand = (command:string)=>{
   switch (command) {
     case "logout":
       logout()
       break;
     case "personal_center":
        router.push({path:'/personal_center'})

       break;
   }
}

onMounted(() => {
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) fullScreen.value = true;
    else fullScreen.value = false;
    return () => screenfull.off("change", () => {
    });
  });
})

</script>
