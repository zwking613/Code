<template>
  <div id="menu" class="flex flex-col w-full h-full">
    <div class="w-full logo-box flex items-center justify-center h-[55px]">
      <svg-icon
        class="text-[30px] text-[#1A54B0] m-0 cursor-pointer"
        icon-class="logo"
        @click="gotoHome"
      />
      <h2
        :class="`${
          !isCollapse ? 'w-auto' : 'w-0'
        }  text-[24px] font-bold text-[#1A54B0] overflow-hidden transition-all duration-300`"
      >
        ROBOT
      </h2>
    </div>
    <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      @select="clickMenu"
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
    >
      <MenuItem :menuList="menuList" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { RouteRecordRaw, useRouter } from "vue-router";
import useMenuStore from "@stores/modules/menu";
import { getKeyPath, handleRouter } from "@utils/utils.ts";
import { menuStateType, RouterType } from "@stores/interface/menu.ts";
import MenuItem from "./MenuItem.vue";
const menuStore = useMenuStore();
const { defaultActive, defaultOpeneds, menuList, crumbsList } =storeToRefs(menuStore);
const { isCollapse } = defineProps<{ isCollapse: boolean }>();
const router = useRouter();
const clickMenu = (key: string, keyPath: string[]) => {
  if (crumbsList.value.findIndex((obj: any) => obj.path === key) === -1) {
    menuStore.$patch((state: menuStateType) => {
      state.defaultActive = key;
      state.defaultOpeneds = keyPath;
    });
  }
  router.push({path:key});
};

const getRouter = (params?: string) => {
  const key = params || router.options.history.location;
  let keyPath = getKeyPath(menuList.value as RouteRecordRaw[], key);
  const data = handleRouter(menuList.value as RouteRecordRaw[], key, keyPath);
  menuStore.$patch((state: menuStateType) => {
    state.defaultActive = key;
    state.defaultOpeneds = keyPath;
    state.crumbsList = crumbsList.value.concat([data]);
  });
};

const gotoHome = () => {
  if (
    crumbsList.value.findIndex((obj: any) => obj.path === "/dashboard") === -1
  ) {
    router.push({path:"/dashboard"});
    getRouter("/dashboard");
  }
};

onMounted(() => {
  getRouter();
});
</script>
<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#menu {
  .el-menu{
    border: none !important;
  }
}
</style>
