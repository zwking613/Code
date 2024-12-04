<template>
  <div id="container">
    <el-aside  :collapsed="isCollapse" class="aside" :width="!isCollapse ? '280px' : '64px'">
      <LayoutMenu :isCollapse="isCollapse"></LayoutMenu>
    </el-aside>
    <el-container>
      <el-header class="border-b border-solid border-[#e0e0e0]">
        <LayoutHeader :setCollapse="setCollapse"></LayoutHeader>
      </el-header>
      <LayoutTabs />
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>

    <!-- 遮罩层 -->
    <!-- <div data-overlay="overlay" v-if="isShowOverlay" class="overlay" @click.stop="hideAside">
      <el-aside class="aside" width="280px">
        <LayoutMenu class="width-280px" :isCollapse="false"></LayoutMenu>
      </el-aside>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useMenuStore from '@stores/modules/menu';
import LayoutMenu from './components/Menu/index.vue';
import LayoutHeader from './components/Header/index.vue';
import LayoutTabs from './components/Tabs/index.vue';

const menuStore = useMenuStore();
// const { isCollapse ,isShowOverlay} = storeToRefs(menuStore);
const { isCollapse } = storeToRefs(menuStore);
const isShowAside = ref(false);
const setCollapse = () => {
  if(window.innerWidth < 950){
     isShowAside.value = false;
    menuStore.$patch((state) => {
      state.isShowOverlay = !state.isShowOverlay;
    });
  }else{
     isShowAside.value = true;
    menuStore.$patch((state) => {
      state.isCollapse = !state.isCollapse;
    });
  };
};

// const hideAside = (event:MouseEvent) => {
//   if ((event.target as HTMLElement).dataset.overlay !== 'overlay') return;
//   isShowAside.value = false;
//   menuStore.$patch((state) => {
//     state.isCollapse = true;
//     state.isShowOverlay = false;  
//   });
   
// };

// 监听窗口大小变化
const handleResize = () => {
  
  if (window.innerWidth < 950) {
  isShowAside.value = false;
    menuStore.$patch((state) => {
      state.isCollapse = true; 
    });
  } else {
    isShowAside.value = true;
    menuStore.$patch((state) => {
      state.isCollapse = false; 
    });
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // 初始化时检查窗口大小
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="less" scoped>
#container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  .el-aside {
    background: @bg-color;
    // background-color: rgb(48, 65, 86);

    border-right: 1px solid #EBECF0;
    height: 100%;
    //padding: 0 10px;
    & ::-webkit-scrollbar {
      background-color: @bg-color;
    }

    & ::-webkit-scrollbar-thumb {
      background-color: #41444b;
    }
  }

  .aside {
    transition: all 0.4s ease-in-out;
  }

  .el-container {
    /* 防止 tabs 超出不收缩 */
    box-sizing: border-box;

    //overflow-x: hidden;
    .el-main {
      box-sizing: border-box;
      //padding: !important;
      //margin: 10px 13px;
      overflow: auto;
      //background-color: #F3F4FA;
      background: #F4F6F8;
      border-radius: 4px;
      //box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    }
  }

  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .page-fade-enter-from,
  .page-fade-leave-to {
    opacity: 0;
  }

  .overlay {
    position: fixed;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999; // 确保遮罩层在最上层
    transition: opacity 0.3s ease; // 添加动画效果
    opacity: 1;
  }

  .overlay.fade-out {
    opacity: 0; // 隐藏时的透明度
  }
}
</style>
