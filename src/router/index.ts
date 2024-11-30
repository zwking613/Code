import { createRouter, createWebHashHistory ,RouteRecordRaw} from 'vue-router';
import { showFullScreenLoading, tryHideFullScreenLoading } from "@config/loadingManager";
import {localGet} from "@utils/utils.ts";
import routes from './routes';
let timer = null
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as Array<RouteRecordRaw>
});
 
// 下面做路由限制，比如登录验证等
// 全局前置守卫
router.beforeEach((to, _, next) => {
  // 检查用户是否已登录
  const isLoggedIn = localGet('vue_admin_token');
  showFullScreenLoading()
  // 如果要访问的页面需要登录，且用户未登录，则重定向到登录页面
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
  } else {
    // 否则，继续访问页面
    next();
  }
});
 
// 全局后置守卫
router.afterEach(() => {
  if(timer) clearTimeout(timer);
  setTimeout(()=>{
    tryHideFullScreenLoading()
  },200)
});
 
export default router;