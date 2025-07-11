import type { GlobalConfigI, BasePackStoreI } from "@matb85/base-pack";

declare module "virtual:@matb85/astro-pack" {
  export const GlobalConfig: GlobalConfigI;
}

declare global {
  interface Window {
    cpStore: BasePackStoreI;
  }
}

export function addPhotos(photos: NodeListOf<HTMLImageElement>) {
  window.dispatchEvent(new CustomEvent<NodeListOf<HTMLImageElement>>("MP-addPhotos", { detail: photos }));
}
