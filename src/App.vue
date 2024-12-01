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
  }, 100) // 根据实际需要调整延时
})
</script>
<style lang="less" scoped>
</style>
