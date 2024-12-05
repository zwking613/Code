/*
 * @Author: zZzwWw 348721637@qq.com
 * @Date: 2024-11-29 08:47:22
 * @LastEditors: zZzwWw 348721637@qq.com
 * @LastEditTime: 2024-12-05 15:47:46
 * @FilePath: \vue_admin\src\stores\modules\menu\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

