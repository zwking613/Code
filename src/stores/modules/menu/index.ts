import { menuStateType, ReqSysMenuDetail ,ReqMenuTree} from '@stores/interface/menu'
import * as menuApi from '@api/modules/menu'
import { generateRouter, handleTree } from '@utils/utils.ts'
import {Menu} from "@api/interface/menu.ts";
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
            try {
                const result = await menuApi.getSystemMenuList(params)
                if (result.success) {
                    this.sysMenuList = handleTree(result.data) as []
                    callback&&callback()
                }
                else {
                    ElMessage.error(result.message)
                }
            }
            catch (e) {
                console.log(e)
            }
            finally {
                callback&&callback()
            }
        },


        async getMenuInfo(params:number, callback: (data: ReqSysMenuDetail)=>void) {
            try {
                const result = await menuApi.systemMenuInfo(params)
                if(result.success){
                    callback&&callback(<ReqSysMenuDetail>result.data)
                }
                else {
                    ElMessage.error(result.message)
                }
            }
            catch (e) {
                console.log(e)
            }

        },

        async deleteMenu(id:number,callback:()=>void){
            try {
                const result = await menuApi.systemMenuRemove(id)
                if (result.success){
                    ElMessage.success(result.message)
                    callback&&callback()
                }
                else {
                    ElMessage.error(result.message)
                }
            }
            catch (e) {
                console.log(e)
            }
        },

        async getMenuTreeSelect(callback:(data:ReqMenuTree)=>void){
            try {
                const result = await menuApi.systemMenuTreeSelect()
                if (result.success){
                    callback&&callback(<ReqMenuTree>result.data)
                }
                else {
                    ElMessage.error(result.message)
                }
            }
            catch (e) {
                console.log(e)
            }
        },
    },
    // persist:true, // 持久化存储
})

export default useMenuStore

