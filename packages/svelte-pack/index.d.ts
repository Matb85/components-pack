import { SvelteComponentTyped } from "svelte";

type options = {
  target: HTMLElement;
  context?: Map<string, any>;
  hydrate?: boolean;
  intro?: boolean;
  props?: Record<string, any>;
};

type SvelteComponent = new (options: options) => SvelteComponentTyped;

export const Map: SvelteComponent;
export const Photo: SvelteComponent;
export const PhotoViewer: SvelteComponent;
export const PhotoMultiViewer: SvelteComponent;
export const Navbar: SvelteComponent;
export const Footer: SvelteComponent;
export function init(): void;
