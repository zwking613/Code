import { Component } from 'vue';

export interface RouterType {
  path: string;
  children?: Array<RouterType>|undefined;
  component?:() => Promise<Component> | undefined;
  name:string
  meta?:MetaType |undefined
    [key: string]: any
}

export interface MetaType {
    title:string
    icon:string
    requiresAuth?:boolean
}