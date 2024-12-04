<!--
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-11-29 08:47:22
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-04 17:09:37
 * @FilePath: \vue_admin\src\layouts\components\Menu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="menu" class="flex flex-col w-full h-full">
    <div class="logo-box flex items-center justify-center h-[55px]">
      <svg-icon
        class="text-[40px] text-[#1A54B0] m-0 cursor-pointer"
        icon-class="logo"
        @click="gotoHome"
      />
      <h2
        :class="`${
          !isCollapse ? 'w-auto' : 'w-0'
        } ml-[10px] text-[24px] font-bold text-[#1A54B0] overflow-hidden transition-all duration-300`"
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
import { useRouter } from "vue-router";
import useMenuStore from "@stores/modules/menu";
import { getKeyPath, handleRouter } from "@utils/utils.ts";
import { menuStateType } from "@stores/interface/menu.ts";
import MenuItem from "./MenuItem.vue";
const menuStore = useMenuStore();
const { defaultActive, defaultOpeneds, menuList, crumbsList } =storeToRefs(menuStore);
const { isCollapse } = defineProps<{ isCollapse: boolean }>();
console.log(menuList.value)
const router = useRouter();
const clickMenu = (key: string, keyPath: string[]) => {
  if (crumbsList.value.findIndex((obj: any) => obj.path === key) === -1) {
    menuStore.$patch((state: menuStateType) => {
      state.defaultActive = key;
      state.defaultOpeneds = keyPath;
    });
  }
  router.push(key);
};

const getRouter = (params?: string) => {
  const key = params || router.options.history.location;
  let keyPath = getKeyPath(menuList.value, key);
  const data = handleRouter(menuList.value, key, keyPath);
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
    router.push("/dashboard");
    getRouter("/dashboard");
  }
};
watch(() => menuList.value, (newVal) => {
  console.log(newVal, '=====newVal=====')
}, { deep: true })
onMounted(() => {
  getRouter();
});
</script>
<style lang="less">
#menu {
  .el-menu {
    border: none;
    font-size: 15px;
    font-weight: 500;
    background-color: #ffffff;

    .el-menu-item {
      height: 44px;
      line-height: 44px;
      font-size: 17px !important;

      &:hover,
      &.is-active {
        background-color: #eff6ff !important;
        font-weight: 600;
      }
    }
    
    // .el-sub-menu {
    //   &.is-active {
    //     .el-sub-menu__title {
    //       color: #2563eb !important;
    //       background-color: #eff6ff !important;

    //       .el-icon {
    //         color: #2563eb;
    //       }
    //     }
    //   }
    // }

    .el-sub-menu__title {
      height: 44px;
      line-height: 44px;
      font-size: 17px !important;
      &:hover {
        background-color: #eff6ff !important;
      }
    }

    .el-icon {
      font-size: 18px;
      margin-right: 12px;
      color: #6b7280;
    }

    .is-active .el-icon {
      color: #2563eb;
    }
  }
}
</style>

