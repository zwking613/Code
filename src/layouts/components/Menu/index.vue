<template>
  <div id="menu">
    <div class="logo-box">
      <!-- <img :src="logo" alt="logo" class="logo-img" @click="gotoHome" /> -->
       <svg-icon class="logo-img" icon-class="404" @click="gotoHome" />
      <h2 class="logo-text" v-if="!isCollapse">ROBOT</h2>
    </div>
    <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :unique-opened="true" @select="clickMenu"
      :default-active="defaultActive" :default-openeds="defaultOpeneds">
      <template v-for="route in menuList">
        <el-sub-menu v-if="route.children && route.children.length" :key="route.path" :index="route.path">
          <template #title>
              <el-icon v-if="route.meta && route.meta.icon">
                <component :is="route.meta.icon" />
              </el-icon>
            <span
              class="flex justify-between items-center font-semibold leading-5 va-sidebar__title va-sidebar-item-title">{{
                route.meta?.title }}</span>
          </template>
          <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">
              <el-icon v-if="route.meta && route.meta.icon">
                <component :is="route.meta.icon" />
              </el-icon>
            <span
              class="flex justify-between items-center font-semibold leading-5 va-sidebar__title va-sidebar-item-title">{{
                child.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="route.path" :key="route.path + 'index'">
          <el-tooltip :content="route.meta?.title" placement="right" :disabled="!isCollapse">
            <el-icon v-if="route.meta && route.meta.icon">
              <component :is="route.meta.icon" />
            </el-icon>
          </el-tooltip>
          <span
            class="flex justify-between items-center font-semibold leading-5 va-sidebar__title va-sidebar-item-title">{{
              route.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router'
import useMenuStore from '@stores/modules/menu'
// import logo from "@/assets/images/logo.png";
import { getKeyPath, handleRouter } from "@utils/utils.ts";
import { menuStateType } from '@stores/interface/menu.ts'
const menuStore = useMenuStore()
const {  defaultActive, defaultOpeneds, menuList, crumbsList } = storeToRefs(menuStore)
const { isCollapse } = defineProps<{isCollapse: boolean}>() 
const router = useRouter()
const clickMenu = (key: string, keyPath: string[]) => {
  if (crumbsList.value.findIndex((obj: any) => obj.path === key) === -1) {
    menuStore.$patch((state: menuStateType) => {
      state.defaultActive = key
      state.defaultOpeneds = keyPath
    })
  }
  router.push(key)
}
const getRouter = (params?: string) => {
  const key = params || router.options.history.location;
  let keyPath = getKeyPath(menuList.value, key)
  const data = handleRouter(menuList.value, key, keyPath)
  menuStore.$patch((state: menuStateType) => {
    state.defaultActive = key
    state.defaultOpeneds = keyPath
    state.crumbsList = crumbsList.value.concat([data])
  })
}
const gotoHome = () => {
  if (crumbsList.value.findIndex((obj: any) => obj.path === '/dashboard') === -1) {
    router.push('/dashboard')
    getRouter('/dashboard')
  }
}

onMounted(() => {
  getRouter()
})
</script>

<style lang="less">
#menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;

    .logo-img {
      width: 30px;
      margin: 0;
      cursor: pointer;
    }

    .logo-text {
      margin: 0 0 0 10px;
      font-size: 24px;
      font-weight: bold;
      color: #1A54B0;
      white-space: nowrap;
    }
  }

  .el-menu {
    border: none;
    font-size: 15px;
    font-weight: 500;
    background-color: #FFFFFF;

    .el-menu-item {
      height: 44px;
      line-height: 44px;
      padding: 0 16px;
      font-size: 17px !important;

      &:hover,
      &.is-active {
        background-color: #EFF6FF !important;
        font-weight: 600;
      }
    }

    .el-sub-menu {
      &.is-active {
        .el-sub-menu__title {
          color: #2563EB !important;
          background-color: #EFF6FF !important;

          .el-icon {
            color: #2563EB;
          }
        }
      }
    }

    .el-sub-menu__title {
      height: 44px;
      line-height: 44px;
      padding: 0 16px;
      font-size: 17px !important;

      &:hover {
        background-color: #EFF6FF !important;
      }
    }

    .el-icon {
      font-size: 18px;
      margin-right: 12px;
      color: #6B7280;
    }

    .is-active .el-icon {
      color: #2563EB;
    }
  }
}
</style>