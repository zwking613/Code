import {App} from "@api/interface/app.ts";

import http from "@/api";

/**
 * 获取验证码
 */

 export const getCaptchaImage = () => {
    return http.get<App.ResCaptchaImage>("/captchaImage",);
 };

/**
 *  登录模块
 */

export const login = (params: App.ReqLoginForm) => {
	return http.post<App.ResLogin>("/login", params);
};
/**
 * 获取用户信息
 **/
export const userInfo = ()=>http.get<App.ResUserInfo>('/system/user/profile/info')

/**
 *  登出
 * */

export const  logout =()=>http.post('/logout')


/**
 *
 * 修改密码
 *
 * */

export const  editPassword = (params:App.RePasswordForm)=>http.post('/system/user/profile/updatePwd',params)

/**
 *
 * 修改用户信息
 *
 * */
export const updateUserInfo = (params:App.ReUpdateInfoForm)=> http.post('/system/user/profile/edit',params)