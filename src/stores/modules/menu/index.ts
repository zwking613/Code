import {menuStateType} from '@stores/interface/menu'

const useMenuStore = defineStore('menu', {
    state: ():menuStateType => ({
        isCollapse: false,
    }),
    getters: {
    },
    persist:true,
})

export default useMenuStore

