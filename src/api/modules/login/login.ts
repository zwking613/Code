import { Login } from "@api/interface";

import http from "@/api";

/**
 * 获取验证码
 */

 // * 用户登录接口
 export const getCaptchaImage = () => {

 return http.post<Login.ResLogin>("/captchaImage");
 // return http.post<Login.ResLogin>("/web/login", params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
 };

/**
 *  登录模块
 */
// * 用户登录接口
export const login = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>("/login", params);
	// return http.post<Login.ResLogin>("/web/login", params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

