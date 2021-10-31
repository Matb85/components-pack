import { SvelteComponentTyped } from "svelte";
import type { StoreI, mutations as Mutations } from "@matb85/base-pack/dist/store";

type options = {
  target: HTMLElement;
};

type SvelteComponent = new (options: options) => SvelteComponentTyped;

export const Map: SvelteComponent;
export const Photo: SvelteComponent;
export const PhotoViewer: SvelteComponent;
export const PhotoMultiViewer: SvelteComponent;
export const Navbar: SvelteComponent;
export const Footer: SvelteComponent;
export function init(): void;
