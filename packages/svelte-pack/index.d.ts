import { SvelteComponentTyped } from "svelte";
import type { store } from "@matb85/base-pack";

type options = {
  target: HTMLElement;
};

export const Photo: new (options: options) => SvelteComponentTyped;
export const PhotoViewer: new (options: options) => SvelteComponentTyped;
export const PhotoMultiViewer: new (options: options) => SvelteComponentTyped;
export const Store: new () => store.Store;
export const mutations: Record<string, (...args: any[]) => void>;
export function init(): void;
