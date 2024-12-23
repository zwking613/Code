import { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob('@/views/**/*.vue')

export const localGet = (key: string) => {
    const value = window.localStorage.getItem(key);
    try {
        return JSON.parse(window.localStorage.getItem(key) as string);
    } catch (error) {
        return value;
    }
};


export const localSet = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const localRemove = (key: string) => {
    window.localStorage.removeItem(key);
};


export const localClear = () => {
    window.localStorage.clear();
};


export const isType = (val: any) => {
    if (val === null) return "null";
    if (typeof val !== "object") return typeof val;
    else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};


export const deepCopy = <T>(obj: any): T => {
    let newObj: any;
    try {
        newObj = obj.push ? [] : {};
    } catch (error) {
        newObj = {};
    }
    for (let attr in obj) {
        if (typeof obj[attr] === "object") {
            newObj[attr] = deepCopy(obj[attr]);
        } else {
            newObj[attr] = obj[attr];
        }
    }
    return newObj;
};

export const handleRouter = (router: RouteRecordRaw[], path: string, keyPath: string[]) => {
    let breadcrumbList: any = {};

    for (const item of router) {
        if (!keyPath.includes(item.path)) continue;
        if (item.path === path) {
            breadcrumbList = {
                name: item.path,
                meta: item.meta,
                path: item.path,
                keyPath
            };
            break; // 终止循环
        } else {
            if (item.children) {
                breadcrumbList = handleRouter(item.children, path, keyPath);
                if (Object.keys(breadcrumbList).length > 0) {
                    break; // 如果在子路由中找到匹配，终止循环
                }
            }
        }
    }
    return breadcrumbList;
};

export const getKeyPath = (data:RouteRecordRaw[], targetPath:string, currentPath:any[] = [], result:any = [])=> {
    for (let item of data) {
        let newPath:any[] = [...currentPath, item.path];
        if (item.path === targetPath) {
            result.push(...newPath);
        }
        if (item.children) {
            getKeyPath(item.children, targetPath, newPath, result);
        }
    }
    return result;
}

/** 
 * 生成菜单
 */
export const generateRouter = (userRouters: any[]): any[] => {
    const newRouters: any[] = userRouters.map((router: any) => {
        const isParent = router.children && router.children.length > 0
        const routes = {
            ...router,
            path: router.path.indexOf('/') === 0 ? router.path : `/${router.path}`,
            component: router?.component ? modules[/* @vite-ignore */ `/src/views/${router.component}.vue`] : undefined
        }
        if (isParent) {
            routes.redirect = routes.redirect ? routes.redirect : router.children[0].path
        }
        if (routes && router.children) {
            routes.children = generateRouter(router.children)
        }
        return routes
    })
    return newRouters
}


/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export const handleTree = (data:any, id?:string, parentId?:any, children?:any) =>{
    let config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    };

    var childrenListMap = {};
    var nodeIds = {};
    var tree = [];

    for (let d of data) {
        let parentId = d[config.parentId];
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d[config.id]] = d;
        childrenListMap[parentId].push(d);
    }

    for (let d of data) {
        let parentId = d[config.parentId];
        if (nodeIds[parentId] == null) {
            tree.push(d);
        }
    }

    for (let t of tree) {
        adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]];
        }
        if (o[config.childrenList]) {
            for (let c of o[config.childrenList]) {
                adaptToChildrenList(c);
            }
        }
    }
    return tree;
}
