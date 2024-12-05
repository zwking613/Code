<template>
  <el-container class="error-page">
    <el-header>
      <h1>500 Internal Server Error</h1>
    </el-header>
    <el-main>
      <el-card>
        <h2>抱歉，服务器发生错误，请稍后再试。</h2>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/');
    };

    return {
      goHome,
    };
  },
});
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>