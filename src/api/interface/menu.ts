export namespace Menu {
    export interface ReqQueryForm {
        menuName?: string;
        status?: string;
    }

    export interface ReqSysMenuList {

    }

    export interface  ReqSysMenuDetail{
        createBy: number;
        createTime: string; // ISO 8601 格式的日期字符串
        updateBy: number;
        updateTime: string | null; // 可以为 null
        id: number;
        menuName: string;
        parentName: string | null; // 可以为 null
        parentId: number;
        orderNum: number;
        path: string;
        component: string | null; // 可以为 null
        query: string;
        isFrame: boolean;
        isCache: boolean;
        menuType: string; // 可能是 'M' 或其他值
        visible: string; // 可能是 '0' 或 '1'
        status: string; // 可能是 '0' 或 '1'
        perms: string;
        icon: string;
        children: []; // 子菜单的数组
    }

    export  interface ReqMenuTree {
        id: number;
        parentId: number;
        weight: number;
        name: string;
        checked: boolean;
    }
}