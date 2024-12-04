<template>
  <div id="App" class="w-screen h-screen bg-[#F3F4FA]">
    <RouterView></RouterView>
  </div>
</template>
<script setup lang="ts">
import config from '@config/webConfig'
import { useLoadingStore } from '@modules/loading.ts'
import useAppStore from '@stores/modules/app'
const loadingStore = useLoadingStore()
const appStore = useAppStore()
const initWeb = async () => {
  // 设置网站标题和图标
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
  appStore.getUserInfo()
}

onMounted(async () => {
  await initWeb()
  document.documentElement.setAttribute('data-theme', 'light')
  setTimeout(() => {
    loadingStore.hideLoading()
  }, 1000)
})
</script>
<style lang="less" scoped>
</style>
