import type { SvelteComponent } from "svelte";
import type { store } from "@matb85/base-pack";

export const Photo: SvelteComponent;
export const PhotoViewer: SvelteComponent;
export const VuePackClass: store.VuePackClass;
export const mutations: Record<string, () => void>;
export function init(): void;
