<template>
  <template v-for="route in menuList" :key="route.path">
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
      <template #title>
        <!-- <el-icon v-if="route.meta && route.meta.icon">
          <component :is="route.meta.icon" />
        </el-icon> -->
        <svg-icon v-if="route.meta && route.meta.icon" :icon-class="route.meta.icon" class="w-[16px] h-[16px] mr-[8px]" />
        <span class="flex justify-between items-center leading-5">
          {{ route.meta?.title }}
        </span>
      </template>
      <!-- 递归调用自身处理子菜单 -->
      <MenuItem :menuList="route.children" />
    </el-sub-menu>
    <!-- 没有子菜单的情况 -->
    <el-menu-item v-else :index="route.path">
      <!-- <el-icon v-if="route.meta && route.meta.icon">
        <component :is="route.meta.icon" />
      </el-icon> -->
      <svg-icon v-if="route.meta && route.meta.icon" :icon-class="route.meta.icon" class="w-[16px] h-[16px] mr-[8px]" />
      <span class="">
        {{ route.meta?.title }}
      </span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { RouterType } from '@router/interface'

defineProps<{
  menuList: RouterType[]
}>()
</script> 