<!--
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-11-27 17:02:48
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-04 11:07:34
 * @FilePath: \vue_admin\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="App" class="w-screen h-screen bg-[#F3F4FA]">
    <RouterView></RouterView>
  </div>
</template>
<script setup lang="ts">
import config from '@config/webConfig'
import { useLoadingStore } from '@modules/loading.ts'
const loadingStore = useLoadingStore()

const initWeb=()=>{
  document.title = config.name
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if (favicon) {
    favicon.href = config.icon;
  } else {
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.href = config.icon;
    document.head.appendChild(newFavicon);
  }
}
onMounted(() => {
  initWeb()
  setTimeout(() => {
    loadingStore.hideLoading()
  }, 1000) // 根据实际需要调整延时
})
</script>
<style lang="less" scoped>
</style>
