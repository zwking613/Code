<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item" :to="item.path == '/' ? item.path : undefined" >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>

const route = useRoute()
const breadcrumbList = ref<any[]>([])

// 生成面包屑数据
const getBreadcrumb = () => {
  const matched = route.matched.filter(item => item.meta && item.meta.title && item.path !=='/')
  breadcrumbList.value = matched.map(item => ({
    path: item.path,
    title: item.meta.title
  }))
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)

onMounted(() => {
  getBreadcrumb()
})
</script>