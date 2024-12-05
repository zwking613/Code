import { menuStateType } from '@stores/interface/menu'
import * as menuApi from '@api/modules/menu'
import {generateRouter} from '@utils/utils.ts'
// 引入 views 文件夹下所有 vue 文件



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
            if (result.success) {
                this.menuList = generateRouter(result.data)
            }
        }
    },
    // persist:true, // 持久化存储
})

export default useMenuStore

