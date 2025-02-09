import type { Component } from "svelte";
import { StoreI } from "@matb85/base-pack/dist/store";

export const Map: Component;
export const Photo: Component;
export const PhotoViewer: Component;
export const PhotoMultiViewer: Component;
export const Navbar: Component;
export function init(): void;

declare global {
    interface Window {
        sveltepack: StoreI;
    }
}