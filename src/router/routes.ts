import {RouterType} from './interface/index'
const router:Array<RouterType> = [
    {
        // 首页
        path: '/',
        component: () => import('@views/layout/index.vue'),
        meta:{
            title: '首页',
            icon: 'home'
        },
        children: []
    },
    {
        // 登录
        path: '/login',
        component: () => import('@views/login/index.vue'),
        meta:{
            title: '登录',
            icon: 'login'
        },
        children: []
    }
];

export default router