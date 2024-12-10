import http from '@api/index'
import {Menu} from "@api/interface/menu.ts";
export const getMenuList = () => http.get('/getRouters')


/**
 *
 *  查询菜单列表
 *
 * */

export const getSystemMenuList = (params:Menu.ReqQueryForm) => http.get<Menu.ReqSysMenuDetail>('/system/menu/list',params)


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

export const systemMenuRemove = (id:number) => http.post<null>(`/system/menu/${id}`)

/**
 *
 *  获取菜单详情
 *
 * */

export const systemMenuInfo = (params:number) => http.get<Menu.ReqSysMenuDetail>(`/system/menu/info/${params}`)


/**
 *
 * 获取下拉树
 *
 * */

export const systemMenuTreeSelect = ()=> http.get<Menu.ReqMenuTree>('/system/menu/treeSelect')

