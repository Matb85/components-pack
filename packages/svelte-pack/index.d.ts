import { SvelteComponentTyped } from "svelte";
import type { store } from "@matb85/base-pack";
import { setup, Slidehandler, Noloop, lazyloading, buttons } from "modular-slider";

const Slider = setup(Slidehandler, Noloop);
export { lazyloading, buttons, Slider };

type options = {
  target: HTMLElement;
};

export const Photo: new (options: options) => SvelteComponentTyped;
export const PhotoViewer: new (options: options) => SvelteComponentTyped;
export const PhotoMultiViewer: new (options: options) => SvelteComponentTyped;
export const VuePackClass: new () => store.VuePackClass;
export const mutations: Record<string, (...args: any[]) => void>;
export function init(): void;
