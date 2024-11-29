<script setup lang="ts">
import welcome from '@assets/images/welcome.png'
</script>

<template>
  <div id="dashboard">
    <img width="100%" :src="welcome">
  </div>
</template>

<style scoped lang="less">
#dashboard {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 78%;
    }
}
</style>