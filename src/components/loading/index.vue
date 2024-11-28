<!-- Loading.vue -->
<template>
  <div class="loading">
    <!-- 这里是你的加载动画或文本 -->
    Loading...
  </div>
</template>

<script setup>
// 这里可以添加你的逻辑
</script>

<style scoped>
.loading {
  /* 这里是你的样式 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  z-index: 9999;
}
</style>
