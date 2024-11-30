<template>
  <div class="loading">
    <div class="loading-spinner"></div>
    <div class="loading-text">loading......</div>
  </div>
</template>

<script setup>
// 这里可以添加你的逻辑
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes text-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  z-index: 9999;
}

.loading-spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

.loading-text {
  margin-top: 10px;
  animation: text-blink 1.5s infinite;
}
</style>
