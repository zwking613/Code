<template>
  <div id="container">
    <el-aside :collapsed="isCollapse" :width="!isCollapse ? '220px':'70px'" >
      <LayoutMenu></LayoutMenu>
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader></LayoutHeader>
      </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
<!--      <el-footer>-->
<!--        <LayoutFooter></LayoutFooter>-->
<!--      </el-footer>-->
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import {storeToRefs} from 'pinia'
import LayoutMenu from './components/Menu/index.vue';
import LayoutHeader from './components/Header/index.vue';
// import LayoutTabs from './components/Tabs/index.vue';
// import LayoutFooter from './components/Footer/index.vue';
import useMenuStore from '@stores/modules/menu'
const menuStore = useMenuStore()
const {isCollapse} =storeToRefs(menuStore)
const router = useRouter();

console.log(router)
const listeningWindow = () => {
  window.onresize = () => {
    let screenWidth = document.body.clientWidth;
    console.log(screenWidth)
    // if (!isCollapse && screenWidth < 1200) store.dispatch('updateCollapse', true);
    // if (!isCollapse && screenWidth > 1200) store.dispatch('updateCollapse', false);
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
    & ::-webkit-scrollbar {
      background-color:@bg-color;
    }
    & ::-webkit-scrollbar-thumb {
      background-color: #41444b;
    }
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
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      }
  }
}
//overflow-x: hidden;

</style>
