import { Login } from "@api/interface/index";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>("/web/login", params);
	// return http.post<Login.ResLogin>("/web/login", params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

