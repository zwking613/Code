import { Component } from 'vue';

export interface RouterType {
  path: string;
  children: Array<RouterType>;
  component:() => Promise<Component>;
  meta:MetaType
}

export interface MetaType {
    title:string;
    icon:string;
}