<template>
  <div class="icon-body">
    <el-input v-model="iconName" class="icon-search" clearable placeholder="请输入图标名称" @clear="filterIcons" @input="filterIcons">
    </el-input>
    <div class="icon-list">
      <div class="list-container">
        <div v-for="(item, index) in iconList" class="icon-item-wrapper" :key="index" @click="handleSelect(item)">
          <div :class="['icon-item']">
            <svg-icon :class="[ activeName === item ? 'active' : '' ]" :icon-class="item" style="height: 25px;width: 16px;"/>
            <span :class="[ activeName === item ? 'active' : '' ]">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import icons from './requireIcons'
const { activeName } = defineProps<{activeName: string}>()
console.log(activeName)
const iconName = ref('')
const iconList = ref(icons)
const emit = defineEmits(['select'])
const handleSelect = (name: string) => {
  emit('select', name)
}
const filterIcons = (e: string) => {
  iconList.value = icons.filter(icon => icon.includes((e)))
}
</script>
<style scoped lang="less">
    .icon-body {
    width: 100%;
    padding: 10px;
    .icon-search {
      position: relative;
      margin-bottom: 5px;
    }
    .icon-list {
      width: 100%;
      height: 200px;
      overflow: auto;
      .list-container {
        display: flex;
        flex-wrap: wrap;
        .icon-item-wrapper {
          width: calc(100% / 3);
          height: 25px;
          line-height: 25px;
          cursor: pointer;
          display: flex;
          .icon-item {
            display: flex;
            max-width: 100%;
            height: 100%;
            padding: 0 5px;
            &:hover {
              background: #ececec;
              border-radius: 5px;
            }
            .icon {
              flex-shrink: 0;
            }
            span {
              display: inline-block;
              vertical-align: -0.15em;
              fill: currentColor;
              padding-left: 2px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .icon-item .active {
            color: #256863 !important;
          }
        }
      }
    }
  }
</style>
