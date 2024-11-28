<template>
  <div>
    <!-- 路由出口 -->
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import config from '@config/webConfig'
onMounted(() => {
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
})
</script>
<style scoped>

</style>
