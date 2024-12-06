<template>
  <div
    class="flex justify-between items-center w-full bg-white border-solid pl-2 pr-2 border-[#dcdfe6] border-t shadow-sm">
    <div class="flex overflow-x-hidden overflow-y-hidden flex-1 items-center pt-2 pb-2" @wheel="handleScroll"
      ref="scrollContainer">
      <div v-for="tag in visitedTags" :key="tag.path" @click="(event) => goToTag(tag, event)"
        class="tag-item w-30 flex items-center justify-center h-[30px] leading-[30px] mx-[2px] px-[10px] cursor-pointer border-[1px] border-solid border-[#dcdfe6] rounded box-border "
        :class="[isActive(tag) ? 'bg-[#409EFF] text-white' : 'text-[#666] hover:text-[#409EFF] hover:bg-[#f0f9ff]']">
        <span v-if="isActive(tag)&&tag.path!==webConfig.PATH" class="block w-[6px] h-[6px] bg-[#f8f8f8] rounded-full mr-[8px]"></span>
        <span class="min-w-[50px] text-[12px] text-center overflow-hidden whitespace-nowrap flex items-center">
          <el-icon size="14" style="margin-right: 2px;" v-if="tag.path === webConfig.PATH" :icon="tag.meta?.icon">
            <HomeFilled />
          </el-icon>
          {{ tag.meta?.title}}
        </span>
        <el-icon size="15" v-if="tag.path !== webConfig.PATH" class="ml-[3px] h-[12px] w-[12px]"
          :class="[isActive(tag) ? 'text-white hover:bg-white/20' : 'text-[#666] hover:text-[#409EFF]']"
          @click.stop="closeTag(tag)">
          <Close />
        </el-icon>
      </div>
    </div>

    <div class="w-16 flex items-center justify-center h-[30px] leading-[30px]">
      <el-dropdown class="" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <div
            class="flex w-full items-center bg-[#409EFF] text-white justify-center h-[30px] leading-[30px] mx-[2px] px-[10px] cursor-pointer border-[1px] border-solid border-[#dcdfe6] rounded">
            <span class="text-[12px] text-center">更多</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Current">关闭当前</el-dropdown-item>
            <el-dropdown-item divided command="Other">关闭其他</el-dropdown-item>
            <el-dropdown-item divided command="All">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getKeyPath } from '@utils/utils'
import useMenuStore from '@modules/menu'
import { menuStateType } from '@stores/interface/menu'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
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

const scrollContainer = ref<HTMLElement | null>(null)
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
  if (!route.meta?.title) return;

  const isExist = visitedTags.value.some(tag => tag.path === route.path);

  if (!isExist) {
    // 添加新标签
    visitedTags.value.push({
      path: route.path,
      meta: {
        title: route.meta.title as string,
      }
    });

    nextTick(() => {
      // 滚动到新标签
      if (scrollContainer.value) {
        const tagItems = scrollContainer.value.querySelectorAll('.tag-item');
        const newTag = tagItems[tagItems.length - 1]; // 获取最后一个标签
        if (newTag) {
          newTag.scrollIntoView({ behavior: 'smooth', inline: 'end' }); // 滚动到新标签
        }
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

const goToTag = (tag: TagItem, event?: MouseEvent) => {
  if (tag.path === route.path) return
  const pathKey: string[] = getKeyPath(route.matched as RouteRecordRaw[], tag.path)
  router.push({ path: tag.path })
  menuStore.$patch((state: menuStateType) => {
    state.defaultActive = tag.path
    state.defaultOpeneds = tag.path === webConfig.PATH ? [] : pathKey
  })
  nextTick(() => {
    // 滚动到新标签
    if (event?.target) {
      (event.target as HTMLElement).scrollIntoView();
    }
  })
}

const handleCommand = (com: string) => {
  switch (com) {
    case 'Current':
      const currentRoute = (visitedTags.value.find(v => v.path === route.path) as TagItem)
      closeTag(currentRoute)
      break;
    case 'Other':
      console.log(route.path)
      const other = visitedTags.value.find(item => item.path === route.path) as TagItem
      visitedTags.value = [
        {
          path: webConfig.PATH,
          meta: { title: '首页' }
        },
        other
      ]
      goToTag(other)
      break;
    case 'All':
      visitedTags.value = [{
        path: webConfig.PATH,
        meta: { title: '首页' }
      }]
      router.push({ path: webConfig.PATH })
      break;
  }
}

const handleScroll = (event: WheelEvent) => {
  event.preventDefault();
  const scrollContainer = event.currentTarget as HTMLElement;
  scrollContainer.scrollLeft += event.deltaY;
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