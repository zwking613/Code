import {  RouterType } from "@router/interface"

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

export const handleRouter = (router: RouterType[], path: string, keyPath: string[]) => {
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

export const getKeyPath = (data:RouterType[], targetPath:string, currentPath:any[] = [], result:any = [])=> {
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
