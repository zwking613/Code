<template>
  <div class="flex items-center justify-center h-full bg-gradient-to-r from-blue-200 to-purple-300">
    <el-card class="welcome-card shadow-lg rounded-lg p-8">
      <h2 class="welcome-title text-2xl font-bold text-gray-800 mb-4">欢迎来到 ROBOT 系统</h2>
      <el-divider></el-divider>
      <p class="welcome-message text-gray-700 mb-2">
        ROBOT 系统是一个高效、智能的管理平台，旨在为用户提供便捷的操作体验和强大的功能支持。
      </p>
      <p class="welcome-message text-gray-700 mb-4">
        主要功能包括：
      </p>
      <ul class="feature-list list-disc list-inside mb-4 text-left list-none">
        <li class="text-gray-800">📊 <strong>系统监控</strong>：实时监控系统状态，确保系统稳定运行。</li>
        <li class="text-gray-800">🛠️ <strong>系统工具</strong>：提供多种工具以支持日常操作和维护。</li>
        <li class="text-gray-800">🔧 <strong>系统管理</strong>：全面管理用户、权限和系统设置。</li>
      </ul>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Welcome',
  setup() {
    const router = useRouter();

    const navigateToDashboard = () => {
      router.push('/dashboard'); // 跳转到仪表盘页面
    };

    return {
      navigateToDashboard
    };
  }
});
</script>

<style scoped>
.welcome-card {
  @apply bg-white;
}
</style>