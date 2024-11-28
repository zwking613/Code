import {loginStateType} from '@stores/interface/login'

const useLoginStore = defineStore('login', {
  state: ():loginStateType => ({
    user: '测试一下子',
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    // login
    login(data: string) {
      this.user = data
    },
    // logout
    logout() {

    }
  },
  persist:true,
})

export default useLoginStore

