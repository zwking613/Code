<template>
  <div id="header" class="bg-white pl-4 pr-4">
    <el-header class="h-[60px] flex justify-between items-center overflow-x-auto overflow-y-hidden">
      <div class="cursor-pointer w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center" >
        <el-icon size="25" color="#606060" v-if="!isCollapse" @click="setCollapse" >
          <Fold/>
        </el-icon>
        <el-icon size="25" color="#606060" v-else @click="setCollapse" >
          <Expand/>
        </el-icon>
      </div>
      <div class="flex items-center">
        <el-icon size="25" v-if="!fullScreen" @click="handleFullScreen" color="#606060" class="cursor-pointer mr-4">
          <ALFullScreen/>
        </el-icon>
        <el-icon size="25" v-else @click="handleFullScreen" color="#606060" class="cursor-pointer mr-4">
          <ALNarrow/>
        </el-icon>
        <el-dropdown>
          <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <template #dropdown>
            <el-dropdown-menu @click="dropdownClick">
              <el-dropdown-item>退出</el-dropdown-item>
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
import screenfull from 'screenfull'
import {menuStateType} from "@stores/interface/menu.ts";

const menuStore = useMenuStore()
const router = useRouter()
const {isCollapse} = storeToRefs(menuStore)
const fullScreen = ref<boolean>(screenfull.isFullscreen)

const setCollapse = () => {
  menuStore.$patch((state: menuStateType) => {
    state.isCollapse = !isCollapse.value
  }) // 修改多个
}
const dropdownClick = () => {
  menuStore.$reset()
  router.push('/login')
}
const handleFullScreen = () => {
  if (!screenfull.isEnabled) ElMessage.warning("当前您的浏览器不支持全屏 ❌");
  screenfull.toggle();
};
onMounted(() => {
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) fullScreen.value = true;
    else fullScreen.value = false;
    return () => screenfull.off("change", () => {
    });
  });
})

</script>
