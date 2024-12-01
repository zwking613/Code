<template>
  <div class="loading-container">
    <div class="loading-content">
      <!-- 加载动画 -->
      <div class="loading-spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>

      <!-- 加载文字 -->
      <div class="loading-text">
        Loading
        <span class="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 逻辑部分保持不变
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(2px);
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
}

/* 加载动画样式 */
.loading-spinner {
  position: relative;
  width: 40px;
  height: 40px;
}

.circular {
  animation: rotate 2s linear infinite;
  transform-origin: center center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 4;
  stroke-linecap: round;
  stroke: #1850C5;
  animation: dash 1.5s ease-in-out infinite;
}

/* 文字样式 */
.loading-text {
  margin-top: 15px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}

.dots {
  display: inline-flex;
  margin-left: 2px;
}

.dots span {
  animation: dots 1.5s infinite;
  opacity: 0;
}

.dots span:nth-child(1) { animation-delay: 0s; }
.dots span:nth-child(2) { animation-delay: 0.3s; }
.dots span:nth-child(3) { animation-delay: 0.6s; }

/* 动画关键帧 */
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes dots {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>