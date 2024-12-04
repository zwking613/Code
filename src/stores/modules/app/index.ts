import {AppStateType, CaptchaImgType, UserInfoType} from '@stores/interface/app'
import * as server from '@api/modules/app/app.ts'
import {localRemove, localSet} from "@utils/utils.ts";
import webConfig from "@config/webConfig.ts";
import {App} from "@api/interface/app.ts";
import router from "@router/index"

const useAppStore = defineStore('app', {
    state: (): AppStateType => ({
        userInfo: {
          avatar: '',
          beginTime: null,
          createBy: 0,
          createTime: '',
          deptId: 0,
          deptName: '',
          email: '',
          endTime: null,
          id: 0,
          isDeleted: false,
          loginDate: '',
          loginIp: '',
          nickname: '',
          password: '',
          phone: '',
          remark: '',
          roleIds: null,
          roleNames: null,
          roles: undefined,
          sex: '',
          status: '',
          updateBy: 0,
          updateTime: '',
          username: ''
        } as UserInfoType,
        captchaImage: {}
    }),
    getters: {},
    actions: {
        /**
         *  获取验证码
         */
        async getCode() {
            const result = await server.getCaptchaImage()
            if (result.success) {
                this.captchaImage = result.data as CaptchaImgType
            }
        },
        /**
         *  登录
         */
        async login(data: App.ReqLoginForm) {
            const result = await server.login(data)
            if (result.success) {
                ElMessage.success(result.message)
                localSet(webConfig.TOKEN, result.data)
                await router.push({path: '/'})
            } else {
                if (result.code === 4002) {
                    await this.getCode();
                    ElMessage.error(result.message)
                } else {
                    ElMessage.error(result.message)
                }
            }
        },
        /**
         *  登出
         */
        async logout() {
            const result = await server.logout()
            if (result.success) {
                localRemove(webConfig.TOKEN)
                this.$reset()
                await router.push({path: '/login'})
                // window.location.href = '/dashboard'
                ElMessage.success(result.message)
            } else {
                ElMessage.error(result.message)
            }
        },

        /**
         *  获取个人信息
         */
        async getUserInfo() {
            try {
                const result = await server.userInfo()
                this.userInfo = result.data as UserInfoType
            } catch (e) {
                console.log(e)
            }

        },
        /**
         *  修改密码
         */
        async updatePassword(params:App.RePasswordForm) {
          try {
            const result = await server.editPassword(params)
            console.log(result)
          }catch (e) {
            console.log(e)
          }
        },
        /**
         *  修改用户
         */
        async updateInfo(params:App.ReUpdateInfoForm) {
          try {
            const result = await server.updateUserInfo(params)
            if(result.success){
              ElMessage.success(result.message)
              this.getUserInfo()
            }
            else {
              ElMessage.success(result.message)
            }
          }catch (e) {
            console.log(e)
          }
        }
    },
    persist: true,
})

export default useAppStore

