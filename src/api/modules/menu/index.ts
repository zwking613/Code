import http from '@api/index'
import {Menu} from "@api/interface/menu.ts";
export const getMenuList = () => http.get('/getRouters')


/**
 *
 *  查询菜单列表
 *
 * */

export const getSystemMenuList = (params:Menu.ReqQueryForm) => http.get('/system/menu/list',params)


/**
 *
 *  新增菜单（目录）
 *
 * */

export const systemMenuAdd= (params:Menu.ReqQueryForm) => http.post('/system/menu/add',params)


/**
 *
 *  修改菜单（目录）
 *
 * */

export const systemMenuEdit = (params:Menu.ReqQueryForm) => http.post('/system/menu/edit',params)


/**
 *
 *  删除菜单
 *
 * */

export const systemMenuRemove = (params:Menu.ReqQueryForm) => http.post('/system/menu/remove',params)

/**
 *
 *  获取菜单详情
 *
 * */

export const systemMenuInfo = (params:Menu.ReqDetailsForm) => http.get('/system/menu/info',params)