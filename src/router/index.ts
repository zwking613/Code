import routes from './routes';
import { createRouter, createWebHashHistory ,RouteRecordRaw} from 'vue-router';
// import {localGet} from "@utils/utils.ts";
 
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as Array<RouteRecordRaw>
});
 
// 下面做路由限制，比如登录验证等
// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 检查用户是否已登录
//   const isLoggedIn = localGet('token');
//   // 如果要访问的页面需要登录，且用户未登录，则重定向到登录页面
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     console.log('需要登录！')
//     next({ name: 'Login' });
//   } else {
//     // 否则，继续访问页面
//     next();
//   }
// });
 
// 全局后置守卫
// router.afterEach((to, from) => {
//   console.log(to,'后置')
//   console.log(from,'后置')
// });
 
export default router;