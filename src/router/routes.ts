
import { RouterType } from './interface/index'
import { createPinia } from "pinia"
import useMenuStore from '@modules/menu/index.ts'

const menuStore = useMenuStore(createPinia())

const router: Array<RouterType> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/dashboard',
        component: () => import('@/layouts/index.vue'),
        meta: {
            title: '首页',
            icon: 'home',
            requiresAuth: true
        },
        children: menuStore.menuList
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'login',
            requiresAuth: false
        }
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: () => import('@components/ErrorPage/NotFound.vue')
    }
];


export default router;