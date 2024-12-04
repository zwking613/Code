import { createRouter, createWebHashHistory ,RouteRecordRaw} from 'vue-router';
import {localGet} from "@utils/utils.ts";
import webConfig from "@config/webConfig.ts";
import routes from './routes';
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes] as unknown as Array<RouteRecordRaw>
});
 

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const isLoggedIn = localGet(webConfig.TOKEN);
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});
 
export default router;