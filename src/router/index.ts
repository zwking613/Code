import { createRouter, createWebHashHistory ,RouteRecordRaw} from 'vue-router';
import {localGet} from "@utils/utils.ts";
import webConfig from "@config/webConfig.ts";
import routes from './routes';
import useMenuStore from '@stores/modules/menu';// 假设这是获取路由的 API
const menuStore = useMenuStore();
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes] as unknown as Array<RouteRecordRaw>
});

// 动态添加路由的方法
export const addDynamicRoutes = async () => {
 try{
  const backendRoutes: any[] = (await menuStore.getMenuList() as any[]);
  console.log(backendRoutes,'backendRoutes')
  backendRoutes.forEach((route: any) => {
    router.addRoute('Layout',route); // 动态添加路由
  });
 }catch(error){
  console.log(error,'error===')
 }
};

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const isLoggedIn = localGet(webConfig.TOKEN);
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
  } else {
    // if (menuStore.menuList.length === 0) {
    //   await addDynamicRoutes(); // 添加动态路由
    // }
    next();
  }
});

export default router;