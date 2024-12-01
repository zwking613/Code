<template>
  <div>
    <div class="user-info-head" >
      <img :src="avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" /></div>
  </div>
</template>

<script setup lang="ts">
const {avatar} = defineProps<{avatar:string}>()
</script>
<style scoped lang="less">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
