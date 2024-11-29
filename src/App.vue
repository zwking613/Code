<template>
  <div id="App">
    <!-- 路由出口 -->
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import config from '@config/webConfig'
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
  // useTheme()
})
</script>
<style lang="less" scoped>
#App{
  width: 100vw;
  height: 100vh;
  background:#F3F4FA;
}
</style>
