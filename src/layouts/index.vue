<template>
  <div id="container">
    <el-aside :collapsed="isCollapse" class="aside" :width="!isCollapse ? '260px':'80px'" >
      <LayoutMenu></LayoutMenu>
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader></LayoutHeader>
      </el-header>
      <LayoutTabs/>
        <el-main>
          <RouterView></RouterView>
        </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import useMenuStore from '@stores/modules/menu'
import LayoutMenu from './components/Menu/index.vue';
import LayoutHeader from './components/Header/index.vue';
import LayoutTabs from './components/Tabs/index.vue';
const menuStore = useMenuStore()
const {isCollapse} =storeToRefs(menuStore)
const listeningWindow = () => {
  window.onresize = () => {
    let screenWidth = document.body.clientWidth;
    if (!isCollapse.value && screenWidth < 1200) {
      menuStore.isCollapse = true
    }
    if (isCollapse.value && screenWidth > 1200){
      menuStore.isCollapse = false
    }
  };
};

onMounted(() => {
  listeningWindow()
});
</script>

<style lang="less" scoped>
#container {
  display: flex;
  width: 100%;
  min-width: 850px;
  height: 100%;
  .el-aside {
    background:@bg-color;
    border-right: 1px solid #EBECF0;
    padding: 0 10px;
    & ::-webkit-scrollbar {
      background-color:@bg-color;
    }
    & ::-webkit-scrollbar-thumb {
      background-color: #41444b;
    }
  }
  .aside{
    transition: all 0.4s ease-in-out;
  }
  .el-container {
    /* 防止 tabs 超出不收缩 */
    box-sizing: border-box;
    //overflow-x: hidden;
    .el-main {
      box-sizing: border-box;
      padding: 20px;
      margin: 10px 13px;
      overflow: auto;
      background-color: #F3F4FA;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      }
  }
}
//overflow-x: hidden;

</style>
