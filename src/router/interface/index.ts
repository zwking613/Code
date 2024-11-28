import { Component } from 'vue';

export interface RouterType {
  path: string;
  children?: Array<RouterType>|undefined;
  component:() => Promise<Component>;
  name:string
  meta:MetaType
}

export interface MetaType {
    title:string
    icon:string
    requiresAuth?:boolean
}