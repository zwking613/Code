<template>
  <div>
    <!-- 路由出口 -->
    <RouterView />
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  document.title = 'vue3'
})
</script>
<style scoped>

</style>
