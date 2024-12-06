import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
// import { STORAGE_ACCESS_TOKEN_KEY } from '@/constant'
import useMenuStore from '@stores/modules/menu'
import webConfig from '@/config/webConfig'
// 基础路由
const outerRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/components/ErrorPage/401.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorPage/NotFound.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorPage/500.vue')
  },
  {
    path: '/', // 动态路由模块
    name: 'reseller',
    component: Layout,
    children: [

    ]
  }
]

const constantRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页',
      icon: 'home',
    },
  },
  {
    path: '/personal_center',
    name: 'personal_center',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '个人中心',
    },
  }
]
// 路由白名单（无需token）
const ROUTE_WHILE_LIST = [
  'login',
  '401',
  '404',
  '500',
]
// 404路由（动态路由的时候才添加，以免，找不到路由时会跳转到404）
const notFoundRoute = { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/404' }

const router = createRouter({
  history: createWebHistory(),
  routes: outerRoutes as RouteRecordRaw[]
})

// 生成动态路由
const generateRoute = async () => {
  const routesStore = useMenuStore()
  // 请求动态路由数据
  await routesStore.getMenuList()
  const resellerRoutes = outerRoutes.find((v) => v.name === 'reseller') as RouteRecordRaw
  router.removeRoute('reseller')
  // 如果有动态路由才添加动态路由reseller模块
  if (routesStore.menuList && routesStore.menuList.length > 0) {
    resellerRoutes.children = [...constantRoutes,...(routesStore.menuList as RouteRecordRaw[]) ?? []]
    resellerRoutes.redirect = '/dashboard'
    router.addRoute(resellerRoutes)
  }
  router.addRoute(notFoundRoute)
}
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = localStorage.getItem(webConfig.TOKEN)
  if (token) {
    const isWhitelist = ROUTE_WHILE_LIST.includes(to.name as string)
    const routesStore = useMenuStore()
    if (isWhitelist) {
      // 白名单路由且不是动态路由
      next()
    } else {
      if (routesStore.menuList && routesStore.menuList.length === 0) {
        // 如果刷新页面没有用户路由数据也重新请求菜单路由权限
        await generateRoute()
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (ROUTE_WHILE_LIST.includes(to.name as string)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
export default router

