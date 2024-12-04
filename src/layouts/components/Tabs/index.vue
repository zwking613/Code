<template>
  <div class="overflow-x-auto overflow-y-hidden flex items-center p-2 bg-white shadow-sm border-solid border-[#dcdfe6] border-t">
    <div v-for="tag in visitedTags" :key="tag.path" @click="goToTag(tag)"
      class="flex items-center h-[26px] leading-[26px] mx-[2px] px-[10px] cursor-pointer border-[1px] border-solid border-[#dcdfe6]"
      :class="[
        isActive(tag)
          ? 'bg-[#409EFF] text-white'
          : 'text-[#666] hover:text-[#409EFF]'
      ]">
      <span v-if=" isActive(tag)" class="block w-[6px] h-[6px] bg-[#f8f8f8] rounded-full mr-[8px]"></span>
      <span class="text-[12px]">{{ tag.meta?.title }}</span>
      <el-icon size="12px" v-if="tag.path !== webConfig.PATH" class="ml-[3px] h-[6px] w-[6px]" :class="[
        isActive(tag)
          ? 'text-white hover:bg-white/20'
          : 'text-[#666] hover:text-[#409EFF]'
      ]" @click.stop="closeTag(tag)">
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {getKeyPath} from '@utils/utils'
// import routerList from '@router/routes'
import useMenuStore from '@modules/menu'
import {menuStateType} from '@stores/interface/menu'
import type { RouteLocationNormalized } from 'vue-router'
import webConfig from '@/config/webConfig'

interface TagItem {
  path: string
  meta?: {
    title?: string
    icon?: string
  }
}

const menuStore = useMenuStore()
const route = useRoute()
const router = useRouter()
// 初始化首页标签
const visitedTags = ref<TagItem[]>([
  {
    path: webConfig.PATH,
    meta: { title: '首页' }
  }
])

const isActive = (tag: TagItem) => {
  return tag.path === route.path
}

const addTag = (route: RouteLocationNormalized) => {
  if (!route.meta?.title) return
  const isExist = visitedTags.value.some(tag => tag.path === route.path)
  if (!isExist) {
    visitedTags.value.push({
      path: route.path,
      meta: {
        title: route.meta.title as string,
      }
    })
  }
}

const closeTag = (tag: TagItem) => {
  if (tag.path === webConfig.PATH) return

  const index = visitedTags.value.findIndex(v => v.path === tag.path)
  visitedTags.value.splice(index, 1)

  if (isActive(tag)) {
    const nextTag = visitedTags.value[index] || visitedTags.value[index - 1]
    if (nextTag) {
      router.push(nextTag.path)
    }
  }
}

const goToTag = (tag: TagItem) => {
console.log(route)
  if (tag.path === route.path) return;
  const pathKey:string [] = getKeyPath(route.matched,tag.path)
  router.push({path:tag.path})
  menuStore.$patch((state:menuStateType)=>{
    state.defaultActive = tag.path
    state.defaultOpeneds= pathKey
  })
}

watch(
  () => route.path,
  () => {
    if (route.meta?.title) {
      addTag(route)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.el-icon {
  border-radius: 50%;
  transition: all 0.2s;
}

.el-icon:hover {
  transform: scale(1.2);
}
</style>