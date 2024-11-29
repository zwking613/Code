import { Component } from 'vue';

export interface menuStateType {
    isCollapse:boolean,
    defaultActive:string,
    defaultOpeneds:any[],
    routerArray:RouterType[],
    crumbsList:any[]
}

export interface RouterType {
    path: string;
    children?: Array<RouterType>|undefined;
    component?:() => Promise<Component> | undefined;
    name:string
    meta?:MetaType |undefined
}

export interface MetaType {
    title:string
    icon:string
    requiresAuth?:boolean
}