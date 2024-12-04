<template>
  <template v-for="route in menuList" :key="route.path">
    <!-- 有子菜单的情况 -->
    <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
      <template #title>
        <el-icon v-if="route.meta && route.meta.icon">
          <component :is="route.meta.icon" />
        </el-icon>
        <span class="flex justify-between items-center font-semibold leading-5 va-sidebar__title va-sidebar-item-title">
          {{ route.meta?.title }}
        </span>
      </template>
      <!-- 递归调用自身处理子菜单 -->
      <MenuItem :menuList="route.children" />
    </el-sub-menu>
    <!-- 没有子菜单的情况 -->
    <el-menu-item v-else :index="route.path">
      <el-icon v-if="route.meta && route.meta.icon">
        <component :is="route.meta.icon" />
      </el-icon>
      <span class="flex justify-between items-center font-semibold leading-5 va-sidebar__title va-sidebar-item-title">
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