import { menuStateType } from '@stores/interface/menu'
import * as menuApi from '@api/modules/menu'
// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')
const generateRouter = (userRouters: any[]): any[] => {
  const newRouters: any[] = userRouters.map((router: any) => {
    const isParent = router.children && router.children.length > 0
    const routes = {
      ...router,
      path: router.path.indexOf('/') === 0 ? router.path : `/${router.path}`,
      component: router?.component ? modules[/* @vite-ignore */ `/src/views/${router.component}.vue`] : undefined
    }
    if (isParent) {
      routes.redirect = routes.redirect ? routes.redirect : router.children[0].path
    }
    if (routes && router.children) {
      routes.children = generateRouter(router.children)
    }
    return routes
  })
  return newRouters
}

const useMenuStore = defineStore('menu', {
    state: (): menuStateType => ({
        isCollapse: false,
        isShowOverlay: false,
        defaultActive: '',
        defaultOpeneds: [],
        crumbsList: [],
        menuList: []
    }),
    actions: {
        async getMenuList() {
            const result: any = await menuApi.getMenuList()
            this.menuList = generateRouter(result.data)
            // if (result.success) {
            //     let data = generateMenu(result.data)
            //     this.menuList = data
            //     return data
            // }
        }
    },
    // persist:true, // 持久化存储
})

export default useMenuStore

