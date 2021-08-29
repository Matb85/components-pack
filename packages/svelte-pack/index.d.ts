import { SvelteComponentTyped } from "svelte";
import type { StoreI, mutations as Mutations } from "@matb85/base-pack/dist/store";

type options = {
  target: HTMLElement;
};

export const Photo: new (options: options) => SvelteComponentTyped;
export const PhotoViewer: new (options: options) => SvelteComponentTyped;
export const PhotoMultiViewer: new (options: options) => SvelteComponentTyped;
export const Navbar: new (options: options) => SvelteComponentTyped;
export const Footer: new (options: options) => SvelteComponentTyped;
export const Store: () => StoreI;
export const mutations: typeof Mutations;
export function init(): void;
