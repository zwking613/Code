import {menuStateType} from '@stores/interface/menu'

const useMenuStore = defineStore('menu', {
    state: ():menuStateType => ({
        isCollapse: false,
        defaultActive:'',
        defaultOpeneds:[],
        crumbsList:[],
        routerArray:[ {
            path: "/dashboard",
            name: 'Dashboard',
            component: () => import('@views/dashboard/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'home',
                title: "首页",
            }
        },{
            path: "/home",
            name: 'Home',
            component: () => import('@views/layout/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'home',
                title: "首页",
            }
        },{
            path: "/u",
            name: 'HomeUser',
            // component: () => import('@views/layout/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'home',
                title: "首页",
            },
            children: [ {
                path: "/user",
                name: 'User',
                component: () => import('@views/user/index.vue'),
                meta: {
                    requiresAuth: true,
                    icon: 'home',
                    title: "suer",
                }
            }
            ]
        }, {
            path: '/about',
            name: 'About',
            component: () => import('@views/about/index.vue'),
            meta: {
                title: 'About',
                icon: 'Home',
                requiresAuth: false
            }
        }, {
            path: '/test',
            name: 'Test',
            component: () => import('@views/test/index.vue'),
            meta: {
                title: 'Test',
                icon: 'Setting',
                requiresAuth: false
            }
        }]
    }),
    getters: {
    },
    persist:true,
})

export default useMenuStore

