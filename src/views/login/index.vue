<template>
  <div>
    <!-- 你的组件内容 -->
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import {loginApi} from "@api/modules/login.ts"
const login =async () => {
  await loginApi({username: "xz", password: "xz"})
};
</script>