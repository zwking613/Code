import {RouterType} from './interface/index'
const router:Array<RouterType> = [
    {
        // 首页
        path: '/',
        name:'Layout',
        component: () => import('@/layouts/index.vue'),
        meta:{
            title: '首页',
            icon: 'home',
            requiresAuth:true
        },
        children: [{
            path: "/home/index",
            name:'Home',
            component: () => import('@views/layout/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'home',
                title: "首页",
            }
        }]
    },
    {
        // 登录
        path: '/login',
        name:'Login',
        component: () => import('@views/login/index.vue'),
        meta:{
            title: '登录',
            icon: 'login',
            requiresAuth:false
        },
        children: []
    }
];

export default router