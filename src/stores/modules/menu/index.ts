import { menuStateType } from '@stores/interface/menu'
import * as menuApi from '@api/modules/menu'
import { generateRouter, handleTree } from '@utils/utils.ts'
import {Menu} from "@api/interface/menu.ts";
import { systemMenuInfo } from "@api/modules/menu";
const useMenuStore = defineStore('menu', {
    state: (): menuStateType => ({
        isCollapse: false,
        isShowOverlay: false,
        defaultActive: '',
        defaultOpeneds: [],
        crumbsList: [],
        menuList: [],
        /** 菜单配置 */
        sysMenuList:[]
    }),
    actions: {
        async getMenuList() {
            const result: any = await menuApi.getMenuList()
            if (result.success) {
                this.menuList = generateRouter(result.data)
            }
        },

        async getSystemMenuList(params:Menu.ReqQueryForm,callback:()=>void) {
            const result = await menuApi.getSystemMenuList(params)
            if (result.success) {
                console.log( handleTree(result.data))
                this.sysMenuList = handleTree(result.data) as []
                callback&&callback()
            }
            else {
                ElMessage.error(result.message)
            }
            console.log(result)

        },


        async getMenuInfo(params:Menu.ReqDetailsForm,callback:()=>void) {
            const result = await menuApi.systemMenuInfo(params)
            console.log(result)
            callback&&callback(result.data)
        }
    },
    // persist:true, // 持久化存储
})

export default useMenuStore

