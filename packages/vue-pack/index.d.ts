import { VueConstructor, Component } from "vue";
import { Module } from "vuex";
import { StoreI } from "@matb85/base-pack/dist/store";
// Export the library as a plugin
export default function (Vue: VueConstructor): void;

export const Map: Component;
export const Photo: Component;
export const PhotoViewer: Component;
export const PhotoMultiViewer: Component;
export const vuepack: Module<StoreI, any>;
export const Navbar: Component;
export const Footer: Component;
