<!--
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-12-02 08:53:20
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-04 11:06:54
 * @FilePath: \vue_admin\src\views\user\components\UserAvatar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
