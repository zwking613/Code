import {menuStateType} from '@stores/interface/menu'
import * as menuApi from '@api/modules/menu'
import { generateMenu } from '@utils/utils'
// 引入 views 文件夹下所有 vue 文件
const useMenuStore = defineStore('menu', {
        state: ():menuStateType => ({
        isCollapse: false,
        isShowOverlay: false,
        defaultActive:'',
        defaultOpeneds:[],
        crumbsList:[],
        menuList:[ {
            path: "/dashboard",
            name: 'Dashboard',
            component: () => import('@views/dashboard/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'DataAnalysis',
                title: "首页",
            }
        },{
            path: "/home",
            name: 'Home',
            component: () => import('@views/layout/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'Setting',
                title: "Home",
            }
        },{
            path: "/u",
            name: 'HomeUser',
            // component: () => import('@views/layout/index.vue'),
            meta: {
                requiresAuth: true,
                icon: 'DocumentCopy',
                title: "HomeUser",
            },
            children: [ {
                path: "/user",
                name: 'User',
                component: () => import('@views/user/index.vue'),
                meta: {
                    requiresAuth: true,
                    icon: 'MessageBox',
                    title: "User",
                }
            }
            ]
        }, {
            path: '/about',
            name: 'About',
            component: () => import('@views/about/index.vue'),
            meta: {
                title: 'About',
                icon: 'Discount',
                requiresAuth: false
            }
        }, {
            path: '/test',
            name: 'Test',
            component: () => import('@views/test/index.vue'),
            meta: {
                title: 'Test',
                icon: 'Notification',
                requiresAuth: false
            }
        }]
    }),
    getters: {
    },
    actions: {
        async getMenuList() {
            const result = await menuApi.getMenuList()
            if(result.success){
                let data = generateMenu(result.data as any[])
                this.menuList = data
                console.log(data,'=====data=====')
            }
            // if(result.success) {
            //     this.menuList = result.data as menuStateType['menuList']
            // } else {
            //     ElMessage.error(result.message)
            // }
        }
    },
    // persist:true,
})

export default useMenuStore

